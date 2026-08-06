"use client";

import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function CVDialog({
  lang,
  resumeUrl,
}: {
  lang: Locale;
  resumeUrl: string;
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <FileText className="h-4 w-4" />
          {t.aboutCvButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Curriculum Vitae</DialogTitle>
          <DialogDescription>{t.aboutCvDialogDescription}</DialogDescription>
        </DialogHeader>
        <iframe
          src={resumeUrl}
          title="Curriculum Vitae"
          className="hidden h-[65vh] w-full rounded-sm border border-border bg-muted md:block"
        />
        <div className="md:hidden">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t.aboutCvMobileHint}
          </p>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]"
          >
            {t.aboutOpenNewTab}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="hidden justify-end md:flex">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 border border-border px-5 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground"
          >
            {t.aboutOpenNewTab}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
