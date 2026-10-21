/**
 * Shared people, messages and helpers for the Google Workspace course's
 * modules 5-8 (Maple Street Property Management, a small property
 * management office; the learner is the new office assistant, Jordan Lee).
 * All names, addresses and domains are fictional (.example / example.com).
 */
import type { SimAction, SimStep } from "@/types/sim";
import type { GmMessage, GmPerson, GmailDoc } from "@/components/sim/apps/gmail/types";
import { normText } from "@/lib/sim/match";

export const ORG = { name: "Maple Street Property Management", domain: "maplestreetpm.example" };
export const ME: GmPerson = { name: "Jordan Lee", email: "jlee@maplestreetpm.example" };

export const P = {
  denise: { name: "Denise Carter", email: "dcarter@maplestreetpm.example", contact: true },
  luis: { name: "Luis Ortega", email: "lortega@maplestreetpm.example", contact: true },
  priya: { name: "Priya Shah", email: "pshah@maplestreetpm.example", contact: true },
  marcus: { name: "Marcus Bell", email: "mbell@maplestreetpm.example", contact: true },
  grace: { name: "Grace Kim", email: "gkim@harborviewholdings.example", contact: true },
  andre: { name: "Andre Wallace", email: "awallace@example.com", contact: true },
  rosa: { name: "Rosa Delgado", email: "rdelgado@example.com" },
  tina: { name: "Tina Okafor", email: "tokafor@example.com", contact: true },
  sam: { name: "Sam Whitfield", email: "swhitfield@example.com", contact: true },
  quickfix: { name: "QuickFix Plumbing", email: "dispatch@quickfixplumbing.example", contact: true },
  brightclean: { name: "Bright Clean Services", email: "office@brightclean.example", contact: true },
  water: { name: "City Water Utility", email: "billing@citywater.example" },
  supply: { name: "Office Supply Depot", email: "deals@officesupplydepot.example" },
  neighborly: { name: "Neighborly", email: "notifications@neighborly.example" },
  itfake: { name: "Maple Street IT Support", email: "it-support@maplestreet-pm-help.example" },
  prize: { name: "Rewards Center", email: "winner@claim-rewards-now.example" },
  webinar: { name: "Landlord Learning Hub", email: "news@landlordlearninghub.example" },
} satisfies Record<string, GmPerson>;

export const PEOPLE: GmPerson[] = Object.values(P);

/** A message with sensible defaults. */
export function msg(m: Partial<GmMessage> & { id: string; from: string; subject: string; body: string; date: string }): GmMessage {
  return { to: [ME.email], box: "inbox", ...m };
}

/** The inbox most Gmail sims start from. */
export function inbox(): GmMessage[] {
  return [
    msg({ id: "m1", from: P.denise.email, subject: "Welcome aboard, Jordan!", date: "2026-10-21T08:05", starred: false, unread: true, important: true, body: "Hi Jordan,\n\nWelcome to Maple Street Property Management! Your first week is about learning our tools. Most of our work happens in Gmail, Calendar, Drive and Meet.\n\nPlease keep an eye on the shared Maintenance and Leasing threads, and ask me anything.\n\nDenise Carter\nOffice Manager" }),
    msg({ id: "m2", from: P.luis.email, to: [ME.email, P.denise.email], cc: [P.marcus.email], subject: "Showing at 214 Elm St moved to Thursday", date: "2026-10-21T09:12", unread: true, body: "Hi all,\n\nThe prospective tenant for 214 Elm St, Unit 2 asked to move Wednesday's showing to Thursday at 4:00 PM. Marcus, can someone unlock the side door before then?\n\nThanks,\nLuis" }),
    msg({ id: "m3", from: P.priya.email, subject: "October rent roll", date: "2026-10-20T16:40", body: "Hi Jordan,\n\nAttached is the October rent roll. Please don't forward it outside the office: it lists every tenant's balance.\n\nPriya", attachments: [{ name: "Rent Roll - October.xlsx", size: "48 KB" }] }),
    msg({ id: "m4", from: P.marcus.email, subject: "Pest control visit, 88 Maple Ave", date: "2026-10-20T11:03", body: "FYI, the pest control company will spray the basement at 88 Maple Ave next Tuesday morning. No action needed from the office.\n\nMarcus" }),
    msg({ id: "m5", from: P.supply.email, subject: "30% off printer paper this week", date: "2026-10-21T06:30", category: "Promotions", unread: true, unsubscribe: true, body: "Stock up and save: 30% off copy paper, toner and file folders through Sunday." }),
    msg({ id: "m6", from: P.neighborly.email, subject: "3 neighbors posted near Maple Street", date: "2026-10-20T19:22", category: "Social", unread: true, body: "See what your neighbors are saying: a lost cat, a yard sale and a question about recycling day." }),
    msg({ id: "m7", from: P.water.email, subject: "Your October statement is ready", date: "2026-10-19T07:15", category: "Updates", body: "Your October water statement for account 55-1208 (88 Maple Ave) is ready to view. Amount due: $412.60." }),
    msg({ id: "m8", from: P.quickfix.email, subject: "Invoice #4471 for 214 Elm St", date: "2026-10-19T14:50", body: "Hello,\n\nPlease find attached invoice #4471 for the kitchen sink repair at 214 Elm St, Unit 2, completed October 16.\n\nQuickFix Plumbing Dispatch", attachments: [{ name: "Invoice 4471.pdf", size: "212 KB" }] }),
  ];
}

export function baseMail(extra: Partial<GmailDoc> = {}): GmailDoc {
  return {
    surface: "mail",
    me: ME,
    people: PEOPLE,
    org: ORG,
    messages: inbox(),
    labels: [],
    settings: { categories: ["Primary", "Promotions", "Social", "Updates"] },
    view: { folder: "inbox", tab: "Primary" },
    ...extra,
  };
}

/**
 * A form step graded on its pieces: the learner passes with any committed
 * form that contains every piece (a piece may be a list of alternatives).
 * `sample` is one complete commit; the validator plays it.
 */
export function form(target: string, sample: string, pieces: (string | string[])[], extra?: Omit<SimStep, "action" | "alt">): SimStep {
  let combos: string[][] = [[]];
  for (const k of pieces) {
    const opts = Array.isArray(k) ? k : [k];
    combos = combos.flatMap((c) => opts.map((o) => [...c, o])).slice(0, 32);
  }
  const s = normText(sample);
  if (!combos.some((c) => c.every((k) => s.includes(normText(k))))) throw new Error(`form sample for ${target} is missing a piece: ${sample}`);
  const alt: SimAction[] = combos.map((c) => ({ kind: "type", target, value: c, match: "all" }));
  return { action: { kind: "type", target, value: sample, match: "includes" }, alt, ...(extra ?? {}) };
}

export const cmd = (id: string, value?: string, selection?: string, selectHint?: string): SimStep => ({
  action: { kind: "command", id, ...(value !== undefined ? { value } : {}) },
  ...(selection ? { requires: { selection } } : {}),
  ...(selectHint ? { selectHint } : {}),
});
