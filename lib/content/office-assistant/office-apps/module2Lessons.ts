import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "mail-merge",
    title: "Mail Merge for Mass Communications",
    description:
      "Learn to automate bulk patient and staff communications using Word's mail merge feature — from building a recipient list to producing 200 personalized letters in minutes.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/iHuFzz7Wvt4",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-01.jpg",
        alt: "What Is Mail Merge? — how one document becomes hundreds of personalized letters automatically",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-02.jpg",
        alt: "The Six Steps of Mail Merge — from choosing a document type to completing the merge",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-03.jpg",
        alt: "Creating a Recipient List in Word vs Linking to an Excel Data Source",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-04.jpg",
        alt: "Inserting Merge Fields — placing FirstName, LastName, Address, and AppointmentDate fields",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-05.jpg",
        alt: "Previewing Merged Documents — checking that data populates correctly before merging",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-06.jpg",
        alt: "Merge to New Document vs Printer vs Email — choosing the right output for your situation",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-07.jpg",
        alt: "Filtering Recipients — sending only to patients meeting specific criteria",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-08.jpg",
        alt: "Common Mail Merge Errors and How to Fix Them",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/mail-merge/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct mail merge step for a given scenario",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates is sending flu season appointment reminders to 200 patients. Each letter must be personally addressed with the patient's name, their provider's name, and their scheduled appointment date. Typing 200 individual letters would take hours — and would inevitably introduce errors. Mail merge produces all 200 letters from a single template and a single data file in under 10 minutes, with zero risk of a name being wrong because the data itself is the source. This is one of the highest-value productivity skills an office assistant can demonstrate.",
          },
        ],
      },
      {
        heading: "What Mail Merge Is and When to Use It",
        blocks: [
          {
            type: "paragraph",
            text: "Mail merge is a feature that combines a standard document template with a list of variable data to automatically produce a unique, personalized version of the document for each record in the list. It is the correct tool whenever you need to produce multiple copies of the same document that vary by recipient-specific information:",
          },
          {
            type: "list",
            items: [
              "Use mail merge when you have 10 or more recipients — for fewer than 10 recipients, manual editing may be faster. But for any bulk communication — appointment reminders, annual wellness check notices, billing statements, staff announcements, or holiday closures — mail merge saves enormous time and eliminates transcription errors.",
              "Mail merge works for letters, envelopes, labels, and email — while letters are the most common use in a medical office, the same mail merge workflow can automatically print addressed envelopes for a mailing campaign, generate a sheet of address labels from a contact list, or send personalized bulk emails through Outlook if you have Outlook configured as your email client.",
              "The two required components are a main document (the template with static content and merge field placeholders) and a data source (a list of records with the variable information — patient names, addresses, appointment dates, provider names) — Word merges these two files together at the moment you complete the merge, producing one output document per data record.",
            ],
          },
        ],
      },
      {
        heading: "The Six Steps of Mail Merge",
        blocks: [
          {
            type: "paragraph",
            text: "Word's Step-by-Step Mail Merge Wizard (accessed through Mailings > Start Mail Merge > Step-by-Step Mail Merge Wizard) guides you through six stages. You can also perform each step manually using the Mailings tab tools, which is faster once you are familiar with the process:",
          },
          {
            type: "list",
            items: [
              "Step 1 — Select document type: choose Letters, E-mail Messages, Envelopes, Labels, or Directory from the Mailings > Start Mail Merge dropdown. For patient appointment reminders at Lakeside Medical Associates, choose 'Letters.' This tells Word what kind of merged output to produce.",
              "Step 2 — Select recipients (your data source): click Mailings > Select Recipients. You can 'Use an Existing List' (link to an Excel spreadsheet or Access database), 'Select from Outlook Contacts,' or 'Type a New List' to create a recipient table directly in Word. For a professional medical office setup, an Excel spreadsheet is the best data source — it is easy to maintain, sort, and filter outside of Word.",
              "Step 3 — Write the main document: compose your letter with standard text in the body and click Mailings > Insert Merge Field wherever variable data should appear. Insert field placeholders like «FirstName», «LastName», «AppointmentDate», and «ProviderName». These appear in the document surrounded by chevrons (« ») to indicate they are merge fields, not static text.",
              "Step 4 — Preview results: click Mailings > Preview Results. Word substitutes real data from your first record into the merge fields so you can verify the letter looks correct with actual patient information. Use the navigation arrows in the Mailings tab to scroll through several records and check for formatting or data issues before committing to the full merge.",
              "Step 5 — Complete the merge: click Mailings > Finish & Merge and choose 'Edit Individual Documents' (to review all letters in a single new document before printing), 'Print Documents' (to send directly to the printer), or 'Send Email Messages' (to send via Outlook). For patient letters, always choose 'Edit Individual Documents' first so you can spot-check a sample of the output.",
              "Step 6 — Filter or sort if needed: before completing the merge, you can filter the recipient list to include only specific records — for example, only patients assigned to Dr. Chen, or only patients with appointments in June. Use Mailings > Edit Recipient List to apply filters, sort the list, or deselect individual recipients.",
            ],
          },
        ],
      },
      {
        heading: "Building an Excel Data Source",
        blocks: [
          {
            type: "paragraph",
            text: "The quality of your mail merge output is entirely dependent on the quality and structure of your data source. An Excel spreadsheet set up correctly for mail merge is easy to maintain and can be reused for multiple merge campaigns:",
          },
          {
            type: "list",
            items: [
              "Structure the spreadsheet with column headers in row 1 — each column header becomes a merge field name. Use simple, clear names: FirstName, LastName, StreetAddress, City, State, ZIP, ProviderName, AppointmentDate, AppointmentTime. Avoid spaces or special characters in column header names, as they can cause field recognition issues in Word.",
              "Each row represents one recipient — every row below the header row is a separate record that will produce a separate merged letter. A file with 200 patient records will produce 200 letters. Leave no blank rows in the data — blank rows create blank merged letters that can slip into your output undetected.",
              "Format data columns for consistency — dates should be formatted as dates in Excel (not plain text) so they appear correctly in the merged letter. Name fields should be in title case (Maria Rodriguez, not MARIA RODRIGUEZ or maria rodriguez). ZIP codes should be formatted as Text in Excel to preserve leading zeros (01234, not 1234). Clean data produces clean letters.",
              "Common mail merge errors and fixes — if merge fields show field codes ({MERGEFIELD FirstName}) instead of data, press Alt+F9 to toggle field code display. If dates appear as numbers (e.g., 46021 instead of May 5, 2025), add a format switch to the merge field: right-click the field, choose Toggle Field Codes, and add \\@ \"MMMM d, yyyy\" after the field name. If records are skipping, check your filter settings in Edit Recipient List.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Mail Merge Workflow",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-2/mail-merge/infographic.png",
            alt: "Mail Merge Quick Reference — the six-step workflow diagram, Excel data source structure requirements, merge field insertion steps, and common error fixes for the most frequent mail merge problems",
            caption: "Mail Merge Quick Reference — from data source to 200 personalized letters",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Patient data used in a mail merge — names, addresses, appointment dates, provider names — is protected health information under HIPAA. The Excel spreadsheet containing this data must be stored in Lakeside Medical Associates' secured network drive, not on a personal computer, USB drive, or personal cloud storage. After completing a mail merge, do not leave the recipient data file open on your screen or printed as a reference sheet. If you make an error and merge letters with the wrong data (wrong names, wrong dates), report the error to your supervisor immediately before any letters are mailed — sending incorrect appointment information to patients can cause missed appointments, patient frustration, and potential liability.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write a professional patient appointment reminder letter template for a medical office that uses mail merge fields for patient first name, appointment date, appointment time, and provider name. The letter should be in block format, about 3 paragraphs, and include directions for confirming or rescheduling the appointment by phone.' Use the generated template as your main merge document — paste it into Word, then replace the variable text with actual Word merge fields from your Mailings tab.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which step in the mail merge process allows you to confirm that patient data is populating correctly before producing all 200 letters?",
            options: [
              "Insert Merge Field",
              "Select Recipients",
              "Preview Results",
              "Finish & Merge",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Conduct a complete mail merge for Lakeside Medical Associates, producing personalized appointment reminder letters for a group of 8 fictional patients. Your merge must use an Excel data source and include at least four merge fields in the letter.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create an Excel spreadsheet with the following columns: FirstName, LastName, StreetAddress, City, State, ZIP, ProviderName, AppointmentDate, AppointmentTime. Enter 8 fictional patient records with realistic data — vary the providers between Dr. Patel, Dr. Chen, and Dr. Okafor, and use appointment dates in June 2025. Save the file as 'Patient Reminder Data – Lakeside Medical.xlsx.'",
          "Create a Word mail merge main document — a professional appointment reminder letter in block format on Lakeside Medical Associates letterhead (create a simple text letterhead if needed). The letter must include merge fields for: patient first name (in the salutation), appointment date, appointment time, and provider name. Write 2–3 body paragraphs reminding the patient about their appointment, providing the clinic address and parking information, and asking them to confirm by calling (555) 234-5678 by May 30, 2025.",
          "Connect the Excel data source to the Word document using Mailings > Select Recipients > Use an Existing List. Preview results and scroll through all 8 records to confirm each one looks correct and the merge fields are populating properly.",
          "Filter the recipient list to only include patients assigned to Dr. Chen. Complete a partial merge to a new document — confirm the output contains only Dr. Chen's patients.",
          "Clear the filter and complete the full merge for all 8 patients to a new document. Save the merged document as 'Appointment Reminders – June 2025 – Lakeside Medical.docx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit three files to your instructor or course folder: (1) the Excel data source, (2) the main merge document template (.docx), and (3) the completed merged output with all 8 letters. Your work will be evaluated on data source structure, correct merge field placement, accurate data population in the preview, successful filtering demonstration, and professional letter formatting throughout all 8 merged letters.",
      },
    ],
  },

  {
    slug: "headers-footers-references",
    title: "Headers, Footers, and Document References",
    description:
      "Master Word's header and footer tools, automatic page numbering, and professional document reference features including automatic Tables of Contents, footnotes, and cross-references.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/hxSGN6IJAFc?si=lsvChAnjpi3Hb-kj",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-01.jpg",
        alt: "Headers and Footers — the zones at the top and bottom of every page and what goes there",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-02.jpg",
        alt: "Different First Page — removing the header from the title page professionally",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-03.jpg",
        alt: "Odd and Even Page Headers — different headers for left and right pages in formal reports",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-04.jpg",
        alt: "Automatic Page Numbering Styles — plain number, Page X of Y, Roman numerals",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-05.jpg",
        alt: "Date and Time Fields — inserting automatically updating date and time stamps",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-06.jpg",
        alt: "Automatic Table of Contents — building a TOC from Heading styles in one click",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-07.jpg",
        alt: "Footnotes vs Endnotes — when and how to use each in professional documents",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-08.jpg",
        alt: "Cross-References and Bookmarks — linking to other sections within the same document",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/headers-footers-references/slide-09.jpg",
        alt: "Knowledge Check — choosing the correct reference tool for a given document need",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates has asked you to finalize a 12-page staff operations manual. The manual needs: the practice name in the header on every page except the cover, page numbers in the footer, an automatic Table of Contents on page 2 that updates itself, and footnotes citing two regulatory references in the body text. This is a multi-part formatting task that requires precise control over Word's reference and header/footer systems — skills that most users do not develop until they are pushed by a real project like this one.",
          },
        ],
      },
      {
        heading: "Headers and Footers in Professional Documents",
        blocks: [
          {
            type: "paragraph",
            text: "Headers and footers are the content zones that appear in the top and bottom margins of every page, outside the main text area. They serve a critical navigational and identification function in multi-page documents — a reader who picks up any page of a multi-page report should be able to immediately identify what document it is, what section they are in, and what page they are on:",
          },
          {
            type: "list",
            items: [
              "To enter the header or footer zone, double-click in the top or bottom margin of any page, or use Insert > Header or Insert > Footer from the Ribbon. Word provides a gallery of built-in header and footer styles — the 'Blank,' 'Austin,' and 'Grid' styles are clean, professional choices. Once inside the zone, the main document text dims and the Header & Footer Tools tab appears in the Ribbon, providing all the controls you need.",
              "The 'Different First Page' option — found in the Header & Footer Tools > Options group — removes the header and footer from page 1 only, while all subsequent pages retain the standard header and footer. This is the correct professional setting for any formal document that has a title page or cover: the title page looks clean and uncluttered, while the body pages carry the navigation elements. Check this option for every formal report or multi-page document you produce.",
              "Odd and even page headers allow you to display different content on left-facing and right-facing pages — similar to how printed books show the book title on even pages and the chapter title on odd pages. This is enabled by checking 'Different Odd & Even Pages' in the same Options group. For most Lakeside Medical Associates documents, this level of complexity is unnecessary, but it is valuable to know for more formal publication-style layouts.",
              "To exit the header or footer zone and return to the main document, double-click anywhere in the main text area, or press Escape. All changes to the header/footer are saved automatically as you exit the zone.",
            ],
          },
        ],
      },
      {
        heading: "Automatic Page Numbering and Date Fields",
        blocks: [
          {
            type: "paragraph",
            text: "Automatic fields in Word are self-updating placeholders that insert dynamic information — page numbers, date, time, document properties — that updates itself as the document changes. Learning to use fields instead of typing static numbers and dates is a hallmark of professional document production:",
          },
          {
            type: "list",
            items: [
              "To insert page numbers, enter the footer zone and click Insert > Page Number from the Ribbon, or use Header & Footer Tools > Insert > Page Number. Choose your position (bottom of page is most common), then choose a number format from the gallery. 'Plain Number 2' (centered number) is the standard professional choice. Word inserts a field that automatically shows the current page number and updates as pages are added or removed — never type page numbers manually.",
              "The 'Page X of Y' format — showing 'Page 3 of 12' — is extremely useful for long documents because readers can immediately gauge how far through the document they are. Select the 'Bold Numbers 3' or similar built-in style from the page number gallery, or insert it manually by clicking Header & Footer Tools > Insert > Page Number > Page X of Y from the format options.",
              "Date and time fields insert the current date (or a specific date) in a format that either updates automatically every time the document is opened, or remains fixed. To insert a date field, click Insert > Date & Time from the Ribbon. Check 'Update automatically' if you want the date to always reflect the current date when the document is opened — useful for meeting agenda templates. Leave 'Update automatically' unchecked if you want the date locked at the time of original creation — appropriate for letters and reports with a specific issuance date.",
            ],
          },
        ],
      },
      {
        heading: "Automatic Table of Contents",
        blocks: [
          {
            type: "paragraph",
            text: "Word can automatically generate a professional Table of Contents from your document's Heading styles — and update it with a single click whenever the document changes. This is one of the most impressive productivity features in Word, and it only works when you have consistently used Heading styles throughout the document:",
          },
          {
            type: "list",
            items: [
              "To insert an automatic Table of Contents: place your cursor where you want the TOC to appear (typically after the title page), click References > Table of Contents, and choose an automatic style from the gallery. Word scans the document for Heading 1, Heading 2, and Heading 3 styles, lists them in the TOC with their page numbers, and formats the TOC automatically. This works perfectly because you used Heading styles consistently throughout the document.",
              "To update the TOC after making changes to the document (adding sections, renaming headings, or changing page layout): right-click anywhere inside the TOC and choose 'Update Field.' Choose 'Update entire table' to refresh both page numbers and heading text. Always update the TOC before printing or sharing a final document — an outdated TOC with wrong page numbers is unprofessional.",
              "Custom TOC settings — click References > Table of Contents > Custom Table of Contents to control how many heading levels appear (1–9), whether page numbers are shown, whether page numbers are right-aligned, and whether dotted leader tabs connect heading names to page numbers. For a Lakeside Medical Associates operations manual, showing 2 heading levels (Heading 1 and Heading 2) with right-aligned page numbers and leader dots is the professional standard.",
            ],
          },
        ],
      },
      {
        heading: "Footnotes, Endnotes, and Cross-References",
        blocks: [
          {
            type: "paragraph",
            text: "Document reference features allow you to add citations, explanatory notes, and internal links without cluttering the main body text — keeping the document readable while providing depth for readers who want it:",
          },
          {
            type: "list",
            items: [
              "Footnotes appear at the bottom of the same page as the reference — ideal for brief explanatory notes or citations that the reader may want to consult without turning to the back of the document. In Lakeside Medical Associates policy documents, footnotes are appropriate for regulatory citations (e.g., HIPAA §164.502) or procedure references. Insert a footnote with References > Insert Footnote (Ctrl+Alt+F). Word places a superscript number at the cursor position and automatically numbers all footnotes sequentially.",
              "Endnotes function identically to footnotes but appear at the very end of the document rather than at the bottom of each page — appropriate for lengthy reference lists in long formal reports. Insert with References > Insert Endnote (Ctrl+Alt+D). You can convert all footnotes to endnotes (or vice versa) using References > Show Notes > Convert.",
              "Cross-references create clickable links within the same document — 'see Table 3 on page 8' becomes a live link that jumps to that table. Insert with References > Cross-reference. Choose the reference type (heading, figure, table, bookmark, or footnote) and the specific item to reference. When the document content shifts and page numbers change, update all cross-references by pressing Ctrl+A to select all, then F9 to update all fields.",
              "Bookmarks mark a specific location in the document that you can jump to or reference — like a named anchor. Insert a bookmark at any cursor position with Insert > Bookmark, give it a descriptive name (no spaces), and click Add. Bookmarks are used as targets for cross-references and hyperlinks, and as navigation aids in long documents reviewed on screen.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Headers, Footers, and References",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-2/headers-footers-references/infographic.png",
            alt: "Headers, Footers, and Document References Quick Reference — page numbering format options, Different First Page setting, Table of Contents update steps, footnote vs endnote comparison, and cross-reference insertion workflow",
            caption: "Document References Quick Reference — headers, TOC, footnotes, and cross-links",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Regulatory citations in medical office policy documents carry legal weight — a footnote citing the wrong HIPAA section number, or a Table of Contents that points to the wrong page because it was not updated before printing, can create compliance problems. Never distribute a final policy document without updating all reference fields (Ctrl+A, then F9) and reviewing the TOC for accuracy. When citing regulatory or legal references in any Lakeside Medical Associates document, verify the citation from the original regulatory source — do not cite from memory or from a previous document that may be outdated.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write the first 3 sections of a patient privacy policy document for a small medical office, structured with clear section headings (Heading 1 level) and subsection headings (Heading 2 level). Include a footnote at the end of the first section citing HIPAA's privacy rule (45 CFR Part 164). Format the content so I can paste it into Microsoft Word and immediately generate an automatic Table of Contents.' Use the generated content to practice building a real TOC in Word — paste the text, apply Heading styles, insert the TOC, and confirm it generates correctly.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What must you do before generating an automatic Table of Contents in Word?",
            options: [
              "Type all page numbers manually at the top of each section",
              "Apply Heading styles (Heading 1, Heading 2, etc.) to all section titles throughout the document",
              "Save the document as a PDF first",
              "Turn on Track Changes before building the TOC",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a complete multi-page operations manual for Lakeside Medical Associates that demonstrates professional header/footer configuration, automatic page numbering, a working Table of Contents, and at least one footnote with a regulatory citation.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Word document with a title page (Page 1): 'Lakeside Medical Associates — Front Desk Operations Manual' centered on the page with the date below. Enable 'Different First Page' so no header or footer appears on page 1.",
          "On pages 2 onward, insert a header with 'Lakeside Medical Associates — Confidential' left-aligned and the document title right-aligned. Insert a footer with 'Page X of Y' centered. Confirm the header and footer do not appear on page 1.",
          "Build at least 4 sections with Heading 1 titles and at least 2 subsections each with Heading 2 titles. Sections should cover: Patient Check-In Procedures, Telephone Communication Standards, Records Management, and Appointment Scheduling. Write 2–3 sentences of body text under each subsection (content can be realistic but brief).",
          "Insert an automatic Table of Contents on page 2 (after the title page) showing 2 levels of headings. After inserting the TOC, add a sentence to one section, then update the TOC to confirm it reflects the change.",
          "Add at least two footnotes in the Records Management section citing HIPAA regulations (e.g., 45 CFR §164.502 for patient privacy and 45 CFR §164.530 for administrative requirements). Save as 'Front Desk Operations Manual – Lakeside Medical.docx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed .docx file to your instructor or course folder. Your manual will be evaluated on: correct header (absent on page 1, present on pages 2+), working 'Page X of Y' footer, properly generated automatic TOC showing 2 heading levels, correct heading style usage throughout, and properly formatted footnotes with regulatory citations. A passing grade means this document could be given to a new front desk staff member at Lakeside Medical Associates immediately.",
      },
    ],
  },

  {
    slug: "track-changes-review",
    title: "Track Changes and Document Review",
    description:
      "Learn to collaborate on documents professionally using Track Changes, insert and respond to comments, compare document versions, and protect documents for controlled editing.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/p3Ql9y3eEyo?si=ZQ4tqLb9hhar33zv",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-01.jpg",
        alt: "What Track Changes Does — how Word marks insertions, deletions, and formatting changes",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-02.jpg",
        alt: "Turning Track Changes On and Off — the keyboard shortcut and Ribbon location",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-03.jpg",
        alt: "Understanding Markup — color-coded insertions, strikethrough deletions, and change balloons",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-04.jpg",
        alt: "Accepting and Rejecting Changes — individual changes vs accepting all at once",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-05.jpg",
        alt: "Inserting and Managing Comments — adding, replying, resolving, and deleting comments",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-06.jpg",
        alt: "Document Views During Review — Final, All Markup, Simple Markup, and Original modes",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-07.jpg",
        alt: "Comparing Two Document Versions — the Compare feature and reviewing the combined result",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-08.jpg",
        alt: "Restricting Editing and Document Protection — locking documents for specific editing permissions",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/track-changes-review/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct Track Changes action for a given review scenario",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates is updating its patient confidentiality policy. Your supervisor has written the first draft and emailed it to the office manager and the compliance officer for review. Both will make edits — but if they simply save over the original, the changes will be invisible and unattributed. Using Track Changes, each reviewer's edits appear in a different color, attributed to their name, and the final decision-maker can accept or reject each change individually. This is how professional document collaboration works — and it is a skill that immediately distinguishes experienced office professionals from beginners.",
          },
        ],
      },
      {
        heading: "How Track Changes Works",
        blocks: [
          {
            type: "paragraph",
            text: "Track Changes is Word's collaborative editing system — it records every insertion, deletion, and formatting change made to a document, along with who made it and when. Rather than simply changing the document text, Word annotates each change in a way that the document owner can review and decide to accept or reject:",
          },
          {
            type: "list",
            items: [
              "To turn Track Changes on, press Ctrl+Shift+E or click Review > Track Changes > Track Changes from the Ribbon. A highlighted Track Changes button in the Ribbon confirms it is active. Every change you make from this point forward is recorded — insertions appear underlined in a color assigned to your username, deletions appear as strikethrough text (or in balloons in the margin), and moved text is marked with double underline/strikethrough.",
              "Each reviewer is assigned a different color automatically — when multiple people review the same document, Word assigns each person's tracked changes a unique color so the document owner can immediately see who made which change. The color assignments are automatic and consistent throughout the review session. Reviewer identity comes from the name set in File > Options > General > 'User name.'",
              "Markup display modes control what you see — the Review tab > Tracking group > 'Show Markup' dropdown lets you filter which types of changes are visible (insertions, deletions, formatting, comments). The display mode dropdown (All Markup, Simple Markup, No Markup, Original) controls the overall view: 'All Markup' shows all tracked changes with full annotation, 'Simple Markup' shows a clean version with change indicators in the margin, 'No Markup' shows the final accepted state, and 'Original' shows the document before any changes.",
            ],
          },
        ],
      },
      {
        heading: "Accepting, Rejecting, and Managing Changes",
        blocks: [
          {
            type: "paragraph",
            text: "After all reviewers have submitted their tracked changes, the document owner reviews each change and decides to accept it (incorporate it permanently) or reject it (discard it and restore the original text). This process is the core workflow of professional collaborative document editing:",
          },
          {
            type: "list",
            items: [
              "To accept or reject individual changes: right-click any tracked change in the document and choose 'Accept Change' or 'Reject Change.' Or use the Review tab > Changes group, where Accept and Reject buttons let you act on the current change and move to the next. This method is best when reviewing a document with a mix of changes you agree with and some you disagree with — you decide each one on its merits.",
              "To accept all changes at once: click the dropdown arrow under Review > Accept > 'Accept All Changes.' Use this only when you have reviewed every change and are confident they are all correct — once accepted, the changes are finalized and cannot be individually reversed. If you have not reviewed every change, accepting all is risky.",
              "To reject all changes at once: click Review > Reject > 'Reject All Changes.' This restores the document to its original state before any tracked changes were made — appropriate when a review draft has been superseded or when reviewer changes are being discarded in favor of a completely new revision.",
              "After accepting or rejecting all changes, turn off Track Changes (Ctrl+Shift+E) before making any further edits — if Track Changes remains on, your clean-up edits will also be marked as changes, which clutters the document and suggests ongoing review when you intend a final state.",
            ],
          },
        ],
      },
      {
        heading: "Comments and Document Comparison",
        blocks: [
          {
            type: "paragraph",
            text: "Comments allow reviewers to ask questions, suggest ideas, or flag concerns without directly editing the document text. Document comparison allows you to see the differences between two saved versions of a file — even when Track Changes was not active during editing:",
          },
          {
            type: "list",
            items: [
              "To insert a comment: select the text you are commenting on (or place your cursor at that point), then press Ctrl+Alt+M or click Review > New Comment. A comment balloon appears in the right margin linked to your selected text. Type your comment — be specific and actionable: 'Should we add a deadline here?' is more useful than 'Fix this.' Comments are attributed to your username and timestamp automatically.",
              "Replying to comments creates a threaded conversation within the document — click inside an existing comment balloon and click the Reply button that appears. The reply is indented below the original comment and attributed to the replier. This allows a dialogue between the document author and reviewers without anyone having to rewrite the document or send emails back and forth. When a comment issue is resolved, click the comment's Resolve button to collapse it — it remains visible (grayed out) but is clearly marked as handled.",
              "Comparing two document versions: if a colleague edited a document without using Track Changes, you can still see what changed by using Review > Compare > Compare. Select the original document and the revised document, and Word generates a new combined document showing all differences as tracked changes. This is an invaluable recovery tool when someone edits and saves over an important document without tracking their changes.",
              "Restricting editing: use Review > Restrict Editing to limit what reviewers can change — you can allow only tracked changes (no direct editing), allow only comments (no changes at all), or protect specific sections while leaving others editable. You can set a password so only authorized users can turn off restrictions. This is appropriate for Lakeside Medical Associates policy documents that must go through formal review — reviewers can comment or suggest changes, but cannot make direct edits without approval.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Track Changes and Review",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-2/track-changes-review/infographic.png",
            alt: "Track Changes Quick Reference — turning on/off, markup color legend, accept/reject shortcuts, comment workflow, display mode guide, and document comparison steps",
            caption: "Track Changes Quick Reference — professional collaborative editing at Lakeside Medical Associates",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Tracked changes and comments in a document contain metadata — reviewer names, edit timestamps, and the original text before each change. Before sharing a document externally (to a patient, a referring physician, or a regulatory body), use File > Info > Check for Issues > Inspect Document to detect and remove all tracked changes, comments, and hidden metadata. Sending a policy document to an external party with visible reviewer disagreements in the tracked changes is unprofessional and potentially revealing of internal conflicts. Always accept or reject all changes and delete all comments before any document leaves Lakeside Medical Associates.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I work in a medical office and need to set up a professional document review workflow. What are the best practices for using Track Changes when multiple people review the same policy document? Describe the step-by-step process from the first draft through final approval, including who reviews, in what order, and how the final decision-maker should manage conflicting suggestions.' Use the response to design a formal document review SOP (Standard Operating Procedure) for Lakeside Medical Associates.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Before sharing a Lakeside Medical Associates policy document with an external regulatory agency, which step is essential to protect internal confidentiality?",
            options: [
              "Turn on Track Changes before sending",
              "Use Document Inspector to remove all tracked changes, comments, and hidden metadata",
              "Save the document in .doc format instead of .docx",
              "Print the document and scan it as a PDF",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Simulate a complete professional document review cycle for Lakeside Medical Associates, using Track Changes and comments to collaborate on a policy document draft — then finalize the document for external distribution.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open a Word document and write a 3-paragraph draft patient privacy notice for Lakeside Medical Associates (you may use ChatGPT to generate the content, then paste it in). Save it as 'Privacy Notice Draft – v1.docx.'",
          "Turn on Track Changes (Ctrl+Shift+E). Make at least 5 substantive edits to the document: insert two new sentences, delete one sentence, change at least 3 words, and reformat one heading. Confirm all changes appear as colored markup before turning Track Changes off.",
          "Add 3 comments in the document at different locations: one asking a clarifying question about the content, one suggesting a specific edit, and one flagging a compliance concern that needs supervisor review. Ensure each comment is specific and professional.",
          "Use Review > Compare to compare your edited v1 with a copy of the original (save a separate copy first to simulate a second reviewer's version). Review the comparison document to understand how the differences appear.",
          "Accept all tracked changes in the document, delete all resolved comments, then run Document Inspector (File > Info > Check for Issues > Inspect Document) and remove all remaining metadata. Save the clean final version as 'Privacy Notice – Final.docx' and export as PDF.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit four files to your instructor: the original draft (v1), the tracked-changes version with comments, the comparison document, and the clean final PDF. Your work will be evaluated on correct Track Changes operation, professional comment quality, successful Document Inspector cleanup, and a final PDF that contains no visible tracked changes or comments. This workflow represents how policy documents are professionally managed at Lakeside Medical Associates.",
      },
    ],
  },

  {
    slug: "templates-automation",
    title: "Templates and Document Automation",
    description:
      "Create reusable Word templates, build Quick Parts and AutoText entries for common phrases, and use content controls to create professional fillable forms for Lakeside Medical Associates.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/PafCMUVH_OA",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-2/templates-automation/slide-01.jpg",
        alt: "What Word Templates Are — .dotx format and how templates differ from regular documents",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/templates-automation/slide-02.jpg",
        alt: "Built-In Templates — the Word template gallery and when to use a built-in vs custom template",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/templates-automation/slide-03.jpg",
        alt: "Creating a Custom Template — building from a document and saving as .dotx",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/templates-automation/slide-04.jpg",
        alt: "Quick Parts and AutoText — saving reusable text blocks for instant insertion",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/templates-automation/slide-05.jpg",
        alt: "AutoCorrect — automatic text expansion for common phrases and abbreviations",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/templates-automation/slide-06.jpg",
        alt: "Building Blocks — organizing reusable content pieces in the Building Blocks gallery",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/templates-automation/slide-07.jpg",
        alt: "Content Controls for Fillable Forms — text boxes, dropdowns, date pickers, and checkboxes",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/templates-automation/slide-08.jpg",
        alt: "Knowledge Check — identifying the right automation tool for a given office task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates sends the same types of letters week after week: appointment confirmations, referral requests, insurance authorization letters, patient welcome letters. Your supervisor wants you to set up templates for each of these so any staff member can open a template, fill in the patient-specific details, and have a properly formatted, professional letter in under 2 minutes — without any risk of accidentally overwriting the template itself. This lesson shows you how to build that system.",
          },
        ],
      },
      {
        heading: "Word Templates: The Foundation of Efficient Document Production",
        blocks: [
          {
            type: "paragraph",
            text: "A Word template (.dotx file) is a pre-built document that serves as a starting point for new documents — it contains all the formatting, styles, layout settings, and standard content that should appear in every document of that type, but none of the variable content that changes each time. Understanding templates is one of the most impactful productivity investments a new office assistant can make:",
          },
          {
            type: "list",
            items: [
              "Templates guarantee consistency — every letter produced from the same template has identical margins, fonts, styles, letterhead, and structural layout. This eliminates the formatting variation that happens when different staff members each format their own letters from a blank document. At Lakeside Medical Associates, consistent formatting across all patient communications projects professionalism and institutional credibility.",
              "Templates protect the master layout from accidental changes — when you open a .dotx template file, Word creates a new, unsaved .docx document based on the template rather than opening the template itself for editing. This means you can fill in patient-specific information, save the completed letter, and the original template remains unchanged and ready for the next use. Editing a template requires deliberately right-clicking the file and choosing 'Open' (not double-clicking).",
              "Creating a custom template: build a document with all your standard formatting, styles, letterhead, and placeholder text exactly as you want it. Then use File > Save As and change the 'Save as type' dropdown to 'Word Template (*.dotx).' Save it to your Templates folder (Word will suggest this location automatically). Going forward, it will appear in the Personal section of the File > New template gallery.",
              "Using built-in Word templates: click File > New and browse the template gallery — Word provides hundreds of professionally designed templates for letters, memos, resumes, reports, invoices, and more. Choose a built-in template as a starting point and customize it for Lakeside Medical Associates by modifying the styles, replacing placeholder text, and saving it as a personal template under a new name.",
            ],
          },
        ],
      },
      {
        heading: "Quick Parts, AutoText, and AutoCorrect",
        blocks: [
          {
            type: "paragraph",
            text: "Quick Parts, AutoText, and AutoCorrect are three related features that allow you to insert frequently typed text with just a few keystrokes — reducing repetitive typing and ensuring that standard phrases are always spelled and formatted correctly:",
          },
          {
            type: "list",
            items: [
              "Quick Parts are reusable content blocks — paragraphs, formatted tables, letterhead elements, or any multi-line content — that you save once and insert anywhere with two clicks. To create a Quick Part: select the formatted content you want to save, click Insert > Quick Parts > Save Selection to Quick Part Gallery. Give it a descriptive name and category. To insert it later: click Insert > Quick Parts and choose your saved entry from the gallery. This is ideal for saving Lakeside Medical Associates' standard closing paragraph, privacy disclaimers, or HIPAA notice language that appears in multiple document types.",
              "AutoText is a subset of Quick Parts specifically designed for text content — it works the same way but is optimized for paragraph-length text entries. The practical difference is minimal; both live in the Building Blocks Organizer (Insert > Quick Parts > Building Blocks Organizer) and can be managed, renamed, or deleted from there.",
              "AutoCorrect goes one step further by automatically replacing a short code with a longer text whenever you type it and press Space or Enter — no menu navigation required. To set up an AutoCorrect entry: go to File > Options > Proofing > AutoCorrect Options. In the 'Replace' field, type a short code (e.g., 'lmadd'), and in the 'With' field, type the full expansion (e.g., '123 Lakeview Drive, Suite 200, Lakeside, CA 90210'). Press Add, then OK. Now whenever you type 'lmadd' and press Space, Word automatically expands it to the full address. Set up AutoCorrect entries for your most frequently typed phrases: the practice address, the practice phone number, common medical office terms, and standard closing phrases.",
            ],
          },
        ],
      },
      {
        heading: "Fillable Forms with Content Controls",
        blocks: [
          {
            type: "paragraph",
            text: "Content controls turn a Word template into a fillable form — restricting what users can change while guiding them to fill in only the designated fields. This is the professional way to create patient intake forms, referral request forms, and staff request forms in Word:",
          },
          {
            type: "list",
            items: [
              "Enable the Developer tab first: click File > Options > Customize Ribbon, check the 'Developer' checkbox in the right column, and click OK. The Developer tab now appears in the Ribbon and contains all content control tools.",
              "Types of content controls available: Rich Text Content Control (for multi-line formatted text), Plain Text Content Control (for single-line entries), Date Picker (for dates — displays a calendar popup when the user clicks the field), Combo Box or Drop-Down List (for selecting from a predefined list of options), and Check Box Content Control (for yes/no or multiple-choice fields). Insert any control by clicking in the document where you want it, then clicking the desired control type in the Developer tab.",
              "Protecting the form: after inserting all content controls, use Developer > Restrict Editing, set editing restrictions to 'Filling in forms,' and click 'Yes, Start Enforcing Protection' (with an optional password). Now users can only type in the content control fields — they cannot accidentally edit or delete the form's structure, labels, or standard text.",
              "Practical application: a patient intake form for Lakeside Medical Associates might include a Plain Text Content Control for patient name, a Date Picker for date of birth, a Drop-Down List for insurance type (Medicare, Medicaid, Blue Cross, Aetna, Self-Pay), and Check Box controls for a list of current medications. When protected, the receptionist fills in only the designated fields — the form structure is preserved every time.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Templates and Automation",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-2/templates-automation/infographic.png",
            alt: "Templates and Automation Quick Reference — template creation steps, Quick Parts saving workflow, AutoCorrect setup guide, content control types reference, and form protection steps",
            caption: "Templates and Automation Quick Reference — building efficient document systems for Lakeside Medical Associates",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Templates containing patient intake forms or standard letters on practice letterhead must be stored in Lakeside Medical Associates' secured network drive, not on individual staff members' personal computers. If a template is edited and saved incorrectly (overwriting the .dotx), it may corrupt the standard document format for everyone who uses it. Assign one person (your supervisor or office manager) as the template administrator responsible for maintaining and updating all official templates. Document automation tools like AutoCorrect entries and Quick Parts that contain patient information or standard clinical language should be reviewed annually for accuracy and compliance with current regulations.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I work as an office assistant at a medical clinic. Give me 10 specific AutoCorrect shortcut codes and their full expansions that would save me the most time in my daily Word document work. Include shortcuts for common medical office phrases, the types of form labels I would type repeatedly, and professional closing paragraphs for patient letters.' Use the response to set up all 10 AutoCorrect entries in your Word application and test each one by typing the shortcut code followed by Space.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What file extension identifies a Word template file that cannot be accidentally overwritten when you open it to create a new document?",
            options: [
              ".docx",
              ".dotx",
              ".doc",
              ".pdf",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a complete document automation system for Lakeside Medical Associates — a letter template, a Quick Parts library, and a protected fillable intake form. This challenge simulates the real setup you would perform on your first week as an office assistant.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a professional letter template for Lakeside Medical Associates in block format including: a text-based letterhead (practice name, address, phone, fax), date line with an auto-updating date field, inside address placeholder text, subject line, salutation, three body paragraph placeholders, and a closing and signature block. Apply Calibri 11pt body text and proper 1-inch margins. Save as 'Lakeside Medical Letter Template.dotx.'",
          "Create at least 4 Quick Parts entries for frequently used content: (1) the full practice address block, (2) a standard HIPAA privacy footer sentence, (3) a referral request opening paragraph, and (4) a professional closing paragraph. Test each Quick Part by inserting it into a blank document to confirm it inserts correctly.",
          "Set up 5 AutoCorrect entries for common medical office abbreviations and phrases (e.g., 'lma' → 'Lakeside Medical Associates,' 'hb' → 'HIPAA Business Associate,' and 3 others of your choice). Test each one in a blank Word document.",
          "Using the Developer tab, build a one-page patient intake form template with at least 6 content controls: Plain Text for patient name and phone number, Date Picker for date of birth, Drop-Down List for insurance type (with at least 4 options), Check Boxes for primary care vs specialist visit, and a Rich Text Content Control for 'Reason for visit.' Label each control clearly.",
          "Protect the intake form for 'Filling in forms only' without a password (so it can be updated later if needed). Test it by tabbing through each field and entering sample data to confirm it works correctly. Save as 'Patient Intake Form – Lakeside Medical.dotx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit three files to your instructor or course folder: (1) the letter template (.dotx), (2) a test document showing all 4 Quick Parts inserted and labeled, and (3) the protected patient intake form (.dotx). Your submission will be evaluated on template formatting quality, Quick Parts functionality, AutoCorrect setup (describe your 5 entries in a note), and intake form with correctly configured and protected content controls. This automation system would give Lakeside Medical Associates immediate productivity gains on day one.",
      },
    ],
  },

  {
    slug: "word-advanced-capstone",
    title: "Hands-On: Patient Newsletter with Mail Merge",
    description:
      "Apply all Word Advanced skills in a single integrated project — build a patient newsletter, perform a mail merge, incorporate Track Changes feedback, and deliver a final PDF-ready publication.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/X1n2VG1yxFs?si=WLrIc_XyiWiQtSBB",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/slide-01.jpg",
        alt: "Newsletter Layout Fundamentals — one-page vs multi-page, columns, and visual hierarchy",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/slide-02.jpg",
        alt: "Creating a Patient Data Table in Excel for the Mail Merge",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/slide-03.jpg",
        alt: "The Full Mail Merge Workflow — connecting the newsletter to the Excel data source",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/slide-04.jpg",
        alt: "Inserting a Table of Contents for a Multi-Page Newsletter",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/slide-05.jpg",
        alt: "Incorporating Track Changes Feedback from a Supervisor Review",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/slide-06.jpg",
        alt: "Final Review Checklist — everything to confirm before saving as PDF",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/slide-07.jpg",
        alt: "Saving the Final Newsletter as PDF for Email Distribution",
      },
      {
        src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/slide-08.jpg",
        alt: "Knowledge Check — reviewing the integrated Word Advanced workflow",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is the beginning of flu season. Your supervisor at Lakeside Medical Associates asks you to create the practice's quarterly patient newsletter, personalize it with a mail merge greeting for each of 10 patients on a test list, add a Table of Contents for the multi-page version, incorporate your supervisor's Track Changes feedback from a draft review, and deliver the final version as a PDF for email distribution by end of day. This is the full Word Advanced skill set applied to one real deliverable — the most realistic capstone exercise you will do in this module.",
          },
        ],
      },
      {
        heading: "Building a Newsletter Layout",
        blocks: [
          {
            type: "paragraph",
            text: "A professional newsletter uses structured layout tools to create visual interest and guide the reader's eye through the content. In Word, this is achieved through a combination of columns, heading styles, text boxes, and careful spacing — all within a structured template:",
          },
          {
            type: "list",
            items: [
              "A newsletter header spans the full width of the top of the first page — type 'Lakeside Medical Associates — Patient Health Quarterly' in large, bold text (24pt, dark blue or black) and below it the issue date and volume number in smaller text (12pt). This is the identity banner that makes the document recognizable as a newsletter, not a letter.",
              "For multi-column body layout, use Layout > Columns > Two to format the newsletter body in two columns — this creates the classic newsletter visual structure that is more scannable than a single full-width column. You can apply two-column layout to a section only (use a section break before and after the two-column area) while keeping the header at full width.",
              "Each newsletter section gets a Heading 1 style for its section title — 'Flu Season Reminders,' 'New Provider Spotlight,' 'Office Hours Update,' 'Wellness Tips' — these will populate the automatic Table of Contents. Body text within each section uses the Normal style. This consistent style usage is what makes the advanced features work correctly.",
              "A personalized greeting at the top of each newsletter — 'Dear [FirstName],' — is a merge field that mail merge will replace with each patient's actual first name. Place this merge field immediately below the newsletter header, before the first article section. This small personalization has a significant impact on patient engagement.",
            ],
          },
        ],
      },
      {
        heading: "The Integrated Workflow",
        blocks: [
          {
            type: "paragraph",
            text: "This capstone project combines every skill from Module 2 into one coherent workflow. The order of operations matters — completing each step correctly creates the foundation for the next:",
          },
          {
            type: "list",
            items: [
              "Step 1 — Build the Excel data source first: create a spreadsheet with columns FirstName, LastName, Email, and PatientID. Enter 10 fictional patient records. Save as 'Newsletter Recipients – Fall 2025.xlsx.' This is your mail merge data source.",
              "Step 2 — Build the newsletter main document: create the two-column newsletter layout in Word with at least three content sections (each with a Heading 1 title and 2–3 paragraphs of body text). Insert the merge field «FirstName» in the salutation line 'Dear «FirstName»,' using the Mailings > Insert Merge Field tool after connecting to the Excel data source.",
              "Step 3 — Insert a Table of Contents: on page 2 of the newsletter, insert an automatic TOC using References > Table of Contents. Confirm all three section headings appear correctly. Test the update function by temporarily changing one heading and updating the TOC.",
              "Step 4 — Track Changes review simulation: save the document, then turn on Track Changes and make 5 edits as if you were the supervisor reviewing the draft. Turn off Track Changes. Then, acting as the document owner, accept 3 changes and reject 2. Confirm the document reflects your decisions correctly.",
              "Step 5 — Complete the mail merge: connect the newsletter to the Excel data source, preview results for all 10 patients, and merge to a new document. Verify the first, fifth, and tenth merged letters to confirm the personalization is correct throughout.",
              "Step 6 — Final review and PDF export: check all pages in Print Preview, confirm the TOC reflects final page numbers, ensure no tracked changes or comments remain, and export the merged document as 'Patient Newsletter – Fall 2025 – Lakeside Medical.pdf.'",
            ],
          },
        ],
      },
      {
        heading: "Professional Quality Standards",
        blocks: [
          {
            type: "paragraph",
            text: "A patient newsletter distributed on behalf of Lakeside Medical Associates is a public-facing document that reflects the practice's brand, values, and professionalism. Before any newsletter is distributed, it must meet these professional quality standards:",
          },
          {
            type: "list",
            items: [
              "All medical information in the newsletter must be accurate, current, and approved by a licensed clinical staff member — office assistants should not independently write or approve clinical health advice. If your supervisor provides content, incorporate it exactly as approved. Flag any clinical content you wrote yourself and ask for provider review before the newsletter is distributed.",
              "All patient names in the merge must be correctly spelled and formatted — preview at least 20% of the merged letters before distributing, and check that first names appear in title case (Maria, not MARIA or maria). A newsletter that addresses a patient incorrectly by name is worse than an impersonal one.",
              "The newsletter must be free of spelling errors, grammar errors, and formatting inconsistencies — run Spelling & Grammar (F7) on the final document, visually review the two-column layout for any orphaned lines or awkward column breaks, and confirm all heading styles are consistent throughout.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Word Advanced Integration",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-2/word-advanced-capstone/infographic.png",
            alt: "Word Advanced Integration Quick Reference — capstone workflow diagram showing the six-step sequence from Excel data source creation through PDF export, with checkpoints at each stage",
            caption: "Word Advanced Capstone Quick Reference — integrated newsletter workflow",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "A patient newsletter distributed by email must comply with HIPAA's communication requirements — you may not email a document that contains one patient's information to another patient. In a mail merge to email, each patient receives only their own personalized copy. Verify your merge output carefully to ensure that each merged document contains only the personalized salutation for one patient — no other patient's name or information should appear anywhere in the body of any individual's newsletter. If distributing by postal mail, apply the same verification to ensure envelopes and letters are matched correctly before sealing and mailing.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write three 150-word patient newsletter articles for a small family medical practice's fall newsletter. The topics are: (1) flu vaccination reminders, (2) a brief introduction to a new provider Dr. Sarah Chen who is joining the practice in November, and (3) updated office hours for the holiday season. Write in a warm, professional tone appropriate for patients of all ages.' Use the generated articles as the body content for your newsletter template — review and lightly edit each article for accuracy and practice voice before inserting them into your Word newsletter layout.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In what order should you complete the Word Advanced capstone workflow to ensure each step builds correctly on the previous one?",
            options: [
              "TOC → Mail Merge → Newsletter Layout → Track Changes → PDF Export",
              "Excel Data Source → Newsletter Layout with Merge Fields → TOC → Track Changes Review → Mail Merge → PDF Export",
              "Mail Merge → Track Changes → Newsletter Layout → TOC → PDF Export",
              "PDF Export → Newsletter Layout → Excel Data Source → TOC → Mail Merge",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Produce a complete, distribution-ready patient newsletter for Lakeside Medical Associates using every Word Advanced skill covered in this module. Your final submission must include all five components listed below.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Build a two-page Word newsletter with a full-width header ('Lakeside Medical Associates — Patient Health Quarterly | Fall 2025 | Volume 3'), a Table of Contents on page 1, and three content sections on pages 1–2 formatted in two columns with Heading 1 style section titles and Normal style body text. Content topics: flu vaccine reminders, winter office hours update, and a patient wellness tip. Write or generate content for each section (minimum 100 words per section).",
          "Create an Excel data source with 10 fictional patient records (FirstName, LastName, Email). Connect it to your Word newsletter and insert a «FirstName» merge field in the salutation 'Dear «FirstName»,' above the first article. Preview all 10 records and confirm the salutation populates correctly.",
          "After completing the newsletter, simulate a supervisor review: turn on Track Changes, make 4 specific edits (change a word in the headline, add a sentence in one section, delete a sentence in another, and add a comment asking for provider approval of the clinical content). Save the tracked-changes version.",
          "Acting as the document owner, review and act on all tracked changes (accept 3, reject 1) and respond to the comment. Confirm no tracked changes or unresolved comments remain. Update the Table of Contents to reflect final page numbers.",
          "Merge the newsletter for all 10 patients into a new document. Spot-check 3 letters (first, fifth, and tenth). Export the merged newsletter as 'Patient Newsletter – Fall 2025 – Lakeside Medical.pdf.' Also save the newsletter template (.dotx) for future quarterly use.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit five files to your instructor or course folder: (1) the Excel data source, (2) the newsletter template (.dotx), (3) the tracked-changes version, (4) the merged 10-patient document (.docx), and (5) the final PDF. Your capstone will be graded on newsletter layout quality, correct TOC generation, proper mail merge execution across all 10 patients, Track Changes workflow, and clean final PDF with no residual tracked changes or metadata. Passing this capstone means you are ready to manage Word-based communications at any professional medical office.",
      },
    ],
  },
];
