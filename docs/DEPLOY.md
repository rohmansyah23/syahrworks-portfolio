# DEPLOY.md — Hosting & Deploy Produksi

Dokumen ini menjelaskan di mana dan bagaimana proyek ini di-hosting.
Dibaca oleh coding agent/sesi lain agar paham status produksi sebelum melakukan perubahan.

## Ringkasan Status

| Item | Nilai |
| --- | --- |
| **URL produksi** | `https://syahrworks.com` |
| **Hosting** | **Vercel** (permanen, pindah dari VPS pada Okt 2026 — VPS tidak dilanjutkan) |
| **Project Vercel** | `syahrworks` (`prj_2kTVZhzQ265rfEADgkE464vW4n8d`, org `team_JCdpMZ052Jo2pdD57rs4RLTh`) |
| **URL Vercel bawaan** | `https://syahrworks.vercel.app` |
| **Auto-deploy** | Vercel Git Integration — setiap `git push origin master` |
| **Repo deploy** | `rohmansyah23/syahrworks-portfolio` (remote `origin`) |
| **DNS** | Registrar **Dewabiz**: A `@` → `216.198.79.1` (edge Vercel), `www` → CNAME `c6777fdd1dc1acde.vercel-dns-017.com.` (fallback sah: `www` A → `216.198.79.1`), TXT verifikasi GSC (detail: [§ Konfigurasi DNS](#konfigurasi-dns-registrar-dewabiz)) |

> **Riwayat:** sebelumnya hosting di VPS `103.160.213.205` (service `syahrworks`)
> via workflow `.github/workflows/deploy.yml`. Workflow tersebut sudah **dihapus**
> (Okt 2026) dan runbook `docs/DEPLOY-VERCEL-FALLBACK.md` sudah dieksekusi
> penuh — statusnya arsip, bukan rencana lagi.

## Alur Deploy Otomatis

Setiap `git push origin master` memicu deploy Vercel (Git Integration):

1. Vercel mendeteksi push ke branch `master` di repo `rohmansyah23/syahrworks-portfolio`.
2. `npm ci` → `npm run build` di infrastruktur Vercel.
3. Env diambil dari Project Settings → Environment Variables (bukan dari repo):
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` — wajib (build-time)
   - `GITHUB_API_TOKEN` — opsional, server-only untuk Pinned Repos
4. Deploy sukses → live di `https://syahrworks.vercel.app` dan `https://syahrworks.com`.

## Implikasi untuk Coding Agent (WAJIB BACA)

- **Push ke `master` (via `git push origin master`) = langsung masuk produksi.** Jangan push hasil setengah
  jadi/sedang broken; pastikan `npm run lint` dan `npm run build` LOLOS dulu.
- Untuk mengecek status deploy: dashboard Vercel project `syahrworks` → Deployments.
- **Tidak ada lagi workflow GitHub Actions.** Direktori `.github/workflows/` sengaja dikosongkan.
  Jangan membuat ulang `deploy.yml` VPS tanpa konfirmasi user.
- Remote tunggal: `origin` → **`rohmansyah23/syahrworks-portfolio`**.

## Konfigurasi DNS (Registrar Dewabiz)

Domain dikelola di **Dewabiz**: https://my.dewabiz.com/clientarea.php?action=domaindns

### Record aktif

| Host | Tipe | Nilai | Keterangan |
| --- | --- | --- | --- |
| `@` | A | `216.198.79.1` | Root domain → edge Vercel (IP baru rekomendasi Vercel; legacy `76.76.21.21` tetap jalan) |
| `www` | CNAME | `c6777fdd1dc1acde.vercel-dns-017.com.` | Subdomain www → Vercel (fallback sah jika panel menolak CNAME: `www` A → `216.198.79.1`) |
| `@` | TXT | `google-site-verification=XwwdKNvthYP9Cxubcnhzhlqakn7dAaQ-vLgF2A1agO4` | Verifikasi Google Search Console |

### Catatan penting

- **Label "SPF (txt)" di UI Dewabiz = TXT record asli.** Opsi `<option value="TXT">SPF (txt)</option>`
  menulis **TXT record polos** — aman untuk verifikasi GSC. Jangan dipakai untuk SPF email
  sungguhan (itu harus `v=spf1 ...`).
- **Token harus PERSIS** dengan meta tag di `app/[lang]/layout.tsx` (`verification.google`).
  Nilai terpotong/salah huruf → verifikasi GSC gagal.
- Metode verifikasi GSC: **meta tag** (URL-prefix property, sudah aktif) **dan** TXT DNS
  (memungkinkan **Domain property** — mencakup http/https + www sekaligus).
- `www` & non-`www` sama-sama live; konsolidasi **308 `www → non-www` terpasang**
  via `redirects()` di `next.config.ts` (berlaku otomatis di Vercel).
- Panel Dewabiz kadang menolak save saat `www` punya A + CNAME sekaligus, atau saat
  Type masih `A` tapi Address diisi hostname. Solusi: edit Type jadi `CNAME (Alias)`
  dulu, atau fallback ke `www` A → `216.198.79.1` saja. Detail insiden: lihat
  `docs/DEPLOY-VERCEL-FALLBACK.md` §5.
- **JANGAN** menambah record SPF/MX terpisah tanpa kebutuhan email yang nyata.

### Cek propagasi

```sh
nslookup -type=A   syahrworks.com 8.8.8.8   # harus 216.198.79.1
nslookup -type=CNAME www.syahrworks.com 8.8.8.8  # harus ...vercel-dns-017.com (atau A 216.198.79.1 bila pakai fallback)
nslookup -type=TXT syahrworks.com 8.8.8.8   # harus menampilkan google-site-verification=...
```

## Arsip: Fallback ke Vercel

Migrasi dari VPS ke Vercel sudah selesai permanen (Okt 2026). Runbook
**`docs/DEPLOY-VERCEL-FALLBACK.md`** dipertahankan sebagai arsip jejak migrasi
(cara deploy, pemindahan DNS, pelajaran panel Dewabiz). Tidak ada rollback ke VPS.

## Verifikasi

- [ ] `https://syahrworks.com` merespons (A record → `216.198.79.1`).
- [ ] `https://www.syahrworks.com` 308 redirect ke non-www.
- [ ] Dashboard Vercel project `syahrworks` menunjukkan deployment `Ready` untuk commit terakhir di `master`.
- [ ] Konten di produksi sesuai HEAD `master` lokal.
- [ ] DNS: A `@` → `216.198.79.1`, `www` CNAME (atau A fallback), dan TXT verifikasi GSC.
