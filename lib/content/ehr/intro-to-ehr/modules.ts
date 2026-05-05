import { Lesson } from "@/types/lesson";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";
import { module6Lessons } from "./module6Lessons";
import { module7Lessons } from "./module7Lessons";
import { module8Lessons } from "./module8Lessons";
import { module9Lessons } from "./module9Lessons";

export type IntroToEHRModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
  whatYoullLearn: string[];
  scenario: string;
};

export const introToEHRModules: IntroToEHRModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Introduction & Patient Workflow",
    emoji: "🏥",
    description:
      "Get oriented to the course, meet your instructors, and trace a patient's journey from scheduling through the healthcare revenue cycle.",
    lessons: module1Lessons,
    level: "Beginner",
    estimatedMinutes: 115,
    whatYoullLearn: [
      "Course structure, grading, and expectations",
      "The full patient workflow lifecycle in a healthcare setting",
      "Key steps in the healthcare revenue cycle",
      "How to navigate EHR Go for the first time",
    ],
    scenario:
      "You just started as an administrative support specialist at Brooklyn Community Health Center. On Day 1, your supervisor walks you through how a patient flows from the waiting room through billing. By Thursday, you are logging in to EHR Go for the first time.",
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Revenue Cycle & ICD Coding",
    emoji: "💰",
    description:
      "Deepen your understanding of revenue cycle management, clinical preauthorization, and begin learning ICD-10-CM diagnostic coding.",
    lessons: module2Lessons,
    level: "Beginner",
    estimatedMinutes: 125,
    whatYoullLearn: [
      "Revenue cycle management — front-end to back-end",
      "What clinical preauthorization is and when it is required",
      "How ICD-10-CM codes are structured and used",
      "Why accurate diagnosis coding is critical to reimbursement",
    ],
    scenario:
      "A patient is scheduled for an MRI but needs preauthorization first. Your clinic's billing office receives a denial because the ICD code on the original request was too general. You are asked to help identify the correct, specific code.",
  },
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Diagnostic & Procedural Coding",
    emoji: "🗂️",
    description:
      "Expand your coding skills with ICD-10-CM specificity, CPT procedure codes, modifiers, and how diagnoses link to procedures on a claim.",
    lessons: module3Lessons,
    level: "Beginner",
    estimatedMinutes: 130,
    whatYoullLearn: [
      "ICD-10-CM code structure — characters, extensions, and specificity",
      "CPT code categories and how they describe healthcare services",
      "How modifiers affect claim processing and reimbursement",
      "How to link a diagnosis code to a procedure code for medical necessity",
    ],
    scenario:
      "A provider saw a patient for a sprained left ankle (initial encounter) and ordered an X-ray. You need to assign the correct ICD code with proper laterality and encounter extension, then link it to the correct CPT radiology code before the claim goes out.",
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "HCPCS & Midterm Preparation",
    emoji: "📋",
    description:
      "Learn HCPCS Level II coding for equipment, drugs, and supplies — then review all concepts in preparation for the midterm exam.",
    lessons: module4Lessons,
    level: "Beginner",
    estimatedMinutes: 125,
    whatYoullLearn: [
      "HCPCS Level II code categories and when to use them",
      "The difference between CPT and HCPCS Level II",
      "How Medicare and Medicaid use HCPCS codes",
      "All midterm topics: workflow, revenue cycle, ICD, CPT, and HCPCS",
    ],
    scenario:
      "A patient is discharged with a wheelchair (E-code) and a home oxygen setup (E-code). The clinic also administered an injectable medication (J-code). You must select the correct HCPCS codes for all three items before the claim is submitted.",
  },
  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "Midterm & Patient-Centered Care",
    emoji: "📝",
    description:
      "Take the midterm exam, then explore patient-centered medical home models and Computerized Provider Order Entry (CPOE).",
    lessons: module5Lessons,
    level: "Intermediate",
    estimatedMinutes: 125,
    whatYoullLearn: [
      "Demonstrate competency through the midterm assessment",
      "Patient-Centered Medical Home and FQHC care models",
      "What CPOE is and why it reduces medication errors",
      "How to enter provider orders in EHR Go",
    ],
    scenario:
      "After the midterm, your supervisor introduces you to the clinic's CPOE system. A provider orders a medication but there is a duplicate alert — the patient is already on that drug. You learn how Clinical Decision Support helps catch errors before they reach the patient.",
  },
  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "Legal Aspects & HIPAA Compliance",
    emoji: "⚖️",
    description:
      "Study CPOE in depth, then master HIPAA, patient privacy rights, and the legal framework governing Electronic Health Records.",
    lessons: module6Lessons,
    level: "Intermediate",
    estimatedMinutes: 125,
    whatYoullLearn: [
      "Advanced CPOE concepts — order sets and alert fatigue",
      "HIPAA Privacy Rule and Security Rule",
      "Patient rights under HIPAA (access, amendment, accounting of disclosures)",
      "Penalties for HIPAA violations and real-world compliance scenarios",
    ],
    scenario:
      "A coworker asks you to pull up a patient record for someone they know personally. You immediately recognize this as a potential HIPAA violation. This module teaches you exactly why — and what to do instead.",
  },
  {
    moduleNumber: 7,
    moduleSlug: "module-7",
    title: "EHR Databases & Financial Management",
    emoji: "🗄️",
    description:
      "Review core workflows, then explore how EHR databases support patient tracking, clinical administration, and financial management.",
    lessons: module7Lessons,
    level: "Intermediate",
    estimatedMinutes: 125,
    whatYoullLearn: [
      "Consolidated review of patient workflow, revenue cycle, and CPOE",
      "How EHR systems function as clinical and financial databases",
      "Key financial metrics: Days in A/R, denial rate, clean claim rate",
      "How to use EHR Go's administrative and financial tracking features",
    ],
    scenario:
      "Your administrator asks why the clinic's accounts receivable has been climbing for three months. You pull a Days in A/R report from EHR Go and identify that a specific payer is consistently taking 45+ days to pay. This module shows you how to find and interpret that data.",
  },
  {
    moduleNumber: 8,
    moduleSlug: "module-8",
    title: "Advanced Legal Topics & Integrated Practice",
    emoji: "🔒",
    description:
      "Explore the legal landscape governing EHR beyond HIPAA, learn clinical data analysis concepts, and complete an integrated capstone case.",
    lessons: module8Lessons,
    level: "Intermediate",
    estimatedMinutes: 130,
    whatYoullLearn: [
      "HITECH Act, 21st Century Cures Act, and record retention requirements",
      "How clinical data is used for quality reporting and population health",
      "Healthcare billing compliance — False Claims Act, Stark Law, Anti-Kickback",
      "Full revenue cycle simulation from registration through payment posting",
    ],
    scenario:
      "Your clinic receives an OIG audit notice. You work with the compliance officer to review recent claims for potential upcoding or documentation gaps. This module teaches you what auditors look for — and how to keep your work audit-proof.",
  },
  {
    moduleNumber: 9,
    moduleSlug: "module-9",
    title: "Final Exam & CEHRS Certification Prep",
    emoji: "🎓",
    description:
      "Complete the final exam, prepare for the NHA Certified EHR Specialist (CEHRS) exam, and wrap up with a final hands-on EHR Go competency review.",
    lessons: module9Lessons,
    level: "Advanced",
    estimatedMinutes: 185,
    whatYoullLearn: [
      "Demonstrate mastery through the cumulative final exam",
      "NHA CEHRS exam format, content domains, and passing requirements",
      "Test-taking strategies for the CEHRS certification",
      "Complete a final EHR Go competency activity",
    ],
    scenario:
      "You have completed Introduction to EHR. You sit for the final exam, then turn your attention to the NHA CEHRS certification — your credential for entering the healthcare workforce as a recognized Electronic Health Records Specialist.",
  },
];
