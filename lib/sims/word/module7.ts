import type { SimDefinition } from "@/types/sim";

/** Word Module 7: Advanced Styles & Themes. */
export const wordModule7Sims: Record<string, SimDefinition[]> = {
  "module-7::working-with-styles": [
    {
      id: "word-m7-working-styles-1",
      app: "word",
      title: "Restyle the policy manual section with styles",
      scenario:
        "Every heading in this section of the policy manual was formatted by hand: select, 14 point, bold, dark blue. When leadership changes the look, that means redoing every heading. Replace the hand formatting with styles so the next change is one step.",
      fileName: "Policy Manual - Sections 4 and 5.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", size: 20, bold: true, text: "Lakeside Medical Associates Policy Manual" },
          { id: "p2", size: 14, bold: true, color: "#1F3864", text: "Section 4: Patient Communication" },
          { id: "p3", text: "Staff communicate with patients by phone, through the patient portal, and in person. Every message must protect patient privacy." },
          { id: "p4", size: 12, bold: true, text: "4.1 Phone Calls" },
          { id: "p5", text: "Confirm the caller's name and date of birth before discussing any part of a patient's record." },
          { id: "p6", size: 12, bold: true, text: "4.2 Patient Portal Messages" },
          { id: "p7", font: "Times New Roman", size: 13, color: "#7F7F7F", text: "Portal messages are answered within one business day. Urgent clinical questions are routed to the nurse line." },
          { id: "p8", size: 14, bold: true, color: "#1F3864", text: "Section 5: Records Requests" },
          { id: "p9", runs: [{ text: "Staff " }, { id: "r1", text: "must" }, { text: " verify the requester's identity before releasing any part of a record." }] },
          { id: "p10", size: 12, bold: true, text: "5.1 Requests from Patients" },
          { id: "p11", text: "Patients may request a copy of their records in writing or through the portal. Copies are ready within 15 business days." },
          { id: "p12", bold: true, italic: true, color: "#C00000", highlight: "#FFFF00", text: "Reviewed by the compliance team, October 2026." },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Title style to the first line, “Lakeside Medical Associates Policy Manual”.",
          hint: "Click the first line. Home tab › Styles gallery › Title (use the More arrow if you don't see it).",
          steps: [{ action: { kind: "command", id: "home.style", value: "Title" }, requires: { selection: "p1" }, selectHint: "Click the first line first." }],
        },
        {
          instruction: "Apply the Heading 1 style to “Section 4: Patient Communication” and to “Section 5: Records Requests”.",
          hint: "Click each section title, then Home tab › Styles gallery › Heading 1 (or press Ctrl+Alt+1).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p2" }, selectHint: "Click “Section 4: Patient Communication”, then apply Heading 1." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p8" }, selectHint: "Click “Section 5: Records Requests”, then apply Heading 1." },
          ],
        },
        {
          instruction: "Apply the Heading 2 style to the three numbered subsection titles: 4.1, 4.2, and 5.1.",
          hint: "Click each subsection title, then Home tab › Styles gallery › Heading 2 (or press Ctrl+Alt+2).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 2" }, requires: { selection: "p4" }, selectHint: "Click “4.1 Phone Calls”, then apply Heading 2." },
            { action: { kind: "command", id: "home.style", value: "Heading 2" }, requires: { selection: "p6" }, selectHint: "Click “4.2 Patient Portal Messages”, then apply Heading 2." },
            { action: { kind: "command", id: "home.style", value: "Heading 2" }, requires: { selection: "p10" }, selectHint: "Click “5.1 Requests from Patients”, then apply Heading 2." },
          ],
        },
        {
          instruction: "The paragraph that begins “Portal messages are answered” was formatted by hand. Apply the Normal style to it so it matches the other body text.",
          hint: "Click the paragraph. Home tab › Styles gallery › Normal (or press Ctrl+Shift+N).",
          steps: [
            {
              action: { kind: "command", id: "home.style", value: "Normal" },
              alt: [{ kind: "command", id: "home.clearFormatting" }],
              requires: { selection: "p7" },
              selectHint: "Click the paragraph that begins “Portal messages are answered” first.",
            },
          ],
        },
        {
          instruction: "Apply the Strong character style to the word “must” in the Records Requests section.",
          hint: "Click the word “must”. Home tab › Styles gallery › More arrow › Strong.",
          steps: [{ action: { kind: "command", id: "home.style", value: "Strong" }, requires: { selection: "p9.r1" }, selectHint: "Click just the word “must” first." }],
        },
        {
          instruction: "Clear all of the formatting from the last line, “Reviewed by the compliance team, October 2026.”",
          hint: "Click the last line. Home tab › Font group › Clear All Formatting (or Styles gallery › More › Clear Formatting).",
          steps: [{ action: { kind: "command", id: "home.clearFormatting" }, requires: { selection: "p12" }, selectHint: "Click the last line first." }],
        },
      ],
    },
  ],

  "module-7::modifying-styles": [
    {
      id: "word-m7-modifying-styles-1",
      app: "word",
      title: "Change every heading in the manual at once",
      scenario:
        "Lakeside Medical Associates has a new look: main headings are larger and dark blue, and body text is Calibri 12 point. The manual already uses heading styles, so this is a few style changes, not dozens of selections.",
      fileName: "Policy Manual - Records.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Records Policy" },
          { id: "p2", style: "Heading 1", text: "1. Purpose" },
          { id: "p3", text: "This policy explains how Lakeside Medical Associates stores, shares, and releases patient records." },
          { id: "p4", style: "Heading 1", text: "2. Scope" },
          { id: "p5", text: "It applies to every employee, contractor, and volunteer who can see patient information." },
          { id: "p6", style: "Heading 2", text: "2.1 Who Must Follow This Policy" },
          { id: "p7", text: "Front desk staff, medical assistants, nurses, providers, and billing staff all handle records daily." },
          { id: "p8", style: "Heading 1", text: "3. Procedure" },
          { id: "p9", text: "Verify the requester's identity, log the request, and release only the records that were requested." },
          { id: "p10", text: "Tip: if a patient asks for records over the phone, transfer the call to the records office at extension 240." },
        ],
      },
      tasks: [
        {
          instruction: "Change the font size of the heading “1. Purpose” to 18.",
          hint: "Click the heading. Home tab › Font group › Font Size › 18.",
          steps: [
            {
              action: { kind: "command", id: "home.fontSize", value: "18" },
              alt: [{ kind: "dialog", id: "font", values: { size: 18 } }],
              requires: { selection: "p2" },
              selectHint: "Click the heading “1. Purpose” first.",
            },
          ],
        },
        {
          instruction: "Change the font color of “1. Purpose” to Dark Blue.",
          hint: "With the heading selected: Home tab › Font Color arrow › Standard Colors › Dark Blue.",
          steps: [
            {
              action: { kind: "command", id: "home.fontColor", value: "#002060" },
              alt: [{ kind: "dialog", id: "font", values: { color: "#002060" } }],
              requires: { selection: "p2" },
              selectHint: "Click the heading “1. Purpose” first.",
            },
          ],
        },
        {
          instruction: "Update the Heading 1 style to match “1. Purpose” so every main heading changes at once.",
          hint: "With “1. Purpose” selected: Home tab › Styles gallery › More arrow › Update Style to Match Selection. (In Word you can also right-click Heading 1 in the gallery › Update Heading 1 to Match Selection.)",
          steps: [{ action: { kind: "command", id: "home.updateStyle" }, requires: { selection: "p2" }, selectHint: "Click the heading “1. Purpose” first, since its formatting becomes the style." }],
        },
        {
          instruction: "Modify the Normal style so that body text uses Calibri, 12 point.",
          hint: "Home tab › Styles gallery › More arrow › Modify Style… › Name: Normal › Font: Calibri › Size: 12 › OK. (In Word: right-click Normal in the gallery › Modify.)",
          steps: [{ action: { kind: "dialog", id: "modifyStyle", values: { style: "Normal", font: "Calibri", size: 12 } } }],
        },
        {
          instruction: "Modify the Normal style again to add 6 pt of spacing after each paragraph.",
          hint: "Home tab › Styles gallery › More arrow › Modify Style… › Name: Normal › Spacing after: 6 pt › OK. (In Word this is Modify › Format › Paragraph.)",
          steps: [{ action: { kind: "dialog", id: "modifyStyle", values: { style: "Normal", spaceAfter: 6 } } }],
        },
        {
          instruction: "Create a new style named “Callout” with Blue, 11 point, italic text and apply it to the paragraph that begins “Tip:”.",
          hint: "Click the Tip paragraph. Home tab › Styles gallery › More arrow › Create a Style › Name: Callout › Size 11 › Font color Blue › Italic › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createStyle", values: { name: "Callout", size: 11, color: "#0070C0", italic: true } },
              requires: { selection: "p10" },
              selectHint: "Click the paragraph that begins “Tip:” first, so the new style is applied to it.",
            },
          ],
        },
      ],
    },
  ],

  "module-7::style-sets": [
    {
      id: "word-m7-style-sets-1",
      app: "word",
      title: "Give the board report a polished look",
      scenario:
        "The content of the quarterly board report is finished, but it looks like a first draft. Its headings already use heading styles, so a style set can restyle the whole report in one click. Try a few, settle on one, and save it for next quarter.",
      fileName: "Board Report - Q3.docx",
      minutes: 4,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Quarterly Report to the Board" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Third Quarter 2026" },
          { id: "p3", style: "Heading 1", text: "Highlights" },
          { id: "p4", text: "Patient visits rose 6 percent over the second quarter. Saturday hours now account for one visit in eight." },
          { id: "p5", style: "Heading 2", text: "Patient Satisfaction" },
          { id: "p6", text: "Ninety-four percent of surveyed patients rated their visit good or excellent, up from 91 percent." },
          { id: "p7", style: "Heading 1", text: "Finances" },
          { id: "p8", text: "Revenue was 3 percent above budget. Supply costs ran 5 percent over budget because of early flu season orders." },
          { id: "p9", style: "Heading 2", text: "Next Quarter" },
          { id: "p10", text: "We will add evening hours on Tuesdays and begin the diabetes prevention program in January." },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Lines (Stylish) style set.",
          hint: "Design tab › Document Formatting group › Style Set gallery › More arrow › Lines (Stylish).",
          steps: [{ action: { kind: "command", id: "design.styleSet", value: "Lines (Stylish)" } }],
        },
        {
          instruction: "Try the Centered style set instead.",
          hint: "Design tab › Style Set gallery › More arrow › Centered.",
          steps: [{ action: { kind: "command", id: "design.styleSet", value: "Centered" } }],
        },
        {
          instruction: "Reset the document to the default style set.",
          hint: "Design tab › Style Set gallery › More arrow › Reset to the Default Style Set.",
          steps: [{ action: { kind: "command", id: "design.styleSet", value: ["Reset to the Default Style Set", "Default"] } }],
        },
        {
          instruction: "Apply the Basic (Simple) style set as the final look.",
          hint: "Design tab › Style Set gallery › Basic (Simple).",
          steps: [{ action: { kind: "command", id: "design.styleSet", value: "Basic (Simple)" } }],
        },
        {
          instruction: "Change the paragraph spacing of the whole document to Relaxed.",
          hint: "Design tab › Document Formatting group › Paragraph Spacing › Relaxed.",
          steps: [{ action: { kind: "command", id: "design.paragraphSpacing", value: "Relaxed" } }],
        },
        {
          instruction: "Save the current look as a new style set named “Lakeside Board Reports”.",
          hint: "Design tab › Style Set gallery › More arrow › Save as a New Style Set… › File name: Lakeside Board Reports › Save.",
          steps: [{ action: { kind: "dialog", id: "saveStyleSet", values: { name: "Lakeside Board Reports" } } }],
        },
      ],
    },
  ],

  "module-7::using-themes": [
    {
      id: "word-m7-themes-1",
      app: "word",
      title: "Move the patient handout to the new brand palette",
      scenario:
        "Lakeside Medical Associates is adopting a new color palette and typeface. Headings that use theme colors will follow the change automatically; anything colored by hand will not. Fix the one hard-coded heading first, then switch the theme and save it for every future handout.",
      fileName: "Diabetes Prevention Handout.docx",
      minutes: 4,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Preventing Type 2 Diabetes" },
          { id: "p2", style: "Subtitle", text: "A program for patients of Lakeside Medical Associates" },
          { id: "p3", style: "Heading 1", text: "Who the Program Is For" },
          { id: "p4", text: "Adults with prediabetes, or with an A1C between 5.7 and 6.4 percent, can join at no cost." },
          { id: "p5", style: "Heading 1", text: "What You Will Do" },
          { id: "p6", text: "Meet with a lifestyle coach once a week for 16 weeks, then once a month for the rest of the year." },
          { id: "p7", style: "Heading 1", color: "#FF0000", text: "Questions?" },
          { id: "p8", text: "Call our diabetes educator, Marcus Bell, RN, at (718) 555-0142, extension 225." },
        ],
      },
      tasks: [
        {
          instruction: "The heading “Questions?” was colored with a fixed Red. Change its font color to Automatic so it follows the theme like the other headings.",
          hint: "Click the heading. Home tab › Font Color arrow › Automatic.",
          steps: [
            {
              action: { kind: "command", id: "home.fontColor", value: "Automatic" },
              alt: [{ kind: "dialog", id: "font", values: { color: "Automatic" } }],
              requires: { selection: "p7" },
              selectHint: "Click the heading “Questions?” first.",
            },
          ],
        },
        {
          instruction: "Apply the Ion theme.",
          hint: "Design tab › Document Formatting group › Themes › Ion.",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Ion" } }],
        },
        {
          instruction: "Change the theme colors to Blue Warm without changing the rest of the theme.",
          hint: "Design tab › Document Formatting group › Colors › Blue Warm.",
          steps: [{ action: { kind: "command", id: "design.colors", value: "Blue Warm" } }],
        },
        {
          instruction: "Change the theme fonts to Calibri for both headings and body text.",
          hint: "Design tab › Document Formatting group › Fonts › Calibri (Calibri / Calibri).",
          steps: [{ action: { kind: "command", id: "design.fonts", value: "Calibri" } }],
        },
        {
          instruction: "Change the theme effects to Subtle Solids.",
          hint: "Design tab › Document Formatting group › Effects › Subtle Solids.",
          steps: [{ action: { kind: "command", id: "design.effects", value: "Subtle Solids" } }],
        },
        {
          instruction: "Save the current theme as “Lakeside Brand” so every new handout can use it.",
          hint: "Design tab › Themes › Save Current Theme… › File name: Lakeside Brand › Save.",
          steps: [{ action: { kind: "dialog", id: "saveTheme", values: { name: "Lakeside Brand" } } }],
        },
      ],
    },
  ],

  "module-7::table-of-contents": [
    {
      id: "word-m7-toc-1",
      app: "word",
      title: "Add a contents list to the staff handbook",
      scenario:
        "The staff handbook is revised every quarter, and a hand-typed contents list would be wrong within a week. Finish the heading styles, generate an automatic table of contents, and keep it current after you add a new section.",
      fileName: "Staff Handbook.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Staff Handbook" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Revised October 2026" },
          { id: "p3", text: "" },
          { id: "p4", kind: "pageBreak" },
          { id: "p5", style: "Heading 1", text: "Welcome" },
          { id: "p6", text: "Welcome to the team. This handbook explains how we work together and how we care for our patients." },
          { id: "p7", bold: true, text: "Attendance and Scheduling" },
          { id: "p8", text: "Schedules are posted two weeks ahead. Call your supervisor at least two hours before your shift if you cannot work." },
          { id: "p9", bold: true, text: "Requesting Time Off" },
          { id: "p10", text: "Submit time-off requests in the scheduling app at least 14 days in advance." },
          { id: "p11", kind: "pageBreak" },
          { id: "p12", style: "Heading 1", text: "Patient Privacy" },
          { id: "p13", text: "Every employee completes privacy training in their first week and once a year after that." },
          { id: "p14", bold: true, text: "Dress Code" },
          { id: "p15", text: "Wear your name badge at all times. Clinical staff wear scrubs; front desk staff wear business casual clothing." },
          { id: "p16", text: "" },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Heading 1 style to “Attendance and Scheduling” and to “Dress Code”.",
          hint: "Click each heading, then Home tab › Styles gallery › Heading 1 (or Ctrl+Alt+1).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p7" }, selectHint: "Click “Attendance and Scheduling”, then apply Heading 1." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p14" }, selectHint: "Click “Dress Code”, then apply Heading 1." },
          ],
        },
        {
          instruction: "Apply the Heading 2 style to “Requesting Time Off”.",
          hint: "Click the heading. Home tab › Styles gallery › Heading 2 (or Ctrl+Alt+2).",
          steps: [{ action: { kind: "command", id: "home.style", value: "Heading 2" }, requires: { selection: "p9" }, selectHint: "Click “Requesting Time Off” first." }],
        },
        {
          instruction: "In the empty line below the subtitle, insert the Automatic Table 1 table of contents.",
          hint: "Click the empty line under the subtitle. References tab › Table of Contents group › Table of Contents › Automatic Table 1.",
          steps: [
            {
              action: { kind: "command", id: "references.toc", value: "Automatic Table 1" },
              requires: { selection: "p3" },
              selectHint: "Click the empty line just below the subtitle first.",
            },
          ],
        },
        {
          instruction: "Use the table of contents to jump to the “Patient Privacy” section.",
          hint: "Hold Ctrl and click “Patient Privacy” in the table of contents.",
          steps: [{ action: { kind: "click", target: "toc:p12" } }],
        },
        {
          instruction: "In the empty line at the end of the handbook, type “Remote Work” and apply the Heading 1 style to it.",
          hint: "Double-click the empty last line, type Remote Work, and press Enter. Then Home tab › Styles gallery › Heading 1.",
          steps: [
            { action: { kind: "type", target: "p16", value: "Remote Work" } },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p16" }, selectHint: "Click the new “Remote Work” line first." },
          ],
        },
        {
          instruction: "Update the entire table of contents so it lists the new section.",
          hint: "Click the table of contents. References tab › Table of Contents group › Update Table › Update entire table › OK. (Clicking Update Table… above the table or pressing F9 works too.)",
          steps: [
            {
              action: { kind: "dialog", id: "updateToc", values: { mode: "Update entire table" } },
              alt: [{ kind: "command", id: "references.updateToc" }],
            },
          ],
        },
        {
          instruction: "Open the Navigation pane and use it to jump to “Requesting Time Off”.",
          hint: "View tab › Show group › Navigation Pane (or Ctrl+F). Click “Requesting Time Off” in the Headings list.",
          steps: [
            { action: { kind: "command", id: "view.navPane" }, alt: [{ kind: "command", id: "home.find" }] },
            { action: { kind: "select", target: "p9" } },
          ],
        },
      ],
    },
  ],
};
