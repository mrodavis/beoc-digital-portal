import { Topic } from "@/types/engl0150";

/** TOPIC 5 — Handoffs, Messages & Professional Communication (1 session) */
export const topic5: Topic = {
  number: 5,
  slug: "5",
  title: "Handoffs, Messages & Professional Communication",
  unit: { number: 2, title: "Clinical Documentation" },
  sessions: "1",
  goals: ["documentation", "professional-writing", "summarizing", "grammar-sentence"],
  spiralsFrom: [3, 4],

  essentialQuestion:
    "What information does another healthcare professional need from me to safely continue the patient's care?",

  concepts: [
    "Relevant information: what the next person must know to act safely",
    "Prioritization — the most important thing goes first, not last",
    "Conciseness without omission",
    "SBAR as a communication framework: Situation, Background, Assessment, Recommendation",
    "Closed-loop communication — the receiver repeats it back so both people know it landed",
    "Avoiding ambiguity: 'soon', 'a lot', and 'later' mean different things to different people",
  ],

  grammar: [
    {
      heading: "Adjectives and adverbs",
      points: [
        "What each one modifies: adjectives describe nouns, adverbs describe verbs, adjectives, and other adverbs",
        "Changing adjectives into adverbs — usually by adding -ly",
        "good / better / best, and the difference between 'good' and 'well'",
        "less versus fewer: less for amounts you cannot count, fewer for things you can",
        "much versus many, on the same principle",
      ],
    },
    {
      heading: "Verb tenses",
      points: [
        "Present, past, and future, and what each one signals in a handoff",
        "Progressive forms (helping verb + -ing) for action that is ongoing right now",
        "Avoiding shifting tenses mid-report, which makes the timeline unreadable",
      ],
    },
  ],

  wordListNumber: 5,

  practice: [
    {
      kind: "grammar-drill",
      title: "Adjectives, adverbs, and tense",
      instructions:
        "The grammar of a handoff — precision about quantity, degree, and when.",
      items: [
        {
          id: "t5-g1",
          prompt: "Which sentence uses 'fewer' and 'less' correctly?",
          principle:
            "Fewer for things you can count individually. Less for quantities you measure rather than count.",
          choices: [
            {
              text: "The patient had less episodes of dizziness and fewer fluid intake today.",
              correct: false,
              rationale:
                "Both are reversed. Episodes can be counted (fewer); fluid intake is measured (less).",
            },
            {
              text: "The patient had fewer episodes of dizziness and less fluid intake today.",
              correct: true,
              rationale:
                "Correct. Countable episodes take 'fewer'; measurable intake takes 'less'.",
            },
            {
              text: "The patient had less episodes of dizziness and less fluid intake today.",
              correct: false,
              rationale: "'Episodes' are countable, so they need 'fewer'.",
            },
            {
              text: "The patient had fewer episodes of dizziness and fewer fluid intake today.",
              correct: false,
              rationale: "'Fluid intake' is measured, not counted, so it needs 'less'.",
            },
          ],
        },
        {
          id: "t5-g2",
          prompt: "Which sentence keeps the tense consistent?",
          principle:
            "Shifting tense mid-report makes the timeline ambiguous, and in a handoff the timeline is the point.",
          choices: [
            {
              text: "The patient arrived at 0900, reports chest tightness, and was given aspirin.",
              correct: false,
              rationale:
                "Past, present, past. The reader cannot tell whether the chest tightness is current.",
            },
            {
              text: "The patient arrived at 0900, reported chest tightness, and was given aspirin.",
              correct: true,
              rationale:
                "Correct. All past tense — a consistent account of what has already happened.",
            },
            {
              text: "The patient arrives at 0900, reported chest tightness, and is given aspirin.",
              correct: false,
              rationale: "Present, past, present. The sequence is impossible to follow.",
            },
            {
              text: "The patient was arriving at 0900 and reports chest tightness.",
              correct: false,
              rationale:
                "The progressive form suggests an ongoing arrival, and the tense still shifts.",
            },
          ],
        },
        {
          id: "t5-g3",
          prompt:
            "Which phrase should be removed from a handoff because it is ambiguous?",
          principle:
            "Vague quantifiers are where handoffs fail. If two people could read it differently, replace it with a number or a time.",
          choices: [
            {
              text: "Pain rated 7 out of 10",
              correct: false,
              rationale: "A specific self-reported number. Unambiguous.",
            },
            {
              text: "Last dose given at 1400",
              correct: false,
              rationale: "A specific time. Unambiguous.",
            },
            {
              text: "Should be seen fairly soon",
              correct: true,
              rationale:
                "Correct. 'Fairly soon' could mean ten minutes or two hours. Say when, or say what would trigger escalation.",
            },
            {
              text: "Allergic to penicillin — hives and throat swelling",
              correct: false,
              rationale:
                "Names the allergen and the reaction. Exactly what the next person needs.",
            },
          ],
        },
        {
          id: "t5-g4",
          prompt:
            "A colleague repeats your handoff back to you with one detail wrong. What should you do?",
          principle:
            "Closed-loop communication exists so errors surface at the handoff instead of at the bedside. The read-back working is the system succeeding.",
          choices: [
            {
              text: "Let it go — they have the important parts",
              correct: false,
              rationale:
                "The detail you would let go is the one that reaches the patient wrong.",
            },
            {
              text: "Correct the detail and ask them to repeat that part back again",
              correct: true,
              rationale:
                "Correct. That is the loop closing. It costs ten seconds and is the entire point of a read-back.",
            },
            {
              text: "Write it in the chart instead so it is documented",
              correct: false,
              rationale:
                "Documenting is necessary but does not fix a colleague who is about to act on wrong information now.",
            },
            {
              text: "Assume they misspoke and will remember correctly",
              correct: false,
              rationale:
                "A read-back reflects what they actually heard. If it came back wrong, that is what they hold.",
            },
          ],
        },
      ],
    },
    {
      kind: "rewrite",
      title: "Fix an unclear handoff",
      instructions:
        "Each of these was said at a shift change. Rewrite so the next person can act on it.",
      items: [
        {
          id: "t5-r1",
          before:
            "Room 4 isn't doing great, you might want to keep an eye on them.",
          problem:
            "No name, no measurement, no threshold. 'Keep an eye' does not say what to watch or what to do.",
          model:
            "Room 4, Ms. Alvarez: respirations rose from 16 this morning to 24 at 1430, oxygen saturation 92%. Recheck within the hour, and notify the provider if saturation drops below 90%.",
          rubric: [
            "Identifies the patient by name, not by room alone",
            "Includes measured values and how they changed",
            "States what to do and when",
            "States a threshold for escalation",
          ],
        },
        {
          id: "t5-r2",
          before:
            "The patient in bed 2 has some allergies so be careful with meds.",
          problem:
            "'Some allergies' and 'be careful' give the receiver nothing usable. Which allergen, and what reaction?",
          model:
            "Bed 2, Mr. Osei: allergic to penicillin — reaction is hives and throat swelling. Documented in the chart and on his band.",
          rubric: [
            "Names the specific allergen",
            "States the specific reaction, not just that one exists",
            "Confirms where it is documented",
            "Contains no vague instruction like 'be careful'",
          ],
        },
      ],
    },
    {
      kind: "builder",
      storageKey: "sbar",
      title: "Build an SBAR handoff",
      instructions:
        "Four sections. Situation is why you are calling right now; Background is what led here; Assessment is what you are seeing; Recommendation is what you are asking for.",
      scenario:
        "You are a patient care technician on a medical unit. Ms. Lena Okafor in room 312 was admitted two days ago for management of a leg infection. This morning her pulse was 74 and she was talkative. At 1500 you record pulse 112, respirations 24, temperature 101.6°F, and she is quieter than usual and says she feels “strange.” Her blood pressure is 98/60, down from 128/78 this morning. You are calling the nurse.",
      fields: [
        {
          id: "s",
          label: "S — Situation",
          prompt:
            "Who you are, who the patient is, and why you are calling — in one or two sentences.",
          expects: ["okafor", "312"],
          missingHint:
            "Identify the patient by name or room so the nurse knows immediately who this concerns.",
          rows: 2,
        },
        {
          id: "b",
          label: "B — Background",
          prompt: "The relevant history. Why is this patient here, and what has been happening?",
          expects: ["infection", "admitted"],
          missingHint: "Include why the patient is admitted — it frames everything else.",
        },
        {
          id: "a",
          label: "A — Assessment",
          prompt:
            "What you are observing now, with numbers and how they have changed. Report; do not diagnose.",
          expects: ["112", "101.6", "24", "98"],
          missingHint:
            "Include the measured values. A change described without numbers cannot be judged.",
        },
        {
          id: "r",
          label: "R — Recommendation",
          prompt:
            "What you are asking for. Be direct — 'I need you to come and see her now' is appropriate.",
          expects: ["see", "come", "assess", "review", "now"],
          missingHint:
            "State what you want to happen. A report with no request leaves the nurse to guess the urgency.",
          rows: 2,
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 5 },
  ],

  product: {
    label: "Written handoff / SBAR message",
    description:
      "Produce a written SBAR communication from the scenario above. It must be complete enough that the receiver needs to ask you nothing, and short enough to be read in under thirty seconds.",
  },

  reflection: [
    "If the person receiving this could not reach you afterwards, would they still have everything they need?",
    "Did you state what you want to happen, or only what you observed?",
    "Are there any vague quantifiers left — soon, a lot, a bit, slightly?",
  ],

  beforeYouLeave: [
    "Completed the adjective, adverb, and tense drill",
    "Rewrote both unclear handoffs",
    "Built the SBAR and ran the completeness check",
    "Reviewed Word Bank List 5, including the spiral words",
  ],
};
