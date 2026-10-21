import type { SimDefinition, SimStep } from "@/types/sim";
import { autoRepliesStep, msg, person, recipients, signaturesStep } from "@/components/sim/apps/outlook/simkit";
import { DENISE, KEISHA, METRO, NEWS, OMAR, PATEL, lakeside } from "@/lib/sims/outlook/fixtures";

/**
 * Challenge Labs (role: "challenge") for Tech Foundations module 4 (email),
 * keyed "module-4::lesson-slug". Each lab mirrors its lesson's Challenge
 * steps, in order, for students on school computers without a real mailbox.
 * New Outlook for Windows ("outlook-new"); Lakeside Medical Associates
 * scenario; fictional people and example.com addresses only.
 */

const ME = person("Jordan Rivera", "jordan.rivera@lakesidemed.example.com");
const REYES = person("Carlos Reyes", "carlos.reyes@example.net");
const CLAIMS = METRO; // claims@metrohealthplan.example.com
const VENDOR = person("BrightPath Medical Supply", "orders@brightpathsupply.example.com");
const CLINICAL = person("Lakeside Clinical Staff", "clinical@lakesidemed.example.com");
const RIVERSIDE = person("Riverside Family Practice", "records@riversidefamily.example.com");

const NEW_MAIL: Pick<SimStep, "action" | "alt"> = { action: { kind: "command", id: "mail.newEmail" }, alt: [{ kind: "command", id: "item.new" }] };
const SEND: SimStep = { action: { kind: "command", id: "compose.send" }, alt: [{ kind: "command", id: "compose.requestSend" }] };
const subjectHas = (...pieces: string[]): SimStep => ({ action: { kind: "type", target: "compose.subject", value: pieces, match: "all" } });
const bodyHas = (...pieces: string[]): SimStep => ({ action: { kind: "type", target: "compose.body", value: pieces, match: "all" } });
const root = (name: string): SimStep => ({ action: { kind: "dialog", id: "newFolder", values: { name, parent: [ME.email, ""] } } });

/** The Jordan Rivera mailbox at Lakeside (the Tech Foundations office assistant). */
const box = (messages: Parameters<typeof lakeside>[0], extra: Parameters<typeof lakeside>[1] = {}) =>
  lakeside(messages, { account: ME, directory: [DENISE, PATEL, KEISHA, OMAR, CLINICAL], ...extra });

export const labsEmailSims: Record<string, SimDefinition[]> = {
  "module-4::email-fundamentals": [
    {
      id: "tf-m4-email-fundamentals-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Set up your professional mailbox",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: create your signature, build four folders, and send yourself a test message. When you finish, enter your name and print or save your results page to submit with your paragraph.",
      fileName: "Inbox",
      minutes: 9,
      initial: box([msg("m1", DENISE, "Welcome to Lakeside", "Hi Jordan,\n\nWelcome! Please set up your signature and folders today.\n\nDenise", "2026-10-20T08:00", { to: [ME] })]),
      tasks: [
        {
          instruction:
            'Create a signature named "Standard" with your full name, "Office Assistant", "Lakeside Medical Associates", "(555) 010-2400", and the notice "This email may contain confidential information. If you are not the intended recipient, please notify the sender and delete it." Use it for new messages.',
          hint: "Settings (gear) › Accounts › Signatures › Add signature. Name it Standard, type each part on its own line, check Add this signature to new messages, and select Save.",
          steps: [
            signaturesStep(
              {
                sigs: [
                  {
                    name: "Standard",
                    text: "Jordan Rivera | Office Assistant | Lakeside Medical Associates | (555) 010-2400 | This email may contain confidential information. If you are not the intended recipient, please notify the sender and delete it.",
                  },
                ],
                defNew: "Standard",
              },
              ["[Standard]", "Office Assistant", "Lakeside Medical Associates", "(555) 010-2400", "confidential information", "New messages: Standard"],
            ),
          ],
        },
        { instruction: 'Create a folder named "Patient Inquiries".', hint: "Right-click your email address at the top of the folder list › Create new folder, or select Create new folder at the bottom of the list. Type the name and press Enter.", steps: [root("Patient Inquiries")] },
        { instruction: 'Create a folder named "Insurance & Billing".', hint: "Create new folder › type Insurance & Billing › Enter.", steps: [root("Insurance & Billing")] },
        { instruction: 'Create a folder named "Staff Communications".', hint: "Create new folder › type Staff Communications › Enter.", steps: [root("Staff Communications")] },
        { instruction: 'Create a folder named "Vendors".', hint: "Create new folder › type Vendors › Enter.", steps: [root("Vendors")] },
        {
          instruction: 'Send yourself a test message (jordan.rivera@lakesidemed.example.com) with the subject "Signature Test" followed by your name, and check that your signature appears.',
          hint: "New mail › To: your own address › subject Signature Test - your name › Send. Open the message when it arrives in your Inbox.",
          steps: [NEW_MAIL, { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } }, subjectHas("Signature Test"), SEND],
        },
      ],
    },
  ],

  "module-4::writing-professional-emails": [
    {
      id: "tf-m4-writing-professional-emails-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Send five professional emails",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: write and send the five emails. Write your own wording; each task lists what the message must include. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 15,
      initial: box([
        msg("m1", REYES, "Is my appointment confirmed?", "Hello,\n\nIs my appointment on Tuesday at 2:00 PM confirmed? Should I bring my insurance card?\n\nThank you,\nCarlos Reyes", "2026-10-20T07:50", { to: [ME], external: true }),
      ]),
      tasks: [
        {
          instruction: "Patient response: reply to Carlos Reyes. Confirm his appointment on Tuesday at 2:00 PM and ask him to bring his insurance card and a photo ID.",
          hint: "Select the message › Reply. Start with a greeting and a sentence that confirms the appointment, then ask for both cards, and close politely. Select Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Carlos Reyes's message first." },
            bodyHas("2:00", "insurance card", "photo ID"),
            SEND,
          ],
        },
        {
          instruction:
            'Insurance follow-up: email Metro Health Plan Claims (claims@metrohealthplan.example.com) about claim "BR-4892", which hasn\'t been processed. Put the claim number in the subject and ask for a status update in the message.',
          hint: "New mail › To › a specific subject such as Status Request: Claim BR-4892 › state your purpose in the first sentence › Send.",
          steps: [NEW_MAIL, { action: { kind: "type", target: "compose.to", value: recipients(CLAIMS.email) } }, subjectHas("BR-4892"), bodyHas("status update"), SEND],
        },
        {
          instruction:
            'Vendor inquiry: email BrightPath Medical Supply (orders@brightpathsupply.example.com) asking for a price quote for "500" units of exam table paper and "100" boxes of medium nitrile gloves. Use "Quote" in the subject.',
          hint: "New mail › To › subject such as Quote Request: Exam Table Paper and Gloves › list the items › Send.",
          steps: [NEW_MAIL, { action: { kind: "type", target: "compose.to", value: recipients(VENDOR.email) } }, subjectHas("Quote"), bodyHas("500", "100", "nitrile"), SEND],
        },
        {
          instruction:
            'Internal memo: email the clinical staff (clinical@lakesidemed.example.com) that Tuesday\'s schedule changed because a provider is out, and that patients have been notified. Use "Schedule" in the subject.',
          hint: "New mail › To › subject such as Schedule Update: Tuesday › two or three friendly sentences › Send.",
          steps: [NEW_MAIL, { action: { kind: "type", target: "compose.to", value: recipients(CLINICAL.email) } }, subjectHas("Schedule"), bodyHas("notified"), SEND],
        },
        {
          instruction:
            'Referring office: email Riverside Family Practice (records@riversidefamily.example.com) to request records for a patient\'s upcoming procedure, within "14 days". Use "Records Request" in the subject and leave patient details for your practice\'s secure method.',
          hint: "New mail › To › subject Records Request › explain what you need and by when, and say you will send patient details through the practice's secure method › Send.",
          steps: [NEW_MAIL, { action: { kind: "type", target: "compose.to", value: recipients(RIVERSIDE.email) } }, subjectHas("Records Request"), bodyHas("14 days"), SEND],
        },
      ],
    },
  ],

  "module-4::inbox-management": [
    {
      id: "tf-m4-inbox-management-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Build an inbox organization system",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: add the folders, a rule and follow-up flags the lesson describes. When you finish, enter your name and print or save your results page, and submit it with your rules table and Inbox Management Guide.",
      fileName: "Inbox",
      minutes: 10,
      initial: box(
        [
          msg("m1", CLAIMS, "Claim 48213 processed", "Claim 48213 has been processed.", "2026-10-20T08:20", { to: [ME], external: true }),
          msg("m2", PATEL, "Call back the imaging center", "Please call Riverside Imaging back today about Thursday's MRI slot.", "2026-10-20T08:05", { to: [ME] }),
          msg("m3", NEWS, "This week: 5 ways to shorten patient wait times", "Healthcare Admin Weekly.", "2026-10-20T06:00", { to: [ME], external: true }),
          msg("m4", KEISHA, "Copay list for October", "Can you check the copay list against the schedule this week?", "2026-10-19T15:00", { to: [ME] }),
          msg("m5", CLAIMS, "Claim 48190 needs more information", "Claim 48190 is pending.", "2026-10-19T13:10", { to: [ME], external: true }),
        ],
        {
          folders: [
            { id: "f-patient-inquiries", name: "Patient Inquiries" },
            { id: "f-staff", name: "Staff & Internal" },
            { id: "f-vendors", name: "Vendors" },
            { id: "f-reference", name: "Reference" },
          ],
        },
      ),
      tasks: [
        { instruction: 'Create a folder named "Insurance & Billing".', hint: "Right-click your email address › Create new folder (or Create new folder at the bottom of the list) › type the name › Enter.", steps: [root("Insurance & Billing")] },
        {
          instruction: 'Inside Insurance & Billing, create a subfolder named "Metro Health Plan".',
          hint: "Right-click Insurance & Billing › Create new subfolder › type Metro Health Plan › Enter.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Metro Health Plan", parent: "Insurance & Billing" } } }],
        },
        { instruction: 'Create a folder named "Referrals".', hint: "Create new folder › Referrals › Enter.", steps: [root("Referrals")] },
        { instruction: 'Create a folder named "@Action".', hint: "Create new folder › @Action › Enter. The @ sign sorts it near the top.", steps: [root("@Action")] },
        {
          instruction: 'Create a rule named "Metro claims": messages from claims@metrohealthplan.example.com move to the Metro Health Plan folder.',
          hint: "Settings › Mail › Rules › Add new rule. Name it, choose From and type the address, choose Move to › Metro Health Plan, and select Save.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "newRule",
                values: { name: "Metro claims", condition: "From", conditionValue: [CLAIMS.email, CLAIMS.name], action: "Move to", actionValue: "Metro Health Plan" },
              },
            },
          ],
        },
        {
          instruction: 'Create a second rule from the Healthcare Admin Weekly newsletter that moves its messages to the Reference folder.',
          hint: "Right-click the newsletter › Rules › Create rule › choose Reference › OK.",
          steps: [{ action: { kind: "dialog", id: "createRuleQuick", values: { folder: "Reference" } }, requires: { selection: "msg:m3" }, selectHint: "Select the Healthcare Admin Weekly message first." }],
        },
        {
          instruction: 'Flag Dr. Patel\'s "Call back the imaging center" for today and Keisha\'s "Copay list for October" for this week.',
          hint: "Select each message › the arrow next to Flag / Unflag (or right-click › Flag) › Today or This week.",
          steps: [
            { action: { kind: "command", id: "item.followUp", value: "Today" }, requires: { selection: "msg:m2" }, selectHint: "Select Dr. Patel's message first." },
            { action: { kind: "command", id: "item.followUp", value: "This Week" }, requires: { selection: "msg:m4" }, selectHint: "Select Keisha's message next." },
          ],
        },
        {
          instruction: "Open To Do and show the Flagged email list.",
          hint: "Select To Do in the navigation bar on the left, then Flagged email.",
          steps: [{ action: { kind: "command", id: "todo.list", value: "Flagged email" } }],
        },
      ],
    },
  ],

  "module-4::email-etiquette": [
    {
      id: "tf-m4-email-etiquette-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Review, schedule, and set automatic replies",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: review your sent mail, schedule a message, and set up automatic replies for a three-day absence. When you finish, enter your name and print or save your results page to submit with your evaluation notes and Email Etiquette Guide.",
      fileName: "Inbox",
      minutes: 8,
      initial: box([
        msg("m1", DENISE, "Coverage next month", "Jordan, please set your automatic replies before your three days off next month.", "2026-10-20T08:10", { to: [ME] }),
        msg("s1", ME, "Insurance card copies", "Hi Keisha, the insurance card scans are attached. Jordan", "2026-10-19T15:30", { folder: "sent", to: [KEISHA], read: true, attachments: [{ name: "Insurance Card Scans.pdf", size: "640 KB" }] }),
        msg("s2", ME, "Question", "can u call me", "2026-10-19T11:02", { folder: "sent", to: [OMAR], read: true }),
        msg("s3", ME, "Status Request: Claim 48190", "Hello,\n\nI am writing to ask for the status of claim 48190, submitted on October 1.\n\nThank you,\nJordan Rivera", "2026-10-18T09:40", { folder: "sent", to: [CLAIMS], read: true }),
      ]),
      tasks: [
        {
          instruction: "Open Sent Items and review your recent sent messages. (Write your evaluation notes outside the lab.)",
          hint: "Select Sent Items in the folder pane and read each message. Note the subject, greeting, first sentence, closing and signature.",
          steps: [{ action: { kind: "command", id: "mail.folder", value: ["sent", "Sent Items"] } }],
        },
        {
          instruction: 'Write a message to yourself with the subject "Scheduled send test" and schedule it for today at 11:30 AM instead of sending it now.',
          hint: "New mail › To: your own address › subject › the arrow next to Send › Schedule send › Custom time › today's date and 11:30 AM › Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Scheduled send test" } },
            { action: { kind: "dialog", id: "scheduleSend", values: { when: "Custom time", date: "10/20/2026", time: "11:30 AM" } } },
          ],
        },
        {
          instruction: "Find the scheduled message where it waits until it is sent.",
          hint: "In new Outlook, a scheduled message waits in Drafts. Select Drafts in the folder pane.",
          steps: [{ action: { kind: "command", id: "mail.folder", value: ["drafts", "Drafts"] } }],
        },
        {
          instruction:
            'Set automatic replies for a three-day absence from 11/16/2026 8:00 AM to 11/18/2026 5:00 PM. Write your own inside message that gives your return date, "Thursday, November 19", and names "Omar Haddad" as the contact for urgent matters.',
          hint: "Settings › Accounts › Automatic replies › turn on › Send replies only during a time period › set the dates and times › type your message › Save.",
          steps: [
            autoRepliesStep(
              { start: ["11/16/2026", "8:00 AM"], end: ["11/18/2026", "5:00 PM"], inside: "I am out of the office and will return on Thursday, November 19. For urgent matters, please contact Omar Haddad." },
              ["Send automatic replies", "Time range: 11/16/2026 8:00 AM to 11/18/2026 5:00 PM", "Thursday, November 19", "Omar Haddad"],
            ),
          ],
        },
      ],
    },
  ],
};
