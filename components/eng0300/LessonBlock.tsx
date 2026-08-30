import { LessonSection } from "@/types/eng0300";

/** Renders the LEARN stage: prose, bullets, reference tables, and callouts. */
export default function LessonBlock({ sections }: { sections: LessonSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <section key={index}>
          <h3 className="mb-3 font-display text-xl font-bold text-eng-navy-900">
            {section.heading}
          </h3>

          {section.paragraphs?.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="mb-3 max-w-[68ch] text-[1.0625rem] leading-[1.75] text-eng-navy-800"
            >
              {paragraph}
            </p>
          ))}

          {section.bullets && (
            <ul className="mb-4 max-w-[68ch] space-y-2">
              {section.bullets.map((bullet, bIndex) => (
                <li
                  key={bIndex}
                  className="flex gap-3 text-[1.0625rem] leading-relaxed text-eng-navy-800"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-eng-teal-600"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {section.table && (
            <div className="my-4 overflow-x-auto rounded-xl border border-eng-navy-200">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead className="bg-eng-navy-50">
                  <tr>
                    {section.table.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-4 py-3 font-semibold text-eng-navy-900"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rIndex) => (
                    <tr
                      key={rIndex}
                      className="border-t border-eng-navy-100 align-top"
                    >
                      {row.map((cell, cIndex) => (
                        <td
                          key={cIndex}
                          className={`px-4 py-3 leading-relaxed ${
                            cIndex === 0
                              ? "font-semibold text-eng-navy-900"
                              : "text-eng-navy-700"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {section.callout && (
            <div className="mt-4 max-w-[68ch] rounded-lg border-l-4 border-eng-gold-500 bg-eng-gold-50 p-4">
              <p className="mb-1 text-sm font-bold uppercase tracking-wide text-eng-gold-700">
                {section.callout.label}
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-eng-navy-800">
                {section.callout.text}
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
