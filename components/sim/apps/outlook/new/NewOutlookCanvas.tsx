"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { DialogDef, RibbonOption, RibbonTab, SimCommit, SimValue } from "@/types/sim";
import type { CanvasProps, StatusBarProps } from "../../../types";
import type { OutlookDoc } from "../types";
import { composeSource, formSource, type ComposeDraft, type Ctx, type FormDraft } from "../ctx";
import { Avatar, ContextMenu, OIcon, type AlertSpec, type MenuEntry } from "../parts";
import { CalendarView } from "../calendar";
import { resolveToken } from "../mail";
import { folderOptions, joinTokens, moduleOf, occurrences, recurrenceText, selEvent, selKeys, selMessage, todayOf } from "../model";
import { fmtDate, fmtTime, parseUsDate } from "../dates";
import { newOutlookCore } from "./core";
import { newOutlookRibbon } from "./ribbon";
import { SWEEP_OPTIONS, catLabel } from "./model";
import { RibbonBar } from "./RibbonBar";
import { ComposeNew, FolderPaneNew, MessageListNew, MessageViewNew, ReadingPaneNew, ownTree, signatureInsert, type NCtx } from "./mailNew";
import { CalendarPaneNew, EventFormNew } from "./calendarNew";
import { ContactDetailsNew, ContactFormNew, GroupFormNew, PeopleListNew, PeoplePaneNew, askDeletePerson } from "./peopleNew";
import { TodoMainNew, TodoPaneNew } from "./todoNew";
import { SettingsModal, pageFor } from "./settingsNew";
import { FButton, FluentDialog, FluentModal, NMenu, settle, type NEntry } from "./ui";

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const NO_PENDING_C = { to: "", cc: "", bcc: "" };
const NO_PENDING_F = { required: "", optional: "", assignTo: "" };

/** Local copy of an open item's fields that follows the document unless the learner has edited a field. */
function useDraft<S extends Record<string, unknown>, P>(src: S | null, key: string | null, emptyPending: P) {
  type D = S & { pending: P };
  const make = (s: S): D => ({ ...s, pending: emptyPending }) as D;
  const [draft, setDraft] = useState<D | null>(src ? make(src) : null);
  const base = useRef<{ key: string | null; v: S | null }>({ key, v: src });
  useEffect(() => {
    const b = base.current;
    setDraft((prev) => {
      if (!src) return null;
      if (!prev || b.key !== key || !b.v) return make(src);
      const next = { ...prev } as Record<string, unknown>;
      for (const k of Object.keys(src)) if (same((prev as Record<string, unknown>)[k], (b.v as Record<string, unknown>)[k])) next[k] = (src as Record<string, unknown>)[k];
      return next as D;
    });
    base.current = { key, v: src };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, key]);
  const ref = useRef(draft);
  ref.current = draft;
  const patch = useCallback(
    (p: Partial<D>) =>
      setDraft((prev) => {
        const cur = prev ?? (base.current.v ? make(base.current.v) : null);
        const next = cur ? ({ ...cur, ...p } as D) : null;
        ref.current = next;
        return next;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return [draft, patch, ref] as const;
}

function isTyping(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  return Boolean(el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable));
}

/** Ribbon tabs for the current document, with the mailbox's own items in the menus. */
function tabsFor(doc: OutlookDoc, keys: string[]): RibbonTab[] {
  const sigs: RibbonOption[] = (doc.signatures ?? []).map((s) => ({ value: s.name, icon: "pen" }));
  const qs: RibbonOption[] = (doc.quickSteps ?? []).map((q) => ({ value: q.name, icon: "bolt" }));
  const cats = (o: RibbonOption): RibbonOption => (o.value.endsWith(" Category") ? { ...o, label: catLabel(doc, o.value) } : o);
  // Move to lists the mailbox's own folders (the same list as right-click › Move), then Move to a different folder...
  const moveFolders: RibbonOption[] = ownTree(doc)
    .filter((x) => !["outbox", "drafts", "sent"].includes(x.folder.id))
    .map((x) => ({ value: x.folder.name, label: `${"\u00a0".repeat(x.depth * 3)}${x.folder.name}`, icon: x.folder.id === "archive" ? "archive" : x.folder.id === "inbox" ? "inbox" : "folder" }));
  return newOutlookRibbon
    .filter((t) => !t.contextual || keys.includes(t.contextual))
    .map((t) => ({
      ...t,
      groups: t.groups.filter((g) => doc.copilot || !g.controls.some((c) => c.type === "dropdown" && c.id === "compose.copilot")).map((g) => ({
        ...g,
        controls: g.controls.map((c) => {
          if (c.type !== "dropdown") return c;
          if (c.id === "compose.insertSignature") return { ...c, options: [...sigs, ...c.options] };
          if (c.id === "home.quickStep") return { ...c, options: [...qs, ...c.options] };
          if (c.id === "mail.move") return { ...c, options: [...moveFolders, ...c.options.filter((o) => o.dialog)] };
          if (c.id === "item.categorize" || c.id === "form.categorize") return { ...c, options: c.options.map(cats) };
          if (c.id === "compose.sensitivity" && doc.sensitivityLabels) return { ...c, options: doc.sensitivityLabels.map((v) => ({ value: v })) };
          return c;
        }),
      })),
    }));
}

export function NewOutlookCanvas({ doc, ui, accent, onSelect, onCommit }: CanvasProps<OutlookDoc>) {
  const docRef = useRef(doc);
  docRef.current = doc;
  const rootRef = useRef<HTMLDivElement>(null);
  const [nmenu, setNmenu] = useState<{ x: number; y: number; items: NEntry[] } | null>(null);
  const [cmenu, setCmenu] = useState<{ x: number; y: number; items: MenuEntry[] } | null>(null);
  const [alert, setAlert] = useState<AlertSpec | null>(null);
  const [dialog, setDialog] = useState<string | null>(null);
  const [settings, setSettings] = useState<string | null>(null);
  const [peopleView, setPeopleView] = useState<"contacts" | "lists">("contacts");
  const [toast, setToast] = useState<string | null>(null);
  const [undo, setUndo] = useState<{ id: string; left: number } | null>(null);
  const [width, setWidth] = useState(1100);
  const [search, setSearch] = useState(doc.search ?? "");
  const [adv, setAdv] = useState(false);
  const [advV, setAdvV] = useState<Record<string, string>>({});
  useEffect(() => setSearch(doc.search ?? ""), [doc.search]);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cmd = useCallback((id: string, value?: SimValue) => onCommit({ kind: "command", id, value }), [onCommit]);
  const select = useCallback((sel: string) => onSelect({ selection: sel }), [onSelect]);
  const openDialog = useCallback((id: string) => setDialog(id), []);

  /* ---------- drafts ---------- */
  const csrc = useMemo(() => composeSource(doc.compose), [doc.compose]);
  const [cdraft, setCdraft, cdraftRef] = useDraft(csrc, doc.compose?.id ?? null, NO_PENDING_C);
  const fsrc = useMemo(() => formSource(doc.form), [doc.form]);
  const fkey = doc.form ? `${doc.form.kind === "meeting" || doc.form.kind === "appointment" ? "event" : doc.form.kind}:${doc.form.id ?? "new"}` : null;
  const [fdraft, setFdraft, fdraftRef] = useDraft(fsrc, fkey, NO_PENDING_F);

  const runChain = useCallback(
    async (steps: { commit: SimCommit; ok: (d: OutlookDoc) => boolean }[]) => {
      for (const s of steps) {
        const before = docRef.current;
        onCommit(s.commit);
        const changed = await settle(() => docRef.current !== before, 450);
        if (!changed || !s.ok(docRef.current)) return false;
      }
      return true;
    },
    [onCommit],
  );

  const ctxRef = useRef<NCtx | null>(null);
  const resolvePending = (lists: Record<string, string[]>, pending: Record<string, string>): string | null => {
    for (const k of Object.keys(pending)) {
      const t = pending[k].trim();
      if (!t) continue;
      const r = ctxRef.current ? resolveToken(ctxRef.current, t) : null;
      if (!r) return t;
      lists[k] = Array.from(new Set([...(lists[k] ?? []), r]));
      pending[k] = "";
    }
    return null;
  };

  const composeFields = useCallback(
    async (final: () => void) => {
      const c = docRef.current.compose;
      if (!c) return;
      const d: ComposeDraft = cdraftRef.current ?? { to: c.to, cc: c.cc, bcc: c.bcc, subject: c.subject, body: c.body, pending: NO_PENDING_C };
      const lists: Record<string, string[]> = { to: [...d.to], cc: [...d.cc], bcc: [...d.bcc] };
      const pending: Record<string, string> = { ...d.pending };
      const bad = resolvePending(lists, pending);
      if (bad) {
        setAlert({ title: "Outlook", text: `Outlook doesn't recognize "${bad}". Check the spelling, or type a full email address such as name@example.com.`, buttons: [{ label: "OK", primary: true }] });
        return;
      }
      setCdraft({ to: lists.to, cc: lists.cc, bcc: lists.bcc, pending: NO_PENDING_C } as Partial<ComposeDraft>);
      if (!lists.to.length && !lists.cc.length && !lists.bcc.length) {
        setAlert({ title: "Outlook", text: "This message must have at least one recipient.", buttons: [{ label: "OK", primary: true }] });
        return;
      }
      const go = async () => {
        const cur = docRef.current.compose;
        if (!cur) return;
        const steps: { commit: SimCommit; ok: (x: OutlookDoc) => boolean }[] = [];
        for (const f of ["to", "cc", "bcc"] as const) {
          const v = joinTokens(lists[f]);
          if (v !== joinTokens(cur[f]) || (f === "to" && cur.prefilled && v)) steps.push({ commit: { kind: "type", target: `compose.${f}`, value: v }, ok: (x) => joinTokens(x.compose?.[f]) === v && !(f === "to" && x.compose?.prefilled) });
        }
        if (d.subject !== cur.subject) steps.push({ commit: { kind: "type", target: "compose.subject", value: d.subject }, ok: (x) => x.compose?.subject === d.subject });
        if (d.body !== cur.body) steps.push({ commit: { kind: "type", target: "compose.body", value: d.body }, ok: (x) => x.compose?.body === d.body });
        if (await runChain(steps)) final();
      };
      const written = d.body.replace(/\n\n[\s\S]*$/, "");
      if (/\battach(ed|ment|ing)?\b/i.test(written) && !c.attachments.length) {
        setAlert({ title: "Did you forget to attach a file?", text: "You mentioned an attachment in your message, but there are no files attached.", buttons: [{ label: "Don't send", primary: true }, { label: "Send anyway", onClick: () => void go() }] });
        return;
      }
      if (!d.subject.trim()) {
        setAlert({ title: "Send without a subject?", text: "This message doesn't have a subject. Do you want to send it anyway?", buttons: [{ label: "Send", onClick: () => void go() }, { label: "Don't send", primary: true }] });
        return;
      }
      void go();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runChain, setCdraft],
  );
  const send = useCallback(() => void composeFields(() => onCommit({ kind: "command", id: "compose.send" })), [composeFields, onCommit]);
  const scheduleSend = useCallback(() => void composeFields(() => setDialog("scheduleSend")), [composeFields]);
  const saveDraft = useCallback(() => {
    const c = docRef.current.compose;
    const d = cdraftRef.current;
    if (!c || !d) return;
    cmd("compose.saveDraft", JSON.stringify({ to: d.to, cc: d.cc, bcc: d.bcc, subject: d.subject, body: d.body }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cmd]);

  const saveForm = useCallback(async () => {
    const f = docRef.current.form;
    const d0 = fdraftRef.current;
    if (!f || !d0) return;
    const d: FormDraft = { ...d0, pending: { ...d0.pending } };
    const lists: Record<string, string[]> = { required: [...d.required], optional: [...d.optional], assignTo: [...d.assignTo] };
    const pending: Record<string, string> = { ...d.pending };
    const bad = resolvePending(lists, pending);
    if (bad) {
      setAlert({ title: "Outlook", text: `Outlook doesn't recognize "${bad}".`, buttons: [{ label: "OK", primary: true }] });
      return;
    }
    setFdraft({ required: lists.required, optional: lists.optional, assignTo: lists.assignTo, pending: NO_PENDING_F } as Partial<FormDraft>);
    const steps: { commit: SimCommit; ok: (x: OutlookDoc) => boolean }[] = [];
    let final: SimCommit;
    if (f.kind === "appointment" || f.kind === "meeting") {
      const start = d.allDay ? d.startDate : `${d.startDate}T${d.startTime}`;
      const end = d.allDay ? d.endDate : `${d.endDate}T${d.endTime}`;
      if (end < start) {
        setAlert({ title: "Outlook", text: "The end time is before the start time.", buttons: [{ label: "OK", primary: true }] });
        return;
      }
      for (const k of ["required", "optional"] as const) {
        const v = joinTokens(lists[k]);
        if (v !== joinTokens(f.data[k])) steps.push({ commit: { kind: "type", target: `event.${k}`, value: v }, ok: (x) => joinTokens(x.form?.data[k]) === v });
      }
      if (d.body !== (f.data.body ?? "")) steps.push({ commit: { kind: "type", target: "event.body", value: d.body }, ok: (x) => x.form?.data.body === d.body });
      const meeting = lists.required.length + lists.optional.length > 0;
      final = {
        kind: "dialog",
        id: "event.save",
        values: {
          title: d.title, location: d.location || (f.data.teams ? "Microsoft Teams Meeting" : ""), startDate: fmtDate(d.startDate), startTime: fmtTime(`${d.startDate}T${d.startTime}`),
          endDate: fmtDate(d.endDate), endTime: fmtTime(`${d.endDate}T${d.endTime}`), allDay: d.allDay, reminder: f.data.reminder ?? "15 minutes", showAs: f.data.showAs ?? "Busy",
          recurrence: recurrenceText(f.data.recurrence), teams: Boolean(f.data.teams), private: Boolean(f.data.private), meeting,
          required: joinTokens(lists.required), optional: joinTokens(lists.optional),
        },
      };
    } else if (f.kind === "contact") {
      if (d.notes !== (f.data.notes ?? "")) steps.push({ commit: { kind: "type", target: "form.notes", value: d.notes }, ok: (x) => x.form?.data.notes === d.notes });
      final = { kind: "dialog", id: "contact.save", values: { name: d.name.trim(), company: d.company.trim(), jobTitle: d.jobTitle.trim(), email: d.email.trim(), phone: d.phone.trim(), mobile: d.mobile.trim(), address: d.address.trim() } };
    } else if (f.kind === "group") {
      const v = joinTokens(d.members);
      if (v !== joinTokens(f.data.members)) steps.push({ commit: { kind: "type", target: "group.members", value: v }, ok: (x) => joinTokens(x.form?.data.members) === v });
      if (d.notes !== (f.data.notes ?? "")) steps.push({ commit: { kind: "type", target: "form.notes", value: d.notes }, ok: (x) => x.form?.data.notes === d.notes });
      final = { kind: "dialog", id: "group.save", values: { name: d.name.trim(), members: v } };
    } else {
      final = { kind: "dialog", id: "task.save", values: { subject: d.subject.trim(), status: d.status, priority: d.priority } };
    }
    if (await runChain(steps)) onCommit(final);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runChain, onCommit, setFdraft]);

  /* ---------- requests from the Ribbon or keyboard (Ctrl+Enter, Save) ---------- */
  const seen = useRef<Record<string, number>>({});
  const watch = (key: string | undefined, seq: number | undefined, run: () => void) => {
    if (!key) return;
    const prev = seen.current[key];
    seen.current[key] = seq ?? 0;
    if (prev !== undefined && (seq ?? 0) > prev) run();
  };
  useEffect(() => watch(doc.compose ? `send:${doc.compose.id}` : undefined, doc.compose?.sendSeq, send), [doc.compose?.id, doc.compose?.sendSeq]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => watch(fkey ? `form:${fkey}` : undefined, doc.form?.submitSeq, () => void saveForm()), [fkey, doc.form?.submitSeq]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------- mark as read when the selection moves on ---------- */
  const prevSel = useRef<{ id: string; unread: boolean } | null>(null);
  useEffect(() => {
    const ids = selKeys(ui.selection).filter((k) => k.startsWith("msg:")).map((k) => k.slice(4));
    const cur = ids.length === 1 ? ids[0] : null;
    const p = prevSel.current;
    if (p && p.id !== cur && p.unread) {
      const m = docRef.current.messages.find((x) => x.id === p.id);
      if (m && !m.read && m.folder !== "drafts") onCommit({ kind: "command", id: "mail.autoRead", value: p.id });
    }
    if (cur !== (p?.id ?? null)) {
      const m = docRef.current.messages.find((x) => x.id === cur);
      prevSel.current = cur ? { id: cur, unread: Boolean(m && !m.read) } : null;
    }
  }, [ui.selection]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------- undo send ---------- */
  useEffect(() => {
    if (doc.lastSent && (doc.undoSend ?? 0) > 0) setUndo({ id: doc.lastSent, left: doc.undoSend ?? 0 });
    else setUndo(null);
  }, [doc.lastSent, doc.undoSend]);
  useEffect(() => {
    if (!undo) return;
    if (undo.left <= 0) {
      setUndo(null);
      return;
    }
    const t = setTimeout(() => setUndo((u) => (u ? { ...u, left: u.left - 1 } : u)), 1000);
    return () => clearTimeout(t);
  }, [undo]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  /* ---------- context ---------- */
  const openSettings = useCallback((page?: string) => {
    setSettings(pageFor(page));
  }, []);
  const ctx: NCtx = {
    doc,
    ui,
    accent,
    select,
    commit: onCommit,
    cmd,
    openDialog,
    menu: (at, items) => setCmenu({ ...at, items }),
    alert: setAlert,
    cdraft,
    setCdraft: setCdraft as (p: Partial<ComposeDraft>) => void,
    fdraft,
    setFdraft: setFdraft as (p: Partial<FormDraft>) => void,
    send,
    scheduleSend,
    saveDraft,
    saveForm: () => void saveForm(),
    narrow: width < 900,
    nmenu: (at, items) => setNmenu({ ...at, items }),
    settings: openSettings,
    toast: setToast,
  };
  ctxRef.current = ctx;

  /* ---------- Ribbon ---------- */
  const mod = moduleOf(doc);
  const keys = useMemo(() => {
    const k = newOutlookCore.contextualTabs!(doc, ui);
    if (!doc.form && mod !== "tasks") k.push("main");
    return k;
  }, [doc, ui, mod]);
  const tabs = useMemo(() => tabsFor(doc, keys), [doc, keys]);
  const [activeTab, setActiveTab] = useState("home");
  const ctxKey = keys.join(",");
  const prevKeys = useRef<string[]>(keys);
  useEffect(() => {
    const before = prevKeys.current;
    prevKeys.current = keys;
    const fresh = keys.filter((k) => !before.includes(k));
    if (fresh.includes("compose")) setActiveTab("message");
    else if (fresh.includes("eventForm")) setActiveTab("event");
    else if (fresh.includes("search")) setActiveTab("search");
    else if (!tabs.some((t) => t.id === activeTab)) setActiveTab(tabs[0]?.id ?? "home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxKey]);
  const ribbonState = useMemo(() => newOutlookCore.ribbonState(doc, ui), [doc, ui]);
  const h = {
    onCmd: (id: string, value?: SimValue) => {
      if (id === "settings.open") {
        openSettings(value === undefined ? undefined : String(value));
        cmd(id, value);
        return;
      }
      if (id === "item.delete" && moduleOf(doc) === "people" && /^(contact|group):/.test(ui.selection ?? "")) return askDeletePerson(ctxRef.current!);
      if (id === "settings.calendar") {
        openSettings("Calendar/View");
        cmd("settings.open", "Calendar settings");
        return;
      }
      if (id === "home.quickStep" && value === "Manage quick steps") return openSettings("Mail/Quick steps");
      if (id === "compose.insertSignature") {
        if (value === "Signatures") return openSettings("Accounts/Signatures");
        const d = cdraftRef.current;
        if (d && value) setCdraft({ body: signatureInsert(doc, d.body, String(value)) } as Partial<ComposeDraft>);
      }
      if (id === "view.folderPane" && value === undefined) return cmd(id, (doc.folderPane ?? "Normal") === "Off" ? "Normal" : "Off");
      if (id === "event.saveClose" || id === "contact.saveClose" || id === "group.saveClose") return void saveForm();
      cmd(id, value);
    },
    onDialog: (id: string) => {
      if (id === "attachFile" && !doc.compose) return;
      setDialog(id);
    },
  };

  /* ---------- keyboard ---------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (isTyping(e.target)) return;
    if (dialog || settings) e.stopPropagation();
  };

  /* ---------- dialogs ---------- */
  const dialogDef = (id: string): DialogDef | undefined => {
    const base = newOutlookCore.dialogDef?.(doc, ui, id) ?? newOutlookCore.dialogs[id];
    if (!base) return undefined;
    const folders = folderOptions(doc).map((f) => f.trim());
    const m = selMessage(doc, ui);
    if (id === "sweep") {
      return {
        ...base,
        title: m ? `Sweep messages from ${m.from.name}` : "Sweep",
        fields: [
          { type: "radio", key: "option", label: m ? `Messages from ${m.from.email}` : "Messages", options: SWEEP_OPTIONS, default: SWEEP_OPTIONS[0] },
          { type: "select", key: "folder", label: "Move to", options: ["Deleted Items", "Archive", ...folders.filter((f) => !["Deleted Items", "Archive", "Drafts", "Sent Items", "Outbox"].includes(f))] },
        ],
      };
    }
    if (id === "createRuleQuick") return { ...base, title: "Create a rule", fields: [{ type: "note", text: m ? `Always move messages from ${m.from.name} to this folder:` : "Move messages to:" }, { type: "select", key: "folder", label: "Folder", options: folders.filter((f) => !["Drafts", "Sent Items", "Outbox"].includes(f)) }] };
    if (id === "moveTo") return { ...base, title: "Move to a different folder", fields: [{ type: "list", key: "folder", label: "Choose a folder", options: folderOptions(doc).filter((f) => !/^\s*(Drafts|Sent Items|Outbox)$/.test(f)), height: 200 }] };
    if (id === "attachFile") {
      const files = doc.files ?? [];
      return {
        ...base,
        title: "Attach file",
        fields: [
          { type: "list", key: "file", label: "Suggested files, OneDrive and this computer", options: files.length ? files.map((f) => f.name) : ["(no files)"], height: 150 },
          { type: "radio", key: "attachAs", label: "How do you want to share this file?", options: ["Share link", "Attach as copy"], default: files[0]?.cloud ? "Share link" : "Attach as copy" },
          { type: "note", text: "A link keeps the message small and everyone works on the same file. A copy sends a separate file each person can change." },
        ],
      };
    }
    if (id === "insertPicture") return { ...base, fields: [{ type: "list", key: "file", label: "Pictures on this computer", options: (doc.files ?? []).filter((f) => /\.(png|jpe?g|gif)$/i.test(f.name)).map((f) => f.name), height: 120 }] };
    if (id === "altText") return { ...base, fields: [{ type: "select", key: "name", label: "Picture", options: (doc.compose?.images ?? []).map((i) => i.name) }, { type: "text", key: "text", label: "Alternative text" }] };
    // New Outlook: Propose new time › I might attend / No, I won't attend › pick a time › Done (Microsoft Support, "Propose a new meeting time in Outlook").
    if (id === "proposeTime" || id === "proposeTimeDecline") return { ...base, title: "Propose new time" };
    if (id === "scheduleSend") return { ...base, title: "Schedule send" };
    if (id === "recurrence") return { ...base, title: "Repeat", fields: (base.tabs ?? []).flatMap((t) => t.fields), tabs: undefined };
    return base;
  };

  const dlgDef = dialog ? dialogDef(dialog) : undefined;

  /* ---------- layout ---------- */
  const paneOff = (doc.folderPane ?? "Normal") === "Off";
  const side =
    paneOff ? null : (
      <aside aria-label="Navigation pane" className="flex w-[220px] shrink-0 flex-col">
        {mod === "calendar" ? <CalendarPaneNew ctx={ctx} /> : mod === "people" ? <PeoplePaneNew ctx={ctx} view={peopleView} setView={setPeopleView} /> : mod === "tasks" ? <TodoPaneNew ctx={ctx} /> : <FolderPaneNew ctx={ctx} />}
      </aside>
    );
  const card = "rounded-lg bg-white shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]";
  let main: React.ReactNode;
  if (mod === "calendar") {
    main = doc.form && (doc.form.kind === "appointment" || doc.form.kind === "meeting") ? <EventFormNew ctx={ctx} /> : <div className={`flex min-h-0 min-w-0 flex-1 overflow-hidden ${card}`}><CalendarView ctx={ctx} /></div>;
  } else if (mod === "people") {
    main =
      doc.form?.kind === "contact" ? <ContactFormNew ctx={ctx} /> : doc.form?.kind === "group" ? <GroupFormNew ctx={ctx} /> : (
        <>
          <PeopleListNew ctx={ctx} view={peopleView} />
          <ContactDetailsNew ctx={ctx} />
        </>
      );
  } else if (mod === "tasks") {
    main = <TodoMainNew ctx={ctx} />;
  } else {
    const rp = doc.readingPane ?? "Right";
    const listW = width < 900 ? "w-[280px]" : "w-[340px]";
    const reading = <div className={`flex min-h-0 min-w-0 flex-1 ${card}`}>{doc.form?.kind === "contact" ? <ContactFormNew ctx={ctx} /> : <ReadingPaneNew ctx={ctx} />}</div>;
    main =
      rp === "Off" && !doc.compose ? (
        <MessageListNew ctx={ctx} />
      ) : rp === "Bottom" ? (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
          <div className="flex h-[42%] min-h-0">
            <MessageListNew ctx={ctx} />
          </div>
          {reading}
        </div>
      ) : (
        <>
          <div className={`flex min-h-0 shrink-0 ${listW}`}>
            <MessageListNew ctx={ctx} />
          </div>
          {reading}
        </>
      );
  }
  if (doc.form && mod === "mail" && (doc.form.kind === "appointment" || doc.form.kind === "meeting")) main = <EventFormNew ctx={ctx} />;
  if (doc.form && mod !== "people" && (doc.form.kind === "contact" || doc.form.kind === "group")) main = doc.form.kind === "contact" ? <ContactFormNew ctx={ctx} /> : <GroupFormNew ctx={ctx} />;

  const navItems: [string, string, string][] = [
    ["Mail", "mail", "mail"],
    ["Calendar", "calendar", "calendar"],
    ["People", "people", "people"],
    ["To Do", "tasks", "todo"],
  ];
  const today = todayOf(doc);
  const myDay = occurrences(doc, today, today).filter((o) => !o.evt.calendar);

  return (
    <div ref={rootRef} onKeyDown={onKeyDown} className="relative flex h-full min-h-0 flex-col bg-[#f5f5f5] text-gray-900" style={{ fontFamily: "'Segoe UI Variable', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}>
      {/* Title bar */}
      <div className="flex h-11 shrink-0 items-center gap-2 bg-[#f5f5f5] px-3">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-gray-800">
          <span className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-[#0f6cbd] text-[11px] font-bold text-white">O</span>
          Outlook
        </span>
        <div className="flex flex-1 justify-center">
          <div className="relative flex w-full max-w-[460px] items-center gap-2 rounded-md border border-transparent bg-white px-2.5 py-1 shadow-[0_0_2px_rgba(0,0,0,0.12)] focus-within:border-[#0f6cbd]">
            <OIcon name="search" size={15} className="text-[#0f6cbd]" />
            <input
              aria-label="Search"
              placeholder="Search"
              data-search="1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") cmd("mail.search", search);
                if (e.key === "Escape") cmd("search.close");
              }}
              className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
            />
            {doc.search && (
              <button type="button" aria-label="Exit search" data-c="search.close" onClick={() => cmd("search.close")} className="text-gray-500 hover:text-gray-800">
                <OIcon name="close" size={12} />
              </button>
            )}
            <button type="button" aria-label="Search filters" title="Filters" data-searchfilters="1" onClick={() => setAdv((v) => !v)} className="text-gray-600 hover:text-gray-900">
              <OIcon name="filter" size={14} />
            </button>
            {adv && (
              <div className="absolute left-1/2 top-11 z-[95] w-[380px] -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-4 text-[13px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                {(["From", "To", "Subject", "Keywords"] as const).map((k) => (
                  <label key={k} className="mb-2 flex items-center gap-2">
                    <span className="w-16 text-gray-700">{k}</span>
                    <input data-f={`adv${k}`} value={advV[k] ?? ""} onChange={(e) => setAdvV({ ...advV, [k]: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 rounded-[4px] border border-gray-300 px-2 py-1 outline-none focus:border-[#0f6cbd]" />
                  </label>
                ))}
                <label className="mb-3 flex items-center gap-2">
                  <input type="checkbox" data-f="advFiles" checked={Boolean(advV.files)} onChange={(e) => setAdvV({ ...advV, files: e.target.checked ? "yes" : "" })} className="accent-[#0f6cbd]" /> Has attachments
                </label>
                <div className="flex justify-end gap-2">
                  <FButton onClick={() => setAdvV({})}>Clear filters</FButton>
                  <FButton
                    primary
                    ok
                    onClick={() => {
                      const q = [
                        advV.From ? `from:${/\s/.test(advV.From) ? `"${advV.From}"` : advV.From}` : "",
                        advV.To ? `to:${/\s/.test(advV.To) ? `"${advV.To}"` : advV.To}` : "",
                        advV.Subject ? `subject:${/\s/.test(advV.Subject) ? `"${advV.Subject}"` : advV.Subject}` : "",
                        advV.Keywords ?? "",
                        advV.files ? "hasattachment:yes" : "",
                      ].filter(Boolean).join(" ");
                      setAdv(false);
                      if (q) cmd("mail.search", q);
                    }}
                  >
                    Search
                  </FButton>
                </div>
              </div>
            )}
          </div>
        </div>
        <span className="flex items-center gap-1 text-gray-700">
          <span className="mr-1 hidden items-center gap-1.5 text-[12px] text-gray-600 lg:flex" title="You're using the new Outlook">
            New Outlook
            <span aria-hidden="true" className="relative h-4 w-8 rounded-full bg-[#0f6cbd]">
              <span className="absolute right-[2px] top-[2px] h-3 w-3 rounded-full bg-white" />
            </span>
          </span>
          {doc.copilot && (
            <button type="button" aria-label="Copilot" title="Copilot" data-c="copilot.open" onClick={() => setToast("Copilot is ready. Ask it about your inbox and calendar.")} className="rounded p-1.5 hover:bg-[#e6e6e6]">
              <OIcon name="sparkle" size={17} className="text-[#7f4fd6]" />
            </button>
          )}
          <button type="button" aria-label="My Day" title="My Day" data-c="view.myDay" onClick={() => cmd("view.myDay")} className={`rounded p-1.5 hover:bg-[#e6e6e6] ${doc.myDayOpen ? "bg-[#e0e0e0]" : ""}`}>
            <OIcon name="myday" size={17} />
          </button>
          <button type="button" aria-label="Notifications" title="Notifications" onClick={() => setToast("You're all caught up.")} className="rounded p-1.5 hover:bg-[#e6e6e6]">
            <OIcon name="bell" size={17} />
          </button>
          <button type="button" aria-label="Settings" title="Settings" data-c="settings.open" onClick={() => { openSettings(); cmd("settings.open"); }} className="rounded p-1.5 hover:bg-[#e6e6e6]">
            <OIcon name="gear" size={17} />
          </button>
          <span title={`${doc.account.name} (${doc.account.email})`} className="ml-1">
            <Avatar name={doc.account.name} size={26} />
          </span>
          <span className="ml-2 hidden gap-4 px-1 text-[13px] text-gray-600 sm:flex" aria-hidden="true">
            <span>—</span>
            <span>▢</span>
            <span>✕</span>
          </span>
        </span>
      </div>

      {/* Ribbon */}
      {tabs.length > 0 && <RibbonBar tabs={tabs} active={activeTab} setActive={setActiveTab} state={ribbonState} h={h} onToggleFolders={() => h.onCmd("view.folderPane")} />}

      {/* Body */}
      <div className="flex min-h-0 flex-1 gap-2 px-2 pb-2">
        <nav aria-label="Apps" className="flex w-12 shrink-0 flex-col items-center gap-1 pt-1">
          {navItems.map(([label, key, icon]) => (
            <button
              key={key}
              type="button"
              aria-label={label}
              title={label}
              aria-current={mod === key ? "page" : undefined}
              data-c="nav.module"
              data-v={label}
              onClick={() => cmd("nav.module", label)}
              className={`relative flex h-11 w-11 flex-col items-center justify-center rounded-md text-[10px] ${mod === key ? "bg-white font-semibold text-[#0f6cbd] shadow-[0_0_2px_rgba(0,0,0,0.12)]" : "text-gray-700 hover:bg-[#e6e6e6]"}`}
            >
              <OIcon name={icon} size={19} />
              <span className="mt-0.5 leading-none">{label}</span>
            </button>
          ))}
          <span className="my-1 h-px w-7 bg-gray-300" />
          {[
            ["Word", "word"],
            ["Excel", "excel"],
            ["PowerPoint", "powerpoint"],
            ["OneDrive", "onedrive"],
          ].map(([label, icon]) => (
            <button key={label} type="button" aria-label={label} title={label} onClick={() => setToast(`${label} opens in its own window.`)} className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-[#e6e6e6]">
              <OIcon name={icon} size={20} />
            </button>
          ))}
          <button type="button" aria-label="More apps" title="More apps" onClick={() => setToast("More apps: Organization, Files, Bookings and more.")} className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 hover:bg-[#e6e6e6]">
            <OIcon name="apps" size={18} />
          </button>
        </nav>
        {side}
        <div className="flex min-h-0 min-w-0 flex-1 gap-2">{main}</div>
        {doc.myDayOpen && (
          <aside aria-label="My Day" className={`hidden w-56 shrink-0 flex-col overflow-auto p-3 text-[12.5px] md:flex ${card}`}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[14px] font-semibold">My Day</span>
              <button type="button" aria-label="Close My Day" data-c="view.myDay" onClick={() => cmd("view.myDay")} className="rounded p-0.5 hover:bg-gray-100">
                <OIcon name="close" size={12} />
              </button>
            </div>
            <div className="mb-1 font-semibold text-[#0f6cbd]">Calendar</div>
            {myDay.length ? myDay.map((o) => (
              <div key={o.key} className="mb-1.5 border-l-[3px] border-[#0f6cbd] pl-2">
                <div className="font-semibold">{o.evt.title}</div>
                <div className="text-gray-600">{o.evt.allDay ? "All day" : `${fmtTime(o.start)} - ${fmtTime(o.end)}`}</div>
              </div>
            )) : <p className="text-gray-500">Nothing on your calendar today.</p>}
            <div className="mb-1 mt-3 font-semibold text-[#0f6cbd]">To Do</div>
            {[...(doc.tasks ?? []).filter((t) => t.status !== "Completed" && (t.myDay || t.due === today)).map((t) => t.subject), ...doc.messages.filter((m) => m.flag && !m.flag.complete && m.folder !== "deleted").map((m) => m.subject)].map((s, i) => (
              <div key={i} className="mb-1 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border border-gray-500" /> <span className="truncate">{s}</span>
              </div>
            ))}
          </aside>
        )}
      </div>

      {/* Popped-out compose or an opened message */}
      {/* A message started outside Mail (Email from a contact) opens in its own window, as in new Outlook. */}
      {doc.compose && (doc.compose.inline === false || mod !== "mail") && (
        <div className="absolute inset-0 z-[60] flex flex-col bg-black/20 p-6">
          <div className={`flex min-h-0 flex-1 ${card}`}>
            <ComposeNew ctx={ctx} popped />
          </div>
        </div>
      )}
      {doc.window && !doc.compose && (() => {
        const m = doc.messages.find((x) => x.id === doc.window);
        return m ? (
          <div className="absolute inset-0 z-[60] flex flex-col bg-black/20 p-6">
            <div className={`flex min-h-0 flex-1 flex-col ${card}`}>
              <div className="flex items-center justify-end gap-2 p-1">
                {m.from.email.toLowerCase() === doc.account.email.toLowerCase() && (m.folder === "sent" || m.folder.endsWith("sent")) && (
                  <button type="button" data-c="mail.recall" data-v={m.id} onClick={() => setAlert({ title: "Recall this message?", text: "Outlook will try to delete this message from the mailboxes of recipients in your organization who haven't opened it. You'll get a Message Recall Report in your Inbox.", buttons: [{ label: "OK", primary: true, onClick: () => cmd("mail.recall", m.id) }, { label: "Cancel" }] })} className="mr-auto flex items-center gap-1.5 rounded-[4px] border border-gray-300 px-2.5 py-1 text-[13px] hover:bg-gray-50">
                    <OIcon name="undo" size={14} /> Recall Message
                  </button>
                )}
                <button type="button" aria-label="Close message window" data-c="window.close" onClick={() => cmd("window.close")} className="rounded p-1.5 text-gray-600 hover:bg-gray-100">
                  <OIcon name="close" size={13} />
                </button>
              </div>
              <MessageViewNew ctx={ctx} m={m} />
            </div>
          </div>
        ) : null;
      })()}

      {/* Undo send and toasts */}
      {undo && (
        <div role="status" className="absolute bottom-4 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-md bg-[#242424] px-4 py-2 text-[13px] text-white shadow-lg">
          Sending... <button type="button" data-c="mail.undoSend" onClick={() => { setUndo(null); cmd("mail.undoSend"); }} className="font-semibold text-[#8ac2ff] underline">Undo</button>
        </div>
      )}
      {toast && !undo && (
        <div role="status" className="absolute bottom-4 left-1/2 z-[90] -translate-x-1/2 rounded-md bg-[#242424] px-4 py-2 text-[13px] text-white shadow-lg">{toast}</div>
      )}

      {settings && <SettingsModal ctx={ctx} page={settings} setPage={setSettings} onClose={() => setSettings(null)} />}

      {dialog && dlgDef && (
        <FluentDialog
          key={dialog}
          def={dlgDef}
          initial={newOutlookCore.dialogDefaults?.(doc, ui, dialog)}
          okLabel={dialog === "sweep" ? "Sweep" : dialog === "scheduleSend" ? "Send" : dialog === "attachFile" ? "Attach" : dialog === "shareCalendar" ? "Share" : dialog === "moveTo" ? "Move" : dialog === "addShared" ? "Add" : dialog === "proposeTime" || dialog === "proposeTimeDecline" ? "Done" : undefined}
          onCancel={() => setDialog(null)}
          onOk={(values) => {
            const id = dialog;
            setDialog(null);
            if (id === "proposeTime" || id === "proposeTimeDecline") {
              const ok = parseUsDate(String(values.date ?? ""));
              if (!ok) return;
            }
            onCommit({ kind: "dialog", id, values });
          }}
        />
      )}

      {nmenu && <NMenu x={nmenu.x} y={nmenu.y} items={nmenu.items} onClose={() => setNmenu(null)} />}
      {cmenu && <ContextMenu x={cmenu.x} y={cmenu.y} items={cmenu.items} onClose={() => setCmenu(null)} />}
      {alert && (
        <FluentModal
          title={alert.title}
          width={400}
          onClose={() => setAlert(null)}
          footer={alert.buttons.map((b) => (
            <FButton key={b.label} primary={b.primary} onClick={() => { setAlert(null); b.onClick?.(); }}>
              {b.label}
            </FButton>
          ))}
        >
          <p className="text-[13px] leading-snug">{alert.text}</p>
        </FluentModal>
      )}
      <span className="hidden">{selEvent(doc, ui)?.evt.id}</span>
    </div>
  );
}

export function NewOutlookStatusBar(_: StatusBarProps<OutlookDoc>) {
  void _;
  return null;
}

export type { Ctx };
