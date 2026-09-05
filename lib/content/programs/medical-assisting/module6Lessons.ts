import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "pharmacology-basics",
    title: "Pharmacology Basics for Medical Assistants",
    description:
      "Learn drug naming, common classifications, and routes of administration well enough to work safely with medications.",
    duration: "24 min",
    objectives: [
      "Distinguish generic, brand, and chemical drug names",
      "Name the major drug classifications and what they treat",
      "Describe the common routes of administration",
      "Identify high-alert medications requiring extra caution",
    ],
    sections: [
      {
        heading: "Names, classes, and routes",
        blocks: [
          {
            type: "scenario",
            role: "You reconcile a medication list at Lakeside Medical Associates.",
            text: "A patient lists both Lipitor and atorvastatin. These are the same drug under two names, and the list as written suggests they are taking a double dose. Somebody has to notice, and the person taking the list is the one positioned to.",
            task: "Learn drug naming well enough to catch duplications and errors in a medication list.",
          },
          {
            type: "table",
            caption: "Three names for one drug",
            columns: ["Name type", "Example", "Note"],
            rows: [
              ["Chemical", "Long structural name", "Rarely used clinically"],
              ["Generic", "atorvastatin", "One per drug; conventionally lowercase"],
              ["Brand", "Lipitor", "Several possible; conventionally capitalized"],
            ],
          },
          {
            type: "paragraph",
            text: "One generic drug may have several brand names, and patients frequently list both. Duplicate therapy — the same drug taken twice under different names — is a real and common cause of harm, and medication reconciliation is where it is caught.",
          },
          {
            type: "table",
            caption: "Common drug classifications",
            columns: ["Class", "Treats", "Example generic"],
            rows: [
              ["Analgesics", "Pain", "acetaminophen, ibuprofen"],
              ["Antibiotics", "Bacterial infection", "amoxicillin, azithromycin"],
              ["Antihypertensives", "High blood pressure", "lisinopril, amlodipine"],
              ["Statins", "High cholesterol", "atorvastatin, simvastatin"],
              ["Antidiabetics", "Diabetes", "metformin, insulin"],
              ["Bronchodilators", "Asthma, COPD", "albuterol"],
              ["Anticoagulants", "Clot prevention", "warfarin, apixaban"],
              ["Antidepressants", "Depression, anxiety", "sertraline, fluoxetine"],
            ],
          },
          {
            type: "table",
            caption: "Routes of administration",
            columns: ["Route", "Abbreviation", "Means"],
            rows: [
              ["Oral", "PO", "By mouth"],
              ["Sublingual", "SL", "Under the tongue"],
              ["Topical", "—", "Applied to the skin"],
              ["Intramuscular", "IM", "Into muscle"],
              ["Subcutaneous", "SubQ / SC", "Into the tissue beneath the skin"],
              ["Intradermal", "ID", "Between skin layers — TB testing, allergy testing"],
              ["Intravenous", "IV", "Into a vein — generally outside MA scope"],
              ["Inhalation", "—", "Breathed in"],
              ["Rectal", "PR", "Into the rectum"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Certain abbreviations are on the Institute for Safe Medication Practices' do-not-use list because they are repeatedly misread with serious consequences — U for units (mistaken for a zero), QD for daily (mistaken for QID, four times daily), and a trailing zero such as 1.0 mg (misread as 10 mg). Write the word out. This is not pedantry; each of these has a documented history of patient deaths.",
          },
          {
            type: "callout",
            variant: "info",
            text: "High-alert medications carry a heightened risk of significant harm when used in error — insulin, anticoagulants, opioids, and concentrated electrolytes among them. They are not more likely to be involved in an error; the consequences when they are are far worse. Practices typically require independent double-checks for these, and the check is worth taking seriously rather than initialling.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient's medication list includes both Lipitor and atorvastatin. What should you do?",
            options: [
              "Record both, since the patient reported both",
              "Flag it for the provider — these are the same drug under brand and generic names, suggesting a possible duplication",
              "Remove one, since they are duplicates",
              "Ask the patient which one is correct and record that",
            ],
            correctIndex: 1,
            explanation:
              "Lipitor is the brand name for atorvastatin. Listing both may mean the patient is unknowingly taking a double dose, or may simply reflect confusion about naming. Either way it is a clinical question, so flag it for the provider rather than resolving it yourself.",
            optionRationales: [
              "Recording both without flagging leaves a potentially dangerous duplication in the record unexamined.",
              "Correct. Note it and escalate — determining what the patient is actually taking is a clinical decision.",
              "Editing a medication list based on your own conclusion is outside your scope and could remove a real medication.",
              "Useful information to gather, but the patient may not know. The provider must resolve it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Medication knowledge builds through repeated exposure.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "For each brand name, find the generic: Lipitor, Norvasc, Zestril, Glucophage, Zoloft, Ventolin.",
          "Find the ISMP list of error-prone abbreviations. Write out five and what each is mistaken for.",
          "Research the ISMP high-alert medication list for ambulatory settings. Name four and say why each is high-alert.",
          "For a medication list containing eight drugs you invent, identify any duplications by class and explain what you would flag.",
        ],
      },
    ],
  },
  {
    slug: "medication-administration-safety",
    title: "Medication Administration Safety",
    description:
      "Apply the rights of medication administration, calculate dosages correctly, and understand what to do when something goes wrong.",
    duration: "26 min",
    objectives: [
      "Apply the rights of medication administration",
      "Perform basic dosage calculations",
      "Select injection sites and describe correct technique",
      "Respond appropriately to a medication error",
    ],
    sections: [
      {
        heading: "The rights are a checklist, not a slogan",
        blocks: [
          {
            type: "scenario",
            role: "You administer an immunization at Lakeside Medical Associates, where this is within your delegated scope.",
            text: "Two patients with similar surnames are in adjacent rooms. You carry a prepared syringe into the room, confirm the patient's name against the chart, and realize you are in the wrong room. The check caught it. Without it, a patient would have received a vaccine intended for someone else.",
            task: "Perform every check every time, including the ones that feel unnecessary.",
          },
          {
            type: "table",
            caption: "The rights of medication administration",
            columns: ["Right", "Verify"],
            rows: [
              ["Patient", "Two identifiers — name and date of birth. Never room number"],
              ["Drug", "The label against the order, read at least twice"],
              ["Dose", "Calculated and verified; double-checked for high-alert drugs"],
              ["Route", "As ordered — never substitute a route"],
              ["Time", "As ordered, within the permitted window"],
              ["Documentation", "Immediately after administration, never before"],
              ["Reason", "You understand why this patient is receiving this drug"],
              ["Response", "Observe for the expected effect and for adverse reactions"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never administer a medication someone else prepared, and never prepare one for someone else to give. The person who draws it up is the person who gives it. A prepared syringe handed over is a syringe whose contents you cannot verify — and if it is wrong, you administered it. This rule has no exceptions for busy days.",
          },
          {
            type: "paragraph",
            text: "Dosage calculation uses one reliable formula: desired dose divided by dose on hand, multiplied by the quantity that dose comes in. If an order is for 500 mg and the vial contains 250 mg per 5 mL, then 500 divided by 250, times 5 mL, gives 10 mL.",
          },
          {
            type: "table",
            caption: "Common injection sites",
            columns: ["Route", "Site", "Angle", "Typical volume"],
            rows: [
              ["Intramuscular", "Deltoid", "90 degrees", "Up to 1 mL"],
              ["Intramuscular", "Vastus lateralis", "90 degrees", "Up to 3 mL adult"],
              ["Intramuscular", "Ventrogluteal", "90 degrees", "Up to 3 mL"],
              ["Subcutaneous", "Upper outer arm, abdomen, thigh", "45-90 degrees", "Up to 1 mL"],
              ["Intradermal", "Inner forearm", "5-15 degrees, bevel up", "0.1 mL"],
            ],
          },
          {
            type: "worked-example",
            title: "Responding to a medication error",
            task: "You realize you have administered the wrong dose of a medication.",
            steps: [
              {
                move: "Stay with the patient and assess them first.",
                why: "Patient safety comes before everything else, including reporting. Observe for adverse effects and do not leave them alone. Everything else can wait a few minutes; a deteriorating patient cannot.",
              },
              {
                move: "Notify the provider immediately.",
                why: "They need to know now so they can evaluate the patient and decide whether intervention is required. Delay to work out how to phrase it is the worst possible choice — the clinical window matters more than your discomfort.",
              },
              {
                move: "Document factually what was given, when, and what you observed.",
                why: "Record the facts without speculation or self-justification. The documentation is for the patient's care and for the incident review, and an accurate record helps both.",
              },
              {
                move: "Complete an incident report through the practice's process.",
                why: "Incident reports exist to identify system problems, not to assign blame. Two similar surnames in adjacent rooms is a system condition, and reporting is how it gets fixed before it catches someone else.",
              },
              {
                move: "Do not alter or backdate anything.",
                why: "Amending the record to obscure an error converts a reportable mistake into falsification, which is far more serious and, in every case, discovered. The error is survivable; the cover-up is not.",
              },
            ],
            result:
              "The patient is assessed and monitored, the provider can intervene, and the system condition is documented.",
            takeaway:
              "Patient first, provider immediately, document factually, report through the process, alter nothing.",
          },
          {
            type: "knowledge-check",
            question:
              "A colleague has drawn up an injection and asks you to administer it because they are called away. What should you do?",
            options: [
              "Administer it, since a qualified colleague prepared it",
              "Decline — the person who prepares a medication is the person who administers it",
              "Administer it after confirming the drug name with them",
              "Administer it and document that a colleague prepared it",
            ],
            correctIndex: 1,
            explanation:
              "You cannot verify the contents of a syringe you did not prepare. Once you administer it, the administration is yours regardless of who drew it up. Prepare and administer, or do neither.",
            optionRationales: [
              "Their competence is not the issue; you have no way to verify what is in the syringe.",
              "Correct. Preparation and administration belong to the same person.",
              "A verbal confirmation cannot verify the contents or the dose actually drawn.",
              "Documenting the arrangement does not make it safe, and you remain the person who administered it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Medication administration is a delegated clinical skill requiring hands-on competency assessment. Calculation, however, you can and should practice now.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Calculate each: order 250 mg, on hand 125 mg/5 mL. Order 0.5 g, on hand 250 mg/mL. Order 40 mg, on hand 10 mg/mL. Show your work.",
          "Write the rights of medication administration from memory, then check.",
          "Research the correct landmarking for a deltoid intramuscular injection and describe it in three sentences.",
          "Find out whether MAs may administer injections in your state, under what supervision, and what training is required.",
        ],
      },
    ],
  },
];
