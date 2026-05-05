import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "intro-to-outlook-2019",
    title: "Introduction to Microsoft Outlook 2019",
    description:
      "Get oriented in the Outlook 2019 interface, set up a professional email signature, configure your inbox view, and understand how all of Outlook's modules connect to manage your professional communications.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/OR_RjjqF1qc",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-01.jpg",
        alt: "Welcome to Microsoft Outlook 2019 — email, calendar, contacts, tasks, and notes in one place",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-02.jpg",
        alt: "The Outlook Interface — Navigation Pane, Folder Pane, Reading Pane, and Message List",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-03.jpg",
        alt: "Outlook Modules — Mail, Calendar, People, Tasks, and Notes",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-04.jpg",
        alt: "Reading Pane Options — right side, bottom, and off — and when each helps",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-05.jpg",
        alt: "Creating a Professional Email Signature — name, title, company, phone, and optional logo",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-06.jpg",
        alt: "Multiple Accounts and Connected Services in Outlook 2019",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-07.jpg",
        alt: "Focused Inbox — the intelligent inbox filter and how to configure it",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-08.jpg",
        alt: "Outlook Today View — daily email, appointment, and task overview on one screen",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct Outlook interface element for a given task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is your first morning managing communications at Lakeside Medical Associates. The practice's main inbox receives 40–60 emails per day — appointment requests, insurance authorizations, referral letters, supply invoices, and staff messages all arriving in the same place. Before you can manage any of it effectively, you need to know where everything lives in Outlook, how to configure your view for maximum efficiency, and how to set up a professional signature that represents the practice correctly on every email you send. This lesson gets you set up before the first message needs a response.",
          },
        ],
      },
      {
        heading: "The Outlook 2019 Interface",
        blocks: [
          {
            type: "paragraph",
            text: "Outlook 2019's interface is organized as a communication hub with distinct modules for each type of professional communication — email, calendar, contacts, tasks, and notes. Understanding how each module connects to the others is what makes Outlook powerful rather than just a basic email client:",
          },
          {
            type: "list",
            items: [
              "The Navigation Pane is the narrow left column that switches between Outlook's main modules — click the Mail icon (envelope), Calendar icon, People icon (contacts), Tasks icon (checkmark), or Notes icon to switch modules. Each module has its own Folder Pane and content view. You can collapse the Navigation Pane icons to text labels for more screen space (View > Folder Pane > Normal vs Minimized). The Navigation Pane is your primary tool for moving between the different communication functions in Outlook.",
              "The Folder Pane shows the folder hierarchy within the current module — in Mail, it shows your Inbox, Sent Items, Drafts, Deleted Items, and any custom folders you have created. In Calendar, it shows your calendar list. In People, it shows contact folders and groups. Hover over the Folder Pane divider to resize it, or click the arrow icon to collapse it for a cleaner view of your message list.",
              "The Message List (center panel in Mail view) shows the emails in the currently selected folder — by default, sorted by date with the newest on top. Each entry shows the sender name, subject line, the first line of the email body, a timestamp, and any flags or category markers. Right-click any message in the list for a context menu with common actions (reply, forward, flag, move, delete). The Message List is where you make the initial decision about every incoming email.",
              "The Reading Pane (right side or bottom of the screen by default) shows the full content of the selected email without opening it in a separate window — this is how professional email managers read the vast majority of their email. Place the Reading Pane on the right for wide screens (View > Reading Pane > Right) or on the bottom for narrow screens. Turn it off if you want a full-width message list view. Reading messages in the Reading Pane without opening them into separate windows keeps your workspace clean and makes you faster.",
            ],
          },
        ],
      },
      {
        heading: "Setting Up a Professional Email Signature",
        blocks: [
          {
            type: "paragraph",
            text: "Your email signature is an automatic professional footer appended to every message you send — it is the digital equivalent of a business card. A correctly configured signature at Lakeside Medical Associates communicates professionalism, provides the recipient with all necessary contact information, and ensures consistent branding across all communications:",
          },
          {
            type: "list",
            items: [
              "To create a signature: go to File > Options > Mail > Signatures, or in a new email, click Message > Signature > Signatures. Click 'New,' give the signature a name (e.g., 'Lakeside Medical – Full Signature'), and type your signature content in the editor below. Format it with font choices that match the practice's professional standards.",
              "A complete professional signature for Lakeside Medical Associates includes: your full name (bold, 11pt), your title (normal, 11pt), the practice name ('Lakeside Medical Associates,' normal or bold, 11pt), the practice address (123 Lakeview Drive, Suite 200, Lakeside, CA 90210), main phone number (555-234-5678), direct phone number if applicable, fax number if applicable, and the practice website or email. Optionally include a HIPAA confidentiality notice as one or two small-font sentences below the contact block.",
              "Set the signature to append automatically: in the Signatures dialog, under 'Choose default signature,' select your email account, choose your created signature from the 'New messages' dropdown, and optionally from the 'Replies/forwards' dropdown. Setting both ensures every outgoing message carries the signature without needing to insert it manually. For patient communications, use the full signature. For internal staff emails, a shorter version with just name and title is more appropriate — create two signature variations.",
              "The confidentiality notice (optional but common in medical offices) is a legal disclaimer appended below the contact block: 'This email and any attachments are confidential and intended solely for the addressee. If you have received this email in error, please notify the sender immediately and permanently delete all copies. Unauthorized use, disclosure, or distribution of this information may violate applicable laws.' Many medical offices include this notice on all outgoing emails as a standard HIPAA best practice.",
            ],
          },
        ],
      },
      {
        heading: "Focused Inbox and Outlook Today",
        blocks: [
          {
            type: "paragraph",
            text: "Two Outlook features that help manage high email volume are the Focused Inbox and the Outlook Today view — both designed to help you prioritize and stay oriented in a busy day:",
          },
          {
            type: "list",
            items: [
              "Focused Inbox separates high-priority messages (in the Focused tab) from lower-priority messages (in the Other tab) using machine learning to predict which emails are most important based on your behavior. In a busy medical office inbox, Focused Inbox can be helpful for surfacing urgent patient and provider messages while routing newsletters, automated notifications, and low-priority vendor emails to Other. Configure Focused Inbox in View > Show Focused Inbox. Click the Other tab to review and manually move any misclassified messages to teach the algorithm what belongs in Focused.",
              "Outlook Today view gives you a one-screen overview of your day's email, calendar appointments, and tasks — click on your mailbox name at the top of the Folder Pane (not a specific folder) to open Outlook Today. Customize it by clicking 'Customize Outlook Today' in the top right — choose how many days of calendar to show, how many tasks to display, and whether to have Outlook Today display automatically when Outlook opens. For a medical office assistant who needs to assess the day's priorities quickly each morning, Outlook Today is a 10-second daily briefing before diving into individual emails and appointments.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Outlook 2019 Interface",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-6/intro-to-outlook-2019/infographic.png",
            alt: "Outlook 2019 Interface Quick Reference — labeled diagram of the Navigation Pane, Folder Pane, Message List, Reading Pane, signature setup workflow, Focused Inbox configuration, and Outlook Today layout guide",
            caption: "Outlook 2019 Interface Quick Reference — getting oriented in your professional communications hub",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "At Lakeside Medical Associates, your Outlook account is the practice's official communication channel — not your personal email. Never use your Outlook account for personal correspondence, online shopping, or personal subscriptions. Never forward patient emails, referral letters, or insurance documents to your personal email account. Your Outlook account is monitored by the practice's IT administrator and all email is retained per HIPAA record-keeping requirements. Every email you send from your Outlook account is a practice communication with legal standing. Write every email as if your supervisor and the practice's compliance officer will read it — because in an audit, they might.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Design a professional email signature for a medical office assistant at Lakeside Medical Associates. Include: name placeholder, title (Office Assistant), practice name, address (123 Lakeview Drive, Suite 200, Lakeside, CA 90210), phone (555-234-5678), fax (555-234-5679), and a HIPAA confidentiality notice of 2 sentences maximum. Also create a shorter version for internal emails with just name, title, and direct phone. Format both in plain text so I can paste them into Outlook's signature editor.' Set up both signatures in Outlook immediately after completing this lesson.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where in Outlook do you set up an automatic email signature that appends to every new message you send?",
            options: [
              "View > Reading Pane > Signature",
              "File > Options > Mail > Signatures",
              "Home > New Email > Format Text > Signature",
              "Tools > Accounts > Signature Settings",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Configure your Outlook 2019 interface professionally and create two signature variations for Lakeside Medical Associates — a full external signature and a short internal signature.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Configure the Reading Pane to display on the right side (View > Reading Pane > Right). Enable Focused Inbox (View > Show Focused Inbox). Open Outlook Today by clicking on your mailbox name in the Folder Pane and take a screenshot showing the three-panel layout (email, calendar, tasks).",
          "Create a full external email signature named 'Lakeside Medical – External.' Include: your name (bold), 'Office Assistant,' 'Lakeside Medical Associates,' the address, phone, fax, and a 2-sentence HIPAA confidentiality notice. Format using Calibri 11pt black for name and title, Calibri 10pt gray for address and notice.",
          "Create a shorter internal email signature named 'Lakeside Medical – Internal.' Include only: your name, 'Office Assistant,' and your direct phone number. No address, no confidentiality notice.",
          "Set the External signature as the default for New Messages and the Internal signature as the default for Replies/Forwards. Open a new blank email and confirm the External signature appears automatically. Then reply to a sent message (or test email) and confirm the Internal signature appears.",
          "Take screenshots of both signatures as they appear in the Outlook signature editor and submit with your challenge confirmation.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit three screenshots to your instructor — (1) Outlook Today view, (2) the External signature in the signature editor, and (3) the Internal signature in the signature editor — plus a written confirmation that both signatures appear correctly as defaults in new messages and replies. This configuration represents the professional Outlook setup standard at Lakeside Medical Associates.",
      },
    ],
  },

  {
    slug: "email-management-outlook",
    title: "Professional Email Management in Outlook",
    description:
      "Master the full range of Outlook's email tools — composing professional messages, using Quick Steps and Rules for automation, managing conversations, flagging for follow-up, and maintaining a professional inbox.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/EBGrJckHadw",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-01.jpg",
        alt: "Composing Email — To, CC, BCC, Subject, body, attachments, and screenshot insertion",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-02.jpg",
        alt: "Message Formats — HTML vs Plain Text and when each is appropriate",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-03.jpg",
        alt: "Importance Flags and Sensitivity Labels — using them correctly and professionally",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-04.jpg",
        alt: "Folders and Organization — creating a folder structure for a medical office inbox",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-05.jpg",
        alt: "Quick Steps — one-click multi-action automations for routine email tasks",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-06.jpg",
        alt: "Rules — automatic routing of incoming emails based on sender, subject, or keywords",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-07.jpg",
        alt: "Conversation View — threading email chains and managing grouped conversations",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-08.jpg",
        alt: "Flagging for Follow-Up — setting reminders and using Tasks for email action management",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/email-management-outlook/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct Outlook email tool for a given management scenario",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is 9:00 AM at Lakeside Medical Associates and 23 new emails arrived overnight. Six are appointment requests from patients that need to be confirmed and moved to the Appointments folder. Four are insurance authorization responses that need to be forwarded to the billing coordinator and filed. Three are supply invoices that need the office manager's attention flagged with a reminder for Friday. Two are from providers on clinical matters that need immediate action. And eight are newsletters and vendor announcements that can be deleted. Without a systematic approach, this inbox will control your day instead of you controlling it. This lesson gives you that system.",
          },
        ],
      },
      {
        heading: "Composing Professional Email",
        blocks: [
          {
            type: "paragraph",
            text: "Composing email in Outlook is the most visible professional skill in any office role — every email you send reflects your competence and the practice's professionalism. These composition principles apply to every outgoing email at Lakeside Medical Associates:",
          },
          {
            type: "list",
            items: [
              "To, CC, and BCC serve distinct purposes — To is for the primary recipient(s) who must read and respond. CC (carbon copy) is for recipients who need to be informed but are not required to act. BCC (blind carbon copy) is for recipients who should receive the message without other recipients seeing their address — used for large announcement mailings to protect privacy (patient notifications, vendor announcements). Never CC your supervisor on every email as a reflex — only CC when the recipient genuinely needs to be in the loop. Never put multiple patient email addresses in the To or CC field together — always use BCC for patient group mailings.",
              "Subject lines should be specific and action-oriented — 'Patient Appointment Request – Maria Rodriguez – May 15' is more professional and searchable than 'Appointment Request' or (worst of all) no subject at all. A good subject line tells the recipient what the email is about before they open it. If your email requires action, include the action in the subject: 'Action Required: Insurance Auth for Patient #4421 – Due May 10.' In a busy medical office inbox, subject lines are the first filter — weak subject lines cause emails to be overlooked.",
              "Attachments should be added before writing the body of the email — the most common email mistake is writing about an attachment, sending the email, and then realizing the attachment was not attached. In Outlook, drag files directly onto the message window to attach them, or use the Attach File button in the Ribbon. For large files (over 10 MB), use a shared OneDrive link rather than an attachment — large attachments can fail to deliver or get caught by spam filters.",
              "Message format matters for compatibility and professionalism — HTML format (the default) supports fonts, colors, bullet points, and images. Plain Text format strips all formatting and is compatible with every email client. Use HTML for external patient and partner communications. Use Plain Text only when the recipient's system is known to have issues with HTML formatting, or for very simple, fast internal notes where formatting adds no value.",
              "High Importance flag (the red exclamation mark) should be used sparingly — reserve it for genuinely time-sensitive items that require the recipient to act before their normal email review cycle. Marking routine correspondence as High Importance is the professional equivalent of crying wolf — recipients quickly learn to ignore your importance flags and will miss the genuinely urgent ones. In a medical office context, use High Importance for: urgent prior authorization deadlines, critical lab result follow-ups, and time-sensitive scheduling changes.",
            ],
          },
        ],
      },
      {
        heading: "Folders, Quick Steps, and Rules",
        blocks: [
          {
            type: "paragraph",
            text: "A well-organized inbox is not a goal — it is a system. Folders provide the storage structure, Rules provide the automatic routing, and Quick Steps provide the rapid manual processing actions. Together, these three tools allow you to maintain an organized inbox even at high email volume:",
          },
          {
            type: "list",
            items: [
              "Creating folders for a medical office inbox: right-click your Inbox in the Folder Pane and choose 'New Folder.' Build a folder structure that mirrors the practice's main workflow categories — Appointments (incoming request and confirmation emails), Insurance (auth requests, responses, EOBs), Referrals (incoming and outgoing referral correspondence), Billing (invoices, statements, payment confirmations), Providers (clinical communications from/to providers), Staff (internal staff messages), and Vendors (supply orders and invoices). Never file everything in subfolders of subfolders — 2 levels of hierarchy is the professional maximum for an inbox folder structure.",
              "Quick Steps are one-click multi-action automations for your most frequent email processing tasks — click Home > Quick Steps > Create New. Define a name and a sequence of actions: for example, the 'File Insurance Auth' Quick Step would Mark as Read, Move to 'Insurance' folder, and Flag for Follow-up with a 3-day reminder — all in one click. Quick Steps appear in the Ribbon for rapid access. Create Quick Steps for your 4–5 most frequent email processing actions to save significant time across a busy inbox day.",
              "Rules automatically process incoming messages without any manual action — click Home > Rules > Manage Rules & Alerts > New Rule. The most common rule types for a medical office: automatically move emails from specific senders (the insurance company's email domain) to specific folders, automatically flag emails with specific subjects ('URGENT' or 'Authorization Needed') with High Importance, automatically forward emails matching specific keywords to a specific recipient, and automatically delete emails matching spam patterns before they reach the inbox. Rules run in the order listed — place more specific rules above more general ones to prevent conflicts.",
            ],
          },
        ],
      },
      {
        heading: "Conversation View, Flagging, and Search",
        blocks: [
          {
            type: "paragraph",
            text: "Conversation View and flagging are inbox management tools that help you track the status of ongoing communication threads and ensure nothing falls through the cracks in a high-volume inbox:",
          },
          {
            type: "list",
            items: [
              "Conversation View groups all emails with the same subject line into a single expandable thread — enable it via View > Show as Conversations. When you click a conversation in the message list, all related emails (sent and received) are grouped together. This prevents the situation where a patient sends 4 follow-up emails about the same appointment and they appear as 4 separate unrelated items in the inbox. Right-click a conversation and choose 'Ignore Conversation' to automatically move all current and future messages in that thread to Deleted Items — useful for email chains you have been CC'd on but no longer need to follow.",
              "Flagging for follow-up marks an email with a reminder so it does not fall off your radar — right-click any message and choose Follow Up, then select a due date (Today, Tomorrow, This Week, Next Week) or Custom date. Flagged messages appear in the Task list and show a flag icon in the message list. At Lakeside Medical Associates, flag every email that requires an action you cannot complete immediately: insurance response needed in 3 days, patient call-back needed by tomorrow, supply order confirmation needed this week. Clearing flags immediately when actions are complete keeps your task list accurate.",
              "Search is the fastest way to find any email — press Ctrl+E to activate the search bar in Outlook. Type keywords, sender names, or subject text. Use the Search tab that appears in the Ribbon to filter by date range (Within: this week, this month), sender, folder, or whether the email has attachments. For a medical office, saving frequent searches as Search Folders (right-click on Search Folders in the Folder Pane > New Search Folder) creates permanent filtered views — for example, a 'Flagged Insurance Emails' search folder that always shows all flagged emails in the Insurance folder, updated automatically.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Professional Email Management",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-6/email-management-outlook/infographic.png",
            alt: "Professional Email Management Quick Reference — To/CC/BCC usage guide, subject line formula, folder structure template for medical offices, Quick Steps creation steps, Rule setup workflow, Conversation View controls, and Flag due date options",
            caption: "Professional Email Management Quick Reference — the Lakeside Medical Associates inbox system",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Email communication at Lakeside Medical Associates is subject to HIPAA retention requirements — patient-related emails must be retained for a minimum of 6 years from the date of creation. Never permanently delete emails that contain patient information, clinical communications from providers, insurance authorization decisions, or billing correspondence. Instead of deleting, move to the appropriate archival folder. The practice's IT administrator may have Outlook configured with automatic retention policies — do not attempt to override them. If you receive a subpoena or legal hold notice, immediately preserve all related emails in a designated folder and notify your supervisor — do not delete anything while a legal matter is active.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I manage the main email inbox for a small medical office (Lakeside Medical Associates) that receives 40–60 emails per day from patients, insurance companies, referring physicians, and vendors. Design a folder structure, list 5 Quick Steps I should create, and describe 4 automatic Rules I should set up to manage this inbox professionally. Also suggest how I should process the inbox at the start and end of each workday.' Use the response to set up your Outlook folder structure, Quick Steps, and Rules before your next work session.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You need to send an appointment reminder to 50 patients in one email without each patient seeing the other patients' email addresses. Which email field should you use?",
            options: [
              "To — list all 50 patients in the To field",
              "CC — list all 50 patients in the CC field",
              "BCC — list all 50 patients in the BCC field",
              "Reply All — reply to a previous email with all 50 addresses",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a complete professional email management system in Outlook for Lakeside Medical Associates — including a folder structure, Quick Steps, an automatic Rule, and a flagged follow-up workflow based on a simulated inbox scenario.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create the following folders under your Inbox: Appointments, Insurance, Referrals, Billing, Providers, Staff, and Vendors. Create one subfolder within Insurance named 'Pending Authorization.' Take a screenshot of the complete folder structure in the Folder Pane.",
          "Create 3 Quick Steps: (1) 'File as Appointment' — Mark as Read + Move to Appointments folder. (2) 'Forward to Billing Coordinator' — Forward to a fictional colleague email address + Move to Billing folder. (3) 'Flag for Friday' — Flag for follow-up due This Week + Mark as Read. Test each Quick Step on a test email.",
          "Create a Rule: automatically move any email where the Subject contains 'Authorization' OR 'Auth Request' to the Insurance > Pending Authorization subfolder. Test by creating a test email to yourself with 'Authorization' in the subject and verifying it routes correctly.",
          "Compose a professional email to a fictional referring physician (Dr. Sarah Nguyen at Riverside Family Practice) as a referral follow-up letter — proper subject line, professional salutation, 2 body paragraphs requesting medical records, professional closing, and your Lakeside Medical external signature. Attach a fictional document named 'Referral Request Form.docx' (create a blank file if needed). Set importance to Normal (do not use High unless genuinely urgent).",
          "Enable Conversation View (View > Show as Conversations) and flag 3 existing emails in your inbox for follow-up on different dates (Today, Tomorrow, and Next Week). Confirm all 3 appear in the Tasks panel with their due dates.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit screenshots of: (1) the complete folder structure in the Folder Pane, (2) the Quick Steps gallery showing your 3 Quick Steps, (3) the Rules dialog showing your Authorization routing rule, (4) the composed referral email before sending, and (5) the Tasks panel showing your 3 flagged emails with due dates. This inbox system represents a professional Outlook configuration ready for managing 40–60 emails per day at Lakeside Medical Associates.",
      },
    ],
  },

  {
    slug: "calendar-and-meetings-outlook",
    title: "Calendar and Meeting Management in Outlook",
    description:
      "Master Outlook's Calendar for scheduling appointments, sending meeting requests, using the Scheduling Assistant, managing recurring meetings, and coordinating the clinic's full schedule professionally.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/fsXS_VSuBvs",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-01.jpg",
        alt: "Calendar Views — Day, Work Week, Week, and Month views and when each is useful",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-02.jpg",
        alt: "Appointments vs Meetings — the critical distinction and when each is correct",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-03.jpg",
        alt: "Creating and Sending Meeting Requests — required vs optional attendees, location, agenda",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-04.jpg",
        alt: "The Scheduling Assistant — viewing free/busy time to find the right meeting slot",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-05.jpg",
        alt: "Responding to Meeting Requests — Accept, Tentative, and Decline with a message",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-06.jpg",
        alt: "Recurring Meetings — daily, weekly, monthly, and custom recurrence patterns",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-07.jpg",
        alt: "Sharing Calendars — sharing your calendar and viewing colleagues' calendars in overlay mode",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-08.jpg",
        alt: "Out-of-Office Replies — setting up automatic responses for absences",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/slide-09.jpg",
        alt: "Knowledge Check — selecting the correct calendar action for a given scheduling scenario",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor is traveling Thursday and Friday and asks you to manage all scheduling for those two days. Your task list includes: scheduling a provider staff meeting for next Tuesday when all three providers are available, sending a meeting request for the monthly billing review to the office manager and billing coordinator, setting up a weekly recurring reminder for the Friday supply order review, responding to a meeting request from an insurance auditor, and configuring an out-of-office reply for your supervisor. All of this happens in Outlook Calendar — and none of it should require a phone call or back-and-forth email chain.",
          },
        ],
      },
      {
        heading: "Calendar Views and Navigation",
        blocks: [
          {
            type: "paragraph",
            text: "Outlook Calendar's multiple views provide different levels of detail for different scheduling tasks — switching between views at the right moment is what allows you to both see the big picture and schedule precise appointments:",
          },
          {
            type: "list",
            items: [
              "Day view shows all appointments for a single day in a time-slot grid format — the most detailed view, showing appointments from the day's start to end hour by hour. Use Day view when you are scheduling within a specific day and need to see exactly which hours are available and occupied. The time slots are 30 minutes by default; right-click the time grid to change the time scale to 15 or 60 minutes.",
              "Work Week view shows Monday through Friday of the current week in a five-column grid — the most commonly used view for a medical office assistant coordinating a busy work week. You can see all appointments for the week at a glance, identify gaps, spot conflicts, and schedule new appointments in open slots by double-clicking the desired time slot.",
              "Month view shows a full calendar month in grid format with appointments appearing as colored blocks — too small to show appointment details, but ideal for seeing patterns across the month (which weeks are heavy, which days have recurring meetings, when extended absences are scheduled). Use Month view for long-range scheduling planning, never for day-to-day appointment management.",
              "Navigate between dates using the mini calendar on the left (click any date to jump to it), the forward/back arrows in the toolbar (advance by one day, week, or month depending on current view), or press Ctrl+Right and Ctrl+Left to move forward and backward. Press Ctrl+Home to jump to today's date from anywhere in the calendar.",
            ],
          },
        ],
      },
      {
        heading: "Appointments vs Meetings and the Scheduling Assistant",
        blocks: [
          {
            type: "paragraph",
            text: "The distinction between an Appointment and a Meeting in Outlook is fundamental — understanding it prevents common errors in calendar management:",
          },
          {
            type: "list",
            items: [
              "An Appointment is a calendar block that only affects your own calendar — no invitations are sent to other people. Use Appointments for: personal reminders (submit supply order by Friday), blocked time (lunch, professional development hours), and events that do not involve coordinating anyone else's attendance. Double-click a time slot in Calendar to create an Appointment (the new window shows no attendee fields).",
              "A Meeting is a calendar event that sends invitations to one or more other people and expects a response — use Meetings for: provider staff meetings, billing review sessions, vendor calls, and any event where you need to coordinate multiple people's availability and receive confirmation of their attendance. Click Home > New Meeting in the Calendar module to create a meeting (the window includes To/CC fields for attendees, a Scheduling Assistant button, and response tracking).",
              "The Scheduling Assistant is Outlook's most powerful scheduling tool — it shows the free/busy status of all attendees' calendars side by side, allowing you to find the earliest time slot when everyone is available without making a single phone call or sending a scheduling email chain. Click the Scheduling Assistant tab in a new Meeting window. Add all required and optional attendees. The grid shows each person's calendar as a horizontal timeline with colored blocks for busy time. Available times appear as clear white rows. Click any clear time slot on the grid to set the meeting start time automatically. This is the professional way to schedule any meeting with more than 2 attendees.",
              "Meeting requests include the full meeting context — the attendee fields (required vs optional), a Location field (room name, physical address, or online meeting link), a Start/End time, and a body field for the agenda. Always include an agenda in the meeting body — a bullet point list of what will be covered and what attendees should prepare. A meeting invitation with an agenda signals professional planning; an invitation with no description forces attendees to ask 'what is this meeting about?'",
            ],
          },
        ],
      },
      {
        heading: "Recurring Meetings, Sharing, and Out-of-Office",
        blocks: [
          {
            type: "paragraph",
            text: "Recurring meetings, calendar sharing, and Out-of-Office replies are the advanced calendar management tools that maintain the practice's scheduling coordination over time:",
          },
          {
            type: "list",
            items: [
              "Recurring meetings occur on a defined schedule automatically — when creating or editing a meeting, click Recurrence in the Meeting toolbar to open the Appointment Recurrence dialog. Choose the recurrence pattern: Daily (every day or every N days or every weekday), Weekly (on specific days, every N weeks), Monthly (on a specific date or a specific day-of-month like 'the first Tuesday'), or Yearly. Set the range: recurring indefinitely (no end date), ending after N occurrences, or ending by a specific date. For the Lakeside Medical Associates weekly supply order review (every Friday at 2:00 PM), create a weekly recurring appointment on Friday with no end date.",
              "Sharing your calendar allows other staff members to view your schedule — right-click your Calendar in the Folder Pane and choose 'Share Calendar' or 'Share.' You can grant View-only access (colleagues can see your appointments but cannot edit), or Can Edit access (colleagues can add and modify appointments on your calendar). For the office assistant managing multiple providers' schedules, having view access to all provider calendars is essential for coordinating patient appointments without conflicts.",
              "Viewing multiple calendars in overlay mode stacks two or more calendars on top of each other with transparent coloring — click the arrow beside any additional calendar in the Folder Pane to overlay it on your primary calendar. You can see your calendar and the office manager's calendar together, with each person's appointments in a different color. This is how you find open times for joint meetings without needing to call each person.",
              "Automatic Out-of-Office replies notify senders that you are unavailable — go to File > Automatic Replies. Set a start and end date, compose different replies for Inside My Organization (the internal staff message) and Outside My Organization (the external message for patients and partners). The internal message can include who to contact in your absence (with name and phone number). The external message should be professional and brief: 'Thank you for contacting Lakeside Medical Associates. I am out of the office from [dates] and will respond upon my return on [date]. For urgent matters, please call (555) 234-5678.' Never leave an automatic reply running after you return — turn it off the morning you are back.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Calendar and Meeting Management",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-6/calendar-and-meetings-outlook/infographic.png",
            alt: "Calendar and Meeting Management Quick Reference — Appointment vs Meeting decision guide, Scheduling Assistant grid diagram, recurring meeting pattern options, calendar sharing permission levels, Out-of-Office setup steps, and meeting request best practices checklist",
            caption: "Calendar and Meeting Management Quick Reference — scheduling coordination at Lakeside Medical Associates",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "When scheduling meetings that include providers at Lakeside Medical Associates, always use the Scheduling Assistant to verify their availability before sending a meeting request — never assume a provider is available during a time not blocked on their calendar. Providers who receive meeting requests for times they are seeing patients must decline and reschedule, which wastes everyone's time. Additionally, any meeting involving patient-specific discussion (case conferences, billing reviews for specific patients) should have an access restriction in Outlook so only invited clinical staff can see the meeting details — not the general administrative staff. Mark these meetings as Private in the meeting dialog to limit calendar detail visibility to non-invited attendees who have view access to the calendar.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write the meeting agenda body text for an Outlook meeting invitation for the following three meetings at a small medical office: (1) a monthly provider staff meeting (30 minutes, first Tuesday of the month, all 3 providers required, 2 admin staff optional), (2) a quarterly billing review (60 minutes, office manager and billing coordinator required), and (3) a weekly supply order check-in (15 minutes, office assistant and nurse manager, recurring every Friday). For each meeting, include a subject line, 4–5 agenda bullets, and a brief preparation instruction for attendees.' Use the generated agendas as the body text for your meeting requests in the challenge below.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You need to schedule a provider staff meeting for next Tuesday when all three providers are available. What Outlook feature shows you each provider's busy/free time side by side so you can find the right time without emailing everyone?",
            options: [
              "Month view — zoom out to see the full week for all providers",
              "The Scheduling Assistant tab in a new Meeting window",
              "The Focused Inbox filter showing only provider emails",
              "The Task list showing each provider's pending tasks",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete a full scheduling workflow for Lakeside Medical Associates — creating appointments, sending meeting requests with the Scheduling Assistant, setting up recurring events, and configuring an out-of-office reply.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a personal Appointment on today's date at 2:00 PM titled 'Submit Weekly Supply Order' with a reminder set for 30 minutes before. Change it to a recurring appointment (Weekly, every Friday, no end date).",
          "Create a Meeting Request for next Tuesday at 10:00 AM titled 'Monthly Provider Staff Meeting.' Add three fictional required attendees (Dr. Patel, Dr. Chen, Dr. Okafor at made-up @lakesidemedical.com addresses) and the office manager as Optional. Include a professional meeting agenda in the body (use your AI-generated agenda). Set the location to 'Conference Room A.' Open the Scheduling Assistant tab and take a screenshot showing the attendee grid (even if showing no conflict, as these are fictional addresses).",
          "Create a second Meeting Request for the quarterly billing review: a 60-minute meeting next month's first Wednesday at 9:00 AM, required attendees are the office manager and billing coordinator, with the AI-generated agenda in the body.",
          "Set up a recurring Weekly meeting for the Friday supply check-in (15 minutes, every Friday, Recurring Weekly, starting this Friday) with yourself and a fictional nurse manager as attendees.",
          "Configure an Automatic Reply for a fictional 2-day absence next week (choose any 2 consecutive days). Write a professional internal message (different contact for urgent matters) and a professional external message (brief, with the office phone number). Take a screenshot of the Automatic Replies dialog showing both messages configured.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit screenshots of: (1) the recurring Friday supply appointment in Calendar view, (2) the Provider Staff Meeting request with the Scheduling Assistant tab visible, (3) the Billing Review meeting request, (4) the Friday supply check-in recurring meeting confirmation, and (5) the Automatic Replies dialog with both internal and external messages. This scheduling setup represents a professional week of calendar management at Lakeside Medical Associates.",
      },
    ],
  },

  {
    slug: "working-across-office-apps",
    title: "Working Across Office Applications",
    description:
      "Learn to integrate Word, Excel, PowerPoint, and Outlook in connected workflows — embedding data, linking charts, sharing via OneDrive, co-authoring in real time, and exporting for cross-platform compatibility.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/OX3vRazm4fw",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-01.jpg",
        alt: "Attaching Office Files to Outlook Emails — documents, spreadsheets, and presentations",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-02.jpg",
        alt: "Embedding vs Linking — Paste Special options for connecting content across applications",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-03.jpg",
        alt: "Inserting an Excel Table into a Word Document — two methods compared",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-04.jpg",
        alt: "Linking an Excel Chart into PowerPoint — automatic updates when source data changes",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-05.jpg",
        alt: "OneDrive and SharePoint Integration — sharing links instead of file attachments",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-06.jpg",
        alt: "Co-Authoring in Real Time — multiple people editing the same Office file simultaneously",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-07.jpg",
        alt: "The Office Clipboard — transferring content between applications efficiently",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-08.jpg",
        alt: "PDF Export and Cross-Platform Compatibility — sharing with Google Docs and LibreOffice users",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/slide-09.jpg",
        alt: "Knowledge Check — choosing the correct integration method for a given cross-application task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates asks you to produce a monthly operations package: an Excel dashboard showing expense data, a Word report that incorporates the expense table and a commentary narrative, a PowerPoint slide with the expense chart linked to the Excel file, and an Outlook email to the physician owner with both the Word report and PowerPoint attached — with a OneDrive link to the Excel dashboard for interactive review. This is a fully integrated Office workflow — and the ability to execute it smoothly is what separates an organized professional office assistant from someone who manages each application in isolation.",
          },
        ],
      },
      {
        heading: "Attaching Files and Sharing Links",
        blocks: [
          {
            type: "paragraph",
            text: "The difference between attaching a file and sharing a link is one of the most important workflow distinctions in a modern professional environment. Understanding when to use each prevents the common problems of email size limits, outdated versions, and accidental duplicate files:",
          },
          {
            type: "list",
            items: [
              "Attaching a file sends a static copy of the document as it exists at the moment of sending — the recipient receives a snapshot that does not update if the original file changes. Attachments are appropriate for: final, approved documents that should be preserved (signed letters, completed reports), files that the recipient needs to work with offline, and files sent to external partners who do not have access to your OneDrive. Attach files in Outlook by dragging from File Explorer onto the message window, or clicking the Attach File icon in the message Ribbon.",
              "Sharing a OneDrive link sends a link to the live file in cloud storage — the recipient always sees the most current version, and multiple people can view or edit it simultaneously. Links are appropriate for: working documents that are still being updated, Excel dashboards that need to refresh with new data, and collaboration with internal team members. To share a OneDrive link from Outlook: click Attach File > browse to the OneDrive file > Outlook will ask whether to attach a copy or share a link — choose 'Share Link.' Set the link permission (Can View or Can Edit) based on the recipient's needs.",
              "Attaching multiple large files can cause emails to bounce or get flagged as spam — individual attachments over 10 MB and total email size over 20–25 MB frequently exceed recipient server limits. For the monthly operations package with a Word report, PowerPoint, and Excel dashboard, share the Excel dashboard as a OneDrive link (it may update weekly) and attach the finalized Word report as a PDF (not the editable .docx). Send the PowerPoint as an attachment only if it is under 10 MB after image compression.",
            ],
          },
        ],
      },
      {
        heading: "Embedding and Linking Content Between Applications",
        blocks: [
          {
            type: "paragraph",
            text: "Paste Special is the professional way to transfer content between Office applications with precise control over whether the content is embedded (static copy) or linked (updates automatically when the source changes):",
          },
          {
            type: "list",
            items: [
              "To insert an Excel table into a Word document: copy the Excel table range, go to Word, and choose Home > Paste > Paste Special (Ctrl+Alt+V). In the Paste Special dialog, choose 'Microsoft Excel Worksheet Object' and select 'Paste' for an embedded copy (the table becomes an Excel object within Word, editable by double-clicking it) or 'Paste Link' for a linked version (the table data updates in Word automatically whenever the Excel source file changes). Use Paste for a report where you want to preserve the data as of the reporting date. Use Paste Link when the Word report will be reviewed over several days and you want the table to reflect the latest Excel data throughout.",
              "To link an Excel chart into a PowerPoint presentation: select and copy the chart in Excel, go to PowerPoint, and use Home > Paste > Paste Special > 'Microsoft Excel Chart Object' > Paste Link. The chart appears in the slide and automatically updates whenever the Excel source data changes. This is the professional way to maintain a PowerPoint that always shows current data — update the Excel file and the PowerPoint chart updates on the next open. If you simply paste without Paste Link, the chart is embedded as a static snapshot that requires manual updating.",
              "To break a link (convert a linked object to a static embedded copy): click the linked chart or table in Word or PowerPoint, go to Edit > Links (or click the object, right-click > Linked Worksheet Object > Edit Links). Select the link and click Break Link. This is appropriate before sharing a file externally when the external recipient should not be able to update or access your source Excel files.",
            ],
          },
        ],
      },
      {
        heading: "Co-Authoring, Clipboard, and Compatibility",
        blocks: [
          {
            type: "paragraph",
            text: "Real-time co-authoring, the Office Clipboard, and cross-platform file compatibility are three integration tools that affect how Office applications work in a connected, multi-user environment:",
          },
          {
            type: "list",
            items: [
              "Co-authoring allows multiple people to edit the same Word, Excel, or PowerPoint file simultaneously when it is stored in OneDrive or SharePoint — save the file to OneDrive, share it with colleagues, and when multiple people have it open, you can see each other's cursors and changes appear in real time. This eliminates the 'last save wins' problem of multiple people editing local copies and merging conflicting changes. For the Lakeside Medical Associates monthly report, the office assistant and the office manager can both edit the Word document at the same time — no need to wait for one to finish before the other starts.",
              "The Office Clipboard holds up to 24 copied items from any Office application and makes them available to paste into any other Office application — open it via Home > Clipboard (click the small dialog launcher arrow in the Clipboard group). If you copy an Excel formula result, a Word paragraph, a PowerPoint slide title, and an Outlook email body in succession, all four items are available in the Clipboard panel for selective pasting in any order. This is faster than switching between applications repeatedly for individual copy-paste operations.",
              "Cross-platform compatibility with Google Docs and LibreOffice users requires understanding format limitations — .docx, .xlsx, and .pptx files open in Google Docs and LibreOffice but may lose some advanced formatting (tracked changes display, certain SmartArt types, advanced Excel formulas). PDF is the universally compatible format — any Office document exported as PDF displays identically on any device with any software. When sharing final documents with external partners who may not have Microsoft Office, always export as PDF unless the recipient specifically needs an editable file.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Working Across Office Applications",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-6/working-across-office-apps/infographic.png",
            alt: "Working Across Office Applications Quick Reference — attachment vs OneDrive link decision guide, Paste Special options for Excel-to-Word and Excel-to-PowerPoint integration, co-authoring requirements, Office Clipboard panel overview, and cross-platform compatibility format guide",
            caption: "Working Across Office Applications Quick Reference — integrated Office workflows for Lakeside Medical Associates",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "When sharing OneDrive links with external parties — insurance companies, referring physicians, patient advocates — carefully verify the link permission before sending. A link set to 'Can Edit' allows the recipient to modify your files. A link set to 'Anyone with the link' makes the file accessible to anyone who receives the link, potentially including unauthorized parties. For Lakeside Medical Associates documents containing patient or financial information, always use 'Specific People' sharing (entering individual email addresses) rather than 'Anyone with the link,' and always use 'Can View' rather than 'Can Edit' for external recipients unless editing access is explicitly required and approved. Review and revoke external sharing permissions quarterly to ensure no links remain active beyond their intended use.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I need to create a monthly operations report package for a small medical office practice. Describe the complete integrated workflow: (1) which data goes in Excel and how it should be structured, (2) how to bring Excel data into a Word report using Paste Special, (3) how to link the Excel chart into a PowerPoint summary slide, (4) how to set up the Outlook email to the physician owner with the correct attachments and a OneDrive link, and (5) what permissions to set on the OneDrive link for the physician. Give step-by-step instructions for each stage.' Follow the workflow to build your capstone operations package.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want the expense chart in your PowerPoint presentation to automatically update whenever you update the source data in the Excel workbook. Which Paste Special option achieves this?",
            options: [
              "Paste as 'Microsoft Excel Chart Object' (Paste — not Paste Link)",
              "Paste as 'Picture' (Enhanced Metafile)",
              "Paste Link as 'Microsoft Excel Chart Object' — creates an automatic live connection",
              "Paste as 'Unformatted Text' to preserve the numbers",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build the complete Lakeside Medical Associates monthly operations package — integrating Excel data, Word narrative, PowerPoint visualization, and Outlook email delivery in one connected workflow.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open your Excel expense dashboard from Module 4 (or create a simple 10-row expense table with Department, Category, Amount columns). Ensure it has a summary table and a chart. Save to a location where you can reference it. This is your data source.",
          "Create a new Word document titled 'Lakeside Medical Associates — Monthly Operations Report — May 2025.' Write an executive summary paragraph (3–4 sentences describing the month's overall expenses). Use Paste Special > Paste Link to insert the Excel summary table into the Word document below the paragraph. Write a 2-sentence analysis below the linked table. Save as 'Monthly Report – May 2025 – Lakeside Medical.docx.'",
          "Open PowerPoint and create a 3-slide summary deck: (1) Title slide, (2) 'Monthly Expense Summary' slide with the Excel chart linked via Paste Special > Paste Link, (3) 'Key Observations' slide with 3 bullet points referencing the data. Update one value in the Excel source data, then open PowerPoint and confirm the linked chart updates. Save as 'Monthly Summary – May 2025 – Lakeside Medical.pptx.'",
          "In Outlook, compose a professional email to a fictional physician owner (Dr. Rachel Kim at drkim@lakesidemedical.com). Subject: 'Monthly Operations Report — May 2025 — Action: Please Review Before June 1.' Body: 2 paragraphs summarizing the report and requesting review. Attach the Word report as a PDF (export it first). Attach the PowerPoint. Include a fictional OneDrive link in the email body: 'Interactive dashboard: [OneDrive link — see shared folder].' Use your full external Outlook signature.",
          "Take screenshots of: the linked Excel table in the Word document, the linked Excel chart in PowerPoint, and the Outlook email composition window showing both attachments and the OneDrive link reference. Do NOT send the email — take the screenshot while composing.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the Word document (.docx), the PowerPoint (.pptx), the PDF export of the Word report, and three screenshots (linked table in Word, linked chart in PowerPoint, Outlook email composition) to your instructor or course folder. Your work will be evaluated on: correctly linked Excel table in Word (Paste Link, not static paste), correctly linked Excel chart in PowerPoint (Paste Link), professional Outlook email with correct attachments and OneDrive link reference, and professional formatting throughout all three documents. This integrated package is what a complete monthly operations workflow looks like at Lakeside Medical Associates.",
      },
    ],
  },

  {
    slug: "outlook-integration-capstone",
    title: "Hands-On: Integrated Office Workflow",
    description:
      "Apply every Outlook and Office integration skill in a single complete capstone — build a monthly appointment summary in Excel, a formal Word report, a PowerPoint chart slide, coordinate via Outlook email and Calendar, and set up automation — all as one connected professional workflow.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/qRShQc-v3LI",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-01.jpg",
        alt: "The Integrated Office Workflow — how Excel, Word, PowerPoint, and Outlook connect in one deliverable",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-02.jpg",
        alt: "Step 1: Excel Appointment Summary — counts by provider using COUNTIF",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-03.jpg",
        alt: "Step 2: Word Formal Monthly Report — incorporating the Excel data professionally",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-04.jpg",
        alt: "Step 3: PowerPoint Summary Slide — one chart from Excel linked to the slide",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-05.jpg",
        alt: "Step 4: Outlook Email to Clinic Director — professional composition and attachment strategy",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-06.jpg",
        alt: "Step 5: Outlook Calendar — scheduling the review meeting using Scheduling Assistant",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-07.jpg",
        alt: "Step 6: Quick Step Automation — filing the director's replies automatically",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-08.jpg",
        alt: "Professional Delivery Checklist — everything to verify before sending and scheduling",
      },
      {
        src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/slide-09.jpg",
        alt: "Knowledge Check — reviewing the complete integrated Office workflow",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The clinic director at Lakeside Medical Associates has asked for the monthly appointment activity report — including an Excel summary of appointment counts by provider, a formal Word report with narrative analysis, a PowerPoint summary for the upcoming board presentation, and a review meeting scheduled for next Thursday. Additionally, the director's replies to the report email should automatically file into a designated folder so no communication is missed. This six-step workflow uses every skill from Module 6 and every Office application in the course. Completing it successfully means you are ready for the full scope of an office assistant role at a professional medical practice.",
          },
        ],
      },
      {
        heading: "The Six-Step Integrated Workflow",
        blocks: [
          {
            type: "paragraph",
            text: "This capstone workflow has six distinct steps, each building on the previous one. The order is important — the Excel data must exist before the Word report can reference it, the Word report must be complete before it can be attached to the Outlook email, and the Calendar meeting must be scheduled using the Scheduling Assistant for the correct people. Execute each step in sequence:",
          },
          {
            type: "list",
            items: [
              "Step 1 — Excel Appointment Summary: create or use an existing appointment log with at least 20 rows and columns for Provider, Appointment Date, Appointment Type, and Revenue. On a separate summary tab, use COUNTIF to calculate total appointments per provider (Dr. Patel, Dr. Chen, Dr. Okafor) and SUMIF to calculate total revenue per provider. Create a column chart from the appointment counts. This is the data foundation everything else references.",
              "Step 2 — Word Monthly Report: create a formal, multi-page Word report titled 'Lakeside Medical Associates — Monthly Appointment Activity Report — May 2025.' The report should include: an Executive Summary (1 paragraph), a Provider Activity section with the Excel summary table inserted via Paste Special > Paste Link, a Revenue Overview section with analysis of SUMIF totals, and an Appendix with a footnote citing the data source. Apply Heading styles throughout, add an automatic Table of Contents on page 2, include a header with the practice name and a footer with page numbers and date.",
              "Step 3 — PowerPoint Summary: build a 3-slide deck: Title slide, 'Appointment Activity by Provider' slide with the Excel chart linked via Paste Special > Paste Link (so it updates if Excel data changes), and a 'Key Findings' slide with 3 bullet points. Apply a professional theme, add the Slide Master footer, ensure 6×6 compliance, and export as PDF.",
              "Step 4 — Outlook Email: compose a professional email to the clinic director (fictional: Dr. Kim at drkim@lakesidemedical.com). Subject: 'May 2025 Appointment Activity Report — Please Review Before Thursday's Meeting.' Body: 2 professional paragraphs summarizing the attached report and inviting questions ahead of the review meeting. Attach the Word report as PDF. Attach the PowerPoint. Include a OneDrive sharing link reference for the Excel dashboard. Use your full external Outlook signature.",
              "Step 5 — Calendar Meeting: in Outlook Calendar, create a Meeting Request for the report review meeting next Thursday at 10:00 AM, 45 minutes duration. Title: 'Monthly Activity Report Review — May 2025.' Required attendee: Dr. Kim. Use the Scheduling Assistant to confirm she has no known conflicts (this is fictional, but demonstrate the Scheduling Assistant interface). Include a 3-item meeting agenda in the body.",
              "Step 6 — Quick Step Automation: create a Quick Step named 'File Director Reply' that performs: Flag for Follow-up (Today) + Move to a new folder named 'Director Communications' + Mark as Read. This ensures all replies from the clinic director are immediately flagged for action and organized.",
            ],
          },
        ],
      },
      {
        heading: "Professional Delivery Standards",
        blocks: [
          {
            type: "paragraph",
            text: "This integrated workflow produces deliverables that reflect directly on your professional competence at Lakeside Medical Associates. Before sending any element of this workflow, verify every item on this standards checklist:",
          },
          {
            type: "list",
            items: [
              "Excel: all COUNTIF and SUMIF formulas verified manually for at least 3 providers — totals match what you would get by manually counting the appointment log. Chart is correctly labeled with title, axis labels, and data labels. Summary tab is clearly organized and legible without the need to navigate the data tab.",
              "Word report: Table of Contents is updated and reflects final page numbers. All Heading styles are applied consistently. The linked Excel table shows current data. Footnotes cite the correct source. The document has been spell-checked and grammar-checked (F7). No tracked changes or comments remain. PDF export opens correctly and shows all content.",
              "PowerPoint: linked chart shows current Excel data. Slide Master footer appears on all non-title slides. All slides comply with the 6×6 rule. Fade transitions on all slides. PDF export opens and renders correctly.",
              "Outlook email: subject line is specific and professional. Body is 2 substantive paragraphs (not one-line). Both the Word PDF and PowerPoint are confirmed attached (not just referenced). Full external signature appears. Email importance is set to Normal (not High).",
              "Calendar meeting: correct date and time. Duration is 45 minutes. All required attendees are added. Scheduling Assistant screenshot shows it was checked. Meeting agenda is included in the body. Reminder is set to 15 minutes.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Integrated Workflow Checklist",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-6/outlook-integration-capstone/infographic.png",
            alt: "Integrated Office Workflow Quick Reference — six-step workflow diagram showing Excel → Word → PowerPoint → Outlook Email → Calendar → Quick Step sequence, with a quality checklist for each step and the key integration tools (Paste Special, linked chart, Scheduling Assistant, Quick Step) highlighted at each stage",
            caption: "Integrated Office Workflow Quick Reference — the complete Lakeside Medical Associates monthly report cycle",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "The monthly appointment activity report contains financial data (revenue by provider) and patient-volume data that are confidential operational statistics at Lakeside Medical Associates. This report must not be shared outside of the leadership team (physician owner, clinic director, office manager) without explicit authorization. Do not leave the Word report, PowerPoint, or Excel file open on a shared computer when you step away. Lock your workstation (Windows key + L) any time you leave your desk. When sending via email, confirm the recipient's email address is correct before clicking Send — sending a financial operations report to a wrong address (even accidentally) constitutes a confidential information breach. Double-check every address in the To field before clicking Send on any document containing practice financial data.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write the complete content for a formal monthly appointment activity report for a small medical practice (Lakeside Medical Associates). The report covers May 2025 and includes: (1) a 3-sentence executive summary noting overall volume, top-performing provider, and revenue total, (2) a Provider Activity section with analysis text for 3 providers (Dr. Patel: 42 appointments, $18,500 revenue; Dr. Chen: 38 appointments, $16,200 revenue; Dr. Okafor: 29 appointments, $13,800 revenue), and (3) a Key Findings section with 3 bullet observations and 2 recommendations for June. Format appropriately for insertion into a professional Word document with Heading styles.' Use the generated content as the narrative body of your Word report for this capstone.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In the Lakeside Medical Associates integrated workflow, which step must be completed BEFORE you can compose the Outlook email to the clinic director?",
            options: [
              "The Calendar meeting must be scheduled first so you can reference the meeting date in the email",
              "The Quick Step automation must be set up first so replies are automatically filed",
              "The Word report must be completed and exported as PDF, and the PowerPoint must be ready to attach",
              "The Scheduling Assistant must be used to confirm the director's availability before sending anything",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Execute the complete six-step integrated Office workflow for Lakeside Medical Associates and submit all deliverables as a cohesive professional package. This is your final capstone for the entire Office Productivity Applications course.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Build the Excel appointment summary: create a 20-row appointment log, a summary sheet with COUNTIF and SUMIF formulas for 3 providers, and a column chart. Verify all formulas manually. Save as 'Appointment Summary – May 2025 – Lakeside Medical.xlsx.'",
          "Build the Word report: formal multi-page document with TOC, Executive Summary, Provider Activity section with linked Excel table, Revenue Overview, and a cited data source footnote. Apply all heading styles, header/footer with page numbers, spell-check, and export as PDF. Save .docx and PDF.",
          "Build the PowerPoint: 3 slides (Title, Chart, Key Findings) with linked Excel chart, professional theme, Slide Master footer, 6×6 compliance, and PDF export. Save .pptx and PDF.",
          "Compose the Outlook email to the clinic director — professional 2-paragraph body, Word PDF attached, PowerPoint attached, OneDrive link reference in body, full external signature. Take a screenshot of the complete composed email before sending — do NOT send.",
          "Create the Calendar meeting request (next Thursday, 10:00 AM, 45 min) with the clinic director as required attendee, 3-item agenda in body, and Scheduling Assistant screenshot. Create the 'File Director Reply' Quick Step and take a screenshot of it in the Quick Steps gallery. Save all six outputs: Excel workbook, Word .docx, Word PDF, PowerPoint .pptx, PowerPoint PDF, and the four screenshots.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Final Deliverable: Submit to your instructor — (1) Excel workbook, (2) Word .docx, (3) Word PDF, (4) PowerPoint .pptx, (5) PowerPoint PDF, and (6) four screenshots (composed Outlook email, Calendar meeting with Scheduling Assistant, Quick Step gallery showing 'File Director Reply,' and the linked Excel table inside the Word document). Your complete capstone submission will be graded on: data accuracy in Excel, professional narrative quality in Word, correct linked chart in PowerPoint, professional Outlook email composition, proper Calendar meeting setup, and Quick Step automation configured. Completing this capstone at a passing grade means you are ready to serve as an Office Productivity specialist at Lakeside Medical Associates or any professional office environment that uses Microsoft Office 2019.",
      },
    ],
  },
];
