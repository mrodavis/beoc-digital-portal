import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "email-fundamentals",
    title: "Email Fundamentals",
    description:
      "Understand how email works, navigate your inbox confidently, and set up your account for professional use in a medical office environment.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/WidJjNyZ-K4",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your first task at Lakeside Medical Associates is to set up your work email account, configure your signature, and respond to the five messages that arrived overnight. You have never used Outlook before — only Gmail on a personal account. This lesson bridges that gap and gets you ready to manage professional email from day one.",
          },
        ],
      },
      {
        heading: "How Email Works",
        blocks: [
          {
            type: "paragraph",
            text: "Email is the most fundamental communication tool in professional environments. Understanding how it works technically helps you troubleshoot problems and use it more confidently:",
          },
          {
            type: "list",
            items: [
              "An email address identifies a specific mailbox on a mail server — the part before the @ sign is the username (or alias), and the part after is the domain name of the mail server. 'frontdesk@lakesidemed.example.com' means the mailbox named 'frontdesk' on the mail server for lakesidemed.example.com. Every organization that hosts email has one or more mail servers managing their email traffic.",
              "When you send an email, it travels from your email client (Outlook, Gmail) to your organization's mail server, then across the internet to the recipient's mail server, where it waits until the recipient's email client downloads it. This process typically takes seconds, but can take minutes if either mail server is under load. If an email bounces back, the error message tells you whether the problem was the address (invalid), the recipient's server (full inbox or unreachable), or a security filter (spam rejection).",
              "Microsoft Outlook is the email client used in most medical offices that use Microsoft 365 — it connects to Exchange Online, Microsoft's business mail service. Outlook comes in several versions that all open the same mailbox: the new Outlook for Windows (included with recent versions of Windows 11, with a Settings gear at the top right and no File tab), classic Outlook (the older desktop app with a File tab, still supported), Outlook on the web in a browser, and the Outlook mobile app. New Outlook was built from Outlook on the web, so the two look and work almost the same. This lesson gives new Outlook steps first and classic Outlook steps in parentheses.",
              "IMAP and POP3 are the technical protocols email clients use to retrieve mail — you do not need to manage these directly in a configured office environment, but if you are ever asked by IT to set up an email account manually, IMAP is the correct choice for most situations because it syncs email across all your devices (unlike POP3, which downloads email to one device only).",
            ],
          },
        ],
      },
      {
        heading: "Navigating Outlook",
        blocks: [
          {
            type: "paragraph",
            text: "Outlook has a consistent layout with several main components that every user should know:",
          },
          {
            type: "list",
            items: [
              "The folder pane (left side) shows all your email folders — Inbox (new emails arrive here), Sent Items (copies of emails you have sent), Drafts (emails you have started but not sent), Deleted Items (emails you have deleted but not permanently removed), and Junk Email (suspected spam). Organizational folders you create to sort emails also appear here.",
              "The message list (center) shows the emails in the currently selected folder — each email shows the sender name, subject line, date, and a preview of the first line. Unread emails appear in bold. Click any email to open it in the reading pane or double-click to open it in a separate window.",
              "The reading pane (right side or bottom) displays the content of the selected email without opening a new window — this speeds up scanning of emails significantly. You can reply directly from the reading pane using the Reply or Reply All buttons that appear above the message.",
              "Outlook's calendar, contacts, and tasks are on the navigation bar along the left edge of the window — icons for Mail, Calendar, People (contacts), and To Do let you switch between them (classic Outlook shows Tasks instead of To Do, and older setups put the bar below the folder pane). For a front desk professional, you will use all four regularly: email for communication, calendar for scheduling, contacts for frequently messaged recipients, and To Do for follow-up reminders.",
            ],
          },
        ],
      },
      {
        heading: "Setting Up a Professional Email Signature",
        blocks: [
          {
            type: "paragraph",
            text: "An email signature is the block of text that automatically appears at the bottom of every email you send — it identifies who you are and how to reach you, and projects professionalism to every recipient. Setting it up correctly on your first day is one of the most important onboarding tasks:",
          },
          {
            type: "list",
            items: [
              "To create a signature in new Outlook: on the View tab select View settings (or select Settings, the gear at the top right) › Accounts › Signatures. Select New signature, give it a name (e.g., 'Standard'), type your signature, and select Save. Then, under Select default signatures, choose it for new messages (and for replies and forwards, if you want) and select Save again. In classic Outlook, the path is File › Options › Mail › Signatures, where you choose the signature for New messages and Replies/forwards.",
              "A professional medical office email signature should include: your full name, your job title (Office Assistant), the practice name (Lakeside Medical Associates), phone number with extension, fax number (if applicable), office address, and the practice website. Do not include your personal phone number or personal email address in a work signature.",
              "Include a HIPAA confidentiality notice in your signature — most healthcare organizations include a standard disclaimer such as: 'This email may contain confidential or protected health information. If you are not the intended recipient, please notify the sender immediately and destroy this message.' Your supervisor or IT department will provide the exact text your practice uses.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Your work email account is property of Lakeside Medical Associates and may be monitored by IT and management. Do not use your work email for personal correspondence, subscribing to personal mailing lists, or conducting any activity unrelated to your work duties. Emails sent from your work account represent the practice even if you intend them as personal messages. Additionally, handle patient information in email only the way your practice's policy allows. HIPAA permits health care providers to email patients when they use reasonable safeguards, and many practices require encryption or a secure messaging portal for anything that identifies a patient. When in doubt, ask your supervisor before you send.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write a professional email signature for a medical office front desk assistant named [your name] at Lakeside Medical Associates. Include all standard elements including a HIPAA confidentiality notice. Format it cleanly without excessive design.' Review the output, customize it with your actual information, and use it as the starting point for your Outlook signature.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What is the difference between 'Reply' and 'Reply All' in Outlook?",
            options: [
              "Reply sends to all recipients including CC; Reply All sends only to the original sender",
              "Reply sends only to the original sender; Reply All sends to the sender and all other recipients (To and CC)",
              "Reply and Reply All do the same thing but Reply All is faster",
              "Reply All is used for forwarding emails to new recipients",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Set up your professional email environment in Outlook.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a professional email signature in Outlook following the format: Full Name, Title, Practice Name, Phone, Fax, Address, Website, and a confidentiality notice. Apply it to new messages. Screenshot the Signatures settings page showing your completed signature.",
          "Create four email folders in Outlook: Patient Inquiries, Insurance & Billing, Staff Communications, and Vendors. These will be used for organizing incoming email in the next lesson.",
          "Send yourself a test email with the subject line 'Signature Test — [Your Name]' and confirm your signature appears correctly in the received email. Screenshot the received email showing your full signature.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox. Its results page replaces the two screenshots.",
          "Write a brief paragraph (3–5 sentences) describing how your work email differs from your personal email in terms of appropriate use, content, and professionalism expectations.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your two screenshots (Signatures settings and received email), or your Challenge Lab results page (Print or save results), and your paragraph about professional email use. This exercise confirms that you can configure an Outlook account professionally and that you understand the behavioral expectations for work email from day one.",
      },
    ],
  },

  {
    slug: "writing-professional-emails",
    title: "Writing and Sending Professional Emails",
    description:
      "Write clear, correctly structured professional emails that represent Lakeside Medical Associates with competence and credibility.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You have five emails to send this morning: a response to a patient's appointment question, a follow-up to an insurance company about a delayed reimbursement, a request to a medical supply vendor for a quote, a reminder to a referring physician's office about missing records, and an internal memo to the clinical staff about a schedule change. Each requires a different tone, level of formality, and structure — but all five must be professional, clear, and represent Lakeside Medical Associates well.",
          },
        ],
      },
      {
        heading: "Professional Email Structure",
        blocks: [
          {
            type: "paragraph",
            text: "Every professional email follows a consistent structure that makes it easy for the recipient to understand your purpose and respond appropriately. Deviating from this structure creates confusion and signals a lack of professionalism:",
          },
          {
            type: "list",
            items: [
              "The subject line is the most important line in your email — it determines whether the email is opened and how quickly. A good subject line is specific, actionable, and front-loads the key information: 'Appointment Question — Thursday, 10:30 AM' is better than 'Question.' 'Reimbursement Follow-Up — Claim #4892' is better than 'RE: RE: RE: Claim.' Keep patient names and health details out of subject lines; they show up in notifications and message lists where anyone nearby can read them. In a medical office inbox that receives hundreds of emails per day, vague subject lines get deprioritized.",
              "The salutation opens the email professionally — use 'Dear Dr. Yuen,' for a physician you have not met, 'Dear Ms. Thompson,' for a formal external contact, or 'Hi James,' for a colleague you work with regularly. 'Hello,' without a name is acceptable when you do not know the recipient's name. 'Hey' is never appropriate in professional email. When in doubt, err toward the more formal option.",
              "The opening sentence states your purpose immediately — do not bury the main point. 'I am writing to follow up on Claim #4892, submitted to Metro Health Plan on March 10' is professional and efficient. 'I hope this email finds you well' wastes the recipient's time and is considered hollow filler in most professional settings. State your purpose in the first sentence.",
              "The body expands on the purpose with all relevant details — include only what the recipient needs to take action. If you are requesting a callback, include the best time and number. If you are attaching a document, name it specifically in the email body. Keep paragraphs short (3–4 sentences each). Use numbered lists for sequential steps and bullet points for grouped information.",
              "The closing should be professional and direct — 'Please let me know if you have any questions' or 'I look forward to your response by [date]' sets clear expectations. Close with 'Sincerely,' 'Best regards,' or 'Thank you,' followed by your full signature. Do not close with 'Thanks!' or abbreviations like 'Thx.'",
            ],
          },
        ],
      },
      {
        heading: "Tone and Language",
        blocks: [
          {
            type: "paragraph",
            text: "Tone in email is harder to control than tone in person because the recipient cannot hear your voice or see your body language. Everything must be conveyed through word choice and sentence structure:",
          },
          {
            type: "list",
            items: [
              "Use formal language for external communications — when emailing patients, insurance companies, vendors, or referring physicians, write in a formal register. Use full words rather than abbreviations, complete sentences, and correct grammar. 'We will follow up regarding your claim within 48 hours' is formal. 'We'll get back to u about that' is not appropriate in any professional email.",
              "Use a neutral, professional tone for sensitive topics — when addressing a billing dispute, a patient complaint, or a delayed service, acknowledge the issue without blame and state what will be done. 'I understand this has caused inconvenience. We are reviewing the claim and will follow up within 48 hours' is professionally appropriate. Defensive or accusatory language ('That is not our fault') escalates conflict and reflects poorly on the practice.",
              "Match formality to the relationship — internal emails to close colleagues can be less formal than external communications, but should never be casual to the point of being unprofessional. An internal email saying 'Hey team, heads up — patient schedule is updated for Tuesday' is appropriate. The same message sent to a referring physician's office would require a formal structure.",
              "Proofread before sending — fix the words Outlook underlines as you type (in classic Outlook, F7 runs a full spelling and grammar check), re-read the email once for clarity, and verify the recipient's name and email address are correct before clicking Send. Sending an email with the wrong name in the salutation to a physician is embarrassing. Sending patient information to the wrong email address can be a HIPAA breach that your practice must report.",
            ],
          },
        ],
      },
      {
        heading: "Attachments and Forwarding",
        blocks: [
          {
            type: "paragraph",
            text: "Attachments and forwarded messages require extra care in a medical office environment:",
          },
          {
            type: "list",
            items: [
              "Attach files before writing the body — do not write the email first and then try to remember whether you attached the file. If your email says 'I have attached the referral form' but you forgot to attach it, you must send a follow-up apology — a situation easily avoided by attaching first. Outlook may warn you if your message mentions an attachment but no file is attached, but don't count on the reminder.",
              "Name attachments descriptively before attaching — 'Referral_Form_2026-05_Riverside_Imaging.pdf' is a professional attachment name that the recipient can save and find later. 'Document1.docx' or 'Scan0042.pdf' provides no information and reflects poorly on your organization.",
              "Think carefully before forwarding — a forwarded email thread may contain information the new recipient should not see. Before forwarding, scroll through the entire thread to confirm all content is appropriate for the new recipient. In a medical office, a forwarded thread that accidentally includes another patient's information is a HIPAA incident.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Treat Protected Health Information (PHI) in email with care. HIPAA does not forbid email, but health care providers must use reasonable safeguards, such as checking the address, limiting the information to what is needed, and using encryption or a secure messaging system when the practice requires it. A patient may ask to receive information by regular email after being told about the risks. Follow your practice's policy for any email containing patient names, diagnoses, appointment details, or billing information, and if you are unsure whether a message contains PHI, ask your supervisor before sending.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask an AI assistant such as Microsoft Copilot or ChatGPT — 'Write a professional email from a medical office assistant at Lakeside Medical Associates to an insurance claims representative following up on a reimbursement claim submitted 45 days ago that has not yet been processed. The tone should be polite but firm, and the email should include a request for a response by a specific date.' Never type real patient names, claim numbers, or other patient information into an AI tool unless your practice has approved it. Review the draft, customize it as needed, and use it as a model for your own follow-up emails.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which subject line is most appropriate for a follow-up email to an insurance company about a delayed claim?",
            options: [
              "Following up",
              "RE: RE: RE: Insurance",
              "Reimbursement Follow-Up — Claim #4892-2025 — Submitted March 10",
              "URGENT — respond immediately",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Write five professional emails for Lakeside Medical Associates covering the scenarios below.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Patient response: Reply to a patient named Mr. Carlos Reyes who emailed asking whether his appointment on Tuesday at 2:00 PM is confirmed and whether he should bring his insurance card. Confirm the appointment, ask him to bring both his insurance card and a photo ID, and sign with your full signature.",
          "Insurance follow-up: Write to claims@metrohealthplan.example.com following up on Claim #BR-4892, submitted six weeks ago, which has not been processed. Request a status update by a specific date.",
          "Vendor inquiry: Email orders@brightpathsupply.example.com requesting a price quote for 500 units of blue exam table paper and 100 boxes of nitrile gloves (size medium). Ask for the quote by a specific date.",
          "Internal memo: Write a brief email to the clinical staff (to: clinical@lakesidemed.example.com) announcing that Tuesday's schedule has been updated because a provider is out. Patients have been notified. The email should be informative but informal in tone.",
          "Referring physician: Email Riverside Family Practice (records@riversidefamily.example.com) to request medical records for a patient who has a procedure scheduled next month. Request the records within 14 days, and say that you will send the patient's identifying details through the practice's secure method.",
          "You can write the five emails in a Word document, or send them in the Challenge Lab below (on a school computer, use the lab instead of a real mailbox). Use only the example.com addresses above, never real company addresses.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit all five emails as a single Word document, clearly labeled by scenario number, or your Challenge Lab results page (Print or save results). Each email will be graded on subject line quality, appropriate salutation, clear purpose statement, correct body structure, professional closing, and correct signature. These five emails represent the types of communication you will write every week as a medical office professional.",
      },
    ],
  },

  {
    slug: "inbox-management",
    title: "Managing Your Inbox",
    description:
      "Organize a high-volume inbox using folders, rules, flags, and filters — keeping your email system productive instead of overwhelming.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/cwNs39cpv1o",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The Lakeside Medical Associates main inbox receives 80–100 emails per day. By Friday afternoon, the inbox has 400 unread messages. Appointment requests are buried under insurance notifications and vendor newsletters. Important referral records from physicians are mixed in with automated billing reports. Your supervisor asks you to design and implement an email organization system that ensures nothing important is missed — and implement it before Monday morning.",
          },
        ],
      },
      {
        heading: "Folder Organization Strategy",
        blocks: [
          {
            type: "paragraph",
            text: "A well-organized folder structure turns a chaotic inbox into a reliable filing system. The key is to match your email folder structure to how you actually work — not just how the information is categorized:",
          },
          {
            type: "list",
            items: [
              "The Inbox should contain only emails that require action — emails you have read and acted on should be filed into category folders, not left sitting in the Inbox. When the Inbox is a to-do list rather than a dumping ground, you can see at a glance what still needs your attention. A processed, organized inbox typically has 10–30 emails at any one time, not 400.",
              "Create category folders that match your workflow — for Lakeside Medical Associates, appropriate top-level email folders might be: Patient Inquiries, Insurance & Billing, Referrals, Staff & Internal, Vendors, and Reference (for information you need to keep but not act on). Each folder becomes a searchable archive of that communication type.",
              "Use subfolders for high-volume categories — if the Insurance & Billing folder receives 30 emails per day, create subfolders by payer, such as Metro Health Plan, Medicare, and Medicaid. This makes it easy to find all correspondence about a specific payer without scrolling through hundreds of mixed messages.",
              "An '@Action' folder (the @ symbol sorts it to the top of the folder list) is useful for emails that require follow-up but cannot be immediately resolved — move any email there that is pending a callback, a document, or another person's response. Review this folder each morning and afternoon.",
            ],
          },
        ],
      },
      {
        heading: "Rules, Filters, and Flags",
        blocks: [
          {
            type: "paragraph",
            text: "Outlook's automation tools can sort, flag, and organize incoming email without manual effort — setting up rules correctly eliminates a significant portion of inbox management:",
          },
          {
            type: "list",
            items: [
              "Outlook Rules automatically process incoming emails based on conditions you define — for example: 'If the sender is claims@metrohealthplan.example.com, move to Insurance & Billing > Metro Health Plan.' To create a rule, right-click an email from the sender and choose Rules › Create rule, or go to Settings › Mail › Rules › Add new rule for more options (classic Outlook: Home tab › Rules › Create Rule). You can set rules based on sender, recipient, subject line keywords, or whether you are on the To or CC line. Rules run on new mail; to sort messages already in your Inbox, use Run rule now in Settings › Mail › Rules.",
              "Flags (the flag icon on each email) mark messages for follow-up — in new Outlook, a flagged email also appears in the Flagged email list in To Do (classic Outlook shows it in the To-Do Bar and Tasks). Use flags for emails that need a response but cannot be addressed immediately. Use the arrow next to Flag / Unflag (or right-click › Flag) to choose when you want to follow up, such as today or later this week, and Outlook tracks the due date for you.",
              "Junk email filters move obvious spam out of your inbox — Outlook's built-in junk filter catches most spam, but some still gets through. Select the message and choose Report › Report junk (or Report phishing for a scam). Reporting doesn't block the sender; to block an address, add it under Settings › Mail › Junk email › Blocked senders (classic Outlook: Home tab › Junk › Block Sender). If a legitimate email lands in Junk Email, select it and choose Not junk to move it back to your Inbox.",
              "Categories (color labels) provide a visual organization layer without moving emails between folders — right-click any email and choose 'Categorize' to assign a color-coded label. You might use red for urgent, blue for billing, green for patient communications. Sort or filter by category to see all messages of a specific type at once. Categories work well alongside folders rather than as a replacement for them.",
            ],
          },
        ],
      },
      {
        heading: "Searching Your Email",
        blocks: [
          {
            type: "paragraph",
            text: "Even with a perfect folder system, you will sometimes need to find an email without knowing exactly where it is — Outlook's search is powerful when used correctly:",
          },
          {
            type: "list",
            items: [
              "The Search box at the top of the Outlook window searches your mailbox — type a name, claim number, or subject line keyword and press Enter. Use the filter button on the right side of the search box to narrow results by sender, recipient, subject, keywords, date, or attachments, or use the Refine group on the Search tab.",
              "When there are too many results, add more detail instead of scrolling: a name plus a claim number finds one message faster than either alone.",
              "Search operators make email search much more precise — use 'from:dr.yuen@riversidefamily.example.com' to show only emails from that address, 'subject:claim' to search only subject lines, or 'hasattachment:yes' to find only emails with attachments. Combine them with AND, OR, and NOT, typed in capital letters.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never delete emails that may have legal, compliance, or patient care significance — in a medical office, email correspondence about patient appointments, insurance claims, billing disputes, and referrals may be subject to records retention requirements and may be needed as evidence in a complaint or audit. When you are unsure whether an email is safe to delete, move it to an Archive folder rather than deleting it. Check with your supervisor about your practice's email retention policy before mass-deleting any category of messages.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Design a complete email organization system for a medical office front desk assistant who receives 80+ emails per day from patients, insurance companies, referring physicians, vendors, and internal staff. Include: folder structure, Outlook rule suggestions, a system for flagging follow-ups, and a daily inbox processing routine that takes no more than 30 minutes total.' Implement as much of the system as your Outlook account allows.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What is the most effective way to automatically sort incoming emails from your insurance company into their own folder?",
            options: [
              "Check email every hour and manually drag them to the folder",
              "Create an Outlook Rule: 'If from claims@insurance.com, move to Insurance & Billing folder'",
              "Set a flag on each insurance email as it arrives",
              "Block the insurance company's email address",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build and document a complete inbox organization system for Lakeside Medical Associates.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In Outlook, create the following folder structure: Patient Inquiries, Insurance & Billing (with subfolders such as Metro Health Plan and Medicare), Referrals, Staff & Internal, Vendors, @Action, and Reference. Screenshot the folder tree in Outlook.",
          "Create at least two Outlook Rules to automatically sort incoming email. Write down each rule's conditions and action in a simple table format.",
          "Flag three existing emails in your Inbox for follow-up (for example, one for today and one for later in the week). Screenshot the Flagged email list in To Do (classic Outlook: the To-Do Bar) showing the flagged items.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox. Its results page replaces the folder and flag screenshots.",
          "Write a one-page Inbox Management Guide for a new Lakeside Medical Associates front desk hire, covering: folder structure, daily processing routine (when to sort, when to flag, when to respond), and how to use search when you cannot find an email.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Outlook folder screenshot and flagged items screenshot (or your Challenge Lab results page), your rules table, and your Inbox Management Guide (Word document) to your instructor. This complete package demonstrates that you can build and document a professional email management system — one of the most practically valuable skills in office administration.",
      },
    ],
  },

  {
    slug: "email-etiquette",
    title: "Email Etiquette in a Professional Setting",
    description:
      "Master the unwritten rules of professional email that protect your reputation and keep workplace communication clear, efficient, and respectful.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/Gk9g0EBRavc",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A new staff member at Lakeside Medical Associates hits Reply All on an internal email about a difficult patient situation — accidentally including the patient in the reply. Another staff member sends an angry email at 11 PM that causes a tense situation the next morning. A third sends a three-sentence message that requires five follow-up emails because the original did not include enough information. This lesson ensures you never become the source of these common, reputation-damaging email mistakes.",
          },
        ],
      },
      {
        heading: "Response Time and Expectations",
        blocks: [
          {
            type: "paragraph",
            text: "Email response time is one of the clearest signals of professionalism and reliability. In a medical office, delayed responses can affect patient care and practice operations:",
          },
          {
            type: "list",
            items: [
              "Respond to all work emails within one business day — the professional standard is to respond to any email requiring a reply within 24 business hours. For urgent clinical matters, same-day or same-shift response is expected. If you cannot fully respond within 24 hours, send a brief acknowledgment: 'Thank you for your message — I am looking into this and will have a full response for you by [date/time].'",
              "Set an Out of Office auto-reply when you will be away — in new Outlook, go to Settings › Accounts › Automatic replies (classic Outlook: File › Automatic Replies), turn on automatic replies, and set the dates you will be unavailable. Include: who to contact for urgent matters in your absence, when you will return, and a brief note that emails will be addressed upon your return. Never simply disappear from email for days without an auto-reply in a professional role.",
              "Do not send emails in anger or frustration — if you receive an email that upsets you, wait at least 30 minutes before responding. Write your response, read it carefully, and ask yourself whether you would be comfortable if your supervisor read it. If not, revise it. Email is permanent and can be forwarded — a single professionally-worded email in a difficult situation protects you; an angry reply can define your professional reputation negatively.",
              "Time your emails for business hours when possible — sending emails at midnight signals poor boundaries, and some recipients may feel pressure to respond outside their own work hours. In new Outlook, Schedule send (the arrow next to the Send button) lets you write an email at night and schedule it to deliver at 8 AM the next morning; the message waits in Drafts until then. Classic Outlook uses Options › Delay Delivery, and the message waits in the Outbox.",
            ],
          },
        ],
      },
      {
        heading: "To, CC, and BCC",
        blocks: [
          {
            type: "paragraph",
            text: "The To, CC, and BCC fields determine who receives your email and how — using them correctly is essential for maintaining clear communication and protecting privacy:",
          },
          {
            type: "list",
            items: [
              "The To field contains the primary recipients — the people you are directly communicating with and from whom you expect a response. In most professional emails, there should be only one person (or one role-based address) in the To field to establish clear accountability. When there are multiple people in To, it is unclear who is responsible for responding.",
              "CC (Carbon Copy) notifies additional people who should be aware of the communication but are not expected to respond — for example, CCing your supervisor when corresponding with an insurance company about a complex claim keeps them informed without requiring a reply. Recipients in CC can see all other recipients, including other CC addresses.",
              "BCC (Blind Carbon Copy) sends a copy to someone without the other recipients knowing — useful for sending a mass email to a list while protecting each recipient's email address from the others, such as a reminder to community volunteers. Never use BCC for deceptive purposes — such as secretly copying someone in a dispute without the other party's knowledge.",
              "Reply All sends your reply to everyone in the original To and CC fields — think before using it. Reply All is appropriate for group discussions where everyone's awareness matters (a team scheduling question). Reply All is inappropriate when only the original sender needs your response, or when the group is large. The accidental Reply All to 200 recipients is one of the most common and embarrassing email mistakes in professional environments.",
            ],
          },
        ],
      },
      {
        heading: "Common Email Mistakes and How to Avoid Them",
        blocks: [
          {
            type: "paragraph",
            text: "Certain email mistakes appear so frequently in professional environments that they have become classic cautionary tales. Knowing them specifically helps you avoid them:",
          },
          {
            type: "list",
            items: [
              "Sending to the wrong recipient — always verify the email address before sending, especially when typing a name that autocompletes. 'Dr. Jennifer Smith' at your practice and 'Dr. Jennifer Smith' at a different practice may both appear in your autocomplete suggestions. In a medical office, sending patient information to the wrong Dr. Smith is a HIPAA breach. Double-check addresses when sending anything sensitive.",
              "Vague subject lines that create confusion — if every email in a thread has the subject line 'Re: Re: Re: Question,' no one can find what they need. Update the subject line when the topic of a thread changes: 'Re: Patient Inquiry [Updated — Appointment Rescheduled to May 22].'",
              "Email chains that should be a phone call — if a topic has generated more than 4–5 back-and-forth replies with no resolution, pick up the phone. Long, complex email chains about nuanced situations are inefficient and create confusion. In a medical office, never use email to resolve a clinical concern that requires immediate judgment — call.",
              "Missing attachments — mention any attachment in the body of the email ('I have attached the referral form') and confirm the file is attached before clicking Send. Outlook may warn you when a message mentions an attachment but has none — pay attention to that prompt, but check for yourself.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "In any patient-related dispute, billing conflict, or compliance issue, your email communication creates a permanent written record that could be reviewed during an audit, insurance appeal, or legal proceeding. Write every professional email assuming it may someday be read by someone other than the intended recipient — a supervisor, an attorney, or a regulatory investigator. This is not a reason to be evasive or withhold information — it is a reason to be accurate, professional, and precise in every email you send.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Give me 10 email etiquette rules for medical office professionals that I should follow every single day, with a one-sentence explanation of why each rule matters in a healthcare setting.' Review the list and identify which two rules are most important for your specific role, and write a sentence explaining why each is particularly relevant to your daily responsibilities.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You receive an email sent to a group of 15 staff members asking who can cover the front desk on Friday. You are available. What is the correct response?",
            options: [
              "Reply All so everyone knows you volunteered",
              "Reply only to the original sender so they know you are available",
              "BCC the office manager as a backup",
              "Forward the email to yourself as a reminder",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete an email etiquette review exercise and write a professional guide for new staff.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Review five of your sent emails from the previous lesson (or write five new ones). For each email, evaluate: subject line quality (specific or vague?), salutation (appropriate formality?), opening sentence (purpose stated immediately?), closing (professional?), and signature (complete?). Note one improvement for each email.",
          "Practice Schedule send: write an email to yourself, schedule it to arrive in 2 hours, and confirm where it waits until the scheduled time (Drafts in new Outlook; the Outbox in classic Outlook with Delay Delivery). Screenshot the scheduled email.",
          "Write a professional 'Out of Office' auto-reply message for a hypothetical 3-day absence next month. It should include your return date, who to contact for urgent matters, and a professional tone. If you can, set it up in Outlook with those dates.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
          "Write a one-page Email Etiquette Guide for new Lakeside Medical Associates staff covering: response time expectations, when to Reply vs Reply All vs BCC, the five most common mistakes and how to avoid them, and your practice's rules for sending PHI by email.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your email evaluation notes (5 emails × one improvement note), your Schedule send screenshot (or your Challenge Lab results page), your Out of Office message, and your Email Etiquette Guide (Word document, max 1 page). This module capstone demonstrates that you can write, organize, and manage professional email at the level expected of a medical office front desk professional from your first day on the job.",
      },
    ],
  },
];
