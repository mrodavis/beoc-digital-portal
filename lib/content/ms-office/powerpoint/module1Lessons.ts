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
    "Learn how to sign in to PowerPoint, connect to OneDrive, and store presentations in the cloud.",
  duration: "6 min",

  sections: [

    {
      heading: "Signing In to PowerPoint",
      blocks: [
        {
          type: "paragraph",
          text:
            "To use OneDrive and collaboration features, sign in using your Microsoft account. Click the Sign In button in the top-right corner.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/onedrive/powerpoint_signin.png",
          alt: "PowerPoint sign in",
        },
      ],
    },

    {
      heading: "Saving Presentations to OneDrive",
      blocks: [
        {
          type: "paragraph",
          text:
            "Saving presentations to OneDrive allows you to access them from any computer, tablet, or phone.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/onedrive/powerpoint_save_onedrive.png",
          alt: "Save presentation to OneDrive",
        },
        {
          type: "paragraph",
          text:
            "Once saved, presentations can be shared and edited collaboratively.",
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
        "Save a presentation to OneDrive.",
        "Locate the presentation in OneDrive online.",
        "Share the presentation with another user.",
      ],
    },
  ],
},

{
  slug: "creating-and-opening-presentations",
  title: "Creating and Opening Presentations",
  description:
    "Learn how to create presentations, use templates, and open existing PowerPoint files.",
  duration: "9 min",
  videoUrl: "https://www.youtube.com/embed/V8C-9vJzV1M",

  practiceFiles: [
    {
      name: "PowerPoint Practice Presentation",
      url: "/practice/powerpoint/module-1/creating-opening/PowerPoint_CreatingOpening_Practice.pptx",
    },
  ],

  sections: [

    {
      heading: "Creating a New Presentation",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click File → New to create a new presentation. You can start with a blank presentation or choose a template.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/new_presentation.png",
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
            "Templates provide professionally designed layouts, fonts, and colors for presentations.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/powerpoint_templates.png",
          alt: "PowerPoint templates",
        },
      ],
    },

    {
      heading: "Opening Existing Presentations",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click File → Open to access recent presentations or browse your computer.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/creating-opening/open_recent.png",
          alt: "Open recent presentations",
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
        "Create a new blank presentation.",
        "Choose a presentation template.",
        "Open an existing presentation.",
        "Pin a presentation to the Recent list.",
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