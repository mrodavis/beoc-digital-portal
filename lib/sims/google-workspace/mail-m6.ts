import type { SimDefinition } from "@/types/sim";
import { gmailDoc } from "@/components/sim/apps/gmail/types";
import { ME, P, baseMail, cmd, form, inbox, msg } from "./mail-data";

const L = (n: string) => `module-6::${n}`;

const COMPUTER = [
  { name: "Unit 4B Repair Notice.pdf", size: "96 KB", mb: 0.1 },
  { name: "Move-in Walkthrough.mp4", size: "180 MB", mb: 180 },
  { name: "Lobby Photo.jpg", size: "2.4 MB", mb: 2.4 },
  { name: "Late Fee Policy.docx", size: "31 KB", mb: 0.03 },
];
const DRIVE = [
  { name: "Tenant Handbook", kind: "doc", sharedWith: [P.denise.email, P.andre.email, P.priya.email, P.kim.email] },
  { name: "Lease Renewal Checklist", kind: "doc", sharedWith: [P.denise.email, P.andre.email] },
  { name: "Maintenance Request Log", kind: "sheet", sharedWith: [P.kim.email] },
  { name: "Owner Report - October.pdf", kind: "pdf" },
];

export const gwMailM6: Record<string, SimDefinition[]> = {
  [L("gmail-inbox-basics")]: [
    {
      id: "gw-m6-inbox-basics-1",
      app: "gmail",
      title: "Get your inbox under control on day one",
      scenario: "It's your first morning as the office assistant at Parkview Property Management. Your Gmail inbox already has messages from coworkers, a vendor and a few senders Gmail sorted into tabs.",
      fileName: "Gmail",
      minutes: 5,
      initial: gmailDoc(baseMail()),
      tasks: [
        { instruction: "Open the Promotions tab to see what Gmail sorted there.", hint: "Above the message list, select the Promotions tab.", steps: [cmd("gm.tab", "Promotions")] },
        { instruction: "Delete the Office Supply Depot message “30% off printer paper this week.”", hint: "Point to the message and select Delete (trash can) on the right. Or check its box and select Delete at the top.", steps: [cmd("gm.delete", undefined, "msg:m5", "Check the box next to the Office Supply Depot message first, or point to it and use its Delete button.")] },
        { instruction: "Go back to the Primary tab and open Denise Carter's message “Welcome aboard, Jordan!”", hint: "Select the Primary tab, then select the message to open it.", steps: [cmd("gm.open", "m1")] },
        { instruction: "Star this message so you can find it later.", hint: "In the open message, select the star at the top right, next to the date.", steps: [cmd("gm.star", "on", "msg:m1")] },
        { instruction: "Return to the inbox and archive Kim Nguyen's message “Pest control visit, Riverside Commons.” It needs no action, but you want to keep it.", hint: "Select Back to Inbox (arrow at the top left). Point to the message and select Archive. Or open it and select Archive at the top.", steps: [cmd("gm.archive", undefined, "msg:m4", "Point to the pest control message (or check its box) before you select Archive.")] },
        { instruction: "Mark the Russo Plumbing invoice as important.", hint: "On the invoice's row, select the importance marker (the tag shape to the right of the star).", steps: [cmd("gm.important", "on", "msg:m8")] },
        { instruction: "Open All Mail to confirm the archived pest control message is still there.", hint: "In the left menu, select More, then All Mail.", steps: [cmd("gm.go", "all")] },
      ],
    },
  ],

  [L("compose-reply-forward")]: [
    {
      id: "gw-m6-compose-reply-forward-1",
      app: "gmail",
      title: "Answer, forward and send without losing a step",
      scenario: "Andre needs the team to know a showing moved, a vendor invoice needs to reach the bookkeeper, and a tenant needs a repair notice.",
      fileName: "Gmail",
      minutes: 7,
      initial: gmailDoc(baseMail({ computer: COMPUTER })),
      tasks: [
        { instruction: "Open Andre Wallace's message “Showing at Elm Street Apartments moved to Thursday.”", hint: "Select the message in the inbox.", steps: [cmd("gm.open", "m2")] },
        {
          instruction: "Everyone on this thread needs the update. Reply all with: “Thanks, Andre. I'll add Thursday at 4:00 PM to the showing calendar.”",
          hint: "Below the message, select Reply all. Type the text, then select Send.",
          steps: [form("send:replyAll:m2", `To: ${P.andre.email}\nTo: ${P.denise.email}\nCc: ${P.kim.email}\nSubject: Re: Showing at Elm Street Apartments moved to Thursday\nSend: Now\nBody: Thanks, Andre. I'll add Thursday at 4:00 PM to the showing calendar.`, [`To: ${P.andre.email}`, `To: ${P.denise.email}`, `Cc: ${P.kim.email}`, "showing calendar"])],
        },
        {
          instruction: "Forward the Russo Plumbing invoice (#4471) to Priya Shah with the note “Please process this invoice.”",
          hint: "Back to Inbox › open the invoice message › Forward (below the message). In To, type Priya and pick her name. Type the note, then Send.",
          steps: [form("send:forward:m8", `To: ${P.priya.email}\nSubject: Fwd: Invoice #4471 for Elm Street Apartments\nAttachment: Invoice 4471.pdf\nSend: Now\nBody: Please process this invoice.`, [`To: ${P.priya.email}`, "Attachment: Invoice 4471.pdf", "process this invoice"])],
        },
        {
          instruction: "Reply only to Denise's welcome message: “Thank you, Denise. I'm excited to get started.”",
          hint: "Open “Welcome aboard, Jordan!” › Reply (not Reply all) › type › Send.",
          steps: [form("send:reply:m1", `To: ${P.denise.email}\nSubject: Re: Welcome aboard, Jordan!\nSend: Now\nBody: Thank you, Denise. I'm excited to get started.`, [`To: ${P.denise.email}`, "excited to get started"])],
        },
        {
          instruction: "Write a new message to Darnell Brooks and Cc Kim Nguyen. Subject: “Plumbing repair scheduled for Unit 4B”. Attach Unit 4B Repair Notice.pdf from the computer. Message: “Hi Darnell, Russo Plumbing will repair your kitchen sink on Friday morning. The notice is attached.”",
          hint: "Compose › To: Darnell › select Cc and add Kim › Subject › type the message › Attach files (paper clip) › Unit 4B Repair Notice.pdf › Open › Send.",
          steps: [form("send:new", `To: ${P.darnell.email}\nCc: ${P.kim.email}\nSubject: Plumbing repair scheduled for Unit 4B\nAttachment: Unit 4B Repair Notice.pdf\nSend: Now\nBody: Hi Darnell, Russo Plumbing will repair your kitchen sink on Friday morning. The notice is attached.`, [`To: ${P.darnell.email}`, `Cc: ${P.kim.email}`, "Subject: Plumbing repair scheduled for Unit 4B", "Attachment: Unit 4B Repair Notice.pdf", "Friday morning"])],
        },
        { instruction: "You spot a mistake right after sending. Undo sending that message.", hint: "In the “Message sent” notice at the bottom left, select Undo. Do it quickly: the notice only stays for a few seconds in real Gmail.", steps: [cmd("gm.undoSend")] },
        {
          instruction: "In the reopened message, change “Friday morning” to “Friday at 9:00 AM” and send it again.",
          hint: "Edit the text in the reopened compose window, then select Send.",
          steps: [form("send:new", `To: ${P.darnell.email}\nCc: ${P.kim.email}\nSubject: Plumbing repair scheduled for Unit 4B\nAttachment: Unit 4B Repair Notice.pdf\nSend: Now\nBody: Hi Darnell, Russo Plumbing will repair your kitchen sink on Friday at 9:00 AM. The notice is attached.`, [`To: ${P.darnell.email}`, "Friday at 9:00 AM"])],
        },
      ],
    },
    {
      id: "gw-m6-compose-reply-forward-2",
      app: "gmail",
      title: "Send notices with Bcc, large files and Drive links",
      scenario: "Three tenants need the same water shutoff notice, Denise needs a video that's too big to attach, and a new applicant needs the Tenant Handbook from Google Drive.",
      fileName: "Gmail",
      minutes: 6,
      initial: gmailDoc(baseMail({ computer: COMPUTER, drive: DRIVE })),
      tasks: [
        {
          instruction: "Send one message to Darnell Brooks, Tina Okafor and Sam Whitfield without showing their addresses to each other: put yourself (jlee@parkviewpm.example) in To and the three tenants in Bcc. Subject: “Water shutoff Tuesday 9-11 AM at Riverside Commons”. Message: “The water will be off Tuesday from 9 to 11 AM for a valve repair.”",
          hint: "Compose › To: your own address › select Bcc › add Darnell, Tina and Sam › Subject › message › Send.",
          steps: [form("send:new", `To: ${ME.email}\nBcc: ${P.darnell.email}\nBcc: ${P.tina.email}\nBcc: ${P.sam.email}\nSubject: Water shutoff Tuesday 9-11 AM at Riverside Commons\nSend: Now\nBody: The water will be off Tuesday from 9 to 11 AM for a valve repair.`, [`To: ${ME.email}`, `Bcc: ${P.darnell.email}`, `Bcc: ${P.tina.email}`, `Bcc: ${P.sam.email}`, "Subject: Water shutoff", "valve repair"])],
        },
        {
          instruction: "Send Denise Carter the file Move-in Walkthrough.mp4 (180 MB) from the computer with the subject “Move-in walkthrough video”.",
          hint: "Compose › To: Denise › Subject › Attach files › Move-in Walkthrough.mp4 › Open. Gmail turns files over 25 MB into a Google Drive link. Then Send.",
          steps: [form("send:new", `To: ${P.denise.email}\nSubject: Move-in walkthrough video\nDrive link: Move-in Walkthrough.mp4\nSend: Now\nBody: Here is the walkthrough video.`, [`To: ${P.denise.email}`, "Drive link: Move-in Walkthrough.mp4"])],
        },
        {
          instruction: "Send Rosa Delgado the Tenant Handbook from Google Drive as a Drive link that she can view but not edit. Subject: “Tenant Handbook”.",
          hint: "Compose › To: Rosa › Subject › Insert files using Drive (Drive icon) › Tenant Handbook › Insert › Send. When Gmail asks about access, choose that recipients can view, then Send.",
          steps: [form("send:new", `To: ${P.rosa.email}\nSubject: Tenant Handbook\nDrive link: Tenant Handbook\nDrive access: Viewer\nSend: Now\nBody: Here is our Tenant Handbook.`, [`To: ${P.rosa.email}`, "Drive link: Tenant Handbook", "Drive access: Viewer"])],
        },
      ],
    },
  ],

  [L("send-later-and-settings")]: [
    {
      id: "gw-m6-send-later-and-settings-1",
      app: "gmail",
      title: "Schedule, protect and sign your mail",
      scenario: "Denise wants owner reports to arrive at the start of the week, bank details handled carefully, and every message from the office signed the same way.",
      fileName: "Gmail",
      minutes: 8,
      initial: gmailDoc(baseMail()),
      tasks: [
        {
          instruction: "Write to Grace Holloway with the subject “October owner report” and the message “Your October report is ready in the shared folder.” Schedule it to send Monday morning.",
          hint: "Compose › fill in To, Subject and message › select the arrow next to Send (More send options) › Schedule send › Monday morning.",
          steps: [form("send:new", `To: ${P.grace.email}\nSubject: October owner report\nSend: Scheduled Mon, Oct 26, 8:00 AM\nBody: Your October report is ready in the shared folder.`, [`To: ${P.grace.email}`, "Subject: October owner report", "Send: Scheduled Mon, Oct 26, 8:00 AM"])],
        },
        { instruction: "Open the Scheduled folder to check that the message is waiting there.", hint: "In the left menu, select More, then Scheduled.", steps: [cmd("gm.go", "scheduled")] },
        { instruction: "Grace asked for the report today instead. Open the scheduled message and cancel the send so it goes back to Drafts.", hint: "In Scheduled, open the message and select Cancel send.", steps: [cmd("gm.cancelSend")] },
        {
          instruction: "Send Priya Shah a message in confidential mode that expires in 1 week, with No SMS passcode. Subject: “Russo Plumbing bank details changed”. Message: “Russo Plumbing sent new bank details. Please call them at the number on file to confirm before you pay.”",
          hint: "Compose › fill it in › Toggle confidential mode (lock and clock icon) › Set expiration: Expires in 1 week › No SMS passcode › Save › Send.",
          steps: [form("send:new", `To: ${P.priya.email}\nSubject: Russo Plumbing bank details changed\nConfidential: Expires in 1 week; No SMS passcode\nSend: Now\nBody: Russo Plumbing sent new bank details. Please call them at the number on file to confirm before you pay.`, [`To: ${P.priya.email}`, "Confidential: Expires in 1 week; No SMS passcode", "confirm before you pay"])],
        },
        {
          instruction: "Create a signature named “Office” with the text “Jordan Lee | Office Assistant | Parkview Property Management”. Use it for new emails and for replies and forwards, then save.",
          hint: "Settings (gear) › See all settings › General › Signature › Create new › name it Office › Create › type the text › under Signature defaults choose Office in both boxes › Save Changes at the bottom.",
          steps: [form("settings:general", "Undo Send: 5 seconds\nDefault reply behavior: Reply\nSignature: Office = Jordan Lee | Office Assistant | Parkview Property Management\nFor new emails use: Office\nOn reply/forward use: Office\nVacation responder: off", ["Signature: Office = Jordan Lee", "Office Assistant", "For new emails use: Office", "On reply/forward use: Office"])],
        },
        {
          instruction: "You'll be at a training October 26–30. Turn on the vacation responder: first day October 26, 2026, last day October 30, 2026, subject “Out of the office October 26–30”, and the message “I'm away until November 2. For urgent requests, please email Denise Carter at dcarter@parkviewpm.example.” Then save.",
          hint: "Settings (gear) › See all settings › General › Vacation responder › Vacation responder on › First day and Last day › Subject › Message › Save Changes.",
          steps: [form("settings:general", "Undo Send: 5 seconds\nDefault reply behavior: Reply\nFor new emails use: Office\nOn reply/forward use: Office\nVacation responder: on\nFirst day: Oct 26, 2026\nLast day: Oct 30, 2026\nSubject: Out of the office October 26–30\nMessage: I'm away until November 2. For urgent requests, please email Denise Carter at dcarter@parkviewpm.example.\nOnly send a response to people in my Contacts: no", ["Vacation responder: on", "First day: Oct 26, 2026", "Last day: Oct 30, 2026", "Subject: Out of the office", "dcarter@parkviewpm.example"])],
        },
      ],
    },
  ],

  [L("organize-labels-filters-search")]: [
    {
      id: "gw-m6-organize-labels-filters-search-1",
      app: "gmail",
      title: "Organize vendor mail with labels, search and a filter",
      scenario: "Vendor invoices keep getting buried. Denise asks you to keep every vendor message together and out of the way until you need it.",
      fileName: "Gmail",
      minutes: 7,
      initial: gmailDoc(
        baseMail({
          messages: [
            ...inbox(),
            msg({ id: "m9", from: P.tony.email, subject: "Invoice #4480 for Riverside Commons", date: "2026-10-16T10:20", body: "Invoice #4480 for the water heater inspection at Riverside Commons is attached.", attachments: [{ name: "Invoice 4480.pdf", size: "198 KB" }] }),
            msg({ id: "m10", from: P.brightclean.email, subject: "Hallway carpet cleaning, Elm Street Apartments", date: "2026-10-21T07:48", unread: true, body: "We can clean the second-floor hallway carpet at Elm Street Apartments on Saturday. Please confirm by Thursday." }),
            msg({ id: "m11", from: P.grace.email, subject: "Question about the roof estimate", date: "2026-10-21T09:40", unread: true, body: "Hi Jordan, when will the roof estimate for Riverside Commons be ready? Thanks, Grace" }),
            msg({ id: "m12", from: P.tony.email, subject: "Technician running 10 minutes late", date: "2026-10-15T08:02", box: "archive", body: "Our technician is running about 10 minutes late to Elm Street Apartments." }),
          ],
        }),
      ),
      tasks: [
        { instruction: "Create a label named “Vendors”.", hint: "In the left menu, next to Labels, select Create new label (+). Type Vendors and select Create.", steps: [{ action: { kind: "type", target: "newlabel", value: "Vendors" } }] },
        { instruction: "Apply the Vendors label to the Bright Clean Services message “Hallway carpet cleaning, Elm Street Apartments.” Keep it in the inbox.", hint: "Check the box next to the message › Labels (tag icon) at the top › check Vendors › Apply.", steps: [cmd("gm.labels", "Vendors", "msg:m10", "Check the box next to the Bright Clean Services message first.")] },
        {
          instruction: "Use search operators to find every message from Russo Plumbing that has an attachment.",
          hint: "In Search mail, type from:russo has:attachment and press Enter.",
          steps: [{ action: { kind: "command", id: "gm.search", value: ["from:russo has:attachment", "from:russoplumbing has:attachment", "from:russoplumbing.example has:attachment", "from:tony@russoplumbing.example has:attachment", "from:\"russo plumbing\" has:attachment", "from:(russo plumbing) has:attachment"] } }],
        },
        {
          instruction: "Create a filter for mail from tony@russoplumbing.example that skips the inbox and applies the Vendors label. Apply it to the matching conversations too.",
          hint: "Search box › Show search options (sliders icon) › From: tony@russoplumbing.example › Create filter › check Skip the Inbox (Archive it) › check Apply the label and choose Vendors › check Also apply filter to … matching conversations › Create filter.",
          steps: [form("filter", "From: tony@russoplumbing.example\nSkip the Inbox (Archive it)\nApply the label: Vendors\nAlso apply filter to matching conversations", [["From: tony@russoplumbing.example", "From: russoplumbing.example", "From: russo"], "Skip the Inbox (Archive it)", "Apply the label: Vendors", "Also apply filter to matching conversations"])],
        },
        { instruction: "Open the Vendors label to check that the Russo Plumbing messages and the Bright Clean message are all there.", hint: "In the left menu under Labels, select Vendors.", steps: [cmd("gm.go", "label:Vendors")] },
        { instruction: "Go back to the inbox and snooze Grace Holloway's message “Question about the roof estimate” until tomorrow. You'll have the estimate then.", hint: "Inbox › point to Grace's message › Snooze (clock) › Tomorrow. Or open it and select Snooze at the top.", steps: [cmd("gm.snooze", "Tomorrow", "msg:m11", "Point to Grace Holloway's message (or check its box) before you choose Snooze.")] },
      ],
    },
  ],

  [L("spam-phishing-safety")]: [
    {
      id: "gw-m6-spam-phishing-safety-1",
      app: "gmail",
      title: "Handle suspicious mail safely",
      scenario: "A message claims your mailbox will be shut down, a prize offer showed up, a newsletter you no longer want keeps coming, and a real bill landed in Spam.",
      fileName: "Gmail",
      minutes: 6,
      initial: gmailDoc(
        baseMail({
          messages: [
            ...inbox(),
            msg({ id: "p1", from: P.itfake.email, subject: "Action required: your mailbox will be deactivated", date: "2026-10-21T09:55", unread: true, body: "Dear user,\n\nYour mailbox has exceeded its storage limit and will be DEACTIVATED within 24 hours. To keep your email, verify your account now:\n\n[Verify your account](http://parkview-pm-help.example/verify-login)\n\nParkview IT Support" }),
            msg({ id: "p2", from: P.prize.email, subject: "You've won a $500 gift card!", date: "2026-10-21T08:41", unread: true, body: "Congratulations! Claim your $500 gift card today. Just pay a $4.99 processing fee: [Claim now](http://claim-rewards-now.example/claim)" }),
            msg({ id: "p3", from: P.webinar.email, subject: "This week: fair housing basics for small landlords", date: "2026-10-20T12:00", category: "Primary", unsubscribe: true, body: "Join our free webinar on fair housing basics. You are receiving this because you signed up at landlordlearninghub.example." }),
            msg({ id: "p4", from: P.water.email, subject: "Past-due notice: Elm Street Apartments water account", date: "2026-10-18T07:30", box: "spam", body: "Our records show the water account for Elm Street Apartments (account 55-1311) has a past-due balance of $96.40. Please pay by the due date on your statement." }),
          ],
        }),
      ),
      tasks: [
        { instruction: "Open the message “Action required: your mailbox will be deactivated.”", hint: "Select the message in the inbox.", steps: [cmd("gm.open", "p1")] },
        { instruction: "Look at the sender's address: it isn't from parkviewpm.example. Report the message as phishing.", hint: "In the message, select More message options (three dots, next to Reply) › Report phishing › Report phishing message.", steps: [cmd("gm.phishing", undefined, "msg:p1")] },
        { instruction: "Report the “You've won a $500 gift card!” message as spam.", hint: "Check the box next to the message (or open it) › Report spam (stop-sign icon) at the top.", steps: [cmd("gm.spam", undefined, "msg:p2", "Check the box next to the gift card message first.")] },
        { instruction: "You signed up for the Landlord Learning Hub newsletter but don't want it anymore. Unsubscribe from it.", hint: "Open the newsletter › select Unsubscribe next to the sender's name › Unsubscribe.", steps: [cmd("gm.unsubscribe", undefined, "msg:p3")] },
        { instruction: "Open the Spam folder.", hint: "In the left menu, select More, then Spam.", steps: [cmd("gm.go", "spam")] },
        { instruction: "The City Water past-due notice is a real bill that landed in Spam by mistake. Mark it as not spam.", hint: "In Spam, check the box next to the City Water message (or open it) › Not spam.", steps: [cmd("gm.notSpam", undefined, "msg:p4", "Check the box next to the City Water message first.")] },
      ],
    },
  ],
};
