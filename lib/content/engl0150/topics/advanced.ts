import { Topic } from "@/types/engl0150";

/**
 * ADVANCED TOPICS — the Instructor's Guide's optional additional topics.
 *
 * These sit outside the ten core topics and are not on the Fall 1 calendar.
 * The guide supplies no session counts. Each is set to 1 session here: every
 * one has a single cumulative product and a single grammar focus, which is the
 * shape of the guide's other one-session topics. Numbered from 101 so they
 * never collide with core topic routes.
 *
 * Recorded in docs/ENGL0150_AUTHORED_ADDITIONS.md.
 */

export const advancedA: Topic = {
  number: 101,
  slug: "101",
  track: "advanced",
  programs: ["Medical Assisting", "Patient Care Technician"],
  title: "Medication & Treatment Documentation",
  unit: { number: 6, title: "Advanced Topics" },
  sessions: "1",
  goals: ["documentation", "grammar-sentence"],
  spiralsFrom: [3, 4],

  essentialQuestion:
    "Why must numbers, times, names, and details be documented with extreme accuracy?",

  concepts: [
    "Accuracy as a safety property, not a tidiness one",
    "Medication safety — the categories of error documentation can prevent",
    "Reading labels and orders exactly as written",
    "Numbers and units: a misplaced decimal is a tenfold error",
    "Timing — when something was given is as important as what",
    "Never guessing and never altering information after the fact",
  ],

  grammar: [
    {
      heading: "Precision",
      points: [
        "Numbers: write them so they cannot be misread",
        "Capitalization of drug names and proper nouns",
        "Abbreviations, and the ones that must never be used",
        "Punctuation that changes meaning in a dosage",
        "Commonly confused words in clinical writing",
      ],
    },
  ],

  wordListNumber: 10,

  practice: [
    {
      kind: "grammar-drill",
      title: "Which entry is correct?",
      instructions:
        "Every option here is something that has appeared in a real record somewhere. Only one is safe.",
      items: [
        {
          id: "adv-a-1",
          prompt: "Which dosage is written safely?",
          principle:
            "A trailing zero after a decimal point is a known cause of tenfold overdose — 1.0 mg is read as 10 mg when the point is faint. Write 1 mg. Conversely, always use a leading zero: .5 mg is read as 5 mg; write 0.5 mg.",
          choices: [
            {
              text: "1.0 mg",
              correct: false,
              rationale:
                "The trailing zero is dangerous. If the decimal point is faint or smudged this reads as 10 mg. Write 1 mg.",
            },
            {
              text: "1 mg",
              correct: true,
              rationale:
                "Correct. No trailing zero, no ambiguity, nothing that can be misread as a larger dose.",
            },
            {
              text: ".5 mg",
              correct: false,
              rationale:
                "Missing the leading zero. A faint decimal point makes this read as 5 mg — a tenfold error. Write 0.5 mg.",
            },
            {
              text: "1.0mg",
              correct: false,
              rationale:
                "Trailing zero and no space before the unit, which makes 'mg' easy to misread as part of the number.",
            },
          ],
        },
        {
          id: "adv-a-2",
          prompt: "Which abbreviation should never be used?",
          principle:
            "Several abbreviations appear on the Institute for Safe Medication Practices' do-not-use list because they have a documented history of being misread with serious consequences.",
          choices: [
            {
              text: "mg for milligram",
              correct: false,
              rationale: "Standard and unambiguous.",
            },
            {
              text: "U for units",
              correct: true,
              rationale:
                "Correct — this one is on the do-not-use list. A handwritten 'U' is read as a zero, turning 4U into 40 units. Write 'units'.",
            },
            {
              text: "mL for milliliter",
              correct: false,
              rationale: "Standard and unambiguous.",
            },
            {
              text: "kg for kilogram",
              correct: false,
              rationale: "Standard and unambiguous.",
            },
          ],
        },
        {
          id: "adv-a-3",
          prompt: "Which entry documents the time correctly?",
          principle:
            "Timing is often the most consequential detail in a medication record. Ambiguous time formats create gaps nobody can reconstruct later.",
          choices: [
            {
              text: "Given this morning.",
              correct: false,
              rationale:
                "Unusable. 'This morning' could be a five-hour window, and the next dose is calculated from it.",
            },
            {
              text: "Given at 0930.",
              correct: true,
              rationale:
                "Correct. A specific time in an unambiguous 24-hour format.",
            },
            {
              text: "Given at 9:30.",
              correct: false,
              rationale:
                "Missing a.m. or p.m. In a 12-hour format that is a twelve-hour ambiguity.",
            },
            {
              text: "Given before lunch.",
              correct: false,
              rationale:
                "Relative to an event that happens at different times for different patients.",
            },
          ],
        },
        {
          id: "adv-a-4",
          prompt:
            "You realize an entry you made an hour ago has the wrong time. What do you do?",
          principle:
            "Records are corrected, never rewritten. Altering an entry so the original cannot be seen looks identical to concealment, whatever the intention.",
          choices: [
            {
              text: "Erase it and write the correct time",
              correct: false,
              rationale:
                "Destroys the audit trail. In a paper record, erasure is itself a finding.",
            },
            {
              text: "Use the correction process: mark it as an error, enter the correct information, and sign and date the correction",
              correct: true,
              rationale:
                "Correct. The original stays visible, the correction is attributed, and anyone reading it later can see exactly what happened.",
            },
            {
              text: "Leave it — an hour is not a significant difference",
              correct: false,
              rationale:
                "The next dose may be calculated from that time. An hour can matter a great deal.",
            },
            {
              text: "Ask a colleague to change it under their login",
              correct: false,
              rationale:
                "Using another person's credentials is a serious violation on its own, quite apart from the falsification.",
            },
          ],
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 10 },
  ],

  product: {
    label: "Simulated medication / treatment documentation record",
    description:
      "Complete a simulated medication or treatment documentation record. Every number, unit, and time must be written so it cannot be misread. Use no abbreviation from the do-not-use list.",
  },

  reflection: [
    "Read every number you wrote as though the decimal point were smudged. Does any of them become a different dose?",
    "Could someone reconstruct exactly when each thing happened?",
    "Is there any abbreviation here you would not want a tired colleague to interpret at 3am?",
  ],
};

export const advancedB: Topic = {
  number: 102,
  slug: "102",
  track: "advanced",
  title: "HIPAA, Confidentiality & Ethical Writing",
  unit: { number: 6, title: "Advanced Topics" },
  sessions: "1",
  goals: ["documentation", "professional-writing", "patient-centered"],
  spiralsFrom: [3, 7],

  essentialQuestion:
    "What should I communicate, to whom, and how much information is appropriate?",

  concepts: [
    "The minimum necessary principle — disclose what the purpose requires and no more",
    "Confidentiality in writing, including in messages you consider informal",
    "Appropriate audience: who actually needs to know this?",
    "Professional boundaries in written communication",
    "Public versus private communication, and how easily the line moves",
    "Digital communication risks — forwarding, screenshots, and shared screens",
  ],

  grammar: [
    {
      heading: "Clarity and precision",
      points: [
        "Vague pronouns that leave the reader guessing who is meant",
        "Ambiguous wording that could describe two different situations",
        "Pronoun–noun agreement",
        "Revising unclear sentences until only one reading is possible",
      ],
    },
  ],

  wordListNumber: 11,

  practice: [
    {
      kind: "sorter",
      title: "Who needs to know?",
      instructions:
        "For each disclosure, decide whether it meets the minimum necessary standard.",
      bins: [
        { id: "ok", label: "Appropriate", hint: "The purpose requires it" },
        { id: "no", label: "Too much", hint: "More than the purpose requires" },
      ],
      items: [
        {
          id: "adv-b-s1",
          text: "Sending records for one date of service to a specialist who requested them for that visit.",
          bin: "ok",
          feedback: "Limited to the purpose and the dates in question. This is the standard working correctly.",
        },
        {
          id: "adv-b-s2",
          text: "Sending the complete chart because it is quicker than pulling the relevant pages.",
          bin: "no",
          feedback:
            "Convenience is not a purpose. Everything beyond what was requested is an unnecessary disclosure.",
        },
        {
          id: "adv-b-s3",
          text: "Telling a colleague on the care team the patient's diagnosis so they can prepare the room appropriately.",
          bin: "ok",
          feedback: "A treatment purpose, disclosed to someone on the care team who needs it.",
        },
        {
          id: "adv-b-s4",
          text: "Mentioning in the break room that a patient you both know came in today.",
          bin: "no",
          feedback:
            "Confirming that someone received care here is itself protected information, and a break room is not a private space.",
        },
        {
          id: "adv-b-s5",
          text: "Answering a spouse's phone question about the visit, with no authorization on file.",
          bin: "no",
          feedback:
            "Marriage does not confer a right to another adult's health information. Confirming the visit happened already discloses too much.",
        },
        {
          id: "adv-b-s6",
          text: "Including the diagnosis code on a claim submitted to the patient's insurer.",
          bin: "ok",
          feedback:
            "A payment purpose, which is a permitted disclosure. The claim carries what payment requires.",
        },
      ],
    },
    {
      kind: "rewrite",
      title: "Rewrite the unsafe message",
      instructions:
        "Each of these was sent. Rewrite so it does the job without the exposure.",
      items: [
        {
          id: "adv-b-r1",
          before:
            "Team — heads up that Maria Alvarez from the front desk's sister is coming in this afternoon for the thing we talked about. Be discreet!",
          problem:
            "Names the patient, identifies her by her relationship to a staff member, hints at the condition, and broadcasts it to a group. 'Be discreet' does not undo any of that.",
          model:
            "Team — we have a patient this afternoon who has asked for extra privacy. Please use the side room and avoid using names in the corridor. Details are in the chart for those directly involved in her care.",
          rubric: [
            "Contains no name and no identifying relationship",
            "Contains no hint of the condition",
            "Says what staff should actually do differently",
            "Points those who need details to the record rather than the message",
          ],
        },
        {
          id: "adv-b-r2",
          before:
            "She said she'd been having those symptoms since the thing last year and she thinks it might be related to it.",
          problem:
            "Every noun has been replaced by a pronoun or 'thing'. A reader cannot tell what symptoms, what event, or what she thinks is related.",
          model:
            "Patient reports the joint pain has been present since her surgery in March 2025, and states, “I think it started after the operation.”",
          rubric: [
            "Every pronoun has one clear referent",
            "'Thing' and similar placeholders are replaced with the actual noun",
            "The patient's own view is quoted rather than paraphrased",
            "Only one reading of the sentence is possible",
          ],
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 11 },
  ],

  product: {
    label: "Confidentiality incident / case response",
    description:
      "Analyze a confidentiality scenario and produce an appropriate written response: what happened, who needed to know, what should have been disclosed instead, and what you would do now.",
  },

  reflection: [
    "For each disclosure in your response, name the purpose it served.",
    "Would the patient be comfortable reading what you wrote about them?",
    "Is there anything here that identifies the patient indirectly?",
  ],
};

export const advancedC: Topic = {
  number: 103,
  slug: "103",
  track: "advanced",
  programs: ["Medical Billing"],
  title: "Insurance & Billing Communication",
  unit: { number: 6, title: "Advanced Topics" },
  sessions: "1",
  goals: ["patient-centered", "professional-writing", "grammar-sentence"],
  spiralsFrom: [6, 7],

  essentialQuestion:
    "How can I explain an administrative or billing issue clearly without creating confusion or sounding dismissive?",

  concepts: [
    "Patient-friendly financial language",
    "Avoiding jargon: deductible, coinsurance, and allowed amount all need translating",
    "Accuracy — a wrong number in a billing message erodes trust immediately",
    "Professional tone when the news is unwelcome",
    "Communicating what the patient should do next, specifically",
  ],

  grammar: [
    {
      heading: "Commonly confused words and precision",
      points: [
        "affect versus effect",
        "their, there, and they're",
        "its versus it's",
        "your versus you're",
        "then versus than",
      ],
    },
  ],

  wordListNumber: 12,

  practice: [
    {
      kind: "matcher",
      title: "Translate the billing jargon",
      instructions:
        "Match each term to plain language, then practise explaining it to a patient who is worried about money.",
      pairs: [
        {
          id: "adv-c-m1",
          term: "deductible",
          plain: "what you pay before the plan starts paying",
          explanation:
            "Your plan has a set amount you pay yourself each year before it begins covering costs. Once you have paid that amount, your plan starts sharing the cost with you.",
        },
        {
          id: "adv-c-m2",
          term: "coinsurance",
          plain: "your percentage share of the cost",
          explanation:
            "After your deductible is met, you pay a percentage of the cost and your plan pays the rest. For you that share is 20 percent.",
        },
        {
          id: "adv-c-m3",
          term: "allowed amount",
          plain: "the price your plan has agreed with us",
          explanation:
            "We and your insurance company agreed on a set price for this visit. That agreed price is what your share is calculated from — not the amount on our original bill.",
        },
        {
          id: "adv-c-m4",
          term: "prior authorization",
          plain: "advance approval from your insurance",
          explanation:
            "Your insurance needs to approve this service before you have it. We send the request, and we will let you know as soon as they respond.",
        },
        {
          id: "adv-c-m5",
          term: "out-of-network",
          plain: "a provider your plan has no agreement with",
          explanation:
            "This provider does not have a contract with your insurance company, so your plan covers less of the cost than it would elsewhere.",
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Choose the correct word",
      instructions:
        "The confusable pairs that appear most in billing correspondence.",
      items: [
        {
          id: "adv-c-g1",
          prompt: "Which sentence is correct?",
          principle:
            "'Affect' is almost always the verb; 'effect' is almost always the noun. The change affects your bill; the change had an effect on your bill.",
          choices: [
            {
              text: "The change in your plan will effect your out-of-pocket cost.",
              correct: false,
              rationale: "Needs the verb 'affect'.",
            },
            {
              text: "The change in your plan will affect your out-of-pocket cost.",
              correct: true,
              rationale: "Correct. 'Affect' is the verb — the change acts on the cost.",
            },
            {
              text: "The affect of the change is a higher out-of-pocket cost.",
              correct: false,
              rationale: "Needs the noun 'effect'.",
            },
            {
              text: "The change will have an affect on your cost.",
              correct: false,
              rationale: "After 'an', you need the noun 'effect'.",
            },
          ],
        },
        {
          id: "adv-c-g2",
          prompt: "Which sentence uses 'its' and 'it's' correctly?",
          principle:
            "'It's' is always 'it is' or 'it has'. 'Its' shows possession. If you cannot substitute 'it is', use 'its'.",
          choices: [
            {
              text: "Its important to know that you're plan changed it's terms.",
              correct: false,
              rationale: "All three are wrong: It's, your, its.",
            },
            {
              text: "It's important to know that your plan changed its terms.",
              correct: true,
              rationale:
                "Correct. 'It's' expands to 'it is'; 'your' is possessive; 'its' is possessive.",
            },
            {
              text: "It's important to know that you're plan changed it's terms.",
              correct: false,
              rationale: "The first is right, but 'you're' and 'it's' are both wrong here.",
            },
            {
              text: "Its important to know that your plan changed its terms.",
              correct: false,
              rationale: "The first should be 'It's' — it expands to 'It is important'.",
            },
          ],
        },
        {
          id: "adv-c-g3",
          prompt:
            "A patient's claim was denied. Which message is professional without being dismissive?",
          principle:
            "When the news is unwelcome, lead with what you will do rather than with what the patient cannot have.",
          choices: [
            {
              text: "Your claim was denied. You will need to contact your insurance company.",
              correct: false,
              rationale:
                "Accurate and cold. It hands the patient a problem and a phone number.",
            },
            {
              text: "Unfortunately there is nothing we can do about this.",
              correct: false,
              rationale:
                "Almost never true, and it closes the conversation before the patient understands what happened.",
            },
            {
              text: "Your insurance did not cover this visit, and we are appealing that decision on your behalf. You do not need to do anything right now — we will call you by Friday with an update. If you have questions before then, call us at 555-0134.",
              correct: true,
              rationale:
                "Correct. States what happened in plain language, says what is being done, tells the patient what they need to do (nothing), and gives a date.",
            },
            {
              text: "Per your plan's terms, the service was adjudicated as non-covered pursuant to the benefit exclusions applicable to your policy year.",
              correct: false,
              rationale:
                "Every word is jargon. A worried patient reads this twice and still does not know what to do.",
            },
          ],
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 12 },
  ],

  product: {
    label: "Patient billing communication",
    description:
      "Write a professional communication explaining an insurance or billing issue to a patient. Translate every piece of jargon, state the numbers accurately, say what you are doing about it, and say what the patient should do next.",
  },

  reflection: [
    "Would a patient with no insurance knowledge understand what happened?",
    "Did you say what you are doing, or only what went wrong?",
    "Are all your numbers correct? Check them twice — a wrong figure here costs trust immediately.",
  ],
};

export const advancedD: Topic = {
  number: 104,
  slug: "104",
  track: "advanced",
  title: "Difficult Conversations & Professional Tone",
  unit: { number: 6, title: "Advanced Topics" },
  sessions: "1",
  goals: ["professional-writing", "patient-centered"],
  spiralsFrom: [7, 9],

  essentialQuestion:
    "How can I communicate professionally when the patient or coworker is upset?",

  concepts: [
    "Tone under pressure, in writing where you cannot soften it with your voice",
    "De-escalation — acknowledging the feeling before addressing the facts",
    "Empathy without overpromising: 'I understand' does not mean 'I will fix it'",
    "Respectful language when you are being blamed",
    "Boundaries: what you can offer and what you cannot",
    "Professional responses to complaints",
  ],

  grammar: [
    {
      heading: "Word choice",
      points: [
        "Connotation — words that mean nearly the same thing and land very differently",
        "Polite requests versus commands",
        "Modal verbs: could, would, may, and how they soften without hedging",
        "Positive versus negative framing of the same fact",
        "Avoiding judgmental language when you are frustrated",
      ],
    },
  ],

  wordListNumber: 13,

  practice: [
    {
      kind: "tone",
      title: "Tone under pressure",
      instructions:
        "Each of these is a reply to an upset patient or coworker. Place it, then rewrite the ones that miss.",
      samples: [
        {
          id: "adv-d-t1",
          text: "As I already explained in my previous message, the policy has not changed and there is nothing further I can do.",
          band: 0,
          feedback:
            "Blunt. 'As I already explained' tells the reader they were not listening, and the reply closes every door at once.",
          professional:
            "I know this is frustrating, and I am sorry the answer has not changed. The policy does not allow an exception here, but I can put you in touch with our patient advocate, who may have options I do not.",
        },
        {
          id: "adv-d-t2",
          text: "Received. Will look into it.",
          band: 1,
          feedback:
            "Abrupt. It is not rude exactly, but to someone already upset it reads as indifference. Two more sentences would change how it lands entirely.",
          professional:
            "Thank you for letting me know — I can see why that would be frustrating. I am looking into it now and will get back to you by the end of the day, even if I only have a partial answer.",
        },
        {
          id: "adv-d-t3",
          text: "I am sorry you waited so long today — an hour is a long time and you were not told why. Here is what happened, and here is what I can do about the rescheduling.",
          band: 2,
          feedback:
            "Professional. Acknowledges the specific complaint, does not over-apologize or make excuses, and moves straight to what can be done.",
        },
        {
          id: "adv-d-t4",
          text: "I am so incredibly sorry, this is entirely our fault and completely unacceptable, and I promise you this will never happen again and I will personally make sure everything is fixed for you.",
          band: 3,
          feedback:
            "Over-soft, and it promises things you cannot deliver. Accepting blame on behalf of the practice and guaranteeing a future outcome both create problems, and the intensity can read as insincere.",
          professional:
            "I am sorry about the wait — that was longer than it should have been. I have passed it to our practice manager, and I can rebook you at a time that works better if that would help.",
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Word choice under pressure",
      instructions: "Connotation, modals, and framing.",
      items: [
        {
          id: "adv-d-g1",
          prompt:
            "Which phrasing makes a request rather than issuing a command?",
          principle:
            "Modal verbs — could, would, may — soften a request without making it vague. The reader still knows exactly what is being asked.",
          choices: [
            {
              text: "Send me the file.",
              correct: false,
              rationale:
                "An imperative. Fine in instructions, brusque between colleagues under tension.",
            },
            {
              text: "Could you send me the file by Tuesday?",
              correct: true,
              rationale:
                "Correct. The modal makes it a request, and the deadline keeps it specific.",
            },
            {
              text: "I need that file.",
              correct: false,
              rationale: "States your need and leaves the reader to infer the request.",
            },
            {
              text: "It would be great if maybe someone could possibly send the file at some point.",
              correct: false,
              rationale:
                "So softened that nobody knows they are being asked, or by when.",
            },
          ],
        },
        {
          id: "adv-d-g2",
          prompt:
            "Which is the better framing of the same fact: the appointment cannot happen before Thursday.",
          principle:
            "Positive framing says what is possible. Negative framing says what is not, and leaves the reader with nowhere to go.",
          choices: [
            {
              text: "We cannot see you before Thursday.",
              correct: false,
              rationale:
                "True, and it gives the patient a refusal rather than an option.",
            },
            {
              text: "The earliest we can see you is Thursday at 10:00. Shall I hold that for you?",
              correct: true,
              rationale:
                "Correct. Same fact, stated as an available option, with a next step attached.",
            },
            {
              text: "Unfortunately nothing is available until Thursday, sorry.",
              correct: false,
              rationale:
                "Two apology words around the same refusal. It softens the tone without helping.",
            },
            {
              text: "Thursday is the only day.",
              correct: false,
              rationale: "Abrupt, and it omits the time and the offer to book it.",
            },
          ],
        },
        {
          id: "adv-d-g3",
          prompt:
            "A patient writes an angry message blaming you personally for a billing error you did not make. What is the best opening line?",
          principle:
            "Acknowledge the feeling before the facts. Defending yourself first, however justified, escalates.",
          choices: [
            {
              text: "That was not my error.",
              correct: false,
              rationale:
                "True and escalating. It makes the exchange about responsibility rather than about fixing the bill.",
            },
            {
              text: "I am sorry this happened — an unexpected bill is stressful, and I want to get it sorted for you.",
              correct: true,
              rationale:
                "Correct. Acknowledges the impact without accepting blame, and moves to the resolution. 'I am sorry this happened' is not an admission of fault.",
            },
            {
              text: "Please calm down and I will look at it.",
              correct: false,
              rationale:
                "Telling an upset person to calm down reliably has the opposite effect.",
            },
            {
              text: "Per our policy, billing inquiries must be directed to the billing department.",
              correct: false,
              rationale:
                "Procedurally correct and completely unresponsive to a person who is upset.",
            },
          ],
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 13 },
  ],

  product: {
    label: "Professional response to a difficult scenario",
    description:
      "Write a professional response to an upset patient or coworker. Acknowledge the feeling, state the facts accurately, say what you can do and what you cannot, and give a next step. Do not overpromise.",
  },

  reflection: [
    "Read your first sentence. Does it acknowledge, or defend?",
    "Did you promise anything you cannot personally deliver?",
    "Would you be comfortable if your supervisor read this?",
  ],
};

export const advancedTopics: Topic[] = [
  advancedA,
  advancedB,
  advancedC,
  advancedD,
];
