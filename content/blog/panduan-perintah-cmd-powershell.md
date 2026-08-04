# Panduan Lengkap Perintah CMD & PowerShell

*Materi ini disusun untuk Windows 10 dan Windows 11. Semua sintaks mengikuti versi modern dan disajikan dalam bahasa Indonesia baku.*

## Tabel 1: Command Prompt (CMD)

> **Cara menjalankan:** tekan `Win + R`, ketik `cmd`, tekan Enter. Untuk perintah administrasi, klik kanan → **Run as administrator**.

### A. Navigasi Direktori

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `cd` | Pindah direktori | `cd [path]` | `cd C:\Users\Anda\Documents` | Gunakan `cd ..` untuk naik satu tingkat; `cd /d D:\Folder` untuk pindah drive sekaligus. |
| `dir` | Menampilkan isi folder | `dir [path]` | `dir` | Tambahkan `/w` (tampilan lebar) atau `/s` (termasuk subfolder). |
| `cls` | Membersihkan layar | `cls` | `cls` | Perintah paling sering dipakai agar tampilan rapi. |
| `pushd` / `popd` | Simpan & kembali ke direktori | `pushd [path]` lalu `popd` | `pushd D:\Data` → ... → `popd` | Berguna saat berpindah-pindah folder dalam satu sesi. |
| `tree` | Menampilkan struktur folder | `tree [path]` | `tree C:\Users\Anda\Documents` | Gunakan `tree /f` untuk menyertakan nama file. |

### B. Manajemen File & Folder

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `md` / `mkdir` | Membuat folder baru | `md [nama folder]` | `md Laporan2026` | Bisa membuat bertingkat: `md a\b\c`. |
| `rd` / `rmdir` | Menghapus folder | `rd [folder]` | `rd /s /q Laporan2026` | `/s` hapus beserta isinya, `/q` tanpa konfirmasi. Hati-hati! |
| `del` / `erase` | Menghapus file | `del [file]` | `del *.tmp` | File tidak masuk Recycle Bin. Gunakan wildcard `*` dan `?`. |
| `copy` | Menyalin file | `copy [sumber] [tujuan]` | `copy laporan.docx D:\Backup` | Untuk folder lengkap, gunakan `xcopy` atau `robocopy`. |
| `xcopy` | Menyalin file & folder | `xcopy [sumber] [tujuan] /e /i` | `xcopy C:\Data D:\Backup /e /i` | `/e` termasuk subfolder kosong, `/i` anggap tujuan folder. |
| `robocopy` | Menyalin folder tingkat lanjut | `robocopy [sumber] [tujuan] [opsi]` | `robocopy C:\Data D:\Backup /MIR` | Lebih andal daripada `xcopy`; `/MIR` memirror. |
| `move` | Memindahkan file/folder | `move [sumber] [tujuan]` | `move laporan.docx D:\Backup` | Juga bisa dipakai untuk rename (lihat `ren`). |
| `ren` / `rename` | Mengganti nama file/folder | `ren [file lama] [nama baru]` | `ren laporan.docx laporan-final.docx` | Tidak bisa memindahkan antar drive. |
| `attrib` | Mengubah atribut file | `attrib [+/-r/+h/+s] [file]` | `attrib +h data.txt` | `+r` read-only, `+h` hidden, `+s` system. |
| `type` | Menampilkan isi file teks | `type [file]` | `type config.txt` | Untuk file panjang gunakan `more`. |
| `more` | Menampilkan isi file per layar | `more [file]` | `more readme.txt` | Tekan `Space` untuk lanjut, `Q` untuk keluar. |
| `fc` | Membandingkan dua file | `fc [file1] [file2]` | `fc versi1.txt versi2.txt` | Gunakan `fc /b` untuk perbandingan biner. |

### C. Mencari File & Teks

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `where` | Mencari lokasi program | `where [nama program]` | `where notepad` | Menampilkan path lengkap executable. |
| `find` | Mencari teks dalam file | `find "teks" [file]` | `find "ERROR" server.log` | Case-sensitive secara default. |
| `findstr` | Mencari teks dengan pola | `findstr [opsi] "pola" [file]` | `findstr /i "gagal" *.log` | `/i` abaikan huruf besar/kecil; mendukung regex. |
| `dir /s /b` | Mencari file di seluruh subfolder | `dir /s /b [nama file]` | `dir /s /b *.pdf` | Kombinasi paling cepat untuk pencarian nama file. |

### D. Informasi Sistem

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `ver` | Menampilkan versi Windows | `ver` | `ver` | Menampilkan versi build. |
| `systeminfo` | Informasi sistem lengkap | `systeminfo` | `systeminfo` | RAM, OS, hardware, dsb. Butuh waktu beberapa detik. |
| `hostname` | Menampilkan nama komputer | `hostname` | `hostname` | Berguna untuk skrip otomatisasi. |
| `whoami` | Menampilkan user aktif | `whoami` | `whoami` | `whoami /all` menampilkan detail lengkap user & grup. |
| `set` | Menampilkan semua variabel environment | `set` | `set` | `set NAMA=nilai` untuk membuat sementara. |

### E. Informasi & Konfigurasi Jaringan

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `ipconfig` | Menampilkan konfigurasi IP | `ipconfig` | `ipconfig /all` | `/all` detail lengkap; `/flushdns` bersihkan cache DNS. |
| `ping` | Menguji koneksi ke host | `ping [host]` | `ping google.com` | `ping -t` ping terus-menerus (hentikan dengan Ctrl+C). |
| `tracert` | Melacak rute paket | `tracert [host]` | `tracert google.com` | Menampilkan lompatan (hop) menuju tujuan. |
| `pathping` | Gabungan ping + tracert | `pathping [host]` | `pathping google.com` | Analisis kehilangan paket per hop, lebih lambat. |
| `netstat` | Menampilkan koneksi jaringan | `netstat -ano` | `netstat -ano` | `-a` semua koneksi, `-n` tanpa DNS, `-o` PID proses. |
| `nslookup` | Mencari informasi DNS | `nslookup [domain]` | `nslookup google.com` | Menampilkan alamat IP dari nama domain. |
| `getmac` | Menampilkan alamat MAC | `getmac /v` | `getmac /v` | Berguna untuk whitelisting perangkat. |
| `net use` | Menghubungkan drive jaringan | `net use [drive]: [path]` | `net use Z: \\server\data` | `net use Z: /delete` untuk memutuskan. |
| `netsh` | Konfigurasi jaringan tingkat lanjut | `netsh [konteks] [perintah]` | `netsh wlan show profiles` | Konfigurasi Wi-Fi, firewall, dsb. |

### F. Pengelolaan Proses & Program

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `tasklist` | Menampilkan daftar proses | `tasklist` | `tasklist /svc` | `/svc` tampilkan service yang berjalan di tiap proses. |
| `taskkill` | Menghentikan proses | `taskkill /PID [angka] /F` | `taskkill /IM chrome.exe /F` | `/IM` by nama, `/PID` by nomor, `/F` paksa. |
| `start` | Menjalankan program/URL | `start [program/url]` | `start notepad` | `start http://...` untuk membuka browser. |

### G. Pengelolaan Layanan (Service)

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `net start` | Menampilkan/menjalankan service | `net start [nama]` | `net start wuauserv` | Tanpa argumen, menampilkan semua service berjalan. |
| `net stop` | Menghentikan service | `net stop [nama]` | `net stop wuauserv` | Perlu hak administrator. |
| `sc` | Mengontrol service tingkat lanjut | `sc query [nama]` | `sc query | findstr RUNNING` | `sc config [nama] start= auto` mengatur mode startup. |

### H. Variabel Environment & Disk

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `setx` | Menyetel variabel environment permanen | `setx [NAMA] "nilai"` | `setx JAVA_HOME "C:\Program Files\Java\jdk-17"` | Berlaku untuk sesi baru. |
| `echo %VAR%` | Menampilkan nilai variabel | `echo %PATH%` | `echo %USERNAME%` | `%VAR%` adalah sintaks variabel di CMD. |
| `chkdsk` | Memeriksa disk | `chkdsk C:` | `chkdsk C: /f` | `/f` perbaiki error; mungkin perlu restart. |
| `diskpart` | Manajemen disk (partisi, format) | `diskpart` → `list disk` | `list disk` | Mode interaktif — **hati-hati, sangat berbahaya**. |
| `wmic` | Informasi sistem via WMI | `wmic logicaldisk get name,freespace` | `wmic logicaldisk get size,freespace` | Mulai tidak didukung di Windows 11 baru; pakai PowerShell. |

### I. Pengguna, Shutdown & Utilitas

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `net user` | Mengelola akun pengguna | `net user` | `net user Andi /add` | `net user Andi *` untuk set password interaktif. |
| `net localgroup` | Mengelola grup lokal | `net localgroup [grup]` | `net localgroup Administrators` | Tambah user ke grup: `net localgroup Administrators Andi /add`. |
| `runas` | Menjalankan program sebagai user lain | `runas /user:[user] [program]` | `runas /user:Administrator cmd` | Butuh password user tujuan. |
| `shutdown` | Mematikan/me-restart komputer | `shutdown /r /t 0` | `shutdown /s /t 60` | `/s` shutdown, `/r` restart, `/a` batal, `/t` detik. |
| `logoff` | Keluar dari sesi user | `logoff` | `logoff` | Menutup semua aplikasi sesi aktif. |
| `sfc /scannow` | Memperbaiki file sistem | `sfc /scannow` | `sfc /scannow` | Butuh admin; verifikasi integritas file Windows. |
| `DISM` | Memperbaiki image Windows | `DISM /Online /Cleanup-Image /RestoreHealth` | `DISM /Online /Cleanup-Image /RestoreHealth` | Jalankan sebelum `sfc` pada kerusakan parah. |
| `gpupdate` | Memperbarui kebijakan grup | `gpupdate /force` | `gpupdate /force` | Menerapkan kebijakan tanpa restart. |
| `help` | Bantuan untuk perintah | `help [perintah]` | `help cd` | `perintah /?` juga menampilkan bantuan. |
| `exit` | Menutup jendela CMD | `exit` | `exit` | Juga dipakai mengakhiri skrip batch. |
| `title` | Mengatur judul jendela | `title [teks]` | `title Server Monitor` | Berguna membedakan banyak jendela CMD. |
| `date` / `time` | Menampilkan/mengatur tanggal & jam | `time` | `time` | Untuk skrip, gunakan `echo %DATE% %TIME%`. |
| `assoc` | Menampilkan asosiasi ekstensi file | `assoc .txt` | `assoc .txt` | `assoc .txt=txtfile` untuk mengubah asosiasi. |

---

## Tabel 2: Windows PowerShell

> **Cara menjalankan:** klik kanan Start → **Windows PowerShell** atau **Terminal**. Untuk perintah administrasi, pilih *Run as administrator*.
> **Tips:** PowerShell memahami hampir semua perintah CMD (alias bawaan). Tabel ini fokus pada *cmdlet* native PowerShell (pola **Kata Kerja-Kata Benda**, mis. `Get-ChildItem`).

### A. Navigasi Direktori

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `Get-Location` | Menampilkan direktori aktif | `Get-Location` | `Get-Location` | Alias: `pwd`, `gl`. |
| `Set-Location` | Pindah direktori | `Set-Location [path]` | `Set-Location C:\Users\Anda\Documents` | Alias: `cd`, `sl`. |
| `Clear-Host` | Membersihkan layar | `Clear-Host` | `Clear-Host` | Alias: `cls`. |
| `Push-Location` / `Pop-Location` | Simpan & kembali ke direktori | `Push-Location [path]` → `Pop-Location` | `Push-Location D:\Data` → ... → `Pop-Location` | Setara `pushd`/`popd` di CMD. |
| `Get-ChildItem` | Menampilkan isi folder | `Get-ChildItem [path]` | `Get-ChildItem C:\Users\Anda -Recurse` | Alias: `dir`, `ls`, `gci`. `-Recurse` termasuk subfolder. |

### B. Manajemen File & Folder

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `New-Item` | Membuat file/folder | `New-Item -Path [path] -ItemType [type]` | `New-Item -Path Laporan2026 -ItemType Directory` | `-ItemType File` untuk file kosong. |
| `Remove-Item` | Menghapus file/folder | `Remove-Item [path]` | `Remove-Item Laporan2026 -Recurse -Force` | Alias: `rm`, `del`. `-Recurse` untuk folder berisi. |
| `Copy-Item` | Menyalin file/folder | `Copy-Item [sumber] [tujuan]` | `Copy-Item laporan.docx D:\Backup` | Alias: `cp`, `copy`. `-Recurse` untuk folder. |
| `Move-Item` | Memindahkan file/folder | `Move-Item [sumber] [tujuan]` | `Move-Item laporan.docx D:\Backup` | Alias: `mv`, `move`. |
| `Rename-Item` | Mengganti nama file/folder | `Rename-Item [path] -NewName [nama]` | `Rename-Item laporan.docx -NewName laporan-final.docx` | Alias: `ren`, `rni`. |
| `Get-Content` | Menampilkan isi file | `Get-Content [path]` | `Get-Content server.log -Tail 50` | Alias: `cat`, `type`. `-Tail 50` 50 baris terakhir. |
| `Set-Content` | Menulis/menimpa isi file | `Set-Content [path] -Value [teks]` | `Set-Content config.txt -Value "port=8080"` | `Add-Content` untuk menambah tanpa menimpa. |
| `Out-File` | Menyimpan output ke file | `[perintah] \| Out-File [path]` | `Get-Process \| Out-File proses.txt` | Menyimpan hasil apa pun sebagai teks. |
| `Test-Path` | Mengecek keberadaan path | `Test-Path [path]` | `Test-Path C:\Windows` | Mengembalikan `True`/`False`. |
| `Select-String` | Mencari teks dalam file | `Select-String -Path [file] -Pattern [pola]` | `Select-String -Path *.log -Pattern "ERROR"` | Alias: `sls`. Setara `findstr` yang lebih kuat. |
| `Where-Object` | Menyaring objek berdasarkan kondisi | `[objek] \| Where-Object { kondisi }` | `Get-Process \| Where-Object {$_.CPU -gt 100}` | Alias: `?`, `where`. Fitur kunci pipeline PowerShell. |

### C. Informasi Sistem & Jaringan

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `Get-ComputerInfo` | Informasi sistem lengkap | `Get-ComputerInfo` | `Get-ComputerInfo` | RAM, OS, BIOS, dsb. |
| `Get-Date` | Menampilkan tanggal & jam | `Get-Date` | `Get-Date -Format "yyyy-MM-dd"` | Sangat berguna untuk penamaan file backup. |
| `Get-NetIPAddress` | Menampilkan konfigurasi IP | `Get-NetIPAddress` | `Get-NetIPAddress -AddressFamily IPv4` | Setara `ipconfig` modern. |
| `Test-Connection` | Menguji koneksi ke host | `Test-Connection [host]` | `Test-Connection google.com -Count 4` | Alias: `ping`. |
| `Test-NetConnection` | Tes koneksi + port | `Test-NetConnection [host] -Port [port]` | `Test-NetConnection google.com -Port 443` | Alias: `tnc`. Cek konektivitas & port terbuka. |
| `Resolve-DnsName` | Mencari informasi DNS | `Resolve-DnsName [domain]` | `Resolve-DnsName google.com` | Setara `nslookup` modern. |
| `Get-NetTCPConnection` | Menampilkan koneksi jaringan | `Get-NetTCPConnection` | `Get-NetTCPConnection -State Listen` | Setara `netstat -ano` yang lebih terstruktur. |
| `Clear-DnsClientCache` | Membersihkan cache DNS | `Clear-DnsClientCache` | `Clear-DnsClientCache` | Setara `ipconfig /flushdns`. |

### D. Proses, Layanan & Disk

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `Get-Process` | Menampilkan daftar proses | `Get-Process` | `Get-Process chrome` | Alias: `ps`, `gps`. |
| `Stop-Process` | Menghentikan proses | `Stop-Process -Name [nama] -Force` | `Stop-Process -Name chrome -Force` | Alias: `kill`. |
| `Start-Process` | Menjalankan program | `Start-Process [program]` | `Start-Process notepad` | `-Verb RunAs` untuk menjalankan sebagai admin. |
| `Get-Service` | Menampilkan daftar service | `Get-Service` | `Get-Service \| Where-Object {$_.Status -eq "Running"}` | Alias: `gsv`. |
| `Start-Service` / `Stop-Service` | Menjalankan/menghentikan service | `Start-Service [nama]` | `Restart-Service wuauserv` | Butuh admin. `Restart-Service` menggabungkan keduanya. |
| `Get-PSDrive` | Menampilkan drive & lokasi | `Get-PSDrive` | `Get-PSDrive -PSProvider FileSystem` | Termasuk drive jaringan & registry. |
| `Get-Volume` | Menampilkan informasi volume/disk | `Get-Volume` | `Get-Volume` | Kapasitas & ruang bebas per drive. |
| `Get-Disk` | Menampilkan disk fisik | `Get-Disk` | `Get-Disk` | Informasi disk fisik yang terpasang. |

### E. Pengguna, Environment & Utilitas

| Nama Perintah | Fungsi / Deskripsi Singkat | Sintaks Dasar | Contoh Penggunaan | Keterangan |
|---|---|---|---|---|
| `Get-LocalUser` | Menampilkan akun pengguna lokal | `Get-LocalUser` | `Get-LocalUser` | Windows 10/11 modern. |
| `Get-LocalGroup` | Menampilkan grup lokal | `Get-LocalGroup` | `Get-LocalGroup -Name Administrators` | Daftar anggota: `Get-LocalGroupMember -Group "Administrators"`. |
| `$env:NAMA` | Membaca variabel environment | `$env:NAMA` | `$env:USERNAME` | Tulis permanen: `[Environment]::SetEnvironmentVariable("NAMA","nilai","User")`. |
| `Get-ChildItem Env:` | Menampilkan semua variabel env | `Get-ChildItem Env:` | `Get-ChildItem Env: \| Sort-Object Name` | Setara `set` di CMD. |
| `Get-Help` | Bantuan untuk cmdlet | `Get-Help [cmdlet]` | `Get-Help Get-Process -Full` | Alias: `help`. Coba `Update-Help` untuk versi lengkap. |
| `Get-Command` | Mencari cmdlet/alias yang tersedia | `Get-Command [kata]` | `Get-Command *service*` | Menampilkan semua perintah yang cocok dengan pola. |
| `Get-History` | Riwayat perintah sesi ini | `Get-History` | `Get-History \| Select-Object -Last 10` | Riwayat 10 perintah terakhir. |
| `Export-Csv` | Menyimpan output sebagai CSV | `[objek] \| Export-Csv [path]` | `Get-Process \| Export-Csv proses.csv` | Bisa dibuka di Excel. |
| `ConvertTo-Json` | Mengubah output menjadi JSON | `[objek] \| ConvertTo-Json` | `Get-Service \| ConvertTo-Json` | Berguna untuk integrasi API. |
| `Invoke-RestMethod` | Memanggil REST API | `Invoke-RestMethod -Uri [url]` | `Invoke-RestMethod -Uri https://api.github.com/users/rohmansyah23` | Alias: `irm`. Menguji/mengambil data dari API. |
| `Restart-Computer` / `Stop-Computer` | Restart / matikan komputer | `Restart-Computer -Force` | `Restart-Computer -Force` | Setara `shutdown /r` tapi lebih PowerShell-native. |
| `Get-EventLog` / `Get-WinEvent` | Membaca log Windows | `Get-WinEvent -LogName System -MaxEvents 20` | `Get-WinEvent -LogName Application -MaxEvents 10` | Troubleshooting berbasis log. |
| `Set-ExecutionPolicy` | Mengatur kebijakan eksekusi skrip | `Set-ExecutionPolicy RemoteSigned` | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` | Diperlukan sebelum menjalankan file `.ps1`. |
| `Compress-Archive` / `Expand-Archive` | Zip / unzip file | `Compress-Archive [sumber] -DestinationPath [zip]` | `Compress-Archive *.log -DestinationPath log.zip` | Zip bawaan tanpa aplikasi tambahan. |

---

## Perbedaan CMD dan PowerShell

| Aspek | Command Prompt (CMD) | Windows PowerShell |
|---|---|---|
| **Paradigma** | Interpreter perintah berbasis teks (warisan DOS) | Shell + bahasa skrip berorientasi objek berbasis .NET |
| **Output** | Teks murni (string) | **Objek** (dengan properti & metode) |
| **Pipeline** | Meneruskan teks antar perintah | Meneruskan **objek** antar cmdlet (`\|`) |
| **Daya dukung skrip** | Batch sederhana (`.bat`/`.cmd`) | Skrip penuh (`.ps1`) — fungsi, kelas, modul, error handling |
| **Variabel** | `%NAMA%` | `$NAMA`, objek, array, hash table |
| **Jumlah perintah** | Terbatas (sekitar puluhan) | Ribuan cmdlet + akses penuh ke .NET & WMI/CIM |
| **Fitur pengayaan** | Minimal | Formatting otomatis, `Export-Csv`, `ConvertTo-Json`, remoting (WinRM) |
| **Keamanan skrip** | Tanpa pembatasan | `ExecutionPolicy` membatasi eksekusi `.ps1` |
| **Kasus penggunaan** | Tugas cepat & skrip sederhana, kompatibilitas batch lama | Administrasi modern, otomasi, pengelolaan sistem skala besar |
| **Rekomendasi** | Tetap berguna, tapi tidak berkembang | **Standar administrasi Windows modern** — semua materi belajar baru diarahkan ke sini |

**Ringkasnya:** CMD adalah mesin ketik teks — apa yang Anda lihat adalah teks apa adanya. PowerShell adalah mesin objek — setiap output bisa disaring, diurutkan, dan diproses lebih lanjut, menjadikannya jauh lebih fleksibel untuk administrasi dan otomasi.

---

## Rekomendasi Belajar

Urutan perintah yang disarankan untuk pemula, dari paling dasar hingga tingkat lanjut:

### Tahap 1 — Fondasi (Hari 1–3)
1. **Navigasi:** `cd` / `dir` → `Set-Location` / `Get-ChildItem`
2. **Membersihkan layar:** `cls` → `Clear-Host`
3. **Membuat folder:** `md` → `New-Item -ItemType Directory`
4. **Melihat isi file:** `type` → `Get-Content`

### Tahap 2 — Manajemen File (Minggu 1)
5. **Menyalin:** `copy` / `xcopy` → `Copy-Item`
6. **Memindahkan & rename:** `move` / `ren` → `Move-Item` / `Rename-Item`
7. **Menghapus:** `del` / `rd` → `Remove-Item -Recurse -Force`
8. **Mencari file & teks:** `findstr` / `where` → `Select-String` / `Where-Object`

### Tahap 3 — Sistem & Jaringan (Minggu 2)
9. **Informasi sistem:** `systeminfo` / `hostname` / `whoami` → `Get-ComputerInfo`
10. **Jaringan dasar:** `ipconfig` / `ping` / `nslookup` → `Get-NetIPAddress` / `Test-Connection` / `Resolve-DnsName`
11. **Koneksi aktif:** `netstat -ano` → `Get-NetTCPConnection`

### Tahap 4 — Administrasi (Minggu 3–4)
12. **Proses:** `tasklist` / `taskkill` → `Get-Process` / `Stop-Process`
13. **Layanan:** `net start` / `sc` → `Get-Service` / `Restart-Service`
14. **Variabel environment:** `set` / `setx` → `$env:NAMA`
15. **Troubleshooting:** `sfc /scannow` / `DISM` → `Get-WinEvent` / `Test-NetConnection`

### Tahap 5 — Otomasi (Bulan 1+)
16. **Pipeline & filter:** `Where-Object` / `Select-Object` / `Sort-Object`
17. **Skrip pertama:** simpan perintah ke file `.ps1`, atur `ExecutionPolicy`
18. **Output ke file:** `Out-File` / `Export-Csv` / `ConvertTo-Json`
19. **API & integrasi:** `Invoke-RestMethod`
20. **Fungsi & modul:** buat fungsi sendiri untuk tugas berulang

> **Saran praktis:** pelajari perintahnya **di CMD maupun PowerShell sekaligus** — karena keduanya saling melengkapi, dan banyak perintah CMD tetap dipakai dalam skrip modern untuk kompatibilitas. Mulailah dari PowerShell sebagai target utama karena merupakan standar administrasi Windows saat ini.
