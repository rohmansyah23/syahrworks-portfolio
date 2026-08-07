# Panduan Git dari Pemula hingga Pemulihan: Langkah demi Langkah

*Ditulis untuk pembelajar yang baru mengenal Git. Perintah mengikuti versi Git modern dan berlaku di Windows, macOS, maupun Linux.*

## Mengapa Git?

Git adalah alat untuk mencatat **setiap perubahan** kode secara kronologis. Bayangkan seperti "save point" di game: kapan saja kamu bisa mundur ke kondisi sebelumnya kalau ada yang rusak. Bedanya, Git juga bisa dipakai ramai-ramai tanpa saling menimpa — itulah yang membuatnya menjadi standar industri.

Banyak pemula menghindari Git karena terasa rumit dan menakutkan. Padahal, dengan memahami tiga level sederhana, Git justru menjadi alat yang membuat kamu **berani mencoba-coba** — karena hampir semuanya bisa di-undo.

---

## Level 1 — Pemula: Menyimpan Perubahan Harian

### Setup Pertama Kali

Setelah menginstal Git, beri tahu siapa kamu. Ini yang akan tercatat di setiap commit.

```bash
git config --global user.name "Muhammad Rohman Syah"
git config --global user.email "kamu@contoh.com"
```

`--global` berlaku untuk semua project di komputer. Dua perintah lain yang berguna sejak awal:

- `git config --global init.defaultBranch main` — nama branch bawaan jadi `main`.
- `git config --global core.editor "code --wait"` — editor default saat Git butuh menulis pesan.

**Kesalahan umum:** lupa set `user.email` → Git menolak commit dengan pesan "Please tell me who you are". Solusinya tinggal menjalankan perintah di atas.

### Siklus Inti: Status → Add → Commit

Pahami tiga area: **working tree** (file di disk), **staging** (perubahan yang siap disimpan), dan **commit** (perubahan yang sudah tercatat permanen).

```bash
git status              # lihat kondisi: file apa yang berubah?
git add <file>          # masukkan file ke staging
git add .               # masukkan semua file berubah
git commit -m "pesan"   # simpan staging jadi satu commit
```

Contoh nyata — kamu baru mengubah `data/blog.ts`:

```bash
git status
#   modified:   data/blog.ts
git add data/blog.ts
git commit -m "feat(blog): tambah artikel panduan git"
```

Pola pesan commit `type(scope): deskripsi` (mis. `fix(home): perbaiki heading terpotong`) adalah konvensi umum yang membuat riwayat mudah dibaca siapa pun.

### Melihat Riwayat & Perubahan

```bash
git log --oneline -5    # 5 commit terakhir, ringkas
git show <commit>       # detail satu commit
git diff                # perubahan yang belum di-stage
git diff --staged       # perubahan yang sudah siap commit
```

### Jangan Commit Semua Sekaligus

`git add -p` membiarkan kamu memilih perubahan per bagian, sehingga commit "perbaiki typo" bisa terpisah dari "tambah fitur". Riwayat jadi rapi — dan tiga bulan kemudian, dirimu sendiri akan berterima kasih.

### Mengabaikan File (.gitignore)

File seperti `node_modules/`, `.env`, dan hasil build **tidak boleh** masuk riwayat. Buat file `.gitignore`:

```gitignore
node_modules/
.env
.next/
```

`.env` dilarang di-commit karena bisa berisi rahasia (token API, password). Kalau perlu contoh, buat `.env.example` berisi nama variabel tanpa nilainya.

### Membatalkan Perubahan (Dasar)

```bash
git restore <file>            # buang perubahan di working tree
git restore --staged <file>   # keluarkan file dari staging, isinya tetap
git revert <commit>           # commit BARU yang membalik perubahan lama
```

`git revert` aman untuk commit yang sudah di-push: commit lama tetap ada di riwayat, ditambah commit baru yang membatalkannya. Ini cara benar "membatalkan" pekerjaan di repo bersama — bukan menulis ulang riwayat.

### Branch & Remote Pertama

Branch adalah "jalur kerja paralel". Kamu bisa mengerjakan fitur baru tanpa mengganggu jalur utama.

```bash
git checkout -b fitur-login    # buat + langsung pindah ke branch baru
git push -u origin fitur-login # kirim ke GitHub, ingat hubungannya
```

- `-u` membuat commit berikutnya cukup `git push`.
- `git merge <branch>` menggabungkan branch lain ke branch sekarang.

---

## Level 2 — Menengah: Kerja Tim & Riwayat Bersih

### Merge vs Rebase

Keduanya menggabungkan perubahan dengan cara berbeda:

```bash
git merge main     # ada "commit gabungan", riwayat asli utuh
git rebase main    # commitmu "dipindah" ke atas main, riwayat lurus
```

| | `merge` | `rebase` |
|---|---|---|
| Riwayat | Ada commit gabungan (percabangan terlihat) | Lurus, seperti kerja berurutan |
| Kapan dipakai | Cabang publik/shared | Cabang pribadi yang belum di-push |

**Aturan emas:** jangan pernah rebase commit yang sudah dipush dan dipakai orang lain — kamu hanya akan menimbulkan konflik berantai.

### Merapikan Riwayat dengan rebase -i

Mengerjakan fitur sering menghasilkan banyak commit kecil yang berantakan. Rapikan sebelum push:

```bash
git rebase -i HEAD~5    # buka editor berisi 5 commit terakhir
```

Di editor, ganti kata kerja tiap baris: `fixup` (gabung ke commit atas, tanpa edit pesan), `squash` (gabung lalu edit pesan), `reword` (ubah pesan).

### Cherry-Pick & Stash

```bash
git cherry-pick <commit>   # ambil SATU commit dari branch lain
git stash                  # simpan perubahan sementara, tree jadi bersih
git stash pop              # kembalikan perubahan yang disimpan
```

Situasi klasik untuk `stash`: sedang setengah mengerjakan fitur, tiba-tiba harus pindah branch untuk perbaikan mendesak. Commit dulu terasa berat — stash solusinya.

### Menghadapi Konflik

Konflik terjadi saat dua orang mengubah baris yang sama. Git tidak bisa memutuskan siapa yang benar — kamu yang memutuskan. File bermasalah berisi penanda:

```text
<<<<<<< HEAD
versi milikmu
=======
versi dari main
>>>>>>> main
```

Langkahnya: buka file, pilih salah satu versi (atau gabungkan keduanya), hapus penandanya, lalu `git add <file>` dan `git merge --continue`. Kalau makin kacau, mundur penuh dengan `git merge --abort`. Konflik itu normal — bukan musuh.

### Sinkronisasi Fork dengan Upstream

Pola yang dipakai saat berkontribusi ke repo yang di-fork:

```bash
git remote add upstream https://github.com/rohmansyah23/syahrworks-portfolio.git
git fetch upstream
git checkout main
git merge --ff-only upstream/main   # maju lurus saja; menolak kalau ada perbedaan
git push origin main
```

`--ff-only` memaksa merge hanya kalau bisa maju lurus. Kalau Git menolak, itu sinyal ada commit lokal yang belum digabung — justru informasi berharga.

---

## Level 3 — Recovery: Kotak P3K Git

Level ini bukan untuk dipelajari tiap hari. Simpan sebagai penyelamat saat terjadi masalah.

### Reflog — Menemukan Commit yang "Hilang"

Situasi paling umum: kamu `git reset --hard` ke commit lama, lalu sadar commit yang tadi ada sudah "hilang". Tenang — Git menyimpan jejak semua pergerakan HEAD selama 90 hari.

```bash
git reflog
# b455499 HEAD@{0}: commit: fix: stabilkan StackBackdrop
# d012bb7 HEAD@{1}: commit: fix: StackBackdrop tetap diam saat scroll
```

Pemulihan:

```bash
git checkout b455499
git checkout -b branch-pemulihan   # jadikan branch agar aman
```

Selama SHA commitnya masih ada di reflog, commit yang "terhapus" tetap bisa dipulihkan.

### Bisect — Mencari Commit Perusak

Bug muncul di versi terbaru, tapi kamu tidak tahu commit mana penyebabnya:

```bash
git bisect start
git bisect bad            # commit sekarang bermasalah
git bisect good <commit>  # commit terakhir yang sehat
git bisect bad            # masih bug? tandai lagi
git bisect good           # bersih? tandai lagi
git bisect reset          # kembali normal saat ketemu
```

Git membelah dua terus-menerus: dengan 200 commit, biang keladinya ketemu dalam maksimal 8 langkah — bukan 200.

### Menghapus File dari Riwayat

Pernah commit `.env` berisi token? Menghapus file saja tidak cukup — riwayat tetap menyimpannya. Solusi modern: `git-filter-repo`.

```bash
git filter-repo --path .env --invert-paths
git remote add origin <url>
git push --force origin main
```

Sekalipun sudah dihapus, **putar ulang semua secret** yang pernah terlanjur terbit — anggap rahasia itu bocor.

---

## Penutup: Mulai dari Mana?

Git terasa besar, tapi kamu tidak perlu menghafal semuanya. Mulai dari Level 1: setup, lalu `add`–`commit`–`push` tiap hari sampai terbiasa. Tambahkan branch dan merge saat mulai mengerjakan fitur terpisah. Dan simpan bab Recovery di ingatan — bukan untuk dihafal, tapi untuk tahu bahwa **tidak ada yang benar-benar hilang di Git**.

**Rekomendasi belajar:** buat repo latihan, rusakkan sesukanya, lalu perbaiki. Git adalah alat yang justru membuat kamu berani mencoba — karena hampir semuanya bisa dikembalikan.
