import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

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

      <div className="space-y-4 mb-8">

        {/* Module 1 */}
        <Link href="/learning-paths/ms-office/powerpoint/module-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 1
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Getting Started with PowerPoint
                </h3>
                <p className="text-gray-600">
                  Interface overview, OneDrive integration, creating presentations, saving files, and slide basics.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br />

        {/* Module 2 */}
        <Link href="/learning-paths/ms-office/powerpoint/module-2">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 2
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Working with Text
                </h3>
                <p className="text-gray-600">
                  Text formatting, lists, spacing, indentation, and find & replace tools.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br />

        {/* Module 3 */}
        <Link href="/learning-paths/ms-office/powerpoint/module-3">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 3
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Slide Design & Themes
                </h3>
                <p className="text-gray-600">
                  Apply themes, modify design styles, and use Slide Master for consistent presentation layouts.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br />

        {/* Module 4 */}
        <Link href="/learning-paths/ms-office/powerpoint/module-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 4
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Managing Slides & Presentations
                </h3>
                <p className="text-gray-600">
                  Organize slides, manage presentation structure, print slides, and present to an audience.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link>

      </div>

      {/* ================= VISUAL DESIGN ================= */}
      <SectionHeader
        title="Visual Design & Media (Modules 5–8)"
        description="Create engaging slides with images, shapes, charts, and multimedia."
      />

      <div className="space-y-4 mb-8">

        {/* Module 5 */}
        <Link href="/learning-paths/ms-office/powerpoint/module-5">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 5
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Images & Objects
                </h3>
                <p className="text-gray-600">
                  Insert pictures, format graphics, work with shapes, and align objects.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br />

        {/* Module 6 */}
        <Link href="/learning-paths/ms-office/powerpoint/module-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 6
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Animations & Multimedia
                </h3>
                <p className="text-gray-600">
                  Apply transitions, animate objects, and add audio and video to slides.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br />

        {/* Module 7 */}
        <Link href="/learning-paths/ms-office/powerpoint/module-7">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 7
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Tables, Charts & SmartArt
                </h3>
                <p className="text-gray-600">
                  Present structured information using tables, charts, and SmartArt graphics.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br />

        {/* Module 8 */}
        <Link href="/learning-paths/ms-office/powerpoint/module-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 8
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Review & Protect Presentations
                </h3>
                <p className="text-gray-600">
                  Proof presentations, review slides, inspect documents, and protect presentation files.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link>

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