import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/teams/module-2";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const teamsModule2Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "start-a-chat",
    title: "One-on-One and Group Chats",
    description:
      "Start a chat with one person, start and name a group chat, add people with or without the chat history, and keep your chat list organized with Pin, Mute, and Hide.",
    objectives: [
      "Start a one-on-one chat with New message",
      "Start a group chat and give it a name that says what it is for",
      "Add someone to a group chat and decide how much history they see",
      "Organize your chat list with Pin, Mute, and Hide",
    ],
    duration: "15 min",
    slides: slides("start-a-chat", [
      "Chats: private conversations with one person or a small group",
      "Start a one-on-one chat with New message",
      "Start and name a group chat",
      "Add people and choose how much history they see",
      "Pin, Mute, and Hide: keep the chat list under control",
      "Quick check: which chat would you start?",
    ]),
    sections: [
      {
        heading: "Who needs to be in the conversation?",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "The label printer at check-in is jammed again. Room 3 is low on gloves and exam table paper, and the afternoon patients start at 2:00. Maria is waiting to hear whether you can take the noon shift. Three problems, three different groups of people.",
            task: "Start the right chat for each problem, with exactly the people who can solve it.",
          },
          {
            type: "paragraph",
            text: "A chat is a private conversation. Only the people in it can see the messages. Use a one-on-one chat for something between you and one person, and a group chat when a few people need to work something out together. If the whole team needs the information, or will need to find it later, it belongs in a channel instead (Module 3).",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select New message at the top of your list of chats and channels (or press Ctrl+N).",
              "In To, type a name and select the person from the list. Add more names for a group chat (a group chat can include up to 250 people).",
              "To name a group chat, select the down arrow at the far right of To and type a Group name.",
              "Type your message in the box at the bottom and press Enter (or select Send).",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "If you already have a one-on-one chat with someone, New message takes you to that same chat. Teams keeps one ongoing chat per person, so your whole history with them is in one place.",
          },
        ],
      },
      {
        heading: "Name group chats and add the right people",
        blocks: [
          {
            type: "paragraph",
            text: "An unnamed group chat shows up in your list as a string of first names, which is hard to find a week later. A name such as “Room 3 Restock” or “Friday Coverage” says what the chat is for. Name it when you start it.",
          },
          {
            type: "paragraph",
            text: "To bring someone into an existing group chat, select View and add participants (the person icon at the top right of the chat) › Add people, type the name, and select Add. For a group chat, Teams asks how much of the earlier conversation the new person should see. Choose based on what they need: someone joining to help with the restock does not need to read last week's messages, but your manager stepping in to make a decision probably does. You cannot share history when you add someone to a one-on-one chat; Teams starts a new group chat instead.",
          },
          {
            type: "worked-example",
            title: "Setting up the Room 3 restock",
            task: "Get gloves and exam table paper into Room 3 before 2:00 PM.",
            steps: [
              { move: "New message › To: Marcus Bell and Tasha Greene.", why: "Marcus and Tasha work in the clinical area and can check the room. Adding the whole front office would only add noise." },
              { move: "Select the down arrow at the far right of To and type the Group name “Room 3 Restock.”", why: "The name tells everyone what the chat is for, and it is easy to find in the list and in Search later." },
              { move: "Send: “Room 3 needs gloves and exam table paper before the 2:00 PM patients.”", why: "One message says what is needed, where, and by when. Nobody has to ask a follow-up question." },
              { move: "When Omar offers to carry the boxes, add him with View and add participants › Add people, and choose not to include the history.", why: "Omar only needs to know what to carry now. The earlier back-and-forth would not help him." },
            ],
            result: "Four people, one named chat, and the room is stocked before the afternoon patients arrive.",
            takeaway: "Invite only the people who can act, name the chat after its purpose, and add people with the history they actually need.",
          },
        ],
      },
      {
        heading: "Keep your chat list organized",
        blocks: [
          {
            type: "table",
            caption: "Pin, Mute, and Hide (point to a chat › More options (…))",
            columns: ["Command", "What it does", "Use it for"],
            rows: [
              ["Pin", "Moves the chat into Favorites at the top of the list", "Chats you use every day, like your manager's"],
              ["Mute", "Stops notifications; the chat stays in your list", "Busy social chats, such as lunch orders"],
              ["Hide", "Removes the chat from your list until someone sends a new message", "Finished conversations you want out of the way"],
              ["Mark as unread", "Shows the chat in bold again", "A reminder to come back and answer"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pin, Mute, Hide, or Mark as unread?",
            prompt: "Drag each command onto the situation it fits.",
            items: [
              { id: "a", text: "Your chat with Maria, which you check all day", match: "Pin" },
              { id: "b", text: "The lunch-order chat that pings every few minutes", match: "Mute" },
              { id: "c", text: "Last month's chat about a holiday party that is over", match: "Hide" },
              { id: "d", text: "A question from Kevin you will answer after the line clears", match: "Mark as unread" },
            ],
            explanation: "Pin what you need close, mute what is noisy, hide what is finished, and mark as unread what you still owe someone an answer on.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Omar is joining the Friday Coverage group chat so he can help decide who calls which patients. The earlier messages list the times already covered. What should you do when you add him?",
            options: ["Start a new chat without Maria and Jen", "Add him and include the chat history", "Add him and don't include any history", "Forward every earlier message to him one at a time"],
            correctIndex: 1,
            explanation: "He needs the earlier messages to make the decision, so include the history when you add him.",
            optionRationales: [
              "Splitting the conversation means the group no longer sees the same messages.",
              "Correct.",
              "Without the history, Omar would have to ask for everything that was already decided.",
              "Forwarding one by one is slow and clutters his chat list. Including history does it in one step.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which is the best name for a group chat about covering the check-in window while Omar is on vacation?",
            options: ["Chat", "Omar, Jen, Tasha", "Check-in Coverage: Omar's Vacation", "URGENT!!!"],
            correctIndex: 2,
            explanation: "A good name says what the chat is for, so anyone can find it and know why they are in it.",
            optionRationales: [
              "Every chat is a chat; this says nothing.",
              "This is what Teams shows when there is no name. It does not say what the chat is about.",
              "Correct.",
              "Shouting in a name is unprofessional and does not describe the topic.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Dr. Shah is out Friday afternoon and her patients need to be rescheduled. Organize the conversation in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Start a group chat with Omar Haddad and Jen Cole named “Friday Coverage.” Send: “Dr. Shah is out Friday afternoon. Can we split the reschedule calls?”",
          "Add Maria Santos to the Friday Coverage chat and include all chat history.",
          "Pin the Friday Coverage chat.",
          "Start a one-on-one chat with Renee Walker and send: “Hi Renee, I finished the annual privacy training.”",
          "Hide the Front Desk Lunch Orders chat.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "write-clear-messages",
    title: "Write Clear Messages: Formatting, @Mentions, and Delivery Options",
    description:
      "Write chat messages that people can act on: use formatting and lists, @mention the right person, mark urgent information as Important, and share only the patient information someone needs.",
    objectives: [
      "Use Format to add bold text and bulleted or numbered lists, and Shift+Enter for a new line",
      "@mention a person so they get a notification",
      "Mark a message as Important with Set delivery options",
      "Apply the minimum necessary rule to messages about patients",
    ],
    duration: "18 min",
    slides: slides("write-clear-messages", [
      "Messages people can act on",
      "Format: bold, lists, and new lines",
      "@mentions get the right person's attention",
      "Set delivery options: mark a message Important",
      "Minimum necessary: only the patient information someone needs",
      "Before you press Enter: a five-second checklist",
    ]),
    sections: [
      {
        heading: "A message should do one job",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Kevin asked what to bring to the billing meeting. Maria wants confirmation of the noon shift. The fire alarm test is at 3:00 PM and somebody needs to warn the waiting room. Tasha needs to know the 10:30 patient is ready for vitals. Each of these takes one short message, if it is written well.",
            task: "Write messages that are easy to read, reach the right person, and share no more patient information than needed.",
          },
          {
            type: "paragraph",
            text: "Chat feels casual, but at work it is still business writing. A good chat message is short, gives the key detail first, and makes the next step obvious. If someone has to ask “Which shift?” or “Which room?”, the message did not do its job.",
          },
          {
            type: "table",
            caption: "Rewrite for clarity",
            columns: ["Unclear", "Clear"],
            rows: [
              ["“ok”", "“Yes, I'll cover the check-in window from 12:00 to 1:00 PM.”"],
              ["“the thing is broken again”", "“The label printer at check-in is jammed again. Could you take a look?”"],
              ["“can u check rm”", "“Can you check whether Room 3 has gloves before the 2:00 PM patients?”"],
            ],
          },
        ],
      },
      {
        heading: "Formatting and lists",
        blocks: [
          {
            type: "paragraph",
            text: "Select Format, to the right of the message box, to see formatting options such as Bold, Italic, Strikethrough, Bulleted list, and Numbered list. Ctrl+B and Ctrl+I also work while you type. Press Shift+Enter to start a new line without sending; pressing Enter on its own sends the message. To get a bigger box for a longer message, select Format or press Ctrl+Shift+X.",
          },
          {
            type: "list",
            items: [
              "Bold one key detail, such as a time or a room, so it stands out. Bolding everything means nothing stands out.",
              "Use a bulleted list for items in any order, such as things to bring.",
              "Use a numbered list for steps that happen in order.",
              "Keep emoji for friendly moments, not for important instructions.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the steps in order",
            prompt: "Drag the steps for sending Kevin a bulleted list into the right order.",
            items: [
              { id: "1", text: "Type “Bring these to the billing meeting:”" },
              { id: "2", text: "Press Shift+Enter to start a new line" },
              { id: "3", text: "Select Format › Bulleted list" },
              { id: "4", text: "Type each item, pressing Shift+Enter between them" },
              { id: "5", text: "Press Enter to send" },
            ],
            explanation: "Shift+Enter adds a line without sending. Enter on its own sends the message.",
          },
        ],
      },
      {
        heading: "@mentions and Important messages",
        blocks: [
          {
            type: "paragraph",
            text: "Type @ followed by the first few letters of a name, then pick the person from the list. The name turns into a highlighted @mention, and that person gets a notification in their Activity feed, even in a busy channel. @mention people when you need something from them, not to tag everyone on every message.",
          },
          {
            type: "paragraph",
            text: "When a message must not be missed, mark it Important before you send it: select Actions and apps (+) next to the message box › Set delivery options › Important. The message appears with the label IMPORTANT! To remove the label from a message you already sent, edit the message and choose Standard. Save Important for messages that truly are, or people learn to ignore it.",
          },
          {
            type: "worked-example",
            title: "Warning about the fire alarm test",
            task: "Make sure Maria knows to warn the waiting room before the 3:00 PM fire alarm test.",
            steps: [
              { move: "Open the chat with Maria and select Actions and apps (+) › Set delivery options › Important.", why: "This is time-sensitive and affects patients. The IMPORTANT! label makes it stand out from routine messages." },
              { move: "Type: “The fire alarm test is at 3:00 PM today. Please warn patients in the waiting room.”", why: "It says what happens, when, and what you need Maria to do." },
              { move: "Press Enter.", why: "Done in one message. No follow-up needed." },
            ],
            result: "Maria sees a clearly marked message with the time and the action.",
            takeaway: "Key detail first, one clear request, and Important only when it truly matters.",
          },
        ],
      },
      {
        heading: "Patient information: minimum necessary",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "HIPAA's minimum necessary standard means sharing only the patient information someone needs to do their job. In Teams at Lakeside, that usually means no patient names with health details, no dates of birth, and no diagnoses. Refer to patients the way the office allows, such as by appointment time and room. Clinical details belong in the EHR.",
          },
          {
            type: "table",
            caption: "Rewrite to the minimum necessary",
            columns: ["Too much", "Minimum necessary"],
            rows: [
              ["“Mrs. [name], DOB [date], is here for her diabetes follow-up and is in Room 2.”", "“The 10:30 patient is checked in and ready for vitals in Room 2.”"],
              ["“Can you call [name] about his positive test result?”", "“There is a callback in the EHR task list for you.”"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Okay to send in a Teams chat at Lakeside?",
            prompt: "Sort each message.",
            buckets: [
              { id: "ok", label: "Okay to send" },
              { id: "no", label: "Rewrite it first" },
            ],
            items: [
              { id: "a", text: "The 10:30 patient is ready for vitals in Room 2.", bucket: "ok" },
              { id: "b", text: "[Patient name] is here about her pregnancy test results.", bucket: "no" },
              { id: "c", text: "Room 3 needs gloves before 2:00 PM.", bucket: "ok" },
              { id: "d", text: "Here is [patient name]'s date of birth and insurance number for the claim.", bucket: "no" },
              { id: "e", text: "There is a new callback in the EHR task list for you.", bucket: "ok" },
            ],
            explanation: "Messages about schedules, rooms, and supplies are fine. Anything that ties a patient's identity to health or insurance details stays in the EHR.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are typing a list in a chat and want to start the next line without sending the message. What do you press?",
            options: ["Enter", "Shift+Enter", "Ctrl+Enter", "Tab"],
            correctIndex: 1,
            explanation: "Shift+Enter starts a new line. Enter alone sends the message.",
            optionRationales: ["Enter sends the message.", "Correct.", "Ctrl+Enter is not how you add a line in Teams chat.", "Tab moves to the next control."],
          },
          {
            type: "knowledge-check",
            question: "How do you mark a chat message as Important before sending it?",
            options: ["Type IMPORTANT in capital letters", "Actions and apps (+) › Set delivery options › Important", "Pin the message", "Bold the whole message"],
            correctIndex: 1,
            explanation: "Set delivery options › Important adds the IMPORTANT! label that Teams displays on the message.",
            optionRationales: [
              "Capital letters read as shouting and do not add the Important label.",
              "Correct.",
              "Pinning keeps a message at the top of the chat but does not mark it Important.",
              "Bolding everything makes the message harder to read.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Send four clear messages in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your chat with Kevin Patel, send “Three copays were collected at check-out today, not at check-in.” with “not at check-in” in bold.",
          "In your chat with Maria Santos, send a numbered list with the heading “Before the huddle:” and the items “Print the schedule” and “Check the voicemail.”",
          "In the Billing Questions channel, reply to Kevin's reminder and @mention him: “@Kevin Patel Thanks, I updated the check-in checklist.”",
          "Mark a message to Tasha Greene as Important and send: “Room 2 is out of gloves. I'm bringing a new box now.”",
          "In a Word document or on paper, rewrite this message to the minimum necessary: “[Patient name], born in 1958, is in Room 4 waiting for her mammogram results.”",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) and your rewritten message to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "react-reply-and-manage",
    title: "React, Reply, Edit, and Keep Track of Messages",
    description:
      "Acknowledge messages with reactions, reply to a specific message, fix mistakes with Edit and Delete, and use Pin for everyone, Save this message, Mark as unread, and Search to keep track of what matters.",
    objectives: [
      "Use a reaction instead of a one-word reply, and pick from More reactions",
      "Reply to a specific message so your answer quotes it",
      "Edit a message you sent, and delete (or undo deleting) one sent by mistake",
      "Keep track of messages with Pin for everyone, Save this message, Mark as unread, and Search",
    ],
    duration: "18 min",
    slides: slides("react-reply-and-manage", [
      "Fewer messages, clearer chats",
      "Reactions: acknowledge without adding a message",
      "Reply to a specific message",
      "Edit and Delete: fix your mistakes",
      "Pin for everyone, Save, and Mark as unread",
      "Find it again: Search and the Saved list",
    ]),
    sections: [
      {
        heading: "Acknowledge without adding clutter",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Your lunch-order chat has 31 messages, and 14 of them say “ok” or “thanks.” The question you needed to answer is buried in the middle. You also just noticed that the message you sent Tasha was meant for the potluck chat.",
            task: "Use reactions, replies, and message tools so conversations stay short and easy to follow, and fix your own mistakes cleanly.",
          },
          {
            type: "paragraph",
            text: "Point to a message and Teams shows a small bar with up to five quick reactions, such as 👍 Like and ❤️ Heart. Select one and it appears under the message. Select More reactions (the smiley face) to pick from many more, such as ✅. Select a reaction you already added to remove it. You can add several different reactions to one message (up to 20). A reaction tells the sender “seen and understood” without starting a new message that everyone has to read.",
          },
          {
            type: "paragraph",
            text: "When you need to answer a specific earlier message, point to it and choose Reply from More options (…). Your answer appears with a quote of the original, so nobody has to guess what “Turkey on wheat” is answering.",
          },
        ],
      },
      {
        heading: "Fix mistakes",
        blocks: [
          {
            type: "table",
            caption: "Changing a message you sent",
            columns: ["To", "Do this", "What others see"],
            rows: [
              ["Fix a typo or detail", "Point to the message › Edit (pencil). Change it and select Done.", "Your corrected message, marked Edited"],
              ["Remove a message", "Point to it › More options (…) › Delete", "This message has been deleted."],
              ["Bring it back", "Select Undo on the deleted message", "The original message"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Deleting a message is not a privacy fix. If you sent patient information to the wrong person, delete the message and then tell your supervisor or privacy officer, following Lakeside's policy. Someone may have already read it or received a notification with a preview.",
          },
          {
            type: "worked-example",
            title: "The message that went to the wrong chat",
            task: "“See you at the potluck!” went to Tasha instead of the Staff Events channel.",
            steps: [
              { move: "In the chat with Tasha, point to the message › More options (…) › Delete.", why: "The message is not for Tasha, and leaving it would confuse her." },
              { move: "Post the message where it belongs.", why: "Deleting fixes the wrong chat; you still need to say it in the right place." },
              { move: "If the wrong message had contained patient details, report it as well.", why: "A notification preview may already have shown the content. Reporting it is part of the fix." },
            ],
            result: "Tasha's chat is clean and the message is where it belongs.",
            takeaway: "Edit fixes words; Delete removes a message from the chat; neither one erases what someone may already have seen.",
          },
        ],
      },
      {
        heading: "Keep track of what matters",
        blocks: [
          {
            type: "table",
            caption: "Tools for finding messages again (point to a message › More options (…))",
            columns: ["Command", "What it does"],
            rows: [
              ["Pin for everyone", "Shows the message at the top of the chat for everyone. Only one message is pinned at a time; Unpin for everyone removes it."],
              ["Save this message", "Adds the message to the Saved section at the top of your chat list (only you see it)."],
              ["Mark as unread", "Turns the message bold again so you remember to come back to it."],
              ["Copy link", "Copies a link to the exact message to paste somewhere else."],
              ["Forward", "Sends a copy of the message to another chat, with an optional note."],
            ],
          },
          {
            type: "paragraph",
            text: "To find an older message, use Search at the top of Teams (Ctrl+E). Type a few words you remember, such as “holiday schedule,” and choose a result. Saved messages also appear in the Saved section of your chat list.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which tool?",
            prompt: "Drag each tool onto the job it does.",
            items: [
              { id: "a", text: "Everyone in the chat should always see the shift times at the top", match: "Pin for everyone" },
              { id: "b", text: "You want your own bookmark to Kevin's copay reminder", match: "Save this message" },
              { id: "c", text: "You read a question but cannot answer it until after lunch", match: "Mark as unread" },
              { id: "d", text: "You typed 1:00 instead of 12:00 in a message you sent", match: "Edit" },
              { id: "e", text: "You need to acknowledge a message without writing back", match: "Reaction" },
            ],
            explanation: "Each tool keeps the chat shorter or helps you find something again without scrolling.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Maria posts the week's shift times in a group chat and wants everyone to see them at the top of the chat. What should she use?",
            options: ["Save this message", "Pin for everyone", "Mark as unread", "Copy link"],
            correctIndex: 1,
            explanation: "Pin for everyone shows the message at the top of the chat for everyone in it.",
            optionRationales: [
              "Save is a personal bookmark; others do not see it.",
              "Correct.",
              "Mark as unread only affects Maria's own view.",
              "Copy link copies a link; it does not keep the message visible.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You deleted a message by mistake a moment ago. How do you get it back?",
            options: ["It is gone forever", "Select Undo on the deleted message", "Ask IT to restore it", "Forward it to yourself"],
            correctIndex: 1,
            explanation: "Teams shows Undo on a message you deleted, which brings it back.",
            optionRationales: ["Teams lets you undo a delete.", "Correct.", "You can undo it yourself.", "You cannot forward a deleted message."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work through your chats in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "React to Tasha's thank-you message with Heart.",
          "In Front Desk Lunch Orders, reply to Omar's message so it is quoted: “Got it, chicken wrap for Omar.”",
          "Edit your message in Maria's chat to say “Yes, I can cover the window from 12:00 to 1:00.”",
          "Mark Kevin's message as unread so you remember to come back to it.",
          "Save Maria's message about the check-in window.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "share-files-in-chat",
    title: "Share Files in Chat",
    description:
      "Attach files from the cloud or your computer, find shared files on a chat's Shared tab, understand where Teams stores chat files and who can open them, and forward messages and links.",
    objectives: [
      "Attach a cloud file or upload a file from your device with Actions and apps › Attach file",
      "Find files shared in a chat on its Shared tab",
      "Explain where Teams stores chat files (Microsoft Teams Chat Files in your OneDrive) and who can open them",
      "Forward a message and copy a link to a message",
    ],
    duration: "15 min",
    slides: slides("share-files-in-chat", [
      "Share the one real file, not copies",
      "Attach file: cloud files or upload from this device",
      "Where chat files go: Microsoft Teams Chat Files in your OneDrive",
      "Who can open a file you shared in chat",
      "The Shared tab, Forward, and Copy link",
      "Files and patient information",
    ]),
    sections: [
      {
        heading: "Share files where the conversation is",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Jen Cole, the temporary receptionist, starts today and needs the front desk procedures. The Holiday Coverage chat is waiting for the draft schedule you saved on your computer. Last year someone emailed the schedule to six people, everyone edited their own copy, and nobody knew which version was right.",
            task: "Share each file with the people who need it, in the conversation where they are already talking.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "In the chat, select Actions and apps (+) next to the message box › Attach file.",
              "Pick a recent file, choose Attach cloud files to pick a file from OneDrive or Teams, or choose Upload from this device for a file on your computer.",
              "Add a short message that says why you are sharing it, and press Enter.",
            ],
          },
          {
            type: "paragraph",
            text: "Teams shows a preview for images, videos, and many document types. Every file shared in a chat is collected on the chat's Shared tab at the top of the conversation, so nobody has to scroll back through messages to find it.",
          },
        ],
      },
      {
        heading: "Where chat files are stored",
        blocks: [
          {
            type: "paragraph",
            text: "When you upload a file in a one-on-one or group chat, Teams saves it in your OneDrive, in a folder named Microsoft Teams Chat Files, and shares it only with the people in that chat. Files shared in a channel are different: they are stored in the team's SharePoint site and appear on the channel's Shared tab (Module 3). This is why it matters where you share: a file you upload in chat lives in your OneDrive, and if you leave the organization, files in your OneDrive can be removed along with your account.",
          },
          {
            type: "table",
            caption: "Chat files and channel files",
            columns: ["", "Shared in a chat", "Shared in a channel"],
            rows: [
              ["Stored in", "Your OneDrive › Microsoft Teams Chat Files", "The team's SharePoint site"],
              ["Who can open it", "The people in that chat", "Members of the team"],
              ["Find it on", "The chat's Shared tab", "The channel's Shared tab"],
              ["Best for", "A file for a few people", "Files the whole team uses and keeps"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Chat or channel?",
            prompt: "Where should each file be shared?",
            buckets: [
              { id: "chat", label: "In a chat" },
              { id: "channel", label: "In a channel" },
            ],
            items: [
              { id: "a", text: "Your draft of a reminder script, for Maria to review", bucket: "chat" },
              { id: "b", text: "The final New Patient Intake Packet everyone uses", bucket: "channel" },
              { id: "c", text: "A spreadsheet of wait times for the three people planning holiday coverage", bucket: "chat" },
              { id: "d", text: "The copay quick reference for the whole front office", bucket: "channel" },
            ],
            explanation: "Drafts and files for a few people fit in a chat. Files the team uses and needs to keep belong in the team's channel.",
          },
        ],
      },
      {
        heading: "Forward and link to messages",
        blocks: [
          {
            type: "paragraph",
            text: "To pass a message along, point to it › More options (…) › Forward, choose the person or chat, add an optional note, and select Forward. To point someone to a message instead of copying it, choose Copy link and paste the link where you need it. Only people who can already see that chat or channel can open a message link.",
          },
          {
            type: "worked-example",
            title: "Getting the schedule to the holiday group",
            task: "Share the draft holiday schedule from your computer with the Holiday Coverage chat.",
            steps: [
              { move: "Open the Holiday Coverage chat and select Actions and apps (+) › Attach file › Upload from this device.", why: "The file is on your computer, so you upload it. Teams stores the uploaded copy in your OneDrive." },
              { move: "Pick Holiday Coverage Schedule.xlsx and type: “Here is the draft. Add your name to the days you can work.”", why: "The message says what the file is and exactly what you want people to do with it." },
              { move: "Press Enter, then check OneDrive › My files › Microsoft Teams Chat Files.", why: "That folder holds the copy everyone in the chat opens. From now on, edit that one, not the copy on your desktop." },
            ],
            result: "Three coworkers edit the same file, and there is only one version of the schedule.",
            takeaway: "Share one file in the conversation and work on that file; do not pass copies around.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Before you attach a file, check its contents. Files with patient information belong only in the locations Lakeside approves and only with people who need them. Never upload patient lists or forms to a group chat that includes people who do not need them, or to any chat with someone outside Lakeside.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You upload a spreadsheet in a group chat. Where does Teams store it?",
            options: ["On your computer's desktop", "In your OneDrive, in the Microsoft Teams Chat Files folder", "In every chat member's Downloads folder", "In the Front Office team's SharePoint site"],
            correctIndex: 1,
            explanation: "Files uploaded in chats are stored in the sender's OneDrive, in Microsoft Teams Chat Files, and shared with the people in the chat.",
            optionRationales: [
              "Teams uploads a copy to the cloud; the chat does not use your desktop copy.",
              "Correct.",
              "Nobody gets a download unless they choose to download it.",
              "Channel files go to the team's SharePoint site; chat files do not.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Where do you look for every file that was shared in a particular chat?",
            options: ["The chat's Shared tab", "The Activity feed", "Calendar", "Settings"],
            correctIndex: 0,
            explanation: "The Shared tab at the top of the chat lists the files shared in that conversation.",
            optionRationales: ["Correct.", "Activity lists notifications, not files.", "Calendar lists meetings.", "Settings holds preferences."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Share files and messages in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your chat with Maria Santos, attach “Reminder Call Script.docx” from your cloud files and send: “Here is the updated reminder call script for your review.”",
          "In the Holiday Coverage chat, upload “Lobby Wait Times - October.xlsx” from your device and send: “October wait times, for our planning.”",
          "Open “Lobby Wait Times - October.xlsx” from the Microsoft Teams Chat Files folder in OneDrive.",
          "Forward Maria's message about the check-in window to Omar Haddad with the note “FYI for Friday.”",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },
];
