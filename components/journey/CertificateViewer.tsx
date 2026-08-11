"use client";

import { useState } from "react";
import CertificateModal from "@/components/journey/CertificateModal";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { JourneyItem } from "@/lib/types";

export default function CertificateViewer({
  item,
  lang,
}: {
  item: JourneyItem;
  lang: Locale;
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  if (!item.image) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-accent transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {t.certificationView}
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:transform-none">
          →
        </span>
      </button>
      <CertificateModal
        item={item}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
