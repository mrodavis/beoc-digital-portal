import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED, TODAY } from "./practice";

export const ehrModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::patient-workflow-and-revenue-cycle": [
    {
      id: "ehr-m1-workflow-front-1",
      app: "ehr",
      title: "Take a new patient from booking to check-out",
      scenario:
        "You work the front desk at Northstar Primary Care. Jordan Ellis called this morning as a new patient and can come in today. Walk her visit through the front-office steps of the patient workflow: schedule, pre-register, verify coverage, check in, track the visit, and check out. Steps 1 through 5 are where most denials begin, so do them in order.",
      fileName: "Northstar EHR · Front Desk",
      minutes: 7,
      initial: practice({
        clock: "09:40",
        workspaces: ["search", "chart", "schedule", "tracker"],
        chartTabs: ["facesheet", "registration"],
        nav: { ws: "schedule", day: TODAY },
        patients: [
          {
            id: "P1",
            mrn: "2041175",
            last: "Ellis",
            first: "Jordan",
            dob: "06/14/1991",
            sex: "Female",
            phone: "(718) 555-0142",
            street: "48 Larkspur Lane",
            city: "Brooklyn",
            state: "NY",
            zip: "11226",
            language: "English",
            pcp: "PRV1",
            coverage: [
              {
                priority: 1,
                payer: "PAY1",
                plan: "Gold PPO",
                subscriber: "Ellis, Jordan",
                subscriberDob: "06/14/1991",
                relationship: "Self",
                memberId: "",
                group: "BEOC-2026",
                effective: "01/01/2026",
                copay: "25.00",
                card: { name: "ELLIS, JORDAN", memberId: "ENH44170382", group: "BEOC-2026", plan: "Gold PPO", copays: ["PCP $25", "Specialist $40", "ER $150"] },
                elig: { status: "Active", memberId: "ENH44170382", dob: "06/14/1991", plan: "Gold PPO", effective: "01/01/2026", copay: "25.00", specialist: "40.00", deductible: "1,000.00", deductibleMet: "0.00", coinsurance: "20% after deductible" },
              },
            ],
            guarantor: { name: "Ellis, Jordan", relationship: "Self", dob: "06/14/1991", phone: "(718) 555-0142" },
            signatures: { npp: null, aob: "10/19/2026", fin: "10/19/2026" },
          },
          { id: "P2", mrn: "1873302", last: "Vega", first: "Marisol", dob: "03/02/1979", sex: "Female", phone: "(718) 555-0118", pcp: "PRV1", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY2", memberId: "AFH118230547", relationship: "Self", subscriber: "Vega, Marisol" }] },
          { id: "P3", mrn: "1950468", last: "Asante", first: "Kwame", dob: "11/27/1988", sex: "Male", phone: "(347) 555-0163", pcp: "PRV3", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44173396", relationship: "Self", subscriber: "Asante, Kwame" }] },
          { id: "P4", mrn: "1630941", last: "Park", first: "Denise", dob: "08/19/1959", sex: "Female", phone: "(718) 555-0190", pcp: "PRV1", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY3", memberId: "5TW2HD8QK61", relationship: "Self", subscriber: "Park, Denise" }] },
        ],
        appointments: [
          { id: "V1", patient: "P2", provider: "PRV1", date: TODAY, time: "09:00", minutes: 15, type: "Follow-up", reason: "Blood pressure check", status: "Arrived", since: "09:02" },
          { id: "V2", patient: "P3", provider: "PRV3", date: TODAY, time: "09:15", minutes: 15, type: "Sick visit", reason: "Cough", status: "Roomed", room: "Exam 4", since: "09:20" },
          { id: "V3", patient: "P4", provider: "PRV1", date: TODAY, time: "10:00", minutes: 30, type: "Annual physical", reason: "Annual physical", status: "Confirmed" },
        ],
      }),
      tasks: [
        {
          instruction: "Book Jordan Ellis (DOB 06/14/1991) with Dr. Amara Okafor today at 10:30 AM as a New patient visit with the reason \"Establish care\".",
          hint: "Schedule › click the empty 10:30 AM slot in the Amara Okafor, MD column › New appointment (or double-click the slot) › Patient: Ellis, Jordan › Visit type: New patient › Reason for visit: Establish care › Book appointment.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.appt.new", values: { patient: "P1", type: "New patient", reason: "Establish care" } },
              requires: { selection: "slot:PRV1@2026-10-20T10:30" },
              selectHint: "Click the open 10:30 AM slot in Dr. Okafor's column first.",
            },
          ],
        },
        {
          instruction: "Pre-register Jordan: her Member ID is blank. Enter it exactly as printed on her scanned insurance card: \"ENH44170382\".",
          hint: "Open Jordan's chart (Schedule › her 10:30 AM appointment › Open chart) › Registration › Insurance › View card › Member ID › type ENH44170382 and press Enter.",
          steps: [{ action: { kind: "type", target: "P1.ins1.memberId", value: "ENH44170382" } }],
        },
        {
          instruction: "Verify Jordan Ellis's primary coverage electronically before the visit.",
          hint: "Chart › Registration › Insurance › Primary coverage › Verify eligibility. Read the 271 response under the form: active coverage, $25 office visit copay.",
          steps: [{ action: { kind: "command", id: "ehr.elig.check", value: "P1:1" } }],
        },
        {
          instruction: "Jordan is a new patient. Capture her signature acknowledging the Notice of Privacy Practices.",
          hint: "Chart › Registration › Signatures › Notice of Privacy Practices acknowledgment (HIPAA) › Capture signature › click the signature box › Accept signature.",
          steps: [{ action: { kind: "command", id: "ehr.sig.capture", value: "P1:npp" } }],
        },
        {
          instruction: "Check Jordan Ellis in for her 10:30 AM visit and collect her $25.00 copay by credit card.",
          hint: "Schedule › click Jordan's 10:30 AM appointment › Check in › Amount collected: 25.00 › Payment method: Credit card › Check in.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.checkin", values: { collected: "25.00", method: "Credit card" } },
              requires: { selection: "appt:V4" },
              selectHint: "Click Jordan Ellis's 10:30 AM appointment first.",
            },
          ],
        },
        {
          instruction: "The medical assistant has taken Jordan back to an exam room. Show her as roomed on the patient tracker.",
          hint: "Tracker › click Jordan Ellis's card in the Arrived column › Room patient (or drag the card to Roomed).",
          steps: [
            {
              action: { kind: "command", id: "ehr.track.status", value: "Roomed" },
              requires: { selection: "appt:V4" },
              selectHint: "Click Jordan Ellis's card on the tracker first.",
            },
          ],
        },
        {
          instruction: "Dr. Okafor has finished the visit. Move Jordan to Checkout on the tracker.",
          hint: "Tracker › click Jordan's card › Ready for checkout (or drag the card to the Checkout column).",
          steps: [
            {
              action: { kind: "command", id: "ehr.track.status", value: "Checkout" },
              requires: { selection: "appt:V4" },
              selectHint: "Click Jordan Ellis's card on the tracker first.",
            },
          ],
        },
        {
          instruction: "Check Jordan out with a follow-up in 1 year and no referral.",
          hint: "Tracker (or Schedule) › click Jordan's card › Check out › Follow-up: 1 year › Referral: None › Check out.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.checkout", values: { followUp: "1 year", referral: "None" } },
              requires: { selection: "appt:V4" },
              selectHint: "Click Jordan Ellis's card or appointment first.",
            },
          ],
        },
      ],
    },
    {
      id: "ehr-m1-workflow-back-2",
      app: "ehr",
      title: "Follow a coded visit to a posted payment",
      scenario:
        "You work in the Northstar billing office. Renee Whitaker's new-patient visit on 10/14/2026 is documented and coded. Take it through the back end of the revenue cycle: finish charge entry, submit the claim, post what the payer sends back, and bill Renee for her share.",
      fileName: "Northstar EHR · Billing Office",
      minutes: 5,
      initial: practice({
        department: "Northstar Billing Office",
        session: { user: "student", name: "BEOC Student", role: "Billing", signedIn: true },
        workspaces: ["search", "chart", "charges", "claims"],
        chartTabs: ["facesheet", "ledger"],
        nav: { ws: "charges", enc: "E1" },
        patients: [
          {
            id: "P1",
            mrn: "2038816",
            last: "Whitaker",
            first: "Renee",
            dob: "01/23/1975",
            sex: "Female",
            phone: "(929) 555-0137",
            street: "212 Marigold Court",
            city: "Brooklyn",
            state: "NY",
            zip: "11203",
            pcp: "PRV1",
            problems: ["I10"],
            signatures: SIGNED,
            coverage: [
              { priority: 1, payer: "PAY2", plan: "Silver HMO", subscriber: "Whitaker, Renee", relationship: "Self", memberId: "AFH302948817", group: "NMC-4410", elig: { status: "Active", memberId: "AFH302948817", coinsurance: "20%" } },
            ],
          },
        ],
        encounters: [
          {
            id: "E1",
            patient: "P1",
            provider: "PRV1",
            date: "10/14/2026",
            note: "New patient visit to establish care. History of high blood pressure; 146/92 today. Assessment: essential hypertension. Medical decision making: low.",
            dx: ["I10"],
            lines: [{ id: "L1", code: "99203", units: 1, ptr: "", fee: 185 }],
            status: "Open",
            outcome: { status: "Paid", lines: { L1: { allowed: 132, paid: 105.6, pr: 26.4, prCode: "PR-2" } } },
          },
        ],
      }),
      tasks: [
        {
          instruction: "Finish charge entry: point Renee Whitaker's 99203 office visit line to diagnosis A (I10).",
          hint: "Charges › Charges › line 1 Dx pointer › type A and press Enter.",
          steps: [{ action: { kind: "type", target: "E1.L1.ptr", value: "A" } }],
        },
        {
          instruction: "Create the claim for the visit.",
          hint: "Charges › Create claim. The claim opens with the scrubber on the right; it should show no errors.",
          steps: [{ action: { kind: "command", id: "ehr.claim.create", value: "E1" } }],
        },
        {
          instruction: "Submit claim C1 to Amberfield Health Plan.",
          hint: "Claims › Claim (CMS-1500) › Submit claim.",
          steps: [{ action: { kind: "command", id: "ehr.claim.submit", value: "C1" } }],
        },
        {
          instruction: "The payer adjudicated the claim. Post the ERA line: insurance payment $105.60, contractual adjustment $53.00 (CO-45), and $26.40 to patient responsibility (PR-2 coinsurance).",
          hint: "Claims › Remittance (ERA) › click the 99203 line › Post line › Insurance payment 105.60 › Contractual adjustment 53.00, reason CO-45 › Transfer to patient responsibility 26.40, reason PR-2 › Post. (Billed 185.00 minus allowed 132.00 = 53.00.)",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.post", values: { payment: "105.60", adjustment: "53.00", adjCode: "CO-45", patientResp: "26.40", prCode: "PR-2" } },
              requires: { selection: "era:RL1" },
              selectHint: "Click the 99203 line on the remittance first.",
            },
          ],
        },
        {
          instruction: "Bill Renee for her share: send her a patient statement by mail.",
          hint: "Open her chart (Claims › Open chart) › Account › Patient statement › Send by: Mail › Generate statement.",
          steps: [{ action: { kind: "dialog", id: "ehr.stmt", values: { patient: "P1", delivery: "Mail" } } }],
        },
      ],
    },
  ],
};
