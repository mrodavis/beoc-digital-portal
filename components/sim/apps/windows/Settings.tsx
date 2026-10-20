"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { WinWindow } from "./types";
import { AppIcon, G } from "./icons";
import { Avatar, Btn, Modal, Select, T, TextIn, Toggle, useWin } from "./ui";
import { TitleBar } from "./frame";
import { NOW, OPTIONS, SETTINGS_CATS, WALLPAPERS, catOf, settingsTitle } from "./data";
import { S, devices, installedApps, net, pinOf, printers, specs, startupApps, userName } from "./model";

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Card({ children }: { children: ReactNode }) {
  return <div className="mb-1 overflow-hidden rounded-md" style={{ background: T.card, border: `1px solid ${T.line}` }}>{children}</div>;
}

function Row({ icon, title, desc, right, onClick, chevron, indent, label }: { icon?: string; title: ReactNode; desc?: ReactNode; right?: ReactNode; onClick?: () => void; chevron?: boolean; indent?: boolean; label?: string }) {
  const inner = (
    <>
      {icon ? <G n={icon} s={18} /> : indent ? <span className="w-[18px]" /> : null}
      <div className="min-w-0 flex-1">
        <div className="text-[13px]">{title}</div>
        {desc && <div className="text-[11.5px]" style={{ color: T.sub }}>{desc}</div>}
      </div>
      {right && <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>{right}</div>}
      {chevron && <G n="chevR" s={12} style={{ color: T.sub }} />}
    </>
  );
  if (onClick)
    return (
      <div role="button" tabIndex={0} aria-label={label ?? (typeof title === "string" ? title : undefined)} onClick={onClick} onKeyDown={(e) => e.key === "Enter" && onClick()} className="flex min-h-[60px] cursor-default items-center gap-4 px-4 py-2.5 hover:bg-[var(--w-hover)]" style={{ borderTop: `1px solid ${T.line}`, marginTop: -1 }}>
        {inner}
      </div>
    );
  return (
    <div className="flex min-h-[60px] items-center gap-4 px-4 py-2.5" style={{ borderTop: `1px solid ${T.line}`, marginTop: -1 }}>
      {inner}
    </div>
  );
}

function H({ children }: { children: ReactNode }) {
  return <div className="mb-2 mt-5 text-[13px] font-semibold first:mt-0">{children}</div>;
}

function useSet() {
  const ctx = useWin();
  return (k: string, v: string) => ctx.cmd("settings.set", `${k}=${v}`);
}

function Tog({ k, title, desc, icon, label }: { k: string; title: string; desc?: string; icon?: string; label?: string }) {
  const ctx = useWin();
  const set = useSet();
  return (
    <Card>
      <Row icon={icon} title={title} desc={desc} right={<Toggle label={label ?? title} on={S(ctx.doc, k) === "on"} onChange={(v) => set(k, v ? "on" : "off")} />} />
    </Card>
  );
}

function Sel({ k, title, desc, icon, options, fmt, width = 220 }: { k: string; title: string; desc?: string; icon?: string; options?: string[]; fmt?: (v: string) => string; width?: number }) {
  const ctx = useWin();
  const set = useSet();
  return (
    <Card>
      <Row icon={icon} title={title} desc={desc} right={<Select label={title} value={S(ctx.doc, k)} options={options ?? OPTIONS[k] ?? []} onChange={(v) => set(k, v)} fmt={fmt} width={width} />} />
    </Card>
  );
}

function Lnk({ page, title, desc, icon, right }: { page: string; title: string; desc?: string; icon?: string; right?: ReactNode }) {
  const ctx = useWin();
  return (
    <Card>
      <Row icon={icon} title={title} desc={desc} right={right} chevron onClick={() => ctx.cmd("settings.nav", page)} />
    </Card>
  );
}

function Check({ k, label }: { k: string; label: string }) {
  const ctx = useWin();
  const set = useSet();
  const on = S(ctx.doc, k) === "on";
  return (
    <label className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px]" style={{ borderTop: `1px solid ${T.line}` }}>
      <input type="checkbox" aria-label={label} checked={on} onChange={(e) => set(k, e.target.checked ? "on" : "off")} className="h-4 w-4" style={{ accentColor: "var(--w-accent)" }} />
      {label}
    </label>
  );
}

function Slider({ k, min, max, step = 1, label, suffix = "", icon }: { k: string; min: number; max: number; step?: number; label: string; suffix?: string; icon?: string }) {
  const ctx = useWin();
  const key = k === "display.brightness" ? "brightness" : k;
  const cur = Number(S(ctx.doc, k) || min);
  const [v, setV] = useState(cur);
  useEffect(() => setV(cur), [cur]);
  return (
    <div className="flex items-center gap-2">
      {icon && <G n={icon} s={16} />}
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        onMouseUp={() => v !== cur && ctx.cmd("settings.slide", `${key}=${v}`)}
        onKeyUp={() => v !== cur && ctx.cmd("settings.slide", `${key}=${v}`)}
        onTouchEnd={() => v !== cur && ctx.cmd("settings.slide", `${key}=${v}`)}
        className="w-40"
        style={{ accentColor: "var(--w-accent)" }}
      />
      <span className="w-10 text-right text-[12px]">{v}{suffix}</span>
    </div>
  );
}

function Copyable({ rows, title }: { rows: [string, string][]; title: string }) {
  const ctx = useWin();
  const copy = () => {
    const text = rows.map(([a, b]) => `${a}\t${b}`).join("\n");
    ctx.addClip(text);
    try {
      void navigator.clipboard?.writeText(text);
    } catch {
      /* ignore */
    }
  };
  return (
    <Card>
      <div className="flex items-center gap-3 px-4 py-3">
        <G n={title.startsWith("Windows") ? "app" : "info"} s={18} />
        <span className="flex-1 text-[13px] font-semibold">{title}</span>
        <Btn small label={`Copy ${title}`} onClick={copy}>Copy</Btn>
      </div>
      <div className="px-4 pb-3 pl-[52px]">
        {rows.map(([a, b]) => (
          <div key={a} className="flex gap-4 py-0.5 text-[12.5px]">
            <span className="w-36 shrink-0" style={{ color: T.sub }}>{a}</span>
            <span className="select-text">{b}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Dialogs                                                             */
/* ------------------------------------------------------------------ */

function weakPin(p: string) {
  if (/^(\d)\1+$/.test(p)) return true;
  const d = p.split("").map(Number);
  const up = d.every((x, i) => i === 0 || x === d[i - 1] + 1);
  const down = d.every((x, i) => i === 0 || x === d[i - 1] - 1);
  return up || down;
}

function PinDialog() {
  const ctx = useWin();
  const has = Boolean(ctx.doc.pin ?? "2468");
  const [cur, setCur] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [letters, setLetters] = useState(false);
  const [err, setErr] = useState("");
  const ok = () => {
    if (has && cur !== pinOf(ctx.doc)) return setErr("The PIN is incorrect. Try again.");
    if (!letters && !/^\d+$/.test(a)) return setErr("Your PIN can only contain numbers.");
    if (a.length < 4) return setErr("Your PIN must be at least 4 characters long.");
    if (!letters && weakPin(a)) return setErr("Your PIN can't be a common pattern, like 1234 or 1111. Try a different PIN.");
    if (a !== b) return setErr("The PINs don't match.");
    ctx.modal(null);
    ctx.cmd("acct.pin", a);
  };
  return (
    <Modal title="Windows Security" width={400} onClose={() => ctx.modal(null)} footer={<><Btn primary label="OK" onClick={ok}>OK</Btn><Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn></>}>
      <p className="mb-3 text-[16px]">{has ? "Change your PIN" : "Set up a PIN"}</p>
      <div className="flex flex-col gap-2">
        {has && <TextIn label="PIN" type="password" placeholder="PIN" value={cur} onChange={setCur} autoFocus />}
        <TextIn label="New PIN" type="password" placeholder="New PIN" value={a} onChange={setA} autoFocus={!has} />
        <TextIn label="Confirm PIN" type="password" placeholder="Confirm PIN" value={b} onChange={setB} onEnter={ok} />
        <label className="flex items-center gap-2 text-[12px]"><input type="checkbox" checked={letters} onChange={(e) => setLetters(e.target.checked)} aria-label="Include letters and symbols" /> Include letters and symbols</label>
        {err && <p className="text-[12px] text-[#c42b1c]">{err}</p>}
      </div>
    </Modal>
  );
}

function PasswordDialog() {
  const ctx = useWin();
  const [step, setStep] = useState(0);
  const [cur, setCur] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [hint, setHint] = useState("");
  const [err, setErr] = useState("");
  const next = () => {
    setErr("");
    if (step === 0) {
      if (!cur) return setErr("Enter your current password.");
      if (ctx.doc.password && cur !== ctx.doc.password) return setErr("The password is incorrect. Try again.");
      setStep(1);
      return;
    }
    if (step === 1) {
      if (!a) return setErr("Enter a new password.");
      if (a !== b) return setErr("The passwords you entered don't match.");
      if (hint && a && hint.toLowerCase().includes(a.toLowerCase())) return setErr("Your password hint can't contain your password.");
      setStep(2);
      return;
    }
    ctx.modal(null);
    ctx.cmd("acct.password", a);
  };
  return (
    <Modal title="Change your password" width={420} onClose={() => ctx.modal(null)} footer={<><Btn primary label={step === 2 ? "Finish" : "Next"} onClick={next}>{step === 2 ? "Finish" : "Next"}</Btn><Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn></>}>
      {step === 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[16px]">Verify your current password</p>
          <TextIn label="Current password" type="password" placeholder="Current password" value={cur} onChange={setCur} autoFocus onEnter={next} />
        </div>
      )}
      {step === 1 && (
        <div className="flex flex-col gap-2">
          <p className="text-[16px]">Change your password</p>
          <TextIn label="New password" type="password" placeholder="New password" value={a} onChange={setA} autoFocus />
          <TextIn label="Confirm password" type="password" placeholder="Confirm password" value={b} onChange={setB} />
          <TextIn label="Password hint" placeholder="Password hint" value={hint} onChange={setHint} onEnter={next} />
        </div>
      )}
      {step === 2 && <p>Next time you sign in, use your new password.</p>}
      {err && <p className="mt-2 text-[12px] text-[#c42b1c]">{err}</p>}
    </Modal>
  );
}

function AddDeviceDialog() {
  const ctx = useWin();
  const [stage, setStage] = useState<"kind" | "list" | "done">("kind");
  const [pick, setPick] = useState("");
  const btOn = S(ctx.doc, "bt") === "on";
  const nearby = ctx.doc.nearby ?? [];
  return (
    <Modal title="Add a device" width={440} onClose={() => ctx.modal(null)} footer={stage === "done" ? <Btn primary label="Done" onClick={() => ctx.modal(null)}>Done</Btn> : <Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn>}>
      {stage === "kind" && (
        <>
          <p className="mb-1 text-[16px]">Add a device</p>
          <p className="mb-3" style={{ color: T.sub }}>Choose the kind of device you want to add.</p>
          {[
            ["bluetooth", "Bluetooth", "Mice, keyboards, pens, or audio and other kinds of Bluetooth devices"],
            ["monitor", "Wireless display or dock", "Wireless monitors, TVs, or PCs that use Miracast, or wireless docks"],
            ["more", "Everything else", "Xbox controllers with Wireless Adapter, DLNA, and more"],
          ].map(([ic, t, d]) => (
            <button key={t} type="button" aria-label={t} onClick={() => setStage("list")} disabled={t !== "Bluetooth"} className="mb-1.5 flex w-full items-start gap-3 rounded p-3 text-left hover:bg-[var(--w-hover)] disabled:opacity-50" style={{ background: T.bg }}>
              <G n={ic} s={22} />
              <span><span className="block text-[13px]">{t}</span><span className="text-[11.5px]" style={{ color: T.sub }}>{d}</span></span>
            </button>
          ))}
        </>
      )}
      {stage === "list" && (
        <>
          <p className="mb-1 text-[16px]">Add a device</p>
          {!btOn ? (
            <p style={{ color: T.sub }}>Bluetooth is turned off. Turn on Bluetooth to find devices near you.</p>
          ) : (
            <>
              <p className="mb-3" style={{ color: T.sub }}>Make sure your device is turned on and discoverable. Select a device below to connect.</p>
              {nearby.length === 0 && <p className="text-[12px]" style={{ color: T.sub }}>Searching for devices...</p>}
              {nearby.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={n}
                  onClick={() => {
                    setPick(n);
                    setStage("done");
                    ctx.cmd("bt.add", n);
                  }}
                  className="mb-1.5 flex w-full items-center gap-3 rounded p-3 text-left hover:bg-[var(--w-hover)]"
                  style={{ background: T.bg }}
                >
                  <G n={/keyboard|k\d/i.test(n) ? "keyboard" : /mouse/i.test(n) ? "mouse" : /head|bud/i.test(n) ? "headset" : /phone/i.test(n) ? "phone" : "bluetooth"} s={22} />
                  <span className="text-[13px]">{n}</span>
                </button>
              ))}
            </>
          )}
        </>
      )}
      {stage === "done" && (
        <>
          <p className="mb-2 text-[16px]">Your device is ready to go!</p>
          <div className="flex items-center gap-3 rounded p-3" style={{ background: T.bg }}><G n="check" s={20} /> {pick} — Connected</div>
        </>
      )}
    </Modal>
  );
}

function Confirm({ title, text, yes, onYes }: { title: string; text: string; yes: string; onYes: () => void }) {
  const ctx = useWin();
  return (
    <Modal title={title} width={380} onClose={() => ctx.modal(null)} footer={<><Btn primary label={yes} onClick={() => { ctx.modal(null); onYes(); }}>{yes}</Btn><Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn></>}>
      <p>{text}</p>
    </Modal>
  );
}

function WifiKeyDialog({ ssid, keyNeeded }: { ssid: string; keyNeeded?: string }) {
  const ctx = useWin();
  const [k, setK] = useState("");
  const [err, setErr] = useState("");
  const go = () => {
    if (keyNeeded && k !== keyNeeded) return setErr("The network security key isn't correct. Please try again.");
    ctx.modal(null);
    ctx.cmd("net.connect", ssid);
  };
  return (
    <Modal title={ssid} width={360} onClose={() => ctx.modal(null)} footer={<><Btn primary label="Next" onClick={go}>Next</Btn><Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn></>}>
      <p className="mb-2">Enter the network security key</p>
      <TextIn label="Network security key" type="password" value={k} onChange={setK} onEnter={go} autoFocus width="100%" />
      {err && <p className="mt-2 text-[12px] text-[#c42b1c]">{err}</p>}
    </Modal>
  );
}

export function connectWifi(ctx: ReturnType<typeof useWin>, ssid: string) {
  const n = net(ctx.doc).networks.find((x) => x.ssid === ssid);
  if (n?.key) ctx.modal(<WifiKeyDialog ssid={ssid} keyNeeded={n.key} />);
  else ctx.cmd("net.connect", ssid);
}

function ScreenSaverDialog() {
  const ctx = useWin();
  const [s, setS] = useState(S(ctx.doc, "screensaver"));
  const [wait, setWait] = useState(S(ctx.doc, "screensaver.wait"));
  const [sec, setSec] = useState(S(ctx.doc, "screensaver.secure") === "on");
  const apply = () => {
    if (s !== S(ctx.doc, "screensaver")) ctx.cmd("settings.set", `screensaver=${s}`);
    if (wait !== S(ctx.doc, "screensaver.wait")) ctx.cmd("settings.set", `screensaver.wait=${wait}`);
    if (sec !== (S(ctx.doc, "screensaver.secure") === "on")) ctx.cmd("settings.set", `screensaver.secure=${sec ? "on" : "off"}`);
  };
  return (
    <Modal title="Screen Saver Settings" width={400} onClose={() => ctx.modal(null)} footer={<><Btn primary label="OK" onClick={() => { ctx.modal(null); apply(); }}>OK</Btn><Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn><Btn label="Apply" onClick={apply}>Apply</Btn></>}>
      <div className="mb-3 flex h-28 items-center justify-center rounded" style={{ background: "#222", color: "#ccc" }}>{s === "(None)" ? "" : s}</div>
      <div className="mb-2 flex items-center gap-2">
        <span className="w-24">Screen saver</span>
        <Select label="Screen saver" value={s} options={["(None)", "3D Text", "Blank", "Bubbles", "Mystify", "Photos", "Ribbons"]} onChange={setS} width={180} />
      </div>
      <div className="flex items-center gap-2">
        <span>Wait:</span>
        <input aria-label="Wait minutes" type="number" min={1} max={60} value={wait} onChange={(e) => setWait(e.target.value)} className="h-7 w-14 rounded px-1" style={{ background: T.input, border: `1px solid ${T.line}`, color: T.text }} />
        <span>minutes</span>
        <label className="ml-3 flex items-center gap-1.5"><input type="checkbox" checked={sec} onChange={(e) => setSec(e.target.checked)} aria-label="On resume, display logon screen" /> On resume, display logon screen</label>
      </div>
    </Modal>
  );
}

function DefaultAppDialog({ ext, current }: { ext: string; current: string }) {
  const ctx = useWin();
  const apps = useMemo(() => {
    const base = ["Microsoft Edge", "Word", "Notepad", "Photos", "Paint"];
    for (const a of ctx.doc.apps ?? []) if (!base.includes(a.name)) base.push(a.name);
    return base;
  }, [ctx.doc.apps]);
  const [pick, setPick] = useState(current);
  return (
    <Modal title={`Select a default app for ${ext} files`} width={400} onClose={() => ctx.modal(null)} footer={<><Btn primary label="Set default" onClick={() => { ctx.modal(null); if (pick !== current) ctx.cmd("settings.set", `default.${ext.replace(/^\./, "")}=${pick}`); }}>Set default</Btn><Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn></>}>
      {apps.map((a) => (
        <button key={a} type="button" aria-label={a} onClick={() => setPick(a)} className="mb-1 flex w-full items-center gap-3 rounded p-2.5 text-left hover:bg-[var(--w-hover)]" style={{ background: pick === a ? T.sel : undefined, outline: pick === a ? `1px solid ${T.selLine}` : undefined }}>
          <AppIcon id={a === "Microsoft Edge" ? "edge" : a === "Word" ? "word" : a === "Notepad" ? "notepad" : a === "Photos" ? "photos" : a === "Paint" ? "paint" : `webapp:${a}`} s={22} />
          <span className="text-[13px]">{a}</span>
        </button>
      ))}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

const DEFAULT_EXT: Record<string, string> = { ".pdf": "Microsoft Edge", ".htm": "Microsoft Edge", ".html": "Microsoft Edge", ".txt": "Notepad", ".docx": "Word", ".jpg": "Photos", ".png": "Photos", ".bmp": "Paint" };

function Page({ page }: { page: string }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const set = useSet();
  const sp = specs(doc);
  const n = net(doc);
  const cat = catOf(page);
  const catDef = SETTINGS_CATS.find((c) => c.id === cat);
  const links = (catDef?.pages ?? []).map((p) => <Lnk key={p.id} page={p.id} title={p.title} desc={p.desc} icon={catDef?.icon} />);
  const devs = devices(doc);
  const wifi = n.type === "wifi";
  const online = n.connected !== false && S(doc, "airplane") !== "on" && !(wifi && S(doc, "wifi") === "off");

  switch (page) {
    case "home":
      return (
        <>
          <Card>
            <div className="flex items-center gap-4 p-4">
              <div className="h-14 w-20 rounded" style={{ background: WALLPAPERS[S(doc, "wallpaper")] ?? WALLPAPERS.Bloom }} />
              <div className="flex-1">
                <div className="text-[15px] font-semibold">{sp.deviceName}</div>
                <div className="text-[12px]" style={{ color: T.sub }}>{sp.model}</div>
              </div>
              <div className="flex items-center gap-2 text-[12px]"><G n={wifi ? "wifi" : "ethernet"} s={16} /> {online ? (wifi ? n.ssid : "Ethernet") : "Not connected"}</div>
              <div className="flex items-center gap-2 text-[12px]"><G n="update" s={16} /> Windows Update</div>
            </div>
          </Card>
          <H>Recommended settings</H>
          <Lnk page="system/display" title="Display" desc="Monitors, brightness, night light" icon="system" />
          <Lnk page="system/sound" title="Sound" desc="Volume levels, output, input" icon="volume" />
          <Lnk page="bluetooth/printers" title="Printers & scanners" desc="Preferences, troubleshoot" icon="printer" />
          <Lnk page="accounts/signin" title="Sign-in options" desc="Windows Hello, PIN, password" icon="key" />
        </>
      );
    case "system":
      return (
        <>
          <Card>
            <div className="flex items-center gap-4 p-4">
              <div className="h-14 w-20 rounded" style={{ background: WALLPAPERS[S(doc, "wallpaper")] ?? WALLPAPERS.Bloom }} />
              <div className="flex-1">
                <div className="text-[15px] font-semibold">{sp.deviceName}</div>
                <div className="text-[12px]" style={{ color: T.sub }}>{sp.model}</div>
              </div>
            </div>
          </Card>
          {links}
        </>
      );
    case "system/display": {
      const two = (doc.displays ?? 1) >= 2;
      return (
        <>
          {two && (
            <Card>
              <div className="flex items-end justify-center gap-3 p-4">
                {[1, 2].map((d) => (
                  <div key={d} className="flex h-20 w-32 items-center justify-center rounded text-[22px] font-semibold" style={{ background: String(d) === S(doc, "display.main") ? T.accent : T.panel2, color: String(d) === S(doc, "display.main") ? T.accentText : T.text, border: `1px solid ${T.line}` }}>{d}</div>
                ))}
              </div>
              <Row title="Identify" desc="Show a number on each display" right={<Btn small label="Identify" onClick={() => ctx.cmd("display.identify")}>Identify</Btn>} />
              <Row title="Multiple displays" desc="Choose how the screens are shown" right={<Select label="Multiple displays" value={S(doc, "display.multi")} options={OPTIONS["display.multi"]} onChange={(v) => set("display.multi", v)} width={210} />} />
              <Row title="Make this my main display" desc="Display 2" right={<input type="checkbox" aria-label="Make this my main display" checked={S(doc, "display.main") === "2"} onChange={(e) => set("display.main", e.target.checked ? "2" : "1")} className="h-4 w-4" style={{ accentColor: "var(--w-accent)" }} />} />
            </Card>
          )}
          <H>Brightness & color</H>
          <Card>
            <Row icon="sun" title="Brightness" desc="Adjust the brightness of the built-in display" right={<Slider k="display.brightness" min={0} max={100} step={10} label="Brightness" />} />
          </Card>
          <Tog k="nightlight" title="Night light" desc="Use warmer colors to help block blue light" icon="moon" />
          <H>Scale & layout</H>
          <Sel k="display.scale" title="Scale" desc="Change the size of text, apps, and other items" icon="zoomIn" fmt={(v) => (v === "100%" ? "100% (Recommended)" : v)} />
          <Sel k="display.resolution" title="Display resolution" desc="Adjust the resolution to fit your connected display" icon="monitor" fmt={(v) => (v === "1920 × 1080" ? "1920 × 1080 (Recommended)" : v)} />
          <Sel k="display.orientation" title="Display orientation" icon="sync" />
          <Card>
            <Row icon="monitor" title="Multiple displays" desc="Choose the presentation mode for your displays" />
            <Row indent title="Detect other display" right={<Btn small label="Detect" onClick={() => ctx.cmd("display.detect")}>Detect</Btn>} />
            <Row indent title="Connect to a wireless display" right={<Btn small label="Connect">Connect</Btn>} />
          </Card>
          {ctx.doc.flags?.detected && !two && <p className="mt-1 text-[12px]" style={{ color: T.sub }}>We didn&apos;t find another display.</p>}
        </>
      );
    }
    case "system/sound": {
      const outs = ["Speakers (Realtek(R) Audio)", ...devs.filter((d) => d.connected && ["headset", "earbuds", "speaker"].includes(d.kind)).map((d) => (d.kind === "speaker" ? `Speaker (${d.name})` : `Headphones (${d.name})`)), ...((doc.displays ?? 1) >= 2 ? ["Monitor 2 (Intel(R) Display Audio)"] : [])];
      const ins = ["Microphone Array (Realtek(R) Audio)", ...devs.filter((d) => d.connected && ["headset", "earbuds", "camera"].includes(d.kind)).map((d) => `Headset Microphone (${d.name})`)];
      const muted = S(doc, "sound.mute") === "on";
      return (
        <>
          <H>Output</H>
          <Card>
            <Row icon="volume" title="Choose where to play sound" desc="Apps might have their own settings" />
            {outs.map((o) => (
              <Row key={o} indent label={o} title={<label className="flex items-center gap-2"><input type="radio" name="out" aria-label={o} checked={S(doc, "sound.output") === o} onChange={() => set("sound.output", o)} style={{ accentColor: "var(--w-accent)" }} />{o}</label>} />
            ))}
            <Row indent title="Volume" right={<><button type="button" aria-label={muted ? "Unmute" : "Mute"} onClick={() => set("sound.mute", muted ? "off" : "on")}><G n={muted ? "mute" : "volume"} s={16} /></button><Slider k="volume" min={0} max={100} step={10} label="Volume" /></>} />
          </Card>
          <H>Input</H>
          <Card>
            <Row icon="headset" title="Choose a device for speaking or recording" desc="Apps might have their own settings" />
            {ins.map((o) => (
              <Row key={o} indent label={o} title={<label className="flex items-center gap-2"><input type="radio" name="in" aria-label={o} checked={S(doc, "sound.input") === o} onChange={() => set("sound.input", o)} style={{ accentColor: "var(--w-accent)" }} />{o}</label>} />
            ))}
            <Row indent title="Test your microphone" right={<Btn small label="Start test">Start test</Btn>} />
          </Card>
          <H>Advanced</H>
          <Card>
            <Row icon="info" title="Troubleshoot common sound problems" right={<><Btn small label="Output devices" onClick={() => ctx.cmd("net.troubleshoot")}>Output devices</Btn><Btn small label="Input devices" onClick={() => ctx.cmd("net.troubleshoot")}>Input devices</Btn></>} />
            <Row icon="volume" title="Volume mixer" desc="App volume mix, app input and output devices" chevron />
          </Card>
        </>
      );
    }
    case "system/notifications":
      return (
        <>
          <Card>
            <Row icon="bell" title="Notifications" desc="Get notifications from apps and other senders" right={<Toggle label="Notifications" on={S(doc, "notifications.all") === "on"} onChange={(v) => set("notifications.all", v ? "on" : "off")} />} />
            <Check k="notifications.lock" label="Show notifications on the lock screen" />
            <Check k="notifications.sounds" label="Allow notifications to play sounds" />
          </Card>
          <Tog k="notifications.dnd" title="Do not disturb" desc="Notifications will go straight to the notification center" icon="bellOff" />
          <H>Notifications from apps and other senders</H>
          {["Microsoft Edge", "Outlook", "Microsoft Teams", "OneDrive", "Settings", "Windows Security"].map((a) => (
            <Card key={a}>
              <Row icon="app" title={a} desc="Banners, Sounds" right={<Toggle label={`${a} notifications`} on={S(doc, `notifications.app.${a}`) !== "off"} onChange={(v) => set(`notifications.app.${a}`, v ? "on" : "off")} />} />
            </Card>
          ))}
        </>
      );
    case "system/power":
      return (
        <>
          <H>Power</H>
          <Card>
            <Row icon="power" title="Screen, sleep, & hibernate timeouts" />
            <Row indent title="When plugged in, turn off my screen after" right={<Select label="Turn off my screen after" value={S(doc, "power.screen")} options={OPTIONS["power.screen"]} onChange={(v) => set("power.screen", v)} width={150} />} />
            <Row indent title="When plugged in, put my device to sleep after" right={<Select label="Put my device to sleep after" value={S(doc, "power.sleep")} options={OPTIONS["power.sleep"]} onChange={(v) => set("power.sleep", v)} width={150} />} />
          </Card>
          <Sel k="power.mode" title="Power mode" desc="Optimize your device based on power use and performance" icon="leaf" />
          <Tog k="energySaver" title="Energy saver" desc="Reduce power consumption and environmental impact" icon="leaf" />
        </>
      );
    case "system/storage": {
      const used = parseFloat(sp.storageUsed) || 186;
      const cap = parseFloat(sp.storage) || 477;
      return (
        <>
          <H>Local Disk (C:) - {sp.storage}</H>
          <Card>
            <div className="p-4">
              <div className="mb-1 flex justify-between text-[12px]"><span>{sp.storageUsed} used</span><span>{(cap - used).toFixed(0)} GB free</span></div>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: T.line }}><div className="h-full rounded-full" style={{ width: `${(used / cap) * 100}%`, background: T.accent }} /></div>
            </div>
            {[["Apps & features", "52.4 GB"], ["Temporary files", "4.21 GB"], ["Documents", "18.6 GB"], ["Other", "40.3 GB"], ["System & reserved", "31.1 GB"]].map(([a, b]) => (
              <Row key={a} indent title={a} right={<span className="text-[12px]" style={{ color: T.sub }}>{b}</span>} chevron />
            ))}
          </Card>
          <H>Storage management</H>
          <Tog k="storage.sense" title="Storage Sense" desc="Automatically free up space, delete temporary files, and manage locally available cloud content" icon="disk" />
          <H>Disks & volumes</H>
          <Card>
            <Row icon="disk" title={`Disk 0: ${sp.diskModel}`} desc={`${sp.diskType} · ${sp.storage}`} />
            {doc.fs.filter((r) => r.root === "usb").map((r) => <Row key={r.name} icon="usb" title={r.label ?? r.name} desc={`USB drive · ${r.capacity ?? ""}`} />)}
          </Card>
        </>
      );
    }
    case "system/multitasking":
      return (
        <>
          <Tog k="multitasking.snap" title="Snap windows" desc="Resize windows automatically when you drag them to the side or corners of the screen" icon="split" />
          <Card><Row icon="taskview" title="Desktops" desc="Show all open windows when I press Alt+Tab" /></Card>
          <Tog k="multitasking.shake" title="Title bar window shake" desc="When I grab a window's title bar and shake it, minimize all other windows" icon="app" />
        </>
      );
    case "system/clipboard":
      return (
        <>
          <Tog k="clipboard.history" title="Clipboard history" desc="Save multiple items to the clipboard to use later. Press the Windows logo key + V to view your clipboard history and paste from it." icon="clip" />
          <Tog k="clipboard.sync" title="Share across your devices" desc="Paste text on your other devices" icon="sync" />
          <Card><Row icon="delete" title="Clear clipboard data" desc="Clear everything (except pinned items)" right={<Btn small label="Clear">Clear</Btn>} /></Card>
        </>
      );
    case "system/about":
      return (
        <>
          <Card>
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-14 w-20 items-center justify-center rounded" style={{ background: WALLPAPERS[S(doc, "wallpaper")] ?? WALLPAPERS.Bloom }} />
              <div className="flex-1">
                <div className="text-[15px] font-semibold">{sp.deviceName}</div>
                <div className="text-[12px]" style={{ color: T.sub }}>{sp.model}</div>
              </div>
              <Btn label="Rename this PC">Rename this PC</Btn>
            </div>
          </Card>
          <Copyable
            title="Device specifications"
            rows={[
              ["Device name", sp.deviceName],
              ["Processor", sp.processor],
              ["Installed RAM", sp.ram],
              ["Storage", `${sp.storage} SSD ${sp.diskModel}`],
              ["Graphics card", `${sp.gpu} (${sp.gpuMemory})`],
              ["Device ID", sp.deviceId],
              ["Product ID", sp.productId],
              ["System type", sp.systemType],
              ["Pen and touch", sp.pen],
            ]}
          />
          <Card>
            <div className="flex flex-wrap gap-4 px-4 py-3 text-[12px]" style={{ color: T.accent }}>
              <span>Related links</span><span>Domain or workgroup</span><span>System protection</span><span>Advanced system settings</span>
            </div>
          </Card>
          <Copyable
            title="Windows specifications"
            rows={[
              ["Edition", sp.edition],
              ["Version", sp.version],
              ["Installed on", sp.installedOn],
              ["OS build", sp.osBuild],
              ["Experience", "Windows Feature Experience Pack 1000.26100.84.0"],
            ]}
          />
        </>
      );
    case "bluetooth":
    case "bluetooth/devices": {
      const btOn = S(doc, "bt") === "on";
      const removeDev = (name: string) => ctx.modal(<Confirm title="Remove device" text="Are you sure you want to remove this device?" yes="Yes" onYes={() => ctx.cmd("bt.remove", name)} />);
      return (
        <>
          <Card>
            <Row icon="bluetooth" title="Bluetooth" desc={btOn ? `Discoverable as "${sp.deviceName}"` : "Off"} right={<Toggle label="Bluetooth" on={btOn} onChange={(v) => set("bt", v ? "on" : "off")} />} />
          </Card>
          <Card>
            <Row icon="plus" title="Add device" desc="Bluetooth, Wireless display or dock, Everything else" right={<Btn primary label="Add device" onClick={() => ctx.modal(<AddDeviceDialog />)}>Add device</Btn>} />
          </Card>
          <H>Devices</H>
          {devs.map((d) => (
            <Card key={d.name}>
              <Row
                icon={d.kind === "keyboard" ? "keyboard" : d.kind === "mouse" ? "mouse" : ["headset", "earbuds"].includes(d.kind) ? "headset" : d.kind === "phone" ? "phone" : d.kind === "speaker" ? "speaker" : d.kind === "monitor" ? "monitor" : d.kind === "printer" ? "printer" : d.kind === "watch" ? "time" : d.kind === "camera" ? "eye" : "bluetooth"}
                title={d.name}
                desc={`${d.bt ? (d.connected && btOn ? "Connected" : "Paired") : d.connected ? "Connected" : "Not connected"}${d.battery && d.connected ? ` · ${d.battery}` : ""}`}
                right={
                  <button
                    type="button"
                    aria-label={`More options for ${d.name}`}
                    onClick={(e) =>
                      ctx.menu(e, [
                        d.bt ? (d.connected ? { label: "Disconnect", onClick: () => ctx.cmd("bt.disconnect", d.name) } : { label: "Connect", onClick: () => ctx.cmd("bt.connect", d.name) }) : { label: "Connected by cable", disabled: true },
                        { label: "Remove device", icon: "delete", onClick: () => removeDev(d.name) },
                      ])
                    }
                    className="rounded p-1.5 hover:bg-[var(--w-hover)]"
                  >
                    <G n="more" s={16} />
                  </button>
                }
              />
            </Card>
          ))}
          {page === "bluetooth" && (
            <>
              <H>More</H>
              <Lnk page="bluetooth/printers" title="Printers & scanners" desc="Preferences, troubleshoot" icon="printer" />
              <Lnk page="bluetooth/mouse" title="Mouse" desc="Buttons, mouse pointer speed, scrolling" icon="mouse" />
              <Lnk page="bluetooth/phone" title="Mobile devices" desc="Instantly access your mobile device" icon="phone" />
            </>
          )}
          {page === "bluetooth/devices" && <Tog k="bt.swiftPair" title="Show notifications to connect using Swift Pair" desc="Connect quickly to supported Bluetooth devices when they're close by" icon="bell" />}
        </>
      );
    }
    case "bluetooth/printers": {
      const list = printers(doc);
      const addable = String(doc.flags?.addable ?? "").split("|").filter(Boolean);
      return (
        <>
          <Card>
            <Row icon="plus" title="Add a printer or scanner" right={<Btn primary label="Add device" onClick={() => ctx.modal(<AddPrinterDialog addable={addable} />)}>Add device</Btn>} />
          </Card>
          {list.map((p) => (
            <Lnk key={p.name} page={`bluetooth/printers/${p.name}`} title={p.name} desc={[p.default ? "Default" : "", p.paused ? "Paused" : p.status ?? "Idle", (p.jobs ?? []).length ? `${(p.jobs ?? []).length} document(s) in queue` : ""].filter(Boolean).join(", ")} icon={p.kind === "scanner" ? "printer" : "printer"} />
          ))}
          <H>Printer preferences</H>
          <Tog k="printer.manage" title="Let Windows manage my default printer" desc="Windows will set your default printer to be the one you used most recently at your current location" icon="printer" />
          <Tog k="printer.metered" title="Download drivers and device software over metered connections" desc="Data charges may apply" icon="download" />
        </>
      );
    }
    case "bluetooth/mouse":
      return (
        <>
          <Sel k="mouse.primary" title="Primary mouse button" icon="mouse" width={120} />
          <Card><Row icon="mouse" title="Mouse pointer speed" right={<Slider k="mouse.speed" min={1} max={20} label="Mouse pointer speed" />} /></Card>
          <H>Scrolling</H>
          <Card>
            <Row icon="details" title="Roll the mouse wheel to scroll" right={<Select label="Roll the mouse wheel to scroll" value="Multiple lines at a time" options={["Multiple lines at a time", "One screen at a time"]} onChange={() => undefined} />} />
            <Row icon="details" title="Lines to scroll at a time" right={<Slider k="mouse.scrollLines" min={1} max={20} label="Lines to scroll at a time" />} />
          </Card>
          <Tog k="mouse.scrollInactive" title="Scroll inactive windows when hovering over them" icon="mouse" />
          <Lnk page="accessibility/pointer" title="Mouse pointer" desc="Mouse pointer color, size" icon="mouse" />
        </>
      );
    case "bluetooth/phone":
      return <Tog k="phone.link" title="Allow this PC to access your mobile devices" desc="Phone Link" icon="phone" />;
    case "network":
      return (
        <>
          <Card>
            <div className="flex items-center gap-4 p-4">
              <G n={online ? (wifi ? "wifi" : "ethernet") : "globeOff"} s={34} />
              <div className="flex-1">
                <div className="text-[15px] font-semibold">{online ? (wifi ? n.ssid : "Ethernet") : "Not connected"}</div>
                <div className="text-[12px]" style={{ color: T.sub }}>{online ? (wifi ? "Connected, secured" : "Connected") : "You aren't connected to any networks"}</div>
              </div>
              <Btn small label="Properties" onClick={() => ctx.cmd("settings.nav", wifi ? "network/wifi/props" : "network/ethernet")}>Properties</Btn>
              <Btn small label="Data usage">Data usage</Btn>
            </div>
          </Card>
          <Card>
            <Row icon="wifi" title="Wi-Fi" desc="Connect, manage known networks, metered network" right={<Toggle label="Wi-Fi" on={S(doc, "wifi") === "on"} onChange={(v) => set("wifi", v ? "on" : "off")} />} chevron onClick={() => ctx.cmd("settings.nav", "network/wifi")} />
          </Card>
          <Lnk page="network/ethernet" title="Ethernet" desc={wifi ? "Not connected" : "Authenticated, IP and DNS settings, metered network"} icon="ethernet" />
          <Lnk page="network/vpn" title="VPN" desc="Add, connect, manage" icon="vpn" right={n.vpns.some((v) => v.connected) ? <span className="text-[12px]" style={{ color: T.sub }}>Connected</span> : undefined} />
          <Card><Row icon="hotspot" title="Mobile hotspot" desc="Share your internet connection" right={<Toggle label="Mobile hotspot" on={false} onChange={() => undefined} />} /></Card>
          <Card><Row icon="airplane" title="Airplane mode" desc="Stop all wireless communication" right={<Toggle label="Airplane mode" on={S(doc, "airplane") === "on"} onChange={(v) => set("airplane", v ? "on" : "off")} />} chevron onClick={() => ctx.cmd("settings.nav", "network/airplane")} /></Card>
          <Lnk page="network/advanced" title="Advanced network settings" desc="View all network adapters, network reset" icon="gear" />
        </>
      );
    case "network/wifi": {
      const forgot = String(doc.flags?.forgot ?? "").split("|");
      return (
        <>
          <Card><Row icon="wifi" title="Wi-Fi" right={<Toggle label="Wi-Fi" on={S(doc, "wifi") === "on"} onChange={(v) => set("wifi", v ? "on" : "off")} />} /></Card>
          {wifi && online && <Lnk page="network/wifi/props" title={`${n.ssid} properties`} desc="Connected, secured" icon="wifi" />}
          <Card>
            <Row icon="wifi" title="Show available networks" />
            {S(doc, "wifi") === "on" &&
              n.networks.map((x) => {
                const cur = wifi && online && x.ssid === n.ssid;
                return (
                  <Row key={x.ssid} indent title={x.ssid} desc={cur ? "Connected, secured" : x.secure === false ? "Open" : "Secured"} right={cur ? <Btn small label={`Disconnect ${x.ssid}`} onClick={() => ctx.cmd("net.disconnect", x.ssid)}>Disconnect</Btn> : <Btn small label={`Connect ${x.ssid}`} onClick={() => connectWifi(ctx, x.ssid)}>Connect</Btn>} />
                );
              })}
          </Card>
          <Lnk page="network/wifi/props" title="Hardware properties" desc="View and manage Wi-Fi adapter properties" icon="properties" />
          <Card>
            <Row icon="details" title="Manage known networks" desc="Add, remove, and edit networks" />
            {n.networks.filter((x) => !forgot.includes(x.ssid)).slice(0, 4).map((x) => (
              <Row key={x.ssid} indent title={x.ssid} right={<Btn small label={`Forget ${x.ssid}`} onClick={() => ctx.cmd("net.forget", x.ssid)}>Forget</Btn>} />
            ))}
          </Card>
          <Tog k="wifi.random" title="Random hardware addresses" desc="Help prevent others from tracking your device location" icon="shield" />
        </>
      );
    }
    case "network/wifi/props":
    case "network/ethernet": {
      const isWifi = page === "network/wifi/props";
      const rows: [string, string][] = isWifi
        ? [["SSID", n.ssid], ["Protocol", "Wi-Fi 6 (802.11ax)"], ["Security type", "WPA2-Personal"], ["Network band", "5 GHz"], ["Network channel", "44"], ["Link speed (Receive/Transmit)", "1201/1201 (Mbps)"], ["IPv4 address", n.ip], ["IPv4 DNS servers", n.dns], ["Manufacturer", "Intel Corporation"], ["Description", "Intel(R) Wi-Fi 6E AX211 160MHz"], ["Physical address (MAC)", n.mac]]
        : [["Link speed (Receive/Transmit)", n.linkSpeed], ["IPv6 address", "fe80::4c1a:7d2e:9b3f:12a8%12"], ["IPv4 address", n.ip], ["IPv4 default gateway", n.gateway], ["IPv4 DNS servers", n.dns], ["Manufacturer", "Intel"], ["Description", "Intel(R) Ethernet Connection (17) I219-LM"], ["Driver version", "12.19.2.45"], ["Physical address (MAC)", n.mac]];
      const connected = isWifi ? wifi && online : !wifi && n.connected !== false;
      return (
        <>
          <Card><Row icon={isWifi ? "wifi" : "ethernet"} title={isWifi ? n.ssid : "Ethernet"} desc={connected ? "Connected" : "Not connected"} /></Card>
          <H>Network profile type</H>
          <Card>
            {["Public", "Private"].map((p) => (
              <Row key={p} indent label={p} title={<label className="flex items-center gap-2"><input type="radio" name="profile" aria-label={`${p} network`} checked={S(doc, "net.profile") === p} onChange={() => set("net.profile", p)} style={{ accentColor: "var(--w-accent)" }} />{p} network{p === "Public" ? " (Recommended)" : ""}</label>} desc={p === "Public" ? "Your device is not discoverable on the network. Use this in most cases: when connected to a network at home, work, or in a public place." : "Your device is discoverable on the network. Select this if you need file sharing or use apps that communicate over this network. You should know and trust the people and devices on the network."} />
            ))}
          </Card>
          <Tog k="net.metered" title="Metered connection" desc="Some apps might work differently to reduce data usage when you're connected to this network" icon="chart" />
          <Card>
            <Row title="IP assignment:" desc="Automatic (DHCP)" right={<Btn small label="Edit IP assignment">Edit</Btn>} />
            <Row title="DNS server assignment:" desc="Automatic (DHCP)" right={<Btn small label="Edit DNS server assignment">Edit</Btn>} />
          </Card>
          <Copyable title={isWifi ? "Wi-Fi properties" : "Ethernet properties"} rows={rows} />
        </>
      );
    }
    case "network/vpn":
      return (
        <>
          <Card><Row icon="vpn" title="VPN connections" right={<Btn label="Add VPN">Add VPN</Btn>} /></Card>
          {n.vpns.length === 0 && <p className="px-1 text-[12px]" style={{ color: T.sub }}>No VPN connections are set up on this PC.</p>}
          {n.vpns.map((v) => (
            <Card key={v.name}>
              <Row icon="vpn" title={v.name} desc={v.connected ? "Connected" : v.server} right={v.connected ? <Btn small label={`Disconnect ${v.name}`} onClick={() => ctx.cmd("net.vpnOff", v.name)}>Disconnect</Btn> : <Btn small primary label={`Connect ${v.name}`} onClick={() => ctx.cmd("net.vpn", v.name)}>Connect</Btn>} />
            </Card>
          ))}
          <H>Advanced settings for all VPN connections</H>
          <Tog k="vpn.metered" title="Allow VPN over metered networks" icon="vpn" />
          <Tog k="vpn.roaming" title="Allow VPN while roaming" icon="vpn" />
        </>
      );
    case "network/airplane":
      return (
        <>
          <Tog k="airplane" title="Airplane mode" desc="Stop all wireless communication" icon="airplane" />
          <H>Wireless devices</H>
          <Tog k="wifi" title="Wi-Fi" icon="wifi" />
          <Tog k="bt" title="Bluetooth" icon="bluetooth" />
        </>
      );
    case "network/advanced":
      return (
        <>
          <H>Network adapters</H>
          <Card>
            <Row icon="ethernet" title="Ethernet" desc="Intel(R) Ethernet Connection (17) I219-LM" right={<Btn small label="Disable Ethernet">Disable</Btn>} />
            <Row icon="wifi" title="Wi-Fi" desc="Intel(R) Wi-Fi 6E AX211 160MHz" right={<Btn small label="Disable Wi-Fi">Disable</Btn>} />
          </Card>
          <H>More settings</H>
          <Lnk page={wifi ? "network/wifi/props" : "network/ethernet"} title="Hardware and connection properties" icon="properties" />
          <Card><Row icon="sync" title="Network reset" desc="Reset all network adapters to factory settings" chevron /></Card>
        </>
      );
    case "personalization":
      return (
        <>
          <div className="mb-3 h-32 rounded-lg" style={{ background: WALLPAPERS[S(doc, "wallpaper")] ?? WALLPAPERS.Bloom }} />
          {links}
        </>
      );
    case "personalization/background":
      return (
        <>
          <div className="mb-3 h-36 rounded-lg" style={{ background: WALLPAPERS[S(doc, "wallpaper")] ?? WALLPAPERS.Bloom }} />
          <Card>
            <Row icon="pictures" title="Personalize your background" right={<Select label="Personalize your background" value="Picture" options={["Picture", "Solid color", "Slideshow", "Windows spotlight"]} onChange={() => undefined} width={160} />} />
            <Row indent title="Recent images" />
            <div className="flex flex-wrap gap-2 px-4 pb-4 pl-[52px]">
              {Object.keys(WALLPAPERS).map((wp) => (
                <button key={wp} type="button" aria-label={wp} title={wp} onClick={() => wp !== S(doc, "wallpaper") && set("wallpaper", wp)} className="h-14 w-24 rounded" style={{ background: WALLPAPERS[wp], outline: wp === S(doc, "wallpaper") ? `2px solid ${T.accent}` : undefined, outlineOffset: 2 }} />
              ))}
            </div>
          </Card>
        </>
      );
    case "personalization/colors":
      return (
        <>
          <Sel k="theme" title="Choose your mode" desc="Change the colors that appear in Windows and your apps" icon="personalization" width={140} />
          <Tog k="transparency" title="Transparency effects" desc="Windows and surfaces appear translucent" icon="app" />
          <Card><Row icon="personalization" title="Accent color" right={<Select label="Accent color" value="Manual" options={["Manual", "Automatic"]} onChange={() => undefined} width={120} />} /></Card>
        </>
      );
    case "personalization/lockscreen":
      return (
        <>
          <Card><Row icon="pictures" title="Personalize your lock screen" right={<Select label="Personalize your lock screen" value="Windows spotlight" options={["Windows spotlight", "Picture", "Slideshow"]} onChange={() => undefined} width={170} />} /></Card>
          <Tog k="lockscreen.signin" title="Show the lock screen background picture on the sign-in screen" icon="lock" />
          <H>Related settings</H>
          <Lnk page="system/power" title="Screen timeout" icon="power" />
          <Card><Row icon="monitor" title="Screen saver" chevron onClick={() => ctx.modal(<ScreenSaverDialog />)} /></Card>
        </>
      );
    case "personalization/start":
      return (
        <>
          <Tog k="start.recentApps" title="Show recently added apps" icon="apps" />
          <Tog k="start.recent" title="Show recommended files in Start, recent files in File Explorer, and items in Jump Lists" icon="history" />
          <Tog k="start.tips" title="Show recommendations for tips, shortcuts, new apps, and more" icon="info" />
        </>
      );
    case "personalization/taskbar":
      return (
        <>
          <H>Taskbar items</H>
          <Sel k="taskbar.search" title="Search" icon="search" width={190} />
          <Tog k="taskbar.taskview" title="Task view" icon="taskview" />
          <Tog k="taskbar.widgets" title="Widgets" icon="widgets" />
          <H>Taskbar behaviors</H>
          <Sel k="taskbar.align" title="Taskbar alignment" icon="details" width={120} />
          <Tog k="taskbar.autohide" title="Automatically hide the taskbar" icon="app" />
        </>
      );
    case "apps":
      return <>{links}</>;
    case "apps/installed":
      return <InstalledApps />;
    case "apps/default":
      return <DefaultApps />;
    case "apps/startup": {
      const list = startupApps(doc);
      return (
        <>
          <p className="mb-3 text-[12px]" style={{ color: T.sub }}>Apps can be configured to start when you log in. In most cases, they&apos;ll start minimized or might only start a background task.</p>
          {list.map((a) => (
            <Card key={a.name}>
              <Row
                icon="app"
                title={a.name}
                desc={<span>{a.publisher}<br /><span style={{ color: a.impact === "High" ? "#c42b1c" : T.sub }}>{a.impact === "Not measured" || !a.impact ? "Not measured" : `${a.impact} impact`}</span></span>}
                right={
                  <Toggle
                    label={a.name}
                    on={a.on}
                    onChange={(v) => {
                      ctx.select(`startup:${a.name}`);
                      ctx.cmd(v ? "startup.enable" : "startup.disable");
                    }}
                  />
                }
              />
            </Card>
          ))}
        </>
      );
    }
    case "accounts":
    case "accounts/info":
      return (
        <>
          <Card>
            <div className="flex items-center gap-4 p-4">
              <Avatar name={userName(doc)} s={64} />
              <div>
                <div className="text-[16px] font-semibold">{userName(doc)}</div>
                <div className="text-[12px]" style={{ color: T.sub }}>{doc.user?.email ?? "Local account"}</div>
                <div className="text-[12px]" style={{ color: T.sub }}>Administrator</div>
              </div>
            </div>
          </Card>
          {page === "accounts" ? links : <Lnk page="accounts/email" title="Accounts" desc="Manage my accounts" icon="accounts" />}
        </>
      );
    case "accounts/signin": {
      const hasPin = Boolean(pinOf(doc));
      return (
        <>
          <H>Ways to sign in</H>
          <Card>
            <Row icon="face" title="Facial recognition (Windows Hello)" desc="This option is currently unavailable" right={<Btn small disabled label="Set up face">Set up</Btn>} />
          </Card>
          <Card>
            <Row icon="fingerprint" title="Fingerprint recognition (Windows Hello)" desc="This option is currently unavailable" right={<Btn small disabled label="Set up fingerprint">Set up</Btn>} />
          </Card>
          <Card>
            <Row icon="key" title="PIN (Windows Hello)" desc="Sign in with a PIN (Recommended)" right={hasPin ? <Btn small label="Change PIN" onClick={() => ctx.modal(<PinDialog />)}>Change PIN</Btn> : <Btn small label="Set up PIN" onClick={() => ctx.modal(<PinDialog />)}>Set up</Btn>} />
          </Card>
          <Card><Row icon="key" title="Security key" desc="Sign in with a physical security key" right={<Btn small label="Manage security key">Manage</Btn>} /></Card>
          <Card><Row icon="lock" title="Password" desc="Sign in with your account's password" right={<Btn small label="Change password" onClick={() => ctx.modal(<PasswordDialog />)}>Change</Btn>} /></Card>
          <H>Additional settings</H>
          <Tog k="signin.helloOnly" title="For improved security, only allow Windows Hello sign-in for Microsoft accounts on this device" icon="shield" />
          <Sel k="signin.away" title="If you've been away, when should Windows require you to sign in again?" icon="time" width={220} />
          <Card>
            <Row icon="lock" title="Dynamic lock" desc="Automatically lock your device when you're away" />
            <Check k="signin.dynamic" label="Allow Windows to automatically lock your device when you're away" />
          </Card>
          <Tog k="signin.showEmail" title="Show account details such as my email address on the sign-in screen" icon="mail" />
        </>
      );
    }
    case "accounts/email":
      return (
        <>
          <Card><Row icon="mail" title={doc.user?.email ?? `${userName(doc).split(" ")[0].toLowerCase()}@outlook.com`} desc={doc.user?.org ? `Work or school account · ${doc.user.org}` : "Microsoft account"} /></Card>
          <Card><Row icon="plus" title="Add a work or school account" right={<Btn small label="Add account">Add account</Btn>} /></Card>
        </>
      );
    case "accounts/backup":
      return (
        <>
          <H>OneDrive folder syncing</H>
          <Card>
            <Row icon="cloud" title="Back up these folders to OneDrive" desc="Your files will be available on all your devices" />
            {[["desktop", "Desktop"], ["documents", "Documents"], ["pictures", "Pictures"]].map(([k, l]) => (
              <Row key={k} indent title={l} right={<Toggle label={`Back up ${l}`} on={S(doc, `od.backup.${k}`) === "on"} onChange={(v) => set(`od.backup.${k}`, v ? "on" : "off")} />} />
            ))}
          </Card>
          <Tog k="backup.apps" title="Remember my apps" icon="apps" />
          <Tog k="backup.prefs" title="Remember my preferences" icon="gear" />
        </>
      );
    case "time":
    case "time/datetime":
      return page === "time" ? (
        <>{links}</>
      ) : (
        <>
          <Card><Row title={<span className="text-[22px] font-semibold">{NOW.time}</span>} desc={NOW.long} /></Card>
          <Tog k="time.auto" title="Set time automatically" icon="time" />
          <Tog k="time.autoZone" title="Set time zone automatically" icon="globe" />
          <Sel k="time.zone" title="Time zone" icon="globe" width={260} />
          <Tog k="time.dst" title="Adjust for daylight saving time automatically" icon="sun" />
          <Card><Row icon="sync" title="Sync now" desc="Last successful time synchronization: 10/20/2026 8:02:16 AM" right={<Btn small label="Sync now">Sync now</Btn>} /></Card>
        </>
      );
    case "time/language":
      return (
        <>
          <Sel k="time.language" title="Windows display language" desc="Windows features like Settings and File Explorer will appear in this language" icon="globe" width={210} />
          <H>Region</H>
          <Sel k="time.region" title="Country or region" desc="Windows and apps might use your country or region to give you local content" icon="globe" width={190} />
          <Card><Row icon="calendar" title="Regional format" desc="Windows and some apps format dates and times based on your regional format" right={<Select label="Regional format" value="English (United States)" options={["English (United States)", "Spanish (United States)"]} onChange={() => undefined} />} /></Card>
        </>
      );
    case "gaming":
    case "gaming/gamemode":
      return <Tog k="gaming.mode" title="Game Mode" desc="Optimize your PC for play by turning things off in the background" icon="gaming" />;
    case "accessibility":
      return (
        <>
          <H>Vision</H>
          {links}
        </>
      );
    case "accessibility/textsize":
      return <TextSizePage />;
    case "accessibility/pointer":
      return (
        <>
          <Card>
            <Row icon="mouse" title="Mouse pointer style" />
            <div className="flex gap-2 px-4 pb-4 pl-[52px]">
              {OPTIONS["access.pointerStyle"].map((p) => (
                <button key={p} type="button" aria-label={`${p} pointer`} title={p} onClick={() => p !== S(doc, "access.pointerStyle") && set("access.pointerStyle", p)} className="flex h-12 w-12 items-center justify-center rounded text-[18px]" style={{ background: p === "Black" ? "#fff" : p === "Inverted" ? "#888" : "#222", color: p === "Black" ? "#000" : "#fff", outline: p === S(doc, "access.pointerStyle") ? `2px solid ${T.accent}` : `1px solid ${T.line}` }}>
                  ➤
                </button>
              ))}
            </div>
            <Row indent title="Size" right={<Slider k="access.pointerSize" min={1} max={15} label="Mouse pointer size" />} />
          </Card>
          <Tog k="access.textCursor" title="Text cursor indicator" icon="edit" />
        </>
      );
    case "accessibility/magnifier":
      return (
        <>
          <Tog k="access.magnifier" title="Magnifier" desc="Windows logo key + Plus (+) to turn on, Windows logo key + Esc to turn off" icon="zoomIn" />
          <Card><Row icon="zoomIn" title="Zoom level" right={<span>200%</span>} /></Card>
        </>
      );
    case "accessibility/colorfilters":
      return (
        <>
          <Tog k="access.colorFilters" title="Color filters" desc="Change colors to help with color blindness or light sensitivity" icon="personalization" />
          <Card>
            {["Red-green (green weak, deuteranopia)", "Red-green (red weak, protanopia)", "Blue-yellow (tritanopia)", "Grayscale", "Grayscale inverted", "Inverted"].map((f) => (
              <Row key={f} indent label={f} title={<label className="flex items-center gap-2"><input type="radio" name="cf" aria-label={f} checked={S(doc, "access.colorFilter") === f} onChange={() => set("access.colorFilter", f)} style={{ accentColor: "var(--w-accent)" }} />{f}</label>} />
            ))}
          </Card>
        </>
      );
    case "accessibility/contrast":
      return <ContrastPage />;
    case "accessibility/narrator":
      return <Tog k="access.narrator" title="Narrator" desc="Windows logo key + Ctrl + Enter to turn on or off" icon="volume" />;
    case "privacy":
      return (
        <>
          <H>Security</H>
          {links.slice(0, 3)}
          <H>App permissions</H>
          {links.slice(3)}
        </>
      );
    case "privacy/security":
      return (
        <>
          <p className="mb-3 text-[12.5px]" style={{ color: T.sub }}>Windows Security is your home to view and manage the security and health of your device.</p>
          <Btn primary label="Open Windows Security" onClick={() => ctx.cmd("win.open", "security")}>Open Windows Security</Btn>
          <H>Protection areas</H>
          {[
            ["virus", "Virus & threat protection", "shield"],
            ["account", "Account protection", "accounts"],
            ["firewall", "Firewall & network protection", "firewall"],
            ["browser", "App & browser control", "app"],
            ["device", "Device security", "chip"],
            ["health", "Device performance & health", "heart"],
            ["family", "Family options", "family"],
          ].map(([id, t, ic]) => (
            <Card key={id}>
              <Row icon={ic} title={t} desc={secStatus(ctx.doc, id)} chevron onClick={() => ctx.cmd("sec.nav", id)} />
            </Card>
          ))}
        </>
      );
    case "privacy/encryption":
      return (
        <>
          <Tog k="privacy.encryption" title="Device encryption" desc="Helps protect the data on your device from unauthorized access in the event that it's lost or stolen" icon="lock" />
          <Card><Row icon="lock" title="BitLocker drive encryption" chevron /></Card>
        </>
      );
    case "privacy/finddevice":
      return <Tog k="privacy.findDevice" title="Find my device" desc="Use location to help find your device if it's lost" icon="globe" />;
    case "privacy/location":
      return (
        <>
          <Tog k="privacy.location" title="Location services" desc="Determines whether any services can use your device's location" icon="globe" />
          <Tog k="privacy.location.apps" title="Let apps access your location" icon="apps" />
        </>
      );
    case "privacy/camera":
    case "privacy/microphone": {
      const base = page === "privacy/camera" ? "privacy.camera" : "privacy.mic";
      const what = page === "privacy/camera" ? "camera" : "microphone";
      return (
        <>
          <Tog k={base} title={`${what === "camera" ? "Camera" : "Microphone"} access`} desc={`Anyone using this device can choose if their apps have ${what} access`} icon={what === "camera" ? "eye" : "headset"} />
          <H>Let apps access your {what}</H>
          {["Camera", "Microsoft Teams", "Microsoft Edge", "Zoom Workplace"].filter((a) => what === "camera" || a !== "Camera").map((a) => (
            <Card key={a}><Row icon="app" title={a} right={<Toggle label={`${a} ${what} access`} on={S(doc, `${base}.${a}`) !== "off"} onChange={(v) => set(`${base}.${a}`, v ? "on" : "off")} />} /></Card>
          ))}
        </>
      );
    }
    case "update":
      return <UpdatePage />;
    case "update/advanced":
      return (
        <>
          <Tog k="update.otherProducts" title="Receive updates for other Microsoft products" desc="Get Microsoft Office and other updates together with Windows updates" icon="update" />
          <Tog k="update.asap" title="Get me up to date" desc="Restart as soon as possible (even during active hours) to finish updating" icon="sync" />
          <Tog k="update.metered" title="Download updates over metered connections" desc="Data charges may apply" icon="download" />
          <Tog k="update.notifyRestart" title="Notify me when a restart is required to finish updating" desc="Show a notification when your device requires a restart to finish updating" icon="bell" />
          <Sel k="update.activeHours" title="Active hours" desc="We won't restart your device during these hours" icon="time" options={["Automatically", "8:00 AM to 5:00 PM", "7:00 AM to 7:00 PM", "9:00 AM to 6:00 PM"]} width={190} />
        </>
      );
    case "update/history":
      return (
        <>
          <H>Quality Updates (2)</H>
          <Card>
            <Row title="2026-10 Cumulative Update for Windows 11 Version 24H2 for x64-based Systems (KB5066835)" desc="Successfully installed on 10/14/2026" />
            <Row title="2026-09 Cumulative Update for Windows 11 Version 24H2 for x64-based Systems (KB5065426)" desc="Successfully installed on 9/9/2026" />
          </Card>
          <H>Definition Updates (1)</H>
          <Card><Row title="Security Intelligence Update for Microsoft Defender Antivirus - KB2267602 (Version 1.439.118.0)" desc="Successfully installed on 10/19/2026" /></Card>
          <H>Driver Updates (1)</H>
          <Card><Row title="Intel - Display - 31.0.101.5592" desc="Successfully installed on 8/26/2026" /></Card>
        </>
      );
  }
  if (page.startsWith("bluetooth/printers/")) return <PrinterPage name={page.slice(19)} />;
  if (page.startsWith("apps/default/")) return <DefaultAppPage app={page.slice(13)} />;
  return <>{links}</>;
}

export function secStatus(doc: ReturnType<typeof useWin>["doc"], id: string): string {
  const active = (doc.security?.threats ?? []).some((t) => !t.status || t.status === "Active");
  if (id === "virus") return S(doc, "sec.realtime") !== "on" ? "Real-time protection is off. Action recommended." : active && doc.security?.scanned ? "Threats found. Start the recommended actions." : "No actions needed.";
  if (id === "firewall") return ["domain", "private", "public"].some((k) => S(doc, `sec.firewall.${k}`) !== "on") ? "Firewall is off. Action recommended." : "No actions needed.";
  if (id === "browser") return S(doc, "sec.smartscreen") !== "on" ? "Reputation-based protection is off." : "No actions needed.";
  if (id === "account") return pinOf(doc) ? "No actions needed." : "Set up Windows Hello for faster, more secure sign-in.";
  return id === "family" ? "Manage how your family uses their devices." : "View status and manage settings.";
}

function TextSizePage() {
  const ctx = useWin();
  const cur = parseInt(S(ctx.doc, "access.textSize"), 10) || 100;
  const [v, setV] = useState(cur);
  useEffect(() => setV(cur), [cur]);
  return (
    <>
      <Card>
        <div className="p-4">
          <div className="mb-1 text-[12px]" style={{ color: T.sub }}>Text size preview</div>
          <div className="rounded p-4" style={{ background: T.panel2, fontSize: 12 * (v / 100) }}>Drag the slider until the text here is easy to read</div>
        </div>
        <Row
          icon="details"
          title="Text size"
          right={
            <>
              <input type="range" aria-label="Text size" min={100} max={225} step={5} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-44" style={{ accentColor: "var(--w-accent)" }} />
              <span className="w-10 text-right text-[12px]">{v}%</span>
              <Btn primary label="Apply" disabled={v === cur} onClick={() => ctx.cmd("settings.set", `access.textSize=${v}%`)}>Apply</Btn>
            </>
          }
        />
      </Card>
    </>
  );
}

function ContrastPage() {
  const ctx = useWin();
  const [v, setV] = useState(S(ctx.doc, "access.contrast"));
  return (
    <Card>
      <Row
        icon="personalization"
        title="Contrast themes"
        desc="Color themes for low vision, light sensitivity"
        right={
          <>
            <Select label="Contrast themes" value={v} options={OPTIONS["access.contrast"]} onChange={setV} width={140} />
            <Btn primary label="Apply" disabled={v === S(ctx.doc, "access.contrast")} onClick={() => ctx.cmd("settings.set", `access.contrast=${v}`)}>Apply</Btn>
          </>
        }
      />
    </Card>
  );
}

function AddPrinterDialog({ addable }: { addable: string[] }) {
  const ctx = useWin();
  return (
    <Modal title="Add a printer or scanner" width={420} onClose={() => ctx.modal(null)} footer={<Btn label="Close" onClick={() => ctx.modal(null)}>Close</Btn>}>
      {addable.length === 0 ? <p style={{ color: T.sub }}>Searching for printers and scanners... No new devices were found.</p> : <p className="mb-2" style={{ color: T.sub }}>These devices were found on your network.</p>}
      {addable.map((a) => (
        <div key={a} className="mb-1.5 flex items-center gap-3 rounded p-3" style={{ background: T.bg }}>
          <G n="printer" s={20} />
          <span className="flex-1">{a}</span>
          <Btn small primary label={`Add ${a}`} onClick={() => { ctx.modal(null); ctx.cmd("printer.add", a); }}>Add device</Btn>
        </div>
      ))}
      <p className="mt-2 text-[12px]" style={{ color: T.accent }}>The printer that I want isn&apos;t listed</p>
    </Modal>
  );
}

function PrinterPage({ name }: { name: string }) {
  const ctx = useWin();
  const p = printers(ctx.doc).find((x) => x.name === name);
  if (!p) return <p>This device was removed.</p>;
  const manage = S(ctx.doc, "printer.manage") === "on";
  return (
    <>
      <Card>
        <div className="flex items-center gap-4 p-4">
          <G n="printer" s={40} />
          <div className="flex-1">
            <div className="text-[15px] font-semibold">{p.name}</div>
            <div className="text-[12px]" style={{ color: T.sub }}>Printer status: {p.paused ? "Paused" : p.status ?? "Idle"}{p.default ? " · Default" : ""}</div>
          </div>
          {!manage && !p.default && <Btn label="Set as default" onClick={() => ctx.cmd("printer.default", p.name)}>Set as default</Btn>}
          <Btn label="Remove" onClick={() => ctx.modal(<Confirm title="Remove device" text="Are you sure you want to remove this device?" yes="Yes" onYes={() => { ctx.cmd("printer.remove", p.name); ctx.cmd("settings.nav", "bluetooth/printers"); }} />)}>Remove</Btn>
        </div>
      </Card>
      {manage && <p className="mb-2 px-1 text-[11.5px]" style={{ color: T.sub }}>Windows is managing your default printer. To choose one yourself, turn off &quot;Let Windows manage my default printer&quot; on the Printers &amp; scanners page.</p>}
      <H>Printer settings</H>
      <Card><Row icon="details" title="Open print queue" chevron onClick={() => ctx.cmd("printer.queue", p.name)} /></Card>
      <Card><Row icon="print" title="Print test page" chevron onClick={() => ctx.cmd("printer.testPage", p.name)} /></Card>
      <Card><Row icon="info" title="Run the troubleshooter" chevron onClick={() => ctx.cmd("net.troubleshoot")} /></Card>
      <Card><Row icon="properties" title="Printer properties" chevron /></Card>
      <Card><Row icon="gear" title="Printing preferences" desc="Orientation, page order, pages per sheet, borders, paper source" chevron /></Card>
      <Card><Row icon="properties" title="Hardware properties" chevron /></Card>
    </>
  );
}

function InstalledApps() {
  const ctx = useWin();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("Name (A to Z)");
  const all = installedApps(ctx.doc);
  let list = all.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
  if (sort === "Name (Z to A)") list = list.slice().reverse();
  if (sort === "Install date") list = list.slice().sort((a, b) => (Date.parse(b.installed ?? "") || 0) - (Date.parse(a.installed ?? "") || 0));
  const uninstall = (name: string) => ctx.modal(<Confirm title="Uninstall" text={`${name} and its related info will be uninstalled.`} yes="Uninstall" onYes={() => ctx.cmd("app.uninstall", name)} />);
  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <TextIn label="Search apps" placeholder="Search apps" value={q} onChange={setQ} width={240} />
        <span className="flex-1" />
        <span className="text-[12px]">Sort by:</span>
        <Select label="Sort by" value={sort} options={["Name (A to Z)", "Name (Z to A)", "Install date"]} onChange={setSort} width={150} />
      </div>
      <p className="mb-2 text-[12px]" style={{ color: T.sub }}>{list.length} apps found</p>
      {list.map((a) => (
        <Card key={a.name}>
          <Row
            icon="app"
            title={a.name}
            desc={[a.version, a.publisher, a.installed].filter(Boolean).join("  |  ")}
            right={
              <>
                <span className="text-[12px]" style={{ color: T.sub }}>{a.size}</span>
                <button
                  type="button"
                  aria-label={`More options for ${a.name}`}
                  onClick={(e) => ctx.menu(e, [{ label: "Advanced options", disabled: true }, { label: "Move", disabled: true }, { label: "Modify", disabled: true }, { label: "Uninstall", disabled: a.name === "Windows Security" || a.name === "Microsoft Edge", onClick: () => uninstall(a.name) }])}
                  className="rounded p-1.5 hover:bg-[var(--w-hover)]"
                >
                  <G n="more" s={16} />
                </button>
              </>
            }
          />
        </Card>
      ))}
    </>
  );
}

function DefaultApps() {
  const ctx = useWin();
  const [q, setQ] = useState("");
  const ext = q.trim().startsWith(".") ? q.trim().toLowerCase() : "";
  const cur = ext ? S(ctx.doc, `default.${ext.slice(1)}`) || DEFAULT_EXT[ext] || "Choose a default" : "";
  const apps = ["Microsoft Edge", "Notepad", "Photos", "Word", "Excel", "PowerPoint", "Paint", ...(ctx.doc.apps ?? []).map((a) => a.name)];
  return (
    <>
      <Card>
        <Row icon="search" title="Set a default for a file type or link type" right={<TextIn label="Enter a file type or link type" placeholder="Enter a file type or link type" value={q} onChange={setQ} width={220} />} />
        {ext && <Row indent title={ext} desc="" right={<button type="button" aria-label={`Default app for ${ext}`} onClick={() => ctx.modal(<DefaultAppDialog ext={ext} current={cur} />)} className="flex items-center gap-2 rounded px-2 py-1 hover:bg-[var(--w-hover)]" style={{ border: `1px solid ${T.line}` }}>{cur} <G n="open" s={12} /></button>} />}
      </Card>
      <H>Set defaults for applications</H>
      {Array.from(new Set(apps)).map((a) => (
        <Lnk key={a} page={`apps/default/${a}`} title={a} icon="app" />
      ))}
    </>
  );
}

function DefaultAppPage({ app }: { app: string }) {
  const ctx = useWin();
  const browserLike = app === "Microsoft Edge" || /browser|chrome|firefox/i.test(app);
  const exts = browserLike ? [".htm", ".html", ".pdf", ".svg", ".webp", "HTTP", "HTTPS"] : app === "Notepad" ? [".txt", ".log", ".ini"] : app === "Photos" ? [".jpg", ".png", ".gif"] : [".docx", ".pdf"];
  const isDefault = S(ctx.doc, "default.browser") === app;
  return (
    <>
      {browserLike && (
        <Card>
          <Row icon="globe" title={`Make ${app} your default browser`} right={isDefault ? <span className="text-[12px]" style={{ color: T.sub }}>{app} is your default browser</span> : <Btn primary label="Set default" onClick={() => ctx.cmd("settings.set", `default.browser=${app}`)}>Set default</Btn>} />
        </Card>
      )}
      {exts.map((e) => {
        const key = `default.${e.replace(/^\./, "").toLowerCase()}`;
        const cur = S(ctx.doc, key) || (browserLike && ["HTTP", "HTTPS", ".htm", ".html"].includes(e) ? S(ctx.doc, "default.browser") : DEFAULT_EXT[e] ?? "Microsoft Edge");
        return (
          <Card key={e}>
            <Row title={e} desc="" right={<button type="button" aria-label={`Default app for ${e}`} onClick={() => ctx.modal(<DefaultAppDialog ext={e.startsWith(".") ? e : e.toLowerCase()} current={cur} />)} className="flex items-center gap-2 rounded px-2 py-1 hover:bg-[var(--w-hover)]" style={{ border: `1px solid ${T.line}` }}>{cur} <G n="open" s={12} /></button>} />
          </Card>
        );
      })}
    </>
  );
}

function UpdatePage() {
  const ctx = useWin();
  const doc = ctx.doc;
  const f = doc.flags ?? {};
  const ups = f.updateDone ? [] : doc.updates ?? [];
  const checked = Boolean(f.updateChecked);
  const installed = Boolean(f.updateInstalled) && !f.updateDone;
  const paused = S(doc, "update.pause");
  const state = paused ? "paused" : installed ? "restart" : checked && ups.length ? "available" : "uptodate";
  return (
    <>
      <Card>
        <div className="flex items-center gap-4 p-4">
          <span style={{ color: state === "restart" ? "#c42b1c" : T.accent }}><G n={state === "uptodate" ? "update" : state === "paused" ? "pause" : "sync"} s={40} /></span>
          <div className="flex-1">
            <div className="text-[16px] font-semibold">{state === "paused" ? `Updates paused until ${paused.replace("Pause for ", "") === "1 week" ? "10/27/2026" : "a later date"}` : state === "restart" ? "Restart required" : state === "available" ? "Updates available" : "You're up to date"}</div>
            <div className="text-[12px]" style={{ color: T.sub }}>{state === "restart" ? "Your device will restart outside of active hours." : `Last checked: ${checked ? `Today, ${NOW.time}` : "Yesterday, 4:12 PM"}`}</div>
          </div>
          {state === "paused" ? (
            <Btn primary label="Resume updates" onClick={() => ctx.cmd("settings.set", "update.pause=")}>Resume updates</Btn>
          ) : state === "restart" ? (
            <>
              <Btn primary label="Restart now" onClick={() => ctx.cmd("update.restart")}>Restart now</Btn>
              <Btn label="Schedule the restart">Schedule the restart</Btn>
            </>
          ) : state === "available" ? (
            <Btn primary label="Download & install all" onClick={() => ctx.cmd("update.install")}>Download &amp; install all</Btn>
          ) : (
            <Btn primary label="Check for updates" onClick={() => ctx.cmd("update.check")}>Check for updates</Btn>
          )}
        </div>
        {(state === "available" || state === "restart") &&
          ups.map((u) => (
            <Row key={u.name} indent title={u.name} desc={u.kind ? `${u.kind} update` : undefined} right={<span className="text-[12px]" style={{ color: T.sub }}>{state === "restart" ? "Pending restart" : u.status ?? "Pending download"}</span>} />
          ))}
      </Card>
      <H>More options</H>
      <Tog k="update.latest" title="Get the latest updates as soon as they're available" desc="Be among the first to get the latest non-security updates, fixes, and improvements as they roll out" icon="sync" />
      <Card>
        <Row icon="pause" title="Pause updates" right={paused ? <span className="text-[12px]">Paused</span> : <Select label="Pause updates" value="Pause for 1 week" options={OPTIONS["update.pause"]} onChange={(v) => ctx.cmd("settings.set", `update.pause=${v}`)} width={170} />} />
      </Card>
      <Lnk page="update/history" title="Update history" icon="history" />
      <Lnk page="update/advanced" title="Advanced options" desc="Delivery optimization, optional updates, active hours, other update settings" icon="gear" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Settings window                                                     */
/* ------------------------------------------------------------------ */

export function SettingsApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const page = w.page ?? "home";
  const cat = catOf(page);
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    const out: { id: string; title: string }[] = [];
    for (const c of SETTINGS_CATS)
      for (const p of c.pages) if (`${p.title} ${p.keys ?? ""} ${p.desc ?? ""}`.toLowerCase().includes(t)) out.push({ id: p.id, title: p.title });
    if ("windows update".includes(t) || t.includes("update")) out.unshift({ id: "update", title: "Windows Update" });
    return out.slice(0, 8);
  }, [q]);
  const crumbs: string[] = [];
  const catDef = SETTINGS_CATS.find((c) => c.id === cat);
  if (catDef && page !== "home") crumbs.push(catDef.label);
  if (page !== cat && page !== "home") {
    if (page.startsWith("bluetooth/printers/")) crumbs.push("Printers & scanners");
    if (page.startsWith("apps/default/")) crumbs.push("Default apps");
    crumbs.push(settingsTitle(page));
  }
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="settings">
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2 text-[12px]">
          <button type="button" aria-label="Back" onMouseDown={(e) => e.stopPropagation()} onClick={() => ctx.cmd("settings.back")} disabled={!(w.pback ?? []).length} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="back" s={14} /></button>
          <span>Settings</span>
        </div>
      </TitleBar>
      <div className="flex min-h-0 flex-1">
        <div className="flex w-[240px] shrink-0 flex-col overflow-auto px-3 pb-3">
          <div className="mb-3 flex items-center gap-3 px-1 py-2">
            <Avatar name={userName(ctx.doc)} s={52} />
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold">{userName(ctx.doc)}</div>
              <div className="truncate text-[11px]" style={{ color: T.sub }}>{ctx.doc.user?.email ?? "Local Account"}</div>
            </div>
          </div>
          <div className="relative mb-3">
            <div className="flex h-8 items-center gap-2 rounded px-2" style={{ background: T.input, border: `1px solid ${T.line}`, borderBottomColor: T.sub }}>
              <input aria-label="Find a setting" placeholder="Find a setting" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && hits[0]) { ctx.cmd("settings.nav", hits[0].id); setQ(""); } }} className="min-w-0 flex-1 bg-transparent text-[12px] outline-none" style={{ color: T.text }} />
              <G n="search" s={14} />
            </div>
            {hits.length > 0 && (
              <div className="w11-pop absolute left-0 right-0 top-9 z-50 rounded-lg py-1 shadow-xl" style={{ background: T.flyout, border: `1px solid ${T.line}` }}>
                {hits.map((h) => (
                  <button key={h.id} type="button" aria-label={h.title} onClick={() => { ctx.cmd("settings.nav", h.id); setQ(""); }} className="flex h-8 w-full items-center gap-2 px-3 text-left text-[12px] hover:bg-[var(--w-hover)]">
                    <G n="gear" s={13} /> {h.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          {SETTINGS_CATS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-label={c.label}
              aria-current={cat === c.id}
              onClick={() => ctx.cmd("settings.nav", c.id === "update" ? "update" : c.id)}
              className="relative mb-0.5 flex h-9 items-center gap-3 rounded px-3 text-left text-[12.5px] hover:bg-[var(--w-hover)]"
              style={{ background: cat === c.id ? T.press : undefined }}
            >
              {cat === c.id && <span className="absolute left-0 top-2.5 h-4 w-[3px] rounded" style={{ background: T.accent }} />}
              <G n={c.icon} s={16} style={{ color: T.accent }} />
              {c.label}
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-auto px-6 pb-6">
          <h1 className="mb-4 mt-1 flex flex-wrap items-center gap-2 text-[22px] font-semibold">
            {page === "home" ? "Home" : crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <G n="chevR" s={14} style={{ color: T.sub }} />}
                {i < crumbs.length - 1 ? (
                  <button type="button" aria-label={c} onClick={() => ctx.cmd("settings.nav", i === 0 ? cat : page.startsWith("bluetooth/printers/") ? "bluetooth/printers" : "apps/default")} style={{ color: T.sub }} className="hover:underline">{c}</button>
                ) : (
                  <span>{c}</span>
                )}
              </span>
            ))}
          </h1>
          <Page page={page} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Windows Security                                                    */
/* ------------------------------------------------------------------ */

const SEC_NAV: [string, string, string][] = [
  ["home", "Home", "home"],
  ["virus", "Virus & threat protection", "shield"],
  ["account", "Account protection", "accounts"],
  ["firewall", "Firewall & network protection", "firewall"],
  ["browser", "App & browser control", "app"],
  ["device", "Device security", "chip"],
  ["health", "Device performance & health", "heart"],
  ["family", "Family options", "family"],
  ["history", "Protection history", "history"],
];

export function SecurityApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const page = w.page ?? "home";
  const set = useSet();
  const threats = doc.security?.threats ?? [];
  const scanned = doc.security?.scanned;
  const active = threats.filter((t) => !t.status || t.status === "Active");
  const [action, setAction] = useState("Remove");
  const [mode, setMode] = useState("Quick scan");
  const ok = (id: string) => secStatus(doc, id) === "No actions needed.";
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="security" title="Windows Security" />
      <div className="flex min-h-0 flex-1">
        <div className="w-[220px] shrink-0 overflow-auto px-2">
          {SEC_NAV.map(([id, label, ic]) => (
            <button key={id} type="button" aria-label={label} onClick={() => ctx.cmd("sec.nav", id)} className="relative mb-0.5 flex h-9 w-full items-center gap-3 rounded px-3 text-left text-[12px] hover:bg-[var(--w-hover)]" style={{ background: page === id || (id === "virus" && page.startsWith("virus")) ? T.press : undefined }}>
              {(page === id || (id === "virus" && page.startsWith("virus"))) && <span className="absolute left-0 top-2.5 h-4 w-[3px] rounded" style={{ background: T.accent }} />}
              <G n={ic} s={16} />
              {label}
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-auto px-6 pb-6">
          {page === "home" && (
            <>
              <h1 className="mb-1 text-[22px] font-semibold">Security at a glance</h1>
              <p className="mb-4 text-[12px]" style={{ color: T.sub }}>See what&apos;s happening with the security and health of your device and take any actions needed.</p>
              <div className="grid grid-cols-3 gap-3">
                {SEC_NAV.slice(1, 7).map(([id, label, ic]) => (
                  <button key={id} type="button" aria-label={label} onClick={() => ctx.cmd("sec.nav", id)} className="flex flex-col items-center gap-2 rounded-md p-4 text-center hover:bg-[var(--w-hover)]" style={{ background: T.card, border: `1px solid ${T.line}` }}>
                    <span className="relative"><G n={ic} s={34} /><span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-white" style={{ background: ok(id) ? "#107c10" : "#c42b1c" }}><G n={ok(id) ? "check" : "warn"} s={10} /></span></span>
                    <span className="text-[12.5px] font-semibold">{label}</span>
                    <span className="text-[11px]" style={{ color: T.sub }}>{secStatus(doc, id)}</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {page === "virus" && (
            <>
              <h1 className="mb-1 text-[22px] font-semibold">Virus &amp; threat protection</h1>
              <p className="mb-4 text-[12px]" style={{ color: T.sub }}>Protection for your device against threats.</p>
              <div className="mb-1 text-[14px] font-semibold">Current threats</div>
              {scanned && active.length ? (
                <div className="mb-4 rounded-md p-4" style={{ background: T.card, border: `1px solid ${T.line}` }}>
                  <p className="mb-2 font-semibold text-[#c42b1c]">Threats found. Start the recommended actions.</p>
                  {active.map((t) => (
                    <div key={t.name} className="mb-2 flex items-center gap-3 text-[12px]">
                      <span className="text-[#c42b1c]"><G n="warn" s={18} /></span>
                      <div className="flex-1">
                        <div className="font-semibold">{t.name}</div>
                        <div style={{ color: T.sub }}>{t.severity} · {t.file}</div>
                      </div>
                      <Select label="Action" value={action} options={["Remove", "Quarantine", "Allow on device"]} onChange={setAction} width={150} />
                    </div>
                  ))}
                  <Btn primary label="Start actions" onClick={() => ctx.cmd("sec.action", action === "Allow on device" ? "allow" : action.toLowerCase())}>Start actions</Btn>
                </div>
              ) : (
                <div className="mb-4 text-[12px]">
                  <p>{scanned ? `No current threats. Last scan: Today, ${NOW.time} (${scanned} scan)` : "No current threats."}</p>
                  {threats.some((t) => t.status && t.status !== "Active") && <p style={{ color: T.sub }}>{threats.filter((t) => t.status && t.status !== "Active").map((t) => `${t.name}: ${t.status}`).join("; ")}</p>}
                  <p style={{ color: T.sub }}>0 threats found. Scan lasted 1 minute 12 seconds. 38,412 files scanned.</p>
                </div>
              )}
              <div className="mb-4 flex items-center gap-2">
                <Btn primary label="Quick scan" onClick={() => ctx.cmd("sec.scan", "quick")}>Quick scan</Btn>
                <button type="button" aria-label="Scan options" onClick={() => ctx.cmd("sec.nav", "virus/options")} className="text-[12px] hover:underline" style={{ color: T.accent }}>Scan options</button>
                <button type="button" aria-label="Protection history" onClick={() => ctx.cmd("sec.nav", "history")} className="text-[12px] hover:underline" style={{ color: T.accent }}>Protection history</button>
              </div>
              <div className="mb-1 text-[14px] font-semibold">Virus &amp; threat protection settings</div>
              <p className="mb-1 text-[12px]" style={{ color: S(doc, "sec.realtime") === "on" ? T.sub : "#c42b1c" }}>{S(doc, "sec.realtime") === "on" ? "No action needed." : "Real-time protection is off, leaving your device vulnerable."}</p>
              <button type="button" aria-label="Manage settings" onClick={() => ctx.cmd("sec.nav", "virus/settings")} className="mb-4 text-[12px] hover:underline" style={{ color: T.accent }}>Manage settings</button>
              <div className="mb-1 text-[14px] font-semibold">Ransomware protection</div>
              <p className="mb-1 text-[12px]" style={{ color: T.sub }}>Controlled folder access: {S(doc, "sec.cfa") === "on" ? "On" : "Off"}</p>
              <button type="button" aria-label="Manage ransomware protection" onClick={() => ctx.cmd("sec.nav", "virus/ransomware")} className="text-[12px] hover:underline" style={{ color: T.accent }}>Manage ransomware protection</button>
            </>
          )}
          {page === "virus/options" && (
            <>
              <h1 className="mb-3 text-[22px] font-semibold">Scan options</h1>
              {["Quick scan", "Full scan", "Custom scan", "Microsoft Defender Antivirus (offline scan)"].map((m) => (
                <label key={m} className="mb-2 flex items-start gap-2 text-[12.5px]">
                  <input type="radio" name="scan" checked={mode === m} onChange={() => setMode(m)} aria-label={m} style={{ accentColor: "var(--w-accent)" }} />
                  <span><span className="font-semibold">{m}</span><br /><span style={{ color: T.sub }}>{m === "Quick scan" ? "Checks folders in your system where threats are commonly found." : m === "Full scan" ? "Checks all files and running programs on your hard disk. This scan could take longer than one hour." : m === "Custom scan" ? "Choose which files and locations you want to check." : "Some malicious software can be particularly difficult to remove from your device."}</span></span>
                </label>
              ))}
              <Btn primary label="Scan now" onClick={() => { ctx.cmd("sec.scan", mode.split(" ")[0].toLowerCase()); ctx.cmd("sec.nav", "virus"); }}>Scan now</Btn>
            </>
          )}
          {page === "virus/settings" && (
            <>
              <h1 className="mb-3 text-[22px] font-semibold">Virus &amp; threat protection settings</h1>
              {[["sec.realtime", "Real-time protection", "Locates and stops malware from installing or running on your device."], ["sec.cloud", "Cloud-delivered protection", "Provides increased and faster protection with access to the latest protection data in the cloud."], ["sec.tamper", "Tamper Protection", "Prevents others from tampering with important security features."]].map(([k, t, d]) => (
                <div key={k} className="mb-4">
                  <div className="text-[14px] font-semibold">{t}</div>
                  <p className="mb-1 text-[12px]" style={{ color: T.sub }}>{d}</p>
                  <Toggle label={t} on={S(doc, k) !== "off"} onChange={(v) => set(k, v ? "on" : "off")} />
                </div>
              ))}
            </>
          )}
          {page === "virus/ransomware" && (
            <>
              <h1 className="mb-3 text-[22px] font-semibold">Ransomware protection</h1>
              <div className="text-[14px] font-semibold">Controlled folder access</div>
              <p className="mb-2 text-[12px]" style={{ color: T.sub }}>Protect files, folders, and memory areas on your device from unauthorized changes by unfriendly applications.</p>
              <Toggle label="Controlled folder access" on={S(doc, "sec.cfa") === "on"} onChange={(v) => set("sec.cfa", v ? "on" : "off")} />
              <div className="mt-4 text-[14px] font-semibold">Ransomware data recovery</div>
              <p className="text-[12px]" style={{ color: T.sub }}>You may be able to recover files in these accounts in case of a ransomware attack. OneDrive: Files are backed up with version history.</p>
            </>
          )}
          {page === "firewall" && (
            <>
              <h1 className="mb-1 text-[22px] font-semibold">Firewall &amp; network protection</h1>
              <p className="mb-4 text-[12px]" style={{ color: T.sub }}>Who and what can access your networks.</p>
              {[["domain", "Domain network"], ["private", "Private network"], ["public", "Public network"]].map(([k, l]) => (
                <div key={k} className="mb-2 flex items-center gap-3 rounded-md p-3" style={{ background: T.card, border: `1px solid ${T.line}` }}>
                  <G n="firewall" s={22} />
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold">{l}{S(doc, "net.profile").toLowerCase() === k ? " (active)" : ""}</div>
                    <div className="text-[12px]" style={{ color: S(doc, `sec.firewall.${k}`) === "on" ? T.sub : "#c42b1c" }}>Firewall is {S(doc, `sec.firewall.${k}`) === "on" ? "on" : "off"}.</div>
                  </div>
                  <Toggle label={`Microsoft Defender Firewall ${l}`} on={S(doc, `sec.firewall.${k}`) === "on"} onChange={(v) => set(`sec.firewall.${k}`, v ? "on" : "off")} />
                </div>
              ))}
            </>
          )}
          {page === "browser" && (
            <>
              <h1 className="mb-1 text-[22px] font-semibold">App &amp; browser control</h1>
              <p className="mb-4 text-[12px]" style={{ color: T.sub }}>App protection and online security.</p>
              <div className="text-[14px] font-semibold">Reputation-based protection</div>
              <p className="mb-2 text-[12px]" style={{ color: T.sub }}>These settings protect your device from malicious or potentially unwanted apps, files, and websites.</p>
              <Toggle label="SmartScreen for Microsoft Edge" on={S(doc, "sec.smartscreen") === "on"} onChange={(v) => set("sec.smartscreen", v ? "on" : "off")} />
            </>
          )}
          {page === "history" && (
            <>
              <h1 className="mb-3 text-[22px] font-semibold">Protection history</h1>
              {(doc.security?.history ?? []).length === 0 ? <p className="text-[12px]" style={{ color: T.sub }}>No recent actions.</p> : (doc.security?.history ?? []).map((h, i) => <div key={i} className="mb-1.5 rounded p-2 text-[12px]" style={{ background: T.card, border: `1px solid ${T.line}` }}>{h} · 10/20/2026 {NOW.time}</div>)}
            </>
          )}
          {["account", "device", "health", "family"].includes(page) && (
            <>
              <h1 className="mb-1 text-[22px] font-semibold">{SEC_NAV.find((x) => x[0] === page)?.[1]}</h1>
              <p className="text-[12px]" style={{ color: T.sub }}>{secStatus(doc, page)}</p>
              {page === "account" && <div className="mt-3"><Btn label="Manage sign-in options" onClick={() => ctx.cmd("settings.nav", "accounts/signin")}>Manage sign-in options</Btn></div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
