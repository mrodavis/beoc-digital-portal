import { Skill } from "@/types/eng0300";

/** WEEK 5 — Point of View & Purpose (fully populated). */
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
  status: "complete",
  estimatedMinutes: 50,

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
      wordCount: 161,
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
        wordCount: 70,
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
        wordCount: 171,
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

  challenge: {
    id: "pov-challenge",
    title: "Challenge — a biography that blends fact with the author's admiration",
    intro:
      "This biography is built on facts you could look up, but its author is not neutral about the person. Read all five paragraphs before you decide what the author is trying to do, and test each sentence by asking whether a record could settle it.",
    passages: [
      {
        id: "pov-challenge-perkins",
        title: "What Frances Perkins Saw",
        type: "Biography",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 348,
        body: [
          "On a Saturday afternoon in March 1911, a young advocate for working people named Frances Perkins was near Washington Square in New York City when fire broke out at the Triangle Shirtwaist Factory, on the upper floors of a nearby building. She reached the street in time to see workers trapped at the windows. More than one hundred people died, most of them young immigrant women. Perkins spent the rest of her career acting on what she saw that day.",
          "In the following years, she investigated factory conditions for New York State and pushed for laws on fire safety and working hours. When Franklin Roosevelt became governor of New York, he made her the state's industrial commissioner, in charge of its labor department. It is hard to imagine a better preparation for what came next.",
          "When Roosevelt became president in 1933, he chose her as Secretary of Labor. She was the first woman to serve in a presidential cabinet. Her appointment is usually remembered as a milestone for women, and it was. But that framing is too small for what she did with the job. Calling her a first makes her sound like a symbol, when she was one of the most effective officials of her century.",
          "In 1934 she led the committee that drafted the Social Security Act, which became law in 1935 and created old-age and unemployment insurance. She also pushed for the Fair Labor Standards Act of 1938, which set a national minimum wage and restricted child labor. The first version of Social Security left out farmworkers and household workers, a gap that later Congresses narrowed. But no law arrives complete, and it would be unfair to hold that gap against her.",
          "Perkins served as Secretary of Labor from 1933 to 1945. Those twelve years did more for people who work for wages than any twelve years before or since. A minimum wage, a retirement check, an unemployment benefit — each carries a trace of what she saw from the street in 1911. Her name should be as familiar as the protections she fought for.",
        ],
      },
    ],
    questions: [
      {
        id: "pov-c1",
        type: "multiple-choice",
        question: "What is the author's primary purpose in writing this passage?",
        passageId: "pov-challenge-perkins",
        choices: [
          "To inform readers about the causes of the 1911 Triangle Shirtwaist Factory fire",
          "To entertain readers with a dramatic story about a factory fire",
          "To persuade readers that Perkins should be remembered for the protections working people still rely on, not only as the first woman in a cabinet",
          "To explain how the Social Security Act and the Fair Labor Standards Act work",
        ],
        correctAnswer: 2,
        explanation:
          "The facts are real, but they are arranged to make a case. Paragraph 3 argues that remembering Perkins only as a first is \"too small for what she did with the job,\" and paragraph 5 ends with \"Her name should be as familiar as the protections she fought for.\" The author wants you to agree with a judgment about Perkins, not just learn the dates of her career.",
        choiceRationales: [
          "The fire opens the passage, but its causes are never explained. It appears as the event that set Perkins's work in motion — a purpose the passage serves only incidentally.",
          "The opening is vivid, but the fire fills one paragraph. The other four argue about how Perkins should be remembered, which is not storytelling for its own sake.",
          "Correct. Paragraph 3 rejects the narrower way of remembering her, and paragraph 5 states the author's aim outright.",
          "The two laws are named and summarized in a clause each, but nothing about how they operate is explained. They serve as evidence for the author's claim about Perkins.",
        ],
        skill: "point-of-view",
        difficulty: "TABE Ready",
      },
      {
        id: "pov-c2",
        type: "multiple-select",
        question:
          "Which statements from the passage are opinions? Select all that apply.",
        passageId: "pov-challenge-perkins",
        choices: [
          "\"It is hard to imagine a better preparation for what came next.\" (paragraph 2)",
          "\"She was the first woman to serve in a presidential cabinet.\" (paragraph 3)",
          "\"The first version of Social Security left out farmworkers and household workers, a gap that later Congresses narrowed.\" (paragraph 4)",
          "\"Those twelve years did more for people who work for wages than any twelve years before or since.\" (paragraph 5)",
          "\"Her name should be as familiar as the protections she fought for.\" (paragraph 5)",
        ],
        correctAnswer: [0, 3, 4],
        explanation:
          "Apply one test to each statement: could a record settle it? A cabinet appointment and the coverage of a law are matters of record. How good a preparation was, whether twelve years \"did more\" than any others, and whose name should be familiar are judgments. The trap is the opinion that carries a number — the dates behind \"twelve years\" are factual, but the comparison built on them is not.",
        choiceRationales: [
          "Correct. The phrase \"hard to imagine a better\" is a judgment about how well her earlier work prepared her. No record could settle it.",
          "A fact. Cabinet appointments are public record. A statement can make someone look good and still be a fact.",
          "A fact, even though it points out a flaw in the law. Who the law covered can be checked against the law itself. A critical-sounding statement is not automatically an opinion.",
          "Correct. The twelve years can be checked — 1933 to 1945 — but the claim built on them cannot. Whether those years \"did more\" than any others is a judgment no record could settle.",
          "Correct. The word \"should\" signals a judgment about what ought to be, not a claim a record could check.",
        ],
        skill: "point-of-view",
        difficulty: "Challenge",
      },
      {
        id: "pov-c3",
        type: "multiple-choice",
        question:
          "In paragraph 4, the author notes that the first version of Social Security \"left out farmworkers and household workers.\" How does the author's point of view shape the way this fact is presented?",
        passageId: "pov-challenge-perkins",
        choices: [
          "The author mentions the gap once and immediately excuses it, so a real limitation reads as a small exception to Perkins's achievement.",
          "The author leaves the gap out of the passage so that Perkins appears more successful than she was.",
          "The author uses the gap to argue that Social Security failed the workers who needed it most.",
          "The author presents the gap neutrally, giving it the same weight as the laws Perkins helped pass.",
        ],
        correctAnswer: 0,
        explanation:
          "A writer with a strong point of view can include an unwelcome fact and still control its effect. Here the fact is true and checkable, but it is mentioned only once and is answered immediately by an opinion — \"no law arrives complete\" — that asks the reader not to count it against Perkins. Point of view shapes not only which facts appear, but how much each one is allowed to weigh.",
        choiceRationales: [
          "Correct. The limitation gets one sentence, and the next sentence — \"But no law arrives complete\" — tells the reader how to judge it. The author's admiration controls how much the fact is allowed to count.",
          "The gap is in the passage, in paragraph 4. The author did not hide it; the question is what the author does with it once it is there.",
          "The author argues the opposite: \"it would be unfair to hold that gap against her.\" The gap is raised in order to be set aside.",
          "The laws return in paragraph 5 as the reason Perkins should be remembered, while the gap is mentioned once and answered at once by the author's judgment that it should not count against her. That is neither equal weight nor a neutral presentation.",
        ],
        skill: "point-of-view",
        difficulty: "Challenge",
      },
      {
        id: "pov-c4",
        type: "short-response",
        question:
          "The author of this biography admires Perkins. In three or four sentences, name the author's point of view toward her, quote one statement of fact and one statement of opinion from the passage, and explain one thing the author emphasizes or plays down because of that point of view.",
        passageId: "pov-challenge-perkins",
        explanation:
          "A complete answer does three jobs: it names the author's point of view, quotes a fact and an opinion accurately, and connects that point of view to a specific choice about emphasis. The third job is the one most answers leave out — and it is the one that shows you understand how point of view shapes what a reader is shown.",
        sampleResponse:
          "The author writes from an admiring point of view, and that attitude decides which facts get the most room. The passage rests on checkable facts such as \"Perkins served as Secretary of Labor from 1933 to 1945,\" but it surrounds them with judgments like \"It is hard to imagine a better preparation for what came next.\" Because of that point of view, the new laws are praised again in the final paragraph, while the fact that Social Security first \"left out farmworkers and household workers\" is mentioned once and excused in the very next sentence. A neutral biography would report the same facts without telling the reader how much each one should count.",
        skill: "point-of-view",
        difficulty: "Challenge",
      },
    ],
  },

  masteryCheck: {
    id: "pov-mastery",
    title: "Mastery check",
    intro:
      "Two short passages about the same event, four items. If you miss one, the review below each answer will tell you which part of the lesson to revisit.",
    passages: [
      {
        id: "pov-mastery-p1",
        title: "Passage 1: A Resident's Letter",
        type: "Argument",
        attribution: "Original passage — BEOC Academic Bridge",
        wordCount: 103,
        body: [
          "The elevator in my building was out of service for nine days this month. I live on the sixth floor, and I managed the stairs. My neighbor across the hall uses a cane, and for those nine days she did not leave her apartment. We were given one notice, taped inside the lobby door, and it gave no date for the repair. I understand that parts take time. What I do not understand is why no one from the office knocked on a single door to ask who needed help getting groceries upstairs. A building this size should have a plan for this.",
        ],
      },
      {
        id: "pov-mastery-p2",
        title: "Passage 2: Notice from the Management Office",
        type: "Informational",
        attribution: "Original passage — BEOC Academic Bridge",
        wordCount: 93,
        body: [
          "The building's elevator was taken out of service on March 4 after a routine inspection found a worn part in the motor. Because the elevator is more than thirty years old, the replacement part had to be made to order. The elevator returned to service on March 13 and passed a city safety inspection the same day. A notice was posted in the lobby on the first day of the outage. The repair was completed at no cost to residents. Management handled the repair as quickly and carefully as residents could reasonably expect.",
        ],
      },
    ],
    questions: [
      {
        id: "pov-m1",
        type: "multiple-choice",
        question: "From which point of view is Passage 1 written?",
        passageId: "pov-mastery-p1",
        choices: [
          "First person",
          "Second person",
          "Third person limited",
          "Third person omniscient",
        ],
        correctAnswer: 0,
        explanation:
          "The writer tells about their own building using I, my, and we — \"I live on the sixth floor.\" Those pronouns mark first person. If you missed this, revisit the table in \"Point of view: who is speaking\" and check the pronouns first.",
        choiceRationales: [
          "Correct. I, my, and we mark a writer describing their own experience.",
          "Second person speaks to the reader as you and usually gives instructions. This writer never addresses the reader; they describe what happened to them.",
          "The passage does use she — for the neighbor across the hall — but the person telling it is I. A third-person narrator stands outside the events.",
          "An omniscient narrator reports what several people are thinking. This writer reports only their own thoughts; the neighbor's thoughts never appear.",
        ],
        skill: "point-of-view",
        difficulty: "Foundation",
      },
      {
        id: "pov-m2",
        type: "multiple-choice",
        question: "Which statement from Passage 2 is an opinion rather than a fact?",
        passageId: "pov-mastery-p2",
        choices: [
          "\"The elevator returned to service on March 13 and passed a city safety inspection the same day.\"",
          "\"Because the elevator is more than thirty years old, the replacement part had to be made to order.\"",
          "\"A notice was posted in the lobby on the first day of the outage.\"",
          "\"Management handled the repair as quickly and carefully as residents could reasonably expect.\"",
        ],
        correctAnswer: 3,
        explanation:
          "Ask of each statement whether a record could settle it. Dates, inspection results, the age of the elevator, and a posted notice can all be checked. Whether the repair was handled \"as quickly and carefully as residents could reasonably expect\" is the management office's judgment of its own work. If you missed this, revisit \"Fact and opinion\" in the lesson.",
        choiceRationales: [
          "A fact. The return date and the inspection result can both be checked against building and city records.",
          "A fact. The elevator's age and whether the part was made to order can be checked. Because explains a cause, but a cause can still be verifiable.",
          "A fact — and one the resident in Passage 1 confirms. Both writers mention the notice in the lobby.",
          "Correct. The claim that the repair went \"as quickly and carefully as residents could reasonably expect\" is a judgment. No record can settle what residents could reasonably expect.",
        ],
        skill: "point-of-view",
        difficulty: "Developing",
      },
      {
        id: "pov-m3",
        type: "multiple-choice",
        question: "What is the primary purpose of Passage 1?",
        passageId: "pov-mastery-p1",
        choices: [
          "To inform readers that the elevator was out of service for nine days",
          "To persuade readers that the building needs a plan for checking on residents when the elevator is out",
          "To entertain readers with a story about a neighbor who uses a cane",
          "To explain how elevator repairs are scheduled and paid for",
        ],
        correctAnswer: 1,
        explanation:
          "The writer's facts — nine days, the sixth floor, a neighbor who could not leave, one notice with no date — all lead to the final sentence: \"A building this size should have a plan for this.\" The writer wants readers to agree that something should change. If you chose to inform, revisit the test tip under \"Author's purpose: why the text exists\" and ask what the author wants you to do after reading.",
        choiceRationales: [
          "The nine days are real, but they are the writer's evidence, not the point. The passage does not stop at the facts; it ends by saying what should change.",
          "Correct. Every detail builds toward the last sentence, which tells readers what the writer wants: a plan.",
          "The neighbor is there to show who was harmed by the outage, not to tell a story for enjoyment.",
          "Passage 1 says nothing about how repairs are scheduled or paid for. The only repair detail it gives is that no date was provided.",
        ],
        skill: "point-of-view",
        difficulty: "TABE Ready",
      },
      {
        id: "pov-m4",
        type: "paired-text",
        question:
          "How does the author of Passage 1 differ from the author of Passage 2?",
        choices: [
          "They disagree about the facts: the resident says the elevator was out for nine days, while the management office says the repair was quick.",
          "Passage 1 contains only opinions, while Passage 2 contains only facts.",
          "They agree on the basic facts but treat different facts as important: the office emphasizes the repair and its inspection, while the resident emphasizes the people stuck upstairs whom no one checked on.",
          "The management office admits that no one checked on residents, while the resident argues that the lobby notice was enough.",
        ],
        correctAnswer: 2,
        explanation:
          "Line up the facts first. Both passages describe the same outage — nine days, from March 4 to March 13 — and the same single notice in the lobby. The difference is which facts each writer treats as important: the office writes about the worn part, the inspection, and the cost, while the resident writes about who could not get downstairs. The office's notice is silent on the question the resident cares about most. If you missed this, revisit \"Point of view: who is speaking\" in the lesson and the worked example, \"One event, two points of view.\"",
        choiceRationales: [
          "The facts line up. March 4 to March 13 is nine days, and both writers mention the notice in the lobby. The office's claim about speed is a judgment, not a different set of facts.",
          "Both passages mix the two. The resident reports facts such as \"I live on the sixth floor,\" and the office offers an opinion about how well it handled the repair.",
          "Correct. The writers disagree about which facts matter, not about what happened.",
          "This reverses the passages. The office never mentions whether anyone checked on residents, and the resident is the one who objects that no one did.",
        ],
        skill: "point-of-view",
        difficulty: "TABE Ready",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Point of View and Purpose questions",
      detail: "How purpose items are worded, and the fact-versus-opinion checklist.",
      href: "/eng0300/tabe",
    },
    {
      label: "Practice Center — Point of View sets",
      detail: "Every Point of View set in one place, from the guided question through the challenge.",
      href: "/eng0300/practice?skill=point-of-view",
    },
  ],
};
