import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "the-medical-assistant-role",
    title: "The Medical Assistant Role",
    description:
      "Understand what medical assistants do on both the administrative and clinical sides, and where they sit in the care team.",
    duration: "22 min",
    objectives: [
      "Describe the administrative and clinical duties of a medical assistant",
      "Explain how the MA role differs from nursing and from other clinical roles",
      "Identify the members of a typical ambulatory care team",
      "Describe the certification options and what each requires",
    ],
    sections: [
      {
        heading: "Two halves of one job",
        blocks: [
          {
            type: "scenario",
            role: "You are starting as a medical assistant at Lakeside Medical Associates.",
            text: "By ten in the morning you have registered four patients, verified two insurance policies, roomed six, taken six sets of vital signs, prepared a treatment room, and documented all of it. Half of that was administrative and half clinical, and the day moved between them without pause.",
            task: "Understand the breadth of the role, because both halves are yours.",
          },
          {
            type: "paragraph",
            text: "Medical assistants are the most versatile role in ambulatory care. In a small practice, the MA is often the person who greets the patient, takes their vital signs, prepares them for the provider, assists during the visit, and handles the paperwork afterwards. The versatility is the value — and it is also why the role requires a clear understanding of its limits.",
          },
          {
            type: "table",
            caption: "The two sides of the role",
            columns: ["Administrative", "Clinical"],
            rows: [
              ["Scheduling and registration", "Taking and recording vital signs"],
              ["Insurance verification", "Obtaining medical histories"],
              ["Medical records management", "Preparing patients for examination"],
              ["Coding and billing support", "Assisting with procedures"],
              ["Correspondence and phone triage support", "Specimen collection and processing"],
              ["Inventory and supply ordering", "Medication administration where permitted"],
            ],
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Ambulatory care",
                definition:
                  "Care delivered without an overnight stay — clinics, physician offices, urgent care. Where most medical assistants work.",
              },
              {
                term: "Delegation",
                definition:
                  "A licensed provider assigning a task to an unlicensed person. Most MA clinical work happens under delegated authority.",
              },
              {
                term: "Supervision",
                definition:
                  "The provider's oversight of delegated work. The level required varies by state and by task.",
              },
              {
                term: "Credentialed MA",
                definition:
                  "One holding a national certification such as CMA (AAMA), RMA (AMT), CCMA (NHA), or NCMA (NCCT).",
              },
            ],
          },
          {
            type: "table",
            caption: "The ambulatory care team",
            columns: ["Role", "Licensure", "Contribution"],
            rows: [
              ["Physician (MD/DO)", "Licensed", "Diagnoses, prescribes, directs care"],
              ["Nurse practitioner / physician assistant", "Licensed", "Diagnoses and prescribes within scope"],
              ["Registered nurse", "Licensed", "Assessment, triage, care planning, patient education"],
              ["Licensed practical/vocational nurse", "Licensed", "Nursing care within a narrower scope"],
              ["Medical assistant", "Unlicensed in most states; may be certified", "Administrative and delegated clinical tasks"],
              ["Front office staff", "Unlicensed", "Registration, scheduling, billing"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Medical assisting is not nursing, and the distinction is legal rather than a matter of respect. Nurses hold a licence that authorizes independent nursing judgment — assessment, triage, care planning. Medical assistants are unlicensed in most states and perform clinical tasks under a provider's delegation. An MA who assesses a patient and decides how urgently they need to be seen has crossed into nursing practice, whatever their experience.",
          },
          {
            type: "knowledge-check",
            question:
              "A patient calls describing chest pain and asks whether they should come in. As a medical assistant, what is the appropriate response?",
            options: [
              "Assess the symptoms and advise them based on your experience",
              "Take the information and escalate immediately to a nurse or provider — telephone triage is a licensed function",
              "Tell them to go to the emergency department, since chest pain is always serious",
              "Schedule the next available appointment and document the symptoms",
            ],
            correctIndex: 1,
            explanation:
              "Deciding how urgently a patient needs care is triage, which requires nursing or provider judgment. The MA's role is to gather the information accurately and escalate without delay. For a symptom like chest pain, escalation is immediate — but the clinical decision is not yours to make.",
            optionRationales: [
              "Assessing symptoms and advising is triage, a licensed function regardless of how much experience you have.",
              "Correct. Gather the information and escalate immediately; the clinical decision belongs to a licensed clinician.",
              "This is a clinical decision, and while chest pain often warrants emergency evaluation, making that call yourself is still triage.",
              "Scheduling routinely without escalating could delay urgent care. Chest pain requires immediate escalation.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Research the role as it actually exists where you intend to work.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find three medical assistant job postings in your area. List every duty mentioned and sort them into administrative and clinical.",
          "Compare the four main MA certifications (CMA, RMA, CCMA, NCMA). Note the eligibility requirements and exam content for each.",
          "Write three sentences explaining the difference between an MA and an LPN to someone outside healthcare.",
          "Identify which certification, if any, the postings you found ask for, and note whether they require or merely prefer it.",
        ],
      },
    ],
  },
  {
    slug: "scope-of-practice-and-law",
    title: "Scope of Practice and Legal Boundaries",
    description:
      "Learn what you may and may not do, why it varies by state, and how to respond when asked to work beyond your scope.",
    duration: "24 min",
    objectives: [
      "Explain what scope of practice means for an unlicensed role",
      "Describe why MA scope varies by state",
      "Identify tasks commonly outside an MA's scope",
      "Respond appropriately when asked to exceed your scope",
    ],
    sections: [
      {
        heading: "Your scope is defined by your state, not your skill",
        blocks: [
          {
            type: "scenario",
            role: "You are a new MA at Lakeside Medical Associates.",
            text: "A provider is running behind and asks you to administer an immunization. In the state where you trained, MAs give injections routinely under delegation. You have moved, and here the rules are different — and neither your training nor the provider's request changes what the law in this state permits.",
            task: "Know how to find your actual scope, and what to do when a request falls outside it.",
          },
          {
            type: "paragraph",
            text: "Scope of practice is the set of tasks a person may legally perform. For licensed roles it is defined by a practice act. Medical assistants are unlicensed in most states, so their scope derives from what a supervising provider may lawfully delegate — and that varies substantially from one state to the next.",
          },
          {
            type: "paragraph",
            text: "This is genuinely different from most professions, and it is the single most important thing to understand about the role. A task you performed daily in one state may be prohibited in another. Your competence is not the question; the delegating authority is.",
          },
          {
            type: "table",
            caption: "Where scope questions are answered",
            columns: ["Source", "Tells you"],
            rows: [
              ["State medical board", "What a physician may delegate to unlicensed personnel in your state"],
              ["State nursing board", "What constitutes nursing practice, which MAs may not perform"],
              ["Employer policy", "What this practice permits — may be narrower than the law allows"],
              ["Provider delegation", "What your supervising provider has actually authorized you to do"],
              ["Your training and competency", "What you have been taught and assessed as able to do safely"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "All five must align before you perform a task. State law may permit it, your employer may allow it, your provider may delegate it — and if you have not been trained and assessed as competent, you still should not do it. Equally, being highly skilled at something your state prohibits does not make it lawful. The most restrictive of the five governs.",
          },
          {
            type: "table",
            caption: "Commonly outside an MA's scope",
            columns: ["Task", "Why"],
            rows: [
              ["Telephone triage", "Requires clinical assessment and judgment — nursing or provider function"],
              ["Interpreting test results for a patient", "Interpretation is diagnosis"],
              ["Independent patient assessment", "Assessment is a licensed nursing function"],
              ["Prescribing, or advising on medication changes", "Prescribing is a provider function"],
              ["Administering IV medications", "Prohibited for MAs in most states"],
              ["Giving injections", "Permitted in many states under delegation, prohibited in some — check yours"],
              ["Signing off on provider documentation", "Only the author may attest to their own note"],
            ],
          },
          {
            type: "worked-example",
            title: "Responding to a request outside your scope",
            task: "A provider asks you to administer an immunization, and you are not certain it is permitted in this state or that you have been trained for it here.",
            steps: [
              {
                move: "Do not perform the task while you are uncertain.",
                why: "Uncertainty is itself the answer for now. Performing a clinical task you are unsure you are authorized for risks patient harm and your own liability, and neither is recoverable by explaining afterwards that you were asked.",
              },
              {
                move: "Say so plainly and without apology.",
                why: "'I haven't been trained on immunizations here — can someone else give it, or can we get me signed off?' is professional, brief, and offers a path forward. It is not insubordination, and framing it as a training gap rather than a refusal keeps the conversation practical.",
              },
              {
                move: "Check the actual authority rather than relying on what you did elsewhere.",
                why: "Your state's medical board and your employer's written policy are the sources. What was routine at a previous employer in another state tells you nothing about what is lawful here, and this is the mistake experienced MAs make most often after relocating.",
              },
              {
                move: "If it is permitted, get trained and documented before doing it.",
                why: "Competency assessment should be recorded in your personnel file. That record protects you and the practice, and it is what turns 'I was shown once' into demonstrable authorization.",
              },
              {
                move: "If a request is repeated after you have declined, escalate.",
                why: "A provider who continues to press for something outside your scope has created a compliance issue, not an interpersonal one. Your practice manager or compliance officer is the right route, and raising it creates a record.",
              },
            ],
            result:
              "The patient receives the immunization from someone authorized, and you have a path to being authorized yourself.",
            takeaway:
              "Uncertainty means stop. Say it plainly, verify the authority, get trained and documented, and escalate if pressed.",
          },
          {
            type: "knowledge-check",
            question:
              "You performed a clinical task routinely for three years at a practice in another state. At your new job in a different state, may you perform it?",
            options: [
              "Yes — your experience and competency transfer with you",
              "Not until you confirm your new state permits it, your employer allows it, and you are delegated and assessed here",
              "Yes, provided a physician is somewhere in the building",
              "Only if you hold a national MA certification",
            ],
            correctIndex: 1,
            explanation:
              "Scope of practice is set by state law and delegation, not by personal experience. A task that was routine elsewhere may be prohibited here. Confirm state law, employer policy, and your own delegation and competency assessment before performing it.",
            optionRationales: [
              "Competency is necessary but not sufficient. The legal authority to perform the task does not travel with you.",
              "Correct. State law, employer policy, delegation, and documented competency must all align.",
              "Physical presence of a physician does not by itself authorize a delegated task.",
              "National certification demonstrates knowledge but does not grant scope. Scope comes from state law and delegation.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Find your actual scope. This is the most practically useful research in the program.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find your state medical board's guidance on delegation to unlicensed personnel. Note whether MAs may administer injections in your state, and under what supervision.",
          "Find your state nursing board's definition of nursing practice. List three activities it reserves to licensed nurses.",
          "For each of these, decide whether an MA in your state may perform it and cite your source: taking vital signs; performing a venipuncture; advising a patient their lab results are normal; administering an intramuscular injection.",
          "Write out, word for word, what you would say to a provider asking you to do something outside your scope. Keep it under three sentences.",
        ],
      },
    ],
  },
];
