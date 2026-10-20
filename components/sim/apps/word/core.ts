import type { SimCommit, WordDoc } from "@/types/sim";
import type { AppCore } from "../../types";
import { applyWord, wordContextual, wordDialogDefaults, wordRibbonState, paraText, parseSel } from "./model";
import { wordRibbon, VIEW_ALIASES } from "./ribbon";
import { wordDialogs } from "./dialogs";

function normalize(c: SimCommit): SimCommit {
  if (c.kind === "command" && VIEW_ALIASES[c.id]) return { kind: "command", id: "view.mode", value: VIEW_ALIASES[c.id] };
  if (c.kind === "command" && c.id === "review.accessibility" && (c.value === undefined || c.value === "Check Accessibility")) return { kind: "command", id: "review.accessibility" };
  if (c.kind === "command" && c.id === "home.find" && (c.value === undefined || c.value === "Find")) return { kind: "command", id: "home.find" };
  if (c.kind === "command" && c.id === "home.paste" && c.value === undefined) return { kind: "command", id: "home.paste" };
  if (c.kind === "dialog" && c.id === "stylesPane") return { kind: "command", id: "home.style", value: c.values.style };
  if (c.kind === "command" && c.id === "home.deleteComment") return { kind: "command", id: "review.deleteComment", value: c.value };
  // Right-click › Open Hyperlink does what Ctrl+Click does.
  if (c.kind === "command" && c.id === "link.open") return { kind: "click", target: `link:${String(c.value ?? "")}` };
  return c;
}

export const wordCore: AppCore<WordDoc> = {
  name: "Word",
  accent: "#2b579a",
  ribbon: wordRibbon,
  dialogs: wordDialogs,
  backstage: {
    templates: [
      { name: "Blank document" },
      { name: "Business letter", color: "#2b579a" },
      { name: "Meeting minutes", color: "#5b9bd5" },
      { name: "Resume", color: "#44546a" },
      { name: "Flyer", color: "#ed7d31" },
      { name: "Fax cover sheet", color: "#70ad47" },
    ],
    recent: [
      { name: "Referral Letter.docx", location: "OneDrive › Documents › Lakeside", when: "Yesterday" },
      { name: "Patient Intake Form.docx", location: "This PC › Documents", when: "Mon" },
      { name: "Staff Memo - Flu Clinic.docx", location: "OneDrive › Documents", when: "Oct 12" },
      { name: "Billing Policy 2016.doc", location: "This PC › Documents › Policies", when: "Sep 30" },
      { name: "Appeal Letter - Whitaker - 2026-09.docx", location: "This PC › Documents › Billing", when: "Sep 18" },
    ],
    formats: ["Word Document (*.docx)", "Word 97-2003 Document (*.doc)", "PDF (*.pdf)", "Word Template (*.dotx)", "Rich Text Format (*.rtf)", "Plain Text (*.txt)", "Web Page (*.htm)"],
    ext: ".docx",
  },
  shortcuts: {
    "Ctrl+B": { command: "home.bold" },
    "Ctrl+I": { command: "home.italic" },
    "Ctrl+U": { command: "home.underline", value: "Underline" },
    "Ctrl+X": { command: "home.cut" },
    "Ctrl+C": { command: "home.copy" },
    "Ctrl+V": { command: "home.paste" },
    "Ctrl+Shift+V": { command: "home.paste", value: "Keep Text Only" },
    "Ctrl+Z": { command: "qat.undo" },
    "Ctrl+Y": { command: "qat.redo" },
    "Ctrl+E": { command: "home.alignCenter" },
    "Ctrl+L": { command: "home.alignLeft" },
    "Ctrl+R": { command: "home.alignRight" },
    "Ctrl+J": { command: "home.justify" },
    "Ctrl+1": { command: "home.lineSpacing", value: "1.0" },
    "Ctrl+2": { command: "home.lineSpacing", value: "2.0" },
    "Ctrl+5": { command: "home.lineSpacing", value: "1.5" },
    "Ctrl+]": { command: "home.growFont" },
    "Ctrl+[": { command: "home.shrinkFont" },
    "Ctrl+Shift+>": { command: "home.growFont" },
    "Ctrl+Shift+<": { command: "home.shrinkFont" },
    "Ctrl+Space": { command: "home.clearFormatting" },
    "Ctrl+=": { command: "home.subscript" },
    "Ctrl+Shift++": { command: "home.superscript" },
    "Ctrl+Shift+*": { command: "home.showMarks" },
    "Ctrl+Shift+8": { command: "home.showMarks" },
    "Ctrl+Shift+E": { command: "review.trackChanges" },
    "Ctrl+Shift+C": { command: "home.formatPainter" },
    "Ctrl+Alt+1": { command: "home.style", value: "Heading 1" },
    "Ctrl+Alt+2": { command: "home.style", value: "Heading 2" },
    "Ctrl+Alt+3": { command: "home.style", value: "Heading 3" },
    "Ctrl+Shift+N": { command: "home.style", value: "Normal" },
    "Ctrl+Shift+L": { command: "home.bullets" },
    "Ctrl+M": { command: "home.indentInc" },
    "Ctrl+Shift+M": { command: "home.indentDec" },
    "Ctrl+T": { command: "home.hangingIndent" },
    "Ctrl+Shift+T": { command: "home.hangingIndentDec" },
    "Ctrl+Shift+F9": { command: "link.remove" },
    F9: { command: "references.updateToc" },
    "Alt+`": { command: "home.dictate" },
    "Ctrl+Enter": { command: "insert.pageBreak" },
    "Ctrl+K": { dialog: "link" },
    "Ctrl+D": { dialog: "font" },
    "Ctrl+H": { dialog: "replace" },
    "Ctrl+G": { dialog: "goTo" },
    "Ctrl+F": { command: "home.find" },
    "Ctrl+Alt+M": { dialog: "newComment" },
    "Ctrl+F1": { command: "view.ribbonCollapse" },
    "Alt+Ctrl+F": { command: "references.footnote" },
    "Ctrl+Alt+F": { command: "references.footnote" },
    F7: { command: "review.spelling" },
    "Shift+F7": { command: "review.thesaurus" },
    F1: { command: "help.help" },
    F12: { backstage: "saveAs" },
    "Ctrl+S": { command: "file.save" },
    "Ctrl+P": { backstage: "print" },
    "Ctrl+O": { backstage: "open" },
    "Ctrl+N": { command: "file.new", value: "Blank document" },
  },
  freeCommands: [
    "pane.close", "view.zoom", "view.zoomTo", "view.onePage", "view.multiplePages", "view.pageWidth", "home.find", "review.wordCount",
    "home.showMarks", "view.ruler", "view.navPane", "view.gridlines", "review.thesaurus", "help.help", "review.nextComment",
    "review.prevComment", "review.nextChange", "review.prevChange", "mail.next", "mail.prev", "home.selectAll", "file.browse", "file.options",
    "table.select", "header.gotoHeader", "header.gotoFooter", "object.selectionPane", "review.smartLookup", "references.smartLookup",
    "references.researcher", "review.readAloud", "review.showComments", "header.showDocText",
  ],
  initialUi: (doc) => ({ selection: doc.paragraphs[0]?.id ?? "" }),
  normalize,
  apply: applyWord,
  ribbonState: wordRibbonState,
  contextualTabs: wordContextual,
  dialogDefaults: wordDialogDefaults,
  describeSelection: (doc, ui) => {
    const s = parseSel(doc, ui.selection);
    const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
    return p ? `“${paraText(p).slice(0, 40)}”` : "";
  },
  canvasCommands: [
    "edit.delete", "home.formatPainter.apply", "spelling.change", "spelling.ignore", "view.mode", "view.zoom",
    "pane.close", "view.navPane", "review.wordCount", "qat.undo", "qat.redo", "qat.autosave", "view.ribbonCollapse",
    // Right-click menu items (numbered lists, links), the comment card's Reply box, Researcher's Add button.
    "list.restart", "list.continue", "link.remove", "comment.reply", "researcher.add",
  ],
  fullScreen: (doc) => doc.view === "read",
};
