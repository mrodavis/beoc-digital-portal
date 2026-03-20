import { Lesson } from "@/types/lesson";

export const powerpointModule4Lessons: Lesson[] = [
{
  slug: "managing-slides",
  title: "Managing Slides",
  description:
    "Learn how to organize slides using slide views, notes, and sections to manage large presentations more effectively.",
  duration: "11 min",
  videoUrl: "https://www.youtube.com/embed/UmOJXAr_riE",

  practiceFiles: [
    {
      name: "Managing Slides Practice File",
      url: "/practice/powerpoint/module-4/managing-slides/Powerpoint_ManagingSlides_Practice.pptx",
    },
  ],

  sections: [

    {
      heading: "Slide Views",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint includes several slide views that help you work with slides in different ways.",
        },
        {
          type: "paragraph",
          text:
            "The slide view buttons are located in the bottom-right corner of the PowerPoint window.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_slide_views.png",
          alt: "Slide view buttons in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Each view provides a different way to work with slides, including editing, organizing, and presenting your presentation.",
        },
        {
          type: "paragraph",
          text:
            "As presentations grow larger, switching to the right view becomes more important. Instead of doing everything in one workspace, PowerPoint gives you different ways to focus on structure, content, notes, and delivery.",
        },
      ],
    },

    {
      heading: "Normal View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Normal View is the default editing view used when creating and editing slides.",
        },
        {
          type: "paragraph",
          text:
            "This view displays the current slide in the center, slide thumbnails on the left, and the notes pane below the slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_normal_view.png",
          alt: "Normal view in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "You can also drag slides in the navigation pane to quickly change their order.",
        },
        {
          type: "paragraph",
          text:
            "Normal View is best when you are actively building content, editing text, inserting media, and making detailed slide changes. It is the main work area most users spend the majority of their time in.",
        },
      ],
    },

    {
      heading: "Slide Sorter View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Slide Sorter View displays all slides as thumbnails so you can easily rearrange them.",
        },
        {
          type: "paragraph",
          text:
            "This view is helpful when organizing presentations with many slides.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_thumbnail.jpeg",
          alt: "Slide sorter view showing slide thumbnails",
        },
        {
          type: "paragraph",
          text:
            "To move a slide, simply click and drag it to a new position.",
        },
        {
          type: "paragraph",
          text:
            "Slide Sorter View is especially useful when you want to look at the overall flow of a presentation. Instead of focusing on one slide at a time, you can step back and evaluate the sequence of ideas across the full deck.",
        },
      ],
    },

    {
      heading: "Reading View and Slide Show View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Reading View shows the presentation in a window while still allowing access to PowerPoint tools.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_reading_view.png",
          alt: "Reading view in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Slide Show View displays the presentation exactly as the audience will see it.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_slide_show_view.png",
          alt: "Slide show view in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Reading View is useful when you want to preview slides without fully entering presentation mode. Slide Show View is better when you want to rehearse or present the deck as a finished product.",
        },
      ],
    },

    {
      heading: "Outline View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Outline View displays the text from your slides in outline form.",
        },
        {
          type: "paragraph",
          text:
            "This makes it easier to review or edit the text from multiple slides at once.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_outline_view.png",
          alt: "Outline view command",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_outline_edit.png",
          alt: "Editing text in outline view",
        },
        {
          type: "paragraph",
          text:
            "Outline View is ideal when you want to focus on the presentation’s message rather than its design. It helps you see whether your slides are logically organized and whether the text communicates your ideas clearly.",
        },
      ],
    },

    {
      heading: "Adding Notes",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can add notes to slides using the Notes pane below the slide.",
        },
        {
          type: "paragraph",
          text:
            "Notes are often used as speaker notes to help presenters remember what to say.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_notes_pane.png",
          alt: "Opening the notes pane",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_notes.png",
          alt: "Typing notes in the notes pane",
        },
        {
          type: "paragraph",
          text:
            "Speaker notes are not usually shown to the audience during a presentation, so they can include reminders, talking points, or extra detail that supports your delivery.",
        },
      ],
    },

    {
      heading: "Notes Page View",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can also view notes in Notes Page view.",
        },
        {
          type: "paragraph",
          text:
            "This view shows the slide at the top with a large area below it where you can edit notes.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_notes_page_view.png",
          alt: "Notes page view",
        },
        {
          type: "paragraph",
          text:
            "Notes Page View gives you more room to work with presenter notes than the standard Notes pane. This can be helpful when a slide needs more detailed speaking guidance.",
        },
      ],
    },

    {
      heading: "Creating Slide Sections",
      blocks: [
        {
          type: "paragraph",
          text:
            "When presentations contain many slides, sections can help organize them into groups.",
        },
        {
          type: "paragraph",
          text:
            "To create a section, select a slide, click the Section command on the Home tab, and choose Add Section.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_add_section.png",
          alt: "Add section command",
        },
        {
          type: "paragraph",
          text:
            "A new Untitled Section will appear in the slide navigation pane.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_untitled_section.png",
          alt: "Untitled section in slide pane",
        },
        {
          type: "paragraph",
          text:
            "Sections are especially useful for large presentations because they break the deck into smaller parts. Instead of managing one long slide list, you can organize slides by topic, audience, or stage of the presentation.",
        },
      ],
    },

    {
      heading: "Renaming Sections",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can rename a section to better describe the slides it contains.",
        },
        {
          type: "paragraph",
          text:
            "Click the Section command and choose Rename Section.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_rename_section.png",
          alt: "Rename section command",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_rename_dialog.png",
          alt: "Rename section dialog",
        },
        {
          type: "paragraph",
          text:
            "Clear section names make a presentation easier to navigate, especially when you revisit the file later or share it with another presenter.",
        },
      ],
    },

    {
      heading: "Collapsing and Removing Sections",
      blocks: [
        {
          type: "paragraph",
          text:
            "Sections can be collapsed in the slide navigation pane to hide slides inside them.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_collapse_section.png",
          alt: "Collapsed slide section",
        },
        {
          type: "paragraph",
          text:
            "If you no longer need a section, you can remove it using the Section command.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_remove_section.png",
          alt: "Remove section command",
        },
        {
          type: "paragraph",
          text:
            "Collapsing sections helps reduce clutter in the navigation pane so you can focus on the part of the presentation you are currently editing. Removing a section deletes the grouping, but it does not automatically delete the slides inside it.",
        },
      ],
    },

    {
      heading: "Completed Presentation Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "After organizing slides into sections and adding notes, the presentation becomes easier to navigate and manage.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/managing-slides/managing-slides_final_result.png",
          alt: "Completed slide organization",
        },
        {
          type: "paragraph",
          text:
            "A well-organized presentation saves time during editing, makes it easier to prepare for delivery, and helps you stay in control as your slide deck grows.",
        },
      ],
    },

    {
      heading: "Pro Tip",
      blocks: [
        {
          type: "callout",
          variant: "success",
          text:
            "When a presentation starts getting long, do not wait until the end to organize it. Add sections as you build so the file stays clean and manageable from the start.",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which view is best for rearranging slides quickly?",
          options: [
            "Reading View",
            "Slide Sorter View",
            "Notes Page View",
            "Slide Show View",
          ],
          correctIndex: 1,
        },
        {
          type: "knowledge-check",
          question: "What are slide notes mainly used for?",
          options: [
            "Changing the design of a slide",
            "Adding speaker reminders and talking points",
            "Animating slide transitions",
            "Creating new sections",
          ],
          correctIndex: 1,
        },
        {
          type: "knowledge-check",
          question: "What is the main benefit of using sections?",
          options: [
            "They automatically animate slides",
            "They print slides faster",
            "They organize large presentations into groups",
            "They replace slide layouts",
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
        "Open the practice presentation.",
        "Create a section for the first slide and name it Introduction.",
        "Create a section named Dogs beginning with the slide 'Man's Best Friend'.",
        "Create a section named Cats & More beginning with the slide 'The Little Things in Life'.",
        "Move the slide titled 'Pogo' so it appears in the Dogs section.",
        "Switch to Outline View.",
        "Add a note on slide 4 that says 'Move before slide 3 or delete'.",
        "Switch back to Normal View.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-4/managing-slides/managing-slides_final_result.png",
      alt: "Final challenge result",
    },
  ],
},

{
  slug: "printing-presentations",
  title: "Printing Presentations",
  description:
    "Learn how to print slides, handouts, and notes pages, and understand PowerPoint’s print settings for different presentation needs.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/fzuHplbKD9A",

  practiceFiles: [
    {
      name: "Printing Practice File",
      url: "/practice/powerpoint/module-4/printing/Powerpoint_Printing_Practice.pptx",
    },
  ],

  sections: [

    {
      heading: "Accessing the Print Screen",
      blocks: [
        {
          type: "paragraph",
          text:
            "To print a presentation, open the File tab to enter Backstage view, then select Print. This opens the print workspace where you can preview and adjust all print settings.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_tab.png",
          alt: "Print option selected in PowerPoint File tab",
        },
        {
          type: "paragraph",
          text:
            "The Print screen shows a live preview of your slides on the right and printing options on the left.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_print_pane.png",
          alt: "Print pane with preview and settings",
        },
      ],
    },

    {
      heading: "Understanding Print Settings",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint provides several print settings that allow you to control how your presentation will appear when printed.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_print_options.png",
          alt: "Print settings options in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "You can choose the number of copies, select a printer, and decide whether to print all slides or a specific range.",
        },
        {
          type: "paragraph",
          text:
            "Additional settings allow you to control slide layout, orientation, and whether the presentation prints in color or grayscale.",
        },
      ],
    },

    {
      heading: "Print Layout Types",
      blocks: [
        {
          type: "paragraph",
          text:
            "One of the most important decisions when printing is choosing the correct layout. PowerPoint offers several formats depending on how the presentation will be used.",
        },

        {
          type: "paragraph",
          text: "Full Page Slides print one slide per page and are ideal for reviewing or sharing individual slides.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_full_page.png",
          alt: "Full page slide printing example",
        },

        {
          type: "paragraph",
          text:
            "Handouts allow you to print multiple slides per page. This is useful for audiences who want to follow along during a presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_handout.png",
          alt: "Handout layout with multiple slides per page",
        },

        {
          type: "paragraph",
          text:
            "Notes Pages include each slide along with speaker notes beneath it. This is helpful when presenting or reviewing detailed talking points.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_notes_page.png",
          alt: "Notes page with slide and speaker notes",
        },

        {
          type: "paragraph",
          text:
            "Outline view prints only the text from your slides, making it useful for reviewing the structure of your presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_outline.png",
          alt: "Outline view showing text-only slide content",
        },

        {
          type: "tip",
          text:
            "If you're presenting to an audience, print handouts with 3 slides per page so viewers can take notes during your presentation.",
        },
      ],
    },

    {
      heading: "Using Print Preview",
      blocks: [
        {
          type: "paragraph",
          text:
            "Before printing, always review the print preview to ensure your slides appear correctly. This helps avoid issues such as incorrect layouts or cut-off content.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_print_layout.png",
          alt: "Print preview showing slide layout",
        },
      ],
    },

    {
      heading: "Printing Your Presentation",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once your settings are configured, click the Print button to print your presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_print_command.png",
          alt: "Print button in PowerPoint",
        },
      ],
    },

    {
      heading: "Completed Output Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "A properly printed presentation should match your selected layout and provide a clear, readable format for your audience.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-4/printing/printing_final_result.png",
          alt: "Final printed presentation example",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question:
            "Which print layout includes space for audience notes beside each slide?",
          options: [
            "Full Page Slides",
            "Notes Pages",
            "Handouts",
            "Outline",
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
        "Open the practice presentation.",
        "Go to File and select Print.",
        "Change the print layout to Handouts (3 slides per page).",
        "Preview the print layout.",
        "Switch to Notes Pages view.",
        "Return to Handouts layout.",
        "Print the presentation or export it as a PDF.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-4/printing/printing_final_result.png",
      alt: "Final printed handout example",
    },
  ],
},

];