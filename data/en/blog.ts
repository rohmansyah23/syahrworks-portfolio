import type { BlogPost } from "@/lib/types";

/**
 * Metadata artikel blog. Body markdown disimpan terpisah di `content/blog/<slug>.md`
 * dan dibaca pada halaman detail (`app/blog/[slug]/page.tsx`).
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "ppdb-sistem-terpadu-payment-gateway-ujian-aman",
    title:
      "Building an Integrated Student Admission (PPDB) System: Payment Gateway Integration and a Secure Online Exam",
    date: "2026-01-01",
    excerpt:
      "Research on developing an integrated admission system for SMKS Jakarta 1 Pondok Kopi: registration, digital payments via payment gateway, anti-cheating online exams, and centralized announcements — with a 'Very Good' acceptance rating (4.48/5.00).",
    coverImage: "/projects/oc.png",
    tags: ["Research", "PPDB", "Payment Gateway", "Web Development"],
    category: "Research & Development",
    readingTime: "5 min read",
    author: "Muhammad Rohman Syah",
    featured: true,
  },
  {
    slug: "panduan-perintah-cmd-powershell",
    title:
      "The Complete Guide to CMD & PowerShell Commands: From Beginner to Administrator",
    date: "2026-08-05",
    excerpt:
      "Learning material on the most-used basic to intermediate commands in Command Prompt (CMD) and Windows PowerShell — complete with syntax, examples, their differences, and a suggested learning path.",
    coverImage: "/projects/auto-refresh.png",
    tags: ["Windows", "CMD", "PowerShell", "Tutorial"],
    category: "Tutorial",
    readingTime: "12 min read",
    author: "Muhammad Rohman Syah",
    featured: false,
  },
];
