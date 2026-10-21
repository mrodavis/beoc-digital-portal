"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SimCommit } from "@/types/sim";
import type { TeamsDoc, TeamsPresence, TeamsUiState } from "./types";
import { TIcon, FileIcon } from "./icons";
import { allChannels, personName } from "./model";

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export interface MenuEntry {
  label?: string;
  icon?: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  checked?: boolean;
  heading?: boolean;
  separator?: boolean;
  hint?: string;
}

export interface TeamsCtxValue {
  doc: TeamsDoc;
  ui: TeamsUiState;
  /** Free navigation. */
  go: (patch: Partial<TeamsUiState>) => void;
  /** Select the object, then commit (judged). */
  act: (selection: string, c: SimCommit) => void;
  cmd: (selection: string, id: string, value?: string) => void;
  openMenu: (e: { clientX: number; clientY: number } | DOMRect, items: MenuEntry[], width?: number) => void;
  closeMenu: () => void;
  /** Mark a chat as seen (display only). */
  seen: Set<string>;
  markSeen: (id: string, on: boolean) => void;
  /** Canvas root, so dialogs cover the whole Teams window wherever they are rendered. */
  overlayRoot: HTMLElement | null;
}

export const TeamsCtx = createContext<TeamsCtxValue | null>(null);

export function useTeams(): TeamsCtxValue {
  const v = useContext(TeamsCtx);
  if (!v) throw new Error("TeamsCtx missing");
  return v;
}

/** Runs `after` once the document changes (the commit was accepted). */
export function useAccepted(doc: unknown) {
  const pending = useRef<{ doc: unknown; after: () => void } | null>(null);
  useEffect(() => {
    if (pending.current && pending.current.doc !== doc) {
      const f = pending.current.after;
      pending.current = null;
      f();
    }
  }, [doc]);
  return (commit: () => void, after: () => void) => {
    pending.current = { doc, after };
    commit();
  };
}

/* ------------------------------------------------------------------ */
/* Avatars and presence                                                */
/* ------------------------------------------------------------------ */

const AV: [string, string][] = [
  ["#fde7e9", "#a4262c"],
  ["#fcf0d8", "#8e562e"],
  ["#e7f2da", "#3b6e22"],
  ["#dbf0ef", "#00666d"],
  ["#dce9f8", "#0f548c"],
  ["#e8ebfa", "#4f52b2"],
  ["#f2e6fb", "#6b2c91"],
  ["#fbe5f4", "#9b1d6f"],
  ["#eae7e4", "#5d5a58"],
];

export function initials(name: string): string {
  const parts = name.replace(/[^A-Za-z\s'-]/g, "").trim().split(/\s+/);
  if (!parts[0]) return "?";
  return ((parts[0][0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function hash(s: string): number {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

/** A presence badge on its own (status menus). */
export function StatusDot({ presence, size = 12 }: { presence: TeamsPresence; size?: number }) {
  return (
    <span className="relative inline-block shrink-0" style={{ width: size + 2, height: size + 2 }} aria-hidden="true">
      <PresenceDot presence={presence} size={size} ring="transparent" />
    </span>
  );
}

export function PresenceDot({ presence, size = 10, ring = "#fff" }: { presence?: TeamsPresence; size?: number; ring?: string }) {
  if (!presence) return null;
  const color: Record<string, string> = {
    Available: "#6bb700",
    Busy: "#c4314b",
    "Do not disturb": "#c4314b",
    "In a meeting": "#c4314b",
    "In a call": "#c4314b",
    Presenting: "#c4314b",
    "Be right back": "#ffaa44",
    Away: "#ffaa44",
    Offline: "#ffffff",
    "Out of office": "#b4009e",
  };
  const c = color[presence] ?? "#8a8886";
  const s = size;
  return (
    <span className="absolute -bottom-0.5 -right-0.5 rounded-full" style={{ width: s + 2, height: s + 2, background: ring, padding: 1 }} title={presence} aria-label={presence}>
      <svg width={s} height={s} viewBox="0 0 10 10" aria-hidden="true">
        {presence === "Offline" ? (
          <circle cx="5" cy="5" r="4" fill="#fff" stroke="#8a8886" strokeWidth="1.3" />
        ) : (
          <circle cx="5" cy="5" r="5" fill={c} />
        )}
        {presence === "Available" && <path d="M2.8 5.2 4.3 6.6 7.2 3.6" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />}
        {presence === "Do not disturb" && <path d="M2.6 5h4.8" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />}
        {(presence === "Be right back" || presence === "Away") && <path d="M5 2.6V5.2l1.6 1" fill="none" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />}
      </svg>
    </span>
  );
}

export function Avatar({ name, size = 32, presence, color, ring, square }: { name: string; size?: number; presence?: TeamsPresence; color?: string; ring?: string; square?: boolean }) {
  const [bg, fg] = color ? [color, "#fff"] : AV[hash(name) % AV.length];
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <span
        className={`flex h-full w-full items-center justify-center font-semibold ${square ? "rounded-md" : "rounded-full"}`}
        style={{ background: bg, color: fg, fontSize: Math.max(9, size * 0.38) }}
        aria-hidden="true"
      >
        {initials(name)}
      </span>
      <PresenceDot presence={presence} size={Math.max(8, Math.round(size * 0.3))} ring={ring} />
    </span>
  );
}

export function PersonAvatar({ id, size = 32, showPresence = true, ring }: { id: string; size?: number; showPresence?: boolean; ring?: string }) {
  const { doc } = useTeams();
  const p = id === "me" ? { name: doc.me.name, presence: doc.me.presence, color: undefined } : doc.people.find((x) => x.id === id);
  return <Avatar name={p?.name ?? id} size={size} presence={showPresence ? p?.presence : undefined} color={p?.color} ring={ring} />;
}

/* ------------------------------------------------------------------ */
/* Rich text                                                           */
/* ------------------------------------------------------------------ */

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function useMentionNames(): string[] {
  const { doc } = useTeams();
  return useMemo(
    () =>
      Array.from(new Set([doc.me.name, ...doc.people.map((p) => p.name), ...doc.teams.map((t) => t.name), ...allChannels(doc).map((c) => c.channel.name), "everyone", "channel"]))
        .filter(Boolean)
        .sort((a, b) => b.length - a.length),
    [doc],
  );
}

function Inline({ text, names, me }: { text: string; names: string[]; me: string }) {
  const re = new RegExp(`(\\*\\*[^*]+\\*\\*|~~[^~]+~~|\\*[^*\\s][^*]*\\*|@(?:${names.map(escapeRe).join("|")})(?![A-Za-z]))`, "g");
  const parts = text.split(re).filter((x) => x !== undefined && x !== "");
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**") && p.length > 4) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("~~") && p.endsWith("~~") && p.length > 4) return <s key={i}>{p.slice(2, -2)}</s>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        if (p.startsWith("@") && names.some((n) => p.slice(1) === n)) {
          const mine = p.slice(1) === me;
          return (
            <span key={i} className={`rounded px-0.5 font-semibold ${mine ? "bg-[#e8ebfa] text-[#4f52b2]" : "text-[#5b5fc7]"}`}>
              {p.slice(1)}
            </span>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const { doc } = useTeams();
  const names = useMentionNames();
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (/^\s*[-•]\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-•]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-•]\s+/, ""));
      blocks.push(
        <ul key={i} className="my-1 list-disc pl-5">
          {items.map((t, j) => (
            <li key={j}>
              <Inline text={t} names={names} me={doc.me.name} />
            </li>
          ))}
        </ul>,
      );
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ""));
      blocks.push(
        <ol key={i} className="my-1 list-decimal pl-5">
          {items.map((t, j) => (
            <li key={j}>
              <Inline text={t} names={names} me={doc.me.name} />
            </li>
          ))}
        </ol>,
      );
      continue;
    }
    blocks.push(
      <p key={i} className="min-h-[1.2em]">
        <Inline text={l} names={names} me={doc.me.name} />
      </p>,
    );
    i++;
  }
  return <div className={`break-words ${className ?? ""}`}>{blocks}</div>;
}

/* ------------------------------------------------------------------ */
/* Menus and modals                                                    */
/* ------------------------------------------------------------------ */

export function FloatingMenu({ x, y, items, width, onClose }: { x: number; y: number; items: MenuEntry[]; width?: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let nx = x;
    let ny = y;
    if (nx + r.width > window.innerWidth - 8) nx = Math.max(8, window.innerWidth - r.width - 8);
    if (ny + r.height > window.innerHeight - 8) ny = Math.max(8, y - r.height - 4);
    setPos({ x: nx, y: ny });
  }, [x, y]);
  // When the menu closes, give focus back to the button that opened it (if it is still there), so keyboard shortcuts keep working.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    return () => {
      setTimeout(() => {
        if (opener && opener !== document.body && opener.isConnected && (!document.activeElement || document.activeElement === document.body)) opener.focus({ preventScroll: true });
      }, 0);
    };
  }, []);
  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    document.addEventListener("keydown", key);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [onClose]);
  return (
    <div ref={ref} role="menu" className="fixed z-[120] max-h-[380px] overflow-auto rounded-md border border-[#e0e0e0] bg-white py-1 text-[13px] text-[#242424] shadow-[0_8px_16px_rgba(0,0,0,0.14)]" style={{ left: pos.x, top: pos.y, width: width ?? 220 }}>
      {items.map((it, i) => {
        if (it.separator) return <div key={i} className="my-1 border-t border-[#ebebeb]" />;
        if (it.heading) return <div key={i} className="px-3 pb-1 pt-1.5 text-[11px] font-semibold text-[#616161]">{it.label}</div>;
        return (
          <button
            key={i}
            type="button"
            role="menuitem"
            disabled={it.disabled}
            onClick={() => {
              onClose();
              it.onClick?.();
            }}
            className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left hover:bg-[#f5f5f5] disabled:opacity-40 ${it.danger ? "text-[#c4314b]" : ""}`}
          >
            <span className="flex w-4 justify-center text-[#424242]">{it.checked ? <TIcon name="check" size={16} /> : it.icon ? <TIcon name={it.icon} size={16} /> : null}</span>
            <span className="flex-1">{it.label}</span>
            {it.hint && <span className="text-[11px] text-[#707070]">{it.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function Modal({ title, onClose, children, width = 460, footer }: { title: string; onClose: () => void; children: React.ReactNode; width?: number; footer?: React.ReactNode }) {
  const ctx = useContext(TeamsCtx);
  const node = (
    <div className="absolute inset-0 z-[90] flex items-center justify-center bg-black/30 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label={title} className="flex max-h-full flex-col rounded-lg bg-white shadow-[0_25px_65px_rgba(0,0,0,0.3)]" style={{ width }}>
        <div className="flex items-center justify-between px-6 pb-2 pt-5">
          <h2 className="text-[18px] font-semibold text-[#242424]">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded p-1 text-[#424242] hover:bg-[#f5f5f5]">
            <TIcon name="close" size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-6 py-2 text-[14px] text-[#242424]">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 pb-5 pt-3">{footer}</div>}
      </div>
    </div>
  );
  return ctx?.overlayRoot ? createPortal(node, ctx.overlayRoot) : node;
}

export function PrimaryBtn({ children, onClick, disabled, label }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; label?: string }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="rounded-[4px] bg-[#5b5fc7] px-4 py-1.5 text-[14px] font-semibold text-white hover:bg-[#4f52b2] disabled:bg-[#e0e0e0] disabled:text-[#bdbdbd]">
      {children}
    </button>
  );
}

export function SecondaryBtn({ children, onClick, label }: { children: React.ReactNode; onClick?: () => void; label?: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="rounded-[4px] border border-[#d1d1d1] bg-white px-4 py-1.5 text-[14px] font-semibold text-[#242424] hover:bg-[#f5f5f5]">
      {children}
    </button>
  );
}

export function IconBtn({ icon, label, onClick, active, size = 20, className }: { icon: string; label: string; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; active?: boolean; size?: number; className?: string }) {
  return (
    <button type="button" title={label} aria-label={label} onClick={onClick} className={`flex items-center justify-center rounded-[4px] p-1.5 ${active ? "bg-[#e8ebfa] text-[#5b5fc7]" : "text-[#424242] hover:bg-[#f0f0f0] hover:text-[#5b5fc7]"} ${className ?? ""}`}>
      <TIcon name={icon} size={size} />
    </button>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-[13px] font-semibold text-[#424242]">{label}</span>
      {children}
    </label>
  );
}

export const inputCls = "w-full rounded-[4px] border border-[#d1d1d1] border-b-[#616161] bg-white px-2.5 py-1.5 text-[14px] text-[#242424] outline-none focus:border-b-2 focus:border-b-[#5b5fc7]";

/* ------------------------------------------------------------------ */
/* Composer                                                            */
/* ------------------------------------------------------------------ */

const EMOJI = ["😀", "😊", "😂", "🙂", "😉", "😍", "🤔", "😮", "😢", "😡", "👍", "👏", "🙏", "💪", "🎉", "✅", "👀", "❤️", "🔥", "⭐", "📅", "📎", "☕", "🍕"];

export function AttachmentChip({ name, onRemove }: { name: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex max-w-[260px] items-center gap-2 rounded-md border border-[#e0e0e0] bg-white px-2 py-1.5 text-[13px] shadow-sm">
      <FileIcon name={name} size={22} />
      <span className="truncate">{name}</span>
      {onRemove && (
        <button type="button" aria-label={`Remove ${name}`} onClick={onRemove} className="text-[#616161] hover:text-[#242424]">
          <TIcon name="close" size={14} />
        </button>
      )}
    </span>
  );
}

/**
 * The compose box used in chats, channels, replies and the meeting chat.
 * Sending commits { kind: "type", target, value } with the formatting markers.
 */
export function Composer({
  target,
  placeholder,
  dark,
  compact,
  autoFocus,
  mentionExtra,
  onCancel,
  post,
  prefix,
}: {
  target: string;
  placeholder: string;
  dark?: boolean;
  compact?: boolean;
  autoFocus?: boolean;
  mentionExtra?: string[];
  onCancel?: () => void;
  /** A new channel post (posts layout): shows Add a subject and the Post type (Post | Announcement). */
  post?: boolean;
  /** Text committed in front of the message (the New message pane's Group name line). */
  prefix?: string;
}) {
  const { doc, act, cmd, openMenu } = useTeams();
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [postType, setPostType] = useState<"Post" | "Announcement">("Post");
  const [fmt, setFmt] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [caret, setCaret] = useState(0);
  const [mIdx, setMIdx] = useState(0);
  const ta = useRef<HTMLTextAreaElement>(null);
  const pendingSel = useRef<[number, number] | null>(null);
  const accepted = useAccepted(doc);
  const attachments = doc.drafts?.[target] ?? [];
  const delivery = doc.delivery?.[target];
  const loopKind = doc.loopDrafts?.[target];

  // Place the caret right after React applies a programmatic edit.
  useLayoutEffect(() => {
    const el = ta.current;
    if (!el || !pendingSel.current) return;
    const [a, b] = pendingSel.current;
    pendingSel.current = null;
    el.focus();
    el.setSelectionRange(a, b);
    setCaret(b);
  }, [text]);

  useEffect(() => {
    if (autoFocus) ta.current?.focus();
  }, [autoFocus]);

  useLayoutEffect(() => {
    const el = ta.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(160, Math.max(compact ? 20 : 22, el.scrollHeight))}px`;
  }, [text, compact]);

  // Mention picker
  const before = text.slice(0, caret);
  const mm = /(^|\s)@([A-Za-z][A-Za-z.'-]*(?: [A-Za-z.'-]*)?)?$/.exec(before);
  const query = mm ? (mm[2] ?? "").toLowerCase() : null;
  const candidates = useMemo(() => {
    if (query === null) return [];
    const ppl = doc.people.map((p) => ({ name: p.name, sub: p.title ?? "", id: p.id }));
    const extra = (mentionExtra ?? []).map((n) => ({ name: n, sub: "Channel", id: n }));
    return [...ppl, ...extra].filter((p) => p.name.toLowerCase().startsWith(query) || p.name.toLowerCase().split(" ").some((w) => w.startsWith(query))).slice(0, 6);
  }, [query, doc.people, mentionExtra]);

  const insertMention = (name: string) => {
    const start = before.lastIndexOf("@");
    const next = `${text.slice(0, start)}@${name} ${text.slice(caret)}`;
    const pos = start + name.length + 2;
    pendingSel.current = [pos, pos];
    setText(next);
  };

  const wrap = (mark: string) => {
    const el = ta.current;
    if (!el) return;
    const s = el.selectionStart;
    const e = el.selectionEnd;
    // Pressing Bold/Italic again right before the closing marker turns it off (moves past it), like Teams.
    if (s === e && text.slice(s, s + mark.length) === mark && (mark !== "*" || text.slice(s, s + 2) !== "**")) {
      el.setSelectionRange(s + mark.length, s + mark.length);
      setCaret(s + mark.length);
      return;
    }
    const sel = text.slice(s, e) || "text";
    const next = text.slice(0, s) + mark + sel + mark + text.slice(e);
    pendingSel.current = [s + mark.length, s + mark.length + sel.length];
    setText(next);
  };

  const listify = (kind: "bullet" | "number") => {
    const el = ta.current;
    const s = el?.selectionStart ?? text.length;
    const e = el?.selectionEnd ?? text.length;
    const lineStart = text.lastIndexOf("\n", s - 1) + 1;
    const lineEnd = text.indexOf("\n", e) === -1 ? text.length : text.indexOf("\n", e);
    const lines = text.slice(lineStart, lineEnd).split("\n");
    const conv = lines.map((l, i) => (kind === "bullet" ? `- ${l.replace(/^(-|\d+\.)\s+/, "")}` : `${i + 1}. ${l.replace(/^(-|\d+\.)\s+/, "")}`));
    setText(text.slice(0, lineStart) + conv.join("\n") + text.slice(lineEnd));
    setTimeout(() => el?.focus(), 0);
  };

  const insert = (s: string) => {
    const el = ta.current;
    const p = el?.selectionStart ?? text.length;
    pendingSel.current = [p + s.length, p + s.length];
    setText(text.slice(0, p) + s + text.slice(p));
  };

  const send = () => {
    let v = text.replace(/\s+$/, "");
    if (!v.trim() && !attachments.length && !loopKind) return;
    if (post && postType === "Announcement" && subject.trim()) v = `Headline: ${subject.trim()}\n${v}`;
    else if (post && subject.trim()) v = `Subject: ${subject.trim()}\n${v}`;
    if (prefix) v = prefix + v;
    accepted(
      () => act(target, { kind: "type", target, value: v }),
      () => {
        setText("");
        setSubject("");
        setPostType("Post");
        setFmt(false);
        onCancel?.();
      },
    );
  };

  const attachItems = (): MenuEntry[] => {
    const cloud = (doc.files ?? []).filter((f) => !f.isFolder);
    const local = doc.localFiles ?? [];
    return [
      ...(cloud.length ? [{ heading: true, label: "Attach cloud files" }, ...cloud.slice(0, 8).map((f) => ({ label: f.name, icon: "onedrive", onClick: () => cmd(target, "compose.attach", f.name) }))] : []),
      ...(local.length ? [{ separator: true }, { heading: true, label: "Upload from this device" }, ...local.map((f) => ({ label: f.name, icon: "upload", onClick: () => cmd(target, "compose.attach", f.name) }))] : []),
      ...(!cloud.length && !local.length ? [{ label: "No files available", disabled: true }] : []),
    ];
  };

  /** Loop components button in the compose box (chats). */
  const loopMenu = (e: React.MouseEvent<HTMLButtonElement>) =>
    openMenu(
      e.currentTarget.getBoundingClientRect(),
      [{ heading: true, label: "Loop components" }, ...["Paragraph", "Checklist", "Table"].map((k) => ({ label: k, onClick: () => cmd(target, "compose.loop", k) }))],
      200,
    );
  const loopOk = target.startsWith("chat:") || target.startsWith("newchat:");

  /** Actions and apps (+): Attach file, Set delivery options. */
  const actionsMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const sub = (items: MenuEntry[], w = 280) => () => setTimeout(() => openMenu(rect, items, w), 0);
    const isChat = target.startsWith("chat:") || target.startsWith("newchat:") || target.startsWith("reply:");
    openMenu(
      rect,
      [
        { label: "Attach file", icon: "attach", hint: "›", onClick: sub(attachItems()) },
        ...(isChat || target.startsWith("channel:")
          ? [
              {
                label: "Set delivery options",
                icon: "important",
                hint: "›",
                onClick: sub(
                  [
                    { heading: true, label: "Set delivery options" },
                    { label: "Standard", checked: !delivery, onClick: () => cmd(target, "compose.delivery", "Standard") },
                    { label: "Important", checked: delivery === "Important", onClick: () => cmd(target, "compose.delivery", "Important") },
                  ],
                  220,
                ),
              },
            ]
          : []),
      ],
      240,
    );
  };

  const box = dark ? "border-[#3d3d3d] bg-[#1f1f1f] text-white" : "border-[#e0e0e0] bg-white text-[#242424]";
  const iconCls = dark ? "text-[#d6d6d6] hover:text-white hover:bg-white/10" : "text-[#424242] hover:text-[#5b5fc7] hover:bg-[#f5f5f5]";

  return (
    <div className="relative">
      {candidates.length > 0 && (
        <div className="absolute bottom-full left-0 z-30 mb-1 w-72 rounded-md border border-[#e0e0e0] bg-white py-1 text-[13px] text-[#242424] shadow-lg" role="listbox" aria-label="Suggestions">
          <div className="px-3 py-1 text-[11px] font-semibold text-[#616161]">Suggestions</div>
          {candidates.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="option"
              aria-selected={i === mIdx}
              onMouseDown={(e) => {
                e.preventDefault();
                insertMention(p.name);
              }}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left ${i === mIdx ? "bg-[#f0f0f0]" : "hover:bg-[#f5f5f5]"}`}
            >
              <Avatar name={p.name} size={24} />
              <span className="flex flex-col">
                <span>{p.name}</span>
                {p.sub && <span className="text-[11px] text-[#616161]">{p.sub}</span>}
              </span>
            </button>
          ))}
        </div>
      )}
      {emoji && (
        <div className="absolute bottom-full right-0 z-30 mb-1 grid w-64 grid-cols-8 gap-1 rounded-md border border-[#e0e0e0] bg-white p-2 shadow-lg" role="listbox" aria-label="Emoji">
          {EMOJI.map((em) => (
            <button
              key={em}
              type="button"
              aria-label={em}
              onClick={() => {
                insert(em);
                setEmoji(false);
              }}
              className="rounded p-0.5 text-[18px] hover:bg-[#f0f0f0]"
            >
              {em}
            </button>
          ))}
        </div>
      )}
      <div className={`rounded-md border ${box} shadow-[0_1px_2px_rgba(0,0,0,0.08)] focus-within:border-b-[#5b5fc7]`} style={{ borderBottomWidth: 2 }}>
        {fmt && (
          <div className={`flex flex-wrap items-center gap-0.5 border-b px-2 py-1 ${dark ? "border-[#3d3d3d]" : "border-[#ebebeb]"}`}>
            {[
              ["bold", "Bold (Ctrl+B)", () => wrap("**")],
              ["italic", "Italic (Ctrl+I)", () => wrap("*")],
              ["strike", "Strikethrough", () => wrap("~~")],
              ["bullets", "Bulleted list", () => listify("bullet")],
              ["numbers", "Numbered list", () => listify("number")],
            ].map(([ic, lb, fn]) => (
              <button key={lb as string} type="button" title={lb as string} aria-label={(lb as string).replace(/ \(.*\)/, "")} onMouseDown={(e) => e.preventDefault()} onClick={fn as () => void} className={`rounded p-1 ${iconCls}`}>
                <TIcon name={ic as string} size={16} />
              </button>
            ))}
          </div>
        )}
        {post && (
          <div className={`flex items-center gap-2 border-b px-3 py-1.5 ${dark ? "border-[#3d3d3d]" : "border-[#ebebeb]"}`}>
            <input aria-label={postType === "Announcement" ? "Headline" : "Add a subject"} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={postType === "Announcement" ? "Type a headline" : "Add a subject"} className={`min-w-0 flex-1 bg-transparent py-0.5 outline-none ${postType === "Announcement" ? "text-[18px] font-semibold" : "text-[15px] font-semibold"} placeholder:font-normal placeholder:text-[#707070]`} />
            <select aria-label="Post type" value={postType} onChange={(e) => setPostType(e.target.value as "Post" | "Announcement")} className="rounded border border-[#d1d1d1] bg-white px-1.5 py-0.5 text-[12px] text-[#242424]">
              <option>Post</option>
              <option>Announcement</option>
            </select>
          </div>
        )}
        {(delivery || loopKind) && (
          <div className="flex flex-wrap items-center gap-2 px-3 pt-2 text-[12px]">
            {delivery && <span className="rounded bg-[#fde7e9] px-1.5 py-0.5 font-semibold text-[#c4314b]">IMPORTANT!</span>}
            {loopKind && (
              <span className="flex items-center gap-1.5 rounded-md border border-[#c5cbfa] bg-[#f0f1fd] px-2 py-1 text-[#4f52b2]">
                <TIcon name="sparkle" size={14} /> Loop component: {loopKind}
                <button type="button" aria-label="Remove Loop component" onClick={() => cmd(target, "compose.unloop")} className="text-[#616161] hover:text-[#242424]">
                  <TIcon name="close" size={12} />
                </button>
              </span>
            )}
          </div>
        )}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 px-3 pt-2">
            {attachments.map((a) => (
              <AttachmentChip key={a} name={a} onRemove={() => cmd(target, "compose.detach", a)} />
            ))}
          </div>
        )}
        <div className="flex items-end gap-1 px-3 py-2">
          <textarea
            ref={ta}
            aria-label={placeholder}
            placeholder={placeholder}
            value={text}
            rows={1}
            onChange={(e) => {
              setText(e.target.value);
              setCaret(e.target.selectionStart);
              setMIdx(0);
            }}
            onSelect={(e) => setCaret((e.target as HTMLTextAreaElement).selectionStart)}
            onKeyDown={(e) => {
              if (candidates.length) {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setMIdx((i) => (i + 1) % candidates.length);
                  return;
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setMIdx((i) => (i - 1 + candidates.length) % candidates.length);
                  return;
                }
                if (e.key === "Enter" || e.key === "Tab") {
                  e.preventDefault();
                  insertMention(candidates[Math.min(mIdx, candidates.length - 1)].name);
                  return;
                }
              }
              if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
                e.preventDefault();
                wrap("**");
                return;
              }
              if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
                e.preventDefault();
                wrap("*");
                return;
              }
              if (e.key === "Escape" && onCancel) {
                onCancel();
                return;
              }
              if (e.key === "Enter" && e.shiftKey) {
                // Continue a bulleted or numbered list on the next line; an empty item ends the list.
                const el = e.currentTarget;
                const pos = el.selectionStart;
                const lineStart = text.lastIndexOf("\n", pos - 1) + 1;
                const line = text.slice(lineStart, pos);
                const bm = /^(\s*)- (.*)$/.exec(line);
                const nm = /^(\s*)(\d+)\. (.*)$/.exec(line);
                if (bm || nm) {
                  e.preventDefault();
                  const empty = bm ? !bm[2].trim() : !nm![3].trim();
                  if (empty) {
                    const next = text.slice(0, lineStart) + text.slice(pos);
                    pendingSel.current = [lineStart, lineStart];
                    setText(next);
                  } else {
                    const ins = bm ? `\n${bm[1]}- ` : `\n${nm![1]}${Number(nm![2]) + 1}. `;
                    pendingSel.current = [pos + ins.length, pos + ins.length];
                    setText(text.slice(0, pos) + ins + text.slice(pos));
                  }
                  return;
                }
              }
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            className={`max-h-40 min-h-[22px] flex-1 resize-none bg-transparent text-[14px] leading-[20px] outline-none ${dark ? "placeholder:text-[#adadad]" : "placeholder:text-[#707070]"}`}
          />
          <div className="flex shrink-0 items-center gap-0.5">
            <button type="button" title="Format" aria-label="Format" aria-pressed={fmt} onClick={() => setFmt((f) => !f)} className={`rounded p-1 ${fmt ? "text-[#5b5fc7]" : iconCls}`}>
              <TIcon name="format" size={18} />
            </button>
            <button type="button" title="Emoji" aria-label="Emoji" onClick={() => setEmoji((x) => !x)} className={`rounded p-1 ${iconCls}`}>
              <TIcon name="emoji" size={18} />
            </button>
            {loopOk && (
              <button type="button" title="Loop components" aria-label="Loop components" onClick={loopMenu} className={`rounded p-1 ${iconCls}`}>
                <TIcon name="sparkle" size={18} />
              </button>
            )}
            <button type="button" title="Actions and apps" aria-label="Actions and apps" onClick={actionsMenu} className={`rounded p-1 ${iconCls}`}>
              <TIcon name="plus" size={18} />
            </button>
            {onCancel && (
              <button type="button" title="Cancel" aria-label="Cancel" onClick={onCancel} className={`rounded p-1 ${iconCls}`}>
                <TIcon name="close" size={18} />
              </button>
            )}
            <button type="button" title={post ? "Post" : "Send (Enter)"} aria-label={post ? "Post" : "Send"} onClick={send} disabled={!text.trim() && !attachments.length && !loopKind} className={`rounded p-1 ${text.trim() || attachments.length || loopKind ? "text-[#5b5fc7] hover:bg-[#e8ebfa]" : dark ? "text-[#6e6e6e]" : "text-[#c7c7c7]"}`}>
              <TIcon name="send" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Messages                                                            */
/* ------------------------------------------------------------------ */

/** The quick reactions on the hover bar (Teams shows up to five; the rest are under More reactions). */
export const REACTIONS: [string, string][] = [
  ["Like", "👍"],
  ["Heart", "❤️"],
  ["Laugh", "😆"],
  ["Surprised", "😮"],
  ["Sad", "😢"],
];
export const MORE_REACTIONS: [string, string][] = [
  ["Angry", "😠"],
  ["Check mark", "✅"],
  ["Eyes", "👀"],
  ["Clap", "👏"],
  ["Thank you", "🙏"],
  ["Celebrate", "🎉"],
  ["Thinking", "🤔"],
];
export const REACTION_EMOJI: Record<string, string> = Object.fromEntries([...REACTIONS, ...MORE_REACTIONS]);

export function ReactionPills({ reactions, onToggle }: { reactions?: Record<string, string[]>; onToggle: (kind: string) => void }) {
  const { doc } = useTeams();
  const entries = Object.entries(reactions ?? {}).filter(([, v]) => v.length);
  if (!entries.length) return null;
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {entries.map(([k, who]) => (
        <button
          key={k}
          type="button"
          title={who.map((w) => personName(doc, w)).join(", ")}
          aria-label={`${k} reaction, ${who.length}`}
          onClick={() => onToggle(k)}
          className={`flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[12px] ${who.includes("me") ? "border-[#9299f7] bg-[#e8ebfa]" : "border-[#e0e0e0] bg-white hover:bg-[#f5f5f5]"}`}
        >
          <span>{REACTION_EMOJI[k] ?? "👍"}</span>
          <span className="text-[#424242]">{who.length}</span>
        </button>
      ))}
    </div>
  );
}

export function useOutsideClose(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", down);
    };
  }, [open, close]);
  return ref;
}
