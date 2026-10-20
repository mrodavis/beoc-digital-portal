"use client";

import { createContext, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { WinWindow } from "./types";
import { AppIcon, G } from "./icons";
import { T, useWin } from "./ui";

export type FrameValue = {
  w: WinWindow;
  active: boolean;
  startDrag: (e: React.MouseEvent) => void;
};

export const FrameCtx = createContext<FrameValue | null>(null);
export const useFrame = () => {
  const f = useContext(FrameCtx);
  if (!f) throw new Error("FrameCtx missing");
  return f;
};

/** Minimize, maximize (with snap layouts on hover) and close. */
export function Caption({ dark: darkBar, private: priv }: { dark?: boolean; private?: boolean }) {
  const { cmd } = useWin();
  const { w } = useFrame();
  const [snap, setSnap] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const big = w.max || Boolean(w.snap);
  const fg = darkBar || priv ? "#fff" : undefined;
  return (
    <div className="relative flex h-full shrink-0 items-stretch" style={{ color: fg }} onMouseDown={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
      <button type="button" aria-label="Minimize" title="Minimize" onClick={() => cmd("win.minimize", w.id)} className="flex w-11 items-center justify-center hover:bg-[var(--w-hover)]">
        <G n="min" s={14} />
      </button>
      <button
        type="button"
        aria-label={big ? "Restore Down" : "Maximize"}
        title={big ? "Restore Down" : "Maximize"}
        onClick={() => {
          setSnap(false);
          cmd(big ? "win.restore" : "win.maximize", w.id);
        }}
        onMouseEnter={() => {
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setSnap(true), 650);
        }}
        onMouseLeave={() => {
          if (timer.current) clearTimeout(timer.current);
        }}
        className="flex w-11 items-center justify-center hover:bg-[var(--w-hover)]"
      >
        <G n={big ? "restore" : "max"} s={14} />
      </button>
      <button type="button" aria-label="Close" title="Close" onClick={() => cmd("win.close", w.id)} className="flex w-11 items-center justify-center hover:bg-[#c42b1c] hover:text-white">
        <G n="close" s={14} />
      </button>
      {snap && (
        <div className="w11-pop absolute right-12 top-full z-[350] flex gap-3 rounded-lg p-3 shadow-2xl" style={{ background: T.flyout, border: `1px solid ${T.line}`, color: T.text }} onMouseLeave={() => setSnap(false)}>
          <div className="flex flex-col gap-1">
            <span className="text-[10px]" style={{ color: T.sub }}>Snap layout</span>
            <div className="flex h-14 w-24 gap-1">
              {(["left", "right"] as const).map((z) => (
                <button key={z} type="button" aria-label={`Snap ${z}`} title={z === "left" ? "Left half" : "Right half"} onClick={() => { setSnap(false); cmd("win.snap", `${w.id}:${z}`); }} className="flex-1 rounded border hover:bg-[var(--w-accent)]" style={{ borderColor: T.sub }} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px]" style={{ color: T.sub }}>Quarters</span>
            <div className="grid h-14 w-24 grid-cols-2 grid-rows-2 gap-1">
              {(["tl", "tr", "bl", "br"] as const).map((z) => (
                <button key={z} type="button" aria-label={`Snap ${z}`} title={{ tl: "Top left", tr: "Top right", bl: "Bottom left", br: "Bottom right" }[z]} onClick={() => { setSnap(false); cmd("win.snap", `${w.id}:${z}`); }} className="rounded border hover:bg-[var(--w-accent)]" style={{ borderColor: T.sub }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** A standard title bar. `children` replaces the title text (tabs, search). */
export function TitleBar({ title, app, children, bg, darkText, height = 40, privateMode }: { title?: string; app: string; children?: ReactNode; bg?: string; darkText?: boolean; height?: number; privateMode?: boolean }) {
  const { w, active, startDrag } = useFrame();
  const { cmd } = useWin();
  const big = w.max || Boolean(w.snap);
  return (
    <div
      className="flex shrink-0 select-none items-stretch"
      style={{ height, background: bg ?? "transparent", color: darkText ? "#fff" : T.text, opacity: active ? 1 : 0.92 }}
      onMouseDown={startDrag}
      onDoubleClick={() => cmd(big ? "win.restore" : "win.maximize", w.id)}
    >
      {children ?? (
        <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 text-[12px]">
          <AppIcon id={app} s={16} />
          <span className="truncate">{title}</span>
        </div>
      )}
      <Caption dark={darkText} private={privateMode} />
    </div>
  );
}
