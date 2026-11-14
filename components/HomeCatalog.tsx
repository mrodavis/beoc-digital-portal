"use client";

import { useMemo, useState } from "react";
import LearningCard from "@/components/LearningCard";
import type { CatalogItem } from "@/lib/content/catalog";

const FILTERS = ["All programs", "Healthcare", "Business", "Public Safety", "Hospitality", "Academic"] as const;

export default function HomeCatalog({
  technical,
  academic,
}: {
  technical: CatalogItem[];
  academic: CatalogItem[];
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All programs");

  const match = (p: CatalogItem) => {
    const okArea = filter === "All programs" || p.area === filter;
    const needle = q.trim().toLowerCase();
    const okText = !needle || `${p.title} ${p.description}`.toLowerCase().includes(needle);
    return okArea && okText;
  };

  const tech = useMemo(() => technical.filter(match), [technical, q, filter]); // eslint-disable-line react-hooks/exhaustive-deps
  const acad = useMemo(() => academic.filter(match), [academic, q, filter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <section id="programs" className="container-x scroll-mt-24 pt-4">
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="flex max-w-[640px] gap-2 rounded-[18px] border border-ink-line bg-white p-2 shadow-[0_12px_30px_-18px_rgba(11,27,51,0.35)]"
        >
          <label htmlFor="program-search" className="sr-only">
            Search programs
          </label>
          <input
            id="program-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search programs, like Medical Billing or Excel"
            className="min-w-0 flex-1 bg-transparent px-3 text-[15px] text-ink outline-none placeholder:text-ink-muted"
          />
          <button type="submit" className="rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700">
            Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                filter === f ? "bg-ink text-white" : "border border-ink-line bg-white text-ink hover:border-ink/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section id="career" className="container-x scroll-mt-24 pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink">Career &amp; Technical</h2>
          <p className="text-[15px] font-semibold text-primary-600">
            {tech.length} of {technical.length} programs
          </p>
        </div>
        {tech.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tech.map((p) => (
              <LearningCard key={p.title} {...p} />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-[22px] border border-dashed border-ink-line bg-white p-8 text-ink-muted">
            No career programs match that search.
          </p>
        )}
      </section>

      <section id="academic" className="container-x scroll-mt-24 pt-16">
        <div className="flex flex-col gap-8 rounded-[28px] border border-ink-line bg-white p-7 sm:p-9 lg:flex-row">
          <div className="lg:w-[34%]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-600">Academic programs</p>
            <h2 className="mt-3 font-display text-[34px] font-bold leading-[1.1] tracking-tight text-ink">
              Build the foundation for college and the TABE.
            </h2>
          </div>
          <div className="grid flex-1 gap-2.5 sm:grid-cols-2">
            {acad.length ? (
              acad.map((a) => (
                <a
                  key={a.title}
                  href={a.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl bg-ink-canvas px-5 py-4 font-semibold text-ink transition-colors hover:bg-primary-50"
                >
                  {a.title}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F5BFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              ))
            ) : (
              <p className="text-ink-muted">No academic programs match that search.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
