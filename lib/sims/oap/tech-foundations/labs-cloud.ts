import type { SimDefinition, SimStep } from "@/types/sim";
import { odDoc, type OdItem } from "@/components/sim/apps/onedrive/types";
import { teamsDoc, typeAll, type TeamsDoc } from "@/components/sim/apps/teams/types";
import { winDoc, type WebPage, type WinItem, type WinRoot } from "@/components/sim/apps/windows/types";

/**
 * Challenge Labs (role: "challenge") for Tech Foundations module 7 (Cloud
 * Storage & Collaboration), keyed "module-N::lesson-slug". Each lab mirrors
 * its lesson's Challenge steps, in order, for students on school computers
 * that block the sync app, Teams sign-in, or account settings. See
 * docs/SIMULATIONS.md, Challenge Labs.
 */

/* ------------------------------------------------------------------ */
/* Lakeside fixtures                                                   */
/* ------------------------------------------------------------------ */

const DOMAIN = "lakesidemedical.example";
const ME = { name: "Alex Morgan", email: `amorgan@${DOMAIN}`, title: "Front Office Assistant" };
const TASHA = { name: "Tasha Greene", email: `tgreene@${DOMAIN}`, title: "Medical Assistant" };
const MARIA = { name: "Maria Santos", email: `msantos@${DOMAIN}`, title: "Office Manager" };
const KEVIN = { name: "Kevin Patel", email: `kpatel@${DOMAIN}`, title: "Billing Specialist" };

const file = (id: string, name: string, parent: string, extra: Partial<OdItem> = {}): OdItem => ({
  id,
  name,
  kind: name.endsWith(".docx") ? "word" : name.endsWith(".xlsx") ? "excel" : name.endsWith(".pdf") ? "pdf" : "text",
  parent,
  modified: "October 14",
  modifiedBy: ME.email,
  size: "48 KB",
  version: "1.0",
  sync: "local",
  ...extra,
});
const folder = (id: string, name: string, parent: string, extra: Partial<OdItem> = {}): OdItem => ({ id, name, kind: "folder", parent, modified: "October 9", modifiedBy: ME.email, sync: "local", ...extra });

function odItems(): OdItem[] {
  return [
    folder("f-frontdesk", "Front Desk", "root"),
    file("fd-script", "Phone Script - New Patients.docx", "f-frontdesk", { sync: "cloud" }),
    file("fd-huddle", "Daily Huddle Notes.docx", "f-frontdesk", { modified: "Yesterday at 8:12 AM" }),
    folder("f-forms", "Patient Forms", "root", { sync: "cloud" }),
    file("forms-intake", "New Patient Intake Form.pdf", "f-forms", { sync: "cloud", size: "188 KB" }),
    file("root-schedule", "Staff Schedule - November.xlsx", "root", { modified: "October 20", sync: "always" }),
    file("root-phones", "Office Phone List.docx", "root", { modified: "October 7", sync: "cloud" }),
  ];
}

const od = (o: Record<string, unknown>) =>
  odDoc({
    surface: "web",
    account: "work",
    me: ME,
    org: { name: "Lakeside Medical Associates", domain: DOMAIN },
    people: [TASHA, MARIA, KEVIN],
    items: odItems(),
    view: { location: "root" },
    storage: { used: "21.4 GB", total: "1 TB", percent: 2 },
    ...o,
  } as Parameters<typeof odDoc>[0]);

const dlg = (id: string, values: Record<string, string | number | boolean>, extra: Omit<SimStep, "action"> = {}): SimStep => ({ action: { kind: "dialog", id, values }, ...extra });
const onItem = (item: string, id: string, values: Record<string, string | number | boolean>, selectHint: string): SimStep => ({ action: { kind: "dialog", id, values: { file: item, ...values } }, requires: { selection: `item:${item}` }, selectHint });

/* ------------------------------------------------------------------ */
/* Teams fixture                                                       */
/* ------------------------------------------------------------------ */

const TODAY = "2026-10-21";

function lakesideTeams(extra: Partial<TeamsDoc>): TeamsDoc {
  return {
    org: "Lakeside Medical Associates",
    today: TODAY,
    now: "10:02 AM",
    me: { name: ME.name, title: ME.title, email: ME.email, presence: "Available" },
    people: [
      { id: "p-tasha", name: "Tasha Greene", title: "Medical Assistant", presence: "Available" },
      { id: "p-maria", name: "Maria Santos", title: "Office Manager", presence: "Available" },
      { id: "p-kevin", name: "Kevin Patel", title: "Billing Specialist", presence: "Busy" },
    ],
    chats: [
      {
        id: "c-tasha",
        members: ["p-tasha"],
        messages: [{ id: "m-t1", from: "p-tasha", time: "9:40 AM", text: "Morning! Are we still short one person at check-in today?" }],
      },
    ],
    teams: [
      {
        id: "t-fd",
        name: "Lakeside Front Desk",
        color: "#0f6cbd",
        channels: [
          { id: "ch-gen", name: "General", posts: [{ id: "m-g1", from: "p-maria", time: "Mon 8:05 AM", text: "Welcome to the Front Desk team. Shared files are on each channel's Shared tab.", replies: [] }] },
          { id: "ch-fd", name: "Check-In", posts: [{ id: "m-c1", from: "p-maria", time: "8:47 AM", text: "Please put training guides here so new staff can find them.", replies: [] }] },
        ],
      },
    ],
    files: [{ id: "f-roster", name: "Check-In Roster.xlsx", folder: "ch:ch-fd", modified: "Today", modifiedBy: "Maria Santos" }],
    localFiles: [
      { name: "LMA_FileManagementGuide.docx", size: "64 KB" },
      { name: "Lunch Order.docx", size: "12 KB" },
    ],
    events: [
      { id: "e-test", title: "Front Desk Check-In Huddle", day: TODAY, start: "10:00 AM", end: "10:15 AM", organizer: "p-maria", attendees: ["me", "p-tasha"], participants: ["p-maria", "p-tasha"], unmuted: ["p-maria"], live: true, response: "Accepted" },
    ],
    devices: {
      speakers: ["Speakers (Realtek(R) Audio)", "Headphones (Jabra Evolve 20)"],
      microphones: ["Microphone Array (Realtek(R) Audio)", "Headset Microphone (Jabra Evolve 20)"],
      cameras: ["Integrated Webcam"],
      speaker: "Headphones (Jabra Evolve 20)",
      microphone: "Headset Microphone (Jabra Evolve 20)",
      camera: "Integrated Webcam",
      noise: "Auto",
    },
    av: { camera: false, mic: true },
    ...extra,
  };
}

/* ------------------------------------------------------------------ */
/* Windows fixture (cloud security)                                    */
/* ------------------------------------------------------------------ */

const W = (name: string, extra: Partial<WinItem> = {}): WinItem => ({ name, modified: "10/14/2026 10:12 AM", size: "48 KB", sync: "cloud", ...extra });

function winFs(onedrive: WinItem[]): WinRoot[] {
  return [
    { name: "Desktop", root: "desktop", folder: true, children: [{ name: "Microsoft Edge", app: "edge" }] },
    { name: "Documents", root: "documents", folder: true, children: [] },
    { name: "Downloads", root: "downloads", folder: true, children: [] },
    { name: "Pictures", root: "pictures", folder: true, children: [] },
    { name: "Music", root: "music", folder: true, children: [] },
    { name: "Videos", root: "videos", folder: true, children: [] },
    { name: "OneDrive", root: "onedrive", label: "OneDrive - Lakeside Medical Associates", folder: true, children: onedrive },
    { name: "Local Disk (C:)", root: "drive", folder: true, capacity: "476 GB", free: "289 GB", children: [] },
  ];
}

const SIGNIN_PAGES: Record<string, WebPage> = {
  "mysignins.microsoft.com/security-info": {
    title: "My Sign-Ins | Security info",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    nav: [
      { text: "Overview", href: "myaccount.microsoft.com" },
      { text: "Security info", href: "mysignins.microsoft.com/security-info" },
      { text: "Recent activity", href: "mysignins.microsoft.com/activity" },
    ],
    blocks: [
      { t: "h1", text: "Security info" },
      { t: "p", text: "These are the methods you use to sign in to your account or reset your password." },
      { t: "table", head: ["Method", "Detail", ""], rows: [["Password", "Last updated: 6 months ago", "Change"], ["Phone", "+1 (555) 010-0148", "Change"]] },
      { t: "link", text: "+ Add sign-in method", href: "mysignins.microsoft.com/security-info/add", button: true },
    ],
  },
  "mysignins.microsoft.com/security-info/add": {
    title: "My Sign-Ins | Add a method",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    blocks: [
      { t: "h1", text: "Add a method" },
      { t: "p", text: "Which method would you like to add?" },
      { t: "form", id: "add-method", title: "Add a sign-in method", fields: [{ name: "method", label: "Method", type: "select", options: ["Choose a method", "Authenticator app", "Phone", "Alternate email", "Security key"] }], submit: "Add", goto: "mysignins.microsoft.com/security-info/added" },
    ],
  },
  "mysignins.microsoft.com/security-info/added": {
    title: "My Sign-Ins | Security info",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    nav: [
      { text: "Overview", href: "myaccount.microsoft.com" },
      { text: "Security info", href: "mysignins.microsoft.com/security-info" },
      { text: "Recent activity", href: "mysignins.microsoft.com/activity" },
    ],
    blocks: [
      { t: "alert", tone: "ok", text: "Microsoft Authenticator was registered. You'll approve sign-ins with a notification on your phone." },
      { t: "table", head: ["Method", "Detail"], rows: [["Password", "Last updated: 6 months ago"], ["Phone", "+1 (555) 010-0148"], ["Microsoft Authenticator", "Push multi-factor authentication (MFA)"]] },
    ],
  },
  "myaccount.microsoft.com": {
    title: "My Account",
    site: "My Account",
    color: "#0f6cbd",
    nav: [
      { text: "Overview", href: "myaccount.microsoft.com" },
      { text: "Security info", href: "mysignins.microsoft.com/security-info" },
      { text: "Recent activity", href: "mysignins.microsoft.com/activity" },
    ],
    blocks: [
      { t: "h1", text: "Alex Morgan" },
      { t: "p", text: "amorgan@lakesidemedical.example · Lakeside Medical Associates" },
      { t: "link", text: "Review recent activity", href: "mysignins.microsoft.com/activity", button: true },
    ],
  },
  "mysignins.microsoft.com/activity": {
    title: "My Sign-Ins | Recent activity",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    nav: [
      { text: "Overview", href: "myaccount.microsoft.com" },
      { text: "Security info", href: "mysignins.microsoft.com/security-info" },
      { text: "Recent activity", href: "mysignins.microsoft.com/activity" },
    ],
    blocks: [
      { t: "h1", text: "Recent activity" },
      { t: "table", head: ["When", "Location", "App", "Result"], rows: [["Today 8:02 AM", "Brooklyn, New York, US", "OneDrive", "Successful"], ["Yesterday 2:14 AM", "Unknown location, overseas", "Office 365", "Successful"], ["Yesterday 8:10 AM", "Brooklyn, New York, US", "Outlook", "Successful"]] },
      { t: "p", text: "Don't recognize the overseas sign-in from yesterday at 2:14 AM?" },
      { t: "button", id: "not-me", text: "This wasn't me", style: "danger", toast: "Thanks. Change your password now and tell IT." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Labs                                                                */
/* ------------------------------------------------------------------ */

export const labsCloudSims: Record<string, SimDefinition[]> = {
  "module-7::cloud-storage-onedrive": [
    {
      id: "tf-m7-cloud-storage-onedrive-lab",
      app: "onedrive",
      role: "challenge",
      title: "Challenge Lab: Explore OneDrive sync",
      scenario:
        "Challenge Lab. Do this lesson's challenge on a practice PC at Lakeside Medical Associates: check sync status in File Explorer, create a practice folder and document, keep it on the device and then free up its space, and find it on the web.",
      fileName: "File Explorer",
      minutes: 6,
      initial: od({ surface: "explorer", pc: { name: "LMA-FRONT-02", location: "This PC", paused: null, backup: {} } }),
      tasks: [
        {
          instruction: "Open your OneDrive folder in File Explorer and look at the sync status icons in the Status column.",
          hint: "In the navigation pane, select OneDrive - Lakeside Medical Associates.",
          steps: [{ action: { kind: "command", id: "od.exp.nav", value: "onedrive" } }],
        },
        {
          instruction: "Create a folder named “LMA Cloud Practice” in your OneDrive.",
          hint: "Select New › Folder, type LMA Cloud Practice, and press Enter.",
          steps: [dlg("od.newFolder", { parent: "root", name: "LMA Cloud Practice" })],
        },
        {
          instruction: "Open LMA Cloud Practice and create a Word document named “CloudTest.docx” in it.",
          hint: "Double-click LMA Cloud Practice. Select New › Microsoft Word Document, type CloudTest, and press Enter.",
          steps: [{ action: { kind: "command", id: "od.exp.nav", value: "new1" } }, dlg("od.newFile", { folder: "new1", name: "CloudTest.docx" })],
        },
        {
          instruction: "Go back to your OneDrive folder and make LMA Cloud Practice always available on this device.",
          hint: "Select OneDrive - Lakeside Medical Associates, right-click LMA Cloud Practice › Always keep on this device.",
          steps: [onItem("new1", "od.keep", {}, "Right-click the LMA Cloud Practice folder.")],
        },
        {
          instruction: "Now free up the space LMA Cloud Practice uses.",
          hint: "Right-click LMA Cloud Practice › Free up space.",
          steps: [onItem("new1", "od.free", {}, "Right-click the LMA Cloud Practice folder.")],
        },
        {
          instruction: "Open LMA Cloud Practice in OneDrive on the web.",
          hint: "Right-click LMA Cloud Practice › View online.",
          steps: [{ action: { kind: "command", id: "od.go", value: "new1" } }],
        },
      ],
    },
  ],

  "module-7::sharing-collaborating": [
    {
      id: "tf-m7-sharing-collaborating-lab",
      app: "onedrive",
      role: "challenge",
      title: "Challenge Lab: Share, co-author, and remove access",
      scenario:
        "Challenge Lab. Do this lesson's challenge with a practice partner, Tasha Greene: share your CloudTest document view-only, give her edit access, work with her in the document, then remove her access.",
      fileName: "OneDrive",
      minutes: 6,
      initial: od({
        items: [
          ...odItems(),
          folder("f-practice", "LMA Cloud Practice", "root", { modified: "Today" }),
          file("cloudtest", "CloudTest.docx", "f-practice", {
            modified: "A few minutes ago",
            text: ["Cloud Test", "This document practices sharing in OneDrive.", "Tasha, please fix any typos you see."],
            coauthors: [{ email: TASHA.email, para: "p2" }],
            comments: [{ id: "c-tasha", para: "p3", author: TASHA.email, time: "Just now", text: "I fixed the typo in the second line. Anything else?" }],
          }),
        ],
        view: { location: "f-practice" },
      }),
      tasks: [
        {
          instruction: "Share “CloudTest.docx” with Tasha Greene so she can only view it.",
          hint: "Select CloudTest.docx › Share. Add Tasha Greene, choose Can view, then Invite.",
          steps: [onItem("cloudtest", "od.share", { people: TASHA.email, permission: "Can view" }, "Share CloudTest.docx.")],
        },
        {
          instruction: "Confirm the share in Shared › Shared by you.",
          hint: "Select Shared in the left pane, then Shared by you.",
          steps: [{ action: { kind: "command", id: "od.sharedTab", value: "by" } }],
        },
        {
          instruction: "In Manage access, change Tasha Greene's permission to Can edit.",
          hint: "Right-click CloudTest.docx › Manage access. Select Tasha's Can view and choose Can edit.",
          steps: [onItem("cloudtest", "od.access", { person: TASHA.email, permission: "Can edit" }, "Open Manage access for CloudTest.docx.")],
        },
        {
          instruction: "Open CloudTest.docx in Word for the web, where Tasha is now editing, and reply to her comment.",
          hint: "Select the file name CloudTest.docx. Select Comments, type a reply in Tasha's comment, and select Reply.",
          steps: [{ action: { kind: "command", id: "od.open", value: "cloudtest" } }, { action: { kind: "type", target: "reply:c-tasha", value: "", match: "includes" } }],
        },
        {
          instruction: "Return to OneDrive and remove Tasha Greene's access to CloudTest.docx.",
          hint: "Select the My files - OneDrive tab. Right-click CloudTest.docx › Manage access › Tasha's Can edit › Remove direct access › Remove.",
          steps: [onItem("cloudtest", "od.access", { person: TASHA.email, permission: "Remove direct access" }, "Open Manage access for CloudTest.docx.")],
        },
      ],
    },
  ],

  "module-7::teams-meetings": [
    {
      id: "tf-m7-teams-meetings-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Chat, files, and a test meeting in Teams",
      scenario:
        "Challenge Lab. School computers can't sign in to Teams, so do this lesson's challenge here: send a chat with an @mention, upload a file to a channel, schedule and join a test meeting after checking your camera and microphone, and blur your background.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: teamsDoc(lakesideTeams({ start: { view: "chat", conv: "c-tasha" } })),
      tasks: [
        {
          instruction: "In your chat with Tasha Greene, send a professional message that @mentions her and checks on a patient appointment.",
          hint: "In the chat with Tasha Greene, type @Tas and pick Tasha Greene, type your message about the appointment, and press Enter.",
          steps: [typeAll("chat:c-tasha", "@Tasha Greene can you confirm the 2:30 appointment for the patient in Room 3?", ["@Tasha Greene", "appointment"])],
        },
        {
          instruction: "Upload “LMA_FileManagementGuide.docx” to the Check-In channel's Shared tab.",
          hint: "In Chat, under Teams and channels, select Lakeside Front Desk › Check-In. Select the Shared tab › Upload › Files, choose LMA_FileManagementGuide.docx, and select Open.",
          steps: [{ action: { kind: "command", id: "files.upload", value: "LMA_FileManagementGuide.docx" }, requires: { selection: "files:ch-fd" }, selectHint: "Upload it on the Check-In channel's Shared tab." }],
        },
        {
          instruction: "Schedule a test Teams meeting titled “Teams Test Meeting” with Tasha Greene.",
          hint: "Select Calendar › New event. Type the title, add Tasha Greene, pick any time, and select Send.",
          steps: [typeAll("schedule", "Title: Teams Test Meeting\nAttendees: Tasha Greene\nDate: 10/22/2026\nStart: 9:00 AM\nEnd: 9:15 AM", ["title: teams test meeting", "tasha greene"])],
        },
        {
          instruction: "Open the live Front Desk Check-In Huddle from your calendar. On the pre-join screen, turn your camera on and your microphone off.",
          hint: "Calendar › Front Desk Check-In Huddle › Join. Turn on the camera switch under the preview and turn off the microphone switch.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "av.camera", value: "on" }, requires: { selection: "prejoin:e-test" }, selectHint: "Use the pre-join screen of the Front Desk Check-In Huddle." },
            { action: { kind: "command", id: "av.mic", value: "off" }, requires: { selection: "prejoin:e-test" }, selectHint: "Use the pre-join screen of the Front Desk Check-In Huddle." },
          ],
        },
        {
          instruction: "Join the meeting.",
          hint: "Select Join now.",
          steps: [{ action: { kind: "command", id: "meeting.joinNow" }, requires: { selection: "prejoin:e-test" }, selectHint: "Select Join now on the pre-join screen." }],
        },
        {
          instruction: "Blur your background from inside the meeting.",
          hint: "More (…) › Video effects and settings › Blur, then Apply.",
          steps: [{ action: { kind: "command", id: "av.background", value: "Blur" }, requires: { selection: "meeting:e-test" }, selectHint: "Change the background from inside the meeting." }],
        },
      ],
    },
  ],

  "module-7::cloud-security": [
    {
      id: "tf-m7-cloud-security-lab",
      app: "windows",
      role: "challenge",
      title: "Challenge Lab: Audit your cloud account security",
      scenario:
        "Challenge Lab. Do steps 1 to 3 of this lesson's challenge on a practice PC at Lakeside: check your sign-in methods and add the Authenticator app, review recent sign-ins, and fix risky sharing on three OneDrive files. Write the checklist in step 4 in Word as usual.",
      fileName: "Windows",
      minutes: 7,
      initial: winDoc({
        user: { name: ME.name, email: ME.email, org: "Lakeside Medical Associates" },
        web: SIGNIN_PAGES,
        fs: winFs([
          W("Staff Phone List.xlsx", { link: "anyone:edit" }),
          W("Supply Order Log.xlsx", { shared: [{ email: "orders@northwindsupply.example", name: "Northwind Medical Supply", perm: "edit" }] }),
          W("Holiday Coverage Plan.docx", { shared: [{ email: MARIA.email, name: MARIA.name, perm: "edit" }, { email: `jcole@${DOMAIN}`, name: "Jen Cole", perm: "edit" }] }),
          W("Flu Clinic Flyer.docx"),
        ]),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "In Edge, open your Security info page at “mysignins.microsoft.com/security-info” and review your sign-in methods.",
          hint: "Click the address bar, type mysignins.microsoft.com/security-info, and press Enter.",
          steps: [{ action: { kind: "command", id: "edge.nav", value: "mysignins.microsoft.com/security-info" } }],
        },
        {
          instruction: "Add the Authenticator app as a sign-in method.",
          hint: "Select + Add sign-in method, choose Authenticator app, then select Add.",
          steps: [{ action: { kind: "type", target: "form:add-method", value: "Method: Authenticator app", match: "includes" } }],
        },
        {
          instruction: "Open Recent activity and report the overseas sign-in you don't recognize.",
          hint: "Select Recent activity at the top of the page, then This wasn't me.",
          steps: [{ action: { kind: "click", target: "web:not-me" } }],
        },
        {
          instruction: "In File Explorer › OneDrive, remove the Anyone link from “Staff Phone List.xlsx”.",
          hint: "Open File Explorer, select OneDrive - Lakeside Medical Associates, right-click Staff Phone List (File Explorer hides the .xlsx extension) › Manage access, then select Remove link.",
          steps: [{ action: { kind: "command", id: "share.remove", value: "link" }, requires: { selection: "file:OneDrive/Staff Phone List.xlsx" }, selectHint: "Open Manage access for Staff Phone List.xlsx." }],
        },
        {
          instruction: "Change Northwind Medical Supply's access to “Supply Order Log.xlsx” from Can edit to Can view.",
          hint: "Right-click Supply Order Log.xlsx › Manage access. Change orders@northwindsupply.example to Can view.",
          steps: [{ action: { kind: "command", id: "share.perm", value: "orders@northwindsupply.example:view" }, requires: { selection: "file:OneDrive/Supply Order Log.xlsx" }, selectHint: "Open Manage access for Supply Order Log.xlsx." }],
        },
        {
          instruction: "Jen Cole's temporary assignment ended. Remove her access to “Holiday Coverage Plan.docx”.",
          hint: "Right-click Holiday Coverage Plan.docx › Manage access. Change Jen Cole's permission to Remove access.",
          steps: [{ action: { kind: "command", id: "share.remove", value: `jcole@${DOMAIN}` }, requires: { selection: "file:OneDrive/Holiday Coverage Plan.docx" }, selectHint: "Open Manage access for Holiday Coverage Plan.docx." }],
        },
      ],
    },
  ],
};
