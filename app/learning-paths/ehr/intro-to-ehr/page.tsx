import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import CourseProgress from "@/components/progress/CourseProgress";
import { introToEHRModules } from "@/lib/content/ehr/intro-to-ehr";
import EhrSimulatorCallout from "@/components/EhrSimulatorCallout";

export default function IntroToEHRPage() {
  // Derived from the module data so these figures cannot drift out of
  // step with the course, which is what had happened when they were
  // hardcoded.
  const moduleCount = introToEHRModules.length;
  const lessonCount = introToEHRModules.reduce((n, m) => n + m.lessons.length, 0);

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
              compliance and weekly hands-on labs in the BEOC EHR Simulator.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{moduleCount}</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{lessonCount}</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">9 Labs</div>
          <div className="text-sm text-gray-600">In the BEOC EHR Simulator</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">CEHRS</div>
          <div className="text-sm text-gray-600">Certification Prep</div>
        </div>
      </div>

      {/* Instructor */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Instructor</h2>
        <p className="font-semibold text-gray-900">Mr. Orville Davis</p>
        <p className="text-sm text-gray-600">
          Teaches every class meeting: the lectures that build each concept and the hands-on
          labs in the BEOC EHR Simulator that put it into practice.
        </p>
      </div>

      <EhrSimulatorCallout
        className="mb-12"
        heading="Your lab environment: the BEOC EHR Simulator"
        text="Every lab happens in the simulator. Join with the class code Mr. Davis gives you before the first lab, then keep the lesson open in one tab and the simulator in another."
      />

      <div className="mb-8">

        <CourseProgress

          courseId="ehr/intro-to-ehr"

          total={introToEHRModules.reduce((n, m) => n + m.lessons.length, 0)}

        />

      </div>


      <SectionHeader
        title="Course Modules"
        description="Complete each module in order — lectures build the concepts, simulator labs put them into practice."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {introToEHRModules.map(({ moduleNumber, moduleSlug, emoji, title, description, level, estimatedMinutes, lessons }) => (
          <ModuleCard
            key={moduleNumber}
            num={moduleNumber}
            slug={moduleSlug}
            emoji={emoji}
            title={title}
            description={description}
            href={`/learning-paths/ehr/intro-to-ehr/${moduleSlug}`}
            level={level}
            estimatedMinutes={estimatedMinutes}
            lessonCount={lessons.length}
          />
        ))}
      </div>

    </div>
  );
}
