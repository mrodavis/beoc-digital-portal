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
  {
    number: 3,
    topicNumber: 3,
    spirals: true,
    words: [
      { word: "evidence", meaning: "Facts or observations that support a conclusion.", example: "The note recorded the evidence rather than the assistant's opinion." },
      { word: "Wednesday", meaning: "The third day of the working week. Note the silent 'd'.", example: "Her follow-up was scheduled for Wednesday morning." },
      { word: "dilated", meaning: "Widened or enlarged.", example: "The provider documented that the pupils were dilated." },
      { word: "nauseous", meaning: "Feeling sick to the stomach.", example: "The patient reported feeling nauseous after the medication." },
      { word: "consciousness", meaning: "The state of being awake and aware of surroundings.", example: "Any change in consciousness is reported to the nurse immediately." },
    ],
  },
  {
    number: 4,
    topicNumber: 4,
    spirals: true,
    words: [
      { word: "assessment", meaning: "A clinical judgment based on the findings gathered.", example: "The assessment section of the note belongs to the provider." },
      { word: "complaint", meaning: "The problem or symptom a patient reports.", example: "The chief complaint was a sore throat lasting three days." },
      { word: "documentation", meaning: "The written record of what was observed, reported, and done.", example: "Accurate documentation protects the patient and the practice." },
      { word: "relevant", meaning: "Directly connected to the matter at hand.", example: "Keep the note to information relevant to this visit." },
      { word: "acute", meaning: "Beginning suddenly and lasting a short time.", example: "The patient presented with acute abdominal pain." },
      { word: "dosage", meaning: "The amount of a medication to be taken and how often.", example: "The dosage was confirmed against the order before administration." },
    ],
  },
  {
    number: 5,
    topicNumber: 5,
    spirals: true,
    words: [
      { word: "allergy", meaning: "A harmful immune reaction to a substance. Plural: allergies.", example: "Her allergy to penicillin is recorded on her wristband." },
      { word: "symptom", meaning: "Something the patient experiences and reports.", example: "The most concerning symptom was shortness of breath." },
      { word: "seizure", meaning: "A sudden burst of abnormal electrical activity in the brain.", example: "Time the seizure and protect the patient's head." },
      { word: "swelling", meaning: "An abnormal enlargement of a body part.", example: "Swelling was noted in the right ankle." },
      { word: "diarrhea", meaning: "Frequent loose or watery stools.", example: "Sudden watery diarrhea is reported promptly." },
      { word: "hemorrhage", meaning: "Heavy or uncontrolled bleeding.", example: "Any suspected hemorrhage is escalated immediately." },
      { word: "recommendation", meaning: "What you are asking the receiver to do.", example: "The recommendation closes an SBAR handoff." },
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
