import type { AppCore } from "../../types";
import { applyOneDrive, describeOd, odInitialUi, odSelectionExists } from "./model";
import type { OneDriveDoc } from "./types";

/**
 * Microsoft OneDrive: OneDrive on the web (work or school and personal
 * accounts), files opened in Word, and the OneDrive sync app in File
 * Explorer. Bare chrome: the canvas draws the browser window or the desktop.
 * The document model, selection keys, commits and command ids are listed at
 * the top of types.ts.
 */
export const OD_FREE = [
  "od.go", "od.open", "od.openApp", "od.close", "od.layout", "od.details", "od.search", "od.sort", "od.surface", "od.sharedTab",
  "od.exp.nav", "od.toast", "od.help", "od.pane",
];

/** Dialog commits the canvas makes itself (judged). */
export const OD_DIALOGS = [
  "od.newFolder", "od.newFile", "od.upload", "od.rename", "od.move", "od.copy", "od.delete", "od.favorite", "od.download",
  "od.share", "od.link", "od.access", "od.removeLink", "od.stopSharing", "od.restoreVersion", "od.restore", "od.purge",
  "od.emptyBin", "od.restoreOneDrive", "od.shortcut", "od.removeShortcut", "od.vault", "od.keep", "od.free", "od.pause",
  "od.resume", "od.backup", "od.fod", "od.autosave", "od.mode", "od.resolve",
];

export const onedriveCore: AppCore<OneDriveDoc> = {
  name: "Microsoft OneDrive",
  accent: "#0f6cbd",
  chrome: "bare",
  autosave: false,
  ribbon: [{ id: "home", label: "Home", groups: [] }],
  dialogs: {},
  backstage: { templates: [], recent: [], formats: [], ext: "" },
  shortcuts: {},
  canvasCommands: OD_FREE,
  freeCommands: OD_FREE,
  canvasDialogs: OD_DIALOGS,
  initialUi: odInitialUi,
  apply: applyOneDrive,
  ribbonState: () => ({}),
  selectionExists: odSelectionExists,
  describeSelection: describeOd,
};
