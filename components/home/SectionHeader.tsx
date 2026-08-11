import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeader({
  index,
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      <p className="micro-label text-accent">
        {index} / {label}
      </p>
      <h2 className="mt-3 font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
