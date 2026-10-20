"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { SimDefinition, SimDoc } from "@/types/sim";
import type { AppModule } from "./types";
import { APP_LOADERS } from "./apps";

type PlayerProps = { sim: SimDefinition; app: AppModule<SimDoc> };

/**
 * Holds a sim's place on the lesson page and loads the player and its app
 * engine when the learner scrolls near it, so lesson pages stay light.
 */
export default function SimSlot({ sim }: { sim: SimDefinition }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState<{ Player: ComponentType<PlayerProps>; app: AppModule<SimDoc> } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    // Jumping straight to the section (#practice-simulation) also loads it.
    if (window.location.hash === "#practice-simulation") setNear(true);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near || loaded) return;
    let live = true;
    Promise.all([import("./SimPlayer"), APP_LOADERS[sim.app]()])
      .then(([m, app]) => live && setLoaded({ Player: m.default, app }))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [near, loaded, sim.app]);

  if (loaded) {
    const { Player, app } = loaded;
    return <Player sim={sim} app={app} />;
  }

  return (
    <div ref={ref} className="not-prose my-2">
      <div className="flex h-[600px] flex-col items-center justify-center gap-3 rounded-t-lg border border-gray-300 bg-gray-50 px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Practice simulation</p>
        <h3 className="text-xl font-semibold text-gray-900">{sim.title}</h3>
        <p className="max-w-xl text-sm text-gray-600">{sim.scenario}</p>
        <p className="text-sm text-gray-500" role="status">
          {failed ? "The simulation could not load. Check your connection and refresh the page." : "Loading the simulation..."}
        </p>
      </div>
    </div>
  );
}
