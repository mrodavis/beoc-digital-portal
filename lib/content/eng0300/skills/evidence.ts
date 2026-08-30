import { Skill } from "@/types/eng0300";

/** WEEK 6 — Evidence & Argument Quality (starter content). */
export const evidenceSkill: Skill = {
  id: "evidence",
  slug: "evidence",
  title: "Evidence & Arguments",
  shortTitle: "Evidence",
  description:
    "Separate a claim from the reasons behind it, match evidence to the point it supports, and judge whether an argument is actually holding up.",
  icon: "⚖️",
  accent: "from-eng-navy-800 to-eng-teal-700",
  week: 6,
  status: "starter",
  estimatedMinutes: 35,

  outcomes: [
    "Explain how an author uses reasons and evidence to support a point, and evaluate whether that evidence is sufficient",
  ],

  objectives: [
    "Identify the claim, the reasons, and the evidence in an argument",
    "Match a specific piece of evidence to the specific claim it supports",
    "Judge whether evidence is relevant, sufficient, and representative",
    "Name common weaknesses in an argument",
  ],

  lesson: [
    {
      heading: "Claim, reason, evidence",
      paragraphs: [
        "An argument has three layers, and questions about evidence usually turn on telling them apart.",
      ],
      table: {
        columns: ["Layer", "Question it answers", "Example"],
        rows: [
          ["Claim", "What does the author want me to accept?", "The city should extend clinic hours into the evening."],
          ["Reason", "Why should I accept it?", "Because many patients cannot leave work during the day."],
          [
            "Evidence",
            "How does the author know?",
            "A clinic survey found that 62% of missed appointments were scheduled between 9 a.m. and 3 p.m.",
          ],
        ],
      },
      bullets: [
        "The claim is often in the first or last paragraph.",
        "Reasons frequently begin with because, since, or the reason is.",
        "Evidence is the specific material: numbers, studies, examples, quotations, expert statements.",
      ],
    },
    {
      heading: "Three tests for evidence",
      paragraphs: [
        "Once you have located the evidence, you still have to judge it. Three questions do most of the work, and TABE items are usually built on one of them.",
      ],
      bullets: [
        "Relevant — does this evidence actually bear on the claim, or on a nearby claim the author did not make?",
        "Sufficient — is there enough of it? One dramatic story rarely supports a claim about a whole population.",
        "Representative — does the evidence describe a typical case, or an unusual one chosen because it is striking?",
      ],
      callout: {
        label: "Test tip",
        text: "When asked which evidence best supports a claim, restate the claim in your own words first. Distractors are usually true statements from the passage that support a slightly different claim.",
      },
    },
    {
      heading: "Common weaknesses to name",
      table: {
        columns: ["Weakness", "What it looks like"],
        rows: [
          ["Too small a sample", "A conclusion about all workers drawn from one workplace."],
          ["Anecdote in place of data", "One person's experience treated as proof of a general pattern."],
          [
            "Irrelevant support",
            "Evidence that is true and interesting but does not address the claim being made.",
          ],
          [
            "Correlation treated as cause",
            "Two things happened together, so the author says one caused the other.",
          ],
          [
            "Ignoring the obvious objection",
            "The author never addresses the strongest reason a reader might disagree.",
          ],
        ],
      },
      paragraphs: [
        "Naming a weakness is not the same as saying the claim is false. An argument can reach a correct conclusion on insufficient evidence. The question on a reading test is whether the author supported the claim, not whether you agree with it.",
      ],
    },
  ],

  workedExample: {
    title: "Evaluating support in a workplace argument",
    passage: {
      id: "ev-example-fourday",
      title: "The Case for a Four-Day Week",
      type: "Argument",
      attribution: "Original passage — BEOC Academic Bridge",
      numbered: true,
      body: [
        "Employers should move to a four-day workweek without reducing pay.",
        "The strongest reason is retention. Replacing a trained employee costs an employer substantially more than keeping one, and surveys consistently find schedule flexibility ranking among the top reasons workers give for staying in a job or leaving it.",
        "A second reason is output. In several published trials, companies that shortened the week reported that productivity held steady or improved. Employees reported using the extra day for the errands, appointments, and family obligations that otherwise leak into working hours.",
        "My own former manager switched our team to four days and said afterward that she would never go back. Everyone on that team was happier.",
        "Critics raise the obvious objection: some work cannot be compressed. A hospital ward, a bus route, and a restaurant kitchen all require coverage during fixed hours, and a shorter week for those workers means hiring more of them, not rearranging the same hours.",
      ],
      wordCount: 195,
    },
    question:
      "Which of the author's reasons is best supported, and which is weakest?",
    steps: [
      {
        move: "Locate the claim.",
        thinking:
          "Paragraph 1, stated outright: employers should move to a four-day week without cutting pay. Everything after is support.",
      },
      {
        move: "Sort the support into reasons.",
        thinking:
          "Retention (paragraph 2), output (paragraph 3), a personal example (paragraph 4). Paragraph 5 raises an objection rather than supporting the claim.",
      },
      {
        move: "Test paragraph 3 for sufficiency and relevance.",
        thinking:
          "It cites several published trials, gives the result, and explains a mechanism — the extra day absorbs errands that otherwise eat working hours. Multiple sources, directly on the claim. This is the strongest support.",
      },
      {
        move: "Test paragraph 4.",
        thinking:
          "One manager, one team, and \"everyone was happier\" with nothing to verify it. This is anecdote standing in for data. It is the weakest support, even though it is the most vivid.",
      },
      {
        move: "Notice what paragraph 5 does for the argument.",
        thinking:
          "The author states the objection fairly and does not answer it. That is honest, but it leaves a real gap: the claim says employers, and the objection shows an entire category of employers the argument does not cover.",
      },
    ],
    answer:
      "The output reason in paragraph 3 is best supported, because it rests on several published trials and offers a mechanism. The personal example in paragraph 4 is weakest, because a single team treated as proof is anecdote rather than evidence. The unanswered objection in paragraph 5 also limits the claim, since it identifies workplaces the argument does not address.",
    takeaway:
      "The most memorable paragraph is often the weakest one. Vivid detail is not the same as sufficient evidence.",
  },

  guided: {
    id: "ev-guided",
    title: "Try one with support",
    passages: [
      {
        id: "ev-guided-fees",
        title: "Overdraft Fees",
        type: "Argument",
        attribution: "Original passage — BEOC Academic Bridge",
        body: [
          "Overdraft fees should be capped by regulation. Banking data has repeatedly shown that a small share of account holders pay the large majority of all overdraft fees collected, and that this group is concentrated among customers with the lowest average balances. A fee designed as a deterrent has become a recurring charge falling on the customers least able to absorb it. My cousin once paid four overdraft fees in a single week, which shows how quickly they add up.",
        ],
        wordCount: 82,
      },
    ],
    questions: [
      {
        id: "ev-g1",
        type: "multiple-choice",
        question:
          "Which sentence provides the strongest support for the author's claim?",
        passageId: "ev-guided-fees",
        choices: [
          "Overdraft fees should be capped by regulation.",
          "Banking data has repeatedly shown that a small share of account holders pay the large majority of all overdraft fees collected.",
          "A fee designed as a deterrent has become a recurring charge.",
          "My cousin once paid four overdraft fees in a single week.",
        ],
        correctAnswer: 1,
        hint: "One of these sentences is the claim itself, one is an interpretation, and one is a single story. Only one brings outside data.",
        explanation:
          "Support has to come from outside the claim. The banking data is the only sentence offering verifiable, repeated evidence about a pattern across many customers.",
        choiceRationales: [
          "This is the claim. A claim cannot support itself.",
          "Correct. Repeated data about a population is relevant, sufficient, and representative.",
          "An interpretation of the data rather than evidence in its own right.",
          "A single anecdote. It illustrates the problem vividly but proves nothing about the pattern.",
        ],
        skill: "evidence",
        difficulty: "Developing",
      },
    ],
  },

  practice: {
    id: "ev-practice",
    title: "Practice set — judging an argument",
    passages: [
      {
        id: "ev-practice-transit",
        title: "Free Fares",
        type: "Argument",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 250,
        body: [
          "The city should eliminate fares on its bus system.",
          "Fare collection is expensive in ways that are easy to overlook. Fare boxes must be maintained, revenue must be counted and transported, and fare enforcement requires staff. In some smaller systems, these costs consume a meaningful share of the revenue the fares bring in.",
          "Free fares also speed up service. Boarding is the slowest part of a bus route, and passengers who do not need to pay board through any door. One transit agency that removed fares on a downtown route reported that average trip times fell by roughly nine percent.",
          "Ridership rises as well. Every system that has tried free fares has seen ridership grow, in some cases dramatically.",
          "A friend of mine stopped driving entirely after her city made buses free, which shows that people will change their habits when the barrier is removed.",
          "None of this addresses the largest question, which is how the lost fare revenue would be replaced in a system where fares cover a substantial share of the operating budget.",
        ],
      },
    ],
    questions: [
      {
        id: "ev-p1",
        type: "multiple-choice",
        question: "What is the author's central claim?",
        passageId: "ev-practice-transit",
        choices: [
          "Fare collection costs more than most people realize.",
          "The city should eliminate fares on its bus system.",
          "Boarding is the slowest part of a bus route.",
          "Free fares increase ridership in every system that has tried them.",
        ],
        correctAnswer: 1,
        explanation:
          "Paragraph 1 states the claim in one sentence. Every paragraph that follows is a reason for it or a limitation on it.",
        choiceRationales: [
          "A reason offered in paragraph 2, not the claim.",
          "Correct. It is the position the rest of the passage argues for.",
          "A supporting detail inside the speed argument.",
          "A reason in paragraph 4 — and one whose support the passage never provides.",
        ],
        skill: "evidence",
        difficulty: "Foundation",
      },
      {
        id: "ev-p2",
        type: "evidence-selection",
        question:
          "Which piece of evidence most directly supports the claim that free fares make buses faster?",
        passageId: "ev-practice-transit",
        choices: [
          "Fare boxes must be maintained and revenue must be transported.",
          "One transit agency that removed fares on a downtown route reported that average trip times fell by roughly nine percent.",
          "Every system that has tried free fares has seen ridership grow.",
          "A friend stopped driving entirely after her city made buses free.",
        ],
        correctAnswer: 1,
        explanation:
          "The claim is about speed. Only this option reports a measured change in trip time after fares were removed.",
        choiceRationales: [
          "Supports the cost-of-collection reason, not the speed reason.",
          "Correct. A measured outcome on the exact variable the claim concerns.",
          "Ridership is a different outcome. More riders could in principle slow boarding, not speed it.",
          "An anecdote about one person's driving, unrelated to trip times.",
        ],
        skill: "evidence",
        difficulty: "TABE Ready",
      },
      {
        id: "ev-p3",
        type: "multiple-choice",
        question:
          "Which paragraph contains the WEAKEST support for the author's claim, and why?",
        passageId: "ev-practice-transit",
        choices: [
          "Paragraph 2, because the costs of fare collection are hard to measure",
          "Paragraph 4, because it makes a sweeping claim about every system with no evidence attached",
          "Paragraph 5, because a single friend's experience is treated as proof of a general pattern",
          "Paragraph 6, because it undermines the author's own argument",
        ],
        correctAnswer: 2,
        explanation:
          "Paragraph 5 is the clearest case of anecdote standing in for evidence: one person's behavior, presented with \"which shows,\" as though it established a general rule. Paragraph 4 is also weak — an unsupported \"every system\" claim — but paragraph 5 explicitly asks a single story to do the work of data.",
        choiceRationales: [
          "Paragraph 2 names specific, checkable costs. It is among the better-supported paragraphs.",
          "A genuine weakness — \"every system\" is a sweeping claim — but paragraph 5 is the weaker of the two, because it presents one anecdote as proof.",
          "Correct. \"Which shows\" asks one friend's experience to establish a pattern it cannot establish.",
          "Paragraph 6 acknowledges a limitation honestly. Naming an unanswered objection is a strength in an argument, not weak support.",
        ],
        skill: "evidence",
        difficulty: "Challenge",
      },
      {
        id: "ev-p4",
        type: "short-response",
        question:
          "The author admits in paragraph 6 that the funding question is unanswered. In two or three sentences, explain what evidence the author would need to add to make the argument sufficient.",
        passageId: "ev-practice-transit",
        explanation:
          "A sufficient argument has to address the strongest objection to it. Here that means showing where replacement revenue comes from, with figures rather than assurances.",
        sampleResponse:
          "The author would need evidence about how the lost fare revenue would be replaced — for example, figures showing what share of the operating budget fares actually cover, and a specific funding source that could cover the gap. Evidence from a comparable city that eliminated fares and sustained service afterward would also strengthen the case. Without that, the argument establishes benefits but never shows that the plan is affordable.",
        skill: "evidence",
        difficulty: "Challenge",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Evidence and Argument questions",
      detail: "How to match evidence to a claim and spot the near-miss choice.",
      href: "/eng0300/tabe",
    },
  ],
};
