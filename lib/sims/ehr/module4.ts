import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED, TODAY } from "./practice";

export const ehrModule4Sims: Record<string, SimDefinition[]> = {
  "module-4::introduction-to-hcpcs": [
    {
      id: "ehr-m4-hcpcs-1",
      app: "ehr",
      title: "Bill the drug, the injection and the crutches",
      scenario:
        "Walter Simmons, who has an Empire Northstar Health Plan policy through his employer, sprained his right ankle in a fall at home. At Northstar Orthopedics Dr. Reyes gave ketorolac 30 mg by intramuscular injection and the clinic dispensed a pair of crutches. CPT covers giving the injection but not the drug or the equipment. Add the HCPCS Level II codes, get the drug units right, and link every line.",
      fileName: "Northstar EHR · Coding",
      minutes: 5,
      initial: practice({
        department: "Northstar Billing Office",
        session: { user: "student", name: "BEOC Student", role: "Coder", signedIn: true },
        workspaces: ["charges", "encoder"],
        nav: { ws: "encoder", sub: "hcpcs", enc: "E1" },
        patients: [
          { id: "P1", mrn: "1225718", last: "Simmons", first: "Walter", dob: "02/08/1955", sex: "Male", pcp: "PRV1", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", plan: "Gold PPO", memberId: "ENH44175107", group: "BEOC-2026", relationship: "Self", subscriber: "Simmons, Walter" }] },
        ],
        encounters: [
          {
            id: "E1",
            patient: "P1",
            provider: "PRV2",
            date: "10/20/2026",
            note:
              "Established patient. Fell at home yesterday and twisted the right ankle. Assessment: sprain of the right ankle, ligament not specified, initial encounter. X-ray negative at urgent care.\nKetorolac 30 mg given by intramuscular injection in the office for pain.\nDispensed one pair of adjustable aluminum underarm crutches with pads, tips and handgrips; gait training given.\nSeparately identifiable evaluation documented (modifier 25 on the E/M).",
            dx: ["S93.401A"],
            lines: [{ id: "L1", code: "99213", mod1: "25", units: 1, ptr: "A", fee: 150 }],
            status: "Open",
          },
        ],
      }),
      tasks: [
        {
          instruction: "Add the HCPCS Level II code for the ketorolac that was injected.",
          hint: "Encoder › HCPCS Level II › J (drugs administered other than by mouth) › J1885 Injection, ketorolac tromethamine, per 15 mg › Add charge.",
          steps: [{ action: { kind: "command", id: "ehr.chg.add", value: "E1:J1885" } }],
        },
        {
          instruction: "J1885 is billed per 15 mg and Dr. Reyes gave 30 mg. Enter the correct number of units on the J1885 line.",
          hint: "30 mg ÷ 15 mg = 2. Charges › line 2 Units › type 2 and press Enter.",
          steps: [{ action: { kind: "type", target: "E1.L2.units", value: "2" } }],
        },
        {
          instruction: "Add the CPT code for giving the intramuscular injection.",
          hint: "Encoder › CPT › Medicine › 96372 (injection into a muscle or under the skin) › Add charge.",
          steps: [{ action: { kind: "command", id: "ehr.chg.add", value: "E1:96372" } }],
        },
        {
          instruction: "Add the HCPCS Level II code for the crutches the clinic dispensed.",
          hint: "Encoder › HCPCS Level II › E (durable medical equipment) › E0114 Crutches, underarm, other than wood › Add charge.",
          steps: [{ action: { kind: "command", id: "ehr.chg.add", value: "E1:E0114" } }],
        },
        {
          instruction: "Point the J1885, 96372 and E0114 lines (lines 2, 3 and 4) to diagnosis A.",
          hint: "Charges › Charges › Dx pointer on lines 2, 3 and 4 › type A and press Enter on each.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "E1.L2.ptr", value: "A" } },
            { action: { kind: "type", target: "E1.L3.ptr", value: "A" } },
            { action: { kind: "type", target: "E1.L4.ptr", value: "A" } },
          ],
        },
      ],
    },
  ],

  "module-4::midterm-review": [
    {
      id: "ehr-m4-midterm-review-1",
      app: "ehr",
      title: "Midterm review: one visit, front to back",
      scenario:
        "A timed run through everything from Modules 1 to 4, for one patient at Northstar Primary Care. Keisha Monroe fell on her outstretched right hand. Find the right chart, verify and check her in, code the visit with full specificity, link it, clear the scrubber and submit the claim. Note every step where you had to stop and think.",
      fileName: "Northstar EHR · Front Desk and Billing",
      minutes: 8,
      initial: practice({
        clock: "09:25",
        workspaces: ["search", "chart", "schedule", "encoder", "charges", "claims"],
        chartTabs: ["facesheet", "registration"],
        nav: { ws: "schedule", day: TODAY, enc: "E1" },
        patients: [
          {
            id: "P1",
            mrn: "2012487",
            last: "Monroe",
            first: "Keisha",
            dob: "07/09/1990",
            sex: "Female",
            phone: "(347) 555-0158",
            street: "3 Chestnut Hollow",
            city: "Brooklyn",
            state: "NY",
            zip: "11212",
            pcp: "PRV1",
            signatures: SIGNED,
            coverage: [
              {
                priority: 1,
                payer: "PAY2",
                plan: "Silver HMO",
                subscriber: "Monroe, Keisha",
                subscriberDob: "07/09/1990",
                relationship: "Self",
                memberId: "AFH630115288",
                group: "NMC-4410",
                copay: "30.00",
                elig: { status: "Active", memberId: "AFH630115288", dob: "07/09/1990", plan: "Silver HMO", effective: "01/01/2026", copay: "30.00", coinsurance: "0%" },
              },
            ],
          },
          { id: "P2", mrn: "1840356", last: "Monroe", first: "Keisha", dob: "11/30/1987", sex: "Female", phone: "(718) 555-0171", pcp: "PRV3", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY4", memberId: "MCD78821405", relationship: "Self", subscriber: "Monroe, Keisha" }] },
        ],
        appointments: [
          { id: "V1", patient: "P1", provider: "PRV1", date: TODAY, time: "09:30", minutes: 15, type: "Sick visit", reason: "Right wrist pain after a fall", status: "Scheduled" },
          { id: "V2", patient: "P2", provider: "PRV3", date: TODAY, time: "10:15", minutes: 15, type: "Follow-up", reason: "Medication review", status: "Scheduled" },
        ],
        encounters: [
          {
            id: "E1",
            patient: "P1",
            provider: "PRV1",
            date: "10/20/2026",
            visit: "V1",
            note:
              "Fell on an outstretched right hand this morning. X-ray right wrist, 3 views: Colles' fracture of the right radius, closed. Assessment: Colles' fracture of the right radius, initial encounter for closed fracture. Referred to orthopedics for fracture care. Medical decision making: low.",
            dx: [],
            lines: [{ id: "L1", code: "99213", units: 1, ptr: "", fee: 150 }],
            status: "Open",
          },
        ],
      }),
      tasks: [
        {
          instruction: "Two patients are named Keisha Monroe. Open the chart for the one born 07/09/1990 and verify her primary coverage.",
          hint: "Patients › search Monroe, Keisha › pick the row with DOB 07/09/1990 › Open chart › Registration › Insurance › Verify eligibility.",
          steps: [
            { action: { kind: "command", id: "ehr.chart.open", value: "P1" } },
            { action: { kind: "command", id: "ehr.elig.check", value: "P1:1" } },
          ],
        },
        {
          instruction: "Check Keisha in for her 9:30 AM visit. She pays her $30.00 copay in cash.",
          hint: "Schedule › click the 9:30 AM Monroe, Keisha appointment › Check in › Amount collected: 30.00 › Payment method: Cash › Check in.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.checkin", values: { collected: "30.00", method: "Cash" } },
              requires: { selection: "appt:V1" },
              selectHint: "Click Keisha Monroe's 9:30 AM appointment first.",
            },
          ],
        },
        {
          instruction: "Code the fracture from the documentation. Use the Index and the Tabular List, and choose the 7th character for the initial encounter of a closed fracture.",
          hint: "Encoder › ICD-10-CM › Alphabetic Index › type Colles' › Colles' fracture S52.53- (Fracture › radius › lower end › Colles' says see Colles' fracture) › Tabular List › S52.531 (right radius) › 7th character A › Add to encounter.",
          steps: [{ action: { kind: "command", id: "ehr.dx.add", value: "E1:S52.531A" } }],
        },
        {
          instruction: "Add the CPT code for the 3-view wrist X-ray.",
          hint: "Encoder › CPT › Radiology › 73110 Wrist X-ray, complete, at least 3 views › Add charge.",
          steps: [{ action: { kind: "command", id: "ehr.chg.add", value: "E1:73110" } }],
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
          instruction: "Create the claim, then clear the scrubber's laterality edit by adding the modifier for the right side to the wrist X-ray.",
          hint: "Charges › Create claim › Claims › Claim (CMS-1500) › line 2 (73110) first Modifier box › type RT and press Enter.",
          steps: [
            { action: { kind: "command", id: "ehr.claim.create", value: "E1" } },
            { action: { kind: "type", target: "C1.L2.mod1", value: "RT" } },
          ],
        },
        {
          instruction: "Submit claim C1.",
          hint: "Claims › Claim (CMS-1500) › Submit claim.",
          steps: [{ action: { kind: "command", id: "ehr.claim.submit", value: "C1" } }],
        },
      ],
    },
  ],
};
