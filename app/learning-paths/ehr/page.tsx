import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function EHRProgramPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Electronic Health Records
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Learn to navigate, document, and manage Electronic Health Record systems
          used in medical offices, clinics, and hospitals — and prepare for the
          NHA Certified EHR Specialist (CEHRS) credential.
        </p>
      </div>

      {/* Program Overview */}
      <div className="mb-12 bg-primary-50 border border-primary-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Program Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">1</div>
            <div className="font-semibold">Program Course</div>
            <div className="text-sm text-gray-600">
              Introduction to Electronic Health Records
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">27</div>
            <div className="font-semibold">Lessons</div>
            <div className="text-sm text-gray-600">
              Lectures, labs & simulation exercises
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">CEHRS</div>
            <div className="font-semibold">Certification Ready</div>
            <div className="text-sm text-gray-600">
              NHA exam preparation included
            </div>
          </div>
        </div>
      </div>

      {/* Career Path Flow */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Journey</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { step: "EHR Foundations", icon: "🏥" },
            { step: "Coding & Compliance", icon: "🗂️" },
            { step: "Hands-On Simulation", icon: "💻" },
            { step: "CEHRS Certified", icon: "🎓" },
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
          <li>Electronic Health Records Specialist</li>
          <li>Medical Records Technician</li>
          <li>Healthcare Administrative Coordinator</li>
          <li>Medical Billing and Coding Specialist</li>
          <li>Health Information Clerk</li>
        </ul>
      </div>

      {/* Courses */}
      <SectionHeader
        title="Program Courses"
        description="Begin your EHR training with the foundational course below."
      />

      <div className="grid md:grid-cols-3 gap-8 mb-12">

        {/* Intro to EHR */}
        <Link href="/learning-paths/ehr/intro-to-ehr">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">🏥</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Introduction to Electronic Health Records
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Patient workflow, the healthcare revenue cycle, medical coding (ICD, CPT, HCPCS),
              legal compliance, and hands-on EHR simulation using EHR Go.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                Live
              </span>
              <span>•</span>
              <span>9 Modules</span>
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
                Start with Patient Workflow & Revenue Cycle
              </h3>
              <p className="text-sm text-gray-600">
                Understand how a patient moves through the healthcare system before touching coding.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Learn ICD, CPT, and HCPCS Coding
              </h3>
              <p className="text-sm text-gray-600">
                Build the coding skills that drive accurate claims and proper reimbursement.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Master CPOE, Legal Compliance & HIPAA
              </h3>
              <p className="text-sm text-gray-600">
                Learn the legal and regulatory framework every EHR professional must know.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Practice in EHR Go Simulation Labs
              </h3>
              <p className="text-sm text-gray-600">
                Apply every concept in a real EHR simulation environment every Thursday.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              5
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Sit for the NHA CEHRS Certification
              </h3>
              <p className="text-sm text-gray-600">
                Earn your nationally recognized credential and enter the healthcare workforce.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
