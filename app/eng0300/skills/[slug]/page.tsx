import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SkillPageTemplate from "@/components/eng0300/SkillPageTemplate";
import {
  eng0300Skills,
  getAdjacentSkills,
  getSkillBySlug,
} from "@/lib/content/eng0300/skills";

/** All seven skill labs render from this one route. */
export function generateStaticParams() {
  return eng0300Skills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) return { title: "Skill not found | ENG0300 Reading Lab" };

  return {
    title: `${skill.title} | ENG0300 Reading Lab`,
    description: skill.description,
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) return notFound();

  const { previous, next } = getAdjacentSkills(slug);

  return <SkillPageTemplate skill={skill} previous={previous} next={next} />;
}
