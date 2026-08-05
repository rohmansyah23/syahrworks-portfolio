# PRD — syahrworks-portfolio v2

## 1. Metadata
| | |
|---|---|
| **Nama Project** | syahrworks-portfolio (Portfolio v2) |
| **Status** | Draft untuk implementasi |
| **Versi** | 2.0 |
| **Author** | Muhammad Rohman Syah (SyahrWorks) |
| **Repo lama (arsip)** | `rohmansyah23/next-portofolio` — **tidak boleh disentuh** |
| **Repo baru** | `rohmansyah23/syahrworks-portfolio` |
| **Domain** | `syahrworks.vercel.app` |
| **Referensi desain** | `https://www.tasteskill.dev/` — desain editorial "anti slop AI" |
| **Referensi struktur** | `ShinyQ/ShinyQ-Playground` (live: kurniadi.pages.dev) — hanya struktur & arsitektur halaman, BUKAN gaya/konten |

## 2. Ringkasan Eksekutif
Membangun ulang web portofolio dari **nol** (bukan fork template) menjadi situs multi-page 5 halaman dengan **desain editorial typography-led yang relevan dan "anti slop AI"** — ala tasteskill.dev — dengan konten & identitas milik SyahrWorks. Menggantikan repo lama yang berbasis template generik (single-page, Next 13). Stack dinaikkan ke Next.js 16 + React 19 + Tailwind 4.

## 3. Latar Belakang & Masalah
- Repo lama `next-portfolio` berasal dari template orang lain (Jigar Sable) → tampilan "terlalu umum": satu halaman scroll, tombol violet standar, section generik.
- Tidak mencerminkan karakter developer dan kurang showcase yang menarik.
- Pola desain generik AI (gradient ungu, glassmorphism, kartu uniform, efek typewriter) justru ingin dihindari.
- Stack sudah usang (Next 13, React 18, Tailwind 3, `@next/font` deprecated).

## 4. Tujuan & Success Metrics
**Tujuan:**
1. Portfolio multi-page dengan **bahasa desain editorial yang relevan & anti AI-slop** (typography-led, whitespace besar, palet dibatasi) ala tasteskill.dev.
2. Mempertahankan seluruh konten lama (12 proyek, pengalaman, pendidikan, skill, sosial) + menambah konten baru (sertifikasi/kompetisi, blog).
3. Stack modern & maintainable (Next 16 / React 19 / Tailwind 4 / TS).
4. SEO-friendly (metadata, sitemap, robots) dengan performa statis optimal.

**Success metrics:** build & lint lolos; 5 halaman + 404 ter-render statis; Lighthouse ≥ 90 untuk performa & SEO (target); data pribadi & sosial tetap akurat.

## 5. Non-Goals (yang TIDAK dikerjakan)
- Tidak menyentuh/modifikasi repo lama.
- Tidak menyalin teks/konten milik ShinyQ (Kurniadi) — hanya struktur halaman.
- Tidak ada fitur dinamis lain: **tanpa** visitor counter, Cloudflare KV, R2, **tanpa database (Neon/Postgres, Prisma, ORM, migrasi)**, autentikasi, dashboard admin/CMS. Konten 100% statis (modul TS / `data.json`). Satu-satunya fitur dinamis = widget GitHub Pinned Repos (server fetch + cache).
- Tanpa efek typewriter, tanpa pola desain "AI slop" (lihat §12 Anti-Slop Checklist).

## 6. Referensi
- **Desain (bahasa desain):** `https://www.tasteskill.dev/` — "The Anti-Slop Frontend Framework": editorial, typography-led, whitespace besar, palet dibatasi, detail halus (hairline border, index number, micro-label), motion minimal. Halaman: Docs, Changelog, Blog, Guide. Sumber prinsip, BUKAN untuk ditiru 1:1.
- **Struktur (arsitektur halaman):** `https://github.com/ShinyQ/ShinyQ-Playground` — halaman: Home, About, Journey, Blog (+detail), Projects, 404; timeline ber-tab; project modal; blog search+filter. Hanya struktur & fitur interaksi yang diadopsi.
- **Konten lama:** `D:\A-Projek\Web\next-portfolio\data.json` (main, about, socials, skills, projects, experiences, educations) + `public/` (gambar).

## 7. Stack & Dependencies
**Scaffold:** `create-next-app@latest` → TypeScript, App Router, Tailwind, ESLint, import alias `@/*`.

- Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4 (CSS-first, `@tailwindcss/postcss`, tanpa tailwind.config.js).
- Font via `next/font/google`:
  - **Instrument Serif** (display/serif — heading utama, editorial)
  - **Inter** (sans — body/UI)
  - **JetBrains Mono** (mono — micro-label, angka, kode)
- Runtime deps: `lucide-react`, `react-icons`, `next-themes`, `framer-motion`, `cva`, `clsx`, `tailwind-merge`, `@radix-ui/react-dialog`, `react-markdown`, `react-toastify`.
- **Dilarang:** `react-scroll`, `typewriter-effect` (hero statis, tanpa typewriter), `@next/font`, firebase, sendgrid, prisma/drizzle.
- **Env:**
  - `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xdaqpdrl` (dari repo lama)
  - `GITHUB_API_TOKEN` (opsional, server-only)

## 8. Arsitektur File
```
syahrworks-portfolio/
  app/
    layout.tsx  globals.css  page.tsx (Home)
    about/page.tsx  journey/page.tsx  projects/page.tsx
    blog/page.tsx  blog/[slug]/page.tsx
    not-found.tsx  sitemap.ts  robots.ts  loading.tsx(opsional)
  components/
    Header.tsx  Footer.tsx
    home/    HeroSection · GetInTouch · TechStack · PinnedRepos · LatestBlogs
    about/   AboutSection · CVDialog
    journey/ Timeline · TimelineItem
    blog/    BlogGrid · BlogCard
    projects/ ProjectGrid · ProjectCard · ProjectModal · GalleryModal
    ui/      button · input · badge · dialog
  data/    site · main · techStack · about · journey · projects · blog · socials
  lib/     github.ts · utils.ts · types.ts
  public/  (salinan aset dari repo lama)
```

## 9. Struktur Data (modul TS ber-type, migrasi dari data.json lama)
- **main**: name="Muhammad Rohman Syah", logo="SyahrWorks" (wordmark), tagline, titles[] (peran; hero menampilkan statis, TANPA typewriter), heroImage, getInTouch[] (Location: Jakarta, Email, GitHub, LinkedIn, WhatsApp).
- **techStack**: 3 grup — Backend (PHP, CodeIgniter, Laravel, Node.js, Go, Python, SQL, PostgreSQL, MySQL, Supabase, Prisma, Firebase), Frontend (HTML5, CSS3, JS, TS, Bootstrap, Tailwind, React, Next.js, Flutter, Dart, Kotlin), Tools (Git, GitHub, Vercel).
- **about**: aboutImage, intro (dari data lama), philosophy[], workingStyle[], favoriteTech[], quote, resumeUrl (`/CV-Muhammad-Rohman-Syah.pdf` — self-hosted di `public/`).
- **journey** (`type: Full-Time|Part-Time|Education|Certification|Competition`):
  - Full-Time: Freelance Full-Stack Developer (Jan 2024–Present)
  - Part-Time: IT Support & Teaching Assistant (SMKS Jakarta 1, Okt–Des 2024); Operational Admin & Stockist (Milagros, Feb 2021–Des 2024)
  - Education: UBSI S1 TI (Agu 2021–Des 2025); SMKS Jakarta 1 (Jul 2018–Jun 2021)
  - Certification: **BNSP Software Engineering (KKNI II), BNSP Program Analysis, BNSP Intermediate Network Administration** (+ tambahan bila ada)
  - Competition: *(perlu data dari user)*
- **projects**: 12 proyek (CroCode, PawsCare, QC Mobile, Auto-Refresh Bot, Red Line Guardian AI, Pustaka Booking, AI Go, Eat Scroll, Taskbar Navigator, Catering Mama Akbar, Milagros Web, Shress) → tambah `role`, `techStack[]`, `tags[]` (kategori: Web Development / Mobile / AI & Data / Desktop & Tools), `githubUrl/liveUrl/docUrl`, `gallery[]`.
- **blog**: `{slug, title, date, excerpt, coverImage, tags, category, readingTime, author, featured, body(markdown)}` — mulai 1–2 artikel (Bahasa Indonesia).
- **socials**: GitHub, Instagram, LinkedIn, YouTube, WhatsApp.

## 10. Spesifikasi Halaman
**Navbar (global, sticky blur):** logo **wordmark "SyahrWorks"**, menu Home/About/Journey/Blog/Projects (state aktif), theme toggle, drawer mobile. **Footer (global):** Navigations, Contact, sosial, copyright.

1. **Home (`/`)** — Hero **editorial statis** (micro-label `01 — HOME`, nama besar serif "Muhammad Rohman Syah", subtitle `main.tagline`, 2 CTA ke /journey & /about; tanpa typewriter) → Get In Touch (micro-label `02 — GET IN TOUCH`, kartu info minimal) → Tech Stack (`03 — TECH STACK`, 3 grup ikon) → GitHub Pinned Repos (`04 — PINNED REPOS`, 6 repo + "View All") → Latest Blog (`05 — FROM THE BLOG`) → Contact form Formspree (`06 — CONTACT`, validasi email + toast).
2. **About (`/about`)** — micro-label `01 — ABOUT`, judul serif besar, foto (sticky desktop), bio, ⚙️ Engineering Philosophy, 💻 Working Style, ✨ Technologies I Love, blockquote, tombol **View CV** (modal PDF).
3. **Journey (`/journey`)** — micro-label `01 — JOURNEY`, tabs filter 5 type, timeline garis tengah/kiri, item: logo, periode, judul, subtitle, bullet, chips tools.
4. **Blog (`/blog`)** — micro-label `01 — BLOG`, search + tag chips, grid kartu, "No posts found". **Detail `/blog/[slug]`** — cover, meta, render markdown, back link, `generateStaticParams`.
5. **Projects (`/projects`)** — micro-label `01 — PROJECTS`, filter kategori, grid asimetris/bento, kartu → **ProjectModal** (desc, role, techStack, links, galeri → GalleryModal).
6. **404** — micro-label `404`, "Page not found", tombol kembali.

## 11. Fitur Dinamis
**GitHub Pinned Repos** (server component):
- `lib/github.ts`: POST GraphQL `api.github.com/graphql` (`Authorization: Bearer` dari `GITHUB_API_TOKEN`, WAJIB ada) query `user(login:"rohmansyah23") { pinnedItems(first: 6, types: [REPOSITORY]) { nodes { ... } } }`, ambil 6 repo yang di-pin.
- Cache Next (`revalidate = 3600`) — tanpa KV, tanpa database.
- **Fallback wajib**: token tidak ada/fetch gagal/kosong → pesan ringan atau hide section, build TIDAK boleh crash.

## 12. Design System — "Editorial Anti-Slop" (referensi: tasteskill.dev)
**Prinsip:** typography-led, whitespace-driven, palet dibatasi, detail halus. Desain berkarakter yang TIDAK terlihat seperti "template AI generik".

### Anti-Slop Checklist (WAJIB dipatuhi)
- ❌ Tanpa gradient ungu/indigo, tanpa "blob" background, tanpa glassmorphism.
- ❌ Tanpa hero centered dengan floating icon circles / efek typewriter.
- ❌ Tanpa emoji sebagai label section; tanpa look default shadcn (rounded-xl + shadow abu di semua elemen).
- ❌ Tanpa grid 3 kolom identik tanpa hierarki.
- ✅ Typografi jadi hero: heading besar, tight, hierarki jelas.
- ✅ Palet dibatasi (2–3 warna) + whitespace besar.
- ✅ Detail halus: hairline border, index number, micro-label uppercase + letter-spacing.
- ✅ Motion minimal & bertujuan (200–300ms, fade/slide saat scroll, hover state) — bukan animasi dekoratif/loop.
- ✅ Konten-first: screenshot proyek & angka nyata lebih menonjol daripada ikon dekoratif.

### Palet
- Background: **paper/off-white `#FAFAF9`** — default **light**; dark mode: near-black `#0A0A0A`.
- Ink: near-black `#111111` (light) / off-white `#E6E6E6` (dark).
- Muted: gray netral `#6B7280` (light) / `#A1A1AA` (dark).
- Accent: **deep violet**, dipakai **hemat** (link, active, hover, highlight kecil) — bukan dominan.
- Hairline/border: `#E5E5E5` (light) / `#262626` (dark).
- Semantic: success/danger hanya untuk status (toast).

### Tipografi
- **Display (serif):** Instrument Serif — heading utama, ukuran besar (`clamp`), `line-height` tight.
- **Body (sans):** Inter — teks & UI.
- **Mono:** JetBrains Mono — micro-label, angka, kode.
- **Micro-label:** uppercase, mono, `tracking-widest`, ~`0.7rem`. Contoh: `01 — ABOUT`, `SELECTED WORK`.

### Layout & Komponen
- Container max ~`72rem`, whitespace generatif antar section (`py-20/28`).
- Section diberi nomor index (`01`, `02`, …) — gaya editorial.
- Kartu: `border` hairline, radius kecil (2–6px), flat; hover → `border-accent` + subtle shift/background.
- Button primary: **solid ink** (`bg-foreground text-background`); secondary: outline hairline; ghost: teks. Bukan pill ungu.
- Grid proyek: **asimetris/bento** (featured besar + kecil) — hierarki jelas, bukan kolom seragam.
- Header minimal: wordmark + nav kanan + hairline border bawah.
- Ikon Get-in-touch: pakai `lucide-react` (bukan emoji).
- CSS variables (light/dark): `--background, --foreground, --card, --border, --primary, --muted, --muted-foreground, --accent`. Default **light**, toggle dark tersedia.

## 13. SEO & Performa
- `app/sitemap.ts`, `app/robots.ts`, `generateMetadata` per halaman (title/description/og/twitter).
- `next/image` untuk aset statis & **screenshot proyek** (beri `sizes`, `priority` hanya hero); `loading="lazy"` non-hero.
- Semua halaman statis (static generation); PinnedRepos di-revalidate (ISR-style).

## 14. Konten yang Perlu Disediakan User
1. Daftar **kompetisi** (untuk tab Competition).
2. **1–2 artikel blog** (atau saya draftkan).
3. Verifikasi **role + tags per proyek** (default: saya mapping dari field techstack).
4. Konfirmasi akun GitHub target untuk widget (asumsi: `rohmansyah23`).

## 15. Milestones (urutan eksekusi)
1. Scaffold `create-next-app` di `D:\A-Projek\Web\syahrworks-portfolio` + `git init` + remote repo GitHub baru.
2. Salin aset `public/` dari repo lama.
3. Setup types + data modules (migrasi & perluas konten).
4. Build UI primitives + layout (font, theme, header, footer).
5. Bangun halaman: Home → About → Journey → Projects → Blog(+detail) → 404 → SEO.
6. Implementasi PinnedRepos + fallback.
7. `.env.local` + `.env.local.example`.
8. QA & verifikasi.

## 16. Risiko & Mitigasi
| Risiko | Mitigasi |
|---|---|
| Build gagal karena React 19 + dep lama | Hindari typewriter-effect/react-scroll; verifikasi peer deps |
| GitHub API rate limit (60/jam) | Cache revalidate 1 jam + token opsional + fallback |
| Konten tidak lengkap (kompetisi/blog) | Draft placeholder dulu, isi menyusul |
| Gambar proyek lama tidak konsisten resolusi | Reuse apa adanya; `object-cover` pada kartu |
| Desain editorial terlihat kosong/flat | Jaga hierarki tipografi & whitespace; validasi via screenshots |

## 17. Verifikasi & Acceptance Criteria
- [ ] `npm install` tanpa error peer deps.
- [ ] `npm run lint` tanpa error.
- [ ] `npm run build` LOLOS (build statis + generateStaticParams; PinnedRepos tidak menghambat build).
- [ ] Manual test `npm run dev`: semua 5 halaman, 404, dark/light toggle, responsive, filter Journey (5 tab), search+filter Blog + detail artikel, filter Projects + modal + galeri, form kontak (validasi + toast), PinnedRepos tampil.
- [ ] Build tetap sukses tanpa env (fallback PinnedRepos).
- [ ] Anti-Slop Checklist §12 terpenuhi (tidak ada gradient ungu/blob/typewriter/emoji-label).
- [ ] Deploy ke Vercel → `syahrworks.vercel.app`; repo baru `rohmansyah23/syahrworks-portfolio`.

## 18. Kriteria Done (Definition of Done)
Seluruh acceptance criteria §17 terpenuhi; konten migrasi utuh (12 proyek, 3 pengalaman, 2 pendidikan, 26 skill, sosial); repo lama tidak berubah; domain lama dialihkan ke repo baru.
