"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Difficulty,
  PassageType,
  PracticeSet,
  Skill,
  SkillId,
} from "@/types/eng0300";

const difficultyStyles: Record<Difficulty, string> = {
  Foundation: "bg-eng-navy-100 text-eng-navy-700",
  Developing: "bg-eng-teal-50 text-eng-teal-800",
  "TABE Ready": "bg-eng-gold-100 text-eng-gold-700",
  Challenge: "bg-eng-navy-800 text-white",
};

type Filter<T> = T | "all";

function FilterGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  labelFor,
}: {
  legend: string;
  options: T[];
  value: Filter<T>;
  onChange: (next: Filter<T>) => void;
  labelFor?: (option: T) => string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {(["all", ...options] as Filter<T>[]).map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={active}
              className={`min-h-[2.5rem] rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2 ${
                active
                  ? "border-eng-navy-800 bg-eng-navy-800 text-white"
                  : "border-eng-navy-200 bg-white text-eng-navy-700 hover:border-eng-teal-500 hover:bg-eng-teal-50"
              }`}
            >
              {option === "all"
                ? "All"
                : labelFor
                  ? labelFor(option as T)
                  : option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * The Practice Center browser: filter every practice set in the Reading Lab by
 * skill, difficulty, and passage type. Sets are supplied by the caller from the
 * derived catalog, so new content appears here with no change to this component.
 */
export default function PracticeBrowser({
  sets,
  skills,
  initialSkill,
  difficulties,
  passageTypes,
}: {
  sets: PracticeSet[];
  skills: Skill[];
  initialSkill?: SkillId;
  difficulties: Difficulty[];
  passageTypes: PassageType[];
}) {
  const [skill, setSkill] = useState<Filter<SkillId>>(initialSkill ?? "all");
  const [difficulty, setDifficulty] = useState<Filter<Difficulty>>("all");
  const [passageType, setPassageType] = useState<Filter<PassageType>>("all");

  const skillTitles = useMemo(
    () =>
      Object.fromEntries(skills.map((entry) => [entry.id, entry.shortTitle])) as
        Record<SkillId, string>,
    [skills]
  );

  // Only offer passage types that some set actually uses.
  const availableTypes = useMemo(
    () => passageTypes.filter((type) => sets.some((set) => set.passageType === type)),
    [passageTypes, sets]
  );

  const filtered = useMemo(
    () =>
      sets.filter(
        (set) =>
          (skill === "all" || set.skill === skill) &&
          (difficulty === "all" || set.difficulty === difficulty) &&
          (passageType === "all" || set.passageType === passageType)
      ),
    [sets, skill, difficulty, passageType]
  );

  const anyFilterActive =
    skill !== "all" || difficulty !== "all" || passageType !== "all";

  function clearAll() {
    setSkill("all");
    setDifficulty("all");
    setPassageType("all");
  }

  return (
    <div>
      <div className="mb-8 space-y-5 rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
        <FilterGroup
          legend="Skill"
          options={skills.map((entry) => entry.id)}
          value={skill}
          onChange={setSkill}
          labelFor={(id) => skillTitles[id]}
        />
        <FilterGroup
          legend="Difficulty"
          options={difficulties}
          value={difficulty}
          onChange={setDifficulty}
        />
        <FilterGroup
          legend="Passage type"
          options={availableTypes}
          value={passageType}
          onChange={setPassageType}
        />

        <div className="flex flex-wrap items-center gap-4 border-t border-eng-navy-100 pt-4">
          <p className="text-sm font-medium text-eng-navy-700" aria-live="polite">
            Showing {filtered.length} of {sets.length} practice{" "}
            {sets.length === 1 ? "set" : "sets"}
          </p>
          {anyFilterActive && (
            <button
              type="button"
              onClick={clearAll}
              className="rounded-lg px-2 py-1 text-sm font-semibold text-eng-teal-800 underline underline-offset-4 hover:text-eng-teal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-eng-navy-200 bg-white p-8 text-center">
          <p className="font-display text-lg font-bold text-eng-navy-900">
            No practice sets match those filters yet.
          </p>
          <p className="mx-auto mt-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
            More sets are added as the course develops. Try clearing one filter,
            or browse a different skill.
          </p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((set) => (
            <li key={set.id}>
              <Link
                href={set.href}
                className="group flex h-full flex-col rounded-2xl border border-eng-navy-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyStyles[set.difficulty]}`}
                  >
                    {set.difficulty}
                  </span>
                  <span className="rounded-full bg-eng-navy-50 px-3 py-1 text-xs font-medium text-eng-navy-600">
                    {set.passageType}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold leading-snug text-eng-navy-900">
                  {set.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-eng-navy-600">
                  {set.description}
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-eng-navy-100 pt-4 text-xs text-eng-navy-500">
                  <span>{skillTitles[set.skill]}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {set.questionCount}{" "}
                    {set.questionCount === 1 ? "question" : "questions"}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>~{set.estimatedMinutes} min</span>
                  <span className="ml-auto font-semibold text-eng-teal-700 group-hover:text-eng-teal-900">
                    Open →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
