import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/60">
      <div className="container flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">PSN Rank</p>
          <p>Next.js product scaffold for trophy tracking, rivalry views, and future sync automation.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/players" className="hover:text-white">
            Players
          </Link>
          <Link href="/compare/players" className="hover:text-white">
            Compare Players
          </Link>
          <Link href="/compare/games" className="hover:text-white">
            Compare Games
          </Link>
        </div>
      </div>
    </footer>
  );
}
