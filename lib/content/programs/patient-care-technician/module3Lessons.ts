import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "vital-signs-for-pcts",
    title: "Measuring and Reporting Vital Signs",
    description:
      "Take accurate vital signs, recognize changes from a patient's baseline, and report what matters immediately.",
    duration: "26 min",
    objectives: [
      "Measure each vital sign using correct technique",
      "State expected adult ranges and recognize deviations",
      "Compare a reading against the patient's own baseline",
      "Identify readings requiring immediate escalation",
    ],
    sections: [
      {
        heading: "Taking a blood pressure you would stake a decision on",
        blocks: [
          {
            type: "worked-example",
            title: "Getting an accurate reading under time pressure",
            task: "Measure a blood pressure on a busy round, accurately enough that a clinician can act on it without retaking it.",
            steps: [
              {
                move: "Let the patient sit quietly for five minutes, feet flat and back supported.",
                why: "This is the step time pressure removes first, and it is the largest single source of falsely high readings. Crossed legs raise systolic pressure and an unsupported back raises diastolic. Five minutes costs less than a patient started on medication they do not need.",
              },
              {
                move: "Size the cuff to the arm rather than using the one already attached.",
                why: "The bladder should encircle about 80% of the arm. A cuff that is too small reads high by 10 to 20 mmHg — enough on its own to move a patient into a different category. This is the most common equipment error in the building.",
              },
              {
                move: "Bare arm, supported at heart level.",
                why: "A sleeve under the cuff distorts the reading and a pushed-up sleeve becomes a tourniquet. An arm below heart level reads high. And support it yourself — a patient holding their own arm up is using muscle, which also raises the number.",
              },
              {
                move: "Palpate first, then inflate 30 mmHg above where the pulse disappeared.",
                why: "This avoids missing an auscultatory gap — a silent interval where the sounds vanish and return. Miss it and you record a systolic far below the real one, which is the error that reads as reassuring.",
              },
              {
                move: "Deflate slowly, 2 to 3 mmHg per second.",
                why: "Faster deflation misses the true first and last sounds, underestimating systolic and overestimating diastolic. It is the error that feels like efficiency.",
              },
              {
                move: "Record the arm, the position, and the cuff size alongside the number.",
                why: "It makes the reading comparable at the next check. A pressure recorded with no context cannot be meaningfully compared to one taken differently, and the trend is usually what matters.",
              },
            ],
            result: "A reading that reflects the patient's pressure rather than your technique.",
            takeaway: "Rest, cuff size, bare arm at heart level, palpate first, deflate slowly. Every error pushes the number in a predictable direction, and they add up.",
          },
        ],
      },
      {
        heading: "The trend matters as much as the number",
        blocks: [
          {
            type: "scenario",
            role: "You take routine vitals on a medical unit at Lakeside Regional.",
            text: "A patient's heart rate is 98. That is inside the normal range, so it is easy to record and move on. Their rate has been 62 every shift for three days. A jump of 36 beats in one patient is a change worth reporting, and the normal range conceals it entirely.",
            task: "Read every measurement against that patient's own baseline, not only against the textbook range.",
          },
          {
            type: "table",
            caption: "Expected adult ranges",
            columns: ["Vital sign", "Range", "Note"],
            rows: [
              ["Temperature", "97.0-99.0°F oral", "Route affects the reading; be consistent"],
              ["Pulse", "60-100 bpm", "Record rate, rhythm, and strength"],
              ["Respirations", "12-20 per minute", "Count discreetly — awareness changes the rate"],
              ["Blood pressure", "Below 120/80 normal", "Technique errors mostly push it up"],
              ["Oxygen saturation", "95-100%", "Cold hands, nail polish, poor perfusion cause false lows"],
              ["Pain", "0-10, self-reported", "The patient's number is the number"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "A value inside the normal range can still be a significant change. A patient whose pulse has been 62 for three days and is now 98 has changed substantially, even though 98 is 'normal.' The same is true for a blood pressure that drops 30 points while remaining within range. Report the change, not just the out-of-range value — this is one of the most valuable things a PCT does.",
          },
          {
            type: "table",
            caption: "Technique errors and their direction",
            columns: ["Error", "Effect"],
            rows: [
              ["Cuff too small", "Falsely high, often by 10-20 mmHg"],
              ["Cuff too large", "Falsely low"],
              ["Arm below heart level", "Falsely high"],
              ["Patient talking during measurement", "Falsely high"],
              ["Deflating faster than 2-3 mmHg/second", "Systolic low, diastolic high"],
              ["No rest before measuring", "Falsely high"],
              ["Nail polish or cold fingers on a pulse oximeter", "Falsely low saturation"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Report immediately rather than waiting for handoff: oxygen saturation below 90%; systolic above 180 or below 90; heart rate above 120 or below 50; respirations below 12 or above 24; temperature above 100.4°F; any significant change from baseline; and any abnormal reading accompanied by symptoms such as chest pain, breathlessness, or confusion. You are not deciding what it means — you are making sure the nurse knows in time.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient's pulse has been 60-65 for three days. Today it is 98. What should you do?",
            options: [
              "Record it — 98 is within the normal range",
              "Record it and report the change to the nurse, since a 36-beat rise from baseline is significant",
              "Retake it in an hour and report only if it stays high",
              "Report it only if the patient has symptoms",
            ],
            correctIndex: 1,
            explanation:
              "A substantial change from a patient's established baseline is clinically meaningful even when the new value sits inside the normal range. Reporting the change is within your role; deciding what it signifies is not.",
            optionRationales: [
              "Recording without reporting loses the trend, which is the informative part.",
              "Correct. Record it and report the change from baseline.",
              "Waiting an hour delays information the nurse may need now.",
              "The absence of symptoms does not mean the change is unimportant, and symptoms may develop.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Vital signs are a hands-on skill; this is the knowledge that must precede supervised practice.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write the expected adult ranges for all six vital signs from memory, then check.",
          "For each error in the table, state the direction and rough magnitude of its effect.",
          "For a patient whose blood pressure has been 138/84 and is now 96/58, write the report you would give the nurse in under twenty words.",
          "List eight readings that would prompt you to notify the nurse immediately rather than at handoff.",
        ],
      },
    ],
  },
  {
    slug: "ekg-and-point-of-care-testing",
    title: "EKG and Point-of-Care Testing",
    description:
      "Perform a 12-lead EKG with correct lead placement, and run point-of-care tests within the rules that govern them.",
    duration: "24 min",
    objectives: [
      "Place electrodes correctly for a 12-lead EKG",
      "Recognize and correct artifact",
      "Perform common point-of-care tests correctly",
      "Explain what CLIA-waived testing requires",
    ],
    sections: [
      {
        heading: "Placing the precordial leads",
        blocks: [
          {
            type: "worked-example",
            title: "Finding the fourth intercostal space",
            task: "Place V1 through V6 accurately, since nothing downstream can correct a placement error.",
            steps: [
              {
                move: "Find the sternal angle — the ridge where the manubrium meets the body of the sternum.",
                why: "This is the only reliable landmark, and everything else is counted from it. Estimating by eye is where the common one-space-too-high error starts, and that error is invisible on the finished tracing.",
              },
              {
                move: "Slide laterally from the sternal angle to find the second intercostal space, then count down to the fourth.",
                why: "The second rib attaches at the sternal angle, so the space just below it is the second intercostal space. Count down two more and you are at the fourth. Counting from the clavicle instead is unreliable.",
              },
              {
                move: "Place V1 and V2 either side of the sternum in that fourth space, then V4 before V3.",
                why: "V3 sits midway between V2 and V4, so V4 has to exist first. Placing V3 by eye before V4 is a common sequencing error that misplaces two leads instead of one.",
              },
              {
                move: "Place V4 at the fifth intercostal space, midclavicular line — then V5 and V6 level with V4, not along the rib.",
                why: "V5 and V6 follow the horizontal plane of V4, not the curve of the rib. Following the rib carries them downward and changes the waveform.",
              },
              {
                move: "For a patient with breast tissue, place the electrode under it rather than over it.",
                why: "Placing over breast tissue attenuates the signal and shifts the effective position. Explain what you are doing and why before you do it, and offer a chaperone.",
              },
            ],
            result: "A tracing that reflects the heart's electrical activity rather than where the electrodes happened to land.",
            takeaway: "Count from the sternal angle, place V1, V2, then V4, then V3 between them. Nothing later can fix a misplaced lead.",
          },
        ],
      },
      {
        heading: "Lead placement determines whether the tracing means anything",
        blocks: [
          {
            type: "scenario",
            role: "You perform an EKG on a medical unit at Lakeside Regional.",
            text: "You place V1 and V2 one intercostal space too high — a common error, and invisible on the resulting tracing. The EKG shows changes suggesting a problem the patient does not have, and a clinician who cannot see where you placed the electrodes has no way to know.",
            task: "Place leads precisely, because nothing downstream can correct a placement error.",
          },
          {
            type: "table",
            caption: "12-lead precordial electrode placement",
            columns: ["Lead", "Position"],
            rows: [
              ["V1", "Fourth intercostal space, right sternal border"],
              ["V2", "Fourth intercostal space, left sternal border"],
              ["V3", "Midway between V2 and V4"],
              ["V4", "Fifth intercostal space, midclavicular line"],
              ["V5", "Level with V4, anterior axillary line"],
              ["V6", "Level with V4, midaxillary line"],
            ],
          },
          {
            type: "paragraph",
            text: "Limb electrodes go on the limbs — on fleshy areas, avoiding bone and major muscle. Place V1 and V2 first by locating the sternal angle and counting down to the fourth intercostal space, then V4, then V3 between them, then V5 and V6 level with V4. Placing V3 before V4 is a common cause of misplacement.",
          },
          {
            type: "table",
            caption: "Artifact and its causes",
            columns: ["Appearance", "Cause", "Fix"],
            rows: [
              ["Wandering baseline", "Movement, breathing, loose electrode", "Re-secure electrodes; ask the patient to lie still"],
              ["Fine, irregular fuzz", "Muscle tremor, tension, cold", "Warm the patient; support limbs; ask them to relax"],
              ["Regular thick baseline", "Electrical interference", "Move away from equipment; check cables are not crossed"],
              ["Flat line in one lead", "Disconnected or dry electrode", "Replace that electrode"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never describe an EKG tracing to a patient or interpret it. If a tracing looks alarming, get it to a nurse or provider immediately — and say only that you are having it reviewed. Some findings require action within minutes, so speed matters; interpretation is not yours to offer, and a wrong reassurance is worse than none.",
          },
          {
            type: "paragraph",
            text: "Point-of-care testing is governed by CLIA. Waived tests — glucose meters, urine dipsticks, rapid strep — may be performed by trained unlicensed personnel, but only exactly as the manufacturer specifies. Quality controls must be run at the required frequency and documented, and a failed control means patient testing stops on that system until it is resolved.",
          },
          {
            type: "knowledge-check",
            question:
              "Your EKG tracing shows a wandering, drifting baseline. What is the most likely cause?",
            options: [
              "Electrical interference from nearby equipment",
              "Patient movement, breathing, or a loose electrode",
              "Incorrect V-lead placement",
              "A cardiac arrhythmia",
            ],
            correctIndex: 1,
            explanation:
              "A wandering baseline is a movement artifact — from patient motion, respiration, or an electrode with poor skin contact. Re-secure the electrodes, ensure the skin is clean and dry, and ask the patient to lie still and breathe normally.",
            optionRationales: [
              "Electrical interference produces a regular thickened baseline rather than a slow drift.",
              "Correct. A wandering baseline indicates movement or poor electrode contact.",
              "Misplacement changes the waveform morphology; it does not cause baseline drift.",
              "An arrhythmia alters the rhythm and complexes, not the baseline's stability.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "EKG placement is a hands-on skill requiring supervised practice and competency assessment.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Draw a torso and mark all six precordial positions. Describe how you would locate the fourth intercostal space by palpation.",
          "For each artifact type, describe what you would see and the corrective action.",
          "Research why V1 and V2 placed one space too high produce misleading changes, and what those changes can be mistaken for.",
          "For a glucose meter you research, list every manufacturer requirement including control frequency and storage.",
        ],
      },
    ],
  },
];
