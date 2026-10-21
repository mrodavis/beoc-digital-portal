import type { SimDefinition } from "@/types/sim";
import { cmd, doc, lakeside, select, typeAll } from "./lakeside";

/* Module 3: Teams and Channels */

export const teamsModule3Sims: Record<string, SimDefinition[]> = {
  "module-3::teams-and-channels": [
    {
      id: "teams-m3-teams-and-channels-1",
      app: "teams",
      title: "Join a team and use its channels",
      scenario:
        "Maria invited you to help the Patient Experience Committee, a team working on ideas that make visits smoother. Join the team, introduce yourself in the right place, share an idea in the right channel, and keep a private question private.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside()),
      tasks: [
        {
          instruction: "Join the team “Patient Experience Committee.”",
          hint: "At the top of the chat list, select the arrow next to New message (New items) › Join team. Find Patient Experience Committee and select Join team.",
          steps: [cmd("team.join", "t-pec", "discover", "Join the team from New items › Join team.")],
        },
        {
          instruction: "In the team's General channel, reply to Maria's welcome post: “Hi everyone, I'm Alex from the front office. I'd like to help with check-in ideas.”",
          hint: "Patient Experience Committee › General. Under Maria's post, select Reply, type, and press Enter.",
          steps: [typeAll("reply:m-p1", "Hi everyone, I'm Alex from the front office. I'd like to help with check-in ideas.", ["alex", "check-in ideas"])],
        },
        {
          instruction: "In the team's Ideas channel, start a post with the subject “Wait-time sign” and the message “A sign at check-in could show the current wait for each provider.”",
          hint: "Patient Experience Committee › Ideas › Start a post. Type the subject in Add a subject, type the message, and select Post (or press Enter).",
          steps: [typeAll("channel:ch-pec-ideas", "Subject: Wait-time sign\nA sign at check-in could show the current wait for each provider.", ["subject: wait-time sign", "current wait"])],
        },
        {
          instruction: "React to Omar's idea about texting patients with a Like.",
          hint: "In the Ideas channel, point to Omar's post and select 👍 Like.",
          steps: [cmd("msg.react", "Like", "msg:m-p2", "React to Omar's post in the Ideas channel.")],
        },
        {
          instruction: "You have a question only Maria should see: send her a chat, “Can I count committee meetings as work hours?”",
          hint: "Chat › Maria Santos. Type the question and press Enter. A private question goes in a chat, not a channel.",
          steps: [typeAll("chat:c-maria", "Can I count committee meetings as work hours?", ["committee meetings", "work hours"])],
        },
      ],
    },
    {
      id: "teams-m3-teams-and-channels-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Join the committee",
      scenario:
        "Join the Patient Experience Committee and take part the way a good team member does: introduce yourself, share an idea in the right channel, and support someone else's idea. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside()),
      tasks: [
        {
          instruction: "Join the team “Patient Experience Committee.”",
          hint: "New items (the arrow next to New message) › Join team › Join team on Patient Experience Committee.",
          steps: [cmd("team.join", "t-pec", "discover", "Join the team from New items › Join team.")],
        },
        {
          instruction: "Reply to Maria's welcome post in the team's General channel: “Hi all, Alex here from the front desk.”",
          hint: "Patient Experience Committee › General › Reply under Maria's post.",
          steps: [typeAll("reply:m-p1", "Hi all, Alex here from the front desk.", ["alex"])],
        },
        {
          instruction: "In the Ideas channel, start a post with the subject “Clipboard station” and the message “A self-serve clipboard station would shorten the check-in line.”",
          hint: "Ideas › Start a post › Add a subject, then the message › Post.",
          steps: [typeAll("channel:ch-pec-ideas", "Subject: Clipboard station\nA self-serve clipboard station would shorten the check-in line.", ["subject: clipboard station", "check-in line"])],
        },
        {
          instruction: "Reply to Omar's idea in the Ideas channel: “Great idea. Reminder texts could include a running-late notice.”",
          hint: "Ideas › Reply under Omar's post.",
          steps: [typeAll("reply:m-p2", "Great idea. Reminder texts could include a running-late notice.", ["running-late"])],
        },
      ],
    },
  ],

  "module-3::posts-and-replies": [
    {
      id: "teams-m3-posts-and-replies-1",
      app: "teams",
      title: "Post, reply, and announce in channels",
      scenario:
        "Today you share a fix with the front office, take some of Dr. Shah's reschedule calls, announce the flu shot clinic, and set notifications so you never miss a Scheduling post.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(lakeside({ start: { view: "chat", conv: "ch-fo-gen", tab: "posts" } })),
      tasks: [
        {
          instruction: "In the Front Office General channel, start a post with the subject “Printer fixed” and the message “The check-in label printer is working again. Luis replaced the roller.”",
          hint: "Front Office › General › Start a post. Type the subject in Add a subject, then the message, and select Post.",
          steps: [typeAll("channel:ch-fo-gen", "Subject: Printer fixed\nThe check-in label printer is working again. Luis replaced the roller.", ["subject: printer fixed", "label printer"])],
        },
        {
          instruction: "In the Scheduling channel, reply to Maria's post about Dr. Shah and @mention Omar Haddad: “@Omar Haddad I'll call the 2:30 and 3:00 patients.”",
          hint: "Front Office › Scheduling. Under Maria's post, select Reply. Type @Om, pick Omar Haddad, type the rest, and press Enter.",
          steps: [typeAll("reply:m-s1", "@Omar Haddad I'll call the 2:30 and 3:00 patients.", ["@omar haddad", "2:30", "3:00"])],
        },
        {
          instruction: "In the Front Office General channel, post an announcement with the headline “Flu Shot Clinic Saturday” and the message “Staff flu shots are 9:00 AM to noon in Room 5.”",
          hint: "Front Office › General › Start a post. Change Post type to Announcement, type the headline, then the message, and select Post.",
          steps: [typeAll("channel:ch-fo-gen", "Headline: Flu Shot Clinic Saturday\nStaff flu shots are 9:00 AM to noon in Room 5.", ["headline: flu shot clinic saturday", "room 5"])],
        },
        {
          instruction: "Acknowledge Omar's post about the updated intake packet with a Like.",
          hint: "Front Office › Scheduling. Point to Omar's post and select 👍 Like.",
          steps: [cmd("msg.react", "Like", "msg:m-s2", "React to Omar's post in the Scheduling channel.")],
        },
        {
          instruction: "Set the Scheduling channel to notify you about all activity.",
          hint: "Point to Scheduling › More options (…) › Channel notifications › All activity.",
          steps: [cmd("channel.notifications", "All activity", "channel:ch-sched", "Change the notifications for the Scheduling channel.")],
        },
      ],
    },
    {
      id: "teams-m3-posts-and-replies-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Keep the team informed",
      scenario:
        "Post an update, answer a teammate in the thread, announce an event, and set your channel notifications. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(lakeside({ start: { view: "chat", conv: "ch-billing", tab: "posts" } })),
      tasks: [
        {
          instruction: "In the Billing Questions channel, start a post with the subject “Card reader” and the message “The card reader at window 2 is offline. Use window 1 for copays today.”",
          hint: "Front Office › Billing Questions › Start a post › Add a subject, then the message › Post.",
          steps: [typeAll("channel:ch-billing", "Subject: Card reader\nThe card reader at window 2 is offline. Use window 1 for copays today.", ["subject: card reader", "window 1"])],
        },
        {
          instruction: "In the Scheduling channel, reply to Omar's post about the intake packet and @mention him: “@Omar Haddad The packet looks complete. Thanks!”",
          hint: "Front Office › Scheduling › Reply under Omar's post. Type @Om and pick Omar Haddad.",
          steps: [typeAll("reply:m-s2", "@Omar Haddad The packet looks complete. Thanks!", ["@omar haddad", "packet"])],
        },
        {
          instruction: "In the Front Office General channel, post an announcement with the headline “New Check-In Hours” and the message “Check-in opens at 7:30 AM starting Monday.”",
          hint: "Front Office › General › Start a post › Post type: Announcement › headline, then message › Post.",
          steps: [typeAll("channel:ch-fo-gen", "Headline: New Check-In Hours\nCheck-in opens at 7:30 AM starting Monday.", ["headline: new check-in hours", "7:30"])],
        },
        {
          instruction: "Turn off notifications for the Staff Events channel.",
          hint: "Point to Staff Events › More options (…) › Channel notifications › Off.",
          steps: [cmd("channel.notifications", "Off", "channel:ch-events", "Change the notifications for the Staff Events channel.")],
        },
        {
          instruction: "Pin the Billing Questions channel.",
          hint: "Point to Billing Questions › More options (…) › Pin.",
          steps: [cmd("channel.pin", undefined, "channel:ch-billing", "Pin the Billing Questions channel.")],
        },
      ],
    },
  ],

  "module-3::shared-tab-and-tabs": [
    {
      id: "teams-m3-shared-tab-and-tabs-1",
      app: "teams",
      title: "Work with the Shared tab and channel tabs",
      scenario:
        "The Scheduling channel's files are getting hard to find. Add the holiday schedule where the team can reach it, keep the intake packet at the top, copy a link for Maria, and add a Planner tab for the team's scheduling tasks.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(lakeside({ start: { view: "chat", conv: "ch-sched", tab: "posts" } })),
      tasks: [
        {
          instruction: "Open the Shared tab of the Scheduling channel.",
          hint: "Front Office › Scheduling › Shared (at the top of the channel).",
          steps: [select("files:ch-sched")],
        },
        {
          instruction: "Upload “Holiday Coverage Schedule.xlsx” from your device to the Scheduling channel's Shared tab.",
          hint: "On the Shared tab, select Upload › Files. Choose Holiday Coverage Schedule.xlsx and select Open.",
          steps: [cmd("files.upload", "Holiday Coverage Schedule.xlsx", "files:ch-sched", "Upload it on the Scheduling channel's Shared tab.")],
        },
        {
          instruction: "Pin “New Patient Intake Packet.pdf” to the top of the list.",
          hint: "Point to New Patient Intake Packet.pdf › More options (…) › Pin to top.",
          steps: [cmd("files.pin", undefined, "file:f-intake", "Pin New Patient Intake Packet.pdf.")],
        },
        {
          instruction: "Copy a link to “Provider Schedule - November.xlsx.”",
          hint: "Point to Provider Schedule - November.xlsx › More options (…) › Copy link.",
          steps: [cmd("files.copyLink", undefined, "file:f-sched", "Copy the link to Provider Schedule - November.xlsx.")],
        },
        {
          instruction: "Open “Provider Schedule - November.xlsx” to check it.",
          hint: "Select the file name on the Shared tab.",
          judgeFree: true,
          steps: [cmd("files.open", "f-sched", "file:f-sched", "Open Provider Schedule - November.xlsx.")],
        },
        {
          instruction: "Close the file. Add a Planner tab to the Scheduling channel.",
          hint: "Select Close. At the top of the channel, select Add a tab (+) › Planner › Add.",
          steps: [cmd("tab.add", "Planner", ["channel:ch-sched", "files:ch-sched"], "Add the tab to the Scheduling channel.")],
        },
      ],
    },
    {
      id: "teams-m3-shared-tab-and-tabs-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Organize a channel's files",
      scenario:
        "Put the flu clinic flyer where the whole front office can find it, make it easy to share, and add a tab the billing team asked for. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ start: { view: "chat", conv: "ch-fo-gen", tab: "posts" } })),
      tasks: [
        {
          instruction: "Upload “Flu Clinic Flyer.pdf” to the Shared tab of the Front Office General channel.",
          hint: "Front Office › General › Shared › Upload › Files › Flu Clinic Flyer.pdf › Open.",
          steps: [cmd("files.upload", "Flu Clinic Flyer.pdf", "files:ch-fo-gen", "Upload it on the General channel's Shared tab.")],
        },
        {
          instruction: "Pin “Flu Clinic Flyer.pdf” to the top.",
          hint: "Point to Flu Clinic Flyer.pdf › More options (…) › Pin to top.",
          steps: [cmd("files.pin", undefined, "file:flu-clinic-flyer-pdf", "Pin Flu Clinic Flyer.pdf.")],
        },
        {
          instruction: "Copy a link to “Flu Clinic Flyer.pdf.”",
          hint: "Point to Flu Clinic Flyer.pdf › More options (…) › Copy link.",
          steps: [cmd("files.copyLink", undefined, "file:flu-clinic-flyer-pdf", "Copy the link to Flu Clinic Flyer.pdf.")],
        },
        {
          instruction: "Open “Copay Quick Reference.pdf” on the Billing Questions channel's Shared tab.",
          hint: "Front Office › Billing Questions › Shared › Copay Quick Reference.pdf.",
          judgeFree: true,
          steps: [cmd("files.open", "f-copay", "file:f-copay", "Open Copay Quick Reference.pdf.")],
        },
        {
          instruction: "Close the file. Add a Lists tab to the Billing Questions channel.",
          hint: "Select Close. Billing Questions › Add a tab (+) › Lists › Add.",
          steps: [cmd("tab.add", "Lists", ["channel:ch-billing", "files:ch-billing"], "Add the tab to the Billing Questions channel.")],
        },
      ],
    },
  ],
};
