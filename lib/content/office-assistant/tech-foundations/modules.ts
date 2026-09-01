import { Lesson } from "@/types/lesson";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";
import { module6Lessons } from "./module6Lessons";
import { module7Lessons } from "./module7Lessons";
import { module8Lessons } from "./module8Lessons";
import { module9Lessons } from "./module9Lessons";
import { module10Lessons } from "./module10Lessons";

export type TechFoundationsModule = {
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

export const techFoundationsModules: TechFoundationsModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Computers & Operating Systems",
    emoji: "💻",
    description:
      "Understand how a computer works, navigate Windows confidently, and manage programs and system settings like a workplace professional.",
    lessons: module1Lessons,
    level: "Beginner",
    estimatedMinutes: 75,
    whatYoullLearn: [
      "How to identify and describe the key hardware components of a computer",
      "How to navigate the Windows desktop, taskbar, and Start menu",
      "How to open, close, and switch between programs efficiently",
      "How to adjust system settings and keep Windows updated",
    ],
    scenario:
      "It is your first day at Lakeside Medical Associates. Your supervisor asks you to check the printer settings, adjust your display brightness, run Windows Update, and open three programs at once for your first shift. Before you can do any of it, you need to understand how Windows works from the ground up.",
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "File Management & Organization",
    emoji: "🗂️",
    description:
      "Master the skills that keep every office organized — create, name, move, copy, and search files and folders with confidence.",
    lessons: module2Lessons,
    level: "Beginner",
    estimatedMinutes: 70,
    whatYoullLearn: [
      "How files, folders, and drives are organized on a computer",
      "How to create, rename, copy, move, and delete files and folders",
      "How to search for files quickly and use consistent naming conventions",
      "How to apply professional file organization habits in an office setting",
    ],
    scenario:
      "Lakeside Medical Associates has a shared network drive for all patient documents, staff memos, and billing records. You need to organize a folder for a new provider joining the practice, move last month's reports into an archive folder, and find a patient file from six months ago — all in your first hour.",
  },
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "The Internet & Web Browsing",
    emoji: "🌐",
    description:
      "Navigate the internet effectively, conduct reliable online research, and browse safely in a professional workplace environment.",
    lessons: module3Lessons,
    level: "Beginner",
    estimatedMinutes: 65,
    whatYoullLearn: [
      "How the internet and web browsers work at a practical level",
      "How to search effectively and evaluate the reliability of online sources",
      "How to use browser features like bookmarks, tabs, and history",
      "How to practice safe browsing habits that protect the office network",
    ],
    scenario:
      "Your supervisor at Lakeside Medical Associates asks you to research the current flu vaccine guidelines from the CDC, find the phone number for the county health department, and verify the office address on Google Maps — all while managing five browser tabs without slowing down your computer.",
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Professional Email Communication",
    emoji: "📧",
    description:
      "Write, send, organize, and manage professional emails with the clarity, tone, and efficiency expected in a modern office environment.",
    lessons: module4Lessons,
    level: "Beginner",
    estimatedMinutes: 70,
    whatYoullLearn: [
      "How email works and how to set up and navigate an email account",
      "How to write professional emails with correct tone, structure, and formatting",
      "How to organize and manage a high-volume inbox effectively",
      "How to apply email etiquette rules that protect your professional reputation",
    ],
    scenario:
      "As the front desk assistant at Lakeside Medical Associates, you are responsible for the main clinic inbox. Each morning you receive 30–50 emails from patients, insurance companies, referring physicians, and vendors. You need to respond professionally, route messages to the right people, and keep the inbox organized so nothing falls through the cracks.",
  },
  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "Keyboard Skills & Typing Efficiency",
    emoji: "⌨️",
    description:
      "Build accurate touch typing habits, learn essential Windows keyboard shortcuts, and develop the data-entry speed that professional office work demands.",
    lessons: module5Lessons,
    level: "Beginner",
    estimatedMinutes: 65,
    whatYoullLearn: [
      "How to position your hands correctly and develop touch typing habits",
      "How to use essential Windows keyboard shortcuts that save significant time",
      "How to enter data accurately and efficiently in office applications",
      "How to build typing speed and reduce errors through deliberate practice",
    ],
    scenario:
      "Your supervisor at Lakeside Medical Associates notices that data entry tasks that should take 15 minutes are taking 45. Every appointment booking, patient record update, and billing entry requires fast, accurate typing. This module gives you the keyboard foundation to handle the clinic's data load without slowing down the team.",
  },
  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "Workplace Hardware & Equipment",
    emoji: "🖨️",
    description:
      "Operate, troubleshoot, and maintain the printers, scanners, monitors, and other hardware that keep a modern office running smoothly.",
    lessons: module6Lessons,
    level: "Beginner",
    estimatedMinutes: 60,
    whatYoullLearn: [
      "How to operate and troubleshoot office printers, scanners, and copiers",
      "How to set up and adjust monitors, peripherals, and ergonomic workstations",
      "How to diagnose and resolve common hardware problems independently",
      "How to set up and use video conferencing hardware professionally",
    ],
    scenario:
      "At Lakeside Medical Associates, you are the go-to person when equipment stops working. A paper jam in the waiting room printer, a scanner that will not connect, a monitor that went dark — these happen every week, and your supervisor expects you to resolve them without calling IT for every minor issue.",
  },
  {
    moduleNumber: 7,
    moduleSlug: "module-7",
    title: "Cloud Storage & Collaboration",
    emoji: "☁️",
    description:
      "Use OneDrive, SharePoint, and Microsoft Teams to store, share, and collaborate on documents from anywhere — the way modern offices actually work.",
    lessons: module7Lessons,
    level: "Intermediate",
    estimatedMinutes: 70,
    whatYoullLearn: [
      "How cloud storage works and how to use OneDrive for professional file management",
      "How to share files and collaborate on documents with colleagues in real time",
      "How to use Microsoft Teams for messaging, video meetings, and file sharing",
      "How to apply cloud security practices that protect patient data and office files",
    ],
    scenario:
      "Lakeside Medical Associates has moved to Microsoft 365. Your supervisor expects you to store all documents in OneDrive, share meeting notes with the team through Teams, and co-author the weekly schedule with two other staff members simultaneously — all without creating duplicate files or losing any version history.",
  },
  {
    moduleNumber: 8,
    moduleSlug: "module-8",
    title: "Cybersecurity Fundamentals",
    emoji: "🔐",
    description:
      "Recognize digital threats, protect your accounts, and understand the data security responsibilities that every office professional must meet — especially in healthcare.",
    lessons: module8Lessons,
    level: "Intermediate",
    estimatedMinutes: 75,
    whatYoullLearn: [
      "How to recognize the most common cybersecurity threats targeting office workers",
      "How to create strong passwords and use multi-factor authentication",
      "How to identify phishing emails and social engineering attacks before falling for them",
      "How to handle patient data securely in compliance with HIPAA requirements",
    ],
    scenario:
      "Lakeside Medical Associates was nearly the victim of a phishing attack last year — a staff member almost clicked a fake invoice link that would have exposed patient records. Your supervisor has made cybersecurity awareness a priority for every new hire. This module ensures you can recognize threats, protect your accounts, and handle PHI in a way that keeps the practice safe.",
  },

  {
    moduleNumber: 9,
    moduleSlug: "module-9",
    title: "New Technology",
    emoji: "🛰️",
    description:
      "Trace how the internet and computing devices evolved, and use that history to evaluate whether a new technology is worth adopting.",
    lessons: module9Lessons,
    level: "Beginner",
    estimatedMinutes: 42,
    whatYoullLearn: [
      "The major stages in the development of the internet, and why its early design still shapes it",
      "The difference between the internet and the World Wide Web",
      "How computing devices evolved from mainframes to wearables, and the single trend behind it",
      "A four-question framework for evaluating any new technology before adopting it",
    ],
    scenario:
      "A colleague at Lakeside asks why email arrives unencrypted, why phishing works so well, and why the practice needs so many security add-ons for something that is supposed to just work. The honest answer is historical: the network was built by researchers who trusted each other, and security was never among its original requirements.",
  },

  {
    moduleNumber: 10,
    moduleSlug: "module-10",
    title: "Applications & the Internet of Things",
    emoji: "📡",
    description:
      "Understand how software is built and maintained, what makes a device smart, and how to design a small office network that keeps sensitive systems separate.",
    lessons: module10Lessons,
    level: "Intermediate",
    estimatedMinutes: 66,
    whatYoullLearn: [
      "The software development lifecycle, and why maintenance is where most of a program's life is spent",
      "The differences between native apps, web apps, and OEM software",
      "What the Internet of Things is, and the security problem these devices introduce",
      "How to design a segmented SOHO network for a small medical practice",
    ],
    scenario:
      "Lakeside Medical Associates is opening a second location needing eight workstations, staff and patient wireless, four IoT devices, and a link to the main office. The vendor has quoted a single flat network for everyone — a design that would put a patient's phone on the same network as the workstation holding patient records.",
  },
];
