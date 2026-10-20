import type { SimDefinition } from "@/types/sim";
import { outlookDoc } from "@/components/sim/apps/outlook/types";
import type { OlMessage, OutlookDoc } from "@/components/sim/apps/outlook/types";
import { OPEN, autoRepliesStep, mentions, msg, person, recipients, signaturesStep } from "@/components/sim/apps/outlook/simkit";

/*
 * Tech Foundations (INFO3020) Outlook sims. General school and workplace
 * scenarios at Northgate College's Office of Student Services. Fictional
 * people; example.com-style addresses.
 */

const ME = person("Alex Rivera", "alex.rivera@northgate.example.com");
const DANA = person("Dana Brooks", "dana.brooks@northgate.example.com");
const PRIYA = person("Priya Shah", "priya.shah@northgate.example.com");
const TOMAS = person("Tomas Reyes", "tomas.reyes@northgate.example.com");
const GRACE = person("Grace Kim", "grace.kim@northgate.example.com");
const LENA = person("Lena Ortiz", "lena.ortiz@northgate.example.com");
const HELP = person("Northgate IT Help Desk", "helpdesk@northgate.example.com");
const SECURITY = person("IT Security", "security@northgate.example.com");
const JORDAN = person("Jordan Price", "jordan.price@example.net");
const MARIA = person("Maria Lopez", "maria.lopez@example.net");
const BAYSIDE = person("Bayside Office Supply", "orders@baysidesupply.example.com");
const NEWS = person("Campus Tech Weekly", "news@campustech.example.com");

const STAFF = [DANA, PRIYA, TOMAS, GRACE, LENA, HELP, SECURITY];

function base(messages: OlMessage[], extra: Partial<OutlookDoc> = {}): Record<string, unknown> {
  return outlookDoc({
    account: ME,
    now: "2026-10-20T09:30",
    readingPane: "Right",
    directory: [...STAFF, BAYSIDE],
    contacts: [
      { id: "c1", name: "Jordan Price", email: JORDAN.email, company: "Northgate College (student)" },
      { id: "c2", name: "Bayside Office Supply", email: BAYSIDE.email, company: "Bayside Office Supply" },
    ],
    messages,
    ...extra,
  });
}

const replyHint = "Select the message, then Home tab › Respond group › Reply (or Ctrl+R, or Reply in the Reading Pane). Type your text above the original message and click Send.";

export const outlookSims: Record<string, SimDefinition[]> = {
  /* ---------------------------------------------------------------- */
  "module-4::email-fundamentals": [
    {
      id: "tf-m4-email-fundamentals-outlook-1",
      app: "outlook",
      title: "Set up your Student Services mailbox",
      scenario:
        "It is your first day as a student worker in the Northgate College Office of Student Services. Your supervisor, Dana Brooks, wants your mailbox ready before the phones start: a layout you can read quickly, a signature, a folder for student questions, and answers to the messages that came in overnight.",
      fileName: "Inbox",
      minutes: 7,
      initial: base(
        [
          msg("m1", DANA, "Welcome to Student Services", "Hi Alex,\n\nWelcome to the team! Your first week will be mostly front desk email and phones. Let me know when your mailbox is set up.\n\nDana", "2026-10-20T08:05", { to: [ME] }),
          msg("m2", LENA, "Orientation volunteer schedule", "Hi all,\n\nWe still need two people for the welcome table on Saturday from 9:00 AM to 12:00 PM. Reply all so everyone can see who is covering.\n\nLena", "2026-10-19T16:40", { to: [ME, PRIYA, TOMAS, GRACE] }),
          msg("m3", JORDAN, "Question about my class schedule", "Hello,\n\nI was dropped from BIO 101 and I am not sure why. Who can help me get back in?\n\nThank you,\nJordan Price", "2026-10-19T21:12", { to: [ME], external: true }),
          msg("m4", HELP, "Your Northgate account is ready", "Your Northgate email account is active. Bookmark the staff portal: [portal.northgate.example.com](https://portal.northgate.example.com).", "2026-10-19T10:00", { to: [ME], read: true }),
          msg("m5", NEWS, "Campus Tech Weekly: 5 tips for a faster laptop", "This week: browser tabs, startup apps, and more.", "2026-10-18T07:00", { to: [ME], read: true }),
        ],
        { readingPane: "Off" },
      ),
      tasks: [
        {
          instruction: "Show the Reading Pane at the bottom of the window so you can read a message without opening it.",
          hint: "View tab › Layout group › Reading Pane › Bottom.",
          steps: [{ action: { kind: "command", id: "view.readingPane", value: "Bottom" } }],
        },
        {
          instruction: 'Create an email signature named "Standard" with the text "Alex Rivera, Student Services Assistant, Northgate College, (555) 010-4477", and set it as the default signature for new messages.',
          hint: "File tab › Options › Mail › Signatures... › New › type Standard › OK › type the signature in Edit signature › New messages: Standard › OK. (In a new message you can also use Message tab › Signature › Signatures....)",
          steps: [
            signaturesStep(
              { sigs: [{ name: "Standard", text: "Alex Rivera, Student Services Assistant, Northgate College, (555) 010-4477" }], defNew: "Standard" },
              ["[Standard]", "Alex Rivera", "Student Services Assistant", "(555) 010-4477", "New messages: Standard"],
            ),
          ],
        },
        {
          instruction: 'Create a folder named "Student Inquiries" inside the Inbox.',
          hint: "Right-click Inbox in the Folder Pane › New Folder... › type Student Inquiries › Enter. (Or Folder tab › New Folder, or Ctrl+Shift+E.)",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Student Inquiries", parent: "Inbox" } } }],
        },
        {
          instruction: 'Move the message "Question about my class schedule" from Jordan Price to the Student Inquiries folder.',
          hint: "Drag the message onto Student Inquiries in the Folder Pane. Or right-click it › Move › Student Inquiries, or Home tab › Move › Other Folder....",
          steps: [{ action: { kind: "command", id: "mail.move", value: "Student Inquiries" }, requires: { selection: "msg:m3" }, selectHint: "Click Jordan Price's message \"Question about my class schedule\" first." }],
        },
        {
          instruction: 'Reply to Dana Brooks\'s message "Welcome to Student Services" with the text "Thank you, Dana. I am glad to be on the team." and send it.',
          hint: replyHint,
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Dana Brooks's message \"Welcome to Student Services\" first." },
            mentions("compose.body", "Thank you, Dana. I am glad to be on the team.", ["Thank you, Dana", "glad to be on the team"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Lena Ortiz asked everyone to reply so the whole group can see who is covering. Answer her message "Orientation volunteer schedule" so all recipients see it, with the text "I can help at the welcome table on Saturday."',
          hint: "Select the message, then Home tab › Respond group › Reply All (or Ctrl+Shift+R). Type your text and click Send.",
          steps: [
            { action: { kind: "command", id: "mail.replyAll" }, requires: { selection: "msg:m2" }, selectHint: "Select Lena Ortiz's message \"Orientation volunteer schedule\" first." },
            mentions("compose.body", "I can help at the welcome table on Saturday.", ["welcome table", "Saturday"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Test your signature: send a new message to yourself (alex.rivera@northgate.example.com) with the subject "Signature Test - Alex Rivera" and the text "Testing my new signature."',
          hint: "Home tab › New Email (or Ctrl+N). In To, type your own address. Type the subject, then type the text above your signature and click Send. The test arrives in your Inbox.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Signature Test - Alex Rivera" } },
            mentions("compose.body", "Testing my new signature.", ["Testing my new signature"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  "module-4::writing-professional-emails": [
    {
      id: "tf-m4-writing-professional-emails-outlook-1",
      app: "outlook",
      title: "Send four professional messages",
      scenario:
        "Dana Brooks left you four messages to send before noon: confirm a student's advising appointment, follow up with the Registrar about a missing transcript, pass a form to Financial Aid, and request a price quote from a vendor. Each one needs a specific subject, a clear first sentence, and the right recipients.",
      fileName: "Inbox",
      minutes: 8,
      initial: base(
        [
          msg("m1", JORDAN, "Is my advising appointment confirmed?", "Hi,\n\nIs my advising appointment this Thursday at 2:00 PM confirmed? Do I need to bring anything?\n\nJordan Price", "2026-10-20T07:48", { to: [ME], external: true }),
          msg("m2", GRACE, "Room request form", "Hi Alex,\n\nAttached is the room request form for the November workshop. Financial Aid needs to fill it out.\n\nGrace", "2026-10-20T08:20", { to: [ME], attachments: [{ name: "Room Request Form.docx", size: "38 KB" }] }),
          msg("m3", DANA, "Today's email list", "Alex,\n\n1. Confirm Jordan Price's advising appointment.\n2. Follow up with Priya Shah about Maria Lopez's transcript (copy me).\n3. Send Grace's room request form to Tomas Reyes.\n4. Ask Bayside Office Supply for a quote. The request is in your files.\n\nThanks,\nDana", "2026-10-20T08:00", { to: [ME], read: true }),
        ],
        { files: [{ name: "Supply Quote Request.docx", size: "41 KB" }, { name: "Scan0042.pdf", size: "220 KB" }, { name: "Document1.docx", size: "12 KB" }] },
      ),
      tasks: [
        {
          instruction: 'Reply to Jordan Price\'s message "Is my advising appointment confirmed?" with a message that confirms the appointment for "Thursday, October 22 at 2:00 PM" and asks Jordan to bring a "student ID".',
          hint: replyHint,
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Jordan Price's message first." },
            mentions("compose.body", "Hi Jordan, your advising appointment on Thursday, October 22 at 2:00 PM is confirmed. Please bring your student ID.", ["October 22", "2:00 PM", "student ID"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Create a new message to Priya Shah with a copy (Cc) to Dana Brooks. Use the subject "Transcript Request: Maria Lopez, Needed by October 27" and begin the message with "I am writing to follow up on Maria Lopez\'s transcript request." Then send it.',
          hint: "Home tab › New Email (Ctrl+N). Type Priya in To and pick her from the list, type Dana in Cc, type the subject, type the first sentence, and click Send.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(PRIYA.email) } },
            { action: { kind: "type", target: "compose.cc", value: recipients(DANA.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Transcript Request: Maria Lopez, Needed by October 27" } },
            mentions("compose.body", "I am writing to follow up on Maria Lopez's transcript request.", ["I am writing to follow up"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Forward Grace Kim\'s message "Room request form" to Tomas Reyes with the note "Tomas, please complete the attached form by Friday."',
          hint: "Select the message, then Home tab › Respond group › Forward (or Ctrl+F). Type Tomas in To, type the note, and click Send. The attachment travels with the forward.",
          steps: [
            { action: { kind: "command", id: "mail.forward" }, requires: { selection: "msg:m2" }, selectHint: "Select Grace Kim's message \"Room request form\" first." },
            { action: { kind: "type", target: "compose.to", value: recipients(TOMAS.email) } },
            mentions("compose.body", "Tomas, please complete the attached form by Friday.", ["complete the attached form", "Friday"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Create a new message to Bayside Office Supply (orders@baysidesupply.example.com). Attach "Supply Quote Request.docx", use the subject "Quote Request: Copy Paper and Toner, Reply by October 27", type "Please see the attached request for a price quote.", and send it.',
          hint: "New Email › Message tab › Include group › Attach File › Browse This PC... › Supply Quote Request.docx › Insert. Attach first, then fill in To, Subject, and the text, and click Send.",
          steps: [
            OPEN.email,
            { action: { kind: "dialog", id: "attachFile", values: { file: "Supply Quote Request.docx" } } },
            { action: { kind: "type", target: "compose.to", value: recipients(BAYSIDE.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Quote Request: Copy Paper and Toner, Reply by October 27" } },
            mentions("compose.body", "Please see the attached request for a price quote.", ["attached request", "price quote"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  "module-4::inbox-management": [
    {
      id: "tf-m4-inbox-management-outlook-1",
      app: "outlook",
      title: "Build a filing system for a busy inbox",
      scenario:
        "The Student Services inbox gets dozens of messages a day, and important ones are getting buried under newsletters. Dana Brooks asks you to set up folders and a rule so the Inbox only holds messages that still need action.",
      fileName: "Inbox",
      minutes: 6,
      initial: base(
        [
          msg("m1", DANA, "URGENT: Room change for Monday's orientation", "Orientation moves to Hall B, Room 110. Please update the sign at the front desk.", "2026-10-20T08:55", { to: [ME] }),
          msg("m2", TOMAS, "FAFSA verification documents", "Alex, three students dropped off verification documents. Please file this for Financial Aid.", "2026-10-20T08:31", { to: [ME] }),
          msg("m3", JORDAN, "Parking permit appeal", "I would like to appeal my parking ticket from October 14. What is the process?", "2026-10-20T07:58", { to: [ME], external: true }),
          msg("m4", NEWS, "Campus Tech Weekly: Free webinar on Thursday", "Join our free webinar on campus cybersecurity.", "2026-10-20T07:00", { to: [ME] }),
          msg("m5", NEWS, "Campus Tech Weekly: New laptop deals", "Students save 15% on laptops this month.", "2026-10-19T07:00", { to: [ME] }),
          msg("m6", person("Prize Center", "winner@freeprize-claims.example.biz"), "You won a free laptop!!!", "Click here to claim your FREE laptop. Offer ends TODAY.", "2026-10-19T23:14", { to: [ME], external: true }),
          msg("m7", PRIYA, "Spring registration dates", "Spring registration opens November 9 for continuing students.", "2026-10-19T11:20", { to: [ME], read: true }),
        ],
        { folders: [{ id: "f-student-inquiries", name: "Student Inquiries", parent: "inbox" }, { id: "f-newsletters", name: "Newsletters", parent: "inbox" }, { id: "f-staff", name: "Staff & Internal", parent: "inbox" }] },
      ),
      tasks: [
        {
          instruction: 'Create a folder named "Financial Aid" inside the Inbox.',
          hint: "Right-click Inbox › New Folder... and type the name, or Folder tab › New group › New Folder (Ctrl+Shift+E) › Name: Financial Aid › Select Inbox › OK.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Financial Aid", parent: "Inbox" } } }],
        },
        {
          instruction: 'Move the message "FAFSA verification documents" from Tomas Reyes to the Financial Aid folder.',
          hint: "Drag the message onto Financial Aid, or right-click it › Move › Financial Aid.",
          steps: [{ action: { kind: "command", id: "mail.move", value: "Financial Aid" }, requires: { selection: "msg:m2" }, selectHint: "Click the message \"FAFSA verification documents\" first." }],
        },
        {
          instruction: "Create a rule that moves every message from Campus Tech Weekly (news@campustech.example.com) to the Newsletters folder, and run it now on the Inbox.",
          hint: "Select a Campus Tech Weekly message, then Home tab › Move group › Rules › Create Rule... › check From Campus Tech Weekly › check Move the item to folder › Newsletters › check Run this rule now › OK. (Rules › Always Move Messages From Sender... also works.)",
          steps: [
            {
              action: { kind: "dialog", id: "createRule", values: { fromOn: true, from: NEWS.email, moveOn: true, folder: "Newsletters", runNow: true } },
              alt: [{ kind: "dialog", id: "alwaysMove", values: { folder: "Newsletters" } }],
              requires: { selection: ["msg:m4", "msg:m5"] },
              selectHint: "Select one of the Campus Tech Weekly messages first, so the rule is built from that sender.",
            },
          ],
        },
        {
          instruction: 'Block the sender of the message "You won a free laptop!!!" so future messages from it go to Junk Email.',
          hint: "Select the message, then Home tab › Delete group › Junk › Block Sender (or right-click › Junk › Block Sender).",
          steps: [{ action: { kind: "command", id: "home.junk", value: "Block Sender" }, requires: { selection: "msg:m6" }, selectHint: "Select the message \"You won a free laptop!!!\" first." }],
        },
        {
          instruction: 'Flag the message "Parking permit appeal" from Jordan Price for follow-up this week.',
          hint: "Select the message, then Home tab › Tags group › Follow Up › This Week (or right-click › Follow Up › This Week).",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "This Week" }, requires: { selection: "msg:m3" }, selectHint: "Select Jordan Price's message \"Parking permit appeal\" first." }],
        },
        {
          instruction: 'Assign the Red Category to the message "URGENT: Room change for Monday\'s orientation" so it stands out.',
          hint: "Select the message, then Home tab › Tags group › Categorize › Red Category (or right-click › Categorize).",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Red Category" }, requires: { selection: "msg:m1" }, selectHint: "Select Dana Brooks's URGENT message first." }],
        },
      ],
    },
    {
      id: "tf-m4-inbox-management-outlook-2",
      app: "outlook",
      title: "Flag, categorize, and find what you need",
      scenario:
        "Your folders are in place. Now make sure follow-ups have due dates, color labels mean something, and you can find a message even when it was filed in the wrong place.",
      fileName: "Inbox",
      minutes: 6,
      initial: base(
        [
          msg("m1", JORDAN, "Parking permit appeal", "I would like to appeal my parking ticket from October 14. What is the process?", "2026-10-20T07:58", { to: [ME], external: true }),
          msg("m2", MARIA, "Lab fee refund request", "I withdrew from CHEM 110 before the deadline. Can my lab fee be refunded?", "2026-10-20T07:15", { to: [ME], external: true }),
          msg("m3", PRIYA, "Spring registration dates", "Spring registration opens November 9 for continuing students.", "2026-10-19T11:20", { to: [ME] }),
          msg("m4", GRACE, "Lunch and learn: time management", "Join us Friday at noon in the Student Center.", "2026-10-19T09:40", { to: [ME], read: true }),
          msg("m5", HELP, "Your password was changed", "Your Northgate password was changed on October 18. No action is needed if you made this change.", "2026-10-18T16:02", { to: [ME], read: true }),
          msg("m6", JORDAN, "Locker assignment question", "Hi, my locker in the Science Building will not open. Who should I contact?", "2026-10-16T13:22", { to: [ME], folder: "f-staff", read: true, external: true }),
        ],
        { folders: [{ id: "f-student-inquiries", name: "Student Inquiries", parent: "inbox" }, { id: "f-staff", name: "Staff & Internal", parent: "inbox" }] },
      ),
      tasks: [
        {
          instruction: 'Flag the message "Parking permit appeal" for follow-up tomorrow.',
          hint: "Select the message, then Home tab › Tags group › Follow Up › Tomorrow (or right-click › Follow Up › Tomorrow).",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Tomorrow" }, requires: { selection: "msg:m1" }, selectHint: "Select \"Parking permit appeal\" first." }],
        },
        {
          instruction: 'Flag the message "Lab fee refund request" with a due date of 10/30/2026.',
          hint: "Select the message, then Home tab › Follow Up › Custom... › Due date: 10/30/2026 › OK (or press Ctrl+Shift+G).",
          steps: [{ action: { kind: "dialog", id: "customFlag", values: { dueDate: "10/30/2026" } }, requires: { selection: "msg:m2" }, selectHint: "Select Maria Lopez's \"Lab fee refund request\" first." }],
        },
        {
          instruction: 'Assign the Blue Category to the message "Spring registration dates".',
          hint: "Select the message, then Home tab › Tags group › Categorize › Blue Category.",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Blue Category" }, requires: { selection: "msg:m3" }, selectHint: "Select Priya Shah's \"Spring registration dates\" first." }],
        },
        {
          instruction: 'A student says they emailed about a locker last week, but you cannot see it. Search your mailbox for "locker", then move the message you find to the Student Inquiries folder.',
          hint: "Click the Search box above the message list (or press Ctrl+E), type locker, and press Enter. Then drag the result to Student Inquiries, or right-click › Move › Student Inquiries.",
          steps: [{ action: { kind: "command", id: "mail.move", value: "Student Inquiries" }, requires: { selection: "msg:m6" }, selectHint: "Search for locker, then click the message \"Locker assignment question\"." }],
        },
        {
          instruction: 'Mark the message "Lunch and learn: time management" as unread so it stays on your list.',
          hint: "Select the message, then Home tab › Tags group › Unread/ Read (or press Ctrl+U, or right-click › Mark as Unread).",
          steps: [{ action: { kind: "command", id: "mail.markUnread" }, alt: [{ kind: "command", id: "mail.toggleRead" }], requires: { selection: "msg:m4" }, selectHint: "Select Grace Kim's \"Lunch and learn\" message first." }],
        },
        {
          instruction: 'The message "Your password was changed" needs no action, but you may need it later. Remove it from the Inbox without deleting it.',
          hint: "Select the message, then Home tab › Delete group › Archive (or press Backspace). Archived mail stays searchable in the Archive folder.",
          steps: [{ action: { kind: "command", id: "mail.archive" }, alt: [{ kind: "command", id: "mail.move", value: "Archive" }], requires: { selection: "msg:m5" }, selectHint: "Select the IT Help Desk message \"Your password was changed\" first." }],
        },
        {
          instruction: "Show the To-Do Bar with your tasks so your flagged messages stay in view.",
          hint: "View tab › Layout group › To-Do Bar › Tasks.",
          steps: [{ action: { kind: "command", id: "view.todoBar", value: "Tasks" } }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  "module-4::email-etiquette": [
    {
      id: "tf-m4-email-etiquette-outlook-1",
      app: "outlook",
      title: "Handle the tricky messages the right way",
      scenario:
        "It is 9:40 PM and you are finishing a few messages before a three-day absence. Some need Reply instead of Reply All, one needs Bcc, one should wait until morning, and your mailbox needs an out of office reply before you leave.",
      fileName: "Inbox",
      minutes: 8,
      initial: base(
        [
          msg("m1", LENA, "Who can cover the front desk on Friday?", "Hi everyone,\n\nWho can cover the front desk on Friday morning? Reply to me directly.\n\nLena", "2026-10-20T15:10", { to: [ME, PRIYA, TOMAS, GRACE, DANA, HELP] }),
          msg("m2", TOMAS, "Can you resend the workshop flyer?", "Hi Alex, can you send me the workshop flyer again? I lost it.\n\nTomas", "2026-10-20T19:32", { to: [ME] }),
          msg("m3", PRIYA, "Question", "Hi Alex,\n\nThe transcript hold for Maria Lopez is cleared. Can you let her know?\n\nPriya", "2026-10-20T14:05", { to: [ME] }),
          msg("m4", JORDAN, "Still waiting on my refund", "I was told my refund would arrive two weeks ago. I still have not received it. This is very frustrating.", "2026-10-20T18:47", { to: [ME], external: true }),
        ],
        {
          now: "2026-10-20T21:40",
          files: [{ name: "Workshop Flyer.pdf", size: "310 KB" }, { name: "Workshop Flyer DRAFT.pdf", size: "305 KB" }],
          groups: [{ id: "g1", name: "Orientation Volunteers", members: ["sam.lee@example.net", "rosa.diaz@example.net", "kai.nguyen@example.net"] }],
        },
      ),
      tasks: [
        {
          instruction: 'Lena Ortiz sent "Who can cover the front desk on Friday?" to six people and asked for direct replies. Answer only Lena with "I can cover the front desk on Friday from 9:00 AM to 1:00 PM."',
          hint: "Select the message, then Home tab › Respond group › Reply (not Reply All), or Ctrl+R. Type the text and click Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Lena Ortiz's message first." },
            mentions("compose.body", "I can cover the front desk on Friday from 9:00 AM to 1:00 PM.", ["Friday", "9:00 AM"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Reply to Jordan Price\'s complaint "Still waiting on my refund" with "I am sorry for the delay. I have asked Financial Aid to review your refund today." and add your supervisor, Dana Brooks, as Cc.',
          hint: "Select the message › Reply (Ctrl+R) › type Dana in the Cc box and pick her › type the text › Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m4" }, selectHint: "Select Jordan Price's message first." },
            { action: { kind: "type", target: "compose.cc", value: recipients(DANA.email) } },
            mentions("compose.body", "I am sorry for the delay. I have asked Financial Aid to review your refund today.", ["sorry for the delay", "review your refund"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Priya\'s thread is called just "Question". Reply to it, change the subject to "RE: Transcript Hold for Maria Lopez Cleared", and type "Thank you, I will let Maria know today."',
          hint: "Select the message › Reply › click in the Subject box and replace the text › type your reply › Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m3" }, selectHint: "Select Priya Shah's message \"Question\" first." },
            { action: { kind: "type", target: "compose.subject", value: "RE: Transcript Hold for Maria Lopez Cleared" } },
            mentions("compose.body", "Thank you, I will let Maria know today.", ["let Maria know"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Send an update to the Orientation Volunteers without showing their addresses to each other: new message, To yourself, the "Orientation Volunteers" contact group in Bcc, subject "Saturday Orientation: Arrive at 8:30 AM", and the text "Please arrive at 8:30 AM instead of 9:00 AM."',
          hint: "New Email › Options tab › Show Fields group › Bcc. Put your own address in To, type Orientation in Bcc and pick the group, type the subject and text, and click Send.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.bcc", value: recipients("Orientation Volunteers") } },
            { action: { kind: "type", target: "compose.subject", value: "Saturday Orientation: Arrive at 8:30 AM" } },
            mentions("compose.body", "Please arrive at 8:30 AM instead of 9:00 AM.", ["8:30 AM"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'It is late. Reply to Tomas Reyes\'s "Can you resend the workshop flyer?", attach "Workshop Flyer.pdf", type "Here is the workshop flyer.", and schedule it to send tomorrow morning at 8:00 AM instead of now.',
          hint: "Select the message › Reply › Message tab › Attach File › Workshop Flyer.pdf › Insert. Type the text, then click the arrow on the Send button › Schedule send › Tomorrow morning 8:00 AM › Send. The message waits in the Outbox.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m2" }, selectHint: "Select Tomas Reyes's message first." },
            { action: { kind: "dialog", id: "attachFile", values: { file: "Workshop Flyer.pdf" } } },
            mentions("compose.body", "Here is the workshop flyer.", ["workshop flyer"]),
            { action: { kind: "dialog", id: "scheduleSend", values: { when: "Tomorrow morning 8:00 AM" } } },
          ],
        },
        {
          instruction:
            'Before you leave, turn on automatic replies that are sent only from 10/21/2026 8:00 AM to 10/23/2026 5:00 PM. Inside your organization, reply with: "I am out of the office until Monday, October 26. For urgent requests, contact Dana Brooks at dana.brooks@northgate.example.com."',
          hint: "File tab › Info › Automatic Replies › Send automatic replies › check Only send during this time range › set Start time and End time › type the message on the Inside My Organization tab › OK.",
          steps: [
            autoRepliesStep(
              { start: ["10/21/2026", "8:00 AM"], end: ["10/23/2026", "5:00 PM"], inside: "I am out of the office until Monday, October 26. For urgent requests, contact Dana Brooks at dana.brooks@northgate.example.com." },
              ["Send automatic replies", "Time range: 10/21/2026 8:00 AM to 10/23/2026 5:00 PM", "October 26", "Dana Brooks"],
            ),
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  "module-8::phishing-social-engineering": [
    {
      id: "tf-m8-phishing-outlook-1",
      app: "outlook",
      title: "Spot and report phishing in your inbox",
      scenario:
        "Northgate's IT Security team warned staff that a phishing campaign is hitting campus this week. Several messages arrived this morning. Some are real and some are not. Point to each sender's name to see the real address, and point to links without clicking them, before you act.",
      fileName: "Inbox",
      minutes: 7,
      initial: base(
        [
          msg(
            "m1",
            person("Microsoft Security Team", "security@microsoft-alerts.example.net"),
            "Your account will be suspended",
            "Dear User,\n\nWe detected suspicious activity on your Microsoft 365 account. You must verify your identity within 24 hours or your account will be permanently suspended.\n\n[Verify Now](https://microsoftonline-security.example.net/verify)\n\nMicrosoft Account Team",
            "2026-10-20T08:47",
            { to: [ME], external: true, firstTime: true, importance: "High" },
          ),
          msg(
            "m2",
            person("Northgate IT Help Desk", "it-helpdesk@northgate-support.example.net"),
            "Password expires today",
            "Your Northgate password expires TODAY. Keep your current password by signing in below within 2 hours.\n\n[Keep my password](https://northgate-support.example.net/login)\n\nIT Help Desk",
            "2026-10-20T08:12",
            { to: [ME], external: true, firstTime: true },
          ),
          msg(
            "m3",
            person("Dana Brooks", "dana.brooks.office@example.net"),
            "Quick favor",
            "Alex, are you at your desk? I am in a meeting and need you to buy four $100 gift cards for a student award. Send me the card numbers and I will pay you back today. Do not call, I cannot talk right now.\n\nDana",
            "2026-10-20T08:33",
            { to: [ME], external: true, firstTime: true },
          ),
          msg(
            "m4",
            person("Accounts Receivable", "billing@paylink-invoices.example.com"),
            "Invoice #48213 is past due",
            "Your invoice is past due. Open the attached invoice to avoid a late fee.",
            "2026-10-20T07:55",
            { to: [ME], external: true, attachments: [{ name: "Invoice_48213.doc", size: "88 KB" }] },
          ),
          msg("m5", GRACE, "Lunch and learn on Friday", "Hi all,\n\nJoin us Friday at noon in the Student Center for a lunch and learn on time management. Pizza provided!\n\nGrace", "2026-10-19T14:20", { to: [ME], folder: "junk" }),
          msg(
            "m6",
            HELP,
            "Planned maintenance Saturday",
            "Hello,\n\nThe staff portal will be down for maintenance Saturday from 6:00 AM to 10:00 AM. Check the status page at [status.northgate.example.com](https://status.northgate.example.com).\n\nNorthgate IT Help Desk",
            "2026-10-19T12:00",
            { to: [ME], read: true },
          ),
        ],
      ),
      tasks: [
        {
          instruction: 'The message "Your account will be suspended" claims to come from Microsoft. Check the sender\'s real address, then report the message as phishing.',
          hint: "Point to the sender's name in the Reading Pane: the address ends in microsoft-alerts.example.net, not a Microsoft address. Then Home tab › Protection group › Report › Report Phishing (or right-click › Report › Report Phishing).",
          steps: [{ action: { kind: "command", id: "home.report", value: "Report Phishing" }, requires: { selection: "msg:m1" }, selectHint: "Select the message \"Your account will be suspended\" first." }],
        },
        {
          instruction: 'Point to the link in "Password expires today" to see where it really goes, but do not click it. Forward the message as an attachment to security@northgate.example.com with the note "Possible phishing. I did not click the link."',
          hint: "Select the message › Home tab › Respond group › More › Forward as Attachment (Ctrl+Alt+F). Type the security address in To, type the note, and click Send.",
          steps: [
            { action: { kind: "command", id: "mail.forwardAttachment" }, requires: { selection: "msg:m2" }, selectHint: "Select the message \"Password expires today\" first." },
            { action: { kind: "type", target: "compose.to", value: recipients(SECURITY.email) } },
            mentions("compose.body", "Possible phishing. I did not click the link.", ["phishing"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'The message "Quick favor" uses your supervisor\'s name but asks for gift cards and says not to call. Report it as phishing.',
          hint: "The real Dana Brooks writes from dana.brooks@northgate.example.com. Select the message › Home tab › Report › Report Phishing.",
          steps: [{ action: { kind: "command", id: "home.report", value: "Report Phishing" }, requires: { selection: "msg:m3" }, selectHint: "Select the message \"Quick favor\" first." }],
        },
        {
          instruction: 'Do not open the attachment in "Invoice #48213 is past due". Block the sender so future messages go straight to Junk Email.',
          hint: "Select the message › Home tab › Delete group › Junk › Block Sender (or right-click › Junk › Block Sender).",
          steps: [{ action: { kind: "command", id: "home.junk", value: "Block Sender" }, requires: { selection: "msg:m4" }, selectHint: "Select the message \"Invoice #48213 is past due\" first." }],
        },
        {
          instruction: 'Grace Kim\'s real message "Lunch and learn on Friday" landed in Junk Email by mistake. Mark it as not junk so it returns to the Inbox.',
          hint: "Click Junk Email in the Folder Pane › select the message › Home tab › Junk › Not Junk (or click It's not junk in the yellow bar, or right-click › Junk › Not Junk).",
          steps: [
            {
              action: { kind: "command", id: "home.junk", value: "Not Junk" },
              alt: [{ kind: "command", id: "home.report", value: "Report Not Junk" }, { kind: "command", id: "home.junk", value: "Never Block Sender" }],
              requires: { selection: "msg:m5" },
              selectHint: "Open the Junk Email folder and select Grace Kim's message first.",
            },
          ],
        },
        {
          instruction:
            'Verify the password notice another way: send a new message to helpdesk@northgate.example.com with the subject "Did IT send a password notice today?" and the text "I received a password notice from it-helpdesk@northgate-support.example.net. Is it real?"',
          hint: "Home tab › New Email (Ctrl+N). Type the Help Desk address in To, type the subject and text, and click Send. Never reply to the suspicious message itself.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(HELP.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Did IT send a password notice today?" } },
            mentions("compose.body", "I received a password notice from it-helpdesk@northgate-support.example.net. Is it real?", ["northgate-support.example.net"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
      ],
    },
  ],
};
