import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "standard-precautions",
    title: "Standard Precautions and Hand Hygiene",
    description:
      "Learn the infection control practices applied to every patient, every time, and why hand hygiene remains the single most effective one.",
    duration: "24 min",
    objectives: [
      "Explain the principle behind Standard Precautions",
      "Describe the CDC's moments for hand hygiene",
      "Choose correctly between alcohol-based rub and soap and water",
      "Describe the chain of infection and where it can be broken",
    ],
    sections: [
      {
        heading: "Every patient, every time",
        blocks: [
          {
            type: "scenario",
            role: "You room patients at Lakeside Medical Associates.",
            text: "You see thirty patients a day. You do not know which of them carries a bloodborne pathogen, and neither do they. Standard Precautions exist precisely because that information is not available at the point of care — so the protection cannot depend on knowing.",
            task: "Build the habits that protect every patient and you, regardless of what anyone knows about anyone's status.",
          },
          {
            type: "paragraph",
            text: "Standard Precautions treat blood, all body fluids except sweat, non-intact skin, and mucous membranes as potentially infectious — for every patient, in every encounter. The principle replaced an older approach that applied extra precautions only to patients known to be infectious, which failed for the obvious reason that most infectious patients are not known to be.",
          },
          {
            type: "table",
            caption: "The elements of Standard Precautions",
            columns: ["Element", "In practice"],
            rows: [
              ["Hand hygiene", "Before and after every patient contact, and after glove removal"],
              ["Personal protective equipment", "Gloves, gown, mask, eye protection as the task requires"],
              ["Respiratory hygiene and cough etiquette", "Masks and tissues for symptomatic patients; separation in waiting areas"],
              ["Safe injection practices", "One needle, one syringe, one time; never reuse or re-enter a vial with a used needle"],
              ["Sharps safety", "Never recap; dispose immediately in a sharps container at point of use"],
              ["Environmental cleaning", "Disinfect surfaces and equipment between patients"],
              ["Safe handling of contaminated equipment", "Contain, transport, and reprocess without exposure"],
            ],
          },
          {
            type: "paragraph",
            text: "Hand hygiene is the single most effective measure, and the one most often skipped under time pressure. The CDC identifies the moments that matter: before touching a patient, before a clean or aseptic procedure, after body fluid exposure risk, after touching a patient, and after touching the patient's surroundings.",
          },
          {
            type: "table",
            caption: "Alcohol-based rub or soap and water?",
            columns: ["Situation", "Use", "Why"],
            rows: [
              ["Routine hand hygiene, hands not visibly soiled", "Alcohol-based hand rub", "Faster, more effective against most organisms, less drying"],
              ["Hands visibly soiled", "Soap and water", "Alcohol does not remove soil or organic material"],
              ["After caring for a patient with C. difficile", "Soap and water", "Alcohol does not kill C. difficile spores — this is a genuine exception"],
              ["After using the restroom", "Soap and water", "Standard practice"],
              ["Before eating", "Soap and water", "Standard practice"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Gloves are not a substitute for hand hygiene. Hands must be cleaned before putting gloves on and after taking them off — gloves develop microscopic defects, and hands are contaminated during removal regardless of technique. Wearing the same gloves between patients is worse than wearing none, because it transfers organisms while feeling protective.",
          },
          {
            type: "table",
            caption: "The chain of infection",
            columns: ["Link", "Means", "Break it by"],
            rows: [
              ["Infectious agent", "The pathogen itself", "Disinfection, sterilization"],
              ["Reservoir", "Where it lives", "Cleaning, waste management"],
              ["Portal of exit", "How it leaves", "Respiratory hygiene, covering wounds"],
              ["Mode of transmission", "How it travels", "Hand hygiene, PPE, isolation"],
              ["Portal of entry", "How it enters the next host", "Aseptic technique, sharps safety"],
              ["Susceptible host", "The next person", "Immunization, treating underlying conditions"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "You have removed gloves after caring for a patient with C. difficile. Your hands are not visibly soiled. What should you use?",
            options: [
              "Alcohol-based hand rub, since hands are not visibly soiled",
              "Soap and water, because alcohol does not kill C. difficile spores",
              "Nothing — the gloves protected your hands",
              "Alcohol rub followed by donning fresh gloves",
            ],
            correctIndex: 1,
            explanation:
              "C. difficile forms spores that alcohol does not kill. Soap and water are required because the mechanical action of washing physically removes the spores. This is one of the clearest exceptions to the usual preference for alcohol-based rub.",
            optionRationales: [
              "Alcohol is ineffective against C. difficile spores regardless of whether hands look clean.",
              "Correct. Washing physically removes spores that alcohol cannot kill.",
              "Hands are contaminated during glove removal, and gloves develop microscopic defects. Hygiene after removal is always required.",
              "Putting on fresh gloves over inadequately decontaminated hands spreads spores rather than containing them.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work from the actual guidance. The CDC publishes all of this free.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the CDC hand hygiene guidance for healthcare settings. Write out the five moments in your own words.",
          "For each of these, decide alcohol rub or soap and water and justify it: after removing gloves following a routine blood draw; after helping a patient who was incontinent; before preparing an injection; after touching a bed rail.",
          "Draw the chain of infection and, for a specific pathogen you research, name one realistic way to break each link in an outpatient clinic.",
          "Observe hand hygiene in any setting you can. Note how often the moments are met, without identifying anyone.",
        ],
      },
    ],
  },
  {
    slug: "ppe-and-transmission-precautions",
    title: "PPE and Transmission-Based Precautions",
    description:
      "Choose, don, and remove protective equipment correctly, and apply the additional precautions specific pathogens require.",
    duration: "24 min",
    objectives: [
      "Select PPE appropriate to the task and the pathogen",
      "Describe the correct sequence for donning and doffing",
      "Distinguish contact, droplet, and airborne precautions",
      "Explain what makes doffing the highest-risk moment",
    ],
    sections: [
      {
        heading: "The order matters more than the equipment",
        blocks: [
          {
            type: "scenario",
            role: "You prepare to assist with a procedure at Lakeside Medical Associates.",
            text: "You put on gown, gloves, mask, and eye protection correctly. Afterwards you pull the gown off over your head, brushing the contaminated front across your face, and drop your gloves on the counter. Every item was correct and the removal undid all of it.",
            task: "Learn the sequences, because doffing is where contamination actually happens.",
          },
          {
            type: "paragraph",
            text: "PPE is selected by the task and the expected exposure, not by habit. Gloves for contact with blood, body fluids, mucous membranes, or non-intact skin. A gown when clothing may be soiled. A mask and eye protection when splashes or sprays are possible. A respirator rather than a mask for airborne pathogens.",
          },
          {
            type: "table",
            caption: "Donning and doffing sequences",
            columns: ["Donning — put on", "Doffing — take off"],
            rows: [
              ["1. Gown", "1. Gloves"],
              ["2. Mask or respirator", "2. Eye protection"],
              ["3. Eye protection", "3. Gown"],
              ["4. Gloves — over the gown cuffs", "4. Mask or respirator — last, and outside the room"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Doffing is the highest-risk moment in the entire sequence, because everything you are removing is contaminated on the outside. Gloves come off first because they are the most contaminated. The mask comes off last because it protects you while you handle everything else, and it is removed by its ties or ear loops — never by touching the front. Hand hygiene follows immediately, and is also performed between steps if you contaminate your hands.",
          },
          {
            type: "table",
            caption: "Transmission-based precautions",
            columns: ["Type", "For", "Requires", "Examples"],
            rows: [
              [
                "Contact",
                "Spread by direct or indirect touch",
                "Gown and gloves; dedicated equipment",
                "C. difficile, MRSA, scabies",
              ],
              [
                "Droplet",
                "Spread by respiratory droplets over short distances",
                "Surgical mask; patient masked during transport",
                "Influenza, pertussis, mumps",
              ],
              [
                "Airborne",
                "Spread by small particles that remain suspended",
                "N95 or higher respirator, fit-tested; negative-pressure room",
                "Tuberculosis, measles, varicella",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "Transmission-based precautions are applied in addition to Standard Precautions, never instead of them. Some conditions require more than one type — varicella requires both airborne and contact precautions, for example.",
          },
          {
            type: "callout",
            variant: "info",
            text: "A surgical mask and an N95 respirator are not interchangeable. A surgical mask blocks large droplets and protects the patient from you. An N95 filters small airborne particles and protects you — but only if it is fit-tested to your face and you have passed a seal check. An unfitted N95 provides substantially less protection than its rating suggests, which is why fit testing is a requirement rather than a formality.",
          },
          {
            type: "knowledge-check",
            question:
              "Why are gloves removed first when doffing PPE?",
            options: [
              "They are the easiest item to remove",
              "They are the most contaminated, so removing them first prevents transferring contamination to everything else",
              "They must be removed before hand hygiene can be performed",
              "It is arbitrary, as long as hand hygiene follows",
            ],
            correctIndex: 1,
            explanation:
              "The doffing sequence works from most contaminated to least. Gloves have had the most direct contact with contaminated surfaces, so removing them first prevents them from transferring contamination to your gown, eye protection, face, and mask as you continue.",
            optionRationales: [
              "Ease is not the principle. The sequence follows the degree of contamination.",
              "Correct. Most contaminated comes off first so it cannot spread to the rest.",
              "Hand hygiene is performed after glove removal, but that is a consequence of the order rather than its reason.",
              "The sequence is not arbitrary — it is specifically designed to prevent self-contamination during removal.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "PPE technique is a psychomotor skill. Reading about it is preparation for practising it under supervision, not a substitute.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the CDC's PPE donning and doffing sequence poster. Write both sequences from memory, then check.",
          "For each scenario, list the PPE required: a routine blood draw; assisting with a procedure where splashing is likely; caring for a patient on contact precautions; entering the room of a patient with suspected tuberculosis.",
          "Research what an N95 fit test involves and why it must be repeated periodically.",
          "Practise the doffing sequence with any substitute materials you have. Identify the two points where you were most likely to contaminate yourself.",
        ],
      },
    ],
  },
];
