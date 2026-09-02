import { Topic } from "@/types/engl0150";

/**
 * TOPIC 7 — Patient Messages, Reminders & Follow-Up (1–2 sessions)
 *
 * The guide names this an explicit spiral topic: its Grammar Focus is
 * "revisit earlier grammar topics" without listing specific items. The page
 * renders the spiral banner and a placeholder asking the instructor which
 * items to prioritize.
 */
export const topic7: Topic = {
  number: 7,
  slug: "7",
  title: "Patient Messages, Reminders & Follow-Up",
  unit: { number: 3, title: "Patient Communication" },
  sessions: "1–2",
  goals: ["patient-centered", "professional-writing", "grammar-sentence"],
  spiralsFrom: [2, 3, 6],

  essentialQuestion:
    "How can I communicate important information briefly without sounding abrupt or unclear?",

  concepts: [
    "Concise writing — short is not the same as curt",
    "Essential versus unnecessary information: what does the reader need to act?",
    "Professional tone in a very short message, where there is no room to recover from a bad line",
    "Patient-centered language",
    "A call to action — every message should make clear what happens next and who does it",
    "Confirming understanding without sounding like a test",
  ],

  grammar: {
    note: "The Instructor's Guide directs this topic to revisit earlier grammar rather than introduce new items, and does not specify which. The practice below spirals subject–verb agreement, fragments and run-ons, and pronoun clarity from Topics 2, 3, and 6. Confirm which items should be prioritized here.",
  },

  wordListNumber: 7,

  practice: [
    {
      kind: "choose-best",
      title: "Too much, too little, or just right?",
      scenario:
        "A patient is due for a follow-up appointment on Tuesday 14 October at 10:00 a.m. with Dr. Reyes. They need to arrive 15 minutes early and bring their current medication list. You are writing the reminder message they will see in the patient portal.",
      instructions:
        "One of these is right. The others fail in a specific way — read every explanation.",
      items: [
        {
          id: "t7-c1",
          prompt: "Which reminder should you send?",
          principle:
            "A good reminder carries exactly what the patient must know to show up correctly: when, where, and what to bring. Anything else competes with those three.",
          choices: [
            {
              text: "Appointment Tuesday 10am.",
              correct: false,
              rationale:
                "Too little. No date, no provider, no arrival time, nothing about the medication list. The patient may arrive on the wrong Tuesday.",
            },
            {
              text: "Hello, we hope this message finds you well. We are writing to remind you that as part of our ongoing commitment to your continued health and wellbeing, we have you scheduled for a follow-up consultation appointment with one of our providers here at the practice. Please make every effort to arrive in a timely manner and bring along any relevant materials.",
              correct: false,
              rationale:
                "Too much, and it still omits the date, the time, the provider, and what to bring. Length is not the same as completeness.",
            },
            {
              text: "Reminder: follow-up with Dr. Reyes on Tuesday, 14 October at 10:00 a.m. Please arrive by 9:45 and bring your current medication list. Call 555-0134 if you need to reschedule.",
              correct: true,
              rationale:
                "Correct. Date, time, provider, arrival time, what to bring, and what to do if it does not work — in four lines.",
            },
            {
              text: "You have an appointment coming up soon. Don't forget to bring everything you need and don't be late.",
              correct: false,
              rationale:
                "Vague on every point and faintly scolding. 'Don't be late' reads as an accusation rather than an arrival time.",
            },
          ],
        },
        {
          id: "t7-c2",
          prompt:
            "The patient replies asking whether they still need to fast. Fasting is not required. Which reply is best?",
          principle:
            "Answer the question first, then add anything else. A reply that buries the answer makes the patient read twice to find it.",
          choices: [
            {
              text: "No.",
              correct: false,
              rationale:
                "Accurate and abrupt. A one-word reply to a worried question reads as dismissive, even when it is correct.",
            },
            {
              text: "No fasting is needed for this visit — you can eat and drink normally. Please still bring your medication list. See you Tuesday at 10:00.",
              correct: true,
              rationale:
                "Correct. Answers the question in the first four words, confirms what that means in practice, and repeats the key details.",
            },
            {
              text: "Thanks for reaching out! Great question. Let me look into that for you and get back to you as soon as I can.",
              correct: false,
              rationale:
                "Warm but useless — you already know the answer. Delaying a known answer wastes the patient's time and yours.",
            },
            {
              text: "Fasting requirements vary by procedure type and are determined by the ordering provider based on the clinical indication.",
              correct: false,
              rationale:
                "True in general and no help at all. The patient asked about their appointment, not about policy.",
            },
          ],
        },
      ],
    },
    {
      kind: "tone",
      title: "Tone continuum",
      instructions:
        "Place each message, then rewrite the ones that miss. Watch the over-soft end as carefully as the blunt end.",
      samples: [
        {
          id: "t7-t1",
          text: "You missed your appointment yesterday. You need to call and reschedule.",
          band: 0,
          feedback:
            "Blunt. It opens with the patient's failure and issues an order. Nothing here is untrue, and most people receiving it would feel told off.",
          professional:
            "We missed you at yesterday's appointment. When you have a moment, call us at 555-0134 and we will find a new time that works.",
        },
        {
          id: "t7-t2",
          text: "Your results are in. Call the office.",
          band: 1,
          feedback:
            "Abrupt, and in this context genuinely worrying — a patient reading it will assume the news is bad. Two more words would fix it.",
          professional:
            "Your test results are back and Dr. Reyes would like to go over them with you. Please call us at 555-0134 when you can. There is nothing urgent to worry about.",
        },
        {
          id: "t7-t3",
          text: "Hi Ms. Alvarez — your prescription is ready for pickup at the front desk any time before 5:00 p.m. this week. Let us know if you need it sent to your pharmacy instead.",
          band: 2,
          feedback:
            "Professional. Warm opening, specific information, a clear deadline, and an alternative offered. Nothing wasted.",
        },
        {
          id: "t7-t4",
          text: "Hi there! I hope you don't mind me reaching out, and I'm so sorry to bother you — I was just wondering if you might possibly have a moment at some point to maybe think about scheduling that follow-up we mentioned, if that's at all convenient for you?",
          band: 3,
          feedback:
            "Over-soft. So hedged that the patient may not realize anything is being asked. Apologizing for doing your job also undercuts you.",
          professional:
            "Hi Ms. Alvarez — it is time to book your follow-up. Call us at 555-0134 or reply here and we will get it scheduled.",
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Spiral review",
      instructions:
        "Grammar from Topics 2, 3, and 6, in the short messages you are writing now.",
      items: [
        {
          id: "t7-g1",
          prompt: "Which message has correct subject–verb agreement?",
          principle:
            "Spiral from Topic 2. A phrase between subject and verb does not change which verb you need.",
          choices: [
            {
              text: "The list of your current medications are needed at check-in.",
              correct: false,
              rationale:
                "The subject is 'list', which is singular, so it takes 'is'. 'Medications' sits inside a phrase.",
            },
            {
              text: "The list of your current medications is needed at check-in.",
              correct: true,
              rationale: "Correct. Singular subject 'list' takes 'is'.",
            },
            {
              text: "The lists of your current medication is needed at check-in.",
              correct: false,
              rationale: "Here the plural 'lists' would need 'are'.",
            },
            {
              text: "Your current medications list are needed at check-in.",
              correct: false,
              rationale: "'List' is still the subject and still singular.",
            },
          ],
        },
        {
          id: "t7-g2",
          prompt: "Which message avoids an unclear pronoun?",
          principle:
            "Spiral from Topic 3. In a short message there is no context to recover a pronoun's meaning from.",
          choices: [
            {
              text: "We sent your results to Dr. Reyes and she will call you about it.",
              correct: false,
              rationale:
                "'It' has no clear referent — the results, the call, or something else. In a two-line message this is genuinely confusing.",
            },
            {
              text: "We sent your results to Dr. Reyes, and she will call you to discuss them.",
              correct: true,
              rationale: "Correct. 'Them' clearly refers to the results, and 'she' to Dr. Reyes.",
            },
            {
              text: "They sent them to her and she will call you about them.",
              correct: false,
              rationale: "Four pronouns, none anchored.",
            },
            {
              text: "It was sent and they will be in touch about it.",
              correct: false,
              rationale: "No named actor at all. The patient learns nothing.",
            },
          ],
        },
        {
          id: "t7-g3",
          prompt:
            "Which of these is a fragment that should not be sent as written?",
          principle:
            "Spiral from Topic 6. Fragments work in a bulleted list. In running message text they leave the reader waiting.",
          choices: [
            {
              text: "Because your insurance information has changed.",
              correct: true,
              rationale:
                "Correct — this is the fragment. It begins with 'because' and never says what follows from it. The patient is left waiting for the point.",
            },
            {
              text: "Please bring your new insurance card to your next visit.",
              correct: false,
              rationale: "A complete imperative sentence.",
            },
            {
              text: "Your insurance information has changed, so please bring your new card.",
              correct: false,
              rationale: "Two clauses correctly joined by a comma and 'so'.",
            },
            {
              text: "Bring your new card.",
              correct: false,
              rationale:
                "Short but complete — an imperative with the subject 'you' understood.",
            },
          ],
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 7 },
  ],

  product: {
    label: "Patient portal message",
    description:
      "Write a patient portal message about an appointment, a follow-up, a preparation requirement, or missing information. Two to four sentences. It must answer the patient's likely question first, state clearly what happens next, and sound like a person wrote it.",
    scenario:
      "A patient's insurance changed since their last visit and the front desk could not verify coverage for Thursday's appointment. The visit can still go ahead, but they need to bring the new card, and if coverage cannot be verified they may be billed as self-pay. Write the message they will see.",
  },

  reflection: [
    "Read your message as though you were worried about your health. Does the first line reassure or alarm?",
    "Is the action you want the patient to take stated, or implied?",
    "Could you cut a sentence without losing anything the patient needs?",
  ],

  beforeYouLeave: [
    "Completed the too-much / too-little / just-right exercise",
    "Placed all four messages on the tone continuum and rewrote the three that missed",
    "Completed the spiral grammar review",
    "Drafted the portal message and checked it against the Communication Check",
  ],
};
