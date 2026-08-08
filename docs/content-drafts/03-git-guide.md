# Refactor Plan — Blog #3: Panduan Git dari Pemula hingga Pemulihan

## 1. Tujuan Refactor

Mengubah artikel dari:

> "kumpulan command Git dari dasar sampai advanced"

menjadi:

> "panduan praktis yang mengajarkan cara berpikir dan workflow Git dari hari pertama sampai mampu menangani masalah."

### Target pembaca

* Pemula yang baru menggunakan Git.
* Developer yang sudah tahu `add`, `commit`, dan `push`, tetapi belum memahami workflow Git secara utuh.
* Developer yang takut melakukan kesalahan karena belum tahu cara memulihkannya.

### Target setelah membaca

Pembaca harus mampu:

1. Menginisialisasi dan mengonfigurasi Git.
2. Memahami working tree, staging area, dan commit.
3. Membuat commit yang terstruktur.
4. Menghubungkan repository lokal dengan remote.
5. Melakukan `push`, `pull`, dan sinkronisasi.
6. Menggunakan branch untuk pekerjaan terpisah.
7. Memahami merge dan rebase secara konseptual.
8. Menangani conflict.
9. Menggunakan stash dan cherry-pick pada situasi yang tepat.
10. Memulihkan perubahan menggunakan reflog dan revert.
11. Memahami bahwa secret yang sudah ter-push harus dianggap bocor.
12. Mengetahui kapan menggunakan teknik Git advanced dan kapan tidak perlu.

---

# 2. Masalah pada Draft Saat Ini

## 2.1 Terlalu cepat berpindah dari konsep ke command

Contoh:

```bash
git add
git commit
git restore
git revert
git checkout
git merge
git rebase
```

Pembaca pemula dapat menghafal command tanpa memahami:

> "Saya sedang berada di kondisi apa, dan command ini mengubah apa?"

### Solusi

Setiap bagian penting menggunakan pola:

```text
Situasi
↓
Masalah
↓
Konsep
↓
Command
↓
Contoh
↓
Apa yang berubah?
↓
Kesalahan umum
```

---

## 2.2 `push` dan remote belum mendapat porsi yang cukup

Untuk developer pemula, workflow yang paling penting justru:

```text
edit
↓
status
↓
add
↓
commit
↓
push
↓
remote
```

Draft saat ini terlalu cepat masuk ke branch dan recovery sebelum workflow remote benar-benar dijelaskan.

### Solusi

Tambahkan satu bagian khusus:

> **Dari Repository Lokal ke GitHub**

Bahas:

```bash
git remote -v
git remote add origin <url>
git push -u origin main
git pull
git fetch
git push
```

Jelaskan perbedaan:

* local repository
* remote repository
* `origin`
* `fetch`
* `pull`
* `push`

---

## 2.3 `checkout` sebaiknya tidak menjadi command utama

Draft menggunakan:

```bash
git checkout -b fitur-login
```

Untuk tutorial modern, lebih jelas menggunakan:

```bash
git switch -c fitur-login
```

dan:

```bash
git switch main
```

Tetap boleh menyebut `checkout` sebagai command lama yang masih valid, tetapi jangan menjadikannya command utama untuk pemula.

---

## 2.4 Bagian merge/rebase terlalu singkat

Tabelnya bagus, tetapi pembaca belum mendapatkan mental model.

Sebaiknya tambahkan diagram konseptual:

```text
main
A---B---C
     \
      D---E feature
```

### Merge

```text
A---B---C-------M
     \         /
      D---E----
```

### Rebase

```text
A---B---C---D'---E'
```

Tekankan:

> Rebase tidak "mengubah masa lalu" secara ajaib. Git membuat commit baru dengan parent yang berbeda.

---

## 2.5 Bagian conflict memiliki command yang kurang tepat

Draft menyebut:

```bash
git add <file>
git merge --continue
```

Untuk merge biasa, setelah menyelesaikan conflict umumnya:

```bash
git add <file>
git commit
```

`git merge --continue` bukan command yang perlu dijadikan workflow utama untuk merge conflict.

### Solusi

Gunakan alur:

```bash
git merge feature-login

# conflict

# edit file

git add <file>
git commit
```

Kemudian:

```bash
git merge --abort
```

untuk membatalkan merge yang sedang berlangsung.

---

# 3. Struktur Artikel Baru

## Opening — Git Tidak Perlu Ditakuti

### Hook

Mulai dengan situasi nyata:

> Pernah mengubah kode, semuanya rusak, lalu berharap bisa kembali ke kondisi 30 menit yang lalu?

Git menyelesaikan masalah tersebut.

Tetapi Git bukan sekadar tombol "undo".

Git adalah sistem untuk:

* mencatat perubahan,
* membuat checkpoint,
* bekerja secara paralel,
* berbagi perubahan,
* dan memulihkan pekerjaan.

### Mental model utama

Perkenalkan:

```text
Working Tree
     ↓
   Staging
     ↓
   Commit
     ↓
   Remote
```

Ini menjadi fondasi seluruh artikel.

---

# 4. Bagian 1 — Workflow Git yang Dipakai Setiap Hari

## 4.1 Setup Git

Bahas:

```bash
git config --global user.name "Muhammad Rohman Syah"
git config --global user.email "email@contoh.com"
```

Tambahkan:

```bash
git config --list
```

untuk memeriksa konfigurasi.

---

## 4.2 Membuat Repository

Untuk project baru:

```bash
git init
```

Lalu:

```bash
git status
```

Jelaskan apa yang sebenarnya terjadi setelah `git init`.

---

## 4.3 Memahami Status Repository

Jadikan `git status` sebagai command utama.

Contoh:

```bash
git status
```

Jelaskan kondisi:

```text
Untracked
Modified
Staged
Committed
```

---

## 4.4 Add dan Staging

```bash
git add app/page.tsx
git add .
git add -p
```

Tekankan bahwa:

> `git add` bukan menyimpan perubahan ke Git history. Ia hanya memilih perubahan yang akan masuk ke commit berikutnya.

---

## 4.5 Commit

```bash
git commit -m "feat(blog): tambah artikel panduan git"
```

Bahas prinsip commit:

* satu tujuan,
* mudah dipahami,
* tidak terlalu besar,
* tidak mencampur perubahan yang tidak berkaitan.

---

## 4.6 Melihat Perubahan

```bash
git diff
git diff --staged
git log --oneline
git show <commit>
```

Buat tabel:

| Command             | Menjawab pertanyaan                    |
| ------------------- | -------------------------------------- |
| `git status`        | Apa yang berubah?                      |
| `git diff`          | Apa isi perubahan yang belum di-stage? |
| `git diff --staged` | Apa yang akan masuk commit?            |
| `git log`           | Apa yang sudah terjadi?                |
| `git show`          | Apa isi commit tertentu?               |

---

# 5. Bagian 2 — Dari Local ke GitHub

Ini harus menjadi milestone pertama artikel.

## 5.1 Apa Itu Remote?

Jelaskan:

```text
Laptop
└── Local repository

GitHub
└── Remote repository
```

`origin` hanyalah nama remote yang umum digunakan.

---

## 5.2 Menghubungkan Repository

```bash
git remote add origin <url>
git remote -v
```

---

## 5.3 Push Pertama

```bash
git push -u origin main
```

Jelaskan fungsi `-u`.

---

## 5.4 Workflow Harian

Setelah remote terhubung:

```bash
git status
git add .
git commit -m "..."
git push
```

Ini harus menjadi salah satu bagian paling praktis dalam artikel.

---

## 5.5 Pull, Fetch, dan Push

Buat mental model:

```text
remote
  │
  ├── fetch → mengambil informasi/perubahan
  │
  └── pull  → fetch + mengintegrasikan perubahan

local
  │
  └── push  → mengirim commit ke remote
```

Jelaskan kapan menggunakan masing-masing.

---

# 6. Bagian 3 — Membatalkan Kesalahan Tanpa Panik

Sebelum branch, ajarkan recovery dasar.

## 6.1 Perubahan Belum Di-stage

```bash
git restore <file>
```

## 6.2 Sudah Di-stage

```bash
git restore --staged <file>
```

## 6.3 Commit Sudah Dibuat, Belum Ingin Mengubah History

```bash
git revert <commit>
```

## 6.4 Bedakan `restore`, `revert`, dan `reset`

Gunakan tabel:

| Command   | Tujuan                                           |
| --------- | ------------------------------------------------ |
| `restore` | membuang/mengembalikan perubahan file            |
| `revert`  | membuat commit baru yang membatalkan commit lama |
| `reset`   | memindahkan pointer branch/HEAD                  |

Berikan warning khusus pada:

```bash
git reset --hard
```

Karena ini adalah titik di mana pemula sering panik.

---

# 7. Bagian 4 — Branch: Bekerja Tanpa Mengganggu Main

Mulai dengan skenario:

> Kamu sedang mengerjakan fitur login, tetapi production membutuhkan hotfix.

Tanpa branch:

```text
main
└── semua pekerjaan bercampur
```

Dengan branch:

```text
main
├── hotfix
└── fitur-login
```

## 7.1 Membuat Branch

Gunakan command modern:

```bash
git switch -c fitur-login
```

## 7.2 Berpindah Branch

```bash
git switch main
```

## 7.3 Push Branch

```bash
git push -u origin fitur-login
```

## 7.4 Merge

```bash
git switch main
git merge fitur-login
```

---

# 8. Bagian 5 — Workflow Tim dan Pull Request

Setelah branch dipahami, baru masuk ke kolaborasi.

Workflow:

```text
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

Bahas secara singkat:

* branch protection,
* Pull Request,
* code review,
* merge ke `main`.

Tidak perlu terlalu dalam karena fokus artikel adalah Git, bukan GitHub.

---

# 9. Bagian 6 — Merge vs Rebase

## 9.1 Merge

```bash
git merge main
```

Jelaskan bahwa merge mempertahankan histori percabangan.

## 9.2 Rebase

```bash
git rebase main
```

Jelaskan bahwa commit branch diputar ulang di atas commit terbaru.

## 9.3 Kapan Menggunakan?

Rule praktis:

> Rebase branch pribadi yang belum digunakan orang lain; merge branch yang sudah menjadi bagian dari histori bersama.

Hindari absolutisme "jangan pernah rebase branch yang sudah di-push". Yang lebih tepat:

> Jangan sembarangan me-rebase branch yang sudah dipakai orang lain karena rebase menulis ulang commit dan dapat memaksa orang lain menyelaraskan ulang branch mereka.

---

# 10. Bagian 7 — Membersihkan Riwayat

## Interactive Rebase

```bash
git rebase -i HEAD~5
```

Bahas:

```text
pick
reword
squash
fixup
```

Fokus pada use case, bukan semua kemungkinan.

Contoh:

```text
fix typo
fix typo again
fix typo final
add blog
```

menjadi:

```text
feat(blog): tambah artikel panduan git
```

Tekankan:

> Rapikan commit sebelum histori tersebut menjadi bagian dari branch bersama.

---

# 11. Bagian 8 — Stash dan Cherry-Pick

## Stash

Skenario:

> Sedang mengerjakan fitur A, tetapi harus pindah ke hotfix.

```bash
git stash
git switch main
```

Kemudian:

```bash
git stash pop
```

Tambahkan:

```bash
git stash list
git stash apply
```

---

## Cherry-Pick

Skenario:

> Ada satu commit hotfix di branch lain yang ingin diambil tanpa mengambil seluruh branch.

```bash
git cherry-pick <commit>
```

Jelaskan bahwa cherry-pick membuat commit baru berdasarkan perubahan commit tersebut.

---

# 12. Bagian 9 — Conflict: Saat Git Tidak Bisa Memilih

Mulai dari contoh sederhana:

```text
<<<<<<< HEAD
versi A
=======
versi B
>>>>>>> feature
```

Workflow:

```text
merge/rebase
↓
conflict
↓
buka file
↓
tentukan hasil akhir
↓
hapus marker
↓
git add
↓
lanjutkan operasi
```

Untuk merge:

```bash
git add <file>
git commit
```

Untuk rebase:

```bash
git add <file>
git rebase --continue
```

Untuk membatalkan:

```bash
git merge --abort
git rebase --abort
```

---

# 13. Bagian 10 — Recovery: Saat Sesuatu Benar-Benar Salah

Pisahkan recovery dari workflow normal agar pembaca tidak merasa harus menghafalnya.

## 13.1 Reflog

Skenario:

```bash
git reset --hard HEAD~3
```

lalu sadar:

> "Commit saya tadi ke mana?"

Gunakan:

```bash
git reflog
```

Kemudian:

```bash
git switch -c branch-pemulihan <sha>
```

Tekankan:

> Reflog adalah catatan lokal tentang pergerakan reference Git, bukan backup cloud.

Jangan membuat klaim absolut bahwa semua commit selalu bisa dipulihkan.

---

## 13.2 Bisect

Skenario:

> Aplikasi rusak, tetapi ada 200 commit sejak versi terakhir yang sehat.

```bash
git bisect start
git bisect bad
git bisect good <commit>
```

Kemudian test setiap kandidat sampai Git menemukan commit penyebab.

Gunakan ilustrasi:

```text
200 commits
     ↓
100
 ↓
50
 ↓
25
 ↓
...
 ↓
1 culprit
```

---

# 14. Bagian 11 — Secret dan Kesalahan Serius

Gunakan contoh:

```text
.env
API_KEY=rahasia
```

Jelaskan:

> Menghapus `.env` dari working tree tidak menghapusnya dari histori.

Untuk kasus history rewrite:

```bash
git filter-repo --path .env --invert-paths
```

Tetapi tekankan urutan yang lebih penting:

```text
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

Jangan memberi kesan bahwa membersihkan Git history membuat secret kembali aman.

---

# 15. Bagian 12 — `.gitignore`

Pindahkan `.gitignore` ke bagian yang lebih awal, setelah setup repository.

Contoh:

```gitignore
node_modules/
.next/
.env
```

Tambahkan:

```text
.env.example
```

sebagai tempat dokumentasi nama environment variable tanpa nilai rahasia.

---

# 16. Bagian 13 — Fork dan Upstream

Bagian ini sebaiknya dibuat opsional/advanced karena tidak semua pembaca pemula membutuhkannya.

Workflow:

```text
Original repository
        ↓
      Fork
        ↓
Your repository
        ↓
Local clone
```

Kemudian:

```bash
git remote add upstream <url>
git fetch upstream
git switch main
git merge --ff-only upstream/main
git push origin main
```

Jelaskan perbedaan:

```text
origin   → repository milikmu
upstream → repository sumber
```

Jangan menjadikan bagian ini sebagai inti artikel.

---

# 17. Quick Reference

Di akhir artikel, tambahkan cheat sheet berdasarkan situasi, bukan berdasarkan alphabet command.

## Saya baru mengubah kode

```bash
git status
git diff
git add .
git commit -m "..."
git push
```

## Saya ingin membatalkan perubahan file

```bash
git restore <file>
```

## Saya tidak sengaja melakukan commit

Gunakan:

```bash
git reset
```

jika histori belum dibagikan dan memahami konsekuensinya.

Gunakan:

```bash
git revert <commit>
```

jika commit sudah dibagikan.

## Saya ingin membuat fitur

```bash
git switch -c fitur-baru
```

## Saya harus pindah pekerjaan sementara

```bash
git stash
git switch <branch>
```

## Saya mendapat conflict

```text
buka file
→ selesaikan conflict
→ git add
→ lanjutkan merge/rebase
```

## Saya kehilangan commit

```bash
git reflog
```

## Saya tidak tahu commit mana yang menyebabkan bug

```bash
git bisect
```

---

# 18. Penutup Baru

Penutup jangan berakhir dengan daftar command.

Arahkan pembaca ke mental model:

```text
Git bukan tentang menghafal command.

Git adalah tentang memahami:
1. keadaan repository,
2. perubahan yang ingin disimpan,
3. histori yang ingin dibagikan,
4. dan cara kembali ketika terjadi kesalahan.
```

Kemudian berikan workflow minimum:

```bash
git status
git add .
git commit -m "..."
git push
```

Dan workflow ketika mulai bekerja dengan branch:

```bash
git switch -c fitur-baru
git add .
git commit -m "..."
git push -u origin fitur-baru
```

---

# 19. Prinsip Editorial

## Gunakan istilah secara konsisten

Gunakan:

* repository
* working tree
* staging area
* commit
* branch
* remote
* merge
* rebase
* conflict

Hindari mengganti istilah secara bergantian hanya agar tulisan terasa bervariasi.

---

## Jangan menjadikan command sebagai headline utama

Kurang baik:

> ### `git stash`

Lebih baik:

> ### Saat Harus Meninggalkan Pekerjaan yang Belum Selesai

Kemudian command:

```bash
git stash
```

Dengan demikian pembaca belajar **kapan** menggunakan command sebelum belajar **apa** command-nya.

---

# 20. Urutan Final yang Direkomendasikan

Struktur akhir artikel:

```text
1. Pendahuluan
   └── Mengapa Git?

2. Mental Model Git
   └── Working Tree → Staging → Commit → Remote

3. Workflow Harian
   ├── git status
   ├── git add
   ├── git commit
   ├── git diff
   └── git log

4. Dari Local ke GitHub
   ├── remote
   ├── push
   ├── pull
   └── fetch

5. Membatalkan Kesalahan
   ├── restore
   ├── revert
   └── reset

6. Branch
   ├── switch
   ├── push branch
   └── merge

7. Pull Request & Workflow Tim

8. Merge vs Rebase

9. Membersihkan Commit
   └── rebase -i

10. Stash & Cherry-Pick

11. Conflict Resolution

12. Recovery
    ├── reflog
    └── bisect

13. Secret & History Rewrite

14. Fork & Upstream
    └── Advanced

15. Git Cheat Sheet

16. Penutup
```

## Hasil yang diharapkan

Dengan struktur ini, artikel memiliki alur:

```text
Saya baru mengenal Git
        ↓
Saya bisa menyimpan perubahan
        ↓
Saya bisa mengirimnya ke GitHub
        ↓
Saya bisa membuat branch
        ↓
Saya bisa bekerja dengan tim
        ↓
Saya bisa menangani conflict
        ↓
Saya tahu cara membatalkan kesalahan
        ↓
Saya tahu cara recovery ketika masalah serius terjadi
```

Itu akan terasa jauh lebih seperti **tutorial yang bisa diikuti dari awal sampai selesai**, bukan dokumentasi command Git yang panjang.
