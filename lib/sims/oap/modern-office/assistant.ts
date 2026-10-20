import type { SimDefinition } from "@/types/sim";
import { assistantDoc, typeAll, type AssistantDoc } from "@/components/sim/apps/assistant/types";

/** modern-office sims that run in the assistant engine. Keys are "<moduleSlug>::<lessonSlug>". */

const TOR_ACCOUNTS: NonNullable<AssistantDoc["accounts"]> = [
  { id: "work", name: "Jordan Rivera", email: "jordan.rivera@tortech.example", work: true, org: "TOR Tech" },
  { id: "personal", name: "Jordan Rivera", email: "jordan.rivera@mailbox.example" },
];

const LAKESIDE_ACCOUNTS: NonNullable<AssistantDoc["accounts"]> = [
  { id: "work", name: "Jordan Rivera", email: "jrivera@lakesidemed.example", work: true, org: "Lakeside Medical Associates" },
  { id: "personal", name: "Jordan Rivera", email: "jordan.rivera@mailbox.example" },
];

const STARTERS = ["Draft an email to reschedule a client meeting", "Summarize a long email thread in 3 bullets", "Write a 30-minute meeting agenda", "Rewrite a paragraph so it sounds more professional"];

function base(extra: Partial<AssistantDoc>): AssistantDoc {
  return { accounts: TOR_ACCOUNTS, account: "work", thread: [], rules: [], suggestions: STARTERS, history: [{ id: "h-old1", title: "Agenda for Monday standup", when: "Yesterday" }], ...extra };
}

/* ------------------------------------------------------------------ */
/* Responses                                                           */
/* ------------------------------------------------------------------ */

const RESCHEDULE_1 =
  "Here's a draft you can adapt:\n\n**Subject:** Rescheduling our meeting to Thursday at 3:00 PM\n\nHi [Client Name],\n\nI'm writing to let you know that we need to move our meeting from Tuesday at 2:00 PM to Thursday at 3:00 PM. I hope this new time still works for you.\n\nIf Thursday isn't convenient, please let me know a time that works better and I'll update the invitation. Thank you for your flexibility.\n\nBest regards,\n[Your Name]\nTOR Tech";
const RESCHEDULE_2 =
  "Here's a more direct version:\n\n**Subject:** New time for our meeting: Thursday at 3:00 PM\n\nHi [Client Name],\n\nWe need to move our meeting from Tuesday at 2:00 PM to Thursday at 3:00 PM, and I apologize for the inconvenience.\n\nIf Thursday doesn't work for you, reply with a time that does and I'll send an updated invitation right away.\n\nBest regards,\n[Your Name]\nTOR Tech";
const RESCHEDULE_2_EDITED = RESCHEDULE_2.replace("[Client Name]", "Ms. Alvarez").replace("[Your Name]", "Jordan Rivera");

const FOLLOWUP_EMAIL =
  "**Subject:** Thank you for joining yesterday's product demo\n\nHi [Client Name],\n\nThank you for joining our product demo yesterday. It was great to walk your team through the automated backup dashboard and the help desk portal, and I hope you saw how much time they can save your staff.\n\nYou asked about our pricing tiers. We offer three: Essentials for small offices, Professional for growing teams, and Enterprise for multiple locations. I've attached a one-page comparison so you can see what each tier includes.\n\nWould you have 30 minutes next week for a call to talk through which tier fits best? I'm happy to work around your schedule.\n\nWarm regards,\n[Your Name]\nTOR Tech";
const FOLLOWUP_EDITED = FOLLOWUP_EMAIL.replace("[Client Name]", "Mr. Webb").replace("[Your Name]", "Jordan Rivera");

const RETENTION_POLICY =
  "Lakeside Medical Associates: Records Management Policy (rev. 2025)\n\nSection 6: Retention periods\n6.1 Appointment schedules: keep for 3 years.\n6.2 Billing and payment records: keep for 7 years from the date of service.\n6.3 Signed patient consent forms: keep for 10 years.\n6.4 Destroy records only with a shredding log signed by the office manager.\n\nSection 7: Questions\nContact the compliance officer, Denise Park, at extension 214.";

export const assistantSims: Record<string, SimDefinition[]> = {
  /* ---------------------------------------------------------------- */
  /* Module 8: Using AI in the Workplace                               */
  /* ---------------------------------------------------------------- */
  "module-8::ai-in-the-workplace": [
    {
      id: "mo-m8-ai-workplace-1",
      app: "assistant",
      title: "Draft, review, and own an AI-assisted email",
      scenario:
        "Your supervisor at TOR Tech needs a client meeting rescheduled, and you have 10 minutes. Use Microsoft 365 Copilot Chat to get a first draft fast, then do the human part: improve it, personalize it, check every detail, and only then copy it to send.",
      fileName: "Copilot",
      minutes: 7,
      initial: assistantDoc(
        base({
          rules: [
            { id: "r-resched", match: [["reschedul", "move"], ["thursday"], ["client"]], response: RESCHEDULE_1, followups: ["Make the opening more direct", "Make the tone warmer", "Shorten it to one paragraph"] },
            { id: "r-resched2", after: "r-resched", match: [["opening", "direct"], ["apolog"]], response: RESCHEDULE_2 },
            {
              id: "r-allhands",
              match: [["all-hands", "all hands"], ["room b"]],
              response: "**Subject:** Friday's all-hands meeting has moved to 2:00 PM\n\nHi team,\n\nPlease note that Friday's all-hands meeting has moved from 10:00 AM to **2:00 PM**. We'll meet in **Conference Room D**.\n\nPlease update your calendars. Thank you!\n\nBest,\n[Your Name]",
              error: { claim: "The draft says the meeting is in Conference Room D.", correction: "Your request said Conference Room B. Compare every name, time, and place with your request before you send." },
            },
            {
              id: "r-allhands2",
              after: "r-allhands",
              match: [["room b"]],
              response: "You're right, I'm sorry about that. Here's the corrected email:\n\n**Subject:** Friday's all-hands meeting has moved to 2:00 PM\n\nHi team,\n\nPlease note that Friday's all-hands meeting has moved from 10:00 AM to **2:00 PM**. We'll meet in **Conference Room B**.\n\nPlease update your calendars. Thank you!\n\nBest,\n[Your Name]",
            },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Ask Copilot to draft the email. Your prompt must give your role (“office assistant”), the task (reschedule the meeting from Tuesday at 2:00 PM to Thursday at 3:00 PM), the audience (a client), and the format (“two short paragraphs”).",
          hint: "Click Message Copilot and type, for example: “I am an office assistant at TOR Tech. Write a professional email to a client to reschedule our meeting from Tuesday at 2:00 PM to Thursday at 3:00 PM. Keep it to two short paragraphs.” Press Enter.",
          steps: [
            typeAll("prompt", "I am an office assistant at TOR Tech. Write a professional email to a client to reschedule our meeting from Tuesday at 2:00 PM to Thursday at 3:00 PM. Keep it to two short paragraphs.", ["office assistant", "reschedul", "tuesday", "thursday", "client", ["two short paragraphs", "2 short paragraphs"]], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." }),
          ],
        },
        {
          instruction: "Iterate instead of starting over. Ask Copilot to “Make the opening more direct and add an apology for the inconvenience.”",
          hint: "Type the request in the same chat (below the draft) and press Enter. Don't select New chat.",
          steps: [typeAll("prompt", "Make the opening more direct and add an apology for the inconvenience.", ["opening", "direct", "apolog"], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
        {
          instruction: "Personalize the new draft before you use it: replace [Client Name] with “Ms. Alvarez” and [Your Name] with “Jordan Rivera.”",
          hint: "Under the latest response, select Edit (pencil). Replace both placeholders in the editor, then select Done.",
          steps: [typeAll("edit:r2", RESCHEDULE_2_EDITED, ["ms. alvarez", "jordan rivera"])],
        },
        {
          instruction: "Copy the edited email so you can paste it into Outlook.",
          hint: "Under the edited response, select Copy.",
          steps: [{ action: { kind: "command", id: "response.copy" }, requires: { selection: "msg:r2" }, selectHint: "Copy the response you just edited." }],
        },
        {
          instruction: "Now draft the team notice. Ask Copilot to “Write a short email to the team saying Friday's all-hands meeting moved from 10:00 AM to 2:00 PM in Conference Room B.”",
          hint: "Type the request in the prompt box and press Enter.",
          steps: [typeAll("prompt", "Write a short email to the team saying Friday's all-hands meeting moved from 10:00 AM to 2:00 PM in Conference Room B.", [["all-hands", "all hands"], "2:00 pm", "conference room b"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
        {
          instruction: "Review the draft against your request. One detail is wrong. Report the response as Inaccurate.",
          hint: "Under the all-hands draft, select Dislike (thumbs down), choose Inaccurate, and select Submit.",
          steps: [{ action: { kind: "command", id: "response.feedback", value: "Inaccurate" }, requires: { selection: "msg:r3" }, selectHint: "Give feedback on the all-hands draft." }],
        },
        {
          instruction: "Ask Copilot to fix it: “The meeting is in Conference Room B, not Room D. Please correct the email.”",
          hint: "Type the correction in the prompt box and press Enter.",
          steps: [typeAll("prompt", "The meeting is in Conference Room B, not Room D. Please correct the email.", ["conference room b", ["correct", "fix"]], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 14: AI Tools for Office Assistants                         */
  /* ---------------------------------------------------------------- */
  "module-14::ai-tools-overview": [
    {
      id: "mo-m14-ai-tools-1",
      app: "assistant",
      title: "The right AI tool for each task",
      scenario:
        "Renee wants to see you use AI tools well this week, not just use them. In Copilot you have the general chat plus two specialized agents: a Writing Coach for tone and grammar, and Meeting Notes for transcripts. Pick the right one for each job, and protect client information first.",
      fileName: "Copilot",
      minutes: 6,
      initial: assistantDoc(
        base({
          account: "personal",
          agents: [
            { id: "writing-coach", name: "Writing Coach", description: "Checks grammar, tone, and clarity before you send.", color: "#107c41", glyph: "Aa", greeting: "Paste a sentence and I'll check its tone.", suggestions: ["Check the tone of this sentence", "Make this paragraph clearer"] },
            { id: "meeting-notes", name: "Meeting Notes", description: "Turns a meeting transcript into decisions and action items.", color: "#c239b3", glyph: "MN", greeting: "Attach a transcript and I'll pull out the decisions and action items." },
          ],
          files: [
            {
              name: "Ops Sync Transcript.txt",
              size: "14 KB",
              preview:
                "[10:02] Renee Ortiz: Let's start with the Harper Dental migration.\n[10:04] Devon Price: The vendor confirmed the new server ships Wednesday. I can install it Thursday.\n[10:06] Renee Ortiz: Good. Then go-live moves to November 2.\n[10:09] Dana Cole: Marcus Webb wants the renewal quote this week.\n[10:10] Renee Ortiz: Dana, please send it by Wednesday.\n[10:12] Jordan Rivera: I'll update the client tracker with both dates today.\n[10:15] Renee Ortiz: Thanks, everyone.",
            },
          ],
          rules: [
            {
              id: "r-subjects",
              agent: "chat",
              match: [["subject line"], ["follow-up", "follow up"]],
              response: "Here are 5 subject line options:\n\n1. Checking in on our proposal\n2. Any questions about the renewal?\n3. Quick follow-up: next steps for your IT support\n4. Still interested in a 15-minute call?\n5. Following up on my email from last week\n\nShort, specific subject lines get opened more often. Pick one that matches what you need from the client.",
            },
            {
              id: "r-tone",
              agent: "writing-coach",
              match: [["per my last email"]],
              response: "**Tone check:** This sentence can read as impatient or annoyed. \"Per my last email\" suggests the reader didn't pay attention.\n\n**Try instead:**\n- \"Just a quick reminder that we still need your signature on the agreement.\"\n- \"Could you sign the agreement when you have a moment? Let me know if you have any questions.\"\n\n**Clarity:** Name the document (for example, \"the service agreement\") so the reader knows exactly what to sign.",
            },
            {
              id: "r-notes",
              agent: "meeting-notes",
              needsFile: "Ops Sync Transcript.txt",
              match: [["action item"]],
              response: "## Decisions\n- Harper Dental go-live moves to **November 2**.\n- Dana Cole sends Marcus Webb the renewal quote this week.\n\n## Action items\n| Owner | Action | Due |\n|---|---|---|\n| Devon Price | Install the new Harper Dental server | Thursday |\n| Dana Cole | Send the renewal quote to Marcus Webb | Wednesday |\n| Jordan Rivera | Update the client tracker with both dates | Today |",
            },
            { id: "r-notes-nofile", agent: "meeting-notes", match: [["action item"]], response: "I don't see a transcript yet. Select **+** to attach the meeting transcript, then ask again." },
            {
              id: "r-ccbcc",
              agent: "chat",
              match: [["bcc"]],
              response: "**CC (carbon copy):** Everyone on the email can see who was copied. Use it to keep someone informed when they don't need to act.\n\n**BCC (blind carbon copy):** Recipients can't see who was BCC'd. Use it to send one message to many people without sharing their email addresses with each other.\n\nTip: If someone is BCC'd and clicks Reply All, their reply can reveal that they were copied, so use BCC carefully.",
            },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "You're about to work with client files. Switch Copilot to your TOR Tech work account so enterprise data protection applies.",
          hint: "Select your account at the bottom of the left pane, then choose jordan.rivera@tortech.example (Work account).",
          steps: [{ action: { kind: "command", id: "account.switch", value: "work" }, requires: { selection: "account" }, selectHint: "Switch accounts from the account button at the bottom of the left pane." }],
        },
        {
          instruction: "Use the general Copilot chat to brainstorm. Ask for “5 subject line options for a follow-up email to a client who has not responded.”",
          hint: "With Copilot selected under Agents, type the request in the prompt box and press Enter.",
          steps: [typeAll("prompt", "Give me 5 subject line options for a follow-up email to a client who has not responded.", [["5 subject line", "five subject line"], ["follow-up", "follow up"], "not responded"], { requires: { selection: "chat" }, selectHint: "Brainstorm in the main Copilot chat, not an agent." })],
        },
        {
          instruction: "Use the right tool for a tone check. Open the Writing Coach agent and ask it to check the tone of this sentence: “Per my last email, we still need your signature.”",
          hint: "Under Agents, select Writing Coach. Type: Check the tone of this sentence: Per my last email, we still need your signature. Press Enter.",
          steps: [typeAll("prompt", "Check the tone of this sentence: Per my last email, we still need your signature.", ["tone", "per my last email"], { requires: { selection: "agent:writing-coach" }, selectHint: "Ask the Writing Coach agent, the tool built for tone checks." })],
        },
        {
          instruction: "Open the Meeting Notes agent, attach “Ops Sync Transcript.txt,” and ask for the decisions and action items with an owner for each.",
          hint: "Under Agents, select Meeting Notes. Select + (Add content) › Ops Sync Transcript.txt. Then type: List the decisions and action items with an owner for each. Press Enter.",
          steps: [
            { action: { kind: "command", id: "prompt.attach", value: "Ops Sync Transcript.txt" }, requires: { selection: "agent:meeting-notes" }, selectHint: "Attach the transcript in the Meeting Notes agent." },
            typeAll("prompt", "List the decisions and action items with an owner for each.", ["action item", "owner"], { requires: { selection: "agent:meeting-notes" }, selectHint: "Ask the Meeting Notes agent." }),
          ],
        },
        {
          instruction: "Copy the decisions and action items so you can paste them into the team channel.",
          hint: "Under the Meeting Notes response, select Copy.",
          steps: [{ action: { kind: "command", id: "response.copy" }, requires: { selection: "msg:r3" }, selectHint: "Copy the Meeting Notes response with the action items." }],
        },
        {
          instruction: "Back in the general Copilot chat, ask a quick workplace question: “What is the difference between CC and BCC in email?”",
          hint: "Under Agents, select Copilot. Type the question and press Enter.",
          steps: [typeAll("prompt", "What is the difference between CC and BCC in email?", ["difference", "bcc"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 14: Automating Repetitive Tasks                            */
  /* ---------------------------------------------------------------- */
  "module-14::automating-tasks": [
    {
      id: "mo-m14-automating-1",
      app: "assistant",
      title: "Automate the Monday status email, with a human checkpoint",
      scenario:
        "Every Monday you spend 45 minutes sending the same status email to TOR Tech's clients. Build a scheduled flow in Power Automate that does it for you, but keep a human in the loop: Renee approves the update before it goes out. Then save the flow and test it before you rely on it.",
      fileName: "Power Automate",
      minutes: 8,
      initial: assistantDoc(
        base({
          start: { view: "automate", page: "home" },
          flows: [{ id: "flow-old", name: "Save invoice attachments to OneDrive", type: "Automated", trigger: { id: "trigger", action: "When a new email arrives (V3)", connector: "Office 365 Outlook", params: { Folder: "Inbox", "Subject Filter": "Invoice", "Include Attachments": "Yes" } }, steps: [{ id: "a1", action: "Create file", connector: "OneDrive for Business", params: { "Folder Path": "/Billing/Invoices", "File Name": "Attachment name", "File Content": "Attachment content" } }], saved: true, on: true, lastTest: "Succeeded", runs: 12, modified: "Oct 2" }],
          templates: [
            { name: "Send a recurring email reminder", description: "Send yourself or your team an email on a schedule you choose.", connectors: ["Schedule", "Office 365 Outlook"], type: "Scheduled", trigger: { action: "Recurrence", connector: "Schedule", params: { Interval: "1", Frequency: "Week" } }, steps: [{ action: "Send an email (V2)", connector: "Office 365 Outlook", params: {} }] },
            { name: "Save Office 365 email attachments to OneDrive for Business", description: "Save attachments from new emails to a OneDrive folder automatically.", connectors: ["Office 365 Outlook", "OneDrive for Business"], type: "Automated", trigger: { action: "When a new email arrives (V3)", connector: "Office 365 Outlook", params: { Folder: "Inbox", "Include Attachments": "Yes" } }, steps: [{ action: "Create file", connector: "OneDrive for Business", params: {} }] },
            { name: "Post to Teams when a new Forms response is submitted", description: "Let your team know right away when someone fills out your form.", connectors: ["Microsoft Forms", "Microsoft Teams"], type: "Automated", trigger: { action: "When a new response is submitted", connector: "Microsoft Forms", params: {} }, steps: [{ action: "Post message in a chat or channel", connector: "Microsoft Teams", params: {} }] },
            { name: "Get a notification when your manager emails you", description: "Get a push notification on your phone for emails from one person.", connectors: ["Office 365 Outlook", "Notifications"], type: "Automated", trigger: { action: "When a new email arrives (V3)", connector: "Office 365 Outlook", params: { Folder: "Inbox" } }, steps: [{ action: "Send me a mobile notification", connector: "Notifications", params: {} }] },
          ],
          flowIdeas: [
            { match: [["every monday", "each monday", "on mondays"], ["email"]], name: "Weekly Monday email", type: "Scheduled", trigger: { action: "Recurrence", connector: "Schedule", params: { Interval: "1", Frequency: "Week", "On these days": "Monday", "At these hours": "8", "At these minutes": "0" } }, steps: [{ action: "Send an email (V2)", connector: "Office 365 Outlook", params: {} }] },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Create a scheduled cloud flow named “Monday client status update” that repeats every 1 week on Monday at 8:00 AM.",
          hint: "Select Create › Scheduled cloud flow. Type the flow name, keep At 8:00 AM, set Repeat every to 1 Week, select M (Monday) under On these days, and select Create.",
          steps: [
            typeAll(
              "flow.create",
              "Type: Scheduled\nName: Monday client status update\nStarting: 10/20/2026\nAt: 8:00 AM\nRepeat every: 1 Week\nOn these days: Monday",
              ["type: scheduled", "name: monday client status update", "at: 8:00 am", "repeat every: 1 week", "on these days: monday"],
            ),
          ],
        },
        {
          instruction: "Add a human checkpoint: add the action “Start and wait for an approval” so Renee approves the update before it goes to clients.",
          hint: "Select + below the Recurrence trigger. Search for approval and select Start and wait for an approval.",
          steps: [{ action: { kind: "command", id: "flow.addAction", value: "Start and wait for an approval" }, requires: { selection: "flow:flow1" }, selectHint: "Add the action in the Monday client status update flow." }],
        },
        {
          instruction: "In the approval, set Approval type to “Approve/Reject - First to respond,” Title to “Approve Monday client update,” and Assigned to “renee.ortiz@tortech.example.”",
          hint: "Select the Start and wait for an approval card. In Parameters, choose the Approval type, type the Title and the Assigned to address, and press Tab after each one.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "flowparam:flow1/a1/Approval type", value: "Approve/Reject - First to respond" } },
            { action: { kind: "type", target: "flowparam:flow1/a1/Title", value: "Approve Monday client update" } },
            { action: { kind: "type", target: "flowparam:flow1/a1/Assigned to", value: "renee.ortiz@tortech.example" } },
          ],
        },
        {
          instruction: "Add a “Send an email (V2)” action after the approval.",
          hint: "Select + below the approval card. Search for send an email and select Send an email (V2).",
          steps: [{ action: { kind: "command", id: "flow.addAction", value: "Send an email (V2)" }, requires: { selection: "flow:flow1" }, selectHint: "Add the action in the Monday client status update flow." }],
        },
        {
          instruction: "Set the email's To to “clients@tortech.example,” Subject to “Weekly status update,” and Body to “Hello, here is this week's project status. Reply with any questions.”",
          hint: "Select the Send an email (V2) card. Type each value in Parameters and press Tab (click outside the Body box to save it).",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "flowparam:flow1/a2/To", value: "clients@tortech.example" } },
            { action: { kind: "type", target: "flowparam:flow1/a2/Subject", value: "Weekly status update" } },
            typeAll("flowparam:flow1/a2/Body", "Hello, here is this week's project status. Reply with any questions.", ["project status", "questions"]),
          ],
        },
        {
          instruction: "Save the flow.",
          hint: "Select Save in the command bar at the top of the designer.",
          steps: [{ action: { kind: "command", id: "flow.save" }, requires: { selection: "flow:flow1" }, selectHint: "Save the Monday client status update flow." }],
        },
        {
          instruction: "Test the flow manually before you let it run on its own.",
          hint: "Select Test › Manually › Test, then select Run flow.",
          steps: [{ action: { kind: "command", id: "flow.test", value: "Manually" }, requires: { selection: "flow:flow1" }, selectHint: "Test the Monday client status update flow." }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 14: AI Writing & Research Assistance                       */
  /* ---------------------------------------------------------------- */
  "module-14::ai-writing-research": [
    {
      id: "mo-m14-ai-research-1",
      app: "assistant",
      title: "Competitor summary by 3:00 PM, verified",
      scenario:
        "At 1:00 PM Renee asks for a one-page summary of TOR Tech's three main competitors by 3:00 PM. Use a five-part prompt to get a fast first draft, then verify before anything reaches her: check the cited source, flag what you can't confirm, and use AI as an editor to tighten your own notes.",
      fileName: "Copilot",
      minutes: 7,
      initial: assistantDoc(
        base({
          files: [
            {
              name: "Q3 Competitor Notes.docx",
              size: "22 KB",
              preview:
                "My draft paragraph: In terms of the overall competitive landscape that we are currently operating in, it is fair to say that there are basically three main competitors that we tend to run into most often when we are going after new clients, and each of them has their own focus areas, pricing approaches, and types of customers that they tend to serve.",
            },
          ],
          rules: [
            {
              id: "r-comp",
              match: [["competitor"], ["table"]],
              response:
                "Here's a first draft for the 3:00 PM briefing:\n\n| Company | Key services | Target market | Pricing model |\n|---|---|---|---|\n| Quillfeather IT | Managed IT, help desk, cloud backup | Dental and medical offices | Flat monthly fee of $79 per user [1] |\n| Cobaltwave Systems | Network setup, cybersecurity audits | Law firms and accounting firms | Project-based quotes [2] |\n| Tessellate Tech Partners | Software support, Microsoft 365 migration | Retail stores and restaurants | Hourly rate [3] |\n\nAll three compete with TOR Tech for small and medium businesses. Quillfeather IT is the closest match to our healthcare clients.",
              sources: [
                { title: "Quillfeather IT Pricing", site: "quillfeather-it.example/pricing", missing: true },
                { title: "Cobaltwave Systems: Services", site: "cobaltwave.example/services", body: "Cobaltwave Systems designs and secures networks for professional firms. Every engagement starts with a free assessment, followed by a project quote." },
                { title: "Tessellate Tech Partners: Rates", site: "tessellatetech.example/rates", body: "Support is billed hourly. Microsoft 365 migrations are quoted after a discovery call." },
              ],
              error: { claim: "Quillfeather IT charges a flat monthly fee of $79 per user.", correction: "The cited pricing page does not exist, so the figure can't be verified. Remove it or find Quillfeather's real pricing page." },
            },
            {
              id: "r-comp2",
              after: "r-comp",
              match: [["[verify]"]],
              response:
                "Updated draft. I removed the unverified price and marked claims to confirm:\n\n| Company | Key services | Target market | Pricing model |\n|---|---|---|---|\n| Quillfeather IT | Managed IT, help desk, cloud backup | Dental and medical offices [verify] | Not published; confirm with the vendor [verify] |\n| Cobaltwave Systems | Network setup, cybersecurity audits | Law firms and accounting firms | Project-based quotes [2] |\n| Tessellate Tech Partners | Software support, Microsoft 365 migration | Retail stores and restaurants [verify] | Hourly rate [3] |\n\nCheck each [verify] item on the company's own website before the briefing.",
              sources: [
                { title: "Quillfeather IT Pricing", site: "quillfeather-it.example/pricing", missing: true },
                { title: "Cobaltwave Systems: Services", site: "cobaltwave.example/services", body: "Cobaltwave Systems designs and secures networks for professional firms. Every engagement starts with a free assessment, followed by a project quote." },
                { title: "Tessellate Tech Partners: Rates", site: "tessellatetech.example/rates", body: "Support is billed hourly. Microsoft 365 migrations are quoted after a discovery call." },
              ],
            },
            {
              id: "r-concise",
              needsFile: "Q3 Competitor Notes.docx",
              match: [["concise", "shorter", "tighten"]],
              response: "Here's a tighter version (24 words instead of 70):\n\n**We compete most often with three firms. Each focuses on different services, prices its work differently, and targets a different type of client.**",
            },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Write a research prompt with all five parts: role (“Act as a business analyst”), task (summarize TOR Tech's three main competitors), context (“for my manager's 3:00 PM briefing”), format (“a table with key services, target market, and pricing model”), and tone (“professional”).",
          hint: "Type, for example: “Act as a business analyst. Summarize TOR Tech's three main competitors for my manager's 3:00 PM briefing. Format it as a table with key services, target market, and pricing model. Use a professional tone.” Press Enter.",
          steps: [
            typeAll(
              "prompt",
              "Act as a business analyst. Summarize TOR Tech's three main competitors for my manager's 3:00 PM briefing. Format it as a table with key services, target market, and pricing model. Use a professional tone.",
              ["act as a business analyst", "competitor", "3:00 pm", "table", "target market", "pricing model", "professional"],
              { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." },
            ),
          ],
        },
        {
          instruction: "One price has a citation. Open source 1, the one cited for Quillfeather IT's pricing.",
          hint: "Select the small 1 next to the Quillfeather IT price (or the Sources chip numbered 1).",
          steps: [{ action: { kind: "command", id: "source.open", value: "1" }, requires: { selection: "msg:r1" }, selectHint: "Open source 1 in the competitor table response." }],
        },
        {
          instruction: "The cited page doesn't exist. Report the response as Inaccurate.",
          hint: "Under the competitor table, select Dislike (thumbs down), choose Inaccurate, and select Submit.",
          steps: [{ action: { kind: "command", id: "response.feedback", value: "Inaccurate" }, requires: { selection: "msg:r1" }, selectHint: "Give feedback on the competitor table response." }],
        },
        {
          instruction: "Ask Copilot to “Remove the Quillfeather price and mark any claim that still needs checking with [verify].”",
          hint: "Type the request in the same chat and press Enter.",
          steps: [typeAll("prompt", "Remove the Quillfeather price and mark any claim that still needs checking with [verify].", [["remove", "delete"], "[verify]"], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
        {
          instruction: "Use AI as an editor for your own writing. Attach “Q3 Competitor Notes.docx” and ask Copilot to “Make my draft paragraph more concise for a busy manager.”",
          hint: "Select + (Add content) › Q3 Competitor Notes.docx. Then type the request and press Enter.",
          steps: [
            { action: { kind: "command", id: "prompt.attach", value: "Q3 Competitor Notes.docx" }, requires: { selection: "chat" }, selectHint: "Attach the file in the main Copilot chat." },
            typeAll("prompt", "Make my draft paragraph more concise for a busy manager.", ["more concise"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." }),
          ],
        },
        {
          instruction: "Copy the concise version so you can paste it into your summary.",
          hint: "Under the concise paragraph, select Copy.",
          steps: [{ action: { kind: "command", id: "response.copy" }, requires: { selection: "msg:r3" }, selectHint: "Copy the concise paragraph response." }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 14: Hands-On: Build Your AI Workflow                       */
  /* ---------------------------------------------------------------- */
  "module-14::build-ai-workflow": [
    {
      id: "mo-m14-ai-workflow-1",
      app: "assistant",
      title: "Three office tasks, one documented AI workflow",
      scenario:
        "Your final AI challenge at TOR Tech: complete three tasks with Copilot and show your judgment at every step. Draft a follow-up email with a strong prompt and personalize it, summarize a project update for a non-technical manager, and build a meeting agenda you save as a reusable prompt.",
      fileName: "Copilot",
      minutes: 8,
      initial: assistantDoc(
        base({
          files: [
            {
              name: "Riverside Rollout - Project Update.docx",
              size: "41 KB",
              preview:
                "Project: Riverside Rollout (new laptops and Microsoft 365 for Harbor & Pine Realty)\nBudget: $42,000 approved; $31,500 spent; projected total $44,800 because of two extra docking stations per office.\nTimeline: Phase 1 finished on time. Phase 2 slipped one week because of a shipping delay; new finish date is November 13.\nDecision needed by Friday: approve the $2,800 overage or remove the docking stations from Phase 2.",
            },
          ],
          rules: [
            { id: "r-followup", match: [["follow-up", "follow up"], ["demo"]], response: FOLLOWUP_EMAIL },
            {
              id: "r-summary",
              needsFile: "Riverside Rollout - Project Update.docx",
              match: [["bullet"]],
              response: "- **Budget:** $31,500 of the $42,000 budget is spent, and the project is now expected to cost $44,800, which is $2,800 over.\n- **Timeline:** Phase 2 is one week late because of a shipping delay. The new finish date is November 13.\n- **Decision needed by Friday:** approve the $2,800 overage, or remove the extra docking stations from Phase 2 to stay on budget.",
            },
            {
              id: "r-agenda",
              match: [["agenda"], ["45"]],
              response: "**Quarterly Client Review (45 minutes)**\n\n1. **Project status** (15 min): what was delivered this quarter and what's in progress\n2. **Open issues and risks** (15 min): anything blocked, late, or over budget\n3. **Next quarter planning** (15 min): priorities, dates, and owners\n\n**Notes:** Assign a time-keeper. Leave the last 2 minutes to confirm action items and owners.",
            },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Task 1, email. Ask Copilot for “a 3-paragraph follow-up email to a corporate client who attended our product demo yesterday. Recap the highlights, answer their question about pricing tiers, and propose a 30-minute call next week. Use a professional but warm tone.”",
          hint: "Type the full prompt in the prompt box and press Enter.",
          steps: [
            typeAll(
              "prompt",
              "Write a 3-paragraph follow-up email to a corporate client who attended our product demo yesterday. Recap the highlights, answer their question about pricing tiers, and propose a 30-minute call next week. Use a professional but warm tone.",
              [["3-paragraph", "three-paragraph", "3 paragraph", "three paragraph"], ["follow-up", "follow up"], "product demo", "pricing tiers", ["30-minute", "30 minute"], "professional but warm"],
              { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." },
            ),
          ],
        },
        {
          instruction: "Personalize the draft: replace [Client Name] with “Mr. Webb” and [Your Name] with “Jordan Rivera.”",
          hint: "Under the email, select Edit (pencil). Replace both placeholders and select Done.",
          steps: [typeAll("edit:r1", FOLLOWUP_EDITED, ["mr. webb", "jordan rivera"])],
        },
        {
          instruction: "Copy the personalized email.",
          hint: "Under the edited email, select Copy.",
          steps: [{ action: { kind: "command", id: "response.copy" }, requires: { selection: "msg:r1" }, selectHint: "Copy the email you just personalized." }],
        },
        {
          instruction: "Task 2, summary. Attach “Riverside Rollout - Project Update.docx” and ask for “a 3-bullet summary for a non-technical manager. Focus on budget, timeline, and the decision needed this week.”",
          hint: "Select + (Add content) › Riverside Rollout - Project Update.docx. Then type the request and press Enter.",
          steps: [
            { action: { kind: "command", id: "prompt.attach", value: "Riverside Rollout - Project Update.docx" }, requires: { selection: "chat" }, selectHint: "Attach the file in the main Copilot chat." },
            typeAll("prompt", "Give me a 3-bullet summary for a non-technical manager. Focus on budget, timeline, and the decision needed this week.", [["3-bullet", "three-bullet", "3 bullet", "three bullet"], "non-technical manager", "budget", "timeline", "decision"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." }),
          ],
        },
        {
          instruction: "Task 3, agenda. Ask Copilot for “a 45-minute agenda for a quarterly client review with three items: project status, open issues, and next quarter planning, 15 minutes each.”",
          hint: "Type the request in the prompt box and press Enter.",
          steps: [typeAll("prompt", "Write a 45-minute agenda for a quarterly client review with three items: project status, open issues, and next quarter planning, 15 minutes each.", ["agenda", ["45-minute", "45 minute"], "quarterly client review", "project status", "open issues", "next quarter"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
        {
          instruction: "Save the agenda prompt as a reusable template titled “Client review agenda.”",
          hint: "Point to your agenda prompt and select Save prompt (or View prompts › Save the prompt in the box). Type the title Client review agenda and select Save.",
          steps: [typeAll("saveprompt", "Title: Client review agenda\nPrompt: Write a 45-minute agenda for a quarterly client review with three items: project status, open issues, and next quarter planning, 15 minutes each.", ["title: client review agenda", "agenda"])],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 6: What AI Actually Is                                     */
  /* ---------------------------------------------------------------- */
  "module-6::what-ai-actually-is": [
    {
      id: "mo-m6-what-ai-is-1",
      app: "assistant",
      title: "Fluent is not the same as accurate",
      scenario:
        "A scheduling vendor told Lakeside Medical Associates its product is AI-powered. Before you evaluate that claim, test how a language model behaves: ask it to explain the terms, ask for sources and check them, regenerate the same answer, then ask what to ask the vendor.",
      fileName: "Copilot",
      minutes: 6,
      initial: assistantDoc(
        base({
          accounts: LAKESIDE_ACCOUNTS,
          history: [{ id: "h-old1", title: "Front desk phone script", when: "Last week" }],
          suggestions: ["Explain machine learning in plain language", "What questions should I ask a software vendor?", "Summarize this policy for staff", "Draft a reminder for the team"],
          rules: [
            {
              id: "r-define",
              match: [["machine learning"], ["language model", "llm"]],
              response:
                "Here's the plain-language version:\n\n- **Artificial intelligence (AI)** is the broad goal: computer systems that do tasks that normally take human intelligence. It's an umbrella term, not one technology.\n- **Machine learning** is one way to build AI. Instead of following rules a person wrote, the system learns patterns from lots of examples, like learning to spot spam from thousands of emails.\n- **A large language model (LLM)** is a machine learning model trained on huge amounts of text to predict the next word. Products like Copilot, ChatGPT, and Gemini are built on LLMs.\n\nOne important point: an LLM produces text that *sounds* right. It doesn't check whether it *is* right.",
              variants: [
                "Think of it as three nested circles:\n\n1. **AI** is the biggest circle: any system that performs tasks we associate with human thinking.\n2. **Machine learning** sits inside it: systems that are trained on data instead of being programmed rule by rule.\n3. **Large language models** sit inside machine learning: models trained on enormous amounts of text to predict likely next words. That's what powers chat assistants.\n\nBecause an LLM is predicting plausible words, its confidence tells you nothing about whether a statement is true.",
              ],
            },
            {
              id: "r-sources",
              after: "r-define",
              match: [["source"]],
              response: "Here are three sources that support the explanation:\n\n1. \"Machine Learning Basics for Office Teams,\" Digital Skills Library [1]\n2. \"How Chat Assistants Generate Text,\" Workplace Tech Guide [2]\n3. Harmon, L. (2019). \"Why Language Models Always Know the Facts,\" *Journal of Practical AI*, 4(2), 15-29 [3]",
              sources: [
                { title: "Machine Learning Basics for Office Teams", site: "digitalskills-library.example/ml-basics", body: "Machine learning systems learn patterns from examples instead of following hand-written rules. A spam filter trained on labeled emails is a common example." },
                { title: "How Chat Assistants Generate Text", site: "workplacetech-guide.example/chat-assistants", body: "Chat assistants are built on large language models, which generate text one word at a time by predicting what is likely to come next. They do not look facts up unless they are connected to a search tool." },
                { title: "Why Language Models Always Know the Facts (Journal of Practical AI, 2019)", site: "journal-of-practical-ai.example/4-2/harmon", missing: true },
              ],
              error: { claim: "Source 3 is a 2019 journal article titled \"Why Language Models Always Know the Facts.\"", correction: "The citation leads nowhere. The model produced a plausible-looking reference that doesn't exist, and its title even contradicts the lesson." },
            },
            {
              id: "r-vendor",
              match: [["vendor"], ["ai-powered", "ai powered"]],
              response: "\"AI-powered\" can mean very different things. Ask the vendor:\n\n1. **What kind of AI is it?** A large language model, a machine learning model that predicts something (like no-shows), or a set of rules someone wrote?\n2. **What does it do with our data?** Where is it processed and stored, and is it used to train their models?\n3. **Will you sign a business associate agreement (BAA)?** Required if the product handles patient information.\n4. **How accurate is it, and how do you know?** Ask for test results, not marketing claims.\n5. **What happens when it's wrong?** Who reviews its output, and can staff override it?",
            },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Ask Copilot: “What is the difference between AI, machine learning, and a large language model? Explain it in plain language.”",
          hint: "Type the question in the prompt box and press Enter.",
          steps: [typeAll("prompt", "What is the difference between AI, machine learning, and a large language model? Explain it in plain language.", ["machine learning", "large language model", "plain language"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
        {
          instruction: "Ask a follow-up in the same chat: “Give me three sources that support that explanation.”",
          hint: "Type the follow-up below the answer and press Enter.",
          steps: [typeAll("prompt", "Give me three sources that support that explanation.", [["three sources", "3 sources"]], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
        {
          instruction: "Check the sources. Open source 3.",
          hint: "In the sources response, select the small 3 (or the Sources chip numbered 3).",
          steps: [{ action: { kind: "command", id: "source.open", value: "3" }, requires: { selection: "msg:r2" }, selectHint: "Open source 3 in the sources response." }],
        },
        {
          instruction: "Source 3 doesn't exist. Report that response as Inaccurate.",
          hint: "Under the sources response, select Dislike (thumbs down), choose Inaccurate, and select Submit.",
          steps: [{ action: { kind: "command", id: "response.feedback", value: "Inaccurate" }, requires: { selection: "msg:r2" }, selectHint: "Give feedback on the response that listed the three sources." }],
        },
        {
          instruction: "Regenerate the first answer and compare the two versions. Notice the wording changes even though the question didn't.",
          hint: "Under the first answer (the explanation), select Regenerate.",
          steps: [{ action: { kind: "command", id: "response.regenerate" }, requires: { selection: "msg:r1" }, selectHint: "Regenerate the first answer, the explanation of AI, machine learning, and LLMs." }],
        },
        {
          instruction: "Now ask the work question: “A scheduling vendor says its product is AI-powered. What questions should I ask the vendor?”",
          hint: "Type the question in the prompt box and press Enter.",
          steps: [typeAll("prompt", "A scheduling vendor says its product is AI-powered. What questions should I ask the vendor?", ["vendor", ["ai-powered", "ai powered"], "question"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 6: AI as a Cloud Service                                   */
  /* ---------------------------------------------------------------- */
  "module-6::ai-as-a-cloud-service": [
    {
      id: "mo-m6-ai-cloud-1",
      app: "assistant",
      title: "Get AI help without disclosing patient information",
      scenario:
        "You need help wording a letter to a Lakeside Medical Associates patient who missed a follow-up. Copilot is open on your personal account, where prompts are processed under consumer terms. Tighten your settings, move to the work account, and ask for the help you need without a single identifier.",
      fileName: "Copilot",
      minutes: 6,
      initial: assistantDoc(
        base({
          accounts: LAKESIDE_ACCOUNTS,
          account: "personal",
          settings: { training: true, voiceTraining: true, personalization: true },
          history: [{ id: "h-old1", title: "Weekend grocery list", when: "Sat" }],
          suggestions: ["Help me phrase a difficult letter", "Make this message warmer", "Write a reminder for the front desk team"],
          policy: {
            blockTerms: ["Rosa Delgado", "Delgado", "03/14/1961", "3/14/1961", "diabetes", "MRN"],
            message: "Lakeside policy tip: this prompt looks like it contains patient information (a name, a date of birth, a record number, or a diagnosis). Remove it and describe the situation in general terms.",
          },
          rules: [
            {
              id: "r-letter",
              match: [["letter"], ["missed"], ["reschedul"]],
              response: "Here's a warm, clear draft:\n\nDear Patient,\n\nWe noticed you weren't able to make your recent follow-up appointment, and we wanted to reach out. Follow-up visits help us make sure your care plan is working for you.\n\nPlease call us at your convenience to choose a new time. Our team is happy to find a day and time that fits your schedule.\n\nWe look forward to seeing you soon.\n\nSincerely,\nLakeside Medical Associates",
            },
            {
              id: "r-letter2",
              after: "r-letter",
              match: [["[patient name]"], ["[date]"]],
              response: "Here's the template with placeholders, ready for you to fill in inside the practice's system:\n\nDear [PATIENT NAME],\n\nWe noticed you weren't able to make your follow-up appointment on [DATE], and we wanted to reach out. Follow-up visits help us make sure your care plan is working for you.\n\nPlease call us at your convenience to choose a new time. Our team is happy to find a day and time that fits your schedule.\n\nWe look forward to seeing you soon.\n\nSincerely,\nLakeside Medical Associates",
            },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "You're on your personal account. Open Settings and turn off “Model training on text.”",
          hint: "Select Settings (gear) at the bottom of the left pane. Turn off the Model training on text switch.",
          steps: [{ action: { kind: "command", id: "settings.training", value: "off" }, requires: { selection: "settings" }, selectHint: "Change it in Settings › Privacy." }],
        },
        {
          instruction: "Close Settings and switch to your Lakeside work account, where enterprise data protection applies.",
          hint: "Select Done to close Settings. Select your account at the bottom of the left pane and choose jrivera@lakesidemed.example (Work account).",
          steps: [{ action: { kind: "command", id: "account.switch", value: "work" }, requires: { selection: "account" }, selectHint: "Switch accounts from the account button at the bottom of the left pane." }],
        },
        {
          instruction: "Ask for help with no patient details: “Help me phrase a letter to a patient who missed a follow-up appointment. Keep it warm but clear about the importance of rescheduling.”",
          hint: "Type the general request (no name, date of birth, or diagnosis) and press Enter. If a policy tip appears, remove the patient details and try again.",
          steps: [typeAll("prompt", "Help me phrase a letter to a patient who missed a follow-up appointment. Keep it warm but clear about the importance of rescheduling.", ["letter", ["missed a follow-up", "missed a follow up", "missed their follow-up"], "warm", "reschedul"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
        {
          instruction: "Ask Copilot to turn it into a template: “Use [PATIENT NAME] and [DATE] as placeholders.”",
          hint: "Type the request in the same chat and press Enter.",
          steps: [typeAll("prompt", "Use [PATIENT NAME] and [DATE] as placeholders.", ["[patient name]", "[date]"], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
        {
          instruction: "Copy the template. You'll fill in the real details inside the practice's own system, not in Copilot.",
          hint: "Under the template response, select Copy.",
          steps: [{ action: { kind: "command", id: "response.copy" }, requires: { selection: "msg:r2" }, selectHint: "Copy the template with the placeholders." }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 7: Writing Effective Prompts                               */
  /* ---------------------------------------------------------------- */
  "module-7::writing-effective-prompts": [
    {
      id: "mo-m7-prompts-1",
      app: "assistant",
      title: "From a vague prompt to a reusable template",
      scenario:
        "You draft patient communications at Lakeside Medical Associates. A one-line prompt got you four bland paragraphs that sound like a debt collector. Rebuild the prompt one component at a time, fix what's still wrong with a specific follow-up, and save the result as a template you can reuse.",
      fileName: "Copilot",
      minutes: 7,
      initial: assistantDoc(
        base({
          accounts: LAKESIDE_ACCOUNTS,
          history: [{ id: "h-old1", title: "Flu clinic reminder", when: "Last week" }],
          suggestions: ["Write a letter about missed appointments", "Draft a reminder for flu shots", "Make this paragraph friendlier"],
          rules: [
            {
              id: "r-vague",
              match: [["letter about missed appointments"]],
              response: "Dear Valued Customer,\n\nOur records indicate that you failed to attend your scheduled appointment. Missed appointments result in lost time and resources for our organization and other clients.\n\nPlease be advised that repeated missed appointments may result in fees or a change to your account status. It is your responsibility to contact our office to reschedule.\n\nWe appreciate your prompt attention to this matter.\n\nSincerely,\nThe Management",
            },
            {
              id: "r-role",
              match: [["administrator"], ["family medicine"]],
              response: "Dear [Patient Name],\n\nWe noticed that you missed your recent follow-up appointment at our family medicine practice. Regular follow-up visits are an important part of managing your health, and your care team wants to make sure you are doing well.\n\nWe understand that schedules can be busy and that unexpected events happen. However, it is important that you contact our office as soon as possible so that we can arrange a new appointment and continue monitoring your condition appropriately.\n\nPlease call our front desk at your earliest convenience. Our staff will be glad to help you find a time that works for you.\n\nSincerely,\n[Your Name]\nAdministrator",
            },
            {
              id: "r-limits",
              after: "r-role",
              match: [["sixth-grade", "sixth grade", "6th grade", "6th-grade"]],
              response: "Dear [Patient Name],\n\nWe missed you at your follow-up visit. We hope you are doing well.\n\nMissing follow-up visits can cause serious problems, and we must see you soon.\n\nPlease call us to pick a new time. We will find a time that works for you.\n\nThank you,\nLakeside Medical Associates",
            },
            {
              id: "r-para2",
              after: "r-limits",
              match: [["second paragraph"]],
              response: "Dear [Patient Name],\n\nWe missed you at your follow-up visit. We hope you are doing well.\n\nWe want to help you stay healthy, and these visits are one way we do that. We're happy to answer any questions when you call.\n\nPlease call us to pick a new time. We will find a time that works for you.\n\nThank you,\nLakeside Medical Associates",
            },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "See what a vague prompt produces. Type “write a letter about missed appointments” and send it.",
          hint: "Type the prompt exactly in the prompt box and press Enter.",
          steps: [{ action: { kind: "type", target: "prompt", value: "write a letter about missed appointments", match: "includes" }, requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." }],
        },
        {
          instruction: "Add a role and an audience: “You are an administrator at a small family medicine practice. Draft a letter to a patient who missed a follow-up appointment.”",
          hint: "Type the new prompt and press Enter.",
          steps: [typeAll("prompt", "You are an administrator at a small family medicine practice. Draft a letter to a patient who missed a follow-up appointment.", ["administrator", "family medicine", "patient", ["missed a follow-up", "missed a follow up"]], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
        {
          instruction: "Iterate with constraints: “Use a sixth-grade reading level, keep it warm and non-accusatory, give no medical advice, and keep it under 200 words.”",
          hint: "Type the constraints in the same chat and press Enter.",
          steps: [typeAll("prompt", "Use a sixth-grade reading level, keep it warm and non-accusatory, give no medical advice, and keep it under 200 words.", [["sixth-grade", "sixth grade", "6th grade", "6th-grade"], ["non-accusatory", "not accusatory"], "no medical advice", "200 words"], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
        {
          instruction: "Be specific about what's still wrong: “The second paragraph sounds like a warning. Rewrite it to emphasize that we want to help.”",
          hint: "Type the request in the same chat and press Enter.",
          steps: [typeAll("prompt", "The second paragraph sounds like a warning. Rewrite it to emphasize that we want to help.", ["second paragraph", "help"], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
        {
          instruction: "Save a reusable template titled “Missed appointment letter.” The saved prompt must use the placeholders [PATIENT NAME] and [DATE].",
          hint: "Point to your role prompt and select Save prompt. Type the title, add [PATIENT NAME] and [DATE] to the prompt text, and select Save.",
          steps: [
            typeAll(
              "saveprompt",
              "Title: Missed appointment letter\nPrompt: You are an administrator at a small family medicine practice. Draft a letter to [PATIENT NAME], who missed a follow-up appointment on [DATE]. Use a sixth-grade reading level, keep it warm and non-accusatory, give no medical advice, and keep it under 200 words.",
              ["title: missed appointment letter", "[patient name]", "[date]"],
            ),
          ],
        },
        {
          instruction: "Copy the final letter.",
          hint: "Under the latest letter (with the rewritten second paragraph), select Copy.",
          steps: [{ action: { kind: "command", id: "response.copy" }, requires: { selection: "msg:r4" }, selectHint: "Copy the latest letter, the one with the rewritten second paragraph." }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 7: Verifying AI Output                                     */
  /* ---------------------------------------------------------------- */
  "module-7::verifying-ai-output": [
    {
      id: "mo-m7-verify-1",
      app: "assistant",
      title: "Catch the confident mistake before staff act on it",
      scenario:
        "You're preparing a records retention summary for Lakeside Medical Associates staff. Staff will act on it, so every section number and retention period has to match the policy. Check Copilot's citation against the actual policy, get the error fixed, and recompute the math yourself.",
      fileName: "Copilot",
      minutes: 7,
      initial: assistantDoc(
        base({
          accounts: LAKESIDE_ACCOUNTS,
          history: [{ id: "h-old1", title: "Shredding log template", when: "Last week" }],
          suggestions: ["Summarize this policy for staff", "Turn these notes into a checklist", "Explain this in plain language"],
          files: [
            { name: "Lakeside Records Management Policy.pdf", size: "212 KB", preview: RETENTION_POLICY },
            { name: "Archive Box Count.xlsx", size: "11 KB", preview: "Archive boxes by room: Room A 14, Room B 27, Room C 9, Room D 33." },
          ],
          rules: [
            {
              id: "r-ret",
              needsFile: "Lakeside Records Management Policy.pdf",
              match: [["retention"]],
              response: "**Records retention at Lakeside: staff summary**\n\n- **Appointment schedules:** keep for 3 years [1].\n- **Billing and payment records:** keep for **5 years**, as required by **Section 9.4** [1].\n- **Signed patient consent forms:** keep for 10 years [1].\n- **Destroying records:** use a shredding log signed by the office manager [1].\n\nQuestions go to the compliance officer, Denise Park.",
              sources: [{ title: "Lakeside Records Management Policy.pdf", site: "Attached file", body: RETENTION_POLICY }],
              error: { claim: "Billing records are kept for 5 years under Section 9.4.", correction: "The policy has no Section 9.4. Section 6.2 says billing and payment records are kept for 7 years from the date of service." },
            },
            {
              id: "r-ret2",
              after: "r-ret",
              match: [["6.2"], ["7 years", "seven years"]],
              response: "You're right. Here's the corrected summary:\n\n**Records retention at Lakeside: staff summary**\n\n- **Appointment schedules:** keep for 3 years (Section 6.1) [1].\n- **Billing and payment records:** keep for **7 years from the date of service** (Section 6.2) [1].\n- **Signed patient consent forms:** keep for 10 years (Section 6.3) [1].\n- **Destroying records:** use a shredding log signed by the office manager (Section 6.4) [1].\n\nQuestions go to the compliance officer, Denise Park, at extension 214.",
              sources: [{ title: "Lakeside Records Management Policy.pdf", site: "Attached file", body: RETENTION_POLICY }],
            },
            { id: "r-boxes", match: [["14", "fourteen"], ["27"], ["33"]], response: "Adding them up: 14 + 27 + 9 + 33 = **73 boxes** to archive.", error: { claim: "14 + 27 + 9 + 33 = 73.", correction: "The correct total is 83. Language models are unreliable at arithmetic, so recompute every total yourself." } },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Attach “Lakeside Records Management Policy.pdf” and ask Copilot to “Summarize the records retention rules in this policy for staff.”",
          hint: "Select + (Add content) › Lakeside Records Management Policy.pdf. Then type the request and press Enter.",
          steps: [
            { action: { kind: "command", id: "prompt.attach", value: "Lakeside Records Management Policy.pdf" }, requires: { selection: "chat" }, selectHint: "Attach the policy in the main Copilot chat." },
            typeAll("prompt", "Summarize the records retention rules in this policy for staff.", ["summar", "retention"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." }),
          ],
        },
        {
          instruction: "The billing line cites Section 9.4. Open source 1 and check it against the actual policy.",
          hint: "Select the small 1 after the billing line (or the Sources chip numbered 1) and read the policy in the panel.",
          steps: [{ action: { kind: "command", id: "source.open", value: "1" }, requires: { selection: "msg:r1" }, selectHint: "Open source 1 in the retention summary." }],
        },
        {
          instruction: "The policy has no Section 9.4, and billing records are kept 7 years, not 5. Report the response as Inaccurate.",
          hint: "Under the retention summary, select Dislike (thumbs down), choose Inaccurate, and select Submit.",
          steps: [{ action: { kind: "command", id: "response.feedback", value: "Inaccurate" }, requires: { selection: "msg:r1" }, selectHint: "Give feedback on the retention summary." }],
        },
        {
          instruction: "Ask Copilot to correct it: “Section 9.4 does not exist. Use Section 6.2, which says billing records are kept for 7 years.”",
          hint: "Type the correction in the same chat and press Enter.",
          steps: [typeAll("prompt", "Section 9.4 does not exist. Use Section 6.2, which says billing records are kept for 7 years.", ["6.2", ["7 years", "seven years"]], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
        {
          instruction: "Ask: “Add up the archive boxes: 14 + 27 + 9 + 33.”",
          hint: "Type the question in the prompt box and press Enter.",
          steps: [typeAll("prompt", "Add up the archive boxes: 14 + 27 + 9 + 33.", ["14", "27", "9", "33"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." })],
        },
        {
          instruction: "Recompute the total yourself. It's wrong. Edit the response so the total reads 83 boxes.",
          hint: "14 + 27 + 9 + 33 = 83. Under the total, select Edit (pencil), change 73 to 83, and select Done.",
          steps: [typeAll("edit:r3", "Adding them up: 14 + 27 + 9 + 33 = **83 boxes** to archive.", ["83"])],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 15: Capstone (AI-assisted work)                            */
  /* ---------------------------------------------------------------- */
  "module-15::capstone-simulation": [
    {
      id: "mo-m15-capstone-ai-1",
      app: "assistant",
      title: "Capstone part 3: documented AI assistance",
      scenario:
        "The capstone requires AI assistance on at least two tasks, with your prompt, the raw output, and your edited final version. Draft the client email to Marcus Webb with a five-part prompt and personalize it, then turn your call notes into a recap and catch the date Copilot gets wrong.",
      fileName: "Copilot",
      minutes: 7,
      initial: assistantDoc(
        base({
          files: [
            {
              name: "Q3 Review Call Notes.docx",
              size: "19 KB",
              preview: "Q3 Contract Review, Thursday 10/22/2026. Attendees: Marcus Webb (Webb & Lowe Accounting), Dana Cole, Jordan Rivera.\nDecisions: renew for 12 months; add setup for two new workstations.\nAction items: Dana Cole sends the final quote by 10/23/2026. Jordan Rivera updates the tracker today.\nRenewal paperwork is due November 30.",
            },
          ],
          rules: [
            {
              id: "r-cap-email",
              match: [["marcus webb", "mr. webb"], ["renewal"]],
              response: "**Subject:** Next steps on your contract renewal\n\nHi [Client Name],\n\nThank you for meeting with us about your Q3 contract review. We're glad Webb & Lowe Accounting plans to renew, and we've noted your request to include setup for the two new workstations.\n\nDana Cole will send the final quote by Friday. If you have any questions before then, reply to this email and we'll get back to you the same day.\n\nBest regards,\n[Your Name]\nTOR Tech",
            },
            {
              id: "r-cap-recap",
              needsFile: "Q3 Review Call Notes.docx",
              match: [["decision"], ["action item", "next step"]],
              response: "**Recap: Q3 Contract Review, Thursday 10/22/2026**\n\n**Decisions**\n- Renew the contract for 12 months.\n- Add setup for two new workstations.\n\n**Action items**\n- Dana Cole: send the final quote by 10/23/2026.\n- Jordan Rivera: update the client tracker today.\n\n**Deadline:** renewal paperwork is due **November 15**.",
              error: { claim: "The recap says the renewal paperwork is due November 15.", correction: "The call notes say the paperwork is due November 30." },
            },
            { id: "r-cap-fix", after: "r-cap-recap", match: [["november 30", "nov 30", "11/30"]], response: "Corrected recap:\n\n**Recap: Q3 Contract Review, Thursday 10/22/2026**\n\n**Decisions**\n- Renew the contract for 12 months.\n- Add setup for two new workstations.\n\n**Action items**\n- Dana Cole: send the final quote by 10/23/2026.\n- Jordan Rivera: update the client tracker today.\n\n**Deadline:** renewal paperwork is due **November 30**." },
          ],
        }),
      ),
      tasks: [
        {
          instruction: "Draft the client email with a five-part prompt: role (“Act as an office assistant at TOR Tech”), task (an email to Marcus Webb about next steps on his renewal), context (“he asked us to include setup for two new workstations”), format (“two short paragraphs”), and tone (“professional and friendly”).",
          hint: "Type, for example: “Act as an office assistant at TOR Tech. Write an email to Marcus Webb about next steps on his renewal. He asked us to include setup for two new workstations. Use two short paragraphs and a professional and friendly tone.” Press Enter.",
          steps: [
            typeAll(
              "prompt",
              "Act as an office assistant at TOR Tech. Write an email to Marcus Webb about next steps on his renewal. He asked us to include setup for two new workstations. Use two short paragraphs and a professional and friendly tone.",
              ["act as an office assistant", "marcus webb", "renewal", ["two new workstations", "2 new workstations"], ["two short paragraphs", "2 short paragraphs"], "professional and friendly"],
              { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." },
            ),
          ],
        },
        {
          instruction: "Edit the raw output into your final version: replace [Client Name] with “Mr. Webb” and [Your Name] with “Jordan Rivera.”",
          hint: "Under the email, select Edit (pencil). Replace both placeholders and select Done.",
          steps: [
            typeAll(
              "edit:r1",
              "**Subject:** Next steps on your contract renewal\n\nHi Mr. Webb,\n\nThank you for meeting with us about your Q3 contract review. We're glad Webb & Lowe Accounting plans to renew, and we've noted your request to include setup for the two new workstations.\n\nDana Cole will send the final quote by Friday. If you have any questions before then, reply to this email and we'll get back to you the same day.\n\nBest regards,\nJordan Rivera\nTOR Tech",
              ["mr. webb", "jordan rivera"],
            ),
          ],
        },
        {
          instruction: "Copy your final version for the capstone documentation.",
          hint: "Under the edited email, select Copy.",
          steps: [{ action: { kind: "command", id: "response.copy" }, requires: { selection: "msg:r1" }, selectHint: "Copy the email you just edited." }],
        },
        {
          instruction: "Attach “Q3 Review Call Notes.docx” and ask Copilot to “Write a recap with the decisions and action items.”",
          hint: "Select + (Add content) › Q3 Review Call Notes.docx. Then type the request and press Enter.",
          steps: [
            { action: { kind: "command", id: "prompt.attach", value: "Q3 Review Call Notes.docx" }, requires: { selection: "chat" }, selectHint: "Attach the notes in the main Copilot chat." },
            typeAll("prompt", "Write a recap with the decisions and action items.", ["decision", ["action item", "next step"]], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." }),
          ],
        },
        {
          instruction: "Check the recap against the call notes. The deadline is wrong. Report the response as Inaccurate.",
          hint: "Select the attached notes to compare. Then under the recap, select Dislike (thumbs down), choose Inaccurate, and select Submit.",
          steps: [{ action: { kind: "command", id: "response.feedback", value: "Inaccurate" }, requires: { selection: "msg:r2" }, selectHint: "Give feedback on the recap." }],
        },
        {
          instruction: "Ask Copilot to fix it: “The call notes say the renewal paperwork is due November 30. Please correct the recap.”",
          hint: "Type the correction in the same chat and press Enter.",
          steps: [typeAll("prompt", "The call notes say the renewal paperwork is due November 30. Please correct the recap.", [["november 30", "nov 30", "11/30"], ["correct", "fix"]], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
      ],
    },
  ],
};
