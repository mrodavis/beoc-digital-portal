import { Lesson } from "@/types/lesson";
import { Program } from "@/types/program";

/**
 * Emergency Medical Technician — CONCEPT PREPARATION ONLY.
 *
 * EMT certification requires a state-approved course with didactic, lab, and
 * clinical or field hours, followed by NREMT cognitive and psychomotor exams
 * and state licensure. Nothing online substitutes for the hands-on component,
 * and the credential note is explicit about that.
 */

const m1: Lesson[] = [
  {
    slug: "the-ems-system-and-the-emt-role",
    title: "The EMS System and the EMT Role",
    description:
      "How emergency medical services are organized, what an EMT does, and what the certification pathway actually requires.",
    duration: "24 min",
    objectives: [
      "Describe the levels of EMS certification and what separates them",
      "Explain the EMT scope of practice and medical direction",
      "Describe the certification pathway from course to licensure",
      "Identify the personal demands of the role honestly",
    ],
    sections: [
      {
        heading: "Four levels, and the line between them is skills and supervision",
        blocks: [
          {
            type: "scenario",
            role: "You are considering EMT training.",
            text: "The job is described in recruitment material as fast-paced and rewarding. It is also physically hard, emotionally costly, often poorly paid at entry level, and involves shifts that end whenever the last call ends. All of that is true at once, and deciding well means knowing both halves.",
            task: "Understand the role and the pathway before committing time and money to it.",
          },
          {
            type: "table",
            caption: "EMS certification levels",
            columns: ["Level", "Broadly performs"],
            rows: [
              ["Emergency Medical Responder (EMR)", "Immediate lifesaving care with minimal equipment"],
              ["Emergency Medical Technician (EMT)", "Basic life support, assessment, oxygen, and a limited set of medications"],
              ["Advanced EMT (AEMT)", "EMT scope plus IV access and additional medications"],
              ["Paramedic", "Advanced life support — cardiac monitoring, intubation, a wide drug formulary"],
            ],
          },
          {
            type: "paragraph",
            text: "EMTs work under medical direction. A physician medical director authorizes what the service's EMTs may do, expressed as protocols. Some actions are standing orders you carry out without contacting anyone; others require online medical control, meaning you contact a physician before acting. Your scope is the intersection of your certification level, your state, and your service's protocols — and it is not identical anywhere.",
          },
          {
            type: "table",
            caption: "The certification pathway",
            columns: ["Step", "What it involves"],
            rows: [
              ["State-approved EMT course", "Classroom, skills lab, and clinical or field time — commonly 150 to 200 hours"],
              ["Course completion", "Including a psychomotor skills evaluation"],
              ["NREMT cognitive exam", "Computer-adaptive, taken at an approved testing center"],
              ["NREMT psychomotor exam", "Hands-on skill stations, where required by the state"],
              ["State licensure or certification", "The state grants the credential; NREMT is a common prerequisite"],
              ["Recertification", "Continuing education on a defined cycle"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "There is no route to EMT certification that skips the hands-on component. Airway management, spinal motion restriction, splinting, lifting, and moving a patient are psychomotor skills assessed by demonstration, and no online course can teach or verify them. Any provider claiming to certify you as an EMT entirely online is not offering something recognized.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Two things worth knowing before you enroll. The work is physically demanding — lifting and carrying patients is routine and back injury is the leading cause of career-ending injury in EMS. And the psychological load is real: you will attend calls involving children, violence, and death. Services increasingly provide critical incident support, and using it is a professional norm rather than a weakness.",
          },
          {
            type: "knowledge-check",
            question:
              "Can you become a certified EMT through an online-only course?",
            options: [
              "Yes, if the provider is accredited",
              "No — certification requires a state-approved course with hands-on skills and clinical or field hours, plus a psychomotor evaluation",
              "Yes, provided you pass the NREMT cognitive exam",
              "Only for the EMR level",
            ],
            correctIndex: 1,
            explanation:
              "The psychomotor component cannot be delivered or assessed online. State-approved courses may deliver didactic content online, but the skills lab, the clinical or field hours, and the practical evaluation are in person. Passing the cognitive exam alone does not certify anyone.",
            optionRationales: [
              "Accreditation does not remove the hands-on requirement; approved programs still include it.",
              "Correct — the practical component is mandatory and in person.",
              "The cognitive exam is one part. Skills evaluation and course completion are separate requirements.",
              "EMR also requires hands-on skills training.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Research the specific pathway where you live before committing." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find your state EMS office and list the requirements for EMT certification: course hours, exams, and any background check.",
          "Find two state-approved EMT programs near you. Record cost, length, schedule, and whether clinical placements are arranged for you.",
          "Look up the NREMT cognitive exam format and the current recertification cycle.",
          "Write down honestly what in the role concerns you most, and find out what support services in your area provide for it.",
        ],
      },
    ],
  },
  {
    slug: "patient-assessment",
    title: "Patient Assessment",
    description:
      "The assessment sequence, why its order never changes, and what each step is looking for.",
    duration: "26 min",
    objectives: [
      "Describe the scene size-up and why it comes first",
      "Perform a primary assessment in the correct order",
      "Distinguish life threats from everything else",
      "Explain what the secondary assessment adds",
    ],
    sections: [
      {
        heading: "The order is the point",
        blocks: [
          {
            type: "scenario",
            role: "You arrive at a call with a visibly injured patient.",
            text: "There is an obvious open fracture, and it draws every eye in the room. While everyone looks at the leg, the patient's airway is compromising. The injury you can see is rarely the one that kills first.",
            task: "Learn the sequence, and learn to follow it even when something dramatic is pulling your attention.",
          },
          {
            type: "paragraph",
            text: "Patient assessment follows a fixed order because the order reflects how quickly things kill. An obstructed airway kills in minutes; a fracture does not. Following the sequence is what stops the most visible problem from displacing the most urgent one, and it is why the sequence is drilled until it is automatic.",
          },
          {
            type: "table",
            caption: "The assessment sequence",
            columns: ["Step", "What it establishes"],
            rows: [
              ["Scene size-up", "Is the scene safe, how many patients, what happened, what resources are needed"],
              ["Primary assessment", "Life threats, in order: airway, breathing, circulation"],
              ["History", "What happened and what is relevant — often using SAMPLE"],
              ["Secondary assessment", "A focused or full physical examination"],
              ["Reassessment", "Whether the patient is improving, unchanged, or deteriorating"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Scene safety comes before patient care, always, and it is not a formality. An EMT who becomes a casualty has added a patient and removed a rescuer. Traffic, unstable structures, violence, animals, electrical hazards, and hazardous materials all take priority over the person you came for — and if the scene is not safe, you do not enter it until it is made safe by whoever is equipped to do that.",
          },
          {
            type: "table",
            caption: "SAMPLE history",
            columns: ["Letter", "Asks about"],
            rows: [
              ["S", "Signs and symptoms"],
              ["A", "Allergies"],
              ["M", "Medications"],
              ["P", "Past medical history"],
              ["L", "Last oral intake"],
              ["E", "Events leading up to this"],
            ],
          },
          {
            type: "worked-example",
            title: "Not being pulled off sequence",
            task: "A patient has an obvious deformed, bleeding lower leg. Family are distressed and pointing at it.",
            steps: [
              {
                move: "Complete the scene size-up before approaching.",
                why: "The mechanism that broke the leg may still be present. Stepping past a hazard because the patient is visible is how responders are injured, and it takes seconds to check.",
              },
              {
                move: "Start the primary assessment at the airway, not the leg.",
                why: "The dramatic injury is competing for your attention with things that kill faster. Airway, breathing, circulation — in that order, every time, regardless of what is visible.",
              },
              {
                move: "Control major bleeding as part of circulation.",
                why: "Life-threatening hemorrhage is addressed in the primary assessment because it kills quickly. This is where the leg enters the sequence — as bleeding, not as a fracture.",
              },
              {
                move: "Tell the family what you are doing and why.",
                why: "'I'm checking his breathing first, then I'll deal with the leg' takes three seconds and stops the pressure to skip ahead. Distressed families push you off sequence, and explaining is easier than resisting.",
              },
              {
                move: "Address the fracture in the secondary assessment.",
                why: "Splinting matters and is not time-critical in the way an airway is. It is done once the things that kill in minutes have been ruled out or managed.",
              },
            ],
            result: "Life threats identified and managed first, with the visible injury treated in its proper place.",
            takeaway: "The sequence exists so that the most visible problem does not displace the most urgent one.",
          },
          {
            type: "knowledge-check",
            question:
              "You arrive to find a patient with a severe open fracture. What do you assess first?",
            options: [
              "The fracture, since it is the obvious injury",
              "Scene safety, then airway, breathing, and circulation in that order",
              "The patient's medical history",
              "Whether the patient can walk",
            ],
            correctIndex: 1,
            explanation:
              "Scene safety comes before any patient contact, and the primary assessment then addresses airway, breathing, and circulation in that order because that is the order in which problems kill. The fracture is addressed as bleeding within circulation if it is haemorrhaging, and otherwise in the secondary assessment.",
            optionRationales: [
              "The most visible injury is rarely the most time-critical, and going straight to it is the classic error.",
              "Correct. Scene first, then airway, breathing, circulation.",
              "History matters and comes after life threats have been addressed.",
              "Mobility is not part of the primary assessment.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "These sequences must become automatic, which means practicing them out loud." },
      {
        type: "list",
        ordered: true,
        items: [
          "Write out the full assessment sequence from memory, then check it.",
          "Practice SAMPLE on a willing volunteer until you can take it without prompting.",
          "Research the difference between a rapid trauma assessment and a focused examination, and when each is used.",
          "For three scenarios you invent, write down what you would check in the scene size-up before approaching.",
        ],
      },
    ],
  },
];

export const emt: Program = {
  slug: "emt",
  group: "Healthcare",
  title: "Emergency Medical Technician",
  shortTitle: "EMT Preparation",
  icon: "🚑",
  accent: "from-red-700 to-red-900",
  description:
    "Concept preparation for EMT training: how the EMS system works, the certification pathway, and the patient assessment sequence that underpins everything else.",
  overview:
    "This coursework prepares you for an approved EMT program rather than replacing one — the practical component cannot be delivered online and this course does not pretend otherwise. What it can do is give you the conceptual framework before you arrive, so classroom time is spent building skills rather than absorbing vocabulary. It is also honest about the role: physically demanding, psychologically costly, and often modestly paid at entry level, alongside being genuinely worth doing.",
  outcomes: [
    "Describe the four EMS certification levels and what separates them",
    "Explain medical direction, protocols, and the difference between standing orders and online medical control",
    "Describe the full certification pathway from approved course to state licensure",
    "State why no online-only route to EMT certification exists",
    "Perform a scene size-up and explain why it precedes patient care",
    "Carry out a primary assessment in the correct order and say why the order is fixed",
    "Take a SAMPLE history",
    "Resist being pulled off sequence by a visually dramatic injury",
  ],
  careerRoles: [
    "Emergency Medical Technician, once certified and licensed",
    "Emergency department technician",
    "Progression to Advanced EMT or Paramedic",
    "Foundation for other healthcare pathways",
  ],
  credentialNote:
    "IMPORTANT — this is not an EMT course and completing it certifies nothing. EMT certification requires a state-approved program with classroom, skills laboratory, and clinical or field hours, followed by NREMT cognitive and psychomotor examinations and licensure by your state EMS office. The psychomotor component — airway management, splinting, spinal motion restriction, lifting and moving — is assessed by hands-on demonstration and cannot be delivered or verified online by anyone. Any provider offering online-only EMT certification is not offering a recognized credential. Nothing here is a clinical protocol: real scope of practice is set by your state and your service's medical director, and their protocols govern.",
  relatedCertifications: [
    { name: "NREMT — Emergency Medical Technician", body: "National Registry of Emergency Medical Technicians", note: "Cognitive and psychomotor exams following an approved course. Used by most states as the basis for licensure." },
    { name: "State EMT licensure or certification", body: "State EMS office", note: "The credential that actually authorizes practice. Requirements vary by state." },
    { name: "CPR / BLS for healthcare providers", body: "AHA, Red Cross, or equivalent", note: "A prerequisite for most EMT programs." },
  ],
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "EMS Foundations & Patient Assessment",
      emoji: "🚑",
      description:
        "How EMS is organized, what the certification pathway requires, and the assessment sequence that governs every call.",
      lessons: m1,
      level: "Beginner",
      estimatedMinutes: 50,
      whatYoullLearn: [
        "The four EMS levels, medical direction, and what sets your scope",
        "The full pathway from approved course to state licensure, and why no online route exists",
        "Scene size-up, and why it comes before the patient",
        "The primary assessment order, SAMPLE, and resisting the pull of a dramatic injury",
      ],
      scenario:
        "You arrive to find an obvious open fracture that draws every eye in the room, with family pointing at it. While everyone looks at the leg, the airway is compromising — and the injury you can see is rarely the one that kills first.",
    },
  ],
};
