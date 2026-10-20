import type { SimDefinition } from "@/types/sim";

/** PowerPoint Module 4: Managing Slides and Presentations. Keys are `${moduleSlug}::${lessonSlug}`. */
export const pptModule4Sims: Record<string, SimDefinition[]> = {
  "module-4::managing-slides": [
    {
      id: "ppt-m4-managing-slides-1",
      app: "powerpoint",
      title: "Organize the annual review into sections",
      scenario: "The 2026 annual review deck at Lakeside Medical Associates has grown to ten slides in no clear order. Fix its shape in Slide Sorter, group it into sections, and keep a backup slide out of the show.",
      fileName: "Annual Review 2026.pptx",
      minutes: 7,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "2026 Annual Review", subtitle: "Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "Agenda", body: ["Results", "Our people", "Goals for 2027"] },
          { id: "s3", layout: "Title and Content", title: "Patient Visits Grew 12%", body: ["41,200 visits this year", "Biggest growth: Saturday hours"] },
          { id: "s4", layout: "Title and Content", title: "Portal Sign-Ups Doubled", body: ["1,240 new portal users", "Fewer phone calls for test results"] },
          { id: "s5", layout: "Title and Content", title: "Staff Recognition", body: ["Five-year service awards", "Patient compliment of the year"] },
          { id: "s6", layout: "Title and Content", title: "Front Desk Team", body: ["Online check-in launched", "Average check-in under 4 minutes"] },
          { id: "s7", layout: "Title and Content", title: "Wait Times Fell 8 Minutes", body: ["Average wait now 14 minutes", "Text alerts when the provider is running late"] },
          { id: "s8", layout: "Title and Content", title: "Billing Team", body: ["Claims denials down 6%", "Second billing specialist hired"] },
          { id: "s9", layout: "Title and Content", title: "Goals for 2027", body: ["Same-day appointments for urgent needs", "Spanish-language patient portal"] },
          { id: "s10", layout: "Title and Content", title: "Backup: Visit Numbers by Month", body: ["January to June: 19,800", "July to December: 21,400"] },
        ],
      },
      tasks: [
        {
          instruction: "Switch to Slide Sorter view.",
          hint: "View tab › Presentation Views › Slide Sorter (or the Slide Sorter button on the status bar).",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Slide Sorter" } }],
        },
        {
          instruction: "Move the slide “Wait Times Fell 8 Minutes” so it comes right after “Portal Sign-Ups Doubled”.",
          hint: "In Slide Sorter view, drag “Wait Times Fell 8 Minutes” and drop it on slide 5, “Staff Recognition”. It takes that spot and the other slides shift down.",
          steps: [{ action: { kind: "command", id: "slides.move", value: "s7@5" } }],
        },
        {
          instruction: "Add a section that starts at slide 1 and name it “Introduction”.",
          hint: "Click slide 1. Home tab › Slides group › Section › Add Section. Type Introduction, then click Rename.",
          steps: [{ action: { kind: "dialog", id: "addSection", values: { name: "Introduction" } }, requires: { slide: "s1" }, selectHint: "Click slide 1 first." }],
        },
        {
          instruction: "Add a section named “Results” that starts with the slide “Patient Visits Grew 12%”.",
          hint: "Click the slide “Patient Visits Grew 12%”. Home tab › Section › Add Section. Type Results, then click Rename.",
          steps: [{ action: { kind: "dialog", id: "addSection", values: { name: "Results" } }, requires: { slide: "s3" }, selectHint: "Click the slide “Patient Visits Grew 12%” first." }],
        },
        {
          instruction: "Add a section named “Our People” that starts with the slide “Staff Recognition”.",
          hint: "Click the slide “Staff Recognition”. Home tab › Section › Add Section. Type Our People, then click Rename.",
          steps: [{ action: { kind: "dialog", id: "addSection", values: { name: "Our People" } }, requires: { slide: "s5" }, selectHint: "Click the slide “Staff Recognition” first." }],
        },
        {
          instruction: "Keep the slide “Backup: Visit Numbers by Month” in the file but skip it during the slide show.",
          hint: "Right-click the “Backup: Visit Numbers by Month” thumbnail › Hide Slide (or select it, then Slide Show tab › Hide Slide).",
          steps: [{ action: { kind: "command", id: "slides.hide" }, alt: [{ kind: "command", id: "slideshow.hideSlide" }], requires: { slide: "s10" }, selectHint: "Click the “Backup: Visit Numbers by Month” slide first." }],
        },
        {
          instruction: "Return to Normal view and add the speaker note “Ask each team lead to share one goal.” to the slide “Goals for 2027”.",
          hint: "View tab › Normal (or the Normal button on the status bar). Click the “Goals for 2027” thumbnail, double-click the Notes pane under the slide, type the note, then click outside it.",
          steps: [
            { action: { kind: "command", id: "view.mode", value: "Normal" } },
            { action: { kind: "type", target: "s9.notes", value: "Ask each team lead to share one goal." } },
          ],
        },
        {
          instruction: "Rename the section “Our People” to “Our Team”.",
          hint: "Right-click the “Our People” section heading in the thumbnails › Rename Section (or click a slide in that section, then Home › Section › Rename Section). Type Our Team, then click Rename.",
          steps: [{ action: { kind: "dialog", id: "renameSection", values: { name: "Our Team" } }, requires: { selection: ["s5", "s6", "s8", "s9", "s10"] }, selectHint: "Click a slide in the “Our People” section first (or right-click the section heading)." }],
        },
      ],
    },
  ],

  "module-4::printing-presentations": [
    {
      id: "ppt-m4-printing-1",
      app: "powerpoint",
      title: "Print the board packet without wasting toner",
      scenario: "You prepare printed materials for the Lakeside Medical Associates board meeting. The deck uses a dark theme, and twelve board members each need a packet they can write on.",
      fileName: "Board Meeting - October.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        theme: "Ion",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Board Meeting", subtitle: "October 2026 · Lakeside Medical Associates", notes: "Welcome the board and introduce the new medical director." },
          { id: "s2", layout: "Title and Content", title: "Quarter Highlights", body: ["Visits up 9% over Q2", "Portal sign-ups: 1,240", "Two new providers started"], notes: "Spend no more than two minutes here." },
          { id: "s3", layout: "Title and Content", title: "Budget Snapshot", body: ["Revenue on target", "Staffing costs 3% over plan", "Equipment purchase deferred to Q1"] },
          { id: "s4", layout: "Title and Content", title: "Patient Satisfaction", body: ["Overall rating: 4.6 out of 5", "Top comment: friendly front desk", "Top concern: parking"], notes: "Updated with the final survey numbers on Oct 18." },
          { id: "s5", layout: "Title and Content", title: "Decisions Needed", body: ["Approve Saturday hours pilot", "Approve second billing specialist"] },
          { id: "s6", layout: "Title Only", title: "Questions" },
        ],
      },
      tasks: [
        {
          instruction: "Preview how the dark slides will look when printed in black and white.",
          hint: "View tab › Color/Grayscale group › Black and White.",
          steps: [{ action: { kind: "command", id: "view.grayscale", value: "Black and White" } }],
        },
        {
          instruction: "Print 12 copies of the presentation as handouts with 3 slides per page.",
          hint: "File › Print (or Ctrl+P). Set Copies to 12, change Full Page Slides to 3 Slides (Handouts), then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 12, layout: "3 Slides (Handouts)" } } }],
        },
        {
          instruction: "Print one copy of your speaker notes for yourself.",
          hint: "File › Print. Keep Copies at 1, change the layout to Notes Pages, then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 1, layout: "Notes Pages" } } }],
        },
        {
          instruction: "Slide 4 changed after the packets were printed. Print 12 copies of slide 4 only.",
          hint: "File › Print. Set Copies to 12, choose Custom Range, type 4 in the Slides box, then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 12, pages: ["4", "4-4"] } } }],
        },
        {
          instruction: "Print an outline of the presentation so you can review the argument without the design.",
          hint: "File › Print. Change the layout to Outline, then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { layout: "Outline" } } }],
        },
        {
          instruction: "Send a 6-slides-per-page handout to the printer “Front Desk HP LaserJet” for the front desk binder.",
          hint: "File › Print. Choose Front Desk HP LaserJet under Printer, change the layout to 6 Slides Horizontal (Handouts), then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { printer: "Front Desk HP LaserJet", layout: "6 Slides Horizontal (Handouts)" } } }],
        },
      ],
    },
  ],

  "module-4::presenting-your-slide-show": [
    {
      id: "ppt-m4-presenting-1",
      app: "powerpoint",
      title: "Run the all-staff meeting from the front of the room",
      scenario: "You present at the Lakeside Medical Associates all-staff meeting. Practice the controls that let you move around the deck, point at data, and keep your notes in front of you.",
      fileName: "All-Staff Meeting.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        theme: "Retrospect",
        slides: [
          { id: "s1", layout: "Title Slide", title: "All-Staff Meeting", subtitle: "November 2026", notes: "Welcome everyone. Thank the night shift for joining." },
          { id: "s2", layout: "Title and Content", title: "Agenda", body: ["Flu season update", "New check-in kiosks", "Visit numbers", "Recognition"], notes: "Keep the agenda to one minute." },
          { id: "s3", layout: "Title and Content", title: "Flu Season Update", body: ["Staff flu shots: 92% complete", "Walk-in clinic every Tuesday"], notes: "Remind the 8% who still need a flu shot that the deadline is Friday." },
          { id: "s4", layout: "Title and Content", title: "New Check-In Kiosks", body: ["Two kiosks in the main lobby", "Front desk still checks ID"], notes: "Demo the kiosk after the meeting." },
          { id: "s5", layout: "Section Header", title: "By the Numbers", subtitle: "October results" },
          {
            id: "s6",
            layout: "Title Only",
            title: "Visit Volume by Month",
            notes: "October was our busiest month. Point out the jump from September.",
            objects: [{ id: "o1", kind: "chart", label: "Clustered Column", style: "Clustered Column", x: 10, y: 24, w: 80, h: 68, series: [{ label: "Jul", value: 3310 }, { label: "Aug", value: 3420 }, { label: "Sep", value: 3380 }, { label: "Oct", value: 3970 }] }],
          },
          { id: "s7", layout: "Title and Content", title: "Recognition", body: ["Front desk: 98% check-in accuracy", "Billing: fastest claim turnaround this year"], notes: "Ask the team leads to stand." },
          { id: "s8", layout: "Title Only", title: "Questions?" },
        ],
      },
      tasks: [
        {
          instruction: "Start the slide show from the beginning.",
          hint: "Slide Show tab › From Beginning (or press F5).",
          steps: [{ action: { kind: "command", id: "slideshow.fromBeginning" } }],
        },
        {
          instruction: "Someone asks about the visit numbers. Jump straight to slide 6 without clicking through the slides in between.",
          hint: "While presenting, type 6 and press Enter. You can also right-click › See All Slides and click slide 6.",
          steps: [{ action: { kind: "command", id: "slideshow.goto", value: "6" } }],
        },
        {
          instruction: "Turn the pointer into a pen so you can circle the October column.",
          hint: "Press Ctrl+P, or click the pen button on the slide show toolbar (bottom left) › Pen. Then drag on the slide to draw.",
          steps: [{ action: { kind: "command", id: "slideshow.pointer", value: "Pen" } }],
        },
        {
          instruction: "Black out the screen while the room discusses the numbers.",
          hint: "Press B (or right-click › Screen: Black Screen). Press B again to bring the slide back.",
          steps: [{ action: { kind: "command", id: "slideshow.screen", value: "Black" } }],
        },
        {
          instruction: "End the slide show.",
          hint: "Press Esc. If the pen is still on, the first Esc turns it off and the second ends the show (or right-click › End Show).",
          steps: [{ action: { kind: "command", id: "slideshow.end" } }],
        },
        {
          instruction: "Turn on the setting that shows your notes, a timer, and the next slide on your own screen while you present.",
          hint: "Slide Show tab › Monitors group › check Use Presenter View.",
          steps: [{ action: { kind: "command", id: "slideshow.presenterView" } }],
        },
        {
          instruction: "Start the slide show from slide 3 to rehearse the flu season update.",
          hint: "Click slide 3 in the thumbnails, then Slide Show tab › From Current Slide (or press Shift+F5).",
          steps: [{ action: { kind: "command", id: "slideshow.fromCurrent" }, alt: [{ kind: "command", id: "slideshow.presenterStart" }], requires: { slide: "s3" }, selectHint: "Click slide 3 in the thumbnails before you start the show." }],
        },
        {
          instruction: "End the show, then set up the slide show so only slides 1 through 5 are shown.",
          hint: "Press Esc to end the show. Slide Show tab › Set Up Slide Show. Under Show slides choose From:, set From slide to 1 and To slide to 5, then click OK.",
          steps: [{ action: { kind: "dialog", id: "setupShow", values: { showSlides: "From:", from: 1, to: 5 } } }],
        },
      ],
    },
  ],
};
