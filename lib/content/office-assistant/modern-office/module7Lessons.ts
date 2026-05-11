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
            text: "Your manager at TOR Tech pulls you into a quick meeting and says: \"Everyone on the team is using AI now to work faster. I want you to learn the main tools and show me how you would use them this week.\" This is your opportunity to stand out — not by knowing every feature, but by knowing which tool to reach for when.",
          },
        ],
      },
      {
        heading: "Why AI Literacy Is Now a Core Office Skill",
        blocks: [
          {
            type: "paragraph",
            text: "AI tools have moved from novelty to expectation in professional offices in a remarkably short time. Employers are no longer asking whether candidates are comfortable with computers — they are beginning to ask whether candidates can work effectively alongside AI. Understanding why this shift happened helps you position yourself correctly in the job market:",
          },
          {
            type: "list",
            items: [
              "AI tools compress time on routine tasks — drafting an email, summarizing a document, researching a topic, and building an agenda are all tasks that AI tools can help complete in a fraction of the manual time. Office assistants who use these tools efficiently produce more output per hour.",
              "AI adoption is accelerating — a skill that was optional in 2022 is increasingly expected in 2025. Job postings for administrative roles now list AI tool familiarity as a preferred qualification. Getting ahead of this curve is a career advantage.",
              "AI does not replace judgment — AI tools are powerful at execution but poor at judgment. They generate output; you decide whether it is accurate, appropriate, and ready to send. The human in the loop is still essential, and that human is you.",
              "Knowing the limits matters as much as knowing the features — an office assistant who sends AI-generated content without reviewing it will eventually make a professional mistake that damages their reputation. Understanding what AI tools get wrong is as important as understanding what they do well.",
              "AI tools are workplace infrastructure, not personal shortcuts — when your organization adopts an AI tool, your use of it becomes part of the company's workflow. Use it professionally, document your use when required, and always maintain the quality standard your organization expects.",
            ],
          },
        ],
      },
      {
        heading: "ChatGPT: What It Does Best",
        blocks: [
          {
            type: "paragraph",
            text: "ChatGPT is the most widely known general-purpose AI assistant and the one you are most likely to be introduced to in an office setting. Understanding its actual strengths — rather than its theoretical capabilities — helps you use it strategically rather than experimentally:",
          },
          {
            type: "list",
            items: [
              "First-draft generation — ChatGPT excels at producing a first draft of nearly any written document: emails, memos, summaries, meeting agendas, procedure documents, and reports. The first draft is always a starting point, not a final product.",
              "Rewriting and tone adjustment — paste any piece of writing into ChatGPT and ask it to make it more concise, more formal, more empathetic, or more direct. This is one of the fastest ways to improve your own writing without starting over.",
              "Summarization — paste a long email thread, a dense document, or a set of notes and ask ChatGPT to summarize the key points in 3–5 bullets. This works well for catching up on long communications quickly.",
              "Brainstorming — ask ChatGPT for a list of options, approaches, or ideas when you are stuck. 'Give me 5 subject line options for a follow-up email to a client who has not responded' produces useful starting material in seconds.",
              "Explaining concepts — ChatGPT is an effective learning tool. When you encounter an unfamiliar term, process, or tool in the workplace, asking ChatGPT to explain it in plain language often produces a clearer explanation than a web search.",
            ],
          },
        ],
      },
      {
        heading: "Integrated AI Tools: Copilot and Gemini in Your Daily Apps",
        blocks: [
          {
            type: "paragraph",
            text: "ChatGPT is a standalone tool — you go to it. Microsoft Copilot and Google Gemini are integrated tools — they come to where you already are. This distinction changes how you use them. When AI is embedded in the applications you already use daily, the barrier to using it is much lower:",
          },
          {
            type: "list",
            items: [
              "Microsoft Copilot — built into Microsoft 365 (Outlook, Word, Excel, Teams, and PowerPoint). In Outlook, Copilot can draft email replies, summarize threads, and suggest follow-up actions. In Word, it generates first drafts from prompts. In Excel, it builds formulas and explains data. In Teams, it summarizes meeting transcripts.",
              "Google Gemini — integrated into Google Workspace (Gmail, Docs, Sheets, and Drive). In Gmail, Gemini drafts replies and summarizes long threads. In Docs, it writes, edits, and formats content based on prompts. In Sheets, it builds formulas and interprets data.",
              "The integration advantage — because Copilot and Gemini live inside your apps, they have context: they can see your email thread, your document draft, or your spreadsheet. This context produces more relevant output than a standalone AI that knows nothing about your specific file or task.",
              "The privacy consideration — integrated AI tools may process your files and emails through the provider's servers. Before using Copilot or Gemini with sensitive client documents, confirm that your organization's IT policy permits it. Some organizations restrict AI access to sensitive data.",
              "When to use integrated vs. standalone — use Copilot or Gemini when you are already in an app and need quick AI assistance within that workflow. Use ChatGPT when you need to work across multiple documents or contexts, or when you want AI assistance that is not tied to a specific file.",
            ],
          },
        ],
      },
      {
        heading: "Specialized AI Tools Worth Knowing",
        blocks: [
          {
            type: "paragraph",
            text: "Beyond general-purpose assistants, a set of specialized AI tools addresses specific office tasks better than any general tool can. Knowing these tools and their strengths lets you reach for the right instrument for the right job:",
          },
          {
            type: "list",
            items: [
              "Grammarly — an AI-powered writing assistant that checks grammar, tone, clarity, and professionalism in real time. Best used as a final review before sending any written communication. Grammarly's tone detector is particularly useful for flagging language that may come across as too casual, too aggressive, or unclear.",
              "Otter.ai and Fireflies.ai — AI transcription and meeting summary tools that join video calls and produce searchable transcripts and summaries within minutes of the meeting ending. Transformative for anyone responsible for taking meeting notes.",
              "Notion AI — AI embedded in Notion workspaces for generating documents, summarizing pages, and drafting structured content within a team's shared workspace. Best for organizations that already use Notion as their primary documentation platform.",
              "Adobe Acrobat AI — document summarization and question-answering inside PDFs. Best for quickly extracting key information from long contracts, reports, or policy documents without reading every page.",
              "The 'right tool' principle — specialized tools outperform general tools at their specific task. Grammarly is better at grammar than ChatGPT. Otter.ai is better at transcription than any general AI. Knowing when to reach for a specialized tool versus a general one is a mark of genuine AI fluency.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: AI Tools Landscape for Office Assistants",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-7/ai-tools-overview/ai-tools-landscape-infographic.png",
            alt: "AI Tools Landscape for Office Assistants: ChatGPT, Microsoft Copilot, Google Gemini, Grammarly, and transcription tools — what each does best, when to use each, and the right-tool principle",
            caption: "AI Tools Landscape: The Right Tool for the Right Office Task",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "AI tools can make mistakes — including confident, well-written mistakes. Always review AI output before sending it to clients or supervisors. Never include AI-generated statistics, dates, or claims in a work document without verifying them from a reliable source. Use AI as a first-draft tool, not a final-answer tool. Your name goes on everything you submit — make sure it reflects your judgment and standards, not just the AI's output.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the top 5 ways an office assistant can use AI tools to save time and work more efficiently? For each one, give a specific example of what to prompt and what output to expect.\" Review the list and mark the 2 that would be most useful in your current or anticipated role.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What is the recommended approach when using AI tools for professional workplace writing?",
            options: [
              "Send AI output directly to save time",
              "Copy AI output into documents without reading it",
              "Use AI to create a first draft, then review and personalize before sending",
              "Only use AI for personal tasks, never for client-facing work",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Demonstrate your ability to select and apply AI tools appropriately by completing the tasks below. This is not just about using AI — it is about using the right AI tool for each task and evaluating what it produces:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Select 2 AI tools from this lesson — ChatGPT must be one of them, and the second must be a different tool (Grammarly, Gemini, Copilot, or a specialized tool). Use each one to complete a distinct, realistic office task",
          "For each tool, document: (a) the task you gave it, (b) what you typed as your prompt or input, (c) the output the tool produced (paste it or take a screenshot), and (d) what you changed or improved before the output would be ready to use professionally",
          "Write a 3-sentence comparison of the two tools — what did each one do well, where did each one fall short, and which would you reach for first in your daily work and why",
          "Identify one scenario in the office where you would NOT use AI — explain what makes that scenario unsuitable for AI assistance and what approach you would take instead",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the output from both AI tools (pasted text or screenshot), your edits, your 3-sentence tool comparison, and your no-AI scenario explanation to your instructor or course folder.",
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
            text: "Every Monday morning at TOR Tech, you sit down and manually send the same status update email to 6 clients — copying names, updating dates, and hitting send one by one. It takes 45 minutes. Your manager notices and says: \"There has to be a better way.\" There is — and learning to find it is one of the most valuable skills you can develop as an office assistant.",
          },
        ],
      },
      {
        heading: "Why Automation Is a Productivity Multiplier",
        blocks: [
          {
            type: "paragraph",
            text: "Every repetitive task you automate is a task that runs itself — without consuming your time, your attention, or your energy. The cumulative effect of automating several small recurring tasks is significant: hours reclaimed per week, mistakes eliminated from manual processes, and cognitive load reduced so you can focus on work that actually requires human judgment:",
          },
          {
            type: "list",
            items: [
              "Automation eliminates the cost of repetition — a task you do manually 52 times a year is 52 opportunities for human error. A task you automate once has one setup opportunity for error — and then runs correctly every time.",
              "Automation protects against 'forgetting' — recurring tasks that depend on human memory get missed when you are busy, sick, or distracted. Automated tasks run on schedule regardless of what else is happening.",
              "Automation scales what you can do — an office assistant who has automated their routine tasks can take on more complex, higher-value work without increasing their working hours. Automation is how individual contributors operate at a higher level.",
              "Automation is a visible competency — managers who see an office assistant identify and implement a workflow automation notice it. It signals initiative, systems thinking, and a proactive approach to efficiency.",
              "Start small and build — you do not need to automate everything at once. Identify one task that is truly repetitive, set up a simple automation for it, verify it works, and build from there. The goal is a progressive reduction of manual routine work, not an instant overhaul.",
            ],
          },
        ],
      },
      {
        heading: "Identifying Tasks Worth Automating",
        blocks: [
          {
            type: "paragraph",
            text: "Not every repetitive task is worth automating, and not every automation is straightforward to build. The first step is identifying tasks that are genuinely good automation candidates — high repetition, low variation, and low judgment requirement:",
          },
          {
            type: "list",
            items: [
              "High frequency — the best automation candidates are tasks you do at least weekly. Monthly or one-off tasks rarely justify the setup investment. If you do something 50 times a year, a 30-minute automation setup pays for itself in saved time within a month.",
              "Low variation — tasks that follow exactly the same steps every time are ideal for automation. If a task requires you to make judgment calls — deciding whether to send, what to say, or who to include — it is less suitable for full automation.",
              "Rule-based input and output — can the task be described as 'when X happens, do Y'? If so, it is almost certainly automatable. 'When a form is submitted, add a row to the spreadsheet and send a confirmation email' is a classic automation trigger-action pattern.",
              "Manual data transfer — tasks that involve copying data from one system to another (e.g., copying form submissions into a spreadsheet, updating a CRM from an email) are high-value automation candidates because they are tedious and error-prone when done manually.",
              "Tasks that have already failed due to being forgotten — if a task has been missed at least twice because it depended on someone remembering to do it, it is a candidate for automation or at minimum a scheduled reminder.",
            ],
          },
        ],
      },
      {
        heading: "No-Code Automation with Zapier",
        blocks: [
          {
            type: "paragraph",
            text: "Zapier is the most widely used no-code automation platform for office environments. It connects hundreds of apps and automates workflows between them without requiring any programming knowledge. Understanding how Zapier works — even at a basic level — gives you a powerful tool for eliminating manual data transfer tasks:",
          },
          {
            type: "list",
            items: [
              "Zapier works on a trigger-action model — every automation (called a 'Zap') starts with a trigger event in one app (e.g., 'a new form response is submitted in Google Forms') and produces one or more actions in another app (e.g., 'add a row in Google Sheets and send a Gmail notification').",
              "Common office automation examples — 'When a new email with the subject Invoice arrives in Gmail, save the attachment to a Google Drive folder and add a row to the invoice tracking sheet.' 'When a Typeform survey is completed, create a new HubSpot contact and send a welcome email.'",
              "No coding required — Zapier's interface guides you through selecting a trigger app, a trigger event, an action app, and the action to perform. You map fields (what data goes where) using dropdown menus, not code.",
              "Free tier limitations — Zapier's free tier supports a limited number of Zaps and task runs per month. For most basic office automation needs, the free tier is sufficient. Evaluate whether the task volume requires a paid plan before recommending it to your organization.",
              "Testing before activating — always test a new Zap with real data before activating it and walking away. Trigger the event manually, verify the output in the action app, and confirm the data transferred correctly. An untested automation is one that will fail silently the first time it matters.",
            ],
          },
        ],
      },
      {
        heading: "Built-In Automation: Email Rules, Filters, and Calendar Scheduling",
        blocks: [
          {
            type: "paragraph",
            text: "Many of the most useful office automations do not require a third-party tool — they are built directly into the apps you already use. Email clients and calendar tools have built-in automation features that most people never configure, leaving time and organization on the table:",
          },
          {
            type: "list",
            items: [
              "Email filters and rules — Gmail and Outlook both support rules that automatically sort, label, forward, archive, or flag incoming emails based on sender, subject keywords, or other criteria. Setting up a filter that labels every invoice email and moves it to a 'Billing' folder takes two minutes and saves hours of manual sorting per month.",
              "Canned responses and email templates — Gmail's 'Canned Responses' feature and Outlook's Quick Parts allow you to save frequently written emails as templates. Inserting a template takes seconds; writing the same email from scratch for the 20th time takes three minutes and introduces variation.",
              "Recurring calendar events — meetings, reviews, and check-ins that happen on a regular schedule should be created as recurring events, not manually created each time. A monthly client review scheduled as a recurring event cannot be missed because you forgot to put it on the calendar.",
              "Auto-scheduling tools — tools like Calendly allow you to share a booking link with clients instead of negotiating availability over email. When a client books time, the meeting is automatically added to your calendar. This eliminates the back-and-forth email exchange that can take 8 emails to schedule a single 30-minute call.",
              "Out-of-office auto-replies — an automatically activated out-of-office reply set before vacation or leave ensures clients receive a professional response acknowledging their message. This requires setup before you are away, not after — build the habit of configuring auto-replies 24 hours before any planned absence.",
            ],
          },
        ],
      },
      {
        heading: "Tasks That Must Stay Human",
        blocks: [
          {
            type: "paragraph",
            text: "Knowing what to automate is only half the skill. The other half is knowing what not to automate — recognizing tasks that require human judgment, sensitivity, or accountability and protecting those tasks from being handled by a system that cannot exercise those qualities:",
          },
          {
            type: "list",
            items: [
              "Sensitive client communications — automated emails can handle routine confirmations and status updates, but they should never handle complaints, disputes, difficult conversations, or anything where tone and empathy are critical. A client receiving an automated response to an urgent concern is a client who feels invisible.",
              "Decisions that depend on context — automation executes rules. It cannot evaluate whether the rule applies correctly in an unusual situation. When a task requires you to assess context and make a judgment call, it requires a human — full stop.",
              "Anything that affects payroll, contracts, or legal obligations — financial commitments and legal documents require human review and approval before any action is taken. Automating actions in these areas without careful oversight creates liability.",
              "First impressions — the first interaction with a new client, prospect, or partner should always be personalized. An automated welcome email that gets the name or company wrong in its first line damages the relationship before it begins.",
              "Error recovery — when an automated process fails or produces incorrect output, fixing it requires a human who understands both the automation and the business context. Build in checkpoints where a human reviews the output of automated processes before it reaches clients.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Task Automation for Office Assistants",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-7/automating-tasks/task-automation-infographic.png",
            alt: "Task Automation for Office Assistants: identifying automatable tasks, the trigger-action model, built-in automation in email and calendar tools, and the human tasks that must never be automated",
            caption: "Task Automation: Identifying What to Automate and What to Protect",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Always test automation before activating it. An untested Zap or email rule that sends incorrect messages to clients, misfiles documents, or duplicates records can create more work than it saves — and damage trust in the process. Before deploying any automation in a professional context, run it in a test environment or with controlled test data. Get your manager's approval before automating any workflow that touches client data or external communications.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"I manually send a weekly status update email to 6 clients every Monday. How could I automate this using free tools? Give me a step-by-step plan.\" Review the suggestions and note which tool seems most beginner-friendly for your situation — then identify one concern you would want to test before activating the automation.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which of the following tasks is the best candidate for automation?",
            options: [
              "Responding to a sensitive client complaint",
              "Deciding which projects to prioritize for the quarter",
              "A weekly status update email sent to the same recipients every Monday",
              "Conducting a performance review for a new employee",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Design a practical automation plan based on real or realistic office work. Your submission must go beyond identifying tasks — it must demonstrate a working understanding of how automation tools function and where human oversight is still required:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Identify 3 repetitive tasks from your current job, internship, or a realistic future office role. For each task, describe: what the task is, how often it occurs, whether it is a good automation candidate (and why), and which tool you would use to automate or semi-automate it",
          "For your best automation candidate, write out the specific trigger-action logic: 'When [this event occurs] in [this app], automatically [perform this action] in [this app].' Be specific about the apps, the trigger, and the action",
          "Describe one step in your automation plan where a human review checkpoint is necessary before the automation's output reaches a client or affects a record — and explain why that checkpoint cannot be skipped",
          "Write 2–3 sentences describing a scenario where a well-intentioned automation could go wrong — and explain how you would test or safeguard against that failure before activating the automation",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your list of 3 tasks with automation plans, your trigger-action logic, your human review checkpoint, and your risk scenario to your instructor or course folder. Write in complete sentences — bullet fragments are not sufficient for this challenge.",
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
            text: "Your manager at TOR Tech drops a task on your desk at 1pm: \"I need a one-page summary of our 3 main competitors by 3pm — key services, target market, and pricing model if you can find it.\" Two hours is tight. With AI research assistance, you can produce a solid first draft in 30 minutes and spend the rest of the time refining it into something polished and verified.",
          },
        ],
      },
      {
        heading: "Why Prompting Is a Professional Skill",
        blocks: [
          {
            type: "paragraph",
            text: "The quality of AI output is directly proportional to the quality of the prompt. A vague prompt produces a generic response. A specific, structured prompt produces a targeted, usable response. Learning to write effective prompts is not a technical skill — it is a communication skill, and it follows the same logic as every other professional communication:",
          },
          {
            type: "list",
            items: [
              "The AI cannot read your mind — if you type 'write an email,' the AI will write a generic email. If you type 'write a 3-paragraph professional email to a client who missed their renewal deadline, using a firm but understanding tone and closing with a specific next step,' the AI writes something you can actually use.",
              "Context improves output — the more relevant context you provide, the better the output. Include the audience, the purpose, the format, the tone, and any constraints before you ask the AI to produce anything.",
              "Role assignment is effective — opening a prompt with 'Act as a professional office assistant' or 'Act as a business writing expert' primes the AI to respond in a register appropriate for professional use.",
              "Iteration is part of the process — if the first output is not right, do not start over. Add a follow-up prompt: 'Make it more concise' or 'Rewrite the opening paragraph in a warmer tone' or 'Add a numbered action list at the end.' AI conversations are iterative, not one-shot.",
              "Save effective prompts — when you develop a prompt that consistently produces good output for a recurring task, save it as a template in a personal document. A library of effective prompts is a productivity asset you build over time.",
            ],
          },
        ],
      },
      {
        heading: "The Anatomy of an Effective AI Prompt",
        blocks: [
          {
            type: "paragraph",
            text: "Effective prompts share a consistent structure regardless of the task. Learning to build prompts with this structure produces reliably better output than writing prompts by instinct. Each component of the structure serves a distinct purpose:",
          },
          {
            type: "list",
            items: [
              "Role (optional but powerful) — 'Act as a senior office administrator with 10 years of experience.' This establishes the voice and expertise level the AI should adopt. Especially useful for writing tasks where tone and register matter.",
              "Task — the core instruction: 'Write a professional follow-up email,' 'Summarize this document in 5 bullet points,' 'Compare these two companies across three dimensions.' Be specific about the action and the output format.",
              "Context — the background the AI needs to produce relevant output: 'The client missed their renewal deadline by two weeks,' 'The audience is a non-technical manager,' 'The document is 1,200 words long.' Without context, the AI invents assumptions.",
              "Format — the structure of the output: 'Use a bulleted list,' 'Write in 3 paragraphs,' 'Produce a table with 3 columns,' 'Keep it under 150 words.' Explicit format instructions prevent the AI from producing output in a format that does not fit your needs.",
              "Tone or constraints — any stylistic requirements or limitations: 'Use a professional but friendly tone,' 'Avoid jargon,' 'Do not include any pricing information,' 'Match the tone of the existing document.' These constraints narrow the output toward what is actually usable.",
            ],
          },
        ],
      },
      {
        heading: "Using AI for Research: Best Practices",
        blocks: [
          {
            type: "paragraph",
            text: "AI is a research accelerator, not a research replacement. It can help you gather, summarize, and organize information significantly faster than traditional search — but it has real limitations that make independent verification non-optional. Understanding how to use it well protects your professional output from being contaminated by AI errors:",
          },
          {
            type: "list",
            items: [
              "Use AI for breadth, not depth — AI is excellent at giving you a broad overview of a topic: key players, general concepts, common approaches. It is less reliable for precise, current, or specific facts. Use it to orient yourself, then go to authoritative sources for the details that matter.",
              "Ask for summaries of specific topics — rather than asking a broad question like 'tell me about Company X', ask for a structured summary: 'Summarize the key services, primary clients, and market position of [Company X] in three bullet points, based on publicly available information.'",
              "Flag unverified facts before using them — when AI output contains specific numbers, dates, names, or claims, treat them as hypotheses until you have verified them. Add a personal annotation like '[verify]' next to any AI-generated fact before the document leaves your hands.",
              "Use AI output as a starting point for web searches — if AI tells you that a competitor charges a certain price, use that claim as a search query: go find the actual pricing page. The AI output points you at what to look for; the web search confirms whether it is accurate.",
              "Never cite AI as a source — AI tools do not have real-time access to all information and do not provide citable references for their claims. If your document requires citations, find and cite the original source, not the AI summary that led you to it.",
            ],
          },
        ],
      },
      {
        heading: "Using AI to Write and Edit Professionally",
        blocks: [
          {
            type: "paragraph",
            text: "AI writing assistance is most valuable as a layer of support over your own drafting process — not as a replacement for it. The strongest professional writing workflow combines your judgment about what needs to be communicated with AI's ability to improve how it is expressed:",
          },
          {
            type: "list",
            items: [
              "Draft with bullet points first — before asking AI to write anything, jot down the 3–5 key points you want the document to make. Then ask AI to turn those points into a polished draft. This ensures the content is yours even when the language is AI-assisted.",
              "Use AI to tighten and improve existing writing — paste a draft you have already written and ask AI to 'make this more concise,' 'improve the flow between paragraphs,' or 'identify any sentences that are unclear or too wordy.' AI as an editor is often more valuable than AI as a writer.",
              "Check tone on sensitive communications — before sending any email about a difficult topic (a complaint, a delay, a refusal), paste it into ChatGPT and ask 'Does this read as professional and respectful, or could it come across as dismissive or aggressive?' Use the response as a tone-check, not as permission to stop thinking critically.",
              "Personalize all AI-generated content — AI output tends to be generic. Before sending, replace placeholder language with specific names, dates, and context. A follow-up email that addresses the client by name and references the specific call you had last Thursday feels very different from one that says 'our recent discussion.'",
              "Read every line before sending — AI output sometimes contains factually wrong statements, tone-deaf phrasing, or content that does not apply to your situation. Read every AI-generated document from start to finish before it leaves your hands. Never skim.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: AI Prompting & Research Workflow",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-7/ai-writing-research/ai-prompting-research-infographic.png",
            alt: "AI Prompting & Research Workflow: the 5-component prompt anatomy, research best practices, writing and editing workflow, verification checklist, and the never-cite-AI rule",
            caption: "AI Prompting & Research: From Prompt to Polished Professional Output",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "AI can confidently state inaccurate information — including fabricated statistics, outdated company data, and entirely invented sources. This is not a rare edge case; it is a known behavior of all current AI language models. Always verify key facts from a reliable website, official report, or database before including them in any work document. When in doubt, remove the claim or find the source. A document with no facts is better than a document with wrong ones.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Using the 5-component prompt structure (role, task, context, format, tone), write a summary of the key services and target market of [any real company you know], formatted as 3 bullet points for a professional business audience.\" Then look up the company yourself and check whether the AI got the key details right. Note any inaccuracies you find.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What should you always do before including AI-generated data or statistics in a work document?",
            options: [
              "Include a disclaimer that AI assisted with the research",
              "Copy it directly — AI tools are generally reliable for facts",
              "Ask a colleague to review the AI's output before using it",
              "Verify the information from a reliable, independent source",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Apply the AI research and writing workflow from this lesson to produce a real output — not just a description of how you would do it. Your submission must demonstrate effective prompting, honest verification, and professional editing:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write an effective AI prompt using the 5-component structure (role, task, context, format, tone) for one of these tasks: a competitive summary of two companies in the same industry, a summary of a work-relevant topic you want to understand better, or a first draft of a professional document (memo, briefing, agenda)",
          "Include the exact prompt you wrote and the AI output you received — copy-paste both into your submission",
          "Fact-check at least 3 specific claims in the AI output — for each claim, note whether it was accurate, inaccurate, or unverifiable, and cite the source you used to check",
          "Edit the AI output into a final, polished version that you would actually send or submit in a professional setting — your edited version must differ meaningfully from the raw AI output",
          "Write a 2–3 sentence reflection on what the AI did well and what you had to fix — be specific about the types of errors or weaknesses you found",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your prompt, the original AI output, your fact-checking notes, your edited final version, and your reflection to your instructor or course folder. The difference between your raw AI output and your edited version is part of what is being evaluated.",
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
            text: "It is your final AI challenge at TOR Tech. Your manager says: \"I want to see how you work with AI — not just that you can use it, but that you can use it well.\" You need to complete 3 real office tasks using AI tools, document your process for each one, and demonstrate that you applied professional judgment to everything the AI produced.",
          },
        ],
      },
      {
        heading: "What a Documented AI Workflow Looks Like",
        blocks: [
          {
            type: "paragraph",
            text: "In organizations that have adopted AI tools professionally, documenting how AI was used is increasingly expected — not because AI use is suspicious, but because it creates accountability and enables quality review. A documented AI workflow shows the human decisions behind the AI output:",
          },
          {
            type: "list",
            items: [
              "The task — what office task was being completed and why. This provides context for every other decision in the workflow.",
              "The tool — which AI tool was selected and why it was appropriate for this task rather than a different one.",
              "The prompt — the exact text entered into the AI tool. Documenting the prompt enables another person to reproduce, evaluate, and improve the output.",
              "The raw output — what the AI produced before human editing. Preserving the raw output makes the editing work visible and demonstrates the gap between AI output and professional output.",
              "The edited final version — the polished, reviewed version ready for professional use. The difference between the raw output and the final version is where your professional judgment shows.",
            ],
          },
        ],
      },
      {
        heading: "Selecting the Right Tool for Each Task",
        blocks: [
          {
            type: "paragraph",
            text: "Reaching for the same AI tool for every task is the equivalent of using a screwdriver for every job in a toolbox. The right tool matches the nature of the task. Demonstrating that you made a deliberate tool selection — rather than defaulting to whatever you opened first — is a sign of genuine AI fluency:",
          },
          {
            type: "list",
            items: [
              "For first-draft generation (emails, reports, summaries, agendas) — ChatGPT or the integrated AI in your document or email app (Copilot, Gemini).",
              "For grammar, tone, and clarity review — Grammarly or a specific tone-check prompt in ChatGPT ('Does this read as professional and respectful?').",
              "For meeting transcription and summarization — Otter.ai or Fireflies.ai, or the built-in transcription feature in Microsoft Teams or Google Meet.",
              "For research overviews on a topic or company — ChatGPT for initial orientation, followed by independent web searches to verify and deepen.",
              "For generating or explaining spreadsheet formulas — Microsoft Copilot (within Excel), Google Gemini (within Sheets), or ChatGPT with the formula pasted in for explanation.",
            ],
          },
        ],
      },
      {
        heading: "Writing Effective Prompts in Practice",
        blocks: [
          {
            type: "paragraph",
            text: "The difference between a prompt that produces useful output and one that produces generic output is specificity. This lesson's challenge requires you to document your prompts — which means taking the time to write prompts that are specific enough to produce genuinely useful results. Here is what that looks like for common office tasks:",
          },
          {
            type: "list",
            items: [
              "Email draft — weak prompt: 'Write a follow-up email.' Strong prompt: 'Write a 3-paragraph follow-up email to a corporate client who attended our product demo yesterday. Recap the demo highlights, address their question about pricing tiers, and propose a 30-minute call next week. Use a professional but warm tone.'",
              "Document summary — weak prompt: 'Summarize this.' Strong prompt: 'Summarize the attached 800-word project proposal in 5 bullet points for a non-technical manager. Focus on budget implications, timeline, and the decision that needs to be made by the end of the week.'",
              "Research overview — weak prompt: 'Tell me about [Company X].' Strong prompt: 'Summarize what is publicly known about [Company X]'s core services, target clients, and competitive positioning in 4 bullet points. Format for a professional business audience. Flag any claims that may need independent verification.'",
              "Meeting agenda — weak prompt: 'Write a meeting agenda.' Strong prompt: 'Write a 45-minute meeting agenda for a quarterly client review with 3 agenda items: project status update (15 min), open issues and risks (15 min), and next quarter planning (15 min). Include a 5-minute buffer and a time-keeper note.'",
              "The rule of specificity — whenever you catch yourself about to type a vague, one-line prompt, stop and add: the audience, the format, the length, the tone, and the most important constraint. This 30-second investment consistently produces dramatically better output.",
            ],
          },
        ],
      },
      {
        heading: "Reviewing and Editing AI Output",
        blocks: [
          {
            type: "paragraph",
            text: "Reviewing AI output is not the same as reading it. Reading registers the words. Reviewing evaluates them: Are they accurate? Is the tone appropriate? Does the structure serve the purpose? Is anything missing? Does anything need to be removed? A professional review of AI output is the step that separates useful AI assistance from risky AI delegation:",
          },
          {
            type: "list",
            items: [
              "Check for factual accuracy — any specific claim (a date, a statistic, a person's title, a product feature) must be independently verified before it stays in the document.",
              "Check for tone appropriateness — AI tends toward formal or neutral. Sometimes that is right; sometimes a warmer, more personal, or more direct tone is needed. Adjust the register to match your relationship with the recipient and the context of the communication.",
              "Check for completeness — AI does not always include everything. Compare the output to your original brief: is everything you intended to communicate present? Are all required elements included?",
              "Remove generic filler — AI output often opens with a line like 'I hope this email finds you well.' These filler phrases weaken professional writing. Remove them or replace them with something specific and genuine.",
              "Personalize before sending — replace every placeholder (the client's name, the specific date, the particular detail that makes this communication about this relationship) with real, accurate information. Generic AI output that goes out as-is is immediately recognizable as AI output — and it communicates that you did not care enough to personalize it.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: The Documented AI Workflow",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-7/build-ai-workflow/documented-ai-workflow-infographic.png",
            alt: "The Documented AI Workflow: the 5-component documentation checklist, tool selection guide by task type, prompting best practices, and the professional review checklist for AI output",
            caption: "The Documented AI Workflow: From Task to Verified, Personalized Professional Output",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Act as my office assistant. I need to: 1) draft a follow-up email to a client after a product demo, 2) summarize a 500-word project update in 3 bullets for a non-technical manager, 3) create a weekly task list for Monday morning. For each task, show me the prompt you would recommend I use and the output it produces.\" Use this as a starting point, then customize each output and document your editing process.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What makes an AI prompt produce more useful, accurate results?",
            options: [
              "Keeping it short and vague so AI can interpret freely",
              "Using all capital letters to emphasize importance",
              "Starting every prompt with 'Please' to improve AI tone",
              "Including the topic, format, length, and intended audience",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete 3 office tasks using AI tools and document your full workflow for each one. This is your Module 7 capstone — it must demonstrate deliberate tool selection, effective prompting, critical review, and professional editing. Every specification below must be met:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Choose 3 distinct office tasks from this list: drafting a professional email, summarizing a document, building a meeting agenda, writing a project status update, creating a task list, or researching a topic. No two tasks should be the same type",
          "For each task, use the most appropriate AI tool — at least 2 of your 3 tasks must use different tools. Document your tool choice and explain in one sentence why it was appropriate for that specific task",
          "For each task, write the exact prompt you used — apply the 5-component structure (role, task, context, format, tone) to at least one of your three prompts",
          "Paste the raw AI output and your edited final version side by side for each task. Your edited version must differ meaningfully from the raw output — personalization, fact corrections, and tone adjustments all count",
          "Write a 3-sentence capstone reflection: what worked well across all three tasks, what you had to fix most often, and one habit you will carry forward in your professional AI workflow",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit all 3 completed task write-ups — tool selection rationale, prompt, raw AI output, edited final version, and your capstone reflection — to your instructor or course folder. The editing work and the reflection are evaluated alongside the AI outputs themselves.",
      },
    ],
  },
];
