"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, MeetLogo } from "./icons";
import { fmtLongDay, fmtTime, nowOf, personOf, roomOf, todayOf } from "./model";
import type { GmMeeting } from "./types";
import { AppsMenu, Avatar, Btn, FONT, IconBtn, Menu, Modal, TEXT, colorFor, useGm, type MenuPos } from "./ui";

export const REACTIONS: { emoji: string; name: string }[] = [
  { emoji: "💖", name: "Sparkling heart" },
  { emoji: "👍", name: "Thumbs up" },
  { emoji: "🎉", name: "Party popper" },
  { emoji: "👏", name: "Clapping hands" },
  { emoji: "😂", name: "Face with tears of joy" },
  { emoji: "😮", name: "Face with open mouth" },
  { emoji: "😢", name: "Crying face" },
  { emoji: "🤔", name: "Thinking face" },
  { emoji: "👎", name: "Thumbs down" },
];
const EFFECTS = ["None", "Slightly blur", "Blur", "Office", "Library", "Plants"];
const EFFECT_LABEL: Record<string, string> = { None: "No effect", "Slightly blur": "Slightly blur your background", Blur: "Blur your background", Office: "Office background", Library: "Library background", Plants: "Plants background" };
export const LAYOUTS = ["Auto (dynamic)", "Tiled (legacy)", "Spotlight", "Sidebar"];

export function MeetSurface() {
  const g = useGm();
  const m = g.doc.meeting;
  if (!m) return <MeetHome />;
  if (m.stage === "prejoin") return <PreJoin m={m} />;
  if (m.stage === "left") return <LeftScreen m={m} />;
  return <InCall m={m} />;
}

function MeetHeader() {
  const g = useGm();
  const [apps, setApps] = useState<MenuPos | null>(null);
  return (
    <div className="flex h-16 shrink-0 items-center gap-2 px-4">
      <MeetLogo size={34} />
      <span className="text-[22px] text-[#444746]" style={{ fontFamily: FONT }}><span className="font-medium">Google</span> Meet</span>
      <span className="flex-1" />
      <span className="mr-2 text-[16px] text-[#444746]">{fmtTime(nowOf(g.doc))} • {fmtLongDay(todayOf(g.doc)).replace(/^(\w{3})\w*,/, "$1,")}</span>
      <IconBtn icon="help" label="Support" onClick={() => g.cmd("toast", "Meet Help opens in a new tab.")} />
      <IconBtn icon="settings" label="Settings" onClick={() => g.cmd("toast", "Settings open inside a meeting: More options › Settings.")} />
      <IconBtn icon="apps" label="Google apps" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setApps({ x: r.right, y: r.bottom + 4 }); }} />
      <Avatar person={g.doc.me} size={32} />
      {apps && <AppsMenu pos={apps} onClose={() => setApps(null)} />}
    </div>
  );
}

function MeetHome() {
  const g = useGm();
  const [code, setCode] = useState("");
  const [menu, setMenu] = useState<MenuPos | null>(null);
  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: TEXT }}>
      <MeetHeader />
      <div className="flex min-h-0 flex-1 items-center gap-10 px-16">
        <div className="max-w-[560px]">
          <h1 className="mb-4 text-[40px] leading-[48px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>Video calls and meetings for everyone</h1>
          <p className="mb-8 text-[18px] text-[#444746]">Connect, collaborate, and celebrate from anywhere with Google Meet</p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" aria-label="New meeting" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMenu({ x: r.left, y: r.bottom + 8 }); }} className="flex h-12 items-center gap-2 rounded-full bg-[#0b57d0] px-5 text-[15px] font-medium text-white hover:bg-[#0842a0]" style={{ fontFamily: FONT }}>
              <Icon name="video" size={20} color="#fff" /> New meeting
            </button>
            <div className="flex h-12 items-center gap-2 rounded border border-[#747775] px-3 focus-within:border-2 focus-within:border-[#0b57d0]">
              <Icon name="keyboard" size={22} />
              <input aria-label="Enter a code or nickname" placeholder="Enter a code or nickname" value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && code.trim()) g.type("meetcode", code.trim()); }} className="h-full w-[220px] text-[16px] outline-none" />
            </div>
            <Btn kind="text" disabled={!code.trim()} onClick={() => g.type("meetcode", code.trim())} label="Join">Join</Btn>
          </div>
          <div className="mt-8 border-t border-[#dadce0] pt-4 text-[14px] text-[#444746]">Learn more about Google Meet</div>
        </div>
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="flex h-[300px] w-[300px] items-center justify-center rounded-full bg-[#e8f0fe]"><Icon name="people" size={140} color="#1a73e8" /></div>
        </div>
      </div>
      {menu && (
        <Menu
          label="New meeting"
          pos={menu}
          onClose={() => setMenu(null)}
          width={300}
          items={[
            { label: "Create a meeting for later", icon: "link", onClick: () => g.cmd("toast", "Here's the link to your meeting. Copy it and send it to people you want to meet with.") },
            { label: "Start an instant meeting", icon: "plus", onClick: () => g.cmd("toast", "Instant meetings aren't part of this practice. Join with a code instead.") },
            { label: "Schedule in Google Calendar", icon: "calendar", onClick: () => g.cmd("app", "calendar") },
          ]}
        />
      )}
    </div>
  );
}

function SelfTile({ m, big }: { m: GmMeeting; big?: boolean }) {
  const g = useGm();
  const effect = m.effect && m.effect !== "None" ? m.effect : null;
  const bg = !m.camera ? "#3c4043" : effect === "Office" ? "linear-gradient(135deg,#8d6e63,#d7ccc8)" : effect === "Library" ? "linear-gradient(135deg,#5d4037,#a1887f)" : effect === "Plants" ? "linear-gradient(135deg,#2e7d32,#a5d6a7)" : "linear-gradient(135deg,#455a64,#90a4ae)";
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg" style={{ background: bg, filter: effect === "Blur" || effect === "Slightly blur" ? undefined : undefined }} aria-label={m.camera ? "Your camera is on" : "Your camera is off"}>
      {m.camera ? (
        <div className={`flex flex-col items-center ${effect === "Blur" ? "" : ""}`}>
          <div className="rounded-full" style={{ width: big ? 120 : 56, height: big ? 120 : 56, background: "#ffcc80", boxShadow: effect === "Blur" || effect === "Slightly blur" ? "0 0 0 30px rgba(255,255,255,.08)" : undefined }} />
          <div className="mt-[-8px] rounded-t-full" style={{ width: big ? 200 : 90, height: big ? 90 : 40, background: "#5c6bc0" }} />
        </div>
      ) : (
        <span className="flex items-center justify-center rounded-full text-white" style={{ width: big ? 120 : 56, height: big ? 120 : 56, background: colorFor(g.doc.me), fontSize: big ? 52 : 24 }}>{g.doc.me.name[0]}</span>
      )}
      {effect && m.camera && <span className="absolute left-3 top-3 rounded bg-black/50 px-2 py-0.5 text-[12px] text-white">{EFFECT_LABEL[effect]}</span>}
      <span className="absolute bottom-2 left-3 text-[14px] font-medium text-white">You</span>
      {!m.mic && <span className="absolute right-2 top-2 rounded-full bg-black/50 p-1"><Icon name="micOff" size={16} color="#fff" /></span>}
      {m.hand && <span className="absolute right-2 bottom-2 rounded-full bg-white p-1" aria-label="Your hand is raised"><Icon name="hand" size={18} color="#1f1f1f" /></span>}
    </div>
  );
}

function AvButtons({ m, size = 56, dark }: { m: GmMeeting; size?: number; dark?: boolean }) {
  const g = useGm();
  const btn = (on: boolean, onIcon: string, offIcon: string, label: string, cmd: string) => (
    <button
      type="button"
      aria-label={on ? `Turn off ${label}` : `Turn on ${label}`}
      title={on ? `Turn off ${label} (${label === "microphone" ? "Ctrl + D" : "Ctrl + E"})` : `Turn on ${label} (${label === "microphone" ? "Ctrl + D" : "Ctrl + E"})`}
      onClick={() => g.cmd(cmd, on ? "off" : "on")}
      className={`flex items-center justify-center rounded-full ${on ? (dark ? "bg-[#333537] hover:bg-[#444]" : "border border-white/80 hover:bg-white/10") : "bg-[#ea4335] hover:bg-[#d93025]"}`}
      style={{ width: size, height: dark ? 40 : size }}
    >
      <Icon name={on ? onIcon : offIcon} size={24} color="#fff" />
    </button>
  );
  return (
    <>
      {btn(m.mic, "mic", "micOff", "microphone", "meet.mic")}
      {btn(m.camera, "video", "videoOff", "camera", "meet.camera")}
    </>
  );
}

function EffectsPanel({ m, onClose }: { m: GmMeeting; onClose: () => void }) {
  const g = useGm();
  return (
    <aside aria-label="Effects" className="flex w-[300px] shrink-0 flex-col rounded-lg bg-white p-4 text-[14px] shadow">
      <div className="mb-3 flex items-center"><h3 className="flex-1 text-[18px]" style={{ fontFamily: FONT }}>Effects</h3><IconBtn icon="close" label="Close effects" onClick={onClose} /></div>
      <div className="mb-2 font-medium">Backgrounds</div>
      <div className="grid grid-cols-3 gap-2">
        {EFFECTS.map((e) => (
          <button key={e} type="button" aria-label={EFFECT_LABEL[e]} title={EFFECT_LABEL[e]} aria-pressed={(m.effect ?? "None") === e} onClick={() => g.cmd("meet.effects", e)} className={`flex aspect-video items-center justify-center rounded-lg text-[11px] ${(m.effect ?? "None") === e ? "ring-[3px] ring-[#0b57d0]" : "ring-1 ring-[#dadce0]"}`} style={{ background: e === "Office" ? "#d7ccc8" : e === "Library" ? "#a1887f" : e === "Plants" ? "#a5d6a7" : "#f1f3f4" }}>
            {e === "None" ? <Icon name="block" size={20} /> : e === "Slightly blur" || e === "Blur" ? <span className="rounded-full bg-[#9aa0a6] blur-[1px]" style={{ width: e === "Blur" ? 26 : 20, height: e === "Blur" ? 26 : 20 }} /> : e}
          </button>
        ))}
      </div>
    </aside>
  );
}

function PreJoin({ m }: { m: GmMeeting }) {
  const g = useGm();
  const room = roomOf(g.doc, m.code);
  const [effects, setEffects] = useState(false);
  const [more, setMore] = useState(false);
  const here = room?.participants ?? [];
  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: TEXT }}>
      <MeetHeader />
      <div className="flex min-h-0 flex-1 items-center justify-center gap-8 px-8 pb-6">
        <div className="relative aspect-video w-full max-w-[720px]">
          <SelfTile m={m} big />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4"><AvButtons m={m} /></div>
          <button type="button" aria-label="Apply visual effects" title="Apply visual effects" onClick={() => setEffects((x) => !x)} className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/80 hover:bg-white/10"><Icon name="effects" size={22} color="#fff" /></button>
          <button type="button" aria-label="More options" onClick={() => setMore(true)} className="absolute right-3 top-3 rounded-full p-2 hover:bg-white/10"><Icon name="more" size={22} color="#fff" /></button>
        </div>
        {effects ? (
          <EffectsPanel m={m} onClose={() => setEffects(false)} />
        ) : (
          <div className="flex w-[320px] shrink-0 flex-col items-center text-center">
            <h2 className="mb-2 text-[28px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>{room?.askToJoin ? "Ask to join?" : "Ready to join?"}</h2>
            <p className="mb-1 text-[14px] text-[#444746]">{room?.title}</p>
            <div className="mb-4 flex items-center gap-1 text-[14px] text-[#444746]">
              {here.length ? (
                <>
                  <span className="flex -space-x-2">{here.slice(0, 3).map((p) => <Avatar key={p.email} person={personOf(g.doc, p.email)} size={24} />)}</span>
                  <span className="ml-1">{here.length === 1 ? `${personOf(g.doc, here[0].email).name} is in this call` : `${personOf(g.doc, here[0].email).name} and ${here.length - 1} more are in this call`}</span>
                </>
              ) : "No one else is here"}
            </div>
            <Btn onClick={() => g.cmd("meet.join")} label={room?.askToJoin ? "Ask to join" : "Join now"} className="h-12 px-8 text-[15px]">{room?.askToJoin ? "Ask to join" : "Join now"}</Btn>
            <div className="mt-6 text-[14px] text-[#444746]">Other ways to join</div>
            <button type="button" onClick={() => g.cmd("toast", "Present before joining uses Companion mode: your mic and speaker are off.")} className="mt-2 flex items-center gap-2 rounded-full border border-[#747775] px-4 py-2 text-[14px] text-[#0b57d0] hover:bg-[#0b57d0]/10"><Icon name="present" size={18} color="#0b57d0" /> Present</button>
            <button type="button" onClick={() => g.cmd("toast", "Join and use a phone for audio isn't part of this practice.")} className="mt-2 text-[14px] text-[#0b57d0] hover:underline">Join and use a phone for audio</button>
          </div>
        )}
      </div>
      {more && <SettingsDialog onClose={() => setMore(false)} />}
    </div>
  );
}

function SettingsDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Settings" onClose={onClose} width={560} footer={<Btn onClick={onClose}>Done</Btn>}>
      <div className="flex gap-6 text-[14px]">
        <div className="w-[140px] space-y-2 text-[#0b57d0]"><div className="font-medium">Audio</div><div className="text-[#444746]">Video</div><div className="text-[#444746]">Captions</div><div className="text-[#444746]">Reactions</div></div>
        <div className="flex-1 space-y-3">
          <div><div className="text-[12px] text-[#444746]">Microphone</div><div>Default - Microphone (Realtek Audio)</div></div>
          <div><div className="text-[12px] text-[#444746]">Speakers</div><div>Default - Speakers (Realtek Audio) <span className="ml-2 text-[#0b57d0]">Test</span></div></div>
          <div><div className="text-[12px] text-[#444746]">Camera</div><div>HD Webcam</div></div>
        </div>
      </div>
    </Modal>
  );
}

function Tile({ email, muted, hand, camera }: { email: string; muted?: boolean; hand?: boolean; camera?: boolean }) {
  const g = useGm();
  const p = personOf(g.doc, email);
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-[#3c4043]" aria-label={`${p.name}${hand ? ", hand raised" : ""}`}>
      {camera ? (
        <div className="flex h-full w-full flex-col items-center justify-end" style={{ background: `linear-gradient(135deg, ${colorFor(p)}55, #5f6368)` }}>
          <div className="h-14 w-14 rounded-full bg-[#ffe0b2]" />
          <div className="h-10 w-24 rounded-t-full" style={{ background: colorFor(p) }} />
        </div>
      ) : (
        <span className="flex h-16 w-16 items-center justify-center rounded-full text-[28px] text-white" style={{ background: colorFor(p) }}>{p.name[0]}</span>
      )}
      <span className="absolute bottom-2 left-3 text-[13px] font-medium text-white">{p.name}</span>
      {muted && <span className="absolute right-2 top-2 rounded-full bg-black/50 p-1"><Icon name="micOff" size={14} color="#fff" /></span>}
      {hand && <span className="absolute right-2 bottom-2 rounded-full bg-white p-1"><Icon name="hand" size={16} color="#1f1f1f" /></span>}
    </div>
  );
}

function InCall({ m }: { m: GmMeeting }) {
  const g = useGm();
  const { doc } = g;
  const room = roomOf(doc, m.code);
  const [react, setReact] = useState(false);
  const [present, setPresent] = useState<MenuPos | null>(null);
  const [picker, setPicker] = useState<null | "A tab" | "A window" | "Your entire screen">(null);
  const [more, setMore] = useState<MenuPos | null>(null);
  const [layout, setLayout] = useState(false);
  const [effects, setEffects] = useState(false);
  const [settings, setSettings] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  useEffect(() => {
    if (!m.lastReaction) return;
    setFlash(m.lastReaction);
    const t = setTimeout(() => setFlash(null), 2500);
    return () => clearTimeout(t);
  }, [m.lastReaction, doc.seq]);
  const others = m.participants;
  const spotlight = m.layout === "Spotlight" || Boolean(m.presenting);
  const sidebar = m.layout === "Sidebar";
  const panel = m.panel ?? null;
  const ctrl = (icon: string, label: string, onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, pressed?: boolean, red?: boolean) => (
    <button type="button" aria-label={label} title={label} aria-pressed={pressed} onClick={onClick} className={`flex h-10 min-w-10 items-center justify-center rounded-full px-2.5 ${red ? "bg-[#ea4335] hover:bg-[#d93025]" : pressed ? "bg-[#a8c7fa] text-[#062e6f]" : "bg-[#333537] hover:bg-[#444]"}`}>
      <Icon name={icon} size={22} color={pressed ? "#062e6f" : "#fff"} />
    </button>
  );
  const captions = room?.captions ?? [];
  return (
    <div className="flex h-full flex-col bg-[#202124] text-white" style={{ fontFamily: TEXT }} aria-label="Meeting">
      {m.recording && <div className="flex h-7 items-center gap-2 bg-[#202124] px-4 text-[12px] text-white"><span className="h-2.5 w-2.5 rounded-full bg-[#ea4335]" /> Recording</div>}
      <div className="flex min-h-0 flex-1 gap-3 p-3">
        <div className="relative flex min-w-0 flex-1 flex-col gap-2">
          {m.presenting && (
            <div className="flex items-center gap-3 rounded-lg bg-[#3c4043] px-4 py-2 text-[14px]" role="status">
              <Icon name="present" size={20} color="#a8c7fa" />
              <span className="flex-1">You are presenting {m.presenting.replace(/^A (tab|window): /, "")}</span>
              <button type="button" onClick={() => g.cmd("meet.stopPresent")} className="rounded-full bg-[#a8c7fa] px-4 py-1.5 font-medium text-[#062e6f]" aria-label="Stop presenting">Stop presenting</button>
            </div>
          )}
          <div className={`min-h-0 flex-1 ${spotlight || sidebar ? "flex gap-2" : `grid gap-2 ${others.length + 1 <= 2 ? "grid-cols-2" : others.length + 1 <= 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-3 grid-rows-2"}`}`}>
            {spotlight || sidebar ? (
              <>
                <div className="relative min-w-0 flex-1">
                  {m.presenting ? (
                    <div className="flex h-full items-center justify-center rounded-lg bg-[#e8eaed] text-[#3c4043]"><div className="text-center"><Icon name="present" size={48} color="#5f6368" /><div className="mt-2 text-[16px]">{m.presenting.replace(/^A (tab|window): /, "")}</div><div className="text-[12px] text-[#5f6368]">Everyone in the meeting sees this</div></div></div>
                  ) : (
                    <Tile email={others[0]?.email ?? doc.me.email} muted={others[0]?.muted} hand={others[0]?.hand} camera={others[0]?.camera} />
                  )}
                </div>
                {sidebar || m.presenting ? (
                  <div className="flex w-[200px] shrink-0 flex-col gap-2">
                    <div className="h-[120px]"><SelfTile m={m} /></div>
                    {others.slice(m.presenting ? 0 : 1).map((p) => <div key={p.email} className="h-[120px]"><Tile {...p} /></div>)}
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {others.map((p) => <Tile key={p.email} {...p} />)}
                <SelfTile m={m} />
              </>
            )}
          </div>
          {m.captions && (
            <div className="rounded-lg bg-black/70 px-4 py-2 text-[16px]" aria-label="Captions" role="log">
              {captions.length ? captions.slice(-2).map((c, i) => <p key={i}><span className="mr-2 font-medium text-[#a8c7fa]">{personOf(doc, c.from).name}</span>{c.text}</p>) : <p className="text-white/70">Captions will appear here when someone speaks.</p>}
            </div>
          )}
          {flash && <div className="pointer-events-none absolute bottom-6 left-6 animate-bounce text-[44px]" aria-hidden="true">{REACTIONS.find((r) => r.name === flash)?.emoji}</div>}
        </div>
        {panel && <SidePanelMeet m={m} panel={panel} />}
        {effects && <div className="text-[#1f1f1f]"><EffectsPanel m={m} onClose={() => setEffects(false)} /></div>}
      </div>
      {react && (
        <div className="mx-auto mb-1 flex gap-1 rounded-full bg-[#333537] px-3 py-1.5" role="toolbar" aria-label="Reactions">
          {REACTIONS.map((r) => <button key={r.name} type="button" aria-label={r.name} title={r.name} onClick={() => g.cmd("meet.react", r.name)} className="rounded-full p-1 text-[24px] hover:bg-white/10">{r.emoji}</button>)}
        </div>
      )}
      <div className="flex h-[80px] shrink-0 items-center px-4">
        <div className="w-[260px] truncate text-[16px]">{fmtTime(nowOf(doc))} | {room?.title ?? m.code}</div>
        <div className="flex flex-1 items-center justify-center gap-2.5">
          <AvButtons m={m} size={40} dark />
          {ctrl("cc", m.captions ? "Turn off captions" : "Turn on captions", () => g.cmd("meet.captions", m.captions ? "off" : "on"), m.captions)}
          {ctrl("emoji", "Send a reaction", () => setReact((x) => !x), react)}
          {ctrl("present", m.presenting ? "You are presenting" : "Present now", (e) => { const r = e.currentTarget.getBoundingClientRect(); setPresent({ x: r.left - 60, y: r.top - 150 }); }, Boolean(m.presenting))}
          {ctrl("hand", m.hand ? "Lower hand" : "Raise hand", () => g.cmd("meet.hand", m.hand ? "lower" : "raise"), m.hand)}
          {ctrl("more", "More options", (e) => { const r = e.currentTarget.getBoundingClientRect(); setMore({ x: r.left - 100, y: r.top - 200 }); })}
          <button type="button" aria-label="Leave call" title="Leave call" onClick={() => g.cmd("meet.leave")} className="ml-1 flex h-10 w-16 items-center justify-center rounded-full bg-[#ea4335] hover:bg-[#d93025]"><Icon name="callEnd" size={24} color="#fff" /></button>
        </div>
        <div className="flex w-[260px] justify-end gap-1">
          <IconBtn icon="info" label="Meeting details" color={panel === "details" ? "#a8c7fa" : "#fff"} onClick={() => g.cmd("meet.panel", panel === "details" ? "" : "details")} />
          <span className="relative">
            <IconBtn icon="people" label="People" color={panel === "people" ? "#a8c7fa" : "#fff"} onClick={() => g.cmd("meet.panel", panel === "people" ? "" : "people")} />
            <span className="pointer-events-none absolute -right-0.5 -top-0.5 rounded-full bg-[#5f6368] px-1.5 text-[11px]">{others.length + 1}</span>
          </span>
          <IconBtn icon="chat" label="Chat with everyone" color={panel === "chat" ? "#a8c7fa" : "#fff"} onClick={() => g.cmd("meet.panel", panel === "chat" ? "" : "chat")} />
          <IconBtn icon="tools" label="Meeting tools" color={panel === "tools" ? "#a8c7fa" : "#fff"} onClick={() => g.cmd("meet.panel", panel === "tools" ? "" : "tools")} />
        </div>
      </div>
      {present && (
        <Menu label="Present now" pos={present} onClose={() => setPresent(null)} width={240} items={[
          { head: "Present" },
          { label: "Your entire screen", icon: "monitor", onClick: () => setTimeout(() => setPicker("Your entire screen"), 0) },
          { label: "A window", icon: "window", onClick: () => setTimeout(() => setPicker("A window"), 0) },
          { label: "A tab", icon: "tab", onClick: () => setTimeout(() => setPicker("A tab"), 0) },
        ]} />
      )}
      {picker && <SharePicker kind={picker} onClose={() => setPicker(null)} />}
      {more && (
        <Menu label="More options" pos={more} onClose={() => setMore(null)} width={260} items={[
          { label: "Change layout", icon: "layout", onClick: () => setTimeout(() => setLayout(true), 0) },
          { label: "Full screen", icon: "fullscreen", onClick: () => g.cmd("toast", "Full screen isn't part of this practice.") },
          { label: "Apply visual effects", icon: "effects", onClick: () => setEffects(true) },
          { sep: true },
          { label: "Settings", icon: "settings", onClick: () => setTimeout(() => setSettings(true), 0) },
        ]} />
      )}
      {layout && (
        <div className="text-[#1f1f1f]">
          <Modal title="Change layout" onClose={() => setLayout(false)} width={420} footer={<Btn kind="text" onClick={() => setLayout(false)}>Close</Btn>}>
            <p className="mb-2 text-[12px] text-[#5f6368]">Layout selection is saved for future meetings</p>
            {LAYOUTS.map((l) => (
              <label key={l} className="flex h-10 items-center gap-3 text-[14px]">
                <input type="radio" name="layout" aria-label={l} checked={(m.layout ?? "Auto (dynamic)") === l} onChange={() => g.cmd("meet.layout", l)} className="h-[18px] w-[18px] accent-[#0b57d0]" />
                {l}
              </label>
            ))}
          </Modal>
        </div>
      )}
      {settings && <div className="text-[#1f1f1f]"><SettingsDialog onClose={() => setSettings(false)} /></div>}
    </div>
  );
}

function SharePicker({ kind, onClose }: { kind: "A tab" | "A window" | "Your entire screen"; onClose: () => void }) {
  const g = useGm();
  const tabs = g.doc.browserTabs ?? [];
  const wins = g.doc.windows ?? [];
  const list = kind === "A tab" ? tabs : kind === "A window" ? wins : ["Entire screen"];
  const [pick, setPick] = useState<string | null>(kind === "Your entire screen" ? "Entire screen" : null);
  const [audio, setAudio] = useState(kind === "A tab");
  const share = () => {
    if (!pick) return;
    onClose();
    g.cmd("meet.present", kind === "Your entire screen" ? "Your entire screen" : `${kind}: ${pick}`);
  };
  return (
    <div className="text-[#1f1f1f]">
      <Modal title="Choose what to share" onClose={onClose} width={560} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn disabled={!pick} onClick={share} label="Share">Share</Btn></>}>
        <p className="mb-3 text-[13px] text-[#444746]">meet.google.com wants to share the contents of your screen.</p>
        <div className="mb-3 flex gap-6 border-b border-[#dadce0] text-[14px]">
          {(["A tab", "A window", "Your entire screen"] as const).map((k) => <span key={k} className={`pb-2 ${k === kind ? "border-b-2 border-[#0b57d0] font-medium text-[#0b57d0]" : "text-[#5f6368]"}`}>{k === "A tab" ? "Chrome Tab" : k === "A window" ? "Window" : "Entire Screen"}</span>)}
        </div>
        <div role="listbox" aria-label="What to share" className="max-h-60 space-y-1 overflow-auto">
          {list.map((t) => (
            <div key={t} role="option" aria-selected={pick === t} aria-label={t} onClick={() => setPick(t)} onDoubleClick={() => { setPick(t); }} className={`flex h-10 cursor-default items-center gap-3 rounded px-3 text-[14px] ${pick === t ? "bg-[#d3e3fd]" : "hover:bg-[#f1f3f4]"}`}>
              <Icon name={kind === "A tab" ? "tab" : kind === "A window" ? "window" : "monitor"} size={18} />
              {t}
            </div>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-[13px]"><input type="checkbox" checked={audio} onChange={(e) => setAudio(e.target.checked)} className="accent-[#0b57d0]" />{kind === "A tab" ? "Also share tab audio" : "Also share system audio"}</label>
      </Modal>
    </div>
  );
}

function SidePanelMeet({ m, panel }: { m: GmMeeting; panel: string }) {
  const g = useGm();
  const { doc } = g;
  const room = roomOf(doc, m.code);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { listRef.current?.scrollTo({ top: 99999 }); }, [m.chat.length]);
  const send = () => { if (text.trim()) { g.type("meetchat", text.trim()); setText(""); } };
  const title = panel === "people" ? "People" : panel === "chat" ? "In-call messages" : panel === "details" ? "Meeting details" : "Meeting tools";
  const raised = [...m.participants.filter((p) => p.hand).map((p) => p.email), ...(m.hand ? [doc.me.email] : [])];
  return (
    <aside aria-label={title} className="flex w-[340px] shrink-0 flex-col rounded-lg bg-white text-[#1f1f1f]">
      <div className="flex h-14 items-center px-5"><h3 className="flex-1 text-[18px]" style={{ fontFamily: FONT }}>{title}</h3><IconBtn icon="close" label={`Close ${title}`} onClick={() => g.cmd("meet.panel", "")} /></div>
      {panel === "people" && (
        <div className="min-h-0 flex-1 overflow-y-auto px-4 text-[14px]">
          {raised.length > 0 && (
            <div className="mb-3 rounded-lg border border-[#dadce0] p-3">
              <div className="mb-2 font-medium">Raised hands</div>
              {raised.map((e) => <div key={e} className="flex items-center gap-2 py-1"><Icon name="hand" size={16} /> {e === doc.me.email ? `${doc.me.name} (You)` : personOf(doc, e).name}</div>)}
            </div>
          )}
          <div className="mb-1 text-[12px] font-medium uppercase text-[#5f6368]">In the meeting</div>
          <div className="flex items-center gap-3 py-2"><Avatar person={doc.me} size={32} /><span className="flex-1">{doc.me.name} (You)</span>{!m.mic && <Icon name="micOff" size={18} />}</div>
          {m.participants.map((p) => (
            <div key={p.email} className="flex items-center gap-3 py-2"><Avatar person={personOf(doc, p.email)} size={32} /><span className="flex-1">{personOf(doc, p.email).name}</span>{p.muted && <Icon name="micOff" size={18} />}</div>
          ))}
        </div>
      )}
      {panel === "chat" && (
        <>
          <p className="mx-4 rounded bg-[#f1f3f4] p-3 text-[12px] text-[#444746]">Messages can be seen only by people in the call and are deleted when the call ends.</p>
          <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-3 text-[14px]" role="log" aria-label="Messages">
            {m.chat.map((c, i) => (
              <div key={i}><div className="text-[13px]"><span className="font-medium">{c.from === "me" ? "You" : personOf(doc, c.from).name}</span> <span className="text-[12px] text-[#5f6368]">{c.time}</span></div><div>{c.text}</div></div>
            ))}
          </div>
          <div className="m-3 flex items-center gap-2 rounded-full bg-[#f1f3f4] pl-4 pr-1">
            <input aria-label="Send a message" placeholder="Send a message" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") send(); }} className="h-11 flex-1 bg-transparent text-[14px] outline-none" />
            <IconBtn icon="send" label="Send a message" onClick={send} disabled={!text.trim()} color="#0b57d0" />
          </div>
        </>
      )}
      {panel === "details" && (
        <div className="px-5 text-[14px]">
          <div className="mb-1 font-medium">Joining info</div>
          <div className="mb-3 text-[#444746]">meet.google.com/{m.code}</div>
          <button type="button" onClick={() => g.cmd("toast", "Copied meeting link")} className="flex items-center gap-2 font-medium text-[#0b57d0]"><Icon name="copy" size={18} color="#0b57d0" /> Copy joining info</button>
        </div>
      )}
      {panel === "tools" && (
        <div className="px-3 text-[14px]">
          {[
            ["record", "Recording", "Record this meeting to watch later"],
            ["cc", "Transcripts", "Keep a written record of the meeting"],
            ["chat", "Q&A", "Ask the presenters questions"],
            ["list", "Polls", "Ask the group a question"],
            ["people", "Breakout rooms", "Split the group into smaller rooms"],
          ].map(([icon, label, hint]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => {
                if (label !== "Recording") return g.cmd("toast", `${label} isn't part of this practice.`);
                if (!room?.canRecord) return g.cmd("toast", "Recording isn't available for your account. It depends on your Google Workspace edition and your admin's settings.");
                g.cmd("meet.record", m.recording ? "stop" : "start");
              }}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left hover:bg-[#f1f3f4]"
            >
              <Icon name={icon} size={22} />
              <span><span className="block font-medium">{label === "Recording" && m.recording ? "Stop recording" : label}</span><span className="block text-[12px] text-[#5f6368]">{hint}</span></span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

function LeftScreen({ m }: { m: GmMeeting }) {
  const g = useGm();
  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: TEXT }}>
      <MeetHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <h1 className="text-[32px]" style={{ fontFamily: FONT }}>You left the meeting</h1>
        <div className="flex gap-3">
          <Btn kind="outlined" onClick={() => g.cmd("meet.open", m.code)} label="Rejoin">Rejoin</Btn>
          <Btn onClick={() => g.cmd("meet.home")} label="Return to home screen">Return to home screen</Btn>
        </div>
      </div>
    </div>
  );
}
