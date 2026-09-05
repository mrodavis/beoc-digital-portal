import { Program } from "@/types/program";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";
import { module6Lessons } from "./module6Lessons";
import { module7Lessons } from "./module7Lessons";
import { module8Lessons } from "./module8Lessons";

export const medicalBillingCoding: Program = {
  slug: "medical-billing-coding",
  group: "Healthcare",
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
    "Select CPT and HCPCS codes, and apply modifiers correctly",
    "Code office visits using medical decision making or total time",
    "Verify eligibility, obtain prior authorization, and use an ABN appropriately",
    "Complete a CMS-1500, distinguish a rejection from a denial, and post a remittance",
    "Prioritize a denial queue by deadline and recoverable value, and write an appeal",
    "Apply HIPAA's minimum necessary standard, and recognize the line between error and fraud",
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

    {
      moduleNumber: 4,
      moduleSlug: "module-4",
      title: "CPT & HCPCS Procedure Coding",
      emoji: "🔢",
      description:
        "Code what the provider did: CPT structure and categories, office visit level selection under the current rules, and the modifiers that keep legitimate claims from being denied.",
      lessons: module4Lessons,
      level: "Intermediate",
      estimatedMinutes: 72,
      whatYoullLearn: [
        "CPT structure, its three categories, and how it differs from HCPCS Level II",
        "Selecting an office visit level by medical decision making or by total time",
        "The new versus established patient rule and why it affects payment",
        "Modifiers 25 and 59, the two most misused codes in the field",
      ],
      scenario:
        "The diagnosis code says the patient has osteoarthritis of the left knee. That explains why care was needed and says nothing about what the provider did — the examination, the injection, the X-ray. Twenty-two of the day's twenty-four encounters are office visits, and each needs a level that the documentation actually supports.",
    },
    {
      moduleNumber: 5,
      moduleSlug: "module-5",
      title: "Payers, Eligibility & Authorization",
      emoji: "🛡️",
      description:
        "Do the front-end work that prevents most denials, and understand how payers decide what to pay.",
      lessons: module5Lessons,
      level: "Intermediate",
      estimatedMinutes: 46,
      whatYoullLearn: [
        "What an eligibility verification confirms, and what it does not",
        "The difference between coverage, authorization, and medical necessity",
        "Using an ABN and modifier GA for Medicare services that may not be covered",
        "Fee schedules, RBRVS, and why timely filing limits are absolute",
      ],
      scenario:
        "In Module 1 you found that 112 of last month's 138 denials originated before the patient was ever seen. Every one was preventable in the ninety seconds before the appointment. Meanwhile the same office visit code pays $186 from one payer, $142 from another, and $109 from Medicaid.",
    },
    {
      moduleNumber: 6,
      moduleSlug: "module-6",
      title: "Claim Submission",
      emoji: "📤",
      description:
        "Build a clean claim, understand the fields that cause rejections, and follow it through adjudication to a correctly posted payment.",
      lessons: module6Lessons,
      level: "Intermediate",
      estimatedMinutes: 46,
      whatYoullLearn: [
        "The CMS-1500, the 837P transaction, and the fields that most often reject",
        "The difference between a rejection and a denial, and why it changes what you do",
        "What claim scrubbing catches and why it pays for itself",
        "Reading a remittance and posting payment, adjustment, and patient responsibility",
      ],
      scenario:
        "Twelve claims come back the same afternoon, before any payer looked at them clinically — invalid subscriber ID, missing NPI, a diagnosis pointer referencing a diagnosis not on the claim. None are coding problems. All twelve were preventable.",
    },
    {
      moduleNumber: 7,
      moduleSlug: "module-7",
      title: "Denials, Appeals & A/R",
      emoji: "📊",
      description:
        "Work a denial queue by deadline and recoverable value, write appeals that succeed, and manage accounts receivable before claims age into worthlessness.",
      lessons: module7Lessons,
      level: "Advanced",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Interpreting denial reason codes and categorizing by root cause",
        "Choosing between a corrected claim, an appeal, and a write-off",
        "Prioritizing a denial queue by deadline and dollar value",
        "Writing a structured appeal, and reading an A/R aging report",
      ],
      scenario:
        "You inherit 138 denials worth $47,000. Working them oldest-first would be reasonable if they were equivalent — but some are worth $40 and some $3,000, some are five days from a filing deadline, and roughly a third have no realistic prospect of recovery at all.",
    },
    {
      moduleNumber: 8,
      moduleSlug: "module-8",
      title: "Compliance & Ethics",
      emoji: "⚖️",
      description:
        "The privacy rules governing everything you touch, the laws governing claim submission, and what to do when you are asked to code something you cannot support.",
      lessons: module8Lessons,
      level: "Advanced",
      estimatedMinutes: 50,
      whatYoullLearn: [
        "What counts as protected health information, and the minimum necessary standard",
        "Recognizing a breach and the obligation to report it",
        "The False Claims Act, Anti-Kickback Statute, and Stark Law",
        "How to respond when directed to submit a claim the documentation does not support",
      ],
      scenario:
        "A provider asks you to change a 99213 to a 99215 on a note that plainly does not support it, saying the visit 'felt like a level five' and the practice is behind on revenue. Refusing is uncomfortable. Complying would make you a participant in submitting a false claim — and 'my supervisor told me to' has never been a defense.",
    },
  ],
};