import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "icd-part-2-and-cpt-part-1",
    title: "Diagnostic Coding (ICD Part 2) & CPT Introduction",
    description:
      "Continue developing ICD-10-CM skills and begin learning Current Procedural Terminology (CPT) coding for outpatient procedures.",
    duration: "25 min",
    sections: [
      {
        heading: "ICD-10-CM: Code Structure Review",
        blocks: [
          {
            type: "paragraph",
            text: "ICD-10-CM codes can be 3–7 characters long. The first three characters identify the category of disease. Additional characters add specificity — laterality, encounter type, sequela, and more.",
          },
          {
            type: "list",
            items: [
              "Characters 1–3: Category (e.g., S52 = Fracture of forearm)",
              "Character 4: Etiology, anatomic site, or severity",
              "Characters 5–6: Further specificity",
              "Character 7: Extension (A = initial, D = subsequent, S = sequela)",
            ],
          },
        ],
      },
      {
        heading: "Introduction to CPT Coding",
        blocks: [
          {
            type: "paragraph",
            text: "CPT (Current Procedural Terminology) codes are five-digit numeric codes maintained by the American Medical Association (AMA). They describe the medical, surgical, and diagnostic services performed during an encounter.",
          },
          {
            type: "list",
            items: [
              "Evaluation & Management (E/M): 99202–99215",
              "Surgery codes: 10000–69999",
              "Radiology: 70000–79999",
              "Pathology & Laboratory: 80000–89999",
              "Medicine: 90000–99199",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which organization maintains the CPT code set?",
        options: [
          "Centers for Medicare & Medicaid Services (CMS)",
          "World Health Organization (WHO)",
          "American Medical Association (AMA)",
          "American Health Information Management Association (AHIMA)",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "cpt-part-2",
    title: "Current Procedural Coding (CPT) Part 2",
    description:
      "Deepen your CPT knowledge with modifiers, bundling rules, and how CPT codes link to ICD codes on a claim.",
    duration: "25 min",
    sections: [
      {
        heading: "CPT Modifiers",
        blocks: [
          {
            type: "paragraph",
            text: "Modifiers are two-character additions to a CPT code that provide additional information about a service without changing its definition. They affect how a claim is processed and reimbursed.",
          },
          {
            type: "list",
            items: [
              "-25: Significant, separately identifiable E/M service on the same day",
              "-51: Multiple procedures",
              "-59: Distinct procedural service",
              "-RT / -LT: Right side / Left side",
            ],
          },
        ],
      },
      {
        heading: "Linking Diagnoses to Procedures",
        blocks: [
          {
            type: "paragraph",
            text: "Every CPT code on a claim must be linked to at least one ICD-10-CM diagnosis code that justifies medical necessity. If the diagnosis does not support the procedure, the claim will be denied.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Medical necessity is the cornerstone of claims approval. The diagnosis must clearly explain why the procedure was performed.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What does CPT modifier -25 indicate?",
        options: [
          "The procedure was performed on the left side of the body",
          "Multiple procedures were performed on the same day",
          "A significant, separately identifiable E/M service was provided on the same day as a procedure",
          "The service was performed by a physician assistant",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "outpatient-coding-and-payments-lab",
    title: "EHR Go Lab: Outpatient Coding Workflow & Payment Posting",
    description:
      "Practice entering outpatient diagnosis and procedure codes in EHR Go, then post a payment and apply an adjustment.",
    duration: "80 min",
    sections: [
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "In this lab, Mr. Davis will guide you through the coding and payment posting workflow in EHR Go using a simulated patient encounter.",
          },
          {
            type: "list",
            items: [
              "Assign ICD-10-CM diagnosis codes to a patient encounter",
              "Select appropriate CPT procedure codes",
              "Submit a simulated claim in EHR Go",
              "Post an insurance payment and apply a contractual adjustment",
            ],
          },
        ],
      },
    ],
  },
];
