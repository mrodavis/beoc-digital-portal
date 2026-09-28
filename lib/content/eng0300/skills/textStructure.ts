import { Skill } from "@/types/eng0300";

/** WEEK 4 — Text Structure & Organization (fully populated). */
export const textStructureSkill: Skill = {
  id: "text-structure",
  slug: "text-structure",
  title: "Text Structure",
  shortTitle: "Text Structure",
  description:
    "Recognize how a text is organized, use its signal words to follow the argument, and compare the structures of two texts on one topic.",
  icon: "🧱",
  accent: "from-eng-navy-600 to-eng-teal-700",
  week: 4,
  status: "complete",
  estimatedMinutes: 50,

  outcomes: [
    "Describe the overall structure of a text (e.g., chronology, comparison, cause/effect, problem/solution)",
    "Compare and contrast the structure of two or more texts on a related topic",
  ],

  objectives: [
    "Identify the five common informational text structures",
    "Use signal words to predict where a passage is going",
    "Explain why an author chose a particular structure",
    "Compare how two texts on the same topic are organized differently",
  ],

  lesson: [
    {
      heading: "Five structures cover almost everything you will read",
      paragraphs: [
        "Text structure is the pattern an author uses to organize information. Naming the pattern early makes the rest of the passage easier to follow, because you know what kind of information to expect next.",
      ],
      table: {
        columns: ["Structure", "What it does", "Signal words"],
        rows: [
          [
            "Chronology / sequence",
            "Presents events or steps in the order they happen.",
            "first, next, then, later, finally, in 2019, by June",
          ],
          [
            "Cause and effect",
            "Explains why something happened and what followed.",
            "because, since, as a result, therefore, led to, consequently",
          ],
          [
            "Problem and solution",
            "Presents a problem, then one or more responses to it.",
            "problem, issue, challenge, solution, to address this, resolved",
          ],
          [
            "Compare and contrast",
            "Shows how two or more things are alike and different.",
            "similarly, likewise, unlike, however, in contrast, whereas",
          ],
          [
            "Description",
            "Explains a topic through characteristics and examples.",
            "for example, such as, in addition, includes, characteristics",
          ],
        ],
      },
      callout: {
        label: "Test tip",
        text: "Cause/effect and problem/solution are the pair most often confused. Ask whether the passage ends by explaining a result (cause/effect) or by proposing a response (problem/solution). If someone is doing something about it, it is problem/solution.",
      },
    },
    {
      heading: "Structure follows purpose",
      paragraphs: [
        "Authors do not choose a structure at random. They choose the one that fits what they are trying to accomplish, which means the structure itself is a clue to the author's purpose.",
        "A manual explaining how to operate a machine uses sequence because order matters. An article arguing that one policy works better than another uses comparison because the reader has to see both. A report on a neighborhood's flooding uses cause and effect if it is explaining what happened, and problem/solution if it is advocating for a fix.",
      ],
      bullets: [
        "Read the first and last paragraph to find the shape before you read the middle for detail.",
        "Scan for signal words — three or four of the same family usually settles the structure.",
        "Watch for a passage that uses one structure inside another: a problem/solution article often contains a chronology.",
      ],
    },
    {
      heading: "Comparing structure across two texts",
      paragraphs: [
        "When you are given two texts on one topic, the question is rarely which one is right. It is how each author organized the same subject, and what that organization lets them do.",
      ],
      bullets: [
        "Name each text's structure separately before you compare them.",
        "Ask what each structure emphasizes — a chronology emphasizes how something developed; a comparison emphasizes trade-offs.",
        "Ask what each structure leaves out. Structure is a choice, and every choice hides something.",
      ],
    },
  ],

  workedExample: {
    title: "Naming the structure of a community article",
    passage: {
      id: "ts-example-heat",
      title: "Cooling the Block",
      type: "Informational",
      attribution: "Original passage — BEOC Academic Bridge",
      body: [
        "Summers in dense city neighborhoods run measurably hotter than in surrounding areas. Dark roofs, paved lots, and narrow streets absorb heat during the day and release it slowly at night, so temperatures never fully reset. On the hottest weeks, residents in these blocks face higher health risks and higher electricity bills at the same time.",
        "Several cities have responded with a set of low-cost measures. Coating flat roofs with reflective white paint lowers indoor temperatures on the top floor by several degrees. Planting street trees provides shade over sidewalks and building faces. Converting a portion of asphalt lots to permeable surfaces reduces the heat those lots store.",
        "None of these measures is dramatic on its own. Taken together across enough blocks, they have measurably reduced nighttime temperatures in the neighborhoods where they were applied.",
      ],
      wordCount: 165,
    },
    question: "What is the overall structure of this passage?",
    steps: [
      {
        move: "Read paragraph 1 for the setup.",
        thinking:
          "It describes a condition that harms people — hotter blocks, health risks, higher bills. That reads like a problem being established.",
      },
      {
        move: "Check the signal words in paragraph 2.",
        thinking:
          "\"Several cities have responded\" is a solution signal. Three responses follow. This is not an author explaining consequences; it is an author presenting fixes.",
      },
      {
        move: "Rule out the near-miss structure.",
        thinking:
          "Paragraph 1 does contain cause and effect — dark surfaces absorb heat, so temperatures stay high. But that is one paragraph serving a larger shape. The passage as a whole moves from problem to response to result.",
      },
      {
        move: "Confirm with paragraph 3.",
        thinking:
          "It reports whether the solutions worked. Cause/effect passages end with consequences; problem/solution passages end with outcomes of a response. This is the second.",
      },
    ],
    answer:
      "Problem and solution. Paragraph 1 establishes the problem, paragraph 2 presents the responses, and paragraph 3 reports the result — with cause and effect used inside paragraph 1 as support.",
    takeaway:
      "Identify the structure of the whole passage, not the structure of one paragraph. A smaller pattern nested inside a larger one is the most common trap on these items.",
  },

  guided: {
    id: "ts-guided",
    title: "Try one with support",
    passages: [
      {
        id: "ts-guided-cert",
        title: "Two Routes to the Same Job",
        type: "Workplace",
        attribution: "Original passage — BEOC Academic Bridge",
        body: [
          "A person seeking work as a pharmacy technician can take two paths. A formal certificate program runs six to twelve months, costs money up front, and covers pharmacy law and calculations in a classroom. On-the-job training, by contrast, begins with a paid position and teaches the same material in practice, though it usually takes longer to reach certification and depends on finding an employer willing to train. Both routes end at the same national exam. Neither is faster in every case.",
        ],
        wordCount: 84,
      },
    ],
    questions: [
      {
        id: "ts-g1",
        type: "multiple-choice",
        question: "What is the structure of this paragraph?",
        passageId: "ts-guided-cert",
        choices: [
          "Chronology — it lists the steps to become a pharmacy technician in order",
          "Compare and contrast — it sets two routes side by side on the same measures",
          "Problem and solution — it identifies a shortage of pharmacy technicians",
          "Description — it defines what a pharmacy technician does",
        ],
        correctAnswer: 1,
        hint: "Count how many things are being discussed, and look for the signal phrase in the middle of the paragraph.",
        explanation:
          "Two options are examined on the same dimensions — time, cost, setting, and endpoint — and \"by contrast\" signals the comparison directly.",
        choiceRationales: [
          "The paragraph does mention duration, but it never puts steps in order. It weighs two options.",
          "Correct. Two routes, compared on matching criteria, with a contrast signal word.",
          "No problem is established and no shortage is mentioned.",
          "The job itself is never described; only the two routes into it are.",
        ],
        skill: "text-structure",
        difficulty: "Developing",
      },
    ],
  },

  practice: {
    id: "ts-practice",
    title: "Practice set — structure across two texts",
    intro:
      "Two short texts on one topic. Read both, name each structure, then answer.",
    passages: [
      {
        id: "ts-practice-a",
        title: "Text A: How the Line Got Longer",
        type: "History",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 150,
        body: [
          "In 2015 the city's vital records office served walk-in customers only. Wait times averaged under an hour.",
          "In 2018 the office added an online request system for birth certificates. Walk-in traffic dropped, and the office reassigned two of its six clerks to process online orders.",
          "In 2021, after a hiring freeze, the office lost two more clerks and did not replace them. Online requests continued to rise, but the remaining staff now handled both queues.",
          "By 2023, average walk-in waits had reached three hours, and online orders took eleven business days to fulfill.",
        ],
      },
      {
        id: "ts-practice-b",
        title: "Text B: Fixing the Backlog",
        type: "Informational",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 145,
        body: [
          "Long waits at the vital records office have become a serious obstacle for residents who need documents for a job, a lease, or a school enrollment.",
          "One response is to separate the two queues again by assigning dedicated staff to online orders, so that a surge in one channel does not slow the other.",
          "A second is to expand the documents available online. Every request that never becomes a walk-in visit removes a person from the counter line.",
          "A third, and the most expensive, is simply to restore the staffing the office had before the hiring freeze. Cities that have tried the first two measures without the third have reduced waits, but not eliminated them.",
        ],
      },
    ],
    questions: [
      {
        id: "ts-p1",
        type: "multiple-choice",
        question: "What is the structure of Text A?",
        passageId: "ts-practice-a",
        choices: [
          "Problem and solution",
          "Compare and contrast",
          "Chronology, used to trace a cause-and-effect chain",
          "Description",
        ],
        correctAnswer: 2,
        explanation:
          "Text A moves year by year — 2015, 2018, 2021, 2023 — and each step causes the next. That is a chronology carrying a cause-and-effect chain.",
        choiceRationales: [
          "Text A never proposes a response. It only traces how the situation developed.",
          "Nothing is set against anything else; there is one office across time.",
          "Correct. Dates order the passage, and each change produces the next condition.",
          "Description has no time order. Text A is organized entirely by date.",
        ],
        skill: "text-structure",
        difficulty: "TABE Ready",
      },
      {
        id: "ts-p2",
        type: "multiple-choice",
        question: "What is the structure of Text B?",
        passageId: "ts-practice-b",
        choices: [
          "Problem and solution",
          "Chronology",
          "Compare and contrast between two offices",
          "Cause and effect explaining why the backlog formed",
        ],
        correctAnswer: 0,
        explanation:
          "Paragraph 1 names the problem; the next three paragraphs each offer a response, marked by \"One response,\" \"A second,\" and \"A third.\"",
        choiceRationales: [
          "Correct. A problem followed by three proposed solutions.",
          "No dates or sequence appear. The three responses are options, not steps in order.",
          "Only one office is discussed. Other cities are mentioned once, as evidence.",
          "Text B assumes the cause is known; Text A is the one that explains it.",
        ],
        skill: "text-structure",
        difficulty: "TABE Ready",
      },
      {
        id: "ts-p3",
        type: "paired-text",
        question:
          "How does the difference in structure change what each text is able to do?",
        choices: [
          "Text A proves the backlog is unsolvable, while Text B proves it is easy to solve.",
          "Text A explains how the backlog developed, while Text B evaluates options for reducing it — so Text A supplies the cause that Text B's solutions have to address.",
          "Both texts are organized the same way, so neither adds anything the other lacks.",
          "Text A is opinion and Text B is fact.",
        ],
        correctAnswer: 1,
        explanation:
          "Structure determines usefulness. A chronology shows origins; a problem/solution weighs responses. Read together, Text A explains why Text B's third option is the one that addresses the actual cause.",
        choiceRationales: [
          "Neither text claims either thing. Text B's last sentence says partial measures help but do not eliminate the problem.",
          "Correct. It names both structures accurately and explains what each one makes possible.",
          "The two structures are clearly different — dates versus proposed responses.",
          "Both texts are informational. Neither is presented as the author's opinion.",
        ],
        skill: "text-structure",
        difficulty: "Challenge",
      },
    ],
  },

  challenge: {
    id: "ts-challenge",
    title: "Challenge — a passage with smaller structures nested inside",
    intro:
      "Read all five paragraphs before you name the structure. On this passage, the first paragraph alone will point you the wrong way.",
    passages: [
      {
        id: "ts-challenge-clock",
        title: "Clocking In",
        type: "Technology",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 342,
        body: [
          "For eleven years, workers at a regional food distribution warehouse recorded their hours on paper timesheets. A supervisor collected the sheets every Friday, and a payroll clerk typed them into the payroll system the following Monday. Last spring, the company replaced the paper with a time clock app that workers open on their phones at the start and end of each shift. The change was expected to settle the arguments about hours that surfaced nearly every pay period. It did not settle them. It moved them.",
          "The two systems differ first in who produces the record. On paper, the worker wrote down the hours, and a supervisor's signature confirmed them. With the app, the phone produces the record automatically, and no one signs anything. Paper made the worker the author of the timesheet; the app makes the worker its subject.",
          "The app is clearly better at arithmetic. Paper sheets arrived with smudged numbers, overnight shifts added incorrectly, and handwriting the payroll clerk had to guess at. Because the app calculates totals itself, those errors have nearly disappeared, and the clerk no longer spends Monday mornings calling workers to ask what a number was supposed to be.",
          "That same automation, however, has created disputes that paper never did. Whereas a forgotten entry on paper could be written in at the end of a shift and initialed by a supervisor, a forgotten tap in the app leaves a gap that takes a correction request and several days to fix. The app also records the moment a worker presses the button, not the moment the work begins. A worker who starts unloading a truck before reaching for the phone is unpaid for those minutes unless someone notices.",
          "Neither system, in other words, ends disagreements about hours. Paper produced errors of arithmetic, which were easy to spot and easy to argue about. The app produces errors of omission, which are harder to spot because the record looks complete. A warehouse choosing between the two is not choosing whether to have disputes. It is choosing which kind.",
        ],
      },
    ],
    questions: [
      {
        id: "ts-c1",
        type: "multiple-choice",
        question: "Which best describes the overall structure of the passage?",
        passageId: "ts-challenge-clock",
        choices: [
          "Chronology — it traces the warehouse's move from paper timesheets to an app, in the order events happened",
          "Problem and solution — it presents the disputes over hours and shows how the app solved them",
          "Compare and contrast — it sets two timekeeping systems side by side on the same points and concludes that each fails in a different way",
          "Cause and effect — it explains how the app caused the payroll clerk's workload to drop",
        ],
        correctAnswer: 2,
        explanation:
          "Paragraph 1 is a short timeline that sets up the change, but from paragraph 2 on, every paragraph weighs paper against the app: who creates the record, which is better at arithmetic, which creates new disputes. Paragraph 5 closes the comparison by naming how each system fails. That shape holds from the second paragraph to the last, so it is the structure of the whole.",
        choiceRationales: [
          "This describes paragraph 1 only. After the switch is introduced, no more events happen — the rest of the passage compares the two systems.",
          "Paragraph 1 raises this possibility and rejects it in the same breath: \"It did not settle them. It moved them.\" The passage never presents the app as the fix.",
          "Correct. Two systems, compared on matching points, with a conclusion that weighs both. This is the structure that organizes the whole passage.",
          "This describes one sentence in paragraph 3. It is a smaller pattern nested inside the comparison, not the shape of the passage.",
        ],
        skill: "text-structure",
        difficulty: "Challenge",
      },
      {
        id: "ts-c2",
        type: "multiple-choice",
        question: "How does paragraph 4 relate to paragraph 3?",
        passageId: "ts-challenge-clock",
        choices: [
          "It continues the timeline, describing what happened after the arithmetic errors disappeared.",
          "It presents a drawback of the app that balances the advantage described in paragraph 3.",
          "It proposes a solution to the arithmetic errors described in paragraph 3.",
          "It gives a second example of the same advantage described in paragraph 3.",
        ],
        correctAnswer: 1,
        explanation:
          "Paragraph 3 credits the app with ending arithmetic errors. Paragraph 4 opens with \"That same automation, however\" — a contrast signal — and shows the same feature creating new disputes. It is the other side of the comparison.",
        choiceRationales: [
          "No time order connects the two paragraphs. \"However\" signals a contrast, not a next step.",
          "Correct. The advantage in paragraph 3 and the drawback in paragraph 4 are two sides of the same feature.",
          "The arithmetic errors were already solved in paragraph 3. Paragraph 4 raises new problems rather than fixing old ones.",
          "\"However\" marks a turn. Paragraph 4 argues against the app, not for it.",
        ],
        skill: "text-structure",
        difficulty: "TABE Ready",
      },
      {
        id: "ts-c3",
        type: "multiple-select",
        question:
          "Which phrases from the passage signal its overall structure? Select all that apply.",
        passageId: "ts-challenge-clock",
        choices: [
          "\"For eleven years\" (paragraph 1)",
          "\"The two systems differ first in\" (paragraph 2)",
          "\"Because the app calculates totals itself\" (paragraph 3)",
          "\"Whereas a forgotten entry on paper\" (paragraph 4)",
          "\"Neither system, in other words\" (paragraph 5)",
        ],
        correctAnswer: [1, 3, 4],
        explanation:
          "Three phrases set paper and the app against each other — \"differ,\" \"whereas,\" and \"neither system\" all belong to the comparison family. The other two are real signal words, but they signal the smaller structures nested inside the passage.",
        choiceRationales: [
          "A chronology signal, but it belongs to the setup in paragraph 1. It does not organize the rest of the passage.",
          "Correct. \"Differ\" announces a comparison, and \"first\" tells you more points of comparison are coming.",
          "A cause-and-effect signal inside a single paragraph. It explains one advantage; it does not organize the whole passage.",
          "Correct. \"Whereas\" sets the two systems directly against each other within one sentence.",
          "Correct. \"Neither system\" only makes sense if two things have been compared, and it opens the concluding comparison.",
        ],
        skill: "text-structure",
        difficulty: "Challenge",
      },
      {
        id: "ts-c4",
        type: "short-response",
        question:
          "The author could have told this as a simple timeline: paper first, then the app. In three or four sentences, name the structure the author used instead, quote two signal words or phrases that show it, and explain what that structure lets the author say that a timeline would not.",
        passageId: "ts-challenge-clock",
        explanation:
          "A complete answer does three jobs: it names the structure, quotes signal words that prove it, and connects the structure to what the author is trying to say. The third job is the one most answers leave out — and it is the one that shows you understand why structure matters.",
        sampleResponse:
          "The passage is organized as compare and contrast. Phrases such as \"The two systems differ first in\" and \"Whereas a forgotten entry on paper\" set paper timesheets and the app side by side on the same points. A timeline would only show that the warehouse switched from one system to the other, which would make the app look like the solution. Comparing the two directly lets the author show that each system fails in its own way — paper through arithmetic errors, the app through missing entries — which is the point of the final paragraph.",
        skill: "text-structure",
        difficulty: "Challenge",
      },
    ],
  },

  masteryCheck: {
    id: "ts-mastery",
    title: "Mastery check",
    intro:
      "Two short passages on one topic, four items. If you miss one, the review below each answer will tell you which part of the lesson to revisit.",
    passages: [
      {
        id: "ts-mastery-p1",
        title: "Passage 1: Reporting an Injury at Work",
        type: "Workplace",
        attribution: "Original passage — BEOC Academic Bridge",
        wordCount: 84,
        body: [
          "If you are hurt on the job, the order in which you act matters. First, get medical attention right away if the injury is serious. Next, tell your supervisor as soon as possible, even if the injury seems minor. Then ask for your employer's injury report form and fill it out while the details are fresh. Finally, keep a copy of every form you sign and every note from a provider. Reporting deadlines vary by state, and a skipped step can delay a claim.",
        ],
      },
      {
        id: "ts-mastery-p2",
        title: "Passage 2: Why Small Injuries Go Unreported",
        type: "Workplace",
        attribution: "Original passage — BEOC Academic Bridge",
        wordCount: 87,
        body: [
          "Many minor workplace injuries are never reported, and the reasons are rarely careless ones. Because a sore back or a twisted wrist seems small, workers expect it to heal on its own. Some worry that reporting an injury will make them look unreliable, especially in a new job. As a result, the injury goes unrecorded. When the strain turns out to be more serious weeks later, there is no report tying it to the job, and a claim that would have been simple becomes difficult to prove.",
        ],
      },
    ],
    questions: [
      {
        id: "ts-m1",
        type: "multiple-choice",
        question:
          "In Passage 1, the words First, Next, Then, and Finally signal which structure?",
        passageId: "ts-mastery-p1",
        choices: [
          "Chronology / sequence",
          "Compare and contrast",
          "Cause and effect",
          "Description",
        ],
        correctAnswer: 0,
        explanation:
          "First, next, then, and finally are the core sequence signal words. Four of them from one family settles the structure. If you missed this, revisit the signal-word table at the top of the lesson.",
        choiceRationales: [
          "Correct. Four sequence signals, and the steps are meant to be followed in order.",
          "Nothing is compared. There is one process, described step by step.",
          "Cause-and-effect signals such as because or as a result do not organize this passage.",
          "Description has no required order. This passage says the order itself matters.",
        ],
        skill: "text-structure",
        difficulty: "Foundation",
      },
      {
        id: "ts-m2",
        type: "multiple-choice",
        question: "What is the structure of Passage 2?",
        passageId: "ts-mastery-p2",
        choices: [
          "Problem and solution — it identifies unreported injuries and explains how to fix the problem",
          "Cause and effect — it explains why injuries go unreported and what happens as a result",
          "Chronology — it lists the steps for reporting an injury in order",
          "Compare and contrast — it compares minor injuries with serious ones",
        ],
        correctAnswer: 1,
        explanation:
          "\"Because\" and \"as a result\" are cause-and-effect signals, and the passage ends on a consequence — a claim that becomes hard to prove. No one does anything about the problem. If you chose problem and solution, revisit the test tip in the lesson: if no one responds to the problem, it is cause and effect.",
        choiceRationales: [
          "The passage names a problem, but it never proposes a fix. It ends on a consequence, not a response.",
          "Correct. Reasons (causes) lead to an unrecorded injury and a weaker claim (effects).",
          "Passage 2 contains no steps. Passage 1 is the one that lists them.",
          "Minor and serious injuries are never set side by side. The strain that \"turns out to be more serious\" is an effect, not a point of comparison.",
        ],
        skill: "text-structure",
        difficulty: "Developing",
      },
      {
        id: "ts-m3",
        type: "multiple-choice",
        question:
          "Why does the author of Passage 1 most likely use a sequence structure?",
        passageId: "ts-mastery-p1",
        choices: [
          "To tell the story of one worker's injury in the order it happened",
          "Because the steps work best in a particular order, and the passage is written to help the reader act",
          "To compare the reporting deadlines used in different states",
          "Because every workplace document is written as a sequence",
        ],
        correctAnswer: 1,
        explanation:
          "The first sentence states the reason outright: \"the order in which you act matters.\" The author wants the reader to do something, and sequence is the structure that fits instructions. If you missed this, revisit \"Structure follows purpose\" in the lesson.",
        choiceRationales: [
          "No single worker appears. The passage speaks to \"you,\" the reader, which is how instructions are written.",
          "Correct. Structure follows purpose: order matters here, so the author uses sequence.",
          "State deadlines are mentioned once, in the last sentence, and are not compared.",
          "This is outside knowledge, and it is not true. The answer has to come from this passage.",
        ],
        skill: "text-structure",
        difficulty: "TABE Ready",
      },
      {
        id: "ts-m4",
        type: "paired-text",
        question:
          "How does the difference in structure change what each passage is able to do?",
        choices: [
          "Passage 1 gives the steps to follow, while Passage 2 explains why workers often skip the step of reporting — so Passage 2 shows the cause behind the risk Passage 1 warns about.",
          "Both passages are organized as problem and solution, so they make the same point.",
          "Passage 1 explains why injuries go unreported, while Passage 2 lists the steps for reporting one.",
          "Passage 2 proves that the advice in Passage 1 does not work.",
        ],
        correctAnswer: 0,
        explanation:
          "Name each structure first: Passage 1 is sequence, Passage 2 is cause and effect. A sequence tells a reader what to do; a cause-and-effect passage explains why something happens. Read together, Passage 2 explains why the skipped step Passage 1 warns about is so common.",
        choiceRationales: [
          "Correct. It names what each structure does and explains how the two passages connect.",
          "Neither passage is problem and solution. Passage 1 gives steps; Passage 2 explains causes and effects.",
          "This reverses the two passages. Passage 1 is the one with steps.",
          "Passage 2 never mentions the advice in Passage 1, and it does not argue that reporting fails. It explains why reporting does not happen.",
        ],
        skill: "text-structure",
        difficulty: "TABE Ready",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Text Structure questions",
      detail: "Signal-word tables and the cause/effect versus problem/solution decision.",
      href: "/eng0300/tabe",
    },
    {
      label: "Practice Center — Text Structure sets",
      detail: "Every Text Structure set in one place, from the guided question through the challenge.",
      href: "/eng0300/practice?skill=text-structure",
    },
  ],
};
