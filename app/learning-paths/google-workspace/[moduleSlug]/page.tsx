import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import ModuleLessonProgress from "@/components/progress/ModuleLessonProgress";
import { googleWorkspaceModules } from "@/lib/content/google-workspace/modules";
import { simsFor } from "@/lib/sims";

/*
 * Module index for the Google Workspace course. It draws the same layout as
 * components/ModuleIndexTemplate, which builds lesson links as
 * /learning-paths/<basePath>/<courseSlug>/module-N/...; this course sits one
 * level up (/learning-paths/google-workspace/module-N/...), so the page
 * builds its own links.
 */
const COURSE = "/learning-paths/google-workspace";

export function generateStaticParams() {
  return googleWorkspaceModules.map((m) => ({ moduleSlug: m.moduleSlug }));
}

export default async function GoogleWorkspaceModulePage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const modules = googleWorkspaceModules;
  const index = modules.findIndex((m) => m.moduleSlug === moduleSlug);
  if (index === -1) return notFound();

  const module = modules[index];
  const prev = index > 0 ? modules[index - 1] : undefined;
  const next = index < modules.length - 1 ? modules[index + 1] : undefined;
  const simTotal = module.lessons.reduce(
    (n, l) => n + simsFor("google-workspace", `${module.moduleSlug}::${l.slug}`).length,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={COURSE} className="hover:text-primary-600">
          Google Workspace
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Module {module.moduleNumber}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{module.emoji}</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Module {module.moduleNumber}: {module.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">{module.description}</p>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">{module.lessons.length}</div>
            <div className="text-sm text-gray-600">Lessons</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">{module.estimatedMinutes}</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">{simTotal}</div>
            <div className="text-sm text-gray-600">Practice simulations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">{module.level}</div>
            <div className="text-sm text-gray-600">Level</div>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">What You&apos;ll Learn</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {module.whatYoullLearn.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-World Scenario</h3>
          <p className="text-gray-700">{module.scenario}</p>
        </div>
      </div>

      {/* Lessons */}
      <SectionHeader
        title="Lessons"
        description="Complete each lesson in order. Watch the slideshow, read the notes, try the practice simulation, and finish the challenge."
      />

      <ModuleLessonProgress
        courseId="google-workspace"
        lessonIds={module.lessons.map((l) => `${module.moduleSlug}::${l.slug}`)}
        titles={module.lessons.map((l) => l.title)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {module.lessons.map((lesson, i) => (
          <Link key={lesson.slug} href={`${COURSE}/${module.moduleSlug}/${lesson.slug}`} className="block h-full">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
              <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-5 flex flex-col justify-between min-h-[140px]">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full backdrop-blur-sm">
                    Lesson {i + 1}
                  </span>
                  {lesson.duration && <span className="text-white/80 text-sm">⏱ {lesson.duration}</span>}
                </div>
                <span className="text-4xl mt-3 drop-shadow-sm">{module.emoji}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{lesson.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed flex-1">{lesson.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        {prev ? (
          <Link href={`${COURSE}/${prev.moduleSlug}`} className="text-gray-500 hover:text-gray-700 font-medium transition-colors">
            ← Module {prev.moduleNumber}: {prev.title}
          </Link>
        ) : (
          <Link href={COURSE} className="text-gray-500 hover:text-gray-700 font-medium transition-colors">
            ← Google Workspace
          </Link>
        )}
        {next ? (
          <Link href={`${COURSE}/${next.moduleSlug}`} className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
            Module {next.moduleNumber}: {next.title} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
