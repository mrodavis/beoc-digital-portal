import type { SimCommit } from "@/types/sim";
import type { AppCore } from "../../types";
import { catalogRibbon } from "./menus";
import { googleDialogs } from "./dialogs";
import { applyGoogle, describeGoogle, googleInitialUi, googleSelectionExists } from "./model";
import type { GoogleDoc } from "./types";

/**
 * Google Workspace: Drive, Docs, Sheets and Slides in a browser window.
 * Bare chrome: the canvas draws the browser tabs, Drive, and each editor's
 * header, menu bar, toolbar and panels. Docs edits run through the Word
 * engine, Sheets through Excel, Slides through PowerPoint, using their
 * command ids (home.bold, home.style, review.accept, insert.chart, data.filter,
 * filter.by, slides.new, transition.apply, …). Values are Google's labels
 * ("Normal text", "Title Case", "Merge all", "Title and body"); the model
 * translates them.
 *
 * Google-only commands (value in parentheses):
 *   g.new (Google Docs | Google Sheets | Google Slides | Google Forms), g.upload (file name),
 *   g.star / g.trash / g.restore / g.deleteForever / g.drive.copy / g.drive.download / g.copyLink (file id[s]),
 *   g.color (id|#hex), g.download (format label), g.publish, g.offline,
 *   g.mode (Editing | Suggesting | Viewing), g.version.restore (version id),
 *   g.comment.resolve / g.comment.reopen / g.comment.delete (comment id),
 *   g.checklist, g.check, g.hr, g.zoom, g.freeze (1 row | 2 rows | Up to row 3 | 1 column | No rows …),
 *   g.altColors, g.trim, g.split, g.checkbox, g.filterView (Create new filter view),
 *   g.wordCountWhileTyping.
 * Google-only dialogs (see dialogs.ts): g.share, g.access, g.permission, g.expiry, g.move,
 *   g.shortcut, g.makeCopy, g.email, g.emailCollaborators, g.print, g.nameVersion, g.pageSetup,
 *   g.indent, g.spacing, g.image, g.sortRange, g.validation, g.cf, g.pivot, g.protect,
 *   g.removeDuplicates, g.background, g.slideSize; plus link and replace.
 *   g.template (template name, from an app home screen or Docs' File › New › From a template),
 *   g.saveAsGoogle (File › Save as Google Docs/Sheets/Slides for an Office file), g.signOut,
 *   g.2sv (Yes | No on the phone prompt), g.block (Meeting notes | Email draft), g.convertTable.
 * Google-only dialogs also include g.chip (smart chips: kind person | date | file, value).
 * Free (navigation, never a miss): g.go (folder id | root | shared | recent | starred | trash |
 *   storage | home | computers | shareddrives | shared drive id), g.open (file id), g.tab, g.closeTab,
 *   g.layout, g.details, g.pane (panel name), g.view, g.versions, g.versions.close, g.copyLink,
 *   g.help, g.toast, g.filterView.close, g.filterView.open (view id), g.app (Drive | Docs | Sheets |
 *   Slides | Gmail | …, the Google apps menu), g.account (Manage your Google Account),
 *   g.signin.step (chooser | email | password | code), g.search (query, Enter in Search in Drive),
 *   g.filter (search chips: "Type=Spreadsheets", "People=<email>", "Modified=Last 7 days",
 *   "Location=My Drive", "" clears), slideshow.next / prev / end.
 *   Use `judgeFree: true` on a task that asks for one of these (open Sheets from the apps menu, search).
 */
export const googleCore: AppCore<GoogleDoc> = {
  name: "Google Workspace",
  accent: "#1a73e8",
  chrome: "bare",
  autosave: false,
  ribbon: catalogRibbon(),
  dialogs: googleDialogs,
  backstage: { templates: [], recent: [], formats: [], ext: "" },
  shortcuts: {
    // Shortcuts that mean the same in every editor; the canvas handles the rest.
    "Ctrl+B": { command: "home.bold" },
    "Ctrl+I": { command: "home.italic" },
    "Ctrl+U": { command: "home.underline" },
    "Ctrl+Z": { command: "qat.undo" },
    "Ctrl+Y": { command: "qat.redo" },
    "Ctrl+X": { command: "home.cut" },
    "Ctrl+C": { command: "home.copy" },
    "Ctrl+V": { command: "home.paste" },
  },
  canvasCommands: [
    // Drive and file commands whose value is a file id, folder, color or format.
    "g.new", "g.upload", "g.star", "g.trash", "g.restore", "g.deleteForever", "g.emptyTrash", "g.drive.copy", "g.drive.download",
    "g.copyLink", "g.color", "g.open", "g.go", "g.tab", "g.closeTab", "g.layout", "g.details", "g.pane", "g.view", "g.versions",
    "g.versions.close", "g.version.restore", "g.comment.resolve", "g.comment.reopen", "g.comment.delete", "g.help", "g.toast",
    "g.zoom", "g.freeze", "g.check", "g.filterView", "g.filterView.close", "g.filterView.open", "g.wordCountWhileTyping",
    "g.app", "g.account", "g.signOut", "g.signin.step", "g.2sv", "g.search", "g.filter", "g.template", "g.saveAsGoogle",
    // Editor commands the canvas emits from cards, grids, panels and right-click menus.
    "spelling.change", "spelling.ignore", "review.accept", "review.reject", "edit.delete", "edit.clearContents",
    "home.formatPainter.apply", "excel.fill", "filter.by", "filter.sort", "sheet.add", "sheet.delete", "sheet.duplicate",
    "sheet.tabColor", "sheet.hide", "sheet.move", "home.fillSeries", "pivot.area", "pivot.field", "pivot.summarize", "pivot.clear",
    "chart.type", "chart.delete", "slides.move", "slides.delete", "slides.duplicate", "slides.hide", "transition.apply",
    "transition.applyAll", "transition.duration", "animation.apply", "animation.start", "animation.duration", "design.theme",
    "slideshow.fromBeginning", "slideshow.fromCurrent", "slideshow.presenterStart", "slideshow.next", "slideshow.prev",
    "slideshow.end", "slideshow.goto", "insert.symbol", "insert.table", "list.restart", "table.insertBelow",
    "view.zoom", "qat.undo", "qat.redo",
  ],
  freeCommands: [
    "g.go", "g.open", "g.tab", "g.closeTab", "g.layout", "g.details", "g.pane", "g.view", "g.versions", "g.versions.close",
    "g.copyLink", "g.help", "g.toast", "g.filterView.close", "g.filterView.open", "g.zoom", "view.zoom", "slideshow.next", "slideshow.prev",
    "slideshow.end", "slideshow.goto", "g.app", "g.account", "g.signin.step", "g.search", "g.filter",
  ],
  initialUi: googleInitialUi,
  apply: applyGoogle,
  ribbonState: () => ({}),
  selectionExists: googleSelectionExists,
  describeSelection: describeGoogle,
  normalize: (c: SimCommit): SimCommit => {
    // A comment typed with no one assigned is a plain comment, whatever the button said.
    if (c.kind === "type" && c.target === "assign:") return { ...c, target: "comment" };
    return c;
  },
};
