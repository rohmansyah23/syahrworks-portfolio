"use client";

import { useState } from "react";
import { journey, journeyTypes } from "@/data/journey";
import TimelineItem from "@/components/journey/TimelineItem";
import { cn } from "@/lib/utils";

type Tab = (typeof journeyTypes)[number];

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<Tab>("Full-Time");

  // Hanya tampilkan kategori yang punya data; otomatis muncul saat data ditambahkan
  const tabs: Tab[] = journeyTypes.filter((type) =>
    journey.some((item) => item.type === type)
  );

  const filtered = journey
    .filter((item) => item.type === activeTab)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <div>
      {/* Tabs filter */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200",
              activeTab === tab
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-12 space-y-8">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Belum ada data untuk kategori ini.
          </p>
        ) : (
          filtered.map((item, i) => (
            <TimelineItem
              key={item.slug}
              item={item}
              isLast={i === filtered.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
