import type { AppCore } from "../../types";
import type { WinDoc } from "./types";
import { applyWin, normalize, selectionExists, selPaths } from "./model";

/** Navigation and viewing: applied without judging, but still complete a step that asks for them. */
export const WIN_FREE = [
  "win.open", "win.focus", "win.minimize", "win.maximize", "win.restore", "win.close", "win.snap", "win.showDesktop",
  "win.lock", "win.unlock", "win.taskView", "vd.new", "vd.switch", "vd.close", "power.on",
  "explorer.nav", "explorer.back", "explorer.forward", "explorer.up", "explorer.refresh", "explorer.view", "explorer.sort",
  "explorer.sortDir", "explorer.group", "explorer.toggle", "explorer.search",
  "fs.open", "fs.cut", "fs.copy", "fs.undo", "fs.dontRun",
  "settings.nav", "settings.back", "settings.slide", "sec.nav",
  "edge.nav", "edge.search", "edge.newTab", "edge.closeTab", "edge.tab", "edge.back", "edge.forward", "edge.refresh",
  "edge.pane", "edge.siteInfo", "edge.inPrivate", "edge.smartBack", "edge.favBar", "edge.zoom", "edge.dlShow",
  "cloud.open", "cloud.view",
  "taskmgr.tab", "taskmgr.perf", "cmd.run", "snip.capture", "printer.queue", "display.identify",
  "clip.open", "notify.clear", "notepad.new",
];

/** Changes: judged against the current task. */
export const WIN_JUDGED = [
  "fs.newFolder", "fs.newFile", "fs.move", "fs.copyTo", "fs.delete", "fs.deletePermanent", "fs.compress", "fs.extract",
  "fs.pinQuick", "fs.unpinQuick", "fs.attr", "fs.runAnyway", "od.keep", "od.free",
  "share.send", "share.link", "share.remove", "share.perm", "share.expire", "share.general", "share.app",
  "bin.restore", "bin.restoreAll", "bin.empty", "bin.delete",
  "settings.set", "app.uninstall", "startup.disable", "startup.enable", "taskmgr.endTask",
  "printer.default", "printer.pause", "printer.resume", "printer.testPage", "printer.remove", "printer.add", "printer.cancel", "printer.restartJob",
  "bt.add", "bt.remove", "bt.connect", "bt.disconnect", "display.detect",
  "net.connect", "net.disconnect", "net.forget", "net.vpn", "net.vpnOff", "net.troubleshoot",
  "update.check", "update.install", "update.restart", "acct.pin", "acct.password",
  "sec.scan", "sec.action",
  "edge.favorite", "edge.favFolder", "edge.favRemove", "edge.download", "edge.dlKeep", "edge.dlDelete", "edge.dlOpen",
  "edge.reportUnsafe", "edge.smartContinue", "edge.installApp", "edge.clearData", "edge.historyDelete",
  "web.set", "cloud.restore", "doc.accept", "doc.reject",
  "power.restart", "power.sleep", "power.shutdown", "power.signout",
  "taskbar.pin", "taskbar.unpin", "start.pin", "start.unpin", "snip.save",
];

export const windowsCore: AppCore<WinDoc> = {
  name: "Windows",
  accent: "#0067c0",
  chrome: "bare",
  autosave: false,
  // The player needs one (empty) tab even with bare chrome.
  ribbon: [{ id: "home", label: "Home", groups: [] }],
  dialogs: {},
  backstage: { templates: [], recent: [], formats: [], ext: "" },
  // Keys are handled by the canvas, which knows which window has focus.
  shortcuts: {},
  canvasCommands: [...WIN_FREE, ...WIN_JUDGED],
  freeCommands: WIN_FREE,
  initialUi: () => ({ selection: "" }),
  normalize,
  apply: applyWin,
  ribbonState: () => ({}),
  selectionExists,
  describeSelection: (_doc, ui) => {
    const n = selPaths(ui.selection).length;
    return n ? `${n} item${n === 1 ? "" : "s"} selected` : ui.selection;
  },
};
