import { Lesson } from "@/types/lesson";
import { outlookSlides } from "./slides";

const IMG = "/images/ms-office/outlook/module-6";

export const outlookModule6Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "automatic-replies",
    title: "Automatic Replies (Out of Office)",
    description:
      "Write and schedule automatic replies for time away, with a separate message for people outside your organization, and turn them off when you're back.",
    objectives: [
      "Turn on automatic replies for a set time period",
      "Write a helpful reply for coworkers and a safer one for outside senders",
      "Limit outside replies to your contacts",
      "Turn automatic replies off",
    ],
    duration: "12 min",
    videoUrl: "https://www.youtube.com/embed/qCeQX4Lf5eg",
    slides: outlookSlides["module-6/automatic-replies"],
    sections: [
      {
        heading: "A reply that does your job while you're away",
        blocks: [
          {
            type: "scenario",
            role: "You are leaving the Lakeside front desk for a two-day training class.",
            text: "Patients, partner offices and coworkers will keep emailing you. Coworkers need to know who's covering; outside senders need a polite answer and a phone number, without an announcement that you're away to every stranger who writes.",
            task: "Schedule automatic replies with one message for inside the organization and a shorter one for outside senders.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "On the View tab, select View settings (or select Settings, the gear at the top right), then Accounts › Automatic replies.",
              "Turn on the Automatic replies toggle.",
              "Check Send replies only during a time period and set the start and end dates and times, so the replies stop on their own.",
              "Type the message for people in your organization.",
              "To answer outside senders (work or school accounts), check Send replies outside your organization and type the outside message. Also check Send replies only to contacts if only people in your contacts should get it; Microsoft recommends this, because replying to everyone outside also answers newsletters, ads and junk mail.",
              "Select Save.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/automatic-replies.png`,
            alt: "Settings, Accounts, Automatic replies in new Outlook with the Automatic replies toggle on, Send replies only during a time period checked with start and end dates, an inside message, and Send replies outside your organization with Send replies only to contacts",
            caption: "Settings › Accounts › Automatic replies",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: File › Automatic Replies. Choose Send automatic replies, Only send during this time range, and use the Inside My Organization and Outside My Organization tabs.",
          },
        ],
      },
      {
        heading: "What to say",
        blocks: [
          {
            type: "table",
            caption: "Two audiences, two messages",
            columns: ["Inside the organization", "Outside the organization"],
            rows: [
              ["When you're back", "When they can expect a reply"],
              ["Who covers for you, by name", "A general phone number or shared mailbox"],
              ["Anything urgent coworkers should know", "Nothing about where you are or why"],
            ],
          },
          {
            type: "worked-example",
            title: "Writing the replies",
            task: "Cover Thursday and Friday at a training class.",
            steps: [
              { move: "Inside: \"I am at a training class and back on Monday, October 26. For front desk help, contact Omar Haddad.\"", why: "Coworkers get a date and a name." },
              { move: "Outside, contacts only: \"Thank you for your message. I will reply on Monday, October 26. For scheduling, please call (555) 010-2400.\"", why: "Partners get a date and a number, without details about your absence." },
              { move: "Set the time period from Thursday 8:00 AM to Friday 5:00 PM.", why: "The replies stop automatically, even if you forget." },
            ],
            result: "Everyone who writes knows what to do next, and nothing private is shared.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Keep outside replies short. Saying you're on vacation, traveling, or away from home tells strangers more than they need to know.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Inside, outside, or neither?",
            prompt: "Sort each detail into the reply it belongs in.",
            buckets: [
              { id: "in", label: "Inside reply only" },
              { id: "both", label: "Both replies" },
              { id: "none", label: "Neither" },
            ],
            items: [
              { id: "d1", text: "The date you'll be back", bucket: "both" },
              { id: "d2", text: "\"Contact Omar Haddad for front desk help\"", bucket: "in" },
              { id: "d3", text: "\"I'm on a cruise in the Bahamas!\"", bucket: "none" },
              { id: "d4", text: "The office's main scheduling number", bucket: "both" },
              { id: "d5", text: "A patient's name you're following up on", bucket: "none" },
            ],
            explanation: "Return dates and general contact numbers help everyone. Coworker names are for coworkers. Travel details and patient information don't belong in any automatic reply.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where do you set up automatic replies in new Outlook?",
            options: ["File › Automatic Replies", "Settings › Accounts › Automatic replies", "Home tab › Rules", "Calendar › Out of office"],
            correctIndex: 1,
            explanation: "New Outlook keeps automatic replies in Settings › Accounts.",
            optionRationales: ["That's classic Outlook.", "Correct.", "Rules sort incoming mail; they're not automatic replies.", "An out-of-office event blocks your calendar but doesn't reply to email."],
          },
          {
            type: "knowledge-check",
            question: "Why check Send replies only during a time period?",
            options: ["It makes the reply shorter", "The replies start and stop automatically", "Only contacts get the reply", "It blocks your calendar"],
            correctIndex: 1,
            explanation: "With a time period, you don't have to remember to turn replies off when you're back.",
            optionRationales: ["The length is up to you.", "Correct.", "That's Send replies only to contacts.", "The calendar is separate (Module 4)."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Write and set up automatic replies for a planned day off.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write two automatic replies for a day off at a medical office: one for coworkers and one for outside senders. Each should be three sentences or fewer.",
          "In your own Outlook (new Outlook or Outlook on the web), schedule the replies for a date in the future, take a screenshot of the Automatic replies page, then turn them off if you don't need them.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your two messages and either your screenshot or your Challenge Lab results page (Print or save results) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "shared-mailboxes",
    title: "Shared Mailboxes and Sending From a Team Address",
    description:
      "Open a shared mailbox like a front desk or billing inbox, answer messages from the team address instead of your own, and keep the team in sync.",
    objectives: [
      "Explain what a shared mailbox is and why offices use one",
      "Add a shared mailbox to your folder pane",
      "Reply and send from the shared address",
      "Leave clear signals for teammates who share the mailbox",
    ],
    duration: "13 min",
    videoUrl: "https://www.youtube.com/embed/nsBGU_TvAJc",
    slides: outlookSlides["module-6/shared-mailboxes"],
    sections: [
      {
        heading: "One address, a whole team",
        blocks: [
          {
            type: "scenario",
            role: "You are one of three people who answer the Lakeside front desk mailbox.",
            text: "Patients write to frontdesk@lakesidemed.example.com, not to you. When you're out, Omar or Priya answers. Replies should come from the front desk address so patients keep writing there, and so the next person can see what was already answered.",
            task: "Add the shared mailbox, answer from the team address, and leave it tidy for your teammates.",
          },
          {
            type: "paragraph",
            text: "A shared mailbox is a mailbox several people can open, such as frontdesk@ or billing@. Nobody signs in to it directly; your administrator gives your own account permission to it. It has its own Inbox, Sent Items and calendar, separate from your personal mailbox.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "In the folder pane, right-click your account name (your email address at the top of your folder list) and select Add shared folder or mailbox.",
              "In the Add shared folder or mailbox window, type the shared mailbox's name or email address and add it.",
              "The mailbox appears under Shared with me (it can take a few minutes after your administrator gives you access). Expand it to see its Inbox and other folders.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/shared-mailbox.png`,
            alt: "The new Outlook folder pane with Shared with me expanded to show the Lakeside Front Desk mailbox and its Inbox, with a message from Maria Gonzalez selected",
            caption: "Shared mailboxes appear under Shared with me.",
          },
        ],
      },
      {
        heading: "Send from the team address",
        blocks: [
          {
            type: "list",
            items: [
              "Start a reply or a new message. If you don't see a From line, select Options › Show From.",
              "Select From and choose the shared mailbox's address.",
              "Check the From line before you select Send. A reply from your personal address sends the patient's next message to you instead of the team.",
              "Your administrator decides whether you may send from the shared address. If sending fails, ask IT to check your permissions.",
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: a shared mailbox you have full access to often appears in the folder pane automatically. To send from it, turn on From (Options tab › From) and choose Other Email Address if the shared address isn't listed.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Answer from the team address",
            prompt: "Put the steps for replying from a shared mailbox in order.",
            items: [
              { id: "r1", text: "Open the shared mailbox's Inbox under Shared with me" },
              { id: "r2", text: "Select the message and select Reply" },
              { id: "r3", text: "Show the From line if it's hidden" },
              { id: "r4", text: "Choose the shared address in From" },
              { id: "r5", text: "Type the reply and select Send" },
            ],
            explanation: "Picking From before you send is the step people forget.",
          },
        ],
      },
      {
        heading: "Working as a team",
        blocks: [
          {
            type: "list",
            items: [
              "Everyone sees the same messages, so read, flag and file with the team in mind: a flag tells teammates something still needs action.",
              "Agree on simple rules, such as \"whoever replies files the message\" or a category for each person.",
              "Patient messages in a shared mailbox follow the same privacy rules as any practice email: answer only what's needed and keep health details out of subject lines.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "When you're added to a shared mailbox, its calendar is usually added to your calendar list too, so the team can schedule from one place.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You replied to a patient from the front desk shared mailbox, but your personal address was in From. What's the problem?",
            options: ["Nothing; it's the same mailbox", "The patient's next message comes to you, not the team", "The message can't be delivered", "The reply is encrypted"],
            correctIndex: 1,
            explanation: "The patient replies to whatever address sent the message. Use the shared address so the whole team sees the answer.",
            optionRationales: ["Your personal mailbox is separate from the shared one.", "Correct.", "It's delivered, just from the wrong address.", "Sending address has nothing to do with encryption."],
          },
          {
            type: "knowledge-check",
            question: "Where does a shared mailbox appear after you add it in new Outlook?",
            options: ["Under Favorites", "Under Shared with me", "In the People module", "In To Do"],
            correctIndex: 1,
            explanation: "Added shared mailboxes are listed under Shared with me in the folder pane.",
            optionRationales: ["Favorites holds folders you choose.", "Correct.", "People holds contacts.", "To Do holds tasks."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice working from a team mailbox.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write three \"team rules\" for a front desk shared mailbox (for example, how to show a message is being handled).",
          "If your school or job gives you a shared mailbox, add it in new Outlook or Outlook on the web and take a screenshot of it under Shared with me. Most students won't have one: on a school computer, or without a shared mailbox, do this in the Challenge Lab below.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your team rules and either your screenshot or your Challenge Lab results page (Print or save results) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "phishing-junk",
    title: "Phishing, Junk Email, and Blocked Senders",
    description:
      "Recognize phishing, report it the right way, keep junk out of your Inbox, rescue real mail from Junk Email, and manage blocked and safe senders.",
    objectives: [
      "Recognize common signs of a phishing message",
      "Report phishing and junk from new Outlook",
      "Block a sender and add a safe sender",
      "Move a real message out of Junk Email",
    ],
    duration: "16 min",
    slides: outlookSlides["module-6/phishing-junk"],
    sections: [
      {
        heading: "Why the front desk is a target",
        blocks: [
          {
            type: "scenario",
            role: "You check the Lakeside front desk inbox first thing Monday.",
            text: "A message that looks like it's from IT says your mailbox is full and asks you to verify your password. A gift card offer, three glove promotions, and a real imaging confirmation stuck in Junk Email are waiting too.",
            task: "Handle each message the safe way: report, block, or rescue.",
          },
          {
            type: "paragraph",
            text: "Phishing messages pretend to come from someone you trust to get you to click a link, open an attachment, or type a password. Medical offices are common targets because they handle health and payment information, and front desk staff open messages from strangers all day.",
          },
          {
            type: "table",
            caption: "Signs of phishing",
            columns: ["Sign", "Example"],
            rows: [
              ["Urgency or threats", "\"Verify your password within 24 hours or your account will be closed\""],
              ["A look-alike sender", "it-support@lakesidemed-help.example.net instead of the real lakesidemed.example.com"],
              ["Rewards or refunds", "\"Click this link to get your tax refund!\""],
              ["Fake shared files and invoices", "A document that asks for your email and password to open, or an invoice for something you never ordered"],
              ["Outlook warnings", "A '?' in the sender's picture or a \"via\" tag when Outlook can't verify the sender"],
            ],
          },
          {
            type: "tip",
            text: "Point to a link without clicking to see where it really goes. If a message claims to be from someone you know, check with them by phone using a number you already have, not one in the message.",
          },
        ],
      },
      {
        heading: "Report, block, and rescue",
        blocks: [
          {
            type: "list",
            items: [
              "Report phishing: select the message, then Report › Report phishing. Reporting tells Microsoft about the sender but doesn't block it.",
              "Report junk: Report › Report junk for unwanted ads and spam.",
              "Block a sender: Settings › Mail › Junk email. Under Blocked senders, type the address and select Add (or add a whole domain under Blocked domains), then select Save.",
              "Safe senders: in the same place, add addresses or domains you always want in the Inbox, then select Save.",
              "Rescue real mail: open the Junk Email folder, select the message, and select Not junk. It moves back to the Inbox.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/junk-settings.png`,
            alt: "Settings, Mail, Junk email in new Outlook with promo@medsupplyblast.example.com in the Blocked senders list, and a box for adding safe senders and domains below it",
            caption: "Settings › Mail › Junk email",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Follow your office's policy too. Many organizations want suspected phishing reported to IT as well, especially if you already clicked a link or typed a password. Report it right away; speed limits the damage.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Home tab › Junk › Block Sender, Never Block Sender, or Junk E-mail Options. A Report button may also be available, depending on your organization.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "What would you do?",
            prompt: "Sort each message by the right action.",
            buckets: [
              { id: "phish", label: "Report phishing" },
              { id: "junk", label: "Report junk or block" },
              { id: "notjunk", label: "Not junk" },
            ],
            items: [
              { id: "p1", text: "\"Your mailbox is full. Sign in here to keep your account.\"", bucket: "phish" },
              { id: "p2", text: "\"Payroll: confirm your bank details today\" from a look-alike domain", bucket: "phish" },
              { id: "p3", text: "A daily glove sale from a vendor you never use", bucket: "junk" },
              { id: "p4", text: "Riverside Imaging's referral confirmation, found in Junk Email", bucket: "notjunk" },
            ],
            explanation: "Phishing tries to steal something. Junk is just unwanted. Real mail in Junk Email gets marked Not junk so Outlook learns.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You report a message as phishing. Will that sender's next message be blocked?",
            options: ["Yes, always", "No. Reporting doesn't block; add the sender to Blocked senders to stop their mail", "Only if you also delete the message", "Only for 24 hours"],
            correctIndex: 1,
            explanation: "Reporting and blocking are separate. Block the sender in Settings › Mail › Junk email.",
            optionRationales: ["Reporting alone doesn't block.", "Correct.", "Deleting doesn't block either.", "There's no 24-hour block."],
          },
          {
            type: "knowledge-check",
            question: "A message from \"Lakeside IT Support\" comes from it-support@lakesidemed-help.example.net and asks for your password. What's the safest move?",
            options: ["Reply with your password", "Click the link to check", "Report it as phishing and don't click anything", "Forward it to coworkers to ask"],
            correctIndex: 2,
            explanation: "The domain isn't Lakeside's, and IT never needs your password by email. Report it.",
            optionRationales: ["Never send a password by email.", "Clicking can expose you to a fake sign-in page.", "Correct.", "Forwarding spreads the message."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Make a phishing quick-reference card for a medical front desk.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a one-page reference card (a document or slide) with five signs of phishing, the steps to report phishing in new Outlook, and what to do if someone already clicked a link.",
          "Practice the steps in the Challenge Lab below (on any computer). If you use your own mailbox, report only real junk or phishing, and never click links in suspicious messages.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your reference card and your Challenge Lab results page (Print or save results) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "protect-accessible",
    title: "Protecting Sensitive Mail and Writing Accessible Messages",
    description:
      "Decide when a message needs protection, apply sensitivity labels and encryption, add alt text to pictures, check accessibility, and request a read receipt.",
    objectives: [
      "Decide when a message needs extra protection",
      "Apply a sensitivity label and encrypt a message",
      "Add alt text to pictures and check a message for accessibility",
      "Request a read receipt and know its limits",
    ],
    duration: "17 min",
    slides: outlookSlides["module-6/protect-accessible"],
    sections: [
      {
        heading: "Sensitive information in email",
        blocks: [
          {
            type: "scenario",
            role: "You send internal reports and notices from the Lakeside front desk.",
            text: "Keisha needs the October billing report, which lists patient account balances. The new staff parking map goes to the front desk team, including Omar, who uses a screen reader. Dr. Patel must see a Friday schedule change.",
            task: "Protect the report, make the map usable for everyone, and confirm Dr. Patel reads the change.",
          },
          {
            type: "paragraph",
            text: "Under the HIPAA Privacy Rule, health care providers may email patients and others about health information, but they must use reasonable safeguards. Email isn't forbidden; carelessness is. Your practice decides which tools to use. Follow its policy, send only the minimum information needed, and double-check every recipient.",
          },
          {
            type: "list",
            items: [
              "Sensitivity labels (for example Confidential) are created and published by your organization. While writing, select Sensitivity on the Message tab (if the window is narrow, it may be under More options (…)) and choose a label. The label shows above the message for everyone who reads it.",
              "Encryption: Options › Encrypt › Encrypt keeps the message and attachments readable only by the recipients. Do Not Forward also stops recipients from forwarding, printing or copying it.",
              "Both need a work or school account, and your organization decides whether they are available. If you don't see them, ask your IT department.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/encrypt-options.png`,
            alt: "A new message in new Outlook with the Options tab selected and the Encrypt menu open, showing Encrypt and Do Not Forward, and Sensitivity: Confidential shown under the subject",
            caption: "Options tab › Encrypt. Sensitivity is on the Message tab.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Options tab › Encrypt, and Sensitivity on the Home or Message tab, when your organization has turned them on.",
          },
        ],
      },
      {
        heading: "Accessible messages",
        blocks: [
          {
            type: "list",
            items: [
              "Alt text: every picture you insert (Insert tab › Pictures) needs a description of what matters in it: \"Map of the staff lot: park in rows C and D and use the Elm Street door\", not \"map.png\".",
              "Links: use text that says where the link goes (\"staff parking policy\"), not \"click here\".",
              "Readable text: a clear font at a normal size, short paragraphs, and lists for steps.",
              "Color: don't use color alone to show meaning; add a word such as \"Required\".",
              "Before you send, select Check accessibility on the Options tab. The Accessibility Checker lists what it finds; select Fix this next to an issue (for a picture with no alt text, this opens Add alternative text, where you type the description), then select Check again. In classic Outlook, Check Accessibility is on the Review tab while you write.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Fix the message",
            prompt: "Match each problem to its fix.",
            items: [
              { id: "a1", text: "A picture with no description", match: "Add alt text that says what matters in the picture" },
              { id: "a2", text: "\"Click here\" as link text", match: "Use link text that names the destination" },
              { id: "a3", text: "Required items shown only in red", match: "Add the word \"Required\" next to each item" },
              { id: "a4", text: "One long paragraph of instructions", match: "Break it into a numbered list" },
            ],
            explanation: "Accessible email helps everyone read faster, including people using screen readers or small phone screens.",
          },
        ],
      },
      {
        heading: "Read receipts",
        blocks: [
          {
            type: "paragraph",
            text: "To ask for confirmation that a message was opened, select Options › Request a read receipt (in the Tracking area) before you send. Recipients can choose not to send a receipt, so a missing receipt doesn't prove a message wasn't read. For anything that matters, ask for a reply instead.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Sensitivity label", definition: "A label your organization defines, such as Confidential, that can mark or protect a message." },
              { term: "Encrypt", definition: "Protects a message so only its recipients can read it." },
              { term: "Do Not Forward", definition: "Encrypts and also stops recipients from forwarding, printing or copying." },
              { term: "Alt text", definition: "A short description of a picture that screen readers read aloud." },
              { term: "Read receipt", definition: "An optional notice that a recipient opened your message." },
            ],
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Does the HIPAA Privacy Rule forbid sending health information by email?",
            options: ["Yes, always", "No, but providers must use reasonable safeguards and follow their policies", "Only on weekends", "Only for attachments"],
            correctIndex: 1,
            explanation: "HHS says email is allowed with reasonable safeguards. Follow your practice's policy on encryption and what to send.",
            optionRationales: ["Email isn't forbidden.", "Correct.", "Days of the week don't matter.", "The rule isn't about attachments specifically."],
          },
          {
            type: "knowledge-check",
            question: "What should alt text for the staff parking map say?",
            options: ["\"map.png\"", "\"Image\"", "\"Map of the staff lot: park in rows C and D and use the Elm Street door\"", "Nothing; screen readers skip pictures"],
            correctIndex: 2,
            explanation: "Good alt text tells a screen reader user what the picture is for.",
            optionRationales: ["A file name says nothing useful.", "\"Image\" says nothing useful.", "Correct.", "Screen readers read alt text when it's there."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Send one protected message and one accessible message.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a short guide (five bullet points or fewer) for when a Lakeside staff member should use a sensitivity label or encryption, based on this lesson and the HHS guidance.",
          "In your own Outlook, send yourself a message with a picture and real alt text, run Check accessibility, and take a screenshot. If your account has Encrypt, send yourself an encrypted test message too.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your guide and either your screenshot or your Challenge Lab results page (Print or save results) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "copilot-mobile",
    title: "Copilot and Outlook on Other Devices",
    description:
      "Use Microsoft 365 Copilot in Outlook to summarize threads and draft messages when your organization provides it, check its work, and keep your mail consistent across the web and your phone.",
    objectives: [
      "Summarize a long thread with Copilot",
      "Draft a message with Copilot and edit it before sending",
      "Check AI-generated text against the source",
      "Use the same mailbox in Outlook on the web and the mobile app",
    ],
    duration: "13 min",
    slides: outlookSlides["module-6/copilot-mobile"],
    sections: [
      {
        heading: "Copilot in Outlook",
        blocks: [
          {
            type: "scenario",
            role: "You coordinate Saturday's flu clinic at Lakeside.",
            text: "The planning thread has eleven replies, and you need the final decisions in a minute. Then the clinic staff need a short, friendly reminder.",
            task: "Let Copilot do the first draft, then make sure every fact is right before anything goes out.",
          },
          {
            type: "paragraph",
            text: "Microsoft 365 Copilot is an AI assistant built into Outlook for organizations that provide it. Whether you have it depends on your organization's license and settings; if you can't find Copilot, check with your IT administrator. Copilot doesn't replace your judgment: you're responsible for every message you send.",
          },
          {
            type: "list",
            items: [
              "Summarize: open a thread and select Summary by Copilot (it may say Summarize) at the top. The summary appears above the message and may include numbered citations that jump to the message they came from.",
              "Draft: start a new message (Home › New mail), select the Copilot icon on the toolbar › Draft with Copilot, type what you want, and select Generate. You can choose the length and tone, or change your prompt and generate again, until it's right. Then select Keep and edit the draft.",
              "Draft with Copilot doesn't work in plain text messages; switch to HTML in Settings › Mail › Compose and reply if needed.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/copilot-draft.png`,
            alt: "A new message in new Outlook with the Draft with Copilot box: the prompt asks for a short, friendly reminder to arrive by 7:30 AM Saturday, and a generated draft is shown with a Keep button",
            caption: "Draft with Copilot: prompt, Generate, review, Keep.",
          },
        ],
      },
      {
        heading: "Check its work",
        blocks: [
          {
            type: "list",
            items: [
              "Compare every date, time, name and number with the original message.",
              "Add what Copilot couldn't know (\"Please bring your badge\").",
              "Match your office's tone, and remove anything you wouldn't say yourself.",
              "Follow your organization's rules about using AI with patient information.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Drafting with Copilot",
            prompt: "Put the steps in a safe order.",
            items: [
              { id: "c1", text: "Write a clear prompt with the key facts" },
              { id: "c2", text: "Generate the draft" },
              { id: "c3", text: "Check every fact against the source" },
              { id: "c4", text: "Keep the draft and edit it in your own voice" },
              { id: "c5", text: "Check recipients, then send" },
            ],
            explanation: "A good prompt gives Copilot the facts; checking makes sure they survived.",
          },
          {
            type: "worked-example",
            title: "From thread to reminder",
            task: "Turn Denise's eleven-message thread into a staff reminder.",
            steps: [
              { move: "Select Summary by Copilot on the thread.", why: "The decisions (7:30 AM arrival, Elm Street parking) are visible in seconds." },
              { move: "New mail › Copilot › Draft with Copilot: \"Write a short, friendly reminder to arrive by 7:30 AM Saturday for the flu clinic.\"", why: "The prompt carries the facts that matter." },
              { move: "Compare the draft with the thread, then add \"Please bring your badge.\"", why: "You confirm the facts and add what Copilot couldn't know." },
              { move: "Address it to Omar and Priya, add a subject, and send.", why: "You are the one sending, so you check last." },
            ],
            result: "A correct, friendly reminder in a couple of minutes.",
          },
        ],
      },
      {
        heading: "Outlook on the web and on your phone",
        blocks: [
          {
            type: "paragraph",
            text: "Your mailbox lives in Microsoft 365, not on one computer. Outlook on the web (sign in from a browser) looks and works almost exactly like new Outlook, so everything in this course applies there. The Outlook mobile app for iPhone and Android shows the same mail, calendar and contacts in a smaller layout.",
          },
          {
            type: "list",
            items: [
              "On a shared or public computer, use Outlook on the web and sign out when you're done.",
              "On a phone, use a screen lock. Your organization may require extra protection before work email can be opened on a personal device.",
              "Changes sync: a message you file or a meeting you accept on your phone shows up the same way on your computer.",
            ],
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Copilot drafted a reminder that says staff should arrive at 7:00 AM. The thread says 7:30 AM. What do you do?",
            options: ["Send it; Copilot is usually right", "Fix the time before sending", "Delete the thread", "Ask Copilot to send it"],
            correctIndex: 1,
            explanation: "You're responsible for what you send. Correct anything that doesn't match the source.",
            optionRationales: ["AI-generated text can be wrong.", "Correct.", "The thread is your source; keep it.", "You send messages, not Copilot."],
          },
          {
            type: "knowledge-check",
            question: "You don't see Copilot in Outlook. What's the most likely reason?",
            options: ["Your mailbox is full", "Your organization hasn't provided a Copilot license or turned it on", "You're in the Junk Email folder", "Copilot only works on phones"],
            correctIndex: 1,
            explanation: "Copilot depends on your organization's license and settings. Ask your IT administrator.",
            optionRationales: ["Mailbox size doesn't affect Copilot.", "Correct.", "Folder choice doesn't hide Copilot.", "Copilot isn't phone-only."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Evaluate an AI draft. (No Copilot license is needed.)",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a prompt you would give Copilot to draft a reminder for Saturday's flu clinic. Include the facts it needs: arrival time, door time, parking and what to bring.",
          "Here is a draft an assistant produced: \"Hi team! Don't forget the flu clinic on Sunday. Please be there at 8:00 AM sharp and park anywhere. Thanks!\" Compare it with Denise's plan in the practice sim (staff arrive by 7:30 AM, doors open at 8:00 AM, Saturday, Elm Street lot). List every error you find.",
          "Rewrite the message correctly in your own words.",
          "If your organization provides Copilot, try your prompt in Outlook and compare the result with your rewrite.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your prompt, your list of errors, and your corrected message to your instructor or course folder.",
      },
    ],
  },
];
