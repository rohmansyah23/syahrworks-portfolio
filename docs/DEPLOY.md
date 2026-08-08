# DEPLOY.md — Hosting & Deploy Produksi

Dokumen ini menjelaskan di mana dan bagaimana proyek ini di-hosting.
Dibaca oleh coding agent/sesi lain agar paham status produksi sebelum melakukan perubahan.

## Ringkasan Status

| Item | Nilai |
| --- | --- |
| **URL produksi** | `https://syahrworks.com` |
| **Hosting** | VPS pribadi (bukan Vercel) |
| **IP VPS** | `103.160.213.205` |
| **Service systemd** | `syahrworks` |
| **Path di server** | `/home/deploy/syahrworks-portfolio` |
| **Auto-deploy** | GitHub Actions `.github/workflows/deploy.yml` |
| **Pemicu deploy** | push ke branch `master` (atau `workflow_dispatch` manual) |
| **DNS** | A record `syahrworks.com` → `103.160.213.205` |

> **Catatan penting:** `syahrworks.vercel.app` adalah domain **arsip/versi lama**
> (repo `rohmansyah23/next-portofolio`). Proyek ini sudah pindah ke VPS dengan
> domain sendiri `syahrworks.com`. Jangan menyebut/mengarahkan deploy ke Vercel.

## Alur Deploy Otomatis

Setiap push ke `master` memicu workflow `Deploy to VPS` (`.github/workflows/deploy.yml`):

1. SSH ke VPS (`appleboy/ssh-action`) menggunakan secret `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`.
2. `cd /home/deploy/syahrworks-portfolio && git pull origin master`.
3. Tulis `.env.production` dari GitHub Secrets (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`, `GH_API_TOKEN`).
4. `npm ci` → `npm run build`.
5. `sudo systemctl restart syahrworks`.

GitHub Secrets yang dipakai workflow:

- `VPS_HOST` — IP VPS
- `VPS_USER` — user deploy di VPS
- `VPS_SSH_KEY` — private key SSH untuk deploy ke VPS
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` — endpoint form kontak
- `GH_API_TOKEN` — token GitHub API (opsional, untuk Pinned Repos)

## Implikasi untuk Coding Agent (WAJIB BACA)

- **Push ke `master` = langsung masuk produksi.** Jangan push hasil setengah
  jadi/sedang broken; pastikan `npm run lint` dan `npm run build` LOLOS dulu.
- Untuk mengecek status deploy terbaru: `gh run list`.
- Untuk memicu deploy ulang manual (tanpa push): jalankan workflow
  `Deploy to VPS` via `gh workflow run deploy.yml`.
- Remote git sekarang **HTTPS** (`https://github.com/rohmansyah23/syahrworks-portfolio.git`),
  karena SSH key GitHub tidak terpasang di mesin dev. Autentikasi push via `gh` CLI
  (token scope `repo`). Jangan ganti remote kembali ke `git@github.com:` tanpa memastikan
  SSH key GitHub valid.

## SSH ke VPS (untuk troubleshooting)

Entry sudah ada di `~/.ssh/config`:

```sh
ssh syahrworks        # user: deploy → /home/deploy/syahrworks-portfolio
ssh syahrworks-root   # user: root
```

Perintah cek service: `sudo systemctl status syahrworks` · log: `journalctl -u syahrworks -f`.

## Verifikasi

- [ ] `https://syahrworks.com` merespons (A record → `103.160.213.205`).
- [ ] `gh run list` menunjukkan workflow "Deploy to VPS" `success` untuk commit terakhir di `master`.
- [ ] Konten di produksi sesuai HEAD `master` lokal.
