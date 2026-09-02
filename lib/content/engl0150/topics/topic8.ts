import { Topic } from "@/types/engl0150";

/**
 * TOPIC 8 — Referrals, Prior Authorizations & Requests (1–2 sessions)
 *
 * SESSION COUNT: the Instructor's Guide summary table lists this topic as 1
 * session; its detailed outline heading says 2. Resolved to 1 here, for two
 * reasons: the Fall 1 calendar supports roughly 14 sessions against the
 * guide's recommended 15-16, so a session has to come from somewhere; and of
 * the three Unit 3 products, the referral is the most self-contained — its
 * required elements are a checklist rather than a craft judgment, which is
 * what the missing-information exercise is built around.
 *
 * This is a curriculum decision, not a source finding. Changing it back is one
 * field. Recorded in docs/ENGL0150_AUTHORED_ADDITIONS.md.
 */
export const topic8: Topic = {
  number: 8,
  slug: "8",
  title: "Referrals, Prior Authorizations & Requests",
  unit: { number: 3, title: "Patient Communication" },
  sessions: "1",
  goals: ["professional-writing", "documentation", "summarizing"],
  spiralsFrom: [5, 7],

  essentialQuestion:
    "How do I communicate a request so that another person has the information needed to act on it?",

  concepts: [
    "Purpose and audience — a referral is read by someone with no knowledge of this patient",
    "Required information: what the receiver must have before they can act",
    "Concise requests — a request buried in narrative gets actioned last",
    "Supporting information versus padding",
    "Follow-up: a request with no tracking is a request that disappears",
    "Documentation of communication — record that the request was made, when, and to whom",
  ],

  grammar: [
    {
      heading: "Paragraph organization",
      points: [
        "The topic sentence states the paragraph's point, usually first",
        "Supporting details back it up, and each one earns its place",
        "Logical order: the reader should never have to re-read to follow you",
        "Transitions connect the sentences so the paragraph reads as one thought",
      ],
    },
  ],

  wordListNumber: 8,

  practice: [
    {
      kind: "missing-info",
      title: "What is missing from this request?",
      instructions:
        "Read the referral request as the specialist's office would receive it. Check every required element that is not there.",
      sample:
        "Hi — we'd like to refer a patient to your office for the knee problem we discussed. She's been having trouble for a while now and our provider thinks she should be seen. Please let us know when you can fit her in. Thanks!",
      elements: [
        {
          id: "t8-e1",
          label: "Patient's full name and date of birth",
          present: false,
          why: "Without an identifier the receiving office cannot open a record or match the referral to a person.",
        },
        {
          id: "t8-e2",
          label: "Referring provider's name",
          present: false,
          why: "The specialist needs to know who to send findings back to, and who authorized the referral.",
        },
        {
          id: "t8-e3",
          label: "Reason for referral, stated specifically",
          present: false,
          why: "'The knee problem we discussed' means nothing to an office that was not in the conversation.",
        },
        {
          id: "t8-e4",
          label: "Relevant clinical history and duration",
          present: false,
          why: "'Trouble for a while' gives the specialist no basis for triage. How long, and what has been tried?",
        },
        {
          id: "t8-e5",
          label: "Insurance information and authorization status",
          present: false,
          why: "Many specialist visits require prior authorization. Omitting this guarantees a delay or a denied claim.",
        },
        {
          id: "t8-e6",
          label: "Urgency or requested timeframe",
          present: false,
          why: "'When you can fit her in' hands the triage decision to someone with no clinical information.",
        },
        {
          id: "t8-e7",
          label: "Contact details for the referring office",
          present: false,
          why: "If anything is unclear, the specialist's office needs a way to reach you quickly.",
        },
        {
          id: "t8-e8",
          label: "A stated request",
          present: true,
          why: "This one is present — the message does ask for an appointment. It is the only element that is.",
        },
      ],
    },
    {
      kind: "sequencer",
      title: "Order the request",
      instructions:
        "Arrange these into the order a busy reader can act on fastest.",
      items: [
        {
          id: "t8-q1",
          text: "State the request and who it concerns: referral for [patient name, DOB] to orthopedics.",
          position: 1,
          reason:
            "The reader must know within one line what this is and who it is about, so they can route it before reading further.",
        },
        {
          id: "t8-q2",
          text: "Give the reason for the referral, specifically.",
          position: 2,
          reason:
            "The clinical reason determines who sees it and how urgently. It comes before the history that supports it.",
        },
        {
          id: "t8-q3",
          text: "Supply the relevant history: duration, findings, and what has already been tried.",
          position: 3,
          reason:
            "Supporting detail follows the point it supports. Leading with history buries the request.",
        },
        {
          id: "t8-q4",
          text: "Provide insurance and authorization information.",
          position: 4,
          reason:
            "Administrative detail comes after the clinical picture — necessary, but not what the reader needs first.",
        },
        {
          id: "t8-q5",
          text: "State the requested timeframe and give your contact details.",
          position: 5,
          reason:
            "The close tells the reader what you want and how to reach you if anything is missing.",
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Topic sentences and transitions",
      instructions:
        "Paragraph organization — the grammar that makes a request readable.",
      items: [
        {
          id: "t8-g1",
          prompt:
            "Which sentence works best as the topic sentence of a referral paragraph?",
          principle:
            "A topic sentence states the paragraph's point. In a request, that means saying what you are asking for before you explain why.",
          choices: [
            {
              text: "Ms. Chen has been experiencing knee pain, and she also mentioned some difficulty sleeping, and her last visit was in March.",
              correct: false,
              rationale:
                "Three unrelated facts and no point. The reader does not know what this paragraph is for.",
            },
            {
              text: "We are requesting an orthopedic referral for Ms. Chen for right knee pain of four months' duration.",
              correct: true,
              rationale:
                "Correct. States the request, the patient, the reason, and the duration in one sentence. Everything after it is support.",
            },
            {
              text: "As you may know, knee pain is a common presenting complaint in primary care.",
              correct: false,
              rationale:
                "General background that tells the reader nothing about this patient or this request.",
            },
            {
              text: "Please see the attached.",
              correct: false,
              rationale:
                "Makes the reader open a document before they know whether it is urgent or even theirs.",
            },
          ],
        },
        {
          id: "t8-g2",
          prompt:
            "Which transition correctly signals that the next sentence gives a result?",
          principle:
            "Transitions tell the reader how sentences relate. Using the wrong one sends them looking for a relationship that is not there.",
          choices: [
            {
              text: "However",
              correct: false,
              rationale: "'However' signals contrast, not result.",
            },
            {
              text: "Therefore",
              correct: true,
              rationale:
                "Correct. 'Therefore' tells the reader that what follows is the consequence of what came before.",
            },
            {
              text: "Similarly",
              correct: false,
              rationale: "'Similarly' signals comparison between two like things.",
            },
            {
              text: "Meanwhile",
              correct: false,
              rationale: "'Meanwhile' signals simultaneous time, not consequence.",
            },
          ],
        },
        {
          id: "t8-g3",
          prompt:
            "A paragraph in your referral contains six sentences, one of which describes the patient's holiday plans. What should you do?",
          principle:
            "Every supporting detail must support the topic sentence. Detail that does not is padding, and padding is where the reader's attention goes to die.",
          choices: [
            {
              text: "Keep it — it gives the specialist a sense of the patient as a person",
              correct: false,
              rationale:
                "The specialist needs clinical and administrative information. Personal detail that does not bear on care is a privacy question as well as a clarity one.",
            },
            {
              text: "Remove it — it does not support the request, and it lengthens what a busy reader must get through",
              correct: true,
              rationale:
                "Correct. If it does not help the reader act, it competes with what does. Minimum necessary applies to referrals too.",
            },
            {
              text: "Move it to the end so it does not interrupt",
              correct: false,
              rationale:
                "Moving irrelevant information does not make it relevant.",
            },
            {
              text: "Put it in a separate paragraph",
              correct: false,
              rationale: "Same problem, now with its own heading.",
            },
          ],
        },
      ],
    },
    {
      kind: "builder",
      storageKey: "referral",
      title: "Build a referral request",
      instructions:
        "Write each part. The completeness check looks for the elements the receiving office cannot act without.",
      scenario:
        "Ms. Wen Chen, date of birth 4 March 1968, has had right knee pain for four months. It worsens on stairs and after standing for long periods. She has tried over-the-counter ibuprofen with partial relief. An X-ray taken last week showed changes consistent with osteoarthritis. Dr. Amara Reyes is referring her to orthopedics. Her insurance is Meridian Health, member number MH-4471902, and prior authorization has been obtained, reference PA-88213. Dr. Reyes would like her seen within four weeks. Your office number is 555-0134.",
      fields: [
        {
          id: "request",
          label: "The request",
          prompt:
            "One sentence: what you are asking for, for whom, and why. This is your topic sentence.",
          expects: ["chen"],
          missingHint:
            "Name the patient — the receiving office cannot match a referral without an identifier.",
          rows: 2,
        },
        {
          id: "history",
          label: "Relevant history",
          prompt:
            "Duration, findings, and what has already been tried. Enough to triage, nothing more.",
          expects: ["four months", "4 months", "x-ray", "ibuprofen"],
          missingHint:
            "Include how long this has been going on and what has already been tried.",
        },
        {
          id: "insurance",
          label: "Insurance and authorization",
          prompt: "Carrier, member number, and authorization reference if obtained.",
          expects: ["meridian", "mh-", "pa-"],
          missingHint:
            "Include the carrier and the authorization reference, or the visit may be delayed or denied.",
        },
        {
          id: "close",
          label: "Timeframe and contact",
          prompt: "When you would like the patient seen, and how to reach you.",
          expects: ["four weeks", "4 weeks", "555"],
          missingHint:
            "State the requested timeframe and a contact number — otherwise triage and follow-up both stall.",
          rows: 2,
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 8 },
  ],

  product: {
    label: "Referral / prior authorization communication",
    description:
      "Produce a complete referral or prior authorization request from the case above. The receiving office should need to ask you nothing. Organize it in paragraphs with clear topic sentences.",
  },

  reflection: [
    "Read it as the specialist's scheduler. Could you book this patient without calling back?",
    "Does each paragraph have one point, stated in its first sentence?",
    "Is there anything here the receiving office does not need?",
  ],

  beforeYouLeave: [
    "Identified every missing element in the incomplete referral",
    "Put the request into the order a busy reader can act on",
    "Completed the topic sentence and transition drill",
    "Built the referral and ran the completeness check",
  ],
};
