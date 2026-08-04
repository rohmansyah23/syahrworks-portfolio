import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="micro-label text-accent">404</p>
      <h1 className="mt-4 font-serif text-6xl leading-[1.05] tracking-tight text-foreground sm:text-7xl">
        Page not found.
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
        Halaman yang Anda cari tidak ada, sudah dipindahkan, atau belum pernah
        dibuat. Mari kembali ke beranda.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-11 items-center gap-2 bg-foreground px-6 text-sm font-medium text-background transition-all duration-200 hover:opacity-85 active:scale-[0.98]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
