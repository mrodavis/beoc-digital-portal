import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M7 = {
"working-with-styles": {
  "objectives": [
    "Apply paragraph and character styles from the Styles gallery",
    "Explain the difference between a style and direct formatting",
    "Use the Styles pane to see what is applied and clear it",
    "Describe the three things heading styles enable beyond appearance",
  ],
  "opening": {
    "heading": "Styles are the single highest-leverage skill in Word",
    "blocks": [
      {"type": "scenario",
       "role": "You maintain the policy manual at Lakeside Medical Associates.",
       "text": "The manual has sixty section headings, each formatted by hand: select, set 14 point, bold, dark blue. Leadership adopts a new visual identity and headings must become 16 point in a different typeface. Formatted by hand, that is sixty repetitions. Formatted with a style, it is one change.",
       "task": "Understand styles well enough that a document-wide formatting change is one action, not sixty."},
      {"type": "paragraph",
       "text": "Direct formatting applies appearance to the specific text you selected — Word remembers 'this text is bold' and nothing more. A style is a named, saved package of formatting applied by reference: the text is marked as Heading 1, and Heading 1 is defined once. Redefine the style and every paragraph carrying it updates instantly."},
      {"type": "paragraph",
       "text": "The larger point is that heading styles carry meaning, not just looks. Three important features depend on them and work only when they are used properly. An automatic table of contents is built from heading styles. The Navigation pane's document outline comes from heading styles. And screen readers announce heading levels so a blind reader can jump between sections — text that merely looks like a heading provides none of this."},
      {"type": "table",
       "caption": "Style types",
       "columns": ["Type", "Applies to", "Example"],
       "rows": [
         ["Paragraph", "The whole paragraph, including spacing and indents", "Heading 1, Normal, Quote"],
         ["Character", "Only the selected characters", "Emphasis, Strong, Book Title"],
         ["Linked", "Either, depending on your selection", "Most heading styles"],
         ["Table", "A whole table's borders, shading, and banding", "Grid Table 4 Accent 1"],
         ["List", "The numbering scheme of a multilevel list", "List Paragraph"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Formatting a paragraph to look like a heading — bigger, bold, blue — produces something that only looks structural. It will not appear in a table of contents, will not show in the Navigation pane, and will not be announced as a heading by a screen reader. Use the real Heading styles and change how they look, rather than making body text look like headings."},
      {"type": "tip",
       "text": "Ctrl+Alt+1, 2, and 3 apply Heading 1, 2, and 3. Ctrl+Shift+N returns a paragraph to Normal. Learning these three keystrokes makes structuring a long document dramatically faster than reaching for the gallery each time."},
    ],
  },
  "checks": [{"explanation": "A style is a named, saved set of formatting applied by reference. Redefining the style updates every paragraph using it at once — and heading styles additionally drive the table of contents, the Navigation pane, and screen reader navigation.",
    "rationales": [
      "Translation is under Review > Translate and is unrelated to styles.",
      "Correct. Styles apply saved formatting combinations in one click, and redefining a style updates every paragraph that uses it.",
      "Locking a document is Restrict Editing under the Review tab. Styles control formatting, not permissions.",
      "PDF export is File > Export. Styles affect how the document looks and is structured, not what format it saves to.",
    ]}],
},

"modifying-styles": {
  "objectives": [
    "Modify a built-in style so the change propagates document-wide",
    "Update a style to match selected formatting",
    "Create a new custom style",
    "Explain the difference between changing this document and changing the template",
  ],
  "opening": {
    "heading": "Change the style, not the sixty paragraphs",
    "blocks": [
      {"type": "scenario",
       "role": "You are updating the policy manual at Lakeside Medical Associates.",
       "text": "Every Heading 1 in the manual must become 16 point in the practice's new typeface. The headings already use the Heading 1 style, so the work is one dialog rather than sixty selections.",
       "task": "Modify a style once and watch the whole document follow."},
      {"type": "paragraph",
       "text": "There are two routes and they suit different moments. Right-click the style in the gallery and choose Modify to open a dialog where you set the formatting explicitly — best when you know exactly what you want. Or format one paragraph until it looks right, then right-click the style and choose 'Update Heading 1 to Match Selection' — best when you are designing visually and want to lock in what you have arrived at."},
      {"type": "callout", "variant": "info",
       "text": "The Modify dialog offers 'Only in this document' and 'New documents based on this template.' The first changes this file alone. The second writes the change into the underlying template, so every future document inherits it. Choose the template option deliberately — it is how you make practice-wide standards stick, and also how you accidentally change the look of everything you create from then on."},
      {"type": "tip",
       "text": "Keep the number of styles small. A document with six well-defined styles is easy to maintain; one with forty near-identical variants is worse than no styles at all, because nobody can tell which to apply. If you need a variant, ask first whether an existing style should simply be adjusted."},
    ],
  },
  "checks": [{"explanation": "Styles are applied by reference, so redefining one updates every paragraph carrying it at the same moment. This is precisely why styles are worth the small effort of learning.",
    "rationales": [
      "Changing only the selection is what direct formatting does. Modifying a style deliberately reaches every paragraph using it.",
      "Correct. Every paragraph using that style updates at once, because the formatting is applied by reference.",
      "Modifying a style edits its definition in place. The style keeps its name and its links to the text using it.",
      "That describes creating a new style from the selection, which is a different command. Modify changes the existing style.",
    ]}],
},

"style-sets": {
  "objectives": [
    "Apply a style set to restyle a whole document at once",
    "Explain the relationship between style sets, styles, and themes",
    "Return to the default style set",
    "Save a custom style set for reuse",
  ],
  "opening": {
    "heading": "A coordinated redesign in one click",
    "blocks": [
      {"type": "scenario",
       "role": "You are preparing a report for the board at Lakeside Medical Associates.",
       "text": "The content is finished but the document looks like a first draft. You could adjust each style by hand, or you could apply a style set and see the whole document restyled coherently in one click — then fine-tune from there.",
       "task": "Use style sets to reach a professional baseline quickly, instead of designing every style from scratch."},
      {"type": "paragraph",
       "text": "A style set is a coordinated collection of definitions for the built-in styles — Heading 1 through 3, Normal, Quote, and the rest — designed to look right together. Applying one from Design > Document Formatting changes fonts, sizes, and spacing across the whole document simultaneously."},
      {"type": "paragraph",
       "text": "Style sets only reach text that uses styles. This is where the value of the previous lessons becomes concrete: a document built with real Heading and Normal styles transforms completely, while a document formatted by hand barely changes, because none of its formatting is connected to a style definition."},
      {"type": "callout", "variant": "info",
       "text": "Style sets and themes overlap but are distinct. A theme (Design > Themes) sets the colors, fonts, and effects available document-wide, including in charts and shapes. A style set decides how the paragraph styles use them — sizes, spacing, and which theme font each style takes. Change the theme for palette; change the style set for typographic treatment."},
    ],
  },
  "checks": [{"explanation": "A style set redefines the built-in styles together — fonts, sizes, and spacing for headings, body text, and quotes — so the whole document is restyled coherently in one action. It changes formatting only; content is untouched.",
    "rationales": [
      "Style sets never alter content. Only the formatting definitions change.",
      "Correct. The built-in styles are redefined as a coordinated set, restyling the document in one click.",
      "Page background color is Design > Page Color, a separate setting that style sets do not touch.",
      "Style sets do not lock anything. Restricting further changes is Review > Restrict Editing.",
    ]}],
},

"using-themes": {
  "objectives": [
    "Apply a theme and explain the three elements it controls",
    "Change theme colors, fonts, and effects independently",
    "Save a custom theme for consistent branding",
    "Explain why theme colors are better than fixed colors",
  ],
  "opening": {
    "heading": "Themes keep everything in a document agreeing with itself",
    "blocks": [
      {"type": "scenario",
       "role": "You produce patient-facing materials at Lakeside Medical Associates.",
       "text": "The practice adopts a new color palette. Your documents contain headings, chart series, table shading, and shape fills, all coloured by hand from the standard palette. Updating them means finding every coloured object in every document.",
       "task": "Use theme colors, so a palette change is one selection rather than an audit."},
      {"type": "paragraph",
       "text": "A theme controls three things: a palette of colors, a pair of fonts for headings and body text, and a set of graphic effects for shapes and charts. Together they keep every element in a document visually consistent — and consistent across Word, Excel, and PowerPoint, since all three share the same theme system."},
      {"type": "paragraph",
       "text": "The practical detail is in the color picker. Colors under 'Theme Colors' at the top are references to the theme; colors under 'Standard Colors' are fixed values. Choose a theme color and it updates automatically when the theme changes. Choose a standard color and it stays that exact color forever, regardless of any rebrand."},
      {"type": "tip",
       "text": "Set up the practice's palette and fonts once, then Design > Themes > Save Current Theme. The theme appears in the gallery in Word, Excel, and PowerPoint, so a report, its spreadsheet, and the presentation about it all match without anyone having to remember hex codes."},
    ],
  },
  "checks": [{"explanation": "A theme bundles a color palette, a heading and body font pair, and a set of graphic effects for shapes and charts. The same theme applies across Word, Excel, and PowerPoint, which is how a report, its spreadsheet, and its presentation stay visually consistent.",
    "rationales": [
      "Margins, line spacing, and tab stops are layout and paragraph settings, controlled independently of the theme.",
      "Correct. A theme controls colors, fonts, and effects — and applies the same three across the Office applications.",
      "Header and footer content is document content. Themes affect how it looks, not what it says.",
      "Language and regional formats are set under File > Options and the Review tab, unrelated to themes.",
    ]}],
},

"table-of-contents": {
  "objectives": [
    "Insert an automatic table of contents built from heading styles",
    "Update a table of contents after the document changes",
    "Explain why heading styles are a prerequisite",
    "Navigate a long document using the Navigation pane",
  ],
  "opening": {
    "heading": "The table of contents is the payoff for using styles",
    "blocks": [
      {"type": "scenario",
       "role": "You are finishing the staff handbook at Lakeside Medical Associates.",
       "text": "The handbook runs to eighty pages with forty sections, and it is revised every quarter. A hand-typed contents list would be wrong within a week of every revision — each edit shifts the page numbers below it.",
       "task": "Generate a contents list that rebuilds itself from the document's own headings."},
      {"type": "paragraph",
       "text": "An automatic table of contents scans the document for paragraphs styled Heading 1, 2, and 3, and builds an entry for each with its current page number. Nothing is typed manually, so nothing can drift out of date — you click Update Table and it is correct again."},
      {"type": "paragraph",
       "text": "This is why the styles lessons come first. If your section titles are merely bold 14-point text, Word has no way to identify them, and the contents list comes back empty. The heading styles are what make a heading a heading as far as Word is concerned."},
      {"type": "worked-example",
       "title": "Building a contents list that maintains itself",
       "task": "Add a working table of contents to an eighty-page handbook and keep it accurate through quarterly revisions.",
       "steps": [
         {"move": "Apply Heading 1 to each main section and Heading 2 to subsections throughout.",
          "why": "This is the actual work, and everything else is one click. Use the Navigation pane as you go — it shows the outline Word can see, so a section missing from the pane is a section that will be missing from the contents."},
         {"move": "Place the cursor where the contents belongs, then References > Table of Contents > Automatic Table 1.",
          "why": "Word inserts every heading with its page number. Choosing an automatic table rather than the manual one is what makes it updatable — the manual option inserts placeholder text you would have to maintain yourself."},
         {"move": "After any revision, click in the table and press Update Table > Update entire table.",
          "why": "Page numbers only refreshes the numbers; entire table also picks up renamed, added, and deleted headings. After a real revision you always want the second option."},
         {"move": "Update once more immediately before printing or exporting to PDF.",
          "why": "The table does not refresh on its own. A document edited and sent without a final update ships a contents list pointing at the wrong pages, which is worse than having none — readers trust it and are sent to the wrong place."},
       ],
       "result": "A contents list that is correct after every revision, at the cost of one click.",
       "takeaway": "Heading styles make the table possible; updating before you export keeps it honest."},
    ],
  },
  "checks": [{"explanation": "Word builds the table from paragraphs styled as Heading 1, 2, and 3. Without heading styles applied there is nothing for Word to find, and the inserted table comes back empty.",
    "rationales": [
      "A table of contents is built in the .docx. Exporting to PDF happens afterwards and is unrelated.",
      "Correct. Word scans for paragraphs carrying heading styles and builds an entry for each.",
      "Page breaks control pagination. They do not identify headings, and a table of contents works fine without them.",
      "Track Changes records edits. It plays no part in how Word locates headings.",
    ]}],
},
}

M8 = {
"using-word-online": {
  "objectives": [
    "Access Word Online and create or edit a document in a browser",
    "Explain which features the browser version lacks and why that matters",
    "Move a document between Word Online and the desktop app",
    "Decide which version to use for a given task",
  ],
  "opening": {
    "heading": "The browser version is a different tool, not a smaller one",
    "blocks": [
      {"type": "scenario",
       "role": "You are covering reception at Lakeside Medical Associates.",
       "text": "You need to fix a typo in a handout while working at a shared workstation that does not have Office installed. Word Online opens the file in a browser and the fix takes forty seconds. Later you try to run a mail merge in the same browser tab and find the command does not exist.",
       "task": "Know what the browser version does well and where you need the desktop app."},
      {"type": "paragraph",
       "text": "Word Online runs in any modern browser with no installation, which makes it genuinely useful on a shared or borrowed machine. It handles typing, basic formatting, comments, and real-time co-authoring well, and it saves continuously to OneDrive."},
      {"type": "table",
       "caption": "Where each version fits",
       "columns": ["Task", "Word Online", "Desktop"],
       "rows": [
         ["Quick edit on a borrowed machine", "Yes", "Requires installation"],
         ["Real-time co-authoring", "Yes", "Yes, for files in OneDrive or SharePoint"],
         ["Mail merge", "No", "Yes"],
         ["Advanced layout: sections, columns, precise object placement", "Limited", "Yes"],
         ["Macros and add-ins", "No", "Yes"],
         ["Working offline", "No", "Yes"],
       ]},
      {"type": "tip",
       "text": "Open in Desktop App, on the Word Online toolbar, hands the file to the installed application with your edits intact. Start in the browser for speed, switch when you hit a feature the browser does not have."},
    ],
  },
  "checks": [{"explanation": "Word Online runs entirely in a browser, so it works on any machine with internet access and no installed copy of Office. That accessibility is its central advantage; the trade-off is a smaller feature set.",
    "rationales": [
      "Macros and add-ins are desktop-only. The browser version does not run them.",
      "Correct. It runs in any modern browser with no installation, which is what makes it useful on a shared machine.",
      "The opposite is true: Word Online works from files stored in OneDrive, not on a local drive.",
      "The desktop app has the more advanced layout tools. The browser version is deliberately simpler.",
    ]}],
},

"co-authoring-in-word": {
  "objectives": [
    "Share a document for co-authoring and choose appropriate permissions",
    "Explain what co-authoring requires in order to work",
    "Work alongside others without overwriting their edits",
    "Manage and revoke sharing permissions",
  ],
  "opening": {
    "heading": "Two people, one document, no emailed versions",
    "blocks": [
      {"type": "scenario",
       "role": "You are revising the intake form with a nurse manager at Lakeside Medical Associates.",
       "text": "Emailing versions back and forth produces 'Intake Form v3 FINAL (JM edits) revised.docx' and a genuine question about which copy is current. Two of the three changes made on Tuesday are in a file nobody opens again.",
       "task": "Work in one shared document so there is only ever one current version."},
      {"type": "paragraph",
       "text": "Co-authoring lets several people edit the same document simultaneously. Each person's cursor is visible with their name, edits appear within seconds, and there is exactly one file — so the question of which version is current stops existing."},
      {"type": "paragraph",
       "text": "It has one hard requirement: the file must be stored in OneDrive or SharePoint. Co-authoring works by syncing changes through the cloud, so a document on a local drive or a USB stick cannot support it. This is the same requirement AutoSave has, for the same reason."},
      {"type": "callout", "variant": "warning",
       "text": "Sharing permissions outlive the task. A link shared for one afternoon's revision keeps working next year unless you revoke it. Review sharing periodically through Share > Manage Access, set an expiry date on links to anything sensitive, and grant Can view rather than Can edit unless the person genuinely needs to make changes."},
      {"type": "tip",
       "text": "AutoSave must be on for co-authoring to feel real-time. If it is off, or greyed out, the file is not in OneDrive or SharePoint — which is also the first thing to check when a colleague reports they cannot see your edits."},
    ],
  },
  "checks": [{"explanation": "Co-authoring syncs each person's changes through the cloud, so the file must live in OneDrive or SharePoint. A local file has no sync channel, which is also why AutoSave is unavailable for it.",
    "rationales": [
      "A USB drive offers no synchronization. Two people editing copies from it would simply create two divergent files.",
      "A local folder is not synced, so there is no mechanism for anyone else's changes to reach you.",
      "Correct. OneDrive or SharePoint provides the sync that co-authoring depends on.",
      "Emailing attachments creates separate copies for each recipient — exactly the version-conflict problem co-authoring solves.",
    ]}],
},

"smart-lookup-and-researcher": {
  "objectives": [
    "Use Smart Lookup for quick definitions and context",
    "Use Researcher to gather sources and insert citations",
    "Explain the difference in purpose between the two",
    "Evaluate whether a source is appropriate before citing it",
  ],
  "opening": {
    "heading": "Research tools do not evaluate sources for you",
    "blocks": [
      {"type": "scenario",
       "role": "You are drafting a patient education handout at Lakeside Medical Associates.",
       "text": "You need a clear definition of a clinical term and a citable source for a claim about screening intervals. Smart Lookup gives you the definition in seconds. Researcher returns twelve sources, of which perhaps four are appropriate for patient-facing health material.",
       "task": "Use both tools, and apply your own judgment to what they return."},
      {"type": "paragraph",
       "text": "Smart Lookup (right-click a word > Smart Lookup) opens a pane with definitions and web results for the selected text. It is for quick understanding while you write, without leaving the document."},
      {"type": "paragraph",
       "text": "Researcher (References > Researcher) is built for sourcing: it searches scholarly and reference material, lets you add content to your document, and creates a properly formatted citation and bibliography entry at the same time."},
      {"type": "callout", "variant": "warning",
       "text": "Neither tool judges whether a source is reliable or appropriate. For health information reaching patients, that judgment matters a great deal — prefer recognized clinical bodies and peer-reviewed sources, check the publication date, and have clinical staff review any claim about care before it is distributed. A citation makes a claim traceable; it does not make it correct."},
    ],
  },
  "checks": [{"explanation": "Smart Lookup is for quick understanding while writing — definitions and web context for a selected word. Researcher is for sourcing: it finds citable material and generates formatted citations and a bibliography.",
    "rationales": [
      "Both are desktop features. Availability is not the distinction between them.",
      "Correct. Smart Lookup gives quick definitions and context; Researcher supports deeper sourcing with citations.",
      "Neither searches your local files. Both query online sources.",
      "They serve genuinely different purposes — one for quick context, one for sourced research with citations.",
    ]}],
},

"dictation-and-voice": {
  "objectives": [
    "Start and stop dictation and dictate punctuation by voice",
    "Use voice commands for basic editing",
    "Change the dictation language",
    "Judge when dictation is appropriate given the setting and the content",
  ],
  "opening": {
    "heading": "Dictation is fast, and it is spoken out loud",
    "blocks": [
      {"type": "scenario",
       "role": "You are writing up notes at the front desk of Lakeside Medical Associates.",
       "text": "Dictation would let you produce the summary in a third of the time. The front desk is also within earshot of the waiting room, and the summary contains a patient's name and reason for visit.",
       "task": "Use dictation where it genuinely helps, and recognize where speaking aloud is the wrong choice."},
      {"type": "paragraph",
       "text": "Dictation (Home > Dictate) converts speech to text using cloud speech recognition, which means it requires an internet connection. Most people speak far faster than they type, so for long-form drafting it is a substantial gain — and for anyone for whom typing is painful or difficult, it is an accessibility tool rather than a convenience."},
      {"type": "paragraph",
       "text": "Punctuation is spoken: say 'period,' 'comma,' 'question mark,' 'new line,' 'new paragraph.' Speak at a natural pace in complete phrases — recognition accuracy is better on flowing speech than on isolated, over-enunciated words."},
      {"type": "callout", "variant": "warning",
       "text": "Two cautions in a clinical setting. First, dictation is audible: never dictate patient information anywhere it can be overheard, which rules out most reception areas. Second, speech recognition makes confident errors, and clinical terms and drug names are exactly where it errs most. Always read dictated text before saving or sending it."},
    ],
  },
  "checks": [{"explanation": "Punctuation is dictated as spoken commands — say 'period,' 'comma,' 'question mark,' 'new paragraph.' Word converts the spoken command into the mark rather than typing the word.",
    "rationales": [
      "This works, but it defeats the purpose of dictating hands-free and is not how the feature is designed to be used.",
      "Word does not infer punctuation from pauses. Speaking the mark is what inserts it.",
      "Correct. Saying 'period' inserts the punctuation mark rather than the word.",
      "The dictation toolbar has settings and a microphone control, but no punctuation button — punctuation is spoken.",
    ]}],
},

"accessibility-features": {
  "objectives": [
    "Run the Accessibility Checker and act on what it reports",
    "Write alt text that conveys the image's purpose",
    "Use heading styles to give a document a navigable structure",
    "Check color contrast and avoid color as the sole carrier of meaning",
  ],
  "opening": {
    "heading": "Accessibility is a requirement, not a courtesy",
    "blocks": [
      {"type": "scenario",
       "role": "You produce patient materials at Lakeside Medical Associates.",
       "text": "A patient with low vision requests the new patient handbook in a format their screen reader can use. You send the .docx. Their software reports 'image' fourteen times with no descriptions, finds no headings to navigate by, and reads a table as one continuous run of words. The document is technically delivered and practically unusable.",
       "task": "Build accessibility in as you write, rather than retrofitting it under time pressure."},
      {"type": "paragraph",
       "text": "For an organization providing healthcare services, this is also a legal matter. Section 504 of the Rehabilitation Act and the Americans with Disabilities Act require that people with disabilities have meaningful access to services and information. A document that cannot be read by assistive technology is a barrier to access."},
      {"type": "paragraph",
       "text": "Review > Check Accessibility scans the document and lists problems with explanations and one-click fixes. Running it before distribution takes under a minute and catches the great majority of issues."},
      {"type": "table",
       "caption": "The five checks that matter most",
       "columns": ["Check", "What to do", "Why"],
       "rows": [
         ["Alt text on images", "Describe purpose, not appearance", "Screen readers announce alt text in place of the image"],
         ["Real heading styles", "Use Heading 1-3, not bold body text", "Lets users jump between sections instead of reading linearly"],
         ["Table header rows", "Mark the header row in Table Layout", "Lets a screen reader announce which column a cell belongs to"],
         ["Meaningful link text", "'Download the intake form', not 'click here'", "Links are often read as a standalone list"],
         ["Color contrast", "At least 4.5:1 for body text", "Low-contrast text is unreadable for many, especially in print"],
       ]},
      {"type": "worked-example",
       "title": "Writing alt text that is actually useful",
       "task": "Describe a bar chart showing appointment volume by month in a patient handbook.",
       "steps": [
         {"move": "Ask what the image is doing in the document.",
          "why": "Alt text conveys purpose, not appearance. 'Bar chart with blue bars' describes pixels. The reader needs the information the chart carries, which is why the answer depends on why you put it there."},
         {"move": "State the finding: 'Bar chart showing appointment volume rising from 320 in January to 480 in June.'",
          "why": "A sighted reader takes the trend from the chart in a second. Alt text should deliver that same trend, not force the reader to reconstruct it from a description of the axes."},
         {"move": "For a complex figure, put the full data in a table nearby and keep the alt text short.",
          "why": "Alt text is announced as one unbroken run of speech, so it becomes unusable past a sentence or two. A real table beside the figure is navigable cell by cell — genuinely better than a long description."},
         {"move": "Mark purely decorative images as decorative.",
          "why": "A border flourish with alt text interrupts reading for no benefit. The Alt Text pane has a 'Mark as decorative' checkbox that tells screen readers to skip it — which is the accessible choice, not a shortcut."},
       ],
       "result": "Images that convey the same information to every reader, without padding the document with noise.",
       "takeaway": "Ask what the image tells a sighted reader, then write that. If it tells them nothing, mark it decorative."},
    ],
  },
  "checks": [{"explanation": "Alt text is the description a screen reader announces in place of an image, so a blind or low-vision reader receives the information the image carries. It should convey the image's purpose rather than describe its appearance.",
    "rationales": [
      "Captions are visible text added below an image with References > Insert Caption. Alt text is not printed and not visible on screen.",
      "Correct. Screen readers announce alt text in place of the image, so the information reaches readers who cannot see it.",
      "Compression is done with Picture Format > Compress Pictures. Alt text has no effect on file size.",
      "Position is controlled by layout and wrapping options. Alt text describes the image; it does not lock it.",
    ]}],
},
}

apply("lib/content/ms-office/word/module7Lessons.ts", M7)
apply("lib/content/ms-office/word/module8Lessons.ts", M8)
