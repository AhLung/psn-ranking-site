import Link from "next/link";
import { Gamepad2, Trophy } from "lucide-react";

import { siteNavigation } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 shadow-glow">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">
              PlayStation Trophy Tracker
            </p>
            <p className="font-semibold text-white">PSN Rank</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {siteNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/compare/players"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
        >
          <Gamepad2 className="h-4 w-4" />
          Rivalry View
        </Link>
      </div>
    </header>
  );
}
