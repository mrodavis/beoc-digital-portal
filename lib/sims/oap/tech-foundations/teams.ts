import type { SimDefinition } from "@/types/sim";
import { teamsDoc, typeAll, type TeamsDoc } from "@/components/sim/apps/teams/types";

/** tech-foundations sims that run in the teams engine. Keys are "<moduleSlug>::<lessonSlug>". */

const TODAY = "2026-10-20";

/* Northbeam Logistics (work track) */
function northbeam(extra: Partial<TeamsDoc>): TeamsDoc {
  return {
    org: "Northbeam Logistics",
    today: TODAY,
    now: "10:02 AM",
    me: { name: "Jordan Rivera", title: "Operations Assistant", email: "jordan.rivera@northbeam.example", presence: "Available" },
    people: [
      { id: "p-dana", name: "Dana Whitfield", title: "Operations Manager", presence: "Available" },
      { id: "p-luis", name: "Luis Ortega", title: "Dispatch Coordinator", presence: "Busy" },
      { id: "p-sam", name: "Sam Okoro", title: "Warehouse Lead", presence: "Available" },
      { id: "p-mei", name: "Mei Chen", title: "Billing Specialist", presence: "Away" },
      { id: "p-priya", name: "Priya Raman", title: "Account Manager, Crestline Office Supply", presence: "Available" },
    ],
    chats: [
      {
        id: "c-dana",
        members: ["p-dana"],
        messages: [
          { id: "m-d1", from: "p-dana", time: "9:41 AM", text: "Morning! Please join the huddle on time today. We're reviewing the Q4 delivery schedule, so have it open." },
          { id: "m-d2", from: "me", time: "9:44 AM", text: "Will do. I'll test my headset first." },
        ],
      },
      { id: "c-luis", members: ["p-luis"], messages: [{ id: "m-l1", from: "p-luis", time: "Yesterday", text: "Thanks for updating the route sheet." }] },
    ],
    teams: [
      {
        id: "t-ops",
        name: "Northbeam Operations",
        color: "#0f6cbd",
        channels: [
          { id: "ch-gen", name: "General", posts: [{ id: "m-g1", from: "p-dana", time: "Mon 8:30 AM", text: "Reminder: weekly huddle every Tuesday at 10:30 AM.", replies: [] }] },
          { id: "ch-dispatch", name: "Dispatch", posts: [{ id: "m-x1", from: "p-luis", time: "Mon 2:15 PM", text: "Two trucks are out for maintenance on Thursday.", replies: [] }] },
        ],
      },
    ],
    files: [
      { id: "f-sched", name: "Q4 Delivery Schedule.xlsx", folder: "root", modified: "Yesterday", modifiedBy: "Jordan Rivera", preview: "Week, Route, Driver, Truck, Stops" },
      { id: "f-score", name: "Vendor Scorecard Q3.pptx", folder: "root", modified: "Oct 16", modifiedBy: "Jordan Rivera", preview: "Crestline Office Supply: on-time delivery 96%, invoice accuracy 98%." },
    ],
    devices: {
      speakers: ["Speakers (Realtek(R) Audio)", "Headset Earphone (Jabra Evolve2 40)", "Monitor speakers (DELL P2422H)"],
      microphones: ["Microphone Array (Realtek(R) Audio)", "Headset Microphone (Jabra Evolve2 40)"],
      cameras: ["Integrated Webcam", "Logitech C920 HD Pro Webcam"],
      speaker: "Speakers (Realtek(R) Audio)",
      microphone: "Microphone Array (Realtek(R) Audio)",
      camera: "Integrated Webcam",
      noise: "Auto",
    },
    av: { camera: true, mic: true },
    windows: ["Q4 Delivery Schedule.xlsx - Excel", "Inbox - Jordan Rivera - Outlook", "Driver Handbook.docx - Word", "Microsoft Edge"],
    ...extra,
  };
}

/* Kestrel Point Community College (school track) */
function kestrel(extra: Partial<TeamsDoc>): TeamsDoc {
  return {
    org: "Kestrel Point Community College",
    today: TODAY,
    now: "10:02 AM",
    me: { name: "Jordan Rivera", title: "Student Services Assistant", email: "jrivera@kestrelpoint.example", presence: "Available" },
    people: [
      { id: "p-tasha", name: "Tasha Greene", title: "Student Services Supervisor", presence: "Available" },
      { id: "p-alvarez", name: "Elena Alvarez", title: "Business Faculty", presence: "Busy" },
      { id: "p-marcus", name: "Marcus Hill", title: "Front Desk Associate", presence: "Available" },
      { id: "p-nia", name: "Nia Brooks", title: "Advising Coordinator", presence: "Available" },
      { id: "p-omar", name: "Omar Haddad", title: "IT Support", presence: "Be right back" },
    ],
    chats: [
      { id: "c-omar", members: ["p-omar"], unread: true, messages: [{ id: "m-o1", from: "p-omar", time: "9:50 AM", text: "Your replacement laptop is ready for pickup in room B-114." }] },
      {
        id: "c-nia",
        members: ["p-nia"],
        messages: [
          { id: "m-n1", from: "p-nia", time: "Yesterday", text: "Can you send me the walk-in count for Monday?" },
          { id: "m-n2", from: "me", time: "Yesterday", text: "Sure. We had 42 walk-ins on Monday." },
        ],
      },
    ],
    teams: [
      {
        id: "t-ss",
        name: "Student Services",
        color: "#8764b8",
        channels: [
          { id: "ch-gen", name: "General", posts: [{ id: "m-g1", from: "p-tasha", time: "Mon 8:05 AM", text: "Welcome to the fall term, everyone. Please keep front desk questions in the Front Desk channel.", replies: [] }] },
          {
            id: "ch-fd",
            name: "Front Desk",
            unread: true,
            posts: [
              { id: "m-a2", from: "p-marcus", time: "8:47 AM", text: "The new walk-in sign-in sheet is in the Files tab. Let me know if anything is missing.", replies: [] },
              { id: "m-a1", from: "p-alvarez", time: "9:12 AM", text: "@Jordan Rivera can you cover the front desk this Thursday from 1:00 to 3:00 PM while I'm at the faculty meeting?", replies: [] },
            ],
          },
          { id: "ch-ann", name: "Announcements", posts: [{ id: "m-an1", from: "p-tasha", time: "Oct 15", text: "Fall orientation is on **Friday, October 30**. Details to follow.", replies: [] }] },
        ],
      },
    ],
    files: [
      { id: "f-signin", name: "Walk-In Sign-In Sheet.docx", folder: "ch:ch-fd", modified: "Today", modifiedBy: "Marcus Hill", preview: "Date, Student name, Student ID, Reason for visit, Time in" },
      { id: "f-phones", name: "Front Desk Phone List.xlsx", folder: "ch:ch-fd", modified: "Oct 2", modifiedBy: "Tasha Greene" },
      { id: "f-proc", name: "Walk-In Procedures.docx", folder: "root", modified: "Oct 14", modifiedBy: "Jordan Rivera", preview: "1. Greet the student. 2. Ask them to sign in. 3. Check the advising calendar." },
    ],
    localFiles: [
      { name: "Front Desk Schedule - Fall.xlsx", size: "24 KB" },
      { name: "Orientation Flyer.pdf", size: "310 KB" },
      { name: "Room Map.png", size: "1.2 MB" },
    ],
    activity: [
      { id: "a1", kind: "mention", from: "p-alvarez", text: "Mentioned you: can you cover the front desk this Thursday…", where: "Student Services > Front Desk", time: "9:12 AM", target: "m-a1", unread: true },
      { id: "a2", kind: "reply", from: "p-nia", text: "Thanks for the walk-in count!", where: "Chat with Nia Brooks", time: "Yesterday", target: "m-n2" },
    ],
    devices: {
      speakers: ["Speakers (Realtek(R) Audio)", "Headphones (Logitech H390)"],
      microphones: ["Microphone Array (Realtek(R) Audio)", "Headset Microphone (Logitech H390)"],
      cameras: ["Integrated Webcam"],
      speaker: "Headphones (Logitech H390)",
      microphone: "Headset Microphone (Logitech H390)",
      camera: "Integrated Webcam",
      noise: "Auto",
    },
    windows: ["Front Desk Schedule - Fall.xlsx - Excel", "Walk-In Procedures.docx - Word", "Microsoft Edge"],
    ...extra,
  };
}

export const teamsSims: Record<string, SimDefinition[]> = {
  /* ---------------------------------------------------------------- */
  /* Module 6: Video Conferencing Setup and Professional Use           */
  /* ---------------------------------------------------------------- */
  "module-6::video-conferencing": [
    {
      id: "tf-m6-video-conferencing-1",
      app: "teams",
      title: "Set up your headset and join the weekly huddle",
      scenario:
        "You are the operations assistant at Northbeam Logistics. The weekly huddle starts in a few minutes on Microsoft Teams, and you just plugged in a headset. Set it up, test it, join with a clean background and your microphone muted, and share only the delivery schedule when your manager asks.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: teamsDoc(
        northbeam({
          start: { view: "calendar" },
          events: [
            { id: "e1", title: "Weekly Operations Huddle", day: TODAY, start: "10:30 AM", end: "11:00 AM", organizer: "p-dana", attendees: ["me", "p-luis", "p-sam", "p-mei"], participants: ["p-dana", "p-luis", "p-sam"], unmuted: ["p-dana"], live: true, response: "Accepted", details: "1. Q4 delivery schedule\n2. Truck maintenance\n3. Open questions" },
            { id: "e3", title: "Dispatch planning", day: "2026-10-21", start: "9:00 AM", end: "9:30 AM", organizer: "p-luis", attendees: ["me", "p-dana"], response: "Accepted" },
            { id: "e4", title: "Lunch and learn: Safety", day: "2026-10-22", start: "12:00 PM", end: "1:00 PM", organizer: "p-sam", attendees: ["me"], online: false, location: "Break room", response: "Tentative" },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Open Settings and set your Speaker to “Headset Earphone (Jabra Evolve2 40).”",
          hint: "Select Settings and more (…) next to your picture › Settings › Devices. In the Speaker list, choose Headset Earphone (Jabra Evolve2 40).",
          steps: [{ action: { kind: "command", id: "av.speaker", value: "Headset Earphone (Jabra Evolve2 40)" }, requires: { selection: ["settings", "prejoin:e1"] }, selectHint: "Choose the speaker in Settings › Devices." }],
        },
        {
          instruction: "Set your Microphone to “Headset Microphone (Jabra Evolve2 40).”",
          hint: "In Settings › Devices, open the Microphone list and choose Headset Microphone (Jabra Evolve2 40).",
          steps: [{ action: { kind: "command", id: "av.microphone", value: "Headset Microphone (Jabra Evolve2 40)" }, requires: { selection: ["settings", "prejoin:e1"] }, selectHint: "Choose the microphone in Settings › Devices." }],
        },
        {
          instruction: "Make a test call to check that the headset works.",
          hint: "Settings › Devices › Make a test call. Wait for the test call results to appear.",
          steps: [{ action: { kind: "command", id: "settings.testCall" }, requires: { selection: "settings" }, selectHint: "Make the test call from Settings › Devices." }],
        },
        {
          instruction: "Open the Weekly Operations Huddle from your calendar. On the pre-join screen, blur your background.",
          hint: "Close Settings with the back arrow. Select Calendar, select Weekly Operations Huddle, then Join. On the pre-join screen, select Effects and avatars › Blur.",
          steps: [{ action: { kind: "command", id: "av.background", value: "Blur" }, requires: { selection: "prejoin:e1" }, selectHint: "Do this on the pre-join screen of the Weekly Operations Huddle, before you join." }],
        },
        {
          instruction: "Turn off your microphone so you join muted, then join the meeting.",
          hint: "On the pre-join screen, turn off the Microphone switch under Computer audio, then select Join now.",
          steps: [
            { action: { kind: "command", id: "av.mic", value: "off" }, requires: { selection: "prejoin:e1" }, selectHint: "Turn the microphone off on the pre-join screen, before you select Join now." },
            { action: { kind: "command", id: "meeting.joinNow" }, requires: { selection: "prejoin:e1" }, selectHint: "Select Join now on the pre-join screen." },
          ],
        },
        {
          instruction: "Dana asks to see the delivery schedule. Share only the window “Q4 Delivery Schedule.xlsx - Excel,” not your entire screen.",
          hint: "Select Share in the meeting toolbar. Under Window, choose Q4 Delivery Schedule.xlsx - Excel.",
          steps: [{ action: { kind: "command", id: "meeting.share", value: "Q4 Delivery Schedule.xlsx - Excel" }, requires: { selection: "meeting:e1" }, selectHint: "Share from the meeting toolbar." }],
        },
        {
          instruction: "Stop sharing, then leave the meeting.",
          hint: "Select Stop sharing at the top of the shared window. Then select Leave in the meeting toolbar.",
          steps: [
            { action: { kind: "command", id: "meeting.stopShare" }, requires: { selection: "meeting:e1" }, selectHint: "Stop sharing in the meeting window." },
            { action: { kind: "command", id: "meeting.leave" }, requires: { selection: "meeting:e1" }, selectHint: "Leave from the meeting toolbar." },
          ],
        },
      ],
    },
    {
      id: "tf-m6-video-conferencing-2",
      app: "teams",
      title: "Host the monthly vendor review",
      scenario:
        "You organize Northbeam Logistics' monthly vendor review on Teams. Your supplier contact is waiting in the lobby, the review will be recorded for the vendor file, and you will present the Q3 scorecard. Run the host controls the way a professional host would.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: teamsDoc(
        northbeam({
          start: { view: "calendar" },
          events: [
            { id: "e2", title: "Monthly Vendor Review: Crestline", day: TODAY, start: "10:00 AM", end: "10:45 AM", organizer: "me", attendees: ["p-priya", "p-mei", "p-luis"], participants: ["p-mei", "p-luis"], unmuted: ["p-mei", "p-luis"], lobby: ["p-priya"], youOrganize: true, live: true, details: "1. Q3 scorecard\n2. Invoice accuracy\n3. Q4 delivery dates" },
            { id: "e1", title: "Weekly Operations Huddle", day: TODAY, start: "10:30 AM", end: "11:00 AM", organizer: "p-dana", attendees: ["me", "p-luis", "p-sam"], response: "Tentative" },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Join the meeting “Monthly Vendor Review: Crestline” that you organize.",
          hint: "Select Calendar, select Monthly Vendor Review: Crestline, select Join, then select Join now on the pre-join screen.",
          steps: [{ action: { kind: "command", id: "meeting.joinNow" }, requires: { selection: "prejoin:e2" }, selectHint: "Join the Monthly Vendor Review: Crestline meeting, not the huddle." }],
        },
        {
          instruction: "Priya Raman is waiting in the lobby. Admit her.",
          hint: "Select Admit in the lobby banner, or select People and select the check mark next to Priya Raman.",
          steps: [{ action: { kind: "command", id: "meeting.admit", value: "p-priya" }, alt: [{ kind: "command", id: "meeting.admit", value: "all" }], requires: { selection: "meeting:e2" }, selectHint: "Admit her from the meeting window." }],
        },
        {
          instruction: "Mute all participants before you start presenting.",
          hint: "Select People in the meeting toolbar, then select Mute all.",
          steps: [{ action: { kind: "command", id: "meeting.muteAll" }, requires: { selection: "meeting:e2" }, selectHint: "Use Mute all in the People panel of the meeting." }],
        },
        {
          instruction: "Start recording the meeting.",
          hint: "Select More (…) in the meeting toolbar › Record and transcribe › Start recording.",
          steps: [{ action: { kind: "command", id: "meeting.record", value: "start" }, requires: { selection: "meeting:e2" }, selectHint: "Start the recording from the meeting toolbar." }],
        },
        {
          instruction: "Tell everyone about the recording. In the meeting chat, post “This meeting is being recorded for the vendor file. Please put questions in the chat.”",
          hint: "Select Chat in the meeting toolbar, type the message in the compose box, and press Enter.",
          steps: [typeAll("meetingchat:e2", "This meeting is being recorded for the vendor file. Please put questions in the chat.", ["being recorded", "questions"])],
        },
        {
          instruction: "Turn on live captions.",
          hint: "More (…) › Language and speech › Show live captions.",
          steps: [{ action: { kind: "command", id: "meeting.captions", value: "on" }, requires: { selection: "meeting:e2" }, selectHint: "Turn on captions from the meeting toolbar." }],
        },
        {
          instruction: "Present the file “Vendor Scorecard Q3.pptx” with PowerPoint Live.",
          hint: "Select Share in the meeting toolbar. Under PowerPoint Live, choose Vendor Scorecard Q3.pptx.",
          steps: [{ action: { kind: "command", id: "meeting.share", value: "Vendor Scorecard Q3.pptx" }, requires: { selection: "meeting:e2" }, selectHint: "Share from the meeting toolbar." }],
        },
        {
          instruction: "The review is finished. Stop recording, then end the meeting for everyone.",
          hint: "More (…) › Record and transcribe › Stop recording. Then select the arrow next to Leave › End meeting.",
          steps: [
            { action: { kind: "command", id: "meeting.record", value: "stop" }, requires: { selection: "meeting:e2" }, selectHint: "Stop the recording from the meeting toolbar." },
            { action: { kind: "command", id: "meeting.end" }, requires: { selection: "meeting:e2" }, selectHint: "End the meeting from the arrow next to Leave." },
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 7: Microsoft Teams: Chat, Calls, and Meetings              */
  /* ---------------------------------------------------------------- */
  "module-7::teams-meetings": [
    {
      id: "tf-m7-teams-meetings-1",
      app: "teams",
      title: "Chat, channels, and files at the Student Services desk",
      scenario:
        "You are a student services assistant at Kestrel Point Community College, and the office runs on Microsoft Teams. Start your shift by checking Activity, answer a colleague in the right place, ask your supervisor a private question, and put files where the team can find them.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: teamsDoc(kestrel({ start: { view: "chat", conv: "c-omar" } })),
      tasks: [
        {
          instruction: "Check your Activity feed and open the mention from Elena Alvarez.",
          hint: "Select Activity on the left rail, then select Elena Alvarez's mention in the list.",
          steps: [{ action: { kind: "select", target: "activity:a1" } }],
        },
        {
          instruction: "Reply to Elena's post in its thread: “Yes, I can cover the front desk from 1:00 to 3:00 PM on Thursday.”",
          hint: "Under Elena's post in the Front Desk channel, select Reply. Type the message and press Enter.",
          steps: [typeAll("reply:m-a1", "Yes, I can cover the front desk from 1:00 to 3:00 PM on Thursday.", ["cover the front desk", "1:00 to 3:00"])],
        },
        {
          instruction: "Acknowledge Marcus Hill's post about the sign-in sheet with a Like reaction.",
          hint: "Go to Teams › Student Services › Front Desk. Point to Marcus's post and select 👍 (Like) in the reaction bar.",
          steps: [{ action: { kind: "command", id: "msg.react", value: "Like" }, requires: { selection: "msg:m-a2" }, selectHint: "React to Marcus Hill's post about the walk-in sign-in sheet." }],
        },
        {
          instruction: "Start a new chat with Tasha Greene. @mention her and ask: “Should walk-in students sign the visitor log or the advising sheet?”",
          hint: "Chat › New chat (pencil). Type Tasha in To and select Tasha Greene. In the message box, type @Tas and pick Tasha Greene from the list, then type the question and press Enter.",
          steps: [typeAll("newchat:p-tasha", "@Tasha Greene Should walk-in students sign the visitor log or the advising sheet?", ["@Tasha Greene", "visitor log", "advising sheet"])],
        },
        {
          instruction: "Upload “Front Desk Schedule - Fall.xlsx” to the Files tab of the Front Desk channel.",
          hint: "Teams › Student Services › Front Desk › Files tab › Upload › Files. Choose Front Desk Schedule - Fall.xlsx and select Open.",
          steps: [{ action: { kind: "command", id: "files.upload", value: "Front Desk Schedule - Fall.xlsx" }, requires: { selection: "files:ch-fd" }, selectHint: "Upload it in the Files tab of the Front Desk channel." }],
        },
        {
          instruction: "Share the file “Walk-In Procedures.docx” in your chat with Tasha Greene.",
          hint: "Open your chat with Tasha Greene. Select Attach file (paper clip) › Walk-In Procedures.docx, then select Send.",
          steps: [
            { action: { kind: "command", id: "compose.attach", value: "Walk-In Procedures.docx" }, requires: { selection: "chat:chat-p-tasha" }, selectHint: "Attach the file in your chat with Tasha Greene." },
            { action: { kind: "type", target: "chat:chat-p-tasha", value: "", match: "includes" } },
          ],
        },
      ],
    },
    {
      id: "tf-m7-teams-meetings-2",
      app: "teams",
      title: "Schedule and join a Teams meeting",
      scenario:
        "Your supervisor at Kestrel Point Community College asked you to set up a planning meeting for fall orientation. Then the weekly check-in starts. Schedule the meeting with an agenda, check your camera and microphone before you join, and take part the way a professional does.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: teamsDoc(
        kestrel({
          start: { view: "calendar" },
          av: { camera: false, mic: true },
          events: [
            { id: "e-checkin", title: "Student Services Weekly Check-in", day: TODAY, start: "10:00 AM", end: "10:30 AM", organizer: "p-tasha", attendees: ["me", "p-nia", "p-marcus"], participants: ["p-tasha", "p-nia", "p-marcus"], unmuted: ["p-tasha"], live: true, response: "Accepted", details: "1. Walk-in numbers\n2. Orientation\n3. Questions" },
            { id: "e-adv", title: "Advising office hours", day: "2026-10-22", start: "1:00 PM", end: "3:00 PM", organizer: "p-nia", attendees: ["me"], response: "Accepted" },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Schedule a Teams meeting titled “Fall Orientation Planning” with Tasha Greene and Marcus Hill on Wednesday, October 21, 2026, from 2:00 PM to 2:30 PM. In the details, type the agenda “1. Room setup 2. Volunteer list 3. Welcome packets.”",
          hint: "Calendar › New meeting. Type the title, add Tasha Greene and Marcus Hill, choose Wed 10/21/2026, 2:00 PM to 2:30 PM, type the agenda in the details box, then select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Fall Orientation Planning\nAttendees: Marcus Hill; Tasha Greene\nDate: 10/21/2026\nStart: 2:00 PM\nEnd: 2:30 PM\nRepeat: Does not repeat\nChannel: None\nLocation: \nDetails: 1. Room setup 2. Volunteer list 3. Welcome packets",
              ["title: fall orientation planning", "marcus hill", "tasha greene", "date: 10/21/2026", "start: 2:00 pm", "end: 2:30 pm", "room setup", "volunteer list", "welcome packets"],
            ),
          ],
        },
        {
          instruction: "Open the Student Services Weekly Check-in from your calendar. On the pre-join screen, turn your camera on and turn your microphone off.",
          hint: "Calendar › Student Services Weekly Check-in › Join. Turn on the Camera switch under the video preview and turn off the Microphone switch under Computer audio.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "av.camera", value: "on" }, requires: { selection: "prejoin:e-checkin" }, selectHint: "Turn the camera on from the pre-join screen of the weekly check-in." },
            { action: { kind: "command", id: "av.mic", value: "off" }, requires: { selection: "prejoin:e-checkin" }, selectHint: "Turn the microphone off from the pre-join screen of the weekly check-in." },
          ],
        },
        {
          instruction: "Join the meeting.",
          hint: "Select Join now on the pre-join screen.",
          steps: [{ action: { kind: "command", id: "meeting.joinNow" }, requires: { selection: "prejoin:e-checkin" }, selectHint: "Select Join now on the pre-join screen." }],
        },
        {
          instruction: "Your background is busy. Blur it from inside the meeting.",
          hint: "More (…) › Video effects and settings. Select Blur, then select Apply.",
          steps: [{ action: { kind: "command", id: "av.background", value: "Blur" }, requires: { selection: "meeting:e-checkin" }, selectHint: "Change the background from inside the meeting." }],
        },
        {
          instruction: "Open the meeting chat and post: “The agenda is in the Files tab of the Front Desk channel.”",
          hint: "Select Chat in the meeting toolbar, type the message, and press Enter.",
          steps: [typeAll("meetingchat:e-checkin", "The agenda is in the Files tab of the Front Desk channel.", ["agenda", "files tab", "front desk"])],
        },
        {
          instruction: "Raise your hand so Tasha knows you have a question.",
          hint: "Select Raise in the meeting toolbar (or press Ctrl+Shift+K).",
          steps: [{ action: { kind: "command", id: "meeting.raiseHand", value: "raise" }, requires: { selection: "meeting:e-checkin" }, selectHint: "Raise your hand in the meeting window." }],
        },
        {
          instruction: "React to Tasha's update with Applause.",
          hint: "Select React in the meeting toolbar, then select 👏 Applause.",
          steps: [{ action: { kind: "command", id: "meeting.react", value: "Applause" }, requires: { selection: "meeting:e-checkin" }, selectHint: "Use React in the meeting toolbar." }],
        },
        {
          instruction: "Leave the meeting.",
          hint: "Select Leave in the meeting toolbar.",
          steps: [{ action: { kind: "command", id: "meeting.leave" }, requires: { selection: "meeting:e-checkin" }, selectHint: "Leave from the meeting toolbar." }],
        },
      ],
    },
  ],
};
