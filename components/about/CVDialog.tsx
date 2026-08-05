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
          className="h-[65vh] w-full rounded-sm border border-border bg-muted"
        />
        <div className="flex justify-end">
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
