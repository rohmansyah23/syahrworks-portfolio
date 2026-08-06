import { readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const W = 1200;
const H = 630;
const PAD = 80;

const logo = readFileSync(join(process.cwd(), "public/logo-dark.svg")).toString("base64");
const logoDataUri = `data:image/svg+xml;base64,${logo}`;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#0A0A0A"/>
  <line x1="${PAD}" y1="${H - PAD}" x2="${W - PAD}" y2="${H - PAD}" stroke="#262626" stroke-width="1"/>
  <image href="${logoDataUri}" x="${PAD}" y="${PAD}" width="88" height="88"/>

  <text x="${PAD}" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="68" fill="#FAFAF9" letter-spacing="-1">Muhammad Rohman Syah</text>

  <text x="${PAD}" y="404" font-family="'Segoe UI', Helvetica, Arial, sans-serif" font-size="30" fill="#A1A1AA" letter-spacing="0.5">Full-Stack Developer &#8212; Web &amp; Mobile</text>

  <text x="${PAD}" y="476" font-family="Consolas, 'Courier New', monospace" font-size="20" fill="#6B7280" letter-spacing="2">NEXT.JS &#183; FLUTTER &#183; GO</text>
  <text x="${PAD}" y="508" font-family="Consolas, 'Courier New', monospace" font-size="20" fill="#6B7280" letter-spacing="2">13+ SHIPPED PROJECTS &#183; 3X BNSP CERTIFIED</text>

  <text x="${W - PAD}" y="${H - PAD - 16}" text-anchor="end" font-family="Consolas, 'Courier New', monospace" font-size="18" fill="#4B5563" letter-spacing="1.5">SYAHRWORKS.VERCEL.APP</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(join(process.cwd(), "public/og-syahrworks.png"));

console.log("OK public/og-syahrworks.png");
