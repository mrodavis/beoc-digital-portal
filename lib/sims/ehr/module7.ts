import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED, TODAY } from "./practice";

const billing = { user: "student", name: "BEOC Student", role: "Billing", signedIn: true };

export const ehrModule7Sims: Record<string, SimDefinition[]> = {
  "module-7::workflow-and-revenue-cycle-review": [
    {
      id: "ehr-m7-denials-1",
      app: "ehr",
      title: "Trace each denial to the phase that caused it",
      scenario:
        "You work the back end in the Northstar billing office. Four denials arrived this week. Every one surfaced in billing, but most began earlier in the cycle. Work each denial by naming the phase it came from and the next action, then post the one clean remittance and bill the patient.",
      fileName: "Northstar EHR · Billing Office",
      minutes: 6,
      initial: practice({
        department: "Northstar Billing Office",
        session: billing,
        workspaces: ["search", "chart", "claims"],
        chartTabs: ["facesheet", "ledger"],
        nav: { ws: "claims", sub: "queue" },
        fees: { "99204": 340 },
        patients: [
          { id: "P1", mrn: "1381904", last: "Osei", first: "Kofi", dob: "10/02/1983", sex: "Male", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY2", memberId: "AFH118472296", relationship: "Self", subscriber: "Osei, Kofi" }] },
          { id: "P2", mrn: "1594417", last: "Lindgren", first: "Astrid", dob: "02/14/1971", sex: "Female", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44174058", relationship: "Self", subscriber: "Lindgren, Astrid" }] },
          { id: "P3", mrn: "1820653", last: "Castillo", first: "Ramon", dob: "07/27/1966", sex: "Male", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44172187", relationship: "Self", subscriber: "Castillo, Ramon" }] },
          { id: "P4", mrn: "1143378", last: "Brooks", first: "Imani", dob: "12/19/1990", sex: "Female", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44176731", relationship: "Self", subscriber: "Brooks, Imani" }] },
          {
            id: "P5",
            mrn: "2026619",
            last: "Ferreira",
            first: "Lucia",
            dob: "05/08/1980",
            sex: "Female",
            street: "61 Hawthorn Terrace",
            city: "Brooklyn",
            state: "NY",
            zip: "11215",
            signatures: SIGNED,
            coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44179920", relationship: "Self", subscriber: "Ferreira, Lucia" }],
            ledger: [{ date: "09/29/2026", desc: "99204 Office visit, new patient, moderate MDM", charge: 340, party: "Insurance" }],
          },
        ],
        claims: [
          { id: "C1", patient: "P1", payer: "PAY2", provider: "PRV1", dos: "09/14/2026", memberId: "AFH118472296", relationship: "Self", dx: ["J02.0"], lines: [{ id: "L1", code: "99213", units: 1, ptr: "A", fee: 150 }], status: "Denied", carc: "CO-27", age: 36, history: ["09/16/2026 Submitted", "10/14/2026 Denied: CO-27 coverage terminated 08/31/2026"] },
          { id: "C2", patient: "P2", payer: "PAY1", provider: "PRV2", dos: "09/22/2026", memberId: "ENH44174058", relationship: "Self", dx: ["M25.562"], lines: [{ id: "L1", code: "73721", units: 1, ptr: "A", fee: 1150 }], status: "Denied", carc: "CO-197", age: 28, history: ["09/23/2026 Submitted", "10/15/2026 Denied: CO-197 authorization absent"] },
          { id: "C3", patient: "P3", payer: "PAY1", provider: "PRV1", dos: "10/01/2026", memberId: "ENH44172187", relationship: "Self", dx: ["E11.9"], lines: [{ id: "L1", code: "99214", units: 1, ptr: "A", fee: 220 }, { id: "L2", code: "83036", units: 1, ptr: "", fee: 40 }], status: "Denied", carc: "CO-16", age: 19, history: ["10/02/2026 Submitted", "10/16/2026 Denied: CO-16 line 2 has no diagnosis pointer"] },
          { id: "C4", patient: "P4", payer: "PAY1", provider: "PRV3", dos: "06/30/2026", memberId: "ENH44176731", relationship: "Self", dx: ["N39.0"], lines: [{ id: "L1", code: "99213", units: 1, ptr: "A", fee: 150 }], status: "Denied", carc: "CO-29", age: 112, history: ["10/09/2026 Submitted (first time)", "10/17/2026 Denied: CO-29 filed after the 90-day limit"] },
          { id: "C5", patient: "P5", payer: "PAY1", provider: "PRV1", dos: "09/29/2026", memberId: "ENH44179920", relationship: "Self", dx: ["I10"], lines: [{ id: "L1", code: "99204", units: 1, ptr: "A", fee: 340 }], status: "Paid", history: ["09/30/2026 Submitted", "10/18/2026 Paid: ERA R1 received, ready to post"] },
        ],
        remits: [
          {
            id: "R1",
            payer: "PAY1",
            date: "10/18/2026",
            trace: "EFT 8804411",
            lines: [{ id: "RL1", claim: "C5", patient: "P5", code: "99204", dos: "09/29/2026", billed: 340, allowed: 186, paid: 148.8, adj: 154, adjCode: "CO-45", pr: 37.2, prCode: "PR-2", posted: null }],
          },
        ],
      }),
      tasks: [
        {
          instruction: "Work the CO-27 denial on claim C1 (coverage terminated before the visit). Record where it originated and send it to the payer the patient actually has.",
          hint: "Claims › Work queue › click C1 › Work denial › Where did this denial originate?: Front end (patient access) › Next action: Verify coverage and bill the correct payer › Save. Eligibility was never re-verified at check-in.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.denial", values: { phase: "Front end (patient access)", action: "Verify coverage and bill the correct payer" } },
              requires: { selection: "claim:C1" },
              selectHint: "Click claim C1 in the work queue first.",
            },
          ],
        },
        {
          instruction: "Work the CO-197 denial on claim C2 (MRI billed with no authorization on file). Record its phase and the next action this payer allows.",
          hint: "Claims › Work queue › click C2 › Work denial › Front end (patient access) › Next action: Request a retro authorization or appeal › Save.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.denial", values: { phase: "Front end (patient access)", action: "Request a retro authorization or appeal" } },
              requires: { selection: "claim:C2" },
              selectHint: "Click claim C2 in the work queue first.",
            },
          ],
        },
        {
          instruction: "Work the CO-16 denial on claim C3 (the A1c line went out with no diagnosis pointer). Record its phase and the next action.",
          hint: "Claims › Work queue › click C3 › Work denial › Middle (coding and charge capture) › Next action: Correct the claim and resubmit › Save. The pointer is set at charge entry.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.denial", values: { phase: "Middle (coding and charge capture)", action: "Correct the claim and resubmit" } },
              requires: { selection: "claim:C3" },
              selectHint: "Click claim C3 in the work queue first.",
            },
          ],
        },
        {
          instruction: "Work the CO-29 denial on claim C4 (first filed 101 days after the visit; the limit is 90). Record its phase and the next action.",
          hint: "Claims › Work queue › click C4 › Work denial › Back end (claims and follow-up) › Next action: Write off: filing limit passed › Save. A claim past its filing limit is worth nothing, whatever its value.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.denial", values: { phase: "Back end (claims and follow-up)", action: "Write off: filing limit passed" } },
              requires: { selection: "claim:C4" },
              selectHint: "Click claim C4 in the work queue first.",
            },
          ],
        },
        {
          instruction: "Post the ERA line for claim C5: billed $340.00, allowed $186.00, paid $148.80. Post the payment, the $154.00 contractual adjustment (CO-45) and the $37.20 patient responsibility (PR-2 coinsurance).",
          hint: "Claims › Remittance (ERA) › click the C5 line › Post line › Insurance payment 148.80 › Contractual adjustment 154.00, CO-45 › Transfer to patient responsibility 37.20, PR-2 › Post.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.post", values: { payment: "148.80", adjustment: "154.00", adjCode: "CO-45", patientResp: "37.20", prCode: "PR-2" } },
              requires: { selection: "era:RL1" },
              selectHint: "Click the C5 line on the remittance first.",
            },
          ],
        },
        {
          instruction: "Bill Lucia Ferreira for her $37.20 share: send her statement through the patient portal.",
          hint: "Claims › Work queue › click C5 › Open chart › Account › Patient statement › Send by: Patient portal › Generate statement.",
          steps: [{ action: { kind: "dialog", id: "ehr.stmt", values: { patient: "P5", delivery: "Patient portal" } } }],
        },
      ],
    },
  ],

  "module-7::ehr-databases-patient-tracking": [
    {
      id: "ehr-m7-tracking-1",
      app: "ehr",
      title: "Keep the tracker true, then report from it",
      scenario:
        "It is 10:05 AM at Northstar Primary Care. The schedule and the tracker are the database every patient tracking report is built from, so a status left wrong is a report that is wrong. Bring the board up to date, then run the reports the practice manager asked for.",
      fileName: "Northstar EHR · Front Desk",
      minutes: 6,
      initial: practice({
        clock: "10:05",
        workspaces: ["schedule", "tracker", "reports"],
        nav: { ws: "tracker", day: TODAY },
        patients: [
          { id: "P1", mrn: "1450028", last: "Alvarez", first: "Hector", dob: "01/17/1977", sex: "Male", signatures: SIGNED },
          { id: "P2", mrn: "1987334", last: "Park", first: "Sun-Hee", dob: "06/03/1984", sex: "Female", signatures: SIGNED },
          { id: "P3", mrn: "1143378", last: "Brooks", first: "Imani", dob: "12/19/1990", sex: "Female", signatures: SIGNED },
          { id: "P4", mrn: "1366201", last: "Delaney", first: "Frank", dob: "09/09/1951", sex: "Male", signatures: SIGNED },
          {
            id: "P5",
            mrn: "2008815",
            last: "Martin",
            first: "Olivia",
            dob: "04/26/1996",
            sex: "Female",
            signatures: SIGNED,
            coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44173322", relationship: "Self", subscriber: "Martin, Olivia", copay: "25.00" }],
          },
          { id: "P6", mrn: "1716649", last: "Ortiz", first: "Samuel", dob: "11/11/1969", sex: "Male", signatures: SIGNED },
        ],
        appointments: [
          { id: "V1", patient: "P1", provider: "PRV3", date: TODAY, time: "08:30", minutes: 15, type: "Follow-up", reason: "Lab review", status: "Scheduled" },
          { id: "V2", patient: "P2", provider: "PRV1", date: TODAY, time: "09:00", minutes: 15, type: "Sick visit", reason: "Sinus pain", status: "Arrived", since: "09:02" },
          { id: "V3", patient: "P3", provider: "PRV3", date: TODAY, time: "09:15", minutes: 15, type: "Follow-up", reason: "Asthma", status: "Roomed", room: "Exam 2", since: "09:20" },
          { id: "V4", patient: "P4", provider: "PRV1", date: TODAY, time: "09:30", minutes: 15, type: "Follow-up", reason: "Blood pressure", status: "With provider", since: "09:41" },
          { id: "V5", patient: "P5", provider: "PRV1", date: TODAY, time: "10:00", minutes: 15, type: "Sick visit", reason: "Rash", status: "Scheduled" },
          { id: "V6", patient: "P6", provider: "PRV3", date: TODAY, time: "10:15", minutes: 15, type: "Follow-up", reason: "Diabetes", status: "Confirmed" },
        ],
        reportData: {
          noShows: [
            { patient: "Greene, Tasha", date: "10/14/2026", provider: "PRV3", type: "Follow-up" },
            { patient: "Morales, Ivan", date: "10/09/2026", provider: "PRV3", type: "Follow-up" },
            { patient: "Khan, Sadia", date: "10/02/2026", provider: "PRV1", type: "Sick visit" },
            { patient: "Becker, Liam", date: "09/25/2026", provider: "PRV3", type: "New patient" },
            { patient: "Owens, Carla", date: "09/18/2026", provider: "PRV3", type: "Follow-up" },
            { patient: "Silva, Paulo", date: "09/04/2026", provider: "PRV1", type: "Annual physical" },
            { patient: "Nguyen, Linh", date: "08/21/2026", provider: "PRV3", type: "Follow-up" },
            { patient: "Rossi, Marco", date: "08/12/2026", provider: "PRV2", type: "Procedure" },
          ],
        },
      }),
      tasks: [
        {
          instruction: "Hector Alvarez never arrived for his 8:30 AM visit. Mark the appointment as a no-show.",
          hint: "Schedule › click the 8:30 AM Alvarez, Hector appointment in Priya Natarajan's column › No show.",
          steps: [
            {
              action: { kind: "command", id: "ehr.appt.noShow" },
              requires: { selection: "appt:V1" },
              selectHint: "Click Hector Alvarez's 8:30 AM appointment on the schedule first.",
            },
          ],
        },
        {
          instruction: "Sun-Hee Park has been waiting since 9:02 and is now in an exam room. Show her as roomed.",
          hint: "Tracker › click Sun-Hee Park's card in Arrived › Room patient (or drag the card to Roomed).",
          steps: [
            {
              action: { kind: "command", id: "ehr.track.status", value: "Roomed" },
              requires: { selection: "appt:V2" },
              selectHint: "Click Sun-Hee Park's card on the tracker first.",
            },
          ],
        },
        {
          instruction: "Dr. Okafor has finished with Frank Delaney. Move him to Checkout.",
          hint: "Tracker › click Frank Delaney's card in With provider › Ready for checkout (or drag it to Checkout).",
          steps: [
            {
              action: { kind: "command", id: "ehr.track.status", value: "Checkout" },
              requires: { selection: "appt:V4" },
              selectHint: "Click Frank Delaney's card on the tracker first.",
            },
          ],
        },
        {
          instruction: "Olivia Martin just arrived for her 10:00 AM visit. Check her in; she pays her $25.00 copay by check.",
          hint: "Tracker › click Olivia Martin's card in Scheduled › Check in › Amount collected: 25.00 › Payment method: Check › Check in.",
          steps: [
            {
              action: { kind: "dialog", id: "ehr.checkin", values: { collected: "25.00", method: "Check" } },
              requires: { selection: "appt:V5" },
              selectHint: "Click Olivia Martin's card or appointment first.",
            },
          ],
        },
        {
          instruction: "Run the Patient tracking report for Today, grouped by Status.",
          hint: "Reports › Patient tracking › Group by: Status › Period: Today › Run.",
          steps: [{ action: { kind: "dialog", id: "ehr.report.run", values: { report: "Patient tracking", groupBy: "Status", period: "Today" } } }],
        },
        {
          instruction: "Run the No-shows report for the Last 90 days grouped by Provider, then flag the provider with the most no-shows for follow-up.",
          hint: "Reports › No-shows › Group by: Provider › Period: Last 90 days › Run › click the Priya Natarajan, NP row › Flag for follow-up.",
          steps: [
            { action: { kind: "dialog", id: "ehr.report.run", values: { report: "No-shows", groupBy: "Provider", period: "Last 90 days" } } },
            {
              action: { kind: "command", id: "ehr.report.flag" },
              requires: { selection: "row:Provider:PRV3" },
              selectHint: "Click the row for the provider with the most no-shows first.",
            },
          ],
        },
      ],
    },
    {
      id: "ehr-m7-ar-2",
      app: "ehr",
      title: "Find where the money is stuck",
      scenario:
        "The practice manager has a feeling that collections dropped. A feeling is not actionable. Run the A/R aging and denial reports, find the payer and the denial reason behind the problem, and send the manager a summary she can act on.",
      fileName: "Northstar EHR · Reports",
      minutes: 5,
      initial: practice({
        department: "Northstar Billing Office",
        session: billing,
        workspaces: ["reports"],
        nav: { ws: "reports" },
        patients: [],
        reportData: {
          arAging: [
            { payer: "PAY1", b0: 98000, b31: 46000, b61: 22000, b91: 16000 },
            { payer: "PAY2", b0: 38000, b31: 24000, b61: 20000, b91: 58000 },
            { payer: "PAY3", b0: 36000, b31: 14000, b61: 6000, b91: 16000 },
            { payer: "PAY4", b0: 8000, b31: 4000, b61: 2000, b91: 4000 },
          ],
          denials: [
            { claim: "C2290", patient: "Lindgren, Astrid", payer: "PAY1", carc: "CO-197", reason: "Authorization absent", amount: 1150, date: "10/15/2026" },
            { claim: "C2281", patient: "Mbeki, Thandi", payer: "PAY2", carc: "CO-197", reason: "Authorization absent", amount: 1150, date: "10/09/2026" },
            { claim: "C2263", patient: "Fischer, Jonas", payer: "PAY2", carc: "CO-197", reason: "Authorization absent", amount: 1200, date: "10/01/2026" },
            { claim: "C2247", patient: "Haddad, Rania", payer: "PAY2", carc: "CO-197", reason: "Authorization absent", amount: 1150, date: "09/24/2026" },
            { claim: "C2231", patient: "Doyle, Siobhan", payer: "PAY1", carc: "CO-197", reason: "Authorization absent", amount: 1200, date: "09/16/2026" },
            { claim: "C2219", patient: "Ito, Kenji", payer: "PAY2", carc: "CO-197", reason: "Authorization absent", amount: 1150, date: "09/03/2026" },
            { claim: "C2204", patient: "Abara, Chidi", payer: "PAY2", carc: "CO-197", reason: "Authorization absent", amount: 1150, date: "08/27/2026" },
            { claim: "C2288", patient: "Osei, Kofi", payer: "PAY2", carc: "CO-27", reason: "Coverage terminated", amount: 150, date: "10/14/2026" },
            { claim: "C2252", patient: "Pereira, Ana", payer: "PAY1", carc: "CO-27", reason: "Coverage terminated", amount: 220, date: "09/26/2026" },
            { claim: "C2236", patient: "Walsh, Declan", payer: "PAY4", carc: "CO-27", reason: "Coverage terminated", amount: 95, date: "09/10/2026" },
            { claim: "C2295", patient: "Castillo, Ramon", payer: "PAY1", carc: "CO-16", reason: "Missing information", amount: 40, date: "10/16/2026" },
            { claim: "C2240", patient: "Yilmaz, Elif", payer: "PAY3", carc: "CO-16", reason: "Missing information", amount: 150, date: "09/19/2026" },
            { claim: "C2297", patient: "Brooks, Imani", payer: "PAY1", carc: "CO-29", reason: "Timely filing", amount: 150, date: "10/17/2026" },
            { claim: "C2225", patient: "Kowalski, Piotr", payer: "PAY2", carc: "CO-97", reason: "Included in another service", amount: 35, date: "09/08/2026" },
          ],
          metrics: { avgDailyCharges: 9800, claimsSubmitted: 240, firstPassAccepted: 218 },
        },
      }),
      tasks: [
        {
          instruction: "Run the A/R aging report.",
          hint: "Reports › A/R aging › Run. Read the summary: Total A/R, the amount over 90 days, its percentage, and Days in A/R.",
          steps: [{ action: { kind: "dialog", id: "ehr.report.run", values: { report: "A/R aging" } } }],
        },
        {
          instruction: "Sort the report so the payer with the largest balance over 90 days is at the top.",
          hint: "Click the Over 90 column header (click again to reverse the order) until the largest amount is first.",
          steps: [{ action: { kind: "command", id: "ehr.report.sort", value: "b91:desc" } }],
        },
        {
          instruction: "Flag that payer for follow-up.",
          hint: "Click the Amberfield Health Plan row › Flag for follow-up. Its over-90 balance is far above the 15 to 20% target.",
          steps: [
            {
              action: { kind: "command", id: "ehr.report.flag" },
              requires: { selection: "row:PAY2" },
              selectHint: "Click the row for the payer with the largest Over 90 balance first.",
            },
          ],
        },
        {
          instruction: "Run the Denials report for the Last 90 days grouped by Reason.",
          hint: "Reports › Denials › Group by: Reason › Period: Last 90 days › Run.",
          steps: [{ action: { kind: "dialog", id: "ehr.report.run", values: { report: "Denials", groupBy: "Reason", period: "Last 90 days" } } }],
        },
        {
          instruction: "Flag the denial reason that appears most often. It points to one front-end process to fix.",
          hint: "Click the CO-197 Authorization absent row (7 denials) › Flag for follow-up. Seven authorization denials are one process problem repeated, not seven problems.",
          steps: [
            {
              action: { kind: "command", id: "ehr.report.flag" },
              requires: { selection: "row:Reason:CO-197" },
              selectHint: "Click the row for the most frequent denial reason first.",
            },
          ],
        },
        {
          instruction: "Export the denials summary as a PDF for the Practice manager (internal).",
          hint: "Export › Format: PDF › Recipient: Practice manager (internal) › Export. Reports carry PHI; send them only to someone with a work need.",
          steps: [{ action: { kind: "dialog", id: "ehr.report.export", values: { format: "PDF", recipient: "Practice manager (internal)" } } }],
        },
      ],
    },
  ],
};
