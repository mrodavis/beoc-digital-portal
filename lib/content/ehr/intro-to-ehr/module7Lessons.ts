import { Lesson } from "@/types/lesson";

export const module7Lessons: Lesson[] = [
  {
    slug: "workflow-and-revenue-cycle-review",
    title: "Workflow, Revenue Cycle & CPOE Review",
    description:
      "Comprehensive review of patient workflow, revenue cycle management, clinical preauthorization, and CPOE before tackling advanced topics.",
    objectives: [
      "Place any revenue cycle activity in its correct phase",
      "Trace a denial back to the phase that caused it",
      "Connect CPOE to the documentation that supports a claim",
    ],
    duration: "20 min",
    sections: [
      {
        heading: "Three phases, one cycle",
        blocks: [
          {
            type: "table",
            caption: "The revenue cycle by phase",
            columns: [
              "Phase",
              "Also called",
              "Covers",
              "Typical failure",
            ],
            rows: [
              [
                "Front end",
                "Patient access",
                "Scheduling, registration, eligibility, authorization, point-of-service collection",
                "Coverage not verified; authorization missed",
              ],
              [
                "Middle",
                "Health information management",
                "Clinical documentation, coding, charge capture",
                "A service delivered but never charged; documentation that does not support the code",
              ],
              [
                "Back end",
                "Patient financial services",
                "Claim submission, payment posting, denials, appeals, collections",
                "Claims not worked before the filing deadline",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Denials surface at the back end and usually originate at the front. When you group a month's denials by the phase that caused them rather than by the department that received them, the picture changes completely — and so does what you would fix.",
          },
        ],
      },
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
        explanation: "Claim submission belongs to the back end, also called patient financial services, along with payment posting, denials, appeals, and collections.",
        optionRationales: [
          "Front end is patient access — scheduling, registration, eligibility, and authorization, all before the encounter.",
          "Mid-cycle is health information management — documentation, coding, and charge capture.",
          "Correct. Claim submission is a back-end, patient financial services function.",
          "Clinical decision support is an EHR feature supporting order entry, not a revenue cycle phase.",
        ],
      },
    ],
  },
  {
    slug: "ehr-databases-patient-tracking",
    title: "EHR Databases for Patient Tracking & Financial Management",
    description:
      "Understand how EHR databases support patient tracking, clinical administration, and financial management functions.",
    objectives: [
      "Explain how an EHR stores and relates patient data",
      "Run and interpret common tracking and financial reports",
      "Define the core revenue cycle metrics and say what each reveals",
      "Use a report to find a problem rather than to describe one",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "The reports that tell you what is actually happening",
        blocks: [
          {
            type: "scenario",
            role: "You are asked why collections are down.",
            text: "The practice manager has a feeling that something changed two months ago. A feeling is not actionable. Four reports, run in ten minutes, will either confirm it and say where, or show that nothing changed.",
            task: "Learn which numbers answer which question.",
          },
          {
            type: "paragraph",
            text: "An EHR is a relational database underneath the clinical interface. Patients, encounters, orders, results, and charges are separate tables linked by keys — which is why one patient can have many encounters without their address being stored many times, and why changing a demographic in one place changes it everywhere.",
          },
          {
            type: "table",
            caption: "Core revenue cycle metrics",
            columns: [
              "Metric",
              "Measures",
              "Commonly targeted at",
            ],
            rows: [
              [
                "Days in A/R",
                "Average days from date of service to payment",
                "Under 40 days for a physician practice",
              ],
              [
                "A/R over 90 days",
                "Share of receivables aged past 90 days",
                "Under 15-20%",
              ],
              [
                "Clean claim rate",
                "Share accepted on first submission with no edits",
                "95% or better",
              ],
              [
                "Denial rate",
                "Share of claims denied",
                "Under 5-10%",
              ],
              [
                "Net collection rate",
                "Share of collectible revenue actually collected",
                "95% or better",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "These benchmarks vary by specialty, payer mix, and who published them, so treat them as orientation rather than as standards. What matters more than any single figure is the trend: a denial rate moving from 6% to 11% over two quarters is worth investigating regardless of what the industry average happens to be.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Reports carry PHI. A patient tracking report or an aging report lists names attached to visits and balances. Print them only when necessary, keep them face-down, shred rather than bin them, and never leave one on a shared printer. A report is a chart extract, and it is treated as one.",
          },
        ],
      },
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
        explanation: "Days in A/R measures the average time from date of service to payment received. It is the clearest single indicator of how quickly a practice converts work into cash, and a rising figure usually means claims are not being worked.",
        optionRationales: [
          "Appointment wait time is a scheduling and access measure, not a financial one.",
          "Correct. Days in accounts receivable measures how long payment takes after the claim is submitted.",
          "Provider scheduling is unrelated to accounts receivable.",
          "The appeal window is set by the payer contract and is a different concept entirely.",
        ],
      },
    ],
  },
  {
    slug: "patient-tracking-financial-management-lab",
    title: "EHR Go Lab: Patient Tracking, Administrative & Financial Workflows",
    description:
      "Apply patient tracking and financial management concepts in EHR Go through structured exercises.",
    objectives: [
      "Run patient tracking and financial reports in EHR Go",
      "Interpret an aging report and identify what to work first",
      "Handle reports containing PHI appropriately",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "Reading a report to find the problem",
        blocks: [
          {
            type: "worked-example",
            title: "Working an aging report",
            task: "Total A/R is $412,000, of which $94,000 is over 90 days. Decide what to do first.",
            steps: [
              {
                move: "Calculate the share over 90 days: 94,000 of 412,000 is about 23%.",
                why: "Against a 15-20% target this is high, so the aged bucket is where the problem is rather than the overall balance.",
              },
              {
                move: "Sort the aged bucket by days remaining until each payer's filing or appeal deadline.",
                why: "Deadlines are absolute. A claim past its filing limit is worth nothing regardless of value, so anything close to a deadline is worked first.",
              },
              {
                move: "Within that, sort by dollar value.",
                why: "Staff time is the constraint. Ten minutes recovering $2,400 beats ten minutes recovering $40 — and the small balances are usually a prevention problem rather than a collection one.",
              },
              {
                move: "Group the rest by denial reason and look for a pattern.",
                why: "Twenty-nine authorization denials are one process problem repeated, not twenty-nine problems. Fixing the front-end process stops the thirtieth, which is worth more than recovering any single claim.",
              },
            ],
            result: "Deadline-critical high-value claims worked first, and a specific process recommendation to take to the manager.",
            takeaway: "Deadline, then value, then pattern. Reporting the pattern is what changes next month's numbers.",
          },
        ],
      },
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
