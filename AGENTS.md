# AGENTS.md — syahrworks-portfolio (instruksi universal untuk coding agent)

Dokumen ini dibaca otomatis oleh berbagai coding agent (opencode, Cursor, Claude Code, Codex, Gemini CLI, dll).
Sebelum menulis kode, agent WAJIB membaca:
- `docs/PRD.md` — requirements lengkap
- `docs/PROMPT.md` — super prompt eksekusi (instruksi langkah-demi-langkah)

---

## 1. Project Overview
- Portfolio v2 milik **Muhammad Rohman Syah (SyahrWorks)**, dibangun 100% dari nol.
- Stack: **Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4** (CSS-first, tanpa `tailwind.config.js`).
- Arsitektur: App Router, multi-page 5 halaman: **Home, About, Journey, Blog (+detail), Projects** + 404.
- Deploy: Vercel → `syahrworks.vercel.app` · Repo: `rohmansyah23/syahrworks-portfolio`.
- Bahasa percakapan dengan user: **Bahasa Indonesia**. Konten proyek/pengalaman boleh English (konsisten data lama), artikel blog Bahasa Indonesia.

## 2. Rules Wajib (Hard Constraints)
- **DILARANG** menyentuh/memodifikasi `D:\A-Projek\Web\next-portfolio` (repo arsip lama). Hanya dipakai sebagai SUMBER KONTEN: `data.json` + `public/` (gambar).
- **DILARANG** menyalin teks/konten milik ShinyQ (Kurniadi) — struktur halaman boleh diadopsi, konten & bahasa desain TIDAK.
- **TANPA database** (Neon/Postgres, Prisma, ORM, migrasi), tanpa autentikasi, tanpa CMS/dashboard. Konten 100% statis via modul TS di `data/`.
- Satu-satunya fitur dinamis: **GitHub Top Repos** (server fetch + cache revalidate, fallback wajib).
- **TANPA** efek typewriter, `react-scroll`, `@next/font`, firebase, sendgrid.

## 3. Stack & Commands
- Scaffold: `create-next-app@latest` (TypeScript, App Router, Tailwind, ESLint, import alias `@/*`, tanpa src/).
- Font (`next/font/google`): **Instrument Serif** (display) · **Inter** (body) · **JetBrains Mono** (label/angka).
- Runtime deps: `lucide-react`, `react-icons`, `next-themes`, `framer-motion`, `cva`, `clsx`, `tailwind-merge`, `@radix-ui/react-dialog`, `react-markdown`, `react-toastify`.
- Env: `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xdaqpdrl` · `GITHUB_API_TOKEN` (opsional, server-only).
- Commands:
  - `npm install`
  - `npm run dev`
  - `npm run lint`
  - `npm run build`

## 4. Arsitektur File
```
app/                        # layout, globals.css, page.tsx, about/journey/projects/blog/[slug]/not-found/sitemap/robots
components/                 # Header, Footer, home/*, about/*, journey/*, blog/*, projects/*, ui/*
data/                       # site, main, techStack, about, journey, projects, blog, socials (modul TS ber-type)
lib/                        # github.ts, utils.ts, types.ts
public/                     # salinan aset dari repo lama (foto, gambar proyek, favicon)
docs/                       # PRD.md, PROMPT.md (sumber spesifikasi)
```

## 5. Data Model (ringkasan)
- `main` → name, logo="SyahrWorks" (wordmark), tagline, titles[] (peran, hero statis tanpa typewriter), heroImage, getInTouch[].
- `techStack` → 3 grup: Backend / Frontend / Tools.
- `about` → aboutImage, intro, philosophy[], workingStyle[], favoriteTech[], quote, resumeUrl.
- `journey` → `type: Full-Time|Part-Time|Education|Certification|Competition`. Konten: 1 Full-Time (Freelance), 2 Part-Time (SMKS Jakarta 1, Milagros), 2 Education (UBSI, SMKS Jakarta 1), 3 BNSP Certification, Competition (placeholder).
- `projects` → 12 proyek: CroCode, PawsCare, QC Mobile, Auto-Refresh Bot, Red Line Guardian AI, Pustaka Booking, AI Go, Eat Scroll, Taskbar Navigator, Catering Mama Akbar, Milagros Web, Shress. Field: role, techStack[], tags[] (kategori), githubUrl/liveUrl/docUrl, gallery[].
- `blog` → slug, title, date, excerpt, coverImage, tags, category, readingTime, author, featured, body (markdown). Mulai 1–2 artikel.
- `socials` → GitHub, Instagram, LinkedIn, YouTube, WhatsApp.

## 6. Design System — "Editorial Anti-Slop" (referensi: tasteskill.dev)
**Prinsip:** typography-led, whitespace besar, palet dibatasi, detail halus. Jangan membuat desain yang terlihat seperti "template AI generik".

### Anti-Slop Checklist (WAJIB)
- ❌ Tanpa gradient ungu/indigo, tanpa "blob" background, tanpa glassmorphism.
- ❌ Tanpa hero centered + floating icon circles / efek typewriter.
- ❌ Tanpa emoji sebagai label section; tanpa look default shadcn (rounded-xl + shadow abu di semua elemen).
- ❌ Tanpa grid 3 kolom identik tanpa hierarki.
- ✅ Typografi jadi hero: heading besar serif, tight, hierarki jelas.
- ✅ Palet dibatasi (2–3 warna) + whitespace besar.
- ✅ Detail halus: hairline border, index number, micro-label uppercase + letter-spacing.
- ✅ Motion minimal & bertujuan (200–300ms) — bukan animasi dekoratif/loop.
- ✅ Konten-first: screenshot proyek & angka nyata lebih menonjol daripada ikon dekoratif.

### Palet & Tipografi
- Background `#FAFAF9` (default **light**) / dark `#0A0A0A` · Ink `#111111` / `#E6E6E6` · Muted `#6B7280`/`#A1A1AA` · Accent **deep violet (hemat)** · Hairline `#E5E5E5`/`#262626`.
- Heading: Instrument Serif. Body: Inter. Mono: JetBrains Mono (micro-label uppercase `tracking-widest` ~0.7rem, contoh `01 — ABOUT`).
- Kartu flat hairline, radius kecil (2–6px); button primary **solid ink** (bukan pill ungu); grid proyek **asimetris/bento**.

## 7. Non-Goals
- Tidak menambah fitur dinamis lain (visitor counter, R2, KV, database, auth).
- Tidak membuat dashboard admin/CMS.
- Tidak mengubah repo lama.

## 8. Verification Checklist
- [ ] `npm install` tanpa error peer deps.
- [ ] `npm run lint` tanpa error.
- [ ] `npm run build` LOLOS (build statis + `generateStaticParams`; TopRepos tidak menghambat build; tetap sukses tanpa env).
- [ ] `npm run dev` manual test: 5 halaman, 404, dark/light toggle, responsive, filter Journey (5 tab), search+filter Blog + detail, filter Projects + modal + galeri, form kontak (validasi + toast), TopRepos tampil.
- [ ] Anti-Slop Checklist §6 terpenuhi secara visual.
