import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { socials } from "@/data/socials";
import { getData, getDictionary, type Locale } from "@/lib/i18n";
import Wordmark from "@/components/ui/Wordmark";

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const main = getData(lang).main.main;
  const year = new Date().getFullYear();

  const navLinks = [
    { href: `/${lang}`, label: t.navHome },
    { href: `/${lang}/about`, label: t.navAbout },
    { href: `/${lang}/journey`, label: t.navJourney },
    { href: `/${lang}/blog`, label: t.navBlog },
    { href: `/${lang}/projects`, label: t.navProjects },
  ];

  // Contact footer: Lokasi (teks polos), Email & WhatsApp (link)
  const contactLinks = main.getInTouch.filter(
    (item) =>
      !item.cta &&
      ["maps.google.com", "mailto:", "wa.me"].some((k) =>
        item.href.includes(k)
      )
  );

  return (
    <footer className="border-t border-border">
      <div className="container-editorial grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href={`/${lang}`}
            aria-label="SyahrWorks Home"
            className="inline-flex items-center gap-3 font-serif text-2xl sm:text-3xl tracking-tight text-foreground transition-opacity duration-200 hover:opacity-85"
          >
            <img
              src="/logo-light.svg"
              alt="SyahrWorks"
              className="h-9 w-9 object-contain dark:hidden"
            />
            <img
              src="/logo-dark.svg"
              alt="SyahrWorks"
              className="h-9 w-9 object-contain hidden dark:block"
            />
            <Wordmark lang={lang} />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {main.tagline}
          </p>
        </div>

        {/* Navigations */}
        <div>
          <h3 className="micro-label text-muted-foreground">
            {t.footerNavigations}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="micro-label text-muted-foreground">
            {t.footerContact}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
            {contactLinks.map((item) =>
              item.href.includes("maps.google.com") ? (
                <li key={item.href}>{item.value}</li>
              ) : (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    {item.value}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="micro-label text-muted-foreground">
            {t.footerSocial}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-editorial flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="micro-label text-muted-foreground">
            © {year} {main.name}
          </p>
          <p className="micro-label text-muted-foreground">
            {t.footerBuiltWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
