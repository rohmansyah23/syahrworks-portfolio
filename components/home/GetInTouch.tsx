import { ArrowUpRight } from "lucide-react";
import { main } from "@/data/main";
import SectionHeader from "@/components/home/SectionHeader";

export default function GetInTouch() {
  return (
    <section id="get-in-touch" className="border-b border-border">
      <div className="container-editorial py-20 sm:py-28">
        <SectionHeader
          index="02"
          label="Get In Touch"
          title="Let's build something together."
          description="Tertarik berkolaborasi atau punya pertanyaan? Hubungi saya melalui kanal berikut."
        />

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {main.getInTouch.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="group flex flex-col justify-between gap-8 bg-background p-6 transition-colors duration-200 hover:bg-muted sm:p-7"
            >
              <item.icon className="h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
              <div>
                <p className="micro-label text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
                  {item.value}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
