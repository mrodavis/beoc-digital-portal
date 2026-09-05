import { Lesson } from "@/types/lesson";
import { Program } from "@/types/program";

/**
 * Pharmacy Technician Training.
 *
 * Registration or licensure is a state matter and most states require it, so
 * the credential note is explicit that this coursework does not substitute for
 * it. Content is weighted toward the things that cause harm when done wrong:
 * the look-alike names, the calculations, and the verification steps.
 */

const m1: Lesson[] = [
  {
    slug: "the-technician-role-and-scope",
    title: "The Technician Role and Scope",
    description:
      "What technicians do, what only a pharmacist may do, and why the boundary is drawn where it is.",
    duration: "22 min",
    objectives: [
      "Describe the duties of a pharmacy technician",
      "Identify the tasks reserved to a pharmacist",
      "Explain what registration or licensure typically requires",
      "Respond appropriately when asked to exceed your scope",
    ],
    sections: [
      {
        heading: "The boundary is about judgment, not difficulty",
        blocks: [
          {
            type: "scenario",
            role: "You are working a busy retail pharmacy counter.",
            text: "A customer asks whether they can take their new antibiotic with the ibuprofen they already take. The pharmacist is on the phone. You know the answer — you have heard it a hundred times. Answering it would be practicing pharmacy.",
            task: "Understand where your scope ends, and what to say when someone asks you to cross it.",
          },
          {
            type: "paragraph",
            text: "Technicians do most of the work of filling a prescription. What they may not do is exercise professional judgment about a patient's therapy — and that boundary holds regardless of how experienced you are or how obvious the answer seems. The final check on every prescription belongs to a pharmacist.",
          },
          {
            type: "table",
            caption: "Where the line usually falls",
            columns: ["Technician", "Pharmacist only"],
            rows: [
              ["Receive and enter prescriptions", "Verify the final product"],
              ["Count, measure, and label", "Counsel the patient on their medication"],
              ["Manage inventory and ordering", "Answer clinical questions"],
              ["Process insurance and resolve rejections", "Accept a new verbal prescription"],
              ["Prepare compounds under supervision", "Approve a therapeutic substitution"],
              ["Handle cash and point of sale", "Make a professional judgment on a DUR alert"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Scope varies by state and sometimes by employer, and some states allow a certified technician to do things others prohibit — tech-check-tech, administering immunisations, taking transfers. Never assume a task you performed in one state is permitted in another, and never rely on what a colleague tells you. The state board of pharmacy is the authority.",
          },
          {
            type: "paragraph",
            text: "The script for a clinical question is short and worth having ready: “That's a good question for the pharmacist — let me get them for you.” It is not an admission of ignorance. It is the correct answer, and every experienced technician says it several times a day.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient asks whether their new medication will interact with a supplement they take. What should you do?",
            options: [
              "Answer if you are confident you know",
              "Refer the question to the pharmacist, because clinical questions are theirs",
              "Look it up in a reference and then answer",
              "Tell them to ask their doctor",
            ],
            correctIndex: 1,
            explanation:
              "Interaction questions require professional judgment about a specific patient's therapy, which is reserved to the pharmacist. Looking it up does not change that — applying the information to this patient is the part you may not do.",
            optionRationales: [
              "Confidence is not the test. The task is reserved regardless of whether you know the answer.",
              "Correct. Refer it, and say so plainly.",
              "Finding the information is fine; applying it to a patient is the reserved act.",
              "This deflects a question the pharmacist standing beside you is there to answer.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Find the rules that apply where you intend to work." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find your state board of pharmacy's requirements for technician registration or licensure: education, exam, fees, and background check.",
          "Determine whether your state requires national certification, and which certifications it accepts.",
          "Find three tasks your state explicitly permits or prohibits for technicians, and cite where you found each.",
          "Write out, word for word, what you would say to a patient asking a clinical question.",
        ],
      },
    ],
  },
  {
    slug: "prescriptions-and-terminology",
    title: "Reading Prescriptions and Pharmacy Terminology",
    description:
      "The abbreviations, the parts of a prescription, and the ones that are no longer safe to use.",
    duration: "24 min",
    objectives: [
      "Identify the required elements of a valid prescription",
      "Interpret common sig abbreviations",
      "Recognize the abbreviations on the do-not-use list and why",
      "Convert a sig into plain-language patient instructions",
    ],
    sections: [
      {
        heading: "The sig is where errors enter",
        blocks: [
          {
            type: "scenario",
            role: "You are entering a prescription.",
            text: "The sig reads “1 tab PO QD.” You read it as QID and enter four times daily instead of once. Both are real abbreviations, they differ by one letter, and the patient takes four times the intended dose.",
            task: "Learn the abbreviations, and learn which ones should no longer appear at all.",
          },
          {
            type: "table",
            caption: "Parts of a prescription",
            columns: ["Element", "What it is"],
            rows: [
              ["Patient information", "Name and date of birth, at minimum"],
              ["Date written", "Affects validity and refill timing"],
              ["Inscription", "The drug, strength, and quantity"],
              ["Sig", "The directions for the patient"],
              ["Refills", "How many, if any"],
              ["Prescriber information", "Name, signature, and identifiers"],
              ["DAW", "Dispense as written — whether substitution is allowed"],
            ],
          },
          {
            type: "table",
            caption: "Sig abbreviations you will see constantly",
            columns: ["Abbreviation", "Means"],
            rows: [
              ["PO", "By mouth"],
              ["BID", "Twice daily"],
              ["TID", "Three times daily"],
              ["QID", "Four times daily"],
              ["PRN", "As needed"],
              ["AC / PC", "Before meals / after meals"],
              ["HS", "At bedtime"],
              ["gtt", "Drop"],
              ["SL", "Sublingual, under the tongue"],
              ["Disp", "Dispense"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Several abbreviations appear on the Institute for Safe Medication Practices do-not-use list because they have a documented history of causing harm. U for units is read as a zero, turning 4U into 40. QD and QOD are mistaken for QID. A trailing zero — 1.0 mg — is read as 10 mg when the decimal point is faint, and a missing leading zero — .5 mg — is read as 5 mg. Write the word, use a leading zero, never use a trailing one. If a prescription arrives using them, that is a reason to verify rather than to interpret.",
          },
          {
            type: "worked-example",
            title: "Turning a sig into patient instructions",
            task: "The sig reads: 1 tab PO BID PC × 10 days. Write what goes on the label.",
            steps: [
              {
                move: "Translate each element separately rather than reading it as a phrase.",
                why: "1 tab is the dose, PO is the route, BID is the frequency, PC is the timing, 10 days is the duration. Translating piece by piece catches an element you would otherwise skip.",
              },
              {
                move: "Write it in the order a patient acts on it.",
                why: "“Take one tablet by mouth twice daily after meals for 10 days.” The patient needs how much, how, how often, when, and for how long — in that order, because that is the order they will do it in.",
              },
              {
                move: "Avoid the abbreviations entirely on the label.",
                why: "PO and PC mean nothing to most patients, and a patient who cannot read their own label cannot follow it. The label is the one document that goes home with them.",
              },
              {
                move: "Check the duration against the quantity dispensed.",
                why: "Twice daily for 10 days is 20 tablets. If the quantity says 30, something is wrong — either the sig, the quantity, or your reading of one of them. This check takes two seconds and catches real errors.",
              },
            ],
            result: "A label the patient can follow, and an arithmetic check that the prescription is internally consistent.",
            takeaway: "Translate element by element, write in the order the patient acts, and always check quantity against duration.",
          },
          {
            type: "knowledge-check",
            question:
              "A prescription is written as “Coumadin 1.0 mg.” Why is this a problem?",
            options: [
              "Coumadin is no longer manufactured",
              "The trailing zero can be read as 10 mg if the decimal point is unclear — a tenfold overdose of an anticoagulant",
              "The strength should be written in micrograms",
              "Brand names may not be used on prescriptions",
            ],
            correctIndex: 1,
            explanation:
              "A trailing zero after a decimal point is on the do-not-use list precisely because a faint or smudged point turns 1.0 into 10. With an anticoagulant, a tenfold dose is potentially fatal. It should be written as 1 mg, and a prescription arriving this way should be verified rather than interpreted.",
            optionRationales: [
              "Availability is not the issue; the notation is.",
              "Correct. The trailing zero risks a tenfold misread, and this drug class makes that critical.",
              "Milligrams are appropriate here. The problem is the zero, not the unit.",
              "Brand names are used routinely.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "These need to be automatic, not looked up." },
      {
        type: "list",
        ordered: true,
        items: [
          "Learn the ten sig abbreviations in the table until you can translate them without thinking.",
          "Find the current ISMP list of error-prone abbreviations. Write out five and what each is mistaken for.",
          "Translate five sigs into patient instructions, then check each quantity against its duration.",
          "Write down what you would do if a prescription arrived using U for units.",
        ],
      },
    ],
  },
];

const m2: Lesson[] = [
  {
    slug: "pharmacy-calculations",
    title: "Pharmacy Calculations",
    description:
      "Days supply, concentrations, and dosing — the arithmetic that must be right every time.",
    duration: "26 min",
    objectives: [
      "Calculate days supply for solid and liquid dosage forms",
      "Work with ratio strengths and percentage concentrations",
      "Perform weight-based dosing calculations",
      "Check an answer for plausibility before accepting it",
    ],
    sections: [
      {
        heading: "Days supply is the calculation you will do most",
        blocks: [
          {
            type: "scenario",
            role: "You are processing an insurance claim.",
            text: "The days supply is wrong, so the claim rejects. You fix it and resubmit. But when days supply is wrong the other way — too long — a patient runs out early, cannot get a refill, and stops taking a medication they need.",
            task: "Learn the calculations, and learn to check them before they leave your hands.",
          },
          {
            type: "paragraph",
            text: "Days supply is total quantity divided by the amount taken per day. The arithmetic is simple; the errors come from misreading the sig. Two tablets twice daily is four per day, not two — and that single misreading halves or doubles the answer.",
          },
          {
            type: "worked-example",
            title: "Days supply for a liquid",
            task: "Amoxicillin suspension, 250 mg/5 mL. Sig: 500 mg PO TID. Dispensed: 300 mL. How many days?",
            steps: [
              {
                move: "Convert the dose from mg to mL.",
                why: "The bottle is measured in mL and the dose is written in mg, so they must be brought to the same unit before anything else. 500 mg at 250 mg per 5 mL is 10 mL per dose.",
              },
              {
                move: "Calculate the daily volume.",
                why: "TID is three times daily, so 10 mL × 3 = 30 mL per day. This is the step where a misread frequency does its damage, so read the sig again here.",
              },
              {
                move: "Divide the quantity dispensed by the daily volume.",
                why: "300 mL ÷ 30 mL per day = 10 days.",
              },
              {
                move: "Sanity-check against the prescription's intent.",
                why: "Ten days is a normal antibiotic course, so the answer is plausible. An answer of 100 days or 1.5 days would tell you a decimal went astray — and this check catches most calculation errors in about three seconds.",
              },
            ],
            result: "10 days supply.",
            takeaway: "Match the units first, then find the daily amount, then divide — and always ask whether the answer is a plausible course of therapy.",
          },
          {
            type: "table",
            caption: "Concentration notation",
            columns: ["Written", "Means", "Example"],
            rows: [
              ["1:1000", "1 gram in 1000 mL", "Epinephrine 1:1000 is 1 mg/mL"],
              ["1% w/v", "1 gram in 100 mL", "1% lidocaine is 10 mg/mL"],
              ["5% w/v", "5 grams in 100 mL", "5% dextrose is 50 mg/mL"],
              ["mg/mL", "Milligrams per millilitre", "Stated directly"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "A percentage concentration in w/v always means grams per 100 mL. Converting to mg/mL is therefore a fixed step: multiply the percentage by 10. A 2% solution is 20 mg/mL, a 0.9% saline is 9 mg/mL. Knowing that one relationship removes most of the difficulty from concentration questions.",
          },
          {
            type: "knowledge-check",
            question:
              "A prescription reads: 2 tablets PO BID. 120 tablets are dispensed. What is the days supply?",
            options: ["60 days", "30 days", "120 days", "15 days"],
            correctIndex: 1,
            explanation:
              "Two tablets twice daily is four tablets per day, not two. 120 ÷ 4 = 30 days. Reading BID as the daily quantity rather than the frequency is the single most common days-supply error.",
            optionRationales: [
              "60 assumes two tablets per day, missing that BID doubles it.",
              "Correct. Four tablets daily, 120 ÷ 4 = 30.",
              "120 assumes one tablet per day.",
              "15 would be eight tablets a day.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Show every step. Calculation errors hide in skipped steps." },
      {
        type: "list",
        ordered: true,
        items: [
          "Calculate days supply for: 1 tab TID, 90 dispensed; 2 tabs BID, 60 dispensed; 5 mL QID, 200 mL dispensed.",
          "Convert to mg/mL: 0.45% saline, 2% lidocaine, 1:10,000 epinephrine.",
          "A child weighs 18 kg and the dose is 15 mg/kg per day divided into three doses. Calculate the amount per dose.",
          "For each answer above, write one sentence saying why the result is or is not plausible.",
        ],
      },
    ],
  },
  {
    slug: "safety-and-look-alike-drugs",
    title: "Medication Safety and Look-Alike Names",
    description:
      "The name pairs that cause dispensing errors, and the checks that catch them.",
    duration: "24 min",
    objectives: [
      "Recognize look-alike and sound-alike drug name pairs",
      "Apply the checks that catch a selection error",
      "Explain what tall man lettering is for",
      "Respond correctly to a dispensing error",
    ],
    sections: [
      {
        heading: "The names are genuinely similar, and that is the hazard",
        blocks: [
          {
            type: "scenario",
            role: "You are pulling stock for a prescription.",
            text: "The shelf holds hydralazine and hydroxyzine beside each other. One treats high blood pressure and one is an antihistamine. The names differ by three letters, the boxes are similar, and you are on your fortieth prescription of the shift.",
            task: "Learn the pairs and the checks, because attention alone does not survive a busy shift.",
          },
          {
            type: "table",
            caption: "Look-alike / sound-alike pairs to know",
            columns: ["Pair", "What they are"],
            rows: [
              ["hydrALAZINE / hydrOXYzine", "Antihypertensive / antihistamine"],
              ["predniSONE / predniSOLONE", "Two different corticosteroids"],
              ["metFORMIN / metRONIDAZOLE", "Antidiabetic / antibiotic"],
              ["clonazePAM / cloNIDine", "Anticonvulsant / antihypertensive"],
              ["glipiZIDE / glyBURIDE", "Two different sulfonylureas"],
              ["cycloSPORINE / cycloSERINE", "Immunosuppressant / antibiotic"],
              ["vinBLAStine / vinCRIStine", "Two chemotherapy agents — a fatal confusion"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The capital letters in that table are tall man lettering, and they are not a typographic quirk. Emphasizing the differing portion of two similar names measurably reduces selection errors, and it appears on labels, shelf tags, and ordering systems for exactly that reason. When you see it, it is telling you that this name has a dangerous twin.",
          },
          {
            type: "table",
            caption: "The checks that catch a selection error",
            columns: ["Check", "When"],
            rows: [
              ["Read the label at the shelf", "Before picking up the bottle"],
              ["Read it again when counting", "As the tablets go into the tray"],
              ["Read it again at the point of labelling", "Before the label is applied"],
              ["Match the NDC number, not the name", "Numbers do not look alike the way names do"],
              ["Check the strength as carefully as the name", "Right drug, wrong strength is equally an error"],
              ["Never rely on bottle appearance", "Manufacturers change packaging without notice"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "If you discover a dispensing error after the medication has left, report it immediately to the pharmacist — do not attempt to correct it yourself and do not delay while deciding how to phrase it. The patient may need to be contacted before the next dose. Pharmacies have error reporting processes precisely because errors happen to careful people, and the purpose is to fix the system rather than to blame the person. Concealing one converts a mistake into something far more serious.",
          },
          {
            type: "knowledge-check",
            question:
              "What is the most reliable way to confirm you have pulled the correct product?",
            options: [
              "Recognizing the bottle, since you handle it daily",
              "Matching the NDC number on the stock bottle to the one on the prescription record",
              "Checking that the name starts with the same letters",
              "Confirming it is in the correct position on the shelf",
            ],
            correctIndex: 1,
            explanation:
              "NDC numbers are unique to the product, strength, and package size, and unlike names they do not look alike. Matching the number catches both a wrong-drug and a wrong-strength selection, which name-checking alone may not.",
            optionRationales: [
              "Manufacturers change packaging without notice, and familiarity is exactly what fails on a busy shift.",
              "Correct. The NDC is unique and unambiguous.",
              "Matching first letters is how hydralazine and hydroxyzine get confused in the first place.",
              "Shelf position is useful but items get misplaced, and it confirms nothing about strength.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Learn the pairs cold. This is the part of the job where errors reach patients." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the ISMP list of confused drug names and select ten pairs relevant to a retail setting. Learn what each drug is for.",
          "For each pair, write one sentence on what would happen if a patient received the wrong one.",
          "Research tall man lettering and find three real examples of it on labels or in a formulary.",
          "Write out the steps you would take, in order, on discovering a dispensing error after the patient has left.",
        ],
      },
    ],
  },
];

const m3: Lesson[] = [
  {
    slug: "insurance-inventory-and-law",
    title: "Insurance, Inventory, and Pharmacy Law",
    description:
      "Processing claims, managing controlled substances, and the regulations that govern both.",
    duration: "24 min",
    objectives: [
      "Process a claim and interpret a common rejection",
      "Describe the controlled substance schedules",
      "Explain the record-keeping requirements for controlled drugs",
      "Apply HIPAA in a pharmacy setting",
    ],
    sections: [
      {
        heading: "Rejections are a language worth learning",
        blocks: [
          {
            type: "scenario",
            role: "A claim rejects at the counter with a patient waiting.",
            text: "The code means refill too soon. The patient believes they are out. Both can be true — they may have been taking more than prescribed, the days supply may have been entered wrong, or they may have lost the bottle. What you do next depends on which.",
            task: "Learn what the common rejections mean, so you can resolve them rather than relay them.",
          },
          {
            type: "table",
            caption: "Common rejections and what they usually mean",
            columns: ["Rejection", "Usually means", "Typical resolution"],
            rows: [
              ["Refill too soon", "Not enough days have elapsed", "Check days supply; the patient may return later, or a vacation override may apply"],
              ["Prior authorization required", "Plan needs approval first", "Contact the prescriber to initiate it"],
              ["Non-formulary", "Plan does not cover this drug", "Pharmacist may contact prescriber about an alternative"],
              ["Invalid member ID", "Data entry or coverage change", "Re-verify the card, both sides"],
              ["Quantity limit exceeded", "Plan caps the amount", "May need prior authorization or a smaller quantity"],
              ["NDC not covered", "That package or manufacturer is excluded", "Try an equivalent NDC if available"],
            ],
          },
          {
            type: "table",
            caption: "Controlled substance schedules",
            columns: ["Schedule", "Characteristics", "Examples"],
            rows: [
              ["C-I", "No accepted medical use in the US", "Not dispensed in retail pharmacy"],
              ["C-II", "High abuse potential; accepted medical use", "Oxycodone, morphine, amphetamine"],
              ["C-III", "Moderate potential", "Certain codeine combinations, ketamine"],
              ["C-IV", "Lower potential", "Alprazolam, lorazepam, zolpidem"],
              ["C-V", "Lowest potential", "Some antidiarrheals and cough preparations with codeine"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Controlled substances carry record-keeping requirements that ordinary drugs do not: perpetual inventory for C-II, separate or dispersed storage, specific forms for ordering, and inventory counts on a defined schedule. Requirements come from both the DEA and your state, and where they differ the stricter applies. Discrepancies in a controlled count are reported immediately and never adjusted quietly to make the numbers agree.",
          },
          {
            type: "callout",
            variant: "info",
            text: "HIPAA applies fully in a pharmacy, and the counter is where it is hardest. A pharmacy is a public space with a queue, so patient names, medications, and conversations are easily overheard. Lower your voice, do not read a medication name aloud, and never discuss a patient's prescriptions where the next person in line can hear. What someone is collecting is itself protected information.",
          },
          {
            type: "knowledge-check",
            question:
              "A claim rejects as “refill too soon” and the patient insists they have run out. What is the appropriate step?",
            options: [
              "Override the rejection so the patient is not inconvenienced",
              "Check the days supply on the previous fill, and refer to the pharmacist if anything is unclear",
              "Tell the patient the insurance has refused and they must pay cash",
              "Change the days supply on the record so the claim goes through",
            ],
            correctIndex: 1,
            explanation:
              "The rejection may be correct or may reflect a days-supply entry error on the previous fill, and checking distinguishes them. Anything beyond that check — an override, a cash discussion, a therapy question — belongs with the pharmacist.",
            optionRationales: [
              "Overrides have specific permitted reasons and are not a way to avoid an awkward conversation.",
              "Correct. Check the previous fill, then refer.",
              "Cash payment may end up being the answer, but not before establishing why it rejected.",
              "Altering a record so a claim pays is falsification, and with a controlled substance it is considerably worse.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Law and insurance are learned from the actual sources." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find your state's requirements for controlled substance inventory and record retention.",
          "Research what a DEA Form 222 is used for and when it is required.",
          "Find five common rejection codes from a real payer and write down what each requires.",
          "List four things about the physical layout or workflow of a pharmacy counter that affect patient privacy, and what you would do about each.",
        ],
      },
    ],
  },
];

export const pharmacyTechnician: Program = {
  slug: "pharmacy-technician",
  group: "Healthcare",
  title: "Pharmacy Technician Training",
  shortTitle: "Pharmacy Technician",
  icon: "💊",
  accent: "from-emerald-700 to-emerald-900",
  description:
    "The knowledge base for pharmacy technician work: scope of practice, reading prescriptions, pharmacy calculations, look-alike drug names, insurance processing, and controlled substance law.",
  overview:
    "Technicians do most of the work of filling a prescription, and the boundary on what they may not do is about professional judgment rather than difficulty — the final check belongs to a pharmacist regardless of how experienced the technician is. This coursework is weighted toward the areas where an error reaches a patient: the abbreviations that are mistaken for one another, the calculations that must be right every time, and the drug names that differ by three letters on adjacent shelves. Scope, registration, and controlled substance rules vary by state, so the course teaches what to look for and directs you to your board of pharmacy for what applies.",
  outcomes: [
    "Describe technician duties and the tasks reserved to a pharmacist",
    "Respond appropriately to a clinical question from a patient",
    "Identify the required elements of a prescription and interpret sig abbreviations",
    "Recognize error-prone abbreviations and know why each is dangerous",
    "Calculate days supply for solid and liquid forms, and convert concentrations",
    "Check a calculated answer for plausibility before accepting it",
    "Recognize look-alike and sound-alike drug pairs and apply the checks that catch them",
    "Interpret common insurance rejections and resolve them within scope",
    "Describe the controlled substance schedules and their record-keeping requirements",
  ],
  careerRoles: [
    "Retail pharmacy technician",
    "Hospital pharmacy technician",
    "Long-term care pharmacy technician",
    "Mail-order and central fill technician",
  ],
  credentialNote:
    "This is coursework and not a license, a registration, or a certification. Most states require technicians to register or be licensed with the board of pharmacy, and many require national certification — commonly the PTCB's CPhT or the NHA's ExCPT — plus a background check and, in some cases, completion of a board-approved training program. This course is none of those things. Requirements, permitted duties, and controlled substance rules differ substantially by state and change; verify everything against your state board of pharmacy before relying on it. Drug information here is illustrative for learning and is never a clinical reference.",
  relatedCertifications: [
    { name: "CPhT — Certified Pharmacy Technician", body: "Pharmacy Technician Certification Board (PTCB)", note: "The most widely recognized technician credential. Eligibility routes vary." },
    { name: "ExCPT — Certified Pharmacy Technician", body: "National Healthcareer Association (NHA)", note: "Accepted by many states and employers." },
    { name: "State registration or licensure", body: "Individual state boards of pharmacy", note: "Required in most states, and separate from national certification." },
  ],
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "Role, Scope & Prescriptions",
      emoji: "📋",
      description:
        "What technicians may and may not do, and how to read a prescription without misinterpreting it.",
      lessons: m1,
      level: "Beginner",
      estimatedMinutes: 46,
      whatYoullLearn: [
        "Where the technician–pharmacist boundary falls, and why it is about judgment",
        "What to say when a patient asks a clinical question",
        "The parts of a prescription and the sig abbreviations you will see daily",
        "The error-prone abbreviations, and why a trailing zero can be fatal",
      ],
      scenario:
        "A customer asks whether their new antibiotic is safe with the ibuprofen they take. You know the answer — and answering it would be practicing pharmacy. Later, a sig reading QD is entered as QID, and the patient takes four times the intended dose.",
    },
    {
      moduleNumber: 2,
      moduleSlug: "module-2",
      title: "Calculations & Medication Safety",
      emoji: "🧮",
      description:
        "Days supply, concentrations, and weight-based dosing, plus the look-alike names that cause dispensing errors.",
      lessons: m2,
      level: "Intermediate",
      estimatedMinutes: 50,
      whatYoullLearn: [
        "Days supply for solids and liquids, and the misread that halves or doubles it",
        "Percentage and ratio concentrations, and the one conversion worth memorizing",
        "Checking an answer for plausibility in three seconds",
        "Look-alike drug pairs, tall man lettering, and matching by NDC rather than name",
      ],
      scenario:
        "A days supply entered wrong rejects a claim — or worse, sends a patient home to run out early. On the shelf, hydralazine and hydroxyzine sit side by side, differing by three letters, on your fortieth prescription of the shift.",
    },
    {
      moduleNumber: 3,
      moduleSlug: "module-3",
      title: "Insurance, Inventory & Law",
      emoji: "⚖️",
      description:
        "Claim rejections and how to resolve them, controlled substance schedules and records, and HIPAA at a busy counter.",
      lessons: m3,
      level: "Intermediate",
      estimatedMinutes: 24,
      whatYoullLearn: [
        "The common rejection codes and what each actually requires",
        "The five controlled substance schedules with examples",
        "Record-keeping and inventory requirements for controlled drugs",
        "Protecting privacy in a public space with a queue",
      ],
      scenario:
        "A claim rejects as refill too soon with the patient standing at the counter insisting they are out. Both can be true, and what you do next depends on which — while the person behind them can hear every word.",
    },
  ],
};
