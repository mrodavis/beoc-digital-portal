/**
 * TABE Language Prep content.
 *
 * All strategy guidance and every worked example here is ORIGINAL, written for
 * BEOC Academic Bridge. It describes how to approach question TYPES. It
 * contains no items, passages, or answer keys from the TABE test, the
 * Scoreboost workbooks, the TABE Mastery books, or the Teacher's Manual.
 * See docs/ENG0300_SOURCE_AUDIT.md.
 *
 * BLUEPRINT — VERIFIED, NOT CARRIED OVER FROM READING
 * ---------------------------------------------------
 * The Language subtest is structured differently from Reading, so none of the
 * Reading section's assumptions were reused. The domains and weights below were
 * confirmed against Data Recognition Corporation's published TABE 11&12 domain
 * structure and the TABE 11/12 Level M Language blueprint:
 *
 *   Conventions of Standard English  44%   (CCR Language Anchors 1-2)
 *   Vocabulary Acquisition and Use   26%   (CCR Language Anchors 4-6)
 *   Text Types and Purposes          25%   (CCR Writing Anchor 1 — writing strand)
 *   Knowledge of Language             5%   (CCR Language Anchor 3)
 *
 * ENG0300 tests at Level M, matching the Level M materials the course uses.
 * If the course level changes, re-check these weights before reusing them —
 * they differ by level.
 */

export const tabeLanguageOverview = {
  heading: "What the TABE Language test asks of you",
  paragraphs: [
    "The Language subtest is not a grammar quiz in the abstract. It gives you sentences and short passages in ordinary adult contexts and asks you to fix them, finish them, or judge them — editing work, presented the way editing actually happens.",
    "Nearly half the test is Conventions of Standard English: sentence structure, verbs, pronouns, modifiers, capitalization, punctuation, and spelling. Another quarter is vocabulary — word meaning from context, word parts, and figurative language. The final quarter is a writing strand: introducing a topic, supporting it, and organizing what you say.",
    "That last quarter is why this course has a writing strand at all. A test that devotes 25 percent of its Language section to writing is not testing whether you can name a comma splice; it is testing whether you can produce clear prose on demand.",
  ],
  facts: [
    { label: "What it measures", value: "Grammar, usage, mechanics, vocabulary, and writing" },
    { label: "Question format", value: "Mostly multiple choice, presented in real contexts" },
    { label: "Largest domain", value: "Conventions of Standard English — 44% at Level M" },
    { label: "Writing strand", value: "Text Types and Purposes — 25% at Level M" },
  ],
  note: "The TABE is administered by your program, not through this portal. Your instructor will tell you when and where you are scheduled to test.",
};

/** The four reporting domains, with Level M weights. */
export const tabeLanguageDomains = [
  {
    domain: "Conventions of Standard English",
    weight: "44%",
    category: "Language",
    covers:
      "Sentence structure, verbs, pronouns, adjectives and adverbs, prepositions and conjunctions, capitalization, punctuation, and spelling.",
  },
  {
    domain: "Vocabulary Acquisition and Use",
    weight: "26%",
    category: "Language",
    covers:
      "Context clues, Greek and Latin word parts, reference materials, figurative language, word relationships, and academic and signal vocabulary.",
  },
  {
    domain: "Text Types and Purposes",
    weight: "25%",
    category: "Writing",
    covers:
      "Introducing a topic, stating an opinion, grouping related information, and supporting a point of view with reasons, facts, and details.",
  },
  {
    domain: "Knowledge of Language",
    weight: "5%",
    category: "Language",
    covers:
      "Choosing words precisely, punctuating for effect, telling formal from informal register, and expanding, combining, or reducing sentences.",
  },
];

export interface TabeLanguageGuide {
  id: string;
  title: string;
  /** Reporting domain this question type belongs to. */
  domain: string;
  /** How the item usually reads on the test. */
  soundsLike: string[];
  /** The single mistake this question type is built to catch. */
  trap: string;
  /** The approach, in order. */
  approach: string[];
  /** Two worked examples, each showing the reasoning rather than just the key. */
  examples: {
    item: string;
    thinking: string;
    answer: string;
  }[];
  /** Where to practise it on this site. */
  practiceHref: string;
  practiceLabel: string;
}

export const tabeLanguageGuides: TabeLanguageGuide[] = [
  {
    id: "sentence-structure",
    title: "Sentence structure — fragments and run-ons",
    domain: "Conventions of Standard English",
    soundsLike: [
      "Which of the following is a complete sentence?",
      "Which sentence contains a fragment?",
      "What is the best way to correct the underlined portion?",
      "Which revision best combines the two sentences?",
    ],
    trap: "The longest option looks the most complete. Length has nothing to do with it — a sixteen-word group with no main verb is still a fragment, and two correct sentences joined by a comma is still an error.",
    approach: [
      "Find the subject and the main verb of each option before you read it for meaning.",
      "If a word like because, although, when, or which starts the group, it is dependent and needs a main clause.",
      "If two complete sentences are joined, check what joins them: a period, a semicolon, or a comma plus one of for, and, nor, but, or, yet, so.",
      "Watch for -ing words posing as verbs. Running, having, being are never main verbs on their own.",
    ],
    examples: [
      {
        item: "Which is a complete sentence? (A) The supervisor, who had worked there eleven years and knew every customer. (B) The supervisor knew every customer.",
        thinking:
          "A has a subject, supervisor, but the relative clause who had worked… absorbs both verbs. Nothing states what the supervisor did. B has subject (supervisor) and main verb (knew).",
        answer:
          "B. A is a fragment despite being more than twice as long.",
      },
      {
        item: "Correct the underlined portion: The order arrived late, we had to reschedule the install.",
        thinking:
          "Cover the comma. Both halves stand alone as sentences, so a comma alone cannot join them — this is a comma splice. Adding so names the relationship the sentence already implies.",
        answer:
          "The order arrived late, so we had to reschedule the install. Deleting the comma instead would make it worse, not better.",
      },
    ],
    practiceHref: "/eng0300/writing-lab/sentence-skills?skill=fragments",
    practiceLabel: "Practise fragments and run-ons",
  },
  {
    id: "verbs",
    title: "Verb form, tense, and consistency",
    domain: "Conventions of Standard English",
    soundsLike: [
      "Which verb best completes the sentence?",
      "Which sentence contains an inappropriate shift in verb tense?",
      "Which choice corrects the error in the underlined verb?",
    ],
    trap: "The option that sounds most natural in speech. Should have went, we was, and he don't all sound fine out loud in many dialects and are all marked wrong on this test, which asks specifically for standard written English.",
    approach: [
      "Read the whole sentence for its time frame before choosing. One verb usually tells you what tense the rest must match.",
      "After have, has, or had, use the past participle: gone, seen, written, done — not went, saw, wrote, did.",
      "After should, could, would, and must, use have plus the participle, never of.",
      "Check for a tense shift across a compound: he opened the drawer and finds the key changes time for no reason.",
    ],
    examples: [
      {
        item: "We should have ___ the form before submitting it. (reviewed / review / reviewing)",
        thinking:
          "Should have is always followed by a past participle. Review is the base form and reviewing is a participle of the wrong kind.",
        answer:
          "reviewed. The test uses this pattern often because should of is so common in speech.",
      },
      {
        item: "Which contains a tense shift? (A) He opened the drawer and found the key. (B) He opened the drawer and finds the key.",
        thinking:
          "B starts in the past with opened and jumps to the present with finds inside a single action. Nothing in the sentence justifies the change.",
        answer:
          "B. Both verbs describe one moment, so both must be past.",
      },
    ],
    practiceHref: "/eng0300/writing-lab/sentence-skills?skill=subject-verb",
    practiceLabel: "Practise verbs and agreement",
  },
  {
    id: "agreement-modifiers",
    title: "Agreement, pronouns, and modifiers",
    domain: "Conventions of Standard English",
    soundsLike: [
      "Which word best completes the sentence?",
      "Which sentence uses pronouns correctly?",
      "Which revision corrects the misplaced modifier?",
    ],
    trap: "The noun nearest the verb. In the box of files ___ on the counter, files sits right beside the blank and is not the subject — box is. Most agreement errors are really subject-identification errors.",
    approach: [
      "Cross out every prepositional phrase, then choose the verb. The sentence gets shorter and the answer gets obvious.",
      "Remember the singular indefinite pronouns: each, every, either, neither, and anything ending in -one, -body, or -thing.",
      "For pronoun case, remove the other person: the supervisor asked Maria and I becomes asked I, which is wrong.",
      "For modifiers, check that the word right after an opening -ing phrase is the one doing that action.",
    ],
    examples: [
      {
        item: "The box of files ___ on the counter. (sit / sits)",
        thinking:
          "Cross out of files. What remains is the box ___ on the counter. Box is singular.",
        answer: "sits.",
      },
      {
        item: "Which is correct? (A) Walking into the office, the lights were already on. (B) Walking into the office, I saw that the lights were already on.",
        thinking:
          "In A the word after the opening phrase is lights, which claims the lights were walking. B puts the person doing the walking immediately after the comma.",
        answer:
          "B. A is a dangling modifier — a favourite of this test because the sentence reads smoothly until you picture it.",
      },
    ],
    practiceHref: "/eng0300/writing-lab/sentence-skills?skill=usage",
    practiceLabel: "Practise agreement and modifiers",
  },
  {
    id: "mechanics",
    title: "Capitalization, punctuation, and spelling",
    domain: "Conventions of Standard English",
    soundsLike: [
      "Which sentence is punctuated correctly?",
      "Which word in the sentence should be capitalized?",
      "Which choice corrects the error in the underlined portion?",
    ],
    trap: "Capitalizing what feels important. Seasons, directions, general job titles, and school subjects all feel like they deserve capitals and none of them get one unless they are part of a name.",
    approach: [
      "For commas, name the job: separating a series, following an introductory element, surrounding non-essential information, or joining two sentences with a conjunction. No job, no comma.",
      "Non-essential information takes two commas, never one. A single comma between a subject and its verb is always wrong.",
      "For capitals, ask whether the word is part of a name. Dean Alvarez yes, the dean no. Spanish yes, biology no. March yes, spring no.",
      "For apostrophes, expand the contraction: it's becomes it is, who's becomes who is. If the expansion is nonsense, you want the possessive.",
    ],
    examples: [
      {
        item: "Which is correct? (A) My co-worker, who trained me is retiring. (B) My co-worker, who trained me, is retiring.",
        thinking:
          "Who trained me is extra information about the co-worker. Extra information gets a comma on each side; A opens the pair and never closes it.",
        answer: "B.",
      },
      {
        item: "Which is capitalized correctly? (A) I applied to the office of financial aid in the Spring. (B) I applied to the Office of Financial Aid in the spring.",
        thinking:
          "The Office of Financial Aid is the name of a specific office, so it takes capitals. Spring is a season and never does.",
        answer:
          "B. The test pairs these two rules deliberately, because they pull in opposite directions.",
      },
    ],
    practiceHref: "/eng0300/writing-lab/sentence-skills?skill=punctuation",
    practiceLabel: "Practise punctuation and capitalization",
  },
  {
    id: "word-meaning",
    title: "Word meaning from context and word parts",
    domain: "Vocabulary Acquisition and Use",
    soundsLike: [
      "As used in the sentence, ___ most nearly means —",
      "Which word means the same as the underlined word?",
      "The prefix in ___ suggests that the word means —",
    ],
    trap: "The most common meaning of a multi-meaning word. Load, current, and charge all have an everyday meaning and a technical one, and the test regularly asks for the one the sentence supplies rather than the one you already carry.",
    approach: [
      "Cover the choices. Predict the meaning from the sentence alone, then find the choice closest to your prediction.",
      "Look for the clue type: a definition restated nearby, an example, a contrast signalled by but or unlike, or a cause-and-effect relationship.",
      "For word parts, split the word: pre-, re-, un-, -able, -tion. Then check the split against the sentence — word parts narrow the field but the context decides.",
      "Most nearly means is asking for the meaning in this sentence, not the dictionary's first entry.",
    ],
    examples: [
      {
        item: "To keep the system stable, utilities ask large customers to curtail usage, reducing their draw voluntarily. Curtail most nearly means —",
        thinking:
          "The sentence restates it immediately: reducing their draw. That is a definition clue sitting in the same sentence.",
        answer:
          "to cut back. No outside knowledge of utilities is needed or wanted.",
      },
      {
        item: "The load on the grid climbs when air conditioners, ovens, and commuters all draw power at once. Load here means —",
        thinking:
          "Load has a common meaning about transported goods, and the test will offer it. What follows the word defines it as simultaneous electricity use.",
        answer:
          "the total demand for electricity. The familiar meaning is the distractor.",
      },
    ],
    practiceHref: "/eng0300/skills/vocabulary",
    practiceLabel: "Vocabulary in Context lab",
  },
  {
    id: "figurative-signal",
    title: "Figurative language and signal words",
    domain: "Vocabulary Acquisition and Use",
    soundsLike: [
      "The phrase ___ is an example of which type of figurative language?",
      "What does the expression ___ mean as it is used here?",
      "Which word best completes the sentence to show contrast?",
    ],
    trap: "Choosing a transition because it sounds academic rather than because it fits. However, therefore, and furthermore are not interchangeable — each one promises a different relationship, and the test builds wrong answers out of that exact confusion.",
    approach: [
      "For figurative language, name the type first: a direct comparison is a metaphor, a comparison using like or as is a simile, a fixed everyday expression is an idiom.",
      "Then read the sentence after the figure. Writers usually explain their own images within a sentence or two.",
      "For signal words, identify the relationship between the two ideas before you look at the choices: adding, contrasting, causing, comparing, illustrating, or sequencing.",
      "Test your choice by reading both sentences with it in place. If the promise the word makes is not kept, it is the wrong word.",
    ],
    examples: [
      {
        item: "Grid operators describe August as walking a tightrope in the wind. This is an example of —",
        thinking:
          "It is a direct comparison with no like or as, which makes it a metaphor rather than a simile. The next sentence explains it: a thin margin with immediate consequences.",
        answer:
          "A metaphor, meaning that managing the grid requires fine balance under conditions that could upset it at any moment.",
      },
      {
        item: "Fare collection costs money to administer. ___, it slows boarding at every stop. (However / Furthermore)",
        thinking:
          "Both sentences argue on the same side against fare collection. Nothing is being reversed, so a contrast word would mislead.",
        answer:
          "Furthermore. However would promise a reversal the second sentence never delivers.",
      },
    ],
    practiceHref: "/eng0300/writing-lab/transitions",
    practiceLabel: "Transition word deck",
  },
  {
    id: "text-types",
    title: "Writing to a purpose — topic, support, and organization",
    domain: "Text Types and Purposes · Knowledge of Language",
    soundsLike: [
      "Which sentence would best introduce this paragraph?",
      "Which detail best supports the writer's point?",
      "Where should the underlined sentence be placed?",
      "Which sentence best concludes the paragraph?",
      "Which revision best combines these sentences?",
    ],
    trap: "Picking the truest statement rather than the one that does the job asked. A supporting-detail question is not asking which fact is most accurate; it is asking which fact supports this particular claim.",
    approach: [
      "For a topic sentence, find what every other sentence has in common, then pick the choice that covers all of them and nothing more.",
      "For supporting detail, restate the claim in your own words first. Then test each choice against that claim, not against the topic generally.",
      "For placement, look for the pronoun or transition in the sentence being moved — it usually points at what must come immediately before it.",
      "For a concluding sentence, rule out anything that merely repeats the opening, and anything that introduces a new idea the paragraph never developed.",
      "For sentence combining, prefer the version that shows the relationship between the ideas rather than the shortest one.",
    ],
    examples: [
      {
        item: "A paragraph gives replacement costs, the difficulty of hiring exact skills, and what a certificate is worth to an employee. Which sentence best introduces it?",
        thinking:
          "Run the coverage test. A choice naming only replacement cost covers one third of the paragraph. A choice about employer generosity is contradicted by it. The right answer accounts for both the employer's reasons and the employee's gain.",
        answer:
          "Employer-paid training is a practical exchange that benefits the company and the employee in different ways.",
      },
      {
        item: "Claim: midday clinic appointments fail because they compete with work shifts. Which detail best supports it?",
        thinking:
          "The unused-slot percentage shows that midday fails, but not why. The detail about patients losing pay if they leave a shift is the one that supports this specific claim.",
        answer:
          "The detail about unpaid time off. A true fact that supports a different claim is the most common wrong answer on this question type.",
      },
    ],
    practiceHref: "/eng0300/writing-lab/short-response",
    practiceLabel: "Tier 3 — Short Response",
  },
];

export const tabeLanguageChecklist = [
  "I can tell a fragment from a complete sentence and say what is missing",
  "I know the four legal ways to join two complete sentences",
  "I cross out prepositional phrases before choosing a verb",
  "I use the past participle after have, has, had, and should have",
  "I can expand it's and who's to check whether I want the possessive",
  "I predict a word's meaning from context before reading the choices",
  "I choose a transition by the relationship it signals, not by how it sounds",
  "I test a supporting detail against the claim, not against the topic",
];
