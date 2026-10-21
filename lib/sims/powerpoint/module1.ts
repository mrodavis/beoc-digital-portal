import type { PptSlide, SimDefinition } from "@/types/sim";

/** PowerPoint Module 1: Getting Started. Keys are `${moduleSlug}::${lessonSlug}`. */

const briefing: PptSlide[] = [
  { id: "s1", layout: "Title Slide", title: "October All-Staff Briefing", subtitle: "Lakeside Medical Associates" },
  { id: "s2", layout: "Title and Content", title: "What's New This Month", body: ["Patient portal goes live October 27", "Flu shot clinic every Tuesday", "Parking garage level 2 reopens"] },
  { id: "s3", layout: "Title and Content", title: "Flu Shot Clinic", body: ["Tuesdays, 8:00 AM to 12:00 PM", "Walk-ins welcome", "Staff flu shots are free"] },
  { id: "s4", layout: "Two Content", title: "Front Desk Reminders", body: ["Verify insurance at every visit", "Scan a photo ID"], body2: ["Confirm the phone number", "Offer portal sign-up"] },
  { id: "s5", layout: "Title Only", title: "Questions?" },
];

const orientation: PptSlide[] = [
  { id: "s1", layout: "Title Slide", title: "New Staff Orientation", subtitle: "Lakeside Medical Associates" },
  { id: "s2", layout: "Title and Content", title: "Your First Day", body: ["Badge photo at 8:30 AM", "Meet your supervisor", "Tour the clinic"] },
  { id: "s3", layout: "Title and Content", title: "Our Clinic Hours", body: ["Monday to Friday: 8:00 AM to 6:00 PM", "Saturday: 9:00 AM to 1:00 PM", "Closed Sundays and holidays"] },
  { id: "s4", layout: "Title and Content", title: "Old Parking Rules", body: ["Park on Maple Street", "Get a permit from the front desk"] },
  { id: "s5", layout: "Title and Content", title: "Who to Call", body: ["IT Help Desk: ext. 4100", "Human Resources: ext. 4200", "Facilities: ext. 4300"] },
];

export const pptModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::getting-started-with-powerpoint": [
    {
      id: "ppt-m1-getting-started-1",
      app: "powerpoint",
      title: "Find your way around the staff briefing",
      scenario: "You prepare the monthly all-staff briefing at Lakeside Medical Associates. Before you start editing, get comfortable moving between views and setting up your workspace.",
      fileName: "October All-Staff Briefing.pptx",
      minutes: 5,
      initial: { active: "s1", slides: briefing },
      tasks: [
        {
          instruction: "Switch to the view that shows only the text of every slide as an outline.",
          hint: "View tab › Presentation Views group › Outline View.",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Outline View" } }],
        },
        {
          instruction: "Switch to Slide Sorter view to see every slide as a thumbnail.",
          hint: "View tab › Presentation Views group › Slide Sorter (or the Slide Sorter button on the status bar, bottom right).",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Slide Sorter" } }],
        },
        {
          instruction: "Return to Normal view.",
          hint: "View tab › Presentation Views group › Normal (or the Normal button on the status bar).",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Normal" } }],
        },
        {
          instruction: "Show the ruler and the gridlines so you can line things up.",
          hint: "View tab › Show group › check Ruler, then check Gridlines.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "view.ruler" } },
            { action: { kind: "command", id: "view.gridlines" } },
          ],
        },
        {
          instruction: "Zoom the slide to 120%.",
          hint: "View tab › Zoom group › Zoom, type 120 in the Percent box, then click OK. You can also drag the zoom slider on the status bar to 120%.",
          steps: [{ action: { kind: "dialog", id: "zoom", values: { percent: 120 } }, alt: [{ kind: "command", id: "view.zoom", value: "120" }] }],
        },
        {
          instruction: "On slide 2, add the speaker note “Remind staff to sign up for portal training.”",
          hint: "Click slide 2 in the thumbnails. Double-click the Notes pane under the slide (“Click to add notes”), type the note, then click outside the Notes pane.",
          steps: [{ action: { kind: "type", target: "s2.notes", value: "Remind staff to sign up for portal training." } }],
        },
        {
          instruction: "Collapse the Ribbon so only the tab names show.",
          hint: "Double-click any tab name, or press Ctrl+F1. (In PowerPoint you can also right-click a tab › Collapse the Ribbon, or open Ribbon Display Options at the lower right of the Ribbon › Show tabs only.)",
          steps: [{ action: { kind: "command", id: "view.ribbonCollapse" } }],
        },
        {
          instruction: "Review the briefing in Reading View.",
          hint: "Click the Reading View button on the status bar (bottom right). With the Ribbon collapsed you can also click the View tab › Reading View.",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Reading View" } }],
        },
      ],
    },
  ],

  "module-1::understanding-onedrive-for-powerpoint": [
    {
      id: "ppt-m1-onedrive-1",
      app: "powerpoint",
      title: "Make the staff meeting deck reachable from any room",
      scenario: "You present at the quarterly staff meeting from the conference room computer, not your desk. Store the deck in OneDrive, let your manager see it, and carry a PDF in case the network fails.",
      fileName: "Quarterly Staff Meeting.pptx",
      minutes: 4,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Q3 Staff Meeting", subtitle: "Lakeside Medical Associates · October 2026" },
          { id: "s2", layout: "Title and Content", title: "Quarter at a Glance", body: ["Patient visits up 9%", "Average wait time: 14 minutes", "Portal sign-ups: 1,240"] },
          { id: "s3", layout: "Title and Content", title: "Coming in Q4", body: ["Flu season staffing plan", "New check-in kiosks", "Holiday schedule"] },
          { id: "s4", layout: "Title Only", title: "Thank You" },
        ],
      },
      tasks: [
        {
          instruction: "Save the presentation to OneDrive with the file name “Quarterly Staff Meeting - Q3”.",
          hint: "File › Save As (or F12) › OneDrive - Personal. Type the file name, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "OneDrive - Personal", name: "Quarterly Staff Meeting - Q3" } } }],
        },
        {
          instruction: "Turn on AutoSave so every change is saved to OneDrive as you work.",
          hint: "Click the AutoSave switch at the top left of the title bar.",
          steps: [{ action: { kind: "command", id: "qat.autosave" } }],
        },
        {
          instruction: "Share the presentation with dwhitfield@lakeside.example so she can view it but not edit it.",
          hint: "File › Share. Type the email address, change the permission to Can view, then click Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "dwhitfield@lakeside.example", permission: "Can view" } } }],
        },
        {
          instruction: "Copy a sharing link that you can paste into the meeting invitation.",
          hint: "File › Share › Copy link.",
          steps: [{ action: { kind: "command", id: "file.copyLink" } }],
        },
        {
          instruction: "Create a PDF fallback copy named “Quarterly Staff Meeting - Q3 backup”.",
          hint: "File › Export › Create PDF/XPS Document. Type the file name, then click Create PDF/XPS.",
          steps: [{
            action: { kind: "dialog", id: "file.exportPdf", values: { name: "Quarterly Staff Meeting - Q3 backup" } },
            alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Quarterly Staff Meeting - Q3 backup", format: "PDF (*.pdf)" } }],
          }],
        },
        {
          instruction: "Open the list of earlier versions OneDrive has kept of this file.",
          hint: "File › Info › Version History.",
          steps: [{ action: { kind: "command", id: "file.versionHistory" } }],
        },
      ],
    },
  ],

  "module-1::creating-and-opening-presentations": [
    {
      id: "ppt-m1-creating-opening-1",
      app: "powerpoint",
      title: "Start from a template, then convert an old deck",
      scenario: "You produce the monthly briefing at Lakeside Medical Associates. Start this month's deck from a theme template instead of rebuilding it, then bring an old front desk deck up to the current file format.",
      fileName: "Presentation1.pptx",
      minutes: 5,
      initial: { active: "s1", slides: [{ id: "s1", layout: "Title Slide" }] },
      tasks: [
        {
          instruction: "Create a new presentation from the Facet template.",
          hint: "File › New › Facet.",
          steps: [{ action: { kind: "command", id: "file.new", value: "Facet" } }],
        },
        {
          instruction: "On the title slide, type the title “November All-Staff Briefing”.",
          hint: "Click “Click to add title”, type the title, then click outside the placeholder.",
          steps: [{ action: { kind: "type", target: "s1.title", value: "November All-Staff Briefing" } }],
        },
        {
          instruction: "Type the subtitle “Lakeside Medical Associates”.",
          hint: "Click “Click to add subtitle”, type the subtitle, then click outside the placeholder.",
          steps: [{ action: { kind: "type", target: "s1.subtitle", value: "Lakeside Medical Associates" } }],
        },
        {
          instruction: "Add a new slide with the Title and Content layout.",
          hint: "Home tab › Slides group › New Slide (or press Ctrl+M).",
          steps: [{ action: { kind: "command", id: "slides.new", value: "Title and Content" } }],
        },
        {
          instruction: "Open the presentation “Front Desk Procedures 2019.ppt” from your recent files.",
          hint: "File › Open (or Ctrl+O) › Recent › Front Desk Procedures 2019.ppt.",
          steps: [{
            action: { kind: "command", id: "file.open", value: "Front Desk Procedures 2019.ppt" },
            effects: [
              { op: "set", path: "slides", value: [
                { id: "s1", layout: "Title Slide", title: "Front Desk Procedures", subtitle: "Updated 2019" },
                { id: "s2", layout: "Title and Content", title: "Checking In a Patient", body: ["Greet the patient by name", "Verify date of birth", "Scan the insurance card"] },
                { id: "s3", layout: "Title and Content", title: "End-of-Day Checklist", body: ["Balance the cash drawer", "Print tomorrow's schedule", "Lock the records room"] },
              ] },
              { op: "set", path: "active", value: "s1" },
              { op: "set", path: "theme", value: "Office Theme" },
              { op: "set", path: "variant", value: 1 },
              { op: "set", path: "saved", value: { name: "Front Desk Procedures 2019.ppt [Compatibility Mode]", location: "This PC › Documents › Archive", format: "PowerPoint 97-2003 Presentation (*.ppt)" } },
            ],
          }],
        },
        {
          instruction: "The file opened in Compatibility Mode. Convert it by saving it as a PowerPoint Presentation (.pptx) named “Front Desk Procedures”.",
          hint: "File › Save As › This PC (or OneDrive). Type Front Desk Procedures, make sure the file type is PowerPoint Presentation (*.pptx), then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Front Desk Procedures", format: "PowerPoint Presentation (*.pptx)" } } }],
        },
      ],
    },
  ],

  "module-1::saving-presentations": [
    {
      id: "ppt-m1-saving-1",
      app: "powerpoint",
      title: "Save the orientation deck in the right formats",
      scenario: "You distribute the new hire orientation deck. Colleagues need an editable file, new hires without PowerPoint need a PDF, the break room TV needs a show file, and remote hires need a video.",
      fileName: "Orientation.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Welcome to Lakeside Medical Associates", subtitle: "New Hire Orientation" },
          { id: "s2", layout: "Title and Content", title: "Your First Days", body: ["Pick up your badge at the front desk", "Complete HIPAA training", "Meet your team lead"] },
          { id: "s3", layout: "Title and Content", title: "Where to Find Help", body: ["Employee handbook on the intranet", "HR office, room 210", "IT Help Desk: ext. 4100"] },
          { id: "s4", layout: "Title Only", title: "We're Glad You're Here" },
        ],
      },
      tasks: [
        {
          instruction: "Save the presentation to This PC with the file name “2026-10-20 Staff Orientation - New Hires”.",
          hint: "File › Save As (or F12) › This PC. Type the file name, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "This PC", name: "2026-10-20 Staff Orientation - New Hires" } } }],
        },
        {
          instruction: "Change the slide 2 title to “Your First Week”, then save the change to the same file.",
          hint: "Click slide 2, double-click the title, replace the text with Your First Week, and click outside. Then press Ctrl+S (or File › Save).",
          steps: [
            { action: { kind: "type", target: "s2.title", value: "Your First Week" } },
            { action: { kind: "command", id: "file.save" } },
          ],
        },
        {
          instruction: "Export a PDF named “Staff Orientation - New Hires” for new hires who do not have PowerPoint.",
          hint: "File › Export › Create PDF/XPS Document. Type the name, then click Create PDF/XPS.",
          steps: [{
            action: { kind: "dialog", id: "file.exportPdf", values: { name: "Staff Orientation - New Hires" } },
            alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Staff Orientation - New Hires", format: "PDF (*.pdf)" } }],
          }],
        },
        {
          instruction: "Save a copy named “Orientation Show” that opens straight into the slide show on the break room TV.",
          hint: "File › Save As › This PC. Type Orientation Show, choose PowerPoint Show (*.ppsx) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Orientation Show", format: "PowerPoint Show (*.ppsx)" } } }],
        },
        {
          instruction: "Save a copy as an MPEG-4 video named “Orientation Video” for remote hires to watch on their own.",
          hint: "File › Save As › This PC. Type Orientation Video, choose MPEG-4 Video (*.mp4) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Orientation Video", format: "MPEG-4 Video (*.mp4)" } } }],
        },
        {
          instruction: "Open the Save settings in PowerPoint Options so you can check how often AutoRecover runs.",
          hint: "File › Options › Save.",
          steps: [{ action: { kind: "command", id: "file.options", value: "Save" } }],
        },
      ],
    },
  ],

  "module-1::slide-basics": [
    {
      id: "ppt-m1-slide-basics-1",
      app: "powerpoint",
      title: "Add and arrange the orientation slides",
      scenario: "You are building the new staff orientation deck at Lakeside Medical Associates. Use layouts so every title lands in the same place, and put the slides in a sensible order.",
      fileName: "New Staff Orientation.pptx",
      minutes: 6,
      initial: { active: "s1", slides: orientation },
      tasks: [
        {
          instruction: "After slide 3, insert a new slide that uses the Two Content layout.",
          hint: "Click slide 3 in the thumbnails. Home tab › Slides group › New Slide arrow › Two Content.",
          steps: [{ action: { kind: "command", id: "slides.new", value: "Two Content" }, requires: { slide: "s3" }, selectHint: "Click slide 3, “Our Clinic Hours”, in the thumbnails first." }],
        },
        {
          instruction: "On the new slide, type the title “Paper Intake vs. Digital Intake”.",
          hint: "Click “Click to add title” on slide 4, type the title, then click outside the placeholder.",
          steps: [{ action: { kind: "type", target: "s6.title", value: "Paper Intake vs. Digital Intake" } }],
        },
        {
          instruction: "In the left content placeholder of the new slide, type “Clipboard forms” on the first line and “Scanned by the front desk” on the second line.",
          hint: "Double-click the left placeholder, type Clipboard forms, press Enter, type Scanned by the front desk, then click outside the placeholder.",
          steps: [{ action: { kind: "type", target: "s6.body", value: "Clipboard forms\nScanned by the front desk" } }],
        },
        {
          instruction: "Duplicate slide 2, “Your First Day”.",
          hint: "Right-click slide 2 in the thumbnails › Duplicate Slide (or select it and press Ctrl+D, or Home › New Slide arrow › Duplicate Selected Slides).",
          steps: [{ action: { kind: "command", id: "slides.duplicate" }, requires: { slide: "s2" }, selectHint: "Click slide 2, “Your First Day”, in the thumbnails first." }],
        },
        {
          instruction: "Change the title of the duplicate slide to “Your Second Day”.",
          hint: "On slide 3 (the copy), double-click the title, replace the text with Your Second Day, then click outside.",
          steps: [{ action: { kind: "type", target: "s7.title", value: "Your Second Day" } }],
        },
        {
          instruction: "Delete the slide titled “Old Parking Rules”.",
          hint: "Right-click the “Old Parking Rules” thumbnail › Delete Slide (or click it and press Delete).",
          steps: [{ action: { kind: "command", id: "slides.delete" }, requires: { slide: "s4" }, selectHint: "Click the “Old Parking Rules” thumbnail first." }],
        },
        {
          instruction: "Move the slide “Our Clinic Hours” so it comes right after the title slide.",
          hint: "In the thumbnails, drag “Our Clinic Hours” up and drop it on slide 2 (or select it and press Ctrl+Up Arrow until it is slide 2).",
          steps: [{ action: { kind: "command", id: "slides.move", value: "s3@2" } }],
        },
      ],
    },
    {
      id: "ppt-m1-slide-basics-2",
      app: "powerpoint",
      title: "Give the orientation deck a consistent look",
      scenario: "The orientation deck was started in an old 4:3 file with hand-formatted titles. Bring it up to a consistent, modern design before the next new hire class.",
      fileName: "New Staff Orientation.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        size: "4:3",
        slides: [
          { id: "s1", layout: "Title Slide", title: "New Staff Orientation", subtitle: "Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "Your First Day", titleProps: { size: 54, color: "#C00000", font: "Georgia" }, body: ["Badge photo at 8:30 AM", "Meet your supervisor", "Tour the clinic"] },
          { id: "s3", layout: "Title and Content", title: "Our Clinic Hours", body: ["Monday to Friday: 8:00 AM to 6:00 PM", "Saturday: 9:00 AM to 1:00 PM"] },
          { id: "s4", layout: "Title Only", title: "Who to Call" },
        ],
      },
      tasks: [
        {
          instruction: "Change the slide size to Widescreen (16:9).",
          hint: "Design tab › Customize group › Slide Size › Widescreen (16:9).",
          steps: [{ action: { kind: "command", id: "design.slideSize", value: "Widescreen (16:9)" }, alt: [{ kind: "dialog", id: "slideSize", values: { size: "Widescreen (16:9)" } }] }],
        },
        {
          instruction: "Apply the Retrospect theme to the presentation.",
          hint: "Design tab › Themes gallery › Retrospect (use the More arrow if you do not see it).",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Retrospect" } }],
        },
        {
          instruction: "Apply the second variant of the theme.",
          hint: "Design tab › Variants gallery › the second thumbnail.",
          steps: [{ action: { kind: "command", id: "design.variant", value: "2" } }],
        },
        {
          instruction: "The slide 2 title was formatted by hand. Reset slide 2 so it matches its layout again.",
          hint: "Click slide 2 in the thumbnails. Home tab › Slides group › Reset (or right-click the thumbnail › Reset Slide).",
          steps: [{ action: { kind: "command", id: "slides.reset" }, requires: { slide: "s2" }, selectHint: "Click slide 2, “Your First Day”, in the thumbnails first." }],
        },
        {
          instruction: "Give every slide a solid fill background using the light blue swatch (#DDEBF7).",
          hint: "Design tab › Format Background. Keep Solid fill, pick the light blue swatch (#DDEBF7), check Apply to All, then click OK.",
          steps: [{ action: { kind: "dialog", id: "formatBackground", values: { color: "#DDEBF7", applyToAll: true } } }],
        },
        {
          instruction: "On slide 4, add a text box that says “Questions? Call HR at ext. 4200”.",
          hint: "Click slide 4. Insert tab › Text group › Text Box. Type the text in the new box, then click outside it.",
          steps: [
            { action: { kind: "command", id: "insert.textBox" }, requires: { slide: "s4" }, selectHint: "Click slide 4, “Who to Call”, first." },
            { action: { kind: "type", target: "s4.o1", value: "Questions? Call HR at ext. 4200" } },
          ],
        },
      ],
    },
  ],
};
