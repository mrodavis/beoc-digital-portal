import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function OfficeAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Office Assistant Professional
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Become a job-ready office assistant by mastering communication,
          Microsoft Office, cloud tools, scheduling, CRM systems, and
          AI-powered workflows.
        </p>
      </div>

      {/* Program Overview */}
      <div className="mb-12 bg-primary-50 border border-primary-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Program Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              5
            </div>
            <div className="font-semibold">Program Courses</div>
            <div className="text-sm text-gray-600">
              End-to-end office training
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              30+
            </div>
            <div className="font-semibold">Hours of Content</div>
            <div className="text-sm text-gray-600">
              Lessons, activities & simulations
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              AI
            </div>
            <div className="font-semibold">AI-Integrated</div>
            <div className="text-sm text-gray-600">
              Real-world tools & workflows
            </div>
          </div>
        </div>
      </div>

      {/* Career Path Flow */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Career Path</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {[
            { step: "Foundations", icon: "💻" },
            { step: "Core Skills", icon: "📊" },
            { step: "Data & Systems", icon: "🗃️" },
            { step: "Real-World Operations", icon: "🏢" },
            { step: "Job Ready", icon: "🎓" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="font-semibold text-gray-800 text-sm">{item.step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Career Outcomes */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Career Outcomes</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Office Assistant</li>
          <li>Administrative Assistant</li>
          <li>Front Desk Coordinator</li>
          <li>Medical Office Assistant</li>
        </ul>
      </div>

      {/* Courses */}
      <SectionHeader
        title="Program Courses"
        description="Choose a course to begin your office assistant training."
      />

      <div className="grid md:grid-cols-3 gap-8 mb-12">

        {/* Technology Foundations */}
        <Link href="/learning-paths/office-assistant/tech-foundations">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">💻</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Technology Foundations
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Core computer skills, digital literacy, and workplace
              technology essentials for the modern office.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                Live
              </span>
              <span>•</span>
              <span>8 Modules</span>
            </div>
          </div>
        </Link>

        {/* Office Productivity Applications */}
        <Link href="/learning-paths/office-assistant/office-apps">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Office Productivity Applications
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Master Microsoft Word, Excel, and PowerPoint for daily
              professional use.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                Live
              </span>
              <span>•</span>
              <span>6 Modules</span>
            </div>
          </div>
        </Link>

        {/* Managing Office Data */}
        <Link href="/learning-paths/office-assistant/database">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">🗃️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Managing Office Data
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Organize, manage, and work with data using spreadsheets
              and office database systems.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                Live
              </span>
              <span>•</span>
              <span>5 Modules</span>
            </div>
          </div>
        </Link>

        {/* Modern Office Operations */}
        <Link href="/learning-paths/office-assistant/modern-office">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Cloud Technology with AI
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Email, cloud tools, scheduling, CRM platforms, and
              AI-powered workflows for real office environments.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                Live
              </span>
              <span>•</span>
              <span>8 Modules</span>
            </div>
          </div>
        </Link>

        {/* Certification & Career Prep */}
        <Link href="/learning-paths/certification">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Certification & Career Prep
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Prepare for industry certifications and launch your
              office assistant career with confidence.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                Live
              </span>
              <span>•</span>
              <span>4 Modules</span>
            </div>
          </div>
        </Link>

      </div>

      {/* Recommended Path */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recommended Learning Path
        </h2>

        <div className="space-y-4">

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Start with Technology Foundations
              </h3>
              <p className="text-sm text-gray-600">
                Build core computer skills before touching office software.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Master Office Productivity Applications
              </h3>
              <p className="text-sm text-gray-600">
                Learn Word, Excel, and PowerPoint for daily professional use.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Learn to Manage Office Data
              </h3>
              <p className="text-sm text-gray-600">
                Develop data organization and database skills.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Apply Skills in Modern Office Operations
              </h3>
              <p className="text-sm text-gray-600">
                Use real tools: email, scheduling, CRM, and AI in the workplace.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              5
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Certify & Launch Your Career
              </h3>
              <p className="text-sm text-gray-600">
                Complete certification prep and enter the workforce ready.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
