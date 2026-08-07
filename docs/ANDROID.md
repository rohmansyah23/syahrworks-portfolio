# ANDROID — Aturan Build di Android/Termux (Fast Build Mirror)

> **Status:** ✅ BERLAKU — dibuat 7 Aug 2026. Berlaku untuk semua agent/perintah yang menjalankan npm di perangkat Android (Termux).
> **Inti:** **DILARANG** menjalankan npm (`install`, `lint`, `build`, `dev`) langsung di `/storage/emulated/0`. Semua operasi npm harus lewat mirror di filesystem internal via `scripts/android-build.sh`.

---

## 1. Mengapa? (Root Cause)

| Fakta | Dampak |
|---|---|
| `/storage/emulated/0` adalah filesystem **FUSE** (emulasi Android) | **Tidak mendukung symlink** → `node_modules/.bin` tidak pernah terbentuk; npm hang |
| `node_modules` project ± **524 MB / 28.000 file** | Setiap operasi file di FUSE sangat lambat — `rm -rf node_modules` bisa >30 menit dan tidak kunjung selesai |
| `~/` (`/data/data/com.termux/files/home`) = internal **ext4/f2fs** | Cepat, symlink OK — npm install 486 paket hanya **±20 detik** |
| `~/.npmrc` global berisi `bin-links=false` | npm tidak membuat `.bin` secara default → **wajib override `--bin-links=true`** |
| Termux tidak punya `/usr/bin/env` | Shebang `#!/usr/bin/env node` gagal → jalankan eslint/next via `node <path>` |
| FUSE tidak mengikuti `chmod +x` (noexec) | Script tidak bisa dijalankan `./script` → **wajib panggil `bash scripts/android-build.sh ...`** |
| Turbopack tidak mendukung android/arm64 | Build wajib `next build --webpack` |

## 2. Arsitektur "Fast Build Mirror"

```
/storage/emulated/0/code/syahrworks-portfolio   ← repo asli (git + edit)
~/build/syahrworks-portfolio                    ← mirror build (node_modules + hasil build)
```

- **Source of truth = repo asli** di `/storage/emulated/0` (git, editing, komit).
- **Mirror = hanya untuk npm** (install/lint/build/dev). Di-sync dari source saat dibutuhkan.
- `.gitignore` sudah mengabaikan `node_modules/`, `.next/` → mirror tidak pernah masuk git.

## 3. Perintah Baku

```bash
bash scripts/android-build.sh sync      # salin source → mirror (tar, ±30MB, detik)
bash scripts/android-build.sh install   # npm install --bin-links=true di mirror
bash scripts/android-build.sh lint      # eslint di mirror (0 error target)
bash scripts/android-build.sh build     # next build --webpack di mirror
bash scripts/android-build.sh dev       # next dev --webpack di mirror (port 3000)
bash scripts/android-build.sh all       # sync + install(bila perlu) + lint + build
```

Script otomatis menangani: override `--bin-links=true`, pemanggilan via `node` (shebang), `--webpack`, dan **workaround `app/layout.tsx` (hanya di mirror)** untuk isu root-layout yang hanya terjadi di build webpack.

### Soal workaround `app/layout.tsx` (penting)

- Repo asli **tidak punya** `app/layout.tsx` — root layout-nya adalah `[lang]/layout.tsx` (berisi `<html lang={locale}>`).
- Turbopack (Vercel/deploy normal) menerima struktur itu, tetapi **webpack (android) menolak**: `page.tsx doesn't have a root layout`.
- Solusi: script membuat `app/layout.tsx` minimal (fragment passthrough) **di mirror saja** — repo asli dan deploy Vercel tidak tersentuh.
- Jika suatu saat repo asli menambahkan `app/layout.tsx` asli, file mirror akan otomatis tertimpa oleh versi repo (aman).

## 4. Aturan Wajib (Hard Rules)

1. **JANGAN** jalankan `npm install`, `npm run build`, `npm run lint`, `npm run dev` di `/storage/emulated/0`.
2. **JANGAN** `rm -rf node_modules` di `/storage/emulated/0` — lambat & bisa tampak hang.
3. **JANGAN** hapus/ubah `~/.npmrc` global tanpa persetujuan user (itu konfigurasi bersama).
4. Semua verifikasi (lint/build) yang disebut checklist AGENTS.md → jalankan via `scripts/android-build.sh`.
5. Setiap kali source berubah dan akan di-build/dev → jalankan `sync` dulu (mirror tidak ikut berubah otomatis).
6. **Untuk `dev`:** server berjalan dari mirror; edit dilakukan di repo asli. Setelah edit, `sync` lalu restart dev (hot-reload hanya berlaku untuk file yang sudah ada di mirror).

## 5. Ekspektasi Waktu (normal, filesystem internal)

| Operasi | Waktu |
|---|---|
| `sync` | detik (±30MB, hanya source) |
| `install` (pertama kali / cache hangat) | ±20–30 detik |
| `lint` | ±10–20 detik |
| `build --webpack` | ±1–2 menit |
| `dev` | start ±30 detik, lalu berjalan |

> **Catatan `dev`:** di perangkat Android, `next dev --webpack` memakai kompilasi WASM sehingga **kompilasi pertama sangat lambat** (bisa >1 menit, halaman tampak "compiling"). Wajar — bukan error. `build` jauh lebih andal dipakai sebagai verifikasi utama; gunakan `dev` hanya bila benar-benar butuh preview interaktif.

## 6. Troubleshooting

| Gejala | Penyebab | Solusi |
|---|---|---|
| npm install "hang" tanpa output | Berjalan di FUSE / proses ganda | Kill proses, pakai mirror |
| `eslint: not found` / `next: not found` | Shebang `/usr/bin/env` tak ada di Termux | Pakai script (memanggil via `node`) |
| `Turbopack is not supported on this platform` | android/arm64 | Pakai `build --webpack` |
| `page.tsx doesn't have a root layout` | Repo tanpa `app/layout.tsx` (webpack ketat) | Pakai script (otomatis buat workaround di mirror) |
| `Permission denied` saat `./script` | FUSE noexec | Panggil dengan `bash scripts/android-build.sh ...` |
| `.bin` kosong setelah install | `~/.npmrc` `bin-links=false` | Pastikan install via script (`--bin-links=true`) |
| Perubahan edit tidak muncul di dev | Edit di source, dev di mirror | `sync` + restart dev |

## 7. Catatan untuk Agent (opencode/CLI)

- Saat user minta "build/lint/test" di sesi Android → selalu gunakan `scripts/android-build.sh`, jangan `npm run *` langsung.
- Jangan pernah mencoba memperbaiki node_modules di `/storage/emulated/0` dengan `npm install` ulang di tempat itu.
- Jika `node_modules` di mirror bermasalah, cukup `rm -rf ~/build/syahrworks-portfolio/node_modules` (internal, cepat) lalu `install` ulang.
