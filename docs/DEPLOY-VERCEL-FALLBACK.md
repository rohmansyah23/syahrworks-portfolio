# DEPLOY-VERCEL-FALLBACK.md — Fallback Deploy ke Vercel

Runbook lengkap untuk memindahkan hosting **sementara** dari VPS ke **Vercel**
jika VPS habis masa aktif (bayar bulanan), **tanpa mengganti domain** `https://syahrworks.com`.

> Dokumen ini dibaca oleh coding agent/sesi lain. Lihat juga `docs/DEPLOY.md`
> untuk kondisi hosting normal (VPS).

---

## 1. Kapan Dokumen Ini Dipakai

- VPS `103.160.213.205` mati/habis masa aktif, belum/tidak diperpanjang.
- Site harus tetap live di `https://syahrworks.com` tanpa downtime lama.
- Fallback bersifat **sementara**; saat VPS hidup lagi, balik ke alur normal
  (`docs/DEPLOY.md`).

## 2. Fakta Kondisi Saat Ini (Verifikasi Terakhir)

| Item | Nilai |
| --- | --- |
| **Produksi normal** | VPS `103.160.213.205` (service `syahrworks`) |
| **Domain** | `https://syahrworks.com` (digunakan di `data/en/site.ts` & `data/id/site.ts`) |
| **Project Vercel** | `syahrworks` (folder lokal sudah tertaut: `.vercel/project.json` → `prj_2kTVZhzQ265rfEADgkE464vW4n8d`, org `team_JCdpMZ052Jo2pdD57rs4RLTh`) |
| **URL Vercel bawaan** | `https://syahrworks.vercel.app` — masih live menyajikan kode repo ini |
| **DNS** | Dikelola **Dewabiz** (NS `ns1-4.dewabiz.co.id`) |
| **A record saat ini** | `@` → `103.160.213.205`, `www` → `103.160.213.205` |
| **MX record** | Tidak ada → memindah A record **tidak** merusak email |
| **Kesediaan kode** | Next.js 16 tanpa `output: "export"` → berjalan normal sebagai Node server di Vercel, **tanpa ubah kode** |
| **Sitemap/robots** | Sudah pakai `https://syahrworks.com` → tidak perlu diubah |

## 3. Kebutuhan Env di Vercel

Vercel tidak memakai `.env.production` dari VPS. Set **Environment Variables** di
Project Settings → Environment Variables:

| Variabel | Wajib? | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | **Ya (build-time)** | `https://formspree.io/f/xdaqpdrl` — dibutuhkan saat `npm run build` |
| `GITHUB_API_TOKEN` | Opsional | Server-only, untuk GitHub Pinned Repos |

Aktifkan untuk environment **Production** (dan Preview jika perlu).

## 4. Cara Deploy ke Vercel (Pilih Salah Satu)

### Jalur A — Integrasi Git Vercel (Recommended)

1. Buka https://vercel.com → login dengan akun pemilik project `syahrworks`.
2. **Add New Project** → pilih repo `rohmansyah23/syahrworks-portfolio`
   (hubungkan akun GitHub dulu jika belum).
3. Pilih **existing project** `syahrworks` (jangan buat project baru).
4. Pada **Environment Variables**, masukkan variabel dari §3.
5. **Deploy**. Vercel akan auto-deploy setiap push ke `master`
   (paralel dengan workflow VPS `deploy.yml` selama VPS masih hidup).
6. Setelah deploy sukses, lanjut ke §5 (pindah DNS).

### Jalur B — Vercel CLI

1. Install & login:
   ```sh
   npm i -g vercel
   vercel login
   ```
2. Folder sudah tertaut ke project `syahrworks` (ada `.vercel/project.json`);
   kalau perlu: `vercel link` → pilih `syahrworks`.
3. Tarik & set env (sekali saja):
   ```sh
   vercel pull --environment=production
   vercel env add NEXT_PUBLIC_FORMSPREE_ENDPOINT production
   vercel env add GITHUB_API_TOKEN production
   ```
4. Deploy produksi:
   ```sh
   vercel deploy --prod
   ```
5. Lanjut ke §5.

## 5. Pindahkan Domain `syahrworks.com` ke Vercel

1. **Add domain di Vercel**: Project Settings → Domains → tambahkan
   `syahrworks.com` dan `www.syahrworks.com`.
2. Vercel akan minta verifikasi kepemilikan domain → salin nilai TXT
   `verification` yang diberikan.
3. **Di panel Dewabiz** (`ns1-4.dewabiz.co.id`), ubah record:
   | Record | Type | Target |
   | --- | --- | --- |
   | `@` (apex) | A | `76.76.21.21` (IP apex Vercel) |
   | `www` | A | `76.76.21.21` |
   | *(opsional)* | CNAME | `cname.vercel-dns.com` untuk `www` |
4. Tambahkan TXT `verification` sesuai langkah 2, lalu hapus setelah terverifikasi.
5. Tunggu propagasi DNS (menit–jam). Cek:
   ```sh
   Resolve-DnsName syahrworks.com | Select-Object Name,Type,IPAddress
   # target: 76.76.21.21
   ```
6. Pastikan `https://syahrworks.com` memuat (bisa paksa lewat browser/incognito).

> Saat DNS pindah, pastikan hanya **satu** sumber deploy yang aktif memegang
> `master` (pilih: Vercel Git Integration atau workflow VPS). Jangan biarkan
> keduanya aktif agar tidak terjadi race deploy.

## 6. Rollback / Kembali ke VPS

Saat VPS diperpanjang dan siap lagi:

1. Pastikan service VPS jalan: `ssh syahrworks` → `sudo systemctl status syahrworks`.
2. Pastikan kode di VPS terbaru: push `master` terbaru → workflow `deploy.yml`
   akan `git pull`, build, restart (`gh run list` untuk cek).
3. **Di panel Dewabiz**, kembalikan record:
   | Record | Type | Target |
   | --- | --- | --- |
   | `@` (apex) | A | `103.160.213.205` |
   | `www` | A | `103.160.213.205` |
4. Tunggu propagasi, verifikasi `https://syahrworks.com` kembali ke VPS.
5. (Opsional) Hapus/arsipkan domain dari Vercel agar tidak bentrok.

## 7. Checklist Verifikasi Fallback

- [ ] `npm run lint` dan `npm run build` LOLOS sebelum deploy.
- [ ] Env `NEXT_PUBLIC_FORMSPREE_ENDPOINT` terpasang di Vercel (Production).
- [ ] `https://syahrworks.vercel.app` menampilkan kode terbaru.
- [ ] Domain `syahrworks.com` + `www` terverifikasi di panel Vercel.
- [ ] A record di Dewabiz sudah menunjuk `76.76.21.21`.
- [ ] `https://syahrworks.com` live; form kontak, Pinned Repos, dan halaman blog berfungsi.
- [ ] `gh run list` (jika pakai Git Integration) menunjukkan deploy `success`.
