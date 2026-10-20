import type { SimDefinition } from "@/types/sim";
import { practice, SIGNED } from "./practice";

export const ehrModule5Sims: Record<string, SimDefinition[]> = {
  "module-5::patient-centered-care-and-cpoe-part-1": [
    {
      id: "ehr-m5-cpoe-1",
      app: "ehr",
      title: "Right patient, right orders, signed",
      scenario:
        "Northstar Primary Care is a Federally Qualified Health Center that runs as a patient-centered medical home, and every order goes through CPOE. You are signed in as Dr. Amara Okafor for this training run. Tamara Wells is here for diabetes and blood pressure follow-up, and two patients share her name. Verify identity, enter the orders, let clinical decision support do its job, and sign.",
      fileName: "Northstar EHR · Provider",
      minutes: 6,
      initial: practice({
        department: "Northstar Primary Care (Clinical)",
        session: { user: "aokafor", name: "Amara Okafor, MD", role: "Provider", signedIn: true, provider: "PRV1" },
        workspaces: ["search", "chart"],
        chartTabs: ["facesheet", "orders"],
        nav: { ws: "search", tab: "orders" },
        patients: [
          {
            id: "P1",
            mrn: "1356029",
            last: "Wells",
            first: "Tamara",
            dob: "02/17/1962",
            sex: "Female",
            phone: "(718) 555-0109",
            pcp: "PRV1",
            problems: ["E11.9", "I10", "E78.5"],
            allergies: [{ substance: "Sulfa drugs", reaction: "Rash", severity: "Moderate", cls: "sulfonamides" }],
            meds: [
              { id: "M1", name: "Lisinopril tablet", sig: "10 mg oral once daily", drug: "lisinopril", status: "Active" },
              { id: "M2", name: "Metformin tablet", sig: "500 mg oral twice daily with meals", drug: "metformin", status: "Active" },
            ],
            signatures: SIGNED,
            coverage: [{ priority: 1, payer: "PAY4", memberId: "MCD55102938", relationship: "Self", subscriber: "Wells, Tamara" }],
          },
          { id: "P2", mrn: "1402277", last: "Wells", first: "Tamara", dob: "08/05/1966", sex: "Female", phone: "(347) 555-0181", pcp: "PRV3", problems: ["J45.909"], signatures: SIGNED, coverage: [{ priority: 1, payer: "PAY2", memberId: "AFH417730062", relationship: "Self", subscriber: "Wells, Tamara" }] },
        ],
      }),
      tasks: [
        {
          instruction: "Open the chart for Tamara Wells, born 02/17/1962. Two patients share the name, so confirm the date of birth before you open one.",
          hint: "Patients › Name: Wells, Tamara › Search › pick the row with DOB 02/17/1962 › Open chart. Check the patient header: name and DOB.",
          steps: [{ action: { kind: "command", id: "ehr.chart.open", value: "P1" } }],
        },
        {
          instruction: "Order a Hemoglobin A1c, priority Routine, with the associated diagnosis E11.9 (type 2 diabetes).",
          hint: "Chart › Orders › search A1c › Hemoglobin A1c › Priority: Routine › Associated diagnosis: E11.9 › Order mode: Standard › Accept.",
          steps: [{ action: { kind: "dialog", id: "ehr.order.lab", values: { patient: "P1", test: "a1c", priority: "Routine", dx: "E11.9", mode: "Standard", orderedBy: "PRV1" } } }],
        },
        {
          instruction: "Order lisinopril 10 mg, oral, once daily, for 90 days.",
          hint: "Orders › search lisinopril › Lisinopril tablet › Dose: 10 mg › Route: Oral › Frequency: Once daily › Duration: 90 days › Accept.",
          steps: [{ action: { kind: "dialog", id: "ehr.order.med", values: { patient: "P1", drug: "lisinopril", dose: "10 mg", route: "Oral", freq: "Once daily", duration: "90 days" } } }],
        },
        {
          instruction: "A duplicate therapy alert fires: Tamara already takes lisinopril 10 mg daily, and a second prescription is not wanted. Respond so the new order is canceled.",
          hint: "In the alert: Response › Cancel this order › Continue.",
          steps: [{ action: { kind: "dialog", id: "ehr.alert", values: { action: "Cancel this order" } } }],
        },
        {
          instruction: "Order atorvastatin 20 mg, oral, once daily, for 90 days, with the associated diagnosis E78.5 (hyperlipidemia).",
          hint: "Orders › search atorvastatin › Atorvastatin tablet › Dose: 20 mg › Route: Oral › Frequency: Once daily › Duration: 90 days › Associated diagnosis: E78.5 › Accept.",
          steps: [{ action: { kind: "dialog", id: "ehr.order.med", values: { patient: "P1", drug: "atorvastatin", dose: "20 mg", route: "Oral", freq: "Once daily", duration: "90 days", dx: "E78.5" } } }],
        },
        {
          instruction: "Review Orders to sign, then sign the orders.",
          hint: "Orders › Orders to sign › check both orders are for Tamara Wells (DOB 02/17/1962) › Sign orders.",
          steps: [{ action: { kind: "command", id: "ehr.orders.sign", value: "P1" } }],
        },
      ],
    },
  ],
};
