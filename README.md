# SyahrWorks Portfolio

Portfolio v2 milik **Muhammad Rohman Syah (SyahrWorks)** — dibangun 100% dari nol sebagai pengganti repo lama berbasis template generik. Desain editorial "anti-slop AI" (typography-led, whitespace besar, palet dibatasi).

## Stack

- **Next.js 16** · React 19 · TypeScript 5 · Tailwind CSS 4 (CSS-first)
- Font: **Instrument Serif** (display) · **Inter** (body) · **JetBrains Mono** (label/angka) via `next/font`
- App Router, multi-page: **Home, About, Journey, Blog (+detail), Projects** + 404

## Halaman

| Route | Deskripsi |
|---|---|
| `/` | Hero editorial, Get In Touch, Tech Stack, Top Repos, Latest Blog, Contact Form |
| `/about` | Bio, filosofi, cara kerja, tech favorit, CV modal |
| `/journey` | Timeline dengan filter 5 kategori (Full-Time/Part-Time/Education/Certification/Competition) |
| `/blog` | Search + filter tag, detail artikel markdown |
| `/projects` | Grid bento + filter kategori + modal detail & galeri |

## Fitur Dinamis

Hanya satu: **GitHub Top Repos** (server fetch, cache revalidate 1 jam, fallback rapi bila gagal). Tanpa database, tanpa auth, tanpa CMS.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Environment

Buat `.env.local` (contoh di `.env.local.example`):

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xdaqpdrl
GITHUB_API_TOKEN=   # opsional, server-only
```

## Struktur

```
app/         # halaman + layout + SEO
components/  # header, footer, section per halaman, ui primitives
data/        # konten (modul TS ber-type)
content/     # body markdown artikel blog
lib/         # github fetch, types, utils
docs/        # PRD.md, PROMPT.md, PLAN.md (spesifikasi & instruksi agent)
```

## Deploy

Vercel → `syahrworks.vercel.app`. Instruksi lengkap untuk coding agent di `AGENTS.md`.
