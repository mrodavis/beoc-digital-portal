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
    title: "Microsoft Office 2019",
    description:
      "Master Word, Excel, and PowerPoint with comprehensive modules covering essential skills for professional productivity.",
    href: "/learning-paths/ms-office",
    status: "available",
    icon: "📊",
  };

  const academicPrograms: LearningPath[] = [
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
      href: "#",
      status: "coming-soon",
      icon: "🏥",
    },
    {
      title: "Medical Assisting Training (MA)",
      description:
        "Develop clinical and administrative skills to support physicians and care teams in medical office settings.",
      href: "#",
      status: "coming-soon",
      icon: "🩺",
    },
    {
      title: "Medical Billing and Coding",
      description:
        "Master healthcare billing procedures, medical coding systems, and insurance claims processing for administrative roles.",
      href: "#",
      status: "coming-soon",
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
        "Prepare for a frontline clinical role with training in patient support, vital signs, and basic care procedures.",
      href: "#",
      status: "coming-soon",
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
      <div className="mb-12">
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
      <div className="mb-12">
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