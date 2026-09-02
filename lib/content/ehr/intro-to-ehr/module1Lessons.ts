import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "course-overview",
    title: "Course Overview & Introduction",
    description:
      "Welcome to Introduction to EHR. Review course requirements, assignments, and what to expect across the semester.",
    objectives: [
      "Describe what an electronic health record is and what it replaced",
      "Name the three zones of a medical practice and the work each does",
      "Explain how this course is assessed and what EHR Go is used for",
      "Describe the role an EHR specialist actually performs",
    ],
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
        heading: "What you are learning to do",
        blocks: [
          {
            type: "scenario",
            role: "You are beginning the Introduction to EHR course.",
            text: "A patient arrives at a clinic. Over the next hour, roughly a dozen people touch information about that visit — the front desk, the medical assistant, the provider, the coder, the biller, the payer. Every one of them works from the same record. Your job is to make sure that record is accurate, complete, findable, and lawful.",
            task: "Understand the whole system before learning any one part of it.",
          },
          {
            type: "paragraph",
            text: "An electronic health record is the digital version of a patient's chart, but calling it that undersells what changed. A paper chart lived in one place and one person could use it at a time. An EHR is a database that many people use simultaneously, that enforces rules about who may see what, that records every access, and that feeds billing, quality reporting, and public health at the same time as clinical care.",
          },
          {
            type: "paragraph",
            text: "That is why EHR work sits between clinical and administrative staff. You will not diagnose or treat. You will make sure that what was done is recorded correctly, coded correctly, protected correctly, and billed correctly — and those four things determine whether a practice can keep its doors open.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "EHR",
                definition: "Electronic Health Record — the comprehensive digital record of a patient's health across providers and encounters.",
              },
              {
                term: "EMR",
                definition: "Electronic Medical Record — historically the record within one practice. The terms are now used almost interchangeably, but EHR implies sharing across organizations.",
              },
              {
                term: "PHI",
                definition: "Protected Health Information — health information linked to an identifiable person. Governed by HIPAA.",
              },
              {
                term: "ePHI",
                definition: "PHI in electronic form, which is what the HIPAA Security Rule specifically governs.",
              },
              {
                term: "Interoperability",
                definition: "The ability of different systems to exchange information and use what they receive.",
              },
              {
                term: "Audit trail",
                definition: "The automatic log of who accessed a record, when, and what they did. It is why unauthorized access is detectable.",
              },
            ],
          },
          {
            type: "table",
            caption: "The three zones of a practice, and what each contributes to the record",
            columns: [
              "Zone",
              "Who works there",
              "What they put into the record",
            ],
            rows: [
              [
                "Front office",
                "Reception, scheduling, registration",
                "Demographics, insurance, eligibility, consent",
              ],
              [
                "Middle office",
                "Medical assistants, nurses, providers",
                "Vital signs, history, examination, orders, results, notes",
              ],
              [
                "Back office",
                "Coders, billers, health information management",
                "Codes, claims, payments, corrections, release of information",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "This course uses EHR Go, a simulated EHR environment. Nothing you enter there concerns a real person, which is exactly why it is safe to practice in. Everything you learn about privacy and accuracy still applies — the habits you build in a simulator are the habits you will carry to a live system.",
          },
        ],
      },
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
        explanation: "Check your syllabus for the exact weighting, which is authoritative. The point of knowing it is practical: the midterm carries enough weight that preparation for it should start well before Module 4's review session.",
        optionRationales: [
          "Attendance matters and is recorded, but it is not the largest single component.",
          "Correct per the course syllabus. Confirm the exact figure against your syllabus, which is the authoritative source.",
          "Quizzes contribute, but not at this weight.",
          "Not a graded component. Logging into EHR Go matters because the labs are where the skills are built, not because attendance in the software is scored.",
        ],
      },
    ],
  },
  {
    slug: "patient-workflow-and-revenue-cycle",
    title: "Patient Workflow & the Healthcare Revenue Cycle",
    description:
      "Trace the path a patient takes through a healthcare encounter and learn how each step connects to the revenue cycle.",
    objectives: [
      "Trace a patient encounter from scheduling through payment",
      "Identify which zone of the practice owns each step",
      "Explain why most billing problems originate at the front desk",
      "Describe what happens to a claim after it leaves the practice",
    ],
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
        heading: "One visit, eleven steps",
        blocks: [
          {
            type: "scenario",
            role: "You are learning the workflow at a community clinic.",
            text: "A patient is seen for twenty minutes. Clinically the encounter ends when they leave. Financially it has barely started — and if any one of the next several steps is done wrong, the practice performs the work and is never paid for it.",
            task: "Learn the whole sequence, so you can tell where a problem actually started.",
          },
          {
            type: "table",
            caption: "The patient workflow, end to end",
            columns: [
              "#",
              "Step",
              "Zone",
              "What goes wrong here",
            ],
            rows: [
              [
                "1",
                "Scheduling",
                "Front",
                "Wrong visit type booked, so the wrong time is allotted",
              ],
              [
                "2",
                "Pre-registration",
                "Front",
                "Demographics or insurance captured incorrectly",
              ],
              [
                "3",
                "Eligibility verification",
                "Front",
                "Coverage lapsed and nobody checked",
              ],
              [
                "4",
                "Prior authorization",
                "Front",
                "Required approval never obtained",
              ],
              [
                "5",
                "Check-in",
                "Front",
                "Consent or copay not collected",
              ],
              [
                "6",
                "Clinical encounter",
                "Middle",
                "Care delivered but not fully documented",
              ],
              [
                "7",
                "Documentation",
                "Middle",
                "Note does not support what will be coded",
              ],
              [
                "8",
                "Coding",
                "Back",
                "Code does not match the documentation",
              ],
              [
                "9",
                "Charge entry and claim submission",
                "Back",
                "Claim rejected for a data error",
              ],
              [
                "10",
                "Payer adjudication",
                "Payer",
                "Denial the practice must work",
              ],
              [
                "11",
                "Payment posting and patient billing",
                "Back",
                "Balance never billed or never collected",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Steps 1 through 5 happen before the patient is ever seen, and they are where the majority of denials originate. A denial that arrives six weeks later for 'coverage terminated' was created in ninety seconds at the front desk. When you are asked to investigate a denial, start by asking what was known at registration.",
          },
          {
            type: "paragraph",
            text: "The revenue cycle is the same sequence viewed as money rather than as care. It is usually described in three phases: the front end (patient access — everything before and at check-in), the middle (health information management — documentation and coding), and the back end (patient financial services — claims, payments, denials, and collections).",
          },
        ],
      },
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
        explanation: "Check-out follows the clinical encounter. It is where referrals are arranged, follow-up is scheduled, and any remaining patient responsibility is collected — while the patient is still in the building, which is the only easy time to collect it.",
        optionRationales: [
          "Claim submission comes later, after the encounter has been documented and coded.",
          "Insurance verification happens before the visit, not after it.",
          "Correct. Check-out is the step immediately after the encounter, covering referrals, follow-up scheduling, and collection.",
          "Payment posting happens after the payer adjudicates the claim, which is several steps later.",
        ],
      },
    ],
  },
  {
    slug: "ehr-go-orientation",
    title: "EHR Go Lab: Orientation & Navigation",
    description:
      "Log in to EHR Go for the first time, explore the interface, and complete a guided workflow basics exercise.",
    objectives: [
      "Navigate the EHR Go environment and locate a patient chart",
      "Identify the main areas of an EHR: chart, orders, results, documents, billing",
      "Explain what an audit trail records and why it matters",
      "Work in a simulated EHR with the habits a live system requires",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "Practising in a simulator, working like it is live",
        blocks: [
          {
            type: "scenario",
            role: "You are opening EHR Go for the first time.",
            text: "The chart in front of you belongs to a fictional patient, so nothing you do here can harm anyone. That is precisely why it is the right place to build the habits that will matter when the chart is real.",
            task: "Learn the layout, and learn to work as though every action is logged — because in a live system it is.",
          },
          {
            type: "table",
            caption: "What lives where in an EHR",
            columns: [
              "Area",
              "Contains",
              "Who mostly works here",
            ],
            rows: [
              [
                "Patient chart / face sheet",
                "Demographics, insurance, allergies, problem list",
                "Everyone",
              ],
              [
                "Encounters",
                "Notes from each visit",
                "Providers, clinical staff",
              ],
              [
                "Orders (CPOE)",
                "Medication, lab, imaging, and referral orders",
                "Providers",
              ],
              [
                "Results",
                "Lab and imaging results, often with flags",
                "Clinical staff",
              ],
              [
                "Documents",
                "Scanned records, consents, correspondence",
                "HIM, front office",
              ],
              [
                "Billing / charges",
                "Codes, claims, payments",
                "Coders and billers",
              ],
              [
                "Administrative",
                "Scheduling, registration, reporting",
                "Front office",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Every EHR keeps an audit trail: who opened a record, when, from where, and what they viewed or changed. It cannot be switched off and it is reviewed. This is how organizations detect staff looking up a neighbour, a coworker, or a public figure — which is one of the most common causes of termination in healthcare. Open only the records your work requires, every time, including in the simulator.",
          },
          {
            type: "tip",
            text: "Get into the habit now of logging out rather than just walking away, and of never working under someone else's login. In a live system, everything done under your credentials is attributed to you, including what someone else did while you were at lunch.",
          },
        ],
      },
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
