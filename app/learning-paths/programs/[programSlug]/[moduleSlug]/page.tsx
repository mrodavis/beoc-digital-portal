import { notFound } from "next/navigation";
import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { programs, programList } from "@/lib/content/programs";

export function generateStaticParams() {
  return programList.flatMap((p) =>
    p.modules.map((m) => ({ programSlug: p.slug, moduleSlug: m.moduleSlug }))
  );
}

export default async function ProgramModulePage({
  params,
}: {
  params: Promise<{ programSlug: string; moduleSlug: string }>;
}) {
  const { programSlug, moduleSlug } = await params;
  const program = programs[programSlug];
  if (!program) return notFound();

  const index = program.modules.findIndex((m) => m.moduleSlug === moduleSlug);
  if (index === -1) return notFound();

  const module = program.modules[index];
  const prev = index > 0 ? program.modules[index - 1] : undefined;
  const next =
    index < program.modules.length - 1 ? program.modules[index + 1] : undefined;
  const base = `/learning-paths/programs/${program.slug}`;

  return (
    <ModuleIndexTemplate
      courseSlug={program.slug}
      courseTitle={program.shortTitle}
      basePath="programs"
      breadcrumbRootLabel={program.shortTitle}
      breadcrumbRootHref={base}
      moduleNumber={module.moduleNumber}
      title={module.title}
      emoji={module.emoji}
      description={module.description}
      lessons={module.lessons}
      level={module.level}
      estimatedMinutes={module.estimatedMinutes}
      prevModuleHref={prev ? `${base}/${prev.moduleSlug}` : undefined}
      prevModuleLabel={
        prev ? `Module ${prev.moduleNumber}: ${prev.title}` : undefined
      }
      nextModuleHref={next ? `${base}/${next.moduleSlug}` : undefined}
      nextModuleLabel={
        next ? `Module ${next.moduleNumber}: ${next.title}` : undefined
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
