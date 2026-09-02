import { Lesson } from "@/types/lesson";

export const module9Lessons: Lesson[] = [
  {
    slug: "final-exam",
    title: "Course Final Exam",
    description:
      "Cumulative assessment covering all course material including patient workflow, coding, compliance, CPOE, and EHR fundamentals.",
    objectives: [
      "Demonstrate command of the full course",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "Before you start",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The final is administered through Brightspace. Coding questions frequently turn on a single qualifier — outpatient, same day, documented, established. Read the scenario and decide what the documentation supports before looking at the options.",
          },
        ],
      },
      {
        heading: "Exam Information",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The final exam is administered in class by Mr. Gera. It is cumulative and covers all material from Weeks 1–8. It includes multiple choice, true/false, and short answer questions.",
          },
          {
            type: "paragraph",
            text: "The final exam counts for 25% of your final grade. Review all previous modules, your EHR Go lab notes, and the midterm feedback from your instructor.",
          },
        ],
      },
    ],
  },
  {
    slug: "nha-cehrs-exam-prep",
    title: "NHA Certified EHR Specialist (CEHRS) Exam Preparation",
    description:
      "Prepare for the NHA CEHRS certification exam with a review of exam content domains, test-taking strategies, and practice questions.",
    objectives: [
      "Describe the CEHRS exam format and eligibility",
      "Map the exam's domains to what this course covered",
      "Build a study plan based on retrieval rather than rereading",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "What the CEHRS actually tests",
        blocks: [
          {
            type: "scenario",
            role: "You are considering certification.",
            text: "The Certified Electronic Health Records Specialist credential is awarded by the National Healthcareer Association. It is not required to work in the field, and it is widely recognized by employers — which makes it worth doing if you intend to work in health information.",
            task: "Understand the exam's shape so preparation is targeted rather than general.",
          },
          {
            type: "table",
            caption: "The exam",
            columns: [
              "Item",
              "Detail",
            ],
            rows: [
              [
                "Awarded by",
                "National Healthcareer Association (NHA)",
              ],
              [
                "Format",
                "Scored multiple-choice questions plus unscored pretest items",
              ],
              [
                "Scaled score",
                "Reported on a scale to 500",
              ],
              [
                "Eligibility",
                "Completion of a training program or relevant work experience",
              ],
              [
                "Renewal",
                "Continuing education on a recurring cycle",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Exam format, question count, time limit, passing score, and eligibility are set by NHA and change from time to time. Verify every detail against NHA's current candidate handbook before you register — this page is orientation, not the authority.",
          },
          {
            type: "table",
            caption: "Exam domains against this course",
            columns: [
              "Domain area",
              "Covered in",
            ],
            rows: [
              [
                "Non-clinical operations — scheduling, registration, workflow",
                "Modules 1, 2, 7",
              ],
              [
                "Clinical operations — charting, orders, results",
                "Modules 5, 6",
              ],
              [
                "Revenue cycle and financial — coding, claims, payment",
                "Modules 2, 3, 4, 7, 8",
              ],
              [
                "Regulatory compliance — HIPAA, Cures Act, fraud and abuse",
                "Modules 6, 8",
              ],
              [
                "Reporting — data extraction and quality measures",
                "Modules 7, 8",
              ],
            ],
          },
          {
            type: "tip",
            text: "Prepare by retrieval, not rereading. For each domain above, close the material and explain it out loud. Where you hesitate is your study list; where you answer instantly needs no more work, however reassuring rereading feels.",
          },
        ],
      },
      {
        heading: "About the NHA CEHRS Exam",
        blocks: [
          {
            type: "paragraph",
            text: "The NHA (National Healthcareer Association) Certified Electronic Health Records Specialist (CEHRS) exam validates competency in EHR systems, healthcare data management, and administrative workflows.",
          },
          {
            type: "list",
            items: [
              "Exam format: 110 questions (100 scored + 10 pretest)",
              "Time limit: 3 hours",
              "Delivery: Computer-based at an approved testing site or remotely proctored",
              "Passing score: 390 out of 500",
            ],
          },
        ],
      },
      {
        heading: "CEHRS Content Domains",
        blocks: [
          {
            type: "list",
            items: [
              "EHR Functions and Workflows (~22%)",
              "Data Management and Entry (~20%)",
              "Revenue Cycle Management (~18%)",
              "Legal and Ethical Aspects (~16%)",
              "Patient Communication and Education (~12%)",
              "Health Informatics and Technology (~12%)",
            ],
          },
          {
            type: "callout",
            variant: "success",
            text: "Everything covered in this course maps directly to CEHRS content domains. Strong performance in this course puts you on the right track for certification.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is the passing score for the NHA CEHRS exam?",
        options: [
          "70 out of 100",
          "390 out of 500",
          "100 out of 110",
          "450 out of 500",
        ],
        correctIndex: 1,
        explanation: "NHA reports the CEHRS on a scaled score to 500, with 390 as the passing standard. Verify the current figure in NHA's candidate handbook before you register, since exam parameters are periodically revised.",
        optionRationales: [
          "The exam is not scored out of 100. NHA uses a scaled score.",
          "Correct — 390 on a 500-point scale, per NHA's published standard. Confirm against the current candidate handbook.",
          "This resembles a raw question count rather than the reported score.",
          "450 is above the passing standard on this scale.",
        ],
      },
    ],
  },
  {
    slug: "final-hands-on-review-lab",
    title: "EHR Go Lab: Final Hands-On Review & Course Wrap-Up",
    description:
      "Complete a final competency check in EHR Go and celebrate your progress through the Introduction to EHR course.",
    objectives: [
      "Demonstrate the full EHR workflow unassisted",
      "Identify any remaining gaps before the course ends",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "The whole workflow, one more time",
        blocks: [
          {
            type: "scenario",
            role: "You are completing the final lab in EHR Go.",
            text: "Register, verify, document, order, code, submit, post. If you can do all seven without stopping to look anything up, you can do the job.",
            task: "Run it clean, and note anything that still needs a reference.",
          },
          {
            type: "tip",
            text: "Keep whatever reference sheet you built during this course. Working coders and billers use references constantly — the skill is not memorizing code sets, it is knowing where to look and what to check.",
          },
        ],
      },
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "success",
            text: "Congratulations on completing the Introduction to EHR course. This final lab session is your opportunity to demonstrate competency and get feedback from Mr. Davis.",
          },
          {
            type: "list",
            items: [
              "Complete the EHR Go final competency activity",
              "Receive feedback on your simulation performance",
              "Review CEHRS exam registration steps",
              "Course wrap-up and next steps discussion",
            ],
          },
        ],
      },
    ],
  },
];
