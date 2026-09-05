import { Topic } from "@/types/engl0150";

/** TOPIC 6 — Writing Clear Patient Instructions (2 sessions) */
export const topic6: Topic = {
  number: 6,
  slug: "6",
  title: "Writing Clear Patient Instructions",
  unit: { number: 3, title: "Patient Communication" },
  sessions: "2",
  goals: ["patient-centered", "grammar-sentence", "professional-writing"],
  spiralsFrom: [2, 3],

  essentialQuestion:
    "How do I communicate healthcare information so a patient can actually understand and use it?",

  concepts: [
    "Health literacy — a large share of adults find standard medical instructions hard to act on, and that says nothing about their intelligence",
    "Medical jargon versus patient-friendly language",
    "Sequencing: instructions in the order the patient will do them",
    "Audience awareness — you are not writing for a colleague",
    "Tell the patient what to do, rather than only giving them information",
  ],

  grammar: [
    {
      heading: "Strong sentences",
      points: [
        "Simple versus complex sentences, and why simple usually wins in instructions",
        "Sentence fragments — and the one place they are acceptable",
        "Run-ons and comma splices",
        "Transition words that show sequence: first, next, then, after, finally",
      ],
    },
    {
      heading: "Imperative sentences",
      points: [
        "The imperative gives a direct instruction: 'Take one tablet each morning'",
        "The subject 'you' is understood rather than written",
        "Imperatives are shorter and clearer than 'the patient should' constructions",
      ],
    },
  ],

  wordListNumber: 6,

  practice: [
    {
      kind: "matcher",
      title: "Translate the jargon",
      instructions:
        "Match each clinical term to plain language, then practice saying it to a patient.",
      pairs: [
        {
          id: "t6-m1",
          term: "hypertension",
          plain: "high blood pressure",
          explanation:
            "Your blood pressure is higher than it should be. That means your heart is working harder than it needs to.",
        },
        {
          id: "t6-m2",
          term: "NPO after midnight",
          plain: "nothing to eat or drink after midnight",
          explanation:
            "Do not eat or drink anything — including water — after midnight tonight. If you take morning medications, ask us which ones to take with a small sip.",
        },
        {
          id: "t6-m3",
          term: "administer topically",
          plain: "put it on the skin",
          explanation:
            "Put a thin layer on the skin over the sore area. It is not something you swallow.",
        },
        {
          id: "t6-m4",
          term: "adverse reaction",
          plain: "a harmful side effect",
          explanation:
            "If the medicine makes you feel worse rather than better, stop taking it and call us right away.",
        },
        {
          id: "t6-m5",
          term: "ambulate",
          plain: "walk",
          explanation:
            "Try to get up and walk a short distance a few times a day, as long as it does not hurt.",
        },
        {
          id: "t6-m6",
          term: "contraindicated",
          plain: "not safe to use in your case",
          explanation:
            "This medicine is not safe to take with the other one you are on, so we are using a different one.",
        },
      ],
    },
    {
      kind: "sequencer",
      title: "Put the instructions in a safe order",
      instructions:
        "These wound-care steps are scrambled. Order them the way the patient will actually do them.",
      items: [
        {
          id: "t6-q1",
          text: "Wash your hands with soap and water.",
          position: 1,
          reason:
            "Hand washing comes first. Touching a wound with unwashed hands is how an infection starts, so this cannot come later.",
        },
        {
          id: "t6-q2",
          text: "Take off the old bandage and throw it away.",
          position: 2,
          reason: "The old dressing comes off before you can see or clean the wound.",
        },
        {
          id: "t6-q3",
          text: "Rinse the wound gently with clean water.",
          position: 3,
          reason: "Clean the wound once it is uncovered and before anything new goes on it.",
        },
        {
          id: "t6-q4",
          text: "Pat the skin around the wound dry with a clean towel.",
          position: 4,
          reason:
            "A dressing will not stick to wet skin, so drying comes after rinsing and before the new bandage.",
        },
        {
          id: "t6-q5",
          text: "Put on a new bandage.",
          position: 5,
          reason: "The new dressing goes on last, over a clean and dry area.",
        },
        {
          id: "t6-q6",
          text: "Wash your hands again.",
          position: 6,
          reason:
            "Hand washing bookends the task. Your hands touched a used dressing, so they are washed again at the end.",
        },
      ],
    },
    {
      kind: "rewrite",
      title: "Fix confusing instructions",
      instructions:
        "Each of these was given to a real-seeming patient and did not work. Rewrite it.",
      items: [
        {
          id: "t6-r1",
          before:
            "Patient should administer the prescribed analgesic PRN for post-operative discomfort and monitor the incision site for signs of infection.",
          problem:
            "Written for a colleague. 'Analgesic', 'PRN', 'post-operative', and 'signs of infection' all assume training the patient does not have.",
          model:
            "Take one pain tablet when you need it, up to four times a day. Look at the cut once a day. Call us if it becomes more red, more painful, or starts leaking fluid, or if you get a fever.",
          rubric: [
            "Uses the imperative — tells the patient what to do",
            "Replaces every piece of jargon with a plain word",
            "Says what 'signs of infection' actually look like",
            "Gives a specific limit or frequency, not 'as needed'",
          ],
        },
        {
          id: "t6-r2",
          before:
            "Take your medication regularly and be sure to stay well hydrated throughout the day.",
          problem:
            "'Regularly' and 'well hydrated' mean nothing specific. The patient cannot follow this even if they want to.",
          model:
            "Take one tablet every morning with breakfast. Drink about six to eight glasses of water a day.",
          rubric: [
            "States how much and how often, with numbers",
            "Ties the dose to something in the patient's day",
            "Replaces vague quantifiers with specific amounts",
            "Would produce the same behavior from any two readers",
          ],
        },
        {
          id: "t6-r3",
          before:
            "If symptoms worsen or fail to improve within an appropriate timeframe, contact the office.",
          problem:
            "The patient does not know what 'worsen' means here or what an appropriate timeframe is. Under pressure they will guess, and they may guess late.",
          model:
            "Call us if the pain gets worse, if you get a fever over 100.4°F, or if you are not feeling better in three days. If you have trouble breathing, call 911.",
          rubric: [
            "Names the specific symptoms that should prompt a call",
            "Gives a number for the timeframe",
            "Separates 'call us' from 'this is an emergency'",
            "Could be acted on by someone frightened and distracted",
          ],
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Fragments, run-ons, and the imperative",
      instructions: "The sentence grammar that makes instructions work.",
      items: [
        {
          id: "t6-g1",
          prompt: "Which is the clearest instruction for a patient?",
          principle:
            "The imperative gives a direct instruction with the subject 'you' understood. It is shorter and leaves less room for doubt.",
          choices: [
            {
              text: "The patient should ensure that the medication is taken each morning.",
              correct: false,
              rationale:
                "Third person and passive. The patient reading it may not register that 'the patient' means them.",
            },
            {
              text: "Take one tablet each morning with breakfast.",
              correct: true,
              rationale:
                "Correct. Imperative, specific, and tied to a moment in the patient's day.",
            },
            {
              text: "Medication administration should occur in the morning hours.",
              correct: false,
              rationale:
                "No doer, no dose, and 'morning hours' is vaguer than 'with breakfast'.",
            },
            {
              text: "It is recommended that morning dosing be observed.",
              correct: false,
              rationale:
                "Doubly passive and reads as optional. A recommendation the patient may not follow.",
            },
          ],
        },
        {
          id: "t6-g2",
          prompt: "Which sentence is a run-on that needs fixing?",
          principle:
            "Two complete sentences joined by only a comma is a comma splice. In instructions this matters, because the reader loses where one step ends.",
          choices: [
            {
              text: "Wash your hands, then remove the old bandage.",
              correct: false,
              rationale:
                "Correct as written. 'Then' plus a comma links the steps properly.",
            },
            {
              text: "Wash your hands, remove the old bandage, rinse the wound with clean water, pat it dry, put on a new bandage.",
              correct: true,
              rationale:
                "Correct — this is the run-on. Five instructions strung together with commas. Break them into separate sentences or a numbered list.",
            },
            {
              text: "Wash your hands. Remove the old bandage.",
              correct: false,
              rationale: "Two clear sentences, correctly separated.",
            },
            {
              text: "After washing your hands, remove the old bandage.",
              correct: false,
              rationale:
                "Correct. A dependent clause followed by a main clause, properly punctuated.",
            },
          ],
        },
        {
          id: "t6-g3",
          prompt:
            "Which transition word best signals that this is the last step?",
          principle:
            "Sequence transitions tell the reader where they are in a process. Using them consistently prevents a patient stopping halfway.",
          choices: [
            {
              text: "Also",
              correct: false,
              rationale: "'Also' adds an item without signalling position. The reader does not know they are finishing.",
            },
            {
              text: "Finally",
              correct: true,
              rationale:
                "Correct. 'Finally' tells the reader this is the last step, which is genuinely reassuring in a set of instructions.",
            },
            {
              text: "However",
              correct: false,
              rationale: "'However' signals contrast, which would confuse a sequence.",
            },
            {
              text: "Meanwhile",
              correct: false,
              rationale:
                "'Meanwhile' suggests two things happening at once — the opposite of a final step.",
            },
          ],
        },
        {
          id: "t6-g4",
          prompt: "Which sentence uses 'once' and 'ones' correctly?",
          principle:
            "Topic 6 confusables. 'Once' means one time; 'ones' is the plural of 'one' standing in for a noun.",
          choices: [
            {
              text: "Change the bandage ones a day and use the clean once from the box.",
              correct: false,
              rationale: "Both are reversed.",
            },
            {
              text: "Change the bandage once a day and use the clean ones from the box.",
              correct: true,
              rationale:
                "Correct. 'Once a day' means one time daily; 'the clean ones' stands in for 'the clean bandages'.",
            },
            {
              text: "Change the bandage once a day and use the clean once from the box.",
              correct: false,
              rationale: "'Once a day' is right, but the second should be 'ones'.",
            },
            {
              text: "Change the bandage ones a day and use the clean ones from the box.",
              correct: false,
              rationale: "The second is right; the first should be 'once'.",
            },
          ],
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 6 },
  ],

  product: {
    label: "Patient instruction sheet",
    description:
      "Write a one-page instruction sheet a patient could follow at home without calling for clarification. Use imperatives, number the steps, replace every piece of jargon, and say specifically when to call the office and when to call 911.",
    scenario:
      "Choose one: caring for a wound after minor stitches; preparing for a procedure that requires nothing to eat or drink after midnight; taking a new blood pressure medication; or monitoring blood pressure at home with a cuff.",
  },

  reflection: [
    "Give your sheet to someone outside healthcare. Ask them to tell you what they would do first — not whether it makes sense.",
    "Did you say what to do, or only what the situation is?",
    "Is there any word on the page you would not use with a neighbor?",
  ],

  beforeYouLeave: [
    "Matched all six jargon terms and drafted plain-language explanations",
    "Put the wound-care steps into a safe order",
    "Rewrote all three confusing instructions",
    "Drafted the instruction sheet and checked it against the Communication Check",
  ],
};
