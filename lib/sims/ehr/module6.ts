import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED } from "./practice";

export const ehrModule6Sims: Record<string, SimDefinition[]> = {
  "module-6::cpoe-part-2": [
    {
      id: "ehr-m6-cds-1",
      app: "ehr",
      title: "Order sets, real alerts and the noise",
      scenario:
        "You are signed in as Dr. Amara Okafor at Northstar Primary Care. Leonard Price takes warfarin for atrial fibrillation and is due for diabetes labs. Use an order set without letting it duplicate a pending test, read every alert before you answer it, and help tune the one that never matters.",
      fileName: "Northstar EHR · Provider",
      minutes: 7,
      initial: practice({
        department: "Northstar Primary Care (Clinical)",
        session: { user: "aokafor", name: "Amara Okafor, MD", role: "Provider", signedIn: true, provider: "PRV1" },
        workspaces: ["search", "chart"],
        chartTabs: ["facesheet", "orders"],
        nav: { ws: "chart", chart: "P1", tab: "orders" },
        patients: [
          {
            id: "P1",
            mrn: "1097342",
            last: "Price",
            first: "Leonard",
            dob: "04/14/1949",
            sex: "Male",
            pcp: "PRV1",
            problems: ["I48.91", "Z79.01", "E11.9"],
            meds: [
              { id: "M1", name: "Warfarin tablet", sig: "5 mg oral once daily", drug: "warfarin", status: "Active" },
              { id: "M2", name: "Metformin tablet", sig: "500 mg oral twice daily with meals", drug: "metformin", status: "Active" },
            ],
            signatures: SIGNED,
            coverage: [{ priority: 1, payer: "PAY3", memberId: "7MP4CD9TJ25", relationship: "Self", subscriber: "Price, Leonard" }],
          },
        ],
        orders: [
          { id: "O1", patient: "P1", kind: "lab", item: "uacr", name: "Urine albumin/creatinine ratio", details: { priority: "Routine" }, status: "Signed", mode: "Standard", orderedBy: "PRV1", date: "10/06/2026" },
          { id: "O2", patient: "P1", kind: "lab", item: "cbc", name: "CBC with differential", details: { priority: "Routine" }, status: "Resulted", mode: "Standard", orderedBy: "PRV1", date: "10/14/2026", result: "Hemoglobin 12.1 g/dL (reference 13.5 to 17.5)", flag: "L" },
        ],
      }),
      tasks: [
        {
          instruction: "Leonard's CBC from 10/14 has resulted with a low hemoglobin. Review it and acknowledge the result.",
          hint: "Chart › Orders › Orders list › click CBC with differential › Acknowledge result.",
          steps: [
            {
              action: { kind: "command", id: "ehr.result.ack" },
              requires: { selection: "order:O2" },
              selectHint: "Click the CBC with differential row in the Orders list first.",
            },
          ],
        },
        {
          instruction: "Add the Diabetes follow-up order set for Leonard.",
          hint: "Orders › Order sets › Diabetes follow-up › Add.",
          steps: [{ action: { kind: "command", id: "ehr.orderset.add", value: "P1:dm-fu" } }],
        },
        {
          instruction: "Leonard's urine albumin/creatinine ratio from 10/06 is still pending, so the one the set added is a duplicate. Remove it from Orders to sign.",
          hint: "Orders › Orders to sign › click Urine albumin/creatinine ratio › Remove.",
          steps: [
            {
              action: { kind: "command", id: "ehr.order.remove" },
              requires: { selection: "order:O6" },
              selectHint: "Click Urine albumin/creatinine ratio in Orders to sign first.",
            },
          ],
        },
        {
          instruction: "Order ibuprofen 400 mg, oral, every 6 hours as needed for pain, for 5 days.",
          hint: "Orders › search ibuprofen › Ibuprofen tablet › Dose: 400 mg › Route: Oral › Frequency: Every 6 hours as needed for pain › Duration: 5 days › Accept.",
          steps: [{ action: { kind: "dialog", id: "ehr.order.med", values: { patient: "P1", drug: "ibuprofen", dose: "400 mg", route: "Oral", freq: "Every 6 hours as needed for pain", duration: "5 days" } } }],
        },
        {
          instruction: "A major drug-drug interaction alert fires. Read it: Leonard takes warfarin, and the bleeding risk is not acceptable. Respond so the ibuprofen is canceled.",
          hint: "In the alert: Response › Cancel this order › Continue.",
          steps: [{ action: { kind: "dialog", id: "ehr.alert", values: { action: "Cancel this order" } } }],
        },
        {
          instruction: "Order acetaminophen 500 mg, oral, every 6 hours as needed for pain, for 5 days instead.",
          hint: "Orders › search acetaminophen › Acetaminophen tablet › Dose: 500 mg › Route: Oral › Frequency: Every 6 hours as needed for pain › Duration: 5 days › Accept.",
          steps: [{ action: { kind: "dialog", id: "ehr.order.med", values: { patient: "P1", drug: "acetaminophen", dose: "500 mg", route: "Oral", freq: "Every 6 hours as needed for pain", duration: "5 days" } } }],
        },
        {
          instruction: "An informational formulary alert appears on every acetaminophen order and never needs action. Acknowledge it, and report it as not useful so the CDS committee can tune it.",
          hint: "In the alert: Response › Acknowledge › check Report this alert as not useful › Continue. Reporting noisy alerts is how alert fatigue gets fixed.",
          steps: [{ action: { kind: "dialog", id: "ehr.alert", values: { action: "Acknowledge", report: true } } }],
        },
        {
          instruction: "Review Orders to sign and sign the orders.",
          hint: "Orders › Orders to sign › Sign orders.",
          steps: [{ action: { kind: "command", id: "ehr.orders.sign", value: "P1" } }],
        },
      ],
    },
    {
      id: "ehr-m6-telephone-orders-2",
      app: "ehr",
      title: "Telephone orders and the result that never came",
      scenario:
        "You are a medical assistant at Northstar Primary Care. Dr. Okafor is at the hospital and phones in orders for Ruth Adeyemi. Read every order back, enter it as a telephone order, leave alert overrides to the provider, and then chase the imaging order that has gone quiet.",
      fileName: "Northstar EHR · Medical Assistant",
      minutes: 5,
      initial: practice({
        department: "Northstar Primary Care (Clinical)",
        session: { user: "student", name: "BEOC Student", role: "Medical Assistant", signedIn: true },
        workspaces: ["search", "chart"],
        chartTabs: ["facesheet", "orders"],
        nav: { ws: "chart", chart: "P1", tab: "orders" },
        patients: [
          {
            id: "P1",
            mrn: "1213568",
            last: "Adeyemi",
            first: "Ruth",
            dob: "06/21/1958",
            sex: "Female",
            pcp: "PRV1",
            problems: ["I10", "E78.5"],
            allergies: [{ substance: "Penicillin", reaction: "Hives", severity: "Severe", cls: "penicillins" }],
            meds: [
              { id: "M1", name: "Lisinopril tablet", sig: "20 mg oral once daily", drug: "lisinopril", status: "Active" },
              { id: "M2", name: "Atorvastatin tablet", sig: "40 mg oral once daily", drug: "atorvastatin", status: "Active" },
            ],
            signatures: SIGNED,
            coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44172660", relationship: "Self", subscriber: "Adeyemi, Ruth" }],
          },
        ],
        orders: [
          { id: "O1", patient: "P1", kind: "img", item: "cxr2", name: "Chest X-ray, 2 views", details: { priority: "Routine", laterality: "Not applicable" }, status: "Signed", mode: "Standard", orderedBy: "PRV1", date: "10/08/2026" },
          { id: "O2", patient: "P1", kind: "lab", item: "lipid", name: "Lipid panel", details: { priority: "Routine" }, status: "Resulted", mode: "Standard", orderedBy: "PRV1", date: "10/13/2026", result: "LDL 118 mg/dL", ack: true },
        ],
      }),
      tasks: [
        {
          instruction: "Dr. Okafor orders a Basic metabolic panel, Routine, for hypertension (I10). You read it back and she confirms. Enter it as a telephone order with read-back, ordered by Dr. Amara Okafor.",
          hint: "Chart › Orders › search basic › Basic metabolic panel › Priority: Routine › Associated diagnosis: I10 › Order mode: Telephone (read back) › Ordering provider: Amara Okafor, MD › Accept.",
          steps: [{ action: { kind: "dialog", id: "ehr.order.lab", values: { patient: "P1", test: "bmp", priority: "Routine", dx: "I10", mode: "Telephone (read back)", orderedBy: "PRV1" } } }],
        },
        {
          instruction: "She also orders amoxicillin 500 mg, oral, every 8 hours, for 10 days. Enter it as a telephone order with read-back from Dr. Amara Okafor.",
          hint: "Orders › search amoxicillin › Amoxicillin capsule › Dose: 500 mg › Route: Oral › Frequency: Every 8 hours › Duration: 10 days › Order mode: Telephone (read back) › Ordering provider: Amara Okafor, MD › Accept.",
          steps: [{ action: { kind: "dialog", id: "ehr.order.med", values: { patient: "P1", drug: "amoxicillin", dose: "500 mg", route: "Oral", freq: "Every 8 hours", duration: "10 days", mode: "Telephone (read back)", orderedBy: "PRV1" } } }],
        },
        {
          instruction: "A drug-allergy alert fires: Ruth is allergic to penicillin. Northstar policy does not let you override an alert on the provider's behalf. Cancel the order; you will call Dr. Okafor back with the alert.",
          hint: "In the alert: Response › Cancel this order › Continue.",
          steps: [{ action: { kind: "dialog", id: "ehr.alert", values: { action: "Cancel this order" } } }],
        },
        {
          instruction: "Sign the remaining telephone order so it routes to Dr. Okafor for cosignature.",
          hint: "Orders › Orders to sign › Sign orders. The order shows Pending cosign until Dr. Okafor signs it.",
          steps: [{ action: { kind: "command", id: "ehr.orders.sign", value: "P1" } }],
        },
        {
          instruction: "An order placed is not a result received. Find the chest X-ray ordered on 10/08/2026 that still has no result, and send a follow-up.",
          hint: "Orders › Orders list › Pending results › click Chest X-ray, 2 views (no result after 12 days) › Send follow-up.",
          steps: [
            {
              action: { kind: "command", id: "ehr.order.followUp" },
              requires: { selection: "order:O1" },
              selectHint: "Click the Chest X-ray, 2 views row in the Orders list first.",
            },
          ],
        },
      ],
    },
  ],

  "module-6::legal-aspects-and-compliance": [
    {
      id: "ehr-m6-hipaa-1",
      app: "ehr",
      title: "Minimum necessary on a logged system",
      scenario:
        "You are Taylor Brooks, a patient access specialist and the front desk's privacy liaison at Northstar Primary Care. Every chart you open is written to the audit log, and in this run opening a chart you do not need counts as a miss. Do the work your job requires, report the requests and mistakes that cross the line, and release only what a request needs.",
      fileName: "Northstar EHR · Patient Access",
      minutes: 7,
      initial: practice({
        clock: "13:05",
        department: "Northstar Primary Care (Front Desk)",
        session: { user: "tbrooks", name: "Taylor Brooks", role: "Patient Access", signedIn: false },
        judgeAccess: true,
        workspaces: ["search", "chart", "audit"],
        chartTabs: ["facesheet", "registration", "documents"],
        nav: { ws: "search" },
        patients: [
          { id: "P1", mrn: "1568830", last: "Baptiste", first: "Andre", dob: "11/02/1979", sex: "Male", phone: "(718) 555-0147", pcp: "PRV1", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44177412", relationship: "Self", subscriber: "Baptiste, Andre" }] },
          { id: "P2", mrn: "2077154", last: "Baptiste", first: "Andre", dob: "04/25/2001", sex: "Male", phone: "(347) 555-0115", pcp: "PRV3", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY4", memberId: "MCD90314476", relationship: "Self", subscriber: "Baptiste, Andre" }] },
          { id: "P3", mrn: "1709963", last: "Whitfield", first: "Dana", dob: "09/14/1985", sex: "Female", pcp: "PRV1", restricted: "Employee", signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY2", memberId: "AFH229184403", relationship: "Self", subscriber: "Whitfield, Dana" }] },
          {
            id: "P4",
            mrn: "1127745",
            last: "Hughes",
            first: "Lorraine",
            dob: "01/30/1952",
            sex: "Female",
            pcp: "PRV1",
            signatures: SIGNED,
            coverage: [{ priority: 1, payer: "PAY1", memberId: "ENH44170951", relationship: "Self", subscriber: "Hughes, Lorraine" }],
            documents: [
              { id: "D1", date: "03/11/2026", type: "Letter", title: "Cardiology consultation letter", summary: "Consultant's findings and recommendations" },
              { id: "D2", date: "06/02/2026", type: "Progress note", title: "Annual wellness visit", summary: "Preventive visit and screening plan" },
              { id: "D3", date: "08/18/2026", type: "Lab result", title: "Comprehensive metabolic panel", summary: "Chemistry results" },
              { id: "D4", date: "10/06/2026", type: "Progress note", title: "Left knee follow-up", summary: "Exam, assessment and plan" },
              { id: "D5", date: "10/06/2026", type: "Procedure note", title: "Left knee injection", summary: "Injection details and consent" },
            ],
          },
        ],
        audit: [
          { id: "L1", at: "10/19/2026 08:14", user: "rpatel", role: "Medical Assistant", patient: "P4", action: "Chart opened", workstation: "NMC-CL-04" },
          { id: "L2", at: "10/19/2026 09:30", user: "aokafor", role: "Provider", patient: "P3", action: "Break-the-glass access", detail: "Employee record · Reason: Treating or scheduled to see this patient today", workstation: "NMC-CL-01" },
          { id: "L3", at: "10/19/2026 11:05", user: "jchen", role: "Billing", patient: "P4", action: "Claim submitted", detail: "C2214", workstation: "NMC-BO-02" },
          { id: "L4", at: "10/19/2026 12:41", user: "kmorgan", role: "Scheduling", patient: "P3", action: "Break-the-glass access", detail: "Employee record · Reason: Other (explain to the Privacy Officer)", workstation: "NMC-FD-02" },
          { id: "L5", at: "10/19/2026 12:44", user: "kmorgan", role: "Scheduling", patient: "P3", action: "Results viewed", detail: "Lab results, 10/12/2026", workstation: "NMC-FD-02" },
          { id: "L6", at: "10/19/2026 15:20", user: "rpatel", role: "Medical Assistant", patient: "P1", action: "Chart opened", workstation: "NMC-CL-04" },
        ],
      }),
      tasks: [
        {
          instruction: "Sign in with User ID \"tbrooks\" to the Northstar Primary Care (Front Desk) department.",
          hint: "User ID: tbrooks › type any password › Department: Northstar Primary Care (Front Desk) › Sign in. Never sign in as someone else or let anyone work under your login.",
          steps: [{ action: { kind: "dialog", id: "ehr.signin", values: { user: "tbrooks", department: "Northstar Primary Care (Front Desk)" } } }],
        },
        {
          instruction: "Your 2:00 PM patient is Andre Baptiste, born 11/02/1979. Open his chart, and only his.",
          hint: "Patients › Name: Baptiste, Andre › Search › two patients share the name › open the row with DOB 11/02/1979.",
          steps: [{ action: { kind: "command", id: "ehr.access.open", value: "P1" } }],
        },
        {
          instruction: "A coworker asks you to look up Dana Whitfield, a nurse here, to find out why she was seen last week. You have no work reason to open her record. Report the request instead.",
          hint: "Do not open the chart. Top bar › Report concern › What happened?: Request to view a record without a work reason › Submit report.",
          steps: [{ action: { kind: "dialog", id: "ehr.incident", values: { category: "Request to view a record without a work reason" } } }],
        },
        {
          instruction: "A patient calls: the statement she received in the mail belongs to someone else. Report it now through the privacy incident process.",
          hint: "Top bar › Report concern › What happened?: Misdirected mail, fax or email › Submit report. The breach notification clock starts when the breach is discovered.",
          steps: [{ action: { kind: "dialog", id: "ehr.incident", values: { category: "Misdirected mail, fax or email" } } }],
        },
        {
          instruction: "Empire Northstar Health Plan asks for Lorraine Hughes's records for her 10/06/2026 visit to process a claim. Open her chart and release only the documents from that date, by secure fax.",
          hint: "Patients › Hughes, Lorraine (DOB 01/30/1952) › Open chart › Documents › Release of information › Requested by: Payer: records request for a claim › check only the two 10/06/2026 documents › Format: Secure fax › Decision: Release now › Record request.",
          steps: [
            { action: { kind: "command", id: "ehr.access.open", value: "P4" } },
            { action: { kind: "dialog", id: "ehr.roi", values: { patient: "P4", requester: "Payer: records request for a claim", docs: "D4,D5", format: "Secure fax", decision: "Release now" } } },
          ],
        },
        {
          instruction: "The Privacy Officer asks you to review access to Dana Whitfield's restricted record. In the audit log, flag the break-the-glass access that had no work reason.",
          hint: "Audit › Patient filter: Whitfield › click the 10/19 12:41 break-the-glass entry by kmorgan (Reason: Other) › Flag for privacy review.",
          steps: [
            {
              action: { kind: "command", id: "ehr.audit.flag" },
              requires: { selection: ["audit:L4", "audit:L5"] },
              selectHint: "Click kmorgan's 12:41 break-the-glass entry in the audit log first.",
            },
          ],
        },
        {
          instruction: "You need to step away from the front desk. Secure the workstation before you go.",
          hint: "Top bar › Secure (lock icon). A locked screen shows no patient information.",
          steps: [{ action: { kind: "command", id: "ehr.lock" } }],
        },
      ],
    },
  ],
};
