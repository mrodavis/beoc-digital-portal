import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WritingTierTemplate from "@/components/eng0300/WritingTierTemplate";
import {
  writingTiers,
  getTierBySlug,
  getAdjacentTiers,
} from "@/lib/content/eng0300/writing/tiers";

/**
 * All three Writing Lab tiers render from this one route, the same way the
 * seven skill labs render from /eng0300/skills/[slug].
 *
 * These URLs are quicklinked from Brightspace and must not move.
 */
export function generateStaticParams() {
  return writingTiers.map((tier) => ({ tier: tier.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier: slug } = await params;
  const tier = getTierBySlug(slug);
  if (!tier) return { title: "Tier not found | ENG0300 Writing Lab" };
  return {
    title: `${tier.title} | ENG0300 Writing Lab`,
    description: tier.description,
  };
}

export default async function WritingTierPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier: slug } = await params;
  const tier = getTierBySlug(slug);
  if (!tier) return notFound();

  const { previous, next } = getAdjacentTiers(slug);
  return <WritingTierTemplate tier={tier} previous={previous} next={next} />;
}
