import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED } from "./practice";

export const ehrModule8Sims: Record<string, SimDefinition[]> = {
  "module-8::legal-aspects-and-clinical-data-analysis": [
    {
      id: "ehr-m8-access-data-1",
      app: "ehr",
      title: "Right of access, quality data and de-identification",
      scenario:
        "You work in Health Information Management at Northstar Medical Center. A patient wants a copy of her record, the care team wants the diabetes care-gap list, and a university researcher wants the same data for a study. Each request has a different rule: the patient's right of access, use for care and operations, and de-identification before data leaves the practice.",
      fileName: "Northstar EHR · Health Information Management",
      minutes: 5,
      initial: practice({
        department: "Health Information Management",
        session: { user: "student", name: "BEOC Student", role: "HIM Specialist", signedIn: true },
        workspaces: ["search", "chart", "reports"],
        chartTabs: ["facesheet", "documents"],
        nav: { ws: "search" },
        patients: [
          {
            id: "P1",
            mrn: "1634582",
            last: "Tran",
            first: "Evelyn",
            dob: "05/03/1971",
            sex: "Female",
            phone: "(718) 555-0153",
            pcp: "PRV1",
            signatures: SIGNED,
            coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44178413", relationship: "Self", subscriber: "Tran, Evelyn" }],
            documents: [
              { id: "D1", date: "02/10/2026", type: "Progress note", title: "Diabetes follow-up", summary: "Assessment and plan" },
              { id: "D2", date: "02/10/2026", type: "Lab result", title: "Hemoglobin A1c", summary: "Lab report" },
              { id: "D3", date: "07/22/2026", type: "Progress note", title: "Annual physical", summary: "Preventive visit" },
              { id: "D4", date: "07/22/2026", type: "Lab result", title: "Lipid panel", summary: "Lab report" },
            ],
          },
          { id: "P2", mrn: "1588204", last: "Tran", first: "Evelyn", dob: "10/29/1993", sex: "Female", pcp: "PRV3", signatures: SIGNED },
        ],
        reportData: {
          quality: [
            { patient: "Tran, Evelyn", mrn: "1634582", dob: "05/03/1971", provider: "PRV1", lastA1c: "02/10/2026", value: "7.4%", gap: true },
            { patient: "Price, Leonard", mrn: "1097342", dob: "04/14/1949", provider: "PRV1", lastA1c: "09/02/2026", value: "6.9%", gap: false },
            { patient: "Wells, Tamara", mrn: "1356029", dob: "02/17/1962", provider: "PRV1", lastA1c: "08/14/2026", value: "8.1%", gap: false },
            { patient: "Castillo, Ramon", mrn: "1820653", dob: "07/27/1966", provider: "PRV1", lastA1c: "10/01/2026", value: "7.0%", gap: false },
            { patient: "Mensah, Gloria", mrn: "1290446", dob: "12/12/1957", provider: "PRV3", lastA1c: "11/18/2025", value: "9.2%", gap: true },
            { patient: "Ortiz, Samuel", mrn: "1716649", dob: "11/11/1969", provider: "PRV3", lastA1c: "06/30/2026", value: "7.7%", gap: false },
            { patient: "Brennan, Harold", mrn: "1488250", dob: "09/30/1958", provider: "PRV1", lastA1c: "03/27/2026", value: "6.8%", gap: true },
            { patient: "Abara, Chidi", mrn: "1925517", dob: "03/05/1975", provider: "PRV3", lastA1c: "07/09/2026", value: "7.2%", gap: false },
          ],
        },
      }),
      tasks: [
        {
          instruction: "Open the chart for Evelyn Tran, born 05/03/1971.",
          hint: "Patients › Name: Tran, Evelyn › Search › pick the row with DOB 05/03/1971 › Open chart.",
          steps: [{ action: { kind: "command", id: "ehr.chart.open", value: "P1" } }],
        },
        {
          instruction: "Evelyn asked for an electronic copy of her whole record through the patient portal. Record her right-of-access request and release all four documents now.",
          hint: "Chart › Documents › Release of information › Requested by: Patient (right of access) › check all four documents › Format: Electronic copy (patient portal) › Decision: Release now › Record request. Holding it for weeks could be information blocking.",
          steps: [{ action: { kind: "dialog", id: "ehr.roi", values: { patient: "P1", requester: "Patient (right of access)", docs: "D1,D2,D3,D4", format: "Electronic copy (patient portal)", decision: "Release now" } } }],
        },
        {
          instruction: "Run the Diabetes care gaps report.",
          hint: "Reports › Diabetes care gaps › Run. Read the measure rate in the summary.",
          steps: [{ action: { kind: "dialog", id: "ehr.report.run", values: { report: "Diabetes care gaps" } } }],
        },
        {
          instruction: "Flag the patient whose last hemoglobin A1c is the oldest for care-team outreach.",
          hint: "Click the Last A1c column header to sort by date › click the row with the oldest date (Mensah, Gloria, 11/18/2025) › Flag for follow-up.",
          steps: [
            {
              action: { kind: "command", id: "ehr.report.flag" },
              requires: { selection: "row:1290446" },
              selectHint: "Click the row with the oldest Last A1c date first.",
            },
          ],
        },
        {
          instruction: "A university researcher asked for this data for a study. Export it de-identified.",
          hint: "Export › Format: Excel (CSV) or PDF › Recipient: University researcher (outside) › check De-identify › Export. Removing the name alone is not de-identification.",
          steps: [{ action: { kind: "dialog", id: "ehr.report.export", values: { recipient: "University researcher (outside)", deidentify: true } } }],
        },
      ],
    },
  ],

  "module-8::regulatory-compliance-and-revenue-cycle": [
    {
      id: "ehr-m8-compliant-coding-1",
      app: "ehr",
      title: "Code what is documented, and say no the right way",
      scenario:
        "Northstar Primary Care is behind on revenue. Dr. Okafor asks you to bill a 99215 for Victor Lindqvist's visit, but the note documents low-complexity decision making. Follow the process from the lesson: treat it as a documentation question first, code what the note supports, and escalate if you are pressed. Then fix an unbundled lab claim before it goes out.",
      fileName: "Northstar EHR · Coding",
      minutes: 6,
      initial: practice({
        department: "Northstar Billing Office",
        session: { user: "student", name: "BEOC Student", role: "Coder", signedIn: true },
        workspaces: ["charges", "encoder", "claims"],
        nav: { ws: "charges", enc: "E1" },
        patients: [
          { id: "P1", mrn: "1542216", last: "Lindqvist", first: "Victor", dob: "03/15/1966", sex: "Male", street: "18 Sorrel Street", city: "Brooklyn", state: "NY", zip: "11218", pcp: "PRV1", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44171839", relationship: "Self", subscriber: "Lindqvist, Victor", elig: { status: "Active", memberId: "ENH44171839" } }] },
          { id: "P2", mrn: "1679940", last: "Solberg", first: "Ingrid", dob: "08/22/1973", sex: "Female", street: "540 Thistle Avenue", city: "Brooklyn", state: "NY", zip: "11220", pcp: "PRV3", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY2", memberId: "AFH772054913", relationship: "Self", subscriber: "Solberg, Ingrid", elig: { status: "Active", memberId: "AFH772054913" } }] },
        ],
        encounters: [
          {
            id: "E1",
            patient: "P1",
            provider: "PRV1",
            date: "10/19/2026",
            note: "Established patient follow-up for essential hypertension, stable on lisinopril 10 mg daily. Blood pressure 128/78. No new complaints. Prescription renewed for 90 days. Medical decision making: low.",
            dx: ["I10"],
            lines: [{ id: "L1", code: "99215", units: 1, ptr: "A", fee: 310 }],
            status: "Open",
            queryAnswer: "No other work was done at this visit. The note is complete as written.",
          },
        ],
        claims: [
          {
            id: "C1",
            patient: "P2",
            payer: "PAY2",
            provider: "PRV3",
            dos: "10/16/2026",
            memberId: "AFH772054913",
            relationship: "Self",
            insured: "Solberg, Ingrid",
            dx: ["E11.9"],
            lines: [
              { id: "L1", code: "80053", units: 1, ptr: "A", fee: 45 },
              { id: "L2", code: "80048", units: 1, ptr: "A", fee: 35 },
              { id: "L3", code: "36415", units: 1, ptr: "A", fee: 15 },
            ],
            status: "Draft",
            history: ["10/16/2026 Claim created from lab charges"],
          },
        ],
      }),
      tasks: [
        {
          instruction: "Treat the 99215 request as a documentation question first. Send Dr. Okafor a query asking whether the documentation supports a higher E/M level.",
          hint: "Charges › Provider documentation › Query provider › Question: Does the documentation support a higher E/M level? › Send query. A query is neutral; it never suggests a code.",
          steps: [{ action: { kind: "dialog", id: "ehr.query", values: { enc: "E1", question: "Does the documentation support a higher E/M level?" } } }],
        },
        {
          instruction: "Dr. Okafor replied that no other work was done. Change line 1 to the code the documentation supports.",
          hint: "Established patient with low MDM is 99213. Charges › Charges › line 1 CPT/HCPCS › type 99213 and press Enter.",
          steps: [{ action: { kind: "type", target: "E1.L1.code", value: "99213" } }],
        },
        {
          instruction: "Dr. Okafor insists on 99215. Do not decide alone: escalate the request through compliance.",
          hint: "Top bar › Report concern › What happened?: Request to code or bill above the documentation › add a short factual note › Submit report. Write down what was asked and what you did.",
          steps: [{ action: { kind: "dialog", id: "ehr.incident", values: { category: "Request to code or bill above the documentation" } } }],
        },
        {
          instruction: "Create the claim for Victor's visit with the supported code, and submit it.",
          hint: "Charges › Create claim › Claims › Claim (CMS-1500) › Submit claim.",
          steps: [
            { action: { kind: "command", id: "ehr.claim.create", value: "E1" } },
            { action: { kind: "command", id: "ehr.claim.submit", value: "C2" } },
          ],
        },
        {
          instruction: "Claim C1 for Ingrid Solberg bills a basic metabolic panel and a comprehensive metabolic panel for the same draw. Remove the component line so the claim is not unbundled.",
          hint: "Claims › Work queue › open C1 › click line 2 (80048) on the claim › Remove line. Every test in 80048 is part of 80053.",
          steps: [
            {
              action: { kind: "command", id: "ehr.claim.removeLine" },
              requires: { selection: "cl:C1:L2" },
              selectHint: "Open claim C1 and click line 2 (80048) first.",
            },
          ],
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
