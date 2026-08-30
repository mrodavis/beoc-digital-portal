import { Skill } from "@/types/eng0300";

/** WEEK 2 — Inferences & Conclusions (starter content). */
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
  status: "starter",
  estimatedMinutes: 30,

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
      wordCount: 165,
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
        wordCount: 71,
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
        wordCount: 245,
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

  resources: [
    {
      label: "TABE Prep: Inference questions",
      detail: "The wording TABE uses for inference items and how to test a conclusion against the passage.",
      href: "/eng0300/tabe",
    },
  ],
};
