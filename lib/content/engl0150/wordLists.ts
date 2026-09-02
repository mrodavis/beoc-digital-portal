import { WordList } from "@/types/engl0150";

/**
 * The Healthcare Word Bank.
 *
 * Word lists come from the Instructor's Guide and are authoritative. The
 * meanings and healthcare example sentences are written for this site to make
 * the cards usable; they implement the guide's lists rather than extending them.
 *
 * Lists spiral: from List 2 onward, earlier lists remain available for review.
 */
export const wordLists: WordList[] = [
  {
    number: 1,
    topicNumber: 1,
    spirals: false,
    words: [
      {
        word: "professional",
        meaning:
          "Meeting the standards of conduct, appearance, and communication expected in a workplace.",
        example:
          "She kept a professional tone in the message even though the caller was upset.",
      },
      {
        word: "communication",
        meaning:
          "Sending and receiving information so that the other person understands it.",
        example:
          "Clear communication at handoff keeps the next shift from missing something.",
      },
      {
        word: "patient",
        meaning: "A person receiving medical care.",
        example: "The patient arrived early for a scheduled blood draw.",
        confusedWith: "patience",
      },
      {
        word: "healthcare",
        meaning:
          "The services provided to maintain or restore physical and mental health.",
        example: "Every healthcare worker on the unit completed the training.",
      },
      {
        word: "accurate",
        meaning: "Correct in every detail; free from error.",
        example: "An accurate record of the time matters if the chart is reviewed later.",
      },
      {
        word: "clear",
        meaning: "Easy to understand, with nothing left ambiguous.",
        example: "Give the patient clear instructions about when to take the medication.",
      },
      {
        word: "appropriate",
        meaning: "Suitable for the situation, the audience, and the setting.",
        example:
          "A short, factual note is appropriate for a shift handoff.",
      },
    ],
  },
  {
    number: 2,
    topicNumber: 2,
    spirals: true,
    words: [
      {
        word: "patient",
        meaning: "A person receiving medical care.",
        example: "The patient asked whether she needed to fast before the test.",
        confusedWith: "patience",
      },
      {
        word: "patience",
        meaning: "The ability to wait or endure difficulty without becoming annoyed.",
        example: "Explaining the form a second time takes patience.",
        confusedWith: "patient",
      },
      {
        word: "appointment",
        meaning: "A scheduled time to be seen by a provider.",
        example: "Her appointment was moved to Wednesday afternoon.",
      },
      {
        word: "procedure",
        meaning:
          "A medical treatment or operation, or an established way of doing something.",
        example: "The provider explained the procedure before obtaining consent.",
      },
      {
        word: "proceed",
        meaning: "To go forward or continue with something.",
        example: "Once consent is documented, the team can proceed.",
        confusedWith: "precede",
      },
      {
        word: "precede",
        meaning: "To come before something else in time or order.",
        example: "Hand hygiene must precede every patient contact.",
        confusedWith: "proceed",
      },
      {
        word: "accommodation",
        meaning:
          "An adjustment made so a person can access a service or perform a task.",
        example:
          "The clinic arranged an accommodation so the patient could use an interpreter.",
      },
    ],
  },
];

export function getWordList(number: number) {
  return wordLists.find((l) => l.number === number);
}

/** Every list before this one, for spiral review. */
export function getSpiralLists(number: number) {
  return wordLists.filter((l) => l.number < number);
}
