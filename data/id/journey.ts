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
      "Mengantarkan produk web & mobile secara utuh untuk klien — dari kebutuhan hingga deployment — dengan Next.js, Flutter, dan Go.",
      "Memegang siklus penuh: solusi yang sudah dirilis tetap dirawat, dipantau, dan ditingkatkan setelah diluncurkan.",
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
      "Membangun sistem PPDB terpadu sekolah — pendaftaran, payment gateway, dan ujian daring aman — diterima dengan rating 'Sangat Baik' 4.48/5.00.",
      "Meluncurkan website akademik yang merampingkan data siswa dan alur kerja administrasi.",
      "Menjaga lab TI tetap berjalan — troubleshooting jaringan dan dukungan teknis untuk staf dan siswa.",
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
      "Menjaga akurasi inventori 100% pada pelaporan penjualan harian dan bulanan.",
      "Mengelola distribusi dan logistik stok — hingga 60 box produk per bulan.",
      "Memproses 20+ pesanan pelanggan per minggu sambil menjaga operasional tetap efisien.",
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
      "Skripsi: sistem informasi PPDB berbasis web terintegrasi dengan payment gateway.",
      "Riset dipublikasikan — diterima dengan penilaian 4.48/5.00 'Sangat Baik'.",
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
      "Keterampilan praktis menjaga sistem tetap daring dan aman.",
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
      "Mencakup siklus perangkat lunak penuh — SQL, pengujian, version control, dan pemeliharaan.",
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
      "Fondasi pemrograman dan desain berorientasi objek.",
    ],
    tools: ["Programming", "OOP"],
  },

  /* ---------- Competition (datang menyusul) ---------- */
];
