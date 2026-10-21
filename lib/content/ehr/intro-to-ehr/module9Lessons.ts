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
            text: "The final exam is taken in class on Brightspace. It is cumulative and covers all material from Modules 1–8. It includes multiple choice, true/false, and short answer questions.",
          },
          {
            type: "paragraph",
            text: "The final exam counts for 20% of your final grade. Review all previous modules, your EHR Simulator lab notes and debriefs, and the midterm feedback from your instructor.",
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
      "Map the exam's test plan to what this course covered",
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
                "100 scored questions plus 25 unscored pretest questions, 125 minutes",
              ],
              [
                "Scaled score",
                "200 to 500; 390 or higher passes",
              ],
              [
                "Eligibility",
                "A high school diploma or equivalent (or one expected within 18 months), plus either an EHR specialist training program finished in the last 5 years or supervised EHR work experience (1 year in the last 3, or 2 years in the last 5)",
              ],
              [
                "Where you test",
                "At your school, at a PSI testing center, or with live remote proctoring",
              ],
              [
                "Renewal",
                "Every 2 years, with 10 continuing education credits",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Exam format, question count, time limit, passing score, fees, and eligibility are set by NHA and change from time to time. The figures here come from NHA's CEHRS page, test plan, and candidate handbook as of October 2026. Check them again on nhanow.com before you register, because this page is orientation, not the authority.",
          },
          {
            type: "table",
            caption: "The CEHRS test plan domains, mapped to this course",
            columns: [
              "Domain (scored questions)",
              "Covered in",
            ],
            rows: [
              [
                "Non-Clinical Operations (28) — scheduling, registration, workflow",
                "Modules 1, 2, 7",
              ],
              [
                "Clinical Operations (32) — charting, orders, results",
                "Modules 5, 6",
              ],
              [
                "Revenue Cycle/Finance (15) — coding, claims, payment",
                "Modules 2, 3, 4, 7, 8",
              ],
              [
                "Regulatory Compliance (15) — HIPAA, Cures Act, fraud and abuse",
                "Modules 6, 8",
              ],
              [
                "Reporting (10) — data extraction and quality measures",
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
              "Exam format: 125 questions in 125 minutes. 100 are scored and 25 are unscored pretest questions",
              "Delivery: computer-based, at your school, at a PSI testing center, or with live remote proctoring",
              "Passing score: a scaled score of 390 or higher, on a scale of 200 to 500",
              "Fee: listed by NHA when you schedule; check it on nhanow.com",
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
              "Clinical Operations: 32 scored questions",
              "Non-Clinical Operations: 28 scored questions",
              "Revenue Cycle/Finance: 15 scored questions",
              "Regulatory Compliance: 15 scored questions",
              "Reporting: 10 scored questions",
            ],
          },
          {
            type: "paragraph",
            text: "NHA's free CEHRS test plan lists the tasks and knowledge under each domain. Download it from nhanow.com before you start studying; the domains above are from the current plan, which is based on a 2019 job analysis, and NHA revises the plan from time to time.",
          },
          {
            type: "callout",
            variant: "success",
            text: "Clinical and non-clinical operations together carry 60 of the 100 scored questions, so the chart, order, scheduling, and registration work you did in the EHR Simulator labs is the heart of the exam. Lay the test plan beside the domain table above and mark any task it lists that this course did not cover. That short list is where to spend extra study time.",
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
        explanation: "NHA reports every certification exam, including the CEHRS, as a scaled score from 200 to 500, and 390 or higher passes. Verify the current figure in NHA's candidate handbook before you register, since exam parameters are periodically revised.",
        optionRationales: [
          "The exam is not scored out of 100. NHA uses a scaled score.",
          "Correct — 390 on NHA's 200-to-500 scale, per the candidate handbook.",
          "This looks like a count of questions rather than a score. The CEHRS has 100 scored questions plus 25 pretest questions, and results are reported as a scaled score.",
          "450 is above the passing standard on this scale.",
        ],
      },
    ],
  },
  {
    slug: "final-hands-on-review-lab",
    title: "EHR Simulator Lab: Final Hands-On Review & Course Wrap-Up",
    description:
      "Run every graded simulation clean in the BEOC EHR Simulator, review your performance history, and celebrate your progress through the Introduction to EHR course.",
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
            role: "You are completing the final lab in the BEOC EHR Simulator.",
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
        heading: "In the Simulator",
        blocks: [
          {
            type: "callout",
            variant: "success",
            text: "Congratulations on reaching the end of the Introduction to EHR course. This final lab session is your opportunity to demonstrate competency and get feedback from Mr. Davis.",
          },
          {
            type: "simulator",
            title: "Run them clean",
            path: "/ehr/assignments",
            steps: [
              "Open Assignments. For each graded simulation with attempts left, run it once more with no notes open.",
              "Open My Performance and compare every attempt: score, time, and critical errors.",
              "Pick the step you missed most often across the course and find it in the Workflow Translation guide on Home.",
            ],
            done: "Every graded simulation shows a passing best score, and you can name the one step you will keep a reference for.",
          },
          {
            type: "list",
            items: [
              "Complete a final clean run of each graded simulation",
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
