import { Program } from "@/types/program";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";
import { module6Lessons } from "./module6Lessons";

export const patientCareTechnician: Program = {
  slug: "patient-care-technician",
  title: "Patient Care Technician",
  shortTitle: "Patient Care Technician",
  icon: "🧑‍⚕️",
  accent: "from-indigo-700 to-indigo-900",
  description:
    "Build the knowledge behind frontline patient care: the PCT role and reporting relationship, infection control, safe patient handling, vital signs, EKG, personal care, specimen collection, and recognizing a deteriorating patient.",
  overview:
    "Patient care technicians spend more time at the bedside than anyone else on the team, which is the role's real contribution: sustained proximity produces observations nobody else is positioned to make. The job combines nursing assistant duties with technical skills such as phlebotomy and EKG, all performed under the supervision of a registered nurse. This coursework builds the knowledge that must precede supervised clinical practice, and returns throughout to the two things the role runs on — accurate observation, and reporting it in time for someone to act.",
  outcomes: [
    "Describe the PCT role and how it differs from CNA and medical assistant roles",
    "Report observations to a nurse specifically enough to be acted on",
    "Apply Standard Precautions and PPE during sustained direct patient contact",
    "Use body mechanics and transfer techniques that protect you and the patient",
    "Identify fall risk and apply prevention measures",
    "Measure vital signs accurately and interpret them against a patient's own baseline",
    "Place EKG leads correctly and recognize artifact",
    "Provide personal care that preserves dignity and independence",
    "Prevent pressure injury and recognize a stage 1 injury",
    "Assist with feeding safely, including aspiration precautions",
    "Recognize early clinical deterioration and escalate effectively",
  ],
  careerRoles: [
    "Patient care technician",
    "Patient care assistant",
    "Nursing assistant",
    "Dialysis technician",
    "Emergency department technician",
    "Nurse extern",
  ],
  credentialNote:
    "This is coursework, not a credential, and it cannot make anyone competent to perform hands-on patient care. Every clinical skill here — transfers, personal care, venipuncture, EKG, feeding assistance — requires supervised instruction and competency assessment before it is performed on a patient, and the consequences of performing them untrained fall on the patient. Many states also require CNA certification as the foundation for PCT employment, which means completing a state-approved program with a mandated number of supervised clinical hours; that requirement cannot be satisfied online. Verify what your state and prospective employer require before relying on this coursework alone.",
  relatedCertifications: [
    {
      name: "CPCT/A — Certified Patient Care Technician/Assistant",
      body: "National Healthcareer Association",
      note: "Requires a training program or documented work experience.",
    },
    {
      name: "NCPCT — National Certified Patient Care Technician",
      body: "National Center for Competency Testing",
      note: "Several eligibility routes.",
    },
    {
      name: "State CNA certification",
      body: "Individual state registries",
      note: "Often a prerequisite for PCT roles. Requires a state-approved program with supervised clinical hours.",
    },
  ],
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "The Role & Patient Rights",
      emoji: "🧭",
      description:
        "What PCTs do, the reporting relationship to nurses, and the rights that govern how patients are treated.",
      lessons: module1Lessons,
      level: "Beginner",
      estimatedMinutes: 46,
      whatYoullLearn: [
        "PCT duties, and how the role differs from CNA and MA roles",
        "Working under nursing supervision and reporting accurately",
        "Fundamental patient rights, including the right to refuse care",
        "Recognizing and reporting abuse or neglect",
      ],
      scenario:
        "Over a twelve-hour shift you spend more time at the bedside than anyone else on the team. You notice a patient's breathing has changed and they seem quieter than this morning. At handoff you say they 'seemed a bit off' — and the oncoming nurse has nothing they can act on.",
    },
    {
      moduleNumber: 2,
      moduleSlug: "module-2",
      title: "Infection Control & Safety",
      emoji: "🧼",
      description:
        "Standard Precautions and PPE during close patient contact, plus body mechanics and fall prevention.",
      lessons: module2Lessons,
      level: "Beginner",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Hand hygiene moments and PPE sequences in direct care",
        "Preventing cross-contamination between dirty and clean tasks",
        "Body mechanics that prevent cumulative back injury",
        "Fall risk factors, prevention, and the limits on restraint use",
      ],
      scenario:
        "A patient is sliding down in bed and asks to be pulled up. You are alone, the lift is on another unit, and getting help would take four minutes. You reach across, twist, and pull — and your back becomes the reason you leave this job in eighteen months.",
    },
    {
      moduleNumber: 3,
      moduleSlug: "module-3",
      title: "Vital Signs, EKG & Testing",
      emoji: "💓",
      description:
        "Measure vital signs accurately, read them against the patient's baseline, and perform EKGs and point-of-care tests correctly.",
      lessons: module3Lessons,
      level: "Intermediate",
      estimatedMinutes: 50,
      whatYoullLearn: [
        "Correct technique and expected ranges for each vital sign",
        "Why a normal value can still be a significant change",
        "12-lead EKG electrode placement and recognizing artifact",
        "CLIA-waived point-of-care testing and quality control",
      ],
      scenario:
        "A patient's heart rate is 98 — inside the normal range, easy to record and move on. Their rate has been 62 every shift for three days. Later you place V1 and V2 one intercostal space too high, producing changes suggesting a problem the patient does not have.",
    },
    {
      moduleNumber: 4,
      moduleSlug: "module-4",
      title: "Personal Care & Mobility",
      emoji: "🛏️",
      description:
        "Provide personal care that preserves dignity, and prevent the pressure injuries that develop when patients are not moved.",
      lessons: module4Lessons,
      level: "Intermediate",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Personal care that protects dignity and independence",
        "Adapting care for patients with cognitive impairment",
        "Pressure points, repositioning schedules, and stage 1 recognition",
        "Ambulation with a gait belt, and what to do if a patient falls",
      ],
      scenario:
        "A patient who dressed himself every day for seventy years now needs help with a shirt. How that help is given determines whether he experiences it as assistance or as the moment he stopped being an adult. Down the hall, a patient left on their back for four hours is developing a pressure injury.",
    },
    {
      moduleNumber: 5,
      moduleSlug: "module-5",
      title: "Nutrition & Specimens",
      emoji: "🍽️",
      description:
        "Assist with feeding safely, record intake and output accurately, and collect and label specimens so results can be trusted.",
      lessons: module5Lessons,
      level: "Intermediate",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "Safe feeding practice and aspiration precautions",
        "Why prescribed diet textures and liquid thicknesses cannot be altered",
        "Recording intake and output accurately",
        "Clean-catch collection, the order of draw, and specimen labelling",
      ],
      scenario:
        "A patient recovering from a stroke is fed quickly because the tray cart is waiting, reclined at 30 degrees, with large spoonfuls and no pause. Aspiration pneumonia is one of the most common hospital-acquired complications, and this is how it starts.",
    },
    {
      moduleNumber: 6,
      moduleSlug: "module-6",
      title: "Deterioration & End-of-Life Care",
      emoji: "🚨",
      description:
        "Recognize a declining patient and escalate in time, provide comfort-focused care, and sustain yourself in demanding work.",
      lessons: module6Lessons,
      level: "Advanced",
      estimatedMinutes: 46,
      whatYoullLearn: [
        "Early warning signs of deterioration, including new confusion",
        "How to escalate again when a concern is not acted on",
        "Immediate responses to falls, seizures, and choking",
        "Comfort care at end of life, and recognizing compassion fatigue in yourself",
      ],
      scenario:
        "A patient who has been chatty all week is quiet this afternoon and says she just feels 'strange.' Her vital signs are within normal limits. Nothing is objectively wrong, and you are the only person who knows how she has been for the last four days.",
    },
  ],
};
