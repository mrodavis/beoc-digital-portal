import { DataFigure as DataFigureType } from "@/types/eng0300";

/**
 * A figure rendered two ways at once: horizontal bars for quick visual reading,
 * and a real data table underneath carrying the same values.
 *
 * The bars are decorative (aria-hidden) because the table already conveys the
 * data to assistive technology, and horizontal bars keep long category labels
 * readable on a phone without rotating text.
 */
export default function DataFigure({ figure }: { figure: DataFigureType }) {
  const numericValues = figure.rows.map((row) => Number(row.values[0]) || 0);
  const max = Math.max(...numericValues, 1);
  const showBars = figure.kind === "bar";

  return (
    <figure className="my-6 rounded-xl border border-eng-navy-200 bg-white p-4 sm:p-6">
      <figcaption className="mb-4">
        <span className="block text-sm font-semibold uppercase tracking-wide text-eng-teal-700">
          Figure
        </span>
        <span className="mt-1 block text-base font-bold text-eng-navy-900">
          {figure.title}
        </span>
      </figcaption>

      {showBars && (
        <div className="mb-6 space-y-3" aria-hidden="true">
          {figure.rows.map((row, index) => {
            const value = numericValues[index];
            const width = Math.max((value / max) * 100, 2);
            return (
              <div key={row.label}>
                <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium text-eng-navy-800">{row.label}</span>
                  <span className="font-bold tabular-nums text-eng-navy-900">
                    {value}
                    {figure.unit ?? ""}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-eng-navy-100">
                  <div
                    className="h-full rounded-full bg-eng-teal-600"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* The accessible, authoritative version of the same data. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[18rem] border-collapse text-sm">
          <caption className="sr-only">{figure.summary}</caption>
          <thead>
            <tr className="border-b-2 border-eng-navy-200 text-left">
              {figure.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="py-2 pr-4 font-semibold text-eng-navy-800"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {figure.rows.map((row) => (
              <tr key={row.label} className="border-b border-eng-navy-100">
                <th
                  scope="row"
                  className="py-2 pr-4 text-left font-medium text-eng-navy-800"
                >
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={index}
                    className="py-2 pr-4 tabular-nums text-eng-navy-700"
                  >
                    {value}
                    {typeof value === "number" ? figure.unit ?? "" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {figure.sourceNote && (
        <p className="mt-4 text-xs italic text-eng-navy-400">{figure.sourceNote}</p>
      )}
    </figure>
  );
}
