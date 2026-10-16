/**
 * The BEOC EHR Simulator — where it lives and how the portal links into it.
 *
 * The simulator is a separate application (github.com/mrodavis/beoc-ehr) on
 * its own subdomain. This portal has no student accounts, so it does not sign
 * learners in: it sends them to the simulator's own sign-in, or to sign-up
 * with the class code their instructor gives them. Deep links use
 * `/login?next=<page>`, which the simulator honours for paths inside `/ehr`.
 *
 * Override the host with NEXT_PUBLIC_EHR_SIMULATOR_URL (no trailing slash),
 * for example to point a preview deployment at a preview simulator.
 */

export const EHR_SIMULATOR_URL = (
  process.env.NEXT_PUBLIC_EHR_SIMULATOR_URL ?? "https://ehr.beocdigital.org"
).replace(/\/+$/, "");

/** The portal's own student guide to the simulator. */
export const EHR_SIMULATOR_GUIDE_PATH = "/ehr-simulator";

/** Sign in, optionally returning to a page inside the simulator afterwards. */
export function simulatorSignInUrl(path?: string): string {
  if (!path || path === "/ehr") return `${EHR_SIMULATOR_URL}/login`;
  return `${EHR_SIMULATOR_URL}/login?next=${encodeURIComponent(path)}`;
}

/** Create an account with a class code. */
export function simulatorSignUpUrl(code?: string): string {
  return code
    ? `${EHR_SIMULATOR_URL}/signup?code=${encodeURIComponent(code)}`
    : `${EHR_SIMULATOR_URL}/signup`;
}

/** Workspaces inside the simulator that lessons link to. */
export const SIMULATOR_PATHS = {
  home: "/ehr",
  assignments: "/ehr/assignments",
  performance: "/ehr/performance",
  patientLists: "/ehr/patient-lists",
  patients: "/ehr/patients",
  registerPatient: "/ehr/patients/new",
  schedule: "/ehr/schedule",
  censusBeds: "/ehr/adt",
  inbox: "/ehr/inbox",
  tasks: "/ehr/tasks",
  orders: "/ehr/orders",
  results: "/ehr/results",
  billing: "/ehr/billing",
  workflowTranslation: "/ehr/workflow-translation",
  account: "/ehr/account",
} as const;

export type SimulatorPath = (typeof SIMULATOR_PATHS)[keyof typeof SIMULATOR_PATHS];

/**
 * The graded simulations that ship with the simulator. Instructors assign
 * them to a class; students find them under Assignments. Titles match the
 * simulator exactly so a student can match the lesson to the screen.
 */
export interface SimulatorScenario {
  title: string;
  role: string;
  minutes: number;
  summary: string;
  programs: string[];
}

export const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    title: "New Patient Arrival: Coverage Verification and Check-In",
    role: "Front Desk / Registration",
    minutes: 15,
    summary:
      "Confirm identity with two identifiers, update registration, verify and record insurance before the visit, check the patient in from the schedule, and check them out when the visit ends.",
    programs: ["Electronic Health Records", "Medical Billing & Coding", "Medical Assisting"],
  },
  {
    title: "Hypertension Follow-Up: Rooming and Medication Reconciliation",
    role: "Medical Assistant",
    minutes: 25,
    summary:
      "Room a follow-up patient: identity, allergies, a full set of vitals with an elevated blood pressure, medication reconciliation including missed doses, the intake flowsheet, the provider's order and resulting lab, and a signed intake note.",
    programs: ["Electronic Health Records", "Medical Assisting"],
  },
  {
    title: "Charge Capture and Claim Submission",
    role: "Billing / Coding",
    minutes: 20,
    summary:
      "Capture the office visit and lab charges, point each to its diagnosis, clear the claim scrub, submit, read the payer's response, and post the payment.",
    programs: ["Electronic Health Records", "Medical Billing & Coding"],
  },
  {
    title: "Shift Start: Vital Signs and Fall Risk Screening",
    role: "CNA / Patient Care Technician",
    minutes: 15,
    summary:
      "Start the day shift: confirm identity, document vitals and a fall-risk screen on the flowsheet, read the MAR without documenting a dose, and report the score to the nurse.",
    programs: ["Patient Care Technician"],
  },
  {
    title: "Inpatient Discharge: Reconcile, Instruct, Release the Bed",
    role: "Nurse",
    minutes: 30,
    summary:
      "Work the discharge readiness checklist: reconcile medications, give instructions, sign the discharge note, confirm follow-up, and release the bed.",
    programs: ["Nursing"],
  },
];
