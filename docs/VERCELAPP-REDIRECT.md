# VERCELAPP-REDIRECT.md — Konsolidasi syahrworks.vercel.app → syahrworks.com

Runbook manual untuk menghilangkan duplikat konten dari versi lama yang masih live di
**`syahrworks.vercel.app`** (repo `rohmansyah23/next-portofolio`, Next 13.1.6).

> **Catatan:** Per `docs/AGENTS.md`, coding agent **DILARANG** menyentuh repo lama
> `next-portofolio`. Semua edit di repo lama dilakukan manual oleh pemilik repositori.

---

## 1. Kenapa dashboard Vercel tidak bisa dipakai

- **Vercel Settings → Redirects** menampilkan *"Unlock project-level redirects — Upgrade your
  plan to Pro"* → fitur UI dashboard itu memang terkunci di plan **Hobby**.
- **Tapi** redirect via file config (**`vercel.json`** / **`next.config`**) TETAP didukung di
  Hobby — pricing Vercel resmi: `Redirects: hobby Included`.
- Jadi solusi di bawah memakai config file, bukan dashboard.

## 2. Opsi A — Redirect 301 via config repo lama (Rekomendasi)

Efek: `syahrworks.vercel.app/*` → `https://syahrworks.com/*` (308/301 permanen). Arsip tetap
hidup, link lama tetap berfungsi, dan sinyal diteruskan ke domain baru.

**Langkah (di repo `D:\A-Projek\Web\next-portfolio`):**

1. Buka `next.config.js` dan **tambahkan** blok `redirects()` (pertahankan konfigurasi yang ada):

   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     experimental: {
       appDir: true,
     },
     images: {
       domains: ['img.icons8.com', 'raw.githubusercontent.com', 'cdn.jsdelivr.net']
     },
     async redirects() {
       return [
         {
           source: '/:path*',
           destination: 'https://syahrworks.com/:path*',
           permanent: true,
         },
       ];
     },
   }

   module.exports = nextConfig
   ```

2. Commit & push ke `github.com/rohmansyah23/next-portofolio` (remote: `git@github.com:rohmansyah23/next-portofolio.git`).
   Repo sudah terhubung Vercel → auto-deploy.
   - Jika auto-deploy tidak jalan, deploy manual: Vercel Dashboard → project → Deployments → Redeploy.
3. Verifikasi setelah deploy (±1–2 menit):

   ```sh
   curl -s -o NUL -w '%{http_code} %{redirect_url}' https://syahrworks.vercel.app
   # Harapannya: 308 https://syahrworks.com/  (atau 301)

   curl -s -o NUL -w '%{http_code} %{redirect_url}' https://syahrworks.vercel.app/en
   # Harapannya: 308 https://syahrworks.com/en
   ```

## 3. Opsi B — Hapus project Vercel lama (Simpel)

Efek: `syahrworks.vercel.app` mati total (404). Menghilangkan duplikat, TAPI semua link lama yang
menunjuk vercel.app ikut mati dan **tidak** meneruskan sinyal ke domain baru.

**Langkah:**
1. Vercel Dashboard → project `syahrworks` → **Settings** → **Danger Zone** → **Delete Project**.
2. Konfirmasi hapus.

> Pilih opsi ini hanya jika arsip/versi lama memang tidak butuh diakses lagi.

## 4. Ringkasan

| Opsi | vercel.app | Link lama | Sinyal ke syahrworks.com | Usaha |
| --- | --- | --- | --- | --- |
| **A. Redirect config** | Hidup (308 → syahrworks.com) | Berfungsi | Diteruskan | Edit 1 file repo lama + push |
| **B. Delete project** | Mati (404) | Putus | Tidak | Klik Delete |

**Rekomendasi: Opsi A.** Dilakukan setidaknya setelah Request Indexing GSC (`docs/SEO.md` §3.1).
