import type { SimDefinition } from "@/types/sim";

export const pptModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::slide-basics": [
    {
      id: "ppt-m1-slide-basics-1",
      app: "powerpoint",
      title: "Build the flu clinic announcement",
      scenario: "Lakeside Medical is running a walk-in flu shot clinic. Your manager started a two-slide deck for the waiting-room screen and asked you to finish it.",
      fileName: "Flu Clinic.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Walk-In Flu Shot Clinic", subtitle: "Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "Who Should Get a Flu Shot", body: ["Everyone 6 months and older", "Adults 65 and older", "People with chronic conditions"] },
        ],
      },
      tasks: [
        {
          instruction: "After slide 2, add a new slide with the Title and Content layout.",
          hint: "Click slide 2 in the thumbnails. Home tab › Slides group › New Slide (or press Ctrl+M).",
          steps: [{ action: { kind: "command", id: "slides.new", value: "Title and Content" }, requires: { slide: "s2" }, selectHint: "Click slide 2 in the thumbnail pane first." }],
        },
        {
          instruction: "On the new slide, type the title “Clinic Hours”.",
          hint: "Click “Click to add title” on slide 3, type Clinic Hours, then press Enter or click outside the box.",
          steps: [{ action: { kind: "type", target: "s3.title", value: "Clinic Hours" } }],
        },
        {
          instruction: "Change the layout of slide 3 to Two Content.",
          hint: "With slide 3 selected: Home tab › Slides group › Layout › Two Content.",
          steps: [{ action: { kind: "command", id: "slides.layout", value: "Two Content" }, requires: { slide: "s3" } }],
        },
        {
          instruction: "Apply the Facet theme to the presentation.",
          hint: "Design tab › Themes gallery › Facet.",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Facet" } }],
        },
        {
          instruction: "Apply the Fade transition to slide 1.",
          hint: "Click slide 1. Transitions tab › Transition to This Slide › Fade.",
          steps: [{ action: { kind: "command", id: "transition.apply", value: "Fade" }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the thumbnails first." }],
        },
        {
          instruction: "Start the slide show from the beginning.",
          hint: "Slide Show tab › From Beginning (or press F5).",
          steps: [{ action: { kind: "command", id: "slideshow.fromBeginning" } }],
        },
      ],
    },
  ],
};
