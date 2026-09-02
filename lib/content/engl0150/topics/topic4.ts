import { Topic } from "@/types/engl0150";

/** TOPIC 4 — SOAP Notes: Organizing Clinical Information (1 session) */
export const topic4: Topic = {
  number: 4,
  slug: "4",
  title: "SOAP Notes: Organizing Clinical Information",
  unit: { number: 2, title: "Clinical Documentation" },
  sessions: "1",
  goals: ["documentation", "grammar-sentence", "summarizing"],
  spiralsFrom: [2, 3],

  essentialQuestion:
    "How does organized documentation help another healthcare professional understand the patient?",

  concepts: [
    "The purpose of clinical documentation: someone who was not there must be able to reconstruct what happened",
    "SOAP structure — Subjective, Objective, Assessment, Plan",
    "Subjective is what the patient tells you; Objective is what you measure or observe",
    "Assessment and Plan are the provider's clinical judgment — know where your contribution ends",
    "Relevant versus irrelevant information: a note that includes everything hides what matters",
    "Documentation sequence: information in a predictable order can be read quickly under pressure",
  ],

  grammar: [
    {
      heading: "Agreements",
      points: [
        "Subject–verb agreement, including when a phrase separates the subject from its verb",
        "Pronoun–noun agreement",
        "Clear pronoun reference — every pronoun points to exactly one noun",
      ],
    },
  ],

  wordListNumber: 4,

  practice: [
    {
      kind: "sorter",
      title: "Sort into S, O, A, and P",
      instructions:
        "Which section does each piece of information belong in? Ask who the information came from and whether it is measured or judged.",
      bins: [
        { id: "s", label: "Subjective", hint: "What the patient reports" },
        { id: "o", label: "Objective", hint: "What you measure or observe" },
        { id: "a", label: "Assessment", hint: "The provider's clinical judgment" },
        { id: "p", label: "Plan", hint: "What will happen next" },
      ],
      items: [
        {
          id: "t4-s1",
          text: "“My throat has been sore for three days.”",
          bin: "s",
          feedback: "The patient's own report, in their own words. Subjective.",
        },
        {
          id: "t4-s2",
          text: "Temperature 100.8°F, oral.",
          bin: "o",
          feedback: "A measurement you took. Objective.",
        },
        {
          id: "t4-s3",
          text: "Rapid strep test performed; result negative.",
          bin: "o",
          feedback:
            "A test you performed and its result. Objective — the finding, not what it means.",
        },
        {
          id: "t4-s4",
          text: "Likely viral pharyngitis.",
          bin: "a",
          feedback:
            "A clinical conclusion drawn from the findings. Assessment — and the provider's to make, not yours.",
        },
        {
          id: "t4-s5",
          text: "Return in 5 days if symptoms have not improved.",
          bin: "p",
          feedback: "What happens next. Plan.",
        },
        {
          id: "t4-s6",
          text: "“I've been taking ibuprofen but it isn't helping much.”",
          bin: "s",
          feedback: "Reported by the patient. Subjective, even though it concerns a medication.",
        },
        {
          id: "t4-s7",
          text: "Throat erythematous, no exudate noted.",
          bin: "o",
          feedback: "An observation from examination. Objective.",
        },
        {
          id: "t4-s8",
          text: "Supportive care discussed; fluids and rest advised.",
          bin: "p",
          feedback: "The course of action decided. Plan.",
        },
      ],
    },
    {
      kind: "sequencer",
      title: "Put the note in order",
      instructions:
        "Arrange these into the sequence a colleague could read quickly under pressure.",
      items: [
        {
          id: "t4-q1",
          text: "Subjective — the patient's reported symptoms and history",
          position: 1,
          reason:
            "The note opens with why the patient came, in their own account. It frames everything that follows.",
        },
        {
          id: "t4-q2",
          text: "Objective — vital signs, examination findings, test results",
          position: 2,
          reason:
            "What was measured comes after what was reported, so the reader can compare the two.",
        },
        {
          id: "t4-q3",
          text: "Assessment — the provider's clinical impression",
          position: 3,
          reason:
            "Judgment follows evidence. An assessment stated before its findings cannot be evaluated.",
        },
        {
          id: "t4-q4",
          text: "Plan — treatment, instructions, and follow-up",
          position: 4,
          reason:
            "The note ends with what happens next, which is what the next reader most often needs.",
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Agreement and documentation editing",
      instructions: "Spot the agreement error, and the entry that oversteps.",
      items: [
        {
          id: "t4-g1",
          prompt: "Which sentence has correct subject–verb agreement?",
          principle:
            "A phrase between the subject and the verb does not change the subject. 'Each' and 'every' are singular.",
          choices: [
            {
              text: "Each of the test results were reviewed with the patient.",
              correct: false,
              rationale: "'Each' is singular, so it takes 'was'. 'Results' is not the subject.",
            },
            {
              text: "Each of the test results was reviewed with the patient.",
              correct: true,
              rationale: "Correct. 'Each' is singular and takes the singular verb 'was'.",
            },
            {
              text: "Each of the test result were reviewed with the patient.",
              correct: false,
              rationale: "Two errors: 'result' should be plural in the phrase, and the verb should be 'was'.",
            },
            {
              text: "Each of the test results are reviewed with the patient.",
              correct: false,
              rationale: "'Are' is plural. 'Each' requires 'is' or 'was'.",
            },
          ],
        },
        {
          id: "t4-g2",
          prompt:
            "A medical assistant is writing a SOAP note. Which entry is outside their scope?",
          principle:
            "Medical assistants document what the patient reported and what was measured. Assessment is clinical judgment and belongs to the provider.",
          choices: [
            {
              text: "S: “My throat has been sore for three days.”",
              correct: false,
              rationale: "A quoted patient report. Squarely within scope.",
            },
            {
              text: "O: Temperature 100.8°F, oral. Throat erythematous.",
              correct: false,
              rationale: "Measurements and observations. Within scope.",
            },
            {
              text: "A: Likely viral pharyngitis; antibiotics not indicated.",
              correct: true,
              rationale:
                "Correct — this is the problem entry. It is a diagnosis and a treatment judgment, both of which belong to the provider.",
            },
            {
              text: "P: Patient given written instructions for fluids and rest.",
              correct: false,
              rationale:
                "Recording that instructions were given is documentation of what was done. Within scope.",
            },
          ],
        },
        {
          id: "t4-g3",
          prompt:
            "Which piece of information does NOT belong in this visit's note for a sore throat?",
          principle:
            "Relevance is a safety feature. A note padded with unrelated detail buries the information the next reader needs.",
          choices: [
            {
              text: "Onset and duration of the sore throat",
              correct: false,
              rationale: "Directly relevant to why the patient came.",
            },
            {
              text: "Current temperature",
              correct: false,
              rationale: "Relevant — it bears on the presenting complaint.",
            },
            {
              text: "The patient mentioned they are planning a holiday next month",
              correct: true,
              rationale:
                "Correct. Pleasant conversation, no clinical bearing. Including it lengthens the note and hides what matters.",
            },
            {
              text: "Medications the patient has already tried",
              correct: false,
              rationale: "Relevant — it affects what to try next.",
            },
          ],
        },
      ],
    },
    {
      kind: "builder",
      storageKey: "soap",
      title: "Build a SOAP note",
      instructions:
        "Write each section from the case below. Keep Subjective in the patient's words and Objective to what was measured. For Assessment, write what a provider would need from you — not a diagnosis of your own.",
      scenario:
        "A patient comes in reporting a sore throat that began three days ago. They say it hurts most when swallowing and that ibuprofen has helped only a little. They deny cough. You measure temperature 100.8°F oral, pulse 88, respirations 16. On inspection the throat appears red with no visible white patches. A rapid strep test is performed and is negative. The provider advises fluids, rest, and a return visit in five days if there is no improvement.",
      fields: [
        {
          id: "s",
          label: "S — Subjective",
          prompt:
            "What the patient reported. Quote them where their exact words matter.",
          expects: ["sore throat", "three days", "3 days"],
          missingHint:
            "A reader needs the complaint and how long it has been going on.",
        },
        {
          id: "o",
          label: "O — Objective",
          prompt: "What you measured and observed. Numbers with their units.",
          expects: ["100.8", "temp"],
          missingHint: "Include the vital signs you measured, with values.",
        },
        {
          id: "a",
          label: "A — Assessment",
          prompt:
            "Summarize the findings for the provider. Do not write a diagnosis — that is the provider's.",
          rows: 2,
        },
        {
          id: "p",
          label: "P — Plan",
          prompt: "What was advised and what happens next, including follow-up.",
          expects: ["five days", "5 days", "return", "follow"],
          missingHint:
            "The plan should state the follow-up interval so the next reader knows when to expect them back.",
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 4 },
  ],

  product: {
    label: "Basic SOAP note",
    description:
      "Complete the guided SOAP note from the case above. Each section holds only what belongs in it, agreements are correct, and every pronoun has one clear referent. Submit through Brightspace.",
  },

  reflection: [
    "Could a colleague who has never met this patient act on your note?",
    "Is anything in your Objective section actually an interpretation?",
    "Did you include anything a reader does not need?",
  ],

  beforeYouLeave: [
    "Sorted all eight items into S, O, A, and P",
    "Put the note sections into the correct sequence",
    "Completed the agreement drill",
    "Built the SOAP note and ran the completeness check",
  ],
};
