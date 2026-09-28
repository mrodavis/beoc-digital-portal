import { Skill } from "@/types/eng0300";

/** WEEK 2 — Inferences & Conclusions (fully populated). */
export const inferencesSkill: Skill = {
  id: "inferences",
  slug: "inferences",
  title: "Inferences & Conclusions",
  shortTitle: "Inferences",
  description:
    "Work out what a text means without saying it outright — and prove your conclusion with a line from the passage.",
  icon: "🔍",
  accent: "from-eng-teal-600 to-eng-teal-800",
  week: 2,
  status: "complete",
  estimatedMinutes: 45,

  outcomes: [
    "Make logical inferences and draw conclusions, supporting them with specific details from the text",
  ],

  objectives: [
    "Distinguish an inference from a guess",
    "Combine two or more details to reach a conclusion",
    "Point to the specific evidence that supports an inference",
    "Reject inferences that go further than the text allows",
  ],

  lesson: [
    {
      heading: "An inference is text plus what you already know",
      paragraphs: [
        "An inference is a conclusion you reach that the author never states directly. It is not a guess and it is not your opinion. It is what the details in the passage make true when you put them together with ordinary knowledge about how the world works.",
        "Every inference on a reading test has to survive one question: which words in the passage make this true? If you cannot answer that, it is a guess.",
      ],
      table: {
        columns: ["The text says", "You already know", "Reasonable inference"],
        rows: [
          [
            "She checked the balance twice before adding the item to her cart.",
            "People check a balance twice when money is tight.",
            "She is watching her spending closely.",
          ],
          [
            "The supervisor scheduled the meeting for 7 a.m. and brought printed copies for everyone.",
            "Early meetings with printed materials are usually planned in advance and treated as important.",
            "The supervisor considered the meeting important and prepared for it.",
          ],
        ],
      },
    },
    {
      heading: "How far is too far",
      paragraphs: [
        "The most common wrong answer on an inference question is one that is reasonable in life but unsupported by this passage. Test writers build those on purpose.",
      ],
      bullets: [
        "Supported — every part of the statement traces back to something in the text.",
        "Overreach — the direction is right, but the statement is stronger than the evidence (\"always,\" \"never,\" \"everyone\").",
        "Outside knowledge — true in the world, but this passage never raised it.",
        "Contradiction — the passage actually says the opposite somewhere you skimmed.",
      ],
      callout: {
        label: "Test tip",
        text: "Before choosing, finish this sentence out loud: \"I know this because the passage says ______.\" If you cannot fill the blank with actual words from the text, choose a different answer.",
      },
    },
    {
      heading: "Conclusions across a longer text",
      paragraphs: [
        "In longer passages, the evidence for a conclusion is rarely in one place. You collect a detail from the opening, another from the middle, and a third near the end, and the conclusion is what all three point to at once.",
        "When a question asks you to draw a conclusion about the whole text, expect to use at least two widely separated details.",
      ],
    },
  ],

  workedExample: {
    title: "Reading between the lines of a workplace notice",
    passage: {
      id: "inf-example-notice",
      title: "Notice on the Break Room Door",
      type: "Workplace",
      attribution: "Original passage — BEOC Academic Bridge",
      body: [
        "Marcus had worked at the distribution center for three years, and in that time the break room bulletin board had held the same three items: a fire evacuation map, a faded safety poster, and the schedule.",
        "On Monday there were four. A single sheet, printed that morning, listed the phone number for an employee assistance line, the hours of a new on-site counselor, and a sentence in bold: \"Conversations are confidential and are not shared with your supervisor.\"",
        "By Wednesday, someone had taped a second copy inside the men's restroom, above the sink. By Friday there was one in the stairwell. Nobody announced them. Nobody mentioned them on the floor. But when Marcus walked past the stairwell copy on Friday afternoon, the strip of tear-off phone numbers along the bottom was already half gone.",
      ],
      wordCount: 134,
    },
    question: "What can you conclude about the workers at the distribution center?",
    steps: [
      {
        move: "Collect the details that seem deliberate.",
        thinking:
          "Copies appear in a restroom and a stairwell — private places, not the bulletin board. Nobody discusses them out loud. Half the tear-off numbers are gone by Friday.",
      },
      {
        move: "Ask what those details have in common.",
        thinking:
          "All three point the same direction: the resource is being used, but privately. The placement in unobserved locations and the silence on the floor both suggest workers do not want to be seen taking it.",
      },
      {
        move: "Add ordinary knowledge, carefully.",
        thinking:
          "People generally avoid being seen seeking help when they think it could be held against them. The bolded confidentiality line suggests someone anticipated exactly that concern.",
      },
      {
        move: "Test the conclusion against the text.",
        thinking:
          "I can point to the restroom copy, the stairwell copy, the silence, and the missing tear-offs. Four separate details support it, so it is an inference, not a guess.",
      },
      {
        move: "Reject the overreach.",
        thinking:
          "I cannot conclude that workers distrust management, that anyone was in crisis, or that the program was successful. The passage supports interest paired with a desire for privacy — nothing stronger.",
      },
    ],
    answer:
      "Workers are interested in the counseling service but want to use it privately, without their interest being observed by coworkers or supervisors.",
    takeaway:
      "The strongest inferences rest on several small details pointing the same way. Notice what the author chose to show you rather than tell you.",
  },

  guided: {
    id: "inf-guided",
    title: "Try one with support",
    passages: [
      {
        id: "inf-guided-shift",
        title: "The Third Application",
        type: "Workplace",
        attribution: "Original passage — BEOC Academic Bridge",
        body: [
          "Dana had filled out the internal transfer form twice before. Both times she had listed her supervisor as a reference, and both times the position had gone to someone from outside the department. This time she left that line blank and wrote in the name of the operations manager she had covered a shift for in March. She read the form over three times before she clicked submit.",
        ],
        wordCount: 68,
      },
    ],
    questions: [
      {
        id: "inf-g1",
        type: "multiple-choice",
        question: "What can most reasonably be inferred about Dana?",
        passageId: "inf-guided-shift",
        choices: [
          "She is unqualified for the position she is applying for.",
          "She believes her supervisor's reference may not have helped her previous applications.",
          "She has decided to leave the company if she is not promoted.",
          "The operations manager promised to recommend her.",
        ],
        correctAnswer: 1,
        hint: "Ask what changed between this application and the last two, and why someone would make that particular change.",
        explanation:
          "The one thing Dana deliberately changed was the reference. Two applications with her supervisor's name failed; on the third she replaced it. That change is the evidence.",
        choiceRationales: [
          "Not supported. The passage says the jobs went to outside candidates, which says nothing about her qualifications.",
          "Correct. The pattern of two failures followed by a deliberate substitution supports this and nothing stronger.",
          "Overreach. Nothing in the passage mentions leaving.",
          "Outside the text. We know she covered a shift for him, not that he promised anything.",
        ],
        skill: "inferences",
        difficulty: "Developing",
      },
    ],
  },

  practice: {
    id: "inf-practice",
    title: "Practice set — reading a situation closely",
    passages: [
      {
        id: "inf-practice-store",
        title: "Closing Time",
        type: "Informational",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 175,
        body: [
          "The hardware store on Fulton Street had been open for forty-one years. Its window display changed with the seasons — snow shovels in November, box fans in June — and for most of those years the owner, Ruth, changed it herself on a Sunday morning before anyone was around to see her do it.",
          "In March, the display stopped changing. The box fans stayed up through July. A hand-lettered sign appeared on the door listing new hours: closed Mondays, closed by four on Saturdays. Regular customers noticed that the shelves toward the back had gaps that did not fill in.",
          "In August a second sign went up, printed this time, thanking the neighborhood for forty-one years. Two days later a commercial real estate listing appeared in the window. Ruth kept the register open through September, selling what was left at prices she wrote on masking tape by hand.",
          "On the last afternoon, a line formed that reached past the laundromat next door. Several people in it had not bought anything at the store in years.",
        ],
      },
    ],
    questions: [
      {
        id: "inf-p1",
        type: "multiple-choice",
        question: "What can be inferred from the details in paragraph 2?",
        passageId: "inf-practice-store",
        choices: [
          "Ruth had lost interest in her customers.",
          "The store's business had declined and Ruth was reducing what she could keep up with.",
          "A larger hardware chain had opened nearby.",
          "Ruth had become too ill to work.",
        ],
        correctAnswer: 1,
        explanation:
          "Three details in paragraph 2 point the same way: the display stops changing, hours are cut, and stock is not replaced. Together they indicate a business winding down.",
        choiceRationales: [
          "Contradicted by the ending, where customers line up and Ruth stays open to sell through her stock.",
          "Correct. The unchanged display, reduced hours, and unfilled shelves are three separate signs of decline.",
          "Outside knowledge. Competition is a plausible cause in life, but this passage never mentions another store.",
          "Overreach. Illness is one possible explanation, but the passage gives no evidence for it over any other.",
        ],
        skill: "inferences",
        difficulty: "TABE Ready",
      },
      {
        id: "inf-p2",
        type: "evidence-selection",
        question:
          "Which detail best supports the conclusion that the store mattered to the neighborhood beyond what it sold?",
        passageId: "inf-practice-store",
        choices: [
          "The store had been open for forty-one years.",
          "The window display changed with the seasons.",
          "Several people in the final line had not bought anything at the store in years.",
          "Ruth wrote closing prices on masking tape by hand.",
        ],
        correctAnswer: 2,
        explanation:
          "People who had not shopped there in years still came to stand in line. That separates the store's meaning from its function as a place to buy things — which is exactly the claim.",
        choiceRationales: [
          "Establishes longevity, which is background rather than evidence about meaning.",
          "Shows Ruth's care for the store, not the neighborhood's attachment to it.",
          "Correct. Non-customers showing up is evidence of value that is not commercial.",
          "A poignant detail about Ruth, but it says nothing about the neighborhood.",
        ],
        skill: "inferences",
        difficulty: "TABE Ready",
      },
      {
        id: "inf-p3",
        type: "multiple-choice",
        question:
          "Which conclusion goes FURTHER than the passage supports?",
        passageId: "inf-practice-store",
        choices: [
          "Ruth was closing the store deliberately rather than suddenly.",
          "The closing was noticed by people in the neighborhood.",
          "Ruth was forced out of business by rising rent on Fulton Street.",
          "The store's stock was reduced in its final months.",
        ],
        correctAnswer: 2,
        explanation:
          "Rising rent is a common cause of small-business closures, but this passage never mentions rent. That makes it outside knowledge, not an inference.",
        choiceRationales: [
          "Supported. The gradual sequence from March through September shows a planned wind-down.",
          "Supported. The line past the laundromat is direct evidence.",
          "Correct — this is the unsupported one. The passage gives no financial cause at all.",
          "Supported. Paragraph 2 states that gaps in the shelves did not fill in.",
        ],
        skill: "inferences",
        difficulty: "Challenge",
      },
    ],
  },

  challenge: {
    id: "inf-challenge",
    title: "Challenge — a historical record that never states its conclusions",
    intro:
      "This passage is built from an old record book that never explains itself, so every answer here is an inference. Before you choose, find the words in the passage that make your answer true — and treat items 1 and 2 as a pair, the way the TABE presents them.",
    passages: [
      {
        id: "inf-challenge-ledger",
        title: "The Evening Ledger",
        type: "History",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 340,
        body: [
          "In the autumn of 1909, the grammar school in a small river mill town began opening its doors at night. No newspaper covered the evening classes, and the school board's minutes mention them only once, to approve the cost of lamp oil. What survives is a ledger kept by the teacher, a young woman who taught children in the same room during the day. Nearly everything known about the school comes from its pages.",
          "Classes began at half past seven, an hour and a half after the mill whistle ended the day shift. In the first week the teacher entered thirty-eight names. Beside each one she wrote an age, and the ages ran from fourteen to fifty-two. Beside many names she added a second spelling, copied carefully from a letter the student carried, in an alphabet she noted she could not read.",
          "The lessons changed quickly. The teacher's October entries mention a primer, the same one her daytime pupils used, and by November they stop mentioning it. Later entries list what took its place: a newspaper, a train timetable, the notice posted at the mill gate, and pay envelopes that students brought from home. In December she moved arithmetic from the end of the evening to the beginning. Beside the change she wrote, \"Fewer heads down.\"",
          "Attendance is harder to read. In weeks when the teacher noted that the mill was running long days, fewer than half the names are checked; in April, when the mill ran short weeks, she borrowed chairs from the room next door. A small group of eleven names is checked on nearly every night of the year, including a week in February when snow closed the day school.",
          "In the spring, the teacher added a column to the ledger with no heading. Beside some names she wrote short phrases: \"signed own name at bank,\" \"read letter from sister aloud,\" \"wrote to mill office about wages owed.\" The school's second year opened with seventy names. The ledger for that year is kept in a different hand.",
        ],
      },
    ],
    questions: [
      {
        id: "inf-c1",
        type: "multiple-choice",
        question:
          "It can be inferred from the passage that in weeks when many seats were empty, the main reason was —",
        passageId: "inf-challenge-ledger",
        choices: [
          "that the lessons had become too difficult for many students",
          "the weather on class nights",
          "the demands of work at the mill, not a lack of interest in the classes",
          "that the youngest students had stopped coming",
        ],
        correctAnswer: 2,
        explanation:
          "Paragraph 4 never says why seats were empty, but it lines attendance up against the mill's schedule: fewer than half the names checked in weeks of long days, and not enough chairs in the short weeks of April. When work eased, the room filled. That pattern points to work, not to a loss of interest.",
        choiceRationales: [
          "Contradicted. If hard lessons were driving students away, the room would empty as the year went on. Instead, in April the teacher had to borrow chairs.",
          "Not supported. The only weather in the passage is a snowstorm, and it is mentioned to show who came anyway — not who stayed home.",
          "Correct. Empty seats line up with long days at the mill, and extra chairs line up with short weeks. The passage never states the reason, but the pattern supports it.",
          "Not supported. The ledger records ages, but the passage never connects age to attendance. This choice borrows a real detail to build a conclusion the text never makes.",
        ],
        skill: "inferences",
        difficulty: "Challenge",
      },
      {
        id: "inf-c2",
        type: "evidence-selection",
        question:
          "Which sentence from the passage best supports the answer to the previous question?",
        passageId: "inf-challenge-ledger",
        choices: [
          "\"Classes began at half past seven, an hour and a half after the mill whistle ended the day shift.\"",
          "\"In weeks when the teacher noted that the mill was running long days, fewer than half the names are checked; in April, when the mill ran short weeks, she borrowed chairs from the room next door.\"",
          "\"Beside the change she wrote, 'Fewer heads down.'\"",
          "\"A small group of eleven names is checked on nearly every night of the year, including a week in February when snow closed the day school.\"",
        ],
        correctAnswer: 1,
        explanation:
          "The answer to the previous question has two halves: work kept students away, and their interest did not fade. Only one sentence shows both — empty seats when the mill ran long days, and not enough chairs when it ran short weeks. The other sentences are real details, but each supports a different point.",
        choiceRationales: [
          "Shows how little time students had between work and class, but that was true every night. It cannot explain why attendance changed from one week to the next.",
          "Correct. It sets attendance against the mill's schedule in both directions: heavy work, empty seats; lighter work, not enough chairs.",
          "Close, because it suggests students were tired. But it describes students who were in the room, not the ones who stayed away, so it cannot explain the empty seats.",
          "About attendance, but about the wrong students. It describes the most faithful group, not the weeks when many seats were empty.",
        ],
        skill: "inferences",
        difficulty: "TABE Ready",
      },
      {
        id: "inf-c3",
        type: "multiple-choice",
        question: "Which conclusion is NOT supported by the passage?",
        passageId: "inf-challenge-ledger",
        choices: [
          "Interest in the evening school grew after its first year.",
          "The teacher judged students' progress partly by what they could do outside the classroom.",
          "Someone other than the first teacher kept the records in the school's second year.",
          "Students never missed class unless the mill was running long days.",
        ],
        correctAnswer: 3,
        explanation:
          "The strong word in this choice, never, turns a pattern into a rule with no exceptions. Paragraph 4 shows a pattern — fewer students in weeks of long days, more in short weeks — but the ledger does not give the reason for any single absence. The direction is right; the strength is not.",
        choiceRationales: [
          "Supported. The teacher entered thirty-eight names in the first week; the second year opened with seventy.",
          "Supported. The column with no heading records tasks like \"signed own name at bank\" — things done outside the classroom, not lessons finished inside it.",
          "Supported. A ledger \"kept in a different hand\" was written in someone else's handwriting. The passage does not say why, and this conclusion does not claim to know.",
          "Correct — this is the unsupported one. The pattern in paragraph 4 is real, but this choice turns it into a rule with no exceptions. The ledger gives no reason for any single absence, so it cannot rule out anything else that kept a student home.",
        ],
        skill: "inferences",
        difficulty: "Challenge",
      },
      {
        id: "inf-c4",
        type: "short-response",
        question:
          "The passage never says what the students wanted from the evening school. In three or four sentences, state one conclusion about what they wanted, and support it with details from at least two different paragraphs.",
        passageId: "inf-challenge-ledger",
        explanation:
          "A complete answer does three jobs: it states a conclusion the passage never says outright, it supports that conclusion with details from at least two different paragraphs, and it stays within what those details can prove. The third job is where most answers slip — claiming, for example, that every student learned to read, which the ledger never shows.",
        sampleResponse:
          "The students wanted reading and writing they could use in their everyday lives, not school lessons for their own sake. In paragraph 3, the teacher stopped using the primer her daytime pupils used and taught from a newspaper, a train timetable, the notice at the mill gate, and the students' own pay envelopes. In paragraph 5, the column with no heading records tasks such as \"signed own name at bank\" and \"read letter from sister aloud,\" which happen outside the classroom. Neither paragraph states this outright, but together they show that success at the school was measured by what students could do at the bank, at home, and at work.",
        skill: "inferences",
        difficulty: "Challenge",
      },
    ],
  },

  masteryCheck: {
    id: "inf-mastery",
    title: "Mastery check",
    intro:
      "One short passage, four items. If you miss one, the review below each answer will tell you which part of the lesson to revisit.",
    passages: [
      {
        id: "inf-mastery-p1",
        title: "The Early Shift",
        type: "Health",
        attribution: "Original passage — BEOC Academic Bridge",
        wordCount: 97,
        body: [
          "Denise started a new job in September with a shift that began at 5 a.m. For the first two weeks she yawned through her morning break, and twice she fell asleep on the bus home and missed her stop. In the third week she moved her phone charger from her nightstand to the kitchen counter. She began laying out her work clothes before dinner instead of after the late news. By October she was reading on the bus again. Her sister, who had worked early shifts for years, noticed the charger on the counter and only smiled.",
        ],
      },
    ],
    questions: [
      {
        id: "inf-m1",
        type: "multiple-choice",
        question:
          "What does the passage suggest about Denise during her first two weeks at the new job?",
        passageId: "inf-mastery-p1",
        choices: [
          "She did not know which bus stop was hers.",
          "She was very tired.",
          "She was unhappy with her new job.",
          "She was bored at work.",
        ],
        correctAnswer: 1,
        explanation:
          "The passage never says Denise was tired. It shows you instead: she yawned through her break and twice fell asleep on the bus home. Add what you already know about people who do those things, and the inference is plain. If you missed this, revisit \"An inference is text plus what you already know\" in the lesson.",
        choiceRationales: [
          "Misreads the detail. She missed her stop because she fell asleep, not because she did not know where to get off.",
          "Correct. Yawning through her break and falling asleep on the bus are both signs of a tired person.",
          "Not supported. The passage never says how Denise felt about the job itself.",
          "Yawning alone could mean boredom, but falling asleep on the bus home happened away from work. Only tiredness explains both details.",
        ],
        skill: "inferences",
        difficulty: "Foundation",
      },
      {
        id: "inf-m2",
        type: "multiple-choice",
        question:
          "Why did Denise most likely move her phone charger and start laying out her clothes before dinner?",
        passageId: "inf-mastery-p1",
        choices: [
          "Her sister told her to make those changes.",
          "Her phone charger was broken.",
          "She wanted more time to watch the late news.",
          "She was trying to get to sleep earlier.",
        ],
        correctAnswer: 3,
        explanation:
          "The passage never explains either change. One at a time, each could mean several things. Together — the phone moved away from her bed, the evening chore moved earlier — they point to one goal: an earlier night. If you missed this, revisit \"Conclusions across a longer text\" in the lesson. The same move works in a short passage: collect the details, then ask what they point to together.",
        choiceRationales: [
          "Not supported. Her sister appears only in the last sentence, noticing the charger after it had been moved. Nothing says she gave advice.",
          "Not supported. She moved the charger; she did not replace it. Nothing in the passage suggests it was broken.",
          "Contradicted. She now lays out her clothes before dinner \"instead of after the late news\" — an earlier evening, not a later one.",
          "Correct. Both changes move her evening earlier and her phone farther from her bed. Together they point to one goal.",
        ],
        skill: "inferences",
        difficulty: "Developing",
      },
      {
        id: "inf-m3",
        type: "evidence-selection",
        question:
          "Which sentence best supports the conclusion that Denise's changes helped?",
        passageId: "inf-mastery-p1",
        choices: [
          "\"By October she was reading on the bus again.\"",
          "\"In the third week she moved her phone charger from her nightstand to the kitchen counter.\"",
          "\"For the first two weeks she yawned through her morning break, and twice she fell asleep on the bus home and missed her stop.\"",
          "\"Her sister, who had worked early shifts for years, noticed the charger on the counter and only smiled.\"",
        ],
        correctAnswer: 0,
        explanation:
          "To show that the changes helped, the evidence has to come from after the changes. By October, the bus ride where Denise once fell asleep has become a place where she reads. If you chose the charger sentence, you picked the change instead of its result. Revisit \"An inference is text plus what you already know\" and its central question: which words in the passage make this true?",
        choiceRationales: [
          "Correct. The same bus ride where she used to fall asleep is now where she reads. That before-and-after contrast is the evidence.",
          "This is one of the changes, not proof that it worked. A change is not evidence of its own result.",
          "This shows the problem before the changes. It supports the idea that she was tired, not that she improved.",
          "Shows that her sister noticed the change. It says nothing about whether Denise was sleeping better.",
        ],
        skill: "inferences",
        difficulty: "TABE Ready",
      },
      {
        id: "inf-m4",
        type: "multiple-choice",
        question: "Which conclusion goes FURTHER than the passage supports?",
        passageId: "inf-mastery-p1",
        choices: [
          "Denise's early start time made her first weeks difficult.",
          "Denise changed her evening routine on purpose.",
          "Moving her phone out of the bedroom was the only change that helped Denise.",
          "By October, Denise was less tired on her way home from work.",
        ],
        correctAnswer: 2,
        explanation:
          "The strong word in this choice, only, turns a reasonable idea into a claim the passage cannot back up. Denise made two changes, and the passage never says which one made the difference. If you missed this, revisit \"How far is too far\" in the lesson. This is an overreach: the right direction, stated too strongly.",
        choiceRationales: [
          "Supported. The 5 a.m. shift, the yawning, and the missed stops all point to it.",
          "Supported. Moving the charger and laying out her clothes earlier are deliberate choices, not accidents.",
          "Correct — this is the one that goes too far. The passage names two changes and never says which one mattered, so this choice claims more than the evidence allows.",
          "Supported. The bus ride where she once fell asleep is, by October, where she reads.",
        ],
        skill: "inferences",
        difficulty: "TABE Ready",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Inference questions",
      detail: "The wording TABE uses for inference items and how to test a conclusion against the passage.",
      href: "/eng0300/tabe",
    },
    {
      label: "Practice Center — Inferences sets",
      detail: "Every Inferences set in one place, from the guided question through the challenge.",
      href: "/eng0300/practice?skill=inferences",
    },
  ],
};
