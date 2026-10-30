import type { ComponentType } from "react";
import type { DialogDef, RibbonTab, SimCommit, SimValue } from "@/types/sim";

/** Where the learner is: what is selected, which sheet/slide is showing. */
export interface SimUi {
  selection: string;
  sheet?: string;
  slide?: string;
}

export interface MenuItem {
  label?: string;
  icon?: string;
  command?: string;
  value?: SimValue;
  dialog?: string;
  separator?: boolean;
  disabled?: boolean;
  shortcut?: string;
}

export interface CanvasProps<D> {
  doc: D;
  ui: SimUi;
  accent: string;
  onSelect: (ui: Partial<SimUi>) => void;
  onCommit: (c: SimCommit) => void;
  onContextMenu: (x: number, y: number, items: MenuItem[]) => void;
  openDialog: (id: string) => void;
}

export interface StatusBarProps<D> {
  doc: D;
  ui: SimUi;
  accent: string;
  onCommit: (c: SimCommit) => void;
}

export interface BackstageSpec {
  /** Template names on the New page; the first is "Blank …". */
  templates: { name: string; color?: string }[];
  recent: { name: string; location: string; when: string }[];
  formats: string[];
  ext: string;
  /** Extra rows on File › Info (PowerPoint's Edit Links to Files), each committing a command. */
  info?: { title: string; text: string; icon?: string; command: string; value?: SimValue }[];
  /** Extra choices on File › Export, each committing a command. */
  exports?: { label: string; icon?: string; command: string; value?: SimValue }[];
}

export type Shortcut =
  | { command: string; value?: SimValue }
  | { dialog: string }
  | { backstage: string };

export interface BackstageProps<D> {
  doc: D;
  /** The current selection, for File-tab commands that act on it. */
  ui?: SimUi;
  accent: string;
  fileName: string;
  startPage?: string;
  onCommit: (c: SimCommit) => void;
  onClose: () => void;
}

export interface AppModule<D> extends AppCore<D> {
  Canvas: ComponentType<CanvasProps<D>>;
  StatusBar: ComponentType<StatusBarProps<D>>;
  /** Replace the shared File-tab view (Outlook's File tab differs from Word's). */
  BackstageView?: ComponentType<BackstageProps<D>>;
}

/** Everything about an app except its React components (usable from scripts). */
export interface AppCore<D> {
  /**
   * "office" (default): Office title bar, Ribbon, File tab and status bar from
   * the player. "bare": the canvas draws the whole window itself (Windows
   * desktop, Teams, a typing drill); the player adds only the task bar.
   */
  chrome?: "office" | "bare";
  /** Office title bar: show the AutoSave switch (default true). */
  autosave?: boolean;
  /** Office title bar text; default "<file> - Saved to …". */
  windowTitle?(doc: D, fileName: string): string;
  /** Commands the canvas, status bar or panes emit that aren't on the Ribbon. */
  canvasCommands: string[];
  name: string;
  /** Title-bar / File-tab color. */
  accent: string;
  ribbon: RibbonTab[];
  dialogs: Record<string, DialogDef>;
  backstage: BackstageSpec;
  shortcuts: Record<string, Shortcut>;
  initialUi(doc: D): SimUi;
  /**
   * Commands that are never counted as a miss when they aren't the step's
   * action (closing a pane, zooming, showing formatting marks). They still
   * complete a step that asks for them.
   */
  freeCommands?: string[];
  /**
   * The Ribbon for the current document, when galleries or dropdowns list the
   * document's own items (custom styles, folders, signatures). Defaults to
   * `ribbon`; the validator still walks `ribbon`.
   */
  ribbonFor?(doc: D, ui: SimUi): RibbonTab[];
  /** Switch to a contextual Ribbon tab when it first appears (Access design views). */
  autoContextual?: boolean;
  /** Dialog ids the canvas opens itself (forms, wizards), for the validator. */
  canvasDialogs?: string[];
  /** Rewrite a raw commit (e.g. three view buttons → one "view.mode" command with a value). */
  normalize?(c: SimCommit, doc?: D): SimCommit;
  /** The app's built-in reaction to a committed action. */
  apply(doc: D, commit: SimCommit, ui: SimUi): { doc: D; ui?: Partial<SimUi> };
  /** Pressed toggles and combo values for the Ribbon, keyed by control id / stateKey. */
  ribbonState(doc: D, ui: SimUi): Record<string, SimValue | undefined>;
  /** Contextual tab keys to show (e.g. "table", "picture"). */
  contextualTabs?(doc: D, ui: SimUi): string[];
  /** Build a dialog from the document when its options depend on the data (Sort's column list). */
  dialogDef?(doc: D, ui: SimUi, id: string): DialogDef | undefined;
  /** Pre-fill dialog fields from the document. */
  dialogDefaults?(doc: D, ui: SimUi, id: string): Record<string, SimValue>;
  /** File › Print settings that come from the document's page setup (orientation, margins, paper, scaling). */
  printSettings?(doc: D, ui: SimUi): Record<string, SimValue>;
  /** Short description of what's selected, for the task bar. */
  describeSelection?(doc: D, ui: SimUi): string;
  /** Used by the validator: does this selection key point at something in the document? */
  selectionExists?(doc: D, sel: string): boolean;
  /** Hide the Ribbon (Read Mode, Slide Show, etc.). */
  fullScreen?(doc: D): boolean;
}
