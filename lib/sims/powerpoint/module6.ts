import type { SimDefinition } from "@/types/sim";

/** PowerPoint Module 6: Animations and Multimedia. Keys are `${moduleSlug}::${lessonSlug}`. */
export const pptModule6Sims: Record<string, SimDefinition[]> = {
  "module-6::applying-transitions": [
    {
      id: "ppt-m6-transitions-1",
      app: "powerpoint",
      title: "One subtle transition for the board update",
      scenario: "The board update deck at Lakeside Medical Associates spins, flips, and checkerboards between slides. Replace the noise with one quick, consistent transition and mark the one real section break.",
      fileName: "Board Update.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        theme: "Madison",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Board Update", subtitle: "Q3 2026 · Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "Patient Volume", body: ["10,480 visits in Q3", "Up 9% from Q2"], transition: "Vortex" },
          { id: "s3", layout: "Title and Content", title: "Patient Satisfaction", body: ["Overall rating: 4.6 out of 5", "Top concern: parking"], transition: "Checkerboard" },
          { id: "s4", layout: "Section Header", title: "Budget", subtitle: "Where the money went", transition: "Flip" },
          { id: "s5", layout: "Title and Content", title: "Spending vs. Plan", body: ["Staffing: 3% over plan", "Supplies: on plan", "Equipment: deferred"] },
          { id: "s6", layout: "Title Only", title: "Questions" },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Push transition to slide 1.",
          hint: "Click slide 1. Transitions tab › Transition to This Slide gallery › Push.",
          steps: [{ action: { kind: "command", id: "transition.apply", value: "Push" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." }],
        },
        {
          instruction: "Change the effect so slide 1 pushes in from the right.",
          hint: "Transitions tab › Effect Options › From Right.",
          steps: [{ action: { kind: "command", id: "transition.effect", value: "From Right" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." }],
        },
        {
          instruction: "Set the transition duration on slide 1 to 0.5 seconds.",
          hint: "Transitions tab › Timing group › Duration: type 00.50 (or 0.5) and press Enter.",
          steps: [{ action: { kind: "command", id: "transition.duration", value: "00.50" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." }],
        },
        {
          instruction: "Set slide 1 to advance automatically after 3 seconds.",
          hint: "Transitions tab › Timing group › After: type 00:03.00 (or 3) and press Enter.",
          steps: [{ action: { kind: "command", id: "transition.advanceAfter", value: ["00:03.00", "3", "03.00", "3.00", "00:03", "0:03", "00:03.0"] }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." }],
        },
        {
          instruction: "Use slide 1's transition and timing on every slide in the presentation.",
          hint: "With slide 1 selected: Transitions tab › Timing group › Apply To All.",
          steps: [{ action: { kind: "command", id: "transition.applyAll" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." }],
        },
        {
          instruction: "Slide 4 starts the budget section. Change its transition to Fade so the section break stands out.",
          hint: "Click slide 4. Transitions tab › Transition to This Slide gallery › Fade.",
          steps: [{ action: { kind: "command", id: "transition.apply", value: "Fade" }, requires: { slide: "s4" }, selectHint: "Click slide 4, “Budget”, in the thumbnails first." }],
        },
        {
          instruction: "Preview the transition on slide 4.",
          hint: "Transitions tab › Preview.",
          steps: [{ action: { kind: "command", id: "transition.preview" } }],
        },
      ],
    },
  ],

  "module-6::animating-text-and-objects": [
    {
      id: "ppt-m6-animations-1",
      app: "powerpoint",
      title: "Reveal the check-in stages in order",
      scenario: "You are explaining the four stages of patient check-in to new front desk staff. Animate the slide so the title arrives first and the stages follow, and draw the eye to one arrow on the next slide.",
      fileName: "Patient Check-In Process.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Patient Check-In Process", subtitle: "Front Desk Training" },
          { id: "s2", layout: "Title and Content", title: "Four Stages of Check-In", body: ["Greet the patient", "Verify identity and insurance", "Update the chart", "Direct the patient to the waiting area"] },
          {
            id: "s3",
            layout: "Title Only",
            title: "Where Patients Wait",
            objects: [
              { id: "o1", kind: "image", label: "clinic-lobby.jpg", glyph: "🛋️", x: 8, y: 26, w: 52, h: 66 },
              { id: "o2", kind: "shape", label: "Arrow: Right", shape: "arrow", fill: "#C00000", text: "Kiosks", x: 64, y: 48, w: 26, h: 18 },
            ],
          },
        ],
      },
      tasks: [
        {
          instruction: "On slide 2, apply the Fly In entrance animation to the title.",
          hint: "Click the title on slide 2. Animations tab › Animation gallery › Fly In.",
          steps: [{ action: { kind: "command", id: "animation.apply", value: "Fly In" }, alt: [{ kind: "command", id: "animation.add", value: "Fly In" }], requires: { slide: "s2", selection: "s2.title" }, selectHint: "Click the title “Four Stages of Check-In” first." }],
        },
        {
          instruction: "Make the title fly in from the left.",
          hint: "With the title selected: Animations tab › Effect Options › From Left.",
          steps: [{ action: { kind: "command", id: "animation.effect", value: "From Left" }, alt: [{ kind: "dialog", id: "animEffect", values: { direction: "From Left" } }], requires: { slide: "s2", selection: ["s2.title", "s2.title.anim"] }, selectHint: "Click the title “Four Stages of Check-In” first (or its effect in the Animation Pane)." }],
        },
        {
          instruction: "Apply the Fade entrance animation to the bulleted list on slide 2.",
          hint: "Click the list (press Ctrl+A to select all of it). Animations tab › Animation gallery › Fade.",
          steps: [{ action: { kind: "command", id: "animation.apply", value: "Fade" }, alt: [{ kind: "command", id: "animation.add", value: "Fade" }], requires: { slide: "s2", selection: "s2.body" }, selectHint: "Select the whole list placeholder on slide 2: click inside it and press Ctrl+A." }],
        },
        {
          instruction: "Set the list's animation to start automatically after the title's animation.",
          hint: "With the list selected: Animations tab › Timing group › Start › After Previous.",
          steps: [{ action: { kind: "command", id: "animation.start", value: "After Previous" }, alt: [{ kind: "dialog", id: "animTiming", values: { start: "After Previous" } }, { kind: "dialog", id: "animEffect", values: { start: "After Previous" } }], requires: { slide: "s2", selection: ["s2.body", "s2.body.anim"] }, selectHint: "Select the list placeholder on slide 2 first (or its effect in the Animation Pane)." }],
        },
        {
          instruction: "Open the Animation Pane to check the order of the animations.",
          hint: "Animations tab › Advanced Animation group › Animation Pane.",
          steps: [{ action: { kind: "command", id: "animation.pane" } }],
        },
        {
          instruction: "Preview the animations on slide 2.",
          hint: "Click Play All at the top of the Animation Pane (or Animations tab › Preview).",
          steps: [{ action: { kind: "command", id: "animation.preview" } }],
        },
        {
          instruction: "On slide 3, apply the Pulse emphasis animation to the red “Kiosks” arrow.",
          hint: "Click the arrow on slide 3. Animations tab › Animation gallery › Pulse (in the Emphasis group; click the More arrow if you do not see it).",
          steps: [{ action: { kind: "command", id: "animation.apply", value: "Pulse" }, alt: [{ kind: "command", id: "animation.add", value: "Pulse" }], requires: { slide: "s3", selection: "s3.o2" }, selectHint: "Click the red “Kiosks” arrow on slide 3 first." }],
        },
        {
          instruction: "Set the arrow's animation duration to 1 second.",
          hint: "With the arrow selected: Animations tab › Timing group › Duration: type 01.00 (or 1) and press Enter.",
          steps: [{ action: { kind: "command", id: "animation.duration", value: "01.00" }, alt: [{ kind: "dialog", id: "animTiming", values: { duration: 1 } }, { kind: "dialog", id: "animEffect", values: { duration: 1 } }], requires: { slide: "s3", selection: ["s3.o2", "s3.o2.anim"] }, selectHint: "Click the red “Kiosks” arrow on slide 3 first (or its effect in the Animation Pane)." }],
        },
      ],
    },
  ],

  "module-6::working-with-audio": [
    {
      id: "ppt-m6-audio-1",
      app: "powerpoint",
      title: "Background music for the waiting room display",
      scenario: "You are building a self-running display for the Lakeside Medical Associates waiting room. The licensed background track needs to start on its own, keep playing across slides, and stay out of sight.",
      fileName: "Waiting Room Display.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        theme: "Ion",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Welcome to Lakeside Medical Associates", subtitle: "Please check in at the kiosk or front desk" },
          { id: "s2", layout: "Title and Content", title: "Flu Shots Are Here", body: ["Walk-ins every Tuesday", "Ask your provider today"] },
          { id: "s3", layout: "Title and Content", title: "Sign Up for the Patient Portal", body: ["See test results", "Message your care team", "Request refills"] },
          { id: "s4", layout: "Title and Content", title: "Wi-Fi for Patients", body: ["Network: Lakeside-Guest", "No password needed"] },
          { id: "s5", layout: "Title Only", title: "Thank You for Your Patience" },
        ],
      },
      tasks: [
        {
          instruction: "On slide 1, insert the audio file waiting-room-music.mp3 from your computer.",
          hint: "Go to slide 1. Insert tab › Media group › Audio › Audio on My PC…, choose waiting-room-music.mp3, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "insertAudio", values: { file: "waiting-room-music.mp3" } }, requires: { slide: "s1" }, selectHint: "Go to slide 1 first." }],
        },
        {
          instruction: "Set the audio to start automatically.",
          hint: "With the speaker icon selected: Playback tab › Audio Options › Start › Automatically.",
          steps: [{ action: { kind: "command", id: "media.start", value: "Automatically" }, requires: { slide: "s1", selection: "s1.o1" }, selectHint: "Click the speaker icon on slide 1 first." }],
        },
        {
          instruction: "Keep the music playing as the slides advance.",
          hint: "Playback tab › Audio Options › check Play Across Slides.",
          steps: [{ action: { kind: "command", id: "media.playAcross" }, requires: { slide: "s1", selection: "s1.o1" }, selectHint: "Click the speaker icon on slide 1 first." }],
        },
        {
          instruction: "Make the music repeat until the show is stopped.",
          hint: "Playback tab › Audio Options › check Loop until Stopped.",
          steps: [{ action: { kind: "command", id: "media.loop" }, requires: { slide: "s1", selection: "s1.o1" }, selectHint: "Click the speaker icon on slide 1 first." }],
        },
        {
          instruction: "Hide the speaker icon while the show is running.",
          hint: "Playback tab › Audio Options › check Hide During Show.",
          steps: [{ action: { kind: "command", id: "media.hide" }, requires: { slide: "s1", selection: "s1.o1" }, selectHint: "Click the speaker icon on slide 1 first." }],
        },
        {
          instruction: "Trim the audio so it stops at 30 seconds.",
          hint: "Playback tab › Editing › Trim Audio. Set End Time to 30, then click OK.",
          steps: [{ action: { kind: "dialog", id: "trimAudio", values: { end: 30 } }, requires: { slide: "s1", selection: "s1.o1" }, selectHint: "Click the speaker icon on slide 1 first." }],
        },
        {
          instruction: "Set the audio volume to Low so it does not compete with conversation.",
          hint: "Playback tab › Audio Options › Volume › Low.",
          steps: [{ action: { kind: "command", id: "media.volume", value: "Low" }, requires: { slide: "s1", selection: "s1.o1" }, selectHint: "Click the speaker icon on slide 1 first." }],
        },
        {
          instruction: "Start the slide show from the beginning to check the audio.",
          hint: "Slide Show tab › From Beginning (or press F5).",
          steps: [{ action: { kind: "command", id: "slideshow.fromBeginning" } }],
        },
      ],
    },
  ],

  "module-6::working-with-video": [
    {
      id: "ppt-m6-video-1",
      app: "powerpoint",
      title: "Make the hand washing video play anywhere",
      scenario: "You are presenting infection control training from the conference room computer. Embed the hand washing video so it travels with the file, trim it, and set it up to play cleanly.",
      fileName: "Infection Control Training.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Infection Control Training", subtitle: "Annual Staff Requirement" },
          { id: "s2", layout: "Title and Content", title: "Why Hand Hygiene Matters", body: ["Hands carry most germs between patients", "Clean hands cut infections sharply"] },
          { id: "s3", layout: "Title and Content", title: "Watch: Proper Hand Washing" },
          { id: "s4", layout: "Title and Content", title: "Your Turn", body: ["Practice at the demo sink", "Ask the infection control nurse for feedback"] },
        ],
      },
      tasks: [
        {
          instruction: "On slide 3, insert the video handwashing-steps.mp4 from your computer.",
          hint: "Go to slide 3 and click the Insert Video icon in the placeholder (or Insert tab › Video › This Device…). Choose handwashing-steps.mp4, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "insertVideo", values: { file: "handwashing-steps.mp4" } }, requires: { slide: "s3" }, selectHint: "Go to slide 3 first." }],
        },
        {
          instruction: "Set the video to start automatically.",
          hint: "With the video selected: Playback tab › Video Options › Start › Automatically.",
          steps: [{ action: { kind: "command", id: "media.start", value: "Automatically" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the video on slide 3 first." }],
        },
        {
          instruction: "Have the video go back to its first frame when it finishes.",
          hint: "Playback tab › Video Options › check Rewind after Playing.",
          steps: [{ action: { kind: "command", id: "media.rewind" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the video on slide 3 first." }],
        },
        {
          instruction: "The clip is 45 seconds long. Trim the first 5 seconds and the last 5 seconds.",
          hint: "Playback tab › Editing › Trim Video. Set Start Time to 5 and End Time to 40, then click OK.",
          steps: [{ action: { kind: "dialog", id: "trimVideo", values: { start: 5, end: 40 } }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the video on slide 3 first." }],
        },
        {
          instruction: "Apply the Simple Frame, White video style.",
          hint: "Video Format tab › Video Styles gallery › Simple Frame, White.",
          steps: [{ action: { kind: "command", id: "video.style", value: "Simple Frame, White" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the video on slide 3 first." }],
        },
        {
          instruction: "Use a frame from inside the clip as the poster frame: move the playhead past the start, then set the current frame as the poster.",
          hint: "In the playback bar under the video, click a point on the timeline (or press Play, then Pause). Then Video Format tab › Adjust › Poster Frame › Current Frame.",
          steps: [
            { action: { kind: "command", id: "media.seek" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the video on slide 3 so its playback bar appears." },
            { action: { kind: "command", id: "video.posterFrame", value: "Current Frame" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the video on slide 3 first." },
          ],
        },
        {
          instruction: "Play the video full screen during the slide show.",
          hint: "Playback tab › Video Options › check Play Full Screen.",
          steps: [{ action: { kind: "command", id: "media.fullScreen" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the video on slide 3 first." }],
        },
        {
          instruction: "Add the alt text “Nurse demonstrating the steps of hand washing” to the video.",
          hint: "Right-click the video › View Alt Text… (or Video Format tab › Alt Text). Type the description, then click OK.",
          steps: [{ action: { kind: "dialog", id: "altText", values: { text: "Nurse demonstrating the steps of hand washing" } }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the video on slide 3 first." }],
        },
      ],
    },
  ],
};
