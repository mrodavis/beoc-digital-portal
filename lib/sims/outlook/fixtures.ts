import { outlookDoc } from "@/components/sim/apps/outlook/types";
import type { OlMessage, OutlookDoc } from "@/components/sim/apps/outlook/types";
import { msg, person } from "@/components/sim/apps/outlook/simkit";

/*
 * Lakeside Medical Associates: the house scenario for the Microsoft Outlook
 * course. Fictional people and example.com-style addresses only. The learner
 * is Taylor Brooks, front desk coordinator. Sims use the new Outlook for
 * Windows engine (app "outlook-new"); "today" is Tuesday, October 20, 2026.
 */

const D = "lakesidemed.example.com";
export const ME = person("Taylor Brooks", `taylor.brooks@${D}`);
export const DENISE = person("Denise Carter", `denise.carter@${D}`); // office manager
export const PATEL = person("Dr. Anita Patel", `anita.patel@${D}`);
export const HILL = person("Dr. Marcus Hill", `marcus.hill@${D}`);
export const LUIS = person("Luis Ortega", `luis.ortega@${D}`); // RN
export const KEISHA = person("Keisha Grant", `keisha.grant@${D}`); // billing
export const PRIYA = person("Priya Nair", `priya.nair@${D}`); // medical assistant
export const OMAR = person("Omar Haddad", `omar.haddad@${D}`); // front desk
export const IT = person("Lakeside IT Help Desk", `helpdesk@${D}`);
export const FRONTDESK = person("Lakeside Front Desk", `frontdesk@${D}`);
export const BILLING = person("Lakeside Billing", `billing@${D}`);

export const IMAGING = person("Riverside Imaging Scheduling", "scheduling@riversideimaging.example.com");
export const METRO = person("Metro Health Plan Claims", "claims@metrohealthplan.example.com");
export const BRIGHT = person("BrightPath Medical Supply", "orders@brightpathsupply.example.com");
export const NEWS = person("Healthcare Admin Weekly", "news@hcadminweekly.example.com");
export const LAB = person("Northside Lab Services", "results@northsidelab.example.com");
export const MARIA = person("Maria Gonzalez", "maria.gonzalez@example.net");
export const JAMES = person("James Whitfield", "james.whitfield@example.net");

export const STAFF = [DENISE, PATEL, HILL, LUIS, KEISHA, PRIYA, OMAR, IT, FRONTDESK, BILLING];

/** Starting mailbox for a new Outlook sim. */
export function lakeside(messages: OlMessage[], extra: Partial<OutlookDoc> = {}): Record<string, unknown> {
  return outlookDoc({
    account: ME,
    now: "2026-10-20T09:15",
    readingPane: "Right",
    focused: true,
    directory: [...STAFF],
    manager: DENISE,
    contacts: [
      { id: "c1", name: "Riverside Imaging Scheduling", email: IMAGING.email, company: "Riverside Imaging", phone: "(555) 014-2200" },
      { id: "c2", name: "Metro Health Plan Claims", email: METRO.email, company: "Metro Health Plan", phone: "(555) 018-7700" },
      { id: "c3", name: "BrightPath Medical Supply", email: BRIGHT.email, company: "BrightPath Medical Supply", phone: "(555) 012-3344" },
    ],
    messages,
    ...extra,
  });
}

/** A typical Monday-morning front desk inbox. */
export function morningMail(): OlMessage[] {
  return [
    msg("m1", DENISE, "Front desk coverage this week", "Hi Taylor,\n\nThanks for covering the front desk inbox this week. Please keep the Inbox for messages that still need action, and file the rest.\n\nDenise", "2026-10-20T08:40", { to: [ME] }),
    msg("m2", IMAGING, "Appointment confirmation: MRI referral", "Hello,\n\nWe have scheduled the referred patient for Thursday at 10:30 AM. Please confirm that your office received this message.\n\nRiverside Imaging Scheduling", "2026-10-20T08:12", { to: [ME], external: true }),
    msg("m3", PATEL, "Patient handout for flu clinic", "Taylor,\n\nThe flu clinic handout is attached. Please print 50 copies for Saturday.\n\nDr. Patel", "2026-10-20T07:55", { to: [ME], attachments: [{ name: "Flu Clinic Handout.pdf", size: "412 KB" }] }),
    msg("m4", NEWS, "This week: 5 ways to shorten patient wait times", "Healthcare Admin Weekly. Tips for front desk teams, plus a webinar on scheduling.", "2026-10-20T06:00", { to: [ME], other: true, external: true }),
    msg("m5", KEISHA, "Insurance card copies", "Hi Taylor, can you scan the insurance cards for this afternoon's new patients and send them to billing? Thanks, Keisha", "2026-10-19T16:20", { to: [ME], read: true }),
    msg("m6", IT, "New badge readers on Monday", "The badge readers at the staff entrance will be replaced on Monday. Use the side door until 9:00 AM.", "2026-10-19T14:05", { to: [ME], read: true }),
    msg("m7", BRIGHT, "Your order has shipped", "Order BP-20817 (exam table paper, nitrile gloves) has shipped and will arrive Wednesday.", "2026-10-19T11:30", { to: [ME], other: true, external: true, read: true }),
  ];
}
