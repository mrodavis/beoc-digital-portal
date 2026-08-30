import { Skill } from "@/types/eng0300";

/**
 * WEEK 1 — Main Ideas & Details (exemplar skill, fully populated).
 *
 * All passages below are original, written for BEOC Academic Bridge adult
 * learners. Nothing here is transcribed from the Scoreboost or TABE Mastery
 * workbooks; those are copyrighted and are used only to inform skill coverage
 * and question style. See docs/ENG0300_SOURCE_AUDIT.md.
 */
export const mainIdeasSkill: Skill = {
  id: "main-ideas",
  slug: "main-ideas",
  title: "Main Ideas & Details",
  shortTitle: "Main Ideas",
  description:
    "Find what a text is really saying, and identify the details that hold that idea up. Then say it back in your own words.",
  icon: "🎯",
  accent: "from-eng-navy-700 to-eng-navy-900",
  week: 1,
  status: "complete",
  estimatedMinutes: 45,

  outcomes: [
    "Identify the main idea of a text and explain how it is supported by key details, including in longer or denser passages",
    "Summarize a text and support the summary with specific details and examples, including quotations",
  ],

  objectives: [
    "Tell the difference between a topic, a main idea, and a supporting detail",
    "Locate a stated main idea and infer an unstated one",
    "Explain how specific details support the main idea",
    "Write a short summary that covers the whole passage without adding your own opinion",
  ],

  // ─────────────────────────────── LEARN ───────────────────────────────
  lesson: [
    {
      heading: "Topic, main idea, and detail are three different things",
      paragraphs: [
        "Readers often lose points on this skill not because the passage is hard, but because they answer a slightly different question than the one being asked. Keeping three ideas separate solves most of it.",
        "The topic is what the text is about, in a word or a phrase. The main idea is the point the author is making about that topic — a full sentence. A supporting detail is a fact, example, reason, or quotation that backs the main idea up.",
      ],
      table: {
        columns: ["Term", "What it is", "Example"],
        rows: [
          ["Topic", "A word or short phrase. No opinion, no claim.", "Employer tuition benefits"],
          [
            "Main idea",
            "A complete sentence stating the author's point about the topic.",
            "Employers pay for training because it costs less than replacing workers.",
          ],
          [
            "Supporting detail",
            "Evidence that holds the main idea up.",
            "Replacing an employee means advertising, interviewing, and months of ramp-up.",
          ],
        ],
      },
      callout: {
        label: "Watch for this",
        text: "A choice that names only the topic is the most common wrong answer on a main-idea question. It will feel right because it is not false — it is just incomplete.",
      },
    },
    {
      heading: "Some main ideas are stated. Some you have to build.",
      paragraphs: [
        "A stated main idea appears somewhere in the text as an actual sentence, most often in the first or last paragraph. When it is there, your job is to find it, not to write it.",
        "An implied main idea is not written anywhere. The author gives you a set of details and expects you to see what they add up to. To build one, ask: what single sentence would make all of these details belong together?",
      ],
      bullets: [
        "Check the first and last paragraph first — that is where a stated main idea usually sits.",
        "If no sentence covers the whole passage, the main idea is implied. Build it yourself before looking at the choices.",
        "A correct main idea must cover the whole passage — not just the paragraph you remember best.",
      ],
    },
    {
      heading: "The coverage test",
      paragraphs: [
        "When you are deciding between two answers that both look reasonable, run the coverage test. It resolves most main-idea questions in about fifteen seconds.",
      ],
      bullets: [
        "Too narrow — the choice is true, but it only covers one paragraph or one example. Reject it.",
        "Too broad — the choice goes further than the passage does, or covers a subject the passage never addresses. Reject it.",
        "Not in the text — the choice sounds sensible and matches what you already believe, but the passage never says it. Reject it.",
        "Just right — the choice covers the whole passage and nothing more. Keep it.",
      ],
      callout: {
        label: "Test tip",
        text: "Cover the answer choices with your hand, state the main idea in your own words first, then uncover the choices and look for the one closest to what you said. This keeps a well-written wrong answer from talking you out of a right one.",
      },
    },
    {
      heading: "Summarizing is main idea plus the details that carry it",
      paragraphs: [
        "A summary is a short, neutral restatement of a text in your own words. It is the same skill as finding the main idea, extended across the whole passage.",
        "A strong summary states the main idea first, then adds the two or three details that the main idea depends on. It leaves out examples that merely repeat a point already made, and it leaves out your reaction to the text.",
      ],
      bullets: [
        "Include: the main idea, the key reasons or steps, and the outcome or conclusion.",
        "Leave out: your opinion, minor examples, and anything the author did not say.",
        "Length: for a passage this size, two to four sentences.",
        "When a question asks you to support a summary with evidence, quote or point to a specific sentence rather than describing the passage in general terms.",
      ],
    },
  ],

  // ─────────────────────────────── SEE IT ───────────────────────────────
  workedExample: {
    title: "Finding an implied main idea in a workplace passage",
    passage: {
      id: "me-example-handoff",
      title: "Shift Change",
      type: "Workplace",
      attribution: "Original passage — BEOC Academic Bridge",
      body: [
        "At a community health center, the busiest ten minutes of the day are not during patient visits. They happen mid-afternoon, when the morning medical assistants hand off their patients to the afternoon team. For years, that handoff was informal. An assistant leaving for the day would mention whatever came to mind, and the incoming assistant would write it on a sticky note. Details went missing. A patient waiting on lab results might wait another day because no one passed along that the results had arrived.",
        "The clinic eventually replaced the sticky notes with a one-page handoff form. Every departing assistant now fills in four fields: which patients are still waiting on something, what they are waiting for, who is responsible, and what needs to happen next. The form takes about four minutes to complete.",
        "The change was not glamorous, and staff complained about it at first. But within six months, the number of follow-ups that fell through the cracks dropped sharply. The lesson was not that the staff had been careless. It was that a busy team needs a structure that does not depend on anyone's memory.",
      ],
      wordCount: 205,
    },
    question: "What is the main idea of this passage?",
    steps: [
      {
        move: "Name the topic first.",
        thinking:
          "The topic is the clinic's shift handoff. That is what the passage is about — but a topic is not yet a main idea, so I keep going.",
      },
      {
        move: "Look for a stated main idea in the first and last paragraph.",
        thinking:
          "The first paragraph describes the old system. The last paragraph ends with a sentence that sounds like a conclusion: a busy team needs a structure that does not depend on memory. That is a strong candidate.",
      },
      {
        move: "Check whether that sentence covers the whole passage.",
        thinking:
          "Paragraph 1 shows what happened without a structure. Paragraph 2 describes the structure. Paragraph 3 gives the result. Every paragraph supports that final sentence, so it covers all three.",
      },
      {
        move: "Sort the rest into supporting details.",
        thinking:
          "The sticky notes, the four fields, the four minutes, and the six-month drop are all details. Each one is true, but none of them covers the passage on its own. They are evidence, not the point.",
      },
      {
        move: "Reject the near-misses.",
        thinking:
          "\"The clinic's staff were careless\" is contradicted by the text. \"The form takes four minutes\" is too narrow — it is one detail. \"Medical assistants have busy jobs\" is true but too broad; the passage is not about workload in general.",
      },
    ],
    answer:
      "Replacing an informal handoff with a simple written form reduced missed follow-ups, showing that a busy team needs a reliable process rather than reliance on memory.",
    takeaway:
      "The main idea was in the last sentence, but it only counted as the main idea once every paragraph checked out as support for it. Find the candidate, then test its coverage.",
  },

  // ─────────────────────────────── TRY IT ───────────────────────────────
  guided: {
    id: "me-guided",
    title: "Try one with support",
    intro:
      "Read the paragraph, state the main idea in your own words, and then choose. A hint is available if you want it.",
    passages: [
      {
        id: "me-guided-tuition",
        title: "Tuition Benefits",
        type: "Workplace",
        attribution: "Original passage — BEOC Academic Bridge",
        body: [
          "Many workers assume tuition benefits are only for people pursuing a four-year degree. In practice, most employer tuition programs also cover short certificate programs, industry licenses, and single courses at a community college. Some cover exam fees. The real obstacle is usually paperwork rather than eligibility: these benefits often require approval before you enroll, not after. Workers who wait until the semester has started to ask about funding frequently lose it for that term.",
        ],
        wordCount: 78,
      },
    ],
    questions: [
      {
        id: "me-g1",
        type: "multiple-choice",
        question: "Which sentence best states the main idea of the paragraph?",
        passageId: "me-guided-tuition",
        choices: [
          "Employer tuition benefits cover exam fees.",
          "Tuition benefits are broader than most workers assume, but they usually must be approved before enrolling.",
          "Community colleges offer single courses that workers can take.",
          "Most workers are not interested in earning a four-year degree.",
        ],
        correctAnswer: 1,
        hint: "Two things are being said here: what the benefits cover, and what workers get wrong about timing. The main idea has to hold both.",
        explanation:
          "The paragraph makes two connected points — the benefits are wider than people think, and the approval has to come first. Choice B is the only option that covers both.",
        choiceRationales: [
          "Too narrow. Exam fees are one item in a list of what the benefits cover — a supporting detail, not the point.",
          "Correct. It covers the full paragraph: the scope of the benefit and the timing requirement that trips workers up.",
          "Too narrow, and it is background rather than the author's point. The paragraph is about the benefit, not about course catalogs.",
          "Not in the text. The paragraph says workers assume the benefit is limited to degree-seekers — it never says workers do not want degrees.",
        ],
        skill: "main-ideas",
        difficulty: "Developing",
      },
    ],
  },

  // ─────────────────────────────── PRACTICE ───────────────────────────────
  practice: {
    id: "me-practice",
    title: "Practice set — Why employers pay for training",
    intro:
      "Read the passage once for the overall point, then answer. Return to the numbered paragraphs whenever a question asks about a specific detail.",
    passages: [
      {
        id: "me-practice-training",
        title: "Why Employers Pay for Training",
        type: "Workplace",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 315,
        body: [
          "When a company offers to pay for an employee's training, it can look like generosity. Usually it is something more practical: arithmetic.",
          "Replacing an employee is expensive. An employer has to advertise the opening, review applications, interview candidates, and then absorb the weeks or months during which a new hire is still learning the job. Workforce studies have long placed the cost of replacing one employee somewhere between several thousand dollars and a substantial share of that person's annual salary, depending on the role. Training someone already on staff is usually cheaper, and that person already knows the company's systems, customers, and routines.",
          "There is a second reason, and it has less to do with cost. Employers frequently cannot find people with the exact skills they need. A medical office that installs a new records system does not need a new receptionist; it needs its current receptionist to learn the system. A warehouse that adds inventory software does not need a new stock clerk; it needs its clerks to read the dashboard. Paying for training closes that gap faster than hiring can.",
          "Employees gain something the employer does not always intend. A certificate earned on company time still belongs to the employee. It appears on a résumé, it transfers to another employer, and it often raises what that person can ask for in their next job — sometimes at a different company entirely.",
          "None of this makes tuition benefits charity, and none of it makes them a trap. It makes them a trade. The employer buys a skilled worker without running a hiring search. The worker gains a credential without paying tuition. Understanding the trade is what lets an employee use the benefit deliberately instead of accidentally.",
        ],
      },
    ],
    questions: [
      {
        id: "me-p1",
        type: "multiple-choice",
        question: "Which statement best expresses the main idea of the passage?",
        passageId: "me-practice-training",
        choices: [
          "Employers who pay for training are unusually generous to their workers.",
          "Employer-paid training is a practical exchange that benefits the company and the employee in different ways.",
          "Replacing an employee costs several thousand dollars.",
          "Workers should leave for a better job as soon as they finish a certificate.",
        ],
        correctAnswer: 1,
        explanation:
          "The passage builds toward paragraph 5, which names the arrangement a trade and explains what each side gets. That covers the cost argument, the skills-gap argument, and the employee's gain.",
        choiceRationales: [
          "Contradicted by the text. Paragraph 1 explicitly rejects generosity as the explanation and calls it arithmetic instead.",
          "Correct. It covers all five paragraphs — the employer's two reasons, the employee's gain, and the conclusion that it is a trade.",
          "Too narrow. This is one supporting detail inside paragraph 2, not the point of the passage.",
          "Not in the text. Paragraph 4 notes that a certificate transfers to another employer, but the author never advises anyone to leave.",
        ],
        skill: "main-ideas",
        difficulty: "TABE Ready",
      },
      {
        id: "me-p2",
        type: "multiple-choice",
        question:
          "According to paragraph 3, why does an employer sometimes train a current worker instead of hiring a new one?",
        passageId: "me-practice-training",
        choices: [
          "Current workers accept lower pay than new hires do.",
          "Hiring is not allowed while a company is installing new software.",
          "The employer often cannot find applicants who already have the specific skills the job requires.",
          "New hires take several months to learn a company's customers.",
        ],
        correctAnswer: 2,
        explanation:
          "Paragraph 3 states the reason directly: employers frequently cannot find people with the exact skills they need, so training closes the gap faster than hiring.",
        choiceRationales: [
          "Not in the text. The passage never compares the pay of current workers and new hires.",
          "Not in the text, and not reasonable. Nothing in the passage restricts hiring.",
          "Correct. This is the reason paragraph 3 gives, illustrated by the medical office and the warehouse.",
          "True, but it belongs to paragraph 2 and answers a different question. The question asks specifically about paragraph 3.",
        ],
        skill: "main-ideas",
        difficulty: "Developing",
      },
      {
        id: "me-p3",
        type: "evidence-selection",
        question:
          "Which sentence from the passage best supports the idea that training benefits the employee beyond their current job?",
        passageId: "me-practice-training",
        choices: [
          "\"Replacing an employee is expensive.\"",
          "\"Training someone already on staff is usually cheaper, and that person already knows the company's systems, customers, and routines.\"",
          "\"It appears on a résumé, it transfers to another employer, and it often raises what that person can ask for in their next job.\"",
          "\"The employer buys a skilled worker without running a hiring search.\"",
        ],
        correctAnswer: 2,
        explanation:
          "The claim is about value to the employee outside the current job. Only this sentence describes what the credential does elsewhere — on a résumé, with another employer, in the next job.",
        choiceRationales: [
          "Supports the employer's cost argument, not the employee's benefit.",
          "Describes why training is cheaper for the employer. The employee's knowledge is mentioned, but as a benefit to the company.",
          "Correct. Every part of this sentence describes value the employee carries beyond the current job.",
          "States what the employer gets from the trade, which is the opposite side of the claim.",
        ],
        skill: "main-ideas",
        difficulty: "TABE Ready",
      },
      {
        id: "me-p4",
        type: "multiple-select",
        question:
          "Select the TWO details the author uses to support the claim that replacing an employee is expensive.",
        passageId: "me-practice-training",
        choices: [
          "The employer must advertise, review applications, and interview candidates.",
          "A certificate earned on company time belongs to the employee.",
          "There is a period during which a new hire is still learning the job.",
          "A warehouse may add inventory software.",
        ],
        correctAnswer: [0, 2],
        explanation:
          "Paragraph 2 supports the cost claim with two things: the work of running a hiring search, and the ramp-up period before a new hire is productive.",
        choiceRationales: [
          "Correct. The hiring search itself is the first cost the author names.",
          "This supports the employee's gain in paragraph 4, not the cost of replacement.",
          "Correct. The weeks or months of learning are the second cost the author names.",
          "An example used in the skills-gap argument in paragraph 3, unrelated to replacement cost.",
        ],
        skill: "main-ideas",
        difficulty: "TABE Ready",
      },
      {
        id: "me-p5",
        type: "short-response",
        question:
          "In two or three sentences, summarize the passage. State the main idea first, then the reasons the author gives. Do not include your own opinion.",
        passageId: "me-practice-training",
        explanation:
          "A strong summary leads with the trade, names both of the employer's reasons, and names the employee's gain — without adding a judgment the author did not make.",
        sampleResponse:
          "Employer-paid training is best understood as a practical trade rather than generosity. Employers pay for it because replacing a worker is expensive and because they often cannot hire people who already have the specific skills they need. Employees gain a credential that belongs to them and can be used with a future employer.",
        skill: "main-ideas",
        difficulty: "TABE Ready",
      },
    ],
  },

  // ─────────────────────────────── CHALLENGE ───────────────────────────────
  challenge: {
    id: "me-challenge",
    title: "Challenge — a denser passage with an implied main idea",
    intro:
      "This passage never states its point in a single sentence. Build the main idea yourself before you look at the choices.",
    passages: [
      {
        id: "me-challenge-noshow",
        title: "The Quiet Cost of a Missed Appointment",
        type: "Health",
        attribution: "Original passage — BEOC Academic Bridge",
        numbered: true,
        wordCount: 330,
        body: [
          "A missed medical appointment is usually recorded as a single line in a scheduling system: no-show. The word suggests a choice. What clinics find when they ask patients directly is more complicated.",
          "When clinics survey patients who missed appointments, the reasons that surface most often are not indifference. They are transportation, work schedules, and child care. A patient who takes two buses to a clinic and cannot leave a shift without losing pay is not weighing whether their health matters. They are weighing which loss is survivable this week.",
          "The costs of a no-show do not fall on one party. The clinic loses a slot it cannot refill on short notice, which pushes the next available appointment further out for everyone else. The patient loses continuity of care; a condition that could have been managed in a fifteen-minute visit may resurface later in an emergency room, where treating it costs far more. The health system absorbs that difference.",
          "Clinics that have reduced their no-show rates rarely do it by penalizing patients. The measures that show results are dull and logistical: text-message reminders a few days ahead, evening and weekend hours, transportation assistance, and the ability to reschedule online rather than by calling during business hours — precisely the hours when many patients cannot call.",
          "The pattern is worth naming, because it repeats well beyond health care. When an institution treats a behavior as a personal failing, it tends to design solutions aimed at motivation. When it treats the same behavior as a logistical problem, it designs solutions aimed at access. In this case, the second approach is the one that has moved the numbers.",
        ],
      },
    ],
    questions: [
      {
        id: "me-c1",
        type: "multiple-choice",
        question: "Which statement best expresses the main idea of the passage?",
        passageId: "me-challenge-noshow",
        choices: [
          "Patients who miss medical appointments are not taking their health seriously.",
          "Emergency room care is more expensive than a routine clinic visit.",
          "Missed appointments are largely a logistical problem, and treating them that way reduces them more effectively than treating them as a personal failing.",
          "Clinics should send text-message reminders to every patient.",
        ],
        correctAnswer: 2,
        explanation:
          "No sentence states the main idea outright, so you have to build it. Paragraph 2 establishes the causes as logistical, paragraph 4 shows logistical fixes working, and paragraph 5 names the general principle. Choice C is the sentence all five paragraphs are supporting.",
        choiceRationales: [
          "Contradicted by the text. Paragraph 2 says directly that the reasons are not indifference.",
          "True and stated in paragraph 3, but far too narrow. It is one detail inside the shared-cost argument.",
          "Correct. It covers the causes, the shared costs, the interventions that work, and the closing principle.",
          "Too narrow. Text reminders are one item in a list of measures in paragraph 4, not the author's point.",
        ],
        skill: "main-ideas",
        difficulty: "Challenge",
      },
      {
        id: "me-c2",
        type: "evidence-selection",
        question:
          "Which detail best supports the idea that the costs of a missed appointment are shared rather than borne by the patient alone?",
        passageId: "me-challenge-noshow",
        choices: [
          "Patients cite transportation, work schedules, and child care as reasons for missing appointments.",
          "The clinic loses a slot it cannot refill, which pushes the next available appointment further out for everyone else.",
          "Some patients cannot call a clinic during business hours.",
          "A no-show is recorded as a single line in a scheduling system.",
        ],
        correctAnswer: 1,
        explanation:
          "The claim is that the cost is shared. This detail traces the cost outward from the patient to the clinic and then to every other patient waiting for an appointment.",
        choiceRationales: [
          "Explains why appointments are missed, not who absorbs the cost.",
          "Correct. It names a second party (the clinic) and a third (other patients), which is exactly what a shared cost means.",
          "Supports the argument for online rescheduling in paragraph 4, not the shared-cost claim.",
          "Background from paragraph 1 about how the event is recorded, not about its cost.",
        ],
        skill: "main-ideas",
        difficulty: "Challenge",
      },
      {
        id: "me-c3",
        type: "short-response",
        question:
          "Summarize the passage in three or four sentences. Include the author's explanation of why missed appointments happen and what actually reduces them.",
        passageId: "me-challenge-noshow",
        explanation:
          "A complete summary covers the causes, the shared costs, the measures that work, and the broader principle in the final paragraph — the part most summaries leave out.",
        sampleResponse:
          "Missed medical appointments are usually recorded as no-shows, but patients report that the causes are transportation, work schedules, and child care rather than indifference. The costs are shared: the clinic loses an appointment slot, the patient loses continuity of care, and the health system pays more when a manageable condition later becomes an emergency. Clinics reduce no-shows most successfully through logistical measures such as reminders, extended hours, transportation help, and online rescheduling. The author argues that treating the behavior as a logistical problem rather than a personal failing is what produces results.",
        skill: "main-ideas",
        difficulty: "Challenge",
      },
    ],
  },

  // ───────────────────────── MASTERY CHECK ─────────────────────────
  masteryCheck: {
    id: "me-mastery",
    title: "Mastery check",
    intro:
      "Four short items. If you miss one, the review below each answer will tell you which part of the lesson to revisit.",
    passages: [
      {
        id: "me-mastery-p1",
        title: "Overtime Rules",
        type: "Informational",
        attribution: "Original passage — BEOC Academic Bridge",
        body: [
          "Overtime rules are frequently misunderstood by the people they protect. Many workers believe overtime pay begins after eight hours in a day. Under federal law, the standard threshold is forty hours in a workweek, not eight hours in a day, although some states set additional daily rules. A worker who puts in twelve hours on Monday and six on each of the next three days has worked thirty hours and is generally owed no federal overtime. Knowing which rule applies where you live is the difference between noticing an underpayment and missing it.",
        ],
        wordCount: 96,
      },
    ],
    questions: [
      {
        id: "me-m1",
        type: "multiple-choice",
        question: "What is the topic of the passage?",
        passageId: "me-mastery-p1",
        choices: [
          "Overtime rules",
          "Federal law is confusing",
          "A worker who puts in twelve hours on Monday",
          "Workers should track their hours",
        ],
        correctAnswer: 0,
        explanation:
          "A topic is a short phrase naming what the text is about, with no claim attached. That is overtime rules.",
        choiceRationales: [
          "Correct. Short, neutral, and it names the subject of every sentence.",
          "This is a claim, not a topic — and the passage does not make it.",
          "This is a detail used as an example, not the subject of the text.",
          "This is advice. The passage implies something like it, but a topic is never advice.",
        ],
        skill: "main-ideas",
        difficulty: "Foundation",
      },
      {
        id: "me-m2",
        type: "multiple-choice",
        question: "Which sentence best states the main idea?",
        passageId: "me-mastery-p1",
        choices: [
          "Some states set daily overtime rules in addition to the federal rule.",
          "Overtime is commonly misunderstood, and knowing which rule applies to you is what makes an underpayment visible.",
          "A worker who works thirty hours in a week is owed no federal overtime.",
          "Federal law should be changed to use a daily threshold.",
        ],
        correctAnswer: 1,
        explanation:
          "The first sentence sets up the misunderstanding and the last sentence states why it matters. Choice B holds both ends of the paragraph together.",
        choiceRationales: [
          "True but too narrow — one clause inside one sentence.",
          "Correct. It covers the misunderstanding, the correction, and the consequence.",
          "Too narrow. This is the worked example, offered as support.",
          "Not in the text. The passage explains the law; it never argues for changing it.",
        ],
        skill: "main-ideas",
        difficulty: "Developing",
      },
      {
        id: "me-m3",
        type: "multiple-choice",
        question:
          "The example of the worker with twelve hours on Monday is included mainly to —",
        passageId: "me-mastery-p1",
        choices: [
          "show that long shifts are common in some industries",
          "argue that the federal threshold is unfair",
          "demonstrate how the weekly threshold works in a case where a daily rule would give a different result",
          "prove that most workers are underpaid",
        ],
        correctAnswer: 2,
        explanation:
          "The example exists to make the weekly-versus-daily distinction concrete: a twelve-hour day with only thirty weekly hours produces no federal overtime.",
        choiceRationales: [
          "The passage says nothing about which industries have long shifts.",
          "The passage explains the rule without judging it.",
          "Correct. That is precisely the confusion the example is chosen to clear up.",
          "Not in the text. No claim is made about how many workers are underpaid.",
        ],
        skill: "main-ideas",
        difficulty: "TABE Ready",
      },
      {
        id: "me-m4",
        type: "multiple-choice",
        question: "Which of these would be the best summary of the passage?",
        passageId: "me-mastery-p1",
        choices: [
          "Overtime is confusing and workers deserve better protection than they currently receive.",
          "Federal overtime generally begins after forty hours in a week rather than eight hours in a day, though some states add daily rules; recognizing which rule applies is how a worker spots an underpayment.",
          "A worker who works twelve hours on Monday and six hours on three other days has worked thirty hours.",
          "Overtime rules are frequently misunderstood by the people they protect.",
        ],
        correctAnswer: 1,
        explanation:
          "A summary states the main idea and the details it depends on, in neutral language. Choice B gives the rule, the exception, and why it matters.",
        choiceRationales: [
          "Adds an opinion the author never expresses. A summary does not editorialize.",
          "Correct. Complete, neutral, and it covers the whole paragraph.",
          "This restates one example. A summary is not a single detail.",
          "This is the opening sentence, and it covers only the setup — not the correction or the consequence.",
        ],
        skill: "main-ideas",
        difficulty: "TABE Ready",
      },
    ],
  },

  resources: [
    {
      label: "TABE Prep: Main Idea questions",
      detail: "How main-idea items are worded on the TABE, and how to eliminate the near-miss choices.",
      href: "/eng0300/tabe",
    },
    {
      label: "Practice Center — Main Ideas sets",
      detail: "Additional passages at Foundation through Challenge level.",
      href: "/eng0300/practice?skill=main-ideas",
    },
    {
      label: "CommonLit",
      detail:
        "Free library of reading passages with comprehension questions. Your instructor may assign specific passages here.",
      href: "https://www.commonlit.org/",
      external: true,
    },
  ],
};
