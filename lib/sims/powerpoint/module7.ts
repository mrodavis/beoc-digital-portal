import type { SimDefinition, SimStep } from "@/types/sim";

/** PowerPoint Module 7: Tables, Charts, and SmartArt. Keys are `${moduleSlug}::${lessonSlug}`. */

const cell = (target: string, value: string | string[]): SimStep => ({ action: { kind: "type", target, value } });

export const pptModule7Sims: Record<string, SimDefinition[]> = {
  "module-7::inserting-tables": [
    {
      id: "ppt-m7-tables-1",
      app: "powerpoint",
      title: "Build the quarterly billing schedule",
      scenario: "The billing team update needs a small schedule table that reads from the back of the room. Build it on a new slide, format the header, and keep it tidy.",
      fileName: "Billing Team Update.pptx",
      minutes: 7,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Billing Team Update", subtitle: "Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "This Quarter", body: ["Claims denials down 6%", "Average days to payment: 24"] },
          { id: "s3", layout: "Title and Content", title: "Claims Workflow", body: ["Code the visit", "Scrub the claim", "Submit and track"] },
        ],
      },
      tasks: [
        {
          instruction: "After slide 3, add a Title and Content slide with the title “Quarterly Schedule”.",
          hint: "Click slide 3. Home tab › New Slide (Ctrl+M). Click “Click to add title”, type Quarterly Schedule, then click outside.",
          steps: [
            { action: { kind: "command", id: "slides.new", value: "Title and Content" }, requires: { slide: "s3" }, selectHint: "Click slide 3 in the thumbnails first." },
            { action: { kind: "type", target: "s4.title", value: "Quarterly Schedule" } },
          ],
        },
        {
          instruction: "Insert a table with 4 columns and 5 rows on the new slide.",
          hint: "Click the Insert Table icon in the content placeholder and enter 4 columns and 5 rows (or Insert tab › Table › 4×5 Table).",
          steps: [{ action: { kind: "command", id: "insert.table", value: "4x5" }, alt: [{ kind: "dialog", id: "insertTable", values: { cols: 4, rows: 5 } }], requires: { slide: "s4" }, selectHint: "Stay on slide 4, the new Quarterly Schedule slide." }],
        },
        {
          instruction: "Type the header row: “Quarter”, “Region”, “Billing Lead”, and “Status”.",
          hint: "Click the first cell and type Quarter. Press Tab to move to the next cell, and so on across the row.",
          anyOrder: true,
          steps: [cell("s4.o1.r1c1", "Quarter"), cell("s4.o1.r1c2", "Region"), cell("s4.o1.r1c3", "Billing Lead"), cell("s4.o1.r1c4", "Status")],
        },
        {
          instruction: "In the second row, type “Q1”, “North”, “Dana Whitfield”, and “Complete”.",
          hint: "Click the first cell of row 2 (or press Tab from the last header cell) and type each entry, pressing Tab between cells.",
          anyOrder: true,
          steps: [cell("s4.o1.r2c1", "Q1"), cell("s4.o1.r2c2", "North"), cell("s4.o1.r2c3", "Dana Whitfield"), cell("s4.o1.r2c4", "Complete")],
        },
        {
          instruction: "Merge the four cells in the last row into one cell.",
          hint: "Click the first cell of row 5, Shift+click the last cell of row 5. Layout tab › Merge › Merge Cells.",
          steps: [{ action: { kind: "command", id: "table.merge" }, requires: { slide: "s4", selection: "s4.o1.r5c1,s4.o1.r5c2,s4.o1.r5c3,s4.o1.r5c4" }, selectHint: "Select all four cells in the last row: click the first one, then Shift+click the last one." }],
        },
        {
          instruction: "Type “Status updated every Friday” in the merged cell.",
          hint: "Click the merged cell, type the text, then press Enter or click outside the table.",
          steps: [cell("s4.o1.r5c1", "Status updated every Friday")],
        },
        {
          instruction: "Apply the Medium Style 2 - Accent 2 table style.",
          hint: "Click in the table. Table Design tab › Table Styles gallery › Medium Style 2 - Accent 2.",
          steps: [{ action: { kind: "command", id: "table.style", value: "Medium Style 2 - Accent 2" }, requires: { slide: "s4" }, selectHint: "Click inside the table on slide 4 first." }],
        },
        {
          instruction: "Make all of the columns the same width.",
          hint: "Click in the table. Layout tab › Cell Size › Distribute Columns.",
          steps: [{ action: { kind: "command", id: "table.distributeColumns" }, requires: { slide: "s4" }, selectHint: "Click inside the table on slide 4 first." }],
        },
      ],
    },
  ],

  "module-7::inserting-charts": [
    {
      id: "ppt-m7-charts-1",
      app: "powerpoint",
      title: "Chart the regional collections for the room",
      scenario: "You present first-quarter collections to the Lakeside Medical Associates leadership team. Build a simple column chart that someone can read from six meters away.",
      fileName: "Collections Review.pptx",
      minutes: 7,
      initial: {
        active: "s1",
        theme: "Retrospect",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Collections Review", subtitle: "First Quarter 2026" },
          { id: "s2", layout: "Title and Content", title: "Highlights", body: ["Total collections: $157,600", "East region led for the second quarter"] },
          { id: "s3", layout: "Title and Content", title: "How We Collect", body: ["Statements on day 1", "Reminder call on day 30", "Payment plans offered on day 45"] },
        ],
      },
      tasks: [
        {
          instruction: "After slide 3, add a Title and Content slide titled “Collections by Region, Q1”.",
          hint: "Click slide 3. Home tab › New Slide (Ctrl+M). Click “Click to add title”, type the title, then click outside.",
          steps: [
            { action: { kind: "command", id: "slides.new", value: "Title and Content" }, requires: { slide: "s3" }, selectHint: "Click slide 3 in the thumbnails first." },
            { action: { kind: "type", target: "s4.title", value: "Collections by Region, Q1" } },
          ],
        },
        {
          instruction: "Insert a Clustered Column chart on the new slide.",
          hint: "Click the Insert Chart icon in the placeholder (or Insert tab › Illustrations › Chart). Choose Clustered Column, then click OK.",
          steps: [{ action: { kind: "dialog", id: "insertChart", values: { type: "Clustered Column" } }, requires: { slide: "s4" }, selectHint: "Stay on slide 4, the new chart slide." }],
        },
        {
          instruction: "In the chart's data sheet, replace the categories with “North”, “South”, “East”, and “West”.",
          hint: "In the Chart in Microsoft PowerPoint window, click cell A2, type North, press Enter, and continue down to A5.",
          anyOrder: true,
          steps: [cell("s4.o1.A2", "North"), cell("s4.o1.A3", "South"), cell("s4.o1.A4", "East"), cell("s4.o1.A5", "West")],
        },
        {
          instruction: "Enter the collections: North 42000, South 35500, East 51200, West 28900.",
          hint: "Click cell B2, type 42000, press Enter, and continue down to B5.",
          anyOrder: true,
          steps: [cell("s4.o1.B2", ["42000", "42,000"]), cell("s4.o1.B3", ["35500", "35,500"]), cell("s4.o1.B4", ["51200", "51,200"]), cell("s4.o1.B5", ["28900", "28,900"])],
        },
        {
          instruction: "Close the chart data sheet.",
          hint: "Click the ✕ at the top right of the Chart in Microsoft PowerPoint window.",
          steps: [{ action: { kind: "command", id: "pane.close" } }],
        },
        {
          instruction: "Apply chart Style 4.",
          hint: "Click the chart. Chart Design tab › Chart Styles gallery › Style 4.",
          steps: [{ action: { kind: "command", id: "chart.style", value: "Style 4" }, requires: { slide: "s4", selection: "s4.o1" }, selectHint: "Click the chart on slide 4 first." }],
        },
        {
          instruction: "Show the value above each column.",
          hint: "Chart Design tab › Add Chart Element › Data Labels › Outside End (or the + Chart Elements button beside the chart › Data Labels).",
          steps: [{ action: { kind: "command", id: "chart.addElement", value: "Data Labels: Outside End" }, requires: { slide: "s4", selection: "s4.o1" }, selectHint: "Click the chart on slide 4 first." }],
        },
        {
          instruction: "Remove the chart legend, since the categories are already labeled.",
          hint: "Chart Design tab › Add Chart Element › Legend › None (or the + Chart Elements button › clear Legend).",
          steps: [{ action: { kind: "command", id: "chart.addElement", value: "Legend: None" }, requires: { slide: "s4", selection: "s4.o1" }, selectHint: "Click the chart on slide 4 first." }],
        },
      ],
    },
  ],

  "module-7::using-smartart": [
    {
      id: "ppt-m7-smartart-1",
      app: "powerpoint",
      title: "Turn the onboarding steps into diagrams",
      scenario: "The new hire onboarding deck lists a five-step process as plain bullets, and the team slide has no structure at all. Use SmartArt so the shape of the content shows at a glance.",
      fileName: "New Hire Onboarding.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "New Hire Onboarding", subtitle: "Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "Welcome Aboard", body: ["Your first two weeks are mapped out for you", "Ask questions early and often"] },
          { id: "s3", layout: "Title and Content", title: "Onboarding Process", body: ["Accept the offer", "Complete HR paperwork", "Attend orientation", "Shadow a team member"] },
          { id: "s4", layout: "Title Only", title: "Who's Who on Your Team" },
        ],
      },
      tasks: [
        {
          instruction: "On slide 3, convert the bulleted list into a Basic Process SmartArt graphic.",
          hint: "Select the slide 3 list (click inside it and press Ctrl+A). Right-click › Convert to SmartArt › Basic Process (or Home tab › Paragraph › Convert to SmartArt).",
          steps: [{
            action: { kind: "command", id: "home.convertSmartArt", value: "Basic Process" },
            alt: [{ kind: "dialog", id: "convertSmartArt", values: { graphic: "Basic Process" } }],
            requires: { slide: "s3", selection: "s3.body" },
            selectHint: "Select the whole list on slide 3 first: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "Add a fifth step, “Work your first solo shift”, at the end of the process.",
          hint: "In the Text Pane (SmartArt Design tab › Text Pane), click at the end of the last line, press Enter, type the new step, then click outside the Text Pane.",
          steps: [{ action: { kind: "type", target: "s3.o1", value: "Accept the offer\nComplete HR paperwork\nAttend orientation\nShadow a team member\nWork your first solo shift" } }],
        },
        {
          instruction: "Change the graphic's layout to Step Up Process.",
          hint: "Click the graphic. SmartArt Design tab › Layouts gallery › Step Up Process.",
          steps: [{ action: { kind: "command", id: "smartart.layout", value: "Step Up Process" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the SmartArt graphic on slide 3 first." }],
        },
        {
          instruction: "Apply the Polished SmartArt style.",
          hint: "SmartArt Design tab › SmartArt Styles gallery › More arrow › 3-D › Polished.",
          steps: [{ action: { kind: "command", id: "smartart.style", value: "Polished" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the SmartArt graphic on slide 3 first." }],
        },
        {
          instruction: "Change the graphic's colors to Colorful Range - Accent Colors 2 to 3.",
          hint: "SmartArt Design tab › Change Colors › Colorful Range - Accent Colors 2 to 3.",
          steps: [{ action: { kind: "command", id: "smartart.colors", value: "Colorful Range - Accent Colors 2 to 3" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the SmartArt graphic on slide 3 first." }],
        },
        {
          instruction: "On slide 4, insert a Hierarchy SmartArt graphic.",
          hint: "Go to slide 4. Insert tab › Illustrations › SmartArt. Choose Hierarchy, then click OK.",
          steps: [{ action: { kind: "dialog", id: "insertSmartArt", values: { graphic: "Hierarchy" } }, requires: { slide: "s4" }, selectHint: "Go to slide 4 first." }],
        },
        {
          instruction: "Replace the placeholder text in the hierarchy with “Practice Manager”, “Front Desk Lead”, “Billing Lead”, and “Clinical Lead”, one per line.",
          hint: "In the Text Pane, replace the [Text] lines: type Practice Manager on the first line, then each lead on its own line. Click outside the Text Pane to update the graphic.",
          steps: [{ action: { kind: "type", target: "s4.o1", value: "Practice Manager\nFront Desk Lead\nBilling Lead\nClinical Lead" } }],
        },
      ],
    },
  ],
};
