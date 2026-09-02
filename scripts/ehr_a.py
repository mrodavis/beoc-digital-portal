import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M1 = {
"course-overview": {
  "objectives": [
    "Describe what an electronic health record is and what it replaced",
    "Name the three zones of a medical practice and the work each does",
    "Explain how this course is assessed and what EHR Go is used for",
    "Describe the role an EHR specialist actually performs",
  ],
  "opening": {
    "heading": "What you are learning to do",
    "blocks": [
      {"type": "scenario",
       "role": "You are beginning the Introduction to EHR course.",
       "text": "A patient arrives at a clinic. Over the next hour, roughly a dozen people touch information about that visit — the front desk, the medical assistant, the provider, the coder, the biller, the payer. Every one of them works from the same record. Your job is to make sure that record is accurate, complete, findable, and lawful.",
       "task": "Understand the whole system before learning any one part of it."},
      {"type": "paragraph",
       "text": "An electronic health record is the digital version of a patient's chart, but calling it that undersells what changed. A paper chart lived in one place and one person could use it at a time. An EHR is a database that many people use simultaneously, that enforces rules about who may see what, that records every access, and that feeds billing, quality reporting, and public health at the same time as clinical care."},
      {"type": "paragraph",
       "text": "That is why EHR work sits between clinical and administrative staff. You will not diagnose or treat. You will make sure that what was done is recorded correctly, coded correctly, protected correctly, and billed correctly — and those four things determine whether a practice can keep its doors open."},
      {"type": "key-terms",
       "terms": [
         {"term": "EHR", "definition": "Electronic Health Record — the comprehensive digital record of a patient's health across providers and encounters."},
         {"term": "EMR", "definition": "Electronic Medical Record — historically the record within one practice. The terms are now used almost interchangeably, but EHR implies sharing across organizations."},
         {"term": "PHI", "definition": "Protected Health Information — health information linked to an identifiable person. Governed by HIPAA."},
         {"term": "ePHI", "definition": "PHI in electronic form, which is what the HIPAA Security Rule specifically governs."},
         {"term": "Interoperability", "definition": "The ability of different systems to exchange information and use what they receive."},
         {"term": "Audit trail", "definition": "The automatic log of who accessed a record, when, and what they did. It is why unauthorized access is detectable."},
       ]},
      {"type": "table",
       "caption": "The three zones of a practice, and what each contributes to the record",
       "columns": ["Zone", "Who works there", "What they put into the record"],
       "rows": [
         ["Front office", "Reception, scheduling, registration", "Demographics, insurance, eligibility, consent"],
         ["Middle office", "Medical assistants, nurses, providers", "Vital signs, history, examination, orders, results, notes"],
         ["Back office", "Coders, billers, health information management", "Codes, claims, payments, corrections, release of information"],
       ]},
      {"type": "callout", "variant": "info",
       "text": "This course uses EHR Go, a simulated EHR environment. Nothing you enter there concerns a real person, which is exactly why it is safe to practice in. Everything you learn about privacy and accuracy still applies — the habits you build in a simulator are the habits you will carry to a live system."},
    ],
  },
  "checks": [
    {"explanation": "Check your syllabus for the exact weighting, which is authoritative. The point of knowing it is practical: the midterm carries enough weight that preparation for it should start well before Module 4's review session.",
     "rationales": [
       "Attendance matters and is recorded, but it is not the largest single component.",
       "Correct per the course syllabus. Confirm the exact figure against your syllabus, which is the authoritative source.",
       "Quizzes contribute, but not at this weight.",
       "Not a graded component. Logging into EHR Go matters because the labs are where the skills are built, not because attendance in the software is scored.",
     ]},
  ],
},
"patient-workflow-and-revenue-cycle": {
  "objectives": [
    "Trace a patient encounter from scheduling through payment",
    "Identify which zone of the practice owns each step",
    "Explain why most billing problems originate at the front desk",
    "Describe what happens to a claim after it leaves the practice",
  ],
  "opening": {
    "heading": "One visit, eleven steps",
    "blocks": [
      {"type": "scenario",
       "role": "You are learning the workflow at a community clinic.",
       "text": "A patient is seen for twenty minutes. Clinically the encounter ends when they leave. Financially it has barely started — and if any one of the next several steps is done wrong, the practice performs the work and is never paid for it.",
       "task": "Learn the whole sequence, so you can tell where a problem actually started."},
      {"type": "table",
       "caption": "The patient workflow, end to end",
       "columns": ["#", "Step", "Zone", "What goes wrong here"],
       "rows": [
         ["1", "Scheduling", "Front", "Wrong visit type booked, so the wrong time is allotted"],
         ["2", "Pre-registration", "Front", "Demographics or insurance captured incorrectly"],
         ["3", "Eligibility verification", "Front", "Coverage lapsed and nobody checked"],
         ["4", "Prior authorization", "Front", "Required approval never obtained"],
         ["5", "Check-in", "Front", "Consent or copay not collected"],
         ["6", "Clinical encounter", "Middle", "Care delivered but not fully documented"],
         ["7", "Documentation", "Middle", "Note does not support what will be coded"],
         ["8", "Coding", "Back", "Code does not match the documentation"],
         ["9", "Charge entry and claim submission", "Back", "Claim rejected for a data error"],
         ["10", "Payer adjudication", "Payer", "Denial the practice must work"],
         ["11", "Payment posting and patient billing", "Back", "Balance never billed or never collected"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Steps 1 through 5 happen before the patient is ever seen, and they are where the majority of denials originate. A denial that arrives six weeks later for 'coverage terminated' was created in ninety seconds at the front desk. When you are asked to investigate a denial, start by asking what was known at registration."},
      {"type": "paragraph",
       "text": "The revenue cycle is the same sequence viewed as money rather than as care. It is usually described in three phases: the front end (patient access — everything before and at check-in), the middle (health information management — documentation and coding), and the back end (patient financial services — claims, payments, denials, and collections)."},
    ],
  },
  "checks": [
    {"explanation": "Check-out follows the clinical encounter. It is where referrals are arranged, follow-up is scheduled, and any remaining patient responsibility is collected — while the patient is still in the building, which is the only easy time to collect it.",
     "rationales": [
       "Claim submission comes later, after the encounter has been documented and coded.",
       "Insurance verification happens before the visit, not after it.",
       "Correct. Check-out is the step immediately after the encounter, covering referrals, follow-up scheduling, and collection.",
       "Payment posting happens after the payer adjudicates the claim, which is several steps later.",
     ]},
  ],
},
"ehr-go-orientation": {
  "objectives": [
    "Navigate the EHR Go environment and locate a patient chart",
    "Identify the main areas of an EHR: chart, orders, results, documents, billing",
    "Explain what an audit trail records and why it matters",
    "Work in a simulated EHR with the habits a live system requires",
  ],
  "opening": {
    "heading": "Practising in a simulator, working like it is live",
    "blocks": [
      {"type": "scenario",
       "role": "You are opening EHR Go for the first time.",
       "text": "The chart in front of you belongs to a fictional patient, so nothing you do here can harm anyone. That is precisely why it is the right place to build the habits that will matter when the chart is real.",
       "task": "Learn the layout, and learn to work as though every action is logged — because in a live system it is."},
      {"type": "table",
       "caption": "What lives where in an EHR",
       "columns": ["Area", "Contains", "Who mostly works here"],
       "rows": [
         ["Patient chart / face sheet", "Demographics, insurance, allergies, problem list", "Everyone"],
         ["Encounters", "Notes from each visit", "Providers, clinical staff"],
         ["Orders (CPOE)", "Medication, lab, imaging, and referral orders", "Providers"],
         ["Results", "Lab and imaging results, often with flags", "Clinical staff"],
         ["Documents", "Scanned records, consents, correspondence", "HIM, front office"],
         ["Billing / charges", "Codes, claims, payments", "Coders and billers"],
         ["Administrative", "Scheduling, registration, reporting", "Front office"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Every EHR keeps an audit trail: who opened a record, when, from where, and what they viewed or changed. It cannot be switched off and it is reviewed. This is how organizations detect staff looking up a neighbour, a coworker, or a public figure — which is one of the most common causes of termination in healthcare. Open only the records your work requires, every time, including in the simulator."},
      {"type": "tip",
       "text": "Get into the habit now of logging out rather than just walking away, and of never working under someone else's login. In a live system, everything done under your credentials is attributed to you, including what someone else did while you were at lunch."},
    ],
  },
},
}

M2 = {
"revenue-cycle-and-preauthorization": {
  "objectives": [
    "Describe the three phases of the revenue cycle",
    "Explain what prior authorization is and when it is required",
    "Distinguish eligibility, authorization, and medical necessity",
    "Describe what happens when authorization is missed",
  ],
  "opening": {
    "heading": "Approval before the service, not after",
    "blocks": [
      {"type": "scenario",
       "role": "You work patient access at a clinic.",
       "text": "A patient is scheduled for an imaging study. Their plan requires approval in advance. Nobody requests it. The study is performed, the claim is submitted, and the payer denies it — correctly, because the terms of the plan were not met. The practice has performed a real service and has no way to be paid for it.",
       "task": "Learn what must be obtained before a service, and what happens when it is not."},
      {"type": "paragraph",
       "text": "Prior authorization is a payer's advance approval for a specific service, for a specific patient, usually within a specific window. It exists because payers want to review certain expensive or elective services before committing to pay for them. Whether you agree with the practice or not, it is a contractual term, and a service delivered without it is generally not payable."},
      {"type": "table",
       "caption": "Three checks that are frequently confused",
       "columns": ["Check", "Answers", "When"],
       "rows": [
         ["Eligibility", "Is this patient's coverage active, and are we in network?", "At scheduling and again at check-in"],
         ["Prior authorization", "Has the payer approved this specific service in advance?", "Before the service is delivered"],
         ["Medical necessity", "Does the documentation support that this service was appropriate?", "Judged when the claim is adjudicated"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "These three are independent. A service can be eligible, authorized, and still denied for medical necessity if the documentation does not support it. Confirming one tells you nothing about the other two, and a verification response saying coverage is active is explicitly not a guarantee of payment — payers state this in the response itself."},
      {"type": "paragraph",
       "text": "When authorization is missed, the options are limited. Some payers permit a retroactive request within a short window, usually with a clinical justification. Otherwise the claim is appealed, written off, or — where the payer contract permits and the patient was properly notified in advance — billed to the patient. Preventing it is far cheaper than any of these."},
    ],
  },
  "checks": [
    {"explanation": "Prior authorization is the payer's advance approval for a specific service. Without it, a service that would otherwise have been covered is generally not payable, because the plan's terms were not met.",
     "rationales": [
       "Authorization has no bearing on scheduling speed — if anything it adds lead time, which is why it must be started early.",
       "Correct. It obtains the payer's approval before the service is delivered.",
       "Identity verification happens at check-in and is a separate control.",
       "Diagnosis coding happens after the encounter, from the documentation. Authorization happens before it.",
     ]},
  ],
},
"medical-coding-icd-part-1": {
  "objectives": [
    "Explain what ICD-10-CM is and what it is used for",
    "Distinguish ICD-10-CM from ICD-10-PCS",
    "Describe the structure of a diagnosis code",
    "Explain why specificity affects payment",
  ],
  "opening": {
    "heading": "Codes for why the patient was seen",
    "blocks": [
      {"type": "scenario",
       "role": "You are learning diagnosis coding.",
       "text": "A provider documents that a patient has osteoarthritis of the left knee. That sentence has to become a code, because a claim is not a narrative — it is a structured set of codes that a payer's system can process without a human reading it.",
       "task": "Learn what the diagnosis code set is, how it is built, and why the level of detail matters."},
      {"type": "paragraph",
       "text": "ICD stands for International Classification of Diseases. The World Health Organization maintains the base classification; the United States uses a clinical modification of the tenth revision, ICD-10-CM, for diagnosis coding in every setting. It is maintained jointly by the CDC's National Center for Health Statistics and CMS, and it is updated annually with changes effective 1 October."},
      {"type": "table",
       "caption": "Code sets that are easy to confuse",
       "columns": ["Code set", "Describes", "Used in"],
       "rows": [
         ["ICD-10-CM", "Diagnoses — why care was needed", "All settings, inpatient and outpatient"],
         ["ICD-10-PCS", "Procedures", "Inpatient hospital only"],
         ["CPT (HCPCS Level I)", "Procedures and services", "Outpatient and professional services"],
         ["HCPCS Level II", "Supplies, equipment, drugs, transport", "All settings"],
       ]},
      {"type": "paragraph",
       "text": "An ICD-10-CM code is three to seven characters. The first character is a letter, the second is a number, and the rest may be either. A decimal point follows the third character. Characters beyond the third add specificity — the anatomic site, the severity, the laterality, and for injuries, the encounter type."},
      {"type": "callout", "variant": "warning",
       "text": "Coding to the highest level of specificity available is required, not optional. A three-character code is only billable when the code set provides no further subdivision for it — and most three-character entries are category headers. Submitting one where subdivisions exist produces an invalid-code rejection. Unspecified codes are valid where the documentation genuinely does not support more detail, but a pattern of them attracts payer attention and often pays less."},
    ],
  },
  "checks": [
    {"explanation": "ICD-10-CM is the clinical modification used in the United States for diagnosis coding in all settings. ICD-10-PCS is a separate set used only for inpatient hospital procedures.",
     "rationales": [
       "ICD-9-CM was replaced for US reporting in October 2015.",
       "ICD-10-PCS codes procedures in the inpatient hospital setting, not diagnoses.",
       "Correct. ICD-10-CM is the US diagnosis code set, used in outpatient and inpatient settings alike.",
       "ICD-11 has been released by the WHO and adopted in some countries, but the United States has not transitioned to it for reporting.",
     ]},
  ],
},
"patient-registration-insurance-review-lab": {
  "objectives": [
    "Register a patient accurately in the EHR",
    "Capture and verify insurance information",
    "Recognize the registration errors that cause downstream denials",
    "Document consent and financial responsibility",
  ],
  "opening": {
    "heading": "Ninety seconds that decide whether the claim pays",
    "blocks": [
      {"type": "scenario",
       "role": "You are working registration in EHR Go.",
       "text": "Registration feels like data entry. It is actually the single highest-leverage step in the revenue cycle: a transposed digit in a member number produces a rejection weeks later, and by then the visit is a memory and the correction takes ten times longer than getting it right would have.",
       "task": "Register accurately, and verify rather than assume."},
      {"type": "table",
       "caption": "What to capture, and the error each field prevents",
       "columns": ["Field", "Verify by", "Prevents"],
       "rows": [
         ["Legal name and date of birth", "Photo ID", "Claim rejected as subscriber not found"],
         ["Insurance carrier and plan", "The card itself, both sides", "Claim routed to the wrong payer"],
         ["Member and group number", "Reading from the card, not from memory", "Invalid subscriber rejection"],
         ["Subscriber relationship", "Asking, when the patient is not the subscriber", "Dependent claims filed as self"],
         ["Eligibility", "Electronic verification", "Coverage-terminated denial"],
         ["Authorization requirements", "The payer's rules for the visit type", "No-authorization denial"],
         ["Consent and financial responsibility", "Signature captured in the record", "Disputes about what the patient agreed to"],
       ]},
      {"type": "tip",
       "text": "Photograph or scan both sides of the insurance card into the record. The back carries the payer's claims address and provider phone number, and it is the side people forget. Verify eligibility electronically even when the card looks current — a card in a wallet says nothing about whether the policy is still active today."},
    ],
  },
},
}

apply("lib/content/ehr/intro-to-ehr/module1Lessons.ts", M1)
apply("lib/content/ehr/intro-to-ehr/module2Lessons.ts", M2)
