/**
 * BEOC's TABE / placement requirements, one entry per beocdigital program page.
 *
 * Source: the "TABE / Placement Requirement Chart" on BEOC's TABE Assessment
 * page (https://sunybeoc.org/tabe_assessment/), read October 21, 2026. BEOC
 * sets these numbers, not this site, so when BEOC changes its chart, change
 * this file to match it and nothing else. Scores are TABE scale scores; the
 * chart does not name a TABE version (the page's practice links are for
 * TABE 13/14, which keeps the TABE 11/12 scale).
 *
 * Rows on BEOC's chart with no beocdigital page are left out:
 * "Electrical Level 1" (listed as TBA).
 *
 * Keys are program slugs from lib/content/programs, plus "office-assistant"
 * for the OAP path at /learning-paths/office-assistant.
 */

export const BEOC_TABE_URL = "https://sunybeoc.org/tabe_assessment/";

export type TabeRequirement =
  | {
      /** A minimum score the program requires. */
      kind: "minimum";
      /** The program's name exactly as BEOC's chart writes it. */
      beocProgram: string;
      reading: string;
      math?: string;
    }
  | {
      /** A placement score range (HSE). */
      kind: "range";
      beocProgram: string;
      reading: string;
      math?: string;
    }
  | {
      /** A placement test with no score listed (ESOL, College Prep). */
      kind: "placement";
      beocProgram: string;
      /** What the program is placed with, in plain words. */
      test: string;
      /** One plain sentence on how BEOC places students in this program. */
      detail: string;
    };

export const tabeRequirements: Record<string, TabeRequirement> = {
  "medical-assisting": {
    kind: "minimum",
    beocProgram: "Medical Assisting",
    reading: "563",
  },
  "medical-billing-coding": {
    kind: "minimum",
    beocProgram: "Medical Billing & Coding",
    reading: "576",
  },
  "patient-care-technician": {
    kind: "minimum",
    beocProgram: "Patient Care Technician",
    reading: "563",
  },
  "pharmacy-technician": {
    kind: "minimum",
    beocProgram: "Pharmacy Technician",
    reading: "576",
    math: "596",
  },
  emt: {
    kind: "minimum",
    beocProgram: "Emergency Medical Technician",
    reading: "576",
    math: "596",
  },
  "office-assistant": {
    kind: "minimum",
    beocProgram: "Office Administrative Professional",
    reading: "520",
  },
  "tourism-hospitality": {
    kind: "minimum",
    beocProgram: "Tourism & Hospitality Operations",
    reading: "563",
    math: "550",
  },
  "osha-30": {
    kind: "minimum",
    beocProgram: "OSHA Certification",
    reading: "501",
  },
  "security-guard": {
    kind: "minimum",
    beocProgram: "Security Guard Training",
    reading: "501",
  },
  "high-school-equivalency": {
    kind: "range",
    beocProgram: "Beginning HSE / Pre-HSE / HSE Prep",
    reading: "442–480",
    math: "449–480",
  },
  esol: {
    kind: "placement",
    beocProgram: "ESOL",
    test: "TABE CLAS-E",
    detail:
      "BEOC places ESOL students with the TABE CLAS-E placement test, and BEOC’s chart lists no minimum score for ESOL.",
  },
  "college-preparation": {
    kind: "placement",
    beocProgram: "College Prep",
    test: "Reading placement",
    detail:
      "For College Prep, BEOC uses a reading placement only and places you based on your results.",
  },
};
