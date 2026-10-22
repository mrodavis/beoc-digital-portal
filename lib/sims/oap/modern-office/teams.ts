import type { SimDefinition } from "@/types/sim";
import { teamsDoc, typeAll, type TeamsDoc } from "@/components/sim/apps/teams/types";

/** modern-office sims that run in the teams engine. Keys are "<moduleSlug>::<lessonSlug>". */

const TODAY = "2026-10-20";

const TOR_PEOPLE: TeamsDoc["people"] = [
  { id: "p-renee", name: "Renee Ortiz", title: "Operations Manager", presence: "Available" },
  { id: "p-priya", name: "Priya Shah", title: "Project Manager", presence: "Busy" },
  { id: "p-alex", name: "Alex Kim", title: "Finance Coordinator", presence: "Available" },
  { id: "p-dana", name: "Dana Cole", title: "Account Manager", presence: "Available" },
  { id: "p-sam", name: "Sam Patel", title: "Account Manager", presence: "Away" },
  { id: "p-devon", name: "Devon Price", title: "IT Support Specialist", presence: "Available" },
  { id: "p-marcus", name: "Marcus Webb", title: "Partner, Webb & Lowe Accounting (Guest)", presence: "Offline" },
  { id: "p-lena", name: "Lena Harper", title: "Office Manager, Harper Dental (Guest)", presence: "Available" },
];

function torTech(extra: Partial<TeamsDoc>): TeamsDoc {
  return {
    org: "TOR Tech",
    today: TODAY,
    now: "10:02 AM",
    me: { name: "Jordan Rivera", title: "Office Assistant", email: "jordan.rivera@tortech.example", presence: "Available" },
    people: TOR_PEOPLE,
    chats: [],
    teams: [],
    devices: {
      speakers: ["Speakers (Realtek(R) Audio)", "Headset Earphone (Poly Voyager 4320)"],
      microphones: ["Microphone Array (Realtek(R) Audio)", "Headset Microphone (Poly Voyager 4320)"],
      cameras: ["Integrated Webcam"],
      speaker: "Headset Earphone (Poly Voyager 4320)",
      microphone: "Headset Microphone (Poly Voyager 4320)",
      camera: "Integrated Webcam",
      noise: "Auto",
    },
    av: { camera: true, mic: true },
    ...extra,
  };
}

export const teamsSims: Record<string, SimDefinition[]> = {
  /* ---------------------------------------------------------------- */
  /* Module 9: Slack & Teams Etiquette                                 */
  /* ---------------------------------------------------------------- */
  "module-9::slack-teams-etiquette": [
    {
      id: "mo-m9-teams-etiquette-1",
      app: "teams",
      title: "Right place, right format: a morning in TOR Tech's Teams",
      scenario:
        "It's your second week as office assistant at TOR Tech. Your manager, Renee Ortiz, expects you to keep the Teams channels readable: reply in threads, acknowledge with reactions, format updates so they're easy to scan, and protect your focus time. Everything you post is visible to the team.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: teamsDoc(
        torTech({
          start: { view: "teams", conv: "ch-proj", tab: "posts" },
          chats: [
            {
              id: "c-alex",
              members: ["p-alex"],
              messages: [{ id: "m-x1", from: "p-alex", time: "Yesterday", text: "I'll be finishing the Q2 report this week." }],
            },
            {
              id: "c-renee",
              members: ["p-renee"],
              messages: [{ id: "m-r1", from: "p-renee", time: "8:15 AM", text: "Please answer the Harper Dental question in Projects when you get a chance." }],
            },
          ],
          teams: [
            {
              id: "t-tor",
              name: "TOR Tech Operations",
              color: "#0e7a74",
              channels: [
                { id: "ch-gen", name: "General", posts: [{ id: "m-g1", from: "p-renee", time: "Mon 8:00 AM", text: "Good morning, team. Use Projects for client work and Random for everything else.", replies: [] }] },
                {
                  id: "ch-proj",
                  name: "Projects",
                  description: "Client project updates. Reply in threads so each conversation stays together.",
                  posts: [
                    { id: "m-p2", from: "p-devon", time: "8:40 AM", text: "New VPN instructions are posted in the Shared tab. Please read them before Friday.", reactions: { Like: ["p-alex", "p-dana"] }, replies: [] },
                    { id: "m-p1", from: "p-renee", time: "9:05 AM", text: "Can someone confirm the Harper Dental migration date? The client asked this morning.", replies: [] },
                  ],
                },
                {
                  id: "ch-ann",
                  name: "Announcements",
                  posts: [
                    {
                      id: "m-an1",
                      from: "me",
                      time: "Yesterday",
                      text: "Client onboarding checklist v2 is ready.",
                      replies: [{ id: "m-an1r", from: "p-renee", time: "Yesterday", text: "Thanks, Jordan. Next time, add the client name to the post so people can search for it." }],
                    },
                  ],
                },
                {
                  id: "ch-random",
                  name: "Random",
                  notifications: "All activity",
                  posts: [
                    { id: "m-z1", from: "p-sam", time: "9:30 AM", text: "Who wants to order lunch from the taco place?", replies: [{ id: "m-z1r", from: "p-dana", time: "9:31 AM", text: "Me!" }] },
                    { id: "m-z2", from: "p-alex", time: "9:44 AM", text: "Coffee machine on 3 is fixed 🎉", replies: [] },
                  ],
                },
              ],
            },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "In the Projects channel, Renee asked for the Harper Dental migration date. Reply in her thread, not as a new post: “The Harper Dental migration is scheduled for Thursday, October 22.”",
          hint: "Under Renee's post in Projects, select Reply. Type the message and press Enter.",
          steps: [typeAll("reply:m-p1", "The Harper Dental migration is scheduled for Thursday, October 22.", ["harper dental", "thursday, october 22"])],
        },
        {
          instruction: "Acknowledge Devon Price's post about the VPN instructions with a Like reaction instead of a “Got it” reply.",
          hint: "Point to Devon's post in Projects and select 👍 (Like) in the reaction bar.",
          steps: [{ action: { kind: "command", id: "msg.react", value: "Like" }, requires: { selection: "msg:m-p2" }, selectHint: "React to Devon Price's post about the VPN instructions." }],
        },
        {
          instruction: "Post a status update in the Projects channel: “@Priya Shah the client onboarding checklist is complete. Please review it by Friday at 3:00 PM.” Mention Priya and make “Friday at 3:00 PM” bold.",
          hint: "Select Start a post. Type @Pri and choose Priya Shah, then type the rest. Select “Friday at 3:00 PM” and press Ctrl+B (or Format › Bold). Press Enter to post.",
          steps: [
            typeAll("channel:ch-proj", "@Priya Shah the client onboarding checklist is complete. Please review it by **Friday at 3:00 PM**.", ["@Priya Shah", "onboarding checklist is complete", ["**friday at 3:00 pm**", "**friday at 3:00 pm.**"]]),
          ],
        },
        {
          instruction: "Send Alex Kim a direct message that leads with the question instead of a standalone “Hey”: “Quick question about the Q2 report: do you have the final numbers for the April contracts?”",
          hint: "Chat › Alex Kim. Type the whole question in one message and press Enter.",
          steps: [typeAll("chat:c-alex", "Quick question about the Q2 report: do you have the final numbers for the April contracts?", ["q2 report", "final numbers", "april contracts"])],
        },
        {
          instruction: "In Announcements, Renee left feedback on your onboarding checklist post. Respond in that thread: “Thanks, Renee. I will include the client name in every update from now on.”",
          hint: "Chat › Teams and channels › TOR Tech Operations › Announcements. Under your post (where Renee replied), select Reply, type the response, and press Enter.",
          steps: [typeAll("reply:m-an1", "Thanks, Renee. I will include the client name in every update from now on.", ["thanks", "client name"])],
        },
        {
          instruction: "Turn off notifications for the Random channel so it doesn't interrupt focused work.",
          hint: "In Chat, under Teams and channels, point to Random and select More options (…) › Channel notifications › Off.",
          steps: [{ action: { kind: "command", id: "channel.notifications", value: "Off" }, requires: { selection: "channel:ch-random" }, selectHint: "Change the notifications for the Random channel." }],
        },
        {
          instruction: "Set your status to Do not disturb. Then set the status message “Focus time until 2:00 PM. Message me if it is urgent.” and clear it after 1 hour.",
          hint: "Select your picture at the top right › your status › Do not disturb. Then select Set status message, type the message, choose 1 hour under Clear status message after, and select Done.",
          steps: [
            { action: { kind: "command", id: "status.set", value: "Do not disturb" }, requires: { selection: "status" }, selectHint: "Change your status from your profile picture at the top right." },
            typeAll("status", "Status message: Focus time until 2:00 PM. Message me if it is urgent.\nClear after: 1 hour\nShow when people message me: Yes", ["focus time until 2:00 pm", "clear after: 1 hour"]),
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 9: Running Video Meetings Professionally                   */
  /* ---------------------------------------------------------------- */
  "module-9::video-meetings": [
    {
      id: "mo-m9-video-meetings-1",
      app: "teams",
      title: "Before, during, and after the Harper Dental check-in",
      scenario:
        "You're joining a TOR Tech client call with Harper Dental and taking the notes. Set up before you join, follow the mute rule and share only the agenda during the call, then send the recap so the meeting produces results.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: teamsDoc(
        torTech({
          start: { view: "calendar" },
          chats: [
            {
              id: "c-harper",
              title: "Harper Dental Check-in",
              kind: "meeting",
              event: "e-harper",
              members: ["p-renee", "p-lena", "p-dana"],
              messages: [{ id: "m-h1", from: "p-renee", time: "Mon 4:10 PM", text: "Agenda: 1. Migration status 2. Go-live date 3. Next steps" }],
            },
          ],
          events: [
            { id: "e-harper", title: "Harper Dental Check-in", day: TODAY, start: "10:00 AM", end: "10:30 AM", organizer: "p-renee", attendees: ["me", "p-lena", "p-dana"], participants: ["p-renee", "p-lena", "p-dana"], unmuted: ["p-renee", "p-lena"], live: true, chat: "c-harper", response: "Accepted", details: "1. Migration status\n2. Go-live date\n3. Next steps" },
            { id: "e-x", title: "Team standup", day: "2026-10-21", start: "9:00 AM", end: "9:15 AM", organizer: "p-renee", attendees: ["me"], response: "Accepted" },
          ],
          windows: ["Harper Check-in Agenda.docx - Word", "Inbox - Jordan Rivera - Outlook", "Personal Budget.xlsx - Excel", "Microsoft Edge"],
        }),
      ),
      tasks: [
        {
          instruction: "Open the Harper Dental Check-in from your calendar. On the pre-join screen, blur your background.",
          hint: "Calendar › Harper Dental Check-in › Join. On the pre-join screen, select Effects and avatars › Blur.",
          steps: [{ action: { kind: "command", id: "av.background", value: "Blur" }, requires: { selection: "prejoin:e-harper" }, selectHint: "Set the background on the pre-join screen, before you join." }],
        },
        {
          instruction: "Join muted: turn off your microphone, then join the meeting.",
          hint: "On the pre-join screen, turn off the Microphone switch, then select Join now.",
          steps: [
            { action: { kind: "command", id: "av.mic", value: "off" }, requires: { selection: "prejoin:e-harper" }, selectHint: "Turn the microphone off on the pre-join screen." },
            { action: { kind: "command", id: "meeting.joinNow" }, requires: { selection: "prejoin:e-harper" }, selectHint: "Select Join now on the pre-join screen." },
          ],
        },
        {
          instruction: "Lena asks to see the agenda. Share only the window “Harper Check-in Agenda.docx - Word.”",
          hint: "Select Share in the meeting toolbar. Under Window, choose Harper Check-in Agenda.docx - Word. Never share your whole screen when other windows are open.",
          steps: [{ action: { kind: "command", id: "meeting.share", value: "Harper Check-in Agenda.docx - Word" }, requires: { selection: "meeting:e-harper" }, selectHint: "Share from the meeting toolbar." }],
        },
        {
          instruction: "Stop sharing. Then raise your hand to ask to speak instead of talking over others.",
          hint: "Select Stop sharing at the top of the shared window. Then select Raise in the meeting toolbar.",
          steps: [
            { action: { kind: "command", id: "meeting.stopShare" }, requires: { selection: "meeting:e-harper" }, selectHint: "Stop sharing in the meeting window." },
            { action: { kind: "command", id: "meeting.raiseHand", value: "raise" }, requires: { selection: "meeting:e-harper" }, selectHint: "Raise your hand in the meeting toolbar." },
          ],
        },
        {
          instruction: "Renee calls on you. Unmute your microphone to speak.",
          hint: "Select Mic in the meeting toolbar (or press Ctrl+Shift+M).",
          steps: [{ action: { kind: "command", id: "av.mic", value: "on" }, requires: { selection: "meeting:e-harper" }, selectHint: "Unmute from the meeting toolbar." }],
        },
        {
          instruction: "When you finish speaking, mute again. Then post the action item in the meeting chat: “Action item: Jordan will send the revised proposal by Friday, October 23.”",
          hint: "Select Mic to mute. Then select Chat in the meeting toolbar, type the action item, and press Enter.",
          steps: [
            { action: { kind: "command", id: "av.mic", value: "off" }, requires: { selection: "meeting:e-harper" }, selectHint: "Mute from the meeting toolbar." },
            typeAll("meetingchat:e-harper", "Action item: Jordan will send the revised proposal by Friday, October 23.", ["action item", "revised proposal", "friday, october 23"]),
          ],
        },
        {
          instruction: "Leave the meeting.",
          hint: "Select Leave in the meeting toolbar.",
          steps: [{ action: { kind: "command", id: "meeting.leave" }, requires: { selection: "meeting:e-harper" }, selectHint: "Leave from the meeting toolbar." }],
        },
        {
          instruction: "Send the recap within 24 hours. In the Harper Dental Check-in chat, post: “Recap - Harper Dental Check-in - October 20. Decision: go-live moves to November 2. Next step: Jordan sends the revised proposal by Friday, October 23.”",
          hint: "Chat › Harper Dental Check-in. Type the recap in the message box and press Enter.",
          steps: [typeAll("chat:c-harper", "Recap - Harper Dental Check-in - October 20. Decision: go-live moves to November 2. Next step: Jordan sends the revised proposal by Friday, October 23.", ["recap", "decision", "november 2", "revised proposal", "october 23"])],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 15: The Final Simulation Overview                          */
  /* ---------------------------------------------------------------- */
  "module-15::simulation-overview": [
    {
      id: "mo-m15-simulation-overview-1",
      app: "teams",
      title: "First morning at TOR Tech",
      scenario:
        "Welcome to TOR Tech. It's the first morning of the simulation week, and your manager, Renee Ortiz, is watching how you work. Get oriented in Teams: catch up on Activity, keep the evaluation criteria where you can see them, read the simulation brief, share your plan, and answer the kickoff invitation.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: teamsDoc(
        torTech({
          start: { view: "chat", conv: "c-renee" },
          chats: [
            {
              id: "c-renee",
              members: ["p-renee"],
              unread: true,
              messages: [
                { id: "m-r1", from: "p-renee", time: "8:30 AM", text: "Welcome to TOR Tech, Jordan! This week is your Final Simulation. Here's how I'll evaluate it:" },
                { id: "m-r2", from: "p-renee", time: "8:31 AM", text: "**Final Simulation: how your week will be evaluated**\n- Accuracy: names, dates, and data are right\n- Completeness: every requirement is done\n- Professional presentation\n- AI-assisted work that you reviewed and edited\n- Judgment when things are unclear" },
                { id: "m-r3", from: "p-renee", time: "8:32 AM", text: "When you've read the brief, send me your top three priorities." },
              ],
            },
            { id: "c-dana", members: ["p-dana"], messages: [{ id: "m-d1", from: "p-dana", time: "Yesterday", text: "Looking forward to working with you!" }] },
          ],
          teams: [
            {
              id: "t-tor",
              name: "TOR Tech",
              color: "#0e7a74",
              channels: [
                { id: "ch-gen", name: "General", posts: [{ id: "m-g1", from: "p-renee", time: "8:20 AM", text: "Please welcome @Jordan Rivera, our new office assistant! Jordan starts the Final Simulation week today.", reactions: { Heart: ["p-dana", "p-sam"], Like: ["p-alex"] }, replies: [] }] },
                { id: "ch-ops", name: "Operations", posts: [{ id: "m-o1", from: "p-renee", time: "8:25 AM", text: "The simulation brief is in the Shared tab of this channel.", replies: [] }] },
                { id: "ch-proj", name: "Projects", posts: [] },
              ],
            },
          ],
          files: [
            { id: "f-brief", name: "TOR Tech Simulation Brief.docx", folder: "ch:ch-ops", modified: "Today", modifiedBy: "Renee Ortiz", preview: "Your role: Office Assistant, reporting to the Operations Manager.\nThis week: four challenges covering scheduling, email, documents, task tracking, CRM, and AI-assisted work.\nEvaluation: accuracy, completeness, professional presentation, AI workflow, and judgment.\nTip: read every challenge before you start, and plan your time." },
            { id: "f-team", name: "Team Contact List.xlsx", folder: "ch:ch-ops", modified: "Oct 12", modifiedBy: "Renee Ortiz" },
          ],
          localFiles: [{ name: "First Week Plan - Jordan Rivera.docx", size: "18 KB" }],
          activity: [
            { id: "a1", kind: "mention", from: "p-renee", text: "Mentioned you: Please welcome Jordan Rivera…", where: "TOR Tech > General", time: "8:20 AM", target: "m-g1", unread: true },
            { id: "a2", kind: "meeting", from: "p-renee", text: "Invited you to Simulation Kickoff", where: "Calendar", time: "8:22 AM", unread: true },
          ],
          events: [
            { id: "e-kick", title: "Simulation Kickoff", day: "2026-10-21", start: "9:00 AM", end: "9:30 AM", organizer: "p-renee", attendees: ["me", "p-dana", "p-sam", "p-priya"], details: "Walk through the four challenges and the evaluation criteria." },
            { id: "e-x", title: "Team standup", day: TODAY, start: "11:00 AM", end: "11:15 AM", organizer: "p-renee", attendees: ["me"], response: "Accepted" },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Start your first morning by checking Activity. Open Renee Ortiz's mention.",
          hint: "Select Activity on the left side of Teams, then select Renee Ortiz's mention.",
          steps: [{ action: { kind: "select", target: "activity:a1" } }],
        },
        {
          instruction: "Reply in the thread of Renee's welcome post: “Thank you, Renee. I'm glad to be here and ready to start the simulation week.”",
          hint: "Under Renee's welcome post in General, select Reply, type the message, and press Enter.",
          steps: [typeAll("reply:m-g1", "Thank you, Renee. I'm glad to be here and ready to start the simulation week.", ["thank", "ready"])],
        },
        {
          instruction: "In your chat with Renee, pin her message “Final Simulation: how your week will be evaluated” so it stays at the top of the chat.",
          hint: "Chat › Renee Ortiz. Point to the message, select More options (…) › Pin for everyone.",
          steps: [{ action: { kind: "command", id: "msg.pin" }, requires: { selection: "msg:m-r2" }, selectHint: "Pin Renee's message that lists the evaluation criteria." }],
        },
        {
          instruction: "Open the Shared tab in the Operations channel and open “TOR Tech Simulation Brief.docx.”",
          hint: "Chat › Teams and channels › TOR Tech › Operations › Shared tab. Select TOR Tech Simulation Brief.docx.",
          steps: [{ action: { kind: "command", id: "files.open", value: "f-brief" }, requires: { selection: "file:f-brief" }, selectHint: "Open the simulation brief, not another file." }],
        },
        {
          instruction: "Close the brief. Then upload your plan “First Week Plan - Jordan Rivera.docx” to the same Shared tab.",
          hint: "Select Close. In the Shared tab, select Upload › Files, choose First Week Plan - Jordan Rivera.docx, and select Open.",
          steps: [{ action: { kind: "command", id: "files.upload", value: "First Week Plan - Jordan Rivera.docx" }, requires: { selection: "files:ch-ops" }, selectHint: "Upload it to the Shared tab of the Operations channel." }],
        },
        {
          instruction: "Send Renee your top three priorities as a numbered list: “1. Calendar invites 2. Client emails 3. Tracker updates.”",
          hint: "Chat › Renee Ortiz. Type 1. Calendar invites, press Shift+Enter, type 2. Client emails, press Shift+Enter, type 3. Tracker updates, then press Enter to send. (Format › Numbered list also works.)",
          steps: [typeAll("chat:c-renee", "My top three priorities:\n1. Calendar invites\n2. Client emails\n3. Tracker updates", ["1. calendar invites", "2. client emails", "3. tracker updates"])],
        },
        {
          instruction: "Accept the invitation “Simulation Kickoff” on your calendar.",
          hint: "Calendar › select Simulation Kickoff (Wednesday at 9:00 AM) › Accept.",
          steps: [{ action: { kind: "command", id: "event.rsvp", value: "Accept" }, requires: { selection: "event:e-kick" }, selectHint: "Respond to the Simulation Kickoff invitation." }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 15: Multi-Tool Integration Challenge                       */
  /* ---------------------------------------------------------------- */
  "module-15::multi-tool-challenge": [
    {
      id: "mo-m15-multi-tool-1",
      app: "teams",
      title: "Monday morning: book the meetings and update the team",
      scenario:
        "It's Monday at 8:30 AM at TOR Tech, and everything on Renee's list is due by noon. Start with the time-sensitive work: book the client meeting and the internal prep meeting with agendas, tell the account manager, give Renee a status update, and answer her invitation.",
      fileName: "Microsoft Teams",
      minutes: 8,
      initial: teamsDoc(
        torTech({
          today: "2026-10-19",
          now: "8:35 AM",
          start: { view: "calendar" },
          chats: [
            {
              id: "c-renee",
              members: ["p-renee"],
              messages: [
                { id: "m-r1", from: "p-renee", time: "8:30 AM", text: "Monday list, due by noon:\n- Book the Q3 Contract Review with Marcus Webb and a prep meeting\n- Send the client email\n- Update the client tracker\n- Log Friday's call with Marcus in the CRM" },
              ],
            },
          ],
          teams: [
            {
              id: "t-tor",
              name: "TOR Tech Operations",
              color: "#0e7a74",
              channels: [
                { id: "ch-gen", name: "General", posts: [] },
                { id: "ch-acct", name: "Accounts", posts: [{ id: "m-c1", from: "p-dana", time: "8:10 AM", text: "Marcus Webb wants to review the Q3 contract this week. Can someone get it on the calendar?", replies: [] }] },
              ],
            },
          ],
          events: [
            { id: "e-standup", title: "Team standup", day: "2026-10-21", start: "8:30 AM", end: "8:45 AM", organizer: "p-renee", attendees: ["me", "p-dana", "p-sam"], response: "Accepted" },
            { id: "e-sync", title: "Weekly Ops Sync", day: "2026-10-19", start: "2:00 PM", end: "2:30 PM", organizer: "p-renee", attendees: ["me", "p-dana", "p-sam", "p-priya"], details: "Status of the Monday list and the week ahead." },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Schedule the client meeting “TOR Tech / Marcus Webb - Q3 Contract Review” with Marcus Webb and Dana Cole on Wednesday, October 21, 2026, from 10:00 AM to 10:45 AM. In the details, type the agenda “1. Contract terms 2. Renewal pricing 3. Next steps.”",
          hint: "Calendar › New event. Type the title, add Marcus Webb and Dana Cole, choose Wed 10/21/2026, 10:00 AM to 10:45 AM, type the agenda in the details box, and select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: TOR Tech / Marcus Webb - Q3 Contract Review\nAttendees: Dana Cole; Marcus Webb\nDate: 10/21/2026\nStart: 10:00 AM\nEnd: 10:45 AM\nRepeat: Does not repeat\nChannel: None\nLocation: \nDetails: 1. Contract terms 2. Renewal pricing 3. Next steps",
              ["title: tor tech / marcus webb - q3 contract review", "attendees: dana cole; marcus webb", "date: 10/21/2026", "start: 10:00 am", "end: 10:45 am", "contract terms", "renewal pricing", "next steps"],
            ),
          ],
        },
        {
          instruction: "Schedule the internal meeting “Q3 Renewal Prep” with Dana Cole and Sam Patel on Wednesday, October 21, 2026, from 9:30 AM to 10:00 AM, so it ends before the client meeting. Agenda: “1. Pricing options 2. Client history.”",
          hint: "Calendar › New event. Title Q3 Renewal Prep, add Dana Cole and Sam Patel, Wed 10/21/2026, 9:30 AM to 10:00 AM, type the agenda, and select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Q3 Renewal Prep\nAttendees: Dana Cole; Sam Patel\nDate: 10/21/2026\nStart: 9:30 AM\nEnd: 10:00 AM\nRepeat: Does not repeat\nChannel: None\nLocation: \nDetails: 1. Pricing options 2. Client history",
              ["title: q3 renewal prep", "dana cole", "sam patel", "date: 10/21/2026", "start: 9:30 am", "end: 10:00 am", "pricing options", "client history"],
            ),
          ],
        },
        {
          instruction: "Answer Dana's question in the Accounts channel thread: “@Dana Cole the Q3 Contract Review with Marcus Webb is booked for Wednesday at 10:00 AM. Prep is at 9:30 AM.”",
          hint: "Chat › Teams and channels › TOR Tech Operations › Accounts. Under Dana's post, select Reply. Type @Dan and pick Dana Cole, type the rest, and press Enter.",
          steps: [typeAll("reply:m-c1", "@Dana Cole the Q3 Contract Review with Marcus Webb is booked for Wednesday at 10:00 AM. Prep is at 9:30 AM.", ["@Dana Cole", "q3 contract review", "wednesday at 10:00 am"])],
        },
        {
          instruction: "Give Renee a short status update in your chat: “Both meetings are booked and the tracker is next. I will finish the CRM log by 11:30 AM.”",
          hint: "Chat › Renee Ortiz. Type the update and press Enter.",
          steps: [typeAll("chat:c-renee", "Both meetings are booked and the tracker is next. I will finish the CRM log by 11:30 AM.", ["both meetings are booked", "crm log", "11:30"])],
        },
        {
          instruction: "Accept Renee's invitation “Weekly Ops Sync.”",
          hint: "Calendar › select Weekly Ops Sync (today at 2:00 PM) › Accept.",
          steps: [{ action: { kind: "command", id: "event.rsvp", value: "Accept" }, requires: { selection: "event:e-sync" }, selectHint: "Respond to the Weekly Ops Sync invitation." }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 15: Building Your Professional Portfolio                   */
  /* ---------------------------------------------------------------- */
  "module-15::professional-portfolio": [
    {
      id: "mo-m15-portfolio-1",
      app: "teams",
      title: "Build and share your portfolio folder in OneDrive",
      scenario:
        "Renee wants to see your best work from the past few weeks. Your OneDrive is full of files named Draft1 and Final FINAL. Build a portfolio folder with category subfolders, rename and file your best sample with the naming convention, add your introduction, and share a view-only link.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: teamsDoc(
        torTech({
          start: { view: "onedrive", folder: "root" },
          chats: [{ id: "c-renee", members: ["p-renee"], messages: [{ id: "m-r1", from: "p-renee", time: "9:15 AM", text: "Can you pull together your best work in a portfolio folder and send me a view-only link?" }] }],
          files: [
            { id: "f-draft1", name: "Draft1.docx", folder: "root", modified: "Oct 15", modifiedBy: "Jordan Rivera", sharing: "Private", preview: "Subject: Follow-up on our Q3 contract review\nHi Mr. Webb, thank you for meeting with us on Wednesday…" },
            { id: "f-untitled", name: "Untitled.xlsx", folder: "root", modified: "Oct 9", modifiedBy: "Jordan Rivera", sharing: "Private" },
            { id: "f-final", name: "Final FINAL tracker.xlsx", folder: "root", modified: "Oct 13", modifiedBy: "Jordan Rivera", sharing: "Private" },
            { id: "f-ai1", name: "AI Draft - Meeting Recap.docx", folder: "root", modified: "Oct 16", modifiedBy: "Jordan Rivera", sharing: "Private" },
            { id: "f-ai2", name: "Edited - Meeting Recap.docx", folder: "root", modified: "Oct 16", modifiedBy: "Jordan Rivera", sharing: "Private" },
          ],
          localFiles: [{ name: "00_Portfolio_Introduction.docx", size: "16 KB" }],
        }),
      ),
      tasks: [
        {
          instruction: "In OneDrive, create a folder named “Office Assistant Portfolio - Jordan Rivera.”",
          hint: "OneDrive › My files › Add new › Folder. Type the name and select Create.",
          steps: [{ action: { kind: "type", target: "newfolder:root", value: "Office Assistant Portfolio - Jordan Rivera" } }],
        },
        {
          instruction: "Open the new folder and create three subfolders: “Professional Communications,” “Spreadsheets & Trackers,” and “AI-Assisted Work.”",
          hint: "Select the Office Assistant Portfolio folder to open it. Then Add new › Folder for each subfolder name.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "newfolder:office-assistant-portfolio-jordan-rivera", value: "Professional Communications" } },
            { action: { kind: "type", target: "newfolder:office-assistant-portfolio-jordan-rivera", value: "Spreadsheets & Trackers" } },
            { action: { kind: "type", target: "newfolder:office-assistant-portfolio-jordan-rivera", value: "AI-Assisted Work" } },
          ],
        },
        {
          instruction: "Back in My files, rename “Draft1.docx” to “2026-10_ClientFollowUpEmail_MarcusWebb.docx.”",
          hint: "Select My files in the breadcrumb. Point to Draft1.docx, select More options (…) › Rename, type the new name, and press Enter.",
          steps: [{ action: { kind: "type", target: "rename:f-draft1", value: "2026-10_ClientFollowUpEmail_MarcusWebb.docx" } }],
        },
        {
          instruction: "Move “2026-10_ClientFollowUpEmail_MarcusWebb.docx” into the Professional Communications subfolder.",
          hint: "Point to the file, select More options (…) › Move to. Select Professional Communications, then Move here.",
          steps: [{ action: { kind: "command", id: "files.move", value: "professional-communications" }, requires: { selection: "file:f-draft1" }, selectHint: "Move the renamed client follow-up email file." }],
        },
        {
          instruction: "Upload “00_Portfolio_Introduction.docx” into the main portfolio folder (not a subfolder).",
          hint: "Open Office Assistant Portfolio - Jordan Rivera. Select Upload, choose 00_Portfolio_Introduction.docx, and select Open.",
          steps: [{ action: { kind: "command", id: "files.upload", value: "00_Portfolio_Introduction.docx" }, requires: { selection: "folder:office-assistant-portfolio-jordan-rivera" }, selectHint: "Open the main portfolio folder before you upload." }],
        },
        {
          instruction: "Share the portfolio folder so anyone with the link can view it, and copy the link.",
          hint: "Go to My files. Point to the portfolio folder, select More options (…) › Share. Select the link settings line, choose Anyone with the link and Can view, select Apply, then select Copy link.",
          steps: [
            typeAll("share:office-assistant-portfolio-jordan-rivera", "People: \nLink: Anyone with the link\nPermission: Can view\nMessage: \nAction: Copy link", ["link: anyone with the link", "permission: can view", "action: copy link"]),
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 15: Capstone                                               */
  /* ---------------------------------------------------------------- */
  "module-15::capstone-simulation": [
    {
      id: "mo-m15-capstone-teams-1",
      app: "teams",
      title: "Capstone part 1: communication and scheduling",
      scenario:
        "It's your final day in the TOR Tech simulation. Renee's list covers everything: an internal update with one task flagged At Risk, a client meeting with no calendar conflicts, an internal prep meeting, a reply to a colleague, and filing your work in your portfolio.",
      fileName: "Microsoft Teams",
      minutes: 8,
      initial: teamsDoc(
        torTech({
          start: { view: "teams", conv: "ch-proj", tab: "posts" },
          teams: [
            {
              id: "t-tor",
              name: "TOR Tech Operations",
              color: "#0e7a74",
              channels: [
                { id: "ch-gen", name: "General", posts: [] },
                { id: "ch-proj", name: "Projects", posts: [{ id: "m-p1", from: "p-renee", time: "8:45 AM", text: "Final day! Post your status update here when the tracker is done.", replies: [] }] },
                { id: "ch-acct", name: "Accounts", posts: [{ id: "m-c1", from: "p-dana", time: "9:10 AM", text: "Is the Q3 Contract Review with Marcus Webb on the calendar yet?", replies: [] }] },
              ],
            },
          ],
          events: [
            { id: "e-demo", title: "Vendor demo: Cloud backup", day: "2026-10-22", start: "10:00 AM", end: "11:00 AM", organizer: "p-devon", attendees: ["me", "p-devon"], details: "Optional product demo." },
            { id: "e-x", title: "Team standup", day: "2026-10-21", start: "9:00 AM", end: "9:15 AM", organizer: "p-renee", attendees: ["me"], response: "Accepted" },
          ],
          files: [
            { id: "fd-port", name: "Office Assistant Portfolio - Jordan Rivera", folder: "root", isFolder: true, modified: "Oct 19", modifiedBy: "Jordan Rivera", sharing: "Anyone with the link can view" },
            { id: "professional-communications", name: "Professional Communications", folder: "fd-port", isFolder: true, modified: "Oct 19", modifiedBy: "Jordan Rivera" },
            { id: "ai-assisted-work", name: "AI-Assisted Work", folder: "fd-port", isFolder: true, modified: "Oct 19", modifiedBy: "Jordan Rivera" },
          ],
          localFiles: [
            { name: "2026-10_ClientEmail_MarcusWebb.docx", size: "21 KB" },
            { name: "2026-10_ProjectTracker_TORTechQ3.xlsx", size: "48 KB" },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Post the internal update in the Projects channel: “@Renee Ortiz the Q3 client tracker is updated and the CRM log is complete. One task is At Risk: the Harper Dental migration is waiting on the vendor.” Make “At Risk” bold.",
          hint: "Select Start a post. Type @Ren and choose Renee Ortiz, type the update, select “At Risk” and press Ctrl+B, then press Enter.",
          steps: [typeAll("channel:ch-proj", "@Renee Ortiz the Q3 client tracker is updated and the CRM log is complete. One task is **At Risk**: the Harper Dental migration is waiting on the vendor.", ["@Renee Ortiz", "q3 client tracker", "**at risk**", "harper dental"])],
        },
        {
          instruction: "Schedule the client-facing meeting “Q3 Contract Review - Marcus Webb” with Marcus Webb and Dana Cole on Thursday, October 22, 2026, from 10:00 AM to 10:45 AM. Agenda: “1. Contract terms 2. Renewal pricing 3. Next steps.”",
          hint: "Calendar › New event. Type the title, add Marcus Webb and Dana Cole, choose Thu 10/22/2026, 10:00 AM to 10:45 AM, type the agenda, and select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Q3 Contract Review - Marcus Webb\nAttendees: Dana Cole; Marcus Webb\nDate: 10/22/2026\nStart: 10:00 AM\nEnd: 10:45 AM\nRepeat: Does not repeat\nChannel: None\nLocation: \nDetails: 1. Contract terms 2. Renewal pricing 3. Next steps",
              ["title: q3 contract review - marcus webb", "attendees: dana cole; marcus webb", "date: 10/22/2026", "start: 10:00 am", "end: 10:45 am", "contract terms", "renewal pricing", "next steps"],
            ),
          ],
        },
        {
          instruction: "The client meeting overlaps “Vendor demo: Cloud backup” on Thursday. Decline the vendor demo so there is no conflict.",
          hint: "Calendar › Thursday › select Vendor demo: Cloud backup › Decline.",
          steps: [{ action: { kind: "command", id: "event.rsvp", value: "Decline" }, requires: { selection: "event:e-demo" }, selectHint: "Decline the Vendor demo: Cloud backup event." }],
        },
        {
          instruction: "Schedule the internal meeting “Capstone Prep” with Renee Ortiz on Wednesday, October 21, 2026, from 3:00 PM to 3:30 PM. Agenda: “1. Final checks 2. Portfolio review.”",
          hint: "Calendar › New event. Title Capstone Prep, add Renee Ortiz, Wed 10/21/2026, 3:00 PM to 3:30 PM, type the agenda, and select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Capstone Prep\nAttendees: Renee Ortiz\nDate: 10/21/2026\nStart: 3:00 PM\nEnd: 3:30 PM\nRepeat: Does not repeat\nChannel: None\nLocation: \nDetails: 1. Final checks 2. Portfolio review",
              ["title: capstone prep", "renee ortiz", "date: 10/21/2026", "start: 3:00 pm", "end: 3:30 pm", "final checks", "portfolio review"],
            ),
          ],
        },
        {
          instruction: "Answer Dana in the Accounts channel thread: “Yes. The Q3 Contract Review with Marcus Webb is booked for Thursday at 10:00 AM.”",
          hint: "Chat › Teams and channels › TOR Tech Operations › Accounts. Under Dana's post, select Reply, type the answer, and press Enter.",
          steps: [typeAll("reply:m-c1", "Yes. The Q3 Contract Review with Marcus Webb is booked for Thursday at 10:00 AM.", ["q3 contract review", "thursday at 10:00 am"])],
        },
        {
          instruction: "File your capstone client email in your portfolio: upload “2026-10_ClientEmail_MarcusWebb.docx” to the Professional Communications subfolder.",
          hint: "OneDrive › Office Assistant Portfolio - Jordan Rivera › Professional Communications. Select Upload, choose the file, and select Open.",
          steps: [{ action: { kind: "command", id: "files.upload", value: "2026-10_ClientEmail_MarcusWebb.docx" }, requires: { selection: "folder:professional-communications" }, selectHint: "Open the Professional Communications subfolder before you upload." }],
        },
      ],
    },
  ],
};
