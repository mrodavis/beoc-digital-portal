interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-[40px] sm:leading-[1.05]">{title}</h2>
      {description && <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
