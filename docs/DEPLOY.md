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
| **Pemicu deploy** | `git push upstream master` (atau `workflow_dispatch` manual) |
| **DNS** | Registrar **Dewabiz**: A `@` & `www` → `103.160.213.205`, TXT verifikasi GSC (detail: [§ Konfigurasi DNS](#konfigurasi-dns-registrar-dewabiz)) |

> **Catatan penting:** `syahrworks.vercel.app` adalah domain **arsip/versi lama**
> (repo `rohmansyah23/next-portofolio`). Proyek ini sudah pindah ke VPS dengan
> domain sendiri `syahrworks.com`. Jangan menyebut/mengarahkan deploy ke Vercel.

## Alur Deploy Otomatis

Setiap `git push upstream master` memicu workflow `Deploy to VPS` (`.github/workflows/deploy.yml`):

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

- **Push ke `master` (via `git push upstream master`) = langsung masuk produksi.** Jangan push hasil setengah
  jadi/sedang broken; pastikan `npm run lint` dan `npm run build` LOLOS dulu.
- Untuk mengecek status deploy terbaru: `gh run list`.
- Untuk memicu deploy ulang manual (tanpa push): jalankan workflow
  `Deploy to VPS` via `gh workflow run deploy.yml`.
- **Push deploy WAJIB via `git push upstream master`.** Repo lokal punya **2 remote**:
  - `origin` → fork **`syahrworks/syahrworks-portfolio`** (milik akun aktif).
  - `upstream` → repo deploy **`rohmansyah23/syahrworks-portfolio`** (tempat workflow
    `Deploy to VPS` aktif & sumber `git pull` di VPS).
  - `git push origin master` HANYA meng-update fork — **tidak** memicu deploy.
  - Akun `gh` aktif: **`syahrworks`** (HTTPS, token scope `repo`). Sudah menjadi
    collaborator dengan akses **write** di `rohmansyah23/syahrworks-portfolio`,
    sehingga push ke `upstream` diperbolehkan. Jangan ganti remote ke `git@github.com:`
    tanpa SSH key GitHub yang valid.

## SSH ke VPS (untuk troubleshooting)

Entry sudah ada di `~/.ssh/config`:

```sh
ssh syahrworks        # user: deploy → /home/deploy/syahrworks-portfolio
ssh syahrworks-root   # user: root
```

Perintah cek service: `sudo systemctl status syahrworks` · log: `journalctl -u syahrworks -f`.

## Konfigurasi DNS (Registrar Dewabiz)

Domain dikelola di **Dewabiz**: https://my.dewabiz.com/clientarea.php?action=domaindns

### Record aktif (terverifikasi propagasi global via 8.8.8.8 & 1.1.1.1)

| Host | Tipe | Nilai | Keterangan |
| --- | --- | --- | --- |
| `@` | A | `103.160.213.205` | Root domain → IP VPS |
| `www` | A | `103.160.213.205` | Subdomain www → IP VPS |
| `@` | TXT | `google-site-verification=XwwdKNvthYP9Cxubcnhzhlqakn7dAaQ-vLgF2A1agO4` | Verifikasi Google Search Console |

### Catatan penting

- **Label "SPF (txt)" di UI Dewabiz = TXT record asli.** Opsi `<option value="TXT">SPF (txt)</option>`
  menulis **TXT record polos** — aman untuk verifikasi GSC. Jangan dipakai untuk SPF email
  sungguhan (itu harus `v=spf1 ...`).
- **Token harus PERSIS** dengan meta tag di `app/[lang]/layout.tsx` (`verification.google`).
  Nilai terpotong/salah huruf → verifikasi GSC gagal.
- Metode verifikasi GSC: **meta tag** (URL-prefix property, sudah aktif) **dan** TXT DNS
  (memungkinkan **Domain property** — mencakup http/https + www sekaligus).
- `www` & non-`www` sama-sama live; konsolidasi **308 `www → non-www` sudah terpasang**
  via `redirects()` di `next.config.ts` (auto-deploy tiap `git push upstream master`). Sisa tugas
  manual hanya GSC/Vercel (lihat `docs/SEO.md` §3.2).
- **JANGAN** menambah record SPF/MX terpisah tanpa kebutuhan email yang nyata.

### Cek propagasi

```sh
nslookup -type=A   syahrworks.com 8.8.8.8   # harus 103.160.213.205
nslookup -type=TXT syahrworks.com 8.8.8.8   # harus menampilkan google-site-verification=...
```

## Fallback ke Vercel (Sementara)

Jika VPS habis masa aktif dan harus dipindah **sementara** ke Vercel tanpa
mengganti domain `syahrworks.com`, ikuti runbook lengkap di
**`docs/DEPLOY-VERCEL-FALLBACK.md`** (cara deploy, pindah DNS di Dewabiz ke IP
Vercel `76.76.21.21`, dan rollback balik ke VPS).

## Verifikasi

- [ ] `https://syahrworks.com` merespons (A record → `103.160.213.205`).
- [ ] `gh run list -R rohmansyah23/syahrworks-portfolio` menunjukkan workflow "Deploy to VPS" `success` untuk commit terakhir di `master`.
- [ ] Konten di produksi sesuai HEAD `master` lokal.
- [ ] DNS: A `@`/`www` → `103.160.213.205` dan TXT verifikasi GSC (lihat [§ Konfigurasi DNS](#konfigurasi-dns-registrar-dewabiz)).
