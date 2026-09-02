import { Topic } from "@/types/engl0150";

/**
 * TOPIC 2 — Foundations: Clear and Professional Communication (1–2 sessions)
 *
 * Essential question, concepts, grammar focus, spelling words, formative
 * activities, and the cumulative product come from the Instructor's Guide.
 * The drill ITEMS below are authored to implement that specification: every
 * sentence is fictional, set in healthcare, and targets one of the named
 * grammar points.
 */
export const topic2: Topic = {
  number: 2,
  slug: "2",
  title: "Foundations: Clear and Professional Communication",
  unit: { number: 1, title: "Foundations of Professional Healthcare Communication" },
  sessions: "1–2",
  goals: ["grammar-sentence", "professional-writing", "patient-centered"],

  essentialQuestion: "Why does clear writing matter in healthcare?",

  concepts: [
    "Communication is a patient-safety issue, not only a matter of politeness",
    "What makes healthcare writing effective",
    "Clarity, correctness, and professionalism are three different things — a message can be correct and still unclear",
    "Audience and purpose: who is reading this, and what do they need to do after reading it?",
    "Introduction to the Communication Check, the five criteria you will use all term",
  ],

  grammar: [
    {
      heading: "Diagnostic focus — a non-graded baseline",
      points: [
        "Parts of speech and what each one does in a sentence",
        "Subject and predicate",
        "Complete sentences",
        "Subject–verb agreement",
        "Capitalization",
        "Basic punctuation",
        "Fragments",
        "Run-ons",
        "Pronoun clarity",
      ],
    },
  ],

  wordListNumber: 2,

  practice: [
    {
      kind: "grammar-drill",
      title: "Grammar diagnostic",
      instructions:
        "A baseline, not a grade. Answer honestly — the point is to find out what to work on, and every option explains itself.",
      items: [
        {
          id: "t2-sva-1",
          prompt:
            "Choose the sentence with correct subject–verb agreement.",
          principle:
            "The verb agrees with the subject, not with a noun that happens to sit closest to it. Find the real subject first — here it is 'box', not 'gloves'.",
          choices: [
            {
              text: "The box of gloves are stored in the supply room.",
              correct: false,
              rationale:
                "The subject is 'box', which is singular, so it takes 'is'. 'Gloves' is inside a prepositional phrase and cannot be the subject.",
            },
            {
              text: "The box of gloves is stored in the supply room.",
              correct: true,
              rationale:
                "Correct. The singular subject 'box' takes the singular verb 'is', regardless of the plural noun in between.",
            },
            {
              text: "The box of gloves were stored in the supply room.",
              correct: false,
              rationale:
                "'Were' is plural and past tense. The singular subject 'box' needs 'is' or 'was'.",
            },
            {
              text: "The boxes of gloves is stored in the supply room.",
              correct: false,
              rationale:
                "Here the subject 'boxes' is plural, so it needs 'are'. The subject and verb do not match.",
            },
          ],
        },
        {
          id: "t2-frag-1",
          prompt: "Which of these is a sentence fragment?",
          principle:
            "A complete sentence needs a subject and a verb and must express a complete thought. A group of words beginning with 'because', 'after', or 'while' needs a main clause attached to it.",
          choices: [
            {
              text: "Because the patient arrived without her insurance card.",
              correct: true,
              rationale:
                "Correct. This has a subject and verb but begins with 'because', so it is a dependent clause left on its own — the reader is still waiting for what happened.",
            },
            {
              text: "The patient arrived without her insurance card.",
              correct: false,
              rationale:
                "This is complete: subject 'patient', verb 'arrived', and a finished thought.",
            },
            {
              text: "She returned the next morning with it.",
              correct: false,
              rationale: "Complete — subject 'she', verb 'returned', finished thought.",
            },
            {
              text: "Verify insurance at check-in.",
              correct: false,
              rationale:
                "This is an imperative sentence. The subject 'you' is understood rather than written, which is correct for an instruction.",
            },
          ],
        },
        {
          id: "t2-runon-1",
          prompt: "Which sentence is a run-on?",
          principle:
            "Two complete sentences cannot be joined by a comma alone. Fix a comma splice with a period, a semicolon, or a comma plus a joining word such as 'and', 'but', or 'so'.",
          choices: [
            {
              text: "The waiting room was full, the front desk called for help.",
              correct: true,
              rationale:
                "Correct. Two complete sentences joined by only a comma — a comma splice. Use a period, a semicolon, or add 'so'.",
            },
            {
              text: "The waiting room was full, so the front desk called for help.",
              correct: false,
              rationale:
                "Correct as written. A comma plus the joining word 'so' properly connects two complete sentences.",
            },
            {
              text: "The waiting room was full. The front desk called for help.",
              correct: false,
              rationale: "Two correct sentences, separated by a period.",
            },
            {
              text: "Because the waiting room was full, the front desk called for help.",
              correct: false,
              rationale:
                "Correct. A dependent clause followed by a comma and a main clause.",
            },
          ],
        },
        {
          id: "t2-pronoun-1",
          prompt:
            "Which sentence has a pronoun that is unclear about who it refers to?",
          principle:
            "A pronoun must point to exactly one noun. When two people of the same gender appear in a sentence, repeat the name rather than using 'she' or 'he'.",
          choices: [
            {
              text: "When the nurse spoke with the patient, she seemed concerned.",
              correct: true,
              rationale:
                "Correct. 'She' could mean the nurse or the patient. In documentation this ambiguity can change the meaning of the record — name the person.",
            },
            {
              text: "When the nurse spoke with the patient, the patient seemed concerned.",
              correct: false,
              rationale:
                "Clear. Repeating the noun removes any doubt about who was concerned.",
            },
            {
              text: "The patient said she had not eaten since midnight.",
              correct: false,
              rationale:
                "Clear. Only one person appears, so 'she' has one possible referent.",
            },
            {
              text: "Dr. Reyes reviewed the chart before he entered the room.",
              correct: false,
              rationale: "Clear. Only one person is named, so 'he' is unambiguous.",
            },
          ],
        },
        {
          id: "t2-caps-1",
          prompt: "Which sentence is capitalized correctly?",
          principle:
            "Capitalize proper nouns — specific names of people, places, departments, days, and months. Do not capitalize a general job title or a common noun just because it feels important.",
          choices: [
            {
              text: "The Patient will see the Doctor on tuesday in Radiology.",
              correct: false,
              rationale:
                "'Patient' and 'Doctor' are common nouns here and should be lowercase, and 'Tuesday' needs a capital.",
            },
            {
              text: "The patient will see the doctor on Tuesday in Radiology.",
              correct: true,
              rationale:
                "Correct. Common nouns stay lowercase, the day of the week is capitalized, and Radiology as a named department is capitalized.",
            },
            {
              text: "the patient will see the doctor on Tuesday in radiology.",
              correct: false,
              rationale:
                "The first word of a sentence must be capitalized, and the named department Radiology should be too.",
            },
            {
              text: "The Patient will see Dr. Okafor on tuesday in radiology.",
              correct: false,
              rationale:
                "'Dr. Okafor' is correct, but 'Patient' should be lowercase and 'Tuesday' needs a capital.",
            },
          ],
        },
        {
          id: "t2-prof-1",
          prompt:
            "A coworker needs the updated supply list. Which message is appropriate for the workplace?",
          principle:
            "Professional does not mean stiff. It means clear about what you need, specific about when, and respectful of the reader's time.",
          choices: [
            {
              text: "hey can u send me that list asap?? need it",
              correct: false,
              rationale:
                "Missing capitalization and punctuation, abbreviations, and no specificity about which list or when it is needed.",
            },
            {
              text: "Send the supply list.",
              correct: false,
              rationale:
                "Grammatically correct but abrupt, and it gives no deadline or context. Correct is not the same as professional.",
            },
            {
              text: "Hi Marcus — could you send me the updated supply list before Thursday's order? Thank you.",
              correct: true,
              rationale:
                "Correct. It greets the reader, names exactly what is needed, gives a deadline and a reason, and stays brief.",
            },
            {
              text: "I was wondering if at some point when you have a moment you might possibly be able to look into sending over that list we discussed.",
              correct: false,
              rationale:
                "Polite but wordy and vague. The reader still does not know which list or when it is due.",
            },
          ],
        },
        {
          id: "t2-clarity-1",
          prompt:
            "Which version of this instruction is clearest for a patient?",
          principle:
            "Clarity means the reader knows exactly what to do. Replace vague timing with specific timing, and jargon with plain words.",
          choices: [
            {
              text: "Take the medication as directed with adequate hydration.",
              correct: false,
              rationale:
                "'As directed' and 'adequate hydration' assume the patient already knows. Neither tells them what to actually do.",
            },
            {
              text: "Take one tablet with a full glass of water every morning with breakfast.",
              correct: true,
              rationale:
                "Correct. It states how much, with what, how often, and when — nothing is left for the patient to guess.",
            },
            {
              text: "Administer one tablet PO QAM with food.",
              correct: false,
              rationale:
                "This is written for a clinician, not a patient. Abbreviations like PO and QAM belong in the record, not in patient instructions.",
            },
            {
              text: "Take your medication regularly and stay hydrated.",
              correct: false,
              rationale:
                "'Regularly' could mean anything. The patient cannot follow this without more information.",
            },
          ],
        },
        {
          id: "t2-subject-1",
          prompt:
            "What is the complete subject of this sentence? “The new front-desk assistant verified the patient's insurance before the appointment.”",
          principle:
            "The complete subject is who or what the sentence is about, together with the words describing it. Find the verb first, then ask who or what did it.",
          choices: [
            {
              text: "assistant",
              correct: false,
              rationale:
                "That is the simple subject. The complete subject also includes the words describing it.",
            },
            {
              text: "The new front-desk assistant",
              correct: true,
              rationale:
                "Correct. The verb is 'verified'; who verified? The new front-desk assistant — including all its describing words.",
            },
            {
              text: "the patient's insurance",
              correct: false,
              rationale:
                "That is the object — what was verified, not who did the verifying.",
            },
            {
              text: "before the appointment",
              correct: false,
              rationale:
                "That is a prepositional phrase telling you when. It cannot be the subject.",
            },
          ],
        },
      ],
    },
    {
      kind: "word-bank",
      title: "Words to spell",
      listNumber: 2,
    },
  ],

  product: {
    label: "Professional patient or staff communication",
    description:
      "Write a short professional communication from the scenario below. It must apply this topic's grammar and spelling, use a professional tone, stay clear, and keep to objective language. Aim for four to six sentences — brevity is part of the skill.",
    scenario:
      "A patient has called the office asking to move an appointment that is scheduled for Thursday. The next opening with her provider is the following Tuesday at 10:00 a.m. She also asked whether she still needs to fast beforehand; the answer is yes, for eight hours. Write the message she will receive.",
  },

  reflection: [
    "Read your draft out loud. Where did you stumble? That is usually where the reader will too.",
    "Did you tell the reader what to do next, or only give them information?",
    "Could someone outside healthcare understand every word you used?",
  ],

  beforeYouLeave: [
    "Completed the grammar diagnostic",
    "Reviewed Word Bank List 2, including the confusable pairs",
    "Drafted the patient or staff communication",
    "Checked your draft against all five Communication Check criteria",
  ],
};
