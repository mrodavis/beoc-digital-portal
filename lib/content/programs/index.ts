import { Program } from "@/types/program";
import { medicalBillingCoding } from "./medical-billing-coding";
import { medicalAssisting } from "./medical-assisting";
import { patientCareTechnician } from "./patient-care-technician";

/**
 * Career program registry.
 *
 * Programs listed here are reachable in the portal. A program appears on the
 * home page only when `status` in app/page.tsx marks it available, so a
 * program can be built and reviewed here before it is announced.
 */
export const programList: Program[] = [
  medicalBillingCoding,
  medicalAssisting,
  patientCareTechnician,
];

export const programs: Record<string, Program> = Object.fromEntries(
  programList.map((p) => [p.slug, p])
);
