import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "introduction-to-hcpcs",
    title: "Introduction to Healthcare Procedure Coding (HCPCS)",
    description:
      "Learn the HCPCS Level II coding system used for supplies, equipment, medications, and services not covered by CPT.",
    duration: "20 min",
    sections: [
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
      },
    ],
  },
  {
    slug: "midterm-review",
    title: "Course Review & Midterm Exam Preparation",
    description:
      "Review all major concepts from Weeks 1–4 in preparation for the midterm exam.",
    duration: "25 min",
    sections: [
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
    duration: "80 min",
    sections: [
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
