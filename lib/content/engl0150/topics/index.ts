import { Topic } from "@/types/engl0150";
import { topic1 } from "./topic1";
import { topic2 } from "./topic2";
import { topic3 } from "./topic3";
import { topic4 } from "./topic4";
import { topic5 } from "./topic5";
import { topic6 } from "./topic6";
import { topic7 } from "./topic7";
import { topic8 } from "./topic8";
import { topic9 } from "./topic9";
import { topic10 } from "./topic10";
import { advancedTopics } from "./advanced";

/**
 * The ENGL0150 topics, in course sequence.
 *
 * To add a topic: create a file in this directory exporting a `Topic`, import
 * it here, and add it to the array. Routes, the landing-page course map, and
 * the spiral links all read from this list — no page component needs editing.
 *
 * Topics 3–10 and the Final Assessment are specified in the Instructor's Guide
 * and are not yet built. `plannedTopics` below keeps them visible on the course
 * map so students and instructors can see the whole arc.
 */
export const engl0150Topics: Topic[] = [topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10];

export { advancedTopics };

/** Core and advanced together, for route generation and lookup. */
export const allTopics: Topic[] = [...engl0150Topics, ...advancedTopics];

export function getTopic(number: number): Topic | undefined {
  return allTopics.find((t) => t.number === number);
}

export function getAdjacentTopics(number: number) {
  // Advanced topics form their own sequence; a student finishing Topic 10 is
  // not sent into the optional track, and an advanced topic does not link back
  // into the core one.
  const list = number >= 101 ? advancedTopics : engl0150Topics;
  const i = list.findIndex((t) => t.number === number);
  return {
    previous: i > 0 ? list[i - 1] : undefined,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined,
  };
}

/** The full course map from the Instructor's Guide, including unbuilt topics. */
export const courseMap: {
  unit: number;
  unitTitle: string;
  number: number | "final";
  title: string;
  sessions: string;
  product: string;
  built: boolean;
}[] = [
  { unit: 1, unitTitle: "Foundations of Professional Healthcare Communication", number: 1, title: "Course Introduction: Building Our Class Community", sessions: "1", product: "Professional self-introduction (writing warm-up)", built: true },
  { unit: 1, unitTitle: "Foundations of Professional Healthcare Communication", number: 2, title: "Foundations: Clear and Professional Communication", sessions: "1–2", product: "Professional patient/staff communication", built: true },
  { unit: 2, unitTitle: "Clinical Documentation", number: 3, title: "Writing About Patients: Objective Documentation", sessions: "2", product: "Brief patient encounter note", built: true },
  { unit: 2, unitTitle: "Clinical Documentation", number: 4, title: "SOAP Notes: Organizing Clinical Information", sessions: "1", product: "Basic SOAP note", built: true },
  { unit: 2, unitTitle: "Clinical Documentation", number: 5, title: "Handoffs, Messages & Professional Communication", sessions: "1", product: "Written handoff / SBAR message", built: true },
  { unit: 3, unitTitle: "Patient Communication", number: 6, title: "Writing Clear Patient Instructions", sessions: "2", product: "Patient instruction sheet", built: true },
  { unit: 3, unitTitle: "Patient Communication", number: 7, title: "Patient Messages, Reminders & Follow-Up", sessions: "1–2", product: "Patient portal message or reminder", built: true },
  { unit: 3, unitTitle: "Patient Communication", number: 8, title: "Referrals, Prior Authorizations & Requests", sessions: "1–2", product: "Referral / prior authorization communication", built: true },
  { unit: 4, unitTitle: "Workplace & Team Communication", number: 9, title: "Professional Emails & Workplace Messages", sessions: "2", product: "Professional email", built: true },
  { unit: 5, unitTitle: "Revision, AI & Integrated Communication", number: 10, title: "Proofreading, Revision & AI as a Writing Coach", sessions: "2", product: "Revised healthcare communication", built: true },
  { unit: 6, unitTitle: "Final", number: "final", title: "Integrated Healthcare Communication & Grammar", sessions: "1", product: "3–4 original writings from one case + grammar/spelling quiz", built: true },
];
