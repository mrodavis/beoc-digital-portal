import { Lesson } from "@/types/lesson";

export const module7Lessons: Lesson[] = [
  {
    slug: "workflow-and-revenue-cycle-review",
    title: "Workflow, Revenue Cycle & CPOE Review",
    description:
      "Comprehensive review of patient workflow, revenue cycle management, clinical preauthorization, and CPOE before tackling advanced topics.",
    duration: "20 min",
    sections: [
      {
        heading: "Key Concepts Review",
        blocks: [
          {
            type: "paragraph",
            text: "Before moving into EHR databases and financial management, let's consolidate the core workflows you've studied so far.",
          },
          {
            type: "list",
            items: [
              "Patient workflow: scheduling → registration → encounter → coding → billing",
              "Revenue cycle: front-end (access) → mid-cycle (coding) → back-end (billing/collections)",
              "Preauthorization: required for certain procedures, medications, and specialist referrals",
              "CPOE: electronic order entry reducing medication errors and improving communication",
            ],
          },
          {
            type: "callout",
            variant: "success",
            text: "These concepts are interconnected. A gap in any step of the workflow — registration error, coding mistake, or missing preauth — creates downstream revenue problems.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which phase of the revenue cycle involves submitting claims to insurance payers?",
        options: [
          "Front-end / Patient Access",
          "Mid-cycle / Health Information Management",
          "Back-end / Patient Financial Services",
          "Clinical Decision Support",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "ehr-databases-patient-tracking",
    title: "EHR Databases for Patient Tracking & Financial Management",
    description:
      "Understand how EHR databases support patient tracking, clinical administration, and financial management functions.",
    duration: "25 min",
    sections: [
      {
        heading: "EHR as a Database System",
        blocks: [
          {
            type: "paragraph",
            text: "An Electronic Health Record system is fundamentally a database — it stores, retrieves, and connects patient data across clinical, administrative, and financial domains.",
          },
          {
            type: "list",
            items: [
              "Patient master index: maintains unique patient identification across the organization",
              "Appointment and scheduling databases: track provider availability and patient visits",
              "Clinical data repositories: store lab results, imaging, and documentation",
              "Financial databases: support charge capture, billing, and accounts receivable",
            ],
          },
        ],
      },
      {
        heading: "Using EHR Data for Financial Management",
        blocks: [
          {
            type: "paragraph",
            text: "EHR systems generate financial reports that help organizations monitor revenue, identify billing bottlenecks, and track accounts receivable aging. Understanding these reports is valuable for administrative staff.",
          },
          {
            type: "list",
            items: [
              "Days in A/R: how long it takes to collect payment after a claim is submitted",
              "Denial rate: percentage of claims denied by payers",
              "Clean claim rate: percentage of claims paid on first submission",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What does 'Days in A/R' measure in healthcare financial management?",
        options: [
          "The number of days a patient waits for an appointment",
          "How long it takes to collect payment after a claim is submitted",
          "The number of days a provider works per week",
          "How many days a claim can be appealed",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "patient-tracking-financial-management-lab",
    title: "EHR Go Lab: Patient Tracking, Administrative & Financial Workflows",
    description:
      "Apply patient tracking and financial management concepts in EHR Go through structured exercises.",
    duration: "80 min",
    sections: [
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Mr. Davis leads this lab through EHR Go's administrative and financial management features.",
          },
          {
            type: "list",
            items: [
              "Search and track patients across the EHR Go system",
              "Run a basic financial report in the simulation",
              "Review an accounts receivable aging summary",
              "Identify and document a sample claim status",
            ],
          },
        ],
      },
    ],
  },
];
