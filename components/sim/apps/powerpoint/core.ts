import type { DialogDef, DialogField, PptDeck, SimCommit, SimValue } from "@/types/sim";
import type { AppCore, SimUi } from "../../types";
import { applyPpt, pptContextual, pptDialogDefaults, pptRibbonState, activeSlide, clipHistory, clipLabel, customShows, pasteSpecialInfo, pptSelectionExists, parseSel, animSequence } from "./model";
import { pptRibbon, pptDialogs, pptRibbonFor, PPT_VIEW_ALIASES } from "./ribbon";
import { ICONS } from "./ext";

/** Dialogs whose options come from the presentation (the clipboard, the custom shows, the icon picked). */
function dialogDef(deck: PptDeck, ui: SimUi, id: string): DialogDef | undefined {
  const base = pptDialogs[id];
  if (!base) return undefined;
  switch (id) {
    case "pasteSpecial": {
      const info = pasteSpecialInfo(deck);
      const fields: DialogField[] = [
        { type: "note", text: info.source },
        { type: "radio", key: "mode", label: "", options: info.link.length ? ["Paste", "Paste link"] : ["Paste"], default: "Paste" },
        { type: "list", key: "as", label: "As:", options: info.paste, height: 130 },
        { type: "note", text: info.link.length ? `Paste link: ${info.link.join(", ")}. Paste link inserts the contents and keeps a link to the source file, so changes to the source file are reflected in your presentation.` : "Result: Paste inserts the contents of the Clipboard into your presentation." },
      ];
      return { ...base, fields };
    }
    case "officeClipboard": {
      const items = clipHistory(deck).map(clipLabel);
      return { ...base, title: `Clipboard (${items.length} of 24)`, fields: [{ type: "note", text: items.length ? "Click an item to paste:" : "The Clipboard is empty. Copy or cut to collect items." }, { type: "list", key: "item", label: "", options: items, height: 180 }] };
    }
    case "insertIcons":
      return {
        ...base,
        fields: [
          { type: "text", key: "search", label: "Search:", placeholder: "Search icons" },
          { type: "note", text: "Select one or more icons, then click Insert." },
          ...ICONS.map((i): DialogField => ({ type: "checkbox", key: `icon:${i.name}`, label: `${i.glyph}  ${i.name}` })),
        ],
      };
    case "setupShow": {
      const names = customShows(deck).map((c) => c.name);
      const fields = (base.fields ?? []).flatMap((f): DialogField[] => {
        if ("key" in f && f.key === "customShow") return names.length ? [{ ...f, type: "select", options: names } as DialogField] : [];
        if ("key" in f && f.key === "showSlides" && f.type === "radio" && !names.length) return [{ ...f, options: f.options.filter((o) => o !== "Custom show:") }];
        return [f];
      });
      return { ...base, fields };
    }
    case "animEffect": {
      const sel = parseSel(deck, ui);
      const slide = sel.slide ?? activeSlide(deck, ui);
      const target = sel.anim ?? (sel.objs[0]?.id ?? (sel.part === "title" ? "title" : sel.part ? "body" : ""));
      const name = slide ? animSequence(slide).find((a) => a.target === target)?.name : undefined;
      return name ? { ...base, title: name } : base;
    }
  }
  return base;
}

/** The Icons dialog's checkboxes ("icon:Heart": true) become `icon` (the first) and `icons` (all). */
function iconsCommit(values: Record<string, SimValue>): Record<string, SimValue> {
  const picked = ICONS.filter((i) => values[`icon:${i.name}`] === true).map((i) => i.name);
  if (!picked.length) return values;
  return { ...values, icon: picked[0], icons: picked.join(", ") };
}

function normalize(c: SimCommit): SimCommit {
  if (c.kind === "dialog" && c.id === "insertIcons") return { ...c, values: iconsCommit(c.values) };
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

/**
 * Title bar text. A new presentation that was never saved (PresentationN, no save location) shows
 * just its name, as PowerPoint does; a saved file shows where it is saved.
 */
function windowTitle(deck: PptDeck, fileName: string): string {
  const loc = deck.saved?.location;
  if (!loc && /^Presentation\d+\.pptx$/i.test(fileName)) return fileName.replace(/\.pptx$/i, "");
  return `${fileName} - Saved to ${loc || "this PC"}`;
}

export const pptCore: AppCore<PptDeck> = {
  name: "PowerPoint",
  windowTitle,
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
    info: [{ title: "Edit Links to Files", text: "Related Documents: update, open, change or break links to the files this presentation uses.", icon: "link", command: "links.edit" }],
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
    "Ctrl+Alt+V": { dialog: "pasteSpecial" },
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
    // Office Clipboard pane, linked charts (right-click › Update Link / Linked Chart Object › Links...).
    "home.clipboardPane", "clipboard.paste", "clipboard.pasteAll", "clipboard.clear", "clipboard.delete",
    "links.edit", "links.update", "links.openSource", "links.changeSource", "links.break", "links.mode", "modal.close",
    // Custom Shows dialog, Animation Pane.
    "slideshow.customShow", "customShow.remove", "customShow.copy", "animation.remove", "animation.playFrom",
  ],
  // Custom Shows › New draws Define Custom Show; the Animation Pane item menu opens Effect Options and Timing.
  canvasDialogs: ["defineCustomShow", "animEffect", "animTiming"],
  freeCommands: [
    "pane.close", "view.zoom", "view.fit", "slideshow.next", "slideshow.prev", "slideshow.end", "help.help", "file.browse", "file.options", "transition.preview", "animation.preview", "review.showComments", "view.notes",
    "view.mode", "view.ruler", "view.gridlines", "view.guides", "view.selectionPane", "animation.pane", "smartart.textPane",
    "section.toggle", "slideshow.goto", "slideshow.seeAll", "slideshow.pointer", "slideshow.erase", "slideshow.ink", "slideshow.screen", "slideshow.showPresenter", "slideshow.recordTimings",
    "comment.focus", "media.play", "media.seek", "table.tabRow", "slides.move", "home.selectAll",
    // Opening and closing panes and dialogs is free.
    "home.clipboardPane", "links.edit", "modal.close", "slideshow.custom", "animation.playFrom",
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
  ribbonFor: pptRibbonFor,
  ribbonState: pptRibbonState,
  contextualTabs: pptContextual,
  dialogDef,
  dialogDefaults: pptDialogDefaults,
  selectionExists: pptSelectionExists,
  describeSelection: (deck, ui) => activeSlide(deck, ui)?.title ?? "",
  fullScreen: (deck) => deck.view === "show" || deck.view === "reading",
};
