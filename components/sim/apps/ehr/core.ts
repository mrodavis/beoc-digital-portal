import type { RibbonTab, SimCommit, SimValue } from "@/types/sim";
import type { AppCore } from "../../types";
import type { EhrDoc } from "./types";
import { applyEhr, describeEhrSelection, ehrSelectionExists, normalizeField, normCode, normIcd, normMoney, TRACK_MOVES } from "./model";
import { buildForm, FORM_IDS, staticDialogs } from "./forms";

/**
 * Northstar EHR: the in-lesson practice engine for the Intro to EHR course.
 *
 * Bare chrome: the canvas draws the whole workstation (top bar, orange
 * training strip, left rail, patient header). Field edits commit as "type"
 * actions; buttons and menu choices commit as commands; modal forms commit as
 * dialogs.
 *
 * Free navigation (never a miss):
 *   ehr.nav (value "schedule", "claims:era", ...), ehr.chart.tab ("registration:insurance"),
 *   ehr.chart.open (patient id), ehr.chart.close, ehr.sched.day (YYYY-MM-DD),
 *   ehr.enc.open, ehr.claim.open, ehr.auth.open, ehr.report.sort ("col:desc"), ehr.unlock
 *
 * Judged commands on the open record (value carries the id):
 *   ehr.access.open "P1"         open a chart in compliance mode (doc.judgeAccess)
 *   ehr.elig.check "P1:1"        verify eligibility for coverage 1 or 2
 *   ehr.cov.add "P1:2"           add secondary coverage
 *   ehr.sig.capture "P1:npp"     npp | aob | fin
 *   ehr.guar.self "P1"           guarantor is the patient
 *   ehr.auth.submit "PA1"        send a preauthorization request
 *   ehr.dx.add "E1:S93.402A"     from the encoder or the superbill
 *   ehr.chg.add "E1:73600"       from the encoder or the superbill
 *   ehr.claim.create "E1"        encounter → claim
 *   ehr.claim.submit "C1"
 *   ehr.orderset.add "P1:dm-fu"  ehr.orders.sign "P1"
 *   ehr.lock, ehr.signout
 *
 * Judged commands on the selection (requires.selection):
 *   appt:V1     ehr.appt.confirm | ehr.appt.noShow | ehr.appt.cancel | ehr.track.status (Roomed, With provider, Checkout)
 *               dialogs ehr.checkin, ehr.checkout
 *   slot:...    dialog ehr.appt.new
 *   pt:P3       dialog ehr.btg (restricted chart)
 *   dx:E1:code  ehr.dx.remove | ehr.dx.first
 *   chg:E1:L1   ehr.chg.remove
 *   cl:C1:L1    ehr.claim.removeLine      cdx:C1:code  ehr.claim.removeDx
 *   claim:C1    dialog ehr.denial
 *   order:O1    ehr.order.remove | ehr.order.followUp | ehr.result.ack
 *   era:RL1     dialog ehr.post
 *   audit:L1    ehr.audit.flag
 *   row:key     ehr.report.flag
 *
 * Dialogs with the record in their values: ehr.order.med/lab/img/ref and
 * ehr.roi/ehr.stmt ({ patient }), ehr.query ({ enc }), ehr.alert,
 * ehr.signin, ehr.incident, ehr.report.run, ehr.report.export.
 */

const FREE = [
  "ehr.nav",
  "ehr.chart.tab",
  "ehr.chart.open",
  "ehr.chart.close",
  "ehr.sched.day",
  "ehr.enc.open",
  "ehr.claim.open",
  "ehr.auth.open",
  "ehr.report.sort",
  "ehr.unlock",
];

const CANVAS = [
  "ehr.access.open",
  "ehr.lock",
  "ehr.signout",
  "ehr.elig.check",
  "ehr.cov.add",
  "ehr.sig.capture",
  "ehr.guar.self",
  "ehr.appt.confirm",
  "ehr.appt.noShow",
  "ehr.appt.cancel",
  "ehr.auth.submit",
  "ehr.dx.add",
  "ehr.dx.remove",
  "ehr.dx.first",
  "ehr.chg.add",
  "ehr.chg.remove",
  "ehr.claim.create",
  "ehr.claim.submit",
  "ehr.claim.removeLine",
  "ehr.claim.removeDx",
  "ehr.orderset.add",
  "ehr.order.remove",
  "ehr.orders.sign",
  "ehr.order.followUp",
  "ehr.result.ack",
  "ehr.audit.flag",
  "ehr.report.flag",
];

const MONEY_KEYS: Record<string, string[]> = {
  "ehr.post": ["payment", "adjustment", "patientResp"],
  "ehr.checkin": ["collected"],
  "ehr.checkout": ["collected"],
};

function normalize(c: SimCommit): SimCommit {
  if (c.kind === "type") return { ...c, value: normalizeField(c.target, c.value) };
  if (c.kind === "dialog" && MONEY_KEYS[c.id]) {
    const values: Record<string, SimValue> = { ...c.values };
    for (const k of MONEY_KEYS[c.id]) if (typeof values[k] === "string") values[k] = normMoney(values[k] as string);
    return { ...c, values };
  }
  if (c.kind === "command" && (c.id === "ehr.dx.add" || c.id === "ehr.chg.add") && typeof c.value === "string") {
    const i = c.value.indexOf(":");
    if (i > 0) {
      const code = c.value.slice(i + 1);
      return { ...c, value: `${c.value.slice(0, i)}:${c.id === "ehr.dx.add" ? normIcd(code) : normCode(code)}` };
    }
  }
  return c;
}

/**
 * The Ribbon is not drawn in bare chrome. This one tab declares the canvas's
 * entry points so the validator knows which forms can be opened and which
 * values the tracker's "Move to" menu offers.
 */
const RIBBON: RibbonTab[] = [
  {
    id: "ehr",
    label: "Northstar EHR",
    groups: [
      {
        label: "Forms",
        controls: FORM_IDS.map((id) => ({ type: "button" as const, id: `open.${id}`, label: buildForm(id, null)?.title ?? id, dialog: id })),
      },
      {
        label: "Patient tracker",
        controls: [{ type: "dropdown", id: "ehr.track.status", label: "Move to", options: TRACK_MOVES.map((value) => ({ value })) }],
      },
    ],
  },
];

export const ehrCore: AppCore<EhrDoc> = {
  name: "Northstar EHR",
  accent: "#c2410c",
  chrome: "bare",
  autosave: false,
  ribbon: RIBBON,
  dialogs: staticDialogs(),
  backstage: { templates: [], recent: [], formats: [], ext: "" },
  shortcuts: {
    "Ctrl+K": { command: "ehr.nav", value: "search" },
  },
  canvasCommands: CANVAS,
  freeCommands: FREE,
  initialUi: () => ({ selection: "" }),
  normalize,
  apply: applyEhr,
  ribbonState: () => ({}),
  selectionExists: ehrSelectionExists,
  describeSelection: (doc, ui) => describeEhrSelection(doc, ui.selection),
};
