import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { introToEHRModules } from "@/lib/content/ehr/intro-to-ehr";

export default function IntroToEHRPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ehr" className="hover:text-primary-600">
          Electronic Health Records
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Introduction to Electronic Health Records</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">🏥</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Introduction to Electronic Health Records
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Learn the structure, purpose, and practical use of EHR systems in modern
              healthcare settings — from patient workflow and medical coding to legal
              compliance and hands-on simulation with EHR Go.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">9</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">27</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">EHR Go</div>
          <div className="text-sm text-gray-600">Simulation Platform</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">CEHRS</div>
          <div className="text-sm text-gray-600">Certification Prep</div>
        </div>
      </div>

      {/* Instructors */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Instruction Team</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-900">Mr. Michael Gera — Lead Instructor</p>
            <p className="text-sm text-gray-600">
              Leads lecture and textbook-based instruction on Mondays and Tuesdays.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Mr. Orville Davis — Lab Instructor</p>
            <p className="text-sm text-gray-600">
              Leads EHR Go hands-on lab sessions every Thursday.
            </p>
          </div>
        </div>
      </div>

      <SectionHeader
        title="Course Modules"
        description="Complete each module in order — lectures build the concepts, Thursday labs put them into practice."
      />

      <div className="space-y-4 mb-12">
        {introToEHRModules.map(({ moduleNumber, moduleSlug, title, description, level, estimatedMinutes }) => (
          <Link
            key={moduleNumber}
            href={`/learning-paths/ehr/intro-to-ehr/${moduleSlug}`}
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                    Module {moduleNumber}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>{level}</span>
                    <span>·</span>
                    <span>{Math.round(estimatedMinutes / 60 * 10) / 10} hrs</span>
                  </div>
                </div>
                <span className="text-green-600 font-semibold text-sm flex-shrink-0 ml-6">
                  Available →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
