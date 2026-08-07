import type { PinnedRepo } from "@/lib/types";

const GITHUB_USER = "rohmansyah23";
const PINNED_REPOS_COUNT = 6;

const PINNED_QUERY = `
  query {
    user(login: "${GITHUB_USER}") {
      pinnedItems(first: ${PINNED_REPOS_COUNT}, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            databaseId
            name
            url
            description
            primaryLanguage {
              name
            }
            stargazerCount
            forkCount
            isFork
          }
        }
      }
    }
  }
`;

type PinnedNode = {
  databaseId: number | null;
  name: string;
  url: string;
  description: string | null;
  primaryLanguage: { name: string } | null;
  stargazerCount: number;
  forkCount: number;
  isFork: boolean;
};

/**
 * Ambil repos yang dipin GitHub (server-only) via GraphQL pinnedItems.
 * GraphQL WAJIB token. Tanpa token / gagal / kosong → return [] (section
 * akan menampilkan fallback message). Build TIDAK boleh crash.
 */
export async function getPinnedRepos(): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_API_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: PINNED_QUERY }),
      // Cache 1 jam — tanpa database/KV
      next: { revalidate: 3600 },
      // Batasi waktu tunggu agar build/prerender tidak pernah hang
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) return [];

    const json: unknown = await res.json();
    const nodes = extractPinnedNodes(json);
    if (!Array.isArray(nodes) || nodes.length === 0) return [];

    return nodes
      .map((node, index) => ({
        id: node.databaseId ?? index,
        name: node.name,
        full_name: `${GITHUB_USER}/${node.name}`,
        description: node.description,
        html_url: node.url,
        language: node.primaryLanguage?.name ?? null,
        stargazers_count: node.stargazerCount,
        forks_count: node.forkCount,
        fork: node.isFork,
      }));
  } catch {
    return [];
  }
}

function extractPinnedNodes(json: unknown): PinnedNode[] {
  if (typeof json !== "object" || json === null) return [];
  const { data } = json as { data?: { user?: { pinnedItems?: { nodes?: unknown } } } };
  const nodes = data?.user?.pinnedItems?.nodes;
  return Array.isArray(nodes) ? (nodes as PinnedNode[]) : [];
}
