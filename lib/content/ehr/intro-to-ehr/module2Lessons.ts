import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "revenue-cycle-and-preauthorization",
    title: "Revenue Cycle Management & Clinical Preauthorization",
    description:
      "Dive deeper into revenue cycle management and learn how clinical preauthorization protects both patients and providers.",
    duration: "20 min",
    sections: [
      {
        heading: "Revenue Cycle Management (RCM) Deep Dive",
        blocks: [
          {
            type: "paragraph",
            text: "Revenue Cycle Management is the financial process healthcare organizations use to track patient care episodes from registration to final payment. Effective RCM minimizes claim denials and maximizes reimbursement.",
          },
          {
            type: "list",
            items: [
              "Patient access (registration, eligibility, benefits verification)",
              "Health information management (coding, documentation)",
              "Patient financial services (billing, collections)",
              "Claims management (submission, follow-up, appeals)",
            ],
          },
        ],
      },
      {
        heading: "Clinical Preauthorization",
        blocks: [
          {
            type: "paragraph",
            text: "Preauthorization (also called prior authorization) is the process of getting insurance approval before a patient receives certain procedures, medications, or specialist referrals.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Skipping preauthorization when it is required can result in a denied claim — meaning the provider may not get paid and the patient could be billed unexpectedly.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is the primary purpose of clinical preauthorization?",
        options: [
          "To schedule appointments faster",
          "To obtain insurance approval before delivering a service",
          "To verify a patient's identity at check-in",
          "To assign ICD codes to a diagnosis",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "medical-coding-icd-part-1",
    title: "Medical Coding Overview: ICD Part 1",
    description:
      "Introduction to the International Classification of Diseases (ICD) coding system and its role in healthcare billing.",
    duration: "25 min",
    sections: [
      {
        heading: "What Is ICD Coding?",
        blocks: [
          {
            type: "paragraph",
            text: "ICD stands for International Classification of Diseases. It is the global standard for classifying diagnoses, symptoms, and health conditions. In the United States, ICD-10-CM is used for outpatient and physician billing.",
          },
          {
            type: "list",
            items: [
              "ICD-10-CM: Clinical Modification — used by providers to code diagnoses",
              "ICD-10-PCS: Procedure Coding System — used in inpatient hospital settings",
              "Codes are alphanumeric (e.g., J18.9 = Pneumonia, unspecified)",
            ],
          },
        ],
      },
      {
        heading: "Why Accurate ICD Coding Matters",
        blocks: [
          {
            type: "paragraph",
            text: "ICD codes are used on every insurance claim. An inaccurate code can cause a claim to be rejected, underpaid, or flagged for audit. Coders must select the most specific code that is supported by documentation.",
          },
          {
            type: "callout",
            variant: "info",
            text: "The rule in coding: if it isn't documented, it didn't happen. Coders cannot assign a code for a condition that the provider did not document in the patient record.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which ICD version is used in the United States for outpatient diagnosis coding?",
        options: [
          "ICD-9-CM",
          "ICD-10-PCS",
          "ICD-10-CM",
          "ICD-11",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "patient-registration-insurance-review-lab",
    title: "EHR Go Lab: Patient Registration & Insurance Review",
    description:
      "Practice front-end workflow in EHR Go by registering a new patient, entering insurance information, and verifying eligibility.",
    duration: "80 min",
    sections: [
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "In this lab session, Mr. Davis will guide you through patient registration and insurance review workflows in EHR Go.",
          },
          {
            type: "list",
            items: [
              "Register a new patient in EHR Go",
              "Enter primary and secondary insurance information",
              "Verify patient eligibility through the EHR Go simulation",
              "Review common front-end errors that cause billing denials",
            ],
          },
        ],
      },
    ],
  },
];
