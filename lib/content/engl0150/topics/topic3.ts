import { Topic } from "@/types/engl0150";

/**
 * TOPIC 3 — Writing About Patients: Objective Documentation (2 sessions)
 *
 * The first real documentation product in the course. Practice items are
 * authored to implement the guide's specified concepts and grammar points;
 * every scenario is fictional.
 */
export const topic3: Topic = {
  number: 3,
  slug: "3",
  title: "Writing About Patients: Objective Documentation",
  unit: { number: 2, title: "Clinical Documentation" },
  sessions: "2",
  goals: ["documentation", "grammar-sentence", "summarizing"],
  spiralsFrom: [2],

  essentialQuestion:
    "How can I document what happened without adding my opinions or assumptions?",

  concepts: [
    "Why documentation must be precise and evidence-based — the record may become part of the professional and legal record",
    "Objective information (what you measured, saw, or heard) versus subjective information (what the patient reported)",
    "Objective language versus judgmental language",
    "Facts versus interpretations",
    "Observations versus assumptions — you can document that a patient winced; you cannot document that they were in severe pain",
  ],

  grammar: [
    {
      heading: "Nouns, verbs, and pronouns",
      points: [
        "Nouns name a person, place, thing, or idea",
        "Subject versus object: who is doing the action, and who receives it",
        "Pronoun forms, and keeping the reference unmistakable",
      ],
    },
    {
      heading: "Types of verbs",
      points: [
        "Action verbs: what someone did — walked, reported, refused",
        "Linking verbs and forms of 'to be': connect a subject to a description",
        "Active voice through subject–verb placement: 'The patient refused the medication' rather than 'The medication was refused'",
      ],
    },
  ],

  wordListNumber: 3,

  practice: [
    {
      kind: "sorter",
      title: "Fact or opinion?",
      instructions:
        "Sort each statement. If it could not be measured, quoted, or directly observed, it is not objective.",
      bins: [
        { id: "objective", label: "Objective", hint: "Measured, observed, or quoted" },
        { id: "subjective", label: "Opinion or assumption", hint: "Interpreted or judged" },
      ],
      items: [
        {
          id: "t3-s1",
          text: "Blood pressure 148/92, right arm, seated.",
          bin: "objective",
          feedback: "A measurement with the conditions recorded. Anyone could verify it.",
        },
        {
          id: "t3-s2",
          text: "Patient seems anxious about the procedure.",
          bin: "subjective",
          feedback:
            "'Seems' is the tell. You are interpreting a mental state you cannot observe directly.",
        },
        {
          id: "t3-s3",
          text: "Patient states, “I have not eaten since yesterday morning.”",
          bin: "objective",
          feedback:
            "A direct quotation of what the patient reported. The quotation marks make clear it is their account, not your conclusion.",
        },
        {
          id: "t3-s4",
          text: "Patient is being difficult about the blood draw.",
          bin: "subjective",
          feedback:
            "'Difficult' is a judgment about the person. Document the behavior instead: what did they say or do?",
        },
        {
          id: "t3-s5",
          text: "Patient withdrew their arm twice during the attempted venipuncture.",
          bin: "objective",
          feedback:
            "An observable action, counted. This is what 'difficult' should have been.",
        },
        {
          id: "t3-s6",
          text: "Patient appears to be exaggerating the pain.",
          bin: "subjective",
          feedback:
            "This assigns a motive you cannot know, and it prejudices every clinician who reads the chart afterwards.",
        },
        {
          id: "t3-s7",
          text: "Patient rated pain 8 out of 10 in the right lower abdomen.",
          bin: "objective",
          feedback:
            "Pain is self-reported, and recording the patient's own number is the objective way to capture it.",
        },
        {
          id: "t3-s8",
          text: "Patient is non-compliant with the medication schedule.",
          bin: "subjective",
          feedback:
            "'Non-compliant' is a label. The fact is what they told you: how many doses, and what they said about why.",
        },
        {
          id: "t3-s9",
          text: "Patient reports taking two of the four prescribed doses this week.",
          bin: "objective",
          feedback:
            "Specific, quoted from the patient, and free of any conclusion about why.",
        },
        {
          id: "t3-s10",
          text: "Wound 3 cm, edges approximated, no drainage noted.",
          bin: "objective",
          feedback: "Measured and described. Another person examining it would write the same thing.",
        },
      ],
    },
    {
      kind: "rewrite",
      title: "Replace judgmental language",
      instructions:
        "Each entry below would be a problem in a real record. Write the objective version, then compare with a model.",
      items: [
        {
          id: "t3-r1",
          before: "Patient was rude and uncooperative during the visit.",
          problem:
            "Two judgments and no facts. A reader learns your opinion of the patient and nothing about what happened.",
          model:
            "Patient raised their voice when asked to repeat their date of birth and declined to complete the intake form.",
          rubric: [
            "Describes observable behavior rather than labeling the person",
            "Contains no words that judge character (rude, difficult, uncooperative)",
            "A different staff member observing the same visit could have written it",
            "Grammar and spelling are correct",
          ],
        },
        {
          id: "t3-r2",
          before: "Patient obviously did not understand the instructions.",
          problem:
            "'Obviously' asserts something about the patient's mind. You can report what they said or did, not what they understood.",
          model:
            "When asked to repeat the medication schedule, patient stated, “I take them all at night, right?” The schedule is one tablet each morning.",
          rubric: [
            "Reports what the patient said or did, not what they knew",
            "Uses a direct quotation where the patient's own words matter",
            "Includes the fact that makes the entry meaningful",
            "Contains no words asserting a mental state",
          ],
        },
        {
          id: "t3-r3",
          before: "Patient seemed fine and was probably just tired.",
          problem:
            "'Seemed', 'probably', and 'just' are all hedges around a guess. In a record that later matters, this entry says nothing.",
          model:
            "Patient was alert and oriented, answered all intake questions, and reported sleeping approximately four hours last night.",
          rubric: [
            "Every statement is something observed or reported",
            "No hedging words (seemed, probably, apparently, just)",
            "Includes specifics rather than general impressions",
            "Could be defended if the chart were reviewed",
          ],
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Grammar and spelling corrections",
      instructions:
        "Nouns, verbs, and pronouns, in the sentences you will actually write.",
      items: [
        {
          id: "t3-g1",
          prompt:
            "Which sentence puts the action in the active voice, with the doer as the subject?",
          principle:
            "Active voice names who did what. In documentation this matters: 'the medication was refused' leaves out who refused it.",
          choices: [
            {
              text: "The medication was refused.",
              correct: false,
              rationale:
                "Passive. The reader does not learn who refused — the patient, a family member, or someone else.",
            },
            {
              text: "The patient refused the medication.",
              correct: true,
              rationale:
                "Correct. Subject (patient), action verb (refused), object (medication). Nothing is left to inference.",
            },
            {
              text: "Refusal of the medication occurred at 1400.",
              correct: false,
              rationale:
                "The time is useful but the doer has vanished into a noun. Who refused?",
            },
            {
              text: "It was decided that the medication would not be given.",
              correct: false,
              rationale:
                "Doubly vague — no doer, and 'decided' hides whether the patient declined or a clinician withheld it.",
            },
          ],
        },
        {
          id: "t3-g2",
          prompt:
            "Which sentence uses a pronoun that a reader could not misread?",
          principle:
            "A pronoun must have exactly one possible antecedent. When two people appear, repeat the noun.",
          choices: [
            {
              text: "The assistant told the patient that she needed to fast.",
              correct: false,
              rationale:
                "'She' could be the assistant or the patient. In a record, that ambiguity can invert the meaning.",
            },
            {
              text: "The assistant told the patient that the patient needed to fast.",
              correct: true,
              rationale:
                "Correct. Repeating the noun is slightly clunky and completely unambiguous. Clarity wins.",
            },
            {
              text: "She told her that she needed to fast.",
              correct: false,
              rationale: "Three pronouns and no clear referent for any of them.",
            },
            {
              text: "The patient was told by her that she needed to fast.",
              correct: false,
              rationale:
                "Passive and still ambiguous — both 'her' and 'she' are unresolved.",
            },
          ],
        },
        {
          id: "t3-g3",
          prompt: "Which entry documents an observation rather than an assumption?",
          principle:
            "You may document what you saw, measured, or were told. You may not document what you concluded about a person.",
          choices: [
            {
              text: "Patient was clearly in a lot of pain.",
              correct: false,
              rationale:
                "'Clearly' and 'a lot' are your assessment. Record the behavior or the patient's own rating.",
            },
            {
              text: "Patient guarded the right side when standing and rated pain 7 out of 10.",
              correct: true,
              rationale:
                "Correct. One observed behavior and one self-reported number — both verifiable.",
            },
            {
              text: "Patient did not seem to be in much distress.",
              correct: false,
              rationale:
                "'Did not seem' is an impression, and a wrong one in the record can affect later care decisions.",
            },
            {
              text: "Patient is a complainer.",
              correct: false,
              rationale:
                "A label attached to the person. This has no clinical value and would be indefensible if the record were reviewed.",
            },
          ],
        },
        {
          id: "t3-g4",
          prompt: "Which sentence is spelled correctly?",
          principle:
            "Topic 3 words: evidence, Wednesday, dilated, nauseous, consciousness. Wednesday keeps a silent 'd' most people drop.",
          choices: [
            {
              text: "Patient reported feeling nauseus on Wendsday.",
              correct: false,
              rationale: "Two errors: 'nauseous' and 'Wednesday'.",
            },
            {
              text: "Patient reported feeling nauseous on Wednesday.",
              correct: true,
              rationale: "Correct on both. Note the silent 'd' in Wednesday.",
            },
            {
              text: "Patient reported feeling nauseous on Wendesday.",
              correct: false,
              rationale: "'Nauseous' is right; 'Wednesday' is not.",
            },
            {
              text: "Patient reported feeling nausious on Wednesday.",
              correct: false,
              rationale: "'Wednesday' is right; the word is 'nauseous'.",
            },
          ],
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 3 },
  ],

  product: {
    label: "Brief patient encounter note",
    description:
      "Write a short objective encounter note from the scenario below. Include what you observed, what the patient reported (quoted where their words matter), and what was done. Include no interpretations, no labels, and no conclusions about the patient. Four to six sentences.",
    scenario:
      "A patient arrives 20 minutes late for a scheduled blood pressure check. They tell you they ran for the bus. You measure blood pressure at 152/94 in the right arm, seated. They mention they stopped taking one of their medications about two weeks ago because it “made them feel strange,” and they have not called the office about it. You take a second reading after five minutes of rest: 138/86.",
  },

  reflection: [
    "Read your note and circle every word that describes what you thought rather than what you saw. Remove them.",
    "Would another assistant who saw the same visit write something close to what you wrote?",
    "If this note were read aloud two years from now, is there anything in it you would want to take back?",
  ],

  beforeYouLeave: [
    "Completed the fact-or-opinion sort",
    "Rewrote all three judgmental entries and scored them against the rubric",
    "Reviewed Word Bank List 3",
    "Drafted the encounter note and checked it against the Communication Check",
  ],
};
