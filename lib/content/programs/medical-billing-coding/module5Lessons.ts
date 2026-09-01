import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "eligibility-and-authorization",
    title: "Eligibility Verification and Prior Authorization",
    description:
      "Do the front-end work that prevents most denials, and understand the difference between coverage, authorization, and medical necessity.",
    duration: "24 min",
    objectives: [
      "Verify eligibility and interpret what a verification actually confirms",
      "Explain when prior authorization is required and how to obtain it",
      "Distinguish coverage, authorization, and medical necessity",
      "Use an ABN correctly for Medicare patients",
    ],
    sections: [
      {
        heading: "The cheapest denial is the one never generated",
        blocks: [
          {
            type: "scenario",
            role: "You work the front desk at Lakeside Medical Associates.",
            text: "In Module 1 you found that 112 of last month's 138 denials originated before the patient was ever seen — eligibility, authorization, and missing information. Every one of those was preventable in the ninety seconds before the appointment, and each now costs far more to work than it would have cost to prevent.",
            task: "Learn the front-end checks that stop denials being generated at all.",
          },
          {
            type: "paragraph",
            text: "Eligibility verification confirms that the patient's coverage is active on the date of service and that your practice is in network. It is done electronically in seconds through a clearinghouse or payer portal, and it should happen twice: at scheduling, and again at check-in, because coverage changes between the two.",
          },
          {
            type: "table",
            caption: "What to verify, and why each matters",
            columns: ["Check", "Confirms", "Denial it prevents"],
            rows: [
              ["Policy active on the date of service", "Coverage has not lapsed", "Coverage terminated"],
              ["Member ID and group number", "The claim will route correctly", "Invalid subscriber information"],
              ["In-network status", "Contracted rates apply", "Out-of-network reduction or denial"],
              ["Copay, deductible, coinsurance", "What to collect at the desk", "Uncollected patient balance"],
              ["Prior authorization requirements", "Whether approval is needed first", "No authorization on file"],
              ["Referral requirements", "Whether a referral is needed", "No referral on file"],
            ],
          },
          {
            type: "paragraph",
            text: "Three things are commonly conflated and are genuinely different. Coverage means the plan includes this benefit. Authorization means the payer has approved this specific service in advance. Medical necessity means the service was appropriate for the patient's documented condition. A service can be covered, authorized, and still denied for medical necessity if the documentation does not support it.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "An eligibility verification is not a guarantee of payment, and payers say so explicitly in their responses. It confirms coverage was active when you checked. The claim can still be denied for medical necessity, for a non-covered service, or because the patient's deductible absorbed the payment. Verification reduces risk substantially; it does not eliminate it, and telling a patient 'your insurance will cover this' overstates what you actually know.",
          },
          {
            type: "worked-example",
            title: "Handling a service Medicare may not cover",
            task: "A Medicare patient is scheduled for a service you believe Medicare will consider not reasonable and necessary.",
            steps: [
              {
                move: "Confirm the likely non-coverage before the service, not after.",
                why: "Check the applicable coverage determination. Discovering non-coverage after delivery means the practice either absorbs the cost or bills a patient who was never warned — and the second option is where complaints come from.",
              },
              {
                move: "Issue an Advance Beneficiary Notice of Noncoverage and have the patient sign it.",
                why: "The ABN is a specific CMS form telling the patient Medicare may not pay and that they may be responsible. Without it, you generally cannot bill the patient when Medicare denies. It must be given before the service and must state a genuine reason.",
              },
              {
                move: "Append modifier GA to the claim line.",
                why: "GA tells Medicare a signed waiver is on file. It is what preserves the practice's ability to bill the patient after the denial, and omitting it means the denial lands on the practice.",
              },
              {
                move: "Never issue blanket ABNs routinely to every patient.",
                why: "Routine ABNs issued without a specific expectation of non-coverage are invalid, and CMS treats the practice as one. The form exists to inform a patient about a particular service, not to shift all risk onto patients as a matter of policy.",
              },
            ],
            result:
              "The patient is informed before the service, and the practice retains the right to bill them if Medicare denies.",
            takeaway:
              "The ABN protects the patient's right to decide and the practice's right to bill. It only works when it is specific, signed in advance, and flagged with modifier GA.",
          },
          {
            type: "knowledge-check",
            question:
              "You verify eligibility and the payer confirms active coverage. The claim is later denied for medical necessity. What went wrong?",
            options: [
              "The eligibility verification was performed incorrectly",
              "Nothing about the verification — eligibility confirms coverage, not that a specific service was appropriate for the documented condition",
              "The payer is obligated to pay, since coverage was confirmed",
              "Prior authorization was obtained but not recorded",
            ],
            correctIndex: 1,
            explanation:
              "Eligibility, authorization, and medical necessity are three separate determinations. Confirming coverage was active says nothing about whether the documentation supports this particular service for this patient's condition. The next step is to review the documentation and consider an appeal.",
            optionRationales: [
              "The verification did what it does. It was never a medical necessity determination.",
              "Correct. Coverage, authorization, and medical necessity are separate questions.",
              "Payer responses explicitly state that verification is not a guarantee of payment.",
              "Authorization is also separate from medical necessity — an authorized service can still be denied on necessity grounds.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build the front-end process that prevents the denials you costed in Module 1.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a front-desk verification checklist covering every item in the table above, formatted so someone could work through it in ninety seconds.",
          "Research the CMS ABN form (CMS-R-131). Note the three things the form must state to be valid.",
          "Explain in three sentences the difference between coverage, authorization, and medical necessity, using an example of a service that could fail each one.",
          "Given 61 eligibility denials and 29 authorization denials last month, write a two-paragraph recommendation to the practice manager naming what you would change and how you would measure it.",
        ],
      },
    ],
  },
  {
    slug: "payer-rules-and-fee-schedules",
    title: "Payer Rules and Fee Schedules",
    description:
      "Understand how payers decide what to pay, and why the same service produces different payments from different plans.",
    duration: "22 min",
    objectives: [
      "Explain what a fee schedule is and how allowed amounts are set",
      "Describe how Medicare's RBRVS system works at a practical level",
      "Explain timely filing limits and why they are absolute",
      "Read a payer contract for the terms that affect billing",
    ],
    sections: [
      {
        heading: "The contract sets the price",
        blocks: [
          {
            type: "scenario",
            role: "You reconcile payments at Lakeside Medical Associates.",
            text: "The same office visit code produces $186 from one payer, $142 from another, and $109 from Medicaid. Nothing about the encounters differed. Three contracts set three prices, and the practice agreed to all three.",
            task: "Understand where allowed amounts come from, so you can tell an underpayment from a contracted rate.",
          },
          {
            type: "paragraph",
            text: "A fee schedule is the list of allowed amounts a payer will pay for each code. In-network providers agree to accept it as payment in full and write off the difference from their charge. This is why the billed amount is largely a starting figure — the contract, not the charge, determines the money.",
          },
          {
            type: "paragraph",
            text: "Medicare sets its fee schedule using the Resource-Based Relative Value Scale. Each code carries relative value units reflecting physician work, practice expense, and malpractice risk. Those are adjusted geographically and multiplied by a national conversion factor to produce a dollar amount. Many commercial payers set their rates as a percentage of Medicare, which is why Medicare's annual changes ripple across the whole payer mix.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Timely filing limits are absolute and unforgiving. A payer may allow 90 days from the date of service, or 180, or a year — but past that deadline the claim is denied and generally cannot be appealed on any grounds, because the failure was the practice's. A clean claim worth $1,200 that sits unworked for four months is worth nothing. This is why aged accounts receivable matters so much: old claims are not just harder to collect, some become uncollectible by rule.",
          },
          {
            type: "table",
            caption: "Contract terms that affect daily billing",
            columns: ["Term", "Why it matters"],
            rows: [
              ["Fee schedule", "The allowed amount for every code you bill"],
              ["Timely filing limit", "The deadline past which a claim cannot be paid"],
              ["Appeal window and levels", "How long you have to dispute, and how many attempts"],
              ["Authorization requirements", "Which services need approval in advance"],
              ["Clean claim definition", "What the payer must receive before its payment clock starts"],
              ["Payment turnaround", "When you can reasonably begin following up"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "A clean, correctly coded claim for $1,200 is discovered unworked four months after the date of service. The payer's timely filing limit is 90 days. What is the realistic outcome?",
            options: [
              "It will be paid, since the claim itself is correct",
              "It will be denied for untimely filing, and generally cannot be appealed because the delay was the practice's",
              "It can be resubmitted with a corrected date of service",
              "The patient becomes responsible for the full amount",
            ],
            correctIndex: 1,
            explanation:
              "Timely filing is a contractual deadline, not a quality judgment about the claim. Past it the payer owes nothing, and appeals on grounds of practice delay do not succeed. This is why unworked claims aging in accounts receivable represent permanent revenue loss rather than delayed revenue.",
            optionRationales: [
              "Correctness does not matter once the filing deadline has passed.",
              "Correct. The claim is denied as untimely, and the practice absorbs the loss.",
              "Altering the date of service to defeat a filing limit is falsification of a claim — a serious offence, not a workaround.",
              "The patient is not responsible for the practice's failure to file on time, and billing them for it is generally prohibited by the payer contract.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work with real numbers and real contract terms.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the current Medicare Physician Fee Schedule lookup tool on the CMS website. Look up the allowed amount for a common office visit code in your locality.",
          "Explain in three sentences how RVUs and the conversion factor produce that dollar amount.",
          "Research typical timely filing limits for three payer types. Note the range and where you found each.",
          "Design a simple weekly report a biller could run to catch claims approaching a filing deadline, and say what it would need to show.",
        ],
      },
    ],
  },
];
