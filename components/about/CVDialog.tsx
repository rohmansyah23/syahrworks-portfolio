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

export default function CVDialog({ resumeUrl }: { resumeUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <FileText className="h-4 w-4" />
          View CV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Curriculum Vitae</DialogTitle>
          <DialogDescription>
            Dokumen disimpan di Google Drive — bisa juga dibuka di tab baru.
          </DialogDescription>
        </DialogHeader>
        <iframe
          src={resumeUrl.replace("/view", "/preview")}
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
            Open in new tab
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
