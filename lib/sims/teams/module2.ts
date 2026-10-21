import type { SimDefinition } from "@/types/sim";
import type { TeamsChat, TeamsDoc } from "@/components/sim/apps/teams/types";
import { cmd, doc, lakeside, typeAll } from "./lakeside";

/* Module 2: Chat */

const HOLIDAY: TeamsChat = {
  id: "c-holiday",
  title: "Holiday Coverage",
  kind: "group",
  members: ["p-omar", "p-jen", "p-tasha"],
  messages: [{ id: "m-ho1", from: "p-omar", time: "8:50 AM", text: "Can someone share the draft holiday schedule here?" }],
};

/** Chats with a few extra messages for the reacting/editing lesson. */
function busyChats(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    chats: d.chats.map((c) =>
      c.id === "c-tasha"
        ? { ...c, messages: [...c.messages, { id: "m-ta2", from: "me", time: "9:15 AM", text: "See you at the potluck!" }] }
        : c.id === "c-lunch"
          ? { ...c, unread: true, messages: [...c.messages, { id: "m-lu2", from: "p-omar", time: "9:14 AM", text: "Chicken wrap for me, thanks!" }] }
          : c,
    ),
  };
}

const LAB_CHATS = (d: TeamsDoc): TeamsDoc => ({ ...d, chats: [...d.chats, HOLIDAY] });

export const teamsModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::start-a-chat": [
    {
      id: "teams-m2-start-a-chat-1",
      app: "teams",
      title: "Start one-on-one and group chats",
      scenario:
        "The label printer at check-in is jammed again, Room 3 needs supplies before the afternoon patients, and Maria is waiting for an answer about lunch coverage. Start the right conversations with the right people.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside()),
      tasks: [
        {
          instruction: "Start a new chat with Luis Ortega and send: “Hi Luis, the label printer at check-in is jammed again. Could you take a look?”",
          hint: "Select New message (the pencil) at the top of the chat list. In To, type Luis and select Luis Ortega. Type the message and press Enter.",
          steps: [typeAll("newchat:p-luis", "Hi Luis, the label printer at check-in is jammed again. Could you take a look?", ["label printer", "jammed"])],
        },
        {
          instruction: "Start a group chat with Marcus Bell and Tasha Greene named “Room 3 Restock.” Send: “Room 3 needs gloves and exam table paper before the 2:00 PM patients.”",
          hint: "New message › add Marcus Bell and Tasha Greene in To. Select the down arrow at the far right of To and type the Group name. Then type the message and press Enter.",
          steps: [
            typeAll("newchat:p-marcus+p-tasha", "Group name: Room 3 Restock\nRoom 3 needs gloves and exam table paper before the 2:00 PM patients.", ["group name: room 3 restock", "gloves", "exam table paper"]),
          ],
        },
        {
          instruction: "Add Omar Haddad to the Room 3 Restock chat. Don't include the chat history.",
          hint: "In the Room 3 Restock chat, select View and add participants (the person icon at the top right) › Add people. Type Omar and select Omar Haddad, choose Don't include chat history, and select Add.",
          steps: [typeAll("addpeople:chat-p-marcus-p-tasha", "People: Omar Haddad\nHistory: Don't include chat history", ["omar haddad", "don't include"])],
        },
        {
          instruction: "Pin the Room 3 Restock chat.",
          hint: "Point to Room 3 Restock in the chat list › More options (…) › Pin.",
          steps: [cmd("chat.pin", undefined, "chat:chat-p-marcus-p-tasha", "Pin the Room 3 Restock chat.")],
        },
        {
          instruction: "Open your chat with Maria Santos and send: “Sounds good. I'll be at the check-in window at noon.”",
          hint: "Chat › Maria Santos. Type the message and press Enter.",
          steps: [typeAll("chat:c-maria", "Sounds good. I'll be at the check-in window at noon.", ["check-in window", "noon"])],
        },
      ],
    },
    {
      id: "teams-m2-start-a-chat-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Organize Friday coverage",
      scenario:
        "Dr. Shah is out Friday afternoon and her patients need to be called and rescheduled. Pull the right people into one conversation, bring in your manager, and send a quick update to the practice administrator. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside()),
      tasks: [
        {
          instruction: "Start a group chat with Omar Haddad and Jen Cole named “Friday Coverage.” Send: “Dr. Shah is out Friday afternoon. Can we split the reschedule calls?”",
          hint: "New message › To: Omar Haddad and Jen Cole › down arrow at the far right of To › Group name. Type the message and press Enter.",
          steps: [typeAll("newchat:p-jen+p-omar", "Group name: Friday Coverage\nDr. Shah is out Friday afternoon. Can we split the reschedule calls?", ["group name: friday coverage", "reschedule calls"])],
        },
        {
          instruction: "Add Maria Santos to the Friday Coverage chat and include all chat history.",
          hint: "View and add participants › Add people › Maria Santos › Include all chat history › Add.",
          steps: [typeAll("addpeople:chat-p-jen-p-omar", "People: Maria Santos\nHistory: Include all chat history", ["maria santos", "include all chat history"])],
        },
        {
          instruction: "Pin the Friday Coverage chat.",
          hint: "Point to Friday Coverage › More options (…) › Pin.",
          steps: [cmd("chat.pin", undefined, "chat:chat-p-jen-p-omar", "Pin the Friday Coverage chat.")],
        },
        {
          instruction: "Start a one-on-one chat with Renee Walker and send: “Hi Renee, I finished the annual privacy training.”",
          hint: "New message › To: Renee Walker. Type the message and press Enter.",
          steps: [typeAll("newchat:p-renee", "Hi Renee, I finished the annual privacy training.", ["privacy training"])],
        },
        {
          instruction: "Hide the Front Desk Lunch Orders chat.",
          hint: "Point to Front Desk Lunch Orders › More options (…) › Hide.",
          steps: [cmd("chat.hide", undefined, "chat:c-lunch", "Hide the Front Desk Lunch Orders chat.")],
        },
      ],
    },
  ],

  "module-2::write-clear-messages": [
    {
      id: "teams-m2-write-clear-messages-1",
      app: "teams",
      title: "Write messages people can act on",
      scenario:
        "Today you need to confirm a shift, send Kevin a short list, claim reschedule calls in the Scheduling channel, warn Maria about a fire alarm test, and tell Tasha a patient is ready, without sharing more patient information than she needs.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(lakeside()),
      tasks: [
        {
          instruction: "In your chat with Maria Santos, send “The 12:00 to 1:00 PM check-in shift is covered.” with “12:00 to 1:00 PM” in bold.",
          hint: "Chat › Maria Santos. Type The, press Ctrl+B (or select Format › Bold), type 12:00 to 1:00 PM, press Ctrl+B again to turn bold off, finish the sentence, and press Enter.",
          steps: [typeAll("chat:c-maria", "The **12:00 to 1:00 PM** check-in shift is covered.", ["**12:00 to 1:00 pm**", "covered"])],
        },
        {
          instruction: "In your chat with Kevin Patel, send “Bring these to the billing meeting:” followed by a bulleted list: “Copay log” and “Refund requests.”",
          hint: "Chat › Kevin Patel. Type the first line, press Shift+Enter for a new line, select Format › Bulleted list, type Copay log, Shift+Enter, Refund requests, then press Enter to send.",
          steps: [typeAll("chat:c-kevin", "Bring these to the billing meeting:\n- Copay log\n- Refund requests", ["billing meeting", "- copay log", "- refund requests"])],
        },
        {
          instruction: "In the Scheduling channel, reply to Maria's post about Dr. Shah. @mention Omar Haddad: “@Omar Haddad I'll take the 2:00 to 4:00 PM calls.”",
          hint: "Front Office › Scheduling. Under Maria's post, select Reply. Type @Om and pick Omar Haddad from the list, type the rest, and press Enter.",
          steps: [typeAll("reply:m-s1", "@Omar Haddad I'll take the 2:00 to 4:00 PM calls.", ["@omar haddad", "2:00 to 4:00"])],
        },
        {
          instruction: "In your chat with Maria, mark a message as Important and send: “The fire alarm test is at 3:00 PM today. Please warn patients in the waiting room.”",
          hint: "Chat › Maria Santos. Select Actions and apps (+) › Set delivery options › Important. Type the message and press Enter.",
          steps: [
            cmd("compose.delivery", "Important", "chat:c-maria", "Set the delivery option in your chat with Maria."),
            typeAll("chat:c-maria", "The fire alarm test is at 3:00 PM today. Please warn patients in the waiting room.", ["fire alarm", "3:00 pm"]),
          ],
        },
        {
          instruction: "Tasha needs to know the 10:30 patient is ready for her. Send her only what she needs: “The 10:30 patient is checked in and ready for vitals in Room 2.”",
          hint: "Chat › Tasha Greene. Type the message (no patient name or health details) and press Enter.",
          steps: [typeAll("chat:c-tasha", "The 10:30 patient is checked in and ready for vitals in Room 2.", ["10:30", "room 2"])],
        },
      ],
    },
    {
      id: "teams-m2-write-clear-messages-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Clear messages for a busy afternoon",
      scenario:
        "Send four clear, professional messages that each do one job. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside()),
      tasks: [
        {
          instruction: "In your chat with Kevin Patel, send “Three copays were collected at check-out today, not at check-in.” with “not at check-in” in bold.",
          hint: "Chat › Kevin Patel. Type up to the bold words, press Ctrl+B (or Format › Bold), type not at check-in, press Ctrl+B again to turn bold off, type the period, and press Enter.",
          steps: [typeAll("chat:c-kevin", "Three copays were collected at check-out today, **not at check-in**.", ["**not at check-in**", "copays"])],
        },
        {
          instruction: "In your chat with Maria Santos, send a numbered list with the heading “Before the huddle:” and the items “Print the schedule” and “Check the voicemail.”",
          hint: "Type the heading, press Shift+Enter, select Format › Numbered list, type each item with Shift+Enter between them, then press Enter.",
          steps: [typeAll("chat:c-maria", "Before the huddle:\n1. Print the schedule\n2. Check the voicemail", ["before the huddle", "1. print the schedule", "2. check the voicemail"])],
        },
        {
          instruction: "In the Billing Questions channel, reply to Kevin's reminder and @mention him: “@Kevin Patel Thanks, I updated the check-in checklist.”",
          hint: "Front Office › Billing Questions › Reply under Kevin's post. Type @Kev and pick Kevin Patel.",
          steps: [typeAll("reply:m-b1", "@Kevin Patel Thanks, I updated the check-in checklist.", ["@kevin patel", "check-in checklist"])],
        },
        {
          instruction: "Mark a message to Tasha Greene as Important and send: “Room 2 is out of gloves. I'm bringing a new box now.”",
          hint: "Chat › Tasha Greene › Actions and apps (+) › Set delivery options › Important. Type and press Enter.",
          steps: [
            cmd("compose.delivery", "Important", "chat:c-tasha", "Set the delivery option in your chat with Tasha."),
            typeAll("chat:c-tasha", "Room 2 is out of gloves. I'm bringing a new box now.", ["gloves"]),
          ],
        },
      ],
    },
  ],

  "module-2::react-reply-and-manage": [
    {
      id: "teams-m2-react-reply-and-manage-1",
      app: "teams",
      title: "React, reply, edit, and keep track of messages",
      scenario:
        "Your chats are filling up. Acknowledge messages without adding clutter, answer the right message, fix a mistake you sent, and keep the important messages where you can find them again.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(busyChats(lakeside())),
      tasks: [
        {
          instruction: "React to Maria's message about covering the check-in window with a Like.",
          hint: "Chat › Maria Santos. Point to her message and select 👍 Like in the reaction bar.",
          steps: [cmd("msg.react", "Like", "msg:m-ma1", "React to Maria's message about the check-in window.")],
        },
        {
          instruction: "In Front Desk Lunch Orders, react to Jen's message with the Check mark reaction.",
          hint: "Point to Jen's message › More reactions (the smiley face) › ✅ Check mark.",
          steps: [cmd("msg.react", "Check mark", "msg:m-lu1", "React to Jen's message in Front Desk Lunch Orders.")],
        },
        {
          instruction: "Reply to Jen's message so your answer quotes it: “Turkey on wheat, please.”",
          hint: "Point to Jen's message › More options (…) › Reply. Type the answer and press Enter.",
          steps: [typeAll("reply:m-lu1", "Turkey on wheat, please.", ["turkey on wheat"])],
        },
        {
          instruction: "In your chat with Maria, edit your message “Yes, I can do that.” so it says “Yes, I can cover 12:00 to 1:00.”",
          hint: "Point to your message › Edit (the pencil). Change the text and select Done (or press Enter).",
          steps: [typeAll("edit:m-ma2", "Yes, I can cover 12:00 to 1:00.", ["12:00 to 1:00"])],
        },
        {
          instruction: "Your message “See you at the potluck!” went to Tasha by mistake. Delete it.",
          hint: "Chat › Tasha Greene. Point to your message › More options (…) › Delete.",
          steps: [cmd("msg.delete", undefined, "msg:m-ta2", "Delete your message in the chat with Tasha.")],
        },
        {
          instruction: "Pin Maria's message about the check-in window for everyone in the chat.",
          hint: "Chat › Maria Santos. Point to her message › More options (…) › Pin for everyone.",
          steps: [cmd("msg.pin", undefined, "msg:m-ma1", "Pin Maria's message about the check-in window.")],
        },
        {
          instruction: "Save Kevin's message about the copay quick reference so you can find it later.",
          hint: "Chat › Kevin Patel. Point to his message › More options (…) › Save this message.",
          steps: [cmd("msg.save", undefined, "msg:m-ke1", "Save Kevin's message.")],
        },
      ],
    },
    {
      id: "teams-m2-react-reply-and-manage-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Manage a busy chat list",
      scenario:
        "Work through your chats the way a professional does: acknowledge, answer the right message, fix your own mistake, and flag what you will need later. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(busyChats(lakeside())),
      tasks: [
        {
          instruction: "React to Tasha's thank-you message with Heart.",
          hint: "Chat › Tasha Greene. Point to her message › ❤️ Heart.",
          steps: [cmd("msg.react", "Heart", "msg:m-ta1", "React to Tasha's thank-you message.")],
        },
        {
          instruction: "In Front Desk Lunch Orders, reply to Omar's message so it is quoted: “Got it, chicken wrap for Omar.”",
          hint: "Point to Omar's message › More options (…) › Reply. Type and press Enter.",
          steps: [typeAll("reply:m-lu2", "Got it, chicken wrap for Omar.", ["chicken wrap"])],
        },
        {
          instruction: "Edit your message in Maria's chat to say “Yes, I can cover the window from 12:00 to 1:00.”",
          hint: "Chat › Maria Santos. Point to your message › Edit. Change it and select Done.",
          steps: [typeAll("edit:m-ma2", "Yes, I can cover the window from 12:00 to 1:00.", ["12:00 to 1:00"])],
        },
        {
          instruction: "Mark Kevin's message as unread so you remember to come back to it.",
          hint: "Chat › Kevin Patel. Point to his message › More options (…) › Mark as unread.",
          steps: [cmd("msg.markUnread", undefined, "msg:m-ke1", "Mark Kevin's message as unread.")],
        },
        {
          instruction: "Save Maria's message about the check-in window.",
          hint: "Chat › Maria Santos › point to her message › More options (…) › Save this message.",
          steps: [cmd("msg.save", undefined, "msg:m-ma1", "Save Maria's message.")],
        },
      ],
    },
  ],

  "module-2::share-files-in-chat": [
    {
      id: "teams-m2-share-files-in-chat-1",
      app: "teams",
      title: "Share files in chat",
      scenario:
        "Jen Cole, the temporary receptionist, starts today and needs the front desk procedures, and the Holiday Coverage chat is waiting for the draft schedule you saved on your computer. Share the files with the people who need them, then see where Teams keeps them.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(LAB_CHATS(lakeside())),
      tasks: [
        {
          instruction: "Start a chat with Jen Cole. Attach “Front Desk Procedures.docx” from your cloud files and send: “Here are the front desk procedures for your first day.”",
          hint: "New message › To: Jen Cole. Select Actions and apps (+) › Attach file › Front Desk Procedures.docx. Type the message and press Enter.",
          steps: [
            cmd("compose.attach", "Front Desk Procedures.docx", "newchat:p-jen", "Attach the file in the new chat with Jen Cole."),
            typeAll("newchat:p-jen", "Here are the front desk procedures for your first day.", ["front desk procedures"]),
          ],
        },
        {
          instruction: "In the Holiday Coverage chat, upload “Holiday Coverage Schedule.xlsx” from your device and send: “Here is the draft. Add your name to the days you can work.”",
          hint: "Chat › Holiday Coverage › Actions and apps (+) › Attach file › under Upload from this device, select Holiday Coverage Schedule.xlsx. Type the message and press Enter.",
          steps: [
            cmd("compose.attach", "Holiday Coverage Schedule.xlsx", "chat:c-holiday", "Upload the file in the Holiday Coverage chat."),
            typeAll("chat:c-holiday", "Here is the draft. Add your name to the days you can work.", ["draft"]),
          ],
        },
        {
          instruction: "Teams saved a copy of the schedule in your OneDrive. Open OneDrive, go to the Microsoft Teams Chat Files folder, and open “Holiday Coverage Schedule.xlsx.”",
          hint: "OneDrive › My files › Microsoft Teams Chat Files › Holiday Coverage Schedule.xlsx.",
          judgeFree: true,
          steps: [cmd("files.open", "holiday-coverage-schedule-xlsx", "file:holiday-coverage-schedule-xlsx", "Open the schedule from the Microsoft Teams Chat Files folder.")],
        },
        {
          instruction: "Forward Kevin's message about the copay quick reference to Jen Cole.",
          hint: "Close the file. Chat › Kevin Patel. Point to his message › More options (…) › Forward. In To, type Jen Cole, and select Forward.",
          steps: [typeAll("forward:m-ke1", "To: Jen Cole\nMessage: ", ["to: jen cole"])],
        },
        {
          instruction: "Copy a link to Maria's message about the check-in window.",
          hint: "Chat › Maria Santos. Point to her message › More options (…) › Copy link.",
          steps: [cmd("msg.copyLink", undefined, "msg:m-ma1", "Copy the link to Maria's message.")],
        },
      ],
    },
    {
      id: "teams-m2-share-files-in-chat-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Share the right file with the right people",
      scenario:
        "Share two files and a message with the people who need them, and find where Teams keeps a file you shared in chat. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(LAB_CHATS(lakeside())),
      tasks: [
        {
          instruction: "In your chat with Maria Santos, attach “Reminder Call Script.docx” from your cloud files and send: “Here is the updated reminder call script for your review.”",
          hint: "Chat › Maria Santos › Actions and apps (+) › Attach file › Reminder Call Script.docx. Type and press Enter.",
          steps: [
            cmd("compose.attach", "Reminder Call Script.docx", "chat:c-maria", "Attach the file in your chat with Maria."),
            typeAll("chat:c-maria", "Here is the updated reminder call script for your review.", ["reminder call script"]),
          ],
        },
        {
          instruction: "In the Holiday Coverage chat, upload “Lobby Wait Times - October.xlsx” from your device and send: “October wait times, for our planning.”",
          hint: "Chat › Holiday Coverage › Actions and apps (+) › Attach file › Upload from this device › Lobby Wait Times - October.xlsx. Type and press Enter.",
          steps: [
            cmd("compose.attach", "Lobby Wait Times - October.xlsx", "chat:c-holiday", "Upload the file in the Holiday Coverage chat."),
            typeAll("chat:c-holiday", "October wait times, for our planning.", ["wait times"]),
          ],
        },
        {
          instruction: "Open “Lobby Wait Times - October.xlsx” from the Microsoft Teams Chat Files folder in OneDrive.",
          hint: "OneDrive › My files › Microsoft Teams Chat Files › Lobby Wait Times - October.xlsx.",
          judgeFree: true,
          steps: [cmd("files.open", "lobby-wait-times-october-xlsx", "file:lobby-wait-times-october-xlsx", "Open the file from the Microsoft Teams Chat Files folder.")],
        },
        {
          instruction: "Forward Maria's message about the check-in window to Omar Haddad with the note “FYI for Friday.”",
          hint: "Close the file. Chat › Maria Santos › point to her message › More options (…) › Forward. To: Omar Haddad, add the note, and select Forward.",
          steps: [typeAll("forward:m-ma1", "To: Omar Haddad\nMessage: FYI for Friday.", ["to: omar haddad", "fyi for friday"])],
        },
      ],
    },
  ],
};
