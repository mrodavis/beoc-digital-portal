import Link from "next/link";
import LearningCard from "@/components/LearningCard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          BEOC Digital Skills Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Build essential digital skills for the modern workplace. Master Microsoft Office, 
          prepare for industry certifications, and develop foundational knowledge in technology.
        </p>
      </div>

      {/* Learning Paths */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Learning Paths</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LearningCard
            title="Microsoft Office 2019"
            description="Master Word, Excel, and PowerPoint with comprehensive modules covering essential skills for professional productivity."
            href="/learning-paths/ms-office"
            status="available"
            icon="📊"
          />
          
          <LearningCard
            title="Certification Prep"
            description="Prepare for industry-recognized certifications including Microsoft Office Specialist (MOS) and other professional credentials."
            href="/learning-paths/certification"
            status="available"
            icon="🎓"
          />
          
          <LearningCard
            title="Digital Fundamentals"
            description="Explore cybersecurity basics, networking concepts, and AI literacy. Coming soon to expand your digital knowledge."
            href="#"
            status="coming-soon"
            icon="🔐"
          />
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">1</span>
            <div>
              <h3 className="font-semibold mb-1">Choose Your Learning Path</h3>
              <p className="text-gray-600">Select a course that aligns with your career goals and current skill level.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">2</span>
            <div>
              <h3 className="font-semibold mb-1">Work Through Modules</h3>
              <p className="text-gray-600">Each module includes video tutorials, practice files, and guided exercises.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">3</span>
            <div>
              <h3 className="font-semibold mb-1">Practice & Apply</h3>
              <p className="text-gray-600">Download practice files and complete hands-on exercises to reinforce your learning.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
