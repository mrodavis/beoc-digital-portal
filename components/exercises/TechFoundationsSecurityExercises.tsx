import type { ReactNode } from "react";
import NetworkDiagramBuilder from "./NetworkDiagramBuilder";

/**
 * Interactive exercises for Tech Foundations modules 8-10, rendered by the
 * lesson route after the Challenge (and Challenge Lab). Returns undefined for
 * lessons without one, so other modules' exercises can be chained with `??`.
 */
export function techFoundationsSecurityExercises(moduleSlug: string, slug: string): ReactNode | undefined {
  if (moduleSlug === "module-10" && slug === "designing-a-soho-network") return <NetworkDiagramBuilder />;
  return undefined;
}
