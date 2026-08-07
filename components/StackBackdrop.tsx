import { techStack } from "@/data/techStack";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

const SIZES = [
  "h-[clamp(2.5rem,4vw,4rem)] w-[clamp(2.5rem,4vw,4rem)]",   // Small: 40px - 64px
  "h-[clamp(3.5rem,5.5vw,5.5rem)] w-[clamp(3.5rem,5.5vw,5.5rem)]", // Medium: 56px - 88px
  "h-[clamp(4.5rem,7vw,6.5rem)] w-[clamp(4.5rem,7vw,6.5rem)]",   // Large: 72px - 104px
] as const;

// 13 ikon diurutkan berdasarkan level penguasaan (terkuat pertama) —
// masing-masing menempati 1 posisi di POSITIONS dengan hierarki: terkuat di tengah-besar
const BACKDROP_ICONS = new Set([
  "Next.js",
  "TypeScript",
  "Flutter",
  "Go",
  "PHP",
  "PostgreSQL",
  "Supabase",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Git",
  "Vercel",
]);

// Posisi hierarkis: inti (besar, tengah) → ring sedang → tepi (kecil)
const POSITIONS: { x: number; y: number; size: number; rotate: number }[] = [
  { x: 36, y: 45, size: 2, rotate: -4 }, // 1 Next.js
  { x: 63, y: 40, size: 2, rotate: 5 }, // 2 TypeScript
  { x: 50, y: 62, size: 2, rotate: -3 }, // 3 Flutter
  { x: 20, y: 30, size: 1, rotate: 3 }, // 4 Go
  { x: 80, y: 28, size: 1, rotate: -6 }, // 5 PHP
  { x: 24, y: 70, size: 1, rotate: 4 }, // 6 PostgreSQL
  { x: 76, y: 72, size: 1, rotate: -5 }, // 7 Supabase
  { x: 50, y: 16, size: 1, rotate: 2 }, // 8 React
  { x: 84, y: 50, size: 1, rotate: -2 }, // 9 Tailwind CSS
  { x: 8, y: 10, size: 0, rotate: -5 }, // 10 Node.js
  { x: 88, y: 12, size: 0, rotate: 5 }, // 11 Python
  { x: 8, y: 86, size: 0, rotate: -3 }, // 12 Git
  { x: 88, y: 88, size: 0, rotate: 3 }, // 13 Vercel
];

export default function StackBackdrop() {
  const iconByName = new Map(
    techStack.flatMap((group) => group.items).map((item) => [item.name, item.icon])
  );
  const items = [...BACKDROP_ICONS]
    .map((name) => ({ name, icon: iconByName.get(name) }))
    .filter(
      (item): item is { name: string; icon: IconType } => item.icon !== undefined
    );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden text-muted-foreground/5"
    >
      {items.map((item, i) => {
        const p = POSITIONS[i % POSITIONS.length];
        return (
          <item.icon
            key={item.name}
            className={cn("absolute", SIZES[p.size])}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}