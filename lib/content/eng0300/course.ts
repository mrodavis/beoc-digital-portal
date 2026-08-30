/**
 * Course-level facts for ENG0300, taken from the ENG0300 Syllabus
 * (Academic Bridge, v5), which is the authoritative source for outcomes,
 * sequence, and the completion requirement.
 */

export const eng0300Course = {
  code: "ENG0300",
  title: "ENG0300 Reading Lab",
  courseTitle: "ENG0300 – Reading for Academics",
  subtitle: "Read Deeper. Think Stronger. Move Forward.",
  program: "Academic Bridge",
  basePath: "/eng0300",

  description:
    "Instruction focuses on the reading comprehension skills most critical at this level: identifying main ideas and details, making inferences, using context to determine word meaning, analyzing text structure, identifying point of view and purpose, evaluating an author's evidence and argument quality, and interpreting information presented visually or quantitatively.",

  /** TABE Reading scale score required for course completion. */
  tabeGoal: 563,

  weeks: 7,
  meetings: 14,

  /**
   * Course completion requirement, quoted from the syllabus. Displayed to
   * students so the goal on the dashboard is not mistaken for the whole story.
   */
  completionRequirement:
    "A minimum TABE Reading scale score of 563 or above AND/OR a C+ (76–79%) or better final grade.",

  /** Learning outcomes, verbatim in substance from the syllabus. */
  outcomes: [
    "Identify the main idea of a text and explain how it is supported by key details, including in longer or denser passages",
    "Summarize a text and support the summary with specific details and examples, including quotations",
    "Make logical inferences and draw conclusions, supporting them with specific details from the text",
    "Determine the meaning of unfamiliar, technical, or multi-meaning words using context clues and word roots",
    "Interpret figurative language, including metaphors, similes, and idioms, in context",
    "Describe the overall structure of a text (e.g., chronology, comparison, cause/effect, problem/solution)",
    "Compare and contrast the structure of two or more texts on a related topic",
    "Describe how a narrator's or author's point of view influences how events or ideas are presented",
    "Distinguish between fact and opinion and determine an author's primary purpose",
    "Explain how an author uses reasons and evidence to support a point, and evaluate whether that evidence is sufficient",
    "Interpret information presented visually, orally, or quantitatively (e.g., in charts, graphs, diagrams, or timelines) and connect it to the related text",
    "Integrate information from multiple texts or sources on the same topic",
  ],
} as const;

/**
 * The division of labor between this portal and the LMS. Surfaced in the UI so
 * students are never told to submit graded work here.
 */
export const brightspaceRelationship = {
  here: {
    label: "Use the Reading Lab for",
    items: [
      "Lessons and worked examples for each reading skill",
      "Ungraded practice with instant feedback",
      "TABE question strategies and pacing guidance",
      "Review before a class meeting or a progress check",
      "Study resources and reference guides",
    ],
  },
  brightspace: {
    label: "Use Brightspace for",
    items: [
      "Official assignments and submissions",
      "Graded quizzes and assessments",
      "Attendance and announcements",
      "Your grades and instructor feedback",
    ],
  },
  note:
    "Nothing you do in the Reading Lab is graded or recorded. Practice here as often as you want, then submit official work in Brightspace.",
} as const;
