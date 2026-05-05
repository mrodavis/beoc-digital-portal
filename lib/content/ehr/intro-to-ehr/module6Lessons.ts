import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "cpoe-part-2",
    title: "Computerized Provider Order Entry (CPOE) Part 2",
    description:
      "Continue CPOE study with advanced order sets, clinical decision support, and how CPOE integrates with EHR workflows.",
    duration: "20 min",
    sections: [
      {
        heading: "Order Sets & Clinical Decision Support",
        blocks: [
          {
            type: "paragraph",
            text: "Most EHR systems include pre-built order sets — groups of orders commonly used together for specific diagnoses or procedures. Clinical Decision Support (CDS) alerts notify providers of potential drug interactions, allergies, or guideline deviations.",
          },
          {
            type: "list",
            items: [
              "Order sets speed up order entry and reduce omissions",
              "CDS alerts promote evidence-based prescribing",
              "Alert fatigue is a known challenge — too many alerts get ignored",
            ],
          },
        ],
      },
      {
        heading: "CPOE Workflow Integration",
        blocks: [
          {
            type: "paragraph",
            text: "When a provider enters an order through CPOE, it is immediately transmitted to the appropriate department — pharmacy, radiology, lab — without requiring paper transport. This reduces delays and transcription errors.",
          },
          {
            type: "callout",
            variant: "success",
            text: "Studies show CPOE reduces serious medication errors by more than 50% compared to handwritten orders.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is a known downside of Clinical Decision Support alerts?",
        options: [
          "They slow down CPOE order entry by requiring fax confirmation",
          "Alert fatigue — providers begin ignoring alerts when there are too many",
          "They are only available in inpatient hospital EHR systems",
          "CDS alerts cannot detect drug allergies",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "legal-aspects-and-compliance",
    title: "Legal Aspects of EHR & Regulatory Compliance",
    description:
      "Understand HIPAA, patient privacy rights, legal obligations in EHR environments, and consequences of non-compliance.",
    duration: "25 min",
    sections: [
      {
        heading: "HIPAA and Protected Health Information",
        blocks: [
          {
            type: "paragraph",
            text: "HIPAA (Health Insurance Portability and Accountability Act) sets national standards for protecting sensitive patient health information. The Privacy Rule and Security Rule are the two most relevant components for EHR users.",
          },
          {
            type: "list",
            items: [
              "Privacy Rule: Controls who can access and use PHI (Protected Health Information)",
              "Security Rule: Sets standards for protecting electronic PHI (ePHI)",
              "Breach Notification Rule: Requires notification of affected patients if PHI is breached",
            ],
          },
        ],
      },
      {
        heading: "Penalties for Non-Compliance",
        blocks: [
          {
            type: "list",
            items: [
              "Civil penalties: $100–$50,000 per violation",
              "Criminal penalties: Up to 10 years imprisonment for intentional misuse",
              "Reputational damage to the healthcare organization",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Accessing a patient record without a legitimate reason — even for curiosity — is a HIPAA violation. Always access only the records needed for your assigned duties.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which HIPAA rule sets standards for protecting electronic Protected Health Information (ePHI)?",
        options: [
          "The Privacy Rule",
          "The Security Rule",
          "The Breach Notification Rule",
          "The Enforcement Rule",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "compliance-scenarios-lab",
    title: "EHR Go Lab: Documentation Accuracy, Privacy & Compliance Scenarios",
    description:
      "Work through privacy and compliance scenarios in EHR Go, focusing on accurate clinical documentation and HIPAA-compliant behavior.",
    duration: "80 min",
    sections: [
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Mr. Davis guides this lab through EHR Go scenarios that test documentation accuracy, appropriate record access, and privacy-compliant workflows.",
          },
          {
            type: "list",
            items: [
              "Identify documentation errors in a sample patient record",
              "Apply HIPAA minimum necessary standard in a simulated scenario",
              "Complete an EHR Go compliance-focused activity",
              "Discuss real-world consequences of documentation failures",
            ],
          },
        ],
      },
    ],
  },
];
