import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "course-overview",
    title: "Course Overview & Introduction",
    description:
      "Welcome to Introduction to EHR. Review course requirements, assignments, and what to expect across the semester.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/OFvROse3MW4",
    slides: [
      {
        src: "/images/ehr/module-1/course-overview/slide-01.jpg",
        alt: "The Digital Clinic Blueprint — An Operational Guide to EHR Ecosystems and Clinical Patient Workflows",
      },
      {
        src: "/images/ehr/module-1/course-overview/slide-02.jpg",
        alt: "The ultimate goal of an EHR system is precise information delivery — Right Information, Right Person, Right Time",
      },
      {
        src: "/images/ehr/module-1/course-overview/slide-03.jpg",
        alt: "EHR functions as the central nervous system of healthcare operations — Patient Workflow, Healthcare Administration, Financial Management, Legal Compliance",
      },
      {
        src: "/images/ehr/module-1/course-overview/slide-04.jpg",
        alt: "Establishing a baseline vocabulary for digital healthcare infrastructure — IT vs Infrastructure, Inpatient vs Outpatient, Provider vs System",
      },
      {
        src: "/images/ehr/module-1/course-overview/slide-05.jpg",
        alt: "Seamless information flow directly correlates to systemic clinical outcomes — six operational returns including improved patient care and data security",
      },
      {
        src: "/images/ehr/module-1/course-overview/slide-06.jpg",
        alt: "The physical clinic operates across three distinct data processing zones — Front Office, Middle Office, Back Office",
      },
      {
        src: "/images/ehr/module-1/course-overview/slide-07.jpg",
        alt: "Anatomy of an EHR Specialist — Clinical Support, Administrative & Financial, Data & Compliance, Core Requirements",
      },
    ],
    sections: [
      {
        heading: "What This Course Covers",
        blocks: [
          {
            type: "paragraph",
            text: "This course introduces you to Electronic Health Records — the digital systems that power modern healthcare. Over nine weeks you will learn patient workflow, the healthcare revenue cycle, medical coding, legal compliance, and hands-on EHR simulation using EHR Go.",
          },
          {
            type: "list",
            items: [
              "Patient registration and scheduling workflows",
              "Healthcare revenue cycle from check-in to payment",
              "ICD, CPT, and HCPCS coding systems",
              "Legal and regulatory requirements for EHR use",
              "Hands-on simulation with EHR Go",
            ],
          },
        ],
      },
      {
        heading: "Grading Breakdown",
        blocks: [
          {
            type: "list",
            items: [
              "Midterm Exam — 25%",
              "Final Exam — 25%",
              "Participation — 25%",
              "Homework & Lab Assignments — 25%",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Thursday lab sessions in EHR Go count toward your Homework & Lab Assignments grade. Come prepared and log in before class starts.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which component accounts for 25% of your final grade?",
        options: [
          "Attendance only",
          "Midterm Exam",
          "Weekly quizzes",
          "EHR Go login streak",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "patient-workflow-and-revenue-cycle",
    title: "Patient Workflow & the Healthcare Revenue Cycle",
    description:
      "Trace the path a patient takes through a healthcare encounter and learn how each step connects to the revenue cycle.",
    duration: "20 min",
    slides: [
      {
        src: "/images/ehr/module-1/patient-workflow-and-revenue-cycle/slide-01.jpg",
        alt: "Workflow 1: Patient Registration, Check-In, and Admission — Front Office swimlane diagram from patient arrival to rooming",
      },
      {
        src: "/images/ehr/module-1/patient-workflow-and-revenue-cycle/slide-02.jpg",
        alt: "Workflow 2: Executing the Clinical Office Visit — Nurse/Support and Provider swimlane from EHR schedule review to encounter close",
      },
      {
        src: "/images/ehr/module-1/patient-workflow-and-revenue-cycle/slide-03.jpg",
        alt: "Workflow 3: Multi-node communication for e-Prescribing during a visit — Patient, Clerk/Nurse, Prescriber, ePrescribing Network, and Pharmacy lanes",
      },
      {
        src: "/images/ehr/module-1/patient-workflow-and-revenue-cycle/slide-04.jpg",
        alt: "Workflow 4: Processing and authorizing medication refills — reverse data flow from pharmacy through network to prescriber",
      },
      {
        src: "/images/ehr/module-1/patient-workflow-and-revenue-cycle/slide-05.jpg",
        alt: "EHR transforms isolated clinical encounters into a continuous continuum of care — Patient Care, Coordination, Cost Savings, Participation, Diagnostics, Data Security",
      },
    ],
    sections: [
      {
        heading: "The Patient Visit Lifecycle",
        blocks: [
          {
            type: "paragraph",
            text: "Every healthcare encounter follows a predictable set of steps — from scheduling to discharge to payment. Understanding this flow is the foundation of working in any healthcare administrative role.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Scheduling / Appointment Booking",
              "Pre-Registration & Insurance Verification",
              "Patient Check-In",
              "Clinical Encounter (exam, procedures, orders)",
              "Check-Out & Referrals",
              "Coding & Charge Capture",
              "Claim Submission",
              "Payment Posting & Denial Management",
            ],
          },
        ],
      },
      {
        heading: "Why the Revenue Cycle Matters",
        blocks: [
          {
            type: "paragraph",
            text: "The revenue cycle is how a healthcare organization gets paid for the services it provides. A single error at registration — a wrong insurance ID, a misspelled name — can delay or deny payment weeks later.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Front-end staff (registration, scheduling) directly affect back-end revenue. Accuracy at check-in prevents costly denials at billing.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which step comes immediately AFTER the clinical encounter in the patient workflow?",
        options: [
          "Claim submission",
          "Insurance verification",
          "Check-out and referrals",
          "Payment posting",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "ehr-go-orientation",
    title: "EHR Go Lab: Orientation & Navigation",
    description:
      "Log in to EHR Go for the first time, explore the interface, and complete a guided workflow basics exercise.",
    duration: "80 min",
    sections: [
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "This is a hands-on lab session led by Mr. Davis. You will log in to EHR Go, navigate the dashboard, and complete the orientation activity assigned in the platform.",
          },
          {
            type: "paragraph",
            text: "EHR Go is a simulated Electronic Health Record environment used by healthcare training programs nationwide. Every activity you complete in EHR Go mirrors real tasks performed in clinic and hospital settings.",
          },
        ],
      },
      {
        heading: "Lab Objectives",
        blocks: [
          {
            type: "list",
            items: [
              "Log in to EHR Go with your assigned credentials",
              "Navigate the main dashboard and menu structure",
              "Identify key areas: patient search, scheduling, documentation",
              "Complete the EHR Go orientation activity",
            ],
          },
        ],
      },
    ],
  },
];
