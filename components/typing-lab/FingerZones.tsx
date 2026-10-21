"use client";

import { useEffect, useState } from "react";
import { FINGER_COLOR, FINGER_NAME, KEY_FINGER, keyLabel, type Finger } from "@/lib/typing-lab/keyboard";
import { freshSeed, rng, shuffle } from "@/lib/typing-lab/rng";
import { recordDrill } from "@/lib/typing-lab/storage";

const FINGERS: Finger[] = ["lp", "lr", "lm", "li", "ri", "rm", "rr", "rp"];
const POOL = "qwertyuiopasdfghjkl;zxcvbnm,./1234567890".split("");
const ROUND = 12;

function short(f: Finger) {
  return FINGER_NAME[f].replace(" finger", "").replace(/^./, (c) => c.toUpperCase());
}

/**
 * Drag each key onto the finger that presses it. Works with a mouse (drag
 * and drop), touch (tap a key, then tap a finger), or the keyboard (Tab to a
 * key, press Enter, Tab to a finger, press Enter).
 */
export default function FingerZones() {
  const [keys, setKeys] = useState<string[]>(() => POOL.slice(0, ROUND));
  const [placed, setPlaced] = useState<Record<string, Finger>>({});
  const [misses, setMisses] = useState<Record<string, number>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [msg, setMsg] = useState("Drag a key onto the finger that presses it, or select a key and then a finger.");
  const [saved, setSaved] = useState(false);

  const newRound = () => {
    setKeys(shuffle(rng(freshSeed()), POOL).slice(0, ROUND));
    setPlaced({});
    setMisses({});
    setPicked(null);
    setSaved(false);
    setMsg("Drag a key onto the finger that presses it, or select a key and then a finger.");
  };
  useEffect(newRound, []);

  const place = (k: string, f: Finger) => {
    if (placed[k]) return;
    if (KEY_FINGER[k] === f) {
      setPlaced((p) => ({ ...p, [k]: f }));
      setPicked(null);
      setMsg(`Yes: ${keyLabel(k)} belongs to your ${FINGER_NAME[f]}.`);
    } else {
      const n = (misses[k] ?? 0) + 1;
      setMisses((m) => ({ ...m, [k]: n }));
      const right = KEY_FINGER[k];
      setMsg(
        n >= 2
          ? `Not that one. ${keyLabel(k)} belongs to your ${FINGER_NAME[right]}: it sits in the same column as the home key ${keyLabel(homeOf(right))}.`
          : `Not quite. Find ${keyLabel(k)} on the keyboard and follow its column down to the home row. Which finger rests there?`,
      );
    }
  };

  const remaining = keys.filter((k) => !placed[k]);
  const finished = remaining.length === 0;
  const firstTry = keys.filter((k) => !misses[k]).length;
  useEffect(() => {
    if (!finished || saved) return;
    recordDrill({ at: new Date().toISOString(), drill: "finger-zones", score: `${firstTry} of ${keys.length} keys on the first try`, accuracy: Math.round((firstTry / keys.length) * 1000) / 10 });
    setSaved(true);
  }, [finished, saved, firstTry, keys.length]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-300 bg-white p-4">
        <div className="mb-2 text-sm font-semibold text-gray-900">Keys to sort ({remaining.length} left)</div>
        <ul className="flex min-h-[3.25rem] flex-wrap gap-2" aria-label="Keys to sort">
          {remaining.map((k) => (
            <li key={k}>
              <button
                type="button"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", k);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onClick={() => setPicked(picked === k ? null : k)}
                aria-pressed={picked === k}
                aria-label={`Key ${keyLabel(k)}${picked === k ? ", selected" : ""}`}
                className={`flex h-12 w-12 cursor-grab items-center justify-center rounded-lg border-2 bg-gray-50 font-mono text-xl font-bold text-gray-900 shadow-[0_3px_0_#9ca3af] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 ${picked === k ? "border-primary-700 bg-primary-100" : "border-gray-400"}`}
              >
                {keyLabel(k)}
              </button>
            </li>
          ))}
          {finished && <li className="py-3 text-gray-800">All sorted.</li>}
        </ul>
      </div>
      <p role="status" className="min-h-[1.5rem] text-base text-gray-900">
        {msg}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {FINGERS.map((f) => (
          <div
            key={f}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const k = e.dataTransfer.getData("text/plain");
              if (k) place(k, f);
            }}
            className="flex min-h-[9rem] flex-col rounded-xl border-2 border-black/10 p-2"
            style={{ background: FINGER_COLOR[f] }}
          >
            <button
              type="button"
              onClick={() => (picked ? place(picked, f) : setMsg("Select a key first, then the finger that presses it."))}
              className="rounded-md bg-white/70 px-1 py-1.5 text-center text-sm font-semibold text-gray-900 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-400"
            >
              {short(f)}
            </button>
            <ul className="mt-2 flex flex-wrap gap-1" aria-label={`Keys for the ${FINGER_NAME[f]}`}>
              {keys
                .filter((k) => placed[k] === f)
                .map((k) => (
                  <li key={k} className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-500 bg-white font-mono font-bold text-gray-900">
                    {keyLabel(k)}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      {finished && (
        <div role="status" className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-5">
          <p className="text-xl font-bold text-gray-900">
            {firstTry} of {keys.length} keys on the first try.
          </p>
          <p className="mt-1 text-gray-800">Knowing which finger owns each key is what lets you stop looking down. Try a new set, or put it to work in a key lesson.</p>
          <button type="button" onClick={newRound} className="mt-3 rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            New set of keys
          </button>
        </div>
      )}
    </div>
  );
}

function homeOf(f: Finger): string {
  return ({ lp: "a", lr: "s", lm: "d", li: "f", ri: "j", rm: "k", rr: "l", rp: ";", th: " " } as Record<Finger, string>)[f];
}
