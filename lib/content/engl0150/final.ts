import { BuilderField, DrillItem } from "@/types/engl0150";

/**
 * FINAL ASSESSMENT — Integrated Healthcare Communication & Grammar (1 session)
 *
 * NOTE ON SOURCES: Part 1 and the reference case come from the Instructor's
 * Guide. The guide specifies "a short grammar and spelling assessment" as Part
 * 2 without stating its length, format, or item pool. Part 2 below is authored:
 * 12 items drawing evenly from the Topic 10 spiraling error checklist —
 * agreements, fragments and run-ons, punctuation and capitalization, and word
 * choice — plus a spelling section from the Word Bank. Recorded in
 * docs/ENGL0150_AUTHORED_ADDITIONS.md.
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

  /**
   * Part 2 — grammar and spelling review.
   *
   * Twelve items, three from each category of the Topic 10 spiraling error
   * checklist. This is practice: the graded version is administered in class
   * through Brightspace.
   */
  quizIntro:
    "Twelve questions, three from each of the four error categories you have worked on all term. This is practice — the graded assessment is given in class. Every option explains itself, so work through the ones you get wrong rather than moving straight on.",

  quizItems: [
    {
      id: "f-agree-1",
      prompt: "Which sentence has correct subject–verb agreement?",
      principle:
        "Agreements. The verb matches the subject, not a noun sitting between them.",
      choices: [
        { text: "The list of referrals were sent this morning.", correct: false, rationale: "The subject is 'list', which is singular, so it takes 'was'." },
        { text: "The list of referrals was sent this morning.", correct: true, rationale: "Correct. Singular subject 'list' takes 'was'." },
        { text: "The lists of referrals was sent this morning.", correct: false, rationale: "Here 'lists' is plural and needs 'were'." },
        { text: "The list of referral were sent this morning.", correct: false, rationale: "Two errors: 'referrals' should be plural, and the verb should be 'was'." },
      ],
    },
    {
      id: "f-agree-2",
      prompt: "Which sentence uses pronoun–antecedent agreement correctly?",
      principle: "Agreements. A pronoun matches its antecedent in number.",
      choices: [
        { text: "Each patient should bring their insurance card and photo ID.", correct: true, rationale: "Correct, and now standard usage — singular 'they' is accepted for a person of unspecified gender and avoids the clumsy 'his or her'." },
        { text: "Each patient should bring its insurance card.", correct: false, rationale: "'It' is never used for a person." },
        { text: "Every patients should bring their card.", correct: false, rationale: "'Every' takes a singular noun: every patient." },
        { text: "Each patients should bring their cards.", correct: false, rationale: "'Each' takes a singular noun." },
      ],
    },
    {
      id: "f-agree-3",
      prompt: "Which sentence has an unclear pronoun reference?",
      principle: "Agreements. Every pronoun needs exactly one possible antecedent.",
      choices: [
        { text: "When the assistant called the patient, she had questions about the referral.", correct: true, rationale: "Correct — this is the problem sentence. 'She' could be either person, and in a record that ambiguity matters." },
        { text: "When the assistant called the patient, the patient had questions.", correct: false, rationale: "Clear. Repeating the noun removes the ambiguity." },
        { text: "The patient said she had questions about the referral.", correct: false, rationale: "Clear — only one person appears." },
        { text: "Dr. Reyes reviewed the chart before he called.", correct: false, rationale: "Clear — only one person is named." },
      ],
    },
    {
      id: "f-frag-1",
      prompt: "Which is a sentence fragment?",
      principle: "Fragments and run-ons. A clause beginning with 'because', 'after', or 'while' cannot stand alone.",
      choices: [
        { text: "Because the authorization had not come back from the insurer.", correct: true, rationale: "Correct. It has a subject and verb but begins with 'because', leaving the reader waiting for what happened." },
        { text: "The authorization had not come back from the insurer.", correct: false, rationale: "Complete — subject, verb, finished thought." },
        { text: "Call the insurer.", correct: false, rationale: "An imperative. The subject 'you' is understood, which is correct." },
        { text: "We rescheduled the appointment.", correct: false, rationale: "Complete." },
      ],
    },
    {
      id: "f-frag-2",
      prompt: "Which sentence is a run-on?",
      principle: "Fragments and run-ons. Two complete sentences cannot be joined by a comma alone.",
      choices: [
        { text: "The results came back, the provider will call you tomorrow.", correct: true, rationale: "Correct — a comma splice. Use a period, a semicolon, or add 'and'." },
        { text: "The results came back, and the provider will call you tomorrow.", correct: false, rationale: "Correct as written — comma plus 'and'." },
        { text: "The results came back. The provider will call you tomorrow.", correct: false, rationale: "Two correct sentences." },
        { text: "Now that the results are back, the provider will call you.", correct: false, rationale: "Dependent clause plus main clause, correctly punctuated." },
      ],
    },
    {
      id: "f-frag-3",
      prompt: "What is the best fix for: 'She arrived at 9:00 she was seen at 9:40.'",
      principle: "Fragments and run-ons. A fused sentence needs a boundary between the two clauses.",
      choices: [
        { text: "She arrived at 9:00, she was seen at 9:40.", correct: false, rationale: "A comma alone is still a splice." },
        { text: "She arrived at 9:00 and was seen at 9:40.", correct: true, rationale: "Correct. Joining with 'and' makes one sentence, and dropping the repeated subject tightens it." },
        { text: "She arrived at 9:00; and she was seen at 9:40.", correct: false, rationale: "A semicolon and 'and' do the same job — use one." },
        { text: "She arrived at 9:00 she was seen, at 9:40.", correct: false, rationale: "The comma is misplaced and the fused sentence remains." },
      ],
    },
    {
      id: "f-punc-1",
      prompt: "Which sentence is punctuated correctly?",
      principle: "Punctuation and capitalization. An introductory clause takes a comma.",
      choices: [
        { text: "After you verify the insurance please update the chart.", correct: false, rationale: "Missing the comma after the introductory clause." },
        { text: "After you verify the insurance, please update the chart.", correct: true, rationale: "Correct." },
        { text: "After, you verify the insurance please update the chart.", correct: false, rationale: "The comma breaks the clause in the wrong place." },
        { text: "After you verify, the insurance please update the chart.", correct: false, rationale: "The comma splits the clause and changes the meaning." },
      ],
    },
    {
      id: "f-punc-2",
      prompt: "Which sentence is capitalized correctly?",
      principle: "Punctuation and capitalization. Proper nouns are capitalized; common nouns are not.",
      choices: [
        { text: "The Patient will see Dr. Reyes on tuesday in radiology.", correct: false, rationale: "'Patient' should be lowercase, 'Tuesday' capitalized, and 'Radiology' as a named department capitalized." },
        { text: "The patient will see Dr. Reyes on Tuesday in Radiology.", correct: true, rationale: "Correct on all three." },
        { text: "the patient will see dr. reyes on Tuesday in Radiology.", correct: false, rationale: "The sentence must start with a capital, and a person's title and name are capitalized." },
        { text: "The Patient will see the Doctor on Tuesday.", correct: false, rationale: "'Patient' and 'Doctor' are common nouns here." },
      ],
    },
    {
      id: "f-punc-3",
      prompt: "Which uses the semicolon correctly?",
      principle: "Punctuation and capitalization. A semicolon joins two complete sentences.",
      choices: [
        { text: "The order goes in Thursday; please send the codes by Tuesday.", correct: true, rationale: "Correct — complete sentences on both sides." },
        { text: "The order goes in Thursday; because I need the codes.", correct: false, rationale: "The second half is a fragment." },
        { text: "Please send; the codes by Tuesday.", correct: false, rationale: "This splits one sentence in half." },
        { text: "The order goes in Thursday; and please send the codes.", correct: false, rationale: "A semicolon and 'and' duplicate each other." },
      ],
    },
    {
      id: "f-word-1",
      prompt: "Which sentence uses 'your' and 'you're' correctly?",
      principle: "Word choice. 'You're' always expands to 'you are'.",
      choices: [
        { text: "Your welcome to bring you're insurance card.", correct: false, rationale: "Both are reversed." },
        { text: "You're welcome to bring your insurance card.", correct: true, rationale: "Correct. 'You're' expands to 'you are'; 'your' shows possession." },
        { text: "Your welcome to bring your insurance card.", correct: false, rationale: "The first should be 'You're' — it expands to 'You are welcome'." },
        { text: "You're welcome to bring you're insurance card.", correct: false, rationale: "The second should be 'your'." },
      ],
    },
    {
      id: "f-word-2",
      prompt: "Which sentence uses 'affect' and 'effect' correctly?",
      principle: "Word choice. 'Affect' is almost always the verb; 'effect' is almost always the noun.",
      choices: [
        { text: "The change will effect your coverage, and the affect starts in January.", correct: false, rationale: "Both are reversed." },
        { text: "The change will affect your coverage, and the effect starts in January.", correct: true, rationale: "Correct. The change acts on coverage (verb), and the result is an effect (noun)." },
        { text: "The change will affect your coverage, and the affect starts in January.", correct: false, rationale: "The second needs the noun 'effect'." },
        { text: "The change will effect your coverage, and the effect starts in January.", correct: false, rationale: "The first needs the verb 'affect'." },
      ],
    },
    {
      id: "f-word-3",
      prompt: "Which sentence uses 'fewer' and 'less' correctly?",
      principle: "Word choice. 'Fewer' for things you count; 'less' for amounts you measure.",
      choices: [
        { text: "Fewer appointments were canceled and there was less paperwork.", correct: true, rationale: "Correct. Appointments are counted; paperwork is measured." },
        { text: "Less appointments were canceled and there was fewer paperwork.", correct: false, rationale: "Both are reversed." },
        { text: "Less appointments were canceled and there was less paperwork.", correct: false, rationale: "'Appointments' are countable and need 'fewer'." },
        { text: "Fewer appointments were canceled and there was fewer paperwork.", correct: false, rationale: "'Paperwork' is measured and needs 'less'." },
      ],
    },
  ] as DrillItem[],
};
