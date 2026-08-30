import { Skill } from "@/types/eng0300";

/** WEEK 5 — Point of View & Purpose (starter content). */
export const pointOfViewSkill: Skill = {
  id: "point-of-view",
  slug: "point-of-view",
  title: "Point of View & Purpose",
  shortTitle: "Point of View",
  description:
    "Identify who is telling a text and why, separate fact from opinion, and see how a writer's position shapes what you are shown.",
  icon: "👓",
  accent: "from-eng-gold-600 to-eng-navy-800",
  week: 5,
  status: "starter",
  estimatedMinutes: 35,

  outcomes: [
    "Describe how a narrator's or author's point of view influences how events or ideas are presented",
    "Distinguish between fact and opinion and determine an author's primary purpose",
  ],

  objectives: [
    "Identify first-, second-, and third-person point of view",
    "Determine an author's primary purpose from the text itself",
    "Separate statements of fact from statements of opinion",
    "Explain how two accounts of the same event differ because of who is telling them",
  ],

  lesson: [
    {
      heading: "Point of view: who is speaking",
      table: {
        columns: ["Point of view", "Signals", "What the reader gets"],
        rows: [
          [
            "First person",
            "I, me, my, we",
            "One person's direct experience, including what they cannot see or do not know.",
          ],
          [
            "Second person",
            "you, your",
            "Instructions or direct address. Common in manuals, guides, and advice.",
          ],
          [
            "Third person limited",
            "he, she, they — with one person's thoughts",
            "An outside narrator who reports one character's inner view.",
          ],
          [
            "Third person omniscient",
            "he, she, they — with several people's thoughts",
            "An outside narrator with access to more than one mind.",
          ],
        ],
      },
      callout: {
        label: "Why it matters",
        text: "Point of view controls what information you are allowed to have. A first-person account cannot tell you what anyone else was thinking — so when a question asks what someone else believed, the answer must be an inference from behavior, not a statement.",
      },
    },
    {
      heading: "Author's purpose: why the text exists",
      paragraphs: [
        "Every text is written to do something. The four purposes you will see most often are to inform, to persuade, to entertain, and to explain how something works. A single text can have more than one, but TABE items usually ask for the primary purpose.",
      ],
      bullets: [
        "To inform — presents facts with little evaluation. Neutral vocabulary.",
        "To persuade — argues for a position. Look for claims, evidence, and words carrying judgment.",
        "To explain / instruct — walks through a process or a mechanism, often in sequence.",
        "To entertain — tells a story for its own sake, with narrative detail and voice.",
      ],
      callout: {
        label: "Test tip",
        text: "Ask what the author wants you to do after reading. Know something? Do something? Agree with something? Feel something? The answer to that question is the purpose.",
      },
    },
    {
      heading: "Fact and opinion",
      paragraphs: [
        "A fact can be checked against a record, a measurement, or a source — whether or not it turns out to be true. An opinion expresses a judgment and cannot be verified, even when most people share it.",
        "Be careful: an opinion is not the same as a lie, and a fact is not the same as a correct statement. \"The office received 4,000 requests in June\" is a factual statement, verifiable and possibly wrong. \"The office is doing an excellent job\" is an opinion no record can settle.",
      ],
      bullets: [
        "Opinion markers: best, worst, should, ought, unfair, remarkable, too much.",
        "Fact markers: dates, counts, measurements, named sources, quoted records.",
        "Watch for opinions written to sound like facts: \"Everyone knows that…\" is a judgment wearing a fact's clothing.",
      ],
    },
  ],

  workedExample: {
    title: "One event, two points of view",
    passage: {
      id: "pov-example-paired",
      title: "The Bus Route Hearing",
      type: "Informational",
      attribution: "Original passage — BEOC Academic Bridge",
      body: [
        "ACCOUNT ONE — from a transit agency newsletter: At Tuesday's public hearing, the agency presented its plan to consolidate the B14 and B16 routes. Consolidation would reduce duplicated service along a fourteen-block overlap and allow the agency to increase frequency on the combined route from every twenty minutes to every twelve. Thirty-one residents attended. Agency staff answered questions for ninety minutes and will accept written comment for thirty days.",
        "ACCOUNT TWO — from a letter to a neighborhood paper: I sat through Tuesday's hearing on the B14 and B16. The agency called it consolidation. What it means for my block is that the stop two doors from my building disappears, and the nearest one becomes an eight-block walk. I am 71. Eight blocks in February is not a shorter wait; it is no bus at all. Thirty-one of us came out on a weeknight. They took our questions politely and told us the comment period would be open for thirty days.",
      ],
      wordCount: 210,
    },
    question:
      "How does point of view shape the way each account presents the same hearing?",
    steps: [
      {
        move: "Identify the point of view of each account.",
        thinking:
          "Account One is third person and institutional — no I, no personal stake. Account Two is first person: I sat, my block, I am 71.",
      },
      {
        move: "Find the facts both accounts agree on.",
        thinking:
          "Both report the same hearing, the same two routes, thirty-one attendees, and a thirty-day comment period. The verifiable facts do not conflict.",
      },
      {
        move: "Notice what each one chooses to measure.",
        thinking:
          "Account One measures service in frequency — every twenty minutes becomes every twelve. Account Two measures it in walking distance — two doors becomes eight blocks. Both are real; each writer's position determines which one counts.",
      },
      {
        move: "Examine the loaded language.",
        thinking:
          "Account One uses consolidate and duplicated service — neutral, administrative words that make removal sound like tidying. Account Two answers directly: \"The agency called it consolidation.\" The writer is contesting the word itself.",
      },
      {
        move: "Separate fact from opinion in each.",
        thinking:
          "\"Frequency increases to every twelve minutes\" is a fact. \"Eight blocks in February is not a shorter wait; it is no bus at all\" is an opinion built on the fact of the eight-block walk.",
      },
    ],
    answer:
      "The two accounts report the same verifiable facts but measure the outcome differently. The agency's institutional point of view frames the change as improved frequency across a system; the resident's first-person point of view frames it as lost access at one address. Neither is inaccurate — each point of view determines which facts are treated as the important ones.",
    takeaway:
      "When two texts disagree, check first whether they disagree about facts or about which facts matter. On paired-passage items, it is usually the second.",
  },

  guided: {
    id: "pov-guided",
    title: "Try one with support",
    passages: [
      {
        id: "pov-guided-manual",
        title: "From an Employee Handbook",
        type: "Workplace",
        attribution: "Original passage — BEOC Academic Bridge",
        body: [
          "You must submit your time sheet by 5:00 p.m. on the Friday that ends the pay period. If you are scheduled off that Friday, submit it on your last worked day of the week. Late time sheets are processed in the following cycle, which means your hours will appear on the next paycheck rather than the current one. Keep a copy of your submission confirmation until the corresponding paycheck arrives.",
        ],
        wordCount: 74,
      },
    ],
    questions: [
      {
        id: "pov-g1",
        type: "multiple-choice",
        question:
          "What is the point of view and the author's primary purpose in this passage?",
        passageId: "pov-guided-manual",
        choices: [
          "First person; to persuade employees that the payroll system is fair",
          "Second person; to instruct employees on how and when to submit time sheets",
          "Third person limited; to describe the payroll department's workload",
          "Second person; to entertain employees with a story about payroll",
        ],
        correctAnswer: 1,
        hint: "Look at the pronouns first, then ask what the author wants you to do after reading.",
        explanation:
          "The passage addresses the reader directly as you, and every sentence tells the reader what to do or what will happen if they do not. That is second person, written to instruct.",
        choiceRationales: [
          "There is no I anywhere, and the passage never argues that anything is fair.",
          "Correct. Direct address plus procedural steps and consequences.",
          "No character's thoughts appear, and the payroll department's workload is never discussed.",
          "The point of view is right, but nothing here is a story or written for enjoyment.",
        ],
        skill: "point-of-view",
        difficulty: "Foundation",
      },
    ],
  },

  practice: {
    id: "pov-practice",
    title: "Practice set — purpose, fact, and opinion",
    passages: [
      {
        id: "pov-practice-library",
        title: "What the Library Became",
        type: "Argument",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 230,
        body: [
          "The branch library on my corner circulated 41,000 items last year. It also hosted 312 public programs, provided 9,400 sessions on its public computers, and served as a designated cooling center on eleven days.",
          "City budget discussions still describe library funding as spending on books. That description is decades out of date, and it quietly makes the case for cuts. If a library is a book warehouse, then a city with declining print circulation has an obvious place to save money.",
          "But the computer sessions are not incidental. For a resident applying for a job, renewing a benefit, or filing a form that no longer exists on paper, the branch is often the only free place to sit down with a keyboard and get help using it.",
          "I do not think the library should be exempt from budget scrutiny. Every department should have to justify what it costs. I think the justification should be measured against what the library actually does, and the current accounting does not measure that at all.",
        ],
      },
    ],
    questions: [
      {
        id: "pov-p1",
        type: "multiple-choice",
        question: "What is the author's primary purpose?",
        passageId: "pov-practice-library",
        choices: [
          "To inform readers of the branch library's annual circulation figures",
          "To persuade readers that library funding should be evaluated by the full range of services the library provides",
          "To explain how to reserve a public computer at a branch library",
          "To entertain readers with a personal story about a neighborhood library",
        ],
        correctAnswer: 1,
        explanation:
          "The statistics in paragraph 1 are evidence, not the point. Paragraphs 2 through 4 argue that the way library funding is described is wrong and should change.",
        choiceRationales: [
          "Circulation is one figure among several, and it is used to support an argument rather than to stand alone.",
          "Correct. The author makes a claim about how funding should be judged and supports it.",
          "No process is explained anywhere in the passage.",
          "The author writes in first person, but the passage argues rather than tells a story.",
        ],
        skill: "point-of-view",
        difficulty: "TABE Ready",
      },
      {
        id: "pov-p2",
        type: "multiple-select",
        question: "Select the TWO statements from the passage that are statements of FACT.",
        passageId: "pov-practice-library",
        choices: [
          "The branch circulated 41,000 items last year.",
          "That description is decades out of date.",
          "The branch served as a designated cooling center on eleven days.",
          "Every department should have to justify what it costs.",
        ],
        correctAnswer: [0, 2],
        explanation:
          "A fact can be checked against a record. Circulation counts and cooling-center days both appear in library records. The other two express the author's judgment.",
        choiceRationales: [
          "Correct. A countable figure that could be verified against library records.",
          "A judgment about how a description should be regarded. No record settles it.",
          "Correct. The number of days is documented and verifiable.",
          "Contains should, which signals a value judgment rather than a verifiable claim.",
        ],
        skill: "point-of-view",
        difficulty: "Developing",
      },
      {
        id: "pov-p3",
        type: "multiple-choice",
        question:
          "How does the author's use of first person in paragraph 4 affect the argument?",
        passageId: "pov-practice-library",
        choices: [
          "It weakens the argument, because personal statements cannot be evidence.",
          "It signals that the author is conceding a point and separating their actual claim from a position they do not hold.",
          "It shows the author works at the library.",
          "It changes the passage from an argument into a personal narrative.",
        ],
        correctAnswer: 1,
        explanation:
          "Paragraph 4 uses \"I do not think… I think…\" to give ground first (libraries should face scrutiny) and then state the narrower claim (scrutiny should measure what libraries do). That structure makes the argument harder to dismiss.",
        choiceRationales: [
          "The factual evidence sits in paragraph 1. First person here marks the claim, not the evidence.",
          "Correct. The paired I-statements distinguish the concession from the actual position.",
          "Nothing in the passage indicates the author is an employee — only that the branch is on their corner.",
          "The paragraph is the clearest statement of the claim in the whole passage, which is argument, not narrative.",
        ],
        skill: "point-of-view",
        difficulty: "Challenge",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Point of View and Purpose questions",
      detail: "How purpose items are worded, and the fact-versus-opinion checklist.",
      href: "/eng0300/tabe",
    },
  ],
};
