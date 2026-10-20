"use client";

import { useEffect, useRef, useState } from "react";
import type { ExcelBook, PptDeck, SimValue, WordDoc } from "@/types/sim";
import type { CanvasProps, StatusBarProps } from "../../types";
import { parseSel } from "../word/model";
import { activeCell, selRect, sheetOf } from "../excel/model";
import { activeSlide } from "../powerpoint/model";
import { evaluateCell, numToCol, parseRef, refOf } from "@/lib/sim/excel";
import { gLook, DocsSurface, styleName } from "./Docs";
import { DriveView, FileIcon } from "./Drive";
import { VersionHistory } from "./History";
import { AppLogo, GIcon } from "./icons";
import { DOCS_MENUS, isItem, SHEETS_MENUS, SLIDES_MENUS, SPECIAL_CHARS, type GEntry, type GItem } from "./menus";
import { asBook, asDeck, asWord, fileOf, kindFromName, openFile, regionOf, viewOn } from "./model";
import { FolderPicker, ShareDialog } from "./Share";
import { SheetsSurface } from "./Sheets";
import { SlidesSurface } from "./Slides";
import type { GoogleDoc } from "./types";
import { BrowserFrame, Ctx, DefDialog, Modal, PillBtn, Popup, TextField, Toast, useG, type GCtx, type Hooks, type MenuPos } from "./ui";

type Dlg =
  | { kind: "share"; file: string }
  | { kind: "def"; id: string; initial?: Record<string, SimValue> }
  | { kind: "pick"; mode: "move" | "shortcut"; files: string[] }
  | { kind: "rename"; file: string }
  | { kind: "newFolder" }
  | { kind: "upload" }
  | { kind: "open" }
  | { kind: "image"; source: string }
  | { kind: "special" }
  | { kind: "link" }
  | { kind: "search" }
  | { kind: "sort" };

function keyName(e: React.KeyboardEvent): string {
  const parts: string[] = [];
  if (e.ctrlKey || e.metaKey) parts.push("Ctrl");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey) parts.push("Shift");
  let k = e.key;
  if (k.length === 1) k = k.toUpperCase();
  if (k === " ") k = "Space";
  parts.push(k);
  return parts.join("+");
}

/** Toolbar pressed states, combo values and menu check marks for what is selected. */
function toolState(doc: GoogleDoc, ui: { selection: string; sheet?: string; slide?: string }): Record<string, SimValue | undefined> {
  const st: Record<string, SimValue | undefined> = {};
  const f = openFile(doc);
  for (const k of ["printLayout", "ruler", "outline", "nonPrinting", "spelling", "protectedRanges", "grid", "notes", "filmstrip", "fullScreen"]) st[`view:${k}`] = viewOn(doc, k);
  st[`mode:${doc.mode ?? "Editing"}`] = true;
  st.offline = Boolean(doc.flags?.offline);
  if (!f) return st;
  if (doc.surface === "docs") {
    const w = asWord(f);
    const s = parseSel(w, ui.selection);
    const p = w.paragraphs.find((x) => x.id === (s.run?.para ?? s.paras[0]));
    const r = s.run && p ? p.runs?.find((x) => x.id === s.run!.run) : undefined;
    const look = p ? gLook(w, p) : undefined;
    st.font = r?.font ?? look?.font ?? "Arial";
    st.size = r?.size ?? look?.size ?? 11;
    st.bold = Boolean(r?.bold ?? look?.bold);
    st.italic = Boolean(r?.italic ?? look?.italic);
    st.underline = Boolean(r?.underline ?? look?.underline);
    st.color = r?.color ?? look?.color ?? "#000000";
    st.highlight = r?.highlight ?? p?.highlight;
    st.style = styleName(p);
    st[`style:${styleName(p)}`] = true;
    st.alignIcon = { left: "alignLeft", center: "alignCenter", right: "alignRight", justify: "alignJustify" }[look?.align ?? "left"];
    st.bullets = p?.list === "bullet";
    st.numbering = p?.list === "number";
    st.painter = Boolean(w.painter);
    st.zoom = w.zoom ? `${w.zoom}%` : "Fit";
    const ls = look?.lineSpacing ?? 1.15;
    st[`ls:${ls === 1 ? "Single" : ls === 2 ? "Double" : String(ls)}`] = true;
  } else if (doc.surface === "sheets") {
    const b = asBook(f);
    const sh = sheetOf(b, ui);
    const fmt = sh.cells[activeCell(ui)]?.fmt ?? {};
    st.font = fmt.font ?? "Arial";
    st.size = fmt.size ?? 10;
    st.bold = Boolean(fmt.bold);
    st.italic = Boolean(fmt.italic);
    st.strike = Boolean((fmt as { strike?: boolean }).strike);
    st.color = fmt.color ?? "#000000";
    st.fill = fmt.fill;
    st.alignIcon = fmt.align === "center" ? "alignCenter" : fmt.align === "right" ? "alignRight" : "alignLeft";
    st.filter = Boolean(sh.filter);
    st.painter = Boolean(b.painter);
    st.zoom = `${sh.zoom ?? 100}%`;
    st.gridlines = sh.gridlines !== false;
    st.formulaBar = doc.flags?.formulaBar !== false;
  } else if (doc.surface === "slides") {
    const d = asDeck(f);
    const s = activeSlide(d, ui);
    const [, part] = ui.selection.split(".");
    const o = s?.objects?.find((x) => x.id === part);
    const props = part === "title" ? s?.titleProps : part === "subtitle" ? s?.subtitleProps : part === "body" || part === "body2" ? s?.bodyProps : o?.props;
    st.font = props?.font ?? "Arial";
    st.size = props?.size ?? (part === "title" ? 36 : 18);
    st.bold = Boolean(props?.bold);
    st.italic = Boolean(props?.italic);
    st.underline = Boolean(props?.underline);
    st.color = props?.color ?? "#000000";
    st.alignIcon = props?.align === "center" ? "alignCenter" : props?.align === "right" ? "alignRight" : "alignLeft";
    st.skipped = Boolean(s?.hidden);
    st.painter = Boolean(d.flags?.painter);
    st.zoom = d.flags?.zoom ? `${d.flags.zoom}%` : "Fit";
  }
  return st;
}

function flatten(entries: GEntry[], path: string[] = []): { item: GItem; path: string }[] {
  const out: { item: GItem; path: string }[] = [];
  for (const e of entries) {
    if (!isItem(e)) continue;
    if (e.command || e.dialog || e.action) out.push({ item: e, path: [...path, e.label].join(" › ") });
    if (e.sub) out.push(...flatten(e.sub, [...path, e.label]));
  }
  return out;
}

export function GoogleCanvas({ doc, ui, onSelect, onCommit }: CanvasProps<GoogleDoc>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hooksRef = useRef<Hooks>({});
  const [dlg, setDlg] = useState<Dlg | null>(null);
  const [composer, setComposer] = useState(false);
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [table, setTable] = useState<MenuPos | null>(null);
  const mouse = useRef<MenuPos>({ x: 240, y: 200 });
  const f = openFile(doc);
  useEffect(() => { setComposer(false); setNoteFor(null); }, [doc.surface, doc.open]);

  const focus = () => rootRef.current?.focus({ preventScroll: true });
  const cmd = (id: string, value?: SimValue) => onCommit({ kind: "command", id, value });
  const selectedFiles = ui.selection.startsWith("file:") ? ui.selection.split(",").map((x) => x.trim().slice(5)) : [];
  const resolve = (v: string) => {
    const act = parseRef(activeCell(ui)) ?? { c: 1, r: 1 };
    return v.replace("$open", doc.open ?? "").replace("$slide", ui.slide ?? "").replace("$row", String(act.r)).replace("$col", numToCol(act.c));
  };

  const dialog = (id: string, initial?: Record<string, SimValue>) => {
    if (id === "g.move" || id === "g.shortcut") {
      const files = String(initial?.file ?? (doc.surface === "drive" ? selectedFiles.join(",") : doc.open ?? "")).split(",").filter(Boolean);
      if (files.length) setDlg({ kind: "pick", mode: id === "g.move" ? "move" : "shortcut", files });
      return;
    }
    if (id === "link") return setDlg({ kind: "link" });
    if (id === "g.sortRange") return setDlg({ kind: "sort" });
    if (id === "g.image") return setDlg({ kind: "image", source: "Upload from computer" });
    setDlg({ kind: "def", id, initial });
  };

  const act = (action: string, arg?: string) => {
    if (action.startsWith("image:")) return setDlg({ kind: "image", source: action.slice(6) });
    if (action.startsWith("fn:")) return hooksRef.current.fn?.(action.slice(3));
    switch (action) {
      case "share": {
        const file = arg ?? (doc.surface === "drive" ? selectedFiles[0] : doc.open);
        if (file) setDlg({ kind: "share", file });
        return;
      }
      case "link":
        if (doc.surface !== "drive") setDlg({ kind: "link" });
        return;
      case "comment":
        if (doc.surface === "drive") return;
        if (!ui.selection || ui.selection.startsWith("comment:")) return cmd("g.toast", "Select some text or a cell to comment on");
        setNoteFor(null);
        setComposer(true);
        return;
      case "note":
        setComposer(false);
        setNoteFor(activeCell(ui));
        return;
      case "rename":
        if (doc.surface === "drive") {
          const file = arg ?? selectedFiles[0];
          if (file) setDlg({ kind: "rename", file });
        } else hooksRef.current.rename?.();
        return;
      case "table":
        setTable({ ...mouse.current });
        return;
      case "special":
        return setDlg({ kind: "special" });
      case "open":
        return setDlg({ kind: "open" });
      case "newFolder":
        return setDlg({ kind: "newFolder" });
      case "upload":
        return setDlg({ kind: "upload" });
      case "folderUpload":
        return cmd("g.toast", "Choose a folder on your computer to upload it");
      case "searchMenus":
        return setDlg({ kind: "search" });
      case "selectAll":
        if (doc.surface === "docs") onSelect({ selection: "all" });
        else if (doc.surface === "slides") cmd("home.selectAll");
        return;
    }
  };

  const ctx: GCtx = { doc, ui, onSelect, onCommit, cmd, act, dialog, state: toolState(doc, ui), resolve, focus, hooksRef };

  /* ---------- keyboard ---------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const t = e.target as HTMLElement;
    if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable) return;
    if (dlg || doc.overlay) return;
    const k = keyName(e);
    const handled = () => { e.preventDefault(); e.stopPropagation(); };
    const s = doc.surface;
    const run = (id: string, value?: SimValue) => { handled(); cmd(id, value); };
    const common: Record<string, () => void> = {
      "Ctrl+K": () => { handled(); act("link"); },
      "Ctrl+Alt+M": () => { handled(); act("comment"); },
      "Ctrl+H": () => { handled(); dialog("replace"); },
      "Ctrl+P": () => { handled(); dialog("g.print"); },
      "Ctrl+O": () => { handled(); act("open"); },
      "Ctrl+/": () => run("g.pane", "Keyboard shortcuts"),
      "Alt+/": () => { handled(); act("searchMenus"); },
      "Ctrl+Alt+Shift+H": () => run("g.versions"),
      "Alt+Shift+5": () => run("home.strike"),
      "Alt+Shift+%": () => run("home.strike"),
      Escape: () => { if (doc.pane) run("g.pane", ""); },
    };
    if (s === "drive") {
      const sel = selectedFiles;
      const map: Record<string, () => void> = {
        Delete: () => sel.length && run("g.trash", sel.join(",")),
        Backspace: () => sel.length && run("g.trash", sel.join(",")),
        Enter: () => { const x = fileOf(doc, sel[0]); if (x) run(x.kind === "folder" ? "g.go" : "g.open", x.id); },
        S: () => sel.length && run("g.star", sel.join(",")),
        N: () => { handled(); act("rename"); },
        Z: () => { handled(); dialog("g.move"); },
        "Shift+Z": () => { handled(); dialog("g.shortcut"); },
        ".": () => { handled(); act("share"); },
        "Ctrl+Alt+A": () => { handled(); act("share"); },
        "Shift+T": () => run("g.new", "Google Docs"),
        "Shift+S": () => run("g.new", "Google Sheets"),
        "Shift+P": () => run("g.new", "Google Slides"),
        "Shift+F": () => { handled(); act("newFolder"); },
      };
      map[k]?.();
      return;
    }
    if (common[k]) return common[k]();
    if (s === "docs") {
      const styleKeys: Record<string, string> = { "Ctrl+Alt+0": "Normal text", "Ctrl+Alt+1": "Heading 1", "Ctrl+Alt+2": "Heading 2", "Ctrl+Alt+3": "Heading 3", "Ctrl+Alt+4": "Heading 4", "Ctrl+Alt+5": "Heading 5", "Ctrl+Alt+6": "Heading 6" };
      if (styleKeys[k]) return run("home.style", styleKeys[k]);
      const map: Record<string, () => void> = {
        "Ctrl+Shift+7": () => run("home.numbering"),
        "Ctrl+Shift+&": () => run("home.numbering"),
        "Ctrl+Shift+8": () => run("home.bullets"),
        "Ctrl+Shift+*": () => run("home.bullets"),
        "Ctrl+Shift+9": () => run("g.checklist"),
        "Ctrl+Shift+(": () => run("g.checklist"),
        "Ctrl+Shift+L": () => run("home.alignLeft"),
        "Ctrl+Shift+E": () => run("home.alignCenter"),
        "Ctrl+Shift+R": () => run("home.alignRight"),
        "Ctrl+Shift+J": () => run("home.justify"),
        "Ctrl+]": () => run("home.indentInc"),
        "Ctrl+[": () => run("home.indentDec"),
        "Ctrl+\\": () => run("home.clearFormatting"),
        "Ctrl+Shift+C": () => run("g.pane", "Word count"),
        "Ctrl+Alt+X": () => run("g.pane", "Spelling and grammar"),
        "Ctrl+Shift+S": () => run("g.pane", "Voice typing"),
        "Ctrl+Shift+Y": () => run("g.pane", "Dictionary"),
        "Ctrl+Alt+Shift+I": () => run("g.pane", "Explore"),
        "Ctrl+Enter": () => run("insert.pageBreak"),
        "Ctrl+Alt+F": () => run("insert.footnote"),
        "Ctrl+.": () => run("home.superscript"),
        "Ctrl+,": () => run("home.subscript"),
        "Ctrl+Shift+>": () => run("home.growFont"),
        "Ctrl+Shift+<": () => run("home.shrinkFont"),
        "Ctrl+Shift+V": () => run("home.paste", "Keep Text Only"),
        "Ctrl+A": () => { handled(); onSelect({ selection: "all" }); },
        Delete: () => { if (ui.selection && doc.mode !== "Viewing") run("edit.delete"); },
        Backspace: () => { if (ui.selection && doc.mode !== "Viewing") run("edit.delete"); },
        Enter: () => { handled(); hooksRef.current.type?.("\n"); },
        F2: () => { handled(); hooksRef.current.type?.("\n"); },
      };
      if (map[k]) return map[k]();
    }
    if (s === "sheets") {
      const map: Record<string, () => void> = {
        "Ctrl+Shift+$": () => run("home.numberFormat", "Currency"),
        "Ctrl+Shift+4": () => run("home.numberFormat", "Currency"),
        "Ctrl+Shift+%": () => run("home.numberFormat", "Percent"),
        "Ctrl+Shift+5": () => run("home.numberFormat", "Percent"),
        "Ctrl+Shift+!": () => run("home.numberFormat", "Number"),
        "Ctrl+Shift+1": () => run("home.numberFormat", "Number"),
        "Ctrl+Shift+#": () => run("home.numberFormat", "Date"),
        "Ctrl+Shift+3": () => run("home.numberFormat", "Date"),
        "Ctrl+Shift+L": () => run("home.alignLeft"),
        "Ctrl+Shift+E": () => run("home.alignCenter"),
        "Ctrl+Shift+R": () => run("home.alignRight"),
        "Ctrl+\\": () => run("home.clear", "Clear Formats"),
        "Ctrl+Shift+V": () => run("home.paste", "Values"),
        "Shift+F2": () => { handled(); act("note"); },
        "Shift+F11": () => run("sheet.add"),
        "Alt+Shift+X": () => run("g.pane", "Explore"),
      };
      if (map[k]) return map[k]();
      if (k === "Enter" || k === "F2") { handled(); hooksRef.current.type?.("\n"); return; }
    }
    if (s === "slides") {
      const d = f ? asDeck(f) : undefined;
      const map: Record<string, () => void> = {
        "Ctrl+M": () => run("slides.new", "Title and body"),
        "Ctrl+D": () => run("slides.duplicate"),
        "Ctrl+F5": () => run("slideshow.fromCurrent"),
        "Ctrl+Shift+F5": () => run("slideshow.fromBeginning"),
        "Ctrl+Alt+Shift+B": () => run("g.pane", "Motion"),
        "Ctrl+\\": () => run("home.clearFormatting"),
        "Ctrl+Shift+L": () => run("home.alignLeft"),
        "Ctrl+Shift+E": () => run("home.alignCenter"),
        "Ctrl+Shift+R": () => run("home.alignRight"),
        "Ctrl+A": () => run("home.selectAll"),
        Delete: () => run(ui.selection.includes(".") ? "edit.delete" : "slides.delete"),
        Backspace: () => run(ui.selection.includes(".") ? "edit.delete" : "slides.delete"),
        ArrowDown: () => { if (d && !ui.selection.includes(".")) { handled(); const i = d.slides.findIndex((x) => x.id === ui.slide); const n = d.slides[Math.min(d.slides.length - 1, i + 1)]; onSelect({ slide: n.id, selection: n.id }); } },
        ArrowUp: () => { if (d && !ui.selection.includes(".")) { handled(); const i = d.slides.findIndex((x) => x.id === ui.slide); const n = d.slides[Math.max(0, i - 1)]; onSelect({ slide: n.id, selection: n.id }); } },
        Enter: () => { handled(); hooksRef.current.type?.("\n"); },
        F2: () => { handled(); hooksRef.current.type?.("\n"); },
      };
      if (map[k]) return map[k]();
    }
    if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1 && doc.mode !== "Viewing") {
      handled();
      hooksRef.current.type?.(e.key);
    }
  };

  /* ---------- dialogs ---------- */
  const closeDlg = () => { setDlg(null); setTimeout(focus, 0); };
  const commitDlg = (id: string, values: Record<string, SimValue>) => { onCommit({ kind: "dialog", id, values }); closeDlg(); };
  const kindLabel = f?.kind === "sheet" ? "spreadsheet" : f?.kind === "slides" ? "presentation" : "document";
  const renderDlg = () => {
    if (!dlg) return null;
    switch (dlg.kind) {
      case "share":
        return <ShareDialog fileId={dlg.file} onClose={closeDlg} />;
      case "pick":
        return <FolderPicker fileIds={dlg.files} mode={dlg.mode} onClose={closeDlg} />;
      case "rename":
        return <RenameDialog fileId={dlg.file} onClose={closeDlg} />;
      case "newFolder":
        return <NewFolderDialog onClose={closeDlg} />;
      case "upload":
        return <UploadDialog onClose={closeDlg} />;
      case "open":
        return <OpenDialog onClose={closeDlg} />;
      case "image":
        return <ImageDialog source={dlg.source} onClose={closeDlg} />;
      case "special":
        return <SpecialChars onClose={closeDlg} />;
      case "link":
        return <LinkDialog onClose={closeDlg} />;
      case "search":
        return <MenuSearch onClose={closeDlg} />;
      case "sort":
        return <SortRangeDialog onClose={closeDlg} />;
      case "def": {
        const id = dlg.id;
        const initial: Record<string, SimValue> = { ...(dlg.initial ?? {}) };
        let hide: string[] = [];
        let title: string | undefined;
        if (id === "g.makeCopy" && f) {
          initial.name = initial.name ?? `Copy of ${f.name}`;
          initial.folder = initial.folder ?? (f.parent && f.parent !== "root" ? fileOf(doc, f.parent)?.name ?? "My Drive" : "My Drive");
          title = `Copy ${kindLabel}`;
        }
        if (id === "g.email" && f) {
          initial.subject = initial.subject ?? f.name;
          initial.format = initial.format ?? (f.kind === "sheet" ? "Microsoft Excel" : f.kind === "slides" ? "PDF" : "PDF");
        }
        if (id === "replace" && doc.surface !== "sheets") hide = ["search"];
        if (id === "g.nameVersion") initial.name = initial.name ?? f?.current?.name ?? "";
        if (id === "g.pageSetup" && f?.kind === "doc") {
          const w = asWord(f) as WordDoc;
          const m = /T ([\d.]+)" B ([\d.]+)" L ([\d.]+)" R ([\d.]+)"/.exec(w.page?.margins ?? "");
          Object.assign(initial, { format: w.flags?.pageless ? "Pageless" : "Pages", orientation: w.page?.orientation === "landscape" ? "Landscape" : "Portrait", top: m ? Number(m[1]) : 1, bottom: m ? Number(m[2]) : 1, left: m ? Number(m[3]) : 1, right: m ? Number(m[4]) : 1, pageColor: w.pageColor ?? "#ffffff" });
        }
        if (id === "g.pivot" && f?.kind === "sheet") {
          const b = asBook(f) as ExcelBook;
          const sh = sheetOf(b, ui);
          const rc = regionOf(sh, ui);
          initial.range = initial.range ?? (rc ? `${sh.name}!${numToCol(rc.c1)}${rc.r1}:${numToCol(rc.c2)}${rc.r2}` : "");
          hide = ["at"];
        }
        if (id === "g.background" && f?.kind === "slides") {
          const d = asDeck(f) as PptDeck;
          initial.color = activeSlide(d, ui)?.background ?? "#ffffff";
        }
        if (id === "g.removeDuplicates" && f?.kind === "sheet") {
          const sh = sheetOf(asBook(f), ui);
          const rc = regionOf(sh, ui);
          initial.columns = initial.columns ?? (rc ? `Column ${numToCol(rc.c1)} - Column ${numToCol(rc.c2)}` : "");
          hide = ["columns"];
        }
        return <DefDialog id={id} initial={initial} hide={hide} title={title} onClose={closeDlg} onOk={(v) => commitDlg(id, { ...(dlg.initial?.file ? { file: dlg.initial.file } : {}), ...v })} />;
      }
    }
  };

  return (
    <Ctx.Provider value={ctx}>
      <div
        ref={rootRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseDownCapture={(e) => { mouse.current = { x: e.clientX, y: e.clientY }; }}
        onMouseUp={(e) => {
          const t = e.target as HTMLElement;
          if (!t.closest("input,textarea,select,[role=dialog]")) focus();
        }}
        className="h-full outline-none"
        style={{ fontFamily: "Roboto, Arial, sans-serif" }}
      >
        <BrowserFrame>
          {doc.surface === "drive" || !f ? (
            <DriveView search={search} setSearch={setSearch} />
          ) : doc.surface === "docs" ? (
            <DocsSurface composer={composer} setComposer={setComposer} />
          ) : doc.surface === "sheets" ? (
            <SheetsSurface composer={composer} setComposer={setComposer} noteFor={noteFor} setNoteFor={setNoteFor} />
          ) : (
            <SlidesSurface composer={composer} setComposer={setComposer} />
          )}
          {doc.overlay === "history" && f && <VersionHistory />}
          {renderDlg()}
          {table && <TablePicker pos={table} onClose={() => setTable(null)} />}
          <Toast />
        </BrowserFrame>
      </div>
    </Ctx.Provider>
  );
}

export function GoogleStatusBar(_props: StatusBarProps<GoogleDoc>) {
  return null;
}

/* ------------------------------------------------------------------ */
/* Small dialogs                                                       */
/* ------------------------------------------------------------------ */

function RenameDialog({ fileId, onClose }: { fileId: string; onClose: () => void }) {
  const g = useG();
  const f = fileOf(g.doc, fileId);
  const [name, setName] = useState(f?.name ?? "");
  if (!f) return null;
  const ok = () => { if (name.trim() && name.trim() !== f.name) g.onCommit({ kind: "type", target: `rename:${f.id}`, value: name.trim() }); onClose(); };
  return (
    <Modal title="Rename" onClose={onClose} width={420} footer={<><PillBtn kind="text" onClick={onClose}>Cancel</PillBtn><PillBtn onClick={ok}>OK</PillBtn></>}>
      <div className="pt-3"><TextField label="Name" value={name} onChange={setName} onEnter={ok} autoFocus /></div>
    </Modal>
  );
}

function NewFolderDialog({ onClose }: { onClose: () => void }) {
  const g = useG();
  const [name, setName] = useState("Untitled folder");
  const loc = g.doc.drive?.location ?? "root";
  const parent = loc === "root" || fileOf(g.doc, loc)?.kind === "folder" ? loc : "root";
  const ok = () => { if (name.trim()) g.onCommit({ kind: "type", target: `newfolder:${parent}`, value: name.trim() }); onClose(); };
  return (
    <Modal title="New folder" onClose={onClose} width={420} footer={<><PillBtn kind="text" onClick={onClose}>Cancel</PillBtn><PillBtn onClick={ok}>Create</PillBtn></>}>
      <div className="pt-3"><TextField label="Folder name" value={name} onChange={setName} onEnter={ok} autoFocus /></div>
    </Modal>
  );
}

function UploadDialog({ onClose }: { onClose: () => void }) {
  const g = useG();
  const files = g.doc.computer ?? ["Scan - Insurance Card.pdf", "Clinic Photo.jpg", "Referral Form.docx"];
  const [pick, setPick] = useState<string | null>(null);
  const ok = () => { if (pick) g.cmd("g.upload", pick); onClose(); };
  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center bg-black/30" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label="Open" className="w-[520px] max-w-full overflow-hidden rounded-lg border border-[#c8c8c8] bg-white shadow-2xl" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
        <div className="flex h-8 items-center bg-[#f3f3f3] px-3 text-[12px]"><span className="flex-1">Open</span><button type="button" aria-label="Close" onClick={onClose}>✕</button></div>
        <div className="flex h-8 items-center gap-2 border-b border-[#e5e5e5] px-3 text-[12px] text-[#444]">This PC › Documents</div>
        <div className="h-56 overflow-auto p-1" role="listbox" aria-label="Files on this computer">
          {files.map((n) => (
            <div key={n} role="option" aria-selected={pick === n} aria-label={n} onClick={() => setPick(n)} onDoubleClick={() => { g.cmd("g.upload", n); onClose(); }} className={`flex h-8 cursor-default items-center gap-2 px-2 text-[12px] ${pick === n ? "bg-[#cce8ff]" : "hover:bg-[#e5f3ff]"}`}>
              <AppLogo kind={kindFromName(n)} size={16} /> {n}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-[#e5e5e5] bg-[#f3f3f3] p-3 text-[12px]">
          <span>File name:</span>
          <input aria-label="File name" value={pick ?? ""} readOnly className="h-6 flex-1 border border-[#7a7a7a] bg-white px-1" />
          <button type="button" onClick={ok} disabled={!pick} className="h-6 rounded border border-[#0078d4] bg-[#0078d4] px-4 text-white disabled:opacity-50">Open</button>
          <button type="button" onClick={onClose} className="h-6 rounded border border-[#adadad] bg-white px-3">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function OpenDialog({ onClose }: { onClose: () => void }) {
  const g = useG();
  const files = g.doc.files.filter((x) => !x.trashed && x.kind !== "folder" && x.kind !== "shortcut");
  return (
    <Modal title="Open a file" onClose={onClose} width={640}>
      <div className="mb-2 flex border-b border-[#e0e0e0] text-[14px]">
        {["Recent", "My Drive", "Shared with me", "Starred", "Upload"].map((t, i) => <span key={t} className={`mr-5 pb-2 ${i === 0 ? "border-b-[3px] border-[#0b57d0] text-[#0b57d0]" : "text-[#444746]"}`}>{t}</span>)}
      </div>
      <div className="max-h-72 overflow-auto" role="listbox" aria-label="Files">
        {files.map((x) => (
          <div key={x.id} role="option" aria-selected={false} aria-label={x.name} onDoubleClick={() => { onClose(); g.cmd("g.open", x.id); }} className="flex h-10 cursor-default items-center gap-3 rounded px-2 text-[14px] hover:bg-[#f1f3f4]">
            <FileIcon f={x} size={20} />
            <span className="flex-1 truncate">{x.name}</span>
            <button type="button" onClick={() => { onClose(); g.cmd("g.open", x.id); }} className="rounded-full px-3 py-1 text-[13px] text-[#0b57d0] hover:bg-[#0b57d0]/10">Open</button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

const IMAGES = ["Clinic lobby.jpg", "Front desk team.jpg", "Parking map.png", "Flu shot clinic.jpg", "Lakeside logo.png", "Hand washing.png"];

function ImageDialog({ source, onClose }: { source: string; onClose: () => void }) {
  const g = useG();
  const [src, setSrc] = useState(source);
  const [pick, setPick] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const computer = (g.doc.computer ?? []).filter((n) => kindFromName(n) === "image");
  const drive = g.doc.files.filter((x) => x.kind === "image" && !x.trashed).map((x) => x.name);
  const list = src === "Upload from computer" ? (computer.length ? computer : IMAGES) : src === "Drive" ? (drive.length ? drive : IMAGES.slice(0, 3)) : IMAGES;
  const ok = () => {
    const file = src === "By URL" ? url.trim() : pick;
    if (!file) return;
    g.onCommit({ kind: "dialog", id: "g.image", values: { source: src, file } });
    onClose();
  };
  return (
    <Modal title="Insert image" onClose={onClose} width={620} footer={<><PillBtn kind="text" onClick={onClose}>Cancel</PillBtn><PillBtn onClick={ok} disabled={src === "By URL" ? !url.trim() : !pick}>Insert</PillBtn></>}>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {["Upload from computer", "Search the web", "Drive", "Photos", "By URL", "Camera"].map((s) => (
          <button key={s} type="button" onClick={() => { setSrc(s); setPick(null); }} className={`rounded-lg border px-3 py-1 text-[13px] ${src === s ? "border-transparent bg-[#c2e7ff] text-[#001d35]" : "border-[#747775] text-[#444746]"}`}>{s}</button>
        ))}
      </div>
      {src === "By URL" ? (
        <TextField label="Paste URL of image" value={url} onChange={setUrl} autoFocus />
      ) : src === "Camera" ? (
        <p className="py-8 text-center text-[13px] text-[#5f6368]">Allow camera access to take a snapshot. Use another source for this practice.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2" role="listbox" aria-label="Images">
          {list.map((n) => (
            <button key={n} type="button" role="option" aria-selected={pick === n} aria-label={n} onClick={() => setPick(n)} onDoubleClick={() => { setPick(n); g.onCommit({ kind: "dialog", id: "g.image", values: { source: src, file: n } }); onClose(); }} className={`flex aspect-[4/3] flex-col items-center justify-center rounded-lg bg-gradient-to-br from-[#e8f0fe] to-[#e6f4ea] p-2 text-[12px] text-[#444746] ${pick === n ? "ring-[3px] ring-[#0b57d0]" : ""}`}>
              <GIcon name="image" size={28} color="#5f6368" />
              <span className="mt-1 truncate">{n}</span>
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}

function SpecialChars({ onClose }: { onClose: () => void }) {
  const g = useG();
  const [q, setQ] = useState("");
  const names: Record<string, string> = { "©": "copyright", "®": "registered", "™": "trademark", "°": "degree", "±": "plus minus", "×": "multiply", "÷": "divide", "≤": "less than or equal", "≥": "greater than or equal", "≠": "not equal", "½": "one half", "¼": "one quarter", "¾": "three quarters", "→": "right arrow", "←": "left arrow", "↑": "up arrow", "↓": "down arrow", "•": "bullet", "–": "en dash", "—": "em dash", "§": "section", "¶": "pilcrow", "€": "euro", "£": "pound", "¥": "yen", "¢": "cent", "✓": "check mark", "✗": "ballot x", "★": "star", "☎": "telephone", "✉": "envelope", "♥": "heart", µ: "micro", Ω: "omega", α: "alpha", β: "beta" };
  const list = SPECIAL_CHARS.filter((ch) => !q || (names[ch] ?? "").includes(q.toLowerCase()) || ch === q);
  return (
    <Modal title="Insert special characters" onClose={onClose} width={480}>
      <div className="mb-3 flex gap-2">
        <span className="flex h-9 items-center rounded border border-[#747775] px-3 text-[13px]">Symbol ▾</span>
        <span className="flex h-9 items-center rounded border border-[#747775] px-3 text-[13px]">All ▾</span>
        <input aria-label="Search by keyword" placeholder="Search by keyword (e.g. arrow) or codepoint" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-9 min-w-0 flex-1 rounded border border-[#747775] px-2 text-[13px]" />
      </div>
      <div className="grid grid-cols-9 gap-1 pb-2">
        {list.map((ch) => (
          <button key={ch} type="button" aria-label={names[ch] ?? ch} title={names[ch] ?? ch} onClick={() => g.cmd("insert.symbol", ch)} className="flex h-10 items-center justify-center rounded border border-[#e0e0e0] text-[20px] hover:bg-[#e8f0fe]">{ch}</button>
        ))}
      </div>
    </Modal>
  );
}

function LinkDialog({ onClose }: { onClose: () => void }) {
  const g = useG();
  const f = openFile(g.doc);
  let text = "";
  if (f?.kind === "doc") {
    const w = asWord(f);
    const s = parseSel(w, g.ui.selection);
    if (s.run) text = w.paragraphs.find((p) => p.id === s.run!.para)?.runs?.find((r) => r.id === s.run!.run)?.text ?? "";
    else { const p = w.paragraphs.find((x) => x.id === s.paras[0]); text = p ? (p.runs ?? [{ text: p.text ?? "" }]).map((r) => r.text).join("") : ""; }
  } else if (f?.kind === "sheet") {
    const b = asBook(f);
    const v = evaluateCell(b, sheetOf(b, g.ui), activeCell(g.ui));
    text = v === null ? "" : String(v);
  }
  const [t, setT] = useState(text);
  const [addr, setAddr] = useState("");
  const ok = () => { if (!addr.trim()) return; g.onCommit({ kind: "dialog", id: "link", values: { text: t, address: addr.trim() } }); onClose(); };
  return (
    <div className="absolute inset-0 z-[120]" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label="Insert link" className="absolute left-1/2 top-24 w-[420px] -translate-x-1/2 rounded-lg bg-white p-4 shadow-[0_2px_6px_2px_rgba(60,64,67,.15),0_1px_2px_rgba(60,64,67,.3)]" style={{ fontFamily: "Roboto, Arial" }}>
        <div className="mb-2 flex items-center gap-2 rounded border border-[#747775] px-2 focus-within:border-[#0b57d0]">
          <GIcon name="textSize" size={18} color="#5f6368" />
          <input aria-label="Text" placeholder="Text" value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") ok(); }} className="h-9 flex-1 text-[14px] outline-none" />
        </div>
        <div className="mb-3 flex items-center gap-2 rounded border-2 border-[#0b57d0] px-2">
          <GIcon name="link" size={18} color="#5f6368" />
          <input autoFocus aria-label="Search or paste a link" placeholder="Search or paste a link" value={addr} onChange={(e) => setAddr(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") ok(); if (e.key === "Escape") onClose(); }} className="h-9 flex-1 text-[14px] outline-none" />
        </div>
        <div className="flex justify-end gap-2"><PillBtn kind="text" onClick={onClose}>Cancel</PillBtn><PillBtn onClick={ok} disabled={!addr.trim()}>Apply</PillBtn></div>
      </div>
    </div>
  );
}

function MenuSearch({ onClose }: { onClose: () => void }) {
  const g = useG();
  const [q, setQ] = useState("");
  const menus = g.doc.surface === "sheets" ? SHEETS_MENUS : g.doc.surface === "slides" ? SLIDES_MENUS : DOCS_MENUS;
  const all = Object.entries(menus).flatMap(([name, list]) => flatten(list, [name]));
  const hits = q.trim() ? all.filter((h) => h.item.label.toLowerCase().includes(q.toLowerCase())).slice(0, 8) : [];
  const run = (i: GItem) => {
    onClose();
    if (i.dialog) g.dialog(i.dialog);
    else if (i.action) g.act(i.action);
    else if (i.command) g.cmd(i.command, i.value === undefined ? undefined : g.resolve(i.value));
  };
  return (
    <div className="absolute inset-0 z-[120]" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label="Search the menus" className="absolute left-4 top-[88px] w-[360px] rounded-lg bg-white p-2 shadow-lg">
        <div className="flex items-center gap-2 rounded-full bg-[#f1f3f4] px-3">
          <GIcon name="search" size={18} />
          <input autoFocus aria-label="Search the menus" placeholder="Search the menus (Alt+/)" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && hits[0]) run(hits[0].item); if (e.key === "Escape") onClose(); }} className="h-9 flex-1 bg-transparent text-[14px] outline-none" />
        </div>
        {hits.map((h, i) => (
          <button key={i} type="button" onClick={() => run(h.item)} className="block w-full rounded px-3 py-1.5 text-left hover:bg-[#f1f3f4]">
            <span className="block text-[14px]">{g.resolve(h.item.label)}</span>
            <span className="block text-[11px] text-[#5f6368]">{h.path}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TablePicker({ pos, onClose }: { pos: MenuPos; onClose: () => void }) {
  const g = useG();
  const [hover, setHover] = useState({ c: 1, r: 1 });
  return (
    <Popup onClose={onClose}>
      <div role="dialog" aria-label="Insert table" className="fixed z-[200] rounded-md bg-white p-3 shadow-lg" style={{ left: Math.min(pos.x, (typeof window !== "undefined" ? window.innerWidth : 1000) - 260), top: Math.min(pos.y, (typeof window !== "undefined" ? window.innerHeight : 800) - 260) }}>
        <div className="grid grid-cols-10 gap-[3px]">
          {Array.from({ length: 80 }, (_, i) => {
            const c = (i % 10) + 1, r = Math.floor(i / 10) + 1;
            const on = c <= hover.c && r <= hover.r;
            return <button key={i} type="button" aria-label={`${c} x ${r}`} onMouseEnter={() => setHover({ c, r })} onClick={() => { onClose(); g.cmd("insert.table", `${c} x ${r}`); }} className={`h-[18px] w-[18px] border ${on ? "border-[#0b57d0] bg-[#d3e3fd]" : "border-[#c7c7c7]"}`} />;
          })}
        </div>
        <div className="mt-2 text-center text-[13px]">{hover.c} x {hover.r}</div>
      </div>
    </Popup>
  );
}

function SortRangeDialog({ onClose }: { onClose: () => void }) {
  const g = useG();
  const f = openFile(g.doc)!;
  const b = asBook(f);
  const sh = sheetOf(b, g.ui);
  const rc = g.ui.selection.includes(":") ? selRect(sh, g.ui.selection) : regionOf(sh, g.ui);
  const [header, setHeader] = useState(false);
  const [order, setOrder] = useState("A to Z");
  const cols = rc ? Array.from({ length: rc.c2 - rc.c1 + 1 }, (_, i) => rc.c1 + i) : [1];
  const label = (c: number) => (header && rc ? String(sh.cells[refOf(c, rc.r1)]?.v ?? `Column ${numToCol(c)}`) : `Column ${numToCol(c)}`);
  const [by, setBy] = useState(cols[0]);
  const range = rc ? `${numToCol(rc.c1)}${rc.r1}:${numToCol(rc.c2)}${rc.r2}` : "A1";
  const ok = () => { g.onCommit({ kind: "dialog", id: "g.sortRange", values: { range, header, sortBy: label(by), order } }); onClose(); };
  return (
    <Modal title={`Sort range from ${range}`} onClose={onClose} width={460} footer={<><PillBtn kind="text" onClick={onClose}>Cancel</PillBtn><PillBtn onClick={ok}>Sort</PillBtn></>}>
      <label className="mb-4 mt-2 flex items-center gap-3 text-[14px]">
        <input type="checkbox" aria-label="Data has header row" checked={header} onChange={(e) => setHeader(e.target.checked)} className="h-[18px] w-[18px] accent-[#0b57d0]" />
        Data has header row
      </label>
      <div className="flex items-center gap-3 text-[14px]">
        <span>Sort by</span>
        <select aria-label="Sort by" value={by} onChange={(e) => setBy(Number(e.target.value))} className="h-10 flex-1 rounded border border-[#747775] px-2">
          {cols.map((c) => <option key={c} value={c}>{label(c)}</option>)}
        </select>
        <span className="flex flex-col gap-1">
          {["A to Z", "Z to A"].map((o) => (
            <label key={o} className="flex items-center gap-2"><input type="radio" name="order" aria-label={o.replace("to", "→")} checked={order === o} onChange={() => setOrder(o)} className="accent-[#0b57d0]" />{o.replace("to", "→")}</label>
          ))}
        </span>
      </div>
    </Modal>
  );
}
