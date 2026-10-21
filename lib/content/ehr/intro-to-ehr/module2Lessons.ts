import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "revenue-cycle-and-preauthorization",
    title: "Revenue Cycle Management & Clinical Preauthorization",
    description:
      "Dive deeper into revenue cycle management and learn how clinical preauthorization protects both patients and providers.",
    objectives: [
      "Describe the three phases of the revenue cycle",
      "Explain what prior authorization is and when it is required",
      "Distinguish eligibility, authorization, and medical necessity",
      "Describe what happens when authorization is missed",
    ],
    duration: "20 min",
    sections: [
      {
        heading: "Approval before the service, not after",
        blocks: [
          {
            type: "scenario",
            role: "You work patient access at a clinic.",
            text: "A patient is scheduled for an imaging study. Their plan requires approval in advance. Nobody requests it. The study is performed, the claim is submitted, and the payer denies it — correctly, because the terms of the plan were not met. The practice has performed a real service and has no way to be paid for it.",
            task: "Learn what must be obtained before a service, and what happens when it is not.",
          },
          {
            type: "paragraph",
            text: "Prior authorization is a payer's advance approval for a specific service, for a specific patient, usually within a specific window. It exists because payers want to review certain expensive or elective services before committing to pay for them. Whether you agree with the practice or not, it is a contractual term, and a service delivered without it is generally not payable.",
          },
          {
            type: "table",
            caption: "Three checks that are frequently confused",
            columns: [
              "Check",
              "Answers",
              "When",
            ],
            rows: [
              [
                "Eligibility",
                "Is this patient's coverage active, and are we in network?",
                "At scheduling and again at check-in",
              ],
              [
                "Prior authorization",
                "Has the payer approved this specific service in advance?",
                "Before the service is delivered",
              ],
              [
                "Medical necessity",
                "Does the documentation support that this service was appropriate?",
                "Judged when the claim is adjudicated",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "These three are independent. A service can be eligible, authorized, and still denied for medical necessity if the documentation does not support it. Confirming one tells you nothing about the other two, and a verification response saying coverage is active is explicitly not a guarantee of payment — payers state this in the response itself.",
          },
          {
            type: "paragraph",
            text: "When authorization is missed, the options are limited. Some payers permit a retroactive request within a short window, usually with a clinical justification. Otherwise the claim is appealed, written off, or — where the payer contract permits and the patient was properly notified in advance — billed to the patient. Preventing it is far cheaper than any of these.",
          },
        ],
      },
      {
        heading: "Revenue Cycle Management (RCM) Deep Dive",
        blocks: [
          {
            type: "paragraph",
            text: "Revenue Cycle Management is the financial process healthcare organizations use to track patient care episodes from registration to final payment. Effective RCM minimizes claim denials and maximizes reimbursement.",
          },
          {
            type: "list",
            items: [
              "Patient access (registration, eligibility, benefits verification)",
              "Health information management (coding, documentation)",
              "Patient financial services (billing, collections)",
              "Claims management (submission, follow-up, appeals)",
            ],
          },
        ],
      },
      {
        heading: "Clinical Preauthorization",
        blocks: [
          {
            type: "paragraph",
            text: "Preauthorization (also called prior authorization) is the process of getting insurance approval before a patient receives certain procedures, medications, or specialist referrals.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Skipping preauthorization when it is required can result in a denied claim — meaning the provider may not get paid and the patient could be billed unexpectedly.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is the primary purpose of clinical preauthorization?",
        options: [
          "To schedule appointments faster",
          "To obtain insurance approval before delivering a service",
          "To verify a patient's identity at check-in",
          "To assign ICD codes to a diagnosis",
        ],
        correctIndex: 1,
        explanation: "Prior authorization is the payer's advance approval for a specific service. Without it, a service that would otherwise have been covered is generally not payable, because the plan's terms were not met.",
        optionRationales: [
          "Authorization has no bearing on scheduling speed — if anything it adds lead time, which is why it must be started early.",
          "Correct. It obtains the payer's approval before the service is delivered.",
          "Identity verification happens at check-in and is a separate control.",
          "Diagnosis coding happens after the encounter, from the documentation. Authorization happens before it.",
        ],
      },
    ],
  },
  {
    slug: "medical-coding-icd-part-1",
    title: "Medical Coding Overview: ICD Part 1",
    description:
      "Introduction to the International Classification of Diseases (ICD) coding system and its role in healthcare billing.",
    objectives: [
      "Explain what ICD-10-CM is and what it is used for",
      "Distinguish ICD-10-CM from ICD-10-PCS",
      "Describe the structure of a diagnosis code",
      "Explain why specificity affects payment",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "Codes for why the patient was seen",
        blocks: [
          {
            type: "scenario",
            role: "You are learning diagnosis coding.",
            text: "A provider documents that a patient has osteoarthritis of the left knee. That sentence has to become a code, because a claim is not a narrative — it is a structured set of codes that a payer's system can process without a human reading it.",
            task: "Learn what the diagnosis code set is, how it is built, and why the level of detail matters.",
          },
          {
            type: "paragraph",
            text: "ICD stands for International Classification of Diseases. The World Health Organization maintains the base classification; the United States uses a clinical modification of the tenth revision, ICD-10-CM, for diagnosis coding in every setting. It is maintained jointly by the CDC's National Center for Health Statistics and CMS. A new code set takes effect every October 1 (the FY 2027 code set took effect October 1, 2026), and some years bring a smaller update on April 1 as well, as April 1, 2026 did. Always code from the set in effect on the date of service.",
          },
          {
            type: "table",
            caption: "Code sets that are easy to confuse",
            columns: [
              "Code set",
              "Describes",
              "Used in",
            ],
            rows: [
              [
                "ICD-10-CM",
                "Diagnoses — why care was needed",
                "All settings, inpatient and outpatient",
              ],
              [
                "ICD-10-PCS",
                "Procedures",
                "Inpatient hospital only",
              ],
              [
                "CPT (HCPCS Level I)",
                "Procedures and services",
                "Outpatient and professional services",
              ],
              [
                "HCPCS Level II",
                "Supplies, equipment, drugs, transport",
                "All settings",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "An ICD-10-CM code is three to seven characters. The first character is a letter, the second is a number, and the rest may be either. A decimal point follows the third character. Characters beyond the third add specificity — the anatomic site, the severity, the laterality, and for injuries, the encounter type.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Coding to the highest level of specificity available is required, not optional. A three-character code is only billable when the code set provides no further subdivision for it — and most three-character entries are category headers. Submitting one where subdivisions exist produces an invalid-code rejection. Unspecified codes are valid where the documentation genuinely does not support more detail, but a pattern of them attracts payer attention and often pays less.",
          },
        ],
      },
      {
        heading: "What Is ICD Coding?",
        blocks: [
          {
            type: "paragraph",
            text: "ICD stands for International Classification of Diseases. It is the global standard for classifying diagnoses, symptoms, and health conditions. In the United States, ICD-10-CM is the diagnosis code set for every setting, inpatient and outpatient.",
          },
          {
            type: "list",
            items: [
              "ICD-10-CM: Clinical Modification — used by providers to code diagnoses",
              "ICD-10-PCS: Procedure Coding System — used in inpatient hospital settings",
              "Codes are alphanumeric (e.g., J18.9 = Pneumonia, unspecified)",
            ],
          },
        ],
      },
      {
        heading: "Why Accurate ICD Coding Matters",
        blocks: [
          {
            type: "paragraph",
            text: "ICD codes are used on every insurance claim. An inaccurate code can cause a claim to be rejected, underpaid, or flagged for audit. Coders must select the most specific code that is supported by documentation.",
          },
          {
            type: "callout",
            variant: "info",
            text: "The rule in coding: if it isn't documented, it didn't happen. Coders cannot assign a code for a condition that the provider did not document in the patient record.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which ICD version is used in the United States for outpatient diagnosis coding?",
        options: [
          "ICD-9-CM",
          "ICD-10-PCS",
          "ICD-10-CM",
          "ICD-11",
        ],
        correctIndex: 2,
        explanation: "ICD-10-CM is the clinical modification used in the United States for diagnosis coding in all settings. ICD-10-PCS is a separate set used only for inpatient hospital procedures.",
        optionRationales: [
          "ICD-9-CM was replaced for US reporting in October 2015.",
          "ICD-10-PCS codes procedures in the inpatient hospital setting, not diagnoses.",
          "Correct. ICD-10-CM is the US diagnosis code set, used in outpatient and inpatient settings alike.",
          "ICD-11 has been released by the WHO and adopted in some countries, but the United States has not transitioned to it for reporting.",
        ],
      },
    ],
  },
  {
    slug: "patient-registration-insurance-review-lab",
    title: "EHR Simulator Lab: Patient Registration & Insurance Review",
    description:
      "Register a new patient, record their insurance, book and check in their visit, then complete the graded New Patient Arrival simulation.",
    objectives: [
      "Register a patient accurately in the EHR",
      "Capture and verify insurance information before the visit",
      "Book an appointment and check the patient in from the schedule",
      "Recognize the registration errors that cause downstream denials",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "Ninety seconds that decide whether the claim pays",
        blocks: [
          {
            type: "scenario",
            role: "You are working registration at Northstar Medical Center.",
            text: "Registration feels like data entry. It is actually the single highest-leverage step in the revenue cycle: a transposed digit in a member number produces a rejection weeks later, and by then the visit is a memory and the correction takes ten times longer than getting it right would have.",
            task: "Register accurately, and verify rather than assume.",
          },
          {
            type: "table",
            caption: "What to capture, and the error each field prevents",
            columns: [
              "Field",
              "Verify by",
              "Prevents",
            ],
            rows: [
              [
                "Legal name and date of birth",
                "Photo ID",
                "Claim rejected as subscriber not found",
              ],
              [
                "Insurance carrier and plan",
                "The card itself, both sides",
                "Claim routed to the wrong payer",
              ],
              [
                "Member and group number",
                "Reading from the card, not from memory",
                "Invalid subscriber rejection",
              ],
              [
                "Subscriber relationship",
                "Asking, when the patient is not the subscriber",
                "Dependent claims filed as self",
              ],
              [
                "Eligibility",
                "Electronic verification",
                "Coverage-terminated denial",
              ],
              [
                "Authorization requirements",
                "The payer's rules for the visit type",
                "No-authorization denial",
              ],
              [
                "Consent and financial responsibility",
                "Signature captured in the record",
                "Disputes about what the patient agreed to",
              ],
            ],
          },
          {
            type: "tip",
            text: "Photograph or scan both sides of the insurance card into the record. The back carries the payer's claims address and provider phone number, and it is the side people forget. Verify eligibility electronically even when the card looks current — a card in a wallet says nothing about whether the policy is still active today.",
          },
        ],
      },
      {
        heading: "In the Simulator",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "In this lab session, Mr. Davis will guide you through registration and insurance review in the BEOC EHR Simulator. The patient you register today is your practice patient for the rest of the course, so keep track of their name.",
          },
          {
            type: "simulator",
            title: "Register your practice patient",
            path: "/ehr/patients/new",
            role: "Front Desk",
            steps: [
              "Switch to Front Desk, then choose Register a patient on Home.",
              "Make up a fictional adult patient. Use your own first name as the patient's family name (if you are Keisha, your patient could be Marcus Keisha) so you can find them in later labs. Never enter information about a real person.",
              "Complete the demographics and save. Work the Registration Checklist down until nothing is missing.",
              "In the patient's Registration section, add primary Insurance Coverage using the practice card in the table below. Enter every value from the card, not from memory, and set the effective date to the first of this year.",
            ],
            done: "Your patient's Registration Checklist is complete and their primary coverage is on file.",
          },
          {
            type: "table",
            caption: "Practice insurance card (fictional)",
            columns: [
              "Field",
              "Value",
            ],
            rows: [
              [
                "Payer",
                "Empire Northstar Health Plan",
              ],
              [
                "Plan",
                "Gold PPO",
              ],
              [
                "Member ID",
                "ENH4417 followed by any four digits you choose, e.g. ENH44172291",
              ],
              [
                "Group",
                "BEOC-2026",
              ],
              [
                "Subscriber",
                "The patient (same name as registered)",
              ],
              [
                "Relationship",
                "Self",
              ],
              [
                "Priority",
                "Primary",
              ],
            ],
          },
          {
            type: "simulator",
            title: "Book and check in the visit",
            path: "/ehr/schedule",
            role: "Front Desk",
            steps: [
              "Open Schedule and book your patient for a new-patient visit today. Choose any provider and location and an open time. If the schedule reports a conflict, a classmate already holds that slot; pick another, exactly as a real front desk would.",
              "Find the appointment on the schedule and confirm it.",
              "Check the patient in. Check-in is where the visit becomes an encounter.",
              "Open the chart and confirm the header now shows where the patient is.",
            ],
            done: "Your practice patient is checked in for today's visit.",
          },
          {
            type: "simulator",
            title: "Graded simulation: New Patient Arrival",
            path: "/ehr/assignments",
            role: "Front Desk",
            assignment: "New Patient Arrival: Coverage Verification and Check-In",
            steps: [
              "Open Assignments and start the simulation. It switches you to Front Desk.",
              "Open the assigned patient's chart and confirm identity with two identifiers before you change anything.",
              "Review the registration record with the patient and update anything that has changed.",
              "Verify the insurance coverage and record it on the Registration tab before check-in. The order is graded: checking in first and verifying afterwards is the most common front-desk error.",
              "Check the patient in from the Schedule. When the visit is over, check them out so the encounter can reach billing.",
              "Complete the simulation and read the debrief.",
            ],
            done: "The debrief shows your score, and every missed step is listed with why it matters.",
          },
        ],
      },
    ],
  },
];
