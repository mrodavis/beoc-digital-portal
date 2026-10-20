import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED } from "./practice";

export const ehrModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::revenue-cycle-and-preauthorization": [
    {
      id: "ehr-m2-preauth-1",
      app: "ehr",
      title: "Get the knee MRI authorized before the visit",
      scenario:
        "You work patient access at Northstar Orthopedics. Rosa Delgado is booked for an MRI of the left knee on 10/27/2026, and her plan requires prior authorization for advanced imaging. The first request was pended because the diagnosis on it was too general. Confirm coverage, build a complete request from the provider's documentation, and record the approval on her visit.",
      fileName: "Northstar EHR · Patient Access",
      minutes: 6,
      initial: practice({
        department: "Northstar Orthopedics (Front Desk)",
        workspaces: ["search", "chart", "preauth", "encoder"],
        chartTabs: ["facesheet", "registration"],
        nav: { ws: "preauth", auth: "PA1" },
        patients: [
          {
            id: "P1",
            mrn: "1764203",
            last: "Delgado",
            first: "Rosa",
            dob: "03/22/1964",
            sex: "Female",
            phone: "(718) 555-0126",
            street: "915 Juniper Row",
            city: "Brooklyn",
            state: "NY",
            zip: "11234",
            pcp: "PRV1",
            problems: ["M17.12", "I10"],
            signatures: SIGNED,
            coverage: [
              {
                priority: 1,
                payer: "PAY1",
                plan: "Gold PPO",
                subscriber: "Delgado, Rosa",
                subscriberDob: "03/22/1964",
                relationship: "Self",
                memberId: "ENH44178830",
                group: "BEOC-2026",
                effective: "01/01/2026",
                copay: "40.00",
                elig: {
                  status: "Active",
                  memberId: "ENH44178830",
                  dob: "03/22/1964",
                  plan: "Gold PPO",
                  effective: "01/01/2026",
                  copay: "25.00",
                  specialist: "40.00",
                  deductible: "1,000.00",
                  deductibleMet: "1,000.00",
                  coinsurance: "20%",
                  notes: ["Prior authorization required: advanced imaging (MRI, CT, PET). Referral not required for in-network specialists."],
                },
              },
            ],
          },
        ],
        appointments: [{ id: "V1", patient: "P1", provider: "PRV2", date: "2026-10-27", time: "08:30", minutes: 30, type: "Imaging", reason: "MRI left knee without contrast", status: "Scheduled" }],
        auths: [
          {
            id: "PA1",
            patient: "P1",
            visit: "V1",
            payer: "PAY1",
            provider: "PRV2",
            service: "MRI left knee without contrast",
            serviceDate: "10/27/2026",
            orderText:
              "Ordered 10/16/2026 by Daniel Reyes, MD (Orthopedics): MRI of the left knee without contrast (CPT 73721), 1 unit.\nDiagnosis: unilateral primary osteoarthritis of the left knee.\nHistory: left knee pain for 5 months. Completed 8 weeks of physical therapy and daily NSAIDs without improvement. Mechanical locking on exam today.",
            status: "Pended",
            cpt: "73721",
            icd: "M17.9",
            units: "1",
            npi: "",
            notes: "",
            rule: {
              cpt: ["73721"],
              icd: ["M17.12"],
              notesAll: ["8 weeks", "physical therapy"],
              number: "NSA-2610-4471",
              validFrom: "10/20/2026",
              validTo: "11/19/2026",
              pendIcd: "The diagnosis does not specify laterality. Submit the most specific code the documentation supports.",
              pendNotes: "Include the length and type of conservative treatment already tried.",
            },
            responses: [
              {
                at: "10/17/2026 15:12",
                status: "Pended",
                lines: [
                  "Response from Empire Northstar Health Plan · 10/17/2026 15:12 · reference PA1-091",
                  "PENDED: The diagnosis does not support medical necessity for the requested service.",
                  "M17.9 does not specify laterality. Submit the most specific code the documentation supports.",
                ],
              },
            ],
          },
        ],
      }),
      tasks: [
        {
          instruction: "Open Rosa Delgado's chart and verify her primary coverage. Read what the response says about imaging.",
          hint: "Patients › search Delgado, Rosa › Open chart › Registration › Insurance › Verify eligibility. The 271 response says coverage is active and that MRI needs prior authorization: eligibility and authorization are separate checks.",
          steps: [{ action: { kind: "command", id: "ehr.elig.check", value: "P1:1" } }],
        },
        {
          instruction: "In Preauth, replace the pended diagnosis on Rosa's request with the code for unilateral primary osteoarthritis of the left knee. Use the Encoder if you need to look it up.",
          hint: "Encoder › ICD-10-CM › Alphabetic Index › osteoarthritis › knee M17.1- › Tabular List shows M17.12 for the left knee. Then Preauth › ICD-10-CM code › type M17.12 and press Enter.",
          steps: [{ action: { kind: "type", target: "PA1.icd", value: "M17.12" } }],
        },
        {
          instruction: "Enter the ordering provider's NPI. The order is from Dr. Daniel Reyes.",
          hint: "Preauth › Provider directory (right) lists Daniel Reyes, MD: 1182635408 › type it in Ordering provider NPI and press Enter.",
          steps: [{ action: { kind: "type", target: "PA1.npi", value: "1182635408" } }],
        },
        {
          instruction: "In Clinical notes, type: \"Left knee pain for 5 months. Completed 8 weeks of physical therapy and NSAIDs without improvement.\"",
          hint: "Preauth › Clinical notes › type the sentence, then click outside the box (or press Ctrl+Enter). The payer looks for the length and type of treatment already tried.",
          steps: [{ action: { kind: "type", target: "PA1.notes", value: "8 weeks of physical therapy", match: "includes" } }],
        },
        {
          instruction: "Submit the corrected request to Empire Northstar Health Plan.",
          hint: "Preauth › Submit to payer. Read the new response at the bottom.",
          steps: [{ action: { kind: "command", id: "ehr.auth.submit", value: "PA1" } }],
        },
        {
          instruction: "The request was approved. Record the authorization number \"NSA-2610-4471\" on Rosa's 10/27/2026 visit.",
          hint: "Preauth › Scheduled visit › Authorization number on the visit › type NSA-2610-4471 and press Enter. The number later goes in Box 23 of the claim.",
          steps: [{ action: { kind: "type", target: "V1.auth", value: "NSA-2610-4471" } }],
        },
      ],
    },
  ],

  "module-2::medical-coding-icd-part-1": [
    {
      id: "ehr-m2-icd-specificity-1",
      app: "ehr",
      title: "Code the visit to the highest specificity",
      scenario:
        "You are coding Harold Brennan's visit at Northstar Primary Care. Dr. Okafor documented primary osteoarthritis of the left knee, essential hypertension and type 2 diabetes without complications. The front desk entered M17.9 as a placeholder. Replace it with what the documentation supports, using the Alphabetic Index to find each code and the Tabular List to confirm it.",
      fileName: "Northstar EHR · Coding",
      minutes: 5,
      initial: practice({
        department: "Northstar Billing Office",
        session: { user: "student", name: "BEOC Student", role: "Coder", signedIn: true },
        workspaces: ["charges", "encoder"],
        nav: { ws: "charges", enc: "E1" },
        patients: [
          {
            id: "P1",
            mrn: "1488250",
            last: "Brennan",
            first: "Harold",
            dob: "09/30/1958",
            sex: "Male",
            pcp: "PRV1",
            signatures: SIGNED,
            coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44171124", relationship: "Self", subscriber: "Brennan, Harold" }],
          },
        ],
        encounters: [
          {
            id: "E1",
            patient: "P1",
            provider: "PRV1",
            date: "10/20/2026",
            note:
              "Established patient seen for left knee pain.\nAssessment:\n1. Unilateral primary osteoarthritis, left knee.\n2. Essential hypertension, controlled on lisinopril.\n3. Type 2 diabetes mellitus without complications.\nMedical decision making: moderate.",
            dx: ["M17.9"],
            lines: [{ id: "L1", code: "99214", units: 1, ptr: "A", fee: 220 }],
            status: "Open",
          },
        ],
      }),
      tasks: [
        {
          instruction: "M17.9 (osteoarthritis of knee, unspecified) is less specific than the documentation. Remove it from Harold Brennan's encounter.",
          hint: "Charges › Diagnoses (Box 21) › click M17.9 › Remove.",
          steps: [
            {
              action: { kind: "command", id: "ehr.dx.remove" },
              requires: { selection: "dx:E1:M17.9" },
              selectHint: "Click M17.9 in the Diagnoses (Box 21) list first.",
            },
          ],
        },
        {
          instruction: "Add the code for unilateral primary osteoarthritis of the left knee. Find the main term in the Alphabetic Index, then confirm the code in the Tabular List.",
          hint: "Encoder › ICD-10-CM › Alphabetic Index › type osteoarthritis › click M17.1- beside knee › Tabular List › click M17.12 › Add to encounter.",
          steps: [{ action: { kind: "command", id: "ehr.dx.add", value: "E1:M17.12" } }],
        },
        {
          instruction: "Add the code for essential hypertension.",
          hint: "Encoder › Alphabetic Index › hypertension › I10 › Tabular List: I10 has no subcodes, so the 3-character code is complete › Add to encounter.",
          steps: [{ action: { kind: "command", id: "ehr.dx.add", value: "E1:I10" } }],
        },
        {
          instruction: "Add the code for type 2 diabetes mellitus without complications.",
          hint: "Encoder › Alphabetic Index › diabetes › type 2 E11.9 › confirm in the Tabular List › Add to encounter.",
          steps: [{ action: { kind: "command", id: "ehr.dx.add", value: "E1:E11.9" } }],
        },
        {
          instruction: "Removing M17.9 cleared the office visit's pointer. Point line 1 (99214) to diagnosis A.",
          hint: "Charges › Charges › line 1 Dx pointer › type A and press Enter.",
          steps: [{ action: { kind: "type", target: "E1.L1.ptr", value: "A" } }],
        },
      ],
    },
  ],
};
