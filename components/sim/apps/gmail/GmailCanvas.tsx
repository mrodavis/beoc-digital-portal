"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SimValue } from "@/types/sim";
import type { CanvasProps, StatusBarProps } from "../../types";
import { CalendarSurface } from "./Calendar";
import { ChatSurface } from "./Chat";
import { MailSurface, type ComposeState, type Composer } from "./Mail";
import { MeetSurface } from "./Meet";
import type { GmailDoc } from "./types";
import { BrowserFrame, Ctx, Toast, type GmCtx } from "./ui";

export function GmailCanvas({ doc, ui, onSelect, onCommit }: CanvasProps<GmailDoc>) {
  const [list, setList] = useState<ComposeState[]>([]);
  const keyRef = useRef(1);
  const open = useCallback((c: Partial<ComposeState> & { target: string }) => {
    setList((l) => {
      // One reply box per message: reuse it instead of opening a second.
      if (c.target !== "send:new" && l.some((x) => x.target === c.target)) return l;
      const n: ComposeState = { key: keyRef.current++, to: [], cc: [], bcc: [], showCc: false, showBcc: false, subject: "", body: "", attachments: [], driveLinks: [], ...c };
      if (n.cc.length) n.showCc = true;
      if (n.bcc.length) n.showBcc = true;
      return [...l.filter((x) => x.target !== "send:new" || c.target === "send:new" || true), n].slice(-3);
    });
  }, []);
  const composer: Composer = {
    list,
    open,
    update: (key, p) => setList((l) => l.map((x) => (x.key === key ? { ...x, ...p } : x))),
    close: (key) => setList((l) => l.filter((x) => x.key !== key)),
  };

  // Close the compose window whose message the model just sent.
  const sentSeq = doc.lastSent?.seq;
  useEffect(() => {
    if (!doc.lastSent) return;
    const t = doc.lastSent.target;
    setList((l) => {
      const i = l.findIndex((x) => x.target === t);
      return i < 0 ? l : [...l.slice(0, i), ...l.slice(i + 1)];
    });
  }, [sentSeq]); // eslint-disable-line react-hooks/exhaustive-deps
  // Undo send reopens the message in a compose window.
  const reopenSeq = doc.reopen?.seq;
  useEffect(() => {
    const r = doc.reopen;
    if (!r) return;
    open({ target: r.target, to: r.to, cc: r.cc, bcc: r.bcc, subject: r.subject, body: r.body, showCc: r.cc.length > 0, showBcc: r.bcc.length > 0 });
  }, [reopenSeq]); // eslint-disable-line react-hooks/exhaustive-deps

  const ctx: GmCtx = {
    doc,
    ui,
    onSelect,
    onCommit,
    cmd: (id: string, value?: SimValue) => onCommit({ kind: "command", id, value }),
    type: (target: string, value: string) => onCommit({ kind: "type", target, value }),
  };
  return (
    <Ctx.Provider value={ctx}>
      <div className="h-full outline-none" style={{ fontFamily: "Roboto, Arial, sans-serif" }}>
        <BrowserFrame>
          {doc.surface === "calendar" ? <CalendarSurface /> : doc.surface === "meet" ? <MeetSurface /> : doc.surface === "chat" ? <ChatSurface /> : <MailSurface composer={composer} />}
          <Toast />
        </BrowserFrame>
      </div>
    </Ctx.Provider>
  );
}

export function GmailStatusBar(_props: StatusBarProps<GmailDoc>) {
  return null;
}
