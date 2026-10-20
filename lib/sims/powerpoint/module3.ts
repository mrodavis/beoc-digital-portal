import type { SimDefinition } from "@/types/sim";

/** PowerPoint Module 3: Slide Design and Themes. Keys are `${moduleSlug}::${lessonSlug}`. */
export const pptModule3Sims: Record<string, SimDefinition[]> = {
  "module-3::applying-themes": [
    {
      id: "ppt-m3-applying-themes-1",
      app: "powerpoint",
      title: "Pick a theme that survives the projector",
      scenario: "You are designing the annual staff briefing at Lakeside Medical Associates. Try a theme, check it full screen, and switch to one with stronger contrast for a room where the lights stay on.",
      fileName: "Annual Staff Briefing.pptx",
      minutes: 4,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "2026 Annual Staff Briefing", subtitle: "Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "A Year in Numbers", body: ["41,200 patient visits", "1,240 new portal users", "Average wait time down 8 minutes"] },
          { id: "s3", layout: "Two Content", title: "What Worked, What's Next", body: ["Online check-in", "Saturday hours"], body2: ["Text reminders", "Second billing specialist"] },
          { id: "s4", layout: "Section Header", title: "Thank You", subtitle: "Questions and discussion" },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Gallery theme to the presentation.",
          hint: "Design tab › Themes group › Gallery (click the More arrow to see every theme).",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Gallery" } }],
        },
        {
          instruction: "Apply the fourth variant of the Gallery theme.",
          hint: "Design tab › Variants group › the fourth thumbnail.",
          steps: [{ action: { kind: "command", id: "design.variant", value: "4" } }],
        },
        {
          instruction: "Start the slide show from the beginning to judge the theme full screen.",
          hint: "Slide Show tab › From Beginning (or press F5).",
          steps: [{ action: { kind: "command", id: "slideshow.fromBeginning" } }],
        },
        {
          instruction: "End the slide show.",
          hint: "Press Esc (or right-click the slide › End Show).",
          steps: [{ action: { kind: "command", id: "slideshow.end" } }],
        },
        {
          instruction: "The briefing room keeps its lights on. Apply the Madison theme, which puts dark text on a white background.",
          hint: "Design tab › Themes group › Madison.",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Madison" } }],
        },
        {
          instruction: "Apply the second variant of the Madison theme.",
          hint: "Design tab › Variants group › the second thumbnail.",
          steps: [{ action: { kind: "command", id: "design.variant", value: "2" } }],
        },
      ],
    },
  ],

  "module-3::modifying-themes": [
    {
      id: "ppt-m3-modifying-themes-1",
      app: "powerpoint",
      title: "Build the practice's theme once",
      scenario: "Five people make decks at Lakeside Medical Associates and no two look alike. Set the practice's colors, fonts, effects, and background once, then save it as a theme everyone can choose.",
      fileName: "Lakeside Brand Template.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Lakeside Medical Associates", subtitle: "Presentation title goes here" },
          { id: "s2", layout: "Title and Content", title: "Slide Title", body: ["Key point one", "Key point two", "Key point three"] },
          { id: "s3", layout: "Two Content", title: "Comparison Slide", body: ["Option A details"], body2: ["Option B details"] },
          { id: "s4", layout: "Section Header", title: "Section Title", subtitle: "Section subtitle" },
        ],
      },
      tasks: [
        {
          instruction: "Change the theme colors to Blue II.",
          hint: "Design tab › Variants group › More arrow (bottom right of the Variants gallery) › Colors › Blue II.",
          steps: [{ action: { kind: "command", id: "design.colors", value: "Blue II" } }],
        },
        {
          instruction: "Create new theme fonts named “Lakeside Fonts” that use Garamond for headings and Arial for body text.",
          hint: "Design tab › Variants › More arrow › Fonts › Customize Fonts…. Set Heading font to Garamond and Body font to Arial, type the name, then click Save.",
          steps: [{ action: { kind: "dialog", id: "customizeFonts", values: { heading: "Garamond", body: "Arial", name: "Lakeside Fonts" } } }],
        },
        {
          instruction: "Apply the Subtle Solids theme effects.",
          hint: "Design tab › Variants › More arrow › Effects › Subtle Solids.",
          steps: [{ action: { kind: "command", id: "design.effects", value: "Subtle Solids" } }],
        },
        {
          instruction: "Change the background style to Style 2.",
          hint: "Design tab › Variants › More arrow › Background Styles › Style 2.",
          steps: [{ action: { kind: "command", id: "design.backgroundStyle", value: "Style 2" } }],
        },
        {
          instruction: "Save the current theme with the file name “Lakeside Medical”.",
          hint: "Design tab › Themes group › More arrow › Save Current Theme…. Type the file name, then click Save.",
          steps: [{ action: { kind: "dialog", id: "saveTheme", values: { name: "Lakeside Medical" } } }],
        },
      ],
    },
  ],

  "module-3::slide-master-view": [
    {
      id: "ppt-m3-slide-master-1",
      app: "powerpoint",
      title: "Put the practice logo on every slide at once",
      scenario: "The Lakeside Medical Associates logo must appear on every patient education slide in the same spot, except the title slide. Do it once on the slide master instead of forty times by hand.",
      fileName: "Patient Education Template.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Managing High Blood Pressure", subtitle: "Patient Education · Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "What the Numbers Mean", body: ["Top number: pressure when the heart beats", "Bottom number: pressure between beats", "Goal for most adults: below 130/80"] },
          { id: "s3", layout: "Title and Content", title: "Small Changes That Help", body: ["Cut back on salt", "Walk 30 minutes most days", "Take medicine at the same time daily"] },
          { id: "s4", layout: "Title Only", title: "Questions? Ask Your Care Team" },
        ],
      },
      tasks: [
        {
          instruction: "Open Slide Master view.",
          hint: "View tab › Master Views group › Slide Master.",
          steps: [{ action: { kind: "command", id: "view.master" } }],
        },
        {
          instruction: "On the slide master (the large top thumbnail), insert the picture lakeside-logo.png.",
          hint: "Click the top thumbnail in the left pane. Insert tab › Pictures › This Device…, choose lakeside-logo.png, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "insertPicture", values: { file: "lakeside-logo.png" } }, requires: { slide: "master" }, selectHint: "Click the slide master, the large thumbnail at the top of the left pane, first." }],
        },
        {
          instruction: "Make the logo 1.5\" wide and align it to the bottom right corner of the slide.",
          hint: "With the logo selected: Picture Format tab › Size › Width: 1.5. Then Picture Format › Arrange › Align › Align Right, and Align › Align Bottom.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "object.size", value: "1.5" }, requires: { slide: "master" }, selectHint: "Click the logo on the slide master first." },
            { action: { kind: "command", id: "object.align", value: "Align Right" }, requires: { slide: "master" }, selectHint: "Click the logo on the slide master first." },
            { action: { kind: "command", id: "object.align", value: "Align Bottom" }, requires: { slide: "master" }, selectHint: "Click the logo on the slide master first." },
          ],
        },
        {
          instruction: "Keep the logo off the title slide: hide background graphics on the Title Slide layout.",
          hint: "Click the Title Slide Layout thumbnail (first under the master). Slide Master tab › Background group › check Hide Background Graphics.",
          steps: [{ action: { kind: "command", id: "master.hideBackground" }, requires: { slide: "layout:Title Slide" }, selectHint: "Click the Title Slide Layout thumbnail, the first one under the slide master." }],
        },
        {
          instruction: "Rename the Title Only layout to “Clinic Update”.",
          hint: "Click the Title Only Layout thumbnail. Slide Master tab › Edit Master › Rename. Type Clinic Update, then click Rename.",
          steps: [{ action: { kind: "dialog", id: "renameLayout", values: { name: "Clinic Update" } }, requires: { slide: "layout:Title Only" }, selectHint: "Click the Title Only Layout thumbnail in the left pane first." }],
        },
        {
          instruction: "Change the theme fonts to Georgia.",
          hint: "Slide Master tab › Edit Theme group › Fonts › Georgia.",
          steps: [{ action: { kind: "command", id: "master.fonts", value: "Georgia" }, alt: [{ kind: "command", id: "design.fonts", value: "Georgia" }] }],
        },
        {
          instruction: "Close Slide Master view.",
          hint: "Slide Master tab › Close group › Close Master View.",
          steps: [{ action: { kind: "command", id: "master.close" }, alt: [{ kind: "command", id: "view.mode", value: "Normal" }] }],
        },
        {
          instruction: "Add a new Title and Content slide after slide 4 and check that the logo appears on it.",
          hint: "Click slide 4 in the thumbnails. Home tab › New Slide (or press Ctrl+M).",
          steps: [{ action: { kind: "command", id: "slides.new", value: "Title and Content" }, requires: { slide: "s4" }, selectHint: "Click slide 4 in the thumbnails first." }],
        },
      ],
    },
  ],
};
