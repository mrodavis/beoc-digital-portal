import type { SimDefinition } from "@/types/sim";

/** Word Module 8: Office 365 and More (Word for the web, co-authoring, research, dictation, accessibility). */

function anyCell(id: string, rows: number, cols: number): string[] {
  const out = [`${id}.r0c0`];
  for (let r = 1; r <= rows; r++) {
    out.push(`${id}.r${r}c0`);
    for (let c = 1; c <= cols; c++) out.push(`${id}.r${r}c${c}`);
  }
  for (let c = 1; c <= cols; c++) out.push(`${id}.r0c${c}`);
  return out;
}

export const wordModule8Sims: Record<string, SimDefinition[]> = {
  "module-8::using-word-online": [
    {
      id: "word-m8-word-online-1",
      app: "word",
      title: "Fix a handout from a shared workstation",
      scenario:
        "You are covering reception at a shared workstation with no Office installed, so you open the parking handout in Word for the web. Its Ribbon is simpler than the desktop app's, but every command in this practice sits on the same tab and in the same group in both.",
      fileName: "Parking and Directions.docx",
      minutes: 5,
      initial: {
        saved: { name: "Parking and Directions.docx", location: "OneDrive - Personal", autosave: true },
        paragraphs: [
          { id: "p1", style: "Title", text: "Parking and Directions" },
          { id: "p2", bold: true, text: "Where to Park" },
          { id: "p3", runs: [{ text: "Free parking is available in the lot behind the building. Enter from " }, { id: "r1", text: "Pine Steet" }, { text: ", next to the pharmacy." }] },
          { id: "p4", text: "Accessible spaces are next to the side entrance. Ask the front desk for a parking validation if you use the garage on Harbor Street." },
          { id: "p5", bold: true, text: "By Bus or Subway" },
          { id: "p6", text: "The B41 bus stops at Harbor Street and Pine Street. The nearest subway station is Harbor Street on the F and G lines, a five-minute walk." },
          { id: "p7", italic: true, text: "Questions? Call the front desk at (718) 555-0142." },
        ],
      },
      tasks: [
        {
          instruction: "Fix the typo “Pine Steet” so it reads “Pine Street”.",
          hint: "Double-click “Pine Steet” to select it, type Pine Street to replace it, and press Enter. Word for the web saves the change automatically.",
          steps: [{ action: { kind: "type", target: "p3.r1", value: "Pine Street" } }],
        },
        {
          instruction: "Apply the Heading 1 style to “Where to Park”.",
          hint: "Click “Where to Park”. Home tab › Styles › Heading 1.",
          steps: [{ action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p2" }, selectHint: "Click “Where to Park” first." }],
        },
        {
          instruction: "Check how the handout reads in Reading view (Read Mode), then switch back to editing in Print Layout.",
          hint: "View tab › Views › Read Mode. To return, press Esc or click Edit Document. (In Word for the web: View › Reading View, then Edit Document.)",
          steps: [
            { action: { kind: "command", id: "view.mode", value: "Read Mode" } },
            { action: { kind: "command", id: "view.mode", value: "Print Layout" } },
          ],
        },
        {
          instruction: "Create a new blank document for the Saturday flu clinic notice.",
          hint: "File tab › New › Blank document (or Ctrl+N).",
          steps: [
            {
              action: { kind: "command", id: "file.new", value: "Blank document" },
              effects: [
                { op: "set", path: "paragraphs", value: [{ id: "p1", text: "" }, { id: "p2", text: "" }] },
                { op: "set", path: "saved", value: { name: "Document1.docx", location: "OneDrive - Personal", autosave: true } },
              ],
            },
          ],
        },
        {
          instruction: "On the first line, type “Saturday Flu Clinic” and apply the Heading 1 style to it.",
          hint: "Double-click the first line (or click it and start typing), type the text, and press Enter. Then Home tab › Styles › Heading 1.",
          steps: [
            { action: { kind: "type", target: "p1", value: "Saturday Flu Clinic" } },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p1" }, selectHint: "Click the line “Saturday Flu Clinic” first." },
          ],
        },
        {
          instruction: "On the second line, type “Walk-in flu shots every Saturday in November, 9:00 AM to 1:00 PM.”",
          hint: "Click the second line, type the sentence, and press Enter.",
          steps: [{ action: { kind: "type", target: "p2", value: "Walk-in flu shots every Saturday in November, 9:00 AM to 1:00 PM." } }],
        },
        {
          instruction: "Save the new notice to OneDrive with the name “Saturday Flu Clinic”.",
          hint: "File tab › Save As › OneDrive - Personal › File name: Saturday Flu Clinic › Save. (In Word for the web: File › Save As › Rename.)",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "OneDrive - Personal", name: "Saturday Flu Clinic" } } }],
        },
      ],
    },
  ],

  "module-8::co-authoring-in-word": [
    {
      id: "word-m8-coauthoring-1",
      app: "word",
      title: "Revise the intake form together",
      scenario:
        "You and the nurse manager, Tasha Morales, keep emailing versions of the intake form back and forth, and nobody is sure which copy is current. Move the form to OneDrive and work in one shared file instead.",
      fileName: "Patient Intake Form v4.docx",
      minutes: 5,
      initial: {
        saved: { name: "Patient Intake Form v4.docx", location: "This PC" },
        paragraphs: [
          { id: "p1", style: "Title", text: "Patient Intake Form" },
          { id: "p2", style: "Heading 1", text: "Contact Information" },
          { id: "p3", text: "Preferred phone number: ____________   OK to leave a message?  Yes / No" },
          { id: "p4", text: "Emergency contacts (two): ______________________   ______________________" },
          { id: "p5", style: "Heading 1", text: "Medical History" },
          {
            id: "p6",
            text: "List any allergies to medications, foods, or latex: ______________________",
            comment: { author: "Tasha Morales", text: "Can we add a checkbox for “No known allergies”? Patients leave this blank and we can't tell why." },
          },
          { id: "p7", text: "Have you been hospitalized in the past 12 months?  Yes / No" },
          { id: "p8", style: "Heading 1", text: "Signature" },
          { id: "p9", text: "Signature of patient or legal guardian: ______________________   Date: ________" },
        ],
      },
      tasks: [
        {
          instruction: "Co-authoring needs the file in the cloud. Save the form to OneDrive with the name “Patient Intake Form”.",
          hint: "File tab › Save As › OneDrive - Personal › File name: Patient Intake Form › Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "OneDrive - Personal", name: "Patient Intake Form" } } }],
        },
        {
          instruction: "Turn on AutoSave so both of you always see the latest version.",
          hint: "Click the AutoSave switch at the left end of the title bar.",
          steps: [{ action: { kind: "command", id: "qat.autosave" } }],
        },
        {
          instruction: "Share the form with Tasha Morales, tmorales@lakesidemedical.example, so she can edit it with you.",
          hint: "File tab › Share › type the address › Permission: Can edit › Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "tmorales@lakesidemedical.example", permission: "Can edit" } } }],
        },
        {
          instruction: "Share the form with the billing supervisor, kpatel@lakesidemedical.example, who only needs to read it.",
          hint: "File tab › Share › type the address › Permission: Can view › Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "kpatel@lakesidemedical.example", permission: "Can view" } } }],
        },
        {
          instruction: "Reply to Tasha's comment about allergies with “Good idea. I added the checkbox below the allergy line.”",
          hint: "Click Tasha's comment card in the margin, type the reply in its Reply box, and press Enter.",
          steps: [
            {
              action: { kind: "command", id: "comment.reply", value: "Good idea. I added the checkbox below the allergy line." },
              requires: { selection: "p6" },
              selectHint: "Click Tasha's comment about allergies first.",
            },
          ],
        },
        {
          instruction: "Add a comment to the hospitalization question that says “@Tasha Morales should this cover emergency room visits too?”",
          hint: "Click the hospitalization question. Review tab › Comments group › New Comment (Ctrl+Alt+M) › type the comment › Post. Typing @ and a name notifies that person.",
          steps: [
            {
              action: { kind: "dialog", id: "newComment", values: { text: "@Tasha Morales should this cover emergency room visits too?" } },
              requires: { selection: "p7" },
              selectHint: "Click the question that begins “Have you been hospitalized” first.",
            },
          ],
        },
        {
          instruction: "Open the version history to see the earlier versions saved while you and Tasha worked.",
          hint: "File tab › Info › Version History.",
          steps: [{ action: { kind: "command", id: "file.versionHistory" } }],
        },
      ],
    },
  ],

  "module-8::smart-lookup-and-researcher": [
    {
      id: "word-m8-research-1",
      app: "word",
      title: "Back up the blood pressure handout with sources",
      scenario:
        "You are drafting a patient education handout on high blood pressure. You need a quick definition for yourself and citable sources for two claims. Researcher will offer several sources; only some are appropriate for material patients will rely on.",
      fileName: "Understanding High Blood Pressure.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Understanding High Blood Pressure" },
          { id: "p2", runs: [{ text: "High blood pressure, also called " }, { id: "r1", text: "hypertension" }, { text: ", often has no symptoms. That is why regular checks matter." }] },
          { id: "p3", style: "Heading 1", text: "What the Numbers Mean" },
          { id: "p4", text: "A blood pressure reading has two numbers. The top number is the pressure when your heart beats; the bottom number is the pressure between beats." },
          { id: "p5", runs: [{ id: "r1", text: "For most adults, a reading of 130/80 or higher is considered high blood pressure." }] },
          { id: "p6", style: "Heading 1", text: "Checking at Home" },
          { id: "p7", runs: [{ id: "r1", text: "Blood pressure readings taken at home at the same time each day give a more reliable picture than a single office reading." }] },
          { id: "p8", text: "" },
        ],
      },
      tasks: [
        {
          instruction: "Look up the word “hypertension” without leaving the document.",
          hint: "Right-click “hypertension” › Search (or select it, then References tab › Research group › Search). The definition opens in a pane.",
          steps: [
            {
              action: { kind: "command", id: "review.smartLookup" },
              alt: [{ kind: "command", id: "references.smartLookup" }],
              requires: { selection: "p2.r1" },
              selectHint: "Click the word “hypertension” first.",
            },
          ],
        },
        {
          instruction: "Set the citation style to APA.",
          hint: "References tab › Citations & Bibliography group › Style › APA.",
          steps: [{ action: { kind: "command", id: "references.citationStyle", value: "APA" } }],
        },
        {
          instruction: "Open the Researcher pane so you can look for sources on high blood pressure.",
          hint: "References tab › Research group › Researcher.",
          steps: [{ action: { kind: "command", id: "references.researcher" } }],
        },
        {
          instruction: "Cite the National Health Education Institute source “Understanding High Blood Pressure” after the sentence that begins “For most adults”.",
          hint: "Click the sentence that begins “For most adults”. In the Researcher pane, click + (Add and cite) next to Understanding High Blood Pressure.",
          steps: [
            {
              action: { kind: "command", id: "researcher.add", value: "Understanding High Blood Pressure" },
              requires: { selection: ["p5.r1", "p5"] },
              selectHint: "Click the sentence that begins “For most adults” first, so the citation goes after it.",
            },
          ],
        },
        {
          instruction: "Cite the journal article about home monitoring after the sentence that begins “Blood pressure readings taken at home”. Do not cite the blog that promises a cure in 7 days.",
          hint: "Click the sentence that begins “Blood pressure readings taken at home”. In Researcher, click + next to Home Blood Pressure Monitoring in Adults: A Review.",
          steps: [
            {
              action: { kind: "command", id: "researcher.add", value: "Home Blood Pressure Monitoring in Adults: A Review" },
              requires: { selection: ["p7.r1", "p7"] },
              selectHint: "Click the sentence about home readings first.",
            },
          ],
        },
        {
          instruction: "In the empty line at the end of the handout, insert a Bibliography.",
          hint: "Click the empty last line. References tab › Citations & Bibliography group › Bibliography › Bibliography.",
          steps: [
            {
              action: { kind: "command", id: "references.bibliography", value: "Bibliography" },
              requires: { selection: "p8" },
              selectHint: "Click the empty line at the end of the handout first.",
            },
          ],
        },
      ],
    },
  ],

  "module-8::dictation-and-voice": [
    {
      id: "word-m8-dictation-1",
      app: "word",
      title: "Dictate the end-of-day front desk summary",
      scenario:
        "It is after closing and the waiting room is empty, so you can speak without anyone overhearing. Use Dictate to draft the end-of-day summary for the office manager. In this practice, type what you would say into the Dictation box; Word turns spoken punctuation into symbols, just as it does with your voice.",
      fileName: "Front Desk Summary - Oct 20.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Front Desk Summary" },
          { id: "p2", text: "Tuesday, October 20, 2026 · For Tasha Morales, Office Manager" },
          { id: "p3", style: "Heading 1", text: "Today" },
          { id: "p4", text: "" },
          { id: "p5", text: "" },
          { id: "p6", style: "Heading 1", text: "Notes" },
          { id: "p7", runs: [{ text: "The printer in room 2 needs a new toner cartridge, and the " }, { id: "r1", text: "flew" }, { text: " shot sign-up sheet for Saturday is full." }] },
        ],
      },
      tasks: [
        {
          instruction: "Start dictating in the empty line under “Today”.",
          hint: "Click the empty line under Today. Home tab › Voice group › Dictate (or press Alt+`).",
          steps: [
            {
              action: { kind: "command", id: "home.dictate" },
              requires: { selection: "p4" },
              selectHint: "Click the empty line under the heading “Today” first, so the words go there.",
            },
          ],
        },
        {
          instruction: "Dictate the sentence “We checked in 42 patients today, and two walk-ins were seen.” Speak the punctuation.",
          hint: "In the Dictation box, say (type): we checked in 42 patients today comma and two walk-ins were seen period. Then press Enter.",
          steps: [{ action: { kind: "type", target: "p4", value: "We checked in 42 patients today, and two walk-ins were seen." } }],
        },
        {
          instruction: "In the next empty line, dictate the question “Can we order more intake forms?”",
          hint: "Click the empty line below the first sentence, then say (type): can we order more intake forms question mark. Press Enter.",
          steps: [{ action: { kind: "type", target: "p5", value: "Can we order more intake forms?" } }],
        },
        {
          instruction: "Stop dictation.",
          hint: "Click Stop dictation in the Dictation pane, or click Dictate on the Home tab again.",
          steps: [{ action: { kind: "command", id: "home.dictate" }, alt: [{ kind: "command", id: "pane.close" }] }],
        },
        {
          instruction: "Dictate heard “flew” instead of “flu” in the Notes section. Correct the word by typing.",
          hint: "Double-click “flew” to select it, type flu to replace it, and press Enter.",
          steps: [{ action: { kind: "type", target: "p7.r1", value: "flu" } }],
        },
        {
          instruction: "A coworker will dictate the Spanish version of tomorrow's parking notice on this computer. Set the dictation language to Spanish (Mexico).",
          hint: "Home tab › Voice group › Dictate arrow › Spanish (Mexico).",
          steps: [{ action: { kind: "command", id: "home.dictateLanguage", value: "Spanish (Mexico)" } }],
        },
        {
          instruction: "Have Word read the summary aloud so you can proofread it by ear.",
          hint: "Review tab › Speech group › Read Aloud.",
          steps: [{ action: { kind: "command", id: "review.readAloud" } }],
        },
      ],
    },
  ],

  "module-8::accessibility-features": [
    {
      id: "word-m8-accessibility-1",
      app: "word",
      title: "Make the new patient handbook screen-reader ready",
      scenario:
        "A patient with low vision asked for the new patient handbook in a form their screen reader can use. Right now it announces “image” with no description, skips a heading level, reads the hours table with no headers, and has a link called “click here”. Fix it, then prove it with the checker.",
      fileName: "New Patient Handbook.docx",
      minutes: 7,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "New Patient Handbook" },
          { id: "p2", style: "Heading 1", text: "Welcome" },
          { id: "p3", text: "Welcome to Lakeside Medical Associates. Check in at the front desk when you arrive; the check-in window is on your left as you enter." },
          { id: "img1", kind: "image", object: { label: "clinic-front-desk.jpg", glyph: "🏥", wrap: "inline", width: 45 } },
          { id: "p4", style: "Heading 1", text: "When We Are Busiest" },
          {
            id: "ch1",
            kind: "chart",
            chart: {
              type: "Clustered Column",
              title: "Appointments per Month",
              series: [
                { label: "Jan", value: 320 },
                { label: "Feb", value: 345 },
                { label: "Mar", value: 390 },
                { label: "Apr", value: 410 },
                { label: "May", value: 455 },
                { label: "Jun", value: 480 },
              ],
            },
          },
          { id: "img2", kind: "image", object: { label: "decorative-divider.png", glyph: "〰️", wrap: "inline", width: 60 } },
          { id: "p5", style: "Heading 3", text: "Office Hours" },
          {
            id: "tbl1",
            kind: "table",
            table: {
              style: "Grid Table 4 - Accent 1",
              headerRow: false,
              rows: [
                ["Day", "Opens", "Closes"],
                ["Monday to Friday", "8:00 AM", "6:00 PM"],
                ["Saturday", "9:00 AM", "1:00 PM"],
              ],
            },
          },
          { id: "p6", style: "Heading 1", text: "More Information" },
          { id: "p7", runs: [{ text: "Getting here: " }, { id: "r1", text: "click here", link: "https://www.lakesidemedical.example/directions" }] },
        ],
      },
      tasks: [
        {
          instruction: "Check the handbook for accessibility issues.",
          hint: "Review tab › Accessibility group › Check Accessibility (or File tab › Info › Check for Issues › Check Accessibility).",
          steps: [{ action: { kind: "command", id: "review.accessibility" }, alt: [{ kind: "command", id: "file.inspect", value: "Check Accessibility" }] }],
        },
        {
          instruction: "Add the alt text “Front desk at Lakeside Medical Associates, with the check-in window on the left” to the front desk photo.",
          hint: "Right-click the photo › Edit Alt Text… (or Picture Format tab › Alt Text) › type the description › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "altText", values: { text: "Front desk at Lakeside Medical Associates, with the check-in window on the left" } },
              requires: { selection: "img1" },
              selectHint: "Click the front desk photo first.",
            },
          ],
        },
        {
          instruction: "Add alt text to the chart that states what it shows: “Column chart showing appointments rising from 320 in January to 480 in June.”",
          hint: "Right-click the chart › Edit Alt Text… › type the description › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "altText", values: { text: "Column chart showing appointments rising from 320 in January to 480 in June." } },
              requires: { selection: "ch1" },
              selectHint: "Click the chart first.",
            },
          ],
        },
        {
          instruction: "The wavy divider below the chart is only decoration. Mark it as decorative.",
          hint: "Right-click the divider › Edit Alt Text… › check Mark as decorative › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "altText", values: { decorative: true } },
              requires: { selection: "img2" },
              selectHint: "Click the wavy divider picture first.",
            },
          ],
        },
        {
          instruction: "The heading “Office Hours” skips from Heading 1 to Heading 3. Change it to Heading 2.",
          hint: "Click the heading. Home tab › Styles gallery › Heading 2 (or Ctrl+Alt+2).",
          steps: [{ action: { kind: "command", id: "home.style", value: "Heading 2" }, requires: { selection: "p5" }, selectHint: "Click the heading “Office Hours” first." }],
        },
        {
          instruction: "Mark the first row of the office hours table as a header row.",
          hint: "Click in the table. Table Design tab › Table Style Options group › check Header Row.",
          steps: [
            {
              action: { kind: "command", id: "table.headerRow" },
              alt: [{ kind: "command", id: "table.repeatHeader" }],
              requires: { selection: anyCell("tbl1", 3, 3) },
              selectHint: "Click anywhere in the office hours table first.",
            },
          ],
        },
        {
          instruction: "Change the link text “click here” to “directions and parking map” so it makes sense when read on its own.",
          hint: "Right-click “click here” › Edit Hyperlink… › Text to display: directions and parking map › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "link", values: { text: "directions and parking map" } },
              alt: [{ kind: "type", target: "p7.r1", value: "directions and parking map" }],
              requires: { selection: "p7.r1" },
              selectHint: "Click the link “click here” first.",
            },
          ],
        },
        {
          instruction: "Check the handbook for accessibility issues again to confirm that none are left.",
          hint: "Review tab › Accessibility group › Check Accessibility.",
          steps: [{ action: { kind: "command", id: "review.accessibility" }, alt: [{ kind: "command", id: "file.inspect", value: "Check Accessibility" }] }],
        },
      ],
    },
  ],
};
