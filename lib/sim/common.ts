import type { SimCommit, SimValue } from "@/types/sim";

/**
 * Built-in handling shared by every app for File-tab and window commands.
 * Returns null when the commit isn't one of these.
 */
export function applyCommonCommit<
  D extends {
    saved?: { name?: string; location?: string; format?: string; autosave?: boolean };
    flags?: Record<string, SimValue>;
    ribbonCollapsed?: boolean;
    pane?: string | null;
  },
>(doc: D, c: SimCommit, ext: string): D | null {
  const flags = { ...(doc.flags ?? {}) };
  if (c.kind === "dialog") {
    switch (c.id) {
      case "file.saveAs": {
        const fmt = String(c.values.format ?? "");
        const m = /\(\*(\.[a-z0-9]+)\)/i.exec(fmt);
        const e = m ? m[1] : ext;
        return {
          ...doc,
          saved: { ...(doc.saved ?? {}), name: `${String(c.values.name ?? "Untitled")}${e}`, location: String(c.values.location ?? ""), format: fmt },
          flags: { ...flags, lastAction: "saved" },
        };
      }
      case "file.exportPdf":
        return { ...doc, flags: { ...flags, exported: `${String(c.values.name ?? "file")}.pdf`, lastAction: "exported" } };
      case "file.print":
        return { ...doc, flags: { ...flags, printed: `${c.values.copies ?? 1} cop${Number(c.values.copies ?? 1) === 1 ? "y" : "ies"}`, lastAction: "printed" } };
      case "file.share":
        return { ...doc, flags: { ...flags, sharedWith: String(c.values.email ?? ""), permission: String(c.values.permission ?? ""), lastAction: "shared" } };
    }
    return null;
  }
  if (c.kind !== "command") return null;
  switch (c.id) {
    case "file.save":
      return { ...doc, flags: { ...flags, lastAction: "saved" } };
    case "qat.autosave":
      return { ...doc, saved: { ...(doc.saved ?? {}), autosave: !doc.saved?.autosave } };
    case "file.close":
      return { ...doc, flags: { ...flags, closed: true, lastAction: "closed" } };
    case "file.new":
      return { ...doc, flags: { ...flags, newFrom: String(c.value ?? ""), lastAction: "new" } };
    case "file.open":
      return { ...doc, flags: { ...flags, opened: String(c.value ?? ""), lastAction: "opened" } };
    case "file.protect":
      return { ...doc, flags: { ...flags, protect: String(c.value ?? ""), lastAction: "protected" } };
    case "file.inspect":
      return { ...doc, pane: String(c.value ?? ""), flags: { ...flags, lastAction: "inspected" } };
    case "file.versionHistory":
      return { ...doc, pane: "Version History" };
    case "file.copyLink":
      return { ...doc, flags: { ...flags, lastAction: "link copied" } };
    case "file.email":
      return { ...doc, flags: { ...flags, emailed: String(c.value ?? ""), lastAction: "emailed" } };
    case "file.changeType":
      return { ...doc, flags: { ...flags, changedType: String(c.value ?? "") } };
    case "file.browse":
    case "file.options":
      return doc;
    case "view.ribbonCollapse":
      return { ...doc, ribbonCollapsed: !doc.ribbonCollapsed };
    case "pane.close":
      return { ...doc, pane: null };
  }
  return null;
}

/** File-tab commands close the backstage after they run. */
export function closesBackstage(c: SimCommit): boolean {
  if (c.kind === "dialog") return c.id.startsWith("file.");
  if (c.kind === "command") return c.id.startsWith("file.") && c.id !== "file.browse";
  return false;
}
