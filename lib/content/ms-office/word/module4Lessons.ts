import { Lesson } from "@/types/lesson";

export const wordModule4Lessons: Lesson[] = [ 

{
  slug: "headers-and-footers",
  title: "Headers & Footers",
  description:
    "Create, edit, and customize headers and footers in Microsoft Word. Insert preset headers, add dates, page numbers, and format different first pages.",
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