import { Program } from "@/types/program";
import { medicalBillingCoding } from "./medical-billing-coding";
import { medicalAssisting } from "./medical-assisting";
import { patientCareTechnician } from "./patient-care-technician";
import { esol } from "./esol";
import { highSchoolEquivalency } from "./high-school-equivalency";
import { tourismHospitality } from "./tourism-hospitality";
import { emt } from "./emt";
import { securityGuard } from "./security-guard";
import { osha30 } from "./osha-30";
import { pharmacyTechnician } from "./pharmacy-technician";
import { collegePreparation } from "./college-preparation";

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
  collegePreparation,
  esol,
  highSchoolEquivalency,
  pharmacyTechnician,
  osha30,
  securityGuard,
  emt,
  tourismHospitality,
];

export const programs: Record<string, Program> = Object.fromEntries(
  programList.map((p) => [p.slug, p])
);
