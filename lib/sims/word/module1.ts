import type { SimDefinition, WordPara } from "@/types/sim";

/** Word Module 1: Introduction to Word. Keys are `${moduleSlug}::${lessonSlug}`. */

const businessLetterTemplate: WordPara[] = [
  { id: "p1", bold: true, size: 14, runs: [{ id: "r1", text: "[Your Name]" }] },
  { id: "p2", text: "[Street Address], [City, ST ZIP Code]" },
  { id: "p3", runs: [{ id: "r1", text: "[Date]" }] },
  { id: "p4", runs: [{ id: "r1", text: "[Recipient Name]" }] },
  { id: "p5", text: "[Title], [Company Name]" },
  { id: "p6", runs: [{ text: "Dear " }, { id: "r1", text: "[Recipient Name]" }, { text: ":" }] },
  { id: "p7", text: "[To get started right away, just click any placeholder text (such as this) and start typing to replace it with your own.]" },
  { id: "p8", text: "Sincerely," },
  { id: "p9", runs: [{ id: "r1", text: "[Your Name]" }] },
];

const oldBillingPolicy: WordPara[] = [
  { id: "p1", style: "Title", text: "Billing and Payment Policy" },
  { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Adopted March 2016" },
  { id: "p3", style: "Heading 1", text: "Payment at the Time of Service" },
  { id: "p4", text: "Copayments are collected at check-in. Patients without insurance pay the self-pay rate before the visit." },
  { id: "p5", style: "Heading 1", text: "Statements" },
  { id: "p6", text: "Statements are mailed on the first business day of each month. Balances over 90 days old are reviewed by the billing supervisor." },
  { id: "p7", style: "Heading 1", text: "Questions" },
  { id: "p8", text: "Patients may call the billing office at (718) 555-0142, extension 230, Monday through Friday." },
];

export const wordModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::getting-started": [
    {
      id: "word-m1-getting-started-1",
      app: "word",
      title: "Find your way around the referral letter",
      scenario:
        "You are a new administrative assistant at Lakeside Medical Associates. Your supervisor wants the referral letter to Dr. Okafor checked before it goes out at four. Before you edit anything, set up the Word window so you can see what you are doing.",
      fileName: "Referral Letter - Okafor.docx",
      minutes: 4,
      initial: {
        paragraphs: [
          { id: "p1", bold: true, size: 16, color: "#1F4E79", spaceAfter: 0, text: "Lakeside Medical Associates" },
          { id: "p2", size: 9, color: "#595959", text: "418 Harbor Street, Suite 200 · Brooklyn, NY 11201 · (718) 555-0142" },
          { id: "p3", text: "October 20, 2026" },
          { id: "p4", spaceAfter: 0, text: "Dr. Amara Okafor, Cardiology" },
          { id: "p5", text: "Brooklyn Heart and Vascular Center, 92 Atlantic Avenue, Brooklyn, NY 11217" },
          { id: "p6", bold: true, text: "Re: Referral for Marcus Reyes, DOB 04/12/1961" },
          { id: "p7", text: "Dear Dr. Okafor:" },
          {
            id: "p8",
            text: "I am referring Mr. Reyes for evaluation of intermittent chest tightness on exertion and an abnormal resting ECG obtained in our office on October 16. His blood pressure has been elevated at his last three visits despite medication changes.",
          },
          { id: "p9", text: "Enclosed are his recent lab results, the ECG tracing, and a current medication list. Please contact our office if you need additional records." },
          { id: "p10", text: "Thank you for seeing him." },
          { id: "p11", text: "Sincerely," },
          { id: "p12", spaceAfter: 0, text: "Lena Ortiz, MD" },
          { id: "p13", text: "Lakeside Medical Associates" },
        ],
      },
      tasks: [
        {
          instruction: "Display the ruler.",
          hint: "View tab › Show group › Ruler.",
          steps: [{ action: { kind: "command", id: "view.ruler" } }],
        },
        {
          instruction: "Change the zoom level of the document to 120%.",
          hint: "View tab › Zoom group › Zoom › type 120 in the Percent box › OK. You can also drag the zoom slider at the right end of the status bar to 120%.",
          steps: [
            {
              action: { kind: "dialog", id: "zoom", values: { percent: 120 } },
              alt: [{ kind: "command", id: "view.zoom", value: "120" }],
            },
          ],
        },
        {
          instruction: "Display the word count statistics for the letter.",
          hint: "Click the word count on the status bar at the bottom left of the window (or Review tab › Proofing group › Word Count).",
          steps: [{ action: { kind: "command", id: "review.wordCount" } }],
        },
        {
          instruction: "Switch the document to Web Layout view.",
          hint: "View tab › Views group › Web Layout, or click the Web Layout button near the right end of the status bar.",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Web Layout" } }],
        },
        {
          instruction: "Proofread the letter in Read Mode, then return to Print Layout view.",
          hint: "View tab › Views group › Read Mode. To get back, press Esc, click Edit Document at the top of the screen, or click Print Layout on the status bar.",
          steps: [
            { action: { kind: "command", id: "view.mode", value: "Read Mode" } },
            { action: { kind: "command", id: "view.mode", value: "Print Layout" } },
          ],
        },
        {
          instruction: "Collapse the Ribbon so that only the tab names show, then restore the full Ribbon.",
          hint: "Press Ctrl+F1 (or click the small arrow at the far right end of the Ribbon). Press Ctrl+F1 again to bring the commands back.",
          steps: [
            { action: { kind: "command", id: "view.ribbonCollapse" } },
            { action: { kind: "command", id: "view.ribbonCollapse" } },
          ],
        },
        {
          instruction: "Add a plain page number at the bottom right of every page. If you can't find the command, use the Search box at the top of the window.",
          hint: "Click the Search box in the title bar (Alt+Q), type page number, and choose Page Number: Bottom of Page - Plain Number 3. The command lives on Insert tab › Header & Footer group › Page Number › Bottom of Page.",
          steps: [{ action: { kind: "command", id: "insert.pageNumber", value: "Bottom of Page - Plain Number 3" } }],
        },
      ],
    },
  ],

  "module-1::understanding-onedrive": [
    {
      id: "word-m1-onedrive-1",
      app: "word",
      title: "Keep the intake packet safe in OneDrive",
      scenario:
        "You built the new patient intake packet on the front-desk computer, and that computer's hard drive is being replaced tomorrow. The packet is a blank form with no patient information in it, so your supervisor has approved storing it in OneDrive. Move it there and set it up so the office manager can keep working on it.",
      fileName: "New Patient Intake Packet.docx",
      minutes: 4,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "New Patient Intake Packet" },
          { id: "p2", color: "#595959", runs: [{ text: "Lakeside Medical Associates · Form FD-01 · " }, { id: "r1", text: "Rev. 09/2026" }] },
          { id: "p3", style: "Heading 1", text: "Section 1: Patient Information" },
          { id: "p4", text: "Full legal name: ______________________________" },
          { id: "p5", text: "Date of birth: ____ / ____ / ________" },
          { id: "p6", text: "Phone: ____________________   Email: ____________________" },
          { id: "p7", style: "Heading 1", text: "Section 2: Insurance" },
          { id: "p8", text: "Insurance company: ______________________________" },
          { id: "p9", text: "Member ID: ____________________   Group number: ____________" },
          { id: "p10", style: "Heading 1", text: "Section 3: Consent" },
          { id: "p11", text: "I confirm that the information above is correct to the best of my knowledge." },
          { id: "p12", text: "Signature: ______________________________   Date: ____________" },
        ],
      },
      tasks: [
        {
          instruction: "Save the packet to OneDrive with the file name “New Patient Intake Packet - 2026”.",
          hint: "File tab › Save As › OneDrive - Personal › type the file name › Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "OneDrive - Personal", name: "New Patient Intake Packet - 2026" } } }],
        },
        {
          instruction: "Turn on AutoSave so every change is saved to the cloud automatically.",
          hint: "Click the AutoSave switch at the left end of the title bar so it shows On.",
          steps: [{ action: { kind: "command", id: "qat.autosave" } }],
        },
        {
          instruction: "Change the revision label “Rev. 09/2026” to “Rev. 10/2026”.",
          hint: "Double-click “Rev. 09/2026”, type Rev. 10/2026, and press Enter. With AutoSave on, there is nothing else to do: the change is saved.",
          steps: [{ action: { kind: "type", target: "p2.r1", value: "Rev. 10/2026" } }],
        },
        {
          instruction: "Open the version history to confirm that OneDrive is keeping the earlier versions of the packet.",
          hint: "File tab › Info › Version History.",
          steps: [{ action: { kind: "command", id: "file.versionHistory" } }],
        },
        {
          instruction: "Share the packet with the office manager, tmorales@lakesidemedical.example, so she can make changes to it.",
          hint: "File tab › Share › type the address › Permission: Can edit › Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "tmorales@lakesidemedical.example", permission: "Can edit" } } }],
        },
        {
          instruction: "Share the packet with the new front-desk trainee, dchen@lakesidemedical.example, so he can read it but not change it.",
          hint: "File tab › Share › type the address › Permission: Can view › Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "dchen@lakesidemedical.example", permission: "Can view" } } }],
        },
      ],
    },
  ],

  "module-1::creating-and-opening-documents": [
    {
      id: "word-m1-creating-opening-1",
      app: "word",
      title: "Start the referral letters from a template",
      scenario:
        "You have fourteen referral letters to send this week. Instead of building each one from a blank page, start from Word's Business letter template, save your version as a reusable template, and then deal with an old policy file that opens in Compatibility Mode.",
      fileName: "Document1.docx",
      minutes: 5,
      initial: { paragraphs: [{ id: "p1", text: "" }] },
      tasks: [
        {
          instruction: "Create a new document from the Business letter template.",
          hint: "File tab › New › Business letter. (Ctrl+N would give you a blank document instead.)",
          steps: [
            {
              action: { kind: "command", id: "file.new", value: "Business letter" },
              effects: [
                { op: "set", path: "paragraphs", value: businessLetterTemplate },
                { op: "set", path: "saved", value: { name: "Document2.docx" } },
              ],
            },
          ],
        },
        {
          instruction: "Replace the placeholder “[Your Name]” at the top of the letter with “Lakeside Medical Associates”.",
          hint: "Double-click the first “[Your Name]” placeholder, type Lakeside Medical Associates, and press Enter.",
          steps: [{ action: { kind: "type", target: "p1.r1", value: "Lakeside Medical Associates" } }],
        },
        {
          instruction: "In the greeting line, replace the placeholder “[Recipient Name]” with “Dr. Okafor”.",
          hint: "Double-click “[Recipient Name]” in the line that starts with Dear, type Dr. Okafor, and press Enter.",
          steps: [{ action: { kind: "type", target: "p6.r1", value: "Dr. Okafor" } }],
        },
        {
          instruction: "Save the letter as a Word Template named “Lakeside Referral Letter” so every future letter can start from it.",
          hint: "File tab › Save As › This PC › type Lakeside Referral Letter › File type: Word Template (*.dotx) › Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Lakeside Referral Letter", format: "Word Template (*.dotx)" } } }],
        },
        {
          instruction: "Open the recent file “Billing Policy 2016.doc”.",
          hint: "File tab › Open (or Home) › Recent › Billing Policy 2016.doc.",
          steps: [
            {
              action: { kind: "command", id: "file.open", value: "Billing Policy 2016.doc" },
              effects: [
                { op: "set", path: "paragraphs", value: oldBillingPolicy },
                { op: "set", path: "saved", value: { name: "Billing Policy 2016.doc [Compatibility Mode]", location: "This PC", format: "Word 97-2003 Document (*.doc)" } },
              ],
            },
          ],
        },
        {
          instruction: "The policy opened in Compatibility Mode. Convert it to the current Word format by saving it as a Word Document (.docx) named “Billing Policy 2016”.",
          hint: "File tab › Save As › This PC › keep the name Billing Policy 2016 › File type: Word Document (*.docx) › Save. (In Microsoft 365 you can also use File › Info › Convert.)",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Billing Policy 2016", format: "Word Document (*.docx)" } } }],
        },
      ],
    },
  ],

  "module-1::saving-and-sharing-documents": [
    {
      id: "word-m1-saving-sharing-1",
      app: "word",
      title: "Reuse last month's appeal letter without losing it",
      scenario:
        "Your supervisor asks you to turn last month's insurance appeal letter into a new appeal for a different patient. The original must stay untouched in case the first appeal is questioned, and the insurer should receive a PDF it cannot edit.",
      fileName: "Appeal Letter - Whitaker - 2026-09.docx",
      minutes: 5,
      initial: {
        saved: { name: "Appeal Letter - Whitaker - 2026-09.docx", location: "This PC" },
        paragraphs: [
          { id: "p1", bold: true, size: 14, color: "#1F4E79", spaceAfter: 0, text: "Lakeside Medical Associates" },
          { id: "p2", size: 9, color: "#595959", text: "Billing Office · 418 Harbor Street, Suite 200 · Brooklyn, NY 11201" },
          { id: "p3", runs: [{ id: "r1", text: "September 18, 2026" }] },
          { id: "p4", text: "Appeals Department, Empire Shield Health Plan, P.O. Box 4410, Albany, NY 12204" },
          { id: "p5", bold: true, runs: [{ text: "Re: Appeal of denied claim " }, { id: "r1", text: "#4471-2209" }, { text: " for patient " }, { id: "r2", text: "Daniel Whitaker" }] },
          { id: "p6", text: "To the Appeals Department:" },
          {
            id: "p7",
            runs: [
              { text: "We are writing to appeal the denial of the claim above for an office visit on " },
              { id: "r1", text: "August 27, 2026" },
              { text: ". The visit was medically necessary, and the enclosed notes document the patient's symptoms and the provider's assessment." },
            ],
          },
          { id: "p8", text: "Please review the enclosed records and reconsider the claim. You can reach our billing office at (718) 555-0142, extension 230." },
          { id: "p9", text: "Sincerely," },
          { id: "p10", text: "Karen Patel, Billing Supervisor" },
        ],
      },
      tasks: [
        {
          instruction: "Before you change anything, save a copy of the letter in This PC with the name “Appeal Letter - Ramirez - 2026-10”.",
          hint: "File tab › Save As (or press F12) › This PC › change the file name › Save. Save As creates a new file and leaves the original alone.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "This PC", name: "Appeal Letter - Ramirez - 2026-10" } } }],
        },
        {
          instruction: "Change the patient name “Daniel Whitaker” to “Rosa Ramirez”.",
          hint: "Double-click “Daniel Whitaker” in the Re: line, type Rosa Ramirez, and press Enter.",
          steps: [{ action: { kind: "type", target: "p5.r2", value: "Rosa Ramirez" } }],
        },
        {
          instruction: "Change the claim number “#4471-2209” to “#5108-3374” and the visit date “August 27, 2026” to “October 2, 2026”.",
          hint: "Double-click each one, type the new text, and press Enter. The claim number is in the Re: line; the visit date is in the first paragraph of the letter.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "p5.r1", value: "#5108-3374" } },
            { action: { kind: "type", target: "p7.r1", value: "October 2, 2026" } },
          ],
        },
        {
          instruction: "Save your changes to the new file.",
          hint: "Press Ctrl+S, click Save on the title bar, or File tab › Save. This time Save is the right choice: you are updating the new copy, not the original.",
          steps: [{ action: { kind: "command", id: "file.save" } }],
        },
        {
          instruction: "Export the letter as a PDF named “Appeal Letter - Ramirez - 2026-10” to send to the insurer.",
          hint: "File tab › Export › Create PDF/XPS Document › Create PDF/XPS. (Save As with the PDF file type also works.)",
          steps: [
            {
              action: { kind: "dialog", id: "file.exportPdf", values: { name: "Appeal Letter - Ramirez - 2026-10" } },
              alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Appeal Letter - Ramirez - 2026-10", format: "PDF (*.pdf)" } }],
            },
          ],
        },
        {
          instruction: "Check how often Word saves AutoRecover information by opening the Save settings in Word Options.",
          hint: "File tab › Options › Save.",
          steps: [{ action: { kind: "command", id: "file.options", value: "Save" } }],
        },
        {
          instruction: "Share the letter with the billing supervisor, kpatel@lakesidemedical.example, with permission to view it only.",
          hint: "File tab › Share › type the address › Permission: Can view › Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "kpatel@lakesidemedical.example", permission: "Can view" } } }],
        },
      ],
    },
  ],
};
