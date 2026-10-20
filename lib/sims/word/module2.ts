import type { SimDefinition, WordPara } from "@/types/sim";

/** Word Module 2: Basic Formatting. Keys are `${moduleSlug}::${lessonSlug}`. */
export const wordModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::text-basics": [
    {
      id: "word-m2-text-basics-1",
      app: "word",
      title: "Assemble the home blood pressure handout",
      scenario:
        "A nurse at Lakeside Medical Associates drafted a handout on checking blood pressure at home. One sentence is in the wrong section, and the manufacturer's cuff instructions were pasted at the bottom straight from a website, gray background and all. Put everything where it belongs.",
      fileName: "Home Blood Pressure Handout.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Checking Your Blood Pressure at Home" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Patient Handout" },
          { id: "p3", style: "Heading 1", text: "Before You Measure" },
          { id: "p4", text: "Sit quietly for five minutes with your back supported and your feet flat on the floor." },
          { id: "p5", text: "Do not drink coffee, smoke, or exercise for 30 minutes before a reading." },
          { id: "p6", style: "Heading 1", text: "Taking a Reading" },
          {
            id: "p7",
            runs: [
              { text: "Wrap the cuff of your " },
              { id: "r1", text: "VitalTrack Home Monitor" },
              { text: " around your bare upper arm, one inch above the elbow." },
            ],
          },
          { id: "p8", text: "Rest your arm on a table at heart level and press Start. Stay still and quiet until the reading appears." },
          { id: "p9", text: "Write down each reading with the date and time, and bring your log to every visit." },
          { id: "p10", style: "Heading 1", text: "Keeping a Log" },
          { id: "p11", text: "Take two readings, one minute apart, every morning and every evening." },
          { id: "p12", style: "Heading 1", text: "When to Call Us" },
          { id: "p13", text: "Call the office at (718) 555-0142 if a reading is above 180/120, or if you have chest pain, shortness of breath, or a severe headache." },
          { id: "p14", italic: true, color: "#C00000", text: "NOTE FROM NURSE: move the manufacturer's cuff instructions below into Before You Measure, then delete this note." },
          {
            id: "p15",
            font: "Arial",
            size: 14,
            color: "#1F3864",
            shading: "#E7E6E6",
            text: "Use the cuff size printed on your arm band. A cuff that is too small can make a reading look higher than it really is.",
          },
        ],
      },
      tasks: [
        {
          instruction: "Move the paragraph that begins “Write down each reading” so it becomes the last paragraph of the Keeping a Log section.",
          hint: "Click the paragraph and cut it (Home tab › Clipboard › Cut, or Ctrl+X). Then click at the start of the heading “When to Call Us” and paste (Ctrl+V).",
          steps: [
            {
              action: { kind: "command", id: "home.cut" },
              requires: { selection: "p9" },
              selectHint: "Click the paragraph that begins “Write down each reading” first.",
            },
            {
              action: { kind: "command", id: "home.paste" },
              requires: { selection: "p12" },
              selectHint: "Click at the start of the heading “When to Call Us”, then paste. The paragraph lands just above it.",
            },
          ],
        },
        {
          instruction: "Move the manufacturer's cuff instructions (the paragraph with the gray background) to the end of the Before You Measure section, keeping only the text and not the website formatting.",
          hint: "Cut the gray paragraph (Ctrl+X). Click at the start of the heading “Taking a Reading”, then Home tab › Paste arrow › Keep Text Only (or press Ctrl+Shift+V, or right-click › Paste: Keep Text Only).",
          steps: [
            {
              action: { kind: "command", id: "home.cut" },
              requires: { selection: "p15" },
              selectHint: "Click the gray paragraph that begins “Use the cuff size” first.",
            },
            {
              action: { kind: "command", id: "home.paste", value: "Keep Text Only" },
              requires: { selection: "p6" },
              selectHint: "Click at the start of the heading “Taking a Reading”, then paste with Keep Text Only.",
            },
          ],
        },
        {
          instruction: "Delete the nurse's note that begins “NOTE FROM NURSE”.",
          hint: "Click the red note and press Delete.",
          steps: [
            {
              action: { kind: "command", id: "edit.delete" },
              alt: [{ kind: "command", id: "home.cut" }],
              requires: { selection: "p14" },
              selectHint: "Click the red note that begins “NOTE FROM NURSE” first.",
            },
          ],
        },
        {
          instruction: "Insert the trademark symbol (™) immediately after “VitalTrack Home Monitor”.",
          hint: "Click “VitalTrack Home Monitor” to put the insertion point after it. Insert tab › Symbols group › Symbol › ™.",
          steps: [
            {
              action: { kind: "command", id: "insert.symbol", value: "™" },
              alt: [{ kind: "dialog", id: "symbol", values: { symbol: "™" } }],
              requires: { selection: "p7.r1" },
              selectHint: "Click the words “VitalTrack Home Monitor” first.",
            },
          ],
        },
        {
          instruction: "Patients should see the emergency line first. Copy the paragraph that begins “Call the office at” and paste the copy directly below the subtitle.",
          hint: "Click the paragraph and copy it (Ctrl+C). Click at the start of the heading “Before You Measure” and paste (Ctrl+V).",
          steps: [
            {
              action: { kind: "command", id: "home.copy" },
              requires: { selection: "p13" },
              selectHint: "Click the paragraph that begins “Call the office at” first.",
            },
            {
              action: { kind: "command", id: "home.paste" },
              requires: { selection: "p3" },
              selectHint: "Click at the start of the heading “Before You Measure”, then paste.",
            },
          ],
        },
      ],
    },
  ],

  "module-2::formatting-text": [
    {
      id: "word-m2-formatting-text-1",
      app: "word",
      title: "Make the discharge instructions impossible to miss",
      scenario:
        "You are finishing a discharge instruction sheet at Lakeside Medical Associates. Two instructions matter more than anything else on the page, and right now they look like everything else.",
      fileName: "Discharge Instructions.docx",
      minutes: 4,
      initial: {
        paragraphs: [
          { id: "p1", text: "Discharge Instructions" },
          { id: "p2", text: "Patient: Maria Lopez    Visit date: October 20, 2026" },
          {
            id: "p3",
            runs: [
              { text: "Take your new medication twice a day. " },
              { id: "r1", text: "Always take it with food." },
              { text: " Do not skip doses, even if you feel better." },
            ],
          },
          {
            id: "p4",
            runs: [
              { text: "Rest for two days and drink plenty of fluids. " },
              { id: "r1", text: "Call us right away if your fever goes above 101°F." },
            ],
          },
          { id: "p5", text: "Lakeside Medical Associates · (718) 555-0142" },
        ],
      },
      tasks: [
        {
          instruction: "Change the font size of the title “Discharge Instructions” to 18.",
          hint: "Click the title to select it. Home tab › Font group › Font Size box › 18.",
          steps: [{ action: { kind: "command", id: "home.fontSize", value: "18" }, requires: { selection: "p1" }, selectHint: "Select the title first: click on “Discharge Instructions.”" }],
        },
        {
          instruction: "Center the title.",
          hint: "With the title selected: Home tab › Paragraph group › Center (or press Ctrl+E).",
          steps: [{ action: { kind: "command", id: "home.alignCenter" }, requires: { selection: "p1" }, selectHint: "Select the title first." }],
        },
        {
          instruction: "Bold the sentence “Always take it with food.”",
          hint: "Click the sentence “Always take it with food.” to select it. Home tab › Font group › Bold (or Ctrl+B).",
          steps: [{ action: { kind: "command", id: "home.bold" }, requires: { selection: "p3.r1" }, selectHint: "Select just the sentence “Always take it with food.” by clicking it." }],
        },
        {
          instruction: "Change the font color of “Call us right away if your fever goes above 101°F.” to Dark Red.",
          hint: "Click the sentence to select it. Home tab › Font Color arrow › Standard Colors › Dark Red.",
          steps: [{ action: { kind: "command", id: "home.fontColor", value: "#C00000" }, requires: { selection: "p4.r1" }, selectHint: "Select the fever sentence first." }],
        },
        {
          instruction: "Copy the formatting of “Always take it with food.” to the fever sentence with Format Painter.",
          hint: "Select “Always take it with food.”, click Home › Clipboard › Format Painter, then click the fever sentence.",
          steps: [
            { action: { kind: "command", id: "home.formatPainter" }, requires: { selection: "p3.r1" }, selectHint: "Start from the bold sentence: select “Always take it with food.” first." },
            { action: { kind: "command", id: "home.formatPainter.apply" }, requires: { selection: "p4.r1" }, selectHint: "After Format Painter, click the fever sentence." },
          ],
        },
        {
          instruction: "Change the font of the last line, the clinic phone line, to Arial.",
          hint: "Click the last line. Home tab › Font box › Arial.",
          steps: [{ action: { kind: "command", id: "home.fontName", value: "Arial" }, requires: { selection: "p5" }, selectHint: "Select the clinic phone line first." }],
        },
      ],
    },
    {
      id: "word-m2-formatting-text-2",
      app: "word",
      title: "Polish the flu shot clinic flyer",
      scenario:
        "The front desk is posting a flyer for Saturday's walk-in flu shot clinic. The title is easy to overlook, the cost and the phone number blend into the rest of the page, and the last line was pasted in with odd formatting. Fix it before it goes on the waiting room board.",
      fileName: "Flu Shot Clinic Flyer.docx",
      minutes: 4,
      initial: {
        paragraphs: [
          { id: "p1", align: "center", size: 26, color: "#1F4E79", text: "free flu shot clinic" },
          { id: "p2", align: "center", size: 14, text: "Saturday, November 7, 2026 · 9:00 AM to 1:00 PM" },
          { id: "p3", align: "center", text: "Lakeside Medical Associates, 418 Harbor Street, Brooklyn" },
          { id: "p4", text: "No appointment is needed. Bring your insurance card if you have one." },
          { id: "p5", runs: [{ text: "Cost: " }, { id: "r1", text: "$0 with most insurance plans" }, { text: ", or $25 without insurance." }] },
          { id: "p6", runs: [{ text: "Questions? Call the front desk at " }, { id: "r1", text: "(718) 555-0142" }, { text: "." }] },
          { id: "p7", runs: [{ id: "r1", text: "Flu shots are recommended for everyone 6 months and older." }, { text: " Children under 9 may need two doses." }] },
          { id: "p8", font: "Comic Sans MS", size: 9, color: "#FF0000", underline: true, text: "Masks are available at the front desk." },
        ],
      },
      tasks: [
        {
          instruction: "Change the title “free flu shot clinic” to all capital letters.",
          hint: "Click the title. Home tab › Font group › Change Case › UPPERCASE.",
          steps: [
            {
              action: { kind: "command", id: "home.changeCase", value: "UPPERCASE" },
              alt: [{ kind: "dialog", id: "font", values: { allCaps: true } }],
              requires: { selection: "p1" },
              selectHint: "Click the title “free flu shot clinic” first.",
            },
          ],
        },
        {
          instruction: "Increase the font size of the title to 36.",
          hint: "With the title selected: Home tab › Font group › Font Size box › 36.",
          steps: [
            {
              action: { kind: "command", id: "home.fontSize", value: "36" },
              alt: [{ kind: "dialog", id: "font", values: { size: 36 } }],
              requires: { selection: "p1" },
              selectHint: "Click the title first.",
            },
          ],
        },
        {
          instruction: "Change the font of the title to Arial Black.",
          hint: "With the title selected: Home tab › Font group › Font box › Arial Black.",
          steps: [
            {
              action: { kind: "command", id: "home.fontName", value: "Arial Black" },
              alt: [{ kind: "dialog", id: "font", values: { font: "Arial Black" } }],
              requires: { selection: "p1" },
              selectHint: "Click the title first.",
            },
          ],
        },
        {
          instruction: "Bold the text “$0 with most insurance plans”.",
          hint: "Click “$0 with most insurance plans”. Home tab › Font group › Bold (or Ctrl+B).",
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              alt: [{ kind: "dialog", id: "font", values: { style: ["Bold", "Bold Italic"] } }],
              requires: { selection: "p5.r1" },
              selectHint: "Click just the words “$0 with most insurance plans” first.",
            },
          ],
        },
        {
          instruction: "Highlight the phone number “(718) 555-0142” in Yellow.",
          hint: "Click the phone number. Home tab › Font group › Text Highlight Color arrow › Yellow.",
          steps: [
            {
              action: { kind: "command", id: "home.highlight", value: "#FFFF00" },
              requires: { selection: "p6.r1" },
              selectHint: "Click just the phone number first.",
            },
          ],
        },
        {
          instruction: "Italicize the sentence “Flu shots are recommended for everyone 6 months and older.”",
          hint: "Click the sentence. Home tab › Font group › Italic (or Ctrl+I).",
          steps: [
            {
              action: { kind: "command", id: "home.italic" },
              alt: [{ kind: "dialog", id: "font", values: { style: ["Italic", "Bold Italic"] } }],
              requires: { selection: "p7.r1" },
              selectHint: "Click just the first sentence of that paragraph.",
            },
          ],
        },
        {
          instruction: "Remove all of the formatting from the last line, “Masks are available at the front desk.”",
          hint: "Click the last line. Home tab › Font group › Clear All Formatting (or press Ctrl+Space).",
          steps: [
            {
              action: { kind: "command", id: "home.clearFormatting" },
              requires: { selection: "p8" },
              selectHint: "Click the last line first.",
            },
          ],
        },
      ],
    },
  ],

  "module-2::find-and-replace": [
    {
      id: "word-m2-find-replace-1",
      app: "word",
      title: "Update the billing contact in the payment policy",
      scenario:
        "Lakeside Medical Associates has a new billing contact: Ms. Ortiz takes over from Ms. Price. The payment policy mentions Ms. Price several times, and it also uses the ordinary words “price” and “Prices”, which must not change.",
      fileName: "Patient Payment Policy.docx",
      minutes: 4,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Patient Payment Policy" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Billing Office" },
          { id: "p3", style: "Heading 1", text: "Questions About Your Bill" },
          { id: "p4", text: "If you have a question about a statement, call Ms. Price in the billing office at extension 214. Ms. Price can explain charges, set up a payment plan, or update your insurance." },
          { id: "p5", style: "Heading 1", text: "Self-Pay Prices" },
          { id: "p6", text: "Prices for self-pay patients are listed on the price sheet at the front desk. The price of a standard office visit is $125." },
          { id: "p7", style: "Heading 1", text: "Payment Plans" },
          { id: "p8", text: "Balances over $300 may be paid in monthly installments. Ms. Price approves every payment plan and reviews it every 90 days." },
          { id: "p9", style: "Heading 1", text: "Financial Assistance" },
          { id: "p10", text: "Patients who need help paying may apply for the Lakeside Assistance Program. Applications are available at the front desk or by calling extension 214." },
          { id: "p11", italic: true, text: "Last reviewed by Ms. Price, Billing Supervisor, January 2026." },
        ],
      },
      tasks: [
        {
          instruction: "Use the Navigation pane to find every mention of “payment plan” in the policy.",
          hint: "Press Ctrl+F (or Home tab › Editing group › Find), type payment plan in the Search document box, and press Enter.",
          steps: [{ action: { kind: "type", target: "find", value: ["payment plan", "payment plans"] } }],
        },
        {
          instruction: "Replace every occurrence of the name “Price” with “Ortiz”, without changing the words “price” or “Prices”.",
          hint: "Home tab › Editing group › Replace (Ctrl+H). Find what: Price. Replace with: Ortiz. Check Match case and Find whole words only, then Replace All. Word should report 4 replacements.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Price", replace: "Ortiz", matchCase: true, wholeWords: true } } }],
        },
        {
          instruction: "The billing office moved to a new phone extension. Replace “extension 214” with “extension 230” everywhere in the policy.",
          hint: "Ctrl+H. Find what: extension 214. Replace with: extension 230. Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "extension 214", replace: "extension 230" } } }],
        },
        {
          instruction: "The self-pay rate for an office visit is now $135. Replace “$125” with “$135”.",
          hint: "Ctrl+H. Find what: $125. Replace with: $135. Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "$125", replace: "$135" } } }],
        },
      ],
    },
  ],

  "module-2::lists": [
    {
      id: "word-m2-lists-1",
      app: "word",
      title: "Put the check-in procedure in order",
      scenario:
        "A new hire at Lakeside Medical Associates verified a patient's insurance before confirming who the patient was. The steps were all correct, but nothing on the page said they had to happen in order. Turn the procedure into lists that say what the reader needs to know.",
      fileName: "Front Desk Check-In Procedure.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Front Desk Check-In Procedure" },
          { id: "p3", style: "Heading 1", text: "Check-in steps (follow them in this order)" },
          { id: "p4", text: "Greet the patient and ask for their full name and date of birth." },
          { id: "p5", text: "Confirm the patient's identity against their photo ID." },
          { id: "p6", text: "Verify insurance coverage in the practice management system." },
          { id: "p7", text: "Collect the copay and give the patient a receipt." },
          { id: "p9", text: "Mark the patient as arrived on the schedule." },
          { id: "p10", style: "Heading 1", text: "What the patient should bring" },
          { id: "p11", text: "Photo ID" },
          { id: "p12", text: "Driver's license, state ID card, or passport" },
          { id: "p13", text: "Insurance card" },
          { id: "p14", text: "Front and back, for the scanner" },
          { id: "p16", style: "Heading 1", text: "Check-out steps" },
          // Word guessed wrong: this list continues the numbering of the list above.
          { id: "p17", list: "number", numberContinue: true, text: "Schedule the follow-up visit, if one was ordered." } as WordPara,
          { id: "p18", list: "number", text: "Print the after-visit summary, review it with the patient, and collect any balance due." },
        ],
      },
      tasks: [
        {
          instruction: "Format the five check-in steps as a numbered list that uses the 1. 2. 3. format.",
          hint: "Click the first step, then Shift+click the fifth step to select all five. Home tab › Paragraph group › Numbering (or Numbering arrow › 1. 2. 3.).",
          steps: [
            {
              action: { kind: "command", id: "home.numbering", value: ["1.", ""] },
              requires: { selection: "p4,p5,p6,p7,p9" },
              selectHint: "Select all five check-in steps first: click “Greet the patient…”, then Shift+click “Mark the patient as arrived…”.",
            },
          ],
        },
        {
          instruction: "Format the four lines under “What the patient should bring” as a bulleted list that uses check mark (✓) bullets.",
          hint: "Select the four lines (click “Photo ID”, then Shift+click “Front and back, for the scanner”). Home tab › Bullets arrow › ✓ Check mark.",
          steps: [
            {
              action: { kind: "command", id: "home.bullets", value: "✓" },
              requires: { selection: "p11,p12,p13,p14" },
              selectHint: "Select all four lines first: click “Photo ID”, then Shift+click “Front and back, for the scanner”.",
            },
          ],
        },
        {
          instruction: "Demote “Driver's license, state ID card, or passport” and then “Front and back, for the scanner” one level, so each sits under the item above it.",
          hint: "Click “Driver's license…” and press Tab (or Home tab › Paragraph group › Increase Indent). Then do the same for “Front and back…”.",
          steps: [
            {
              action: { kind: "command", id: "home.indentInc" },
              requires: { selection: "p12" },
              selectHint: "Click “Driver's license, state ID card, or passport” by itself first.",
            },
            {
              action: { kind: "command", id: "home.indentInc" },
              requires: { selection: "p14" },
              selectHint: "Now click “Front and back, for the scanner” by itself.",
            },
          ],
        },
        {
          instruction: "Keep the check mark bullets, but change their color to Green.",
          hint: "Select the bulleted list. Home tab › Bullets arrow › Define New Bullet… › keep ✓ › Font color: Green › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "defineBullet", values: { symbol: "✓", color: "#00B050" } },
              requires: { selection: "p11,p12,p13,p14" },
              selectHint: "Select the whole bulleted list first: click “Photo ID”, then Shift+click “Front and back, for the scanner”.",
            },
          ],
        },
        {
          instruction: "The check-out steps continued the numbering from the check-in list. Make them start again at 1.",
          hint: "Right-click “Schedule the follow-up visit…” › Restart at 1. (Or Home tab › Numbering arrow › Set Numbering Value… › Start new list › Set value to 1.)",
          steps: [
            {
              action: { kind: "command", id: "list.restart" },
              alt: [{ kind: "dialog", id: "setNumbering", values: { mode: "Start new list", start: 1 } }],
              requires: { selection: "p17" },
              selectHint: "Click the first check-out step, “Schedule the follow-up visit…”, first.",
            },
          ],
        },
      ],
    },
  ],

  "module-2::hyperlinks": [
    {
      id: "word-m2-hyperlinks-1",
      app: "word",
      title: "Fix the links on the patient resources page",
      scenario:
        "The patient resources page at Lakeside Medical Associates has a link that says “click here”, one that points to an old address, one missing link, and a printed map that should not be a link at all. A patient using a screen reader hears only the link text, so it has to say where each link goes.",
      fileName: "Patient Resources.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Patient Resources" },
          { id: "p2", text: "Helpful links from Lakeside Medical Associates. Each link opens in your web browser." },
          { id: "p3", style: "Heading 1", text: "Your Patient Portal" },
          {
            id: "p4",
            runs: [{ text: "Check test results, request refills, and message your care team in the " }, { id: "r1", text: "Lakeside patient portal" }, { text: "." }],
          },
          { id: "p5", style: "Heading 1", text: "Flu Vaccines" },
          {
            id: "p6",
            runs: [{ text: "Not sure whether you should get a flu shot this season? See " }, { id: "r1", text: "click here", link: "https://www.cdc.gov/flu" }, { text: "." }],
          },
          { id: "p7", style: "Heading 1", text: "Help Paying Your Bill" },
          {
            id: "p8",
            runs: [{ text: "Apply for help with your bill through the " }, { id: "r1", text: "Medication and Billing Assistance Program", link: "https://www.lakesidemedical.example/assist" }, { text: "." }],
          },
          { id: "p9", style: "Heading 1", text: "Getting Here" },
          {
            id: "p10",
            runs: [{ text: "Parking is free in the lot behind the building. See the " }, { id: "r1", text: "Parking map", link: "https://www.lakesidemedical.example/parking-map" }, { text: " printed on the back of this page." }],
          },
          { id: "p11", style: "Heading 1", text: "More Health Information" },
          { id: "p12", text: "" },
        ],
      },
      tasks: [
        {
          instruction: "Make the text “Lakeside patient portal” a link to https://portal.lakesidemedical.example",
          hint: "Click “Lakeside patient portal”. Insert tab › Links group › Link (or Ctrl+K) › type the address in the Address box › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "link", values: { address: "https://portal.lakesidemedical.example" } },
              requires: { selection: "p4.r1" },
              selectHint: "Click the words “Lakeside patient portal” first.",
            },
          ],
        },
        {
          instruction: "Follow the “Medication and Billing Assistance Program” link to make sure it opens.",
          hint: "Hold Ctrl and click the link (or right-click it › Open Hyperlink).",
          steps: [{ action: { kind: "click", target: "link:https://www.lakesidemedical.example/assist" } }],
        },
        {
          instruction: "Change the link text “click here” to “CDC flu vaccine information” without changing where the link goes.",
          hint: "Right-click “click here” › Edit Hyperlink… › change Text to display › OK. (You can also double-click the link text and type over it.)",
          steps: [
            {
              action: { kind: "dialog", id: "link", values: { text: "CDC flu vaccine information", address: "https://www.cdc.gov/flu" } },
              alt: [{ kind: "type", target: "p6.r1", value: "CDC flu vaccine information" }],
              requires: { selection: "p6.r1" },
              selectHint: "Click the link “click here” first.",
            },
          ],
        },
        {
          instruction: "Change the address of the “Medication and Billing Assistance Program” link to https://www.lakesidemedical.example/assistance",
          hint: "Right-click the link › Edit Hyperlink… › replace the address › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "link", values: { address: "https://www.lakesidemedical.example/assistance" } },
              requires: { selection: "p8.r1" },
              selectHint: "Click the “Medication and Billing Assistance Program” link first.",
            },
          ],
        },
        {
          instruction: "“Parking map” refers to a printed map, so it should not be a link. Remove the link but keep the text.",
          hint: "Right-click “Parking map” › Remove Hyperlink (or click it and press Ctrl+Shift+F9).",
          steps: [
            {
              action: { kind: "command", id: "link.remove" },
              requires: { selection: "p10.r1" },
              selectHint: "Click the words “Parking map” first.",
            },
          ],
        },
        {
          instruction: "In the empty line under “More Health Information”, type the address https://medlineplus.gov and press Enter so Word turns it into a link.",
          hint: "Double-click the empty line under the heading (or click it and start typing), type https://medlineplus.gov, and press Enter.",
          steps: [{ action: { kind: "type", target: "p12", value: "https://medlineplus.gov" } }],
        },
      ],
    },
  ],

  "module-2::printing-documents": [
    {
      id: "word-m2-printing-1",
      app: "word",
      title: "Print the orientation packets without wasting paper",
      scenario:
        "Tomorrow is new-patient orientation at Lakeside Medical Associates. Last time, forty packets came out with a seventh page holding one stray line. Check the layout first, then send each print job with the right settings.",
      fileName: "New Patient Orientation Packet.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "New Patient Orientation" },
          { id: "p2", text: "Welcome to Lakeside Medical Associates. This packet explains who we are, how to reach us, and what to expect at your first visit." },
          { id: "p3", kind: "pageBreak" },
          { id: "p4", style: "Heading 1", text: "Your Care Team" },
          { id: "p5", text: "Your primary care provider leads a team that includes a nurse, a medical assistant, and the front-desk staff who schedule your visits." },
          { id: "p6", kind: "pageBreak" },
          { id: "p7", style: "Heading 1", text: "Office Hours and Contact" },
          { id: "p8", text: "We are open Monday through Friday, 8:00 AM to 6:00 PM, and Saturday, 9:00 AM to 1:00 PM. Call (718) 555-0142 for appointments." },
          { id: "p9", kind: "pageBreak" },
          { id: "p10", style: "Heading 1", text: "Insurance and Billing" },
          { id: "p11", text: "Bring your insurance card to every visit. Copayments are collected at check-in." },
          { id: "p12", kind: "pageBreak" },
          { id: "p13", style: "Heading 1", text: "Orientation Day Room Schedule" },
          {
            id: "p14",
            kind: "table",
            table: {
              rows: [
                ["Time", "Room 1", "Room 2", "Room 3", "Room 4", "Room 5"],
                ["9:00", "Welcome", "Portal sign-up", "Insurance help", "Vaccines", "Tour"],
                ["10:00", "Care team", "Portal sign-up", "Billing", "Vaccines", "Tour"],
              ],
              style: "Grid Table 4 - Accent 1",
            },
          },
          { id: "p15", kind: "pageBreak" },
          { id: "p16", style: "Heading 1", text: "Patient Rights and Privacy" },
          { id: "p17", text: "You have the right to see your records, to ask questions about your care, and to know how your health information is protected." },
          { id: "p18", kind: "pageBreak" },
          { id: "p19", italic: true, text: "Thank you for choosing Lakeside." },
        ],
      },
      tasks: [
        {
          instruction: "The last page holds only the line “Thank you for choosing Lakeside.” Remove the manual page break that pushes it onto a page of its own.",
          hint: "Home tab › Paragraph group › Show/Hide ¶ to see the page breaks. Click the Page Break line just above “Thank you for choosing Lakeside.” and press Delete.",
          steps: [
            {
              action: { kind: "command", id: "edit.delete" },
              requires: { selection: "p18" },
              selectHint: "Turn on Show/Hide ¶ so the page breaks show, then click the Page Break line just above “Thank you for choosing Lakeside.”",
            },
          ],
        },
        {
          instruction: "Print 2 copies of the packet on the Front Desk HP LaserJet.",
          hint: "File tab › Print (Ctrl+P) › Copies: 2 › Printer: Front Desk HP LaserJet › Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 2, printer: "Front Desk HP LaserJet" } } }],
        },
        {
          instruction: "Print only pages 1 through 3 and page 5.",
          hint: "File tab › Print › type 1-3,5 in the Pages box › Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { pages: ["1-3,5", "1-3, 5"] } } }],
        },
        {
          instruction: "Print one copy of the whole packet on both sides of the paper, flipping pages on the long edge.",
          hint: "File tab › Print › change Print One Sided to Print on Both Sides (long edge) › Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { sides: "Print on Both Sides (long edge)", copies: 1 } } }],
        },
        {
          instruction: "Print page 5, the room schedule, in landscape orientation.",
          hint: "File tab › Print › type 5 in the Pages box › change Portrait Orientation to Landscape Orientation › Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { pages: "5", orientation: "Landscape Orientation" } } }],
        },
        {
          instruction: "Print a pocket-sized version of the packet with two pages on each sheet of paper.",
          hint: "File tab › Print › change 1 Page Per Sheet to 2 Pages Per Sheet › Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { perSheet: "2 Pages Per Sheet" } } }],
        },
        {
          instruction: "Print 40 copies for orientation day so that each copy comes out as a complete set, in page order.",
          hint: "File tab › Print › Copies: 40 › make sure the setting says Collated › Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 40, collate: "Collated" } } }],
        },
      ],
    },
  ],
};
