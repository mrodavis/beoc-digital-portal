import { Lesson } from "@/types/lesson";

export const module7Lessons: Lesson[] = [
  {
    slug: "working-denials",
    title: "Working Denials",
    description:
      "Read a denial, identify its real cause, and decide between correcting, appealing, and writing it off.",
    duration: "26 min",
    objectives: [
      "Interpret denial reason codes",
      "Categorize denials by root cause and by whether they are preventable",
      "Choose between a corrected claim, an appeal, and a write-off",
      "Prioritize a denial queue by recoverable value",
    ],
    sections: [
      {
        heading: "A denial is information about a process",
        blocks: [
          {
            type: "scenario",
            role: "You inherit the denial queue at Lakeside Medical Associates.",
            text: "There are 138 denials worth $47,000. Working them oldest-first would be reasonable if they were equivalent. They are not: some are worth $40 and some $3,000, some are five days from a filing deadline, and roughly a third are eligibility denials with no realistic prospect of recovery.",
            task: "Work the queue by recoverable value and deadline rather than by date order.",
          },
          {
            type: "paragraph",
            text: "Every denial carries reason codes. Claim Adjustment Reason Codes state why the amount was reduced; Remittance Advice Remark Codes add detail. Reading them is the first step, and the code frequently names the fix directly.",
          },
          {
            type: "table",
            caption: "Common denial categories and what to do",
            columns: ["Category", "Usually means", "Action"],
            rows: [
              [
                "Eligibility / coverage terminated",
                "Coverage was not active on the date of service",
                "Check for other coverage; often becomes patient responsibility. Rarely appealable",
              ],
              [
                "No prior authorization",
                "Required approval was not obtained",
                "Request retroactive authorization if the payer permits; appeal with clinical justification",
              ],
              [
                "Medical necessity",
                "Documentation does not support the service",
                "Appeal with records if the documentation does support it; otherwise the denial stands",
              ],
              [
                "Bundling / NCCI edit",
                "Two codes should not be billed together",
                "Review whether a modifier is genuinely warranted. Do not add one reflexively",
              ],
              [
                "Duplicate claim",
                "Payer already has this claim",
                "Check status before resubmitting — usually the original is still processing",
              ],
              [
                "Timely filing",
                "Submitted past the deadline",
                "Generally not recoverable. Investigate why it aged",
              ],
              [
                "Non-covered service",
                "The plan excludes this benefit",
                "Bill the patient if an ABN or equivalent notice is on file",
              ],
            ],
          },
          {
            type: "worked-example",
            title: "Prioritizing a 138-claim denial queue",
            task: "Decide the order to work $47,000 of denials with limited staff time.",
            steps: [
              {
                move: "Sort by days remaining until the appeal or filing deadline.",
                why: "Deadlines are absolute. A $3,000 claim five days from its appeal window is worth more attention today than a $3,000 claim with ninety days left, because one becomes worthless on a known date and the other does not.",
              },
              {
                move: "Within that, sort by dollar value.",
                why: "Staff time is the constraint. Ten minutes recovering $2,400 is a better use of it than ten minutes recovering $40 — and the small-dollar denials are usually the ones a practice should be preventing rather than working.",
              },
              {
                move: "Set aside the categories with no realistic recovery.",
                why: "Eligibility denials where coverage genuinely was not active, and timely filing denials caused by the practice, will not be paid. Working them feels productive and recovers nothing. Route them to patient billing or write-off and spend the time where recovery is possible.",
              },
              {
                move: "Group the remainder by reason code and look for patterns.",
                why: "Twenty-nine authorization denials are not twenty-nine problems; they are one process problem twenty-nine times. Fixing the front-end process stops the thirtieth, which is worth more than recovering any single claim.",
              },
              {
                move: "Report the pattern, not just the recovery total.",
                why: "'We recovered $18,000' is an outcome. 'We recovered $18,000, and 29 denials came from one gap in the authorization process that I have proposed fixing' is an outcome plus a prevention — and the second is what changes next month's numbers.",
              },
            ],
            result:
              "Deadline-critical high-value claims worked first, unrecoverable categories routed appropriately, and the root cause identified.",
            takeaway:
              "Work by deadline and value, not by date received. Then look for the pattern — denials are a symptom of a process, and the process is where the leverage is.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never resubmit an identical claim in response to a denial. The payer has already adjudicated it and will return the same decision, or reject it as a duplicate — while the appeal window continues to run. A denial requires a corrected claim, marked as such, or a formal appeal. Resubmitting is the most common way a recoverable denial becomes unrecoverable.",
          },
          {
            type: "knowledge-check",
            question:
              "You have 138 denials of varying value and deadline. What should determine the order you work them?",
            options: [
              "Oldest first, so nothing sits too long",
              "Deadline proximity first, then dollar value, setting aside categories with no realistic recovery",
              "Smallest first, to reduce the claim count quickly",
              "Alphabetically by payer, to batch phone calls",
            ],
            correctIndex: 1,
            explanation:
              "Deadlines are absolute — a claim past its appeal window is worth nothing regardless of value. Within that constraint, dollar value determines where limited staff time returns the most. Categories that cannot realistically be recovered should be routed rather than worked.",
            optionRationales: [
              "Age correlates loosely with deadline but ignores value entirely, and some old denials are already unrecoverable.",
              "Correct. Deadline, then value, with unrecoverable categories set aside.",
              "Reducing the count feels productive but leaves the largest recoverable balances at risk.",
              "Batching calls by payer helps efficiency but should operate within a deadline-and-value ordering, not replace it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice triage, which is most of what denial work actually is.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Research CARC and RARC code sets. Find the codes for medical necessity, no authorization, and timely filing.",
          "Given these denials — $2,400 medical necessity with 8 days left to appeal; $180 eligibility with 60 days; $3,100 no authorization with 45 days; $95 timely filing — rank them and justify each position.",
          "Write an appeal letter for the medical necessity denial. State the claim, the denial reason, why the documentation supports the service, and what you are asking for.",
          "For the same month's denial mix, name the single process change you would recommend and estimate what it would prevent.",
        ],
      },
    ],
  },
  {
    slug: "appeals-and-accounts-receivable",
    title: "Appeals and Accounts Receivable Follow-Up",
    description:
      "Write an appeal that succeeds, and manage accounts receivable so claims do not age into worthlessness.",
    duration: "22 min",
    objectives: [
      "Write a structured appeal letter",
      "Describe the levels of appeal available",
      "Run and interpret an A/R aging report",
      "Decide when a balance should be written off",
    ],
    sections: [
      {
        heading: "An appeal is an argument with evidence",
        blocks: [
          {
            type: "scenario",
            role: "You appeal a medical necessity denial at Lakeside Medical Associates.",
            text: "The first attempt was two sentences asking the payer to reconsider. It was upheld. The service was genuinely appropriate and the documentation supports it — the appeal simply never said so in a form the reviewer could act on.",
            task: "Write appeals that make the case rather than merely register disagreement.",
          },
          {
            type: "paragraph",
            text: "A successful appeal states what was denied, why the denial is wrong, what evidence supports that, and what you are asking for. A reviewer working through a stack of appeals should be able to reach the point in the first paragraph.",
          },
          {
            type: "table",
            caption: "Structure of an effective appeal",
            columns: ["Section", "Contains"],
            rows: [
              ["Identification", "Patient, member ID, claim number, date of service, denied amount"],
              ["The denial", "The reason code and the payer's stated reason, quoted"],
              ["The argument", "Why the denial is incorrect, tied to the documentation"],
              ["The evidence", "The records, guidelines, or policy language attached"],
              ["The request", "The specific action sought — reprocess and pay the claim"],
            ],
          },
          {
            type: "paragraph",
            text: "Most payers offer several levels of appeal, each with its own deadline. A first-level appeal is typically an internal reconsideration. A second level may involve a different reviewer or a peer-to-peer discussion with a physician. Some plans, and Medicare in particular, provide independent external review beyond that. Each level has a window, and missing one usually forecloses the rest.",
          },
          {
            type: "table",
            caption: "Reading an A/R aging report",
            columns: ["Bucket", "Interpretation", "Action"],
            rows: [
              ["0-30 days", "Normal processing", "Monitor only"],
              ["31-60 days", "Slower than expected", "Check status; confirm the payer received it"],
              ["61-90 days", "Something is wrong", "Work actively; a denial may have gone unnoticed"],
              ["91-120 days", "Recovery becoming unlikely", "Escalate; check filing and appeal deadlines"],
              ["120+ days", "Often uncollectible", "Determine whether to pursue or write off"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Writing off a balance is a decision with rules, not a way to clear a queue. A contractual adjustment is required by the payer contract. A bad debt write-off follows genuine collection effort. Writing off a collectible balance to tidy the aging report misstates the practice's revenue, and routinely waiving patient responsibility that a plan requires you to collect can violate your payer contracts and, for federal programs, implicate the anti-kickback statute. Write-offs should follow a written policy and be approved, not made ad hoc by whoever is working the queue.",
          },
          {
            type: "knowledge-check",
            question:
              "A first-level appeal on a medical necessity denial is upheld. The documentation genuinely supports the service. What is the appropriate next step?",
            options: [
              "Write the balance off, since the payer has now refused twice",
              "Escalate to the next level of appeal within its deadline, adding any evidence the first appeal lacked",
              "Bill the patient for the full amount",
              "Resubmit the original claim unchanged",
            ],
            correctIndex: 1,
            explanation:
              "A first-level denial is not the end of the process. Most payers provide further levels, often including peer-to-peer review, and each has its own deadline. If the documentation supports the service, escalating with a strengthened argument is the correct route.",
            optionRationales: [
              "Writing off a supportable claim forfeits revenue the practice legitimately earned.",
              "Correct. Escalate within the deadline and strengthen the evidence.",
              "The patient is not responsible for a payer's medical necessity determination, and billing them may breach the payer contract.",
              "Resubmitting unchanged produces the same denial or a duplicate rejection, while the appeal window runs out.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Write a real appeal and read a real aging report.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a complete appeal letter using the five-section structure, for a medical necessity denial on a service you invent. Keep it to one page.",
          "Research the appeal levels one major payer offers, and note the deadline for each.",
          "Given total A/R of $412,000 with $94,000 over 90 days, calculate the percentage over 90 days and state whether it falls inside a 15-20% target.",
          "Draft a short write-off policy naming who may approve a write-off, what documentation is required, and which categories are eligible.",
        ],
      },
    ],
  },
];
