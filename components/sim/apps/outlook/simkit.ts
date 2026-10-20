import type { SimStep } from "@/types/sim";
import type { OlMessage, OlPerson } from "./types";
import { joinTokens, serializeActivity, serializeAutoReplies, serializeSignatures } from "./model";
import { parseUsDate } from "./dates";

/**
 * Helpers for writing Outlook sims (lib/sims/oap/<course>/outlook.ts).
 *
 * `mentions` is the pattern for "write a reply that mentions X and Y": the
 * primary action is an exact sample (so the validator can replay it) and the
 * alt accepts any text that contains every piece (match "all").
 */

export const person = (name: string, email: string): OlPerson => ({ name, email });

export function msg(id: string, from: OlPerson, subject: string, body: string, date: string, extra: Partial<OlMessage> = {}): OlMessage {
  return { id, folder: "inbox", from, subject, body, date, read: false, ...extra };
}

/** Values accepted for "accept the meeting" (Send the Response Now, Edit the Response, Do Not Send). */
export const ACCEPT = ["Accept", "Accept (Edit)", "Accept (No Response)"];
export const TENTATIVE = ["Tentative", "Tentative (Edit)", "Tentative (No Response)"];
export const DECLINE = ["Decline", "Decline (Edit)", "Decline (No Response)"];

const cmd = (id: string) => ({ kind: "command" as const, id });

/**
 * Opener steps. Opening a form is free, and tasks run in order, so an opener
 * must list every way in (ribbon, New Items, Ctrl+N in the right module,
 * contact card buttons); otherwise a learner who takes another route is stuck.
 * An extra route that opens the wrong form is harmless: it is free.
 */
export const OPEN: Record<"email" | "meeting" | "appointment" | "task" | "contact" | "group", Pick<SimStep, "action" | "alt">> = {
  email: { action: cmd("mail.newEmail"), alt: [cmd("item.new"), cmd("contact.emailTo")] },
  meeting: { action: cmd("cal.newMeeting"), alt: [cmd("cal.newTeamsMeeting"), cmd("cal.newAppointment"), cmd("item.new"), cmd("contact.meetingWith")] },
  appointment: { action: cmd("cal.newAppointment"), alt: [cmd("item.new")] },
  task: { action: cmd("tasks.newTask"), alt: [cmd("item.new")] },
  contact: { action: cmd("people.newContact"), alt: [cmd("item.new")] },
  group: { action: cmd("people.newGroup") },
};

/** Canonical recipients value for compose.to / compose.cc / event.required … */
export const recipients = (...tokens: string[]) => joinTokens(tokens);

/** A typed field that must mention every piece. */
export function mentions(target: string, sample: string, pieces: string[]): Pick<SimStep, "action" | "alt"> {
  return { action: { kind: "type", target, value: sample, match: "includes" }, alt: [{ kind: "type", target, value: pieces, match: "all" }] };
}

/** Signatures dialog result: primary sample plus an "all pieces" alt. */
export function signaturesStep(sample: { sigs: { name: string; text: string }[]; defNew?: string; defReply?: string }, pieces: string[]): Pick<SimStep, "action" | "alt"> {
  return mentions("signatures", serializeSignatures(sample.sigs, sample.defNew, sample.defReply), pieces);
}

/** Automatic Replies result. Dates as M/D/YYYY, times as "8:00 AM". */
export function autoRepliesStep(
  sample: { start?: [string, string]; end?: [string, string]; inside: string; outside?: string; scope?: string },
  pieces: string[],
): Pick<SimStep, "action" | "alt"> {
  const iso = (d?: [string, string]) => {
    if (!d) return undefined;
    const date = parseUsDate(d[0])!;
    const m = /^(\d{1,2}):(\d{2}) ([AP]M)$/.exec(d[1])!;
    let h = +m[1] % 12;
    if (m[3] === "PM") h += 12;
    return `${date}T${String(h).padStart(2, "0")}:${m[2]}`;
  };
  return mentions(
    "autoReplies",
    serializeAutoReplies({ on: true, start: iso(sample.start), end: iso(sample.end), inside: sample.inside, outsideOn: Boolean(sample.outside), outsideScope: sample.scope, outside: sample.outside }),
    pieces,
  );
}

/** Log Activity result on a contact. */
export function activityStep(contactId: string, sample: { type: string; date: string; summary: string; next?: string; due?: string }, pieces: string[]): Pick<SimStep, "action" | "alt"> {
  return mentions(`contact:${contactId}.activity`, serializeActivity({ ...sample, date: parseUsDate(sample.date)!, due: sample.due ? parseUsDate(sample.due)! : undefined }), pieces);
}
