import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M3 = {
"applying-themes": {
  "objectives": [
    "Apply a theme and explain what it changes",
    "Choose theme variants and understand what they alter",
    "Judge a theme by legibility rather than attractiveness",
    "Keep a deck consistent with organizational branding",
  ],
  "opening": {
    "heading": "Choose a theme for the room, not for the monitor",
    "blocks": [
      {"type": "scenario",
       "role": "You design the annual staff briefing at Lakeside Medical Associates.",
       "text": "You pick a theme with pale grey text on a white background. It looks refined on your monitor. Projected in a room where the lights must stay on, the text is close to invisible from the fourth row.",
       "task": "Evaluate a theme by whether it survives a real projector in a real room."},
      {"type": "paragraph",
       "text": "A theme sets colors, fonts, and effects across every slide at once, so the whole deck stays coherent and a redesign is one click rather than forty. That is its value. Its risk is that theme choice is usually made on a bright monitor a foot from your face, under conditions nothing like a presentation."},
      {"type": "paragraph",
       "text": "Projection loses contrast, and ambient light loses more. Strong contrast — genuinely dark text on a genuinely light background, or the reverse — is the single most important property of a presentation theme. Mid-grey on white, or any two mid-tones together, will fail in the room."},
      {"type": "callout", "variant": "warning",
       "text": "Test on the actual equipment when the presentation matters. Colors shift on projectors, thin fonts lose their strokes, and a subtle background gradient can turn into visible banding. Ten minutes in the room beforehand catches all of it — and is also when you discover the resolution is different from your laptop's."},
    ],
  },
  "checks": [{"explanation": "A theme applies a coordinated set of colors, fonts, backgrounds, and effects across every slide, so the deck stays visually consistent and can be redesigned in one action.",
    "rationales": [
      "Fonts are one part of a theme. It also changes colors, backgrounds, and effects.",
      "Themes are static design. Animation is applied separately from the Animations tab.",
      "Correct. A theme changes the overall visual design — colors, fonts, and backgrounds — across the deck.",
      "Themes never alter content. Only the design changes.",
    ]}],
},
"modifying-themes": {
  "objectives": [
    "Change theme colors, fonts, and effects independently",
    "Create and save a custom theme for reuse",
    "Check color contrast for legibility",
    "Apply organizational branding consistently",
  ],
  "opening": {
    "heading": "Build the practice's theme once",
    "blocks": [
      {"type": "scenario",
       "role": "You standardize presentations across Lakeside Medical Associates.",
       "text": "Five staff produce decks and all five look different. Patients and partners see materials that do not appear to come from the same organization. Everyone is choosing colors from scratch each time, because there is nothing to choose from.",
       "task": "Define the practice's colors and fonts once as a saved theme, so consistency is the easy path."},
      {"type": "paragraph",
       "text": "Theme colors, fonts, and effects can each be changed independently from the Design tab's Variants dropdown. Set the practice's palette and typefaces, then Save Current Theme — the theme appears in the gallery for everyone it is shared with, in PowerPoint, Word, and Excel alike."},
      {"type": "paragraph",
       "text": "Once the theme exists, staff choose from theme colors rather than inventing them, and every deck matches without anyone needing to remember a hex code. Making the consistent choice the easy one is what actually produces consistency."},
      {"type": "callout", "variant": "warning",
       "text": "Check contrast when you set the palette, not afterwards. Body text should reach at least a 4.5:1 contrast ratio against its background; large display text can go to 3:1. Free checkers online will give you the number from two hex values. Building the palette to pass means no one downstream has to think about it."},
    ],
  },
  "checks": [{"explanation": "Theme colors define the palette applied across the presentation — backgrounds, text, accents, chart series, and shape fills all draw from it.",
    "rationales": [
      "Theme effects control shadows, reflections, and 3-D treatments on shapes.",
      "Theme fonts set the heading and body typefaces.",
      "Background styles are variations built from the theme colors, so they follow the palette rather than defining it.",
      "Correct. Theme colors define the palette used throughout the presentation.",
    ]}],
},
"slide-master-view": {
  "objectives": [
    "Open Slide Master view and explain what it controls",
    "Distinguish the master from the layouts beneath it",
    "Add a logo or standing element to every slide at once",
    "Edit a layout without affecting the rest of the deck",
  ],
  "opening": {
    "heading": "One change instead of forty",
    "blocks": [
      {"type": "scenario",
       "role": "You maintain the standard deck at Lakeside Medical Associates.",
       "text": "The practice logo must appear on every slide of a forty-slide deck. Pasted onto each slide by hand, it lands in forty slightly different positions and takes twenty minutes. Placed on the Slide Master, it appears once on every slide, in exactly the same place, in about fifteen seconds.",
       "task": "Use the master for anything that should appear on every slide."},
      {"type": "paragraph",
       "text": "Slide Master view (View > Slide Master) shows a hierarchy. The master is at the top, and every layout beneath inherits from it. A change to the master reaches all layouts; a change to one layout affects only slides using that layout. This is the same inheritance idea as styles in Word, applied to slide design."},
      {"type": "table",
       "caption": "Where to make a change",
       "columns": ["You want to change", "Edit", "Effect"],
       "rows": [
         ["Logo on every slide", "The master", "Appears on all layouts at once"],
         ["Title font throughout", "The master's title placeholder", "Every layout's title updates"],
         ["The title slide only", "The Title Slide layout", "Other slides are unaffected"],
         ["Add a new arrangement", "Insert Layout", "Becomes available in the New Slide gallery"],
       ]},
      {"type": "worked-example",
       "title": "Putting the practice logo on every slide",
       "task": "Add the logo to a forty-slide deck so it sits identically on every slide and stays there as slides are added.",
       "steps": [
         {"move": "View > Slide Master, and select the top thumbnail — the master itself.",
          "why": "The top thumbnail is larger and sits above the indented layouts. Selecting a layout instead is the usual mistake, and it puts the logo on only the slides using that one layout."},
         {"move": "Insert the logo and position it, allowing clear space from the edges.",
          "why": "Projectors and video calls sometimes crop the outer edge of a slide. Keeping the logo a little inside the boundary means it survives that, and it looks deliberate rather than jammed into the corner."},
         {"move": "Close Master View and check several slides, including the title slide.",
          "why": "The Title Slide layout often has its own background and may position or hide the logo differently. Checking a few slides of different layouts confirms the change reached them as intended."},
         {"move": "Add a new slide and confirm the logo appears on it too.",
          "why": "This is the actual test of whether you edited the master rather than individual slides. A logo that appears on new slides automatically is inherited; one that does not was pasted onto existing slides."},
       ],
       "result": "The logo on every slide, in one position, appearing automatically on any slide added later.",
       "takeaway": "Edit the master for what belongs everywhere and a layout for what belongs on one kind of slide. Never paste a standing element onto individual slides."},
    ],
  },
  "checks": [
    {"explanation": "The Slide Master sits at the top of the design hierarchy: changes there flow down to every layout and therefore to the whole presentation.",
     "rationales": [
       "A single slide is edited directly in Normal view. The master's purpose is precisely that it is not limited to one slide.",
       "Correct. The master controls the design for the entire presentation through the layouts that inherit from it.",
       "Animation is applied per object from the Animations tab. The master governs design and layout.",
     ]},
    {"explanation": "A layout is a slide structure template — a named arrangement of placeholders that inherits its design from the master. Choosing a layout decides where content sits on that slide.",
     "rationales": [
       "A color theme is part of the theme, set from the Design tab.",
       "Correct. A layout is a slide structure template defining the placeholder arrangement.",
       "Font styles come from the theme fonts, not from a layout.",
     ]},
    {"explanation": "Placeholders define where content belongs on a slide. Because their position comes from the master, typing into placeholders rather than free text boxes is what keeps every slide aligned consistently.",
     "rationales": [
       "Placeholders do not lock anything. Restricting changes is a separate feature.",
       "Correct. Placeholders define the content areas, which is what keeps slides consistent.",
       "Animation is applied separately. A placeholder can be animated, but that is not its purpose.",
     ]},
  ],
},
}

M4 = {
"managing-slides": {
  "objectives": [
    "Reorder, duplicate, hide, and delete slides",
    "Organize a long deck into sections",
    "Use speaker notes effectively",
    "Choose the right view for reorganizing a presentation",
  ],
  "opening": {
    "heading": "Structure the deck before you polish it",
    "blocks": [
      {"type": "scenario",
       "role": "You assemble the annual review deck at Lakeside Medical Associates.",
       "text": "Forty-five slides in Normal view means scrolling a thumbnail strip to find anything. Reordering means dragging a slide past thirty others and hoping it lands where you meant.",
       "task": "Use Slide Sorter and sections to work on the deck's shape rather than one slide at a time."},
      {"type": "paragraph",
       "text": "Slide Sorter view shows every slide as a thumbnail on one screen, which is the right place to reorder, delete, and check visual consistency. Seeing all forty-five at once also reveals patterns you cannot notice one slide at a time — six consecutive bullet slides, or a title that jumps position."},
      {"type": "paragraph",
       "text": "Sections group slides under named headings that collapse and expand. In a long deck they make navigation practical, and they let you jump directly to a section when a question comes up during the presentation."},
      {"type": "tip",
       "text": "Hiding a slide (right-click > Hide Slide) keeps it in the file but skips it during the show. It is the right way to hold backup detail for a question you might be asked — the slide is there if you need it and never appears if you do not."},
    ],
  },
  "checks": [
    {"explanation": "Slide Sorter view shows every slide as a thumbnail on one screen, so you can drag slides into a new order and see the whole deck's structure at once.",
     "rationales": [
       "Reading View plays the presentation in a window for review. It does not support reordering.",
       "Correct. Slide Sorter shows all slides as thumbnails, making reordering and structural review straightforward.",
       "Notes Page view shows one slide with its notes below, for working on what you will say.",
       "Slide Show view presents full screen to an audience and cannot be used for editing.",
     ]},
    {"explanation": "Speaker notes hold what you plan to say. The audience never sees them, and they appear in Presenter View alongside a timer and the next slide.",
     "rationales": [
       "Design changes are made on the slide itself or through the Slide Master.",
       "Correct. Notes hold reminders and talking points, visible only to you in Presenter View.",
       "Transitions are applied from the Transitions tab, independently of notes.",
       "Sections are created by right-clicking between slides. Notes are attached to a single slide.",
     ]},
    {"explanation": "Sections group slides under named, collapsible headings, which makes a long deck navigable and lets you move a whole group of slides at once.",
     "rationales": [
       "Sections have no effect on animation.",
       "Sections are an organizational tool and do not affect printing speed.",
       "Correct. Sections organize a large presentation into named groups.",
       "Layouts and sections do different jobs — a layout arranges one slide's content, a section groups many slides.",
     ]},
  ],
},
"printing-presentations": {
  "objectives": [
    "Choose an appropriate print layout for a given purpose",
    "Print handouts with a sensible number of slides per page",
    "Print speaker notes for yourself",
    "Reduce ink and improve legibility on printed slides",
  ],
  "opening": {
    "heading": "A printed deck serves a different purpose from a projected one",
    "blocks": [
      {"type": "scenario",
       "role": "You prepare materials for the board meeting at Lakeside Medical Associates.",
       "text": "You print forty slides full page, one per sheet, on a dark-backgrounded theme. Forty sheets per attendee, most of the toner cartridge, and pages so dark the text is barely legible on paper.",
       "task": "Pick the print layout that matches what the reader will do with it."},
      {"type": "table",
       "caption": "Print layouts",
       "columns": ["Layout", "Produces", "Use for"],
       "rows": [
         ["Full Page Slides", "One slide per sheet", "Rarely — only when detail genuinely needs the size"],
         ["Notes Pages", "Slide plus your notes", "Your own copy while presenting"],
         ["Handouts, 3 per page", "Slides with ruled lines beside them", "Audience handouts — the lines invite notes"],
         ["Handouts, 6 per page", "Six thumbnails per sheet", "A compact reference after the session"],
         ["Outline", "Text only", "Reviewing the argument without design"],
       ]},
      {"type": "tip",
       "text": "For a dark-themed deck, choose Color/Grayscale > Pure Black and White in the print settings. It prints readable text on a white background instead of reproducing the dark background, saving most of the toner and producing something people can actually read and annotate."},
    ],
  },
  "checks": [{"explanation": "The Handouts layouts print slide thumbnails, and the 3-per-page option adds ruled lines beside each slide specifically so the audience can write notes.",
    "rationales": [
      "Full Page Slides prints one slide per sheet with no room for notes.",
      "Notes Pages prints the presenter's own notes below each slide, which is for you rather than the audience.",
      "Correct. Handouts, particularly 3 per page, include ruled lines for audience notes.",
      "Outline prints the text hierarchy only, with no slides and no note space.",
    ]}],
},
"presenting-your-slide-show": {
  "objectives": [
    "Start a slide show and navigate it confidently",
    "Use Presenter View to see notes, timing, and the next slide",
    "Use presentation tools such as the pen and screen blanking",
    "Prepare for the practical failures that occur during presentations",
  ],
  "opening": {
    "heading": "Presenter View is the reason to stop reading your slides",
    "blocks": [
      {"type": "scenario",
       "role": "You present at the all-staff meeting at Lakeside Medical Associates.",
       "text": "Without Presenter View you turn to the screen to see what is on the slide, which means talking to the wall. You cannot see what is coming next, and you have no idea whether you are running long.",
       "task": "Use Presenter View so your notes, the next slide, and a timer are in front of you and the audience sees only the presentation."},
      {"type": "paragraph",
       "text": "Presenter View puts your notes, a timer, a preview of the next slide, and navigation controls on your screen while the audience sees the slide alone. It is the single feature that most improves how a presentation is delivered, because it removes every reason to look at the projection."},
      {"type": "table",
       "caption": "Controls worth knowing before you stand up",
       "columns": ["Key", "Does"],
       "rows": [
         ["F5", "Starts the show from the beginning"],
         ["Shift + F5", "Starts from the current slide — what you want when rehearsing"],
         ["B or W", "Blanks the screen to black or white"],
         ["Number then Enter", "Jumps directly to that slide"],
         ["Esc", "Ends the show"],
         ["Ctrl + P", "Turns the pointer into a pen for annotating"],
       ]},
      {"type": "tip",
       "text": "Pressing B blanks the screen to black. When discussion starts, or a question takes you off the deck, blanking removes the slide as a distraction and brings attention back to the room. It is the most useful key in the list and almost nobody knows it."},
      {"type": "callout", "variant": "warning",
       "text": "Have a fallback. Carry the deck on a USB drive and a PDF export, know your opening two minutes well enough to start without slides, and arrive early enough to test the display. Presentations fail on unfamiliar hardware more often than on anything you did wrong in PowerPoint."},
    ],
  },
  "checks": [{"explanation": "Presenter View shows your notes, a timer, and the upcoming slide on your screen while the audience sees only the current slide — which is what lets you speak to the room rather than read the projection.",
    "rationales": [
      "Slide Sorter is an editing view showing thumbnails. It is not used while presenting.",
      "Correct. Presenter View gives you notes, timing, and the next slide privately.",
      "Reading View plays the show in a window for your own review, with no separate presenter display.",
      "Outline View shows the text hierarchy for drafting and is not a presentation view.",
    ]}],
},
}

apply("lib/content/ms-office/powerpoint/module3Lessons.ts", M3)
apply("lib/content/ms-office/powerpoint/module4Lessons.ts", M4)
