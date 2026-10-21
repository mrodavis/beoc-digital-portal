import type { SimDefinition } from "@/types/sim";
import type { TeamsEvent } from "@/components/sim/apps/teams/types";
import { TODAY, cmd, doc, lakeside, select, typeAll, withMention } from "./lakeside";

/* Module 1: Getting Started with Microsoft Teams */

const EVENTS: TeamsEvent[] = [
  { id: "e-huddle", title: "Front Office Huddle", day: TODAY, start: "9:45 AM", end: "10:00 AM", organizer: "p-maria", attendees: ["me", "p-omar", "p-jen", "p-tasha"], participants: ["p-maria", "p-omar"], response: "Accepted", details: "1. Today's schedule\n2. Friday coverage\n3. Questions" },
  { id: "e-orient", title: "New Staff Orientation", day: "2026-10-22", start: "10:00 AM", end: "11:00 AM", organizer: "p-renee", attendees: ["me", "p-jen"], details: "Badges, Teams, and privacy basics." },
  { id: "e-lunch", title: "Lunch coverage", day: TODAY, start: "12:00 PM", end: "1:00 PM", organizer: "me", attendees: [], online: false, location: "Check-in window", youOrganize: true },
];

export const teamsModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::teams-at-work": [
    {
      id: "teams-m1-teams-at-work-1",
      app: "teams",
      title: "Your first look around Teams",
      scenario:
        "It is your first morning as a front office assistant at Lakeside Medical Associates, and the office runs on Microsoft Teams. Find the message waiting for you, answer it in the right place, and learn where chats, channels, your calendar, and your files live.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(withMention(lakeside({ events: EVENTS, start: { view: "chat", conv: "c-maria" } }))),
      tasks: [
        {
          instruction: "Open your Activity feed and open Maria Santos's @mention.",
          hint: "Select Activity (the bell) on the app bar at the left. Then select Maria Santos's mention in the list.",
          steps: [select("activity:a1")],
        },
        {
          instruction: "Maria asked her question in the Scheduling channel. Reply in that post's thread: “Yes, I'm covering the front desk Friday from 1:00 to 5:00 PM.”",
          hint: "Under Maria's post, select Reply. Type the message and press Enter.",
          steps: [typeAll("reply:m-s3", "Yes, I'm covering the front desk Friday from 1:00 to 5:00 PM.", ["friday", "1:00 to 5:00"])],
        },
        {
          instruction: "Open your one-on-one chat with Tasha Greene.",
          hint: "Select Chat on the app bar. Under Chats, select Tasha Greene.",
          steps: [select("chat:c-tasha")],
        },
        {
          instruction: "Open the General channel of the Lakeside All Staff team.",
          hint: "In Chat, scroll to Teams and channels. Under Lakeside All Staff, select General.",
          steps: [select("channel:ch-all-gen")],
        },
        {
          instruction: "Open your Calendar and open the event “Front Office Huddle.”",
          hint: "Select Calendar on the app bar. Select Front Office Huddle (today at 9:45 AM).",
          steps: [select("event:e-huddle")],
        },
        {
          instruction: "Open OneDrive and open the file “Front Desk Procedures.docx.”",
          hint: "Select OneDrive on the app bar. In My files, select Front Desk Procedures.docx.",
          judgeFree: true,
          steps: [cmd("files.open", "f-proc", "file:f-proc", "Open Front Desk Procedures.docx from OneDrive.")],
        },
      ],
    },
    {
      id: "teams-m1-teams-at-work-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Teams orientation checklist",
      scenario:
        "Maria Santos gave every new hire the same orientation checklist for Teams. Work through it in Lakeside's Teams. When you finish, print or save your results page and submit it.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(withMention(lakeside({ events: EVENTS, start: { view: "chat", conv: "c-tasha" } }))),
      tasks: [
        {
          instruction: "Open Activity and open the newest notification.",
          hint: "Select Activity on the app bar, then select the first item (Maria Santos's mention).",
          steps: [select("activity:a1")],
        },
        {
          instruction: "In the Front Office team's General channel, reply to Maria's welcome post: “Hi everyone, I'm Alex, the new front office assistant.”",
          hint: "Chat › Teams and channels › Front Office › General. Under Maria's post, select Reply, type, and press Enter.",
          steps: [typeAll("reply:m-fo1", "Hi everyone, I'm Alex, the new front office assistant.", ["alex", "front office assistant"])],
        },
        {
          instruction: "Open your chat with Maria Santos and send: “Thanks, Maria. I'll see you at the huddle.”",
          hint: "Chat › Maria Santos. Type in the message box and press Enter.",
          steps: [typeAll("chat:c-maria", "Thanks, Maria. I'll see you at the huddle.", ["huddle"])],
        },
        {
          instruction: "Accept the invitation “New Staff Orientation.”",
          hint: "Calendar › Thursday › New Staff Orientation › Accept.",
          steps: [cmd("event.rsvp", "Accept", "event:e-orient", "Respond to the New Staff Orientation invitation.")],
        },
        {
          instruction: "Open “New Hire Checklist.docx” from OneDrive.",
          hint: "OneDrive › My files › New Hire Checklist.docx.",
          judgeFree: true,
          steps: [cmd("files.open", "f-hire", "file:f-hire", "Open New Hire Checklist.docx from OneDrive.")],
        },
      ],
    },
  ],

  "module-1::find-your-way-around": [
    {
      id: "teams-m1-find-your-way-around-1",
      app: "teams",
      title: "Find your way around the Teams window",
      scenario:
        "Maria asked you to get comfortable with the Teams window before your first busy morning. Use Search, find channels, put the conversations you use most in Favorites, and try both ways Teams can arrange chats and channels.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ events: EVENTS })),
      tasks: [
        {
          instruction: "Use Search to find Kevin Patel and open your chat with him.",
          hint: "Select the Search box at the top (or press Ctrl+E), type Kevin, and select Kevin Patel.",
          steps: [select("chat:c-kevin")],
        },
        {
          instruction: "Open the Safety and Compliance channel in the Lakeside All Staff team.",
          hint: "In Chat, under Teams and channels › Lakeside All Staff, select Safety and Compliance.",
          steps: [select("channel:ch-safety")],
        },
        {
          instruction: "Pin the Scheduling channel so it appears in Favorites.",
          hint: "Point to Scheduling (under Front Office), select More options (…) › Pin.",
          steps: [cmd("channel.pin", undefined, "channel:ch-sched", "Pin the Scheduling channel in the Front Office team.")],
        },
        {
          instruction: "Pin your chat with Maria Santos.",
          hint: "Point to Maria Santos in the chat list, select More options (…) › Pin.",
          steps: [cmd("chat.pin", undefined, "chat:c-maria", "Pin your chat with Maria Santos.")],
        },
        {
          instruction: "Change the view to Separate so teams and channels get their own Teams button.",
          hint: "At the top of the chat list, select More list options (…) › Customize view, then select Separate. (Or Settings and more › Settings › Chats and channels.)",
          steps: [cmd("settings.layout", "Separate", "settings", "Change the view in Settings › Chats and channels.")],
        },
        {
          instruction: "Close Settings. Use the new Teams button to open the Billing Questions channel.",
          hint: "Select the back arrow next to Settings. Select Teams on the app bar, then Front Office › Billing Questions.",
          steps: [select("channel:ch-billing")],
        },
        {
          instruction: "Switch back to the Combined view, the Teams default.",
          hint: "Settings and more (…) next to your picture › Settings › Chats and channels › Combined.",
          steps: [cmd("settings.layout", "Combined", "settings", "Change the view in Settings › Chats and channels.")],
        },
      ],
    },
    {
      id: "teams-m1-find-your-way-around-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Set up your Teams workspace",
      scenario:
        "Set up Teams the way an organized front office assistant would: the conversations you use every day within reach, a noisy chat quieted, and a quick way to find any channel. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ events: EVENTS })),
      tasks: [
        {
          instruction: "Pin the Scheduling channel.",
          hint: "Point to Scheduling under Front Office › More options (…) › Pin.",
          steps: [cmd("channel.pin", undefined, "channel:ch-sched", "Pin the Scheduling channel.")],
        },
        {
          instruction: "Pin your chat with Maria Santos.",
          hint: "Point to Maria Santos › More options (…) › Pin.",
          steps: [cmd("chat.pin", undefined, "chat:c-maria", "Pin your chat with Maria Santos.")],
        },
        {
          instruction: "Mute the group chat “Front Desk Lunch Orders.”",
          hint: "Point to Front Desk Lunch Orders › More options (…) › Mute.",
          steps: [cmd("chat.mute", undefined, "chat:c-lunch", "Mute the Front Desk Lunch Orders chat.")],
        },
        {
          instruction: "Use Search to open the Billing Questions channel.",
          hint: "Select Search (Ctrl+E), type Billing, and select Billing Questions.",
          steps: [select("channel:ch-billing")],
        },
        {
          instruction: "Switch to the Separate view.",
          hint: "More list options (…) at the top of the chat list › Customize view › Separate.",
          steps: [cmd("settings.layout", "Separate", "settings", "Change the view in Settings › Chats and channels.")],
        },
        {
          instruction: "Switch back to the Combined view.",
          hint: "Settings › Chats and channels › Combined.",
          steps: [cmd("settings.layout", "Combined", "settings", "Change the view in Settings › Chats and channels.")],
        },
      ],
    },
  ],

  "module-1::status-and-presence": [
    {
      id: "teams-m1-status-and-presence-1",
      app: "teams",
      title: "Let people know when you are available",
      scenario:
        "You are covering the check-in window this morning and have privacy training after that. Set your status and a status message so coworkers know when to expect an answer and who to call for something urgent.",
      fileName: "Microsoft Teams",
      minutes: 4,
      initial: doc(lakeside({ events: EVENTS })),
      tasks: [
        {
          instruction: "Set your status to Busy.",
          hint: "Select your picture at the top right › select your current status (Available) › Busy.",
          steps: [cmd("status.set", "Busy", "status", "Change your status from your picture at the top right.")],
        },
        {
          instruction: "Set the status message “Covering the check-in window until 1:00 PM. For urgent schedule changes, call ext. 210.” Clear it after Today.",
          hint: "Select your picture › Set status message. Type the message, choose Today under Clear status message after, and select Done.",
          steps: [typeAll("status", "Status message: Covering the check-in window until 1:00 PM. For urgent schedule changes, call ext. 210.\nClear after: Today\nShow when people message me: Yes", ["check-in window", "ext. 210", "clear after: today"])],
        },
        {
          instruction: "Privacy training is starting. Set your status to Do not disturb.",
          hint: "Your picture › your status › Do not disturb.",
          steps: [cmd("status.set", "Do not disturb", "status", "Change your status from your picture at the top right.")],
        },
        {
          instruction: "Training is over. Reset your status so Teams sets it automatically again.",
          hint: "Your picture › your status › Reset status.",
          steps: [cmd("status.set", "Reset status", "status", "Reset your status from your picture at the top right.")],
        },
        {
          instruction: "Your check-in shift is over. Clear your status message.",
          hint: "Your picture › Edit status message › Clear status message.",
          steps: [cmd("status.clearMessage", undefined, "status", "Clear the status message from your picture at the top right.")],
        },
      ],
    },
    {
      id: "teams-m1-status-and-presence-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Status for a lunch break",
      scenario:
        "You are stepping away for lunch and Omar is covering the check-in window. Set up your status so nobody waits on you, then put everything back when you return. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 4,
      initial: doc(lakeside({ events: EVENTS })),
      tasks: [
        {
          instruction: "Set your status to Be right back.",
          hint: "Your picture › your status › Be right back.",
          steps: [cmd("status.set", "Be right back", "status", "Change your status from your picture at the top right.")],
        },
        {
          instruction: "Set the status message “At lunch until 1:00 PM. Omar Haddad is covering check-in.” Show it when people message you, and clear it after 1 hour.",
          hint: "Your picture › Set status message. Type the message, keep Show when people message me checked, choose 1 hour, and select Done.",
          steps: [typeAll("status", "Status message: At lunch until 1:00 PM. Omar Haddad is covering check-in.\nClear after: 1 hour\nShow when people message me: Yes", ["at lunch", "omar", "clear after: 1 hour", "show when people message me: yes"])],
        },
        {
          instruction: "You are back. Set your status to Available.",
          hint: "Your picture › your status › Available.",
          steps: [cmd("status.set", "Available", "status", "Change your status from your picture at the top right.")],
        },
        {
          instruction: "Clear your status message.",
          hint: "Your picture › Edit status message › Clear status message.",
          steps: [cmd("status.clearMessage", undefined, "status", "Clear the status message from your picture.")],
        },
      ],
    },
  ],

  "module-1::notifications-and-settings": [
    {
      id: "teams-m1-notifications-and-settings-1",
      app: "teams",
      title: "Tune your notifications and set up your headset",
      scenario:
        "Your first week in Teams is noisy: the lunch chat pings all morning and every staff-event post pops up a banner. Keep the alerts that matter for your job, quiet the rest, and get your new headset ready for calls.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ events: EVENTS })),
      tasks: [
        {
          instruction: "Mute the group chat “Front Desk Lunch Orders.”",
          hint: "Point to Front Desk Lunch Orders in the chat list › More options (…) › Mute.",
          steps: [cmd("chat.mute", undefined, "chat:c-lunch", "Mute the Front Desk Lunch Orders chat.")],
        },
        {
          instruction: "Turn off notifications for the Staff Events channel.",
          hint: "Point to Staff Events (under Lakeside All Staff) › More options (…) › Channel notifications › Off.",
          steps: [cmd("channel.notifications", "Off", "channel:ch-events", "Change the notifications for the Staff Events channel.")],
        },
        {
          instruction: "Set the Scheduling channel to notify you about all activity.",
          hint: "Point to Scheduling › More options (…) › Channel notifications › All activity.",
          steps: [cmd("channel.notifications", "All activity", "channel:ch-sched", "Change the notifications for the Scheduling channel.")],
        },
        {
          instruction: "In Settings, turn off notifications for reactions to your messages.",
          hint: "Settings and more (…) next to your picture › Settings › Notifications and activity. Set Reactions to my messages to Off.",
          steps: [cmd("settings.notify", "Reactions to my messages=Off", "settings", "Change it in Settings › Notifications and activity.")],
        },
        {
          instruction: "In Settings › Devices, set your speaker to “Headset Earphone (Jabra Evolve2 40)” and your microphone to “Headset Microphone (Jabra Evolve2 40).”",
          hint: "Settings › Devices. Choose the headset in the Speaker list and in the Microphone list.",
          anyOrder: true,
          steps: [
            cmd("av.speaker", "Headset Earphone (Jabra Evolve2 40)", "settings", "Choose the speaker in Settings › Devices."),
            cmd("av.microphone", "Headset Microphone (Jabra Evolve2 40)", "settings", "Choose the microphone in Settings › Devices."),
          ],
        },
        {
          instruction: "Make a test call to check the headset.",
          hint: "Settings › Devices › Make a test call.",
          steps: [cmd("settings.testCall", undefined, "settings", "Make the test call from Settings › Devices.")],
        },
      ],
    },
    {
      id: "teams-m1-notifications-and-settings-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: A notification plan for the front desk",
      scenario:
        "Put your notification plan into practice in Lakeside's Teams: quiet what you do not need, keep what you do, and make sure your headset works before your first call. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ events: EVENTS })),
      tasks: [
        {
          instruction: "Turn off notifications for the Staff Events channel.",
          hint: "Point to Staff Events › More options (…) › Channel notifications › Off.",
          steps: [cmd("channel.notifications", "Off", "channel:ch-events", "Change the notifications for the Staff Events channel.")],
        },
        {
          instruction: "In Settings › Notifications and activity, turn off notifications for reactions to your messages.",
          hint: "Settings and more (…) › Settings › Notifications and activity › Reactions to my messages › Off.",
          steps: [cmd("settings.notify", "Reactions to my messages=Off", "settings", "Change it in Settings › Notifications and activity.")],
        },
        {
          instruction: "Set meeting chat notifications to Activity feed only.",
          hint: "Settings › Notifications and activity › Meeting chat › Activity feed only.",
          steps: [cmd("settings.notify", "Meeting chat=Activity feed only", "settings", "Change it in Settings › Notifications and activity.")],
        },
        {
          instruction: "Set your speaker and microphone to the Jabra Evolve2 40 headset.",
          hint: "Settings › Devices. Choose Headset Earphone (Jabra Evolve2 40) and Headset Microphone (Jabra Evolve2 40).",
          anyOrder: true,
          steps: [
            cmd("av.speaker", "Headset Earphone (Jabra Evolve2 40)", "settings", "Choose the speaker in Settings › Devices."),
            cmd("av.microphone", "Headset Microphone (Jabra Evolve2 40)", "settings", "Choose the microphone in Settings › Devices."),
          ],
        },
        {
          instruction: "Make a test call.",
          hint: "Settings › Devices › Make a test call.",
          steps: [cmd("settings.testCall", undefined, "settings", "Make the test call from Settings › Devices.")],
        },
      ],
    },
  ],
};
