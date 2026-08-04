"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { main } from "@/data/main";

/** true setelah hidrasi (client) — tanpa setState dalam effect. */
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/journey", label: "Journey" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  if (!mounted) {
    return <div className="h-10 w-10 rounded-sm border border-border" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Kunci scroll saat drawer terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-foreground transition-opacity duration-200 hover:opacity-70"
        >
          {main.logo}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
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
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-200 hover:border-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
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
            "absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col border-l border-border bg-background p-6 transition-transform duration-200",
            open
              ? "translate-x-0"
              : "pointer-events-none translate-x-full opacity-0"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl tracking-tight">
              {main.logo}
            </span>
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-200 hover:border-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
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
          <p className="micro-label mt-auto text-muted-foreground">
            © {new Date().getFullYear()} {main.name}
          </p>
        </div>
      </div>
    </header>
  );
}
