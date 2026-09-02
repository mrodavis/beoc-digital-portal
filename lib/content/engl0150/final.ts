import { BuilderField } from "@/types/engl0150";

/**
 * FINAL ASSESSMENT — Integrated Healthcare Communication & Grammar (1 session)
 *
 * Part 1 is the in-class integrated case; Part 2 is a grammar and spelling
 * quiz whose scope the Instructor's Guide does not specify. That gap is
 * surfaced on the page rather than filled.
 */
export const finalAssessment = {
  essentialQuestion:
    "Can I communicate accurately, professionally, and appropriately across different healthcare situations?",

  /** The reference case from the Instructor's Guide. */
  caseText:
    "A patient arrives for an appointment with a changed insurance status. During the visit she reports a new symptom. She needs a referral to a specialist. Later the same day she calls the office with a question about her follow-up instructions.",

  caseDetail: [
    "The patient is established with the practice and was last seen four months ago.",
    "At check-in, the front desk finds her insurance carrier has changed and coverage for today's visit cannot be verified.",
    "During the visit she reports a new symptom that has been present for about two weeks and is getting worse.",
    "The provider decides she should be seen by a specialist and asks you to start the referral.",
    "That afternoon she calls back, unsure whether she should stop taking one of her current medications before the specialist visit.",
  ],

  integrated: [
    "Audience and purpose — four different readers in one case",
    "Evidence-based objectivity in what you document",
    "Patient-centered language in what she reads",
    "Revision and concise writing under time pressure",
    "AI literacy — what you would and would not use it for here",
  ],

  /** Students choose any three or four of these. */
  products: [
    {
      id: "note",
      label: "Brief patient documentation note",
      prompt:
        "Document the visit objectively: what she reported, what was observed, and what was done. No interpretations, no labels. Topic 3 and 4 skills.",
      fields: [
        {
          id: "note-body",
          label: "Documentation note",
          prompt:
            "Four to six sentences. Quote her report where her words matter.",
          rows: 6,
        },
      ] as BuilderField[],
    },
    {
      id: "patient-message",
      label: "Patient-facing message",
      prompt:
        "Answer her afternoon phone question in writing. She asked whether to stop a medication — decide what is within your scope to say. Topic 6 and 7 skills.",
      fields: [
        {
          id: "msg-body",
          label: "Message to the patient",
          prompt:
            "Two to four sentences. Answer first, then say what happens next.",
          rows: 5,
        },
      ] as BuilderField[],
    },
    {
      id: "staff",
      label: "Internal staff communication",
      prompt:
        "Write to a colleague or the provider about something in this case that needs their action. Topic 5 and 9 skills.",
      fields: [
        {
          id: "staff-subject",
          label: "Subject line",
          prompt: "What it is and what is needed, in one line.",
          rows: 1,
        },
        {
          id: "staff-body",
          label: "Message",
          prompt: "Request in the first sentence, then the supporting detail.",
          rows: 5,
        },
      ] as BuilderField[],
    },
    {
      id: "referral",
      label: "Referral communication",
      prompt:
        "Write the referral request to the specialist's office. Topic 8 skills.",
      fields: [
        {
          id: "ref-body",
          label: "Referral request",
          prompt:
            "Include the request, the reason, the relevant history, and insurance status.",
          rows: 7,
        },
      ] as BuilderField[],
    },
    {
      id: "instructions",
      label: "Patient instructions",
      prompt:
        "Write instructions she can follow before the specialist visit. Topic 6 skills.",
      fields: [
        {
          id: "inst-body",
          label: "Instruction sheet",
          prompt:
            "Numbered imperatives, plain language, and a clear line about when to call.",
          rows: 7,
        },
      ] as BuilderField[],
    },
    {
      id: "billing",
      label: "Billing / insurance communication",
      prompt:
        "Explain the insurance situation to her clearly, without jargon and without sounding dismissive. Topic 7 skills.",
      fields: [
        {
          id: "bill-body",
          label: "Billing message",
          prompt:
            "Explain what happened, what it means for her, and what she should do.",
          rows: 6,
        },
      ] as BuilderField[],
    },
  ],

  quizNote: {
    note: "The Instructor's Guide specifies a short grammar and spelling assessment as Part 2 of the final, but does not state its length, format, or which items it draws from. The error hunt and spiral Word Bank below cover the checklist categories in the meantime. Confirm the intended scope.",
  },
};
