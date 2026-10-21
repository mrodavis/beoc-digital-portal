/**
 * Shared people, messages and helpers for the Google Workspace course's
 * modules 5-8 (Parkview Property Management, the course scenario in
 * people.ts; the learner is the new office assistant, Jordan Lee).
 * All names, addresses and domains are fictional (.example / example.com).
 */
import type { SimAction, SimStep } from "@/types/sim";
import type { GmMessage, GmPerson, GmailDoc } from "@/components/sim/apps/gmail/types";
import { normText } from "@/lib/sim/match";
import { EMAIL, GW_ME, GW_ORG, GW_PEOPLE } from "./people";

export const ORG = GW_ORG;
export const ME: GmPerson = { ...GW_ME };

/** Course staff and vendor from people.ts (shared with modules 1-4). */
const staff = (email: string): GmPerson => ({ ...GW_PEOPLE.find((p) => p.email === email)!, contact: true });

export const P = {
  denise: staff(EMAIL.denise),
  marcus: staff(EMAIL.marcus),
  kim: staff(EMAIL.kim),
  priya: staff(EMAIL.priya),
  andre: staff(EMAIL.andre),
  tony: staff(EMAIL.tony),
  grace: { name: "Grace Holloway", email: "gholloway@harborviewholdings.example", contact: true },
  darnell: { name: "Darnell Brooks", email: "dbrooks@example.com", contact: true },
  rosa: { name: "Rosa Delgado", email: "rdelgado@example.com" },
  tina: { name: "Tina Okafor", email: "tokafor@example.com", contact: true },
  sam: { name: "Sam Whitfield", email: "swhitfield@example.com", contact: true },
  brightclean: { name: "Bright Clean Services", email: "office@brightclean.example", contact: true },
  water: { name: "City Water Utility", email: "billing@citywater.example" },
  supply: { name: "Office Supply Depot", email: "deals@officesupplydepot.example" },
  neighborly: { name: "Neighborly", email: "notifications@neighborly.example" },
  itfake: { name: "Parkview IT Support", email: "it-support@parkview-pm-help.example" },
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
    msg({ id: "m1", from: P.denise.email, subject: "Welcome aboard, Jordan!", date: "2026-10-21T08:05", starred: false, unread: true, important: true, body: "Hi Jordan,\n\nWelcome to Parkview Property Management! Your first week is about learning our tools. Most of our work happens in Gmail, Calendar, Drive and Meet.\n\nPlease keep an eye on the shared Maintenance and Leasing threads, and ask me anything.\n\nDenise Carter\nOffice Manager" }),
    msg({ id: "m2", from: P.andre.email, to: [ME.email, P.denise.email], cc: [P.kim.email], subject: "Showing at Elm Street Apartments moved to Thursday", date: "2026-10-21T09:12", unread: true, body: "Hi all,\n\nThe prospective tenant for Elm Street Apartments, Unit 2B asked to move Wednesday's showing to Thursday at 4:00 PM. Kim, can someone unlock the side door before then?\n\nThanks,\nAndre" }),
    msg({ id: "m3", from: P.priya.email, subject: "October rent roll", date: "2026-10-20T16:40", body: "Hi Jordan,\n\nAttached is the October rent roll. Please don't forward it outside the office: it lists every tenant's balance.\n\nPriya", attachments: [{ name: "Rent Roll - October.xlsx", size: "48 KB" }] }),
    msg({ id: "m4", from: P.kim.email, subject: "Pest control visit, Riverside Commons", date: "2026-10-20T11:03", body: "FYI, the pest control company will spray the basement at Riverside Commons next Tuesday morning. No action needed from the office.\n\nKim" }),
    msg({ id: "m5", from: P.supply.email, subject: "30% off printer paper this week", date: "2026-10-21T06:30", category: "Promotions", unread: true, unsubscribe: true, body: "Stock up and save: 30% off copy paper, toner and file folders through Sunday." }),
    msg({ id: "m6", from: P.neighborly.email, subject: "3 neighbors posted near Elm Street", date: "2026-10-20T19:22", category: "Social", unread: true, body: "See what your neighbors are saying: a lost cat, a yard sale and a question about recycling day." }),
    msg({ id: "m7", from: P.water.email, subject: "Your October statement is ready", date: "2026-10-19T07:15", category: "Updates", body: "Your October water statement for account 55-1208 (Riverside Commons) is ready to view. Amount due: $412.60." }),
    msg({ id: "m8", from: P.tony.email, subject: "Invoice #4471 for Elm Street Apartments", date: "2026-10-19T14:50", body: "Hello,\n\nPlease find attached invoice #4471 for the kitchen sink repair at Elm Street Apartments, Unit 2B, completed October 16.\n\nTony Russo\nRusso Plumbing", attachments: [{ name: "Invoice 4471.pdf", size: "212 KB" }] }),
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
