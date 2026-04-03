import { Lesson } from "@/types/lesson";

export const powerpointModule1Lessons: Lesson[] = [

{
  slug: "getting-started-with-powerpoint",
  title: "Getting Started with PowerPoint",
  description:
    "Learn your way around the PowerPoint interface including the Ribbon, Quick Access Toolbar, slide views, zoom controls, and Backstage view.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/k6pg4nZS6fA",

  practiceFiles: [],

  sections: [

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
  duration: "8 min",

  sections: [

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
  heading: "Saving a Presentation",
  blocks: [
    {
      type: "paragraph",
      text:
        "Saving protects your work and allows you to reopen your presentation later. You can save files to your computer or to OneDrive.",
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
        "The Save command stores the current presentation using the same file name and location.",
    },
    {
      type: "paragraph",
      text:
        "If the presentation has never been saved before, PowerPoint will automatically open the Save As screen.",
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
        "Save As allows you to create a new version of a presentation or save it to a different location.",
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
        "When saving a presentation you must provide a file name. Use descriptive names so you can easily identify presentations later.",
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
        "PowerPoint allows you to save presentations in multiple file formats including PowerPoint Presentation (.pptx), PowerPoint Show, or PDF.",
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
        "The Export section allows you to convert presentations into different formats such as PDF or video.",
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
        "If a presentation is stored on OneDrive, you can share it directly with others from within PowerPoint.",
    },
    {
      type: "paragraph",
      text:
        "You can invite people to view or edit the presentation by entering their email address.",
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
        "If PowerPoint closes unexpectedly, you may be able to recover work that was not saved.",
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
        "When PowerPoint restarts after a crash, the Document Recovery pane may appear showing versions of your presentation that can be restored.",
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
        "PowerPoint includes settings that control how presentations are saved. You can adjust AutoRecover settings and default save locations.",
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