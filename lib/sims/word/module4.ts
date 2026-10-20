import type { SimDefinition } from "@/types/sim";

/** Word Module 4: References, Review & Collaboration. */
export const wordModule4Sims: Record<string, SimDefinition[]> = {
  "module-4::headers-and-footers": [
    {
      id: "word-m4-headers-footers-1",
      app: "word",
      title: "Label every page of the referral packet",
      scenario:
        "A referral packet from Lakeside Medical Associates arrived at a specialist's office unstapled and mixed in with other practices' pages. Add a header, the date, and page numbers so a loose page always shows where it came from, and keep the cover page clean.",
      fileName: "Referral Packet - Ramirez.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Specialist Referral Packet" },
          { id: "p2", style: "Subtitle", text: "Prepared for Brooklyn Heart and Vascular Center" },
          { id: "p3", text: "Patient: Rosa Ramirez · DOB 07/22/1958 · Referring provider: Lena Ortiz, MD" },
          { id: "p4", kind: "pageBreak" },
          { id: "p5", style: "Heading 1", text: "Referral Summary" },
          { id: "p6", text: "Ms. Ramirez is referred for evaluation of shortness of breath on exertion and an irregular heart rhythm noted at her visit on October 14." },
          { id: "p7", kind: "pageBreak" },
          { id: "p8", style: "Heading 1", text: "Recent Lab Results" },
          { id: "p9", text: "Complete blood count and basic metabolic panel from October 14 are attached. Thyroid function tests are pending." },
          { id: "p10", kind: "pageBreak" },
          { id: "p11", style: "Heading 1", text: "Current Medications" },
          { id: "p12", text: "Lisinopril 10 mg once daily; metformin 500 mg twice daily; atorvastatin 20 mg at bedtime." },
        ],
      },
      tasks: [
        {
          instruction: "Insert a Blank header.",
          hint: "Insert tab › Header & Footer group › Header › Blank.",
          steps: [{ action: { kind: "command", id: "insert.header", value: "Blank" } }],
        },
        {
          instruction: "In the header, type “Lakeside Medical Associates - Referral Packet for Rosa Ramirez”.",
          hint: "Click [Type here] in the header (double-click the header area if you closed it), type the text, and press Enter.",
          steps: [
            {
              action: {
                kind: "type",
                target: "header",
                // The hyphen in the instruction; a dash, bar, middle dot or plain spaces between the two parts are fine too.
                value: [" - ", " – ", " — ", " | ", " · ", "  "].map((sep) => `Lakeside Medical Associates${sep}Referral Packet for Rosa Ramirez`),
              },
            },
          ],
        },
        {
          instruction: "At the end of the header text, insert today's date in the format “October 20, 2026”, set to update automatically.",
          hint: "With the insertion point in the header: Header & Footer tab › Insert group › Date & Time › October 20, 2026 › check Update automatically › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "dateTime", values: { format: "October 20, 2026", update: true } },
              requires: { selection: "header" },
              selectHint: "Click in the header first, so the date goes there.",
            },
          ],
        },
        {
          instruction: "Add page numbers at the bottom right of every page.",
          hint: "Header & Footer tab › Header & Footer group › Page Number › Bottom of Page › Plain Number 3. (Insert tab › Page Number works too.)",
          steps: [{ action: { kind: "command", id: "insert.pageNumber", value: "Bottom of Page - Plain Number 3" } }],
        },
        {
          instruction: "The cover page should not show the header or the page number. Give the document a different first page.",
          hint: "With the header open: Header & Footer tab › Options group › check Different First Page.",
          steps: [
            {
              action: { kind: "command", id: "header.differentFirst" },
              requires: { selection: ["header", "footer"] },
              selectHint: "Double-click the header area first so the Header & Footer tab appears.",
            },
          ],
        },
        {
          instruction: "Close the header and footer and return to the body of the document.",
          hint: "Header & Footer tab › Close group › Close Header and Footer.",
          steps: [{ action: { kind: "command", id: "header.close" } }],
        },
      ],
    },
  ],

  "module-4::track-changes": [
    {
      id: "word-m4-track-changes-1",
      app: "word",
      title: "Clean up the reviewed visitor policy",
      scenario:
        "The visitor policy at Lakeside Medical Associates went through three reviewers, and the insurer needs it today. Hiding the markup only hides it from you, so make your one edit with tracking on, decide each change, and make sure no revisions or comments are left in the file.",
      fileName: "Visitor Policy - Draft 3.docx",
      minutes: 6,
      initial: {
        markup: "simple",
        paragraphs: [
          { id: "p1", style: "Title", text: "Visitor Policy" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Draft 3 for insurer review" },
          { id: "p3", style: "Heading 1", text: "Visiting Hours" },
          {
            id: "p4",
            runs: [{ text: "Visitors are welcome from " }, { text: "9:00 AM", del: true }, { text: "8:00 AM", ins: true }, { text: " to 6:00 PM, Monday through Friday." }],
          },
          { id: "p5", style: "Heading 1", text: "Who May Visit" },
          { id: "p6", runs: [{ text: "The number of visitors allowed in the exam room with a patient is " }, { id: "r1", text: "two" }, { text: "." }] },
          {
            id: "p7",
            runs: [{ text: "Children under 12 must stay with an adult at all times." }, { text: " Children may not visit during flu season.", ins: true }],
            comment: { author: "Lena Ortiz", text: "This contradicts our family-visit policy. Please reject this insertion." },
          },
          { id: "p8", style: "Heading 1", text: "Masks" },
          {
            id: "p9",
            runs: [{ text: "Masks are " }, { text: "recommended", del: true }, { text: "required", ins: true }, { text: " in the waiting room when local flu levels are high." }],
            comment: { author: "Marcus Bell", text: "“Required” matches the infection control plan. OK to accept." },
          },
          { id: "p10", style: "Heading 1", text: "Questions" },
          { id: "p11", runs: [{ text: "Questions about this policy should go to the office manager" }, { text: ", Tasha Morales", ins: true }, { text: "." }] },
        ],
      },
      tasks: [
        {
          instruction: "Display all of the reviewers' markup so you can read every change.",
          hint: "Review tab › Tracking group › Display for Review box › All Markup.",
          steps: [{ action: { kind: "command", id: "review.markup", value: "All Markup" } }],
        },
        {
          instruction: "Turn on Track Changes so that your own edit is recorded.",
          hint: "Review tab › Tracking group › Track Changes (or press Ctrl+Shift+E).",
          steps: [{ action: { kind: "command", id: "review.trackChanges" } }],
        },
        {
          instruction: "In the Who May Visit section, change “two” to “one”.",
          hint: "Double-click the word “two” to select it, type one to replace it, and press Enter. Word marks the old word as deleted and the new word as inserted.",
          steps: [{ action: { kind: "type", target: "p6.r1", value: "one" } }],
        },
        {
          instruction: "Reject the inserted sentence “Children may not visit during flu season.”",
          hint: "Click in the paragraph that begins “Children under 12”. Review tab › Changes group › Reject arrow › Reject Change.",
          steps: [
            {
              action: { kind: "command", id: "review.reject", value: ["Reject Change", "Reject and Move to Next"] },
              requires: { selection: "p7" },
              selectHint: "Click in the paragraph that begins “Children under 12” first.",
            },
          ],
        },
        {
          instruction: "Accept the change from “recommended” to “required” in the Masks section.",
          hint: "Click in the Masks paragraph. Review tab › Changes group › Accept arrow › Accept This Change.",
          steps: [
            {
              action: { kind: "command", id: "review.accept", value: ["Accept This Change", "Accept and Move to Next"] },
              requires: { selection: "p9" },
              selectHint: "Click in the paragraph that begins “Masks are” first.",
            },
          ],
        },
        {
          instruction: "Accept all of the remaining changes in the document and turn off Track Changes in the same step.",
          hint: "Review tab › Changes group › Accept arrow › Accept All Changes and Stop Tracking.",
          steps: [{ action: { kind: "command", id: "review.accept", value: "Accept All Changes and Stop Tracking" } }],
        },
        {
          instruction: "Delete every comment in the document.",
          hint: "Review tab › Comments group › Delete arrow › Delete All Comments in Document.",
          steps: [{ action: { kind: "command", id: "review.deleteComment", value: "Delete All Comments in Document" } }],
        },
        {
          instruction: "Inspect the document for hidden information before it leaves the practice.",
          hint: "File tab › Info › Check for Issues (under Inspect Document) › Inspect Document.",
          steps: [{ action: { kind: "command", id: "file.inspect", value: "Inspect Document" } }],
        },
      ],
    },
  ],

  "module-4::comments": [
    {
      id: "word-m4-comments-1",
      app: "word",
      title: "Review the intake form revision",
      scenario:
        "Your colleagues left comments on version 3 of the patient intake form. Answer the open question, close out what is done, clear the comment that needs no action, and leave one specific comment of your own that the author can act on without coming to find you.",
      fileName: "Patient Intake Form v3.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Patient Intake Form, Version 3" },
          { id: "p2", style: "Subtitle", text: "Draft for review by the front desk team" },
          { id: "p3", style: "Heading 1", text: "Contact Information" },
          { id: "p4", text: "Preferred phone number: ____________   OK to leave a message?  Yes / No" },
          {
            id: "p5",
            text: "Emergency contact name and phone: ______________________",
            comment: { author: "Tasha Morales", text: "Should we ask for a second emergency contact? Some patients list someone who works nights." },
          },
          { id: "p6", style: "Heading 1", text: "Medical History" },
          {
            id: "p7",
            text: "List any allergies to medications, foods, or latex: ______________________",
            comment: { author: "Marcus Bell", text: "Added latex at the infection control nurse's request. Done." },
          },
          {
            id: "p8",
            text: "Have you been hospitalized in the past 12 months?  Yes / No",
            comment: { author: "Tasha Morales", text: "This line is fine as is." },
          },
          { id: "p9", style: "Heading 1", text: "Signature" },
          { id: "p10", runs: [{ text: "Signature of " }, { id: "r1", text: "parent" }, { text: ": ______________________   Date: ________" }] },
        ],
      },
      tasks: [
        {
          instruction: "Add a comment to the word “parent” in the signature line that says “Should this say parent or legal guardian? Patients over 18 sign for themselves.”",
          hint: "Click the word “parent”. Review tab › Comments group › New Comment (or Ctrl+Alt+M) › type the comment › Post.",
          steps: [
            {
              action: { kind: "dialog", id: "newComment", values: { text: "Should this say parent or legal guardian? Patients over 18 sign for themselves." } },
              requires: { selection: ["p10.r1", "p10"] },
              selectHint: "Click the word “parent” in the signature line first.",
            },
          ],
        },
        {
          instruction: "Reply to Tasha Morales's comment about a second emergency contact with “Yes. Added a second contact line in version 4.”",
          hint: "Click Tasha Morales's comment card in the margin, type the reply in its Reply box, and press Enter.",
          steps: [
            {
              action: { kind: "command", id: "comment.reply", value: "Yes. Added a second contact line in version 4." },
              requires: { selection: "p5" },
              selectHint: "Click the comment about a second emergency contact first.",
            },
          ],
        },
        {
          instruction: "Marcus Bell's comment about latex has been taken care of. Resolve it so the thread stays on record but is marked done.",
          hint: "Click Marcus Bell's comment. Review tab › Comments group › Resolve (or the comment's ⋯ menu › Resolve thread).",
          steps: [
            {
              action: { kind: "command", id: "review.resolveComment" },
              requires: { selection: "p7" },
              selectHint: "Click Marcus Bell's comment about latex first.",
            },
          ],
        },
        {
          instruction: "Delete the comment “This line is fine as is.” because it needs no action.",
          hint: "Click that comment. Review tab › Comments group › Delete (or the comment's ⋯ menu › Delete thread).",
          steps: [
            {
              action: { kind: "command", id: "review.deleteComment", value: "Delete" },
              requires: { selection: "p8" },
              selectHint: "Click the comment “This line is fine as is.” first.",
            },
          ],
        },
        {
          instruction: "Jump to the next comment in the document without scrolling.",
          hint: "Review tab › Comments group › Next.",
          steps: [{ action: { kind: "command", id: "review.nextComment" } }],
        },
      ],
    },
  ],
};
