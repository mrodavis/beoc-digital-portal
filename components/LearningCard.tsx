import Link from "next/link";

interface LearningCardProps {
  title: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  icon: string;
}

export default function LearningCard({
  title,
  description,
  href,
  status,
  icon,
}: LearningCardProps) {
  const isAvailable = status === "available";

  const CardContent = () => (
    <div
      className={`
        bg-white rounded-xl shadow-md border border-gray-200 p-6 h-full
        ${isAvailable ? "card-hover cursor-pointer" : "opacity-75 cursor-not-allowed"}
      `}
    >
      {/* Icon */}
      <div className="text-5xl mb-4">{icon}</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

      {/* Status Badge */}
      <div className="flex items-center gap-2">
        {isAvailable ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Available Now
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );

  if (isAvailable) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
