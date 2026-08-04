import type { BlogPost } from "@/lib/types";

/**
 * Metadata artikel blog. Body markdown disimpan terpisah di `content/blog/<slug>.md`
 * dan dibaca pada halaman detail (`app/blog/[slug]/page.tsx`).
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "ppdb-sistem-terpadu-payment-gateway-ujian-aman",
    title:
      "Membangun Sistem PPDB Terpadu: Integrasi Payment Gateway dan Ujian Daring yang Aman",
    date: "2026-01-01",
    excerpt:
      "Riset pengembangan sistem PPDB terintegrasi untuk SMKS Jakarta 1 Pondok Kopi: registrasi, pembayaran digital via payment gateway, ujian daring anti-kecurangan, dan pengumuman terpusat — dengan tingkat penerimaan 'Sangat Baik' (4.48/5.00).",
    coverImage: "/projects/oc.png",
    tags: ["Riset", "PPDB", "Payment Gateway", "Web Development"],
    category: "Riset & Pengembangan",
    readingTime: "5 min read",
    author: "Muhammad Rohman Syah",
    featured: true,
  },
  {
    slug: "panduan-perintah-cmd-powershell",
    title:
      "Panduan Lengkap Perintah CMD & PowerShell untuk Pemula hingga Administrator",
    date: "2026-08-05",
    excerpt:
      "Materi pembelajaran perintah dasar hingga menengah yang paling sering digunakan di Command Prompt (CMD) dan Windows PowerShell — lengkap dengan sintaks, contoh, perbedaan keduanya, dan urutan belajar yang disarankan.",
    coverImage: "/projects/auto-refresh.png",
    tags: ["Windows", "CMD", "PowerShell", "Tutorial"],
    category: "Tutorial",
    readingTime: "12 min read",
    author: "Muhammad Rohman Syah",
    featured: false,
  },
];
