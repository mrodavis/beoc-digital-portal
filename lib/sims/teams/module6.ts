import type { SimDefinition } from "@/types/sim";
import type { TeamsDoc } from "@/components/sim/apps/teams/types";
import { TODAY, cmd, doc, lakeside, typeAll } from "./lakeside";

/* Module 6: Working Smarter in Teams */

const TASKS: TeamsDoc["tasks"] = [
  { id: "t-1", title: "Restock intake clipboards", due: "10/21/2026", assigned: "Alex Morgan", plan: "Front Office" },
  { id: "t-2", title: "Call Dr. Shah's Friday patients", due: "10/22/2026", assigned: "Omar Haddad", plan: "Front Office" },
  { id: "t-3", title: "Update the copay log", due: "10/23/2026", assigned: "Alex Morgan" },
];

function withLoop(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    chats: d.chats.map((c) =>
      c.id !== "c-maria"
        ? c
        : {
            ...c,
            messages: [
              ...c.messages,
              { id: "m-loop1", from: "p-maria", time: "9:12 AM", text: "Flu clinic supplies. Add anything we're missing:", loop: { kind: "Checklist", items: ["Gloves", "Bandages", "Sharps container"] } },
            ],
          },
    ),
  };
}

function huddle(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    events: [
      { id: "e-huddle", title: "Front Office Huddle", day: TODAY, start: "9:45 AM", end: "10:00 AM", organizer: "p-maria", attendees: ["me", "p-omar", "p-tasha"], participants: ["p-maria", "p-omar"], unmuted: ["p-maria"], response: "Accepted", live: true },
    ],
  };
}

const LONG_POST = {
  id: "m-c2",
  from: "p-renee",
  time: "9:00 AM",
  subject: "New check-in privacy steps",
  text: "Starting Monday, please follow these steps at check-in:\n1. Ask patients to confirm their date of birth quietly or on the tablet, not out loud.\n2. Turn the check-in screen away from the waiting room.\n3. Do not leave printed schedules on the counter.\n4. Lock your screen (Windows logo key + L) whenever you step away.",
  replies: [],
};

function withLongPost(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    teams: d.teams.map((t) => (t.id !== "t-staff" ? t : { ...t, channels: t.channels.map((c) => (c.id !== "ch-safety" ? c : { ...c, posts: [...c.posts, LONG_POST] })) })),
  };
}

export const teamsModule6Sims: Record<string, SimDefinition[]> = {
  "module-6::calls": [
    {
      id: "teams-m6-calls-1",
      app: "teams",
      title: "Make calls in Teams",
      scenario:
        "The label printer is jammed again and typing back and forth with IT is too slow. Call Luis from the Calls app, then call Tasha from your chat about Room 2, and switch to video so she can see the supply shelf.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ start: { view: "calls" } })),
      tasks: [
        {
          instruction: "In Calls, call Luis Ortega.",
          hint: "Select Calls on the app bar. Type Luis in Type a name or number and select Luis Ortega (or select the phone icon next to his name).",
          steps: [cmd("calls.call", "p-luis", ["person:p-luis", "view:calls"], "Call Luis Ortega from the Calls app.")],
        },
        {
          instruction: "The front desk is noisy. Mute your microphone while Luis checks the printer log.",
          hint: "Select Mic in the call controls (or press Ctrl+Shift+M).",
          steps: [cmd("av.mic", "off", "meeting:call-chat-p-luis", "Mute yourself in the call window.")],
        },
        {
          instruction: "Luis fixed it. Unmute, then hang up.",
          hint: "Select Mic to unmute, then Leave (Ctrl+Shift+H).",
          steps: [
            cmd("av.mic", "on", "meeting:call-chat-p-luis", "Unmute yourself in the call window."),
            cmd("meeting.leave", undefined, "meeting:call-chat-p-luis", "Hang up with Leave."),
          ],
        },
        {
          instruction: "Open your chat with Tasha Greene and start an audio call.",
          hint: "Chat › Tasha Greene. Select the phone icon (Audio call) at the top right of the chat.",
          steps: [cmd("chat.call", "audio", "chat:c-tasha", "Start the call from your chat with Tasha.")],
        },
        {
          instruction: "Turn on your camera so Tasha can see the supply shelf.",
          hint: "Select Camera in the call controls (or press Ctrl+Shift+O).",
          steps: [cmd("av.camera", "on", "meeting:call-c-tasha", "Turn on your camera in the call window.")],
        },
        {
          instruction: "End the call, then send Tasha: “Room 2 has two boxes of gloves left.”",
          hint: "Select Leave. Then type the message in your chat with Tasha and press Enter.",
          steps: [
            cmd("meeting.leave", undefined, "meeting:call-c-tasha", "Hang up with Leave."),
            typeAll("chat:c-tasha", "Room 2 has two boxes of gloves left.", ["room 2", "gloves"]),
          ],
        },
      ],
    },
    {
      id: "teams-m6-calls-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Calls at the front desk",
      scenario:
        "Make two quick Teams calls the professional way and follow up in writing. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ start: { view: "chat", conv: "c-kevin" } })),
      tasks: [
        {
          instruction: "Start an audio call with Kevin Patel from your chat with him.",
          hint: "Chat › Kevin Patel › Audio call (phone icon) at the top right.",
          steps: [cmd("chat.call", "audio", "chat:c-kevin", "Start the call from your chat with Kevin.")],
        },
        {
          instruction: "Mute yourself while Kevin looks up the copay rule, then hang up.",
          hint: "Mic (Ctrl+Shift+M), then Leave.",
          steps: [
            cmd("av.mic", "off", "meeting:call-c-kevin", "Mute yourself in the call window."),
            cmd("meeting.leave", undefined, "meeting:call-c-kevin", "Hang up with Leave."),
          ],
        },
        {
          instruction: "Send Kevin a written summary: “Confirmed: copays are collected at check-in.”",
          hint: "Type in your chat with Kevin and press Enter.",
          steps: [typeAll("chat:c-kevin", "Confirmed: copays are collected at check-in.", ["copays", "check-in"])],
        },
        {
          instruction: "In Calls, call Omar Haddad.",
          hint: "Calls › Type a name or number › Omar Haddad (or the phone icon next to his name).",
          steps: [cmd("calls.call", "p-omar", ["person:p-omar", "view:calls"], "Call Omar from the Calls app.")],
        },
        {
          instruction: "Hang up.",
          hint: "Select Leave (Ctrl+Shift+H).",
          steps: [cmd("meeting.leave", undefined, "meeting:call-chat-p-omar", "Hang up with Leave.")],
        },
      ],
    },
  ],

  "module-6::apps-planner-and-approvals": [
    {
      id: "teams-m6-apps-planner-and-approvals-1",
      app: "teams",
      title: "Plan the flu clinic with Planner and Approvals",
      scenario:
        "Saturday's flu clinic needs a few tasks tracked and a small purchase approved. Add Planner to your app bar, assign the tasks, check off what is done, and send Maria an approval request for the new printer roller.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(lakeside({ tasks: TASKS, start: { view: "chat", conv: "c-maria" } })),
      tasks: [
        {
          instruction: "Open Planner from Apps and pin it to the app bar.",
          hint: "Select Apps on the app bar, then Open on the Planner card. Right-click Planner on the app bar and select Pin. (The Pin button on the Planner card also works.)",
          steps: [cmd("apps.pin", "planner", ["view:planner", "view:apps"], "Pin Planner: right-click it on the app bar, or use Pin on the Apps page.")],
        },
        {
          instruction: "Open Planner. Add the task “Order flu clinic signage,” due Friday, October 23, and assign it to yourself (Alex Morgan).",
          hint: "In Planner (My Tasks), type the task in Add new task, choose the due date and Alex Morgan, and select Add.",
          steps: [typeAll("planner:new", "Task: Order flu clinic signage\nDue: 10/23/2026\nAssigned to: Alex Morgan", ["task: order flu clinic signage", "due: 10/23/2026", "assigned to: alex morgan"])],
        },
        {
          instruction: "Add the task “Confirm volunteer list,” due Thursday, October 22, assigned to Tasha Greene.",
          hint: "Add new task › type the task › due date Thu 10/22 › Tasha Greene › Add.",
          steps: [typeAll("planner:new", "Task: Confirm volunteer list\nDue: 10/22/2026\nAssigned to: Tasha Greene", ["task: confirm volunteer list", "due: 10/22/2026", "assigned to: tasha greene"])],
        },
        {
          instruction: "You restocked the intake clipboards this morning. Mark that task complete.",
          hint: "Select the circle next to Restock intake clipboards.",
          steps: [cmd("planner.complete", "t-1", "planner", "Mark the task complete in Planner.")],
        },
        {
          instruction: "Open the Approvals app and send a new approval request named “Label printer roller” to Maria Santos with the details “Replacement roller for the check-in label printer, $38.”",
          hint: "Apps › Approvals › Open. Select New approval request, type the name, add Maria Santos as the approver, type the details, and select Send.",
          steps: [typeAll("approval:new", "Approval name: Label printer roller\nApprovers: Maria Santos\nDetails: Replacement roller for the check-in label printer, $38.", ["approval name: label printer roller", "approvers: maria santos", "$38"])],
        },
      ],
    },
    {
      id: "teams-m6-apps-planner-and-approvals-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Track the work, get the approval",
      scenario:
        "Use Planner and Approvals to organize your week. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ tasks: TASKS, start: { view: "apps" } })),
      tasks: [
        {
          instruction: "Pin Planner and Approvals to the app bar.",
          hint: "Open each app from Apps, then right-click it on the app bar › Pin. (Or select Pin on its card on the Apps page.)",
          anyOrder: true,
          steps: [
            cmd("apps.pin", "planner", ["view:planner", "view:apps"], "Pin Planner: right-click it on the app bar, or use Pin on the Apps page."),
            cmd("apps.pin", "approvals", ["view:approvals", "view:apps"], "Pin Approvals: right-click it on the app bar, or use Pin on the Apps page."),
          ],
        },
        {
          instruction: "In Planner, add “Print flu clinic sign-in sheets,” due Friday, October 23, assigned to Omar Haddad.",
          hint: "Planner › Add new task › Fri 10/23 › Omar Haddad › Add.",
          steps: [typeAll("planner:new", "Task: Print flu clinic sign-in sheets\nDue: 10/23/2026\nAssigned to: Omar Haddad", ["task: print flu clinic sign-in sheets", "due: 10/23/2026", "assigned to: omar haddad"])],
        },
        {
          instruction: "Mark “Update the copay log” complete.",
          hint: "Select the circle next to Update the copay log.",
          steps: [cmd("planner.complete", "t-3", "planner", "Mark the task complete in Planner.")],
        },
        {
          instruction: "In Approvals, send Renee Walker a request named “Headset for check-in window 2” with the details “Jabra Evolve2 40 headset, $89.”",
          hint: "Approvals › New approval request › name, approver Renee Walker, details › Send.",
          steps: [typeAll("approval:new", "Approval name: Headset for check-in window 2\nApprovers: Renee Walker\nDetails: Jabra Evolve2 40 headset, $89.", ["approval name: headset for check-in window 2", "approvers: renee walker", "$89"])],
        },
      ],
    },
  ],

  "module-6::loop-components": [
    {
      id: "teams-m6-loop-components-1",
      app: "teams",
      title: "Work together with Loop components",
      scenario:
        "Maria sent a Loop checklist of flu clinic supplies, so everyone can add to one list instead of replying with separate messages. Add what is missing, then start a Loop component of your own.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(withLoop(lakeside({ start: { view: "chat", conv: "c-maria" } }))),
      tasks: [
        {
          instruction: "Add “Alcohol pads” to Maria's flu clinic supplies checklist.",
          hint: "In your chat with Maria, select Add an item in the Loop checklist, type Alcohol pads, and press Enter.",
          steps: [typeAll("loop:m-loop1", "Alcohol pads", ["alcohol pads"])],
        },
        {
          instruction: "Also add “Adhesive bandages, small” to the checklist.",
          hint: "Type in Add an item again and press Enter.",
          steps: [typeAll("loop:m-loop1", "Adhesive bandages, small", ["adhesive bandages"])],
        },
        {
          instruction: "React to Maria's checklist message with a Like.",
          hint: "Point to Maria's message and select 👍 Like.",
          steps: [cmd("msg.react", "Like", "msg:m-loop1", "React to Maria's checklist message.")],
        },
        {
          instruction: "In the Front Desk Lunch Orders chat, send a Checklist Loop component with the message “Friday lunch orders.”",
          hint: "Chat › Front Desk Lunch Orders. Select Loop components (in the compose box) › Checklist. Type the message and press Enter.",
          steps: [cmd("compose.loop", "Checklist", "chat:c-lunch", "Insert the Loop component in the Front Desk Lunch Orders chat."), typeAll("chat:c-lunch", "Friday lunch orders.", ["friday lunch orders"])],
        },
        {
          instruction: "In your chat with Kevin Patel, send a Table Loop component with the message “Copay questions to review.”",
          hint: "Chat › Kevin Patel › Loop components › Table. Type the message and press Enter.",
          steps: [cmd("compose.loop", "Table", "chat:c-kevin", "Insert the Loop component in your chat with Kevin."), typeAll("chat:c-kevin", "Copay questions to review.", ["copay questions"])],
        },
      ],
    },
    {
      id: "teams-m6-loop-components-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: One list, edited together",
      scenario:
        "Use Loop components so a group works on one list instead of a stream of replies. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 4,
      initial: doc(withLoop(lakeside({ start: { view: "chat", conv: "c-maria" } }))),
      tasks: [
        {
          instruction: "Add “Ice packs” to Maria's flu clinic supplies checklist.",
          hint: "In your chat with Maria, type in Add an item in the Loop checklist and press Enter.",
          steps: [typeAll("loop:m-loop1", "Ice packs", ["ice packs"])],
        },
        {
          instruction: "Reply to Maria's checklist message: “Added ice packs. Everything else is in the supply closet.”",
          hint: "Point to Maria's message › More options (…) › Reply. Type and press Enter.",
          steps: [typeAll("reply:m-loop1", "Added ice packs. Everything else is in the supply closet.", ["ice packs"])],
        },
        {
          instruction: "In your chat with Tasha Greene, send a Checklist Loop component with the message “Room 2 restock list.”",
          hint: "Chat › Tasha Greene › Loop components › Checklist. Type the message and press Enter.",
          steps: [cmd("compose.loop", "Checklist", "chat:c-tasha", "Insert the Loop component in your chat with Tasha."), typeAll("chat:c-tasha", "Room 2 restock list.", ["room 2"])],
        },
      ],
    },
  ],

  "module-6::accessibility-and-mobile": [
    {
      id: "teams-m6-accessibility-and-mobile-1",
      app: "teams",
      title: "Make Teams work for you",
      scenario:
        "Renee posted a long list of new privacy steps, the afternoon glare makes your screen hard to read, and the huddle is in a noisy room. Use the accessibility tools built into Teams.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(huddle(withLongPost(lakeside({ start: { view: "chat", conv: "ch-safety", tab: "posts" } })))),
      tasks: [
        {
          instruction: "Open Renee's post “New check-in privacy steps” in Immersive Reader.",
          hint: "Point to Renee's post › More options (…) › Immersive Reader.",
          judgeFree: true,
          steps: [cmd("msg.immersiveReader", "m-c2", "msg:m-c2", "Open Renee's post in Immersive Reader.")],
        },
        {
          instruction: "Close Immersive Reader and reply to Renee's post: “Thanks, Renee. The check-in screen is turned away from the waiting room now.”",
          hint: "Select Close Immersive Reader (X). Then select Reply under Renee's post, type, and press Enter.",
          steps: [typeAll("reply:m-c2", "Thanks, Renee. The check-in screen is turned away from the waiting room now.", ["check-in screen"])],
        },
        {
          instruction: "Change the Teams theme to Dark.",
          hint: "Settings and more (…) › Settings › Appearance and accessibility › Dark.",
          steps: [cmd("settings.theme", "Dark", "settings", "Change the theme in Settings › Appearance and accessibility.")],
        },
        {
          instruction: "In Settings › Devices, set Noise suppression to High so the front desk noise doesn't reach the meeting.",
          hint: "Settings › Devices › Noise suppression › High.",
          steps: [cmd("av.noise", "High", "settings", "Change Noise suppression in Settings › Devices.")],
        },
        {
          instruction: "Close Settings, join the Front Office Huddle, and turn on live captions.",
          hint: "Back arrow › Calendar › Front Office Huddle › Join › Join now. Then More (…) › Captions.",
          steps: [cmd("meeting.joinNow", undefined, "prejoin:e-huddle", "Select Join now on the pre-join screen."), cmd("meeting.captions", "on", "meeting:e-huddle", "Turn on captions from the meeting controls.")],
        },
      ],
    },
    {
      id: "teams-m6-accessibility-and-mobile-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Accessibility tools",
      scenario:
        "Try the Teams accessibility tools a coworker might need. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 4,
      initial: doc(huddle(withLongPost(lakeside({ start: { view: "chat", conv: "ch-safety", tab: "posts" } })))),
      tasks: [
        {
          instruction: "Open Renee's post in Immersive Reader.",
          hint: "Point to the post › More options (…) › Immersive Reader.",
          judgeFree: true,
          steps: [cmd("msg.immersiveReader", "m-c2", "msg:m-c2", "Open Renee's post in Immersive Reader.")],
        },
        {
          instruction: "Close Immersive Reader and change the theme to Light.",
          hint: "Close Immersive Reader › Settings and more (…) › Settings › Appearance and accessibility › Light.",
          steps: [cmd("settings.theme", "Light", "settings", "Change the theme in Settings › Appearance and accessibility.")],
        },
        {
          instruction: "Join the Front Office Huddle and turn on live captions.",
          hint: "Calendar › Front Office Huddle › Join › Join now › More (…) › Captions.",
          steps: [cmd("meeting.joinNow", undefined, "prejoin:e-huddle", "Select Join now on the pre-join screen."), cmd("meeting.captions", "on", "meeting:e-huddle", "Turn on captions from the meeting controls.")],
        },
        {
          instruction: "Raise your hand using the keyboard shortcut or the Raise button.",
          hint: "Press Ctrl+Shift+K (or select Raise).",
          steps: [cmd("meeting.raiseHand", "raise", "meeting:e-huddle", "Raise your hand in the meeting window.")],
        },
      ],
    },
  ],
};

