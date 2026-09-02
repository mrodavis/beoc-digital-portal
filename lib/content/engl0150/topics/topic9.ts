import { Topic } from "@/types/engl0150";

/** TOPIC 9 — Professional Emails & Workplace Messages (2 sessions) */
export const topic9: Topic = {
  number: 9,
  slug: "9",
  title: "Professional Emails & Workplace Messages",
  unit: { number: 4, title: "Workplace & Team Communication" },
  sessions: "2",
  goals: ["professional-writing", "grammar-sentence"],
  spiralsFrom: [2, 6, 7],

  essentialQuestion:
    "How do I write a message that is professional, clear, and appropriate for the workplace?",

  concepts: [
    "Email structure: subject line, greeting, purpose, detail, action, closing",
    "Subject lines that tell the reader what the message is and whether it needs them",
    "Audience — a message to a supervisor, a coworker, and an outside office are three different messages",
    "Tone that is direct but respectful; directness is not rudeness",
    "Making requests and responding to them",
    "Professional openings and closings, and when 'Hi' is fine",
  ],

  grammar: [
    {
      heading: "Sentence variety and punctuation",
      points: [
        "Commas that separate clauses, items in a series, and introductory phrases",
        "Semicolons joining two complete sentences that belong together",
        "Sentence combining — turning three short sentences into one that reads well",
        "Fragments and run-ons, spiralling from Topics 2 and 6",
      ],
    },
    {
      heading: "Parallel structure",
      points: [
        "Items in a list take the same grammatical form",
        "'Verify insurance, update the chart, and confirm the appointment' — three imperatives",
        "Breaking parallelism makes a list read as though something is missing",
      ],
    },
  ],

  wordListNumber: 9,

  practice: [
    {
      kind: "choose-best",
      title: "Subject-line challenge",
      scenario:
        "You need your supervisor to approve a schedule change for next Thursday so you can attend a required training. You need an answer before Wednesday.",
      instructions:
        "The subject line is the only part some readers will see before deciding when to open your message.",
      items: [
        {
          id: "t9-c1",
          prompt: "Which subject line should you use?",
          principle:
            "A subject line should say what the message is about and, when it matters, what is needed and by when. It is not a greeting.",
          choices: [
            {
              text: "Question",
              correct: false,
              rationale:
                "Tells the reader nothing. In an inbox of forty messages this one gets opened last.",
            },
            {
              text: "Hi!",
              correct: false,
              rationale:
                "A greeting, not a subject. The greeting belongs in the first line of the message.",
            },
            {
              text: "Schedule change request for Thurs 16 Oct — need approval by Wed",
              correct: true,
              rationale:
                "Correct. Says what it is, which date it concerns, what is needed, and the deadline. The reader can triage it without opening it.",
            },
            {
              text: "URGENT!! PLEASE READ ASAP!!!",
              correct: false,
              rationale:
                "Shouting without information. It also spends credibility you will want later for something genuinely urgent.",
            },
          ],
        },
        {
          id: "t9-c2",
          prompt:
            "Your supervisor replies approving it. Which response is appropriate?",
          principle:
            "Close the loop briefly. A reply that confirms receipt and restates the outcome prevents a later disagreement about what was agreed.",
          choices: [
            {
              text: "(no reply)",
              correct: false,
              rationale:
                "Leaves your supervisor unsure you saw it, and leaves no record that you understood the terms.",
            },
            {
              text: "Thank you — confirming I will be off the floor Thursday 16 October from 1:00 to 4:00 for the training, and back for the afternoon clinic.",
              correct: true,
              rationale:
                "Correct. Brief, restates the specifics so any misunderstanding surfaces now, and creates a record.",
            },
            {
              text: "ok thx",
              correct: false,
              rationale:
                "Confirms receipt and nothing else. It is also a register you would not use with a supervisor in person.",
            },
            {
              text: "Thank you so much, I really appreciate you taking the time to consider this, it means a great deal and I am so grateful for your flexibility and support with this and everything else.",
              correct: false,
              rationale:
                "Warm but disproportionate, and it omits the detail that makes the reply useful. Over-thanking reads as anxiety.",
            },
          ],
        },
      ],
    },
    {
      kind: "rewrite",
      title: "Email repair bench",
      instructions:
        "Repair each part of a broken workplace email. Each fix demonstrates one principle.",
      items: [
        {
          id: "t9-r1",
          before: "Subject: (blank)",
          problem:
            "No subject line. The message cannot be triaged, found later, or filed.",
          model:
            "Subject: Supply order for Thursday — need item numbers by Tues 3pm",
          rubric: [
            "States what the message is about",
            "Includes the deadline where one exists",
            "Short enough to read in an inbox list",
            "Contains no all-caps or multiple exclamation marks",
          ],
        },
        {
          id: "t9-r2",
          before:
            "hey so i need those numbers for the order, its kind of urgent, the order goes in thursday and i dont have the item codes from your side yet so can you send them",
          problem:
            "No greeting, no capitalization, run-on structure, missing apostrophes, and the actual request is buried at the end.",
          model:
            "Hi Marcus,\n\nCould you send me the item codes for Thursday's supply order? I have everything else ready and just need those to submit it.\n\nCould you get them to me by 3:00 p.m. Tuesday? That gives me time to check the order before it goes in.\n\nThanks,\nJ.",
          rubric: [
            "Opens with a greeting and names the reader",
            "States the request in the first sentence",
            "Gives a specific deadline and a reason for it",
            "Correct capitalization, apostrophes, and sentence breaks",
            "Closes appropriately",
          ],
        },
        {
          id: "t9-r3",
          before:
            "You need to verify the insurance, updating the chart, and then you should confirm the appointment.",
          problem:
            "The three items are not parallel — an imperative, a gerund, and a 'you should'. The list reads as though something is missing.",
          model:
            "Please verify the insurance, update the chart, and confirm the appointment.",
          rubric: [
            "All three items take the same grammatical form",
            "The list can be read as one instruction",
            "No shift between 'you need to', 'you should', and imperatives",
            "Reads naturally out loud",
          ],
        },
      ],
    },
    {
      kind: "grammar-drill",
      title: "Commas, semicolons, and combining",
      instructions: "The punctuation that makes a workplace message readable.",
      items: [
        {
          id: "t9-g1",
          prompt: "Which sentence uses the semicolon correctly?",
          principle:
            "A semicolon joins two complete sentences that are closely related. If either side could not stand alone, use a comma or a different construction.",
          choices: [
            {
              text: "The order goes in Thursday; please send the codes by Tuesday.",
              correct: true,
              rationale:
                "Correct. Both sides are complete sentences and they belong together.",
            },
            {
              text: "The order goes in Thursday; because I need the codes first.",
              correct: false,
              rationale:
                "The second half is a fragment. A semicolon needs a complete sentence on both sides.",
            },
            {
              text: "Please send; the item codes by Tuesday.",
              correct: false,
              rationale: "This splits a single sentence in half.",
            },
            {
              text: "The order goes in Thursday; and please send the codes.",
              correct: false,
              rationale:
                "A semicolon and a coordinating conjunction do the same job. Use one or the other.",
            },
          ],
        },
        {
          id: "t9-g2",
          prompt:
            "Which sentence correctly punctuates the introductory phrase?",
          principle:
            "An introductory phrase is followed by a comma. Without it, the reader briefly attaches the phrase to the wrong thing.",
          choices: [
            {
              text: "After you verify the insurance please update the chart.",
              correct: false,
              rationale:
                "Missing the comma after the introductory clause, which makes the reader stumble on 'insurance please'.",
            },
            {
              text: "After you verify the insurance, please update the chart.",
              correct: true,
              rationale: "Correct. The comma marks the end of the introductory clause.",
            },
            {
              text: "After, you verify the insurance please update the chart.",
              correct: false,
              rationale: "The comma is in the wrong place and breaks the clause.",
            },
            {
              text: "After you verify, the insurance please update the chart.",
              correct: false,
              rationale: "The comma splits the clause and changes the meaning.",
            },
          ],
        },
        {
          id: "t9-g3",
          prompt: "Which list is parallel?",
          principle:
            "Parallel structure means every item in a list takes the same grammatical form. It is one of the quickest ways to make writing sound competent.",
          choices: [
            {
              text: "Verify the insurance, updating the chart, and you should confirm the appointment.",
              correct: false,
              rationale:
                "Imperative, gerund, then 'you should'. Three different forms in one list.",
            },
            {
              text: "Verify the insurance, update the chart, and confirm the appointment.",
              correct: true,
              rationale: "Correct. Three imperatives, same form throughout.",
            },
            {
              text: "Verification of insurance, update the chart, and confirming the appointment.",
              correct: false,
              rationale: "Noun phrase, imperative, gerund — not parallel.",
            },
            {
              text: "You need to verify the insurance, the chart needs updating, and confirm the appointment.",
              correct: false,
              rationale:
                "Three different constructions, and the second one loses the doer entirely.",
            },
          ],
        },
        {
          id: "t9-g4",
          prompt:
            "Which is the best way to combine: 'The order goes in Thursday. I need the item codes. Please send them by Tuesday.'",
          principle:
            "Combining sentences shows the relationship between ideas. Three short sentences in a row read as choppy and make the reader work out the connection.",
          choices: [
            {
              text: "The order goes in Thursday, I need the item codes, please send them by Tuesday.",
              correct: false,
              rationale: "Three complete sentences spliced with commas — a run-on.",
            },
            {
              text: "The order goes in Thursday, so please send me the item codes by Tuesday.",
              correct: true,
              rationale:
                "Correct. Combines cause and request into one sentence, and 'so' makes the relationship explicit.",
            },
            {
              text: "The order goes in Thursday and I need the item codes and please send them by Tuesday.",
              correct: false,
              rationale: "Strung together with 'and'; the relationship between the parts is lost.",
            },
            {
              text: "Thursday order; item codes; Tuesday.",
              correct: false,
              rationale:
                "Compressed into fragments. Brevity that costs the reader comprehension is not an improvement.",
            },
          ],
        },
      ],
    },
    { kind: "word-bank", title: "Words to spell", listNumber: 9 },
  ],

  product: {
    label: "Professional email",
    description:
      "Write a complete professional email to a supervisor or coworker from the scenario below: subject line, greeting, the request in the first sentence, the detail that supports it, a specific deadline, and a closing. Keep it under 120 words.",
    scenario:
      "You are the assistant responsible for Thursday's supply order. You still need item codes from the clinical lead, Marcus, and you need them by Tuesday afternoon to check the order before it submits. Marcus has been covering two units this week and is behind on email.",
  },

  reflection: [
    "Read only your subject line. Would you know when to open this message?",
    "Is the request in the first sentence, or did you build up to it?",
    "Are your lists parallel? Read them out loud — the ear catches it faster than the eye.",
  ],

  beforeYouLeave: [
    "Completed the subject-line challenge",
    "Repaired all three parts of the broken email",
    "Completed the punctuation and parallelism drill",
    "Drafted the email and checked it against the Communication Check",
  ],
};
