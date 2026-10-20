"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { WebBlock, WebPage, WebResult, WinDoc, WinItem, WinTab, WinWindow } from "./types";
import { AppIcon, FileArt, G, kindForName } from "./icons";
import { Avatar, Btn, Modal, Select, T, TextIn, Toggle, useWin, type MItem, type WinCtxValue } from "./ui";
import { Caption, useFrame } from "./frame";
import { NOW } from "./data";
import { S, clouds, looksLikeUrl, net, normUrl, pageTitle, resolveUrl, userName, type CloudCfg } from "./model";
import { baseOf, extOf, getItem, isFolder, parentOf, realPath, rootOf, sizeOf, splitPath } from "./fs";
import { DND, dragOver } from "./Explorer";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const domainOf = (url: string) => normUrl(url).split(/[/?#]/)[0];

function displayUrl(url: string): string {
  const u = normUrl(url);
  if (u.startsWith("edge://") || u.startsWith("file:")) return u;
  if (u === "edge://newtab") return "";
  return `https://${/^\d/.test(u) ? "" : "www."}${u}`.replace("https://www.bing.com", "https://www.bing.com").replace(/^https:\/\/www\.(\d)/, "https://$1");
}

function online(doc: WinDoc): boolean {
  const n = net(doc);
  return n.connected !== false && S(doc, "airplane") !== "on" && !(n.type === "wifi" && S(doc, "wifi") === "off");
}

const normQ = (q: string) => q.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").trim().replace(/\s+/g, " ").toLowerCase();

function searchResults(doc: WinDoc, q: string): WebResult[] {
  const map = doc.search ?? {};
  const k = normQ(q);
  for (const key of Object.keys(map)) if (normQ(key) === k) return map[key];
  const words = new Set(k.split(" ").filter((w) => w.length > 2));
  let best: WebResult[] = [];
  let score = 0;
  for (const key of Object.keys(map)) {
    const kw = normQ(key).split(" ").filter((w) => w.length > 2);
    const hit = kw.filter((w) => words.has(w)).length / Math.max(kw.length, 1);
    if (hit > score) {
      score = hit;
      best = map[key];
    }
  }
  return score >= 0.6 ? best : [];
}

function useTabs(w: WinWindow) {
  const tabs = w.tabs ?? [];
  const tab = tabs.find((t) => t.id === w.tab) ?? tabs[0];
  return { tabs, tab };
}

/* ------------------------------------------------------------------ */
/* Web page blocks                                                     */
/* ------------------------------------------------------------------ */

function WebForm({ b }: { b: Extract<WebBlock, { t: "form" }> }) {
  const ctx = useWin();
  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(b.fields.map((f) => [f.name, f.value ?? (f.type === "select" ? f.options?.[0] ?? "" : f.type === "checkbox" ? "off" : "")])));
  const sent = ctx.doc.webState?.[b.id];
  const submit = () => {
    const value = b.fields.map((f) => `${f.label}: ${vals[f.name] ?? ""}`).join(" | ");
    ctx.commit({ kind: "type", target: `form:${b.id}`, value });
  };
  return (
    <div className="my-3 max-w-md rounded-lg p-4" style={{ background: "#f7f9fc", border: "1px solid #dde3ea" }}>
      {b.title && <div className="mb-3 text-[15px] font-semibold">{b.title}</div>}
      {b.fields.map((f) => (
        <label key={f.name} className="mb-2.5 block text-[12.5px]">
          {f.type === "checkbox" ? (
            <span className="flex items-center gap-2">
              <input type="checkbox" aria-label={f.label} checked={vals[f.name] === "on"} onChange={(e) => setVals((v) => ({ ...v, [f.name]: e.target.checked ? "on" : "off" }))} />
              {f.label}
            </span>
          ) : (
            <>
              <span className="mb-1 block font-medium text-[#333]">{f.label}</span>
              {f.type === "select" ? (
                <select aria-label={f.label} value={vals[f.name]} onChange={(e) => setVals((v) => ({ ...v, [f.name]: e.target.value }))} onKeyDown={(e) => e.stopPropagation()} className="h-8 w-full rounded border border-[#c8ced6] bg-white px-2 text-[12.5px] text-black">
                  {(f.options ?? []).map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  aria-label={f.label}
                  type={f.type === "password" ? "password" : f.type === "email" ? "email" : f.type === "number" ? "number" : "text"}
                  placeholder={f.placeholder}
                  value={vals[f.name]}
                  onChange={(e) => setVals((v) => ({ ...v, [f.name]: e.target.value }))}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") submit();
                  }}
                  className="h-8 w-full rounded border border-[#c8ced6] bg-white px-2 text-[12.5px] text-black outline-none focus:border-[#0f6cbd]"
                />
              )}
            </>
          )}
        </label>
      ))}
      <button type="button" aria-label={b.submit} onClick={submit} className="mt-1 rounded bg-[#0f6cbd] px-4 py-1.5 text-[12.5px] font-semibold text-white hover:bg-[#0c5aa0]">
        {b.submit}
      </button>
      {sent && <span className="ml-3 text-[12px] text-[#107c10]">✓ Submitted</span>}
    </div>
  );
}

function Blocks({ blocks, onHover }: { blocks: WebBlock[]; onHover: (u: string | null) => void }) {
  const ctx = useWin();
  const st = ctx.doc.webState ?? {};
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h1":
            return <h1 key={i} className="mb-3 mt-2 text-[24px] font-semibold leading-tight text-[#1b1b1b]">{b.text}</h1>;
          case "h2":
            return <h2 key={i} className="mb-2 mt-4 text-[18px] font-semibold text-[#1b1b1b]">{b.text}</h2>;
          case "h3":
            return <h3 key={i} className="mb-1.5 mt-3 text-[14px] font-semibold text-[#1b1b1b]">{b.text}</h3>;
          case "p":
            return <p key={i} className="mb-2.5 text-[13px] leading-relaxed text-[#333]">{b.text}</p>;
          case "small":
            return <p key={i} className="mb-2 text-[11px] text-[#666]">{b.text}</p>;
          case "link":
            return (
              <div key={i} className={b.button ? "my-2" : "mb-1.5"}>
                <button
                  type="button"
                  aria-label={b.text}
                  onMouseEnter={() => onHover(b.download ? `${displayUrl(b.href)}` : displayUrl(b.href))}
                  onMouseLeave={() => onHover(null)}
                  onClick={() => (b.download ? ctx.cmd("edge.download", b.download.name) : ctx.cmd("edge.nav", b.href))}
                  className={b.button ? "rounded bg-[#0f6cbd] px-4 py-1.5 text-[12.5px] font-semibold text-white hover:bg-[#0c5aa0]" : "text-left text-[13px] text-[#0b57d0] underline-offset-2 hover:underline"}
                >
                  {b.download && !b.button ? "⬇ " : ""}
                  {b.text}
                </button>
                {b.note && <span className="ml-2 text-[11.5px] text-[#666]">{b.note}</span>}
              </div>
            );
          case "button":
            return (
              <button
                key={i}
                type="button"
                aria-label={b.text}
                onMouseEnter={() => b.goto && onHover(displayUrl(b.goto))}
                onMouseLeave={() => onHover(null)}
                onClick={() => ctx.commit({ kind: "click", target: `web:${b.id}` })}
                className={`my-1.5 mr-2 rounded px-4 py-1.5 text-[12.5px] font-semibold ${b.style === "danger" ? "bg-[#c42b1c] text-white hover:bg-[#a52314]" : b.style === "default" ? "border border-[#c8ced6] bg-white text-[#1b1b1b] hover:bg-[#f3f3f3]" : "bg-[#0f6cbd] text-white hover:bg-[#0c5aa0]"}`}
              >
                {b.text}
                {st[b.id] === "clicked" && " ✓"}
              </button>
            );
          case "form":
            return <WebForm key={b.id} b={b} />;
          case "toggle": {
            const on = (st[b.id] ?? (b.on ? "on" : "off")) === "on";
            return (
              <div key={i} className="my-1.5 flex max-w-lg items-center justify-between gap-4 rounded border border-[#e3e7ec] bg-white px-3 py-2">
                <div>
                  <div className="text-[13px] text-[#1b1b1b]">{b.label}</div>
                  {b.note && <div className="text-[11px] text-[#666]">{b.note}</div>}
                </div>
                <button type="button" role="switch" aria-checked={on} aria-label={b.label} onClick={() => ctx.cmd("web.set", `${b.id}=${on ? "off" : "on"}`)} className="relative h-5 w-10 rounded-full" style={{ background: on ? "#0f6cbd" : "#c8ced6" }}>
                  <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all" style={{ left: on ? 22 : 2 }} />
                </button>
              </div>
            );
          }
          case "select": {
            const v = st[b.id] ?? b.value ?? b.options[0];
            return (
              <label key={i} className="my-1.5 flex max-w-lg items-center justify-between gap-4 rounded border border-[#e3e7ec] bg-white px-3 py-2 text-[13px] text-[#1b1b1b]">
                {b.label}
                <select aria-label={b.label} value={v} onKeyDown={(e) => e.stopPropagation()} onChange={(e) => ctx.cmd("web.set", `${b.id}=${e.target.value}`)} className="h-7 rounded border border-[#c8ced6] bg-white px-2 text-[12.5px]">
                  {b.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            );
          }
          case "results":
            return (
              <div key={i}>
                {b.items.map((r, j) => (
                  <ResultItem key={j} r={r} onHover={onHover} />
                ))}
              </div>
            );
          case "table":
            return (
              <table key={i} className="my-3 w-full max-w-2xl border-collapse text-[12.5px] text-[#1b1b1b]">
                <thead>
                  <tr>{b.head.map((h) => <th key={h} className="border-b-2 border-[#d0d7de] px-2 py-1.5 text-left font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {b.rows.map((r, j) => (
                    <tr key={j} className="odd:bg-[#f7f9fc]">{r.map((c, k) => <td key={k} className="border-b border-[#e3e7ec] px-2 py-1.5">{c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            );
          case "alert":
            return (
              <div key={i} role="alert" className="my-2 max-w-2xl rounded border-l-4 px-3 py-2 text-[12.5px]" style={{ background: b.tone === "bad" ? "#fde7e9" : b.tone === "warn" ? "#fff4ce" : b.tone === "ok" ? "#dff6dd" : "#eaf3fc", borderColor: b.tone === "bad" ? "#c42b1c" : b.tone === "warn" ? "#c19c00" : b.tone === "ok" ? "#107c10" : "#0f6cbd", color: "#1b1b1b" }}>
                {b.text}
              </div>
            );
          case "list":
            return b.ordered ? (
              <ol key={i} className="mb-3 ml-5 list-decimal text-[13px] text-[#333]">{b.items.map((x, j) => <li key={j} className="mb-1">{x}</li>)}</ol>
            ) : (
              <ul key={i} className="mb-3 ml-5 list-disc text-[13px] text-[#333]">{b.items.map((x, j) => <li key={j} className="mb-1">{x}</li>)}</ul>
            );
          case "product":
            return (
              <div key={i} className="my-2 flex max-w-2xl items-start gap-4 rounded-lg border border-[#e3e7ec] bg-white p-3">
                <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded bg-[#eef2f6] text-[28px]">🖥️</div>
                <div className="min-w-0 flex-1">
                  {b.badge && <span className="mb-1 inline-block rounded bg-[#fff4ce] px-1.5 text-[10.5px] font-semibold text-[#5c4400]">{b.badge}</span>}
                  {b.href ? (
                    <button type="button" aria-label={b.name} onClick={() => ctx.cmd("edge.nav", b.href!)} className="block text-left text-[14px] font-semibold text-[#0b57d0] hover:underline">{b.name}</button>
                  ) : (
                    <div className="text-[14px] font-semibold text-[#1b1b1b]">{b.name}</div>
                  )}
                  <ul className="mt-1 text-[12px] text-[#444]">{b.specs.map((s, j) => <li key={j}>• {s}</li>)}</ul>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="text-[16px] font-bold text-[#1b1b1b]">{b.price}</span>
                  <button type="button" aria-label={`${b.button ?? "Add to cart"}: ${b.name}`} onClick={() => ctx.commit({ kind: "click", target: `web:${b.id}` })} className="rounded bg-[#ffd814] px-3 py-1.5 text-[12px] font-semibold text-black hover:bg-[#f7ca00]">
                    {st[b.id] === "clicked" ? "Added ✓" : b.button ?? "Add to cart"}
                  </button>
                </div>
              </div>
            );
          case "image":
            return (
              <div key={i} className="my-2 flex h-32 max-w-md items-center justify-center rounded bg-gradient-to-br from-[#dfe9f5] to-[#c4d6ec] text-[13px] text-[#334]">
                <span className="mr-2 text-[28px]">{b.glyph ?? "🖼️"}</span>
                {b.label}
              </div>
            );
          case "hr":
            return <hr key={i} className="my-4 border-[#e3e7ec]" />;
          case "cols":
            return (
              <div key={i} className="grid gap-6" style={{ gridTemplateColumns: `repeat(${b.cols.length}, minmax(0, 1fr))` }}>
                {b.cols.map((c, j) => (
                  <div key={j}><Blocks blocks={c} onHover={onHover} /></div>
                ))}
              </div>
            );
        }
        return null;
      })}
    </>
  );
}

function ResultItem({ r, onHover }: { r: WebResult; onHover: (u: string | null) => void }) {
  const ctx = useWin();
  return (
    <div className="mb-5 max-w-[600px]">
      <div className="mb-0.5 flex items-center gap-2 text-[12px] text-[#444]">
        {r.ad && <span className="rounded border border-[#666] px-1 text-[10px] font-semibold">Ad</span>}
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef2f6] text-[10px] font-bold">{domainOf(r.url).charAt(0).toUpperCase()}</span>
        <span>{r.display ?? displayUrl(r.url)}</span>
      </div>
      <button type="button" aria-label={r.title} onMouseEnter={() => onHover(displayUrl(r.url))} onMouseLeave={() => onHover(null)} onClick={() => ctx.cmd("edge.nav", r.url)} className="text-left text-[17px] text-[#1a0dab] hover:underline">
        {r.title}
      </button>
      {r.snippet && <p className="text-[12.5px] leading-snug text-[#4d5156]">{r.snippet}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Built-in pages                                                      */
/* ------------------------------------------------------------------ */

function SearchBox({ initial, big, onGo }: { initial?: string; big?: boolean; onGo: (q: string) => void }) {
  const [q, setQ] = useState(initial ?? "");
  useEffect(() => setQ(initial ?? ""), [initial]);
  return (
    <div className={`flex items-center gap-2 rounded-full bg-white px-4 shadow ${big ? "h-12 w-[520px] max-w-full" : "h-10 w-[560px] max-w-full"}`} style={{ border: "1px solid #dfe1e5" }}>
      <G n="search" s={16} style={{ color: "#555" }} />
      <input
        aria-label="Search the web"
        placeholder="Search the web"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && q.trim()) onGo(q.trim());
        }}
        className="min-w-0 flex-1 bg-transparent text-[14px] text-black outline-none"
      />
    </div>
  );
}

function NewTabPage({ privateMode }: { privateMode: boolean }) {
  const ctx = useWin();
  const tiles = (ctx.doc.favorites ?? []).slice(0, 7);
  if (privateMode)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#1f1f1f] p-6 text-center text-white">
        <AppIcon id="edgeprivate" s={48} />
        <h1 className="text-[24px] font-semibold">Browse InPrivate</h1>
        <p className="max-w-md text-[12.5px] text-[#ccc]">InPrivate browsing deletes your browsing data when you close all InPrivate windows. It doesn&apos;t hide your browsing from your school, employer, or internet service provider, and it doesn&apos;t protect you from websites that aren&apos;t safe.</p>
        <SearchBox big onGo={(q) => (looksLikeUrl(q) ? ctx.cmd("edge.nav", q) : ctx.cmd("edge.search", q))} />
      </div>
    );
  return (
    <div className="flex h-full flex-col items-center overflow-auto bg-gradient-to-b from-[#2b5f9e] via-[#4b86c8] to-[#9ac3e9] p-6">
      <div className="mt-10 mb-6 text-[22px] font-semibold text-white drop-shadow">Microsoft Bing</div>
      <SearchBox big onGo={(q) => (looksLikeUrl(q) ? ctx.cmd("edge.nav", q) : ctx.cmd("edge.search", q))} />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {tiles.map((f) => (
          <button key={f.url} type="button" aria-label={f.name} onClick={() => ctx.cmd("edge.nav", f.url)} className="flex w-20 flex-col items-center gap-1.5 rounded-lg bg-white/20 p-2 text-[11px] text-white backdrop-blur hover:bg-white/30">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[14px] font-bold text-[#0f6cbd]">{f.name.charAt(0)}</span>
            <span className="w-full truncate">{f.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchPage({ q, onHover }: { q: string; onHover: (u: string | null) => void }) {
  const ctx = useWin();
  const results = searchResults(ctx.doc, q);
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="flex items-center gap-4 border-b border-[#eee] px-6 py-3">
        <span className="text-[18px] font-semibold text-[#0f6cbd]">Microsoft Bing</span>
        <SearchBox initial={q} onGo={(x) => ctx.cmd("edge.search", x)} />
      </div>
      <div className="flex gap-5 border-b border-[#eee] px-6 pl-[150px] text-[12.5px] text-[#444]">
        {["All", "Search", "Images", "Videos", "Maps", "News"].map((t, i) => (
          <span key={t} className={`py-2 ${i === 0 ? "border-b-2 border-[#0f6cbd] font-semibold text-[#0f6cbd]" : ""}`}>{t}</span>
        ))}
      </div>
      <div className="px-6 py-4 pl-[150px]">
        <p className="mb-4 text-[12px] text-[#70757a]">About {results.length ? `${(results.length * 1370000).toLocaleString()} results` : "0 results"}</p>
        {results.length ? (
          results.map((r, i) => <ResultItem key={i} r={r} onHover={onHover} />)
        ) : (
          <div className="text-[13px] text-[#333]">
            <p className="mb-2">There are no results for <b>{q}</b></p>
            <ul className="ml-5 list-disc text-[12.5px] text-[#555]"><li>Check your spelling or try different keywords</li><li>Try the exact search phrase from your task</li></ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorPage({ url, offline }: { url: string; offline?: boolean }) {
  const ctx = useWin();
  return (
    <div className="flex h-full items-start justify-center overflow-auto bg-white p-10 text-[#1b1b1b]">
      <div className="max-w-lg">
        <div className="mb-4 text-[44px]">{offline ? "🔌" : "😕"}</div>
        <h1 className="mb-2 text-[24px] font-semibold">{offline ? "You're not connected" : "Hmm… can't reach this page"}</h1>
        <p className="mb-4 text-[13px] text-[#444]">{offline ? "It looks like you're not connected to the internet. Check your Wi-Fi or Ethernet connection." : <>It looks like the webpage at <b>{displayUrl(url)}</b> might be having issues, or it may have moved permanently to a new web address.</>}</p>
        <p className="mb-1 text-[13px] font-semibold">Try:</p>
        <ul className="mb-4 ml-5 list-disc text-[12.5px] text-[#444]">
          <li>Checking the connection</li>
          <li>Checking the proxy, firewall, and DNS settings</li>
          {!offline && <li>Searching the web for {domainOf(url)}</li>}
        </ul>
        <p className="mb-4 text-[11px] text-[#777]">{offline ? "ERR_INTERNET_DISCONNECTED" : "DNS_PROBE_FINISHED_NXDOMAIN"}</p>
        <div className="flex gap-2">
          <button type="button" aria-label="Refresh" onClick={() => ctx.cmd("edge.refresh")} className="rounded bg-[#0f6cbd] px-4 py-1.5 text-[12.5px] font-semibold text-white">Refresh</button>
          {offline && <button type="button" aria-label="Network & internet settings" onClick={() => ctx.cmd("settings.nav", "network")} className="rounded border border-[#c8ced6] px-4 py-1.5 text-[12.5px]">Network &amp; internet settings</button>}
        </div>
      </div>
    </div>
  );
}

function SmartScreen({ url }: { url: string }) {
  const ctx = useWin();
  const [more, setMore] = useState(false);
  return (
    <div className="h-full overflow-auto bg-[#c42b1c] p-10 text-white">
      <div className="max-w-xl">
        <div className="mb-4"><G n="shield" s={54} /></div>
        <h1 className="mb-1 text-[26px] font-semibold">This site has been reported as unsafe</h1>
        <p className="mb-4 text-[13px] opacity-90">Hosted by {domainOf(url)}</p>
        <p className="mb-4 text-[13px] leading-relaxed">Microsoft recommends you don&apos;t continue to this site. It has been reported to Microsoft for containing phishing threats which may try to steal personal or financial information.</p>
        <div className="mb-4 flex gap-2">
          <button type="button" aria-label="Go back" onClick={() => ctx.cmd("edge.smartBack")} className="rounded bg-white px-5 py-1.5 text-[13px] font-semibold text-[#c42b1c]">Go back</button>
          <button type="button" aria-label="More information" onClick={() => setMore((m) => !m)} className="rounded border border-white px-5 py-1.5 text-[13px]">More information</button>
        </div>
        {more && (
          <div className="text-[12.5px]">
            <p className="mb-2">This website has been reported to Microsoft for containing phishing threats. Phishing pages try to get you to type passwords or payment information.</p>
            <button type="button" aria-label="Report that this site doesn't contain phishing threats" className="mb-1 block underline">Report that this site doesn&apos;t contain phishing threats</button>
            <button type="button" aria-label="Continue to the unsafe site (not recommended)" onClick={() => ctx.cmd("edge.smartContinue")} className="block underline">Continue to the unsafe site (not recommended)</button>
          </div>
        )}
      </div>
    </div>
  );
}

function PageView({ page, onHover }: { page: WebPage; onHover: (u: string | null) => void }) {
  const ctx = useWin();
  return (
    <div className="h-full overflow-auto bg-white text-[#1b1b1b]">
      {page.site && (
        <div className="flex items-center gap-4 px-6 py-3 text-white" style={{ background: page.color ?? "#1f3a5f" }}>
          <span className="text-[16px] font-semibold">{page.site}</span>
          <span className="flex-1" />
          {(page.nav ?? []).map((n) => (
            <button key={n.href + n.text} type="button" aria-label={n.text} onMouseEnter={() => onHover(displayUrl(n.href))} onMouseLeave={() => onHover(null)} onClick={() => ctx.cmd("edge.nav", n.href)} className="text-[12.5px] hover:underline">
              {n.text}
            </button>
          ))}
        </div>
      )}
      <div className="mx-auto max-w-3xl px-6 py-5">
        <Blocks blocks={page.blocks} onHover={onHover} />
      </div>
    </div>
  );
}

function FileViewer({ path }: { path: string }) {
  const ctx = useWin();
  const it = getItem(ctx.doc, path);
  return (
    <div className="flex h-full flex-col bg-[#3b3b3b]">
      <div className="flex h-9 items-center gap-3 bg-[#2b2b2b] px-4 text-[12px] text-white">
        <span>1 of 1</span>
        <span className="opacity-60">|</span>
        <G n="zoomOut" s={14} />
        <G n="zoomIn" s={14} />
        <span className="flex-1" />
        <G n="print" s={14} />
        <G n="save" s={14} />
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto min-h-[420px] max-w-xl bg-white p-8 text-[12.5px] text-black shadow-xl">
          <div className="mb-3 text-[16px] font-semibold">{baseOf(path).replace(/\.pdf$/i, "")}</div>
          {(it?.text ?? "").split("\n").map((l, i) => <p key={i} className="mb-1.5">{l}</p>)}
          {!it?.text && [0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="mb-2 h-2 rounded bg-[#e6e6e6]" style={{ width: `${90 - i * 7}%` }} />)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Edge internal pages (settings)                                      */
/* ------------------------------------------------------------------ */

const CLEAR_ITEMS = ["Browsing history", "Download history", "Cookies and other site data", "Cached images and files", "Passwords", "Autofill form data"];

function ClearDataDialog() {
  const ctx = useWin();
  const [range, setRange] = useState("Last hour");
  const [on, setOn] = useState<Record<string, boolean>>({ "Browsing history": true, "Download history": true, "Cookies and other site data": true, "Cached images and files": true });
  return (
    <Modal
      title="Clear browsing data"
      width={420}
      onClose={() => ctx.modal(null)}
      footer={
        <>
          <Btn primary label="Clear now" onClick={() => { ctx.modal(null); ctx.cmd("edge.clearData", CLEAR_ITEMS.filter((x) => on[x]).join(", ")); }}>Clear now</Btn>
          <Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn>
        </>
      }
    >
      <div className="mb-3 flex items-center gap-2"><span>Time range</span><Select label="Time range" value={range} options={["Last hour", "Last 24 hours", "Last 7 days", "Last 4 weeks", "All time"]} onChange={setRange} width={170} /></div>
      {CLEAR_ITEMS.map((x) => (
        <label key={x} className="mb-1.5 flex items-center gap-2"><input type="checkbox" aria-label={x} checked={Boolean(on[x])} onChange={(e) => setOn((o) => ({ ...o, [x]: e.target.checked }))} /> {x}</label>
      ))}
    </Modal>
  );
}

function EdgeSettings({ sub }: { sub: string }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const page = sub.replace(/^settings\/?/, "") || "profiles";
  const nav: [string, string][] = [["profiles", "Profiles"], ["privacy", "Privacy, search, and services"], ["appearance", "Appearance"], ["cookies", "Cookies and site permissions"], ["default", "Default browser"], ["downloads", "Downloads"], ["passwords", "Passwords"]];
  const tog = (k: string, label: string, desc?: string) => (
    <div className="flex items-center justify-between gap-4 border-b py-3" style={{ borderColor: T.line }}>
      <div><div className="text-[13px]">{label}</div>{desc && <div className="text-[11.5px]" style={{ color: T.sub }}>{desc}</div>}</div>
      <Toggle label={label} on={S(doc, k) === "on"} onChange={(v) => ctx.cmd("settings.set", `${k}=${v ? "on" : "off"}`)} showText={false} />
    </div>
  );
  return (
    <div className="flex h-full overflow-hidden" style={{ background: T.bg, color: T.text }}>
      <div className="w-56 shrink-0 overflow-auto p-3">
        <div className="mb-3 text-[18px] font-semibold">Settings</div>
        {nav.map(([id, label]) => (
          <button key={id} type="button" aria-label={label} onClick={() => ctx.cmd("edge.nav", `edge://settings/${id}`)} className="mb-0.5 flex h-8 w-full items-center rounded px-3 text-left text-[12.5px] hover:bg-[var(--w-hover)]" style={{ background: page === id ? T.press : undefined }}>
            {label}
          </button>
        ))}
      </div>
      <div className="min-w-0 flex-1 overflow-auto p-5">
        <div className="max-w-2xl rounded-lg p-5" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
          {page === "privacy" && (
            <>
              <div className="mb-2 text-[16px] font-semibold">Tracking prevention</div>
              <div className="mb-5 flex gap-2">
                {["Basic", "Balanced", "Strict"].map((m) => (
                  <button key={m} type="button" aria-label={`${m} tracking prevention`} onClick={() => m !== S(doc, "edge.trackers") && ctx.cmd("settings.set", `edge.trackers=${m}`)} className="flex-1 rounded-lg p-3 text-left text-[12px]" style={{ border: `2px solid ${S(doc, "edge.trackers") === m ? T.accent : T.line}` }}>
                    <div className="font-semibold">{m}</div>
                    <div style={{ color: T.sub }}>{m === "Basic" ? "Allows most trackers" : m === "Balanced" ? "Blocks trackers from sites you haven't visited" : "Blocks a majority of trackers from all sites"}</div>
                  </button>
                ))}
              </div>
              <div className="mb-2 text-[16px] font-semibold">Clear browsing data</div>
              <div className="flex items-center justify-between border-b py-3" style={{ borderColor: T.line }}>
                <span className="text-[13px]">Clear browsing data now</span>
                <Btn label="Choose what to clear" onClick={() => ctx.modal(<ClearDataDialog />)}>Choose what to clear</Btn>
              </div>
              <div className="mb-2 mt-5 text-[16px] font-semibold">Security</div>
              {tog("sec.smartscreen", "Microsoft Defender SmartScreen", "Help protect me from malicious sites and downloads")}
              {tog("edge.pua", "Block potentially unwanted apps", "Blocks downloads of low-reputation apps that might cause unexpected behaviors")}
            </>
          )}
          {page === "passwords" && (
            <>
              <div className="mb-2 text-[16px] font-semibold">Passwords</div>
              {tog("edge.savePasswords", "Offer to save passwords", "Microsoft Edge will save and fill your passwords for you")}
              {tog("edge.autoSignin", "Sign in automatically")}
              {tog("edge.leakAlerts", "Show alerts when passwords are found in an online leak")}
              <div className="mt-4 text-[13px] font-semibold">Saved passwords</div>
              <p className="text-[12px]" style={{ color: T.sub }}>{doc.flags?.savedPasswords ? `${doc.flags.savedPasswords} saved passwords` : "You don't have any saved passwords."}</p>
            </>
          )}
          {page === "cookies" && (
            <>
              <div className="mb-2 text-[16px] font-semibold">Site permissions</div>
              {tog("edge.popups", "Block pop-ups and redirects (Recommended)")}
              {tog("edge.thirdPartyCookies", "Block third-party cookies")}
            </>
          )}
          {page === "default" && (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[16px] font-semibold">Default browser</div>
                <div className="text-[12px]" style={{ color: T.sub }}>{S(doc, "default.browser") === "Microsoft Edge" ? "Microsoft Edge is your default browser" : "Make Microsoft Edge your default browser"}</div>
              </div>
              {S(doc, "default.browser") !== "Microsoft Edge" && <Btn label="Make default" onClick={() => ctx.cmd("settings.set", "default.browser=Microsoft Edge")}>Make default</Btn>}
            </div>
          )}
          {page === "downloads" && (
            <>
              <div className="mb-2 text-[16px] font-semibold">Downloads</div>
              <div className="flex items-center justify-between border-b py-3 text-[13px]" style={{ borderColor: T.line }}><span>Location<br /><span className="text-[11.5px]" style={{ color: T.sub }}>C:\Users\{userName(doc).split(" ")[0].toLowerCase()}\Downloads</span></span><Btn label="Change">Change</Btn></div>
              {tog("edge.askDownload", "Ask me what to do with each download")}
            </>
          )}
          {page === "appearance" && <p className="text-[13px]">Customize the look of Microsoft Edge.</p>}
          {page === "profiles" && (
            <div className="flex items-center gap-4">
              <Avatar name={userName(doc)} s={56} />
              <div><div className="text-[15px] font-semibold">{userName(doc)}</div><div className="text-[12px]" style={{ color: T.sub }}>{doc.user?.email ?? "Not signed in"}</div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Share dialogs (OneDrive / Google Drive)                             */
/* ------------------------------------------------------------------ */

const PERM_MS: Record<string, string> = { edit: "Can edit", view: "Can view", comment: "Can comment" };
const PERM_G: Record<string, string> = { edit: "Editor", view: "Viewer", comment: "Commenter" };

export function ShareDialog({ path, provider }: { path: string; provider: "ms" | "google" }) {
  const ctx = useWin();
  const it = getItem(ctx.doc, path);
  const [email, setEmail] = useState("");
  const [perm, setPerm] = useState(provider === "google" ? "view" : "edit");
  const [msg, setMsg] = useState("");
  const [linkScope, setLinkScope] = useState(it?.link?.split(":")[0] ?? "anyone");
  const [linkPerm, setLinkPerm] = useState(it?.link?.split(":")[1] ?? "view");
  const [exp, setExp] = useState<string | null>(null);
  if (!it) return null;
  const sel = () => ctx.select(`file:${realPath(ctx.doc, path)}`);
  const send = () => {
    const e = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return;
    sel();
    ctx.cmd("share.send", `${e}:${perm}`);
    setEmail("");
    setMsg("");
  };
  const owner = it.owner ?? userName(ctx.doc);
  const people = it.shared ?? [];
  const g = provider === "google";
  const labels = g ? PERM_G : PERM_MS;
  const permOpts = g ? ["view", "comment", "edit"] : ["edit", "view"];
  return (
    <Modal title={`Share "${it.name}"`} width={500} onClose={() => ctx.modal(null)} icon={<FileArt kind={isFolder(it) ? "folder" : kindForName(it.name, false)} s={16} />}>
      <div className="mb-3 flex gap-2">
        <input
          aria-label={g ? "Add people, groups, and calendar events" : "Add a name, group, or email"}
          placeholder={g ? "Add people, groups, and calendar events" : "Add a name, group, or email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") send();
          }}
          className="h-9 min-w-0 flex-1 rounded px-3 text-[12.5px] outline-none"
          style={{ background: T.input, border: `1px solid ${T.line}`, borderBottomColor: T.accent, color: T.text }}
        />
        <Select label="Permission" value={labels[perm]} options={permOpts.map((p) => labels[p])} onChange={(v) => setPerm(Object.keys(labels).find((k) => labels[k] === v) ?? "view")} width={130} />
      </div>
      {email && (
        <textarea aria-label="Message" placeholder="Add a message (optional)" value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="mb-3 h-16 w-full rounded p-2 text-[12px] outline-none" style={{ background: T.input, border: `1px solid ${T.line}`, color: T.text }} />
      )}
      <div className="mb-4 flex justify-end">
        <Btn primary label="Send" disabled={!email.trim()} onClick={send}>Send</Btn>
      </div>
      <div className="mb-2 text-[12.5px] font-semibold">People with access</div>
      <div className="mb-4 max-h-44 overflow-auto">
        <div className="flex items-center gap-3 py-1.5">
          <Avatar name={owner} s={28} />
          <div className="flex-1 text-[12px]"><div>{owner} (you)</div><div style={{ color: T.sub }}>{ctx.doc.user?.email ?? ""}</div></div>
          <span className="text-[12px]" style={{ color: T.sub }}>Owner</span>
        </div>
        {people.map((p) => (
          <div key={p.email} className="flex items-center gap-3 py-1.5">
            <Avatar name={p.name ?? p.email} s={28} />
            <div className="min-w-0 flex-1 text-[12px]">
              <div className="truncate">{p.name ?? p.email}</div>
              <div style={{ color: T.sub }}>{p.email}{p.expires ? ` · Access expires in ${p.expires}` : ""}</div>
            </div>
            <Select
              label={`Permission for ${p.email}`}
              value={labels[p.perm] ?? labels.view}
              options={[...permOpts.map((x) => labels[x]), ...(g ? ["Add expiration"] : []), "Remove access"]}
              onChange={(v) => {
                sel();
                if (v === "Remove access") ctx.cmd("share.remove", p.email);
                else if (v === "Add expiration") setExp(p.email);
                else ctx.cmd("share.perm", `${p.email}:${Object.keys(labels).find((k) => labels[k] === v) ?? "view"}`);
              }}
              width={140}
            />
          </div>
        ))}
        {exp && (
          <div className="ml-10 flex items-center gap-2 rounded p-2 text-[12px]" style={{ background: T.bg }}>
            Access expires in
            {["7 days", "30 days", "90 days"].map((d) => (
              <Btn key={d} small label={`Expire in ${d}`} onClick={() => { sel(); ctx.cmd("share.expire", `${exp}:${d}`); setExp(null); }}>{d}</Btn>
            ))}
          </div>
        )}
      </div>
      {g ? (
        <>
          <div className="mb-2 text-[12.5px] font-semibold">General access</div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: it.link ? "#e6f4ea" : T.bg }}><G n={it.link ? "globe" : "lock"} s={16} /></span>
            <Select label="General access" value={it.link ? "Anyone with the link" : "Restricted"} options={["Restricted", "Anyone with the link"]} onChange={(v) => { sel(); ctx.cmd("share.general", v === "Restricted" ? "restricted" : `anyone:${linkPerm}`); }} width={190} />
            {it.link && <Select label="Link role" value={PERM_G[it.link.split(":")[1]] ?? "Viewer"} options={["Viewer", "Commenter", "Editor"]} onChange={(v) => { const p = Object.keys(PERM_G).find((k) => PERM_G[k] === v) ?? "view"; setLinkPerm(p); sel(); ctx.cmd("share.general", `anyone:${p}`); }} width={120} />}
          </div>
          <p className="mb-3 text-[11.5px]" style={{ color: T.sub }}>{it.link ? "Anyone on the internet with the link can open this item." : "Only people with access can open with the link."}</p>
          <div className="flex justify-between">
            <Btn label="Copy link" onClick={() => ctx.addClip(`https://drive.google.com/file/d/${encodeURIComponent(it.name)}`)}><G n="link" s={14} /> Copy link</Btn>
            <Btn primary label="Done" onClick={() => ctx.modal(null)}>Done</Btn>
          </div>
        </>
      ) : (
        <>
          <div className="mb-2 text-[12.5px] font-semibold">Copy link</div>
          <div className="mb-2 flex items-center gap-2">
            <Select label="Who the link works for" value={linkScope === "anyone" ? "Anyone with the link" : linkScope === "org" ? "People in your organization" : "Only people with existing access"} options={["Anyone with the link", "People in your organization", "Only people with existing access"]} onChange={(v) => setLinkScope(v.startsWith("Anyone") ? "anyone" : v.startsWith("People") ? "org" : "existing")} width={230} />
            <Select label="Link permission" value={PERM_MS[linkPerm] ?? "Can view"} options={["Can view", "Can edit"]} onChange={(v) => setLinkPerm(v === "Can edit" ? "edit" : "view")} width={110} />
            <Btn primary label="Copy" onClick={() => { sel(); ctx.cmd("share.link", `${linkScope}:${linkPerm}`); }}>Copy</Btn>
          </div>
          {it.link && (
            <div className="flex items-center justify-between rounded p-2 text-[12px]" style={{ background: T.bg }}>
              <span><G n="link" s={13} /> {it.link.startsWith("anyone") ? "Anyone with the link" : "People in your organization"} {it.link.endsWith("edit") ? "can edit" : "can view"}</span>
              <Btn small label="Remove link" onClick={() => { sel(); ctx.cmd("share.remove", "link"); }}>Remove link</Btn>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Cloud drive web views                                               */
/* ------------------------------------------------------------------ */

function gKind(it: WinItem): string {
  if (isFolder(it)) return "folder";
  const e = extOf(it.name);
  if (!e) return "gdoc";
  return kindForName(it.name, false);
}

function GIcon({ it, s = 18 }: { it: WinItem; s?: number }) {
  const k = gKind(it);
  if (k === "gdoc")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2" fill="#4285f4" /><path d="M8 9h8M8 12h8M8 15h5" stroke="#fff" strokeWidth="1.4" /></svg>
    );
  if (k === "folder") return <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6.5A1.5 1.5 0 0 1 3.5 5h5.6l2 2H20.5A1.5 1.5 0 0 1 22 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18z" fill="#5f6368" /></svg>;
  return <FileArt kind={k} s={s} />;
}

function folderTree(doc: WinDoc, root: string): string[] {
  const out: string[] = [root];
  const rec = (p: string) => {
    for (const c of getItem(doc, p)?.children ?? []) if (isFolder(c)) {
      out.push(`${p}/${c.name}`);
      rec(`${p}/${c.name}`);
    }
  };
  rec(root);
  return out;
}

function MoveDialog({ path, cfg, copy }: { path: string; cfg: CloudCfg; copy?: boolean }) {
  const ctx = useWin();
  const folders = folderTree(ctx.doc, cfg.root).filter((f) => !(f === parentOf(path) && !copy) && !f.toLowerCase().startsWith(`${path.toLowerCase()}/`) && f.toLowerCase() !== path.toLowerCase());
  const [dest, setDest] = useState(folders[0] ?? cfg.root);
  return (
    <Modal
      title={`${copy ? "Copy" : "Move"} "${baseOf(path)}"`}
      width={400}
      onClose={() => ctx.modal(null)}
      footer={
        <>
          <Btn primary label={copy ? "Copy here" : "Move here"} onClick={() => { ctx.modal(null); ctx.select(`file:${path}`); ctx.cmd(copy ? "fs.copyTo" : "fs.move", dest); }}>{copy ? "Copy here" : "Move here"}</Btn>
          <Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn>
        </>
      }
    >
      <div className="max-h-64 overflow-auto">
        {folders.map((f) => (
          <button key={f} type="button" aria-label={f === cfg.root ? (cfg.provider === "gdrive" ? "My Drive" : "My files") : baseOf(f)} onClick={() => setDest(f)} className="flex h-8 w-full items-center gap-2 rounded px-2 text-left text-[12.5px] hover:bg-[var(--w-hover)]" style={{ paddingLeft: 8 + (splitPath(f).length - 1) * 16, background: dest === f ? T.sel : undefined }}>
            <FileArt kind="folder" s={16} /> {f === cfg.root ? (cfg.provider === "gdrive" ? "My Drive" : "My files") : baseOf(f)}
          </button>
        ))}
      </div>
    </Modal>
  );
}

function NameDialog({ title, initial, okLabel, onOk }: { title: string; initial: string; okLabel: string; onOk: (v: string) => void }) {
  const ctx = useWin();
  const [v, setV] = useState(initial);
  const go = () => {
    if (!v.trim()) return;
    ctx.modal(null);
    onOk(v.trim());
  };
  return (
    <Modal title={title} width={360} onClose={() => ctx.modal(null)} footer={<><Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn><Btn primary label={okLabel} onClick={go}>{okLabel}</Btn></>}>
      <TextIn label={title} value={v} onChange={setV} onEnter={go} autoFocus width="100%" />
    </Modal>
  );
}

function VersionsDialog({ path }: { path: string }) {
  const ctx = useWin();
  const it = getItem(ctx.doc, path);
  return (
    <Modal title={`Version history: ${baseOf(path)}`} width={460} onClose={() => ctx.modal(null)} footer={<Btn label="Close" onClick={() => ctx.modal(null)}>Close</Btn>}>
      {(it?.versions ?? []).length === 0 && <p style={{ color: T.sub }}>There are no earlier versions of this file.</p>}
      {(it?.versions ?? []).map((v, i) => (
        <div key={v.label} className="flex items-center gap-3 border-b py-2 text-[12px]" style={{ borderColor: T.line }}>
          <div className="flex-1">
            <div className="font-semibold">{v.label}{v.current || (i === 0 && !(it?.versions ?? []).some((x) => x.current)) ? " (Current version)" : ""}</div>
            <div style={{ color: T.sub }}>{v.by ?? ""}</div>
          </div>
          {!(v.current || (i === 0 && !(it?.versions ?? []).some((x) => x.current))) && (
            <Btn small label={`Restore ${v.label}`} onClick={() => { ctx.select(`file:${realPath(ctx.doc, path)}`); ctx.cmd("cloud.restore", v.label); ctx.modal(null); }}>Restore</Btn>
          )}
        </div>
      ))}
    </Modal>
  );
}

function UploadDialog({ dest }: { dest: string }) {
  const ctx = useWin();
  const local = ctx.doc.fs.filter((r) => ["desktop", "documents", "downloads", "pictures"].includes(r.root));
  const [loc, setLoc] = useState(local[0]?.name ?? "");
  const files = (getItem(ctx.doc, loc)?.children ?? []).filter((c) => !isFolder(c));
  const [pick, setPick] = useState<string | null>(null);
  return (
    <Modal
      title="Open"
      width={520}
      onClose={() => ctx.modal(null)}
      footer={
        <>
          <Btn primary label="Open" disabled={!pick} onClick={() => { if (!pick) return; ctx.modal(null); ctx.select(`file:${loc}/${pick}`); ctx.cmd("fs.copyTo", dest); }}>Open</Btn>
          <Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn>
        </>
      }
    >
      <div className="flex h-56 gap-3">
        <div className="w-32 shrink-0">
          {local.map((r) => (
            <button key={r.name} type="button" aria-label={r.name} onClick={() => { setLoc(r.name); setPick(null); }} className="flex h-8 w-full items-center gap-2 rounded px-2 text-left text-[12px] hover:bg-[var(--w-hover)]" style={{ background: loc === r.name ? T.press : undefined }}>
              <FileArt kind={r.root} s={14} /> {r.name}
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-auto rounded" style={{ border: `1px solid ${T.line}` }}>
          {files.map((f) => (
            <button key={f.name} type="button" aria-label={f.name} onClick={() => setPick(f.name)} onDoubleClick={() => { ctx.modal(null); ctx.select(`file:${loc}/${f.name}`); ctx.cmd("fs.copyTo", dest); }} className="flex h-8 w-full items-center gap-2 px-2 text-left text-[12px] hover:bg-[var(--w-hover)]" style={{ background: pick === f.name ? T.sel : undefined }}>
              <FileArt kind={kindForName(f.name, false)} s={16} /> {f.name}
            </button>
          ))}
          {!files.length && <p className="p-3 text-[12px]" style={{ color: T.sub }}>No files here.</p>}
        </div>
      </div>
      <p className="mt-2 text-[12px]">File name: {pick ?? ""}</p>
    </Modal>
  );
}

function DocEditor({ path, cfg }: { path: string; cfg: CloudCfg }) {
  const ctx = useWin();
  const it = getItem(ctx.doc, path);
  const [panel, setPanel] = useState<"versions" | null>(null);
  const [verSel, setVerSel] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const g = cfg.provider === "gdrive";
  if (!it) return <p className="p-6">This file is no longer available.</p>;
  const sel = () => ctx.select(`file:${realPath(ctx.doc, path)}`);
  const versions = it.versions ?? [];
  const shown = verSel ? versions.find((v) => v.label === verSel) : undefined;
  const text = shown?.text ?? it.text ?? "";
  const sugg = it.suggestions ?? [];
  const pending = sugg.filter((s) => !s.status);
  const renderText = (t: string): ReactNode[] =>
    t.split("\n").map((line, i) => {
      const parts = line.split(/(\[\[[a-z0-9]+\]\])/i);
      return (
        <p key={i} className="mb-2 min-h-[1em]">
          {parts.map((p, j) => {
            const m = /^\[\[([a-z0-9]+)\]\]$/i.exec(p);
            if (!m) return <span key={j}>{p}</span>;
            const s = sugg.find((x) => x.id === m[1]);
            if (!s || s.status === "rejected") return null;
            return s.status === "accepted" ? <span key={j}>{s.text}</span> : <span key={j} className="text-[#137333] underline decoration-[#137333]">{s.text}</span>;
          })}
        </p>
      );
    });
  const fileMenu = (e: React.MouseEvent) =>
    ctx.menu(e, [
      { label: "Share", icon: "share", onClick: () => ctx.share(path, g ? "google" : "ms") },
      { label: "Make a copy", icon: "copy", onClick: () => { sel(); ctx.cmd("fs.copyTo", parentOf(realPath(ctx.doc, path))); } },
      { label: "Download", icon: "download", onClick: () => ctx.cmd("edge.download", it.name) },
      { label: "Rename", icon: "rename", onClick: () => setTitle(it.name) },
      { label: "Move", icon: "open", onClick: () => ctx.modal(<MoveDialog path={realPath(ctx.doc, path)} cfg={cfg} />) },
      { sep: true },
      { label: "Version history", icon: "history", sub: [{ label: "See version history", onClick: () => setPanel("versions") }] },
      { label: "Details", icon: "info", disabled: true },
    ]);
  return (
    <div className="flex h-full flex-col" style={{ background: g ? "#f9fbfd" : "#f3f2f1" }}>
      <div className="flex items-center gap-3 px-4 py-2" style={{ background: g ? "#f9fbfd" : "#185abd", color: g ? "#1f1f1f" : "#fff" }}>
        {g ? <GIcon it={it} s={30} /> : <AppIcon id="word" s={24} />}
        <div className="min-w-0 flex-1">
          {title !== null ? (
            <input
              autoFocus
              aria-label="Rename"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") {
                  const v = title.trim();
                  setTitle(null);
                  if (v && v !== it.name) ctx.commit({ kind: "type", target: realPath(ctx.doc, path), value: v });
                }
                if (e.key === "Escape") setTitle(null);
              }}
              onBlur={() => setTitle(null)}
              className="h-7 rounded border border-[#0b57d0] px-1.5 text-[15px] text-black outline-none"
            />
          ) : (
            <button type="button" aria-label="Rename document" onClick={() => setTitle(it.name)} className="truncate rounded px-1 text-[15px] hover:outline hover:outline-1">{it.name}</button>
          )}
          <div className="flex gap-3 px-1 text-[12px]">
            {(g ? ["File", "Edit", "View", "Insert", "Format", "Tools", "Help"] : ["File", "Home", "Insert", "Layout", "References", "Review", "View"]).map((m) => (
              <button key={m} type="button" aria-label={m} onClick={(e) => (m === "File" ? fileMenu(e) : undefined)} className="rounded px-1 hover:bg-black/10">{m}</button>
            ))}
          </div>
        </div>
        <span className="text-[11px] opacity-70">{g ? "Saved to Drive" : "Saved"}</span>
        <button type="button" aria-label="Version history" title="Open version history" onClick={() => setPanel(panel ? null : "versions")} className="rounded p-1.5 hover:bg-black/10"><G n="history" s={18} /></button>
        <button type="button" aria-label="Share" onClick={() => ctx.share(path, g ? "google" : "ms")} className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold" style={{ background: g ? "#c2e7ff" : "#fff", color: g ? "#001d35" : "#185abd" }}>
          <G n="lock" s={14} /> Share
        </button>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 overflow-auto p-6">
          <div className="mx-auto min-h-[460px] max-w-[620px] bg-white p-10 text-[13px] leading-relaxed text-black shadow" style={{ fontFamily: g ? "Arial, sans-serif" : "Aptos, Calibri, sans-serif" }}>
            {shown && <div className="mb-3 rounded bg-[#fff4ce] px-2 py-1 text-[11.5px]">Viewing version: {shown.label}</div>}
            {renderText(text)}
          </div>
        </div>
        {(pending.length > 0 || (it.comments ?? []).length > 0) && !panel && (
          <div className="w-60 shrink-0 overflow-auto p-3">
            {pending.map((s) => (
              <div key={s.id} className="mb-2 rounded-lg bg-white p-3 text-[12px] text-black shadow">
                <div className="mb-1 flex items-center gap-2"><Avatar name={s.by} s={22} /><span className="flex-1 font-semibold">{s.by}</span>
                  <button type="button" aria-label={`Accept suggestion ${s.id}`} title="Accept suggestion" onClick={() => { sel(); ctx.cmd("doc.accept", s.id); }} className="rounded p-1 text-[#137333] hover:bg-[#e6f4ea]"><G n="check" s={15} /></button>
                  <button type="button" aria-label={`Reject suggestion ${s.id}`} title="Reject suggestion" onClick={() => { sel(); ctx.cmd("doc.reject", s.id); }} className="rounded p-1 text-[#c5221f] hover:bg-[#fce8e6]"><G n="close" s={13} /></button>
                </div>
                <div>Add: &quot;<span className="text-[#137333]">{s.text}</span>&quot;</div>
              </div>
            ))}
            {(it.comments ?? []).map((c, i) => (
              <div key={i} className="mb-2 rounded-lg bg-white p-3 text-[12px] text-black shadow"><div className="mb-1 flex items-center gap-2"><Avatar name={c.by} s={22} /><span className="font-semibold">{c.by}</span></div>{c.text}</div>
            ))}
          </div>
        )}
        {panel === "versions" && (
          <div className="flex w-64 shrink-0 flex-col bg-white text-black shadow-lg">
            <div className="flex items-center justify-between border-b px-3 py-2 text-[14px] font-semibold">Version history<button type="button" aria-label="Close version history" onClick={() => { setPanel(null); setVerSel(null); }}><G n="close" s={12} /></button></div>
            <div className="flex-1 overflow-auto">
              {versions.map((v, i) => {
                const cur = v.current || (i === 0 && !versions.some((x) => x.current));
                return (
                  <button key={v.label} type="button" aria-label={v.label} onClick={() => setVerSel(cur ? null : v.label)} className="block w-full px-3 py-2 text-left text-[12px] hover:bg-[#f1f3f4]" style={{ background: verSel === v.label ? "#e8f0fe" : undefined }}>
                    <div className="font-semibold">{v.label}{cur ? " · Current version" : ""}</div>
                    <div className="text-[#5f6368]">{v.by}</div>
                  </button>
                );
              })}
            </div>
            {verSel && (
              <div className="border-t p-3">
                <button type="button" aria-label="Restore this version" onClick={() => { sel(); ctx.cmd("cloud.restore", verSel); setVerSel(null); setPanel(null); }} className="w-full rounded bg-[#0b57d0] py-1.5 text-[12.5px] font-semibold text-white">Restore this version</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CloudView({ cfg, tab }: { cfg: CloudCfg; tab: WinTab }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const g = cfg.provider === "gdrive";
  const path = tab.cloud && getItem(doc, tab.cloud) ? tab.cloud : cfg.root;
  const section = tab.section;
  const [dragHint, setDragHint] = useState<string | null>(null);
  if (tab.file && getItem(doc, tab.file)) return <DocEditor path={tab.file} cfg={cfg} />;
  const keys = new Set(ctx.sel.split(",").filter(Boolean));
  const sel = Array.from(keys).filter((k) => k.startsWith("file:")).map((k) => k.slice(5));
  const one = sel.length === 1 ? sel[0] : null;
  const oneIt = one ? getItem(doc, one) : null;
  let rows: { path: string; it: WinItem }[] = [];
  if (section === "Recent") rows = (doc.recent ?? []).filter((p) => p.toLowerCase().startsWith(`${cfg.root.toLowerCase()}/`) && getItem(doc, p)).map((p) => ({ path: p, it: getItem(doc, p)! }));
  else if (section === "Shared") {
    const rec = (p: string) => {
      for (const c of getItem(doc, p)?.children ?? []) {
        const cp = `${p}/${c.name}`;
        if ((c.shared ?? []).length || c.link) rows.push({ path: cp, it: c });
        if (isFolder(c)) rec(cp);
      }
    };
    rec(cfg.root);
  } else if (section === "Recycle bin" || section === "Trash") {
    rows = [];
  } else rows = (getItem(doc, path)?.children ?? []).map((c) => ({ path: `${realPath(doc, path)}/${c.name}`, it: c })).sort((a, b) => (isFolder(a.it) === isFolder(b.it) ? a.it.name.localeCompare(b.it.name) : isFolder(a.it) ? -1 : 1));
  const binItems = (doc.recycle ?? []).filter((b) => b.from.toLowerCase().startsWith(cfg.root.toLowerCase()));
  const crumbs = splitPath(realPath(doc, path));
  const open = (p: string) => ctx.cmd("cloud.open", p);
  const newFolder = () =>
    ctx.modal(
      <NameDialog
        title={g ? "New folder" : "Create a folder"}
        initial={g ? "Untitled folder" : "New folder"}
        okLabel="Create"
        onOk={(v) => {
          ctx.cmd("fs.newFolder", realPath(doc, path));
          ctx.commit({ kind: "type", target: `${realPath(doc, path)}/New folder`, value: v });
        }}
      />,
    );
  const newDoc = (kind: string) => {
    const name = g ? { doc: "Untitled document", sheet: "Untitled spreadsheet.xlsx", slides: "Untitled presentation.pptx" }[kind] ?? "Untitled document" : { doc: "Document.docx", sheet: "Book.xlsx", slides: "Presentation.pptx" }[kind] ?? "Document.docx";
    ctx.cmd("fs.newFile", `${realPath(doc, path)}/${name}`);
  };
  const rowMenu = (e: React.MouseEvent, p: string, it: WinItem) => {
    ctx.select(`file:${p}`);
    const items: MItem[] = [
      { label: "Open", icon: "open", onClick: () => open(p) },
      { label: "Share", icon: "share", onClick: () => ctx.share(p, g ? "google" : "ms") },
      { label: "Copy link", icon: "link", onClick: () => ctx.share(p, g ? "google" : "ms") },
      { label: "Download", icon: "download", onClick: () => ctx.cmd("edge.download", it.name) },
      { sep: true },
      { label: "Rename", icon: "rename", onClick: () => ctx.modal(<NameDialog title="Rename" initial={it.name} okLabel={g ? "OK" : "Rename"} onOk={(v) => v !== it.name && ctx.commit({ kind: "type", target: p, value: v })} />) },
      { label: g ? "Move" : "Move to", icon: "open", onClick: () => ctx.modal(<MoveDialog path={p} cfg={cfg} />) },
      { label: g ? "Make a copy" : "Copy to", icon: "copy", onClick: () => (g ? (ctx.select(`file:${p}`), ctx.cmd("fs.copyTo", parentOf(p))) : ctx.modal(<MoveDialog path={p} cfg={cfg} copy />)) },
      { label: "Version history", icon: "history", disabled: isFolder(it), onClick: () => ctx.modal(<VersionsDialog path={p} />) },
      { sep: true },
      { label: g ? "Move to trash" : "Delete", icon: "delete", onClick: () => { ctx.select(`file:${p}`); ctx.cmd("fs.delete"); } },
    ];
    ctx.menu(e, items);
  };
  const brand = g ? "#ffffff" : "#0f6cbd";
  return (
    <div className="flex h-full flex-col bg-white text-[#1b1b1b]">
      <div className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ background: brand, color: g ? "#1f1f1f" : "#fff", borderBottom: g ? "1px solid #e0e0e0" : undefined }}>
        <G n="waffle" s={16} />
        {g ? <span className="flex items-center gap-2 text-[17px]"><FileArt kind="gdrive" s={24} /> Drive</span> : <span className="text-[15px] font-semibold">OneDrive</span>}
        <div className="mx-auto flex h-8 w-[420px] max-w-[40%] items-center gap-2 rounded-full px-3 text-[12.5px]" style={{ background: g ? "#e9eef6" : "#fff", color: "#555" }}>
          <G n="search" s={14} /> {g ? "Search in Drive" : "Search"}
        </div>
        <G n="gear" s={16} />
        <Avatar name={userName(doc)} s={28} />
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="w-44 shrink-0 p-2 text-[12.5px]" style={{ background: g ? "#f8fafd" : "#faf9f8" }}>
          <button
            type="button"
            aria-label={g ? "New" : "Add new"}
            onClick={(e) =>
              ctx.menu(e, [
                { label: g ? "New folder" : "Folder", icon: "newFolder", onClick: newFolder },
                { sep: true },
                { label: g ? "File upload" : "Files upload", icon: "upload", onClick: () => ctx.modal(<UploadDialog dest={realPath(doc, path)} />) },
                { sep: true },
                { label: g ? "Google Docs" : "Word document", icon: "properties", onClick: () => newDoc("doc") },
                { label: g ? "Google Sheets" : "Excel workbook", icon: "grid", onClick: () => newDoc("sheet") },
                { label: g ? "Google Slides" : "PowerPoint presentation", icon: "app", onClick: () => newDoc("slides") },
              ])
            }
            className="mb-3 flex h-12 items-center gap-2 rounded-2xl px-4 text-[13px] font-semibold shadow"
            style={{ background: g ? "#fff" : "#0f6cbd", color: g ? "#1f1f1f" : "#fff" }}
          >
            <G n="plus" s={18} /> {g ? "New" : "Add new"}
          </button>
          {(g ? ["Home", "My Drive", "Shared with me", "Recent", "Starred", "Trash"] : ["Home", "My files", "Shared", "Recent", "Recycle bin"]).map((s) => {
            const sec = s === "Shared with me" ? "Shared" : s === "Trash" ? "Recycle bin" : s;
            const act = sec === "My files" || sec === "My Drive" || sec === "Home" ? !section : section === sec;
            return (
              <button key={s} type="button" aria-label={s} onClick={() => (sec === "Home" || sec === "My files" || sec === "My Drive" ? (ctx.cmd("cloud.open", cfg.root), ctx.cmd("cloud.view", "My files")) : ctx.cmd("cloud.view", sec))} className="mb-0.5 flex h-8 w-full items-center gap-2 rounded-full px-3 text-left hover:bg-black/5" style={{ background: act && s !== "Home" ? (g ? "#c2e7ff" : "#e1dfdd") : undefined }}>
                <G n={s === "Home" ? "home" : s.startsWith("Shared") ? "people" : s === "Recent" ? "history" : s === "Starred" ? "star" : s === "Trash" || s === "Recycle bin" ? "delete" : "cloud"} s={15} /> {s}
              </button>
            );
          })}
          <div className="mt-4 px-3 text-[11px] text-[#666]">{g ? "1.2 GB of 15 GB used" : "2.1 GB of 1 TB used"}</div>
        </div>
        <div
          className="relative min-w-0 flex-1 overflow-auto p-4"
          onMouseDown={(e) => { if (e.target === e.currentTarget) ctx.select(""); }}
          onDragOver={(e) => Array.from(e.dataTransfer.types).includes(DND) && dragOver(e, doc, realPath(doc, path), setDragHint)}
          onDragLeave={() => setDragHint(null)}
          onDrop={(e) => {
            setDragHint(null);
            const raw = e.dataTransfer.getData(DND);
            if (!raw) return;
            e.preventDefault();
            try {
              const paths = JSON.parse(raw) as string[];
              ctx.select(paths.map((p) => `file:${p}`).join(","));
              const inside = paths.every((p) => rootOf(doc, p)?.name === cfg.root);
              ctx.cmd(inside ? "fs.move" : "fs.copyTo", realPath(doc, path));
            } catch {
              /* ignore */
            }
          }}
        >
          <div className="mb-3 flex items-center gap-1 text-[18px]">
            {section ? (
              <span>{section === "Shared" ? (g ? "Shared with me" : "Shared") : section === "Recycle bin" ? (g ? "Trash" : "Recycle bin") : section}</span>
            ) : (
              crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <G n="chevR" s={12} />}
                  <button type="button" aria-label={i === 0 ? (g ? "My Drive" : "My files") : c} onClick={() => open(crumbs.slice(0, i + 1).join("/"))} className="rounded px-1.5 hover:bg-black/5">{i === 0 ? (g ? "My Drive" : "My files") : c}</button>
                </span>
              ))
            )}
          </div>
          {!section && sel.length === 0 && <div className="mb-2 flex h-[34px] items-center px-3 text-[12px] text-[#666]">Select a file or folder to share, move, rename, or delete it.</div>}
          {sel.length > 0 && !section && (
            <div className="mb-2 flex h-[34px] items-center gap-1 rounded-full px-3 text-[12px]" style={{ background: g ? "#e9eef6" : "#f3f2f1" }}>
              <button type="button" aria-label="Clear selection" onClick={() => ctx.select("")} className="rounded-full p-1 hover:bg-black/10"><G n="close" s={11} /></button>
              <span className="mr-2">{sel.length} selected</span>
              {one && <button type="button" aria-label="Share" onClick={() => ctx.share(one, g ? "google" : "ms")} className="rounded-full p-1.5 hover:bg-black/10"><G n="share" s={15} /></button>}
              {one && oneIt && <button type="button" aria-label="Download" onClick={() => ctx.cmd("edge.download", oneIt.name)} className="rounded-full p-1.5 hover:bg-black/10"><G n="download" s={15} /></button>}
              {one && <button type="button" aria-label={g ? "Move" : "Move to"} onClick={() => ctx.modal(<MoveDialog path={one} cfg={cfg} />)} className="rounded-full p-1.5 hover:bg-black/10"><G n="open" s={15} /></button>}
              {one && oneIt && <button type="button" aria-label="Rename" onClick={() => ctx.modal(<NameDialog title="Rename" initial={oneIt.name} okLabel="OK" onOk={(v) => v !== oneIt.name && ctx.commit({ kind: "type", target: one, value: v })} />)} className="rounded-full p-1.5 hover:bg-black/10"><G n="rename" s={15} /></button>}
              <button type="button" aria-label={g ? "Move to trash" : "Delete"} onClick={() => ctx.cmd("fs.delete")} className="rounded-full p-1.5 hover:bg-black/10"><G n="delete" s={15} /></button>
              {one && oneIt && !isFolder(oneIt) && <button type="button" aria-label="Version history" onClick={() => ctx.modal(<VersionsDialog path={one} />)} className="rounded-full p-1.5 hover:bg-black/10"><G n="history" s={15} /></button>}
            </div>
          )}
          {section === "Recycle bin" ? (
            binItems.length ? binItems.map((b) => (
              <div key={b.item.name} className="flex h-10 items-center gap-3 border-b border-[#eee] px-2 text-[12.5px]"><GIcon it={b.item} /> <span className="flex-1">{b.item.name}</span><span className="text-[#666]">Deleted {b.deleted}</span></div>
            )) : <p className="text-[13px] text-[#666]">{g ? "Nothing in trash" : "Your recycle bin is empty"}</p>
          ) : (
            <table className="w-full border-collapse text-[12.5px]">
              <thead>
                <tr className="border-b border-[#e0e0e0] text-left text-[12px] text-[#444]">
                  <th className="px-2 py-2 font-medium">Name</th>
                  <th className="px-2 py-2 font-medium">{g ? "Owner" : "Modified"}</th>
                  <th className="px-2 py-2 font-medium">{g ? "Last modified" : "File size"}</th>
                  <th className="px-2 py-2 font-medium">{g ? "File size" : "Sharing"}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ path: p, it }) => {
                  const k = `file:${p}`;
                  const selected = keys.has(k);
                  const shared = (it.shared ?? []).length > 0 || Boolean(it.link);
                  return (
                    <tr
                      key={p}
                      aria-label={it.name}
                      aria-selected={selected}
                      draggable
                      onDragStart={(e) => { e.dataTransfer.setData(DND, JSON.stringify([p])); ctx.select(k); }}
                      onDragOver={isFolder(it) ? (e) => dragOver(e, doc, p) : undefined}
                      onDrop={isFolder(it) ? (e) => { const raw = e.dataTransfer.getData(DND); if (!raw) return; e.preventDefault(); e.stopPropagation(); try { const ps = JSON.parse(raw) as string[]; if (ps.includes(p)) return; ctx.select(ps.map((x) => `file:${x}`).join(",")); ctx.cmd("fs.move", p); } catch { /* ignore */ } } : undefined}
                      onClick={(e) => ctx.select(e.ctrlKey || e.metaKey ? Array.from(new Set([...Array.from(keys), k])).join(",") : k)}
                      onDoubleClick={() => open(p)}
                      onContextMenu={(e) => { e.preventDefault(); rowMenu(e, p, it); }}
                      className="h-10 cursor-default border-b border-[#eee] hover:bg-[#f5f5f5]"
                      style={{ background: selected ? (g ? "#c2e7ff" : "#deecf9") : undefined }}
                    >
                      <td className="px-2">
                        <span className="flex items-center gap-3">
                          <GIcon it={it} />
                          <button type="button" aria-label={`Open ${it.name}`} onClick={(e) => { e.stopPropagation(); open(p); }} className="truncate text-left hover:underline">{it.name}</button>
                          {!g && it.sync && <span className="text-[10px] text-[#107c10]" title="Available">●</span>}
                        </span>
                      </td>
                      <td className="px-2 text-[#555]">{g ? "me" : it.modified ?? ""}</td>
                      <td className="px-2 text-[#555]">{g ? it.modified ?? "" : isFolder(it) ? `${(it.children ?? []).length} items` : sizeOf(it)}</td>
                      <td className="px-2 text-[#555]">{g ? (isFolder(it) ? "—" : sizeOf(it)) : shared ? <span className="flex items-center gap-1"><G n="people" s={13} /> Shared</span> : "Private"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!rows.length && section !== "Recycle bin" && <p className="mt-6 text-center text-[13px] text-[#666]">{section ? "Nothing here yet." : "This folder is empty. Drag files here to upload them."}</p>}
          {dragHint && <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-[#0f6cbd] px-3 py-1 text-[12px] text-white">Upload to {g ? "Drive" : "OneDrive"}</span>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panes and flyouts                                                   */
/* ------------------------------------------------------------------ */

function Pane({ title, children, onClose, actions }: { title: string; children: ReactNode; onClose: () => void; actions?: ReactNode }) {
  return (
    <div className="w11-pop absolute right-2 top-1 z-[120] flex max-h-[85%] w-[340px] flex-col rounded-lg shadow-2xl" style={{ background: T.flyout, color: T.text, border: `1px solid ${T.line}` }} onMouseDown={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-1 px-3 py-2">
        <span className="flex-1 text-[14px] font-semibold">{title}</span>
        {actions}
        <button type="button" aria-label={`Close ${title}`} onClick={onClose} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="close" s={12} /></button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">{children}</div>
    </div>
  );
}

function FavoritesPane({ onClose, currentUrl }: { onClose: () => void; currentUrl: string }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("New folder");
  const favs = doc.favorites ?? [];
  const folders = ["Favorites bar", ...(doc.favFolders ?? []), "Other favorites"];
  const [open, setOpen] = useState<Record<string, boolean>>({ "Favorites bar": true });
  return (
    <Pane
      title="Favorites"
      onClose={onClose}
      actions={
        <>
          <button type="button" aria-label="Add this page to favorites" title="Add this page to favorites" onClick={() => { ctx.select(`page:${currentUrl}`); ctx.cmd("edge.favorite", "Favorites bar"); }} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="star" s={15} /></button>
          <button type="button" aria-label="Add folder" title="Add folder" onClick={() => setAdding(true)} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="newFolder" s={15} /></button>
        </>
      }
    >
      {adding && (
        <div className="mb-2 flex items-center gap-2 px-1">
          <FileArt kind="folder" s={16} />
          <input
            autoFocus
            aria-label="Folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter" && name.trim()) {
                setAdding(false);
                ctx.cmd("edge.favFolder", name.trim());
                setName("New folder");
              }
              if (e.key === "Escape") setAdding(false);
            }}
            className="h-7 flex-1 rounded px-2 text-[12px] outline-none"
            style={{ background: T.input, border: `1px solid ${T.accent}`, color: T.text }}
          />
        </div>
      )}
      {folders.map((f) => {
        const items = favs.filter((x) => (x.folder ?? "Favorites bar") === f);
        return (
          <div key={f}>
            <button type="button" aria-label={f} onClick={() => setOpen((o) => ({ ...o, [f]: !o[f] }))} className="flex h-8 w-full items-center gap-2 rounded px-2 text-left text-[12.5px] hover:bg-[var(--w-hover)]">
              <G n={open[f] ? "chevD" : "chevR"} s={10} /> <FileArt kind="folder" s={16} /> {f}
            </button>
            {open[f] && items.map((x) => (
              <button
                key={x.url}
                type="button"
                aria-label={x.name}
                onClick={() => ctx.cmd("edge.nav", x.url)}
                onContextMenu={(e) => { e.preventDefault(); ctx.menu(e, [{ label: "Open", onClick: () => ctx.cmd("edge.nav", x.url) }, { label: "Delete", icon: "delete", onClick: () => ctx.cmd("edge.favRemove", x.url) }]); }}
                className="flex h-8 w-full items-center gap-2 rounded pl-9 pr-2 text-left text-[12px] hover:bg-[var(--w-hover)]"
              >
                <G n="globe" s={14} /> <span className="truncate">{x.name}</span>
              </button>
            ))}
          </div>
        );
      })}
    </Pane>
  );
}

function HistoryPane({ onClose }: { onClose: () => void }) {
  const ctx = useWin();
  const hist = ctx.doc.history ?? [];
  return (
    <Pane title="History" onClose={onClose} actions={<button type="button" aria-label="More options" onClick={(e) => ctx.menu(e, [{ label: "Clear browsing data", icon: "delete", onClick: () => { onClose(); ctx.cmd("edge.nav", "edge://settings/privacy"); } }, { label: "Open history page", onClick: () => ctx.cmd("edge.nav", "edge://history") }])} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="more" s={15} /></button>}>
      <div className="mb-1 px-2 text-[11px] font-semibold" style={{ color: T.sub }}>Today</div>
      {hist.length === 0 && <p className="px-2 text-[12px]" style={{ color: T.sub }}>Nothing here yet.</p>}
      {hist.map((h) => (
        <div key={h.url} className="group flex h-10 items-center gap-2 rounded px-2 hover:bg-[var(--w-hover)]">
          <G n="globe" s={14} />
          <button type="button" aria-label={h.title} onClick={() => ctx.cmd("edge.nav", h.url)} className="min-w-0 flex-1 text-left">
            <div className="truncate text-[12px]">{h.title}</div>
            <div className="truncate text-[10.5px]" style={{ color: T.sub }}>{domainOf(h.url)}</div>
          </button>
          <span className="text-[10.5px]" style={{ color: T.sub }}>{h.when}</span>
          <button type="button" aria-label={`Delete ${h.title} from history`} onClick={() => ctx.cmd("edge.historyDelete", h.url)} className="invisible rounded p-1 group-hover:visible hover:bg-[var(--w-press)]"><G n="close" s={10} /></button>
        </div>
      ))}
    </Pane>
  );
}

function DownloadsPane({ onClose }: { onClose: () => void }) {
  const ctx = useWin();
  const dls = ctx.doc.downloads ?? [];
  return (
    <Pane title="Downloads" onClose={onClose} actions={<button type="button" aria-label="Open downloads folder" title="Open downloads folder" onClick={() => ctx.cmd("edge.dlShow", "")} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><FileArt kind="folder" s={15} /></button>}>
      {dls.length === 0 && <p className="px-2 py-2 text-[12px]" style={{ color: T.sub }}>There are no recent downloads.</p>}
      {dls.map((d) => (
        <div key={d.name} className="mb-1 rounded p-2 hover:bg-[var(--w-hover)]">
          <div className="flex items-start gap-2">
            <FileArt kind={kindForName(d.name, false)} s={22} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-semibold">{d.name}</div>
              {d.status === "warn" ? (
                <div className="text-[11px]" style={{ color: d.danger === "unsafe" ? "#c42b1c" : "#9d5d00" }}>
                  {d.danger === "unsafe" ? `${d.name} was blocked because it could harm your device.` : `${d.name} isn't commonly downloaded. Make sure you trust ${d.name} before you open it.`}
                </div>
              ) : (
                <button type="button" aria-label={`Open file ${d.name}`} onClick={() => ctx.cmd("edge.dlOpen", d.name)} className="text-[11px] hover:underline" style={{ color: T.accent }}>Open file</button>
              )}
            </div>
            {d.status === "warn" ? (
              <button
                type="button"
                aria-label={`More actions for ${d.name}`}
                onClick={(e) =>
                  ctx.menu(e, [
                    { label: "Delete", icon: "delete", onClick: () => ctx.cmd("edge.dlDelete", d.name) },
                    { label: d.danger === "unsafe" ? "Keep anyway" : "Keep", onClick: () => ctx.cmd("edge.dlKeep", d.name) },
                    { label: "Report this file as unsafe", icon: "report", onClick: () => ctx.cmd("edge.reportUnsafe") },
                    { label: "Learn more", icon: "info", disabled: true },
                  ])
                }
                className="rounded p-1 hover:bg-[var(--w-press)]"
              >
                <G n="more" s={14} />
              </button>
            ) : (
              <>
                <button type="button" aria-label={`Show ${d.name} in folder`} title="Show in folder" onClick={() => ctx.cmd("edge.dlShow", d.name)} className="rounded p-1 hover:bg-[var(--w-press)]"><FileArt kind="folder" s={14} /></button>
                <button type="button" aria-label={`Delete ${d.name}`} title="Delete" onClick={() => ctx.cmd("edge.dlDelete", d.name)} className="rounded p-1 hover:bg-[var(--w-press)]"><G n="delete" s={14} /></button>
              </>
            )}
          </div>
        </div>
      ))}
    </Pane>
  );
}

function FavoriteFlyout({ url, onClose }: { url: string; onClose: () => void }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const existing = (doc.favorites ?? []).find((f) => f.url === url);
  const [name, setName] = useState(existing?.name ?? pageTitle(doc, url));
  const [folder, setFolder] = useState(existing?.folder ?? "Favorites bar");
  return (
    <div className="w11-pop absolute right-24 top-1 z-[130] w-[320px] rounded-lg p-4 shadow-2xl" style={{ background: T.flyout, color: T.text, border: `1px solid ${T.line}` }} onMouseDown={(e) => e.stopPropagation()}>
      <div className="mb-3 text-[14px] font-semibold">{existing ? "Edit favorite" : "Favorite added"}</div>
      <label className="mb-2 flex items-center gap-2 text-[12px]"><span className="w-12">Name</span><TextIn label="Favorite name" value={name} onChange={setName} width="100%" /></label>
      <label className="mb-4 flex items-center gap-2 text-[12px]"><span className="w-12">Folder</span><Select label="Folder" value={folder} options={["Favorites bar", ...(doc.favFolders ?? []), "Other favorites"]} onChange={setFolder} width={230} /></label>
      <div className="flex justify-end gap-2">
        <Btn label="More">More</Btn>
        <Btn primary label="Done" onClick={() => { onClose(); ctx.select(`page:${url}`); ctx.cmd("edge.favorite", folder); }}>Done</Btn>
        <Btn label="Remove" onClick={() => { onClose(); if (existing) ctx.cmd("edge.favRemove", url); }}>Remove</Btn>
      </div>
    </div>
  );
}

function SiteInfo({ url, secure, onClose }: { url: string; secure: boolean; onClose: () => void }) {
  return (
    <div className="w11-pop absolute left-28 top-1 z-[130] w-[330px] rounded-lg p-4 text-[12.5px] shadow-2xl" style={{ background: T.flyout, color: T.text, border: `1px solid ${T.line}` }} onMouseDown={(e) => e.stopPropagation()}>
      <div className="mb-3 flex items-center justify-between"><span className="text-[14px] font-semibold">About {domainOf(url)}</span><button type="button" aria-label="Close site information" onClick={onClose}><G n="close" s={12} /></button></div>
      <div className="mb-2 flex items-start gap-2.5 rounded p-2" style={{ background: T.bg }}>
        <span style={{ color: secure ? "#107c10" : "#c42b1c" }}><G n={secure ? "padlock" : "warn"} s={18} /></span>
        <div>
          <div className="font-semibold">{secure ? "Connection is secure" : "Your connection to this site isn't secure"}</div>
          <div className="text-[11.5px]" style={{ color: T.sub }}>{secure ? "Your information (for example, passwords or credit card numbers) is private when it is sent to this site." : "You shouldn't enter any sensitive information on this site (for example, passwords or credit cards), because it could be stolen by attackers."}</div>
        </div>
      </div>
      {secure && <div className="mb-2 flex items-center gap-2.5 rounded p-2" style={{ background: T.bg }}><G n="shieldCheck" s={16} /> Certificate is valid</div>}
      <div className="flex items-center gap-2.5 rounded p-2" style={{ background: T.bg }}><G n="gear" s={16} /> Permissions for this site</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Edge window                                                         */
/* ------------------------------------------------------------------ */

function AddressBar({ tab, privateMode, onInfo, onStar, starred }: { tab: WinTab; privateMode: boolean; onInfo: () => void; onStar: () => void; starred: boolean }) {
  const ctx = useWin();
  const r = resolveUrl(ctx.doc, tab.url);
  const [edit, setEdit] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const h = () => {
      setEdit(tab.url === "edge://newtab" ? "" : r.kind === "search" ? r.q : displayUrl(tab.url));
      setTimeout(() => ref.current?.select(), 0);
    };
    window.addEventListener("w11-edge-address", h);
    return () => window.removeEventListener("w11-edge-address", h);
  }, [tab.url, r]);
  const secure = r.kind === "page" ? r.page.secure !== false : r.kind !== "error";
  const go = (v: string) => {
    const t = v.trim();
    setEdit(null);
    if (!t) return;
    if (looksLikeUrl(t)) ctx.cmd("edge.nav", normUrl(t));
    else ctx.cmd("edge.search", t);
  };
  const shown = tab.url === "edge://newtab" ? "" : r.kind === "search" ? `https://www.bing.com/search?q=${encodeURIComponent(r.q)}` : r.kind === "cloud" ? `https://${r.cfg.host}/${tab.file ? "edit" : "my-files"}` : displayUrl(tab.url);
  const unsafe = r.kind === "page" && r.page.unsafe && !tab.bypass;
  return (
    <div className="flex h-8 min-w-0 flex-1 items-center gap-1 rounded-full px-1" style={{ background: privateMode ? "#3b3b3b" : T.input, border: `1px solid ${edit !== null ? T.accent : "transparent"}` }}>
      {r.kind !== "newtab" && (
        <button type="button" aria-label="View site information" title="View site information" onClick={onInfo} className="flex h-6 items-center gap-1 rounded-full px-2 text-[11.5px] hover:bg-[var(--w-hover)]" style={{ color: unsafe || !secure ? "#c42b1c" : undefined }}>
          <G n={unsafe ? "warn" : secure ? "padlock" : "warn"} s={14} />
          {(!secure || unsafe) && <span>{unsafe ? "Unsafe" : "Not secure"}</span>}
        </button>
      )}
      <input
        ref={ref}
        aria-label="Address and search bar"
        placeholder="Search or enter web address"
        value={edit ?? shown}
        onFocus={(e) => {
          if (edit === null) setEdit(shown);
          setTimeout(() => e.target.select(), 0);
        }}
        onChange={(e) => setEdit(e.target.value)}
        onBlur={() => setEdit(null)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") {
            go((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).blur();
          }
          if (e.key === "Escape") {
            setEdit(null);
            (e.target as HTMLInputElement).blur();
          }
        }}
        className="h-full min-w-0 flex-1 bg-transparent px-2 text-[12.5px] outline-none"
        style={{ color: privateMode ? "#fff" : T.text }}
      />
      {r.kind !== "newtab" && (
        <button type="button" aria-label={starred ? "Edit favorite for this page" : "Add this page to favorites (Ctrl+D)"} title="Add this page to favorites (Ctrl+D)" onClick={onStar} className="rounded-full p-1 hover:bg-[var(--w-hover)]" style={{ color: starred ? "#0f6cbd" : undefined }}>
          <G n={starred ? "starFill" : "star"} s={15} />
        </button>
      )}
    </div>
  );
}

export function EdgeApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const { startDrag } = useFrame();
  const doc = ctx.doc;
  const priv = w.app === "edgeprivate";
  const { tabs, tab } = useTabs(w);
  const [hover, setHover] = useState<string | null>(null);
  const [info, setInfo] = useState(false);
  const [fav, setFav] = useState(false);
  const url = tab?.url ?? "edge://newtab";
  const r = useMemo(() => resolveUrl(doc, url), [doc, url]);
  const isOn = online(doc);
  const starred = (doc.favorites ?? []).some((f) => f.url === normUrl(url));
  const keysRef = ctx.keys;
  useEffect(() => {
    const handler = (e: React.KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const k = e.key.toLowerCase();
      if (ctrl && !e.shiftKey && k === "t") { ctx.cmd("edge.newTab"); return true; }
      if (ctrl && !e.shiftKey && k === "w") { ctx.cmd("edge.closeTab", url); return true; }
      if (ctrl && !e.shiftKey && k === "d") { setFav(true); return true; }
      if (ctrl && !e.shiftKey && k === "h") { ctx.cmd("edge.pane", "history"); return true; }
      if (ctrl && !e.shiftKey && k === "j") { ctx.cmd("edge.pane", "downloads"); return true; }
      if (ctrl && e.shiftKey && k === "o") { ctx.cmd("edge.pane", "favorites"); return true; }
      if (ctrl && e.shiftKey && k === "n") { ctx.cmd("edge.inPrivate"); return true; }
      if (ctrl && e.shiftKey && k === "b") { ctx.cmd("edge.favBar"); return true; }
      if ((ctrl && k === "l") || (e.altKey && k === "d") || e.key === "F6") { window.dispatchEvent(new Event("w11-edge-address")); return true; }
      if (e.key === "F5" || (ctrl && k === "r")) { ctx.cmd("edge.refresh"); return true; }
      if (e.altKey && e.key === "ArrowLeft") { ctx.cmd("edge.back"); return true; }
      if (e.altKey && e.key === "ArrowRight") { ctx.cmd("edge.forward"); return true; }
      if (ctrl && e.key === "Tab" && tabs.length > 1) {
        const i = tabs.findIndex((t) => t.id === tab?.id);
        const next = tabs[(i + (e.shiftKey ? tabs.length - 1 : 1)) % tabs.length];
        ctx.cmd("edge.tab", next.url);
        return true;
      }
      return false;
    };
    keysRef.current[w.id] = handler;
    return () => {
      delete keysRef.current[w.id];
    };
  }, [ctx, keysRef, w.id, url, tabs, tab]);

  let body: ReactNode;
  if (r.kind === "newtab") body = <NewTabPage privateMode={priv} />;
  else if (r.kind === "edge") body = r.sub.startsWith("settings") ? <EdgeSettings sub={r.sub} /> : r.sub === "history" ? <div className="relative h-full" style={{ background: T.bg }}><HistoryPane onClose={() => ctx.cmd("edge.newTab")} /></div> : r.sub === "downloads" ? <div className="relative h-full" style={{ background: T.bg }}><DownloadsPane onClose={() => ctx.cmd("edge.newTab")} /></div> : <div className="relative h-full" style={{ background: T.bg }}><FavoritesPane currentUrl={url} onClose={() => ctx.cmd("edge.newTab")} /></div>;
  else if (r.kind === "file") body = <FileViewer path={r.path} />;
  else if (!isOn) body = <ErrorPage url={url} offline />;
  else if (r.kind === "search") body = <SearchPage q={r.q} onHover={setHover} />;
  else if (r.kind === "page") body = r.page.unsafe && !tab?.bypass ? <SmartScreen url={url} /> : <PageView page={r.page} onHover={setHover} />;
  else if (r.kind === "cloud") body = tab ? <CloudView cfg={r.cfg} tab={tab} /> : null;
  else body = <ErrorPage url={url} />;

  const at = (e: React.MouseEvent) => {
    const rr = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return { clientX: rr.right - 240, clientY: rr.bottom + 2 };
  };
  const menu = (e: React.MouseEvent) =>
    ctx.menu(at(e), [
      { label: "New tab", icon: "plus", shortcut: "Ctrl+T", onClick: () => ctx.cmd("edge.newTab") },
      { label: "New window", icon: "app", shortcut: "Ctrl+N", disabled: true },
      { label: "New InPrivate window", icon: "inPrivate", shortcut: "Ctrl+Shift+N", onClick: () => ctx.cmd("edge.inPrivate") },
      { sep: true },
      { label: "Zoom          100%", icon: "zoomIn", onClick: () => ctx.cmd("edge.zoom") },
      { sep: true },
      { label: "Favorites", icon: "favorites", shortcut: "Ctrl+Shift+O", onClick: () => ctx.cmd("edge.pane", "favorites") },
      { label: "History", icon: "history", shortcut: "Ctrl+H", onClick: () => ctx.cmd("edge.pane", "history") },
      { label: "Downloads", icon: "download", shortcut: "Ctrl+J", onClick: () => ctx.cmd("edge.pane", "downloads") },
      { label: "Apps", icon: "apps", sub: [{ label: "Install this site as an app", disabled: r.kind !== "page", onClick: () => ctx.cmd("edge.installApp", normUrl(url)) }, { label: "View apps", onClick: () => ctx.cmd("settings.nav", "apps/installed") }] },
      { label: "Extensions", icon: "apps", disabled: true },
      { sep: true },
      { label: "Print", icon: "print", shortcut: "Ctrl+P", disabled: true },
      { label: "Find on page", icon: "search", shortcut: "Ctrl+F", disabled: true },
      { sep: true },
      { label: "Settings", icon: "gear", onClick: () => ctx.cmd("edge.nav", "edge://settings/privacy") },
      { label: "Help and feedback", icon: "info", sub: [{ label: "Help", disabled: true }, { label: "Report unsafe site", icon: "report", onClick: () => { ctx.select(`page:${normUrl(url)}`); ctx.cmd("edge.reportUnsafe"); } }, { label: "About Microsoft Edge", disabled: true }] },
      { label: "Close Microsoft Edge", icon: "close", onClick: () => ctx.cmd("win.close", w.id) },
    ]);
  const favBar = doc.showFavBar || (r.kind === "newtab" && (doc.favorites ?? []).length > 0);
  const barItems = (doc.favorites ?? []).filter((f) => (f.folder ?? "Favorites bar") === "Favorites bar");
  const bg = priv ? "#1f1f1f" : T.bg;
  return (
    <div className="flex h-full flex-col" style={{ background: bg, color: priv ? "#fff" : T.text }}>
      <div className="flex h-10 shrink-0 select-none items-stretch" onMouseDown={startDrag} onDoubleClick={() => ctx.cmd(w.max || w.snap ? "win.restore" : "win.maximize", w.id)}>
        <div className="flex min-w-0 flex-1 items-end gap-0.5 pl-2">
          {priv && <span className="mb-2 mr-1 rounded bg-[#0f6cbd] px-2 py-0.5 text-[11px] text-white">InPrivate</span>}
          {tabs.map((t) => {
            const act = t.id === tab?.id;
            return (
              <div
                key={t.id}
                role="tab"
                aria-selected={act}
                aria-label={pageTitle(doc, t.url)}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => !act && ctx.cmd("edge.tab", t.url)}
                onAuxClick={(e) => e.button === 1 && ctx.cmd("edge.closeTab", t.url)}
                className="group flex h-[32px] min-w-[60px] max-w-[220px] flex-1 cursor-default items-center gap-2 rounded-t-lg px-2.5 text-[12px]"
                style={{ background: act ? (priv ? "#3b3b3b" : T.panel) : "transparent" }}
              >
                <G n={resolveUrl(doc, t.url).kind === "page" && (resolveUrl(doc, t.url) as { page: WebPage }).page.unsafe ? "warn" : "globe"} s={13} />
                <span className="min-w-0 flex-1 truncate">{pageTitle(doc, t.url)}</span>
                <button type="button" aria-label={`Close tab ${pageTitle(doc, t.url)}`} title="Close tab (Ctrl+W)" onClick={(e) => { e.stopPropagation(); ctx.cmd("edge.closeTab", t.url); }} className="rounded p-0.5 hover:bg-[var(--w-press)]"><G n="close" s={10} /></button>
              </div>
            );
          })}
          <button type="button" aria-label="New tab" title="New tab (Ctrl+T)" onMouseDown={(e) => e.stopPropagation()} onClick={() => ctx.cmd("edge.newTab")} className="mb-1.5 rounded p-1 hover:bg-[var(--w-hover)]"><G n="plus" s={14} /></button>
          <span className="flex-1" />
        </div>
        <Caption private={priv} />
      </div>
      <div className="flex h-10 shrink-0 items-center gap-1 px-2" style={{ background: priv ? "#3b3b3b" : T.panel }}>
        <button type="button" aria-label="Back" title="Back (Alt+Left arrow)" disabled={!(tab?.back ?? []).length && !tab?.file && !tab?.cloud} onClick={() => ctx.cmd("edge.back")} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="back" s={16} /></button>
        <button type="button" aria-label="Forward" title="Forward (Alt+Right arrow)" disabled={!(tab?.fwd ?? []).length} onClick={() => ctx.cmd("edge.forward")} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="forward" s={16} /></button>
        <button type="button" aria-label="Refresh" title="Refresh (Ctrl+R)" onClick={() => ctx.cmd("edge.refresh")} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="refresh" s={16} /></button>
        {tab && (
          <AddressBar
            tab={tab}
            privateMode={priv}
            starred={starred}
            onInfo={() => {
              setInfo((i) => !i);
              ctx.cmd("edge.siteInfo");
            }}
            onStar={() => setFav(true)}
          />
        )}
        <button type="button" aria-label="Favorites" title="Favorites (Ctrl+Shift+O)" onClick={() => ctx.cmd("edge.pane", "favorites")} className="rounded p-1.5 hover:bg-[var(--w-hover)]" style={{ background: w.pane === "favorites" ? T.press : undefined }}><G n="favorites" s={16} /></button>
        <button type="button" aria-label="History" title="History (Ctrl+H)" onClick={() => ctx.cmd("edge.pane", "history")} className="rounded p-1.5 hover:bg-[var(--w-hover)]" style={{ background: w.pane === "history" ? T.press : undefined }}><G n="history" s={16} /></button>
        <button type="button" aria-label="Downloads" title="Downloads (Ctrl+J)" onClick={() => ctx.cmd("edge.pane", "downloads")} className="relative rounded p-1.5 hover:bg-[var(--w-hover)]" style={{ background: w.pane === "downloads" ? T.press : undefined }}>
          <G n="download" s={16} />
          {(doc.downloads ?? []).some((d) => d.status === "warn") && <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-[#c42b1c]" />}
        </button>
        <Avatar name={userName(doc)} s={24} />
        <button type="button" aria-label="Settings and more" title="Settings and more (Alt+F)" onClick={menu} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="more" s={16} /></button>
      </div>
      {favBar && (
        <div className="flex h-7 shrink-0 items-center gap-1 px-3 text-[11.5px]" style={{ background: priv ? "#3b3b3b" : T.panel, borderBottom: `1px solid ${T.line}` }}>
          {barItems.length === 0 && <span style={{ color: T.sub }}>For quick access, place your favorites here on the favorites bar.</span>}
          {barItems.map((f) => (
            <button key={f.url} type="button" aria-label={f.name} onClick={() => ctx.cmd("edge.nav", f.url)} className="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-[var(--w-hover)]"><G n="globe" s={12} /> <span className="max-w-[120px] truncate">{f.name}</span></button>
          ))}
          {(doc.favFolders ?? []).map((f) => (
            <button key={f} type="button" aria-label={f} onClick={(e) => ctx.menu(e, (doc.favorites ?? []).filter((x) => x.folder === f).map((x) => ({ label: x.name, icon: "globe", onClick: () => ctx.cmd("edge.nav", x.url) })).concat((doc.favorites ?? []).some((x) => x.folder === f) ? [] : [{ label: "(Empty)", icon: "", onClick: () => undefined }]))} className="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-[var(--w-hover)]"><FileArt kind="folder" s={13} /> {f}</button>
          ))}
        </div>
      )}
      <div className="relative min-h-0 flex-1" style={{ background: "#fff" }}>
        {body}
        {hover && <div className="pointer-events-none absolute bottom-0 left-0 z-[110] max-w-[70%] truncate rounded-tr border border-[#ccc] bg-[#f3f3f3] px-2 py-0.5 text-[11px] text-[#333]">{hover}</div>}
        {w.pane === "favorites" && <FavoritesPane currentUrl={normUrl(url)} onClose={() => ctx.cmd("edge.pane", "none")} />}
        {w.pane === "history" && <HistoryPane onClose={() => ctx.cmd("edge.pane", "none")} />}
        {w.pane === "downloads" && <DownloadsPane onClose={() => ctx.cmd("edge.pane", "none")} />}
        {fav && r.kind !== "newtab" && <FavoriteFlyout url={normUrl(url)} onClose={() => setFav(false)} />}
        {info && r.kind !== "newtab" && <SiteInfo url={url} secure={r.kind === "page" ? r.page.secure !== false && !r.page.unsafe : true} onClose={() => setInfo(false)} />}
      </div>
    </div>
  );
}

/** Cloud hosts available in this sim (for Start/search). */
export const cloudHosts = (doc: WinDoc) => clouds(doc).map((c) => c.host);
export type { WinCtxValue };
