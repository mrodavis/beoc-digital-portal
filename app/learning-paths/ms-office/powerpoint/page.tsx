import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";

export default function PowerPointPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ms-office" className="hover:text-primary-600">
          Microsoft Office 2019
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">PowerPoint 2019</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">🎨</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              PowerPoint 2019
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Learn how to design professional presentations with slides, layouts,
              themes, animations, media, and presentation delivery tools.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">12</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">38</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">6+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">MOS</div>
          <div className="text-sm text-gray-600">Cert Prep</div>
        </div>
      </div>

      {/* ================= FOUNDATIONS ================= */}
      <SectionHeader
        title="PowerPoint Foundations (Modules 1–4)"
        description="Learn the core tools used to build and manage presentations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ModuleCard num={1} slug="module-1" emoji="🎯" title="Getting Started with PowerPoint" description="Interface overview, OneDrive integration, creating presentations, saving files, and slide basics." href="/learning-paths/ms-office/powerpoint/module-1" />
        <ModuleCard num={2} slug="module-2" emoji="✏️" title="Working with Text" description="Text formatting, lists, spacing, indentation, and find & replace tools." href="/learning-paths/ms-office/powerpoint/module-2" />
        <ModuleCard num={3} slug="module-3" emoji="🎨" title="Slide Design & Themes" description="Apply themes, modify design styles, and use Slide Master for consistent presentation layouts." href="/learning-paths/ms-office/powerpoint/module-3" />
        <ModuleCard num={4} slug="module-4" emoji="🗂️" title="Managing Slides & Presentations" description="Organize slides, manage presentation structure, print slides, and present to an audience." href="/learning-paths/ms-office/powerpoint/module-4" />
      </div>

      {/* ================= VISUAL DESIGN ================= */}
      <SectionHeader
        title="Visual Design & Media (Modules 5–8)"
        description="Create engaging slides with images, shapes, charts, and multimedia."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ModuleCard num={5} slug="module-5" emoji="🖼️" title="Images & Objects" description="Insert pictures, format graphics, work with shapes, and align objects." href="/learning-paths/ms-office/powerpoint/module-5" />
        <ModuleCard num={6} slug="module-6" emoji="🎬" title="Animations & Multimedia" description="Apply transitions, animate objects, and add audio and video to slides." href="/learning-paths/ms-office/powerpoint/module-6" />
        <ModuleCard num={7} slug="module-7" emoji="📊" title="Tables, Charts & SmartArt" description="Present structured information using tables, charts, and SmartArt graphics." href="/learning-paths/ms-office/powerpoint/module-7" />
        <ModuleCard num={8} slug="module-8" emoji="🔒" title="Review & Protect Presentations" description="Proof presentations, review slides, inspect documents, and protect presentation files." href="/learning-paths/ms-office/powerpoint/module-8" />
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-3">Prerequisites</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Basic computer literacy</li>
          <li>• Microsoft PowerPoint 2019 or Microsoft 365 installed</li>
          <li>• Willingness to practice building presentations</li>
        </ul>
      </div>

    </div>
  );
}
