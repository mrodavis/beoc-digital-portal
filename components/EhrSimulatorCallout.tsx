import Link from "next/link";
import {
  EHR_SIMULATOR_GUIDE_PATH,
  simulatorSignInUrl,
  simulatorSignUpUrl,
} from "@/lib/ehr-simulator";

/**
 * The simulator's front door on a portal page: what it is, in one line, and
 * the three ways in. Used on the EHR path, the Intro to EHR course, and the
 * healthcare program pages whose students practise there.
 */
export default function EhrSimulatorCallout({
  heading = "Practice in the BEOC EHR Simulator",
  text = "Work real clinical-software workflows at Northstar Medical Center, our training hospital: patient lists, charts, vitals, orders, results, notes, scheduling, and billing. Every patient is fictional, and your instructor sees the order you did things in, not just the final answer.",
  className = "",
}: {
  heading?: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-300 shadow-md ${className}`}>
      <div className="flex items-center gap-2 bg-orange-800 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-orange-50">
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-orange-300" />
        Training Environment · Synthetic Patient Data
      </div>
      <div className="grid gap-6 bg-slate-900 p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <h2 className="mb-2 text-2xl font-bold">{heading}</h2>
          <p className="max-w-2xl leading-relaxed text-slate-300">{text}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          <a
            href={simulatorSignUpUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white px-5 py-2.5 text-center font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Join your class
          </a>
          <a
            href={simulatorSignInUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-500 px-5 py-2.5 text-center font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Sign in
          </a>
          <Link
            href={EHR_SIMULATOR_GUIDE_PATH}
            className="px-5 py-1 text-center text-sm font-medium text-slate-300 underline-offset-2 hover:text-white hover:underline"
          >
            Student guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
