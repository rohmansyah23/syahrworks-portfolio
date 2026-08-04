import type { Metadata } from "next";
import Timeline from "@/components/journey/Timeline";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: pageMetadata.journey.title,
  description: pageMetadata.journey.description,
};

export default function JourneyPage() {
  return (
    <div className="container-editorial py-20 sm:py-28">
      <p className="micro-label text-accent">01 — JOURNEY</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
        The road so far.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Pengalaman kerja, pendidikan, sertifikasi BNSP, dan perjalanan kompetisi
        — disusun secara kronologis. Filter berdasarkan kategori di bawah.
      </p>

      <div className="mt-14">
        <Timeline />
      </div>
    </div>
  );
}
