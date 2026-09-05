import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "documenting-in-the-ehr",
    title: "Documenting in the Electronic Health Record",
    description:
      "Write documentation that is accurate, objective, and defensible, and understand what the record is actually for.",
    duration: "24 min",
    objectives: [
      "Distinguish objective from subjective documentation",
      "Document within your scope, without interpreting",
      "Correct an error in the record properly",
      "Explain why the record is a legal document",
    ],
    sections: [
      {
        heading: "The record outlives the visit",
        blocks: [
          {
            type: "scenario",
            role: "You document a visit at Lakeside Medical Associates.",
            text: "You write 'patient seems anxious and is probably overreacting to mild symptoms.' Two years later that sentence is read aloud in a deposition. It contains a judgment you were not qualified to make, about a patient whose symptoms turned out to be significant.",
            task: "Document what you observed and what the patient said, and nothing else.",
          },
          {
            type: "paragraph",
            text: "The medical record serves clinical care first, but it is also a legal document, the basis for billing, and the evidence in any dispute. Everything you enter carries your name and a timestamp, and it is permanent.",
          },
          {
            type: "table",
            caption: "Objective and subjective",
            columns: ["Write this", "Not this", "Because"],
            rows: [
              [
                '"Patient reports pain 8/10 in right lower abdomen"',
                '"Patient in severe pain"',
                "Severity is the patient's report, quantified — not your assessment",
              ],
              [
                '"BP 158/96, right arm, seated, large cuff"',
                '"BP high"',
                "High is an interpretation; the number and conditions are the fact",
              ],
              [
                '"Patient states \'I stopped taking it two weeks ago\'"',
                '"Patient is non-compliant"',
                "Non-compliant is a judgment, and it prejudices everyone who reads it afterwards",
              ],
              [
                '"Patient declined the injection"',
                '"Patient refused and was difficult"',
                "Declining is a fact; difficult is an opinion with no clinical value",
              ],
              [
                '"Wound 3 cm, edges approximated, no drainage"',
                '"Wound looks fine"',
                "Measured description is reproducible; fine is not",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never document an assessment, an interpretation, or a diagnosis. Recording 'appears dehydrated' or 'probably a virus' is clinical judgment, which is outside an MA's scope, and it may steer a provider who reads it before seeing the patient. Record what you measured, what you observed physically, and what the patient told you.",
          },
          {
            type: "paragraph",
            text: "Errors are corrected, never erased. In a paper record, draw a single line through the error so it remains readable, write the correction, and initial and date it. In an EHR, use the amendment function — which preserves the original entry and records who changed what and when. Deleting or overwriting an entry destroys the audit trail and looks, in litigation, exactly like concealment.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never document in advance, and never document care you did not personally provide or witness. Charting a vital sign before you take it, or signing for a colleague's work, is falsification of a medical record — a serious offence independent of whether anything went wrong. It is also one of the fastest ways to lose a healthcare career.",
          },
          {
            type: "knowledge-check",
            question:
              "You realize you entered a vital sign in the wrong patient's chart an hour ago. What should you do?",
            options: [
              "Delete the entry so the wrong record is not affected",
              "Use the EHR's amendment or correction function, which preserves the original entry and records the change",
              "Leave it and add a note to the correct chart",
              "Ask a colleague to remove it under their login",
            ],
            correctIndex: 1,
            explanation:
              "Corrections must preserve the audit trail. The amendment function marks the entry as corrected while retaining the original and recording who changed it and when. Deletion destroys the evidence that the error occurred and was addressed, which is far worse than the error itself.",
            optionRationales: [
              "Deleting destroys the audit trail and, in litigation, is indistinguishable from concealing an error.",
              "Correct. Amend it so the original, the correction, and the author are all preserved.",
              "The wrong chart still contains incorrect clinical data, which could affect that patient's care.",
              "Using another person's login is a serious violation on its own, quite apart from the documentation issue.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Documentation quality is a habit built one entry at a time.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Rewrite each objectively: 'Patient was rude and uncooperative.' 'Vitals look okay.' 'Patient seems to be getting worse.' 'Wound is healing nicely.'",
          "Research the SOAP note format. Identify which sections an MA would typically contribute to and which belong to the provider.",
          "Write a complete intake entry for a patient presenting with a cough, using only objective language and quoting the chief complaint.",
          "Find out how your EHR — or any EHR you can research — handles amendments. Describe what the audit trail preserves.",
        ],
      },
    ],
  },
  {
    slug: "records-management-and-privacy",
    title: "Records Management and Patient Privacy",
    description:
      "Handle records and patient information in line with HIPAA, and recognize the everyday situations where privacy is most often lost.",
    duration: "20 min",
    objectives: [
      "Apply the minimum necessary standard in clinical settings",
      "Identify the routine situations that cause privacy breaches",
      "Handle records requests and releases correctly",
      "Recognize a breach and know the reporting obligation",
    ],
    sections: [
      {
        heading: "Most breaches are ordinary carelessness",
        blocks: [
          {
            type: "scenario",
            role: "You work the clinical floor at Lakeside Medical Associates.",
            text: "A screen left open in an exam room. A conversation about a patient in a corridor with an open waiting area. A printed schedule face-up at the desk. A colleague asking about a mutual acquaintance who came in yesterday. None involves hacking; all are breaches.",
            task: "Recognize the ordinary moments where patient information escapes.",
          },
          {
            type: "paragraph",
            text: "Healthcare privacy failures are rarely dramatic. They are screens, conversations, papers, and curiosity. The clinical staff who handle patients all day have more opportunities to breach privacy than anyone in the building.",
          },
          {
            type: "table",
            caption: "Everyday privacy risks",
            columns: ["Situation", "Risk", "Practice"],
            rows: [
              ["Workstation left unlocked", "Anyone passing can read the record", "Lock the screen every time you step away"],
              ["Corridor conversations", "Overheard by patients and visitors", "Discuss patients only where you cannot be overheard"],
              ["Calling patients from the waiting room", "Announcing more than a name", "Use the name only; never the reason for the visit"],
              ["Printed schedules and labels", "Left visible or discarded intact", "Keep face-down; shred rather than bin"],
              ["Curiosity about a known person", "Access without a work reason", "Never look. Access is logged and audited"],
              ["Sharing logins", "Actions attributed to the wrong person", "Never, under any circumstances"],
            ],
          },
          {
            type: "paragraph",
            text: "Releasing records to anyone other than for treatment, payment, or operations generally requires a valid written authorization from the patient specifying what is released, to whom, and for how long. Family members are not automatically entitled to information, and a spouse asking about a patient's visit has no inherent right to it.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Accessing a record you have no work reason to see is a violation even if you tell nobody and change nothing. Every access is logged and audits are routine. Looking up a friend, a neighbor, a coworker, or a family member out of concern is among the most common causes of termination in healthcare — and concern is not an exception in the rule.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient's spouse calls asking how the appointment went. There is no authorization on file. What do you do?",
            options: [
              "Give a general summary, since they are immediate family",
              "Confirm the appointment happened but withhold clinical details",
              "Explain that you cannot share information without the patient's authorization, and offer to have the patient contact them",
              "Ask the provider whether it is acceptable to share",
            ],
            correctIndex: 2,
            explanation:
              "Marriage does not confer a right to another adult's health information. Without authorization, you cannot disclose clinical details — and confirming that the patient was seen at all is itself protected information. Decline politely and direct them to the patient.",
            optionRationales: [
              "Family relationship alone does not authorize disclosure of an adult patient's information.",
              "Confirming the patient was seen discloses that they received care here, which is protected on its own.",
              "Correct. Decline without authorization and route them back to the patient.",
              "The provider cannot authorize a disclosure the patient has not permitted. This delays the same answer.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Audit the environment you are in.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In any workplace or public setting, identify three ways private information could be observed by someone passing through. Do not record any actual information.",
          "Research what a valid HIPAA authorization for release of records must contain. List the required elements.",
          "For each, decide whether it is a permitted disclosure: sending records to a referred specialist; telling a patient's employer they were seen; giving results to a parent of a 15-year-old; discussing a case with the treating provider.",
          "Write a two-sentence script for declining a family member's request for information, that is firm without being cold.",
        ],
      },
    ],
  },
];
