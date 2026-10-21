"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SimValue } from "@/types/sim";
import type { CanvasProps, StatusBarProps } from "../../types";
import { ExplorerView, OdSettings, BackupDialog } from "./Explorer";
import { itemOf, isMine, selItems } from "./model";
import { ConfirmDialog, NewFolderDialog, PickPanel, RenameDialog, SettingsPane, UploadDialog, VaultDialog, VersionsPanel } from "./Panels";
import { ManageAccess, ShareDialog } from "./Share";
import type { OneDriveDoc } from "./types";
import { Menu, OdCtx, Toast, type Dlg, type MenuItem, type OdCtxValue } from "./ui";
import { Viewer } from "./Viewer";
import { BrowserFrame, urlFor, WebApp } from "./Web";

export function OneDriveCanvas({ doc, ui, onSelect, onCommit }: CanvasProps<OneDriveDoc>) {
  const [dlg, setDlg] = useState<Dlg | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Show the model's toast for a moment after each change.
  useEffect(() => {
    if (!doc.toast) return;
    setToast(doc.toast);
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [doc]);

  const cmd = useCallback((id: string, value?: SimValue) => onCommit({ kind: "command", id, value }), [onCommit]);
  const commit = useCallback((id: string, values: Record<string, SimValue>) => onCommit({ kind: "dialog", id, values }), [onCommit]);
  const open = useCallback(
    (d: Dlg | null) => {
      // Dialogs about an item act on it, so select it (steps check the selection).
      if (d && "file" in d && d.file) onSelect({ selection: `item:${d.file}` });
      setDlg(d);
    },
    [onSelect],
  );
  const showMenu = useCallback((e: { clientX: number; clientY: number }, items: MenuItem[]) => setMenu({ x: e.clientX, y: e.clientY, items }), []);

  const ctx: OdCtxValue = useMemo(() => ({ doc, ui, onSelect, onCommit, cmd, commit, dlg, open, menu: showMenu }), [doc, ui, onSelect, onCommit, cmd, commit, dlg, open, showMenu]);

  // Close dialogs whose item went away (deleted, moved to the bin).
  useEffect(() => {
    if (dlg && "file" in dlg && dlg.file && !itemOf(doc, dlg.file)) setDlg(null);
  }, [doc, dlg]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).closest("input, textarea, select")) return;
    const sel = selItems(ui.selection);
    const it = itemOf(doc, sel[0]);
    if (!it || dlg) return;
    if (e.key === "Delete" && doc.surface === "web" && doc.view?.location !== "recycle" && sel.every((s) => { const x = itemOf(doc, s); return x && isMine(doc, x); })) {
      e.preventDefault();
      setDlg({ kind: "delete", files: sel });
    } else if (e.key === "F2" && doc.surface === "web" && sel.length === 1 && isMine(doc, it)) {
      e.preventDefault();
      setDlg({ kind: "rename", file: it.id });
    }
  };

  let surface: React.ReactNode;
  if (doc.surface === "explorer") surface = <ExplorerView />;
  else if (doc.surface === "viewer" && doc.viewer?.file) surface = <Viewer />;
  else
    surface = (
      <BrowserFrame tabs={[tabTitle(doc)]} active={0} onTab={() => undefined} url={urlFor(doc)}>
        <WebApp />
      </BrowserFrame>
    );

  return (
    <OdCtx.Provider value={ctx}>
      <div ref={rootRef} tabIndex={-1} onKeyDown={onKeyDown} className="relative h-full w-full overflow-hidden outline-none" onMouseDown={() => setMenu(null)}>
        {surface}
        {dlg?.kind === "share" && <ShareDialog key={`s-${dlg.file}`} fileId={dlg.file} />}
        {dlg?.kind === "copylink" && <ShareDialog key={`c-${dlg.file}`} fileId={dlg.file} startCopy />}
        {dlg?.kind === "manage" && <ManageAccess fileId={dlg.file} startTab={dlg.tab} />}
        {dlg?.kind === "rename" && <RenameDialog fileId={dlg.file} />}
        {dlg?.kind === "newFolder" && <NewFolderDialog parent={dlg.parent} />}
        {dlg?.kind === "upload" && <UploadDialog folder={dlg.folder} mode={dlg.mode} />}
        {dlg?.kind === "pick" && <PickPanel files={dlg.files} mode={dlg.mode} />}
        {dlg?.kind === "delete" && <ConfirmDialog kind="delete" files={dlg.files} />}
        {dlg?.kind === "purge" && <ConfirmDialog kind="purge" files={dlg.files} />}
        {dlg?.kind === "emptyBin" && <ConfirmDialog kind="emptyBin" files={[]} />}
        {dlg?.kind === "versions" && <VersionsPanel fileId={dlg.file} />}
        {dlg?.kind === "vault" && <VaultDialog />}
        {dlg?.kind === "settingsPane" && <SettingsPane />}
        {dlg?.kind === "odSettings" && <OdSettings startTab={dlg.tab} />}
        {dlg?.kind === "backup" && <BackupDialog />}
        {menu && <Menu items={menu.items} x={menu.x} y={menu.y} onClose={() => setMenu(null)} />}
        {toast && <Toast text={toast} />}
      </div>
    </OdCtx.Provider>
  );
}

function tabTitle(doc: OneDriveDoc): string {
  const loc = doc.view?.location ?? "root";
  const names: Record<string, string> = { home: "Home", root: "My files", shared: "Shared", favorites: "Favorites", recycle: "Recycle bin", people: "People", meetings: "Meetings", media: "Media", photos: "Photos", restore: "Restore your OneDrive", search: "Search" };
  const n = names[loc] ?? itemOf(doc, loc)?.name ?? (loc.startsWith("lib:") ? doc.libraries?.find((l) => `lib:${l.id}` === loc)?.name : undefined) ?? "OneDrive";
  return `${n} - OneDrive`;
}

export function OneDriveStatusBar(_: StatusBarProps<OneDriveDoc>) {
  void _;
  return null;
}
