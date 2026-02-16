import Link from "next/link";

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
              Coming Soon: Master presentation design with professional slides, 
              animations, transitions, multimedia, and effective visual communication.
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
        <svg
          className="w-16 h-16 text-amber-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          PowerPoint Modules Coming Soon
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're currently developing comprehensive PowerPoint 2019 training modules. 
          In the meantime, continue with Word 2019 or explore our Certification Prep section.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/learning-paths/ms-office/word"
            className="btn-primary"
          >
            Start with Word
          </Link>
          <Link
            href="/learning-paths/ms-office"
            className="btn-secondary"
          >
            Back to Office Suite
          </Link>
        </div>
      </div>

      {/* Planned Modules Preview */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Planned Modules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Module 1: PowerPoint Basics
            </h3>
            <p className="text-gray-600 text-sm">
              Interface overview, creating slides, text formatting, and basic layouts
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Module 2: Design & Themes
            </h3>
            <p className="text-gray-600 text-sm">
              Working with themes, master slides, color schemes, and fonts
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Module 3: Graphics & Media
            </h3>
            <p className="text-gray-600 text-sm">
              Images, SmartArt, shapes, charts, audio, and video integration
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Module 4: Animations & Transitions
            </h3>
            <p className="text-gray-600 text-sm">
              Slide transitions, object animations, timing, and effects
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Module 5: Presentation Delivery
            </h3>
            <p className="text-gray-600 text-sm">
              Presenter view, handouts, notes, rehearsal tools, and sharing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
