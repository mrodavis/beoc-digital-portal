import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "what-is-a-crm",
    title: "What is a CRM?",
    description:
      "Understand what a CRM is, why businesses use one, and how an office assistant interacts with it daily.",
    duration: "15 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech uses Salesforce to manage all client relationships. On your first day, your manager pulls you aside and says: \"You'll need to log every client interaction here — calls, emails, meetings, everything. If it is not in Salesforce, it did not happen.\"",
          },
        ],
      },
      {
        heading: "Why CRM Systems Matter in Professional Offices",
        blocks: [
          {
            type: "paragraph",
            text: "Before CRM systems became standard, businesses managed client relationships through email threads, personal notebooks, and individual memory. The problem is that client knowledge lived in people — and when those people were unavailable, moved roles, or left the company, the relationship had to restart from zero. CRM systems solve this by making client knowledge institutional rather than personal:",
          },
          {
            type: "list",
            items: [
              "Client history is never lost — every call, email, meeting, and agreement is preserved in the system. When a new team member takes over an account, they can read a complete client history in minutes instead of starting blind.",
              "Nothing falls through the cracks — the CRM tracks due dates, follow-up reminders, and open tasks associated with every client relationship. If a follow-up is overdue, the system surfaces it.",
              "Everyone on the team shares the same client picture — instead of one person knowing a client is unhappy about a billing issue while another tries to upsell them, the CRM gives every team member access to the same complete, current record.",
              "Client data becomes a business asset — a well-maintained CRM is one of the most valuable assets a company owns. It enables forecasting, service delivery, and business development at a level that is impossible without it.",
              "The 'if it is not in the system, it did not happen' rule — when a dispute arises about what was promised, agreed, or communicated, the CRM log is the authoritative record. If an interaction was never logged, there is no evidence it occurred.",
            ],
          },
        ],
      },
      {
        heading: "What a CRM Actually Tracks",
        blocks: [
          {
            type: "paragraph",
            text: "CRM systems are built around three core object types: records, activities, and pipelines. Understanding these categories helps you understand why every piece of information you enter belongs somewhere specific — and why each field in the system exists:",
          },
          {
            type: "list",
            items: [
              "Contact records — individual people: their name, job title, email, phone number, company affiliation, and relationship notes. A contact record is the foundation of every other object in the CRM.",
              "Account or company records — the organization a contact belongs to: company name, industry, website, contract details, and account-level notes. One account can have multiple contact records attached to it.",
              "Activity logs — every interaction with a client: calls, emails, meetings, and notes. Activities are time-stamped and linked to the relevant contact and account record so the full relationship timeline is visible in one place.",
              "Deals and opportunities — the sales or service pipeline: what services a client is considering, their stage in the decision process, the estimated contract value, and expected close date.",
              "Tasks and reminders — scheduled follow-up actions linked to specific contacts: 'Call Marcus on Thursday,' 'Send renewal reminder by the 15th.' These ensure the next step in every relationship is always visible and assigned to a specific person.",
            ],
          },
        ],
      },
      {
        heading: "Popular CRM Platforms and How They Differ",
        blocks: [
          {
            type: "paragraph",
            text: "CRM platforms vary in complexity, cost, and ideal use case. As an office assistant, you may work with any of these systems depending on the organization you join. Knowing the landscape means you will never be completely unfamiliar with a new CRM on your first day:",
          },
          {
            type: "list",
            items: [
              "Salesforce — the industry standard for large and mid-size businesses. Highly customizable with a steeper learning curve. If a company uses Salesforce, they are serious about CRM and expect precise, consistent data entry. Widely certified and widely taught.",
              "HubSpot CRM — popular for small and mid-size businesses, with a generous free tier that covers most core CRM needs. Known for its clean interface and tight integration with marketing and email tools. Easier to learn than Salesforce.",
              "Zoho CRM — a cost-effective, feature-rich option commonly used by small businesses and startups. Similar structure to Salesforce but simpler to configure, with strong automation features at a lower price point.",
              "Monday.com CRM — a newer entrant built on a visual project management interface. Best for teams that already use Monday for project tracking and want their CRM to feel like a familiar board.",
              "Spreadsheet-based CRM — for very small teams or early-stage businesses, a structured Google Sheet or Excel workbook can function as a simple CRM. No automation, no reminders, no pipeline views — but zero cost and zero learning curve. Knowing how to build and maintain a spreadsheet CRM is a practical skill for any office assistant.",
            ],
          },
        ],
      },
      {
        heading: "How a CRM Fits Into Your Daily Office Workflow",
        blocks: [
          {
            type: "paragraph",
            text: "The CRM is not a tool you use once a week to catch up on logging — it is a daily workflow anchor. Office assistants who integrate CRM use into their moment-to-moment work are significantly more valuable to their team than those who treat logging as an afterthought. Here is what routine CRM use looks like in practice:",
          },
          {
            type: "list",
            items: [
              "Before every client interaction — pull up the client's record to review the last interaction, any open tasks, and recent notes. Walking into a call without reading the client history first is a missed opportunity and a risk.",
              "During every interaction — take brief notes on what was discussed, what was agreed, and what the next step is. Do not rely on memory after the fact.",
              "Immediately after every interaction — log the activity within 30 minutes of the interaction ending. Every hour that passes increases the risk of missing details.",
              "At the start of every week — review your open tasks and upcoming reminders in the CRM. Identify any follow-ups due this week and block calendar time to complete them.",
              "When receiving new client information — update records immediately when a client provides updated contact details, a new decision-maker is introduced, or a contract changes. Stale records create confusion and communication failures.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: CRM Fundamentals",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-6/what-is-a-crm/crm-fundamentals-infographic.png",
            alt: "CRM Fundamentals: From Paper Files to Digital Relationship Management — what a CRM tracks, how records and activities connect, popular platforms compared, and how CRM fits into the daily office workflow",
            caption: "CRM Fundamentals: From Paper Files to Digital Relationship Management",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Client data in a CRM is confidential business information. Never share CRM login credentials with unauthorized individuals. Never export client lists for personal use or forward client records to personal email addresses. Access to a CRM is granted for business purposes only — and every action you take in the system may be logged and audited. If you are unsure whether someone should have access to a client record, ask your manager before sharing anything.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Explain what a CRM is to someone who has never worked in an office before. Give 3 real examples of how an office assistant would use it daily.\" Review the answer and note which examples apply to a workplace like TOR Tech.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What does a CRM primarily help a business keep track of?",
            options: [
              "Employee payroll and hours worked",
              "Company inventory and supply levels",
              "Internal project timelines and milestones",
              "Every interaction and relationship with clients",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Demonstrate your foundational understanding of CRM systems by completing the tasks below. Both deliverables should reflect the level of professional clarity expected from a working office assistant:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a 1-paragraph explanation of what a CRM is and why offices use it — imagine you are explaining it to a friend who has never worked in a professional setting. Your paragraph must cover: what CRM stands for, what it tracks, and at least two specific reasons it matters",
          "List 3 specific daily tasks an office assistant at TOR Tech would perform using the CRM — be specific about what action is taken, what record is involved, and why it matters. Write 2–3 sentences per task, not single-line bullets",
          "For at least one of your 3 tasks, describe what could go wrong if the task were skipped or done incorrectly — be specific about the professional or client consequence",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your paragraph and your 3 annotated daily tasks to your instructor or course folder. Each answer should be written in complete, professional sentences — not bullet-point fragments.",
      },
    ],
  },

  {
    slug: "managing-client-records",
    title: "Managing Client Records",
    description:
      "Learn how to create, maintain, and protect accurate client records in a CRM system.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A new client named Marcus Webb just signed a contract with TOR Tech. Your manager sends you a quick message: \"Can you get Marcus set up in the system before his onboarding call tomorrow morning? We need everything in there.\" It is your job to build his client record from scratch — and to build it right.",
          },
        ],
      },
      {
        heading: "Why Accuracy Is Non-Negotiable in Client Records",
        blocks: [
          {
            type: "paragraph",
            text: "A client record is only as useful as it is accurate. An incorrect phone number means a missed call. A misspelled email address means an undelivered message. An outdated contract date means a missed renewal. The downstream consequences of inaccurate CRM data affect not just your workflow, but the entire team's ability to serve the client reliably:",
          },
          {
            type: "list",
            items: [
              "One bad record affects every person who touches that account — when a record contains an incorrect phone number or the wrong contact name, every team member who relies on that record to reach the client encounters the same failure point.",
              "Errors compound over time — a wrong email address entered today becomes a failed campaign in three months, a missed invoice in six, and a confused client in nine. Small inaccuracies have long tails.",
              "Records are used to make business decisions — renewal dates, contract values, and assigned reps in the CRM inform revenue forecasts, workload planning, and account strategy. A misconfigured record contributes bad data to those decisions.",
              "Corrections create audit trails and confusion — a corrected record always leaves behind a history of the error. Preventing the mistake is always better than fixing it later.",
              "Accuracy reflects professional standards — the quality of the records you create is visible to your manager and your colleagues. An assistant known for clean, complete records is an assistant who earns more responsibility.",
            ],
          },
        ],
      },
      {
        heading: "The Standard Fields Every Client Record Must Contain",
        blocks: [
          {
            type: "paragraph",
            text: "A complete client record is a structured document, not a free-form notes field. Each piece of information has a designated place, and every designated place must be filled before the record is considered complete. Here are the fields every new record needs before it is usable:",
          },
          {
            type: "list",
            items: [
              "Full name and preferred contact name — enter the legal name plus any nickname or preferred name the client uses. 'Marcus Webb — goes by Marc' prevents awkward first impressions when a new team member calls.",
              "Company name, industry, and website — always link the contact to their organization. Industry categorization enables filtering, reporting, and segmentation across your client base.",
              "Contact information — primary email address, direct phone number, and mailing address. Double-check every digit and character before saving. A single transposed letter or number makes the field useless.",
              "Contract details — start date, end date or renewal date, and assigned account representative. These three fields are the minimum for financial and relationship planning.",
              "Notes — the context that does not fit in a structured field: key preferences ('Marcus responds best by text, not email'), past issues ('billing dispute in Q2, resolved'), or relationship history ('referred by Jordan Chen at Apex'). Notes are what distinguish a record from a data row.",
            ],
          },
        ],
      },
      {
        heading: "Creating a New Client Record: Step by Step",
        blocks: [
          {
            type: "paragraph",
            text: "Creating a new record is not just clicking 'New Contact' and typing whatever you know. It is a structured process that should result in a complete, verified, and linked record — not a half-filled placeholder you intend to finish later. Half-finished records are nearly as dangerous as missing records:",
          },
          {
            type: "list",
            items: [
              "Check for duplicates first — before creating any new record, search the CRM for the client's name, company, and email address. A duplicate record splits the relationship history across two entries and creates confusion about which one is current.",
              "Gather all information before opening the form — collect the contract, the email introduction, and any intake form the client submitted before you start typing. Entering data from multiple incomplete sources one field at a time increases the risk of transcription errors.",
              "Fill every required field — do not save a record with blank required fields by entering placeholder text like 'TBD' or 'Unknown'. If you genuinely do not have the information, flag the record as incomplete in the Notes field and follow up immediately.",
              "Link the contact to their account — in most CRMs, a contact record must be associated with a company account. Create the account record first if it does not already exist, then link the contact to it. An unlinked contact is an orphaned record.",
              "Save and verify — after saving the record, open it and read every field back against your source document. Confirm the email address, phone number, and dates match exactly before closing the record.",
            ],
          },
        ],
      },
      {
        heading: "Maintaining and Updating Records Over Time",
        blocks: [
          {
            type: "paragraph",
            text: "A record that was accurate on day one can become inaccurate within weeks as client information changes. Maintaining records is an ongoing responsibility, not a one-time task. The office assistant who keeps records current earns a reputation for reliability that directly translates into trust from colleagues and managers:",
          },
          {
            type: "list",
            items: [
              "Update immediately when information changes — if a client mentions a new phone number in a call, do not note it somewhere and plan to update the CRM later. Log it before you move on to the next task. The update takes 30 seconds; the consequence of forgetting takes much longer to undo.",
              "Flag records when key people change — when a client's primary contact leaves or a new decision-maker is introduced, update the assigned contact immediately and add a note explaining the change and when it happened.",
              "Review records before every meaningful interaction — before a renewal call, a contract negotiation, or a new project kickoff, open the client record and verify the information is still current. Ask the client to confirm key details if anything looks stale.",
              "Archive rather than delete outdated records — when a client relationship ends or an old contact leaves, do not delete their record. Archive it. Historical records preserve context that may be relevant if the relationship is revisited months or years later.",
              "Document every update in the Notes field — when you change a phone number, email address, or contract date, add a note: 'Email updated from [old] to [new] per client email received [date].' This creates an audit trail and explains the change for anyone reviewing the record later.",
            ],
          },
        ],
      },
      {
        heading: "Record Hygiene: Preventing Duplicates and Cleaning Stale Data",
        blocks: [
          {
            type: "paragraph",
            text: "Even in well-managed CRMs, duplicate records, stale contact information, and incomplete fields accumulate over time. Record hygiene is the practice of regularly reviewing and correcting the quality of data in the system. It is not glamorous work, but a CRM with clean data is dramatically more useful than one with messy data:",
          },
          {
            type: "list",
            items: [
              "Run a duplicate check monthly — most CRM platforms have a built-in duplicate detection tool. Use it monthly to identify and merge records that represent the same person or company. When merging, keep the most complete and recently updated record.",
              "Flag incomplete records rather than ignoring them — if you discover a record with missing required fields, add a note tagging it for completion: 'Incomplete record — missing phone number and contract date. Follow up with account owner.' Then assign yourself a task to resolve it.",
              "Audit renewal dates quarterly — expired contract dates that were never updated are one of the most common CRM quality failures. A quarterly sweep of all active client accounts to verify contract dates are current prevents missed renewal conversations.",
              "Standardize data entry formats — inconsistent formats (some entries as '(555) 867-5309', others as '555.867.5309') make records harder to filter and export. Establish a consistent format for phone numbers, dates, and company names and apply it across every record you touch.",
              "Document your hygiene process — if you perform a cleanup, note what you did and when in the CRM's internal documentation or a shared log. This prevents duplicate cleanup efforts and creates accountability for data quality over time.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Client Record Management",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-6/managing-client-records/client-record-management-infographic.png",
            alt: "Client Record Management: From First Entry to Ongoing Accuracy — required fields, step-by-step record creation, maintaining and updating records over time, and record hygiene best practices",
            caption: "Client Record Management: From First Entry to Ongoing Accuracy",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never share client records or personal data with unauthorized individuals. Protecting client privacy is both a legal and professional responsibility. When in doubt about who should have access to a record, ask your manager before sharing. Never modify a client record to cover up a communication failure or change a date after the fact to make a timeline look better. CRM records are business documents — altering them falsely is a form of professional misconduct.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What fields should every client record include in a CRM for a small professional services company? Include the field name, what type of data it holds, and why it matters.\" Compare the response to the list in this lesson and note any fields that might be particularly relevant to TOR Tech.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Why is accuracy especially important when entering client contact information into a CRM?",
            options: [
              "Because the CRM will auto-correct any minor errors",
              "Because records are only audited once a year",
              "Because inaccurate records cause communication failures and damage client trust",
              "Because managers manually review every entry before it is saved",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create and document a complete, realistic client record for a fictional client. Your submission must demonstrate every skill from this lesson — not just field completion, but thoughtful, professional data entry:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a client record for a fictional client — invent all details. Include: full name and preferred contact name, company name and industry, primary email and phone number, contract start date and renewal date, assigned account rep, and at least 2 notes about their needs or relationship history",
          "Write a brief explanation (2–3 sentences) of how you checked for duplicates before creating this record and what you would have done if a match had been found",
          "Write one update scenario: describe a piece of information about this client that changes 3 months after the initial record was created (e.g., new email, new contact, contract renewal) and write the exact Notes field entry you would add when making the update",
          "Identify one field in your record that is most likely to become stale over time and explain why — and describe how you would catch it during a routine hygiene review",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed fictional client record (table, typed list, or document) plus your written responses to the three scenario questions. Each written answer must be in complete, professional sentences.",
      },
    ],
  },

  {
    slug: "professional-follow-up",
    title: "Professional Follow-Up & Communication Logs",
    description:
      "Learn how to log client communications accurately and write professional follow-up emails that build trust.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "After a 45-minute client call at TOR Tech, your manager turns to you and says: \"Log that call and send them a follow-up email with our next steps before end of day.\" This is a routine but critical task — how you log and follow up after a conversation directly shapes the client's experience of your organization's professionalism.",
          },
        ],
      },
      {
        heading: "Why Logging Every Client Interaction Matters",
        blocks: [
          {
            type: "paragraph",
            text: "Every client interaction — a two-minute phone call, a quick email, a 90-minute meeting — contains information that needs to be preserved. The moment that information lives only in one person's memory, it becomes fragile. Logging creates a shared, searchable record that any team member can use to serve the client without asking 'what did we last discuss?'",
          },
          {
            type: "list",
            items: [
              "Logs protect the organization in disputes — if a client claims they were promised something that was never agreed to, a timestamped communication log shows what was actually said, when, and by whom. Without a log, the dispute becomes your word against theirs.",
              "Logs enable seamless handoffs — when you are out sick, on vacation, or transition to a new role, a colleague can read your communication log and continue the client relationship without missing context. This is only possible if the log is complete.",
              "Logs reveal patterns — a client who has called three times in two weeks about the same issue is showing you something important. A well-maintained log surfaces that pattern; a missing log hides it.",
              "Logs are the foundation of follow-up — you cannot write a useful follow-up email if you do not have a clear record of what was discussed and agreed. The log comes first; the follow-up email comes from the log.",
              "Logging is a professional standard — organizations that take client relationships seriously require it. Your willingness to log thoroughly and consistently signals to your manager that you understand the business, not just your immediate tasks.",
            ],
          },
        ],
      },
      {
        heading: "Anatomy of a Complete Communication Log Entry",
        blocks: [
          {
            type: "paragraph",
            text: "A communication log entry is a structured record, not a free-form note. Each field serves a specific purpose, and an entry with missing fields is an incomplete record that creates gaps in the relationship history. Every log entry must contain these six elements:",
          },
          {
            type: "list",
            items: [
              "Date and time — the exact date and approximate time of the interaction. This enables chronological review and helps locate specific interactions quickly. Use a consistent date format (e.g., YYYY-MM-DD or MM/DD/YYYY) across all entries.",
              "Participants — who was involved on both sides of the interaction. For a call, this is the client name and the TOR Tech team member who participated. For an email thread, note the sender and recipients by name.",
              "Interaction type — the method of communication: phone call, email, in-person meeting, video call, or document delivery. Categorizing by type enables filtering and analysis of communication patterns over time.",
              "Summary — a 2–5 sentence description of what was discussed. Write in plain, professional language. Avoid vague summaries like 'discussed project' — be specific: 'Discussed Q3 contract renewal timeline; client requested a revised pricing proposal by August 10.'",
              "Agreed next steps — the specific actions that came out of the interaction, who is responsible for each, and when each is expected to be completed. This is the most important field in the log — it converts a conversation into a set of accountable commitments.",
              "Follow-up due date — the date by which the next action must be completed or the next contact should occur. Every interaction should produce a next action with a date attached. An interaction with no follow-up date is an interaction that may be forgotten.",
            ],
          },
        ],
      },
      {
        heading: "The Professional Follow-Up Email: Structure and Tone",
        blocks: [
          {
            type: "paragraph",
            text: "A follow-up email after a client interaction serves two functions: it reinforces what was agreed and it demonstrates professionalism. Clients who receive a clear, accurate follow-up within a few hours of a meeting feel organized and well-served. Clients who receive nothing feel forgotten. The follow-up email follows a consistent structure:",
          },
          {
            type: "list",
            items: [
              "Opening — thank the client for their time and name the specific interaction: 'Thank you for your time on today's call.' Do not write a generic 'Thanks for the chat' — be specific so the email is clearly about this interaction, not a template.",
              "Recap of key points — summarize the 2–4 most important things discussed in plain, specific language: 'We discussed your Q3 contract renewal, the timeline for the revised proposal, and your preference to hold the review meeting in person.' The recap confirms shared understanding and catches misalignments early.",
              "Next steps — list every agreed action as a clear, numbered list with each item including what will be done, who will do it, and when. Clarity here eliminates ambiguity about who owns each commitment.",
              "Invitation for corrections — add a brief line inviting the client to flag anything that does not accurately reflect the discussion: 'Please let me know if I have missed or misrepresented anything from our conversation.' This demonstrates humility and keeps the record accurate.",
              "Professional closing — close with a warm but professional sign-off and your contact information. Avoid closing lines like 'Hope to hear from you soon!' Use something clean and confident: 'Looking forward to the next steps.'",
            ],
          },
        ],
      },
      {
        heading: "Timing and Frequency: When and How Often to Follow Up",
        blocks: [
          {
            type: "paragraph",
            text: "A follow-up email sent the next day feels like an afterthought. A follow-up email sent a week later looks like a lack of interest. Timing follow-up correctly is one of the small professional habits that builds a reputation for reliability over time:",
          },
          {
            type: "list",
            items: [
              "Send the follow-up email the same day — aim for within 2–4 hours of the interaction ending. Same-day follow-up signals professionalism and makes the email feel like part of the meeting rather than an administrative afterthought.",
              "Log the interaction before drafting the email — the log entry is the source material for the follow-up email. Writing the email first and logging afterward increases the risk of inconsistencies between what you promised and what you documented.",
              "Follow up on open actions before the agreed deadline — if you told a client you would send a proposal by Friday, send a brief update by Wednesday if the proposal is still in progress. Proactive communication about open commitments prevents anxiety on the client side.",
              "Do not let follow-ups go silent — if a client has not responded to a follow-up within 3–5 business days on a time-sensitive matter, send a brief, polite check-in. Silence is not agreement, and a second touch often unblocks a stalled conversation.",
              "Frequency depends on the client and the situation — a client in the middle of a contract renewal needs more frequent contact than a client in a stable long-term relationship. Match your follow-up cadence to the current stage and sensitivity of the relationship.",
            ],
          },
        ],
      },
      {
        heading: "Setting Follow-Up Reminders That Actually Work",
        blocks: [
          {
            type: "paragraph",
            text: "The most common reason a follow-up gets missed is not carelessness — it is the absence of a system for tracking open commitments. Memory alone is not a reliable system for managing professional follow-up obligations. Reminders convert a good intention into a scheduled action:",
          },
          {
            type: "list",
            items: [
              "Set the reminder immediately after logging the interaction — log the call, note the next action and its due date, and set the reminder in the same workflow. If you close the log entry without setting a reminder, the follow-up now depends entirely on you remembering to come back to it.",
              "Use the CRM's built-in task and reminder system — most CRM platforms allow you to create a task linked directly to the client record with a due date and a description. This is more reliable than a calendar entry because the task is attached to the context that generated it.",
              "Set the reminder 24–48 hours before the actual deadline — if the proposal is due Friday, set the reminder for Wednesday. This gives you working time between the reminder and the deadline instead of seeing the alert the morning it is due.",
              "Review all open reminders at the start of each week — do not wait for alerts to push tasks to you. Open the CRM every Monday and scan all open tasks. Identify anything due this week and block time for each item on your calendar.",
              "Close completed reminders — a completed task left open in the CRM creates noise and makes it harder to see what is genuinely still open. Mark tasks complete as soon as the action is taken.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Communication Logs & Follow-Up",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-6/professional-follow-up/communication-log-followup-infographic.png",
            alt: "Communication Logs & Professional Follow-Up: The Six Fields of a Complete Log Entry, follow-up email structure, timing best practices, and the reminder system that prevents missed commitments",
            caption: "Communication Logs & Professional Follow-Up: Turning Every Interaction Into a Documented Commitment",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Communication logs are internal business documents — never share them with clients unless your manager explicitly authorizes it. Do not log personal opinions about a client's personality, mood, or character in the CRM. Logs are factual records of business interactions, not personal journals. Write every log entry as if it could be subpoenaed or shared in a dispute — because in some industries, it can be.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional follow-up email after a 30-minute client discovery call. Include a thank-you, a 3-point recap of what was discussed, 3 numbered next steps, and an invitation for corrections.\" Edit the result to match the context of a TOR Tech client interaction — adjust names, topics, and specifics so it sounds like it came from a real person, not a template.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "When is the best time to log a client interaction after it takes place?",
            options: [
              "At the end of the workday",
              "During your weekly review meeting",
              "Only when your manager requests it",
              "Immediately while the details are still fresh",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Write a communication log entry and a follow-up email for a fictional client scenario. Your submission must meet every specification below — vague summaries and generic emails will not pass:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a complete communication log entry for a 20-minute client call at TOR Tech. Include all 6 required fields: date, participants, interaction type, summary (at least 3 sentences), agreed next steps (at least 2 items with owners and due dates), and follow-up due date",
          "Write a professional follow-up email based on that log entry. The email must include: a specific opening that names the interaction, a 3-point recap of what was discussed, a numbered next-steps list with owners and deadlines, an invitation for corrections, and a professional closing",
          "Write a brief explanation (2–3 sentences) of why you chose the specific timing for your follow-up email — explain how the timing reflects professional standards rather than personal convenience",
          "Describe the reminder you would set in the CRM after logging this interaction — specify what the reminder would say, when it would fire, and why you chose that timing",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your log entry, your follow-up email, and your two written explanations to your instructor or course folder. All submissions must be in complete, professional sentences.",
      },
    ],
  },

  {
    slug: "log-client-interaction",
    title: "Hands-On: Log a Client Interaction",
    description:
      "Apply all Module 6 skills by logging four different client interaction types and completing follow-up tasks.",
    duration: "30 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech just finished a busy week with 4 client touchpoints: a phone call with a new prospect, an email thread about a contract revision, an in-person meeting with a long-term client, and a signed service agreement delivered by a third client. Your job is to log all four interactions accurately and completely before the weekend — and to ensure every entry sets up the next action clearly.",
          },
        ],
      },
      {
        heading: "Why Each Interaction Type Requires a Different Log",
        blocks: [
          {
            type: "paragraph",
            text: "Not all client interactions are the same — and your log entry should reflect the nature of the interaction, not just the fact that it happened. A phone call requires different documentation than a signed agreement. Understanding the distinguishing elements of each interaction type makes your log entries more useful to everyone who reads them:",
          },
          {
            type: "list",
            items: [
              "Phone calls — shorter, often informal, and frequently produce verbal commitments that need to be confirmed in writing. The log must capture who called whom, what was discussed, and what follow-up was promised — because nothing was written down during the call itself.",
              "Email threads — the interaction is already written down, so the log summary should not simply duplicate the email. Instead, summarize the key outcome: what decision was reached, what was agreed, and what action follows. Note the thread subject line so it can be located if needed.",
              "In-person meetings — typically the richest in content and commitments. Meetings produce the most complex log entries: multiple participants, multiple agenda items, and multiple next steps with different owners and timelines. Notes taken during the meeting are the raw material; the log entry is the organized output.",
              "Signed documents and agreements — the key log field here is confirmation of receipt: who delivered the document, when it was received, where the signed copy was filed, and what action it triggers (e.g., 'Countersigned copy to be returned by [date]'). Document logs protect both parties in future disputes.",
              "Every log ends with a next action — regardless of the interaction type, the final element of every log entry is always the same: what happens next, who is responsible, and when. A log that ends without a next action is an interaction that may not produce a result.",
            ],
          },
        ],
      },
      {
        heading: "Logging a Phone Call",
        blocks: [
          {
            type: "paragraph",
            text: "Phone calls are the most easily lost type of client interaction because nothing is automatically recorded. The only record of what was said and agreed is the one you create immediately after hanging up. A call log written 20 minutes after the call is noticeably thinner than one written within five minutes — log immediately:",
          },
          {
            type: "list",
            items: [
              "Date, time, and duration — log the call date, approximate start time, and approximate call duration. This information establishes context when reviewing the log weeks later.",
              "Participants — your name, any other TOR Tech participants, and the client name and title. If a new person was on the call who is not yet in the CRM, create their contact record before closing the log.",
              "Reason for the call — a single sentence explaining why the call occurred: 'Prospect inquiry call regarding IT support services' or 'Client check-in call — quarterly relationship review.'",
              "Summary — 3–5 sentences covering the main topics discussed and the key points made by each side. Avoid editorializing. Record what was said, not your evaluation of it.",
              "Next steps — list every commitment made by either party: 'TOR Tech to send service proposal by [date].' 'Client to confirm budget approval with CFO and respond by [date].' One named owner, one clear due date per item.",
            ],
          },
        ],
      },
      {
        heading: "Logging an Email Thread",
        blocks: [
          {
            type: "paragraph",
            text: "Email threads have a built-in record — the emails themselves. The CRM log entry for an email thread is not a duplication of the email; it is a distillation of the thread's outcome and a pointer to the original source. This distinction matters because a useful log tells the reader what was decided, not just what was written:",
          },
          {
            type: "list",
            items: [
              "Reference the thread — log the subject line of the email thread and the approximate date range. This enables anyone reviewing the record to find the original thread quickly if they need the full context.",
              "Summarize the outcome, not the content — write what was decided or agreed as a result of the thread: 'Contract revision approved by client; updated version to be sent for signature by [date].' The log does not need to repeat what the emails say.",
              "Note who initiated the thread and who responded — whether the communication originated with the client or with TOR Tech is relevant context that helps understand the relationship dynamic.",
              "Flag any open items — if the thread produced a question or request that is still awaiting response, note it as an open item with a due date for follow-up.",
              "Attach or link the thread — in CRM platforms that support it, attach the relevant email or a link to the thread directly to the log entry so the full source document is one click away.",
            ],
          },
        ],
      },
      {
        heading: "Logging an In-Person Meeting",
        blocks: [
          {
            type: "paragraph",
            text: "In-person meetings generate the most complex log entries because they typically involve multiple participants, multiple agenda items, and multiple commitments. The discipline of logging a meeting well separates assistants who treat meetings as events from those who treat them as decisions:",
          },
          {
            type: "list",
            items: [
              "Capture all participants — list every person present on both sides, with their name and title. A meeting attended by three TOR Tech staff and two client representatives has five participants who all need to be named.",
              "Log each agenda item and its outcome — even if the meeting covered three topics, the log entry should have a one-to-two sentence summary for each. Do not collapse a three-topic meeting into a single vague paragraph.",
              "Separate discussion from decisions — note what was discussed versus what was decided. 'The team discussed three pricing models (discussed). The client agreed to proceed with the mid-tier option (decided).'",
              "Capture all commitments with owners and dates — meetings typically produce multiple action items owned by different people. List every one: who is doing what and by when. A commitment made in a meeting that is not written down is a commitment that is likely to be forgotten.",
              "Send a meeting recap email within 24 hours — after logging the meeting, send a follow-up email to all participants summarizing the decisions and action items. The follow-up email and the CRM log should tell the same story.",
            ],
          },
        ],
      },
      {
        heading: "Logging a Signed Document or Agreement",
        blocks: [
          {
            type: "paragraph",
            text: "A signed document is a milestone — it represents a formal commitment. The log entry for a signed agreement is less about what was discussed and more about what was delivered, where it is stored, and what actions it triggers:",
          },
          {
            type: "list",
            items: [
              "Document name and version — log the exact document name and version number: 'TOR Tech Services Agreement v2.1 — Signed.' Ambiguity about which version was signed is a compliance risk.",
              "Delivery method and date — note how the signed document was delivered: email, DocuSign, physical delivery. Include the exact date received.",
              "Storage location — note exactly where the signed document was filed: the folder path in Google Drive, the contract management system record, or the physical file location. Anyone who needs to retrieve the signed agreement should be able to find it in under 30 seconds.",
              "Actions triggered by the document — a signed contract typically triggers follow-on actions: sending a countersigned copy, onboarding the client, issuing an invoice. Log those next steps with owners and due dates just as you would for any other interaction type.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Interaction Logging Checklist",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-6/log-client-interaction/interaction-logging-checklist-infographic.png",
            alt: "Client Interaction Logging Checklist: Required fields for phone calls, email threads, in-person meetings, and signed documents — plus the universal next-action rule that applies to every interaction type",
            caption: "Client Interaction Logging Checklist: What to Capture for Each Interaction Type",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a client interaction log template with columns for date, contact name, interaction type, summary, next action, and due date. Format it as a table suitable for a Google Sheet.\" Use the template it generates as your starting structure for this challenge, then customize the columns and formatting to match what you have learned in this module.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which field in a communication log ensures follow-through after every client interaction?",
            options: [
              "The interaction type",
              "The date of the interaction",
              "The contact name",
              "The next action required",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a complete client interaction log for four fictional TOR Tech interactions from one week — one of each interaction type. This is your Module 6 capstone. Every entry must be fully completed and every specification below must be met before you submit:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Log 4 interactions — one phone call, one email thread, one in-person meeting, and one signed document. Use different fictional clients for each entry. Invent realistic names, dates, and scenarios — no placeholders",
          "Every log entry must include all 6 fields: date, participants, interaction type, summary (minimum 3 sentences), agreed next steps (with owner and due date for each), and follow-up due date",
          "The in-person meeting log must include at least 3 agenda items with individual outcomes and at least 2 separate next steps with different named owners",
          "Write one complete follow-up email based on any one of your four log entries — the email must include a recap, a numbered next-steps list, and an invitation for corrections",
          "Write a 2–3 sentence reflection on what was hardest to log accurately across the four different interaction types and how you would improve your in-the-moment note-taking to make future logging easier",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed interaction log (spreadsheet screenshot, table, or document), your follow-up email draft, and your written reflection to your instructor or course folder. No placeholder text, no empty fields, and no vague summaries.",
      },
    ],
  },
];
