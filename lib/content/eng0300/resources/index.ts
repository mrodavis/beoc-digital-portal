/**
 * ENG0300 Resources.
 *
 * SECURITY / COPYRIGHT RULE
 * -------------------------
 * Only resources explicitly cleared as student-safe appear here. The ENG0300
 * source materials — Scoreboost for TABE, TABE Mastery Reading Level M, the
 * Pretest, the practice tests, the Answer Key, and the Teacher's Manual — are
 * copyrighted New Readers Press publications. None of them are hosted, linked,
 * or made downloadable from this portal. They are distributed in class by the
 * instructor. See docs/ENG0300_SOURCE_AUDIT.md.
 *
 * Before adding a downloadable file, confirm it is original BEOC-authored
 * material or licensed for redistribution.
 */

export type ResourceKind = "internal" | "external" | "in-class";

export interface Resource {
  title: string;
  description: string;
  kind: ResourceKind;
  href?: string;
  /** Shown as a small tag on the card. */
  tag?: string;
}

export interface ResourceCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  resources: Resource[];
}

export const eng0300ResourceCategories: ResourceCategory[] = [
  {
    id: "reading-strategies",
    title: "Reading Strategies",
    icon: "🧭",
    description:
      "The core instruction for each skill, written for this course. Start here when a strategy has not stuck yet.",
    resources: [
      {
        title: "Main Ideas & Details",
        description:
          "Topic versus main idea versus detail, the coverage test, and how to write a summary that holds up.",
        kind: "internal",
        href: "/eng0300/skills/main-ideas",
        tag: "Week 1",
      },
      {
        title: "Inferences & Conclusions",
        description:
          "How to build a conclusion from scattered details and prove it with a line from the passage.",
        kind: "internal",
        href: "/eng0300/skills/inferences",
        tag: "Week 2",
      },
      {
        title: "Text Structure",
        description:
          "The five informational structures, their signal words, and how to compare two texts on one topic.",
        kind: "internal",
        href: "/eng0300/skills/text-structure",
        tag: "Week 4",
      },
      {
        title: "Point of View & Purpose",
        description:
          "Identifying who is speaking, why the text exists, and the difference between fact and opinion.",
        kind: "internal",
        href: "/eng0300/skills/point-of-view",
        tag: "Week 5",
      },
      {
        title: "Evidence & Arguments",
        description:
          "Claim, reason, evidence — and the three tests that decide whether support is good enough.",
        kind: "internal",
        href: "/eng0300/skills/evidence",
        tag: "Week 6",
      },
    ],
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    icon: "📖",
    description:
      "Tools for unfamiliar, technical, and multi-meaning words, plus figurative language.",
    resources: [
      {
        title: "Vocabulary in Context",
        description:
          "Four context clues, a word-parts reference table, multi-meaning words, and the five figurative-language types.",
        kind: "internal",
        href: "/eng0300/skills/vocabulary",
        tag: "Week 3",
      },
      {
        title: "Merriam-Webster Dictionary",
        description:
          "Free online dictionary with pronunciation audio. Useful after you have made a context-based prediction — check your guess rather than replacing the skill.",
        kind: "external",
        href: "https://www.merriam-webster.com/",
      },
      {
        title: "Vocabulary practice sets",
        description:
          "Filter the Practice Center to vocabulary items across all four difficulty levels.",
        kind: "internal",
        href: "/eng0300/practice?skill=vocabulary",
      },
    ],
  },
  {
    id: "tabe-practice",
    title: "TABE Practice",
    icon: "🎯",
    description:
      "Preparation for the TABE Reading test, including the question types and how they are worded.",
    resources: [
      {
        title: "TABE Prep Center",
        description:
          "Test overview, a strategy guide for each of the seven question types, and pacing guidance.",
        kind: "internal",
        href: "/eng0300/tabe",
      },
      {
        title: "Practice Center",
        description:
          "Every practice set in the Reading Lab, filterable by skill, difficulty, and passage type. Ungraded, with instant feedback.",
        kind: "internal",
        href: "/eng0300/practice",
      },
      {
        title: "Essential Education TABE Academy",
        description:
          "Online practice platform assigned as homework in this course. Your instructor provides access and tells you which modules to complete.",
        kind: "in-class",
        tag: "Access through your instructor",
      },
      {
        title: "Scoreboost for TABE and TABE Mastery workbooks",
        description:
          "Print workbooks assigned in the weekly homework column of the syllabus. These are copyrighted publications distributed in class — they are not available for download here.",
        kind: "in-class",
        tag: "Distributed in class",
      },
    ],
  },
  {
    id: "reference-guides",
    title: "Reference Guides",
    icon: "🗂️",
    description:
      "Short reference tables pulled from the lessons, for review right before a class meeting or a progress check.",
    resources: [
      {
        title: "Text structure signal words",
        description:
          "The five structures with the transition words that identify each one.",
        kind: "internal",
        href: "/eng0300/skills/text-structure#learn",
      },
      {
        title: "Prefixes, roots, and suffixes",
        description: "Common word parts and what they do to a root word.",
        kind: "internal",
        href: "/eng0300/skills/vocabulary#learn",
      },
      {
        title: "Point of view at a glance",
        description:
          "First, second, third limited, and third omniscient — signals and what each one lets the reader know.",
        kind: "internal",
        href: "/eng0300/skills/point-of-view#learn",
      },
      {
        title: "Claim, reason, evidence",
        description:
          "The three layers of an argument and the three tests for whether evidence is good enough.",
        kind: "internal",
        href: "/eng0300/skills/evidence#learn",
      },
    ],
  },
  {
    id: "study-tools",
    title: "Study Tools",
    icon: "🧰",
    description: "How to use the Reading Lab, and where the graded work lives.",
    resources: [
      {
        title: "Course roadmap",
        description:
          "The seven weeks and fourteen meetings, with the skill and homework focus for each.",
        kind: "internal",
        href: "/eng0300#roadmap",
      },
      {
        title: "TABE readiness checklist",
        description:
          "Eight statements to check yourself against before a progress assessment.",
        kind: "internal",
        href: "/eng0300/tabe#readiness",
      },
      {
        title: "Brightspace",
        description:
          "Official assignments, submissions, attendance, announcements, and grades. Graded work is submitted in Brightspace, never in the Reading Lab.",
        kind: "in-class",
        tag: "Your LMS",
      },
    ],
  },
  {
    id: "external",
    title: "External Resources",
    icon: "🌐",
    description:
      "Free, reputable sites for extra reading practice. These open outside the portal.",
    resources: [
      {
        title: "CommonLit",
        description:
          "A large free library of reading passages with comprehension questions, organized by reading level. Assigned in Weeks 1 and 3 of this course.",
        kind: "external",
        href: "https://www.commonlit.org/",
      },
      {
        title: "News in Levels",
        description:
          "Current news stories rewritten at several reading levels, useful for building reading stamina on real-world material.",
        kind: "external",
        href: "https://www.newsinlevels.com/",
      },
      {
        title: "Brooklyn Public Library",
        description:
          "Free library card, computer access, and adult literacy programs across Brooklyn.",
        kind: "external",
        href: "https://www.bklynlibrary.org/",
      },
      {
        title: "CUNY Adult Literacy and HSE Program",
        description:
          "Information on CUNY adult literacy, HSE, and college transition programs.",
        kind: "external",
        href: "https://www.cuny.edu/academics/current-initiatives/adult-literacy-hse/",
      },
    ],
  },
];

/**
 * Materials deliberately NOT published here, with the reason. Rendered on the
 * Resources page so students understand where to get them rather than assuming
 * they are missing.
 */
export const withheldMaterials = {
  heading: "Materials you get in class, not here",
  intro:
    "Some of the materials named in your syllabus are copyrighted print publications. The Reading Lab does not host them, and that is deliberate rather than an oversight.",
  items: [
    {
      title: "Scoreboost for TABE, Reading Level M",
      note: "Copyrighted workbook distributed in class. Homework page ranges appear in the course roadmap.",
    },
    {
      title: "TABE Mastery Reading, Level M",
      note: "Copyrighted student book distributed in class. Homework page ranges appear in the course roadmap.",
    },
    {
      title: "Pretest and TABE practice tests",
      note: "Assessment materials administered by your instructor under program conditions.",
    },
    {
      title: "Answer keys and the Teacher's Manual",
      note: "Instructor-only materials. These are never published to students in any format.",
    },
  ],
};
