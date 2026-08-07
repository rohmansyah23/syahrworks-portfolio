#!/usr/bin/env bash
# android-build.sh — Build/lint/dev untuk project di Android/Termux.
#
# Kenapa script ini ada:
#   - /storage/emulated/0 (FUSE) tidak mendukung symlink dan sangat lambat untuk
#     node_modules (±28rb file). npm install di sana bisa hang/berjam-jam.
#   - Semua operasi npm harus berjalan di mirror cepat di filesystem internal.
#
# Pemakaian (FUSE tidak mendukung bit execute → wajib panggil via `bash`):
#   bash scripts/android-build.sh sync      # salin source → mirror (cepat, ±30MB)
#   bash scripts/android-build.sh install   # npm install di mirror (--bin-links=true)
#   bash scripts/android-build.sh lint      # jalankan eslint di mirror
#   bash scripts/android-build.sh build     # next build --webpack di mirror
#   bash scripts/android-build.sh dev       # next dev --webpack di mirror (watch)
#   bash scripts/android-build.sh all       # sync + install(bila perlu) + lint + build
#
# Catatan: build/dev webpack butuh workaround app/layout.tsx DI MIRROR SAJA
# (repo asli tanpa root layout; lihat fungsi apply_layout_workaround).
#
# Detail & aturan lengkap: docs/ANDROID.md

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE="$(cd "$SCRIPT_DIR/.." && pwd)"
MIRROR="$HOME/build/$(basename "$SOURCE")"

exclude_flags=(
  --exclude='./node_modules'
  --exclude='./.git'
  --exclude='./.next'
  --exclude='./docs-private'
)

# Jalankan binari npm via node langsung. Sebab: shebang `#!/usr/bin/env` tidak
# berfungsi di Termux (tidak ada /usr/bin/env), dan filesystem tidak mendukung
# symlink sehingga node_modules/.bin kosong.
run_node() {
  (cd "$MIRROR" && exec node "$@")
}

cmd_sync() {
  echo "[android-build] sync source -> $MIRROR"
  mkdir -p "$MIRROR"
  tar -C "$SOURCE" "${exclude_flags[@]}" -cf - . | tar -C "$MIRROR" -xf -
  apply_layout_workaround
  echo "[android-build] sync selesai."
}

# Workaround khusus build webpack di Android: repo tidak punya app/layout.tsx
# (root layout = [lang]/layout.tsx). Turbopack menerima itu, webpack TIDAK
# ("page.tsx doesn't have a root layout"). Layout minimal ini dibuat HANYA di
# mirror agar repo asli & deploy Vercel tidak terpengaruh. Aman ditimpa kalau
# repo suatu saat punya app/layout.tsx asli.
apply_layout_workaround() {
  local root_layout="$MIRROR/app/layout.tsx"
  if [ ! -f "$root_layout" ]; then
    cat > "$root_layout" << 'EOF'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
EOF
    echo "[android-build] app/layout.tsx (workaround webpack) dibuat di mirror."
  fi
}

cmd_install() {
  echo "[android-build] npm install di $MIRROR"
  (cd "$MIRROR" && exec npm install --bin-links=true --no-audit --no-fund)
  echo "[android-build] install selesai."
}

cmd_lint() {
  ensure_mirror
  echo "[android-build] eslint ..."
  run_node node_modules/eslint/bin/eslint.js .
  echo "[android-build] lint OK (0 error)."
}

cmd_build() {
  ensure_mirror
  echo "[android-build] next build --webpack ..."
  run_node node_modules/next/dist/bin/next build --webpack
  echo "[android-build] build OK."
}

cmd_dev() {
  ensure_mirror
  echo "[android-build] next dev --webpack (port 3000)."
  echo "[android-build] CATATAN: edit dilakukan di repo asli ($SOURCE)."
  echo "                     Jalankan 'bash scripts/android-build.sh sync' lalu"
  echo "                     restart dev agar perubahan terbaca."
  run_node node_modules/next/dist/bin/next dev --webpack
}

ensure_mirror() {
  if [ ! -d "$MIRROR/node_modules" ]; then
    echo "[android-build] node_modules belum ada di mirror."
    cmd_sync
    cmd_install
  fi
}

cmd_all() {
  cmd_sync
  if [ ! -d "$MIRROR/node_modules" ]; then
    cmd_install
  fi
  cmd_lint
  cmd_build
}

usage() {
  sed -n '2,15p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
}

case "${1:-}" in
  sync)    cmd_sync ;;
  install) cmd_install ;;
  lint)    cmd_lint ;;
  build)   cmd_build ;;
  dev)     cmd_dev ;;
  all)     cmd_all ;;
  *)       usage ;;
esac
