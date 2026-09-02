import { Topic } from "@/types/engl0150";

/**
 * TOPIC 1 — Course Introduction: Building Our Class Community (1 session)
 *
 * Content mirrors the finished Brightspace Week 1 page, including its voice.
 *
 * NOTE ON SOURCES: the Instructor's Guide supplies no Essential Question,
 * Grammar Focus, or Cumulative Workplace Product for this orientation session.
 * All three are authored here from the guide's own Topic 1 material — the
 * "Questions to think about", the Topic 2 diagnostic categories, and the
 * writing warm-up the course map names as this session's product. Recorded in
 * docs/ENGL0150_AUTHORED_ADDITIONS.md for instructor review.
 */
export const topic1: Topic = {
  number: 1,
  slug: "1",
  title: "Course Introduction: Building Our Class Community",
  unit: { number: 1, title: "Foundations of Professional Healthcare Communication" },
  sessions: "1",
  goals: ["professional-writing"],

  intro: [
    "Welcome to Writing and Communication for Healthcare Professionals. This session is about getting to know the course, getting comfortable with your classmates and instructors, and beginning to think about why communication and writing matter in healthcare.",
    "Do not worry about getting everything right today. Your first writing sample is a starting point, not a test.",
  ],

  essentialQuestion:
    "Why does writing matter in healthcare, and how does anyone actually get better at it?",

  concepts: [
    "Describe the purpose of the course and why strong writing matters in healthcare",
    "Identify the types of writing used in healthcare workplaces",
    "Explain how practice, feedback, and revision build a stronger writer",
    "Locate course materials and assignments in Brightspace",
    "Complete a short writing sample as a baseline",
  ],

  grammar: [
    {
      heading: "What we will work on this term",
      points: [
        "Explicit grammar instruction begins next session with a diagnostic. Nothing is graded and nothing is expected of you today.",
        "Over the term we work on: complete sentences, and fixing fragments and run-ons",
        "Subject–verb agreement, and pronoun–antecedent agreement",
        "Punctuation and capitalization",
        "Clear pronoun reference — making sure the reader knows who 'she' or 'it' means",
        "Word choice, including the pairs people mix up: patient and patience, affect and effect, your and you're",
      ],
    },
    {
      heading: "How the grammar work runs",
      points: [
        "Each skill is introduced once and then revisited in harder contexts — this is called spiraling, and it is deliberate",
        "Subject–verb agreement introduced in Topic 2 comes back in a SOAP note, a patient message, and a workplace email",
        "You are not expected to master a skill the first time you meet it",
      ],
    },
  ],

  wordListNumber: 1,

  practice: [
    {
      kind: "word-bank",
      title: "Words to know",
      listNumber: 1,
    },
  ],

  product: {
    label: "Professional self-introduction (writing warm-up)",
    description:
      "Two short pieces of writing, both submitted in Amplify. Neither is graded for grammar — they are a starting point so you and your instructors can see where you begin. First, introduce yourself to the class. Then answer the writing warm-up prompt below. Write honestly and in your own words.",
    scenario:
      "Part 1 — Introduce yourself to your classmates and instructors: your name, the program you are in, and one thing you hope to be better at by the end of this course. Three or four sentences.\n\nPart 2 — The writing warm-up: Think about a time when someone communicated something to you clearly, or when a message was confusing. What made the communication effective or ineffective? This is not a grammar test.",
  },

  reflection: [
    "Why does good writing matter in healthcare?",
    "What makes communication clear, accurate, and professional?",
    "What does it mean to become a better writer?",
    "How can feedback and revision help me improve?",
  ],

  beforeYouLeave: [
    "Completed the Brightspace orientation activities",
    "Participated in the class community activity",
    "Completed the Writing Warm-Up in Amplify",
    "Reviewed the Writing Portfolio information",
  ],

  closingLine:
    "You are not expected to be a perfect writer when you begin this course. You are here to become a better one.",
};
