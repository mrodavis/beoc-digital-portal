import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "introduction-to-hcpcs",
    title: "Introduction to Healthcare Procedure Coding (HCPCS)",
    description:
      "Learn the HCPCS Level II coding system used for supplies, equipment, medications, and services not covered by CPT.",
    objectives: [
      "Explain what HCPCS Level II covers and how it differs from CPT",
      "Identify the main HCPCS Level II code categories by letter",
      "Determine when both a CPT and a HCPCS code are needed",
      "Describe how HCPCS Level II is maintained",
    ],
    duration: "20 min",
    sections: [
      {
        heading: "The code set for everything CPT does not cover",
        blocks: [
          {
            type: "scenario",
            role: "You are coding a visit where a medication was administered.",
            text: "The provider gave an injection. CPT has a code for administering it. CPT has no code for the drug itself. Bill only the CPT code and the practice is paid for the work and not for the medication it purchased.",
            task: "Learn what the second code set covers, and when you need both.",
          },
          {
            type: "paragraph",
            text: "HCPCS is the Healthcare Common Procedure Coding System, and it has two levels. Level I is CPT. Level II is a separate alphanumeric set maintained by CMS, covering the things CPT does not: supplies, durable medical equipment, prosthetics, drugs administered other than orally, and ambulance transport.",
          },
          {
            type: "paragraph",
            text: "A HCPCS Level II code is one letter followed by four digits. The letter indicates the category, which makes the set unusually navigable once you know a handful of them.",
          },
          {
            type: "table",
            caption: "HCPCS Level II categories seen most often",
            columns: [
              "Letter",
              "Covers",
              "Example type",
            ],
            rows: [
              [
                "A",
                "Transportation, medical and surgical supplies",
                "Ambulance service, dressings",
              ],
              [
                "B",
                "Enteral and parenteral therapy",
                "Feeding supplies",
              ],
              [
                "E",
                "Durable medical equipment",
                "Wheelchairs, walkers, hospital beds",
              ],
              [
                "G",
                "Temporary procedures and services",
                "Codes CMS assigns pending a CPT code",
              ],
              [
                "J",
                "Drugs administered other than by mouth",
                "Injectable and infused medications",
              ],
              [
                "K",
                "Temporary DME codes",
                "Assigned by the DME contractors",
              ],
              [
                "L",
                "Orthotics and prosthetics",
                "Braces, artificial limbs",
              ],
              [
                "Q",
                "Temporary codes",
                "Various, assigned by CMS",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "A single encounter often needs codes from both levels. An injection produces a CPT code for the administration and a J code for the drug. Reporting only one is among the most common ways a practice loses revenue through incomplete rather than incorrect coding.",
          },
        ],
      },
      {
        heading: "What Is HCPCS?",
        blocks: [
          {
            type: "paragraph",
            text: "HCPCS (Healthcare Common Procedure Coding System) is a standardized coding system maintained by CMS. It has two levels:",
          },
          {
            type: "list",
            items: [
              "Level I: CPT codes (American Medical Association) — physician services and procedures",
              "Level II: Alphanumeric codes (A0000–V9999) — ambulance, durable medical equipment, drugs, and supplies not covered in CPT",
            ],
          },
        ],
      },
      {
        heading: "Common HCPCS Level II Categories",
        blocks: [
          {
            type: "list",
            items: [
              "A codes: Transportation, medical/surgical supplies",
              "E codes: Durable medical equipment (wheelchairs, crutches, oxygen)",
              "J codes: Drugs administered other than by oral method",
              "L codes: Orthotic and prosthetic procedures",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Medicare and Medicaid require HCPCS Level II codes for many services that CPT does not cover. Knowing when to use HCPCS vs. CPT is a key billing skill.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which HCPCS Level II code category covers durable medical equipment like wheelchairs?",
        options: ["A codes", "J codes", "E codes", "L codes"],
        correctIndex: 2,
        explanation: "E codes cover durable medical equipment — wheelchairs, walkers, hospital beds, and similar items intended for repeated use.",
        optionRationales: [
          "A codes cover transportation and medical and surgical supplies, such as ambulance service and dressings.",
          "J codes cover drugs administered other than by mouth, principally injectables.",
          "Correct. E codes are the durable medical equipment range.",
          "L codes cover orthotics and prosthetics — braces and artificial limbs.",
        ],
      },
    ],
  },
  {
    slug: "midterm-review",
    title: "Course Review & Midterm Exam Preparation",
    description:
      "Review all major concepts from Weeks 1–4 in preparation for the midterm exam.",
    objectives: [
      "Review the workflow, revenue cycle, and code sets covered so far",
      "Identify which topics you can explain and which you can only recognize",
      "Prepare using the material's own structure rather than rereading",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "What the first half covered",
        blocks: [
          {
            type: "scenario",
            role: "You are preparing for the midterm.",
            text: "Rereading notes feels productive and is one of the least effective ways to study. Closing the book and trying to explain a topic reveals in thirty seconds whether you actually know it.",
            task: "Review by retrieving, not by rereading.",
          },
          {
            type: "table",
            caption: "The first half, and how to check you know it",
            columns: [
              "Topic",
              "You know it when you can…",
            ],
            rows: [
              [
                "Patient workflow",
                "List the eleven steps in order and name the zone that owns each",
              ],
              [
                "Revenue cycle phases",
                "Say which phase a given denial originated in",
              ],
              [
                "Eligibility, authorization, medical necessity",
                "Explain how a service can pass two and fail the third",
              ],
              [
                "ICD-10-CM",
                "Describe the code structure and explain Excludes1 versus Excludes2",
              ],
              [
                "CPT",
                "Name the three categories and the six Category I sections",
              ],
              [
                "Modifiers 25 and 59",
                "Say which attaches to which code and why",
              ],
              [
                "HCPCS Level II",
                "Give the letter for DME and for injectable drugs",
              ],
              [
                "EHR navigation",
                "Find a chart, an order, a result, and a charge in EHR Go",
              ],
            ],
          },
          {
            type: "tip",
            text: "For each row above, say the answer out loud before checking it. The topics where you hesitate are the entire study list — the ones you answer instantly need no further work, however comfortable rereading them feels.",
          },
        ],
      },
      {
        heading: "Topics Covered on the Midterm",
        blocks: [
          {
            type: "list",
            items: [
              "Patient workflow steps from scheduling through payment",
              "Healthcare revenue cycle — front-end and back-end",
              "ICD-10-CM diagnosis coding basics",
              "CPT procedure coding and modifiers",
              "HCPCS Level II code categories",
              "Clinical preauthorization process",
            ],
          },
          {
            type: "callout",
            variant: "success",
            text: "The midterm includes multiple choice, true/false, and short answer questions. Review your notes, textbook chapters, and EHR Go lab activities.",
          },
        ],
      },
    ],
  },
  {
    slug: "midterm-skills-review-lab",
    title: "EHR Go Lab: Midterm Skills Review",
    description:
      "Hands-on review of registration, insurance verification, coding workflow, and documentation in EHR Go before the midterm.",
    objectives: [
      "Complete a full encounter in EHR Go without prompting",
      "Self-identify which steps you still need to look up",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "A full encounter, unassisted",
        blocks: [
          {
            type: "scenario",
            role: "You are running the skills review in EHR Go.",
            text: "Work one encounter end to end: register, verify, document, code, submit, post. Note every point where you had to stop and look something up — that list is worth more than a score.",
            task: "Find the steps you cannot yet do from memory, while it is still practice.",
          },
          {
            type: "tip",
            text: "Keep a running list of where you hesitated. Bring it to the review session. An instructor can address a specific question about diagnosis pointers far more usefully than a general request to go over coding again.",
          },
        ],
      },
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "This lab is a comprehensive skills review across all EHR Go activities completed so far. Mr. Davis will walk through each workflow and answer questions before the midterm.",
          },
          {
            type: "list",
            items: [
              "Patient registration and insurance entry review",
              "Coding a simulated encounter (ICD + CPT)",
              "Payment posting and adjustment review",
              "Q&A and clarification on midterm topics",
            ],
          },
        ],
      },
    ],
  },
];
