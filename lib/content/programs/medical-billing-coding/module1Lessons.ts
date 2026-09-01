import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "what-billing-and-coding-is",
    title: "What Medical Billing and Coding Actually Is",
    description:
      "Understand the two distinct jobs behind the title, how they relate, and why a clinic cannot get paid without both being done well.",
    duration: "20 min",
    objectives: [
      "Explain the difference between medical coding and medical billing",
      "Describe how a clinical encounter becomes a paid claim",
      "Name the parties involved in a healthcare transaction and what each one wants",
      "Explain why coding accuracy is a compliance issue and not only a payment issue",
    ],
    sections: [
      {
        heading: "Two jobs, one title",
        blocks: [
          {
            type: "scenario",
            role: "You are starting as a billing specialist at Lakeside Medical Associates.",
            text: "A patient sees Dr. Okafor for persistent knee pain. The visit lasts twenty minutes, the provider examines the knee, orders an X-ray, and diagnoses osteoarthritis. Clinically the encounter is finished. Financially nothing has happened at all — and unless someone translates that visit into a specific set of codes and sends it to the right payer in the right format within the right window, the practice will never be paid for it.",
            task: "Understand the pipeline that turns a documented visit into money in the practice's account, and where you sit in it.",
          },
          {
            type: "paragraph",
            text: "The job title joins two related but genuinely different roles. A medical coder reads the clinical documentation and translates what happened into standardized codes: a diagnosis code describing the patient's condition, and a procedure code describing what the provider did. A medical biller takes those codes, attaches the patient's insurance information, produces a claim, submits it to the payer, and pursues it until it is paid or properly resolved.",
          },
          {
            type: "paragraph",
            text: "In a large hospital these are separate departments. In a practice the size of Lakeside, one person often does both, which is why the training covers both. The skills differ: coding rewards precision, patience, and comfort with reference material. Billing rewards persistence, organization, and a willingness to make the follow-up phone call nobody else wants to make.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Encounter",
                definition:
                  "A single documented interaction between a patient and a provider. Every claim begins with one.",
              },
              {
                term: "Diagnosis code",
                definition:
                  "A code describing the patient's condition — why care was needed. In the United States these come from ICD-10-CM.",
              },
              {
                term: "Procedure code",
                definition:
                  "A code describing what the provider did — the service delivered. These come from CPT and HCPCS Level II.",
              },
              {
                term: "Claim",
                definition:
                  "The formal request for payment sent to a payer, carrying the codes, the provider's identifiers, and the patient's coverage information.",
              },
              {
                term: "Payer",
                definition:
                  "Whoever is being asked to pay — a commercial insurer, Medicare, Medicaid, or in some cases the patient directly.",
              },
              {
                term: "Reimbursement",
                definition:
                  "The payment a payer makes for a covered service, which is usually a contracted rate rather than the amount billed.",
              },
            ],
          },
        ],
      },
      {
        heading: "The pipeline from visit to payment",
        blocks: [
          {
            type: "paragraph",
            text: "The sequence below is the backbone of the entire field. Every later module in this program is a detailed treatment of one or two of these steps, so it is worth learning the shape of the whole thing before going deeper into any part of it.",
          },
          {
            type: "table",
            caption: "How an encounter becomes revenue",
            columns: ["Step", "What happens", "Who does it"],
            rows: [
              [
                "1. Pre-registration",
                "Demographics and insurance are captured and verified before the visit",
                "Front desk",
              ],
              [
                "2. Eligibility and authorization",
                "Coverage is confirmed; prior authorization obtained if the payer requires it",
                "Front desk or billing",
              ],
              [
                "3. The encounter",
                "The provider delivers and documents care",
                "Provider",
              ],
              [
                "4. Coding",
                "Documentation is translated into diagnosis and procedure codes",
                "Coder",
              ],
              [
                "5. Charge entry",
                "Codes and charges are entered into the practice management system",
                "Biller or coder",
              ],
              [
                "6. Claim scrubbing",
                "The claim is checked against payer rules before it goes out",
                "Billing software and biller",
              ],
              [
                "7. Submission",
                "The claim is transmitted, usually electronically through a clearinghouse",
                "Biller",
              ],
              [
                "8. Adjudication",
                "The payer decides what to pay, reduce, or deny",
                "Payer",
              ],
              [
                "9. Payment posting",
                "Payment and adjustments are recorded against the account",
                "Biller",
              ],
              [
                "10. Denial follow-up",
                "Denied or underpaid claims are corrected, appealed, or written off",
                "Biller",
              ],
              [
                "11. Patient billing",
                "The remaining patient responsibility is billed and collected",
                "Biller",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Notice that steps 1 and 2 happen before the patient is ever seen. A large share of denials trace back to something that went wrong at the front desk — an expired policy, a transposed member number, a missing authorization. Billing problems are very often registration problems that took three weeks to become visible.",
          },
        ],
      },
      {
        heading: "Why accuracy is a compliance matter",
        blocks: [
          {
            type: "paragraph",
            text: "It is tempting to think of coding as a revenue exercise where higher codes are better. That framing is both wrong and genuinely dangerous. A code is a factual assertion about what happened to a patient, submitted to a payer that may be a federal program. Submitting a code the documentation does not support is a false claim, and the consequences are not limited to the money being recouped.",
          },
          {
            type: "table",
            caption: "The two ways coding goes wrong",
            columns: ["Error", "What it means", "Consequence"],
            rows: [
              [
                "Upcoding",
                "Reporting a more complex or expensive service than was documented",
                "Overpayment recovery, penalties under the False Claims Act, exclusion from federal programs",
              ],
              [
                "Undercoding",
                "Reporting a lower level of service than was documented",
                "Lost revenue, and a distorted record of the patient's care and the practice's case mix",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "Undercoding is sometimes treated as the safe error. It is not. It misrepresents the care delivered just as upcoding does, it starves the practice of revenue it legitimately earned, and a pattern of it can itself attract attention. The goal is never the highest code or the lowest code. It is the code the documentation supports.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "The governing principle of this entire field is one sentence: if it was not documented, it was not done. A coder codes from the documentation, not from what they assume happened, not from what the provider says in the hallway, and not from what would pay better. When the documentation does not support a code, the correct action is to query the provider — never to code what you believe they meant.",
          },
          {
            type: "knowledge-check",
            question:
              "A provider tells you verbally that an office visit involved a detailed examination, but the note in the chart documents only a brief exam. What should you do?",
            options: [
              "Code the higher level of service, since the provider confirmed what happened",
              "Code from the documentation as written, and query the provider to amend the note if the exam was more extensive",
              "Code the lower level and say nothing, since undercoding is always safe",
              "Split the difference and code a mid-level visit",
            ],
            correctIndex: 1,
            explanation:
              "Coders code from the documentation. If the record does not support the higher level, the fix is a provider query that gives the provider the opportunity to amend the note properly — not a coding decision that papers over the gap. If the note is amended appropriately, the higher code becomes supportable; if it is not amended, the documented level stands.",
            optionRationales: [
              "A verbal statement is not documentation. Coding above what the record supports is upcoding, regardless of what you were told.",
              "Correct. Code what is documented, and query the provider so the record can be corrected through the proper process if the care was genuinely more extensive.",
              "Undercoding is not safe. It misrepresents the encounter and costs the practice revenue it legitimately earned, and doing it knowingly is its own problem.",
              "There is no averaging in coding. The level of service is determined by what the documentation supports, not by compromise.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Trace a single encounter through the whole pipeline in writing, in your own words.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Invent a straightforward encounter: a patient with a sore throat sees a provider, who examines them and performs a rapid strep test. Write three sentences describing what happened clinically.",
          "For each of the eleven pipeline steps, write one sentence describing what happens to this specific encounter at that step. Where you do not yet know the detail, write what question you would need answered.",
          "Identify the two steps in your list where you think an error would be most expensive to fix later, and explain why in a sentence each.",
          "Write down one question about this pipeline that you cannot yet answer. Keep the list — by the end of this program you should be able to answer it, and checking back is a good measure of your progress.",
        ],
      },
    ],
  },
  {
    slug: "the-revenue-cycle",
    title: "The Revenue Cycle and Where Money Is Lost",
    description:
      "Follow the money through a medical practice, and learn where revenue actually leaks — usually far earlier in the process than people expect.",
    duration: "20 min",
    objectives: [
      "Define the revenue cycle and its front-end, middle, and back-end phases",
      "Explain what a clean claim is and why the first-pass rate matters",
      "Interpret days in accounts receivable as a measure of practice health",
      "Identify the front-end failures that cause the majority of back-end denials",
    ],
    sections: [
      {
        heading: "Revenue cycle management",
        blocks: [
          {
            type: "scenario",
            role: "You review last quarter's numbers at Lakeside Medical Associates.",
            text: "The practice billed $840,000 and collected $611,000. The gap is not one large problem. It is roughly nine hundred small ones: claims denied for eligibility, claims paid at a lower rate than expected, patient balances never collected, and a stack of claims that quietly aged past the filing deadline and can no longer be submitted at all.",
            task: "Learn to see the revenue cycle as a system with measurable leak points, rather than as a pile of individual claims.",
          },
          {
            type: "paragraph",
            text: "Revenue cycle management is the discipline of running that whole pipeline as a system. The important insight — and it is genuinely counter-intuitive when you start — is that most revenue is lost at the front end, but the loss only becomes visible at the back end, weeks later, when a denial arrives.",
          },
          {
            type: "table",
            caption: "The three phases",
            columns: ["Phase", "Covers", "Typical failure"],
            rows: [
              [
                "Front end",
                "Scheduling, registration, eligibility, authorization, point-of-service collection",
                "Wrong or expired insurance captured; authorization never obtained",
              ],
              [
                "Middle",
                "Clinical documentation, coding, charge capture",
                "A service delivered but never charged; documentation that does not support the code",
              ],
              [
                "Back end",
                "Claim submission, payment posting, denials, appeals, patient collections",
                "Claims not worked before the filing deadline; denials written off instead of appealed",
              ],
            ],
          },
        ],
      },
      {
        heading: "The measures that tell you the truth",
        blocks: [
          {
            type: "paragraph",
            text: "A practice's billing health can be read from a handful of numbers. Learning to interpret them is what separates someone who processes claims from someone who can tell a practice manager what is actually wrong.",
          },
          {
            type: "table",
            caption: "Core revenue cycle metrics",
            columns: ["Metric", "What it measures", "What good looks like"],
            rows: [
              [
                "Clean claim rate",
                "Share of claims accepted on first submission with no edits",
                "Commonly targeted at 95% or better",
              ],
              [
                "First-pass resolution rate",
                "Share of claims paid on the first submission",
                "Higher is better; a low rate points to front-end or coding problems",
              ],
              [
                "Days in A/R",
                "Average days from service to payment",
                "Often targeted under 40 days for a physician practice",
              ],
              [
                "A/R over 90 days",
                "Share of receivables aged past 90 days",
                "Commonly targeted under 15-20%; older debt is much harder to collect",
              ],
              [
                "Denial rate",
                "Share of claims denied",
                "Frequently targeted under 5-10%",
              ],
              [
                "Net collection rate",
                "Share of collectible revenue actually collected",
                "Often targeted at 95% or better",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "These benchmarks vary by specialty, payer mix, and who is publishing them, so treat them as orientation rather than as fixed standards. What matters more than hitting any specific number is the trend: a denial rate climbing from 6% to 11% over two quarters is a problem worth investigating regardless of what the industry average happens to be.",
          },
          {
            type: "worked-example",
            title: "Reading a denial report",
            task: "Last month Lakeside submitted 1,200 claims. 138 were denied. Sorted by reason: 61 eligibility or coverage, 29 missing prior authorization, 22 missing or invalid information, 14 non-covered service, 12 coding errors. Where is the actual problem?",
            steps: [
              {
                move: "Calculate the denial rate: 138 of 1,200 is 11.5%.",
                why: "The rate frames the size of the problem before you look at causes. At 11.5%, roughly one claim in nine is failing — well above where most practices want to be, and enough to explain a meaningful revenue gap on its own.",
              },
              {
                move: "Group the reasons by which phase of the cycle owns them.",
                why: "Eligibility, authorization, and missing information are all front-end failures. That is 112 of 138 denials — over 80% — originating before the patient was ever seen. Only 12 are coding errors.",
              },
              {
                move: "Resist the instinct to retrain the coders.",
                why: "Coding is the smallest category here, and it is where people usually look first because it is the most visible. The data says the leverage is at registration and authorization. Fixing the right 20% of the problem while ignoring the 80% is a common and expensive mistake.",
              },
              {
                move: "Convert the finding into a specific front-desk change.",
                why: "Verifying eligibility electronically at scheduling and again at check-in addresses the largest single category. A recommendation naming the step, the owner, and the expected effect is actionable; 'we should reduce denials' is not.",
              },
            ],
            result:
              "A recommendation to add a two-point eligibility check at the front desk, targeting the 61 eligibility denials and a share of the 29 authorization denials.",
            takeaway:
              "Denials surface at the back end and originate at the front end. Always group denial reasons by the phase that caused them before deciding what to fix.",
          },
          {
            type: "knowledge-check",
            question:
              "A practice has a denial rate of 12%, and most denials cite eligibility or missing authorization. Where should improvement effort be focused?",
            options: [
              "On the coding team, since coding accuracy drives claim acceptance",
              "On the front-end registration and verification process, where those denials originate",
              "On hiring more staff to work denials after they arrive",
              "On appealing every denial more aggressively",
            ],
            correctIndex: 1,
            explanation:
              "Eligibility and authorization denials are caused before the encounter, at registration and scheduling. Working them after the fact is expensive rework; verifying coverage and obtaining authorization up front prevents the denial from ever being generated.",
            optionRationales: [
              "Coding is not implicated by these denial reasons. Retraining coders would not touch the actual cause.",
              "Correct. These denials originate at the front end, so that is where the fix belongs.",
              "More staff working denials treats the symptom. It increases cost without reducing the number of denials generated.",
              "Appeals recover some revenue but are slow and often unsuccessful for eligibility denials — if coverage genuinely was not active, there is nothing to appeal.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice reading the numbers rather than the individual claims.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "A practice submits 800 claims in a month. 736 are accepted on first submission. Calculate the clean claim rate and state whether it meets a 95% target.",
          "Total A/R is $412,000, of which $94,000 is over 90 days old. Calculate the percentage over 90 days and say whether it falls inside a 15-20% target range.",
          "Denials for the month: 34 eligibility, 18 authorization, 11 duplicate claim, 9 coding, 6 non-covered. Group them by revenue cycle phase and state which phase owns the largest share.",
          "Write a three-sentence recommendation to the practice manager naming the single change you would make first, the denial categories it would affect, and how you would measure whether it worked.",
        ],
      },
    ],
  },
  {
    slug: "the-players-and-their-rules",
    title: "Payers, Providers, and Patients",
    description:
      "Learn who the parties in a healthcare transaction are, what each one is trying to achieve, and why the rules differ so much between them.",
    duration: "18 min",
    objectives: [
      "Describe the main payer types and how they differ",
      "Explain the difference between in-network and out-of-network status",
      "Define deductible, copayment, coinsurance, and out-of-pocket maximum",
      "Explain why the billed amount is rarely the amount anyone pays",
    ],
    sections: [
      {
        heading: "Who is actually in the transaction",
        blocks: [
          {
            type: "scenario",
            role: "You explain a bill to a patient at Lakeside Medical Associates.",
            text: "A patient calls, upset. The practice billed $340 for her visit. Her insurer's statement says the allowed amount was $186, the plan paid $148.80, and she owes $37.20. She wants to know why there are four different numbers for one appointment, and whether she is being overcharged.",
            task: "Understand the money well enough to explain it clearly and correctly to the person paying it.",
          },
          {
            type: "paragraph",
            text: "Healthcare billing is unusual because the person receiving the service is usually not the person paying for it, and the price is set by a contract neither of them read. Untangling that is most of what makes a bill confusing, and being able to explain it plainly is one of the most valuable things a billing specialist does.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Billed amount",
                definition:
                  "What the practice charges. Largely a starting figure — for contracted payers it is rarely what anyone actually pays.",
              },
              {
                term: "Allowed amount",
                definition:
                  "The maximum the payer's contract permits for that service. This is the real price.",
              },
              {
                term: "Contractual adjustment",
                definition:
                  "The difference between billed and allowed, which an in-network provider agrees to write off and may not bill to the patient.",
              },
              {
                term: "Deductible",
                definition:
                  "What the patient pays before the plan begins paying at all, usually reset each plan year.",
              },
              {
                term: "Copayment",
                definition:
                  "A fixed amount the patient pays per visit, such as $30 for an office visit.",
              },
              {
                term: "Coinsurance",
                definition:
                  "A percentage of the allowed amount the patient pays after the deductible, such as 20%.",
              },
              {
                term: "Out-of-pocket maximum",
                definition:
                  "The annual ceiling on the patient's own spending, after which the plan covers 100% of covered services.",
              },
            ],
          },
          {
            type: "worked-example",
            title: "Explaining the four numbers",
            task: "Explain to the patient why a $340 charge produced a $37.20 bill, and confirm whether she was overcharged.",
            steps: [
              {
                move: "Start with the allowed amount, not the billed amount.",
                why: "The $340 is the practice's standard charge, but the insurer's contract sets the allowed amount at $186. That contract is what governs. Leading with this reframes the conversation from 'why so much' to 'here is what your plan agreed to.'",
              },
              {
                move: "Name the contractual adjustment: $340 − $186 = $154 written off.",
                why: "This is money the practice does not collect from anyone. Patients frequently assume they are being billed the full charge, and hearing that $154 was removed by the insurance contract usually resolves most of the concern immediately.",
              },
              {
                move: "Split the allowed amount: plan pays $148.80, patient owes $37.20.",
                why: "$37.20 is exactly 20% of $186, so this is 20% coinsurance on a met deductible. Naming the mechanism lets the patient check it against their own plan documents rather than taking your word for it.",
              },
              {
                move: "Confirm the answer to what she actually asked.",
                why: "She asked whether she was overcharged. The answer is no, and saying so directly matters — walking through arithmetic without answering the question leaves the patient still worried. Then offer to review it again if her plan documents show different cost-sharing.",
              },
            ],
            result:
              "The patient understands the $37.20 is her plan's 20% coinsurance on a contracted rate, and that $154 was written off.",
            takeaway:
              "The allowed amount is the real price. Explain the contractual adjustment early — it is usually the number that resolves the patient's concern.",
          },
        ],
      },
      {
        heading: "Payer types and why the rules differ",
        blocks: [
          {
            type: "table",
            caption: "Main payer categories",
            columns: ["Payer", "Covers", "Note for billers"],
            rows: [
              [
                "Commercial insurance",
                "Employer-sponsored and individual plans",
                "Rules vary by plan, not just by insurer — always check the specific plan",
              ],
              [
                "Medicare",
                "Adults 65+, and some younger people with disabilities or ESRD",
                "Federal rules; Part A covers inpatient, Part B outpatient and professional services",
              ],
              [
                "Medicaid",
                "Low-income individuals and families",
                "Administered by states, so rules and covered services differ substantially by state",
              ],
              [
                "Medicare Advantage (Part C)",
                "Medicare benefits delivered by a private plan",
                "Follows the plan's rules, not traditional Medicare's — a very common source of confusion",
              ],
              [
                "TRICARE",
                "Military members, retirees, and their families",
                "Its own authorization and referral requirements",
              ],
              [
                "Workers' compensation",
                "Work-related injury and illness",
                "Not health insurance; separate claim forms, rules, and fee schedules",
              ],
              [
                "Self-pay",
                "No insurance, or a non-covered service",
                "Discuss cost before service; many practices offer a discounted self-pay rate",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "In-network means the provider has a contract with the payer setting agreed rates and requiring the provider to write off the difference. Out-of-network means no such contract, so the payer covers less or nothing, and the patient is exposed to a much larger balance. Verifying network status is part of eligibility verification, and it is one of the most consequential things checked at the front desk.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Balance billing — charging a patient the difference between your charge and the allowed amount — is prohibited for in-network services and, under the federal No Surprises Act, for many out-of-network emergency and ancillary situations as well. The rules are detailed and state law adds more. Never tell a patient they owe a balance without confirming it is permitted, and escalate anything you are unsure about.",
          },
          {
            type: "knowledge-check",
            question:
              "A practice bills $500 for a service. The payer's allowed amount is $300, the plan pays $240, and the patient owes $60. What is the $200 difference between the billed and allowed amounts called, and who pays it?",
            options: [
              "Coinsurance, paid by the patient",
              "A contractual adjustment, which the in-network provider writes off and bills to no one",
              "The deductible, paid by the patient before coverage begins",
              "A denial, which the provider must appeal to recover",
            ],
            correctIndex: 1,
            explanation:
              "The gap between billed and allowed is the contractual adjustment. By contracting with the payer, the in-network provider agrees to accept the allowed amount as payment in full and to write off the difference. Billing that $200 to the patient would be prohibited balance billing.",
            optionRationales: [
              "Coinsurance is the patient's percentage share of the allowed amount — here the $60, not the $200.",
              "Correct. The $200 is a contractual write-off the provider absorbs under its contract with the payer.",
              "A deductible is what the patient pays before the plan begins paying. It comes out of the allowed amount, not from the gap above it.",
              "Nothing was denied. The payer processed the claim and paid according to the contract.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work through the patient responsibility calculation, which you will do constantly in this job.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "A patient has a $1,500 annual deductible, of which $1,200 is met, and 20% coinsurance. A service has an allowed amount of $800. Calculate how much the patient owes and how much the plan pays. Show your steps.",
          "The same patient has an out-of-pocket maximum of $4,000 and has paid $3,850 so far this year. Recalculate what they owe for the same $800 service, and explain what changed.",
          "Write a short script — no more than four sentences — explaining the first calculation to the patient on the phone in plain language, without using the word 'coinsurance' until you have defined it.",
          "Name two things you would verify at registration that would prevent this patient from receiving an unexpected bill.",
        ],
      },
    ],
  },
];
