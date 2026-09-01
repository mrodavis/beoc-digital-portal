import { Lesson } from "@/types/lesson";

export const module8Lessons: Lesson[] = [
  {
    slug: "recognizing-and-responding-to-emergencies",
    title: "Recognizing and Responding to Emergencies",
    description:
      "Identify a deteriorating patient, respond within your scope, and understand what the office emergency response actually requires of you.",
    duration: "26 min",
    objectives: [
      "Recognize signs of a medical emergency in the office",
      "Respond within your scope while help is summoned",
      "Describe the contents and checking of an emergency kit",
      "Explain your role during a code and afterwards",
    ],
    sections: [
      {
        heading: "Recognition comes before response",
        blocks: [
          {
            type: "scenario",
            role: "You are rooming patients at Lakeside Medical Associates.",
            text: "A patient in the waiting room becomes pale and sweaty and says the room feels far away. You are the only clinical staff member who has noticed. What you do in the next sixty seconds matters more than anything that happens afterwards.",
            task: "Learn to recognize deterioration early and act within your scope while getting help immediately.",
          },
          {
            type: "table",
            caption: "Signs requiring immediate escalation",
            columns: ["Sign", "May indicate"],
            rows: [
              ["Chest pain or pressure, especially with sweating or nausea", "Cardiac event"],
              ["Sudden facial droop, arm weakness, or speech difficulty", "Stroke — note the time last known well"],
              ["Difficulty breathing, or speaking in short phrases", "Respiratory distress, anaphylaxis"],
              ["Pale, cool, clammy skin with rapid weak pulse", "Shock"],
              ["Sudden confusion or altered consciousness", "Many causes, all urgent"],
              ["Hives with swelling of lips, tongue, or throat", "Anaphylaxis"],
              ["Uncontrolled bleeding", "Hemorrhage"],
            ],
          },
          {
            type: "paragraph",
            text: "Your role in an emergency is recognition, summoning help, and supporting within your scope. That is not a lesser role — a patient whose deterioration is noticed and escalated within a minute has a materially different outcome from one noticed in five.",
          },
          {
            type: "worked-example",
            title: "Responding to a patient becoming unwell",
            task: "A patient in the waiting room is pale, diaphoretic, and reports feeling faint.",
            steps: [
              {
                move: "Stay with the patient and call for help without leaving them.",
                why: "Never leave a deteriorating patient to fetch someone. Call out, use the phone, or send another person. Patients who lose consciousness while alone fall, and a head injury on top of the original problem is a far worse situation.",
              },
              {
                move: "Help them to a safe position, lying down if possible.",
                why: "Someone about to faint is safest lying down, where they cannot fall. If they are in a chair and cannot be moved, support them so a collapse is controlled rather than a drop onto a hard floor.",
              },
              {
                move: "Take vital signs if you can do so without leaving them.",
                why: "Objective data helps the responding clinician enormously, and it is squarely within your scope. But taking vitals never comes before summoning help — the clinician needs to be on their way while you measure.",
              },
              {
                move: "Report concisely when help arrives.",
                why: "'62-year-old, was waiting for a routine visit, became pale and diaphoretic four minutes ago, says she feels faint, BP 88/54, pulse 112' gives the clinician everything in one sentence. A narrative wastes the time the report is meant to save.",
              },
              {
                move: "Stay and assist as directed.",
                why: "You know where supplies are, you can bring the emergency kit, you can call 911, you can clear the area. Being available and following direction is the most useful thing you can do once a clinician has taken over.",
              },
            ],
            result:
              "The patient is safe, a clinician is engaged within a minute, and they have objective data to work from.",
            takeaway:
              "Stay, call, position, measure, report concisely. Never leave the patient to get help.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Know before an emergency happens: where the emergency kit and AED are, who is trained in BLS, how to call for help internally, and what your practice's emergency protocol says your role is. Learning any of this during an emergency is too late. Emergency kits should be checked on a schedule for expiry and completeness, and that check is frequently an MA responsibility.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Maintain a current BLS certification. Most employers require it, and it is a genuine competency rather than a box to tick. CPR and AED technique changes as guidelines are updated, which is precisely why certification expires.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient in the waiting room becomes pale and says they feel faint. You are alone with them. What is your first action?",
            options: [
              "Go to find a provider immediately",
              "Stay with the patient, call for help without leaving, and help them lie down",
              "Take a full set of vital signs before doing anything else",
              "Move them to an examination room for privacy",
            ],
            correctIndex: 1,
            explanation:
              "Never leave a patient who may lose consciousness. Call out, use a phone, or send someone else. Getting them safely positioned prevents a fall, which is the immediate risk. Vital signs follow once help is summoned.",
            optionRationales: [
              "Leaving means they may collapse unattended and sustain a head injury on top of the original problem.",
              "Correct. Stay, summon help without leaving, and position them safely.",
              "Vitals are valuable but come after help is on its way and the patient is safe.",
              "Moving someone who may faint risks a fall in transit. Get help to them instead.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Preparation is what makes an emergency response possible.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Research the signs of anaphylaxis and write out how it is distinguished from a milder allergic reaction.",
          "Find out what a typical office emergency kit contains and why each item is included.",
          "Write a concise handoff report for the waiting room scenario, in under twenty-five words.",
          "Look up BLS certification requirements in your area — who provides it, what it costs, and how often it must be renewed.",
        ],
      },
    ],
  },
  {
    slug: "professionalism-and-communication",
    title: "Professionalism and Patient Communication",
    description:
      "Communicate with patients and colleagues in ways that build trust, and handle the difficult conversations the role guarantees.",
    duration: "22 min",
    objectives: [
      "Communicate clearly with patients of varying health literacy",
      "Use teach-back to confirm understanding",
      "Work with interpreters correctly",
      "Handle an angry or distressed patient professionally",
    ],
    sections: [
      {
        heading: "Understanding is the outcome, not delivery",
        blocks: [
          {
            type: "scenario",
            role: "You give discharge instructions at Lakeside Medical Associates.",
            text: "You explain the medication schedule clearly and ask 'does that make sense?' The patient says yes, because saying no feels like admitting something. They take the medication wrongly for a week, and the next visit is spent working out why it did not help.",
            task: "Confirm understanding in a way that actually reveals whether it exists.",
          },
          {
            type: "paragraph",
            text: "'Does that make sense?' reliably produces a yes. It asks the patient to assess their own understanding and to admit a shortfall to a clinician, and most people will not. Teach-back asks them to demonstrate it instead: 'I want to make sure I explained that well — can you tell me how you'll take this?'",
          },
          {
            type: "paragraph",
            text: "The framing matters. Teach-back puts the burden on your explanation rather than their comprehension, which removes the shame that keeps people from admitting confusion. It is not a quiz; it is checking your own work.",
          },
          {
            type: "table",
            caption: "Clear communication",
            columns: ["Instead of", "Say", "Because"],
            rows: [
              ["Hypertension", "High blood pressure", "Plain language reaches more people"],
              ["Take PO BID", "Take one by mouth twice a day, morning and evening", "Abbreviations are for records, not patients"],
              ["Do you understand?", "Tell me how you'll take this at home", "Demonstration reveals what agreement conceals"],
              ["You need to comply with the regimen", "Let's find a schedule that fits your day", "Collaboration works better than instruction"],
              ["The doctor will discuss your results", "The doctor will call you Thursday about your results", "Specifics reduce anxiety"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Use a qualified medical interpreter when there is a language barrier — never a family member, and never a child. Family members summarize, soften, and omit, particularly around difficult topics, and using a child as interpreter is both a serious clinical risk and a harm to the child. Patients have a right to interpretation, and practices receiving federal funds have an obligation to provide it. Speak to the patient, not to the interpreter, and use ordinary first-person sentences.",
          },
          {
            type: "table",
            caption: "De-escalating an angry patient",
            columns: ["Do", "Why"],
            rows: [
              ["Let them finish without interrupting", "Interruption escalates; being heard de-escalates"],
              ["Lower your voice and slow down", "People tend to match the calmer register over time"],
              ["Acknowledge the feeling before the facts", "'You've been waiting a long time and that's frustrating' costs nothing and lands"],
              ["Say what you can do, not what you cannot", "'Let me find out where things stand' beats 'there's nothing I can do'"],
              ["Keep an exit path and stay aware of your surroundings", "Almost all anger stays verbal, and your safety still comes first"],
              ["Get help early if it escalates", "Involving a supervisor is standard practice, not a personal failure"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "You have explained a new medication schedule. What is the most reliable way to confirm the patient understands?",
            options: [
              "Ask 'do you have any questions?'",
              "Ask them to describe in their own words how they will take it at home",
              "Ask 'does that make sense?'",
              "Give written instructions and ask them to read them later",
            ],
            correctIndex: 1,
            explanation:
              "Teach-back asks the patient to demonstrate understanding rather than assess it. Yes-or-no questions reliably produce a yes, because admitting confusion to a clinician feels like admitting a failing. Framing it as checking your own explanation removes that barrier.",
            optionRationales: [
              "Patients often have questions they cannot yet formulate, and this still requires them to volunteer a shortfall.",
              "Correct. Demonstration reveals what a yes-or-no question conceals.",
              "This is the question that reliably produces a false yes.",
              "Written instructions are a valuable supplement but do not confirm understanding, and assume literacy in that language.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Communication is the skill patients notice most.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Rewrite in plain language: 'Take this analgesic PRN for post-operative discomfort, and monitor for signs of infection at the incision site.'",
          "Write a teach-back question for each: a new inhaler; a three-times-daily antibiotic; wound care instructions.",
          "Research how to work with a telephone interpreter. List five practices that make it effective.",
          "Write a four-line de-escalation script for a patient angry about a ninety-minute wait, that acknowledges the feeling without promising what you cannot deliver.",
        ],
      },
    ],
  },
];
