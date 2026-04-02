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
        heading: "What is a CRM and Why Does It Matter?",
        blocks: [
          {
            type: "paragraph",
            text: "CRM stands for Customer Relationship Management. It is a system that helps businesses track and manage every interaction with their clients. Think of it as a digital filing cabinet for all things client-related — organized, searchable, and accessible by your whole team.",
          },
          {
            type: "list",
            items: [
              "CRM stands for Customer Relationship Management",
              "Popular CRM tools include Salesforce, HubSpot, Zoho CRM, and even structured spreadsheets for small teams",
              "What gets logged: client contact details, email threads, phone calls, meeting notes, deals, and contract dates",
              "Assigned reps — each client record is tied to the team member responsible for that relationship",
              "Benefits for office assistants: you always know a client's history before picking up the phone or sending an email",
              "A well-maintained CRM means nothing falls through the cracks — every promise, deadline, and follow-up is documented",
            ],
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
    ],

    challenge: [
      {
        type: "paragraph",
        text: "In your own words, write a 1-paragraph explanation of what a CRM is and 3 reasons why an office assistant would use one. Imagine you are explaining it to a friend who has never worked in a professional office.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your paragraph and your 3 reasons to your instructor or course folder.",
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
            text: "A new client named Marcus Webb just signed a contract with TOR Tech. Your manager sends you a quick message: \"Can you get Marcus set up in the system before his onboarding call tomorrow morning? We need everything in there.\" It is your job to build his client record from scratch.",
          },
        ],
      },
      {
        heading: "What Goes Into a Client Record",
        blocks: [
          {
            type: "paragraph",
            text: "A complete and accurate client record is the foundation of a good client relationship. Here is what every record should contain and how to maintain it properly:",
          },
          {
            type: "list",
            items: [
              "Full name and preferred contact name (e.g., 'Marcus Webb' — goes by 'Marc')",
              "Company name, industry, and website",
              "Contact information: email address, phone number, and mailing address",
              "Contract start date, end date, and renewal date",
              "Assigned account representative",
              "Notes section: key preferences, concerns, past issues, or context about the relationship",
              "Accuracy matters — always double-check spelling, phone numbers, and email addresses before saving",
              "Keep records updated — if a client changes their email or company, update the record immediately",
              "Data privacy basics: only share client records with team members who have a legitimate reason to access them",
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
            text: "Never share client records or personal data with unauthorized individuals. Protecting client privacy is a legal and professional responsibility. When in doubt about who should have access to a record, ask your manager before sharing.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What fields should every client record include in a CRM for a small professional services company?\" Compare the response to the list above and note any fields that might be relevant to TOR Tech.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create a client record for a fictional client — you invent all the details. Include: full name, company name, email address, phone number, contract start date, assigned account rep, and at least 2 notes about their needs or preferences. You can submit this as a table, a typed list, or a simple document.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed fictional client record in any format (table, typed list, or document) to your instructor or course folder.",
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
            text: "After a 45-minute client call at TOR Tech, your manager turns to you and says: \"Log that call and send them a follow-up email with our next steps before end of day.\" This is a routine but critical task — how you follow up after a conversation shapes the entire client experience.",
          },
        ],
      },
      {
        heading: "Communication Logs & Professional Follow-Up",
        blocks: [
          {
            type: "paragraph",
            text: "A communication log documents every interaction with a client so that anyone on your team can pick up where you left off. A follow-up email reinforces what was discussed and shows the client you are organized and reliable.",
          },
          {
            type: "list",
            items: [
              "Communication log fields: date, participants (who spoke), interaction type (call, email, meeting), summary of what was discussed, agreed next steps, and follow-up due date",
              "Log interactions immediately while the details are fresh — waiting even a few hours leads to missing information",
              "Professional follow-up email structure: thank the client for their time, recap the key points discussed, list the next steps clearly, and propose a date for the next interaction",
              "Set a follow-up reminder in your calendar or CRM so nothing is forgotten",
              "Why this matters: consistent follow-through is one of the most important habits that separates good office assistants from great ones — it builds client trust over time",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional follow-up email after a 30-minute client discovery call. Include a thank-you, 3 next steps, and a proposed meeting date.\" Edit the result so it matches the tone and context of TOR Tech.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Write a communication log entry and a follow-up email for a fictional client call. The context: you just had a 20-minute call with a client whose contract expires next month. The call covered the renewal timeline, pricing updates, and scheduling a formal review meeting. Both the log entry and the email should reflect all key details.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit both your communication log entry and your follow-up email to your instructor or course folder.",
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
            text: "TOR Tech just finished a busy week with 4 client touchpoints: a phone call with a new prospect, an email thread about a contract revision, an in-person meeting with a long-term client, and a signed service agreement delivered by a third client. Your job is to log all four interactions properly before the weekend.",
          },
        ],
      },
      {
        heading: "Putting It All Together",
        blocks: [
          {
            type: "paragraph",
            text: "This hands-on lesson applies everything from Module 6. You will practice logging four different interaction types, updating client records with new information, drafting one follow-up email, and setting two reminders for upcoming next steps.",
          },
          {
            type: "list",
            items: [
              "Log 4 different interaction types: phone call, email thread, in-person meeting, and document/signed agreement",
              "Each log entry must include: date, contact name, interaction type, a summary, and the next action required",
              "Update the client record for at least one of the four clients based on new information from the interaction",
              "Draft one follow-up email for the interaction that requires immediate written communication",
              "Set 2 calendar or CRM reminders for next steps that are time-sensitive",
              "Review all four entries for accuracy before submitting — a log with missing fields is a liability",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a simple client interaction log template with columns for date, contact name, interaction type, summary, and next action.\" Use the template it generates to structure your submission for this challenge.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a client interaction log for at least 4 fictional TOR Tech interactions from this week. Use different interaction types for each entry (call, email, meeting, document). Every entry must include all required fields. Also include one follow-up email draft and two noted reminders for upcoming actions.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed interaction log (spreadsheet screenshot or typed table), your follow-up email draft, and your two reminders to your instructor or course folder.",
      },
    ],
  },
];
