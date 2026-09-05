import { Lesson } from "@/types/lesson";

export const module8Lessons: Lesson[] = [
  {
    slug: "legal-aspects-and-clinical-data-analysis",
    title: "Legal Aspects of EHR & Clinical Data Analysis",
    description:
      "Explore the legal framework governing EHR use and how clinical data is analyzed to support quality improvement and compliance.",
    objectives: [
      "Describe the 21st Century Cures Act information blocking provisions",
      "Explain what interoperability requires in practice",
      "Describe how de-identified clinical data is used",
      "Explain a patient's right of access to their record",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "The record belongs to the patient",
        blocks: [
          {
            type: "scenario",
            role: "A patient requests a copy of their record and is told it will take several weeks.",
            text: "Under HIPAA a patient has a right of access to their own record, and under the 21st Century Cures Act, delaying or obstructing that access can constitute information blocking. What sounds like an administrative backlog can be a regulatory problem.",
            task: "Understand what patients are entitled to and what the practice is obliged to provide.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "21st Century Cures Act",
                definition: "2016 legislation whose information blocking provisions prohibit practices that unreasonably interfere with the access, exchange, or use of electronic health information.",
              },
              {
                term: "Information blocking",
                definition: "Interfering with the access, exchange, or use of EHI. Certain exceptions apply, such as preventing harm or protecting privacy.",
              },
              {
                term: "Right of access",
                definition: "A patient's HIPAA right to inspect and obtain a copy of their own record, generally within 30 days, in the form and format they request where readily producible.",
              },
              {
                term: "Interoperability",
                definition: "The ability of systems to exchange information and use what they receive. HL7 and FHIR are the common standards.",
              },
              {
                term: "De-identified data",
                definition: "Data with identifiers removed under HIPAA's specified methods, which may then be used for research and analysis without patient authorization.",
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Aggregated clinical data drives quality reporting, population health, and public health surveillance. This is genuinely valuable and it is also where privacy risk concentrates, because re-identification becomes possible when enough supposedly de-identified fields are combined. De-identification under HIPAA has specified methods for exactly this reason — removing the name is not sufficient.",
          },
        ],
      },
      {
        heading: "Legal Aspects of the EHR Environment",
        blocks: [
          {
            type: "paragraph",
            text: "Beyond HIPAA, the EHR environment is shaped by federal and state laws governing health information, data retention, release of information, and electronic signatures.",
          },
          {
            type: "list",
            items: [
              "HITECH Act: Expanded HIPAA enforcement and introduced Meaningful Use",
              "21st Century Cures Act: Prohibits information blocking and promotes interoperability",
              "State retention laws: Define how long records must be kept (typically 6–10 years)",
              "Electronic signatures: Legally valid when systems meet specific authentication standards",
            ],
          },
        ],
      },
      {
        heading: "Clinical Data Analysis",
        blocks: [
          {
            type: "paragraph",
            text: "Healthcare organizations use clinical data to identify trends, improve outcomes, and meet regulatory reporting requirements. EHR systems are the primary source for this data.",
          },
          {
            type: "list",
            items: [
              "Quality measure reporting (HEDIS, CMS Star Ratings)",
              "Population health management — identifying high-risk patients",
              "Clinical audit — reviewing records for documentation completeness",
              "Research and public health surveillance",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Administrative staff play a role in data quality. Accurate registration, coding, and documentation directly impact the validity of clinical data analysis.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which federal law prohibits healthcare organizations from blocking the flow of health information?",
        options: [
          "HIPAA Privacy Rule",
          "HITECH Act",
          "21st Century Cures Act",
          "Affordable Care Act",
        ],
        correctIndex: 2,
        explanation: "The 21st Century Cures Act contains the information blocking provisions, which prohibit unreasonably interfering with the access, exchange, or use of electronic health information. Defined exceptions exist, including preventing harm and protecting privacy.",
        optionRationales: [
          "The HIPAA Privacy Rule establishes a patient's right of access, but the information blocking prohibition comes from the Cures Act.",
          "HITECH promoted EHR adoption and strengthened HIPAA enforcement and breach notification. Information blocking is not its provision.",
          "Correct. The 21st Century Cures Act carries the information blocking provisions.",
          "The Affordable Care Act concerns coverage and payment reform, not information exchange.",
        ],
      },
    ],
  },
  {
    slug: "regulatory-compliance-and-revenue-cycle",
    title: "Healthcare Regulatory Compliance & the Revenue Cycle",
    description:
      "Connect regulatory compliance requirements to revenue cycle operations and understand the consequences of non-compliant billing.",
    objectives: [
      "Distinguish an error from abuse from fraud",
      "Describe the major laws governing healthcare claims",
      "Recognize the billing patterns that draw scrutiny",
      "Respond appropriately when asked to submit something unsupportable",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "Where a mistake becomes something else",
        blocks: [
          {
            type: "scenario",
            role: "You are asked to change a code on a claim.",
            text: "A provider asks you to submit a higher-level code on a note that does not support it, because the practice is behind on revenue. Complying would make you a participant in submitting a false claim, and 'I was told to' has never been a defense.",
            task: "Know where the line is, and know the process for what to do when someone asks you to cross it.",
          },
          {
            type: "table",
            caption: "Error, abuse, and fraud",
            columns: [
              "",
              "Means",
              "Turns on",
            ],
            rows: [
              [
                "Error",
                "An unintentional mistake, corrected when found",
                "No intent",
              ],
              [
                "Abuse",
                "Practices inconsistent with sound billing that cause unnecessary cost",
                "Pattern, without proven intent to deceive",
              ],
              [
                "Fraud",
                "Knowing misrepresentation to obtain payment not entitled to",
                "Knowledge and intent",
              ],
            ],
          },
          {
            type: "table",
            caption: "The laws that apply",
            columns: [
              "Law",
              "Prohibits",
            ],
            rows: [
              [
                "False Claims Act",
                "Knowingly submitting false claims to the government. Includes whistleblower provisions",
              ],
              [
                "Anti-Kickback Statute",
                "Paying or receiving anything of value for referrals of federally funded services",
              ],
              [
                "Stark Law",
                "Certain physician referrals to entities they have a financial relationship with. Strict liability — intent is not required",
              ],
              [
                "HIPAA",
                "Improper use and disclosure of PHI",
              ],
              [
                "Exclusion authority",
                "Excluded individuals participating in federal healthcare programs",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Undercoding is not the safe alternative to upcoding. It misrepresents the encounter just as surely, it costs the practice revenue it legitimately earned, and a consistent pattern of any single code level attracts attention regardless of which level it is. The goal is never the highest or the lowest code — it is the code the documentation supports.",
          },
          {
            type: "worked-example",
            title: "When you are asked to code above the documentation",
            task: "A provider asks for a higher-level code than the note supports.",
            steps: [
              {
                move: "Treat it as a documentation question first.",
                why: "Providers are often genuinely unaware of what a level requires, and the work may well have happened without being written down. 'The note does not currently support that level — was there more?' opens the legitimate route instead of starting a confrontation.",
              },
              {
                move: "Offer the proper mechanism: amend the documentation.",
                why: "If the work occurred, the provider may amend the note through the record's amendment process, dated and attributed. A properly amended note makes the higher code correct. This is the real solution and it is available.",
              },
              {
                move: "If the work did not occur, decline clearly and without hostility.",
                why: "'I can't code above what the documentation supports' is a complete answer. You are stating the rule you work by, not making an accusation. Most requests end here.",
              },
              {
                move: "If pressed, escalate through compliance rather than deciding alone.",
                why: "A repeated request is a compliance issue rather than an interpersonal one. Using the escalation route protects the practice, the provider, and you, and it creates a record that you raised it.",
              },
              {
                move: "Document what was asked and what you did.",
                why: "In any later investigation, who knew what becomes central. A dated contemporaneous note is worth far more than recollection.",
              },
            ],
            result: "Either an amended note that supports the code, or the original code standing — with the exchange documented.",
            takeaway: "Documentation question first, legitimate route offered, clear decline, escalation rather than solo judgment, and write it down.",
          },
        ],
      },
      {
        heading: "Compliance Programs in Healthcare",
        blocks: [
          {
            type: "paragraph",
            text: "Healthcare organizations are required to maintain formal compliance programs that prevent, detect, and correct violations of applicable laws and regulations.",
          },
          {
            type: "list",
            items: [
              "OIG (Office of Inspector General) compliance guidance",
              "False Claims Act — penalties for knowingly submitting fraudulent claims",
              "Anti-Kickback Statute — prohibits payment for referrals",
              "Stark Law — prohibits physician self-referral for designated health services",
            ],
          },
        ],
      },
      {
        heading: "Compliance and the Revenue Cycle",
        blocks: [
          {
            type: "paragraph",
            text: "Billing compliance means that every claim submitted accurately reflects the services documented in the patient record. Upcoding, unbundling, and billing for services not rendered are all forms of fraud.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "The False Claims Act allows the government to recover three times the amount of a fraudulent claim plus additional penalties per claim. Healthcare fraud is taken seriously.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is 'upcoding' in healthcare billing?",
        options: [
          "Using a higher-level code than what the documentation supports to receive more reimbursement",
          "Submitting a claim to a secondary insurer after the primary payer pays",
          "Entering multiple CPT codes for a single procedure",
          "Updating a patient's insurance information after a denial",
        ],
        correctIndex: 0,
        explanation: "Upcoding is reporting a higher-level or more expensive code than the documentation supports, in order to receive greater reimbursement. Where it is done knowingly it is fraud under the False Claims Act.",
        optionRationales: [
          "Correct. Upcoding reports a level the documentation does not support.",
          "That describes coordination of benefits — billing a secondary payer after the primary pays, which is normal and proper.",
          "Reporting multiple CPT codes can be correct when several distinct procedures were performed. Improperly splitting one service into components is unbundling, a related but different offence.",
          "Updating insurance information after a denial is ordinary corrective work.",
        ],
      },
    ],
  },
  {
    slug: "integrated-case-practice-lab",
    title: "EHR Go Lab: Integrated Case Practice",
    description:
      "Complete an integrated case in EHR Go covering revenue cycle, compliance, and documentation from registration through payment posting.",
    objectives: [
      "Work a complete case from registration through payment",
      "Apply coding, privacy, and compliance judgment together",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "Everything at once",
        blocks: [
          {
            type: "scenario",
            role: "You are working the integrated case in EHR Go.",
            text: "This case does not announce which skill each step needs. That is the point — real work does not arrive labelled by module.",
            task: "Work the case end to end and notice which decisions you hesitated on.",
          },
          {
            type: "tip",
            text: "At each step, ask the three questions that run through this whole course: is this accurate, is this the minimum necessary, and does the documentation support what I am about to submit?",
          },
        ],
      },
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "This is a capstone lab session. Mr. Davis will guide you through a full patient encounter from registration to payment posting using EHR Go.",
          },
          {
            type: "list",
            items: [
              "Register a new patient and verify insurance eligibility",
              "Document the clinical encounter and assign diagnosis and procedure codes",
              "Submit a simulated claim and track its status",
              "Post the payment and resolve a sample denial",
            ],
          },
        ],
      },
    ],
  },
];
