import type { SimDefinition } from "@/types/sim";
import { msg } from "@/components/sim/apps/outlook/simkit";
import { DENISE, IT, KEISHA, LUIS, ME, NEWS, PATEL, lakeside, morningMail } from "./fixtures";

/* Module 1: Getting Started with Outlook (new Outlook for Windows). */

export const outlookModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::which-outlook": [
    {
      id: "ol-m1-which-outlook-1",
      app: "outlook-new",
      title: "Tour the new Outlook",
      scenario:
        "It is your first morning at the Lakeside Medical Associates front desk. Your computer opens the new Outlook for Windows. Before the phones start, Denise Carter, the office manager, asks you to find your way around: Calendar, People, To Do, Settings, and My Day.",
      fileName: "Inbox",
      minutes: 4,
      initial: lakeside(morningMail()),
      tasks: [
        {
          instruction: "Open the Calendar.",
          hint: "On the navigation bar at the far left, select Calendar.",
          steps: [{ action: { kind: "command", id: "nav.module", value: "Calendar" } }],
        },
        {
          instruction: "Open People to see the practice's contacts.",
          hint: "On the navigation bar at the far left, select People.",
          steps: [{ action: { kind: "command", id: "nav.module", value: "People" } }],
        },
        {
          instruction: "Open To Do.",
          hint: "On the navigation bar at the far left, select To Do.",
          steps: [{ action: { kind: "command", id: "nav.module", value: "To Do" } }],
        },
        {
          instruction: "Go back to your mail.",
          hint: "On the navigation bar, select Mail.",
          steps: [{ action: { kind: "command", id: "nav.module", value: "Mail" } }],
        },
        {
          instruction: "Open Outlook's settings.",
          hint: "Select the Settings button (the gear) at the top right of the window. In new Outlook you can also use View tab › View settings.",
          steps: [{ action: { kind: "command", id: "settings.open" } }],
        },
        {
          instruction: "Close Settings, then open My Day to see today's calendar and tasks next to your mail.",
          hint: "Close Settings with the X at its top right. Then select the My Day button (calendar with a check mark) at the top right of the window, next to Notifications.",
          steps: [{ action: { kind: "command", id: "view.myDay" } }],
        },
      ],
    },
  ],

  "module-1::outlook-window": [
    {
      id: "ol-m1-outlook-window-1",
      app: "outlook-new",
      title: "Set up the window for the front desk",
      scenario:
        "You share the front desk computer with Omar Haddad, who likes the reading pane at the bottom and the folder pane hidden. You prefer it the other way. Set the window up your way, then find two messages you will need this morning.",
      fileName: "Inbox",
      minutes: 5,
      initial: lakeside(morningMail(), { readingPane: "Bottom", folderPane: "Off" }),
      tasks: [
        {
          instruction: "Show the folder pane again.",
          hint: "Select the button with three lines at the left end of the Ribbon tab row (Show navigation pane). Or View tab › Folder pane › Show folder pane.",
          steps: [{ action: { kind: "command", id: "view.folderPane", value: "Normal" } }],
        },
        {
          instruction: "Show the reading pane on the right side of the window.",
          hint: "View tab › Layout › Show reading pane on the right.",
          steps: [{ action: { kind: "command", id: "view.readingPane", value: "Right" } }],
        },
        {
          instruction: "Open the Other tab of the Inbox, where newsletters and other less important mail go.",
          hint: "Above the message list, select Other.",
          steps: [{ action: { kind: "command", id: "mail.focusTab", value: "Other" } }],
        },
        {
          instruction: 'Use the Search box at the top of the window to find messages about "badge".',
          hint: "Click the Search box at the top center of the window, type badge, and press Enter.",
          steps: [{ action: { kind: "command", id: "mail.search", value: "badge" } }],
        },
        {
          instruction: "Leave search and go back to the Inbox.",
          hint: "Select the X at the right end of the Search box (or Exit search on the Search tab). Then select Inbox in the folder pane if needed.",
          steps: [{ action: { kind: "command", id: "search.close" }, alt: [{ kind: "command", id: "mail.folder", value: "Inbox" }] }],
        },
        {
          instruction: "Open the Junk Email folder to check that nothing important landed there.",
          hint: "In the folder pane, under your account, select Junk Email.",
          steps: [{ action: { kind: "command", id: "mail.folder", value: "Junk Email" } }],
        },
      ],
    },
  ],

  "module-1::reading-mail": [
    {
      id: "ol-m1-reading-mail-1",
      app: "outlook-new",
      title: "Work through the morning mail",
      scenario:
        "Seven messages are waiting. Some need action, some only need to be read, and one belongs in Focused. Read and sort them the way Denise asked: the Inbox holds only what still needs action.",
      fileName: "Inbox",
      minutes: 6,
      initial: lakeside(
        [
          ...morningMail().map((m) => (m.id === "m1" ? { ...m, read: true } : m.id === "m4" ? { ...m, other: false } : m)),
          msg("m8", LUIS, "Vaccine fridge temperature log", "Taylor, the vaccine fridge log for October is attached. No action needed; please keep it on file.\n\nLuis", "2026-10-19T09:10", { to: [ME], read: true, attachments: [{ name: "Fridge Log October.xlsx", size: "38 KB" }] }),
          msg("m9", NEWS, "Webinar replay: front desk scripts", "The replay of last week's webinar is now available.", "2026-10-16T06:00", { to: [ME], folder: "deleted", read: true, external: true }),
          msg("m10", DENISE, "Holiday schedule draft", "Here is the draft holiday schedule. Please look it over and tell me if your dates are right.\n\nDenise", "2026-10-15T12:00", { to: [ME], folder: "deleted", read: true }),
        ],
        { conversations: false },
      ),
      tasks: [
        {
          instruction: 'Mark the message "Front desk coverage this week" from Denise Carter as unread so it stays bold until you finish the task she gave you.',
          hint: "Select the message, then Home tab › Read / Unread (or right-click it › Mark as unread).",
          steps: [
            {
              action: { kind: "command", id: "mail.markUnread" },
              alt: [{ kind: "command", id: "mail.toggleRead" }],
              requires: { selection: "msg:m1" },
              selectHint: 'Select Denise Carter\'s message "Front desk coverage this week" first.',
            },
          ],
        },
        {
          instruction: 'The Healthcare Admin Weekly newsletter is in Focused. Move it to the Other inbox.',
          hint: "Right-click the newsletter › Move › Move to Other inbox.",
          steps: [
            {
              action: { kind: "command", id: "mail.moveToOther" },
              requires: { selection: "msg:m4" },
              selectHint: "Select the Healthcare Admin Weekly message first.",
            },
          ],
        },
        {
          instruction: 'The message "Vaccine fridge temperature log" needs no action, but the practice must keep it. Archive it.',
          hint: "Select the message, then Home tab › Archive (or right-click › Archive).",
          steps: [
            {
              action: { kind: "command", id: "mail.archive" },
              alt: [{ kind: "command", id: "mail.move", value: "Archive" }],
              requires: { selection: "msg:m8" },
              selectHint: 'Select Luis Ortega\'s message "Vaccine fridge temperature log" first.',
            },
          ],
        },
        {
          instruction: 'The IT notice "New badge readers on Monday" is no longer useful. Delete it.',
          hint: "Select the message, then Home tab › Delete (or press Delete, or point to it and select the trash can).",
          steps: [
            {
              action: { kind: "command", id: "item.delete" },
              requires: { selection: "msg:m6" },
              selectHint: 'Select the IT Help Desk message "New badge readers on Monday" first.',
            },
          ],
        },
        {
          instruction: 'Denise says you deleted "Holiday schedule draft" by mistake last week. Find it in Deleted Items and move it back to the Inbox.',
          hint: "Select Deleted Items in the folder pane, select the message, then Home tab › Move to › Inbox (or right-click › Move › Inbox, or drag it onto Inbox).",
          steps: [
            {
              action: { kind: "command", id: "mail.move", value: "Inbox" },
              requires: { selection: "msg:m10" },
              selectHint: 'Open Deleted Items and select Denise Carter\'s message "Holiday schedule draft".',
            },
          ],
        },
        {
          instruction: "Turn on conversation view so replies to the same message are grouped together.",
          hint: "Settings (gear, top right) › Mail › Reading pane › Message organization › Group messages by conversation › Save.",
          steps: [{ action: { kind: "dialog", id: "settings.conversations", values: { grouping: ["Group messages by conversation", "Group messages by branches within conversations"] } } }],
        },
      ],
    },
  ],
};

void IT;
void KEISHA;
void PATEL;
