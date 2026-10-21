import type { SimDefinition } from "@/types/sim";
import { OPEN, mentions, msg, recipients, signaturesStep } from "@/components/sim/apps/outlook/simkit";
import { BRIGHT, DENISE, HILL, IMAGING, KEISHA, LUIS, ME, OMAR, PATEL, PRIYA, lakeside } from "./fixtures";

/* Module 2: Writing Professional Email (new Outlook for Windows). */

const sendStep = { action: { kind: "command" as const, id: "compose.send" } };

export const outlookModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::compose-message": [
    {
      id: "ol-m2-compose-message-1",
      app: "outlook-new",
      title: "Write four clear messages",
      scenario:
        "Billing needs to know the insurance cards are scanned, Omar needs a high-importance heads-up about Saturday, Priya and Luis need to coordinate the fridge log, and three flu clinic volunteers need a reminder without seeing each other's addresses.",
      fileName: "Inbox",
      minutes: 8,
      initial: lakeside(
        [
          msg("m1", KEISHA, "Insurance card copies", "Hi Taylor, can you scan the insurance cards for this afternoon's new patients and let me know when they are done? Thanks, Keisha", "2026-10-20T08:20", { to: [ME] }),
          msg("m2", DENISE, "Flu clinic Saturday", "Taylor, please remind Omar that the flu clinic handouts must be at the front desk by 7:45 AM Saturday. Denise", "2026-10-20T08:05", { to: [ME] }),
        ],
        {
          groups: [{ id: "g1", name: "Flu Clinic Volunteers", members: ["sam.lee@example.net", "rosa.diaz@example.net", "kai.nguyen@example.net"] }],
        },
      ),
      tasks: [
        {
          instruction:
            'Send a new message to Keisha Grant with a copy (Cc) to Denise Carter. Use the subject "Insurance cards scanned: 3 new patients" and the text "Hi Keisha, I scanned the insurance cards for this afternoon\'s three new patients."',
          hint: "Home tab › New mail. Type Keisha in To and pick her. Select Cc and type Denise. Type the subject in Add a subject, type the text, and select Send.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(KEISHA.email) } },
            { action: { kind: "type", target: "compose.cc", value: recipients(DENISE.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Insurance cards scanned: 3 new patients" } },
            mentions("compose.body", "Hi Keisha, I scanned the insurance cards for this afternoon's three new patients.", ["scanned the insurance cards", "three new patients"]),
            sendStep,
          ],
        },
        {
          instruction:
            'Send Omar Haddad a message marked High importance, with the subject "Flu clinic Saturday: handouts by 7:45 AM" and the text "Omar, please have the flu clinic handouts at the front desk by 7:45 AM on Saturday."',
          hint: "New mail, then Options tab › High importance. Fill in To, the subject and the text, and select Send.",
          steps: [
            OPEN.email,
            { action: { kind: "command", id: "message.importanceHigh" } },
            { action: { kind: "type", target: "compose.to", value: recipients(OMAR.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Flu clinic Saturday: handouts by 7:45 AM" } },
            mentions("compose.body", "Omar, please have the flu clinic handouts at the front desk by 7:45 AM on Saturday.", ["7:45 AM", "Saturday"]),
            sendStep,
          ],
        },
        {
          instruction:
            'Send a message to Priya Nair with the subject "Vaccine fridge log binder". In the text, @mention Luis Ortega so he is added to the message: "@Luis Ortega can you bring the fridge log binder to Priya before noon?"',
          hint: "New mail, type Priya in To and the subject. In the message text, type @Lu and pick Luis Ortega from the list. Outlook adds him to the To line. Finish the sentence and select Send.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(PRIYA.email, LUIS.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Vaccine fridge log binder" } },
            mentions("compose.body", "@Luis Ortega can you bring the fridge log binder to Priya before noon?", ["@Luis Ortega", "fridge log binder"]),
            sendStep,
          ],
        },
        {
          instruction:
            'Remind the three flu clinic volunteers without showing their addresses to each other: send a message To yourself with the "Flu Clinic Volunteers" contact list in Bcc, the subject "Flu clinic reminder: Saturday 8:00 AM", and the text "Thank you for volunteering. Please arrive at 8:00 AM."',
          hint: "New mail, then select Bcc at the right end of the To line (or Options tab › Show Bcc). Put your own address in To, type Flu in Bcc and pick the list, then add the subject and text and select Send.",
          steps: [
            OPEN.email,
            { action: { kind: "command", id: "compose.bcc" } },
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.bcc", value: recipients("Flu Clinic Volunteers") } },
            { action: { kind: "type", target: "compose.subject", value: "Flu clinic reminder: Saturday 8:00 AM" } },
            mentions("compose.body", "Thank you for volunteering. Please arrive at 8:00 AM.", ["8:00 AM"]),
            sendStep,
          ],
        },
      ],
    },
  ],

  "module-2::reply-forward": [
    {
      id: "ol-m2-reply-forward-1",
      app: "outlook-new",
      title: "Reply, reply all, or forward?",
      scenario:
        "Four messages need an answer. One went to the whole staff but asks for direct replies, one is a small team thread where everyone needs your update, one belongs with Dr. Patel, and one has a subject line nobody will be able to search for later.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside([
        msg("m1", DENISE, "Who can cover Saturday's flu clinic?", "Hi everyone,\n\nWho can cover the flu clinic on Saturday morning? Please reply to me directly, not to the whole list.\n\nDenise", "2026-10-20T08:50", { to: [ME, OMAR, PRIYA, LUIS, KEISHA, HILL] }),
        msg("m2", PRIYA, "Room 3 supply check", "Luis and Taylor,\n\nRoom 3 is low on gloves and exam table paper. Whoever restocks it, please reply all so we don't both do it.\n\nPriya", "2026-10-20T08:30", { to: [ME, LUIS] }),
        msg("m3", IMAGING, "Appointment confirmation: MRI referral", "Hello,\n\nThe referred patient is scheduled for an MRI on Thursday at 10:30 AM at Riverside Imaging.\n\nRiverside Imaging Scheduling", "2026-10-20T08:12", { to: [ME], external: true, attachments: [{ name: "MRI Confirmation.pdf", size: "96 KB" }] }),
        msg("m4", KEISHA, "Question", "Hi Taylor,\n\nDo you know where the copay amount is listed for Metro Health Plan visits?\n\nKeisha", "2026-10-19T15:40", { to: [ME] }),
      ]),
      tasks: [
        {
          instruction: 'Denise sent "Who can cover Saturday\'s flu clinic?" to six people and asked for direct replies. Answer only Denise with "I can cover the flu clinic on Saturday from 8:00 AM to 12:00 PM."',
          hint: "Select the message, then Reply (Home tab, or the arrow at the top of the message). Not Reply all. Type the text and select Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Denise Carter's message first." },
            mentions("compose.body", "I can cover the flu clinic on Saturday from 8:00 AM to 12:00 PM.", ["Saturday", "8:00 AM"]),
            sendStep,
          ],
        },
        {
          instruction: 'Priya asked for a reply to everyone on "Room 3 supply check". Answer so both Priya and Luis see it: "I restocked the gloves and exam table paper in Room 3."',
          hint: "Select the message, then Reply all. Type the text and select Send.",
          steps: [
            { action: { kind: "command", id: "mail.replyAll" }, requires: { selection: "msg:m2" }, selectHint: "Select Priya Nair's message first." },
            mentions("compose.body", "I restocked the gloves and exam table paper in Room 3.", ["restocked", "Room 3"]),
            sendStep,
          ],
        },
        {
          instruction: 'Forward Riverside Imaging\'s "Appointment confirmation: MRI referral" to Dr. Anita Patel with the note "Dr. Patel, Riverside Imaging confirmed the MRI for Thursday at 10:30 AM. The confirmation is attached."',
          hint: "Select the message, then Forward. Type Dr. Patel in To, type the note above the original message, and select Send. The attachment goes with the forward.",
          steps: [
            { action: { kind: "command", id: "mail.forward" }, requires: { selection: "msg:m3" }, selectHint: "Select the Riverside Imaging message first." },
            { action: { kind: "type", target: "compose.to", value: recipients(PATEL.email) } },
            mentions("compose.body", "Dr. Patel, Riverside Imaging confirmed the MRI for Thursday at 10:30 AM. The confirmation is attached.", ["Thursday", "10:30 AM"]),
            sendStep,
          ],
        },
        {
          instruction: 'Keisha\'s subject is just "Question". Reply to her, change the subject to "RE: Copay amount for Metro Health Plan visits", and type "The copay is printed on the front of the insurance card."',
          hint: "Select the message › Reply. Click in the subject line, replace it, type the text, and select Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m4" }, selectHint: "Select Keisha Grant's message \"Question\" first." },
            { action: { kind: "type", target: "compose.subject", value: "RE: Copay amount for Metro Health Plan visits" } },
            mentions("compose.body", "The copay is printed on the front of the insurance card.", ["copay", "insurance card"]),
            sendStep,
          ],
        },
      ],
    },
  ],

  "module-2::attachments-links": [
    {
      id: "ol-m2-attachments-links-1",
      app: "outlook-new",
      title: "Attach the right file the right way",
      scenario:
        "Omar needs to edit the shared volunteer schedule, a supply vendor needs a copy of a quote request, and a draft to billing has the wrong scan attached.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside(
        [
          msg("m1", BRIGHT, "Quote request", "Hello,\n\nPlease send us your request so we can prepare a price quote for exam table paper and gloves.\n\nBrightPath Medical Supply", "2026-10-20T08:45", { to: [ME], external: true }),
          msg("m2", ME, "Insurance card scans", "Keisha, here are the insurance card scans for today's new patients.", "2026-10-20T08:00", {
            folder: "drafts",
            read: true,
            to: [KEISHA],
            draft: { to: [KEISHA.email], cc: [], bcc: [], subject: "Insurance card scans", body: "Keisha, here are the insurance card scans for today's new patients." },
            attachments: [{ name: "Scan0042.pdf", size: "220 KB" }],
          }),
        ],
        {
          files: [
            { name: "Volunteer Schedule.xlsx", size: "24 KB", cloud: true, location: "OneDrive" },
            { name: "Supply Quote Request.docx", size: "41 KB" },
            { name: "Insurance Card Scans.pdf", size: "310 KB" },
            { name: "Scan0042.pdf", size: "220 KB" },
          ],
        },
      ),
      tasks: [
        {
          instruction:
            'Send Omar Haddad a message with the subject "Flu clinic volunteer schedule" and the text "Please add your name to the volunteer schedule." Share "Volunteer Schedule.xlsx" as a link, not a copy, so you both edit the same file.',
          hint: "New mail › Message tab › Attach file › Browse this computer (or OneDrive). Pick Volunteer Schedule.xlsx, choose Share link, and select Attach. Then fill in To, subject and text and select Send.",
          steps: [
            OPEN.email,
            { action: { kind: "dialog", id: "attachFile", values: { file: "Volunteer Schedule.xlsx", attachAs: "Share link" } } },
            { action: { kind: "type", target: "compose.to", value: recipients(OMAR.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Flu clinic volunteer schedule" } },
            mentions("compose.body", "Please add your name to the volunteer schedule.", ["volunteer schedule"]),
            sendStep,
          ],
        },
        {
          instruction:
            'Reply to BrightPath Medical Supply\'s "Quote request". Attach a copy of "Supply Quote Request.docx" (the vendor is outside Lakeside, so send a copy, not a link) and type "Our quote request is attached."',
          hint: "Select the message › Reply › Message tab › Attach file › Supply Quote Request.docx › Attach as copy › Attach. Type the text and select Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select the BrightPath Medical Supply message first." },
            { action: { kind: "dialog", id: "attachFile", values: { file: "Supply Quote Request.docx", attachAs: "Attach as copy" } } },
            mentions("compose.body", "Our quote request is attached.", ["quote request is attached"]),
            sendStep,
          ],
        },
        {
          instruction:
            'Your draft "Insurance card scans" in Drafts has the wrong file attached. Open the draft, remove "Scan0042.pdf", attach "Insurance Card Scans.pdf" as a copy, and send it.',
          hint: "Select Drafts in the folder pane and double-click the draft (or select it and choose Open). Select the X on the Scan0042.pdf tile, then Message tab › Attach file › Insurance Card Scans.pdf › Attach as copy › Attach, and select Send.",
          steps: [
            { action: { kind: "command", id: "item.open", value: "msg:m2" }, requires: { selection: "msg:m2" }, selectHint: "Open the Drafts folder and select the draft \"Insurance card scans\"." },
            { action: { kind: "command", id: "compose.removeAttachment", value: "Scan0042.pdf" } },
            { action: { kind: "dialog", id: "attachFile", values: { file: "Insurance Card Scans.pdf", attachAs: "Attach as copy" } } },
            sendStep,
          ],
        },
      ],
    },
  ],

  "module-2::signatures": [
    {
      id: "ol-m2-signatures-1",
      app: "outlook-new",
      title: "Set up your signatures",
      scenario:
        "Denise wants every front desk message to end with the same professional signature. You will make a full signature for new messages, a short one for replies, test them, and insert the full one by hand when a reply needs it.",
      fileName: "Inbox",
      minutes: 7,
      initial: lakeside([
        msg("m1", IMAGING, "Fax number for referrals", "Hello,\n\nWhat fax number should we use to send referral paperwork to your office?\n\nRiverside Imaging Scheduling", "2026-10-20T08:12", { to: [ME], external: true }),
        msg("m2", DENISE, "Signatures", "Taylor, please set up your email signature today. Use your name, title, the practice name and the front desk number. Denise", "2026-10-20T08:00", { to: [ME] }),
      ]),
      tasks: [
        {
          instruction:
            'Create a signature named "Front Desk" with the text "Taylor Brooks | Front Desk Coordinator | Lakeside Medical Associates | (555) 010-2400" and have Outlook add it to new messages.',
          hint: "Settings (gear) › Accounts › Signatures › New signature. Type the name and the text, then under Select default signatures choose it for New messages, and select Save.",
          steps: [
            signaturesStep(
              { sigs: [{ name: "Front Desk", text: "Taylor Brooks | Front Desk Coordinator | Lakeside Medical Associates | (555) 010-2400" }], defNew: "Front Desk" },
              ["[Front Desk]", "Front Desk Coordinator", "(555) 010-2400", "New messages: Front Desk"],
            ),
          ],
        },
        {
          instruction: 'Add a second signature named "Short" with the text "Taylor Brooks, Lakeside Medical Associates" and have Outlook add it to replies and forwards.',
          hint: "Settings › Accounts › Signatures › New signature. Name it Short, type the text, then under Select default signatures choose it for Replies and forwards, and select Save.",
          steps: [
            signaturesStep(
              {
                sigs: [
                  { name: "Front Desk", text: "Taylor Brooks | Front Desk Coordinator | Lakeside Medical Associates | (555) 010-2400" },
                  { name: "Short", text: "Taylor Brooks, Lakeside Medical Associates" },
                ],
                defNew: "Front Desk",
                defReply: "Short",
              },
              ["[Short]", "Taylor Brooks, Lakeside Medical Associates", "Replies/forwards: Short", "New messages: Front Desk"],
            ),
          ],
        },
        {
          instruction: 'Test the new-message signature: send yourself a message with the subject "Signature test" and the text "Testing my signature."',
          hint: "Close Settings, then New mail. Your Front Desk signature is already in the message. Put your own address in To, add the subject, type the text above the signature, and select Send.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Signature test" } },
            mentions("compose.body", "Testing my signature.", ["Testing my signature"]),
            sendStep,
          ],
        },
        {
          instruction:
            'Reply to Riverside Imaging\'s "Fax number for referrals". This outside office needs your full contact details, so insert the "Front Desk" signature, type "Our referral fax number is (555) 010-2401.", and send.',
          hint: "Select the message › Reply. Message tab › Signature › Front Desk. Type the text above the signatures and select Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select the Riverside Imaging message first." },
            { action: { kind: "command", id: "compose.insertSignature", value: "Front Desk" } },
            mentions("compose.body", "Our referral fax number is (555) 010-2401.", ["(555) 010-2401"]),
            sendStep,
          ],
        },
      ],
    },
    {
      id: "ol-m2-signatures-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Create your professional signatures",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook. Use your own first and last name in the signatures. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 6,
      initial: lakeside([msg("m1", DENISE, "Signatures", "Please set up your email signature today. Denise", "2026-10-20T08:00", { to: [ME] })]),
      tasks: [
        {
          instruction: 'Create a signature named "Full" with your name, "Office Assistant", "Lakeside Medical Associates" and "(555) 010-2400", and set it for new messages.',
          hint: "Settings (gear) › Accounts › Signatures › New signature. Name it Full, type the signature, then under Select default signatures choose it for New messages, and select Save.",
          steps: [
            signaturesStep(
              { sigs: [{ name: "Full", text: "Taylor Brooks | Office Assistant | Lakeside Medical Associates | (555) 010-2400" }], defNew: "Full" },
              ["[Full]", "Office Assistant", "Lakeside Medical Associates", "(555) 010-2400", "New messages: Full"],
            ),
          ],
        },
        {
          instruction: 'Create a short signature named "Short" with your name and "Lakeside Medical Associates", and set it for replies and forwards.',
          hint: "Settings › Accounts › Signatures › New signature. Name it Short, type it, then under Select default signatures choose it for Replies and forwards, and select Save.",
          steps: [
            signaturesStep(
              {
                sigs: [
                  { name: "Full", text: "Taylor Brooks | Office Assistant | Lakeside Medical Associates | (555) 010-2400" },
                  { name: "Short", text: "Taylor Brooks, Lakeside Medical Associates" },
                ],
                defNew: "Full",
                defReply: "Short",
              },
              ["[Short]", "Replies/forwards: Short", "New messages: Full"],
            ),
          ],
        },
        {
          instruction: 'Send yourself a test message with the subject "Signature test" and check that your Full signature is in it.',
          hint: "Close Settings, select New mail, put your own address (taylor.brooks@lakesidemed.example.com) in To, type the subject, and select Send. The test arrives in your Inbox.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Signature test" } },
            sendStep,
          ],
        },
      ],
    },
  ],

  "module-2::send-timing": [
    {
      id: "ol-m2-send-timing-1",
      app: "outlook-new",
      title: "Undo, schedule, and recall",
      scenario:
        "It is late in the day. You want a few seconds to catch mistakes before messages go out, one reply should wait until the morning, and a message you sent to the wrong person needs to be pulled back.",
      fileName: "Inbox",
      minutes: 8,
      initial: lakeside(
        [
          msg("m1", OMAR, "Can you send me the Saturday checklist?", "Hi Taylor, can you send me the Saturday opening checklist? No rush tonight.\n\nOmar", "2026-10-20T17:20", { to: [ME] }),
          msg("m2", ME, "Lunch order for Friday", "Luis, can you collect lunch orders for Friday's staff meeting?", "2026-10-20T17:30", { folder: "sent", read: true, to: [HILL] }),
        ],
        { now: "2026-10-20T17:40" },
      ),
      tasks: [
        {
          instruction: "Turn on Undo send so Outlook waits 10 seconds before sending each message.",
          hint: "Settings (gear) › Mail › Compose and reply › Undo send › 10 seconds › Save.",
          steps: [{ action: { kind: "dialog", id: "settings.undoSend", values: { seconds: 10 } } }],
        },
        {
          instruction:
            'Send Keisha Grant a message with the subject "Updated fee schedule" and the text "The updated fee schedule is on the shared drive." Then, before 10 seconds pass, undo the send.',
          hint: "Close Settings. New mail, fill in To, subject and text, and select Send. A Sending... bar appears at the bottom of the window: select Undo right away.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(KEISHA.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Updated fee schedule" } },
            mentions("compose.body", "The updated fee schedule is on the shared drive.", ["fee schedule"]),
            sendStep,
            { action: { kind: "command", id: "mail.undoSend" } },
          ],
        },
        {
          instruction: "The message is open again. Add Denise Carter in Cc and send it.",
          hint: "Select Cc at the right end of the To line, type Denise and pick her, then select Send.",
          steps: [{ action: { kind: "type", target: "compose.cc", value: recipients(DENISE.email) } }, sendStep],
        },
        {
          instruction:
            'Reply to Omar\'s "Can you send me the Saturday checklist?" with "The Saturday checklist is taped inside the front desk drawer." Schedule it to send tomorrow morning at 8:00 AM instead of now.',
          hint: "Select the message › Reply, type the text, then select the arrow next to Send › Schedule send › Tomorrow morning 8:00 AM › Send. The message waits in Drafts until then.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Omar Haddad's message first." },
            mentions("compose.body", "The Saturday checklist is taped inside the front desk drawer.", ["Saturday checklist"]),
            { action: { kind: "dialog", id: "scheduleSend", values: { when: "Tomorrow morning 8:00 AM" } } },
          ],
        },
        {
          instruction: 'You sent "Lunch order for Friday" to Dr. Marcus Hill instead of Luis. Open it from Sent Items and recall it.',
          hint: "Select Sent Items in the folder pane, double-click the message to open it, select Recall Message, and then OK. A Message Recall Report arrives in your Inbox.",
          steps: [
            { action: { kind: "command", id: "item.open", value: "msg:m2" }, requires: { selection: "msg:m2" }, selectHint: "Open Sent Items and select \"Lunch order for Friday\"." },
            { action: { kind: "command", id: "mail.recall" } },
          ],
        },
      ],
    },
    {
      id: "ol-m2-send-timing-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Undo send and Schedule send",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: turn on Undo send, use it, and schedule a message for the morning. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 5,
      initial: lakeside([msg("m1", DENISE, "End of day", "Thanks for today, Taylor. Denise", "2026-10-20T17:00", { to: [ME] })], { now: "2026-10-20T17:45" }),
      tasks: [
        {
          instruction: "Turn on Undo send with a 10-second wait.",
          hint: "Settings (gear) › Mail › Compose and reply › Undo send › 10 seconds › Save.",
          steps: [{ action: { kind: "dialog", id: "settings.undoSend", values: { seconds: 10 } } }],
        },
        {
          instruction: 'Send yourself a message with the subject "Undo test", then select Undo before it is sent.',
          hint: "Close Settings, New mail, put your own address in To, type the subject, select Send, then select Undo on the Sending bar at the bottom.",
          steps: [
            OPEN.email,
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Undo test" } },
            sendStep,
            { action: { kind: "command", id: "mail.undoSend" } },
          ],
        },
        {
          instruction: 'Change the subject of the reopened message to "Scheduled test" and schedule it to send tomorrow morning at 8:00 AM.',
          hint: "Click in the subject and replace it. Then select the arrow next to Send › Schedule send › Tomorrow morning 8:00 AM › Send.",
          steps: [
            { action: { kind: "type", target: "compose.subject", value: "Scheduled test" } },
            { action: { kind: "dialog", id: "scheduleSend", values: { when: "Tomorrow morning 8:00 AM" } } },
          ],
        },
        {
          instruction: "Open the Drafts folder to see the scheduled message waiting there.",
          hint: "In the folder pane, select Drafts.",
          steps: [{ action: { kind: "command", id: "mail.folder", value: "Drafts" } }],
        },
      ],
    },
  ],
};

void LUIS;
