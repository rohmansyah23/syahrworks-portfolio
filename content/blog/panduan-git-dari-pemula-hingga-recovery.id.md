*Ditulis untuk pembelajar yang baru mengenal Git. Perintah mengikuti versi Git modern dan berlaku di Windows, macOS, maupun Linux.*

## Mengapa Git?

Pernah mengubah kode, semuanya rusak, lalu berharap bisa kembali ke kondisi 30 menit yang lalu? Git menyelesaikan masalah itu.

Tetapi Git bukan sekadar tombol "undo". Git adalah sistem untuk:

- mencatat perubahan,
- membuat checkpoint,
- bekerja secara paralel,
- berbagi perubahan,
- dan memulihkan pekerjaan.

Tujuan panduan ini bukan menghafal perintah. Tujuannya membangun mental model — paham di kondisi mana kamu berada, apa yang diubah setiap perintah, dan cara kembali ketika ada yang salah.

---

## Mental Model: Empat Area

Seluruh workflow Git hidup di empat area:

```
Working Tree        →  file di disk-mu, tempat kamu mengedit
     ↓
Staging Area        →  perubahan yang sudah kamu pilih untuk commit berikutnya
     ↓
Commit              →  perubahan yang tercatat permanen di riwayat
     ↓
Remote              →  repository bersama (GitHub, GitLab, dll.)
```

Ingat model ini — setiap perintah di panduan ini memindahkan sesuatu di antara empat area tersebut.

---

## Bagian 1 — Workflow Harian

### Setup Pertama Kali

Setelah menginstal Git, beri tahu siapa kamu. Identitas ini tercatat di setiap commit.

```bash
git config --global user.name "Muhammad Rohman Syah"
git config --global user.email "kamu@contoh.com"
```

`--global` berlaku untuk semua project di komputer. Cek konfigurasi kapan saja dengan `git config --list`.

Dua pengaturan lain yang berguna sejak awal:

- `git config --global init.defaultBranch main` — repository baru memakai branch `main`.
- `git config --global core.editor "code --wait"` — editor yang dibuka Git saat butuh pesan darimu.

**Kesalahan umum:** lupa set `user.email` → Git menolak dengan "Please tell me who you are". Solusinya tinggal menjalankan dua perintah di atas.

### Membuat Repository

Untuk project baru:

```bash
git init
```

Perintah ini membuat folder tersembunyi `.git` yang mulai melacak file-mu. Langsung jalankan `git status` — perintah inilah yang akan kamu pakai setiap hari.

### Membaca Keadaan Repository

`git status` memberi tahu posisi perubahanmu. Sebuah file bisa berada dalam kondisi:

- **Untracked** — baru, Git belum melihatnya.
- **Modified** — berubah sejak commit terakhir.
- **Staged** — sudah dipilih untuk commit berikutnya.
- **Committed** — tercatat aman di riwayat.

### Add: Memilih, Bukan Menyimpan

`git add` tidak menyimpan perubahan ke riwayat Git. Ia hanya memilih perubahan yang akan masuk ke commit berikutnya.

```bash
git add app/page.tsx   # stage satu file
git add .              # stage semua perubahan
git add -p             # pilih perubahan per bagian
```

`git add -p` caramu menjaga commit "perbaiki typo" terpisah dari "tambah fitur".

### Commit: Satu Unit Kerja yang Bersih

```bash
git commit -m "feat(blog): tambah artikel panduan git"
```

Commit yang baik punya satu tujuan, pesan yang jelas, dan tidak mencampur perubahan yang tidak berkaitan. Pola `type(scope): deskripsi` (`fix(home): ...`, `feat(blog): ...`) membuat riwayat mudah dibaca siapa pun.

### Melihat Perubahan

| Command | Menjawab pertanyaan |
| --- | --- |
| `git status` | Apa yang berubah? |
| `git diff` | Apa isi perubahan yang belum di-stage? |
| `git diff --staged` | Apa yang akan masuk commit? |
| `git log` | Apa yang sudah terjadi? |
| `git show <commit>` | Apa isi commit tertentu? |

```bash
git log --oneline -5
```

---

## Bagian 2 — Dari Lokal ke GitHub

Ini milestone pertama: menghubungkan repository lokal dengan repository bersama.

### Apa Itu Remote?

```
Laptop            GitHub
└── Local repo    └── Remote repo
```

`origin` hanyalah nama — nama konvensional untuk remote utama-mu.

### Menghubungkan Repository

```bash
git remote add origin https://github.com/namamu/project-mu.git
git remote -v
```

### Push Pertama

```bash
git push -u origin main
```

`-u` ("upstream") mengingat hubungannya, jadi selanjutnya cukup `git push`.

### Workflow Harian (Dengan Push)

Commit menyimpan perubahan secara lokal. Push mengirimkannya ke repository bersama.

```bash
git status
git add .
git commit -m "..."
git push
```

### Pull, Fetch, dan Push

```
remote
  │
  ├── fetch  → mengambil perubahan/informasi
  │
  └── pull   → fetch + mengintegrasikan ke branch-mu

local
  │
  └── push   → mengirim commit-mu ke remote
```

- `git fetch` hanya memperbarui pandanganmu terhadap remote — aman, tidak ada yang diubah.
- `git pull` mengambil *dan* menggabungkan perubahan ke branch sekarang.
- `git push` mengirim commit lokal ke remote.

---

## Bagian 3 — Membatalkan Kesalahan Tanpa Panik

Kamu akan berbuat salah. Git dirancang agar hampir semuanya bisa diperbaiki.

### Perubahan Belum Di-stage

```bash
git restore <file>
```

Membuang perubahan di working tree untuk file itu.

### Sudah Di-stage

```bash
git restore --staged <file>
```

Mengeluarkan file dari staging, isinya tetap.

### Commit Sudah Dibuat

```bash
git revert <commit>
```

Membuat commit **baru** yang membalik commit lama. Aman untuk commit yang sudah di-push — commit lama tetap ada di riwayat.

### restore vs revert vs reset

| Command | Tujuan |
| --- | --- |
| `git restore` | Membuang/mengembalikan perubahan file |
| `git revert` | Commit baru yang membatalkan commit lama |
| `git reset` | Memindahkan pointer branch/HEAD |

**Peringatan:** `git reset --hard` adalah titik di mana pemula sering panik. Ia membuang perubahan yang sudah di-stage maupun di working tree. Gunakan hanya kalau benar-benar yakin — dan ingat reflog (Bagian 7) masih bisa membantu.

---

## Bagian 4 — Branch: Bekerja Tanpa Mengganggu Main

Skenario: kamu sedang mengerjakan fitur login, tapi production butuh hotfix hari ini.

Tanpa branch:

```
main
└── semua pekerjaan bercampur
```

Dengan branch:

```
main
├── hotfix
└── fitur-login
```

### Membuat dan Berpindah

Command modern adalah `git switch`, bukan `git checkout` (masih valid, tapi itu nama lama):

```bash
git switch -c fitur-login   # buat + langsung pindah ke branch baru
git switch main             # kembali ke main
```

### Push Branch

```bash
git push -u origin fitur-login
```

### Merge

```bash
git switch main
git merge fitur-login
```

---

## Bagian 5 — Workflow Tim dan Pull Request

Setelah branch dipahami, kolaborasi mengikuti pola:

```
main
 ↓
buat feature branch
 ↓
kerjakan perubahan
 ↓
commit
 ↓
push
 ↓
Pull Request
 ↓
code review
 ↓
merge
```

- **Branch protection** mencegah push langsung ke `main`.
- **Pull Request** mengajukan perubahan dari branch-mu.
- **Code review** memberi kesempatan orang lain mengecek sebelum di-merge.

Detail GitHub tidak sepenting alurnya — fokus artikel ini adalah Git itu sendiri.

---

## Bagian 6 — Merge vs Rebase

Keduanya menggabungkan perubahan, tapi dengan cara berbeda. Mulai dari feature yang bercabang dari `main`:

```
main
A---B---C
     \
      D---E feature
```

### Merge

```
A---B---C-------M
     \         /
      D---E----
```

Merge membuat merge commit dan mempertahankan riwayat percabangan tetap terlihat.

### Rebase

```
A---B---C---D'---E'
```

Rebase tidak secara ajaib "mengubah masa lalu". Git membuat commit **baru** dengan parent yang berbeda, diletakkan di atas `main`.

### Kapan Menggunakan

> Rebase branch pribadi yang belum dipakai orang lain; merge branch yang sudah menjadi bagian dari histori bersama.

Hindari absolutisme. Aturan praktis yang lebih tepat:

> Jangan sembarangan me-rebase branch yang sudah dipakai orang lain — rebase menulis ulang commit dan memaksa mereka menyelaraskan ulang branch-nya.

---

## Bagian 7 — Membersihkan Riwayat

Mengerjakan fitur sering menghasilkan banyak commit kecil yang berantakan. Rapikan sebelum bergabung ke riwayat bersama:

```bash
git rebase -i HEAD~5
```

Di editor, ganti kata kerja tiap baris:

- `pick` — pertahankan commit.
- `reword` — pertahankan perubahan, edit pesannya.
- `squash` — gabung ke commit sebelumnya dan edit pesan gabungan.
- `fixup` — gabung ke commit sebelumnya, pertahankan pesannya.

Contoh:

```
fix typo
fix typo again
fix typo final
add blog
```

menjadi:

```
feat(blog): tambah artikel panduan git
```

Rapikan sebelum riwayat menjadi bagian dari branch bersama — bukan setelahnya.

---

## Bagian 8 — Stash dan Cherry-Pick

### Saat Harus Meninggalkan Pekerjaan yang Belum Selesai

Sedang setengah mengerjakan fitur A, tiba-tiba ada hotfix mendesak yang mengharuskan pindah branch. Commit dulu terasa berat — stash solusinya:

```bash
git stash
git switch main
# ...perbaiki hotfix...
git switch fitur-a
git stash pop
```

`git stash list` menampilkan stash yang tersimpan; `git stash apply` mengembalikannya tanpa menghapus dari daftar.

### Mengambil Satu Commit dari Branch Lain

```bash
git cherry-pick <commit>
```

Cherry-pick membuat commit **baru** berdasarkan perubahan commit tersebut — tanpa ikut membawa seluruh branch.

---

## Bagian 9 — Conflict: Saat Git Tidak Bisa Memilih

Konflik terjadi saat dua orang mengubah baris yang sama. Git tidak bisa memutuskan siapa yang benar — kamu yang memutuskan. File bermasalah berisi penanda:

```text
<<<<<<< HEAD
versi milikmu
=======
versi dari branch lain
>>>>>>> feature
```

Alurnya:

```
merge/rebase
 ↓
conflict
 ↓
buka file
 ↓
tentukan hasil akhir
 ↓
hapus penanda
 ↓
git add
 ↓
lanjutkan operasi
```

Untuk **merge**, selesaikan dengan commit normal:

```bash
git add <file>
git commit
```

Untuk **rebase**, lanjutkan rebase-nya:

```bash
git add <file>
git rebase --continue
```

Untuk membatalkan total:

```bash
git merge --abort
git rebase --abort
```

Konflik itu normal — bukan musuh.

---

## Bagian 10 — Recovery: Saat Sesuatu Benar-Benar Salah

Bagian ini bukan untuk dipelajari tiap hari. Simpan sebagai kotak P3K.

### Reflog — Menemukan Commit yang "Hilang"

Skenario: kamu menjalankan `git reset --hard HEAD~3`, lalu sadar commit-commit baru-baru ini "hilang".

Tenang. `git reflog` adalah catatan **lokal** setiap pergerakan reference:

```bash
git reflog
```

Pemulihan — ubah commit yang hilang menjadi branch yang aman:

```bash
git switch -c branch-pemulihan <sha>
```

Dua catatan jujur: reflog adalah catatan lokal, bukan backup cloud — mesin yang sama yang kamu rusakkan itulah yang menyimpan log-nya. Dan tidak semuanya selalu bisa dipulihkan; itu sebabnya bagian ini bernama "recovery", bukan "jaminan".

### Bisect — Mencari Commit Perusak

Bug muncul, tapi kamu tidak tahu commit mana penyebabnya — padahal ada 200 commit sejak versi terakhir yang sehat:

```bash
git bisect start
git bisect bad            # commit sekarang bermasalah
git bisect good <commit>  # commit terakhir yang sehat
```

Tes setiap kandidat; tandai `bad` atau `good`. Git membelah dua pencarian tiap kali:

```
200 → 100 → 50 → 25 → ... → 1 culprit
```

Dengan 200 commit, biang keladinya ketemu dalam maksimal 8 langkah — bukan 200.

```bash
git bisect reset
```

---

## Bagian 11 — Secret dan Kesalahan Serius

Menghapus file saja tidak cukup — riwayat tetap menyimpannya.

```
.env
API_KEY=rahasia
```

> Menghapus `.env` dari working tree tidak menghapusnya dari histori.

Untuk history rewrite, `git-filter-repo` adalah tool modern:

```bash
git filter-repo --path .env --invert-paths
git remote add origin <url>
git push --force origin main
```

Tapi urutan yang paling penting adalah:

```
Secret bocor
 ↓
REVOKE / ROTATE secret
 ↓
bersihkan history
 ↓
force push jika diperlukan
 ↓
audit repository
```

Membersihkan history **tidak** membuat secret yang bocor kembali aman. Putar dulu, selalu.

Pencegahan: tambahkan `.gitignore` sejak awal, dan dokumentasikan nama variabel di `.env.example` tanpa nilainya.

---

## Bagian 12 — Fork dan Upstream (Advanced)

Opsional — kebanyakan pemula belum butuh ini. Ini pola berkontribusi ke repository yang kamu fork:

```
Original repository
        ↓
      Fork
        ↓
Repository milikmu
        ↓
Local clone
```

```bash
git remote add upstream https://github.com/pemilik/original.git
git fetch upstream
git switch main
git merge --ff-only upstream/main
git push origin main
```

Dua remote:

- `origin` → repository milikmu.
- `upstream` → repository sumber.

`--ff-only` memaksa maju hanya kalau bisa lurus — kalau Git menolak, ada commit lokal yang belum digabung. Itu justru informasi berharga.

---

## Quick Reference (Berdasarkan Situasi)

**Saya baru mengubah kode:**

```bash
git status
git diff
git add .
git commit -m "..."
git push
```

**Saya ingin membatalkan perubahan file:**

```bash
git restore <file>
```

**Saya tidak sengaja commit:**

- Riwayat belum dibagikan → `git reset` (pahami konsekuensinya).
- Commit sudah dibagikan → `git revert <commit>`.

**Saya ingin membuat fitur:**

```bash
git switch -c fitur-baru
```

**Saya harus pindah pekerjaan sementara:**

```bash
git stash
git switch <branch>
```

**Saya mendapat conflict:**

```
buka file → selesaikan → git add → lanjutkan merge/rebase
```

**Saya kehilangan commit:**

```bash
git reflog
```

**Saya tidak tahu commit mana penyebab bug:**

```bash
git bisect
```

---

## Penutup

Git bukan tentang menghafal command.

Git adalah tentang memahami:

1. keadaan repository,
2. perubahan yang ingin disimpan,
3. histori yang ingin dibagikan,
4. dan cara kembali ketika terjadi kesalahan.

**Workflow minimum harian:**

```bash
git status
git add .
git commit -m "..."
git push
```

**Begitu mulai bekerja dengan branch:**

```bash
git switch -c fitur-baru
git add .
git commit -m "..."
git push -u origin fitur-baru
```

Mulai dari workflow harian sampai menjadi kebiasaan. Tambahkan branch, lalu kerja tim. Dan simpan bagian Recovery di ingatan — bukan untuk dihafal, tapi untuk tahu bahwa **tidak ada yang benar-benar hilang di Git**.
