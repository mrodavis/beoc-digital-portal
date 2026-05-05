import { Lesson } from "@/types/lesson";

export const module9Lessons: Lesson[] = [
  {
    slug: "final-exam",
    title: "Course Final Exam",
    description:
      "Cumulative assessment covering all course material including patient workflow, coding, compliance, CPOE, and EHR fundamentals.",
    duration: "80 min",
    sections: [
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
    duration: "25 min",
    sections: [
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
      },
    ],
  },
  {
    slug: "final-hands-on-review-lab",
    title: "EHR Go Lab: Final Hands-On Review & Course Wrap-Up",
    description:
      "Complete a final competency check in EHR Go and celebrate your progress through the Introduction to EHR course.",
    duration: "80 min",
    sections: [
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
