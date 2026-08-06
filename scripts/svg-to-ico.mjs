import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sizes = [16, 32, 48, 64, 128, 256];

const [src = "public/logo-dark.svg", out = "app/favicon.ico"] = process.argv.slice(2);
const svg = await readFile(resolve(root, src));

const pngs = [];
for (const size of sizes) {
  const png = await sharp(svg, { density: 300 })
    .resize(size, size)
    .png()
    .toBuffer();
  pngs.push({ size, png });
}

const count = pngs.length;
const headerSize = 6 + 16 * count;
const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(count, 4);

let offset = headerSize;
for (let i = 0; i < count; i++) {
  const { size, png } = pngs[i];
  const e = header.subarray(6 + 16 * i, 6 + 16 * (i + 1));
  e.writeUInt8(size === 256 ? 0 : size, 0);
  e.writeUInt8(size === 256 ? 0 : size, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
}

const ico = Buffer.concat([header, ...pngs.map((p) => p.png)]);

const outPath = resolve(root, out);
await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, ico);
console.log(`Wrote ${outPath} (${ico.length} bytes, ${count} sizes: ${pngs.map((p) => p.size).join(", ")})`);
