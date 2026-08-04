import Image from "next/image";
import { about } from "@/data/about";
import { main } from "@/data/main";
import { projects } from "@/data/projects";
import { journey } from "@/data/journey";
import CVDialog from "@/components/about/CVDialog";

// Quick facts untuk kolom foto sticky — dihitung dari data, bukan hardcode
const quickFacts = [
  { label: "Location", value: main.getInTouch[0].value },
  { label: "Projects", value: `${projects.length}+ shipped` },
  {
    label: "Certifications",
    value: `${journey.filter((j) => j.type === "Certification").length}× BNSP`,
  },
  {
    label: "Current",
    value:
      journey.find((j) => j.type === "Full-Time")?.subtitle ?? "—",
  },
];

const sectionMap = [
  {
    key: "philosophy" as const,
    title: "Engineering Philosophy",
    icon: "✳",
  },
  {
    key: "workingStyle" as const,
    title: "Working Style",
    icon: "✦",
  },
  {
    key: "favoriteTech" as const,
    title: "Technologies I Love",
    icon: "❋",
  },
];

export default function AboutSection() {
  return (
    <div className="container-editorial py-20 sm:py-28">
      <p className="micro-label text-accent">01 — ABOUT</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
        A developer who cares about the details.
      </h1>

      <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        {/* Foto sticky */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-border bg-card p-3">
            <Image
              src={about.aboutImage}
              alt="Muhammad Rohman Syah"
              width={640}
              height={640}
              priority
              className="aspect-square w-full object-cover"
            />
          </div>
          <p className="micro-label mt-3 text-muted-foreground">
            &lt; Full-Stack Developer /&gt;
          </p>

          {/* Quick facts — mengisi ruang kosong di bawah foto sticky */}
          <dl className="mt-6 border border-border bg-card">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0"
              >
                <dt className="micro-label text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="text-right font-mono text-xs text-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Konten */}
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {about.intro}
          </p>

          {sectionMap.map((section) => (
            <div key={section.key} className="mt-14">
              <h2 className="flex items-center gap-3 font-serif text-3xl tracking-tight text-foreground">
                <span className="text-accent">{section.icon}</span>
                {section.title}
              </h2>
              <ul className="mt-6 space-y-4">
                {about[section.key].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-l border-border pl-4 text-[0.95rem] leading-relaxed text-foreground/85"
                  >
                    <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <blockquote className="mt-14 border-l-2 border-accent bg-card py-5 pl-6 pr-5">
            <p className="font-serif text-xl italic leading-relaxed text-foreground">
              “{about.quote}”
            </p>
          </blockquote>

          <div className="mt-10">
            <CVDialog resumeUrl={about.resumeUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
