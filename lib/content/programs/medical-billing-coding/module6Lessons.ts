import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "the-cms-1500-and-claim-fields",
    title: "The CMS-1500 and What Each Field Carries",
    description:
      "Understand the professional claim form, the electronic transaction behind it, and the fields that most often cause rejections.",
    duration: "24 min",
    objectives: [
      "Describe the CMS-1500 and its electronic equivalent",
      "Identify the fields that most commonly cause rejections",
      "Distinguish a rejection from a denial",
      "Explain what a clean claim is",
    ],
    sections: [
      {
        heading: "One form, and the transaction behind it",
        blocks: [
          {
            type: "scenario",
            role: "You submit claims at Lakeside Medical Associates.",
            text: "Twelve claims come back the same afternoon, before any payer looked at them clinically. They were rejected by the clearinghouse for invalid subscriber ID, missing NPI, and a diagnosis pointer referencing a diagnosis that was not on the claim. None of these are coding problems. All twelve were preventable.",
            task: "Learn what the claim actually carries, so the fields that reject are the ones you check first.",
          },
          {
            type: "paragraph",
            text: "The CMS-1500 is the standard claim form for professional services — physician and outpatient practice billing. Institutional claims from hospitals use the UB-04, also called the CMS-1450. Almost all claims are transmitted electronically rather than on paper: the CMS-1500 corresponds to the 837P transaction, and the UB-04 to the 837I.",
          },
          {
            type: "paragraph",
            text: "Even when you never see the paper form, its field structure is what the electronic transaction carries and what every billing system's screens are modeled on. Knowing the fields is knowing the claim.",
          },
          {
            type: "table",
            caption: "Fields that most often cause rejections",
            columns: ["Field", "Carries", "Common failure"],
            rows: [
              ["Subscriber ID", "The member number exactly as issued", "Transposed digits, or the wrong plan's format"],
              ["Patient name and date of birth", "Must match payer records exactly", "Nickname instead of legal name; wrong DOB"],
              ["Insured's relationship to patient", "Self, spouse, child", "Defaulting to self for a dependent"],
              ["Diagnosis codes", "Up to twelve ICD-10-CM codes", "Invalid code, or one lacking required specificity"],
              ["Diagnosis pointer", "Links each service line to its diagnosis", "Pointing at a diagnosis not present on the claim"],
              ["Rendering provider NPI", "Who performed the service", "Missing, or the group NPI where an individual is required"],
              ["Place of service code", "Where the service occurred", "Office code used for a telehealth encounter"],
              ["Prior authorization number", "The approval reference", "Obtained but never entered"],
            ],
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Rejection",
                definition:
                  "The claim failed a format or data check and never entered adjudication. It is corrected and resubmitted as a new claim — not appealed.",
              },
              {
                term: "Denial",
                definition:
                  "The claim was adjudicated and the payer decided not to pay. This is appealed, not resubmitted.",
              },
              {
                term: "Clean claim",
                definition:
                  "A claim with no defects requiring the payer to seek more information. It starts the payer's payment clock.",
              },
              {
                term: "Clearinghouse",
                definition:
                  "An intermediary that validates claims against payer rules and routes them. Its edits catch problems before the payer sees them.",
              },
              {
                term: "NPI",
                definition:
                  "National Provider Identifier — a ten-digit number identifying a provider. Both the individual and the group have one.",
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The rejection-versus-denial distinction determines what you do next, and getting it wrong wastes weeks. A rejection never reached adjudication, so there is no decision to appeal — you fix the data and resubmit. A denial is a decision, so resubmitting the same claim gets the same denial; it must be appealed or corrected as a corrected claim. Billers who appeal rejections and resubmit denials generate a great deal of work and very little payment.",
          },
          {
            type: "knowledge-check",
            question:
              "A claim comes back from the clearinghouse the same day, flagged for an invalid subscriber ID. What is the correct next step?",
            options: [
              "File an appeal, since the payer refused the claim",
              "Correct the subscriber ID and resubmit — this is a rejection, which never reached adjudication",
              "Bill the patient, since insurance declined",
              "Write it off as uncollectible",
            ],
            correctIndex: 1,
            explanation:
              "A same-day clearinghouse rejection means the claim failed a data check and never reached the payer's adjudication system. There is no decision to appeal. Correct the identifier and resubmit it as a new claim.",
            optionRationales: [
              "There is nothing to appeal — no payer decision was ever made.",
              "Correct. Fix the data and resubmit; this is a rejection, not a denial.",
              "Insurance did not decline anything. The claim never reached them.",
              "The claim is entirely collectible once the identifier is corrected.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work from the actual form. CMS publishes the CMS-1500 and its instructions free.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Download a blank CMS-1500 and the NUCC instruction manual. Identify the box number for each field in the table above.",
          "Complete a CMS-1500 by hand for a straightforward office visit using invented, non-real patient details.",
          "Explain in three sentences the difference between a rejection and a denial, and what you would do differently for each.",
          "List five items you would build into a pre-submission checklist, chosen to catch the most common rejections.",
        ],
      },
    ],
  },
  {
    slug: "claim-scrubbing-and-submission",
    title: "Claim Scrubbing and Submission",
    description:
      "Catch errors before a claim leaves the practice, and understand the path a claim takes from submission to payment.",
    duration: "22 min",
    objectives: [
      "Explain what claim scrubbing does and why it pays for itself",
      "Describe the path from submission through adjudication to remittance",
      "Read an explanation of benefits and an electronic remittance advice",
      "Post payments and adjustments correctly",
    ],
    sections: [
      {
        heading: "Catch it before it leaves",
        blocks: [
          {
            type: "scenario",
            role: "You run the billing cycle at Lakeside Medical Associates.",
            text: "A claim rejected by the clearinghouse costs a few minutes to fix. The same error caught after the payer denies it costs weeks of turnaround and a follow-up call, and may push the claim toward its filing deadline. The error is identical; only when it was caught differs.",
            task: "Understand scrubbing well enough to make the first-pass rate the number you manage.",
          },
          {
            type: "paragraph",
            text: "Claim scrubbing runs claims against a rules engine before submission — checking code validity, required modifiers, diagnosis-to-procedure linkage, NCCI edits, and payer-specific requirements. Every error it catches is an error that never becomes a denial.",
          },
          {
            type: "table",
            caption: "The claim's journey",
            columns: ["Stage", "What happens", "Typical timing"],
            rows: [
              ["Charge entry", "Codes and charges entered", "Day of service or next day"],
              ["Scrubbing", "Rules engine checks the claim", "Immediate"],
              ["Submission", "Transmitted to the clearinghouse", "Daily batch"],
              ["Clearinghouse edits", "Format and payer-rule validation", "Same day"],
              ["Payer receipt", "Acknowledgement returned", "1-2 days"],
              ["Adjudication", "Payer decides what to pay", "7-30 days"],
              ["Remittance", "Payment and explanation returned", "With payment"],
              ["Posting", "Payment and adjustments recorded", "On receipt"],
            ],
          },
          {
            type: "paragraph",
            text: "The payer returns its decision as an explanation of benefits, or electronically as an 835 remittance advice. It shows, per service line, the billed amount, the allowed amount, the contractual adjustment, what the plan paid, and what the patient owes — along with reason codes explaining any reduction.",
          },
          {
            type: "worked-example",
            title: "Posting a remittance correctly",
            task: "Post a line showing billed $340, allowed $186, plan paid $148.80, patient responsibility $37.20.",
            steps: [
              {
                move: "Post the payment of $148.80 against the claim.",
                why: "The actual money received. Straightforward, and the part everyone gets right.",
              },
              {
                move: "Post the $154 difference as a contractual adjustment.",
                why: "Billed minus allowed. This is written off under the payer contract and may never be billed to the patient — posting it as anything else, or leaving it as an open balance, misstates the practice's receivables and risks an improper patient bill.",
              },
              {
                move: "Move the $37.20 to patient responsibility.",
                why: "The coinsurance or deductible portion becomes the patient's balance and enters the patient billing cycle. Leaving it against insurance means it is never billed to anyone.",
              },
              {
                move: "Read the reason codes even when the line paid as expected.",
                why: "Reason codes explain reductions and often flag a pattern — a modifier consistently missing, a code repeatedly bundled. Posting mechanically without reading them means you fix individual claims and never the cause producing them.",
              },
            ],
            result:
              "The account balances to zero against insurance, with $37.20 correctly owed by the patient.",
            takeaway:
              "Payment, contractual adjustment, patient responsibility. Read the reason codes — they are where the recurring problems announce themselves.",
          },
          {
            type: "knowledge-check",
            question:
              "Why is a claim error caught by a scrubber far cheaper than the same error caught by the payer?",
            options: [
              "Scrubbers charge less per claim than payers do",
              "The scrubbed claim is corrected in minutes and still submits on time, while a payer denial costs weeks of turnaround and consumes filing-limit time",
              "Payers charge a penalty for denied claims",
              "Scrubbed claims are paid at a higher rate",
            ],
            correctIndex: 1,
            explanation:
              "The error is identical; the cost is entirely in when it is caught. A scrubber rejection is fixed the same day. A payer denial arrives weeks later, requires rework and follow-up, and consumes time against the timely filing limit — occasionally enough that the claim becomes uncollectible.",
            optionRationales: [
              "Payers do not charge per claim. The cost is staff time and delay.",
              "Correct. The difference is turnaround time and filing-limit exposure.",
              "Payers do not levy penalties for denials.",
              "The allowed amount comes from the contract and does not change based on how cleanly the claim arrived.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice reading a remittance, which is most of a biller's daily work.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find a sample explanation of benefits online. Identify the billed amount, allowed amount, contractual adjustment, plan payment, and patient responsibility for one line.",
          "Research CARC and RARC codes. Explain what each set is for and find three examples of each.",
          "For a line showing billed $500, allowed $300, paid $240, calculate the contractual adjustment and the patient responsibility, and state what percentage coinsurance that implies.",
          "Describe a weekly routine for reviewing reason codes across all remittances, and say what you would be looking for.",
        ],
      },
    ],
  },
];
