import { Skill } from "@/types/eng0300";

/** WEEK 3 — Vocabulary in Context, including figurative language (fully populated). */
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
  status: "complete",
  estimatedMinutes: 50,

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
      wordCount: 143,
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
        wordCount: 62,
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
        wordCount: 181,
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

  challenge: {
    id: "vocab-challenge",
    title: "Challenge — thin context and familiar words used in unfamiliar ways",
    intro:
      "Some words in this passage are never defined, and some familiar words are not used the way you usually use them. When a sentence gives you little to go on, take the word apart first, then confirm your meaning somewhere else in the passage.",
    passages: [
      {
        id: "vocab-challenge-water",
        title: "From River to Tap",
        type: "Science",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 345,
        body: [
          "After a heavy rain, a river that supplies a city's water can arrive at the treatment plant turbid. Runoff has carried clay and silt from fields and streets into the current, and a coin dropped into a glass of that water could vanish from sight before it reached the bottom. Before the water can be made safe to drink, it has to be made clear, because the particles that block the view can also shelter germs from the chemicals meant to kill them.",
          "The trouble is size. Much of what the rain carried in is clay so fine that it is nonsettleable. Each particle also carries a slight negative electrical charge, so the particles push one another away instead of clumping. Operators add a coagulant, a chemical that cancels the charge, and stir the water gently. Like a snowball rolling downhill, each small clump gathers more particles as it tumbles, until the clumps, called floc, are large enough to see.",
          "Next, the water flows slowly through long, quiet basins. Here the floc does what the fine clay could not: it settles, sinking to the floor of the basin as a layer of sludge. The water that enters a basin is still murky, but by the time it reaches the far end, hours later, it has clarified.",
          "Even clear water is not finished. It passes through beds of sand and gravel, and sometimes charcoal, which trap particles too small for the basins to catch. Then comes disinfection. At many plants, chlorine or a similar chemical does the heavy lifting, killing bacteria and viruses that made it through the filters.",
          "Operators also leave a little disinfectant, called a residual, in the water. The reason is the pipes. Between the plant and a kitchen faucet may lie miles of water main, some of it decades old, with joints and cracks where contamination can enter. The residual guards against recontamination along the way. Treated water, in other words, is not a finished product so much as a promise the plant has to keep all the way to the tap.",
        ],
      },
    ],
    questions: [
      {
        id: "vocab-c1",
        type: "vocabulary-in-context",
        question: "As used in paragraph 2, the word nonsettleable most nearly means —",
        passageId: "vocab-challenge-water",
        choices: [
          "quick to sink to the bottom",
          "impossible to agree on or resolve",
          "too small to be seen",
          "unable to sink out of the water on its own",
        ],
        correctAnswer: 3,
        explanation:
          "The sentence gives you almost nothing, so take the word apart. Non- means not, -able means able to, and settle, as paragraph 3 uses it, means to sink to the bottom. Put together, nonsettleable means not able to sink out on its own. Then confirm with context: in paragraph 3 the floc \"does what the fine clay could not: it settles.\"",
        choiceRationales: [
          "This ignores the prefix. Non- means not, so the word describes particles that do not sink — which is why operators have to add a coagulant at all.",
          "This builds the word from the most common meaning of settle, as in settling an argument. Paragraph 3 shows the meaning used here: the floc \"settles, sinking to the floor of the basin.\"",
          "Size is the cause of the trouble, not the meaning of the word. None of its parts — non-, settle, -able — means small or unseen.",
          "Correct. Non- (not) + settle (sink, as paragraph 3 uses it) + -able (able to) = not able to sink. Paragraph 3 confirms it: the floc \"does what the fine clay could not.\"",
        ],
        skill: "vocabulary",
        difficulty: "Challenge",
      },
      {
        id: "vocab-c2",
        type: "vocabulary-in-context",
        question: "As used in paragraph 3, the word clarified most nearly means —",
        passageId: "vocab-challenge-water",
        choices: [
          "explained in simpler terms",
          "cooled down",
          "became clear as the solid matter sank out",
          "became completely safe to drink",
        ],
        correctAnswer: 2,
        explanation:
          "Clarify usually means to explain, and that is the meaning this item is built to catch. A contrast clue decides it here: the water \"is still murky, but\" by the far end of the basin it has clarified, so clarified must mean the opposite of murky. The same paragraph gives the reason — the floc has sunk to the floor. Substitute became clear and the sentence reads correctly; substitute was explained and it does not.",
        choiceRationales: [
          "The most common meaning of clarify, and the trap. Nothing is being explained in paragraph 3. Put this meaning back into the sentence and it no longer makes sense.",
          "Fits the sentence grammatically, but temperature never comes up. The contrast is with \"murky,\" so the change is in how the water looks.",
          "Correct. The contrast clue sets clarified against \"murky,\" and the floc sinking to the floor of the basin explains how the water got that way.",
          "Too strong. Paragraph 4 says clear water is still \"not finished\" — it has not yet been filtered or disinfected.",
        ],
        skill: "vocabulary",
        difficulty: "TABE Ready",
      },
      {
        id: "vocab-c3",
        type: "multiple-choice",
        question:
          "In paragraph 5, the author writes that treated water is \"a promise the plant has to keep all the way to the tap.\" What does the author most likely mean?",
        passageId: "vocab-challenge-water",
        choices: [
          "The plant signs a written guarantee promising each customer safe water.",
          "Making water safe at the plant is not enough; the plant has to keep it safe through every mile of pipe until it reaches the faucet.",
          "Most tap water becomes unsafe before it reaches the faucet.",
          "Tap water is a product the plant finishes and sells, like anything else.",
        ],
        correctAnswer: 1,
        explanation:
          "This is a metaphor: the author states directly that treated water is a promise. A promise is not complete when it is made; it has to be kept over time. Read with the rest of paragraph 5, the image means the plant's job continues after the water leaves — which is exactly what the residual is for.",
        choiceRationales: [
          "This restates the image literally. No written guarantee appears in the passage; the promise stands for a responsibility the plant carries all the way to the faucet.",
          "Correct. It interprets the image instead of restating it, and it connects to the residual that \"guards against recontamination along the way.\"",
          "Too strong, and not in the passage. Paragraph 5 says contamination \"can enter\" old pipes, not that most water becomes unsafe. The residual exists to prevent that.",
          "Contradicted by the same sentence, which says treated water is \"not a finished product.\"",
        ],
        skill: "vocabulary",
        difficulty: "Challenge",
      },
      {
        id: "vocab-c4",
        type: "short-response",
        question:
          "The word turbid in paragraph 1 is never defined. In three or four sentences, explain what turbid means, name the kind of context clue that told you, quote the words that gave you the clue, and check your meaning by putting it back into the sentence.",
        passageId: "vocab-challenge-water",
        explanation:
          "A complete answer does three jobs: it gives a meaning close to cloudy or muddy with fine particles, it names the clue type and quotes the words that supply it, and it confirms the meaning by substitution. Because the passage describes a situation instead of defining the word, the clue is an inference clue. The substitution step is the one most answers skip, and it is the one that catches a wrong guess such as rough or fast-moving, which comes from confusing turbid with turbulent.",
        sampleResponse:
          "In paragraph 1, turbid means cloudy or muddy, so full of fine particles that you cannot see through it. The passage never defines the word, so I used an inference clue: runoff has carried \"clay and silt\" into the river, and \"a coin dropped into a glass of that water could vanish from sight before it reached the bottom.\" The last sentence of the paragraph also says the water \"has to be made clear,\" which means it is not clear when it arrives. When I put my meaning back in, the river can \"arrive at the treatment plant\" cloudy with silt, and the sentence still makes sense.",
        skill: "vocabulary",
        difficulty: "Challenge",
      },
    ],
  },

  masteryCheck: {
    id: "vocab-mastery",
    title: "Mastery check",
    intro:
      "One short passage, four items. If you miss one, the review below each answer will tell you which part of the lesson to revisit.",
    passages: [
      {
        id: "vocab-mastery-paystub",
        title: "Reading Your Pay Stub",
        type: "Informational",
        attribution: "Original passage — BEOC Academic Bridge",
        wordCount: 110,
        body: [
          "Most pay stubs begin with gross pay. It is the biggest number for the pay period, because nothing has been subtracted from it yet. Below it are deductions — the amounts taken out for taxes, insurance, and retirement savings. Some deductions, such as many retirement contributions, are pretax, which lowers the amount of pay that income tax is figured on. At the bottom is net pay, the amount that actually reaches your bank account. Many people read only that last line and throw the stub away. But a pay stub is a receipt for your time. Check it the way you would check any receipt: before you put it away.",
        ],
      },
    ],
    questions: [
      {
        id: "vocab-m1",
        type: "vocabulary-in-context",
        question: "As used in the passage, deductions are —",
        passageId: "vocab-mastery-paystub",
        choices: [
          "extra money added to your pay",
          "the hours you worked during the pay period",
          "amounts taken out of your pay",
          "the total you earned before anything is subtracted",
        ],
        correctAnswer: 2,
        explanation:
          "The meaning comes right after the dash: deductions are \"the amounts taken out for taxes, insurance, and retirement savings.\" A dash followed by an explanation is a definition clue, the fastest kind to use. If you missed this, revisit \"Four context clues that do most of the work\" and look at the definition row of the table.",
        choiceRationales: [
          "The opposite. The definition says these amounts are \"taken out,\" not added.",
          "Hours often appear on a pay stub, but the passage never mentions them. Its definition is about money \"taken out,\" not time worked.",
          "Correct. The passage defines the word right after the dash.",
          "That describes gross pay, the figure the deductions are subtracted from.",
        ],
        skill: "vocabulary",
        difficulty: "Foundation",
      },
      {
        id: "vocab-m2",
        type: "vocabulary-in-context",
        question: "As used in the passage, a pretax deduction is one that is —",
        passageId: "vocab-mastery-paystub",
        choices: [
          "taken out before income tax is figured",
          "taken out after income tax has been figured",
          "paid by the employer instead of the worker",
          "a tax paid ahead of time for next year",
        ],
        correctAnswer: 0,
        explanation:
          "Pre- means before, the same prefix as in preapproval. A pretax deduction comes out before income tax is figured, which is why, as the passage says, it \"lowers the amount of pay that income tax is figured on.\" If you missed this, revisit \"Word parts get you close enough\" and find pre- in the table.",
        choiceRationales: [
          "Correct. Pre- means before, and the rest of the sentence confirms it: taking the money out first \"lowers the amount of pay that income tax is figured on.\"",
          "This reverses the prefix. Pre- means before, not after — and a deduction taken after tax is figured could not lower the amount that is taxed.",
          "Fits the sentence grammatically, but the passage describes deductions as amounts \"taken out\" of your pay. Nothing says the employer pays them.",
          "Pre- does mean before, but a pretax deduction is not a tax at all. It is a deduction that comes out before tax is figured.",
        ],
        skill: "vocabulary",
        difficulty: "Developing",
      },
      {
        id: "vocab-m3",
        type: "vocabulary-in-context",
        question: "As used in the passage, the word gross most nearly means —",
        passageId: "vocab-mastery-paystub",
        choices: [
          "disgusting or unpleasant",
          "total, before anything is subtracted",
          "left over after taxes and deductions",
          "larger than it should be",
        ],
        correctAnswer: 1,
        explanation:
          "Gross has several meanings, and the everyday one, disgusting, is the one this item is built to catch. The next sentence decides it: gross pay is the biggest number \"because nothing has been subtracted from it yet.\" Substitute total, before anything is subtracted, and the sentence still reads correctly. If you missed this, revisit \"Multi-meaning words are decided by the sentence.\"",
        choiceRationales: [
          "The most common meaning of gross, but it makes no sense on a pay stub. Substitute it back into the sentence and the sentence falls apart.",
          "Correct. Gross pay is the biggest number because \"nothing has been subtracted from it yet\" — it is the whole amount.",
          "This describes net pay, the amount at the bottom of the stub. Gross pay is the starting figure, before anything comes out.",
          "Gross can describe something excessive, but the passage gives a plain reason for the big number: nothing has been taken out yet. Nothing is wrong with it.",
        ],
        skill: "vocabulary",
        difficulty: "TABE Ready",
      },
      {
        id: "vocab-m4",
        type: "multiple-choice",
        question:
          "The author says that a pay stub is \"a receipt for your time.\" What does the author mean?",
        passageId: "vocab-mastery-paystub",
        choices: [
          "A pay stub is printed on the same thin paper as a store receipt.",
          "Workers are paid according to the time of day they work.",
          "Workers should keep every pay stub for at least a year.",
          "A pay stub is the record of what you were paid for the hours you worked, so it deserves the same check you would give any receipt.",
        ],
        correctAnswer: 3,
        explanation:
          "Calling a pay stub a receipt is a metaphor: it states the comparison directly. A receipt is a record you check against what you actually handed over. Here, what you handed over is your time, so the stub is the record of what you were paid for your hours — and the next sentence tells you to check it. If you missed this, revisit \"Figurative language says one thing to mean another\": the literal-minded choice restates the image instead of interpreting it.",
        choiceRationales: [
          "This restates the image literally. The author is not describing paper; the comparison is about what a receipt is for.",
          "This misreads the image. In \"a receipt for your time,\" time means the hours you gave to the job, not the time of day you worked them.",
          "Sensible advice, but the passage never says how long to keep a stub. It says to check it \"before you put it away.\"",
          "Correct. A receipt records an exchange so you can check it. Here the exchange is your time for your pay, and the next sentence tells you to check it.",
        ],
        skill: "vocabulary",
        difficulty: "TABE Ready",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Vocabulary questions",
      detail: "How TABE words vocabulary items and why \"most nearly means\" changes your approach.",
      href: "/eng0300/tabe",
    },
    {
      label: "Practice Center — Vocabulary sets",
      detail: "Every Vocabulary set in one place, from the guided question through the challenge.",
      href: "/eng0300/practice?skill=vocabulary",
    },
  ],
};
