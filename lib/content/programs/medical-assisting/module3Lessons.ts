import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "measuring-vital-signs",
    title: "Measuring Vital Signs Accurately",
    description:
      "Take temperature, pulse, respirations, blood pressure, and oxygen saturation correctly, and recognize what falls outside expected ranges.",
    duration: "26 min",
    objectives: [
      "Measure each vital sign using correct technique",
      "State the expected adult ranges and recognize deviations",
      "Identify the technique errors that produce inaccurate readings",
      "Explain when a reading requires immediate escalation",
    ],
    sections: [
      {
        heading: "The numbers a provider will rely on",
        blocks: [
          {
            type: "scenario",
            role: "You room patients at Lakeside Medical Associates.",
            text: "You take a blood pressure with a cuff that is too small, over a sleeve, with the patient's arm hanging at their side and their legs crossed. The reading comes out 152/94. A provider who trusts it may start treating hypertension the patient does not have — and every one of those four errors pushes the number up.",
            task: "Take measurements accurately enough that clinical decisions can safely rest on them.",
          },
          {
            type: "paragraph",
            text: "Vital signs are the most frequently performed clinical task in ambulatory care and among the most consequential, because providers make decisions from them without re-taking them. An inaccurate reading is not a neutral event; it produces a wrong clinical picture.",
          },
          {
            type: "table",
            caption: "Expected adult ranges",
            columns: ["Vital sign", "Typical adult range", "Note"],
            rows: [
              ["Temperature", "97.0-99.0°F (36.1-37.2°C) oral", "Varies by route; rectal and temporal read higher than oral"],
              ["Pulse", "60-100 beats per minute", "Note rate, rhythm, and strength — not rate alone"],
              ["Respirations", "12-20 breaths per minute", "Count without the patient's awareness, or the rate changes"],
              ["Blood pressure", "Below 120/80 mmHg is normal", "See the categories below"],
              ["Oxygen saturation", "95-100%", "Cold hands, nail polish, and poor perfusion cause false lows"],
              ["Pain", "0-10 scale", "Self-reported; the patient's number is the number"],
            ],
          },
          {
            type: "table",
            caption: "Blood pressure categories (American Heart Association)",
            columns: ["Category", "Systolic", "", "Diastolic"],
            rows: [
              ["Normal", "Below 120", "and", "Below 80"],
              ["Elevated", "120-129", "and", "Below 80"],
              ["Stage 1 hypertension", "130-139", "or", "80-89"],
              ["Stage 2 hypertension", "140 or higher", "or", "90 or higher"],
              ["Hypertensive crisis", "Higher than 180", "and/or", "Higher than 120"],
            ],
          },
          {
            type: "worked-example",
            title: "Taking an accurate blood pressure",
            task: "Measure a patient's blood pressure so the reading reflects their actual pressure rather than your technique.",
            steps: [
              {
                move: "Let the patient sit quietly for five minutes, feet flat, back supported.",
                why: "Rushing this is the most common source of falsely high readings. Crossed legs raise systolic pressure, and an unsupported back raises diastolic. Five quiet minutes costs less than treating hypertension a patient does not have.",
              },
              {
                move: "Choose a cuff sized to the arm, not the one already attached.",
                why: "The bladder should encircle roughly 80% of the arm and its width should be about 40% of arm circumference. A cuff that is too small reads falsely high — often by 10 to 20 mmHg — and this single error is enough to move a patient into a different category.",
              },
              {
                move: "Place the cuff on a bare arm, supported at heart level.",
                why: "A sleeve under the cuff distorts the reading, and pushing a sleeve up creates a tourniquet. An arm below heart level reads high; above, low. Support it — a patient holding their own arm up is using muscles, which also raises the reading.",
              },
              {
                move: "Position the bladder over the brachial artery and inflate above the estimated systolic.",
                why: "Palpate the radial pulse, inflate until it disappears, add 30 mmHg. This avoids missing an auscultatory gap, a silent interval in which Korotkoff sounds vanish and reappear — miss it and you record a systolic far below the real one.",
              },
              {
                move: "Deflate slowly, about 2-3 mmHg per second.",
                why: "Deflating faster than this causes you to miss the true first and last sounds. Fast deflation reliably underestimates systolic and overestimates diastolic.",
              },
              {
                move: "Record the arm used, the patient's position, and the cuff size.",
                why: "It makes the reading reproducible and comparable at the next visit. A pressure recorded with no context cannot be meaningfully compared to one taken differently.",
              },
            ],
            result:
              "A reading that reflects the patient's pressure rather than an artifact of the measurement.",
            takeaway:
              "Rest, cuff size, bare arm at heart level, slow deflation. Each error pushes the number in a predictable direction, and they accumulate.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Certain readings require immediate escalation rather than routine documentation — a blood pressure above 180/120, an oxygen saturation below 90%, a respiratory rate under 12 or over 24 in a patient in distress, or any reading accompanied by symptoms such as chest pain, confusion, or difficulty breathing. Recognizing that a number needs a clinician now is within your role. Deciding what it means is not.",
          },
          {
            type: "knowledge-check",
            question:
              "A blood pressure cuff that is too small for the patient's arm produces what effect?",
            options: [
              "A falsely low reading, because less pressure is transmitted",
              "A falsely high reading, often by 10 to 20 mmHg",
              "No effect, provided the cuff fastens",
              "An unpredictable reading that may be high or low",
            ],
            correctIndex: 1,
            explanation:
              "An undersized cuff requires more pressure to occlude the artery, so the measured pressure is higher than the patient's actual pressure. The effect is substantial and consistent, and it is a common cause of patients being labelled hypertensive incorrectly.",
            optionRationales: [
              "The error runs the other way. An oversized cuff is what produces falsely low readings.",
              "Correct. Undersized cuffs read falsely high, frequently by a clinically significant margin.",
              "Fastening is not the criterion. Bladder dimensions relative to arm circumference determine accuracy.",
              "The direction is predictable: too small reads high, too large reads low.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Vital signs are a hands-on skill. This prepares you for supervised practice; it does not replace it.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write out the expected adult ranges for all six vital signs from memory, then check them.",
          "For each error, state the direction it moves the reading and by roughly how much: cuff too small; arm below heart level; deflating too quickly; patient talking during measurement.",
          "Research the auscultatory gap. Explain in three sentences what it is and how palpating first prevents the error.",
          "List five readings that would require you to notify a provider immediately rather than simply documenting them.",
        ],
      },
    ],
  },
  {
    slug: "patient-intake-and-history",
    title: "Patient Intake and Medical History",
    description:
      "Gather an accurate history, use open and closed questions well, and document what the patient actually said.",
    duration: "22 min",
    objectives: [
      "Conduct a structured intake interview",
      "Use open-ended and closed questions appropriately",
      "Record the chief complaint in the patient's own words",
      "Recognize what to escalate during intake",
    ],
    sections: [
      {
        heading: "The history is most of the diagnosis",
        blocks: [
          {
            type: "scenario",
            role: "You room a patient at Lakeside Medical Associates.",
            text: "You ask 'so it's just the usual back pain?' and the patient agrees, because agreeing is easier than correcting you. The actual complaint was new numbness in one leg. Your question offered an answer, and the patient took it.",
            task: "Ask questions that let the patient tell you what is actually happening.",
          },
          {
            type: "paragraph",
            text: "A well-taken history contributes more to diagnosis than any single test. The medical assistant usually takes the first pass at it, which means the quality of your questions shapes what the provider starts from.",
          },
          {
            type: "table",
            caption: "Question types and when to use each",
            columns: ["Type", "Example", "Use for"],
            rows: [
              [
                "Open-ended",
                "What brings you in today?",
                "Opening a topic; letting the patient lead",
              ],
              [
                "Closed",
                "Are you taking any blood thinners?",
                "Confirming specific facts",
              ],
              [
                "Clarifying",
                "When you say dizzy, do you mean the room spins, or that you feel faint?",
                "Pinning down vague terms that mean different things",
              ],
              [
                "Leading — avoid",
                "The pain isn't radiating down your leg, is it?",
                "Nothing. It suggests the answer you expect",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "Start open and narrow down. Opening with a closed or leading question constrains what the patient tells you before they have said anything, and patients frequently accept the framing offered rather than correcting a clinician.",
          },
          {
            type: "table",
            caption: "Components of a medical history",
            columns: ["Component", "Captures"],
            rows: [
              ["Chief complaint", "Why they came, in their own words"],
              ["History of present illness", "Onset, location, duration, character, aggravating and relieving factors, timing, severity"],
              ["Past medical history", "Prior conditions, surgeries, hospitalizations"],
              ["Medications", "Prescription, over-the-counter, supplements — all of them"],
              ["Allergies", "The allergen and the specific reaction"],
              ["Family history", "Conditions in close relatives"],
              ["Social history", "Tobacco, alcohol, substances, occupation, living situation"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Record the chief complaint in the patient's own words, in quotation marks. 'My chest feels tight when I walk up stairs' is data. 'Angina' is your interpretation, and it is a diagnosis you are not authorized to make — it may also be wrong, and once it is in the record it colors everything that follows.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Allergies need the reaction, not just the substance. 'Penicillin — hives and throat swelling' is clinically different from 'penicillin — upset stomach,' which is an intolerance rather than an allergy. Recording only the drug name can unnecessarily rule out an entire antibiotic class for a patient's whole life.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient says they feel 'dizzy.' What is the most useful next question?",
            options: [
              "Do you have vertigo?",
              "When you say dizzy, do you mean the room spins, or that you feel faint or lightheaded?",
              "You're not going to pass out, are you?",
              "How long has the vertigo been happening?",
            ],
            correctIndex: 1,
            explanation:
              "Dizzy covers several genuinely different symptoms with different causes — vertigo, presyncope, disequilibrium. A clarifying question that offers distinct alternatives lets the patient identify which they mean without you supplying a term or a diagnosis.",
            optionRationales: [
              "Vertigo is a clinical term the patient may not understand, and using it applies your interpretation to their symptom.",
              "Correct. It clarifies a vague term by offering distinct alternatives in plain language.",
              "This is leading and invites reassurance rather than information.",
              "It assumes vertigo, which has not been established, and moves to duration before the symptom is defined.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Interviewing is a skill you build by doing it badly and noticing.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Rewrite each as an open-ended or clarifying question: 'You're here for your diabetes follow-up, right?' 'The medication is working okay?' 'No new symptoms?'",
          "Research the OLDCARTS or SOCRATES mnemonic for history of present illness. Write out what each letter prompts.",
          "For a patient reporting 'stomach pain,' write eight questions that would characterize it fully, using at least two clarifying questions.",
          "Practice a five-minute intake with someone willing to role-play. Afterwards, count how many of your questions were leading.",
        ],
      },
    ],
  },
];
