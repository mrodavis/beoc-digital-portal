import { SkillId } from "@/types/eng0300";

/**
 * TABE Prep Center content.
 *
 * All strategy guidance here is original and written for BEOC Academic Bridge.
 * It describes how to approach question TYPES. It contains no items, passages,
 * or answer keys from the TABE test, the Scoreboost workbooks, the TABE Mastery
 * books, or the Teacher's Manual.
 */

export const tabeOverview = {
  heading: "What the TABE Reading test asks of you",
  paragraphs: [
    "TABE stands for Tests of Adult Basic Education. The Reading test measures comprehension: it gives you passages and asks what they say, what they mean, and how they are built. It is not a test of what you already know about a topic — in fact, answering from your own knowledge instead of from the passage is one of the most common ways to lose points.",
    "Passages come from a wide range of adult contexts: workplace documents, health and science articles, history and biography, arguments and editorials, and material presented in charts or tables. You are not expected to be familiar with any of these subjects in advance.",
    "In ENG0300, the goal is a TABE Reading scale score of 563 or above. That score, or a final grade of C+ or better, satisfies the course completion requirement for Academic Bridge progression.",
  ],
  facts: [
    { label: "What it measures", value: "Reading comprehension, not background knowledge" },
    { label: "Question format", value: "Mostly multiple choice, with some multi-part items" },
    { label: "Passage sources", value: "Workplace, health, science, history, argument, and data" },
    { label: "ENG0300 goal", value: "Scale score 563+" },
  ],
  note: "The TABE is administered by your program, not through this portal. Your instructor will tell you when and where you are scheduled to test.",
};

export interface TabeQuestionGuide {
  skill: SkillId;
  title: string;
  /** How the item usually reads on the test. */
  soundsLike: string[];
  /** The approach, in order. */
  approach: string[];
  /** What the wrong answers usually look like for this type. */
  distractors: string[];
  skillHref: string;
}

export const tabeQuestionGuides: TabeQuestionGuide[] = [
  {
    skill: "main-ideas",
    title: "Identifying the main idea",
    soundsLike: [
      "Which statement best expresses the main idea of the passage?",
      "What is this passage mostly about?",
      "Which of the following would be the best title for this passage?",
      "Which is the best summary of the passage?",
    ],
    approach: [
      "State the main idea in your own words before reading the choices.",
      "Run the coverage test: the right answer covers the whole passage and nothing more.",
      "For a title question, remember that a title covers the passage the way a main idea does — it is not the catchiest option.",
      "For a summary question, check that the choice is neutral. A summary that praises or criticizes the passage is wrong.",
    ],
    distractors: [
      "A choice that names only the topic, with no claim attached.",
      "A true detail from a single paragraph, offered as if it were the whole point.",
      "A statement broader than the passage, covering ground the author never touched.",
      "A reasonable-sounding idea that the passage never actually states.",
    ],
    skillHref: "/eng0300/skills/main-ideas",
  },
  {
    skill: "evidence",
    title: "Finding supporting evidence",
    soundsLike: [
      "Which sentence from the passage best supports the answer to the previous question?",
      "Which detail best supports the idea that…?",
      "The author includes the information in paragraph 3 mainly to…",
    ],
    approach: [
      "Restate the claim you are supporting in your own words. Most errors here come from supporting a slightly different claim.",
      "Test each choice by asking: if this sentence were removed, would the claim still be supported?",
      "On two-part items, answer part one, then choose the evidence that supports the answer you actually gave — not the answer you almost gave.",
    ],
    distractors: [
      "A true sentence from the passage that supports a different claim.",
      "A sentence that restates the claim rather than supporting it.",
      "The most vivid sentence in the passage, which is often an example rather than evidence.",
    ],
    skillHref: "/eng0300/skills/evidence",
  },
  {
    skill: "inferences",
    title: "Making an inference",
    soundsLike: [
      "It can be inferred from the passage that…",
      "The passage suggests that…",
      "Based on the passage, the reader can conclude that…",
      "Which of the following is most likely true?",
    ],
    approach: [
      "Find the specific words that make your choice true. If you cannot point to them, it is a guess.",
      "Prefer the smaller conclusion. Test writers reward the inference that stays closest to the text.",
      "Be careful with always, never, all, and only. Strong words need strong support.",
    ],
    distractors: [
      "A statement that is true in life but never raised in this passage.",
      "A conclusion pointing the right direction but stated too strongly.",
      "A statement the passage actually contradicts a few lines later.",
    ],
    skillHref: "/eng0300/skills/inferences",
  },
  {
    skill: "vocabulary",
    title: "Determining word meaning",
    soundsLike: [
      "As used in paragraph 2, the word ______ most nearly means…",
      "What does the phrase ______ mean in this passage?",
      "Which word could best replace ______ without changing the meaning?",
    ],
    approach: [
      "Go back to the sentence. Never answer a vocabulary item from memory alone — that is what most nearly means is warning you about.",
      "Cover the choices, read the sentence with a blank, and predict a word.",
      "Look for a definition, example, or contrast clue within one or two sentences.",
      "If context is thin, break the word into prefix, root, and suffix.",
      "Substitute your choice back into the sentence and confirm it still reads correctly.",
    ],
    distractors: [
      "The word's most common meaning, when the passage uses a less common one.",
      "A word that fits the sentence grammatically but changes what it claims.",
      "A near-synonym that is too strong or too weak for the context.",
    ],
    skillHref: "/eng0300/skills/vocabulary",
  },
  {
    skill: "point-of-view",
    title: "Author's purpose and point of view",
    soundsLike: [
      "The author's primary purpose in writing this passage is to…",
      "From which point of view is the passage written?",
      "Which statement from the passage is an opinion rather than a fact?",
      "How does the author of Passage 1 differ from the author of Passage 2?",
    ],
    approach: [
      "Ask what the author wants you to do after reading: know something, do something, agree with something, or feel something.",
      "For point of view, check the pronouns first — that settles first, second, and third person immediately.",
      "For fact versus opinion, ask whether a record could settle the statement. If no record could, it is an opinion.",
      "On paired passages, check whether the authors disagree about the facts or about which facts matter.",
    ],
    distractors: [
      "A purpose the passage serves incidentally rather than primarily.",
      "\"To entertain\" attached to a passage that merely has a lively opening.",
      "An opinion that sounds factual because it contains a number.",
    ],
    skillHref: "/eng0300/skills/point-of-view",
  },
  {
    skill: "text-structure",
    title: "Text structure and organization",
    soundsLike: [
      "How is this passage organized?",
      "Which text structure does the author use?",
      "How does paragraph 4 relate to paragraph 3?",
      "How does the structure of Passage 1 differ from that of Passage 2?",
    ],
    approach: [
      "Scan for signal words — three or four from the same family usually settles it.",
      "Describe the shape of the whole passage, not the shape of one paragraph.",
      "Cause/effect versus problem/solution: if someone is doing something about it, it is problem/solution.",
      "On paired items, name each passage's structure separately before comparing.",
    ],
    distractors: [
      "The structure of a single paragraph nested inside a differently structured passage.",
      "Cause/effect offered where the passage actually proposes a response.",
      "\"Description\" chosen because a passage contains details, when it is really organized by time or comparison.",
    ],
    skillHref: "/eng0300/skills/text-structure",
  },
  {
    skill: "visual-data",
    title: "Charts, graphs, and data",
    soundsLike: [
      "According to the chart, which category had the highest…?",
      "Which information in the graph supports the author's statement in paragraph 2?",
      "Based on the passage AND the table, which conclusion is best supported?",
    ],
    approach: [
      "Read the title, axis labels, and units before you read any value.",
      "Say what the figure shows in one sentence before looking at the question.",
      "When the text mentions two categories together, add them and check the arithmetic.",
      "On integrate items, confirm the answer requires both the text and the figure. If one alone gives it, re-read the question.",
    ],
    distractors: [
      "A value read from the wrong bar, row, or axis.",
      "A cause offered for a pattern the chart only shows.",
      "A prediction about the future that the figure does not cover.",
      "A conclusion using outside knowledge not present in either source.",
    ],
    skillHref: "/eng0300/skills/visual-data",
  },
];

export interface TestStrategy {
  title: string;
  body: string;
  steps?: string[];
}

export const testTakingStrategies: TestStrategy[] = [
  {
    title: "Return to the passage every time",
    body: "The single largest source of avoidable errors is answering from memory after one read. On a reading test, the passage is open in front of you and rechecking it is free. Any question that names a paragraph, quotes a phrase, or asks what a word means is telling you exactly where to look.",
    steps: [
      "Read the question and identify what it points you to.",
      "Go back and read that part, plus one sentence on either side.",
      "Answer from what you just read, not from what you remember.",
    ],
  },
  {
    title: "Predict before you look at the choices",
    body: "Well-written wrong answers are designed to look reasonable. The most reliable defense is to decide what you think before you see them. Cover the choices, answer the question in your own words, then uncover them and find the closest match.",
  },
  {
    title: "Eliminate rather than select",
    body: "When two choices both look plausible, stop trying to pick the winner and start disqualifying. Most wrong answers on a reading test fail in one of four predictable ways, and naming the failure is faster than defending the answer you like.",
    steps: [
      "Too narrow — true, but it covers only part of the passage.",
      "Too broad — goes beyond what the passage supports.",
      "Not in the text — sensible, but the passage never says it.",
      "Contradicted — the passage says the opposite somewhere you skimmed.",
    ],
  },
  {
    title: "Find the textual evidence before you commit",
    body: "Before you fill in an answer, finish this sentence: \"I know this because the passage says ______.\" If you cannot complete it with actual words from the text, you are guessing. That does not always mean the answer is wrong, but it tells you which questions to revisit if you have time left.",
  },
  {
    title: "Pace yourself, and use the whole time",
    body: "Running out of time and rushing the last passage costs more points than a single hard question ever will. A steady pace with a plan for hard items protects your score better than speed.",
    steps: [
      "Check the clock after the first passage and see whether your pace fits the section.",
      "Give a genuinely hard question one honest attempt, then mark it and move on.",
      "Never leave an answer blank — an eliminated-down guess is better than nothing.",
      "Spend leftover time on the questions you marked, not on re-reading answers you were confident about.",
    ],
  },
  {
    title: "Read the passage before the questions",
    body: "Some test-takers try to save time by reading the questions first. For TABE Reading, a single focused read of the passage first is usually faster overall, because most questions require a sense of the whole text. Read for the main idea and the shape of the passage, and do not try to memorize details — you can look those up.",
  },
  {
    title: "Watch for absolute words",
    body: "Words such as always, never, all, every, and only make a statement much harder to support. They are not automatically wrong, but a choice containing one needs evidence that is just as absolute. When you see one, go find that evidence specifically.",
  },
];

export const tabeReadinessChecklist = [
  "I can state a passage's main idea in one sentence without looking at answer choices.",
  "I can point to the exact sentence that supports my answer.",
  "I can name a passage's structure and the signal words that told me.",
  "I can define an unfamiliar word from context and check it by substitution.",
  "I can tell the author's purpose apart from the passage's topic.",
  "I can separate a statement of fact from a statement of opinion.",
  "I can read a chart's title, labels, and units before interpreting a value.",
  "I can finish a passage and its questions at a steady pace without rushing the last one.",
];
