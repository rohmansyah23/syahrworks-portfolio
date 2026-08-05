import { techStack } from "@/data/techStack";
import { getDictionary, type Locale } from "@/lib/i18n";
import SectionHeader from "@/components/home/SectionHeader";

export default function TechStack({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <section className="border-b border-border">
      <div className="container-editorial py-14 sm:py-20">
        <SectionHeader
          index="03"
          label={t.techStackLabel}
          title={t.techStackTitle}
          description={t.techStackDescription}
        />

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-6">
          {techStack.map((group, gi) => (
            <div
              key={group.group}
              className="border border-border bg-card p-6 sm:p-7"
            >
              <p className="micro-label text-muted-foreground">
                0{gi + 1}.{group.group}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    title={item.name}
                    className="group flex flex-col items-center gap-2"
                  >
                    <item.icon className="h-8 w-8 text-muted-foreground transition-all duration-200 group-hover:scale-110 group-hover:text-foreground" />
                    <span className="text-center font-mono text-[0.65rem] leading-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
