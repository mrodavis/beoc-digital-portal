import type { EhrDoc, EhrPayer, EhrProvider } from "@/components/sim/apps/ehr/types";
import { ehrDoc } from "@/components/sim/apps/ehr/types";

/**
 * Northstar Medical Center: the shared fiction for the in-lesson EHR
 * practice sims (the same training hospital as the BEOC EHR Simulator).
 * Everyone here is synthetic. Provider NPIs deliberately fail the NPI check
 * digit, so they cannot belong to a real provider. Phone numbers use the
 * 555-01xx range reserved for fiction.
 */

export const TODAY = "2026-10-20";

export const PROVIDERS: EhrProvider[] = [
  { id: "PRV1", name: "Amara Okafor", credentials: "MD", specialty: "Family Medicine", npi: "1047293815" },
  { id: "PRV2", name: "Daniel Reyes", credentials: "MD", specialty: "Orthopedics", npi: "1182635408" },
  { id: "PRV3", name: "Priya Natarajan", credentials: "NP", specialty: "Family Medicine", npi: "1293847561" },
];

export const PAYERS: EhrPayer[] = [
  {
    id: "PAY1",
    name: "Empire Northstar Health Plan",
    kind: "Commercial",
    authRequired: ["73721", "72148"],
    laterality: ["20610", "73100", "73110", "73600", "73610"],
    filingDays: 90,
    claimsAddress: "Claims, PO Box 4100, Albany, NY 12201",
    phone: "(800) 555-0134",
    color: "#1d4ed8",
  },
  {
    id: "PAY2",
    name: "Amberfield Health Plan",
    kind: "Commercial",
    authRequired: ["73721"],
    laterality: ["73100", "73110", "73600", "73610"],
    filingDays: 120,
    claimsAddress: "Claims, PO Box 7720, Hartford, CT 06101",
    phone: "(800) 555-0177",
    color: "#047857",
  },
  { id: "PAY3", name: "Medicare Part B", kind: "Medicare", filingDays: 365, claimsAddress: "Submitted electronically to the Medicare Administrative Contractor", phone: "(800) 555-0110", color: "#334155" },
  { id: "PAY4", name: "Medicaid", kind: "Medicaid", claimsAddress: "Submitted electronically to the state Medicaid program", phone: "(800) 555-0121", color: "#7c2d12" },
];

type Base = Pick<EhrDoc, "workspaces" | "nav" | "patients"> & Partial<EhrDoc>;

/** A Northstar practice document with sensible defaults; override anything. */
export function practice(d: Base): Record<string, unknown> {
  const doc: EhrDoc = {
    facility: "Northstar Medical Center",
    department: "Northstar Primary Care (Front Desk)",
    today: TODAY,
    clock: "09:10",
    session: { user: "student", name: "BEOC Student", role: "Front Desk", signedIn: true },
    providers: PROVIDERS,
    payers: PAYERS,
    audit: [],
    ...d,
  };
  return ehrDoc(doc);
}

/** Signatures every established patient has on file. */
export const SIGNED = { npp: "01/06/2026", aob: "01/06/2026", fin: "01/06/2026" };
