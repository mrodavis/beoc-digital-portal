import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import { techFoundationsModules } from "@/lib/content/office-assistant/tech-foundations";

export default function TechFoundationsPage() {
  // Derived from the module data so these figures cannot drift out of
  // step with the course, which is what had happened when they were
  // hardcoded.
  const moduleCount = techFoundationsModules.length;
  const lessonCount = techFoundationsModules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/office-assistant" className="hover:text-primary-600">
          Office Assistant
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Technology Foundations</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">💻</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Technology Foundations
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Build the core computer skills, digital literacy, and workplace technology
              confidence that every modern office professional needs from day one.
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
          <div className="text-2xl font-bold text-primary-600">9+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">Windows</div>
          <div className="text-sm text-gray-600">10 / 11</div>
        </div>
      </div>

      <SectionHeader
        title="Course Modules"
        description="Complete each module in order to build a complete technology foundation for professional office work."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { num: 1, slug: "module-1", emoji: "💻", title: "Computers & Operating Systems", description: "Understand hardware, navigate Windows confidently, manage programs, and configure system settings for a professional workstation." },
          { num: 2, slug: "module-2", emoji: "🗂️", title: "File Management & Organization", description: "Create, name, copy, move, and search files and folders with the professional habits that keep an office organized and efficient." },
          { num: 3, slug: "module-3", emoji: "🌐", title: "The Internet & Web Browsing", description: "Navigate the web effectively, research reliably, use browser tools professionally, and browse safely on a work network." },
          { num: 4, slug: "module-4", emoji: "📧", title: "Professional Email Communication", description: "Write, organize, and manage professional email with the clarity, tone, and efficiency expected in a modern medical office." },
          { num: 5, slug: "module-5", emoji: "⌨️", title: "Keyboard Skills & Typing Efficiency", description: "Build touch typing habits, master essential Windows shortcuts, and develop the data-entry accuracy that clinical systems demand." },
          { num: 6, slug: "module-6", emoji: "🖨️", title: "Workplace Hardware & Equipment", description: "Operate, troubleshoot, and maintain the printers, scanners, monitors, and video conferencing hardware of a modern office." },
          { num: 7, slug: "module-7", emoji: "☁️", title: "Cloud Storage & Collaboration", description: "Use OneDrive, SharePoint, and Microsoft Teams to store, share, and collaborate on documents the way modern offices actually work." },
          { num: 8, slug: "module-8", emoji: "🔐", title: "Cybersecurity Fundamentals", description: "Recognize digital threats, protect accounts with strong passwords and MFA, identify phishing attacks, and handle patient data securely under HIPAA." },
        ].map(({ num, slug, emoji, title, description }) => (
          <ModuleCard
            key={num}
            num={num}
            slug={slug}
            emoji={emoji}
            title={title}
            description={description}
            href={`/learning-paths/office-assistant/tech-foundations/${slug}`}
          />
        ))}
      </div>

    </div>
  );
}
