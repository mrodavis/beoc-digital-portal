import { Skill } from "@/types/eng0300";

/** WEEK 4 — Text Structure & Organization (starter content). */
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
  status: "starter",
  estimatedMinutes: 35,

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

  resources: [
    {
      label: "TABE Prep: Text Structure questions",
      detail: "Signal-word tables and the cause/effect versus problem/solution decision.",
      href: "/eng0300/tabe",
    },
  ],
};
