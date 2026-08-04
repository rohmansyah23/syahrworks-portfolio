import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border-border bg-transparent text-muted-foreground",
        outline: "border-border bg-transparent text-foreground",
        accent: "border-accent/40 bg-accent/10 text-accent",
        solid: "border-foreground bg-foreground text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
