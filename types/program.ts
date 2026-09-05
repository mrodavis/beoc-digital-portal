import { Lesson } from "./lesson";

/**
 * Career program content model.
 *
 * The MS Office and OAP courses each grew their own near-identical module
 * type and set of routes. The career programs share one model and one set of
 * dynamic routes instead, so adding a program means adding content rather
 * than copying page components.
 */

export interface ProgramModule {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  /** Shown on the module page as "What You'll Learn". */
  whatYoullLearn: string[];
  /** The workplace situation the module's lessons are built around. */
  scenario: string;
}

export interface Program {
  slug: string;
  /**
   * Which section of the portal this belongs to. Drives grouping on the
   * progress page. Previously every program was assumed to be healthcare,
   * which stopped being true once ESOL and OSHA 30 joined the list.
   */
  group: "Academic Programs" | "Healthcare" | "Technical Programs";
  title: string;
  shortTitle: string;
  icon: string;
  /** Card and landing-page summary. */
  description: string;
  /** A fuller paragraph for the program landing page. */
  overview: string;
  /** Tailwind gradient classes for the program's header band. */
  accent: string;
  /** What a graduate should be able to do. */
  outcomes: string[];
  /** Roles this program prepares a learner to apply for. */
  careerRoles: string[];
  /**
   * What this coursework is and is not.
   *
   * Several of these programs lead to credentials that require accredited
   * instruction, supervised clinical hours, or a state licence that a web
   * course cannot itself provide. Saying so plainly on every program page is
   * the honest thing to do and prevents a learner from believing they have
   * completed a requirement they have not.
   */
  credentialNote: string;
  /** Certifications this coursework helps prepare for, if any. */
  relatedCertifications?: { name: string; body: string; note?: string }[];
  modules: ProgramModule[];
}
