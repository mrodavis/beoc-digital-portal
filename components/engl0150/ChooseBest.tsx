"use client";

import { DrillItem } from "@/types/engl0150";
import GrammarDrill from "./GrammarDrill";

/**
 * A scenario followed by "which of these is the right message?" items.
 *
 * Reuses the drill card so the feedback behaves identically everywhere in the
 * course — every option explains itself, right or wrong. The only addition is
 * the shared scenario the options are judged against.
 */
export default function ChooseBest({
  title,
  instructions,
  scenario,
  items,
}: {
  title: string;
  instructions?: string;
  scenario: string;
  items: DrillItem[];
}) {
  return (
    <div>
      <div className="rounded-2xl border border-engl-plum-200 bg-engl-plum-50 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-engl-plum-800">
          Scenario
        </p>
        <p className="mt-1 leading-relaxed text-engl-ink-800">{scenario}</p>
      </div>
      <div className="mt-4">
        <GrammarDrill title={title} instructions={instructions} items={items} />
      </div>
    </div>
  );
}
