import { RoadmapWeek } from "@/types/eng0300";

/**
 * The 7-week / 14-meeting sequence from the ENG0300 syllabus course outline.
 *
 * Homework entries name the assigned resource and page range from the syllabus.
 * They are references only — the portal does not host those workbook pages,
 * which are copyrighted commercial materials distributed in class.
 * No calendar dates are hard-coded; terms vary.
 */
export const eng0300Roadmap: RoadmapWeek[] = [
  {
    week: 1,
    focus: "Main Ideas & Details",
    skill: "main-ideas",
    meetings: [
      {
        day: 1,
        topic: "Course Introduction & Diagnostic — Identifying Central Themes",
        inClass:
          "Review syllabus, policies, and the program goal; diagnostic reading passage; model identifying stated main ideas.",
        homework: [
          "Essential Education TABE Academy: assigned reading module",
          "Scoreboost for TABE Level M: Reading, pp. 31–34",
        ],
      },
      {
        day: 2,
        topic: "Summarizing with Key Supporting Details",
        inClass:
          "Practice identifying key details that support a stated main idea in moderately complex passages; group summary-writing.",
        homework: [
          "TABE Mastery Reading: Level M, pp. 60–65",
          "CommonLit: assigned passage and summary",
        ],
      },
    ],
  },
  {
    week: 2,
    focus: "Inferences & Conclusions",
    skill: "inferences",
    meetings: [
      {
        day: 1,
        topic: "Making Inferences from Explicit Detail",
        inClass:
          "Model close reading; drawing logical inferences supported directly by text evidence.",
        homework: ["Scoreboost for TABE Level M: Reading, pp. 19–22"],
      },
      {
        day: 2,
        topic: "Drawing Conclusions Across Longer Texts",
        inClass:
          "Small-group practice on longer, denser passages; citing evidence to support inferences.",
        homework: [
          "TABE Mastery Reading: Level M, pp. 38–43",
          "Instructor-provided inference passage and questions (handout)",
        ],
      },
    ],
  },
  {
    week: 3,
    focus: "Vocabulary in Context",
    skill: "vocabulary",
    meetings: [
      {
        day: 1,
        topic: "Context Clues and Word Roots",
        inClass:
          "Strategies for decoding unfamiliar, technical, or multi-meaning words using surrounding context and word roots.",
        homework: [
          "Essential Education TABE Academy: vocabulary module",
          "Scoreboost for TABE Level M: Reading, pp. 7–11",
        ],
      },
      {
        day: 2,
        topic: "Figurative Language and Multi-Meaning Words",
        inClass:
          "Identify metaphors, similes, and idioms in context; practice with multi-meaning words.",
        homework: [
          "TABE Mastery Reading: Level M, pp. 28–33",
          "CommonLit: vocabulary-focused passage",
        ],
      },
    ],
  },
  {
    week: 4,
    focus: "Text Structure & Organization",
    skill: "text-structure",
    meetings: [
      {
        day: 1,
        topic:
          "Recognizing Structure (chronology, comparison, cause/effect, problem/solution)",
        inClass:
          "Analyze the structure of a single passage; label transitions and organizational signals.",
        homework: ["Scoreboost for TABE Level M: Reading, pp. 43–49"],
      },
      {
        day: 2,
        topic: "Comparing Structure Across Two Texts — Progress Check-In",
        inClass:
          "Compare and contrast the structure of two texts on a related topic; mid-course progress review.",
        homework: ["TABE Mastery Reading: Level M, pp. 80–85"],
      },
    ],
  },
  {
    week: 5,
    focus: "Point of View & Purpose",
    skill: "point-of-view",
    meetings: [
      {
        day: 1,
        topic: "Narrator / Speaker Point of View",
        inClass:
          "Analyze how point of view shapes how events are described; fact versus opinion practice.",
        homework: ["Scoreboost for TABE Level M: Reading, pp. 50–53"],
      },
      {
        day: 2,
        topic: "Comparing Point of View Across Texts",
        inClass:
          "Compare point of view across two texts covering the same event or topic.",
        homework: [
          "TABE Mastery Reading: Level M, pp. 86–93",
          "Instructor-provided paired-perspective passage and questions (handout)",
        ],
      },
    ],
  },
  {
    week: 6,
    focus: "Evidence & Argument Quality",
    skill: "evidence",
    meetings: [
      {
        day: 1,
        topic: "Identifying an Author's Reasons and Evidence",
        inClass:
          "Identify which evidence supports which claim in a text; introduce evaluating sufficiency of evidence.",
        homework: ["Scoreboost for TABE Level M: Reading, pp. 71–74"],
      },
      {
        day: 2,
        topic: "Evaluating Validity and Identifying Weak Arguments",
        inClass:
          "Practice evaluating whether an author's argument is well-supported; identify gaps in reasoning.",
        homework: ["TABE Mastery Reading: Level M, pp. 124–132"],
      },
    ],
  },
  {
    week: 7,
    focus: "Visual & Data Integration + Cumulative Review",
    skill: "visual-data",
    meetings: [
      {
        day: 1,
        topic: "Connecting Text to Charts, Graphs, and Diagrams",
        inClass:
          "Practice interpreting charts, graphs, and diagrams alongside related text.",
        homework: ["Scoreboost for TABE Level M: Reading, pp. 63–66"],
      },
      {
        day: 2,
        topic: "Cumulative Review and Progress Assessment",
        inClass:
          "Integrated review across all seven skill areas; TABE progress practice test.",
        homework: [
          "Reflect on progress toward the 563+ goal",
          "Complete post-assessment reflection",
        ],
      },
    ],
  },
];
