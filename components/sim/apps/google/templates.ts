import type { ExcelBook, ExcelCell, PptDeck, WordDoc } from "@/types/sim";
import type { GHomeApp, GKind } from "./types";

/**
 * Templates on the app home screens (the strip under "Start a new …" and the
 * Template gallery) and in Docs' File › New › From a template. The real
 * galleries are much larger; these are a few common ones with simple content
 * the learner can edit. Content uses placeholder text the learner replaces.
 */
export type GTemplate = { name: string; app: GHomeApp; kind: GKind; content: () => WordDoc | ExcelBook | PptDeck };

const header = (cells: Record<string, ExcelCell>, cols: string[], labels: string[], fill = "#cfe2f3") =>
  labels.forEach((l, i) => (cells[`${cols[i]}1`] = { v: l, fmt: { bold: true, fill } }));

export const TEMPLATES: GTemplate[] = [
  {
    name: "Letter",
    app: "docs",
    kind: "doc",
    content: () => ({
      paragraphs: [
        { id: "p1", text: "Your Company", style: "Title" },
        { id: "p2", text: "123 Your Street, Your City, ST 12345" },
        { id: "p3", text: "" },
        { id: "p4", text: "Date" },
        { id: "p5", text: "Recipient Name" },
        { id: "p6", text: "Recipient Address" },
        { id: "p7", text: "" },
        { id: "p8", text: "Dear Recipient," },
        { id: "p9", text: "Write the body of your letter here. Keep it short and clear: say why you are writing, what you need, and what happens next." },
        { id: "p10", text: "Sincerely," },
        { id: "p11", text: "Your Name" },
      ],
    }),
  },
  {
    name: "Resume",
    app: "docs",
    kind: "doc",
    content: () => ({
      paragraphs: [
        { id: "p1", text: "Your Name", style: "Title" },
        { id: "p2", text: "Phone · Email · City, State" },
        { id: "p3", text: "Experience", style: "Heading 1" },
        { id: "p4", text: "Job Title, Company, Dates" },
        { id: "p5", text: "Education", style: "Heading 1" },
        { id: "p6", text: "Program, School, Year" },
        { id: "p7", text: "Skills", style: "Heading 1" },
        { id: "p8", text: "List the skills that match the job." },
      ],
    }),
  },
  {
    name: "Project proposal",
    app: "docs",
    kind: "doc",
    content: () => ({
      paragraphs: [
        { id: "p1", text: "Project Name", style: "Title" },
        { id: "p2", text: "Prepared by Your Name", style: "Subtitle" },
        { id: "p3", text: "Overview", style: "Heading 1" },
        { id: "p4", text: "Describe the project in two or three sentences." },
        { id: "p5", text: "Goals", style: "Heading 1" },
        { id: "p6", text: "What will be different when the project is done?" },
        { id: "p7", text: "Timeline", style: "Heading 1" },
        { id: "p8", text: "List the main steps in order." },
      ],
    }),
  },
  {
    name: "Report",
    app: "docs",
    kind: "doc",
    content: () => ({
      paragraphs: [
        { id: "p1", text: "Report Title", style: "Title" },
        { id: "p2", text: "Summary", style: "Heading 1" },
        { id: "p3", text: "Start with the most important finding." },
        { id: "p4", text: "Details", style: "Heading 1" },
        { id: "p5", text: "Explain the facts behind the summary." },
      ],
    }),
  },
  {
    name: "To-do list",
    app: "sheets",
    kind: "sheet",
    content: () => {
      const cells: Record<string, ExcelCell> = {};
      header(cells, ["A", "B", "C", "D"], ["Done", "Task", "Due date", "Notes"]);
      return { active: "To-do list", sheets: [{ name: "To-do list", cells, colWidths: { A: 60, B: 260, C: 110, D: 220 }, validation: { A2: { type: "Checkbox" } } }] } as unknown as ExcelBook;
    },
  },
  {
    name: "Monthly budget",
    app: "sheets",
    kind: "sheet",
    content: () => {
      const cells: Record<string, ExcelCell> = {};
      header(cells, ["A", "B", "C", "D"], ["Category", "Planned", "Actual", "Difference"]);
      ["Rent", "Utilities", "Supplies", "Other"].forEach((c, i) => {
        const r = i + 2;
        cells[`A${r}`] = { v: c };
        cells[`D${r}`] = { f: `=B${r}-C${r}`, fmt: { numFmt: "Currency" } };
      });
      return { active: "Budget", sheets: [{ name: "Budget", cells, colWidths: { A: 160, B: 100, C: 100, D: 110 } }] } as unknown as ExcelBook;
    },
  },
  {
    name: "Schedule",
    app: "sheets",
    kind: "sheet",
    content: () => {
      const cells: Record<string, ExcelCell> = {};
      header(cells, ["A", "B", "C", "D", "E", "F"], ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
      ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].forEach((t, i) => (cells[`A${i + 2}`] = { v: t, fmt: { bold: true } }));
      return { active: "Schedule", sheets: [{ name: "Schedule", cells, colWidths: { A: 90 } }] } as unknown as ExcelBook;
    },
  },
  {
    name: "Pitch",
    app: "slides",
    kind: "slides",
    content: () => ({ active: "s1", theme: "Streamline", slides: [{ id: "s1", layout: "Title slide", title: "Your big idea", subtitle: "Your name" }, { id: "s2", layout: "Title and body", title: "The problem", body: ["What needs to change?"] }] }) as unknown as PptDeck,
  },
  {
    name: "Portfolio",
    app: "slides",
    kind: "slides",
    content: () => ({ active: "s1", theme: "Simple Dark", slides: [{ id: "s1", layout: "Title slide", title: "Portfolio", subtitle: "Your name" }] }) as unknown as PptDeck,
  },
];

export const templatesFor = (app: GHomeApp) => TEMPLATES.filter((t) => t.app === app);
export const templateNamed = (name: string) => TEMPLATES.find((t) => t.name.toLowerCase() === name.trim().toLowerCase());
