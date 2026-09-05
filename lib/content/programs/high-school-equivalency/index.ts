import { Lesson } from "@/types/lesson";
import { Program } from "@/types/program";

/**
 * High School Equivalency Preparation.
 *
 * Covers the four subject areas the HSE exams test, plus the test-taking
 * strategy that is worth as much as any single subject. Which exam a student
 * sits — GED, HiSET, or TASC — depends on their state, so the course teaches
 * the shared content and points to the state for the specifics.
 */

const m1: Lesson[] = [
  {
    slug: "which-exam-and-how-it-works",
    title: "Which Exam, and How It Works",
    description:
      "The HSE exams differ by state. Before studying anything, find out what you are sitting.",
    duration: "18 min",
    objectives: [
      "Identify which HSE exam your state administers",
      "Describe the subject areas and how each is scored",
      "Explain what a passing score means and what happens if you miss it",
      "Plan an order to take the subject tests in",
    ],
    sections: [
      {
        heading: "Find out what you are actually sitting",
        blocks: [
          {
            type: "scenario",
            role: "You have decided to get your high school equivalency.",
            text: "You search online and find practice material, a study guide, and a scoring explanation. Half of it describes a test your state does not use. You study for six weeks against the wrong format.",
            task: "Establish which exam, in which state, before doing anything else.",
          },
          {
            type: "paragraph",
            text: "There is no single national high school equivalency exam. States choose which to accept — most commonly the GED, HiSET, or TASC — and some accept more than one. They differ in format, scoring, number of subtests, and whether they are offered on paper. Everything else you do depends on this answer, so get it first.",
          },
          {
            type: "table",
            caption: "What to establish before you study",
            columns: ["Question", "Why it matters"],
            rows: [
              ["Which exam does my state accept?", "Format and scoring differ; study material is not interchangeable"],
              ["What are the subject areas?", "Determines what you actually have to prepare"],
              ["What is the passing score per subject?", "Tells you when a subject is finished"],
              ["Can I take subjects separately?", "Almost always yes — and taking them one at a time is usually the right strategy"],
              ["What does it cost, and is there help?", "Many states have vouchers or funded programs"],
              ["Is there a retake policy and a waiting period?", "Affects how you schedule"],
              ["Is a practice test available?", "The best single predictor of readiness"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "All the common HSE exams let you take the subjects separately and keep a passing score while you retake others. This matters strategically: pass the subject you are strongest at first. It is banked, it is done, and it changes how the rest of the process feels. Students who try to prepare for everything at once take longer and quit more often.",
          },
          {
            type: "table",
            caption: "The subject areas, in broad terms",
            columns: ["Area", "Covers"],
            rows: [
              ["Mathematical reasoning", "Number sense, algebra, geometry, and data — mostly applied to real situations"],
              ["Reasoning through language arts", "Reading comprehension, grammar and usage, and an extended written response"],
              ["Science", "Life, physical, and earth science, with heavy emphasis on reading data and evaluating evidence"],
              ["Social studies", "Civics and government, US history, economics, and geography, again with data interpretation"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Note what the science and social studies tests are really assessing. They ask far less about memorized facts than most people expect, and far more about reading a passage, a chart, or a graph and reasoning from it. A student who is strong at reading and weak on dates is often better placed than the reverse — and that changes how you should prepare.",
          },
          {
            type: "knowledge-check",
            question:
              "You are strongest at reading and weakest at math. In what order should you take the subject tests?",
            options: [
              "Math first, to get the hardest one over with",
              "Language arts first — passing scores are banked, and an early pass changes how the rest feels",
              "All on the same day, to finish quickly",
              "The order does not matter",
            ],
            correctIndex: 1,
            explanation:
              "Passing scores are kept while you work on other subjects, so there is no penalty for sequencing. Passing your strongest subject early banks a real result and gives you evidence the process works, which matters more than it sounds when the remaining subject is the hard one.",
            optionRationales: [
              "Starting with your weakest risks an early failure that many people do not come back from.",
              "Correct. Bank the strongest first — the score is kept and the confidence is real.",
              "Taking all four at once is exhausting and gives you no chance to learn from the first result.",
              "It affects both your odds and your persistence, which is most of what determines completion.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "This is research, and it should take under an hour." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find which HSE exam your state accepts and write down the official source you found it on.",
          "Record the subject areas, the passing score for each, and the cost.",
          "Find out whether your state offers vouchers, funded preparation, or free retakes.",
          "Find and schedule an official practice test. Write down the order you will take the four subjects in, and why.",
        ],
      },
    ],
  },
  {
    slug: "test-taking-strategy",
    title: "Test-Taking Strategy",
    description:
      "The skills that raise a score independently of how much content you know.",
    duration: "20 min",
    objectives: [
      "Manage time so you never leave answerable questions unattempted",
      "Use elimination effectively on multiple choice",
      "Approach a passage-and-question set in the right order",
      "Handle test anxiety with methods that actually work",
    ],
    sections: [
      {
        heading: "Points you lose that had nothing to do with knowing the answer",
        blocks: [
          {
            type: "scenario",
            role: "You are twenty minutes from the end of the math test.",
            text: "You have spent eleven minutes on one problem you almost had. There are nine questions left, several of which you could answer in under a minute. You run out of time with six unattempted, and four of them were easy.",
            task: "Learn the strategy that protects the points you already know how to earn.",
          },
          {
            type: "table",
            caption: "Strategy that works on any HSE subject",
            columns: ["Do this", "Because"],
            rows: [
              ["Answer every question, even a guess", "There is no penalty for a wrong answer. A blank is a guaranteed zero"],
              ["Do two passes — easy questions first", "Banks certain points before spending time on hard ones"],
              ["Set a per-question time limit and honor it", "One eleven-minute problem can cost you six answerable ones"],
              ["Mark and return rather than persisting", "Later questions sometimes remind you how to do an earlier one"],
              ["Eliminate wrong answers before choosing", "Cutting two of four turns a 25% guess into 50%"],
              ["Read the question before the passage", "You read the passage knowing what you are looking for"],
              ["Watch for NOT, EXCEPT, LEAST", "Missing a negative turns a correct understanding into a wrong answer"],
            ],
          },
          {
            type: "worked-example",
            title: "Working a passage-and-question set",
            task: "A science passage with a graph, followed by four questions.",
            steps: [
              {
                move: "Read the questions first, not the passage.",
                why: "Thirty seconds of reading the questions tells you what to look for. You then read the passage actively, hunting specific things, instead of reading it once for general understanding and again for each question.",
              },
              {
                move: "Read the graph's axes and units before its shape.",
                why: "Most graph questions turn on what is being measured rather than on the trend. A shape read without units is easy to misinterpret, and test writers know that.",
              },
              {
                move: "Answer the questions you can find directly, then the ones that need reasoning.",
                why: "Direct-retrieval questions are quick points. Doing them first means the harder inference questions are attempted with the passage already fresh.",
              },
              {
                move: "For every answer, point to the line or the data that supports it.",
                why: "If you cannot point to it, you are choosing what sounds plausible. On these tests the most plausible-sounding wrong answer is deliberately included.",
              },
            ],
            result: "Every question attempted, with the easy points banked and each answer traceable to the source.",
            takeaway: "Questions first, axes before shape, retrieval before inference, and never choose what you cannot point to.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Test anxiety is real and it is treatable with practice rather than willpower. Two things help measurably: taking full-length timed practice tests, so the real thing is familiar rather than novel; and a simple breathing reset when you notice panic — breathe out for longer than you breathe in, four or five times. Anxiety mostly costs points by consuming working memory, and slowing your breathing gives some of it back.",
          },
          {
            type: "knowledge-check",
            question:
              "Five minutes remain and you have six questions left. What should you do?",
            options: [
              "Work carefully through as many as you can and leave the rest blank",
              "Answer every remaining question, guessing where necessary, then use any time left to improve the guesses",
              "Pick the longest answer for each, since longer answers are usually right",
              "Choose C for all of them",
            ],
            correctIndex: 1,
            explanation:
              "There is no penalty for a wrong answer, so a blank is a guaranteed zero while a guess is not. Filling everything in first guarantees you have a chance at every question, and any remaining time then improves those guesses rather than being spent on questions you may not reach.",
            optionRationales: [
              "Careful work is right when you have time. With five minutes and six questions, blanks are certain zeros.",
              "Correct. Answer everything first, then improve what you can.",
              "Answer length is not a reliable signal, and test writers control for it.",
              "Uniform guessing is better than blanks, but eliminating even one option per question beats it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice under real conditions — untimed practice does not prepare you for a timed test." },
      {
        type: "list",
        ordered: true,
        items: [
          "Take one full-length timed practice section. Note where you ran out of time and which questions you left blank.",
          "Calculate your per-question time budget: total minutes divided by number of questions. Write it on your hand during the next practice.",
          "Take ten practice questions and, for each, write down which answers you eliminated and why before choosing.",
          "Do one passage set reading the questions first, and one reading the passage first. Time both and compare.",
        ],
      },
    ],
  },
];

const m2: Lesson[] = [
  {
    slug: "math-reasoning",
    title: "Mathematical Reasoning",
    description:
      "The math the exam actually asks for: proportional reasoning, basic algebra, and reading data.",
    duration: "24 min",
    objectives: [
      "Solve problems involving ratios, rates, and percentages",
      "Set up and solve a one-variable equation from a word problem",
      "Read and interpret data from tables and graphs",
      "Use the formula sheet the exam provides",
    ],
    sections: [
      {
        heading: "Most of it is proportional reasoning wearing different clothes",
        blocks: [
          {
            type: "scenario",
            role: "You are looking at a practice math test.",
            text: "The questions are about sale prices, fuel consumption, medication doses, and interest. They look like four different topics. They are mostly one topic — a comparison of two quantities — asked four ways.",
            task: "Learn to recognize the same structure under different surfaces.",
          },
          {
            type: "paragraph",
            text: "A large share of HSE math is proportional reasoning: percentages, ratios, rates, unit conversion, and scale. If you can set up and solve a proportion reliably, you have covered a great deal of the test. The rest is basic algebra, geometry formulas that are provided to you, and reading data.",
          },
          {
            type: "worked-example",
            title: "Setting up a proportion from a word problem",
            task: "A car uses 12 gallons of fuel to travel 384 miles. How far can it travel on 18 gallons?",
            steps: [
              {
                move: "Identify what is being compared, and keep the units in the same positions.",
                why: "Miles to gallons, both sides. Writing 384/12 on one side and 18/x on the other inverts the relationship and produces a confidently wrong answer. The units are what stop this.",
              },
              {
                move: "Write it as two equal fractions: 384/12 = x/18.",
                why: "Miles on top on both sides, gallons underneath on both sides. Set it up this way and it is nearly impossible to get backwards.",
              },
              {
                move: "Cross-multiply: 12x = 384 × 18, so 12x = 6,912.",
                why: "Cross-multiplication turns a proportion into a one-step equation, which is the only algebra this problem needs.",
              },
              {
                move: "Divide: x = 576 miles.",
                why: "One operation. The setup was the whole problem, which is true of most proportion questions on this test.",
              },
              {
                move: "Sanity-check: 18 gallons is 1.5 times 12, and 576 is 1.5 times 384.",
                why: "This takes five seconds and catches an inverted setup immediately. If your answer had been smaller than 384, the setup was backwards.",
              },
            ],
            result: "576 miles, checked.",
            takeaway: "Keep units in matching positions, cross-multiply, and sanity-check the direction. Setup is the problem; the arithmetic is not.",
          },
          {
            type: "table",
            caption: "The percentage relationships worth knowing cold",
            columns: ["Question", "Method", "Example"],
            rows: [
              ["What is 15% of 80?", "Multiply by the decimal", "0.15 × 80 = 12"],
              ["12 is what percent of 80?", "Divide, then convert", "12 ÷ 80 = 0.15 = 15%"],
              ["12 is 15% of what?", "Divide by the decimal", "12 ÷ 0.15 = 80"],
              ["A $80 item is 15% off", "Find the discount, subtract", "80 − 12 = $68"],
              ["Increase 80 by 15%", "Multiply by 1.15", "80 × 1.15 = 92"],
              ["From 80 to 92 — what change?", "Difference ÷ original", "12 ÷ 80 = 15% increase"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The exam provides a formula sheet, so memorizing area and volume formulas is not where your study time belongs. Knowing the sheet exists and being able to find the right formula on it quickly is worth more. Print it out and practice with it, so it is familiar rather than a new document on test day.",
          },
          {
            type: "knowledge-check",
            question:
              "A jacket costs $60 and is marked 25% off. What is the sale price?",
            options: ["$35", "$45", "$48", "$15"],
            correctIndex: 1,
            explanation:
              "25% of 60 is 15, so the discount is $15 and the price is $45. The faster route is to multiply by what you pay rather than what you save: 60 × 0.75 = 45, one operation instead of two.",
            optionRationales: [
              "$35 would be a discount of $25, which is about 42%.",
              "Correct. $60 − $15 = $45, or 60 × 0.75 in one step.",
              "$48 would be a 20% discount.",
              "$15 is the discount, not the sale price — a very common misread of the question.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Proportional reasoning repays practice more than any other single topic here." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the official formula sheet for your exam, print it, and use it for every practice problem.",
          "Do ten proportion problems, writing the units beside every number in the setup.",
          "Work all six percentage relationships from the table using the numbers from your own life — a bill, a paycheck, a sale.",
          "Take five word problems and, without solving them, write only the equation each one describes.",
        ],
      },
    ],
  },
  {
    slug: "language-arts-and-the-essay",
    title: "Language Arts and the Extended Response",
    description:
      "Reading for evidence, the grammar the test checks, and writing the essay to the rubric.",
    duration: "24 min",
    objectives: [
      "Answer reading questions by pointing to text evidence",
      "Correct the errors the test most often checks",
      "Plan and write an extended response in the time available",
      "Use the rubric to decide what is worth your time",
    ],
    sections: [
      {
        heading: "The essay is scored on a rubric, so write to it",
        blocks: [
          {
            type: "scenario",
            role: "You are facing the extended response.",
            text: "Two passages argue opposite sides. You are asked which is better supported. You write everything you think about the topic, beautifully, and score poorly — because the question was not what you think. It was which argument the evidence supports.",
            task: "Understand what the rubric rewards, and write that.",
          },
          {
            type: "paragraph",
            text: "The extended response is not an opinion essay. You are given source material and asked to analyze it — usually to judge which of two arguments is better supported by evidence. Your own view of the topic is not being assessed and does not earn points. What earns points is a clear position, evidence drawn from the passages, and organized, readable prose.",
          },
          {
            type: "table",
            caption: "What the rubric rewards",
            columns: ["Dimension", "What scores well"],
            rows: [
              ["Analysis and argument", "A clear position, stated early, that answers the actual question"],
              ["Use of evidence", "Specific references to the passages, not general assertions"],
              ["Organization", "An introduction, body paragraphs each with one point, a conclusion"],
              ["Clarity and conventions", "Varied sentences, correct grammar, readable at speed"],
            ],
          },
          {
            type: "worked-example",
            title: "Planning the essay in five minutes",
            task: "You have 45 minutes for the extended response. Spend the first five planning.",
            steps: [
              {
                move: "Read the prompt twice and underline exactly what it asks.",
                why: "Most low scores come from answering a related but different question. 'Which is better supported' is not 'which do you agree with', and the difference is the whole task.",
              },
              {
                move: "Skim both passages and mark two or three pieces of evidence from each.",
                why: "You need specifics to cite. Marking as you read means you are not hunting for a quotation at minute forty with the clock running.",
              },
              {
                move: "Decide your position and write it as one sentence.",
                why: "That sentence becomes your thesis and the spine of the essay. Deciding before you write prevents the essay that argues both sides and concludes neither.",
              },
              {
                move: "List your body paragraphs — one point each, with the evidence you will use.",
                why: "Three lines of planning. It is what turns forty minutes of writing into a structured essay rather than a stream of thoughts.",
              },
              {
                move: "Write, and leave three minutes to reread.",
                why: "Three minutes catches the missing word, the unfinished sentence, and the paragraph that never made its point. It is the highest-value three minutes in the whole task.",
              },
            ],
            result: "A planned essay with a clear position and cited evidence, finished with time to check it.",
            takeaway: "Five minutes planning, three minutes checking. The forty in between go much better for it.",
          },
          {
            type: "table",
            caption: "Grammar errors the test checks most",
            columns: ["Error", "Example", "Fix"],
            rows: [
              ["Subject-verb agreement", "The list of items are ready", "The list … is ready"],
              ["Run-on / comma splice", "It was late, we left", "It was late, so we left"],
              ["Fragment", "Because it was late.", "Attach it to a main clause"],
              ["Pronoun agreement", "Each student brought their book", "Acceptable now; older tests may prefer his or her"],
              ["Confusable words", "their / there / they're", "Learn the three; they appear constantly"],
              ["Shifting tense", "She walked in and sits down", "Keep one tense"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "The extended response asks which of two arguments is better supported. You strongly disagree with the better-supported one. What should you write?",
            options: [
              "Argue for the position you agree with — sincerity scores well",
              "Argue that the better-supported argument is better supported, using evidence from the passages",
              "Argue both sides equally and let the reader decide",
              "Explain why the question itself is flawed",
            ],
            correctIndex: 1,
            explanation:
              "The task is analytical, not persuasive. You are assessed on whether you can identify and demonstrate which argument the evidence supports — your own agreement is not part of the rubric, and substituting it means answering a different question.",
            optionRationales: [
              "Your view is not what is being scored, however sincerely held.",
              "Correct. Answer the question asked, using the passages as evidence.",
              "Refusing to take a position loses marks on analysis and argument, which is the largest dimension.",
              "This does not answer the prompt at all.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Write at least one full timed essay before test day. Reading about it is not preparation." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the official scoring rubric for your exam's extended response and read it properly.",
          "Write one full essay under timed conditions, using five minutes to plan and three to check.",
          "Score your own essay against the rubric, dimension by dimension, and note the weakest one.",
          "Take ten practice grammar questions and sort your errors by the categories in the table. Study the most frequent one first.",
        ],
      },
    ],
  },
];

const m3: Lesson[] = [
  {
    slug: "science-and-social-studies",
    title: "Science and Social Studies",
    description:
      "Both tests are mostly reading and data interpretation. Prepare for that rather than memorizing facts.",
    duration: "22 min",
    objectives: [
      "Read a scientific passage and identify the claim and the evidence",
      "Interpret graphs, tables, and charts accurately",
      "Apply the civics and economics concepts that recur",
      "Recognize what these tests are actually assessing",
    ],
    sections: [
      {
        heading: "Less memorization than you expect",
        blocks: [
          {
            type: "scenario",
            role: "You are dreading the science test.",
            text: "You have not studied science in years and cannot remember the periodic table. You open a practice test and find a passage about an experiment, a graph of results, and questions asking what the data show. Almost nothing asks you to recall a fact.",
            task: "Prepare for the test that exists rather than the one you are imagining.",
          },
          {
            type: "paragraph",
            text: "Both the science and social studies tests are built around source material. You are given a passage, a graph, a map, or a document, and asked to interpret it. Background knowledge helps you read faster, but the answer is nearly always in front of you. This is good news for adult learners, who are often far better at reasoning from evidence than at recalling school facts.",
          },
          {
            type: "table",
            caption: "Reading a graph without being caught out",
            columns: ["Check", "Why"],
            rows: [
              ["Read both axis labels and their units first", "The most common error is answering about the wrong quantity"],
              ["Check where the vertical axis starts", "An axis not starting at zero exaggerates differences visually"],
              ["Note the time period covered", "A trend over two years may reverse over ten"],
              ["Read the legend before the lines", "Which series is which decides everything after"],
              ["Distinguish correlation from cause", "Two lines moving together is not evidence one caused the other"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Correlation and causation is tested repeatedly on both papers, usually as a plausible wrong answer. If a question offers 'X caused Y' and the passage only shows they rose together, that option is nearly always the distractor. The correct answer usually says the data show an association, or that more information would be needed.",
          },
          {
            type: "table",
            caption: "Concepts that recur in social studies",
            columns: ["Concept", "Worth knowing"],
            rows: [
              ["Separation of powers", "Legislative makes law, executive enforces, judicial interprets"],
              ["Checks and balances", "Each branch can limit the others — veto, override, judicial review"],
              ["The Bill of Rights", "The first ten amendments and what they broadly protect"],
              ["Federalism", "Power divided between national and state government"],
              ["Supply and demand", "Price rises when demand exceeds supply, and falls when it does not"],
              ["Reading a primary source", "Who wrote it, when, and for what purpose — bias is a standard question"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "A passage shows that ice cream sales and drowning deaths both rise in the same months. Which conclusion does the data support?",
            options: [
              "Ice cream consumption contributes to drowning",
              "The two are associated, and a further factor such as warm weather may explain both",
              "Drowning deaths cause an increase in ice cream sales",
              "There is no relationship between the two",
            ],
            correctIndex: 1,
            explanation:
              "Two things rising together is an association, not a cause. Here a third factor — warmer weather, which increases both swimming and ice cream sales — explains both. Recognizing that a correlation may have an outside cause is one of the most frequently tested reasoning skills on these papers.",
            optionRationales: [
              "This asserts causation from correlation, which is the classic distractor.",
              "Correct. An association, with a plausible third factor.",
              "The same error in the opposite direction.",
              "There is a clear association in the data; denying it goes too far the other way.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice the skill these tests actually assess." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find five graphs in news articles. For each, write down both axis labels, where the vertical axis starts, and one thing the graph does not tell you.",
          "Take one science practice passage and, for every question, write the sentence or data point that supports your answer.",
          "Learn the three branches of government and one power each has over another.",
          "Find a primary source document and write three sentences on who wrote it, when, and what they wanted the reader to believe.",
        ],
      },
    ],
  },
];

export const highSchoolEquivalency: Program = {
  slug: "high-school-equivalency",
  group: "Academic Programs",
  title: "High School Equivalency Preparation",
  shortTitle: "HSE Preparation",
  icon: "📚",
  accent: "from-violet-700 to-violet-900",
  description:
    "Preparation for the GED, HiSET, or TASC: which exam your state uses, the test-taking strategy that raises scores independently of content, and the four subject areas.",
  overview:
    "There is no single national high school equivalency exam — states choose which to accept, and the formats differ. This course starts by establishing which exam you are actually sitting, because studying against the wrong format is a common and expensive mistake. It then covers test strategy, which is worth as much as any single subject, and the four subject areas. Two things surprise most students: the science and social studies papers ask far less about memorized facts than expected and far more about reading data, and the extended response is an analytical task rather than an opinion essay.",
  outcomes: [
    "Identify which HSE exam your state accepts and what it costs",
    "Sequence the subject tests to bank a pass early",
    "Manage exam time so no answerable question is left blank",
    "Use elimination and read questions before passages",
    "Set up and solve proportion problems, and handle all six percentage relationships",
    "Use the provided formula sheet rather than memorizing formulas",
    "Plan and write an extended response to the rubric, with evidence from the sources",
    "Read graphs for axes, scale, and period before shape",
    "Distinguish correlation from causation, which is tested repeatedly",
  ],
  careerRoles: [
    "High school equivalency credential",
    "Entry to college and certificate programs",
    "Employment requiring a high school credential",
    "Military eligibility, subject to service requirements",
  ],
  credentialNote:
    "This is preparation and does not itself award any credential. The exam is administered by your state through approved testing centers, and passing it is what grants the equivalency. Exam names, subject areas, scoring, fees, and retake rules vary by state and are revised periodically — verify every specific against your state's official HSE page and the test publisher, not against this course. Where this course and an official source disagree, the official source is right.",
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "The Exam & Test Strategy",
      emoji: "🎯",
      description:
        "Which exam your state uses, how scoring works, and the strategy that protects points you already know how to earn.",
      lessons: m1,
      level: "Beginner",
      estimatedMinutes: 38,
      whatYoullLearn: [
        "Which exam your state accepts, and why study material is not interchangeable",
        "Why passing your strongest subject first is the right strategy",
        "Time management, elimination, and reading questions before passages",
        "Handling test anxiety with practice rather than willpower",
      ],
      scenario:
        "You study for six weeks using material for a test your state does not administer. Later, in the exam, you spend eleven minutes on one problem and run out of time with six questions unattempted — four of which you could have answered in a minute.",
    },
    {
      moduleNumber: 2,
      moduleSlug: "module-2",
      title: "Math & Language Arts",
      emoji: "🔢",
      description:
        "Proportional reasoning and the percentage relationships, plus reading for evidence and writing the extended response to its rubric.",
      lessons: m2,
      level: "Intermediate",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Setting up proportions so they cannot come out backwards",
        "All six percentage relationships, and which to use when",
        "Using the provided formula sheet instead of memorizing",
        "Planning an extended response in five minutes and checking it in three",
      ],
      scenario:
        "The math questions look like four different topics — sale prices, fuel consumption, doses, interest — and are mostly one topic asked four ways. On the essay, you write everything you think about the topic and score poorly, because the question was not what you think.",
    },
    {
      moduleNumber: 3,
      moduleSlug: "module-3",
      title: "Science & Social Studies",
      emoji: "🔬",
      description:
        "Both papers are mostly reading and data interpretation. Prepare for the test that exists rather than the one you are imagining.",
      lessons: m3,
      level: "Intermediate",
      estimatedMinutes: 22,
      whatYoullLearn: [
        "Identifying the claim and the evidence in a scientific passage",
        "Reading a graph for axes, scale, and period before shape",
        "The civics and economics concepts that recur",
        "Why correlation-as-causation is the most common distractor on both papers",
      ],
      scenario:
        "You dread the science test because you cannot remember the periodic table. You open a practice paper and find a passage, a graph, and questions asking what the data show — and almost nothing asking you to recall a fact.",
    },
  ],
};
