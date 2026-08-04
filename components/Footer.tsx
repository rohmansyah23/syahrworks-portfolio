import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { main } from "@/data/main";
import { socials } from "@/data/socials";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/journey", label: "Journey" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

const contactLinks = main.getInTouch.filter((item) =>
  ["Location", "Email", "WhatsApp"].includes(item.label)
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-editorial grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-foreground transition-opacity duration-200 hover:opacity-70"
          >
            {main.logo}
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {main.tagline}
          </p>
        </div>

        {/* Navigations */}
        <div>
          <h3 className="micro-label text-muted-foreground">Navigations</h3>
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
          <h3 className="micro-label text-muted-foreground">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
            {contactLinks.map((item) =>
              item.label === "Location" ? (
                <li key={item.label}>{item.value}</li>
              ) : (
                <li key={item.label}>
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
          <h3 className="micro-label text-muted-foreground">Social</h3>
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
            Built with Next.js &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
