import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "icd-10-cm-structure",
    title: "How ICD-10-CM Codes Are Built",
    description:
      "Learn the structure of a diagnosis code, what each character position carries, and why specificity determines whether a claim is paid.",
    duration: "24 min",
    objectives: [
      "Describe the character structure of an ICD-10-CM code",
      "Explain what the placeholder X is for and when it is required",
      "Use the 7th character extension for injury encounters",
      "Explain why coding to the highest level of specificity is required",
    ],
    sections: [
      {
        heading: "The anatomy of a diagnosis code",
        blocks: [
          {
            type: "scenario",
            role: "You code an orthopedic follow-up at Lakeside Medical Associates.",
            text: "A patient returns for a healing wrist fracture. You submit S52.5 and the claim is rejected as an invalid code. Nothing is wrong with your reading of the chart — the code you chose is a category header, not a billable code, and it is missing the characters that say which wrist, what kind of fracture, and which encounter this is.",
            task: "Learn the code structure well enough to recognize when a code is incomplete before it is submitted.",
          },
          {
            type: "paragraph",
            text: "ICD-10-CM stands for International Classification of Diseases, Tenth Revision, Clinical Modification. It is the diagnosis code set used in the United States, maintained by the CDC's National Center for Health Statistics and CMS, and updated annually with changes effective 1 October.",
          },
          {
            type: "table",
            caption: "Character positions in an ICD-10-CM code",
            columns: ["Position", "Type", "Carries"],
            rows: [
              ["1", "Letter", "The chapter — broad category of disease"],
              ["2", "Number", "With character 1, forms the category"],
              ["3", "Number or letter", "Completes the three-character category"],
              ["4", "Number or letter", "Etiology, anatomic site, severity"],
              ["5", "Number or letter", "Further specificity, often laterality"],
              ["6", "Number or letter", "Further specificity"],
              ["7", "Letter", "Extension — encounter type or episode of care"],
            ],
          },
          {
            type: "paragraph",
            text: "Codes run from three to seven characters, and a decimal point follows the third character. Crucially, a three-character code is only billable when no further subdivision exists for it. Most three-character entries are category headers, and submitting one where subdivisions exist produces exactly the rejection above.",
          },
          {
            type: "worked-example",
            title: "Building a complete fracture code",
            task: "Code a follow-up visit for a patient with a healing displaced fracture of the distal end of the left radius.",
            steps: [
              {
                move: "Start with the category: S52 covers fracture of the forearm.",
                why: "S-codes cover injuries by body region, and S52 narrows to the forearm. This is the category, not a billable code — building outward from the category is how you make sure you have not skipped a level of specificity.",
              },
              {
                move: "Add characters for the specific site and fracture type.",
                why: "The distal radius has its own subdivision, and within it, codes separate displaced from non-displaced fractures. The documentation says displaced, so that branch is chosen. Where documentation does not specify, the coding guidelines direct that a fracture not indicated as displaced or non-displaced is coded as displaced.",
              },
              {
                move: "Add laterality: left.",
                why: "The radius exists on both sides, so ICD-10-CM provides separate codes for right and left. The note documents left, so an unspecified-side code would be wrong and would likely be denied.",
              },
              {
                move: "Add the 7th character for the encounter type.",
                why: "This is a follow-up during healing, so the extension for a subsequent encounter with routine healing applies — not the initial-encounter extension. The 7th character is what distinguishes the first visit for the injury from every visit afterwards, and choosing it wrongly changes the clinical meaning of the claim entirely.",
              },
              {
                move: "Check the character count and insert the placeholder X if needed.",
                why: "The 7th character must sit in the 7th position. If the code has only five characters before it, X is inserted as a placeholder so the extension lands correctly. A 7th character in the wrong position produces an invalid code.",
              },
            ],
            result:
              "A complete, billable code specifying the bone, the site on that bone, the fracture type, the side, and the encounter type.",
            takeaway:
              "Build from the category outward and check every axis the code set offers — site, type, laterality, encounter. A code that stops short of available specificity is incomplete.",
          },
        ],
      },
      {
        heading: "The placeholder X and the 7th character",
        blocks: [
          {
            type: "paragraph",
            text: "Two features of ICD-10-CM confuse most newcomers, and both concern the tail of the code.",
          },
          {
            type: "paragraph",
            text: "The placeholder X fills empty character positions so that a required 7th character lands in the 7th position. It carries no meaning of its own; it is purely positional. If a code needs a 7th character but only has four meaningful characters, X is inserted twice to pad positions five and six.",
          },
          {
            type: "table",
            caption: "Common 7th character extensions for injuries",
            columns: ["Extension", "Means", "Use for"],
            rows: [
              [
                "A",
                "Initial encounter",
                "While the patient is receiving active treatment for the injury",
              ],
              [
                "D",
                "Subsequent encounter",
                "Routine care during the healing or recovery phase",
              ],
              [
                "S",
                "Sequela",
                "A complication or condition arising as a direct result of the injury",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Initial encounter does not mean the first visit. It means the patient is receiving active treatment for the injury — which can span several visits, and can include a first visit to a new provider. Subsequent encounter means routine healing care. This is one of the most commonly miscoded elements in ICD-10-CM, precisely because the everyday meaning of 'initial' is not the coding meaning.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient is seen for the third time for a healing ankle fracture. No new treatment is provided; the provider checks healing progress. Which 7th character applies?",
            options: [
              "A, because the fracture is still the reason for the visit",
              "D, because this is routine care during the healing phase",
              "S, because the fracture is an ongoing problem",
              "No 7th character is needed for follow-up visits",
            ],
            correctIndex: 1,
            explanation:
              "D indicates a subsequent encounter — routine care while the injury heals, with no active treatment being provided. A would apply during active treatment, and S is reserved for a sequela, meaning a lasting condition resulting from the injury rather than the injury itself.",
            optionRationales: [
              "A is for active treatment of the injury, not for monitoring healing progress.",
              "Correct. Routine care during the healing phase is a subsequent encounter, extension D.",
              "S is for a sequela — a late effect such as a resulting deformity — not for an injury that is still healing normally.",
              "The 7th character is required for these injury codes at every encounter. Omitting it produces an invalid code.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "You will need access to a current ICD-10-CM code set. Free searchable versions are published by CMS.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Look up the category for type 2 diabetes mellitus. List three subdivisions that differ by complication, and note what documentation would be needed to choose between them.",
          "Find a code that requires a 7th character and has fewer than six meaningful characters. Write it out with the placeholder X in the correct positions.",
          "For a patient seen for a laceration of the right index finger without damage to the nail, find the most specific code available and note every axis of specificity you had to satisfy.",
          "Explain in three sentences why a payer might deny an unspecified-laterality code even though the code is valid.",
        ],
      },
    ],
  },
  {
    slug: "icd-10-cm-guidelines",
    title: "Using the Index, the Tabular List, and the Guidelines",
    description:
      "Learn the required two-step lookup process, and the conventions that determine which codes may be reported together and in what order.",
    duration: "24 min",
    objectives: [
      "Use the Alphabetic Index and Tabular List in the correct order",
      "Apply Excludes1 and Excludes2 notes correctly",
      "Sequence a principal or first-listed diagnosis appropriately",
      "Explain why signs and symptoms are not coded alongside a confirmed diagnosis",
    ],
    sections: [
      {
        heading: "Never code from the index alone",
        blocks: [
          {
            type: "scenario",
            role: "You are coding under time pressure at Lakeside Medical Associates.",
            text: "You look up 'bronchitis' in the Alphabetic Index, find a code, and submit it. It is denied. Had you turned to that code in the Tabular List, you would have seen an instructional note requiring an additional code, and an Excludes1 note that ruled out the code you chose given the patient's documented condition.",
            task: "Build the two-step habit that the official guidelines require and that prevents this class of error entirely.",
          },
          {
            type: "paragraph",
            text: "ICD-10-CM has two parts and both must be used. The Alphabetic Index is organized by condition and points you toward a code. The Tabular List is organized numerically and contains the actual code, along with the instructional notes that govern its use. The index never shows those notes, which is precisely why coding from it alone is unsafe.",
          },
          {
            type: "paragraph",
            text: "The ICD-10-CM Official Guidelines for Coding and Reporting are published annually alongside the code set and are the authority for how codes are selected and sequenced. They are not optional guidance — HIPAA requires their use for reporting, and payers apply them.",
          },
        ],
      },
      {
        heading: "Excludes1 and Excludes2",
        blocks: [
          {
            type: "paragraph",
            text: "These two notes look almost identical and mean opposite things. Confusing them is one of the most consequential mistakes in diagnosis coding.",
          },
          {
            type: "table",
            caption: "The two Excludes notes",
            columns: ["Note", "Means", "Effect"],
            rows: [
              [
                "Excludes1",
                "NOT CODED HERE — the two conditions cannot occur together",
                "Never report both codes for the same encounter",
              ],
              [
                "Excludes2",
                "Not included here — the condition is separate but may coexist",
                "Both codes may be reported together when both are documented",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "The way to remember it: Excludes1 means mutually exclusive — one or the other, never both. Excludes2 means not part of this code, so if the patient has both conditions, code both. Payers apply Excludes1 edits automatically, so a claim carrying an Excludes1 pair is typically rejected without human review.",
          },
          {
            type: "worked-example",
            title: "Deciding whether two codes may be reported together",
            task: "A patient is documented with two related conditions. The Tabular List entry for the first carries an Excludes2 note naming the second. May both be coded?",
            steps: [
              {
                move: "Identify which Excludes note applies.",
                why: "This is the whole decision, and it takes five seconds once you know to look. Excludes1 forbids reporting both; Excludes2 permits it. Reading the note carefully is the difference between a paid claim and a rejected one.",
              },
              {
                move: "Confirm both conditions are documented independently.",
                why: "Excludes2 permits both codes; it does not require them. You still need documentation supporting each condition separately. Coding a second condition because the note allows it, without documentation, is unsupported coding.",
              },
              {
                move: "Report both codes, sequencing by the reason for the encounter.",
                why: "The condition chiefly responsible for the visit is listed first. Sequence is not cosmetic — it drives medical necessity determinations and can affect payment and quality reporting.",
              },
              {
                move: "If it had been Excludes1, choose the single code the documentation supports and query if genuinely ambiguous.",
                why: "Excludes1 means the code set asserts these cannot coexist. Reporting both is a definite rejection. When the documentation truly seems to describe both, that is a question for the provider rather than a coding judgment.",
              },
            ],
            result:
              "Both codes reported, correctly sequenced, each supported by documentation.",
            takeaway:
              "Excludes1 is mutually exclusive; Excludes2 permits coexistence. Always read the note in the Tabular List before reporting a pair of related codes.",
          },
        ],
      },
      {
        heading: "Sequencing and the signs-and-symptoms rule",
        blocks: [
          {
            type: "paragraph",
            text: "The first-listed diagnosis in the outpatient setting is the condition chiefly responsible for the services provided at that encounter. It is not necessarily the patient's most serious problem, and not necessarily the first one mentioned in the note.",
          },
          {
            type: "paragraph",
            text: "The signs-and-symptoms rule follows from that. When a definitive diagnosis is established, code the diagnosis and not the symptoms that led to it — the symptoms are integral to it. When no definitive diagnosis is reached, code the symptoms, because that is what is actually known.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "In the outpatient setting, conditions documented as 'probable,' 'suspected,' 'rule out,' or 'questionable' are not coded as though they existed. Code the signs, symptoms, or test findings that prompted the workup instead. This differs from inpatient rules, where uncertain diagnoses documented at discharge may be coded as if established — a genuine difference between settings that catches people who move from one to the other.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient presents with chest pain. After evaluation the provider documents 'chest pain, rule out angina.' What should be coded?",
            options: [
              "Angina, since that is the condition being investigated",
              "Chest pain, because the angina is unconfirmed and this is an outpatient encounter",
              "Both chest pain and angina, to capture the full picture",
              "Neither, until the workup is complete",
            ],
            correctIndex: 1,
            explanation:
              "In the outpatient setting, a 'rule out' condition is not coded as though it were established. Code the documented symptom — chest pain — because that is what is actually known at this encounter. Coding the angina would assert a diagnosis the record does not support.",
            optionRationales: [
              "Coding an unconfirmed condition in the outpatient setting asserts something the documentation explicitly does not establish.",
              "Correct. Code the symptom; the suspected condition is not coded until it is confirmed.",
              "Adding the unconfirmed diagnosis has the same problem on its own, and the symptom would in any case be integral to it were it confirmed.",
              "The encounter happened and services were provided, so it must be coded. The symptom is the correct code.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work with the actual guidelines. CMS publishes the ICD-10-CM Official Guidelines for Coding and Reporting free each year.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find one Excludes1 note and one Excludes2 note in the Tabular List. Write out each, and explain in your own words what a coder may and may not do in each case.",
          "For an encounter documented as 'fatigue and weight loss, rule out malignancy,' decide what to code and write two sentences justifying it with reference to the guidelines.",
          "A note documents both type 2 diabetes and diabetic neuropathy. Look up how the code set expects that relationship to be reported, and explain what a combination code is.",
          "Describe the two-step lookup process in your own words, and state one specific thing you would miss by skipping the Tabular List.",
        ],
      },
    ],
  },
];
