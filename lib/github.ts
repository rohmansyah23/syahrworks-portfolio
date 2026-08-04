import type { TopRepo } from "@/lib/types";

const GITHUB_USER = "rohmansyah23";
const TOP_REPOS_COUNT = 6;

/**
 * Ambil top repos GitHub (server-only). Sortir by stargazers desc, ambil 6.
 * Fallback wajib: gagal / kosong → return [] (section akan disembunyikan).
 * Build TIDAK boleh crash meski tanpa env atau tanpa internet.
 */
export async function getTopRepos(): Promise<TopRepo[]> {
  try {
    const token = process.env.GITHUB_API_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      {
        headers,
        // Cache 1 jam — tanpa database/KV
        next: { revalidate: 3600 },
        // Batasi waktu tunggu agar build/prerender tidak pernah hang
        signal: AbortSignal.timeout(10_000),
      }
    );

    if (!res.ok) return [];

    const repos: TopRepo[] = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) return [];

    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, TOP_REPOS_COUNT);
  } catch {
    return [];
  }
}
