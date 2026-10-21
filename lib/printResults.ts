/**
 * Printable proof of completion for self-paced practice (sims, Challenge
 * Labs, the Typing Lab). Opens a clean page in a new tab and starts the
 * browser's print dialog, where students can print or "Save as PDF" and
 * upload the file wherever their instructor asks.
 */

export interface ResultRow {
  label: string;
  value: string;
  /** true = green check, false = amber dot, undefined = no mark */
  ok?: boolean;
}

export interface ResultsCard {
  /** e.g. "Challenge Lab" or "Typing Lab" */
  kind: string;
  title: string;
  studentName: string;
  /** Short headline, e.g. "5 of 6 tasks on the first try" or "42 WPM, 97% accuracy" */
  summary: string;
  rows: ResultRow[];
  note?: string;
}

const NAME_KEY = "beoc-student-name";

export function loadStudentName(): string {
  try {
    return window.localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveStudentName(name: string): void {
  try {
    window.localStorage.setItem(NAME_KEY, name);
  } catch {
    /* private window or blocked storage: the name just is not remembered */
  }
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export function resultsHtml(card: ResultsCard, when = new Date()): string {
  const stamp = when.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const rows = card.rows
    .map(
      (r) =>
        `<tr><td class="mark ${r.ok === true ? "ok" : r.ok === false ? "warn" : ""}">${r.ok === true ? "✓" : r.ok === false ? "●" : ""}</td><td>${esc(r.label)}</td><td class="val">${esc(r.value)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(card.kind)} results: ${esc(card.title)}</title>
<style>
body{font-family:"Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif;color:#111827;margin:0;padding:40px;background:#fff}
.card{max-width:720px;margin:0 auto;border:2px solid #1e3a8a;border-radius:14px;padding:32px}
.brand{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#1e3a8a;font-weight:700}
h1{font-size:24px;margin:6px 0 4px}
.kind{font-size:14px;color:#4b5563;margin-bottom:20px}
.meta{display:grid;grid-template-columns:120px 1fr;gap:6px 12px;font-size:14px;margin-bottom:20px}
.meta b{color:#374151}
.summary{background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;border-radius:10px;padding:12px 16px;font-size:18px;font-weight:700;margin-bottom:18px}
table{width:100%;border-collapse:collapse;font-size:13px}
td{border-top:1px solid #e5e7eb;padding:7px 6px;vertical-align:top}
td.mark{width:18px;text-align:center}
td.ok{color:#059669} td.warn{color:#d97706}
td.val{white-space:nowrap;color:#4b5563;text-align:right}
.note{font-size:12px;color:#6b7280;margin-top:18px}
.btn{margin:24px auto 0;display:block;background:#1e3a8a;color:#fff;border:0;border-radius:8px;padding:10px 18px;font-size:14px;font-weight:600;cursor:pointer}
@media print{body{padding:0}.btn{display:none}}
</style></head><body><div class="card">
<div class="brand">BEOC Digital</div>
<h1>${esc(card.title)}</h1>
<div class="kind">${esc(card.kind)} results</div>
<div class="meta"><b>Student</b><span>${esc(card.studentName || "(no name entered)")}</span><b>Completed</b><span>${esc(stamp)}</span></div>
<div class="summary">${esc(card.summary)}</div>
<table>${rows}</table>
${card.note ? `<p class="note">${esc(card.note)}</p>` : ""}
</div>
<button class="btn" onclick="window.print()">Print or save as PDF</button>
<script>setTimeout(function(){window.print()},350)</script>
</body></html>`;
}

/** Must be called from a click handler so the browser allows the new tab. */
export function printResults(card: ResultsCard): void {
  const html = resultsHtml(card);
  const w = window.open("", "_blank");
  if (w) {
    w.document.open();
    w.document.write(html);
    w.document.close();
    return;
  }
  // Pop-ups blocked: download the page instead; it opens in any browser and prints from there.
  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${card.kind} - ${card.title}.html`.replace(/[\\/:*?"<>|]/g, "");
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
