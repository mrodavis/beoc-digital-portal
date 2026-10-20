"use client";

import { useEffect, useRef, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { AccField } from "./types";
import { DATA_TYPES } from "./types";
import { findTable } from "./data";
import { NUMBER_SIZES, parseSel } from "./model";
import { normalizeCriteria } from "./sql";
import { FIELD_FORMATS } from "./ribbon";
import { AccIcon } from "./icons";
import { Btn, InlineEdit, Menu, Win, ListBox, TextIn, Check } from "./ui";
import type { ViewProps } from "./Datasheet";
import type { PopoverItem } from "../../chrome/Ribbon";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });

type PropDef = { name: string; kind: "text" | "select"; options?: string[]; builder?: "mask" | "expr" };
const YES_NO = ["Yes", "No"];
const INDEXED = ["No", "Yes (Duplicates OK)", "Yes (No Duplicates)"];
const ALIGN = ["General", "Left", "Center", "Right", "Distribute"];

function generalProps(f: AccField): PropDef[] {
  const fmt = (opts: string[]): PropDef => ({ name: "Format", kind: "text", options: opts });
  const common = [
    { name: "Caption", kind: "text" as const },
    { name: "Default Value", kind: "text" as const, builder: "expr" as const },
    { name: "Validation Rule", kind: "text" as const, builder: "expr" as const },
    { name: "Validation Text", kind: "text" as const },
  ];
  switch (f.type) {
    case "Short Text":
      return [{ name: "Field Size", kind: "text" }, fmt([">", "<", "@"]), { name: "Input Mask", kind: "text", builder: "mask" }, ...common, { name: "Required", kind: "select", options: YES_NO }, { name: "Allow Zero Length", kind: "select", options: YES_NO }, { name: "Indexed", kind: "select", options: INDEXED }, { name: "Unicode Compression", kind: "select", options: YES_NO }, { name: "IME Mode", kind: "select", options: ["No Control", "On", "Off"] }, { name: "IME Sentence Mode", kind: "select", options: ["None", "Phrase Predict", "Plural Clause", "Conversation"] }, { name: "Text Align", kind: "select", options: ALIGN }];
    case "Long Text":
      return [fmt([]), ...common, { name: "Required", kind: "select", options: YES_NO }, { name: "Allow Zero Length", kind: "select", options: YES_NO }, { name: "Indexed", kind: "select", options: ["No", "Yes (Duplicates OK)"] }, { name: "Unicode Compression", kind: "select", options: YES_NO }, { name: "Text Format", kind: "select", options: ["Plain Text", "Rich Text"] }, { name: "Text Align", kind: "select", options: ALIGN }, { name: "Append Only", kind: "select", options: YES_NO }];
    case "Number":
    case "Large Number":
      return [{ name: "Field Size", kind: "select", options: NUMBER_SIZES }, fmt(FIELD_FORMATS.slice(0, 7)), { name: "Decimal Places", kind: "select", options: ["Auto", "0", "1", "2", "3", "4", "5"] }, { name: "Input Mask", kind: "text", builder: "mask" }, ...common, { name: "Required", kind: "select", options: YES_NO }, { name: "Indexed", kind: "select", options: INDEXED }, { name: "Text Align", kind: "select", options: ALIGN }];
    case "Currency":
      return [fmt(FIELD_FORMATS.slice(0, 7)), { name: "Decimal Places", kind: "select", options: ["Auto", "0", "1", "2", "3", "4"] }, { name: "Input Mask", kind: "text", builder: "mask" }, ...common, { name: "Required", kind: "select", options: YES_NO }, { name: "Indexed", kind: "select", options: INDEXED }, { name: "Text Align", kind: "select", options: ALIGN }];
    case "Date/Time":
    case "Date/Time Extended":
      return [fmt(FIELD_FORMATS.slice(7, 14)), { name: "Input Mask", kind: "text", builder: "mask" }, ...common, { name: "Required", kind: "select", options: YES_NO }, { name: "Indexed", kind: "select", options: INDEXED }, { name: "IME Mode", kind: "select", options: ["No Control", "On", "Off"] }, { name: "IME Sentence Mode", kind: "select", options: ["None", "Phrase Predict"] }, { name: "Text Align", kind: "select", options: ALIGN }, { name: "Show Date Picker", kind: "select", options: ["For dates", "Never"] }];
    case "AutoNumber":
      return [{ name: "Field Size", kind: "select", options: ["Long Integer", "Replication ID"] }, { name: "New Values", kind: "select", options: ["Increment", "Random"] }, fmt([]), { name: "Caption", kind: "text" }, { name: "Indexed", kind: "select", options: INDEXED }, { name: "Text Align", kind: "select", options: ALIGN }];
    case "Yes/No":
      return [{ name: "Format", kind: "select", options: ["True/False", "Yes/No", "On/Off"] }, ...common, { name: "Indexed", kind: "select", options: INDEXED }, { name: "Text Align", kind: "select", options: ALIGN }];
    case "Calculated":
      return [{ name: "Expression", kind: "text", builder: "expr" }, { name: "Result Type", kind: "select", options: ["Text", "Decimal", "Double", "Integer", "Long Integer", "Currency", "Date/Time", "Yes/No"] }, fmt([]), { name: "Caption", kind: "text" }, { name: "Text Align", kind: "select", options: ALIGN }];
    case "Hyperlink":
      return [fmt([]), ...common, { name: "Required", kind: "select", options: YES_NO }, { name: "Allow Zero Length", kind: "select", options: YES_NO }, { name: "Indexed", kind: "select", options: INDEXED }, { name: "Text Align", kind: "select", options: ALIGN }];
    default:
      return [{ name: "Caption", kind: "text" }, { name: "Required", kind: "select", options: YES_NO }];
  }
}

function propValue(f: AccField, name: string): string {
  switch (name) {
    case "Field Size": return f.type === "Short Text" ? f.size ?? "255" : f.size ?? (f.type === "AutoNumber" ? "Long Integer" : "Long Integer");
    case "Format": return f.format ?? "";
    case "Decimal Places": return f.decimalPlaces ?? "Auto";
    case "Input Mask": return f.inputMask ?? "";
    case "Caption": return f.caption ?? "";
    case "Default Value": return f.defaultValue ?? "";
    case "Validation Rule": return f.validationRule ?? "";
    case "Validation Text": return f.validationText ?? "";
    case "Required": return f.required ? "Yes" : "No";
    case "Allow Zero Length": return f.allowZeroLength ? "Yes" : "No";
    case "Indexed": return f.indexed ?? "No";
    case "New Values": return f.newValues ?? "Increment";
    case "Expression": return f.expression ?? "";
    case "Row Source": return f.lookup?.values ? f.lookup.values.map((v) => `"${v}"`).join(";") : f.lookup?.table ?? "";
    case "Row Source Type": return f.lookup?.values ? "Value List" : "Table/Query";
    case "Limit To List": return f.lookup?.limitToList ? "Yes" : "No";
    case "Display Control": return f.lookup ? "Combo Box" : f.type === "Yes/No" ? "Check Box" : "Text Box";
    case "Allow Multiple Values": return f.lookup?.multi ? "Yes" : "No";
  }
  return f.props?.[name] ?? (name === "Unicode Compression" ? "Yes" : name === "IME Mode" ? "No Control" : name === "IME Sentence Mode" ? "None" : name === "Text Align" ? "General" : name === "Show Date Picker" ? "For dates" : name === "Text Format" ? "Plain Text" : name === "Append Only" ? "No" : name === "Bound Column" ? "1" : name === "Column Count" ? "1" : "");
}

const HELP: Record<string, string> = {
  "Field Name": "A field name can be up to 64 characters long, including spaces. Press F1 for help on field names.",
  "Data Type": "The data type determines the kind of values that users can store in the field. Press F1 for help on data types.",
  Description: "The field description is optional. It helps you describe the field and is also displayed in the status bar when you select this field on a form. Press F1 for help on descriptions.",
  "Field Size": "The maximum number of characters you can enter in the field. The largest maximum you can set is 255. Press F1 for help on field size.",
  Format: "The display layout for the field. Select a pre-defined format or enter a custom format. Press F1 for help on formats.",
  "Input Mask": "A pattern for all data to be entered in this field. Press F1 for help on input masks.",
  Caption: "The label for the field when used on a view. If you don't enter a caption, the field name is used as the label. Press F1 for help on captions.",
  "Default Value": "A value that is automatically entered in this field for new records.",
  "Validation Rule": "An expression that limits the values that can be entered in the field. Press F1 for help on validation rules.",
  "Validation Text": "The error message that appears when you enter a value prohibited by the validation rule. Press F1 for help on validation text.",
  Required: "Require data entry in this field?",
  "Allow Zero Length": "Allow zero-length strings in this field?",
  Indexed: "An index speeds up searches and sorting on the field, but may slow updates. Selecting \"Yes - No Duplicates\" prohibits duplicate values in the field. Press F1 for help on indexed fields.",
  "Decimal Places": "The number of digits that are displayed to the right of the decimal separator.",
  "New Values": "How new values should be generated for the AutoNumber field.",
  "Row Source": "Source of control's data.",
  "Limit To List": "Limit entries to items in the list?",
};

const MASKS: { name: string; mask: string; sample: string }[] = [
  { name: "Phone Number", mask: '!\\(999") "000\\-0000;;_', sample: "(206) 555-1212" },
  { name: "Social Security Number", mask: "000\\-00\\-0000;;_", sample: "831-86-7180" },
  { name: "Zip Code", mask: "00000\\-9999;;_", sample: "98052-6399" },
  { name: "Extension", mask: "!99999;;_", sample: "63215" },
  { name: "Password", mask: "Password", sample: "********" },
  { name: "Long Time", mask: "99:00:00\\ >LL;0;_", sample: "1:12:00 PM" },
  { name: "Short Date", mask: "99/99/0000;0;_", sample: "9/27/1969" },
  { name: "Short Time", mask: "00:00;0;_", sample: "13:12" },
  { name: "Medium Time", mask: "00:00\\ >LL;0;_", sample: "01:12 PM" },
];

export function TableDesign({ doc, ui, tab, onSelect, onCommit, openDialog, showMsg }: ViewProps) {
  const t = findTable(doc, tab.name);
  const sel = parseSel(ui.selection);
  const [edit, setEdit] = useState<{ row: number; col: "name" | "desc" } | null>(null);
  const [propTab, setPropTab] = useState<"General" | "Lookup">("General");
  const [focusProp, setFocusProp] = useState<string>("Field Name");
  const [menu, setMenu] = useState<{ x: number; y: number; items: PopoverItem[] } | null>(null);
  const [maskWiz, setMaskWiz] = useState<{ page: number; pick: string; mask: string; store: boolean } | null>(null);
  const [builder, setBuilder] = useState<{ prop: string; text: string } | null>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  useEffect(() => setEdit(null), [doc]);
  if (!t) return null;
  const fields = t.fields;
  const cur = sel.k === "field" && sel.table === t.name ? fields.find((f) => f.name === sel.field) : undefined;
  const curIdx = cur ? fields.indexOf(cur) : -1;
  const insertAt = doc.designInsert && doc.designInsert.table === t.name ? doc.designInsert.index : -1;
  const rowsShown = Math.max(fields.length + 1 + (insertAt >= 0 ? 1 : 0), 14);

  const selectField = (f: AccField) => onSelect({ selection: `field:${t.name}.${f.name}` });
  const commitProp = (prop: string, raw: string) => {
    if (!cur) return;
    let v = raw;
    if (prop === "Validation Rule" || prop === "Default Value" || prop === "Expression") v = normalizeCriteria(raw, prop === "Default Value" ? [] : fields.map((f) => f.name));
    if (prop === "Validation Rule" && v) {
      try {
        // Rules that can't parse get Access's syntax error.
        normalizeCriteria(v);
      } catch {
        showMsg(`The expression you entered contains invalid syntax.`);
        return;
      }
    }
    if (prop === "Field Size" && cur.type === "Short Text") {
      const n = Number(v);
      if (!Number.isInteger(n) || n < 1 || n > 255) {
        showMsg("The setting for the FieldSize property must be from 1 through 255.");
        return;
      }
      const longest = Math.max(0, ...t.rows.map((r) => String(r[cur.name] ?? "").length));
      if (n < longest) showMsg("Some data may be lost.\n\nThe size of one or more fields has been changed to a shorter size. If data is lost, validation rules may be violated as a result.", undefined, "warning");
    }
    if (propValue(cur, prop) === v) return;
    onCommit({ kind: "type", target: `prop:${prop}`, value: v });
  };

  const rowMenu = (e: React.MouseEvent, f: AccField) => {
    e.preventDefault();
    selectField(f);
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { key: "pk", label: "Primary Key", icon: "protect", onPick: () => onCommit(cmd("design.primaryKey")) },
        { key: "s1", separator: true },
        { key: "x", label: "Cut", icon: "cut", onPick: () => undefined },
        { key: "c", label: "Copy", icon: "copy", onPick: () => undefined },
        { key: "p", label: "Paste", icon: "paste", onPick: () => undefined },
        { key: "s2", separator: true },
        { key: "ins", label: "Insert Rows", icon: "insertCells", onPick: () => onCommit(cmd("design.insertRows")) },
        { key: "del", label: "Delete Rows", icon: "deleteCells", onPick: () => onCommit(cmd("design.deleteRows")) },
        { key: "s3", separator: true },
        { key: "b", label: "Build...", icon: "designer", onPick: () => undefined },
        { key: "pr", label: "Properties", icon: "options", onPick: () => onCommit(cmd("design.propertySheet")) },
      ],
    });
  };

  const typeChange = (f: AccField, v: string) => {
    selectField(f);
    if (v === "Lookup Wizard...") {
      openDialog(`backstage:lookupWizard|${t.name}|${f.name}`);
      return;
    }
    if (v === "AutoNumber" && t.rows.length) {
      showMsg("Once you enter data in a table, you can't change the data type of any field to AutoNumber, even if you haven't yet added data to that field.\n\nAdd a new field to the table, and define its data type as AutoNumber.");
      return;
    }
    if (v === f.type) return;
    setTimeout(() => onCommit({ kind: "command", id: "field.dataType", value: v }), 0);
  };

  const props = cur ? (propTab === "General" ? generalProps(cur) : lookupProps(cur)) : [];

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-[12px]">
      <div
        ref={focusRef}
        tabIndex={0}
        className="min-h-0 flex-[1.15] overflow-auto outline-none"
        onKeyDown={(e) => {
          if (edit) return;
          if (e.key === "ArrowDown" && curIdx < fields.length - 1) { e.preventDefault(); selectField(fields[curIdx + 1]); }
          if (e.key === "ArrowUp" && curIdx > 0) { e.preventDefault(); selectField(fields[curIdx - 1]); }
          if (e.key === "Delete" && cur) { e.preventDefault(); e.stopPropagation(); onCommit(cmd("design.deleteRows")); }
          if (e.key === "F2" && cur) { e.preventDefault(); setEdit({ row: curIdx, col: "name" }); }
        }}
      >
        <table className="w-full border-separate border-spacing-0" style={{ tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: 22 }} />
            <col style={{ width: "26%" }} />
            <col style={{ width: "20%" }} />
            <col />
          </colgroup>
          <thead className="sticky top-0 z-10">
            <tr className="h-[22px] bg-[#f3f3f3]">
              <th className="border-b border-r border-[#c6c6c6]" />
              <th className="border-b border-r border-[#c6c6c6] px-1 text-left font-normal">Field Name</th>
              <th className="border-b border-r border-[#c6c6c6] px-1 text-left font-normal">Data Type</th>
              <th className="border-b border-[#c6c6c6] px-1 text-left font-normal">Description (Optional)</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowsShown }).map((_, i) => {
              let f: AccField | undefined;
              let isInsert = false;
              if (insertAt >= 0) {
                if (i < insertAt) f = fields[i];
                else if (i === insertAt) isInsert = true;
                else f = fields[i - 1];
              } else f = fields[i];
              const firstEmpty = !f && !isInsert && (insertAt >= 0 ? i === fields.length + 1 : i === fields.length);
              const isPk = f && t.pk?.some((k) => k.toLowerCase() === f!.name.toLowerCase());
              const active = f && cur === f;
              const nameEditing = edit && edit.row === i && edit.col === "name";
              const descEditing = edit && edit.row === i && edit.col === "desc";
              return (
                <tr key={i} className="h-[21px]">
                  <td
                    className={`cursor-pointer border-b border-r border-[#c6c6c6] text-center ${active ? "bg-[#fde5b4]" : "bg-[#f3f3f3]"}`}
                    onMouseDown={() => { if (f) selectField(f); focusRef.current?.focus(); }}
                    onContextMenu={(e) => f && rowMenu(e, f)}
                    aria-label={f ? `Row selector ${f.name}` : "Row selector"}
                  >
                    <span className="flex items-center justify-center gap-0">
                      {active && <AccIcon name="arrow" size={8} />}
                      {isPk && <AccIcon name="key" size={11} />}
                    </span>
                  </td>
                  <td
                    className={`border-b border-r border-[#e1e1e1] ${nameEditing ? "p-0" : "px-1"} ${active && focusProp === "Field Name" ? "outline outline-2 -outline-offset-2 outline-[#217346]" : ""}`}
                    onMouseDown={(e) => {
                      if (nameEditing) return;
                      e.preventDefault();
                      if (f) { selectField(f); setFocusProp("Field Name"); }
                      if (f || firstEmpty || isInsert) setEdit({ row: i, col: "name" });
                    }}
                    onContextMenu={(e) => f && rowMenu(e, f)}
                  >
                    {nameEditing ? (
                      <InlineEdit
                        ariaLabel="Field Name"
                        value={f?.name ?? ""}
                        maxLength={64}
                        onCommit={(v, how) => {
                          setEdit(null);
                          const n = v.trim();
                          if (!n) return;
                          if (/[.!`[\]]/.test(n)) {
                            showMsg(`'${n}' is not a valid name. Make sure that it does not include invalid characters or punctuation and that it is not too long.`);
                            return;
                          }
                          if (f) {
                            if (n !== f.name) {
                              if (fields.some((x) => x !== f && x.name.toLowerCase() === n.toLowerCase())) { showMsg(`The field name '${n}' is already in use. Type a different name.`); return; }
                              onCommit({ kind: "type", target: `fname:${t.name}.${f.name}`, value: n });
                            }
                            if (how === "tab" || how === "enter") setFocusProp("Data Type");
                            return;
                          }
                          if (fields.some((x) => x.name.toLowerCase() === n.toLowerCase())) { showMsg(`The field name '${n}' is already in use. Type a different name.`); return; }
                          onCommit({ kind: "type", target: `fname:${t.name}.new`, value: n });
                          setFocusProp("Data Type");
                        }}
                        onCancel={() => setEdit(null)}
                      />
                    ) : (
                      <span className="block truncate">{f?.name ?? ""}</span>
                    )}
                  </td>
                  <td className={`border-b border-r border-[#e1e1e1] p-0 ${active && focusProp === "Data Type" ? "outline outline-2 -outline-offset-2 outline-[#217346]" : ""}`}>
                    {f && (
                      <select
                        aria-label={`Data Type for ${f.name}`}
                        value={f.type}
                        onMouseDown={(e) => { e.stopPropagation(); selectField(f); setFocusProp("Data Type"); }}
                        onKeyDown={(e) => e.stopPropagation()}
                        onChange={(e) => typeChange(f, e.target.value)}
                        className="h-[20px] w-full cursor-pointer bg-transparent px-0.5 text-[12px] outline-none"
                      >
                        {DATA_TYPES.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td
                    className={`border-b border-[#e1e1e1] ${descEditing ? "p-0" : "px-1"}`}
                    onMouseDown={(e) => {
                      if (descEditing || !f) return;
                      e.preventDefault();
                      selectField(f);
                      setFocusProp("Description");
                      setEdit({ row: i, col: "desc" });
                    }}
                  >
                    {descEditing && f ? (
                      <InlineEdit
                        ariaLabel="Description"
                        value={f.description ?? ""}
                        onCommit={(v) => {
                          setEdit(null);
                          if (v !== (f.description ?? "")) onCommit({ kind: "type", target: `fdesc:${t.name}.${f.name}`, value: v });
                        }}
                        onCancel={() => setEdit(null)}
                      />
                    ) : (
                      <span className="block truncate text-gray-700">{f?.description ?? ""}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Field Properties */}
      <div className="flex min-h-0 flex-1 flex-col border-t-[3px] border-[#d6d6d6] bg-[#f6f6f6]">
        <div className="flex h-[20px] shrink-0 items-center bg-[#e9e9e9] px-2 text-[11px] text-gray-700">Field Properties</div>
        <div className="flex min-h-0 flex-1">
          <div className="flex min-h-0 w-[62%] flex-col">
            <div role="tablist" className="flex gap-0.5 px-1 pt-1">
              {(["General", "Lookup"] as const).map((p) => (
                <button key={p} type="button" role="tab" aria-selected={propTab === p} onClick={() => setPropTab(p)} className={`border border-b-0 px-3 py-[1px] ${propTab === p ? "border-[#c6c6c6] bg-white" : "border-transparent text-gray-600"}`}>
                  {p}
                </button>
              ))}
            </div>
            <div className="min-h-0 flex-1 overflow-auto border-t border-[#c6c6c6] bg-white">
              {cur &&
                props.map((p) => (
                  <PropRow
                    key={`${cur.name}-${p.name}`}
                    def={p}
                    value={propValue(cur, p.name)}
                    onFocus={() => setFocusProp(p.name)}
                    onCommit={(v) => commitProp(p.name, v)}
                    onBuilder={() => (p.builder === "mask" ? setMaskWiz({ page: 0, pick: MASKS[0].name, mask: MASKS[0].mask, store: false }) : setBuilder({ prop: p.name, text: propValue(cur, p.name) }))}
                  />
                ))}
            </div>
          </div>
          <div className="flex w-[38%] items-center justify-center p-3 text-center text-[11.5px] leading-snug text-[#1f4e79]">{HELP[focusProp] ?? HELP["Field Name"]}</div>
        </div>
      </div>

      {menu && <Menu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}

      {maskWiz && cur && (
        <Win
          title="Input Mask Wizard"
          width={500}
          onClose={() => setMaskWiz(null)}
          footer={
            <>
              <Btn onClick={() => setMaskWiz(null)}>Cancel</Btn>
              <Btn disabled={maskWiz.page === 0} onClick={() => setMaskWiz({ ...maskWiz, page: maskWiz.page - 1 })}>&lt; Back</Btn>
              <Btn disabled={maskWiz.page === 2} onClick={() => setMaskWiz({ ...maskWiz, page: maskWiz.page + 1 })}>Next &gt;</Btn>
              <Btn
                primary
                onClick={() => {
                  const body = maskWiz.mask.split(";")[0];
                  const final = maskWiz.mask === "Password" ? "Password" : `${body};${maskWiz.store ? "0" : ""};_`;
                  setMaskWiz(null);
                  onCommit({ kind: "type", target: "prop:Input Mask", value: final });
                }}
              >
                Finish
              </Btn>
            </>
          }
        >
          {maskWiz.page === 0 && (
            <div className="flex flex-col gap-2">
              <p>Which input mask matches how you want data to look?</p>
              <p className="text-gray-600">To see how a selected mask works, use the Try it box.</p>
              <div className="border border-[#7a7a7a] bg-white">
                <div className="grid grid-cols-2 border-b border-gray-300 bg-[#f3f3f3] px-1.5 py-0.5"><span>Input Mask:</span><span>Data Look:</span></div>
                {MASKS.map((m) => (
                  <button key={m.name} type="button" onClick={() => setMaskWiz({ ...maskWiz, pick: m.name, mask: m.mask })} className={`grid w-full grid-cols-2 px-1.5 py-[1px] text-left ${maskWiz.pick === m.name ? "bg-[#0078d7] text-white" : "hover:bg-[#e5f1fb]"}`}>
                    <span>{m.name}</span>
                    <span>{m.sample}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {maskWiz.page === 1 && (
            <div className="flex flex-col gap-2">
              <p>Do you want to change the input mask?</p>
              <label className="flex items-center gap-2">Input Mask Name: <span className="font-semibold">{maskWiz.pick}</span></label>
              <label className="flex items-center gap-2">
                Input Mask:
                <TextIn ariaLabel="Input Mask" value={maskWiz.mask.split(";")[0]} onChange={(v) => setMaskWiz({ ...maskWiz, mask: v })} width={240} />
              </label>
              <label className="flex items-center gap-2">Placeholder character: <span className="border border-gray-400 bg-white px-2">_</span></label>
            </div>
          )}
          {maskWiz.page === 2 && (
            <div className="flex flex-col gap-2">
              <p>How do you want to store the data?</p>
              <label className="flex items-center gap-2"><input type="radio" name="store" checked={maskWiz.store} onChange={() => setMaskWiz({ ...maskWiz, store: true })} /> With the symbols in the mask, like this: {MASKS.find((m) => m.name === maskWiz.pick)?.sample}</label>
              <label className="flex items-center gap-2"><input type="radio" name="store" checked={!maskWiz.store} onChange={() => setMaskWiz({ ...maskWiz, store: false })} /> Without the symbols in the mask, like this: {MASKS.find((m) => m.name === maskWiz.pick)?.sample.replace(/[^\dA-Za-z]/g, "")}</label>
            </div>
          )}
        </Win>
      )}

      {builder && (
        <Win
          title="Expression Builder"
          width={520}
          onClose={() => setBuilder(null)}
          footer={
            <>
              <Btn primary onClick={() => { const b = builder; setBuilder(null); commitProp(b.prop, b.text); }}>OK</Btn>
              <Btn onClick={() => setBuilder(null)}>Cancel</Btn>
            </>
          }
        >
          <p className="mb-1">Enter an Expression to {builder.prop === "Default Value" ? "define the default value" : builder.prop === "Validation Rule" ? "validate the data in this field" : "calculate the value of the field"}:</p>
          <p className="mb-2 text-gray-600">(Examples of expressions include [field1] + [field2] and [field1] &lt; 5)</p>
          <textarea aria-label="Expression" value={builder.text} onChange={(e) => setBuilder({ ...builder, text: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-20 w-full border border-[#7a7a7a] p-1 font-mono text-[12px] outline-none" />
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
            <div>
              <div className="mb-0.5 text-gray-600">Expression Elements</div>
              <ListBox ariaLabel="Expression Elements" items={["Functions", "Constants", "Operators", t.name]} value={null} onPick={() => undefined} height={80} />
            </div>
            <div>
              <div className="mb-0.5 text-gray-600">Expression Categories</div>
              <ListBox ariaLabel="Expression Categories" items={fields.map((f) => f.name)} value={null} onPick={(v) => setBuilder({ ...builder, text: `${builder.text}[${v}]` })} height={80} />
            </div>
            <div>
              <div className="mb-0.5 text-gray-600">Expression Values</div>
              <ListBox ariaLabel="Expression Values" items={["Date()", "Now()", "Between", "And", "Or", "Not", "Like", "Is Null", "<", ">", "=", "<>", ">=", "<="]} value={null} onPick={(v) => setBuilder({ ...builder, text: `${builder.text}${builder.text && !/\s$/.test(builder.text) && /^[A-Z]/.test(v) ? " " : ""}${v}` })} height={80} />
            </div>
          </div>
        </Win>
      )}
    </div>
  );
}

function lookupProps(f: AccField): PropDef[] {
  if (!f.lookup) return [{ name: "Display Control", kind: "select", options: f.type === "Yes/No" ? ["Check Box", "Text Box", "Combo Box"] : ["Text Box", "List Box", "Combo Box"] }];
  return [
    { name: "Display Control", kind: "select", options: ["Text Box", "List Box", "Combo Box"] },
    { name: "Row Source Type", kind: "select", options: ["Table/Query", "Value List", "Field List"] },
    { name: "Row Source", kind: "text" },
    { name: "Bound Column", kind: "text" },
    { name: "Column Count", kind: "text" },
    { name: "Limit To List", kind: "select", options: YES_NO },
    { name: "Allow Multiple Values", kind: "select", options: YES_NO },
  ];
}

function PropRow({ def, value, onCommit, onFocus, onBuilder }: { def: PropDef; value: string; onCommit: (v: string) => void; onFocus: () => void; onBuilder: () => void }) {
  const [text, setText] = useState(value);
  const [focused, setFocused] = useState(false);
  useEffect(() => setText(value), [value]);
  return (
    <div className="flex h-[19px] border-b border-[#ececec]">
      <label className="w-[40%] shrink-0 truncate px-1.5 leading-[19px] text-gray-800">{def.name}</label>
      <div className="flex min-w-0 flex-1 items-center border-l border-[#ececec]">
        {def.kind === "select" ? (
          <select
            aria-label={def.name}
            value={def.options?.includes(value) ? value : def.options?.[0]}
            onFocus={onFocus}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            onChange={(e) => onCommit(e.target.value)}
            className="h-full w-full bg-transparent px-1 text-[12px] outline-none focus:bg-[#e5f1fb]"
          >
            {def.options?.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <>
            <input
              aria-label={def.name}
              list={def.options?.length ? `opts-${def.name}` : undefined}
              value={text}
              onFocus={() => { setFocused(true); onFocus(); }}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => { setFocused(false); if (text !== value) onCommit(text); }}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                if (e.key === "Escape") { setText(value); (e.target as HTMLInputElement).blur(); }
              }}
              className="h-full min-w-0 flex-1 bg-transparent px-1 text-[12px] outline-none focus:bg-white"
            />
            {def.options?.length ? (
              <datalist id={`opts-${def.name}`}>
                {def.options.map((o) => <option key={o} value={o} />)}
              </datalist>
            ) : null}
            {def.builder && (focused || true) && (
              <button type="button" aria-label={`${def.name} builder`} title="Build" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onBuilder(); }} className="h-full px-1 hover:bg-[#cce4f7]">
                <AccIcon name="dots" size={12} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { Check };
