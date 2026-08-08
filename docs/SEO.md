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
| Sitemap: `lastmod` stabil (tanggal artikel), tambah `x-default` | `app/sitemap.ts` |

## 3. Runbook Manual (WAJIB DILAKUKAN) — Fase B

### 3.1 Google Search Console
1. Buka https://search.google.com/search-console.
2. Pastikan property **`syahrworks.com`** ada (verifikasi meta tag sudah terpasang:
   `XwwdKNvthYP9Cxubcnhzhlqakn7dAaQ-vLgF2A1agO4` di `app/[lang]/layout.tsx`).
   Disarankan tambah **Domain property** (bukan URL-prefix) agar mencakup http/https + www.
3. **Sitemaps** → submit `https://syahrworks.com/sitemap.xml`.
4. **URL Inspection** → masukkan dan klik **Request Indexing** untuk:
   - `https://syahrworks.com/en` (dan `/id`)
   - `/en/about`, `/en/journey`, `/en/blog`, `/en/projects`
   - 3 artikel blog (`/en/blog/...`)
5. Pantau **Indexing → Pages**: pastikan tidak ada `Excluded`, `Soft 404`, atau `Duplicate`.
6. Pantau **Queries** (Search results → Queries) untuk keyword **"syahrworks"**.
   Target realistis: 2–6 minggu sejak indexing.

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

### 3.3 Jangka Panjang (Fase C)
- Perbanyak artikel blog bertarget keyword lokal:
  "full-stack developer jakarta", "next.js developer indonesia", "flutter developer id",
  "lowongan full-stack remote indonesia", dst. Tiap artikel = landing page baru.
- Pastikan tiap artikel punya `excerpt`, `tags`, `coverImage`, dan `date` yang benar
  (dipakai untuk BlogPosting JSON-LD + sitemap lastmod).
- Jaga copywriting sesuai `docs/COPYWRITING.md` (anti AI-slop).

## 4. Checklist Monitoring (bulanan)

- [ ] GSC → sitemap.xml "Success", tidak ada error di Coverage.
- [ ] GSC → Queries: muncul keyword "syahrworks" / "syahrworks developer"?
- [ ] `https://syahrworks.com` tetap di Google (URL-prefix property konsisten).
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
- Jangan ubah `siteUrl` di `data/en/site.ts` & `data/id/site.ts` — tetap
  `https://syahrworks.com` (dipakai canonical, sitemap, robots, dan JSON-LD).
