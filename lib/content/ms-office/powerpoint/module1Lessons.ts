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
    "Learn how to save presentations, change file types, and protect your work from data loss.",
  duration: "8 min",

  sections: [

    {
      heading: "Saving a Presentation",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click File → Save or Save As to store your presentation on your computer or OneDrive.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/saving/saving_presentation.png",
          alt: "Save presentation dialog",
        },
      ],
    },

    {
      heading: "Using AutoSave",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you store presentations on OneDrive, PowerPoint can automatically save changes in real time using AutoSave.",
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
        "Save a presentation to your computer.",
        "Save a presentation to OneDrive.",
        "Rename a saved presentation.",
      ],
    },
  ],
},

{
  slug: "slide-basics",
  title: "Slide Basics",
  description:
    "Learn how slides work in PowerPoint and how to organize presentation content effectively.",
  duration: "10 min",

  sections: [

    {
      heading: "Understanding Slides",
      blocks: [
        {
          type: "paragraph",
          text:
            "Slides are the individual pages of a PowerPoint presentation. Each slide can contain text, images, charts, and multimedia.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slides/slide_layout_example.png",
          alt: "Slide layout example",
        },
      ],
    },

    {
      heading: "Adding Slides",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the New Slide button on the Home tab to add additional slides.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slides/new_slide_button.png",
          alt: "New slide button",
        },
      ],
    },

    {
      heading: "Changing Slide Layouts",
      blocks: [
        {
          type: "paragraph",
          text:
            "Different layouts help organize slide content such as titles, images, and bullet points.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/slides/slide_layout_menu.png",
          alt: "Slide layout menu",
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
        "Insert a new slide.",
        "Change a slide layout.",
        "Reorder slides in the slide pane.",
        "Delete a slide.",
      ],
    },
  ],
}

];