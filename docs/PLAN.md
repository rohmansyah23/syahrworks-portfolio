# PLAN — Eksekusi syahrworks-portfolio v2

> **Status:** ✅ AKTIF — terakhir diverifikasi 5 Aug 2026. Sesi sebelumnya terputus; resume point ada di §2b.
> **Sumber:** `docs/PRD.md` + `docs/PROMPT.md` (wajib dibaca sebelum eksekusi) + temuan kondisi aktual direktori.
> **Bahasa percakapan:** Bahasa Indonesia. Konten proyek/pengalaman boleh English (konsisten data lama), artikel blog Bahasa Indonesia.

---

## 1. Ringkasan Eksekutif

Membangun ulang portfolio dari **nol** (bukan fork template) di `D:\A-Projek\Web\syahrworks-portfolio` — multi-page 5 halaman (Home, About, Journey, Blog + detail, Projects) + 404, desain editorial "anti-slop AI" ala tasteskill.dev, stack Next.js 16 / React 19 / TS 5 / Tailwind 4. Repo lama `next-portfolio` **hanya** sebagai sumber konten (`data.json` + `public/`). Satu-satunya fitur dinamis: **GitHub Top Repos** (server fetch + revalidate, fallback wajib).

## 2. Temuan Kondisi Aktual (verifikasi 5 Aug 2026)

| Item | Status | Catatan |
|---|---|---|
| Scaffold `create-next-app` | ✅ Selesai | Next 16.3.0 · React 19.2.8 · TS 5 · Tailwind 4 · App Router · alias `@/*` · tanpa `src/` |
| `npm install` (base) | ❌ **BELUM selesai** | Semua deps status "UNMET DEPENDENCY" → `node_modules` tidak valid. WAJIB `npm install` dulu |
| Deps tambahan (§4) | ❌ Belum | Belum ada di `package.json` (lucide-react, framer-motion, dll) |
| Git & remote | ✅ Siap | `origin` → `rohmansyah23/syahrworks-portfolio.git`; **belum ada commit** (semua untracked) |
| `app/` & `public/` | ❌ Masih template | `globals.css`, `layout.tsx`, `page.tsx` default; `public/` berisi svg default next.js; belum ada `components/`, `data/`, `lib/` |
| `.env*` | ❌ Belum | Buat `.env.local` + `.env.local.example` (Formspree + GITHUB_API_TOKEN) |
| `data.json` lama | ✅ Ada | `next-portfolio\data.json` (14.7 KB) → main, about, socials(5), skills(26), projects(12), experiences(3), educations(2) |
| Aset gambar lama | ✅ Ada | `public/`: profile-me.png, about-me.png, contact.png, favicon.svg, logo-md.svg, logo-sm.svg, herobgc.jpg, waving-hand.gif + `projects/` (12 screenshot) |
| Draft konten baru | ✅ Dibuat | `docs/content-drafts/` → 2 artikel blog + data sertifikasi BNSP |

## 2b. Resume Point (sesi terputus)

Sesi sebelumnya **terputus tepat setelah `create-next-app` selesai, sebelum `npm install` tuntas**.
Tidak ada kode kustom yang ditulis; `app/` & `public/` masih template default; belum ada commit.
**Lanjutan dimulai dari Phase 0 langkah 2** (base install → deps tambahan → salin aset `public/`).

## 3. Keputusan yang Sudah Disepakati User

1. **Data kompetisi** untuk tab Competition → user akan sediakan; sampai tiba, isi placeholder `[TBD]`.
2. **Artikel blog** → sudah didraftkan (2 artikel):
   - `docs/content-drafts/01-ppdb-publication.md` — riset PPDB CO-SCIENCE (Jan 2026), Bahasa Indonesia.
   - `docs/content-drafts/02-cmd-powershell-guide.md` — panduan perintah CMD & PowerShell (2 tabel + perbedaan + rekomendasi belajar).
3. **Sertifikasi BNSP** → data aktual user (bukan nama PRD):
   - Network Administrator Madya (2025–2028, ID TIK.1241.00732 2025)
   - Program Analyst (2024–2027, ID TIK.1241.01755 2024)
   - Software Engineering KKNI Level II (2021–2024, *expired*, ID J1060000542021)
   - Referensi: `docs/content-drafts/journey-bnsp-certifications.md`
4. **Draft artikel menunggu review user** sebelum dimigrasi ke `data/blog.ts` (revisi diperbolehkan).

## 4. Stack & Dependencies (final)

- **Scaffold:** `create-next-app@latest` → TypeScript, App Router, Tailwind, ESLint, import alias `@/*`, **tanpa src/**.
- **Versi:** Next.js 16 (default `@latest`) · React 19 · TS 5 · Tailwind 4 (CSS-first via `@tailwindcss/postcss`, tanpa `tailwind.config.js`).
- **Font (`next/font/google`):** Instrument Serif (display) · Inter (body) · JetBrains Mono (micro-label/angka).
- **Runtime deps:** `lucide-react`, `react-icons`, `next-themes`, `framer-motion`, `cva`, `clsx`, `tailwind-merge`, `@radix-ui/react-dialog`, `react-markdown`, `react-toastify`.
- **Dilarang:** `react-scroll`, `typewriter-effect`, `@next/font`, firebase, sendgrid, prisma/drizzle, database apa pun.
- **Env:** `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xdaqpdrl` · `GITHUB_API_TOKEN` (opsional, server-only). Siapkan `.env.local` + `.env.local.example`.

## 5. Arsitektur File Target

```
app/
  layout.tsx  globals.css  page.tsx (Home)
  about/page.tsx  journey/page.tsx  projects/page.tsx
  blog/page.tsx  blog/[slug]/page.tsx
  not-found.tsx  sitemap.ts  robots.ts  loading.tsx (opsional)
components/
  Header.tsx  Footer.tsx
  home/    HeroSection · GetInTouch · TechStack · TopRepos · LatestBlogs
  about/   AboutSection · CVDialog
  journey/ Timeline · TimelineItem
  blog/    BlogGrid · BlogCard
  projects/ ProjectGrid · ProjectCard · ProjectModal · GalleryModal
  ui/      button · input · badge · dialog
data/    site · main · techStack · about · journey · projects · blog · socials (modul TS ber-type)
lib/     github.ts · utils.ts · types.ts
public/  (salinan aset dari repo lama)
```

## 6. Strategi Migrasi Konten (`data.json` → modul TS)

- **main** → `data/main.ts` (name, logo="SyahrWorks" wordmark, tagline, titles[] statis TANPA typewriter, heroImage, getInTouch[]).
- **skills (26)** → `data/techStack.ts` 3 grup: Backend / Frontend / Tools (mapping per PRD §9; Flutter/Dart/Kotlin masuk Frontend).
- **about** → `data/about.ts` (aboutImage, intro, philosophy[], workingStyle[], favoriteTech[], quote, resumeUrl dari drive link lama).
- **experiences (3)** → `data/journey.ts` type Full-Time/Part-Time (Freelance, SMKS Jakarta 1, Milagros).
- **educations (2)** → `data/journey.ts` type Education (UBSI, SMKS Jakarta 1).
- **Sertifikasi BNSP (3)** → `data/journey.ts` type Certification (data aktual user, lihat §3).
- **Competition** → placeholder `[TBD]` sampai user kirim data.
- **projects (12)** → `data/projects.ts` + field baru: `role`, `techStack[]`, `tags[]` (kategori: Web Development / Mobile / AI & Data / Desktop & Tools — default: mapping dari techstack lama, menunggu verifikasi user), `githubUrl/liveUrl/docUrl`, `gallery[]`.
- **blog** → `data/blog.ts` dari draft `docs/content-drafts/01-…` & `02-…` (setelah review user).
- **socials (5)** → `data/socials.ts` (GitHub, Instagram, LinkedIn, YouTube, WhatsApp).

## 7. Phase Eksekusi

### Phase 0 — Scaffold & Persiapan
1. `cd D:\A-Projek\Web && npx create-next-app@latest syahrworks-portfolio` (TS + App Router + Tailwind + ESLint + alias `@/*`, tanpa src/).
2. `npm install` deps tambahan (§4).
3. Salin aset `public/` dari `next-portfolio` (semua file + folder `projects/`).

### Phase 1 — Fondasi
4. `lib/types.ts` (tipe semua data) + `lib/utils.ts` (`cn()` = clsx + tailwind-merge).
5. `data/*.ts` — migrasi & perluas konten (lihat §6). Blog diisi dari draft (revisi user bila ada).
6. `app/globals.css` — Tailwind 4 CSS-first + CSS variables light/dark (§9) + style markdown blog.
7. `app/layout.tsx` — 3 font + ThemeProvider (next-themes) + Header + Footer.
8. `components/ui/*` — primitives flat hairline (button, input, badge, dialog).
9. `components/Header.tsx` — wordmark "SyahrWorks", nav 5 halaman (aktif state), theme toggle, drawer mobile, sticky blur + border-b.
10. `components/Footer.tsx` — Navigations, Contact, sosial, copyright.

### Phase 2 — Halaman (urutan build)
11. **Home** — Hero editorial statis (01 — HOME) → Get In Touch (02) → Tech Stack (03) → TopRepos (04) → Latest Blog (05) → Contact Formspree (06, validasi email + toast).
12. **About** — 01 — ABOUT: foto sticky, bio, Engineering Philosophy, Working Style, Technologies I Love, quote, tombol View CV (modal PDF).
13. **Journey** — 01 — JOURNEY: tabs filter 5 type, timeline (garis tengah desktop / kiri mobile), item: logo, periode, judul, subtitle, bullet, chips tools.
14. **Projects** — 01 — PROJECTS: filter kategori, grid asimetris/bento, kartu → ProjectModal (desc, role, techStack, links, galeri) → GalleryModal.
15. **Blog** — 01 — BLOG: search + tag filter chips, grid kartu, "No posts found". **Detail `[slug]`**: cover, meta, markdown, back link, `generateStaticParams`.
16. **404** — micro-label 404, "Page not found", tombol kembali.
17. **SEO** — `app/sitemap.ts`, `app/robots.ts`, `generateMetadata` per halaman.

### Phase 3 — Dinamis & QA
18. `lib/github.ts` + `components/home/TopRepos.tsx` — fetch repos `rohmansyah23` (per_page=100, sort=pushed), sort by stargazers desc, ambil 6, `revalidate = 3600`, auth header bila token ada, **fallback wajib** (gagal/kosong → pesan ringan atau hide, build tidak boleh crash).
19. `.env.local` (salin endpoint Formspree dari repo lama + `GITHUB_API_TOKEN` opsional) + `.env.local.example`.
20. **Verifikasi:** `npm run lint` → `npm run build` (harus lolos, termasuk tanpa env) → manual test `npm run dev`.
21. **Cek Anti-Slop Checklist** §9 (visual: tanpa gradient ungu/blob/typewriter/emoji-label).

## 8. Manual Test Checklist (npm run dev)

- [ ] 5 halaman + 404 ter-render.
- [ ] Dark/light toggle (no flash) + responsive mobile.
- [ ] Journey: 5 tab filter berfungsi.
- [ ] Blog: search + filter tag + detail artikel (markdown render).
- [ ] Projects: filter kategori + ProjectModal + GalleryModal.
- [ ] Form kontak: validasi email + toast (Formspree).
- [ ] TopRepos tampil (dan fallback saat fetch gagal).
- [ ] Logo wordmark "SyahrWorks", hero statis tanpa typewriter.

## 9. Design System — "Editorial Anti-Slop" (ringkasan wajib)

- **Palet:** bg `#FAFAF9` (light) / `#0A0A0A` (dark) · ink `#111111` / `#E6E6E6` · muted `#6B7280`/`#A1A1AA` · accent **deep violet (hemat)** · hairline `#E5E5E5`/`#262626`.
- **Tipografi:** Instrument Serif (heading besar tight) · Inter (body) · JetBrains Mono (micro-label uppercase `tracking-widest` ~0.7rem, contoh `01 — ABOUT`).
- **Layout:** container max ~72rem, py-20/28, section bernomor index, kartu flat hairline radius 2–6px, button primary solid ink (bukan pill ungu), grid proyek asimetris/bento, motion 200–300ms bertujuan.
- **Anti-Slop Checklist:** ❌ gradient ungu/indigo · ❌ blob/glassmorphism · ❌ hero centered + floating icons/typewriter · ❌ emoji label section · ❌ look shadcn default (rounded-xl + shadow abu) · ❌ grid 3 kolom identik tanpa hierarki.
- **CSS variables:** `--background, --foreground, --card, --border, --primary, --muted, --muted-foreground, --accent` (light default, dark toggle).

## 10. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Build gagal React 19 + dep lama | Hindari typewriter-effect/react-scroll; verifikasi peer deps saat install |
| GitHub API rate limit (60/jam) | Cache revalidate 1 jam + token opsional + fallback rapi |
| Konten tidak lengkap (kompetisi) | Placeholder `[TBD]` dulu, isi menyusul |
| Gambar proyek tidak konsisten resolusi | Reuse apa adanya; `object-cover` pada kartu |
| Desain editorial terlihat kosong/flat | Jaga hierarki tipografi & whitespace; validasi via screenshots |

## 11. Acceptance Criteria (Definition of Done)

- [ ] `npm install` tanpa error peer deps.
- [ ] `npm run lint` tanpa error.
- [ ] `npm run build` LOLOS (statis + generateStaticParams; TopRepos tidak menghambat; sukses tanpa env).
- [ ] Manual test §8 terpenuhi.
- [ ] Anti-Slop Checklist §9 terpenuhi secara visual.
- [ ] Konten migrasi utuh: 12 proyek, 3 pengalaman, 2 pendidikan, 26 skill, 5 sosial + 3 sertifikasi BNSP + kompetisi (bila ada).
- [ ] Repo lama `next-portfolio` TIDAK berubah.
- [ ] Deploy Vercel → `syahrworks.vercel.app`.

## 12. Non-Goals (pengingat)

- ❌ Menyentuh/memodifikasi `D:\A-Projek\Web\next-portfolio`.
- ❌ Menyalin teks/konten ShinyQ (Kurniadi) — hanya struktur halaman.
- ❌ Fitur dinamis lain (visitor counter, KV, R2, database, auth, CMS). Dinamis hanya GitHub Top Repos.
- ❌ Efek typewriter / pola desain AI-slop.
