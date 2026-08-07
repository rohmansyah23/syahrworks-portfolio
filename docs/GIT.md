# GIT — Panduan Git dari Pemula hingga Recovery

> **Status:** ✅ AKTIF — dibuat 7 Aug 2026.
> **Untuk siapa:** siapa saja yang ingin belajar Git — dari yang belum pernah pakai sampai yang butuh memulihkan commit "hilang".
> **Cara pakai:** mulai dari Level 1 jika baru. Level 2 untuk kerja tim / riwayat yang rapi. Level 3 dipakai saat-saat genting saja — tidak perlu dihafal semua.
> **Bahasa:** Bahasa Indonesia. Istilah teknis (staging, commit, rebase, HEAD) sengaja dibiarkan English karena itu kosakata standar di dunia kerja.

---

## Mengapa Git Penting?

Git adalah alat untuk mencatat **setiap perubahan** kode kamu secara kronologis. Bayangkan seperti "save point" di game: kapan saja kamu bisa mundur ke kondisi sebelumnya kalau ada yang rusak. Bedanya, Git juga bisa dipakai ramai-ramai tanpa saling menimpa — itulah yang membuatnya jadi standar industri.

Dokumen ini dibagi tiga level, sesuai kebutuhan:

| Level | Kamu bisa apa setelahnya |
|---|---|
| 1 — Pemula | Menyimpan & menelusuri riwayat kerja sendiri, mencoba-coba tanpa takut |
| 2 — Menengah | Kerja tim, riwayat yang rapi, bikin Pull Request yang gampang di-review |
| 3 — Recovery | Memperbaiki kesalahan — termasuk commit yang sepertinya sudah "hilang" |

---

## Level 1 — Pemula (Dasar Workflow Harian)

### 1.1 Setup Pertama Kali

Setelah menginstal Git, beri tahu siapa kamu. Ini yang akan tercatat di setiap commit.

```bash
git config --global user.name "Muhammad Rohman Syah"
git config --global user.email "syahr642@users.noreply.github.com"
```

- `--global` berlaku untuk semua project di komputer. Tanpa `--global`, hanya untuk project saat ini.
- Beberapa perintah berguna:
  - `git config --list` — melihat semua konfigurasi.
  - `git config --global core.editor "code --wait"` — editor default saat Git butuh menulis pesan.
  - `git config --global init.defaultBranch main` — nama branch bawaan jadi `main` (bukan `master`).

**Kesalahan umum:** lupa set `user.email` → Git menolak commit dengan pesan "Please tell me who you are". Tinggal jalankan perintah di atas.

### 1.2 Memulai Project

```bash
git init                # jadikan folder saat ini sebuah repo
git clone <url>         # salin repo dari GitHub ke komputer
```

Contoh nyata:

```bash
git clone https://github.com/rohmansyah23/syahrworks-portfolio.git
```

Hasilnya folder `syahrworks-portfolio` berisi seluruh file + riwayat repo. `git init` kamu pakai kalau memulai project dari nol di folder kosong.

### 1.3 Siklus Dasar: Status → Add → Commit

Siklus harian paling inti. Pahami tiga area: **working tree** (file di disk), **staging** (daftar perubahan yang siap disimpan), dan **commit** (perubahan yang sudah tercatat permanen).

```bash
git status              # lihat kondisi: file apa yang berubah?
git add <file>          # masukkan file ke staging
git add .               # masukkan semua file berubah ke staging
git commit -m "pesan"   # simpan perubahan staging jadi satu commit
```

Contoh nyata — kamu baru mengubah `data/en/blog.ts`:

```bash
git status
#   modified:   data/en/blog.ts
git add data/en/blog.ts
git commit -m "feat(blog): tambah artikel panduan git"
```

**Aturan pesan commit yang baik:** ringkas, diawali kata kerja. Pola `type(scope): deskripsi` (mis. `fix(home): perbaiki heading terpotong di layar sempit`) adalah konvensi yang dipakai banyak tim dan mudah dibaca di riwayat.

### 1.4 Melihat Riwayat

```bash
git log                 # daftar commit terbaru ke terlama
git log --oneline       # versi ringkas, 1 baris per commit
git log --oneline -5    # hanya 5 commit terakhir
git show <commit>       # detail satu commit: file apa & perubahannya
```

Contoh nyata:

```bash
git log --oneline -3
# e398713 feat: cover gambar AI untuk 2 blog post
# 6f03815 feat(home): Pinned Repos tampilkan fork count
# 39d44e0 Revert "feat: StackBackdrop logo tech hierarki mastery"
```

### 1.5 Melihat Perubahan (Diff)

Sebelum commit, cek dulu apa saja yang berubah:

```bash
git diff                # perubahan yang BELUM di-stage
git diff --staged       # perubahan yang SUDAH di-stage (siap commit)
```

### 1.6 Menyimpan Perubahan Sebagian

Tidak semua perubahan harus masuk satu commit. `git add -p` membiarkan kamu memilih bagian demi bagian:

```bash
git add -p              # Git menampilkan tiap potongan, jawab y/n/s
```

Kegunaannya: commit "perbaiki typo" terpisah dari "tambah fitur baru" — riwayat jadi mudah dibaca siapa pun, termasuk dirimu sendiri tiga bulan kemudian.

### 1.7 Mengabaikan File (.gitignore)

File seperti `node_modules/`, `.env`, dan hasil build **tidak boleh** masuk riwayat. Buat file `.gitignore`:

```gitignore
node_modules/
.env
.next/
```

`.env` dilarang di-commit karena bisa berisi rahasia (token API, password). Kalau project kamu butuh contoh, buat `.env.example` yang berisi nama variabel tanpa nilainya.

### 1.8 Mengulang / Membatalkan Perubahan (Dasar)

Ada tiga operasi pembatalan, masing-masing dengan tempatnya:

```bash
git restore <file>            # buang perubahan di working tree (file kembali seperti commit terakhir)
git restore --staged <file>   # keluarkan file dari staging, TAPI perubahan tetap ada
git revert <commit>           # bikin commit BARU yang membalik perubahan commit lama
```

Contoh nyata — kamu salah stage sebuah file:

```bash
git add data/projects.ts   # oops, belum selesai diedit
git restore --staged data/projects.ts   # file keluar dari staging, isinya tetap utuh
```

**Penting:** `git revert` aman untuk commit yang sudah di-push. Commit lama tetap ada di riwayat, ditambah commit baru yang membatalkannya. Ini cara yang benar untuk "membatalkan" pekerjaan orang lain di repo bersama — bukan menulis ulang riwayat.

### 1.9 Branch Pertama

Branch = "jalur kerja paralel". Kamu bisa mengerjakan fitur baru di jalur sendiri tanpa mengganggu jalur utama (`main`).

```bash
git branch               # daftar branch
git branch <nama>        # buat branch baru
git checkout <nama>      # pindah ke branch itu
git checkout -b <nama>   # buat + langsung pindah (paling sering dipakai)
git merge <nama>         # gabungkan branch lain ke branch sekarang
```

Contoh nyata — ingin bikin eksperimen tanpa merusak `main`:

```bash
git checkout -b eksperimen-navbar
# ...ubah beberapa file...
git add .
git commit -m "coba: navbar transparan"
git checkout main
git merge eksperimen-navbar   # gabungkan hasilnya ke main
```

### 1.10 Remote: Hubungan ke GitHub

```bash
git remote add origin <url>   # daftarkan remote pertama
git remote -v                 # lihat daftar remote
git push origin <branch>      # kirim commit lokal ke GitHub
git pull origin <branch>      # ambil perubahan dari GitHub
git fetch origin              # ambil info remote TANPA menggabungkan
```

Saat pertama kali push branch baru, gunakan `-u` agar Git mengingat hubungannya:

```bash
git push -u origin fitur-login
# commit berikutnya cukup: git push
```

### 1.11 Skenario: Satu Hari Kerja dengan Git

Semua perintah di atas disatukan dalam alur nyata:

```bash
# Pagi: lanjut kerja dari repo yang sudah ada
git pull origin main

# Kerjakan satu perbaikan kecil
git checkout -b fix/typo-hero
# ...edit file...
git add -p
git commit -m "fix(home): perbaiki typo di judul hero"
git push -u origin fix/typo-hero

# Bikin Pull Request di GitHub dari branch ini ke main
# Reviewer bilang "ganti dikit"
# ...edit lagi...
git add .
git commit -m "fix(home): sesuaikan ukuran heading sesuai review"
git push

# Setelah PR di-merge, bersihkan branch lokal
git checkout main
git pull origin main
git branch -d fix/typo-hero
```

---

## Level 2 — Menengah (Kerja Tim & Riwayat Bersih)

Level 1 membuatmu bisa bekerja. Level 2 membuatmu bekerja *dengan orang lain* dan menjaga riwayat agar enak dibaca.

### 2.1 Merge vs Rebase

Keduanya menggabungkan perubahan, dengan cara berbeda:

```bash
git merge main            # buat commit gabungan, riwayat asli tetap utuh
git rebase main           # "pindahkan" commit milikmu ke atas commit main, riwayat jadi garis lurus
```

| | `merge` | `rebase` |
|---|---|---|
| Riwayat | Ada "commit gabungan" (bifurkasi terlihat) | Lurus, seperti kerja berurutan |
| Kapan dipakai | Cabang publik/shared | Cabang pribadi yang belum di-push |
| Aturan praktis | Amannya | Hanya untuk commit yang belum dibagikan |

**Aturan emas:** jangan pernah rebase commit yang sudah kamu push dan dipakai orang lain. Kamu hanya akan menulis ulang riwayat yang mereka punya → konflik berantai.

### 2.2 Interactive Rebase (rebase -i)

Alat untuk merapikan riwayat milikmu *sebelum* di-push. Bayangkan kamu mengerjakan fitur dan menghasilkan 5 commit kecil yang berantakan; sebaiknya digabung jadi 1–2 commit yang bermakna.

```bash
git rebase -i HEAD~5     # buka editor berisi 5 commit terakhir
```

Di editor, kamu bisa mengganti kata kerja tiap baris:

```text
pick a1b2c3 fix typo di header
fixup d4e5f6 typo
squash 9a8b7c perbaikan kecil
reword 3f4a5b pesan commit diubah
```

- `fixup` — buang commit, gabungkan ke commit di atasnya, tanpa edit pesan.
- `squash` — gabungkan, lalu edit pesan gabungannya.
- `reword` — ubah pesan commit.
- `pick` — pertahankan apa adanya.

### 2.3 Cherry-Pick

Mengambil satu commit dari cabang lain **tanpa** menggabungkan seluruh cabang:

```bash
git cherry-pick <commit>
```

Contoh: hotfix di cabang `main` (commit `b455499`) ingin dibawa juga ke cabang `fitur-v2` tanpa membawa semua commit lain.

### 2.4 Stash — Menyimpan Pekerjaan untuk Sementara

Situasi klasik: sedang setengah mengerjakan fitur, tiba-tiba harus pindah cabang untuk perbaikan mendesak. Commit dulu terasa berat; `stash` adalah solusinya.

```bash
git stash               # simpan perubahan sementara, working tree jadi bersih
git stash list          # lihat daftar stash
git stash pop           # kembalikan perubahan stash terbaru
git stash drop          # hapus stash (jika sudah tidak butuh)
```

### 2.5 Tracking & Pull Rebase

Di kerja tim, `git pull` biasa bisa menghasilkan "commit gabungan" yang tidak perlu. Kebanyakan tim memakai:

```bash
git pull --rebase       # tarik perubahan main, lalu susun ulang commit lokal di atasnya
git config --global pull.rebase true    # jadikan default
```

### 2.6 Menyelesaikan Konflik

Konflik terjadi saat dua orang mengubah baris yang sama. Git tidak bisa memutuskan siapa yang benar, jadi kamu yang memutuskan.

```bash
git merge main          # ...Git bilang "CONFLICT" di file tertentu...
```

File bermasalah berisi penanda:

```text
<<<<<<< HEAD
versi milikmu
=======
versi dari main
>>>>>>> main
```

Langkah penyelesaian:

1. Buka file, pilih salah satu versi (atau gabungkan keduanya), hapus penanda `<<<<<<<`, `=======`, `>>>>>>>`.
2. Tandai selesai: `git add <file>`.
3. Akhiri proses: `git merge --continue` (atau `git rebase --continue` bila tadi rebase).

Kalau keadaan makin kacau dan ingin mundur penuh:

```bash
git merge --abort       # atau git rebase --abort
```

**Kesalahan umum:** menganggap konflik sebagai "musuh". Konflik itu wajar dan normal — yang penting diselesaikan dengan membaca kedua sisi, bukan asal pilih.

### 2.7 Worktree — Beberapa Cabang Sekaligus

`git worktree` memungkinkan kamu checkout beberapa branch di folder berbeda. Berguna saat harus kerja di dua cabang tanpa berganti-ganti:

```bash
git worktree add ../syahrworks-fix fix/halaman-projects
# folder baru berisi branch itu; cabang asli tetap utuh di tempat kerja semula
git worktree list
git worktree remove ../syahrworks-fix
```

### 2.8 Log Lanjutan

```bash
git log --graph --oneline --decorate        # lihat riwayat visual (peta cabang)
git log --all --oneline --grep="StackBackdrop"  # cari commit berdasarkan pesan
git log -p data/en/projects.ts              # riwayat satu file lengkap dengan diff
git log --since="2026-07-01" --oneline      # commit sejak tanggal tertentu
git blame components/Header.tsx             # siapa mengubah baris apa, kapan
```

### 2.9 Skenario Nyata: Sinkronisasi Fork dengan Upstream

Ini persis pola yang biasa dipakai saat bekerja di repo yang di-fork (misal kontribusi ke open source, atau dua akun GitHub).

```bash
# 1. Daftarkan repo asli sebagai "upstream" (kamu sudah punya "origin")
git remote add upstream https://github.com/rohmansyah23/syahrworks-portfolio.git

# 2. Ambil semua data remote tanpa menggabungkan apa pun
git fetch upstream

# 3. Pastikan main lokal sejajar dengan upstream/main
git checkout main
git merge --ff-only upstream/main

# 4. Kirim hasilnya ke fork kamu sendiri
git push origin main
```

Kata kunci `--ff-only` membuat merge **hanya** terjadi kalau bisa maju lurus (fast-forward). Kalau tidak, Git menolak — dan itu sinyal bahwa kamu dan upstream punya riwayat yang berbeda, yang biasanya menandakan ada commit lokal yang belum digabung.

Prosedur ini persis yang dipakai untuk menjawab pertanyaan "proyek lokal & GitHub sudah sama persis dengan upstream kan?" — cek `git rev-list --left-right --count master...upstream/master` dan bandingkan hasilnya.

---

## Level 3 — Recovery & Troubleshooting

Level ini bukan untuk dipelajari tiap hari. Simpan sebagai "kotak P3K": buka saat ada masalah.

### 3.1 Reflog — Menemukan Commit yang "Hilang"

**Situasi paling umum di level ini:** kamu `git reset --hard` ke commit lama, lalu sadar commit yang tadi ada *terlalu baru* sudah hilang. Panik? Jangan. Git menyimpan jejak semua pergerakan HEAD selama 90 hari.

```bash
git reflog
# b455499 HEAD@{0}: commit: fix: stabilkan StackBackdrop
# d012bb7 HEAD@{1}: commit: fix: StackBackdrop tetap diam saat scroll
# cb39be4 HEAD@{2}: checkout: moving from fix/... to master
```

Langkah pemulihan:

```bash
git checkout b455499       # pindah ke commit yang "hilang" itu
git checkout -b branch-pemulihan   # jadikan branch baru supaya aman
git log --oneline          # verifikasi: isi commit sudah kembali
```

**Mengapa bekerja:** `reflog` mencatat kemana HEAD pernah menunjuk. Selama kamu masih punya jejaknya (atau SHA commitnya), commit yang "terhapus" dari riwayat tetap bisa dipulihkan.

### 3.2 Bisect — Mencari Commit yang Merusak Sesuatu

Bug muncul di versi terbaru, tapi kamu tidak tahu commit mana penyebabnya. Dengan `bisect`, Git mempersempit pencarian lewat biner (belah dua terus-menerus):

```bash
git bisect start
git bisect bad           # commit sekarang mengandung bug
git bisect good <commit> # commit terakhir yang masih sehat
# Git checkout commit di tengah-tengah
git bisect bad           # masih bug? tandai bad, ulangi
git bisect good          # bersih? tandai good, ulangi
# ...dalam ~log2(N) langkah, ketemu commit penyebabnya
git bisect reset         # kembali ke keadaan normal
```

Dengan 200 commit, kamu menemukan biang keladinya dalam maksimal 8 langkah — dibanding mengintip 200 commit satu-satu.

### 3.3 Orphan Branch — Riwayat yang Benar-Benar Baru

Kadang kamu ingin mulai dari awal tapi tetap di repo yang sama — misalnya menulis ulang project total:

```bash
git checkout --orphan main-baru
git add .
git commit -m "mulai ulang dari nol"
git branch -D main       # hapus cabang lama (permanen!)
git branch -m main-baru main
```

**Peringatan:** cabang lama terhapus dari riwayat. Pastikan kamu benar-benar tidak membutuhkannya — atau backup lewat tag/branch dulu.

### 3.4 Menghapus File dari Riwayat (secret terlanjur di-commit)

Pernah commit file `.env` berisi token? Menghapus file saja tidak cukup — riwayat tetap menyimpannya. Solusi yang benar dan modern adalah `git-filter-repo`:

```bash
pip install git-filter-repo
git filter-repo --path .env --invert-paths
git remote add origin <url>     # filter-repo menghapus remote; daftarkan ulang
git push --force origin main
```

Sekalipun sudah dihapus, **putar ulang semua secret** yang pernah terlanjur terbit (token, password). Anggap rahasia itu bocor. Lalu pertimbangkan mengaktifkan secret scanning di GitHub.

### 3.5 Debug Konflik yang Rumit

Konflik besar dengan banyak file bisa membuat kepala pusing. Perintah bantu:

```bash
git diff --name-only --diff-filter=U     # hanya file yang konflik
git mergetool                            # buka editor perbandingan visual
git log --oneline --all --graph -20      # lihat dari mana masing-masing cabang bercabang
```

Pisahkan masalah: selesaikan konflik per file, dari yang paling kecil ke paling besar. Jangan terburu-buru — `git merge --abort` selalu tersedia kalau mau mundur dan mulai lagi.

### 3.6 Sekilas: Fitur yang Perlu Kamu Kenal, tapi Jarang Dipakai

| Fitur | Satu kalimat | Kapan dipakai |
|---|---|---|
| Submodule | Repo di dalam repo (`git submodule add <url>`) | Mem-pin dependency tertentu agar versinya persis |
| Hooks | Script yang berjalan otomatis di event git (`.git/hooks/pre-commit`) | Menjalankan lint/formatter sebelum tiap commit |
| Signed commits | Commit ditandatangani kunci GPG (`git commit -S`) | Project dengan standar keamanan ketat |
| Patch | Ekspor perubahan ke file (`git format-patch` / `git apply`) | Berbagi perubahan tanpa akses repo |
| Bundle | Riwayat repo jadi satu file (`git bundle create`) | Migrasi/cadangan offline |

---

## Lampiran A — Cheat Sheet 1 Halaman

### Dasar

| Perintah | Fungsi |
|---|---|
| `git init` | Jadikan folder jadi repo |
| `git clone <url>` | Salin repo dari remote |
| `git status` | Lihat kondisi working tree & staging |
| `git add <file>` / `git add .` | Masukkan perubahan ke staging |
| `git commit -m "pesan"` | Simpan staging jadi commit |
| `git log --oneline` | Riwayat commit ringkas |
| `git show <commit>` | Detail satu commit |
| `git diff` / `git diff --staged` | Lihat perubahan belum / sudah di-stage |

### Undo & Perbaikan

| Perintah | Fungsi |
|---|---|
| `git restore <file>` | Buang perubahan working tree |
| `git restore --staged <file>` | Keluarkan file dari staging |
| `git reset --soft HEAD~1` | Batalkan commit terakhir, perubahan tetap di staging |
| `git reset --mixed HEAD~1` | Batalkan commit terakhir, perubahan tetap di working tree |
| `git reset --hard <commit>` | Kembali total ke commit tertentu (⚠️ buang perubahan) |
| `git revert <commit>` | Commit baru yang membalik perubahan |
| `git stash` / `git stash pop` | Simpan / kembalikan perubahan sementara |

### Branch & Merge

| Perintah | Fungsi |
|---|---|
| `git branch` | Daftar branch |
| `git checkout -b <nama>` | Buat + pindah ke branch baru |
| `git switch <nama>` | Pindah branch (alternatif modern) |
| `git merge <branch>` | Gabungkan branch ke branch sekarang |
| `git rebase <branch>` | Susun ulang commit di atas branch lain |
| `git cherry-pick <commit>` | Ambil satu commit dari branch lain |
| `git merge --abort` | Batalkan proses merge yang konflik |

### Remote & Kolaborasi

| Perintah | Fungsi |
|---|---|
| `git remote add <nama> <url>` | Daftarkan remote |
| `git fetch <remote>` | Ambil data remote tanpa menggabung |
| `git pull --rebase` | Tarik + susun ulang commit lokal |
| `git push -u origin <branch>` | Push pertama kali + set upstream |
| `git remote set-url origin <url>` | Ganti URL remote |
| `git rev-list --left-right --count a...b` | Hitung ahead/behind antara dua cabang |

### Log & Investigasi

| Perintah | Fungsi |
|---|---|
| `git log --graph --oneline` | Riwayat visual |
| `git log --grep="kata"` | Cari commit berdasarkan pesan |
| `git log -p <file>` | Riwayat file + diff |
| `git blame <file>` | Siapa mengubah baris, kapan |
| `git reflog` | Jejak pergerakan HEAD (recovery) |
| `git bisect start` | Pencarian biner commit penyebab bug |

## Lampiran B — Glosarium

| Istilah | Arti |
|---|---|
| **Repository (repo)** | Folder project yang dilacak riwayatnya oleh Git |
| **Working tree** | File yang sedang kamu edit di disk |
| **Staging (index)** | Area penampung perubahan yang siap di-commit |
| **Commit** | Snapshot perubahan yang tersimpan permanen + pesan |
| **HEAD** | Penunjuk ke commit yang sedang aktif (yang "dibuka" sekarang) |
| **Branch** | Jalur kerja paralel dari satu titik riwayat |
| **origin** | Nama default untuk remote repo milikmu (fork/akunmu) |
| **upstream** | Konvensi nama untuk remote repo asli (sumber) |
| **Fetch** | Ambil info perubahan dari remote, tanpa menggabungkan |
| **Pull** | Fetch + merge ke branch aktif |
| **Push** | Kirim commit lokal ke remote |
| **Merge** | Gabungkan dua jalur riwayat menjadi satu |
| **Rebase** | Tulis ulang posisi commit di atas cabang lain |
| **Fast-forward** | Merge yang tinggal memajukan penunjuk, tanpa commit gabungan |
| **Conflict** | Kondisi dua perubahan mengubah baris sama; perlu diputuskan manual |
| **Stash** | Penyimpanan sementara perubahan yang belum di-commit |
| **Tag** | Penanda nama pada commit tertentu (mis. versi `v1.0.0`) |
| **Reflog** | Log internal pergerakan HEAD, alat recovery utama |
