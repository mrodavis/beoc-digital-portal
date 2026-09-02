import { Topic } from "@/types/engl0150";

/**
 * TOPIC 1 — Course Introduction: Building Our Class Community (1 session)
 *
 * Content mirrors the finished Brightspace Week 1 page, including its voice.
 *
 * The Instructor's Guide does not supply an Essential Question, a Grammar
 * Focus, or a Cumulative Workplace Product for this orientation session. Those
 * three sections render as visible placeholders rather than being invented —
 * see the build report.
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

  essentialQuestion: {
    note: "The Instructor's Guide does not state an Essential Question for the orientation session. The 'Questions to think about' below are used in its place on the Brightspace Week 1 page. Confirm whether one should be added for consistency with Topics 2–10.",
  },

  concepts: [
    "Describe the purpose of the course and why strong writing matters in healthcare",
    "Identify the types of writing used in healthcare workplaces",
    "Explain how practice, feedback, and revision build a stronger writer",
    "Locate course materials and assignments in Brightspace",
    "Complete a short writing sample as a baseline",
  ],

  grammar: {
    note: "The Instructor's Guide assigns no Grammar Focus to the orientation session; explicit grammar instruction begins with the Topic 2 diagnostic. Confirm whether this section should stay empty or preview the diagnostic.",
  },

  wordListNumber: 1,

  practice: [
    {
      kind: "word-bank",
      title: "Words to know",
      listNumber: 1,
    },
  ],

  product: {
    note: "The guide lists a professional self-introduction writing warm-up for this session rather than a cumulative workplace product. The warm-up prompt appears under 'Think about' below. Confirm whether Topic 1 should carry a formal workplace product.",
  },

  reflection: [
    "Why does good writing matter in healthcare?",
    "What makes communication clear, accurate, and professional?",
    "What does it mean to become a better writer?",
    "How can feedback and revision help me improve?",
    "Writing warm-up: Think about a time when someone communicated something to you clearly — or when a message was confusing. What made the communication effective or ineffective? Write honestly and in your own words. This is not a grammar test.",
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
