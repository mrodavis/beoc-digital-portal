import { Lesson } from "@/types/lesson";

export const module7Lessons: Lesson[] = [
  {
    slug: "ai-tools-overview",
    title: "AI Tools for Office Assistants",
    description:
      "Get a practical overview of the leading AI tools and learn where each one fits into your daily office workflow.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech pulls you into a quick meeting and says: \"Everyone on the team is using AI now to work faster. I want you to learn the main tools and show me how you would use them this week.\" This is your opportunity to stand out.",
          },
        ],
      },
      {
        heading: "AI Tools That Office Assistants Actually Use",
        blocks: [
          {
            type: "paragraph",
            text: "AI tools are not all the same. Each one has a strength. Knowing which tool to reach for — and when — is what makes you efficient rather than just busy.",
          },
          {
            type: "list",
            items: [
              "ChatGPT (OpenAI) — best for drafting emails, summarizing content, brainstorming, answering questions, and generating first drafts of almost any written document",
              "Google Gemini — integrates directly with Google Workspace (Gmail, Docs, Sheets) to help you write, organize, and research without leaving the apps you already use",
              "Microsoft Copilot — built into Microsoft 365 (Outlook, Word, Excel, Teams) to assist with drafting, summarizing meetings, and building spreadsheet formulas",
              "Grammarly — focuses on grammar, tone, clarity, and professionalism in anything you write; great as a final review before sending",
              "AI assistants vs AI automation tools — assistants (ChatGPT, Gemini) respond to your prompts; automation tools (Zapier, Make) run actions in the background without you having to ask each time",
              "How AI fits into daily office work: use it to draft first, then review and personalize — never send AI output without reading it yourself",
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
            text: "AI tools can make mistakes. Always review AI output before sending it to clients or supervisors. Use AI as a first draft tool, not a final answer. Your name goes on everything you submit — make sure it reflects your standards, not just the AI's.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the top 5 ways an office assistant can use AI tools to save time and work more efficiently?\" Review the list and mark the 2 that would be most useful in your current or future role.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Pick 2 AI tools: ChatGPT plus one other tool from this lesson. Use each one to complete a real office task — examples include drafting a professional email, summarizing a paragraph, rewriting a sentence for clarity, or generating a meeting agenda. After completing both tasks, write a 3-sentence reflection on what each tool did well.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the output from both AI tools (copy-pasted or screenshot) along with your 3-sentence reflection on each tool to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "automating-tasks",
    title: "Automating Repetitive Tasks",
    description:
      "Learn how to identify tasks worth automating and use beginner-friendly tools to reclaim your time.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Every Monday morning at TOR Tech, you sit down and manually send the same status update email to 6 clients — copying names, updating dates, and hitting send one by one. It takes 45 minutes. Your manager notices and says: \"There has to be a better way.\" There is.",
          },
        ],
      },
      {
        heading: "What to Automate — and What to Leave to a Human",
        blocks: [
          {
            type: "paragraph",
            text: "Task automation means setting up a system to handle a repetitive action so you do not have to do it manually each time. The key skill is knowing which tasks are worth automating.",
          },
          {
            type: "list",
            items: [
              "Zapier — connects apps and automates workflows without code (e.g., when a form is submitted, automatically add a row in a spreadsheet and send a notification email)",
              "Make (formerly Integromat) — similar to Zapier but with more advanced logic for complex multi-step automations",
              "Google Apps Script — free scripting tool built into Google Workspace; great for automating repetitive Sheets or Gmail tasks with basic code",
              "Email filters and rules — automatically sort, label, forward, or archive incoming emails based on sender or keywords",
              "Calendar automation — set recurring events, automatic reminders, and meeting buffers so routine scheduling runs itself",
              "Tasks worth automating: weekly status emails, meeting reminders, form-to-spreadsheet data entry, and file organization",
              "Tasks that still need a human: anything requiring judgment, sensitive client communication, or decisions that depend on context",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"I manually send a weekly status update email to 6 clients every Monday. How could I automate this using free tools?\" Review the suggestions and note which tool seems most beginner-friendly for your situation.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Identify 3 repetitive tasks that exist in your current job, internship, or a realistic future office role. For each task, describe: what the task is, how often it happens, how you could automate or semi-automate it, and which tool you would use to do it.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your list of 3 tasks with your automation plan for each to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "ai-writing-research",
    title: "AI Writing & Research Assistance",
    description:
      "Learn how to use AI to research faster, write better, and produce professional documents in a fraction of the time.",
    duration: "15 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech drops a task on your desk at 1pm: \"I need a one-page summary of our 3 main competitors by 3pm — key services, target market, and pricing model if you can find it.\" Two hours is tight. With AI research assistance, you can do it in 30 minutes and spend the rest of the time editing it into something polished.",
          },
        ],
      },
      {
        heading: "Using AI to Research, Write, and Refine",
        blocks: [
          {
            type: "paragraph",
            text: "AI is not a replacement for research — it is a research accelerator. The key is knowing how to prompt it effectively, how to verify what it tells you, and how to turn a rough AI draft into a polished professional document.",
          },
          {
            type: "list",
            items: [
              "Prompting effectively: be specific — include the topic, the format you want, the length, and the audience (e.g., 'Write a 3-bullet summary of [Company X]'s services for a professional business audience')",
              "Using AI for research summaries: ask it to summarize what is publicly known about a company, industry, or topic — then verify the key facts yourself",
              "Using AI to improve your own writing: paste a draft and ask ChatGPT to improve the tone, fix grammar, or make it more concise",
              "Fact-checking AI output: never include AI-generated statistics, dates, or company data in a work document without verifying from a reliable source",
              "Citing sources responsibly: if you used AI to research, note that in your process — and cite the original sources, not the AI itself",
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
            text: "AI can confidently state inaccurate information — including fake statistics, outdated company data, and entirely fabricated sources. Always verify key facts from a reliable website, official report, or database before including them in any work document.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Summarize the key services and target market of [any real company you know] in 3 bullet points, written for a professional business audience.\" Then look up the company yourself and check whether the AI got it right.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Use AI to draft a one-paragraph competitive overview of any two companies that operate in the same industry (e.g., two tech companies, two airlines, two retail brands). After you have the AI draft, edit it yourself — correct any inaccuracies you can verify, improve the tone, and make it sound polished. Submit both versions.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the original AI-generated draft and your edited final version to your instructor or course folder. Include a 1–2 sentence note on what you changed and why.",
      },
    ],
  },

  {
    slug: "build-ai-workflow",
    title: "Hands-On: Build Your AI Workflow",
    description:
      "Complete 3 real office tasks using AI tools, document your process, and reflect on how AI fits into your professional practice.",
    duration: "30 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is your final AI challenge at TOR Tech. Your manager says: \"I want to see how you work with AI — not just that you can use it, but that you can use it well.\" You need to complete 3 real office tasks using AI tools, faster and better than you could manually, and document exactly how you did it.",
          },
        ],
      },
      {
        heading: "Your AI Workflow in Action",
        blocks: [
          {
            type: "paragraph",
            text: "This lesson brings together everything from Module 7. You will select 3 office tasks, choose the right AI tool for each one, complete the task, review and edit the output, and reflect on what the experience taught you.",
          },
          {
            type: "list",
            items: [
              "Choose 3 tasks — pick from: drafting an email, summarizing a document, building a meeting agenda, writing a report section, creating a task list, or researching a topic",
              "Select the right tool for each task — not every task needs ChatGPT; consider whether Grammarly, Gemini, or Copilot might be a better fit",
              "Write the prompt you used for each task — a specific, clear prompt produces better output than a vague one",
              "Review and edit the AI output — every piece of output should be read critically and improved before it is considered final",
              "Reflect on the process — note what the AI did well, what it got wrong, and what you had to fix yourself",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Act as my office assistant. I need to: 1) draft a follow-up email to a client, 2) summarize a 500-word report in 3 bullets, 3) create a weekly task list for Monday. Help me with all three.\" Use this as a starting point, then customize each output for your own context.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete 3 office tasks using AI tools of your choice. For each task, document: (1) the task you chose, (2) the AI tool you used, (3) the exact prompt you wrote, (4) the AI output (copy-pasted or screenshot), and (5) 1–2 sentences on how you edited or improved the output before it was final.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit all 3 completed task write-ups — prompt, AI output, and your reflection — to your instructor or course folder.",
      },
    ],
  },
];
