import type { SimDefinition } from "@/types/sim";
import { msg } from "@/components/sim/apps/outlook/simkit";
import { BRIGHT, DENISE, HILL, IMAGING, KEISHA, LAB, LUIS, ME, METRO, NEWS, OMAR, PATEL, PRIYA, lakeside } from "./fixtures";

/* Module 3: Organizing Your Inbox (new Outlook for Windows). */

const billingFolders = [
  { id: "f-insurance-and-billing", name: "Insurance & Billing", parent: "inbox" },
  { id: "f-newsletters", name: "Newsletters", parent: "inbox" },
];

export const outlookModule3Sims: Record<string, SimDefinition[]> = {
  "module-3::folders-archive": [
    {
      id: "ol-m3-folders-archive-1",
      app: "outlook-new",
      title: "Build folders for the front desk",
      scenario:
        "The front desk Inbox mixes referrals, insurance mail and newsletters. Denise asks you to set up a few folders so the Inbox only holds what still needs action, and to keep the most-used folder one click away.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside(
        [
          msg("m1", IMAGING, "Referral received: MRI for Dr. Patel's patient", "We received the referral and will call the patient to schedule.", "2026-10-20T08:50", { to: [ME], external: true }),
          msg("m2", METRO, "Claim 48213 processed", "Claim 48213 has been processed. See your remittance advice for details.", "2026-10-20T08:20", { to: [ME], external: true }),
          msg("m3", METRO, "Claim 48190 needs more information", "Claim 48190 is pending. Please send the referring physician's NPI.", "2026-10-19T15:10", { to: [ME], external: true }),
          msg("m4", NEWS, "October issue: front desk scripts that work", "Healthcare Admin Weekly, October issue.", "2026-10-19T06:00", { to: [ME], external: true, read: true }),
          msg("m5", DENISE, "Folders", "Taylor, please set up Referrals and a Metro Health Plan folder under Insurance & Billing. Denise", "2026-10-20T07:55", { to: [ME] }),
        ],
        { folders: billingFolders },
      ),
      tasks: [
        {
          instruction: 'Create a folder named "Referrals" inside the Inbox.',
          hint: "Right-click Inbox in the folder pane › Create new subfolder, type Referrals, and press Enter.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Referrals", parent: "Inbox" } } }],
        },
        {
          instruction: 'Create a folder named "Metro Health Plan" inside the "Insurance & Billing" folder.',
          hint: "Right-click Insurance & Billing › Create new subfolder, type Metro Health Plan, and press Enter.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Metro Health Plan", parent: "Insurance & Billing" } } }],
        },
        {
          instruction: 'Move Riverside Imaging\'s "Referral received: MRI for Dr. Patel\'s patient" to the Referrals folder.',
          hint: "Select the message, then Home tab › Move to › Referrals (or drag it onto Referrals, or right-click › Move).",
          steps: [{ action: { kind: "command", id: "mail.move", value: "Referrals" }, requires: { selection: "msg:m1" }, selectHint: "Select the Riverside Imaging message first." }],
        },
        {
          instruction: "Select both Metro Health Plan Claims messages at once and move them to the Metro Health Plan folder.",
          hint: "Click the first Metro message, hold Ctrl and click the second, then Home tab › Move to › Metro Health Plan (or drag them onto the folder).",
          steps: [
            {
              action: { kind: "command", id: "mail.move", value: "Metro Health Plan" },
              requires: { selection: ["msg:m2,msg:m3", "msg:m3,msg:m2"] },
              selectHint: "Select both Metro Health Plan Claims messages: click one, then Ctrl+click the other.",
            },
          ],
        },
        {
          instruction: "Add the Referrals folder to Favorites so it is always at the top of the folder pane.",
          hint: "Right-click Referrals in the folder pane › Add to Favorites.",
          steps: [{ action: { kind: "command", id: "folder.favorite", value: "f-referrals" } }],
        },
        {
          instruction: 'Archive the newsletter "October issue: front desk scripts that work".',
          hint: "Select the newsletter, then Home tab › Archive.",
          steps: [
            {
              action: { kind: "command", id: "mail.archive" },
              alt: [{ kind: "command", id: "mail.move", value: "Archive" }],
              requires: { selection: "msg:m4" },
              selectHint: "Select the Healthcare Admin Weekly newsletter first.",
            },
          ],
        },
      ],
    },
    {
      id: "ol-m3-folders-archive-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Build a front desk folder system",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: create three folders (one of them a subfolder), file a message, and add a folder to Favorites. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 5,
      initial: lakeside([
        msg("m1", METRO, "Claim 48213 processed", "Claim 48213 has been processed.", "2026-10-20T08:20", { to: [ME], external: true }),
        msg("m2", DENISE, "Patient question forwarded", "A patient asked about parking. Can you answer?", "2026-10-20T08:00", { to: [ME] }),
      ]),
      tasks: [
        {
          instruction: 'Create a top-level folder named "Insurance & Billing".',
          hint: "Right-click your email address in the folder pane › Create new folder (or select Create new folder at the bottom of the folder list), type the name, and press Enter.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Insurance & Billing", parent: ["taylor.brooks@lakesidemed.example.com", ""] } } }],
        },
        {
          instruction: 'Create a subfolder named "Metro Health Plan" inside "Insurance & Billing".',
          hint: "Right-click Insurance & Billing › Create new subfolder, type the name, and press Enter.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Metro Health Plan", parent: "Insurance & Billing" } } }],
        },
        {
          instruction: 'Create a folder named "Patient Inquiries" inside the Inbox.',
          hint: "Right-click Inbox › Create new subfolder, type the name, and press Enter.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Patient Inquiries", parent: "Inbox" } } }],
        },
        {
          instruction: 'Move "Claim 48213 processed" to the Metro Health Plan folder.',
          hint: "Select the message, then Home tab › Move to › Metro Health Plan (or drag it onto the folder).",
          steps: [{ action: { kind: "command", id: "mail.move", value: "Metro Health Plan" }, requires: { selection: "msg:m1" }, selectHint: "Select the Metro Health Plan Claims message first." }],
        },
        {
          instruction: "Add Patient Inquiries to Favorites.",
          hint: "Right-click Patient Inquiries › Add to Favorites.",
          steps: [{ action: { kind: "command", id: "folder.favorite", value: "f-patient-inquiries" } }],
        },
      ],
    },
  ],

  "module-3::categories-flags": [
    {
      id: "ol-m3-categories-flags-1",
      app: "outlook-new",
      title: "Tag, flag, pin, and snooze",
      scenario:
        "Some messages need a follow-up tomorrow, some belong to billing even though they stay in the Inbox, one procedure message should stay at the top, and one agenda isn't useful until next week.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside([
        msg("m1", KEISHA, "Copay questions from this morning", "Taylor, two patients asked about copays. Can you send them to me?", "2026-10-20T09:00", { to: [ME] }),
        msg("m2", METRO, "Prior authorization needed: imaging", "Prior authorization is required before the scheduled imaging can be covered. Please submit form PA-2.", "2026-10-20T08:40", { to: [ME], external: true }),
        msg("m3", DENISE, "Front desk procedures (keep this handy)", "Here is the updated front desk procedure list. Please keep it where you can find it every day.", "2026-10-20T08:10", { to: [ME] }),
        msg("m4", HILL, "Staff meeting agenda for next week", "Agenda for next week's staff meeting is below. Add items by Monday.", "2026-10-20T07:50", { to: [ME] }),
        msg("m5", LUIS, "Room 2 thermometer replaced", "FYI, the Room 2 thermometer was replaced this morning.", "2026-10-19T16:30", { to: [ME], read: true, flag: { label: "Today", due: "2026-10-19" } }),
        msg("m6", BRIGHT, "Invoice BP-20817", "Invoice BP-20817 for exam table paper and gloves is attached.", "2026-10-19T11:00", { to: [ME], external: true, read: true, attachments: [{ name: "Invoice BP-20817.pdf", size: "88 KB" }] }),
      ]),
      tasks: [
        {
          instruction: 'Create a new green category named "Billing" and apply it to Keisha\'s "Copay questions from this morning".',
          hint: "Select the message, then Home tab › Categorize › New category. Type Billing, choose Green, and select OK.",
          steps: [{ action: { kind: "dialog", id: "newCategory", values: { name: "Billing", color: "Green" } }, requires: { selection: "msg:m1" }, selectHint: "Select Keisha Grant's message first." }],
        },
        {
          instruction: 'Apply the Billing category to the BrightPath "Invoice BP-20817" message too.',
          hint: "Select the message, then Home tab › Categorize › Billing (or right-click › Categorize).",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Green Category" }, requires: { selection: "msg:m6" }, selectHint: "Select the BrightPath invoice message first." }],
        },
        {
          instruction: 'Flag "Prior authorization needed: imaging" for follow-up tomorrow.',
          hint: "Select the message, then Home tab › the arrow next to Flag / Unflag, and choose tomorrow (or right-click › Flag).",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Tomorrow" }, requires: { selection: "msg:m2" }, selectHint: "Select the Metro Health Plan message first." }],
        },
        {
          instruction: 'Pin Denise\'s "Front desk procedures (keep this handy)" so it stays at the top of the Inbox.',
          hint: "Select the message, then Home tab › Pin / Unpin (or point to it and select the pin).",
          steps: [{ action: { kind: "command", id: "mail.pin" }, requires: { selection: "msg:m3" }, selectHint: "Select Denise Carter's message first." }],
        },
        {
          instruction: 'Snooze "Staff meeting agenda for next week" so it comes back next week.',
          hint: "Select the message, then Home tab › Snooze › Next week (or right-click › Snooze).",
          steps: [{ action: { kind: "command", id: "mail.snooze", value: "Next week" }, requires: { selection: "msg:m4" }, selectHint: "Select Dr. Hill's agenda message first." }],
        },
        {
          instruction: 'You followed up on "Room 2 thermometer replaced". Mark its flag complete.',
          hint: "Select the message, then Home tab › the arrow next to Flag / Unflag, and mark the flag complete (or right-click › Flag).",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Mark Complete" }, requires: { selection: "msg:m5" }, selectHint: "Select Luis Ortega's message first." }],
        },
      ],
    },
  ],

  "module-3::rules-sweep": [
    {
      id: "ol-m3-rules-sweep-1",
      app: "outlook-new",
      title: "Let rules and Sweep do the filing",
      scenario:
        "Every week the same senders fill the Inbox: a newsletter, claim notices from Metro Health Plan, and BrightPath's daily promotions. Set up Outlook to file them for you.",
      fileName: "Inbox",
      minutes: 8,
      initial: lakeside(
        [
          msg("m1", NEWS, "This week: scheduling tips", "Healthcare Admin Weekly.", "2026-10-20T06:00", { to: [ME], external: true }),
          msg("m2", METRO, "Claim 48222 processed", "Claim 48222 has been processed.", "2026-10-20T08:10", { to: [ME], external: true }),
          msg("m3", BRIGHT, "Today only: 10% off gloves", "Promotion.", "2026-10-20T07:00", { to: [ME], external: true }),
          msg("m4", BRIGHT, "Yesterday's deal: exam table paper", "Promotion.", "2026-10-19T07:00", { to: [ME], external: true, read: true }),
          msg("m5", BRIGHT, "Weekend sale on masks", "Promotion.", "2026-10-17T07:00", { to: [ME], external: true, read: true }),
          msg("m6", NEWS, "Last week: billing basics", "Healthcare Admin Weekly.", "2026-10-13T06:00", { to: [ME], external: true, read: true }),
          msg("m7", PRIYA, "Room 4 is ready", "Room 4 is cleaned and ready for the 10:00 patient.", "2026-10-20T08:55", { to: [ME] }),
          msg("m8", METRO, "Claim 48190 pending", "Claim 48190 is pending more information.", "2026-10-19T15:00", { to: [ME], external: true, read: true }),
        ],
        { folders: billingFolders },
      ),
      tasks: [
        {
          instruction: "Create a rule from the Healthcare Admin Weekly newsletter that moves messages from that sender to the Newsletters folder.",
          hint: "Right-click the newsletter › Rules › Create rule (or Home tab › Rules › Create rule). Choose Newsletters and select OK.",
          steps: [{ action: { kind: "dialog", id: "createRuleQuick", values: { folder: "Newsletters" } }, requires: { selection: ["msg:m1", "msg:m6"] }, selectHint: "Select one of the Healthcare Admin Weekly messages first." }],
        },
        {
          instruction: 'The rule only files new messages. Run the "Healthcare Admin Weekly" rule now so the newsletters already in your Inbox move too.',
          hint: "Settings (gear) › Mail › Rules. Next to Healthcare Admin Weekly, select Run rule now (the play icon).",
          steps: [{ action: { kind: "command", id: "rules.run", value: "Healthcare Admin Weekly" } }],
        },
        {
          instruction:
            'In Settings, add a rule named "Metro claims" that moves messages from claims@metrohealthplan.example.com to the Insurance & Billing folder.',
          hint: "Settings › Mail › Rules › Add new rule. Name it Metro claims, condition From with the address, action Move to Insurance & Billing, then Save.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "newRule",
                values: { name: "Metro claims", condition: "From", conditionValue: ["claims@metrohealthplan.example.com", "Metro Health Plan Claims"], action: "Move to", actionValue: "Insurance & Billing" },
              },
            },
          ],
        },
        {
          instruction: 'Run the "Metro claims" rule now.',
          hint: "Settings › Mail › Rules › Run rule now next to Metro claims.",
          steps: [{ action: { kind: "command", id: "rules.run", value: "Metro claims" } }],
        },
        {
          instruction: "BrightPath sends a promotion every day. Use Sweep to keep only their latest message and move the rest to Deleted Items.",
          hint: "Close Settings. Select a BrightPath message, then Home tab › Sweep. Choose the option that keeps only the latest message, leave the rest going to Deleted Items, and select Sweep.",
          steps: [
            {
              action: { kind: "dialog", id: "sweep", values: { option: "Always keep the latest message and move the rest", folder: "Deleted Items" } },
              requires: { selection: ["msg:m3", "msg:m4", "msg:m5"] },
              selectHint: "Select one of the BrightPath Medical Supply messages first.",
            },
          ],
        },
      ],
    },
    {
      id: "ol-m3-rules-sweep-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Create and run a rule",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: create a rule for Metro Health Plan claim notices and run it on the messages already in your Inbox. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 4,
      initial: lakeside(
        [
          msg("m1", METRO, "Claim 48222 processed", "Claim 48222 has been processed.", "2026-10-20T08:10", { to: [ME], external: true }),
          msg("m2", METRO, "Claim 48190 pending", "Claim 48190 is pending more information.", "2026-10-19T15:00", { to: [ME], external: true, read: true }),
          msg("m3", PRIYA, "Room 4 is ready", "Room 4 is ready for the 10:00 patient.", "2026-10-20T08:55", { to: [ME] }),
        ],
        { folders: billingFolders },
      ),
      tasks: [
        {
          instruction: 'Add a rule named "Metro claims" that moves messages from claims@metrohealthplan.example.com to the Insurance & Billing folder.',
          hint: "Settings (gear) › Mail › Rules › Add new rule. Name it, add the condition From with the address, add the action Move to › Insurance & Billing, and select Save.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "newRule",
                values: { name: "Metro claims", condition: "From", conditionValue: ["claims@metrohealthplan.example.com", "Metro Health Plan Claims"], action: "Move to", actionValue: "Insurance & Billing" },
              },
            },
          ],
        },
        {
          instruction: 'Run the "Metro claims" rule on the messages already in your Inbox.',
          hint: "Settings › Mail › Rules › select Run rule now (the play icon) next to Metro claims.",
          steps: [{ action: { kind: "command", id: "rules.run", value: "Metro claims" } }],
        },
        {
          instruction: "Open the Insurance & Billing folder to check that both claim notices were filed.",
          hint: "Close Settings and select Insurance & Billing in the folder pane.",
          steps: [{ action: { kind: "command", id: "mail.folder", value: "Insurance & Billing" } }],
        },
      ],
    },
  ],

  "module-3::search-filter": [
    {
      id: "ol-m3-search-filter-1",
      app: "outlook-new",
      title: "Find it fast",
      scenario:
        "A patient calls about a claim, Keisha asks which messages from her you haven't answered, and Luis can't find the fridge log he sent weeks ago. All three answers are somewhere in your mailbox.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside(
        [
          msg("m1", KEISHA, "Copay list for October", "Here is the copay list.", "2026-10-20T08:30", { to: [ME], attachments: [{ name: "Copays October.xlsx", size: "22 KB" }] }),
          msg("m2", KEISHA, "Remittance question", "Do you know when the Metro remittance arrived?", "2026-10-19T14:00", { to: [ME] }),
          msg("m3", METRO, "Claim 48213 processed", "Claim 48213 has been processed.", "2026-10-19T09:00", { to: [ME], external: true, read: true }),
          msg("m4", OMAR, "Saturday checklist", "Checklist attached.", "2026-10-18T12:00", { to: [ME], read: true }),
          msg("m5", LUIS, "Vaccine fridge log September", "The September fridge log is attached for your records.", "2026-09-30T16:00", { to: [ME], folder: "archive", read: true, attachments: [{ name: "Fridge Log September.xlsx", size: "35 KB" }] }),
          msg("m6", PATEL, "Flu clinic staffing", "Can you confirm staffing for Saturday?", "2026-10-17T10:00", { to: [ME], read: true }),
        ],
        { folders: [{ id: "f-clinical-records", name: "Clinical Records", parent: "inbox" }] },
      ),
      tasks: [
        {
          instruction: 'A patient asks about claim 48213. Search your mailbox for "48213".',
          hint: "Click the Search box at the top of the window, type 48213, and press Enter.",
          steps: [{ action: { kind: "command", id: "mail.search", value: "48213" } }],
        },
        {
          instruction: 'Search for messages from Keisha that have an attachment, using the search operators "from:keisha hasattachment:yes".',
          hint: "In the Search box, type from:keisha hasattachment:yes and press Enter. (Or use the filter button at the right end of the Search box: From Keisha, check Has attachments, Search.)",
          steps: [{ action: { kind: "command", id: "mail.search", value: ["from:keisha hasattachment:yes", "hasattachment:yes from:keisha"] } }],
        },
        {
          instruction: 'Luis\'s fridge log was filed weeks ago. Search for "fridge log", then move the September log you find to the Clinical Records folder.',
          hint: "Search for fridge log. Select the result \"Vaccine fridge log September\", then Home tab › Move to › Clinical Records.",
          steps: [
            {
              action: { kind: "command", id: "mail.move", value: "Clinical Records" },
              requires: { selection: "msg:m5" },
              selectHint: "Search for fridge log and select \"Vaccine fridge log September\".",
            },
          ],
        },
        {
          instruction: "Leave search and go back to the Inbox.",
          hint: "Select the X at the right end of the Search box, or Exit search on the Search tab.",
          steps: [{ action: { kind: "command", id: "search.close" }, alt: [{ kind: "command", id: "mail.folder", value: "Inbox" }] }],
        },
        {
          instruction: "Filter the Inbox to show only unread messages.",
          hint: "Select Filter (the funnel at the top right of the message list) › Unread.",
          steps: [{ action: { kind: "command", id: "mail.filter", value: "Unread" } }],
        },
        {
          instruction: "Change the filter to show only messages that have files attached.",
          hint: "Filter › Has files.",
          steps: [{ action: { kind: "command", id: "mail.filter", value: "Has Attachments" } }],
        },
      ],
    },
  ],

  "module-3::quick-steps-focused": [
    {
      id: "ol-m3-quick-steps-focused-1",
      app: "outlook-new",
      title: "One click for repeated work",
      scenario:
        "Every billing message you finish gets the same treatment: mark it read and move it to Insurance & Billing. Make a quick step for that, then teach Focused Inbox which senders matter.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside(
        [
          msg("m1", KEISHA, "Copay list for October", "Here is the copay list.", "2026-10-20T08:30", { to: [ME] }),
          msg("m2", METRO, "Claim 48222 processed", "Claim 48222 has been processed.", "2026-10-20T08:10", { to: [ME], external: true }),
          msg("m3", NEWS, "This week: scheduling tips", "Healthcare Admin Weekly.", "2026-10-20T06:00", { to: [ME], external: true }),
          msg("m4", LAB, "Results portal maintenance", "The results portal will be down Sunday 1:00 AM to 3:00 AM.", "2026-10-19T17:00", { to: [ME], external: true, other: true }),
          msg("m5", DENISE, "Schedule change Thursday", "Dr. Hill's Thursday clinic starts at 9:30 AM.", "2026-10-19T15:00", { to: [ME] }),
        ],
        { folders: billingFolders, focused: false },
      ),
      tasks: [
        {
          instruction:
            'Create a quick step named "File to Billing" that moves a message to the Insurance & Billing folder and marks it as read.',
          hint: "Home tab › arrow next to Quick steps › Manage quick steps › New quick step. Name it, choose Move to folder › Insurance & Billing, select Add another action › Mark as read, then Save.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "quickStep",
                values: { name: "File to Billing", action1: "Move to folder", target1: "Insurance & Billing", action2: "Mark as read" },
              },
            },
          ],
        },
        {
          instruction: 'Use the "File to Billing" quick step on Metro\'s "Claim 48222 processed".',
          hint: "Close Settings. Select the message, then Home tab › Quick steps › File to Billing (or right-click › Quick steps).",
          steps: [{ action: { kind: "command", id: "home.quickStep", value: "File to Billing" }, requires: { selection: "msg:m2" }, selectHint: "Select the Metro Health Plan message first." }],
        },
        {
          instruction: "Turn on Focused Inbox.",
          hint: "Settings (gear) › Mail › Message list › check Sort messages into Focused and Other › Save.",
          steps: [{ action: { kind: "command", id: "settings.focusedInbox", value: "On" } }],
        },
        {
          instruction: "Healthcare Admin Weekly landed in Focused. Make Outlook always move that sender's mail to Other.",
          hint: "Close Settings. Right-click the newsletter › Move › Always move to Other inbox.",
          steps: [{ action: { kind: "command", id: "mail.alwaysOther" }, requires: { selection: "msg:m3" }, selectHint: "Select the Healthcare Admin Weekly newsletter first." }],
        },
        {
          instruction: "Open the Other tab and move Northside Lab Services' maintenance notice back to Focused, because lab notices matter to the front desk.",
          hint: "Select Other above the message list. Right-click the Northside Lab message › Move › Move to Focused inbox.",
          steps: [
            { action: { kind: "command", id: "mail.focusTab", value: "Other" } },
            { action: { kind: "command", id: "mail.moveToFocused" }, requires: { selection: "msg:m4" }, selectHint: "On the Other tab, select the Northside Lab Services message." },
          ],
        },
      ],
    },
  ],
};
