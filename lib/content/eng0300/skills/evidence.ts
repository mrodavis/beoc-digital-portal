import { Skill } from "@/types/eng0300";

/** WEEK 6 — Evidence & Argument Quality (fully populated). */
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
  status: "complete",
  estimatedMinutes: 50,

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
      wordCount: 156,
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
        wordCount: 79,
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
        wordCount: 175,
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

  challenge: {
    id: "ev-challenge",
    title: "Challenge — an argument whose support is uneven",
    intro:
      "Every paragraph after the first offers support, but the support is not equally strong. For each question, restate the exact claim being supported before you look at the choices — several choices are true sentences that support a different point.",
    passages: [
      {
        id: "ev-challenge-lots",
        title: "Put the Empty Lots to Work",
        type: "Argument",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 346,
        body: [
          "Most older neighborhoods have one: a vacant lot behind a chain-link fence, owned by the city because the last owner stopped paying taxes. Some have sat empty for a decade. The city should lease these lots to neighborhood groups as community gardens, starting with every lot that has gone unsold for more than two years.",
          "The first reason is money. An empty lot is not free to own: the city pays crews to mow it, fix its fence, and haul away dumped mattresses and tires. Two years ago, a city pilot let volunteer groups plant gardens on twelve lots. According to the pilot's first-year report, crews were sent to those twelve lots 140 times in the year before the gardens opened and 9 times in the year after, because the gardeners now handle the mowing and cleanup themselves.",
          "Gardens also put fresh food on tables that need it. Loretta Banks, a home health aide with a pilot plot, grows enough tomatoes, peppers, and greens that she has not bought a vegetable from June through September. Multiply her summer across every vacant lot, and grocery bills would fall across the city.",
          "Finally, gardens bring neighbors together. A county survey found that residents who live within a ten-minute walk of a public park are more likely than other residents to say they trust their neighbors. A garden on the corner would do the same work for blocks that have no park at all.",
          "Some council members object that the lots should be kept ready for developers, since new housing would bring in property taxes that a garden never will. The concern is fair, and the pilot was built around it. Every pilot lease lets the city end it with sixty days' notice. When a builder bought one of the twelve lots last spring, the garden group harvested its last crop and cleared the lot before the deadline. A garden does not block a sale; it keeps the lot in use until a buyer comes. Until then, the city should let its neighbors put the empty lots to work.",
        ],
      },
    ],
    questions: [
      {
        id: "ev-c1",
        type: "multiple-choice",
        question: "What is the author's central claim?",
        passageId: "ev-challenge-lots",
        choices: [
          "Vacant lots cost the city money to mow, fence, and clean up.",
          "The city should lease its long-unsold vacant lots to neighborhood groups as community gardens.",
          "Community gardens can end grocery bills for the families who work them.",
          "The city should hold its vacant lots for developers who will build housing.",
        ],
        correctAnswer: 1,
        explanation:
          "The last sentence of paragraph 1 states the position: \"The city should lease these lots to neighborhood groups as community gardens, starting with every lot that has gone unsold for more than two years.\" Paragraphs 2 through 4 each give a reason for it, paragraph 5 answers an objection to it, and the final sentence restates it.",
        choiceRationales: [
          "A reason from paragraph 2. It explains why the author wants the change; it is not the change itself.",
          "Correct. It is the position that every other paragraph either supports or defends.",
          "An overstated version of the food reason in paragraph 3. It is support the author offers, not the position that support is for.",
          "This is the objection the author answers in paragraph 5 — the opposite of the author's position.",
        ],
        skill: "evidence",
        difficulty: "TABE Ready",
      },
      {
        id: "ev-c2",
        type: "evidence-selection",
        question:
          "Which sentence from the passage best supports the answer to the previous question?",
        passageId: "ev-challenge-lots",
        choices: [
          "Loretta Banks, a home health aide with a pilot plot, grows enough tomatoes, peppers, and greens that she has not bought a vegetable from June through September.",
          "Some council members object that the lots should be kept ready for developers, since new housing would bring in property taxes that a garden never will.",
          "According to the pilot's first-year report, crews were sent to those twelve lots 140 times in the year before the gardens opened and 9 times in the year after, because the gardeners now handle the mowing and cleanup themselves.",
          "Until then, the city should let its neighbors put the empty lots to work.",
        ],
        correctAnswer: 2,
        explanation:
          "Restate the answer you gave to the previous question: the city should turn its long-unsold lots into gardens. The best support is evidence about gardens on the city's own lots, with a named source and numbers you could check. The pilot report's before-and-after count of crew visits is the only choice that does all three, and it shows the change the author wants already working on twelve lots.",
        choiceRationales: [
          "The most vivid sentence in the passage, and that is the trap. It is one gardener's summer — an anecdote standing in for evidence — and it cannot show what gardens would do across the city.",
          "This sentence states the objection. It supports the opposite position, holding the lots for developers, not the author's claim.",
          "Correct. It names a source, gives before-and-after numbers, and describes gardens on the city's own lots, so it bears directly on the claim.",
          "This restates the claim in new words. A claim cannot support itself.",
        ],
        skill: "evidence",
        difficulty: "Challenge",
      },
      {
        id: "ev-c3",
        type: "multiple-select",
        question:
          "In paragraph 5, the author argues that a garden would not stop the city from selling a lot. Which TWO details provide the strongest support for that point? Select two.",
        passageId: "ev-challenge-lots",
        choices: [
          "\"Every pilot lease lets the city end it with sixty days' notice.\" (paragraph 5)",
          "\"crews were sent to those twelve lots 140 times in the year before the gardens opened and 9 times in the year after\" (paragraph 2)",
          "\"new housing would bring in property taxes that a garden never will\" (paragraph 5)",
          "\"When a builder bought one of the twelve lots last spring, the garden group harvested its last crop and cleared the lot before the deadline.\" (paragraph 5)",
          "\"she has not bought a vegetable from June through September\" (paragraph 3)",
        ],
        correctAnswer: [0, 3],
        explanation:
          "Restate the point first: a garden would not get in the way of a sale. Two details bear on exactly that — the lease term that lets the city take a lot back, and the one time a pilot lot was actually sold. The crew-visit numbers are the strongest evidence in the whole passage, but they support a different point, which is why they are the most tempting wrong answer.",
        choiceRationales: [
          "Correct. It shows the city keeps the power to take a lot back for a buyer on short notice.",
          "Strong evidence, but for a different point: it shows that gardens cut the city's cleanup costs. It says nothing about whether a lot can still be sold.",
          "This is part of the objection. It gives a reason to sell the lots, not a reason to believe a garden would allow a sale.",
          "Correct. It shows the lease term working in practice: a lot was sold, and the gardeners left on time.",
          "One gardener's harvest, offered for the food reason in paragraph 3. It has nothing to do with selling a lot.",
        ],
        skill: "evidence",
        difficulty: "Challenge",
      },
      {
        id: "ev-c4",
        type: "multiple-choice",
        question:
          "Which detail supports a claim slightly different from the one the author uses it to support?",
        passageId: "ev-challenge-lots",
        choices: [
          "The pilot report's count of crew visits to the twelve lots before and after the gardens opened",
          "Loretta Banks's summer harvest from her pilot plot",
          "The builder who bought one of the pilot lots last spring",
          "The county survey of residents who live near a public park",
        ],
        correctAnswer: 3,
        explanation:
          "Restate the claim in paragraph 4 first: gardens bring neighbors together. The survey is about parks, not gardens, so at most it supports a claim about parks — and even then it shows only that living near a park and trusting neighbors go together, not that one causes the other. The author closes the gap with an assumption, that a garden \"would do the same work,\" rather than with evidence.",
        choiceRationales: [
          "This supports exactly the point it is used for — that gardens save the city money. It is relevant, measured, and sourced.",
          "Weak support, but for the right claim: it really is about a garden producing food. Its problem is sufficiency — one gardener cannot show what would happen across the city — not relevance.",
          "This supports exactly the point it is used for — that a garden does not block a sale.",
          "Correct. The survey measures something about parks, and the author stretches it to cover gardens. It supports a nearby claim, about parks, that the author did not make.",
        ],
        skill: "evidence",
        difficulty: "Challenge",
      },
      {
        id: "ev-c5",
        type: "short-response",
        question:
          "Is the author's evidence sufficient to support the central claim? In three or four sentences, name the strongest support in the passage, name one reason whose support falls short and explain what is wrong with it, and give your overall judgment.",
        passageId: "ev-challenge-lots",
        explanation:
          "A complete answer does three jobs: it credits the support that holds up, names the specific weakness in the support that does not — an anecdote standing in for evidence, or evidence about a different claim — and reaches a judgment that fits the evidence. The strongest answers notice that the evidence supports a narrower claim than the one the author makes. Judging the evidence insufficient is not the same as calling the claim false; the question is only whether the author supported it.",
        sampleResponse:
          "The strongest support is the pilot's first-year report, which found that crew visits to the twelve garden lots fell from 140 to 9 in a year, and the author also answers the developer objection with the sixty-day lease term and a lot that was actually sold. The other two reasons fall short: the food reason rests on one gardener's summer, and the neighbor reason rests on a survey about parks rather than gardens. Even the best evidence covers only twelve lots over a single year. The evidence is sufficient for a narrower claim, that gardens save the city money without blocking sales, but not for the author's promise that gardens would lower grocery bills and build trust across the city.",
        skill: "evidence",
        difficulty: "Challenge",
      },
    ],
  },

  masteryCheck: {
    id: "ev-mastery",
    title: "Mastery check",
    intro:
      "One short argument, four items. If you miss one, the review below each answer will tell you which part of the lesson to revisit.",
    passages: [
      {
        id: "ev-mastery-vans",
        title: "Cameras for the Vans",
        type: "Workplace",
        attribution: "Original passage — BEOC Academic Bridge",
        wordCount: 108,
        body: [
          "The company should install backup cameras in every delivery van. Backing up is the riskiest part of a driver's shift. Drivers reverse into docks, alleys, and driveways many times a day, often with no one outside to guide them. The safety office's accident log shows that 15 of the 22 van accidents drivers reported last year happened while backing up. Repairs from those accidents averaged $2,100 each, according to the same log. Our parts supplier quotes about $300 to install a camera. Cameras are the right investment for this fleet, and the sooner we add them, the sooner we stop paying for the same accident again and again.",
        ],
      },
    ],
    questions: [
      {
        id: "ev-m1",
        type: "multiple-choice",
        question: "What is the author's claim?",
        passageId: "ev-mastery-vans",
        choices: [
          "The company should install backup cameras in every delivery van.",
          "Backing up is the riskiest part of a driver's shift.",
          "Most of the van accidents last year happened while backing up.",
          "Delivery drivers are careless when they back up.",
        ],
        correctAnswer: 0,
        explanation:
          "The claim is what the author wants you to accept. Here it is the first sentence, and everything after it — the risk of backing up, the accident log, the two prices — is there to support it. If you missed this, revisit \"Claim, reason, evidence\" in the lesson.",
        choiceRationales: [
          "Correct. It is the position the rest of the passage asks you to accept.",
          "A reason. It answers why you should accept the claim, not what the claim is.",
          "Evidence from the accident log. It shows how the author knows backing up is risky.",
          "Not in the passage. The author never faults the drivers; the problem described is that they often have no one outside to guide them.",
        ],
        skill: "evidence",
        difficulty: "Foundation",
      },
      {
        id: "ev-m2",
        type: "evidence-selection",
        question:
          "Which sentence from the passage is evidence, rather than the claim or a restatement of it?",
        passageId: "ev-mastery-vans",
        choices: [
          "Cameras are the right investment for this fleet, and the sooner we add them, the sooner we stop paying for the same accident again and again.",
          "Backing up is the riskiest part of a driver's shift.",
          "The company should install backup cameras in every delivery van.",
          "The safety office's accident log shows that 15 of the 22 van accidents drivers reported last year happened while backing up.",
        ],
        correctAnswer: 3,
        explanation:
          "Evidence answers the question of how the author knows. Only the accident log names a source and gives a count you could check. The first and last sentences state the claim, and the sentence about risk is a reason that the log then proves. If you missed this, revisit \"Claim, reason, evidence\" — evidence is the specific material behind a reason, not another way of saying the claim.",
        choiceRationales: [
          "A restatement of the claim in the last sentence. It sounds like a conclusion, but it adds no new support.",
          "A reason, not evidence. It tells you why to accept the claim; the accident log is what shows the author knows it is true.",
          "This is the claim itself. A claim cannot be its own evidence.",
          "Correct. It names a source and gives specific numbers.",
        ],
        skill: "evidence",
        difficulty: "Developing",
      },
      {
        id: "ev-m3",
        type: "multiple-choice",
        question:
          "The author includes the average repair cost and the price of a camera mainly to —",
        passageId: "ev-mastery-vans",
        choices: [
          "show that drivers have been careless with company vans",
          "show that preventing even a few backing accidents would more than pay for the cameras",
          "prove that cameras will prevent every backing accident",
          "explain why drivers often have no one outside to guide them",
        ],
        correctAnswer: 1,
        explanation:
          "The two prices turn the claim into a money decision: one $2,100 repair costs as much as seven cameras. The detail supports the cost side of the argument, not the safety side. If you missed this, revisit \"Claim, reason, evidence\" — each piece of evidence holds up a specific reason, and this one holds up the reason that cameras are worth what they cost.",
        choiceRationales: [
          "Not in the passage. The author never blames the drivers for the accidents.",
          "Correct. At these prices, a single prevented repair covers several cameras.",
          "Too strong. The prices show what an accident costs; nothing in the passage shows that cameras prevent every accident, or any particular number of them.",
          "The prices have nothing to do with guiding drivers. That detail belongs to the reason about risk.",
        ],
        skill: "evidence",
        difficulty: "TABE Ready",
      },
      {
        id: "ev-m4",
        type: "multiple-choice",
        question:
          "Which additional evidence would most strengthen the author's argument?",
        passageId: "ev-mastery-vans",
        choices: [
          "A driver's account of backing a van into a loading dock",
          "A list of the camera models the parts supplier sells, with their features",
          "Accident records from vans that already have cameras, showing whether backing accidents fell",
          "A count of how many times each driver backs up during a typical shift",
        ],
        correctAnswer: 2,
        explanation:
          "The passage proves that backing accidents are common and expensive, but it never shows that cameras reduce them — and the whole cost comparison depends on that link. Evidence from vans that already have cameras would fill the gap directly. If you missed this, revisit \"Three tests for evidence\": the evidence here is relevant, but it is not yet sufficient.",
        choiceRationales: [
          "A single story is anecdote, and it would only add to the proof that backing accidents happen — which the accident log already shows.",
          "Product features do not show whether cameras reduce accidents. This evidence is not relevant to the gap in the argument.",
          "Correct. It tests the link the argument assumes but never proves: that cameras actually prevent backing accidents.",
          "This would add detail to a reason that is already supported. The log shows that backing is where accidents happen; the missing piece is whether cameras help.",
        ],
        skill: "evidence",
        difficulty: "TABE Ready",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Evidence and Argument questions",
      detail: "How to match evidence to a claim and spot the near-miss choice.",
      href: "/eng0300/tabe",
    },
    {
      label: "Practice Center — Evidence sets",
      detail: "Every Evidence set in one place, from the guided question through the challenge.",
      href: "/eng0300/practice?skill=evidence",
    },
  ],
};
