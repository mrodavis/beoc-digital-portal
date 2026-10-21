import { Lesson } from "@/types/lesson";

const IMG = "/images/google-workspace/module-5";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

/** Module 5: Google Slides. Scenario: Parkview Property Management (fictional). */
export const gwModule5Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "start-a-presentation",
    title: "Start a Presentation in Google Slides",
    description:
      "Create and name a presentation, find your way around the Google Slides screen, pick a theme, and add slides with the right layouts.",
    objectives: [
      "Create a Google Slides presentation from Google Drive and give it a clear name",
      "Name the parts of the Slides screen: menus, toolbar, filmstrip, slide, speaker notes, Slideshow, and Share",
      "Apply a theme and explain what a theme changes",
      "Add slides, choose a layout for each one, and type into placeholders",
    ],
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/gmxkBPN2xhc",
    slides: slides("start-a-presentation", [
      "Google Slides: presentations that live in Google Drive",
      "Create and name a presentation",
      "The Google Slides screen",
      "Themes: one choice styles every slide",
      "New slide and Layout: pick the right layout for the content",
      "Quick check: which layout?",
    ]),
    sections: [
      {
        heading: "A presentation for new tenants",
        blocks: [
          {
            type: "scenario",
            role: "You are the office assistant at Parkview Property Management.",
            text: "Denise Carter, the office manager, wants a short welcome presentation for new tenants at Riverside Commons. It will play on the lobby screen, Denise will present it at tenant orientation, and new tenants will get a copy by email. Everyone at Parkview uses Google Workspace, so you build it in Google Slides.",
            task: "Start the presentation, give it a name people can find, choose a theme, and set up the first slides.",
          },
          {
            type: "paragraph",
            text: "Google Slides is Google's presentation app, the Google Workspace counterpart to Microsoft PowerPoint. It runs in a web browser, saves every change automatically to Google Drive, and lets several people work on the same presentation at once. You can use it with a personal Google Account or a work or school account.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Presentation", definition: "A Google Slides file. PowerPoint calls it a deck or a presentation, too." },
              { term: "Filmstrip", definition: "The column of slide thumbnails on the left. Select a thumbnail to work on that slide." },
              { term: "Theme", definition: "A matched set of colors, fonts, backgrounds, and layouts that styles every slide at once." },
              { term: "Layout", definition: "The arrangement of placeholders on a slide, such as Title and body or Title and two columns." },
              { term: "Placeholder", definition: "A box on a new slide that says Click to add title or Click to add text. Click it and type." },
              { term: "Speaker notes", definition: "Notes under the slide for the presenter. The audience doesn't see them." },
            ],
          },
        ],
      },
      {
        heading: "Create and name a presentation",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "In Google Drive, open the folder the presentation belongs in (for Parkview, Riverside Commons).",
              "Select New › Google Slides. Choose Blank presentation, or From a template to start from a design. (You can also go to slides.google.com and start a new presentation there.)",
              "The new presentation opens in a new tab, named Untitled presentation. Click that name at the top left, type a name, and press Enter.",
              "There's no Save button. Slides saves each change to Drive as you work.",
            ],
          },
          {
            type: "tip",
            text: "Name files so a coworker can find them by searching Drive: what it is, plus the building or date it's for. “New Tenant Welcome - Riverside Commons” is easy to find. “Untitled presentation” and “slides final v2” are not.",
          },
        ],
      },
      {
        heading: "The Google Slides screen",
        blocks: [
          {
            type: "image",
            src: `${IMG}/start-a-presentation/infographic.png`,
            alt: "Quick reference: the parts of the Google Slides screen, how to add slides and change layouts, and the main presenting and sharing buttons.",
            caption: "Google Slides at a glance.",
          },
          {
            type: "table",
            caption: "Google Slides on a computer",
            columns: ["Part", "What it is for"],
            rows: [
              ["Presentation name (top left)", "Click it to rename the file"],
              ["Menus", "File, Edit, View, Insert, Format, Slide, Arrange, Tools, Extensions, Help"],
              ["Toolbar", "New slide, Undo, Insert image, Shape, Background, Layout, Theme, Transition, and text formatting"],
              ["Filmstrip (left)", "Thumbnails of every slide. Select one to edit it; drag to reorder. The buttons at the bottom left switch between filmstrip and grid view"],
              ["Slide (center)", "The slide you're editing"],
              ["Speaker notes (under the slide)", "Notes for the presenter"],
              ["Slideshow (top right)", "Present the slides. The arrow next to it has more ways to present"],
              ["Share (top right)", "Give other people access to the file"],
            ],
          },
        ],
      },
      {
        heading: "Choose a theme",
        blocks: [
          {
            type: "paragraph",
            text: "A theme styles the whole presentation at once: background, colors, fonts, and the look of every layout. Choose the theme early, before you style individual slides, so all slides match.",
          },
          {
            type: "list",
            items: [
              "Select Slide › Change theme (or Theme on the toolbar). The Themes panel opens on the right.",
              "Select a theme to apply it to every slide. Close the panel when you're done.",
              "Your organization may give you a branded theme or template. In the Themes panel, Import theme brings in the theme from another presentation.",
              "To change the theme's colors for the whole file, use Slide › Edit theme. Changes there apply to every slide that uses the theme.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "PowerPoint users: Slides' themes work like the themes on PowerPoint's Design tab, and Slide › Edit theme is similar to PowerPoint's Slide Master view.",
          },
        ],
      },
      {
        heading: "Add slides and pick layouts",
        blocks: [
          {
            type: "list",
            items: [
              "To add a slide, select New slide (+) at the top left. The new slide uses the same layout as the slide you're on.",
              "To add a slide with a different layout, select the arrow next to New slide and choose the layout.",
              "To change the layout of an existing slide, select the slide, then select Layout on the toolbar (or Slide › Apply layout) and choose a new one. Your text moves into the new placeholders.",
              "Click a placeholder (Click to add title, Click to add text) and type. Text in a body placeholder becomes a bulleted list when you press Enter.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which layout fits?",
            prompt: "Drag the best layout onto each slide in the welcome presentation.",
            items: [
              { id: "a", text: "The first slide: “Welcome to Riverside Commons” and Parkview's name", match: "Title slide" },
              { id: "b", text: "Three bullet points about the first week", match: "Title and body" },
              { id: "c", text: "Building A rules next to Building B rules", match: "Title and two columns" },
              { id: "d", text: "A divider slide before the section on rent and payments", match: "Section header" },
              { id: "e", text: "Just the lobby photo, nothing else", match: "Blank" },
            ],
            explanation: "Pick the layout that matches the content: a title slide to open, title and body for a list, two columns to compare, a section header between topics, and blank for a full-slide picture.",
          },
          {
            type: "worked-example",
            title: "Setting up the welcome presentation",
            task: "Create the presentation and the first two slides.",
            steps: [
              { move: "In Drive, open Riverside Commons, then New › Google Slides.", why: "Creating it inside the building's folder means it's filed, and shared, with that building's files from the start." },
              { move: "Rename it New Tenant Welcome - Riverside Commons.", why: "A clear name makes it easy to search for." },
              { move: "Choose the Streamline theme.", why: "Choosing a theme first styles every slide you add afterward." },
              { move: "Type the title on slide 1, then New slide › Title and body and type “Your First Week”.", why: "Each slide gets the layout that fits its content." },
            ],
            result: "A named, themed presentation with a title slide and a first content slide.",
            takeaway: "Folder, name, theme, then slides: in that order, the file stays organized and consistent.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where do you change a Google Slides file's name?",
            options: ["File › Save as", "Click the name at the top left, type, and press Enter", "Slide › Edit theme", "The name can only be changed in Microsoft PowerPoint"],
            correctIndex: 1,
            explanation: "The presentation's name at the top left is a text box. Click it, type the new name, and press Enter. You can also rename it from Drive.",
            optionRationales: [
              "Slides has no Save as. Changes save automatically.",
              "Correct.",
              "Edit theme changes colors and layouts, not the file name.",
              "Slides files are renamed in Slides or Drive.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You want every slide in the presentation to use the same colors and fonts. What's the quickest way?",
            options: ["Format each slide by hand", "Apply a theme", "Use the Title slide layout everywhere", "Download it as a PDF"],
            correctIndex: 1,
            explanation: "A theme styles every slide at once, including slides you add later.",
            optionRationales: [
              "That's slow, and slides you add later won't match.",
              "Correct. A theme sets colors, fonts, and backgrounds for every slide.",
              "A layout arranges placeholders on one slide; it doesn't set colors and fonts.",
              "Downloading makes a copy; it doesn't change how slides look.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Slide 4 has a title and bullet points, but you now want to compare two buildings side by side. What do you do?",
            options: ["Delete the slide and start over", "Select the slide and choose Layout › Title and two columns", "Change the theme", "Add a speaker note"],
            correctIndex: 1,
            explanation: "Changing the layout keeps your text and rearranges the placeholders.",
            optionRationales: [
              "You don't need to start over; the layout can change.",
              "Correct.",
              "The theme changes the look of every slide, not the arrangement of one.",
              "Speaker notes are for the presenter; they don't change the slide.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Build the start of a presentation in your own Google Account (a free personal account works) or your school account." },
      {
        type: "list",
        ordered: true,
        items: [
          "In Google Drive, create a folder named Slides Practice. In it, select New › Google Slides › Blank presentation.",
          "Name the presentation “Welcome to [your town or school]”.",
          "Apply any theme.",
          "Add three more slides: one Title and body, one Title and two columns, and one Section header. Type a title on each.",
          "Change the layout of one slide to a different layout.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot showing the presentation's name and the filmstrip with all four slides to your instructor or course folder. If you can't use Google Slides, complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "design-with-images-and-backgrounds",
    title: "Images, Shapes, and Backgrounds",
    description:
      "Insert and replace pictures, add shapes, change a slide's background, and duplicate, reorder, and delete slides.",
    objectives: [
      "Insert an image from your computer, Drive, or the web, and replace it without losing its size and position",
      "Add a shape and text box to a slide",
      "Change the background of one slide, or of every slide through the theme",
      "Duplicate, move, and delete slides in the filmstrip",
    ],
    duration: "20 min",
    slides: slides("design-with-images-and-backgrounds", [
      "Make the slides look finished",
      "Insert › Image: five places a picture can come from",
      "Shapes and text boxes",
      "Change background: one slide or the whole theme",
      "Organize slides: duplicate, move, delete",
      "Design checklist for a clear slide",
    ]),
    sections: [
      {
        heading: "Pictures make the point",
        blocks: [
          {
            type: "scenario",
            role: "You're finishing the Riverside Commons welcome presentation.",
            text: "The words are in place, but the slides look plain. Denise sent you a photo of the Riverside Commons lobby, wants the Who to Call slide to stand out, and asks for a copy of the first-week slide that you can adapt for Elm Street Apartments.",
            task: "Add the photo, a shape, and a background color, and organize the slides.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select the slide, then select Insert › Image (or Insert image on the toolbar).",
              "Choose where the picture comes from: Upload from computer, Stock & web (stock images, GIFs, stickers, and Google images), Drive & Photos, Camera, or By URL.",
              "Pick the image and select Insert or Open. Drag the image to move it; drag a corner handle to resize it.",
              "To swap a picture and keep its size and place, right-click it, choose Replace image, and pick the new source and image.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Use only pictures you have the right to use: photos the company took, its logo, or images whose license allows it. A picture of a tenant or employee needs their permission before it goes on a lobby screen.",
          },
        ],
      },
      {
        heading: "Shapes and text boxes",
        blocks: [
          {
            type: "list",
            items: [
              "Insert › Shape (or Shape on the toolbar) offers shapes, arrows, callouts, and equations. Choose one, then click or drag on the slide.",
              "Insert › Text box adds text anywhere, outside the layout's placeholders.",
              "With a shape selected, the toolbar shows Fill color and Border color. Type while a shape is selected to put text in it.",
              "Arrange › Order brings an object forward or sends it behind others; Arrange › Align lines objects up.",
            ],
          },
        ],
      },
      {
        heading: "Change the background",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select the slide in the filmstrip.",
              "Select Slide › Change background (or Background on the toolbar).",
              "To the right of Color, click the box and pick a color. Or, to the right of Image, select Choose to use a picture.",
              "Select Done to change only this slide, or select the Add to theme button to use that background for the whole presentation.",
            ],
          },
          {
            type: "tip",
            text: "Keep enough contrast between the text and the background. Dark text on a light background (or light on dark) is readable on a lobby screen from across the room; mid-tone on mid-tone isn't.",
          },
        ],
      },
      {
        heading: "Organize your slides",
        blocks: [
          {
            type: "table",
            caption: "Working with slides in the filmstrip",
            columns: ["To", "Do this"],
            rows: [
              ["Duplicate a slide", "Right-click it › Duplicate slide"],
              ["Move a slide", "Drag it to a new place in the filmstrip, or right-click › Move slide to end (or to the beginning)"],
              ["Move several at once", "Ctrl+click to select them, then drag"],
              ["Delete a slide", "Select it and press Delete, or right-click › Delete"],
              ["See all slides at once", "Grid view (button at the bottom left of the filmstrip)"],
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Copy a slide for the other building",
            prompt: "Put the steps in order to make an Elm Street Apartments version of the First Week slide at the end of the presentation.",
            items: [
              { id: "1", text: "Select the First Week slide in the filmstrip" },
              { id: "2", text: "Right-click it and choose Duplicate slide" },
              { id: "3", text: "Right-click the copy and choose Move slide to end" },
              { id: "4", text: "Change Riverside Commons to Elm Street Apartments on the copy" },
            ],
            explanation: "Duplicating keeps the layout, formatting, and text, so you only change what's different.",
          },
        ],
      },
      {
        heading: "Design for your audience",
        blocks: [
          {
            type: "drag-drop",
            mode: "sort",
            title: "Clear slide or cluttered slide?",
            prompt: "Sort each choice for a slide that tenants will read on a lobby screen.",
            buckets: [
              { id: "good", label: "Helps" },
              { id: "bad", label: "Gets in the way" },
            ],
            items: [
              { id: "a", text: "Three short bullet points", bucket: "good" },
              { id: "b", text: "A full paragraph in small type", bucket: "bad" },
              { id: "c", text: "One clear photo of the laundry room", bucket: "good" },
              { id: "d", text: "Four different fonts on one slide", bucket: "bad" },
              { id: "e", text: "Dark text on a light background", bucket: "good" },
              { id: "f", text: "Yellow text on a white background", bucket: "bad" },
            ],
            explanation: "Short text, one strong picture, consistent fonts (the theme's), and high contrast make a slide readable from a distance.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want a new lobby photo in the exact spot and size of the old one. What's the fastest way?",
            options: ["Delete the old photo, insert the new one, and resize it", "Right-click the old photo › Replace image", "Change the background", "Duplicate the slide"],
            correctIndex: 1,
            explanation: "Replace image swaps the picture and keeps its size and position.",
            optionRationales: [
              "That works, but you have to size and place it again.",
              "Correct.",
              "A background goes behind everything; it doesn't replace a picture on the slide.",
              "Duplicating copies the slide with the old photo still on it.",
            ],
          },
          {
            type: "knowledge-check",
            question: "In Change background, you choose a light blue color. What does Done do?",
            options: ["Applies it to every slide", "Applies it to the selected slide only", "Saves the presentation", "Applies it to the speaker notes"],
            correctIndex: 1,
            explanation: "Done changes the selected slide. The Add to theme button changes the whole presentation.",
            optionRationales: [
              "That's what Add to theme does.",
              "Correct.",
              "Slides saves automatically; Done applies the color to the selected slide.",
              "Backgrounds apply to slides, not notes.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Continue in the presentation you started in the last lesson (or create a new one)." },
      {
        type: "list",
        ordered: true,
        items: [
          "Insert a picture you took yourself, or one from Insert › Image › Stock & web.",
          "Add a shape with a short label in it, such as “Office hours”.",
          "Change the background of one slide only (Done). Then change another background with Add to theme and see what happens to the other slides.",
          "Duplicate a slide, move the copy to the end, and delete one slide you don't need.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot in grid view showing your slides to your instructor or course folder. If you can't use Google Slides, complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "transitions-animations-and-notes",
    title: "Transitions, Animations, and Speaker Notes",
    description:
      "Add slide transitions and object animations in the Motion panel, control when animations start, and write speaker notes for whoever presents.",
    objectives: [
      "Add a transition to one slide or to every slide",
      "Animate an object, choose when the animation starts, and play it back",
      "Show the speaker notes area and write notes for the presenter",
      "Use motion so it helps the audience instead of distracting them",
    ],
    duration: "20 min",
    slides: slides("transitions-animations-and-notes", [
      "Motion: transitions between slides, animations on objects",
      "Add a transition: Slide › Transition",
      "Animate an object: Insert › Animation",
      "On click, After previous, With previous",
      "Speaker notes: what to say, not what to show",
      "Quick check: transition, animation, or note?",
    ]),
    sections: [
      {
        heading: "Motion with a purpose",
        blocks: [
          {
            type: "scenario",
            role: "The welcome presentation will run two ways.",
            text: "On the lobby screen, the slides play by themselves, so bullet points can't wait for a click. At tenant orientation, Denise presents it and wants reminders of what to hand out and say. Both need gentle motion, not spinning text.",
            task: "Add a transition, animate the first-week list, and write speaker notes.",
          },
          {
            type: "table",
            caption: "Two kinds of motion",
            columns: ["", "Transition", "Animation"],
            rows: [
              ["What moves", "The whole slide, as it replaces the one before", "One object on a slide: a text box, picture, or shape"],
              ["Where to set it", "Slide › Transition (or Transition on the toolbar)", "Insert › Animation (or View › Motion)"],
              ["Examples", "Dissolve, Fade, Slide from right", "Fade in, Fly in from left, Zoom in"],
              ["PowerPoint", "Transitions tab", "Animations tab"],
            ],
          },
        ],
      },
      {
        heading: "Add a transition",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select the slide in the filmstrip.",
              "Select Slide › Transition. The Motion panel opens on the right.",
              "Under Slide transition, choose a transition, such as Dissolve. Drag the speed slider to make it faster or slower.",
              "To use the same transition everywhere, select Apply to all slides.",
              "Select Play to preview it.",
            ],
          },
        ],
      },
      {
        heading: "Animate an object",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select the object on the slide, such as the bulleted text.",
              "Select Insert › Animation (or View › Motion) to open the Motion panel. If no animation is listed for the object under Object Animations, select Add animation. New object animations are set to Appear (On click) by default.",
              "Choose the animation you want from the drop-down, such as Fade in.",
              "Choose when it starts: On click, After previous, or With previous. For text, check By paragraph to bring in one bullet at a time.",
              "Drag the speed slider if needed, and select Play to preview.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "When should it start?",
            prompt: "Drag the right start option onto each situation.",
            items: [
              { id: "a", text: "Denise wants each bullet to appear only when she's ready to talk about it", match: "On click" },
              { id: "b", text: "On the lobby screen, the list should appear by itself right after the slide arrives", match: "After previous" },
              { id: "c", text: "A photo and its caption should fade in at the same moment", match: "With previous" },
            ],
            explanation: "On click waits for the presenter. After previous starts by itself when the previous animation (or the slide) finishes. With previous runs at the same time as the animation before it.",
          },
          {
            type: "tip",
            text: "Use one or two kinds of motion for the whole presentation. If every slide spins, bounces, and flies, people watch the motion instead of reading the message.",
          },
        ],
      },
      {
        heading: "Speaker notes",
        blocks: [
          {
            type: "paragraph",
            text: "Speaker notes sit under each slide. They're for the presenter: reminders, details, and what to hand out. The audience doesn't see them during the slideshow. If the notes area is hidden, choose View › Show speaker notes, then click in it (it says Click to add speaker notes) and type.",
          },
          {
            type: "worked-example",
            title: "Notes for the First Week slide",
            task: "Help whoever presents the welcome presentation cover everything on slide 2.",
            steps: [
              { move: "Keep the slide short: three bullet points.", why: "Tenants read the slide; the presenter adds the details." },
              { move: "In the notes, write “Hand out the key fob form here.”", why: "It's an action for the presenter, not something tenants need to read on screen." },
              { move: "Add the office phone hours to the notes.", why: "If someone asks, the presenter has the answer without adding clutter to the slide." },
            ],
            result: "A clean slide for the audience, and a script for the presenter.",
            takeaway: "Put what the audience must see on the slide; put what the presenter must say or do in the notes.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want the bullet points on slide 2 to appear one at a time when you click. What do you add?",
            options: ["A slide transition", "An animation on the text, starting On click, by paragraph", "A speaker note", "A new theme"],
            correctIndex: 1,
            explanation: "An animation on the text box set to On click, with By paragraph checked, brings in one bullet per click.",
            optionRationales: [
              "A transition moves the whole slide, not individual bullets.",
              "Correct.",
              "Notes are for the presenter; they don't change what's on screen.",
              "A theme changes colors and fonts, not motion.",
            ],
          },
          {
            type: "knowledge-check",
            question: "What's the best use of speaker notes?",
            options: ["Long paragraphs the audience should read", "Reminders and details for the presenter", "The presentation's title", "A list of animations"],
            correctIndex: 1,
            explanation: "Speaker notes are for the presenter and aren't shown on the audience's screen.",
            optionRationales: [
              "The audience doesn't see the notes during the slideshow.",
              "Correct.",
              "The title belongs on the title slide.",
              "Animations are listed in the Motion panel.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "In your own practice presentation:" },
      {
        type: "list",
        ordered: true,
        items: [
          "Add a transition to one slide, then select Apply to all slides.",
          "Animate the text on one slide with Fade in, By paragraph, starting On click. Play it.",
          "Write a speaker note on at least two slides.",
          "Start the slideshow and click through the animated slide to check the timing.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot showing the Motion panel and a slide with speaker notes to your instructor or course folder. If you can't use Google Slides, complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "present-share-and-download",
    title: "Present, Share, and Download",
    description:
      "Skip slides you're not ready to show, present with presenter view or in Google Meet, share the presentation at the right access level, and download PowerPoint and PDF copies.",
    objectives: [
      "Skip a slide so it doesn't appear in the slideshow",
      "Present from the beginning and use presenter view with speaker notes",
      "Present Google Slides in a Google Meet call",
      "Share a presentation as Viewer, Commenter, or Editor, and download it as a PowerPoint or PDF file",
    ],
    duration: "20 min",
    slides: slides("present-share-and-download", [
      "From draft to presentation",
      "Skip a slide instead of deleting it",
      "Slideshow and presenter view",
      "Present in Google Meet",
      "Share or download?",
      "Presenter checklist",
    ]),
    sections: [
      {
        heading: "Ready for orientation",
        blocks: [
          {
            type: "scenario",
            role: "The welcome presentation is almost done.",
            text: "A draft slide about parking isn't approved yet. Denise will present at orientation, sometimes over Google Meet for tenants who can't come in. Andre Wallace, the leasing agent, wants to suggest changes. The lobby screen needs a PowerPoint copy, and new tenants get a PDF by email.",
            task: "Hide the draft slide, rehearse, share with Andre, and make both downloads.",
          },
          {
            type: "list",
            items: [
              "To skip a slide, right-click it in the filmstrip and choose Skip slide. It stays in the file but doesn't appear in the slideshow. Choose it again to show the slide.",
              "Skipping is safer than deleting a slide you'll need later: the content and its notes stay in the presentation.",
            ],
          },
        ],
      },
      {
        heading: "Present your slides",
        blocks: [
          {
            type: "list",
            items: [
              "Slideshow (top right) presents full screen from the slide you're on. The arrow next to Slideshow has Present from beginning and Presenter view.",
              "Presenter view opens a separate window with your speaker notes, a timer, and the next slide, while the audience sees only the slides. It works best with a second screen or projector.",
              "Move through the slides with the arrow keys. Home goes to the first slide and End to the last; type a slide number and press Enter to jump to it.",
              "While presenting, press S to open speaker notes, L for the laser pointer, and B or W for a blank black or white screen (press any key to return).",
              "Press Esc to stop presenting.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Present in Google Meet (work or school accounts, in Chrome): in the Meet call, select Present now › A tab, choose the presentation's tab, and select Share. Then select Start slideshow in Meet. You can show your speaker notes and add a co-presenter. In PowerPoint and Teams, the matching step is sharing PowerPoint Live in the Teams meeting.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Rehearse, then present",
            prompt: "Put Denise's steps in order for orientation day.",
            items: [
              { id: "1", text: "Right-click the draft parking slide › Skip slide" },
              { id: "2", text: "Arrow next to Slideshow › Presenter view, and read through the notes" },
              { id: "3", text: "End the rehearsal" },
              { id: "4", text: "Arrow next to Slideshow › Present from beginning" },
              { id: "5", text: "Press Esc when the last slide is done" },
            ],
            explanation: "Hide what isn't ready, rehearse with your notes, then present from the first slide.",
          },
        ],
      },
      {
        heading: "Share or download?",
        blocks: [
          {
            type: "paragraph",
            text: "Share the Google Slides file when people should see the current version and work with you. Download a copy when someone needs a separate file: a PowerPoint for a screen that runs PowerPoint, or a PDF for people who only need to read it. A downloaded copy doesn't update when you change the original.",
          },
          {
            type: "table",
            caption: "Choose the access level (see Module 2 for the full Share box)",
            columns: ["Role", "Can", "Good for"],
            rows: [
              ["Viewer", "See the presentation", "Staff who only need to watch or read it"],
              ["Commenter", "See it and add comments", "Andre, who should suggest changes without changing slides"],
              ["Editor", "Change slides and share the file", "Denise, who co-owns the work"],
            ],
          },
          {
            type: "list",
            items: [
              "Share: select Share (top right), type the person's name or email, choose Viewer, Commenter, or Editor, and select Send.",
              "PowerPoint copy: File › Download › Microsoft PowerPoint (.pptx).",
              "PDF copy: File › Download › PDF Document (.pdf).",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Share it or send a copy?",
            prompt: "Drag the best choice onto each request.",
            items: [
              { id: "a", text: "Denise will keep editing the presentation with you", match: "Share as Editor" },
              { id: "b", text: "Andre will leave suggestions in comments", match: "Share as Commenter" },
              { id: "c", text: "A new tenant needs a copy to read at home", match: "Download a PDF" },
              { id: "d", text: "The lobby screen only plays PowerPoint files", match: "Download a .pptx" },
            ],
            explanation: "Share the Slides file with people who work on it. Send a PDF to people who only read it, and a .pptx when a PowerPoint file is required.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A slide isn't approved yet, but you'll need it next week. What should you do before presenting?",
            options: ["Delete it", "Skip it", "Move it to the end", "Change its background"],
            correctIndex: 1,
            explanation: "A skipped slide stays in the file but doesn't appear in the slideshow.",
            optionRationales: [
              "Deleting removes the slide and its notes.",
              "Correct.",
              "It would still appear at the end of the slideshow.",
              "Changing the background doesn't hide the slide.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You want to see your speaker notes while the audience sees only the slides. What do you use?",
            options: ["Slideshow", "Presenter view", "Grid view", "File › Download"],
            correctIndex: 1,
            explanation: "Presenter view shows your notes, a timer, and the next slide in a separate window.",
            optionRationales: [
              "Slideshow shows only the slides.",
              "Correct.",
              "Grid view is for organizing slides while editing.",
              "Downloading makes a copy of the file.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Andre should be able to suggest changes in comments but not change the slides. Which role do you give him?",
            options: ["Viewer", "Commenter", "Editor", "Owner"],
            correctIndex: 1,
            explanation: "Commenters can add comments but can't change the slides.",
            optionRationales: [
              "Viewers can't add comments.",
              "Correct.",
              "Editors can change slides.",
              "Ownership isn't needed to suggest changes.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Finish your practice presentation in your own Google Account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Skip one slide. Then start the slideshow from the beginning and check that it doesn't appear.",
          "Open presenter view and practice with your speaker notes.",
          "Share the presentation with a classmate (or a second account of your own) as a Commenter.",
          "Download it as a PDF and as a PowerPoint (.pptx) file. Open the PDF to check it.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the PDF of your presentation and a screenshot of the Share box showing the Commenter to your instructor or course folder. If you can't use Google Slides, complete the practice simulation and submit its results page.",
      },
    ],
  },
];
