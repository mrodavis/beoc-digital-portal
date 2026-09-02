import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M5 = {
"midterm-exam": {
  "objectives": ["Demonstrate what you have learned in the first half of the course"],
  "opening": {
    "heading": "Before you start",
    "blocks": [
      {"type": "callout", "variant": "info",
       "text": "The midterm is administered through Brightspace. Read each question fully before answering — coding questions frequently turn on a single qualifier such as 'outpatient', 'same day', or 'documented'. Where a question gives you a scenario, decide what the documentation supports before you look at the options."},
    ],
  },
},
"patient-centered-care-and-cpoe-part-1": {
  "objectives": [
    "Describe the patient-centered medical home model",
    "Explain what a Federally Qualified Health Center is and who it serves",
    "Describe computerized provider order entry and the errors it prevents",
    "Explain how CPOE changes the work of clinical support staff",
  ],
  "opening": {
    "heading": "Two models and one system",
    "blocks": [
      {"type": "scenario",
       "role": "You are working in a community health center.",
       "text": "The clinic is a Federally Qualified Health Center operating as a patient-centered medical home, and every order is entered through CPOE. Three pieces of jargon describe, respectively, how it is funded, how care is organized, and how orders are placed.",
       "task": "Learn what each term actually means, because all three shape the work you will do."},
      {"type": "key-terms",
       "terms": [
         {"term": "Patient-centered medical home (PCMH)",
          "definition": "A model in which a primary care team coordinates all of a patient's care, with an emphasis on access, continuity, and follow-through. Recognition is commonly awarded by NCQA."},
         {"term": "Federally Qualified Health Center (FQHC)",
          "definition": "A community-based provider receiving federal funding to serve underserved populations. FQHCs must offer a sliding fee scale based on income and see patients regardless of ability to pay."},
         {"term": "CPOE",
          "definition": "Computerized Provider Order Entry — providers enter medication, lab, imaging, and referral orders directly into the EHR rather than writing or dictating them."},
         {"term": "Clinical decision support (CDS)",
          "definition": "Rules built into the EHR that alert a provider to a possible problem — a drug interaction, an allergy, a duplicate order."},
       ]},
      {"type": "paragraph",
       "text": "CPOE removes an entire class of error. A handwritten order had to be read by someone else and transcribed, and both steps could go wrong — illegible handwriting, a misread decimal point, an ambiguous abbreviation. An order entered directly by the provider is legible by construction and reaches the pharmacy or lab without an intermediate copy."},
      {"type": "callout", "variant": "info",
       "text": "CPOE changes what support staff do rather than reducing it. Verbal and telephone orders still occur and still require read-back and provider countersignature. Orders still need tracking to completion — an order placed is not a result received. And when an order is entered against the wrong patient, the audit trail shows who entered it, which is why patient verification before order entry matters as much as it ever did."},
    ],
  },
  "checks": [
    {"explanation": "CPOE eliminates the handwriting and transcription steps where a large share of medication errors originated. The provider enters the order directly, so it is legible by construction and reaches the pharmacy without an intermediate copy.",
     "rationales": [
       "Insurance verification is a separate front-end process and is unaffected by how orders are entered.",
       "Patients do not place their own orders. Patient portals may allow requests, but an order requires a provider.",
       "Correct. Removing handwriting and transcription removes a major source of medication error.",
       "Claim submission is a back-end billing function, separate from order entry.",
     ]},
  ],
},
"provider-order-entry-lab": {
  "objectives": [
    "Enter orders in EHR Go and trace them to results",
    "Verify patient identity before entering an order",
    "Recognize what a clinical decision support alert is telling you",
  ],
  "opening": {
    "heading": "Right patient, right order, every time",
    "blocks": [
      {"type": "scenario",
       "role": "You are working the order entry lab in EHR Go.",
       "text": "Two charts are open in adjacent tabs. This is the single most common way an order reaches the wrong patient, and it happens to careful people working quickly.",
       "task": "Build the verification habit while the patients are fictional."},
      {"type": "callout", "variant": "warning",
       "text": "Verify two identifiers against the chart you are actually in before entering anything — name and date of birth, never room or bed number. Close charts you are finished with rather than leaving them open. An order entered on the wrong patient is attributed to whoever was logged in, and the audit trail is unambiguous about that."},
    ],
  },
},
}

M6 = {
"cpoe-part-2": {
  "objectives": [
    "Explain what clinical decision support does and where it fails",
    "Describe alert fatigue and why it is a safety problem",
    "Handle verbal and telephone orders correctly",
    "Track an order through to its result",
  ],
  "opening": {
    "heading": "The alert that stopped working",
    "blocks": [
      {"type": "scenario",
       "role": "You support a clinic using an EHR with extensive alerting.",
       "text": "The system fires an alert on almost every order — an interaction, a duplicate, a formulary note. Providers dismiss them in under a second, because dismissing is the only way to get through a clinic list. Then a genuinely dangerous interaction alert fires, and it is dismissed exactly like the other forty.",
       "task": "Understand why too much safety tooling produces less safety."},
      {"type": "paragraph",
       "text": "Clinical decision support is genuinely valuable: it catches allergy conflicts, drug interactions, duplicate orders, and dosing outside expected ranges. But every alert spends a small amount of the user's attention, and attention is finite. When the great majority of alerts are irrelevant, users learn — correctly, in a statistical sense — that dismissing is usually right."},
      {"type": "callout", "variant": "warning",
       "text": "Alert fatigue is a documented patient safety problem, not a complaint about software. The countermeasure is tuning rather than adding: reducing low-value alerts so the remaining ones carry signal. If you are ever in a position to report that a specific alert fires constantly and is never actionable, that report is genuinely useful — it is the raw material for tuning."},
      {"type": "table",
       "caption": "Verbal and telephone orders",
       "columns": ["Requirement", "Why"],
       "rows": [
         ["Read the order back to the provider", "Confirms what you heard matches what they said, before anything is acted on"],
         ["Record it immediately", "Memory is not a record, and the order takes effect now"],
         ["Note who gave it, and when", "Attribution is what makes the order valid"],
         ["Obtain the provider's countersignature within the required window", "Organizational policy sets the window; the order is not complete without it"],
       ]},
      {"type": "paragraph",
       "text": "An order placed is not a result received. Orders need tracking to completion, and the gap between the two is where results go missing — a specimen never collected, a study never scheduled, a referral never booked. Many EHRs have a pending-orders view for exactly this, and working it is often support staff's responsibility."},
    ],
  },
  "checks": [
    {"explanation": "Alert fatigue occurs when a system fires so many low-value alerts that users begin dismissing them reflexively — including the ones that matter. It is a recognized patient safety problem, and the countermeasure is tuning the alerts down rather than adding more.",
     "rationales": [
       "CDS alerts appear on screen within the EHR. No fax is involved.",
       "Correct. Too many alerts train users to dismiss them, which defeats the purpose of the ones that matter.",
       "CDS is used across inpatient and outpatient EHRs alike.",
       "Allergy checking is one of the things CDS does most reliably.",
     ]},
  ],
},
"legal-aspects-and-compliance": {
  "objectives": [
    "Distinguish the main HIPAA rules and what each governs",
    "Apply the minimum necessary standard",
    "Explain what a business associate agreement is and when one is required",
    "Recognize a breach and describe the reporting obligation",
  ],
  "opening": {
    "heading": "The rules that govern everything you touch",
    "blocks": [
      {"type": "scenario",
       "role": "You work with patient records daily.",
       "text": "Almost everything you handle is protected health information: a name attached to a date of service, a diagnosis code, an insurance number. The rules governing it are not a compliance module you complete once — they describe how the job is done.",
       "task": "Learn which rule governs what, so you know which question you are asking."},
      {"type": "table",
       "caption": "The HIPAA rules",
       "columns": ["Rule", "Governs", "Applies to"],
       "rows": [
         ["Privacy Rule", "Use and disclosure of PHI; patients' rights to access and amend", "PHI in any form — paper, electronic, spoken"],
         ["Security Rule", "Administrative, physical, and technical safeguards", "ePHI specifically"],
         ["Breach Notification Rule", "What must be reported, to whom, and how quickly", "Breaches of unsecured PHI"],
         ["Enforcement Rule", "Investigations, penalties, and procedures", "Covered entities and business associates"],
       ]},
      {"type": "paragraph",
       "text": "The distinction that matters most in practice: the Privacy Rule covers PHI in every form, while the Security Rule is specifically about ePHI and its three safeguard categories. Administrative safeguards are policies, training, and access management. Physical safeguards are facility access, workstation placement, and device control. Technical safeguards are access controls, audit controls, encryption, and transmission security."},
      {"type": "key-terms",
       "terms": [
         {"term": "Covered entity", "definition": "A health plan, healthcare clearinghouse, or provider that transmits health information electronically."},
         {"term": "Business associate", "definition": "A vendor performing work involving PHI on a covered entity's behalf — a billing service, a cloud host, a shredding company."},
         {"term": "Business associate agreement (BAA)", "definition": "The contract required before a business associate may handle PHI. Without one, the disclosure to that vendor is itself impermissible."},
         {"term": "Minimum necessary", "definition": "Disclose only what the purpose requires. It does not apply to treatment disclosures between providers."},
         {"term": "HITECH Act", "definition": "2009 legislation that promoted EHR adoption, strengthened HIPAA enforcement, and introduced breach notification requirements."},
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Accessing a record you have no work reason to see is a violation even if you tell nobody and change nothing. Access is logged and audited routinely. Looking up a coworker, a neighbour, a family member, or a public figure is among the most common causes of termination in healthcare, and concern for the person is not an exception in the rule."},
    ],
  },
  "checks": [
    {"explanation": "The Security Rule sets the standards for protecting electronic PHI, through administrative, physical, and technical safeguards. The Privacy Rule governs use and disclosure of PHI in every form, not electronic form specifically.",
     "rationales": [
       "The Privacy Rule governs how PHI may be used and disclosed, in any form — paper, electronic, or spoken.",
       "Correct. The Security Rule is specifically about ePHI and its three safeguard categories.",
       "The Breach Notification Rule governs what must be reported after a breach, not the safeguards that prevent one.",
       "The Enforcement Rule covers investigations and penalties.",
     ]},
  ],
},
"compliance-scenarios-lab": {
  "objectives": [
    "Judge whether a disclosure meets the minimum necessary standard",
    "Identify documentation that would not withstand review",
    "Recognize a reportable breach",
  ],
  "opening": {
    "heading": "The situations that actually arise",
    "blocks": [
      {"type": "scenario",
       "role": "You are working the compliance scenarios in EHR Go.",
       "text": "Real privacy failures are rarely dramatic. They are a screen left open, a conversation in a corridor, a full chart sent when three pages were requested, and a colleague asking about someone you both know.",
       "task": "Practise the judgment on cases where nothing is at stake yet."},
      {"type": "table",
       "caption": "Minimum necessary in practice",
       "columns": ["Situation", "Appropriate", "Too much"],
       "rows": [
         ["Payer requests records for one date of service", "Records for that date and those services", "The complete chart because it is quicker"],
         ["Colleague on the care team needs to prepare", "What they need to do their part", "Details unrelated to their role"],
         ["Family member calls about an adult patient", "Nothing without authorization", "Confirming the patient was even seen"],
         ["Submitting a claim", "The codes and identifiers the claim requires", "Clinical notes attached by default"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Report a suspected breach immediately through your organization's process. The Breach Notification Rule carries deadlines, and the clock starts when the breach is discovered — not when someone decides it was serious. Delay makes every outcome worse, and no one has ever been disciplined for reporting something that turned out to be nothing."},
    ],
  },
},
}

apply("lib/content/ehr/intro-to-ehr/module5Lessons.ts", M5)
apply("lib/content/ehr/intro-to-ehr/module6Lessons.ts", M6)
