import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "nutrition-hydration-and-elimination",
    title: "Nutrition, Hydration, and Elimination",
    description:
      "Assist with eating and toileting safely, record intake and output accurately, and recognize what these observations reveal.",
    duration: "24 min",
    objectives: [
      "Assist with feeding safely, including aspiration precautions",
      "Record intake and output accurately",
      "Assist with toileting while preserving dignity",
      "Recognize and report changes in elimination",
    ],
    sections: [
      {
        heading: "Feeding is a clinical task",
        blocks: [
          {
            type: "scenario",
            role: "You assist a patient with lunch at Lakeside Regional.",
            text: "A patient recovering from a stroke is fed quickly because the tray cart is waiting, while reclined at 30 degrees, with large spoonfuls and no pause between them. Food enters the airway. Aspiration pneumonia is one of the most common hospital-acquired complications, and this is how it starts.",
            task: "Treat feeding assistance as the clinical task it is.",
          },
          {
            type: "table",
            caption: "Safe feeding practice",
            columns: ["Practice", "Why"],
            rows: [
              ["Sit the patient fully upright, at 90 degrees", "Reclining lets food travel toward the airway"],
              ["Keep them upright 30 minutes after eating", "Reduces reflux and aspiration risk"],
              ["Small bites, and allow time between", "Rushing is the single biggest risk factor"],
              ["Confirm each swallow before the next bite", "Watch the throat; do not rely on them telling you"],
              ["Follow prescribed diet and thickened liquids exactly", "Consistency is prescribed for a clinical reason"],
              ["Sit at eye level, do not stand over them", "Standing rushes the pace and is undignified"],
              ["Stop if coughing, wet voice, or distress", "Report immediately — these are aspiration signs"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never give food or fluids to a patient who is NPO, and never alter a prescribed diet texture or liquid thickness because the patient asks or because it seems excessive. Thickened liquids are prescribed after a swallow evaluation. Giving thin liquids to a patient prescribed thickened ones can cause aspiration and death, and 'they said they were fine with water' is not a defense.",
          },
          {
            type: "paragraph",
            text: "Intake and output records inform real clinical decisions about fluid balance, kidney function, and medication dosing. Record intake in millilitres, including all oral fluids, ice chips at roughly half their volume, and fluids taken with medications. Record output including urine, emesis, drainage, and liquid stool. Guessing makes the record actively misleading — an inaccurate I&O is worse than none, because it will be trusted.",
          },
          {
            type: "table",
            caption: "Elimination changes worth reporting",
            columns: ["Observation", "May indicate"],
            rows: [
              ["No urine output in 6-8 hours", "Retention, dehydration, or kidney problem"],
              ["Dark, concentrated, or strong-smelling urine", "Dehydration or infection"],
              ["Blood in urine or stool", "Always report"],
              ["Burning or pain on urination", "Infection"],
              ["New incontinence in a previously continent patient", "Infection, retention with overflow, or neurological change"],
              ["No bowel movement for three days", "Constipation, possible impaction"],
              ["Black tarry stool", "Upper gastrointestinal bleeding — report urgently"],
              ["Sudden watery diarrhea", "Possible infection; consider precautions"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Toileting is where dignity is most often lost and where many falls happen. Answer call lights for toileting first — patients who wait get up alone, and the bathroom is where they fall. Provide privacy, stay close enough to help but out of sight if it is safe, and never rush someone or express any reaction to what you are cleaning.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient prescribed thickened liquids asks for a glass of water, saying they swallow fine. What should you do?",
            options: [
              "Give the water, since the patient knows their own ability",
              "Explain that you can only provide the prescribed consistency, and report the request to the nurse",
              "Give a small amount and watch carefully",
              "Give water only if they are sitting fully upright",
            ],
            correctIndex: 1,
            explanation:
              "Thickened liquids are prescribed following a swallow evaluation because thin liquids move too fast to control. A patient's subjective sense of swallowing well does not override that assessment. Explain kindly, provide the prescribed consistency, and report the request — the diet may warrant re-evaluation.",
            optionRationales: [
              "Patients with dysphagia frequently aspirate without any sensation of doing so — silent aspiration is common.",
              "Correct. Provide the prescribed consistency and report the request.",
              "A small amount can still be aspirated, and observation does not prevent it.",
              "Positioning helps but does not make thin liquids safe for someone with a swallowing deficit.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Feeding assistance requires supervised practice, particularly for patients with swallowing difficulty.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Research dysphagia. List the signs of aspiration a PCT could observe during a meal.",
          "Research the standard thickened liquid consistencies and what each is prescribed for.",
          "For a patient who drinks 240 mL coffee, 120 mL juice, a 200 mL soup, and 100 mL of ice chips, calculate total intake and show your work.",
          "Write a list of eight elimination observations you would report, and say which are urgent.",
        ],
      },
    ],
  },
  {
    slug: "specimen-collection-for-pcts",
    title: "Specimen Collection",
    description:
      "Collect urine, stool, and blood specimens correctly, and label and handle them so results can be trusted.",
    duration: "24 min",
    objectives: [
      "Collect a clean-catch midstream urine specimen",
      "Instruct patients on collection they perform themselves",
      "Apply the order of draw for venipuncture",
      "Label and transport specimens correctly",
    ],
    sections: [
      {
        heading: "Labelling so a mix-up cannot happen",
        blocks: [
          {
            type: "worked-example",
            title: "Two specimens in fifteen minutes",
            task: "Collect urine specimens from two patients in adjacent rooms without any possibility of swapping them.",
            steps: [
              {
                move: "Take one labelled requisition into one room. Never carry two.",
                why: "The mix-up becomes impossible rather than unlikely. If only one patient's paperwork is in your hand, there is nothing to confuse it with — this is a structural fix rather than a reminder to be careful.",
              },
              {
                move: "Check the armband against the requisition, out loud, with the patient.",
                why: "Two identifiers, name and date of birth, read from the band rather than asked as a leading question. 'Are you Mrs. Alvarez?' gets a yes from someone who is confused or hard of hearing; 'Can you tell me your name and date of birth?' does not.",
              },
              {
                move: "Label the container in the room, immediately after collection, in front of the patient.",
                why: "This is the whole procedure. Every mix-up happens in the gap between collection and labelling, and the only reliable fix is to close that gap to zero. Never pre-label and never carry an unlabelled specimen out.",
              },
              {
                move: "Have the patient confirm their name on the label if they are able.",
                why: "A second pair of eyes at no cost, and it is the patient's own result at stake. Most people check carefully when asked.",
              },
              {
                move: "Complete and route that specimen before going to the second room.",
                why: "Finishing one before starting the next keeps only one specimen in play at a time. Batching two collections and labelling afterwards is exactly how two patients receive each other's results.",
              },
            ],
            result: "Two specimens, each labelled at the bedside in the patient's presence, with no moment when both were unlabelled.",
            takeaway: "One patient's paperwork at a time, label in the room, and finish one before starting the next.",
          },
        ],
      },
      {
        heading: "The result belongs to whoever the label says",
        blocks: [
          {
            type: "scenario",
            role: "You collect specimens at Lakeside Regional.",
            text: "Two specimens are collected within fifteen minutes and labelled at the nurses' station afterwards rather than in the room. One patient is treated for an infection they do not have, and the patient who does have it is not treated at all.",
            task: "Label at the point of collection, in the patient's presence, without exception.",
          },
          {
            type: "table",
            caption: "Labelling requirements",
            columns: ["Element", "Detail"],
            rows: [
              ["Patient name", "Full legal name from the armband"],
              ["Second identifier", "Date of birth or medical record number"],
              ["Date and time collected", "Some tests are time-critical"],
              ["Collector's initials", "Accountability"],
              ["Specimen type and source", "Where relevant"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Label in the room, immediately after collection, in the patient's presence, checking the armband. Never pre-label containers and never carry unlabelled specimens out to label later. Both are how specimens are switched, and the consequence lands on two patients at once.",
          },
          {
            type: "paragraph",
            text: "A clean-catch midstream urine specimen minimizes contamination from skin and perineal flora. The patient cleans the area front to back with the provided wipes, begins urinating into the toilet, then passes the container into the stream mid-flow without touching the inside of the container or lid, and finishes in the toilet. Instructions given clearly are what determine whether the specimen is usable.",
          },
          {
            type: "table",
            caption: "Order of draw (CLSI)",
            columns: ["#", "Tube", "Additive"],
            rows: [
              ["1", "Blood culture", "Sterile"],
              ["2", "Light blue", "Sodium citrate"],
              ["3", "Red or gold/SST", "Clot activator, gel"],
              ["4", "Green", "Heparin"],
              ["5", "Lavender", "EDTA"],
              ["6", "Gray", "Sodium fluoride/oxalate"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "During a venipuncture, stop and remove the needle immediately if the patient reports sharp, shooting, or electric pain, or numbness or tingling down the arm — these indicate nerve involvement. Never probe or redirect the needle laterally under the skin. Make no more than two attempts before passing the patient to a colleague; that is standard practice, not a failure.",
          },
          {
            type: "knowledge-check",
            question:
              "When should a specimen container be labelled?",
            options: [
              "Before collection, so the container is ready",
              "Immediately after collection, in the patient's presence, checking the armband",
              "At the nurses' station once collection is complete",
              "When it is placed in the transport bag",
            ],
            correctIndex: 1,
            explanation:
              "Labelling at the point of collection with the patient present, verified against the armband, is the only method that reliably prevents mix-ups. Pre-labelling and labelling elsewhere both create a window in which specimens can be switched.",
            optionRationales: [
              "Pre-labelled containers can be filled with the wrong patient's specimen.",
              "Correct. Label in the room, immediately, verified against the armband.",
              "Any delay creates an opportunity for a mix-up, particularly with several specimens.",
              "By transport the opportunity for error has already passed unnoticed.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Collection technique requires supervised practice.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write clean-catch instructions in plain language a patient could follow without help. Aim for under 80 words.",
          "Write the order of draw from memory and explain in two sentences why it exists.",
          "Research what makes a urine specimen unsuitable and how long it may sit at room temperature.",
          "Design a labelling procedure that makes a mix-up structurally difficult rather than merely discouraged.",
        ],
      },
    ],
  },
];
