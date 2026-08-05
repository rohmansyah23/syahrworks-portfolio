import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { getData, getDictionary, localePath, type Locale } from "@/lib/i18n";

export default function HeroSection({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const main = getData(lang).main.main;

  return (
    <section className="border-b border-border">
      <div className="container-editorial py-14 sm:py-20">
        <p className="micro-label text-accent">01 — {t.homeLabel}</p>

        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {main.name}
        </h1>

        <p className="mt-4 font-mono text-sm tracking-wide text-muted-foreground">
          {main.titles.join(" · ")}
        </p>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {main.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
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
          <Link
            href="#get-in-touch"
            className="inline-flex h-11 items-center gap-2 px-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {t.heroGetInTouch}
            <ArrowDown className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
