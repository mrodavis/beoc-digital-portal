import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "cpt-structure-and-categories",
    title: "CPT Structure and Categories",
    description:
      "Learn how procedure codes are organized, what the three CPT categories are for, and how to navigate the code set to find the right one.",
    duration: "24 min",
    objectives: [
      "Describe the structure of CPT and its three categories",
      "Navigate the CPT sections and use the index correctly",
      "Explain what the CPT symbols and conventions signal",
      "Distinguish CPT from HCPCS Level II and know when each applies",
    ],
    sections: [
      {
        heading: "Codes for what was done",
        blocks: [
          {
            type: "scenario",
            role: "You code an office visit at Lakeside Medical Associates.",
            text: "The ICD-10-CM code says the patient has osteoarthritis of the left knee. That explains why care was needed. It says nothing about what the provider actually did — the examination, the joint injection, the X-ray. Without procedure codes, the claim describes a problem and requests payment for nothing in particular.",
            task: "Learn the code set that describes services delivered, and how it is organized.",
          },
          {
            type: "paragraph",
            text: "CPT stands for Current Procedural Terminology. It is maintained by the American Medical Association, revised annually with changes effective 1 January, and it describes the services and procedures a provider performs. Every CPT code is five characters.",
          },
          {
            type: "table",
            caption: "The three CPT categories",
            columns: ["Category", "Format", "Purpose", "Optional?"],
            rows: [
              [
                "Category I",
                "Five digits, e.g. 99213",
                "Procedures and services in widespread use — the great majority of coding",
                "No — these drive payment",
              ],
              [
                "Category II",
                "Four digits plus F, e.g. 3006F",
                "Performance measurement and quality reporting",
                "Yes, but often required by quality programs",
              ],
              [
                "Category III",
                "Four digits plus T, e.g. 0510T",
                "Emerging technology, services, and procedures",
                "No — use instead of an unlisted Category I code when one exists",
              ],
            ],
          },
          {
            type: "table",
            caption: "CPT Category I sections",
            columns: ["Section", "Range", "Covers"],
            rows: [
              ["Evaluation and Management", "99202-99499", "Office visits, consultations, hospital care"],
              ["Anesthesia", "00100-01999", "Anesthesia services"],
              ["Surgery", "10004-69990", "Surgical procedures by body system — the largest section"],
              ["Radiology", "70010-79999", "Imaging and radiation oncology"],
              ["Pathology and Laboratory", "80047-89398", "Lab tests and pathology"],
              ["Medicine", "90281-99607", "Immunizations, cardiovascular studies, therapies"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never code directly from the CPT index. The index points you to a code or a range; the main text carries the full description, the parenthetical instructions, and the section guidelines that determine whether the code actually applies. This is the same two-step discipline ICD-10-CM requires, and skipping it produces the same class of error.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "HCPCS Level II",
                definition:
                  "A separate code set — one letter plus four digits — for supplies, durable medical equipment, drugs, prosthetics, and ambulance services. Maintained by CMS.",
              },
              {
                term: "Unlisted procedure code",
                definition:
                  "A code used when no specific code describes the service. Requires a written report and is always manually reviewed, so it slows payment.",
              },
              {
                term: "Bundled service",
                definition:
                  "A service considered part of another and not separately payable. Reporting it separately is unbundling.",
              },
              {
                term: "Global period",
                definition:
                  "A window after a procedure during which related follow-up care is included in the original payment.",
              },
            ],
          },
          {
            type: "paragraph",
            text: "CPT covers physician services and procedures. HCPCS Level II covers what CPT does not — the wheelchair, the injectable drug, the surgical dressing, the ambulance transport. A single encounter can require both: a CPT code for administering an injection and a HCPCS Level II code for the drug that was injected.",
          },
          {
            type: "knowledge-check",
            question:
              "A provider administers a therapeutic injection. Which code or codes are needed?",
            options: [
              "A CPT code only, since the injection is a physician service",
              "A CPT code for administering the injection and a HCPCS Level II code for the drug",
              "A HCPCS Level II code only, since a drug was supplied",
              "An ICD-10-CM code is sufficient, since it describes the condition treated",
            ],
            correctIndex: 1,
            explanation:
              "The administration is a service described by CPT; the drug itself is a supply described by HCPCS Level II. Reporting only one leaves the practice unpaid for the other, and this pairing is one of the most common places revenue is lost through incomplete coding.",
            optionRationales: [
              "CPT covers the administration but has no code for the drug supplied, so the drug goes unbilled.",
              "Correct. CPT for the service, HCPCS Level II for the drug.",
              "HCPCS Level II covers the drug but not the professional work of administering it.",
              "ICD-10-CM explains why care was needed. It never describes what was done and cannot support payment on its own.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "You will need access to a current CPT code set. Your program or library should provide one; the AMA publishes it annually.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Locate the six Category I sections in the code book and note the page each begins on. Read the guidelines at the start of the Surgery section.",
          "Look up a routine office visit in the index, then find the code in the main text. List every piece of information the main text gives you that the index did not.",
          "Find one Category III code and explain in two sentences why it exists rather than a Category I code.",
          "For a patient receiving an injectable medication, identify what you would need from the documentation to code both the administration and the drug.",
        ],
      },
    ],
  },
  {
    slug: "evaluation-and-management-coding",
    title: "Evaluation and Management Coding",
    description:
      "Code office visits under the current rules, which are based on medical decision making or total time rather than the old history-and-exam bullet counts.",
    duration: "26 min",
    objectives: [
      "Explain what E/M codes describe and why they are high volume",
      "Select an office visit level using medical decision making",
      "Select a level using total time on the date of the encounter",
      "Distinguish new from established patients",
    ],
    sections: [
      {
        heading: "The most-billed codes in outpatient medicine",
        blocks: [
          {
            type: "scenario",
            role: "You code a primary care day at Lakeside Medical Associates.",
            text: "Twenty-two of the day's twenty-four encounters are office visits. Each needs a level assigned — and the level determines payment, so a practice that systematically codes one level too low leaves substantial revenue uncollected, while one that codes too high is submitting false claims.",
            task: "Learn to select an office visit level from what the documentation actually supports.",
          },
          {
            type: "paragraph",
            text: "Evaluation and Management codes describe cognitive work: the assessment, the decision making, the counseling. They are the highest-volume codes in outpatient medicine and the most scrutinized, because level selection has historically been inconsistent.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Office visit E/M coding changed substantially in 2021. The old system counted history and examination bullets to arrive at a level. Those elements must still be medically appropriate and documented, but they no longer determine the level. Level is now selected by either medical decision making or total time on the date of the encounter — the coder's choice, whichever supports the higher level. Older training material still teaches the bullet-counting method; it does not apply to office visits.",
          },
          {
            type: "table",
            caption: "Office visit code families",
            columns: ["Patient type", "Codes", "Definition"],
            rows: [
              [
                "New patient",
                "99202-99205",
                "Has not received professional services from the provider, or another of the same specialty in the same group, within three years",
              ],
              [
                "Established patient",
                "99211-99215",
                "Has received such services within three years",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "The three-year rule matters financially: new patient visits pay more, because more work is involved in an initial assessment. It turns on the same specialty and same group practice, not merely the same individual provider — a patient seen by a different physician in your practice's same specialty within three years is established.",
          },
          {
            type: "table",
            caption: "The three elements of medical decision making",
            columns: ["Element", "Considers"],
            rows: [
              [
                "Number and complexity of problems addressed",
                "How many problems, and how serious or unstable",
              ],
              [
                "Amount and complexity of data reviewed",
                "Tests ordered or reviewed, records obtained, discussion with other providers",
              ],
              [
                "Risk of complications or morbidity",
                "Risk from the problems, the diagnostic testing, and the treatment chosen",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "Two of the three elements must be met or exceeded at a given level to support it. The levels run straightforward, low, moderate, and high, corresponding to codes 99202/99212 through 99205/99215.",
          },
          {
            type: "worked-example",
            title: "Selecting a level two ways",
            task: "An established patient is seen for two chronic conditions, one uncontrolled. The provider reviews recent labs, adjusts a prescription, and documents 40 minutes total on the date of the encounter.",
            steps: [
              {
                move: "Try medical decision making first.",
                why: "Two chronic conditions with one uncontrolled generally supports moderate complexity on the problems element. Reviewing labs contributes to the data element. Prescription drug management is a recognized moderate-risk item. Two of three at moderate supports 99214.",
              },
              {
                move: "Then check total time as an alternative.",
                why: "Time is the other permitted route, and you may use whichever supports the higher level. Total time includes the provider's non-face-to-face work on that date — reviewing records beforehand, documenting afterwards — not only the time in the room.",
              },
              {
                move: "Compare 40 minutes against the time thresholds for established patient visits.",
                why: "40 minutes falls in the range for 99215 rather than 99214. Here time supports a higher level than medical decision making does, so time is the better basis — provided the total time is actually documented.",
              },
              {
                move: "Confirm the documentation states total time explicitly.",
                why: "This is where time-based selection fails. A note saying '40 minutes spent, including review of labs and counseling on medication changes' supports it. A note with no time statement cannot support time-based selection at all, no matter how long the visit actually took.",
              },
            ],
            result:
              "99215, supported by documented total time, with medical decision making independently supporting at least 99214.",
            takeaway:
              "Check both routes and use whichever the documentation supports at the higher level. Time-based selection requires the total time to be stated in the note.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "A consistent pattern of coding the same level for every visit — whether that is always 99213 or always 99214 — attracts payer attention regardless of which level it is. Real patient panels produce a distribution across levels. Coding defensively low is not a safe strategy; it is a different pattern anomaly, and it costs the practice revenue it legitimately earned.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient last seen by a different physician of the same specialty in your practice two years ago returns. Which code family applies?",
            options: [
              "New patient, because this is a different physician",
              "Established patient, because the same specialty in the same group saw them within three years",
              "New patient, because more than one year has passed",
              "Either may be used, at the coder's discretion",
            ],
            correctIndex: 1,
            explanation:
              "The rule turns on the same specialty within the same group practice, not the individual provider. Two years is inside the three-year window, so this is an established patient — and coding it as new would be upcoding, since new patient visits pay more.",
            optionRationales: [
              "The rule covers the group and specialty, not just the individual physician.",
              "Correct. Same specialty, same group, within three years means established.",
              "The window is three years, not one.",
              "There is no discretion. The three-year rule determines it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice level selection against real documentation standards. Use the current CPT E/M guidelines.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Read the E/M guidelines at the front of the CPT Evaluation and Management section. Write down the time thresholds for 99212 through 99215.",
          "For an established patient with one stable chronic condition, no tests ordered, and no prescription change, determine the supportable level using medical decision making and justify it.",
          "For the same encounter documented as 30 minutes total time, determine the level using time. Explain which basis you would use and why.",
          "Write three sentences a provider could add to a note that would support time-based selection, and explain what makes them sufficient.",
        ],
      },
    ],
  },
  {
    slug: "modifiers",
    title: "Modifiers",
    description:
      "Use two-character modifiers to tell a payer that something about a service was different from the default assumption.",
    duration: "22 min",
    objectives: [
      "Explain what a modifier does and why claims are denied without one",
      "Apply the most common modifiers correctly",
      "Distinguish modifier 25 from modifier 59",
      "Recognize when modifier use crosses into abuse",
    ],
    sections: [
      {
        heading: "A modifier answers an objection before it is raised",
        blocks: [
          {
            type: "scenario",
            role: "You code an encounter at Lakeside Medical Associates.",
            text: "A patient comes in for a scheduled joint injection. During the visit they raise a new, unrelated complaint, and the provider evaluates it. You bill the injection and an office visit. The payer denies the office visit as bundled into the procedure — because by default it assumes any visit on the day of a procedure is part of that procedure.",
            task: "Learn the modifiers that tell a payer the default assumption does not apply here.",
          },
          {
            type: "paragraph",
            text: "A modifier is a two-character code appended to a CPT or HCPCS code. It does not change what the code means; it adds a fact about the circumstances — that the service was distinct, that it was on the left side, that it was reduced, that a different provider performed it.",
          },
          {
            type: "table",
            caption: "Frequently used modifiers",
            columns: ["Modifier", "Means", "Typical use"],
            rows: [
              [
                "25",
                "Significant, separately identifiable E/M service on the same day as a procedure",
                "A patient seen for one thing who is also evaluated for something else",
              ],
              [
                "59",
                "Distinct procedural service",
                "Two procedures normally bundled that were genuinely separate here",
              ],
              ["LT / RT", "Left side / right side", "Procedures on paired structures"],
              ["50", "Bilateral procedure", "The same procedure on both sides"],
              ["76", "Repeat procedure by the same provider", "A second X-ray the same day"],
              ["91", "Repeat clinical diagnostic laboratory test", "A repeated lab test for a clinical reason"],
              ["GA", "Waiver of liability on file (ABN signed)", "Medicare may not cover; the patient was notified"],
            ],
          },
          {
            type: "paragraph",
            text: "Modifier 25 and modifier 59 are the two most misused codes in the entire field, and both are routinely audited. The distinction is worth stating precisely: modifier 25 applies to an evaluation and management service performed alongside a procedure. Modifier 59 applies to a procedure performed alongside another procedure.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Modifier 59 in particular is an audit flag. It overrides a National Correct Coding Initiative edit — a payer rule saying two codes should not normally be billed together — so appending it asserts that this case is a genuine exception. Where a more specific modifier exists (XE, XS, XP, XU), use it instead. Never append 59 simply to get a denied claim paid; doing so knowingly is unbundling, which is fraud rather than an aggressive coding choice.",
          },
          {
            type: "worked-example",
            title: "Deciding whether modifier 25 applies",
            task: "A patient attends for a scheduled joint injection and also raises a new, unrelated complaint that the provider evaluates.",
            steps: [
              {
                move: "Ask whether the E/M work was significant and separately identifiable.",
                why: "This is the actual test. Every procedure includes some evaluation — assessing the site, confirming the plan. Modifier 25 is for work beyond that, addressing a different issue. Routine pre-procedure assessment never qualifies.",
              },
              {
                move: "Check the documentation supports a distinct evaluation.",
                why: "There must be a separately documented history, assessment, and plan for the other complaint. If the note describes only the injection, the E/M is not supportable regardless of what happened in the room — and the fix is a provider query, not a modifier.",
              },
              {
                move: "Append modifier 25 to the E/M code, not to the procedure.",
                why: "This trips people constantly. The modifier goes on the code it describes, and modifier 25 describes the E/M service. Appending it to the injection code is simply wrong and will be rejected.",
              },
              {
                move: "Confirm a different diagnosis supports the E/M where possible.",
                why: "A separate diagnosis code linked to the E/M makes the separate identifiability visible to the payer on the face of the claim. It is not strictly required, but it substantially reduces the chance of a denial you then have to appeal.",
              },
            ],
            result:
              "The injection and the office visit both paid, with the E/M carrying modifier 25 and its own supporting diagnosis.",
            takeaway:
              "Modifier 25 attaches to the E/M, and only when the evaluation went genuinely beyond the procedure's inherent assessment.",
          },
          {
            type: "knowledge-check",
            question:
              "A provider performs a scheduled procedure and, at the same visit, evaluates a separate new complaint. Which modifier applies, and to which code?",
            options: [
              "Modifier 59, appended to the procedure code",
              "Modifier 25, appended to the E/M code",
              "Modifier 25, appended to the procedure code",
              "No modifier — the visit is included in the procedure",
            ],
            correctIndex: 1,
            explanation:
              "Modifier 25 identifies a significant, separately identifiable E/M service on the same day as a procedure, and it attaches to the E/M code it describes. Modifier 59 applies between two procedures, not between a procedure and an E/M service.",
            optionRationales: [
              "Modifier 59 distinguishes one procedure from another. There is only one procedure here.",
              "Correct. Modifier 25 goes on the E/M code.",
              "The modifier attaches to the code it describes, which is the E/M service, not the procedure.",
              "Evaluating a separate new complaint is exactly what modifier 25 exists for. Omitting it forfeits legitimate payment.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Modifiers reward precision. Work from the CPT modifier appendix.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the modifier appendix in your CPT book and read the full descriptions of modifiers 25, 59, 50, and 76.",
          "Research the X modifiers (XE, XS, XP, XU) and explain in three sentences why CMS introduced them as alternatives to 59.",
          "For a bilateral procedure, determine whether your payer prefers modifier 50 or LT and RT on separate lines. Note where you found the answer.",
          "Write a short guidance note for a colleague on when modifier 25 is and is not appropriate, using the injection scenario as the example.",
        ],
      },
    ],
  },
];
