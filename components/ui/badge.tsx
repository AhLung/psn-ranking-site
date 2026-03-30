import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/5 text-white",
        cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
        gold: "border-amber-400/30 bg-amber-400/10 text-amber-200",
        silver: "border-slate-300/30 bg-slate-300/10 text-slate-100",
        bronze: "border-orange-400/30 bg-orange-400/10 text-orange-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
