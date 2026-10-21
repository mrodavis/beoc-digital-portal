/**
 * Checks every practice simulation for problems a learner would hit:
 * commands that don't exist on the Ribbon, option values that aren't in a
 * menu, dialogs nobody can open, selections that point at nothing, and steps
 * whose built-in behavior throws. It then "plays" each sim with the expected
 * actions to prove it can be completed.
 *
 *   npx tsx scripts/validate-sims.ts            # all sims
 *   npx tsx scripts/validate-sims.ts word       # one app
 */
import type { RibbonTab, SimAction, SimCommit, SimDefinition, SimValue } from "@/types/sim";
import type { AppCore, SimUi } from "@/components/sim/types";
import { wordCore } from "@/components/sim/apps/word/core";
import { REGISTRY } from "@/lib/sims";
import { applyOps, getPath } from "@/lib/sim/ops";
import { commitMatches, normText, selectionMatches } from "@/lib/sim/match";
import { officeApps } from "@/lib/content/ms-office";
import { techFoundationsModules } from "@/lib/content/office-assistant/tech-foundations/modules";
import { officeAppsModules } from "@/lib/content/office-assistant/office-apps/modules";
import { modernOfficeModules } from "@/lib/content/office-assistant/modern-office/modules";
import { introDatabaseModules } from "@/lib/content/office-assistant/intro-database/modules";
import { introToEHRModules } from "@/lib/content/ehr/intro-to-ehr/modules";
import { googleWorkspaceModules } from "@/lib/content/google-workspace";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CORES: Record<string, AppCore<any>> = { word: wordCore };
for (const app of ["excel", "powerpoint", "windows", "outlook", "teams", "typing", "assistant", "access", "google", "ehr", "onedrive", "gmail"]) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(`@/components/sim/apps/${app}/core`);
    const core = Object.entries(mod).find(([k]) => k.endsWith("Core"))?.[1];
    if (core) CORES[app] = core as AppCore<unknown>;
  } catch {
    // Engine not built yet.
  }
}
try {
  // New Outlook for Windows lives in the Outlook engine's folder.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  CORES["outlook-new"] = require("@/components/sim/apps/outlook/new/core").newOutlookCore as AppCore<unknown>;
} catch {
  // Engine not built yet.
}

const BACKSTAGE_COMMANDS = ["file.save", "file.new", "file.open", "file.protect", "file.inspect", "file.versionHistory", "file.copyLink", "file.email", "file.changeType", "file.close", "file.options", "file.browse"];
const BACKSTAGE_DIALOGS = ["file.saveAs", "file.print", "file.share", "file.exportPdf"];

type Catalog = Map<string, { values: Set<string> | null }>;

function catalogFor(core: AppCore<unknown>): { cmds: Catalog; dialogs: Set<string> } {
  const cmds: Catalog = new Map();
  const dialogs = new Set<string>(BACKSTAGE_DIALOGS);
  const add = (id: string, value?: SimValue, free = false) => {
    let c: SimCommit = { kind: "command", id, value };
    if (core.normalize) c = core.normalize(c);
    if (c.kind !== "command") return;
    const e = cmds.get(c.id) ?? { values: new Set<string>() };
    if (free || e.values === null) e.values = null;
    else if (c.value !== undefined) e.values.add(normText(c.value));
    else e.values.add("");
    cmds.set(c.id, e);
  };
  const walk = (tabs: RibbonTab[]) => {
    for (const t of tabs)
      for (const g of t.groups) {
        if (g.launcher) dialogs.add(g.launcher);
        for (const c of [...g.controls, ...(g.rows ?? []).flat()]) {
          if (c.type === "separator") continue;
          if (c.type === "button") {
            if (c.dialog) dialogs.add(c.dialog);
            else add(c.id);
          } else if (c.type === "toggle") add(c.id);
          else if (c.type === "dropdown" || c.type === "gallery") {
            if (c.type === "dropdown" && c.combo) add(c.id, undefined, true);
            if (c.type === "dropdown" && c.split) add(c.id, c.faceValue);
            for (const o of c.options) {
              if (o.heading) continue;
              if (o.dialog) dialogs.add(o.dialog);
              else add(o.command ?? c.id, o.value);
            }
          }
        }
      }
  };
  walk(core.ribbon);
  for (const sc of Object.values(core.shortcuts)) {
    if ("command" in sc) add(sc.command, sc.value);
    else if ("dialog" in sc) dialogs.add(sc.dialog);
  }
  for (const id of core.canvasCommands) add(id, undefined, true);
  for (const id of BACKSTAGE_COMMANDS) add(id, undefined, true);
  for (const id of core.freeCommands ?? []) add(id, undefined, true);
  for (const id of core.canvasDialogs ?? []) dialogs.add(id);
  for (const r of [...(core.backstage.info ?? []), ...(core.backstage.exports ?? [])]) add(r.command, r.value);
  return { cmds, dialogs };
}

function firstVal(v: SimValue | SimValue[] | undefined): SimValue | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function commitFor(a: SimAction): SimCommit | null {
  switch (a.kind) {
    case "command": return { kind: "command", id: a.id, value: firstVal(a.value) };
    case "dialog": {
      const values: Record<string, SimValue> = {};
      for (const [k, v] of Object.entries(a.values ?? {})) values[k] = firstVal(v) as SimValue;
      return { kind: "dialog", id: a.id, values };
    }
    case "type": return { kind: "type", target: a.target, value: Array.isArray(a.value) ? (a.match === "all" ? a.value.join(" ") : a.value[0]) : a.value };
    case "click": return { kind: "click", target: a.target };
    case "select": return null;
  }
}

/** Does the selection key point at something that exists in the document? */
function selectionExists(app: string, doc: unknown, sel: string): boolean {
  if (!sel) return true;
  if (CORES[app]?.selectionExists) return CORES[app].selectionExists!(doc, sel);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = doc as any;
  if (app === "word") {
    if (sel === "all" || sel === "header" || sel === "footer") return true;
    const cell = /^([^.,]+)\.r(\d+)c(\d+)$/.exec(sel);
    if (cell) {
      const p = d.paragraphs.find((x: { id: string }) => x.id === cell[1]);
      return Boolean(p?.table && p.table.rows.length >= Number(cell[2]) && p.table.rows[0].length >= Number(cell[3]));
    }
    return sel.split(",").every((part) => {
      const [pid, rid] = part.trim().split(".");
      const p = d.paragraphs.find((x: { id: string }) => x.id === pid);
      if (!p) return false;
      if (rid) return Boolean(p.runs?.some((r: { id?: string }) => r.id === rid));
      return true;
    });
  }
  if (app === "excel") {
    const sheets = (d.sheets ?? []) as { name: string; charts?: { id: string }[]; objects?: { id: string }[] }[];
    const m = /^(sheet|chart|obj):([^.]+)/.exec(sel);
    if (m?.[1] === "sheet") return sheets.some((s) => s.name === m[2]);
    if (m?.[1] === "chart") return sheets.some((s) => s.charts?.some((c) => c.id === m[2]));
    if (m?.[1] === "obj") return sheets.some((s) => s.objects?.some((o) => o.id === m[2]));
    return /^[A-Z]{1,3}\d+(:[A-Z]{1,3}\d+)?$|^[A-Z]+:[A-Z]+$|^\d+:\d+$/i.test(sel.replace(/\$/g, ""));
  }
  if (app === "powerpoint") {
    // "s2", "s2.title", "s2.body.1" (a line), "s2.o1", "s2.o1.o2" / "s2.o1,s2.o2" (several objects),
    // "s2.o3.r1c2" (a table cell), "master", "master.title", "layout:Title Slide".
    return sel.split(",").every((raw) => {
      const p = raw.trim();
      if (p === "master" || p.startsWith("master.") || p.startsWith("layout:")) return true;
      const [sid, ...rest] = p.split(".");
      const s = d.slides.find((x: { id: string }) => x.id === sid);
      if (!s) return false;
      if (!rest.length || ["title", "body", "body2", "subtitle", "notes"].includes(rest[0])) return true;
      const objs = rest.filter((r) => !/^(r\d+c\d+|\d+|[A-Z]{1,2}\d+|title|legend|data|axis|text)$/.test(r));
      return objs.every((id) => s.objects?.some((o: { id: string }) => o.id === id));
    });
  }
  return true;
}

type Mods = { moduleSlug: string; lessons: { slug: string }[] }[];
const COURSE_MODULES: Record<string, Mods> = {
  "oap/tech-foundations": techFoundationsModules as unknown as Mods,
  "oap/office-apps": officeAppsModules as unknown as Mods,
  "oap/modern-office": modernOfficeModules as unknown as Mods,
  "oap/intro-database": introDatabaseModules as unknown as Mods,
  "ehr/intro-to-ehr": introToEHRModules as unknown as Mods,
  "google-workspace": googleWorkspaceModules as unknown as Mods,
};

function lessonKeys(courseId: string): Set<string> | null {
  const mods = courseId.startsWith("ms-office/") ? (officeApps as Record<string, Mods>)[courseId.split("/")[1]] : COURSE_MODULES[courseId];
  if (!mods) return null;
  const s = new Set<string>();
  for (const m of mods) for (const l of m.lessons) s.add(`${m.moduleSlug}::${l.slug}`);
  return s;
}

const only = process.argv[2];
let errors = 0;
let warnings = 0;
let total = 0;
const ids = new Set<string>();

for (const [courseId, byLesson] of Object.entries(REGISTRY)) {
  const keys = lessonKeys(courseId);
  for (const [lessonKey, sims] of Object.entries(byLesson)) {
    if (keys && !keys.has(lessonKey)) {
      console.log(`✗ ${courseId} ${lessonKey}: no lesson with this module/slug`);
      errors++;
    }
    for (const sim of sims as SimDefinition[]) {
      if (only && sim.app !== only) continue;
      total++;
      const where = `${courseId} › ${lessonKey} › ${sim.id}`;
      const err = (m: string) => { console.log(`✗ ${where}: ${m}`); errors++; };
      const warn = (m: string) => { console.log(`! ${where}: ${m}`); warnings++; };
      if (ids.has(sim.id)) err("duplicate sim id");
      ids.add(sim.id);
      const core = CORES[sim.app];
      if (!core) { err(`no engine for app "${sim.app}"`); continue; }
      const { cmds, dialogs } = catalogFor(core);
      if (sim.tasks.length < 3) warn(`only ${sim.tasks.length} task(s)`);

      let doc: unknown = sim.initial;
      let ui: SimUi = core.initialUi(doc);
      sim.tasks.forEach((task, ti) => {
        if (!task.hint?.trim()) err(`task ${ti + 1} has no hint`);
        task.steps.forEach((step, si) => {
          const tag = `task ${ti + 1} step ${si + 1}`;
          const a = step.action;
          for (const [ai, alt] of (step.alt ?? []).entries()) {
            if (alt.kind === "command" && !cmds.get(alt.id)) err(`${tag}: alt ${ai + 1} command "${alt.id}" is not reachable`);
            if (alt.kind === "dialog" && !dialogs.has(alt.id)) err(`${tag}: alt ${ai + 1} dialog "${alt.id}" can't be opened`);
          }
          if (a.kind === "command") {
            const e = cmds.get(a.id);
            if (!e) err(`${tag}: command "${a.id}" is not reachable from the Ribbon, a shortcut, the canvas or File`);
            else if (e.values && a.value !== undefined) {
              const vals = (Array.isArray(a.value) ? a.value : [a.value]).map(normText);
              if (!vals.some((v) => e.values!.has(v))) err(`${tag}: value ${JSON.stringify(a.value)} is not an option of "${a.id}" (options: ${Array.from(e.values).slice(0, 12).join(" | ")})`);
            } else if (e.values && a.value === undefined && !e.values.has("") && e.values.size > 0) {
              // Any option will match; fine.
            }
          }
          if (a.kind === "dialog") {
            if (!dialogs.has(a.id)) err(`${tag}: dialog "${a.id}" can't be opened from the Ribbon, a shortcut or File`);
            const def = core.dialogs[a.id];
            if (def && a.values) {
              const fields = [...(def.fields ?? []), ...(def.tabs ?? []).flatMap((t) => t.fields)];
              for (const k of Object.keys(a.values)) {
                const f = fields.find((x) => "key" in x && x.key === k);
                if (!f) err(`${tag}: dialog "${a.id}" has no field "${k}"`);
                else if ("options" in f && f.type !== "color" && f.options.length) {
                  const want = (Array.isArray(a.values[k]) ? (a.values[k] as SimValue[]) : [a.values[k] as SimValue]).map(normText);
                  if (!f.options.map(normText).some((o) => want.includes(o))) err(`${tag}: "${k}" value ${JSON.stringify(a.values[k])} is not an option (${f.options.join(" | ")})`);
                }
              }
            }
          }

          // Learner selects what the step requires.
          if (a.kind === "select") {
            const t = Array.isArray(a.target) ? a.target[0] : a.target;
            if (!selectionExists(sim.app, doc, t)) err(`${tag}: select target "${t}" does not exist`);
            ui = { ...ui, selection: t, ...(step.requires?.sheet ? { sheet: step.requires.sheet } : {}), ...(step.requires?.slide ? { slide: step.requires.slide } : {}) };
            doc = applyOps(doc, step.effects);
            return;
          }
          if (step.requires?.selection !== undefined) {
            const t = Array.isArray(step.requires.selection) ? step.requires.selection[0] : step.requires.selection;
            if (!selectionExists(sim.app, doc, t)) err(`${tag}: required selection "${t}" does not exist at this point`);
            ui = { ...ui, selection: t };
          }
          if (step.requires?.sheet) ui = { ...ui, sheet: step.requires.sheet };
          if (step.requires?.slide) ui = { ...ui, slide: step.requires.slide, ...(step.requires.selection === undefined ? { selection: step.requires.slide } : {}) };
          if (a.kind === "type" && !selectionExists(sim.app, doc, a.target) && !["header", "footer", "find"].includes(a.target) && !/^(s\d+|[a-z]+\d*)\.(title|body|body2|subtitle|notes)$/.test(a.target)) {
            warn(`${tag}: type target "${a.target}" not found in the document at this point`);
          }

          const c0 = commitFor(a);
          if (!c0) return;
          const c = core.normalize ? core.normalize(c0, doc) : c0;
          if (!commitMatches(a, c)) err(`${tag}: the expected action doesn't match itself after normalize (use the normalized id)`);
          if (!selectionMatches(step.requires, ui)) err(`${tag}: selection check fails even with the required selection`);
          try {
            if (!step.replaceBuiltIn) {
              const r = core.apply(doc, c, ui);
              doc = r.doc;
              ui = { ...ui, ...(r.ui ?? {}) };
            }
            doc = applyOps(doc, step.effects);
            for (const op of step.effects ?? []) {
              if (op.op === "set" || op.op === "merge") {
                const parent = op.path.split(".").slice(0, -1).join(".");
                if (parent && getPath(doc, parent) === undefined) warn(`${tag}: effect path "${op.path}" created a new branch`);
              }
            }
          } catch (e) {
            err(`${tag}: built-in behavior threw: ${(e as Error).message}`);
          }
        });
      });
    }
  }
}

console.log(`\n${total} simulation(s) checked: ${errors} error(s), ${warnings} warning(s).`);
process.exit(errors ? 1 : 0);
