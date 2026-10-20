import type { SimCommit } from "@/types/sim";
import type { AppCore, SimUi } from "../../types";
import { clone } from "@/lib/sim/ops";
import type { AssistantDoc, AssistantFlow, AssistantMessage, AssistantRule, AssistantUiState, FlowStep } from "./types";
import { actionDef } from "./catalog";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function normPrompt(s: string): string {
  return s
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function splitKey(key: string): [string, string] {
  const i = key.indexOf(":");
  return i < 0 ? [key, ""] : [key.slice(0, i), key.slice(i + 1)];
}

export function parseForm(s: string, keys: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  const known = new Set(keys.map((k) => k.toLowerCase()));
  let cur: string | null = null;
  for (const line of s.split("\n")) {
    const m = /^([A-Za-z][A-Za-z ]{0,40}):\s?(.*)$/.exec(line);
    if (m && known.has(m[1].toLowerCase())) {
      cur = m[1].toLowerCase();
      out[cur] = m[2];
    } else if (cur) out[cur] += `\n${line}`;
  }
  return out;
}

export function ctxOfSelection(sel: string): string {
  if (sel === "chat" || sel.startsWith("agent:")) return sel;
  return "chat";
}

/** Messages visible in a chat (after New chat). */
export function visibleMessages(doc: AssistantDoc, ctx: string): AssistantMessage[] {
  const cut = doc.cut?.[ctx] ?? 0;
  return doc.thread.filter((m, i) => m.ctx === ctx && i >= cut);
}

export function matchRule(doc: AssistantDoc, ctx: string, prompt: string, attachments: string[]): AssistantRule | undefined {
  const p = normPrompt(prompt);
  const agent = ctx === "chat" ? "chat" : ctx.slice(6);
  const last = [...visibleMessages(doc, ctx)].reverse().find((m) => m.role === "assistant");
  const files = attachments.map((a) => a.toLowerCase());
  const ok = (r: AssistantRule) =>
    (!r.agent || r.agent === agent) &&
    (!r.needsFile || files.includes(r.needsFile.toLowerCase())) &&
    r.match.every((group) => group.some((alt) => p.includes(normPrompt(alt))));
  return doc.rules.find((r) => r.after && r.after === last?.rule && ok(r)) ?? doc.rules.find((r) => !r.after && ok(r));
}

const FALLBACK =
  "I can help with that. To give you something you can use right away, tell me a little more:\n- **Who** it is for (the audience)\n- **What** you need (an email, a summary, a list)\n- **The format** (for example, three short paragraphs or five bullets)\n- **The tone** (professional, warm, direct)";

function nextFlowId(doc: AssistantDoc) {
  doc.seq = (doc.seq ?? 0) + 1;
  return `flow${doc.seq}`;
}

function makeStep(id: string, s: Omit<FlowStep, "id">): FlowStep {
  return { id, action: s.action, connector: s.connector, params: { ...s.params } };
}

function stepIds(flow: AssistantFlow) {
  return new Set(flow.steps.map((s) => s.id));
}

function nextStepId(flow: AssistantFlow) {
  const ids = stepIds(flow);
  let n = 1;
  while (ids.has(`a${n}`)) n++;
  return `a${n}`;
}

function flowRunsClean(flow: AssistantFlow): boolean {
  const all = [flow.trigger, ...flow.steps];
  return all.every((s) => (actionDef(s.action)?.params ?? []).filter((p) => p.required).every((p) => (s.params[p.name] ?? "").trim() !== ""));
}

/* ------------------------------------------------------------------ */
/* Apply                                                               */
/* ------------------------------------------------------------------ */

function applyAssistant(input: AssistantDoc, c: SimCommit, uiIn: SimUi): { doc: AssistantDoc; ui?: Partial<SimUi> } {
  const doc = clone(input);
  const ui = uiIn as AssistantUiState;
  const sel = ui.selection ?? "";
  const [selKind, selId] = splitKey(sel);
  const out = (patch?: Partial<AssistantUiState>) => ({ doc, ui: patch as Partial<SimUi> | undefined });
  const msg = selKind === "msg" ? doc.thread.find((m) => m.id === selId) : undefined;
  const flow = selKind === "flow" ? doc.flows?.find((f) => f.id === selId) : undefined;

  if (c.kind === "type") {
    const [kind, rest] = splitKey(c.target);
    if (c.target === "prompt") {
      const ctx = ctxOfSelection(sel);
      const attachments = doc.attached?.[ctx] ?? [];
      const rule = matchRule(doc, ctx, c.value, attachments);
      const n = doc.thread.filter((m) => m.role === "user").length + 1;
      doc.thread.push({ id: `p${n}`, role: "user", ctx, text: c.value, ...(attachments.length ? { attachments: [...attachments] } : {}) });
      doc.thread.push({
        id: `r${n}`,
        role: "assistant",
        ctx,
        text: rule ? rule.response : doc.fallback ?? FALLBACK,
        rule: rule?.id,
        variant: 0,
        ...(rule?.sources ? { sources: rule.sources } : {}),
        ...(rule?.followups ? { followups: rule.followups } : {}),
        ...(rule?.error ? { error: rule.error } : {}),
      });
      if (doc.attached) delete doc.attached[ctx];
      if (!doc.history?.some((h) => h.id === `conv-${ctx}`) && visibleMessages(doc, ctx).filter((m) => m.role === "user").length === 1) {
        doc.history = [{ id: `conv-${ctx}`, title: c.value.length > 42 ? `${c.value.slice(0, 40)}…` : c.value, when: "Today" }, ...(doc.history ?? [])];
      }
      return out();
    }
    if (kind === "edit") {
      const m = doc.thread.find((x) => x.id === rest);
      if (m && c.value.trim()) m.edited = c.value;
      return out();
    }
    if (c.target === "saveprompt") {
      const f = parseForm(c.value, ["Title", "Prompt"]);
      const title = (f.title ?? "").trim() || "Saved prompt";
      doc.savedPrompts = [...(doc.savedPrompts ?? []).filter((p) => p.title !== title), { title, text: (f.prompt ?? "").trim() }];
      return out();
    }
    if (c.target === "flow.create") {
      const f = parseForm(c.value, ["Type", "Name", "Trigger", "Starting", "At", "Repeat every", "On these days"]);
      const type = ((f.type ?? "Automated").trim() as AssistantFlow["type"]) || "Automated";
      const id = nextFlowId(doc);
      let trigger: FlowStep;
      if (type === "Scheduled") {
        const [interval, freq] = (f["repeat every"] ?? "1 Day").trim().split(/\s+/);
        const at = (f.at ?? "8:00 AM").trim();
        const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(at);
        const h24 = m ? (Number(m[1]) % 12) + (m[3].toUpperCase() === "PM" ? 12 : 0) : 8;
        trigger = makeStep("trigger", { action: "Recurrence", connector: "Schedule", params: { Interval: interval || "1", Frequency: freq || "Day", "On these days": (f["on these days"] ?? "").trim(), "At these hours": String(h24), "At these minutes": m ? String(Number(m[2])) : "0", "Time zone": "(UTC-05:00) Eastern Time (US & Canada)", Starting: (f.starting ?? "").trim() } });
      } else {
        const tname = (f.trigger ?? (type === "Instant" ? "Manually trigger a flow" : "When a new email arrives (V3)")).trim();
        const def = actionDef(tname);
        trigger = makeStep("trigger", { action: def?.name ?? tname, connector: def?.connector ?? "Office 365 Outlook", params: def?.name === "When a new email arrives (V3)" ? { Folder: "Inbox" } : {} });
      }
      doc.flows = [...(doc.flows ?? []), { id, name: (f.name ?? "").trim() || "Untitled", type, trigger, steps: [], saved: false, on: true, lastTest: null, runs: 0, modified: "Just now" }];
      return out({ view: "automate", page: "designer", flow: id, selection: `flow:${id}` });
    }
    if (c.target === "flow.describe") {
      const p = normPrompt(c.value);
      const idea = doc.flowIdeas?.find((i) => i.match.every((g) => g.some((alt) => p.includes(normPrompt(alt)))));
      if (!idea) {
        doc.flags = { ...(doc.flags ?? {}), describeMiss: c.value };
        return out();
      }
      const id = nextFlowId(doc);
      doc.flows = [...(doc.flows ?? []), { id, name: idea.name, type: idea.type, trigger: makeStep("trigger", idea.trigger), steps: idea.steps.map((s, i) => makeStep(`a${i + 1}`, s)), saved: false, on: true, lastTest: null, runs: 0, modified: "Just now" }];
      return out({ view: "automate", page: "designer", flow: id, selection: `flow:${id}` });
    }
    if (kind === "flowparam") {
      const [fid, sid, ...pn] = rest.split("/");
      const param = pn.join("/");
      const fl = doc.flows?.find((x) => x.id === fid);
      const step = fl ? (sid === "trigger" ? fl.trigger : fl.steps.find((s) => s.id === sid)) : undefined;
      if (fl && step) {
        step.params = { ...step.params, [param]: c.value };
        fl.saved = false;
      }
      return out();
    }
    return out();
  }

  if (c.kind !== "command") return out();
  const v = c.value === undefined ? "" : String(c.value);
  switch (c.id) {
    case "prompt.attach": {
      const ctx = ctxOfSelection(sel);
      const list = doc.attached?.[ctx] ?? [];
      if (!list.includes(v)) doc.attached = { ...(doc.attached ?? {}), [ctx]: [...list, v] };
      return out();
    }
    case "prompt.detach": {
      const ctx = ctxOfSelection(sel);
      doc.attached = { ...(doc.attached ?? {}), [ctx]: (doc.attached?.[ctx] ?? []).filter((x) => x !== v) };
      return out();
    }
    case "response.copy":
      if (msg) {
        msg.copied = true;
        doc.clipboard = msg.edited ?? msg.text;
      }
      return out();
    case "response.regenerate": {
      if (!msg || msg.role !== "assistant") return out();
      const rule = doc.rules.find((r) => r.id === msg.rule);
      const all = rule ? [rule.response, ...(rule.variants ?? [])] : [msg.text];
      const nv = ((msg.variant ?? 0) + 1) % all.length;
      msg.variant = nv;
      msg.text = all[nv];
      msg.edited = undefined;
      msg.copied = false;
      msg.feedback = undefined;
      return out();
    }
    case "response.feedback":
      if (msg) msg.feedback = v || "Like";
      return out();
    case "source.open":
    case "chat.new": {
      if (c.id === "chat.new") {
        const ctx = ctxOfSelection(sel);
        doc.cut = { ...(doc.cut ?? {}), [ctx]: doc.thread.length };
        doc.attached = { ...(doc.attached ?? {}), [ctx]: [] };
      }
      return out();
    }
    case "settings.training":
    case "settings.voiceTraining":
    case "settings.personalization": {
      const key = c.id === "settings.training" ? "training" : c.id === "settings.voiceTraining" ? "voiceTraining" : "personalization";
      doc.settings = { ...(doc.settings ?? {}), [key]: v.toLowerCase() === "on" };
      return out();
    }
    case "history.delete":
      doc.history = (doc.history ?? []).filter((h) => h.id !== (v || selId));
      return out();
    case "account.switch":
      if (doc.accounts?.some((a) => a.id === v)) doc.account = v;
      return out();

    /* ---------- flows ---------- */
    case "flow.template": {
      const t = doc.templates?.find((x) => x.name.toLowerCase() === v.toLowerCase());
      if (!t) return out();
      const id = nextFlowId(doc);
      doc.flows = [...(doc.flows ?? []), { id, name: t.name, type: t.type, trigger: makeStep("trigger", t.trigger), steps: t.steps.map((s, i) => makeStep(`a${i + 1}`, s)), saved: false, on: true, lastTest: null, runs: 0, modified: "Just now" }];
      return out({ view: "automate", page: "designer", flow: id, selection: `flow:${id}` });
    }
    case "flow.addAction": {
      if (!flow) return out();
      const def = actionDef(v);
      const id = nextStepId(flow);
      const step: FlowStep = { id, action: def?.name ?? v, connector: def?.connector ?? "Control", params: {} };
      const after = ui.insertAfter;
      const idx = after && after !== "end" ? (after === "trigger" ? 0 : flow.steps.findIndex((s) => s.id === after) + 1) : flow.steps.length;
      flow.steps.splice(idx < 0 ? flow.steps.length : idx, 0, step);
      flow.saved = false;
      return out();
    }
    case "flow.removeAction":
      if (flow) {
        flow.steps = flow.steps.filter((s) => s.id !== v);
        flow.saved = false;
      }
      return out();
    case "flow.save":
      if (flow) {
        flow.saved = true;
        flow.modified = "Just now";
      }
      return out();
    case "flow.test":
      if (flow) {
        flow.saved = true;
        flow.lastTest = flowRunsClean(flow) ? "Succeeded" : "Failed";
        flow.runs = (flow.runs ?? 0) + 1;
      }
      return out();
    case "flow.turnOn":
    case "flow.turnOff":
      if (flow) flow.on = c.id === "flow.turnOn";
      return out();
    case "flow.delete":
      if (flow) doc.flows = (doc.flows ?? []).filter((f) => f.id !== flow.id);
      return out({ page: "flows", selection: "flows" });
  }
  return out();
}

function selectionExists(doc: AssistantDoc, sel: string): boolean {
  if (!sel) return true;
  const [kind, id] = splitKey(sel);
  switch (kind) {
    case "chat":
    case "prompt":
    case "settings":
    case "account":
    case "flows":
    case "saveprompt":
    case "flow.create":
    case "flow.describe":
      return true;
    case "agent":
      return Boolean(doc.agents?.some((a) => a.id === id));
    case "msg":
    case "edit":
      return doc.thread.some((m) => m.id === id);
    case "history":
      return Boolean(doc.history?.some((h) => h.id === id));
    case "flow":
      return Boolean(doc.flows?.some((f) => f.id === id));
    case "flowparam": {
      const [fid, sid] = id.split("/");
      const fl = doc.flows?.find((f) => f.id === fid);
      return Boolean(fl && (sid === "trigger" || fl.steps.some((s) => s.id === sid)));
    }
  }
  return false;
}

export const assistantCore: AppCore<AssistantDoc> = {
  name: "Copilot",
  accent: "#6d28d9",
  chrome: "bare",
  autosave: false,
  ribbon: [{ id: "home", label: "Home", groups: [] }],
  dialogs: {},
  backstage: { templates: [], recent: [], formats: [], ext: "" },
  shortcuts: {},
  canvasCommands: [
    "prompt.attach", "prompt.detach", "response.copy", "response.regenerate", "response.feedback", "source.open", "chat.new",
    "settings.training", "settings.voiceTraining", "settings.personalization", "history.delete", "account.switch",
    "flow.template", "flow.addAction", "flow.removeAction", "flow.save", "flow.test", "flow.turnOn", "flow.turnOff", "flow.delete",
  ],
  freeCommands: ["source.open", "chat.new", "prompt.detach"],
  initialUi: (doc) => {
    const s = doc.start ?? {};
    const view = s.view ?? "chat";
    const ctx = s.ctx ?? "chat";
    const u: AssistantUiState = {
      selection: view === "automate" ? (s.flow ? `flow:${s.flow}` : "flows") : s.settings ? "settings" : ctx,
      view,
      ctx,
      page: s.page ?? (s.flow ? "designer" : "home"),
      flow: s.flow,
      overlay: s.settings ? "settings" : null,
    };
    return u as SimUi;
  },
  apply: applyAssistant,
  ribbonState: () => ({}),
  selectionExists,
  describeSelection: (_doc, ui) => ui.selection,
};
