import { Lesson } from "@/types/lesson";

/**
 * Google Workspace, Module 3: Google Docs.
 * Scenario: Jordan Lee, office assistant at Parkview Property Management (fictional).
 */
const IMG = "/images/google-workspace/module-3";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const gwModule3Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "creating-and-formatting-documents",
    title: "Creating and Formatting Documents",
    description:
      "Start a document, then format text and paragraphs with the toolbar: fonts and sizes, bold and color, alignment, lists and checklists, line spacing, and paint format.",
    objectives: [
      "Create a Google Doc from Drive, the Docs home screen, or a template",
      "Change font, size, bold, italic, underline, and text color",
      "Align paragraphs and set line and paragraph spacing",
      "Make bulleted lists, numbered lists, and checklists",
      "Copy formatting with Paint format and remove it with Clear formatting",
    ],
    duration: "25 min",
    videoUrls: ["https://www.youtube.com/embed/afQ7cjZTKDg", "https://www.youtube.com/embed/OSh8VjfHX6Y"],
    slides: slides("creating-and-formatting-documents", [
      "Creating and formatting documents in Google Docs",
      "Three ways to start a document",
      "The Docs toolbar, left to right",
      "Lists: bulleted, numbered, and checklists",
      "Paint format copies formatting; Clear formatting removes it",
      "Quick check: which button would you use?",
    ]),
    sections: [
      {
        heading: "Starting a document",
        blocks: [
          {
            type: "scenario",
            role: "You prepare notices for Parkview's buildings.",
            text: "The city will shut off the water at Elm Street Apartments for repairs. Marcus typed the notice quickly, and it is one plain block of text. Tenants will skim it on the lobby board, so the time, the date, and what to do must jump out.",
            task: "Format the notice so the important information is easy to see.",
          },
          {
            type: "table",
            caption: "Ways to start a Google Doc",
            columns: ["From", "How"],
            rows: [
              ["Drive", "Open the folder where it belongs, then New › Google Docs › Blank document. The file is saved in that folder."],
              ["The Docs home screen", "docs.google.com (or Docs in the Google apps menu), then Blank document or a template."],
              ["An open document", "File › New › Document, or File › New › From a template."],
            ],
          },
          {
            type: "paragraph",
            text: "Name the document right away by clicking Untitled document at the top left. Then just type: there is no Save button, and Saved to Drive shows by the document status icon when your changes are stored.",
          },
        ],
      },
      {
        heading: "Formatting text and paragraphs",
        blocks: [
          {
            type: "table",
            caption: "The Docs toolbar and its Word equivalents",
            columns: ["Toolbar control", "What it does", "In Word"],
            rows: [
              ["Styles box (Normal text)", "Paragraph style: Title, Heading 1, and more", "Styles gallery"],
              ["Font and Font size", "Typeface and size; the minus and plus buttons step the size", "Font group"],
              ["Bold, Italic, Underline, Text color, Highlight color", "Character formatting for the selected text", "Font group"],
              ["Align", "Left, center, right, or justified", "Paragraph group"],
              ["Line & paragraph spacing", "Single, 1.15, 1.5, double, and space before or after", "Line and Paragraph Spacing"],
              ["Checklist, Bulleted list, Numbered list", "Lists", "Bullets and Numbering"],
              ["Paint format and Clear formatting", "Copy formatting, or remove it", "Format Painter and Clear All Formatting"],
            ],
          },
          {
            type: "list",
            items: [
              "Select first, then format. Click in a paragraph to format the whole paragraph (alignment, spacing, lists); select words to format only those words (bold, color).",
              "The same commands are in the Format menu: Format › Text, Format › Align & indent, Format › Line & paragraph spacing, Format › Bullets & numbering.",
              "Shortcuts match Word: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Shift+E (center), Ctrl+Shift+7 (numbered list), Ctrl+Shift+8 (bulleted list).",
              "If the toolbar is too narrow, the rest of the buttons are under More (the three dots) at its right end.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the button to the job",
            prompt: "Drag each toolbar control onto the job it does.",
            items: [
              { id: "b1", text: "Make the shutoff time stand out", match: "Bold" },
              { id: "b2", text: "Put the title in the middle of the line", match: "Center align" },
              { id: "b3", text: "Turn three instructions into a list", match: "Bulleted list" },
              { id: "b4", text: "Give tenants boxes to check off", match: "Checklist" },
              { id: "b5", text: "Copy the heading's look to another heading", match: "Paint format" },
            ],
            explanation: "Character formatting (bold, color) acts on the words you select. Paragraph formatting (alignment, lists, spacing) acts on the whole paragraph you click in.",
          },
          {
            type: "image",
            src: `${IMG}/creating-and-formatting-documents/docs-shortcuts.png`,
            alt: "Quick reference: where to format, structure, review, and finish in Google Docs, with the Word equivalents and common keyboard shortcuts",
            caption: "Google Docs at a glance. You will use the Structure, Review, and Finish tools in the next lessons.",
          },
        ],
      },
      {
        heading: "Lists, Paint format, and Clear formatting",
        blocks: [
          {
            type: "list",
            items: [
              "Bulleted list: select the lines and click Bulleted list. Click the arrow next to it to choose a bullet style.",
              "Numbered list: for steps that happen in order.",
              "Checklist: each line gets a box you can click to check it off (the text is crossed out).",
              "Paint format (the paint roller): click text with the formatting you want, click Paint format, then click or select the text to change. Double-click Paint format to apply it more than once.",
              "Clear formatting (Ctrl+\\): returns the selected text to plain Normal text.",
            ],
          },
          {
            type: "worked-example",
            title: "Formatting the water shutoff notice",
            task: "Make a plain notice readable at a glance on the lobby board.",
            steps: [
              { move: "Center the title and make it 24 pt.", why: "Tenants see what the notice is about from across the lobby." },
              { move: "Bold the sentence with the shutoff time.", why: "The time is the one fact every tenant needs; bold makes it the first thing the eye lands on." },
              { move: "Turn the three to-do lines into a bulleted list.", why: "Lists are faster to skim than a paragraph." },
              { move: "Set the body to 1.5 line spacing.", why: "More space between lines is easier to read on a printed notice." },
            ],
            result: "A notice tenants understand in a few seconds.",
            takeaway: "Format for the reader: the most important fact should be the easiest to see.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You click inside a paragraph without selecting anything and click Center align. What gets centered?",
            options: ["Nothing, you must select text first", "The whole paragraph", "Only the word you clicked", "The whole document"],
            correctIndex: 1,
            explanation: "Alignment is paragraph formatting. Clicking anywhere in a paragraph is enough.",
            optionRationales: [
              "Paragraph formatting does not need a selection.",
              "Correct. Alignment applies to the whole paragraph.",
              "Alignment never applies to single words.",
              "Only the paragraph with the cursor (or the selected paragraphs) changes.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You want three headings to look like the first one you formatted. What is the fastest way?",
            options: ["Format each heading again by hand", "Double-click Paint format, then click each heading", "Copy and paste the first heading three times", "Use Clear formatting"],
            correctIndex: 1,
            explanation: "Double-clicking Paint format keeps it on so you can apply the formatting several times. (Even better for headings: paragraph styles, in the next lesson.)",
            optionRationales: [
              "That works, but it is slow and easy to get slightly wrong.",
              "Correct. Double-click keeps Paint format on until you click it again or press Esc.",
              "Pasting copies the words too, not only the look.",
              "Clear formatting removes formatting instead of copying it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Make a notice in your own Google account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Google Doc named Practice Notice - your name.",
          "Type a title, one sentence with a time and place, and three instructions on their own lines.",
          "Center the title and make it 24 pt. Bold the time and place.",
          "Turn the three instructions into a bulleted list, and set the document to 1.5 line spacing.",
          "Add a checklist of two items at the end, and check one off.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your notice as a PDF (File › Download › PDF Document) or share it with your instructor as a Viewer. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "headings-outline-and-page-setup",
    title: "Headings, the Outline, and Page Setup",
    description:
      "Give a long document real structure with paragraph styles, move around it with tabs and outlines, add a table of contents, headers, footers, page numbers, and breaks, and choose pages or pageless.",
    objectives: [
      "Apply Title and Heading styles from the styles box, the Format menu, or Ctrl+Alt+1 to 6",
      "Use the Show tabs & outlines panel to see and jump between headings",
      "Insert a table of contents, header, footer, and page numbers with Insert › Page elements, and a page break with Insert › Break",
      "Change page setup: pages or pageless, orientation, and margins",
    ],
    duration: "25 min",
    videoUrl: "https://www.youtube.com/embed/4dNybOXJ9GU",
    slides: slides("headings-outline-and-page-setup", [
      "Headings, the outline, and page setup",
      "Paragraph styles: Title, Heading 1, Heading 2",
      "Show tabs & outlines: your document's map",
      "Insert, then Page elements: table of contents, header, footer, page number",
      "Pages or pageless?",
      "Quick check: style, page element, or page setup?",
    ]),
    sections: [
      {
        heading: "Headings are structure, not just big text",
        blocks: [
          {
            type: "scenario",
            role: "You are finishing the Parkview tenant handbook.",
            text: "The handbook is eight pages long. Every section title is just bold text, so there is no table of contents and readers scroll forever to find the parking rules. Denise wants proper headings, a table of contents, page numbers, and the company name at the top of every page before it is printed for new tenants.",
            task: "Structure the handbook with styles and page elements.",
          },
          {
            type: "list",
            items: [
              "Click the section title, open the styles box on the toolbar (it shows Normal text), and choose Heading 1. Use Heading 2 for sections inside a section.",
              "Or use Format › Paragraph styles › Heading 1 › Apply 'Heading 1', or press Ctrl+Alt+1 (Ctrl+Alt+2 for Heading 2, Ctrl+Alt+0 for Normal text).",
              "Use Title once, for the document's name at the top.",
              "To change how every Heading 1 looks, format one heading, then choose Format › Paragraph styles › Heading 1 › Update 'Heading 1' to match.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Headings are what the outline and the table of contents read. Bold, bigger Normal text looks like a heading, but Docs does not treat it as one.",
          },
        ],
      },
      {
        heading: "Tabs and outlines",
        blocks: [
          {
            type: "paragraph",
            text: "At the top left of a document, click Show tabs & outlines. A panel opens on the left with the document's tabs and, under each tab, an outline of its headings. Click a heading to jump to it. Click Hide tabs & outlines (the arrow at the top of the panel) to close it.",
          },
          {
            type: "list",
            items: [
              "Every document starts with one tab, Tab 1. Add tab in the panel adds another, like adding a sheet in Google Sheets. A tab is a good home for a separate part, such as an appendix of forms.",
              "Tab options (the three dots next to a tab) let you rename it, choose an emoji, add a subtab, or hide its outline.",
              "If you know Word: the outline works like Word's Navigation pane.",
            ],
          },
        ],
      },
      {
        heading: "Page elements and breaks",
        blocks: [
          {
            type: "table",
            caption: "Insert › Page elements and Insert › Break",
            columns: ["To add", "Go to", "Notes"],
            rows: [
              ["Table of contents", "Insert › Page elements › Table of contents", "Built from your headings. After adding headings, click the table of contents and click Refresh to update it"],
              ["Header or footer", "Insert › Page elements › Header (or Footer)", "Text that repeats on every page, like the company name"],
              ["Page numbers", "Insert › Page elements › Page number", "Choose where the number goes"],
              ["Footnote", "Insert › Page elements › Footnote", "A numbered note at the bottom of the page"],
              ["Page break", "Insert › Break › Page break (Ctrl+Enter)", "Starts the next section on a new page"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Style, page element, or page setup?",
            prompt: "Sort each request by where you would go.",
            buckets: [
              { id: "style", label: "Paragraph style" },
              { id: "element", label: "Insert › Page elements or Break" },
              { id: "setup", label: "File › Page setup" },
            ],
            items: [
              { id: "e1", text: "Make Parking Rules a Heading 1", bucket: "style" },
              { id: "e2", text: "Put Parkview Property Management at the top of every page", bucket: "element" },
              { id: "e3", text: "Number the pages", bucket: "element" },
              { id: "e4", text: "Turn the page sideways for a wide schedule", bucket: "setup" },
              { id: "e5", text: "Start the Forms section on a new page", bucket: "element" },
              { id: "e6", text: "Make the margins narrower", bucket: "setup" },
            ],
            explanation: "Styles shape paragraphs, page elements add things that belong to pages, and page setup changes the page itself.",
          },
        ],
      },
      {
        heading: "Page setup: pages or pageless",
        blocks: [
          {
            type: "list",
            items: [
              "File › Page setup opens a box with two choices at the top: Pages and Pageless. Click OK to apply, or Set as default to use it for new documents.",
              "Pages shows separate pages, like Word. On the Pages tab you set orientation (portrait or landscape), paper size, page color, and margins.",
              "Pageless is one long scroll, like a web page. Images and tables stretch to fit your screen. It is good for documents people only read on screen.",
              "Pageless hides headers, footers, and watermarks (they come back if you switch to Pages) and turns off features such as columns and page numbers.",
              "To switch quickly, use Format › Switch to Pageless format (or Switch to Pages format).",
            ],
          },
          {
            type: "tip",
            text: "Anything that will be printed, like the handbook, belongs in Pages format. An internal how-to that people read on screen works well pageless.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You inserted a table of contents, then added two more Heading 1 sections. The table of contents does not show them. What do you do?",
            options: ["Delete it and insert a new one", "Click the table of contents and click Refresh", "Type the headings into it by hand", "Switch to pageless"],
            correctIndex: 1,
            explanation: "The table of contents updates when you refresh it.",
            optionRationales: [
              "That works, but Refresh is faster and keeps your choice of style.",
              "Correct. Refresh rebuilds it from your current headings.",
              "Typed entries would not update or link to the headings.",
              "Pageless does not update the table of contents, and it limits how you can format one.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Denise wants Parkview Property Management at the top of every printed page. Where do you go?",
            options: ["File › Page setup", "Insert › Page elements › Header", "Format › Paragraph styles › Title", "Insert › Break"],
            correctIndex: 1,
            explanation: "A header repeats on every page. Type the name once in the header.",
            optionRationales: [
              "Page setup changes the page size, orientation, and margins.",
              "Correct. A header repeats on every page.",
              "Title is a style for the first line, which appears only once.",
              "Breaks start new pages; they do not add repeating text.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You switch a document to Pageless. What happens to its header?",
            options: ["It is deleted", "It is hidden, and comes back if you switch to Pages", "It moves to the end of the document", "It turns into a heading"],
            correctIndex: 1,
            explanation: "Pageless hides headers, footers, and watermarks without deleting them.",
            optionRationales: [
              "Switching to pageless does not delete them.",
              "Correct. Switch back to Pages and the header is there.",
              "Headers are hidden, not moved.",
              "Headers do not change into paragraphs.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Structure a document of your own, such as notes from this course." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a document with a Title and at least three section titles, each with a sentence or two under it.",
          "Make the section titles Heading 1 (Ctrl+Alt+1). Open Show tabs & outlines and check that all three appear.",
          "Insert a table of contents at the top: Insert › Page elements › Table of contents.",
          "Add a header with your name and page numbers: Insert › Page elements.",
          "Insert a page break before the last section (Ctrl+Enter). Open File › Page setup and note whether the document is Pages or Pageless.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a PDF of the document (File › Download › PDF Document) to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "tables-images-and-smart-chips",
    title: "Tables, Images, Smart Chips, and Voice Typing",
    description:
      "Add tables and images, insert smart chips for people, dates, and files, drop in building blocks like meeting notes, and dictate with voice typing.",
    objectives: [
      "Insert a table, type in it, and add or delete rows and columns",
      "Insert an image from your computer, Drive and Photos, or a URL",
      "Insert smart chips for a person, a date, and a file with @ or Insert › Smart chips",
      "Add a building block such as Meeting notes",
      "Start voice typing with Tools › Voice typing",
    ],
    duration: "25 min",
    videoUrl: "https://www.youtube.com/embed/6PhT84sVcE8",
    slides: slides("tables-images-and-smart-chips", [
      "Tables, images, smart chips, and voice typing",
      "Tables: Insert, then Table; right-click to add rows and columns",
      "Images: upload, Stock & web, Drive & Photos, Camera, By URL",
      "Smart chips: type @ for people, dates, and files",
      "Building blocks and voice typing",
      "Quick check: which tool fits?",
    ]),
    sections: [
      {
        heading: "Tables",
        blocks: [
          {
            type: "scenario",
            role: "You write the weekly maintenance update for Elm Street Apartments.",
            text: "Kim Nguyen sends you the week's repairs in a text message, and Denise wants them in a tidy update: who prepared it, the date, a table of repairs, a photo of the finished work, and a link to the vendor list.",
            task: "Build the update with a table, an image, and smart chips.",
          },
          {
            type: "list",
            items: [
              "Click where the table goes, then Insert › Table and point to the size you want (columns x rows). Tables can be up to 20 x 20.",
              "Click a cell to type. Press Tab to move to the next cell.",
              "Right-click a cell for Insert row above, Insert row below, Insert column left, Insert column right, Delete row, Delete column, and Delete table.",
              "Format › Table › Table options sets sizes, cell padding, and alignment. Under Row, Pin header row(s) repeats the header row on each page.",
              "Right-click the table › Sort table to sort the rows in ascending or descending order.",
            ],
          },
        ],
      },
      {
        heading: "Images",
        blocks: [
          {
            type: "list",
            items: [
              "Click where the image goes, then Insert › Image and choose a source: Upload from computer, Stock & web, Drive & Photos, Camera, or By URL.",
              "You can also drag an image file from your computer into the document.",
              "Click the image to see its options: In line, Wrap text, Break text, Behind text, or In front of text. Drag a corner to resize it.",
              "Only use images you have the right to use. Photos Parkview took, and the stock images Docs offers, are safe choices.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "In a pageless document, the text-wrapping layouts are not available; images stay in line with the text.",
          },
        ],
      },
      {
        heading: "Smart chips and building blocks",
        blocks: [
          {
            type: "paragraph",
            text: "A smart chip is a small, clickable box in the text for a person, a date, a file, a place, or a calendar event. Type @ anywhere in a document (or use Insert › Smart chips) and pick from the list. Hovering over a people chip shows the person's details; clicking a file chip opens the file.",
          },
          {
            type: "table",
            caption: "Smart chips you will use most",
            columns: ["Chip", "How", "Good for"],
            rows: [
              ["People", "Type @ and the person's name, then pick them", "Who prepared a document, who owns a task"],
              ["Date", "Type @today, @tomorrow, @date, or a date such as @11/3/2026", "Dates that everyone sees in the same format"],
              ["File", "Type @ and part of a file's name", "A link to the vendor list or the lease form"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "A people chip does not share the document with that person. If they need to open it, share it with them separately.",
          },
          {
            type: "paragraph",
            text: "Building blocks are ready-made pieces: Insert › Building blocks, or type @ and choose one. Meeting notes adds notes filled in with the details of a Google Calendar event you pick. Email draft adds an email with a To field, a subject, and a body that you can write together; when it is ready, click Preview in Gmail at the top left of the draft to open it in Gmail and send it.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which tool fits?",
            prompt: "Match each job to the tool for it.",
            items: [
              { id: "t1", text: "A grid of repairs: apartment, problem, status", match: "Table" },
              { id: "t2", text: "Show who prepared the update", match: "People chip" },
              { id: "t3", text: "Link the vendor list so readers can open it", match: "File chip" },
              { id: "t4", text: "A photo of the repaired faucet", match: "Insert › Image" },
              { id: "t5", text: "An agenda with attendees and action items", match: "Meeting notes building block" },
            ],
            explanation: "Tables organize facts in rows and columns. Chips turn names, dates, and files into live links. Building blocks give you a ready-made layout.",
          },
        ],
      },
      {
        heading: "Voice typing",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Click where the text should go, then Tools › Voice typing. A microphone box appears.",
              "Click the microphone (allow the browser to use it the first time) and speak clearly.",
              "Say punctuation out loud: period, comma, exclamation point, question mark, new line, new paragraph.",
              "Click the microphone again to stop. Check what was typed and fix mistakes.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Voice typing works in the latest versions of Chrome, Edge, and Safari. Voice commands such as punctuation work only when the account and document language are English.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You add a people chip for Tony Russo to an update. Can Tony open the document now?",
            options: ["Yes, a chip shares the document", "Only if you also share the document with him", "Only if he is at Parkview", "Yes, as an Editor"],
            correctIndex: 1,
            explanation: "Mentioning someone in a chip does not give them access. Share the document separately.",
            optionRationales: [
              "Chips do not change sharing.",
              "Correct. Share the document with Tony if he needs to open it.",
              "Sharing, not his company, decides access.",
              "A chip never grants any role.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Your table needs one more row at the bottom. What do you do?",
            options: ["Insert › Table again", "Right-click a cell in the last row › Insert row below", "Press Enter at the end of the table", "Delete the table and start over"],
            correctIndex: 1,
            explanation: "Right-click menus in a table add and remove rows and columns.",
            optionRationales: [
              "That makes a second table.",
              "Correct. Insert row below adds a row under the one you clicked.",
              "Enter adds a new line inside the cell.",
              "There is no need to start over.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Build a one-page update in your own Google account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a document named Weekly Update - your name. Type Prepared by: and insert a people chip for yourself (type @ and your name).",
          "Type Date: and insert @today.",
          "Insert a 3 x 3 table and fill in a header row (Task, Status, Notes) and two rows.",
          "Insert an image from Stock & web.",
          "Insert the Meeting notes building block at the end. Then try Tools › Voice typing to dictate one sentence (skip this step if your computer has no microphone).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a PDF of your update to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "comments-suggestions-and-version-history",
    title: "Comments, Suggestions, and Version History",
    description:
      "Review documents with your team: comment, reply, and assign tasks, suggest edits instead of making them, accept or reject suggestions, and name and restore versions.",
    objectives: [
      "Add a comment, reply to one, and resolve it",
      "Assign a comment to a person with an @mention",
      "Switch to Suggesting mode, suggest an edit, and accept or reject suggestions",
      "Open version history, name the current version, and restore an earlier one",
    ],
    duration: "25 min",
    slides: slides("comments-suggestions-and-version-history", [
      "Reviewing together: comments, suggestions, and version history",
      "Comments: Ctrl+Alt+M, reply, resolve",
      "Assign a comment with an @mention",
      "Suggesting mode: edits become suggestions the owner accepts or rejects",
      "Version history: name versions, restore old ones",
      "Quick check: comment, suggest, or restore?",
    ]),
    sections: [
      {
        heading: "Comments",
        blocks: [
          {
            type: "scenario",
            role: "You own the draft of Parkview's new pet policy.",
            text: "Denise and Marcus have read the draft. Denise left a comment, Marcus suggested two changes, and Priya still needs to confirm the monthly pet fee. You need to work through the feedback without losing track of the original wording.",
            task: "Handle comments and suggestions, assign the open question, and mark the reviewed version.",
          },
          {
            type: "list",
            items: [
              "Select the text, then click Add comment on the toolbar, choose Insert › Comment, or press Ctrl+Alt+M. Type the comment and click Comment.",
              "Comments show in the right margin, attached to the text. Click one to reply.",
              "When a comment is handled, click the check mark (Mark as done and hide discussion) to resolve it. Resolved comments stay in the comment history (the Comments button at the top right).",
              "To assign a comment, type @ and the person's name in it, check Assign to, and click Assign. The person is notified and is responsible for marking it done.",
            ],
          },
        ],
      },
      {
        heading: "Suggesting mode",
        blocks: [
          {
            type: "paragraph",
            text: "In Suggesting mode, your edits do not change the text. They appear as colored suggestions with your name, and the document's editors accept or reject each one. It is the Google Docs version of Word's Track Changes.",
          },
          {
            type: "list",
            items: [
              "Switch modes with the mode button at the right end of the toolbar (it shows Editing): choose Suggesting. Or use View › Mode › Suggesting, or press Ctrl+Alt+Shift+X.",
              "Type, delete, or replace text as usual. Each change becomes a suggestion card in the margin.",
              "To accept or reject one, click the check mark or the X on its card. Tools › Review suggested edits shows them all, with Accept all and Reject all.",
              "Viewing mode shows the document without suggestions or comments, as it would print.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Comment, suggest, or edit?",
            prompt: "Sort what you would do in each case.",
            buckets: [
              { id: "comment", label: "Add a comment" },
              { id: "suggest", label: "Suggest an edit" },
              { id: "edit", label: "Edit directly" },
            ],
            items: [
              { id: "x1", text: "You think the fee is wrong but are not sure, and want Priya to check", bucket: "comment" },
              { id: "x2", text: "Denise's document: you want to change one sentence and let her decide", bucket: "suggest" },
              { id: "x3", text: "Your own draft has a typo", bucket: "edit" },
              { id: "x4", text: "You have a question about what a rule means", bucket: "comment" },
              { id: "x5", text: "Marcus's notice: you would reword the second paragraph", bucket: "suggest" },
            ],
            explanation: "Comment to ask or discuss, suggest to propose a change in someone else's document, and edit directly in your own work.",
          },
        ],
      },
      {
        heading: "Version history",
        blocks: [
          {
            type: "list",
            items: [
              "Open it with the Last edit (clock) icon at the top right, File › Version history › See version history, or Ctrl+Alt+Shift+H.",
              "Click a version on the right to see what it looked like and who changed what.",
              "Restore: choose the earlier version, click Restore this version, and confirm. Your current text becomes a version in the list, so nothing is lost.",
              "Name a version to find it later: File › Version history › Name current version, or in the list, choose More › Name this version. A document can have up to 40 named versions.",
              "Only people who can edit the file can see its version history.",
            ],
          },
          {
            type: "worked-example",
            title: "Marking the reviewed pet policy",
            task: "The team has reviewed the draft, and you expect more changes later.",
            steps: [
              { move: "Accept and reject the suggestions, and resolve the comments that are handled.", why: "The margin should show only what is still open." },
              { move: "File › Version history › Name current version: Reviewed by office.", why: "If later edits go wrong, you can find and restore this exact version by name." },
            ],
            result: "A clean draft, plus a named version to return to.",
            takeaway: "Name a version at every milestone: first draft, reviewed, final.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want Denise to decide whether to change a sentence in her document. What do you use?",
            options: ["Edit it directly", "Suggesting mode", "Delete the sentence", "Version history"],
            correctIndex: 1,
            explanation: "A suggestion shows your change without making it, and Denise accepts or rejects it.",
            optionRationales: [
              "Editing changes her text without asking.",
              "Correct. Suggesting mode lets her decide.",
              "Deleting changes the text directly.",
              "Version history restores old versions; it is not for proposing changes.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Someone pasted over half of the policy by mistake. How do you get the old text back?",
            options: ["Press Ctrl+S", "Open version history and restore the earlier version", "Ask Google to recover it", "It cannot be recovered"],
            correctIndex: 1,
            explanation: "Version history keeps earlier versions. Restoring one keeps the current text as a version too.",
            optionRationales: [
              "Docs has no Save to undo; changes are already saved.",
              "Correct. Restore this version brings back the earlier text.",
              "You can do it yourself in seconds.",
              "Version history makes it recoverable.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Review a document with a classmate or a second account of your own." },
      {
        type: "list",
        ordered: true,
        items: [
          "Share a practice document with your partner as a Commenter.",
          "Ask them to add a comment and to suggest one change in Suggesting mode.",
          "Reply to the comment and resolve it. Accept or reject the suggestion.",
          "Name the current version Reviewed. Then make an edit and restore the Reviewed version from version history.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of version history showing your named version to your instructor or course folder. No partner? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "proofreading-printing-and-sending",
    title: "Proofreading, Printing, and Sending Documents",
    description:
      "Finish a document the professional way: check spelling and grammar, use word count and find and replace, then print, download, email, or copy it.",
    objectives: [
      "Check spelling and grammar and fix or ignore each suggestion",
      "Use Word count and Find and replace",
      "Print a document or save it as a PDF from the Print box",
      "Email a document as an attachment and make a copy for a new purpose",
    ],
    duration: "20 min",
    slides: slides("proofreading-printing-and-sending", [
      "Proofreading, printing, and sending",
      "Spelling and grammar: change, ignore, or fix it yourself",
      "Word count and Find and replace",
      "Print: printer or Save as PDF",
      "Send: download, email as an attachment, or make a copy",
      "Quick check: which finishing step?",
    ]),
    sections: [
      {
        heading: "Proofread before anyone else reads it",
        blocks: [
          {
            type: "scenario",
            role: "You are sending the move-in letter to a new tenant at Elm Street Apartments.",
            text: "The letter has a spelling mistake, it says Elm St. in some places and Elm Street in others, and it must be printed for the move-in packet and emailed to the tenant as a PDF. Denise also wants a copy to reuse for the next new tenant.",
            task: "Proofread, print, and send the letter, and keep a reusable copy.",
          },
          {
            type: "list",
            items: [
              "When spelling and grammar suggestions are on, Docs underlines misspelled words in red and grammar suggestions in blue. Right-click an underlined word and click the suggested word to accept it, or click Ignore.",
              "To go through the whole document, click Spelling and grammar check on the toolbar (at the top left). A box opens at the top right: click Change to use a suggestion or Ignore to skip it. More › Accept all or Ignore all handles every suggestion at once.",
              "Read it yourself too. A checker cannot tell that you typed the wrong apartment number.",
            ],
          },
        ],
      },
      {
        heading: "Word count and Find and replace",
        blocks: [
          {
            type: "list",
            items: [
              "Tools › Word count (Ctrl+Shift+C) shows pages, words, and characters. Check Display word count while typing to keep a count on screen.",
              "Edit › Find and replace (Ctrl+H): type what to find and what to replace it with, then click Replace or Replace all. Check Match case when capital letters matter.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Finish a document in order",
            prompt: "Put the finishing steps in a sensible order.",
            items: [
              { id: "s1", text: "Run Spelling and grammar check" },
              { id: "s2", text: "Use Find and replace to make names consistent" },
              { id: "s3", text: "Read the whole document yourself" },
              { id: "s4", text: "Print or download the final copy" },
              { id: "s5", text: "Send it to the reader" },
            ],
            explanation: "Fix errors first, then read it as the reader will, and only then print or send. Every copy you send is a copy you cannot fix later.",
          },
        ],
      },
      {
        heading: "Print, download, email, or copy",
        blocks: [
          {
            type: "table",
            caption: "Ways to get a document to someone",
            columns: ["Task", "How"],
            rows: [
              ["Print", "File › Print (Ctrl+P). Choose the printer as the Destination, set copies, and click Print."],
              ["Save a PDF on the computer", "File › Download › PDF Document (.pdf), or in the Print box choose Save as PDF as the Destination."],
              ["Email it as an attachment", "File › Email › Email this file. Enter the address and subject, choose the format (such as PDF), and click Send."],
              ["Email everyone working on it", "File › Email › Email collaborators."],
              ["Reuse it for something new", "File › Make a copy. Give the copy a name; the original stays as it is."],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Before you email a document outside Parkview, check that it contains only what the reader should see. Delete comments and suggestions, or send a PDF, so internal notes do not go out with it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "The letter says Elm St. in six places. You want them all to say Elm Street. What is fastest?",
            options: ["Fix each by hand", "Edit › Find and replace, then Replace all", "Spelling and grammar check", "Word count"],
            correctIndex: 1,
            explanation: "Find and replace changes every match at once.",
            optionRationales: [
              "It works, but it is slow and easy to miss one.",
              "Correct. Replace all fixes all six at once.",
              "Elm St. is not a spelling mistake, so the checker will not flag it.",
              "Word count only counts.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You need next month's move-in letter to start from this one, without changing this one. What do you do?",
            options: ["Edit this letter next month", "File › Make a copy", "Download it as Word", "Rename it"],
            correctIndex: 1,
            explanation: "Make a copy creates a separate file you can change freely.",
            optionRationales: [
              "Then this tenant's letter would change too.",
              "Correct. The copy is a new file; the original stays as it is.",
              "A download is a copy on your computer, outside Drive.",
              "Renaming does not make a second file.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Finish a document in your own account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Open any practice document and click Spelling and grammar check on the toolbar. Change or ignore each suggestion.",
          "Use Edit › Find and replace to replace one word everywhere it appears.",
          "Open File › Print and choose Save as PDF as the Destination. Save the PDF.",
          "Use File › Make a copy to make a copy named Copy for Next Time.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the PDF you saved to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },
];
