#!/usr/bin/env python3
"""Konversi SVG ke ICO multi-size.

Renderer (dipakai otomatis sampai ada yang berhasil):
  1. cairosvg  (butuh native cairo)
  2. svglib + reportlab (depending backend, kadang butuh cairo)
  3. sharp (Node.js, bundled librsvg — paling andal di Windows tanpa cairo; 
     Next.js project ini sudah punya sharp di node_modules)

Syarat minimal: Pillow + Node.js dengan sharp tersedia.
Opsional: pip install cairosvg svglib reportlab

Pemakaian:
  python scripts/svg_to_ico.py input.svg output.ico [--sizes 16,32,48,64,128,256] [--master 1024]
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

DEFAULT_SIZES = [16, 32, 48, 64, 128, 256]
MASTER_SIZE = 1024


def render_with_cairosvg(svg_path: Path, size: int) -> Image.Image:
    """Render SVG -> RGBA Image via cairosvg (kualitas terbaik)."""
    import cairosvg

    png = cairosvg.svg2png(
        url=str(svg_path),
        output_width=size,
        output_height=size,
        background_color=None,
    )
    img = Image.open(__import__("io").BytesIO(png))
    return img.convert("RGBA")


def render_with_svglib(svg_path: Path, size: int) -> Image.Image:
    """Render SVG -> PNG sementara, lalu load via Pillow (fallback pure Python)."""
    import io

    from reportlab.graphics import renderPM
    from svglib.svglib import svg2rlg

    drawing = svg2rlg(str(svg_path))
    if drawing is None:
        raise RuntimeError(f"svglib gagal parse: {svg_path}")

    buf = io.BytesIO()
    renderPM.drawToFile(drawing, buf, fmt="PNG", dpi=96)
    buf.seek(0)
    img = Image.open(buf).convert("RGBA")

    # upsample agar ICO tajam (renderPM dpi fix 96 -> resize LANCZOS di caller)
    if img.width < size:
        img = img.resize((size, size), Image.LANCZOS)
    return img


def render_with_sharp(svg_path: Path, size: int) -> Image.Image:
    """Render SVG -> PNG via Node.js sharp (bundled librsvg, tanpa cairo native)."""
    import os
    import subprocess
    import tempfile

    tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    tmp.close()
    try:
        code = (
            "const sharp=require('sharp');"
            "sharp(process.argv[1],{density:96})"
            f".resize({size},{size})"
            ".png().toFile(process.argv[2])"
            ".then(()=>process.exit(0))"
            ".catch(e=>{console.error(e.message);process.exit(1)})"
        )
        proc = subprocess.run(
            ["node", "-e", code, str(svg_path), tmp.name],
            capture_output=True,
            text=True,
        )
        if proc.returncode != 0:
            raise RuntimeError(f"sharp gagal: {proc.stderr.strip()}")
        img = Image.open(tmp.name).convert("RGBA")
        return img
    finally:
        try:
            os.unlink(tmp.name)
        except OSError:
            pass


def render_svg(svg_path: Path, size: int) -> Image.Image:
    errors: list[str] = []
    for name, fn in (
        ("cairosvg", render_with_cairosvg),
        ("svglib", render_with_svglib),
        ("sharp (node)", render_with_sharp),
    ):
        try:
            return fn(svg_path, size)
        except Exception as e:  # noqa: BLE001 - tangkap semua, coba renderer berikutnya
            errors.append(f"{name}: {e}")
    raise RuntimeError(
        "Tidak ada renderer SVG yang berhasil. Coba:\n"
        "  pip install cairosvg svglib reportlab\n"
        "dan pastikan Node.js + sharp tersedia (npm i sharp).\n"
        + "\n".join(errors)
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="SVG -> ICO multi-size")
    parser.add_argument("input", type=Path, help="Path file SVG sumber")
    parser.add_argument("output", type=Path, help="Path file ICO tujuan")
    parser.add_argument(
        "--sizes",
        default=",".join(map(str, DEFAULT_SIZES)),
        help="Daftar ukuran dipisah koma (contoh: 16,32,48,64,128,256)",
    )
    parser.add_argument(
        "--master",
        type=int,
        default=MASTER_SIZE,
        help="Resolusi render master sebelum di-resize (default: 1024)",
    )
    args = parser.parse_args()

    sizes = [int(s) for s in args.sizes.split(",") if s.strip()]
    if not sizes:
        print("error: --sizes tidak boleh kosong", file=sys.stderr)
        return 1

    svg_path = Path(args.input)
    out_path = Path(args.output)
    if not svg_path.is_file():
        print(f"error: file SVG tidak ditemukan: {svg_path}", file=sys.stderr)
        return 1

    out_path.parent.mkdir(parents=True, exist_ok=True)

    # 1) Render master besar untuk kualitas, lalu resize ke tiap ukuran.
    print(f"Render master ({args.master}px) -> {svg_path}")
    master = render_svg(svg_path, args.master)

    frames: list[Image.Image] = []
    for s in sizes:
        resized = master.resize((s, s), Image.LANCZOS) if s != master.width else master
        frames.append(resized)

    # 2) Simpan ICO multi-entry (mendukung alpha / transparansi).
    #    Penting: base image harus ukuran TERBESAR — plugin ICO melewatkan
    #    semua size yang lebih besar dari ukuran source.
    base = frames[-1]  # ukuran terbesar
    others = frames[:-1]
    base.save(
        out_path,
        format="ICO",
        sizes=[(f.width, f.height) for f in frames],
        append_images=others,
    )

    print(f"OK: {out_path} ({out_path.stat().st_size} bytes, sizes={sizes})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())