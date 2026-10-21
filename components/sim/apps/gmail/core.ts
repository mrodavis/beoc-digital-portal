import type { AppCore } from "../../types";
import { applyGmail, describeGmail, gmailInitialUi, gmailSelectionExists, normalizeGmail } from "./model";
import type { GmailDoc } from "./types";

/**
 * Gmail, Google Calendar and Google Meet (and Chat in Gmail) in one browser
 * window. Bare chrome: the canvas draws the browser tabs and each app.
 * Selection keys, commands and type targets are documented in types.ts.
 */
const JUDGED = [
  "gm.archive", "gm.delete", "gm.deleteForever", "gm.emptyTrash", "gm.spam", "gm.notSpam", "gm.phishing", "gm.block",
  "gm.unsubscribe", "gm.read", "gm.star", "gm.important", "gm.snooze", "gm.labels", "gm.moveTo", "gm.category",
  "gm.undoSend", "gm.cancelSend", "gm.search", "gm.filter.delete",
  "cal.rsvp", "cal.delete", "cal.taskDone",
  "meet.mic", "meet.camera", "meet.effects", "meet.join", "meet.captions", "meet.react", "meet.present", "meet.stopPresent",
  "meet.hand", "meet.layout", "meet.leave", "meet.record",
  "chat.react",
];
const FREE = [
  "app", "gm.go", "gm.tab", "gm.open", "gm.back", "gm.settings", "gm.draft", "toast",
  "cal.view", "cal.go", "cal.today", "cal.open", "cal.close", "cal.page", "cal.show",
  "meet.open", "meet.home", "meet.panel", "chat.open",
];

export const gmailCore: AppCore<GmailDoc> = {
  name: "Gmail",
  accent: "#0b57d0",
  chrome: "bare",
  autosave: false,
  ribbon: [{ id: "home", label: "Home", groups: [] }],
  dialogs: {},
  backstage: { templates: [], recent: [], formats: [], ext: "" },
  shortcuts: {},
  canvasCommands: [...JUDGED, ...FREE],
  freeCommands: FREE,
  initialUi: gmailInitialUi,
  apply: applyGmail,
  ribbonState: () => ({}),
  selectionExists: gmailSelectionExists,
  describeSelection: describeGmail,
  normalize: (c) => normalizeGmail(c),
};
