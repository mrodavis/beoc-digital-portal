import type { CellFormat, ExcelCell } from "@/types/sim";
import { cellsIn, numToCol, parseRef } from "@/lib/sim/excel";

/**
 * Small builders for Excel practice workbooks. Everything they return is
 * plain JSON, so sim definitions stay serializable.
 */

export type CellInput = string | number | null | undefined | ExcelCell;

/** Header row look used across the practice files. */
export const HEAD: CellFormat = { bold: true, fill: "#D9E1F2", border: "bottom" };
export const TITLE: CellFormat = { bold: true, size: 14 };
export const MONEY: CellFormat = { numFmt: "Currency" };
export const DATE: CellFormat = { numFmt: "Short Date" };
export const PCT: CellFormat = { numFmt: "Percentage" };

function toCell(v: CellInput, fmt?: CellFormat): ExcelCell | null {
  if (v === null || v === undefined) return fmt ? { fmt } : null;
  if (typeof v === "object") return fmt ? { ...v, fmt: { ...fmt, ...(v.fmt ?? {}) } } : v;
  if (typeof v === "string" && v.startsWith("=")) return fmt ? { f: v, fmt } : { f: v };
  return fmt ? { v, fmt } : { v };
}

/**
 * Lay out rows starting at a cell. `colFmt` formats whole columns by letter
 * (data rows only); `headerFmt` formats the first row when `header` is true.
 */
export function grid(
  at: string,
  rows: CellInput[][],
  opts: { header?: boolean; headerFmt?: CellFormat; colFmt?: Record<string, CellFormat> } = {},
): Record<string, ExcelCell> {
  const p = parseRef(at)!;
  const out: Record<string, ExcelCell> = {};
  rows.forEach((row, i) => {
    row.forEach((v, j) => {
      const col = numToCol(p.c + j);
      const isHead = opts.header && i === 0;
      const fmt = isHead ? opts.headerFmt ?? HEAD : opts.colFmt?.[col];
      const cell = toCell(v, fmt);
      if (cell) out[`${col}${p.r + i}`] = cell;
    });
  });
  return out;
}

/** A formula in each row of a column, with {r} replaced by the row number. */
export function column(col: string, from: number, to: number, formula: string, fmt?: CellFormat): Record<string, ExcelCell> {
  const out: Record<string, ExcelCell> = {};
  for (let r = from; r <= to; r++) out[`${col}${r}`] = fmt ? { f: formula.replace(/\{r\}/g, String(r)), fmt } : { f: formula.replace(/\{r\}/g, String(r)) };
  return out;
}

/** Empty cells that already carry a format (a column waiting for formulas). */
export function fmtOnly(range: string, fmt: CellFormat): Record<string, ExcelCell> {
  const out: Record<string, ExcelCell> = {};
  for (const ref of cellsIn(range)) out[ref] = { fmt };
  return out;
}

/** Excel serial date for a calendar date (46315 = 10/20/2026). */
export function serial(m: number, d: number, y = 2026): number {
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 86400000);
}

/** Every cell address in a range, for "any cell in the data" selection checks. */
export function cells(range: string): string[] {
  return cellsIn(range);
}

/** Cells of one column between two rows ("B", 1, 16 → B1..B16). */
export function colCells(col: string, from: number, to: number): string[] {
  return cellsIn(`${col}${from}:${col}${to}`);
}

