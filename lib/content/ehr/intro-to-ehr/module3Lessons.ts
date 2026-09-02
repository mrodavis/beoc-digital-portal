import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "icd-part-2-and-cpt-part-1",
    title: "Diagnostic Coding (ICD Part 2) & CPT Introduction",
    description:
      "Continue developing ICD-10-CM skills and begin learning Current Procedural Terminology (CPT) coding for outpatient procedures.",
    objectives: [
      "Use the Alphabetic Index and Tabular List together",
      "Apply Excludes1 and Excludes2 notes correctly",
      "Describe the three CPT categories and the six Category I sections",
      "Link a procedure code to a diagnosis that supports medical necessity",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "Two code sets, one claim",
        blocks: [
          {
            type: "scenario",
            role: "You are coding an outpatient encounter.",
            text: "The diagnosis code says why the patient needed care. The procedure code says what was done. A claim carrying only one of them cannot be paid — and a claim where the two do not support each other is denied for medical necessity even though both codes are individually valid.",
            task: "Learn to select both, and to link them so the claim tells a coherent story.",
          },
          {
            type: "paragraph",
            text: "Diagnosis coding requires two steps, always. The Alphabetic Index is organized by condition and points you toward a code. The Tabular List holds the actual code plus the instructional notes that govern its use — and the index never shows those notes. Coding from the index alone is the single most common source of preventable coding error.",
          },
          {
            type: "table",
            caption: "Excludes1 versus Excludes2 — opposite meanings, near-identical names",
            columns: [
              "Note",
              "Means",
              "Effect",
            ],
            rows: [
              [
                "Excludes1",
                "Not coded here — the two conditions cannot occur together",
                "Never report both codes for the same encounter",
              ],
              [
                "Excludes2",
                "Not included here — the condition is separate but may coexist",
                "Both may be reported when both are documented",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Payers apply Excludes1 edits automatically, so a claim carrying an Excludes1 pair is usually rejected without any human looking at it. The way to hold the distinction: Excludes1 means mutually exclusive; Excludes2 means not part of this code, so code both if both are present.",
          },
          {
            type: "table",
            caption: "The three CPT categories",
            columns: [
              "Category",
              "Format",
              "Purpose",
            ],
            rows: [
              [
                "Category I",
                "Five digits, e.g. 99213",
                "Procedures and services in widespread use — the great majority of coding",
              ],
              [
                "Category II",
                "Four digits plus F",
                "Performance measurement and quality reporting; supplemental",
              ],
              [
                "Category III",
                "Four digits plus T",
                "Emerging technology and services",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "Category I is divided into six sections: Evaluation and Management, Anesthesia, Surgery, Radiology, Pathology and Laboratory, and Medicine. Surgery is by far the largest. Note that the sections are not in strict numeric order — Evaluation and Management codes begin at 99202 but appear first in the book, because they are the most frequently used.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Every procedure code on a claim must be linked to at least one diagnosis code that supports medical necessity. On the CMS-1500 this link is made with a diagnosis pointer. A pointer referencing a diagnosis that is not on the claim is one of the most common clearinghouse rejections, and it is entirely preventable at charge entry.",
          },
        ],
      },
      {
        heading: "ICD-10-CM: Code Structure Review",
        blocks: [
          {
            type: "paragraph",
            text: "ICD-10-CM codes can be 3–7 characters long. The first three characters identify the category of disease. Additional characters add specificity — laterality, encounter type, sequela, and more.",
          },
          {
            type: "list",
            items: [
              "Characters 1–3: Category (e.g., S52 = Fracture of forearm)",
              "Character 4: Etiology, anatomic site, or severity",
              "Characters 5–6: Further specificity",
              "Character 7: Extension (A = initial, D = subsequent, S = sequela)",
            ],
          },
        ],
      },
      {
        heading: "Introduction to CPT Coding",
        blocks: [
          {
            type: "paragraph",
            text: "CPT (Current Procedural Terminology) codes are five characters long and are maintained by the American Medical Association (AMA). Category I codes are five digits; Category II codes end in F and Category III codes end in T, so \"five characters\" is accurate where \"five digits\" is not. They describe the medical, surgical, and diagnostic services performed during an encounter.",
          },
          {
            type: "list",
            items: [
              "Evaluation & Management (E/M): 99202–99215",
              "Surgery codes: 10000–69999",
              "Radiology: 70000–79999",
              "Pathology & Laboratory: 80000–89999",
              "Medicine: 90000–99199",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "Which organization maintains the CPT code set?",
        options: [
          "Centers for Medicare & Medicaid Services (CMS)",
          "World Health Organization (WHO)",
          "American Medical Association (AMA)",
          "American Health Information Management Association (AHIMA)",
        ],
        correctIndex: 2,
        explanation: "CPT is maintained by the American Medical Association and revised annually, with changes effective 1 January. CMS maintains HCPCS Level II; the WHO maintains the base ICD classification.",
        optionRationales: [
          "CMS maintains HCPCS Level II and, with the CDC, ICD-10-CM. It does not own CPT.",
          "The WHO maintains the international ICD classification, not CPT.",
          "Correct. CPT is an AMA code set, updated annually with changes effective 1 January.",
          "AHIMA is a professional association that credentials coders. It does not maintain a code set.",
        ],
      },
    ],
  },
  {
    slug: "cpt-part-2",
    title: "Current Procedural Coding (CPT) Part 2",
    description:
      "Deepen your CPT knowledge with modifiers, bundling rules, and how CPT codes link to ICD codes on a claim.",
    objectives: [
      "Explain what a modifier does and why claims are denied without one",
      "Distinguish modifier 25 from modifier 59",
      "Describe evaluation and management coding under the current rules",
      "Recognize modifier use that crosses into abuse",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "Modifiers answer an objection before it is raised",
        blocks: [
          {
            type: "scenario",
            role: "You are coding a visit where two things happened.",
            text: "A patient attends for a scheduled injection and, during the visit, raises a separate new complaint the provider evaluates. You bill both. The payer denies the office visit as bundled into the procedure — because by default it assumes any visit on the day of a procedure is part of that procedure.",
            task: "Learn the two-character codes that tell a payer the default assumption does not apply.",
          },
          {
            type: "paragraph",
            text: "A modifier does not change what a code means. It adds a fact about the circumstances: that a service was distinct, that it was on the left side, that it was reduced, that a different provider performed it.",
          },
          {
            type: "table",
            caption: "The modifiers seen most often, and the two most misused",
            columns: [
              "Modifier",
              "Means",
              "Attaches to",
            ],
            rows: [
              [
                "25",
                "Significant, separately identifiable E/M service on the same day as a procedure",
                "The E/M code",
              ],
              [
                "59",
                "Distinct procedural service",
                "The procedure code",
              ],
              [
                "LT / RT",
                "Left side / right side",
                "The procedure code",
              ],
              [
                "50",
                "Bilateral procedure",
                "The procedure code",
              ],
              [
                "76",
                "Repeat procedure by the same provider",
                "The repeated code",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Modifiers 25 and 59 are the two most misused codes in the field and both are routinely audited. The distinction is precise: 25 applies to an E/M service performed alongside a procedure; 59 applies to a procedure performed alongside another procedure. Modifier 59 in particular overrides a National Correct Coding Initiative edit, so appending it asserts that this case is a genuine exception. Where a more specific X modifier exists (XE, XS, XP, XU), use it instead — and never append 59 simply to get a denied claim paid, which is unbundling.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Office visit E/M coding changed substantially in 2021. History and examination must still be medically appropriate and documented, but they no longer determine the level. Level is selected by either medical decision making or total time on the date of the encounter, whichever the documentation supports at the higher level. Older training material still teaches the history-and-exam bullet-counting method; it does not apply to office visits.",
          },
        ],
      },
      {
        heading: "CPT Modifiers",
        blocks: [
          {
            type: "paragraph",
            text: "Modifiers are two-character additions to a CPT code that provide additional information about a service without changing its definition. They affect how a claim is processed and reimbursed.",
          },
          {
            type: "list",
            items: [
              "-25: Significant, separately identifiable E/M service on the same day",
              "-51: Multiple procedures",
              "-59: Distinct procedural service",
              "-RT / -LT: Right side / Left side",
            ],
          },
        ],
      },
      {
        heading: "Linking Diagnoses to Procedures",
        blocks: [
          {
            type: "paragraph",
            text: "Every CPT code on a claim must be linked to at least one ICD-10-CM diagnosis code that justifies medical necessity. If the diagnosis does not support the procedure, the claim will be denied.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Medical necessity is the cornerstone of claims approval. The diagnosis must clearly explain why the procedure was performed.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What does CPT modifier -25 indicate?",
        options: [
          "The procedure was performed on the left side of the body",
          "Multiple procedures were performed on the same day",
          "A significant, separately identifiable E/M service was provided on the same day as a procedure",
          "The service was performed by a physician assistant",
        ],
        correctIndex: 2,
        explanation: "Modifier 25 identifies a significant, separately identifiable evaluation and management service performed on the same day as a procedure, and it attaches to the E/M code rather than to the procedure.",
        optionRationales: [
          "Laterality is indicated by LT and RT, or by modifier 50 for bilateral procedures.",
          "Multiple procedures on the same day are indicated by modifier 51, or distinguished with 59 or an X modifier.",
          "Correct. Modifier 25 marks a separately identifiable E/M service alongside a procedure.",
          "Provider type is indicated by other modifiers and by the rendering provider NPI on the claim, not by modifier 25.",
        ],
      },
    ],
  },
  {
    slug: "outpatient-coding-and-payments-lab",
    title: "EHR Go Lab: Outpatient Coding Workflow & Payment Posting",
    description:
      "Practice entering outpatient diagnosis and procedure codes in EHR Go, then post a payment and apply an adjustment.",
    objectives: [
      "Code an outpatient encounter from documentation in EHR Go",
      "Link diagnosis and procedure codes with correct pointers",
      "Post a payment and a contractual adjustment correctly",
      "Read an explanation of benefits",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "From documentation to posted payment",
        blocks: [
          {
            type: "scenario",
            role: "You are working the coding and posting lab in EHR Go.",
            text: "This lab runs the back half of the revenue cycle end to end: read the note, select the codes, link them, submit, and then post what comes back. Doing it once in sequence is what makes the individual steps make sense.",
            task: "Follow one encounter from documentation to a zero balance.",
          },
          {
            type: "worked-example",
            title: "Posting a remittance correctly",
            task: "A line shows billed $340, allowed $186, plan paid $148.80, patient responsibility $37.20. Post it.",
            steps: [
              {
                move: "Post the payment of $148.80 against the claim.",
                why: "The money actually received. This is the part everyone gets right.",
              },
              {
                move: "Post the $154 difference as a contractual adjustment.",
                why: "Billed minus allowed. Under the payer contract this is written off and may never be billed to the patient. Posting it anywhere else overstates the practice's receivables and risks an improper patient bill.",
              },
              {
                move: "Move the $37.20 to patient responsibility.",
                why: "The coinsurance or deductible portion enters the patient billing cycle. Left against insurance, it is never billed to anyone and quietly becomes a write-off.",
              },
              {
                move: "Read the reason codes even when the line paid as expected.",
                why: "Reason codes explain reductions and often reveal a pattern — a modifier consistently missing, a code repeatedly bundled. Posting mechanically fixes individual claims and never the cause.",
              },
            ],
            result: "The account balances to zero against insurance, with $37.20 correctly owed by the patient.",
            takeaway: "Payment, contractual adjustment, patient responsibility — three separate postings. The reason codes are where recurring problems announce themselves.",
          },
        ],
      },
      {
        heading: "Lab Overview",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "In this lab, Mr. Davis will guide you through the coding and payment posting workflow in EHR Go using a simulated patient encounter.",
          },
          {
            type: "list",
            items: [
              "Assign ICD-10-CM diagnosis codes to a patient encounter",
              "Select appropriate CPT procedure codes",
              "Submit a simulated claim in EHR Go",
              "Post an insurance payment and apply a contractual adjustment",
            ],
          },
        ],
      },
    ],
  },
];
