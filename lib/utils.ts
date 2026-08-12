import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/lib/i18n";
import type { BlogPost } from "@/lib/types";

/** Gabungkan class Tailwind dengan resolusi konflik via tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateLocales: Record<Locale, string> = { en: "en-US", id: "id-ID" };

const shortMonths: Record<Locale, string[]> = {
  en: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ],
  id: [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ],
};

const presentLabels: Record<Locale, string> = {
  en: "Present",
  id: "Sekarang",
};

/** Format tanggal "2026-01-01" → "1 Januari 2026" / "January 1, 2026" sesuai locale. */
export function formatDate(dateStr: string, lang: Locale = "en"): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat(dateLocales[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Format periode "2024-01" atau "Present" → "Jan 2024" / "Present" sesuai locale. */
export function formatPeriod(
  start: string,
  end: string,
  lang: Locale = "en"
): string {
  const fmt = (s: string) => {
    if (s.toLowerCase() === "present") return presentLabels[lang];
    const [y, m] = s.split("-").map(Number);
    if (!y || !m) return s;
    return `${shortMonths[lang][m - 1]} ${y}`;
  };
  return `${fmt(start)} — ${fmt(end)}`;
}

/** Urutkan postingan blog: `featured` paling atas, lalu tanggal terbaru → terlama. */
export function sortBlogPosts(a: BlogPost, b: BlogPost): number {
  return (
    Number(b.featured ?? false) - Number(a.featured ?? false) ||
    b.date.localeCompare(a.date)
  );
}
