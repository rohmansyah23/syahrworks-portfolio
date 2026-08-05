"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Languages, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getData, getDictionary, type Locale } from "@/lib/i18n";
import Wordmark from "@/components/ui/Wordmark";

/** true setelah hidrasi (client) — tanpa setState dalam effect. */
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function ThemeToggle({ lang }: { lang: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();
  const t = getDictionary(lang);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-sm border border-border" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? t.themeLight : t.themeDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function LanguageSwitcher({
  lang,
  className,
}: {
  lang: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const t = getDictionary(lang);
  const target: Locale = lang === "en" ? "id" : "en";
  const rest = pathname.replace(new RegExp(`^/${lang}`), "") || "/";
  const href = `/${target}${rest === "/" ? "" : rest}`;

  return (
    <Link
      href={href}
      aria-label={target === "en" ? t.switchToEnglish : t.switchToIndonesian}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-sm border border-border px-3 font-mono text-xs tracking-widest text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground",
        className
      )}
    >
      <Languages className="h-3.5 w-3.5" />
      {target.toUpperCase()}
    </Link>
  );
}

export default function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = getDictionary(lang);
  const main = getData(lang).main.main;

  const navItems = [
    { href: `/${lang}`, label: t.navHome },
    { href: `/${lang}/about`, label: t.navAbout },
    { href: `/${lang}/journey`, label: t.navJourney },
    { href: `/${lang}/blog`, label: t.navBlog },
    { href: `/${lang}/projects`, label: t.navProjects },
  ];

  // Kunci scroll saat drawer terbuka + tutup dengan tombol Escape
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container-editorial flex h-16 items-center justify-between">
          <Link
            href={`/${lang}`}
            className="font-serif text-xl tracking-tight text-foreground transition-opacity duration-200 hover:opacity-70"
          >
            <Wordmark lang={lang} />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active =
                item.href === `/${lang}`
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-sm px-3.5 py-2 text-sm transition-colors duration-200",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="ml-3 flex items-center gap-2">
              <LanguageSwitcher lang={lang} />
              <ThemeToggle lang={lang} />
            </div>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle lang={lang} />
            <button
              type="button"
              aria-label={t.openMenu}
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-200 hover:border-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer mobile — di luar <header> agar `fixed` benar-benar relatif ke viewport
          (anak dari elemen yang punya backdrop-filter akan "terperangkap" dalam kotak header) */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col overflow-y-auto overscroll-contain border-l border-border bg-background p-6 transition-transform duration-200",
            open
              ? "translate-x-0"
              : "pointer-events-none translate-x-full opacity-0"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl tracking-tight">
              <Wordmark lang={lang} />
            </span>
            <button
              type="button"
              aria-label={t.closeMenu}
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-200 hover:border-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                item.href === `/${lang}`
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border py-3.5 text-base transition-colors duration-200",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6">
            <LanguageSwitcher lang={lang} className="w-full justify-center" />
          </div>
          <p className="micro-label mt-auto text-muted-foreground">
            © {new Date().getFullYear()} {main.name}
          </p>
        </div>
      </div>
    </>
  );
}
