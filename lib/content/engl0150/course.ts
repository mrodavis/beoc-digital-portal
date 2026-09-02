import { CommunicationCriterion, LearningGoal, PortfolioPiece } from "@/types/engl0150";

/**
 * Course-level facts for ENGL0150, taken from the ENGL0150 syllabus and the
 * Instructor's Guide (Irene Dascher, 2026), which are authoritative.
 *
 * The syllabus PDF is the single source of truth for policy. If this file and
 * the syllabus ever disagree, the syllabus wins and this file is corrected.
 */
export const engl0150Course = {
  code: "ENGL0150",
  section: "85003",
  title: "Writing for the Workplace",
  courseTitle: "ENGL0150 – Writing for the Workplace",
  basePath: "/engl0150",

  institution:
    "SUNY Brooklyn Educational Opportunity Center (BEOC), Academic Affairs Department",
  address: "111 Livingston Street, Suite 205, Brooklyn, NY 11201",
  term: "Fall 2026, Module 1 (Fall 1)",
  dates: "Friday, August 28 2026 – Monday, October 26 2026",
  delivery: "Fully in person at BEOC; all materials distributed through Brightspace",
  audience:
    "Medical Assisting (MA), Patient Care Technician (PCT), and Medical Billing students",
  lms: "SUNY Brightspace, org unit 2883710 (2026FA-EOC-ENGL0150-85003)",
  curriculumCredit: "Instructor's Guide developed by Irene Dascher, 2026",

  instructors: [
    { name: "Prof. I. Dascher", officeHours: "Room 205 — Thursday 12:30–1:30" },
    { name: "Prof. O. Davis", officeHours: "Room 205 — Wednesday 2:00–2:30" },
  ],

  /** Landing-page positioning. Describes the course without overclaiming. */
  positioning:
    "This course builds the workplace writing and communication skills needed in healthcare and allied health settings. Students strengthen grammar, sentence clarity, and paragraph organization, then apply those skills to realistic healthcare workplace tasks aligned with NHA expectations. Emphasis is on writing that is clear, objective, concise, patient-centered, professionally toned, and appropriate for clinical and administrative settings. Students learn that healthcare documentation may become part of the professional and legal record, and they practice writing that is factual, observable, defensible, and within professional scope.",

  /** The framing line for the course's AI stance, used verbatim. */
  aiStance: "AI can suggest. You decide.",

  aiDetail:
    "AI is a writing coach, not a replacement for your judgment. You may use AI to identify grammar or punctuation problems, suggest clearer wording, check organization, improve professional tone, flag confusing passages, and explain why a passage needs revision. You remain responsible for accuracy, professionalism, confidentiality, and final content.",
} as const;

export const learningGoals: LearningGoal[] = [
  {
    id: "grammar-sentence",
    number: 1,
    title: "Grammar and Sentence Competency",
    qualifier: "Healthcare Context",
    outcomes: [
      "Apply punctuation, capitalization, and sentence structure correctly",
      "Correct fragments, run-ons, comma splices, tense shifts, and modifier errors",
      "Maintain subject–verb and pronoun–antecedent agreement",
      "Use adjectives, adverbs, and comparative and superlative forms correctly",
    ],
  },
  {
    id: "professional-writing",
    number: 2,
    title: "Professional Workplace Writing",
    qualifier: "NHA Alignment",
    outcomes: [
      "Write professional emails and short workplace messages with appropriate tone, formatting, and audience awareness",
      "Recognize and revise unclear or unprofessional writing — wordiness, redundancy, vague language, incoherence",
      "Format for readability using subject lines, spacing, lists, bullets, and parallel structure",
    ],
  },
  {
    id: "patient-centered",
    number: 3,
    title: "Patient-Centered Communication",
    outcomes: [
      "Write patient-facing documents in plain language and a respectful tone",
      "Translate clinical terms for patients and families",
      "Reduce confusion and improve compliance through clear directions, sequencing, and priority information",
    ],
  },
  {
    id: "documentation",
    number: 4,
    title: "Documentation-Style Writing and Professional Responsibility",
    outcomes: [
      "Distinguish unsafe opinion-based language from objective observation-based language",
      "Practice legally defensible documentation that is factual, measurable, and within scope",
      "Convert spoken patient information into concise documentation-style writing",
      "Apply SOAP-style organization at an introductory level",
    ],
  },
  {
    id: "summarizing",
    number: 5,
    title: "Summarizing and Paraphrasing",
    outcomes: [
      "Identify main points and key details in spoken and written information",
      "Summarize and paraphrase accurately without adding interpretation",
    ],
  },
];

export function getGoal(id: string) {
  return learningGoals.find((g) => g.id === id);
}

/** The five quality criteria used by every topic and by the Portfolio. */
export const communicationCheck: CommunicationCriterion[] = [
  {
    id: "clear",
    label: "Clear",
    prompt: "I communicated my ideas so they are easy to understand.",
  },
  {
    id: "accurate",
    label: "Accurate",
    prompt: "My grammar, spelling, information, and details are correct.",
  },
  {
    id: "objective",
    label: "Objective",
    prompt: "I separated facts and observations from opinions.",
  },
  {
    id: "professional",
    label: "Professional",
    prompt: "My tone and format are appropriate for the workplace.",
  },
  {
    id: "patient-centered",
    label: "Patient-Centered",
    prompt: "I communicated information in a way patients can understand.",
  },
];

/** How a two-session topic runs, from the Instructor's Guide. */
export const sessionSequence = {
  one: [
    "Topic introduction with the Essential Question",
    "Overview of the cumulative workplace product",
    "Teaching and learning concepts",
    "Grammar focus",
    "Words to spell",
    "Guided practice",
  ],
  two: [
    "Session 1 review",
    "Quick quiz and test strategy",
    "Cumulative workplace task",
    "Communication Check and self-edit",
  ],
};

export const portfolioPieces: PortfolioPiece[] = [
  {
    icon: "🩺",
    title: "Clinical Documentation",
    description: "Objective, evidence-based documentation.",
    skills: ["Accuracy", "Objectivity", "Concise writing", "Professional language"],
  },
  {
    icon: "📋",
    title: "Patient Instructions",
    description: "Clear, concise instructions a patient can follow.",
    skills: ["Clarity", "Organization", "Plain language", "Appropriate tone"],
  },
  {
    icon: "✉️",
    title: "Professional Email",
    description: "A message to a member of the healthcare team.",
    skills: ["Organization", "Tone", "Grammar", "Workplace conventions"],
  },
  {
    icon: "💡",
    title: "Patient Education",
    description: "A handout, FAQ, or similar patient-focused resource.",
    skills: ["Health literacy", "Word choice", "Organization", "Audience awareness"],
  },
  {
    icon: "📄",
    title: "Professional Letter",
    description:
      "A formal letter for a realistic healthcare situation, such as a follow-up about a missed appointment.",
    skills: ["Formatting", "Tone", "Organization", "Professionalism"],
  },
];

/** The portfolio's "I can…" self-assessment outcomes. */
export const portfolioOutcomes = [
  { claim: "Write clearly", detail: "My reader can understand my message." },
  { claim: "Write accurately", detail: "Grammar, spelling, punctuation, and information are correct." },
  { claim: "Write objectively", detail: "I distinguish facts and observations from opinions." },
  { claim: "Write professionally", detail: "Tone, organization, and format are appropriate." },
  { claim: "Write for my audience", detail: "I adjust language for patients, coworkers, and other readers." },
  { claim: "Revise my writing", detail: "I can identify problems and make meaningful improvements." },
];

/**
 * Course policy, rendered from the build specification.
 *
 * NOTE: the syllabus PDF is not present in this repository, so these values
 * could not be verified against it directly. The syllabus remains authoritative.
 */
export const coursePolicy = {
  /**
   * Weights follow the syllabus. The Brightspace gradebook currently shows a
   * FINAL category at 20% and no QUIZZES category; the syllabus is the single
   * source of truth for policy, so the syllabus figure is displayed and the
   * gradebook is what needs correcting. See docs/ENGL0150_AUTHORED_ADDITIONS.md.
   */
  grading: [
    { category: "Professionalism", weight: "20%" },
    { category: "Classwork & Homework", weight: "30%" },
    { category: "Quizzes", weight: "20%" },
    { category: "Final Portfolio", weight: "30%" },
  ],
  lateWork:
    "Work submitted within one week after the due date loses 10%. Beyond one week, 20%. Once a topic is complete, late work for that topic is not accepted.",
  quizzes:
    "Notify the instructor in advance of a known absence. If you are ill on test day, arrange a make-up before the next class. Once tests are returned, no make-up is offered.",
  majorTests:
    "A final make-up is at the instructor's discretion with valid documentation, and carries a 25-percentage-point deduction from the maximum possible score.",
  attendance:
    "The absence limit is 20% of instructional time. Late arrivals and early departures are recorded. Arriving more than 5 minutes late means the missed time is deducted from time present. Doors close 15 minutes after class begins and students are not admitted after that mark. For back-to-back double sessions, re-entry is at the end of the first 80 minutes.",
  supplies:
    "A notebook (subject or composition), black or blue ink pens, and a USB flash drive (required) for saving work in the computer lab. All instructional materials are provided by the instructor.",
  accommodations: "Contact a student advisor at Advisors@beoc.cuny.edu.",
  brightspaceSupport:
    "1-844-673-6786 or 1-518-320-1300. Monday–Friday 7am–midnight, Saturday 10am–6pm, Sunday 10am–9pm.",
};
