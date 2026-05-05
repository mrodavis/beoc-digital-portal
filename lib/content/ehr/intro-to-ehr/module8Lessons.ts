import { Lesson } from "@/types/lesson";

export const module8Lessons: Lesson[] = [
  {
    slug: "legal-aspects-and-clinical-data-analysis",
    title: "Legal Aspects of EHR & Clinical Data Analysis",
    description:
      "Explore the legal framework governing EHR use and how clinical data is analyzed to support quality improvement and compliance.",
    duration: "25 min",
    sections: [
      {
        heading: "Legal Aspects of the EHR Environment",
        blocks: [
          {
            type: "paragraph",
            text: "Beyond HIPAA, the EHR environment is shaped by federal and state laws governing health information, data retention, release of information, and electronic signatures.",
          },
          {
            type: "list",
            items: [
              "HITECH Act: Expanded HIPAA enforcement and introduced Meaningful Use",
              "21st Century Cures Act: Prohibits information blocking and promotes interoperability",
              "State retention laws: Define how long records must be kept (typically 6–10 years)",
              "Electronic signatures: Legally valid when systems meet specific authentication standards",
            ],
          },
        ],
      },
      {
        heading: "Clinical Data Analysis",
        blocks: [
          {
            type: "paragraph",
            text: "Healthcare organizations use clinical data to identify trends, improve outcomes, and meet regulatory reporting requirements. EHR systems are the primary source for this data.",
          },
          {
            type: "list",
            items: [
              "Quality measure reporting (HEDIS, CMS Star Ratings)",
              "Population health management — identifying high-risk patients",
              "Clinical audit — reviewing records for documentation completeness",
              "Research and public health surveillance",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Administrative staff play a role in data quality. Accurate registration, coding, and documentation directly impact the validity of clinical data analysis.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which federal law prohibits healthcare organizations from blocking the flow of health information?",
        options: [
          "HIPAA Privacy Rule",
          "HITECH Act",
          "21st Century Cures Act",
          "Affordable Care Act",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "regulatory-compliance-and-revenue-cycle",
    title: "Healthcare Regulatory Compliance & the Revenue Cycle",
    description:
      "Connect regulatory compliance requirements to revenue cycle operations and understand the consequences of non-compliant billing.",
    duration: "25 min",
    sections: [
      {
        heading: "Compliance Programs in Healthcare",
        blocks: [
          {
            type: "paragraph",
            text: "Healthcare organizations are required to maintain formal compliance programs that prevent, detect, and correct violations of applicable laws and regulations.",
          },
          {
            type: "list",
            items: [
              "OIG (Office of Inspector General) compliance guidance",
              "False Claims Act — penalties for knowingly submitting fraudulent claims",
              "Anti-Kickback Statute — prohibits payment for referrals",
              "Stark Law — prohibits physician self-referral for designated health services",
            ],
          },
        ],
      },
      {
        heading: "Compliance and the Revenue Cycle",
        blocks: [
          {
            type: "paragraph",
            text: "Billing compliance means that every claim submitted accurately reflects the services documented in the patient record. Upcoding, unbundling, and billing for services not rendered are all forms of fraud.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "The False Claims Act allows the government to recover three times the amount of a fraudulent claim plus additional penalties per claim. Healthcare fraud is taken seriously.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is 'upcoding' in healthcare billing?",
        options: [
          "Using a higher-level code than what the documentation supports to receive more reimbursement",
          "Submitting a claim to a secondary insurer after the primary payer pays",
          "Entering multiple CPT codes for a single procedure",
          "Updating a patient's insurance information after a denial",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    slug: "integrated-case-practice-lab",
    title: "EHR Go Lab: Integrated Case Practice",
    description:
      "Complete an integrated case in EHR Go covering revenue cycle, compliance, and documentation from registration through payment posting.",
    duration: "80 min",
    sections: [
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "This is a capstone lab session. Mr. Davis will guide you through a full patient encounter from registration to payment posting using EHR Go.",
          },
          {
            type: "list",
            items: [
              "Register a new patient and verify insurance eligibility",
              "Document the clinical encounter and assign diagnosis and procedure codes",
              "Submit a simulated claim and track its status",
              "Post the payment and resolve a sample denial",
            ],
          },
        ],
      },
    ],
  },
];
