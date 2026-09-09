import { SkillId, WriteIt } from "@/types/eng0300";

/**
 * WRITE IT — the seven writing tasks that close the seven skill labs.
 *
 * Each task is the writing counterpart of that lab's reading skill, and each is
 * tied to a passage the student has just read in that lab rather than to a
 * generic prompt. They live together in one file so the strand can be reviewed
 * as a sequence: an instructor can read all seven and check that the demand
 * actually escalates from Week 1 to Week 7.
 *
 * SCOPE
 * -----
 * All prompts, frames, and model paragraphs here are ORIGINAL, written for BEOC
 * Academic Bridge. The model paragraphs are instructor-authored exemplars, not
 * student work and not transcribed from any commercial workbook.
 *
 * Nothing here is graded on this site. Every task ends in a Brightspace
 * dropbox, and the `brightspace` field names the destination so the site and
 * the shell stay in step.
 *
 * NOTE FOR THE INSTRUCTOR: the dropbox names below are the expected Brightspace
 * titles. Confirm them against the live shell — if a dropbox is renamed there,
 * change it here so the on-screen instruction still matches what the student
 * sees in Brightspace. See ENG0300_WRITING_URLS.md.
 */

/** Weeks 1-2 predate the WRITE IT! sub-modules, so their drafts go to the portfolio. */
const PORTFOLIO_DROPBOX = "WRITING PORTFOLIO — Backfill Collection";

export const writeItTasks: Partial<Record<SkillId, WriteIt>> = {
  /* ---------------------------------------------------------------- *
   * WEEK 3 — Vocabulary in Context
   * Built first: this is the live week (Week 3 began Sept 9).
   * ---------------------------------------------------------------- */
  vocabulary: {
    lab: 3,
    taskName: "Academic words in context",
    passageTitle: "The Grid in August",
    prompt: [
      "You have just worked out what four words mean from the passage alone: peak demand, curtail, load, and brownout. Reading a word is one thing. Using it is another, and it is the harder half.",
      "Write one paragraph of five to seven sentences explaining to someone who has not read the passage why a power grid struggles on a hot August afternoon. Use three of the four target words correctly in your own sentences — not copied out of the passage.",
      "Then add one final sentence that defines the fourth word, and says which words in the passage told you what it meant. That last sentence is where you show your context-clue reasoning, so make the clue explicit.",
    ],
    checklist: [
      "Three of the four target words appear in sentences I wrote myself",
      "Each of those three words is used with the meaning the passage gives it",
      "My last sentence defines the fourth word in my own words",
      "That sentence names the specific clue in the passage that gave me the meaning",
      "A reader who never saw the passage could follow my paragraph",
    ],
    frames: [
      "On the hottest afternoons, the grid reaches ______ because ______.",
      "To keep the system stable, utilities ask large customers to ______, which means ______.",
      "I could tell that ______ means ______ because the passage says ______.",
    ],
    model: {
      intro:
        "One way to do this well. Notice that the target words are load, curtail, and peak demand, and that the final sentence defines brownout by pointing at the exact clue.",
      sentences: [
        {
          text: "A power grid runs into trouble in August because too much of the day's electricity gets used in the same few hours.",
          strand: "focus",
          note: "The controlling idea arrives first and in plain words. Everything after this sentence has to serve it.",
        },
        {
          text: "Late on a hot afternoon, air conditioners, ovens, and commuters coming home all draw current at once, and the load on the system climbs faster than the equipment was built to handle.",
          strand: "evidence",
          note: "Target word one, load, used correctly and supported by the specific causes the passage gave — not just asserted.",
        },
        {
          text: "Utilities call that window peak demand, and it usually falls between four and seven in the evening.",
          strand: "evidence",
          note: "Target word two, peak demand, defined by use rather than by a dictionary definition dropped in.",
        },
        {
          text: "To get through it, the utility asks big customers such as factories and warehouses to curtail their usage, and those customers agree because they get a cheaper rate the rest of the year.",
          strand: "evidence",
          note: "Target word three, curtail, in a sentence that also explains the trade — development, not just a word placed in a slot.",
        },
        {
          text: "If those voluntary cuts are not enough, the utility has one more option before anything fails.",
          strand: "organization",
          note: "A transition sentence. It closes the voluntary-measures idea and sets up the definition sentence, so the paragraph does not lurch.",
        },
        {
          text: "A brownout is a slight drop in voltage across a region; I could tell because the passage explains it in the same sentence as \"lower voltage slightly\" and adds that it once made incandescent bulbs visibly dim.",
          strand: "conventions",
          note: "The fourth word, defined, with the clue quoted. The semicolon joins two complete sentences correctly — a conventions point earned rather than avoided.",
        },
      ],
    },
    brightspace: { week: 3, dropbox: "WRITE IT! Week 3 — Vocabulary in Context" },
  },

  /* ---------------------------------------------------------------- *
   * WEEK 4 — Text Structure
   * ---------------------------------------------------------------- */
  "text-structure": {
    lab: 4,
    taskName: "Writing inside a pattern",
    passageTitle: "How the Line Got Longer / Fixing the Backlog",
    prompt: [
      "You named the structure of two texts about the vital records office: Text A is cause and effect over time, Text B is problem and solution. Naming a pattern is recognition. Writing inside one is production, and it is what the test's writing items actually ask for.",
      "Your assigned pattern is PROBLEM AND SOLUTION. Write one paragraph of five to seven sentences about a wait, a delay, or a backlog you have actually seen — at a clinic, an agency, a store, a school office, a job. Do not write about the vital records office; use your own example.",
      "Your paragraph has to be recognizable as problem and solution from the words on the page. State the problem, say who it affects, propose at least two solutions, and use signal words that mark each move. A reader should be able to name your pattern without being told what it is.",
    ],
    checklist: [
      "My first sentence states the problem clearly",
      "I say who the problem affects, specifically",
      "I propose at least two different solutions",
      "I use signal words that mark the pattern (one problem is, one response, a second approach, as a result)",
      "Someone reading it cold could name the structure as problem and solution",
    ],
    frames: [
      "The problem at ______ is that ______.",
      "One response would be to ______, because ______.",
      "A second approach, and the more expensive one, is to ______.",
    ],
    model: {
      intro:
        "A model built on a different example than yours, so you can see the pattern working without borrowing the content. Watch how many words exist only to signal the structure.",
      sentences: [
        {
          text: "The pharmacy counter at my local drugstore has one problem that creates every other one: a single technician handles the drop-off window, the pickup window, and the phone.",
          strand: "focus",
          note: "The problem is named in sentence one, and the colon makes the causal claim explicit. Focus is set before any solution appears.",
        },
        {
          text: "This falls hardest on people picking up a prescription on a lunch break, who can lose twenty minutes standing behind a phone call they cannot hear.",
          strand: "evidence",
          note: "Names who is affected, with a specific consequence. A problem nobody suffers from is not a problem worth solving.",
        },
        {
          text: "One response would be to route the phone to a central line during the busiest hours, so a call from another town does not stop the line in the room.",
          strand: "evidence",
          note: "Solution one, with the reason it would work attached. The signal words one response mark the structural turn.",
        },
        {
          text: "A second approach is to separate the two windows entirely, staffing drop-off during the morning and pickup after four, when most people arrive.",
          strand: "organization",
          note: "Solution two, marked by a second approach. The paragraph is now unmistakably problem-and-solution rather than a complaint.",
        },
        {
          text: "The most expensive option, and the one the chain has avoided, is simply to schedule a second technician for the afternoon shift.",
          strand: "organization",
          note: "A third solution ordered deliberately by cost. Ordering is an organization move, not an accident of what came to mind.",
        },
        {
          text: "As a result of doing none of these, the store keeps a line that its own staff apologizes for every afternoon.",
          strand: "conventions",
          note: "As a result closes the pattern, and the sentence is complete and correctly punctuated despite its length.",
        },
      ],
    },
    brightspace: { week: 4, dropbox: "WRITE IT! Week 4 — Text Structure" },
  },

  /* ---------------------------------------------------------------- *
   * WEEK 5 — Point of View & Purpose
   * ---------------------------------------------------------------- */
  "point-of-view": {
    lab: 5,
    taskName: "Same facts, two purposes",
    passageTitle: "What the Library Became",
    prompt: [
      "The library passage used real figures — 41,000 items circulated, 312 programs, 9,400 computer sessions, eleven days as a cooling center — and shaped them into an argument. The same numbers could have been written up as a neutral report. Purpose, not facts, decided how they read.",
      "Write the same information twice, using these facts: a community center's after-school program served 180 students last year, kept 92 percent of them enrolled through June, and currently has one staff member for every 30 students.",
      "First, write three to four sentences TO A CLASSMATE, to inform. Neutral, no argument, just what the program is and what the numbers say. Then write three to four sentences TO A SUPERVISOR who controls the budget, to persuade them to fund a second staff member. Same facts, different purpose. Label each version.",
    ],
    checklist: [
      "Version 1 is labelled and written to inform a classmate",
      "Version 2 is labelled and written to persuade a supervisor",
      "Both versions use the same three facts — I invented no new numbers",
      "Version 1 contains no argument, recommendation, or loaded word",
      "Version 2 makes a clear ask and uses the facts as support for it",
    ],
    frames: [
      "TO INFORM: The after-school program at ______ served ______ last year.",
      "TO PERSUADE: The program keeps ______ percent of its students enrolled, which is why ______.",
      "For that reason, I am asking that ______.",
    ],
    model: {
      intro:
        "The two versions below use identical facts. Read the verbs and the adjectives — that is where purpose lives, not in the data.",
      sentences: [
        {
          text: "TO INFORM: The after-school program served 180 students last year. Of those, 92 percent stayed enrolled through June. The program currently runs with one staff member for every 30 students.",
          strand: "focus",
          note: "Informative purpose held all the way through. Nothing here tells the reader what to conclude — served, stayed, runs are flat reporting verbs.",
        },
        {
          text: "TO PERSUADE: Our after-school program held on to 92 percent of its 180 students all the way through June, which is a retention rate most programs do not reach.",
          strand: "evidence",
          note: "Same two numbers, now doing argumentative work. Held on to and which is a rate most programs do not reach add the evaluation the informative version refused.",
        },
        {
          text: "It does that with one staff member for every 30 students, a ratio that leaves no margin when someone is out sick.",
          strand: "evidence",
          note: "The third fact reframed as a vulnerability. The number did not change; its role in the paragraph did.",
        },
        {
          text: "Funding one additional staff member would bring the ratio to roughly one to 15 and protect the result we already have.",
          strand: "organization",
          note: "The ask, placed last where a persuasive paragraph puts it, and connected to the evidence rather than dropped in.",
        },
        {
          text: "I am asking for that position in this budget cycle.",
          strand: "conventions",
          note: "Short, complete, correctly punctuated, and unambiguous about what is wanted. A persuasive paragraph that never names its request has not finished.",
        },
      ],
    },
    brightspace: { week: 5, dropbox: "WRITE IT! Week 5 — Point of View & Purpose" },
  },

  /* ---------------------------------------------------------------- *
   * WEEK 6 — Evidence & Arguments
   * ---------------------------------------------------------------- */
  evidence: {
    lab: 6,
    taskName: "Claim, Evidence, Explanation",
    passageTitle: "Free Fares",
    prompt: [
      "In Free Fares you separated the support that held up from the support that did not. The nine-percent trip-time figure was evidence. The friend who stopped driving was an anecdote standing in for evidence, and you caught it.",
      "Now build the structure yourself. Write one paragraph of five to seven sentences in Claim–Evidence–Explanation order about whether the city should eliminate bus fares. Take either side.",
      "Draw your evidence from the passage — the fare-collection costs, the nine-percent drop in trip times, the ridership increases, or the unanswered question about replacing the revenue. Do not use the friend who stopped driving; you already know why. After each piece of evidence, explain what it proves. The explanation is the part most writers skip, and it is worth as much as the evidence.",
    ],
    checklist: [
      "My first sentence is a claim someone could disagree with",
      "I use at least two specific pieces of evidence from the passage",
      "After each piece of evidence, a sentence explains what it shows",
      "I avoided the anecdote about the friend who stopped driving",
      "My last sentence says something more than my first sentence did",
    ],
    frames: [
      "The city should / should not eliminate bus fares because ______.",
      "The passage reports that ______.",
      "This matters because ______, which shows ______.",
    ],
    model: {
      intro:
        "Notice the rhythm: claim, then evidence, then explanation, then evidence, then explanation. The explanation sentences are the ones doing the arguing.",
      sentences: [
        {
          text: "The city should not eliminate bus fares until it has named the money that would replace them.",
          strand: "focus",
          note: "An arguable claim, and a narrow one. Until it has named is what makes this a position rather than a slogan.",
        },
        {
          text: "The passage concedes its own weakest point in the last paragraph: fares cover a substantial share of the operating budget, and nothing in the argument says how that share would be made up.",
          strand: "evidence",
          note: "Evidence taken from the passage, including the fact that the argument itself leaves the question open.",
        },
        {
          text: "That matters because a bus system with no fare revenue and no replacement revenue does not become free — it becomes smaller, through cut routes and longer waits.",
          strand: "evidence",
          note: "The explanation sentence. It says what the evidence proves instead of leaving the reader to work it out.",
        },
        {
          text: "The benefits the passage claims are real: removing fare boxes speeds up boarding, and one agency measured a nine percent drop in average trip times.",
          strand: "organization",
          note: "Conceding the other side's best evidence before answering it. Organization at the level of argument, not just order.",
        },
        {
          text: "But a nine percent time saving on routes that run half as often is not a gain for the rider who is waiting.",
          strand: "organization",
          note: "The answer to the concession, which is why the concession was safe to make.",
        },
        {
          text: "Free fares are worth doing; they are not worth doing before the budget question is settled.",
          strand: "conventions",
          note: "The closing sentence advances past the opening claim. The semicolon correctly joins two complete, balanced sentences.",
        },
      ],
    },
    brightspace: { week: 6, dropbox: "WRITE IT! Week 6 — Claim, Evidence, Explanation" },
  },

  /* ---------------------------------------------------------------- *
   * WEEK 7 — Visual & Data Integration
   * ---------------------------------------------------------------- */
  "visual-data": {
    lab: 7,
    taskName: "Writing what a chart shows",
    passageTitle: "When the Clinic Is Open",
    prompt: [
      "The clinic figure showed unused appointment slots by time of day: 12 percent at 8 a.m., 17 percent at 10 a.m., 29 percent at noon, 26 percent at 2 p.m., and 19 percent at 4 p.m. Staff expected the early slots to be worst. They were the best.",
      "Write one paragraph of five to seven sentences that does two jobs a data question always asks for. First, say what the figure shows, using at least two exact numbers and naming the trend rather than listing every bar. Second, say why it matters — what someone running that clinic should do differently because of it.",
      "Be careful with the last part. The figure shows when slots went unused. It does not show why. The passage offers an explanation about work shifts; if you use it, say that it is the clinic's explanation, not something the chart proves.",
    ],
    checklist: [
      "I state what the figure measures before quoting any number from it",
      "I use at least two exact figures correctly",
      "I describe the trend instead of listing all five bars",
      "I say what someone should do differently because of it",
      "I do not claim the chart proves a cause it cannot show",
    ],
    frames: [
      "The figure shows ______, measured by ______.",
      "The rate rises from ______ percent at ______ to ______ percent at ______.",
      "The chart shows when, not why; the clinic's explanation is that ______.",
    ],
    model: {
      intro:
        "Watch the fifth sentence in particular. Refusing to overclaim is a skill the test rewards and most writers skip.",
      sentences: [
        {
          text: "The figure shows how often a clinic's appointment slots went unused over one year, sorted by the time each appointment was scheduled.",
          strand: "focus",
          note: "Says what is being measured before quoting a single number. A reader who does not know the units cannot judge the numbers.",
        },
        {
          text: "The rate is lowest first thing in the morning, at 12 percent for the 8 a.m. slots, and peaks at 29 percent around noon before falling back to 19 percent by 4 p.m.",
          strand: "evidence",
          note: "Three exact figures used to describe a shape — down, up, down — rather than reciting all five bars in a row.",
        },
        {
          text: "That pattern is the opposite of what the clinic's staff expected, since they had assumed the earliest appointments would be the hardest for patients to keep.",
          strand: "evidence",
          note: "Connects the figure to the text beside it. Integration is the skill being assessed, not chart-reading alone.",
        },
        {
          text: "A clinic looking at this should move slots out of the middle of the day, which is what this one did when it opened an evening block.",
          strand: "organization",
          note: "The why it matters half, and it is actionable. A data paragraph that stops at description has answered half the question.",
        },
        {
          text: "The chart shows when slots went unused, though, not why; the explanation about midday appointments competing with unpaid time off work is the clinic's reasoning, not something the bars establish.",
          strand: "organization",
          note: "The limit of the evidence, stated plainly. This sentence is what separates a careful reader from a confident one.",
        },
        {
          text: "The clinic has not yet published results for the evening slots, so whether the change worked is still an open question.",
          strand: "conventions",
          note: "Accurate to the passage, complete, and correctly punctuated — and it ends on the honest note rather than a manufactured conclusion.",
        },
      ],
    },
    brightspace: { week: 7, dropbox: "WRITE IT! Week 7 — Reading a Figure" },
  },

  /* ---------------------------------------------------------------- *
   * WEEK 1 — Main Ideas & Details  (backfill)
   * ---------------------------------------------------------------- */
  "main-ideas": {
    lab: 1,
    taskName: "Summary paragraph",
    passageTitle: "Why Employers Pay for Training",
    prompt: [
      "You worked out the main idea of this passage: employer-paid training is a practical trade, not generosity. Now write that understanding down, which is a different and harder task than picking it from four choices.",
      "Write a summary paragraph of four to six sentences. Open with a topic sentence that states the main idea in your own words. Follow it with three supporting details drawn from the passage — the cost of replacing an employee, the skills gap employers cannot hire their way out of, or what the employee gains from a transferable certificate.",
      "A summary reports. It does not praise the passage, argue with it, or add your own opinion about tuition benefits. Save that for Week 6.",
    ],
    checklist: [
      "My first sentence states the main idea in my own words",
      "I include three supporting details from the passage",
      "Each detail actually supports my topic sentence",
      "I added no opinion of my own and no information from outside the passage",
      "I did not copy full sentences out of the passage",
    ],
    frames: [
      "According to the passage, employers pay for training because ______.",
      "One reason is that ______. A second is that ______.",
      "The passage concludes that ______.",
    ],
    model: {
      intro:
        "A summary at the right altitude: specific enough to be useful, general enough to cover the whole passage.",
      sentences: [
        {
          text: "According to the passage, employers pay for employee training because it is cheaper and faster than hiring, not because they are being generous.",
          strand: "focus",
          note: "The main idea in the writer's own words, and it covers the whole passage rather than one paragraph of it.",
        },
        {
          text: "Replacing a worker means advertising, interviewing, and waiting through the weeks a new hire spends learning the job, all of which costs more than training someone already on staff.",
          strand: "evidence",
          note: "Supporting detail one, compressed from a whole paragraph without copying a sentence out of it.",
        },
        {
          text: "Employers also cannot always hire the exact skills they need, so a medical office adding a records system needs its current receptionist trained rather than a new receptionist found.",
          strand: "evidence",
          note: "Supporting detail two, keeping the passage's own example because the example is what makes the point concrete.",
        },
        {
          text: "Employees gain something in the exchange as well, since a certificate earned on company time stays with the worker and transfers to a future employer.",
          strand: "evidence",
          note: "Supporting detail three, and it covers the fourth paragraph so the summary does not stop at the employer's side.",
        },
        {
          text: "The passage concludes that the arrangement is best understood as a trade, in which each side gets something it wanted.",
          strand: "organization",
          note: "Closes where the passage closes. The summary now has the same shape as the original, which is what a summary owes its source.",
        },
      ],
    },
    brightspace: { week: 1, dropbox: PORTFOLIO_DROPBOX },
  },

  /* ---------------------------------------------------------------- *
   * WEEK 2 — Inferences & Conclusions  (backfill)
   * ---------------------------------------------------------------- */
  inferences: {
    lab: 2,
    taskName: "Claim plus textual proof",
    passageTitle: "Closing Time",
    prompt: [
      "Nothing in Closing Time states that Ruth's business was failing. You concluded it anyway, from a window display that stopped changing, hours that got shorter, and shelves that did not refill. That is an inference: a conclusion the text supports without stating.",
      "Write four to six sentences, each one following the pattern I can tell ___ because ___. Make four separate inferences about the store, Ruth, or the neighborhood, and prove each one with a specific detail from the passage.",
      "The proof half is the graded half. Because it seems that way is not proof. Point at the sentence, the sign, the date, or the detail that put the idea in your head.",
    ],
    checklist: [
      "I make four separate inferences, not the same one four times",
      "Every sentence names the specific detail that supports it",
      "Each inference goes beyond what the passage states outright",
      "No inference contradicts anything the passage says",
      "I did not use outside knowledge about hardware stores",
    ],
    frames: [
      "I can tell ______ because the passage says ______.",
      "I can tell ______ because ______ appears right after ______.",
      "The detail about ______ tells me ______, even though the passage never says so.",
    ],
    model: {
      intro:
        "Four inferences, four different details. Notice that the last one reaches furthest and is still tied to something on the page.",
      sentences: [
        {
          text: "I can tell the store was in trouble months before it closed, because the window display stopped changing in March and the box fans were still up in July.",
          strand: "focus",
          note: "An inference with a date attached. The claim and its proof are both in one sentence, which is what the pattern is for.",
        },
        {
          text: "I can tell Ruth was cutting back rather than being forced out suddenly, because the first sign was hand-lettered and only changed the hours, while the printed sign came five months later.",
          strand: "evidence",
          note: "The proof is the contrast between the two signs — a detail most readers pass over. Specific beats obvious.",
        },
        {
          text: "I can tell she was not restocking, because the passage says the gaps in the back shelves did not fill in.",
          strand: "evidence",
          note: "Short, exact, and anchored to the passage's own wording. Not every inference needs to be elaborate.",
        },
        {
          text: "I can tell the store mattered to the neighborhood more than its sales showed, because the line on the last afternoon reached past the laundromat and included people who had not bought anything there in years.",
          strand: "organization",
          note: "The furthest reach, saved for last, and still nailed to two concrete details. Ordering inferences from safest to boldest is an organization choice.",
        },
        {
          text: "None of these are stated in the passage, but each one follows from what is.",
          strand: "conventions",
          note: "A clean closing sentence that names what the writer has been doing. Complete, correctly punctuated, and it earns its place.",
        },
      ],
    },
    brightspace: { week: 2, dropbox: PORTFOLIO_DROPBOX },
  },
};
