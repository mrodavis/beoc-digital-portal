import type { PptDeck, SimCommit } from "@/types/sim";
import type { AppCore } from "../../types";
import { applyPpt, pptContextual, pptDialogDefaults, pptRibbonState, activeSlide } from "./model";
import { pptRibbon, pptDialogs, PPT_VIEW_ALIASES } from "./ribbon";

function normalize(c: SimCommit): SimCommit {
  if (c.kind === "command" && PPT_VIEW_ALIASES[c.id]) return { kind: "command", id: "view.mode", value: PPT_VIEW_ALIASES[c.id] };
  if (c.kind === "command" && c.id === "home.paste" && c.value === undefined) return { kind: "command", id: "home.paste" };
  if (c.kind === "command" && c.id === "review.accessibility" && (c.value === undefined || c.value === "Check Accessibility")) return { kind: "command", id: "review.accessibility" };
  if (c.kind === "command" && c.id === "review.deleteComment" && c.value === undefined) return { kind: "command", id: "review.deleteComment", value: "Delete" };
  if (c.kind === "command" && c.id === "home.select" && c.value === "Select All") return { kind: "command", id: "home.selectAll" };
  return c;
}

export const pptCore: AppCore<PptDeck> = {
  name: "PowerPoint",
  accent: "#b7472a",
  ribbon: pptRibbon,
  dialogs: pptDialogs,
  backstage: {
    templates: [
      { name: "Blank Presentation" },
      { name: "Welcome to PowerPoint", color: "#b7472a" },
      { name: "Madison", color: "#C0504D" },
      { name: "Ion", color: "#1B5866" },
      { name: "Facet", color: "#90C226" },
      { name: "Retrospect", color: "#E48312" },
    ],
    recent: [
      { name: "New Staff Orientation.pptx", location: "OneDrive › Documents › Lakeside", when: "Yesterday" },
      { name: "Flu Season Update.pptx", location: "This PC › Documents", when: "Mon" },
      { name: "Patient Portal Training.pptx", location: "OneDrive › Documents", when: "Oct 12" },
    ],
    formats: ["PowerPoint Presentation (*.pptx)", "PowerPoint 97-2003 Presentation (*.ppt)", "PDF (*.pdf)", "PowerPoint Show (*.ppsx)", "MPEG-4 Video (*.mp4)", "PowerPoint Template (*.potx)", "PNG Portable Network Graphics Format (*.png)"],
    ext: ".pptx",
  },
  shortcuts: {
    "Ctrl+M": { command: "slides.new", value: "Title and Content" },
    "Ctrl+D": { command: "slides.duplicate" },
    F5: { command: "slideshow.fromBeginning" },
    "Shift+F5": { command: "slideshow.fromCurrent" },
    "Ctrl+B": { command: "home.bold" },
    "Ctrl+I": { command: "home.italic" },
    "Ctrl+U": { command: "home.underline" },
    "Ctrl+E": { command: "home.alignCenter" },
    "Ctrl+L": { command: "home.alignLeft" },
    "Ctrl+R": { command: "home.alignRight" },
    "Ctrl+J": { command: "home.justify" },
    "Ctrl+Shift+>": { command: "home.growFont" },
    "Ctrl+Shift+<": { command: "home.shrinkFont" },
    "Ctrl+]": { command: "home.growFont" },
    "Ctrl+[": { command: "home.shrinkFont" },
    "Ctrl+X": { command: "home.cut" },
    "Ctrl+C": { command: "home.copy" },
    "Ctrl+V": { command: "home.paste" },
    "Ctrl+Z": { command: "qat.undo" },
    "Ctrl+Y": { command: "qat.redo" },
    "Ctrl+G": { command: "object.group" },
    "Ctrl+Shift+G": { command: "object.ungroup" },
    "Ctrl+K": { dialog: "link" },
    "Ctrl+H": { dialog: "replace" },
    "Ctrl+T": { dialog: "font" },
    "Ctrl+F1": { command: "view.ribbonCollapse" },
    F7: { command: "review.spelling" },
    F1: { command: "help.help" },
    F12: { backstage: "saveAs" },
    "Ctrl+S": { command: "file.save" },
    "Ctrl+P": { backstage: "print" },
    "Ctrl+O": { backstage: "open" },
    "Ctrl+N": { command: "file.new", value: "Blank Presentation" },
  },
  canvasCommands: [
    "edit.delete", "slides.delete", "slides.move", "slides.hide", "slideshow.end", "slideshow.next", "slideshow.prev", "spelling.change", "spelling.ignore",
    "design.idea", "view.mode", "view.zoom", "view.notes", "pane.close", "home.formatPainter.apply", "qat.undo", "qat.redo", "qat.autosave", "view.ribbonCollapse",
  ],
  freeCommands: ["pane.close", "view.zoom", "view.fit", "slideshow.next", "slideshow.prev", "slideshow.end", "help.help", "file.browse", "file.options", "transition.preview", "animation.preview", "review.showComments", "view.notes"],
  initialUi: (deck) => {
    const s = deck.slides.find((x) => x.id === deck.active) ?? deck.slides[0];
    return { slide: s?.id, selection: s?.id ?? "" };
  },
  normalize,
  apply: (deck, c, ui) => {
    const r = applyPpt(deck, c, ui);
    // Keep the deck's active slide in step with the UI's slide.
    const slide = r.ui?.slide ?? ui.slide;
    if (slide && r.doc.active !== slide && r.doc.slides.some((s) => s.id === slide)) r.doc = { ...r.doc, active: slide };
    return r;
  },
  ribbonState: pptRibbonState,
  contextualTabs: pptContextual,
  dialogDefaults: pptDialogDefaults,
  describeSelection: (deck, ui) => activeSlide(deck, ui)?.title ?? "",
  fullScreen: (deck) => deck.view === "show" || deck.view === "reading",
};
