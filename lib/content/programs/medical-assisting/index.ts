import { Program } from "@/types/program";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";
import { module6Lessons } from "./module6Lessons";
import { module7Lessons } from "./module7Lessons";
import { module8Lessons } from "./module8Lessons";

export const medicalAssisting: Program = {
  slug: "medical-assisting",
  group: "Healthcare",
  title: "Medical Assisting Training",
  shortTitle: "Medical Assisting",
  icon: "🩺",
  accent: "from-rose-700 to-rose-900",
  description:
    "Build the administrative and clinical knowledge behind the medical assistant role: scope of practice, infection control, vital signs, documentation, assisting with procedures, medications, phlebotomy, and emergency response.",
  overview:
    "Medical assistants are the most versatile role in ambulatory care, moving between administrative and clinical work throughout the day. That breadth is the value of the role and the reason it demands a clear understanding of its limits: medical assistants are unlicensed in most states and work under a provider's delegated authority, which varies from one state to the next. This coursework builds the knowledge base for both halves of the job, and returns repeatedly to the question of what you are authorized to do and how to respond when asked to exceed it.",
  outcomes: [
    "Describe the medical assistant role and how it differs from licensed nursing roles",
    "Determine your scope of practice and respond appropriately when asked to exceed it",
    "Apply Standard Precautions, select PPE, and don and doff it in the correct sequence",
    "Measure vital signs accurately and recognize readings requiring immediate escalation",
    "Take a patient history using open, closed, and clarifying questions",
    "Document objectively, correct errors properly, and protect patient privacy",
    "Prepare rooms and patients, and maintain a sterile field during minor procedures",
    "Apply the rights of medication administration and calculate dosages",
    "State the order of draw and identify errors that compromise a specimen",
    "Recognize a deteriorating patient and respond within your scope",
  ],
  careerRoles: [
    "Clinical medical assistant",
    "Administrative medical assistant",
    "Ambulatory care technician",
    "Medical office assistant",
    "Patient care coordinator",
  ],
  credentialNote:
    "This is coursework, not a credential, and it cannot make anyone competent to perform clinical procedures. Every clinical skill covered here — venipuncture, injections, sterile technique, vital signs — requires hands-on instruction and supervised competency assessment before it is performed on a patient. Reading about a skill is preparation for practicing it under supervision, never a substitute. Scope of practice is also set by your state and by your supervising provider's delegation, and it varies substantially: a task that is routine for medical assistants in one state may be prohibited in another. Verify your own state's rules before performing any clinical task. Certification is awarded by the bodies below, most of which require completion of an accredited program including a supervised practicum.",
  relatedCertifications: [
    {
      name: "CMA (AAMA) — Certified Medical Assistant",
      body: "American Association of Medical Assistants",
      note: "Requires graduation from a CAAHEP- or ABHES-accredited medical assisting program.",
    },
    {
      name: "RMA — Registered Medical Assistant",
      body: "American Medical Technologists",
      note: "Several eligibility routes including accredited program completion or documented work experience.",
    },
    {
      name: "CCMA — Certified Clinical Medical Assistant",
      body: "National Healthcareer Association",
      note: "Requires a training program or relevant work experience.",
    },
    {
      name: "NCMA — National Certified Medical Assistant",
      body: "National Center for Competency Testing",
      note: "Several eligibility routes.",
    },
  ],
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "The Role & Scope of Practice",
      emoji: "🧭",
      description:
        "What medical assistants do, where they sit in the care team, and the legal boundaries that vary by state.",
      lessons: module1Lessons,
      level: "Beginner",
      estimatedMinutes: 46,
      whatYoullLearn: [
        "The administrative and clinical halves of the role",
        "How medical assisting differs legally from nursing",
        "Why scope of practice varies by state, and where to find yours",
        "How to respond when asked to work beyond your scope",
      ],
      scenario:
        "A provider running behind asks you to administer an immunization. In the state where you trained, medical assistants do this routinely under delegation. You have moved, and here the rules are different — and neither your training nor the provider's request changes what the law in this state permits.",
    },
    {
      moduleNumber: 2,
      moduleSlug: "module-2",
      title: "Infection Control",
      emoji: "🧼",
      description:
        "Standard Precautions, hand hygiene, and the PPE sequences that protect patients and you.",
      lessons: module2Lessons,
      level: "Beginner",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Why Standard Precautions apply to every patient regardless of known status",
        "The CDC hand hygiene moments, and when soap and water beat alcohol",
        "Donning and doffing sequences, and why doffing is the highest-risk moment",
        "Contact, droplet, and airborne precautions and what each requires",
      ],
      scenario:
        "You see thirty patients a day and do not know which of them carries a bloodborne pathogen — and neither do they. Later, assisting with a procedure, you don PPE perfectly and then pull the gown off over your head, brushing the contaminated front across your face.",
    },
    {
      moduleNumber: 3,
      moduleSlug: "module-3",
      title: "Vital Signs & Patient Intake",
      emoji: "🌡️",
      description:
        "Measure vital signs accurately enough for clinical decisions to rest on them, and take a history that captures what the patient is actually experiencing.",
      lessons: module3Lessons,
      level: "Beginner",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Correct technique for each vital sign and the expected adult ranges",
        "The technique errors that produce inaccurate readings, and their direction",
        "Which readings require immediate escalation",
        "Open, closed, and clarifying questions, and why leading questions mislead",
      ],
      scenario:
        "You take a blood pressure with an undersized cuff, over a sleeve, with the patient's arm hanging down and their legs crossed. The reading is 152/94, and a provider who trusts it may treat hypertension the patient does not have. Every one of those four errors pushes the number up.",
    },
    {
      moduleNumber: 4,
      moduleSlug: "module-4",
      title: "Documentation & Privacy",
      emoji: "📝",
      description:
        "Write documentation that is objective and defensible, correct errors properly, and protect patient information in the situations where it is most often lost.",
      lessons: module4Lessons,
      level: "Beginner",
      estimatedMinutes: 44,
      whatYoullLearn: [
        "Objective versus subjective documentation, and why interpretation is out of scope",
        "How to correct an error while preserving the audit trail",
        "The everyday situations that cause most privacy breaches",
        "Handling records requests and family members' questions",
      ],
      scenario:
        "You write 'patient seems anxious and is probably overreacting to mild symptoms.' Two years later that sentence is read aloud in a deposition, about a patient whose symptoms turned out to be significant.",
    },
    {
      moduleNumber: 5,
      moduleSlug: "module-5",
      title: "Assisting with Examinations",
      emoji: "🔬",
      description:
        "Prepare rooms and patients, and maintain a sterile field while assisting with minor procedures.",
      lessons: module5Lessons,
      level: "Intermediate",
      estimatedMinutes: 46,
      whatYoullLearn: [
        "Examination positions and when each is used",
        "Draping and positioning that preserve patient dignity",
        "Medical versus surgical asepsis, and the rules of the sterile field",
        "Anticipating the provider's needs, and labelling specimens safely",
      ],
      scenario:
        "You open the suture packet correctly onto the sterile field, then reach across it to hand the provider gauze. Your arm passed over the sterile surface. The field is contaminated, and if nobody says so, it is used anyway.",
    },
    {
      moduleNumber: 6,
      moduleSlug: "module-6",
      title: "Pharmacology & Medication Safety",
      emoji: "💊",
      description:
        "Drug names, classes, and routes, the rights of medication administration, dosage calculation, and how to respond to an error.",
      lessons: module6Lessons,
      level: "Intermediate",
      estimatedMinutes: 50,
      whatYoullLearn: [
        "Generic and brand naming, and catching duplicate therapy in a medication list",
        "Major drug classes and routes of administration",
        "The rights of medication administration and basic dosage calculation",
        "What to do when a medication error occurs",
      ],
      scenario:
        "A patient's list includes both Lipitor and atorvastatin — the same drug under two names, suggesting a possible double dose. Later, two patients with similar surnames are in adjacent rooms, and you carry a prepared syringe into the wrong one.",
    },
    {
      moduleNumber: 7,
      moduleSlug: "module-7",
      title: "Phlebotomy & Specimens",
      emoji: "🩸",
      description:
        "Site selection, the order of draw, and the specimen handling and CLIA rules that determine whether a result can be trusted.",
      lessons: module7Lessons,
      level: "Advanced",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Venipuncture site selection and the situations to avoid",
        "The order of draw and why additive carryover matters",
        "Errors causing hemolysis, and the two hard limits during a draw",
        "CLIA-waived testing, quality control, and specimen labelling",
      ],
      scenario:
        "A patient has had a mastectomy with node removal on the left and an IV running in the right forearm. Both arms have constraints, and choosing wrongly risks lymphedema on one side or a diluted specimen on the other.",
    },
    {
      moduleNumber: 8,
      moduleSlug: "module-8",
      title: "Emergencies & Professionalism",
      emoji: "🚨",
      description:
        "Recognize a deteriorating patient and respond within your scope, and communicate in ways that build trust.",
      lessons: module8Lessons,
      level: "Intermediate",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Signs of emergency requiring immediate escalation",
        "How to respond without leaving a deteriorating patient",
        "Teach-back, and why 'does that make sense?' produces false agreement",
        "Working with interpreters, and de-escalating an angry patient",
      ],
      scenario:
        "A patient in the waiting room becomes pale and sweaty and says the room feels far away. You are the only clinical staff member who has noticed, and what you do in the next sixty seconds matters more than anything that follows.",
    },
  ],
};
