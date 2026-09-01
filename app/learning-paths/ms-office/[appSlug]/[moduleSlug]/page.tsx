import { notFound } from "next/navigation";
import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { officeApps } from "@/lib/content/ms-office";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ appSlug: string; moduleSlug: string }>;
}) {
  const { appSlug, moduleSlug } = await params;

  const modules = officeApps[appSlug as keyof typeof officeApps];

  if (!modules) return notFound();

  const module = modules.find((m) => m.moduleSlug === moduleSlug);

  if (!module) return notFound();

  const currentIndex = modules.findIndex((m) => m.moduleSlug === moduleSlug);

  const nextModule =
    currentIndex < modules.length - 1 ? modules[currentIndex + 1] : undefined;

  return (
    <ModuleIndexTemplate
      courseSlug={appSlug}
      courseTitle={
        appSlug === "powerpoint"
          ? "Microsoft PowerPoint"
          : appSlug === "excel"
          ? "Microsoft Excel"
          : appSlug === "word"
          ? "Microsoft Word"
          : appSlug === "access"
          ? "Microsoft Access"
          : appSlug
      }
      moduleNumber={module.moduleNumber}
      title={module.title}
      emoji={module.emoji}
      description={module.description}
      lessons={module.lessons}
      level={module.level}
      estimatedMinutes={module.estimatedMinutes}
      nextModuleHref={
        nextModule
          ? `/learning-paths/ms-office/${appSlug}/${nextModule.moduleSlug}`
          : undefined
      }
      nextModuleLabel={
        nextModule
          ? `Module ${nextModule.moduleNumber}: ${nextModule.title}`
          : undefined
      }
    />
  );
}