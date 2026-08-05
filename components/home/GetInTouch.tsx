import { ArrowUpRight } from "lucide-react";
import { getData, getDictionary, type Locale } from "@/lib/i18n";
import SectionHeader from "@/components/home/SectionHeader";
import { cn } from "@/lib/utils";

export default function GetInTouch({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const main = getData(lang).main.main;

  return (
    <section id="get-in-touch" className="scroll-mt-20 border-b border-border">
      <div className="container-editorial py-14 sm:py-20">
        <SectionHeader
          index="02"
          label={t.getInTouchLabel}
          title={t.getInTouchTitle}
          description={t.getInTouchDescription}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}
