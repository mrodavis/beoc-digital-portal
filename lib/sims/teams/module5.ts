import type { SimDefinition } from "@/types/sim";
import type { TeamsChat, TeamsDoc, TeamsEvent } from "@/components/sim/apps/teams/types";
import { PEOPLE, TODAY, cmd, doc, lakeside, typeAll } from "./lakeside";

/* Module 5: Meetings */

const HOLIDAY: TeamsChat = {
  id: "c-holiday",
  title: "Holiday Coverage",
  kind: "group",
  members: ["p-omar", "p-jen", "p-tasha"],
  messages: [{ id: "m-ho1", from: "p-omar", time: "8:50 AM", text: "Should we meet to finish the holiday schedule?" }],
};

const DANA = { id: "p-dana", name: "Dana Brooks (Riverside Imaging)", title: "Scheduling, Riverside Imaging", presence: "Available" as const };

const SCHEDULING_EVENTS: TeamsEvent[] = [
  { id: "e-huddle", title: "Front Office Huddle", day: TODAY, start: "9:45 AM", end: "10:00 AM", organizer: "p-maria", attendees: ["me", "p-omar", "p-jen", "p-tasha"], response: "Accepted" },
  { id: "e-priv", title: "Privacy Training Refresher", day: "2026-10-22", start: "1:00 PM", end: "1:45 PM", organizer: "p-renee", attendees: ["me", "p-omar", "p-jen"], details: "Annual refresher on protecting patient information." },
  { id: "e-demo", title: "Vendor demo: Phone headsets", day: "2026-10-22", start: "1:00 PM", end: "1:30 PM", organizer: "p-luis", attendees: ["me"], details: "Optional demo of new headsets." },
  {
    id: "e-riverside",
    title: "Riverside Imaging Referral Process",
    day: TODAY,
    start: "11:00 AM",
    end: "11:30 AM",
    organizer: "p-renee",
    attendees: ["p-maria"],
    participants: ["p-renee", "p-maria"],
    unmuted: ["p-renee"],
    meetingId: "245 381 907 6",
    passcode: "Lk7x2P",
    notInvited: true,
    live: true,
    details: "How referrals to Riverside Imaging are scheduled.",
  },
];

/** Pre-join defaults: camera off, microphone on. */
const AV_OFF = { camera: false, mic: true };

function huddleLive(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    av: AV_OFF,
    chats: [{ id: "c-mtg-huddle", title: "Front Office Huddle", kind: "meeting", event: "e-huddle", members: ["p-maria", "p-omar", "p-tasha", "p-jen"], messages: [{ id: "m-mh1", from: "p-maria", time: "9:40 AM", text: "Agenda: today's schedule, Friday coverage, questions." }] }, ...d.chats],
    events: [
      { id: "e-huddle", title: "Front Office Huddle", day: TODAY, start: "9:45 AM", end: "10:00 AM", organizer: "p-maria", attendees: ["me", "p-omar", "p-jen", "p-tasha"], participants: ["p-maria", "p-omar", "p-tasha"], unmuted: ["p-maria"], response: "Accepted", live: true, chat: "c-mtg-huddle", details: "1. Today's schedule\n2. Friday coverage\n3. Questions" },
      { id: "e-priv", title: "Privacy Training Refresher", day: TODAY, start: "1:00 PM", end: "1:45 PM", organizer: "p-renee", attendees: ["me", "p-omar", "p-jen"], response: "Accepted" },
    ],
  };
}

function privLive(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    av: { camera: true, mic: true },
    chats: [{ id: "c-mtg-priv", title: "Privacy Training Refresher", kind: "meeting", event: "e-priv", members: ["p-renee", "p-omar", "p-jen"], messages: [{ id: "m-mp1", from: "p-renee", time: "12:55 PM", text: "Welcome! Please hold questions until the end, or post them here." }] }, ...d.chats],
    events: [
      { id: "e-priv", title: "Privacy Training Refresher", day: TODAY, start: "9:30 AM", end: "10:15 AM", organizer: "p-renee", attendees: ["me", "p-omar", "p-jen"], participants: ["p-renee", "p-omar", "p-jen"], unmuted: ["p-renee"], response: "Accepted", live: true, chat: "c-mtg-priv", details: "Annual refresher on protecting patient information." },
    ],
  };
}

function hosting(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    people: [...PEOPLE, DANA],
    av: { camera: true, mic: true },
    events: [
      {
        id: "e-review",
        title: "Front Desk Coverage Review",
        day: TODAY,
        start: "9:30 AM",
        end: "10:00 AM",
        organizer: "me",
        youOrganize: true,
        attendees: ["p-omar", "p-jen", "p-tasha", "p-dana"],
        participants: ["p-omar", "p-jen", "p-tasha"],
        unmuted: ["p-omar", "p-jen"],
        lobby: ["p-dana"],
        attendeesRole: ["p-omar", "p-jen", "p-tasha", "p-dana"],
        live: true,
        details: "1. Riverside referral calls\n2. Friday coverage\n3. Questions",
      },
    ],
  };
}

function committee(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    av: { camera: true, mic: true },
    events: [
      {
        id: "e-pec",
        title: "Patient Experience Committee",
        day: TODAY,
        start: "9:30 AM",
        end: "10:15 AM",
        organizer: "me",
        youOrganize: true,
        attendees: ["p-maria", "p-tasha", "p-jen"],
        participants: ["p-maria", "p-tasha"],
        unmuted: ["p-maria", "p-tasha"],
        lobby: ["p-jen"],
        live: true,
        details: "1. Texting patients when running late\n2. Wait-time sign\n3. Next steps",
      },
    ],
  };
}

const REC_FILE = "Billing Workflow Check-in-20261020_140102-Meeting Recording.mp4";

/** A finished meeting whose chat holds the recording, plus today's live huddle. */
function followUp(d: TeamsDoc): TeamsDoc {
  const h = huddleLive(d);
  return {
    ...h,
    chats: [
      ...h.chats,
      {
        id: "c-mtg-billing",
        title: "Billing Workflow Check-in",
        kind: "meeting",
        event: "e-billing",
        members: ["p-kevin", "p-maria"],
        messages: [
          { id: "m-bw0", from: "p-kevin", time: "Yesterday 2:31 PM", text: "", system: "Meeting ended: 29m 40s" },
          { id: "m-bw1", from: "p-kevin", time: "Yesterday 2:32 PM", text: "Recording and transcript are ready.", attachments: [REC_FILE] },
        ],
      },
    ],
    files: [...(h.files ?? []), { id: "f-rec", name: REC_FILE, folder: "recordings", modified: "Yesterday", modifiedBy: "Kevin Patel", preview: "Meeting recording (29 minutes). Transcript available in the meeting's Recap." }],
    events: [...(h.events ?? []), { id: "e-billing", title: "Billing Workflow Check-in", day: "2026-10-20", start: "2:00 PM", end: "2:30 PM", organizer: "p-kevin", attendees: ["me", "p-maria"], response: "Accepted", chat: "c-mtg-billing" }],
  };
}

export const teamsModule5Sims: Record<string, SimDefinition[]> = {
  "module-5::schedule-meetings": [
    {
      id: "teams-m5-schedule-meetings-1",
      app: "teams",
      title: "Schedule and answer meetings",
      scenario:
        "The flu clinic needs a planning meeting, the holiday coverage group wants to talk, the Scheduling channel needs a monthly review, and two invitations are waiting. Then a partner office sends you a meeting ID to join a call.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: doc(lakeside({ start: { view: "calendar" }, events: SCHEDULING_EVENTS, chats: [...lakeside().chats, HOLIDAY] })),
      tasks: [
        {
          instruction: "Schedule a Teams meeting titled “Flu Clinic Planning” with Maria Santos and Tasha Greene as required attendees and Omar Haddad as optional, on Thursday, October 22, 2026, from 2:00 PM to 2:30 PM. In the details, type “1. Supplies 2. Volunteers 3. Signage.” Send it.",
          hint: "Calendar › New event. Type the title. Add Maria Santos and Tasha Greene in Invite required attendees. Select Response options and add Omar Haddad as optional. Choose Thu 10/22, 2:00 PM to 2:30 PM, type the details, and select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Flu Clinic Planning\nAttendees: Maria Santos; Tasha Greene\nDate: 10/22/2026\nStart: 2:00 PM\nEnd: 2:30 PM\nRepeat: Does not repeat\nChannel: None\nLocation: \nDetails: 1. Supplies 2. Volunteers 3. Signage\nOptional: Omar Haddad\nTeams meeting: On",
              ["title: flu clinic planning", "attendees: maria santos; tasha greene", "optional: omar haddad", "date: 10/22/2026", "start: 2:00 pm", "end: 2:30 pm", "supplies", "teams meeting: on"],
            ),
          ],
        },
        {
          instruction: "From the Holiday Coverage group chat, schedule a meeting with everyone in the chat on Friday, October 23, 2026, from 11:00 AM to 11:30 AM. Keep the title “Holiday Coverage.”",
          hint: "Chat › Holiday Coverage › More chat options (…) › Schedule a meeting. The title and attendees are filled in. Choose Fri 10/23, 11:00 AM to 11:30 AM, and select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Holiday Coverage\nAttendees: Jen Cole; Omar Haddad; Tasha Greene\nDate: 10/23/2026\nStart: 11:00 AM\nEnd: 11:30 AM\nRepeat: Does not repeat\nChannel: None\nLocation: \nDetails: \nOptional: \nTeams meeting: On",
              ["title: holiday coverage", "jen cole", "omar haddad", "tasha greene", "date: 10/23/2026", "start: 11:00 am", "end: 11:30 am"],
            ),
          ],
        },
        {
          instruction: "Schedule a channel meeting in Front Office › Scheduling titled “Monthly Scheduling Review” on Monday, October 26, 2026, from 9:00 AM to 9:30 AM, repeating monthly.",
          hint: "Chat › Front Office › Scheduling. Select the arrow next to Meet now › Schedule a meeting. Type the title, choose Mon 10/26, 9:00 AM to 9:30 AM, set Repeat to Monthly, and select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Monthly Scheduling Review\nAttendees: \nDate: 10/26/2026\nStart: 9:00 AM\nEnd: 9:30 AM\nRepeat: Monthly\nChannel: Front Office > Scheduling\nLocation: \nDetails: \nOptional: \nTeams meeting: On",
              ["title: monthly scheduling review", "date: 10/26/2026", "start: 9:00 am", "end: 9:30 am", "repeat: monthly", "channel: front office > scheduling"],
            ),
          ],
        },
        {
          instruction: "Accept the invitation “Privacy Training Refresher.”",
          hint: "Calendar › Thursday › Privacy Training Refresher › Accept.",
          steps: [cmd("event.rsvp", "Accept", "event:e-priv", "Respond to the Privacy Training Refresher invitation.")],
        },
        {
          instruction: "“Vendor demo: Phone headsets” is at the same time as the training. Decline it.",
          hint: "Calendar › Thursday › Vendor demo: Phone headsets › Decline.",
          steps: [cmd("event.rsvp", "Decline", "event:e-demo", "Respond to the Vendor demo invitation.")],
        },
        {
          instruction: "Riverside Imaging sent you a meeting ID instead of an invitation. Join the meeting with ID 245 381 907 6 and passcode Lk7x2P.",
          hint: "Calendar › the arrow next to Meet now › Join with an ID. Type the meeting ID and passcode and select Join meeting.",
          steps: [typeAll("joinid", "Meeting ID: 245 381 907 6\nPasscode: Lk7x2P", [["245 381 907 6", "2453819076"], "lk7x2p"])],
        },
        {
          instruction: "On the pre-join screen, join the meeting.",
          hint: "Select Join now.",
          steps: [cmd("meeting.joinNow", undefined, "prejoin:e-riverside", "Select Join now on the pre-join screen.")],
        },
      ],
    },
    {
      id: "teams-m5-schedule-meetings-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Set up next week's meetings",
      scenario:
        "Schedule two meetings, answer two invitations, and join a partner's call by ID. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: doc(lakeside({ start: { view: "calendar" }, events: SCHEDULING_EVENTS })),
      tasks: [
        {
          instruction: "Schedule “Patient Portal Training” with Jen Cole and Omar Haddad on Friday, October 23, 2026, from 10:00 AM to 10:45 AM, with the details “Bring your login.” Send it.",
          hint: "Calendar › New event. Title, attendees, Fri 10/23, 10:00 AM to 10:45 AM, details, Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Patient Portal Training\nAttendees: Jen Cole; Omar Haddad\nDate: 10/23/2026\nStart: 10:00 AM\nEnd: 10:45 AM\nRepeat: Does not repeat\nChannel: None\nLocation: \nDetails: Bring your login.\nOptional: \nTeams meeting: On",
              ["title: patient portal training", "attendees: jen cole; omar haddad", "date: 10/23/2026", "start: 10:00 am", "end: 10:45 am", "bring your login"],
            ),
          ],
        },
        {
          instruction: "From your chat with Maria Santos, schedule “Weekly Check-in” on Monday, October 26, 2026, from 3:00 PM to 3:15 PM, repeating weekly.",
          hint: "Chat › Maria Santos › More chat options (…) › Schedule a meeting. Type the title, choose Mon 10/26, 3:00 PM to 3:15 PM, set Repeat to Weekly, and select Send.",
          steps: [
            typeAll(
              "schedule",
              "Title: Weekly Check-in\nAttendees: Maria Santos\nDate: 10/26/2026\nStart: 3:00 PM\nEnd: 3:15 PM\nRepeat: Weekly\nChannel: None\nLocation: \nDetails: \nOptional: \nTeams meeting: On",
              ["title: weekly check-in", "attendees: maria santos", "date: 10/26/2026", "start: 3:00 pm", "end: 3:15 pm", "repeat: weekly"],
            ),
          ],
        },
        {
          instruction: "Accept “Privacy Training Refresher.”",
          hint: "Calendar › Thursday › Privacy Training Refresher › Accept.",
          steps: [cmd("event.rsvp", "Accept", "event:e-priv", "Respond to the Privacy Training Refresher invitation.")],
        },
        {
          instruction: "Decline “Vendor demo: Phone headsets.”",
          hint: "Calendar › Thursday › Vendor demo: Phone headsets › Decline.",
          steps: [cmd("event.rsvp", "Decline", "event:e-demo", "Respond to the Vendor demo invitation.")],
        },
        {
          instruction: "Join the meeting with ID 245 381 907 6 and passcode Lk7x2P, then select Join now.",
          hint: "Calendar › arrow next to Meet now › Join with an ID › type the ID and passcode › Join meeting › Join now.",
          steps: [
            typeAll("joinid", "Meeting ID: 245 381 907 6\nPasscode: Lk7x2P", [["245 381 907 6", "2453819076"], "lk7x2p"]),
            cmd("meeting.joinNow", undefined, "prejoin:e-riverside", "Select Join now on the pre-join screen."),
          ],
        },
      ],
    },
  ],

  "module-5::join-and-participate": [
    {
      id: "teams-m5-join-and-participate-1",
      app: "teams",
      title: "Join the huddle and take part",
      scenario:
        "The Front Office Huddle starts in a minute. You are at the busy check-in desk, so blur your background and join muted. Then take part the way a professional does: raise your hand, use the meeting chat, react, and share only the window Maria asks for.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(huddleLive(lakeside({ start: { view: "calendar" } }))),
      tasks: [
        {
          instruction: "Open the Front Office Huddle from your calendar and select Join. On the pre-join screen, turn your camera on and turn your microphone off.",
          hint: "Calendar › Front Office Huddle › Join. Turn on the Camera switch under the preview and turn off the Microphone switch.",
          anyOrder: true,
          steps: [
            cmd("av.camera", "on", "prejoin:e-huddle", "Turn the camera on from the huddle's pre-join screen."),
            cmd("av.mic", "off", "prejoin:e-huddle", "Turn the microphone off from the huddle's pre-join screen."),
          ],
        },
        {
          instruction: "Blur your background before you join.",
          hint: "On the pre-join screen, select Effects and avatars, then select Blur.",
          steps: [cmd("av.background", "Blur", "prejoin:e-huddle", "Choose the background on the pre-join screen.")],
        },
        {
          instruction: "Join the meeting.",
          hint: "Select Join now.",
          steps: [cmd("meeting.joinNow", undefined, "prejoin:e-huddle", "Select Join now on the pre-join screen.")],
        },
        {
          instruction: "Raise your hand so Maria knows you have something to add.",
          hint: "Select Raise in the meeting controls (or press Ctrl+Shift+K).",
          steps: [cmd("meeting.raiseHand", "raise", "meeting:e-huddle", "Raise your hand in the meeting window.")],
        },
        {
          instruction: "In the meeting chat, post: “Omar and I have Friday afternoon covered.”",
          hint: "Select Chat in the meeting controls, type the message, and press Enter.",
          steps: [typeAll("meetingchat:e-huddle", "Omar and I have Friday afternoon covered.", ["friday", "covered"])],
        },
        {
          instruction: "React to Maria's update with Applause.",
          hint: "Select React in the meeting controls › 👏 Applause.",
          steps: [cmd("meeting.react", "Applause", "meeting:e-huddle", "Use React in the meeting controls.")],
        },
        {
          instruction: "Maria asks to see the November schedule. Share only the window “Provider Schedule - November.xlsx - Excel.”",
          hint: "Select Share in the meeting controls. Under Window, select Provider Schedule - November.xlsx - Excel.",
          steps: [cmd("meeting.share", "Provider Schedule - November.xlsx - Excel", "meeting:e-huddle", "Share from the meeting controls.")],
        },
        {
          instruction: "Stop sharing, then leave the meeting.",
          hint: "Select Stop sharing at the top of the shared window, then select Leave.",
          steps: [
            cmd("meeting.stopShare", undefined, "meeting:e-huddle", "Stop sharing in the meeting window."),
            cmd("meeting.leave", undefined, "meeting:e-huddle", "Leave from the meeting controls."),
          ],
        },
      ],
    },
    {
      id: "teams-m5-join-and-participate-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Attend a training meeting",
      scenario:
        "Renee's privacy training refresher is starting. Join from the meeting chat, set up your camera and microphone, turn on captions, ask a question the right way, and leave when it ends. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(privLive(lakeside({ start: { view: "chat", conv: "c-mtg-priv" } }))),
      tasks: [
        {
          instruction: "From the meeting chat “Privacy Training Refresher,” open the meeting's pre-join screen.",
          hint: "Chat › Privacy Training Refresher › Join (at the top right of the chat).",
          steps: [cmd("meeting.prejoin", "e-priv", "event:e-priv", "Select Join at the top of the Privacy Training Refresher meeting chat.")],
        },
        {
          instruction: "Turn off your camera and your microphone.",
          hint: "On the pre-join screen, turn off the Camera switch and the Microphone switch.",
          anyOrder: true,
          steps: [
            cmd("av.camera", "off", "prejoin:e-priv", "Turn the camera off on the pre-join screen."),
            cmd("av.mic", "off", "prejoin:e-priv", "Turn the microphone off on the pre-join screen."),
          ],
        },
        {
          instruction: "Join the meeting.",
          hint: "Select Join now.",
          steps: [cmd("meeting.joinNow", undefined, "prejoin:e-priv", "Select Join now on the pre-join screen.")],
        },
        {
          instruction: "Turn on live captions.",
          hint: "More (…) in the meeting controls › Captions.",
          steps: [cmd("meeting.captions", "on", "meeting:e-priv", "Turn on captions from the meeting controls.")],
        },
        {
          instruction: "Post your question in the meeting chat: “Does this training cover texting appointment reminders?”",
          hint: "Select Chat in the meeting controls, type the question, and press Enter.",
          steps: [typeAll("meetingchat:e-priv", "Does this training cover texting appointment reminders?", ["texting", "reminders"])],
        },
        {
          instruction: "Raise your hand.",
          hint: "Select Raise in the meeting controls (Ctrl+Shift+K).",
          steps: [cmd("meeting.raiseHand", "raise", "meeting:e-priv", "Raise your hand in the meeting window.")],
        },
        {
          instruction: "Your question was answered. Lower your hand, then leave the meeting.",
          hint: "Select Lower in the meeting controls, then Leave.",
          steps: [
            cmd("meeting.raiseHand", "lower", "meeting:e-priv", "Lower your hand in the meeting window."),
            cmd("meeting.leave", undefined, "meeting:e-priv", "Leave from the meeting controls."),
          ],
        },
      ],
    },
  ],

  "module-5::host-a-meeting": [
    {
      id: "teams-m5-host-a-meeting-1",
      app: "teams",
      title: "Host the coverage review",
      scenario:
        "You organize today's Front Desk Coverage Review. Dana Brooks from Riverside Imaging is waiting in the lobby, Omar is presenting the schedule, and the review will be recorded for coworkers who cannot attend. Run the meeting controls like a professional host.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: doc(hosting(lakeside({ start: { view: "calendar" } }))),
      tasks: [
        {
          instruction: "Join “Front Desk Coverage Review,” the meeting you organize.",
          hint: "Calendar › Front Desk Coverage Review › Join › Join now.",
          steps: [cmd("meeting.joinNow", undefined, "prejoin:e-review", "Join the Front Desk Coverage Review meeting.")],
        },
        {
          instruction: "Dana Brooks from Riverside Imaging is waiting in the lobby. Admit her.",
          hint: "Select Admit in the lobby banner, or select People and the check mark next to Dana Brooks.",
          steps: [{ action: { kind: "command", id: "meeting.admit", value: "p-dana" }, alt: [{ kind: "command", id: "meeting.admit", value: "all" }], requires: { selection: "meeting:e-review" }, selectHint: "Admit her from the meeting window." }],
        },
        {
          instruction: "Omar will present the schedule. Make him a presenter.",
          hint: "Select People. Point to Omar Haddad › More options (…) › Make a presenter.",
          steps: [cmd("meeting.role", "p-omar=Presenter", "meeting:e-review", "Change Omar's role in the People pane.")],
        },
        {
          instruction: "Mute all participants before you start.",
          hint: "In the People pane, select Mute all.",
          steps: [cmd("meeting.muteAll", undefined, "meeting:e-review", "Use Mute all in the People pane.")],
        },
        {
          instruction: "Before you record, tell everyone in the meeting chat: “This meeting will be recorded for staff who can't attend.”",
          hint: "Select Chat in the meeting controls, type the message, and press Enter.",
          steps: [typeAll("meetingchat:e-review", "This meeting will be recorded for staff who can't attend.", ["recorded"])],
        },
        {
          instruction: "Start recording.",
          hint: "More (…) › Record › Confirm.",
          steps: [cmd("meeting.record", "start", "meeting:e-review", "Start the recording from the meeting controls.")],
        },
        {
          instruction: "Turn on live captions.",
          hint: "More (…) › Captions.",
          steps: [cmd("meeting.captions", "on", "meeting:e-review", "Turn on captions from the meeting controls.")],
        },
        {
          instruction: "The review is done. Stop recording, then end the meeting for everyone.",
          hint: "More (…) › Recording (selecting it stops the recording and the transcript). Then select the arrow next to Leave › End meeting.",
          steps: [
            cmd("meeting.record", "stop", "meeting:e-review", "Stop the recording from the meeting controls."),
            cmd("meeting.end", undefined, "meeting:e-review", "End the meeting from the arrow next to Leave."),
          ],
        },
      ],
    },
    {
      id: "teams-m5-host-a-meeting-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Run the committee meeting",
      scenario:
        "You organize the Patient Experience Committee meeting. Admit a late arrival, keep the audio clean, capture a transcript and notes, and end the meeting for everyone. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(committee(lakeside({ start: { view: "calendar" } }))),
      tasks: [
        {
          instruction: "Join “Patient Experience Committee,” the meeting you organize.",
          hint: "Calendar › Patient Experience Committee › Join › Join now.",
          steps: [cmd("meeting.joinNow", undefined, "prejoin:e-pec", "Join the Patient Experience Committee meeting.")],
        },
        {
          instruction: "Admit Jen Cole from the lobby.",
          hint: "Select Admit in the lobby banner, or People › the check mark next to Jen Cole.",
          steps: [{ action: { kind: "command", id: "meeting.admit", value: "p-jen" }, alt: [{ kind: "command", id: "meeting.admit", value: "all" }], requires: { selection: "meeting:e-pec" }, selectHint: "Admit her from the meeting window." }],
        },
        {
          instruction: "Mute all participants.",
          hint: "People › Mute all.",
          steps: [cmd("meeting.muteAll", undefined, "meeting:e-pec", "Use Mute all in the People pane.")],
        },
        {
          instruction: "Start transcription (without recording).",
          hint: "More (…) › Transcribe › Confirm.",
          steps: [cmd("meeting.transcribe", "start", "meeting:e-pec", "Start transcription from the meeting controls.")],
        },
        {
          instruction: "In meeting Notes, add the note “Omar drafts a running-late text message.”",
          hint: "Select Notes in the meeting controls, type the note, and press Enter.",
          steps: [typeAll("notes:e-pec", "Omar drafts a running-late text message.", ["omar", "running-late"])],
        },
        {
          instruction: "Stop transcription and end the meeting for everyone.",
          hint: "More (…) › Transcribing (selecting it stops the transcript). Then the arrow next to Leave › End meeting.",
          steps: [
            cmd("meeting.transcribe", "stop", "meeting:e-pec", "Stop transcription from the meeting controls."),
            cmd("meeting.end", undefined, "meeting:e-pec", "End the meeting from the arrow next to Leave."),
          ],
        },
      ],
    },
  ],

  "module-5::captions-recordings-and-follow-up": [
    {
      id: "teams-m5-captions-recordings-and-follow-up-1",
      app: "teams",
      title: "Captions, notes, and follow-up",
      scenario:
        "You missed part of yesterday's Billing Workflow Check-in, and today's huddle is about to start in a noisy front office. Catch up from the recording, use captions and notes during the huddle, and send a clear follow-up afterward.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: doc(followUp(lakeside({ start: { view: "chat", conv: "c-mtg-billing" } }))),
      tasks: [
        {
          instruction: "In the Billing Workflow Check-in meeting chat, open the meeting recording.",
          hint: "Chat › Billing Workflow Check-in. Select the recording file in Kevin's message.",
          judgeFree: true,
          steps: [cmd("files.open", "f-rec", "file:f-rec", "Open the recording from the meeting chat.")],
        },
        {
          instruction: "Close the recording. In the same meeting chat, reply to Kevin: “Thanks, Kevin. I'll update the copay log by Friday.”",
          hint: "Select Close. Point to Kevin's message › More options (…) › Reply. Type and press Enter.",
          steps: [typeAll("reply:m-bw1", "Thanks, Kevin. I'll update the copay log by Friday.", ["copay log"])],
        },
        {
          instruction: "Join the Front Office Huddle from your calendar with your camera on.",
          hint: "Calendar › Front Office Huddle › Join. Turn on the Camera switch, then select Join now.",
          steps: [
            cmd("av.camera", "on", "prejoin:e-huddle", "Turn the camera on from the huddle's pre-join screen."),
            cmd("meeting.joinNow", undefined, "prejoin:e-huddle", "Select Join now on the pre-join screen."),
          ],
        },
        {
          instruction: "The front office is noisy. Turn on live captions.",
          hint: "More (…) › Captions.",
          steps: [cmd("meeting.captions", "on", "meeting:e-huddle", "Turn on captions from the meeting controls.")],
        },
        {
          instruction: "Open Notes and add: “Alex covers check-in 12:00 to 1:00 on Friday.”",
          hint: "Select Notes in the meeting controls, type the note, and press Enter.",
          steps: [typeAll("notes:e-huddle", "Alex covers check-in 12:00 to 1:00 on Friday.", ["12:00 to 1:00", "friday"])],
        },
        {
          instruction: "Leave the meeting.",
          hint: "Select Leave.",
          steps: [cmd("meeting.leave", undefined, "meeting:e-huddle", "Leave from the meeting controls.")],
        },
        {
          instruction: "In the Front Office Huddle meeting chat, post a follow-up with the heading “Action items:” and a bulleted list: “Alex: Friday 12:00 to 1:00” and “Omar: Friday 1:00 to 3:00.”",
          hint: "Chat › Front Office Huddle. Type the heading, press Shift+Enter, select Format › Bulleted list, type the items with Shift+Enter between them, and press Enter.",
          steps: [typeAll("chat:c-mtg-huddle", "Action items:\n- Alex: Friday 12:00 to 1:00\n- Omar: Friday 1:00 to 3:00", ["action items", "- alex", "- omar"])],
        },
      ],
    },
    {
      id: "teams-m5-captions-recordings-and-follow-up-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Catch up and follow up",
      scenario:
        "Catch up on a meeting you missed, use captions and notes in today's huddle, and close the loop with a follow-up. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(followUp(lakeside({ start: { view: "chat", conv: "c-mtg-billing" } }))),
      tasks: [
        {
          instruction: "Open the recording in the Billing Workflow Check-in meeting chat.",
          hint: "Chat › Billing Workflow Check-in › select the recording file.",
          judgeFree: true,
          steps: [cmd("files.open", "f-rec", "file:f-rec", "Open the recording from the meeting chat.")],
        },
        {
          instruction: "Close it and react to Kevin's message with a Like.",
          hint: "Close › point to Kevin's message › 👍 Like.",
          steps: [cmd("msg.react", "Like", "msg:m-bw1", "React to Kevin's message.")],
        },
        {
          instruction: "Join the Front Office Huddle and turn on live captions.",
          hint: "Calendar › Front Office Huddle › Join › Join now. Then More (…) › Captions.",
          steps: [
            cmd("meeting.joinNow", undefined, "prejoin:e-huddle", "Select Join now on the pre-join screen."),
            cmd("meeting.captions", "on", "meeting:e-huddle", "Turn on captions from the meeting controls."),
          ],
        },
        {
          instruction: "Add a note: “Tasha restocks Room 3 before 2:00 PM.”",
          hint: "Notes › type the note › Enter.",
          steps: [typeAll("notes:e-huddle", "Tasha restocks Room 3 before 2:00 PM.", ["tasha", "room 3"])],
        },
        {
          instruction: "Leave, then post in the Front Office Huddle meeting chat: “Notes are in the meeting. Tasha restocks Room 3 before 2:00 PM.”",
          hint: "Leave › Chat › Front Office Huddle › type the message › Enter.",
          steps: [
            cmd("meeting.leave", undefined, "meeting:e-huddle", "Leave from the meeting controls."),
            typeAll("chat:c-mtg-huddle", "Notes are in the meeting. Tasha restocks Room 3 before 2:00 PM.", ["room 3"]),
          ],
        },
      ],
    },
  ],
};
