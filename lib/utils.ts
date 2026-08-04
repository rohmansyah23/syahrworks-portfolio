import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Gabungkan class Tailwind dengan resolusi konflik via tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format tanggal "2026-01-01" → "1 Januari 2026" (Bahasa Indonesia). */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Format periode "2024-01" atau "Present" → "Jan 2024" / "Present". */
export function formatPeriod(start: string, end: string): string {
  const fmt = (s: string) => {
    if (s.toLowerCase() === "present") return "Present";
    const [y, m] = s.split("-").map(Number);
    if (!y || !m) return s;
    const months = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
    ];
    return `${months[m - 1]} ${y}`;
  };
  return `${fmt(start)} — ${fmt(end)}`;
}
