"use client";

import { useEffect, useId, useState } from "react";
import { loadStudentName, printResults, saveStudentName, type ResultsCard } from "@/lib/printResults";

/**
 * Name box plus "Print or save results". The page that opens is what students
 * submit; the name is remembered in this browser for next time.
 */
export default function PrintPanel({ build, buttonLabel = "Print or save results" }: { build: (studentName: string) => ResultsCard; buttonLabel?: string }) {
  const id = useId();
  const [name, setName] = useState("");
  useEffect(() => setName(loadStudentName()), []);
  return (
    <div className="rounded-xl border border-gray-300 bg-gray-50 p-4">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
        Your name for the results page
      </label>
      <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            saveStudentName(e.target.value);
          }}
          autoComplete="name"
          placeholder="First and last name"
          className="min-w-0 flex-1 rounded-lg border border-gray-400 bg-white px-3 py-2 text-base text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
        <button
          type="button"
          onClick={() => printResults(build(name.trim()))}
          className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          {buttonLabel}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-700">
        A results page opens in a new tab. Print it, or choose Save as PDF, then submit it to your instructor or course folder.
      </p>
    </div>
  );
}
