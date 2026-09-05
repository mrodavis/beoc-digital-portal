import { Lesson } from "@/types/lesson";
import { Program } from "@/types/program";

/**
 * ESOL — English for Speakers of Other Languages.
 *
 * Written for adult learners already living and working in the United States,
 * so the content is built around the situations they are actually in: work,
 * healthcare, school, and services. Grammar appears where it changes meaning
 * rather than as a separate syllabus.
 */

const m1: Lesson[] = [
  {
    slug: "english-at-work",
    title: "English at Work",
    description:
      "The English a workplace actually requires: asking for clarification, reporting a problem, and being understood on the phone.",
    duration: "22 min",
    objectives: [
      "Ask someone to repeat or explain without apologizing for it",
      "Report a problem to a supervisor clearly",
      "Use the phrases that keep a phone conversation moving",
      "Recognize when a coworker means something different from what they said",
    ],
    sections: [
      {
        heading: "Asking again is a professional skill",
        blocks: [
          {
            type: "scenario",
            role: "You are new on a shift and your supervisor gives instructions quickly.",
            text: "You catch most of it, not all. Saying nothing feels safer than asking a third time. You do the task the way you understood it, and it is wrong — and now the problem is bigger than the question would have been.",
            task: "Learn the phrases that let you ask again without it costing you anything.",
          },
          {
            type: "paragraph",
            text: "Every worker asks for clarification, in every language. What changes is confidence, not need. The phrases below are ordinary professional English — they do not mark you as a learner, and coworkers use them constantly.",
          },
          {
            type: "table",
            caption: "Asking for clarification",
            columns: ["Say", "When", "Why it works"],
            rows: [
              ["Could you say that again, please?", "You missed it entirely", "Direct and completely normal"],
              ["Sorry, I didn't catch the last part.", "You got most of it", "Shows you were listening and narrows what they repeat"],
              ["Do you mean [X] or [Y]?", "You heard it but it could mean two things", "Gets a one-word answer instead of a repeat"],
              ["Let me make sure I have this right — you want me to…", "It matters that you get it right", "Confirms understanding and catches errors before they happen"],
              ["Could you spell that for me?", "A name, a medication, an address", "Expected and appreciated for anything written down"],
              ["Could you write that down?", "Numbers, times, or several steps", "Reasonable to ask; nobody thinks less of you"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The fourth phrase — 'Let me make sure I have this right' — is the most useful one in the table, and native speakers use it constantly. It is not a sign you did not understand; it is what careful people do before starting something that matters. In healthcare it is called a read-back, and it is required rather than optional.",
          },
          {
            type: "worked-example",
            title: "Reporting a problem to a supervisor",
            task: "A machine on your line has stopped and you need to tell your supervisor.",
            steps: [
              {
                move: "Say what is wrong first, in one sentence.",
                why: "English workplace reporting puts the main point first, not last. This is genuinely different from many languages, where context comes first and the point arrives at the end — and a supervisor who is busy may stop listening before you reach it.",
              },
              {
                move: "Then say what you did about it.",
                why: "'The machine on line two stopped. I turned it off and told the others to wait' tells them the situation is contained. It answers the question they were about to ask.",
              },
              {
                move: "Then say what you need from them.",
                why: "'Do you want me to call maintenance, or will you?' A report with no request leaves them to work out what you want, and that is the part most likely to be misread.",
              },
              {
                move: "If they respond quickly and you miss it, say so immediately.",
                why: "'Sorry — call maintenance, or wait for you?' Confirming now costs five seconds. Guessing costs the whole task, and the supervisor would far rather be asked.",
              },
            ],
            result: "Three short sentences that tell the supervisor what happened, what you did, and what you need.",
            takeaway: "Problem, action, request — in that order. English puts the point first.",
          },
          {
            type: "knowledge-check",
            question:
              "Your supervisor gives you a three-step instruction and you only catch the first two. What is the best thing to say?",
            options: [
              "Nothing — start the task and work out the third step later",
              "\"Sorry, I didn't catch the last part — could you repeat that?\"",
              "\"I don't understand English very well.\"",
              "\"Yes, okay\" — and ask a coworker afterwards",
            ],
            correctIndex: 1,
            explanation:
              "It is specific, so the supervisor repeats only the part you need rather than everything. It is also completely ordinary professional English — coworkers who grew up speaking English say exactly this several times a week.",
            optionRationales: [
              "Starting without the third step means doing it wrong and fixing it later, which costs more than asking.",
              "Correct. Specific, normal, and it gets you exactly the part you missed.",
              "This makes the conversation about your English rather than about the task, and it is not what the supervisor needs to know.",
              "Agreeing when you have not understood is the habit that causes the most trouble at work, and the coworker may be wrong.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice out loud. Reading these does not build the reflex; saying them does." },
      {
        type: "list",
        ordered: true,
        items: [
          "Say each of the six clarification phrases out loud five times, until they come without thinking.",
          "Write a three-sentence report of a real problem from your work, using problem, action, request.",
          "Listen to any English conversation — a video, a podcast, coworkers — and count how many times a fluent speaker asks for clarification. Note what they say.",
          "Next time you are unsure at work, use one of the phrases instead of guessing. Write down what happened.",
        ],
      },
    ],
  },
  {
    slug: "english-in-healthcare-settings",
    title: "English in Healthcare Settings",
    description:
      "Describing symptoms, understanding instructions, and knowing your right to an interpreter.",
    duration: "22 min",
    objectives: [
      "Describe symptoms with the detail a clinician needs",
      "Understand and confirm medication and appointment instructions",
      "Ask for an interpreter and explain why you should",
      "Recognize the words that appear on forms and signs",
    ],
    sections: [
      {
        heading: "You have a right to an interpreter",
        blocks: [
          {
            type: "scenario",
            role: "You are at a clinic for yourself or a family member.",
            text: "You speak enough English for most things. Medical English is different — the words are unfamiliar, the stakes are high, and you are unwell or worried. Your daughter offers to translate, and the clinic accepts.",
            task: "Understand what you are entitled to, because a family member is not the right answer.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Healthcare providers receiving federal funding are generally required to provide language assistance at no cost to you. You may ask for a qualified interpreter and you do not have to explain why. Do not use your children — a child interpreter is a real clinical risk, they may not know the words, and they should not be told their parent's diagnosis before their parent is. Asking for an interpreter is not an inconvenience; it is the system working.",
          },
          {
            type: "table",
            caption: "Describing symptoms — what clinicians need",
            columns: ["They need", "Say", "Example"],
            rows: [
              ["Where", "Point and name it", "\"Here, in my lower back\""],
              ["How long", "A specific period", "\"Three days\" not \"a while\""],
              ["What kind", "Choose a word", "Sharp, dull, burning, aching, throbbing"],
              ["How bad", "A number from 0 to 10", "\"Seven out of ten\""],
              ["What makes it worse or better", "Name the action", "\"Worse when I stand, better when I lie down\""],
              ["What you have taken", "The medicine and when", "\"Two ibuprofen this morning\""],
            ],
          },
          {
            type: "paragraph",
            text: "The pain scale is used everywhere in US healthcare and is worth knowing: zero is no pain and ten is the worst you can imagine. Clinicians ask for a number because it can be compared over time — a seven that becomes a four means the treatment is working.",
          },
          {
            type: "table",
            caption: "Words that appear on medical forms and signs",
            columns: ["Word", "Means"],
            rows: [
              ["Fasting", "Do not eat or drink before the test"],
              ["Prescription", "Medicine a doctor orders for you"],
              ["Refill", "Getting more of the same medicine"],
              ["Referral", "Being sent to a specialist"],
              ["Copay", "The amount you pay at the visit"],
              ["Deductible", "What you pay before insurance starts paying"],
              ["Consent", "Your written permission"],
              ["Symptom", "What you feel or notice"],
              ["Dosage", "How much medicine and how often"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "At a clinic appointment, who should interpret for you?",
            options: [
              "Your teenage child, who speaks English well",
              "A qualified interpreter, which the provider generally must offer at no cost",
              "Whoever in the waiting room speaks your language",
              "Nobody — you should manage in English",
            ],
            correctIndex: 1,
            explanation:
              "Providers receiving federal funding are generally required to provide language assistance free of charge. A qualified interpreter knows medical vocabulary and is bound to interpret everything accurately. Family members summarize and soften, and a child should never be placed in that position.",
            optionRationales: [
              "Children lack the vocabulary, and it places them in a role no child should hold — including hearing a parent's diagnosis first.",
              "Correct. Ask for a qualified interpreter; it is your right and it costs you nothing.",
              "A stranger has no obligation to accuracy or confidentiality.",
              "Managing alone in a medical conversation risks misunderstanding something that matters. Asking is the safer choice, always.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Prepare before you need it — a clinic visit is a bad time to search for words." },
      {
        type: "list",
        ordered: true,
        items: [
          "Write out how you would describe a real symptom using all six elements from the table.",
          "Practice saying \"I would like an interpreter, please\" until it is automatic.",
          "Learn the nine form words and find them on a real form or website if you can.",
          "Write the three questions you would ask about a new medication: what is it for, how do I take it, and what should I watch for.",
        ],
      },
    ],
  },
];

const m2: Lesson[] = [
  {
    slug: "grammar-that-changes-meaning",
    title: "Grammar That Changes Meaning",
    description:
      "The grammar points where a mistake is not just an error but a different message.",
    duration: "22 min",
    objectives: [
      "Use past, present, and future to place events in time clearly",
      "Use articles where their absence changes meaning",
      "Form questions that get the answer you want",
      "Use modal verbs to ask rather than demand",
    ],
    sections: [
      {
        heading: "Some errors are noise; these ones change the message",
        blocks: [
          {
            type: "scenario",
            role: "You are explaining an absence to a supervisor.",
            text: "You say \"I work yesterday.\" Your supervisor understands you. Later you say \"I can work Saturday\" when you meant \"I could work Saturday\" — and now they have you on the schedule.",
            task: "Focus on the grammar that changes what people do, not the grammar that only sounds wrong.",
          },
          {
            type: "paragraph",
            text: "Many grammar errors are harmless: a listener understands and moves on. A smaller set genuinely changes the message, and those are worth your attention first. Tense places events in time, modals signal how firm you are being, and articles sometimes change which thing you mean.",
          },
          {
            type: "table",
            caption: "Tense — placing events in time",
            columns: ["Form", "Means", "Example"],
            rows: [
              ["I work", "Regularly, generally", "I work at the clinic"],
              ["I am working", "Right now, or a temporary arrangement", "I am working the late shift this week"],
              ["I worked", "Finished, in the past", "I worked yesterday"],
              ["I have worked", "Started in the past, still relevant now", "I have worked here for two years"],
              ["I will work", "Future, decided", "I will work Saturday"],
              ["I would work", "Conditional, not yet agreed", "I would work Saturday if you need me"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "The last two rows are the ones that cause real trouble at work. \"I will work Saturday\" is a commitment. \"I could work Saturday\" or \"I would work Saturday if you need me\" is an offer. Supervisors act on the first, so use it only when you mean it.",
          },
          {
            type: "table",
            caption: "Modals — how firm you are being",
            columns: ["Modal", "Strength", "Use for"],
            rows: [
              ["Can you…", "Direct", "Colleagues, simple requests"],
              ["Could you…", "Polite", "Most workplace requests — the safe default"],
              ["Would you mind…", "Very polite", "Asking for something inconvenient"],
              ["You must…", "An obligation", "Rules and safety, rarely person-to-person"],
              ["You should…", "Advice", "Recommending, not requiring"],
              ["I have to…", "An obligation on you", "Explaining why you cannot do something"],
            ],
          },
          {
            type: "worked-example",
            title: "Turning a demand into a request",
            task: "You need a coworker to swap a shift with you.",
            steps: [
              {
                move: "Avoid the bare imperative: not \"Swap shifts with me Thursday.\"",
                why: "In English an imperative to a peer sounds like an order. Many languages use a direct form politely; English marks politeness with modals instead, so the direct form reads as rudeness even when none is meant.",
              },
              {
                move: "Use \"could\" and add the reason: \"Could you swap Thursday with me? I have a class that evening.\"",
                why: "\"Could\" makes it a request rather than an instruction, and the reason gives them something to say yes to. English speakers expect a short reason with a request between peers.",
              },
              {
                move: "Give them a way to say no: \"If it doesn't work, no problem — I'll ask Marcus.\"",
                why: "This removes the pressure and makes a yes genuine. It also protects the relationship, which matters more than this one shift.",
              },
            ],
            result: "A request they can accept or decline without awkwardness.",
            takeaway: "Could + reason + an easy way out. That is the standard shape of an English workplace request.",
          },
          {
            type: "knowledge-check",
            question:
              "Your supervisor asks if you are available Saturday. You are willing but would prefer not to. What should you say?",
            options: [
              "\"I will work Saturday.\"",
              "\"I could work Saturday if you need me.\"",
              "\"I work Saturday.\"",
              "\"I am working Saturday.\"",
            ],
            correctIndex: 1,
            explanation:
              "\"Could\" makes it an offer rather than a commitment, and \"if you need me\" signals that you are available without volunteering. The others all state, in different tenses, that you are working — and your supervisor will schedule you.",
            optionRationales: [
              "\"Will\" is a commitment. Your supervisor will take it as settled.",
              "Correct. An offer, with a condition attached.",
              "The simple present states it as a regular fact — it sounds like Saturday is normally your day.",
              "The present continuous states it as already arranged.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Focus on the forms that change meaning." },
      {
        type: "list",
        ordered: true,
        items: [
          "Write six sentences about your own work using each tense in the table once.",
          "Rewrite these as polite requests: \"Give me the schedule.\" \"Tell me when you finish.\" \"Change my shift.\"",
          "Write one sentence committing to something and one offering it, and mark the difference.",
          "Listen for \"could you\" and \"would you mind\" over one day and note who says them and when.",
        ],
      },
    ],
  },
  {
    slug: "reading-forms-and-documents",
    title: "Reading Forms and Official Documents",
    description:
      "Getting through the paperwork of daily life without missing what matters.",
    duration: "20 min",
    objectives: [
      "Recognize the vocabulary that recurs on official forms",
      "Find the deadline, the requirement, and the consequence in a letter",
      "Know what to do with a document you cannot read",
      "Identify a document that is trying to mislead you",
    ],
    sections: [
      {
        heading: "Three questions answer most documents",
        blocks: [
          {
            type: "scenario",
            role: "A letter arrives from a government office.",
            text: "It is two pages of formal English. You understand individual words and not what you are supposed to do. You put it aside to deal with later. The deadline was in paragraph four.",
            task: "Learn to extract the three things that matter without reading every word.",
          },
          {
            type: "paragraph",
            text: "Almost every official letter answers three questions, and you can usually find them in two minutes: what do they want, by when, and what happens if I do nothing. Read for those three first. If you have them, you know whether the letter is urgent, and you can take your time with the rest.",
          },
          {
            type: "table",
            caption: "Words that signal each answer",
            columns: ["Looking for", "Words that signal it"],
            rows: [
              ["What they want", "must, required, submit, provide, complete, return"],
              ["By when", "by, no later than, within, deadline, expires, due"],
              ["What happens otherwise", "failure to, otherwise, will result in, may be terminated, penalty"],
              ["What it is about", "regarding, re:, in reference to, concerning"],
              ["Who to contact", "contact, inquiries, questions, call"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "You are allowed to ask for help with a document, and asking is not a weakness. Many people who grew up speaking English also find official letters hard — that is a feature of how they are written, not of your English. Libraries, community organizations, and the issuing office itself will usually explain a letter. Call the number on it and say: \"I received this letter and I want to make sure I understand what I need to do.\""
          },
          {
            type: "callout",
            variant: "warning",
            text: "Be careful with documents demanding immediate payment, threatening arrest, or asking for money in gift cards or wire transfer. Government agencies do not ask for payment that way and do not threaten arrest by phone or letter for an unpaid bill. Immigrants are targeted deliberately by these scams. If a document frightens you, that is a reason to check it with someone you trust before acting, not a reason to act quickly."
          },
          {
            type: "knowledge-check",
            question:
              "You receive an official letter you do not fully understand. What is the best first step?",
            options: [
              "Put it aside until you have more time to read it properly",
              "Find the deadline, the requirement, and the consequence — then call the number on the letter if any is unclear",
              "Ask a neighbor to translate the whole letter word by word",
              "Ignore it — if it is important, they will write again",
            ],
            correctIndex: 1,
            explanation:
              "Those three things tell you whether the letter is urgent, which is what you need first. If any of them is unclear, the office that sent it will explain it — that is what the phone number is for, and using it is completely normal.",
            optionRationales: [
              "This is how deadlines are missed. Find the deadline first, even if you read the rest later.",
              "Correct. Three things first, then call if anything is unclear.",
              "A full translation is slow and a neighbor may misread it. Get the three key facts, then seek help on those.",
              "Many official deadlines pass without a second letter, and the consequence follows anyway.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice on real documents." },
      {
        type: "list",
        ordered: true,
        items: [
          "Take any official letter or form you have. Find the requirement, the deadline, and the consequence. Write each in one sentence.",
          "Write out the sentence you would say when calling to ask about a letter you do not understand.",
          "Learn the signal words in the table. Find three of them in a real document.",
          "Research one common scam targeting immigrants and write down the two signs that would tell you it was not genuine.",
        ],
      },
    ],
  },
];

export const esol: Program = {
  slug: "esol",
  group: "Academic Programs",
  title: "English for Speakers of Other Languages",
  shortTitle: "ESOL",
  icon: "🌐",
  accent: "from-cyan-700 to-cyan-900",
  description:
    "English for the situations adult learners are actually in: asking for clarification at work, describing symptoms at a clinic, and getting through official paperwork.",
  overview:
    "This course is written for adults already living and working in the United States, so it starts from the situations you are in rather than from a grammar syllabus. Grammar appears where it changes meaning — the difference between 'I will work Saturday' and 'I could work Saturday' matters at work in a way that most grammar errors do not. Throughout, the aim is confidence in asking: for a repeat, for an interpreter, for an explanation of a letter. Fluent speakers ask constantly, and asking is a professional skill rather than a sign of weak English.",
  outcomes: [
    "Ask someone to repeat or clarify, using phrases that sound ordinary and professional",
    "Report a workplace problem in the order English expects — problem, action, request",
    "Describe symptoms with the six elements a clinician needs",
    "Ask for a qualified interpreter and explain why a family member is not appropriate",
    "Use tense and modals so a commitment is not mistaken for an offer",
    "Make requests using could, a reason, and an easy way to decline",
    "Find the requirement, deadline, and consequence in an official letter",
    "Recognize documents designed to frighten or mislead you",
  ],
  careerRoles: [
    "Improved communication in any workplace",
    "Preparation for further study or training",
    "Greater independence in healthcare and government settings",
  ],
  credentialNote:
    "This is coursework rather than a credential, and it is not a language proficiency test or a substitute for one. It also does not give legal or immigration advice: it explains that you may ask for an interpreter and that certain documents are commonly used in scams, but any question about your own legal situation belongs with a qualified immigration attorney or an accredited representative, not with a course.",
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "English at Work & in Healthcare",
      emoji: "💬",
      description:
        "Asking for clarification without apologizing, reporting problems clearly, describing symptoms, and your right to an interpreter.",
      lessons: m1,
      level: "Beginner",
      estimatedMinutes: 44,
      whatYoullLearn: [
        "Six clarification phrases that sound ordinary and professional",
        "Reporting a problem in the order English expects",
        "The six things a clinician needs when you describe a symptom",
        "Why you should ask for an interpreter rather than rely on family",
      ],
      scenario:
        "A supervisor gives instructions quickly and you catch most of them. Asking a third time feels harder than guessing — so you guess, and the task is wrong. Later, at a clinic, your daughter offers to interpret.",
    },
    {
      moduleNumber: 2,
      moduleSlug: "module-2",
      title: "Grammar & Documents",
      emoji: "📄",
      description:
        "The grammar that changes meaning rather than just sounding wrong, and how to get through official paperwork.",
      lessons: m2,
      level: "Beginner",
      estimatedMinutes: 42,
      whatYoullLearn: [
        "Tense and modals, and why 'will' and 'could' produce different outcomes",
        "Making a request English speakers read as polite rather than as an order",
        "Finding the requirement, deadline, and consequence in any official letter",
        "Recognizing documents designed to frighten you into acting",
      ],
      scenario:
        "You tell a supervisor \"I can work Saturday\" when you meant it as an offer, and find yourself on the schedule. A week later an official letter arrives that you set aside — and the deadline was in paragraph four.",
    },
  ],
};
