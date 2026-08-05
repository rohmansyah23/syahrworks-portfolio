import type { JourneyItem } from "@/lib/types";

export const journeyTypes = [
  "Experience",
  "Education",
  "Certification",
  "Competition",
] as const;

export const journey: JourneyItem[] = [
  /* ---------- Full-Time ---------- */
  {
    slug: "freelance-full-stack",
    type: "Full-Time",
    startDate: "2024-01",
    endDate: "Present",
    title: "Freelance Full-Stack Developer",
    subtitle: "Wiraswasta",
    description: [
      "Merancang, mengembangkan, men-deploy, dan memelihara aplikasi web dan mobile sepanjang siklus hidup pengembangan perangkat lunak (SDLC).",
      "Membangun dan menyesuaikan solusi berdasarkan kebutuhan klien, berfokus pada performa, skalabilitas, dan kemudahan pemeliharaan.",
    ],
    tools: ["Next.js", "TypeScript", "Flutter", "Go"],
  },

  /* ---------- Part-Time ---------- */
  {
    slug: "smks-jakarta1-it-support",
    type: "Part-Time",
    startDate: "2024-10",
    endDate: "2024-12",
    title: "IT Support & Asisten Pengajar (Magang)",
    subtitle: "SMKS Jakarta 1 Pondok Kopi",
    description: [
      "Mengembangkan dan mengimplementasikan sistem PPDB terintegrasi dengan integrasi payment gateway.",
      "Membangun website akademik yang merampingkan pengelolaan data siswa dan alur kerja administrasi.",
      "Memelihara infrastruktur TI laboratorium serta memberikan dukungan teknis dan troubleshooting jaringan.",
    ],
    tools: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
  },
  {
    slug: "milagros-admin",
    type: "Part-Time",
    startDate: "2021-02",
    endDate: "2024-12",
    title: "Administrator Operasional & Stockist",
    subtitle: "Milagros Pondok Kelapa",
    description: [
      "Menyusun laporan penjualan harian dan bulanan dengan akurasi inventori 100%.",
      "Mengelola distribusi dan logistik inventori hingga 60 box produk per bulan.",
      "Memproses lebih dari 20 pesanan pelanggan per minggu sambil menjaga efisiensi operasional.",
    ],
    tools: ["Inventory Management", "Reporting", "Logistics"],
  },

  /* ---------- Education ---------- */
  {
    slug: "ubsi-s1-ti",
    type: "Education",
    startDate: "2021-08",
    endDate: "2025-12",
    title: "Sarjana Teknologi Informasi",
    subtitle: "Universitas Bina Sarana Informatika, Jakarta",
    description: [
      "Skripsi: Pengembangan Sistem Informasi PPDB Berbasis Web Terintegrasi dengan Integrasi Payment Gateway.",
      "Publikasi riset tentang sistem penerimaan siswa daring yang aman dengan fungsionalitas payment gateway terintegrasi.",
    ],
    tools: ["Web Development", "Research", "Payment Gateway"],
  },
  {
    slug: "smks-jakarta1-rpl",
    type: "Education",
    startDate: "2018-07",
    endDate: "2021-06",
    title: "Rekayasa Perangkat Lunak",
    subtitle: "SMKS Jakarta 1 Pondok Kopi, Jakarta",
    description: [
      "Lulus sebagai siswa terbaik jurusan Rekayasa Perangkat Lunak.",
      "Anggota aktif OSIS.",
      "Meraih nilai tertinggi uji kompetensi keahlian BNSP Rekayasa Perangkat Lunak.",
    ],
    tools: ["PHP", "CodeIgniter", "MySQL", "OOP"],
  },

  /* ---------- Certification (BNSP) ---------- */
  {
    slug: "bnsp-network-administrator-madya",
    type: "Certification",
    startDate: "2025-08",
    endDate: "2028-08",
    title: "Network Administrator Madya",
    subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
    caption: "Credential ID TIK.1241.00732 2025 · Berlaku 2025–2028",
    description: [
      "Sertifikasi kompetensi nasional dari Badan Nasional Sertifikasi Profesi (BNSP) yang memvalidasi keterampilan profesional di bidang administrasi jaringan komputer berdasarkan SKKNI.",
      "Cakupan materi: network addressing, keamanan jaringan, disaster recovery planning, deployment jaringan nirkabel, konfigurasi switch & routing, serta monitoring keamanan jaringan.",
    ],
    tools: ["ISP", "Network Administration"],
  },
  {
    slug: "bnsp-program-analyst",
    type: "Certification",
    startDate: "2024-05",
    endDate: "2027-05",
    title: "Program Analyst",
    subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
    caption: "Credential ID TIK.1241.01755 2024 · Berlaku 2024–2027",
    description: [
      "Tersertifikasi sebagai Program Analyst oleh Badan Nasional Sertifikasi Profesi (BNSP), membuktikan kompetensi pengembangan perangkat lunak berdasarkan SKKNI Indonesia.",
      "Cakupan materi: SQL, akses database, algoritma pemrograman, dokumentasi kode, implementasi perangkat lunak, debugging, pengujian, version control, dan pemeliharaan perangkat lunak.",
    ],
    tools: ["PHP", "Programming"],
  },
  {
    slug: "bnsp-software-engineering-kkni-ii",
    type: "Certification",
    startDate: "2021-06",
    endDate: "2024-06",
    title: "Kompetensi Rekayasa Perangkat Lunak (KKNI Level II)",
    subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
    caption: "Credential ID J1060000542021 · Berlaku 2021–2024 (kedaluwarsa)",
    description: [
      "Sertifikasi profesi yang dikeluarkan BNSP yang memvalidasi kompetensi Rekayasa Perangkat Lunak pada KKNI Level II.",
      "Cakupan materi: pemrograman dan Object-Oriented Programming (OOP).",
    ],
    tools: ["Programming", "OOP"],
  },

  /* ---------- Competition (datang menyusul) ---------- */
];
