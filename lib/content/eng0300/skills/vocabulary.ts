import { Skill } from "@/types/eng0300";

/** WEEK 3 — Vocabulary in Context, including figurative language (starter content). */
export const vocabularySkill: Skill = {
  id: "vocabulary",
  slug: "vocabulary",
  title: "Vocabulary in Context",
  shortTitle: "Vocabulary",
  description:
    "Work out unfamiliar, technical, and multi-meaning words from the sentences around them — and read figurative language for what it actually means.",
  icon: "📖",
  accent: "from-eng-teal-700 to-eng-navy-800",
  week: 3,
  status: "starter",
  estimatedMinutes: 35,

  outcomes: [
    "Determine the meaning of unfamiliar, technical, or multi-meaning words using context clues and word roots",
    "Interpret figurative language, including metaphors, similes, and idioms, in context",
  ],

  objectives: [
    "Use four kinds of context clue to define an unfamiliar word",
    "Break a long word into prefix, root, and suffix to estimate its meaning",
    "Choose the right meaning of a multi-meaning word for the sentence in front of you",
    "Identify and interpret metaphor, simile, idiom, personification, and hyperbole",
  ],

  lesson: [
    {
      heading: "Four context clues that do most of the work",
      paragraphs: [
        "On a reading test you are almost never expected to already know a hard word. You are expected to work it out from its neighbors. Four patterns cover most cases.",
      ],
      table: {
        columns: ["Clue type", "What to look for", "Example"],
        rows: [
          [
            "Definition",
            "The meaning is given outright, often after a comma, a dash, or \"which means.\"",
            "Her deductible — the amount she pays before coverage begins — was $1,500.",
          ],
          [
            "Example",
            "Instances follow, often after \"such as,\" \"including,\" or \"for example.\"",
            "Perishable goods, such as milk, produce, and fresh fish, must be refrigerated.",
          ],
          [
            "Contrast",
            "An opposite is offered, signaled by \"but,\" \"unlike,\" \"however,\" or \"instead.\"",
            "The first draft was verbose, but the final version was tight and plain.",
          ],
          [
            "Inference",
            "No direct clue; the surrounding situation narrows the meaning.",
            "After three refusals, her tone grew more strident, and the clerk finally called a manager.",
          ],
        ],
      },
      callout: {
        label: "Test tip",
        text: "Read the sentence with a blank where the hard word is, decide what word you would put there, then look at the choices. Predicting first keeps a familiar-looking wrong answer from pulling you off.",
      },
    },
    {
      heading: "Word parts get you close enough",
      paragraphs: [
        "When context is thin, take the word apart. A prefix goes before the root and changes its meaning; a suffix goes after and usually changes the word's job in the sentence.",
      ],
      table: {
        columns: ["Part", "Meaning", "Example"],
        rows: [
          ["un-, in-, non-", "not", "unfinished, inaccurate, nonrefundable"],
          ["pre-, fore-", "before", "preapproval, foresee"],
          ["re-", "again, back", "reapply, reimburse"],
          ["-able, -ible", "able to be", "transferable, eligible"],
          ["-tion, -ment", "the act or result of", "certification, enrollment"],
          ["-less", "without", "paperless, careless"],
        ],
      },
      bullets: [
        "You do not need the exact dictionary definition — close enough usually eliminates three choices.",
        "Combine both tools: use word parts to estimate, then use context to confirm.",
      ],
    },
    {
      heading: "Multi-meaning words are decided by the sentence",
      paragraphs: [
        "Common words carry several meanings, and TABE items often test the meaning you use least. Charge can mean a fee, an accusation, an electrical property, or a rush forward. Run can mean to jog, to operate, or to campaign.",
        "The question is never what the word usually means. It is what the word means here. Substitute your candidate meaning back into the sentence and check that it still reads correctly.",
      ],
    },
    {
      heading: "Figurative language says one thing to mean another",
      table: {
        columns: ["Type", "How it works", "Example"],
        rows: [
          ["Simile", "Compares using like or as.", "The training manual was as dense as a tax form."],
          ["Metaphor", "States the comparison directly, without like or as.", "Her second job was a treadmill she could not step off."],
          ["Idiom", "A fixed phrase whose meaning is not literal.", "The proposal was dead in the water."],
          ["Personification", "Gives human qualities to something not human.", "The old furnace groaned all winter."],
          ["Hyperbole", "Deliberate exaggeration for effect.", "The line at the DMV took a lifetime."],
        ],
      },
      bullets: [
        "First ask what the phrase would mean literally, then ask what the author is actually claiming.",
        "A figurative-language item usually has one literal-minded distractor. It restates the image instead of interpreting it.",
      ],
    },
  ],

  workedExample: {
    title: "Defining a technical word from its context",
    passage: {
      id: "vocab-example-benefits",
      title: "Open Enrollment",
      type: "Health",
      attribution: "Original passage — BEOC Academic Bridge",
      body: [
        "Every fall, employees are asked to choose a health plan during a short window called open enrollment. The choice is harder than it looks, because the plan with the lowest monthly premium is not always the cheapest plan overall.",
        "A premium is what you pay each month simply to have coverage, whether or not you see a doctor. A deductible is different: it is the amount you must pay yourself before the plan begins paying its share. A plan with a low premium often carries a high deductible, which means low monthly cost but a large bill the first time you need care.",
        "Employees who rarely see a doctor may come out ahead with the low-premium plan. Employees managing an ongoing condition usually do not, because they will reach that deductible early in the year and keep paying full price until they do.",
      ],
      wordCount: 175,
    },
    question: "As used in the passage, what does deductible mean?",
    steps: [
      {
        move: "Find the word and read the sentence containing it.",
        thinking:
          "\"A deductible is different: it is the amount you must pay yourself before the plan begins paying its share.\"",
      },
      {
        move: "Identify the clue type.",
        thinking:
          "This is a definition clue. The meaning is stated outright right after the colon. That is the fastest kind to use.",
      },
      {
        move: "Confirm with the surrounding contrast.",
        thinking:
          "The passage sets deductible against premium — monthly cost versus what you pay before coverage kicks in. The contrast confirms the definition rather than competing with it.",
      },
      {
        move: "Check the definition against the last paragraph.",
        thinking:
          "Someone with an ongoing condition reaches the deductible early and pays full price until then. That only makes sense with the definition I have, so it holds.",
      },
    ],
    answer:
      "The amount a person must pay out of pocket for care before the health plan starts paying its share.",
    takeaway:
      "When a definition clue is present, the answer is usually within one sentence of the word. Look there before reasoning from scratch.",
  },

  guided: {
    id: "vocab-guided",
    title: "Try one with support",
    passages: [
      {
        id: "vocab-guided-lease",
        title: "Reading the Lease",
        type: "Informational",
        attribution: "Original passage — BEOC Academic Bridge",
        body: [
          "The lease looked standard until the eleventh page, where a clause stated that the tenant would forfeit the security deposit if the apartment was vacated before the term ended. Marisol had planned to move for a job in the spring. Unlike the flexible month-to-month arrangement she had before, this agreement gave her no way to leave early without losing the deposit entirely.",
        ],
        wordCount: 68,
      },
    ],
    questions: [
      {
        id: "vocab-g1",
        type: "vocabulary-in-context",
        question: "As used in the passage, forfeit most nearly means —",
        passageId: "vocab-guided-lease",
        choices: ["to renew", "to lose as a penalty", "to deposit", "to negotiate"],
        correctAnswer: 1,
        hint: "The last sentence restates the same idea in plain words. Find the phrase that repeats it.",
        explanation:
          "The final sentence says she has no way to leave early \"without losing the deposit entirely.\" That restatement defines forfeit as losing something as a penalty.",
        choiceRationales: [
          "Opposite of the context — nothing is being extended or renewed.",
          "Correct. The passage restates it as losing the deposit, and the loss is triggered by breaking the term.",
          "Confuses the word with the noun beside it. A deposit is what she would lose, not what forfeit means.",
          "Plausible in a lease generally, but the sentence describes an automatic consequence, not a discussion.",
        ],
        skill: "vocabulary",
        difficulty: "Developing",
      },
    ],
  },

  practice: {
    id: "vocab-practice",
    title: "Practice set — context clues and figurative language",
    passages: [
      {
        id: "vocab-practice-grid",
        title: "The Grid in August",
        type: "Science",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 235,
        body: [
          "On the hottest afternoons of the summer, the regional power grid strains under a load it was never designed to carry all at once. Utilities call these hours peak demand — the narrow window, usually between four and seven in the evening, when air conditioners, ovens, and returning commuters all draw power simultaneously.",
          "To keep the system stable, utilities can ask large customers to curtail usage, reducing their draw voluntarily in exchange for a lower rate the rest of the year. Factories dim lights. Warehouses shift equipment runs to the night. A hospital cannot participate, but a bottling plant often can.",
          "When voluntary reductions are not enough, the utility may lower voltage slightly across a region. Older residents still call this a brownout, because decades ago it made incandescent bulbs visibly dim. Modern lighting rarely shows it, so most customers now feel nothing at all.",
          "Grid operators describe August as walking a tightrope in the wind. The comparison is deliberate. The margin between supply and demand on those afternoons is thin, and the consequences of losing balance are immediate and public.",
        ],
      },
    ],
    questions: [
      {
        id: "vocab-p1",
        type: "vocabulary-in-context",
        question: "As used in paragraph 2, curtail most nearly means —",
        passageId: "vocab-practice-grid",
        choices: ["to cut back", "to measure", "to pay for", "to restore"],
        correctAnswer: 0,
        explanation:
          "The sentence defines it immediately: curtail usage, \"reducing their draw voluntarily.\" The examples that follow — dimmed lights, shifted equipment runs — confirm it.",
        choiceRationales: [
          "Correct. The passage restates curtail as reducing, and every example is a reduction.",
          "Measurement never appears. The utility is asking for a change in behavior, not a reading.",
          "Payment moves the other direction in this passage: customers get a lower rate for participating.",
          "The opposite of the context. Restoring usage would worsen the problem being described.",
        ],
        skill: "vocabulary",
        difficulty: "Developing",
      },
      {
        id: "vocab-p2",
        type: "vocabulary-in-context",
        question:
          "In paragraph 1, the word load refers to —",
        passageId: "vocab-practice-grid",
        choices: [
          "a quantity of goods being transported",
          "the total demand for electricity the system must supply",
          "a burden of responsibility carried by utility workers",
          "the weight of equipment on transmission towers",
        ],
        correctAnswer: 1,
        explanation:
          "Load is a multi-meaning word. Here it is defined by what follows: air conditioners, ovens, and commuters all drawing power at once. That is electrical demand.",
        choiceRationales: [
          "A common meaning of load, but nothing in this passage is being transported.",
          "Correct. Paragraph 1 spells out what makes up the load — simultaneous electricity use.",
          "A figurative meaning the passage does not use. The strain described is on the grid, not on workers.",
          "Physical weight is a real meaning of load but is unrelated to peak demand hours.",
        ],
        skill: "vocabulary",
        difficulty: "TABE Ready",
      },
      {
        id: "vocab-p3",
        type: "multiple-choice",
        question:
          "In paragraph 4, the phrase walking a tightrope in the wind is an example of which type of figurative language, and what does it mean?",
        passageId: "vocab-practice-grid",
        choices: [
          "Personification; the grid is described as if it were a person.",
          "Hyperbole; the author exaggerates to argue that the grid will fail.",
          "Metaphor; managing the grid in August requires fine balance under conditions that could upset it at any moment.",
          "Idiom; it is a fixed expression meaning to work slowly and carefully.",
        ],
        correctAnswer: 2,
        explanation:
          "The comparison is stated directly, with no like or as, which makes it a metaphor. The final sentence interprets it for you: a thin margin, with immediate consequences if balance is lost.",
        choiceRationales: [
          "No human qualities are given to the grid; the image describes the operators' task.",
          "The author is not exaggerating — the last sentence treats the risk as real and specific.",
          "Correct. A direct comparison, and the passage explains exactly what it stands for.",
          "It is a vivid comparison built for this passage, not a fixed everyday expression.",
        ],
        skill: "vocabulary",
        difficulty: "TABE Ready",
      },
      {
        id: "vocab-p4",
        type: "vocabulary-in-context",
        question:
          "Which context clue best explains the meaning of brownout in paragraph 3?",
        passageId: "vocab-practice-grid",
        choices: [
          "A contrast clue comparing it to a blackout",
          "An example clue listing appliances that stop working",
          "A definition clue explaining that voltage is lowered slightly and once made bulbs visibly dim",
          "An inference clue based on the word brown",
        ],
        correctAnswer: 2,
        explanation:
          "The paragraph gives the cause (voltage lowered slightly) and the historical effect (incandescent bulbs dimming) in the same breath. That is a definition clue.",
        choiceRationales: [
          "Blackout never appears in the passage.",
          "No appliances are listed in paragraph 3, and nothing stops working.",
          "Correct. The meaning is stated directly around the word.",
          "Guessing from the color would not produce the meaning. The passage supplies it instead.",
        ],
        skill: "vocabulary",
        difficulty: "Foundation",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Vocabulary questions",
      detail: "How TABE words vocabulary items and why \"most nearly means\" changes your approach.",
      href: "/eng0300/tabe",
    },
  ],
};
