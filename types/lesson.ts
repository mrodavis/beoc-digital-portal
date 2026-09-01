/**
 * Content model for the portal's lesson-based courses (MS Office, OAP, EHR,
 * and the career programs).
 *
 * DESIGN NOTE
 * -----------
 * The original model was built around screenshots: a heading, a one-line
 * caption, and a picture. That teaches a click path but not a decision. The
 * blocks added below — `scenario`, `worked-example`, `key-terms`, `table` —
 * exist so a lesson can do what the ENG0300 Reading Lab does: frame a real
 * situation, model the reasoning out loud, and name the rule the learner
 * should carry to the next task.
 *
 * Every field added here is optional so the existing lesson files keep
 * compiling while they are upgraded course by course.
 */

export type ContentBlock =
  | {
      type: "paragraph";
      text: string;
    }

  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }

  | {
      type: "list";
      items: string[];
      ordered?: boolean;
      start?: number;
    }

  | {
      /**
       * `version` flags Microsoft 365 and Office 2024 differences — the
       * screenshots in this portal were captured in 2019, and where the
       * current release moved a command the learner needs to be told.
       */
      type: "callout";
      variant: "info" | "warning" | "success" | "version";
      text: string;
    }

  | {
      type: "tip";
      text: string;
    }

  | {
      type: "code";
      code: string;
      language?: string;
    }

  | {
      type: "download";
      name: string;
      url: string;
    }

  | {
      /**
       * Opens a lesson by putting the learner in a specific job situation, so
       * the procedure that follows has a reason to exist. Modeled on the
       * "Real-World Scenario" openers in the OAP courses.
       */
      type: "scenario";
      title?: string;
      /** e.g. "You are the front-desk assistant at Lakeside Medical." */
      role?: string;
      text: string;
      /** What the learner should be able to produce by the end. */
      task?: string;
    }

  | {
      /**
       * A think-aloud walkthrough: the moves an experienced user makes and,
       * critically, *why* each one. This is the block that turns a click path
       * into instruction.
       */
      type: "worked-example";
      title: string;
      /** The concrete job being done. */
      task: string;
      steps: {
        move: string;
        /** The reasoning behind the move — never a restatement of it. */
        why: string;
      }[];
      /** What the learner ends up with. */
      result: string;
      /** The transferable rule. */
      takeaway?: string;
    }

  | {
      type: "key-terms";
      terms: {
        term: string;
        definition: string;
      }[];
    }

  | {
      type: "table";
      caption?: string;
      columns: string[];
      rows: string[][];
    }

  | {
      type: "knowledge-check";
      question: string;
      options: string[];
      correctIndex: number;
      /** Why the key is right. Shown after the learner answers. */
      explanation?: string;
      /**
       * Per-option reasoning, parallel to `options`. A wrong answer should
       * explain the specific misunderstanding it represents, not just say
       * "incorrect."
       */
      optionRationales?: string[];
    };

export interface LessonSection {
  heading: string;
  blocks: ContentBlock[];
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  /** "By the end of this lesson you can…" — shown above the video. */
  objectives?: string[];
  videoUrl?: string;
  videoUrls?: string[];
  slides?: { src: string; alt: string }[];
  duration?: string;
  sections?: LessonSection[];
  challenge?: ContentBlock[];
  practiceFiles?: {
    name: string;
    url: string;
  }[];
}
