interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      {description && (
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}
