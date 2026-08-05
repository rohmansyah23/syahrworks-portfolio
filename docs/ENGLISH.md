# ENGLISH — Standar Konten & Inventori Terjemahan (Situs English-Only)

> **Status:** ✅ BERLAKU — diterapkan sejak 5 Aug 2026 (Phase 1 English migration).
> **Ringkasan:** Situs kini **bilingual EN/ID** (`/en` default via redirect dari `/`, `/id`). Standar ini berlaku untuk konten **EN** (`data/en/`, `data/ui/en.ts`, `*.en.md`); Bahasa Indonesia dipakai hanya untuk percakapan dengan user dan dokumen `/docs`. Detail arsitektur bilingual ada di `docs/I18N.md` (sudah dieksekusi).

---

## 1. Aturan Inti

1. Semua teks yang dirender oleh browser (UI, kartu, toast, empty state, `aria-label`, `<title>`/`<meta>`, sitemap, robots) harus **English**.
2. **Slug blog & proyek adalah ID stabil** — tidak diterjemahkan dan tidak boleh berubah. Menjamin URL permanen & kompatibilitas ke depannya dengan i18n.
3. **Nama properti / nama resmi** (Badan Nasional Sertifikasi Profesi/BNSP, Universitas Bina Sarana Informatika, SMKS Jakarta 1 Pondok Kopi) tetap sesuai nama resmi; konteks penjelas boleh English.
4. Angka, skor, credential ID, dan fakta (tanggal, jumlah proyek) TIDAK diterjemahkan — hanya bahasa narasinya.
5. Nama tool/teknologi (Next.js, Flutter, Go, PHP) tidak diterjemahkan.
6. Dokumen `/docs` boleh Bahasa Indonesia; **dokumen `docs/ENGLISH.md` & `docs/I18N.md` wajib dibaca** oleh agent sebelum mengubah konten teks.

## 2. Inventori File & Baris yang Diterjemahkan (Phase 1)

> Kolom "Status" diisi per state terakhir verifikasi.

### 2a. Data

| File | Baris / Bagian | Konten ID → EN | Status |
|---|---|---|---|
| `data/site.ts` | `description` + seluruh `pageMetadata.*.description` | Deskripsi metadata → English | ✅ |
| `data/blog.ts` | 2 `title`, 2 `excerpt`, `tags`, `category` | Judul & ringkasan artikel → English | ✅ |
| `data/journey.ts` | 3 `description` BNSP + 3 `caption` ("Berlaku" → "Valid") | Deskripsi sertifikasi → English | ✅ |

### 2b. Artikel Blog (`content/blog/*.md`)

| File | Isi | Status |
|---|---|---|
| `content/blog/ppdb-sistem-terpadu-payment-gateway-ujian-aman.md` | Artikel riset PPDB ditulis ulang English (judul, intro, metodologi, UAT 4.48/5.00) | ✅ |
| `content/blog/panduan-perintah-cmd-powershell.md` | Panduan CMD & PowerShell ditulis ulang English (2 tabel, perbedaan, rekomendasi belajar) | ✅ |

### 2c. UI Strings (Komponen & App)

| File | String yang diubah | Status |
|---|---|---|
| `components/Header.tsx` | 3 `aria-label` (mode terang/gelap, buka/tutup menu) | ✅ |
| `components/home/ContactForm.tsx` | desc section + 5 pesan validasi/toast + 1 pesan gagal | ✅ |
| `components/home/GetInTouch.tsx` | desc section | ✅ |
| `components/home/TopRepos.tsx` | desc section + teks fallback | ✅ |
| `components/blog/BlogGrid.tsx` | `aria-label="Cari artikel"` + empty state | ✅ |
| `components/journey/Timeline.tsx` | empty state | ✅ |
| `components/projects/ProjectGrid.tsx` | empty state | ✅ |
| `components/about/CVDialog.tsx` | DialogDescription | ✅ |
| `app/blog/page.tsx` | intro paragraph | ✅ |
| `app/blog/[slug]/page.tsx` | "Artikel tidak ditemukan", "Ditulis oleh" | ✅ |
| `app/projects/page.tsx` | intro paragraph | ✅ |
| `app/journey/page.tsx` | intro paragraph | ✅ |
| `app/not-found.tsx` | body 404 | ✅ |

### 2d. Sudah English (tidak perlu diubah)

- `data/main.ts`, `data/about.ts`, `data/projects.ts`, `data/techStack.ts`, `data/socials.ts`
- `components/home/HeroSection.tsx`, `SectionHeader.tsx`, `LatestBlogs.tsx`
- `components/about/AboutSection.tsx`
- `components/journey/TimelineItem.tsx`
- `components/blog/BlogCard.tsx`
- `components/projects/ProjectCard.tsx`, `ProjectModal.tsx`, `GalleryModal.tsx`
- `components/Footer.tsx`, `components/ui/*`
- `app/layout.tsx` (metadata), `app/sitemap.ts`, `app/robots.ts`

## 3. Checklist Konsistensi (dipakai saat menambah/mengubah konten)

- [ ] Tidak ada string Indonesia yang tersisa di komponen yang merender UI.
- [ ] `aria-label`, `title`, `alt`, `placeholder` dalam English.
- [ ] Metadata halaman (`generateMetadata`/`pageMetadata`) dalam English.
- [ ] Toast & pesan validasi dalam English.
- [ ] Empty state (blog, proyek, journey) dalam English.
- [ ] Slug baru (blog/proyek) dibuat dalam bahasa netral (ID stabil), bukan hasil translate.
- [ ] Fakta/angka/credential ID tidak berubah.
- [ ] `npm run lint` + `npm run build` lolos setelah perubahan teks.

## 4. Cara Verifikasi Cepat

```bash
npm run lint
npm run build
```

Cari sisa string Indonesia: `rg -i "yang |dengan |untuk |belum |tidak |artikel|proyek|terima kasih|halaman" --type tsx --type ts -g '!docs/**'` lalu tinjau manual tiap kecocokan di file konten/UI (bukan data yang memang sudah English).

## 5. Catatan Masa Depan

- ✅ **Phase 2 bilingual sudah dieksekusi** (5 Aug 2026): file konten English dipindah ke `data/en/` & `content/blog/*.en.md`; versi Bahasa Indonesia ada di `data/id/` & `*.id.md`. Konten baru harus ditulis **dua bahasa** (EN + ID).
- Slug tetap sama di kedua bahasa → tidak ada duplikasi konten di URL.
