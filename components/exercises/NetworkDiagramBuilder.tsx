"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadStudentName, printResults, saveStudentName } from "@/lib/printResults";

/**
 * Network Diagram Builder (Tech Foundations, "Designing a Simple SOHO Network").
 *
 * Students drag equipment and devices from the parts bin onto a board, drop
 * each device into the zone for its network segment, draw cables (and Wi-Fi
 * and VPN links) between them, set the router's rules for what each segment
 * may reach, and check the design against the lesson's second-location brief.
 *
 * Works with a mouse, a finger (pointer events) and the keyboard: every part
 * and node is a button, so "pick" (click/Enter) then "place" (click the board,
 * or Enter on a zone button) does the same thing as dragging, and in Connect
 * mode clicking two nodes in turn connects them.
 *
 * Board coordinates are 1000 x 700 units; the board scales to its container.
 */

type Kind = "internet" | "office" | "modem" | "router" | "switch" | "ap" | "ws" | "printer" | "laptop" | "phone" | "fridge" | "thermostat" | "camera" | "door";
type Zone = "core" | "clinical" | "staff" | "guest" | "iot";
type Seg = Exclude<Zone, "core">;
type Node = { id: string; kind: Kind; label: string; x: number; y: number };
type Link = { a: string; b: string };
type Reach = Record<Seg, Record<string, boolean>>;
type State = { nodes: Node[]; links: Link[]; reach: Reach };

const W = 1000;
const H = 700;
const CORE_H = 190;
const NODE_W = 92;
const NODE_H = 40;

const PARTS: { kind: Kind; label: string; count: number; group: "Equipment" | "Devices" | "IoT" }[] = [
  { kind: "modem", label: "Modem", count: 1, group: "Equipment" },
  { kind: "router", label: "Router / firewall", count: 1, group: "Equipment" },
  { kind: "switch", label: "Switch", count: 1, group: "Equipment" },
  { kind: "ap", label: "Access point", count: 2, group: "Equipment" },
  { kind: "ws", label: "Workstation", count: 8, group: "Devices" },
  { kind: "printer", label: "Printer", count: 2, group: "Devices" },
  { kind: "laptop", label: "Staff laptop", count: 2, group: "Devices" },
  { kind: "phone", label: "Patient phone", count: 1, group: "Devices" },
  { kind: "fridge", label: "Fridge monitor", count: 1, group: "IoT" },
  { kind: "thermostat", label: "Thermostat", count: 1, group: "IoT" },
  { kind: "camera", label: "Lobby camera", count: 1, group: "IoT" },
  { kind: "door", label: "Door controller", count: 1, group: "IoT" },
];

const ICON: Record<Kind, string> = {
  internet: "🌐",
  office: "🏢",
  modem: "📶",
  router: "🛡️",
  switch: "🔀",
  ap: "📡",
  ws: "🖥️",
  printer: "🖨️",
  laptop: "💻",
  phone: "📱",
  fridge: "🌡️",
  thermostat: "🔥",
  camera: "📷",
  door: "🚪",
};

const SEGS: { id: Seg; label: string; color: string; bg: string }[] = [
  { id: "clinical", label: "Clinical (wired)", color: "#1d4ed8", bg: "#eff6ff" },
  { id: "staff", label: "Staff wireless", color: "#047857", bg: "#ecfdf5" },
  { id: "guest", label: "Guest wireless", color: "#b45309", bg: "#fffbeb" },
  { id: "iot", label: "IoT", color: "#7c3aed", bg: "#f5f3ff" },
];
const DESTS: { id: string; label: string }[] = [
  { id: "internet", label: "Internet" },
  { id: "clinical", label: "Clinical" },
  { id: "staff", label: "Staff wireless" },
  { id: "guest", label: "Guest wireless" },
  { id: "iot", label: "IoT" },
  { id: "office", label: "Main office (VPN)" },
];

const EQUIPMENT: Kind[] = ["modem", "router", "switch", "ap"];
const WIRELESS: Kind[] = ["laptop", "phone"];
const IOT: Kind[] = ["fridge", "thermostat", "camera", "door"];

const FIXED: Node[] = [
  { id: "internet", kind: "internet", label: "Internet (ISP line)", x: 20, y: 20 },
  { id: "office", kind: "office", label: "Main office", x: W - NODE_W - 20, y: 20 },
];

function flatReach(): Reach {
  const r = {} as Reach;
  for (const s of SEGS) r[s.id] = Object.fromEntries(DESTS.map((d) => [d.id, true]));
  return r;
}

const EMPTY: State = { nodes: FIXED, links: [], reach: flatReach() };
const STORE = "beoc-network-builder-v1";

function zoneAt(x: number, y: number): Zone {
  const cy = y + NODE_H / 2;
  if (cy < CORE_H) return "core";
  const cx = x + NODE_W / 2;
  return SEGS[Math.max(0, Math.min(3, Math.floor(cx / (W / 4))))].id;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const same = (l: Link, a: string, b: string) => (l.a === a && l.b === b) || (l.a === b && l.b === a);

function linkKind(nodes: Node[], l: Link): "cable" | "wifi" | "vpn" {
  const ka = nodes.find((n) => n.id === l.a)?.kind;
  const kb = nodes.find((n) => n.id === l.b)?.kind;
  if (ka === "office" || kb === "office") return "vpn";
  if ((ka === "ap" && kb && kb !== "switch" && kb !== "router") || (kb === "ap" && ka && ka !== "switch" && ka !== "router")) return "wifi";
  return "cable";
}

type Check = { label: string; ok: boolean; fix: string };

function runChecks(s: State): Check[] {
  const { nodes, links, reach } = s;
  const of = (k: Kind) => nodes.filter((n) => n.kind === k);
  const nb = (id: string) => links.filter((l) => l.a === id || l.b === id).map((l) => (l.a === id ? l.b : l.a));
  const kindOf = (id: string) => nodes.find((n) => n.id === id)?.kind;
  const linkedTo = (id: string, kinds: Kind[]) => nb(id).some((o) => kinds.includes(kindOf(o) as Kind));
  const modem = of("modem")[0];
  const router = of("router")[0];
  const sw = of("switch")[0];
  const aps = of("ap");
  const zone = (n: Node) => zoneAt(n.x, n.y);
  const allIn = (k: Kind[], z: Zone, n: number) => {
    const list = nodes.filter((x) => k.includes(x.kind));
    return list.length === n && list.every((x) => zone(x) === z);
  };
  const others = (seg: Seg) => DESTS.filter((d) => d.id !== seg && d.id !== "internet");
  return [
    {
      label: "The internet line connects to the modem",
      ok: !!modem && nb("internet").length === 1 && kindOf(nb("internet")[0]) === "modem",
      fix: "Place the modem and draw one cable from Internet (ISP line) to it. Nothing else plugs into the provider's line.",
    },
    {
      label: "The modem connects only to the internet line and the router",
      ok: !!modem && !!router && linkedTo(modem.id, ["router"]) && nb(modem.id).length === 2,
      fix: "Cable the modem to the router, and to nothing else. The router is the boundary where separation is enforced.",
    },
    {
      label: "The router connects to the switch",
      ok: !!router && !!sw && links.some((l) => same(l, router.id, sw.id)),
      fix: "Place the switch and cable it to the router.",
    },
    {
      label: "The router links to the main office over a VPN",
      ok: !!router && links.some((l) => same(l, router.id, "office")),
      fix: "Connect the router to Main office. The link runs as an encrypted VPN over the internet.",
    },
    {
      label: "All 8 workstations are on the Clinical segment, cabled to the switch",
      ok: allIn(["ws"], "clinical", 8) && of("ws").every((n) => sw && links.some((l) => same(l, n.id, sw.id))),
      fix: "Drop all eight workstations in the Clinical (wired) zone and cable each one to the switch. Workstations that never move should be wired.",
    },
    {
      label: "Both printers are on the Clinical segment, cabled to the switch",
      ok: allIn(["printer"], "clinical", 2) && of("printer").every((n) => sw && links.some((l) => same(l, n.id, sw.id))),
      fix: "Drop both printers in the Clinical (wired) zone and cable them to the switch.",
    },
    {
      label: "Every access point is cabled to the switch or router",
      ok: aps.length >= 1 && aps.every((a) => linkedTo(a.id, ["switch", "router"])),
      fix: "Place the access points in the top band and cable each one to the switch (or the router).",
    },
    {
      label: "Staff laptops are on Staff wireless, connected to an access point",
      ok: allIn(["laptop"], "staff", 2) && of("laptop").every((n) => linkedTo(n.id, ["ap"])),
      fix: "Drop both staff laptops in the Staff wireless zone and connect each to an access point.",
    },
    {
      label: "The patient phone is on Guest wireless, connected to an access point",
      ok: allIn(["phone"], "guest", 1) && of("phone").every((n) => linkedTo(n.id, ["ap"])),
      fix: "Drop the patient phone in the Guest wireless zone and connect it to an access point.",
    },
    {
      label: "All 4 IoT devices are on the IoT segment, connected to the switch or an access point",
      ok: allIn(IOT, "iot", 4) && nodes.filter((n) => IOT.includes(n.kind)).every((n) => linkedTo(n.id, ["switch", "ap"])),
      fix: "Drop the fridge monitor, thermostat, camera, and door controller in the IoT zone, and connect each to the switch or an access point.",
    },
    {
      label: "Guest wireless can reach the internet only",
      ok: reach.guest.internet && others("guest").every((d) => !reach.guest[d.id]),
      fix: "In the router rules, the Guest wireless row should allow Internet and nothing else.",
    },
    {
      label: "IoT cannot reach Clinical, Staff wireless, or the main office",
      ok: !reach.iot.clinical && !reach.iot.staff && !reach.iot.office,
      fix: "In the router rules, clear Clinical, Staff wireless, and Main office on the IoT row. A hacked thermostat must not reach patient records.",
    },
    {
      label: "Clinical can reach the main office",
      ok: reach.clinical.office,
      fix: "In the router rules, the Clinical row needs Main office (VPN) so staff can reach the main office's systems.",
    },
  ];
}

export default function NetworkDiagramBuilder() {
  const [s, setS] = useState<State>(EMPTY);
  const [mode, setMode] = useState<"move" | "connect">("move");
  const [picked, setPicked] = useState<Kind | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [ghost, setGhost] = useState<{ x: number; y: number; label: string } | null>(null);
  const [rubber, setRubber] = useState<{ x: number; y: number } | null>(null);
  const [checks, setChecks] = useState<Check[] | null>(null);
  const [name, setName] = useState("");
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{ type: "part"; kind: Kind; moved: boolean } | { type: "node"; id: string; dx: number; dy: number; moved: boolean } | { type: "wire"; id: string } | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE);
      if (raw) {
        const v = JSON.parse(raw) as State;
        if (v && Array.isArray(v.nodes) && Array.isArray(v.links) && v.reach) setS(v);
      }
    } catch {
      /* storage blocked: start fresh */
    }
    setName(loadStudentName());
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORE, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  const used = useMemo(() => {
    const m: Partial<Record<Kind, number>> = {};
    for (const n of s.nodes) m[n.kind] = (m[n.kind] ?? 0) + 1;
    return m;
  }, [s.nodes]);
  const left = (k: Kind) => (PARTS.find((p) => p.kind === k)?.count ?? 0) - (used[k] ?? 0);

  const toBoard = (clientX: number, clientY: number) => {
    const r = board.current?.getBoundingClientRect();
    if (!r) return null;
    const x = ((clientX - r.left) / r.width) * W;
    const y = ((clientY - r.top) / r.height) * H;
    if (x < 0 || y < 0 || x > W || y > H) return null;
    return { x, y };
  };
  const nodeAt = (x: number, y: number) => [...s.nodes].reverse().find((n) => x >= n.x && x <= n.x + NODE_W && y >= n.y && y <= n.y + NODE_H);

  const change = (fn: (p: State) => State) => {
    setS(fn);
    setChecks(null);
  };

  const place = (kind: Kind, x: number, y: number) => {
    if (left(kind) <= 0) return;
    const part = PARTS.find((p) => p.kind === kind)!;
    const nth = (used[kind] ?? 0) + 1;
    const label = part.count > 1 ? `${part.label} ${nth}` : part.label;
    const id = `${kind}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    change((p) => ({ ...p, nodes: [...p.nodes, { id, kind, label, x: clamp(x - NODE_W / 2, 0, W - NODE_W), y: clamp(y - NODE_H / 2, 0, H - NODE_H) }] }));
    setSel(id);
    if (left(kind) <= 1) setPicked(null);
  };

  const toggleLink = (a: string, b: string) => {
    if (a === b) return;
    change((p) => (p.links.some((l) => same(l, a, b)) ? { ...p, links: p.links.filter((l) => !same(l, a, b)) } : { ...p, links: [...p.links, { a, b }] }));
  };

  const removeNode = (id: string) => {
    if (id === "internet" || id === "office") return;
    change((p) => ({ ...p, nodes: p.nodes.filter((n) => n.id !== id), links: p.links.filter((l) => l.a !== id && l.b !== id) }));
    setSel(null);
  };

  /* ---------------- pointer handling ---------------- */

  const onPartDown = (e: React.PointerEvent, kind: Kind) => {
    if (left(kind) <= 0) return;
    drag.current = { type: "part", kind, moved: false };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onNodeDown = (e: React.PointerEvent, n: Node) => {
    e.stopPropagation();
    const p = toBoard(e.clientX, e.clientY);
    if (!p) return;
    if (mode === "connect") {
      drag.current = { type: "wire", id: n.id };
      setRubber(p);
    } else {
      drag.current = { type: "node", id: n.id, dx: p.x - n.x, dy: p.y - n.y, moved: false };
    }
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    if (d.type === "part") {
      d.moved = true;
      setGhost({ x: e.clientX, y: e.clientY, label: PARTS.find((p) => p.kind === d.kind)!.label });
      return;
    }
    const p = toBoard(e.clientX, e.clientY);
    if (!p) return;
    if (d.type === "node") {
      d.moved = true;
      setS((prev) => ({ ...prev, nodes: prev.nodes.map((n) => (n.id === d.id ? { ...n, x: clamp(p.x - d.dx, 0, W - NODE_W), y: clamp(p.y - d.dy, 0, H - NODE_H) } : n)) }));
      setChecks(null);
    } else if (d.type === "wire") {
      setRubber(p);
    }
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    setGhost(null);
    setRubber(null);
    if (!d) return;
    const p = toBoard(e.clientX, e.clientY);
    if (d.type === "part") {
      if (d.moved && p) place(d.kind, p.x, p.y);
      else if (!d.moved) setPicked((cur) => (cur === d.kind ? null : d.kind));
      return;
    }
    if (d.type === "node") {
      if (!d.moved) setSel(d.id);
      return;
    }
    if (d.type === "wire") {
      const target = p ? nodeAt(p.x, p.y) : undefined;
      if (target && target.id !== d.id) {
        toggleLink(d.id, target.id);
        setFrom(null);
      } else if (!target || target.id === d.id) {
        // A tap without dragging: click-click connecting.
        if (from && from !== d.id) {
          toggleLink(from, d.id);
          setFrom(null);
        } else setFrom(from === d.id ? null : d.id);
      }
    }
  };
  const onBoardClick = (e: React.MouseEvent) => {
    if (!picked) {
      setSel(null);
      return;
    }
    const p = toBoard(e.clientX, e.clientY);
    if (p) place(picked, p.x, p.y);
  };

  /** Keyboard / no-drag placement: put the picked part in a zone's next free spot. */
  const placeInZone = (z: Zone) => {
    if (!picked) return;
    const col = z === "core" ? null : SEGS.findIndex((x) => x.id === z);
    const inZone = s.nodes.filter((n) => zoneAt(n.x, n.y) === z).length;
    if (col === null) place(picked, 140 + (inZone % 7) * 105 + NODE_W / 2, 75 + Math.floor(inZone / 7) * 55 + NODE_H / 2);
    else place(picked, col * 250 + 22 + (inZone % 2) * 108 + NODE_W / 2, CORE_H + 40 + Math.floor(inZone / 2) * 52 + NODE_H / 2);
  };

  const nodeById = (id: string) => s.nodes.find((n) => n.id === id);
  const center = (n: Node) => ({ x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 });
  const passed = checks ? checks.filter((c) => c.ok).length : 0;
  const allOk = !!checks && passed === checks.length;

  const print = () => {
    const c = checks ?? runChecks(s);
    saveStudentName(name.trim());
    const count = (z: Seg) => s.nodes.filter((n) => !EQUIPMENT.includes(n.kind) && n.kind !== "internet" && n.kind !== "office" && zoneAt(n.x, n.y) === z).map((n) => n.label);
    printResults({
      kind: "Network Diagram Builder",
      title: "Lakeside second location network design",
      studentName: name.trim(),
      summary: c.every((x) => x.ok) ? `All ${c.length} design checks passed` : `${c.filter((x) => x.ok).length} of ${c.length} design checks passed`,
      rows: [
        ...c.map((x) => ({ label: x.label, value: x.ok ? "passed" : "not yet", ok: x.ok })),
        ...SEGS.map((g) => ({ label: `${g.label}: ${count(g.id).join(", ") || "(empty)"}`, value: `reaches: ${DESTS.filter((d) => d.id !== g.id && s.reach[g.id][d.id]).map((d) => d.label).join(", ") || "nothing"}` })),
        { label: `Connections: ${s.links.length} (${s.links.filter((l) => linkKind(s.nodes, l) === "cable").length} cable, ${s.links.filter((l) => linkKind(s.nodes, l) === "wifi").length} Wi-Fi, ${s.links.filter((l) => linkKind(s.nodes, l) === "vpn").length} VPN)`, value: "" },
      ],
      note: "Built in the BEOC Digital Network Diagram Builder. Checked against the second-location brief: eight workstations, two printers, staff and guest wireless, four IoT devices, and a link to the main office.",
    });
  };

  const selNode = sel ? nodeById(sel) : undefined;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md" onPointerMove={onMove} onPointerUp={onUp}>
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary-700">Network Diagram Builder</div>
      <h3 className="mb-1 text-xl font-bold text-gray-900">Design Lakeside&apos;s second location</h3>
      <p className="mb-3 text-sm text-gray-700">
        The brief: eight workstations, two printers, staff wireless, patient wireless in the waiting room, four IoT devices, and a link to the main office. Drag each part onto the board: equipment goes in the top band, and each device goes in the zone for its network segment. Then switch to <b>Connect</b> and drag from one part to another to run a cable (to an access point it becomes Wi-Fi; to Main office, a VPN). Set the router rules, then select <b>Check my design</b>.
      </p>

      {/* Parts bin */}
      <div className="mb-3 flex flex-wrap gap-1.5" aria-label="Parts bin">
        {PARTS.map((p) => {
          const n = left(p.kind);
          return (
            <button
              key={p.kind}
              type="button"
              aria-label={`${p.label}, ${n} left${picked === p.kind ? ", picked" : ""}`}
              aria-pressed={picked === p.kind}
              disabled={n <= 0}
              onPointerDown={(e) => onPartDown(e, p.kind)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPicked((cur) => (cur === p.kind ? null : p.kind));
                }
              }}
              className={`flex touch-none select-none items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[13px] font-medium ${picked === p.kind ? "border-primary-600 bg-primary-50 text-primary-800 ring-2 ring-primary-300" : "border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100"} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <span aria-hidden="true">{ICON[p.kind]}</span>
              {p.label}
              <span className="rounded bg-white px-1 text-[11px] text-gray-500">×{n}</span>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[13px]">
        <div className="inline-flex overflow-hidden rounded-lg border border-gray-300" role="group" aria-label="Tool">
          <button type="button" aria-pressed={mode === "move"} onClick={() => { setMode("move"); setFrom(null); }} className={`px-3 py-1.5 font-semibold ${mode === "move" ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}>
            Move
          </button>
          <button type="button" aria-pressed={mode === "connect"} onClick={() => { setMode("connect"); setPicked(null); }} className={`px-3 py-1.5 font-semibold ${mode === "connect" ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}>
            Connect
          </button>
        </div>
        {picked && (
          <span className="flex flex-wrap items-center gap-1 text-gray-700">
            Place <b>{PARTS.find((p) => p.kind === picked)?.label}</b>: click the board, or
            {(["core", ...SEGS.map((x) => x.id)] as Zone[]).map((z) => (
              <button key={z} type="button" onClick={() => placeInZone(z)} className="rounded border border-gray-300 px-2 py-0.5 hover:bg-gray-100">
                {z === "core" ? "Top band" : SEGS.find((x) => x.id === z)?.label}
              </button>
            ))}
          </span>
        )}
        {mode === "connect" && <span className="text-gray-600">{from ? `Now pick the part to connect to ${nodeById(from)?.label}.` : "Drag from one part to another (or click one, then the other). Connecting an existing pair removes the link."}</span>}
        {selNode && mode === "move" && selNode.kind !== "internet" && selNode.kind !== "office" && (
          <button type="button" onClick={() => removeNode(selNode.id)} className="rounded border border-red-300 px-2 py-1 text-red-700 hover:bg-red-50">
            Remove {selNode.label}
          </button>
        )}
        <span className="flex-1" />
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Clear the board and start over?")) {
              change(() => EMPTY);
              setSel(null);
              setFrom(null);
            }
          }}
          className="rounded border border-gray-300 px-2.5 py-1 text-gray-700 hover:bg-gray-100"
        >
          Start over
        </button>
      </div>

      {/* Board */}
      <div
        ref={board}
        aria-label="Network diagram board"
        onClick={onBoardClick}
        className="relative w-full touch-none select-none overflow-hidden rounded-xl border-2 border-gray-300 bg-white"
        style={{ aspectRatio: `${W} / ${H}`, cursor: picked ? "copy" : "default" }}
      >
        {/* Zones */}
        <div className="absolute left-0 right-0 top-0 border-b-2 border-dashed border-gray-300 bg-slate-50" style={{ height: `${(CORE_H / H) * 100}%` }}>
          <span className="absolute bottom-1 left-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Network equipment</span>
        </div>
        {SEGS.map((g, i) => (
          <div key={g.id} className="absolute border-l border-gray-200" style={{ left: `${i * 25}%`, width: "25%", top: `${(CORE_H / H) * 100}%`, bottom: 0, background: g.bg }}>
            <span className="absolute left-2 top-1 text-[11px] font-bold uppercase tracking-wider" style={{ color: g.color }}>
              {g.label}
            </span>
          </div>
        ))}

        {/* Links */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          {s.links.map((l) => {
            const a = nodeById(l.a);
            const b = nodeById(l.b);
            if (!a || !b) return null;
            const k = linkKind(s.nodes, l);
            const p = center(a);
            const q = center(b);
            return <line key={`${l.a}-${l.b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={k === "vpn" ? "#0f766e" : k === "wifi" ? "#2563eb" : "#334155"} strokeWidth={k === "cable" ? 2.2 : 2} strokeDasharray={k === "wifi" ? "6 5" : k === "vpn" ? "2 4" : undefined} vectorEffect="non-scaling-stroke" />;
          })}
          {rubber && drag.current?.type === "wire" && (() => {
            const a = nodeById(drag.current.id);
            if (!a) return null;
            const p = center(a);
            return <line x1={p.x} y1={p.y} x2={rubber.x} y2={rubber.y} stroke="#2563eb" strokeWidth={2} strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />;
          })()}
        </svg>

        {/* Nodes */}
        {s.nodes.map((n) => {
          const z = zoneAt(n.x, n.y);
          const g = SEGS.find((x) => x.id === z);
          const active = sel === n.id || from === n.id;
          return (
            <button
              key={n.id}
              type="button"
              aria-label={`${n.label}${n.kind === "internet" || n.kind === "office" ? "" : z === "core" ? ", in the equipment band" : `, on ${g?.label}`}`}
              onPointerDown={(e) => onNodeDown(e, n)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (mode === "connect") {
                    if (from && from !== n.id) {
                      toggleLink(from, n.id);
                      setFrom(null);
                    } else setFrom(from === n.id ? null : n.id);
                  } else setSel(n.id);
                } else if ((e.key === "Delete" || e.key === "Backspace") && mode === "move") removeNode(n.id);
              }}
              className={`absolute flex touch-none items-center gap-1 overflow-hidden rounded-md border-2 bg-white px-1.5 text-left text-[11px] font-semibold leading-tight text-gray-900 shadow-sm ${active ? "ring-2 ring-amber-400" : ""}`}
              style={{
                left: `${(n.x / W) * 100}%`,
                top: `${(n.y / H) * 100}%`,
                width: `${(NODE_W / W) * 100}%`,
                height: `${(NODE_H / H) * 100}%`,
                borderColor: n.kind === "internet" || n.kind === "office" ? "#0f766e" : z === "core" ? "#475569" : g?.color,
                cursor: mode === "connect" ? "crosshair" : "grab",
              }}
            >
              <span aria-hidden="true" className="text-[15px]">{ICON[n.kind]}</span>
              <span className="min-w-0 flex-1 truncate">{n.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex flex-wrap gap-4 text-[12px] text-gray-600" aria-hidden="true">
        <span><span className="mr-1 inline-block h-0.5 w-6 bg-slate-700 align-middle" />Cable</span>
        <span><span className="mr-1 inline-block w-6 border-t-2 border-dashed border-blue-600 align-middle" />Wi-Fi</span>
        <span><span className="mr-1 inline-block w-6 border-t-2 border-dotted border-teal-700 align-middle" />VPN</span>
      </div>

      {/* Router rules */}
      <div className="mt-4">
        <h4 className="mb-1 font-bold text-gray-900">Router rules: what each segment may reach</h4>
        <p className="mb-2 text-[13px] text-gray-600">Every box starts checked: that is the vendor&apos;s flat network, where everything can reach everything. Clear what each segment should not reach.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="border-b border-gray-200 p-1.5 text-left">From ↓ / To →</th>
                {DESTS.map((d) => (
                  <th key={d.id} className="border-b border-gray-200 p-1.5 text-center font-semibold">{d.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SEGS.map((g) => (
                <tr key={g.id}>
                  <th className="border-b border-gray-100 p-1.5 text-left" style={{ color: g.color }}>{g.label}</th>
                  {DESTS.map((d) => (
                    <td key={d.id} className="border-b border-gray-100 p-1.5 text-center">
                      {d.id === g.id ? (
                        <span className="text-gray-400" title="Devices on a segment can always reach each other">—</span>
                      ) : (
                        <input
                          type="checkbox"
                          aria-label={`${g.label} may reach ${d.label}`}
                          checked={!!s.reach[g.id][d.id]}
                          onChange={(e) => change((p) => ({ ...p, reach: { ...p.reach, [g.id]: { ...p.reach[g.id], [d.id]: e.target.checked } } }))}
                          className="h-4 w-4"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Check */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setChecks(runChecks(s))} className="rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">
          Check my design
        </button>
        {checks && (
          <span className={`font-semibold ${allOk ? "text-emerald-700" : "text-amber-700"}`}>
            {allOk ? `All ${checks.length} checks passed.` : `${passed} of ${checks.length} checks passed.`}
          </span>
        )}
      </div>
      {checks && (
        <ul className="mt-3 space-y-1.5 text-[13px]">
          {checks.map((c) => (
            <li key={c.label} className="flex gap-2">
              <span className={c.ok ? "text-emerald-600" : "text-amber-600"} aria-hidden="true">{c.ok ? "✓" : "●"}</span>
              <span className="flex-1">
                <span className="text-gray-900">{c.label}</span>
                {!c.ok && <span className="block text-gray-600">{c.fix}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
      {allOk && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-[13px] text-emerald-900">
          Your design separates the network by trust level: patients&apos; phones and the IoT devices cannot reach the workstations holding patient records, and the two offices are linked over an encrypted VPN. Now write the justification, single point of failure, and documentation parts of the Challenge.
        </div>
      )}
      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <label className="mb-1 block text-[12px] font-semibold text-gray-700" htmlFor="netbuilder-name">
          Your name (for your results page)
        </label>
        <div className="flex flex-wrap gap-2">
          <input id="netbuilder-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-[13px] text-gray-900 outline-none focus:border-blue-500" />
          <button type="button" onClick={print} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[13px] font-semibold text-gray-800 hover:bg-gray-100">
            Print or save results
          </button>
        </div>
        <p className="mt-1 text-[11px] text-gray-500">Your board is saved in this browser, so you can come back to it.</p>
      </div>

      {ghost && (
        <div className="pointer-events-none fixed z-50 rounded-md border-2 border-primary-500 bg-white px-2 py-1 text-[12px] font-semibold shadow-lg" style={{ left: ghost.x + 8, top: ghost.y + 8 }}>
          {ghost.label}
        </div>
      )}
    </div>
  );
}
