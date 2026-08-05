import { ArrowUpRight } from "lucide-react";
import { getData, getDictionary, type Locale } from "@/lib/i18n";
import SectionHeader from "@/components/home/SectionHeader";
import { cn } from "@/lib/utils";

export default function GetInTouch({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const main = getData(lang).main.main;

  return (
    <section id="get-in-touch" className="scroll-mt-16 border-b border-border">
      <div className="container-editorial py-14 sm:py-20">
        <SectionHeader
          index="02"
          label={t.getInTouchLabel}
          title={t.getInTouchTitle}
          description={t.getInTouchDescription}
        />

        <div>
          {/* LAYAR MOBILE (<640px): Editorial Hairline List */}
          <div className="divide-y divide-border border-y border-border sm:hidden">
            {main.getInTouch.map((item, idx) => {
              const isCTA = item.cta === true;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={cn(
                    "group flex items-center justify-between px-3 py-4 transition-colors duration-200",
                    isCTA
                      ? "bg-accent/10 hover:bg-accent/15"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="font-mono text-xs text-muted-foreground/60 shrink-0">
                      0{idx + 1}
                    </span>
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors duration-200",
                        isCTA
                          ? "text-accent"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "micro-label text-[0.65rem]",
                          isCTA ? "text-accent font-semibold" : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-sm font-medium truncate",
                          isCTA ? "text-foreground font-semibold" : "text-foreground"
                        )}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0",
                      isCTA ? "text-accent opacity-100" : "text-foreground"
                    )}
                  />
                </a>
              );
            })}
          </div>

          {/* LAYAR TABLET & DESKTOP (≥640px): Standard Box Cards Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {main.getInTouch.map((item) => {
              const isCTA = item.cta === true;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={cn(
                    "group flex flex-col justify-between gap-8 p-6 transition-colors duration-200 sm:p-7",
                    isCTA
                      ? "border border-foreground bg-foreground text-background hover:bg-foreground/90"
                      : "border border-border bg-background hover:bg-muted"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      isCTA
                        ? "text-background/70 group-hover:text-background"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <div>
                    <p
                      className={cn(
                        "micro-label",
                        isCTA ? "text-background/70" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </p>
                    <p
                      className={cn(
                        "mt-2 flex items-center gap-1.5 text-sm font-medium",
                        isCTA ? "text-background" : "text-foreground"
                      )}
                    >
                      {item.value}
                      <ArrowUpRight
                        className={cn(
                          "h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                          isCTA ? "text-background" : ""
                        )}
                      />
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
