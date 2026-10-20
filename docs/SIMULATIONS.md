# Practice Simulations

Every lesson that teaches something a learner *does* ends with a click-through
practice simulation: a working mock of the app (Word, Excel, PowerPoint, and
more over time) plus a short list of GMetrix-style tasks. The learner works the
mock the way they would work the real program: Ribbon tabs and buttons,
dropdowns and galleries, dialogs, right-click menus, keyboard shortcuts, the
File tab, typing in place. Tasks show in a dark bar under the window, with
Hint, Reset task, Restart, and Full screen. A finish card scores first-try
accuracy.

Sims are ungraded practice. Brightspace carries the points.

## Where things live

| Path | What |
| --- | --- |
| `types/sim.ts` | The data model: `SimDefinition`, tasks, steps, actions, documents |
| `components/sim/SimPlayer.tsx` | The player: title bar, Ribbon, canvas, task bar, judging |
| `components/sim/chrome/*` | Shared Ribbon, dialog, backstage (File tab), icons |
| `components/sim/apps/<app>/` | One folder per app: `ribbon.ts`, `dialogs.ts`, `model.ts` (built-in behavior), `core.ts`, canvas |
| `lib/sim/*` | Pure helpers: path ops, matching, Excel formulas |
| `lib/sims/<app>/moduleN.ts` | The simulations themselves, per course module |
| `lib/sims/index.ts` | Registry: course id → lesson key → sims |
| `scripts/validate-sims.ts` | Proves each sim is completable. Run it after every change |

A lesson renders its sims automatically: `LessonTemplate` looks them up by
`courseId` and `lessonId` (`${moduleSlug}::${lessonSlug}`), shows a "Practice
simulation" button under the objectives, and a "Practice Simulation" section
after the lesson notes.

## How judging works

Only *committing* actions are judged: a command (button, menu option,
shortcut), a dialog's OK, typed text committed with Enter, or a click on a
canvas object that is itself the task. Switching tabs, opening menus,
selecting, scrolling and cancelling dialogs are always free.

When the learner commits something, the player compares it with the current
step (or, in an `anyOrder` task, any remaining step):

1. Same action, and the required selection is active → the app's built-in
   behavior runs (`model.ts`), then the step's `effects`, and the step is done.
2. Same action, wrong selection → "Right command, but check what is selected
   first" (or the step's `selectHint`). Nothing changes.
3. Same command, different value → "Right command, but not the right option."
4. A command listed in the app's `freeCommands` (zoom, closing a pane, Show/Hide
   ¶) → applied, never counted as a miss.
5. Anything else → "That isn't what this task asks for." Nothing changes.

Three misses on a task reveal the hint. A task is "first try" with no misses
and no hint.

## Writing a simulation

```ts
// lib/sims/word/module2.ts
export const wordModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::formatting-text": [
    {
      id: "word-m2-formatting-text-1",          // unique site-wide
      app: "word",
      title: "Make the discharge instructions impossible to miss",
      scenario: "You are finishing a discharge instruction sheet at Lakeside Medical Associates. …",
      fileName: "Discharge Instructions.docx",
      minutes: 4,
      initial: { paragraphs: [ /* the starting document */ ] },
      tasks: [
        {
          instruction: "Bold the sentence “Always take it with food.”",
          hint: "Click the sentence to select it. Home tab › Font group › Bold (or Ctrl+B).",
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              requires: { selection: "p3.r1" },
              selectHint: "Select just the sentence “Always take it with food.” first.",
            },
          ],
        },
      ],
    },
  ],
};
```

### Rules for good sims

- **Match the lesson.** Read the lesson file (objectives, worked examples,
  scenario). Every objective that names an action should be practiced. A
  lesson with two distinct skills can have two sims.
- **Real work, real stakes.** Use the lesson's own scenario or one like it:
  Lakeside Medical Associates, a front desk, a billing office, a clinic flyer,
  a staff memo. Fictional people only.
- **4–8 tasks, 3–8 minutes.** One clear action per task, or a short sequence
  that belongs together ("Copy the formatting … with Format Painter" = two
  steps).
- **Phrase tasks like GMetrix/MOS.** Name the object by its visible text, put
  exact text to type in quotes, and never name the button in the instruction.
  The hint gives the click path: `Home tab › Font group › Bold (or Ctrl+B)`.
- **Always require a selection** for anything that acts on a selection, and
  give a `selectHint` that tells the learner what to click.
- **Accept every normal method.** If the Font dialog, the Ribbon box and a
  shortcut all do it, list the others in `alt`. Shortcuts already emit the
  same command id as their button.
- **Typing** uses `{ kind: "type", target, value }`. Keep typed text short and
  quote it exactly in the instruction. The learner double-clicks (or selects
  and starts typing) and presses Enter to commit.
- **Values must be real options.** A `command` value must be one of the menu's
  options (see the app's `ribbon.ts`). Combo boxes (font name, font size) take
  any value.
- **`effects` only when the built-in behavior isn't enough** (insert a table
  with these exact rows; set the picture's alt text). Paths are dot-separated
  and resolve array items by `id` (`paragraphs.p3.align`).

## Word document model

- `paragraphs[]`, each with an `id` (`p1`, `p2`, …) and either `text` or
  `runs`. Give a run an `id` to make it selectable on its own; its selection
  key is `"<paragraphId>.<runId>"` (e.g. `p3.r1`).
- Selection keys: `"p2"`, `"p2,p3,p4"` (shift-click range), `"p3.r1"` (a run),
  `"all"` (Ctrl+A), `"header"`, `"footer"`, `"tbl1.r2c3"` (a table cell).
- `style`: Normal, No Spacing, Title, Subtitle, Heading 1–3, Quote, Intense
  Quote, List Paragraph. Direct formatting (`bold`, `size`, `color`, `align`,
  `spaceAfter`, `lineSpacing`, `indentLeft`, `list`, …) sits on the paragraph
  or run.
- Special paragraphs: `kind: "table"` with `table.rows`, `"image" | "shape" |
  "textbox"` with `object`, `"chart"`, `"toc"`, `"pageBreak"`,
  `"sectionBreak"`.
- Misspelled runs: `misspelled: true, suggestions: ["…"]` (Editor pane,
  right-click menu, F7).
- Track changes: runs with `ins` / `del`; Review › Accept/Reject.
- Comments: `paragraph.comment`.
- Mail merge: `merge.recipients` and runs with `field`.

Command ids and what they do are in `components/sim/apps/word/model.ts`
(`applyWord`) and `ribbon.ts`. Canvas-only commands are listed in `core.ts`
(`canvasCommands`): `edit.delete`, `home.formatPainter.apply`,
`spelling.change`, `view.mode`, `view.zoom`, `pane.close`.

File tab (all apps): `file.save`, dialogs `file.saveAs` (`location`, `name`,
`format`), `file.print` (`copies`, `printer`, `range`, `pages`, `sides`,
`orientation`, …), `file.exportPdf` (`name`), `file.share` (`email`,
`permission`, `message`); commands `file.new` (template), `file.open` (recent
file), `file.protect`, `file.inspect`, `file.versionHistory`, `file.email`,
`file.copyLink`, `file.close`.

## Excel workbook model

- `sheets[]` with `name`, `cells` (`{ A1: { v, f, fmt } }`), optional
  `colWidths` (px), `rows`/`cols` (visible grid), `freeze`, `filter`,
  `table`, `charts`, `cf` (conditional formats), `merges`, `pivot`,
  `validation`. `active` names the sheet that opens first.
- `v` is a number or text; `f` is a formula with the leading `=`. The formula
  engine handles arithmetic, comparisons, `&`, absolute refs, ranges, other
  sheets (`Sheet2!B4`, `'Q1 Sales'!B4`) and the common functions (SUM,
  AVERAGE, MIN, MAX, COUNT, COUNTA, COUNTIF(S), SUMIF(S), AVERAGEIF(S), IF,
  AND, OR, IFERROR, ROUND*, VLOOKUP, HLOOKUP, XLOOKUP, INDEX, MATCH, UNIQUE,
  SORT, FILTER, TEXTJOIN, CONCAT, LEFT, RIGHT, MID, LEN, UPPER, LOWER, PROPER,
  TRIM, TODAY, DATE, YEAR, MONTH, DAY, PMT, SUBTOTAL). TODAY is fixed to
  October 20, 2026 so sims are repeatable.
- `fmt.numFmt`: General, Number, Currency, Accounting, Short Date, Long
  Date, Time, Percentage, Fraction, Scientific, Text, Comma. Dates are Excel
  serial numbers (46315 = 10/20/2026).
- Selection keys are ranges: `"B6"`, `"A1:D1"`, `"B:B"` (whole column),
  `"3:3"` (whole row), `"chart:c1"`, `"obj:o1"`. Use `requires.sheet` when
  the step happens on a sheet other than the active one.
- Typing a cell: `{ kind: "type", target: "D2", value: "=B2*C2", match:
  "formula" }`. Formula matching ignores spaces, case and `$` unless
  `strictRefs: true` (use it in absolute-reference lessons).
- Fill handle: `{ kind: "command", id: "excel.fill", value: "D2:D10" }` with
  `requires: { selection: "D2" }`; accept Ctrl+D through `alt: [{ kind:
  "command", id: "home.fillSeries", value: "Down" }]` when the learner might
  select the whole range first.
- Renaming a sheet: double-click the tab and type → `{ kind: "type", target:
  "sheet:Sheet1", value: "Q1 Visits" }`.
- AutoFilter: `filter.by` with value `"C=Paid|Pending"`; filter-menu sorting
  is `filter.sort` with `"C:asc"`.
- PivotTables: `createPivot` dialog, then `pivot.field` (value = field name)
  or `pivot.area` (`"Provider>Rows"`, `"Charges>Values"`), `pivot.summarize`.
- Sorting acts on the current region like real Excel: keep totals separated
  from the data by a blank row (or sort before adding totals), or the total
  row sorts with the data.

## PowerPoint deck model

- `slides[]` with `id` (`s1`, …), `layout` (Title Slide, Title and Content,
  Section Header, Two Content, Comparison, Title Only, Blank, Content with
  Caption, Picture with Caption), `title`, `subtitle`, `body` (one string per
  bullet; a leading tab is a second-level bullet), `body2`, `notes`,
  `objects[]`, `transition`, `section`, `hidden`, `comments`, `spell`.
- `theme` (Office Theme, Facet, Ion, Retrospect, Slice, Wisp, Integral,
  Organic, Berlin, Madison, Gallery), `variant` 1–4, `size` "16:9" | "4:3".
- Selection keys: `"s2"` (the slide thumbnail), `"s2.title"`,
  `"s2.subtitle"`, `"s2.body"`, `"s2.body2"`, `"s2.notes"`, `"s2.o1"`
  (an object), `"s2.o1,s2.o2"` (several objects, Shift-click). Use
  `requires: { slide: "s2" }` for slide-level commands (layout, transition,
  hide).
- Objects (`kind`): image, shape (`shape`: rect, rounded, oval, arrow, star,
  callout), textbox, table (`rows`), chart (`series`), smartart (`items`),
  video, audio, icon. Positions are percent of the slide.
- New slides get the next free id (`s3` after `s1`, `s2`). New objects get
  the next free `o` id on that slide.
- Typing: `{ kind: "type", target: "s3.title", value: "Clinic Hours" }`;
  body text compares with line breaks collapsed to spaces.
- Slide Show is `slideshow.fromBeginning` / `slideshow.fromCurrent`; inside
  the show, clicks and arrow keys advance for free.

## Checking your work

```bash
npx tsx scripts/validate-sims.ts word   # or excel, powerpoint; must report 0 errors
npx tsc --noEmit -p .
```

The validator plays every sim with its expected actions and flags commands
that aren't on the Ribbon, values that aren't options, dialogs no one can open,
selections that point at nothing, and steps whose behavior throws.

## Building a new app engine

Each app lives in `components/sim/apps/<app>/` and plugs into the player
through two objects (see `components/sim/types.ts`):

- `core.ts` exports `<app>Core: AppCore<Doc>`: name, accent color, chrome,
  ribbon (may be empty for bare chrome), dialogs, shortcuts,
  `canvasCommands` (every command the canvas emits that isn't on a ribbon),
  `freeCommands` (navigation/viewing commands that are never a miss: opening
  an app, switching folders, closing a pane), `initialUi`, `apply` (built-in
  behavior; pure, returns a new doc), `ribbonState`, optional
  `selectionExists` (used by the validator), `normalize`, `dialogDefaults`.
  `core.ts` must not import React components so scripts can load it.
- `index.ts` exports `<app>App: AppModule<Doc>` = core + `Canvas` +
  `StatusBar` (+ optional `BackstageView`).
- The document type goes in `components/sim/apps/<app>/types.ts`. Declare it
  with `type` (not `interface`) so it is assignable to the generic
  `Record<string, unknown>` that `SimDefinition.initial` uses for these apps,
  and export a helper such as `export const winDoc = (d: WinDoc) => d as unknown as Record<string, unknown>;`
  so sim files get type checking: `initial: winDoc({ ... })`.

Chrome:

- `chrome: "office"` (default): the player draws the Office title bar,
  Ribbon, File tab (shared Backstage or your `BackstageView`), and your
  `StatusBar`. Use `autosave: false` and `windowTitle` for apps such as
  Outlook whose title bar differs.
- `chrome: "bare"`: the canvas draws the whole window (Windows desktop,
  Teams, a typing drill). The player adds only the task bar underneath.

The canvas receives `doc`, `ui` (`selection`, plus any of your own keys via
`onSelect`), `onSelect` (free navigation), `onCommit` (judged actions),
`onContextMenu` and `openDialog`. Keep it a faithful copy of the real app:
same layout, labels, icons, right-click menus and keyboard shortcuts. Make
every interactive element reachable with the mouse, and give buttons
`aria-label`s matching their visible names.

Selection keys are your own strings (`file:report.docx`, `msg:m3`,
`chat:c2`). Describe them in a comment at the top of your `types.ts`.
