import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M7 = {
"workflow-and-revenue-cycle-review": {
  "objectives": [
    "Place any revenue cycle activity in its correct phase",
    "Trace a denial back to the phase that caused it",
    "Connect CPOE to the documentation that supports a claim",
  ],
  "opening": {
    "heading": "Three phases, one cycle",
    "blocks": [
      {"type": "table",
       "caption": "The revenue cycle by phase",
       "columns": ["Phase", "Also called", "Covers", "Typical failure"],
       "rows": [
         ["Front end", "Patient access", "Scheduling, registration, eligibility, authorization, point-of-service collection", "Coverage not verified; authorization missed"],
         ["Middle", "Health information management", "Clinical documentation, coding, charge capture", "A service delivered but never charged; documentation that does not support the code"],
         ["Back end", "Patient financial services", "Claim submission, payment posting, denials, appeals, collections", "Claims not worked before the filing deadline"],
       ]},
      {"type": "callout", "variant": "info",
       "text": "Denials surface at the back end and usually originate at the front. When you group a month's denials by the phase that caused them rather than by the department that received them, the picture changes completely — and so does what you would fix."},
    ],
  },
  "checks": [
    {"explanation": "Claim submission belongs to the back end, also called patient financial services, along with payment posting, denials, appeals, and collections.",
     "rationales": [
       "Front end is patient access — scheduling, registration, eligibility, and authorization, all before the encounter.",
       "Mid-cycle is health information management — documentation, coding, and charge capture.",
       "Correct. Claim submission is a back-end, patient financial services function.",
       "Clinical decision support is an EHR feature supporting order entry, not a revenue cycle phase.",
     ]},
  ],
},
"ehr-databases-patient-tracking": {
  "objectives": [
    "Explain how an EHR stores and relates patient data",
    "Run and interpret common tracking and financial reports",
    "Define the core revenue cycle metrics and say what each reveals",
    "Use a report to find a problem rather than to describe one",
  ],
  "opening": {
    "heading": "The reports that tell you what is actually happening",
    "blocks": [
      {"type": "scenario",
       "role": "You are asked why collections are down.",
       "text": "The practice manager has a feeling that something changed two months ago. A feeling is not actionable. Four reports, run in ten minutes, will either confirm it and say where, or show that nothing changed.",
       "task": "Learn which numbers answer which question."},
      {"type": "paragraph",
       "text": "An EHR is a relational database underneath the clinical interface. Patients, encounters, orders, results, and charges are separate tables linked by keys — which is why one patient can have many encounters without their address being stored many times, and why changing a demographic in one place changes it everywhere."},
      {"type": "table",
       "caption": "Core revenue cycle metrics",
       "columns": ["Metric", "Measures", "Commonly targeted at"],
       "rows": [
         ["Days in A/R", "Average days from date of service to payment", "Under 40 days for a physician practice"],
         ["A/R over 90 days", "Share of receivables aged past 90 days", "Under 15-20%"],
         ["Clean claim rate", "Share accepted on first submission with no edits", "95% or better"],
         ["Denial rate", "Share of claims denied", "Under 5-10%"],
         ["Net collection rate", "Share of collectible revenue actually collected", "95% or better"],
       ]},
      {"type": "callout", "variant": "info",
       "text": "These benchmarks vary by specialty, payer mix, and who published them, so treat them as orientation rather than as standards. What matters more than any single figure is the trend: a denial rate moving from 6% to 11% over two quarters is worth investigating regardless of what the industry average happens to be."},
      {"type": "callout", "variant": "warning",
       "text": "Reports carry PHI. A patient tracking report or an aging report lists names attached to visits and balances. Print them only when necessary, keep them face-down, shred rather than bin them, and never leave one on a shared printer. A report is a chart extract, and it is treated as one."},
    ],
  },
  "checks": [
    {"explanation": "Days in A/R measures the average time from date of service to payment received. It is the clearest single indicator of how quickly a practice converts work into cash, and a rising figure usually means claims are not being worked.",
     "rationales": [
       "Appointment wait time is a scheduling and access measure, not a financial one.",
       "Correct. Days in accounts receivable measures how long payment takes after the claim is submitted.",
       "Provider scheduling is unrelated to accounts receivable.",
       "The appeal window is set by the payer contract and is a different concept entirely.",
     ]},
  ],
},
"patient-tracking-financial-management-lab": {
  "objectives": [
    "Run patient tracking and financial reports in EHR Go",
    "Interpret an aging report and identify what to work first",
    "Handle reports containing PHI appropriately",
  ],
  "opening": {
    "heading": "Reading a report to find the problem",
    "blocks": [
      {"type": "worked-example",
       "title": "Working an aging report",
       "task": "Total A/R is $412,000, of which $94,000 is over 90 days. Decide what to do first.",
       "steps": [
         {"move": "Calculate the share over 90 days: 94,000 of 412,000 is about 23%.",
          "why": "Against a 15-20% target this is high, so the aged bucket is where the problem is rather than the overall balance."},
         {"move": "Sort the aged bucket by days remaining until each payer's filing or appeal deadline.",
          "why": "Deadlines are absolute. A claim past its filing limit is worth nothing regardless of value, so anything close to a deadline is worked first."},
         {"move": "Within that, sort by dollar value.",
          "why": "Staff time is the constraint. Ten minutes recovering $2,400 beats ten minutes recovering $40 — and the small balances are usually a prevention problem rather than a collection one."},
         {"move": "Group the rest by denial reason and look for a pattern.",
          "why": "Twenty-nine authorization denials are one process problem repeated, not twenty-nine problems. Fixing the front-end process stops the thirtieth, which is worth more than recovering any single claim."},
       ],
       "result": "Deadline-critical high-value claims worked first, and a specific process recommendation to take to the manager.",
       "takeaway": "Deadline, then value, then pattern. Reporting the pattern is what changes next month's numbers."},
    ],
  },
},
}

M8 = {
"legal-aspects-and-clinical-data-analysis": {
  "objectives": [
    "Describe the 21st Century Cures Act information blocking provisions",
    "Explain what interoperability requires in practice",
    "Describe how de-identified clinical data is used",
    "Explain a patient's right of access to their record",
  ],
  "opening": {
    "heading": "The record belongs to the patient",
    "blocks": [
      {"type": "scenario",
       "role": "A patient requests a copy of their record and is told it will take several weeks.",
       "text": "Under HIPAA a patient has a right of access to their own record, and under the 21st Century Cures Act, delaying or obstructing that access can constitute information blocking. What sounds like an administrative backlog can be a regulatory problem.",
       "task": "Understand what patients are entitled to and what the practice is obliged to provide."},
      {"type": "key-terms",
       "terms": [
         {"term": "21st Century Cures Act",
          "definition": "2016 legislation whose information blocking provisions prohibit practices that unreasonably interfere with the access, exchange, or use of electronic health information."},
         {"term": "Information blocking",
          "definition": "Interfering with the access, exchange, or use of EHI. Certain exceptions apply, such as preventing harm or protecting privacy."},
         {"term": "Right of access",
          "definition": "A patient's HIPAA right to inspect and obtain a copy of their own record, generally within 30 days, in the form and format they request where readily producible."},
         {"term": "Interoperability",
          "definition": "The ability of systems to exchange information and use what they receive. HL7 and FHIR are the common standards."},
         {"term": "De-identified data",
          "definition": "Data with identifiers removed under HIPAA's specified methods, which may then be used for research and analysis without patient authorization."},
       ]},
      {"type": "callout", "variant": "info",
       "text": "Aggregated clinical data drives quality reporting, population health, and public health surveillance. This is genuinely valuable and it is also where privacy risk concentrates, because re-identification becomes possible when enough supposedly de-identified fields are combined. De-identification under HIPAA has specified methods for exactly this reason — removing the name is not sufficient."},
    ],
  },
  "checks": [
    {"explanation": "The 21st Century Cures Act contains the information blocking provisions, which prohibit unreasonably interfering with the access, exchange, or use of electronic health information. Defined exceptions exist, including preventing harm and protecting privacy.",
     "rationales": [
       "The HIPAA Privacy Rule establishes a patient's right of access, but the information blocking prohibition comes from the Cures Act.",
       "HITECH promoted EHR adoption and strengthened HIPAA enforcement and breach notification. Information blocking is not its provision.",
       "Correct. The 21st Century Cures Act carries the information blocking provisions.",
       "The Affordable Care Act concerns coverage and payment reform, not information exchange.",
     ]},
  ],
},
"regulatory-compliance-and-revenue-cycle": {
  "objectives": [
    "Distinguish an error from abuse from fraud",
    "Describe the major laws governing healthcare claims",
    "Recognize the billing patterns that draw scrutiny",
    "Respond appropriately when asked to submit something unsupportable",
  ],
  "opening": {
    "heading": "Where a mistake becomes something else",
    "blocks": [
      {"type": "scenario",
       "role": "You are asked to change a code on a claim.",
       "text": "A provider asks you to submit a higher-level code on a note that does not support it, because the practice is behind on revenue. Complying would make you a participant in submitting a false claim, and 'I was told to' has never been a defence.",
       "task": "Know where the line is, and know the process for what to do when someone asks you to cross it."},
      {"type": "table",
       "caption": "Error, abuse, and fraud",
       "columns": ["", "Means", "Turns on"],
       "rows": [
         ["Error", "An unintentional mistake, corrected when found", "No intent"],
         ["Abuse", "Practices inconsistent with sound billing that cause unnecessary cost", "Pattern, without proven intent to deceive"],
         ["Fraud", "Knowing misrepresentation to obtain payment not entitled to", "Knowledge and intent"],
       ]},
      {"type": "table",
       "caption": "The laws that apply",
       "columns": ["Law", "Prohibits"],
       "rows": [
         ["False Claims Act", "Knowingly submitting false claims to the government. Includes whistleblower provisions"],
         ["Anti-Kickback Statute", "Paying or receiving anything of value for referrals of federally funded services"],
         ["Stark Law", "Certain physician referrals to entities they have a financial relationship with. Strict liability — intent is not required"],
         ["HIPAA", "Improper use and disclosure of PHI"],
         ["Exclusion authority", "Excluded individuals participating in federal healthcare programs"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Undercoding is not the safe alternative to upcoding. It misrepresents the encounter just as surely, it costs the practice revenue it legitimately earned, and a consistent pattern of any single code level attracts attention regardless of which level it is. The goal is never the highest or the lowest code — it is the code the documentation supports."},
      {"type": "worked-example",
       "title": "When you are asked to code above the documentation",
       "task": "A provider asks for a higher-level code than the note supports.",
       "steps": [
         {"move": "Treat it as a documentation question first.",
          "why": "Providers are often genuinely unaware of what a level requires, and the work may well have happened without being written down. 'The note does not currently support that level — was there more?' opens the legitimate route instead of starting a confrontation."},
         {"move": "Offer the proper mechanism: amend the documentation.",
          "why": "If the work occurred, the provider may amend the note through the record's amendment process, dated and attributed. A properly amended note makes the higher code correct. This is the real solution and it is available."},
         {"move": "If the work did not occur, decline clearly and without hostility.",
          "why": "'I can't code above what the documentation supports' is a complete answer. You are stating the rule you work by, not making an accusation. Most requests end here."},
         {"move": "If pressed, escalate through compliance rather than deciding alone.",
          "why": "A repeated request is a compliance issue rather than an interpersonal one. Using the escalation route protects the practice, the provider, and you, and it creates a record that you raised it."},
         {"move": "Document what was asked and what you did.",
          "why": "In any later investigation, who knew what becomes central. A dated contemporaneous note is worth far more than recollection."},
       ],
       "result": "Either an amended note that supports the code, or the original code standing — with the exchange documented.",
       "takeaway": "Documentation question first, legitimate route offered, clear decline, escalation rather than solo judgment, and write it down."},
    ],
  },
  "checks": [
    {"explanation": "Upcoding is reporting a higher-level or more expensive code than the documentation supports, in order to receive greater reimbursement. Where it is done knowingly it is fraud under the False Claims Act.",
     "rationales": [
       "Correct. Upcoding reports a level the documentation does not support.",
       "That describes coordination of benefits — billing a secondary payer after the primary pays, which is normal and proper.",
       "Reporting multiple CPT codes can be correct when several distinct procedures were performed. Improperly splitting one service into components is unbundling, a related but different offence.",
       "Updating insurance information after a denial is ordinary corrective work.",
     ]},
  ],
},
"integrated-case-practice-lab": {
  "objectives": [
    "Work a complete case from registration through payment",
    "Apply coding, privacy, and compliance judgment together",
  ],
  "opening": {
    "heading": "Everything at once",
    "blocks": [
      {"type": "scenario",
       "role": "You are working the integrated case in EHR Go.",
       "text": "This case does not announce which skill each step needs. That is the point — real work does not arrive labelled by module.",
       "task": "Work the case end to end and notice which decisions you hesitated on."},
      {"type": "tip",
       "text": "At each step, ask the three questions that run through this whole course: is this accurate, is this the minimum necessary, and does the documentation support what I am about to submit?"},
    ],
  },
},
}

M9 = {
"final-exam": {
  "objectives": ["Demonstrate command of the full course"],
  "opening": {
    "heading": "Before you start",
    "blocks": [
      {"type": "callout", "variant": "info",
       "text": "The final is administered through Brightspace. Coding questions frequently turn on a single qualifier — outpatient, same day, documented, established. Read the scenario and decide what the documentation supports before looking at the options."},
    ],
  },
},
"nha-cehrs-exam-prep": {
  "objectives": [
    "Describe the CEHRS exam format and eligibility",
    "Map the exam's domains to what this course covered",
    "Build a study plan based on retrieval rather than rereading",
  ],
  "opening": {
    "heading": "What the CEHRS actually tests",
    "blocks": [
      {"type": "scenario",
       "role": "You are considering certification.",
       "text": "The Certified Electronic Health Records Specialist credential is awarded by the National Healthcareer Association. It is not required to work in the field, and it is widely recognized by employers — which makes it worth doing if you intend to work in health information.",
       "task": "Understand the exam's shape so preparation is targeted rather than general."},
      {"type": "table",
       "caption": "The exam",
       "columns": ["Item", "Detail"],
       "rows": [
         ["Awarded by", "National Healthcareer Association (NHA)"],
         ["Format", "Scored multiple-choice questions plus unscored pretest items"],
         ["Scaled score", "Reported on a scale to 500"],
         ["Eligibility", "Completion of a training program or relevant work experience"],
         ["Renewal", "Continuing education on a recurring cycle"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Exam format, question count, time limit, passing score, and eligibility are set by NHA and change from time to time. Verify every detail against NHA's current candidate handbook before you register — this page is orientation, not the authority."},
      {"type": "table",
       "caption": "Exam domains against this course",
       "columns": ["Domain area", "Covered in"],
       "rows": [
         ["Non-clinical operations — scheduling, registration, workflow", "Modules 1, 2, 7"],
         ["Clinical operations — charting, orders, results", "Modules 5, 6"],
         ["Revenue cycle and financial — coding, claims, payment", "Modules 2, 3, 4, 7, 8"],
         ["Regulatory compliance — HIPAA, Cures Act, fraud and abuse", "Modules 6, 8"],
         ["Reporting — data extraction and quality measures", "Modules 7, 8"],
       ]},
      {"type": "tip",
       "text": "Prepare by retrieval, not rereading. For each domain above, close the material and explain it out loud. Where you hesitate is your study list; where you answer instantly needs no more work, however reassuring rereading feels."},
    ],
  },
  "checks": [
    {"explanation": "NHA reports the CEHRS on a scaled score to 500, with 390 as the passing standard. Verify the current figure in NHA's candidate handbook before you register, since exam parameters are periodically revised.",
     "rationales": [
       "The exam is not scored out of 100. NHA uses a scaled score.",
       "Correct — 390 on a 500-point scale, per NHA's published standard. Confirm against the current candidate handbook.",
       "This resembles a raw question count rather than the reported score.",
       "450 is above the passing standard on this scale.",
     ]},
  ],
},
"final-hands-on-review-lab": {
  "objectives": [
    "Demonstrate the full EHR workflow unassisted",
    "Identify any remaining gaps before the course ends",
  ],
  "opening": {
    "heading": "The whole workflow, one more time",
    "blocks": [
      {"type": "scenario",
       "role": "You are completing the final lab in EHR Go.",
       "text": "Register, verify, document, order, code, submit, post. If you can do all seven without stopping to look anything up, you can do the job.",
       "task": "Run it clean, and note anything that still needs a reference."},
      {"type": "tip",
       "text": "Keep whatever reference sheet you built during this course. Working coders and billers use references constantly — the skill is not memorizing code sets, it is knowing where to look and what to check."},
    ],
  },
},
}

apply("lib/content/ehr/intro-to-ehr/module7Lessons.ts", M7)
apply("lib/content/ehr/intro-to-ehr/module8Lessons.ts", M8)
apply("lib/content/ehr/intro-to-ehr/module9Lessons.ts", M9)
