import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

LESSONS = {
"getting-started": {
  "objectives": [
    "Name the Ribbon, Quick Access Toolbar, ruler, and status bar, and say what each one is for",
    "Use Tell Me to find a command you cannot locate on the Ribbon",
    "Switch between Print Layout, Read Mode, and Web Layout, and explain when each is useful",
    "Collapse and restore the Ribbon to gain screen space on a small laptop display",
  ],
  "opening": {
    "heading": "Why the interface is worth ten minutes",
    "blocks": [
      {"type": "scenario",
       "role": "You are a new administrative assistant at Lakeside Medical Associates.",
       "text": "Your supervisor forwards a referral letter and asks you to 'clean it up and add our letterhead before it goes out at four.' You open Word and face a screen with roughly two hundred commands. You know what the letter should look like. The only thing standing between you and finishing is knowing where things live.",
       "task": "Learn the map of the Word window well enough that you spend your time on the writing, not on the hunting."},
      {"type": "paragraph",
       "text": "Almost every Word command is organized by a single principle: the Ribbon groups commands by the kind of work you are doing, not by the menu someone filed them under. Home holds the things you change constantly — font, alignment, lists, styles. Insert holds things you add to a page — pictures, tables, page numbers. Layout holds things that affect the page itself — margins, orientation, columns. Once you know that logic, you can usually predict which tab a command is on before you look."},
      {"type": "paragraph",
       "text": "That prediction is the real skill. Memorizing button positions stops working the moment Microsoft moves one, and they do move. Understanding the organizing logic survives every update, and it transfers to Excel and PowerPoint, which use the same system."},
      {"type": "key-terms",
       "terms": [
         {"term": "Ribbon", "definition": "The tabbed command bar across the top. Tabs group commands by task; each tab is divided into labeled groups such as Font or Paragraph."},
         {"term": "Contextual tab", "definition": "A tab that appears only when it is relevant — click a picture and a Picture Format tab appears. If a command seems missing, you often just need to select the object it applies to."},
         {"term": "Quick Access Toolbar", "definition": "The small always-visible strip above or below the Ribbon. It holds the few commands you want regardless of which tab is open, and you choose what goes on it."},
         {"term": "Backstage view", "definition": "Everything behind the File tab. This is where you act on the file as a whole — open, save, print, share, inspect — rather than on the text inside it."},
         {"term": "Tell Me", "definition": "The search box on the Ribbon. Type what you want to do in plain words and it runs the command directly, without you needing to know its tab."},
       ]},
      {"type": "callout", "variant": "version",
       "text": "The screenshots in this lesson show Office 2019. In Microsoft 365 the Tell Me box is labeled with a magnifying glass and the word Search, and it sits in the title bar rather than on the Ribbon. It does the same job. Microsoft 365 also offers a Simplified Ribbon, a single condensed row you can toggle from the Ribbon Display Options — everything in this lesson still applies, the commands are just collapsed under a chevron.",},
    ],
  },
  "workedExample": {
    "heading": "Finding a command you have never used",
    "blocks": [
      {"type": "worked-example",
       "title": "Adding a non-breaking space without knowing where it lives",
       "task": "Your referral letter breaks the line between 'Dr.' and 'Okafor,' leaving the title stranded at the end of a line. You need a non-breaking space, which keeps two words together. You have no idea which tab that is on.",
       "steps": [
         {"move": "Predict the tab before searching.",
          "why": "A non-breaking space is a character you are adding to the page, so Insert is a reasonable first guess — it lives under Insert > Symbol > More Symbols > Special Characters. Making the prediction first is what builds the mental map, even when the guess is wrong."},
         {"move": "Use Tell Me rather than opening every tab.",
          "why": "Click Tell Me and type 'non-breaking space.' Word offers the command directly. Hunting tab by tab can take a minute; Tell Me takes five seconds, and it works for any command whose name you can approximately describe."},
         {"move": "Note where Tell Me found it.",
          "why": "This is the step most people skip. Tell Me runs the command but does not teach you the location. Afterwards, go look at Insert > Symbol so the next time you need a special character you go straight there. Tell Me is a shortcut, not a substitute for the map."},
         {"move": "Put it on the Quick Access Toolbar if you will repeat it.",
          "why": "Right-click any Ribbon command and choose Add to Quick Access Toolbar. For a task you do twenty times a day — like Save As or Print Preview — this removes two clicks each time. For something you do twice a year, leave it where it is; a cluttered toolbar is its own kind of slow."},
       ],
       "result": "The title and surname stay together on one line, and you now know both the shortcut for finding commands and the actual home of special characters.",
       "takeaway": "Predict the tab, use Tell Me when the prediction fails, then go learn where it actually lives. That loop turns two hundred commands into a map you can navigate."},
    ],
  },
  "checks": [
    {"explanation": "The Ribbon is Word's primary command surface, organized into tabs by the kind of work you are doing. The File tab is the exception — it opens Backstage view, which acts on the file as a whole rather than on the text inside it.",
     "rationales": [
       "The File tab opens Backstage view, which handles the document as a file — opening, saving, printing, sharing. It is not where you find formatting commands.",
       "The status bar along the bottom reports information — page count, word count, zoom level. It displays state; it does not format text.",
       "Correct. The Ribbon's tabs group formatting and editing commands by task: Home for text, Insert for objects, Layout for the page.",
       "The Quick Access Toolbar holds a handful of shortcuts you choose yourself. It is a convenience layer on top of the Ribbon, not the source of the commands.",
     ]},
  ],
},

"understanding-onedrive": {
  "objectives": [
    "Explain what OneDrive does and how it differs from saving to the C: drive",
    "Save a document to OneDrive and open it again from a different device",
    "Describe what AutoSave requires in order to work",
    "Judge when a clinical or personal document should not go into a personal OneDrive account",
  ],
  "opening": {
    "heading": "What OneDrive actually changes",
    "blocks": [
      {"type": "scenario",
       "role": "You are covering the front desk at Lakeside Medical Associates.",
       "text": "You spent Tuesday afternoon building a new patient intake packet on the front-desk computer. On Wednesday that machine will not boot, and IT says the drive is being replaced. Your supervisor asks for the packet. If you saved it to the desktop, it is gone. If you saved it to OneDrive, you open it on any other machine in the building and carry on.",
       "task": "Understand where your files physically live, so that a failed hard drive is an inconvenience rather than a lost week."},
      {"type": "paragraph",
       "text": "The single most useful idea here is the difference between local and cloud storage. A file saved to This PC lives on the physical drive inside that one computer. A file saved to OneDrive is uploaded to Microsoft's servers and synchronized back down to any device you sign in on. The document looks identical either way — the difference only becomes visible when the machine fails, when you need the file from home, or when a colleague needs to work on it with you."},
      {"type": "paragraph",
       "text": "OneDrive also unlocks two features that do not work on locally saved files at all. AutoSave, which writes your changes continuously instead of when you remember to press Ctrl+S, requires a file stored in OneDrive or SharePoint. So does real-time co-authoring, where two people edit the same document simultaneously. If AutoSave is greyed out, the reason is almost always that the file is saved locally."},
      {"type": "table",
       "caption": "Choosing where to save",
       "columns": ["Situation", "Save to", "Why"],
       "rows": [
         ["Draft you will finish on another machine", "OneDrive", "Follows you to any device you sign in on."],
         ["Document a colleague must edit with you", "OneDrive or SharePoint", "Co-authoring and AutoSave only work on cloud-stored files."],
         ["Anything containing patient information", "The practice's approved system only", "Protected health information belongs in systems your employer has assessed. Never a personal OneDrive."],
         ["Large video or scratch file", "Local drive", "Avoids consuming your sync quota and bandwidth for a file nobody else needs."],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "A personal OneDrive account is not an approved place for protected health information. At a real practice, patient data belongs only in systems your employer has vetted and covered under a business associate agreement. When you are unsure whether a document counts, ask your supervisor before saving it anywhere — that question is never the wrong thing to ask."},
    ],
  },
  "checks": [
    {"explanation": "OneDrive stores the file on Microsoft's servers rather than one physical machine, so you can sign in from any device and pick up where you left off. It is also what makes AutoSave and real-time co-authoring possible — both are unavailable for files saved locally.",
     "rationales": [
       "OneDrive is storage. It moves and syncs your file; it never changes the formatting inside it.",
       "Correct. The file lives on Microsoft's servers and syncs to any device you sign in on, which also survives a failed hard drive.",
       "Saving to OneDrive keeps the file in its original format. Creating a PDF is a separate step under File > Export.",
       "A OneDrive plan does come with storage space, but that is a billing detail, not the reason to use it. The point is access from anywhere, plus AutoSave and co-authoring.",
     ]},
  ],
},

"creating-and-opening-documents": {
  "objectives": [
    "Create a document from a blank page or from a template, and choose sensibly between them",
    "Reopen recent work and pin the files you return to daily",
    "Recognize Compatibility Mode and decide whether to convert the file",
    "Explain what converting a .doc file changes and who it might affect",
  ],
  "opening": {
    "heading": "Starting from the right place",
    "blocks": [
      {"type": "scenario",
       "role": "You are preparing correspondence at Lakeside Medical Associates.",
       "text": "You need to send fourteen referral letters this week. The first time, you build one from a blank page: margins, letterhead, address block, closing. It takes twenty minutes. If you start the next thirteen from blank pages too, you will spend four hours and produce fourteen letters that do not quite match each other.",
       "task": "Learn when to start from blank, when to start from a template, and how to stop re-solving a problem you already solved."},
      {"type": "paragraph",
       "text": "A blank document is the right choice when the format is genuinely new or so simple that setup costs nothing. A template is the right choice the second time you produce the same kind of document. Templates carry margins, fonts, styles, and boilerplate, which means every letter that leaves the practice looks like it came from the same organization — and consistency is most of what 'professional' means in document design."},
      {"type": "paragraph",
       "text": "Compatibility Mode is the other thing to understand here. When you open a .doc file created in Word 2003 or earlier, Word disables features that old format cannot store, and the title bar says Compatibility Mode. Your document is not broken; Word is protecting the file so it still opens correctly for whoever sent it. Converting unlocks modern features but produces a file that older Word versions may render differently — so convert when the file is yours going forward, and leave it alone when you are editing something you must hand back."},
      {"type": "key-terms",
       "terms": [
         {"term": "Template (.dotx)", "definition": "A reusable starting point. Opening one creates a new copy and leaves the original untouched, so you cannot accidentally overwrite your master."},
         {"term": "Compatibility Mode", "definition": "A restricted mode Word enters for pre-2007 file formats, disabling features the old format cannot represent."},
         {"term": "Pinning", "definition": "Fixing a file to the top of the Recent list so it stays there permanently instead of scrolling off as you open other documents."},
       ]},
    ],
  },
  "checks": [
    {"explanation": "The Recent list on the Word start screen and under File > Open shows the documents you worked on most recently. For a file you return to constantly, pin it so it stays at the top instead of scrolling off as other documents push it down.",
     "rationales": [
       "The New tab is where you start something that does not exist yet, from a blank page or a template.",
       "Correct. The Recent list holds recently opened documents, and pinning keeps the important ones permanently at the top.",
       "The template gallery offers starting points for new documents. It does not track files you have already worked on.",
       "Browse opens a file picker for navigating the folder structure. It works, but it is the slow path when the file is one you opened yesterday.",
     ]},
  ],
},

"saving-and-sharing-documents": {
  "objectives": [
    "Distinguish Save from Save As and predict which one overwrites your original",
    "Choose a file format that matches how the document will be used",
    "Set AutoRecover to an interval that matches how much work you can afford to lose",
    "Share a document by link and choose an appropriate permission level",
  ],
  "opening": {
    "heading": "Saving is a decision, not a reflex",
    "blocks": [
      {"type": "scenario",
       "role": "You handle outgoing correspondence at Lakeside Medical Associates.",
       "text": "Your supervisor asks you to adapt last month's insurance appeal letter for a new patient. You open it, replace the names and dates, and press Ctrl+S. You have just destroyed the original letter — the one the practice may need if the first appeal is questioned. The keystroke was automatic. The decision behind it was never made.",
       "task": "Build the habit of asking one question before saving: am I updating this file, or creating a new one from it?"},
      {"type": "paragraph",
       "text": "Save writes your changes back into the file you opened, replacing what was there. Save As creates a new file and leaves the original as it was. Whenever you open an existing document as the starting point for a new one, Save As is the first thing you do — before you type a single change, not after. Doing it first means a reflexive Ctrl+S later lands on the new file instead of the old one."},
      {"type": "paragraph",
       "text": "Format is the second decision. A .docx is the working format: editable, and what you keep for yourself. A PDF is the delivery format: it locks layout and fonts so the document looks the same on the recipient's machine, and it signals that the content is final. Send the PDF, keep the .docx. If you send the .docx, you have handed over an editable copy of your practice's letterhead."},
      {"type": "table",
       "caption": "Format by purpose",
       "columns": ["Format", "Use it when", "Watch out for"],
       "rows": [
         [".docx", "The document is still being written or someone must edit it", "Recipients can change it, including your letterhead"],
         [".pdf", "Sending a final document outside the practice", "Editing means going back to the .docx and re-exporting"],
         [".dotx", "You will produce this same kind of document repeatedly", "Opening it creates a copy — edit the template itself through File > Open"],
         [".txt", "You need raw text with no formatting at all", "Every font, image, and table is discarded"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Sharing a document by link is faster than emailing an attachment, but a link carries permissions. 'Anyone with the link' means exactly that — forwarded, it works for whoever receives it. For anything sensitive, restrict the link to specific people, and choose Can view rather than Can edit unless the recipient genuinely needs to make changes."},
    ],
  },
  "workedExample": {
    "heading": "Reusing a letter without destroying it",
    "blocks": [
      {"type": "worked-example",
       "title": "Adapting an existing letter safely",
       "task": "Turn last month's insurance appeal letter into this month's, keeping the original intact and sending the new one in a format the insurer cannot alter.",
       "steps": [
         {"move": "Open the original, then immediately File > Save As with a new name.",
          "why": "Before editing, not after. Once the new file is the active document, every later Ctrl+S — including the automatic one you press without thinking — writes to the copy. Editing first and renaming afterwards leaves a window where one reflex overwrites the original."},
         {"move": "Name it so a stranger could identify it: 'Appeal Letter - Ramirez - 2026-09.docx'.",
          "why": "Include the subject, the identifier, and the date in year-month order. Year-first dates sort chronologically in any file list, which 09-2026 does not. 'Letter2 final FINAL.docx' is the file nobody can find in March."},
         {"move": "Edit the content, then check for anything left from the source document.",
          "why": "Reused letters are where the wrong patient name reaches an insurer. Read the whole letter, not just the parts you changed — Ctrl+F for last month's surname is a fast way to catch a reference you missed in a paragraph you did not touch."},
         {"move": "File > Export > Create PDF/XPS to produce the version you send.",
          "why": "The PDF locks layout and fonts so the insurer sees exactly what you laid out, and it cannot be edited casually. You keep the .docx for your own records and for the next appeal."},
       ],
       "result": "Two files: the original letter untouched, and a new correctly named .docx plus the PDF you actually send.",
       "takeaway": "Save As before you edit, name for retrieval, and send the format that matches the purpose. The habit costs ten seconds and prevents the errors that are hardest to walk back."},
    ],
  },
  "checks": [
    {"explanation": "PDF preserves layout and fonts exactly as you designed them and is not casually editable, which is why it is the standard for final documents sent outside an organization. Keep the .docx for yourself so you can revise and re-export later.",
     "rationales": [
       "The legacy .doc format is editable and drops features Word has added since 2003. It solves a compatibility problem, not an editing-control one.",
       "Plain text discards all formatting — fonts, spacing, images, letterhead. The recipient would receive unformatted characters.",
       "Correct. PDF locks the layout so it renders identically everywhere, and signals the document is final rather than a working draft.",
       "RTF preserves basic formatting but remains fully editable, so it does not address the concern about others changing the document.",
     ]},
  ],
},
}

apply("lib/content/ms-office/word/module1Lessons.ts", LESSONS)
