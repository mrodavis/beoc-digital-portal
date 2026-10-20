/**
 * The CPOE order catalog and the clinical decision support rules that run on
 * it. Doses, routes and frequencies are common adult order sentences used for
 * training; interaction and allergy rules are limited to well-established
 * pairs (an NSAID with warfarin; a penicillin with a penicillin allergy).
 */

export type MedItem = {
  id: string;
  name: string;
  /** Generic drug name, used for duplicate checks. */
  drug: string;
  /** Allergy class for drug-allergy checks. */
  cls?: string;
  /** Drug group for interaction checks. */
  group?: string;
  doses: string[];
  routes: string[];
  freqs: string[];
  durations: string[];
  /** Shown as an informational formulary alert on every order. */
  formulary?: string;
};

export type LabItem = { id: string; name: string; code?: string; specimen?: string };
export type ImgItem = { id: string; name: string; code?: string; laterality?: boolean; auth?: boolean };
export type RefItem = { id: string; name: string };

export const MEDS: MedItem[] = [
  { id: "lisinopril", name: "Lisinopril tablet", drug: "lisinopril", group: "ACE inhibitor", doses: ["10 mg", "20 mg"], routes: ["Oral"], freqs: ["Once daily"], durations: ["30 days", "90 days"] },
  { id: "metformin", name: "Metformin tablet", drug: "metformin", doses: ["500 mg", "1000 mg"], routes: ["Oral"], freqs: ["Twice daily with meals", "Once daily with evening meal"], durations: ["30 days", "90 days"] },
  { id: "atorvastatin", name: "Atorvastatin tablet", drug: "atorvastatin", group: "statin", doses: ["10 mg", "20 mg", "40 mg"], routes: ["Oral"], freqs: ["Once daily"], durations: ["30 days", "90 days"] },
  { id: "amoxicillin", name: "Amoxicillin capsule", drug: "amoxicillin", cls: "penicillins", doses: ["500 mg"], routes: ["Oral"], freqs: ["Every 8 hours"], durations: ["10 days"] },
  { id: "ibuprofen", name: "Ibuprofen tablet", drug: "ibuprofen", group: "NSAID", doses: ["400 mg", "600 mg"], routes: ["Oral"], freqs: ["Every 6 hours as needed for pain", "Every 8 hours as needed for pain"], durations: ["5 days", "10 days"] },
  { id: "acetaminophen", name: "Acetaminophen tablet", drug: "acetaminophen", doses: ["500 mg", "650 mg"], routes: ["Oral"], freqs: ["Every 6 hours as needed for pain"], durations: ["5 days", "10 days"], formulary: "Formulary: preferred generic (Tier 1). No action needed." },
  { id: "ketorolac", name: "Ketorolac injection", drug: "ketorolac", group: "NSAID", doses: ["30 mg", "60 mg"], routes: ["Intramuscular"], freqs: ["Once in clinic"], durations: ["Once"] },
  { id: "ceftriaxone", name: "Ceftriaxone injection", drug: "ceftriaxone", doses: ["500 mg", "1 g"], routes: ["Intramuscular"], freqs: ["Once in clinic"], durations: ["Once"] },
  { id: "albuterol", name: "Albuterol HFA inhaler 90 mcg/actuation", drug: "albuterol", doses: ["2 puffs"], routes: ["Inhalation"], freqs: ["Every 4 to 6 hours as needed for wheezing"], durations: ["30 days"] },
];

export const LABS: LabItem[] = [
  { id: "cbc", name: "CBC with differential", code: "85025", specimen: "Blood" },
  { id: "bmp", name: "Basic metabolic panel", code: "80048", specimen: "Blood" },
  { id: "cmp", name: "Comprehensive metabolic panel", code: "80053", specimen: "Blood" },
  { id: "lipid", name: "Lipid panel", code: "80061", specimen: "Blood" },
  { id: "a1c", name: "Hemoglobin A1c", code: "83036", specimen: "Blood" },
  { id: "uacr", name: "Urine albumin/creatinine ratio", specimen: "Urine" },
  { id: "ua", name: "Urinalysis, dipstick", code: "81002", specimen: "Urine" },
  { id: "strep", name: "Rapid strep test", code: "87880", specimen: "Throat swab" },
];

export const IMAGING: ImgItem[] = [
  { id: "cxr2", name: "Chest X-ray, 2 views", code: "71046" },
  { id: "xr-ankle", name: "X-ray ankle, 2 views", code: "73600", laterality: true },
  { id: "xr-wrist", name: "X-ray wrist, complete, 3+ views", code: "73110", laterality: true },
  { id: "mri-knee", name: "MRI knee without contrast", code: "73721", laterality: true, auth: true },
  { id: "mri-lspine", name: "MRI lumbar spine without contrast", code: "72148", auth: true },
];

export const REFERRALS: RefItem[] = [
  { id: "cardiology", name: "Cardiology consultation" },
  { id: "orthopedics", name: "Orthopedics consultation" },
  { id: "pt", name: "Physical therapy evaluation and treatment" },
  { id: "endocrinology", name: "Endocrinology consultation" },
];

export const ORDER_SETS: { id: string; name: string; items: { kind: "lab" | "img"; item: string }[] }[] = [
  { id: "dm-fu", name: "Diabetes follow-up", items: [{ kind: "lab", item: "a1c" }, { kind: "lab", item: "cmp" }, { kind: "lab", item: "lipid" }, { kind: "lab", item: "uacr" }] },
  { id: "htn-fu", name: "Hypertension follow-up", items: [{ kind: "lab", item: "bmp" }, { kind: "lab", item: "lipid" }] },
  { id: "adult-physical", name: "Adult annual physical", items: [{ kind: "lab", item: "cbc" }, { kind: "lab", item: "cmp" }, { kind: "lab", item: "lipid" }] },
];

/** Drug pairs with a major interaction in this catalog. */
export const INTERACTIONS: { a: string; b: string; text: string }[] = [
  { a: "warfarin", b: "NSAID", text: "NSAIDs taken with warfarin increase the risk of serious bleeding, including gastrointestinal bleeding." },
];

export const PRIORITIES = ["Routine", "Urgent", "STAT"];
export const ORDER_MODES = ["Standard", "Verbal (read back)", "Telephone (read back)"];
export const LATERALITY = ["Not applicable", "Left", "Right", "Bilateral"];
export const OVERRIDE_REASONS = [
  "Benefit outweighs risk (provider aware)",
  "Patient has tolerated this medication before",
  "Will monitor closely",
  "Documented reaction is an intolerance, not an allergy",
];
export const ALERT_ACTIONS = ["Cancel this order", "Override and keep the order", "Acknowledge"];

export const ALL_DOSES = Array.from(new Set(MEDS.flatMap((m) => m.doses)));
export const ALL_ROUTES = Array.from(new Set(MEDS.flatMap((m) => m.routes)));
export const ALL_FREQS = Array.from(new Set(MEDS.flatMap((m) => m.freqs)));
export const ALL_DURATIONS = Array.from(new Set(MEDS.flatMap((m) => m.durations)));

export function medItem(id: string) {
  return MEDS.find((m) => m.id === id);
}
export function labItem(id: string) {
  return LABS.find((m) => m.id === id);
}
export function imgItem(id: string) {
  return IMAGING.find((m) => m.id === id);
}
export function refItem(id: string) {
  return REFERRALS.find((m) => m.id === id);
}
