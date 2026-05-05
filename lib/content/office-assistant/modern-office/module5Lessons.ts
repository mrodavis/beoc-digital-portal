import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "task-management-tools",
    title: "Task Management Tools",
    description:
      "Learn what task management tools are, how offices use them, and how to set up a basic board to track team work.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_M5L1",
    slides: [
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-01.jpg",
        alt: "Task Management Tools — Module 5: Task & Project Management | Modern Office Skills",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-02.jpg",
        alt: "The TOR Tech Scenario — 5 active projects, no tracking system, your manager says 'Get Trello set up'",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-03.jpg",
        alt: "From Sticky Notes to Systems — why email chains and whiteboards fail teams as projects scale",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-04.jpg",
        alt: "The Task Management Landscape — Trello, Asana, ClickUp, and Microsoft To Do compared",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-05.jpg",
        alt: "Boards vs Lists — Card-based visual boards vs linear checklists and when to use each",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-06.jpg",
        alt: "Anatomy of a Professional Task Card — Title, Due Date, Owner, Priority, and Description",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-07.jpg",
        alt: "The Three-Column Foundation — To Do, In Progress, Done: the universal board structure",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-08.jpg",
        alt: "AI Assist: Compare Trello and Asana for small team management",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-09.jpg",
        alt: "Knowledge Check — What two things should every task have to ensure clear accountability?",
      },
      {
        src: "/images/office-assistant/module-5/task-management-tools/slide-10.jpg",
        alt: "The BEOC Challenge — Build your first Trello board with 3 lists and at least 6 tasks",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech has 5 active projects and your manager asks you to keep track of all open tasks. 'We use Trello,' they say. 'Get it set up.' You have never used Trello before — but within 20 minutes you should be able to have a working board ready for the team.",
          },
        ],
      },
      {
        heading: "Why Task Management Tools Matter",
        blocks: [
          {
            type: "paragraph",
            text: "Every office generates tasks constantly — from client follow-ups to internal deliverables to daily admin work. Without a system, tasks live in email chains, sticky notes, and verbal agreements that disappear the moment the conversation ends. Task management tools solve this problem by giving teams a single shared system for tracking who is doing what and when it is due:",
          },
          {
            type: "list",
            items: [
              "Tasks become visible — instead of tasks living in individual inboxes, a shared board gives everyone on the team a real-time view of what is open, in progress, and complete",
              "Accountability becomes clear — when every task has a named owner, there is no ambiguity about who is responsible and no room for tasks to fall through the cracks",
              "Progress is trackable — managers can see at a glance whether the team is on track without needing to send status-check emails",
              "Nothing gets lost — verbal assignments and email threads are fragile; a task on a board persists until it is explicitly marked done",
              "Bottlenecks become visible — when multiple tasks pile up in 'In Progress' for the same person, the board surfaces the problem before it becomes a missed deadline",
            ],
          },
        ],
      },
      {
        heading: "Overview of Popular Tools",
        blocks: [
          {
            type: "paragraph",
            text: "Several task management platforms are widely used in professional offices. Each has a different design philosophy and ideal use case. You do not need to master all of them — but you need to know what each one is and when it is the right choice:",
          },
          {
            type: "list",
            items: [
              "Trello — a visual, card-based tool built around the Kanban board. Tasks appear as cards that move across columns as work progresses. Best for teams that want simplicity and instant visual clarity. Free tier is generous and ideal for most small teams.",
              "Asana — a more structured tool with list views, timeline views, and project portfolios. Best for teams managing complex projects with dependencies, milestones, and multiple contributors. Widely used in marketing, operations, and project management roles.",
              "ClickUp — a highly customizable platform that supports boards, lists, Gantt charts, goals, and time tracking in a single tool. Best for teams that want maximum control over their workflow structure. Steeper learning curve than Trello but more powerful at scale.",
              "Microsoft To Do — a lightweight personal and small-team task manager that integrates tightly with Microsoft 365 (Outlook, Teams). Best for individuals tracking their own work or for teams already deep in the Microsoft ecosystem. Not suited for complex multi-project management.",
              "Notion — a flexible workspace that combines task management with documentation, notes, and databases. Best for teams that want to manage tasks and documentation in the same place. Requires more setup than dedicated task tools but is extremely adaptable.",
            ],
          },
        ],
      },
      {
        heading: "Boards vs. Lists: Understanding the Difference",
        blocks: [
          {
            type: "paragraph",
            text: "The two most common task display formats are boards and lists. Both track the same underlying data — tasks, owners, due dates, and statuses — but they present it differently and serve different cognitive needs. Knowing when to use each is a sign of organizational maturity:",
          },
          {
            type: "list",
            items: [
              "Board view (Kanban) — tasks appear as moveable cards organized in vertical columns. The columns represent stages of work (To Do, In Progress, Review, Done). You drag a card from one column to the next as it progresses. Best for: understanding the current state of all work at a glance and visualizing workflow stages.",
              "List view — tasks appear in a linear, top-to-bottom format with checkboxes, due dates, and assignees visible in columns beside each task name. Best for: reviewing deadlines chronologically, scanning a long backlog, or managing a personal to-do list where order matters.",
              "When to use a board — use a board when your team needs to see what state every task is in at any given moment. Boards answer the question 'Where does everything stand right now?' instantly.",
              "When to use a list — use a list when your team needs to prioritize by date or urgency. Lists answer the question 'What needs to happen soonest?' efficiently.",
              "Most modern tools support both views — Asana, ClickUp, and Notion let you switch between board and list views on the same project without changing any data. Learn to switch between them depending on what question you are trying to answer.",
            ],
          },
        ],
      },
      {
        heading: "Anatomy of a Professional Task",
        blocks: [
          {
            type: "paragraph",
            text: "A task card is a container for information. An incomplete task — one with no owner, no due date, or no description — is nearly useless because it creates ambiguity about what needs to happen, when, and by whom. Every professional task should contain these fields before it is assigned to anyone:",
          },
          {
            type: "list",
            items: [
              "Title — write a clear, action-oriented title that describes the specific output: 'Draft Q3 client report' not 'Report'. The title should tell anyone reading the board exactly what needs to be produced.",
              "Owner — assign every task to exactly one person. A task assigned to 'the team' is a task assigned to no one. Single ownership is the foundation of accountability.",
              "Due date — every task needs a deadline, even a soft one. A task with no due date communicates that it is not important enough to finish on time, which means it will keep getting pushed until it becomes urgent.",
              "Priority — label each task as High, Medium, or Low priority so the owner knows how to sequence their work when their plate is full. Most tools support priority labels or color-coding.",
              "Description — use the description field to add context: what the task is, why it matters, what done looks like, and any relevant links or reference materials. A description-free task forces the owner to track down context before they can start.",
              "Status — update the task's status column or card column as work progresses: Not Started → In Progress → Done. Status fields only work if people actually update them after every meaningful change.",
            ],
          },
        ],
      },
      {
        heading: "Setting Up Your First Board",
        blocks: [
          {
            type: "paragraph",
            text: "The simplest effective board structure uses three columns. This three-column foundation covers the full lifecycle of any task and requires zero training for new team members to understand:",
          },
          {
            type: "list",
            items: [
              "To Do — all tasks that have been identified and assigned but not yet started. This is the backlog. Tasks should be created here first and only moved when someone actively begins work.",
              "In Progress — tasks that someone is actively working on right now. A well-maintained board has an honest 'In Progress' column — if a task has stalled or is blocked, it should be flagged, not left sitting as if work is continuing.",
              "Done — tasks that are fully complete. Moving a card to Done is a meaningful action — it signals to the team that the work is finished and the outcome is ready. Never move a card to Done if follow-up is still required.",
              "Adding columns as your workflow grows — once the team is comfortable with the three-column foundation, add columns like 'In Review', 'Blocked', or 'Awaiting Approval' to reflect the actual stages of your workflow more precisely.",
              "Board maintenance — review the board weekly to archive completed tasks, update stalled items, and ensure every 'In Progress' card still reflects active work. A board with 30 tasks stuck in 'In Progress' for two weeks is not being used correctly.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Task Management Essentials",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-5/task-management-tools/task-management-infographic.png",
            alt: "Task Management Essentials: From Sticky Notes to Shared Systems — covering the Kanban board structure, anatomy of a professional task card, popular tools compared, and board setup best practices",
            caption: "Task Management Essentials: From Sticky Notes to Shared Systems",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "A task management board is a shared team resource — what you add, move, or delete affects everyone. Never close or archive a task that was assigned to someone else without notifying them. Never move someone else's task to 'Done' without confirming the work is actually complete. Treat the board as a source of truth: if you update it incorrectly, your manager and teammates will make decisions based on inaccurate information.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Compare Trello and Asana for managing tasks on a small team. Which is better for beginners?' Use the response to understand which tool might be the best fit for the office environments you will work in.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What two things should every task have to ensure clear accountability?",
            options: [
              "A color label and a comment thread",
              "A due date and an assigned owner",
              "A description and a file attachment",
              "A priority level and a project tag",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create a free Trello board at trello.com — or mock one by drawing or writing the structure in a document. Your board must be fully set up and meet all five specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create 3 lists: To Do, In Progress, and Done",
          "Add at least 6 tasks (cards) distributed across all 3 lists",
          "Each card must have a clear, action-oriented title — no single-word titles like 'Report' or 'Meeting'",
          "At least 3 cards must have a due date assigned",
          "At least 2 cards must have a named owner (use any name) and a priority label (High, Medium, or Low)",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your Trello board (or your mock board document) showing all 3 lists, at least 6 tasks, and visible due dates and priority labels on at least 2 cards.",
      },
    ],
  },

  {
    slug: "prioritizing-work",
    title: "Prioritizing & Organizing Work",
    description:
      "Learn proven frameworks for deciding what to work on first when everything feels urgent.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_M5L2",
    slides: [
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-01.jpg",
        alt: "Prioritizing & Organizing Work — Module 5: Task & Project Management | Modern Office Skills",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-02.jpg",
        alt: "The TOR Tech Monday Problem — 12 tasks, one day, no system for deciding what to do first",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-03.jpg",
        alt: "Why Prioritization Is a Professional Skill — Reactive vs. Intentional Work",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-04.jpg",
        alt: "The Eisenhower Matrix — Four Quadrants: Urgent & Important, Important Not Urgent, Urgent Not Important, Neither",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-05.jpg",
        alt: "The MoSCoW Method — Must Have, Should Have, Could Have, Won't Have",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-06.jpg",
        alt: "Time-Blocking: Turning Priorities Into a Schedule — Reactive Calendar vs Blocked Calendar",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-07.jpg",
        alt: "Saying No Professionally — The Reprioritization Script for overloaded plate situations",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-08.jpg",
        alt: "The Multitasking Myth — why switching costs reduce quality and what to do instead",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-09.jpg",
        alt: "AI Assist — Use ChatGPT to sort your task list using the Eisenhower Matrix",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-10.jpg",
        alt: "Knowledge Check — Urgent AND Important tasks in the Eisenhower Matrix should be done immediately",
      },
      {
        src: "/images/office-assistant/module-5/prioritizing-work/slide-11.jpg",
        alt: "The Challenge — Create 10 workplace tasks and sort them into a complete Eisenhower Matrix",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You start Monday at TOR Tech with 12 tasks on your list. Your manager needs a report by noon, a client email by 2pm, and also wants you to order office supplies and clean up the shared drive. What do you do first? The answer is not 'everything at once' — it is a system.",
          },
        ],
      },
      {
        heading: "Why Prioritization Is a Professional Skill",
        blocks: [
          {
            type: "paragraph",
            text: "Most people in an office do not lack the ability to work hard — they lack a system for deciding where to direct that work. Without a prioritization framework, most people default to one of two dysfunctional patterns: they work on whatever landed in their inbox most recently, or they work on whatever feels most comfortable to do. Both patterns produce the same outcome — the most important work gets done last, or not at all:",
          },
          {
            type: "list",
            items: [
              "Reactive work — responding to requests in the order they arrive treats a casual Slack message as equally important as a client deliverable with a deadline. Reactivity guarantees that whoever shouts loudest controls your day.",
              "Comfort-seeking work — tackling easy tasks first because they feel satisfying to complete creates a dangerous illusion of productivity. A cleared inbox and a missed deadline are not a good trade.",
              "Prioritization frameworks give you a repeatable system — instead of making a judgment call every morning about what to work on, a framework gives you rules that produce consistent, defensible decisions about how to sequence your work.",
              "Prioritization communicates professional maturity — when you can explain to your manager why you worked on Task A before Task B using a logical framework, you demonstrate strategic thinking, not just task execution.",
            ],
          },
        ],
      },
      {
        heading: "The Eisenhower Matrix",
        blocks: [
          {
            type: "paragraph",
            text: "The Eisenhower Matrix is the most widely used prioritization tool in professional environments. It divides every task into one of four quadrants based on two dimensions: urgency and importance. The framework forces you to evaluate each task on both dimensions before deciding how to handle it:",
          },
          {
            type: "list",
            items: [
              "Quadrant 1 — Urgent & Important (Do Now): Tasks that have a deadline today or tomorrow and directly affect a deliverable, client, or team commitment. Example: A client report due at noon that has not been started. Handle these immediately and without interruption.",
              "Quadrant 2 — Important, Not Urgent (Schedule): Tasks that matter significantly for long-term outcomes but have no immediate deadline pressing on them today. Example: Reorganizing the shared drive, developing a new filing system, proactive communication with a client. Schedule specific time blocks for these or they will always get pushed aside by Q1 urgencies.",
              "Quadrant 3 — Urgent, Not Important (Delegate or Minimize): Tasks that feel urgent because someone is asking for them but do not directly advance any meaningful outcome. Example: Responding to a routine administrative email while a client deliverable is outstanding. Handle these quickly or delegate them — do not let them consume focus time.",
              "Quadrant 4 — Neither Urgent nor Important (Eliminate): Tasks that consume time without producing meaningful output. Example: Reorganizing folders that nobody uses, attending meetings with no agenda that have no bearing on your work. Eliminate these from your schedule entirely.",
              "The trap of Q3 — the most dangerous mistake is mistaking Q3 tasks for Q1 tasks. Something that feels urgent (a buzzing inbox, a colleague standing at your desk) is not automatically important. Ask: 'If I do not do this today, does a client relationship or a team deliverable suffer?' If no, it is Q3.",
            ],
          },
        ],
      },
      {
        heading: "The MoSCoW Method",
        blocks: [
          {
            type: "paragraph",
            text: "The MoSCoW Method is a prioritization framework used specifically for managing project deliverables when a team needs to agree on what gets built or done within a fixed scope. Unlike the Eisenhower Matrix, which is for personal daily work sequencing, MoSCoW is for aligning a team on what matters most in a project:",
          },
          {
            type: "list",
            items: [
              "Must Have — the non-negotiable requirements. If a Must Have is not delivered, the project or release cannot go out. These are the absolute minimum for the work to have value. Limit this category ruthlessly — everything cannot be a Must Have.",
              "Should Have — important deliverables that add significant value but the project can technically launch without them. Should Haves are completed after Must Haves if time and resources allow.",
              "Could Have — desirable additions that would improve the outcome but are low-stakes if dropped. These are cut first when deadlines tighten. Including them in the plan keeps the team focused on what is achievable without losing sight of what would be nice.",
              "Won't Have (this time) — items explicitly agreed to be out of scope for this project or sprint. Naming them in the Won't Have category prevents scope creep and manages expectations without dismissing the idea entirely.",
              "When to use MoSCoW vs. Eisenhower — use Eisenhower for your daily personal work queue. Use MoSCoW when your team is scoping a project, planning a sprint, or negotiating what to include in a deliverable package. They are complementary, not competing tools.",
            ],
          },
        ],
      },
      {
        heading: "Time-Blocking: Converting Priorities Into a Schedule",
        blocks: [
          {
            type: "paragraph",
            text: "Prioritization frameworks tell you what to work on. Time-blocking tells you when. Without time-blocking, even a perfectly prioritized task list gets disrupted by every incoming request, notification, and meeting that arrives throughout the day. Time-blocking protects prioritized work by assigning it a defended slot on your calendar:",
          },
          {
            type: "list",
            items: [
              "What time-blocking is — assigning each high-priority task a specific start time and end time on your calendar, just like a meeting. A block that says '9:00 AM – 11:00 AM: Q3 Client Report' is a commitment, not a suggestion.",
              "Why it works — a calendared task is significantly more likely to get done than an item on a list. When the time block arrives, your next action is clear: work on the report. No decision required.",
              "Batch similar tasks — group similar low-cognitive-load tasks (responding to emails, filing documents, updating the task board) into a single time block rather than doing them scattered throughout the day. This preserves focus for deeper work.",
              "Protect Q2 time — if you never block time for Q2 (Important, Not Urgent) tasks, they will never get done. Block at least one 30–60 minute Q2 slot per day to make progress on work that matters long-term but is not screaming for attention today.",
              "Honor the block — the most common failure of time-blocking is treating calendar blocks as optional and accepting meeting invites over them. Treat your work blocks with the same respect you give to meetings with other people — because the block is a meeting with your most important work.",
            ],
          },
        ],
      },
      {
        heading: "Saying No Professionally & The Multitasking Myth",
        blocks: [
          {
            type: "paragraph",
            text: "Two habits undermine even the best prioritization system: agreeing to every new request without evaluating its impact on existing commitments, and attempting to work on multiple tasks simultaneously. Both habits feel productive in the moment and both reduce actual output:",
          },
          {
            type: "list",
            items: [
              "Saying no professionally — when your plate is full, the professional response is not silence and not an unconditional yes. Use this script: 'I can absolutely get to that — I am currently working on [X] which is due [time]. Would you like me to prioritize this over that, or should I address it after?' This puts the decision where it belongs: with the person requesting the work.",
              "The key principle of professional pushback — you are not refusing the task; you are asking for explicit reprioritization. This demonstrates awareness of your workload and invites your manager into a collaborative decision about what matters most.",
              "The multitasking myth — research consistently shows that what people call multitasking is actually rapid task-switching, and every switch incurs a cognitive cost. Each time you shift from one task to another, your brain requires time to reload context — time that adds up to 20–40% of productive output lost across a day.",
              "Batching as the alternative to multitasking — instead of alternating between email and a report every 10 minutes, complete one before starting the other. Finish the report, then process all emails. Output quality and speed both increase.",
              "Single-task during deep work blocks — turn off notifications, close unrelated tabs, and commit to one task at a time during your scheduled focus blocks. The productivity gain from uninterrupted focus is not small — it is the difference between work that is good and work that is great.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Prioritization Frameworks",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-5/prioritizing-work/prioritization-infographic.png",
            alt: "Prioritization Frameworks for Office Professionals — The Eisenhower Matrix four quadrants, the MoSCoW Method, time-blocking best practices, and the professional pushback script",
            caption: "Prioritization Frameworks for Office Professionals",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Prioritization frameworks are decision-making tools, not permission to unilaterally deprioritize work your manager considers important. Before deciding on your own that a task is Q4 (neither urgent nor important), confirm with your manager — what looks low-priority to you may have context or downstream implications that are not visible from your position. When in doubt, surface the question: 'I have these five tasks today — given my deadlines, I plan to work in this order. Does that align with your priorities?' Asking is always safer than assuming.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I have these 8 tasks today. Help me prioritize them using the Eisenhower Matrix: [paste your list of tasks].' Use your own real or made-up task list and review where ChatGPT places each item. Note any placements you would argue with — that disagreement is worth examining.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In the Eisenhower Matrix, tasks that are both Urgent AND Important should be:",
            options: [
              "Scheduled for later in the week",
              "Delegated to a teammate",
              "Done immediately",
              "Eliminated from your list",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create a list of 10 mixed workplace tasks — some urgent, some important, some routine, some optional. Then sort all 10 tasks into a complete Eisenhower Matrix. Your submission must meet all four requirements below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create exactly 10 fictional workplace tasks with clear, specific titles (no single-word tasks like 'Email' or 'Report')",
          "Sort all 10 tasks into the correct Eisenhower Matrix quadrant — label all 4 quadrants clearly",
          "Write one sentence next to each task explaining why you placed it in that quadrant",
          "Identify the 3 tasks you would work on first, in order, and write 1–2 sentences explaining your sequencing using the framework",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed Eisenhower Matrix with all 10 tasks placed and one-sentence justifications. You can submit it as a table, a drawn grid, or a formatted document.",
      },
    ],
  },

  {
    slug: "tracking-deadlines",
    title: "Tracking Deadlines & Progress",
    description:
      "Learn how to track project deadlines, communicate progress, and flag risks before they become missed deadlines.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_M5L3",
    slides: [
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-01.jpg",
        alt: "Tracking Deadlines & Progress — Module 5: Task & Project Management | Modern Office Skills",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-02.jpg",
        alt: "The TOR Tech 3-Week Project — 6 deliverables, multiple owners, one assistant responsible for keeping everything visible",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-03.jpg",
        alt: "Why Deadline Tracking Is Not Optional — the cost of a missed deadline that nobody saw coming",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-04.jpg",
        alt: "Building a Deadline Tracker — the five essential columns every tracker must have",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-05.jpg",
        alt: "Status Vocabulary — Not Started, In Progress, Complete, At Risk: what each status means and when to use it",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-06.jpg",
        alt: "The Weekly Check-In Habit — 15 minutes every week prevents the surprise deadline",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-07.jpg",
        alt: "Flagging At-Risk Items — Early Warning vs Silent Failure: the professional standard for surfacing problems",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-08.jpg",
        alt: "Communicating Delays Proactively — the anatomy of a professional delay notification",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-09.jpg",
        alt: "AI Assist — Use ChatGPT to generate a deadline tracker structure for a 3-week project",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-10.jpg",
        alt: "Knowledge Check — When should you flag a task as At Risk in your project tracker?",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-11.jpg",
        alt: "The Challenge — Build a 3-week deadline tracker for a fictional project with 6 deliverables",
      },
      {
        src: "/images/office-assistant/module-5/tracking-deadlines/slide-12.jpg",
        alt: "Moving Forward — Next Up: Hands-On: Build a Project Tracker",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A TOR Tech project has 6 deliverables due over 3 weeks. Your job is to make sure nothing falls through the cracks and your manager always knows where things stand. You cannot rely on memory — you need a system that shows status at a glance.",
          },
        ],
      },
      {
        heading: "Why Deadline Tracking Matters",
        blocks: [
          {
            type: "paragraph",
            text: "A missed deadline is rarely a surprise to the person who missed it — it is almost always a surprise to everyone else. The failure is not usually the work itself; it is the communication and visibility system around the work. Deadline tracking is the infrastructure that converts chaos into clarity:",
          },
          {
            type: "list",
            items: [
              "Without a tracker, status lives in people's heads — and people's heads are unreliable. Ask five people on a project team what the status of each deliverable is and you will get five different answers.",
              "A tracker gives everyone the same picture — when status is visible in a shared document, there is no ambiguity about what is done, what is in progress, and what is behind. Disagreements about status stop happening.",
              "Proactive tracking prevents deadline surprises — a well-maintained tracker surfaces problems while there is still time to respond to them. A reactive approach surfaces problems the day the deadline is missed, when options have already disappeared.",
              "Tracking communicates professionalism — managers notice when their office assistant can give them an instant, accurate status update on any project without looking at email. That capability is built on a tracker, not a good memory.",
              "Tracking protects your reputation — when something goes wrong, a well-kept tracker shows the history of communication and status flags that prove you identified the risk early. An empty tracker shows the opposite.",
            ],
          },
        ],
      },
      {
        heading: "Building a Deadline Tracker",
        blocks: [
          {
            type: "paragraph",
            text: "A deadline tracker is a structured table — usually in a spreadsheet — that gives every deliverable in a project a row of its own with every relevant piece of status information in clearly defined columns. Five columns cover the essentials for any project tracker:",
          },
          {
            type: "list",
            items: [
              "Task Name (Column A) — a clear, specific description of the deliverable. 'Q3 client report — final draft submitted to client' is a useful task name. 'Report' is not.",
              "Owner (Column B) — the single person responsible for delivering this item. One owner per task, always. A task owned by 'the team' has no owner.",
              "Due Date (Column C) — the specific calendar date the deliverable is expected to be complete. Apply consistent date formatting across all rows (YYYY-MM-DD or MM/DD/YYYY) to enable reliable chronological sorting.",
              "Status (Column D) — the current state of the task. Use a consistent, pre-defined vocabulary and enforce it with a dropdown: Not Started, In Progress, Complete, At Risk. Never allow free-text entries in this column.",
              "Notes (Column E) — context that does not fit elsewhere: blockers, dependencies, revised dates with explanations, or communication history. This column is where the story behind the status lives.",
            ],
          },
        ],
      },
      {
        heading: "Consistent Status Vocabulary",
        blocks: [
          {
            type: "paragraph",
            text: "The value of a status column depends entirely on everyone using the same vocabulary. A status field where some team members write 'done', others write 'complete', and others write 'finished' is not a status field — it is noise. Define your status vocabulary before the project begins and enforce it with a dropdown:",
          },
          {
            type: "list",
            items: [
              "Not Started — the task has been created and assigned but no work has begun. This is the default status when a task is first added to the tracker.",
              "In Progress — the owner is actively working on this task. Move to this status the moment work begins — not after a significant milestone has been reached.",
              "Complete — the task is fully done, reviewed (if applicable), and the output has been delivered or filed in the agreed location. This status means no further action is required from anyone.",
              "At Risk — the task has a problem that, if not addressed, will result in a missed deadline. This is the most critical status to use correctly — and the one most often avoided because it feels uncomfortable to flag a problem.",
              "Blocked — a variant of At Risk used when progress cannot continue because of a dependency on someone else's work, a decision that has not been made, or an external resource that has not arrived. Blocked means 'I cannot move this forward without something from outside myself'.",
              "Consistency rule — create a Data Validation dropdown for the Status column with exactly these options. Do not allow free-text entry. This one rule eliminates the most common source of tracker unreliability.",
            ],
          },
        ],
      },
      {
        heading: "The Weekly Check-In Habit",
        blocks: [
          {
            type: "paragraph",
            text: "A tracker only works if it is kept current. A tracker that was last updated three days ago is three days behind reality — and in a fast-moving project, three days is enough time for a deliverable to go from In Progress to At Risk with no one noticing. The weekly check-in habit prevents this:",
          },
          {
            type: "list",
            items: [
              "Set a recurring 15-minute review — pick the same day and time every week (Friday afternoon works well for most teams) and commit to reviewing every open task in the tracker before leaving for the weekend.",
              "What to review in each 15-minute session — open the tracker, look at every task in 'In Progress', verify the status is still accurate, update any status that has changed since the last review, flag any tasks that are approaching their due date without visible progress.",
              "Ask three questions for every In Progress task — Has meaningful work happened since the last review? Is the owner still on track to finish by the due date? Is there any blocker or risk that has emerged?",
              "Update immediately, not later — never leave a check-in with tasks you know need updating and plan to update 'later'. Later becomes tomorrow, then next week, then the tracker is six days behind and someone is asking you for a status report you cannot confidently give.",
              "Brief the team — after updating the tracker, send a brief weekly status summary to your manager (2–4 bullet points): what moved to complete, what is in progress, what is at risk, and what needs a decision before next week.",
            ],
          },
        ],
      },
      {
        heading: "Flagging At-Risk Items and Communicating Delays",
        blocks: [
          {
            type: "paragraph",
            text: "The two most uncomfortable moments in deadline tracking are flagging a task as At Risk and telling your manager that a deadline will be missed. Both feel like admissions of failure. In reality, both are demonstrations of professionalism — because they give the organization time to respond. The failure is not the problem; the failure is hiding the problem:",
          },
          {
            type: "list",
            items: [
              "When to flag At Risk — the moment you have reason to believe a deadline will not be met: the owner has not started a task that is due in two days, a dependency has not arrived, a blocker has been logged for more than 48 hours without resolution, or the owner has flagged difficulty completing the work.",
              "How to flag — change the status in the tracker, add a note in the Notes column explaining the risk and its source, and notify the relevant stakeholders. Do not flag silently — a status change with no communication has limited value.",
              "Communicating a delay before the deadline — if you know with high confidence a deadline will be missed, tell your manager before the deadline, not after. The message structure: acknowledge the delay, explain the reason briefly, give a revised estimate, and state what you are doing to minimize the impact.",
              "The professional delay message — 'The Q3 client report is currently at risk of missing the Friday deadline. The data export from the finance team was delayed by two days. I am expecting the export by end of day Thursday. Based on that, I expect to deliver the completed report by Monday morning. I have flagged this in the tracker and will update you as soon as the export arrives.'",
              "Never change a deadline in the tracker without notifying the affected parties — a due date that changes silently in a shared tracker creates confusion, damages trust, and may cause team members to miss commitments they made based on the original date.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Deadline Tracking System",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-5/tracking-deadlines/deadline-tracking-infographic.png",
            alt: "Deadline Tracking System: Keeping Projects Visible and On Track — covering the five-column tracker structure, consistent status vocabulary, the weekly check-in habit, flagging at-risk items, and communicating delays proactively",
            caption: "Deadline Tracking System: Keeping Projects Visible and On Track",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never update a deadline without notifying the people affected. Changing a due date in a tracker without communicating it creates confusion and can damage trust with your team or client. If a deadline changes — for any reason — update the tracker, add a note explaining why the date changed, and send a direct message to every person whose work is affected by the new date. The tracker is a shared source of truth, and a silent change to a shared truth is not a small thing.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a simple project deadline tracker for a 3-week project with 6 deliverables.' Use the suggested structure as your starting point for the challenge, then customize the columns, status values, and data to match the specifications below.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "When should you flag a task as 'At Risk' in your project tracker?",
            options: [
              "Only after the deadline has already passed",
              "At the end of every week during a routine review",
              "As soon as you know it might not be completed on time",
              "When your manager explicitly asks about the task's status",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a deadline tracker for a fictional 3-week project with exactly 6 tasks. Your tracker must be fully built and meet all five specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Include all 5 required columns: Task Name, Owner (use made-up names), Due Date, Status, and Notes",
          "Fill in all 6 rows with realistic, specific task data — no placeholder text like 'Task 1' or 'Owner A'",
          "Apply consistent date formatting across all rows and sort the tasks by due date from earliest to latest",
          "Mark at least 1 task as 'At Risk' and write a specific note in the Notes column explaining the risk and what action is being taken",
          "Write a 3-sentence status summary (as if emailing your manager) covering: what is on track, what is at risk, and what decision or action is needed",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed deadline tracker and your written 3-sentence status summary — or share the link to your Google Sheet with view access granted to your instructor.",
      },
    ],
  },

  {
    slug: "build-project-tracker",
    title: "Hands-On: Build a Project Tracker",
    description:
      "Apply everything from this module to build a complete, usable project tracker for a real team scenario.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_M5L4",
    slides: [
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-01.jpg",
        alt: "Hands-On: Build a Project Tracker — Module 5 Capstone | Modern Office Skills",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-02.jpg",
        alt: "The TOR Tech Mission — 'We've been losing track of who is doing what. Build us a project tracker we can actually use.'",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-03.jpg",
        alt: "The Fragile Tracker vs The Functional Tracker — inconsistent data and silent failures vs enforced structure and reliable status",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-04.jpg",
        alt: "Phase 1: Architecting the Column Structure — plan before you build, seven essential columns",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-05.jpg",
        alt: "Phase 1: Data Guardrails — Priority and Status dropdowns eliminate free-text errors",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-06.jpg",
        alt: "Phase 1: Frozen Headers and Structural Foundation — lock Row 1 before entering any data",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-07.jpg",
        alt: "Phase 2: Priority Visualization with Conditional Formatting — High Priority in red, Complete in green, Blocked in yellow",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-08.jpg",
        alt: "Phase 2: Sharing With the Team — access levels, view vs edit permissions, and the team notes tab",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-09.jpg",
        alt: "AI Assist — Use ChatGPT to generate a project tracker template for a 5-person team",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-10.jpg",
        alt: "Knowledge Check — What makes a project tracker most effective for team accountability?",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-11.jpg",
        alt: "The Capstone Challenge — Build a complete project tracker with 10+ tasks, 5 columns, conditional formatting, and a Notes tab",
      },
      {
        src: "/images/office-assistant/module-5/build-project-tracker/slide-12.jpg",
        alt: "You Have Completed Module 5 — Moving Forward: Module 6 | Brooklyn Educational Opportunity Center",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech says: 'We have been losing track of who is doing what. Half our tasks have no owner and nobody knows what is overdue. Build us a project tracker we can actually use.' This is your moment to demonstrate everything you have learned in this module.",
          },
        ],
      },
      {
        heading: "The Fragile Tracker vs. The Functional Tracker",
        blocks: [
          {
            type: "paragraph",
            text: "Most people build a project tracker by opening a blank spreadsheet, typing column headers, and starting to enter tasks. The result is a fragile tracker — one that works fine for the first day and breaks quietly thereafter. A functional tracker is engineered with the same care you would give any tool that a team will depend on. Here is what separates them:",
          },
          {
            type: "list",
            items: [
              "Fragile trackers have no consistent status vocabulary — one person marks a task 'done', another writes 'complete', another writes 'finished'. Filtering the tracker for completed items returns inconsistent results.",
              "Fragile trackers assign tasks to groups — 'the team', 'marketing', 'everyone'. When nobody specific owns a task, nobody specific completes it.",
              "Fragile trackers have no priority signal — every task looks equally important, so team members guess about sequencing and the most important work may get done last.",
              "Functional trackers enforce consistency through dropdowns — every status entry and priority entry is selected from a pre-approved list, making the tracker filterable, sortable, and reliable from row 1 to row 100.",
              "Functional trackers assign tasks to individuals — one name per task, always. The tracker is only as useful as its accountability structure.",
              "Functional trackers provide instant priority visibility — conditional formatting colors high-priority and blocked tasks so the most important work is visible in seconds without reading every row.",
              "Functional trackers document themselves — a Notes tab explains what each column means, what status values are allowed, and who maintains the tracker. Any new team member can use the tracker correctly without asking for a tutorial.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Architecting the Column Structure",
        blocks: [
          {
            type: "paragraph",
            text: "The most important step in building any tracker is planning what data you actually need to capture before you type a single value. Adding columns impulsively mid-project breaks existing filters and creates structural inconsistencies. Plan the full column structure first, then build:",
          },
          {
            type: "list",
            items: [
              "Task Name (Column A) — a specific, action-oriented description of the deliverable. Write task names as outcomes: 'Submit Q3 client report to finance team by June 30' is useful. 'Report' is not.",
              "Project (Column B) — the project or initiative this task belongs to. Including a project column enables filtering by project so you can view all tasks for a single initiative at once. Minimum of two distinct projects in the finished tracker.",
              "Owner (Column C) — the single person responsible for this task. Use first and last names so there is no ambiguity when multiple team members share a first name.",
              "Due Date (Column D) — the specific date the task is expected to be complete. Apply consistent YYYY-MM-DD formatting so the column sorts correctly when you sort by date.",
              "Priority (Column E) — the urgency and importance level of this task: High, Medium, or Low. Apply a Data Validation dropdown so no one can type 'urgent', 'critical', or any non-standard value.",
              "Status (Column F) — the current state of the task. Apply a Data Validation dropdown: Not Started, In Progress, Complete, At Risk, Blocked. Free-text is not allowed in this column.",
              "Notes (Column G) — context, blockers, dependencies, and communication history. This is the only free-text column in the tracker.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Data Guardrails: Dropdowns for Priority and Status",
        blocks: [
          {
            type: "paragraph",
            text: "The Priority and Status columns are the most important columns in the tracker — and the most vulnerable to inconsistency if left as free-text fields. Data Validation dropdowns convert these columns from noise generators into reliable filters:",
          },
          {
            type: "list",
            items: [
              "Select the entire Priority column (Column E), then navigate to Data > Data Validation (Google Sheets) or Data > Data Validation > Allow: List (Excel).",
              "Enter your allowed values for Priority: High, Medium, Low — separated by commas. These are the only values the column will accept. Reject all invalid input.",
              "Repeat the process for the Status column (Column F) with these values: Not Started, In Progress, Complete, At Risk, Blocked.",
              "Set both validations to 'Reject input' on invalid data — in Google Sheets, select 'Reject input' under the On Invalid Data setting. This means the spreadsheet will not allow free-text entries that fall outside the approved list.",
              "The result: every priority and status entry is machine-readable and perfectly consistent. Filtering the tracker by 'High' priority returns exactly every high-priority task — no missed rows, no false matches, no ambiguity.",
              "Test the validation immediately after setting it up — try typing 'urgent' into a Priority cell. The tracker should reject the input and display an error. If it does not, the validation was not set up correctly.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Locking the Foundation with Frozen Headers",
        blocks: [
          {
            type: "paragraph",
            text: "A tracker with 50 rows of tasks and a header row that disappears when you scroll is unusable. The moment a team member has to scroll up to remember what Column E means, the structural clarity you built is gone. Freeze the header row before entering any data:",
          },
          {
            type: "list",
            items: [
              "Google Sheets — click View > Freeze > 1 Row. Row 1 locks in place and remains permanently visible at the top of the screen regardless of how far down you scroll.",
              "Excel — click View > Freeze Panes > Freeze Top Row. Same result: Row 1 is anchored.",
              "Always freeze the header row before entering task data — this ensures the structural label is locked before the sheet grows.",
              "Verify it works — enter 20 rows of tasks and scroll to the bottom. The header row should remain fully visible at the top of the window. If it disappears, the freeze was not applied correctly.",
              "A frozen header row is non-negotiable for any shared tracker — without it, team members editing the tracker from their own screens have no reliable column reference and may enter data in the wrong column.",
            ],
          },
        ],
      },
      {
        heading: "Phase 2 — Priority Visualization with Conditional Formatting",
        blocks: [
          {
            type: "paragraph",
            text: "A project tracker with 30 tasks and no visual differentiation requires reading every row to identify the most critical work. Conditional Formatting automates priority visibility by coloring cells based on their content — turning a flat grid into an instantly readable status display:",
          },
          {
            type: "list",
            items: [
              "Select the entire Priority column (Column E), then navigate to Format > Conditional Formatting (Google Sheets) or Home > Conditional Formatting > New Rule (Excel).",
              "Create a rule for 'High' priority — set the condition to 'Text is exactly: High' and choose a red background fill. Every High-priority task will stand out immediately in the tracker.",
              "Create a rule for 'Low' priority — set the condition to 'Text is exactly: Low' and choose a light grey or light blue fill. Visual hierarchy is now complete: red = urgent, grey = low stakes.",
              "Apply a second set of rules to the Status column — 'Complete' in green, 'At Risk' in orange, 'Blocked' in yellow. This gives every row a two-column visual summary of urgency and progress status simultaneously.",
              "The result: scanning a 30-row tracker for the work that needs attention takes three seconds. Red high-priority tasks and orange at-risk items are immediately visible without reading any cell content.",
              "Conditional formatting applies automatically to every new row added — you never need to manually reformat cells as the tracker grows beyond its initial set of tasks.",
            ],
          },
        ],
      },
      {
        heading: "Phase 2 — Sharing With the Team",
        blocks: [
          {
            type: "paragraph",
            text: "A tracker that only you can access is a personal to-do list. A tracker shared with the team is project infrastructure. Sharing a tracker correctly means configuring access levels thoughtfully and documenting the tracker structure so every team member can use it without breaking it:",
          },
          {
            type: "list",
            items: [
              "In Google Sheets — click Share in the top right corner. Add team members by email and assign 'Viewer', 'Commenter', or 'Editor' access based on their role. Use 'Anyone with the link can view' for read-only access across a larger group.",
              "Editor access — grant only to team members whose job requires updating the tracker: the project lead, the office assistant, and anyone who owns tasks in the tracker.",
              "Viewer access — appropriate for stakeholders who need visibility into the tracker but should not be able to change any values. A senior manager, a client contact, or a cross-functional partner might receive Viewer access.",
              "Protect formula cells — if your tracker includes any calculated columns (a formula counting overdue tasks, for example), protect those cells so team members cannot accidentally overwrite them. In Google Sheets: Format > Protect Range. In Excel: Review > Protect Sheet.",
              "Add a Notes tab — create a second spreadsheet tab named 'Notes' and document every column: its name, what it means, and any entry rules (especially for the dropdown columns). A team member who joins the project two weeks in should be able to read the Notes tab and use the tracker correctly with zero additional instruction.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Building a Functional Project Tracker",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-5/build-project-tracker/building-project-tracker-infographic.png",
            alt: "Building a Functional Project Tracker — Phase 1: Structure & Guardrails (column architecture, data validation dropdowns, frozen headers), Phase 2: Visibility & Access (conditional formatting, sharing permissions, Notes tab documentation)",
            caption: "Building a Functional Project Tracker",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "A project tracker shared with a team is a source of truth — and a broken source of truth is worse than no source of truth at all. Before sharing the tracker, test every dropdown to confirm it rejects invalid input, verify every formula calculates correctly, and check that conditional formatting rules fire on the right conditions. Share the tracker only after you have verified that it works exactly as designed. Sharing a broken tracker communicates that you did not test your own work.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Build a project tracker template for a 5-person team managing 3 simultaneous projects. Include columns for task name, project, owner, due date, priority, and status.' Review the column structure it suggests and decide which columns to keep, modify, or add based on what you have learned in this module. The AI gives you a starting structure — your job is to add the dropdowns, formatting, and documentation that make it a professional tool.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What makes a project tracker most effective for team accountability?",
            options: [
              "Assigning tasks to the whole team collectively",
              "Color-coding tasks based on personal preference",
              "Limiting tracker access to managers only",
              "Assigning every task to a single named owner",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a complete, functional project tracker in Google Sheets or Microsoft Excel. This is your capstone challenge for Module 5 — it must demonstrate every skill from this module. Your tracker must pass every check in the five specifications below before you submit it:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Include all 7 required columns fully filled in: Task Name, Project (at least 2 different projects), Owner (at least 3 different named individuals), Due Date, Priority, Status, and Notes — with at least 10 rows of realistic task data",
          "Apply Data Validation dropdowns to both the Priority column (High / Medium / Low) and the Status column (Not Started / In Progress / Complete / At Risk / Blocked) — set both to reject invalid input",
          "Apply conditional formatting to the Priority column (High = red background) and the Status column (Complete = green, At Risk = orange, Blocked = yellow) — verify all rules fire correctly with test data",
          "Freeze Row 1 and verify it stays visible when scrolling, then add a second tab named 'Notes' with a one-sentence description of every column and its entry rules",
          "Mark at least 1 task as 'At Risk' with a specific explanatory note in the Notes column, and mark at least 2 tasks as 'Complete'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Share the link to your Google Sheet (view access) or submit a screenshot of the completed tracker showing the data, dropdown validation active, and conditional formatting colors visible. The tracker must be fully filled in — no empty rows, no placeholder text, and no free-text entries in the Priority or Status columns.",
      },
    ],
  },
];
