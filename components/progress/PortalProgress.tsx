"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  courseRegistry,
  lessonCount,
  registryGroups,
  type RegistryCourse,
} from "@/lib/progress/registry";
import ProgressBar from "./ProgressBar";

/**
 * Portal-wide progress.
 *
 * Reads every course's store in one pass rather than mounting a hook per
 * course, which would be dozens of subscriptions on one page. Because this
 * reads localStorage directly, it renders a loading state until the first
 * client effect runs.
 */
const STORAGE_KEY = "beoc:course-progress:v1";

function readAll(): Record<string, string[]> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (Array.isArray(v)) out[k] = v.filter((x): x is string => typeof x === "string");
    }
    return out;
  } catch {
    return {};
  }
}

function CourseRow({
  course,
  done,
}: {
  course: RegistryCourse;
  done: string[];
}) {
  const total = lessonCount(course);
  const doneSet = new Set(done);
  const completed = course.modules
    .flatMap((m) => m.lessons)
    .filter((l) => doneSet.has(l.id)).length;

  // The first module that still has an unfinished lesson.
  const nextUp = course.modules
    .flatMap((m) => m.lessons)
    .find((l) => !doneSet.has(l.id));

  return (
    <li className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <Link
          href={course.href}
          className="text-lg font-bold text-gray-900 hover:text-primary-700"
        >
          {course.title}
        </Link>
        <span className="text-sm text-gray-500">
          {course.modules.length} modules
        </span>
      </div>
      <ProgressBar done={completed} total={total} label="Lessons complete" />
      {completed > 0 && nextUp && (
        <p className="mt-3 text-sm text-gray-600">
          Next up:{" "}
          <Link
            href={nextUp.href}
            className="font-medium text-primary-700 underline hover:text-primary-900"
          >
            {nextUp.title}
          </Link>
        </p>
      )}
      {completed === 0 && (
        <p className="mt-3 text-sm text-gray-500">
          Not started.{" "}
          <Link
            href={course.href}
            className="font-medium text-primary-700 underline hover:text-primary-900"
          >
            Open the course
          </Link>
        </p>
      )}
    </li>
  );
}

export default function PortalProgress() {
  const [store, setStore] = useState<Record<string, string[]> | null>(null);

  useEffect(() => {
    const sync = () => setStore(readAll());
    sync();
    window.addEventListener("beoc:course-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("beoc:course-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Render the full page immediately with zero counts and fill the numbers in
  // once localStorage has been read. Returning a loading state instead would
  // mean the whole page pops in after hydration, and would leave the privacy
  // note — which people should see — absent from the server-rendered HTML.
  const ready = store !== null;
  const data = store ?? {};

  const grandTotal = courseRegistry.reduce((n, c) => n + lessonCount(c), 0);
  const grandDone = courseRegistry.reduce((n, c) => {
    const doneSet = new Set(data[c.id] ?? []);
    return n + c.modules.flatMap((m) => m.lessons).filter((l) => doneSet.has(l.id)).length;
  }, 0);

  const started = courseRegistry.filter((c) => (data[c.id] ?? []).length > 0);

  return (
    <div className="mt-8">
      {/* Overall */}
      <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6">
        <ProgressBar
          done={grandDone}
          total={grandTotal}
          label="Across the whole portal"
        />
        <p className="mt-3 text-sm text-gray-700">
          {!ready
            ? "Checking this browser for saved progress…"
            : grandDone === 0
              ? "Nothing marked complete yet. Open any lesson and use “Mark complete” at the bottom."
              : `${started.length} course${started.length === 1 ? "" : "s"} started.`}
        </p>
      </div>

      {/* Privacy note — this matters and belongs above the fold, not in a footer. */}
      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-700">
          <strong>This is saved in this browser only.</strong> It is never sent
          anywhere and no one else can see it — not your instructor, not BEOC.
          Using a different computer or clearing your browser data will show an
          empty page here.
        </p>
        <p className="mt-2 text-sm text-gray-700">
          It is also not a grade. Official progress and grades live in
          Brightspace.
        </p>
      </div>

      {registryGroups.map((group) => {
        const courses = courseRegistry.filter((c) => c.group === group);
        if (courses.length === 0) return null;
        return (
          <section key={group} className="mt-8">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">{group}</h2>
            <ul className="space-y-3">
              {courses.map((c) => (
                <CourseRow key={c.id} course={c} done={data[c.id] ?? []} />
              ))}
            </ul>
          </section>
        );
      })}

      {/* Courses with their own progress systems. */}
      <section className="mt-8">
        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          Academic courses
        </h2>
        <p className="mb-3 text-gray-600">
          ENG0300 and ENGL0150 track progress inside their own course pages,
          because they are built around skills and topics rather than lessons.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            { href: "/eng0300", title: "ENG0300 Reading for Academics", note: "Skill progress on the course dashboard" },
            { href: "/engl0150", title: "ENGL0150 Writing for the Workplace", note: "Communication Check on each topic page" },
          ].map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="block h-full rounded-xl border border-gray-200 bg-white p-5 hover:border-primary-400"
              >
                <span className="block font-bold text-gray-900">{c.title}</span>
                <span className="mt-1 block text-sm text-gray-600">{c.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
