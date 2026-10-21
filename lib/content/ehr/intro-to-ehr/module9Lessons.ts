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
            caption: "The topic areas an EHR specialist exam draws on, mapped to this course",
            columns: [
              "Topic area",
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
            text: "Prepare by retrieval, not rereading. For each topic above, close the material and explain it out loud. Where you hesitate is your study list; where you answer instantly needs no more work, however reassuring rereading feels.",
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
              "Exam format: scored multiple-choice questions plus a small number of unscored pretest questions",
              "Delivery: computer-based, at an approved testing site or remotely proctored",
              "Passing score: a scaled score of 390, on a scale that runs to 500",
              "Time limit and fee: set by NHA and listed in the current candidate handbook",
            ],
          },
        ],
      },
      {
        heading: "CEHRS Content Domains",
        blocks: [
          {
            type: "paragraph",
            text: "NHA publishes a test plan for the CEHRS that names each content domain and how many questions it carries. Download the current test plan from NHA before you start studying, because the domains and their weights are revised from time to time.",
          },
          {
            type: "callout",
            variant: "success",
            text: "This course covers the main areas the CEHRS draws on: workflow, documentation, coding and revenue cycle, privacy and compliance, and reporting. Lay the test plan beside the topic table above and mark any topic it lists that this course did not cover. That short list is where to spend extra study time.",
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
