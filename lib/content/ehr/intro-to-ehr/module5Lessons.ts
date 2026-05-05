import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "midterm-exam",
    title: "Midterm Exam",
    description:
      "Assessment covering patient workflow, revenue cycle, ICD, CPT, and HCPCS coding concepts from Weeks 1–4.",
    duration: "80 min",
    sections: [
      {
        heading: "Exam Information",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The midterm exam is administered in class by Mr. Gera. It includes multiple choice, true/false, and short answer sections covering all material from Weeks 1–4.",
          },
          {
            type: "paragraph",
            text: "The midterm counts for 25% of your final grade. Make sure you have reviewed the Week 4 study materials and completed the EHR Go midterm skills review lab.",
          },
        ],
      },
    ],
  },
  {
    slug: "patient-centered-care-and-cpoe-part-1",
    title: "Patient-Centered Medical Home, FQHC & CPOE Part 1",
    description:
      "Explore patient-centered care models and begin learning Computerized Provider Order Entry (CPOE) systems.",
    duration: "25 min",
    sections: [
      {
        heading: "Patient-Centered Medical Home (PCMH)",
        blocks: [
          {
            type: "paragraph",
            text: "The Patient-Centered Medical Home is a care delivery model that coordinates comprehensive primary care across specialties and settings. It emphasizes continuous, coordinated care and patient engagement.",
          },
          {
            type: "list",
            items: [
              "Accessible, team-based primary care",
              "Whole-person approach to health",
              "Coordinated referrals and follow-up",
              "Quality measurement and improvement",
            ],
          },
        ],
      },
      {
        heading: "Federally Qualified Health Centers (FQHCs)",
        blocks: [
          {
            type: "paragraph",
            text: "FQHCs are community-based healthcare providers that receive federal funding to provide primary care in underserved areas. They must demonstrate use of EHR systems and follow specific billing rules under Medicare and Medicaid.",
          },
        ],
      },
      {
        heading: "Introduction to CPOE",
        blocks: [
          {
            type: "paragraph",
            text: "Computerized Provider Order Entry (CPOE) allows clinicians to enter medical orders directly into the EHR system, replacing handwritten orders. CPOE reduces medication errors and improves workflow efficiency.",
          },
          {
            type: "callout",
            variant: "success",
            text: "CPOE is a key Meaningful Use / Promoting Interoperability requirement. Hospitals must demonstrate CPOE use to qualify for CMS incentive programs.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is the primary benefit of Computerized Provider Order Entry (CPOE)?",
        options: [
          "It replaces the need for insurance verification",
          "It allows patients to order their own lab tests",
          "It reduces medication errors by eliminating handwritten orders",
          "It automates claim submission to insurance companies",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "provider-order-entry-lab",
    title: "EHR Go Lab: Provider Order Entry & Patient Chart Review",
    description:
      "Use EHR Go to enter simulated provider orders, complete documentation tasks, and review a patient chart.",
    duration: "80 min",
    sections: [
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Mr. Davis leads this hands-on lab focused on CPOE and clinical documentation in EHR Go.",
          },
          {
            type: "list",
            items: [
              "Navigate to the order entry section of EHR Go",
              "Enter a simulated lab order and medication order",
              "Complete a clinical documentation task",
              "Review a completed patient chart for accuracy",
            ],
          },
        ],
      },
    ],
  },
];
