import { Lesson } from "@/types/lesson";
import { outlookSlides } from "./slides";

const IMG = "/images/ms-office/outlook/module-2";

export const outlookModule2Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "compose-message",
    title: "Writing a New Message",
    description:
      "Address a message correctly with To, Cc and Bcc, write a subject people can find later, structure the message so the point comes first, and use @mentions and importance only when they help.",
    objectives: [
      "Create a new message and choose between To, Cc and Bcc for each recipient",
      "Write a specific subject line and a message whose first sentence states the purpose",
      "Use an @mention to get one person's attention and add them to the message",
      "Mark a message high importance only when it is truly time-sensitive",
    ],
    duration: "18 min",
    slides: outlookSlides["module-2/compose-message"],
    sections: [
      {
        heading: "Every message has a job",
        blocks: [
          {
            type: "scenario",
            role: "You are the front desk coordinator at Lakeside Medical Associates.",
            text: "Keisha in billing is waiting to hear that the new patients' insurance cards are scanned. Denise wants a copy of anything that goes to billing. Omar needs a heads-up about Saturday's flu clinic, and three volunteers from outside the practice need a reminder. Four messages, four different audiences.",
            task: "Write each message so the right people get it, the subject says what it is, and the reader knows what to do after the first sentence.",
          },
          {
            type: "paragraph",
            text: "To start a message in new Outlook, select New mail on the Home tab, or press Ctrl+N. The message opens in the reading pane, next to your Inbox, and the Ribbon adds the Message, Insert, Format text and Options tabs. Fill in the recipients, type a subject in Add a subject, write the message, and select Send.",
          },
          {
            type: "image",
            src: `${IMG}/new-message.png`,
            alt: "A new message in new Outlook: Send and Discard at the top, the To line with Cc and Bcc buttons at its right end, Add a subject, and the message area. The Ribbon shows the Message tab.",
            caption: "A new message opens in the reading pane. Cc and Bcc are at the right end of the To line.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: New Email on the Home tab (or Ctrl+N) opens the message in its own window, with To, Cc and Subject boxes and the Send button to the left of them.",
          },
        ],
      },
      {
        heading: "To, Cc, or Bcc?",
        blocks: [
          {
            type: "table",
            caption: "Choosing the right line for each recipient",
            columns: ["Line", "Use it for", "Example at Lakeside"],
            rows: [
              ["To", "The people who need to act or answer", "Keisha, who files the insurance cards"],
              ["Cc", "People who should know, but don't need to act", "Denise, who wants a copy of billing messages"],
              ["Bcc", "People who should get the message without seeing each other's addresses", "Outside volunteers, so their personal emails stay private"],
            ],
          },
          {
            type: "paragraph",
            text: "Everyone on the To and Cc lines can see everyone else on those lines, and Reply all reaches all of them. People on the Bcc line are hidden from the other recipients, and they don't get later Reply all messages. In new Outlook, select Cc or Bcc at the right end of the To line to show those lines. Type a few letters of a name and pick the person from the suggestions, or type a full email address.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "When you email a group of patients or outside volunteers, put their addresses in Bcc, not To or Cc. Showing a list of patient email addresses to every patient on the list is a privacy problem, and in a medical office it can be a HIPAA incident.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "To, Cc, or Bcc?",
            prompt: "Put each recipient on the line where they belong.",
            buckets: [
              { id: "to", label: "To" },
              { id: "cc", label: "Cc" },
              { id: "bcc", label: "Bcc" },
            ],
            items: [
              { id: "r1", text: "The billing specialist you are asking to process a claim", bucket: "to" },
              { id: "r2", text: "Your supervisor, who asked to be kept informed", bucket: "cc" },
              { id: "r3", text: "Twelve patients getting a flu clinic reminder", bucket: "bcc" },
              { id: "r4", text: "The vendor who must send you a price quote", bucket: "to" },
              { id: "r5", text: "Outside volunteers who don't know each other", bucket: "bcc" },
              { id: "r6", text: "The physician who referred the patient, for awareness only", bucket: "cc" },
            ],
            explanation: "To is for the people who must act. Cc is for people who need to know. Bcc protects the addresses of people who shouldn't see each other, such as patients and outside volunteers.",
          },
        ],
      },
      {
        heading: "Subject and structure",
        blocks: [
          {
            type: "list",
            items: [
              "Make the subject specific enough to find later: \"Insurance cards scanned: 3 new patients\" beats \"Update.\" Put the key fact first.",
              "Open with a greeting that fits the reader: \"Hi Keisha,\" for a coworker, \"Dear Dr. Lee,\" for an outside physician you haven't met.",
              "State the purpose in the first sentence. \"I scanned the insurance cards for this afternoon's three new patients\" tells Keisha everything before she reads further.",
              "Keep paragraphs to two or three sentences. Use a numbered list for steps and a bulleted list for items.",
              "End with what happens next (\"Let me know if any are missing.\") and your signature. You will set up signatures in Lesson 4.",
              "Never put patient names, dates of birth or diagnoses in a subject line. Subjects show in notifications and message lists where others can see them.",
            ],
          },
          {
            type: "worked-example",
            title: "Rewriting a vague message",
            task: "Taylor's first draft to billing says: Subject \"cards\". \"Hey, did the thing you asked. lmk.\" Make it professional.",
            steps: [
              { move: "Change the subject to \"Insurance cards scanned: 3 new patients\".", why: "Keisha will search for this next week. A specific subject is how she finds it." },
              { move: "Replace \"Hey\" with \"Hi Keisha,\".", why: "\"Hey\" is too casual for work email. A name shows the message was written for her." },
              { move: "Write the purpose: \"I scanned the insurance cards for this afternoon's three new patients.\"", why: "\"The thing you asked\" makes her remember what she asked. Say it." },
              { move: "Replace \"lmk\" with \"Let me know if any are missing.\"", why: "Texting abbreviations read as careless in a professional message." },
            ],
            result: "A message Keisha understands in one read and can find later.",
            takeaway: "Subject that says what it is, first sentence that says why you are writing, last sentence that says what happens next.",
          },
        ],
      },
      {
        heading: "@mentions and importance",
        blocks: [
          {
            type: "paragraph",
            text: "To get one person's attention in a message, type @ and the first few letters of their first or last name in the message text, then pick them from the suggestions. Outlook adds their full name to the message and adds them to the To line. Messages that mention you show an @ symbol in the message list, and you can use Filter › Mentions me to find them.",
          },
          {
            type: "paragraph",
            text: "High importance shows the reader a red exclamation point. Use it rarely, for messages that really are time-sensitive, such as a same-day schedule change. If every message is high importance, none of them stand out. In new Outlook, find High importance and Low importance on the Options tab while you write the message.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: High Importance and Low Importance are in the Tags group on the Message tab of the message window.",
          },
          {
            type: "tip",
            text: "New Outlook saves what you are writing in the Drafts folder as you go. If you click away to check another message, open Drafts to finish it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are sending a flu clinic reminder to twelve patients. Where do their addresses go?",
            options: ["To", "Cc", "Bcc", "Split them between To and Cc"],
            correctIndex: 2,
            explanation: "Bcc hides recipients from each other, which protects patient privacy. Put your own or the office address in To.",
            optionRationales: [
              "Everyone on the To line can see every other address.",
              "Cc addresses are visible to all recipients too.",
              "Correct. Bcc recipients can't see each other's addresses.",
              "Both To and Cc show every address to everyone.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which subject line is best for a message to billing?",
            options: ["Question", "URGENT!!!", "Insurance cards scanned: 3 new patients", "Maria Gonzalez DOB 4/12 insurance card"],
            correctIndex: 2,
            explanation: "A specific subject without patient details tells the reader what the message is and is easy to search for.",
            optionRationales: [
              "\"Question\" says nothing about the content and is impossible to search for.",
              "All capitals and exclamation points read as shouting and don't say what the message is about.",
              "Correct. Specific, searchable, and free of patient information.",
              "Patient names and birth dates should never be in a subject line.",
            ],
          },
          {
            type: "knowledge-check",
            question: "What happens when you @mention Luis Ortega in the text of a message to Priya?",
            options: ["Nothing; it is just text", "Luis is added to the To line", "Luis gets a Teams chat instead", "The message becomes high importance"],
            correctIndex: 1,
            explanation: "When you pick someone from the @mention suggestions, Outlook adds them to the To line so they get the message.",
            optionRationales: [
              "Picking the name from the suggestions does more than type text.",
              "Correct. Mentioned people are added to To by default.",
              "Mentions in Outlook stay in email.",
              "Importance is set separately on the Options tab.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Write three professional messages for Lakeside Medical Associates. You can write them in Outlook (send them to yourself), in the practice simulation, or in a Word document laid out like an email.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "To billing (keisha.grant@lakesidemed.example.com), Cc your supervisor: tell Keisha that two patients' insurance cards were unreadable and need to be rescanned when the patients arrive.",
          "To a referring office (scheduling@riversideimaging.example.com): confirm you received their fax and ask for the appointment time in writing.",
          "To five patients, without showing their addresses to each other: remind them that the office is closed Monday for a staff training day. Write which line each address goes on.",
          "For each message, label the To, Cc and Bcc lines, the subject, the greeting, the purpose sentence and the closing.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your three labeled messages (screenshots of messages you sent to yourself, or a Word document) to your instructor or course folder. Use fictional names only.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "reply-forward",
    title: "Reply, Reply All, and Forward",
    description:
      "Choose between Reply, Reply all and Forward, keep subject lines useful as a thread changes, and check a thread for private information before you forward it.",
    objectives: [
      "Choose Reply, Reply all or Forward for a message based on who needs your answer",
      "Reply and forward from the reading pane or the Home tab",
      "Change a vague subject line when you reply",
      "Check a thread for information the new recipient shouldn't see before forwarding",
    ],
    duration: "15 min",
    slides: outlookSlides["module-2/reply-forward"],
    sections: [
      {
        heading: "Who needs your answer?",
        blocks: [
          {
            type: "scenario",
            role: "You are answering the morning's messages at the Lakeside front desk.",
            text: "Denise asked six people who can cover Saturday's flu clinic and said to reply to her only. Priya asked you and Luis to reply all so you don't both restock Room 3. An imaging center confirmed an MRI that Dr. Patel ordered. Keisha's message is titled just \"Question.\"",
            task: "Pick the right response for each message, and leave each thread easier to follow than you found it.",
          },
          {
            type: "table",
            caption: "Reply, Reply all, or Forward",
            columns: ["Command", "Who gets it", "Use it when"],
            rows: [
              ["Reply", "Only the person who sent the message", "Your answer matters only to the sender, such as volunteering for a shift"],
              ["Reply all", "The sender and everyone on To and Cc", "Everyone on the thread needs your update, such as \"I restocked Room 3\""],
              ["Forward", "People you add; the original and its attachments go along", "Someone who wasn't on the message needs it, such as Dr. Patel and the MRI confirmation"],
            ],
          },
          {
            type: "paragraph",
            text: "In new Outlook, the Reply, Reply all and Forward buttons are at the top right of the message in the reading pane, and on the Home tab. Your reply opens in the reading pane above the original message, with RE: added to the subject (FW: for a forward).",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Reply, Reply All and Forward are in the Respond group on the Home tab, and in the reading pane. Ctrl+R, Ctrl+Shift+R and Ctrl+F are the shortcuts.",
          },
        ],
      },
      {
        heading: "Reply all with care",
        blocks: [
          {
            type: "paragraph",
            text: "Reply all is the source of some of the most common email mistakes: twenty people getting \"Thanks!\", or a private comment reaching everyone on a thread. Before you select Reply all, ask: does every person on To and Cc need this? If the answer is no, use Reply, or reply all and remove the people who don't need it.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Reply or Reply all?",
            prompt: "Decide how to answer each message.",
            buckets: [
              { id: "reply", label: "Reply" },
              { id: "all", label: "Reply all" },
              { id: "fwd", label: "Forward" },
            ],
            items: [
              { id: "q1", text: "The office manager asks the whole staff who can work Saturday, and says reply to her only", bucket: "reply" },
              { id: "q2", text: "Three nurses are deciding together who restocks the supply closet", bucket: "all" },
              { id: "q3", text: "A lab result notice should go to the ordering physician, who wasn't on it", bucket: "fwd" },
              { id: "q4", text: "Everyone was invited to a lunch and you just want to say thanks", bucket: "reply" },
              { id: "q5", text: "A vendor's delivery date changed and the whole team planning the move needs to know", bucket: "all" },
            ],
            explanation: "Reply when only the sender needs your answer. Reply all when everyone on the thread needs your update. Forward when someone new needs the message.",
          },
        ],
      },
      {
        heading: "Keep threads useful",
        blocks: [
          {
            type: "list",
            items: [
              "Change a vague subject when you reply. Click in the subject line and replace \"Question\" with \"RE: Copay amount for Metro Health Plan visits\". Your reply and future replies are easier to find.",
              "Type your answer above the original message. The original stays below for context.",
              "When you forward, add a sentence that tells the new reader why they are getting it: \"Dr. Patel, Riverside Imaging confirmed the MRI for Thursday at 10:30 AM.\"",
              "Forwarding includes the attachments. Replying does not, so if the other person needs the file back, attach it.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Before you forward, scroll through the whole thread. Earlier messages may contain another patient's information, a private comment, or details the new reader shouldn't have. Delete those parts or start a new message instead.",
          },
          {
            type: "worked-example",
            title: "Forwarding an imaging confirmation to a physician",
            task: "Riverside Imaging confirmed an MRI that Dr. Patel ordered. Get the confirmation to her.",
            steps: [
              { move: "Select the message and choose Forward.", why: "Dr. Patel wasn't on the original, so Reply would only go back to the imaging center." },
              { move: "Type Dr. Patel in To and pick her from the suggestions.", why: "Picking from the suggestions uses her internal address, so it can't go to the wrong Dr. Patel." },
              { move: "Write one sentence with the date and time above the original.", why: "She can act without opening the attachment." },
              { move: "Scroll the thread, then Send.", why: "A quick check that nothing else is in the thread. The PDF goes along automatically." },
            ],
            result: "Dr. Patel gets the confirmation with a one-line summary and the attachment.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A message went to 15 staff asking who can cover the front desk Friday, with \"reply to me\" at the end. You are available. What do you do?",
            options: ["Reply all so everyone knows", "Reply to the sender only", "Forward it to yourself", "Ignore it"],
            correctIndex: 1,
            explanation: "The sender asked for direct replies, and only she needs your answer.",
            optionRationales: [
              "Reply all fills 14 other inboxes with a message they don't need.",
              "Correct. Reply goes only to the sender.",
              "Forwarding to yourself doesn't answer the question.",
              "The sender needs to know you are available.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which of these is sent along automatically when you forward a message?",
            options: ["Nothing but the text", "The attachments", "Your Deleted Items", "The sender's signature only"],
            correctIndex: 1,
            explanation: "Forward includes the original message and its attachments. Reply doesn't include attachments.",
            optionRationales: [
              "Forward includes more than the text.",
              "Correct.",
              "Folders are never sent.",
              "The whole original message goes along, not just the signature.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Decide how to answer five messages, then write the answers.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Do the practice simulation in this lesson until every task is done on the first try.",
          "For each of these, write whether you would Reply, Reply all or Forward, and why: (a) the office manager asks the whole staff to confirm they read the new HIPAA policy; (b) two coworkers and you are deciding who opens on Saturday; (c) a lab notice belongs to the nurse practitioner; (d) a coworker thanked everyone for a birthday card; (e) a vendor's message to you should go to billing.",
          "Write the reply or forward text for (b) and (c), including the subject line you would use.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your five decisions with reasons, and the two written messages, to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "attachments-links",
    title: "Attachments and Cloud Links",
    description:
      "Attach files from your computer or share them as OneDrive links, choose who can edit a shared link, fix a wrong attachment, and name files so the reader knows what they are.",
    objectives: [
      "Attach a file from your computer or from OneDrive",
      "Decide between sharing a link and attaching a copy",
      "Check and change the permissions on a shared link",
      "Remove a wrong attachment before you send",
    ],
    duration: "15 min",
    slides: outlookSlides["module-2/attachments-links"],
    sections: [
      {
        heading: "A copy or a link?",
        blocks: [
          {
            type: "scenario",
            role: "You handle files for the Lakeside front desk.",
            text: "Omar needs to add his name to the flu clinic volunteer schedule, which lives in OneDrive. A supply vendor needs a copy of your quote request. And the draft you started to billing has \"Scan0042.pdf\" attached, which turns out to be the wrong patient's card.",
            task: "Send each file the right way, and fix the wrong attachment before it leaves the office.",
          },
          {
            type: "paragraph",
            text: "In new Outlook, select Attach file on the Message tab (in the Insert group) or on the Insert tab. You can pick from suggested files you used recently, browse OneDrive and SharePoint, or choose Browse this computer. For a file stored in OneDrive or SharePoint, Outlook asks whether to send a link or attach a copy.",
          },
          {
            type: "table",
            caption: "Share a link or attach a copy?",
            columns: ["", "Share link", "Attach a copy"],
            rows: [
              ["What the reader gets", "A link to the one file in OneDrive", "Their own separate copy"],
              ["Edits", "Everyone works on the same file", "Each copy changes separately"],
              ["Message size", "Small", "Grows with the file"],
              ["Best for", "Coworkers who need to update a shared file", "People outside your organization, or a final version that shouldn't change"],
            ],
          },
          {
            type: "paragraph",
            text: "When you share a link, select the arrow on the attachment to choose who can use it: people in your organization or only your recipients, and whether they can edit or only view. In a business account the default is that people in your organization can edit, so change it when a file should be view-only.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Attach File is in the Include group on the Message tab of the message window. Choosing a OneDrive file gives the same choice between Share link and Attach as copy.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Link or copy?",
            prompt: "Decide how to send each file.",
            buckets: [
              { id: "link", label: "Share link" },
              { id: "copy", label: "Attach a copy" },
            ],
            items: [
              { id: "f1", text: "The volunteer schedule everyone on the team updates", bucket: "link" },
              { id: "f2", text: "A signed quote request for an outside vendor", bucket: "copy" },
              { id: "f3", text: "The staff phone list that HR keeps current", bucket: "link" },
              { id: "f4", text: "The final, approved patient handout for a printer", bucket: "copy" },
              { id: "f5", text: "A large training video for coworkers", bucket: "link" },
            ],
            explanation: "Links keep one shared, up-to-date file and keep messages small. Copies suit outside recipients and final versions that shouldn't change.",
          },
        ],
      },
      {
        heading: "Check before you send",
        blocks: [
          {
            type: "list",
            items: [
              "Attach first, then write. If you write \"the form is attached\" and forget the file, you have to send a second, apologetic message.",
              "Look at every attachment tile before you send. To remove one, select the X on its tile.",
              "Name files so the reader knows what they are: \"Supply Quote Request.docx\", not \"Document1.docx\" or \"Scan0042.pdf\".",
              "Open a scanned file before attaching it to make sure it is the right patient and the right page.",
              "A file stored in OneDrive can be shared as a link even when it is too large to attach as a copy.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Attaching the wrong patient's document is one of the most common ways patient information goes to the wrong person. If you catch it in a draft, remove the file. If you already sent it, tell your supervisor right away; your practice has a process for possible privacy incidents.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Omar needs to add his name to the volunteer schedule stored in OneDrive. How do you send it?",
            options: ["Attach a copy", "Share a link", "Print it", "Paste the table into the message"],
            correctIndex: 1,
            explanation: "A link lets Omar edit the same file everyone else uses.",
            optionRationales: [
              "A copy would split the schedule into separate versions.",
              "Correct.",
              "Printing doesn't let Omar edit it.",
              "A pasted table can't be updated by everyone.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Your draft has the wrong file attached. What do you do?",
            options: ["Send it and apologize later", "Select the X on the attachment tile, attach the right file, then send", "Delete the whole draft and quit", "Rename the wrong file"],
            correctIndex: 1,
            explanation: "Remove the wrong attachment with the X on its tile, attach the correct file, and check again before sending.",
            optionRationales: [
              "Sending the wrong file can expose another patient's information.",
              "Correct.",
              "You can fix the draft; there's no need to start over.",
              "Renaming doesn't change what is in the file.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice sending files the right way.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a short Word document named \"Volunteer Sign-up Practice.docx\" and save it to your OneDrive (school account) if you have one. If you can't use OneDrive on your computer, skip to step 4.",
          "In Outlook, send yourself a message that shares the document as a link. Change the link permission to view only.",
          "Send yourself a second message with the same document attached as a copy.",
          "Whether or not you did steps 1 through 3, write a short note explaining the difference between the two messages, and when you would use each at Lakeside.",
          "Complete the practice simulation in this lesson.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit screenshots of the two messages (if you did steps 1 through 3) and your note to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "signatures",
    title: "Email Signatures",
    description:
      "Create a professional signature, have Outlook add it to new messages and to replies, and insert a different signature by hand when a message needs it.",
    objectives: [
      "Create a signature in new Outlook from Settings › Accounts › Signatures",
      "Choose which signature Outlook adds to new messages and to replies and forwards",
      "Insert a signature by hand from the Message tab",
      "Decide what belongs in a professional medical office signature",
    ],
    duration: "14 min",
    slides: outlookSlides["module-2/signatures"],
    sections: [
      {
        heading: "Your name on every message",
        blocks: [
          {
            type: "scenario",
            role: "You are setting up your mailbox at Lakeside Medical Associates.",
            text: "Denise wants every front desk message to end with the same signature: your name, your title, the practice name and the front desk number. For quick replies to coworkers, a full signature block on every two-line message is too much.",
            task: "Make a full signature for new messages and a short one for replies, and know how to swap them when a reply goes outside the office.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "On the View tab, select View settings (or select Settings, the gear at the top right), then Accounts › Signatures.",
              "If you have more than one account, choose the account the signature is for.",
              "Select New signature and give it a name you'll recognize, such as Front Desk.",
              "Type and format the signature in the editing box, then select Save.",
              "Under Select default signatures, choose whether Outlook adds it automatically to new messages, to replies and forwards, or both. Leave them set to no signature if you'd rather add it yourself.",
              "Select Save again.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/signatures-settings.png`,
            alt: "Settings, Accounts, Signatures in new Outlook: a signature named Front Desk with the text Taylor Brooks, Front Desk Coordinator, Lakeside Medical Associates and a phone number, and Select default signatures with a choice for new messages and one for replies and forwards",
            caption: "Settings › Accounts › Signatures",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: File › Options › Mail › Signatures. Select New, name the signature, type it in Edit signature, then choose it under New messages and Replies/forwards and select OK.",
          },
        ],
      },
      {
        heading: "Inserting a signature by hand",
        blocks: [
          {
            type: "paragraph",
            text: "When you are writing a message, select Signature on the Message tab (in the Insert group) and pick one of your saved signatures. Use it when the automatic one isn't right, for example, to add your full contact details to a reply going to an outside office.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: in the message window, Message tab › Include group › Signature.",
          },
        ],
      },
      {
        heading: "What belongs in a work signature",
        blocks: [
          {
            type: "table",
            caption: "Professional signature checklist",
            columns: ["Include", "Leave out"],
            rows: [
              ["Full name and job title", "Personal phone number or personal email"],
              ["Practice name", "Quotes, emojis, or decorative images"],
              ["Main phone number and extension", "Your home address"],
              ["The confidentiality notice your practice requires", "Anything your practice hasn't approved"],
            ],
          },
          {
            type: "paragraph",
            text: "Many healthcare organizations add a short confidentiality notice to every signature, telling a reader who got the message by mistake to notify the sender and delete it. Use the exact wording your practice gives you; don't write your own.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Build the signature",
            prompt: "Put the lines of a professional signature in the usual order, top to bottom.",
            items: [
              { id: "s1", text: "Taylor Brooks" },
              { id: "s2", text: "Front Desk Coordinator" },
              { id: "s3", text: "Lakeside Medical Associates" },
              { id: "s4", text: "(555) 010-2400" },
              { id: "s5", text: "The practice's confidentiality notice" },
            ],
            explanation: "Name first, then title, organization and contact number. A required confidentiality notice usually goes last, in smaller text.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where do you create a signature in new Outlook?",
            options: ["File › Options › Mail › Signatures", "Settings › Accounts › Signatures", "Home tab › Signature", "Help tab"],
            correctIndex: 1,
            explanation: "In new Outlook, signatures are under Settings › Accounts › Signatures.",
            optionRationales: [
              "That is the classic Outlook path. New Outlook has no File tab.",
              "Correct.",
              "Signature on the Message tab inserts a saved signature; it doesn't create one.",
              "The Help tab has help commands only.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which item does NOT belong in a work signature?",
            options: ["Job title", "Practice phone number", "Your personal cell phone number", "The practice's confidentiality notice"],
            correctIndex: 2,
            explanation: "Keep personal contact information out of work email. Use the practice's number.",
            optionRationales: [
              "Your title tells readers what you do.",
              "The practice number is how people should reach you.",
              "Correct. Personal numbers don't belong in a work signature.",
              "Many practices require one.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Create your professional signatures.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your own Outlook (new Outlook or Outlook on the web with your school account), create a full signature with your name, \"Office Assistant\", \"Lakeside Medical Associates\" and \"(555) 010-2400\", and set it for new messages.",
          "Create a short signature (name and practice) for replies and forwards.",
          "Send yourself a test message and check that the full signature appears.",
          "On a school computer, do this in the Challenge Lab below.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your Signatures settings and of the test message, or your Challenge Lab results page (Print or save results), to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "send-timing",
    title: "Schedule Send, Undo Send, and Recall",
    description:
      "Give yourself a few seconds to catch mistakes with Undo send, schedule a message to arrive during business hours, and know when recalling a sent message works and when it doesn't.",
    objectives: [
      "Turn on Undo send and use it to stop a message",
      "Schedule a message to send later, and find it in Drafts",
      "Recall a message and read the Message Recall Report",
      "Explain the limits of recall and why prevention matters more",
    ],
    duration: "16 min",
    slides: outlookSlides["module-2/send-timing"],
    sections: [
      {
        heading: "The few seconds after Send",
        blocks: [
          {
            type: "scenario",
            role: "You are wrapping up at the Lakeside front desk at 5:40 PM.",
            text: "You answer Omar's request for the Saturday checklist, but he is off until tomorrow and you don't want him to feel he has to answer tonight. You also just sent \"Lunch order for Friday\" to Dr. Hill instead of Luis, and you notice the mistake the moment you select Send.",
            task: "Set up Outlook so you can catch mistakes, send at a good time, and pull back the message that went to the wrong person.",
          },
          {
            type: "paragraph",
            text: "Undo send makes Outlook wait a few seconds before it actually sends. After you select Send, a bar with Undo appears; select it and the message reopens so you can fix it. Turn it on in Settings › Mail › Compose and reply › Undo send, and choose up to 10 seconds.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook doesn't have Undo send. Some people use a rule that delays all outgoing messages instead.",
          },
        ],
      },
      {
        heading: "Schedule send",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "While you write the message, select the arrow next to Send, then Schedule send.",
              "Choose one of the suggested times, or a custom date and time, and select Send.",
              "The message waits in your Drafts folder until its delivery time.",
              "To send it right away instead, open it from Drafts, select Cancel send, then Send.",
            ],
          },
          {
            type: "paragraph",
            text: "Scheduling respects the reader. A message that arrives at 8:00 AM instead of 9:45 PM doesn't ask anyone to work at night, and it lands at the top of the inbox when the reader starts the day. Scheduling isn't available for IMAP or POP accounts.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook uses Delay Delivery (Options tab in the message window). The message waits in the Outbox, not Drafts.",
          },
        ],
      },
      {
        heading: "Recall: useful, but limited",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select Sent Items and double-click the message to open it in its own window.",
              "Select Recall Message, then OK.",
              "Outlook sends you a Message Recall Report in your Inbox. Open it to see whether the recall succeeded, is pending, or failed.",
            ],
          },
          {
            type: "table",
            caption: "When recall can work",
            columns: ["Recall can work when...", "Recall won't work when..."],
            rows: [
              ["You and the recipient have Microsoft 365 work or school accounts in the same organization", "The recipient is outside your organization, or uses Gmail, Outlook.com or another service"],
              ["The recipient hasn't opened the message yet", "The recipient already opened it"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Recall is not a safety net for patient information. If a message with patient information goes to the wrong person, tell your supervisor right away, even if you try a recall. Undo send and checking the To line before you select Send prevent the problem in the first place.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: open the sent message, then look for Recall This Message (on the Message tab under Actions, or File › Info › Message Resend and Recall).",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which tool fits?",
            prompt: "Match each situation to the feature that handles it.",
            items: [
              { id: "t1", text: "Undo send", match: "You notice a typo one second after selecting Send" },
              { id: "t2", text: "Schedule send", match: "You finish a reply at 9:45 PM that shouldn't arrive until morning" },
              { id: "t3", text: "Recall Message", match: "A coworker in your office got a message meant for someone else, and hasn't opened it" },
              { id: "t4", text: "Tell your supervisor", match: "Patient information went to an outside address by mistake" },
            ],
            explanation: "Undo send covers the first seconds. Schedule send controls timing. Recall can help only inside your organization and only for unopened messages. A privacy mistake always goes to your supervisor.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where does a scheduled message wait in new Outlook until it is sent?",
            options: ["Outbox", "Drafts", "Sent Items", "Archive"],
            correctIndex: 1,
            explanation: "In new Outlook, a scheduled message stays in Drafts until its delivery time. Classic Outlook's Delay Delivery uses the Outbox.",
            optionRationales: [
              "The Outbox is where classic Outlook holds delayed messages.",
              "Correct.",
              "It moves to Sent Items only after it is sent.",
              "Archive is for filed messages.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You sent a message to a patient's Gmail address by mistake. Will recall work?",
            options: ["Yes, always", "Only if they haven't opened it", "No; recall only works inside your organization", "Only if you recall it within an hour"],
            correctIndex: 2,
            explanation: "Recall needs both people to have Microsoft 365 work or school accounts in the same organization. Report the mistake to your supervisor.",
            optionRationales: [
              "Recall has requirements and often fails.",
              "Being unopened is necessary but not enough; the recipient must be in your organization.",
              "Correct.",
              "Recall has no time window like this; the requirements are the organization and whether it was opened.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Set up Outlook to help you catch mistakes, and practice sending at the right time.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your own new Outlook or Outlook on the web, turn on Undo send (10 seconds). Send yourself a message and use Undo.",
          "Write a message to yourself and schedule it for tomorrow morning. Find it in Drafts and take a screenshot.",
          "On a school computer, do these steps in the Challenge Lab below.",
          "Write three sentences explaining why recall can't be relied on to fix a message sent to the wrong person, and what you would do instead at Lakeside.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your screenshots (or your Challenge Lab results page from Print or save results) and your three sentences to your instructor or course folder.",
      },
    ],
  },
];
