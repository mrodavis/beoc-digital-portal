import { Lesson } from "@/types/lesson";

export const wordModule4Lessons: Lesson[] = [ 

{
  slug: "headers-and-footers",
  title: "Headers & Footers",
  description:
    "Create, edit, and customize headers and footers in Microsoft Word. Insert preset headers, add dates, page numbers, and format different first pages.",
  objectives: [
    "Add headers and footers, including automatic page numbers and dates",
    "Use a different first page so a letterhead does not repeat",
    "Explain how section breaks let headers differ between parts of a document",
    "Choose between a date that updates automatically and one that stays fixed",
  ],
  duration: "7 min",
  videoUrl: "https://www.youtube.com/embed/hxSGN6IJAFc?si=lsvChAnjpi3Hb-kj",

  practiceFiles: [
    {
      name: "Headers & Footers Practice File",
      url: "/practice/word/module-4/headers/word_headersfooters_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Headers are how a page proves where it came from",
       blocks: [
         {
           type: "scenario",
           role: "You prepare clinical documentation packets at Lakeside Medical Associates.",
           text: "A twelve-page packet goes to a specialist. It is unstapled at the other end, mixed with pages from two other practices, and reassembled. Half the pages carry no identification and no page numbers. Nobody can tell which pages belong together, or whether any are missing.",
           task: "Put identifying information on every page automatically, so a loose sheet is never anonymous.",
         },
         {
           type: "paragraph",
           text: "A header or footer is defined once and repeats on every page — the practice name, the document title, and 'Page X of Y' so a reader can tell at a glance that page 7 of 12 is missing. Typing that on each page by hand is not just slow; it breaks the moment the document repaginates.",
         },
         {
           type: "paragraph",
           text: "The date field has a subtlety worth getting right. Insert > Date & Time offers an 'Update automatically' checkbox. Checked, the date rewrites itself to today every time the document opens — correct for a template, and actively wrong for a letter, because reopening a letter from March in September silently changes its date. For anything with a fixed issuance date, leave that box unchecked.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Different First Page (on the Header & Footer contextual tab) stops the header appearing on page one, which is what you want when page one carries a full letterhead. For headers that differ between parts of a longer document, you need section breaks — and you must also turn off 'Link to Previous' in the new section, or Word keeps inheriting the previous section's header and the change appears to do nothing.",
         },
       ],
     },

    {
      heading: "Creating a Header",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Insert → Header. Choose a built-in style or select Blank to create your own header.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_preset_command.png",
          alt: "Header preset command",
        },
        {
          type: "image",
          src: "/images/word/headers/header_preset_menu3.png",
          alt: "Header preset gallery",
        },
        {
          type: "image",
          src: "/images/word/headers/header_preset_type.png",
          alt: "Typing inside preset header placeholder",
        },
      ],
    },

    {
      heading: "Working with Preset Header Placeholders",
      blocks: [
        {
          type: "paragraph",
          text:
            "Built-in headers include content controls such as [Document Title]. Click inside the placeholder to replace it with your own text.",
        },
        {
          type: "paragraph",
          text:
            "To remove the placeholder entirely, right-click the field and choose Remove Content Control.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_preset_remove_content.png",
          alt: "Remove content control option",
        },
      ],
    },

    {
      heading: "Editing a Header",
      blocks: [
        {
          type: "paragraph",
          text:
            "Double-click at the top of the page to open the header area. The Header & Footer Tools Design tab will appear.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_create_click_callout.png",
          alt: "Double-click header area",
        },
        {
          type: "image",
          src: "/images/word/headers/header_create_design_tab.png",
          alt: "Header design tab",
        },
      ],
    },

    {
      heading: "Inserting Date & Time",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Date & Time inside the header. Choose a format and check Update automatically if needed.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_datetime_command.png",
          alt: "Date and time command",
        },
        {
          type: "image",
          src: "/images/word/headers/header_datetime_dialog.png",
          alt: "Date dialog box",
        },
        {
          type: "image",
          src: "/images/word/headers/header_datetime_result.png",
          alt: "Date inserted in header",
        },
      ],
    },

    {
      heading: "Adding Page Numbers",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Insert → Page Number and choose placement and alignment.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_design_page_number.png",
          alt: "Page number menu",
        },
      ],
    },

    {
      heading: "Different First Page",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select Different First Page from the Design tab to remove the header from the first page only.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_design_first_page.png",
          alt: "Different first page option",
        },
      ],
    },

    {
      heading: "Removing a Header",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove the header entirely, go to Insert → Header → Remove Header.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_design_remove_header2.png",
          alt: "Remove header option",
        },
      ],
    },

    {
      heading: "Closing the Header Area",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Close Header and Footer to return to the main document.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_create_close.png",
          alt: "Close header button",
        },
      ],
    },

    {
      heading: "Completed Example",
      blocks: [
        {
          type: "image",
          src: "/images/word/headers/header_create_result.png",
          alt: "Completed header example",
        },
      ],
    },
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is the purpose of a header in a Word document?",
          options: [
            "To add decorative borders around the page",
            "To set the document's font and color theme",
            "To display repeated content at the top of every page",
            "To insert a table of contents automatically",
          ],
          correctIndex: 2,
          explanation: "A header is content defined once in the top margin that Word repeats on every page — practice name, document title, page numbers. That repetition is the point: it identifies a page that has been separated from the rest of its document.",
          optionRationales: [
            "Page borders are set under Design > Page Borders. That is decoration around the page edge, unrelated to headers.",
            "Fonts and colors come from the document theme under the Design tab. A header holds content, not theme settings.",
            "Correct. Content placed in the header repeats automatically at the top of every page.",
            "A table of contents is inserted from References > Table of Contents and appears in the body of the document, not in the header.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a preset header.",
        "Replace the placeholder text with your name.",
        "Remove any remaining content control boxes.",
        "Insert today’s date and set it to update automatically.",
        "Add page numbers to the bottom right.",
        "Make the first page header different.",
        "Close the Header & Footer tools properly.",
      ],
    },
  ],
},

/* ============================================================
LESSON 2 – TRACK CHANGES
============================================================ */

{
  slug: "track-changes",
  title: "Track Changes",
  description:
    "Learn how to track edits in a Word document, accept or reject changes, and review a document's revision history for professional collaboration.",
  objectives: [
    "Turn Track Changes on and recognize how edits are displayed",
    "Switch between markup views and explain what each one hides",
    "Accept and reject changes individually or in bulk",
    "Remove all tracked changes and comments before sending a document externally",
  ],
  duration: "8 min",
  videoUrl: "https://www.youtube.com/embed/pLKHMRBR0Z0",

  practiceFiles: [
    {
      name: "Track Changes Practice File",
      url: "/practice/word/module-4/track-changes/word_trackchanges_practice.docx",
    },
  ],

  sections: [

    {
       heading: "The markup you cannot see is still in the file",
       blocks: [
         {
           type: "scenario",
           role: "You are finalizing a policy document at Lakeside Medical Associates.",
           text: "The draft went through three reviewers. You switch the display to 'No Markup,' the document looks clean, and you email it to the practice's insurer. The insurer opens it, switches to All Markup, and reads every deleted sentence, including a reviewer's comment questioning whether a colleague is competent to sign off on the policy.",
           task: "Understand that display mode hides markup from you, not from anyone else — and learn the step that actually removes it.",
         },
         {
           type: "paragraph",
           text: "This is the single most consequential misunderstanding in Word. Simple Markup and No Markup change what you see on screen. They do not alter the file. Every deletion, insertion, and comment remains stored in the document and is one dropdown away for whoever opens it next.",
         },
         {
           type: "paragraph",
           text: "To actually remove tracked changes you must resolve them: Review > Accept > Accept All Changes, and Review > Delete > Delete All Comments in Document. Then verify with File > Info > Check for Issues > Inspect Document, which reports any remaining revisions, comments, or hidden metadata.",
         },
         {
           type: "table",
           caption: "What each display mode shows",
           columns: [
             "Mode",
             "You see",
             "The file contains",
           ],
           rows: [
             [
               "Simple Markup",
               "Clean text with change bars in the margin",
               "All tracked changes",
             ],
             [
               "All Markup",
               "Every insertion, deletion, and comment",
               "All tracked changes",
             ],
             [
               "No Markup",
               "The document as if all changes were accepted",
               "All tracked changes — nothing has been removed",
             ],
             [
               "Original",
               "The document before any edits",
               "All tracked changes",
             ],
           ],
         },
         {
           type: "worked-example",
           title: "Clearing a reviewed document before it leaves the practice",
           task: "Take a policy draft with three rounds of tracked edits and comments and produce a file that genuinely contains none of them.",
           steps: [
             {
               move: "Switch to All Markup and read the document through.",
               why: "You cannot make good accept-or-reject decisions on changes you have not seen. All Markup is the only view that shows everything, and reading it once is how you catch a reviewer's change you actually disagree with.",
             },
             {
               move: "Review > Accept > Accept All Changes, or step through with Accept and Reject individually.",
               why: "Accepting is what physically applies each edit and removes the revision record. Bulk-accept when you have already reviewed and agree with everything; step through individually when the edits are contested.",
             },
             {
               move: "Review > Delete > Delete All Comments in Document.",
               why: "Comments are stored separately from tracked changes, so accepting all changes leaves every comment intact. This is the step people skip, and comments are usually the more embarrassing of the two.",
             },
             {
               move: "File > Info > Check for Issues > Inspect Document, then remove what it finds.",
               why: "The Document Inspector reports tracked changes, comments, hidden text, and author metadata that the Review tab does not surface. It is the only reliable verification, and it takes about fifteen seconds.",
             },
             {
               move: "Turn Track Changes off before saving.",
               why: "If it is still on, your own final cleanup edits become a new round of tracked changes — and you ship the problem you just spent five minutes fixing.",
             },
           ],
           result: "A file that contains no revisions, no comments, and no reviewer metadata — verified, not assumed.",
           takeaway: "Changing the view hides markup from you alone. Accept, delete comments, inspect, and turn tracking off — anything less ships the edit history with the document.",
         },
       ],
     },

    {
      heading: "What Is Track Changes?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Track Changes is a feature in Word that records every edit made to a document — insertions, deletions, and formatting changes — so reviewers can see exactly what was modified and by whom.",
        },
      ],
    },

    {
      heading: "Turning On Track Changes",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Review tab and click Track Changes to toggle it on. When active, the button appears highlighted and all edits are marked in the document.",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_command.png",
          alt: "Track Changes button on the Review tab",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_active.png",
          alt: "Track Changes turned on",
        },
      ],
    },

    {
      heading: "How Changes Appear in the Document",
      blocks: [
        {
          type: "paragraph",
          text:
            "Inserted text appears underlined, deleted text appears with a strikethrough, and a change bar appears in the margin to mark edited lines. Each reviewer's changes appear in a different color.",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_markup_example.png",
          alt: "Example of tracked insertions and deletions in a document",
        },
      ],
    },

    {
      heading: "Controlling What Markup Is Shown",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the Show Markup menu on the Review tab to control which types of changes are visible. You can also switch the display to Simple Markup (margin indicators only) or No Markup (clean view) using the dropdown next to Track Changes.",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_showmarkup_menu.png",
          alt: "Show Markup dropdown menu",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_display_dropdown.png",
          alt: "All Markup / Simple Markup / No Markup display options",
        },
      ],
    },

    {
      heading: "Accepting and Rejecting Changes",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside a tracked change, then choose Accept or Reject from the Review tab. Use Accept All or Reject All to process every change at once.",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_accept_reject_buttons.png",
          alt: "Accept and Reject buttons on the Review tab",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_accept_all_menu.png",
          alt: "Accept All Changes option in the dropdown",
        },
      ],
    },

    {
      heading: "Using the Review Pane",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Reviewing Pane on the Review tab to open a sidebar listing all tracked changes and comments in sequence. This is useful for quickly navigating between edits in long documents.",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_reviewing_pane.png",
          alt: "Reviewing pane showing list of tracked changes",
        },
      ],
    },

    {
      heading: "Locking Track Changes",
      blocks: [
        {
          type: "paragraph",
          text:
            "To prevent others from turning off Track Changes, go to Track Changes → Lock Tracking and set a password. Changes cannot be accepted or rejected until the document is unlocked.",
        },
        {
          type: "image",
          src: "/images/word/track-changes/trackchanges_lock_tracking.png",
          alt: "Lock Tracking option and password dialog",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does the Track Changes feature do in Word?",
          options: [
            "Automatically corrects spelling errors as you type",
            "Records insertions, deletions, and formatting edits so reviewers can see what was changed",
            "Saves a new version of the document every time you make an edit",
            "Restricts editing so only the document owner can make changes",
          ],
          correctIndex: 1,
          explanation: "Track Changes records every insertion, deletion, and formatting change with an attribution to the person who made it, so a reviewer can see exactly what was altered and accept or reject each edit individually.",
          optionRationales: [
            "That describes AutoCorrect, which fixes typing as you go. Track Changes records edits; it does not make them for you.",
            "Correct. Word marks each insertion, deletion, and formatting change and attributes it to its author, so every edit can be reviewed individually.",
            "That describes version history, which OneDrive and SharePoint provide separately. Track Changes marks up edits within a single file.",
            "That describes Restrict Editing under the Review tab. Track Changes records edits rather than preventing them — though you can lock tracking on so reviewers cannot turn it off.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Open the practice document and turn on Track Changes.",
        "Delete a sentence and type a replacement — notice how both the deletion and insertion are marked.",
        "Switch the display to Simple Markup, then back to All Markup.",
        "Accept one tracked change individually.",
        "Use Accept All to accept all remaining changes.",
        "Turn off Track Changes when finished.",
      ],
    },
  ],
},

/* ============================================================
LESSON 3 – COMMENTS
============================================================ */

{
  slug: "comments",
  title: "Comments",
  description:
    "Add, reply to, resolve, and delete comments in Word to communicate feedback and collaborate on documents without altering the main content.",
  objectives: [
    "Insert, reply to, resolve, and delete comments",
    "Explain the difference between resolving and deleting a comment",
    "Navigate between comments efficiently during a review",
    "Write comments that a colleague can act on without asking a follow-up question",
  ],
  duration: "6 min",
  videoUrl: "https://www.youtube.com/embed/pLKHMRBR0Z0",

  practiceFiles: [
    {
      name: "Comments Practice File",
      url: "/practice/word/module-4/comments/word_comments_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Comments are a conversation with a future reader",
       blocks: [
         {
           type: "scenario",
           role: "You are reviewing a colleague's intake form revision at Lakeside Medical Associates.",
           text: "You leave a comment that says 'This is confusing.' Your colleague opens it three days later, reads the paragraph five times, cannot work out which part you meant or what would fix it, and either guesses or comes to find you. Either way the comment cost more time than it saved.",
           task: "Write comments specific enough to act on, and manage the review so nothing is silently lost.",
         },
         {
           type: "paragraph",
           text: "A comment attaches a note to a specific selection without altering the text. That specificity is its value — select the exact phrase you mean, not the whole paragraph, so the reader knows precisely what you are pointing at.",
         },
         {
           type: "paragraph",
           text: "Say what is wrong and what would resolve it. 'This is confusing' gives the author nothing. 'Does \"within 24 hours\" mean business hours or calendar hours? Suggest stating it explicitly' names the ambiguity and proposes the fix, and it can be actioned in thirty seconds without a conversation.",
         },
         {
           type: "callout",
           variant: "info",
           text: "Resolving and deleting are different. A resolved comment greys out and stays in the document, preserving the record of what was raised and that it was addressed. A deleted comment is gone. During an active review, resolve rather than delete — the thread is the evidence of why the document says what it says. Delete everything only in the final cleanup before the document leaves the practice.",
         },
         {
           type: "tip",
           text: "Ctrl+Alt+M inserts a comment on the current selection. Review > Previous and Next step through comments in order, which is the reliable way to make sure none is missed in a long document — scrolling and looking is not.",
         },
       ],
     },

    {
      heading: "What Are Comments?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Comments let you attach notes to specific text in a document without changing the content. They appear as colored bubbles in the margin and are ideal for feedback, questions, and review notes.",
        },
      ],
    },

    {
      heading: "Inserting a Comment",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select the text you want to comment on, then go to Review → New Comment. A comment balloon appears in the margin linked to your selected text. Type your note inside the balloon.",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_new_comment_command.png",
          alt: "New Comment button on the Review tab",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_balloon_example.png",
          alt: "Comment balloon in the document margin",
        },
      ],
    },

    {
      heading: "Replying to a Comment",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside an existing comment balloon and click the Reply button (the curved arrow icon) to add a threaded reply. This creates a conversation thread attached to the same text.",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_reply_button.png",
          alt: "Reply button inside a comment balloon",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_thread_example.png",
          alt: "Threaded comment conversation",
        },
      ],
    },

    {
      heading: "Resolving a Comment",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the three-dot menu (…) inside a comment balloon and choose Resolve Thread. The comment turns gray to indicate it has been addressed but keeps it visible for reference.",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_resolve_menu.png",
          alt: "Resolve Thread option in comment menu",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_resolved_state.png",
          alt: "Resolved comment shown in gray",
        },
      ],
    },

    {
      heading: "Deleting a Comment",
      blocks: [
        {
          type: "paragraph",
          text:
            "To permanently remove a comment, right-click the comment balloon and choose Delete Comment, or use the Delete button on the Review tab. Choose Delete All Comments in Document to remove all at once.",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_delete_command.png",
          alt: "Delete Comment option on right-click menu",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_delete_all_menu.png",
          alt: "Delete All Comments option on Review tab",
        },
      ],
    },

    {
      heading: "Navigating Between Comments",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the Previous and Next buttons in the Comments group on the Review tab to jump between comments without scrolling through the document manually.",
        },
        {
          type: "image",
          src: "/images/word/comments/comments_navigate_buttons.png",
          alt: "Previous and Next comment navigation buttons",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What happens when you resolve a comment in Word?",
          options: [
            "The comment is permanently deleted from the document",
            "The comment is saved as a footnote at the bottom of the page",
            "The comment turns gray to show it has been addressed but remains visible",
            "The commented text is automatically accepted and formatted",
          ],
          correctIndex: 2,
          explanation: "Resolving greys the comment out to show it has been dealt with, while keeping it in the document as a record of what was raised and settled. Deleting removes it entirely, along with that history.",
          optionRationales: [
            "That describes deleting. Resolving deliberately keeps the comment so the review history survives.",
            "Comments and footnotes are unrelated features. Resolving never converts one into the other.",
            "Correct. The comment greys out to show it is addressed but remains visible as a record of the discussion.",
            "Resolving a comment changes nothing in the document text. Comments annotate; they never edit.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Select a sentence in the practice document and insert a comment asking a question about the content.",
        "Reply to an existing comment in the document.",
        "Resolve a comment thread.",
        "Delete one comment completely.",
        "Use the Previous and Next buttons to navigate all remaining comments.",
      ],
    },
  ],
},

];