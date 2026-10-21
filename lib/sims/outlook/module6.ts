import type { SimDefinition, SimStep } from "@/types/sim";
import type { OlFolder } from "@/components/sim/apps/outlook/types";
import { autoRepliesStep, mentions, msg, person, recipients } from "@/components/sim/apps/outlook/simkit";
import { DENISE, FRONTDESK, IMAGING, JAMES, KEISHA, MARIA, ME, NEWS, OMAR, PATEL, PRIYA, lakeside, morningMail } from "./fixtures";

/* Module 6: Working Smarter and Safely (new Outlook for Windows). */

const NEW_MAIL: Pick<SimStep, "action" | "alt"> = { action: { kind: "command", id: "mail.newEmail" }, alt: [{ kind: "command", id: "item.new" }] };
const SEND: SimStep = { action: { kind: "command", id: "compose.send" }, alt: [{ kind: "command", id: "compose.requestSend" }] };

/* ---------- shared mailbox ---------- */
const FD_FOLDERS: OlFolder[] = [
  { id: "fd-inbox", name: "Inbox", mailbox: FRONTDESK.email },
  { id: "fd-sent", name: "Sent Items", mailbox: FRONTDESK.email },
];
const FD_SHARED = [{ name: "Lakeside Front Desk", email: FRONTDESK.email }];

/* ---------- junk and phishing ---------- */
const FAKE_IT = person("Lakeside IT Support", "it-support@lakesidemed-help.example.net");
const PROMO = person("Deals Today", "offers@dealstoday.example.com");
const BLAST = person("MedSupply Blast", "promo@medsupplyblast.example.com");

const LABELS = ["Public", "General", "Confidential", "Highly Confidential"];

export const outlookModule6Sims: Record<string, SimDefinition[]> = {
  "module-6::automatic-replies": [
    {
      id: "ol-m6-automatic-replies-1",
      app: "outlook-new",
      title: "Automatic replies for a training trip",
      scenario:
        "You will be at a two-day certification class on Thursday and Friday. Coworkers need to know who covers the front desk, and outside offices need a polite answer that doesn't announce your absence to strangers.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside(morningMail().slice(0, 4)),
      tasks: [
        {
          instruction:
            'Turn on automatic replies from 10/22/2026 8:00 AM to 10/23/2026 5:00 PM with this message for people inside Lakeside: "I am at a training class and back on Monday, October 26. For front desk help, contact Omar Haddad."',
          hint: "Settings (gear) › Accounts › Automatic replies. Turn on automatic replies, check Send replies only during a time period, set the start and end, type the message, and select Save.",
          steps: [
            autoRepliesStep(
              { start: ["10/22/2026", "8:00 AM"], end: ["10/23/2026", "5:00 PM"], inside: "I am at a training class and back on Monday, October 26. For front desk help, contact Omar Haddad." },
              ["Send automatic replies", "Time range: 10/22/2026 8:00 AM to 10/23/2026 5:00 PM", "Omar Haddad"],
            ),
          ],
        },
        {
          instruction:
            'Denise asks you to answer outside senders too, but only people in your contacts. Add this outside message: "Thank you for your message. I will reply on Monday, October 26. For scheduling, please call (555) 010-2400."',
          hint: "Settings › Accounts › Automatic replies. Check Send replies outside your organization, check Send replies only to contacts, type the outside message, and select Save.",
          steps: [
            mentions("autoReplies", "Outside (My Contacts only): Thank you for your message. I will reply on Monday, October 26. For scheduling, please call (555) 010-2400.", ["Outside (My Contacts only)", "(555) 010-2400"]),
          ],
        },
        {
          instruction: "The class was moved to next month. Turn off automatic replies.",
          hint: "Settings › Accounts › Automatic replies. Turn off the Automatic replies switch and select Save.",
          steps: [mentions("autoReplies", "Do not send automatic replies", ["Do not send automatic replies"])],
        },
      ],
    },
    {
      id: "ol-m6-automatic-replies-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Set up an out-of-office reply",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: write and schedule automatic replies for a day off, with a separate message for outside senders. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 6,
      initial: lakeside(morningMail().slice(0, 3)),
      tasks: [
        {
          instruction:
            'Schedule automatic replies from 10/30/2026 8:00 AM to 10/30/2026 5:00 PM. Inside message: "I am out of the office on Friday, October 30. Please contact Priya Nair for help."',
          hint: "Settings › Accounts › Automatic replies › turn on › Send replies only during a time period › dates and times › message › Save.",
          steps: [
            autoRepliesStep(
              { start: ["10/30/2026", "8:00 AM"], end: ["10/30/2026", "5:00 PM"], inside: "I am out of the office on Friday, October 30. Please contact Priya Nair for help." },
              ["Send automatic replies", "Time range: 10/30/2026 8:00 AM to 10/30/2026 5:00 PM", "Priya Nair"],
            ),
          ],
        },
        {
          instruction:
            'Add an outside message for everyone outside Lakeside, not only your contacts: "Thank you for contacting Lakeside Medical Associates. I will reply on Monday, November 2. For appointments, call (555) 010-2400."',
          hint: "Check Send replies outside your organization, leave Send replies only to contacts unchecked, type the message, and Save.",
          steps: [
            mentions("autoReplies", "Outside (Anyone outside my organization): Thank you for contacting Lakeside Medical Associates. I will reply on Monday, November 2. For appointments, call (555) 010-2400.", [
              "Outside (Anyone outside my organization)",
              "(555) 010-2400",
            ]),
          ],
        },
        {
          instruction: "Send a test message to yourself with the subject \"Out of office test\" so you can see your own reply settings are saved.",
          hint: "New mail › To: your own address › subject › Send.",
          steps: [NEW_MAIL, { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } }, { action: { kind: "type", target: "compose.subject", value: "Out of office test" } }, SEND],
        },
      ],
    },
  ],

  "module-6::shared-mailboxes": [
    {
      id: "ol-m6-shared-mailboxes-1",
      app: "outlook-new",
      title: "Answer mail from the front desk mailbox",
      scenario:
        "Patients and partner offices write to frontdesk@lakesidemed.example.com, a shared mailbox the whole front desk team can open. You have permission to it, but it isn't in your folder pane yet. Patients should get replies from the front desk address, not your personal one.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside(
        [
          ...morningMail().slice(0, 3),
          msg("s1", MARIA, "Question about my appointment time", "Hello, can you tell me what time my appointment is on Thursday? Thank you, Maria Gonzalez", "2026-10-20T08:25", { to: [FRONTDESK], folder: "fd-inbox", external: true }),
          msg("s2", JAMES, "Parking at your office", "Is there parking near the office entrance?", "2026-10-20T07:50", { to: [FRONTDESK], folder: "fd-inbox", external: true }),
        ],
        { folders: FD_FOLDERS, shared: FD_SHARED },
      ),
      tasks: [
        {
          instruction: "Add the Lakeside Front Desk shared mailbox (frontdesk@lakesidemed.example.com) to your folder pane.",
          hint: "Right-click your account name (your email address at the top of the folder list) › Add shared folder or mailbox. Type frontdesk@lakesidemed.example.com and add it. It appears under Shared with me.",
          steps: [{ action: { kind: "dialog", id: "addShared", values: { email: [FRONTDESK.email, "Lakeside Front Desk"] } } }],
        },
        {
          instruction:
            'Open the shared Inbox and reply to Maria Gonzalez from the front desk address with: "Your appointment is at 10:30 AM on Thursday. Please arrive 15 minutes early."',
          hint: "Under Shared with me › Lakeside Front Desk › Inbox, select Maria's message and select Reply. If you don't see From, select Options › Show From. Choose frontdesk@lakesidemed.example.com in From, type the reply, and select Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:s1" }, selectHint: "Open Shared with me › Lakeside Front Desk › Inbox and select Maria's message first." },
            { action: { kind: "command", id: "compose.fromAddress", value: FRONTDESK.email } },
            mentions("compose.body", "Your appointment is at 10:30 AM on Thursday. Please arrive 15 minutes early.", ["10:30 AM", "15 minutes early"]),
            SEND,
          ],
        },
        {
          instruction:
            'Send a new message from the front desk mailbox to Riverside Imaging Scheduling (scheduling@riversideimaging.example.com) with the subject "Fax line down until noon".',
          hint: "New mail › Options › Show From (if From isn't showing) › From: frontdesk@lakesidemed.example.com › To › subject › Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "command", id: "compose.fromAddress", value: FRONTDESK.email } },
            { action: { kind: "type", target: "compose.to", value: recipients(IMAGING.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Fax line down until noon" } },
            SEND,
          ],
        },
      ],
    },
    {
      id: "ol-m6-shared-mailboxes-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Work in a shared mailbox",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: open the front desk shared mailbox, answer a question from the shared address, and file it. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 6,
      initial: lakeside(
        [
          ...morningMail().slice(0, 2),
          msg("s1", JAMES, "Parking at your office", "Is there parking near the office entrance?", "2026-10-20T07:50", { to: [FRONTDESK], folder: "fd-inbox", external: true }),
          msg("s2", MARIA, "Do you take walk-ins?", "Can I come in today without an appointment? Maria Gonzalez", "2026-10-20T08:40", { to: [FRONTDESK], folder: "fd-inbox", external: true }),
        ],
        { folders: FD_FOLDERS, shared: FD_SHARED },
      ),
      tasks: [
        {
          instruction: "Add the front desk shared mailbox, frontdesk@lakesidemed.example.com.",
          hint: "Right-click your account name in the folder pane › Add shared folder or mailbox › type the address and add it.",
          steps: [{ action: { kind: "dialog", id: "addShared", values: { email: [FRONTDESK.email, "Lakeside Front Desk"] } } }],
        },
        {
          instruction: 'Reply to James Whitfield\'s parking question from the front desk address: "Yes. Free parking is available in the lot next to the main entrance."',
          hint: "Shared with me › Lakeside Front Desk › Inbox › select the message › Reply › From: frontdesk@lakesidemed.example.com › type › Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:s1" }, selectHint: "Select James's message in the shared Inbox first." },
            { action: { kind: "command", id: "compose.fromAddress", value: FRONTDESK.email } },
            mentions("compose.body", "Yes. Free parking is available in the lot next to the main entrance.", ["parking"]),
            SEND,
          ],
        },
        {
          instruction: "Maria's walk-in question needs a phone call from a nurse. Flag it for follow-up tomorrow so the team sees it in the shared mailbox.",
          hint: "Select Maria's message in the shared Inbox › Home tab › the arrow next to Flag / Unflag › Tomorrow.",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Tomorrow" }, requires: { selection: "msg:s2" }, selectHint: "Select Maria's message in the shared Inbox first." }],
        },
      ],
    },
  ],

  "module-6::phishing-junk": [
    {
      id: "ol-m6-phishing-junk-1",
      app: "outlook-new",
      title: "Clean up suspicious and unwanted mail",
      scenario:
        "Monday's Inbox has a message that claims to be from IT and asks for your password, a flood of promotions, and an imaging confirmation that landed in Junk Email by mistake. Handle each one the safe way.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside([
        msg("m1", FAKE_IT, "Action required: your mailbox is full", "Your mailbox has exceeded its limit. Verify your password within 24 hours or your account will be closed: [Verify now](http://lakesidemed-help.example.net/verify)", "2026-10-20T08:50", { to: [ME], external: true }),
        msg("m2", PROMO, "You've been selected for a FREE gift card", "Claim your reward today. Limited time only!", "2026-10-20T08:10", { to: [ME], external: true }),
        msg("m3", BLAST, "Huge savings on exam gloves!!!", "Third message this week. Order now.", "2026-10-20T07:30", { to: [ME], external: true }),
        msg("m4", IMAGING, "Appointment confirmation: CT referral", "We have scheduled the referred patient for Friday at 1:15 PM.", "2026-10-19T16:40", { to: [ME], external: true, folder: "junk" }),
        msg("m5", DENISE, "Front desk coverage this week", "Thanks for covering the front desk inbox this week.", "2026-10-20T07:00", { to: [ME] }),
      ]),
      tasks: [
        {
          instruction: 'The "mailbox is full" message comes from an outside address that only looks like Lakeside\'s. Don\'t click the link. Report it as phishing.',
          hint: "Select the message, then Home tab › Report › Report phishing (or right-click it › Report › Report phishing).",
          steps: [{ action: { kind: "command", id: "home.report", value: "Report phishing" }, requires: { selection: "msg:m1" }, selectHint: 'Select "Action required: your mailbox is full" first.' }],
        },
        {
          instruction: 'Report the gift card promotion as junk.',
          hint: "Select the message › Report › Report junk.",
          steps: [{ action: { kind: "command", id: "home.report", value: "Report junk" }, requires: { selection: "msg:m2" }, selectHint: "Select the gift card message first." }],
        },
        {
          instruction: "MedSupply Blast keeps sending promotions. Block the sender (promo@medsupplyblast.example.com).",
          hint: "Settings › Mail › Junk email › Blocked senders: type the address, select Add, then Save. You can also select the message and choose Block sender from its right-click menu.",
          steps: [{ action: { kind: "command", id: "junk.blockAddress", value: BLAST.email }, alt: [{ kind: "command", id: "home.junk", value: "Block Sender" }] }],
        },
        {
          instruction: 'Riverside Imaging\'s CT confirmation went to Junk Email. Mark it as not junk so it goes back to the Inbox.',
          hint: "Open the Junk Email folder, select the message, and select Not junk (Home tab › Report, or the It's not junk link in the message).",
          steps: [{ action: { kind: "command", id: "home.junk", value: "Not Junk" }, requires: { selection: "msg:m4" }, selectHint: "Open Junk Email and select the Riverside Imaging message first." }],
        },
        {
          instruction: "Make sure Riverside Imaging (scheduling@riversideimaging.example.com) never goes to Junk again: add it to Safe senders.",
          hint: "Settings › Mail › Junk email › Safe senders and domains: type the address, select Add, then Save.",
          steps: [{ action: { kind: "command", id: "junk.safeAddress", value: IMAGING.email } }],
        },
      ],
    },
    {
      id: "ol-m6-phishing-junk-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Spot and report phishing",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: decide which messages are phishing, junk or real, and handle each one safely. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 6,
      initial: lakeside([
        msg("m1", person("Lakeside Payroll", "payroll@lakesidemed-pay.example.net"), "Update your direct deposit today", "Your direct deposit will stop unless you sign in and confirm your bank details: [Sign in](http://lakesidemed-pay.example.net/login)", "2026-10-20T09:00", { to: [ME], external: true }),
        msg("m2", NEWS, "This week: 5 ways to shorten patient wait times", "Healthcare Admin Weekly. Tips for front desk teams.", "2026-10-20T06:00", { to: [ME], external: true }),
        msg("m3", BLAST, "Last chance: glove sale", "Order now.", "2026-10-20T07:30", { to: [ME], external: true }),
        msg("m4", PATEL, "Flu clinic staffing", "Can you confirm staffing for Saturday?", "2026-10-19T17:10", { to: [ME], folder: "junk" }),
      ]),
      tasks: [
        {
          instruction: 'Report the "direct deposit" message as phishing.',
          hint: "Select it › Report › Report phishing.",
          steps: [{ action: { kind: "command", id: "home.report", value: "Report phishing" }, requires: { selection: "msg:m1" }, selectHint: "Select the direct deposit message first." }],
        },
        {
          instruction: "Block promo@medsupplyblast.example.com.",
          hint: "Settings › Mail › Junk email › Blocked senders › Add › Save.",
          steps: [{ action: { kind: "command", id: "junk.blockAddress", value: BLAST.email }, alt: [{ kind: "command", id: "home.junk", value: "Block Sender" }] }],
        },
        {
          instruction: "Dr. Patel's message went to Junk Email. Mark it as not junk.",
          hint: "Junk Email › select the message › Not junk.",
          steps: [{ action: { kind: "command", id: "home.junk", value: "Not Junk" }, requires: { selection: "msg:m4" }, selectHint: "Open Junk Email and select Dr. Patel's message first." }],
        },
      ],
    },
  ],

  "module-6::protect-accessible": [
    {
      id: "ol-m6-protect-accessible-1",
      app: "outlook-new",
      title: "Protect sensitive mail and make it accessible",
      scenario:
        "Keisha needs the October billing report, which lists patient account balances. Denise wants the new staff parking map sent to the front desk team, including Omar, who uses a screen reader. And Dr. Patel asked you to confirm she reads the schedule change.",
      fileName: "Inbox",
      minutes: 9,
      initial: lakeside(morningMail().slice(0, 3), {
        sensitivityLabels: LABELS,
        files: [
          { name: "Billing Report October.xlsx", size: "96 KB" },
          { name: "Staff parking map.png", size: "240 KB" },
          { name: "Flu Clinic Handout.pdf", size: "412 KB" },
        ],
      }),
      tasks: [
        {
          instruction:
            'Send Keisha the file "Billing Report October.xlsx" as an attachment with the subject "October billing report". Label it Confidential and encrypt it before you send.',
          hint: "New mail › Insert tab › Attach file › Browse this computer › the report. Message tab › Sensitivity › Confidential, and Options tab › Encrypt › Encrypt. Then To: Keisha, the subject, and Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "dialog", id: "attachFile", values: { file: "Billing Report October.xlsx" } } },
            { action: { kind: "command", id: "compose.sensitivity", value: "Confidential" } },
            { action: { kind: "command", id: "compose.encrypt", value: "Encrypt" } },
            { action: { kind: "type", target: "compose.to", value: recipients(KEISHA.email) } },
            { action: { kind: "type", target: "compose.subject", value: "October billing report" } },
            SEND,
          ],
        },
        {
          instruction:
            'Send the front desk team (Omar Haddad and Priya Nair) the picture "Staff parking map.png" with the subject "New staff parking". Add the alt text "Map of the staff lot: park in rows C and D and use the Elm Street door".',
          hint: "New mail › Insert tab › Pictures › Staff parking map.png. Then Options tab › Check accessibility, select Fix this next to the missing alternative text, type the description, and select OK. Then add Omar and Priya, the subject, and Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "dialog", id: "insertPicture", values: { file: "Staff parking map.png" } } },
            { action: { kind: "dialog", id: "altText", values: { name: "Staff parking map.png", text: "Map of the staff lot: park in rows C and D and use the Elm Street door" } } },
            { action: { kind: "type", target: "compose.to", value: recipients(OMAR.email, PRIYA.email) } },
            { action: { kind: "type", target: "compose.subject", value: "New staff parking" } },
            SEND,
          ],
        },
        {
          instruction: 'Send Dr. Patel a message with the subject "Clinic schedule change Friday" and request a read receipt.',
          hint: "New mail › Options tab › Request a read receipt. Then To: Dr. Patel, the subject, and Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "command", id: "options.readReceipt" } },
            { action: { kind: "type", target: "compose.to", value: recipients(PATEL.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Clinic schedule change Friday" } },
            SEND,
          ],
        },
      ],
    },
    {
      id: "ol-m6-protect-accessible-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Send a protected, accessible message",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: send one message that needs protection and one that needs alt text. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside(morningMail().slice(0, 2), {
        sensitivityLabels: LABELS,
        files: [
          { name: "Insurance Card Scans.pdf", size: "640 KB" },
          { name: "Front desk seating chart.png", size: "180 KB" },
        ],
      }),
      tasks: [
        {
          instruction: 'Send "Insurance Card Scans.pdf" to Keisha with the subject "Insurance card scans", labeled Confidential and encrypted with Do Not Forward.',
          hint: "New mail › Attach file › the PDF › Message tab › Sensitivity › Confidential › Options tab › Encrypt › Do Not Forward › To › subject › Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "dialog", id: "attachFile", values: { file: "Insurance Card Scans.pdf" } } },
            { action: { kind: "command", id: "compose.sensitivity", value: "Confidential" } },
            { action: { kind: "command", id: "compose.encrypt", value: "Do Not Forward" } },
            { action: { kind: "type", target: "compose.to", value: recipients(KEISHA.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Insurance card scans" } },
            SEND,
          ],
        },
        {
          instruction: 'Send Denise the picture "Front desk seating chart.png" with the alt text "Seating chart: Omar at window 1, Priya at window 2, Taylor at the phone desk" and the subject "Seating chart".',
          hint: "New mail › Insert › Pictures › the picture › Options › Check accessibility › Fix this › describe it › OK › To › subject › Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "dialog", id: "insertPicture", values: { file: "Front desk seating chart.png" } } },
            { action: { kind: "dialog", id: "altText", values: { name: "Front desk seating chart.png", text: "Seating chart: Omar at window 1, Priya at window 2, Taylor at the phone desk" } } },
            { action: { kind: "type", target: "compose.to", value: recipients(DENISE.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Seating chart" } },
            SEND,
          ],
        },
        {
          instruction: 'Send Dr. Patel a message with the subject "Vaccine fridge check moved to 4:00 PM", marked high importance, with a read receipt requested.',
          hint: "New mail › Options tab › High importance and Request a read receipt › To › subject › Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "command", id: "message.importanceHigh" }, alt: [{ kind: "command", id: "options.readReceipt" }] },
            { action: { kind: "command", id: "options.readReceipt" }, alt: [{ kind: "command", id: "message.importanceHigh" }] },
            { action: { kind: "type", target: "compose.to", value: recipients(PATEL.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Vaccine fridge check moved to 4:00 PM" } },
            SEND,
          ],
        },
      ],
    },
  ],

  "module-6::copilot-mobile": [
    {
      id: "ol-m6-copilot-mobile-1",
      app: "outlook-new",
      title: "Use Copilot, then check its work",
      scenario:
        "Lakeside has Microsoft 365 Copilot. A long thread about Saturday's flu clinic has eleven replies, and you need the decisions fast. Then you need a short, friendly reminder for the clinic staff. Copilot can help with both, but you are responsible for what you send.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside(
        [
          msg(
            "m1",
            DENISE,
            "RE: Saturday flu clinic plan (11 messages)",
            "Final plan after everyone's replies:\n\n- Doors open at 8:00 AM; staff arrive by 7:30 AM.\n- Luis and Priya give the vaccines; Omar runs check-in.\n- Taylor brings the sign-in sheets and handouts.\n- Dr. Patel is on call by phone.\n- Parking: staff use the Elm Street lot.\n\nDenise",
            "2026-10-20T08:45",
            {
              to: [ME, OMAR, PRIYA],
              summary:
                "Denise confirmed the flu clinic plan: staff arrive by 7:30 AM and doors open at 8:00 AM. Luis and Priya give vaccines, Omar runs check-in, and you bring the sign-in sheets and handouts. Dr. Patel is on call, and staff park in the Elm Street lot.",
            },
          ),
          ...morningMail().slice(1, 4),
        ],
        {
          copilot: true,
          copilotDraft:
            "Hi everyone,\n\nA quick reminder about Saturday's flu clinic: please arrive by 7:30 AM so we're ready when doors open at 8:00 AM. Staff parking is in the Elm Street lot.\n\nThank you for helping our patients stay healthy this season!\n\nTaylor",
        },
      ),
      tasks: [
        {
          instruction: 'Use Copilot to summarize the thread "RE: Saturday flu clinic plan".',
          hint: "Select the message, then select Summary by Copilot at the top of the message.",
          steps: [{ action: { kind: "command", id: "copilot.summarize" }, requires: { selection: "msg:m1" }, selectHint: "Select the flu clinic thread first." }],
        },
        {
          instruction:
            'Start a new message to Omar and Priya and use Draft with Copilot. Ask for a short, friendly reminder to arrive by 7:30 AM Saturday for the flu clinic, and keep the draft.',
          hint: "New mail › Message tab › Copilot › Draft with Copilot. Type a prompt that includes 7:30 AM and Saturday, select Generate, read the draft, and select Keep.",
          steps: [
            NEW_MAIL,
            {
              action: { kind: "type", target: "copilot.prompt", value: "Write a short, friendly reminder to arrive by 7:30 AM Saturday for the flu clinic", match: "includes" },
              alt: [{ kind: "type", target: "copilot.prompt", value: ["7:30", "Saturday"], match: "all" }],
            },
          ],
        },
        {
          instruction:
            'Check the draft against the thread, then add this line before you send: "Please bring your badge." Address it to Omar and Priya with the subject "Saturday flu clinic reminder" and send it.',
          hint: "Read the kept draft: the times and parking match Denise's plan. Click at the end of the draft text, type the new line, fill in To and the subject, and select Send.",
          steps: [
            { action: { kind: "type", target: "compose.to", value: recipients(OMAR.email, PRIYA.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Saturday flu clinic reminder" } },
            { action: { kind: "type", target: "compose.body", value: ["7:30 AM", "Please bring your badge."], match: "all" } },
            SEND,
          ],
        },
      ],
    },
  ],
};
