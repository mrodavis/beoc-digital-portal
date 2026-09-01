import { Program } from "@/types/program";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";

export const medicalBillingCoding: Program = {
  slug: "medical-billing-coding",
  title: "Medical Billing and Coding",
  shortTitle: "Medical Billing & Coding",
  icon: "🗂️",
  accent: "from-teal-700 to-teal-900",
  description:
    "Learn how a clinical encounter becomes a paid claim: the revenue cycle, medical terminology, ICD-10-CM diagnosis coding, and the compliance rules that govern all of it.",
  overview:
    "Medical billing and coding sits between the exam room and the payer. Coders translate documented care into standardized codes; billers turn those codes into claims and pursue them until they are resolved. This coursework builds both sides, starting from the revenue cycle as a whole so that every later topic has somewhere to attach. Every lesson works from documentation rather than assumption, because that is the rule the entire field runs on.",
  outcomes: [
    "Explain the healthcare revenue cycle and identify where revenue is typically lost",
    "Decode medical terminology from its root, prefix, and suffix parts",
    "Describe the structure of ICD-10-CM codes and apply the official coding guidelines",
    "Use the Alphabetic Index and Tabular List together, as the guidelines require",
    "Distinguish upcoding from undercoding and explain why both are compliance problems",
    "Read a denial report and identify which phase of the revenue cycle owns each cause",
  ],
  careerRoles: [
    "Medical biller",
    "Medical coder",
    "Patient accounts representative",
    "Revenue cycle specialist",
    "Medical office administrative assistant",
  ],
  credentialNote:
    "This coursework builds the knowledge base for entry-level billing and coding work and helps prepare for a certification exam. It is not itself a certification, and it does not replace a current code set. ICD-10-CM is revised every October and CPT every January, so always work from the current year's official code books and guidelines rather than from any course material, including this one. Certification is awarded by the credentialing bodies below, each of which sets its own eligibility requirements.",
  relatedCertifications: [
    {
      name: "CPC — Certified Professional Coder",
      body: "AAPC",
      note: "Physician-practice focused; the most widely held outpatient coding credential.",
    },
    {
      name: "CCA — Certified Coding Associate",
      body: "AHIMA",
      note: "Entry-level credential across care settings.",
    },
    {
      name: "CCS — Certified Coding Specialist",
      body: "AHIMA",
      note: "Hospital and inpatient focused; expects more experience.",
    },
    {
      name: "CBCS — Certified Billing and Coding Specialist",
      body: "NHA",
      note: "Billing-weighted entry-level credential.",
    },
  ],
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "The Revenue Cycle",
      emoji: "🔄",
      description:
        "How a clinical encounter becomes a paid claim, who the parties are, and where practices actually lose money.",
      lessons: module1Lessons,
      level: "Beginner",
      estimatedMinutes: 58,
      whatYoullLearn: [
        "The difference between medical coding and medical billing",
        "The eleven steps from patient registration to collected payment",
        "The metrics that reveal a practice's billing health",
        "Payer types, network status, and how patient responsibility is calculated",
      ],
      scenario:
        "Lakeside Medical Associates billed $840,000 last quarter and collected $611,000. The gap is not one large problem but roughly nine hundred small ones — denied claims, underpayments, uncollected patient balances, and claims that quietly aged past the filing deadline. Your first job is to understand the system well enough to see where the money is going.",
    },
    {
      moduleNumber: 2,
      moduleSlug: "module-2",
      title: "Medical Terminology for Coders",
      emoji: "🔤",
      description:
        "Decode medical terms from their parts, and map conditions to the body systems that organize the code books.",
      lessons: module2Lessons,
      level: "Beginner",
      estimatedMinutes: 42,
      whatYoullLearn: [
        "How roots, prefixes, and suffixes combine to build medical terms",
        "The high-frequency word parts that appear throughout diagnosis coding",
        "The major body systems and the coding territory each one owns",
        "Directional and laterality terms, and why laterality changes code selection",
      ],
      scenario:
        "A chart at Lakeside reads: 'Patient presents with pericarditis; history of pericardiocentesis in 2023. No evidence of endocarditis.' Three similar-looking words, and each is handled completely differently — one is coded, one is history, and one was ruled out. Reading them accurately is the difference between a correct claim and a wrong one.",
    },
    {
      moduleNumber: 3,
      moduleSlug: "module-3",
      title: "ICD-10-CM Diagnosis Coding",
      emoji: "🩺",
      description:
        "The structure of a diagnosis code, the two-step lookup the guidelines require, and the conventions that decide which codes may be reported together.",
      lessons: module3Lessons,
      level: "Intermediate",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "The character structure of an ICD-10-CM code and what each position carries",
        "The placeholder X and the 7th character extensions for injuries",
        "Why the Alphabetic Index must always be confirmed in the Tabular List",
        "Excludes1 versus Excludes2, sequencing, and the signs-and-symptoms rule",
      ],
      scenario:
        "You submit S52.5 for a healing wrist fracture and the claim is rejected as an invalid code. Your reading of the chart was right; the code was a category header missing the characters that say which wrist, what kind of fracture, and which encounter this is. Learning the structure is what prevents that rejection.",
    },
  ],
};
