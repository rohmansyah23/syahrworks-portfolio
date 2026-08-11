import type { CounterResponse } from "@/lib/types";

/**
 * Ambil jumlah kunjungan (server-only) via CountAPI revival
 * (pengganti countapi.xyz yang sudah mati — tanpa auth, tanpa DB).
 * Gagal / lambat / bentuk tidak valid → return null (UI menyembunyikan sel,
 * build TIDAK boleh crash).
 */
export async function getVisitorCount(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://countapi.mileshilliard.com/api/v1/hit/syahrworks-visits",
      {
        // Cache 1 jam — tanpa database/KV, angka tumbuh bertahap tiap revalidate.
        next: { revalidate: 3600 },
        // Batasi waktu tunggu agar render home tidak pernah melambat.
        signal: AbortSignal.timeout(5_000),
      }
    );

    if (!res.ok) return null;

    const json: unknown = await res.json();
    if (typeof json !== "object" || json === null) return null;

    const value = (json as CounterResponse).value;
    return typeof value === "number" ? value : null;
  } catch {
    return null;
  }
}
