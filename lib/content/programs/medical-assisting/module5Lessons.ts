import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "preparing-patients-and-rooms",
    title: "Preparing Patients and Examination Rooms",
    description:
      "Set up rooms and position patients for examinations and procedures, with attention to safety, dignity, and efficiency.",
    duration: "22 min",
    objectives: [
      "Prepare an examination room between patients",
      "Position patients correctly for common examinations",
      "Drape and gown patients to preserve dignity",
      "Identify safety risks in the examination room",
    ],
    sections: [
      {
        heading: "Preparation is patient care",
        blocks: [
          {
            type: "scenario",
            role: "You turn over exam rooms at Lakeside Medical Associates.",
            text: "The provider enters to find the previous patient's table paper still down, the instrument needed for the procedure in another room, and a patient positioned wrongly for the examination. The visit takes twelve minutes longer, and the patient spent five of them in an uncomfortable position for no reason.",
            task: "Prepare rooms and patients so the clinical work can happen without interruption.",
          },
          {
            type: "table",
            caption: "Common examination positions",
            columns: ["Position", "Patient is", "Used for"],
            rows: [
              ["Sitting", "Upright on the table edge", "General examination, heart and lung sounds"],
              ["Supine", "Flat on the back", "Abdominal examination, general assessment"],
              ["Dorsal recumbent", "On back, knees bent, feet flat", "Abdominal examination when muscles need relaxing"],
              ["Lithotomy", "On back, legs in stirrups", "Pelvic and genitourinary examination"],
              ["Sims", "Left side, right knee drawn up", "Rectal examination, enema administration"],
              ["Prone", "Face down", "Back examination, spine"],
              ["Fowler's", "Head elevated 45-60 degrees", "Patients with breathing difficulty"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Position the patient as late as possible, particularly for lithotomy and Sims. These positions are uncomfortable and expose the patient, and leaving someone in one while waiting for the provider is a genuine and avoidable indignity. Drape so that only the area being examined is uncovered, and adjust the drape rather than the patient when possible.",
          },
          {
            type: "table",
            caption: "Room turnover",
            columns: ["Step", "Detail"],
            rows: [
              ["Dispose of used supplies", "Sharps to the sharps container at point of use, never a waste bin"],
              ["Disinfect contact surfaces", "Table, counter, equipment the patient touched; observe the product's wet contact time"],
              ["Change table paper and linens", "Fresh for every patient, without exception"],
              ["Restock", "Gloves, gowns, gauze, specimen containers, anything used"],
              ["Set up for the next visit", "Instruments and supplies the scheduled visit type requires"],
              ["Hand hygiene", "Before leaving and before the next patient"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Disinfectants have a required wet contact time — often several minutes — during which the surface must remain visibly wet to be effective. Wiping a surface and immediately drying it does not disinfect it; it cleans it. Read the product label, because the time varies by product and by organism.",
          },
          {
            type: "knowledge-check",
            question:
              "When should a patient be placed in the lithotomy position?",
            options: [
              "As soon as they are gowned, so the room is ready",
              "Immediately before the examination begins, to minimize time in an uncomfortable and exposing position",
              "Whenever the patient prefers",
              "At the start of every gynecological visit, including the history",
            ],
            correctIndex: 1,
            explanation:
              "Lithotomy is uncomfortable and highly exposing. Positioning the patient early so the room 'looks ready' leaves them in it needlessly, sometimes for several minutes. Take the history and complete preparation with the patient seated or supine, and position them as the examination begins.",
            optionRationales: [
              "This prioritizes room readiness over the patient's dignity and comfort.",
              "Correct. Position as late as possible and minimize the time spent there.",
              "Patient comfort matters, but the clinical position is determined by the examination being performed.",
              "The history is taken with the patient comfortable and clothed wherever possible.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Room preparation is a sequence worth internalizing.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a room turnover checklist in order, from the moment the previous patient leaves to the moment the next is roomed.",
          "For each position in the table, sketch or describe it and name one examination it supports.",
          "Find the label of any hospital-grade disinfectant and note its required wet contact time and the organisms it claims against.",
          "List four safety risks in an examination room and one control for each.",
        ],
      },
    ],
  },
  {
    slug: "assisting-with-procedures",
    title: "Assisting with Minor Procedures",
    description:
      "Support the provider during minor office procedures, maintaining sterile technique and anticipating what is needed next.",
    duration: "24 min",
    objectives: [
      "Distinguish medical asepsis from surgical asepsis",
      "Set up and maintain a sterile field",
      "Anticipate the provider's needs during a procedure",
      "Handle specimens and sharps safely during and after",
    ],
    sections: [
      {
        heading: "Clean versus sterile",
        blocks: [
          {
            type: "scenario",
            role: "You assist with a laceration repair at Lakeside Medical Associates.",
            text: "You open the suture packet correctly onto the sterile field, then reach across the field to hand the provider gauze. Your arm passed over the sterile surface. The field is contaminated, and if nobody says so, it is used anyway.",
            task: "Learn the rules of sterile technique well enough to notice a break and say so.",
          },
          {
            type: "paragraph",
            text: "Medical asepsis reduces the number of organisms — handwashing, disinfection, clean gloves. Surgical asepsis eliminates them entirely from a defined area, and is required whenever the body's natural barriers are broken.",
          },
          {
            type: "table",
            caption: "Rules of the sterile field",
            columns: ["Rule", "Why"],
            rows: [
              ["Only sterile items touch sterile items", "Any contact with an unsterile item contaminates"],
              ["Keep the field in view at all times", "An unobserved field must be treated as contaminated"],
              ["Never reach across the field", "Anything passing over it may shed onto it"],
              ["The outer 1 inch of a drape is not sterile", "The border is the boundary; items placed there are contaminated"],
              ["A wet field is a contaminated field", "Moisture wicks organisms up from the surface beneath"],
              ["Anything below waist level is contaminated", "It cannot be kept in view or controlled"],
              ["Face the field; never turn your back on it", "You cannot observe what you cannot see"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "If you contaminate a sterile field, say so immediately. Every person in the room would rather spend two minutes re-setting a field than have a patient develop a surgical site infection. Nobody will thank you for staying quiet, and a contaminated field used knowingly is a patient safety event you participated in. There is no version of this where saying nothing is the better choice.",
          },
          {
            type: "table",
            caption: "Anticipating during a procedure",
            columns: ["Stage", "Have ready"],
            rows: [
              ["Preparation", "Consent confirmed, patient positioned, field set, lighting adjusted"],
              ["Anesthesia", "Syringe, needle, anesthetic, alcohol prep"],
              ["The procedure", "Instruments in order of use, gauze, suture, irrigation"],
              ["Specimen", "Labelled container, requisition, fixative if required"],
              ["Closure", "Dressing supplies, tape, wound care instructions"],
              ["Afterwards", "Sharps disposed at point of use, specimen routed, documentation"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Label specimen containers in the presence of the patient, immediately after collection, before leaving the room. Labelling later — or labelling several containers in advance — is how specimens get switched, and a mislabelled specimen means a patient receives a result belonging to someone else. This is among the most consequential errors in an outpatient setting and among the easiest to prevent.",
          },
          {
            type: "knowledge-check",
            question:
              "During a procedure you realize your sleeve brushed the sterile field. Nobody else noticed. What should you do?",
            options: [
              "Say nothing — the risk is small and interrupting would be disruptive",
              "State immediately that the field is contaminated so it can be re-established",
              "Quietly move the items that were touched to one side",
              "Mention it after the procedure so it can be noted",
            ],
            correctIndex: 1,
            explanation:
              "A contaminated field must be re-established, and the only person who knows it happened is you. Saying so immediately costs a few minutes; staying quiet exposes the patient to an infection risk that was entirely preventable. Speaking up about your own error is a core professional obligation.",
            optionRationales: [
              "The risk is to the patient, and the interruption is trivial by comparison.",
              "Correct. Say it immediately so the field can be re-established before the procedure continues.",
              "Contamination is not confined to the visible point of contact, and moving items does not restore sterility.",
              "Afterwards is too late — the patient has already been exposed.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Sterile technique is psychomotor. This prepares you for supervised practice.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write the rules of the sterile field from memory, then check against a reference.",
          "For each, decide whether the field is contaminated and why: an item placed 1/2 inch from the drape edge; a sterile package opened away from your body; turning to answer a question; saline soaking through the drape.",
          "Research the difference between sterilization, disinfection, and sanitization, and give a clinical example of each.",
          "Write a labelling procedure for specimens that makes a mix-up structurally difficult rather than merely discouraged.",
        ],
      },
    ],
  },
];
