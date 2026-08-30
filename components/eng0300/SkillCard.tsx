"use client";

import Link from "next/link";
import { Skill } from "@/types/eng0300";
import { statusLabels, useSkillProgress } from "@/lib/eng0300/useProgress";

const statusStyles = {
  "not-started": "bg-eng-navy-100 text-eng-navy-600",
  "in-progress": "bg-eng-gold-100 text-eng-gold-700",
  complete: "bg-eng-green-100 text-eng-green-700",
} as const;

export default function SkillCard({ skill }: { skill: Skill }) {
  const { ready, statusOf } = useSkillProgress();
  const status = statusOf(skill.id);

  return (
    <Link
      href={`/eng0300/skills/${skill.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-eng-navy-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
    >
      <div
        className={`bg-gradient-to-br ${skill.accent} flex items-start justify-between p-5`}
      >
        <span className="text-4xl" aria-hidden="true">
          {skill.icon}
        </span>
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          Week {skill.week}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-eng-navy-900">
          {skill.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-eng-navy-600">
          {skill.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-eng-navy-100 pt-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
          >
            {/* Render the neutral label until localStorage has been read, so the
                server and client markup match on first paint. */}
            {ready ? statusLabels[status] : statusLabels["not-started"]}
          </span>
          <span className="text-xs text-eng-navy-400">
            ~{skill.estimatedMinutes} min
          </span>
          <span className="ml-auto text-sm font-semibold text-eng-teal-700 group-hover:text-eng-teal-900">
            {ready && status !== "not-started" ? "Continue" : "Start"} →
          </span>
        </div>
      </div>
    </Link>
  );
}
