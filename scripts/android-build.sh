#!/usr/bin/env bash
# android-build.sh — Wrapper menuju helper global ~/.local/bin/android-build.sh
#
# Logika build/lint/dev Android sekarang hidup di helper global sehingga berlaku
# untuk SEMUA proyek lokal di perangkat (lokasi-independen). Script ini tinggal
# me-delegasi; root proyek ditentukan dari lokasi script ini sendiri.
#
# Pemakaian (FUSE tidak mendukung bit execute → wajib panggil via `bash`):
#   bash scripts/android-build.sh sync      # salin source → mirror
#   bash scripts/android-build.sh install   # npm install di mirror
#   bash scripts/android-build.sh lint      # jalankan eslint di mirror
#   bash scripts/android-build.sh build     # next build --webpack di mirror
#   bash scripts/android-build.sh dev       # next dev --webpack di mirror
#   bash scripts/android-build.sh all       # sync + install(bila perlu) + lint + build
#
# Detail & aturan lengkap: docs/ANDROID.md

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
HELPER="$HOME/.local/bin/android-build.sh"

if [ ! -f "$HELPER" ]; then
  echo "[android-build] Helper global tidak ditemukan: $HELPER" >&2
  echo "  Pasang helper terlebih dahulu (lihat docs/ANDROID.md), atau" >&2
  echo "  jalankan helper dari repo lain yang sudah memilikinya." >&2
  exit 1
fi

cd "$ROOT"
exec bash "$HELPER" "$@"
