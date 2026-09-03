import { Lesson } from "@/types/lesson";

export const powerpointModule1Lessons: Lesson[] = [

{
  slug: "getting-started-with-powerpoint",
  title: "Getting Started with PowerPoint",
  description:
    "Learn your way around the PowerPoint interface including the Ribbon, Quick Access Toolbar, slide views, zoom controls, and Backstage view.",
  objectives: [
    "Identify the Ribbon, slide pane, thumbnail pane, and notes pane",
    "Switch between Normal, Slide Sorter, Reading, and Presenter views",
    "Explain what a placeholder is and why it matters",
    "Navigate a deck efficiently while building it",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/k6pg4nZS6fA",

  practiceFiles: [],

  sections: [

    {
       heading: "PowerPoint is a visual aid, not the presentation",
       blocks: [
         {
           type: "scenario",
           role: "You prepare the monthly all-staff briefing at Lakeside Medical Associates.",
           text: "Your first deck has fourteen slides carrying every word you plan to say. During the meeting the room reads ahead, stops listening, and you end up reading your own slides aloud to people who finished them a minute ago.",
           task: "Learn the tool, and learn what belongs on a slide versus what belongs in your mouth.",
         },
         {
           type: "paragraph",
           text: "The most useful principle in this entire course is that the audience cannot read and listen at the same time. Text-heavy slides force a choice, and the audience reliably chooses reading — which makes the presenter redundant. Slides should carry the few things that genuinely benefit from being seen: an image, a number, a chart, a short phrase that anchors what you are saying.",
         },
         {
           type: "paragraph",
           text: "Everything else goes in the notes pane, which only you see in Presenter View. This is what the notes pane is actually for, and using it properly is the difference between a deck that supports you and a deck that replaces you.",
         },
         {
           type: "key-terms",
           terms: [
             {
               term: "Placeholder",
               definition: "A pre-positioned content box defined by the slide layout. Typing into placeholders rather than free text boxes is what keeps a deck consistent.",
             },
             {
               term: "Layout",
               definition: "A named arrangement of placeholders — Title Slide, Title and Content, Two Content. Chosen per slide.",
             },
             {
               term: "Slide Master",
               definition: "The design definition behind every layout. Change it once and the whole deck follows.",
             },
             {
               term: "Theme",
               definition: "The coordinated colors, fonts, and effects applied across the presentation.",
             },
             {
               term: "Notes pane",
               definition: "Text attached to a slide that the audience never sees. Visible to you in Presenter View.",
             },
           ],
         },
         {
           type: "table",
           caption: "The views and when to use each",
           columns: [
             "View",
             "Shows",
             "Use it to",
           ],
           rows: [
             [
               "Normal",
               "One slide plus thumbnails and notes",
               "Build and edit slides",
             ],
             [
               "Outline",
               "Text only, as a hierarchy",
               "Draft and reorder the argument before designing anything",
             ],
             [
               "Slide Sorter",
               "All slides as thumbnails",
               "Reorder, delete, and check visual consistency",
             ],
             [
               "Reading",
               "Full screen in a window",
               "Review the flow without leaving your desktop",
             ],
             [
               "Presenter",
               "Notes, timer, and next slide",
               "Actually present",
             ],
           ],
         },
         {
           type: "tip",
           text: "Build the deck in Outline View first. It shows only the text hierarchy, so you are forced to work on the argument before you can be distracted by design. A deck whose outline does not make sense will not be rescued by a theme.",
         },
       ],
     },

    {
      heading: "PowerPoint Start Screen",
      blocks: [
        {
          type: "paragraph",
          text:
            "When you open PowerPoint, the Start Screen appears. From here you can create a new presentation, choose from templates, or open recent files.",
        },
        {
          type: "paragraph",
          text:
            "Select Blank Presentation to open the PowerPoint editing environment and begin building your slides.",
        },
                {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_interface.png",
          alt: "PowerPoint interface overview",
        },
      ],
    },

    {
      heading: "Understanding the PowerPoint Interface",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once a presentation opens, you will see the PowerPoint interface. The main workspace includes the Ribbon, slide navigation pane, slide editing area, and status bar.",
        },
        {
          type: "paragraph",
          text:
            "The slide pane is where you build your presentation, while the navigation pane on the left allows you to organize and switch between slides.",
        },

      ],
    },

    {
      heading: "The Ribbon",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Ribbon contains the commands you use to create and edit presentations. It is organized into tabs such as Home, Insert, Design, Transitions, Animations, Slide Show, Review, and View.",
        },
        {
          type: "paragraph",
          text:
            "Each tab contains groups of related commands. For example, the Font group contains tools for formatting text.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_ribbon.png",
          alt: "PowerPoint ribbon tabs",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_small_arrow.png",
          alt: "Ribbon dialog launcher",
        },
      ],
    },

    {
      heading: "Showing and Hiding the Ribbon",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can control how much of the Ribbon is visible using the Ribbon Display Options in the top-right corner of PowerPoint.",
        },
        {
          type: "paragraph",
          text:
            "Options include Auto-hide Ribbon, Show Tabs, and Show Tabs and Commands.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_ribbon_dropdown.png",
          alt: "Ribbon display options",
        },
      ],
    },

    {
      heading: "Quick Access Toolbar",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Quick Access Toolbar is located above the Ribbon and provides quick access to commonly used commands such as Save, Undo, Redo, and Start From Beginning.",
        },
        {
          type: "paragraph",
          text:
            "You can customize the Quick Access Toolbar by clicking the drop-down arrow and selecting additional commands.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_quick_access.png",
          alt: "Quick access toolbar",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_quick_print_setup.png",
          alt: "Quick access customization menu",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_quick_print.png",
          alt: "Quick print added to quick access toolbar",
        },
      ],
    },

    {
      heading: "Using the Tell Me Box",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Tell Me box works like a search tool inside PowerPoint. You can type the name of a command or feature and PowerPoint will help you find it instantly.",
        },
        {
          type: "paragraph",
          text:
            "This is especially useful when you are learning PowerPoint and do not know where certain tools are located.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_shapes.png",
          alt: "Using the Tell Me box to search commands",
        },
      ],
    },

    {
      heading: "Ruler, Guides, and Gridlines",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint includes layout tools to help align objects on your slides. These include the ruler, guides, and gridlines.",
        },
        {
          type: "paragraph",
          text:
            "You can enable these tools from the View tab in the Ribbon under the Show group.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_view_tools.png",
          alt: "View tab ruler gridlines guides",
        },
      ],
    },

    {
      heading: "Slide Views",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint includes multiple slide views that change how your presentation is displayed. These include Normal view, Slide Sorter view, Reading view, and Slide Show view.",
        },
        {
          type: "paragraph",
          text:
            "You can switch between these views using the view buttons in the bottom-right corner of the PowerPoint window.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_slide_view_command.png",
          alt: "Slide view buttons",
        },
      ],
    },

    {
      heading: "Zoom Controls",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Zoom slider located in the bottom-right corner allows you to zoom in or out of your slide.",
        },
        {
          type: "paragraph",
          text:
            "This helps you adjust your workspace when working on detailed slide content.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_zoom_command.png",
          alt: "Zoom slider control",
        },
      ],
    },

    {
      heading: "Backstage View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Backstage view is accessed by clicking the File tab. It contains options for saving, printing, sharing, exporting, and managing your presentation.",
        },
        {
          type: "paragraph",
          text:
            "This area also shows presentation information such as file size, slide count, and document properties.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_file_tab.png",
          alt: "File tab backstage button",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_backstage_view.png",
          alt: "PowerPoint backstage view",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Where are most PowerPoint commands organized?",
          options: [
            "The status bar at the bottom of the screen",
            "The Quick Access Toolbar above the slide",
            "The Ribbon at the top of the screen",
            "The slide navigation pane on the left",
          ],
          correctIndex: 2,
          explanation: "The Ribbon organizes PowerPoint's commands into task-based tabs — Home for text and slides, Insert for objects, Design for themes, Transitions and Animations for motion.",
          optionRationales: [
            "The status bar reports the slide number, view controls, and zoom. It displays information rather than housing commands.",
            "The Quick Access Toolbar holds a few shortcuts you choose yourself. It is a convenience layer over the Ribbon.",
            "Correct. The Ribbon organizes commands into task-based tabs.",
            "The navigation pane shows slide thumbnails for reordering and selecting. It manages slides rather than holding commands.",
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
        "Open PowerPoint and create a blank presentation.",
        "Change the Ribbon Display Options to Show Tabs.",
        "Add New, Quick Print, and Spelling to the Quick Access Toolbar.",
        "Use the Tell Me box to search for Shapes.",
        "Insert a shape onto the slide.",
        "Enable the Ruler from the View tab.",
        "Zoom the presentation to 120%.",
        "Return the Ribbon display to Show Tabs and Commands.",
      ],
    },
    {
          type: "image",
          src: "/images/powerpoint/module-1/getting-started/powerpoint_final_result.png",
          alt: "PowerPoint backstage view",
        },
  ],

},

{
  slug: "understanding-onedrive-for-powerpoint",
  title: "Understanding OneDrive for PowerPoint",
  description:
    "Learn how to sign in to PowerPoint, connect your Microsoft account, and use OneDrive to save and access presentations from anywhere.",
  objectives: [
    "Save a presentation to OneDrive and open it elsewhere",
    "Explain why cloud storage matters for a deck you will present",
    "Share a presentation with appropriate permissions",
    "Plan for presenting when the network is unavailable",
  ],
  duration: "8 min",

  sections: [

    {
       heading: "The file has to be there when you stand up to present",
       blocks: [
         {
           type: "scenario",
           role: "You present at the quarterly staff meeting at Lakeside Medical Associates.",
           text: "Your deck is on your desk computer. The meeting is in the conference room, on a different machine, and the guest network is refusing connections. You have four minutes and thirty people waiting.",
           task: "Store the deck so it is reachable from anywhere, and carry a fallback for when the network is not.",
         },
         {
           type: "paragraph",
           text: "OneDrive makes the presentation reachable from any machine you can sign in on, which solves the ordinary case well. It also gives you version history, so an accidental deletion of six slides is recoverable rather than final.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Never let the cloud be your only copy of something you must present. Networks fail in conference rooms specifically. Before any presentation that matters, put a copy on a USB drive or the local desktop, and export a PDF as a last-resort fallback — a PDF will open on literally any machine, and a static deck is far better than no deck.",
         },
         {
           type: "tip",
           text: "Embedded video and audio are the usual cause of a deck that works on your machine and fails on the presentation machine. File > Info > Optimize Media Compatibility embeds and converts media so it travels with the file. Always run it before presenting from a different computer.",
         },
       ],
     },

    {
      heading: "What is OneDrive?",
      blocks: [
        {
          type: "paragraph",
          text:
            "OneDrive is Microsoft's cloud storage service. It allows you to store presentations and other files online so you can access them from any computer, tablet, or smartphone with an internet connection.",
        },
        {
          type: "paragraph",
          text:
            "Using OneDrive makes it easy to save, edit, and share PowerPoint presentations while keeping your files protected and backed up.",
        }
      ],
    },

    {
      heading: "Signing in to PowerPoint",
      blocks: [
        {
          type: "paragraph",
          text:
            "To use OneDrive features, you need to sign in with a Microsoft account. Click the Sign in button in the upper-right corner of the PowerPoint window.",
        },
        {
          type: "paragraph",
          text:
            "After signing in, PowerPoint connects to your OneDrive storage so you can save presentations online and access them across devices.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/onedrive/powerpoint_sign_in.png",
          alt: "PowerPoint sign in button",
        },
      ],
    },

    {
      heading: "Benefits of Using OneDrive",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once you sign in, OneDrive provides several powerful advantages for managing presentations.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Access files anywhere from any device connected to the internet.",
            "Back up presentations safely in the cloud.",
            "Share files with coworkers or classmates.",
            "Collaborate on presentations with multiple people at the same time.",
          ],
        },
      ],
    },

    {
      heading: "Saving Presentations to OneDrive",
      blocks: [
        {
          type: "paragraph",
          text:
            "When you save a presentation, you can choose OneDrive as the storage location. This allows the file to sync automatically with your Microsoft account.",
        },
        {
          type: "paragraph",
          text:
            "Click File → Save As and choose OneDrive instead of saving directly to your computer.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/onedrive/powerpoint_onedrive.png",
          alt: "Saving a PowerPoint presentation to OneDrive",
        },
      ],
    },

    {
      heading: "Opening Files from OneDrive",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once your presentations are stored in OneDrive, you can open them from any device. Simply sign into PowerPoint and choose OneDrive when opening a file.",
        },
        {
          type: "paragraph",
          text:
            "You can still save files locally to your computer, but OneDrive provides additional convenience and protection.",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is the benefit of saving a presentation to OneDrive?",
          options: [
            "It automatically adds transitions to every slide",
            "It compresses the file size to save disk space",
            "You can access and share it from any device",
            "It protects the presentation from being edited by anyone",
          ],
          correctIndex: 2,
          explanation: "OneDrive stores the presentation on Microsoft's servers so you can open it from any device you sign in on, and share it by link. It also provides version history and co-authoring.",
          optionRationales: [
            "Storage location has no effect on transitions, which are applied from the Transitions tab.",
            "OneDrive does not compress files. Reducing file size is done with Compress Pictures and media optimization.",
            "Correct. The presentation is reachable from any device you sign in on, and can be shared by link.",
            "Sharing permissions are something you set deliberately. Saving to OneDrive does not lock a file against editing.",
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
        "Sign in to PowerPoint using a Microsoft account.",
        "Open the File menu and select Save As.",
        "Choose OneDrive as the save location.",
        "Save a presentation to OneDrive.",
        "Locate your saved presentation inside your OneDrive account.",
      ],
    },
  ],
},

{
  slug: "creating-and-opening-presentations",
  title: "Creating and Opening Presentations",
  description:
    "Learn how to create new PowerPoint presentations, use templates, open existing files, pin presentations, and understand Compatibility Mode.",
  objectives: [
    "Create presentations from blank files and from templates",
    "Open and pin recent presentations",
    "Evaluate whether a template suits your content",
    "Explain what a template supplies beyond appearance",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/OX3vRazm4fw",

  practiceFiles: [
    {
      name: "Creating & Opening Presentations Practice File",
      url: "/practice/powerpoint/module-1/creating-opening/Powerpoint_CreatingOpening_Practice.ppt",
    },
  ],

  sections: [

    {
       heading: "A template is a set of decisions already made",
       blocks: [
         {
           type: "scenario",
           role: "You produce recurring briefings at Lakeside Medical Associates.",
           text: "Every month you rebuild the same deck: the same title arrangement, the same colors, the same closing slide. Twenty minutes each time, spent re-making decisions you already made in January — and the decks still do not quite match each other.",
           task: "Build the practice's design once as a template, then start every deck from it.",
         },
         {
           type: "paragraph",
           text: "A template supplies the theme, the slide layouts, and often placeholder content — all the structural decisions. Starting from one means starting with the design settled, so your attention goes to the argument rather than to fonts.",
         },
         {
           type: "callout",
           variant: "info",
           text: "Judge a template by its layouts, not its title slide. Many attractive templates supply three usable layouts and nothing else, so the moment you need a comparison slide or a full-width chart you are improvising with text boxes — and the consistency you chose the template for is gone. Open the Slide Master and look at what layouts exist before committing to a template.",
         },
       ],
     },

    {
      heading: "Creating a New Presentation",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint files are called presentations. When starting a new project, you will usually begin with a blank presentation.",
        },
        {
          type: "paragraph",
          text:
            "To create a new presentation, click the File tab to open Backstage view, then select New and choose Blank Presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_file_tab.png",
          alt: "File tab in PowerPoint",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_backstage.png",
          alt: "New presentation screen",
        },
      ],
    },

    {
      heading: "Using Templates",
      blocks: [
        {
          type: "paragraph",
          text:
            "Templates are predesigned presentations that allow you to quickly start a slideshow with built-in formatting, layouts, and color themes.",
        },
        {
          type: "paragraph",
          text:
            "From the New screen in Backstage view, you can search for templates using the search bar or choose from suggested templates.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_new_template.png",
          alt: "PowerPoint template selection screen",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_review_template.png",
          alt: "Template preview screen",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_new_template_create.png",
          alt: "Create presentation from template",
        },
      ],
    },

    {
      heading: "Opening Existing Presentations",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can open presentations that have already been saved on your computer or OneDrive.",
        },
        {
          type: "paragraph",
          text:
            "Click File → Open to view recent files or browse your computer to locate a presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_existing.png",
          alt: "Open presentations menu",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_existing_browse.png",
          alt: "Browse option in PowerPoint",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_doc_folder.png",
          alt: "Open dialog box",
        },
      ],
    },

    {
      heading: "Pinning Presentations",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you frequently use the same presentation, you can pin it to the Recent list so it stays easy to access.",
        },
        {
          type: "paragraph",
          text:
            "Hover your mouse over a recent file and click the pushpin icon to pin the presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_pin_present.png",
          alt: "Pinned presentation",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_unpin_present.png",
          alt: "Unpin presentation",
        },
      ],
    },

    {
      heading: "Understanding Compatibility Mode",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you open a presentation created in an older version of PowerPoint, it may open in Compatibility Mode.",
        },
        {
          type: "paragraph",
          text:
            "Compatibility Mode disables certain newer features so the presentation remains compatible with older versions of PowerPoint.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_compatibility.png",
          alt: "PowerPoint compatibility mode",
        },
      ],
    },

    {
      heading: "Converting a Presentation",
      blocks: [
        {
          type: "paragraph",
          text:
            "To access newer PowerPoint features, you can convert a presentation from Compatibility Mode to the latest file format.",
        },
        {
          type: "paragraph",
          text:
            "Open Backstage view, click Convert, and save the presentation as the newer format.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_convert_compat.png",
          alt: "Convert presentation command",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/create_and_open_save_as.png",
          alt: "Save converted presentation",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is a PowerPoint template?",
          options: [
            "A blank slide with no formatting or placeholders",
            "A slideshow that plays automatically without editing",
            "A pre-designed presentation you can customize as a starting point",
            "A file saved in read-only mode",
          ],
          correctIndex: 2,
          explanation: "A template is a pre-designed presentation supplying the theme, slide layouts, and often sample content, used as a starting point. Opening one creates a new presentation and leaves the template intact.",
          optionRationales: [
            "A blank slide with no formatting is what you get from a blank presentation, which is the opposite of a template.",
            "That describes a self-running or kiosk presentation, configured under Set Up Slide Show.",
            "Correct. A template is a pre-designed presentation you customize as a starting point.",
            "Read-only status is a file property, unrelated to what a template is.",
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
        "Create a new blank PowerPoint presentation.",
        "Search for a template and create a presentation from it.",
        "Open an existing presentation from your computer.",
        "Pin a presentation in the Recent list.",
        "Open a presentation in Compatibility Mode.",
        "Convert the presentation to the latest PowerPoint format.",
      ],
    },
  ],
},

{
  slug: "saving-presentations",
  title: "Saving Presentations",
  description:
    "Learn how to save PowerPoint presentations, change file types, export presentations, and recover unsaved work.",
  objectives: [
    "Save in the format that matches how the deck will be used",
    "Export to PDF and to video",
    "Explain what each export format preserves and loses",
    "Prepare a deck for a machine that may not have PowerPoint",
  ],
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/iwecUGKmiyw",

  practiceFiles: [
    {
      name: "PowerPoint Saving Practice File",
      url: "/practice/powerpoint/module-1/saving/Powerpoint_Saving_Practice.pptx",
    },
  ],

sections: [

  {
     heading: "Choose the format for how it will be opened",
     blocks: [
       {
         type: "scenario",
         role: "You distribute the orientation deck at Lakeside Medical Associates.",
         text: "You email the .pptx to twelve new hires. Three cannot open it, two see substituted fonts that break every slide layout, and one edits it and forwards their version to the rest.",
         task: "Match the distribution format to what recipients actually need to do with it.",
       },
       {
         type: "table",
         caption: "Export formats",
         columns: [
           "Format",
           "Preserves",
           "Use for",
         ],
         rows: [
           [
             ".pptx",
             "Everything, fully editable",
             "Colleagues who must edit it",
           ],
           [
             "PDF",
             "Layout and fonts; loses animation and video",
             "Distributing to read — opens anywhere",
           ],
           [
             "MP4 video",
             "Animation, timing, and narration",
             "Self-paced training people watch without you",
           ],
           [
             "PowerPoint Show (.ppsx)",
             "Everything; opens straight into the slide show",
             "Handing to someone who should present, not edit",
           ],
           [
             "Images (PNG/JPG)",
             "One picture per slide",
             "Dropping a slide into another document",
           ],
         ],
       },
       {
         type: "callout",
         variant: "warning",
         text: "Fonts are the most common cause of a deck that looks wrong on someone else's machine. If a font is not installed there, PowerPoint substitutes another and your layout reflows — text overflows placeholders and line breaks land in the wrong places. File > Options > Save > Embed fonts in the file prevents it, and PDF sidesteps the problem entirely.",
       },
     ],
   },

{
  heading: "Saving a Presentation",
  blocks: [
    {
      type: "paragraph",
      text:
        "Where you save decides what you can do later. A file on the computer's own drive is reachable only from that machine, and is gone if the drive fails. A file in OneDrive follows you to any device you sign in on, keeps a version history you can roll back, and is the only kind of file AutoSave and co-authoring work on. For a presentation you will build over several sessions, or deliver from a room's machine rather than your own, save to OneDrive from the start.",
    },
    {
      type: "paragraph",
      text:
        "Click the File tab to open Backstage view and access the Save and Save As commands.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_file_tab.png",
      alt: "PowerPoint file tab",
    },
  ],
},

{
  heading: "Using the Save Command",
  blocks: [
    {
      type: "paragraph",
      text:
        "Save writes over the file you opened. That is what you want when you are updating your own work — and it is exactly the wrong thing when you opened an existing deck to build a new one from it. Whenever a file is your starting point rather than your subject, use Save As first, before you change anything.",
    },
    {
      type: "paragraph",
      text:
        "The first Save always opens Save As, because PowerPoint has nowhere to write to yet. After that it saves silently, which is why the Save-As-first habit matters: once the file has a name, a reflexive Ctrl+S goes straight into it with no prompt.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_command.png",
      alt: "Save command in PowerPoint",
    },
  ],
},

{
  heading: "Using Save As",
  blocks: [
    {
      type: "paragraph",
      text:
        "Save As creates a new file and leaves the original untouched. Do it before you edit, not after. Renaming a file you have already changed does not restore the original, and the deck you overwrote may have been the one someone else needed.",
    },
    {
      type: "paragraph",
      text:
        "From the Save As screen you can choose to store the presentation on OneDrive, your computer, or another location.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_save_as.png",
      alt: "Save As screen",
    },
  ],
},

{
  heading: "Entering a File Name",
  blocks: [
    {
      type: "paragraph",
      text:
        "Name the file so a stranger could identify it in a folder list: subject, audience, and date in year-month order — \"2026-10-14 Staff Orientation - New Hires.pptx\". Year-first dates sort chronologically automatically. \"Presentation1 final v2 FINAL.pptx\" is the file nobody can find in March.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_filename_input.png",
      alt: "File name input field",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_filename_input_change.png",
      alt: "Changing file name",
    },
  ],
},

{
  heading: "Choosing a File Type",
  blocks: [
    {
      type: "paragraph",
      text:
        "Match the format to what the recipient needs to do. A .pptx is editable — right for a colleague who will revise it, and wrong for a deck you do not want altered. A PowerPoint Show (.ppsx) opens straight into the slide show, which suits handing a deck to someone who will present but not edit. A PDF opens anywhere, locks the layout, and drops animation and video.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_file_type_save_as.png",
      alt: "File type dropdown",
    },
  ],
},

{
  heading: "Exporting Presentations",
  blocks: [
    {
      type: "paragraph",
      text:
        "Export produces a copy in another format and leaves your .pptx alone. Video is the one worth knowing: it preserves animation, timing, and narration, so a deck people watch without you keeps working. It also takes minutes to render on a long deck, so do it before the day you need it.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_change_file_type.png",
      alt: "Change file type export screen",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_change_to_pdf.png",
      alt: "Export presentation as PDF",
    },
  ],
},

{
  heading: "Sharing Presentations",
  blocks: [
    {
      type: "paragraph",
      text:
        "Sharing requires the file to be in OneDrive or SharePoint — that is what a share link points at. If the Share button offers to upload first, it is telling you the file is currently local and cannot be shared as a link.",
    },
    {
      type: "paragraph",
      text:
        "Choose the permission deliberately. \"Can view\" is right for most recipients; \"can edit\" is for genuine co-authors. And permissions outlive the task — a link shared for one afternoon still works next year unless someone revokes it. Set an expiry on anything sensitive.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_share.png",
      alt: "Share presentation window",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_share_input.jpeg",
      alt: "Entering email to share presentation",
    },
  ],
},

{
  heading: "Recovering Unsaved Presentations",
  blocks: [
    {
      type: "paragraph",
      text:
        "AutoRecover is a safety net, not a save. It keeps periodic snapshots so a crash costs you minutes rather than hours, and it is not a substitute for saving. Check the interval under File > Options > Save and set it to match how much work you could bear to redo.",
    },
    {
      type: "paragraph",
      text:
        "Go to File → Info → Manage Presentation and choose Recover Unsaved Presentations.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_recover_unsaved.png",
      alt: "Recover unsaved presentations",
    },
  ],
},

{
  heading: "Document Recovery",
  blocks: [
    {
      type: "paragraph",
      text:
        "Open the recovered version and check it before you close the pane — once you dismiss it, the recovery files are cleared. Compare it against the last version you saved, since the recovered copy may be newer or older depending on when the snapshot was taken.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_doc_recovery.png",
      alt: "Document recovery pane",
    },
  ],
},

{
  heading: "PowerPoint Save Options",
  blocks: [
    {
      type: "paragraph",
      text:
        "Two settings are worth changing once. Set the AutoRecover interval to five minutes rather than the default ten. And set the default save location to OneDrive, so the safe choice is the one that happens when you are not thinking about it.",
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/saving/saving_options.png",
      alt: "PowerPoint save options",
    },
  ],
},

{
  heading: "Knowledge Check",
  blocks: [
    {
      type: "knowledge-check",
      question: "What should you do if you want to share a presentation that others cannot edit?",
      options: [
        "Save it as a .pptx file and email it",
        "Use the Share button to invite collaborators",
        "Export it as a PDF",
        "Mark it as Final in the Info pane",
      ],
      correctIndex: 2,
      explanation: "PDF preserves layout and fonts exactly and is not casually editable, so it is right for distributing a deck people should read rather than change. It does lose animation, transitions, and embedded video.",
      optionRationales: [
        "A .pptx is fully editable, which is precisely what you are trying to avoid — and it also risks font substitution on the recipient's machine.",
        "Sharing with collaborators grants editing access, which is the opposite of the goal.",
        "Correct. PDF locks the layout and fonts and is not casually editable.",
        "Mark as Final is only an advisory flag. It shows a notice and is dismissed with one click, so it prevents nothing.",
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
        "Open PowerPoint and create a new blank presentation.",
        "Save the presentation to your computer using Save As.",
        "Rename the presentation.",
        "Export the presentation as a PDF.",
        "Open the File tab and locate the Recover Unsaved Presentations option.",
      ],
    },
  ],
},

{
  slug: "slide-basics",
  title: "Slide Basics",
  description:
    "Learn how to create slides, choose layouts, work with placeholders, duplicate and reorder slides, and apply design changes in PowerPoint.",
  objectives: [
    "Add, duplicate, delete, and reorder slides",
    "Choose a layout that matches the slide's content",
    "Explain why placeholders beat free-floating text boxes",
    "Use the outline to structure a deck before designing it",
  ],
  duration: "14 min",
  videoUrl: "https://www.youtube.com/embed/TZfcVbKJs1E",

  practiceFiles: [
    {
      name: "PowerPoint Slide Basics Practice File",
      url: "/practice/powerpoint/module-1/slide-basics/Powerpoint_SlideBasics_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "Layouts are what keep a deck from drifting",
       blocks: [
         {
           type: "scenario",
           role: "You build a twenty-slide orientation deck at Lakeside Medical Associates.",
           text: "You add text boxes wherever you need them rather than using layouts. Your titles land at slightly different heights on almost every slide. Watching the deck, the title jitters up and down from slide to slide, and the whole thing feels amateurish for reasons nobody can name.",
           task: "Use layouts and placeholders so alignment is structural rather than something you re-achieve each time.",
         },
         {
           type: "paragraph",
           text: "A layout is a set of placeholders positioned by the Slide Master. Type into placeholders and every title lands in exactly the same place on every slide, with the same font and size. That invisible consistency is most of what separates a professional deck from a homemade one.",
         },
         {
           type: "paragraph",
           text: "Free text boxes place themselves wherever you drop them, which is why title jitter happens. They have a legitimate role — a caption over an image, an annotation on a diagram — but they should never be doing a placeholder's job.",
         },
         {
           type: "worked-example",
           title: "Building a slide that stays consistent with the rest of the deck",
           task: "Add a slide comparing two intake processes, without breaking the deck's alignment.",
           steps: [
             {
               move: "Home > New Slide, and pick the Two Content layout rather than accepting the default.",
               why: "The layout is chosen for the content, not the other way round. Two Content gives two side-by-side placeholders already aligned to the master, so the comparison structure is built in before you type anything.",
             },
             {
               move: "Click into each placeholder and type.",
               why: "Placeholder text inherits the master's font, size, and position automatically, and it appears in the outline. Text in a free box does neither, which is also why it will not appear if anyone builds a summary from the outline.",
             },
             {
               move: "If the text does not fit, cut the text rather than shrinking the font.",
               why: "PowerPoint offers to autofit by reducing the size, which is how a deck ends up with eight different body sizes. Overflow is a signal that the slide is carrying too much — move the detail to the notes, which is where it belonged.",
             },
             {
               move: "Use Outline View to check the slide's place in the argument.",
               why: "The outline shows the deck as structure, stripped of design. If a slide's title does not make sense in that list, the problem is with the content rather than the layout.",
             },
           ],
           result: "A comparison slide that matches every other slide's alignment and typography exactly.",
           takeaway: "Pick the layout that fits the content, type into placeholders, and treat overflow as a content problem rather than a font-size problem.",
         },
       ],
     },

    {
      heading: "Understanding Slides",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint presentations are built one slide at a time. Each slide acts like a page in your presentation, and together the slides tell your full story.",
        },
        {
          type: "paragraph",
          text:
            "Most slides begin with placeholders. Placeholders are built-in boxes that make it easy to add titles, text, pictures, charts, tables, and other content without having to build the layout yourself.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_slide_placeholders.png",
          alt: "PowerPoint slide with placeholders",
        },
        {
          type: "paragraph",
          text:
            "Using placeholders helps keep slides organized and consistent. Instead of dragging random objects around the screen, PowerPoint gives you a structured starting point.",
        },
      ],
    },

    {
      heading: "Using the Slide Navigation Pane",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Slide Navigation Pane appears on the left side of the PowerPoint window. It displays thumbnails of every slide in the presentation.",
        },
        {
          type: "paragraph",
          text:
            "This pane allows you to jump between slides quickly, see the order of your presentation, and make changes to slide arrangement without leaving the main editing view.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_nav_pane.jpeg",
          alt: "PowerPoint slide navigation pane",
        },
        {
          type: "paragraph",
          text:
            "When a presentation begins to grow, the Navigation Pane becomes one of the most important tools for staying organized.",
        },
      ],
    },

    {
      heading: "Adding a New Slide",
      blocks: [
        {
          type: "paragraph",
          text:
            "To continue building a presentation, you will usually need to insert additional slides. PowerPoint makes this easy with the New Slide command on the Home tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_new_slide.png",
          alt: "New Slide command on Home tab",
        },
        {
          type: "paragraph",
          text:
            "Clicking the top half of the New Slide button inserts a new slide immediately. This is the fastest way to keep moving when you are building a presentation from scratch.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_quick_slide_add.png",
          alt: "Quick new slide insertion",
        },
        {
          type: "paragraph",
          text:
            "New slides usually appear directly below the currently selected slide in the Navigation Pane.",
        },
      ],
    },

    {
      heading: "Choosing the Right Slide Layout",
      blocks: [
        {
          type: "paragraph",
          text:
            "Not every slide should look the same. Some slides only need a title, while others may need text, pictures, or two side-by-side content areas.",
        },
        {
          type: "paragraph",
          text:
            "That is where slide layouts come in. Layouts control how placeholders are arranged on the slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_choose_slide_layout.png",
          alt: "Choosing a slide layout",
        },
        {
          type: "paragraph",
          text:
            "One of the most common layouts is Title and Content. It gives you a title placeholder at the top and one large content area below.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_title_and_content.png",
          alt: "Title and Content layout example",
        },
        {
          type: "paragraph",
          text:
            "Choosing the correct layout early makes your slides easier to build and usually saves you from unnecessary resizing later.",
        },
      ],
    },

    {
      heading: "Changing the Layout of an Existing Slide",
      blocks: [
        {
          type: "paragraph",
          text:
            "Sometimes you create a slide and later realize it needs a different layout. Thankfully, you do not need to start over.",
        },
        {
          type: "paragraph",
          text:
            "PowerPoint lets you change the layout of an existing slide using the Layout command on the Home tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_change_layout.png",
          alt: "Changing slide layout from Home tab",
        },
        {
          type: "paragraph",
          text:
            "For example, you may want to switch to a Blank slide if you want full control over where objects appear.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_blank_slide.png",
          alt: "Blank slide layout option",
        },
        {
          type: "paragraph",
          text:
            "Changing layouts is a clean way to reshape a slide without deleting it and rebuilding everything from scratch.",
        },
      ],
    },

    {
      heading: "Adding a Text Box",
      blocks: [
        {
          type: "paragraph",
          text:
            "Placeholders are useful, but sometimes you need more freedom. A text box allows you to place text exactly where you want it on the slide.",
        },
        {
          type: "paragraph",
          text:
            "To insert one, go to the Insert tab and click Text Box.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_add_text_box.png",
          alt: "Text Box command on Insert tab",
        },
        {
          type: "paragraph",
          text:
            "After selecting the command, click and drag on the slide to draw the text box area.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_text_box_create.png",
          alt: "Drawing a text box on a slide",
        },
        {
          type: "paragraph",
          text:
            "Once the text box appears, you can type directly inside it and format it like any other text in PowerPoint.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_text_box_appear.png",
          alt: "Text box added to slide",
        },
      ],
    },

    {
      heading: "Moving and Resizing Placeholders",
      blocks: [
        {
          type: "paragraph",
          text:
            "You are not locked into PowerPoint’s default object positions. Placeholders and text boxes can be moved and resized whenever needed.",
        },
        {
          type: "paragraph",
          text:
            "To move an object, click its border and drag it to a new location.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_move_placeholder.png",
          alt: "Moving a placeholder on a slide",
        },
        {
          type: "paragraph",
          text:
            "To resize an object, drag one of the sizing handles on the corners or sides. Corner handles adjust both height and width, while side handles adjust only one dimension.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_resize_placeholder.png",
          alt: "Resizing a placeholder",
        },
        {
          type: "paragraph",
          text:
            "These adjustments help you improve spacing, balance your slide, and make room for other content.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_adjust_placeholder.png",
          alt: "Adjusted placeholder size and position",
        },
      ],
    },

    {
      heading: "Duplicating Slides",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you have a slide with a layout you want to reuse, duplicating it is much faster than rebuilding the entire slide from scratch.",
        },
        {
          type: "paragraph",
          text:
            "To duplicate a slide, right-click the slide thumbnail in the Navigation Pane and choose Duplicate Slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_duplicate_slide.jpeg",
          alt: "Duplicate Slide command",
        },
        {
          type: "paragraph",
          text:
            "You can also copy and paste slides. This is useful when moving content between presentations or when you want even more control over placement.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_copy_slide.jpeg",
          alt: "Copying a slide thumbnail",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_paste_appear.jpeg",
          alt: "Pasted slide appears in navigation pane",
        },
      ],
    },

    {
      heading: "Reordering Slides",
      blocks: [
        {
          type: "paragraph",
          text:
            "As your presentation grows, you may decide that some slides belong earlier or later in the sequence.",
        },
        {
          type: "paragraph",
          text:
            "To reorder slides, click and drag a slide thumbnail in the Navigation Pane. A horizontal insertion line shows where the slide will be placed.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_move_slide.jpeg",
          alt: "Dragging slide to new position",
        },
        {
          type: "paragraph",
          text:
            "Reordering slides is one of the easiest ways to improve the flow of your presentation without changing the content itself.",
        },
      ],
    },

    {
      heading: "Applying a Theme",
      blocks: [
        {
          type: "paragraph",
          text:
            "Themes give your presentation a consistent visual style by applying coordinated colors, fonts, and background styles across all slides.",
        },
        {
          type: "paragraph",
          text:
            "To apply a theme, go to the Design tab and select one of the available theme thumbnails.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_select_theme.png",
          alt: "Selecting a theme from the Design tab",
        },
        {
          type: "paragraph",
          text:
            "Once applied, the theme updates the appearance of your presentation instantly.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_applied_theme.jpeg",
          alt: "Theme applied to presentation",
        },
      ],
    },

    {
      heading: "Formatting the Background",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you want to customize the appearance of a slide even more, you can modify the slide background.",
        },
        {
          type: "paragraph",
          text:
            "Use the Format Background command to choose a solid fill, gradient, texture, or picture background.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_format_background.png",
          alt: "Format Background command",
        },
        {
          type: "paragraph",
          text:
            "You can then select the background fill style and choose a color or other formatting option.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_background_fill.png",
          alt: "Background fill options",
        },
        {
          type: "paragraph",
          text:
            "If you want the same background on every slide, click Apply to All.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_format_apply_to_all.jpeg",
          alt: "Apply background formatting to all slides",
        },
      ],
    },

    {
      heading: "Changing Slide Size",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint allows you to choose between Standard (4:3) and Widescreen (16:9) slide sizes.",
        },
        {
          type: "paragraph",
          text:
            "Widescreen is the more modern format and is commonly used for classroom projectors, TVs, and online presentations.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_slide_size.png",
          alt: "Slide size options in PowerPoint",
        },
      ],
    },

    {
      heading: "Completed Presentation Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "After adding slides, choosing layouts, inserting text, duplicating content, and applying theme changes, your presentation will start to look polished and organized.",
        },
        {
          type: "paragraph",
          text:
            "The completed practice file gives a good example of how a simple presentation can become much more visually effective once these slide basics are applied.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slide-basics/slide-basics_final_result.png",
          alt: "Completed PowerPoint presentation example",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is a layout in PowerPoint?",
          options: [
            "A theme that changes the fonts and colors of a presentation",
            "A color palette used across all slides",
            "A pre-arranged set of placeholders for content on a slide",
            "A saved view that shows all slides at once",
          ],
          correctIndex: 2,
          explanation: "A layout is a pre-arranged set of placeholders defining where content sits on a slide. Because placeholder positions come from the Slide Master, using layouts keeps every slide aligned consistently.",
          optionRationales: [
            "That describes a theme, which sets colors and fonts across the whole presentation. A layout arranges content areas.",
            "A color palette is part of the theme. Layouts govern arrangement, not color.",
            "Correct. A layout is a pre-arranged set of placeholders for a slide's content.",
            "That describes Slide Sorter view. A layout is a property of a slide rather than a way of viewing the deck.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks using the practice presentation:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a new slide into the presentation.",
        "Change the layout of one slide.",
        "Add a text box to a blank slide.",
        "Move or resize a placeholder.",
        "Duplicate one of the existing slides.",
        "Reorder a slide in the Navigation Pane.",
        "Apply a theme to the presentation.",
        "Change the background formatting and apply it to all slides.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-1/slide-basics/slide-basics_final_result.png",
      alt: "Final result for slide basics challenge",
    },
  ],
},

];