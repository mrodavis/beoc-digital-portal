import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "word-parts",
    title: "Building Medical Terms from Parts",
    description:
      "Learn the root, prefix, and suffix system that lets you decode medical terms you have never seen before, instead of memorizing them one at a time.",
    duration: "22 min",
    objectives: [
      "Break a medical term into root, prefix, suffix, and combining vowel",
      "Decode an unfamiliar term from its parts",
      "Recognize the high-frequency prefixes and suffixes used in diagnosis codes",
      "Distinguish terms that differ by a single letter but mean very different things",
    ],
    sections: [
      {
        heading: "Why coders learn terminology",
        blocks: [
          {
            type: "scenario",
            role: "You are coding a chart at Lakeside Medical Associates.",
            text: "The note reads: 'Patient presents with pericarditis; history of pericardiocentesis in 2023. No evidence of endocarditis.' You must code the current condition and not the history, and not the condition that was explicitly ruled out. Getting that right depends on reading three similar-looking words accurately.",
            task: "Learn the word-part system so unfamiliar terms become decodable rather than intimidating.",
          },
          {
            type: "paragraph",
            text: "Medical terms are assembled from a small set of reusable parts, mostly Greek and Latin. Learning perhaps a hundred parts lets you decode thousands of terms — which is a far better investment than memorizing terms individually, and it is what makes an experienced coder fast.",
          },
          {
            type: "table",
            caption: "The four building blocks",
            columns: ["Part", "Position", "Carries", "Example"],
            rows: [
              [
                "Root",
                "Core of the word",
                "The body part or system",
                "cardi- (heart)",
              ],
              [
                "Prefix",
                "Beginning",
                "Location, number, time, or negation",
                "peri- (around)",
              ],
              [
                "Suffix",
                "End",
                "The condition, procedure, or process",
                "-itis (inflammation)",
              ],
              [
                "Combining vowel",
                "Joins parts",
                "Nothing — it only aids pronunciation, usually 'o'",
                "cardi-o-logy",
              ],
            ],
          },
          {
            type: "worked-example",
            title: "Decoding three similar terms",
            task: "Work out what pericarditis, pericardiocentesis, and endocarditis each mean, using only the parts.",
            steps: [
              {
                move: "Read the suffix first, because it tells you what kind of word this is.",
                why: "The suffix says whether you are looking at a condition, a procedure, or a specialty. -itis means inflammation, so pericarditis and endocarditis are conditions. -centesis means surgical puncture to withdraw fluid, so pericardiocentesis is a procedure. That single move already sorts the three terms into two categories.",
              },
              {
                move: "Identify the root: cardi- means heart in all three.",
                why: "The shared root tells you all three concern the heart. Recognizing the constant lets you focus on what actually differs, which is where the meaning separates.",
              },
              {
                move: "Read the prefix, which is what distinguishes them.",
                why: "peri- means around, so pericarditis is inflammation of the sac around the heart. endo- means within, so endocarditis is inflammation of the heart's inner lining. Same root, same suffix, completely different diagnoses — and different codes.",
              },
              {
                move: "Reassemble and sanity-check against the note.",
                why: "Pericarditis is the current diagnosis and gets coded. Pericardiocentesis is a past procedure, which is history rather than a current condition. Endocarditis was ruled out, and in the outpatient setting a ruled-out condition is not coded. Decoding correctly is what prevents all three from being treated the same way.",
              },
            ],
            result:
              "Only the pericarditis is coded as the current condition; the procedure is history and the ruled-out condition is not coded.",
            takeaway:
              "Read the suffix, then the root, then the prefix. The prefix is very often the only thing separating two conditions that are coded quite differently.",
          },
        ],
      },
      {
        heading: "The parts worth memorizing first",
        blocks: [
          {
            type: "table",
            caption: "High-frequency prefixes",
            columns: ["Prefix", "Means", "Example"],
            rows: [
              ["a-, an-", "without", "anemia — without blood"],
              ["brady-", "slow", "bradycardia — slow heart rate"],
              ["tachy-", "fast", "tachycardia — fast heart rate"],
              ["hyper-", "above normal, excessive", "hypertension — high blood pressure"],
              ["hypo-", "below normal, deficient", "hypoglycemia — low blood sugar"],
              ["peri-", "around", "perinatal — around the time of birth"],
              ["endo-", "within", "endoscopy — viewing within"],
              ["dys-", "painful, difficult, abnormal", "dysphagia — difficulty swallowing"],
              ["poly-", "many", "polyuria — excessive urination"],
              ["post-", "after", "postoperative — after surgery"],
            ],
          },
          {
            type: "table",
            caption: "High-frequency suffixes",
            columns: ["Suffix", "Means", "Example"],
            rows: [
              ["-itis", "inflammation", "arthritis — joint inflammation"],
              ["-ectomy", "surgical removal", "appendectomy — removal of the appendix"],
              ["-ostomy", "creation of an opening", "colostomy — opening into the colon"],
              ["-otomy", "cutting into", "tracheotomy — incision into the trachea"],
              ["-plasty", "surgical repair", "rhinoplasty — repair of the nose"],
              ["-scopy", "visual examination", "colonoscopy — examination of the colon"],
              ["-emia", "blood condition", "leukemia — white blood cell condition"],
              ["-algia", "pain", "neuralgia — nerve pain"],
              ["-osis", "abnormal condition", "osteoporosis — porous bone condition"],
              ["-pathy", "disease", "neuropathy — nerve disease"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Three suffixes are frequently confused and mean genuinely different procedures: -otomy is cutting into, -ostomy is creating a permanent opening, and -ectomy is removing. A colotomy, a colostomy, and a colectomy are three different operations with three different codes and very different payments. The single letter matters.",
          },
          {
            type: "knowledge-check",
            question:
              "What does the term 'hypernatremia' mean, based on its parts?",
            options: [
              "A deficiency of sodium in the blood",
              "An excess of sodium in the blood",
              "Surgical removal of sodium-producing tissue",
              "Inflammation caused by high sodium",
            ],
            correctIndex: 1,
            explanation:
              "hyper- means above normal or excessive, natr- refers to sodium, and -emia means a blood condition. Together: excessive sodium in the blood. Its opposite, hyponatremia, uses hypo- for below normal.",
            optionRationales: [
              "That is hyponatremia. The prefix hypo- means below normal, where hyper- means above.",
              "Correct. hyper- (excessive) + natr- (sodium) + -emia (blood condition).",
              "Removal would require the suffix -ectomy. The suffix here is -emia, which denotes a blood condition.",
              "Inflammation would require the suffix -itis. -emia denotes a condition of the blood.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Decode rather than memorize. For each term, write the parts and their meanings before writing the definition.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Break these into parts and define them: gastroenteritis, nephrolithiasis, bronchoscopy, cardiomyopathy, osteoarthritis.",
          "Explain the difference between a gastrotomy, a gastrostomy, and a gastrectomy, and say why a coder must never treat them as interchangeable.",
          "Build the term for each of these: inflammation of the liver; surgical repair of a joint; slow breathing; excessive thirst. Check your answers in a medical dictionary.",
          "Find three terms in any medical document you can access, decode them from their parts, then confirm your reading against a reference. Note any where the parts misled you — those are worth remembering.",
        ],
      },
    ],
  },
  {
    slug: "body-systems-for-coders",
    title: "Body Systems and Where Codes Live",
    description:
      "Map the major body systems to the parts of the code books that describe them, so you know where to look before you start searching.",
    duration: "20 min",
    objectives: [
      "Name the major body systems and their primary organs",
      "Connect a documented condition to the body system that governs its code range",
      "Use anatomical direction and position terms correctly",
      "Explain why laterality matters for code selection",
    ],
    sections: [
      {
        heading: "Anatomy as a navigation tool",
        blocks: [
          {
            type: "scenario",
            role: "You are coding a busy afternoon's charts at Lakeside Medical Associates.",
            text: "Twelve encounters, twelve different complaints — chest pain, a fractured wrist, a urinary tract infection, uncontrolled diabetes. For each you need to find the right code among roughly seventy thousand. Searching the index alphabetically for every one is slow. Knowing which body system owns the condition narrows the search before you begin.",
            task: "Learn the systems well enough to know roughly where a code lives before you start looking.",
          },
          {
            type: "paragraph",
            text: "Both ICD-10-CM and CPT are organized largely by body system. Once you know that a condition is cardiovascular, you know approximately where its diagnosis code sits and which section of CPT holds the related procedures. That orientation turns searching into navigating.",
          },
          {
            type: "table",
            caption: "Body systems and their coding territory",
            columns: ["System", "Key organs", "Typical coding territory"],
            rows: [
              [
                "Cardiovascular",
                "Heart, arteries, veins",
                "Hypertension, heart failure, arrhythmias; cardiac procedures in CPT surgery",
              ],
              [
                "Respiratory",
                "Lungs, trachea, bronchi",
                "Asthma, COPD, pneumonia; bronchoscopy and pulmonary function testing",
              ],
              [
                "Musculoskeletal",
                "Bones, joints, muscles",
                "Fractures, arthritis, sprains; a large CPT surgery section, heavily laterality-dependent",
              ],
              [
                "Digestive",
                "Stomach, intestines, liver",
                "Gastritis, hernias, liver disease; endoscopy and colonoscopy",
              ],
              [
                "Genitourinary",
                "Kidneys, bladder, reproductive organs",
                "UTI, renal disease; urology and gynecology procedures",
              ],
              [
                "Nervous",
                "Brain, spinal cord, nerves",
                "Seizures, neuropathy, stroke; neurology and neurosurgery",
              ],
              [
                "Endocrine",
                "Pancreas, thyroid, adrenals",
                "Diabetes, thyroid disorders — very high volume in primary care",
              ],
              [
                "Integumentary",
                "Skin, hair, nails",
                "Dermatitis, wounds, lesions; lesion excision and repair",
              ],
            ],
          },
        ],
      },
      {
        heading: "Direction, position, and laterality",
        blocks: [
          {
            type: "paragraph",
            text: "Clinical documentation uses precise positional language, and misreading it changes the code. These terms are always described relative to anatomical position: the body standing upright, facing forward, palms forward.",
          },
          {
            type: "table",
            caption: "Directional terms",
            columns: ["Term", "Means", "Example"],
            rows: [
              ["Anterior / ventral", "Toward the front", "The sternum is anterior to the heart"],
              ["Posterior / dorsal", "Toward the back", "The spine is posterior to the stomach"],
              ["Superior", "Above", "The head is superior to the chest"],
              ["Inferior", "Below", "The stomach is inferior to the lungs"],
              ["Medial", "Toward the midline", "The great toe is medial to the little toe"],
              ["Lateral", "Away from the midline", "The ears are lateral to the nose"],
              ["Proximal", "Nearer the point of attachment", "The elbow is proximal to the wrist"],
              ["Distal", "Farther from the point of attachment", "The fingers are distal to the wrist"],
              ["Bilateral", "Both sides", "Bilateral knee pain"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Laterality is built into a great many ICD-10-CM codes: separate codes exist for right, left, and in some cases bilateral. A note saying only 'knee pain' without a side forces you to an unspecified code, which pays less and may be denied outright by some payers. Missing laterality is one of the most common reasons a coder needs to query a provider, and one of the easiest documentation problems to fix at the source.",
          },
          {
            type: "knowledge-check",
            question:
              "A chart documents a fracture of the distal radius. Which bone is fractured, and where along it?",
            options: [
              "The upper arm bone, near the shoulder",
              "The forearm bone on the thumb side, at the end nearer the wrist",
              "The forearm bone on the little-finger side, at the end nearer the elbow",
              "The wrist bone closest to the hand",
            ],
            correctIndex: 1,
            explanation:
              "The radius is the forearm bone on the thumb side. Distal means farther from the point of attachment to the trunk, so the distal radius is the end nearer the wrist. Distal radius fractures are among the most common fractures seen in outpatient practice.",
            optionRationales: [
              "That describes the humerus, the upper arm bone.",
              "Correct. The radius runs on the thumb side of the forearm, and distal places the fracture at the wrist end.",
              "The ulna is the little-finger-side forearm bone, and proximal rather than distal would place it near the elbow.",
              "Wrist bones are the carpals. The radius is a forearm bone that articulates with them.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice mapping documentation to body systems and checking it for the detail a coder needs.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "For each condition, name the body system: cholecystitis, bronchitis, cystitis, dermatitis, myocarditis, nephritis.",
          "Rewrite this vague note so it would support specific coding: 'Patient has pain in the shoulder. Ordered imaging.' Add laterality, specificity of site, and any other detail a coder would need.",
          "A note documents 'bilateral lower extremity edema.' Identify the body region, explain what bilateral tells you, and say why that word affects code selection.",
          "List three questions you would ask a provider whose notes routinely omit laterality, phrased so they are useful rather than accusatory.",
        ],
      },
    ],
  },
];
