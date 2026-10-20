/**
 * A small VBA interpreter for the Visual Basic Editor: enough to run the Sub
 * procedures an introductory lesson writes. Supports Dim/Set/assignment,
 * If/ElseIf/Else, Select Case, Do While/Until...Loop, While...Wend,
 * For...Next, Exit, Call, MsgBox, Debug.Print, DoCmd (OpenForm, OpenReport,
 * OpenQuery, OpenTable, Close, GoToRecord, RunSQL, Quit), CurrentDb and DAO
 * recordsets (OpenRecordset, EOF, MoveNext, rs!Field, RecordCount, Close),
 * and Function procedures. Execution is pure: the result lists the messages
 * shown and the DoCmd actions to perform.
 */
import type { AccessDoc } from "./types";
import { type Expr, type V, evalExpr, parseExpr, parseSql, runStmt, SqlError, toText, truthy, compare, num, NeedParam } from "./sql";
import { dataSource, findQuery, findTable } from "./data";

export type VbaAction =
  | { kind: "openForm"; name: string; view?: string; where?: string; mode?: string }
  | { kind: "openReport"; name: string; view?: string; where?: string }
  | { kind: "openQuery"; name: string }
  | { kind: "openTable"; name: string }
  | { kind: "close"; objectType?: string; name?: string }
  | { kind: "goToRecord"; record: string }
  | { kind: "runSql"; sql: string }
  | { kind: "quit" };

export interface VbaResult {
  messages: { text: string; title?: string }[];
  debug: string[];
  actions: VbaAction[];
  error?: { title: string; text: string };
  ran?: string;
}

const CONSTS: Record<string, V> = {
  vbcrlf: "\n", vbnewline: "\n", vbcr: "\n", vblf: "\n", vbtab: "\t", vbnullstring: "",
  vbokonly: 0, vbokcancel: 1, vbabortretryignore: 2, vbyesnocancel: 3, vbyesno: 4, vbretrycancel: 5,
  vbcritical: 16, vbquestion: 32, vbexclamation: 48, vbinformation: 64,
  vbok: 1, vbcancel: 2, vbabort: 3, vbretry: 4, vbignore: 5, vbyes: 6, vbno: 7,
  acnormal: 0, acviewnormal: 0, acviewdesign: 1, acviewpreview: 2, acviewreport: 5, acviewlayout: 6, acdesign: 1, acpreview: 2,
  acprevious: 0, acnext: 1, acfirst: 2, aclast: 3, acgoto: 4, acnewrec: 5,
  actable: 0, acquery: 1, acform: 2, acreport: 3, acmacro: 4, acmodule: 5,
  acformadd: 0, acformedit: 1, acformreadonly: 2, acformpropertysettings: -1,
  acsaveprompt: 0, acsaveyes: 1, acsaveno: 2, acdialog: 3, acwindownormal: 0, achidden: 1,
  dbopendynaset: 2, dbopensnapshot: 4, dbopentable: 1,
};

type Obj = { kind: "db" } | { kind: "rs"; columns: string[]; rows: V[][]; pos: number; table?: string };

interface Line {
  text: string;
  n: number;
}

interface Proc {
  name: string;
  kind: "sub" | "function";
  params: string[];
  start: number;
  end: number;
}

class Stop extends Error {
  constructor(public what: "sub" | "function" | "do" | "for") {
    super(what);
  }
}

class VbaError extends Error {
  constructor(public title: string, message: string) {
    super(message);
  }
}

function stripComment(line: string): string {
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQ = !inQ;
    if (!inQ && c === "'") return line.slice(0, i);
  }
  if (/^\s*rem(\s|$)/i.test(line)) return "";
  return line;
}

export function splitLines(code: string): Line[] {
  const raw = code.replace(/\r/g, "").split("\n");
  const out: Line[] = [];
  let buf = "";
  let start = 0;
  raw.forEach((l, i) => {
    const s = stripComment(l);
    if (!buf) start = i + 1;
    if (/\s_\s*$/.test(s)) {
      buf += s.replace(/\s_\s*$/, " ");
      return;
    }
    buf += s;
    // Split "a : b" statements outside strings (not labels like "Err:").
    const parts: string[] = [];
    let inQ = false;
    let cur = "";
    for (const ch of buf) {
      if (ch === '"') inQ = !inQ;
      if (ch === ":" && !inQ && cur.trim() && !/^\s*\w+\s*$/.test(cur)) {
        parts.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
    parts.push(cur);
    for (const p of parts) if (p.trim()) out.push({ text: p.trim(), n: start });
    buf = "";
  });
  return out;
}

export function procedures(code: string): Proc[] {
  const lines = splitLines(code);
  const out: Proc[] = [];
  let cur: Proc | null = null;
  lines.forEach((l, i) => {
    const m = /^(?:(?:public|private|friend)\s+)?(?:static\s+)?(sub|function)\s+(\w+)\s*\(([^)]*)\)/i.exec(l.text);
    if (m && !cur) {
      cur = { name: m[2], kind: m[1].toLowerCase() as "sub" | "function", params: m[3].split(",").map((p) => p.trim().replace(/^(byval|byref|optional)\s+/i, "").split(/\s+/)[0]).filter(Boolean), start: i + 1, end: -1 };
      return;
    }
    if (cur && /^end\s+(sub|function)$/i.test(l.text)) {
      cur.end = i;
      out.push(cur);
      cur = null;
    }
  });
  return out;
}

export function compileCheck(code: string): string | null {
  const lines = splitLines(code);
  const stack: string[] = [];
  for (const l of lines) {
    const t = l.text;
    if (/^(?:(?:public|private)\s+)?(sub|function)\s+\w+/i.test(t)) {
      if (stack.length) return "Expected: End Sub";
      stack.push(/function/i.test(t.split("(")[0]) ? "function" : "sub");
      if (!/\(/.test(t)) return "Expected: (";
      continue;
    }
    if (/^end\s+sub$/i.test(t)) { if (stack.pop() !== "sub") return "End Sub without Sub"; continue; }
    if (/^end\s+function$/i.test(t)) { if (stack.pop() !== "function") return "End Function without Function"; continue; }
    if (/^if\b.*\bthen$/i.test(t)) { stack.push("if"); continue; }
    if (/^end\s+if$/i.test(t)) { if (stack.pop() !== "if") return "End If without block If"; continue; }
    if (/^(elseif\b.*then|else)$/i.test(t)) { if (stack[stack.length - 1] !== "if") return "Else without If"; continue; }
    if (/^do\b/i.test(t)) { stack.push("do"); continue; }
    if (/^loop\b/i.test(t)) { if (stack.pop() !== "do") return "Loop without Do"; continue; }
    if (/^while\b/i.test(t)) { stack.push("while"); continue; }
    if (/^wend$/i.test(t)) { if (stack.pop() !== "while") return "Wend without While"; continue; }
    if (/^for\b/i.test(t)) { stack.push("for"); continue; }
    if (/^next\b/i.test(t)) { if (stack.pop() !== "for") return "Next without For"; continue; }
    if (/^select\s+case\b/i.test(t)) { stack.push("select"); continue; }
    if (/^end\s+select$/i.test(t)) { if (stack.pop() !== "select") return "End Select without Select Case"; continue; }
  }
  if (stack.length) {
    const top = stack[stack.length - 1];
    return top === "if" ? "Block If without End If" : top === "do" ? "Do without Loop" : top === "for" ? "For without Next" : top === "while" ? "While without Wend" : top === "select" ? "Select Case without End Select" : top === "function" ? "Expected End Function" : "Expected End Sub";
  }
  return null;
}

export function runVba(doc: AccessDoc, code: string, procName: string, allModules: string[] = []): VbaResult {
  const res: VbaResult = { messages: [], debug: [], actions: [] };
  const compile = compileCheck(code);
  if (compile) return { ...res, error: { title: "Microsoft Visual Basic for Applications", text: `Compile error:\n\n${compile}` } };
  const lines = splitLines(code);
  const procs = procedures(code);
  const extraProcs = allModules.flatMap((m) => procedures(m).map((p) => ({ p, code: m })));
  const explicit = lines.some((l) => /^option\s+explicit$/i.test(l.text));
  const objs: Obj[] = [];
  const objRef = (o: Obj): V => {
    objs.push(o);
    return `\u0001obj:${objs.length - 1}`;
  };
  const getObj = (v: V): Obj | null => {
    if (typeof v === "string" && v.startsWith("\u0001obj:")) return objs[Number(v.slice(5))] ?? null;
    return null;
  };
  let steps = 0;
  const db = () => dataSource(doc);

  const proc = procs.find((p) => p.name.toLowerCase() === procName.toLowerCase()) ?? (procName ? undefined : procs[0]);
  if (!proc) return { ...res, error: { title: "Microsoft Visual Basic for Applications", text: procName ? `Compile error:\n\nSub or Function not defined` : "The macro could not be found." } };
  res.ran = proc.name;

  const call = (p: Proc, codeLines: Line[], argv: V[]): V => {
    const vars = new Map<string, V>();
    const declared = new Set<string>();
    p.params.forEach((n, i) => {
      vars.set(n.toLowerCase(), argv[i] ?? null);
      declared.add(n.toLowerCase());
    });
    if (p.kind === "function") {
      vars.set(p.name.toLowerCase(), null);
      declared.add(p.name.toLowerCase());
    }

    const evalV = (src: string): V => {
      let e: Expr;
      try {
        e = parseExpr(src);
      } catch {
        throw new VbaError("Microsoft Visual Basic for Applications", "Compile error:\n\nSyntax error");
      }
      return evalExpr(e, ctx);
    };
    const ctx = {
      db: db(),
      ref: (table: string | undefined, name: string): V => {
        if (table) {
          const base = vars.get(table.toLowerCase());
          const o = base !== undefined ? getObj(base) : null;
          if (o && o.kind === "rs") {
            const n = name.toLowerCase();
            if (n === "eof") return o.pos >= o.rows.length;
            if (n === "bof") return o.pos < 0 || o.rows.length === 0;
            if (n === "recordcount") return o.rows.length;
            const ci = o.columns.findIndex((c) => c.toLowerCase() === n);
            if (ci < 0) throw new VbaError("Microsoft Visual Basic", `Run-time error '3265':\n\nItem not found in this collection.`);
            if (o.pos >= o.rows.length) throw new VbaError("Microsoft Visual Basic", "Run-time error '3021':\n\nNo current record.");
            return o.rows[o.pos][ci];
          }
          if (table.toLowerCase() === "me") return null;
          throw new VbaError("Microsoft Visual Basic", `Run-time error '424':\n\nObject required`);
        }
        const k = name.toLowerCase();
        if (vars.has(k)) return vars.get(k)!;
        if (k in CONSTS) return CONSTS[k];
        if (k === "currentdb") return objRef({ kind: "db" });
        if (k === "nothing") return null;
        if (k === "empty") return "";
        const fn = procs.find((x) => x.name.toLowerCase() === k && x.kind === "function");
        if (fn) return call(fn, lines, []);
        if (explicit) throw new VbaError("Microsoft Visual Basic for Applications", "Compile error:\n\nVariable not defined");
        return null;
      },
      call: (name: string, a: V[]): V | undefined => {
        const n = name.toLowerCase();
        if (n === "msgbox") {
          res.messages.push({ text: toText(a[0] ?? ""), title: a[2] !== undefined && a[2] !== null ? toText(a[2]) : "Microsoft Access" });
          const btn = num(a[1] ?? 0) ?? 0;
          return (btn & 7) === 4 || (btn & 7) === 3 ? 6 : 1;
        }
        if (n === "inputbox") return "";
        if (n.endsWith(".openrecordset") || n === "currentdb.openrecordset") {
          const src = toText(a[0] ?? "");
          return objRef(openRs(src));
        }
        if (/^\w+$/.test(n)) {
          const base = vars.get(n);
          const o = base !== undefined ? getObj(base) : null;
          if (o && o.kind === "rs") {
            const ci = o.columns.findIndex((c) => c.toLowerCase() === toText(a[0] ?? "").toLowerCase());
            if (ci < 0 || o.pos >= o.rows.length) return null;
            return o.rows[o.pos][ci];
          }
          const fn = procs.find((x) => x.name.toLowerCase() === n && x.kind === "function") ?? extraProcs.find((x) => x.p.name.toLowerCase() === n && x.p.kind === "function")?.p;
          if (fn) return call(fn, lines, a);
        }
        return undefined;
      },
    };

    const openRs = (src: string): Obj => {
      const t = findTable(doc, src);
      const q = findQuery(doc, src);
      const sql = t ? `SELECT * FROM [${t.name}]` : q ? `SELECT * FROM [${q.name}]` : src;
      try {
        const r = runStmt(parseSql(sql), db());
        if (!r.result) throw new SqlError("Cannot open a recordset on an action query.");
        return { kind: "rs", columns: r.result.columns, rows: r.result.rows, pos: 0, table: t?.name };
      } catch (e) {
        if (e instanceof NeedParam) throw new VbaError("Microsoft Visual Basic", "Run-time error '3061':\n\nToo few parameters. Expected 1.");
        throw new VbaError("Microsoft Visual Basic", `Run-time error '3078':\n\n${(e as Error).message}`);
      }
    };

    const assign = (name: string, v: V) => {
      const k = name.toLowerCase();
      if (explicit && !declared.has(k)) throw new VbaError("Microsoft Visual Basic for Applications", "Compile error:\n\nVariable not defined");
      vars.set(k, v);
    };

    const args = (s: string): string[] => {
      const out: string[] = [];
      let cur = "";
      let depth = 0;
      let inQ = false;
      for (const ch of s) {
        if (ch === '"') inQ = !inQ;
        if (!inQ && ch === "(") depth++;
        if (!inQ && ch === ")") depth--;
        if (!inQ && depth === 0 && ch === ",") {
          out.push(cur.trim());
          cur = "";
          continue;
        }
        cur += ch;
      }
      out.push(cur.trim());
      return out;
    };
    const optV = (s: string | undefined) => (s === undefined || s === "" ? undefined : evalV(s));

    const doCmd = (method: string, rest: string) => {
      const a = rest.trim() ? args(rest.replace(/^\((.*)\)$/, "$1")) : [];
      const s = (i: number) => {
        const v = optV(a[i]);
        return v === undefined || v === null ? undefined : toText(v);
      };
      const viewName = (v: V | undefined, kind: "form" | "report") => {
        const n = v === undefined || v === null ? 0 : num(v) ?? 0;
        if (kind === "report") return n === 2 ? "Print Preview" : n === 1 ? "Design View" : n === 6 ? "Layout View" : n === 5 ? "Report View" : "Print";
        return n === 1 ? "Design View" : n === 2 ? "Print Preview" : n === 3 ? "Datasheet View" : n === 6 ? "Layout View" : "Form View";
      };
      switch (method.toLowerCase()) {
        case "openform": res.actions.push({ kind: "openForm", name: s(0) ?? "", view: viewName(optV(a[1]), "form"), where: s(3), mode: s(4) }); return;
        case "openreport": res.actions.push({ kind: "openReport", name: s(0) ?? "", view: viewName(optV(a[1]), "report"), where: s(3) }); return;
        case "openquery": res.actions.push({ kind: "openQuery", name: s(0) ?? "" }); return;
        case "opentable": res.actions.push({ kind: "openTable", name: s(0) ?? "" }); return;
        case "close": {
          const t = optV(a[0]);
          res.actions.push({ kind: "close", objectType: t === undefined ? undefined : ["Table", "Query", "Form", "Report", "Macro", "Module"][num(t) ?? 2], name: s(1) });
          return;
        }
        case "gotorecord": {
          const r = num(optV(a[2]) ?? 1) ?? 1;
          res.actions.push({ kind: "goToRecord", record: ["Previous", "Next", "First", "Last", "Go To", "New"][r] ?? "Next" });
          return;
        }
        case "runsql": res.actions.push({ kind: "runSql", sql: s(0) ?? "" }); return;
        case "quit": res.actions.push({ kind: "quit" }); return;
        case "beep": case "setwarnings": case "hourglass": case "maximize": case "requery": case "save": case "echo": case "applyfilter": case "showallrecords": return;
      }
      throw new VbaError("Microsoft Visual Basic", `Run-time error '438':\n\nObject doesn't support this property or method`);
    };

    /** Find the line that closes a block opened at `from`. */
    const blockEnd = (from: number, open: RegExp, close: RegExp, mids: RegExp | null = null): { end: number; mids: number[] } => {
      let depth = 0;
      const midList: number[] = [];
      for (let i = from + 1; i < p.end; i++) {
        const t = codeLines[i].text;
        if (open.test(t)) depth++;
        else if (close.test(t)) {
          if (depth === 0) return { end: i, mids: midList };
          depth--;
        } else if (mids && depth === 0 && mids.test(t)) midList.push(i);
      }
      throw new VbaError("Microsoft Visual Basic for Applications", "Compile error:\n\nBlock not closed");
    };

    const IF_OPEN = /^if\b.*\bthen$/i;
    const exec = (from: number, to: number): void => {
      let i = from;
      while (i < to) {
        if (++steps > 20000) throw new VbaError("Microsoft Visual Basic", "The code ran too long and was stopped. Check that your loop moves to the next record (rs.MoveNext) or changes its counter.");
        const t = codeLines[i].text;
        let m: RegExpExecArray | null;
        if (/^(option|attribute)\b/i.test(t) || /^on\s+error\b/i.test(t) || /^\w+:$/.test(t) || /^resume\b/i.test(t)) { i++; continue; }
        if ((m = /^(?:dim|private|public|static|const)\s+(.+)$/i.exec(t))) {
          for (const d of args(m[1])) {
            const dm = /^(\w+)(?:\(\s*\))?(?:\s+as\s+(?:new\s+)?[\w.]+)?(?:\s*=\s*(.+))?$/i.exec(d);
            if (!dm) continue;
            declared.add(dm[1].toLowerCase());
            vars.set(dm[1].toLowerCase(), dm[3] ? evalV(dm[3]) : /as\s+(integer|long|double|single|currency|byte)/i.test(d) ? 0 : /as\s+string/i.test(d) ? "" : /as\s+boolean/i.test(d) ? false : null);
          }
          i++;
          continue;
        }
        if (/^exit\s+sub$/i.test(t) || /^exit\s+function$/i.test(t)) throw new Stop(p.kind);
        if (/^exit\s+do$/i.test(t)) throw new Stop("do");
        if (/^exit\s+for$/i.test(t)) throw new Stop("for");
        if (IF_OPEN.test(t)) {
          const blk = blockEnd(i, IF_OPEN, /^end\s+if$/i, /^(elseif\b.*then|else)$/i);
          const branches: { cond: string | null; start: number }[] = [{ cond: /^if\s+(.+)\s+then$/i.exec(t)![1], start: i + 1 }];
          for (const mi of blk.mids) {
            const mt = codeLines[mi].text;
            const em = /^elseif\s+(.+)\s+then$/i.exec(mt);
            branches.push({ cond: em ? em[1] : null, start: mi + 1 });
          }
          for (let b = 0; b < branches.length; b++) {
            const br = branches[b];
            const end = b + 1 < branches.length ? branches[b + 1].start - 1 : blk.end;
            if (br.cond === null || truthy(evalV(br.cond))) {
              exec(br.start, end);
              break;
            }
          }
          i = blk.end + 1;
          continue;
        }
        if ((m = /^if\s+(.+?)\s+then\s+(.+?)(?:\s+else\s+(.+))?$/i.exec(t))) {
          const branch = truthy(evalV(m[1])) ? m[2] : m[3];
          if (branch) execInline(branch);
          i++;
          continue;
        }
        if ((m = /^select\s+case\s+(.+)$/i.exec(t))) {
          const blk = blockEnd(i, /^select\s+case\b/i, /^end\s+select$/i, /^case\b/i);
          const v = evalV(m[1]);
          for (let b = 0; b < blk.mids.length; b++) {
            const ct = codeLines[blk.mids[b]].text.replace(/^case\s+/i, "");
            const end = b + 1 < blk.mids.length ? blk.mids[b + 1] : blk.end;
            const hit = /^else$/i.test(ct) || args(ct).some((c) => {
              const is = /^is\s*(<=|>=|<>|<|>|=)\s*(.+)$/i.exec(c);
              if (is) {
                const r = compare(v, evalV(is[2]));
                return r !== null && ({ "<": r < 0, ">": r > 0, "<=": r <= 0, ">=": r >= 0, "=": r === 0, "<>": r !== 0 } as Record<string, boolean>)[is[1]];
              }
              const to = /^(.+)\s+to\s+(.+)$/i.exec(c);
              if (to) {
                const a1 = compare(v, evalV(to[1])), b1 = compare(v, evalV(to[2]));
                return a1 !== null && b1 !== null && a1 >= 0 && b1 <= 0;
              }
              return compare(v, evalV(c)) === 0;
            });
            if (hit) {
              exec(blk.mids[b] + 1, end);
              break;
            }
          }
          i = blk.end + 1;
          continue;
        }
        if (/^do\b/i.test(t)) {
          const blk = blockEnd(i, /^do\b/i, /^loop\b/i);
          const head = /^do\s+(while|until)\s+(.+)$/i.exec(t);
          const tail = /^loop\s+(while|until)\s+(.+)$/i.exec(codeLines[blk.end].text);
          const test = (kind: string, cond: string) => (kind.toLowerCase() === "while" ? truthy(evalV(cond)) : !truthy(evalV(cond)));
          try {
            for (let guard = 0; guard < 5000; guard++) {
              if (head && !test(head[1], head[2])) break;
              exec(i + 1, blk.end);
              if (tail && !test(tail[1], tail[2])) break;
              if (++steps > 20000) throw new VbaError("Microsoft Visual Basic", "The code ran too long and was stopped. Check that your loop moves to the next record (rs.MoveNext) or changes its counter.");
            }
          } catch (e) {
            if (!(e instanceof Stop && e.what === "do")) throw e;
          }
          i = blk.end + 1;
          continue;
        }
        if ((m = /^while\s+(.+)$/i.exec(t))) {
          const blk = blockEnd(i, /^while\b/i, /^wend$/i);
          for (let guard = 0; guard < 5000 && truthy(evalV(m[1])); guard++) exec(i + 1, blk.end);
          i = blk.end + 1;
          continue;
        }
        if ((m = /^for\s+(\w+)\s*=\s*(.+?)\s+to\s+(.+?)(?:\s+step\s+(.+))?$/i.exec(t))) {
          const blk = blockEnd(i, /^for\b/i, /^next\b/i);
          const v = m[1];
          const a0 = num(evalV(m[2])) ?? 0, b0 = num(evalV(m[3])) ?? 0, st = m[4] ? num(evalV(m[4])) ?? 1 : 1;
          assign(v, a0);
          try {
            for (let guard = 0; guard < 5000; guard++) {
              const cur = num(vars.get(v.toLowerCase()) ?? 0) ?? 0;
              if (st >= 0 ? cur > b0 : cur < b0) break;
              exec(i + 1, blk.end);
              assign(v, (num(vars.get(v.toLowerCase()) ?? 0) ?? 0) + st);
            }
          } catch (e) {
            if (!(e instanceof Stop && e.what === "for")) throw e;
          }
          i = blk.end + 1;
          continue;
        }
        execInline(t);
        i++;
      }
    };

    const execInline = (t: string) => {
      let m: RegExpExecArray | null;
      if ((m = /^(?:set\s+|let\s+)?(\w+)\s*=\s*(.+)$/i.exec(t)) && !/^(msgbox|call|debug|docmd)$/i.test(m[1])) {
        assign(m[1], evalV(m[2]));
        return;
      }
      if ((m = /^(\w+)!(\w+|\[[^\]]+\])\s*=\s*(.+)$/i.exec(t))) return; // rs!Field = x (edits are not saved in the simulator)
      if ((m = /^msgbox\b\s*(.*)$/i.exec(t))) {
        const a = args(m[1].replace(/^\((.*)\)$/, "$1"));
        ctx.call("MsgBox", a.map((x) => (x === "" ? null : evalV(x))));
        return;
      }
      if ((m = /^debug\.print\s*(.*)$/i.exec(t))) {
        res.debug.push(m[1].split(";").map((x) => (x.trim() ? toText(evalV(x.trim())) : "")).join(""));
        return;
      }
      if ((m = /^docmd\.(\w+)\s*(.*)$/i.exec(t))) {
        doCmd(m[1], m[2]);
        return;
      }
      if ((m = /^(\w+)\.(movenext|moveprevious|movefirst|movelast|close|edit|update|addnew|requery)\b/i.exec(t))) {
        const o = getObj(vars.get(m[1].toLowerCase()) ?? null);
        if (!o) throw new VbaError("Microsoft Visual Basic", "Run-time error '91':\n\nObject variable or With block variable not set");
        if (o.kind === "rs") {
          const k = m[2].toLowerCase();
          if (k === "movenext") o.pos++;
          if (k === "moveprevious") o.pos--;
          if (k === "movefirst") o.pos = 0;
          if (k === "movelast") o.pos = o.rows.length - 1;
        }
        return;
      }
      const cm = /^(?:call\s+)?(\w+)\s*(?:\((.*)\))?\s*(.*)$/i.exec(t);
      if (cm) {
        const target = procs.find((x) => x.name.toLowerCase() === cm[1].toLowerCase());
        if (target) {
          const raw = cm[2] !== undefined ? cm[2] : cm[3];
          const a = raw && raw.trim() ? args(raw).map((x) => evalV(x)) : [];
          call(target, lines, a);
          return;
        }
      }
      if (/^end$/i.test(t) || /^stop$/i.test(t)) throw new Stop(p.kind);
      throw new VbaError("Microsoft Visual Basic for Applications", "Compile error:\n\nSub or Function not defined");
    };

    try {
      exec(p.start, p.end);
    } catch (e) {
      if (!(e instanceof Stop)) throw e;
    }
    return p.kind === "function" ? vars.get(p.name.toLowerCase()) ?? null : null;
  };

  try {
    call(proc, lines, []);
  } catch (e) {
    if (e instanceof VbaError) res.error = { title: e.title, text: e.message };
    else res.error = { title: "Microsoft Visual Basic", text: `Run-time error '13':\n\n${(e as Error).message || "Type mismatch"}` };
  }
  return res;
}

/** Evaluate a line typed in the Immediate window. */
export function immediate(doc: AccessDoc, line: string, code = ""): string[] {
  const t = line.trim();
  if (!t) return [];
  const m = /^(?:\?|print\s+|debug\.print\s+)(.+)$/i.exec(t);
  const wrapped = `Sub __Immediate__()\n${m ? `Debug.Print ${m[1]}` : t}\nEnd Sub\n${code.replace(/^option\s+explicit\s*$/gim, "")}`;
  const r = runVba(doc, wrapped, "__Immediate__");
  const out = [...r.debug, ...r.messages.map((x) => `[MsgBox] ${x.text}`)];
  if (r.error) out.push(r.error.text.replace(/\n+/g, " "));
  return out;
}

/** Sub procedures that can be run (no arguments). */
export function runnableSubs(code: string): string[] {
  return procedures(code).filter((p) => p.kind === "sub" && p.params.length === 0).map((p) => p.name);
}

/* ------------------------------------------------------------------ */
/* Pretty-printing (what the editor does when you leave a line)        */
/* ------------------------------------------------------------------ */

const VBA_KEYWORDS = [
  "And", "As", "Boolean", "ByRef", "ByVal", "Call", "Case", "Compare", "Const", "Currency", "Database", "Date", "Debug", "Dim", "Do", "DoCmd", "Double",
  "Each", "Else", "ElseIf", "End", "Error", "Exit", "Explicit", "False", "For", "Function", "GoTo", "If", "In", "Integer", "Is", "Long", "Loop", "Me",
  "Mod", "MsgBox", "New", "Next", "Not", "Nothing", "Object", "On", "Option", "Or", "Print", "Private", "Public", "Resume", "Select", "Set", "Single",
  "Step", "String", "Sub", "Then", "To", "True", "Until", "Variant", "Wend", "While", "With", "CurrentDb", "Recordset", "DAO", "Nz", "Len", "Trim",
];
const KW = new Map(VBA_KEYWORDS.map((k) => [k.toLowerCase(), k]));
const UNARY_AFTER = new Set(["", "(", ",", "=", "<", ">", "<=", ">=", "<>", "+", "-", "*", "/", "\\", "&", "^", ":=", "then", "to", "step", "and", "or", "not", "mod", "return", "is", "case", "print"]);

/** Space one line of VBA the way the editor does: `x=x+1` → `x = x + 1`, `if a<b then` → `If a < b Then`. */
export function prettyVbaLine(line: string): string {
  const indent = /^\s*/.exec(line)?.[0] ?? "";
  const body = line.slice(indent.length);
  if (!body.trim() || /^rem\b/i.test(body)) return line.replace(/\s+$/, "");
  // Split off a trailing comment ('...) that is not inside a string.
  let code = body;
  let comment = "";
  let inStr = false;
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '"') inStr = !inStr;
    else if (body[i] === "'" && !inStr) {
      code = body.slice(0, i);
      comment = body.slice(i);
      break;
    }
  }
  if (inStr) return line.replace(/\s+$/, "");
  type T = { k: "str" | "date" | "word" | "num" | "op" | "punc" | "cont"; v: string };
  const toks: T[] = [];
  let i = 0;
  while (i < code.length) {
    const c = code[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '"') {
      let j = i + 1;
      while (j < code.length && !(code[j] === '"' && code[j + 1] !== '"')) j += code[j] === '"' ? 2 : 1;
      toks.push({ k: "str", v: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    if (c === "#" && /^#[^#\n]+#/.test(code.slice(i))) {
      const m = /^#[^#\n]+#/.exec(code.slice(i))![0];
      toks.push({ k: "date", v: m });
      i += m.length;
      continue;
    }
    if (c === "_" && /^_\s*$/.test(code.slice(i))) { toks.push({ k: "cont", v: "_" }); break; }
    if (/[A-Za-z_]/.test(c)) {
      // Keep a!b, a.b and [Field] chains together as one word.
      let w = /^[A-Za-z_]\w*/.exec(code.slice(i))![0];
      let j = i + w.length;
      while (j < code.length && (code[j] === "." || code[j] === "!") && /[A-Za-z_[]/.test(code[j + 1] ?? "")) {
        const rest = code.slice(j + 1);
        const part = rest.startsWith("[") ? (/^\[[^\]]*\]/.exec(rest)?.[0] ?? "") : (/^[A-Za-z_]\w*/.exec(rest)?.[0] ?? "");
        if (!part) break;
        w += code[j] + part;
        j += 1 + part.length;
      }
      toks.push({ k: "word", v: w });
      i = j;
      continue;
    }
    if (c === "[") {
      const m = /^\[[^\]]*\]/.exec(code.slice(i))?.[0] ?? c;
      toks.push({ k: "word", v: m });
      i += m.length;
      continue;
    }
    if (/\d/.test(c) || (c === "." && /\d/.test(code[i + 1] ?? ""))) {
      const m = /^\d*\.?\d+(e[+-]?\d+)?[#!@%&]?/i.exec(code.slice(i))![0];
      toks.push({ k: "num", v: m });
      i += m.length;
      continue;
    }
    const two = code.slice(i, i + 2);
    if (["<=", ">=", "<>", ":="].includes(two)) { toks.push({ k: "op", v: two }); i += 2; continue; }
    if ("=<>+-*/\\&^".includes(c)) { toks.push({ k: "op", v: c }); i++; continue; }
    toks.push({ k: "punc", v: c });
    i++;
  }
  let out = "";
  let prev: T | null = null;
  for (let k = 0; k < toks.length; k++) {
    const t = toks[k];
    let v = t.v;
    if (t.k === "word" && !/[.!]/.test(v) && KW.has(v.toLowerCase())) v = KW.get(v.toLowerCase())!;
    if (t.k === "word" && /^end(if|sub|function|select|with)$/i.test(v)) v = `End ${KW.get(v.slice(3).toLowerCase()) ?? v.slice(3)}`;
    const pv = prev ? (prev.k === "word" ? prev.v.toLowerCase() : prev.v) : "";
    let sep = " ";
    if (!prev) sep = "";
    else if (t.k === "punc" && v === "," && prev.k === "punc" && prev.v === ",") sep = " ";
    else if (t.k === "punc" && (v === "," || v === ")" || v === ";")) sep = "";
    else if (prev.k === "punc" && prev.v === "(") sep = "";
    else if (t.k === "punc" && v === "(" && (prev.k === "word" && !KW.has(pv) || prev.k === "punc" && prev.v === ")")) sep = "";
    else if (t.k === "op" && v === ":=") sep = "";
    else if (prev.k === "op" && prev.v === ":=") sep = "";
    else if (prev.k === "op" && prev.v === "-" && (k < 2 || UNARY_AFTER.has(toks[k - 2].k === "word" ? toks[k - 2].v.toLowerCase() : toks[k - 2].v)) && !(k >= 2 && (toks[k - 2].k === "word" && !KW.has(toks[k - 2].v.toLowerCase()) || toks[k - 2].k === "num" || toks[k - 2].k === "str" || (toks[k - 2].k === "punc" && toks[k - 2].v === ")")))) sep = "";
    else if (t.k === "punc" && v === ":") sep = "";
    out += sep + v;
    prev = { ...t, v };
  }
  const tail = comment ? `${out ? " " : ""}${comment}` : "";
  return indent + out + tail;
}

/** Pretty-print every line of a module. */
export function prettyVba(code: string): string {
  return code
    .replace(/\r/g, "")
    .split("\n")
    .map(prettyVbaLine)
    .join("\n");
}
