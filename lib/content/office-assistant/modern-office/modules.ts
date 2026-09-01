import { Lesson } from "@/types/lesson";
import { cloudModule1Lessons } from "./cloudModule1Lessons";
import { cloudModule2Lessons } from "./cloudModule2Lessons";
import { cloudModule3Lessons } from "./cloudModule3Lessons";
import { cloudModule4Lessons } from "./cloudModule4Lessons";
import { cloudModule5Lessons } from "./cloudModule5Lessons";
import { cloudModule6Lessons } from "./cloudModule6Lessons";
import { cloudModule7Lessons } from "./cloudModule7Lessons";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";
import { module6Lessons } from "./module6Lessons";
import { module7Lessons } from "./module7Lessons";
import { module8Lessons } from "./module8Lessons";

export type ModernOfficeModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
  whatYoullLearn: string[];
  scenario: string;
};

export const modernOfficeModules: ModernOfficeModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Computer Basics",
    emoji: "🖥️",
    description:
      "Identify what a computer is and does, then specify a complete machine for a defined purpose and budget.",
    lessons: cloudModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 45,
    whatYoullLearn: [
      "The components of a computer and the input-process-output-storage model",
      "The difference between hardware and software, and between RAM and storage",
      "How each component affects performance for a given workload",
      "How to specify a workstation from the job it must do, within a budget",
    ],
    scenario:
      "Before you can reason about where computing happens in the cloud, you need a clear picture of where it happens on the machine in front of you. The cloud is not magic — it is somebody else's computers, in a building, running the same components sitting on your desk. Lakeside is also replacing four workstations at $900 each, and someone has to specify them.",
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Cloud Computing Basics",
    emoji: "☁️",
    description:
      "Understand what the cloud actually is, and learn the three service models — IaaS, PaaS, and SaaS — by what each leaves you responsible for.",
    lessons: cloudModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 46,
    whatYoullLearn: [
      "What defines cloud computing, and what changes when computing moves off local hardware",
      "The real trade-offs of the cloud, including the ones vendors do not lead with",
      "IaaS, PaaS, and SaaS, and who manages what in each",
      "The shared responsibility model, and why data is always the customer's responsibility",
    ],
    scenario:
      "Lakeside owns a server in a closet. It needs replacing, its backups have not been tested in a year, and its failure stops the practice working. A vendor proposes moving everything to the cloud, and three other vendors all describe their products as 'cloud-based' while meaning three quite different things.",
  },
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Windows & File Management",
    emoji: "🗂️",
    description:
      "Navigate Windows efficiently, and design a folder structure and naming convention that stays findable as it grows.",
    lessons: cloudModule3Lessons,
    level: "Beginner",
    estimatedMinutes: 42,
    whatYoullLearn: [
      "Keyboard navigation, window snapping, and virtual desktops",
      "File Explorer navigation and view options",
      "How to design a folder structure that mirrors how people search",
      "A file naming convention that sorts and searches correctly",
    ],
    scenario:
      "The shared drive at Lakeside holds 1,400 files across four levels of folders, with names like 'letter final v2.docx' and 'letter FINAL USE THIS.docx'. Nobody can find anything, so people save new copies instead of searching — which makes it worse every week.",
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "SaaS in Action & Document Sharing",
    emoji: "🤝",
    description:
      "Use Google cloud applications as a working example of SaaS, and share documents with the right people at the right permission level.",
    lessons: cloudModule4Lessons,
    level: "Intermediate",
    estimatedMinutes: 46,
    whatYoullLearn: [
      "Google Drive, Docs, Sheets, and Slides as a concrete example of the SaaS model",
      "How continuous saving and version history change your working habits",
      "Permission levels, and choosing the least privilege that does the job",
      "How to audit and revoke access when it is no longer needed",
    ],
    scenario:
      "Eighteen months ago someone at Lakeside shared a folder as 'anyone with the link can edit' so a temporary contractor could deliver a file. The contractor left a year ago, the link still works, it has been forwarded twice, and the folder now contains staff records nobody considered when the link was created.",
  },
  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "The Internet & Networking",
    emoji: "🌐",
    description:
      "Understand what happens between clicking a link and seeing a page, and how local and wide area networks connect.",
    lessons: cloudModule5Lessons,
    level: "Intermediate",
    estimatedMinutes: 44,
    whatYoullLearn: [
      "The steps in a web request, and what each looks like when it fails",
      "The roles of IP addresses, DNS, and protocols",
      "The difference between a LAN and a WAN, and how they connect",
      "Wired against wireless, and when each is the right choice",
    ],
    scenario:
      "A colleague reports that 'the internet is down.' The EHR will not load, but Outlook is receiving mail and a colleague's phone loads pages fine on the office wireless. Something is wrong, and the description you have been given is too vague to act on.",
  },
  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "AI Foundations",
    emoji: "🧠",
    description:
      "Understand what artificial intelligence actually is, how language models produce text, and why AI arrives as a cloud service with all that implies for your data.",
    lessons: cloudModule6Lessons,
    level: "Intermediate",
    estimatedMinutes: 44,
    whatYoullLearn: [
      "The difference between AI, machine learning, and large language models",
      "How a language model produces text, and why fluency is not accuracy",
      "Where AI sits in the IaaS, PaaS, and SaaS models from Module 2",
      "What happens to a prompt after you submit it, and what must never be put in one",
    ],
    scenario:
      "A scheduling vendor tells Lakeside its product is 'AI-powered.' That could mean a language model, a statistical predictor, or a set of if-then rules written in 2015 — all marketed identically, all carrying different risks. Meanwhile a colleague has been pasting draft letters containing patient names into a free AI assistant to improve the wording.",
  },
  {
    moduleNumber: 7,
    moduleSlug: "module-7",
    title: "Working with AI Tools",
    emoji: "✨",
    description:
      "Write prompts that produce usable output, and build the verification habit that makes AI safe to rely on at work.",
    lessons: cloudModule7Lessons,
    level: "Intermediate",
    estimatedMinutes: 48,
    whatYoullLearn: [
      "The six components of a well-formed prompt, and how to iterate on one",
      "Why underspecified prompts produce generic output",
      "What a hallucination is and which output types always require checking",
      "How to match verification effort to the consequences of being wrong",
    ],
    scenario:
      "You ask an AI tool to summarize HIPAA records retention requirements. The answer is well organized, appropriately hedged, and cites a specific section of the regulation with a specific retention period. The section number does not exist — and nothing about the response looked wrong.",
  },

  {
    moduleNumber: 8,
    moduleSlug: "module-8",
    title: "Digital Office Foundations",
    emoji: "🏢",
    description:
      "Understand how modern offices operate using digital systems and tools like email, cloud storage, and scheduling platforms.",
    lessons: module1Lessons,
    level: "Beginner",
    estimatedMinutes: 80,
    whatYoullLearn: [
      "How modern offices actually operate",
      "The core tools used in every workplace",
      "How to set up your own digital workspace",
      "How AI can assist your daily work",
    ],
    scenario:
      "You just got hired as an office assistant at TOR Tech. Your manager asks you to organize company files, respond to emails, and prepare documents. This module teaches you how to do exactly that.",
  },

  {
    moduleNumber: 9,
    moduleSlug: "module-9",
    title: "Communication Systems",
    emoji: "📧",
    description:
      "Master professional email writing, workplace chat tools, and video meeting etiquette for the modern office.",
    lessons: module2Lessons,
    level: "Beginner",
    estimatedMinutes: 85,
    whatYoullLearn: [
      "How to write clear, professional emails",
      "Workplace chat etiquette on Slack and Teams",
      "How to run and participate in video meetings",
      "How to manage and organize a busy inbox",
    ],
    scenario:
      "It's your second week at TOR Tech. Your manager needs you to handle all incoming emails, join a client call, and keep the team updated in Teams. Communication is now your job.",
  },

  {
    moduleNumber: 10,
    moduleSlug: "module-10",
    title: "Document & Data Workflows",
    emoji: "📄",
    description:
      "Create professional documents, use templates effectively, and manage data in spreadsheets for daily office operations.",
    lessons: module3Lessons,
    level: "Beginner",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "How to create and format professional documents",
      "How to use templates to maintain consistency",
      "Spreadsheet basics for tracking office data",
      "How to build a functional office tracking sheet",
    ],
    scenario:
      "TOR Tech needs a client summary document by Friday and a supply tracker by Monday. You're the one building both. This module shows you exactly how.",
  },

  {
    moduleNumber: 11,
    moduleSlug: "module-11",
    title: "Scheduling & Meetings",
    emoji: "📅",
    description:
      "Manage digital calendars, book professional meetings, resolve scheduling conflicts, and coordinate a full office week.",
    lessons: module4Lessons,
    level: "Beginner",
    estimatedMinutes: 85,
    whatYoullLearn: [
      "How to use and manage a shared digital calendar",
      "How to book meetings professionally and efficiently",
      "How to resolve scheduling conflicts with confidence",
      "How to coordinate a full week of office meetings",
    ],
    scenario:
      "Your manager at TOR Tech is unavailable this week. You're responsible for every meeting on the calendar — booking, rescheduling, and making sure nothing falls through.",
  },

  {
    moduleNumber: 12,
    moduleSlug: "module-12",
    title: "Task & Project Management",
    emoji: "✅",
    description:
      "Use task management tools, prioritize work effectively, track deadlines, and keep projects organized across a team.",
    lessons: module5Lessons,
    level: "Intermediate",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "How to use tools like Trello and Asana for task tracking",
      "How to prioritize work using proven frameworks",
      "How to track deadlines and flag risks proactively",
      "How to build a project tracker used by a real team",
    ],
    scenario:
      "TOR Tech has 3 active projects running simultaneously and no one knows who's doing what. Your manager hands you the task board and says: 'Fix this.'",
  },

  {
    moduleNumber: 13,
    moduleSlug: "module-13",
    title: "CRM & Office Systems",
    emoji: "👥",
    description:
      "Learn how CRM systems work, manage client records, log interactions, and maintain professional follow-up communication.",
    lessons: module6Lessons,
    level: "Intermediate",
    estimatedMinutes: 85,
    whatYoullLearn: [
      "What a CRM is and why offices use it",
      "How to create and maintain accurate client records",
      "How to log client interactions professionally",
      "How to write effective follow-up communications",
    ],
    scenario:
      "TOR Tech's biggest client says they feel 'out of the loop.' Your manager asks you to audit all recent interactions and make sure every touchpoint is logged and followed up.",
  },

  {
    moduleNumber: 14,
    moduleSlug: "module-14",
    title: "AI Productivity",
    emoji: "🤖",
    description:
      "Learn how to use AI tools to write faster, automate repetitive tasks, and build a personal AI workflow for the modern office.",
    lessons: module7Lessons,
    level: "Intermediate",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "Which AI tools are most useful for office assistants",
      "How to automate repetitive daily tasks",
      "How to use AI for writing, research, and summaries",
      "How to build a personal AI workflow you'll actually use",
    ],
    scenario:
      "Your manager at TOR Tech challenges you: 'Using only AI tools, complete your Monday morning task list in half the time.' This module shows you how to win that challenge.",
  },

  {
    moduleNumber: 15,
    moduleSlug: "module-15",
    title: "Final Simulation",
    emoji: "🏆",
    description:
      "Apply all your skills in a realistic office simulation — scheduling, communication, documents, CRM, and AI — and build your professional portfolio.",
    lessons: module8Lessons,
    level: "Advanced",
    estimatedMinutes: 120,
    whatYoullLearn: [
      "How to manage a full day of office responsibilities",
      "How to integrate multiple digital tools in one workflow",
      "How to build and present a professional work portfolio",
      "How to demonstrate job-readiness to an employer",
    ],
    scenario:
      "This is it. You are the Office Assistant at TOR Tech. Over the next four lessons, you will complete a full simulated work week using every skill you've built in this program.",
  },
];
