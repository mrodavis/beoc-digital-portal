import { Lesson } from "@/types/lesson";

export const wordModule8Lessons: Lesson[] = [

/* ============================================================
LESSON 1 – USING WORD FOR THE WEB (slug kept from "Word Online")
============================================================ */

{
  slug: "using-word-online",
  title: "Using Word for the Web",
  description:
    "Learn how to open and use Word for the web (formerly Word Online) in a browser, edit documents in the cloud, and understand how it differs from the Word desktop app.",
  objectives: [
    "Open Word for the web and create or edit a document in a browser",
    "Explain which features the browser version lacks and why that matters",
    "Move a document between Word for the web and the desktop app",
    "Decide which version to use for a given task",
  ],
  duration: "8 min",
  videoUrl: "https://www.youtube.com/embed/67QLky2P5CU",

  sections: [

    {
       heading: "The browser version is a different tool, not a smaller one",
       blocks: [
         {
           type: "scenario",
           role: "You are covering reception at Lakeside Medical Associates.",
           text: "You need to fix a typo in a handout while working at a shared workstation that does not have Office installed. Word for the web opens the file in a browser and the fix takes forty seconds. Later you try to run a mail merge in the same browser tab and find the command does not exist.",
           task: "Know what the browser version does well and where you need the desktop app.",
         },
         {
           type: "paragraph",
           text: "Word for the web runs in any modern browser with no installation, which makes it genuinely useful on a shared or borrowed machine. It handles typing, basic formatting, comments, and real-time co-authoring well, and it saves continuously to OneDrive.",
         },
         {
           type: "table",
           caption: "Where each version fits",
           columns: [
             "Task",
             "Word for the web",
             "Desktop",
           ],
           rows: [
             [
               "Quick edit on a borrowed machine",
               "Yes",
               "Requires installation",
             ],
             [
               "Real-time co-authoring",
               "Yes",
               "Yes, for files in OneDrive or SharePoint",
             ],
             [
               "Mail merge",
               "No",
               "Yes",
             ],
             [
               "Advanced layout: sections, columns, precise object placement",
               "Limited",
               "Yes",
             ],
             [
               "Macros and add-ins",
               "No",
               "Yes",
             ],
             [
               "Working offline",
               "No",
               "Yes",
             ],
           ],
         },
         {
           type: "tip",
           text: "Open in Desktop App hands the file from the browser to the installed Word application with your edits intact. Start in the browser for speed, and switch when you hit a feature the browser does not have.",
         },
       ],
     },

    {
      heading: "What Is Word for the Web?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word for the web (formerly called Word Online) is a free browser-based version of Microsoft Word that you use with a Microsoft account. It lets you create, view, and edit Word documents from any device with a browser, with no software to install.",
        },
      ],
    },

    {
      heading: "Opening Word for the Web",
      blocks: [
        {
          type: "paragraph",
          text:
            "In a browser, go to m365.cloud.microsoft and sign in with your school, work, or personal Microsoft account. The older addresses office.com and microsoft365.com still take you there. Microsoft now calls this start page the Microsoft Copilot app (it was the Microsoft 365 app), so the name at the top may differ from the picture. Choose Word to start or open a document. A .docx file stored in OneDrive also opens in Word for the web when you open it from OneDrive in your browser.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_office_home.png",
          alt: "Microsoft 365 start page in a browser with the Word app in the left navigation",
          caption: "The start page after you sign in. Its name has changed over time, but Word is listed with the other apps.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_interface.png",
          alt: "Word for the web editing a document in a browser",
        },
      ],
    },

    {
      heading: "Creating a New Document",
      blocks: [
        {
          type: "paragraph",
          text:
            "Start a new blank document from the Word start page. Files you create in Word for the web are saved to OneDrive automatically as you work.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_new_document.png",
          alt: "Blank document option on the Word for the web start page",
        },
      ],
    },

    {
      heading: "Editing Mode vs. Reading View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word for the web opens documents for editing by default. Click View → Reading View to switch to a clean, non-editable layout. Switch back to editing to make changes.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_reading_view.png",
          alt: "Reading View in Word for the web",
        },
      ],
    },

    {
      heading: "Opening in the Desktop App",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you need a feature that Word for the web does not have, choose Open in Desktop App. The file opens in the Word desktop application, and because it stays in OneDrive, your changes keep saving to the same file.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_open_desktop.png",
          alt: "Open in Desktop App command in Word for the web",
        },
      ],
    },

    {
      heading: "Key Differences from the Desktop App",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word for the web covers the most common tasks but lacks some advanced desktop features, including macros, certain advanced layout tools, and some reference and mail merge functions. For everyday writing and editing, it works well.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_ribbon_comparison.png",
          alt: "Simplified Word for the web ribbon compared to the desktop ribbon",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is one key advantage of Word for the web over the desktop app?",
          options: [
            "It supports macros and advanced automation features",
            "It can be accessed from any device with a browser without installing software",
            "It stores files locally on your hard drive instead of the cloud",
            "It offers more advanced layout tools than the desktop version",
          ],
          correctIndex: 1,
          explanation: "Word for the web runs entirely in a browser, so it works on any machine with internet access and no installed copy of Office. That accessibility is its central advantage; the trade-off is a smaller feature set.",
          optionRationales: [
            "Macros and add-ins are desktop-only. The browser version does not run them.",
            "Correct. It runs in any modern browser with no installation, which is what makes it useful on a shared machine.",
            "The opposite is true: Word for the web works from files stored in OneDrive, not on a local drive.",
            "The desktop app has the more advanced layout tools. The browser version is deliberately simpler.",
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
        "Go to m365.cloud.microsoft (office.com also takes you there) and sign in with your Microsoft account.",
        "Open Word and create a new blank document.",
        "Type a short paragraph and add a heading using the Heading 1 style.",
        "Switch to Reading View and then back to Editing view.",
        "Open the document in the desktop app with Open in Desktop App.",
      ],
    },
  ],
},

/* ============================================================
LESSON 2 – CO-AUTHORING IN WORD
============================================================ */

{
  slug: "co-authoring-in-word",
  title: "Co-Authoring in Word",
  description:
    "Learn how to share a Word document and collaborate with others in real time using Microsoft 365 co-authoring features.",
  objectives: [
    "Share a document for co-authoring and choose appropriate permissions",
    "Explain what co-authoring requires in order to work",
    "Work alongside others without overwriting their edits",
    "Manage and revoke sharing permissions",
  ],
  duration: "9 min",
  videoUrl: "https://www.youtube.com/embed/bAhKW18VaoQ",

  sections: [

    {
       heading: "Two people, one document, no emailed versions",
       blocks: [
         {
           type: "scenario",
           role: "You are revising the intake form with a nurse manager at Lakeside Medical Associates.",
           text: "Emailing versions back and forth produces 'Intake Form v3 FINAL (JM edits) revised.docx' and a genuine question about which copy is current. Two of the three changes made on Tuesday are in a file nobody opens again.",
           task: "Work in one shared document so there is only ever one current version.",
         },
         {
           type: "paragraph",
           text: "Co-authoring lets several people edit the same document simultaneously. Each person's cursor is visible with their name, edits appear within seconds, and there is exactly one file — so the question of which version is current stops existing.",
         },
         {
           type: "paragraph",
           text: "It has one hard requirement: the file must be stored in OneDrive or SharePoint. Co-authoring works by syncing changes through the cloud, so a document on a local drive or a USB stick cannot support it. This is the same requirement AutoSave has, for the same reason.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Sharing permissions outlive the task. A link shared for one afternoon's revision keeps working next year unless you revoke it. Review sharing periodically through Share > Manage Access, set an expiry date on links to anything sensitive, and grant Can view rather than Can edit unless the person genuinely needs to make changes.",
         },
         {
           type: "tip",
           text: "AutoSave must be on for co-authoring to feel real-time. If it is off, or greyed out, the file is not in OneDrive or SharePoint — which is also the first thing to check when a colleague reports they cannot see your edits.",
         },
       ],
     },

    {
      heading: "What Is Co-Authoring?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Co-authoring lets multiple people edit the same Word document at the same time. Changes from each author appear in real time without requiring anyone to check the file in or out.",
        },
      ],
    },

    {
      heading: "Sharing a Document for Co-Authoring",
      blocks: [
        {
          type: "paragraph",
          text:
            "The document must be saved to OneDrive or SharePoint to enable co-authoring. Click Share in the top-right corner, enter the email addresses of your collaborators, choose their permission level (Can edit or Can view), and select Share or Send.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_share_button.png",
          alt: "Share button in the top-right corner of Word",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_share_dialog.png",
          alt: "Share document dialog with email entry",
        },
      ],
    },

    {
      heading: "Seeing Other Authors in Real Time",
      blocks: [
        {
          type: "paragraph",
          text:
            "When another person is editing the document, their cursor and a colored flag with their name appear in the document. Each co-author is assigned a unique color so you can see exactly where they are working.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_presence_flag.png",
          alt: "Author presence flag showing another user's location",
        },
      ],
    },

    {
      heading: "Viewing Who Has the File Open",
      blocks: [
        {
          type: "paragraph",
          text:
            "Profile pictures or initials appear in the top-right corner for everyone currently in the document. Click an icon to see the person's name and jump to where they are editing.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_author_icons.png",
          alt: "Co-author icons in the top right corner of Word",
        },
      ],
    },

    {
      heading: "AutoSave and Co-Authoring",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a file is stored on OneDrive, AutoSave turns on automatically and saves your changes every few seconds. This ensures other co-authors always see the most recent version of the document.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_autosave_toggle.png",
          alt: "AutoSave toggle turned on in Word",
        },
      ],
    },

    {
      heading: "Managing Sharing Permissions",
      blocks: [
        {
          type: "paragraph",
          text:
            "To change or remove someone's access, click Share → Manage Access. From here you can change a collaborator's permission to Can view or remove their access entirely.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_manage_access.png",
          alt: "Manage Access panel showing collaborator permissions",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Where does a Word document need to be saved to enable co-authoring?",
          options: [
            "On a USB flash drive shared between users",
            "In a local folder on your desktop",
            "On OneDrive or SharePoint",
            "Emailed as an attachment to all collaborators",
          ],
          correctIndex: 2,
          explanation: "Co-authoring syncs each person's changes through the cloud, so the file must live in OneDrive or SharePoint. A local file has no sync channel, which is also why AutoSave is unavailable for it.",
          optionRationales: [
            "A USB drive offers no synchronization. Two people editing copies from it would simply create two divergent files.",
            "A local folder is not synced, so there is no mechanism for anyone else's changes to reach you.",
            "Correct. OneDrive or SharePoint provides the sync that co-authoring depends on.",
            "Emailing attachments creates separate copies for each recipient — exactly the version-conflict problem co-authoring solves.",
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
        "Save a document to OneDrive and confirm AutoSave is on.",
        "Click Share and invite a classmate or colleague with Edit permissions.",
        "Ask them to open the document and make a change — observe their cursor flag.",
        "Locate their author icon in the top-right corner and click it to jump to their position.",
        "Open Manage Access and change their permission to Can view.",
      ],
    },
  ],
},

/* ============================================================
LESSON 3 – RESEARCHING AND CITING SOURCES
(slug kept from the retired Smart Lookup & Researcher lesson so links and progress still work)
============================================================ */

{
  slug: "smart-lookup-and-researcher",
  title: "Researching & Citing Sources",
  description:
    "Find and judge sources for a document, then record them with Word's References tools: citation style, Insert Citation, Source Manager, and a bibliography. Use the Thesaurus to choose words carefully.",
  objectives: [
    "Judge whether a source is reliable enough to use before you cite it",
    "Set a citation style and insert citations with References > Insert Citation",
    "Reuse sources from earlier documents with Manage Sources (Source Manager)",
    "Insert a bibliography and update it after you add sources",
    "Replace a word with a synonym using the Thesaurus",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/QrqpTWivIhc",
  slides: [
    { src: "/images/word/citations/slide-01.jpg", alt: "Researching and citing sources in Word: find sources in a browser, judge them, and cite them with the References tab" },
    { src: "/images/word/citations/slide-02.jpg", alt: "What changed: Smart Lookup and Researcher were retired in January 2025; use a web browser to find sources and the References tab to cite them" },
    { src: "/images/word/citations/slide-03.jpg", alt: "Four questions to ask about any source: who published it, when, what evidence it gives, and why it exists" },
    { src: "/images/word/citations/slide-04.jpg", alt: "Citing in Word: choose a style, Insert Citation, Manage Sources, then insert and update the bibliography" },
    { src: "/images/word/citations/slide-05.jpg", alt: "Knowledge check: where to find sources now, and what Update Citations and Bibliography does" },
  ],

  sections: [

    {
       heading: "Finding sources is your job; formatting them is Word's",
       blocks: [
         {
           type: "scenario",
           role: "You are drafting a patient education handout at Lakeside Medical Associates.",
           text: "The handout says that a reading of 130/80 or higher is considered high blood pressure for most adults, and that home readings can be more reliable than a single office reading. Your supervisor asks where each claim came from. A browser search returns dozens of pages, and they range from a medical journal to a blog selling supplements.",
           task: "Choose sources you can defend, then cite them so every claim in the handout can be traced.",
         },
         {
           type: "paragraph",
           text: "Research and citation are two separate jobs. Finding a source and deciding whether to trust it happens in your web browser and in your own judgment. Recording the source and formatting the citation happens in Word, on the References tab, where Word builds each in-text citation and the bibliography in the style you choose.",
         },
         {
           type: "callout",
           variant: "version",
           text: "Older guides show two research panes inside Word: Smart Lookup (right-click a word > Search) and Researcher (References > Researcher). Microsoft retired both. Smart Lookup was retired starting January 1, 2025, and Researcher was removed from Word for Windows and Mac between late December 2024 and January 2025. If an older computer still shows them, do not rely on them. Search for sources in a web browser instead, and cite them with the References tab as this lesson shows.",
         },
         {
           type: "key-terms",
           terms: [
             { term: "Citation", definition: "A short reference in the text, such as (Alvarez, 2024), that points the reader to a full entry in the bibliography." },
             { term: "Bibliography", definition: "The list of every source cited, at the end of the document. APA calls it References; MLA calls it Works Cited." },
             { term: "Citation style", definition: "A set of formatting rules (APA, MLA, Chicago and others). Use the style your instructor or employer asks for." },
             { term: "Source Manager", definition: "The Manage Sources dialog. Its Master List holds sources from your earlier documents; its Current List holds the sources in this document." },
           ],
         },
       ],
     },

    {
      heading: "Judging a source before you use it",
      blocks: [
        {
          type: "paragraph",
          text: "A citation makes a claim traceable; it does not make it correct. Before a source goes into a document, ask four questions about it. A source that fails any of them needs a second look, and for health information that patients will rely on, the bar is high.",
        },
        {
          type: "table",
          caption: "Four questions for any source",
          columns: ["Question", "Look for", "Warning signs"],
          rows: [
            ["Who published it?", "A named author or organization with relevant expertise: a medical school, a government health agency, a peer-reviewed journal", "No author or organization, or a seller of the product being discussed"],
            ["When?", "A publication or review date recent enough for the topic", "No date, or guidance old enough to have been replaced"],
            ["What is the evidence?", "References to studies or data, and claims that match other reliable sources", "Promises of a cure, \"one simple trick,\" or claims nobody else makes"],
            ["Why does it exist?", "To inform or educate", "To sell, persuade, or collect your information"],
          ],
        },
        {
          type: "worked-example",
          title: "Choosing between three search results",
          task: "Find a source for the sentence about home blood pressure readings in the handout.",
          steps: [
            {
              move: "Open each result and find the publisher and the date before you read the content.",
              why: "Who wrote something and when tells you how much weight it can carry. Reading first and checking later makes it easy to talk yourself into a source because it says what you hoped.",
            },
            {
              move: "Keep the journal article: a named author, a 2024 review in a health journal, with references to studies.",
              why: "It passes all four questions. A review article summarizes many studies, which is exactly the kind of support a general claim needs.",
            },
            {
              move: "Skip the blog post promising to cure high blood pressure in seven days.",
              why: "It fails on evidence and purpose: it sells a product and makes a claim no clinical source supports. Citing it would make the whole handout look careless.",
            },
            {
              move: "Write down what Word will need: author, title, year, and the website or journal name.",
              why: "These are the fields of Word's Create Source dialog. Capturing them while the page is open saves a second search later.",
            },
          ],
          result: "One defensible source per claim, with the details Word needs already in hand.",
          takeaway: "Check who and when before what. Then have clinical staff review any claim about care before the handout goes to patients.",
        },
        {
          type: "callout",
          variant: "info",
          text: "If your school or employer's Microsoft 365 account includes Copilot, a Copilot button appears in the corner of your Word document. Copilot in Word can summarize a long document you have open or answer questions about it, which can speed up reading a source. It works within Word and your Microsoft 365 content, so it does not replace searching for sources, and its answers still need checking: confirm every fact in the original source and cite that source. If you do not see Copilot, your account does not include it or your organization has not turned it on. Never paste patient information into an AI tool your employer has not approved for it.",
        },
      ],
    },

    {
      heading: "Choosing a citation style",
      blocks: [
        {
          type: "paragraph",
          text: "Choose the style before you insert citations so they all come out in the same format. On the References tab, in the Citations & Bibliography group, select the arrow next to Style and pick the style you need, such as APA or MLA.",
        },
        {
          type: "image",
          src: "/images/word/citations/citations_style_menu.png",
          alt: "References tab with the Style menu open in the Citations & Bibliography group and APA highlighted",
          caption: "References > Citations & Bibliography > Style.",
        },
      ],
    },

    {
      heading: "Inserting a citation",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Click at the end of the sentence or phrase you want to cite.",
            "On the References tab, select Insert Citation > Add New Source.",
            "In the Create Source dialog, choose the Type of Source (for example, Web site or Journal Article) and fill in the author, title, year and the other fields. Select Show All Bibliography Fields if you need more.",
            "Select OK. Word inserts the citation at the cursor and saves the source in the document.",
          ],
        },
        {
          type: "image",
          src: "/images/word/citations/citations_create_source.png",
          alt: "Create Source dialog filled in for a Web site source by Northshore Heart Health Council, 2025",
          caption: "Insert Citation > Add New Source opens the Create Source dialog.",
        },
        {
          type: "paragraph",
          text: "To cite a source that is already in the document, click where the citation goes, select Insert Citation, and choose the source from the list at the top of the menu. If you do not have a source's details yet, choose Add New Placeholder and fill it in later.",
        },
        {
          type: "image",
          src: "/images/word/citations/citations_insert_menu.png",
          alt: "Insert Citation menu listing the document's sources above Add New Source and Add New Placeholder",
          caption: "Sources already in the document appear at the top of the Insert Citation menu.",
        },
      ],
    },

    {
      heading: "Managing sources",
      blocks: [
        {
          type: "paragraph",
          text: "Select References > Manage Sources to open Source Manager. The Master List holds sources you created in earlier documents, and the Current List holds the sources in this document. Select a source in the Master List and choose Copy to bring it into this document; it then appears under Insert Citation. Use Edit to correct a source's details and Delete to remove one you no longer need.",
        },
        {
          type: "image",
          src: "/images/word/citations/citations_source_manager.png",
          alt: "Source Manager with a journal article selected in the Master List",
          caption: "Manage Sources: copy a source from the Master List into this document.",
        },
        {
          type: "tip",
          text: "The Master List remembers every source you have created, including weak ones. Reuse a source only after asking the same four questions you would ask about a new one.",
        },
      ],
    },

    {
      heading: "Adding the bibliography",
      blocks: [
        {
          type: "paragraph",
          text: "Click where the list of sources belongs, usually on its own page at the end. Select References > Bibliography and choose a built-in format, such as References for APA or Works Cited for MLA. Word lists every source in the document in the current style.",
        },
        {
          type: "image",
          src: "/images/word/citations/citations_bibliography.png",
          alt: "A References list at the end of the handout with two entries in APA style",
          caption: "References > Bibliography inserts the list in the current style.",
        },
        {
          type: "paragraph",
          text: "The bibliography does not change by itself. After you cite a new source, click anywhere in the bibliography and select Update Citations and Bibliography.",
        },
      ],
    },

    {
      heading: "Using the Thesaurus",
      blocks: [
        {
          type: "paragraph",
          text: "To vary a word you have used too often, right-click it and choose Synonyms for a quick list, or click the word and select Review > Thesaurus to open the Thesaurus pane. Point to a result, select the arrow, and choose Insert to replace your word.",
        },
        {
          type: "image",
          src: "/images/word/citations/thesaurus_pane.png",
          alt: "Thesaurus pane listing synonyms for the word regular, with an Insert button beside each",
          caption: "Review > Thesaurus.",
        },
        {
          type: "callout",
          variant: "warning",
          text: "Two cautions. In health writing a synonym can change the meaning: \"chronic\" and \"long-lasting\" are close, but \"hypertension\" and \"stress\" are not, so check each replacement. And swapping a source's words for synonyms is not paraphrasing. Quote a source's exact words in quotation marks, or restate the idea fully in your own words, and cite it either way.",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Smart Lookup and Researcher are gone from Word. Where do you find sources for a document now?",
          options: [
            "References > Researcher, after signing in again",
            "In a web browser, judging each source before you use it",
            "Right-click a word > Search",
            "References > Bibliography, which searches the web for sources",
          ],
          correctIndex: 1,
          explanation: "Microsoft retired Smart Lookup and Researcher in January 2025. You search in a browser and decide which sources are reliable; Word's References tab then records and formats the citations.",
          optionRationales: [
            "Researcher was removed from Word for Windows and Mac. Signing in again does not bring it back.",
            "Correct. Finding and judging sources happens in the browser and in your judgment; Word formats the citations.",
            "Right-click > Search was Smart Lookup, which was retired starting January 1, 2025.",
            "Bibliography lists the sources already in your document. It does not search for new ones.",
          ],
        },
        {
          type: "knowledge-check",
          question: "You cite a new source after inserting the bibliography. What do you do so the new source appears in it?",
          options: [
            "Delete the bibliography and type the new entry by hand",
            "Nothing; the bibliography updates as you type",
            "Click in the bibliography and select Update Citations and Bibliography",
            "Change the citation style and change it back",
          ],
          correctIndex: 2,
          explanation: "A bibliography is built from the sources in the document when you insert it. After you add a source, update it so the list matches what you cite.",
          optionRationales: [
            "Typing entries by hand loses the automatic formatting and drifts out of step with your citations.",
            "The bibliography does not update itself. Until you update it, a new source is missing from the list.",
            "Correct. Update Citations and Bibliography rebuilds the list from every source in the document.",
            "Switching styles does not add anything to the list. Update Citations and Bibliography is the step that rebuilds it.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Use a short document you are writing for a class or for work, or the practice simulation's handout.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "In a web browser, find two sources for claims in your document. For each one, write one sentence answering the four questions: who published it, when, what evidence it gives, and why it exists.",
        "Set the citation style your instructor asks for (APA if none is given).",
        "Cite the first source with Insert Citation > Add New Source.",
        "Cite the second source the same way, then cite the first source again in a different sentence by choosing it from the Insert Citation list.",
        "Insert a bibliography at the end of the document.",
        "Use the Thesaurus to replace one overused word, and check that the meaning did not change.",
        "Submit the document and your source notes to your instructor or course folder.",
      ],
    },
  ],
},

/* ============================================================
LESSON 4 – DICTATION & VOICE FEATURES
============================================================ */

{
  slug: "dictation-and-voice",
  title: "Dictation & Voice Features",
  description:
    "Use Word's Dictation feature to type hands-free using your voice, and learn how to use voice commands to edit, format, and punctuate as you speak.",
  objectives: [
    "Start and stop dictation and dictate punctuation by voice",
    "Use voice commands for basic editing",
    "Change the dictation language",
    "Judge when dictation is appropriate given the setting and the content",
  ],
  duration: "7 min",
  videoUrl: "https://www.youtube.com/embed/bTTuOBdblSg",

  sections: [

    {
       heading: "Dictation is fast, and it is spoken out loud",
       blocks: [
         {
           type: "scenario",
           role: "You are writing up notes at the front desk of Lakeside Medical Associates.",
           text: "Dictation would let you produce the summary in a third of the time. The front desk is also within earshot of the waiting room, and the summary contains a patient's name and reason for visit.",
           task: "Use dictation where it genuinely helps, and recognize where speaking aloud is the wrong choice.",
         },
         {
           type: "paragraph",
           text: "Dictation (Home > Dictate) converts speech to text using cloud speech recognition, which means it requires an internet connection. Most people speak far faster than they type, so for long-form drafting it is a substantial gain — and for anyone for whom typing is painful or difficult, it is an accessibility tool rather than a convenience.",
         },
         {
           type: "paragraph",
           text: "Punctuation is spoken: say 'period,' 'comma,' 'question mark,' 'new line,' 'new paragraph.' Speak at a natural pace in complete phrases — recognition accuracy is better on flowing speech than on isolated, over-enunciated words.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Two cautions in a clinical setting. First, dictation is audible: never dictate patient information anywhere it can be overheard, which rules out most reception areas. Second, speech recognition makes confident errors, and clinical terms and drug names are exactly where it errs most. Always read dictated text before saving or sending it.",
         },
       ],
     },

    {
      heading: "What Is Dictation?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Dictation converts your spoken words into typed text in Word. It works with a microphone connected to your computer and uses Microsoft's speech recognition service. Dictation is available in both the desktop app and Word for the web.",
        },
      ],
    },

    {
      heading: "Starting Dictation",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside your document where you want to start typing, then go to Home → Dictate. The microphone icon turns red and a listening indicator appears. Speak clearly and Word types your words in real time.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_home_tab_button.png",
          alt: "Dictate button on the Home tab",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_listening_indicator.png",
          alt: "Red microphone icon showing Dictation is active",
        },
      ],
    },

    {
      heading: "Adding Punctuation by Voice",
      blocks: [
        {
          type: "paragraph",
          text:
            "Speak punctuation marks aloud as you dictate. For example, say 'comma', 'period', 'question mark', or 'new paragraph' and Word will insert them automatically.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_punctuation_example.png",
          alt: "Example of punctuation inserted by voice",
        },
      ],
    },

    {
      heading: "Voice Commands for Editing",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can use voice commands to make edits while dictating. Say 'delete' followed by a word or phrase to remove it, 'undo' to undo the last action, or 'select' followed by a word or phrase to select that text for formatting.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_voice_commands.png",
          alt: "List of supported voice commands in Dictation",
        },
      ],
    },

    {
      heading: "Changing Dictation Language",
      blocks: [
        {
          type: "paragraph",
          text:
            "Open the dictation settings (the gear icon on the dictation toolbar) and choose a language under Spoken Language. Word supports dozens of languages and regional accents for dictation.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_language_menu.png",
          alt: "Dictation language dropdown menu",
        },
      ],
    },

    {
      heading: "Stopping Dictation",
      blocks: [
        {
          type: "paragraph",
          text:
            "To stop, select Dictate again or close the dictation toolbar. You can also say \"stop dictation\". The microphone icon turns back to its normal color.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_stop.png",
          alt: "Dictate button deactivated after stopping",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "How do you insert a period (full stop) when using Dictation in Word?",
          options: [
            "Press the period key on your keyboard",
            "Pause for two seconds and Word adds the period automatically",
            "Say the word 'period' while dictating",
            "Click the Punctuation button in the Dictation toolbar",
          ],
          correctIndex: 2,
          explanation: "Punctuation is dictated as spoken commands — say 'period,' 'comma,' 'question mark,' 'new paragraph.' Word converts the spoken command into the mark rather than typing the word.",
          optionRationales: [
            "This works, but it defeats the purpose of dictating hands-free and is not how the feature is designed to be used.",
            "Pausing is not a reliable way to punctuate. Speaking the mark is the dependable way to insert it.",
            "Correct. Saying 'period' inserts the punctuation mark rather than the word.",
            "Punctuation is spoken, not clicked: say the name of the mark where it belongs.",
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
        "Open a blank document and click Home → Dictate.",
        "Dictate a two-sentence paragraph, speaking punctuation marks aloud.",
        "Use the voice command 'new paragraph' to start a new paragraph.",
        "Say 'undo' to undo your last change.",
        "Stop dictation and review the text for accuracy.",
        "Correct any misrecognized words by typing normally.",
      ],
    },
  ],
},

/* ============================================================
LESSON 5 – ACCESSIBILITY FEATURES
============================================================ */

{
  slug: "accessibility-features",
  title: "Accessibility Features",
  description:
    "Learn how to use Word's Accessibility Checker to identify and fix issues that make documents difficult to use for people with disabilities.",
  objectives: [
    "Run the Accessibility Checker and act on what it reports",
    "Write alt text that conveys the image's purpose",
    "Use heading styles to give a document a navigable structure",
    "Check color contrast and avoid color as the sole carrier of meaning",
  ],
  duration: "8 min",
  videoUrl: "https://www.youtube.com/embed/ETSap9J9tTY",

  sections: [

    {
       heading: "Accessibility is a requirement, not a courtesy",
       blocks: [
         {
           type: "scenario",
           role: "You produce patient materials at Lakeside Medical Associates.",
           text: "A patient with low vision requests the new patient handbook in a format their screen reader can use. You send the .docx. Their software reports 'image' fourteen times with no descriptions, finds no headings to navigate by, and reads a table as one continuous run of words. The document is technically delivered and practically unusable.",
           task: "Build accessibility in as you write, rather than retrofitting it under time pressure.",
         },
         {
           type: "paragraph",
           text: "For an organization providing healthcare services, this is also a legal matter. Section 504 of the Rehabilitation Act and the Americans with Disabilities Act require that people with disabilities have meaningful access to services and information. A document that cannot be read by assistive technology is a barrier to access.",
         },
         {
           type: "paragraph",
           text: "Review > Check Accessibility scans the document and lists problems with explanations and one-click fixes. Running it before distribution takes under a minute and catches the great majority of issues.",
         },
         {
           type: "table",
           caption: "The five checks that matter most",
           columns: [
             "Check",
             "What to do",
             "Why",
           ],
           rows: [
             [
               "Alt text on images",
               "Describe purpose, not appearance",
               "Screen readers announce alt text in place of the image",
             ],
             [
               "Real heading styles",
               "Use Heading 1-3, not bold body text",
               "Lets users jump between sections instead of reading linearly",
             ],
             [
               "Table header rows",
               "Mark the header row in Table Layout",
               "Lets a screen reader announce which column a cell belongs to",
             ],
             [
               "Meaningful link text",
               "'Download the intake form', not 'click here'",
               "Links are often read as a standalone list",
             ],
             [
               "Color contrast",
               "At least 4.5:1 for body text",
               "Low-contrast text is unreadable for many, especially in print",
             ],
           ],
         },
         {
           type: "worked-example",
           title: "Writing alt text that is actually useful",
           task: "Describe a bar chart showing appointment volume by month in a patient handbook.",
           steps: [
             {
               move: "Ask what the image is doing in the document.",
               why: "Alt text conveys purpose, not appearance. 'Bar chart with blue bars' describes pixels. The reader needs the information the chart carries, which is why the answer depends on why you put it there.",
             },
             {
               move: "State the finding: 'Bar chart showing appointment volume rising from 320 in January to 480 in June.'",
               why: "A sighted reader takes the trend from the chart in a second. Alt text should deliver that same trend, not force the reader to reconstruct it from a description of the axes.",
             },
             {
               move: "For a complex figure, put the full data in a table nearby and keep the alt text short.",
               why: "Alt text is announced as one unbroken run of speech, so it becomes unusable past a sentence or two. A real table beside the figure is navigable cell by cell — genuinely better than a long description.",
             },
             {
               move: "Mark purely decorative images as decorative.",
               why: "A border flourish with alt text interrupts reading for no benefit. The Alt Text pane has a 'Mark as decorative' checkbox that tells screen readers to skip it — which is the accessible choice, not a shortcut.",
             },
           ],
           result: "Images that convey the same information to every reader, without padding the document with noise.",
           takeaway: "Ask what the image tells a sighted reader, then write that. If it tells them nothing, mark it decorative.",
         },
       ],
     },

    {
      heading: "Why Accessibility Matters",
      blocks: [
        {
          type: "paragraph",
          text:
            "An accessible document can be read and navigated by people who use screen readers, keyboard-only navigation, or other assistive technologies. Word includes tools that help you catch common accessibility issues before sharing your document.",
        },
      ],
    },

    {
      heading: "Running the Accessibility Checker",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Review → Check Accessibility. The Accessibility pane opens on the right, listing Errors, Warnings, and Tips. Click any issue to jump directly to the problem in the document.",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_checker_command.png",
          alt: "Check Accessibility button on the Review tab",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_checker_pane.png",
          alt: "Accessibility Checker pane with errors and warnings",
        },
      ],
    },

    {
      heading: "Adding Alt Text to Images",
      blocks: [
        {
          type: "paragraph",
          text:
            "Alt text describes an image for screen readers. Right-click an image and choose View Alt Text (or select it, then Picture Format > Alt Text). Type a brief, descriptive sentence that explains what the image shows. Avoid vague descriptions like 'image 1'.",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_alttext_rightclick.png",
          alt: "View Alt Text option in the right-click menu for a picture",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_alttext_pane.png",
          alt: "Alt Text pane with description field",
        },
      ],
    },

    {
      heading: "Using Meaningful Heading Structure",
      blocks: [
        {
          type: "paragraph",
          text:
            "Screen readers use heading styles to help users navigate long documents. Use Heading 1 for main sections, Heading 2 for subsections, and so on — never skip levels (e.g., going from Heading 1 directly to Heading 3).",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_heading_structure.png",
          alt: "Correct heading hierarchy example",
        },
      ],
    },

    {
      heading: "Making Tables Accessible",
      blocks: [
        {
          type: "paragraph",
          text:
            "Data tables should have a header row that labels each column. Select your table, go to Table Design → check Header Row, and confirm the first row is formatted as a header so screen readers can announce column names.",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_table_header_row.png",
          alt: "Header Row checkbox in Table Design tab",
        },
      ],
    },

    {
      heading: "Using Meaningful Hyperlink Text",
      blocks: [
        {
          type: "paragraph",
          text:
            "Avoid hyperlinks that only show the raw URL or phrases like 'click here'. Instead, use descriptive link text such as 'Visit the Microsoft 365 support page' so screen reader users understand the link's destination.",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_link_text_example.png",
          alt: "Example of descriptive vs. vague hyperlink text",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is the purpose of alt text on images in a Word document?",
          options: [
            "It appears as a caption below the image when printed",
            "It describes the image for screen readers so visually impaired users understand the content",
            "It compresses the image file size for faster sharing",
            "It locks the image so it cannot be moved or resized",
          ],
          correctIndex: 1,
          explanation: "Alt text is the description a screen reader announces in place of an image, so a blind or low-vision reader receives the information the image carries. It should convey the image's purpose rather than describe its appearance.",
          optionRationales: [
            "Captions are visible text added below an image with References > Insert Caption. Alt text is not printed and not visible on screen.",
            "Correct. Screen readers announce alt text in place of the image, so the information reaches readers who cannot see it.",
            "Compression is done with Picture Format > Compress Pictures. Alt text has no effect on file size.",
            "Position is controlled by layout and wrapping options. Alt text describes the image; it does not lock it.",
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
        "Open a document that contains at least one image and a table.",
        "Run Check Accessibility from the Review tab.",
        "Fix any missing alt text by right-clicking each image and entering a description.",
        "Check that your heading structure does not skip levels.",
        "Review any hyperlinks in the document and update generic 'click here' text with descriptive link labels.",
        "Re-run the Accessibility Checker and confirm the errors are resolved.",
      ],
    },
  ],
},

];
