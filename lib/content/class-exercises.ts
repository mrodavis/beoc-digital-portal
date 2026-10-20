/**
 * Class exercises ported from Brightspace.
 *
 * Each exercise is a self-contained static page in
 * public/class-exercises/<course>/<slug>.html. The pages keep their original
 * styling and answer logic; the Brightspace submit buttons were replaced with
 * a "Submit your work in Brightspace" note, because graded work still goes to
 * Brightspace. This file is the one list the index pages and the related
 * lesson and skill pages read from.
 */

export type ClassExerciseKind =
  | "In-class packet"
  | "Interactive practice"
  | "Skill lab"
  | "TABE practice"
  | "Review";

export interface ClassExercise {
  slug: string;
  title: string;
  kind: ClassExerciseKind;
  description: string;
  /** What the page does when a student works through it. */
  features: string;
  /** Estimated time, when the page states one. */
  time?: string;
  /** ENG0300 skill slug(s) this exercise practices. */
  skills?: string[];
  /** Tech Foundations moduleSlug(s) this exercise practices. */
  modules?: string[];
}

export interface ClassExerciseGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  exercises: ClassExercise[];
}

export function classExerciseHref(
  course: "eng0300" | "info3020",
  slug: string
): string {
  return `/class-exercises/${course}/${slug}.html`;
}

/* ------------------------------------------------------------------ */
/* INFO3020 Digital Literacy I -> Technology Foundations               */
/* ------------------------------------------------------------------ */

export const techFoundationsClassExercises: ClassExerciseGroup[] = [
  {
    id: "week-5",
    label: "Week 5",
    title: "Workplace Hardware & Equipment",
    description:
      "Printers, scanners, monitors, and meeting gear: what to check first and how to report a problem.",
    exercises: [
      {
        slug: "week5-hardware-help-desk-lab",
        title: "Hardware Help Desk Lab",
        kind: "In-class packet",
        description:
          "Five help desk exercises on office hardware. Answers save in your browser and build into one packet you download and hand in.",
        features: "Five exercises · saves as you type · builds a packet",
        time: "About 60 minutes",
        modules: ["module-6"],
      },
    ],
  },
  {
    id: "week-6",
    label: "Week 6",
    title: "Cloud Storage & Collaboration",
    description:
      "OneDrive, SharePoint, and Teams: where files live, who can see them, and how a team works on one document.",
    exercises: [
      {
        slug: "week6-cloud-workspace-lab",
        title: "Cloud Workspace Lab",
        kind: "In-class packet",
        description:
          "Five exercises on saving, sharing, and working together in the cloud. Answers save in your browser and build into one packet.",
        features: "Five exercises · saves as you type · builds a packet",
        time: "About 75 minutes",
        modules: ["module-7"],
      },
      {
        slug: "week6-cloud-simulators",
        title: "Cloud Skills Simulator",
        kind: "Interactive practice",
        description:
          "Sorting games plus a OneDrive simulator and a Teams simulator. Practice the clicks before you try them in the real apps.",
        features: "Sorting games · OneDrive and Teams simulators",
        modules: ["module-7"],
      },
    ],
  },
  {
    id: "week-7",
    label: "Week 7",
    title: "Cybersecurity Fundamentals",
    description:
      "Phishing, passwords, multi-factor sign-in, and protecting patient information at work.",
    exercises: [
      {
        slug: "week7-cyber-safety-lab",
        title: "Cyber Safety Lab",
        kind: "In-class packet",
        description:
          "Five exercises on spotting threats and keeping accounts safe. Answers save in your browser and build into one packet.",
        features: "Five exercises · saves as you type · builds a packet",
        time: "About 80 minutes",
        modules: ["module-8"],
      },
      {
        slug: "week7-cyber-simulators",
        title: "Cyber Safety Simulator",
        kind: "Interactive practice",
        description:
          "Sorting games, a phishing inbox simulator, and an account security simulator. Decide what is safe before it costs you.",
        features: "Sorting games · phishing inbox · account security",
        modules: ["module-8"],
      },
    ],
  },
  {
    id: "unit-1-review",
    label: "Unit 1",
    title: "Unit 1 Review",
    description: "Get ready for the Unit 1 exam with questions from every module.",
    exercises: [
      {
        slug: "unit1-review",
        title: "Unit 1 Review: Tech Foundations Practice",
        kind: "Review",
        description:
          "24 practice questions, three from each Tech Foundations module, with instant feedback on every answer.",
        features: "24 questions · instant feedback",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* ENG0300 Reading/Writing for Academics                               */
/* ------------------------------------------------------------------ */

export const eng0300ClassExercises: ClassExerciseGroup[] = [
  {
    id: "weeks-1-3",
    label: "Weeks 1-3",
    title: "Main Ideas, Inferences, and Vocabulary",
    description:
      "Consolidation sessions that pull the first three skills together, with passages to read and questions to answer on paper.",
    exercises: [
      {
        slug: "review-day-weeks-1-3",
        title: "Review Day: Weeks 1-3 Consolidation",
        kind: "In-class packet",
        description:
          "Five stations: main ideas, inferences, vocabulary, a TABE-style timed set, and a short Word Choice paragraph.",
        features: "Five stations · passages and questions · writing task",
        skills: ["main-ideas", "inferences", "vocabulary"],
      },
      {
        slug: "session2-weeks-1-3-consolidation",
        title: "Session 2: Weeks 1-3 Consolidation",
        kind: "In-class packet",
        description:
          "Five new passages across the first three skills, a timed TABE set, and writing time, with a self-check at the end.",
        features: "Five passages · timed TABE set · self-check",
        skills: ["main-ideas", "inferences", "vocabulary"],
      },
      {
        slug: "session3-vocabulary-closeout",
        title: "Session 3: Vocabulary Closeout and Drafting Day",
        kind: "In-class packet",
        description:
          "Two passages on context clues, word parts, multi-meaning words, and idioms, then drafting time on the Word Choice paragraph.",
        features: "Two passages · sentence warm-up · drafting",
        skills: ["vocabulary"],
      },
    ],
  },
  {
    id: "week-4",
    label: "Week 4",
    title: "Text Structure & Organization",
    description:
      "How a passage is built: chronology, comparison, cause and effect, and problem and solution.",
    exercises: [
      {
        slug: "text-structure-practice",
        title: "In-Class Practice: Text Structure",
        kind: "Interactive practice",
        description:
          "Name the structure, find the signal words, and decide what job each paragraph does. Tap to check every answer.",
        features: "Tap-to-check questions · running score",
        skills: ["text-structure"],
      },
      {
        slug: "comparing-structure-practice",
        title: "In-Class Practice: Comparing Structure",
        kind: "Interactive practice",
        description:
          "Two texts on one topic built in different ways, then a Weeks 1-4 review before the Mid-Course Progress Check.",
        features: "Tap-to-check questions · running score · Weeks 1-4 review",
        skills: ["text-structure"],
      },
    ],
  },
  {
    id: "week-5",
    label: "Week 5",
    title: "Point of View & Purpose",
    description:
      "Who is telling this, why they wrote it, and how word choice shows how the author feels.",
    exercises: [
      {
        slug: "point-of-view-practice",
        title: "In-Class Practice: Point of View & Purpose",
        kind: "Interactive practice",
        description:
          "Name the speaker, sort fact from opinion, and find the author's purpose. Tap to check every answer.",
        features: "Tap-to-check questions · running score",
        skills: ["point-of-view"],
      },
      {
        slug: "comparing-point-of-view-practice",
        title: "In-Class Practice: Comparing Point of View",
        kind: "Interactive practice",
        description:
          "Two writers, one event. Spot slanted words, chart what each writer includes and leaves out, and start an Audience Switch.",
        features: "Tap-to-check questions · running score · timer",
        skills: ["point-of-view"],
      },
      {
        slug: "point-of-view-skill-lab",
        title: "Skill Lab Practice: Point of View & Purpose",
        kind: "Skill lab",
        description:
          "Try It, Practice, and the Mastery Check on one page. Choose an answer and see right away why it works.",
        features: "Instant feedback · mastery check",
        skills: ["point-of-view"],
      },
      {
        slug: "tabe-challenge-point-of-view",
        title: "TABE Challenge: Point of View & Purpose",
        kind: "TABE practice",
        description:
          "One dense passage and four TABE-style questions. Answer, then check yourself on the page.",
        features: "Four TABE-style questions · self-check",
        skills: ["point-of-view"],
      },
    ],
  },
  {
    id: "week-6",
    label: "Week 6",
    title: "Evidence & Argument Quality",
    description:
      "Find the claim, check the evidence, and name what is wrong when an argument does not hold up.",
    exercises: [
      {
        slug: "evidence-weak-arguments-practice",
        title: "In-Class Practice: Evidence & Weak Arguments",
        kind: "Interactive practice",
        description:
          "Good arguments give reasons and proof; weak ones only sound good. Practice telling the difference, with a timer for timed sets.",
        features: "Tap-to-check questions · running score · timer",
        skills: ["evidence"],
      },
    ],
  },
  {
    id: "tabe",
    label: "TABE",
    title: "TABE Test Prep",
    description:
      "Review every reading skill, then take a full-length practice test under real conditions.",
    exercises: [
      {
        slug: "tabe-power-review",
        title: "Step 1: TABE Reading Power Review",
        kind: "TABE practice",
        description:
          "Nine short stations, from Know Your Test to a Test Day Game Plan, with drag-and-drop and tap-to-check practice for every skill.",
        features: "Nine stations · drag and drop · saves your progress",
        time: "About 70 minutes",
        skills: [
          "main-ideas",
          "inferences",
          "vocabulary",
          "text-structure",
          "point-of-view",
          "evidence",
          "visual-data",
        ],
      },
      {
        slug: "tabe-mock-test",
        title: "Step 2: TABE Reading Mock Test",
        kind: "TABE practice",
        description:
          "A 39-question practice test in TABE format with a break, a score report by skill, and an explanation for every answer.",
        features: "39 questions · score by skill · saves your progress",
      },
    ],
  },
];

function flatten(groups: ClassExerciseGroup[]) {
  return groups.flatMap((group) =>
    group.exercises.map((exercise) => ({ ...exercise, group }))
  );
}

/** Class exercises that practice one ENG0300 skill. */
export function eng0300ExercisesForSkill(skillSlug: string) {
  return flatten(eng0300ClassExercises).filter((exercise) =>
    exercise.skills?.includes(skillSlug)
  );
}

/** Class exercises that practice one Tech Foundations module. */
export function techFoundationsExercisesForModule(moduleSlug: string) {
  return flatten(techFoundationsClassExercises).filter((exercise) =>
    exercise.modules?.includes(moduleSlug)
  );
}

export const eng0300ClassExerciseCount = flatten(eng0300ClassExercises).length;
export const techFoundationsClassExerciseCount = flatten(
  techFoundationsClassExercises
).length;
