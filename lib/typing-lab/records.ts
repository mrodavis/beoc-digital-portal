/**
 * Fictional patient registration records for the data-entry drill, and the
 * rules used to check what the student typed. Names are common first and
 * last names put together at random; phone numbers use the fictional 555-01xx
 * range; plans and member IDs are made up.
 */
import { pick, rng } from "./rng";

export interface PatientRecord {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  plan: string;
  memberId: string;
  apptTime: string;
}

export type FieldName = keyof PatientRecord;

export interface FieldDef {
  name: FieldName;
  label: string;
  kind: "text" | "select";
  options?: string[];
  placeholder?: string;
  /** Columns out of 6 at desktop width. */
  span: 2 | 3 | 4 | 6;
  /** How the check compares the entry with the source. */
  rule: "exact" | "date" | "phone" | "address" | "digits" | "id" | "time";
}

export const PLANS = ["Brightwater Health Plan", "Harbor Point Health", "Kestrel Mutual Health", "Northpine Community Care", "Silverbay Insurance", "Self-pay (no insurance)"];
const PLAN_PREFIX: Record<string, string> = {
  "Brightwater Health Plan": "BWH",
  "Harbor Point Health": "HPH",
  "Kestrel Mutual Health": "KMH",
  "Northpine Community Care": "NPC",
  "Silverbay Insurance": "SBI",
};

export const STATES = ["CT", "NJ", "NY", "PA"];

export const FIELDS: FieldDef[] = [
  { name: "firstName", label: "First name", kind: "text", span: 3, rule: "exact" },
  { name: "lastName", label: "Last name", kind: "text", span: 3, rule: "exact" },
  { name: "dob", label: "Date of birth", kind: "text", span: 3, placeholder: "MM/DD/YYYY", rule: "date" },
  { name: "phone", label: "Phone", kind: "text", span: 3, placeholder: "(555) 555-5555", rule: "phone" },
  { name: "street", label: "Street address", kind: "text", span: 6, rule: "address" },
  { name: "city", label: "City", kind: "text", span: 2, rule: "exact" },
  { name: "state", label: "State", kind: "select", options: STATES, span: 2, rule: "exact" },
  { name: "zip", label: "ZIP code", kind: "text", span: 2, rule: "digits" },
  { name: "plan", label: "Insurance plan", kind: "select", options: PLANS, span: 3, rule: "exact" },
  { name: "memberId", label: "Member ID", kind: "text", span: 3, rule: "id" },
  { name: "apptTime", label: "Appointment time", kind: "text", span: 3, placeholder: "10:30 AM", rule: "time" },
];

const FIRST = ["Keisha", "Marcus", "Ana", "Darnell", "Priya", "Luis", "Grace", "Omar", "Fatima", "Kevin", "Rosa", "Andre", "Mei", "Jamal", "Sofia", "Tyrone", "Elena", "Samuel", "Aaliyah", "Victor", "Nadia", "Carlos", "Imani", "Dmitri", "Yesenia", "Wei", "Brianna", "Kwame", "Lucia", "Rahul"];
const LAST = ["Okafor-Bennett", "Thompson", "Rivera", "Nguyen", "Washington", "Patel", "Hernandez", "Kim", "Johnson", "Alvarez", "Chen", "Williams", "Mendez", "O'Brien", "Diallo", "Santiago", "Jackson", "Kowalski", "Ramirez", "Brown", "Haddad", "Lopez", "St. Louis", "Mbeki", "Castillo", "Greene", "Romero", "Park", "Dubois", "Singh"];
const STREETS = ["Linden Blvd", "Flatbush Ave", "Nostrand Ave", "Church Ave", "Atlantic Ave", "Bedford Ave", "Ocean Pkwy", "Kings Hwy", "Utica Ave", "Fulton St", "Eastern Pkwy", "Myrtle Ave", "Court St", "Rockaway Pkwy", "Clarendon Rd"];
const PLACES: [string, string, string][] = [
  ["Brooklyn", "NY", "11201"],
  ["Brooklyn", "NY", "11212"],
  ["Brooklyn", "NY", "11226"],
  ["Brooklyn", "NY", "11203"],
  ["Brooklyn", "NY", "11236"],
  ["Queens", "NY", "11373"],
  ["Queens", "NY", "11432"],
  ["Staten Island", "NY", "10301"],
  ["Jersey City", "NJ", "07306"],
  ["Yonkers", "NY", "10701"],
];
const TIMES = ["8:15 AM", "8:45 AM", "9:00 AM", "9:30 AM", "10:15 AM", "10:30 AM", "11:00 AM", "11:45 AM", "1:00 PM", "1:30 PM", "2:15 PM", "2:45 PM", "3:30 PM", "4:00 PM", "4:45 PM"];

function pad(n: number, w = 2) {
  return String(n).padStart(w, "0");
}

/** A round of fictional records. The same seed always gives the same records. */
export function makeRecords(seed: number, count = 5): PatientRecord[] {
  const r = rng(seed * 31 + 7);
  const out: PatientRecord[] = [];
  const usedNames = new Set<string>();
  while (out.length < count) {
    const firstName = pick(r, FIRST);
    const lastName = pick(r, LAST);
    if (usedNames.has(firstName + lastName)) continue;
    usedNames.add(firstName + lastName);
    const year = 1948 + Math.floor(r() * 58);
    const month = 1 + Math.floor(r() * 12);
    const day = 1 + Math.floor(r() * 28);
    const [city, state, zip] = pick(r, PLACES);
    const plan = r() < 0.12 ? PLANS[PLANS.length - 1] : pick(r, PLANS.slice(0, -1));
    const prefix = PLAN_PREFIX[plan];
    const memberId = prefix ? `${prefix}${Math.floor(100000000 + r() * 899999999)}` : "";
    const apt = r() < 0.4 ? `, Apt ${1 + Math.floor(r() * 6)}${pick(r, ["A", "B", "C", "D", "F", "R"])}` : "";
    out.push({
      firstName,
      lastName,
      dob: `${pad(month)}/${pad(day)}/${year}`,
      phone: `(${pick(r, ["718", "347", "929", "917", "646"])}) 555-${pad(100 + Math.floor(r() * 100), 4)}`,
      street: `${10 + Math.floor(r() * 2980)} ${pick(r, STREETS)}${apt}`,
      city,
      state,
      zip,
      plan,
      memberId,
      apptTime: pick(r, TIMES),
    });
  }
  return out;
}

const squash = (s: string) => s.replace(/\s+/g, " ").trim();

function normDate(s: string): string | null {
  const m = squash(s).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  return `${pad(Number(m[1]))}/${pad(Number(m[2]))}/${m[3]}`;
}

function normTime(s: string): string | null {
  const m = squash(s)
    .toUpperCase()
    .replace(/\./g, "")
    .match(/^0?(\d{1,2}):(\d{2}) ?(AM|PM)$/);
  if (!m) return null;
  return `${Number(m[1])}:${m[2]} ${m[3]}`;
}

function normAddress(s: string): string {
  return squash(s.replace(/[.,]/g, " ")).toLowerCase();
}

export interface FieldCheck {
  ok: boolean;
  /** Short, gentle note when it is wrong (or a format tip when it is right). */
  note?: string;
}

/** Compares one entry with the source value. */
export function checkField(def: FieldDef, expected: string, typed: string): FieldCheck {
  const t = squash(typed);
  if (!expected) return t ? { ok: false, note: "The source leaves this blank." } : { ok: true };
  if (!t) return { ok: false, note: "This field is empty." };
  switch (def.rule) {
    case "exact":
      if (t === expected) return { ok: true };
      if (t.toLowerCase() === expected.toLowerCase()) return { ok: false, note: "Check the capital letters." };
      return { ok: false };
    case "date": {
      const n = normDate(t);
      if (!n) return { ok: false, note: "Use the MM/DD/YYYY format." };
      return n === expected ? (t === expected ? { ok: true } : { ok: true, note: `Matches. This office writes it ${expected}.` }) : { ok: false, note: "Check each digit of the date." };
    }
    case "phone": {
      const d = t.replace(/\D/g, "");
      return d === expected.replace(/\D/g, "") ? { ok: true } : { ok: false, note: d.length !== 10 ? "A phone number has 10 digits." : "Check each digit." };
    }
    case "address":
      return normAddress(t) === normAddress(expected) ? { ok: true } : { ok: false };
    case "digits":
      return t === expected ? { ok: true } : { ok: false, note: "Check each digit." };
    case "id":
      if (t === expected) return { ok: true };
      if (t.toUpperCase() === expected.toUpperCase()) return { ok: true, note: "Matches. IDs are usually entered in capital letters." };
      return { ok: false, note: "Compare it with the card one character at a time." };
    case "time": {
      const n = normTime(t);
      if (!n) return { ok: false, note: "Use a time like 10:30 AM." };
      return n === normTime(expected) ? { ok: true } : { ok: false };
    }
  }
}
