import { Lesson } from "@/types/lesson";
import { outlookSlides } from "./slides";

const IMG = "/images/ms-office/outlook/module-3";

export const outlookModule3Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "folders-archive",
    title: "Folders, Archive, and Favorites",
    description:
      "Design a folder structure that matches how a medical front desk works, create folders and subfolders, move several messages at once, and keep your busiest folders in Favorites.",
    objectives: [
      "Plan a small folder structure based on how the office works",
      "Create folders and subfolders in new Outlook",
      "Move one or several messages into a folder",
      "Add a folder to Favorites and use Archive for finished mail",
    ],
    duration: "16 min",
    slides: outlookSlides["module-3/folders-archive"],
    sections: [
      {
        heading: "The Inbox is a to-do list",
        blocks: [
          {
            type: "scenario",
            role: "You are organizing the Lakeside front desk mailbox.",
            text: "The Inbox has 140 messages: referral confirmations, insurance notices from three plans, vendor invoices, newsletters, and a few messages that actually need you today. Denise asks for a system so that anyone covering the desk can find a referral in seconds.",
            task: "Build a short list of folders that matches the work, and keep the Inbox for messages that still need action.",
          },
          {
            type: "paragraph",
            text: "A good folder structure follows the work, not the sender. Ask what question you will be answering when you look for a message later: \"Did the imaging center confirm the referral?\" points to a Referrals folder. Keep it short. Five to eight top-level folders are easier to use than thirty, and search (Lesson 4) finds the rest.",
          },
          {
            type: "table",
            caption: "A front desk folder plan",
            columns: ["Folder", "What goes in it"],
            rows: [
              ["Referrals", "Referral requests and confirmations from other offices"],
              ["Insurance & Billing › Metro Health Plan", "Claim and prior authorization messages, one subfolder per busy plan"],
              ["Vendors", "Quotes, orders and invoices"],
              ["Staff & Internal", "Schedules and procedures from coworkers"],
              ["Newsletters", "Subscriptions you read later (a rule can fill this for you)"],
              ["Archive (built in)", "Finished messages you must keep"],
            ],
          },
        ],
      },
      {
        heading: "Create folders and move messages",
        blocks: [
          {
            type: "list",
            items: [
              "Top-level folder: right-click your email address in the folder pane (or point to it and select More options) and choose Create new folder. Type the name and press Enter. You can also select Create new folder at the bottom of your folder list.",
              "Subfolder: right-click the folder it belongs in, such as Inbox or Insurance & Billing, and choose Create new subfolder.",
              "Move a message: select it, then Home tab › Move to, and pick the folder. You can also drag it onto the folder, or right-click it › Move.",
              "Move several at once: click the first message, then hold Ctrl and click the others. Shift+click selects everything between two messages.",
              "Rename or delete a folder you made: right-click it. Built-in folders such as Inbox and Sent Items can't be renamed or deleted.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/folder-menu.png`,
            alt: "Right-clicking the Inbox in the new Outlook folder pane shows Create new subfolder, Mark all as read, and Remove from Favorites (the Inbox is already a favorite)",
            caption: "Right-click a folder to create a subfolder inside it.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: right-click a folder › New Folder, or use the Folder tab › New Folder (Ctrl+Shift+E). Move messages with Home tab › Move.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "File the mail",
            prompt: "Drag each message into the folder where you would file it.",
            buckets: [
              { id: "ref", label: "Referrals" },
              { id: "ins", label: "Insurance & Billing" },
              { id: "ven", label: "Vendors" },
              { id: "inbox", label: "Leave in Inbox" },
            ],
            items: [
              { id: "m1", text: "Imaging center: \"Referral received, we will call the patient\"", bucket: "ref" },
              { id: "m2", text: "Metro Health Plan: \"Claim 48213 processed\"", bucket: "ins" },
              { id: "m3", text: "BrightPath: \"Invoice BP-20817\"", bucket: "ven" },
              { id: "m4", text: "Dr. Patel: \"Please call the patient back today\"", bucket: "inbox" },
              { id: "m5", text: "Metro Health Plan: \"Prior authorization needed\" (you must act)", bucket: "inbox" },
            ],
            explanation: "File messages that are finished. A message that still needs action stays in the Inbox until you have done it, even if it belongs in a folder later.",
          },
        ],
      },
      {
        heading: "Favorites and Archive",
        blocks: [
          {
            type: "paragraph",
            text: "Favorites, at the top of the folder pane, keeps the folders you open most within one click, no matter how long your folder list gets. Right-click a folder and choose Add to Favorites; right-click it in Favorites to remove it. Archive (Home tab) moves a finished message to the built-in Archive folder, where it stays searchable.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Folders don't change who can see a message, and they don't replace your practice's records rules. Keep email about patient care, claims and referrals in the practice mailbox, never in personal email or a USB drive.",
          },
          {
            type: "worked-example",
            title: "Setting up for the next person on the desk",
            task: "Make the Lakeside mailbox easy for whoever covers the front desk tomorrow.",
            steps: [
              { move: "Create Referrals under the Inbox, and Metro Health Plan under Insurance & Billing.", why: "Folders named for the work answer the questions people actually ask." },
              { move: "Ctrl+click both Metro claim messages and move them together.", why: "Moving in batches is faster and keeps related messages together." },
              { move: "Add Referrals to Favorites.", why: "Referrals are checked many times a day; Favorites keeps the folder at the top." },
              { move: "Archive the newsletter you already read.", why: "It's finished but harmless to keep. The Inbox now shows only work left to do." },
            ],
            result: "A short folder list, Referrals one click away, and an Inbox that is a to-do list.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "How do you make a folder inside Insurance & Billing in new Outlook?",
            options: ["Folder tab › New Folder", "Right-click Insurance & Billing › Create new subfolder", "Settings › Mail › Folders", "Drag a message onto the folder"],
            correctIndex: 1,
            explanation: "Right-click the folder that will hold the new one and choose Create new subfolder.",
            optionRationales: [
              "The Folder tab is in classic Outlook.",
              "Correct.",
              "Folders aren't created in Settings.",
              "Dragging moves a message; it doesn't create a folder.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which message should stay in the Inbox?",
            options: ["A processed claim notice", "An invoice that was already paid", "A physician's request to call a patient back today", "A newsletter you read"],
            correctIndex: 2,
            explanation: "The Inbox holds work that isn't done yet. The callback still needs you.",
            optionRationales: [
              "A processed claim is finished; file it.",
              "A paid invoice is finished; file it under Vendors.",
              "Correct. It still needs action.",
              "A read newsletter can be archived or deleted.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Design and build a front desk folder system.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a folder plan for Lakeside Medical Associates with five to eight folders (subfolders count). For each folder, write one sentence about what goes in it.",
          "In your own Outlook (new Outlook or Outlook on the web), create at least three of the folders, including one subfolder, and add one folder to Favorites. Take a screenshot of the folder pane.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your folder plan and either your folder pane screenshot or your Challenge Lab results page (Print or save results) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "categories-flags",
    title: "Categories, Flags, Pins, and Snooze",
    description:
      "Label messages with color categories, flag them for follow-up, pin the ones you use every day, and snooze the ones you can't act on yet.",
    objectives: [
      "Create a category, give it a meaningful name, and apply it",
      "Flag a message for follow-up and mark the flag complete",
      "Pin a message to the top of the list",
      "Snooze a message so it comes back when you can act on it",
    ],
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/2iml6FlyQak",
    slides: outlookSlides["module-3/categories-flags"],
    sections: [
      {
        heading: "Tags that don't move the message",
        blocks: [
          {
            type: "scenario",
            role: "You are working the Lakeside front desk inbox.",
            text: "Keisha's copay questions and a vendor invoice both need billing's attention, but they live in different places. A prior authorization needs a follow-up tomorrow. Denise's procedure list should never scroll out of sight. Next week's meeting agenda is noise until next week.",
            task: "Use categories, flags, pins and snooze so each message shows up when and where you need it.",
          },
          {
            type: "table",
            caption: "Four ways to tag a message",
            columns: ["Tool", "What it does", "Use it for"],
            rows: [
              ["Category", "A named color label", "Grouping by topic across folders: Billing, Referrals, Urgent"],
              ["Flag", "Marks a message for follow-up, with a due date if you choose one", "Things you must do later; flagged messages also appear in To Do"],
              ["Pin", "Keeps a message at the top of the message list", "Reference messages you use every day"],
              ["Snooze", "Hides a message until a time you choose, then brings it back", "Messages you can't act on yet"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the right tag",
            prompt: "Match each situation to the tool that handles it best.",
            items: [
              { id: "c1", text: "Category", match: "Show at a glance which messages are for billing" },
              { id: "c2", text: "Flag", match: "Remind yourself to call an insurance company tomorrow" },
              { id: "c3", text: "Pin", match: "Keep the office procedure list at the top of the Inbox" },
              { id: "c4", text: "Snooze", match: "Hide next week's agenda until next week" },
            ],
            explanation: "Categories label, flags remind, pins keep things in view, and snooze hides things until they matter.",
          },
        ],
      },
      {
        heading: "Categories",
        blocks: [
          {
            type: "list",
            items: [
              "Apply a category: select the message, then Home tab › Categorize and pick one. You can also right-click the message › Categorize.",
              "Create a category: Categorize › New category. Name it, choose a color, and save. Outlook lists it under Categorize from then on.",
              "Rename or recolor categories in Settings › Accounts › Categories, or from Categorize › Manage categories.",
              "Names matter more than colors. \"Billing\" means something to everyone; \"Green category\" doesn't. About one in twelve men has some form of color vision deficiency, so never rely on color alone.",
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Home tab › Tags › Categorize › All Categories to rename, recolor or add categories.",
          },
        ],
      },
      {
        heading: "Flags, pins, and snooze",
        blocks: [
          {
            type: "list",
            items: [
              "Flag: select the message and choose Flag / Unflag on the Home tab, or point to it and select the flag. Use the arrow next to Flag / Unflag to choose when you want to follow up, such as today or tomorrow.",
              "Flagged messages appear in the Flagged email list in To Do, so your follow-ups sit next to your tasks (Module 5).",
              "When you are done, mark the flag complete. Clearing a flag removes it without completing it.",
              "Pin: Home tab › Pin / Unpin, or the pin that appears when you point to a message. Pinned messages stay at the top of the folder.",
              "Snooze: Home tab › Snooze, then choose when the message should come back. It disappears from the list and reappears at that time.",
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Home tab › Tags › Follow Up sets flags with due dates. Microsoft's feature comparison lists Snooze and Pin as new Outlook features that classic Outlook doesn't support.",
          },
          {
            type: "tip",
            text: "Flags are promises. A flag left on a message for weeks trains you to ignore flags. Review flagged messages at the start and end of each day, and clear or complete them.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want every billing-related message to show a \"Billing\" label, wherever it is filed. What do you use?",
            options: ["A flag", "A category named Billing", "A pin", "Snooze"],
            correctIndex: 1,
            explanation: "Categories are named labels that work across folders.",
            optionRationales: [
              "A flag means \"follow up,\" not a topic.",
              "Correct.",
              "Pins keep a message at the top; they don't label topics.",
              "Snooze hides a message for a while.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Where else do flagged messages show up in new Outlook?",
            options: ["Deleted Items", "The Flagged email list in To Do", "Junk Email", "The Archive folder"],
            correctIndex: 1,
            explanation: "Flagging a message places it in To Do's Flagged email list.",
            optionRationales: ["No.", "Correct.", "No.", "No."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Create a tagging system for the front desk.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a list of four categories for Lakeside (for example Billing, Referrals, Patients, Vendors), each with a color and one sentence on when to use it.",
          "Write three rules of thumb for flags (for example, \"Flag only what I will do within a week\").",
          "Complete the practice simulation in this lesson until every task is done on the first try, then print or save your results.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your category list, your three flag rules, and your practice simulation results page to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "rules-sweep",
    title: "Rules and Sweep",
    description:
      "Have Outlook file predictable mail for you: create rules from a message or in Settings, run a rule on messages you already have, and clear out repeat senders with Sweep.",
    objectives: [
      "Create a rule from a message in a few clicks",
      "Build a rule in Settings with a condition and an action",
      "Run a rule on messages already in the Inbox, and turn rules off or on",
      "Use Sweep to clear out messages from one sender",
    ],
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/cPq_AJCmgrw",
    slides: outlookSlides["module-3/rules-sweep"],
    sections: [
      {
        heading: "Let Outlook do the predictable filing",
        blocks: [
          {
            type: "scenario",
            role: "You manage the Lakeside front desk inbox.",
            text: "Every Monday a newsletter arrives. Every day Metro Health Plan sends claim notices, and BrightPath sends a promotion. You file them by hand every time.",
            task: "Turn the filing you do by hand into rules, and use Sweep to clear the backlog.",
          },
          {
            type: "paragraph",
            text: "A rule has three parts: a condition (when a message is from this sender, or has these words in the subject), an action (move it to this folder, categorize it, mark it read), and optional exceptions. Rules run on messages as they arrive. They are the best tool for mail that is predictable: the same sender, the same kind of message, every time.",
          },
        ],
      },
      {
        heading: "Create a rule",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Fastest: right-click a message from the sender › Rules › Create rule. Choose the folder for messages from that sender and select OK. Select More options to build a fuller rule.",
              "From Settings: Settings › Mail › Rules › Add new rule. Name the rule, select Add a condition and Add an action (and Add an exception if needed).",
              "Check Stop processing more rules when a message that matches this rule shouldn't be handled by any later rules.",
              "Select Save.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/rules-settings.png`,
            alt: "Settings, Mail, Rules in new Outlook with a rule named Metro claims: condition From claims@metrohealthplan.example.com, action Move to Insurance & Billing, and the Run rule now button",
            caption: "Settings › Mail › Rules. The play button runs a rule on messages already in your Inbox.",
          },
          {
            type: "paragraph",
            text: "New rules only handle messages that arrive after you create them. To apply a rule to messages already in your Inbox, go to Settings › Mail › Rules and select Run rule now next to it. The switch next to each rule turns it off and on without deleting it.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Home tab › Rules › Create Rule, or Manage Rules & Alerts for the Rules Wizard. Classic Outlook can run some rules only while Outlook is open on your computer; Microsoft notes that some rules made in classic Outlook may not run in new Outlook.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Build a rule in Settings",
            prompt: "Put the steps for creating a rule in Settings in order.",
            items: [
              { id: "r1", text: "Open Settings › Mail › Rules" },
              { id: "r2", text: "Select Add new rule and name it" },
              { id: "r3", text: "Add a condition: From claims@metrohealthplan.example.com" },
              { id: "r4", text: "Add an action: Move to Insurance & Billing" },
              { id: "r5", text: "Select Save" },
              { id: "r6", text: "Select Run rule now to file the messages you already have" },
            ],
            explanation: "Name, condition, action, save. Then run it once so existing messages are filed too.",
          },
        ],
      },
      {
        heading: "Sweep",
        blocks: [
          {
            type: "paragraph",
            text: "Sweep clears out messages from one sender in a few clicks. Select a message from the sender, then select Sweep on the Home tab and choose how to handle that sender's mail: clear out all of it (and, if you like, everything they send from now on), keep only the latest message, or clear out messages older than 10 days. Then select Sweep.",
          },
          {
            type: "list",
            items: [
              "Sweep is ideal for daily promotions, automated notices and newsletters where only the newest matters.",
              "Sweep isn't available in Junk Email, Drafts, Sent Items or Deleted Items.",
              "Sweep is a new Outlook and Outlook on the web feature; classic Outlook doesn't have it. The closest classic tool is Clean Up Conversation.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Don't sweep or rule-delete mail that might be a record, such as claim notices or lab messages. Move those to a folder instead, and delete only mail with no future value.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You created a rule that moves newsletters to a folder, but last week's newsletters are still in the Inbox. Why, and how do you fix it?",
            options: [
              "The rule is broken; delete it",
              "Rules handle new messages; run the rule now from Settings › Mail › Rules",
              "Rules only work in classic Outlook",
              "Move them by hand every week",
            ],
            correctIndex: 1,
            explanation: "Rules run on arriving mail. Run rule now applies the rule to messages already in your Inbox.",
            optionRationales: [
              "The rule works; it just hasn't been run on older mail.",
              "Correct.",
              "Rules work in new Outlook.",
              "That's the work the rule is meant to save.",
            ],
          },
          {
            type: "knowledge-check",
            question: "A vendor sends a promotion every day and only the newest one matters. Which Sweep choice fits?",
            options: ["Clear out all of the sender's messages", "Keep only the latest message", "Clear out messages older than 10 days", "Block the sender"],
            correctIndex: 1,
            explanation: "Keeping only the latest message clears the old ones and keeps doing it.",
            optionRationales: [
              "That clears every message, including the newest.",
              "Correct.",
              "That would leave up to ten days of promotions.",
              "Blocking sends all of them to Junk Email, including any you want.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Plan and test rules for the front desk.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a table of three rules for the Lakeside front desk. For each rule, give the name, the condition, the action, and whether it should stop processing more rules.",
          "In your own Outlook, create one of the rules and run it. On a school computer, do this in the Challenge Lab below.",
          "Write two sentences explaining when you would use Sweep instead of a rule.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your rules table, your two sentences, and a screenshot of your rule (or your Challenge Lab results page from Print or save results) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "search-filter",
    title: "Search and Filters",
    description:
      "Find any message in seconds with the Search box, search filters and search operators, and narrow a folder with the message list Filter.",
    objectives: [
      "Search the whole mailbox from the Search box",
      "Narrow a search with filters or operators such as from: and hasattachment:yes",
      "Act on a search result and leave search",
      "Filter a folder to show only unread, flagged or attached messages",
    ],
    duration: "14 min",
    slides: outlookSlides["module-3/search-filter"],
    sections: [
      {
        heading: "Search beats scrolling",
        blocks: [
          {
            type: "scenario",
            role: "You are answering the phones at the Lakeside front desk.",
            text: "A patient calls about claim 48213. Keisha wants to know which spreadsheets she sent you this month. Luis can't find the vaccine fridge log he emailed weeks ago, which someone archived.",
            task: "Find each message in under a minute, without scrolling.",
          },
          {
            type: "list",
            items: [
              "Select the Search box at the top of the Outlook window, type a word, name, or number, and press Enter.",
              "Search looks through your folders, including Archive, so filed mail is still easy to find.",
              "Select the filter button at the right end of the Search box to search by From, To, Subject, keywords or attachments. The Ribbon also shows a Search tab with options to refine the results.",
              "Act on a result the same way as any message: open it, reply, move it, flag it.",
              "To leave search, select the X in the Search box or Exit search on the Search tab.",
            ],
          },
          {
            type: "table",
            caption: "Search operators (type them in the Search box)",
            columns: ["Type this", "To find"],
            rows: [
              ["from:keisha", "Messages from Keisha"],
              ["from:\"Keisha Grant\"", "Messages from a full name (quotes around names with spaces)"],
              ["subject:claim", "Messages with \"claim\" in the subject"],
              ["hasattachment:yes", "Messages with attachments"],
              ["received:\"this week\"", "Messages received this week"],
              ["claim AND metro", "Messages with both words (AND, OR and NOT must be in capital letters)"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Write the search",
            prompt: "Match each request to the search that finds it.",
            items: [
              { id: "s1", text: "from:keisha hasattachment:yes", match: "Keisha's messages that have files attached" },
              { id: "s2", text: "48213", match: "Anything about claim number 48213" },
              { id: "s3", text: "subject:referral", match: "Messages with \"referral\" in the subject" },
              { id: "s4", text: "fridge log", match: "Luis's archived temperature log" },
            ],
            explanation: "Plain words search everywhere. Operators narrow the search to one sender, the subject, or messages with attachments.",
          },
        ],
      },
      {
        heading: "Filter a folder",
        blocks: [
          {
            type: "paragraph",
            text: "Filter works on the folder you are looking at, without searching. Select Filter (the funnel at the top of the message list) and choose Unread, Flagged, To me, Has files, or Mentions me. Choose All, or select the X on the filter label, to see everything again.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: search with the Search box above the message list (Ctrl+E). The Search tab lets you choose Current Folder or All Mailboxes and refine by From, Subject, Has Attachments and more. Filter Email on the Home tab filters a folder.",
          },
          {
            type: "tip",
            text: "Never search by a patient's full name and date of birth on a shared screen where others can see the results. Use claim numbers or account numbers when you can.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which search finds messages from Keisha that have attachments?",
            options: ["keisha attachments", "from:keisha hasattachment:yes", "to:keisha files", "Keisha AND attached"],
            correctIndex: 1,
            explanation: "from: limits the search to a sender, and hasattachment:yes limits it to messages with attachments.",
            optionRationales: [
              "Plain words search the text, not the sender or attachments.",
              "Correct.",
              "to: finds messages sent to Keisha.",
              "This finds messages containing both words, not messages with attachments.",
            ],
          },
          {
            type: "knowledge-check",
            question: "A message was archived weeks ago. Will search find it?",
            options: ["No, search only looks in the Inbox", "Yes, search looks through your folders, including Archive", "Only if you open Archive first", "Only in classic Outlook"],
            correctIndex: 1,
            explanation: "Archived mail stays searchable.",
            optionRationales: ["Search covers your folders.", "Correct.", "You don't need to open Archive first.", "It works in new Outlook."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice searching like a pro.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Complete the practice simulation in this lesson.",
          "In your own mailbox (school or personal), run three searches: one plain word, one with from:, and one with hasattachment:yes. Write each search and how many results it found. Don't include private details.",
          "Write a short how-to (five steps or fewer) for a new coworker on finding a message that was filed in the wrong folder.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your three searches with result counts and your how-to to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "quick-steps-focused",
    title: "Quick Steps and Focused Inbox",
    description:
      "Bundle the actions you repeat into one-click quick steps, and train Focused Inbox so the mail that matters stays in front of you.",
    objectives: [
      "Create a quick step with more than one action",
      "Use a quick step on a message",
      "Turn Focused Inbox on or off",
      "Move senders between Focused and Other for good",
    ],
    duration: "14 min",
    slides: outlookSlides["module-3/quick-steps-focused"],
    sections: [
      {
        heading: "Quick steps: your repeated work, in one click",
        blocks: [
          {
            type: "scenario",
            role: "You process billing mail at the Lakeside front desk.",
            text: "Each time you finish with a billing message you do the same three clicks: mark it read, open Move to, choose Insurance & Billing. You do it thirty times a day.",
            task: "Turn those clicks into one quick step, and set up Focused Inbox so billing and lab notices don't get lost under newsletters.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "On the Home tab, select the arrow next to Quick steps and choose Manage quick steps.",
              "Under Quick steps in Settings, select New quick step.",
              "Name it, then under Choose an action pick the first action, such as Move to folder › Insurance & Billing.",
              "Select Add another action for more, such as Mark as read.",
              "Optionally choose a shortcut (Ctrl+Shift+5 through 9) and add a description that shows when you point to the quick step.",
              "Select Save. Your quick step appears in the Quick steps menu on the Home tab.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Microsoft notes that quick steps can't be undone with Ctrl+Z, because some actions, such as permanently deleting, can't be reversed. Test a new quick step on one message first.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Quick Steps is a group on the Home tab with ready-made steps such as To Manager and Team Email. Select Create New in the group to make your own.",
          },
        ],
      },
      {
        heading: "Focused Inbox",
        blocks: [
          {
            type: "list",
            items: [
              "Turn it on or off: Settings › Mail › Message list › Sort messages into Focused and Other.",
              "Move one message: right-click › Move › Move to Other inbox (or Move to Focused inbox).",
              "Move a sender for good: right-click › Move › Always move to Other inbox (or Always move to Focused inbox). Future messages from that sender follow.",
              "Check Other once or twice a day. Important mail can land there until Outlook learns.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Focused or Other?",
            prompt: "Decide where each sender's mail belongs for the front desk.",
            buckets: [
              { id: "focused", label: "Focused" },
              { id: "other", label: "Other" },
            ],
            items: [
              { id: "f1", text: "Lab services: results portal notices", bucket: "focused" },
              { id: "f2", text: "A healthcare admin newsletter", bucket: "other" },
              { id: "f3", text: "The office manager", bucket: "focused" },
              { id: "f4", text: "A vendor's daily promotions", bucket: "other" },
              { id: "f5", text: "An insurance plan's claim notices", bucket: "focused" },
            ],
            explanation: "Anything that affects patients, claims or the schedule belongs in Focused. Marketing and newsletters belong in Other.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where do you create a quick step in new Outlook?",
            options: ["File › Options", "Home tab › Quick steps › Manage quick steps", "Help tab", "Right-click the Inbox"],
            correctIndex: 1,
            explanation: "Manage quick steps opens the Quick steps page in Settings, where you select New quick step.",
            optionRationales: ["New Outlook has no File tab.", "Correct.", "No.", "The folder menu doesn't create quick steps."],
          },
          {
            type: "knowledge-check",
            question: "A newsletter keeps landing in Focused. What makes future issues go to Other?",
            options: ["Move to Other inbox", "Always move to Other inbox", "Mark as read", "Delete it"],
            correctIndex: 1,
            explanation: "Always move to Other inbox applies to future messages from that sender.",
            optionRationales: ["That moves only this message.", "Correct.", "Reading it doesn't teach Focused Inbox.", "Deleting doesn't change where future issues go."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Design quick steps for a medical front desk.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write two quick steps you would create at Lakeside. For each, give a name, the actions in order, and when you would use it.",
          "Complete the practice simulation in this lesson until every task is done on the first try, and print or save your results.",
          "Write two sentences on why you should check the Other tab every day.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your two quick step designs, your simulation results page, and your two sentences to your instructor or course folder.",
      },
    ],
  },
];
