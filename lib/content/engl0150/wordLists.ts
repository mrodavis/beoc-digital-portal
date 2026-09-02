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
  {
    number: 6,
    topicNumber: 6,
    spirals: true,
    words: [
      { word: "once", meaning: "One time.", example: "Change the bandage once a day.", confusedWith: "ones" },
      { word: "ones", meaning: "Plural of 'one', standing in for a noun already named.", example: "Use the clean ones from the box.", confusedWith: "once" },
      { word: "consent", meaning: "Permission given after the risks and benefits have been explained.", example: "Written consent was obtained before the procedure." },
      { word: "concern", meaning: "A worry, or something that matters to someone.", example: "The patient's main concern was the cost." },
      { word: "cleanse", meaning: "To clean thoroughly.", example: "Cleanse the area gently with soap and water." },
      { word: "bandage", meaning: "A covering placed over a wound.", example: "Put on a new bandage after the skin is dry." },
      { word: "gauze", meaning: "Thin, loosely woven fabric used on wounds.", example: "Cover the wound with sterile gauze." },
      { word: "nourishment", meaning: "Food and drink that supports health and healing.", example: "Adequate nourishment helps a wound heal." },
      { word: "follow-up", meaning: "A later visit or contact to check on progress.", example: "Her follow-up is scheduled for two weeks from today." },
    ],
  },
  {
    number: 7,
    topicNumber: 7,
    spirals: true,
    words: [
      { word: "reminder", meaning: "A message prompting someone about something upcoming.", example: "We send a reminder two days before each appointment." },
      { word: "reschedule", meaning: "To move something to a different time.", example: "Call us if you need to reschedule." },
      { word: "confirm", meaning: "To state definitely that something is correct or arranged.", example: "Please confirm that you received this message." },
      { word: "available", meaning: "Able to be used, or free at a given time.", example: "The next available appointment is Tuesday at 10:00." },
      { word: "referral", meaning: "Sending a patient to another provider for specialist care.", example: "The referral was sent to orthopedics on Monday." },
    ],
  },
  {
    number: 8,
    topicNumber: 8,
    spirals: true,
    words: [
      { word: "authorization", meaning: "Formal approval from a payer before a service is provided.", example: "Prior authorization was obtained before scheduling." },
      { word: "specialist", meaning: "A provider who focuses on one area of medicine.", example: "She was referred to a specialist for her knee." },
      { word: "documentation", meaning: "The written record of what was observed, reported, and done.", example: "Documentation of the phone call was added to the chart." },
      { word: "eligibility", meaning: "Whether a patient's coverage applies to a service.", example: "Eligibility was verified at check-in." },
      { word: "relevant", meaning: "Directly connected to the matter at hand.", example: "Include only the history relevant to this referral." },
    ],
  },
  {
    number: 9,
    topicNumber: 9,
    spirals: true,
    words: [
      { word: "regarding", meaning: "About; concerning.", example: "I am writing regarding Thursday's supply order." },
      { word: "request", meaning: "To ask for something, or the act of asking.", example: "Please send the codes at your earliest convenience — this is a time-sensitive request." },
      { word: "attachment", meaning: "A file sent along with an email.", example: "The order form is included as an attachment." },
      { word: "available", meaning: "Free at a given time, or able to be obtained.", example: "I am available Tuesday afternoon if you would like to discuss it." },
      { word: "schedule", meaning: "A plan of times, or to arrange a time.", example: "We will schedule the training for next Thursday." },
      { word: "response", meaning: "A reply.", example: "I would appreciate a response before Wednesday." },
      { word: "accurately", meaning: "In a way that is correct in every detail.", example: "Please record the item codes accurately." },
    ],
  },
  {
    number: 10,
    topicNumber: 101,
    spirals: true,
    words: [
      { word: "dosage", meaning: "The amount of a medication and how often it is taken.", example: "The dosage was checked against the order before administration." },
      { word: "prescribed", meaning: "Ordered by a provider authorized to do so.", example: "Take only the dose prescribed for you." },
      { word: "administered", meaning: "Given to a patient.", example: "The injection was administered at 0930." },
      { word: "frequency", meaning: "How often something happens.", example: "Record the frequency as well as the dose." },
      { word: "reaction", meaning: "The body's response to a substance.", example: "Any reaction is documented and reported immediately." },
    ],
  },
  {
    number: 11,
    topicNumber: 102,
    spirals: true,
    words: [
      { word: "confidential", meaning: "Meant to be kept private and shared only with those who need it.", example: "Patient records are confidential." },
      { word: "privacy", meaning: "A person's right to control who knows information about them.", example: "Close the door to protect the patient's privacy." },
      { word: "disclosure", meaning: "Releasing information to someone.", example: "Every disclosure must have a purpose that justifies it." },
    ],
  },
  {
    number: 12,
    topicNumber: 103,
    spirals: true,
    words: [
      { word: "eligibility", meaning: "Whether a patient's coverage applies to a service.", example: "Eligibility is verified before every visit." },
      { word: "deductible", meaning: "The amount a patient pays before their plan begins paying.", example: "Her deductible resets in January." },
      { word: "authorization", meaning: "Formal approval from a payer before a service is provided.", example: "Authorization was obtained before the procedure was scheduled." },
    ],
  },
  {
    number: 13,
    topicNumber: 104,
    spirals: true,
    words: [
      { word: "acknowledge", meaning: "To recognize and respond to what someone has said or felt.", example: "Acknowledge the frustration before explaining the policy." },
      { word: "apologize", meaning: "To express regret.", example: "Apologize for the impact without accepting blame you do not own." },
      { word: "escalate", meaning: "To raise something to someone with more authority, or to make worse.", example: "Escalate the complaint to the practice manager." },
      { word: "resolve", meaning: "To settle or fix.", example: "We will resolve the billing error this week." },
    ],
  },
  {
    number: 14,
    topicNumber: 10,
    spirals: true,
    words: [
      { word: "revision", meaning: "Changing what a piece of writing says or how it is organized.", example: "The revision cut two paragraphs and reordered the rest." },
      { word: "proofread", meaning: "To check writing for errors in grammar, spelling, and punctuation.", example: "Proofread the letter after you have finished revising it." },
      { word: "accuracy", meaning: "Being correct in every detail.", example: "Accuracy matters more than speed in a patient message." },
      { word: "evaluate", meaning: "To judge the value or correctness of something.", example: "Evaluate each AI suggestion before you accept it." },
      { word: "suggestion", meaning: "An idea put forward for consideration, which you may accept or reject.", example: "The tool made six suggestions; I accepted four." },
      { word: "responsibility", meaning: "Being accountable for something.", example: "Responsibility for the final content stays with you." },
      { word: "confidentiality", meaning: "Keeping information private and sharing it only with those who need it.", example: "Confidentiality rules apply to anything you paste into an AI tool." },
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
