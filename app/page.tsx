import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import GetInTouch from "@/components/home/GetInTouch";
import TechStack from "@/components/home/TechStack";
import TopRepos from "@/components/home/TopRepos";
import LatestBlogs from "@/components/home/LatestBlogs";
import ContactForm from "@/components/home/ContactForm";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <GetInTouch />
      <TechStack />
      <TopRepos />
      <LatestBlogs />
      <ContactForm />
    </>
  );
}
