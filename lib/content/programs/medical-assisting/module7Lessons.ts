import { Lesson } from "@/types/lesson";

export const module7Lessons: Lesson[] = [
  {
    slug: "venipuncture-technique",
    title: "Venipuncture Technique",
    description:
      "Collect blood safely: site selection, the order of draw, and the errors that compromise a specimen or harm a patient.",
    duration: "26 min",
    objectives: [
      "Select an appropriate venipuncture site",
      "State the order of draw and explain why it exists",
      "Identify errors causing hemolysis or contamination",
      "Respond to complications during a draw",
    ],
    sections: [
      {
        heading: "Site selection first",
        blocks: [
          {
            type: "scenario",
            role: "You draw blood at Lakeside Medical Associates.",
            text: "A patient has had a mastectomy with lymph node removal on the left, and an IV running in the right forearm. Both arms have constraints, and choosing wrongly risks lymphedema on one side or a diluted specimen on the other. The decision happens before the needle comes out of the packet.",
            task: "Learn site selection and the order of draw, which together determine whether the specimen is usable.",
          },
          {
            type: "paragraph",
            text: "The antecubital fossa is the standard site. The median cubital vein is the first choice — it is generally the largest, best anchored, and furthest from the brachial artery and median nerve. The cephalic vein is the second choice, and the basilic vein the last, because it sits close to the brachial artery and median nerve.",
          },
          {
            type: "table",
            caption: "Sites and situations to avoid",
            columns: ["Avoid", "Why"],
            rows: [
              ["The arm on the side of a mastectomy with node removal", "Risk of lymphedema; use the other arm or consult the provider"],
              ["An arm with an IV running", "The specimen may be diluted with IV fluid"],
              ["An arm with a dialysis fistula or graft", "Never — risk to vascular access"],
              ["Areas with hematoma, scarring, or burns", "Painful, and results may be inaccurate"],
              ["Feet and ankles", "Higher risk of thrombosis; generally requires provider authorization"],
              ["Directly over the basilic vein where avoidable", "Proximity to the brachial artery and median nerve"],
            ],
          },
          {
            type: "table",
            caption: "Order of draw (CLSI)",
            columns: ["#", "Tube", "Additive", "Why this position"],
            rows: [
              ["1", "Blood culture bottle", "Sterile", "Drawn first to prevent contamination"],
              ["2", "Light blue", "Sodium citrate", "Coagulation testing needs an exact blood-to-additive ratio"],
              ["3", "Red or gold/SST", "Clot activator, gel", "Before additive tubes that could carry over"],
              ["4", "Green", "Heparin", "Carryover would affect later tubes"],
              ["5", "Lavender or pink", "EDTA", "EDTA carryover badly distorts chemistry results"],
              ["6", "Gray", "Sodium fluoride/oxalate", "Last — its additives interfere with most other tests"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "The order of draw exists to prevent additive carryover between tubes. Drawing out of order can produce results that are wrong but entirely plausible — EDTA carryover into a chemistry tube falsely elevates potassium and falsely lowers calcium, and nothing about the result looks anomalous. A patient can be treated for a condition they do not have on the strength of a tube drawn in the wrong sequence.",
          },
          {
            type: "table",
            caption: "Errors and their consequences",
            columns: ["Error", "Causes"],
            rows: [
              ["Tourniquet left on over one minute", "Hemoconcentration; falsely elevated results"],
              ["Vigorous shaking of tubes", "Hemolysis; falsely elevated potassium"],
              ["Needle too small for the draw", "Hemolysis from shear stress"],
              ["Underfilled light blue tube", "Wrong blood-to-citrate ratio; coagulation results invalid"],
              ["Alcohol not dry before puncture", "Stinging, and possible specimen contamination"],
              ["Probing or redirecting the needle blindly", "Nerve injury, arterial puncture, hematoma"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Two hard limits. Never make more than two attempts on one patient — pass them to a colleague, which is standard practice rather than a failure. And if a patient reports sharp, shooting, or electric pain, or numbness or tingling radiating down the arm, remove the needle immediately: those are signs of nerve involvement, and continuing risks lasting injury. Never probe laterally with the needle in the arm.",
          },
          {
            type: "knowledge-check",
            question:
              "Why must a light blue sodium citrate tube be filled completely?",
            options: [
              "The lab requires a minimum volume to run the test",
              "Coagulation testing depends on an exact blood-to-citrate ratio, which underfilling changes",
              "Underfilled tubes are more likely to hemolyze",
              "It prevents the tube from clotting before it reaches the lab",
            ],
            correctIndex: 1,
            explanation:
              "Sodium citrate tubes contain a fixed volume of anticoagulant calibrated to a full draw. Underfilling leaves proportionally too much citrate for the blood present, which alters the ratio and invalidates coagulation results — often producing falsely prolonged clotting times.",
            optionRationales: [
              "Volume matters, but the specific reason is the ratio rather than a general minimum.",
              "Correct. The blood-to-citrate ratio must be exact for coagulation results to be valid.",
              "Hemolysis is caused by technique factors such as shaking or needle size, not by fill level.",
              "The citrate prevents clotting regardless; the problem is the proportion, not whether it clots.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Venipuncture is a hands-on skill requiring supervised practice on manikins before patients. This is the knowledge that must precede it.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write the order of draw from memory with the additive in each tube, then check against a CLSI reference.",
          "For each situation, state which arm you would use and why: mastectomy left with node removal; IV in the right forearm; dialysis fistula in the left arm; hematoma in the right antecubital fossa.",
          "Research hemolysis. List five causes and the specific test results each distorts.",
          "Write out what you would say and do if a patient reported shooting pain down the arm mid-draw.",
        ],
      },
    ],
  },
  {
    slug: "specimen-handling-and-clia",
    title: "Specimen Handling and Point-of-Care Testing",
    description:
      "Label, store, and transport specimens correctly, and understand the regulations governing testing in the office.",
    duration: "22 min",
    objectives: [
      "Label and handle specimens to preserve integrity",
      "Maintain chain of custody where required",
      "Explain what CLIA is and what waived testing means",
      "Perform quality control on point-of-care tests",
    ],
    sections: [
      {
        heading: "A specimen is only as good as its label",
        blocks: [
          {
            type: "scenario",
            role: "You process specimens at Lakeside Medical Associates.",
            text: "Two specimens collected in the same fifteen minutes are labelled at the desk afterwards rather than at the bedside. One patient receives a result belonging to the other. Both results are plausible, so nothing looks wrong until treatment fails.",
            task: "Label at the point of collection, in the patient's presence, every time.",
          },
          {
            type: "table",
            caption: "Specimen labelling requirements",
            columns: ["Element", "Detail"],
            rows: [
              ["Patient name", "Full legal name as in the record"],
              ["Second identifier", "Date of birth or medical record number"],
              ["Date and time of collection", "Some tests are time-sensitive"],
              ["Collector's initials", "Accountability and follow-up"],
              ["Specimen type and site", "Where relevant — which site, which side"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Label in the presence of the patient, immediately after collection, before leaving the room. Never pre-label containers before collection, and never carry unlabelled specimens to a desk to label later. Both practices are how specimens are switched, and a mislabelled specimen means a patient is treated on someone else's results.",
          },
          {
            type: "paragraph",
            text: "CLIA — the Clinical Laboratory Improvement Amendments — regulates all laboratory testing on human specimens in the United States. Every site performing testing needs a CLIA certificate, and tests are categorized by complexity: waived, moderate, and high.",
          },
          {
            type: "table",
            caption: "CLIA-waived testing",
            columns: ["Aspect", "Detail"],
            rows: [
              ["What it is", "Tests simple enough that the risk of erroneous results is negligible"],
              ["Examples", "Urine dipstick, rapid strep, blood glucose meters, rapid influenza"],
              ["Who may perform", "Trained unlicensed personnel, including MAs, under the practice's certificate"],
              ["Still required", "Follow the manufacturer's instructions exactly; run quality controls; document"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Waived does not mean casual. A test loses its waived status the moment you deviate from the manufacturer's instructions — using an expired cartridge, altering an incubation time, or reading a result outside its valid window. At that point the practice is performing non-waived testing without authorization, which is a regulatory violation as well as a clinical risk.",
          },
          {
            type: "paragraph",
            text: "Quality control confirms the test system is working before patient results are trusted. Run controls at the frequency the manufacturer and your policy require, record the results, and if a control fails, stop testing patients on that system until it is resolved. A failed control that is repeated until it passes is not a resolution.",
          },
          {
            type: "knowledge-check",
            question:
              "A rapid strep test kit's control fails. What should you do?",
            options: [
              "Run the patient test anyway and note the control failure",
              "Stop using that kit or lot for patient testing until the failure is resolved, and follow the practice's QC procedure",
              "Repeat the control until it passes",
              "Use a different kit and discard the failed control result",
            ],
            correctIndex: 1,
            explanation:
              "A failed control means the test system cannot be relied on. Patient results from it are not trustworthy, so testing stops until the cause is identified and resolved. Repeating until a control passes discards the information the failure was giving you.",
            optionRationales: [
              "A result from an unreliable system is worse than no result, because it will be acted upon.",
              "Correct. Stop patient testing, investigate, and document per the QC procedure.",
              "Repeating until it passes treats the control as an obstacle rather than a check, and hides a real problem.",
              "Switching kits without investigating and documenting the failure skips the required QC process.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Understand the regulations governing what your practice may test.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the CMS list of CLIA-waived tests. Identify five commonly performed in a family practice.",
          "For a rapid strep test you research, list every manufacturer requirement — storage, expiration, incubation time, reading window.",
          "Write a specimen labelling procedure that makes a mix-up structurally difficult rather than merely discouraged.",
          "Research chain of custody. Explain in three sentences when it is required and what it demands.",
        ],
      },
    ],
  },
];
