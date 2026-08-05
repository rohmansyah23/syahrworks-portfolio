import { getData } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default function Wordmark({ lang }: { lang: Locale }) {
  return (
    <>
      {getData(lang).main.main.logo}
      <span className="font-mono">_</span>
    </>
  );
}
