import { Lesson } from "@/types/lesson";

export const powerpointModule1Lessons: Lesson[] = [

{
  slug: "getting-started-with-powerpoint",
  title: "Getting Started with PowerPoint",
  description:
    "Learn your way around the PowerPoint interface including the Ribbon, Backstage view, Quick Access Toolbar, slide pane, and presentation views.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/FyP5f0pR4nA",

  practiceFiles: [],

  sections: [

    {
      heading: "The PowerPoint Interface",
      blocks: [
        {
          type: "paragraph",
          text:
            "When you open PowerPoint, you’ll see a presentation made up of slides. The interface includes the slide canvas, slide thumbnails, and the Ribbon where most commands live.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/interface/powerpoint_interface.png",
          alt: "PowerPoint interface overview",
        },
      ],
    },

    {
      heading: "Understanding the Ribbon",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Ribbon organizes PowerPoint commands into tabs such as Home, Insert, Design, Transitions, Animations, Slide Show, Review, and View.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/interface/powerpoint_ribbon_tabs.png",
          alt: "PowerPoint ribbon tabs",
        },
        {
          type: "paragraph",
          text:
            "Each tab contains command groups with related tools. For example, the Home tab contains Clipboard, Slides, Font, and Paragraph groups.",
        },
      ],
    },

    {
      heading: "Backstage View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the File tab to open Backstage view. This is where you manage files including opening presentations, saving files, printing slides, and sharing presentations.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/interface/powerpoint_backstage_view.png",
          alt: "PowerPoint backstage view",
        },
      ],
    },

    {
      heading: "Quick Access Toolbar",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Quick Access Toolbar appears in the upper-left corner and provides fast access to commonly used commands such as Save, Undo, and Redo.",
        },
        {
          type: "paragraph",
          text:
            "You can customize the toolbar by adding commands you use frequently.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/interface/powerpoint_quick_access_toolbar.png",
          alt: "Quick access toolbar",
        },
      ],
    },

    {
      heading: "Slide Pane & Slide Workspace",
      blocks: [
        {
          type: "paragraph",
          text:
            "The slide thumbnails appear on the left side of the screen. This pane allows you to navigate between slides and reorder them easily.",
        },
        {
          type: "paragraph",
          text:
            "The large central area is the slide workspace where you edit the contents of your slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-1/interface/powerpoint_slide_workspace.png",
          alt: "Slide editing workspace",
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
        "Identify the slide thumbnails pane.",
        "Locate the Ribbon tabs.",
        "Open Backstage view and return to the presentation.",
        "Customize the Quick Access Toolbar.",
        "Switch between two slides in the slide pane.",
      ],
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