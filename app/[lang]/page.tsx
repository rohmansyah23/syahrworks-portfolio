import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import GetInTouch from "@/components/home/GetInTouch";
import TechStack from "@/components/home/TechStack";
import PinnedRepos from "@/components/home/PinnedRepos";
import LatestBlogs from "@/components/home/LatestBlogs";
import ContactForm from "@/components/home/ContactForm";
import JsonLd from "@/components/JsonLd";
import { getData, resolveLang } from "@/lib/i18n";
import { pageAlternates, pageOpenGraph, personJsonLd } from "@/lib/seo";
import { getVisitorCount } from "@/lib/counter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = await resolveLang(params);
  const page = getData(lang).site.pageMetadata.home;
  return {
    // absolute: title beranda sudah lengkap (nama + role), jangan kena template "%s | SyahrWorks".
    title: { absolute: page.title },
    description: page.description,
    alternates: pageAlternates(lang, "/"),
    openGraph: pageOpenGraph(lang, "/", page.title, page.description),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const lang = await resolveLang(params);
  const visitorCount = await getVisitorCount();

  return (
    <>
      <JsonLd data={personJsonLd(lang)} />
      <HeroSection lang={lang} visitorCount={visitorCount} />
      <GetInTouch lang={lang} />
      <TechStack lang={lang} />
      <PinnedRepos lang={lang} />
      <LatestBlogs lang={lang} />
      <ContactForm lang={lang} />
    </>
  );
}
