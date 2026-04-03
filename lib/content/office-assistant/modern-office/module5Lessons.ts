import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "task-management-tools",
    title: "Task Management Tools",
    description:
      "Learn what task management tools are, how offices use them, and how to set up a basic board to track team work.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech has 5 active projects and your manager asks you to keep track of all open tasks. \"We use Trello,\" they say. \"Get it set up.\" You have never used Trello before — but within 20 minutes you should be able to have a working board ready for the team.",
          },
        ],
      },
      {
        heading: "Task Management Tools Overview",
        blocks: [
          {
            type: "paragraph",
            text: "Task management tools give teams a shared, visible system for tracking who is doing what and when it is due. Here is what you need to know to get started:",
          },
          {
            type: "list",
            items: [
              "What task management tools are — digital boards that replace sticky notes and email chains with a single organized system everyone can see",
              "Overview of popular tools — Trello (visual card-based boards), Asana (list and timeline views), ClickUp (highly customizable), Microsoft To Do (simple personal and team tasks)",
              "Boards vs lists — boards show tasks as moveable cards across columns (To Do, In Progress, Done); lists show tasks in a linear order with checkboxes",
              "Creating and assigning tasks — every task should have a title, a due date, and an owner so there is no ambiguity about who is responsible",
              "Setting due dates — always add a due date when creating a task; tools can send automatic reminders when deadlines approach",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Compare Trello and Asana for managing tasks on a small team. Which is better for beginners?\" Use the response to understand which tool might be the best fit for the office environments you will work in.",
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
        text: "Create a free Trello board at trello.com — or mock one by drawing or writing the structure in a document. Your board must have 3 lists: To Do, In Progress, and Done. Add at least 6 tasks (cards) distributed across the lists. Each task must have a title and at least one has a due date assigned.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your Trello board (or your mock board document) showing all 3 lists and at least 6 tasks.",
      },
    ],
  },

  {
    slug: "prioritizing-work",
    title: "Prioritizing & Organizing Work",
    description:
      "Learn proven frameworks for deciding what to work on first when everything feels urgent.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You start Monday at TOR Tech with 12 tasks on your list. Your manager needs a report by noon, a client email by 2pm, and also wants you to order office supplies and clean up the shared drive. What do you do first? The answer is not \"everything at once\" — it is a system.",
          },
        ],
      },
      {
        heading: "Prioritization Frameworks",
        blocks: [
          {
            type: "paragraph",
            text: "Prioritization is one of the most valuable skills an office assistant can have. These frameworks give you a repeatable system for making fast, confident decisions:",
          },
          {
            type: "list",
            items: [
              "Eisenhower Matrix — divide tasks into 4 quadrants: Urgent & Important (do now), Important but Not Urgent (schedule), Urgent but Not Important (delegate), Neither (eliminate)",
              "MoSCoW Method — categorize tasks as Must Have, Should Have, Could Have, or Won't Have. Use this when managing project deliverables with a team.",
              "Time-blocking — assign specific time slots on your calendar for focused work on priority tasks, rather than reacting to whatever comes up",
              "Saying no professionally — when your plate is full, you can say: 'I can get to that after I finish [current priority] — would that work, or should we reprioritize together?'",
              "The danger of multitasking — switching between tasks repeatedly reduces quality and increases errors; batch similar tasks and finish one before starting the next",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"I have these 8 tasks today. Help me prioritize them using the Eisenhower Matrix: [paste your list of tasks].\" Use your own real or made-up task list and review where ChatGPT places each item.",
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
        text: "Create a list of 10 mixed workplace tasks — some urgent, some important, some routine, some optional. Then sort all 10 tasks into an Eisenhower Matrix with the correct 4 quadrants labeled. Write one sentence next to each task explaining why you placed it there.",
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
        heading: "Tracking Deadlines & Communicating Progress",
        blocks: [
          {
            type: "paragraph",
            text: "Deadline tracking is about more than writing down a date. It is about building a system that surfaces problems early and keeps every stakeholder informed:",
          },
          {
            type: "list",
            items: [
              "Deadline tracking in spreadsheets — use a simple table with columns for task name, owner, due date, status, and notes to track every deliverable in one place",
              "Using task tool status fields — in Trello, Asana, or ClickUp, update the status card every time progress is made so the board reflects reality, not last week's picture",
              "Weekly check-ins — set a recurring 15-minute weekly review to go through every open task and update statuses before your manager asks",
              "Flagging at-risk items — if a task is behind schedule, flag it immediately using a red label, a comment, or a status of 'At Risk' — never let a missed deadline be a surprise",
              "Communicating delays proactively — if you know a deadline will be missed, tell your manager before the deadline, not after. Include a revised date and a brief reason.",
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
            text: "Never update a deadline without notifying the people affected. Changing a due date in a tracker without communicating it creates confusion and can damage trust with your team or client.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a simple project deadline tracker for a 3-week project with 6 deliverables.\" Use the suggested structure as your starting point for the challenge, then customize the columns and data.",
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
        text: "Build a deadline tracker for a fictional 3-week project with exactly 6 tasks. Your tracker must include columns for: Task Name, Owner (use made-up names), Due Date, Status (Not Started / In Progress / Complete / At Risk), and Notes. Fill in all rows with realistic data and mark at least one task as At Risk with a note explaining why.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed deadline tracker or share the link to your Google Sheet with view access granted to your instructor.",
      },
    ],
  },

  {
    slug: "build-project-tracker",
    title: "Hands-On: Build a Project Tracker",
    description:
      "Apply everything from this module to build a complete, usable project tracker for a real team scenario.",
    duration: "30 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech says: \"We have been losing track of who is doing what. Half our tasks have no owner and nobody knows what is overdue. Build us a project tracker we can actually use.\" This is your moment to demonstrate everything you have learned in this module.",
          },
        ],
      },
      {
        heading: "Building a Tracker That Gets Used",
        blocks: [
          {
            type: "paragraph",
            text: "A project tracker only works if people actually use it — and people only use it if it is clear, fast to update, and shows them exactly what they need to know. Here is how to build one that sticks:",
          },
          {
            type: "list",
            items: [
              "Plan your columns before you build — think through what data the team needs: task name, owner, priority, due date, status, and notes are the essentials",
              "Enter realistic tasks — add at least 10 tasks representing real work, spread across different owners and due dates",
              "Assign owners — every task must have a single named owner so accountability is clear",
              "Set priorities — use a dropdown (High / Medium / Low) or color-coding so the team can instantly see what needs attention first",
              "Track status — use a consistent status vocabulary (Not Started, In Progress, Complete, Blocked) and update it regularly",
              "Share with the team — in Google Sheets, use Share > Anyone with the link can view/comment to make the tracker accessible",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Build a project tracker template for a 5-person team managing 3 simultaneous projects.\" Review the column structure it suggests and decide which columns to keep, modify, or add based on what you have learned.",
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
        text: "Build a complete project tracker in Google Sheets or Microsoft Excel. Your tracker must include at least 10 tasks with the following columns fully filled in: Task Name, Project (at least 2 different projects), Owner (at least 3 different people), Due Date, Priority (High / Medium / Low), and Status. Apply conditional formatting to the Priority or Status column to add color-coding.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Share the link to your Google Sheet (view access) or submit a screenshot of the completed tracker. The tracker must be fully filled in — no empty rows or placeholder text.",
      },
    ],
  },
];
