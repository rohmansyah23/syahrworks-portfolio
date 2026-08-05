import Link from "next/link";
import { ArrowUpRight, FolderGit2, Star } from "lucide-react";
import { getTopRepos } from "@/lib/github";
import { getDictionary, type Locale } from "@/lib/i18n";
import SectionHeader from "@/components/home/SectionHeader";

export const revalidate = 3600;

export default async function TopRepos({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const repos = await getTopRepos();

  return (
    <section className="border-b border-border">
      <div className="container-editorial py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="04"
            label={t.topReposLabel}
            title={t.topReposTitle}
            description={t.topReposDescription}
            className="mb-0"
          />
          <Link
            href="https://github.com/rohmansyah23"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            {t.topReposViewAll}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {repos.length === 0 ? (
          /* Fallback wajib: tampilkan pesan ringan, build tidak crash */
          <div className="mt-12 flex flex-col gap-3 border border-border bg-card p-10 text-center">
            <p className="micro-label text-muted-foreground">
              {t.topReposUnavailable}
            </p>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
              {t.topReposFallback}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 border border-border bg-background p-6 transition-colors duration-200 hover:bg-muted sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <FolderGit2 className="h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-medium text-foreground">
                    {repo.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {repo.description ?? t.topReposNoDescription}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-4 font-mono text-xs text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    {repo.stargazers_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
