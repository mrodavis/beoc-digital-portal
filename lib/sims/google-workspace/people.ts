import type { GPerson } from "@/components/sim/apps/google/types";

/**
 * The Google Workspace course scenario, shared by every module.
 *
 * Parkview Property Management is a fictional small business: an office that
 * manages apartment buildings (Elm Street Apartments and Riverside Commons).
 * The learner is Jordan Lee, the new office assistant. Every person, address,
 * and record here is made up. Domains end in .example so none can be real.
 */
export const GW_ORG = { name: "Parkview Property Management", domain: "parkviewpm.example" };

/** The signed-in account in every course sim. */
export const GW_ME: GPerson = { name: "Jordan Lee", email: "jlee@parkviewpm.example", color: "#1a73e8" };

export const GW_PEOPLE: GPerson[] = [
  { name: "Denise Carter", email: "dcarter@parkviewpm.example", color: "#188038" },
  { name: "Marcus Reyes", email: "mreyes@parkviewpm.example", color: "#e8710a" },
  { name: "Kim Nguyen", email: "knguyen@parkviewpm.example", color: "#9334e6" },
  { name: "Priya Shah", email: "pshah@parkviewpm.example", color: "#d93025" },
  { name: "Andre Wallace", email: "awallace@parkviewpm.example", color: "#12858a" },
  { name: "Tony Russo", email: "tony@russoplumbing.example", color: "#b06000" },
];

/** Email by first name, for sims: `EMAIL.denise`. */
export const EMAIL = {
  jordan: GW_ME.email,
  denise: "dcarter@parkviewpm.example",
  marcus: "mreyes@parkviewpm.example",
  kim: "knguyen@parkviewpm.example",
  priya: "pshah@parkviewpm.example",
  andre: "awallace@parkviewpm.example",
  tony: "tony@russoplumbing.example",
} as const;
