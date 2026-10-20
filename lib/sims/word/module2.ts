import type { SimDefinition } from "@/types/sim";

/** Word Module 2: Basic Formatting. Keys are `${moduleSlug}::${lessonSlug}`. */
export const wordModule2Sims: Record<string, SimDefinition[]> = {
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
  ],
};
