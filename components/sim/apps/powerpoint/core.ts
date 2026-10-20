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
  if (c.kind === "command" && c.id === "home.select" && c.value === "Selection Pane...") return { kind: "command", id: "view.selectionPane" };
  if (c.kind === "command" && c.id === "smartart.addShape" && c.value === undefined) return { kind: "command", id: "smartart.addShape", value: "Add Shape After" };
  if (c.kind === "command" && c.id === "picture.crop" && c.value === "Crop") return { kind: "command", id: "picture.crop" };
  if (c.kind === "command" && (c.id === "object.bringForward" || c.id === "object.sendBackward") && c.value !== undefined) return { kind: "command", id: c.id };
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
      { name: "Integral", color: "#1CADE4" },
      { name: "Wisp", color: "#D9C9A3" },
    ],
    recent: [
      { name: "New Staff Orientation.pptx", location: "OneDrive › Documents › Lakeside", when: "Yesterday" },
      { name: "Flu Season Update.pptx", location: "This PC › Documents", when: "Mon" },
      { name: "Patient Portal Training.pptx", location: "OneDrive › Documents", when: "Oct 12" },
      { name: "Front Desk Procedures 2019.ppt", location: "This PC › Documents › Archive", when: "Sep 30" },
    ],
    formats: [
      "PowerPoint Presentation (*.pptx)",
      "PowerPoint 97-2003 Presentation (*.ppt)",
      "PDF (*.pdf)",
      "PowerPoint Show (*.ppsx)",
      "MPEG-4 Video (*.mp4)",
      "Windows Media Video (*.wmv)",
      "PowerPoint Template (*.potx)",
      "PowerPoint Macro-Enabled Presentation (*.pptm)",
      "PNG Portable Network Graphics Format (*.png)",
      "JPEG File Interchange Format (*.jpg)",
      "OpenDocument Presentation (*.odp)",
    ],
    ext: ".pptx",
  },
  shortcuts: {
    "Ctrl+M": { command: "slides.new", value: "Title and Content" },
    "Ctrl+D": { command: "slides.duplicate" },
    F5: { command: "slideshow.fromBeginning" },
    "Shift+F5": { command: "slideshow.fromCurrent" },
    "Alt+F5": { command: "slideshow.presenterStart" },
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
    "Ctrl+A": { command: "home.selectAll" },
    "Ctrl+Z": { command: "qat.undo" },
    "Ctrl+Y": { command: "qat.redo" },
    "Ctrl+G": { command: "object.group" },
    "Ctrl+Shift+G": { command: "object.ungroup" },
    "Ctrl+K": { dialog: "link" },
    "Ctrl+F": { dialog: "find" },
    "Ctrl+H": { dialog: "replace" },
    "Ctrl+T": { dialog: "font" },
    "Ctrl+Alt+M": { dialog: "newComment" },
    "Ctrl+F1": { command: "view.ribbonCollapse" },
    F7: { command: "review.spelling" },
    "Shift+F7": { command: "review.thesaurus" },
    F1: { command: "help.help" },
    F12: { backstage: "saveAs" },
    "Ctrl+S": { command: "file.save" },
    "Ctrl+P": { backstage: "print" },
    "Ctrl+O": { backstage: "open" },
    "Ctrl+N": { command: "file.new", value: "Blank Presentation" },
  },
  canvasCommands: [
    "edit.delete", "slides.delete", "slides.move", "slides.hide", "slides.duplicate", "slideshow.end", "slideshow.next", "slideshow.prev", "spelling.change", "spelling.ignore", "spelling.ignoreAll",
    "design.idea", "view.mode", "view.zoom", "view.notes", "pane.close", "home.formatPainter.apply", "qat.undo", "qat.redo", "qat.autosave", "view.ribbonCollapse",
    // Paragraph drag and drop, sections, slide show tools, panes.
    "text.move", "section.toggle",
    "slideshow.goto", "slideshow.seeAll", "slideshow.pointer", "slideshow.erase", "slideshow.ink", "slideshow.screen", "slideshow.showPresenter", "slideshow.presenterStart", "slideshow.recordTimings", "slideshow.keepTimings",
    "comment.reply", "comment.resolve", "comment.focus", "thesaurus.insert", "inspector.remove", "animation.painter.apply", "table.tabRow", "media.seek",
  ],
  freeCommands: [
    "pane.close", "view.zoom", "view.fit", "slideshow.next", "slideshow.prev", "slideshow.end", "help.help", "file.browse", "file.options", "transition.preview", "animation.preview", "review.showComments", "view.notes",
    "view.mode", "view.ruler", "view.gridlines", "view.guides", "view.selectionPane", "animation.pane", "smartart.textPane",
    "section.toggle", "slideshow.goto", "slideshow.seeAll", "slideshow.pointer", "slideshow.erase", "slideshow.ink", "slideshow.screen", "slideshow.showPresenter", "slideshow.recordTimings",
    "comment.focus", "media.play", "media.seek", "table.tabRow", "slides.move", "home.selectAll",
  ],
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
