import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED, TODAY } from "./practice";

export const ehrModule9Sims: Record<string, SimDefinition[]> = {
  "module-9::nha-cehrs-exam-prep": [
    {
      id: "ehr-m9-cehrs-review-1",
      app: "ehr",
      title: "CEHRS review: one shift across every domain",
      scenario:
        "A CEHRS-style shift at Northstar Primary Care, one task per exam domain: scheduling, registration with two insurance plans, eligibility, coding, claims, and a privacy decision. Mateo Rivera, age 10, is covered by both parents. Work without notes and note every step where you hesitate.",
      fileName: "Northstar EHR · CEHRS Review",
      minutes: 8,
      initial: practice({
        workspaces: ["search", "chart", "schedule", "encoder", "charges", "claims"],
        chartTabs: ["facesheet", "registration", "documents"],
        nav: { ws: "schedule", day: TODAY, enc: "E1" },
        patients: [
          {
            id: "P1",
            mrn: "2093316",
            last: "Rivera",
            first: "Mateo",
            dob: "03/09/2016",
            sex: "Male",
            phone: "(718) 555-0185",
            street: "27 Bayberry Lane",
            city: "Brooklyn",
            state: "NY",
            zip: "11228",
            pcp: "PRV3",
            signatures: SIGNED,
            guarantor: { name: "Rivera, Ana", relationship: "Parent", dob: "02/11/1985", phone: "(718) 555-0185" },
            coverage: [
              {
                priority: 1,
                payer: "PAY2",
                plan: "Family HMO",
                subscriber: "Rivera, Ana",
                subscriberDob: "02/11/1985",
                relationship: "Child",
                memberId: "AFH845502716",
                group: "NMC-7720",
                copay: "20.00",
                elig: { status: "Active", memberId: "AFH845502716", dob: "02/11/1985", plan: "Family HMO", copay: "20.00" },
              },
            ],
            documents: [
              { id: "D1", date: "10/13/2026", type: "Progress note", title: "Sore throat visit", summary: "Exam, rapid strep result, plan" },
              { id: "D2", date: "10/13/2026", type: "Lab result", title: "Rapid strep test", summary: "Positive" },
            ],
          },
        ],
        eligRecords: [{ payer: "PAY1", memberId: "ENH44176215", dob: "07/24/1983", status: "Active", plan: "Gold PPO", effective: "01/01/2026", copay: "25.00" }],
        appointments: [{ id: "V1", patient: "P1", provider: "PRV3", date: "2026-10-21", time: "08:30", minutes: 15, type: "Follow-up", reason: "Asthma check", status: "Scheduled" }],
        encounters: [
          {
            id: "E1",
            patient: "P1",
            provider: "PRV3",
            date: "10/13/2026",
            note: "Established patient, sore throat and fever for 2 days. Rapid strep test positive. Assessment: streptococcal pharyngitis. Medical decision making: low.",
            dx: [],
            lines: [
              { id: "L1", code: "99213", units: 1, ptr: "", fee: 150 },
              { id: "L2", code: "87880", units: 1, ptr: "", fee: 30 },
            ],
            status: "Open",
          },
        ],
      }),
      tasks: [
        {
          instruction: "Book Mateo Rivera (DOB 03/09/2016) with Priya Natarajan, NP tomorrow, Wednesday 10/21/2026, at 9:00 AM as a Sick visit with the reason \"Ear pain\".",
          hint: "Schedule › next day arrow (Wed 10/21/2026) › click the 9:00 AM slot in the Priya Natarajan, NP column › New appointment › Patient: Rivera, Mateo › Visit type: Sick visit › Reason: Ear pain › Book appointment.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.appt.new", values: { patient: "P1", type: "Sick visit", reason: "Ear pain" } },
              requires: { selection: "slot:PRV3@2026-10-21T09:00" },
              selectHint: "Go to Wednesday 10/21/2026 and click the open 9:00 AM slot in Priya Natarajan's column first.",
            },
          ],
        },
        {
          instruction: "Under the birthday rule his mother's Amberfield plan (birthday in February) stays primary. Add his father's Empire Northstar Health Plan as secondary coverage.",
          hint: "Open Mateo's chart › Registration › Insurance › Add secondary coverage › Secondary coverage › Payer: Empire Northstar Health Plan.",
          steps: [
            { action: { kind: "command", id: "ehr.cov.add", value: "P1:2" } },
            { action: { kind: "type", target: "P1.ins2.payer", value: "PAY1" } },
          ],
        },
        {
          instruction: "Complete the secondary coverage from the father's card: Member ID \"ENH44176215\", Subscriber \"Rivera, Luis\", Subscriber DOB \"07/24/1983\", and Mateo's relationship to the subscriber.",
          hint: "Registration › Insurance › Secondary coverage › Member ID: ENH44176215 › Subscriber (last, first): Rivera, Luis › Subscriber DOB: 07/24/1983 › Patient's relationship to subscriber: Child. Press Enter after each field.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "P1.ins2.memberId", value: "ENH44176215" } },
            { action: { kind: "type", target: "P1.ins2.subscriber", value: "Rivera, Luis" } },
            { action: { kind: "type", target: "P1.ins2.subscriberDob", value: "07/24/1983" } },
            { action: { kind: "type", target: "P1.ins2.relationship", value: "Child" } },
          ],
        },
        {
          instruction: "Verify the secondary coverage electronically.",
          hint: "Registration › Insurance › Secondary coverage › Verify eligibility.",
          steps: [{ action: { kind: "command", id: "ehr.elig.check", value: "P1:2" } }],
        },
        {
          instruction: "Code Mateo's 10/13 sore throat visit: add the diagnosis the note supports.",
          hint: "Encoder › ICD-10-CM › Alphabetic Index › pharyngitis › streptococcal J02.0 › Tabular List › Add to encounter.",
          steps: [{ action: { kind: "command", id: "ehr.dx.add", value: "E1:J02.0" } }],
        },
        {
          instruction: "Point both charge lines to diagnosis A.",
          hint: "Charges › Charges › Dx pointer on line 1 and line 2 › type A and press Enter on each.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "E1.L1.ptr", value: "A" } },
            { action: { kind: "type", target: "E1.L2.ptr", value: "A" } },
          ],
        },
        {
          instruction: "Create the claim and submit it to the primary payer.",
          hint: "Charges › Create claim › Claims › Claim (CMS-1500) › check Box 1a and the scrubber › Submit claim.",
          steps: [
            { action: { kind: "command", id: "ehr.claim.create", value: "E1" } },
            { action: { kind: "command", id: "ehr.claim.submit", value: "C1" } },
          ],
        },
        {
          instruction: "Mateo's grandmother calls for his strep test result. She is not his parent or legal guardian, and his parents have not authorized anyone else to receive his information. Record her request and decline it.",
          hint: "Mateo's chart › Documents › Release of information › Requested by: Family member without authorization › leave the documents unchecked › Decision: Decline: no valid authorization › Record request.",
          steps: [{ action: { kind: "dialog", id: "ehr.roi", values: { patient: "P1", requester: "Family member without authorization", decision: "Decline: no valid authorization" } } }],
        },
      ],
    },
  ],
};
