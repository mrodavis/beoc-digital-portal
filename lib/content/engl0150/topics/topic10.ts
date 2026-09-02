import { Topic } from "@/types/engl0150";

/**
 * TOPIC 10 — Proofreading, Revision & AI as a Writing Coach (2 sessions)
 *
 * The Instructor's Guide specifies no spelling list for this topic; the
 * vocabulary section renders a placeholder and offers spiral review instead.
 */
export const topic10: Topic = {
  number: 10,
  slug: "10",
  title: "Proofreading, Revision & AI as a Writing Coach",
  unit: { number: 5, title: "Revision, AI & Integrated Communication" },
  sessions: "2",
  goals: ["grammar-sentence", "professional-writing", "documentation"],
  spiralsFrom: [2, 3, 4, 6, 9],

  essentialQuestion:
    "How can I use AI to improve my writing without allowing AI to take responsibility for my work?",

  concepts: [
    "Revising versus proofreading — revising changes what the writing says; proofreading fixes how it is written. Do them in that order.",
    "AI as a writing coach: what it is good at, and what it cannot do",
    "Prompting for feedback rather than for a rewrite",
    "Checking AI suggestions instead of accepting them",
    "Hallucination — AI invents facts, citations, and details with complete confidence",
    "Privacy and HIPAA: patient information must never be entered into an AI tool",
    "You remain responsible for the final content, whatever produced the draft",
  ],

  grammar: [
    {
      heading: "Spiraling error checklist",
      points: [
        "Agreements: subject–verb, and pronoun–antecedent",
        "Fragments and run-ons",
        "Punctuation and capitalization",
        "Word choice — the confusable pairs from every earlier list",
      ],
    },
  ],

  wordListNumber: {
    note: "The Instructor's Guide lists no new spelling words for Topic 10. The Word Bank below offers spiral review of Lists 1–9 instead. Confirm whether a Topic 10 list should be added, or whether spiral review is the intent.",
  },

  practice: [
    {
      kind: "error-hunt",
      title: "Error hunt",
      instructions:
        "This message is going to a patient. Find every error before it does.",
      paragraph:
        "Dear Ms. Alvarez, Thank you for you're call yesterday. The results of your test is back and Dr. Reyes would like to discuss it with you. Because we could not reach you by phone. Please call our office at 555-0134 on wendsday between 9am and 4pm, we can also reschedule your appointment at that time if needed. The list of things to bring are on the back of this letter. Sincerely, the office team",
      spans: [
        {
          text: "you're call",
          category: "Word choice",
          correction: "your call — 'you're' means 'you are'",
        },
        {
          text: "is back",
          category: "Subject–verb agreement",
          correction: "are back — the subject is 'results', which is plural",
        },
        {
          text: "Because we could not reach you by phone.",
          category: "Fragment",
          correction:
            "Join it to the next sentence: 'Because we could not reach you by phone, please call our office…'",
        },
        {
          text: "wendsday",
          category: "Spelling and capitalization",
          correction: "Wednesday — silent 'd', and days of the week are capitalized",
        },
        {
          text: "4pm, we can also",
          category: "Run-on",
          correction: "4 p.m. We can also — two complete sentences need a period",
        },
        {
          text: "list of things to bring are",
          category: "Subject–verb agreement",
          correction: "list … is — the subject is 'list', which is singular",
        },
        {
          text: "the office team",
          category: "Capitalization",
          correction: "The Office Team — a closing signature is capitalized",
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Human editing versus AI editing",
      instructions:
        "Where each one helps, and where each one fails.",
      items: [
        {
          id: "t10-g1",
          prompt:
            "Which task is AI genuinely good at, in a way you can rely on?",
          principle:
            "AI is strong on the surface features of language and unreliable on facts. Use it where a mistake would be visible to you.",
          choices: [
            {
              text: "Confirming that a medication dosage in your draft is correct",
              correct: false,
              rationale:
                "Never. AI generates plausible numbers and states them confidently. Clinical facts come from clinical sources.",
            },
            {
              text: "Pointing out that a sentence is unclear or that a paragraph has no topic sentence",
              correct: true,
              rationale:
                "Correct. This is a judgment about language, which you can then check yourself by rereading the sentence.",
            },
            {
              text: "Deciding whether a patient's symptoms warrant an urgent appointment",
              correct: false,
              rationale:
                "That is triage — a clinical judgment, and outside your scope as well as the tool's.",
            },
            {
              text: "Supplying the citation for a clinical guideline you half-remember",
              correct: false,
              rationale:
                "AI fabricates citations that look completely real. Find the actual source.",
            },
          ],
        },
        {
          id: "t10-g2",
          prompt:
            "Which prompt asks AI for coaching rather than for a replacement?",
          principle:
            "A prompt that asks for a rewrite gets you someone else's writing. A prompt that asks what is wrong gets you something to learn from.",
          choices: [
            {
              text: "Rewrite this to sound more professional.",
              correct: false,
              rationale:
                "You get a new draft you did not write and cannot fully defend. You also learn nothing about what was wrong.",
            },
            {
              text: "Identify anything unclear in this message, explain why each one is unclear, and do not rewrite it.",
              correct: true,
              rationale:
                "Correct. Asks for diagnosis with reasoning, and explicitly withholds the rewrite so the revision stays yours.",
            },
            {
              text: "Make this better.",
              correct: false,
              rationale: "Vague, and it hands over the whole task.",
            },
            {
              text: "Write me a patient instruction sheet about wound care.",
              correct: false,
              rationale:
                "This is not editing at all — and an AI-written clinical instruction sheet is exactly the thing nobody should distribute unchecked.",
            },
          ],
        },
        {
          id: "t10-g3",
          prompt:
            "You want AI feedback on a message you wrote about a specific patient. What must you do first?",
          principle:
            "Anything you paste into an AI tool leaves your organization. Protected health information cannot go into a consumer tool under any circumstances.",
          choices: [
            {
              text: "Paste it as-is — the tool is private to your account",
              correct: false,
              rationale:
                "An account is not a business associate agreement. This is a disclosure of PHI to a third party, and it is reportable.",
            },
            {
              text: "Remove every identifier first, or ask about the general situation without the specifics",
              correct: true,
              rationale:
                "Correct. The tool can help with tone and structure without knowing anything about a real person. Strip the identifiers, or ask generically.",
            },
            {
              text: "Change only the patient's name",
              correct: false,
              rationale:
                "Date of birth, dates of service, and condition are identifiers too. Partial redaction is not de-identification.",
            },
            {
              text: "Paste it and delete the conversation afterwards",
              correct: false,
              rationale:
                "Deleting your view of a conversation does not undo the transmission or guarantee deletion from the provider's systems.",
            },
          ],
        },
        {
          id: "t10-g4",
          prompt:
            "Revising and proofreading — which order, and why?",
          principle:
            "Proofreading polishes sentences. Revising may delete them. Polishing first wastes the work.",
          choices: [
            {
              text: "Proofread first, then revise",
              correct: false,
              rationale:
                "You will spend time perfecting the punctuation of sentences you are about to cut.",
            },
            {
              text: "Revise first, then proofread",
              correct: true,
              rationale:
                "Correct. Settle what the writing says and how it is organized, then fix the surface of what survived.",
            },
            {
              text: "They are the same thing",
              correct: false,
              rationale:
                "Revising changes content and structure; proofreading fixes grammar, spelling, and punctuation.",
            },
            {
              text: "Do both at once to save time",
              correct: false,
              rationale:
                "Trying to do both means doing neither well — you lose the thread of the argument while hunting commas.",
            },
          ],
        },
      ],
    },
    {
      kind: "ai-lab",
      title: "AI feedback lab",
      instructions:
        "The full chain: your original, the AI's feedback, your evaluation of that feedback, and your revision. Panel 3 is the one that matters.",
      starter:
        "Dear Mr. Osei,\n\nYour appointment is coming up soon. Please make sure you don't eat anything beforehand and bring all your stuff. If you have any issues just let us know. We look forward to seeing you.\n\nThanks,\nThe Office",
      badRevision: {
        text:
          "Dear Mr. Osei,\n\nYour appointment is scheduled for Tuesday, 21 October at 8:30 a.m. Please fast for a minimum of 12 hours beforehand, and bring your insurance card, photo ID, and a complete list of your current medications including dosages. Per CDC guideline 2019-A, patients over 60 should also discontinue anticoagulant therapy 48 hours prior.\n\nWarm regards,\nThe Office Team",
        problems: [
          "The date and time were invented — the original message never gave them.",
          "The 12-hour fasting requirement was invented; the original did not specify a duration.",
          "\"CDC guideline 2019-A\" does not exist. AI fabricates citations that look completely real.",
          "It gives clinical advice about stopping anticoagulant therapy — dangerous, and far outside an administrative writer's scope.",
          "The specific detail makes it read as more authoritative than the original, which is exactly why an unchecked version would go out.",
        ],
      },
    },
    { kind: "word-bank", title: "Spiral review — Lists 1 to 9", listNumber: 9 },
  ],

  product: {
    label: "Revised healthcare communication",
    description:
      "Take one piece of healthcare writing you produced earlier in this course and produce the full chain: the original, the AI feedback you received, your written evaluation of that feedback, and your revised final version. Submit all four parts. The evaluation is what is being assessed — it is the part only you can write.",
  },

  reflection: [
    "Which AI suggestions did you reject, and could you defend each rejection?",
    "Did the AI change anything factual? Did you check it?",
    "Is your revision better, or just different?",
  ],

  beforeYouLeave: [
    "Found every error in the error hunt",
    "Completed the human-versus-AI editing drill",
    "Completed all four panels of the AI feedback lab",
    "Identified every problem in the bad AI revision",
    "Submitted the four-part revision chain",
  ],

  closingLine: "AI can suggest. You decide.",
};
