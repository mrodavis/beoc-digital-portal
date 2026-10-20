import type { PptSlide, SimDefinition, SimStep } from "@/types/sim";

/** office-apps sims that run in the PowerPoint engine. Keys are "<moduleSlug>::<lessonSlug>". */

const typeIn = (target: string, value: string | string[]): SimStep => ({ action: { kind: "type", target, value } });

/* ------------------------------------------------------------------ */
/* Decks                                                               */
/* ------------------------------------------------------------------ */

/** Last year's orientation deck (lesson: intro-to-powerpoint-2019). */
const lastYear: PptSlide[] = [
  { id: "s1", layout: "Title Slide", title: "New Staff Orientation", subtitle: "Lakeside Medical Associates · Welcome to the Team" },
  { id: "s2", layout: "Title and Content", title: "Welcome and Our Culture", body: ["Patients come first", "Every role matters", "Ask questions early"] },
  { id: "s3", layout: "Title and Content", title: "Office Layout and Access", body: ["Staff entrance on Elm Street", "Badge access starts at 7:00 AM", "Break room on the second floor"] },
  { id: "s4", layout: "Title and Content", title: "Key Systems and Tools", body: ["Electronic health record (EHR)", "Phone system and voicemail", "Scheduling software"] },
  { id: "s5", layout: "Title and Content", title: "Patient Communication Standards", body: ["Greet patients by name", "Use plain language", "Walk patients to the exam room"] },
  { id: "s6", layout: "Title and Content", title: "HIPAA Basics", body: ["Share only what is needed", "Log out of the EHR every time", "Report concerns right away"] },
  { id: "s7", layout: "Title and Content", title: "Emergency Procedures", body: ["Know your nearest exit", "Extinguishers by every stairwell", "Meet in the north parking lot"] },
  { id: "s8", layout: "Title and Content", title: "Scheduling and Time-Off", body: ["Request time off two weeks ahead", "Shift swaps need approval", "New schedule posts every Friday"] },
  { id: "s9", layout: "Title Only", title: "2025 Holiday Party Photos", objects: [{ id: "o1", kind: "image", label: "holiday-party-2025.jpg", glyph: "🎉", x: 20, y: 26, w: 60, h: 66 }] },
  { id: "s10", layout: "Title and Content", title: "Provider and Staff Directory", body: ["Dr. Rachel Kim, Medical Director", "Monica Reyes, Office Manager", "Front desk: ext. 4100"] },
];

/** The four-hire Monday session (lesson: presenting-and-delivery). */
const monday: PptSlide[] = [
  { id: "s1", layout: "Title Slide", title: "New Staff Orientation", subtitle: "Monday, November 2, 2026 · Conference Room B", notes: "Welcome the four new hires and introduce yourself. Explain that the session runs about 45 minutes." },
  { id: "s2", layout: "Title and Content", title: "Agenda", body: ["About us", "Meet the team", "Office policies", "Key systems", "Patient communication", "Your first day"], notes: "Keep the agenda to one minute." },
  { id: "s3", layout: "Title and Content", title: "About Lakeside Medical Associates", body: ["Founded in 2004", "Family and internal medicine", "About 180 patient visits a day"] },
  { id: "s4", layout: "Title and Content", title: "Meet the Team", body: ["Dr. Rachel Kim, Medical Director", "Monica Reyes, Office Manager", "Andre Wallace, Nurse Manager"], notes: "Point out that Monica approves time off and schedules." },
  { id: "s5", layout: "Title and Content", title: "Office Policies", body: ["Business casual dress code", "Phones away at the front desk", "Arrive 10 minutes early"] },
  { id: "s6", layout: "Title and Content", title: "Key Systems Overview", body: ["EHR for charts and visits", "Phone system and voicemail", "Scheduling software"] },
  { id: "s7", layout: "Title and Content", title: "Patient Communication Standards", body: ["Greet every patient by name", "Use plain language", "Walk patients to the exam room"], notes: "Share one real example of each standard." },
  { id: "s8", layout: "Title and Content", title: "Benefits Enrollment (Under Revision)", body: ["New plan details coming in November"] },
  { id: "s9", layout: "Title and Content", title: "Contact Information", body: ["Office manager: ext. 4110", "Nurse manager: ext. 4120", "IT help desk: ext. 4100"] },
  { id: "s10", layout: "Title Only", title: "Your First Day Starts Now" },
];

/** The capstone deck before branding (lesson: powerpoint-capstone). */
const capstoneSlides: PptSlide[] = [
  { id: "s1", layout: "Title Slide", title: "Welcome to Lakeside Medical Associates", subtitle: "New Staff Orientation · November 2, 2026" },
  { id: "s2", layout: "Title and Content", title: "Agenda", body: ["About us", "Meet the team", "Office policies", "Key systems", "Patient communication", "HIPAA and privacy", "Contacts", "Your first day"] },
  { id: "s3", layout: "Title and Content", title: "About Lakeside Medical Associates", body: ["Founded in 2004", "Family and internal medicine", "About 180 patient visits a day", "42 providers and staff"] },
  { id: "s4", layout: "Title and Content", title: "Meet the Team", body: ["Dr. Rachel Kim, Medical Director", "Monica Reyes, Office Manager", "Andre Wallace, Nurse Manager", "Tasha Greene, Billing Coordinator"] },
  { id: "s5", layout: "Title and Content", title: "Office Policies", body: ["Business casual dress code", "30-minute lunch, two short breaks", "Personal phones away at the desk", "Park in the staff lot", "Arrive 10 minutes early"] },
  {
    id: "s6",
    layout: "Title Only",
    title: "Key Systems Overview",
    objects: [
      { id: "o1", kind: "icon", label: "Hospital", glyph: "🏥", x: 8, y: 38, w: 12, h: 20, color: "#4472C4" },
      { id: "o2", kind: "icon", label: "Calendar", glyph: "📅", x: 28, y: 38, w: 12, h: 20, color: "#4472C4" },
      { id: "o3", kind: "icon", label: "Clock", glyph: "🕒", x: 80, y: 38, w: 12, h: 20, color: "#4472C4" },
    ],
  },
  { id: "s7", layout: "Title and Content", title: "Patient Communication Standards", body: ["Greet every patient by name", "Escort patients, don't just point", "Use plain language", "Listen before you answer"] },
  { id: "s8", layout: "Title and Content", title: "HIPAA and Privacy Basics", body: ["Never discuss patients in public areas", "Log out of the EHR every time", "Report a possible breach right away"] },
  { id: "s9", layout: "Title and Content", title: "Contact Information", body: ["Monica Reyes, Office Manager: ext. 4110", "Andre Wallace, Nurse Manager: ext. 4120", "Scheduling desk: ext. 4130"] },
  { id: "s10", layout: "Title and Content", title: "Welcome to the Team" },
];

/** The same deck after the build-and-brand sim, ready for the delivery sim. */
const capstoneBranded: PptSlide[] = capstoneSlides.map((s): PptSlide => {
  if (s.id === "s1") return { ...s, objects: [{ id: "o1", kind: "image", label: "Clinic waiting room", glyph: "🖼️", x: 66, y: 4, w: 30, h: 20 }] };
  if (s.id === "s2") return { ...s, body: [], objects: [{ id: "o1", kind: "smartart", label: "Basic Block List", style: "Basic Block List", items: s.body ?? [], x: 6, y: 25, w: 88, h: 66 }] };
  if (s.id === "s5") return { ...s, bodyProps: { bullets: true, numbered: true } };
  if (s.id === "s6") {
    const at: Record<string, number> = { o1: 8, o2: 32, o3: 80 };
    return { ...s, objects: [...(s.objects ?? []).map((o) => ({ ...o, x: at[o.id] ?? o.x })), { id: "o4", kind: "icon", label: "Telephone", glyph: "📞", x: 56, y: 38, w: 12, h: 20, color: "#E48312" }] };
  }
  if (s.id === "s10") return { ...s, layout: "Title Only" };
  return s;
});

/** The chart the learner copied from the Excel expense dashboard (module-6 sim). */
const excelChart = {
  id: "o1",
  kind: "chart",
  label: "Clustered Column",
  style: "Clustered Column",
  x: 7,
  y: 21,
  w: 80,
  h: 66,
  series: [
    { label: "Medical", value: 18400 },
    { label: "Nursing", value: 12650 },
    { label: "Administration", value: 9800 },
    { label: "Facilities", value: 6150 },
  ],
  chart: { title: "May Expenses by Department", showTitle: true, legend: null, seriesName: "Amount", gridlines: true },
};

/** Where the chart was copied from, so Paste Special can Paste Link it (module-6 sim). */
const expenseWorkbook = "Expense Dashboard - May 2026.xlsx";
const excelClip = { kind: "obj", objs: [excelChart], source: { app: "Excel", file: expenseWorkbook, path: "OneDrive › Documents › Lakeside", item: "Dashboard!Chart 1" } };
/** Copied earlier from the Word report; waits on the Office Clipboard. */
const reportSummary = "May expenses totaled $47,330, all within budget.";
const wordClip = { kind: "text", lines: [reportSummary], source: { app: "Word", file: "Monthly Report - May 2026 - Lakeside Medical.docx" } };
/** The workbook after Accounting's correction (Facilities 6,150 → 6,480): what Update Link reads. */
const correctedWorkbook = { [expenseWorkbook]: { series: excelChart.series.map((s) => (s.label === "Facilities" ? { ...s, value: 6480 } : s)) } };

/* ------------------------------------------------------------------ */
/* Selections used more than once                                      */
/* ------------------------------------------------------------------ */

const deptIcons = ["s3.o1,s3.o2,s3.o3,s3.o4", "s3.o1.o2.o3.o4"];
const iconAndName = ["s4.o1,s4.o2", "s4.o1.o2"];
const systemIcons = ["s6.o1,s6.o2,s6.o3,s6.o4", "s6.o1.o2.o3.o4"];

const fluWaysToStop = [
  "Get your flu shot every fall",
  "Wash your hands often with soap and warm water for at least 20 seconds",
  "Cover coughs and sneezes",
  "Stay home when you are sick",
  "Keep hands away from your face",
  "Clean phones and doorknobs daily",
  "Ask about our Tuesday walk-in flu clinic",
];

export const powerpointSims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  /* Module 5: PowerPoint                                              */
  /* ================================================================ */

  "module-5::intro-to-powerpoint-2019": [
    {
      id: "oa-ppt-m5-intro-1",
      app: "powerpoint",
      title: "Get last year's orientation deck in shape",
      scenario: "Your supervisor at Lakeside Medical Associates handed you last year's new staff orientation deck. Before the new hires start next month, review it in the right views, put the slides in order, and save a working copy plus a version the waiting room kiosk can run on its own.",
      fileName: "Staff Orientation 2025.pptx",
      minutes: 6,
      initial: { active: "s1", slides: lastYear },
      tasks: [
        {
          instruction: "Review the deck as a text-only outline to check that every slide has a title.",
          hint: "View tab › Presentation Views group › Outline View.",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Outline View" } }],
        },
        {
          instruction: "Switch to Slide Sorter view, then move “HIPAA Basics” so it becomes slide 4.",
          hint: "View tab › Presentation Views › Slide Sorter (or the Slide Sorter button on the status bar). Drag “HIPAA Basics” and drop it on slide 4, “Key Systems and Tools”. The other slides shift to make room.",
          steps: [
            { action: { kind: "command", id: "view.mode", value: "Slide Sorter" } },
            { action: { kind: "command", id: "slides.move", value: "s6@4" } },
          ],
        },
        {
          instruction: "Delete the outdated slide “2025 Holiday Party Photos”.",
          hint: "Click the “2025 Holiday Party Photos” slide and press Delete (or right-click it › Delete Slide).",
          steps: [{ action: { kind: "command", id: "slides.delete" }, requires: { slide: "s9" }, selectHint: "Click the “2025 Holiday Party Photos” slide first." }],
        },
        {
          instruction: "Return to Normal view and add the speaker note “Welcome each new hire by name. Then introduce yourself and your role.” to slide 1.",
          hint: "View tab › Normal (or the Normal button on the status bar). Click slide 1, double-click the Notes pane under the slide (“Click to add notes”), type the note, then click outside the Notes pane.",
          steps: [
            { action: { kind: "command", id: "view.mode", value: "Normal" } },
            typeIn("s1.notes", "Welcome each new hire by name. Then introduce yourself and your role."),
          ],
        },
        {
          instruction: "After the last slide, “Provider and Staff Directory”, add a new slide with the title “Your First Day: Next Steps”.",
          hint: "Click the “Provider and Staff Directory” thumbnail and press Ctrl+M (or Home tab › Slides group › New Slide). Click “Click to add title”, type the title, then click outside the placeholder.",
          steps: [
            { action: { kind: "command", id: "slides.new" }, requires: { slide: "s10" }, selectHint: "Click the last slide, “Provider and Staff Directory”, in the thumbnails first." },
            typeIn("s11.title", "Your First Day: Next Steps"),
          ],
        },
        {
          instruction: "The closing slide needs only a title. Change its layout to Title Only.",
          hint: "With the new slide selected: Home tab › Slides group › Layout › Title Only (or right-click its thumbnail › Layout).",
          steps: [{ action: { kind: "command", id: "slides.layout", value: "Title Only" }, requires: { slide: "s11" }, selectHint: "Click the new “Your First Day: Next Steps” slide in the thumbnails first." }],
        },
        {
          instruction: "Save the presentation as a PowerPoint Presentation (.pptx) with the file name “Staff Orientation - Lakeside Medical”.",
          hint: "File › Save As (or F12) › This PC. Type the file name, keep PowerPoint Presentation (*.pptx) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Staff Orientation - Lakeside Medical", format: "PowerPoint Presentation (*.pptx)" } } }],
        },
        {
          instruction: "Save a copy named “Staff Orientation - Kiosk” that opens straight into the slide show when someone double-clicks it.",
          hint: "File › Save As › This PC. Type the name, choose PowerPoint Show (*.ppsx) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Staff Orientation - Kiosk", format: "PowerPoint Show (*.ppsx)" } } }],
        },
      ],
    },
  ],

  "module-5::slide-design-and-themes": [
    {
      id: "oa-ppt-m5-design-1",
      app: "powerpoint",
      title: "Give the orientation deck one professional look",
      scenario: "Last year's orientation deck looks like seven different people formatted it, starting with a serif theme that blurs on the projector. Apply one clean theme, set the title font, title color, and footer once on the slide master, and clear the hand formatting that fights the theme.",
      fileName: "Staff Orientation - Redesign.pptx",
      minutes: 7,
      initial: {
        active: "s1",
        theme: "Organic",
        slides: [
          { id: "s1", layout: "Title Slide", title: "New Staff Orientation", subtitle: "Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "What We'll Cover", body: ["Our culture", "Office layout", "Key systems", "HIPAA basics"] },
          { id: "s3", layout: "Title and Content", title: "Welcome and Our Culture", body: ["Patients come first", "Every role matters", "Ask questions early"] },
          { id: "s4", layout: "Title and Content", title: "Office Layout and Access", titleProps: { color: "#FFFF00", size: 54, font: "Times New Roman" }, body: ["Staff entrance on Elm Street", "Badge access starts at 7:00 AM"] },
          { id: "s5", layout: "Title and Content", title: "HIPAA Basics", body: ["Share only what is needed", "Log out of the EHR every time"] },
          { id: "s6", layout: "Title Only", title: "Questions? Ask Your Supervisor" },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Facet theme to the presentation.",
          hint: "Design tab › Themes gallery › Facet (click the More arrow if you do not see it).",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Facet" } }],
        },
        {
          instruction: "Open Slide Master view so you can change every slide at once.",
          hint: "View tab › Master Views group › Slide Master.",
          steps: [{ action: { kind: "command", id: "view.master" } }],
        },
        {
          instruction: "The practice style guide uses Segoe UI for titles. On the slide master, change the font of the title placeholder to Segoe UI.",
          hint: "Click the slide master (the large thumbnail at the top of the left pane), then click the border of its title placeholder. Home tab › Font box › Segoe UI.",
          steps: [{
            action: { kind: "command", id: "home.fontName", value: "Segoe UI" },
            alt: [{ kind: "dialog", id: "font", values: { font: "Segoe UI" } }],
            requires: { slide: "master", selection: "master.title" },
            selectHint: "Click the slide master at the top of the left pane, then click its title placeholder, “Click to edit Master title style”.",
          }],
        },
        {
          instruction: "Change the master title color to Dark Blue so every title has strong contrast on the white background.",
          hint: "With the master title placeholder still selected: Home tab › Font group › Font Color arrow › Dark Blue (under Standard Colors).",
          steps: [{
            action: { kind: "command", id: "home.fontColor", value: "#002060" },
            alt: [{ kind: "dialog", id: "font", values: { color: "#002060" } }],
            requires: { slide: "master", selection: "master.title" },
            selectHint: "Click the title placeholder on the slide master first.",
          }],
        },
        {
          instruction: "On the slide master, add a text box with the footer “Lakeside Medical Associates | Confidential” and align it to the bottom of the slide.",
          hint: "With the slide master selected (the large top thumbnail): Insert tab › Text group › Text Box. Type the footer, then click outside the box. With the text box still selected: Shape Format tab › Arrange group › Align › Align Bottom.",
          steps: [
            {
              action: { kind: "command", id: "insert.textBox" },
              requires: { slide: "master", selection: ["master", "master.title", "master.body"] },
              selectHint: "Click the slide master, the large thumbnail at the top of the left pane, so the text box goes on every slide.",
            },
            typeIn("master.o1", "Lakeside Medical Associates | Confidential"),
            {
              action: { kind: "command", id: "object.align", value: "Align Bottom" },
              requires: { slide: "master", selection: "master.o1" },
              selectHint: "Click the footer text box on the slide master first.",
            },
          ],
        },
        {
          instruction: "Keep the footer off the cover: hide the master's background graphics on the Title Slide layout.",
          hint: "Click the Title Slide Layout thumbnail (the first one under the slide master). Slide Master tab › Background group › check Hide Background Graphics.",
          steps: [{ action: { kind: "command", id: "master.hideBackground" }, requires: { slide: "layout:Title Slide" }, selectHint: "Click the Title Slide Layout thumbnail, the first one under the slide master." }],
        },
        {
          instruction: "Close Slide Master view.",
          hint: "Slide Master tab › Close group › Close Master View (or View tab › Normal).",
          steps: [{ action: { kind: "command", id: "master.close" }, alt: [{ kind: "command", id: "view.mode", value: "Normal" }] }],
        },
        {
          instruction: "Someone formatted the slide 4 title by hand in bright yellow Times New Roman, which washes out on a projector. Reset slide 4 so it follows the slide master again.",
          hint: "Click slide 4 in the thumbnails. Home tab › Slides group › Reset (or right-click the thumbnail › Reset Slide).",
          steps: [{ action: { kind: "command", id: "slides.reset" }, requires: { slide: "s4" }, selectHint: "Click slide 4, “Office Layout and Access”, in the thumbnails first." }],
        },
      ],
    },
    {
      id: "oa-ppt-m5-design-2",
      app: "powerpoint",
      title: "Make the flu season slides easy to read",
      scenario: "This flu season deck plays in the Lakeside Medical Associates waiting room, where some patients have low vision and everyone is a little stressed. Apply the 6×6 rule, fix the contrast and font sizes, and turn the topic list into a diagram.",
      fileName: "Flu Season Patient Education.pptx",
      minutes: 7,
      initial: {
        active: "s1",
        theme: "Slice",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Flu Season: Protect Your Family", subtitle: "Patient Education · Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "What We'll Cover", body: ["What the flu is", "Who should get a flu shot", "How to stop the spread", "When to call us"] },
          { id: "s3", layout: "Title and Content", title: "Who Should Get a Flu Shot", bodyProps: { color: "#FFFF00" }, body: ["Everyone 6 months and older", "Adults 65 and older", "Pregnant patients", "People with asthma or diabetes"] },
          { id: "s4", layout: "Title and Content", title: "How to Stop the Spread", titleProps: { font: "Times New Roman" }, body: fluWaysToStop },
          { id: "s5", layout: "Title and Content", title: "When to Call Us", bodyProps: { size: 14 }, body: ["Trouble breathing", "Chest pain or pressure", "Fever or cough that returns or worsens", "Call (718) 555-0142 any time"] },
          { id: "s6", layout: "Title Only", title: "Get Your Flu Shot Today" },
        ],
      },
      tasks: [
        {
          instruction: "On slide 2, turn the list of topics into a Basic Block List SmartArt graphic.",
          hint: "Click inside the slide 2 list and press Ctrl+A. Home tab › Paragraph group › Convert to SmartArt › Basic Block List (or right-click the list › Convert to SmartArt).",
          steps: [{
            action: { kind: "command", id: "home.convertSmartArt", value: "Basic Block List" },
            alt: [{ kind: "dialog", id: "convertSmartArt", values: { graphic: "Basic Block List" } }],
            requires: { slide: "s2", selection: "s2.body" },
            selectHint: "Select the whole list on slide 2 first: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "The list on slide 3 is yellow on a white background. Change its text color to Automatic so it uses the theme's dark text.",
          hint: "Click inside the slide 3 list and press Ctrl+A. Home tab › Font group › Font Color arrow › Automatic.",
          steps: [{
            action: { kind: "command", id: "home.fontColor", value: "Automatic" },
            requires: { slide: "s3", selection: "s3.body" },
            selectHint: "Select the whole list on slide 3 first: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "The slide 4 title is in Times New Roman, a serif font that blurs when projected. Change it to Century Gothic, the theme's heading font.",
          hint: "Click the slide 4 title. Home tab › Font box › Century Gothic. (Home › Font group › Clear All Formatting also returns the title to the theme font.)",
          steps: [{
            action: { kind: "command", id: "home.fontName", value: "Century Gothic" },
            alt: [{ kind: "dialog", id: "font", values: { font: "Century Gothic" } }, { kind: "command", id: "home.clearFormatting" }],
            requires: { slide: "s4", selection: "s4.title" },
            selectHint: "Click the title “How to Stop the Spread” on slide 4 first.",
          }],
        },
        {
          instruction: "On slide 4, shorten the second bullet to “Wash hands often for 20 seconds” so it follows the 6×6 rule.",
          hint: "Double-click the slide 4 list, select the text of the second bullet, type the shorter version, then click outside the placeholder.",
          steps: [typeIn("s4.body", fluWaysToStop.map((b, i) => (i === 1 ? "Wash hands often for 20 seconds" : b)).join("\n"))],
        },
        {
          instruction: "Slide 4 still has seven bullets. Delete the last one, then type “Ask about our Tuesday walk-in flu clinic.” in the slide's speaker notes instead.",
          hint: "Click inside the list, click the last bullet line, and press Delete. Then double-click the Notes pane under the slide, type the sentence, and click outside it.",
          steps: [
            {
              action: { kind: "command", id: "edit.delete" },
              alt: [{ kind: "command", id: "home.cut" }],
              requires: { slide: "s4", selection: "s4.body.7" },
              selectHint: "Click inside the list, then click the last bullet, “Ask about our Tuesday walk-in flu clinic”, so only that line is selected.",
            },
            typeIn("s4.notes", ["Ask about our Tuesday walk-in flu clinic.", "Ask about our Tuesday walk-in flu clinic"]),
          ],
        },
        {
          instruction: "The list on slide 5 is set to 14 pt, too small for patients at the back of the room. Make it 24 pt.",
          hint: "Click inside the slide 5 list and press Ctrl+A. Home tab › Font Size box › 24.",
          steps: [{
            action: { kind: "command", id: "home.fontSize", value: "24" },
            alt: [{ kind: "dialog", id: "font", values: { size: "24" } }],
            requires: { slide: "s5", selection: "s5.body" },
            selectHint: "Select the whole list on slide 5 first: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "On slide 6, add a text box that says “Walk-in flu shots: Tuesdays, 8 AM to 12 PM”.",
          hint: "Go to slide 6. Insert tab › Text group › Text Box. Type the text in the new box, then click outside it.",
          steps: [
            { action: { kind: "command", id: "insert.textBox" }, requires: { slide: "s6" }, selectHint: "Go to slide 6, “Get Your Flu Shot Today”, first." },
            typeIn("s6.o1", "Walk-in flu shots: Tuesdays, 8 AM to 12 PM"),
          ],
        },
      ],
    },
  ],

  "module-5::adding-media-and-animations": [
    {
      id: "oa-ppt-m5-media-1",
      app: "powerpoint",
      title: "Add the team photo and line up the department icons",
      scenario: "Your supervisor wants the team photo on the Meet the Team slide and department icons that look placed by a professional, not by eye. The finished file also has to stay small enough to email to new hires.",
      fileName: "Staff Orientation - Media.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        theme: "Facet",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Welcome to Lakeside Medical Associates", subtitle: "New Staff Orientation" },
          { id: "s2", layout: "Two Content", title: "Meet the Team", body: ["12 providers and nurses", "8 front office staff", "One goal: patients first"] },
          {
            id: "s3",
            layout: "Title Only",
            title: "Departments at a Glance",
            objects: [
              { id: "o1", kind: "icon", label: "Stethoscope", glyph: "🩺", x: 8, y: 40, w: 12, h: 20, color: "#90C226" },
              { id: "o2", kind: "icon", label: "Syringe", glyph: "💉", x: 30, y: 33, w: 12, h: 20, color: "#90C226" },
              { id: "o3", kind: "icon", label: "Calendar", glyph: "📅", x: 55, y: 47, w: 12, h: 20, color: "#90C226" },
              { id: "o4", kind: "icon", label: "Hospital", glyph: "🏥", x: 79, y: 37, w: 12, h: 20, color: "#90C226" },
            ],
          },
          { id: "s4", layout: "Title Only", title: "Provider Directory", objects: [{ id: "o1", kind: "textbox", label: "Text Box", text: "Dr. Ana Torres\nFamily Medicine", x: 38, y: 62, w: 26, h: 14 }] },
          { id: "s5", layout: "Title Only", title: "Our Waiting Room", objects: [{ id: "o1", kind: "image", label: "clinic-lobby.jpg", glyph: "🛋️", x: 18, y: 24, w: 64, h: 70 }] },
        ],
      },
      tasks: [
        {
          instruction: "On slide 2, insert the picture care-team.jpg from your computer.",
          hint: "Go to slide 2 and click the Pictures icon in the empty right placeholder (or Insert tab › Images group › Pictures › This Device…). Choose care-team.jpg, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "insertPicture", values: { file: "care-team.jpg" } }, requires: { slide: "s2" }, selectHint: "Go to slide 2, “Meet the Team”, first." }],
        },
        {
          instruction: "Resize the team photo to 5\" wide without distorting it.",
          hint: "With the photo selected: Picture Format tab › Size group › Width: 5. The height changes with it, so the proportions stay the same.",
          steps: [{
            action: { kind: "command", id: "object.size", value: "5" },
            alt: [{ kind: "dialog", id: "rotation", values: { width: 5 } }],
            requires: { slide: "s2", selection: "s2.o1" },
            selectHint: "Click the team photo on slide 2 first.",
          }],
        },
        {
          instruction: "Soften the edges of the team photo.",
          hint: "With the photo selected: Picture Format tab › Picture Styles group › Picture Effects › Soft Edges.",
          steps: [{ action: { kind: "command", id: "picture.effects", value: "Soft Edges" }, requires: { slide: "s2", selection: "s2.o1" }, selectHint: "Click the team photo on slide 2 first." }],
        },
        {
          instruction: "On slide 3, line up the four department icons: give them the same vertical middle, then space them evenly across the row.",
          hint: "Click the first icon, then Shift+click the other three. Graphics Format tab › Arrange group › Align › Align Middle, then Align › Distribute Horizontally (Home tab › Arrange › Align works too).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "object.align", value: "Align Middle" }, requires: { slide: "s3", selection: deptIcons }, selectHint: "Select all four icons: click one, then Shift+click the other three." },
            { action: { kind: "command", id: "object.align", value: "Distribute Horizontally" }, requires: { slide: "s3", selection: deptIcons }, selectHint: "Select all four icons: click one, then Shift+click the other three." },
          ],
        },
        {
          instruction: "On slide 4, insert the Stethoscope icon to go with Dr. Ana Torres's name.",
          hint: "Go to slide 4. Insert tab › Illustrations group › Icons. Choose Stethoscope, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "insertIcons", values: { icon: "Stethoscope" } }, requires: { slide: "s4" }, selectHint: "Go to slide 4, “Provider Directory”, first." }],
        },
        {
          instruction: "Group the stethoscope icon with the name text box so they move together.",
          hint: "Click the icon, then Shift+click the text box. Shape Format tab › Arrange group › Group › Group (or press Ctrl+G).",
          steps: [{ action: { kind: "command", id: "object.group" }, requires: { slide: "s4", selection: iconAndName }, selectHint: "Select both objects: click the icon, then Shift+click the text box with Dr. Torres's name." }],
        },
        {
          instruction: "Compress every picture in the presentation for email.",
          hint: "Click any picture. Picture Format tab › Adjust group › Compress Pictures. Clear Apply only to this picture, choose E-mail (96 ppi), then click OK.",
          steps: [{
            action: { kind: "dialog", id: "compressPictures", values: { applyOnly: false, resolution: "E-mail (96 ppi)" } },
            requires: { selection: ["s2.o1", "s5.o1"] },
            selectHint: "Select a picture first (the team photo on slide 2 or the waiting room photo on slide 5) so the Picture Format tab appears.",
          }],
        },
      ],
    },
    {
      id: "oa-ppt-m5-media-2",
      app: "powerpoint",
      title: "Calm the motion and embed the welcome video",
      scenario: "Last year's presenter used spinning transitions and a bouncing title. Your supervisor wants one quiet transition, bullets that appear one click at a time, and Dr. Kim's welcome video embedded so it plays without an internet connection.",
      fileName: "Staff Orientation - Motion.pptx",
      minutes: 7,
      initial: {
        active: "s1",
        theme: "Facet",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Welcome to Lakeside Medical Associates", subtitle: "New Staff Orientation" },
          { id: "s2", layout: "Title and Content", title: "A Welcome from Dr. Kim", transition: "Vortex" },
          { id: "s3", layout: "Title and Content", title: "Patient Communication Standards", titleAnimation: "Bounce", transition: "Honeycomb", body: ["Greet every patient by name", "Make eye contact and listen", "Use plain language", "Walk patients to the exam room"] },
          { id: "s4", layout: "Title and Content", title: "HIPAA Basics", transition: "Cube", body: ["Share only what is needed", "Log out of the EHR every time", "Report concerns right away"] },
          { id: "s5", layout: "Title Only", title: "Questions?", transition: "Ripple" },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Fade transition to slide 1 and set its duration to 0.75 seconds.",
          hint: "Click slide 1. Transitions tab › Transition to This Slide gallery › Fade. Then Timing group › Duration: type 00.75 and press Enter.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "transition.apply", value: "Fade" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." },
            { action: { kind: "command", id: "transition.duration", value: "0.75" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." },
          ],
        },
        {
          instruction: "Use slide 1's transition and duration on every slide, replacing the spinning effects.",
          hint: "With slide 1 selected: Transitions tab › Timing group › Apply To All.",
          steps: [{ action: { kind: "command", id: "transition.applyAll" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." }],
        },
        {
          instruction: "On slide 3, remove the bouncing animation from the title.",
          hint: "Click the title on slide 3. Animations tab › Animation gallery › None. (In the Animation Pane you can also click the title's effect and press Delete.)",
          steps: [{
            action: { kind: "command", id: "animation.apply", value: "None" },
            alt: [
              { kind: "command", id: "edit.delete", requires: { slide: "s3", selection: "s3.title.anim" } },
              { kind: "command", id: "animation.remove", requires: { slide: "s3", selection: ["s3.title.anim", "s3.title"] } },
            ],
            requires: { slide: "s3", selection: ["s3.title", "s3.title.anim"] },
            selectHint: "Click the title “Patient Communication Standards” on slide 3 first (or its effect in the Animation Pane).",
          }],
        },
        {
          instruction: "Apply the Fade entrance animation to the bulleted list on slide 3 so the bullets appear one click at a time.",
          hint: "Click inside the list and press Ctrl+A. Animations tab › Animation gallery › Fade (or Add Animation › Fade). Fade starts On Click by default.",
          steps: [{
            action: { kind: "command", id: "animation.apply", value: "Fade" },
            alt: [{ kind: "command", id: "animation.add", value: "Fade" }],
            requires: { slide: "s3", selection: "s3.body" },
            selectHint: "Select the whole list placeholder on slide 3: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "Open the Animation Pane to check the order, then preview the slide's animations.",
          hint: "Animations tab › Advanced Animation group › Animation Pane. Then click Play All at the top of the pane (or Animations tab › Preview).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "animation.pane" } },
            { action: { kind: "command", id: "animation.preview" } },
          ],
        },
        {
          instruction: "On slide 2, embed the video welcome-message.mp4 from your computer.",
          hint: "Go to slide 2 and click the Insert Video icon in the placeholder (or Insert tab › Media group › Video › This Device…). Choose welcome-message.mp4, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "insertVideo", values: { file: "welcome-message.mp4" } }, requires: { slide: "s2" }, selectHint: "Go to slide 2, “A Welcome from Dr. Kim”, first." }],
        },
        {
          instruction: "Set the video to play only when you click it.",
          hint: "With the video selected: Playback tab › Video Options group › Start › When Clicked On.",
          steps: [{ action: { kind: "command", id: "media.start", value: "When Clicked On" }, requires: { slide: "s2", selection: "s2.o1" }, selectHint: "Click the video on slide 2 first." }],
        },
        {
          instruction: "Have the video go back to its first frame when it finishes.",
          hint: "Playback tab › Video Options group › check Rewind after Playing.",
          steps: [{ action: { kind: "command", id: "media.rewind" }, requires: { slide: "s2", selection: "s2.o1" }, selectHint: "Click the video on slide 2 first." }],
        },
      ],
    },
  ],

  "module-5::presenting-and-delivery": [
    {
      id: "oa-ppt-m5-presenting-1",
      app: "powerpoint",
      title: "Run Monday's orientation from the front of the room",
      scenario: "Tomorrow you present the orientation deck to four new hires in Conference Room B. Keep your notes on the laptop, skip the slide that was pulled for revision, and practice the controls you will use during questions and the break.",
      fileName: "New Staff Orientation - Monday.pptx",
      minutes: 5,
      initial: { active: "s1", theme: "Facet", slides: monday },
      tasks: [
        {
          instruction: "Set up the show so your laptop shows your notes, a timer, and the next slide while the projector shows only the current slide.",
          hint: "Slide Show tab › Monitors group › check Use Presenter View.",
          steps: [{ action: { kind: "command", id: "slideshow.presenterView" }, alt: [{ kind: "dialog", id: "setupShow", values: { presenterView: true } }] }],
        },
        {
          instruction: "Slide 8 was pulled for revision. Keep it in the file but skip it during the show.",
          hint: "Right-click slide 8 in the thumbnails › Hide Slide (or select it, then Slide Show tab › Set Up group › Hide Slide).",
          steps: [{ action: { kind: "command", id: "slides.hide" }, alt: [{ kind: "command", id: "slideshow.hideSlide" }], requires: { slide: "s8" }, selectHint: "Click slide 8, “Benefits Enrollment (Under Revision)”, in the thumbnails first." }],
        },
        {
          instruction: "Start the slide show from the beginning.",
          hint: "Slide Show tab › Start Slide Show group › From Beginning (or press F5).",
          steps: [{ action: { kind: "command", id: "slideshow.fromBeginning" } }],
        },
        {
          instruction: "A new hire asks to see the team again. Jump straight to slide 4 without clicking through the slides in between.",
          hint: "While presenting, type 4 and press Enter (or right-click › See All Slides › slide 4).",
          steps: [{ action: { kind: "command", id: "slideshow.goto", value: "4" } }],
        },
        {
          instruction: "Turn the pointer into a highlighter so you can mark Monica Reyes's name.",
          hint: "Right-click the slide › Pointer Options › Highlighter (or press Ctrl+I, or click the pen button on the slide show toolbar › Highlighter).",
          steps: [{ action: { kind: "command", id: "slideshow.pointer", value: "Highlighter" } }],
        },
        {
          instruction: "Black out the screen for the 10-minute break without ending the show.",
          hint: "Press B (or right-click › Screen › Black Screen). Press B again when the break is over.",
          steps: [{ action: { kind: "command", id: "slideshow.screen", value: "Black" } }],
        },
        {
          instruction: "End the slide show.",
          hint: "Press Esc. If the highlighter is still on, the first Esc turns it off and the second ends the show (or right-click › End Show).",
          steps: [{ action: { kind: "command", id: "slideshow.end" } }],
        },
      ],
    },
    {
      id: "oa-ppt-m5-presenting-2",
      app: "powerpoint",
      title: "Make a short version, time it, print it, and export it",
      scenario: "Before Monday, set up a short version of the orientation for returning staff, find out how long the full session runs, print packets for the four new hires and notes for yourself, and make copies for new hires who want to read ahead or watch from home.",
      fileName: "New Staff Orientation - Monday.pptx",
      minutes: 7,
      initial: { active: "s1", theme: "Facet", slides: monday },
      tasks: [
        {
          instruction: "Returning staff only need the overview. Create a custom show named “Orientation - Short Version” with slides 1, 2, 3, 4, and 10, in that order.",
          hint: "Slide Show tab › Start Slide Show group › Custom Slide Show › Custom Shows… › New. Type the name in Slide show name, check slides 1, 2, 3, 4 and 10, click Add, then click OK.",
          steps: [{ action: { kind: "dialog", id: "defineCustomShow", values: { name: "Orientation - Short Version", slides: "s1,s2,s3,s4,s10" } } }],
        },
        {
          instruction: "Test the custom show: run “Orientation - Short Version”, then end the show.",
          hint: "In the Custom Shows dialog, select Orientation - Short Version and click Show (reopen it from Slide Show tab › Custom Slide Show › Custom Shows… if you closed it). Click through the five slides to the end, or press Esc at any time.",
          steps: [
            { action: { kind: "command", id: "slideshow.customShow", value: "Orientation - Short Version" } },
            { action: { kind: "command", id: "slideshow.end" } },
          ],
        },
        {
          instruction: "Rehearse the slide timings: run a rehearsal, click through every slide, end the show, and keep the timings.",
          hint: "Slide Show tab › Set Up group › Rehearse Timings. Click Next (or press the Right Arrow) on each slide, press Esc after the last one, then click Yes.",
          steps: [
            { action: { kind: "command", id: "slideshow.rehearse" } },
            { action: { kind: "command", id: "slideshow.keepTimings", value: "Yes" } },
          ],
        },
        {
          instruction: "You present live, so the slides must not move on by themselves. Set up the show to advance slides manually while keeping the saved timings.",
          hint: "Slide Show tab › Set Up group › Set Up Slide Show. Under Advance slides, choose Manually, then click OK.",
          steps: [{ action: { kind: "dialog", id: "setupShow", values: { advance: "Manually" } } }],
        },
        {
          instruction: "Print 4 copies as handouts with 3 slides per page, the layout that leaves lines for notes.",
          hint: "File › Print (or Ctrl+P). Set Copies to 4, change Full Page Slides to 3 Slides (Handouts), then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 4, layout: "3 Slides (Handouts)" } } }],
        },
        {
          instruction: "Print one copy of your speaker notes to keep beside the laptop.",
          hint: "File › Print. Keep Copies at 1, change the layout to Notes Pages, then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 1, layout: "Notes Pages" } } }],
        },
        {
          instruction: "Export a PDF named “Staff Orientation PDF - Lakeside Medical” to email to the new hires before Monday.",
          hint: "File › Export › Create PDF/XPS Document. Type the name, then click Create PDF/XPS.",
          steps: [{
            action: { kind: "dialog", id: "file.exportPdf", values: { name: "Staff Orientation PDF - Lakeside Medical" } },
            alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Staff Orientation PDF - Lakeside Medical", format: "PDF (*.pdf)" } }],
          }],
        },
        {
          instruction: "Save a copy as an MPEG-4 video named “Staff Orientation - Video” for a new hire who will watch from home.",
          hint: "File › Save As › This PC. Type the name, choose MPEG-4 Video (*.mp4) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Staff Orientation - Video", format: "MPEG-4 Video (*.mp4)" } } }],
        },
      ],
    },
  ],

  "module-5::powerpoint-capstone": [
    {
      id: "oa-ppt-m5-capstone-1",
      app: "powerpoint",
      title: "Build and brand the final orientation deck",
      scenario: "Four new employees start next Monday, and the office manager has given you full ownership of the orientation deck. The content is in place. Give it a professional theme, the confidential footer, the right layouts, and the visuals the quality checklist requires.",
      fileName: "Staff Orientation - Draft.pptx",
      minutes: 7,
      initial: { active: "s1", slides: capstoneSlides },
      tasks: [
        {
          instruction: "Apply the Retrospect theme to the presentation.",
          hint: "Design tab › Themes gallery › Retrospect (click the More arrow if you do not see it).",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Retrospect" } }],
        },
        {
          instruction: "Add the footer “Lakeside Medical Associates | Confidential” to every slide except the title slide.",
          hint: "Insert tab › Text group › Header & Footer. Check Footer, type the text, check Don't show on title slide, then click Apply to All.",
          steps: [{ action: { kind: "dialog", id: "headerFooter", values: { footer: true, footerText: "Lakeside Medical Associates | Confidential", dontShowOnTitle: true } } }],
        },
        {
          instruction: "Slide 10 is the closing slide and only needs its title. Change its layout to Title Only.",
          hint: "Click slide 10 in the thumbnails. Home tab › Slides group › Layout › Title Only (or right-click the thumbnail › Layout).",
          steps: [{ action: { kind: "command", id: "slides.layout", value: "Title Only" }, requires: { slide: "s10" }, selectHint: "Click slide 10, “Welcome to the Team”, in the thumbnails first." }],
        },
        {
          instruction: "On slide 1, insert the stock image “Clinic waiting room”.",
          hint: "Go to slide 1. Insert tab › Images group › Pictures › Stock Images…. Choose Clinic waiting room, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "stockImages", values: { image: "Clinic waiting room" } }, requires: { slide: "s1" }, selectHint: "Go to slide 1 first." }],
        },
        {
          instruction: "Convert the agenda on slide 2 into a Basic Block List SmartArt graphic.",
          hint: "Click inside the slide 2 list and press Ctrl+A. Home tab › Paragraph group › Convert to SmartArt › Basic Block List (or right-click the list › Convert to SmartArt).",
          steps: [{
            action: { kind: "command", id: "home.convertSmartArt", value: "Basic Block List" },
            alt: [{ kind: "dialog", id: "convertSmartArt", values: { graphic: "Basic Block List" } }],
            requires: { slide: "s2", selection: "s2.body" },
            selectHint: "Select the whole agenda list on slide 2 first: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "Format the policies on slide 5 as a numbered list in the “1. 2. 3.” style.",
          hint: "Click inside the slide 5 list and press Ctrl+A. Home tab › Paragraph group › Numbering arrow › 1. 2. 3. (or click the Numbering button itself).",
          steps: [{
            action: { kind: "command", id: "home.numbering", value: "1. 2. 3." },
            alt: [{ kind: "command", id: "home.numbering", value: "" }, { kind: "dialog", id: "numbering", values: { style: "1. 2. 3." } }],
            requires: { slide: "s5", selection: "s5.body" },
            selectHint: "Select the whole list on slide 5 first: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "On slide 6, insert the Telephone icon to stand for the phone system.",
          hint: "Go to slide 6. Insert tab › Illustrations group › Icons. Choose Telephone, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "insertIcons", values: { icon: "Telephone" } }, requires: { slide: "s6" }, selectHint: "Go to slide 6, “Key Systems Overview”, first." }],
        },
        {
          instruction: "Select all four icons on slide 6 and space them evenly across the row.",
          hint: "Click the first icon, then Shift+click the other three. Graphics Format tab › Arrange group › Align › Distribute Horizontally (Home tab › Arrange › Align works too).",
          steps: [{ action: { kind: "command", id: "object.align", value: "Distribute Horizontally" }, requires: { slide: "s6", selection: systemIcons }, selectHint: "Select all four icons on slide 6: click one, then Shift+click the other three." }],
        },
      ],
    },
    {
      id: "oa-ppt-m5-capstone-2",
      app: "powerpoint",
      title: "Animate, test, and deliver in three formats",
      scenario: "The orientation deck is built and branded. Finish the checklist: one consistent transition, click-by-click reveals on the two most important slides, notes for the closing slide, a test run, and the three files the office manager asked for.",
      fileName: "Staff Orientation - Draft.pptx",
      minutes: 7,
      initial: { active: "s1", theme: "Retrospect", footer: { text: "Lakeside Medical Associates | Confidential" }, flags: { dontShowOnTitle: true }, slides: capstoneBranded },
      tasks: [
        {
          instruction: "Apply the Fade transition to slide 1, then use it on every slide.",
          hint: "Click slide 1. Transitions tab › Transition to This Slide gallery › Fade, then Timing group › Apply To All.",
          steps: [
            { action: { kind: "command", id: "transition.apply", value: "Fade" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." },
            { action: { kind: "command", id: "transition.applyAll" }, requires: { slide: "s1" }, selectHint: "Keep slide 1 selected, then apply its transition to all slides." },
          ],
        },
        {
          instruction: "Apply the Fade entrance animation to the bulleted lists on slides 7 and 8 so each bullet appears on a click.",
          hint: "On slide 7, click inside the list and press Ctrl+A, then Animations tab › Animation gallery › Fade. Repeat on slide 8.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "animation.apply", value: "Fade" },
              alt: [{ kind: "command", id: "animation.add", value: "Fade" }],
              requires: { slide: "s7", selection: "s7.body" },
              selectHint: "Select a whole list first: on slide 7 or slide 8, click inside the list and press Ctrl+A.",
            },
            {
              action: { kind: "command", id: "animation.apply", value: "Fade" },
              alt: [{ kind: "command", id: "animation.add", value: "Fade" }],
              requires: { slide: "s8", selection: "s8.body" },
              selectHint: "Select a whole list first: on slide 7 or slide 8, click inside the list and press Ctrl+A.",
            },
          ],
        },
        {
          instruction: "Add the speaker note “Thank everyone for coming. Send questions to Monica Reyes at ext. 4110.” to slide 10.",
          hint: "Click slide 10. Double-click the Notes pane under the slide, type the note, then click outside it.",
          steps: [typeIn("s10.notes", "Thank everyone for coming. Send questions to Monica Reyes at ext. 4110.")],
        },
        {
          instruction: "Set up the show so your notes appear on the laptop, not on the projector.",
          hint: "Slide Show tab › Monitors group › check Use Presenter View.",
          steps: [{ action: { kind: "command", id: "slideshow.presenterView" }, alt: [{ kind: "dialog", id: "setupShow", values: { presenterView: true } }] }],
        },
        {
          instruction: "Test the new animations: start the slide show from slide 7, then end the show.",
          hint: "Click slide 7 in the thumbnails, then press Shift+F5 (or Slide Show tab › From Current Slide). Click to reveal each bullet, then press Esc.",
          steps: [
            { action: { kind: "command", id: "slideshow.fromCurrent" }, alt: [{ kind: "command", id: "slideshow.presenterStart" }], requires: { slide: "s7" }, selectHint: "Click slide 7, “Patient Communication Standards”, in the thumbnails before you start the show." },
            { action: { kind: "command", id: "slideshow.end" } },
          ],
        },
        {
          instruction: "Save the presentation as a PowerPoint Presentation (.pptx) named “Staff Orientation - Final - Lakeside Medical”.",
          hint: "File › Save As (or F12) › This PC. Type the name, keep PowerPoint Presentation (*.pptx) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Staff Orientation - Final - Lakeside Medical", format: "PowerPoint Presentation (*.pptx)" } } }],
        },
        {
          instruction: "Save a copy named “Staff Orientation - Kiosk” that opens straight into the slide show.",
          hint: "File › Save As › This PC. Type the name, choose PowerPoint Show (*.ppsx) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Staff Orientation - Kiosk", format: "PowerPoint Show (*.ppsx)" } } }],
        },
        {
          instruction: "Export a PDF named “Staff Orientation - Pre-Read - Lakeside Medical” to email to the new hires.",
          hint: "File › Export › Create PDF/XPS Document. Type the name, then click Create PDF/XPS.",
          steps: [{
            action: { kind: "dialog", id: "file.exportPdf", values: { name: "Staff Orientation - Pre-Read - Lakeside Medical" } },
            alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Staff Orientation - Pre-Read - Lakeside Medical", format: "PDF (*.pdf)" } }],
          }],
        },
      ],
    },
  ],

  /* ================================================================ */
  /* Module 6: Outlook & Integration                                   */
  /* ================================================================ */

  "module-6::working-across-office-apps": [
    {
      id: "oa-ppt-m6-working-across-apps-1",
      app: "powerpoint",
      title: "Link the Excel expense chart into the monthly summary",
      scenario: "You are building the PowerPoint part of the monthly operations package for Dr. Rachel Kim. The expense chart is already copied from the Excel dashboard. Paste it on the summary slide with a link to the workbook so it stays current, pick up Accounting's correction, add your observations and the Word report's summary, make a partner-safe copy of the chart, and get the file ready to share.",
      fileName: "Monthly Summary - May 2026 - Lakeside Medical.pptx",
      minutes: 8,
      initial: {
        active: "s1",
        theme: "Integral",
        saved: { name: "Monthly Summary - May 2026 - Lakeside Medical.pptx", location: "OneDrive - Personal", autosave: true },
        flags: {
          clip: JSON.stringify(excelClip),
          clipCut: false,
          clipHistory: JSON.stringify([excelClip, wordClip]),
          linkSources: JSON.stringify(correctedWorkbook),
        },
        slides: [
          { id: "s1", layout: "Title Slide", title: "Monthly Operations Summary", subtitle: "May 2026 · Lakeside Medical Associates" },
          { id: "s2", layout: "Title Only", title: "Monthly Expense Summary" },
          { id: "s3", layout: "Title and Content", title: "Key Observations" },
        ],
      },
      tasks: [
        {
          instruction: "Paste the chart you copied from Excel onto slide 2 with a link to the workbook, so the slide picks up changes made in Excel.",
          hint: "Click slide 2, “Monthly Expense Summary”. Home tab › Clipboard group › Paste arrow › Paste Special… (or press Ctrl+Alt+V). Choose Paste link, keep Microsoft Excel Chart Object selected, then click OK.",
          steps: [{
            action: { kind: "dialog", id: "pasteSpecial", values: { mode: "Paste link" } },
            alt: [{ kind: "command", id: "home.paste", value: ["Use Destination Theme & Link Data", "Keep Source Formatting & Link Data"] }],
            requires: { slide: "s2" },
            selectHint: "Go to slide 2, “Monthly Expense Summary”, before you paste.",
          }],
        },
        {
          instruction: "Accounting just corrected the May Facilities total to 6,480 in the Excel workbook. Update the linked chart so slide 2 shows the new number.",
          hint: "Right-click the chart › Update Link (or right-click › Linked Chart Object › Links…, then Update Now). If you pasted with a Link Data option instead, click the chart, then Chart Design tab › Data group › Refresh Data.",
          steps: [{
            action: { kind: "command", id: "links.update" },
            alt: [{ kind: "command", id: "chart.refresh", requires: { slide: "s2", selection: "s2.o1" } }],
          }],
        },
        {
          instruction: "On slide 3, type these observations as three bullets: “Medical is our largest expense”, “Facilities rose after the HVAC repair”, and “Every department stayed within budget”.",
          hint: "Click “Click to add text” on slide 3, type the first observation, press Enter, and type the next. Click outside the placeholder when you finish.",
          steps: [typeIn("s3.body", "Medical is our largest expense\nFacilities rose after the HVAC repair\nEvery department stayed within budget")],
        },
        {
          instruction: `You copied the Word report's summary sentence earlier. Open the Office Clipboard and paste “${reportSummary}” into the slide 3 speaker notes.`,
          hint: "Click in the Notes pane under slide 3 (“Click to add notes”). Home tab › Clipboard group › click the small arrow in the group's bottom right corner to open the Clipboard pane, then click the Word item that starts “May expenses totaled”.",
          steps: [{
            action: { kind: "command", id: "clipboard.paste", value: reportSummary },
            alt: [{ kind: "dialog", id: "officeClipboard", values: { item: reportSummary } }],
            requires: { slide: "s3", selection: "s3.notes" },
            selectHint: "Click in the Notes pane under slide 3 first, so the sentence lands in the speaker notes.",
          }],
        },
        {
          instruction: "After slide 3, add a Title Only slide titled “Expenses at a Glance: Partner Copy”.",
          hint: "Click slide 3. Home tab › Slides group › New Slide arrow › Title Only. Click “Click to add title”, type the title, then click outside.",
          steps: [
            { action: { kind: "command", id: "slides.new", value: "Title Only" }, requires: { slide: "s3" }, selectHint: "Click slide 3, “Key Observations”, in the thumbnails first." },
            typeIn("s4.title", "Expenses at a Glance: Partner Copy"),
          ],
        },
        {
          instruction: "Referral partners should see the chart but not the workbook link or the data behind it. Copy the updated chart from slide 2 and paste it on slide 4 as a picture.",
          hint: "On slide 2, click the chart and press Ctrl+C (Home › Copy). Go to slide 4, then Home tab › Paste arrow › Picture (or Paste Special… › Picture (PNG)).",
          steps: [
            { action: { kind: "command", id: "home.copy" }, requires: { slide: "s2", selection: "s2.o1" }, selectHint: "Go to slide 2 and click the updated chart before you copy." },
            {
              action: { kind: "command", id: "home.paste", value: "Picture" },
              alt: [{ kind: "dialog", id: "pasteSpecial", values: { mode: "Paste", as: ["Picture (PNG)", "Picture (Enhanced Metafile)", "Picture (GIF)", "Picture (JPEG)"] } }],
              requires: { slide: "s4" },
              selectHint: "Go to slide 4, “Expenses at a Glance: Partner Copy”, before you paste.",
            },
          ],
        },
        {
          instruction: "Share the presentation with Monica Reyes (monica.reyes@lakeside.example.com) so the two of you can edit it at the same time.",
          hint: "File › Share. Type the email address, keep Can edit, then click Send. Because the file is saved in OneDrive, you can both work in it at once.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "monica.reyes@lakeside.example.com", permission: "Can edit" } } }],
        },
        {
          instruction: "Export a PDF named “Monthly Summary - May 2026 - Lakeside Medical” for readers who do not have PowerPoint.",
          hint: "File › Export › Create PDF/XPS Document. Type the name, then click Create PDF/XPS.",
          steps: [{
            action: { kind: "dialog", id: "file.exportPdf", values: { name: "Monthly Summary - May 2026 - Lakeside Medical" } },
            alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Monthly Summary - May 2026 - Lakeside Medical", format: "PDF (*.pdf)" } }],
          }],
        },
      ],
    },
  ],
};
