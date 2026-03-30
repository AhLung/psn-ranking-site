import { Clock4, DatabaseZap, LineChart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardData } from "@/types/domain";

const icons = [Clock4, DatabaseZap, LineChart];

type ComingSoonPanelProps = {
  items: DashboardData["upcoming"];
};

export function ComingSoonPanel({ items }: ComingSoonPanelProps) {
  return (
    <Card className="rounded-[1.8rem]">
      <CardHeader className="border-b border-white/8 pb-5">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Coming soon</p>
        <CardTitle className="mt-2 text-2xl uppercase tracking-[0.14em]">
          Product roadmap hooks
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-6 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index] ?? Clock4;

          return (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/10 text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200/80">
                {item.eta}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
