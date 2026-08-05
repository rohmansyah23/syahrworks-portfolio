import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";
import { getData, resolveLang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = await resolveLang(params);
  const page = getData(lang).site.pageMetadata.about;
  return { title: page.title, description: page.description };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const lang = await resolveLang(params);

  return (
    <>
      <AboutSection lang={lang} />
    </>
  );
}
