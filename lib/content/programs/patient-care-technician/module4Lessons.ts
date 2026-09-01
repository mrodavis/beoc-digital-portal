import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "activities-of-daily-living",
    title: "Assisting with Activities of Daily Living",
    description:
      "Provide personal care that preserves dignity and independence, and observe what only this closeness reveals.",
    duration: "24 min",
    objectives: [
      "Assist with bathing, dressing, grooming, and oral care",
      "Preserve patient dignity and independence during personal care",
      "Observe and report skin condition during care",
      "Adapt care for patients with cognitive impairment",
    ],
    sections: [
      {
        heading: "Care that keeps a person a person",
        blocks: [
          {
            type: "scenario",
            role: "You provide morning care on a medical unit at Lakeside Regional.",
            text: "A patient who dressed himself every day for seventy years now needs help with a shirt. How that help is given determines whether he experiences it as assistance or as the moment he stopped being an adult. It costs nothing to do it the first way.",
            task: "Provide personal care in a way that protects dignity, and use the closeness to observe.",
          },
          {
            type: "paragraph",
            text: "Personal care is where PCTs spend much of their time and where the role's real character shows. Two people can complete the same task in the same time, and one leaves the patient feeling cared for while the other leaves them feeling processed.",
          },
          {
            type: "table",
            caption: "Practices that preserve dignity",
            columns: ["Do", "Why"],
            rows: [
              ["Knock and wait before entering", "It is their room, temporarily"],
              ["Introduce yourself and explain before touching", "Nobody should be touched without knowing why"],
              ["Close the door and curtain every time", "Exposure is the most common complaint in personal care"],
              ["Keep the patient covered except the area you are working on", "Dignity is maintained by drape, not by speed"],
              ["Let them do what they can, even slowly", "Independence lost is rarely regained"],
              ["Offer choices", "Water temperature, order of tasks, what to wear — small autonomy matters"],
              ["Talk with them, not over them", "Never converse with a colleague across a patient as if absent"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Personal care is the best opportunity in the whole day to observe skin. You are seeing areas nobody else sees, in good light, with your hands on the patient. New redness, a change in a wound, swelling, bruising, or a patient wincing at a spot they had not mentioned — all of this is observable during a bath and easy to miss otherwise. Report what you find.",
          },
          {
            type: "table",
            caption: "Adapting for cognitive impairment",
            columns: ["Approach", "Why"],
            rows: [
              ["Approach from the front; make eye contact", "Approaching from behind startles and can provoke resistance"],
              ["One simple instruction at a time", "Multi-step directions exceed working memory"],
              ["Demonstrate rather than only explaining", "Visual cues succeed where words do not"],
              ["Allow far more time than seems necessary", "Rushing reliably produces resistance"],
              ["If refused, stop and try again later", "Persisting escalates; a later attempt often succeeds"],
              ["Never argue with a mistaken belief", "Redirect instead — correcting causes distress and changes nothing"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "A patient with dementia becomes agitated and resists during a bath. What should you do?",
            options: [
              "Continue quickly to get it finished with less distress overall",
              "Stop, leave the patient covered and comfortable, and try again later or ask a colleague to attempt it",
              "Explain firmly why the bath is necessary",
              "Ask another staff member to help hold them still",
            ],
            correctIndex: 1,
            explanation:
              "Resistance escalates when care is forced, and a bath is almost never urgent. Stopping and trying later — or having a different person attempt it — very often succeeds where persisting would not. Forcing care against resistance risks injury to both of you and is a dignity violation.",
            optionRationales: [
              "Continuing through resistance escalates distress and risks injury.",
              "Correct. Stop, keep them comfortable, and try again later or with a different approach.",
              "Reasoning does not work with impaired comprehension, and firmness reads as threat.",
              "Restraining someone for a routine bath is a serious violation and a real injury risk.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Personal care technique requires supervised practice; the approach can be thought through now.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write the steps of a complete bed bath in order, noting every point where you would change gloves.",
          "For a patient who can wash their own face and arms but not their back or legs, describe how you would structure the bath to preserve independence.",
          "Research the stages of pressure injury. Describe what stage 1 looks like and why it is the critical one to catch.",
          "Write five things you would observe and report during a bed bath that you would not see otherwise.",
        ],
      },
    ],
  },
  {
    slug: "mobility-and-positioning",
    title: "Mobility, Positioning, and Skin Integrity",
    description:
      "Reposition and ambulate patients safely, and prevent the pressure injuries that develop when they are not moved.",
    duration: "24 min",
    objectives: [
      "Reposition patients on a schedule to prevent pressure injury",
      "Identify pressure points and stage 1 pressure injury",
      "Assist with ambulation using a gait belt",
      "Apply range of motion exercises within your scope",
    ],
    sections: [
      {
        heading: "Pressure injuries are preventable and largely your responsibility",
        blocks: [
          {
            type: "scenario",
            role: "You care for an immobile patient at Lakeside Regional.",
            text: "A patient who cannot reposition themselves is left on their back for four hours during a busy shift. A reddened area develops over the sacrum. Caught now it resolves in days. Missed, it becomes an open wound that takes months, and it was entirely preventable by turning them.",
            task: "Reposition on schedule and inspect skin every time, because nobody else is checking.",
          },
          {
            type: "paragraph",
            text: "Pressure injuries develop when sustained pressure cuts off blood supply to tissue over a bony prominence. They begin within hours in a vulnerable patient. Prevention is repositioning, keeping skin clean and dry, adequate nutrition and hydration, and inspecting the skin — and most of that is PCT work.",
          },
          {
            type: "table",
            caption: "Common pressure points by position",
            columns: ["Position", "At risk"],
            rows: [
              ["Supine", "Sacrum, heels, elbows, back of head, shoulder blades"],
              ["Side-lying", "Hip (greater trochanter), outer ankle, ear, shoulder, inner knees"],
              ["Prone", "Toes, knees, genitals, breasts, cheek, ear"],
              ["Sitting", "Ischial tuberosities (sitting bones), sacrum, heels"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "A stage 1 pressure injury is intact skin with redness that does not blanch — press it and the colour stays. Blanchable redness fades under pressure and returns; that is normal. Non-blanchable redness means tissue damage has already begun. In darker skin tones colour change may be subtle or absent, so also assess for warmth, firmness, boggy texture, and pain compared with surrounding skin. Report any suspected stage 1 immediately — this is the stage at which it is still fully reversible.",
          },
          {
            type: "table",
            caption: "Repositioning and prevention",
            columns: ["Measure", "Detail"],
            rows: [
              ["Reposition at least every 2 hours in bed", "More often if skin shows early changes"],
              ["Reposition every 1 hour in a chair", "Sitting concentrates pressure on a small area"],
              ["Use a 30-degree side-lying tilt", "Avoids direct pressure on the trochanter"],
              ["Float the heels off the bed", "Pillows under the calves; heels have almost no padding"],
              ["Keep the head of bed at or below 30 degrees where possible", "Higher creates shear on the sacrum"],
              ["Lift rather than drag when moving", "Dragging causes shear and friction injury"],
              ["Keep skin clean and dry", "Moisture makes skin far more vulnerable"],
            ],
          },
          {
            type: "paragraph",
            text: "For ambulation, use a gait belt fitted snugly around the patient's waist over clothing. Stand on their weaker side, slightly behind. Hold the belt underhand, never the patient's arm — an arm can dislocate and gives you no control. If they begin to fall, do not try to hold them up: guide them down, protecting their head, and lower yourself with them.",
          },
          {
            type: "knowledge-check",
            question:
              "You find a reddened area over a patient's sacrum. Pressing it does not cause the redness to fade. What does this indicate?",
            options: [
              "Normal redness from lying in one position, which will resolve",
              "A suspected stage 1 pressure injury — report it immediately",
              "A stage 2 pressure injury, since the skin is affected",
              "An allergic reaction to linens",
            ],
            correctIndex: 1,
            explanation:
              "Non-blanchable redness over a bony prominence is the defining sign of a stage 1 pressure injury: tissue damage has begun although the skin is intact. It is fully reversible at this stage with prompt pressure relief, which is exactly why immediate reporting matters.",
            optionRationales: [
              "Normal reactive redness blanches under pressure and fades. Non-blanchable redness does not.",
              "Correct. Non-blanchable erythema over a bony prominence is a suspected stage 1 injury.",
              "Stage 2 involves partial-thickness skin loss — an open area or blister. This skin is intact.",
              "An allergic reaction would not be confined to a single bony prominence.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Transfers and repositioning require supervised hands-on practice.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Draw a body outline and mark every pressure point for supine and side-lying positions.",
          "Research the pressure injury staging system. Describe each stage in one sentence.",
          "Research the Braden Scale. List the six factors it assesses and what a low score indicates.",
          "Write out the steps for assisting a weak patient to ambulate with a gait belt, including what you would do if they began to fall.",
        ],
      },
    ],
  },
];
