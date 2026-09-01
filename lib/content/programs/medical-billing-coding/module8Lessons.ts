import { Lesson } from "@/types/lesson";

export const module8Lessons: Lesson[] = [
  {
    slug: "hipaa-for-billing",
    title: "HIPAA for Billing and Coding",
    description:
      "Understand the privacy and security obligations that govern everything a billing professional touches.",
    duration: "24 min",
    objectives: [
      "Identify what counts as protected health information",
      "Apply the minimum necessary standard",
      "Explain what disclosures are permitted for payment operations",
      "Recognize a breach and know the reporting obligation",
    ],
    sections: [
      {
        heading: "You handle protected information all day",
        blocks: [
          {
            type: "scenario",
            role: "You work in billing at Lakeside Medical Associates.",
            text: "In one morning you handle a patient's name, date of birth, diagnosis codes, dates of service, insurance identifiers, and payment history. Every one of those is protected health information, and the fact that your work is administrative rather than clinical changes nothing about your obligations.",
            task: "Understand what you are handling and the rules that govern it.",
          },
          {
            type: "paragraph",
            text: "Protected health information is individually identifiable health information held or transmitted by a covered entity. Billing data is squarely within it — a claim links a person to a diagnosis, which is exactly the kind of association the rules exist to protect.",
          },
          {
            type: "paragraph",
            text: "HIPAA permits disclosure without patient authorization for treatment, payment, and health care operations. Billing sits in the payment category, which is why you may send a claim carrying a diagnosis to a payer. That permission is specific, not general: it covers what payment requires and nothing beyond it.",
          },
          {
            type: "table",
            caption: "The minimum necessary standard in practice",
            columns: ["Situation", "Appropriate", "Not appropriate"],
            rows: [
              [
                "Submitting a claim",
                "The codes and identifiers the claim requires",
                "The complete clinical record attached by default",
              ],
              [
                "Responding to a payer records request",
                "Records for the dates and services in question",
                "The entire chart because it is easier to send",
              ],
              [
                "Discussing an account with a colleague",
                "What they need to resolve the issue",
                "Details unrelated to the question",
              ],
              [
                "Looking up a record",
                "Accounts you are assigned to work",
                "A neighbour's or coworker's record out of curiosity",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Accessing a record you have no work reason to see is a violation even if you tell no one and change nothing. Access is logged, audits are routine, and curiosity about a coworker's, neighbour's, or public figure's record is among the most common causes of termination in healthcare administration. There is no version of this that is harmless.",
          },
          {
            type: "paragraph",
            text: "A breach is an impermissible use or disclosure that compromises the security or privacy of protected health information. Emailing a claim to the wrong address, leaving a report on a printer, discussing an account where it can be overheard, and losing an unencrypted device all qualify. Report a suspected breach immediately to your privacy officer — the reporting obligation has deadlines, and delay makes every outcome worse.",
          },
          {
            type: "knowledge-check",
            question:
              "A payer requests records to support one claim for a single date of service. What should be sent?",
            options: [
              "The complete patient chart, so the reviewer has full context",
              "Only the records for the date of service and the services at issue",
              "Nothing without written patient authorization",
              "A summary written by the biller rather than the actual records",
            ],
            correctIndex: 1,
            explanation:
              "The minimum necessary standard limits disclosure to what the purpose requires. The purpose is supporting one claim, so records for that date and those services are appropriate. Sending the whole chart discloses far more than the payer needs or is entitled to.",
            optionRationales: [
              "Sending the full chart exceeds minimum necessary and discloses unrelated information.",
              "Correct. Disclose what the specific purpose requires and no more.",
              "Disclosure for payment purposes does not require separate patient authorization.",
              "A biller's summary is not the medical record and cannot substitute for it in a payer review.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Apply the standard to situations you will actually face.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List the eighteen HIPAA identifiers. Note which ones appear on a routine claim.",
          "For each of these, decide whether it is a breach and justify it: a claim emailed to the wrong payer address; a report left on a shared printer overnight; discussing an account with the treating provider; looking up a coworker's balance out of concern for them.",
          "Write a three-sentence description of the minimum necessary standard as you would explain it to a new colleague.",
          "Find your organization's or a sample breach reporting procedure. Note who to contact and within what timeframe.",
        ],
      },
    ],
  },
  {
    slug: "fraud-abuse-and-compliance",
    title: "Fraud, Abuse, and Compliance",
    description:
      "Understand the laws governing claim submission, the difference between an error and fraud, and what to do when you are asked to code something you cannot support.",
    duration: "26 min",
    objectives: [
      "Distinguish fraud from abuse from an honest error",
      "Describe the major laws governing healthcare claims",
      "Identify common fraudulent billing patterns",
      "Know how to respond when asked to submit something unsupportable",
    ],
    sections: [
      {
        heading: "Intent is what separates error from fraud",
        blocks: [
          {
            type: "scenario",
            role: "You code for a provider at Lakeside Medical Associates.",
            text: "A provider asks you to change a 99213 to a 99215 on a note that plainly does not support it, saying the visit 'felt like a level five' and the practice is behind on revenue. Refusing is uncomfortable. Complying would make you a participant in submitting a false claim, and 'my supervisor told me to' has never been a defence.",
            task: "Know the law well enough to recognize the line, and know the process for what to do when you are asked to cross it.",
          },
          {
            type: "table",
            caption: "Error, abuse, and fraud",
            columns: ["", "Means", "Example"],
            rows: [
              [
                "Error",
                "An unintentional mistake",
                "A transposed code digit; a modifier omitted in haste",
              ],
              [
                "Abuse",
                "Practices inconsistent with sound billing that result in unnecessary cost, without proven intent to deceive",
                "Systematically billing a higher level without deliberate falsification",
              ],
              [
                "Fraud",
                "Knowing misrepresentation to obtain payment not entitled to",
                "Billing for services never rendered; deliberately upcoding",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "The distinction turns largely on knowledge and intent. Errors are expected and corrected. Fraud requires knowing that the claim misrepresents what happened — which is why a coder who understands the rules and submits anyway is in a very different position from one who made a mistake.",
          },
          {
            type: "table",
            caption: "The laws that apply",
            columns: ["Law", "Prohibits", "Note"],
            rows: [
              [
                "False Claims Act",
                "Knowingly submitting false claims to the government",
                "Substantial per-claim penalties plus multiplied damages; includes whistleblower provisions",
              ],
              [
                "Anti-Kickback Statute",
                "Paying or receiving anything of value for referrals of federally funded services",
                "Criminal statute; intent-based",
              ],
              [
                "Stark Law",
                "Physician referrals to entities they have a financial relationship with, for designated services",
                "Strict liability — intent is not required",
              ],
              [
                "HIPAA",
                "Improper use and disclosure of protected health information",
                "Civil and, for knowing misuse, criminal penalties",
              ],
              [
                "Exclusion authority",
                "Excluded individuals participating in federal programs",
                "Exclusion effectively ends a healthcare career",
              ],
            ],
          },
          {
            type: "table",
            caption: "Patterns that draw scrutiny",
            columns: ["Pattern", "What it is"],
            rows: [
              ["Upcoding", "Reporting a higher-paying code than the documentation supports"],
              ["Unbundling", "Billing components separately when a comprehensive code exists"],
              ["Billing for services not rendered", "Claiming work that never happened"],
              ["Misrepresenting the provider", "Billing a mid-level provider's service under a physician's NPI improperly"],
              ["Cloned documentation", "Identical notes across encounters, suggesting they do not reflect real visits"],
              ["Routine waiver of copays", "Systematically not collecting patient responsibility"],
            ],
          },
          {
            type: "worked-example",
            title: "When you are asked to code something unsupportable",
            task: "Respond to a provider's request to change a 99213 to a 99215 on documentation that does not support it.",
            steps: [
              {
                move: "Assume good faith and treat it as a documentation question first.",
                why: "Providers are often genuinely unaware of what the level requires, and the visit may well have involved work that was simply not written down. Framing it as 'the note does not currently support 99215 — was there more?' opens the legitimate route rather than starting a confrontation.",
              },
              {
                move: "Offer the proper mechanism: amend the documentation.",
                why: "If the work genuinely occurred, the provider may amend the note through the record's amendment process, with the amendment dated and attributed. A properly amended note supporting the higher level makes the higher code correct. This is the real solution, and it is available.",
              },
              {
                move: "If the answer is that the work did not occur, decline clearly and without hostility.",
                why: "'I can't code above what the documentation supports' is a complete answer. You are not accusing anyone; you are stating the rule you work by. Most requests end here.",
              },
              {
                move: "If pressed, escalate through the compliance process rather than deciding alone.",
                why: "Every practice should have a compliance officer or designated escalation route. Using it protects the practice, the provider, and you — and creates a record that you raised it, which matters a great deal if the pattern is later investigated.",
              },
              {
                move: "Document what was asked and what you did.",
                why: "A dated note of the request and your response is your protection. In a False Claims Act investigation, the question of who knew what becomes central, and contemporaneous records are worth far more than recollection.",
              },
            ],
            result:
              "Either a properly amended note supporting the higher code, or the original code standing, with the exchange documented.",
            takeaway:
              "Treat it as a documentation question, offer the legitimate route, decline clearly if there is none, escalate rather than deciding alone, and write it down.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Following instructions is not a defence. A coder who submits a claim they know the documentation does not support has knowingly participated in submitting a false claim, regardless of who directed it. The False Claims Act also has whistleblower provisions, meaning colleagues have both protection and financial incentive to report. Your signature on the work is yours.",
          },
          {
            type: "knowledge-check",
            question:
              "A provider directs you to bill a level of service the documentation does not support. You comply. What is your position?",
            options: [
              "Protected, since you were following a supervisor's direction",
              "Exposed — knowingly submitting a claim the documentation does not support is participating in a false claim, whoever directed it",
              "Responsible only if the payer detects it",
              "Not responsible, since the provider is accountable for the documentation",
            ],
            correctIndex: 1,
            explanation:
              "Liability under the False Claims Act attaches to knowingly submitting a false claim. A coder who understands the rules and submits anyway has the requisite knowledge, and direction from a supervisor does not remove it. The correct response is to offer the amendment route and escalate through compliance.",
            optionRationales: [
              "Following orders is not a recognized defence to knowingly submitting a false claim.",
              "Correct. Knowledge is what creates exposure, and you had it.",
              "Liability arises from the submission, not from whether it is caught.",
              "The provider is accountable for documentation, and the coder is accountable for coding to it. Both are exposed.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Know the process before you need it.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Research the seven elements of an effective compliance program as described by the OIG. Summarize each in one sentence.",
          "Find the OIG exclusion list (LEIE) and describe what it is used for and how often a practice should check it.",
          "Write out, word for word, what you would say to a provider asking you to code above the documentation. Keep it to three sentences and make it non-confrontational.",
          "Describe the escalation path you would follow if the request were repeated after you declined, and what you would document at each step.",
        ],
      },
    ],
  },
];
