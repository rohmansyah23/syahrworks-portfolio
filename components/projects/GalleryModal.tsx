"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function GalleryModal({
  lang,
  open,
  onOpenChange,
  title,
  image,
  alt,
}: {
  lang: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  image: string;
  alt: string;
}) {
  const t = getDictionary(lang);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-4 sm:p-5">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t.galleryFullView.replace("{alt}", alt)}
          </DialogDescription>
        </DialogHeader>
        <Image
          src={image}
          alt={alt}
          width={1920}
          height={1080}
          className="w-full rounded-sm border border-border object-cover"
        />
      </DialogContent>
    </Dialog>
  );
}
