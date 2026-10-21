import type { GoogleWorkspaceModule } from "./modules";
import { gwModule5Lessons } from "./module5Lessons";
import { gwModule6Lessons } from "./module6Lessons";
import { gwModule7Lessons } from "./module7Lessons";

/**
 * Modules 5-8 (Google Slides, Gmail, Google Calendar & Meet, Working Together).
 * Same scenario as modules 1-4: Jordan Lee, office assistant at Parkview Property
 * Management (lib/sims/google-workspace/people.ts).
 */
export const mailModules: GoogleWorkspaceModule[] = [
  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "Google Slides",
    emoji: "🖼️",
    description:
      "Build a clear presentation in Google Slides: themes and layouts, pictures and backgrounds, gentle motion and speaker notes, then present it, share it, and download PowerPoint and PDF copies.",
    lessons: gwModule5Lessons,
    level: "Beginner",
    estimatedMinutes: 80,
    whatYoullLearn: [
      "How to create and name a presentation, apply a theme, and add slides with the right layouts",
      "How to insert and replace pictures, add shapes, change backgrounds, and organize slides",
      "How to add transitions and animations that help the audience, and write speaker notes",
      "How to skip slides, present with presenter view or in Google Meet, share at the right access level, and download .pptx and PDF copies",
    ],
    scenario:
      "Denise Carter wants a welcome presentation for new tenants at Riverside Commons: it plays on the lobby screen, she presents it at orientation, and new tenants get a copy by email. You build it in Google Slides from a blank file to the finished, shared presentation.",
  },
  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "Gmail",
    emoji: "✉️",
    description:
      "Run a work inbox in Gmail: sort and clean up mail, write and reply with the right recipients and files, schedule and protect messages, organize with labels and filters, and stay safe from phishing.",
    lessons: gwModule6Lessons,
    level: "Beginner",
    estimatedMinutes: 115,
    whatYoullLearn: [
      "The parts of Gmail, inbox tabs, stars, importance markers, and when to archive or delete",
      "How to use To, Cc, and Bcc, choose Reply, Reply all, or Forward, and send attachments or Drive links",
      "How to undo and schedule messages, use confidential mode, and set up a signature and vacation responder",
      "How labels, search operators, filters, and Snooze keep a busy inbox under control",
      "How to spot phishing, report spam and phishing, and rescue real mail from Spam",
    ],
    scenario:
      "Parkview's office mailbox is now yours. Coworkers, tenants, the building owner, vendors, and a few scammers all write to you. Denise Carter wants every message answered by the right person with the right files, vendor mail organized without anyone sorting it by hand, and nothing dangerous clicked.",
  },
  {
    moduleNumber: 7,
    moduleSlug: "module-7",
    title: "Google Calendar & Google Meet",
    emoji: "📅",
    description:
      "Plan the office's week in Google Calendar, invite people at times they're free, share calendars and booking pages, and take part in Google Meet calls with confidence.",
    lessons: gwModule7Lessons,
    level: "Beginner",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "How to create events and tasks, add notifications, and use separate calendars",
      "How to invite guests, use Find a time, add Google Meet, answer invitations, and work across time zones",
      "How to share a calendar at the right permission level and set up an appointment schedule",
      "How to join Meet calls, check your microphone and camera, use captions, chat, reactions and raise hand, and present a tab safely",
    ],
    scenario:
      "Parkview runs on schedules: inspections at Riverside Commons, showings at Elm Street Apartments, owner calls, and the weekly leasing huddle on Google Meet. Denise Carter asks you to keep the calendars accurate and shared with the right people, book meetings at times that work for everyone, and run your part of each call smoothly.",
  },
];
