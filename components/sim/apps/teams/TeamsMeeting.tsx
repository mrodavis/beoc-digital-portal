"use client";

import { useEffect, useRef, useState } from "react";
import type { TeamsMeeting } from "./types";
import { TIcon, FileIcon } from "./icons";
import { chatTitle, findChat, findEvent, personName } from "./model";
import { Avatar, Composer, MenuEntry, RichText, initials, useOutsideClose, useTeams } from "./TeamsShared";

export const DEFAULT_BACKGROUNDS = ["Office", "Bookshelf", "Plain wall", "Conference room", "City view", "Abstract"];

const BG_STYLE: Record<string, string> = {
  None: "linear-gradient(180deg,#c9b9a3 0%,#b8a68e 55%,#8f7d66 56%,#7d6c58 100%)",
  Office: "linear-gradient(180deg,#dfe7ef 0%,#c7d4e1 60%,#9fb1c4 61%,#8aa0b6 100%)",
  Bookshelf: "repeating-linear-gradient(90deg,#7b4f2c 0 18px,#a0522d 18px 30px,#5e3a1f 30px 44px,#b8860b 44px 52px)",
  "Plain wall": "linear-gradient(180deg,#f1efec,#e2dfda)",
  "Conference room": "linear-gradient(180deg,#e9edf2 0%,#d5dde6 50%,#6b7a8c 51%,#56657a 100%)",
  "City view": "linear-gradient(180deg,#9cc3e6 0%,#c9dff2 45%,#5c6f82 46%,#3e4e60 100%)",
  Abstract: "radial-gradient(circle at 30% 30%,#c5b3f5,transparent 45%),radial-gradient(circle at 70% 70%,#8fd3f4,transparent 45%),#e9e4fb",
};

/** Camera preview: a person in front of the chosen background. */
export function VideoPreview({ name, camera, background, big }: { name: string; camera: boolean; background: string; big?: boolean }) {
  if (!camera)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#292929] text-[13px] text-[#d6d6d6]">
        <span className="flex items-center justify-center rounded-full bg-[#5b5fc7] font-semibold text-white" style={{ width: big ? 72 : 44, height: big ? 72 : 44, fontSize: big ? 26 : 16 }}>
          {initials(name)}
        </span>
        {big && "Your camera is turned off"}
      </div>
    );
  const blur = background === "Blur";
  const bg = BG_STYLE[blur ? "None" : background] ?? BG_STYLE.None;
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-[-12px]" style={{ background: bg, filter: blur ? "blur(9px)" : undefined }} />
      {!blur && background === "None" && (
        <>
          <div className="absolute left-[8%] top-[18%] h-[30%] w-[22%] rounded-sm border-4 border-[#6d5c49] bg-[#e8dcc8]" />
          <div className="absolute right-[10%] top-[30%] h-[40%] w-[8%] rounded-t-full bg-[#4f7a3a]" />
        </>
      )}
      <svg viewBox="0 0 100 80" className="absolute bottom-0 left-1/2 h-[85%] -translate-x-1/2" aria-hidden="true">
        <ellipse cx="50" cy="30" rx="14" ry="16" fill="#c68d6b" />
        <path d="M36 24c0-12 28-14 28 0-4-6-24-6-28 0Z" fill="#3b2a20" />
        <path d="M18 80c2-20 16-28 32-28s30 8 32 28Z" fill="#3d5a80" />
        <path d="M44 52h12l-6 9Z" fill="#e8e8e8" />
      </svg>
      {blur && <span className="absolute right-2 top-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white">Background blurred</span>}
    </div>
  );
}

function Switch({ on, label, onChange, dark }: { on: boolean; label: string; onChange: () => void; dark?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onChange} className={`relative h-5 w-10 shrink-0 rounded-full border transition-colors ${on ? "border-[#5b5fc7] bg-[#5b5fc7]" : dark ? "border-[#adadad] bg-transparent" : "border-[#616161] bg-white"}`}>
      <span className={`absolute top-[2px] h-3.5 w-3.5 rounded-full transition-all ${on ? "left-[21px] bg-white" : `left-[3px] ${dark ? "bg-[#d6d6d6]" : "bg-[#616161]"}`}`} />
    </button>
  );
}

function BackgroundPicker({ value, onPick, dark }: { value: string; onPick: (v: string) => void; dark?: boolean }) {
  const { doc } = useTeams();
  const list = ["None", "Blur", ...(doc.backgrounds ?? DEFAULT_BACKGROUNDS)];
  return (
    <div className="grid grid-cols-3 gap-2">
      {list.map((b) => (
        <button key={b} type="button" aria-label={b === "None" ? "No background" : b} aria-pressed={value === b} title={b} onClick={() => onPick(b)} className={`relative aspect-video overflow-hidden rounded-md border-2 ${value === b ? "border-[#5b5fc7]" : dark ? "border-transparent hover:border-[#adadad]" : "border-transparent hover:border-[#d1d1d1]"}`}>
          {b === "None" ? (
            <span className={`flex h-full w-full items-center justify-center ${dark ? "bg-[#3d3d3d] text-[#d6d6d6]" : "bg-[#f0f0f0] text-[#424242]"}`}>
              <TIcon name="close" size={18} />
            </span>
          ) : b === "Blur" ? (
            <span className="flex h-full w-full items-center justify-center" style={{ background: BG_STYLE.None, filter: "blur(2px)" }}>
              <TIcon name="blur" size={20} className="text-white" />
            </span>
          ) : (
            <span className="block h-full w-full" style={{ background: BG_STYLE[b] ?? BG_STYLE.Office }} />
          )}
          <span className={`absolute bottom-0 left-0 right-0 truncate bg-black/45 px-1 text-[10px] text-white`}>{b === "None" ? "None" : b}</span>
        </button>
      ))}
    </div>
  );
}

function DeviceSelect({ label, value, options, onChange, dark }: { label: string; value: string; options: string[]; onChange: (v: string) => void; dark?: boolean }) {
  return (
    <label className="mb-3 block">
      <span className={`mb-1 block text-[12px] font-semibold ${dark ? "text-[#d6d6d6]" : "text-[#424242]"}`}>{label}</span>
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full rounded-[4px] border px-2 py-1.5 text-[13px] outline-none ${dark ? "border-[#5c5c5c] bg-[#1f1f1f] text-white" : "border-[#d1d1d1] bg-white text-[#242424]"}`}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Pre-join                                                            */
/* ------------------------------------------------------------------ */

function PreJoin({ m }: { m: TeamsMeeting }) {
  const { doc, cmd } = useTeams();
  const key = `prejoin:${m.id}`;
  const [panel, setPanel] = useState<"effects" | "devices" | null>(null);
  const d = doc.devices ?? { speakers: ["Speakers (Realtek Audio)"], microphones: ["Microphone Array (Realtek Audio)"], cameras: ["Integrated Webcam"], speaker: "Speakers (Realtek Audio)", microphone: "Microphone Array (Realtek Audio)", camera: "Integrated Webcam" };
  const ev = findEvent(doc, m.id);
  const audio = ["Computer audio", "Room audio", "Phone audio", "Don't use audio"];
  return (
    <div className="flex h-full flex-col bg-[#f5f5f5]">
      <div className="flex h-10 shrink-0 items-center gap-2 bg-[#ebebeb] px-3 text-[13px]">
        <TIcon name="teams" size={16} className="text-[#5b5fc7]" />
        <span className="flex-1 truncate">{m.title} | Microsoft Teams</span>
        <span className="flex gap-4 text-[#424242]" aria-hidden="true">
          <TIcon name="minimize" size={14} />
          <TIcon name="maximize" size={13} />
          <TIcon name="close" size={14} />
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col items-center overflow-auto px-6 py-5">
          <div className="text-[20px] font-semibold">{m.title}</div>
          <div className="mb-4 text-[13px] text-[#616161]">{ev ? `${ev.start} - ${ev.end}` : "Choose your video and audio options"}</div>
          <div className="flex w-full max-w-[880px] flex-wrap justify-center gap-4">
            <div className="w-[440px] max-w-full overflow-hidden rounded-lg bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
              <div className="aspect-video">
                <VideoPreview name={doc.me.name} camera={m.camera} background={m.background} big />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 text-[13px]">
                <TIcon name={m.camera ? "video" : "videoOff"} size={18} />
                <Switch on={m.camera} label="Camera" onChange={() => cmd(key, "av.camera", m.camera ? "off" : "on")} />
                <button type="button" aria-label="Effects and avatars" aria-pressed={panel === "effects"} onClick={() => setPanel(panel === "effects" ? null : "effects")} className={`ml-2 flex items-center gap-1.5 rounded-[4px] px-2 py-1 font-semibold ${panel === "effects" ? "bg-[#e8ebfa] text-[#5b5fc7]" : "hover:bg-[#f5f5f5]"}`}>
                  <TIcon name="effects" size={16} /> Effects and avatars
                </button>
                <div className="flex-1" />
                <button type="button" aria-label="Device settings" title="Device settings" onClick={() => setPanel(panel === "devices" ? null : "devices")} className={`rounded p-1 ${panel === "devices" ? "bg-[#e8ebfa] text-[#5b5fc7]" : "hover:bg-[#f5f5f5]"}`}>
                  <TIcon name="gear" size={18} />
                </button>
              </div>
            </div>
            <div className="w-[340px] max-w-full rounded-lg bg-white p-4 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
              <div className="mb-2 text-[14px] font-semibold">Audio</div>
              <div className="space-y-1">
                {audio.map((a) => (
                  <div key={a} className={`rounded-md border ${m.audio === a ? "border-[#5b5fc7] bg-[#f0f1fd]" : "border-transparent"}`}>
                    <label className="flex cursor-pointer items-center gap-2 px-3 py-2 text-[13px]">
                      <input type="radio" name={`tm-audio-${m.id}`} checked={m.audio === a} onChange={() => cmd(key, "av.audio", a)} aria-label={a} />
                      <TIcon name={a === "Computer audio" ? "monitor" : a === "Room audio" ? "people" : a === "Phone audio" ? "calls" : "speaker"} size={16} />
                      {a}
                    </label>
                    {a === "Computer audio" && m.audio === a && (
                      <div className="space-y-2 px-3 pb-3 text-[13px]">
                        <div className="flex items-center gap-2">
                          <TIcon name={m.mic ? "mic" : "micOff"} size={16} />
                          <span className="flex-1">{m.mic ? "Microphone on" : "Microphone off"}</span>
                          <Switch on={m.mic} label="Microphone" onChange={() => cmd(key, "av.mic", m.mic ? "off" : "on")} />
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-[#424242]">
                          <TIcon name="speaker" size={16} />
                          <select aria-label="Speaker" value={d.speaker} onChange={(e) => cmd(key, "av.speaker", e.target.value)} className="min-w-0 flex-1 truncate rounded border border-[#e0e0e0] bg-white px-1 py-1">
                            {d.speakers.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-[#424242]">
                          <TIcon name="headset" size={16} />
                          <span className="flex-1">Noise suppression: {d.noise ?? "Auto"}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full max-w-[796px] justify-end gap-2">
            <button type="button" onClick={() => cmd(key, "meeting.cancel")} className="rounded-[4px] border border-[#d1d1d1] bg-white px-4 py-1.5 text-[14px] font-semibold hover:bg-[#f5f5f5]">
              Cancel
            </button>
            <button type="button" aria-label="Join now" onClick={() => cmd(key, "meeting.joinNow")} className="rounded-[4px] bg-[#5b5fc7] px-6 py-1.5 text-[14px] font-semibold text-white hover:bg-[#4f52b2]">
              Join now
            </button>
          </div>
        </div>
        {panel && (
          <div className="w-[300px] shrink-0 overflow-auto border-l border-[#e0e0e0] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[16px] font-semibold">{panel === "effects" ? "Effects and avatars" : "Device settings"}</span>
              <button type="button" aria-label="Close" onClick={() => setPanel(null)} className="rounded p-1 hover:bg-[#f5f5f5]">
                <TIcon name="close" size={16} />
              </button>
            </div>
            {panel === "effects" ? (
              <>
                <div className="mb-2 text-[13px] font-semibold text-[#424242]">Backgrounds</div>
                <BackgroundPicker value={m.background} onPick={(b) => cmd(key, "av.background", b)} />
              </>
            ) : (
              <>
                <DeviceSelect label="Speaker" value={d.speaker} options={d.speakers} onChange={(v) => cmd(key, "av.speaker", v)} />
                <DeviceSelect label="Microphone" value={d.microphone} options={d.microphones} onChange={(v) => cmd(key, "av.microphone", v)} />
                <DeviceSelect label="Camera" value={d.camera} options={d.cameras} onChange={(v) => cmd(key, "av.cameraDevice", v)} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* In the meeting                                                      */
/* ------------------------------------------------------------------ */

const MEETING_REACTIONS: [string, string][] = [
  ["Like", "👍"],
  ["Heart", "❤️"],
  ["Applause", "👏"],
  ["Laugh", "😆"],
  ["Surprised", "😮"],
];

function useTimer() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(i);
  }, []);
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

function ToolBtn({ icon, label, onClick, active, danger, off }: { icon: string; label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; active?: boolean; danger?: boolean; off?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-w-[52px] flex-col items-center gap-0.5 rounded-md px-1.5 py-1 text-[11px] ${danger ? "bg-[#c4314b] text-white hover:bg-[#a72037]" : active ? "bg-white/15 text-[#a6a8ff]" : off ? "text-[#d6d6d6] hover:bg-white/10" : "text-white hover:bg-white/10"}`}
    >
      <TIcon name={icon} size={20} />
      {label}
    </button>
  );
}

function InMeeting({ m }: { m: TeamsMeeting }) {
  const { doc, cmd, act, openMenu } = useTeams();
  const key = `meeting:${m.id}`;
  const [panel, setPanel] = useState<"chat" | "people" | "effects" | "devices" | "notes" | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [confirmRec, setConfirmRec] = useState(false);
  const [note, setNote] = useState("");
  const [bgDraft, setBgDraft] = useState(m.background);
  const [floating, setFloating] = useState<{ k: number; em: string } | null>(null);
  const timer = useTimer();
  const root = useRef<HTMLDivElement>(null);
  const shareRef = useOutsideClose(shareOpen, () => setShareOpen(false));
  const chat = m.chat ? findChat(doc, m.chat) : undefined;
  const d = doc.devices;
  const panelOpen = (p: typeof panel) => {
    setPanel(panel === p ? null : p);
    cmd(key, "meeting.panel", panel === p ? "none" : p ?? "none");
  };

  useEffect(() => {
    if (m.lastReaction) setFloating({ k: Date.now(), em: MEETING_REACTIONS.find(([k]) => k === m.lastReaction)?.[1] ?? "👍" });
  }, [m.lastReaction]);
  useEffect(() => {
    if (!floating) return;
    const t = setTimeout(() => setFloating(null), 1800);
    return () => clearTimeout(t);
  }, [floating]);

  // Real Teams meeting shortcuts.
  const live = useRef(m);
  live.current = m;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const host = root.current?.closest('[tabindex="-1"]');
      if (!host || !host.contains(e.target as Node)) return;
      if (!(e.ctrlKey && e.shiftKey)) return;
      const k = e.key.toLowerCase();
      const cur = live.current;
      if (k === "m") {
        e.preventDefault();
        cmd(key, "av.mic", cur.mic ? "off" : "on");
      } else if (k === "o") {
        e.preventDefault();
        cmd(key, "av.camera", cur.camera ? "off" : "on");
      } else if (k === "k") {
        e.preventDefault();
        cmd(key, "meeting.raiseHand", cur.hand ? "lower" : "raise");
      } else if (k === "e") {
        e.preventDefault();
        setShareOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cmd, key]);

  const moreMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const items: MenuEntry[] = [
      { heading: true, label: "Record and transcribe" },
      m.recording ? { label: "Stop recording", icon: "record", onClick: () => cmd(key, "meeting.record", "stop") } : { label: "Start recording", icon: "record", onClick: () => setConfirmRec(true) },
      m.transcribing ? { label: "Stop transcription", icon: "note", onClick: () => cmd(key, "meeting.transcribe", "stop") } : { label: "Start transcription", icon: "note", onClick: () => cmd(key, "meeting.transcribe", "start") },
      { separator: true },
      { heading: true, label: "Language and speech" },
      m.captions ? { label: "Hide live captions", icon: "cc", onClick: () => cmd(key, "meeting.captions", "off") } : { label: "Show live captions", icon: "cc", onClick: () => cmd(key, "meeting.captions", "on") },
      { separator: true },
      { label: "Video effects and settings", icon: "effects", onClick: () => { setBgDraft(m.background); panelOpen("effects"); } },
      { label: "Audio settings", icon: "speaker", onClick: () => panelOpen("devices") },
      ...(m.organizer ? [{ label: "Rooms", icon: "rooms", disabled: true }] : []),
      { label: "Turn off incoming video", icon: "videoOff", disabled: true },
      { label: "Meeting info", icon: "info", disabled: true },
    ];
    openMenu(e.currentTarget.getBoundingClientRect(), items, 240);
  };

  const reactMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    openMenu(
      e.currentTarget.getBoundingClientRect(),
      [
        ...MEETING_REACTIONS.map(([k, em]) => ({ label: `${em}  ${k}`, onClick: () => cmd(key, "meeting.react", k) })),
        { separator: true },
        { label: m.hand ? "Lower hand" : "Raise hand", icon: "hand", onClick: () => cmd(key, "meeting.raiseHand", m.hand ? "lower" : "raise") },
      ],
      200,
    );
  };

  const viewMenu = (e: React.MouseEvent<HTMLButtonElement>) =>
    openMenu(
      e.currentTarget.getBoundingClientRect(),
      ["Gallery", "Large gallery"].map((v) => ({ label: v, checked: (m.view ?? "Gallery") === v, onClick: () => cmd(key, "meeting.view", v) })),
      200,
    );

  const leaveMenu = (e: React.MouseEvent<HTMLButtonElement>) =>
    openMenu(
      e.currentTarget.getBoundingClientRect(),
      [
        { label: "Leave", icon: "leave", onClick: () => cmd(key, "meeting.leave") },
        { label: "End meeting", icon: "close", danger: true, onClick: () => cmd(key, "meeting.end") },
      ],
      200,
    );

  const tiles = [{ id: "me", muted: !m.mic, hand: m.hand, camera: m.camera }, ...m.participants];
  const n = tiles.length;
  const cols = n <= 1 ? 1 : n <= 4 ? 2 : n <= 9 ? 3 : 4;
  const speaking = m.participants.find((p) => !p.muted)?.id;
  const ppt = (doc.files ?? []).filter((f) => /\.pptx$/i.test(f.name)).slice(0, 2);

  return (
    <div ref={root} className="relative flex h-full flex-col bg-[#1f1f1f] text-white">
      <div className="flex h-[60px] shrink-0 items-center gap-1 border-b border-black/40 bg-[#292929] px-3">
        <div className="mr-2 flex min-w-0 flex-col">
          <span className="truncate text-[13px] font-semibold">{m.title}</span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#d6d6d6]">
            {m.recording && <span className="flex items-center gap-1 text-[#ff6b6b]"><span className="h-2 w-2 rounded-full bg-[#ff4d4d]" /> REC</span>}
            {timer}
          </span>
        </div>
        <div className="flex-1" />
        <ToolBtn icon="chat" label="Chat" active={panel === "chat"} onClick={() => panelOpen("chat")} />
        <ToolBtn icon="people" label={`People`} active={panel === "people"} onClick={() => panelOpen("people")} />
        <ToolBtn icon="hand" label={m.hand ? "Lower" : "Raise"} active={m.hand} onClick={() => cmd(key, "meeting.raiseHand", m.hand ? "lower" : "raise")} />
        <ToolBtn icon="react" label="React" onClick={reactMenu} />
        <ToolBtn icon="view" label="View" onClick={viewMenu} />
        <ToolBtn icon="note" label="Notes" active={panel === "notes"} onClick={() => panelOpen("notes")} />
        <ToolBtn icon="more" label="More" onClick={moreMenu} />
        <span className="mx-1 h-8 w-px bg-white/20" />
        <ToolBtn icon={m.camera ? "video" : "videoOff"} label="Camera" off={!m.camera} onClick={() => cmd(key, "av.camera", m.camera ? "off" : "on")} />
        <ToolBtn icon={m.mic ? "mic" : "micOff"} label="Mic" off={!m.mic} onClick={() => cmd(key, "av.mic", m.mic ? "off" : "on")} />
        <div className="relative" ref={shareRef}>
          <ToolBtn icon="share" label="Share" active={Boolean(m.sharing) || shareOpen} onClick={() => setShareOpen((s) => !s)} />
          {shareOpen && (
            <div className="absolute right-0 top-[54px] z-40 w-[420px] rounded-lg border border-[#3d3d3d] bg-[#292929] p-4 text-[13px] shadow-2xl" role="dialog" aria-label="Share content">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[15px] font-semibold">Share content</span>
                <span className="flex items-center gap-2 text-[12px] text-[#d6d6d6]">
                  Include sound <Switch on={false} label="Include sound" onChange={() => undefined} dark />
                </span>
              </div>
              <div className="mb-1 text-[12px] font-semibold text-[#d6d6d6]">Screen</div>
              <button type="button" aria-label="Screen 1" onClick={() => { setShareOpen(false); cmd(key, "meeting.share", "Screen 1"); }} className="mb-3 flex w-40 flex-col items-center gap-1 rounded-md border border-[#3d3d3d] bg-[#1f1f1f] p-2 hover:border-[#a6a8ff]">
                <span className="flex aspect-video w-full items-center justify-center rounded bg-[#3d3d3d]"><TIcon name="monitor" size={22} /></span>
                Screen 1
              </button>
              <div className="mb-1 text-[12px] font-semibold text-[#d6d6d6]">Window</div>
              <div className="mb-3 grid grid-cols-2 gap-2">
                {(doc.windows ?? ["Microsoft Edge", "File Explorer"]).map((w) => (
                  <button key={w} type="button" aria-label={w} title={w} onClick={() => { setShareOpen(false); cmd(key, "meeting.share", w); }} className="flex flex-col gap-1 rounded-md border border-[#3d3d3d] bg-[#1f1f1f] p-2 text-left hover:border-[#a6a8ff]">
                    <span className="flex aspect-video w-full items-center justify-center rounded bg-[#e9e9e9] text-[#424242]"><TIcon name="window" size={20} /></span>
                    <span className="truncate text-[12px]">{w}</span>
                  </button>
                ))}
              </div>
              {ppt.length > 0 && (
                <>
                  <div className="mb-1 text-[12px] font-semibold text-[#d6d6d6]">PowerPoint Live</div>
                  <div className="mb-3 flex flex-col gap-1">
                    {ppt.map((f) => (
                      <button key={f.id} type="button" aria-label={f.name} onClick={() => { setShareOpen(false); cmd(key, "meeting.share", f.name); }} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/10">
                        <FileIcon name={f.name} size={18} /> {f.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <button type="button" aria-label="Whiteboard" onClick={() => { setShareOpen(false); cmd(key, "meeting.share", "Whiteboard"); }} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-white/10">
                <TIcon name="whiteboard" size={18} /> Microsoft Whiteboard
              </button>
            </div>
          )}
        </div>
        <span className="mx-1 h-8 w-px bg-white/20" />
        <div className="flex items-center overflow-hidden rounded-md bg-[#c4314b]">
          <button type="button" aria-label="Leave" title="Leave" onClick={() => cmd(key, "meeting.leave")} className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold hover:bg-[#a72037]">
            <TIcon name="leave" size={18} /> Leave
          </button>
          {m.organizer && (
            <button type="button" aria-label="Leave options" title="Leave options" onClick={leaveMenu} className="border-l border-white/30 px-1.5 py-2 hover:bg-[#a72037]">
              <TIcon name="chevronDown" size={14} />
            </button>
          )}
        </div>
      </div>
      {m.recording && (
        <div className="flex items-center gap-2 bg-[#3d3d3d] px-4 py-1.5 text-[12px] text-[#f0f0f0]">
          <TIcon name="record" size={14} className="text-[#ff6b6b]" />
          Recording and transcription have started. Let everyone know that they are being recorded and transcribed.
          <span className="text-[#a6a8ff] underline">Privacy policy</span>
        </div>
      )}
      {(m.lobby?.length ?? 0) > 0 && (
        <div className="flex items-center gap-3 bg-[#3b3a63] px-4 py-2 text-[13px]">
          <TIcon name="door" size={16} />
          <span className="flex-1">
            Waiting in the lobby: <strong>{m.lobby!.map((p) => personName(doc, p)).join(", ")}</strong>
          </span>
          <button type="button" onClick={() => cmd(key, "meeting.admit", m.lobby!.length === 1 ? m.lobby![0] : "all")} className="rounded-[4px] bg-[#5b5fc7] px-3 py-1 font-semibold hover:bg-[#4f52b2]">
            {m.lobby!.length === 1 ? "Admit" : "Admit all"}
          </button>
          <button type="button" onClick={() => panelOpen("people")} className="rounded-[4px] border border-white/40 px-3 py-1 font-semibold hover:bg-white/10">
            View lobby
          </button>
        </div>
      )}
      <div className="flex min-h-0 flex-1">
        <div className="relative flex min-w-0 flex-1 flex-col p-3">
          {m.sharing ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="relative flex min-h-0 flex-1 items-center justify-center rounded-md border-2 border-[#c4314b] bg-[#e9e9e9] text-[#242424]">
                <div className="flex w-[70%] max-w-[560px] flex-col overflow-hidden rounded-md bg-white shadow-lg">
                  <div className="flex items-center gap-2 bg-[#f3f3f3] px-3 py-1.5 text-[12px]">
                    <TIcon name="window" size={14} /> {m.sharing}
                  </div>
                  <div className="space-y-2 p-5">
                    <div className="h-3 w-1/2 rounded bg-[#d6d6d6]" />
                    <div className="h-2 w-5/6 rounded bg-[#e6e6e6]" />
                    <div className="h-2 w-4/6 rounded bg-[#e6e6e6]" />
                    <div className="h-2 w-5/6 rounded bg-[#e6e6e6]" />
                  </div>
                </div>
                <div className="absolute left-1/2 top-2 flex -translate-x-1/2 items-center gap-3 rounded-md bg-[#292929] px-3 py-1.5 text-[12px] text-white shadow-lg">
                  <span>You&apos;re sharing {m.sharing === "Screen 1" ? "your screen" : `"${m.sharing}"`}</span>
                  <button type="button" aria-label="Stop sharing" onClick={() => cmd(key, "meeting.stopShare")} className="rounded-[4px] bg-[#c4314b] px-2.5 py-0.5 font-semibold hover:bg-[#a72037]">
                    Stop sharing
                  </button>
                </div>
              </div>
              <div className="mt-2 flex h-20 shrink-0 gap-2">
                {tiles.slice(0, 5).map((t) => (
                  <Tile key={t.id} id={t.id} muted={t.muted} hand={t.hand} m={m} small speaking={t.id === speaking} reaction={t.id === "me" ? floating : null} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid min-h-0 flex-1 gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoRows: "minmax(0, 1fr)" }}>
              {tiles.map((t) => (
                <Tile key={t.id} id={t.id} muted={t.muted} hand={t.hand} m={m} speaking={t.id === speaking} reaction={t.id === "me" ? floating : null} />
              ))}
            </div>
          )}
          {m.captions && (
            <div className={`pointer-events-none absolute left-1/2 w-[70%] -translate-x-1/2 rounded-md bg-black/75 px-4 py-2 text-[13px] ${m.sharing ? "bottom-28" : "bottom-5"}`}>
              <span className="font-semibold text-[#a6a8ff]">{speaking ? personName(doc, speaking) : "Live captions"}: </span>
              {speaking ? "Thanks, everyone. Let's start with the first item on the agenda." : "Captions will appear here when someone speaks."}
            </div>
          )}
        </div>
        {panel && (
          <div className="flex w-[320px] shrink-0 flex-col border-l border-black/40 bg-[#292929]">
            <div className="flex h-12 items-center justify-between px-4">
              <span className="text-[15px] font-semibold">{panel === "chat" ? "Meeting chat" : panel === "people" ? "Participants" : panel === "effects" ? "Video effects" : panel === "notes" ? "Notes" : "Audio settings"}</span>
              <button type="button" aria-label="Close" onClick={() => panelOpen(panel)} className="rounded p-1 hover:bg-white/10">
                <TIcon name="close" size={16} />
              </button>
            </div>
            {panel === "chat" && (
              <>
                <div className="min-h-0 flex-1 space-y-3 overflow-auto px-4 pb-2">
                  {(chat?.messages ?? []).map((msg) =>
                    msg.system ? (
                      <div key={msg.id} className="text-center text-[11px] text-[#adadad]">{msg.system}</div>
                    ) : (
                      <div key={msg.id} className={`text-[13px] ${msg.from === "me" ? "ml-6" : ""}`}>
                        <div className="mb-0.5 text-[11px] text-[#adadad]">
                          {msg.from === "me" ? "You" : personName(doc, msg.from)} · {msg.time}
                        </div>
                        <div className={`rounded-md px-3 py-1.5 ${msg.from === "me" ? "bg-[#3b3a63]" : "bg-[#3d3d3d]"}`}>
                          <RichText text={msg.text} />
                        </div>
                      </div>
                    ),
                  )}
                  {!chat?.messages.length && <div className="pt-6 text-center text-[12px] text-[#adadad]">Messages sent here are visible to everyone in the meeting.</div>}
                </div>
                <div className="p-3">
                  <Composer target={`meetingchat:${m.id}`} placeholder="Type a message" dark />
                </div>
              </>
            )}
            {panel === "notes" && (
              <div className="flex min-h-0 flex-1 flex-col px-4 pb-3 text-[13px]">
                <p className="mb-2 text-[12px] text-[#adadad]">Meeting notes are shared with everyone invited and stay with the meeting after it ends.</p>
                <div className="min-h-0 flex-1 space-y-1.5 overflow-auto">
                  {(m.notes ?? []).map((n, i) => (
                    <div key={i} className="rounded bg-[#3d3d3d] px-2 py-1.5">• {n}</div>
                  ))}
                </div>
                <textarea
                  aria-label="Add a note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (note.trim()) {
                        act(`notes:${m.id}`, { kind: "type", target: `notes:${m.id}`, value: note.trim() });
                        setNote("");
                      }
                    }
                  }}
                  rows={2}
                  placeholder="Add a note and press Enter"
                  className="mt-2 resize-none rounded border border-[#5c5c5c] bg-[#1f1f1f] px-2 py-1.5 text-white outline-none placeholder:text-[#adadad]"
                />
              </div>
            )}
            {panel === "people" && (
              <div className="min-h-0 flex-1 overflow-auto px-4 pb-3 text-[13px]">
                {m.organizer && (
                  <div className="mb-3 flex gap-2">
                    <button type="button" aria-label="Mute all" onClick={() => cmd(key, "meeting.muteAll")} className="rounded-[4px] border border-white/40 px-3 py-1 font-semibold hover:bg-white/10">
                      Mute all
                    </button>
                    <button type="button" disabled className="rounded-[4px] border border-white/20 px-3 py-1 text-[#adadad]">
                      Share invite
                    </button>
                  </div>
                )}
                {(m.lobby?.length ?? 0) > 0 && (
                  <div className="mb-3">
                    <div className="mb-1 flex items-center justify-between text-[12px] font-semibold text-[#d6d6d6]">
                      Waiting in lobby ({m.lobby!.length})
                      {m.lobby!.length > 1 && (
                        <button type="button" onClick={() => cmd(key, "meeting.admit", "all")} className="text-[#a6a8ff] hover:underline">
                          Admit all
                        </button>
                      )}
                    </div>
                    {m.lobby!.map((p) => (
                      <div key={p} className="flex items-center gap-2 py-1.5">
                        <Avatar name={personName(doc, p)} size={28} />
                        <span className="flex-1 truncate">{personName(doc, p)}</span>
                        <button type="button" aria-label={`Admit ${personName(doc, p)}`} title="Admit" onClick={() => cmd(key, "meeting.admit", p)} className="rounded p-1 text-[#92c353] hover:bg-white/10">
                          <TIcon name="check" size={16} />
                        </button>
                        <button type="button" aria-label={`Deny ${personName(doc, p)}`} title="Deny" onClick={() => cmd(key, "meeting.deny", p)} className="rounded p-1 text-[#ff6b6b] hover:bg-white/10">
                          <TIcon name="close" size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mb-1 text-[12px] font-semibold text-[#d6d6d6]">In this meeting ({tiles.length})</div>
                {tiles.map((t) => {
                  const nm = t.id === "me" ? `${doc.me.name} (You)` : personName(doc, t.id);
                  return (
                    <div key={t.id} className="group flex items-center gap-2 py-1.5">
                      <Avatar name={t.id === "me" ? doc.me.name : personName(doc, t.id)} size={28} />
                      <span className="min-w-0 flex-1 truncate">
                        {nm}
                        {(t.id === "me" ? m.organizer : findEvent(doc, m.id)?.organizer === t.id) ? (
                          <span className="block text-[11px] text-[#adadad]">Organizer</span>
                        ) : (
                          t.id !== "me" && findEvent(doc, m.id) && <span className="block text-[11px] text-[#adadad]">{(t as { role?: string }).role ?? "Presenter"}</span>
                        )}
                      </span>
                      {t.hand && <TIcon name="hand" size={14} className="text-[#ffaa44]" />}
                      <TIcon name={t.muted ? "micOff" : "mic"} size={14} className={t.muted ? "text-[#adadad]" : "text-white"} />
                      {m.organizer && t.id !== "me" && !t.muted && (
                        <button type="button" aria-label={`Mute ${personName(doc, t.id)}`} title="Mute participant" onClick={() => cmd(key, "meeting.mutePerson", t.id)} className="rounded px-1.5 py-0.5 text-[11px] text-[#a6a8ff] hover:bg-white/10">
                          Mute
                        </button>
                      )}
                      {m.organizer && t.id !== "me" && (
                        <button
                          type="button"
                          aria-label={`More options for ${personName(doc, t.id)}`}
                          title="More options"
                          onClick={(e) => {
                            const role = (t as { role?: string }).role ?? "Presenter";
                            openMenu(
                              e.currentTarget.getBoundingClientRect(),
                              [
                                role === "Attendee"
                                  ? { label: "Make a presenter", icon: "share", onClick: () => cmd(key, "meeting.role", `${t.id}=Presenter`) }
                                  : { label: "Make an attendee", icon: "people", onClick: () => cmd(key, "meeting.role", `${t.id}=Attendee`) },
                                { label: "Pin for me", icon: "pin", disabled: true },
                                { label: "Spotlight for everyone", icon: "view", disabled: true },
                              ],
                              220,
                            );
                          }}
                          className="rounded p-0.5 text-[#d6d6d6] hover:bg-white/10"
                        >
                          <TIcon name="more" size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {panel === "effects" && (
              <div className="min-h-0 flex-1 overflow-auto px-4 pb-3">
                <div className="mb-3 aspect-video overflow-hidden rounded-md">
                  <VideoPreview name={doc.me.name} camera background={bgDraft} />
                </div>
                <div className="mb-2 text-[12px] font-semibold text-[#d6d6d6]">Backgrounds</div>
                <BackgroundPicker value={bgDraft} onPick={setBgDraft} dark />
                <div className="mt-4 flex justify-end gap-2">
                  <button type="button" onClick={() => setBgDraft(m.background)} className="rounded-[4px] border border-white/40 px-3 py-1 text-[13px] font-semibold hover:bg-white/10">
                    Preview
                  </button>
                  <button type="button" aria-label="Apply" onClick={() => cmd(key, "av.background", bgDraft)} className="rounded-[4px] bg-[#5b5fc7] px-4 py-1 text-[13px] font-semibold hover:bg-[#4f52b2]">
                    Apply
                  </button>
                </div>
              </div>
            )}
            {panel === "devices" && d && (
              <div className="min-h-0 flex-1 overflow-auto px-4 pb-3">
                <DeviceSelect dark label="Speaker" value={d.speaker} options={d.speakers} onChange={(v) => cmd(key, "av.speaker", v)} />
                <DeviceSelect dark label="Microphone" value={d.microphone} options={d.microphones} onChange={(v) => cmd(key, "av.microphone", v)} />
                <DeviceSelect dark label="Noise suppression" value={d.noise ?? "Auto"} options={["Auto", "High", "Low", "Off"]} onChange={(v) => cmd(key, "av.noise", v)} />
              </div>
            )}
          </div>
        )}
      </div>
      {confirmRec && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-label="Start recording">
          <div className="w-[380px] rounded-lg bg-[#292929] p-5 text-[13px] shadow-2xl">
            <div className="mb-2 text-[16px] font-semibold">Start recording?</div>
            <p className="mb-4 text-[#d6d6d6]">Everyone in the meeting will be notified that recording and transcription have started. Make sure participants know before you record.</p>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setConfirmRec(false)} className="rounded-[4px] border border-white/40 px-4 py-1 font-semibold hover:bg-white/10">
                Cancel
              </button>
              <button
                type="button"
                aria-label="Confirm"
                onClick={() => {
                  setConfirmRec(false);
                  cmd(key, "meeting.record", "start");
                }}
                className="rounded-[4px] bg-[#5b5fc7] px-4 py-1 font-semibold hover:bg-[#4f52b2]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Tile({ id, muted, hand, m, small, speaking, reaction }: { id: string; muted?: boolean; hand?: boolean; m: TeamsMeeting; small?: boolean; speaking?: boolean; reaction?: { k: number; em: string } | null }) {
  const { doc } = useTeams();
  const me = id === "me";
  const name = me ? doc.me.name : personName(doc, id);
  return (
    <div className={`relative min-h-0 overflow-hidden rounded-md bg-[#3d3d3d] ${small ? "w-32 shrink-0" : ""} ${speaking ? "ring-2 ring-[#a6a8ff]" : ""}`}>
      {me && m.camera ? (
        <VideoPreview name={name} camera background={m.background} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Avatar name={name} size={small ? 36 : 64} />
        </div>
      )}
      <div className="absolute bottom-1.5 left-1.5 flex max-w-[90%] items-center gap-1 rounded bg-black/55 px-1.5 py-0.5 text-[11px]">
        {muted && <TIcon name="micOff" size={12} />}
        <span className="truncate">{me ? `${name} (You)` : name}</span>
      </div>
      {hand && (
        <div className="absolute left-1.5 top-1.5 rounded-full bg-[#ffaa44] p-1 text-[#242424]" aria-label="Hand raised">
          <TIcon name="hand" size={14} />
        </div>
      )}
      {reaction && (
        <div key={reaction.k} className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[40px]" aria-hidden="true">
          {reaction.em}
        </div>
      )}
    </div>
  );
}

export function MeetingWindow() {
  const { doc } = useTeams();
  const m = doc.meeting;
  if (!m) return null;
  return m.stage === "prejoin" ? <PreJoin m={m} /> : <InMeeting m={m} />;
}

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

const SETTINGS_PAGES = ["General", "Accounts and orgs", "Privacy", "Notifications and activity", "Appearance and accessibility", "Files and links", "Chats and channels", "Calls", "Devices", "Captions and transcripts", "About Teams"];

export function SettingsPage() {
  const { doc, ui, go, cmd } = useTeams();
  const page = ui.settingsPage ?? "devices";
  const d = doc.devices;
  const [testing, setTesting] = useState(false);
  useEffect(() => {
    if (!testing) return;
    const t = setTimeout(() => setTesting(false), 1600);
    return () => clearTimeout(t);
  }, [testing]);
  const devName = (x: string) => (x.includes("(") ? x.slice(x.indexOf("(") + 1).replace(/\)\s*$/, "") : x);
  const audioDevice = d ? (devName(d.speaker) === devName(d.microphone) ? devName(d.speaker) : "Custom setup") : "";
  return (
    <div className="absolute inset-0 z-[70] flex flex-col bg-white" role="dialog" aria-label="Settings">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[#e0e0e0] px-4">
        <button type="button" aria-label="Back" onClick={() => go({ overlay: null, selection: "" })} className="rounded p-1 hover:bg-[#f5f5f5]">
          <TIcon name="back" size={18} />
        </button>
        <h1 className="text-[18px] font-bold">Settings</h1>
      </div>
      <div className="flex min-h-0 flex-1">
        <nav className="w-[240px] shrink-0 overflow-auto border-r border-[#e0e0e0] bg-[#fafafa] py-2" aria-label="Settings pages">
          {SETTINGS_PAGES.map((p) => {
            const id = p.toLowerCase().split(" ")[0];
            return (
              <button key={p} type="button" aria-current={page === id ? "page" : undefined} onClick={() => go({ settingsPage: id, selection: "settings" })} className={`mx-2 flex w-[calc(100%-16px)] items-center rounded-md px-3 py-2 text-left text-[14px] ${page === id ? "bg-white font-semibold shadow-sm" : "hover:bg-white/70"}`}>
                {p}
              </button>
            );
          })}
        </nav>
        <div className="min-h-0 flex-1 overflow-auto px-8 py-5">
          {page === "devices" && d ? (
            <div className="max-w-[560px]">
              <h2 className="mb-1 text-[16px] font-bold">Audio settings</h2>
              <p className="mb-4 text-[13px] text-[#616161]">Choose the speaker and microphone Teams uses for calls and meetings.</p>
              <label className="mb-3 block">
                <span className="mb-1 block text-[12px] font-semibold text-[#424242]">Audio devices</span>
                <div className="rounded-[4px] border border-[#e0e0e0] bg-[#fafafa] px-2 py-1.5 text-[13px]">{audioDevice}</div>
              </label>
              <DeviceSelect label="Speaker" value={d.speaker} options={d.speakers} onChange={(v) => cmd("settings", "av.speaker", v)} />
              <DeviceSelect label="Microphone" value={d.microphone} options={d.microphones} onChange={(v) => cmd("settings", "av.microphone", v)} />
              <DeviceSelect label="Noise suppression" value={d.noise ?? "Auto"} options={["Auto", "High", "Low", "Off"]} onChange={(v) => cmd("settings", "av.noise", v)} />
              <button
                type="button"
                aria-label="Make a test call"
                onClick={() => {
                  setTesting(true);
                  cmd("settings", "settings.testCall");
                }}
                className="mb-2 flex items-center gap-2 rounded-[4px] border border-[#d1d1d1] px-4 py-1.5 text-[14px] font-semibold hover:bg-[#f5f5f5]"
              >
                <TIcon name="calls" size={16} /> Make a test call
              </button>
              {testing && <div className="mb-4 rounded-md bg-[#f0f1fd] px-3 py-2 text-[13px]">Test call in progress… Record a short message after the beep. It plays back for you.</div>}
              {!testing && d.testCall && (
                <div className="mb-4 rounded-md border border-[#e0e0e0] p-3 text-[13px]" role="status">
                  <div className="mb-2 font-semibold">Test call results</div>
                  {[
                    ["Microphone", d.microphone],
                    ["Speaker", d.speaker],
                    ["Camera", d.camera],
                    ["Network", "Good"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2 py-0.5">
                      <TIcon name="check" size={14} className="text-[#107c10]" />
                      <span className="w-24 text-[#616161]">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              )}
              <h2 className="mb-1 mt-6 text-[16px] font-bold">Video settings</h2>
              <DeviceSelect label="Camera" value={d.camera} options={d.cameras} onChange={(v) => cmd("settings", "av.cameraDevice", v)} />
              <div className="aspect-video w-[320px] overflow-hidden rounded-md">
                <VideoPreview name={doc.me.name} camera background="None" />
              </div>
            </div>
          ) : page === "notifications" ? (
            <div className="max-w-[600px] text-[14px]">
              <h2 className="mb-1 text-[16px] font-bold">Notifications and activity</h2>
              <p className="mb-4 text-[13px] text-[#616161]">Choose where each kind of notification appears, or turn it off.</p>
              <h3 className="mb-2 text-[14px] font-semibold">Chats and channels</h3>
              {[
                ["Chat messages", "Activity feed and banner"],
                ["Mentions of me", "Activity feed and banner"],
                ["Replies to my posts", "Activity feed and banner"],
                ["Reactions to my messages", "Activity feed only"],
              ].map(([k, def]) => (
                <label key={k} className="mb-2 flex items-center gap-3">
                  <span className="w-56">{k}</span>
                  <select aria-label={k} value={doc.settings?.notify?.[k] ?? def} onChange={(e) => cmd("settings", "settings.notify", `${k}=${e.target.value}`)} className="rounded-[4px] border border-[#d1d1d1] bg-white px-2 py-1 text-[13px]">
                    {["Activity feed and banner", "Activity feed only", "Off"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              ))}
              <h3 className="mb-2 mt-5 text-[14px] font-semibold">Meetings</h3>
              {[["Meeting started", "Activity feed and banner"], ["Meeting chat", "Activity feed and banner"]].map(([k, def]) => (
                <label key={k} className="mb-2 flex items-center gap-3">
                  <span className="w-56">{k}</span>
                  <select aria-label={k} value={doc.settings?.notify?.[k] ?? def} onChange={(e) => cmd("settings", "settings.notify", `${k}=${e.target.value}`)} className="rounded-[4px] border border-[#d1d1d1] bg-white px-2 py-1 text-[13px]">
                    {["Activity feed and banner", "Activity feed only", "Off"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          ) : page === "chats" ? (
            <div className="max-w-[600px] text-[14px]">
              <h2 className="mb-1 text-[16px] font-bold">Chats and channels</h2>
              <p className="mb-4 text-[13px] text-[#616161]">Customize view: keep chats, teams, and channels together in Chat, or show teams and channels in their own Teams view.</p>
              {[
                ["Combined", "Chats, teams, and channels together in Chat"],
                ["Separate", "Chats in Chat; teams and channels in Teams"],
              ].map(([v, text]) => {
                const on = (doc.layout ?? "combined") === v.toLowerCase();
                return (
                  <label key={v} className={`mb-2 flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 ${on ? "border-[#5b5fc7] bg-[#f0f1fd]" : "border-[#e0e0e0]"}`}>
                    <input type="radio" name="tm-layout" checked={on} onChange={() => cmd("settings", "settings.layout", v)} aria-label={v} />
                    <span>
                      <span className="block font-semibold">{v}</span>
                      <span className="text-[12px] text-[#616161]">{text}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          ) : page === "appearance" ? (
            <div className="max-w-[600px] text-[14px]">
              <h2 className="mb-1 text-[16px] font-bold">Appearance and accessibility</h2>
              <p className="mb-4 text-[13px] text-[#616161]">Theme</p>
              <div className="flex gap-3">
                {["Follow operating system theme", "Light", "Dark"].map((t) => {
                  const on = (doc.settings?.theme ?? "Follow operating system theme") === t;
                  return (
                    <button key={t} type="button" aria-pressed={on} aria-label={t} onClick={() => cmd("settings", "settings.theme", t)} className={`flex w-40 flex-col gap-1.5 rounded-md border-2 p-2 text-left text-[12px] ${on ? "border-[#5b5fc7]" : "border-[#e0e0e0] hover:border-[#c7c7c7]"}`}>
                      <span className={`h-16 w-full rounded ${t === "Dark" ? "bg-[#292929]" : t === "Light" ? "bg-[#f5f5f5]" : "bg-gradient-to-r from-[#f5f5f5] to-[#292929]"}`} />
                      {t}
                    </button>
                  );
                })}
              </div>
              <p className="mt-5 text-[13px] text-[#616161]">Zoom: press Ctrl+= to zoom in and Ctrl+- to zoom out. Press Ctrl+. to see all keyboard shortcuts.</p>
            </div>
          ) : (
            <div className="max-w-[560px] text-[14px]">
              <h2 className="mb-2 text-[16px] font-bold">{SETTINGS_PAGES.find((p) => p.toLowerCase().startsWith(page)) ?? "Settings"}</h2>
              <p className="text-[#616161]">Your organization manages these settings. Choose Devices to set up your speaker, microphone, and camera.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function callTitle(doc: ReturnType<typeof useTeams>["doc"], chatId: string) {
  const c = findChat(doc, chatId);
  return c ? chatTitle(doc, c) : "";
}
