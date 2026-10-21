import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/onedrive/module-3";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const onedriveModule3Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "sharing-with-the-right-permission",
    title: "Sharing Files with the Right Permission",
    description:
      "Share a file by inviting specific people or by copying a link, choose who the link works for and what it allows, and share patient information the safe way.",
    objectives: [
      "Invite specific people to a file with Can edit, Can view, or Can review",
      "Copy a link and choose who it works for: Anyone, People in your organization, People with existing access, or People you choose",
      "Add an expiration date or password to a link where your organization allows it",
      "Share patient information only with named people, view-only unless editing is needed, and never with an Anyone link",
    ],
    duration: "20 min",
    slides: slides("sharing-with-the-right-permission", [
      "Two ways to share: invite people, or copy a link",
      "Permissions: Can edit, Can view, Can review, Can't download",
      "Link settings: who the link works for",
      "Expiration dates and passwords",
      "Sharing patient information: named people, least access, never Anyone",
      "Quick check: pick the right link",
    ]),
    sections: [
      {
        heading: "Three requests, three different answers",
        blocks: [
          {
            type: "scenario",
            role: "You handle file requests at the Lakeside front desk.",
            text: "Before lunch, Maria wants to edit the flu clinic flyer, Kevin in billing needs to look at (not change) the November staff schedule, the whole office needs the phone list, and Riverside Imaging's scheduler needs a patient's referral packet. Attaching four files to four emails would create four copies. Sharing from OneDrive gives each person the right access to the one real file.",
            task: "Share each file with exactly the access each person needs, and handle the patient file safely.",
          },
          {
            type: "paragraph",
            text: "Select a file and select Share (in the command bar, or by right-clicking the file). The Share window has two parts. At the top, you invite specific people: type their names or email addresses in Add a name, group, or email, choose a permission with the permission button next to the box, add a message if you like, and select Invite. (Some accounts label this button Send.) They get an email with a link to the file. At the bottom, Copy link makes a link you can paste into an email, a Teams chat, or a document. The gear next to Copy link opens Link settings, where you choose who the link works for.",
          },
        ],
      },
      {
        heading: "What people can do: permissions",
        blocks: [
          {
            type: "table",
            caption: "Permissions in OneDrive",
            columns: ["Permission", "They can", "Use it for"],
            rows: [
              ["Can edit", "Make any changes, and share the file further", "Coworkers who work on the file with you"],
              ["Can view", "Open and read it, but not change it", "People who only need to read: most outside offices"],
              ["Can review", "View, comment, and suggest changes (Word documents only)", "A manager reviewing your draft"],
              ["Can't download", "View, but not download a copy (work or school accounts only)", "Sensitive files people should read but not keep"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Start with the least access that gets the job done. You can always give more access later. Taking access back after someone downloaded a copy doesn't take the copy back.",
          },
        ],
      },
      {
        heading: "Who a link works for: link settings",
        blocks: [
          {
            type: "table",
            caption: "Link settings › Share the link with",
            columns: ["Option", "Who can open the link", "At Lakeside"],
            rows: [
              ["Anyone", "Anyone who has the link, including people outside the organization. No sign-in needed", "Only for public material, like the flu clinic flyer. Never for patient information"],
              ["People in Lakeside Medical Associates", "Anyone signed in with a Lakeside account", "Internal files the whole office may read"],
              ["People with existing access", "Only people who already have access. It doesn't change anyone's permissions", "Pointing a coworker to a file they can already open"],
              ["People you choose", "Only the names or emails you enter", "Anything sensitive, including patient files"],
            ],
          },
          {
            type: "paragraph",
            text: "Under More settings you choose the link's permission (Can edit, Can view, and so on). For links that work for Anyone, you can also set an expiration date (the link stops working after it) and a password (people must type it to open the file). In a personal OneDrive these two options need a Microsoft 365 subscription. In a work or school account, your organization decides which options you can use: a choice that is greyed out was turned off by your administrators. Select Apply, then Copy.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Pick the right link",
            prompt: "Drag each situation to the link setting that fits it best.",
            buckets: [
              { id: "anyone", label: "Anyone (view only, with an expiration date)" },
              { id: "org", label: "People in Lakeside Medical Associates" },
              { id: "choose", label: "People you choose" },
              { id: "existing", label: "People with existing access" },
            ],
            items: [
              { id: "a", text: "The public flu clinic flyer for a community partner's website", bucket: "anyone" },
              { id: "b", text: "The office phone list every Lakeside employee may read", bucket: "org" },
              { id: "c", text: "A patient's referral packet for one scheduler at Riverside Imaging", bucket: "choose" },
              { id: "d", text: "Reminding Maria where a file is that she can already edit", bucket: "existing" },
              { id: "e", text: "A billing report only Kevin and Dr. Shah should see", bucket: "choose" },
            ],
            explanation: "Match the link to the smallest group that needs the file. Anyone links are for public material only. Patient information always goes to people you choose.",
          },
        ],
      },
      {
        heading: "Sharing patient information safely",
        blocks: [
          {
            type: "worked-example",
            title: "Sending a referral packet to Riverside Imaging",
            task: "Riverside Imaging's scheduler needs to read the referral packet for an upcoming patient appointment.",
            steps: [
              { move: "Confirm Lakeside shares with Riverside Imaging this way.", why: "Practices share patient information with outside organizations only under agreements and processes they have approved. If you aren't sure, ask your supervisor before sharing." },
              { move: "Select the packet and select Share. Type scheduling@riversideimaging.example.", why: "Inviting the named person means only that person can open the file. OneDrive warns you that the address is outside your organization, which is your cue to double-check it." },
              { move: "Set the permission to Can view.", why: "The scheduler needs to read the packet, not change it. Least access is the rule for patient information." },
              { move: "Add a short message and select Invite.", why: "The message tells them what it is without repeating any patient details in the email." },
              { move: "Never switch to an Anyone link to save time.", why: "An Anyone link opens for whoever has it. It can be forwarded, pasted in the wrong chat, or seen over a shoulder." },
            ],
            result: "One person, view-only access, to one file, and an email that contains no patient details.",
            takeaway: "For patient information: named people, the least access that works, and never an Anyone link.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "If you share patient information with the wrong person or the wrong kind of link, remove the access right away (the next lesson shows how) and tell your supervisor. Reporting quickly is part of fixing it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Kevin needs to read the November staff schedule but shouldn't change it. What do you choose?",
            options: ["Invite Kevin with Can edit", "Invite Kevin with Can view", "Copy an Anyone link", "Email Kevin a downloaded copy"],
            correctIndex: 1,
            explanation: "Can view lets Kevin open and read the one real schedule, which stays current, without being able to change it.",
            optionRationales: [
              "Can edit gives Kevin more access than he needs.",
              "Correct. View-only access to the real file.",
              "An Anyone link works for anyone who gets it. The staff schedule is internal.",
              "A downloaded copy goes out of date the next time the schedule changes.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which Share option is never right for a patient's records?",
            options: ["People you choose, with Can view", "Inviting a named person with Can view", "Anyone", "People with existing access"],
            correctIndex: 2,
            explanation: "An Anyone link works for whoever has it, with no sign-in. Patient information is shared only with named people.",
            optionRationales: [
              "People you choose limits the link to named people. That fits patient information.",
              "Inviting a named person with view-only access is the safe pattern.",
              "Correct. Never use an Anyone link for patient information.",
              "This only works for people who already have access, so it doesn't expose the file to anyone new.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Share a practice file in your real OneDrive (never a file with personal or patient information). Work with a classmate." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in at onedrive.com with your school account and open your OneDrive Practice folder (create it if you don't have it).",
          "Select Practice Notes and select Share. Type your classmate's school email address, set the permission to Can view, and type a short message.",
          "Before you select Invite (or Send), take a screenshot of the Share window showing the person and the permission. Then send it.",
          "Open the Share window again and select the gear next to Copy link. Write down which Share the link with options your school allows and which are greyed out.",
          "Ask your classmate to confirm they can open the file but not edit it.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your screenshot and your list of available link options to your instructor or course folder. If you cannot sign in or don't have a partner, submit this lesson's practice simulation results page instead." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "managing-access",
    title: "Managing Access and Stopping Sharing",
    description:
      "See who has access to your files, change what they can do, remove a person or a link, and stop sharing a file completely.",
    objectives: [
      "Find the files you have shared with Shared › Shared by you",
      "Open Manage access and read its People, Groups, and Links tabs",
      "Change a person's permission and remove their direct access",
      "Remove a sharing link and stop sharing a file entirely",
    ],
    duration: "15 min",
    slides: slides("managing-access", [
      "Sharing isn't one-and-done: review it",
      "Three ways to open Manage access",
      "People, Groups, and Links",
      "Change, remove, or stop sharing",
      "When to review sharing",
    ]),
    sections: [
      {
        heading: "Sharing needs upkeep",
        blocks: [
          {
            type: "scenario",
            role: "Maria asked you to clean up sharing on the front desk's files.",
            text: "A temporary receptionist finished her assignment last week but can still edit the holiday coverage plan. Kevin can edit a plan he should only read. Somebody created an Anyone link to the staff schedule. And the supply vendor whose contract ended still has access to the supply order log.",
            task: "Find every shared file, fix each person's access, remove the risky link, and stop sharing where nobody outside should have access.",
          },
          {
            type: "paragraph",
            text: "Start in Shared › Shared by you. It lists your files that other people can open. Then open Manage access for a file in any of these ways: right-click the file and select Manage access; select the file, open the details pane with the information (i) button, and select Manage access; or select the people pictures at the bottom of the Share window.",
          },
        ],
      },
      {
        heading: "Inside Manage access",
        blocks: [
          {
            type: "table",
            caption: "The Manage access panel",
            columns: ["Part", "What it shows or does"],
            rows: [
              ["People tab", "Everyone with access, and their permission. Select a person's permission to change it to Can edit or Can view, or choose Remove direct access"],
              ["Groups tab", "Groups (such as a team) that have access"],
              ["Links tab", "Every sharing link for the file, who it works for, and what it allows. Remove link deletes one"],
              ["Grant access", "Opens the Share window to give someone access"],
              ["Stop sharing", "Removes everyone's access and every link. You keep access"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "You can't change a link from edit to view. Remove the link, then create a new one with the permission you want. Anyone who had the old link loses access when you remove it.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the fix to the problem",
            prompt: "Drag each fix onto the problem it solves.",
            items: [
              { id: "a", text: "A coworker can edit a file they should only read", match: "Change their permission to Can view" },
              { id: "b", text: "A temp's assignment ended", match: "Remove direct access" },
              { id: "c", text: "An Anyone link exists for an internal file", match: "Remove the link on the Links tab" },
              { id: "d", text: "No one outside you should have the file anymore", match: "Stop sharing" },
            ],
          },
        ],
      },
      {
        heading: "When to review",
        blocks: [
          {
            type: "list",
            items: [
              "When someone leaves the team or changes roles",
              "When a project or a contract with an outside company ends",
              "Whenever you notice an Anyone link on a file that isn't public",
              "On a regular schedule your office sets for sensitive files",
            ],
          },
          {
            type: "worked-example",
            title: "Removing a temp's access",
            task: "Jen Cole's temporary assignment ended. Remove her access to the Holiday Coverage Plan.",
            steps: [
              { move: "Right-click Holiday Coverage Plan and select Manage access.", why: "Manage access is the one place that lists everyone and every link for the file." },
              { move: "On the People tab, select Jen Cole's permission (Can edit).", why: "The menu has the permissions and Remove direct access." },
              { move: "Select Remove direct access, then Remove to confirm.", why: "Jen loses access right away. Everyone else keeps theirs." },
              { move: "Check the Links tab for links that might still include her.", why: "A person can have access through a link as well as directly." },
            ],
            result: "Only current staff can open the plan.",
            takeaway: "Removing access is part of sharing. Do it as soon as someone's need ends.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You shared a file with an edit link and now want people to only view it. What should you do?",
            options: [
              "Change the link's permission to Can view",
              "Remove the edit link and create a new view-only link",
              "Rename the file",
              "Move the file to another folder",
            ],
            correctIndex: 1,
            explanation: "A link's permission can't be switched. Remove it and create a new link with Can view.",
            optionRationales: [
              "A link can't be switched between edit and view.",
              "Correct. Remove the link, then make a new one.",
              "Renaming doesn't change who has access.",
              "Moving the file keeps its links and sharing.",
            ],
          },
          {
            type: "knowledge-check",
            question: "What does Stop sharing do?",
            options: [
              "Deletes the file",
              "Removes everyone's access and every link, but you keep access",
              "Removes only links that work for Anyone",
              "Makes the file read-only for everyone",
            ],
            correctIndex: 1,
            explanation: "Stop sharing takes away all direct access and all links. The file stays in your OneDrive and you keep access.",
            optionRationales: [
              "The file isn't deleted.",
              "Correct.",
              "It removes all links and all direct access, not only Anyone links.",
              "It removes access instead of changing it to read-only.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Clean up the sharing from the previous lesson's challenge in your real OneDrive." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in at onedrive.com and open Shared › Shared by you. Take a screenshot.",
          "Open Manage access for Practice Notes. Change your classmate's permission from Can view to Can edit, and take a screenshot.",
          "Remove your classmate's direct access (or select Stop sharing). Take a screenshot of Manage access showing that only you have access.",
          "If you created a link, remove it on the Links tab.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your three screenshots to your instructor or course folder. If you cannot sign in, submit this lesson's practice simulation results page instead." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "co-authoring-and-comments",
    title: "Co-authoring and Comments",
    description:
      "Edit a document at the same time as your coworkers, see who is working where, and use comments, @mentions, and Reviewing mode instead of email back-and-forth.",
    objectives: [
      "Open a shared document in Word for the web and recognize co-authors' presence",
      "Add a comment to a paragraph and @mention a coworker",
      "Reply to and resolve comment threads",
      "Switch between Editing, Reviewing, and Viewing modes",
    ],
    duration: "15 min",
    slides: slides("co-authoring-and-comments", [
      "Co-authoring: everyone in the one real file",
      "Presence: see who is editing where",
      "Comments and @mentions",
      "Reply, then resolve",
      "Editing, Reviewing, and Viewing modes",
    ]),
    sections: [
      {
        heading: "One file, many editors",
        blocks: [
          {
            type: "scenario",
            role: "You are updating the Check-In Procedures with the front desk team.",
            text: "In the past, updating the procedures meant emailing a document around, collecting three edited copies, and spending an afternoon combining them. Now the document is in OneDrive, shared with the team. Maria is editing the insurance section right now, Kevin left a question in a comment, and Tasha finished her part.",
            task: "Work in the same document at the same time, answer comments, and pull Maria into a question without leaving the file.",
          },
          {
            type: "paragraph",
            text: "When a Word, Excel, or PowerPoint file is in OneDrive and shared with edit permission, several people can work in it at the same time. This is co-authoring. Each person's changes show up for the others within moments, and colored flags show who is working where. Word for the web saves as you type, so nobody needs to save and send a new copy.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Co-authoring", definition: "Several people editing the same file at the same time." },
              { term: "Presence", definition: "The pictures at the top and the colored flags in the document that show who is in the file and where." },
              { term: "Comment", definition: "A note attached to a paragraph, outside the text, that people can reply to." },
              { term: "@mention", definition: "Typing @ and a name in a comment, so that person gets a notification." },
              { term: "Resolve", definition: "Marking a comment thread as done. It stays in the document's history but leaves the active list." },
            ],
          },
        ],
      },
      {
        heading: "Comments and @mentions",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Click in the paragraph you want to comment on.",
              "Select Review › New comment (or right-click the paragraph and select New comment).",
              "Type your comment. To get someone's attention, type @ and the first letters of their name, then pick them from the list.",
              "Post the comment. A mentioned coworker gets a notification with a link to the comment.",
              "To answer a comment, type in its Reply box. When the question is settled, open the thread's More thread actions (…) and select Resolve thread.",
            ],
          },
          {
            type: "tip",
            text: "Comment instead of rewriting someone else's section. A comment asks; an edit decides. For changes you want the owner to approve, switch to Reviewing mode so your edits show as suggestions they can accept or reject.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Order the comment workflow",
            prompt: "Put these steps in the order they happen.",
            items: [
              { id: "1", text: "Click in the paragraph" },
              { id: "2", text: "Select Review › New comment" },
              { id: "3", text: "Type the comment and @mention a coworker" },
              { id: "4", text: "The coworker replies" },
              { id: "5", text: "Resolve the thread" },
            ],
          },
        ],
      },
      {
        heading: "Editing, Reviewing, and Viewing",
        blocks: [
          {
            type: "table",
            caption: "Modes in Word for the web (the mode button near the top right)",
            columns: ["Mode", "What it does", "Use it when"],
            rows: [
              ["Editing", "Your changes go straight into the document", "It is your section, or you were asked to edit"],
              ["Reviewing", "Your changes show as suggestions others can accept or reject", "You are suggesting changes to someone else's work"],
              ["Viewing", "You can read the document but not change the text", "You only want to read without changing anything by accident"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Version history (Module 4) keeps earlier versions of shared files, so a co-author's mistake can be undone. Co-authors should still agree on who edits which section.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want Maria to answer a question about the insurance section without leaving the document. What is the best way?",
            options: ["Email her a screenshot", "Add a comment on that paragraph and @mention Maria", "Type the question into the paragraph in capital letters", "Make a copy of the document for her"],
            correctIndex: 1,
            explanation: "An @mention in a comment notifies Maria and keeps the question attached to the exact paragraph.",
            optionRationales: [
              "Email separates the question from the document and adds back-and-forth.",
              "Correct.",
              "Typing questions into the text clutters the document and someone has to remove them later.",
              "A copy defeats co-authoring. Everyone should work in the one file.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You want to suggest wording changes to Kevin's section without changing it directly. Which mode do you use?",
            options: ["Editing", "Reviewing", "Viewing", "None; email him instead"],
            correctIndex: 1,
            explanation: "Reviewing mode records your edits as suggestions Kevin can accept or reject.",
            optionRationales: [
              "Editing changes the text directly.",
              "Correct.",
              "Viewing doesn't let you change text at all.",
              "Suggestions in the document are clearer than an email describing them.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Co-author with a classmate in your real OneDrive." },
      {
        type: "list",
        ordered: true,
        items: [
          "Share Practice Notes with your classmate with Can edit (or have them share a file with you).",
          "Both of you open the file in Word for the web at the same time. Take a screenshot showing your classmate's picture or flag in the document.",
          "Add a comment on one paragraph that @mentions your classmate with a question. Have them reply, then resolve the thread.",
          "Switch to Reviewing mode, change one word, and have your classmate accept or reject the suggestion.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your screenshot of co-authoring and a screenshot of the resolved comment to your instructor or course folder. If you cannot sign in or don't have a partner, submit this lesson's practice simulation results page instead." },
    ],
  },
];
