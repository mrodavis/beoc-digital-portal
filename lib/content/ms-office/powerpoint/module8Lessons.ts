import { Lesson } from "@/types/lesson";

export const powerpointModule8Lessons: Lesson[] = [

{
  slug: "checking-spelling-and-comments",
  title: "Checking Spelling & Using Comments",
  description:
    "Learn how to run a spell check, use the built-in thesaurus, add and review comments, and use Track Changes tools to collaborate and polish your presentation before delivery.",
  duration: "8 min",
  videoUrl: "",

  practiceFiles: [
    {
      name: "Review Practice File",
      url: "/practice/powerpoint/module-8/review/Powerpoint_Review_Practice.pptx",
    },
  ],

  sections: [

    {
      heading: "Why Review Before You Present?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Spelling errors and unclear slide content can undermine your credibility with an audience. A final review ensures your presentation is polished, accurate, and ready to deliver.",
        },
        {
          type: "paragraph",
          text:
            "PowerPoint's Review tab contains all the tools you need to check spelling, look up synonyms, and collaborate with colleagues using comments.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_tab_ribbon.png",
          alt: "Review tab on the PowerPoint ribbon",
        },
      ],
    },

    {
      heading: "Running Spell Check",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint checks spelling as you type, marking errors with a red wavy underline. You can also run a full spell check when you're ready to review everything at once.",
        },
        {
          type: "paragraph",
          text:
            "Go to the Review tab and click Spelling. PowerPoint will scan your entire presentation and stop at each error.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_spelling_ribbon.png",
          alt: "Spelling button on the Review tab",
        },
        {
          type: "paragraph",
          text:
            "The Spelling pane shows the flagged word along with suggested corrections. You can choose to change the word, ignore it once, or ignore all occurrences.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_spelling_pane.png",
          alt: "Spelling pane with suggestions in PowerPoint",
        },
        {
          type: "tip",
          text:
            "Right-click any underlined word directly on the slide to see spelling suggestions without opening the full Spelling pane.",
        },
      ],
    },

    {
      heading: "Using the Thesaurus",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Thesaurus helps you find more precise or varied word choices for your slide content.",
        },
        {
          type: "paragraph",
          text:
            "Select a word on your slide, then click Thesaurus on the Review tab. The Thesaurus pane opens with a list of synonyms.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_thesaurus_pane.png",
          alt: "Thesaurus pane showing synonyms for a selected word",
        },
        {
          type: "paragraph",
          text:
            "Hover over a synonym and click the arrow to insert it directly as a replacement for the selected word.",
        },
      ],
    },

    {
      heading: "Adding Comments",
      blocks: [
        {
          type: "paragraph",
          text:
            "Comments let you add notes to specific parts of a slide without affecting the slide content itself. This is useful for your own reminders or for collaborating with a colleague.",
        },
        {
          type: "paragraph",
          text:
            "To add a comment, select the object or text you want to comment on, go to the Review tab, and click New Comment.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_new_comment.png",
          alt: "New Comment button on the Review tab",
        },
        {
          type: "paragraph",
          text:
            "A comments pane opens where you can type your note. A small comment icon appears on the slide near the object you commented on.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_comment_icon.png",
          alt: "Comment icon visible on a slide",
        },
      ],
    },

    {
      heading: "Reviewing and Replying to Comments",
      blocks: [
        {
          type: "paragraph",
          text:
            "To read all comments in a presentation, open the Comments pane from the Review tab. Use the Previous and Next buttons to navigate between comments.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_comments_pane.png",
          alt: "Comments pane showing all comments in the presentation",
        },
        {
          type: "paragraph",
          text:
            "You can reply to any comment by clicking inside it and typing your response. This creates a threaded conversation visible to anyone who opens the file.",
        },
      ],
    },

    {
      heading: "Resolving and Deleting Comments",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once a comment has been addressed, you can resolve it to mark it as done without deleting it, or delete it entirely.",
        },
        {
          type: "paragraph",
          text:
            "To delete a comment, select it in the Comments pane and click Delete on the Review tab. To delete all comments in the presentation, use the Delete All Comments in Presentation option.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_delete_comment.png",
          alt: "Delete comment options on the Review tab",
        },
        {
          type: "callout",
          variant: "warning",
          text:
            "Always delete or resolve comments before delivering a presentation to a live audience. Comment icons visible on slides can distract your viewers.",
        },
      ],
    },

    {
      heading: "Comparing Presentations",
      blocks: [
        {
          type: "paragraph",
          text:
            "If a colleague has sent back a revised version of your file, the Compare tool lets you merge their changes into your version and review each one.",
        },
        {
          type: "paragraph",
          text:
            "Click Compare on the Review tab, select the revised file, and PowerPoint highlights every difference between the two versions.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/review/review_compare_ribbon.png",
          alt: "Compare button on the Review tab",
        },
        {
          type: "paragraph",
          text:
            "Use the Revisions pane to accept or reject individual changes, then click End Review when finished.",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What should you do with all comments before presenting to a live audience?",
          options: [
            "Print them as handouts",
            "Convert them to footnotes",
            "Delete or resolve them so they are not visible on slide",
            "Move them to the Notes pane",
          ],
          correctIndex: 2,
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Run a full Spell Check from the Review tab and correct any errors found.",
        "On slide 2, select the word in the title and use the Thesaurus to find and apply a stronger synonym.",
        "Add a comment to slide 3 noting that the chart data needs to be updated.",
        "Navigate to slide 4 and reply to the existing comment with a short confirmation.",
        "Delete all comments from the presentation so it is ready to present.",
      ],
    },
  ],

},

{
  slug: "presenting-your-slideshow",
  title: "Presenting Your Slideshow",
  description:
    "Learn how to start a slide show, navigate slides during a presentation, use Presenter View, draw on slides, and use the laser pointer to guide your audience.",
  duration: "10 min",
  videoUrl: "",

  practiceFiles: [
    {
      name: "Presenting Practice File",
      url: "/practice/powerpoint/module-8/presenting/Powerpoint_Presenting_Practice.pptx",
    },
  ],

  sections: [

    {
      heading: "Starting a Slide Show",
      blocks: [
        {
          type: "paragraph",
          text:
            "When you're ready to present, PowerPoint offers several ways to start your slide show.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "From Beginning — starts the presentation from the first slide (F5).",
            "From Current Slide — starts from whichever slide is currently selected (Shift+F5).",
            "Custom Slide Show — presents a subset of slides in a custom order.",
          ],
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_start_options.png",
          alt: "Slide Show start options on the Slide Show tab",
        },
        {
          type: "paragraph",
          text:
            "You can also click the Slide Show view button in the lower-right corner of the PowerPoint window to start from the current slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_view_button.png",
          alt: "Slide Show view button in the status bar",
        },
      ],
    },

    {
      heading: "Navigating During a Presentation",
      blocks: [
        {
          type: "paragraph",
          text:
            "During a slide show, you can advance slides using the mouse, arrow keys, spacebar, or Page Down. Go back with the left arrow key or Page Up.",
        },
        {
          type: "paragraph",
          text:
            "Right-click anywhere during the presentation to access a shortcut menu with navigation options, including Go to Slide, which lets you jump directly to any slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_right_click_menu.png",
          alt: "Right-click navigation menu during a slide show",
        },
        {
          type: "tip",
          text:
            "Press a slide number followed by Enter to jump directly to that slide (e.g., press 5 then Enter to go to slide 5).",
        },
      ],
    },

    {
      heading: "Using Presenter View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Presenter View is a professional presenting mode that shows your slide on the audience's screen while you see a private view with the current slide, upcoming slide, speaker notes, and a timer.",
        },
        {
          type: "paragraph",
          text:
            "Enable it by checking Use Presenter View on the Slide Show tab before starting.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_presenter_view_toggle.png",
          alt: "Use Presenter View checkbox on the Slide Show tab",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_presenter_view.png",
          alt: "Presenter View layout showing current slide, next slide, and speaker notes",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "Presenter View requires two displays — your laptop screen and a projector or external monitor. It only works when PowerPoint detects a second screen.",
        },
      ],
    },

    {
      heading: "Speaker Notes",
      blocks: [
        {
          type: "paragraph",
          text:
            "Speaker notes appear in the Notes pane below each slide and are visible only to you in Presenter View. Use them to store reminders, talking points, or key statistics.",
        },
        {
          type: "paragraph",
          text:
            "To add notes, click in the Notes pane at the bottom of Normal View and type your content.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_notes_pane.png",
          alt: "Notes pane below a slide in Normal View",
        },
        {
          type: "paragraph",
          text:
            "You can also print speaker notes as handouts using File → Print → Notes Pages.",
        },
      ],
    },

    {
      heading: "Using the Laser Pointer",
      blocks: [
        {
          type: "paragraph",
          text:
            "During a slide show, you can simulate a laser pointer to draw your audience's attention to specific areas of a slide.",
        },
        {
          type: "paragraph",
          text:
            "Hold Ctrl and press the left mouse button to activate the laser pointer. Move the mouse to point to any area on the slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_laser_pointer.png",
          alt: "Laser pointer active during a presentation",
        },
      ],
    },

    {
      heading: "Drawing on Slides During a Presentation",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint's Pen and Highlighter tools let you draw or annotate on slides during a presentation.",
        },
        {
          type: "paragraph",
          text:
            "Right-click during the slide show, choose Pointer Options, and then select Pen or Highlighter.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_pen_tool.png",
          alt: "Pointer Options menu with Pen and Highlighter options",
        },
        {
          type: "paragraph",
          text:
            "At the end of the show, PowerPoint asks if you want to keep your ink annotations. You can keep them on the slides or discard them.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_keep_ink.png",
          alt: "Dialog asking whether to keep ink annotations",
        },
        {
          type: "tip",
          text:
            "Press E to erase all pen marks on the current slide during a live presentation.",
        },
      ],
    },

    {
      heading: "Hiding Slides",
      blocks: [
        {
          type: "paragraph",
          text:
            "Sometimes you create slides with extra content that you only want to show if an audience member asks. Hidden slides stay in the file but are skipped automatically during the normal slide show.",
        },
        {
          type: "paragraph",
          text:
            "Right-click a slide in the slide panel and select Hide Slide, or use the Hide Slide button on the Slide Show tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_hide_slide.png",
          alt: "Hide Slide option in the right-click menu",
        },
        {
          type: "paragraph",
          text:
            "Hidden slides are indicated with a strikethrough number in the slide panel. To jump to a hidden slide during a presentation, type its number and press Enter.",
        },
      ],
    },

    {
      heading: "Ending a Slide Show",
      blocks: [
        {
          type: "paragraph",
          text:
            "Press Escape at any time to exit the slide show and return to the Normal editing view.",
        },
        {
          type: "paragraph",
          text:
            "If you have reached the last slide, a black end screen appears. Press Escape or click the screen to exit.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/presenting/presenting_end_of_show.png",
          alt: "End of slide show black screen",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What keyboard shortcut starts a slide show from the beginning?",
          options: [
            "Ctrl+P",
            "F5",
            "Shift+F5",
            "Ctrl+F5",
          ],
          correctIndex: 1,
        },
        {
          type: "knowledge-check",
          question: "What does Presenter View show that the audience screen does not?",
          options: [
            "The slide theme",
            "All slide animations",
            "Speaker notes, the next slide, and a timer",
            "The file name and save location",
          ],
          correctIndex: 2,
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Add brief speaker notes to at least three slides.",
        "Hide the last slide in the presentation.",
        "Start the slide show From Beginning using F5.",
        "Advance through the first three slides using the spacebar.",
        "Right-click and use Go to Slide to jump directly to slide 5.",
        "Activate the Pen tool and circle one key item on the slide.",
        "Press E to erase your ink marks.",
        "Press Escape to exit the slide show.",
        "Confirm that the last slide is still hidden by checking the slide panel.",
      ],
    },
  ],

},

{
  slug: "sharing-and-exporting",
  title: "Sharing and Exporting Presentations",
  description:
    "Learn how to share your presentation via OneDrive, export it as a PDF, create a video from your slides, and package your file for delivery on another computer.",
  duration: "9 min",
  videoUrl: "",

  practiceFiles: [],

  sections: [

    {
      heading: "Why Sharing and Exporting Matter",
      blocks: [
        {
          type: "paragraph",
          text:
            "A great presentation needs to reach your audience in the right format. Sometimes that means sharing a live editable file; other times you need a locked PDF or a self-contained video that can play anywhere.",
        },
        {
          type: "paragraph",
          text:
            "PowerPoint provides several options for getting your file out of your computer and into the hands of your audience.",
        },
      ],
    },

    {
      heading: "Sharing via OneDrive",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Share button in the upper-right corner of PowerPoint lets you invite people to view or edit your presentation using OneDrive.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_share_button.png",
          alt: "Share button in the upper-right corner of PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Before sharing, PowerPoint may ask you to save the file to OneDrive if it hasn't been saved there already.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_onedrive_prompt.png",
          alt: "Prompt to save file to OneDrive before sharing",
        },
        {
          type: "paragraph",
          text:
            "Enter email addresses, choose whether recipients can edit or only view, and optionally add a message before clicking Send.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_share_pane.png",
          alt: "Share pane with email invitation fields",
        },
        {
          type: "tip",
          text:
            "Use Can View instead of Can Edit when sharing with clients or stakeholders who should not modify the presentation.",
        },
      ],
    },

    {
      heading: "Sending as an Email Attachment",
      blocks: [
        {
          type: "paragraph",
          text:
            "To attach the presentation directly to an email, go to File → Share → Email and choose one of the send options.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_email_options.png",
          alt: "Email sharing options in Backstage view",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Send as Attachment — attaches the editable .pptx file.",
            "Send as PDF — converts and attaches a PDF version.",
            "Send as XPS — attaches an XPS document (similar to PDF).",
          ],
        },
      ],
    },

    {
      heading: "Exporting as a PDF",
      blocks: [
        {
          type: "paragraph",
          text:
            "A PDF version of your presentation preserves formatting exactly as you designed it and can be opened on any device without PowerPoint installed.",
        },
        {
          type: "paragraph",
          text:
            "Go to File → Export → Create PDF/XPS. Choose a location, confirm the file name, and click Publish.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_export_pdf.png",
          alt: "Create PDF/XPS dialog in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Click Options before publishing to control what is included — all slides, a range of slides, or hidden slides.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_pdf_options.png",
          alt: "PDF options dialog showing slide range settings",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "PDF is the best format to use when you need recipients to view but not edit your presentation.",
        },
      ],
    },

    {
      heading: "Creating a Video from Your Presentation",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint can export your entire presentation — including animations and transitions — as a standalone video file that plays without PowerPoint.",
        },
        {
          type: "paragraph",
          text:
            "Go to File → Export → Create a Video. Choose the display quality, set how long each slide appears, and click Create Video.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_create_video.png",
          alt: "Create a Video export options in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "PowerPoint will render the video and save it as an MP4 or WMV file. This can be shared, uploaded to a website, or played at a kiosk.",
        },
        {
          type: "tip",
          text:
            "For most purposes choose Full HD (1080p). Use Presentation HD (720p) only if file size is a concern.",
        },
      ],
    },

    {
      heading: "Packaging a Presentation for Delivery",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you need to present on a computer that may not have PowerPoint — or if your presentation uses linked media files — use Package Presentation for CD.",
        },
        {
          type: "paragraph",
          text:
            "Go to File → Export → Package Presentation for CD. This bundles your presentation, all linked media, and the PowerPoint Viewer into a single folder you can copy to a USB drive.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_package_for_cd.png",
          alt: "Package Presentation for CD dialog",
        },
        {
          type: "callout",
          variant: "warning",
          text:
            "Despite the name, you do not need an actual CD. Copy to Folder saves everything to a location you choose, such as a USB drive or a network folder.",
        },
      ],
    },

    {
      heading: "Marking a Presentation as Final",
      blocks: [
        {
          type: "paragraph",
          text:
            "Mark as Final signals to recipients that the presentation is complete and discourages further editing. It sets the file to read-only and displays an information banner.",
        },
        {
          type: "paragraph",
          text:
            "Go to File → Info → Protect Presentation → Mark as Final.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-8/sharing/sharing_mark_as_final.png",
          alt: "Mark as Final option in Backstage view",
        },
        {
          type: "callout",
          variant: "warning",
          text:
            "Mark as Final is not a security feature. Any recipient can click Edit Anyway to remove the restriction and modify the file.",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which export format preserves slide formatting and can be opened without PowerPoint?",
          options: [
            ".pptx",
            ".docx",
            "PDF",
            ".xlsx",
          ],
          correctIndex: 2,
        },
        {
          type: "knowledge-check",
          question: "What is the primary purpose of Package Presentation for CD?",
          options: [
            "To compress the file for email",
            "To bundle the presentation and media into a portable folder for use on other computers",
            "To convert the presentation to a video",
            "To share the file on OneDrive",
          ],
          correctIndex: 1,
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Export the presentation as a PDF. Make sure only slides 1 through 5 are included.",
        "Export the presentation as a Full HD (1080p) video with each slide set to display for 5 seconds.",
        "Use Package Presentation for CD to copy the file to a folder on your Desktop named Presentation Package.",
        "Open the resulting folder and confirm it contains the presentation file and any associated media.",
        "Return to PowerPoint, go to File → Info, and Mark the presentation as Final.",
      ],
    },
  ],

},

];
