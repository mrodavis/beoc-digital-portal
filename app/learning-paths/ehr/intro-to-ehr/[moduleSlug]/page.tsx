import { notFound } from "next/navigation";
import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { introToEHRModules } from "@/lib/content/ehr/intro-to-ehr";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;

  const modules = introToEHRModules;
  const module = modules.find((m) => m.moduleSlug === moduleSlug);

  if (!module) return notFound();

  const currentIndex = modules.findIndex((m) => m.moduleSlug === moduleSlug);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : undefined;
  const nextModule =
    currentIndex < modules.length - 1 ? modules[currentIndex + 1] : undefined;

  return (
    <ModuleIndexTemplate
      courseId="ehr/intro-to-ehr"
      courseSlug="intro-to-ehr"
      courseTitle="Introduction to Electronic Health Records"
      basePath="ehr"
      breadcrumbRootLabel="Introduction to EHR"
      breadcrumbRootHref="/learning-paths/ehr"
      moduleNumber={module.moduleNumber}
      title={module.title}
      emoji={module.emoji}
      description={module.description}
      lessons={module.lessons}
      level={module.level}
      estimatedMinutes={module.estimatedMinutes}
      prevModuleHref={
        prevModule
          ? `/learning-paths/ehr/intro-to-ehr/${prevModule.moduleSlug}`
          : undefined
      }
      prevModuleLabel={
        prevModule
          ? `Module ${prevModule.moduleNumber}: ${prevModule.title}`
          : undefined
      }
      nextModuleHref={
        nextModule
          ? `/learning-paths/ehr/intro-to-ehr/${nextModule.moduleSlug}`
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
        </div>
      }
    />
  );
}
