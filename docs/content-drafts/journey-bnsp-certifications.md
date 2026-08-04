# Data Sertifikasi BNSP — untuk tab "Certification" di Journey

> **Sumber:** data yang dikirim user (profil LinkedIn). Verifikasi terhadap PRD §9: PRD menyebut "BNSP Software Engineering (KKNI II), BNSP Program Analysis, BNSP Intermediate Network Administration" — data aktual user: **Network Administrator Madya** (bukan "Intermediate"), jadi ikuti data user.
> **Status:** siap migrasi ke `data/journey.ts` (type: `Certification`).

---

## 1. Network Administrator Madya

```ts
{
  slug: "bnsp-network-administrator-madya",
  type: "Certification",
  startDate: "2025-08",
  endDate: "2028-08", // berlaku hingga
  title: "Network Administrator Madya",
  subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
  caption: "Credential ID TIK.1241.00732 2025 · Berlaku 2025–2028",
  description: [
    "Sertifikasi kompetensi nasional dari Badan Nasional Sertifikasi Profesi (BNSP) yang memvalidasi keterampilan profesional di bidang administrasi jaringan komputer berdasarkan Standar Kompetensi Kerja Nasional Indonesia (SKKNI).",
    "Cakupan materi: network addressing, keamanan jaringan, disaster recovery planning, deployment jaringan nirkabel, konfigurasi switch & routing, serta monitoring keamanan jaringan.",
  ],
  tools: ["Internet Service Provider (ISP)", "Network Administration"],
  logo: "", // opsional: /bnsp.png bila ada
}
```

## 2. Program Analyst

```ts
{
  slug: "bnsp-program-analyst",
  type: "Certification",
  startDate: "2024-05",
  endDate: "2027-05", // berlaku hingga
  title: "Program Analyst",
  subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
  caption: "Credential ID TIK.1241.01755 2024 · Berlaku 2024–2027",
  description: [
    "Tersertifikasi sebagai Program Analyst oleh Badan Nasional Sertifikasi Profesi (BNSP), membuktikan kompetensi pengembangan perangkat lunak berdasarkan SKKNI Indonesia.",
    "Cakupan materi: SQL, akses database, algoritma pemrograman, dokumentasi kode, implementasi perangkat lunak, debugging, pengujian, version control, dan pemeliharaan perangkat lunak.",
  ],
  tools: ["PHP", "Programming"],
  logo: "",
}
```

## 3. Software Engineering Competency (KKNI Level II)

```ts
{
  slug: "bnsp-software-engineering-kkni-ii",
  type: "Certification",
  startDate: "2021-06",
  endDate: "2024-06", // sudah EXPIRED
  title: "Software Engineering Competency (KKNI Level II)",
  subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
  caption: "Credential ID J1060000542021 · Berlaku 2021–2024 (kedaluwarsa)",
  description: [
    "Sertifikasi profesi yang dikeluarkan BNSP yang memvalidasi kompetensi Rekayasa Perangkat Lunak pada KKNI Level II.",
    "Cakupan materi: pemrograman dan Object-Oriented Programming (OOP).",
  ],
  tools: ["Programming", "Object-Oriented Programming (OOP)"],
  logo: "",
}
```

---

## Catatan untuk implementasi

1. **Kedaluwarsa:** Sertifikasi #3 sudah expired (Jun 2024). Tetap ditampilkan (sejarah sertifikasi), beri indikator "Expired" pada caption bila perlu.
2. **Logo BNSP:** opsional — bisa unduh logo resmi BNSP ke `public/` bila diinginkan, atau tanpa logo (pakai inisial "BNSP").
3. **Urutan timeline:** terbaru di atas → Network Administrator Madya (2025) → Program Analyst (2024) → KKNI Level II (2021).
4. **Tanya user (opsional):** apakah ada sertifikasi/sertifikat lain (selain BNSP) yang ingin ditambahkan?
