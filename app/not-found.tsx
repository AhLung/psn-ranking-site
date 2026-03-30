import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Card className="w-full max-w-2xl rounded-[2rem]">
        <CardContent className="space-y-5 p-10 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">404</p>
          <h1 className="text-4xl font-semibold uppercase tracking-[0.14em] text-white">
            Player or route not found
          </h1>
          <p className="text-base leading-7 text-slate-300">
            This product scaffold only includes the current dashboard, players, and comparison routes. Use the links below to jump back into the tracked sections.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">Dashboard</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/players">Players</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
