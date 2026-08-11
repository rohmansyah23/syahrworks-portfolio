import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { websiteJsonLd } from "@/lib/seo";
import {
  getData,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import "../globals.css";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  // Soft-404 guard: segmen [lang] dengan nilai invalid harus 404, bukan fallback.
  if (!raw || !isLocale(raw)) notFound();
  const lang: Locale = raw;
  const data = getData(lang);
  const meta = data.site.siteMetadata;

  return {
    metadataBase: new URL(meta.siteUrl),
    title: {
      default: meta.title,
      template: "%s | SyahrWorks",
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: meta.author, url: meta.siteUrl }],
    openGraph: {
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      url: meta.siteUrl,
      title: meta.title,
      description: meta.description,
      siteName: "SyahrWorks",
      images: [
        { url: meta.ogImage, width: 1200, height: 630, alt: meta.author },
      ],
    },
    twitter: {
      // og:image sudah 1200×630 — pakai summary_large_image agar gambar tampil besar.
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage],
      creator: meta.twitterHandle,
    },
    robots: { index: true, follow: true },
    verification: {
      google: "XwwdKNvthYP9Cxubcnhzhlqakn7dAaQ-vLgF2A1agO4",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}>) {
  const { lang: raw } = await params;
  // Soft-404 guard: segmen [lang] dengan nilai invalid harus 404, bukan fallback.
  if (!raw || !isLocale(raw)) notFound();
  const lang: Locale = raw;

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${instrument.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <JsonLd data={websiteJsonLd(lang)} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}
