// Program catalog shown on the home page. Each entry links to an existing route.
export type CatalogItem = {
  title: string;
  area: "Healthcare" | "Business" | "Hospitality" | "Public Safety" | "Academic";
  abbr: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  icon: string;
};

export const msOfficePath: CatalogItem = {
  title: "Microsoft Office",
  area: "Business",
  abbr: "MO",
  description:
    "Master Word, Excel, and PowerPoint with comprehensive modules covering essential skills for professional productivity.",
  href: "/learning-paths/ms-office",
  status: "available",
  icon: "📊",
};

export const googleWorkspacePath: CatalogItem = {
  title: "Google Workspace",
  area: "Business",
  abbr: "GW",
  description:
    "Work in Drive, Docs, Sheets, Slides, Gmail, Calendar, and Meet the way offices use them, with practice simulations and side-by-side notes for Microsoft 365 users.",
  href: "/learning-paths/google-workspace",
  status: "available",
  icon: "🧭",
};

export const ehrSimulatorPath: CatalogItem = {
  title: "BEOC EHR Simulator",
  area: "Healthcare",
  abbr: "EHR",
  description:
    "Work real clinical-software workflows in a training hospital with fictional patients: charts, vitals, orders, results, scheduling, and billing. Join with your class code.",
  href: "/ehr-simulator",
  status: "available",
  icon: "🖥️",
};

export const academicPrograms: CatalogItem[] = [
  {
    title: "ENG0300 Reading for Academics",
    area: "Academic",
    abbr: "ENG",
    description:
      "Academic Bridge Reading Lab. Build the reading comprehension skills measured by the TABE: main ideas, inferences, vocabulary, text structure, point of view, evidence, and data.",
    href: "/eng0300",
    status: "available",
    icon: "📖",
  },
  {
    title: "ENGL0150 Writing for the Workplace",
    area: "Academic",
    abbr: "ENGL",
    description:
      "Healthcare workplace writing for MA, PCT, and Medical Billing students. Grammar and sentence clarity, objective documentation, SOAP notes, patient instructions, professional email, and using AI as a writing coach.",
    href: "/engl0150",
    status: "available",
    icon: "✍️",
  },
  {
    title: "College Preparation",
    area: "Academic",
    abbr: "CP",
    description:
      "Build the academic skills and strategies needed to succeed in college-level coursework and higher education environments.",
    href: "/learning-paths/programs/college-preparation",
    status: "available",
    icon: "🎓",
  },
  {
    title: "English Speakers of Other Languages (ESOL)",
    area: "Academic",
    abbr: "ESOL",
    description:
      "Develop English language proficiency for non-native speakers through reading, writing, speaking, and listening instruction.",
    href: "/learning-paths/programs/esol",
    status: "available",
    icon: "🌐",
  },
  {
    title: "High School Equivalency Preparation (HSE)",
    area: "Academic",
    abbr: "HSE",
    description:
      "Prepare for the High School Equivalency exam with instruction in math, reading, writing, science, and social studies.",
    href: "/learning-paths/programs/high-school-equivalency",
    status: "available",
    icon: "📚",
  },
];

export const technicalPrograms: CatalogItem[] = [
  {
    title: "Office Administrative Professional (OAP)",
    area: "Business",
    abbr: "OAP",
    description:
      "Become a job-ready office professional by mastering communication, Microsoft Office, cloud tools, scheduling, CRM systems, and AI-powered workflows.",
    href: "/learning-paths/office-assistant",
    status: "available",
    icon: "💼",
  },
  {
    title: "Electronic Health Records",
    area: "Healthcare",
    abbr: "EHR",
    description:
      "Learn to manage healthcare documentation and navigate EHR systems used in medical offices and clinical environments.",
    href: "/learning-paths/ehr",
    status: "available",
    icon: "🏥",
  },
  {
    title: "Medical Assisting Training (MA)",
    area: "Healthcare",
    abbr: "MA",
    description:
      "Scope of practice, infection control, vital signs, documentation, assisting with procedures, medication safety, phlebotomy, and emergency response for the ambulatory care team.",
    href: "/learning-paths/programs/medical-assisting",
    status: "available",
    icon: "🩺",
  },
  {
    title: "Medical Billing and Coding",
    area: "Healthcare",
    abbr: "MBC",
    description:
      "Follow a clinical encounter through to a paid claim: the revenue cycle, medical terminology, ICD-10-CM and CPT coding, claim submission, denials and appeals, and the compliance rules governing all of it.",
    href: "/learning-paths/programs/medical-billing-coding",
    status: "available",
    icon: "🗂️",
  },
  {
    title: "OSHA 30 w/ Site Safety and Flagging",
    area: "Public Safety",
    abbr: "OSHA",
    description:
      "Prepare for the OSHA 30-Hour Construction course and card: worker rights, the Focus Four hazards, hazard communication, PPE, and work zone flagging.",
    href: "/learning-paths/programs/osha-30",
    status: "available",
    icon: "🦺",
  },
  {
    title: "Patient Care Technician (PCT)",
    area: "Healthcare",
    abbr: "PCT",
    description:
      "Frontline bedside care: the PCT role, infection control, safe patient handling, vital signs and EKG, personal care, specimen collection, and recognizing a deteriorating patient.",
    href: "/learning-paths/programs/patient-care-technician",
    status: "available",
    icon: "🧑‍⚕️",
  },
  {
    title: "Security Guard Training (SGT)",
    area: "Public Safety",
    abbr: "SGT",
    description:
      "Prepare for NYS security guard licensing with training in safety procedures, conflict management, and legal responsibilities.",
    href: "/learning-paths/programs/security-guard",
    status: "available",
    icon: "🛡️",
  },
  {
    title: "Pharmacy Technician Training",
    area: "Healthcare",
    abbr: "RX",
    description:
      "Learn pharmacy operations, medication dispensing, and regulatory compliance to support licensed pharmacists.",
    href: "/learning-paths/programs/pharmacy-technician",
    status: "available",
    icon: "💊",
  },
  {
    title: "Emergency Medical Technician (EMT)",
    area: "Healthcare",
    abbr: "EMT",
    description:
      "Train for EMT certification with instruction in emergency response, patient assessment, and pre-hospital care.",
    href: "/learning-paths/programs/emt",
    status: "available",
    icon: "🚑",
  },
  {
    title: "Tourism and Hospitality Operations",
    area: "Hospitality",
    abbr: "TH",
    description:
      "Develop customer service, front desk, and hospitality management skills for careers in hotels, tourism, and events.",
    href: "/learning-paths/programs/tourism-hospitality",
    status: "available",
    icon: "🏨",
  },
];

