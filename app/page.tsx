import LearningCard from "@/components/LearningCard";

type LearningPath = {
  title: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  icon: string;
};

export default function Home() {
  const msOfficePath: LearningPath = {
    title: "Microsoft Office",
    description:
      "Master Word, Excel, and PowerPoint with comprehensive modules covering essential skills for professional productivity.",
    href: "/learning-paths/ms-office",
    status: "available",
    icon: "📊",
  };

  const academicPrograms: LearningPath[] = [
    {
      title: "ENG0300 Reading for Academics",
      description:
        "Academic Bridge Reading Lab. Build the reading comprehension skills measured by the TABE: main ideas, inferences, vocabulary, text structure, point of view, evidence, and data.",
      href: "/eng0300",
      status: "available",
      icon: "📖",
    },
    {
      title: "College Preparation",
      description:
        "Build the academic skills and strategies needed to succeed in college-level coursework and higher education environments.",
      href: "#",
      status: "coming-soon",
      icon: "🎓",
    },
    {
      title: "English Speakers of Other Languages (ESOL)",
      description:
        "Develop English language proficiency for non-native speakers through reading, writing, speaking, and listening instruction.",
      href: "#",
      status: "coming-soon",
      icon: "🌐",
    },
    {
      title: "High School Equivalency Preparation (HSE)",
      description:
        "Prepare for the High School Equivalency exam with instruction in math, reading, writing, science, and social studies.",
      href: "#",
      status: "coming-soon",
      icon: "📚",
    },
  ];

  const technicalPrograms: LearningPath[] = [
    {
      title: "Office Administrative Professional (OAP)",
      description:
        "Become a job-ready office professional by mastering communication, Microsoft Office, cloud tools, scheduling, CRM systems, and AI-powered workflows.",
      href: "/learning-paths/office-assistant",
      status: "available",
      icon: "💼",
    },
    {
      title: "Electronic Health Records",
      description:
        "Learn to manage healthcare documentation and navigate EHR systems used in medical offices and clinical environments.",
      href: "/learning-paths/ehr",
      status: "available",
      icon: "🏥",
    },
    {
      title: "Medical Assisting Training (MA)",
      description:
        "Scope of practice, infection control, vital signs, documentation, assisting with procedures, medication safety, phlebotomy, and emergency response for the ambulatory care team.",
      href: "/learning-paths/programs/medical-assisting",
      status: "available",
      icon: "🩺",
    },
    {
      title: "Medical Billing and Coding",
      description:
        "Follow a clinical encounter through to a paid claim: the revenue cycle, medical terminology, ICD-10-CM and CPT coding, claim submission, denials and appeals, and the compliance rules governing all of it.",
      href: "/learning-paths/programs/medical-billing-coding",
      status: "available",
      icon: "🗂️",
    },
    {
      title: "OSHA 30 w/ Site Safety and Flagging",
      description:
        "Earn OSHA 30-hour certification covering workplace safety standards required for construction, maintenance, and industrial jobs.",
      href: "#",
      status: "coming-soon",
      icon: "🦺",
    },
    {
      title: "Patient Care Technician (PCT)",
      description:
        "Frontline bedside care: the PCT role, infection control, safe patient handling, vital signs and EKG, personal care, specimen collection, and recognizing a deteriorating patient.",
      href: "/learning-paths/programs/patient-care-technician",
      status: "available",
      icon: "🧑‍⚕️",
    },
    {
      title: "Security Guard Training (SGT)",
      description:
        "Prepare for NYS security guard licensing with training in safety procedures, conflict management, and legal responsibilities.",
      href: "#",
      status: "coming-soon",
      icon: "🛡️",
    },
    {
      title: "Pharmacy Technician Training",
      description:
        "Learn pharmacy operations, medication dispensing, and regulatory compliance to support licensed pharmacists.",
      href: "#",
      status: "coming-soon",
      icon: "💊",
    },
    {
      title: "Emergency Medical Technician (EMT)",
      description:
        "Train for EMT certification with instruction in emergency response, patient assessment, and pre-hospital care.",
      href: "#",
      status: "coming-soon",
      icon: "🚑",
    },
    {
      title: "Tourism and Hospitality Operations",
      description:
        "Develop customer service, front desk, and hospitality management skills for careers in hotels, tourism, and events.",
      href: "#",
      status: "coming-soon",
      icon: "🏨",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          BEOC Digital Skills Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Build essential digital and professional skills for the modern workplace.
          Explore academic programs, technical certifications, and career-ready
          pathways across healthcare, business, and public safety.
        </p>
      </div>

      {/* Featured */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LearningCard
            key={msOfficePath.title}
            title={msOfficePath.title}
            description={msOfficePath.description}
            href={msOfficePath.href}
            status={msOfficePath.status}
            icon={msOfficePath.icon}
          />
        </div>
      </div>

      {/* Academic Programs */}
      <div id="academic" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Academic Programs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academicPrograms.map((path) => (
            <LearningCard
              key={path.title}
              title={path.title}
              description={path.description}
              href={path.href}
              status={path.status}
              icon={path.icon}
            />
          ))}
        </div>
      </div>

      {/* Technical Programs */}
      <div id="career" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Technical Programs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technicalPrograms.map((path) => (
            <LearningCard
              key={path.title}
              title={path.title}
              description={path.description}
              href={path.href}
              status={path.status}
              icon={path.icon}
            />
          ))}
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Getting Started
        </h2>

        <div className="space-y-6 text-gray-700">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
              1
            </span>
            <div>
              <h3 className="font-semibold mb-1">
                Choose Your Learning Path
              </h3>
              <p className="text-gray-600">
                Select a course that aligns with your career goals and current skill level.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
              2
            </span>
            <div>
              <h3 className="font-semibold mb-1">
                Work Through Modules
              </h3>
              <p className="text-gray-600">
                Each module includes video tutorials, practice files, and guided exercises.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
              3
            </span>
            <div>
              <h3 className="font-semibold mb-1">
                Practice & Apply
              </h3>
              <p className="text-gray-600">
                Download practice files and complete hands-on exercises to reinforce your learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}