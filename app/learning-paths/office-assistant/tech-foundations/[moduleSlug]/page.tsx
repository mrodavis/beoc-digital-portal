import { notFound } from "next/navigation";
import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import Link from "next/link";
import { techFoundationsModules } from "@/lib/content/office-assistant/tech-foundations";
import {
  classExerciseHref,
  techFoundationsExercisesForModule,
} from "@/lib/content/class-exercises";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;

  const modules = techFoundationsModules;
  const module = modules.find((m) => m.moduleSlug === moduleSlug);

  if (!module) return notFound();

  const classExercises = techFoundationsExercisesForModule(moduleSlug);

  const currentIndex = modules.findIndex((m) => m.moduleSlug === moduleSlug);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : undefined;
  const nextModule =
    currentIndex < modules.length - 1 ? modules[currentIndex + 1] : undefined;

  return (
    <ModuleIndexTemplate
      courseId="oap/tech-foundations"
      courseSlug="tech-foundations"
      courseTitle="Technology Foundations"
      basePath="office-assistant"
      breadcrumbRootLabel="Technology Foundations"
      breadcrumbRootHref="/learning-paths/office-assistant"
      moduleNumber={module.moduleNumber}
      title={module.title}
      emoji={module.emoji}
      description={module.description}
      lessons={module.lessons}
      level={module.level}
      estimatedMinutes={module.estimatedMinutes}
      prevModuleHref={
        prevModule
          ? `/learning-paths/office-assistant/tech-foundations/${prevModule.moduleSlug}`
          : undefined
      }
      prevModuleLabel={
        prevModule
          ? `Module ${prevModule.moduleNumber}: ${prevModule.title}`
          : undefined
      }
      nextModuleHref={
        nextModule
          ? `/learning-paths/office-assistant/tech-foundations/${nextModule.moduleSlug}`
          : undefined
      }
      nextModuleLabel={
        nextModule
          ? `Module ${nextModule.moduleNumber}: ${nextModule.title}`
          : undefined
      }
      introContent={
        <div className="space-y-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What You&apos;ll Learn
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {module.whatYoullLearn.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Real-World Scenario
            </h3>
            <p className="text-gray-700">{module.scenario}</p>
          </div>
          {classExercises.length > 0 && (
            <div className="bg-primary-50 border border-primary-200 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Practice Labs
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                The practice lab and simulators for this module. Work at your
                own pace. BEOC students submit graded work in Brightspace.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {classExercises.map((exercise) => (
                  <li key={exercise.slug}>
                    <a
                      href={classExerciseHref("info3020", exercise.slug)}
                      className="group block h-full bg-white border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        {exercise.group.label} · {exercise.kind}
                      </span>
                      <span className="mt-1 block font-semibold text-gray-900 group-hover:text-primary-700">
                        {exercise.title}
                      </span>
                      <span className="mt-1 block text-sm text-gray-600">
                        {exercise.features}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href="/learning-paths/office-assistant/tech-foundations/class-exercises"
                className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:text-primary-800"
              >
                All class exercises →
              </Link>
            </div>
          )}
        </div>
      }
    />
  );
}
