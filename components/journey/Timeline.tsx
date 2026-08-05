"use client";

import { useState } from "react";
import {
  getData,
  getDictionary,
  type Locale,
} from "@/lib/i18n";
import TimelineItem from "@/components/journey/TimelineItem";
import { cn } from "@/lib/utils";

type JourneyType =
  | "Experience"
  | "Full-Time"
  | "Part-Time"
  | "Education"
  | "Certification"
  | "Competition";

const typeLabels: Record<JourneyType, (t: ReturnType<typeof getDictionary>) => string> = {
  Experience: (t) => t.journeyTypeExperience,
  "Full-Time": (t) => t.journeyTypeFullTime,
  "Part-Time": (t) => t.journeyTypePartTime,
  Education: (t) => t.journeyTypeEducation,
  Certification: (t) => t.journeyTypeCertification,
  Competition: (t) => t.journeyTypeCompetition,
};

const isExperienceType = (type: JourneyType) =>
  type === "Full-Time" || type === "Part-Time";

export default function Timeline({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const journeyData = getData(lang).journey;
  const journey = journeyData.journey;
  const journeyTypes = journeyData.journeyTypes;

  const [activeTab, setActiveTab] = useState<JourneyType>("Experience");

  // Hanya tampilkan kategori yang punya data; otomatis muncul saat data ditambahkan
  const tabs: JourneyType[] = journeyTypes.filter((type) =>
    type === "Experience"
      ? journey.some((item) => isExperienceType(item.type))
      : journey.some((item) => item.type === type)
  );

  const filtered = journey
    .filter((item) =>
      activeTab === "Experience"
        ? isExperienceType(item.type)
        : item.type === activeTab
    )
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
            {typeLabels[tab](t)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-12 space-y-8">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t.journeyEmpty}</p>
        ) : (
          filtered.map((item, i) => (
            <TimelineItem
              key={item.slug}
              item={item}
              lang={lang}
              isLast={i === filtered.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
