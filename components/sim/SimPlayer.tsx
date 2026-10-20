"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SimCommit, SimDefinition, SimDoc, SimTask, SimValue } from "@/types/sim";
import type { AppModule, MenuItem, SimUi } from "./types";
import { APPS } from "./apps";
import { Ribbon, Popover, searchRibbon } from "./chrome/Ribbon";
import { SimDialog } from "./chrome/Dialog";
import { Backstage } from "./chrome/Backstage";
import { Icon } from "./chrome/icons";
import { applyOps } from "@/lib/sim/ops";
import { commitMatches, commitSameCommand, selectionMatches, normText } from "@/lib/sim/match";
import { closesBackstage } from "@/lib/sim/common";

type Feedback = { tone: "good" | "bad" | "info"; text: string } | null;

interface TaskScore {
  misses: number;
  hint: boolean;
  done: boolean;
}

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

function isTypingTarget(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  if (!el) return false;
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable;
}

export default function SimPlayer({ sim }: { sim: SimDefinition }) {
  const app = APPS[sim.app] as unknown as AppModule<SimDoc>;
  const tasks = sim.tasks;

  const [doc, setDoc] = useState<SimDoc>(sim.initial);
  const [ui, setUi] = useState<SimUi>(() => app.initialUi(sim.initial));
  const [taskIdx, setTaskIdx] = useState(0);
  const [stepsDone, setStepsDone] = useState<Set<number>>(new Set());
  const [scores, setScores] = useState<TaskScore[]>(() => tasks.map(() => ({ misses: 0, hint: false, done: false })));
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [activeTab, setActiveTab] = useState(app.ribbon[0].id);
  const [dialog, setDialog] = useState<string | null>(null);
  const [backstage, setBackstage] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);
  const [search, setSearch] = useState("");
  const [full, setFull] = useState(false);
  const [history, setHistory] = useState<SimDoc[]>([]);
  const [future, setFuture] = useState<SimDoc[]>([]);
  const taskStart = useRef<{ doc: SimDoc; ui: SimUi }>({ doc: sim.initial, ui: app.initialUi(sim.initial) });
  const rootRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep refs of the latest state for event handlers.
  const live = useRef({ doc, ui, taskIdx, stepsDone, finished, started });
  live.current = { doc, ui, taskIdx, stepsDone, finished, started };

  const task: SimTask | undefined = tasks[taskIdx];

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  const miss = useCallback(
    (text: string) => {
      const ti = live.current.taskIdx;
      setScores((s) => {
        const next = s.slice();
        const m = next[ti].misses + 1;
        next[ti] = { ...next[ti], misses: m };
        if (m >= 3) setShowHint(true);
        return next;
      });
      setFeedback({ tone: "bad", text });
    },
    [],
  );

  const completeStep = useCallback(
    (stepIndex: number, nextDoc: SimDoc, nextUi: SimUi) => {
      const ti = live.current.taskIdx;
      const t = tasks[ti];
      const done = new Set(live.current.stepsDone);
      done.add(stepIndex);
      live.current = { ...live.current, stepsDone: done };
      setStepsDone(done);
      if (done.size >= t.steps.length) {
        setScores((s) => {
          const next = s.slice();
          next[ti] = { ...next[ti], done: true };
          return next;
        });
        setFeedback({ tone: "good", text: ti === tasks.length - 1 ? "Task complete. That was the last one." : "Task complete." });
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(() => {
          if (ti === tasks.length - 1) {
            setFinished(true);
          } else {
            setTaskIdx(ti + 1);
            setStepsDone(new Set());
            setShowHint(false);
            setFeedback(null);
            taskStart.current = { doc: nextDoc, ui: nextUi };
          }
        }, 900);
      } else {
        setFeedback({ tone: "good", text: "Good. Keep going." });
      }
    },
    [tasks],
  );

  /** Selection changes are free; a task whose goal *is* a selection completes here. */
  const handleSelect = useCallback(
    (patch: Partial<SimUi>) => {
      const nextUi = { ...live.current.ui, ...patch };
      live.current = { ...live.current, ui: nextUi };
      setUi(nextUi);
      if (!live.current.started || live.current.finished) return;
      const t = tasks[live.current.taskIdx];
      if (!t) return;
      const remaining = t.steps.map((_, i) => i).filter((i) => !live.current.stepsDone.has(i));
      const candidates = t.anyOrder ? remaining : remaining.slice(0, 1);
      for (const i of candidates) {
        const s = t.steps[i];
        if (s.action.kind !== "select") continue;
        const targets = Array.isArray(s.action.target) ? s.action.target : [s.action.target];
        if (selectionMatches({ selection: targets, sheet: s.requires?.sheet, slide: s.requires?.slide }, nextUi)) {
          const nd = applyOps(live.current.doc, s.effects);
          if (nd !== live.current.doc) setDoc(nd);
          completeStep(i, nd, nextUi);
          return;
        }
      }
    },
    [tasks, completeStep],
  );

  const handleCommit = useCallback(
    (raw: SimCommit) => {
      const c = app.normalize ? app.normalize(raw) : raw;
      setMenu(null);
      const { doc: d, ui: u, finished: fin, started: st } = live.current;
      if (!st) return;

      // Undo / redo are real, and still judged like any other command.
      const runBuiltIn = (base: SimDoc): { doc: SimDoc; ui: SimUi } => {
        if (c.kind === "command" && c.id === "qat.undo") {
          if (!history.length) return { doc: base, ui: u };
          setFuture((f) => [base, ...f]);
          const prev = history[history.length - 1];
          setHistory((h) => h.slice(0, -1));
          return { doc: prev, ui: u };
        }
        if (c.kind === "command" && c.id === "qat.redo") {
          if (!future.length) return { doc: base, ui: u };
          const nxt = future[0];
          setFuture((f) => f.slice(1));
          setHistory((h) => [...h, base]);
          return { doc: nxt, ui: u };
        }
        const r = app.apply(base, c, u);
        return { doc: r.doc, ui: { ...u, ...(r.ui ?? {}) } };
      };

      const commitDoc = (nd: SimDoc, nu: SimUi) => {
        if (!(c.kind === "command" && (c.id === "qat.undo" || c.id === "qat.redo"))) {
          setHistory((h) => [...h.slice(-30), d]);
          setFuture([]);
        }
        live.current = { ...live.current, doc: nd, ui: nu };
        setDoc(nd);
        setUi(nu);
        if (closesBackstage(c)) setBackstage(null);
      };

      if (fin) {
        // Free play after the last task.
        const r = runBuiltIn(d);
        commitDoc(r.doc, r.ui);
        return;
      }

      const t = tasks[live.current.taskIdx];
      if (!t) return;
      const remaining = t.steps.map((_, i) => i).filter((i) => !live.current.stepsDone.has(i));
      const candidates = t.anyOrder ? remaining : remaining.slice(0, 1);

      for (const i of candidates) {
        const s = t.steps[i];
        if (!commitMatches(s.action, c) && !(s.alt ?? []).some((a) => commitMatches(a, c))) continue;
        if (!selectionMatches(s.requires, u)) {
          miss(s.selectHint ?? "Right command, but check what is selected first.");
          return;
        }
        const r = s.replaceBuiltIn ? { doc: d, ui: u } : runBuiltIn(d);
        const nd = applyOps(r.doc, s.effects);
        commitDoc(nd, r.ui);
        setFeedback(null);
        completeStep(i, nd, r.ui);
        return;
      }

      // Viewing/navigation commands are free: apply without judging.
      if (c.kind === "command" && app.freeCommands?.includes(c.id)) {
        const r = runBuiltIn(d);
        commitDoc(r.doc, r.ui);
        return;
      }

      // Not what this task needs.
      const near = candidates.some((i) => {
        const st = tasks[live.current.taskIdx].steps[i];
        return [st.action, ...(st.alt ?? [])].some((a) => commitSameCommand(a, c));
      });
      if (c.kind === "type") {
        miss(near ? "Check your typing. Enter the text exactly as the task shows it." : "That's not where this task needs you to type.");
      } else if (near) {
        miss("Right command, but not the right option. Look again at what the task asks for.");
      } else {
        miss("That isn't what this task asks for. Try again.");
      }
    },
    [app, tasks, history, future, miss, completeStep],
  );

  const onCommand = useCallback((id: string, value?: SimValue) => handleCommit({ kind: "command", id, value }), [handleCommit]);

  const openDialog = useCallback((id: string) => {
    if (id.startsWith("backstage:")) {
      setBackstage(id.slice(10));
      return;
    }
    if (app.dialogs[id]) setDialog(id);
  }, [app]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!started || isTypingTarget(e.target)) return;
    const k = keyName(e);
    const sc = app.shortcuts[k];
    if (!sc) return;
    e.preventDefault();
    if ("command" in sc) onCommand(sc.command, sc.value);
    else if ("dialog" in sc) openDialog(sc.dialog);
    else setBackstage(sc.backstage);
  };

  const restart = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDoc(sim.initial);
    const u0 = app.initialUi(sim.initial);
    setUi(u0);
    setTaskIdx(0);
    setStepsDone(new Set());
    setScores(tasks.map(() => ({ misses: 0, hint: false, done: false })));
    setShowHint(false);
    setFeedback(null);
    setFinished(false);
    setHistory([]);
    setFuture([]);
    setDialog(null);
    setBackstage(null);
    setActiveTab(app.ribbon[0].id);
    taskStart.current = { doc: sim.initial, ui: u0 };
    setStarted(true);
    setTimeout(() => rootRef.current?.focus(), 0);
  };

  const resetTask = () => {
    setDoc(taskStart.current.doc);
    setUi(taskStart.current.ui);
    setStepsDone(new Set());
    setFeedback({ tone: "info", text: "Task reset. Try it again from the start." });
    setDialog(null);
    setBackstage(null);
  };

  const revealHint = () => {
    setShowHint(true);
    setScores((s) => {
      const next = s.slice();
      next[taskIdx] = { ...next[taskIdx], hint: true };
      return next;
    });
  };

  const contextual = app.contextualTabs?.(doc, ui) ?? [];
  const tabs = app.ribbon.filter((t) => !t.contextual || contextual.includes(t.contextual));
  useEffect(() => {
    if (!tabs.some((t) => t.id === activeTab)) setActiveTab(tabs[0].id);
  }, [tabs, activeTab]);

  const ribbonState = useMemo(() => app.ribbonState(doc, ui), [app, doc, ui]);
  const hits = useMemo(() => searchRibbon(tabs, search), [tabs, search]);
  const docAny = doc as { ribbonCollapsed?: boolean; saved?: { name?: string; location?: string; autosave?: boolean } };
  const fileName = docAny.saved?.name ?? sim.fileName;
  const full_ = app.fullScreen?.(doc) ?? false;
  const firstTry = scores.filter((s) => s.done && s.misses === 0 && !s.hint).length;

  const bare = app.chrome === "bare";
  const Canvas = app.Canvas;
  const StatusBar = app.StatusBar;

  return (
    <div className={full ? "fixed inset-0 z-[150] flex flex-col bg-gray-900/80 p-3" : "not-prose my-2"}>
      <div
        ref={rootRef}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className={`relative flex flex-col overflow-hidden rounded-t-lg border border-gray-400 bg-white shadow-xl outline-none ${full ? "flex-1" : "h-[600px]"}`}
        style={{ fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}
        aria-label={`${app.name} practice simulation: ${sim.title}`}
      >
        {/* Title bar */}
        {!bare && (
        <div className="flex h-8 shrink-0 items-center gap-2 px-2 text-[12px] text-white" style={{ background: app.accent }}>
          {app.autosave !== false && (
          <span className="flex items-center gap-1 rounded px-1 text-[11px]">
            AutoSave
            <button
              type="button"
              aria-label="AutoSave"
              aria-pressed={Boolean(docAny.saved?.autosave)}
              onClick={() => onCommand("qat.autosave")}
              className={`relative h-3.5 w-7 rounded-full border border-white/80 ${docAny.saved?.autosave ? "bg-white/90" : ""}`}
            >
              <span className={`absolute top-[1px] h-2.5 w-2.5 rounded-full ${docAny.saved?.autosave ? "left-[14px]" : "left-[1px] bg-white"}`} style={docAny.saved?.autosave ? { background: app.accent } : undefined} />
            </button>
          </span>
          )}
          <button type="button" title="Save (Ctrl+S)" aria-label="Save" onClick={() => (docAny.saved?.location ? onCommand("file.save") : setBackstage("saveAs"))} className="rounded p-0.5 hover:bg-white/15">
            <Icon name="save" size={16} />
          </button>
          <button type="button" title="Undo (Ctrl+Z)" aria-label="Undo" onClick={() => onCommand("qat.undo")} className="rounded p-0.5 hover:bg-white/15">
            <Icon name="undo" size={16} />
          </button>
          <button type="button" title="Redo (Ctrl+Y)" aria-label="Redo" onClick={() => onCommand("qat.redo")} className="rounded p-0.5 hover:bg-white/15">
            <Icon name="redo" size={16} />
          </button>
          <div className="min-w-0 flex-1 truncate text-center">
            {app.windowTitle ? app.windowTitle(doc, fileName) : `${fileName} - ${docAny.saved?.location ? `Saved to ${docAny.saved.location}` : "Saved to this PC"}`}
          </div>
          <div className="relative hidden sm:block">
            <input
              aria-label="Search for commands"
              placeholder="Search (Alt+Q)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Escape") setSearch("");
                if (e.key === "Enter" && hits[0]) {
                  const h = hits[0];
                  setSearch("");
                  h.dialog ? openDialog(h.dialog) : onCommand(h.id, h.value);
                }
              }}
              className="h-6 w-56 rounded bg-white/90 px-2 text-[12px] text-gray-900 placeholder:text-gray-500 focus:bg-white focus:outline-none"
            />
            {hits.length > 0 && (
              <div className="absolute right-0 top-7 z-50 w-72 border border-gray-300 bg-white py-1 text-gray-900 shadow-xl">
                <div className="px-2 pb-1 text-[11px] text-gray-500">Actions</div>
                {hits.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSearch("");
                      h.dialog ? openDialog(h.dialog) : onCommand(h.id, h.value);
                    }}
                    className="flex w-full flex-col px-2 py-1 text-left hover:bg-[#e5f1fb]"
                  >
                    <span className="text-[12px]">{h.label}</span>
                    <span className="text-[10px] text-gray-500">{h.path}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-[10px] font-semibold" title="BEOC Student">BS</span>
          <span className="hidden gap-3 px-2 text-[13px] sm:flex" aria-hidden="true">
            <span>—</span>
            <span>▢</span>
            <span>✕</span>
          </span>
        </div>
        )}

        {!full_ && !bare && (
          <Ribbon
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            state={ribbonState}
            handlers={{ onCommand, onDialog: openDialog }}
            accent={app.accent}
            collapsed={Boolean(docAny.ribbonCollapsed)}
            onToggleCollapse={() => onCommand("view.ribbonCollapse")}
            onFile={() => setBackstage("home")}
          />
        )}

        <div className="relative min-h-0 flex-1">
          <Canvas
            doc={doc}
            ui={ui}
            accent={app.accent}
            onSelect={handleSelect}
            onCommit={handleCommit}
            onContextMenu={(x, y, items) => setMenu({ x, y, items })}
            openDialog={openDialog}
          />
        </div>

        {!bare && <StatusBar doc={doc} ui={ui} accent={app.accent} onCommit={handleCommit} />}

        {dialog && app.dialogs[dialog] && (
          <SimDialog
            key={dialog}
            def={app.dialogDef?.(doc, ui, dialog) ?? app.dialogs[dialog]}
            initial={app.dialogDefaults?.(doc, ui, dialog)}
            onCancel={() => setDialog(null)}
            onOk={(values) => {
              setDialog(null);
              handleCommit({ kind: "dialog", id: dialog, values });
            }}
          />
        )}

        {backstage && app.BackstageView && (
          <app.BackstageView doc={doc} accent={app.accent} fileName={fileName} startPage={backstage} onCommit={handleCommit} onClose={() => setBackstage(null)} />
        )}
        {backstage && !app.BackstageView && (
          <Backstage
            app={app.name}
            accent={app.accent}
            spec={app.backstage}
            fileName={fileName}
            saved={docAny.saved}
            startPage={backstage}
            onCommit={handleCommit}
            onClose={() => setBackstage(null)}
          />
        )}

        {menu && (
          <Popover
            anchor={{ x: menu.x, y: menu.y }}
            onClose={() => setMenu(null)}
            items={menu.items.map((m, i) => ({
              key: String(i),
              label: m.label,
              icon: m.icon,
              separator: m.separator,
              disabled: m.disabled,
              shortcut: m.shortcut,
              onPick: () => (m.dialog ? openDialog(m.dialog) : m.command ? onCommand(m.command, m.value) : undefined),
            }))}
          />
        )}

        {/* Start card */}
        {!started && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-[1px]">
            <div className="max-w-lg rounded-xl bg-white p-6 shadow-2xl">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: app.accent }}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: app.accent }} />
                {app.name} practice simulation
              </div>
              <h3 className="mb-2 font-sans text-xl font-bold text-gray-900">{sim.title}</h3>
              <p className="mb-4 text-[14px] leading-relaxed text-gray-700">{sim.scenario}</p>
              <ul className="mb-5 space-y-1 text-[13px] text-gray-600">
                <li>• {tasks.length} task{tasks.length === 1 ? "" : "s"}{sim.minutes ? ` · about ${sim.minutes} min` : ""}</li>
                <li>• Work in the app the way you would in {app.name}: Ribbon, right-click, keyboard shortcuts.</li>
                <li>• Each task appears in the bar under the window. Use Hint if you get stuck.</li>
              </ul>
              <button
                type="button"
                onClick={restart}
                className="rounded-lg px-5 py-2.5 font-semibold text-white shadow hover:brightness-110"
                style={{ background: app.accent }}
              >
                Start simulation
              </button>
            </div>
          </div>
        )}

        {/* Finish card */}
        {finished && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/55 p-4">
            <div className="max-h-full w-full max-w-lg overflow-auto rounded-xl bg-white p-6 shadow-2xl">
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Simulation complete</div>
              <h3 className="mb-2 font-sans text-xl font-bold text-gray-900">
                {firstTry === tasks.length ? "Every task on the first try." : `${firstTry} of ${tasks.length} tasks on the first try`}
              </h3>
              <p className="mb-4 text-[13px] text-gray-600">
                A first try means no wrong commands and no hint. Run it again until every task is clean: that is the speed you will need in GMetrix and on the job.
              </p>
              <ol className="mb-5 space-y-1.5 text-[13px]">
                {tasks.map((t, i) => {
                  const s = scores[i];
                  const clean = s.misses === 0 && !s.hint;
                  return (
                    <li key={i} className="flex gap-2">
                      <span className={clean ? "text-emerald-600" : "text-amber-600"} aria-hidden="true">{clean ? "✓" : "●"}</span>
                      <span className="flex-1 text-gray-800">{t.instruction}</span>
                      <span className="whitespace-nowrap text-[11px] text-gray-500">
                        {clean ? "first try" : `${s.misses} miss${s.misses === 1 ? "" : "es"}${s.hint ? ", hint" : ""}`}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <div className="flex gap-2">
                <button type="button" onClick={restart} className="rounded-lg px-4 py-2 font-semibold text-white" style={{ background: app.accent }}>
                  Practice again
                </button>
                <button type="button" onClick={() => setFinished(false)} className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50">
                  Explore the finished file
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Task bar */}
      <div className="rounded-b-lg border border-t-0 border-gray-400 bg-slate-900 px-4 py-3 text-white">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded bg-white/10 px-2 py-0.5 text-[12px] font-semibold">
            {finished ? "Done" : `Task ${Math.min(taskIdx + 1, tasks.length)} of ${tasks.length}`}
          </span>
          <div className="flex gap-1" aria-hidden="true">
            {tasks.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-5 rounded-full ${scores[i].done ? (scores[i].misses === 0 && !scores[i].hint ? "bg-emerald-400" : "bg-amber-400") : i === taskIdx ? "bg-white" : "bg-white/25"}`}
              />
            ))}
          </div>
          <div className="flex-1" />
          <button type="button" onClick={revealHint} disabled={!started || finished} className="rounded border border-white/30 px-2.5 py-1 text-[12px] hover:bg-white/10 disabled:opacity-40">
            Hint
          </button>
          <button type="button" onClick={resetTask} disabled={!started || finished} className="rounded border border-white/30 px-2.5 py-1 text-[12px] hover:bg-white/10 disabled:opacity-40">
            Reset task
          </button>
          <button type="button" onClick={restart} disabled={!started} className="rounded border border-white/30 px-2.5 py-1 text-[12px] hover:bg-white/10 disabled:opacity-40">
            Restart
          </button>
          <button
            type="button"
            onClick={() => {
              setFull((f) => !f);
              setTimeout(() => rootRef.current?.focus(), 0);
            }}
            className="rounded border border-white/30 px-2.5 py-1 text-[12px] hover:bg-white/10"
          >
            {full ? "Exit full screen" : "Full screen"}
          </button>
        </div>
        <p className="mt-2 text-[15px] leading-snug" aria-live="polite">
          {!started ? "Press Start simulation to begin." : finished ? "All tasks complete." : task?.instruction}
        </p>
        {started && !finished && showHint && task && (
          <p className="mt-1.5 rounded bg-amber-300/15 px-2 py-1 text-[13px] text-amber-100">
            <span className="font-semibold">Hint:</span> {task.hint}
          </p>
        )}
        {feedback && started && (
          <p
            role="status"
            className={`mt-1.5 text-[13px] ${feedback.tone === "good" ? "text-emerald-300" : feedback.tone === "bad" ? "text-rose-300" : "text-sky-200"}`}
          >
            {feedback.text}
          </p>
        )}
      </div>
    </div>
  );
}

/** Used by the lesson page to label the block. */
export function simSummary(sim: SimDefinition) {
  return `${sim.tasks.length} tasks · ${normText(sim.app)}`;
}
