import { officeApps } from "@/lib/content/ms-office";
import { techFoundationsModules } from "@/lib/content/office-assistant/tech-foundations";
import { officeAppsModules } from "@/lib/content/office-assistant/office-apps";
import { modernOfficeModules } from "@/lib/content/office-assistant/modern-office";
import { introDatabaseModules } from "@/lib/content/office-assistant/intro-database";
import { introToEHRModules } from "@/lib/content/ehr/intro-to-ehr";
import { programList } from "@/lib/content/programs";

/**
 * Every lesson-based course in the portal, in one place.
 *
 * Built from the existing course data rather than duplicating it, so a course
 * that gains a module appears here automatically. This is what lets a single
 * page show progress across the whole portal.
 *
 * ENG0300 and ENGL0150 are deliberately absent: they use their own content
 * models and their own progress stores, and folding them in would mean either
 * flattening their structure or special-casing them here. They are surfaced
 * separately on the progress page.
 */

export interface RegistryLesson {
  /** `${moduleSlug}::${lessonSlug}` — matches what the lesson page stores. */
  id: string;
  slug: string;
  title: string;
  href: string;
}

export interface RegistryModule {
  slug: string;
  number: number;
  title: string;
  href: string;
  lessons: RegistryLesson[];
}

export interface RegistryCourse {
  /** Matches the `courseId` the lesson page writes progress under. */
  id: string;
  title: string;
  /** The course landing page. */
  href: string;
  /** Which section of the portal this belongs to. */
  group: "Microsoft Office" | "Office Administrative Professional" | "Healthcare";
  modules: RegistryModule[];
}

type RawModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  lessons: { slug: string; title: string }[];
};

function build(
  id: string,
  title: string,
  href: string,
  group: RegistryCourse["group"],
  modules: RawModule[],
  lessonHref: (moduleSlug: string, lessonSlug: string) => string
): RegistryCourse {
  return {
    id,
    title,
    href,
    group,
    modules: modules.map((m) => ({
      slug: m.moduleSlug,
      number: m.moduleNumber,
      title: m.title,
      href: `${href}/${m.moduleSlug}`,
      lessons: m.lessons.map((l) => ({
        id: `${m.moduleSlug}::${l.slug}`,
        slug: l.slug,
        title: l.title,
        href: lessonHref(m.moduleSlug, l.slug),
      })),
    })),
  };
}

const msOffice = (["word", "excel", "powerpoint", "access"] as const).map((app) =>
  build(
    `ms-office/${app}`,
    { word: "Microsoft Word", excel: "Microsoft Excel", powerpoint: "Microsoft PowerPoint", access: "Microsoft Access" }[app],
    `/learning-paths/ms-office/${app}`,
    "Microsoft Office",
    officeApps[app] as unknown as RawModule[],
    (m, l) => `/learning-paths/ms-office/${app}/${m}/${l}`
  )
);

const oap = [
  build("oap/tech-foundations", "Technology for the Workplace", "/learning-paths/office-assistant/tech-foundations", "Office Administrative Professional", techFoundationsModules as unknown as RawModule[], (m, l) => `/learning-paths/office-assistant/tech-foundations/${m}/${l}`),
  build("oap/office-apps", "Office Productivity Applications", "/learning-paths/office-assistant/office-apps", "Office Administrative Professional", officeAppsModules as unknown as RawModule[], (m, l) => `/learning-paths/office-assistant/office-apps/${m}/${l}`),
  build("oap/modern-office", "Cloud Technology with AI", "/learning-paths/office-assistant/modern-office", "Office Administrative Professional", modernOfficeModules as unknown as RawModule[], (m, l) => `/learning-paths/office-assistant/modern-office/${m}/${l}`),
  build("oap/intro-database", "Database Management", "/learning-paths/office-assistant/intro-database", "Office Administrative Professional", introDatabaseModules as unknown as RawModule[], (m, l) => `/learning-paths/office-assistant/intro-database/${m}/${l}`),
];

const healthcare = [
  build("ehr/intro-to-ehr", "Introduction to EHR", "/learning-paths/ehr/intro-to-ehr", "Healthcare", introToEHRModules as unknown as RawModule[], (m, l) => `/learning-paths/ehr/intro-to-ehr/${m}/${l}`),
  ...programList.map((p) =>
    build(
      `programs/${p.slug}`,
      p.shortTitle,
      `/learning-paths/programs/${p.slug}`,
      "Healthcare",
      p.modules as unknown as RawModule[],
      (m, l) => `/learning-paths/programs/${p.slug}/${m}/${l}`
    )
  ),
];

export const courseRegistry: RegistryCourse[] = [...msOffice, ...oap, ...healthcare];

export function getCourse(id: string) {
  return courseRegistry.find((c) => c.id === id);
}

export function lessonCount(course: RegistryCourse) {
  return course.modules.reduce((n, m) => n + m.lessons.length, 0);
}

export const registryGroups = [
  "Microsoft Office",
  "Office Administrative Professional",
  "Healthcare",
] as const;
