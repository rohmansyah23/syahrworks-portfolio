import { Badge } from "@/components/ui/badge";
import { formatPeriod } from "@/lib/utils";
import type { JourneyItem } from "@/lib/types";

export default function TimelineItem({
  item,
  isLast,
}: {
  item: JourneyItem;
  isLast?: boolean;
}) {
  return (
    <div className="relative pl-8 sm:pl-10">
      {/* Titik pada garis */}
      <span className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full border border-accent bg-background" />
      </span>
      {!isLast && (
        <span className="absolute left-[5px] top-5 h-full w-px bg-border" />
      )}

      <div className="border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="micro-label text-accent">
              {formatPeriod(item.startDate, item.endDate)}
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-tight tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {item.subtitle}
            </p>
            {item.caption && (
              <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                {item.caption}
              </p>
            )}
          </div>
        </div>

        {item.description && (
          <ul className="mt-4 space-y-2">
            {item.description.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
              >
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                {d}
              </li>
            ))}
          </ul>
        )}

        {item.tools && item.tools.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {item.tools.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
