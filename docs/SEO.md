# SEO.md — Strategi & Runbook SEO (syahrworks.com)

Dokumen ini menjelaskan kondisi SEO saat ini, perubahan teknis yang sudah diterapkan,
serta langkah manual (Google Search Console, backlink, konsolidasi brand) yang harus
dijalankan agar situs muncul untuk keyword seperti **"syahrworks"**.

---

## 1. Masalah yang Ditemukan (Diagnosis)

**Gejala:** di Google, keyword "syahrworks" tidak memunculkan situs; yang muncul justru
keyword "https://syahrworks.com/en" (URL). Cek `websearch` menunjukkan hasil
"syahrworks" didominasi GitHub repo lama (`syahr642/next-portofolio`) dan "Shareworks"
(Morgan Stanley).

**Penyebab utama:**
1. **Domain masih baru & minim authority** — syahrworks.com baru terindeks level URL,
   belum dapat ranking keyword (butuh waktu + backlink).
2. **Tidak ada `<link rel="canonical">`** di HTML.
3. **Tidak ada hreflang di HTML** (hanya di sitemap).
4. **Tidak ada JSON-LD structured data** (Person/WebSite/BlogPosting).
5. **`og:url` salah** (nunjuk root, padahal halaman di `/en`) dan **`og:image` 512×512**
   (standar 1200×630).
6. **`syahrworks.vercel.app` masih live** → duplikat konten yang memecah sinyal brand.
7. Sitemap `lastmod` memakai `now` → berubah tiap build (minor).

## 2. Perubahan Teknis (Sudah Diterapkan di Kode)

| Perubahan | File |
| --- | --- |
| Helper canonical + hreflang (en/id/x-default) & JSON-LD builders | `lib/seo.ts` (baru) |
| Komponen `<JsonLd>` | `components/JsonLd.tsx` (baru) |
| Canonical + hreflang + `og:url` per halaman | `app/[lang]/page.tsx`, `about`, `journey`, `blog`, `projects`, `blog/[slug]` |
| JSON-LD `WebSite` (sitewide) | `app/[lang]/layout.tsx` |
| JSON-LD `Person` (home) | `app/[lang]/page.tsx` |
| JSON-LD `BlogPosting` (tiap artikel) | `app/[lang]/blog/[slug]/page.tsx` |
| `og:image` diubah ke 1200×630 + gambar baru | `public/og-syahrworks.png` |
| Sitemap: `lastmod` stabil (artikel = tanggal terbit, statis = tanggal commit git terakhir), tambah `x-default` | `app/sitemap.ts` |
| Favicon.ico di-generate ulang dari `public/logo-light.svg` (16–256) + `icon.svg` (browser modern) + `apple-icon.png` (iOS) — mengatasi ikon globe di tab & SERP | `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png` |
| Twitter card dinaikkan ke `summary_large_image` (og:image 1200×630) | `app/[lang]/layout.tsx` |

## 3. Runbook Manual (WAJIB DILAKUKAN) — Fase B

### 3.1 Google Search Console
1. Buka https://search.google.com/search-console.
2. Pastikan property **`syahrworks.com`** ada (verifikasi meta tag sudah terpasang:
   `XwwdKNvthYP9Cxubcnhzhlqakn7dAaQ-vLgF2A1agO4` di `app/[lang]/layout.tsx`).
   Disarankan tambah **Domain property** (bukan URL-prefix) agar mencakup http/https + www
   (langkah lengkap: §3.5).
3. **Sitemaps** → submit `https://syahrworks.com/sitemap.xml`.
4. **URL Inspection** → masukkan dan klik **Request Indexing** untuk:
   - `https://syahrworks.com/en` (dan `/id`)
   - `/en/about`, `/en/journey`, `/en/blog`, `/en/projects`
   - 3 artikel blog (`/en/blog/...`)
5. Pantau **Indexing → Pages**: pastikan tidak ada `Excluded`, `Soft 404`, atau `Duplicate`.
6. Pantau **Queries** (Search results → Queries) untuk keyword **"syahrworks"**.
   Target realistis: 2–6 minggu sejak indexing.
7. **Ikon situs (favicon di SERP)**: GSC → **Branding → Ikon situs** → upload logo
   dari `app/favicon.ico` (min. 48×48, disarankan 256×256). Google butuh beberapa
   hari–minggu untuk menampilkan ikon di hasil pencarian; selama itu yang tampil bisa
   ikon globe/default.

### 3.2 Konsolidasi Brand (hilangkan duplikat & bangun asosiasi)
1. **Redirect `syahrworks.vercel.app` → `syahrworks.com` (301)**:
   - Vercel Dashboard → project `syahrworks` → Settings → Domain.
   - Atau tambah rule redirect di **Redirects** project (vercel.app → syahrworks.com).
   - Tujuannya agar brand + konten tidak terpecah dua domain.
2. **Backlink brand di GitHub**:
   - Repo `rohmansyah23/syahrworks-portfolio` → **About → Website**: `https://syahrworks.com`.
   - Repo lama `rohmansyah23/next-portofolio` → **About → Website**: `https://syahrworks.com`
     (biarkan repo sebagai arsip, tapi arahkan ke domain baru).
   - GitHub Profile README (jika ada) → tautkan ke syahrworks.com.
3. **Backlink di profil sosial**:
   - LinkedIn: URL profile/About → `https://syahrworks.com`.
   - Instagram bio → `syahrworks.com`.
   - YouTube About → website syahrworks.com.
4. *(Opsional)* **Bing Webmaster Tools** (https://www.bing.com/webmasters) → import dari GSC,
   submit sitemap — gratis menambah peluang traffic.
5. **Konsolidasi `www` vs non-`www`**: saat ini `https://syahrworks.com` dan
   `https://www.syahrworks.com` sama-sama aktif (keduanya 307 → `/en`). Agar sinyal
   brand tidak terpecah:
   - Pilih satu domain utama (disarankan non-`www`: `syahrworks.com`).
   - Di nginx VPS, tambahkan redirect **301 permanen** `www.syahrworks.com` →
     `syahrworks.com` (canonical non-www sudah dipakai di seluruh halaman).
   - Di GSC gunakan **Domain property** (mencakup http/https + www) atau dua
     URL-prefix property, lalu request indexing `www.syahrworks.com` sekali.

### 3.3 Jangka Panjang (Fase C)
- Perbanyak artikel blog bertarget keyword lokal:
  "full-stack developer jakarta", "next.js developer indonesia", "flutter developer id",
  "lowongan full-stack remote indonesia", dst. Tiap artikel = landing page baru.
- Pastikan tiap artikel punya `excerpt`, `tags`, `coverImage`, dan `date` yang benar
  (dipakai untuk BlogPosting JSON-LD + sitemap lastmod).
- Jaga copywriting sesuai `docs/COPYWRITING.md` (anti AI-slop).

### 3.4 Checklist GSC Pasca-Fix (Soft-404 & Ikon Situs)

Berlaku setelah dua perubahan ini live: **fix soft-404** (`docs/FIX-SOFT-404.md`,
commit `675cf2d`) dan **favicon baru dari `logo-light.svg`** (commit `bd7978c`).

**A. Persiapan (sekali jalan, ±5 menit)**
- [ ] Pastikan versi live sudah berisi fix: `curl -s -o /dev/null -w '%{http_code}' https://syahrworks.com/tidak-ada` → harus `404`. Jika masih `200`, jangan lanjut.
- [ ] GSC → **Sitemaps**: `https://syahrworks.com/sitemap.xml` status **Success** (submit ulang jika belum).
- [ ] GSC → **URL Inspection → Request Indexing** untuk: `/en`, `/id`, `/en/about`,
      `/en/journey`, `/en/blog`, `/en/projects`, dan 3 artikel blog.

**B. Pantau Indexing → Pages (cek 1×/minggu, 1–4 minggu)**
- [ ] Buka **Indexing → Pages**. Harapan: kartu **"Halaman valid"** bertambah hingga
      mencakup semua halaman nyata (statis 5×2 locale + 3 artikel ×2).
- [ ] Kartu **"Soft 404" / "Page with soft 404"** harus **0** — sebelum fix, URL seperti
      `/tidak-ada`, `/xyz/about`, dan file gambar terhapus dirender 200.
- [ ] Kartu **"Excluded"** → periksa kategori. Yang wajar: `Duplicate without user-selected
      canonical` (karena `/en` & `/id`) dan `Crawled – currently not indexed` (baru, sementara).
- [ ] **URL Inspection** pada `https://syahrworks.com/en` → harus **"URL is on Google"**.
- [ ] **URL Inspection** pada `https://syahrworks.com/tidak-ada` (atau `/about-me.png`) →
      harus melaporkan **"Page not found (404)"** / tidak terindeks. URL soft-404 lama akan
      dikoreksi Google pada rekraw berikutnya — **tidak perlu redirect manual**.

**C. Ikon situs di SERP (cek 1×/minggu, bisa 1–6 minggu)**
- [ ] GSC → **Branding → Ikon situs**: pastikan favicon sudah di-upload
      (dari `app/favicon.ico` baru — kotak hitam + monogram terang, 256×256; min 48×48).
      Klik **Simpan** / **Minta ulasan** bila tersedia.
- [ ] Cek pratinjau: Google.com (mode incognito) → cari "syahrworks" atau
      "Muhammad Rohman Syah" → ikon harus logo baru, bukan globe/default.
- [ ] Ekspektasi waktu: Google butuh **hari–minggu** untuk memproses ikon; penggantian
      bisa bertahap. Google juga tidak menjamin favicon tampil di semua hasil (kebijakan
      authority domain).

**D. Pantau keyword brand (mulai minggu ke-2)**
- [ ] **Performance → Queries**: filter query berisi "syahrworks" → amati impression/posisi.
- [ ] Target realistis: "syahrworks" posisi 1–3 dalam 2–6 minggu pasca-indexing;
      "syahrworks.com" / "www.syahrworks.com" menyusul.

**Tabel rekap harapan:**

| Item | Sebelum fix | Sesudah fix (harapan) |
| --- | --- | --- |
| Soft 404 di Indexing | Ada (URL tak dikenal 200) | 0 |
| `/tidak-ada` di URL Inspection | Soft-404 / terindeks | "Page not found (404)" |
| Halaman valid | Sebagian URL | Semua halaman nyata |
| Ikon SERP | Globe/default | Favicon SyahrWorks (1–6 minggu) |

### 3.5 Checklist: Menambah Domain Property (Verifikasi DNS TXT)

**Latar:** record TXT `google-site-verification=...` SUDAH terpasang & terverifikasi
propagasi (lihat `docs/DEPLOY.md` → § Konfigurasi DNS). Domain property mencakup
http/https + www + semua subdomain dalam satu property.

- [ ] Buka https://search.google.com/search-console → **Add property**.
- [ ] Pilih tipe **Domain** (bukan URL prefix), ketik `syahrworks.com` **tanpa** `https://`
      → **Continue**.
- [ ] Pilih metode verifikasi **DNS** (TXT record). Google menampilkan nilai:
      `google-site-verification=<TOKEN>`.
  - [ ] Jika token **sama** dengan record TXT yang sudah ada → langsung klik **Verify**
        (seharusnya langsung sukses).
  - [ ] Jika token **berbeda** (Google memberi token baru khusus property ini) →
        tambahkan **record TXT baru** di Dewabiz dengan token baru tersebut
        (**jangan menimpa** record lama), tunggu propagasi, lalu **Verify**.
- [ ] Jika status belum terverifikasi: tunggu 10–60 menit (propagasi) lalu klik **Verify**
      lagi — GSC mengecek ulang secara berkala, tidak perlu reset apa pun.
- [ ] Setelah sukses, di property baru: **Sitemaps** → submit `https://syahrworks.com/sitemap.xml`.
- [ ] **Request Indexing** untuk halaman kunci (lihat §3.4 bagian A).
- [ ] Catatan: data di property baru butuh **beberapa hari** untuk terisi; property
      URL-prefix lama tetap bisa dipakai berdampingan.
- [ ] Setelah ±1 minggu: cek **Performance → Queries** untuk keyword "syahrworks" (lihat §3.4 bagian D).

## 4. Checklist Monitoring (bulanan)

- [ ] GSC → sitemap.xml "Success", tidak ada error di Coverage.
- [ ] GSC → Indexing → Pages: tidak ada **Soft 404** (hasil fix `docs/FIX-SOFT-404.md`).
- [ ] GSC → Queries: muncul keyword "syahrworks" / "syahrworks developer"?
- [ ] GSC → Branding: ikon situs sudah tampil di SERP (bukan globe default).
- [ ] `https://syahrworks.com` tetap di Google (URL-prefix property konsisten).
- [ ] **Domain property** `syahrworks.com` aktif (verifikasi DNS TXT §3.5) dan datanya terisi.
- [ ] `syahrworks.vercel.app` sudah 301 (tidak ada duplikat).
- [ ] JSON-LD valid: cek dengan https://search.google.com/test/rich-results untuk
      `https://syahrworks.com/en` dan satu artikel blog.
- [ ] Tiap artikel blog baru: sitemap otomatis ter-update (build) + Request Indexing.
- [ ] Pastikan **tidak ada perubahan SEO yang bertentangan** saat VPS fallback ke Vercel
      (domain tetap `syahrworks.com` → canonical/hreflang tetap valid; lihat
      `docs/DEPLOY-VERCEL-FALLBACK.md`).

## 5. Catatan Penting

- Meta `keywords` tidak dipakai Google untuk ranking — aman dibiarkan.
- Root `/` sengaja **307-redirect ke `/en`** (struktur multi-bahasa). Canonical di
  `/en` dan `/id` sudah konsisten, jadi tidak masalah untuk SEO.
- **Soft-404 sudah diperbaiki di kode** (`resolveLang` + guard layout, commit `675cf2d`):
  segmen `[lang]` dengan nilai invalid kini `notFound()` — **jangan** mengembalikan
  fallback ke `defaultLocale` di segmen tersebut (lihat `docs/FIX-SOFT-404.md`).
- `lastmod` halaman statis di sitemap = **tanggal commit git terakhir** (`app/sitemap.ts`,
  `git log -1 --format=%cI`) — otomatis update tiap deploy dan stabil per commit.
  Fallback ke tanggal hari ini bila git tidak tersedia (mis. Vercel fallback).
- Jangan ubah `siteUrl` di `data/en/site.ts` & `data/id/site.ts` — tetap
  `https://syahrworks.com` (dipakai canonical, sitemap, robots, dan JSON-LD).
