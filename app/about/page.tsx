import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
    </>
  );
}
