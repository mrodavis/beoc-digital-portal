"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { CanvasProps, StatusBarProps } from "../../types";
import type { OutlookDoc } from "./types";
import { composeSource, formSource, type ComposeDraft, type Ctx, type FormDraft } from "./ctx";
import { AlertBox, ContextMenu, DlgButton, Modal, waitFor, type AlertSpec, type MenuEntry } from "./parts";
import { ComposeForm, FolderPane, MessageList, MessageView, NavBar, ReadingPane, TodoBar, resolveToken } from "./mail";
import { CalendarPane, CalendarView, EventForm } from "./calendar";
import { ActivityDialog, ContactCard, ContactForm, GroupForm, PeopleList, PeoplePane } from "./people";
import { TaskDetails, TaskForm, TaskList, TasksPane } from "./tasks";
import { AddressBookDialog, AutoRepliesDialog, SignaturesDialog } from "./canvasDialogs";
import { currentFolder, folderById, joinTokens, messagesIn, moduleOf, occurrences, recurrenceText, selEvent, selIds, selKeys, unreadIn, visibleMessages } from "./model";
import { fmtDate, fmtTime, parseUsDate } from "./dates";

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const NO_PENDING_C = { to: "", cc: "", bcc: "" };
const NO_PENDING_F = { required: "", optional: "", assignTo: "" };

function isTyping(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  return Boolean(el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable));
}
function keyName(e: React.KeyboardEvent) {
  const parts: string[] = [];
  if (e.ctrlKey || e.metaKey) parts.push("Ctrl");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey) parts.push("Shift");
  parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);
  return parts.join("+");
}
const WINDOW_KEYS = new Set(["Ctrl+S", "Ctrl+Enter", "Alt+S", "F1", "F7", "Ctrl+Z", "Ctrl+F1"]);

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

export function OutlookCanvas({ doc, ui, accent, onSelect, onCommit, openDialog }: CanvasProps<OutlookDoc>) {
  const docRef = useRef(doc);
  docRef.current = doc;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; items: MenuEntry[] } | null>(null);
  const [alert, setAlert] = useState<AlertSpec | null>(null);
  const [occPrompt, setOccPrompt] = useState<{ key: string; title: string; mode: "Delete Occurrence" | "Delete Series" } | null>(null);
  const [width, setWidth] = useState(900);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cmd = useCallback((id: string, value?: SimValue) => onCommit({ kind: "command", id, value }), [onCommit]);
  const select = useCallback((sel: string) => onSelect({ selection: sel }), [onSelect]);

  /* ---------- drafts ---------- */
  const csrc = useMemo(() => composeSource(doc.compose), [doc.compose]);
  const [cdraft, setCdraft, cdraftRef] = useDraft(csrc, doc.compose?.id ?? null, NO_PENDING_C);
  const fsrc = useMemo(() => formSource(doc.form), [doc.form]);
  const fkey = doc.form ? `${doc.form.kind === "meeting" || doc.form.kind === "appointment" ? "event" : doc.form.kind}:${doc.form.id ?? "new"}` : null;
  const [fdraft, setFdraft, fdraftRef] = useDraft(fsrc, fkey, NO_PENDING_F);

  /* ---------- commit chains ---------- */
  const runChain = useCallback(
    async (steps: { commit: SimCommit; ok: (d: OutlookDoc) => boolean }[]) => {
      for (const s of steps) {
        const before = docRef.current;
        onCommit(s.commit);
        const changed = await waitFor(() => docRef.current !== before, 450);
        if (!changed || !s.ok(docRef.current)) return false;
      }
      return true;
    },
    [onCommit],
  );

  const ctxRef = useRef<Ctx | null>(null);

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
        setAlert({ title: "Microsoft Outlook", text: `Outlook does not recognize "${bad}". Check the spelling, or type a full email address such as name@example.com.`, buttons: [{ label: "OK", primary: true }] });
        return;
      }
      setCdraft({ to: lists.to, cc: lists.cc, bcc: lists.bcc, pending: NO_PENDING_C } as Partial<ComposeDraft>);
      if (!lists.to.length && !lists.cc.length && !lists.bcc.length) {
        setAlert({ title: "Microsoft Outlook", text: "There must be at least one name or contact group in the To, Cc, or Bcc box.", buttons: [{ label: "OK", primary: true }] });
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
      const written = d.body.replace(/\n-- ?\n[\s\S]*$/, "");
      if (/\battach(ed|ment|ing)?\b/i.test(written) && !c.attachments.length) {
        setAlert({ title: "Attachment Reminder", text: "You may have forgotten to attach a file. You used the word \"attach\" in your message, but there are no files attached.", buttons: [{ label: "Don't Send", primary: true }, { label: "Send Anyway", onClick: () => void go() }] });
        return;
      }
      if (!d.subject.trim()) {
        setAlert({ title: "Microsoft Outlook", text: "Do you want to send this message without a subject?", buttons: [{ label: "Send Anyway", onClick: () => void go() }, { label: "Don't Send", primary: true }] });
        return;
      }
      void go();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runChain, setCdraft],
  );

  const send = useCallback(() => void composeFields(() => onCommit({ kind: "command", id: "compose.send" })), [composeFields, onCommit]);
  const scheduleSend = useCallback(() => void composeFields(() => openDialog("scheduleSend")), [composeFields, openDialog]);

  const saveDraft = useCallback(() => {
    const c = docRef.current.compose;
    if (!c) return;
    const d = cdraftRef.current;
    const changed = d && (d.subject !== c.subject || d.body !== c.body || !same(d.to, c.to) || !same(d.cc, c.cc) || d.subject || d.to.length);
    if (!changed) {
      cmd("compose.discard");
      return;
    }
    setAlert({
      title: "Microsoft Outlook",
      text: "Want to save your changes to this message?",
      buttons: [
        { label: "Yes", primary: true, onClick: () => cmd("compose.saveDraft", JSON.stringify({ to: d!.to, cc: d!.cc, bcc: d!.bcc, subject: d!.subject, body: d!.body })) },
        { label: "No", onClick: () => cmd("compose.discard") },
        { label: "Cancel" },
      ],
    });
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
      setAlert({ title: "Microsoft Outlook", text: `Outlook does not recognize "${bad}".`, buttons: [{ label: "OK", primary: true }] });
      return;
    }
    setFdraft({ required: lists.required, optional: lists.optional, assignTo: lists.assignTo, pending: NO_PENDING_F } as Partial<FormDraft>);
    const steps: { commit: SimCommit; ok: (x: OutlookDoc) => boolean }[] = [];
    let final: SimCommit;
    if (f.kind === "appointment" || f.kind === "meeting") {
      const start = d.allDay ? d.startDate : `${d.startDate}T${d.startTime}`;
      const end = d.allDay ? d.endDate : `${d.endDate}T${d.endTime}`;
      if (end < start) {
        setAlert({ title: "Microsoft Outlook", text: "The end date you entered occurs before the start date.", buttons: [{ label: "OK", primary: true }] });
        return;
      }
      if (f.kind === "meeting") {
        if (!lists.required.length && !lists.optional.length) {
          setAlert({ title: "Microsoft Outlook", text: "There must be at least one name or contact group in the To, Cc, or Bcc box.", buttons: [{ label: "OK", primary: true }] });
          return;
        }
        for (const k of ["required", "optional"] as const) {
          const v = joinTokens(lists[k]);
          if (v !== joinTokens(f.data[k])) steps.push({ commit: { kind: "type", target: `event.${k}`, value: v }, ok: (x) => joinTokens(x.form?.data[k]) === v });
        }
      }
      if (d.body !== (f.data.body ?? "")) steps.push({ commit: { kind: "type", target: "event.body", value: d.body }, ok: (x) => x.form?.data.body === d.body });
      final = {
        kind: "dialog",
        id: "event.save",
        values: {
          title: d.title, location: d.location || (f.data.teams ? "Microsoft Teams Meeting" : ""), startDate: fmtDate(d.startDate), startTime: fmtTime(`${d.startDate}T${d.startTime}`),
          endDate: fmtDate(d.endDate), endTime: fmtTime(`${d.endDate}T${d.endTime}`), allDay: d.allDay, reminder: f.data.reminder ?? "15 minutes", showAs: f.data.showAs ?? "Busy",
          recurrence: recurrenceText(f.data.recurrence), teams: Boolean(f.data.teams), private: Boolean(f.data.private), meeting: f.kind === "meeting",
          required: joinTokens(lists.required), optional: joinTokens(lists.optional),
        },
      };
    } else if (f.kind === "contact") {
      if (d.notes !== (f.data.notes ?? "")) steps.push({ commit: { kind: "type", target: "form.notes", value: d.notes }, ok: (x) => x.form?.data.notes === d.notes });
      final = { kind: "dialog", id: "contact.save", values: { name: d.name.trim(), company: d.company.trim(), jobTitle: d.jobTitle.trim(), email: d.email.trim(), phone: d.phone.trim(), mobile: d.mobile.trim(), address: d.address.trim() } };
    } else if (f.kind === "task") {
      for (const [label, v] of [["start date", d.tStart], ["due date", d.tDue]] as const) {
        if (v.trim() && v.trim() !== "None" && !parseUsDate(v)) {
          setAlert({ title: "Microsoft Outlook", text: `Outlook cannot understand the ${label} "${v}". Type it as M/D/YYYY, for example 10/23/2026.`, buttons: [{ label: "OK", primary: true }] });
          return;
        }
      }
      if (f.data.assign) {
        if (!lists.assignTo.length) {
          setAlert({ title: "Microsoft Outlook", text: "There must be at least one name in the To box to assign this task.", buttons: [{ label: "OK", primary: true }] });
          return;
        }
        const v = joinTokens(lists.assignTo);
        if (v !== joinTokens(f.data.assignTo)) steps.push({ commit: { kind: "type", target: "task.to", value: v }, ok: (x) => joinTokens(x.form?.data.assignTo) === v });
      }
      if (d.notes !== (f.data.notes ?? "")) steps.push({ commit: { kind: "type", target: "form.notes", value: d.notes }, ok: (x) => x.form?.data.notes === d.notes });
      const norm = (v: string) => (v.trim() && v.trim() !== "None" ? fmtDate(parseUsDate(v)!) : "None");
      final = {
        kind: "dialog",
        id: "task.save",
        values: {
          subject: d.subject.trim(), startDate: norm(d.tStart), dueDate: norm(d.tDue), status: d.status, priority: d.priority, percent: Number(d.percent) || 0,
          reminder: d.reminderOn, reminderDate: d.reminderDate, reminderTime: d.reminderTime,
        },
      };
    } else {
      const v = joinTokens(d.members);
      if (v !== joinTokens(f.data.members)) steps.push({ commit: { kind: "type", target: "group.members", value: v }, ok: (x) => joinTokens(x.form?.data.members) === v });
      final = { kind: "dialog", id: "group.save", values: { name: d.name.trim(), members: v } };
    }
    if (await runChain(steps)) onCommit(final);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runChain, onCommit, setFdraft]);

  /* ---------- ribbon / keyboard requests ---------- */
  const seen = useRef<Record<string, number>>({});
  const watch = (key: string | undefined, seq: number | undefined, run: () => void) => {
    if (!key) return;
    const prev = seen.current[key];
    seen.current[key] = seq ?? 0;
    if (prev !== undefined && (seq ?? 0) > prev) run();
  };
  useEffect(() => watch(doc.compose ? `send:${doc.compose.id}` : undefined, doc.compose?.sendSeq, send), [doc.compose?.id, doc.compose?.sendSeq]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => watch(doc.compose ? `save:${doc.compose.id}` : undefined, doc.compose?.saveSeq, saveDraft), [doc.compose?.id, doc.compose?.saveSeq]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => watch(fkey ? `form:${fkey}` : undefined, doc.form?.submitSeq, () => void saveForm()), [fkey, doc.form?.submitSeq]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------- mark as read when the selection moves on ---------- */
  const prevSel = useRef<{ id: string; unread: boolean } | null>(null);
  useEffect(() => {
    const ids = selIds(ui.selection, "msg");
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

  /* ---------- context ---------- */
  const ctx: Ctx = {
    doc,
    ui,
    accent,
    select,
    commit: onCommit,
    cmd,
    openDialog,
    menu: (at, items) => setMenu({ ...at, items }),
    alert: setAlert,
    cdraft,
    setCdraft: setCdraft as (p: Partial<ComposeDraft>) => void,
    fdraft,
    setFdraft: setFdraft as (p: Partial<FormDraft>) => void,
    send,
    scheduleSend,
    saveDraft,
    saveForm: () => void saveForm(),
    narrow: width < 760,
  };
  ctxRef.current = ctx;

  const windowMode = Boolean((doc.compose && !doc.compose.inline) || doc.form || doc.window);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (isTyping(e.target)) return;
    const k = keyName(e);
    if (doc.form || (doc.compose && !doc.compose.inline)) {
      if (!WINDOW_KEYS.has(k)) e.stopPropagation();
      return;
    }
    if (k === "Delete" || k === "Ctrl+D") {
      const s = selEvent(doc, ui);
      if (s?.evt.recurrence && s.date) {
        e.preventDefault();
        e.stopPropagation();
        setOccPrompt({ key: selKeys(ui.selection)[0], title: s.evt.title, mode: "Delete Occurrence" });
      }
    }
  };

  /* ---------- layout ---------- */
  const mod = moduleOf(doc);
  const paneMode = doc.folderPane ?? (width < 640 ? "Minimized" : "Normal");
  const left =
    paneMode === "Off" ? null : (
      <aside aria-label="Folder Pane" className={`flex shrink-0 flex-col border-r border-gray-200 bg-white ${paneMode === "Minimized" ? "w-11" : width < 860 ? "w-40" : "w-48"}`}>
        {paneMode === "Minimized" ? (
          <button type="button" aria-label="Expand the Folder Pane" onClick={() => cmd("view.folderPane", "Normal")} className="flex flex-1 items-start justify-center pt-2 text-[12px] text-gray-600 hover:bg-gray-50">
            <span style={{ writingMode: "vertical-rl" }}>{mod === "mail" ? folderById(doc, currentFolder(doc))?.name : mod === "calendar" ? "Calendar" : mod === "people" ? "Contacts" : "Tasks"}</span>
          </button>
        ) : mod === "calendar" ? (
          <CalendarPane ctx={ctx} />
        ) : mod === "people" ? (
          <PeoplePane ctx={ctx} />
        ) : mod === "tasks" ? (
          <TasksPane ctx={ctx} />
        ) : (
          <FolderPane ctx={ctx} />
        )}
      </aside>
    );

  let main: React.ReactNode;
  if (doc.compose && !doc.compose.inline) main = <ComposeForm ctx={ctx} />;
  else if (doc.form) {
    const k = doc.form.kind;
    main = k === "contact" ? <ContactForm ctx={ctx} /> : k === "task" ? <TaskForm ctx={ctx} /> : k === "group" ? <GroupForm ctx={ctx} /> : <EventForm ctx={ctx} />;
  } else if (doc.window) {
    const m = doc.messages.find((x) => x.id === doc.window);
    main = m ? (
      <div className="flex min-h-0 flex-1 flex-col bg-white">
        <div className="flex items-center justify-end border-b border-gray-200 px-2 py-0.5">
          <button type="button" aria-label="Close message window" onClick={() => cmd("window.close")} className="rounded p-1 text-gray-600 hover:bg-red-600 hover:text-white">
            ✕
          </button>
        </div>
        <MessageView ctx={ctx} m={m} />
      </div>
    ) : null;
  } else if (mod === "calendar") main = <CalendarView ctx={ctx} />;
  else if (mod === "people")
    main = (
      <>
        <PeopleList ctx={ctx} />
        <ContactCard ctx={ctx} />
      </>
    );
  else if (mod === "tasks")
    main = (
      <>
        <TaskList ctx={ctx} />
        {(doc.readingPane ?? "Right") !== "Off" && <TaskDetails ctx={ctx} />}
      </>
    );
  else {
    const rp = doc.readingPane ?? "Right";
    const listW = width < 760 ? "w-[230px]" : width < 980 ? "w-[270px]" : "w-[320px]";
    main =
      rp === "Off" ? (
        <MessageList ctx={ctx} wide />
      ) : rp === "Bottom" ? (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex h-[45%] min-h-0 border-b border-gray-300">
            <MessageList ctx={ctx} wide />
          </div>
          <div className="flex min-h-0 flex-1">
            <ReadingPane ctx={ctx} />
          </div>
        </div>
      ) : (
        <>
          <div className={`flex min-h-0 shrink-0 border-r border-gray-200 ${listW}`}>
            <MessageList ctx={ctx} wide />
          </div>
          <div className="flex min-h-0 min-w-0 flex-1">
            <ReadingPane ctx={ctx} />
          </div>
        </>
      );
  }

  const abField = doc.compose?.addressBook ?? (doc.dialog === "addressBook" ? (doc.form?.kind === "task" ? "To" : doc.form ? "Required" : "") : null);
  const closeDialog = () => {
    if (docRef.current.dialog || docRef.current.compose?.addressBook) cmd("dialog.close");
  };

  return (
    <div ref={rootRef} onKeyDown={onKeyDown} className="flex h-full min-h-0 flex-col bg-[#f3f2f1] text-gray-900" style={{ fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}>
      <div className="flex min-h-0 flex-1">
        {!windowMode && <NavBar ctx={ctx} side />}
        {!windowMode && left}
        {main}
        {!windowMode && mod === "mail" && doc.todoBar && doc.todoBar !== "Off" && <TodoBar ctx={ctx} />}
      </div>

      {menu && <ContextMenu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
      {alert && <AlertBox spec={alert} onClose={() => setAlert(null)} />}

      {abField !== null && abField !== undefined && (
        <AddressBookDialog
          doc={doc}
          title={doc.compose ? "Select Names: Contacts" : doc.form ? "Select Attendees and Resources: Contacts" : "Address Book: Contacts"}
          fields={doc.compose ? (doc.compose.showBcc || abField === "Bcc" ? ["To", "Cc", "Bcc"] : ["To", "Cc", "Bcc"]) : doc.form?.kind === "task" ? ["To"] : doc.form ? ["Required", "Optional"] : []}
          initial={
            doc.compose
              ? { To: cdraft?.to ?? doc.compose.to, Cc: cdraft?.cc ?? doc.compose.cc, Bcc: cdraft?.bcc ?? doc.compose.bcc }
              : doc.form?.kind === "task"
                ? { To: fdraft?.assignTo ?? [] }
                : { Required: fdraft?.required ?? [], Optional: fdraft?.optional ?? [] }
          }
          onClose={closeDialog}
          onOk={(v) => {
            if (doc.compose) {
              setCdraft({ to: v.To ?? [], cc: v.Cc ?? [], bcc: v.Bcc ?? [] } as Partial<ComposeDraft>);
              if ((v.Bcc ?? []).length && !doc.compose.showBcc) cmd("compose.bcc");
            } else if (doc.form?.kind === "task") setFdraft({ assignTo: v.To ?? [] } as Partial<FormDraft>);
            else if (doc.form) setFdraft({ required: v.Required ?? [], optional: v.Optional ?? [] } as Partial<FormDraft>);
            closeDialog();
          }}
        />
      )}
      {doc.dialog === "selectMembers" && (
        <AddressBookDialog
          doc={doc}
          title="Select Members: Contacts"
          fields={["Members"]}
          initial={{ Members: fdraft?.members ?? [] }}
          onClose={closeDialog}
          onOk={(v) => {
            setFdraft({ members: v.Members ?? [] } as Partial<FormDraft>);
            closeDialog();
          }}
        />
      )}
      {doc.dialog === "signatures" && <SignaturesDialog doc={doc} onCommit={onCommit} onClose={closeDialog} docNow={() => docRef.current} />}
      {doc.dialog === "autoReplies" && <AutoRepliesDialog doc={doc} onCommit={onCommit} onClose={closeDialog} docNow={() => docRef.current} />}
      {doc.dialog === "activity" && <ActivityDialog key={doc.dialogArg} ctx={ctx} />}
      {occPrompt && (
        <Modal
          title="Confirm Delete"
          width={400}
          onClose={() => setOccPrompt(null)}
          footer={
            <>
              <DlgButton
                primary
                onClick={() => {
                  const p = occPrompt;
                  setOccPrompt(null);
                  select(p.key);
                  cmd("item.delete", p.mode);
                }}
              >
                OK
              </DlgButton>
              <DlgButton onClick={() => setOccPrompt(null)}>Cancel</DlgButton>
            </>
          }
        >
          <p className="mb-2">&quot;{occPrompt.title}&quot; is a recurring appointment. Do you want to delete all occurrences or just this one?</p>
          {(["Delete Occurrence", "Delete Series"] as const).map((m) => (
            <label key={m} className="flex items-center gap-2 py-0.5">
              <input type="radio" name="occ" checked={occPrompt.mode === m} onChange={() => setOccPrompt({ ...occPrompt, mode: m })} />
              {m === "Delete Occurrence" ? "Delete this occurrence." : "Delete the series."}
            </label>
          ))}
        </Modal>
      )}
    </div>
  );
}

export function OutlookStatusBar({ doc, onCommit }: StatusBarProps<OutlookDoc>) {
  const mod = moduleOf(doc);
  let items = 0;
  let unread = 0;
  if (mod === "mail") {
    items = doc.search ? visibleMessages(doc).length : messagesIn(doc, currentFolder(doc)).length;
    unread = unreadIn(doc, currentFolder(doc));
  } else if (mod === "calendar") items = (doc.events ?? []).length;
  else if (mod === "people") items = (doc.contacts ?? []).length + (doc.groups ?? []).length;
  else items = (doc.tasks ?? []).length + doc.messages.filter((m) => m.flag && !m.flag.complete).length;
  const reminders = occurrences(doc, (doc.now ?? "2026-10-20").slice(0, 10), (doc.now ?? "2026-10-20").slice(0, 10)).length;
  return (
    <div className="flex h-6 shrink-0 items-center gap-4 border-t border-gray-300 bg-[#f3f3f3] px-3 text-[11px] text-gray-700">
      <span>Items: {items}</span>
      {mod === "mail" && unread > 0 && <span>Unread: {unread}</span>}
      {reminders > 0 && <span className="hidden sm:inline">Reminders: {reminders}</span>}
      {doc.flags?.offline ? <span className="text-[#a4262c]">Working Offline</span> : null}
      <span className="flex-1" />
      <span className="hidden md:inline">All folders are up to date.</span>
      <span className="hidden md:inline">Connected to: Microsoft Exchange</span>
      <button type="button" title="Normal" aria-label="Normal view" onClick={() => onCommit({ kind: "command", id: "view.folderPane", value: "Normal" })} className="rounded px-1 hover:bg-gray-200">
        ▭
      </button>
      <button type="button" title="Reading" aria-label="Reading view" onClick={() => onCommit({ kind: "command", id: "view.folderPane", value: "Minimized" })} className="rounded px-1 hover:bg-gray-200">
        ▯
      </button>
      <span>100%</span>
    </div>
  );
}
