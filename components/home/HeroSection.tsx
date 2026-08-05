import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { getData, getDictionary, localePath, type Locale } from "@/lib/i18n";

export default function HeroSection({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const data = getData(lang);
  const main = data.main.main;
  const projectsCount = data.projects.projects.length;
  const certsCount = data.journey.journey.filter(
    (j) => j.type === "Certification"
  ).length;

  const isId = lang === "id";

  return (
    <section className="border-b border-border">
      <div className="container-editorial py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Kolom Kiri — Teks & CTA */}
          <div className="lg:col-span-7">
            <p className="micro-label text-accent">01 — {t.homeLabel}</p>

            <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {main.name}
            </h1>

            <p className="mt-4 font-mono text-sm tracking-wide text-muted-foreground">
              {main.titles.join(" · ")}
            </p>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              {main.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={localePath(lang, "/journey")}
                className="inline-flex h-11 items-center gap-2 bg-foreground px-6 text-sm font-medium text-background transition-all duration-200 hover:opacity-85 active:scale-[0.98]"
              >
                {t.heroViewProjects}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={localePath(lang, "/about")}
                className="inline-flex h-11 items-center gap-2 border border-border px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground active:scale-[0.98]"
              >
                {t.heroAboutMe}
              </Link>
              <a
                href="#get-in-touch"
                className="inline-flex h-11 items-center gap-2 px-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {t.heroGetInTouch}
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Kolom Kanan — Editorial Profile Card & Spec Sheet */}
          <div className="lg:col-span-5">
            <div className="group relative border border-border bg-card p-3 transition-colors duration-300 hover:border-foreground/40">
              {/* Top Status Bar */}
              <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5 px-1">
                <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  {isId ? "Tersedia untuk Proyek" : "Available for Projects"}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  Jakarta, ID
                </span>
              </div>

              {/* Terminal Code Snippet (Pengganti Foto) */}
              <div className="relative overflow-hidden border border-border/60 bg-muted/40 font-mono text-xs">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-border/60 bg-muted/60 px-3 py-2 text-[0.65rem] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="ml-2 font-mono text-foreground/80">
                      developer.ts
                    </span>
                  </div>
                  <span className="text-muted-foreground/60">TypeScript</span>
                </div>

                {/* Body Snippet */}
                <div className="p-4 overflow-x-auto leading-relaxed">
                  <pre className="text-foreground/90 font-mono text-[0.72rem] leading-6">
                    <code>
                      <span className="text-accent font-semibold">const</span>{" "}
                      <span className="text-foreground">developer</span>:{" "}
                      <span className="text-accent">Profile</span> = &#123;
                      {"\n"}  <span className="text-muted-foreground">name</span>:{" "}
                      <span className="text-foreground font-medium">&quot;Muhammad Rohman Syah&quot;</span>,
                      {"\n"}  <span className="text-muted-foreground">role</span>:{" "}
                      <span className="text-foreground font-medium">&quot;Full-Stack & Mobile&quot;</span>,
                      {"\n"}  <span className="text-muted-foreground">location</span>:{" "}
                      <span className="text-foreground font-medium">&quot;Jakarta, ID&quot;</span>,
                      {"\n"}  <span className="text-muted-foreground">status</span>:{" "}
                      <span className="text-accent font-medium">
                        &quot;{isId ? "Tersedia untuk Proyek" : "Available for Work"}&quot;
                      </span>,
                      {"\n"}  <span className="text-muted-foreground">stack</span>: [
                      {"\n"}    <span className="text-foreground">&quot;Next.js&quot;</span>, <span className="text-foreground">&quot;React&quot;</span>, <span className="text-foreground">&quot;TypeScript&quot;</span>,
                      {"\n"}    <span className="text-foreground">&quot;Flutter&quot;</span>, <span className="text-foreground">&quot;Go&quot;</span>, <span className="text-foreground">&quot;PHP&quot;</span>
                      {"\n"}  ],
                      {"\n"}  <span className="text-muted-foreground">certifications</span>:{" "}
                      <span className="text-accent">3</span> <span className="text-muted-foreground/60">// BNSP</span>
                      {"\n"}&#125;;
                    </code>
                  </pre>
                </div>
              </div>

              {/* Spec Sheet Grid */}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 font-mono text-[0.65rem]">
                <div className="border border-border/50 bg-background/50 p-2.5">
                  <p className="uppercase tracking-wider text-muted-foreground">
                    {isId ? "Rilis" : "Shipped"}
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {projectsCount}+ {isId ? "Proyek" : "Projects"}
                  </p>
                </div>
                <div className="border border-border/50 bg-background/50 p-2.5">
                  <p className="uppercase tracking-wider text-muted-foreground">
                    {isId ? "Sertifikasi" : "Certified"}
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {certsCount}× BNSP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
