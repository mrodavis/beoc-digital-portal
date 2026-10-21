import type { SimDefinition } from "@/types/sim";

/** PowerPoint Module 8: Review and Presenting. Keys are `${moduleSlug}::${lessonSlug}`. */
export const pptModule8Sims: Record<string, SimDefinition[]> = {
  "module-8::checking-spelling-and-comments": [
    {
      id: "ppt-m8-spelling-comments-1",
      app: "powerpoint",
      title: "Clean up the partner briefing before it is projected",
      scenario: "You present the community health partnership briefing to an outside partner tomorrow. Two typos and a reviewer's frank comments are still in the file. Fix the text, answer the review, and clear everything private out.",
      fileName: "Partner Briefing.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        theme: "Slice",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Community Health Partnership", subtitle: "Lakeside Medical Associates and Brookview Family Services" },
          { id: "s2", layout: "Title and Content", title: "Important Program Goals", body: ["Increase flu vacinations by 15%", "Reach 500 families this winter", "Share resources with partner clinics"], spell: [{ word: "vacinations", suggestions: ["vaccinations", "vacations"] }] },
          { id: "s3", layout: "Title and Content", title: "Outreach Results", body: ["Events held: 12", "Families reached: 430", "Vaccines given: 610"], notes: "Internal: confirm these numbers with Brookview before sending.", comments: [{ author: "Marcus Bell", text: "Is the families number final?" }] },
          { id: "s4", layout: "Title and Content", title: "Next Steps", body: ["Schedule the Febuary planning meeting", "Confirm the volunteer roster"], spell: [{ word: "Febuary", suggestions: ["February"] }], comments: [{ author: "Marcus Bell", text: "Can we lock in the meeting date before this goes out?" }] },
          { id: "s5", layout: "Title Only", title: "Thank You" },
        ],
      },
      tasks: [
        {
          instruction: "Check the spelling of the whole presentation and correct both misspelled words.",
          hint: "Review tab › Proofing › Spelling (or press F7). In the Spelling pane, click vaccinations, then February. You can also right-click a red-underlined word and pick the correction.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "review.spelling" } },
            { action: { kind: "command", id: "spelling.change", value: "vaccinations" } },
            { action: { kind: "command", id: "spelling.change", value: "February" } },
          ],
        },
        {
          instruction: "On slide 2, use the Thesaurus to replace “Important” in the title with the stronger word “Essential”.",
          hint: "Click the slide 2 title. Review tab › Proofing › Thesaurus (or Shift+F7). In the Thesaurus pane, click Insert next to Essential.",
          steps: [
            { action: { kind: "command", id: "review.thesaurus" }, requires: { slide: "s2", selection: "s2.title" }, selectHint: "Click the title “Important Program Goals” on slide 2 first." },
            { action: { kind: "command", id: "thesaurus.insert", value: "Essential" } },
          ],
        },
        {
          instruction: "Add a comment to slide 3 that says “Update with the final October totals.”",
          hint: "Go to slide 3. Review tab › Comments › New Comment (or Insert tab › Comment). Type the comment, then click Post.",
          steps: [{ action: { kind: "dialog", id: "newComment", values: { text: "Update with the final October totals." } }, requires: { slide: "s3" }, selectHint: "Go to slide 3 first." }],
        },
        {
          instruction: "On slide 4, reply to Marcus Bell's comment with “Confirmed for February 12.”",
          hint: "Go to slide 4 and open the Comments pane (Review tab › Show Comments). Click in the Reply box under Marcus Bell's comment, type the reply, and press Enter.",
          steps: [{ action: { kind: "command", id: "comment.reply", value: "Confirmed for February 12." }, requires: { slide: "s4" }, selectHint: "Go to slide 4 so its comment shows in the Comments pane." }],
        },
        {
          instruction: "Delete every comment in the presentation so none can show during the briefing.",
          hint: "Review tab › Comments › Delete arrow › Delete All Comments in Presentation.",
          steps: [{ action: { kind: "command", id: "review.deleteComment", value: "Delete All Comments in Presentation" }, alt: [{ kind: "command", id: "inspector.remove", value: "Comments" }] }],
        },
        {
          instruction: "Inspect the presentation for hidden information you would not want a partner to see.",
          hint: "File › Info › Inspect Presentation › Inspect Presentation.",
          steps: [{ action: { kind: "command", id: "file.inspect", value: "Inspect Presentation" } }],
        },
        {
          instruction: "Remove the presentation notes the inspector found.",
          hint: "In the Document Inspector pane, click Remove All next to Presentation Notes.",
          steps: [{ action: { kind: "command", id: "inspector.remove", value: "Presentation Notes" } }],
        },
      ],
    },
  ],

  "module-8::presenting-your-slideshow": [
    {
      id: "ppt-m8-presenting-1",
      app: "powerpoint",
      title: "Answer questions without fighting the software",
      scenario: "You present the Q4 update at the Lakeside Medical Associates staff meeting. Keep a backup slide hidden for the wait time question you expect, and practice the controls that let you respond to the room.",
      fileName: "Staff Meeting - Q4 Update.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        theme: "Integral",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Q4 Update", subtitle: "Staff Meeting · Lakeside Medical Associates", notes: "Thank everyone for covering during the flu clinic weeks." },
          { id: "s2", layout: "Title and Content", title: "Where We Are", body: ["Visits up 9% this quarter", "Two new providers started"], notes: "Keep this to one minute." },
          { id: "s3", layout: "Title and Content", title: "Patient Survey Results", body: ["Overall rating: 4.6 out of 5", "Most praised: the front desk", "Top concern: wait times"] },
          { id: "s4", layout: "Title and Content", title: "What We're Changing", body: ["Text alerts when providers run late", "A second check-in kiosk"] },
          { id: "s5", layout: "Title and Content", title: "Holiday Schedule", body: ["Closed November 26 and 27", "Closed December 25"] },
          { id: "s6", layout: "Title and Content", title: "Recognition", body: ["Front desk team: survey shout-outs", "Billing team: fewest denials this year"] },
          { id: "s7", layout: "Title Only", title: "Questions?" },
          { id: "s8", layout: "Title and Content", title: "Backup: Wait Times by Day", body: ["Monday: 21 minutes", "Wednesday: 12 minutes", "Friday: 18 minutes"] },
        ],
      },
      tasks: [
        {
          instruction: "Add the speaker note “Thank the front desk team for the survey results.” to slide 3.",
          hint: "Click slide 3. Double-click the Notes pane under the slide, type the note, then click outside it.",
          steps: [{ action: { kind: "type", target: "s3.notes", value: "Thank the front desk team for the survey results." } }],
        },
        {
          instruction: "Hide slide 8 so the show skips it unless you need it.",
          hint: "Right-click slide 8 in the thumbnails › Hide Slide (or Slide Show tab › Hide Slide).",
          steps: [{ action: { kind: "command", id: "slides.hide" }, alt: [{ kind: "command", id: "slideshow.hideSlide" }], requires: { slide: "s8" }, selectHint: "Click slide 8 in the thumbnails first." }],
        },
        {
          instruction: "Start the slide show from slide 2.",
          hint: "Click slide 2 in the thumbnails, then press Shift+F5 (or Slide Show tab › From Current Slide).",
          steps: [{ action: { kind: "command", id: "slideshow.fromCurrent" }, alt: [{ kind: "command", id: "slideshow.presenterStart" }], requires: { slide: "s2" }, selectHint: "Click slide 2 in the thumbnails before you start the show." }],
        },
        {
          instruction: "Someone asks about wait times by day. Jump to the hidden slide 8.",
          hint: "While presenting, type 8 and press Enter (or right-click › See All Slides › slide 8).",
          steps: [{ action: { kind: "command", id: "slideshow.goto", value: "8" } }],
        },
        {
          instruction: "Turn on the laser pointer to point at Monday's wait time.",
          hint: "Press Ctrl+L, or click the pen button on the slide show toolbar › Laser Pointer.",
          steps: [{ action: { kind: "command", id: "slideshow.pointer", value: "Laser Pointer" } }],
        },
        {
          instruction: "Blank the screen to white while the discussion continues.",
          hint: "Press W (or right-click › Screen: White Screen). Press W again to bring the slide back.",
          steps: [{ action: { kind: "command", id: "slideshow.screen", value: "White" } }],
        },
        {
          instruction: "Switch to Presenter View without leaving the show.",
          hint: "Right-click the slide › Show Presenter View (or the ··· button on the slide show toolbar › Show Presenter View).",
          steps: [{ action: { kind: "command", id: "slideshow.showPresenter" } }],
        },
        {
          instruction: "End the slide show.",
          hint: "Press Esc (or click End Slide Show at the top of Presenter View).",
          steps: [{ action: { kind: "command", id: "slideshow.end" } }],
        },
      ],
    },
    {
      id: "ppt-m8-presenting-2",
      app: "powerpoint",
      title: "Set up the self-running waiting room show",
      scenario: "The waiting room TV at Lakeside Medical Associates runs a loop of patient announcements with nobody at the keyboard. Set it up as a kiosk show that advances on its own.",
      fileName: "Waiting Room Loop.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        theme: "Ion",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Welcome to Lakeside Medical Associates", subtitle: "Please check in at the kiosk or front desk" },
          { id: "s2", layout: "Title and Content", title: "Flu Shots Every Tuesday", body: ["Walk-ins welcome, 8:00 AM to 12:00 PM", "Ask about our family flu clinic"] },
          { id: "s3", layout: "Title and Content", title: "Try the Patient Portal", body: ["See results and message your care team", "Sign up at the front desk"] },
          { id: "s4", layout: "Title and Content", title: "Holiday Hours", body: ["Closed November 26 and 27", "Closed December 25"] },
          { id: "s5", layout: "Title and Content", title: "Staff Notes: Display Schedule", body: ["TV on at 7:45 AM", "Update this loop every Monday"] },
        ],
      },
      tasks: [
        {
          instruction: "Set up the slide show to be browsed at a kiosk (full screen).",
          hint: "Slide Show tab › Set Up Slide Show. Under Show type choose Browsed at a kiosk (full screen), then click OK.",
          steps: [{ action: { kind: "dialog", id: "setupShow", values: { showType: "Browsed at a kiosk (full screen)" } } }],
        },
        {
          instruction: "Slide 5 is for staff only. Hide it so it never appears on the waiting room TV.",
          hint: "Right-click slide 5 in the thumbnails › Hide Slide (or Slide Show tab › Hide Slide).",
          steps: [{ action: { kind: "command", id: "slides.hide" }, alt: [{ kind: "command", id: "slideshow.hideSlide" }], requires: { slide: "s5" }, selectHint: "Click slide 5 in the thumbnails first." }],
        },
        {
          instruction: "Apply the Fade transition and use it on every slide.",
          hint: "Transitions tab › Transition to This Slide › Fade, then Transitions tab › Timing › Apply To All.",
          steps: [
            { action: { kind: "command", id: "transition.apply", value: "Fade" } },
            { action: { kind: "command", id: "transition.applyAll" } },
          ],
        },
        {
          instruction: "Rehearse the slide timings: start a rehearsal, read each slide, end the show, and keep the new timings.",
          hint: "Slide Show tab › Rehearse Timings. Click Next (or press the Right Arrow) on each slide, press Esc after the last one, then click Yes to keep the timings.",
          steps: [
            { action: { kind: "command", id: "slideshow.rehearse" } },
            { action: { kind: "command", id: "slideshow.keepTimings", value: "Yes" } },
          ],
        },
        {
          instruction: "Change slide 3 so it stays on screen for 10 seconds.",
          hint: "Click slide 3. Transitions tab › Timing group › After: type 00:10.00 (or 10) and press Enter.",
          steps: [{ action: { kind: "command", id: "transition.advanceAfter", value: ["00:10.00", "10", "10.00", "00:10", "0:10", "00:10.0"] }, requires: { slide: "s3" }, selectHint: "Click slide 3 first." }],
        },
        {
          instruction: "Start the show from the beginning and watch it run on its own.",
          hint: "Slide Show tab › From Beginning (or press F5). Press Esc when you have seen it advance.",
          steps: [{ action: { kind: "command", id: "slideshow.fromBeginning" } }],
        },
      ],
    },
  ],

  "module-8::sharing-and-exporting": [
    {
      id: "ppt-m8-sharing-1",
      app: "powerpoint",
      title: "Send each audience the right version",
      scenario: "The new hire orientation deck is saved in OneDrive. A colleague will update it next quarter, a partner organization only needs to read it, new hires watch it on their own, and a trainer at the satellite office will present it.",
      fileName: "New Hire Orientation.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        theme: "Facet",
        saved: { name: "New Hire Orientation.pptx", location: "OneDrive - Personal", autosave: true },
        slides: [
          { id: "s1", layout: "Title Slide", title: "New Hire Orientation", subtitle: "Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "Your First Week", body: ["Badge and parking permit", "HIPAA training", "Meet your team lead"] },
          { id: "s3", layout: "Title and Content", title: "How We Work", body: ["Patients first", "Ask before you guess", "Document as you go"] },
          { id: "s4", layout: "Title Only", title: "Welcome to the Team" },
        ],
      },
      tasks: [
        {
          instruction: "Share the presentation with jordan.reyes@lakeside.example, who will update it next quarter, with permission to edit.",
          hint: "File › Share. Type the email address, keep Can edit, then click Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "jordan.reyes@lakeside.example", permission: "Can edit" } } }],
        },
        {
          instruction: "Share it with partners@brookview.example as view-only, with the message “Please review before Friday.”",
          hint: "File › Share. Type the email address, change the permission to Can view, type the message, then click Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "partners@brookview.example", permission: "Can view", message: "Please review before Friday." } } }],
        },
        {
          instruction: "Export a PDF named “New Hire Orientation - Partner Copy” for readers who do not need to edit it.",
          hint: "File › Export › Create PDF/XPS Document. Type the name, then click Create PDF/XPS.",
          steps: [{
            action: { kind: "dialog", id: "file.exportPdf", values: { name: "New Hire Orientation - Partner Copy" } },
            alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "New Hire Orientation - Partner Copy", format: "PDF (*.pdf)" } }],
          }],
        },
        {
          instruction: "Email a PDF copy of the presentation.",
          hint: "File › Share › Send a copy › PDF.",
          steps: [{ action: { kind: "command", id: "file.email", value: "PDF" } }],
        },
        {
          instruction: "Mark the presentation as final to show readers it is complete.",
          hint: "File › Info › Protect Presentation › Mark as Final.",
          steps: [{ action: { kind: "command", id: "file.protect", value: "Mark as Final" } }],
        },
        {
          instruction: "Save a copy as an MPEG-4 video named “New Hire Orientation - Video” for new hires to watch on their own.",
          hint: "File › Save As › OneDrive - Personal (or This PC). Type the name, choose MPEG-4 Video (*.mp4) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "New Hire Orientation - Video", format: "MPEG-4 Video (*.mp4)" } } }],
        },
        {
          instruction: "Save a copy named “Orientation - Present Only” that opens straight into the slide show for the satellite office trainer.",
          hint: "File › Save As. Type the name, choose PowerPoint Show (*.ppsx) as the file type, then click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Orientation - Present Only", format: "PowerPoint Show (*.ppsx)" } } }],
        },
      ],
    },
  ],
};
