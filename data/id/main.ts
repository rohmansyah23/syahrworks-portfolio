import { MapPin, Mail, MessageCircle, Rocket } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { MainData } from "@/lib/types";

export const main: MainData = {
  name: "Muhammad Rohman Syah",
  logo: "SyahrWorks",
  tagline:
    "Full-stack developer di Jakarta — merancang, membangun, dan meluncurkan produk web & mobile yang cepat, mudah dirawat, dan siap berkembang.",
  titles: [
    "Full-Stack Developer",
    "Next.js & TypeScript",
    "Flutter Developer",
    "Backend Go",
  ],
  getInTouch: [
    {
      label: "Lokasi",
      value: "Jakarta, Indonesia",
      href: "https://maps.google.com/?q=Jakarta,Indonesia",
      icon: MapPin,
    },
    {
      label: "Email",
      value: "syahr642@gmail.com",
      href: "mailto:syahr642@gmail.com",
      icon: Mail,
    },
    {
      label: "GitHub",
      value: "github.com/rohmansyah23",
      href: "https://github.com/rohmansyah23",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      value: "in/muhammad-rohman-syah",
      href: "https://www.linkedin.com/in/muhammad-rohman-syah-13a0873a8/",
      icon: FaLinkedin,
    },
    {
      label: "WhatsApp",
      value: "+62 899-7785-724",
      href: "https://wa.me/628997785724",
      icon: MessageCircle,
    },
    {
      label: "Rekrut Saya",
      value: "Terbuka untuk posisi full-time",
      href: "mailto:syahr642@gmail.com",
      icon: Rocket,
      cta: true,
    },
  ],
};
