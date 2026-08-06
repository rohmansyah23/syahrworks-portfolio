# Super Prompt — Build Portfolio v2 "syahrworks-portfolio"

Prompt siap pakai untuk sesi eksekusi (coding agent/AI). Pendamping PRD di `docs/PRD.md`.

````markdown
# SUPER PROMPT: Build Portfolio v2 "syahrworks-portfolio" (dari Nol, desain editorial anti-slop)

## 1. KONTEKS & TUJUAN
Buat web portofolio BARU 100% dari nol (bukan fork/kloning template orang lain, bukan modifikasi repo lama).
- Folder project baru: `D:\A-Projek\Web\syahrworks-portfolio`
- Repo lama `D:\A-Projek\Web\next-portfolio` (GitHub: rohmansyah23/next-portofolio, live: syahrworks.vercel.app) TIDAK BOLEH disentuh — biarkan apa adanya sebagai versi arsip. Hanya dipakai sebagai SUMBER KONTEN (data.json + aset gambar di public/).
- Repo baru akan menggantikan domain `syahrworks.vercel.app` (repo GitHub baru di bawah akun rohmansyah23, nama repo: syahrworks-portfolio, sudah dibuat — cukup hubungkan remote).
- Referensi DESAIN: https://www.tasteskill.dev/ — bahasa desain editorial "anti slop AI": typography-led, whitespace besar, palet dibatasi, detail halus (hairline border, index number, micro-label uppercase). Jangan tiru 1:1, ambil prinsipnya.
- Referensi STRUKTUR (arsitektur halaman saja): https://github.com/ShinyQ/ShinyQ-Playground (live: https://kurniadi.pages.dev/) — adopsi struktur 5 halaman, timeline ber-tab, project modal, blog search+filter. JANGAN meniru bahasa desain ShinyQ (label `//`, logo `> nama_`, typewriter) dan JANGAN menyalin teks/konten milik ShinyQ (Kurniadi).

## 2. STACK & DEPENDENCIES
Scaffold dengan `create-next-app@latest` (pilih: TypeScript, App Router, Tailwind, ESLint, no src dir, import alias `@/*`).
- Next.js 16.x + React 19.x + TypeScript 5.x + Tailwind CSS 4.x (CSS-first: `@import "tailwindcss"` di globals.css, pakai `@tailwindcss/postcss`, HAPUS tailwind.config.js bila tak diperlukan; definisikan CSS variables untuk theming).
- Font via `next/font/google`:
  - **Instrument Serif** → heading display (editorial, ukuran besar, line-height tight)
  - **Inter** → body/UI sans
  - **JetBrains Mono** → micro-label, angka, kode
- Dependencies (runtime):
  - `lucide-react` (ikon UI — GANTI emoji)
  - `react-icons` (ikon sosial — data.json memakai nama ikon string seperti "FaGithub", "FaInstagram", dll)
  - `next-themes` (dark/light mode, no flash)
  - `framer-motion` (motion minimal, 200–300ms)
  - `class-variance-authority`, `clsx`, `tailwind-merge` (pola shadcn untuk primitives)
  - `@radix-ui/react-dialog` (modal: detail proyek, galeri, CV)
  - `react-markdown` (render isi artikel blog dari string markdown)
  - `react-toastify` (feedback form kontak)
- JANGAN pakai: react-scroll (multi-page tidak butuh), typewriter-effect (HERO STATIS — dilarang efek typewriter sama sekali), @next/font (deprecated), firebase, sendgrid, prisma/drizzle (tanpa database).
- Env (`NEXT_PUBLIC_` jika dibutuhkan client, sisanya server):
  - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` = `https://formspree.io/f/xdaqpdrl` (ambil dari repo lama components/Contact.tsx)
  - `GITHUB_API_TOKEN` = opsional (server-only, naikkan rate limit GitHub API)

## 3. ARSITEKTUR FILE (App Router, multi-page)
```
syahrworks-portfolio/
  app/
    layout.tsx            # Root layout: font, ThemeProvider (next-themes), Navbar, Footer
    globals.css           # Tailwind 4 + CSS variables (light/dark) + style markdown blog
    page.tsx              # Home
    about/page.tsx
    journey/page.tsx
    blog/page.tsx         # index blog
    blog/[slug]/page.tsx  # detail artikel (generateStaticParams)
    projects/page.tsx
    not-found.tsx         # 404 custom
    sitemap.ts            # SEO
    robots.ts             # SEO
    loading.tsx           # (opsional) suspense fallback
  components/
    Header.tsx            # Navbar sticky blur: Home/About/Journey/Blog/Projects + wordmark logo + theme toggle + menu mobile
    Footer.tsx            # Navigasi, kontak singkat, sosial, copyright
    home/
      HeroSection.tsx     # hero editorial STATIS (tanpa typewriter), CTA
      GetInTouch.tsx      # info cards minimal: lokasi, email, GitHub, LinkedIn, WhatsApp (ikon lucide)
      TechStack.tsx       # 3 grup ikon tech (Backend/Frontend/Tools)
      PinnedRepos.tsx      # server component — GitHub 6 repo yang di-pin
      LatestBlogs.tsx     # teaser 1-2 artikel terbaru
    about/
      AboutSection.tsx    # bio, philosophy, workingStyle, favoriteTech, quote, CV dialog
      CVDialog.tsx        # modal lihat CV (Radix Dialog + <iframe/embed> PDF)
    journey/
      Timeline.tsx        # tabs filter: Full-Time | Part-Time | Education | Certifications | Competitions
      TimelineItem.tsx    # item timeline (logo, periode, judul, deskripsi bullet, tools chips)
    blog/
      BlogGrid.tsx        # (client) grid + search input + tag filter chips
      BlogCard.tsx
    projects/
      ProjectGrid.tsx     # (client) filter kategori + grid asimetris/bento
      ProjectCard.tsx
      ProjectModal.tsx    # detail: role, techStack, links (github/live/doc), galeri
      GalleryModal.tsx    # lightbox galeri (opsional)
    ui/
      button.tsx  input.tsx  badge.tsx  dialog.tsx  # primitif (custom, flat, hairline border)
  data/
    site.ts              # metadata SEO per halaman (title/description/og) + site identity
    main.ts              # hero, get-in-touch
    techStack.ts         # daftar tech ber-grup
    about.ts             # bio, philosophy, workingStyle, favoriteTech, quote, cvUrl
    journey.ts           # timeline items (dengan type)
    projects.ts          # daftar proyek lengkap
    blog.ts              # daftar artikel (slug, meta, body markdown)
    socials.ts           # sosial links
  lib/
    github.ts            # fetch top repos + fallback
    utils.ts             # cn() helper (clsx + tailwind-merge)
    types.ts             # type untuk semua data di atas
  public/
    # salin aset dari D:\A-Projek\Web\next-portfolio\public (profile-me.png, about-me.png, projects/*.png, contact.png, favicon, dsb)
```

## 4. STRUKTUR DATA (GANTI & PERLUAS `data.json` lama — semua konten disimpan sebagai modul TS bertype, bukan satu file JSON raksasa)
Contoh skema (sesuaikan isi dengan data nyata dari `D:\A-Projek\Web\next-portfolio\data.json`):

```ts
// data/main.ts
export const main = {
  name: "Muhammad Rohman Syah",
  logo: "SyahrWorks",              // wordmark (BUKAN "> syahrworks_")
  tagline: "Building reliable web & mobile applications...",
  titles: ["Full-Stack Developer", "Next.js & TypeScript", "Flutter Developer", "Go Backend"], // peran; hero menampilkan statis, TANPA typewriter
  heroImage: "/profile-me.png",
  getInTouch: [
    { label: "Location", value: "Jakarta, Indonesia" },
    { label: "Email", value: "<email pemilik>" },
    { label: "GitHub", value: "github.com/rohmansyah23" },
    { label: "LinkedIn", value: "linkedin.com/in/muhammad-rohman-syah-13a0873a8/" },
    { label: "WhatsApp", value: "wa.me/628997785724" },
  ],
};

// data/techStack.ts — 3 grup (mapping dari skills lama, Flutter/Dart/Kotlin masuk Frontend)
export const techStack = {
  Backend:  ["PHP","CodeIgniter","Laravel","Node.js","Go","Python","SQL","PostgreSQL","MySQL","Supabase","Prisma","Firebase"],
  Frontend: ["HTML5","CSS3","JavaScript","TypeScript","Bootstrap","Tailwind","React","Next.js","Flutter","Dart","Kotlin"],
  Tools:    ["Git","GitHub","Vercel"],
}; // + setiap item punya image/icon path

// data/about.ts
export const about = {
  aboutImage: "/about-me.png",
  intro: "<bio dari data.json about.about>",
  philosophy: ["<4 poin filosofi>"],
  workingStyle: ["<4 poin cara kerja>"],
  favoriteTech: ["<daftar tech favorit>"],
  quote: "<quote ringkas>",
  resumeUrl: "/CV-Muhammad-Rohman-Syah.pdf", // self-hosted di public/ (bukan link Google Drive)
};

// data/journey.ts
export type JourneyType = "Full-Time" | "Part-Time" | "Education" | "Certification" | "Competition";
export type JourneyItem = {
  slug: string; startDate: string; endDate: string; // "2024-01" atau "Present"
  title: string; subtitle: string; caption?: string;
  description?: string[]; tools?: string[]; logo?: string; type: JourneyType;
};
// Mapping dari data.json lama:
//   experiences → type "Full-Time" (Self-Employed Freelance) & "Part-Time" (SMKS intern, Milagros)
//   educations  → type "Education" (UBSI, SMKS Jakarta 1)
//   TAMBAH: 3 Certification BNSP (Software Engineering KKNI II, Program Analysis, Intermediate Network Admin)
//   TAMBAH: Competition (tanyakan ke user bila ada)

// data/projects.ts
export type Project = {
  id: string; title: string; description: string;
  coverImage: string; tags: string[];           // untuk filter kategori (mis. "Web Development","Mobile","AI & Data")
  role: string; techStack: string[];             // dari string techstack lama → array
  githubUrl?: string; liveUrl?: string; docUrl?: string;
  gallery?: string[];                            // paths gambar (opsional, dari public/projects)
};
// Migrasi 13 proyek dari data.json: SyahrWorks Portfolio, CroCode, PawsCare, QC Mobile, Auto-Refresh Bot, Red Line Guardian AI, Pustaka Booking, AI Go, Eat Scroll, Taskbar Navigator, Catering Mama Akbar, Milagros Web, Shress.
// Kategori filter: Web Development / Mobile / AI & Data / Desktop & Tools (sesuaikan).

// data/blog.ts
export type BlogPost = {
  slug: string; title: string; date: string; excerpt: string;
  coverImage?: string; tags: string[]; category: string;
  readingTime: string; author: string; featured?: boolean;
  body: string; // markdown
};
// Mulai dengan 1-2 artikel (draftkan jika user tidak punya).

// data/site.ts
export const siteMetadata = { siteUrl: "https://syahrworks.vercel.app", ... } // + title/description per halaman
```

## 5. SPESIFIKASI HALAMAN & KOMPONEN (struktur ala ShinyQ, DESAIN editorial anti-slop, konten sendiri)
- **Header**: logo **wordmark "SyahrWorks"** (bukan `> syahrworks_`), nav 5 halaman (aktif state), theme toggle (Sun/Moon), mobile: hamburger → drawer. Sticky, backdrop-blur, border-b. `Header` & `Footer` dipasang di `layout.tsx`.
- **Footer**: kolom Navigations, Contact (email/lokasi), sosial icons, `© <tahun> Muhammad Rohman Syah`.
- **Home** (urutan section, micro-label bernomor):
  1. Hero — micro-label `01 — HOME`, nama besar SERIF statis "Muhammad Rohman Syah" (TANPA typewriter), subtitle `main.tagline`, 2 CTA ke `/journey` & `/about`.
  2. Get In Touch — micro-label `02 — GET IN TOUCH`, kartu info minimal dengan ikon lucide (Location/Email/GitHub/LinkedIn/WhatsApp).
  3. Tech Stack — micro-label `03 — TECH STACK`, 3 grup (Backend/Frontend/Tools) ikon tech, tiap ikon punya title tooltip.
  4. GitHub Pinned Repos — micro-label `04 — PINNED REPOS`, 6 kartu repo yang di-pin (nama, bahasa, deskripsi, ★, 🍴) + link "View All Repositories". Server component (lihat §6).
  5. Latest Blog — micro-label `05 — FROM THE BLOG`, 1-2 kartu artikel terbaru + "View All".
  6. Contact form Formspree — micro-label `06 — CONTACT`, form (name/email/message) + toast, VALIDASI email.
- **About**: micro-label `01 — ABOUT`, judul besar serif, foto (sticky di desktop), bio (`about.intro`), lalu section: ⚙️ Engineering Philosophy, 💻 Working Style, ✨ Technologies I Love (bullet dengan ▹), blockquote `about.quote`, tombol **View CV** (buka modal PDF `resumeUrl`).
- **Journey**: micro-label `01 — JOURNEY`, heading + deskripsi, tabs filter (5 type). Klik tab → filter item. Timeline: garis tengah (desktop) / garis kiri (mobile), tiap item: logo perusahaan, periode, judul, subtitle/caption, bullet deskripsi, chips tools. Urutan kronologis terbaru di atas.
- **Blog**: micro-label `01 — BLOG`, search input (cari title/excerpt) + tag chips filter (All + semua tags), grid kartu (cover, tags, title, excerpt, tanggal, "Read more"), kosong → "No posts found".
- **Blog detail** `[slug]`: layout artikel — cover, judul, meta (tanggal, readingTime, category, author), render `body` markdown (react-markdown), back link, prev/next (opsional). `generateStaticParams` dari semua slug.
- **Projects**: micro-label `01 — PROJECTS`, heading + deskripsi, filter kategori chips, grid **asimetris/bento** (featured besar + kecil — hierarki jelas, BUKAN 3 kolom seragam), kartu (cover, title, tags, desc singkat) → klik buka **ProjectModal** (deskripsi lengkap, role, techStack chips, links: GitHub/Live/Doc, galeri → GalleryModal).
- **404**: micro-label `404`, "Page not found", tombol back home.

## 6. FITUR DINAMIS — GITHUB PINNED REPOS (server-side)
- `lib/github.ts`: POST GraphQL `https://api.github.com/graphql` (`Authorization: Bearer` dari `GITHUB_API_TOKEN`, WAJIB ada) query `user(login:"rohmansyah23") { pinnedItems(first: 6, types: [REPOSITORY]) { nodes { ... } } }`, ambil 6 repo yang di-pin.
- `<PinnedRepos />`: server component (`async`), pakai `export const revalidate = 3600` atau `next: { revalidate: 3600 }` pada fetch → hasil di-cache Next (TIDAK perlu Cloudflare KV, TIDAK perlu database).
- Fallback: jika token tidak ada / fetch gagal / array kosong → tampilkan pesan ringan atau sembunyikan section; JANGAN crash build.

## 7. DESIGN SYSTEM — "EDITORIAL ANTI-SLOP" (referensi: tasteskill.dev)
Prinsip: typography-led, whitespace besar, palet dibatasi, detail halus. Jangan tampilkan desain yang terlihat seperti "template AI generik".

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
- Accent: **deep violet**, dipakai **HEMAT** (link, active, hover, highlight kecil) — bukan dominan.
- Hairline/border: `#E5E5E5` (light) / `#262626` (dark).

### Tipografi
- **Display (serif):** Instrument Serif — heading utama, ukuran besar (`clamp`), line-height tight.
- **Body (sans):** Inter — teks & UI.
- **Mono:** JetBrains Mono — micro-label, angka, kode.
- **Micro-label:** uppercase, mono, `tracking-widest`, ~`0.7rem`. Contoh: `01 — ABOUT`, `SELECTED WORK`. BUKAN `// about me`.

### Layout & Komponen
- Container max ~`72rem`, whitespace generatif antar section (`py-20/28`).
- Section diberi nomor index (`01`, `02`, …) — gaya editorial.
- Kartu: `border` hairline, radius kecil (2–6px), flat; hover → `border-accent` + subtle shift/background.
- Button primary: **solid ink** (`bg-foreground text-background`); secondary: outline hairline; ghost: teks. Bukan pill ungu.
- Grid proyek: **asimetris/bento** — hierarki jelas, bukan kolom seragam.
- Header minimal: wordmark + nav kanan + hairline border bawah.
- Ikon Get-in-touch: pakai `lucide-react` (bukan emoji).
- CSS variables (light & dark): `--background, --foreground, --card, --border, --primary, --muted, --muted-foreground, --accent` (HSL/OKLCH). Default **light**, toggle dark.

## 8. SEO & PERFORMANCE
- `app/sitemap.ts` & `app/robots.ts` (siteUrl syahrworks.vercel.app).
- Metadata per halaman (generateMetadata): title, description, openGraph, twitter.
- `next/image` untuk gambar statis & **screenshot proyek** (beri `sizes`, `priority` hanya hero). `loading="lazy"` untuk non-hero.
- Pastikan build memakai static generation (semua halaman bisa statis; tidak ada data dinamis yang mengharuskan SSR runtime kecuali PinnedRepos yang tetap bisa di-revalidate).

## 9. LANGKAH EKSEKUSI (urutan)
1. `cd D:\A-Projek\Web && npx create-next-app@latest syahrworks-portfolio` (opsi: TS + App Router + Tailwind + ESLint + import alias `@/*`, tanpa src/).
2. `git init` (sudah dari create-next-app) — hubungkan remote ke repo GitHub BARU `rohmansyah23/syahrworks-portfolio` (sudah dibuat). JANGAN push ke repo lama.
3. Salin aset `public/` dari repo lama.
4. Setup data: buat `lib/types.ts` + folder `data/*.ts` → migrasi & perluas konten dari `data.json` lama (perhatikan mapping §4). Tanya user untuk: list kompetisi, 1-2 artikel blog, dan verifikasi role/tags per proyek.
5. Install deps tambahan (§2). Buat `ui/` primitives (flat, hairline).
6. Bangun layout (fonts serif+sans+mono, ThemeProvider, globals.css) → Header/Footer (wordmark).
7. Bangun halaman berurutan: Home → About → Journey → Projects → Blog(+detail) → 404 → SEO.
8. Implement `PinnedRepos` + fallback.
9. `.env.local` (salin `NEXT_PUBLIC_FORMSPREE_ENDPOINT` dari repo lama, tambah `GITHUB_API_TOKEN` — sekarang WAJIB untuk menampilkan section). Update `.env.local.example`.
10. Verifikasi (lihat §10) + cek Anti-Slop Checklist §7.

## 10. VERIFIKASI (WAJIB)
- `npm install` bersih (tidak ada peer-dependency error).
- `npm run lint` → tanpa error.
- `npm run build` → LOLOS tanpa error/warning berarti (perhatikan async page, generateStaticParams, dan fetch di PinnedRepos — gunakan `await Promise.all` / cache agar tidak hang).
- `npm run dev` → cek manual semua halaman: Home, About, Journey (5 tab filter), Blog (search + filter tag + detail), Projects (filter + modal + grid bento), 404, dark/light toggle, responsive mobile, form kontak (validasi + toast), PinnedRepos tampil.
- Pastikan build PRISMAATIF: jika tak ada env, build tetap sukses (fallback rapi).
- Cek visual: tidak ada gradient ungu/blob, tidak ada typewriter, tidak ada emoji label section, typografi serif terlihat jelas di heading.

## 11. CONSTRAINT / NON-GOALS
- DILARANG menyentuh/memodifikasi `D:\A-Projek\Web\next-portfolio`.
- DILARANG menyalin teks/konten milik ShinyQ (Kurniadi) — hanya struktur navigasi yang diadopsi; bahasa desain TIDAK ikut ditiru.
- DILARANG menambah fitur dinamis lain (visitor counter, R2, KV) — yang dinamis hanya GitHub Pinned Repos; sisanya statis.
- TANPA database (Neon/Postgres, Prisma, ORM, migrasi) — konten 100% statis via modul TS.
- Tanpa autentikasi, tanpa efek typewriter.
- Konten default bahasa: deskripsi proyek/pengalaman boleh English (konsisten dengan data lama), artikel blog Bahasa Indonesia.
````
