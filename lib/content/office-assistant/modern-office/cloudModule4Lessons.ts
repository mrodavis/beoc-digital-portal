import { Lesson } from "@/types/lesson";

/** INFO 3035 Module 4 — SaaS in action: Google cloud applications and sharing. */
export const cloudModule4Lessons: Lesson[] = [
  {
    slug: "google-cloud-applications",
    title: "SaaS in Action: Google Cloud Applications",
    description:
      "Use Google Drive, Docs, Sheets, and Slides as a working example of software as a service, and understand what changes when the application lives in a browser.",
    duration: "24 min",
    objectives: [
      "Navigate Google Drive and organize files in it",
      "Create and edit documents, spreadsheets, and presentations in the browser",
      "Explain how continuous saving and version history change your working habits",
      "Identify what a browser-based application cannot do",
    ],
    sections: [
      {
        heading: "A concrete example of the SaaS model",
        blocks: [
          {
            type: "scenario",
            role: "You work across two locations for Lakeside Medical Associates.",
            text: "You start a document at the main office, continue on a tablet between sites, and finish at the second location. With files on a local drive that means emailing yourself three times and losing track of which copy is current. With a SaaS application there is only ever one document.",
            task: "Use Google Workspace as a working example of everything the SaaS model implies.",
          },
          {
            type: "paragraph",
            text: "Google Workspace is software as a service in its clearest form. Nothing is installed, the application updates itself, files live on the provider's servers, and any device with a browser and your credentials reaches the same document. Every characteristic from the SaaS lesson is directly observable here.",
          },
          {
            type: "table",
            caption: "What changes in a browser-based application",
            columns: ["Behavior", "Desktop application", "SaaS application"],
            rows: [
              ["Saving", "You press Ctrl+S", "Continuous and automatic"],
              ["Version history", "Only if you saved copies", "Complete, with named contributors"],
              ["Collaboration", "One editor at a time, or awkward merging", "Several people editing simultaneously"],
              ["Updates", "You install them", "Already applied when you open it"],
              ["Working offline", "Normal", "Requires setup and is limited"],
              ["Where files live", "Your drive", "The provider's servers"],
            ],
          },
          {
            type: "paragraph",
            text: "Continuous saving is the habit change that catches people. There is no unsaved state to abandon, so 'close without saving' does not exist as an escape route. Before experimenting on a document that matters, make a copy — File > Make a copy — because undo is your only other option.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "A personal Google account is not an approved location for protected health information. Google Workspace can be configured to meet healthcare requirements under a business associate agreement, but a personal gmail.com account cannot, whatever its settings. This distinction matters more than any feature covered in this lesson.",
          },
          {
            type: "knowledge-check",
            question:
              "You want to try a substantial restructuring of a shared Google Doc, and you may want to abandon it. What should you do first?",
            options: [
              "Turn off automatic saving before you start",
              "Make a copy of the document and experiment on the copy",
              "Work quickly so you can undo everything if needed",
              "Download it as a PDF as a backup",
            ],
            correctIndex: 1,
            explanation:
              "Automatic saving cannot be disabled, so there is no unsaved state to discard. A copy gives you a genuine sandbox. Version history is also available as a recovery route, but a copy is simpler and does not require anyone to reconstruct which version was the good one.",
            optionRationales: [
              "Automatic saving is not optional in Google Docs; there is no setting for it.",
              "Correct. Experiment on a copy and the original is untouched whatever happens.",
              "Undo is limited and unreliable across a long editing session, and it does not survive closing the tab.",
              "A PDF preserves a snapshot for reading but cannot be edited back into a document.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Use the tools and observe the model in action.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a folder structure in Google Drive matching the convention you designed in Module 3.",
          "Create a document, edit it over two sessions, then open File > Version history and restore an earlier version. Describe what you observed.",
          "Open the same document on a second device and confirm it is current. Note how long the change took to appear.",
          "List three things the browser version of Docs cannot do that Microsoft Word can, and say what you would do when you need one of them.",
        ],
      },
    ],
  },
  {
    slug: "document-creation-and-sharing",
    title: "Document Creation and Sharing",
    description:
      "Share cloud documents with the right people at the right permission level, and manage access over the life of a file.",
    duration: "22 min",
    objectives: [
      "Share files and folders with specific people or by link",
      "Choose the appropriate permission level for a situation",
      "Use comments and suggesting mode for collaborative review",
      "Audit and revoke access when it is no longer needed",
    ],
    sections: [
      {
        heading: "Sharing is an access control decision",
        blocks: [
          {
            type: "scenario",
            role: "You manage shared documents at Lakeside Medical Associates.",
            text: "Eighteen months ago someone shared a folder as 'anyone with the link can edit' so a temporary contractor could deliver a file. The contractor left a year ago. The link still works, it has been forwarded twice, and the folder now contains staff records nobody thought about when the link was created.",
            task: "Treat every share as an access decision with a lifespan, not a one-off convenience.",
          },
          {
            type: "paragraph",
            text: "Cloud sharing is genuinely convenient, which is exactly why it is dangerous. A link created in five seconds keeps working indefinitely, travels wherever it is forwarded, and grants access to whatever the folder contains later — not only what it contained when the link was made.",
          },
          {
            type: "table",
            caption: "Permission levels",
            columns: ["Level", "Can", "Use for"],
            rows: [
              ["Viewer", "Read and download only", "Distributing finished documents"],
              ["Commenter", "Read and comment, but not change the text", "Review rounds where you keep authorship"],
              ["Editor", "Change content, and often re-share", "Genuine co-authors"],
              ["Owner", "Everything, including deletion and transfer", "One person; ideally an organizational account"],
            ],
          },
          {
            type: "worked-example",
            title: "Sharing a document safely",
            task: "Share a draft policy with three reviewers and one external consultant, without creating a link that outlives the project.",
            steps: [
              {
                move: "Share with named people rather than creating a link.",
                why: "Named sharing ties access to identities you can audit and revoke individually. A link is a bearer token — whoever holds it has access, and you cannot tell who that is or how it reached them.",
              },
              {
                move: "Give reviewers Commenter, not Editor.",
                why: "They need to raise points, not rewrite the policy. Commenter is the least privilege that accomplishes the task, and least privilege is the principle that keeps sharing manageable.",
              },
              {
                move: "For the external consultant, set an expiry date on the access.",
                why: "External access should never be open-ended. An expiry means it ends whether or not anyone remembers to remove it — which is the realistic assumption, since nobody remembers.",
              },
              {
                move: "Check what else is in the folder before sharing the folder.",
                why: "Folder sharing grants access to everything inside, now and in future. This is exactly how the staff records in the scenario became exposed — nobody re-examined the folder after the link was made. Share the file when the file is what they need.",
              },
              {
                move: "Review and revoke access when the project ends.",
                why: "Closing the loop is the step that never happens on its own. Putting an access review in the project's closing checklist is what turns it from good intentions into something that actually occurs.",
              },
            ],
            result:
              "Access limited to named people at the minimum useful level, with external access that expires on its own.",
            takeaway:
              "Share with people rather than links, grant the least privilege that works, set expiry on external access, and revoke when the work is done.",
          },
          {
            type: "knowledge-check",
            question:
              "Why is sharing a folder riskier than sharing an individual file?",
            options: [
              "Folders transfer more slowly and can time out",
              "Folder access extends to everything inside it, including files added later that the sharer never considered",
              "Folders cannot have their permissions revoked",
              "Folder sharing always grants edit access",
            ],
            correctIndex: 1,
            explanation:
              "A folder share is a standing grant to a container. Anything placed in it afterwards inherits that access automatically, so a share made for one purpose silently extends to files nobody evaluated — which is precisely what happened with the staff records.",
            optionRationales: [
              "Transfer speed has nothing to do with the risk.",
              "Correct. Access extends to future contents, which nobody re-evaluates.",
              "Folder permissions can be revoked. The problem is that people rarely do.",
              "Folder sharing supports every permission level, the same as file sharing.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice the full lifecycle, including the part everyone skips.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Share a document with a classmate as Commenter. Have them add a comment and a suggested edit. Accept one and reject the other.",
          "Create a link share, then convert it to named sharing. Describe what changed about who can reach the file.",
          "Audit your own Drive: find every file currently shared by link. Note how many you had forgotten and revoke any that no longer need it.",
          "Write a four-rule sharing policy for a small medical office. Include a rule about reviewing access, and state who is responsible for it.",
        ],
      },
    ],
  },
];
