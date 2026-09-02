import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M3 = {
"icd-part-2-and-cpt-part-1": {
  "objectives": [
    "Use the Alphabetic Index and Tabular List together",
    "Apply Excludes1 and Excludes2 notes correctly",
    "Describe the three CPT categories and the six Category I sections",
    "Link a procedure code to a diagnosis that supports medical necessity",
  ],
  "opening": {
    "heading": "Two code sets, one claim",
    "blocks": [
      {"type": "scenario",
       "role": "You are coding an outpatient encounter.",
       "text": "The diagnosis code says why the patient needed care. The procedure code says what was done. A claim carrying only one of them cannot be paid — and a claim where the two do not support each other is denied for medical necessity even though both codes are individually valid.",
       "task": "Learn to select both, and to link them so the claim tells a coherent story."},
      {"type": "paragraph",
       "text": "Diagnosis coding requires two steps, always. The Alphabetic Index is organized by condition and points you toward a code. The Tabular List holds the actual code plus the instructional notes that govern its use — and the index never shows those notes. Coding from the index alone is the single most common source of preventable coding error."},
      {"type": "table",
       "caption": "Excludes1 versus Excludes2 — opposite meanings, near-identical names",
       "columns": ["Note", "Means", "Effect"],
       "rows": [
         ["Excludes1", "Not coded here — the two conditions cannot occur together", "Never report both codes for the same encounter"],
         ["Excludes2", "Not included here — the condition is separate but may coexist", "Both may be reported when both are documented"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Payers apply Excludes1 edits automatically, so a claim carrying an Excludes1 pair is usually rejected without any human looking at it. The way to hold the distinction: Excludes1 means mutually exclusive; Excludes2 means not part of this code, so code both if both are present."},
      {"type": "table",
       "caption": "The three CPT categories",
       "columns": ["Category", "Format", "Purpose"],
       "rows": [
         ["Category I", "Five digits, e.g. 99213", "Procedures and services in widespread use — the great majority of coding"],
         ["Category II", "Four digits plus F", "Performance measurement and quality reporting; supplemental"],
         ["Category III", "Four digits plus T", "Emerging technology and services"],
       ]},
      {"type": "paragraph",
       "text": "Category I is divided into six sections: Evaluation and Management, Anesthesia, Surgery, Radiology, Pathology and Laboratory, and Medicine. Surgery is by far the largest. Note that the sections are not in strict numeric order — Evaluation and Management codes begin at 99202 but appear first in the book, because they are the most frequently used."},
      {"type": "callout", "variant": "info",
       "text": "Every procedure code on a claim must be linked to at least one diagnosis code that supports medical necessity. On the CMS-1500 this link is made with a diagnosis pointer. A pointer referencing a diagnosis that is not on the claim is one of the most common clearinghouse rejections, and it is entirely preventable at charge entry."},
    ],
  },
  "checks": [
    {"explanation": "CPT is maintained by the American Medical Association and revised annually, with changes effective 1 January. CMS maintains HCPCS Level II; the WHO maintains the base ICD classification.",
     "rationales": [
       "CMS maintains HCPCS Level II and, with the CDC, ICD-10-CM. It does not own CPT.",
       "The WHO maintains the international ICD classification, not CPT.",
       "Correct. CPT is an AMA code set, updated annually with changes effective 1 January.",
       "AHIMA is a professional association that credentials coders. It does not maintain a code set.",
     ]},
  ],
},
"cpt-part-2": {
  "objectives": [
    "Explain what a modifier does and why claims are denied without one",
    "Distinguish modifier 25 from modifier 59",
    "Describe evaluation and management coding under the current rules",
    "Recognize modifier use that crosses into abuse",
  ],
  "opening": {
    "heading": "Modifiers answer an objection before it is raised",
    "blocks": [
      {"type": "scenario",
       "role": "You are coding a visit where two things happened.",
       "text": "A patient attends for a scheduled injection and, during the visit, raises a separate new complaint the provider evaluates. You bill both. The payer denies the office visit as bundled into the procedure — because by default it assumes any visit on the day of a procedure is part of that procedure.",
       "task": "Learn the two-character codes that tell a payer the default assumption does not apply."},
      {"type": "paragraph",
       "text": "A modifier does not change what a code means. It adds a fact about the circumstances: that a service was distinct, that it was on the left side, that it was reduced, that a different provider performed it."},
      {"type": "table",
       "caption": "The modifiers seen most often, and the two most misused",
       "columns": ["Modifier", "Means", "Attaches to"],
       "rows": [
         ["25", "Significant, separately identifiable E/M service on the same day as a procedure", "The E/M code"],
         ["59", "Distinct procedural service", "The procedure code"],
         ["LT / RT", "Left side / right side", "The procedure code"],
         ["50", "Bilateral procedure", "The procedure code"],
         ["76", "Repeat procedure by the same provider", "The repeated code"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Modifiers 25 and 59 are the two most misused codes in the field and both are routinely audited. The distinction is precise: 25 applies to an E/M service performed alongside a procedure; 59 applies to a procedure performed alongside another procedure. Modifier 59 in particular overrides a National Correct Coding Initiative edit, so appending it asserts that this case is a genuine exception. Where a more specific X modifier exists (XE, XS, XP, XU), use it instead — and never append 59 simply to get a denied claim paid, which is unbundling."},
      {"type": "callout", "variant": "info",
       "text": "Office visit E/M coding changed substantially in 2021. History and examination must still be medically appropriate and documented, but they no longer determine the level. Level is selected by either medical decision making or total time on the date of the encounter, whichever the documentation supports at the higher level. Older training material still teaches the history-and-exam bullet-counting method; it does not apply to office visits."},
    ],
  },
  "checks": [
    {"explanation": "Modifier 25 identifies a significant, separately identifiable evaluation and management service performed on the same day as a procedure, and it attaches to the E/M code rather than to the procedure.",
     "rationales": [
       "Laterality is indicated by LT and RT, or by modifier 50 for bilateral procedures.",
       "Multiple procedures on the same day are indicated by modifier 51, or distinguished with 59 or an X modifier.",
       "Correct. Modifier 25 marks a separately identifiable E/M service alongside a procedure.",
       "Provider type is indicated by other modifiers and by the rendering provider NPI on the claim, not by modifier 25.",
     ]},
  ],
},
"outpatient-coding-and-payments-lab": {
  "objectives": [
    "Code an outpatient encounter from documentation in EHR Go",
    "Link diagnosis and procedure codes with correct pointers",
    "Post a payment and a contractual adjustment correctly",
    "Read an explanation of benefits",
  ],
  "opening": {
    "heading": "From documentation to posted payment",
    "blocks": [
      {"type": "scenario",
       "role": "You are working the coding and posting lab in EHR Go.",
       "text": "This lab runs the back half of the revenue cycle end to end: read the note, select the codes, link them, submit, and then post what comes back. Doing it once in sequence is what makes the individual steps make sense.",
       "task": "Follow one encounter from documentation to a zero balance."},
      {"type": "worked-example",
       "title": "Posting a remittance correctly",
       "task": "A line shows billed $340, allowed $186, plan paid $148.80, patient responsibility $37.20. Post it.",
       "steps": [
         {"move": "Post the payment of $148.80 against the claim.",
          "why": "The money actually received. This is the part everyone gets right."},
         {"move": "Post the $154 difference as a contractual adjustment.",
          "why": "Billed minus allowed. Under the payer contract this is written off and may never be billed to the patient. Posting it anywhere else overstates the practice's receivables and risks an improper patient bill."},
         {"move": "Move the $37.20 to patient responsibility.",
          "why": "The coinsurance or deductible portion enters the patient billing cycle. Left against insurance, it is never billed to anyone and quietly becomes a write-off."},
         {"move": "Read the reason codes even when the line paid as expected.",
          "why": "Reason codes explain reductions and often reveal a pattern — a modifier consistently missing, a code repeatedly bundled. Posting mechanically fixes individual claims and never the cause."},
       ],
       "result": "The account balances to zero against insurance, with $37.20 correctly owed by the patient.",
       "takeaway": "Payment, contractual adjustment, patient responsibility — three separate postings. The reason codes are where recurring problems announce themselves."},
    ],
  },
},
}

M4 = {
"introduction-to-hcpcs": {
  "objectives": [
    "Explain what HCPCS Level II covers and how it differs from CPT",
    "Identify the main HCPCS Level II code categories by letter",
    "Determine when both a CPT and a HCPCS code are needed",
    "Describe how HCPCS Level II is maintained",
  ],
  "opening": {
    "heading": "The code set for everything CPT does not cover",
    "blocks": [
      {"type": "scenario",
       "role": "You are coding a visit where a medication was administered.",
       "text": "The provider gave an injection. CPT has a code for administering it. CPT has no code for the drug itself. Bill only the CPT code and the practice is paid for the work and not for the medication it purchased.",
       "task": "Learn what the second code set covers, and when you need both."},
      {"type": "paragraph",
       "text": "HCPCS is the Healthcare Common Procedure Coding System, and it has two levels. Level I is CPT. Level II is a separate alphanumeric set maintained by CMS, covering the things CPT does not: supplies, durable medical equipment, prosthetics, drugs administered other than orally, and ambulance transport."},
      {"type": "paragraph",
       "text": "A HCPCS Level II code is one letter followed by four digits. The letter indicates the category, which makes the set unusually navigable once you know a handful of them."},
      {"type": "table",
       "caption": "HCPCS Level II categories seen most often",
       "columns": ["Letter", "Covers", "Example type"],
       "rows": [
         ["A", "Transportation, medical and surgical supplies", "Ambulance service, dressings"],
         ["B", "Enteral and parenteral therapy", "Feeding supplies"],
         ["E", "Durable medical equipment", "Wheelchairs, walkers, hospital beds"],
         ["G", "Temporary procedures and services", "Codes CMS assigns pending a CPT code"],
         ["J", "Drugs administered other than by mouth", "Injectable and infused medications"],
         ["K", "Temporary DME codes", "Assigned by the DME contractors"],
         ["L", "Orthotics and prosthetics", "Braces, artificial limbs"],
         ["Q", "Temporary codes", "Various, assigned by CMS"],
       ]},
      {"type": "callout", "variant": "info",
       "text": "A single encounter often needs codes from both levels. An injection produces a CPT code for the administration and a J code for the drug. Reporting only one is among the most common ways a practice loses revenue through incomplete rather than incorrect coding."},
    ],
  },
  "checks": [
    {"explanation": "E codes cover durable medical equipment — wheelchairs, walkers, hospital beds, and similar items intended for repeated use.",
     "rationales": [
       "A codes cover transportation and medical and surgical supplies, such as ambulance service and dressings.",
       "J codes cover drugs administered other than by mouth, principally injectables.",
       "Correct. E codes are the durable medical equipment range.",
       "L codes cover orthotics and prosthetics — braces and artificial limbs.",
     ]},
  ],
},
"midterm-review": {
  "objectives": [
    "Review the workflow, revenue cycle, and code sets covered so far",
    "Identify which topics you can explain and which you can only recognize",
    "Prepare using the material's own structure rather than rereading",
  ],
  "opening": {
    "heading": "What the first half covered",
    "blocks": [
      {"type": "scenario",
       "role": "You are preparing for the midterm.",
       "text": "Rereading notes feels productive and is one of the least effective ways to study. Closing the book and trying to explain a topic reveals in thirty seconds whether you actually know it.",
       "task": "Review by retrieving, not by rereading."},
      {"type": "table",
       "caption": "The first half, and how to check you know it",
       "columns": ["Topic", "You know it when you can…"],
       "rows": [
         ["Patient workflow", "List the eleven steps in order and name the zone that owns each"],
         ["Revenue cycle phases", "Say which phase a given denial originated in"],
         ["Eligibility, authorization, medical necessity", "Explain how a service can pass two and fail the third"],
         ["ICD-10-CM", "Describe the code structure and explain Excludes1 versus Excludes2"],
         ["CPT", "Name the three categories and the six Category I sections"],
         ["Modifiers 25 and 59", "Say which attaches to which code and why"],
         ["HCPCS Level II", "Give the letter for DME and for injectable drugs"],
         ["EHR navigation", "Find a chart, an order, a result, and a charge in EHR Go"],
       ]},
      {"type": "tip",
       "text": "For each row above, say the answer out loud before checking it. The topics where you hesitate are the entire study list — the ones you answer instantly need no further work, however comfortable rereading them feels."},
    ],
  },
},
"midterm-skills-review-lab": {
  "objectives": [
    "Complete a full encounter in EHR Go without prompting",
    "Self-identify which steps you still need to look up",
  ],
  "opening": {
    "heading": "A full encounter, unassisted",
    "blocks": [
      {"type": "scenario",
       "role": "You are running the skills review in EHR Go.",
       "text": "Work one encounter end to end: register, verify, document, code, submit, post. Note every point where you had to stop and look something up — that list is worth more than a score.",
       "task": "Find the steps you cannot yet do from memory, while it is still practice."},
      {"type": "tip",
       "text": "Keep a running list of where you hesitated. Bring it to the review session. An instructor can address a specific question about diagnosis pointers far more usefully than a general request to go over coding again."},
    ],
  },
},
}

apply("lib/content/ehr/intro-to-ehr/module3Lessons.ts", M3)
apply("lib/content/ehr/intro-to-ehr/module4Lessons.ts", M4)
