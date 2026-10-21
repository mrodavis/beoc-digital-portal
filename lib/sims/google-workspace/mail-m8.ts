import type { ExcelCell, SimDefinition } from "@/types/sim";
import { gmailDoc, type GmCalendar, type GmDriveFile, type GmSpace } from "@/components/sim/apps/gmail/types";
import { googleDoc } from "@/components/sim/apps/google/types";
import { EMAIL, GW_ME, GW_ORG, GW_PEOPLE } from "./people";
import { P, baseMail, cmd, form, msg } from "./mail-data";

/**
 * Google Workspace, Module 8 (Working Together) sims. Google Chat and the
 * capstone run on the Gmail engine (app "gmail"); the shared tracker runs on
 * the Google engine (app "google"). Keys are "module-8::<lessonSlug>".
 */
const L = (n: string) => `module-8::${n}`;

/* ---------------- 8.1 Google Chat ---------------- */

const TEAM: GmSpace = {
  id: "s-team",
  name: "Riverside Commons Team",
  kind: "space",
  members: [P.denise.email, P.marcus.email, P.kim.email],
  messages: [
    { from: P.denise.email, text: "Reminder: the lobby repaint at Riverside Commons starts Monday. Tenants should use the side door that week.", time: "9:15 AM" },
    { from: P.kim.email, text: "I'll put signs on both doors Friday afternoon.", time: "9:21 AM" },
  ],
};
const PRIYA_DM: GmSpace = {
  id: "s-priya",
  name: "Priya Shah",
  kind: "dm",
  members: [P.priya.email],
  messages: [{ from: P.priya.email, text: "Thanks for sending the October rent roll!", time: "Yesterday" }],
};
const DRIVE: GmDriveFile[] = [
  { name: "Lobby Repaint Schedule", kind: "sheet", sharedWith: [P.denise.email] },
  { name: "Lobby Repaint Plan", kind: "doc", sharedWith: [P.denise.email] },
  { name: "Tenant Handbook", kind: "doc", sharedWith: [P.denise.email, P.marcus.email, P.kim.email, P.andre.email, P.priya.email] },
];

/* ---------------- 8.2 Shared tracker (Google engine) ---------------- */

type Cells = Record<string, ExcelCell>;
const COLS = "ABCDE";
function grid(rows: (string | number)[][]): Cells {
  const cells: Cells = {};
  rows.forEach((r, i) => r.forEach((v, c) => (cells[`${COLS[c]}${i + 1}`] = i === 0 ? { v, fmt: { bold: true } } : { v })));
  return cells;
}
const HEAD = ["Apartment", "Tenant", "Move-in date", "Deposit paid", "Walkthrough"];
const BEFORE = grid([HEAD, ["Elm 1C", "Kevin Tran", "11/1/2026", "Yes", "10/30/2026"], ["Elm 2C", "Tina Okafor", "11/2/2026", "Pending", "10/31/2026"], ["Elm 3A", "Nadia Brooks-Hale", "11/6/2026", "Yes", "11/4/2026"], ["Elm 4A", "Marisol Vega", "11/9/2026", "No", ""]]);
const CLEARED = grid([HEAD, ["Elm 1C", "Kevin Tran", "11/1/2026", "Yes", ""], ["Elm 2C", "Tina Okafor", "11/2/2026", "Pending", ""], ["Elm 3A", "Nadia Brooks-Hale", "11/6/2026", "Yes", ""], ["Elm 4A", "Marisol Vega", "11/9/2026", "No", ""]]);
const widths = { A: 90, B: 150, C: 110, D: 110, E: 110 };

/* ---------------- 8.3 Capstone ---------------- */

const CALS: GmCalendar[] = [{ id: "main", name: "Jordan Lee", color: "#039be5", mine: true }];

export const gwMailM8: Record<string, SimDefinition[]> = {
  [L("google-chat-and-spaces")]: [
    {
      id: "gw-m8-google-chat-and-spaces-1",
      app: "gmail",
      title: "Coordinate the lobby repaint in Google Chat",
      scenario:
        "The Riverside Commons lobby gets repainted next week. Quick questions and updates go in Google Chat instead of long email threads: a direct message to Kim, updates in the building's team space, the schedule shared in the space, and a new space for Elm Street move-ins.",
      fileName: "Google Chat",
      minutes: 8,
      initial: gmailDoc(baseMail({ spaces: [TEAM, PRIYA_DM], drive: DRIVE })),
      tasks: [
        { instruction: "Open Google Chat from Gmail.", hint: "On the far left of Gmail, select Chat.", steps: [cmd("app", "chat")] },
        {
          instruction: "Start a direct message with Kim Nguyen.",
          hint: "Select New chat (top left). Type Kim, pick Kim Nguyen, then select Start chat.",
          steps: [{ action: { kind: "type", target: "newdm", value: `People: ${P.kim.email}` } }],
        },
        {
          instruction: "Send Kim: “Can you check the lobby lights at Riverside Commons today?”",
          hint: "Type in the message box at the bottom and press Enter (or select Send message).",
          steps: [form("chat:dm1", "Can you check the lobby lights at Riverside Commons today?", ["lobby lights", "Riverside Commons"])],
        },
        {
          instruction: "Open the Riverside Commons Team space and react to Denise's reminder with a thumbs up.",
          hint: "Under Spaces, select Riverside Commons Team. Point to Denise's message, select Add reaction (smiley face), and choose 👍 Thumbs up.",
          steps: [cmd("chat.react", "s-team:0|👍")],
        },
        {
          instruction: "Andre Wallace isn't in the space yet. Post “@Andre Wallace the lobby repaint starts Monday. Please bring prospects in through the side door.” and add him to the space when Chat asks.",
          hint: "In the message box, type @And and pick Andre Wallace from the list, then type the rest and press Enter. In the box that opens, select Add member and send.",
          steps: [form("chat:s-team", `Message: @Andre Wallace the lobby repaint starts Monday. Please bring prospects in through the side door.\nAdd member: ${P.andre.email}`, ["Message: @Andre Wallace", "side door", `Add member: ${P.andre.email}`])],
        },
        {
          instruction: "Share the Drive file Lobby Repaint Schedule in the space with the message “Here's the repaint schedule.” Give the space members Viewer access.",
          hint: "Type Here's the repaint schedule. then @Lobby and pick Lobby Repaint Schedule under Files. Press Enter. Chat asks you to select the type of access: choose Viewer and select Send.",
          steps: [form("chat:s-team", "Message: Here's the repaint schedule.\nFile: Lobby Repaint Schedule\nFile access: Viewer", ["File: Lobby Repaint Schedule", "File access: Viewer"])],
        },
        {
          instruction: "Create a new space named “Elm Street Move-Ins”.",
          hint: "Select New chat › Create a space. Type the name and select Create.",
          steps: [{ action: { kind: "type", target: "newspace", value: "Space name: Elm Street Move-Ins" } }],
        },
        {
          instruction: "Add Andre Wallace and Priya Shah to the new space.",
          hint: "In the space, select Add people. Type Andre and pick him, type Priya and pick her, then select Add.",
          steps: [form("addpeople:sp2", `People: ${P.andre.email}; ${P.priya.email}`, [P.andre.email, P.priya.email])],
        },
      ],
    },
  ],

  [L("comments-and-tasks-in-shared-files")]: [
    {
      id: "gw-m8-comments-and-tasks-in-shared-files-1",
      app: "google",
      title: "Keep the move-in tracker on track",
      scenario:
        "The whole office edits the Elm Street move-in tracker. Priya left a question in a comment, and this morning someone cleared the Walkthrough column by mistake. Answer the comment, get the lost dates back from version history, assign the missing walkthrough to Kim, and mark the checked version.",
      fileName: "Move-In Tracker - Elm Street Apartments",
      minutes: 6,
      initial: googleDoc({
        me: GW_ME,
        org: GW_ORG,
        people: GW_PEOPLE,
        surface: "sheets",
        open: "f1",
        tabs: ["f1"],
        files: [
          {
            id: "f1",
            name: "Move-In Tracker - Elm Street Apartments",
            kind: "sheet",
            parent: "root",
            modified: "9:40 AM",
            modifiedBy: EMAIL.andre,
            sharing: { people: [{ email: EMAIL.denise, role: "Editor" }, { email: EMAIL.kim, role: "Editor" }, { email: EMAIL.priya, role: "Editor" }, { email: EMAIL.andre, role: "Editor" }] },
            content: { active: "Move-ins", sheets: [{ name: "Move-ins", cells: CLEARED, colWidths: widths }] },
            comments: [{ id: "c1", anchor: "D3", author: "Priya Shah", time: "8:52 AM Today", text: "Has Tina's deposit cleared? I don't see it in the bank yet." }],
            current: { time: "October 21, 9:40 AM", author: "Andre Wallace" },
            versions: [{ id: "v1", time: "October 20, 4:10 PM", author: "Jordan Lee", content: { active: "Move-ins", sheets: [{ name: "Move-ins", cells: BEFORE, colWidths: widths }] } }],
          },
        ],
      }),
      tasks: [
        {
          instruction: "Reply to Priya's comment on Tina's deposit (cell D3): “Yes, it cleared this morning.”",
          hint: "Click cell D3 (it has a yellow corner) to open the comment. Type in the Reply box and press Enter.",
          steps: [form("reply:c1", "Yes, it cleared this morning.", ["cleared"])],
        },
        {
          instruction: "Resolve Priya's comment.",
          hint: "On the comment, select the check mark (Mark as done and hide discussion).",
          steps: [cmd("g.comment.resolve", "c1")],
        },
        {
          instruction: "The Walkthrough dates were cleared by mistake at 9:40 AM. Open version history and restore the version from October 20, 4:10 PM.",
          hint: "File › Version history › See version history (or the clock icon at the top right). Select October 20, 4:10 PM, then Restore this version › Restore.",
          steps: [{ action: { kind: "command", id: "g.version.restore", value: "v1" }, alt: [{ kind: "command", id: "g.version.restore", value: "ver:v1" }] }],
        },
        {
          instruction: "Marisol Vega in Elm 4A still has no walkthrough. Comment on cell E5 with “@Kim Nguyen please schedule the walkthrough for Elm 4A.” and assign it to Kim.",
          hint: "Click cell E5, then Insert › Comment (or Ctrl+Alt+M). Type @Kim and pick Kim Nguyen, finish the comment, check Assign to Kim Nguyen, and select Assign.",
          steps: [{ ...form(`assign:${EMAIL.kim}`, "@Kim Nguyen please schedule the walkthrough for Elm 4A.", ["walkthrough", "4A"]), requires: { selection: "E5" }, selectHint: "Click cell E5 first, so the comment is attached to it." }],
        },
        {
          instruction: "Name the current version “Checked by office” so it's easy to find later.",
          hint: "File › Version history › Name current version. Type Checked by office and select Save.",
          steps: [{ action: { kind: "dialog", id: "g.nameVersion", values: { name: "Checked by office" } }, alt: [{ kind: "type", target: "vername:current", value: "Checked by office" }] }],
        },
      ],
    },
  ],

  [L("run-a-team-project")]: [
    {
      id: "gw-m8-run-a-team-project-1",
      app: "gmail",
      title: "Kick off the lobby repaint project",
      scenario:
        "Denise asks you to coordinate the Riverside Commons lobby repaint. Use each tool for what it does best: a short email reply to Denise, a Chat space for the team's day-to-day talk, the plan shared as a Drive file, and a kickoff call on the calendar with Google Meet.",
      fileName: "Gmail",
      minutes: 8,
      initial: gmailDoc(
        baseMail({
          messages: [
            msg({ id: "d1", from: P.denise.email, subject: "Lobby repaint: can you coordinate?", date: "2026-10-21T09:48", unread: true, important: true, body: "Hi Jordan,\n\nThe Riverside Commons lobby repaint starts next week. Can you coordinate it with Kim and Marcus? Please set up a Chat space for the three of you, share the Lobby Repaint Plan so they can comment on it, and put a short kickoff call on everyone's calendar for Thursday morning.\n\nThanks,\nDenise" }),
            ...baseMail().messages.filter((m) => m.id !== "m1"),
          ],
          drive: DRIVE,
          spaces: [TEAM],
          calendars: CALS,
          events: [{ id: "c1", title: "Lunch", day: "2026-10-21", start: "12:00", end: "13:00", calendar: "main" }],
        }),
      ),
      tasks: [
        { instruction: "Open Denise's message “Lobby repaint: can you coordinate?”", hint: "Select the message in the inbox.", steps: [cmd("gm.open", "d1")] },
        {
          instruction: "Reply to Denise only: “I'm on it. I'll set up the space and the kickoff call today.”",
          hint: "Below the message, select Reply. Type the text and select Send.",
          steps: [form("send:reply:d1", `To: ${P.denise.email}\nSubject: Re: Lobby repaint: can you coordinate?\nSend: Now\nBody: I'm on it. I'll set up the space and the kickoff call today.`, [`To: ${P.denise.email}`, "kickoff call"])],
        },
        {
          instruction: "In Google Chat, create a space named “Lobby Repaint”.",
          hint: "Select Chat on the far left › New chat › Create a space. Type the name and select Create.",
          steps: [{ action: { kind: "type", target: "newspace", value: "Space name: Lobby Repaint" } }],
        },
        {
          instruction: "Add Kim Nguyen and Marcus Reyes to the space.",
          hint: "In the space, select Add people. Pick Kim and Marcus, then select Add.",
          steps: [form("addpeople:sp2", `People: ${P.kim.email}; ${P.marcus.email}`, [P.kim.email, P.marcus.email])],
        },
        {
          instruction: "Share the Drive file Lobby Repaint Plan in the space with “Please comment on the plan by Wednesday.” Give the members Commenter access.",
          hint: "Type the message, then @Lobby and pick Lobby Repaint Plan under Files. Press Enter, choose Commenter, and select Send.",
          steps: [form("chat:sp2", "Message: Please comment on the plan by Wednesday.\nFile: Lobby Repaint Plan\nFile access: Commenter", ["File: Lobby Repaint Plan", "File access: Commenter"])],
        },
        {
          instruction: "In Google Calendar, create “Lobby repaint kickoff” on Thursday, October 22, from 10:00 to 10:30 AM. Invite Kim Nguyen and Marcus Reyes, add Google Meet video conferencing, save, and send the invitations.",
          hint: "Open Calendar (right side panel, or Google apps › Calendar). Create › Event › title › set Oct 22, 10:00 to 10:30 AM › More options › add Kim and Marcus under Guests › Add Google Meet video conferencing › Save › Send.",
          steps: [
            form(
              "event:new",
              `Title: Lobby repaint kickoff\nDate: Thu, Oct 22, 2026\nStart: 10:00 AM\nEnd: 10:30 AM\nAll day: no\nRepeat: Does not repeat\nGuest: ${P.kim.email}\nGuest: ${P.marcus.email}\nGoogle Meet: yes\nNotification: 30 minutes before\nCalendar: Jordan Lee\nGuests can: see guest list\nInvitations: Send\nDescription: `,
              ["Title: Lobby repaint kickoff", "Date: Thu, Oct 22, 2026", "Start: 10:00 AM", "End: 10:30 AM", `Guest: ${P.kim.email}`, `Guest: ${P.marcus.email}`, "Google Meet: yes", "Invitations: Send"],
            ),
          ],
        },
      ],
    },
  ],
};
