"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { JourneyItem } from "@/lib/types";

export default function CertificateModal({
  item,
  open,
  onOpenChange,
}: {
  item: JourneyItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-4 sm:p-6">
        <DialogHeader className="pr-8">
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription className="font-mono text-xs uppercase tracking-widest">
            {item.subtitle}
            {item.caption ? ` · ${item.caption}` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="border border-border bg-muted p-2 sm:p-3">
          <div className="border border-border bg-background">
            <Image
              src={item.image ?? ""}
              alt={item.title}
              width={item.imageWidth ?? 2000}
              height={item.imageHeight ?? 2979}
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="block h-auto w-full object-contain sm:mx-auto sm:h-auto sm:max-h-[80vh] sm:w-auto"
            />
          </div>
        </div>

        {item.description && item.description.length > 0 && (
          <ul className="space-y-2">
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
          <div className="flex flex-wrap gap-1.5">
            {item.tools.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
