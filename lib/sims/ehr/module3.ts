import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED } from "./practice";

export const ehrModule3Sims: Record<string, SimDefinition[]> = {
  "module-3::icd-part-2-and-cpt-part-1": [
    {
      id: "ehr-m3-index-tabular-1",
      app: "ehr",
      title: "Sprained ankle: Index, Tabular, 7th character and the X-ray",
      scenario:
        "You are coding at Northstar Orthopedics. Marcus Bell twisted his left ankle stepping off a curb this morning; Dr. Reyes diagnosed a sprain of the left ankle and took a 2-view ankle X-ray. Code his encounter and link each service to the diagnosis that supports it. Then fix an Excludes1 problem on Aaliyah Grant's asthma visit.",
      fileName: "Northstar EHR · Coding",
      minutes: 7,
      initial: practice({
        department: "Northstar Billing Office",
        session: { user: "student", name: "BEOC Student", role: "Coder", signedIn: true },
        workspaces: ["charges", "encoder"],
        nav: { ws: "encoder", enc: "E1" },
        patients: [
          { id: "P1", mrn: "2049931", last: "Bell", first: "Marcus", dob: "05/11/1992", sex: "Male", pcp: "PRV1", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44175508", relationship: "Self", subscriber: "Bell, Marcus" }] },
          { id: "P2", mrn: "1977415", last: "Grant", first: "Aaliyah", dob: "12/03/2001", sex: "Female", pcp: "PRV1", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY2", memberId: "AFH551027349", relationship: "Self", subscriber: "Grant, Aaliyah" }] },
        ],
        encounters: [
          {
            id: "E1",
            patient: "P1",
            provider: "PRV2",
            date: "10/20/2026",
            note:
              "Established patient. Inverted the left ankle stepping off a curb this morning. Lateral swelling and tenderness; able to bear weight.\nX-ray left ankle, 2 views: no fracture.\nAssessment: sprain of the left ankle, ligament not specified. Initial encounter.\nMedical decision making: low.",
            dx: [],
            lines: [{ id: "L1", code: "99213", units: 1, ptr: "", fee: 150 }],
            status: "Open",
          },
          {
            id: "E2",
            patient: "P2",
            provider: "PRV1",
            date: "10/20/2026",
            note: "Asthma follow-up. Mild intermittent asthma, uncomplicated. Occasional wheezing with exercise, relieved by albuterol. Medical decision making: low.",
            dx: ["R06.2"],
            lines: [{ id: "L1", code: "99213", units: 1, ptr: "A", fee: 150 }],
            status: "Open",
          },
        ],
      }),
      tasks: [
        {
          instruction: "Code Marcus Bell's ankle sprain. Look up the main term in the Alphabetic Index, confirm the code in the Tabular List, choose the 7th character for this initial encounter, and add the complete code.",
          hint: "Encoder › ICD-10-CM › Alphabetic Index › type sprain › click S93.40- beside ankle › Tabular List › click S93.402 (left ankle) › 7th character: A initial encounter › Add to encounter.",
          steps: [{ action: { kind: "command", id: "ehr.dx.add", value: "E1:S93.402A" } }],
        },
        {
          instruction: "Add the CPT code for the 2-view ankle X-ray. It is in the Radiology section.",
          hint: "Encoder › CPT › Radiology › 73600 Ankle X-ray, 2 views › Add charge.",
          steps: [{ action: { kind: "command", id: "ehr.chg.add", value: "E1:73600" } }],
        },
        {
          instruction: "Link both of Marcus's charge lines to the sprain: point line 1 (99213) and line 2 (73600) to diagnosis A.",
          hint: "Charges › Charges › Dx pointer on line 1 › type A and press Enter, then do the same on line 2.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "E1.L1.ptr", value: "A" } },
            { action: { kind: "type", target: "E1.L2.ptr", value: "A" } },
          ],
        },
        {
          instruction: "Switch to Aaliyah Grant's encounter. Read the Excludes1 note at category J45 in the Tabular List, then remove the diagnosis that may not be reported together with asthma.",
          hint: "Encoder › ICD-10-CM › Tabular List › J45 Asthma shows Excludes1: wheezing NOS (R06.2). Then Charges › Grant, Aaliyah › Diagnoses › click R06.2 › Remove.",
          steps: [
            {
              action: { kind: "command", id: "ehr.dx.remove" },
              requires: { selection: "dx:E2:R06.2" },
              selectHint: "Open Aaliyah Grant's encounter in Charges and click R06.2 in the Diagnoses list.",
            },
          ],
        },
        {
          instruction: "Add the asthma code Aaliyah's note supports.",
          hint: "Encoder (Coding for: Grant, Aaliyah) › Alphabetic Index › asthma › mild intermittent J45.20 › Tabular List › J45.20 › Add to encounter.",
          steps: [{ action: { kind: "command", id: "ehr.dx.add", value: "E2:J45.20" } }],
        },
        {
          instruction: "Point Aaliyah's office visit line to diagnosis A.",
          hint: "Charges › Grant, Aaliyah › Charges › line 1 Dx pointer › type A and press Enter.",
          steps: [{ action: { kind: "type", target: "E2.L1.ptr", value: "A" } }],
        },
      ],
    },
  ],

  "module-3::cpt-part-2": [
    {
      id: "ehr-m3-modifiers-1",
      app: "ehr",
      title: "A procedure and a separate problem on the same day",
      scenario:
        "Lena Novak came to Northstar Primary Care for a scheduled steroid injection in her left knee. During the visit she mentioned a sore throat; Dr. Okafor evaluated it as a separate problem, ran a rapid strep test and documented low-complexity decision making for it. Payers assume any visit on the day of a procedure is part of that procedure. Code the visit so the claim says otherwise, truthfully.",
      fileName: "Northstar EHR · Coding",
      minutes: 7,
      initial: practice({
        department: "Northstar Billing Office",
        session: { user: "student", name: "BEOC Student", role: "Coder", signedIn: true },
        workspaces: ["charges", "encoder", "claims"],
        nav: { ws: "charges", enc: "E1" },
        patients: [
          { id: "P1", mrn: "1590377", last: "Novak", first: "Lena", dob: "07/19/1970", sex: "Female", street: "77 Wintergreen Place", city: "Brooklyn", state: "NY", zip: "11209", pcp: "PRV1", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44179067", group: "BEOC-2026", relationship: "Self", subscriber: "Novak, Lena", elig: { status: "Active", memberId: "ENH44179067" } }] },
        ],
        encounters: [
          {
            id: "E1",
            patient: "P1",
            provider: "PRV1",
            date: "10/20/2026",
            note:
              "Scheduled procedure: injection of the left knee for unilateral primary osteoarthritis. Triamcinolone acetonide 40 mg injected into the left knee joint, no ultrasound guidance.\nSeparate problem: sore throat and fever for 2 days. Rapid strep test positive. Assessment: streptococcal pharyngitis. Medical decision making for this new problem: low.",
            dx: ["M17.12", "J02.0"],
            lines: [
              { id: "L1", code: "20610", units: 1, ptr: "A", fee: 180 },
              { id: "L2", code: "J3301", units: 4, ptr: "A", fee: 9 },
            ],
            status: "Open",
          },
        ],
      }),
      tasks: [
        {
          instruction: "Add the established-patient office visit code that matches the low-complexity decision making documented for the sore throat.",
          hint: "Encoder › CPT › Evaluation and Management › 99213 (established patient, low MDM) › Add charge.",
          steps: [{ action: { kind: "command", id: "ehr.chg.add", value: "E1:99213" } }],
        },
        {
          instruction: "Point the new 99213 line (line 3) to the pharyngitis diagnosis, B.",
          hint: "Charges › Charges › line 3 Dx pointer › type B and press Enter.",
          steps: [{ action: { kind: "type", target: "E1.L3.ptr", value: "B" } }],
        },
        {
          instruction: "Add the CPT code for the rapid strep test and point it to diagnosis B.",
          hint: "Encoder › CPT › Pathology and Laboratory › 87880 › Add charge. Then Charges › line 4 Dx pointer › type B and press Enter.",
          steps: [
            { action: { kind: "command", id: "ehr.chg.add", value: "E1:87880" } },
            { action: { kind: "type", target: "E1.L4.ptr", value: "B" } },
          ],
        },
        {
          instruction: "Create the claim and read what the scrubber reports.",
          hint: "Charges › Create claim. The scrubber flags an NCCI bundling edit on 99213 and a laterality edit on 20610.",
          steps: [{ action: { kind: "command", id: "ehr.claim.create", value: "E1" } }],
        },
        {
          instruction: "Clear the NCCI edit: on claim C1, append the modifier that marks the office visit as a significant, separately identifiable E/M service.",
          hint: "Claims › Claim (CMS-1500) › line 3 (99213) › first Modifier box › type 25 and press Enter. Modifier 25 attaches to the E/M code, never to the procedure.",
          steps: [{ action: { kind: "type", target: "C1.L3.mod1", value: "25" } }],
        },
        {
          instruction: "Clear the laterality edit: append the modifier for the left side to the knee injection on line 1.",
          hint: "Claims › Claim (CMS-1500) › line 1 (20610) › first Modifier box › type LT and press Enter.",
          steps: [{ action: { kind: "type", target: "C1.L1.mod1", value: "LT" } }],
        },
        {
          instruction: "The scrubber is clean. Submit claim C1.",
          hint: "Claims › Claim (CMS-1500) › Submit claim.",
          steps: [{ action: { kind: "command", id: "ehr.claim.submit", value: "C1" } }],
        },
      ],
    },
  ],
};
