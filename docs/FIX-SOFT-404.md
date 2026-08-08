# FIX-SOFT-404.md — Runbook Perbaikan Soft-404

Dokumen ini menjelaskan perbaikan **soft-404**: URL yang tidak dikenal (mis. file
gambar yang sudah dihapus, path typo, atau segmen bahasa invalid) sebelumnya
dibalas **HTTP 200 + konten halaman** alih-alih 404. Soft-404 membuang crawl
budget Google dan berpotensi memunculkan status `Excluded` / `Soft 404` di GSC.

> **Kesimpulan penting:** penyebab BUKAN di config Caddy/nginx VPS, melainkan di
> **kode aplikasi**. Berikut runbook lengkapnya (diagnosis → fix → verifikasi).

---

## 1. Gejala (sebelum fix)

Diuji 8 Agu 2026 terhadap `https://syahrworks.com` (build live):

| URL | Status | Keterangan |
| --- | --- | --- |
| `/en` | 200 | normal |
| `/en/tidak-ada` | 404 | benar (router Next) |
| `/tidak-ada` | **200** | ❌ seharusnya 404 — dirender halaman home EN |
| `/xyz/about` | **200** | ❌ seharusnya 404 — dirender halaman About EN |
| `/about-me.png` (file sudah dihapus) | **200** | ❌ seharusnya 404 |

Body respons = HTML lengkap halaman (bukan halaman 404), header
`X-Nextjs-Cache: HIT` — artinya respons datang dari aplikasi Next.js.

## 2. Root Cause (di kode, bukan Caddy)

Route dinamis `app/[lang]/` mencocokkan **semua path** yang punya segmen pertama
apa pun (`/tidak-ada`, `/xyz/about`, `/about-me.png`, dst — segmen tunggal maupun
prefix tak dikenal). Kemudian locale di-resolve dengan **fallback ke `en`**:

- `lib/i18n.ts` — `resolveLang()`: `return lang && isLocale(lang) ? lang : defaultLocale;`
- `app/[lang]/layout.tsx` — `generateMetadata` & `RootLayout`:
  `const lang = raw && isLocale(raw) ? raw : defaultLocale;`

Akibatnya URL invalid dirender dengan konten locale `en` dan status 200 → soft-404.
Bukti Caddy tidak bersalah: `/en/tidak-ada` (2 segmen, tidak cocok `[lang]`) sudah
kembali 404 — kalau Caddy me-rewrite semua path, path ini juga akan jadi 200.

## 3. Fix yang Diterapkan

Locale invalid di segmen `[lang]` **tidak boleh fallback** — harus `notFound()`:

**`lib/i18n.ts`** — `resolveLang`:
```ts
import { notFound } from "next/navigation";

export async function resolveLang(
  params: Promise<{ lang?: string }>
): Promise<Locale> {
  const { lang } = await params;
  if (!lang || !isLocale(lang)) notFound();
  return lang;
}
```

**`app/[lang]/layout.tsx`** — guard yang sama di `generateMetadata` dan
`RootLayout` (layout dipakai sebagai choke point tunggal seluruh subtree `[lang]`):
```ts
const { lang: raw } = await params;
if (!raw || !isLocale(raw)) notFound();
const lang: Locale = raw;
```

Catatan: `defaultLocale` tetap dipakai untuk redirect root `/` di `app/page.tsx`.

## 4. Verifikasi (jalankan setelah deploy)

```sh
# Harus 404 (segmen bahasa invalid & path tak dikenal)
curl -s -o /dev/null -w '%{http_code}\n' https://syahrworks.com/tidak-ada
curl -s -o /dev/null -w '%{http_code}\n' https://syahrworks.com/xyz/about
curl -s -o /dev/null -w '%{http_code}\n' https://syahrworks.com/about-me.png
curl -s -o /dev/null -w '%{http_code}\n' https://syahrworks.com/id/tidak-ada
curl -s -o /dev/null -w '%{http_code}\n' https://syahrworks.com/xyz/blog

# Harus 200 (halaman normal tetap jalan)
curl -s -o /dev/null -w '%{http_code}\n' https://syahrworks.com/en
curl -s -o /dev/null -w '%{http_code}\n' https://syahrworks.com/id
curl -s -o /dev/null -w '%{http_code}\n' https://syahrworks.com/en/about
```

Hasil yang diharapkan: semua baris pertama = `404`, semua baris kedua = `200`.

## 5. Caddy VPS — Tidak Perlu Diubah

Config reverse proxy Caddy sudah benar (meneruskan semua request ke Next.js).
**JANGAN** menambahkan `try_files {path} /index.html` atau fallback SPA lain —
itu justru akan mengubah 404 asli menjadi 200. Jika suatu saat ada kebutuhan
memvalidasi Caddyfile, gunakan: `sudo caddy validate --config /etc/caddy/Caddyfile`.

Opsional (konsolidasi brand): tambahkan 301 permanen `www.syahrworks.com` →
`syahrworks.com` di Caddyfile (lihat `docs/SEO.md` §3.2).

## 6. Monitoring di GSC

- Setelah deploy, GSC → **Indexing → Pages**: pantau apakah `Soft 404` / `Excluded`
  berkurang pada crawl berikutnya.
- Request Indexing untuk satu URL sampel (mis. `https://syahrworks.com/tidak-ada`)
  jika ingin mempercepat rekraw — atau biarkan Google menemukan 404 baru secara alami.
- Daftar URL yang pernah dirender 200 (soft-404) otomatis menjadi 404 setelah
  rekraw; tidak perlu redirect manual karena path tersebut memang tidak pernah ada.
