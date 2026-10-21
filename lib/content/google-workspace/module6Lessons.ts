import { Lesson } from "@/types/lesson";

const IMG = "/images/google-workspace/module-6";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

/** Module 6: Gmail. Scenario: Maple Street Property Management (fictional). */
export const gwModule6Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "gmail-inbox-basics",
    title: "Find Your Way Around Gmail",
    description:
      "Learn the parts of the Gmail screen, how inbox tabs sort your mail, how stars and importance markers flag what matters, and when to archive a message instead of deleting it.",
    objectives: [
      "Name the main parts of Gmail on a computer: Compose, the main menu, Search mail, Settings, inbox tabs, and the side panel",
      "Explain what the Primary, Promotions, Social, Updates, and Forums tabs hold, move a message to another tab, and choose which tabs to show",
      "Flag messages with stars and importance markers, and find them again",
      "Decide whether to archive or delete a message, and find archived mail in All Mail and deleted mail in Trash",
    ],
    duration: "20 min",
    slides: slides("gmail-inbox-basics", [
      "Gmail at work: the same app for personal and Google Workspace accounts",
      "The Gmail screen: main menu, Compose, Search mail, Settings, tabs, side panel",
      "Inbox tabs: Primary, Promotions, Social, Updates, Forums",
      "Stars and importance markers: two ways to flag a message",
      "Archive or delete? Archive keeps it in All Mail; Trash empties after 30 days",
      "Quick check: archive, delete, or keep?",
    ]),
    sections: [
      {
        heading: "Your new work inbox",
        blocks: [
          {
            type: "scenario",
            role: "You are the new office assistant at Maple Street Property Management, a small company that manages apartment buildings.",
            text: "On your first morning, Denise Carter, the office manager, tells you the whole office runs on Google Workspace: email in Gmail, schedules in Google Calendar, files in Google Drive, and meetings in Google Meet. When you open Gmail, there are already messages from coworkers, a plumbing company, the water utility, and a store you have never heard of.",
            task: "Learn the Gmail screen well enough to sort a busy inbox in a few minutes.",
          },
          {
            type: "paragraph",
            text: "Gmail is Google's email service. A personal Google Account has an address that ends in @gmail.com. A work or school account on Google Workspace uses the organization's own domain, such as jlee@maplestreetpm.example. Either way, you use the same Gmail app in a web browser at mail.google.com, so what you practice here works for both.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Google Workspace", definition: "Google's set of work apps (Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, Chat) that an organization manages for its people." },
              { term: "Conversation", definition: "A message and all of its replies, shown together. Gmail groups replies with the original message." },
              { term: "Inbox tabs (categories)", definition: "Primary, Promotions, Social, Updates, and Forums. Gmail sorts incoming mail into the tabs you turn on." },
              { term: "Archive", definition: "Removes a message from the inbox but keeps it. You can still find it in All Mail and by searching." },
              { term: "Trash", definition: "Where deleted messages go. You can recover them for up to 30 days; after that they are permanently deleted." },
              { term: "Star", definition: "A flag you add to a message so you can find it again under Starred." },
            ],
          },
        ],
      },
      {
        heading: "The parts of the Gmail screen",
        blocks: [
          {
            type: "image",
            src: `${IMG}/gmail-inbox-basics/infographic.png`,
            alt: "Quick reference: the parts of the Gmail screen, the five inbox tabs, and what archive, delete, star, and importance markers do.",
            caption: "Keep this quick reference handy while you learn Gmail.",
          },
          {
            type: "table",
            caption: "Gmail on a computer, from left to right",
            columns: ["Part", "What it is for"],
            rows: [
              ["App switcher (far left)", "Switch between Mail, Chat, and Meet without leaving Gmail"],
              ["Main menu (three lines)", "Show or hide the list of mailboxes: Inbox, Starred, Snoozed, Sent, Drafts, and More (Important, Scheduled, All Mail, Spam, Trash), plus your labels"],
              ["Compose", "Start a new message"],
              ["Search mail", "Find messages by words, people, or search operators. Show search options opens a form for detailed searches and filters"],
              ["Settings (gear)", "Quick settings, such as which inbox tabs to show, and See all settings for everything else"],
              ["Inbox tabs", "Primary, Promotions, Social, Updates, and Forums (only the tabs you turn on appear)"],
              ["Side panel (far right)", "Open Calendar, Keep, Tasks, and Contacts next to your mail"],
            ],
          },
          {
            type: "tip",
            text: "On a shared or public computer, sign out when you finish: select your profile picture or initial at the top right, then Sign out. Closing the tab can leave you signed in for the next person.",
          },
        ],
      },
      {
        heading: "Inbox tabs sort mail for you",
        blocks: [
          {
            type: "paragraph",
            text: "Gmail can sort incoming mail into tabs across the top of the inbox. Primary holds messages from people you know and anything that doesn't fit another tab. Promotions holds deals and offers. Social holds messages from social networks and media sites. Updates holds confirmations, receipts, bills, and statements. Forums holds messages from online groups and mailing lists. Gmail decides where each message goes, and you can correct it.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "To move a message to the right tab, drag it from the message list onto the tab. A notice appears at the bottom left with Undo in case you dropped it in the wrong place.",
              "To choose which tabs appear, select Settings (gear) at the top right. In Quick settings, under Inbox type, make sure Default is selected, then select Customize.",
              "Check the tabs you want and select Save. Primary is always on. To turn tabs off completely, choose a different inbox type.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Which tab would Gmail use?",
            prompt: "Drag each message to the inbox tab it most likely lands in.",
            buckets: [
              { id: "primary", label: "Primary" },
              { id: "promotions", label: "Promotions" },
              { id: "social", label: "Social" },
              { id: "updates", label: "Updates" },
            ],
            items: [
              { id: "a", text: "Denise Carter: “Welcome aboard, Jordan!”", bucket: "primary" },
              { id: "b", text: "Office Supply Depot: “30% off printer paper this week”", bucket: "promotions" },
              { id: "c", text: "City Water Utility: “Your October statement is ready”", bucket: "updates" },
              { id: "d", text: "Neighborly: “3 neighbors posted near Maple Street”", bucket: "social" },
              { id: "e", text: "Luis Ortega: “Showing at 214 Elm St moved to Thursday”", bucket: "primary" },
              { id: "f", text: "An online store: “Your order has shipped”", bucket: "updates" },
            ],
            explanation: "Messages from people go to Primary. Deals go to Promotions, social network notices go to Social, and bills, receipts, and shipping notices go to Updates. If Gmail guesses wrong, drag the message to the right tab.",
          },
          {
            type: "callout",
            variant: "info",
            text: "If you also use Outlook, the idea is similar to Outlook's Focused and Other tabs: the app sorts mail so the messages from people stand out. In Gmail you can have up to five tabs instead of two.",
          },
        ],
      },
      {
        heading: "Stars and importance markers",
        blocks: [
          {
            type: "paragraph",
            text: "A star is a flag you set yourself. To star a message, select the star to the left of it in the inbox, or open the message and select the star next to the date. Every starred message appears under Starred in the main menu, and you can search for is:starred.",
          },
          {
            type: "paragraph",
            text: "The importance marker is the tag-shaped marker next to the star. Gmail fills it in yellow when it thinks a message matters, based on things like whom you email often and which messages you open and reply to. Select the marker to correct Gmail; that also teaches it what you consider important. Search for is:important to see every message marked important. If you don't want markers, go to Settings, See all settings, the Inbox tab, and choose No markers under Importance markers.",
          },
          {
            type: "table",
            caption: "Star or importance marker?",
            columns: ["", "Star", "Importance marker"],
            rows: [
              ["Who sets it", "You", "Gmail, and you can correct it"],
              ["Use it for", "Messages you need to come back to: a task, a question to answer, a document to read", "A signal that a sender or topic matters, so Gmail ranks similar mail higher"],
              ["Find them", "Starred in the main menu, or search is:starred", "Search is:important (Important under More)"],
            ],
          },
        ],
      },
      {
        heading: "Archive or delete?",
        blocks: [
          {
            type: "paragraph",
            text: "Archiving takes a message out of the inbox without deleting it. It stays in All Mail, it still shows up when you search, and if someone replies, the conversation comes back to your inbox. Use Archive (the box with a down arrow, or the E key) for anything you are done with but might need later: a confirmation, an FYI, a finished conversation.",
          },
          {
            type: "paragraph",
            text: "Deleting moves a message to Trash. You can recover it for up to 30 days: open Trash (under More), check the message, select Move to, and choose where it goes. After 30 days it is permanently deleted. Use Delete for things you will never need, such as an expired sale.",
          },
          {
            type: "worked-example",
            title: "Clearing the inbox on your first morning",
            task: "Get the Maple Street inbox down to the messages that still need you.",
            steps: [
              { move: "Open the Promotions tab and delete the printer paper sale.", why: "A sale email has no business value later, so it can go to Trash." },
              { move: "Archive Marcus's FYI about the pest control visit.", why: "It needs no action, but the office might need to know when the visit happened. Archive keeps it searchable." },
              { move: "Star Denise's welcome message.", why: "It lists things to ask about this week, so you want to find it quickly under Starred." },
              { move: "Leave Luis's showing message in the inbox.", why: "It still needs a reply. The inbox works best as a to-do list of what still needs you." },
            ],
            result: "The inbox holds only conversations that need action, and nothing useful was thrown away.",
            takeaway: "Archive what you are done with; delete only what you will never need; star what you must come back to.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Archive, delete, or keep in the inbox?",
            prompt: "Drag each message to the best action for the Maple Street office.",
            buckets: [
              { id: "archive", label: "Archive" },
              { id: "delete", label: "Delete" },
              { id: "keep", label: "Keep in the inbox (still needs you)" },
            ],
            items: [
              { id: "a", text: "Invoice receipt from QuickFix Plumbing that Priya already paid", bucket: "archive" },
              { id: "b", text: "Last week's expired coupon from an office supply store", bucket: "delete" },
              { id: "c", text: "A tenant asking when the hallway will be painted", bucket: "keep" },
              { id: "d", text: "Confirmation that the fire alarm inspection is booked", bucket: "archive" },
              { id: "e", text: "Grace Kim asking for the roof estimate", bucket: "keep" },
              { id: "f", text: "A message you sent to yourself to test your new account", bucket: "delete" },
            ],
            explanation: "Finished business records (paid invoices, confirmations) belong in the archive, where you can search for them later. Junk and tests can be deleted. Anything that still needs an answer stays in the inbox until you handle it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You archived a message from Marcus last week. Where can you find it now?",
            options: ["In Trash", "In All Mail, or by searching for it", "Nowhere; archiving removes it from Gmail", "Only in the Sent folder"],
            correctIndex: 1,
            explanation: "Archiving only removes a message from the inbox. It stays in All Mail and still appears in search results.",
            optionRationales: [
              "Trash holds deleted messages, not archived ones.",
              "Correct. Archived mail stays in All Mail and shows up in searches.",
              "Archive is the safe choice precisely because it keeps the message.",
              "Sent holds messages you sent. Marcus's message was sent to you.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You deleted a vendor's message by mistake three days ago. What should you do?",
            options: [
              "Nothing; deleted messages are gone immediately",
              "Open Trash, check the message, select Move to, and choose Inbox",
              "Ask the vendor to resend it; Trash can't be opened",
              "Search All Mail; deleted messages stay there",
            ],
            correctIndex: 1,
            explanation: "Deleted messages stay in Trash for up to 30 days, so a message deleted three days ago can still be moved back.",
            optionRationales: [
              "Messages stay in Trash for up to 30 days before Gmail permanently deletes them.",
              "Correct. Move it out of Trash within 30 days and it's back.",
              "You can open Trash from the main menu (under More) any time.",
              "All Mail doesn't include Trash. Look in Trash itself.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which statement about stars and importance markers is true?",
            options: [
              "Only Gmail can add stars",
              "You add stars yourself; Gmail sets importance markers and you can correct them",
              "Importance markers delete unimportant mail",
              "Stars and importance markers are the same thing",
            ],
            correctIndex: 1,
            explanation: "Stars are your own flags. Importance markers are Gmail's guesses, and selecting a marker corrects Gmail and helps it learn.",
            optionRationales: [
              "Stars are yours: select the star next to a message.",
              "Correct.",
              "Markers only flag messages; they never delete anything.",
              "They look different and do different jobs: one is your flag, the other is Gmail's ranking.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice in your own Gmail. Use a personal Google Account (you can create one for free at accounts.google.com) or your school account if it includes Gmail." },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Gmail at mail.google.com. Write down which inbox tabs you see across the top.",
          "Open Settings (gear) › Quick settings › Inbox type › Customize. Write down which tabs are checked, then select Cancel (or Save if you changed something on purpose).",
          "Star one message you want to come back to. Open Starred to see it.",
          "Archive one message you no longer need in the inbox. Then open More › All Mail and find it.",
          "Write two sentences: when you would archive a work message, and when you would delete one.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your list of tabs, your two sentences, and a screenshot of the archived message in All Mail to your instructor or course folder. If you can't use Gmail on your computer, complete the practice simulation and submit its results page (Print or save results on the finish card).",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "compose-reply-forward",
    title: "Write, Reply, Forward, and Attach",
    description:
      "Compose clear messages, choose To, Cc, or Bcc, pick Reply, Reply all, or Forward, send files as attachments or Google Drive links, and undo a message you just sent.",
    objectives: [
      "Compose a message and decide who goes in To, Cc, and Bcc",
      "Choose Reply, Reply all, or Forward for the situation",
      "Attach a file from your computer, and insert a Google Drive file as a link with the right access",
      "Explain the 25 MB attachment limit for personal Gmail and what Gmail does with larger files",
      "Undo a message right after you send it",
    ],
    duration: "25 min",
    slides: slides("compose-reply-forward", [
      "Compose: To, Cc, Bcc, Subject, message, Send",
      "To, Cc, or Bcc? Who acts, who needs to know, who stays private",
      "Reply, Reply all, or Forward",
      "Attachments and Drive links: the 25 MB rule",
      "Undo Send: a few seconds to catch a mistake",
      "Quick check: which reply button?",
    ]),
    sections: [
      {
        heading: "Writing a new message",
        blocks: [
          {
            type: "scenario",
            role: "You are the office assistant at Maple Street Property Management.",
            text: "Luis's showing moved to Thursday and the whole team needs to know. A plumbing invoice has to get to Priya, the bookkeeper. A tenant needs a repair notice, three tenants need the same water shutoff notice, and Denise wants a walkthrough video that is far too big to attach.",
            task: "Send each message to exactly the right people, with the right files, the first time.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "At the top left, select Compose. A New Message window opens at the bottom right.",
              "In To, type a name or address. Pick the person from the suggestions. To add more than one, put a comma between addresses.",
              "To copy someone, select Cc. To add someone privately, select Bcc.",
              "Add a short, specific subject, such as “Plumbing repair scheduled for Unit 4B”.",
              "Write the message, then select Send at the bottom.",
            ],
          },
          {
            type: "table",
            caption: "To, Cc, or Bcc?",
            columns: ["Field", "Who goes here", "Who can see it", "Maple Street example"],
            rows: [
              ["To", "People who need to read and act", "Everyone on the message", "Andre, the tenant whose sink will be repaired"],
              ["Cc", "People who should know but don't need to act", "Everyone on the message", "Marcus, the maintenance coordinator"],
              ["Bcc", "People whose addresses should stay private", "Only you. Other recipients don't know they were added, and Reply all doesn't reach them", "Three tenants getting the same shutoff notice"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Tenant, customer, and client email addresses are private information. When you send one message to many people who don't know each other, put them in Bcc and put your own address (or the office's) in To.",
          },
        ],
      },
      {
        heading: "Reply, Reply all, or Forward",
        blocks: [
          {
            type: "paragraph",
            text: "Open a message, and below it you'll see Reply, Reply all (when there's more than one recipient), and Forward. Reply sends your answer only to the sender. Reply all sends it to the sender and everyone in the To and Cc lines. Forward sends the message, with its attachments, to someone new, and you can add a note at the top.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the right button",
            prompt: "Drag the right choice onto each situation.",
            items: [
              { id: "a", text: "Luis wrote to you, Denise, and Marcus that a showing moved, and everyone needs your confirmation.", match: "Reply all" },
              { id: "b", text: "Denise welcomed you by email and copied the whole office. You want to thank her.", match: "Reply" },
              { id: "c", text: "A vendor sent you an invoice that Priya, the bookkeeper, must pay.", match: "Forward" },
              { id: "d", text: "You need to tell a tenant about a new parking rule, and there's no earlier email about it.", match: "Compose a new message" },
            ],
            explanation: "Reply all only when everyone on the thread needs your answer. A thank-you goes to one person. Forward when someone who wasn't on the message needs it. A new topic gets a new message with its own clear subject.",
          },
          {
            type: "tip",
            text: "Before you select Reply all, look at who is on the message. A reply meant for one person that goes to the whole office is one of the most common workplace email mistakes. You can change which button is the default in Settings › See all settings › General › Default reply behavior.",
          },
        ],
      },
      {
        heading: "Attachments and Google Drive links",
        blocks: [
          {
            type: "paragraph",
            text: "To attach a file from your computer, select Attach files (the paper clip) at the bottom of the compose window, choose the file, and select Open. In a personal Gmail account, attachments can total up to 25 MB; in a work or school account, your Google Workspace administrator sets the limit. If a file is larger than the limit, Gmail doesn't attach it. It adds a Google Drive link instead.",
          },
          {
            type: "paragraph",
            text: "To share a file that's already in Google Drive, select Insert files using Drive (the Drive icon), pick the file, and select Insert. A Drive link works for any file in Drive, including Google Docs, Sheets, Slides, and Forms. Sending a Drive file as an attachment works only for files that weren't created in Docs, Sheets, Slides, or Forms. When you send, Gmail checks whether your recipients can open the file. If they can't, it prompts you to change the file's sharing settings first.",
          },
          {
            type: "table",
            caption: "Attachment or Drive link?",
            columns: ["", "Attachment", "Google Drive link"],
            rows: [
              ["What the recipient gets", "Their own copy of the file", "A link to the one file in your Drive"],
              ["Edits after you send", "Your later changes don't reach them", "They always see the current version"],
              ["Size", "Up to 25 MB in personal Gmail", "Works for large files"],
              ["Access", "Anyone who gets the email has the copy", "Only people you give access to can open it"],
            ],
          },
          {
            type: "worked-example",
            title: "Sending the Tenant Handbook to a new applicant",
            task: "Rosa Delgado applied for an apartment and needs the Tenant Handbook, a Google Doc in the office Drive.",
            steps: [
              { move: "Compose a message to Rosa and select Insert files using Drive.", why: "The handbook is a Google Doc, so it can only be sent as a Drive link." },
              { move: "Pick Tenant Handbook and select Insert, then Send.", why: "Gmail checks access when you send." },
              { move: "When Gmail says Rosa can't open the file, choose that recipients can view it.", why: "Rosa needs to read the handbook, not change it. View access keeps the office's copy safe." },
            ],
            result: "Rosa can open and read the current handbook, and only the office can edit it.",
            takeaway: "Share Drive files with the least access the person needs: view to read, comment to suggest, edit only for coworkers who maintain the file.",
          },
        ],
      },
      {
        heading: "Undo Send",
        blocks: [
          {
            type: "paragraph",
            text: "Right after you select Send, a “Message sent” notice appears at the bottom left with Undo and View message. Select Undo and Gmail cancels the send and reopens your message so you can fix it. You only have a few seconds. To give yourself more time, go to Settings › See all settings and, next to Undo Send, choose a cancellation period of 5, 10, 20, or 30 seconds, then select Save Changes at the bottom.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Undo Send works because Gmail waits those few seconds before it actually sends. Once the period is over, the message is gone and can't be pulled back, so read it once more before you select Send.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You need to email 12 tenants about a parking lot repaving. They don't know each other. How should you address it?",
            options: ["Put all 12 in To", "Put all 12 in Cc", "Put your own address in To and the 12 tenants in Bcc", "Send 12 separate copies with Forward"],
            correctIndex: 2,
            explanation: "Bcc keeps each tenant's address private, and Reply all from a tenant won't reach the others.",
            optionRationales: [
              "Everyone in To can see everyone else's address.",
              "Cc addresses are visible to everyone too.",
              "Correct. Bcc protects their privacy.",
              "Forward is for passing along a message you received. It's also slow and easy to get wrong.",
            ],
          },
          {
            type: "knowledge-check",
            question: "In your personal Gmail, you attach a 180 MB video. What happens?",
            options: ["Gmail refuses to send anything", "Gmail adds a Google Drive link instead of an attachment", "Gmail shrinks the video to 25 MB", "The video is split into several emails"],
            correctIndex: 1,
            explanation: "Files over the 25 MB limit are sent as Google Drive links.",
            optionRationales: [
              "Gmail offers Drive instead of failing.",
              "Correct.",
              "Gmail doesn't compress files.",
              "Gmail doesn't split files across messages.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Luis emailed you and Denise, with Marcus in Cc. Only Luis needs your answer. Which button?",
            options: ["Reply", "Reply all", "Forward", "Compose"],
            correctIndex: 0,
            explanation: "Reply goes only to the sender. Reply all would send your answer to Denise and Marcus too.",
            optionRationales: ["Correct.", "Reply all includes everyone in To and Cc.", "Forward sends the message to someone new.", "A new message loses the thread's context."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use your own Gmail account. Send these messages to yourself (put your own address in To) so no one else receives practice mail." },
      {
        type: "list",
        ordered: true,
        items: [
          "Compose a message to yourself with the subject “Practice: attachment” and attach any small file from your computer. Send it.",
          "Compose another message to yourself with the subject “Practice: Drive link”. Use Insert files using Drive to insert any file from your Google Drive (create a blank Google Doc first if your Drive is empty). Send it.",
          "Open Settings › See all settings and set Undo Send to 30 seconds. Select Save Changes.",
          "Send yourself a third message and select Undo in the “Message sent” notice. Notice that the message reopens. Then discard it.",
          "Open your Sent folder and take a screenshot that shows the two practice messages.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit the screenshot of your Sent folder and one sentence explaining when you would send a Drive link instead of an attachment. If you can't use Gmail, complete the practice simulations and submit their results pages." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "send-later-and-settings",
    title: "Schedule Send, Confidential Mode, Signatures, and Vacation Replies",
    description:
      "Schedule messages for later, protect sensitive messages with confidential mode, add a professional signature, and set up a vacation responder when you're away.",
    objectives: [
      "Schedule a message to send later, find it in Scheduled, and cancel the send",
      "Send a message in confidential mode and explain what it does and does not prevent",
      "Create a signature and set it as the default for new messages and replies",
      "Turn on the vacation responder for a date range and know how to end it",
    ],
    duration: "25 min",
    slides: slides("send-later-and-settings", [
      "Schedule send: write now, deliver later",
      "Confidential mode: expiration and passcodes",
      "What confidential mode can't stop",
      "A professional signature in four steps",
      "The vacation responder: who gets it and when it ends",
      "Quick check: which setting solves it?",
    ]),
    sections: [
      {
        heading: "Schedule a message",
        blocks: [
          {
            type: "scenario",
            role: "You handle the office mailbox at Maple Street Property Management.",
            text: "Denise likes owner reports to arrive Monday morning, even when you finish them on a Wednesday. Priya needs a heads-up about suspicious bank details without that message getting forwarded around. And you'll be away at a training next week, so people who email you need to know whom to contact.",
            task: "Use Gmail's sending options and settings so your mail works even when you aren't at your desk.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Write the message as usual.",
              "Instead of selecting Send, select the arrow next to Send (More send options), then Schedule send.",
              "Choose one of the suggested times, or select Pick date & time, set the date and time, and select Schedule send.",
              "To check it, open Scheduled in the main menu (under More). The message waits there until it goes out.",
              "To stop it, open the message in Scheduled and select Cancel send. The message goes back to Drafts so you can edit it or send it now.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "You can have up to 100 scheduled messages at a time. A scheduled message may go out a few minutes after the time you picked, and it's sent according to the time zone you chose when you scheduled it.",
          },
        ],
      },
      {
        heading: "Confidential mode",
        blocks: [
          {
            type: "paragraph",
            text: "Confidential mode adds limits to a message. Recipients can't forward, copy and paste, print, or download the message text and attachments, and you can make the message expire. To use it, select Toggle confidential mode (the lock with a clock) at the bottom of the compose window, choose an expiration date, choose whether recipients need an SMS passcode, and select Save.",
          },
          {
            type: "table",
            caption: "Passcode options",
            columns: ["Option", "What the recipient does"],
            rows: [
              ["No SMS passcode", "Recipients can open the email directly in Gmail."],
              ["SMS passcode", "Gets a passcode by text message on their phone and enters it to open the email. You need their phone number."],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Confidential mode is not a lock. Recipients can still take screenshots or photos of the message. Don't treat it as permission to email information your office's policy says shouldn't be emailed at all, such as full bank account or Social Security numbers.",
          },
        ],
      },
      {
        heading: "Your signature",
        blocks: [
          {
            type: "paragraph",
            text: "A signature is the text added to the end of your messages: your name, title, company, and work phone. In Gmail on a computer, open Settings (gear) › See all settings. On the General tab, scroll to Signature, create your signature, and type the text. You can set a default signature for new emails and another for replies and forwards. Select Save Changes at the bottom of the page. A signature can be up to 10,000 characters, and images count toward that limit.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the signature steps in order",
            prompt: "Drag the steps into the order you'd do them.",
            items: [
              { id: "1", text: "Select Settings (gear), then See all settings" },
              { id: "2", text: "On the General tab, scroll to Signature and select Create new" },
              { id: "3", text: "Name the signature and type your name, title, company, and phone" },
              { id: "4", text: "Under Signature defaults, choose it for new emails and for replies and forwards" },
              { id: "5", text: "Scroll to the bottom and select Save Changes" },
            ],
            explanation: "Settings changes on the See all settings pages don't take effect until you select Save Changes at the bottom.",
          },
          {
            type: "tip",
            text: "While writing a message, the Insert signature button (a pen) at the bottom of the compose window lets you switch signatures or remove the signature from that one message.",
          },
        ],
      },
      {
        heading: "The vacation responder",
        blocks: [
          {
            type: "paragraph",
            text: "The vacation responder sends an automatic reply while you're away. Open Settings › See all settings. On the General tab, find Vacation responder and select Vacation responder on. Enter the first day, an optional last day, a subject, and a message, and choose whether only people in your Contacts get the reply. Select Save Changes.",
          },
          {
            type: "list",
            items: [
              "Most people get the automatic reply only the first time they email you. If they write again more than four days later and the responder is still on, they get it again.",
              "To stop it early, select End now on the banner across the top of your inbox.",
              "If you set a last day, it ends at 11:59 PM that day.",
              "A good away message says when you'll be back and whom to contact instead. Don't announce that your home is empty or share personal details.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Outlook calls this feature automatic replies. The idea is the same: dates, a message, and an option to limit replies to people you know.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which Gmail feature solves it?",
            prompt: "Match each problem with the feature that solves it.",
            items: [
              { id: "a", text: "You finished the owner report Wednesday night, but it should arrive Monday at 8:00 AM.", match: "Schedule send" },
              { id: "b", text: "You'll be at a training all week and people need to know whom to contact.", match: "Vacation responder" },
              { id: "c", text: "Every message you send should end with your name, title, and the office phone.", match: "Signature" },
              { id: "d", text: "A note about a vendor's bank details shouldn't be forwarded and should expire.", match: "Confidential mode" },
              { id: "e", text: "You want 30 seconds to catch mistakes after selecting Send.", match: "Undo Send setting" },
            ],
            explanation: "Each of these is a few clicks once you know where it lives: Schedule send is under the arrow next to Send, confidential mode is in the compose toolbar, and the others are in Settings › See all settings › General.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You scheduled a message for Monday, but the client asked for it today. What's the quickest fix?",
            options: ["Delete it from Sent", "Open it in Scheduled, select Cancel send, then send the draft now", "Wait until Monday", "Change your computer's clock"],
            correctIndex: 1,
            explanation: "Cancel send returns the scheduled message to Drafts, where you can send it immediately.",
            optionRationales: ["Scheduled messages aren't in Sent yet.", "Correct.", "The client wanted it today.", "Gmail schedules on its servers; your clock doesn't matter."],
          },
          {
            type: "knowledge-check",
            question: "Which is true about confidential mode?",
            options: ["Recipients can't take screenshots", "It turns off forwarding, copying, printing, and downloading, but recipients can still take screenshots", "It encrypts the message so no one at Google can see it", "It only works with an SMS passcode"],
            correctIndex: 1,
            explanation: "Confidential mode limits what recipients can do in Gmail, but it can't stop screenshots or photos.",
            optionRationales: ["Google warns that screenshots and photos are still possible.", "Correct.", "That's not what confidential mode promises; it limits recipient actions.", "No SMS passcode is an option too."],
          },
          {
            type: "knowledge-check",
            question: "Your vacation responder is on. A tenant emails you Monday and again Tuesday. How many automatic replies do they get?",
            options: ["Two, one per message", "One; most people get it only the first time, and again only after four days", "None; tenants aren't in your Contacts", "One per hour"],
            correctIndex: 1,
            explanation: "Gmail replies once, then again only if the person writes after four days while the responder is still on (or after you edit the reply).",
            optionRationales: ["Gmail avoids replying to every message.", "Correct.", "Only if you checked the Contacts-only option and they aren't a contact.", "Gmail doesn't reply hourly."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use your own Gmail account for these steps, and send practice messages only to yourself." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a signature with your name and the line “BEOC Office Assistant student”. Set it as the default for new emails and select Save Changes.",
          "Compose a message to yourself and schedule it for tomorrow morning. Open Scheduled and take a screenshot. Then cancel the send.",
          "Compose a message to yourself in confidential mode that expires in 1 day. Send it, open it from your inbox, and notice what's missing (for example, the Forward option).",
          "Turn on the vacation responder for any future date range with a short professional message. Take a screenshot of the settings, then turn it off and select Save Changes.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your three screenshots (Scheduled, the confidential message, and the vacation responder settings) to your instructor or course folder. If you can't use Gmail, complete the practice simulation and submit its results page." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "organize-labels-filters-search",
    title: "Organize with Labels, Filters, Search, and Snooze",
    description:
      "Use labels instead of folders, find any message in seconds with search operators, let filters sort mail as it arrives, and snooze messages until you need them.",
    objectives: [
      "Create a label, apply it to a conversation, and explain how labels differ from folders",
      "Find messages with search operators such as from:, subject:, has:attachment, and older_than:",
      "Create a filter from your search and apply it to mail you already have",
      "Snooze a message so it returns to your inbox when you need it",
    ],
    duration: "25 min",
    slides: slides("organize-labels-filters-search", [
      "Labels, not folders: one message can have several labels",
      "Create and apply a label",
      "Search operators: find anything in seconds",
      "Filters: rules that sort mail as it arrives",
      "Snooze: make a message come back later",
      "Quick check: match the operator",
    ]),
    sections: [
      {
        heading: "Labels instead of folders",
        blocks: [
          {
            type: "scenario",
            role: "You keep the Maple Street office mailbox organized.",
            text: "Vendor invoices from QuickFix Plumbing and Bright Clean Services are scattered through the inbox. Denise wants all vendor mail in one place, out of the inbox, without losing anything, and Grace Kim's question about the roof estimate shouldn't clutter your inbox until the estimate is ready.",
            task: "Set up Gmail so vendor mail sorts itself and nothing slips through the cracks.",
          },
          {
            type: "paragraph",
            text: "Gmail organizes mail with labels. A label works like a tag: one conversation can have several labels, such as Vendors and 214 Elm St, and still be in the inbox. A folder can only hold a message in one place. Labels are private: only you see the labels you put on your mail, and the people you write to don't.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "To create a label, on the left next to Labels, select Create new label (+). Enter a name and select Create. To put it inside another label, check Nest label under and pick the parent.",
              "To label a conversation, check the box next to it (or open it), select Labels (the tag icon) at the top, check the label, and select Apply.",
              "To move a conversation to a label, select Move to instead. Move to adds the label and takes the conversation out of the inbox.",
              "To see everything with a label, select the label on the left.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "If you're used to Outlook, a Gmail label is like a folder you can use more than once, and a Gmail filter is like an Outlook rule.",
          },
        ],
      },
      {
        heading: "Search like a pro",
        blocks: [
          {
            type: "paragraph",
            text: "Type in Search mail at the top and press Enter. Plain words search everything. Search operators narrow it down. You can combine them: from:quickfix has:attachment finds only QuickFix messages with attachments.",
          },
          {
            type: "table",
            caption: "Search operators you'll use most",
            columns: ["Operator", "Finds", "Example"],
            rows: [
              ["from:", "Mail from a person", "from:priya"],
              ["to:", "Mail sent to a person", "to:grace"],
              ["subject:", "Words in the subject", "subject:invoice"],
              ["has:attachment", "Messages with attachments", "from:quickfix has:attachment"],
              ["filename:", "Attachments by name or type", "filename:pdf"],
              ["is:unread / is:starred", "Unread or starred mail", "is:unread label:vendors"],
              ["label:", "Mail with a label", "label:vendors"],
              ["older_than: / newer_than:", "Mail older or newer than a period (d, m, y)", "older_than:1y"],
              ["\" \" (quotes)", "An exact phrase", "\"roof estimate\""],
              ["- (minus)", "Leave out a word", "invoice -paid"],
              ["in:anywhere", "Include Spam and Trash", "in:anywhere lease"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the search to the job",
            prompt: "Drag each search onto what it finds.",
            items: [
              { id: "a", text: "Every message Priya sent you", match: "from:priya" },
              { id: "b", text: "Messages with a PDF attached", match: "filename:pdf" },
              { id: "c", text: "Mail with “invoice” in the subject", match: "subject:invoice" },
              { id: "d", text: "Messages older than one year", match: "older_than:1y" },
              { id: "e", text: "Unread messages", match: "is:unread" },
            ],
            explanation: "Each operator ends in a colon, with no space before the value. Combine them with spaces to narrow your search.",
          },
        ],
      },
      {
        heading: "Filters sort mail as it arrives",
        blocks: [
          {
            type: "paragraph",
            text: "A filter is a rule Gmail runs on new mail. It checks each message against your search and then does what you chose: skip the inbox (archive it), mark it as read, star it, apply a label, forward it, delete it, never send it to Spam, always or never mark it as important, or put it in a category.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "In the search box, select Show search options (the sliders icon).",
              "Fill in what to look for, such as From: dispatch@quickfixplumbing.example. Select Search first if you want to preview the matches.",
              "Select Create filter.",
              "Check what the filter should do, for example Skip the Inbox (Archive it) and Apply the label: Vendors.",
              "To sort the mail you already have too, check Also apply filter to matching conversations.",
              "Select Create filter.",
            ],
          },
          {
            type: "paragraph",
            text: "You can also start a filter from a message: check the box next to it, select More (three dots), and choose Filter messages like these. To change or remove a filter later, go to Settings › See all settings › Filters and Blocked Addresses, and select edit or delete next to it.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Be careful with Delete it and Skip the Inbox. A filter that's too broad (for example, everything with the word “invoice”) can hide messages you needed. Test the search first and look at what it finds.",
          },
        ],
      },
      {
        heading: "Snooze",
        blocks: [
          {
            type: "paragraph",
            text: "Snooze takes a message out of your inbox until a time you choose, then brings it back to the top of the inbox. Point to the message and select Snooze (the clock) on the right, or open it and select Snooze at the top. Choose a time such as Later today or Tomorrow, or pick a date and time. Snoozed messages wait under Snoozed in the main menu, and you can search for in:snoozed.",
          },
          {
            type: "worked-example",
            title: "Organizing vendor mail",
            task: "Keep vendor mail together and out of the inbox.",
            steps: [
              { move: "Create a Vendors label.", why: "One place to see every vendor message, whichever building it's about." },
              { move: "Search from:quickfix has:attachment.", why: "Checks exactly which messages a QuickFix filter would catch, before anything moves." },
              { move: "Create a filter: From dispatch@quickfixplumbing.example, Skip the Inbox, Apply the label Vendors, and apply it to matching conversations.", why: "Old and new invoices land under Vendors automatically, so the inbox stays a to-do list." },
              { move: "Snooze Grace's roof estimate question until tomorrow.", why: "You can't answer until the estimate arrives. Snooze brings it back when you can." },
            ],
            result: "Vendor mail sorts itself, and the inbox shows only what needs you today.",
            takeaway: "Search first, then turn a good search into a filter.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "How is a Gmail label different from a folder?",
            options: ["A message can have several labels, and it can stay in the inbox", "Labels delete mail after 30 days", "Other people can see your labels", "Labels only work on sent mail"],
            correctIndex: 0,
            explanation: "Labels work like tags. A folder holds a message in one place; labels can overlap.",
            optionRationales: ["Correct.", "Labels never delete anything; Trash empties after 30 days.", "Only you can see your labels.", "Labels work on any conversation."],
          },
          {
            type: "knowledge-check",
            question: "Which search finds messages from QuickFix that have attachments?",
            options: ["quickfix attachment", "from:quickfix has:attachment", "has:quickfix from:attachment", "subject:quickfix"],
            correctIndex: 1,
            explanation: "from: names the sender and has:attachment requires an attachment.",
            optionRationales: ["Plain words also match messages that just mention QuickFix or attachments.", "Correct.", "The operators are swapped.", "That only checks the subject line."],
          },
          {
            type: "knowledge-check",
            question: "You created a filter that skips the inbox, but last month's matching messages are still in your inbox. Why?",
            options: ["Filters only work on Mondays", "You didn't check Also apply filter to matching conversations", "Filters only work in Outlook", "The messages are too large"],
            correctIndex: 1,
            explanation: "Filters run on new mail. To sort existing mail too, check Also apply filter to matching conversations when you create it.",
            optionRationales: ["Filters run on every new message.", "Correct.", "Gmail filters work in Gmail.", "Size doesn't matter unless your filter checks size."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Organize part of your own Gmail." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a label named BEOC.",
          "Search for messages from one sender who writes to you often, using from: and the sender's name or address. Write down the search you used.",
          "Turn that search into a filter that applies the BEOC label (don't choose Delete it). Check Also apply filter to matching conversations.",
          "Open the BEOC label and take a screenshot.",
          "Snooze one message until tomorrow, and open Snoozed to see it.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your search, a screenshot of the BEOC label, and a screenshot of Snoozed to your instructor or course folder. If you can't use Gmail, complete the practice simulation and submit its results page." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "spam-phishing-safety",
    title: "Stay Safe: Spam, Phishing, and Unwanted Mail",
    description:
      "Spot phishing messages before they trick you, report phishing and spam, rescue real mail from Spam, block senders, and unsubscribe from mail you signed up for.",
    objectives: [
      "Recognize the warning signs of a phishing message",
      "Report a message as phishing or spam, and mark a real message as not spam",
      "Block a sender and unsubscribe from mail you no longer want",
      "Know what to do if you clicked a suspicious link",
    ],
    duration: "20 min",
    slides: slides("spam-phishing-safety", [
      "Phishing: messages built to steal passwords and money",
      "Five warning signs of phishing",
      "Report phishing, report spam, or unsubscribe?",
      "Rescue real mail from Spam",
      "If you clicked a suspicious link",
      "Quick check: phishing or real?",
    ]),
    sections: [
      {
        heading: "What phishing looks like",
        blocks: [
          {
            type: "scenario",
            role: "You check the Maple Street mailbox first thing every morning.",
            text: "Today there's a message from “Maple Street IT Support” saying your mailbox will be deactivated in 24 hours unless you verify your account. There's also a gift card prize, a landlord newsletter you signed up for months ago, and a missing water bill that Priya is asking about.",
            task: "Decide which messages are dangerous, report them correctly, and make sure the real bill isn't lost in Spam.",
          },
          {
            type: "paragraph",
            text: "Phishing is email (or a text or call) designed to trick you into giving away a password, money, or personal information, or into opening a harmful link or file. Gmail checks for phishing and warns you about many dangerous messages, but some get through, so you are the last line of defense. Google's own rule is simple: Gmail will never ask for your password or other personal information by email.",
          },
          {
            type: "table",
            caption: "Warning signs",
            columns: ["Sign", "In the fake IT message"],
            rows: [
              ["The sender's address doesn't match the name", "“Maple Street IT Support” but the address is it-support@maplestreet-pm-help.example, not maplestreetpm.example"],
              ["Urgency or a threat", "“DEACTIVATED within 24 hours”"],
              ["A request for a password or personal information", "“Verify your account now”"],
              ["A link that doesn't go where it says", "Point to the link: it goes to maplestreet-pm-help.example"],
              ["Too good to be true, or an unexpected fee", "The gift card that needs a $4.99 “processing fee”"],
            ],
          },
          {
            type: "tip",
            text: "On a computer, point to a link without clicking. The real address appears at the bottom of the browser window. If it doesn't match the company that supposedly sent the message, don't click.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Phishing or probably real?",
            prompt: "Drag each message to the right group. Look for the warning signs.",
            buckets: [
              { id: "phish", label: "Looks like phishing" },
              { id: "real", label: "Probably real" },
            ],
            items: [
              { id: "a", text: "“Your mailbox will be deactivated. Enter your password here to keep it,” from a lookalike domain", bucket: "phish" },
              { id: "b", text: "Denise, from dcarter@maplestreetpm.example: “Staff meeting moved to 2:00 PM”", bucket: "real" },
              { id: "c", text: "“You won a $500 gift card! Pay a $4.99 fee to claim it”", bucket: "phish" },
              { id: "d", text: "A vendor's “new bank details, please pay today” message you didn't expect", bucket: "phish" },
              { id: "e", text: "City Water, from billing@citywater.example: “Your October statement is ready” with no request for a password", bucket: "real" },
              { id: "f", text: "“IT here. Reply with your login so we can fix your account”", bucket: "phish" },
            ],
            explanation: "Requests for passwords, payment pressure, prizes with fees, and lookalike addresses are classic phishing. Even a message that seems real deserves a second look if it asks you to change how money is paid; call the vendor at a number you already have.",
          },
        ],
      },
      {
        heading: "Report it the right way",
        blocks: [
          {
            type: "table",
            caption: "Which action?",
            columns: ["The message is…", "Do this", "How"],
            rows: [
              ["Trying to steal a password, money, or personal information", "Report phishing", "Open the message › More (three dots, next to Reply) › Report phishing"],
              ["Junk you never asked for", "Report spam", "Check the box (or open it) › Report spam at the top"],
              ["From someone you never want to hear from", "Block the sender", "Open the message › More › Block “sender”. Their future messages go to Spam."],
              ["A newsletter or list you signed up for", "Unsubscribe", "Select Unsubscribe next to the sender's name (or Go to website)"],
              ["Real mail that landed in Spam", "Not spam", "More › Spam › check the message › Not spam"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Only unsubscribe from mail you actually signed up for. Selecting Unsubscribe (or any link) in a phishing or spam message can confirm that your address is active. For those, use Report phishing or Report spam instead.",
          },
          {
            type: "paragraph",
            text: "Check Spam now and then. When a real message is there, such as a bill or a reply from a new tenant, mark it Not spam. That moves it to your inbox and helps Gmail sort similar mail correctly.",
          },
        ],
      },
      {
        heading: "If you clicked",
        blocks: [
          {
            type: "list",
            items: [
              "If a page asks for your password, don't enter it. Close it and go to the real website by typing its address yourself.",
              "If you already typed your password, change it right away from the real site (for a Google Account, at myaccount.google.com).",
              "Review your recent security activity at myaccount.google.com/notifications.",
              "Turn on 2-Step Verification so a stolen password alone can't open your account.",
              "At work, tell your manager or IT contact right away. Reporting quickly protects the whole office.",
            ],
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A message from “Gmail Team” says your account will close unless you reply with your password. What do you do?",
            options: ["Reply with your password", "Report phishing", "Unsubscribe", "Forward it to coworkers to warn them"],
            correctIndex: 1,
            explanation: "Gmail never asks for your password by email. Report it as phishing.",
            optionRationales: ["Never send a password by email.", "Correct.", "Unsubscribing from a scam can confirm your address is active.", "Forwarding spreads the dangerous message. Report it, and tell IT or your manager."],
          },
          {
            type: "knowledge-check",
            question: "Priya says the water bill never arrived. Where should you look first?",
            options: ["Trash", "Spam", "Sent", "Drafts"],
            correctIndex: 1,
            explanation: "Real mail sometimes lands in Spam. If it's there, mark it Not spam.",
            optionRationales: ["Trash only holds mail someone deleted.", "Correct.", "Sent holds mail you sent.", "Drafts holds your unsent messages."],
          },
          {
            type: "knowledge-check",
            question: "Which is the safest way to stop a newsletter you subscribed to on purpose?",
            options: ["Report phishing", "Unsubscribe next to the sender's name", "Delete every issue", "Reply STOP"],
            correctIndex: 1,
            explanation: "For mail you signed up for, Unsubscribe is the right tool.",
            optionRationales: ["It isn't phishing; you signed up.", "Correct.", "Deleting doesn't stop new issues.", "Replying usually doesn't unsubscribe you."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice spotting phishing without clicking anything dangerous." },
      {
        type: "list",
        ordered: true,
        items: [
          "In your own Gmail, open More › Spam. Without opening any links or attachments, look at three messages there. For each, write the sender's address and one warning sign you see.",
          "Find one newsletter you signed up for but no longer read. Write down whether Gmail shows Unsubscribe next to the sender's name. (Unsubscribing is optional.)",
          "Visit myaccount.google.com, select Security, and write down whether 2-Step Verification is on for your account.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your three sender addresses and warning signs, your newsletter note, and your 2-Step Verification status to your instructor or course folder. If you can't use Gmail, complete the practice simulation and submit its results page." },
    ],
  },
];
