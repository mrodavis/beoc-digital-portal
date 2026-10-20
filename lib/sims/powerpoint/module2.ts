import type { SimDefinition } from "@/types/sim";

/** PowerPoint Module 2: Working with Text. Keys are `${moduleSlug}::${lessonSlug}`. */
export const pptModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::powerpoint-text-basics": [
    {
      id: "ppt-m2-text-basics-1",
      app: "powerpoint",
      title: "Tidy up the healthy living slides",
      scenario: "You are finishing a patient education deck for the Lakeside Medical Associates waiting room. A few bullets are in the wrong order and the formatting on one slide is fighting the theme.",
      fileName: "Healthy Living Tips.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Healthy Living Tips", subtitle: "Patient Education Series · Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "Move More Every Day", body: ["Walk 30 minutes a day", "Take the stairs when you can", "Stretch during TV breaks"] },
          { id: "s3", layout: "Title and Content", title: "Eat for Your Heart", body: ["Fill half your plate with vegetables", "Choose whole grains", "Limit salt and added sugar"] },
          { id: "s4", layout: "Title and Content", title: "Did You Know?", titleProps: { bold: true, size: 44 }, body: ["Companionship", "Social opportunities", "More daily walks", "Lower blood pressure"], notes: "Pets and your health: owning a pet is linked to all of these benefits." },
          { id: "s5", layout: "Title and Content", title: "Your Next Steps", body: ["Schedule a yearly checkup", "Ask about our walking group", "Sign up for the patient portal"] },
        ],
      },
      tasks: [
        {
          instruction: "On slide 4, use cut and paste to move the bullet “Lower blood pressure” so it sits between “Companionship” and “Social opportunities”.",
          hint: "Click the slide 4 list, then click the line “Lower blood pressure” and press Ctrl+X (Home › Clipboard › Cut). Click the line “Social opportunities” to put your cursor there, then press Ctrl+V (Home › Paste).",
          steps: [
            { action: { kind: "command", id: "home.cut" }, requires: { slide: "s4", selection: "s4.body.4" }, selectHint: "Click the list on slide 4, then click the line “Lower blood pressure” so only that line is selected." },
            { action: { kind: "command", id: "home.paste" }, requires: { slide: "s4", selection: "s4.body.2" }, selectHint: "Click the line “Social opportunities” to place your cursor at the start of it, then paste." },
          ],
        },
        {
          instruction: "Drag the bullet “More daily walks” to the top of the list on slide 4.",
          hint: "Click the line “More daily walks” to select it, then drag it up and drop it on the first line, “Companionship”.",
          steps: [{ action: { kind: "command", id: "text.move", value: "s4.body.4@1" } }],
        },
        {
          instruction: "Italicize the entire bullet list on slide 4.",
          hint: "Select the whole list: click inside it and press Ctrl+A (or click an empty spot on the slide, then click the list once). Then press Ctrl+I (Home › Font › Italic).",
          steps: [{
            action: { kind: "command", id: "home.italic" },
            alt: [{ kind: "dialog", id: "font", values: { style: "Italic" } }],
            requires: { slide: "s4", selection: "s4.body" },
            selectHint: "Select the whole list placeholder, not a single line: click inside the list and press Ctrl+A.",
          }],
        },
        {
          instruction: "Remove the bold formatting from the title “Did You Know?”.",
          hint: "Click the slide 4 title, then press Ctrl+B (Home › Font › Bold) to turn bold off.",
          steps: [{
            action: { kind: "command", id: "home.bold" },
            alt: [{ kind: "dialog", id: "font", values: { style: "Regular" } }],
            requires: { slide: "s4", selection: "s4.title" },
            selectHint: "Click the title “Did You Know?” first.",
          }],
        },
        {
          instruction: "Change the font size of the title “Did You Know?” to 36.",
          hint: "With the title selected: Home tab › Font Size box › 36.",
          steps: [{
            action: { kind: "command", id: "home.fontSize", value: "36" },
            alt: [{ kind: "dialog", id: "font", values: { size: "36" } }],
            requires: { slide: "s4", selection: "s4.title" },
            selectHint: "Click the title “Did You Know?” first.",
          }],
        },
        {
          instruction: "Copy the bullet “Walk 30 minutes a day” from slide 2 and paste it at the top of the list on slide 5, keeping only the text.",
          hint: "On slide 2, click the list, click the line “Walk 30 minutes a day”, and press Ctrl+C. On slide 5, click the list, click the first line, then Home › Paste arrow › Keep Text Only (Ctrl+V also works).",
          steps: [
            { action: { kind: "command", id: "home.copy" }, requires: { slide: "s2", selection: "s2.body.1" }, selectHint: "On slide 2, click the list, then click the line “Walk 30 minutes a day”." },
            { action: { kind: "command", id: "home.paste" }, requires: { slide: "s5", selection: "s5.body.1" }, selectHint: "On slide 5, click the list, then click its first line, “Schedule a yearly checkup”." },
          ],
        },
      ],
    },
  ],

  "module-2::powerpoint-lists": [
    {
      id: "ppt-m2-lists-1",
      app: "powerpoint",
      title: "Make the referral steps read in order",
      scenario: "You explain the referral workflow to new front desk and billing staff at Lakeside Medical Associates. Right now every list looks the same, so nobody can tell which ones are steps.",
      fileName: "Referral Workflow Training.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Referral Workflow Training", subtitle: "Front Desk and Billing Staff" },
          { id: "s2", layout: "Title and Content", title: "Referral Steps", body: ["Receive the referral order", "Verify insurance coverage", "Request prior authorization", "Schedule the specialist visit", "Call the patient with the details"] },
          { id: "s3", layout: "Title and Content", title: "Afternoon Agenda", bodyProps: { bullets: true, numbered: true }, body: ["Billing codes review", "Patient portal questions", "Wrap-up and survey"], notes: "The morning session covered agenda items 1 to 4." },
          { id: "s4", layout: "Title and Content", title: "What to Bring to a Specialist Visit", body: ["Photo ID", "Insurance card", "Referral paperwork", "Medication list"] },
          { id: "s5", layout: "Title and Content", title: "Common Specialties", body: ["Cardiology", "Heart and blood vessels", "Dermatology", "Skin, hair, and nails", "Orthopedics", "Bones and joints"] },
        ],
      },
      tasks: [
        {
          instruction: "The list on slide 2 is a sequence of steps. Change it to a numbered list with the “1. 2. 3.” style.",
          hint: "Click the slide 2 list (press Ctrl+A to select all of it). Home tab › Paragraph › Numbering arrow › 1. 2. 3.",
          steps: [{
            action: { kind: "command", id: "home.numbering", value: "1. 2. 3." },
            alt: [{ kind: "command", id: "home.numbering" }, { kind: "dialog", id: "numbering", values: { style: "1. 2. 3." } }],
            requires: { slide: "s2", selection: "s2.body" },
            selectHint: "Select the whole list placeholder on slide 2: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "The afternoon agenda on slide 3 continues from the morning's four items. Make its numbering start at 5.",
          hint: "Select the slide 3 list. Home tab › Numbering arrow › Bullets and Numbering… › Start at: 5 › OK.",
          steps: [{ action: { kind: "dialog", id: "numbering", values: { startAt: 5 } }, requires: { slide: "s3", selection: "s3.body" }, selectHint: "Select the whole list on slide 3 first: click inside it and press Ctrl+A." }],
        },
        {
          instruction: "Change the bullets on slide 4 to checkmark bullets.",
          hint: "Select the slide 4 list. Home tab › Paragraph › Bullets arrow › Checkmark Bullets.",
          steps: [{
            action: { kind: "command", id: "home.bullets", value: "Checkmark Bullets" },
            alt: [{ kind: "dialog", id: "bullets", values: { style: "Checkmark Bullets" } }],
            requires: { slide: "s4", selection: "s4.body" },
            selectHint: "Select the whole list on slide 4 first: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "Make the checkmark bullets on slide 4 120% of the text size.",
          hint: "With the slide 4 list selected: Home tab › Bullets arrow › Bullets and Numbering… › Size: 120 › OK.",
          steps: [{ action: { kind: "dialog", id: "bullets", values: { size: 120 } }, requires: { slide: "s4", selection: "s4.body" }, selectHint: "Select the whole list on slide 4 first." }],
        },
        {
          instruction: "On slide 5, demote each description one level so it sits under its specialty: “Heart and blood vessels”, “Skin, hair, and nails”, and “Bones and joints”.",
          hint: "Click the slide 5 list, click a description line, then press Tab (or Home › Paragraph › Increase List Level). Repeat for each description.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.indentInc" }, requires: { slide: "s5", selection: "s5.body.2" }, selectHint: "Click the list, then click one of the description lines (not a specialty name)." },
            { action: { kind: "command", id: "home.indentInc" }, requires: { slide: "s5", selection: "s5.body.4" }, selectHint: "Click the list, then click one of the description lines (not a specialty name)." },
            { action: { kind: "command", id: "home.indentInc" }, requires: { slide: "s5", selection: "s5.body.6" }, selectHint: "Click the list, then click one of the description lines (not a specialty name)." },
          ],
        },
        {
          instruction: "A diagram shows a sequence better than a list. Convert the steps on slide 2 into a Basic Process SmartArt graphic.",
          hint: "Select the slide 2 list. Home tab › Paragraph › Convert to SmartArt › Basic Process (or right-click the list › Convert to SmartArt).",
          steps: [{
            action: { kind: "command", id: "home.convertSmartArt", value: "Basic Process" },
            alt: [{ kind: "dialog", id: "convertSmartArt", values: { graphic: "Basic Process" } }],
            requires: { slide: "s2", selection: "s2.body" },
            selectHint: "Select the whole list on slide 2 first: click inside it and press Ctrl+A.",
          }],
        },
      ],
    },
  ],

  "module-2::indents-and-line-spacing": [
    {
      id: "ppt-m2-indents-spacing-1",
      app: "powerpoint",
      title: "Make the hand hygiene slides readable from the back row",
      scenario: "Someone squeezed the hand hygiene training slides by tightening the line spacing. Projected with the lights on, the lines run together. Open them back up and show the hierarchy with indents.",
      fileName: "Hand Hygiene Training.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Hand Hygiene Training", subtitle: "Clinical Staff Refresher" },
          { id: "s2", layout: "Title and Content", title: "When to Clean Your Hands", bodyProps: { lineSpacing: 0.8 }, body: ["Before touching a patient", "Before clean or aseptic procedures", "After a body fluid exposure risk", "After touching a patient", "After touching patient surroundings"] },
          { id: "s3", layout: "Title and Content", title: "How to Use Hand Rub", body: ["Apply a palmful of product in a cupped hand", "Rub hands palm to palm", "Cover every surface of both hands", "Rub until dry, about 20 seconds"] },
          { id: "s4", layout: "Title and Content", title: "Gloves and Hand Hygiene", body: ["Gloves do not replace hand hygiene", "Clean hands before putting gloves on", "Clean hands after taking gloves off", "Change gloves between patients"] },
        ],
      },
      tasks: [
        {
          instruction: "Set the line spacing of the list on slide 2 to 1.5.",
          hint: "Select the slide 2 list (click inside it and press Ctrl+A). Home tab › Paragraph › Line Spacing › 1.5.",
          steps: [{
            action: { kind: "command", id: "home.lineSpacing", value: "1.5" },
            alt: [{ kind: "dialog", id: "paragraph", values: { lineSpacing: "1.5 lines" } }],
            requires: { slide: "s2", selection: "s2.body" },
            selectHint: "Select the whole list on slide 2 first: click inside it and press Ctrl+A.",
          }],
        },
        {
          instruction: "Add 6 pt of space after each paragraph in the slide 2 list.",
          hint: "With the list selected: Home tab › Line Spacing › Line Spacing Options… (or the Paragraph group launcher). Set Spacing After to 6 pt, then click OK.",
          steps: [{ action: { kind: "dialog", id: "paragraph", values: { after: 6 } }, requires: { slide: "s2", selection: "s2.body" }, selectHint: "Select the whole list on slide 2 first." }],
        },
        {
          instruction: "Show the ruler so you can see the indent markers.",
          hint: "View tab › Show group › check Ruler.",
          steps: [{ action: { kind: "command", id: "view.ruler" } }],
        },
        {
          instruction: "On slide 3, indent the list 0.5\" before the text with a 0.25\" hanging indent.",
          hint: "Select the slide 3 list. Open the Paragraph dialog (Paragraph group launcher). Set Before text to 0.5, Special to Hanging, By to 0.25, then click OK.",
          steps: [{ action: { kind: "dialog", id: "paragraph", values: { indentBefore: 0.5, special: "Hanging", by: 0.25 } }, requires: { slide: "s3", selection: "s3.body" }, selectHint: "Select the whole list on slide 3 first: click inside it and press Ctrl+A." }],
        },
        {
          instruction: "On slide 4, demote “Clean hands before putting gloves on” and “Clean hands after taking gloves off” one level.",
          hint: "Click the slide 4 list, click one of the two lines, then press Tab (or Home › Paragraph › Increase List Level). Repeat for the other line.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.indentInc" }, requires: { slide: "s4", selection: "s4.body.2" }, selectHint: "Click the list, then click one of the two “Clean hands” lines." },
            { action: { kind: "command", id: "home.indentInc" }, requires: { slide: "s4", selection: "s4.body.3" }, selectHint: "Click the list, then click one of the two “Clean hands” lines." },
          ],
        },
        {
          instruction: "Set the line spacing of the slide 4 list to Multiple at 1.2.",
          hint: "Select the slide 4 list. Open Line Spacing Options… (Home › Line Spacing). Choose Multiple, set At to 1.2, then click OK.",
          steps: [{ action: { kind: "dialog", id: "paragraph", values: { lineSpacing: "Multiple", at: 1.2 } }, requires: { slide: "s4", selection: "s4.body" }, selectHint: "Select the whole list on slide 4 first: click inside it and press Ctrl+A." }],
        },
      ],
    },
  ],

  "module-2::using-find-and-replace": [
    {
      id: "ppt-m2-find-replace-1",
      app: "powerpoint",
      title: "Update the practice name across the benefits deck",
      scenario: "The practice has changed its name from Lakeside Family Clinic to Lakeside Medical Associates, and the benefits deck still has last year's plan year. Fix every slide in a few actions instead of slide by slide.",
      fileName: "Benefits Enrollment.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        theme: "Retrospect",
        slides: [
          { id: "s1", layout: "Title Slide", title: "2025-2026 Benefits Enrollment", subtitle: "Lakeside Family Clinic Staff" },
          { id: "s2", layout: "Title and Content", title: "Open Enrollment Dates", body: ["Enrollment runs November 1 to November 15", "Changes take effect for the 2025-2026 plan year", "Lakeside Family Clinic HR will email reminders"] },
          { id: "s3", layout: "Title and Content", title: "Medical Plans", body: ["Two medical plans offered by Lakeside Family Clinic", "Dental and vision plans are unchanged"] },
          { id: "s4", layout: "Title and Content", title: "Wellness Benefits", body: ["Free flu shots for all staff", "Gym discount through the 2025-2026 year"] },
          { id: "s5", layout: "Title and Content", title: "Questions?", body: ["Visit the HR office, room 210", "Ask the Family Clinic benefits team"] },
        ],
      },
      tasks: [
        {
          instruction: "Replace every occurrence of “Lakeside Family Clinic” with “Lakeside Medical Associates”. Match case.",
          hint: "Home tab › Editing › Replace › Replace… (or Ctrl+H). Type both entries, check Match case, then click Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Lakeside Family Clinic", replace: "Lakeside Medical Associates", matchCase: true } } }],
        },
        {
          instruction: "Replace every occurrence of “2025-2026” with “2026-2027”.",
          hint: "Home tab › Replace › Replace… (Ctrl+H). Find what: 2025-2026, Replace with: 2026-2027, then click Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "2025-2026", replace: "2026-2027" } } }],
        },
        {
          instruction: "Find the slide that still mentions “Family Clinic” on its own.",
          hint: "Home tab › Editing › Find (or Ctrl+F). Type Family Clinic, then click Find Next.",
          steps: [{ action: { kind: "dialog", id: "find", values: { find: "Family Clinic" } } }],
        },
        {
          instruction: "Replace “Family Clinic” with “Lakeside Medical Associates”.",
          hint: "Home tab › Replace › Replace… (Ctrl+H). Find what: Family Clinic, Replace with: Lakeside Medical Associates, then click Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Family Clinic", replace: "Lakeside Medical Associates" } } }],
        },
        {
          instruction: "Replace the font Calibri with Georgia everywhere in the presentation.",
          hint: "Home tab › Editing › Replace arrow › Replace Fonts…. Replace: Calibri, With: Georgia, then click Replace.",
          steps: [{ action: { kind: "dialog", id: "replaceFonts", values: { replace: "Calibri", with: "Georgia" } } }],
        },
        {
          instruction: "Switch to Outline View to confirm the old name is gone from every slide.",
          hint: "View tab › Presentation Views › Outline View.",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Outline View" } }],
        },
      ],
    },
  ],
};
