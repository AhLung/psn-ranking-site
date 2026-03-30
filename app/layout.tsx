import type { ReactNode } from "react";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PSN Rank",
    template: "%s | PSN Rank"
  },
  description:
    "PlayStation Trophy Tracker and PSN platinum leaderboard built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn-style UI primitives.",
  metadataBase: new URL("https://example.vercel.app")
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="container flex-1 space-y-10 py-8 md:py-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
