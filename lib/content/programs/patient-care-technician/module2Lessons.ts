import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "infection-control-for-pcts",
    title: "Infection Control at the Bedside",
    description:
      "Apply Standard Precautions and PPE in a setting where you have sustained, close physical contact with patients.",
    duration: "24 min",
    objectives: [
      "Apply Standard Precautions in direct care",
      "Don and doff PPE in the correct sequence",
      "Apply transmission-based precautions correctly",
      "Prevent transmission during personal care tasks",
    ],
    sections: [
      {
        heading: "Working through a bed bath without cross-contaminating",
        blocks: [
          {
            type: "worked-example",
            title: "Where the gloves change during personal care",
            task: "Give a bed bath to a patient who also has a wound dressing that needs checking, without carrying organisms from one task to the next.",
            steps: [
              {
                move: "Hand hygiene, then gloves, before you touch the patient at all.",
                why: "The first moment is before contact, not after. Gloves put on over unwashed hands carry whatever was on them into the task, and the glove gives you no protection from something you brought in yourself.",
              },
              {
                move: "Work clean to dirty, top to bottom, and change gloves when you cross that line.",
                why: "Wash the face and upper body before the perineal area, never the reverse. This is the single ordering rule that prevents most cross-contamination during personal care, and it costs nothing to follow.",
              },
              {
                move: "After perineal care: remove gloves, perform hand hygiene, put on fresh gloves.",
                why: "All three steps, in that order. Changing gloves without hand hygiene between is the common shortcut and it defeats the purpose — hands are contaminated during removal regardless of technique.",
              },
              {
                move: "Only now approach the wound dressing.",
                why: "Moving from a dirty task to an open wound on the same patient is a direct route to infection. The fact that it is the same person is irrelevant — organisms from the perineum do not belong in a wound.",
              },
              {
                move: "Remove gloves and perform hand hygiene before touching the bed rails, the call light, or the chart.",
                why: "Everything you touch after care becomes a surface the next person touches. This is how an organism leaves the room, and it is the step most often skipped because the task feels finished.",
              },
            ],
            result: "One patient, one bath, one wound check, and nothing carried between them.",
            takeaway: "Clean to dirty, and remove-hygiene-reglove as a single unit every time you cross the line.",
          },
        ],
      },
      {
        heading: "Proximity raises the stakes",
        blocks: [
          {
            type: "scenario",
            role: "You provide direct care on a medical unit at Lakeside Regional.",
            text: "Over a shift you bathe patients, assist with toileting, reposition people, change linens, and collect specimens. Every one of those involves close contact with body fluids. Nobody in the building has more opportunities to transmit an organism from one patient to another than you do.",
            task: "Build infection control habits robust enough to survive a twelve-hour shift under time pressure.",
          },
          {
            type: "paragraph",
            text: "Standard Precautions apply to every patient in every encounter: blood, all body fluids except sweat, non-intact skin, and mucous membranes are treated as potentially infectious. In direct care this is not an abstraction — it governs most of what you do all day.",
          },
          {
            type: "table",
            caption: "Hand hygiene moments in direct care",
            columns: ["Moment", "Example"],
            rows: [
              ["Before touching a patient", "Before helping someone reposition"],
              ["Before a clean or aseptic procedure", "Before catheter care"],
              ["After body fluid exposure risk", "After assisting with toileting"],
              ["After touching a patient", "After a bed bath"],
              ["After touching patient surroundings", "After changing linens or adjusting a bed rail"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Gloves are not a substitute for hand hygiene, and the same gloves must never move between patients or between a dirty and a clean task on the same patient. Changing gloves after perineal care and before touching a wound — with hand hygiene between — is not excessive caution; it is the difference between care and cross-contamination.",
          },
          {
            type: "table",
            caption: "Donning and doffing",
            columns: ["Put on", "Take off"],
            rows: [
              ["1. Gown", "1. Gloves"],
              ["2. Mask or respirator", "2. Eye protection"],
              ["3. Eye protection", "3. Gown"],
              ["4. Gloves over gown cuffs", "4. Mask or respirator, outside the room"],
            ],
          },
          {
            type: "table",
            caption: "Transmission-based precautions",
            columns: ["Type", "PPE", "Examples"],
            rows: [
              ["Contact", "Gown and gloves; dedicated equipment", "C. difficile, MRSA, scabies"],
              ["Droplet", "Surgical mask; mask the patient during transport", "Influenza, pertussis"],
              ["Airborne", "Fit-tested N95 or higher; negative-pressure room", "Tuberculosis, measles, varicella"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "For a patient with C. difficile, use soap and water rather than alcohol-based rub — alcohol does not kill C. difficile spores, and only the mechanical action of washing removes them. Contact precautions also require dedicated equipment: that patient's blood pressure cuff, stethoscope, and thermometer stay in the room.",
          },
          {
            type: "knowledge-check",
            question:
              "You have just finished perineal care and now need to apply a dressing to a wound on the same patient. What should you do?",
            options: [
              "Continue with the same gloves, since it is the same patient",
              "Remove gloves, perform hand hygiene, and put on fresh gloves before the wound care",
              "Wipe the gloves with an alcohol wipe and continue",
              "Change gloves without hand hygiene, since your hands did not touch anything",
            ],
            correctIndex: 1,
            explanation:
              "Moving from a dirty task to a clean one requires a glove change with hand hygiene between, even on the same patient. Organisms from perineal care transferred to an open wound is a direct route to infection, and the fact that it is the same patient is irrelevant.",
            optionRationales: [
              "Same-patient cross-contamination is a real and serious route of infection.",
              "Correct. Remove, perform hand hygiene, and re-glove between dirty and clean tasks.",
              "Gloves are not disinfected and reused. Alcohol degrades the material and does not reliably decontaminate it.",
              "Hands are contaminated during glove removal regardless of what they appear to have touched.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Infection control technique is a psychomotor skill requiring supervised practice.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write both PPE sequences from memory, then check against the CDC poster.",
          "For a complete bed bath, list every point at which gloves should change and hand hygiene should occur.",
          "For each, state the precautions required: suspected tuberculosis; C. difficile; influenza; MRSA in a wound.",
          "Explain in three sentences why dedicated equipment is required under contact precautions.",
        ],
      },
    ],
  },
  {
    slug: "safety-and-body-mechanics",
    title: "Patient Safety and Body Mechanics",
    description:
      "Move and transfer patients without injuring them or yourself, and prevent the falls that cause most inpatient harm.",
    duration: "24 min",
    objectives: [
      "Apply body mechanics principles when moving patients",
      "Use transfer techniques and equipment safely",
      "Identify fall risk factors and apply prevention measures",
      "Describe safe use of restraints and their alternatives",
    ],
    sections: [
      {
        heading: "You cannot care for patients from a back injury",
        blocks: [
          {
            type: "scenario",
            role: "You work a busy medical unit at Lakeside Regional.",
            text: "A patient is sliding down in bed and asks to be pulled up. You are alone, the lift equipment is on another unit, and it would take four minutes to get help. You reach across the bed, twist, and pull. The patient is repositioned. Your back is the reason you leave this job in eighteen months.",
            task: "Learn the mechanics and the equipment, and the discipline of waiting for help.",
          },
          {
            type: "table",
            caption: "Body mechanics principles",
            columns: ["Principle", "In practice"],
            rows: [
              ["Wide base of support", "Feet shoulder-width apart, one slightly forward"],
              ["Bend at the knees and hips", "Never at the waist"],
              ["Keep the load close", "Reaching multiplies the force on your spine"],
              ["Push or pull rather than lift", "Sliding uses far less force than lifting"],
              ["Never twist", "Turn your whole body by moving your feet"],
              ["Raise the bed to waist height", "Working at a low bed guarantees a bent back"],
              ["Get help or equipment", "Most injuries happen to people working alone"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Most healthcare back injuries are cumulative rather than the result of one dramatic lift. They come from hundreds of small repositionings done slightly wrong under time pressure. The four minutes spent finding a colleague or a lift is genuinely cheaper than the injury, and this is the single most common reason people leave direct care work.",
          },
          {
            type: "table",
            caption: "Fall risk factors",
            columns: ["Factor", "Prevention"],
            rows: [
              ["History of falls", "The strongest single predictor — flag and monitor closely"],
              ["Confusion or altered mental status", "Frequent rounding; consider a low bed"],
              ["Medications causing dizziness or sedation", "Assist with all transfers"],
              ["Weakness or unsteady gait", "Gait belt; appropriate footwear; assistive device within reach"],
              ["Urgency or frequency of urination", "Proactive toileting rounds"],
              ["Environmental hazards", "Call light in reach, clear floor, adequate lighting, brakes locked"],
            ],
          },
          {
            type: "paragraph",
            text: "Purposeful rounding — checking each patient on a schedule and addressing pain, position, toileting, and whether their belongings are in reach — prevents more falls than any single intervention. Most falls happen when a patient tries to do something alone because nobody has come, and the toilet is where a great many of them occur.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Restraints require a provider's order, are time-limited, and demand close monitoring — they are never a convenience or a substitute for staffing. They also carry real risk, including strangulation and injury from struggling against them. Side rails count: four raised rails is a restraint, and patients have died trying to climb over them. Exhaust alternatives first — rounding, repositioning, addressing the unmet need driving the behaviour.",
          },
          {
            type: "knowledge-check",
            question:
              "You are alone and a patient needs repositioning up in bed. Lift equipment is available but on another unit. What should you do?",
            options: [
              "Reposition them yourself using careful technique",
              "Get help or the equipment, even though it takes several minutes",
              "Ask the patient to help by pulling on the bed rail",
              "Raise the head of the bed and leave it until a colleague is free",
            ],
            correctIndex: 1,
            explanation:
              "Solo repositioning is the leading cause of cumulative back injury in direct care, and careful technique does not make it safe at the weights involved. Several minutes to get help or equipment is the correct trade. If the patient must be moved urgently, call for immediate help rather than proceeding alone.",
            optionRationales: [
              "Good technique reduces but does not eliminate the risk; the loads exceed safe solo limits.",
              "Correct. Get help or equipment — the delay is much cheaper than the injury.",
              "Patients pulling on rails risk shoulder injury and a fall, and it does not meaningfully reduce your load.",
              "Leaving a patient sliding down in bed risks skin shear and discomfort. Get help rather than deferring indefinitely.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Transfers are a hands-on skill requiring supervised practice before performing them on patients.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write the body mechanics principles from memory, then check.",
          "Research the Morse Fall Scale. List the factors it scores and what score indicates high risk.",
          "For a patient who is confused, has fallen once, and takes a sedating medication, write a fall prevention plan of five specific measures.",
          "Research safe patient handling equipment — sit-to-stand lifts, ceiling lifts, friction-reducing sheets. Describe when each is indicated.",
        ],
      },
    ],
  },
];
