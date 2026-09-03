import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "the-pct-role",
    title: "The Patient Care Technician Role",
    description:
      "Understand what PCTs do, how the role relates to nursing assistants and medical assistants, and where you sit in the care team.",
    duration: "22 min",
    objectives: [
      "Describe the duties of a patient care technician",
      "Distinguish the PCT role from CNA and MA roles",
      "Explain the reporting relationship to licensed nurses",
      "Describe the certification and state requirements that may apply",
    ],
    sections: [
      {
        heading: "Turning an observation into a report",
        blocks: [
          {
            type: "worked-example",
            title: "Reporting a change a nurse can act on",
            task: "You notice a patient is breathing faster than this morning and is quieter than usual. Report it.",
            steps: [
              {
                move: "Measure before you report.",
                why: "'Breathing faster' is an impression; 'respirations 26, up from 16 at 0800' is data. Taking thirty seconds to count gives the nurse something they can act on immediately rather than something they have to come and verify.",
              },
              {
                move: "Compare against this patient's own baseline, not the textbook range.",
                why: "A respiratory rate of 22 is inside the normal range and may still be a significant rise for someone who has been at 14 for three days. The change is the finding; the absolute number alone can hide it.",
              },
              {
                move: "Note what else changed, including things that are not measurements.",
                why: "Being quieter than usual is a real observation and often the earliest sign of deterioration. You are the person who knows how this patient has been all week — nobody else on the team has that comparison.",
              },
              {
                move: "Report immediately rather than saving it for handoff.",
                why: "Handoff may be hours away. You are not deciding whether the change matters, which is the nurse's judgment; you are making sure they have the information while there is still time to act on it.",
              },
              {
                move: "State it in one sentence: what changed, from what, when, and what else you noticed.",
                why: "'Mrs. Alvarez in 312 — respirations 26, up from 16 this morning, and she's much quieter than she's been all week' gives the nurse everything in four seconds. A narrative makes them extract it.",
              },
            ],
            result: "The nurse can decide whether to assess now, with numbers and a baseline in hand.",
            takeaway: "Measure it, compare it to the patient's own baseline, report it now, and say it in one sentence.",
          },
        ],
      },
      {
        heading: "Closest to the patient",
        blocks: [
          {
            type: "scenario",
            role: "You are starting as a PCT on a medical unit at Lakeside Regional.",
            text: "Over a twelve-hour shift you will spend more time at the bedside than any other member of the team. You will notice that a patient's breathing has changed, that they have not eaten, that they seem confused this afternoon when they were not this morning. Nobody else is positioned to notice those things first.",
            task: "Understand the role's real contribution: sustained proximity, and the observations only that produces.",
          },
          {
            type: "paragraph",
            text: "Patient care technicians provide direct care under the supervision of licensed nurses. The role combines the personal care duties of a nursing assistant with additional technical skills — commonly phlebotomy, EKG, and point-of-care testing — which is what distinguishes a PCT from a CNA in most facilities.",
          },
          {
            type: "table",
            caption: "Where the roles differ",
            columns: ["Role", "Setting", "Typical additional skills"],
            rows: [
              [
                "CNA",
                "Long-term care, hospitals",
                "Personal care, mobility, vital signs; state certification required",
              ],
              [
                "PCT",
                "Hospitals, dialysis, ambulatory",
                "CNA duties plus phlebotomy, EKG, point-of-care testing",
              ],
              [
                "Medical assistant",
                "Outpatient clinics",
                "Clinical and administrative; works under provider delegation",
              ],
              [
                "LPN/LVN",
                "Varied",
                "Licensed nursing within a defined scope",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Titles vary considerably between employers. What one hospital calls a PCT, another calls a Nurse Extern, Patient Care Assistant, or Clinical Technician — and the duties differ with the title. Many states also require CNA certification as the foundation for a PCT position, which involves a state-approved training program with a required number of supervised clinical hours. Check the requirements where you intend to work rather than assuming.",
          },
          {
            type: "paragraph",
            text: "PCTs report to and work under the supervision of a registered nurse. The nurse remains accountable for the patient's nursing care, delegates specific tasks, and relies on you to report back accurately. That reporting relationship is the core of the job — a delegated task performed well but not reported is only half done.",
          },
          {
            type: "table",
            caption: "Within the role, and outside it",
            columns: ["Within", "Outside"],
            rows: [
              ["Measuring and recording vital signs", "Interpreting what they mean"],
              ["Assisting with bathing, dressing, toileting", "Assessing skin integrity as a nursing assessment"],
              ["Repositioning and ambulating patients", "Deciding a patient's activity level"],
              ["Recording intake and output", "Adjusting fluid orders"],
              ["Collecting specimens", "Interpreting results"],
              ["Reporting observations to the nurse", "Diagnosing or advising the patient clinically"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "A patient asks you what their blood pressure reading means and whether it is dangerous. What is the appropriate response?",
            options: [
              "Explain the normal ranges and where their reading falls",
              "Tell them the number, and that you will ask the nurse to discuss what it means",
              "Reassure them it is probably fine",
              "Decline to share the reading at all",
            ],
            correctIndex: 1,
            explanation:
              "Sharing the measurement is appropriate — it is their own information. Interpreting it is a nursing or provider function. Give the number, then bring the nurse in for the clinical meaning, which is exactly the reporting relationship the role runs on.",
            optionRationales: [
              "Explaining where a reading falls clinically is interpretation, which is outside the role.",
              "Correct. Share the measurement, escalate the interpretation.",
              "Reassurance is a clinical judgment, and it may well be wrong.",
              "The reading is the patient's own health information; withholding it is unnecessary and damages trust.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Find out what the role actually requires where you intend to work.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find three PCT job postings in your area. List every duty and every credential required or preferred.",
          "Determine whether your state requires CNA certification for PCT roles, and what a state-approved CNA program involves, including required clinical hours.",
          "Research the CPCT/A (NHA) and NCPCT (NCCT) certifications. Note the eligibility requirements for each.",
          "For each of the six 'within the role' items in the table, write one sentence on what you would report to the nurse and when.",
        ],
      },
    ],
  },
  {
    slug: "communication-and-patient-rights",
    title: "Communication, Ethics, and Patient Rights",
    description:
      "Communicate with patients and the care team effectively, and understand the rights that govern how patients are treated.",
    duration: "24 min",
    objectives: [
      "Report observations to a nurse clearly and completely",
      "Describe fundamental patient rights",
      "Recognize and report abuse or neglect",
      "Maintain dignity in personal care",
    ],
    sections: [
      {
        heading: "Reporting is the job",
        blocks: [
          {
            type: "scenario",
            role: "You are working a medical unit at Lakeside Regional.",
            text: "You notice a patient's breathing seems faster than this morning and they are quieter than usual. You mention at handoff that they 'seemed a bit off.' The oncoming nurse has nothing actionable, and a deterioration that was visible at two o'clock is found at six.",
            task: "Report observations specifically enough that a nurse can act on them.",
          },
          {
            type: "paragraph",
            text: "A PCT's most valuable contribution is often an observation nobody else was present to make. That value is realized only when the observation is reported in a form a nurse can use — which means specific, measured, and compared to a baseline.",
          },
          {
            type: "table",
            caption: "Vague against actionable",
            columns: ["Vague", "Actionable"],
            rows: [
              [
                "Seems a bit off",
                "Respirations 26, up from 16 this morning; quieter than usual; declined lunch",
              ],
              ["Didn't eat much", "Ate about 25% of lunch; no breakfast"],
              ["Seems confused", "Did not know where she was at 1400; oriented at 0800"],
              ["Complained of pain", "Reported 7/10 pain in right hip on repositioning at 1330"],
              ["Skin looks bad", "New 2 cm reddened area over sacrum, does not blanch"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Report a change immediately rather than saving it for handoff, particularly any change in breathing, level of consciousness, or skin colour, or a new or worsening pain. You are not deciding whether it matters — that is the nurse's judgment. You are making sure they have the information to make it while there is still time.",
          },
          {
            type: "table",
            caption: "Fundamental patient rights",
            columns: ["Right", "In practice"],
            rows: [
              ["To be treated with dignity and respect", "Knock, introduce yourself, explain before you touch"],
              ["To privacy and confidentiality", "Curtains and doors closed; no discussion in corridors"],
              ["To refuse care", "A patient may decline anything; report the refusal, do not override it"],
              ["To be informed", "Explain what you are about to do, every time"],
              ["To be free from abuse and neglect", "Recognize it and report it; you are likely a mandated reporter"],
              ["To be free from unnecessary restraint", "Restraints require an order and close monitoring"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "A competent adult may refuse any care, including care that is clearly in their interest. Your role is to explain what you were going to do and why, accept the refusal, and report it to the nurse. Persuading is acceptable; proceeding anyway is battery. This applies to a bath, a repositioning, and a blood draw equally.",
          },
          {
            type: "paragraph",
            text: "Abuse and neglect must be recognized and reported. Physical signs include unexplained bruising, particularly in patterns or at various stages of healing. Behavioural signs include fear of specific staff or visitors, withdrawal, or a change in demeanour when someone is present. Neglect shows as poor hygiene, dehydration, untreated pressure injuries, or unmet basic needs. Healthcare workers are mandated reporters in most jurisdictions — report through your facility's process, and reporting is required whether or not you are certain.",
          },
          {
            type: "knowledge-check",
            question:
              "A competent patient refuses their scheduled bath. What should you do?",
            options: [
              "Proceed gently, since hygiene is necessary for their health",
              "Accept the refusal, explain why it was offered, and report it to the nurse",
              "Wait an hour and try again without mentioning it",
              "Document that the patient is non-compliant",
            ],
            correctIndex: 1,
            explanation:
              "A competent adult may refuse any care. Explaining the reason and offering an alternative time is appropriate; proceeding against their refusal is battery regardless of benefit. Report it — a refusal can itself be clinically significant.",
            optionRationales: [
              "Proceeding against a competent refusal is battery, whatever the health rationale.",
              "Correct. Accept it, explain, offer alternatives, and report.",
              "Trying again later is reasonable; not reporting it is not, since the refusal may be clinically meaningful.",
              "'Non-compliant' is a judgment. Document the refusal factually — the patient exercised a right.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Precision in reporting is learnable and immediately useful.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Rewrite each as an actionable report: 'She's not herself today.' 'He didn't sleep well.' 'The wound looks worse.' 'He's in a lot of pain.'",
          "Research the SBAR communication format. Write an SBAR report for the patient in the opening scenario.",
          "Find your state's mandated reporter requirements for healthcare workers. Note who must report, what, and within what timeframe.",
          "List four signs of possible abuse and four of neglect, and describe how you would report a concern through a facility process.",
        ],
      },
    ],
  },
];
