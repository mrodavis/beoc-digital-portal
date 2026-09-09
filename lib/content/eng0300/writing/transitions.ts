/**
 * Academic transition and signal words — the ENG0300 flashcard deck.
 *
 * Built on the four-mode pattern from the ENGL0150 Healthcare Word Bank
 * (flip card · Spell It · Choose the Word · Use It), with one deliberate
 * difference: this deck's **Use It** mode asks the student to WRITE a sentence
 * using the word, not to recognize a correct one. Recognition of these words is
 * usually already there. Production is not, and production is why the deck
 * exists.
 *
 * Ungraded, like every deck. If points are wanted for this vocabulary, a
 * Brightspace quiz carries them — exactly as in ENGL0150.
 *
 * Released 7-8 words per week on the same weekly cadence as the ENGL0150 lists,
 * spiralling forward from Deck 2 so earlier words keep coming back.
 *
 * All definitions and examples are original, written for BEOC Academic Bridge.
 */

export interface TransitionWord {
  word: string;
  /** The logical relationship this word promises the reader. */
  relationship: string;
  meaning: string;
  /** An academic or workplace sentence using it correctly. */
  example: string;
  /**
   * A transition signalling a DIFFERENT relationship. Swapping it into the
   * example produces the wrong-answer option in Choose the Word — which is the
   * real error students make: a transition that contradicts the sentence.
   */
  confusedWith: string;
  /** Why that swap misleads a reader. Shown after answering. */
  whyWrong: string;
  /** The task shown in Use It, where the student writes their own sentence. */
  usePrompt: string;
}

export interface TransitionDeck {
  number: number;
  /** Course week this deck is released. */
  week: number;
  title: string;
  focus: string;
  words: TransitionWord[];
  /** True where earlier decks fold in for review. */
  spirals: boolean;
}

export const transitionDecks: TransitionDeck[] = [
  {
    number: 1,
    week: 3,
    title: "Contrast and addition",
    focus:
      "The two moves you make most often: adding another point, or turning against the one you just made.",
    spirals: false,
    words: [
      {
        word: "however",
        relationship: "Contrast",
        meaning:
          "Signals that what follows cuts against what came before. Takes a semicolon before it and a comma after when it joins two sentences.",
        example:
          "The clinic added evening appointments; however, it has not published attendance figures for them yet.",
        confusedWith: "therefore",
        whyWrong:
          "Therefore promises a result. Putting it here tells the reader the missing figures follow logically from adding appointments, which is the opposite of the contrast intended.",
        usePrompt:
          "Write one sentence about your week that uses however to turn against something you just said.",
      },
      {
        word: "in contrast",
        relationship: "Contrast",
        meaning:
          "Sets two things directly against each other. Used when both sides are being described, not just when one is being qualified.",
        example:
          "The 8 a.m. slots were well attended. In contrast, nearly a third of the midday slots went unused.",
        confusedWith: "similarly",
        whyWrong:
          "Similarly claims the two behave alike. Here the whole point is that they behave differently, so the reader is told to expect agreement and finds opposition.",
        usePrompt:
          "Write two sentences comparing two places you have worked or studied, using in contrast to open the second.",
      },
      {
        word: "whereas",
        relationship: "Contrast",
        meaning:
          "Joins two contrasting clauses inside one sentence. Unlike however, it does not start a new sentence.",
        example:
          "The bus fare is lower, whereas the train arrives when it says it will.",
        confusedWith: "because",
        whyWrong:
          "Because claims one clause causes the other. The train's reliability is not caused by the bus fare — the sentence is holding two facts against each other, not explaining one by the other.",
        usePrompt:
          "Write one sentence using whereas to contrast two options you have chosen between.",
      },
      {
        word: "nevertheless",
        relationship: "Contrast (concession)",
        meaning:
          "Concedes a point and then goes on anyway. It means 'that is true, and it does not change my conclusion.'",
        example:
          "The training costs the company several thousand dollars. Nevertheless, replacing the employee would cost more.",
        confusedWith: "furthermore",
        whyWrong:
          "Furthermore promises another point on the same side. Nevertheless is doing the opposite job — granting the objection before overriding it.",
        usePrompt:
          "Write two sentences where the first admits a real drawback and the second begins with Nevertheless.",
      },
      {
        word: "furthermore",
        relationship: "Addition",
        meaning:
          "Adds another point on the same side of the argument, usually a stronger one.",
        example:
          "Fare collection costs money to administer. Furthermore, it slows boarding at every stop.",
        confusedWith: "however",
        whyWrong:
          "However promises a contrast. Both sentences argue against fare collection, so the reader is braced for a reversal that never comes.",
        usePrompt:
          "Write two sentences arguing for something you believe, using Furthermore to add your second reason.",
      },
      {
        word: "moreover",
        relationship: "Addition",
        meaning:
          "Close to furthermore, slightly more formal. Adds a point that raises the stakes rather than merely listing another.",
        example:
          "The office lost two clerks to a hiring freeze. Moreover, online requests continued to rise throughout the same period.",
        confusedWith: "nevertheless",
        whyWrong:
          "Nevertheless concedes and reverses. Nothing is being conceded here — the second sentence makes the problem worse, not better.",
        usePrompt:
          "Write two sentences about a problem, using Moreover to add the detail that makes it harder.",
      },
      {
        word: "similarly",
        relationship: "Comparison",
        meaning:
          "Signals that a second case behaves the same way as the first. The reader will look for the parallel, so make sure there is one.",
        example:
          "A warehouse can shift equipment runs to the night. Similarly, a bottling plant can move a production line off peak hours.",
        confusedWith: "in contrast",
        whyWrong:
          "In contrast promises opposition. Both examples are doing the same thing, so the reader hunts for a difference that is not there.",
        usePrompt:
          "Write two sentences describing two people or places that handle something the same way, joining them with Similarly.",
      },
    ],
  },

  {
    number: 2,
    week: 4,
    title: "Cause, result, and example",
    focus:
      "Showing that one thing follows from another — and proving a general claim with a specific case.",
    spirals: true,
    words: [
      {
        word: "therefore",
        relationship: "Cause and effect",
        meaning:
          "States that what follows is a logical consequence of what came before. Semicolon before, comma after, when joining two sentences.",
        example:
          "Fares cover a substantial share of the operating budget; therefore, removing them requires a replacement source.",
        confusedWith: "however",
        whyWrong:
          "However promises a contrast. The second clause follows from the first rather than opposing it, so however sends the reader looking for a reversal.",
        usePrompt:
          "Write one sentence where a fact leads to a conclusion, joined by therefore.",
      },
      {
        word: "consequently",
        relationship: "Cause and effect",
        meaning:
          "Names a result, usually one that follows in the world rather than in an argument.",
        example:
          "Two clerks were never replaced. Consequently, average wait times reached three hours.",
        confusedWith: "for instance",
        whyWrong:
          "For instance promises an example of a general claim. The wait times are not an example of losing clerks — they are what losing clerks caused.",
        usePrompt:
          "Write two sentences where something changed and Consequently opens the outcome.",
      },
      {
        word: "as a result",
        relationship: "Cause and effect",
        meaning:
          "The plainest way to mark a consequence. Less formal than consequently and just as precise.",
        example:
          "The clinic moved several midday slots into an evening block. As a result, it expects fewer unused appointments.",
        confusedWith: "nevertheless",
        whyWrong:
          "Nevertheless concedes and reverses. Nothing is being conceded — the second sentence is the intended effect of the first.",
        usePrompt:
          "Write two sentences about a change you made and what followed, using As a result.",
      },
      {
        word: "thus",
        relationship: "Cause and effect",
        meaning:
          "A compact therefore. Useful when a sentence is already long and another clause would overload it.",
        example:
          "Boarding is the slowest part of a route; thus, any change that speeds it up shortens the whole trip.",
        confusedWith: "meanwhile",
        whyWrong:
          "Meanwhile marks two things happening at the same time. There is no simultaneity here — the second clause is the conclusion drawn from the first.",
        usePrompt:
          "Write one sentence using thus to draw a short conclusion from a fact.",
      },
      {
        word: "for instance",
        relationship: "Illustration",
        meaning:
          "Introduces a specific case of a general claim. Whatever follows must be an actual example, not another general statement.",
        example:
          "Some large customers can reduce usage on demand. A bottling plant, for instance, can shift a production run to the night.",
        confusedWith: "therefore",
        whyWrong:
          "Therefore promises a consequence. The bottling plant is not caused by the general claim; it is one case of it.",
        usePrompt:
          "Write a general claim about your field of work or study, then a second sentence giving one concrete case with for instance.",
      },
      {
        word: "specifically",
        relationship: "Illustration",
        meaning:
          "Narrows from the general to the exact. Signals that you are about to get more precise, not merely add another point.",
        example:
          "The figure shows a clear pattern. Specifically, unused slots peak at 29 percent around noon.",
        confusedWith: "furthermore",
        whyWrong:
          "Furthermore promises a separate additional point. This sentence is not separate — it is the same point, stated exactly.",
        usePrompt:
          "Write two sentences where the second uses Specifically to put a number or a name on the first.",
      },
      {
        word: "in other words",
        relationship: "Restatement",
        meaning:
          "Restates a difficult idea more plainly. Use it once; a paragraph that needs it twice should be rewritten instead.",
        example:
          "The margin between supply and demand is thin on those afternoons. In other words, there is very little room for anything to go wrong.",
        confusedWith: "as a result",
        whyWrong:
          "As a result promises a consequence. The second sentence is not a consequence of the first — it is the same statement in simpler words.",
        usePrompt:
          "Write a sentence with a technical or difficult idea from your program, then restate it plainly using In other words.",
      },
    ],
  },

  {
    number: 3,
    week: 5,
    title: "Sequence and emphasis",
    focus:
      "Ordering steps a reader has to follow, and marking which point matters most.",
    spirals: true,
    words: [
      {
        word: "first",
        relationship: "Sequence",
        meaning:
          "Opens an ordered series. If you write first, the reader will wait for a second — so make sure one arrives.",
        example:
          "First, underline the verb in the prompt. Then write a claim that uses that verb.",
        confusedWith: "finally",
        whyWrong:
          "Finally marks the last item. Opening a sequence with it tells the reader the list is over before it starts.",
        usePrompt:
          "Write the first two steps of a process you know well, using First and Then.",
      },
      {
        word: "next",
        relationship: "Sequence",
        meaning:
          "Moves to the following step. Neutral about importance — it marks order only.",
        example:
          "Next, find the single best piece of evidence in the passage.",
        confusedWith: "however",
        whyWrong:
          "However promises a contrast. A step in a sequence does not oppose the step before it; it follows from it.",
        usePrompt:
          "Write the middle step of a process at your job or school, opening with Next.",
      },
      {
        word: "finally",
        relationship: "Sequence",
        meaning:
          "Marks the last item in a series. Not the same as in conclusion, which closes an argument rather than a list.",
        example:
          "Finally, reread only your claim and your explanation to check that they still answer the question.",
        confusedWith: "first",
        whyWrong:
          "First opens a series. Using it on the last step leaves the reader waiting for items that never come.",
        usePrompt:
          "Write the last step of a process you know, opening with Finally.",
      },
      {
        word: "meanwhile",
        relationship: "Simultaneity",
        meaning:
          "Two things happening at the same time, often pulling against each other.",
        example:
          "Walk-in traffic dropped after the online system launched. Meanwhile, online requests kept climbing.",
        confusedWith: "consequently",
        whyWrong:
          "Consequently claims one caused the other. These two trends ran at the same time; the sentence is not making a causal claim.",
        usePrompt:
          "Write two sentences about two things happening at once where you work or study, joining them with Meanwhile.",
      },
      {
        word: "above all",
        relationship: "Emphasis",
        meaning:
          "Marks the most important item. Use it once per piece of writing — a second one cancels the first.",
        example:
          "The response must be specific, ordered, and correctly punctuated. Above all, it must answer the question that was asked.",
        confusedWith: "similarly",
        whyWrong:
          "Similarly claims the item is like the others. Above all claims the opposite — that this one outweighs them.",
        usePrompt:
          "List two things that matter in your work, then use Above all to name the one that matters most.",
      },
      {
        word: "in particular",
        relationship: "Emphasis",
        meaning:
          "Singles out one member of a group just named, without claiming it is the most important overall.",
        example:
          "Several slots went unused. The noon appointments, in particular, were missed nearly a third of the time.",
        confusedWith: "in contrast",
        whyWrong:
          "In contrast sets two things against each other. The noon slots are part of the group just mentioned, not the opposite of it.",
        usePrompt:
          "Name a group of things, then single one out with in particular.",
      },
      {
        word: "indeed",
        relationship: "Emphasis",
        meaning:
          "Confirms and strengthens what was just said, often with sharper evidence.",
        example:
          "The early appointments performed well. Indeed, the 8 a.m. slots had the lowest no-show rate of the day.",
        confusedWith: "nevertheless",
        whyWrong:
          "Nevertheless concedes and reverses. Indeed does not reverse anything — it doubles down on the point just made.",
        usePrompt:
          "Write a claim, then a second sentence starting with Indeed that gives your strongest support for it.",
      },
    ],
  },

  {
    number: 4,
    week: 6,
    title: "Concession and condition",
    focus:
      "Granting the other side a point, and stating what your claim depends on. These are the words that make an argument sound fair.",
    spirals: true,
    words: [
      {
        word: "although",
        relationship: "Concession",
        meaning:
          "Opens a dependent clause that grants a point before the main claim arrives. What follows the comma is what you actually mean.",
        example:
          "Although free fares would speed up boarding, the lost revenue still has to be replaced.",
        confusedWith: "because",
        whyWrong:
          "Because claims the first clause causes the second. Faster boarding does not cause a revenue problem — the sentence is conceding one point and holding another.",
        usePrompt:
          "Write one sentence using Although to grant a point before making your own.",
      },
      {
        word: "admittedly",
        relationship: "Concession",
        meaning:
          "Openly grants a weakness in your own position. Used well, it makes the rest of the argument more credible, not less.",
        example:
          "Admittedly, the figure covers only one clinic and one year.",
        confusedWith: "therefore",
        whyWrong:
          "Therefore claims a conclusion follows. This sentence is conceding a limit on the evidence, which is the opposite of drawing a conclusion from it.",
        usePrompt:
          "Write one sentence that admits a real limit of something you believe, starting with Admittedly.",
      },
      {
        word: "granted",
        relationship: "Concession",
        meaning:
          "A short, conversational concession. Signals 'I accept that' before you go on to your point.",
        example:
          "Granted, the training costs money up front. The alternative costs more over a year.",
        confusedWith: "furthermore",
        whyWrong:
          "Furthermore adds a point on your own side. Granted does the opposite — it hands a point to the other side first.",
        usePrompt:
          "Write two sentences where the first concedes an objection with Granted and the second answers it.",
      },
      {
        word: "on the other hand",
        relationship: "Contrast (balance)",
        meaning:
          "Introduces the second of two balanced views. It expects an 'on the one hand' before it, stated or implied.",
        example:
          "The bus is cheaper and stops nearer my door. On the other hand, it has never once arrived when scheduled.",
        confusedWith: "as a result",
        whyWrong:
          "As a result promises a consequence. The bus's unreliability is not caused by its low fare — the sentence is weighing two sides.",
        usePrompt:
          "Write two sentences weighing a choice you face, using On the other hand to open the second.",
      },
      {
        word: "unless",
        relationship: "Condition",
        meaning:
          "States the one circumstance that would undo your claim. Precise and useful — it shows exactly where your position ends.",
        example:
          "The evening block will not reduce missed appointments unless patients are told about it directly.",
        confusedWith: "because",
        whyWrong:
          "Because gives a reason the claim is true. Unless names the exception that would make it false — nearly the reverse.",
        usePrompt:
          "Write one sentence stating something that will happen unless one specific condition is met.",
      },
      {
        word: "provided that",
        relationship: "Condition",
        meaning:
          "States what must be true for your claim to hold. The positive counterpart of unless.",
        example:
          "Removing fares would speed up every route, provided that the service keeps running as often as it does now.",
        confusedWith: "although",
        whyWrong:
          "Although concedes a point that does not change the claim. Provided that names a condition the claim actually depends on.",
        usePrompt:
          "Write one sentence where your claim holds only if a condition is met, using provided that.",
      },
      {
        word: "regardless",
        relationship: "Concession (dismissal)",
        meaning:
          "Says the objection just raised does not change the outcome. Stronger than nevertheless and slightly blunter.",
        example:
          "The cost estimate may be too low. Regardless, the position needs to be filled before the fall term.",
        confusedWith: "similarly",
        whyWrong:
          "Similarly claims two things are alike. Regardless is dismissing the first point's relevance, not comparing it to anything.",
        usePrompt:
          "Write two sentences where the second uses Regardless to set aside the objection in the first.",
      },
    ],
  },

  {
    number: 5,
    week: 7,
    title: "Summary and conclusion",
    focus:
      "Closing a piece of writing so the last sentence lands, rather than trailing off or simply repeating the first.",
    spirals: true,
    words: [
      {
        word: "in conclusion",
        relationship: "Conclusion",
        meaning:
          "Signals the closing of an argument. Use it once, and only where a genuine conclusion follows — not as a synonym for finally.",
        example:
          "In conclusion, the library's funding should be judged against everything the branch actually does.",
        confusedWith: "finally",
        whyWrong:
          "Finally marks the last item in a list. In conclusion closes a whole argument — swapping them makes a conclusion read like one more bullet point.",
        usePrompt:
          "Write the closing sentence of an argument you care about, opening with In conclusion.",
      },
      {
        word: "overall",
        relationship: "Summary",
        meaning:
          "Steps back and characterizes the whole. Useful after several specific points, when the reader needs the shape of them.",
        example:
          "Overall, the pattern in the figure runs opposite to what the staff expected.",
        confusedWith: "for instance",
        whyWrong:
          "For instance narrows to one case. Overall does the reverse — it widens from the cases to the pattern they make.",
        usePrompt:
          "Write two or three specific facts about something, then a sentence beginning Overall that names the pattern.",
      },
      {
        word: "in short",
        relationship: "Summary",
        meaning:
          "Compresses what you have just said into one line. What follows must genuinely be shorter than what preceded it.",
        example:
          "In short, the store mattered to the block more than its sales ever showed.",
        confusedWith: "moreover",
        whyWrong:
          "Moreover adds a new point. In short adds nothing new — it condenses what is already there.",
        usePrompt:
          "Explain something in two sentences, then compress it into one beginning In short.",
      },
      {
        word: "ultimately",
        relationship: "Conclusion",
        meaning:
          "Points to what matters in the end, after the details are accounted for. Marks a judgement, not a summary.",
        example:
          "Ultimately, the question is not whether free fares help riders but how the service gets paid for.",
        confusedWith: "meanwhile",
        whyWrong:
          "Meanwhile marks simultaneous events. Ultimately marks the final judgement — there is no time relationship being claimed here.",
        usePrompt:
          "Write one sentence naming what ultimately matters most about a decision you have made.",
      },
      {
        word: "on balance",
        relationship: "Conclusion (weighing)",
        meaning:
          "Announces a judgement made after weighing both sides. It implies you have genuinely considered the other one.",
        example:
          "On balance, the extra dollar buys a morning I can plan around.",
        confusedWith: "above all",
        whyWrong:
          "Above all names the single most important item. On balance names a judgement reached by weighing several — it is a conclusion, not a ranking.",
        usePrompt:
          "Weigh two options in a sentence, then reach a verdict in a second sentence beginning On balance.",
      },
      {
        word: "as noted",
        relationship: "Reference back",
        meaning:
          "Points the reader back to something you already established, so you do not have to prove it twice.",
        example:
          "As noted, the figure records when slots went unused, not why.",
        confusedWith: "in contrast",
        whyWrong:
          "In contrast promises opposition to what came before. As noted does the opposite — it agrees with and recalls what came before.",
        usePrompt:
          "Write two sentences where the second uses As noted to recall a point from the first.",
      },
      {
        word: "given that",
        relationship: "Cause (premise)",
        meaning:
          "States an accepted fact your conclusion rests on. Signals that you are reasoning from something already agreed.",
        example:
          "Given that fares cover much of the budget, eliminating them is a budget decision before it is a transit one.",
        confusedWith: "unless",
        whyWrong:
          "Unless names an exception that would defeat the claim. Given that names a premise the claim is built on — the reverse role.",
        usePrompt:
          "Write one sentence that reasons from an accepted fact, opening with Given that.",
      },
    ],
  },
];

export function getDeckByNumber(n: number): TransitionDeck | undefined {
  return transitionDecks.find((deck) => deck.number === n);
}

/** Decks released on or before a given course week. */
export function decksReleasedBy(week: number): TransitionDeck[] {
  return transitionDecks.filter((deck) => deck.week <= week);
}

export const transitionWordTotal = transitionDecks.reduce(
  (sum, deck) => sum + deck.words.length,
  0
);
