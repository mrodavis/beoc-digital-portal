import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "intro-to-powerpoint-2019",
    title: "Introduction to Microsoft PowerPoint 2019",
    description:
      "Get oriented in the PowerPoint 2019 interface, understand slide views and layouts, learn to create and organize a presentation, and manage your files for professional distribution.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/k6pg4nZS6fA",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-01.jpg",
        alt: "Welcome to Microsoft PowerPoint 2019 — the presentation tool of every professional office",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-02.jpg",
        alt: "The PowerPoint Interface — Ribbon, Slide Panel, Notes Panel, and Status Bar",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-03.jpg",
        alt: "Slide Views — Normal, Outline, Slide Sorter, Reading View, and Presenter View",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-04.jpg",
        alt: "Creating a Presentation — blank presentation vs template gallery",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-05.jpg",
        alt: "Slide Layouts — choosing the right layout for each type of content",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-06.jpg",
        alt: "Managing Slides — adding, duplicating, deleting, and reordering in Slide Sorter",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-07.jpg",
        alt: "Saving Formats — .pptx vs .ppsx (slideshow) vs .pdf and when each is appropriate",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-08.jpg",
        alt: "Speaker Notes — adding presenter notes below each slide for delivery support",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct PowerPoint element or view for a given task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates has just handed you the staff orientation presentation files from last year — a 15-slide .pptx file that needs to be updated for new hires starting next month. Before you can update a single slide, you need to understand how PowerPoint is organized: where to find the slides panel, how to switch views to see the whole deck at once, how to add and delete slides safely, and how to save a version that runs automatically without needing someone to click through it at the kiosk in the waiting room. This lesson covers all of that.",
          },
        ],
      },
      {
        heading: "The PowerPoint 2019 Interface",
        blocks: [
          {
            type: "paragraph",
            text: "PowerPoint's interface is organized around the slide as the unit of content — everything is designed to help you create, view, arrange, and present individual slides efficiently. Understanding the interface's key zones is the first step toward working confidently in PowerPoint:",
          },
          {
            type: "list",
            items: [
              "The Ribbon in PowerPoint includes tabs designed specifically for presentation work — Home (basic formatting), Insert (everything you can add to a slide), Design (themes and visual settings), Transitions (slide-to-slide movement effects), Animations (how content enters and exits within a slide), Slide Show (presentation delivery settings), Review, and View. The Design and Animations tabs are unique to PowerPoint and contain the tools that most distinguish presentation work from document work.",
              "The Slide Panel on the left side of the Normal view shows thumbnail images of every slide in the presentation in order. Click any thumbnail to jump to that slide. Drag thumbnails up or down to reorder slides. Right-click a thumbnail for options to add, duplicate, delete, or hide slides. This panel is your primary navigation tool when working on a multi-slide presentation.",
              "The Notes Panel is the area below the main slide editing canvas where you type speaker notes — the talking points, data reminders, and cues that the presenter sees on their laptop screen during the presentation but the audience never sees. Every slide should have speaker notes in a professional presentation. Click and drag the divider between the canvas and the Notes Panel to make the notes area larger when writing detailed notes.",
              "The Status Bar at the bottom of the window shows the current slide number out of total slides (e.g., 'Slide 3 of 15'), the current view name, a zoom slider, and the Notes button for toggling the Notes Panel. The slide count indicator helps you understand how far through the deck you are at any moment.",
            ],
          },
        ],
      },
      {
        heading: "Slide Views and When to Use Each",
        blocks: [
          {
            type: "paragraph",
            text: "PowerPoint provides multiple ways to view your presentation, each designed for a specific stage of the creation process. Switching between views at the right time dramatically improves your workflow:",
          },
          {
            type: "list",
            items: [
              "Normal view is the primary editing view — it shows one slide at a time at full size in the center canvas, with the slide panel on the left and the notes panel below. This is where you spend most of your time building individual slides. Use Normal view whenever you are editing, formatting, or adding content to specific slides.",
              "Slide Sorter view (View > Slide Sorter or the icon at the bottom right of the screen) shows all slides as small thumbnails in a grid — giving you a bird's-eye view of the entire presentation's visual flow. Use Slide Sorter view when you need to reorder slides (drag and drop), delete multiple slides at once, or assess whether your slide design is visually consistent across the deck. You cannot edit slide content in Slide Sorter view — only reorganize the order.",
              "Outline view (View > Outline View) shows only the text content of each slide as a hierarchical text outline — no images, no design elements. This view is ideal for reviewing whether your presentation content tells a clear, logical story, and for making large-scale text revisions without distraction from the visual design. The outline is also useful for checking that every slide has a title and that the content hierarchy makes sense.",
              "Reading View presents the slideshow in a window (not full screen) with simple forward/back navigation — useful for reviewing the presentation as a viewer experience without committing to the full-screen presentation mode. Use Reading View for a personal review pass before the actual presentation.",
              "Presenter View is the delivery mode — it shows your current slide on the projected screen while your laptop screen shows the current slide, next slide thumbnail, speaker notes, and a timer simultaneously. This view is set up in the Slide Show tab and requires a second monitor or projector connection. Presenter View is the professional delivery standard for any presentation at Lakeside Medical Associates.",
            ],
          },
        ],
      },
      {
        heading: "Managing Slides and File Formats",
        blocks: [
          {
            type: "paragraph",
            text: "Efficiently managing slides and understanding PowerPoint's file formats are practical skills that affect every presentation project you undertake:",
          },
          {
            type: "list",
            items: [
              "Adding slides: right-click in the Slide Panel and choose 'New Slide,' or press Ctrl+M. Each new slide inherits a default layout — usually 'Title and Content.' To change the layout, right-click the slide thumbnail and choose Layout, then select the appropriate option from the layout gallery.",
              "Slide layouts are pre-built content arrangements — common layouts include Title Slide (large title, subtitle), Title and Content (title with a content placeholder), Two Content (two side-by-side content areas), Title Only (just a title bar), and Blank (empty). Always choose the layout that matches your content structure rather than inserting unstructured text boxes — layout-based content is more consistent and easier to maintain.",
              "Saving as .pptx preserves all editing capabilities — transitions, animations, notes, slide layouts, and themes. Use .pptx for working files that you will continue editing. Saving as .ppsx (PowerPoint Show) creates a file that opens directly in full-screen slideshow mode when double-clicked — ideal for kiosk presentations or files sent to someone who needs to run the show without accidentally entering edit mode. Saving as PDF creates a static snapshot of all slides — ideal for sharing the presentation content via email when the recipient does not need to run the slideshow.",
              "AutoSave and AutoRecover in PowerPoint work identically to Word — AutoSave is available when saving to OneDrive, and AutoRecover saves a backup every 10 minutes. Press Ctrl+S frequently during a long editing session. PowerPoint files can be large (especially with embedded images and video), so saving to the network rather than local only is strongly recommended.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: PowerPoint 2019 Interface",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-5/intro-to-powerpoint-2019/infographic.png",
            alt: "PowerPoint 2019 Interface Quick Reference — labeled diagram of the Ribbon tabs, Slide Panel, Notes Panel, Status Bar view buttons, slide layout gallery overview, file format comparison (.pptx vs .ppsx vs .pdf), and view mode use cases",
            caption: "PowerPoint 2019 Interface Quick Reference — navigating the presentation creation environment",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Presentations created at Lakeside Medical Associates for staff orientation, patient education, or provider meetings may contain confidential practice information — staff salaries, patient statistics, provider schedules, or operational procedures. Save all work-related presentations to the practice's network drive, not to a personal USB, personal cloud drive, or personal laptop. If you email a presentation file to a presenter before a meeting, use the practice's email system — not a personal email account. When a presentation is no longer needed (e.g., after a staff meeting), do not leave it open or accessible on a shared computer without closing the file and returning to the desktop.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I am creating a staff orientation presentation for new employees at a small medical office. Suggest a 10-slide deck structure with a title for each slide and 3 key talking points per slide. The orientation covers: welcome and culture, office layout and access, key systems and tools, patient communication standards, HIPAA basics, emergency procedures, scheduling and time-off policies, provider introductions, support staff directory, and next steps for day 1.' Use the generated slide outline as the starting point for your orientation deck in the capstone challenge.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which PowerPoint view shows all slides as thumbnails in a grid, allowing you to reorder them by dragging and dropping?",
            options: [
              "Normal view",
              "Outline view",
              "Slide Sorter view",
              "Reading view",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Get familiar with the PowerPoint 2019 interface by building a basic slide structure for the Lakeside Medical Associates staff orientation presentation and navigating through all major views.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open PowerPoint 2019 and create a new blank presentation. On slide 1, type 'Lakeside Medical Associates — New Staff Orientation' as the title and 'Welcome to the Team' as the subtitle.",
          "Add 9 more slides using Ctrl+M for a total of 10 slides. Give each slide a title using these names in order: Welcome and Our Culture, Office Layout and Access, Key Systems and Tools, Patient Communication Standards, HIPAA Basics, Emergency Procedures, Scheduling and Time-Off, Provider and Staff Directory, Your First Day — Next Steps. Use the 'Title and Content' layout for slides 2–9 and the 'Title Only' layout for slide 10.",
          "Switch to Slide Sorter view and reorder the slides by dragging so that 'HIPAA Basics' appears as slide 4 (before 'Patient Communication Standards'). Confirm the new order, then switch back to Normal view.",
          "Add speaker notes to slides 1, 2, and 3 — each note should be at least 2 sentences describing what the presenter should say for that slide.",
          "Save the file as 'Staff Orientation – Lakeside Medical.pptx.' Then save a second copy as a .ppsx file (PowerPoint Show) and open it to confirm it launches directly in slideshow mode. Close the show and return to the editing environment.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your .pptx file to your instructor or course folder. Your presentation should have 10 slides with correct titles in the reordered sequence (HIPAA Basics as slide 4), correct layout applied to slides 2–9 vs slide 10, speaker notes on the first 3 slides, and evidence that you saved both .pptx and .ppsx versions. This orientation deck structure is now ready for content and design work in the upcoming lessons.",
      },
    ],
  },

  {
    slug: "slide-design-and-themes",
    title: "Slide Design, Themes, and Layouts",
    description:
      "Design professional, visually consistent slides using PowerPoint themes, Slide Master view, and SmartArt — applying typography principles, color theory, and the 6×6 content rule for effective presentations.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/_gYShFl6i94",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-01.jpg",
        alt: "The 6×6 Rule — maximum 6 lines per slide, maximum 6 words per line for clear messaging",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-02.jpg",
        alt: "Typography for Presentations — font size hierarchy, sans-serif recommendation, max 3 fonts",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-03.jpg",
        alt: "Applying Document Themes — colors, fonts, and effects gallery in the Design tab",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-04.jpg",
        alt: "Slide Master View — making global design changes that apply to every slide at once",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-05.jpg",
        alt: "Slide Layouts and When to Use Each — Title Slide, Title and Content, Two Content, Blank",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-06.jpg",
        alt: "Text Boxes — inserting, formatting, and resizing free-floating text elements",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-07.jpg",
        alt: "Color Principles — contrast, brand consistency, and accessible color combinations",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-08.jpg",
        alt: "SmartArt — converting bullet lists into visual diagrams for processes and hierarchies",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/slide-09.jpg",
        alt: "Knowledge Check — identifying design rule violations in a sample slide",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You open last year's Lakeside Medical Associates orientation presentation and immediately see the problem: every slide uses a different font, some slides have bright yellow text on a white background (unreadable), several slides are packed with 12 bullet points of small text, and the logo appears in a different corner on every other slide. This presentation does not look like it came from one professional organization — it looks like seven different people each formatted one slide. Your job is to redesign it with a consistent theme, apply the 6×6 rule to clean up overcrowded slides, and use Slide Master to ensure every slide looks unified. This lesson shows you how.",
          },
        ],
      },
      {
        heading: "Design Principles for Professional Slides",
        blocks: [
          {
            type: "paragraph",
            text: "Effective slide design is not about making slides beautiful — it is about making them readable, clear, and appropriate for the audience and context. These principles apply in every professional presentation setting:",
          },
          {
            type: "list",
            items: [
              "The 6×6 rule: a maximum of 6 lines of text per slide and a maximum of 6 words per line keeps slides scannable and forces the presenter to summarize key points rather than reading paragraph text aloud. When you find yourself typing a 4-sentence bullet point, that is a sign to move the detail to speaker notes and keep only the key phrase on the slide. Audiences cannot read dense slide text and listen to the presenter simultaneously — one of the two will lose.",
              "Font size hierarchy makes the slide's information structure immediately visible — slide titles should be 36–44pt bold (large, authoritative), main bullet points should be 24–28pt, and sub-bullets should be 20–22pt. Never use body text smaller than 18pt in a projected presentation — text smaller than that is unreadable beyond the first 3 rows of seats. The font size alone should tell the viewer which is the most important idea on the slide.",
              "Sans-serif fonts are the professional choice for presentations — Calibri, Arial, Segoe UI, and Helvetica are clean at large sizes and project clearly. Serif fonts like Times New Roman, while appropriate for documents, have thin strokes that blur and lose readability when projected at low resolution. Use a maximum of 2–3 fonts in a presentation: one for titles, one for body text, and optionally a third for accent labels. More fonts signal visual disorder.",
              "Contrast is the most critical design principle for presentations — light text on a dark background and dark text on a light background both work, but the contrast ratio must be high. Light blue text on a white background looks fine on your monitor but disappears on a projected screen. Dark navy text on white, white text on dark blue, and black text on light gray are all high-contrast, readable combinations. Avoid pastels on white, red on green, and any color combination that would be invisible to someone with color blindness.",
            ],
          },
        ],
      },
      {
        heading: "Themes and Slide Master",
        blocks: [
          {
            type: "paragraph",
            text: "Themes and Slide Master are the two tools that make a presentation visually consistent — themes control the overall visual identity and Slide Master lets you make design changes that automatically apply to every slide in the deck:",
          },
          {
            type: "list",
            items: [
              "Applying a theme: click the Design tab and browse the Themes gallery. Hover over any theme to preview it on the current slide, then click to apply it to the entire presentation. Each theme includes a coordinated font pair (heading font + body font) and a color palette. For Lakeside Medical Associates, choose a clean, professional theme — 'Office,' 'Facet,' or 'Retrospect' themes project credibility and seriousness appropriate for a healthcare environment. Avoid themes with decorative flourishes, stock photos as backgrounds, or novelty fonts.",
              "Slide Master view makes global design changes that cascade to every slide automatically — access it via View > Slide Master. The large slide at the top of the left panel is the Master slide, and every design element placed here (logo, background color, font choices, footer) appears on every slide in the deck. Use Slide Master to: add the practice logo to a corner of every slide, change the title font for all slides at once, set a consistent footer with 'Lakeside Medical Associates | Confidential,' and define the brand colors for the entire presentation. Exit Slide Master by clicking View > Normal or the 'Close Master View' button.",
              "Individual slide layouts (visible as sub-slides below the Master in Slide Master view) define the specific design for each layout type — Title Slide, Title and Content, Two Content, etc. You can customize individual layouts within the Master view to have specific background images, different font sizes, or additional static elements that appear only on slides using that layout. This is how you create a unique cover slide layout while keeping a different, consistent layout for all content slides.",
            ],
          },
        ],
      },
      {
        heading: "SmartArt and Placeholders vs Text Boxes",
        blocks: [
          {
            type: "paragraph",
            text: "SmartArt and the distinction between placeholders and free text boxes are two design tools that significantly improve the visual quality and structural consistency of professional presentations:",
          },
          {
            type: "list",
            items: [
              "Placeholders are the pre-positioned content areas defined by the slide layout — when you click a placeholder and type, the text is formatted according to the layout's style and positioned correctly within the layout's design. Use placeholders for all primary slide content. Editing the placeholder through Slide Master ensures every slide's content position is consistent across the deck.",
              "Text boxes (Insert > Text Box) are free-floating text elements that can be placed anywhere on the slide, independent of the layout structure. Use text boxes for callouts, labels, or annotations that fall outside the layout's placeholder areas. Avoid using text boxes as a substitute for placeholders — text box content does not benefit from the Slide Master's style consistency and is harder to maintain across many slides.",
              "SmartArt converts a flat bullet list into a visual diagram — select a list of text, right-click, and choose 'Convert to SmartArt,' or click Insert > SmartArt. PowerPoint offers SmartArt for lists, processes (sequential steps with arrows), cycles, hierarchies (org charts), relationships, and matrices. For the Lakeside Medical Associates orientation deck, the agenda slide becomes far more visually engaging as a 'Basic Block List' SmartArt than as a plain bulleted list. For a patient check-in workflow, the 'Upward Arrow' process diagram tells the sequential story more clearly than numbered bullets.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Slide Design and Themes",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-5/slide-design-and-themes/infographic.png",
            alt: "Slide Design Quick Reference — 6×6 rule diagram, font size hierarchy chart, theme application steps, Slide Master navigation guide, SmartArt type selection matrix, and contrast dos/don'ts examples",
            caption: "Slide Design Quick Reference — professional presentation design for Lakeside Medical Associates",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Slide design choices in patient-facing presentations carry additional responsibility — a patient education slide deck about flu symptoms, medication management, or post-operative care must be designed for maximum readability by a general audience that may include elderly patients with visual impairments, patients with limited English proficiency, and patients in stressful situations. In these presentations, minimum 24pt font, high contrast (dark on light or light on dark), short sentences (not medical jargon), and simple diagrams are not just design preferences — they are accessibility requirements. Before finalizing any patient-facing presentation at Lakeside Medical Associates, have it reviewed by a provider or health educator to confirm the content is medically accurate and the design is accessible.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Review this slide content and rewrite it following the 6×6 rule for a professional medical office presentation. Original slide: \"Patient Communication Standards — As staff members at Lakeside Medical Associates we are expected to greet every patient by name within 30 seconds of their arrival, maintain direct eye contact during conversations while demonstrating active listening skills, use plain language avoiding medical terminology when speaking with patients, and always escort patients to examination rooms rather than giving verbal directions.\" Rewrite this as a maximum 6-bullet, 6-word-per-bullet slide with the full detail moved to speaker notes.' Apply the same 6×6 revision process to 3 slides from your orientation deck.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where in PowerPoint do you make a design change (such as adding a logo or changing the title font) that automatically applies to every slide in the presentation?",
            options: [
              "The Design tab > Themes gallery",
              "The Home tab > Font group",
              "View > Slide Master — editing the Master slide",
              "Insert > Header and Footer",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Redesign your 10-slide Lakeside Medical Associates orientation presentation applying all slide design principles from this lesson — consistent theme, Slide Master branding, 6×6 compliance, and SmartArt on the agenda slide.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Apply a professional theme to your orientation deck (choose 'Office,' 'Facet,' or 'Retrospect' from the Design tab). Verify the font pair is a sans-serif combination appropriate for presentations.",
          "Enter Slide Master view and add 'Lakeside Medical Associates' as a small text footer in the bottom-left of the Master slide. Add 'Confidential — Internal Use Only' in small text at the bottom-right. Confirm both appear on all slides (except the Title Slide layout, which you should customize separately to have a clean cover without the footer). Exit Slide Master.",
          "Review all 10 slides for 6×6 compliance. Any slide with more than 6 bullet points must be edited to reduce to 6 or fewer, with the removed content moved to speaker notes. Any bullet point with more than 6 words must be shortened. Document in a note which slides you changed and what was moved to speaker notes.",
          "On the agenda slide (Slide 2 or 3 — 'Your First Day / What We'll Cover'), replace the bulleted list of agenda items with a SmartArt diagram using the 'Basic Block List' or 'Vertical Box List' style. Ensure all 10 orientation topics appear in the SmartArt.",
          "Apply consistent formatting across all content slides: title font 36pt bold, bullet text 24pt, sub-bullet 20pt. Confirm contrast is high (test by projecting or zooming out). Save as 'Staff Orientation – Redesigned – Lakeside Medical.pptx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your redesigned .pptx file to your instructor or course folder. Your work will be evaluated on: theme consistently applied across all slides, Slide Master footer on all non-title slides, 6×6 compliance on every content slide, SmartArt agenda on the agenda slide, and consistent font size hierarchy. Take a screenshot of the Slide Master view showing your footer elements in place and include it with your submission.",
      },
    ],
  },

  {
    slug: "adding-media-and-animations",
    title: "Adding Media, Animations, and Transitions",
    description:
      "Learn to insert and optimize images, shapes, and icons in PowerPoint slides, apply professional slide transitions, use animations with purpose, and embed video or audio for engaging multimedia presentations.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/Ey1atEavZ-M",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-01.jpg",
        alt: "Inserting Images — from file, online search, and stock image library in PowerPoint 2019",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-02.jpg",
        alt: "Resizing, Cropping, and Compressing Images for Slides",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-03.jpg",
        alt: "Icons and Shapes — inserting, formatting, aligning, and grouping objects on a slide",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-04.jpg",
        alt: "Slide Transitions — applying, setting duration, sound, and advance trigger",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-05.jpg",
        alt: "Animation Types — entrance, emphasis, exit, and motion path animations",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-06.jpg",
        alt: "The Animation Pane — controlling order, timing, and triggers for multiple animations",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-07.jpg",
        alt: "Video Insertion — embedding vs linking and basic video playback settings",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-08.jpg",
        alt: "When NOT to Use Animations — professionalism guardrails for workplace presentations",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/slide-09.jpg",
        alt: "Knowledge Check — selecting appropriate animation and transition choices for a given context",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates wants three things added to the updated orientation deck: a professional team photo on the introduction slide, icons representing each department on the department overview slide, and a brief welcome video from the physician owner embedded in the first slide. She also mentions that last year's presenter 'had too many spinning and bouncing effects' and asks you to keep animations minimal and professional. This lesson covers the media tools you need — and the professional judgment about when less is more.",
          },
        ],
      },
      {
        heading: "Images: Inserting, Resizing, Cropping, and Compressing",
        blocks: [
          {
            type: "paragraph",
            text: "Images make presentations more engaging and more memorable than text alone — but images must be inserted, sized, and managed correctly to avoid bloated file sizes, distorted proportions, and slow-loading slideshows:",
          },
          {
            type: "list",
            items: [
              "To insert an image: click Insert > Pictures > This Device (to insert from your computer), Online Pictures (to search Bing for licensed images), or Stock Images (for PowerPoint's built-in royalty-free image and icon library). For the team photo on the introduction slide, insert it from the practice's network drive using This Device. For decorative icons on department slides, use Stock Images > Icons for clean, scalable vector icons that resize without losing quality.",
              "Resizing images correctly maintains the aspect ratio — drag a corner handle (not a side handle) to resize. Dragging a side handle stretches or squishes the image disproportionately, which looks unprofessional. Hold Shift while dragging a corner handle to lock the aspect ratio in older versions. Double-clicking the image opens the Format Picture panel where you can type exact height and width values.",
              "Cropping removes unwanted portions of an image — click the image, then click Picture Format > Crop. Black crop handles appear on the image edges. Drag the crop handles to define the area you want to keep, then press Enter or click outside the image to confirm the crop. The cropped area is not deleted — it is hidden, and you can re-crop at any time. Use 'Crop to Shape' (Picture Format > Crop > Crop to Shape) to crop an image into a circle, rectangle, or any other shape for decorative effect.",
              "Compress images to reduce file size — presentations with many high-resolution photos can grow to 50+ MB, which makes email delivery and loading slow. Select an image, click Picture Format > Compress Pictures. Choose 'E-mail (96 ppi)' for presentations shared digitally, or 'Print (220 ppi)' for presentations that will also be printed as handouts. Uncheck 'Apply only to this picture' to compress all images in the presentation at once.",
            ],
          },
        ],
      },
      {
        heading: "Aligning, Grouping, and Using Shapes",
        blocks: [
          {
            type: "paragraph",
            text: "Multiple objects on a slide — images, icons, text boxes, shapes — need to be aligned and organized for a professional appearance. PowerPoint's alignment and grouping tools make precise positioning effortless:",
          },
          {
            type: "list",
            items: [
              "Aligning multiple objects: select multiple objects (Shift+Click or Ctrl+Click each one), then click Picture Format or Shape Format > Arrange > Align. Choose from align left, center, right (horizontal), or top, middle, bottom (vertical). For a row of 4 department icons, use 'Align Middle' to ensure all icons share the same vertical center, then 'Distribute Horizontally' to space them evenly across the slide. These alignment tools prevent the 'placed by eye' uneven look that signals rushed work.",
              "Grouping multiple objects binds them into one object that can be moved, resized, and formatted as a unit — select all objects you want to group, right-click, and choose 'Group.' The grouped object moves and resizes as one piece, which is essential when you have an image with an overlaid text caption or a logo with a surrounding decorative shape. Ungroup anytime by right-clicking and choosing 'Ungroup.'",
              "Shapes in PowerPoint (Insert > Shapes) include hundreds of options — rectangles, circles, arrows, callouts, stars, banners — all of which can be filled with color, given a border, and resized or rotated freely. Shapes are commonly used as colored background blocks behind text (for contrast), as directional arrows in process diagrams, as callout bubbles pointing to specific image elements, and as decorative accent elements in the slide footer or header zone.",
            ],
          },
        ],
      },
      {
        heading: "Transitions, Animations, and Professional Guardrails",
        blocks: [
          {
            type: "paragraph",
            text: "Transitions and animations are powerful tools for directing audience attention — and the most commonly misused tools in PowerPoint. Professional presentations use them sparingly, purposefully, and conservatively:",
          },
          {
            type: "list",
            items: [
              "Slide transitions are the visual effect that plays as one slide changes to the next — click the Transitions tab to see the gallery. Professional presentations use simple, subtle transitions: 'Fade,' 'Push,' or 'Wipe' are appropriate. Apply one transition style to all slides (click Transitions > Apply to All) for consistency. Set the duration to 0.5–1.0 seconds — transitions faster than 0.3 seconds are barely noticeable, while transitions slower than 2 seconds make the presenter feel like they are waiting. Never use 'Cube,' 'Orbit,' 'Honeycomb,' 'Ripple,' or any transition with a dramatic 3D effect in a professional workplace presentation.",
              "Object animations control how individual elements appear or move on a slide — select an object and click Animations > Add Animation. Entrance animations bring objects onto the slide (Fade and Appear are the professional standard). Emphasis animations call attention to existing elements (Pulse or Color Change are subtle choices). Exit animations remove elements from the slide. Motion paths create custom movement paths across the slide. Use animations to reveal bullet points one at a time (preventing the audience from reading ahead) or to bring a diagram element in at the right moment in a spoken explanation — not for spectacle.",
              "The Animation Pane (Animations > Animation Pane) shows all animations on the current slide in order, with timing controls for each — you can set each animation to start On Click, With Previous (simultaneously with the previous animation), or After Previous (automatically after the previous animation ends). Use the Animation Pane to sequence and fine-tune complex animated diagrams. For a simple bullet-by-bullet reveal, set all text animations to start On Click.",
              "When NOT to use animations: never use animations in a presentation that will be distributed as a PDF (animations do not export to PDF and the slides will appear in their final state). Avoid animations in presentations viewed by audiences who may have motion sensitivity (some animated effects can trigger discomfort or dizziness). Avoid animations in formal clinical or regulatory presentations — the visual busyness undermines the professional authority of the content. When in doubt, use Fade entrance animations only and no exit animations.",
            ],
          },
        ],
      },
      {
        heading: "Inserting Video and Audio",
        blocks: [
          {
            type: "paragraph",
            text: "Video and audio add significant engagement to presentations when used purposefully — a physician's welcome message embedded in the orientation deck, or a short instructional video clip in a patient education deck, can be more impactful than any amount of slide text:",
          },
          {
            type: "list",
            items: [
              "To insert a video: click Insert > Video > This Device (to embed a video file from your computer) or Online Video (to embed a YouTube or other online video by URL). Embedding a video incorporates the video file inside the .pptx file — the presentation works without an internet connection. Linking to an online video requires internet access during the presentation. For reliable workplace presentations, always embed the video rather than linking to an online source.",
              "Video playback settings control how the video behaves during the presentation — select the video, click Video Format > Playback. Set 'Start' to 'Automatically' if the video should play as soon as the slide appears, or 'On Click' if the presenter triggers it. Check 'Loop until Stopped' for continuous playback (appropriate for waiting room displays). Check 'Rewind after Playing' if the video should return to its first frame after finishing. 'Play Full Screen' expands the video to fill the screen during playback.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Media, Animations, and Transitions",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-5/adding-media-and-animations/infographic.png",
            alt: "Media, Animations, and Transitions Quick Reference — image compression steps, alignment and grouping guide, approved vs avoid transition list, animation type use cases, Animation Pane timing controls, and video embedding vs linking comparison",
            caption: "Media, Animations, and Transitions Quick Reference — professional multimedia choices for Lakeside Medical Associates",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "All images, icons, and video clips used in Lakeside Medical Associates presentations must be either owned by the practice, licensed for commercial use, or sourced from royalty-free libraries. Do not copy images from Google Image Search and paste them into a presentation — the majority of search results are copyrighted and using them without a license exposes the practice to potential copyright infringement claims. Use PowerPoint's built-in Stock Images library (Insert > Stock Images) for royalty-free photos and icons, or use licensed stock photo sites with a practice subscription. For video content featuring actual patients, written patient consent is required under HIPAA and general privacy law before the video can be used in any presentation, even an internal staff meeting.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I am adding visual elements to a staff orientation presentation for a medical office. Describe a professional, clean slide design for a \"Departments at a Glance\" slide that introduces 4 departments (Medical, Nursing, Administration, Facilities). How should the icons, labels, and brief descriptions be arranged on the slide? What animation should be applied and why? What transition should I use coming into this slide from the previous one?' Use the response to design and build the slide in your orientation deck.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are inserting a team photo into the Lakeside Medical Associates orientation presentation and need to resize it without distorting the proportions. What is the correct way to resize an image in PowerPoint?",
            options: [
              "Drag a side handle to stretch it to the desired width",
              "Drag a corner handle to resize while maintaining the original aspect ratio",
              "Right-click the image and choose 'Reset Size' to return to original dimensions",
              "Use Format > Crop to resize the image",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Enhance your Lakeside Medical Associates orientation presentation with professional media, a purposeful animation sequence, and a consistent transition — demonstrating that you can add visual interest without sacrificing professionalism.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "On the Title Slide (slide 1), insert a professional stock image from PowerPoint's Insert > Stock Images library that evokes a medical office or team environment. Resize it to fill the right half of the slide, crop it to a rectangle shape, and apply a subtle picture effect (Soft Edge). Add a colored shape rectangle over the left half as a background for the title text.",
          "On the 'Provider and Staff Directory' slide, insert 3 placeholder icons (one per fictional provider) from Insert > Stock Images > Icons using a person or professional icon. Align all 3 icons using the Align > Distribute Horizontally tool. Group each icon with a text box containing the provider's name and specialty below it.",
          "Apply a 'Fade' transition to all 10 slides (Transitions > Fade > Apply to All) with a duration of 0.75 seconds. Verify no other transitions are applied to any slide.",
          "On the 'Patient Communication Standards' slide (or equivalent content slide), add Fade entrance animations to each bullet point that trigger On Click — so the presenter reveals one bullet at a time. Open the Animation Pane and confirm all 4–6 bullets appear in the correct order. Preview the animations using the Play All button.",
          "Insert a short video placeholder: on slide 1 or slide 2, insert an online YouTube video (search for a general 'welcome to the team' or medical office video). Set playback to On Click. Test the video plays within the presentation. Compress all images in the file (Picture Format > Compress Pictures > E-mail 96 ppi). Save as 'Staff Orientation – With Media – Lakeside Medical.pptx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your media-enhanced .pptx file to your instructor or course folder. Your work will be evaluated on: professional stock image on the title slide (correctly cropped and sized), aligned and grouped icon set on the directory slide, Fade transition applied consistently to all slides, On Click bullet animations on the communication standards slide visible in the Animation Pane, and online video insertion with On Click playback. File size should be reduced from the compressed images. Take a screenshot of the Animation Pane showing the bullet animations in sequence.",
      },
    ],
  },

  {
    slug: "presenting-and-delivery",
    title: "Presenting and Slide Show Settings",
    description:
      "Master professional presentation delivery using Presenter View, keyboard shortcuts, custom slide ranges, rehearsed timings, and export options for distributing presentations in multiple formats.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/7-2oM3AGHQM",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-01.jpg",
        alt: "Starting a Slide Show — from beginning (F5), from current slide (Shift+F5), and setup options",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-02.jpg",
        alt: "Presenter View — current slide, next slide preview, speaker notes, timer, and laser pointer",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-03.jpg",
        alt: "Keyboard Shortcuts During Presentation — B, W, Escape, arrow keys, Ctrl+P for pen",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-04.jpg",
        alt: "Custom Slide Range — presenting only a subset of slides without deleting the rest",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-05.jpg",
        alt: "Hiding Slides — keeping backup slides in the deck without showing them by default",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-06.jpg",
        alt: "Rehearse Timings — recording per-slide timing for auto-advance presentations",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-07.jpg",
        alt: "Printing Handouts — 1, 2, 3, 4, 6, and 9 slides per page layout options",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-08.jpg",
        alt: "Exporting as Video and Packaging for USB — distribution options for offline delivery",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/slide-09.jpg",
        alt: "Knowledge Check — selecting the correct delivery setting for a given presentation scenario",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Tomorrow morning is the new staff orientation at Lakeside Medical Associates. You are presenting the 10-slide orientation deck to 4 new hires in the conference room. The projector is connected to the conference room laptop. You want to see your notes on your laptop while the slides appear on the projector, black out the screen during a 10-minute break without turning off the projector, skip slide 8 (which has been pulled for revision), and have a backup USB with the presentation in case the network drive is unavailable. This lesson covers every delivery and distribution tool you need to walk into that room prepared for anything.",
          },
        ],
      },
      {
        heading: "Presenter View and Delivery Mechanics",
        blocks: [
          {
            type: "paragraph",
            text: "Presenter View is the professional delivery standard — it separates what the audience sees (the full-screen slide) from what the presenter sees (a control panel with notes, next slide preview, and timer). Setting it up correctly before a presentation takes 2 minutes and prevents the embarrassing situation of your notes being projected on the screen:",
          },
          {
            type: "list",
            items: [
              "To enable Presenter View: connect a second monitor or projector, go to the Slide Show tab > Monitors group > check 'Use Presenter View.' When you start the slideshow, your laptop shows the Presenter View panel while the projector shows the full-screen slide. The Presenter View panel displays: the current slide (large, centered), the next slide thumbnail (upper right), the full speaker notes for the current slide (scrollable, large text), a slide counter, and a timer showing elapsed time.",
              "Pressing F5 starts the slideshow from Slide 1. Pressing Shift+F5 starts from the currently selected slide — useful for rehearsing a specific section or resuming a presentation you paused mid-way. Press Escape at any time to exit the slideshow and return to the editing view.",
              "Keyboard shortcuts during a live presentation keep the presenter's attention on the audience rather than the laptop — arrow keys (right, left, up, down) advance or go back one slide. Pressing B blacks out the screen (shows a black slide), useful during discussion breaks when you want to remove the visual distraction without stopping the presentation. Pressing W whites out the screen (shows a white slide). Press B or W again to return to the current slide. Pressing Ctrl+P activates the Pen tool, turning the cursor into a virtual pen for circling or underlining elements on the slide during discussion.",
              "The Laser Pointer (hold Ctrl+L or right-click during presentation and choose 'Laser Pointer') turns the cursor into a bright red dot that visually highlights where on the slide you are pointing — far more effective than trying to point with a mouse cursor. The Highlighter (right-click > Pointer Options > Highlighter) lets you draw colored highlights directly on the slide during the presentation.",
            ],
          },
        ],
      },
      {
        heading: "Custom Ranges, Hidden Slides, and Timings",
        blocks: [
          {
            type: "paragraph",
            text: "Professional presenters always have more slides than they present — backup slides, detail slides, appendix data — and need precise control over which slides the audience sees and in what order:",
          },
          {
            type: "list",
            items: [
              "Custom Slide Show lets you define a named subset of slides to present without the rest — go to Slide Show > Custom Slide Show > Custom Shows > New. Name your show (e.g., 'Orientation – Short Version'), add the slides you want to include in order, and click OK. Run the custom show by going back to Slide Show > Custom Slide Show and selecting your named show. This is useful when you have one deck but need to present different subsets to different audiences (e.g., the full 10-slide orientation for new hires, but only slides 1–5 for a brief 5-minute overview for returning staff).",
              "Hiding slides keeps them in the file but skips them during the normal slideshow — right-click the slide thumbnail in the Slide Panel and choose 'Hide Slide.' Hidden slides are shown with a strikethrough number in the panel. During the presentation, hidden slides are automatically skipped. You can still jump to a hidden slide manually by pressing the slide number key and Enter. Hide slide 8 for the orientation presentation (which is under revision) so it does not appear in the normal flow but remains in the file for future use.",
              "Rehearse Timings records how long you spend on each slide — go to Slide Show > Rehearse Timings and PowerPoint starts the slideshow with a timer visible. Click through your presentation as you would in real life, speaking through each slide. When done, PowerPoint saves the per-slide timings and asks if you want to use them for auto-advance. If you accept, the slideshow will automatically advance to the next slide after the recorded time, without requiring clicks — appropriate for kiosk or unattended loop presentations. For live presenter-led presentations, do not use auto-advance timing.",
            ],
          },
        ],
      },
      {
        heading: "Printing Handouts and Exporting",
        blocks: [
          {
            type: "paragraph",
            text: "Distributing a presentation before or after a meeting in an appropriate format is as important as delivering it well — the right format makes the content accessible to people who were not present and serves as a reference document after the meeting:",
          },
          {
            type: "list",
            items: [
              "Printing handouts: press Ctrl+P to open the Print dialog. In the 'Settings' section, click the 'Full Page Slides' dropdown and choose from Handouts options: 1, 2, 3, 4, 6, or 9 slides per page. The 3-slides-per-page handout is the professional standard for presenter-led meetings — it shows 3 slides in a column on the left with horizontal lines for note-taking on the right. For a reference handout to be filed after the meeting, 6 or 9 slides per page saves paper while still showing all content legibly.",
              "Export as PDF: File > Export > Create PDF/XPS produces a static PDF with one slide per page (or per the handout layout if you set it in the print dialog). PDF is the appropriate format for emailing the presentation to someone who needs to read it but not run the slideshow. Confirm animations and transitions are not preserved in PDF — each slide appears in its final state.",
              "Export as Video: File > Export > Create a Video converts the entire presentation (including animations and transitions) into an MP4 video file. This is ideal for patient waiting room kiosks, online training content, and recorded webinars. Set the video quality (HD 1080p for screen display, Standard 720p for email distribution) and the seconds per slide for any slides without timed animations.",
              "Package for CD/USB: File > Export > Package Presentation for CD bundles the presentation file and all linked media files (videos, custom fonts) into one folder that can be copied to a USB drive. This ensures the presentation runs correctly on any computer — even one without the specific fonts or media files installed. Use this when presenting from an unfamiliar conference room computer.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Presentation Delivery",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-5/presenting-and-delivery/infographic.png",
            alt: "Presentation Delivery Quick Reference — Presenter View layout diagram, keyboard shortcuts reference card, Custom Slide Show creation steps, Hide Slide indicator guide, Rehearse Timings workflow, handout layout options comparison, and export format selection guide",
            caption: "Presentation Delivery Quick Reference — from Presenter View to USB packaging",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Before presenting in a conference room or external venue, always test the setup — connect to the projector, start the slideshow in Presenter View, and verify that notes appear on your laptop screen rather than the projected display. If Presenter View is not available (single-display setup), print your speaker notes (File > Print > Notes Pages layout) and place them beside the keyboard. Never rely on reading projected speaker notes aloud to the audience — it is unprofessional and signals poor preparation. If presenting a Lakeside Medical Associates deck to an external audience (a patient group, a referral partner meeting, or a community health fair), review the deck for any internal-only information (financial data, staff performance, operational metrics) that should not be shared externally, and create a separate external version if needed.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write detailed speaker notes for the first 5 slides of a new staff orientation presentation at a medical office. The slide titles are: (1) Welcome to Lakeside Medical Associates, (2) Our Culture and Mission, (3) Office Layout and Access, (4) HIPAA Basics for New Staff, (5) Your First Day — What to Expect. For each slide, write 3–5 sentences of natural, conversational presenter script that I can read comfortably during the presentation.' Add the generated speaker notes to your orientation deck, then rehearse the presentation using Slide Show > Rehearse Timings and note how long it takes.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "During a live presentation at Lakeside Medical Associates, the physician owner asks a question that requires a 5-minute discussion. You want to black out the projection screen so the audience focuses on the conversation rather than the slide. Which keyboard shortcut does this?",
            options: [
              "Escape — to exit the slideshow",
              "B — to display a black screen and resume with B or any key",
              "Ctrl+P — to activate the pen tool",
              "F5 — to restart the slideshow from the beginning",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Prepare your Lakeside Medical Associates orientation presentation for live delivery by configuring all presentation settings, creating printed handouts, and exporting in multiple formats for different distribution needs.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open your orientation presentation. Hide slide 8 (whichever slide you marked as 'under revision' earlier). Confirm the slide shows a strikethrough number in the slide panel and verify it is skipped during a test slideshow run.",
          "Create a Custom Slide Show named 'Orientation — Short Version' containing only slides 1, 2, 3, 4, and 10 (Welcome, Culture, Office Layout, HIPAA Basics, and Next Steps). Test the custom show by running it via Slide Show > Custom Slide Show.",
          "Run Slide Show > Rehearse Timings. Present all visible slides (not hidden slide 8) at a natural pace, spending at least 20 seconds per slide. When finished, save the timings but do NOT set them as the auto-advance timing (decline that option). Note in a text document the total time recorded.",
          "Print the presentation as handouts: use the 3-slides-per-page layout. Take a screenshot of the Print Preview showing the 3-per-page layout with note lines. Then change to Notes Pages layout and screenshot that as well to show speaker notes included.",
          "Export the full presentation (all 10 slides, not the custom show) as a PDF named 'Staff Orientation PDF – Lakeside Medical.pdf.' Export a second copy using File > Export > Package Presentation for CD into a folder named 'Orientation USB Package.' Verify the folder contains the .pptx file and any media.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit to your instructor: (1) the .pptx file with hidden slide 8 and Custom Slide Show configured, (2) the PDF export, (3) the USB package folder (zipped), and (4) two screenshots (3-per-page handout preview and Notes Pages preview). Your submission confirms you can configure a presentation for live delivery, export it in multiple formats, and package it for offline distribution — a complete professional presentation workflow.",
      },
    ],
  },

  {
    slug: "powerpoint-capstone",
    title: "Hands-On: Build a Staff Orientation Presentation",
    description:
      "Apply every PowerPoint skill in a single complete capstone project — build a polished 10-slide staff orientation presentation for Lakeside Medical Associates, complete with theme, SmartArt, images, animations, speaker notes, and PDF export.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/UmOJXAr_riE",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-01.jpg",
        alt: "10-Slide Orientation Deck Structure — the complete slide flow from Welcome to Next Steps",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-02.jpg",
        alt: "Applying a Professional Theme and Slide Master Branding",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-03.jpg",
        alt: "SmartArt for the Agenda Slide — converting the topic list to a visual diagram",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-04.jpg",
        alt: "Team Photo Placeholder and Department Icons — visual storytelling on the intro slide",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-05.jpg",
        alt: "Slide Transitions and On-Click Bullet Animations — consistent, minimal effects",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-06.jpg",
        alt: "Speaker Notes on Every Slide — presenter script for confident delivery",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-07.jpg",
        alt: "Configuring Presenter View — dual-display setup for live delivery",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-08.jpg",
        alt: "Exporting as PDF for Email Distribution to New Hires Before Orientation",
      },
      {
        src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/slide-09.jpg",
        alt: "Knowledge Check — reviewing the complete PowerPoint capstone workflow",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The office manager at Lakeside Medical Associates has given you full ownership of the new staff orientation presentation. Four new employees are starting next Monday and they need a professional, informative, visually engaging 10-slide orientation deck delivered in three formats: as a .pptx for live presentation, as a PDF emailed to new hires before their start date, and as a packaged folder on the conference room USB drive as backup. You have all the skills you need — this capstone is the integration challenge that proves it.",
          },
        ],
      },
      {
        heading: "The 10-Slide Orientation Structure",
        blocks: [
          {
            type: "paragraph",
            text: "A well-structured orientation deck follows a logical progression — opening with warmth, moving through essential information, and closing with clear next steps. Every slide should earn its place in the deck by serving a specific purpose for the new employee:",
          },
          {
            type: "list",
            items: [
              "Slide 1 — Welcome: Title Slide layout with 'Welcome to Lakeside Medical Associates,' the date, and a professional stock image of a warm, modern medical environment. This is the first thing new employees see when they walk into the orientation room — it should project warmth, professionalism, and pride in the organization.",
              "Slide 2 — Agenda: Title and Content layout with a SmartArt 'Vertical Box List' or 'Basic Block List' showing all 8 topics to be covered in order. This orients new hires to the structure of the session and sets their expectations for the next 45 minutes.",
              "Slide 3 — About Lakeside Medical Associates: a brief history (year founded, specialties offered, patient volume, staff count). Maximum 5 bullet points following the 6×6 rule. This gives new employees context for the organization they are joining.",
              "Slide 4 — Meet the Team: a grid of name/title labels for each provider and department head. If available, include stock icon placeholders for photos. New hires need to know who's who from day one.",
              "Slide 5 — Office Policies: 5–6 key policies every new employee must know immediately (dress code, break schedule, personal device policy, parking, attendance/punctuality). Formatted as a clean numbered list.",
              "Slide 6 — Key Systems Overview: icons representing each major system — EHR/practice management software, phone system, scheduling software, email/calendar. One icon + system name + one-sentence description per system. This is where a department icon SmartArt visual shines.",
              "Slide 7 — Patient Communication Standards: 4–5 standards in bullet form (greet by name, escort don't direct, use plain language, HIPAA basics). Apply On-Click entrance animations to reveal each standard one at a time during the verbal explanation.",
              "Slide 8 — HIPAA and Privacy Basics: 3 key reminders (never discuss patient info in public areas, always log out of EHR, report any potential breach immediately). Use a bold, high-contrast design with a warning icon to signal importance.",
              "Slide 9 — Contact Information: a reference table with key contacts — office manager, nurse manager, scheduling coordinator, billing coordinator — with name, extension, and email. This slide should be designed for readability as a handout printout.",
              "Slide 10 — Your First Day — Welcome Message: a warm closing slide with a short welcome quote or message from the physician owner, the practice's mission statement, and the presenter's contact information for follow-up questions.",
            ],
          },
        ],
      },
      {
        heading: "Quality Standards for the Capstone",
        blocks: [
          {
            type: "paragraph",
            text: "To earn a passing grade on this capstone, your presentation must meet all of the following professional quality standards — the same standards that would be applied by a supervisor reviewing a real deliverable before a real orientation session:",
          },
          {
            type: "list",
            items: [
              "Theme consistency: one professional theme applied to all 10 slides, with no slides deviating from the theme's font and color settings. Slide Master must include the 'Lakeside Medical Associates | Confidential' footer on all non-title slides, confirmed by entering and exiting Slide Master view.",
              "6×6 compliance: every content slide must have 6 or fewer text lines and 6 or fewer words per line. Any slide that exceeds this after editing must have the excess content moved to speaker notes. This cannot be waived.",
              "Speaker notes on every slide: at least 2 sentences of presenter script in the Notes Panel for every one of the 10 slides. These notes should be detailed enough that a different presenter could deliver the deck cold without needing additional preparation.",
              "SmartArt on the agenda slide, consistent Fade transitions on all slides, and On-Click reveal animations on slides 7 (Patient Communication Standards) and 8 (HIPAA Basics).",
              "PDF export and .ppsx export both completed and verified — open each file to confirm they render correctly before submission.",
            ],
          },
        ],
      },
      {
        heading: "Pre-Delivery Checklist",
        blocks: [
          {
            type: "paragraph",
            text: "Before the orientation session, every professional presenter does a final pre-delivery check. At Lakeside Medical Associates, the office assistant should verify all of the following before the new hires arrive in the conference room:",
          },
          {
            type: "list",
            items: [
              "File is accessible on the conference room laptop — stored on the network drive, USB backup packaged, or both. Do not rely on a single access point for a time-critical presentation.",
              "Slideshow runs from beginning to end without errors — test every slide in Presenter View to confirm all animations fire correctly, all transitions play, and no '#' reference errors appear where images or text should be.",
              "Presenter View is configured correctly — start the slideshow in Presenter View and confirm that speaker notes appear on the laptop screen, not the projected display.",
              "Handouts are printed and stapled — 3-per-page handout layout, one packet per attendee, printed before the orientation room opens.",
              "PDF version was emailed to new hires the business day before orientation — confirm receipt by checking the Sent folder in Outlook.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: PowerPoint Capstone Checklist",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-5/powerpoint-capstone/infographic.png",
            alt: "PowerPoint Capstone Quality Checklist — 10-slide structure requirements, theme and Slide Master verification steps, 6×6 compliance review guide, speaker notes requirements, animation and transition checklist, and pre-delivery verification list",
            caption: "PowerPoint Capstone Quality Checklist — everything required for a professional orientation deck",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "The staff orientation presentation becomes part of the official onboarding record at Lakeside Medical Associates — new employees may refer to it months after their start date for policy reminders, contact information, and system guidance. This means the content must be accurate at the time of distribution and updated whenever policies, key contacts, or systems change. If the office manager, phone system, or HIPAA contact information in the deck becomes outdated, new hires who consult the presentation will have incorrect information. Assign one person (the office assistant — you) as the owner of the orientation deck with a reminder to review and update it before each new hire cohort. Never distribute a presentation with outdated contact information or superseded policy language.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write the complete content for a 10-slide staff orientation presentation for Lakeside Medical Associates following this structure: [paste your slide titles]. For each slide, provide: the main title, 4–6 bullet points following the 6×6 rule (maximum 6 words each), and 3–4 sentences of presenter speaker notes. Keep all content professional, warm, and appropriate for a healthcare workplace orientation.' Use the complete output to finalize all text content in your capstone presentation — then apply the design, themes, SmartArt, animations, and formatting on top of the AI-generated content structure.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which three file formats should you produce when delivering the Lakeside Medical Associates staff orientation presentation to maximize accessibility for all use cases?",
            options: [
              ".pptx only — one format is sufficient for all delivery needs",
              ".pptx for live editing, .pdf for email distribution, .ppsx for kiosk/USB auto-play",
              ".doc, .xlsx, and .pptx to cover all Office applications",
              ".pdf and .jpg (individual slide images) for maximum compatibility",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build the complete, production-ready 10-slide Lakeside Medical Associates staff orientation presentation integrating every skill from this module. Your submission must include the .pptx, .ppsx, and PDF versions — all three reviewed and confirmed correct.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Build all 10 slides following the structure from this lesson (Welcome, Agenda, About Us, Meet the Team, Office Policies, Key Systems, Patient Communication Standards, HIPAA Basics, Contact Information, Welcome Message). Each slide must use the correct layout (Title Slide for slide 1, Title and Content for slides 2–9, Title Only or Blank for slide 10). All content must comply with the 6×6 rule — no exceptions.",
          "Apply a professional theme, configure the Slide Master with 'Lakeside Medical Associates | Confidential' footer on all slides except the Title Slide, and verify consistent font size hierarchy (36pt+ titles, 24pt+ bullets) throughout all 10 slides.",
          "Add visual elements: stock image on slide 1, SmartArt agenda on slide 2, icons on slide 6 (Key Systems). Apply Fade transitions to all 10 slides. Apply On-Click entrance animations to slide 7 and slide 8 bullet points.",
          "Add speaker notes to every one of the 10 slides — minimum 2 complete sentences per slide of presenter script. Notes should be detailed enough for a substitute presenter to deliver the session without additional preparation.",
          "Export: (1) Save as 'Staff Orientation – Final – Lakeside Medical.pptx.' (2) Save as .ppsx (Staff Orientation – Kiosk.ppsx). (3) Export as PDF (Staff Orientation – Pre-Read – Lakeside Medical.pdf). (4) Package for CD/USB into a folder named 'Orientation Delivery Package.' Open and verify each format before submitting.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit all four files (.pptx, .ppsx, .pdf, and the packaged USB folder as a ZIP) to your instructor or course folder. Your capstone will be graded on: 10-slide structure with correct layouts and titles, theme and Slide Master consistency, 6×6 compliance throughout, SmartArt on agenda slide, Fade transitions on all slides, On-Click animations on slides 7 and 8, speaker notes on all 10 slides, and all three export formats verified correct. A perfect score on this capstone means you can produce a professional presentation that Lakeside Medical Associates could use in a real new-hire orientation next Monday.",
      },
    ],
  },
];
