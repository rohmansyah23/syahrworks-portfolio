import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import GetInTouch from "@/components/home/GetInTouch";
import TechStack from "@/components/home/TechStack";
import PinnedRepos from "@/components/home/PinnedRepos";
import LatestBlogs from "@/components/home/LatestBlogs";
import ContactForm from "@/components/home/ContactForm";
import { getData, resolveLang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = await resolveLang(params);
  const page = getData(lang).site.pageMetadata.home;
  return { title: page.title, description: page.description };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const lang = await resolveLang(params);

  return (
    <>
      <HeroSection lang={lang} />
      <GetInTouch lang={lang} />
      <TechStack lang={lang} />
      <PinnedRepos lang={lang} />
      <LatestBlogs lang={lang} />
      <ContactForm lang={lang} />
    </>
  );
}
