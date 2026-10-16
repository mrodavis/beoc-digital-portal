import Link from "next/link";
import type { ContentBlock } from "@/types/lesson";
import {
  EHR_SIMULATOR_GUIDE_PATH,
  simulatorSignInUrl,
  simulatorSignUpUrl,
} from "@/lib/ehr-simulator";

type SimulatorBlock = Extract<ContentBlock, { type: "simulator" }>;

/**
 * A hands-on step in the BEOC EHR Simulator.
 *
 * Styled after the simulator's own dark workstation chrome and orange
 * training strip, so a learner can tell at a glance that this part of the
 * lesson happens in the other window. Links open in a new tab: the lesson
 * stays open beside the simulator while the student works.
 */
export default function SimulatorLab({ block }: { block: SimulatorBlock }) {
  return (
    <section
      aria-label={`Simulator lab: ${block.title}`}
      className="overflow-hidden rounded-xl border border-slate-300 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 bg-orange-800 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-orange-50">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-orange-300" />
          BEOC EHR Simulator
        </span>
        <span className="hidden normal-case tracking-normal text-orange-100 sm:inline">
          Synthetic patients only
        </span>
      </div>

      <div className="bg-slate-900 px-5 py-4 text-white">
        <h3 className="text-lg font-semibold leading-snug">{block.title}</h3>
        {(block.role || block.assignment) && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {block.role && (
              <span className="rounded-md bg-slate-700 px-2.5 py-1">
                <span className="text-slate-300">Work as </span>
                <span className="font-semibold">{block.role}</span>
              </span>
            )}
            {block.assignment && (
              <span className="rounded-md bg-amber-500/20 px-2.5 py-1 text-amber-100 ring-1 ring-amber-400/40">
                <span className="text-amber-200">Graded: </span>
                <span className="font-semibold">{block.assignment}</span>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 bg-white px-5 py-5">
        <ol className="list-decimal space-y-2.5 pl-5 text-gray-800 marker:font-semibold marker:text-slate-500">
          {block.steps.map((step, i) => (
            <li key={i} className="pl-1 leading-relaxed">
              {step}
            </li>
          ))}
        </ol>

        {block.done && (
          <p className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900">
            <span className="font-semibold">Done when: </span>
            {block.done}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
          <a
            href={simulatorSignInUrl(block.path)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Open in the simulator
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href={simulatorSignUpUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-700 underline-offset-2 hover:underline"
          >
            First time? Join with your class code
          </a>
          <Link
            href={EHR_SIMULATOR_GUIDE_PATH}
            className="text-sm font-medium text-primary-700 underline-offset-2 hover:underline"
          >
            Student guide
          </Link>
        </div>
      </div>
    </section>
  );
}
