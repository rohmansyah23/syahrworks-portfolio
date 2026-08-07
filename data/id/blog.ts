import type { BlogPost } from "@/lib/types";

/**
 * Metadata artikel blog. Body markdown disimpan terpisah di `content/blog/<slug>.md`
 * dan dibaca pada halaman detail (`app/blog/[slug]/page.tsx`).
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "ppdb-sistem-terpadu-payment-gateway-ujian-aman",
    title:
      "Mengembangkan Sistem PPDB yang Efisien: Integrasi Payment Gateway dan Ujian Online yang Aman",
    date: "2026-01-01",
    excerpt:
      "Riset pengembangan sistem PPDB terpadu untuk SMKS Jakarta 1 Pondok Kopi: pendaftaran, pembayaran digital melalui payment gateway, ujian online anti-kecurangan, dan pengumuman terpusat — dengan penilaian penerimaan 'Sangat Baik' (4,48/5,00).",
    coverImage: "/blog/ppdb-sistem-terpadu-payment-gateway-ujian-aman.png",
    tags: ["Riset", "PPDB", "Payment Gateway", "Ujian Online", "Waterfall"],
    category: "Riset & Pengembangan",
    readingTime: "6 mnt baca",
    author: "Muhammad Rohman Syah",
    featured: true,
  },
  {
    slug: "panduan-perintah-cmd-powershell",
    title:
      "Panduan Lengkap Perintah CMD & PowerShell: Dari Pemula hingga Administrator",
    date: "2026-08-05",
    excerpt:
      "Materi pembelajaran perintah paling umum dari tingkat dasar hingga menengah di Command Prompt (CMD) dan Windows PowerShell — lengkap dengan sintaks, contoh, perbedaannya, dan alur belajar yang disarankan.",
    coverImage: "/blog/panduan-perintah-cmd-powershell.png",
    tags: ["Windows", "CMD", "PowerShell", "Tutorial"],
    category: "Tutorial",
    readingTime: "12 mnt baca",
    author: "Muhammad Rohman Syah",
    featured: false,
  },
  {
    slug: "panduan-git-dari-pemula-hingga-recovery",
    title: "Panduan Git dari Pemula hingga Pemulihan: Langkah demi Langkah",
    date: "2026-08-07",
    excerpt:
      "Belajar Git tanpa rasa takut: mulai dari cara menyimpan perubahan harian, bekerja dengan tim lewat branch dan Pull Request, sampai memulihkan commit yang sepertinya sudah hilang — dengan contoh perintah nyata di tiap langkahnya.",
    coverImage: "/blog/placeholder-blog.png",
    tags: ["Git", "GitHub", "Version Control", "Tutorial"],
    category: "Tutorial",
    readingTime: "10 mnt baca",
    author: "Muhammad Rohman Syah",
    featured: false,
  },
];
