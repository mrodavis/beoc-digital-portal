import { Skill } from "@/types/eng0300";

/** WEEK 7 — Visual & Data Integration, plus integrating across sources (starter content). */
export const visualDataSkill: Skill = {
  id: "visual-data",
  slug: "visual-data",
  title: "Visual & Data Integration",
  shortTitle: "Visual & Data",
  description:
    "Read charts, tables, and diagrams accurately, connect them to the text they accompany, and combine information from more than one source.",
  icon: "📊",
  accent: "from-eng-gold-500 to-eng-teal-700",
  week: 7,
  status: "starter",
  estimatedMinutes: 35,

  outcomes: [
    "Interpret information presented visually, orally, or quantitatively (e.g., in charts, graphs, diagrams, or timelines) and connect it to the related text",
    "Integrate information from multiple texts or sources on the same topic",
  ],

  objectives: [
    "Read a chart's title, labels, and units before interpreting any value",
    "State what a figure shows without going beyond it",
    "Connect a figure to the claim in the text it accompanies",
    "Combine a text and a figure to answer a question neither answers alone",
  ],

  lesson: [
    {
      heading: "Read the frame before you read the numbers",
      paragraphs: [
        "Most mistakes on chart questions happen before any thinking about the data, because the reader jumped to the tallest bar without checking what is being measured.",
      ],
      bullets: [
        "Title — what is this figure about?",
        "Axis labels — what does each direction represent?",
        "Units — dollars, percent, minutes, thousands? A percent chart and a count chart answer different questions.",
        "Time span — what period is covered, and does the text discuss the same period?",
        "Source note — where did the data come from, and does the text cite the same source?",
      ],
      callout: {
        label: "Test tip",
        text: "Say out loud what the figure shows in one sentence before you look at the question. If you cannot, you are not ready to answer, no matter how clear the bars look.",
      },
    },
    {
      heading: "The figure and the text do different jobs",
      paragraphs: [
        "A figure and its surrounding text are not two copies of the same information. The text usually makes a claim; the figure usually supplies the measurement behind it. Questions turn on the relationship between them.",
      ],
      table: {
        columns: ["Question type", "What it asks", "Where to look"],
        rows: [
          ["Read a value", "What was the figure for a particular category?", "The figure alone"],
          ["Compare values", "Which is larger, and by how much?", "The figure alone"],
          ["Connect", "Which detail in the chart supports the author's point?", "Text first, then figure"],
          [
            "Integrate",
            "What can be concluded from the chart and the text together?",
            "Both — the answer is in neither alone",
          ],
        ],
      },
    },
    {
      heading: "What a figure cannot tell you",
      paragraphs: [
        "Charts invite conclusions they do not support. A chart shows what happened; it rarely shows why, and it never shows what will happen next unless the text says so.",
      ],
      bullets: [
        "A chart shows association, not cause. Two lines rising together do not establish that one caused the other.",
        "A chart covering three years does not establish a long-term trend.",
        "A chart of percentages hides the size of the group. Fifty percent of six people is three.",
        "If the answer choice contains information not in the figure and not in the text, it is wrong regardless of how sensible it sounds.",
      ],
    },
    {
      heading: "Integrating more than one source",
      paragraphs: [
        "The final outcome of this course asks you to combine sources. When two sources address one topic, work through them in order: what does each say, where do they agree, where do they differ, and what can you conclude only by holding both at once?",
      ],
      bullets: [
        "Check whether the sources measure the same thing over the same period. Often they do not, and that is the answer.",
        "Agreement between two independent sources strengthens a conclusion.",
        "A disagreement is information. Ask what would explain it before deciding one source is wrong.",
      ],
    },
  ],

  workedExample: {
    title: "Connecting a chart to the argument beside it",
    passage: {
      id: "vd-example-commute",
      title: "The Cost of Getting There",
      type: "Data / Charts",
      attribution: "Original passage and figure — BEOC Academic Bridge",
      body: [
        "When a training program reports its completion rate, the number is usually explained in terms of academics: the material was too hard, or students arrived underprepared. Program staff who track the reasons students actually give tell a different story.",
        "In an exit survey at one workforce program, students who withdrew were asked to identify the primary reason. Academic difficulty appeared, but it was not the largest category. Transportation and schedule conflicts together accounted for more than half of all withdrawals.",
        "The distinction matters because it points to different fixes. A program that believes its students are underprepared invests in tutoring. A program that knows its students cannot reliably get to class invests in bus passes, evening sections, and attendance policies that survive a missed shift.",
      ],
      figure: {
        kind: "bar",
        title: "Primary reason given for withdrawing, one workforce program exit survey",
        summary:
          "Bar chart of withdrawal reasons. Transportation is the largest category at 31 percent, followed by schedule conflict with work at 24 percent, child care at 18 percent, academic difficulty at 16 percent, and other reasons at 11 percent.",
        columns: ["Reason given", "Share of withdrawals"],
        unit: "%",
        rows: [
          { label: "Transportation", values: [31] },
          { label: "Schedule conflict with work", values: [24] },
          { label: "Child care", values: [18] },
          { label: "Academic difficulty", values: [16] },
          { label: "Other", values: [11] },
        ],
        sourceNote:
          "Illustrative figure created for instruction. Not drawn from a published dataset.",
      },
      wordCount: 190,
    },
    question:
      "Which detail in the figure most directly supports the author's point in paragraph 2?",
    steps: [
      {
        move: "Read the frame first.",
        thinking:
          "Title: primary reason for withdrawing, one program's exit survey. Units: share of withdrawals, in percent. One program, one survey — so conclusions cannot extend past that.",
      },
      {
        move: "Restate the author's point in paragraph 2.",
        thinking:
          "Two claims: academic difficulty is not the largest category, and transportation plus schedule conflicts together exceed half.",
      },
      {
        move: "Check the first claim against the figure.",
        thinking:
          "Academic difficulty is 16 percent. Transportation is 31 and schedule conflict is 24, both larger. The claim holds.",
      },
      {
        move: "Check the second claim by combining bars.",
        thinking:
          "31 plus 24 is 55 percent. That is more than half, so \"more than half\" is exact rather than loose. This combination is the strongest support.",
      },
      {
        move: "Guard against the overreach.",
        thinking:
          "I cannot conclude that transportation causes withdrawals at other programs, or that bus passes would fix it. The figure reports reasons students gave, at one program.",
      },
    ],
    answer:
      "Transportation at 31 percent and schedule conflict at 24 percent sum to 55 percent — more than half of all withdrawals — while academic difficulty accounts for 16 percent. That combination supports both halves of the author's claim.",
    takeaway:
      "When text says two categories together exceed some threshold, add the bars and check. That arithmetic is the support the question is asking about.",
  },

  guided: {
    id: "vd-guided",
    title: "Try one with support",
    passages: [
      {
        id: "vd-guided-broadband",
        title: "Who Is Online at Home",
        type: "Data / Charts",
        attribution: "Original passage and figure — BEOC Academic Bridge",
        body: [
          "Applications for jobs, benefits, and housing have moved online faster than home internet access has spread. A household without a home connection is not cut off entirely — phones fill part of the gap — but filling out a long form, uploading a document, or joining a video appointment on a phone is meaningfully harder than doing it on a computer with a fixed connection.",
        ],
        figure: {
          kind: "bar",
          title: "Households with a home broadband subscription, by annual household income",
          summary:
            "Bar chart showing broadband subscription rates rising with income: 57 percent under 25,000 dollars, 74 percent for 25,000 to 49,999, 87 percent for 50,000 to 99,999, and 95 percent for 100,000 dollars and above.",
          columns: ["Household income", "Has home broadband"],
          unit: "%",
          rows: [
            { label: "Under $25,000", values: [57] },
            { label: "$25,000–$49,999", values: [74] },
            { label: "$50,000–$99,999", values: [87] },
            { label: "$100,000 and above", values: [95] },
          ],
          sourceNote:
            "Illustrative figure created for instruction. Not drawn from a published dataset.",
        },
        wordCount: 70,
      },
    ],
    questions: [
      {
        id: "vd-g1",
        type: "chart-data",
        question:
          "Based on the figure, how much higher is the broadband subscription rate for households earning $100,000 and above than for households earning under $25,000?",
        passageId: "vd-guided-broadband",
        choices: ["24 percentage points", "38 percentage points", "57 percentage points", "95 percentage points"],
        correctAnswer: 1,
        hint: "Find both bars, then subtract the smaller from the larger. Do not stop at reading one bar.",
        explanation:
          "The highest income group is at 95 percent and the lowest at 57 percent. 95 − 57 = 38 percentage points.",
        choiceRationales: [
          "This is the gap between the two middle categories, not between the highest and lowest.",
          "Correct. 95 minus 57 is 38.",
          "This is the value of the lowest bar, not a difference between two bars.",
          "This is the value of the highest bar, not a difference.",
        ],
        skill: "visual-data",
        difficulty: "Foundation",
      },
    ],
  },

  practice: {
    id: "vd-practice",
    title: "Practice set — reading a figure with its text",
    passages: [
      {
        id: "vd-practice-shifts",
        title: "When the Clinic Is Open",
        type: "Health",
        attribution: "Original passage and figure — BEOC Academic Bridge",
        numbered: true,
        wordCount: 205,
        body: [
          "A neighborhood clinic tracked how often its appointment slots went unused across a full year, sorted by the time of day the appointment had been scheduled.",
          "Staff had expected the worst performance in the earliest slots, on the assumption that patients would struggle to arrive before work. The data did not support that expectation. The 8 a.m. slots were among the better-attended hours. Midday performed worst by a wide margin.",
          "The explanation the clinic settled on was that patients who could come at 8 a.m. were arranging their day around the visit deliberately, while a midday appointment competed directly with a work shift that most patients could not leave without losing pay.",
          "The clinic responded by shifting several midday slots into an evening block. It has not yet published results for the evening hours.",
        ],
        figure: {
          kind: "bar",
          title: "Share of appointment slots unused, by scheduled time of day (one clinic, one year)",
          summary:
            "Bar chart of unused appointment slots by time: 8 a.m. 12 percent, 10 a.m. 17 percent, noon 29 percent, 2 p.m. 26 percent, and 4 p.m. 19 percent.",
          columns: ["Scheduled time", "Slots unused"],
          unit: "%",
          rows: [
            { label: "8:00 a.m.", values: [12] },
            { label: "10:00 a.m.", values: [17] },
            { label: "12:00 p.m.", values: [29] },
            { label: "2:00 p.m.", values: [26] },
            { label: "4:00 p.m.", values: [19] },
          ],
          sourceNote:
            "Illustrative figure created for instruction. Not drawn from a published dataset.",
        },
      },
    ],
    questions: [
      {
        id: "vd-p1",
        type: "chart-data",
        question: "According to the figure, which time slot went unused most often?",
        passageId: "vd-practice-shifts",
        choices: ["8:00 a.m.", "10:00 a.m.", "12:00 p.m.", "4:00 p.m."],
        correctAnswer: 2,
        explanation:
          "The noon bar is the tallest at 29 percent, just above 2 p.m. at 26 percent.",
        choiceRationales: [
          "The lowest bar at 12 percent — the best-attended slot, not the worst.",
          "17 percent, the second-lowest.",
          "Correct. 29 percent, the tallest bar in the figure.",
          "19 percent, in the middle of the range.",
        ],
        skill: "visual-data",
        difficulty: "Foundation",
      },
      {
        id: "vd-p2",
        type: "chart-data",
        question:
          "Which statement about the figure supports the author's point in paragraph 2 that staff expectations were wrong?",
        passageId: "vd-practice-shifts",
        choices: [
          "The 4 p.m. slot had a higher unused rate than the 8 a.m. slot.",
          "The 8 a.m. slot had the lowest unused rate of any time shown, while the two midday slots were highest.",
          "Every slot had some unused appointments.",
          "The unused rate declined between noon and 4 p.m.",
        ],
        correctAnswer: 1,
        explanation:
          "Staff expected the earliest slots to be worst. The figure shows 8 a.m. best at 12 percent and midday worst at 29 and 26 percent — the reverse of the expectation.",
        choiceRationales: [
          "True from the figure, but it does not address the expectation about early slots being worst.",
          "Correct. It contrasts exactly the hours the expectation was about.",
          "True and uninformative. It says nothing about which hours performed worse.",
          "True, but the decline after noon is not what the staff expectation concerned.",
        ],
        skill: "visual-data",
        difficulty: "TABE Ready",
      },
      {
        id: "vd-p3",
        type: "multiple-choice",
        question:
          "Which conclusion is NOT supported by the passage and the figure together?",
        passageId: "vd-practice-shifts",
        choices: [
          "Midday appointments at this clinic went unused more often than early-morning appointments.",
          "Moving midday slots to the evening has reduced the clinic's unused-slot rate.",
          "The clinic's staff expectation about early appointments was not borne out by its own data.",
          "The clinic attributed midday no-shows to conflicts with work shifts.",
        ],
        correctAnswer: 1,
        explanation:
          "Paragraph 4 says the clinic made the change but has not published results for the evening block. The outcome is unknown, so no conclusion about it is supported.",
        choiceRationales: [
          "Directly supported by the figure — 29 and 26 percent versus 12 percent.",
          "Correct — this is the unsupported one. The passage explicitly says results are not yet available.",
          "Supported by paragraph 2 read against the figure.",
          "Supported by paragraph 3, which gives the clinic's explanation.",
        ],
        skill: "visual-data",
        difficulty: "Challenge",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Chart and Data questions",
      detail: "Reading the frame, combining categories, and avoiding conclusions a figure cannot support.",
      href: "/eng0300/tabe",
    },
  ],
};
