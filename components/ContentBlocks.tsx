import { ContentBlock } from "@/types/lesson";
import KnowledgeCheck from "./KnowledgeCheck";

/**
 * Renders one ContentBlock.
 *
 * Both the Lesson Notes and the Challenge sections route through here, so a
 * callout or worked example placed in a challenge renders the same way it does
 * in the lesson body. (Previously the challenge had its own smaller switch and
 * silently dropped any block type it did not list.)
 */
export function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-gray-700 leading-relaxed">{block.text}</p>;

    case "image":
      return (
        <figure>
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="rounded-xl border border-gray-200 shadow-sm"
          />
          {block.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      return block.ordered ? (
        <ol
          start={block.start}
          className="list-decimal pl-6 space-y-3 text-gray-700 marker:font-semibold marker:text-primary-600"
        >
          {block.items?.map((item, i) => (
            <li key={i} className="leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc pl-6 space-y-3 text-gray-700 marker:text-primary-500">
          {block.items?.map((item, i) => (
            <li key={i} className="leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const styles = {
        info: "bg-blue-50 border-blue-400",
        warning: "bg-yellow-50 border-yellow-400",
        success: "bg-green-50 border-green-400",
        version: "bg-violet-50 border-violet-400",
      } as const;
      return (
        <div
          className={`p-4 rounded-xl border-l-4 text-gray-800 leading-relaxed ${
            styles[block.variant]
          }`}
        >
          {block.variant === "version" && (
            <span className="block text-xs font-semibold uppercase tracking-wide text-violet-700 mb-1">
              Microsoft 365 & Office 2024
            </span>
          )}
          {block.text}
        </div>
      );
    }

    case "tip":
      return (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl text-gray-800 leading-relaxed">
          <span aria-hidden="true">💡 </span>
          {block.text}
        </div>
      );

    case "code":
      return (
        <pre className="bg-gray-900 text-green-300 p-4 rounded-xl overflow-x-auto text-sm">
          <code>{block.code}</code>
        </pre>
      );

    case "download":
      return (
        <a
          href={block.url}
          download
          className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Download: {block.name}
        </a>
      );

    case "scenario":
      return (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <span className="block text-xs font-semibold uppercase tracking-wide text-amber-800 mb-2">
            On the job
          </span>
          {block.title && (
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              {block.title}
            </h4>
          )}
          {block.role && (
            <p className="text-sm font-medium text-amber-900 mb-2">
              {block.role}
            </p>
          )}
          <p className="text-gray-800 leading-relaxed">{block.text}</p>
          {block.task && (
            <p className="mt-3 pt-3 border-t border-amber-200 text-gray-900">
              <span className="font-semibold">Your task: </span>
              {block.task}
            </p>
          )}
        </div>
      );

    case "worked-example":
      return (
        <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-6">
          <span className="block text-xs font-semibold uppercase tracking-wide text-primary-700 mb-2">
            Worked example
          </span>
          <h4 className="text-lg font-bold text-gray-900 mb-1">{block.title}</h4>
          <p className="text-gray-700 leading-relaxed mb-5">{block.task}</p>

          <ol className="space-y-4">
            {block.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{step.move}</p>
                  <p className="text-gray-600 leading-relaxed mt-1">
                    {step.why}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-5 pt-4 border-t border-primary-200 text-gray-800">
            <span className="font-semibold">Result: </span>
            {block.result}
          </p>
          {block.takeaway && (
            <p className="mt-2 text-gray-900 font-medium">
              <span aria-hidden="true">🔑 </span>
              {block.takeaway}
            </p>
          )}
        </div>
      );

    case "key-terms":
      return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
            Key terms
          </h4>
          <dl className="space-y-3">
            {block.terms.map((t, i) => (
              <div key={i} className="sm:flex sm:gap-4">
                <dt className="font-semibold text-gray-900 sm:w-48 sm:flex-shrink-0">
                  {t.term}
                </dt>
                <dd className="text-gray-700 leading-relaxed">{t.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case "table":
      return (
        <figure>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {block.columns.map((col, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="even:bg-gray-50/50">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="px-4 py-3 text-gray-700 border-b border-gray-100 align-top leading-relaxed"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "knowledge-check":
      return <KnowledgeCheck block={block} />;

    default:
      return null;
  }
}

/** Renders a list of blocks with consistent vertical rhythm. */
export function BlockList({
  blocks,
  className = "space-y-6",
}: {
  blocks: ContentBlock[];
  className?: string;
}) {
  return (
    <div className={className}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
