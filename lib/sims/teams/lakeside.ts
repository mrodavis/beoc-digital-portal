import type { SimStep, SimValue } from "@/types/sim";
import { teamsDoc, typeAll, type TeamsDoc, type TeamsTeam } from "@/components/sim/apps/teams/types";

/*
 * Shared fixtures for the Microsoft Teams course: Lakeside Medical
 * Associates (fictional), the same staff as the OneDrive and Outlook
 * courses, and a work Teams account. Sims build on `lakeside({ ... })`.
 * No real patients: messages refer to "the 10:30 patient", never a name.
 */

export const TODAY = "2026-10-21";
export const DOMAIN = "lakesidemedical.example";

export const PEOPLE: TeamsDoc["people"] = [
  { id: "p-maria", name: "Maria Santos", title: "Office Manager", email: `msantos@${DOMAIN}`, presence: "Available" },
  { id: "p-shah", name: "Dr. Priya Shah", title: "Physician", email: `pshah@${DOMAIN}`, presence: "Busy" },
  { id: "p-kevin", name: "Kevin Patel", title: "Billing Specialist", email: `kpatel@${DOMAIN}`, presence: "Available" },
  { id: "p-tasha", name: "Tasha Greene", title: "Medical Assistant", email: `tgreene@${DOMAIN}`, presence: "Available" },
  { id: "p-luis", name: "Luis Ortega", title: "IT Coordinator", email: `lortega@${DOMAIN}`, presence: "Be right back" },
  { id: "p-renee", name: "Renee Walker", title: "Practice Administrator", email: `rwalker@${DOMAIN}`, presence: "Do not disturb" },
  { id: "p-omar", name: "Omar Haddad", title: "Front Desk Associate", email: `ohaddad@${DOMAIN}`, presence: "Available" },
  { id: "p-jen", name: "Jen Cole", title: "Temporary Receptionist", email: `jcole@${DOMAIN}`, presence: "Away" },
  { id: "p-marcus", name: "Marcus Bell", title: "Registered Nurse", email: `mbell@${DOMAIN}`, presence: "In a meeting" },
];

export const FRONT_OFFICE: TeamsTeam = {
  id: "t-front",
  name: "Front Office",
  color: "#0f6cbd",
  channels: [
    {
      id: "ch-fo-gen",
      name: "General",
      posts: [
        { id: "m-fo1", from: "p-maria", time: "Mon 8:02 AM", subject: "Welcome to the Front Office team", text: "This team is for the front desk, scheduling, and billing questions. Please keep patient details out of channels. Use the EHR for anything about a specific patient.", replies: [] },
      ],
    },
    {
      id: "ch-sched",
      name: "Scheduling",
      posts: [
        { id: "m-s1", from: "p-maria", time: "8:41 AM", text: "Dr. Shah is out Friday afternoon. Please move her 1:00 to 4:00 PM appointments to Monday or to Dr. Bell's open slots.", replies: [{ id: "m-s1r1", from: "p-omar", time: "8:55 AM", text: "I'll start on the 1:00 and 1:30 calls." }] },
        { id: "m-s2", from: "p-omar", time: "9:01 AM", text: "The new-patient intake packet is updated in the Shared tab. Let me know if anything is missing.", replies: [] },
      ],
    },
    {
      id: "ch-billing",
      name: "Billing Questions",
      posts: [{ id: "m-b1", from: "p-kevin", time: "Yesterday", text: "Reminder: copays are collected at check-in, not check-out. The copay quick reference is in the Shared tab.", replies: [] }],
    },
  ],
};

export const ALL_STAFF: TeamsTeam = {
  id: "t-staff",
  name: "Lakeside All Staff",
  color: "#8764b8",
  channels: [
    { id: "ch-all-gen", name: "General", posts: [{ id: "m-a1", from: "p-renee", time: "Oct 14", text: "Welcome to Lakeside All Staff. Announcements, safety updates, and staff events are posted here.", replies: [] }] },
    { id: "ch-safety", name: "Safety and Compliance", posts: [{ id: "m-c1", from: "p-renee", time: "Oct 16", subject: "Annual privacy training", text: "Annual privacy and security training is open in the learning portal. Complete it before your next review.", replies: [] }] },
    { id: "ch-events", name: "Staff Events", unread: true, posts: [{ id: "m-e1", from: "p-jen", time: "9:10 AM", text: "Potluck sign-up sheet is up! Bring a dish if you can.", replies: [] }] },
  ],
};

export const DISCOVER: TeamsTeam[] = [
  {
    id: "t-pec",
    name: "Patient Experience Committee",
    color: "#c239b3",
    description: "Ideas that make visits smoother: wait times, signage, reminders.",
    members: 9,
    channels: [
      { id: "ch-pec-gen", name: "General", posts: [{ id: "m-p1", from: "p-maria", time: "Oct 12", text: "Welcome! New members, please introduce yourself in a reply to this post.", replies: [{ id: "m-p1r1", from: "p-tasha", time: "Oct 13", text: "Hi all, Tasha from clinical. Glad to help with check-in ideas." }] }] },
      { id: "ch-pec-ideas", name: "Ideas", posts: [{ id: "m-p2", from: "p-omar", time: "Oct 15", text: "Could we text patients when the provider is running late?", replies: [] }] },
    ],
  },
  { id: "t-wellness", name: "Staff Wellness Club", color: "#13a10e", description: "Walking groups, healthy recipes, and stretch breaks.", members: 22, channels: [{ id: "ch-well-gen", name: "General", posts: [] }] },
];

export const DEVICES: TeamsDoc["devices"] = {
  speakers: ["Speakers (Realtek(R) Audio)", "Headset Earphone (Jabra Evolve2 40)"],
  microphones: ["Microphone Array (Realtek(R) Audio)", "Headset Microphone (Jabra Evolve2 40)"],
  cameras: ["Integrated Webcam"],
  speaker: "Speakers (Realtek(R) Audio)",
  microphone: "Microphone Array (Realtek(R) Audio)",
  camera: "Integrated Webcam",
  noise: "Auto",
};

/** The base Lakeside Teams account. Override any part with `extra`. */
export function lakeside(extra: Partial<TeamsDoc> = {}): TeamsDoc {
  return {
    org: "Lakeside Medical Associates",
    today: TODAY,
    now: "9:20 AM",
    me: { name: "Alex Morgan", title: "Front Office Assistant", email: `amorgan@${DOMAIN}`, presence: "Available" },
    people: PEOPLE,
    chats: [
      {
        id: "c-maria",
        members: ["p-maria"],
        messages: [
          { id: "m-ma1", from: "p-maria", time: "8:30 AM", text: "Good morning, Alex! Can you cover the check-in window from 12:00 to 1:00 today while Omar is at lunch?" },
          { id: "m-ma2", from: "me", time: "8:34 AM", text: "Yes, I can do that." },
        ],
      },
      { id: "c-tasha", members: ["p-tasha"], messages: [{ id: "m-ta1", from: "p-tasha", time: "Yesterday", text: "Thanks for restocking the intake clipboards!" }] },
      { id: "c-kevin", members: ["p-kevin"], messages: [{ id: "m-ke1", from: "p-kevin", time: "Mon", text: "The copay quick reference is updated in Billing Questions." }] },
      {
        id: "c-lunch",
        title: "Front Desk Lunch Orders",
        kind: "group",
        members: ["p-omar", "p-jen", "p-tasha"],
        messages: [{ id: "m-lu1", from: "p-jen", time: "9:12 AM", text: "Ordering sandwiches at 11:30. Reply with your order!" }],
      },
    ],
    teams: [FRONT_OFFICE, ALL_STAFF],
    files: [
      { id: "f-proc", name: "Front Desk Procedures.docx", folder: "root", modified: "Oct 14", modifiedBy: "Alex Morgan", sharing: "Private", preview: "1. Greet every patient within 30 seconds.\n2. Confirm the appointment and insurance.\n3. Collect the copay at check-in." },
      { id: "f-hire", name: "New Hire Checklist.docx", folder: "root", modified: "Oct 9", modifiedBy: "Alex Morgan", sharing: "Private", preview: "Badge, email account, Teams sign-in, EHR training, privacy training." },
      { id: "f-script", name: "Reminder Call Script.docx", folder: "root", modified: "Oct 2", modifiedBy: "Alex Morgan", sharing: "Private", preview: "Hello, this is Lakeside Medical Associates calling to confirm an appointment..." },
      { id: "teams-chat-files", name: "Microsoft Teams Chat Files", folder: "root", isFolder: true, modified: "Oct 20", modifiedBy: "Alex Morgan", sharing: "Private" },
      { id: "f-sched", name: "Provider Schedule - November.xlsx", folder: "ch:ch-sched", modified: "Yesterday", modifiedBy: "Maria Santos", preview: "Provider, Date, Morning, Afternoon, Notes" },
      { id: "f-intake", name: "New Patient Intake Packet.pdf", folder: "ch:ch-sched", modified: "Today", modifiedBy: "Omar Haddad", preview: "Welcome letter, registration form, privacy notice acknowledgment, insurance card copy." },
      { id: "f-copay", name: "Copay Quick Reference.pdf", folder: "ch:ch-billing", modified: "Mon", modifiedBy: "Kevin Patel", preview: "Collect copays at check-in. Accept card, cash, or check." },
      { id: "f-phones", name: "Front Desk Phone List.xlsx", folder: "ch:ch-fo-gen", modified: "Oct 1", modifiedBy: "Maria Santos" },
    ],
    localFiles: [
      { name: "Flu Clinic Flyer.pdf", size: "420 KB" },
      { name: "Holiday Coverage Schedule.xlsx", size: "31 KB" },
      { name: "Lobby Wait Times - October.xlsx", size: "18 KB" },
    ],
    activity: [{ id: "a2", kind: "reaction", from: "p-tasha", text: "Reacted to your message", where: "Chat with Tasha Greene", time: "Yesterday", target: "m-ta1" }],
    discover: DISCOVER,
    devices: DEVICES,
    av: { camera: true, mic: true },
    windows: ["Provider Schedule - November.xlsx - Excel", "Front Desk Procedures.docx - Word", "Microsoft Edge"],
    ...extra,
  };
}

/** Adds Maria's @mention post (m-s3) to the Scheduling channel, the target of activity a1. */
export function withMention(d: TeamsDoc): TeamsDoc {
  const teams = d.teams.map((t) =>
    t.id !== "t-front"
      ? t
      : {
          ...t,
          channels: t.channels.map((c) =>
            c.id !== "ch-sched" ? c : { ...c, unread: true, posts: [...c.posts, { id: "m-s3", from: "p-maria", time: "9:05 AM", text: "@Alex Morgan can you confirm you are covering the front desk Friday from 1:00 to 5:00 PM?", replies: [] }] },
          ),
        },
  );
  const activity = [{ id: "a1", kind: "mention" as const, from: "p-maria", text: "Mentioned you: Alex, can you confirm the Friday coverage?", where: "Front Office > Scheduling", time: "9:05 AM", target: "m-s3", unread: true }, ...(d.activity ?? [])];
  return { ...d, teams, activity };
}

export const doc = (d: TeamsDoc) => teamsDoc(d);

/* ------------------------------------------------------------------ */
/* Step helpers                                                        */
/* ------------------------------------------------------------------ */

export function cmd(id: string, value: SimValue | undefined, selection: string | string[], selectHint: string): SimStep {
  return { action: { kind: "command", id, ...(value !== undefined ? { value } : {}) }, requires: { selection }, selectHint };
}

export function select(target: string | string[]): SimStep {
  return { action: { kind: "select", target } };
}

export { typeAll };
