/**
 * The training encoder's code set: a small, curated subset of ICD-10-CM,
 * CPT and HCPCS Level II used by the Intro to EHR practice sims.
 *
 * Accuracy over breadth. Every code here is a real code with its real
 * meaning; instructional notes are shown only where they are certain and are
 * marked as partial lists. CPT entries are short plain-language summaries
 * written for training, never the AMA's descriptors. Sims may only use codes
 * that appear here; the claim scrubber flags anything else.
 */

/* ------------------------------------------------------------------ */
/* ICD-10-CM                                                           */
/* ------------------------------------------------------------------ */

export type IcdNoteKind = "includes" | "inclusion" | "excludes1" | "excludes2" | "codeAlso" | "useAdditional" | "codeFirst" | "note";

export type IcdNote = { kind: IcdNoteKind; items: string[]; partial?: boolean };

export type IcdNode = {
  code: string;
  title: string;
  notes?: IcdNote[];
  children?: IcdNode[];
};

export type IcdCategory = IcdNode & {
  chapter: string;
  block?: { title: string; range?: string; notes?: IcdNote[] };
  /** 7th characters that apply to every code in the category. */
  seventh?: { char: string; label: string }[];
};

const ENCOUNTER_7TH = [
  { char: "A", label: "initial encounter" },
  { char: "D", label: "subsequent encounter" },
  { char: "S", label: "sequela" },
];

const FRACTURE_7TH = [
  { char: "A", label: "initial encounter for closed fracture" },
  { char: "B", label: "initial encounter for open fracture type I or II" },
  { char: "C", label: "initial encounter for open fracture type IIIA, IIIB, or IIIC" },
  { char: "D", label: "subsequent encounter for closed fracture with routine healing" },
  { char: "E", label: "subsequent encounter for open fracture type I or II with routine healing" },
  { char: "F", label: "subsequent encounter for open fracture type IIIA, IIIB, or IIIC with routine healing" },
  { char: "G", label: "subsequent encounter for closed fracture with delayed healing" },
  { char: "H", label: "subsequent encounter for open fracture type I or II with delayed healing" },
  { char: "J", label: "subsequent encounter for open fracture type IIIA, IIIB, or IIIC with delayed healing" },
  { char: "K", label: "subsequent encounter for closed fracture with nonunion" },
  { char: "M", label: "subsequent encounter for open fracture type I or II with nonunion" },
  { char: "N", label: "subsequent encounter for open fracture type IIIA, IIIB, or IIIC with nonunion" },
  { char: "P", label: "subsequent encounter for closed fracture with malunion" },
  { char: "Q", label: "subsequent encounter for open fracture type I or II with malunion" },
  { char: "R", label: "subsequent encounter for open fracture type IIIA, IIIB, or IIIC with malunion" },
  { char: "S", label: "sequela" },
];

const CH_INJURY = "Chapter 19: Injury, poisoning and certain other consequences of external causes (S00-T88)";
const CH_ENDO = "Chapter 4: Endocrine, nutritional and metabolic diseases (E00-E89)";
const CH_CIRC = "Chapter 9: Diseases of the circulatory system (I00-I99)";
const CH_RESP = "Chapter 10: Diseases of the respiratory system (J00-J99)";
const CH_MSK = "Chapter 13: Diseases of the musculoskeletal system and connective tissue (M00-M99)";
const CH_GU = "Chapter 14: Diseases of the genitourinary system (N00-N99)";
const CH_SYMP = "Chapter 18: Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified (R00-R99)";
const CH_Z = "Chapter 21: Factors influencing health status and contact with health services (Z00-Z99)";

const INJURY_INCLUDES = (site: string): IcdNote => ({
  kind: "includes",
  items: [
    `avulsion of joint or ligament of ${site}`,
    `laceration of cartilage, joint or ligament of ${site}`,
    `sprain of cartilage, joint or ligament of ${site}`,
    `traumatic hemarthrosis of joint or ligament of ${site}`,
    `traumatic rupture of joint or ligament of ${site}`,
    `traumatic subluxation of joint or ligament of ${site}`,
    `traumatic tear of joint or ligament of ${site}`,
  ],
});

export const ICD_CATEGORIES: IcdCategory[] = [
  {
    code: "E10",
    title: "Type 1 diabetes mellitus",
    chapter: CH_ENDO,
    block: { title: "Diabetes mellitus", range: "E08-E13" },
    notes: [{ kind: "excludes1", items: ["type 2 diabetes mellitus (E11.-)"], partial: true }],
    children: [{ code: "E10.9", title: "Type 1 diabetes mellitus without complications" }],
  },
  {
    code: "E11",
    title: "Type 2 diabetes mellitus",
    chapter: CH_ENDO,
    block: { title: "Diabetes mellitus", range: "E08-E13" },
    notes: [
      { kind: "includes", items: ["diabetes (mellitus) due to insulin secretory defect", "diabetes NOS", "insulin resistant diabetes (mellitus)"] },
      { kind: "useAdditional", items: ["code to identify control using: insulin (Z79.4)", "oral antidiabetic drugs (Z79.84)", "oral hypoglycemic drugs (Z79.84)"], partial: true },
      {
        kind: "excludes1",
        items: [
          "diabetes mellitus due to underlying condition (E08.-)",
          "drug or chemical induced diabetes mellitus (E09.-)",
          "gestational diabetes (O24.4-)",
          "neonatal diabetes mellitus (P70.2)",
          "postpancreatectomy diabetes mellitus (E13.-)",
          "postprocedural diabetes mellitus (E13.-)",
          "secondary diabetes mellitus NEC (E13.-)",
          "type 1 diabetes mellitus (E10.-)",
        ],
      },
    ],
    children: [
      { code: "E11.6", title: "Type 2 diabetes mellitus with other specified complications", children: [{ code: "E11.65", title: "Type 2 diabetes mellitus with hyperglycemia" }] },
      { code: "E11.9", title: "Type 2 diabetes mellitus without complications" },
    ],
  },
  {
    code: "E78",
    title: "Disorders of lipoprotein metabolism and other lipidemias",
    chapter: CH_ENDO,
    children: [{ code: "E78.5", title: "Hyperlipidemia, unspecified" }],
  },
  {
    code: "I10",
    title: "Essential (primary) hypertension",
    chapter: CH_CIRC,
    block: { title: "Hypertensive diseases" },
    notes: [
      { kind: "includes", items: ["high blood pressure", "hypertension (arterial) (benign) (essential) (malignant) (primary) (systemic)"] },
      { kind: "excludes1", items: ["hypertensive disease complicating pregnancy, childbirth and the puerperium (O10-O11, O13-O16)"] },
      { kind: "excludes2", items: ["essential (primary) hypertension involving vessels of brain (I60-I69)", "essential (primary) hypertension involving vessels of eye (H35.0-)"] },
    ],
  },
  {
    code: "I48",
    title: "Atrial fibrillation and flutter",
    chapter: CH_CIRC,
    children: [{ code: "I48.9", title: "Unspecified atrial fibrillation and atrial flutter", children: [{ code: "I48.91", title: "Unspecified atrial fibrillation" }] }],
  },
  {
    code: "J02",
    title: "Acute pharyngitis",
    chapter: CH_RESP,
    block: { title: "Acute upper respiratory infections", range: "J00-J06" },
    notes: [
      { kind: "excludes1", items: ["acute laryngopharyngitis (J06.0)", "peritonsillar abscess (J36)", "pharyngeal abscess (J39.1)", "retropharyngeal abscess (J39.0)"] },
      { kind: "excludes2", items: ["chronic pharyngitis (J31.2)"] },
    ],
    children: [
      { code: "J02.0", title: "Streptococcal pharyngitis" },
      { code: "J02.9", title: "Acute pharyngitis, unspecified" },
    ],
  },
  {
    code: "J12",
    title: "Viral pneumonia, not elsewhere classified",
    chapter: CH_RESP,
    block: { title: "Influenza and pneumonia", range: "J09-J18" },
    children: [{ code: "J12.9", title: "Viral pneumonia, unspecified" }],
  },
  {
    code: "J15",
    title: "Bacterial pneumonia, not elsewhere classified",
    chapter: CH_RESP,
    block: { title: "Influenza and pneumonia", range: "J09-J18" },
    children: [{ code: "J15.9", title: "Unspecified bacterial pneumonia" }],
  },
  {
    code: "J18",
    title: "Pneumonia, unspecified organism",
    chapter: CH_RESP,
    block: { title: "Influenza and pneumonia", range: "J09-J18" },
    notes: [{ kind: "excludes2", items: ["aspiration pneumonia NOS (J69.0)", "lipid pneumonia (J69.1)"], partial: true }],
    children: [
      { code: "J18.0", title: "Bronchopneumonia, unspecified organism" },
      { code: "J18.1", title: "Lobar pneumonia, unspecified organism" },
      { code: "J18.9", title: "Pneumonia, unspecified organism" },
    ],
  },
  {
    code: "J45",
    title: "Asthma",
    chapter: CH_RESP,
    block: { title: "Chronic lower respiratory diseases" },
    notes: [{ kind: "excludes1", items: ["wheezing NOS (R06.2)"], partial: true }],
    children: [
      {
        code: "J45.2",
        title: "Mild intermittent asthma",
        children: [
          { code: "J45.20", title: "Mild intermittent asthma, uncomplicated" },
          { code: "J45.21", title: "Mild intermittent asthma with (acute) exacerbation" },
        ],
      },
      {
        code: "J45.9",
        title: "Other and unspecified asthma",
        children: [
          {
            code: "J45.90",
            title: "Unspecified asthma",
            children: [
              { code: "J45.901", title: "Unspecified asthma with (acute) exacerbation" },
              { code: "J45.909", title: "Unspecified asthma, uncomplicated" },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "J69",
    title: "Pneumonitis due to solids and liquids",
    chapter: CH_RESP,
    children: [{ code: "J69.0", title: "Pneumonitis due to inhalation of food and vomit" }],
  },
  {
    code: "M17",
    title: "Osteoarthritis of knee",
    chapter: CH_MSK,
    block: { title: "Osteoarthritis", range: "M15-M19", notes: [{ kind: "excludes2", items: ["osteoarthritis of spine (M47.-)"] }] },
    children: [
      { code: "M17.0", title: "Bilateral primary osteoarthritis of knee" },
      {
        code: "M17.1",
        title: "Unilateral primary osteoarthritis of knee",
        children: [
          { code: "M17.10", title: "Unilateral primary osteoarthritis, unspecified knee" },
          { code: "M17.11", title: "Unilateral primary osteoarthritis, right knee" },
          { code: "M17.12", title: "Unilateral primary osteoarthritis, left knee" },
        ],
      },
      { code: "M17.9", title: "Osteoarthritis of knee, unspecified" },
    ],
  },
  {
    code: "M19",
    title: "Other and unspecified osteoarthritis",
    chapter: CH_MSK,
    block: { title: "Osteoarthritis", range: "M15-M19", notes: [{ kind: "excludes2", items: ["osteoarthritis of spine (M47.-)"] }] },
    children: [{ code: "M19.9", title: "Osteoarthritis, unspecified site", children: [{ code: "M19.90", title: "Unspecified osteoarthritis, unspecified site" }] }],
  },
  {
    code: "M25",
    title: "Other joint disorder, not elsewhere classified",
    chapter: CH_MSK,
    children: [
      {
        code: "M25.5",
        title: "Pain in joint",
        children: [
          { code: "M25.50", title: "Pain in unspecified joint" },
          {
            code: "M25.56",
            title: "Pain in knee",
            children: [
              { code: "M25.561", title: "Pain in right knee" },
              { code: "M25.562", title: "Pain in left knee" },
              { code: "M25.569", title: "Pain in unspecified knee" },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "M47",
    title: "Spondylosis",
    chapter: CH_MSK,
    children: [
      {
        code: "M47.8",
        title: "Other spondylosis",
        children: [
          {
            code: "M47.81",
            title: "Spondylosis without myelopathy or radiculopathy",
            children: [{ code: "M47.816", title: "Spondylosis without myelopathy or radiculopathy, lumbar region" }],
          },
        ],
      },
    ],
  },
  {
    code: "N39",
    title: "Other disorders of urinary system",
    chapter: CH_GU,
    children: [{ code: "N39.0", title: "Urinary tract infection, site not specified", notes: [{ kind: "useAdditional", items: ["code (B95-B97), to identify infectious agent"] }] }],
  },
  {
    code: "R06",
    title: "Abnormalities of breathing",
    chapter: CH_SYMP,
    children: [{ code: "R06.2", title: "Wheezing" }],
  },
  {
    code: "S52",
    title: "Fracture of forearm",
    chapter: CH_INJURY,
    block: { title: "Injuries to the elbow and forearm", range: "S50-S59" },
    notes: [
      {
        kind: "note",
        items: [
          "A fracture not indicated as displaced or nondisplaced should be coded to displaced",
          "A fracture not indicated as open or closed should be coded to closed",
          "The open fracture designations are based on the Gustilo open fracture classification",
        ],
      },
      { kind: "excludes1", items: ["traumatic amputation of forearm (S58.-)"] },
      { kind: "excludes2", items: ["fracture at wrist and hand level (S62.-)", "periprosthetic fracture around internal prosthetic elbow joint (M97.4)"] },
    ],
    seventh: FRACTURE_7TH,
    children: [
      {
        code: "S52.5",
        title: "Fracture of lower end of radius",
        children: [
          {
            code: "S52.50",
            title: "Unspecified fracture of the lower end of radius",
            children: [
              { code: "S52.501", title: "Unspecified fracture of the lower end of right radius" },
              { code: "S52.502", title: "Unspecified fracture of the lower end of left radius" },
              { code: "S52.509", title: "Unspecified fracture of the lower end of unspecified radius" },
            ],
          },
          {
            code: "S52.53",
            title: "Colles' fracture",
            children: [
              { code: "S52.531", title: "Colles' fracture of right radius" },
              { code: "S52.532", title: "Colles' fracture of left radius" },
              { code: "S52.539", title: "Colles' fracture of unspecified radius" },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "S61",
    title: "Open wound of wrist, hand and fingers",
    chapter: CH_INJURY,
    block: { title: "Injuries to the wrist, hand and fingers", range: "S60-S69" },
    notes: [
      { kind: "codeAlso", items: ["any associated wound infection"] },
      { kind: "excludes1", items: ["open fracture of wrist, hand and finger (S62.- with 7th character B)", "traumatic amputation of wrist and hand (S68.-)"] },
    ],
    seventh: ENCOUNTER_7TH,
    children: [
      {
        code: "S61.4",
        title: "Open wound of hand",
        children: [
          {
            code: "S61.41",
            title: "Laceration without foreign body of hand",
            children: [
              { code: "S61.411", title: "Laceration without foreign body of right hand" },
              { code: "S61.412", title: "Laceration without foreign body of left hand" },
              { code: "S61.419", title: "Laceration without foreign body of unspecified hand" },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "S93",
    title: "Dislocation and sprain of joints and ligaments at ankle, foot and toe level",
    chapter: CH_INJURY,
    block: { title: "Injuries to the ankle and foot", range: "S90-S99" },
    notes: [
      INJURY_INCLUDES("ankle, foot and toe"),
      { kind: "codeAlso", items: ["any associated open wound"] },
      { kind: "excludes2", items: ["strain of muscle and tendon of ankle and foot (S96.-)"] },
    ],
    seventh: ENCOUNTER_7TH,
    children: [
      {
        code: "S93.4",
        title: "Sprain of ankle",
        notes: [{ kind: "excludes2", items: ["injury of Achilles tendon (S86.0-)"] }],
        children: [
          {
            code: "S93.40",
            title: "Sprain of unspecified ligament of ankle",
            children: [
              { code: "S93.401", title: "Sprain of unspecified ligament of right ankle" },
              { code: "S93.402", title: "Sprain of unspecified ligament of left ankle" },
              { code: "S93.409", title: "Sprain of unspecified ligament of unspecified ankle" },
            ],
          },
          {
            code: "S93.41",
            title: "Sprain of calcaneofibular ligament",
            children: [
              { code: "S93.411", title: "Sprain of calcaneofibular ligament of right ankle" },
              { code: "S93.412", title: "Sprain of calcaneofibular ligament of left ankle" },
              { code: "S93.419", title: "Sprain of calcaneofibular ligament of unspecified ankle" },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "Z00",
    title: "Encounter for general examination without complaint, suspected or reported diagnosis",
    chapter: CH_Z,
    block: { title: "Persons encountering health services for examinations", range: "Z00-Z13" },
    children: [
      {
        code: "Z00.0",
        title: "Encounter for general adult medical examination",
        children: [
          { code: "Z00.00", title: "Encounter for general adult medical examination without abnormal findings" },
          { code: "Z00.01", title: "Encounter for general adult medical examination with abnormal findings", notes: [{ kind: "useAdditional", items: ["code to identify abnormal findings"] }] },
        ],
      },
    ],
  },
  {
    code: "Z79",
    title: "Long term (current) drug therapy",
    chapter: CH_Z,
    children: [
      { code: "Z79.0", title: "Long term (current) use of anticoagulants and antithrombotics/antiplatelets", children: [{ code: "Z79.01", title: "Long term (current) use of anticoagulants" }] },
      { code: "Z79.4", title: "Long term (current) use of insulin" },
      { code: "Z79.8", title: "Other long term (current) drug therapy", children: [{ code: "Z79.84", title: "Long term (current) use of oral hypoglycemic drugs" }] },
    ],
  },
];

/** Alphabetic Index entries. `code` ending in "-" means more characters are needed in the Tabular List. */
export type IcdIndexEntry = { term: string; mods?: string; code?: string; see?: string; sub?: IcdIndexEntry[] };

export const ICD_INDEX: IcdIndexEntry[] = [
  {
    term: "Asthma, asthmatic",
    mods: "(bronchial) (catarrh) (spasmodic)",
    code: "J45.909",
    sub: [
      { term: "mild intermittent", code: "J45.20", sub: [{ term: "with exacerbation (acute)", code: "J45.21" }] },
      { term: "with exacerbation (acute)", code: "J45.901" },
    ],
  },
  { term: "Colles' fracture", code: "S52.53-" },
  {
    term: "Diabetes, diabetic",
    mods: "(mellitus) (sugar)",
    code: "E11.9",
    sub: [
      { term: "type 1", code: "E10.9" },
      { term: "type 2", code: "E11.9", sub: [{ term: "with hyperglycemia", code: "E11.65" }] },
    ],
  },
  { term: "Examination", sub: [{ term: "medical (adult)", code: "Z00.00", sub: [{ term: "with abnormal findings", code: "Z00.01" }] }] },
  { term: "Fibrillation", sub: [{ term: "atrial or auricular (established)", code: "I48.91" }] },
  { term: "Fracture, traumatic", sub: [{ term: "radius", sub: [{ term: "lower end", code: "S52.50-", sub: [{ term: "Colles'", code: "S52.53-" }] }] }] },
  { term: "Hyperlipidemia", code: "E78.5" },
  { term: "Hypertension, hypertensive", mods: "(accelerated) (benign) (essential) (idiopathic) (malignant) (systemic)", code: "I10" },
  { term: "Infection", sub: [{ term: "urinary (tract)", code: "N39.0" }] },
  { term: "Laceration", sub: [{ term: "hand", code: "S61.41-" }] },
  {
    term: "Long-term (current) (prophylactic) drug therapy (use of)",
    sub: [
      { term: "anticoagulants", code: "Z79.01" },
      { term: "insulin", code: "Z79.4" },
      { term: "oral hypoglycemic drugs", code: "Z79.84" },
    ],
  },
  {
    term: "Osteoarthritis",
    code: "M19.90",
    sub: [
      { term: "knee", code: "M17.1-", sub: [{ term: "bilateral", code: "M17.0" }] },
      { term: "spine", see: "Spondylosis" },
    ],
  },
  { term: "Pain(s)", sub: [{ term: "joint", code: "M25.50", sub: [{ term: "knee", code: "M25.56-" }] }] },
  { term: "Pharyngitis", mods: "(acute) (catarrhal) (gangrenous) (infective) (malignant) (membranous) (phlegmonous) (pseudomembranous) (simple) (subacute) (suppurative) (ulcerative) (viral)", code: "J02.9", sub: [{ term: "streptococcal", code: "J02.0" }] },
  {
    term: "Pneumonia",
    mods: "(acute) (double) (migratory) (purulent) (septic) (unresolved)",
    code: "J18.9",
    sub: [
      { term: "aspiration", code: "J69.0" },
      { term: "bacterial", code: "J15.9" },
      { term: "broncho-, bronchial", code: "J18.0" },
      { term: "lobar", code: "J18.1" },
      { term: "viral", code: "J12.9" },
    ],
  },
  { term: "Spondylosis", sub: [{ term: "lumbar region", code: "M47.816" }] },
  { term: "Sprain", mods: "(joint) (ligament)", sub: [{ term: "ankle", code: "S93.40-", sub: [{ term: "calcaneofibular ligament", code: "S93.41-" }] }] },
  { term: "Wheezing", code: "R06.2" },
];

export type IcdLookup = { code: string; title: string; category: IcdCategory; node: IcdNode; path: IcdNode[]; leaf: boolean };

function walkIcd(cat: IcdCategory, node: IcdNode, path: IcdNode[], out: Map<string, IcdLookup>) {
  out.set(node.code, { code: node.code, title: node.title, category: cat, node, path, leaf: !node.children?.length });
  for (const ch of node.children ?? []) walkIcd(cat, ch, [...path, node], out);
}

const ICD_MAP: Map<string, IcdLookup> = (() => {
  const m = new Map<string, IcdLookup>();
  for (const c of ICD_CATEGORIES) walkIcd(c, c, [], m);
  return m;
})();

export function icdNode(code: string): IcdLookup | undefined {
  return ICD_MAP.get(code.toUpperCase());
}

/**
 * A complete, reportable code: a leaf of the tree, plus a valid 7th
 * character when the category requires one. Returns its title.
 */
export function icdBillable(code: string): { ok: true; title: string } | { ok: false; reason: "unknown" | "header" | "seventh" } {
  const c = code.toUpperCase();
  const direct = ICD_MAP.get(c);
  if (direct) {
    if (!direct.leaf) return { ok: false, reason: "header" };
    if (direct.category.seventh) return { ok: false, reason: "seventh" };
    return { ok: true, title: direct.title };
  }
  if (c.length === 8) {
    const base = ICD_MAP.get(c.slice(0, 7));
    const ch = c.slice(7);
    if (base && base.leaf && base.category.seventh) {
      const s = base.category.seventh.find((x) => x.char === ch);
      if (s) return { ok: true, title: `${base.title}, ${s.label}` };
    }
  }
  return { ok: false, reason: "unknown" };
}

export function icdTitle(code: string): string {
  const b = icdBillable(code);
  if (b.ok) return b.title;
  return ICD_MAP.get(code.toUpperCase())?.title ?? "Not in the training code set";
}

/** Pairs that an Excludes1 note in this code set forbids on the same claim. */
export const EXCLUDES1_PAIRS: { a: string; b: string; note: string }[] = [
  { a: "E10", b: "E11", note: "E11 Excludes1: type 1 diabetes mellitus (E10.-)" },
  { a: "J45", b: "R06.2", note: "J45 Excludes1: wheezing NOS (R06.2)" },
];

/* ------------------------------------------------------------------ */
/* CPT (HCPCS Level I) and HCPCS Level II                              */
/* ------------------------------------------------------------------ */

export type CptSection = "Evaluation and Management" | "Anesthesia" | "Surgery" | "Radiology" | "Pathology and Laboratory" | "Medicine";

export const CPT_SECTIONS: { name: CptSection; range: string; note?: string }[] = [
  { name: "Evaluation and Management", range: "99202-99215 (office visits)", note: "Listed first in the book because it is used most, even though the numbers come last. Office visit level is chosen by medical decision making (MDM) or total time on the date of the encounter." },
  { name: "Anesthesia", range: "00100-01999", note: "Reported by the anesthesia provider. No anesthesia services are billed by this clinic." },
  { name: "Surgery", range: "10000-69999", note: "The largest section." },
  { name: "Radiology", range: "70000-79999" },
  { name: "Pathology and Laboratory", range: "80000-89999" },
  { name: "Medicine", range: "90000-99199" },
];

export type ProcCode = {
  code: string;
  set: "CPT" | "HCPCS";
  /** CPT section or HCPCS letter. */
  section: string;
  /** CPT: a plain-language training summary. HCPCS: the item in plain words. */
  text: string;
  fee: number;
  em?: boolean;
  /** A procedure with a 0- or 10-day global period: a same-day E/M needs modifier 25 to be paid separately. */
  minor?: boolean;
  /** HCPCS drug unit, e.g. "per 15 mg". */
  per?: string;
};

export const PROC_CODES: ProcCode[] = [
  // Evaluation and Management (office or other outpatient)
  { code: "99202", set: "CPT", section: "Evaluation and Management", text: "Office visit, new patient: straightforward MDM, or at least 15 minutes total time", fee: 120, em: true },
  { code: "99203", set: "CPT", section: "Evaluation and Management", text: "Office visit, new patient: low MDM, or at least 30 minutes total time", fee: 185, em: true },
  { code: "99204", set: "CPT", section: "Evaluation and Management", text: "Office visit, new patient: moderate MDM, or at least 45 minutes total time", fee: 275, em: true },
  { code: "99205", set: "CPT", section: "Evaluation and Management", text: "Office visit, new patient: high MDM, or at least 60 minutes total time", fee: 360, em: true },
  { code: "99211", set: "CPT", section: "Evaluation and Management", text: "Office visit, established patient: brief visit that may not need a physician or other qualified provider", fee: 45, em: true },
  { code: "99212", set: "CPT", section: "Evaluation and Management", text: "Office visit, established patient: straightforward MDM, or at least 10 minutes total time", fee: 95, em: true },
  { code: "99213", set: "CPT", section: "Evaluation and Management", text: "Office visit, established patient: low MDM, or at least 20 minutes total time", fee: 150, em: true },
  { code: "99214", set: "CPT", section: "Evaluation and Management", text: "Office visit, established patient: moderate MDM, or at least 30 minutes total time", fee: 220, em: true },
  { code: "99215", set: "CPT", section: "Evaluation and Management", text: "Office visit, established patient: high MDM, or at least 40 minutes total time", fee: 310, em: true },
  // Surgery
  { code: "10060", set: "CPT", section: "Surgery", text: "Incision and drainage of a simple or single skin abscess", fee: 250, minor: true },
  { code: "12001", set: "CPT", section: "Surgery", text: "Simple repair of superficial wounds (scalp, neck, trunk, arms, legs, hands or feet), total length 2.5 cm or less", fee: 210, minor: true },
  { code: "12002", set: "CPT", section: "Surgery", text: "Simple repair of superficial wounds (same sites), total length 2.6 cm to 7.5 cm", fee: 260, minor: true },
  { code: "17110", set: "CPT", section: "Surgery", text: "Destruction of benign skin lesions such as warts, up to 14 lesions", fee: 160, minor: true },
  { code: "20610", set: "CPT", section: "Surgery", text: "Injection or aspiration of a major joint or bursa (such as knee, hip or shoulder), without ultrasound guidance", fee: 180, minor: true },
  { code: "36415", set: "CPT", section: "Surgery", text: "Routine venipuncture to collect a blood sample", fee: 15 },
  // Radiology
  { code: "71045", set: "CPT", section: "Radiology", text: "Chest X-ray, single view", fee: 85 },
  { code: "71046", set: "CPT", section: "Radiology", text: "Chest X-ray, 2 views", fee: 110 },
  { code: "72148", set: "CPT", section: "Radiology", text: "MRI of the lumbar spine, without contrast", fee: 1200 },
  { code: "73100", set: "CPT", section: "Radiology", text: "Wrist X-ray, 2 views", fee: 90 },
  { code: "73110", set: "CPT", section: "Radiology", text: "Wrist X-ray, complete, at least 3 views", fee: 115 },
  { code: "73600", set: "CPT", section: "Radiology", text: "Ankle X-ray, 2 views", fee: 95 },
  { code: "73610", set: "CPT", section: "Radiology", text: "Ankle X-ray, complete, at least 3 views", fee: 120 },
  { code: "73721", set: "CPT", section: "Radiology", text: "MRI of a lower-extremity joint (such as the knee), without contrast", fee: 1150 },
  // Pathology and Laboratory
  { code: "80048", set: "CPT", section: "Pathology and Laboratory", text: "Basic metabolic panel (a group of 8 blood chemistry tests)", fee: 35 },
  { code: "80053", set: "CPT", section: "Pathology and Laboratory", text: "Comprehensive metabolic panel (the basic panel plus liver and protein tests)", fee: 45 },
  { code: "80061", set: "CPT", section: "Pathology and Laboratory", text: "Lipid panel (cholesterol, HDL, triglycerides)", fee: 55 },
  { code: "81002", set: "CPT", section: "Pathology and Laboratory", text: "Urinalysis by dipstick, read by hand, without microscopy", fee: 15 },
  { code: "83036", set: "CPT", section: "Pathology and Laboratory", text: "Hemoglobin A1c", fee: 40 },
  { code: "85025", set: "CPT", section: "Pathology and Laboratory", text: "Complete blood count (CBC) with automated differential", fee: 35 },
  { code: "87880", set: "CPT", section: "Pathology and Laboratory", text: "Rapid strep test (group A strep antigen, read by eye)", fee: 30 },
  // Medicine
  { code: "90471", set: "CPT", section: "Medicine", text: "Immunization administration by injection, first vaccine", fee: 30 },
  { code: "93000", set: "CPT", section: "Medicine", text: "Electrocardiogram (ECG), at least 12 leads, with interpretation and report", fee: 70 },
  { code: "94640", set: "CPT", section: "Medicine", text: "Inhaled treatment for airway obstruction (nebulizer or inhaler)", fee: 45 },
  { code: "96372", set: "CPT", section: "Medicine", text: "Therapeutic, preventive or diagnostic injection into a muscle or under the skin", fee: 40 },

  // HCPCS Level II
  { code: "A0428", set: "HCPCS", section: "A", text: "Ambulance service, basic life support, non-emergency transport", fee: 350 },
  { code: "A4253", set: "HCPCS", section: "A", text: "Blood glucose test strips for a home glucose monitor", per: "per 50 strips", fee: 30 },
  { code: "A4259", set: "HCPCS", section: "A", text: "Lancets", per: "per box of 100", fee: 12 },
  { code: "E0114", set: "HCPCS", section: "E", text: "Crutches, underarm, other than wood, adjustable or fixed, pair, with pads, tips and handgrips", fee: 65 },
  { code: "E0143", set: "HCPCS", section: "E", text: "Walker, folding, wheeled, adjustable or fixed height", fee: 110 },
  { code: "E0250", set: "HCPCS", section: "E", text: "Hospital bed, fixed height, with side rails and mattress", fee: 600 },
  { code: "E1390", set: "HCPCS", section: "E", text: "Oxygen concentrator, single delivery port (85% or greater oxygen at the prescribed flow rate)", fee: 230 },
  { code: "G0008", set: "HCPCS", section: "G", text: "Administration of influenza virus vaccine", fee: 30 },
  { code: "G0438", set: "HCPCS", section: "G", text: "Medicare annual wellness visit, initial, with personalized prevention plan", fee: 175 },
  { code: "G0439", set: "HCPCS", section: "G", text: "Medicare annual wellness visit, subsequent", fee: 120 },
  { code: "J0696", set: "HCPCS", section: "J", text: "Injection, ceftriaxone sodium", per: "per 250 mg", fee: 12 },
  { code: "J1030", set: "HCPCS", section: "J", text: "Injection, methylprednisolone acetate", per: "40 mg", fee: 10 },
  { code: "J1100", set: "HCPCS", section: "J", text: "Injection, dexamethasone sodium phosphate", per: "1 mg", fee: 2 },
  { code: "J1885", set: "HCPCS", section: "J", text: "Injection, ketorolac tromethamine", per: "per 15 mg", fee: 8 },
  { code: "J3301", set: "HCPCS", section: "J", text: "Injection, triamcinolone acetonide, not otherwise specified", per: "per 10 mg", fee: 9 },
  { code: "J3420", set: "HCPCS", section: "J", text: "Injection, vitamin B-12 (cyanocobalamin)", per: "up to 1,000 mcg", fee: 10 },
  { code: "K0001", set: "HCPCS", section: "K", text: "Standard wheelchair", fee: 450 },
  { code: "L1830", set: "HCPCS", section: "L", text: "Knee immobilizer (knee orthosis), canvas, prefabricated, off-the-shelf", fee: 95 },
  { code: "L3908", set: "HCPCS", section: "L", text: "Wrist-hand orthosis, cock-up style, prefabricated, off-the-shelf", fee: 70 },
];

export const HCPCS_LETTERS: { letter: string; covers: string; example: string }[] = [
  { letter: "A", covers: "Transportation, medical and surgical supplies", example: "Ambulance service, dressings" },
  { letter: "B", covers: "Enteral and parenteral therapy", example: "Feeding supplies" },
  { letter: "E", covers: "Durable medical equipment", example: "Wheelchairs, walkers, hospital beds" },
  { letter: "G", covers: "Temporary procedures and services", example: "Codes CMS assigns pending a CPT code" },
  { letter: "J", covers: "Drugs administered other than by mouth", example: "Injectable and infused medications" },
  { letter: "K", covers: "Temporary DME codes", example: "Assigned by the DME contractors" },
  { letter: "L", covers: "Orthotics and prosthetics", example: "Braces, artificial limbs" },
  { letter: "Q", covers: "Temporary codes", example: "Various, assigned by CMS" },
];

export const MODIFIERS: { code: string; means: string; attaches: string }[] = [
  { code: "25", means: "Significant, separately identifiable E/M service on the same day as a procedure", attaches: "The E/M code" },
  { code: "59", means: "Distinct procedural service", attaches: "The procedure code" },
  { code: "XE", means: "Separate encounter (a more specific alternative to 59)", attaches: "The procedure code" },
  { code: "XS", means: "Separate structure or organ (a more specific alternative to 59)", attaches: "The procedure code" },
  { code: "XP", means: "Separate practitioner (a more specific alternative to 59)", attaches: "The procedure code" },
  { code: "XU", means: "Unusual non-overlapping service (a more specific alternative to 59)", attaches: "The procedure code" },
  { code: "LT", means: "Left side of the body", attaches: "The procedure code" },
  { code: "RT", means: "Right side of the body", attaches: "The procedure code" },
  { code: "50", means: "Bilateral procedure", attaches: "The procedure code" },
  { code: "51", means: "Multiple procedures", attaches: "The additional procedure codes" },
  { code: "76", means: "Repeat procedure by the same provider", attaches: "The repeated code" },
];

/** NCCI-style pairs in this code set: the second code is a component of the first. */
export const COMPONENT_PAIRS: { comprehensive: string; component: string; note: string }[] = [
  { comprehensive: "80053", component: "80048", note: "Every test in the basic metabolic panel (80048) is part of the comprehensive panel (80053). Report 80053 only." },
];

export function procCode(code: string): ProcCode | undefined {
  const c = code.toUpperCase();
  return PROC_CODES.find((p) => p.code === c);
}

/** Claim adjustment reason codes used in this practice's remittances and denials. */
export const CARC: Record<string, string> = {
  "CO-16": "Claim lacks information needed to adjudicate",
  "CO-27": "Expenses incurred after coverage terminated",
  "CO-29": "The time limit for filing has expired",
  "CO-45": "Charge exceeds the fee schedule or maximum allowable (contractual adjustment)",
  "CO-97": "Service is included in the payment for another service on the claim",
  "CO-197": "Precertification, authorization or notification absent",
  "PR-1": "Deductible amount",
  "PR-2": "Coinsurance amount",
  "PR-3": "Copayment amount",
};

/** Training notice shown in the encoder. */
export const CODESET_NOTICE =
  "Training encoder: a small curated subset of ICD-10-CM, CPT and HCPCS Level II. Notes marked (partial) list only some of the entries. CPT descriptions are plain-language training summaries, not official descriptors. CPT is a registered trademark of the American Medical Association. Always code from the current official code books.";
