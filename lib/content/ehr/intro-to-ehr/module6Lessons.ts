import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "cpoe-part-2",
    title: "Computerized Provider Order Entry (CPOE) Part 2",
    description:
      "Continue CPOE study with advanced order sets, clinical decision support, and how CPOE integrates with EHR workflows.",
    objectives: [
      "Explain what clinical decision support does and where it fails",
      "Describe alert fatigue and why it is a safety problem",
      "Handle verbal and telephone orders correctly",
      "Track an order through to its result",
    ],
    duration: "20 min",
    sections: [
      {
        heading: "The alert that stopped working",
        blocks: [
          {
            type: "scenario",
            role: "You support a clinic using an EHR with extensive alerting.",
            text: "The system fires an alert on almost every order — an interaction, a duplicate, a formulary note. Providers dismiss them in under a second, because dismissing is the only way to get through a clinic list. Then a genuinely dangerous interaction alert fires, and it is dismissed exactly like the other forty.",
            task: "Understand why too much safety tooling produces less safety.",
          },
          {
            type: "paragraph",
            text: "Clinical decision support is genuinely valuable: it catches allergy conflicts, drug interactions, duplicate orders, and dosing outside expected ranges. But every alert spends a small amount of the user's attention, and attention is finite. When the great majority of alerts are irrelevant, users learn — correctly, in a statistical sense — that dismissing is usually right.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Alert fatigue is a documented patient safety problem, not a complaint about software. The countermeasure is tuning rather than adding: reducing low-value alerts so the remaining ones carry signal. If you are ever in a position to report that a specific alert fires constantly and is never actionable, that report is genuinely useful — it is the raw material for tuning.",
          },
          {
            type: "table",
            caption: "Verbal and telephone orders",
            columns: [
              "Requirement",
              "Why",
            ],
            rows: [
              [
                "Read the order back to the provider",
                "Confirms what you heard matches what they said, before anything is acted on",
              ],
              [
                "Record it immediately",
                "Memory is not a record, and the order takes effect now",
              ],
              [
                "Note who gave it, and when",
                "Attribution is what makes the order valid",
              ],
              [
                "Obtain the provider's countersignature within the required window",
                "Organizational policy sets the window; the order is not complete without it",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "An order placed is not a result received. Orders need tracking to completion, and the gap between the two is where results go missing — a specimen never collected, a study never scheduled, a referral never booked. Many EHRs have a pending-orders view for exactly this, and working it is often support staff's responsibility.",
          },
        ],
      },
      {
        heading: "Order Sets & Clinical Decision Support",
        blocks: [
          {
            type: "paragraph",
            text: "Most EHR systems include pre-built order sets — groups of orders commonly used together for specific diagnoses or procedures. Clinical Decision Support (CDS) alerts notify providers of potential drug interactions, allergies, or guideline deviations.",
          },
          {
            type: "list",
            items: [
              "Order sets speed up order entry and reduce omissions",
              "CDS alerts promote evidence-based prescribing",
              "Alert fatigue is a known challenge — too many alerts get ignored",
            ],
          },
        ],
      },
      {
        heading: "CPOE Workflow Integration",
        blocks: [
          {
            type: "paragraph",
            text: "When a provider enters an order through CPOE, it is immediately transmitted to the appropriate department — pharmacy, radiology, lab — without requiring paper transport. This reduces delays and transcription errors.",
          },
          {
            type: "callout",
            variant: "success",
            text: "Studies show CPOE reduces serious medication errors by more than 50% compared to handwritten orders.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is a known downside of Clinical Decision Support alerts?",
        options: [
          "They slow down CPOE order entry by requiring fax confirmation",
          "Alert fatigue — providers begin ignoring alerts when there are too many",
          "They are only available in inpatient hospital EHR systems",
          "CDS alerts cannot detect drug allergies",
        ],
        correctIndex: 1,
        explanation: "Alert fatigue occurs when a system fires so many low-value alerts that users begin dismissing them reflexively — including the ones that matter. It is a recognized patient safety problem, and the countermeasure is tuning the alerts down rather than adding more.",
        optionRationales: [
          "CDS alerts appear on screen within the EHR. No fax is involved.",
          "Correct. Too many alerts train users to dismiss them, which defeats the purpose of the ones that matter.",
          "CDS is used across inpatient and outpatient EHRs alike.",
          "Allergy checking is one of the things CDS does most reliably.",
        ],
      },
    ],
  },
  {
    slug: "legal-aspects-and-compliance",
    title: "Legal Aspects of EHR & Regulatory Compliance",
    description:
      "Understand HIPAA, patient privacy rights, legal obligations in EHR environments, and consequences of non-compliance.",
    objectives: [
      "Distinguish the main HIPAA rules and what each governs",
      "Apply the minimum necessary standard",
      "Explain what a business associate agreement is and when one is required",
      "Recognize a breach and describe the reporting obligation",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "The rules that govern everything you touch",
        blocks: [
          {
            type: "scenario",
            role: "You work with patient records daily.",
            text: "Almost everything you handle is protected health information: a name attached to a date of service, a diagnosis code, an insurance number. The rules governing it are not a compliance module you complete once — they describe how the job is done.",
            task: "Learn which rule governs what, so you know which question you are asking.",
          },
          {
            type: "table",
            caption: "The HIPAA rules",
            columns: [
              "Rule",
              "Governs",
              "Applies to",
            ],
            rows: [
              [
                "Privacy Rule",
                "Use and disclosure of PHI; patients' rights to access and amend",
                "PHI in any form — paper, electronic, spoken",
              ],
              [
                "Security Rule",
                "Administrative, physical, and technical safeguards",
                "ePHI specifically",
              ],
              [
                "Breach Notification Rule",
                "What must be reported, to whom, and how quickly",
                "Breaches of unsecured PHI",
              ],
              [
                "Enforcement Rule",
                "Investigations, penalties, and procedures",
                "Covered entities and business associates",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "The distinction that matters most in practice: the Privacy Rule covers PHI in every form, while the Security Rule is specifically about ePHI and its three safeguard categories. Administrative safeguards are policies, training, and access management. Physical safeguards are facility access, workstation placement, and device control. Technical safeguards are access controls, audit controls, encryption, and transmission security.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Covered entity",
                definition: "A health plan, healthcare clearinghouse, or provider that transmits health information electronically.",
              },
              {
                term: "Business associate",
                definition: "A vendor performing work involving PHI on a covered entity's behalf — a billing service, a cloud host, a shredding company.",
              },
              {
                term: "Business associate agreement (BAA)",
                definition: "The contract required before a business associate may handle PHI. Without one, the disclosure to that vendor is itself impermissible.",
              },
              {
                term: "Minimum necessary",
                definition: "Disclose only what the purpose requires. It does not apply to treatment disclosures between providers.",
              },
              {
                term: "HITECH Act",
                definition: "2009 legislation that promoted EHR adoption, strengthened HIPAA enforcement, and introduced breach notification requirements.",
              },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Accessing a record you have no work reason to see is a violation even if you tell nobody and change nothing. Access is logged and audited routinely. Looking up a coworker, a neighbor, a family member, or a public figure is among the most common causes of termination in healthcare, and concern for the person is not an exception in the rule.",
          },
        ],
      },
      {
        heading: "HIPAA and Protected Health Information",
        blocks: [
          {
            type: "paragraph",
            text: "HIPAA (Health Insurance Portability and Accountability Act) sets national standards for protecting sensitive patient health information. The Privacy Rule and Security Rule are the two most relevant components for EHR users.",
          },
          {
            type: "list",
            items: [
              "Privacy Rule: Controls who can access and use PHI (Protected Health Information)",
              "Security Rule: Sets standards for protecting electronic PHI (ePHI)",
              "Breach Notification Rule: Requires notification of affected patients if PHI is breached",
            ],
          },
        ],
      },
      {
        heading: "Penalties for Non-Compliance",
        blocks: [
          {
            type: "list",
            items: [
              "Civil penalties: $100–$50,000 per violation",
              "Criminal penalties: Up to 10 years imprisonment for intentional misuse",
              "Reputational damage to the healthcare organization",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Accessing a patient record without a legitimate reason — even for curiosity — is a HIPAA violation. Always access only the records needed for your assigned duties.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which HIPAA rule sets standards for protecting electronic Protected Health Information (ePHI)?",
        options: [
          "The Privacy Rule",
          "The Security Rule",
          "The Breach Notification Rule",
          "The Enforcement Rule",
        ],
        correctIndex: 1,
        explanation: "The Security Rule sets the standards for protecting electronic PHI, through administrative, physical, and technical safeguards. The Privacy Rule governs use and disclosure of PHI in every form, not electronic form specifically.",
        optionRationales: [
          "The Privacy Rule governs how PHI may be used and disclosed, in any form — paper, electronic, or spoken.",
          "Correct. The Security Rule is specifically about ePHI and its three safeguard categories.",
          "The Breach Notification Rule governs what must be reported after a breach, not the safeguards that prevent one.",
          "The Enforcement Rule covers investigations and penalties.",
        ],
      },
    ],
  },
  {
    slug: "compliance-scenarios-lab",
    title: "EHR Go Lab: Documentation Accuracy, Privacy & Compliance Scenarios",
    description:
      "Work through privacy and compliance scenarios in EHR Go, focusing on accurate clinical documentation and HIPAA-compliant behavior.",
    objectives: [
      "Judge whether a disclosure meets the minimum necessary standard",
      "Identify documentation that would not withstand review",
      "Recognize a reportable breach",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "The situations that actually arise",
        blocks: [
          {
            type: "scenario",
            role: "You are working the compliance scenarios in EHR Go.",
            text: "Real privacy failures are rarely dramatic. They are a screen left open, a conversation in a corridor, a full chart sent when three pages were requested, and a colleague asking about someone you both know.",
            task: "Practice the judgment on cases where nothing is at stake yet.",
          },
          {
            type: "table",
            caption: "Minimum necessary in practice",
            columns: [
              "Situation",
              "Appropriate",
              "Too much",
            ],
            rows: [
              [
                "Payer requests records for one date of service",
                "Records for that date and those services",
                "The complete chart because it is quicker",
              ],
              [
                "Colleague on the care team needs to prepare",
                "What they need to do their part",
                "Details unrelated to their role",
              ],
              [
                "Family member calls about an adult patient",
                "Nothing without authorization",
                "Confirming the patient was even seen",
              ],
              [
                "Submitting a claim",
                "The codes and identifiers the claim requires",
                "Clinical notes attached by default",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Report a suspected breach immediately through your organization's process. The Breach Notification Rule carries deadlines, and the clock starts when the breach is discovered — not when someone decides it was serious. Delay makes every outcome worse, and no one has ever been disciplined for reporting something that turned out to be nothing.",
          },
        ],
      },
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Mr. Davis guides this lab through EHR Go scenarios that test documentation accuracy, appropriate record access, and privacy-compliant workflows.",
          },
          {
            type: "list",
            items: [
              "Identify documentation errors in a sample patient record",
              "Apply HIPAA minimum necessary standard in a simulated scenario",
              "Complete an EHR Go compliance-focused activity",
              "Discuss real-world consequences of documentation failures",
            ],
          },
        ],
      },
    ],
  },
];
