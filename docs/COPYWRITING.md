# COPYWRITING — Standar Copywriting "Anti AI-Slop" (Target: HRD / Full-Time)

> **Status:** ✅ BERLAKU — diterapkan sejak 6 Aug 2026 (revisi copywriting Phase 1).
> **Ringkasan:** Semua teks situs ditulis untuk audiens utama **HRD / recruiter** yang sedang mencari kandidat **Full-Stack (Web + Mobile)** level **Junior–Mid**. Tujuan akhir: kandidat terlihat kredibel, spesifik, dan manusiawi — bukan hasil template AI. Dokumen ini **WAJIB dibaca** agent sebelum mengubah konten teks (`data/en`, `data/id`, `data/ui`, komponen, metadata), bersama `docs/PRD.md`, `docs/PROMPT.md`, `docs/I18N.md`, dan `docs/ENGLISH.md`.

---

## 1. Konteks & Tujuan

- Situs adalah **portofolio lamaran kerja full-time**, bukan landing page jualan jasa.
- Pembaca rata-rata: **HRD/recruiter** yang melirik 5–10 detik, lalu membuka CV. Kata pertama yang dicari: posisi, lokasi, dan bukti kerja.
- Bahasa percakapan dengan user tetap **Bahasa Indonesia**; konten situs **EN** untuk `data/en` & `data/ui/en.ts`, **ID** untuk `data/id` & `data/ui/id.ts` (terjemahan ID harus natural, bukan terjemahan kata-per-kata — rujuk `docs/I18N.md`).

## 2. Positioning Statement (TERKUNCI — jangan diubah tanpa persetujuan user)

> **Full-Stack Developer (Next.js · Flutter · Go) di Jakarta — 13+ proyek shipped, 3× BNSP certified. Open to Full-Time · Remote.**

Turunan yang dipakai di hero/home:
- EN: `Full-Stack Developer (Next.js · Flutter · Go) in Jakarta — 13+ shipped projects, 3× BNSP certified. Open to full-time & remote.`
- ID: `Full-Stack Developer (Next.js · Flutter · Go) di Jakarta — 13+ proyek shipped, 3× sertifikasi BNSP. Terbuka untuk full-time & remote.`

## 3. Target Audience & Persona

| Aspek | Deskripsi |
|---|---|
| Role | HRD / Technical Recruiter (membaca cepat, banyak lamaran) |
| Pertanyaan pertama | "Bisa apa? Sudah pernah kerja/kerjakan apa? Ada bukti angka?" |
| Keputusan | 5–10 detik pertama di hero/hero section menentukan lanjut atau tidak |
| Kesalahan yang mematikan | Klaim kosong ("passionate", "seamless"), desain template AI, angka tidak konsisten |

## 4. Data Fakta (bukti yang BOLEH dipakai — harus konsisten)

- **13+ proyek** shipped (jangan tulis 12; jika berubah, update SEMUA file: `data/ui/{en,id}.ts`, `data/{en,id}/site.ts`).
- **3× BNSP certified** — BNSP bidang: Network Administration, Software Engineering, Web Programming.
- **PPDB Online System (skripsi)**: nilai UAT **4.48/5.00 ("Very Good")**.
- **PPDB SMKS Jakarta 1** (magang/part-time): sistem PPDB yang dipakai sekolah.
- **Milagros (part-time)**: **100% akurasi** pengelolaan produk, **60 box/bulan** produk dikirim, **20+ order/minggu** diproses.
- **Freelance**: full lifecycle — requirement, desain, implementasi, hingga deploy.
- Lokasi: **Jakarta, Indonesia**. Bersedia **remote**.

## 5. Banned Words & Frase AI-Slop (JANGAN pernah dipakai)

- `passionate`, `passionate about`, `driven`, `motivated`, `hardworking`, `team player`.
- `seamless`, `seamlessly`, `leverage`, `elevate`, `empower`, `unleash`, `unlock`.
- `crafting/crafted`, `delightful`, `intuitive`, `robust`, `cutting-edge`, `state-of-the-art`.
- `dynamic`, `versatile`, `results-driven`, `proven track record`, `hit the ground running`.
- `Take your X to the next level`, `Let's build the future`, `Innovation meets…`, `Turning ideas into reality`.
- Emoji sebagai label section (✅/🚀/💡) di konten publik.
- Frase berantai 3+: `reliable, scalable, maintainable`.

> Aturan cepat: jika frase bisa muncul di CV template mana pun tanpa bukti → hapus. Ganti dengan **angka, nama teknologi, nama proyek, atau hasil konkret**.

## 6. Lima Aturan Emas

1. **Klaim = Bukti.** Setiap kata sifat/klaim wajib punya ≥1 bukti di sekitarnya (angka, proyek, sertifikat). Tanpa bukti → hapus klaim.
2. **Konkret & spesifik.** Sebut nama proyek, teknologi, angka. Hindari generalisasi ("membuat aplikasi") tanpa konteks.
3. **Manusiawi, bukan formulasi.** Variasi panjang & struktur kalimat; kalimat pendek dan panjang selang-seling. Hindari pola kalimat seragam (setiap bullet mulai dengan verb yang sama).
4. **Variasi struktur antar-item.** Dua item berurutan tidak boleh dimulai dengan pola yang sama (mis. "Membangun X" / "Membangun Y").
5. **Terjemahan ID natural.** Terjemahkan makna, bukan kata-per-kata; idiom EN boleh diadaptasi; angka & nama resmi tidak diterjemahkan.

## 7. Formula per Halaman

### Hero / Home (`data/{en,id}/main.ts`, `components/home/HeroSection.tsx`)
- 1 kalimat posisi (role + stack + lokasi) → 1 kalimat nilai (buat apa) → 1 kalimat bukti (13+, 3× BNSP) → status lowongan **"Open to Full-Time · Remote"**.
- CTA: **See My Projects** (`t.heroViewProjects`, solid) → **About Me** (`t.heroAboutMe`, outline, `localePath(lang, "/about")`) → Get in touch (`t.heroGetInTouch`, link).
- Bukan: "Hello, I'm a developer" tanpa konteks; bukan effect typewriter.

### About (`data/{en,id}/about.ts`)
- Intro: **siapa → nilai → bukti** dalam 3 kalimat. Tutup dengan kesiapan full-time.
- `workingStyle`: tiap poin 1 perilaku + 1 bukti/contoh. Hindari pola kalimat seragam antar poin.

### Journey (`data/{en,id}/journey.ts`)
- Bullet item kerja = **achievement**: apa yang dikerjakan → hasil terukur (angka).
- Urutan tab Experience: endDate desc, item berjalan ("Present") paling atas, badge tipe (Full-Time/Part-Time) kecil di kartu.
- Education & Certification: sertifikat cukup judul + 1 baris relevansi; tambahkan bagian kursus jika ada.

### Projects (`data/{en,id}/projects.ts`)
- Deskripsi singkat 1–2 kalimat: **konsumen → yang dibangun → hasil**.
- Sebut teknologi & peran. Biarkan proyek portofolio itu sendiri bersifat self-referential.

### Blog (`content/blog/*.md`)
- Bahasa Indonesia; judul spesifik & jelas; fakta/angka riil (contoh: skor UAT 4.48/5.00).

### Contact / Get in Touch (`data/ui/{en,id}.ts`, `components/home/ContactForm.tsx`)
- Heading bernada rekrut (EN: "Open to full-time — let's talk." / ID: "Terbuka untuk posisi full-time — mari bicara.").
- Microcopy janji respons: **"I usually reply within 24 hours"** / **"saya biasanya membalas dalam 24 jam"**.
- Placeholder mengundang cerita proyek ATAU posisi yang ditawarkan.

### Metadata / SEO (`data/{en,id}/site.ts`)
- Description: posisi + stack + lokasi + angka bukti + status lowongan.
- Keywords: lokasi (Jakarta), level (junior), mode (remote), stack (Next.js/Flutter/Go).
- `ogImage`: `/og-syahrworks.png` (1200×630, dark, wordmark + posisi + statistik) — dihasilkan `scripts/gen-og.mjs`.

## 8. Contoh Sebelum / Sesudah

| Sebelum (AI-slop) | Sesudah (anti-slop) |
|---|---|
| "Passionate full-stack developer crafting seamless experiences." | "Full-Stack Developer (Next.js · Flutter · Go) in Jakarta — 13+ shipped projects, 3× BNSP certified." |
| "Built a modern catering management system with JWT authentication." | "Ordering platform for Catering Mama Akbar — interactive menu catalog plus a JWT-secured admin panel, so the owner updates menus without touching code." |
| "A production-grade, offline-aware financial app with real-time insights." | "Offline-aware, multi-tenant finance app for Indonesian SMEs — QRIS payments, debt tracking, real-time insights." |
| "Managed product catalog and tracked orders." | "100% accuracy in product data, 60 boxes shipped monthly, 20+ orders processed weekly (Milagros)." |

## 9. QA Checklist (wajib dicek sebelum menganggap selesai)

- [ ] Tidak ada banned words (§5) di seluruh konten EN & ID.
- [ ] Setiap klaim punya bukti (§6.1).
- [ ] Angka konsisten: 13 proyek, 3× BNSP, 4.48/5.00, 100%, 60 box, 20+ order (di SEMUA file & locale).
- [ ] Bullet/deskripsi tidak dimulai dengan pola kalimat seragam berurutan (§6.3–6.4).
- [ ] Terjemahan ID terdengar natural bagi penutur asli, bukan Google Translate.
- [ ] Meta description & ogImage ter-update di EN dan ID.
- [ ] `npm run lint` dan `npm run build` lolos.

## 10. Referensi

- `docs/PRD.md`, `docs/PROMPT.md` — spesifikasi produk & eksekusi.
- `docs/I18N.md` — aturan bilingual & struktur `data/{en,id}`.
- `docs/ENGLISH.md` — standar konten EN.
- `AGENTS.md` — rules hard constraint & design system.
