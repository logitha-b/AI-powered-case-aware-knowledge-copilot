import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success/10 text-success border-success/20",
        warning: "border-transparent bg-warning/10 text-warning border-warning/20",
        danger: "border-transparent bg-destructive/10 text-destructive border-destructive/20",
        info: "border-transparent bg-accent/10 text-accent border-accent/20",
        riskLow: "border-transparent bg-success/10 text-success border-success/20",
        riskMedium: "border-transparent bg-warning/10 text-warning border-warning/20",
        riskHigh: "border-transparent bg-destructive/10 text-destructive border-destructive/20",
        priorityLow: "border-transparent bg-muted text-muted-foreground",
        priorityMedium: "border-transparent bg-warning/10 text-warning border-warning/20",
        priorityHigh: "border-transparent bg-destructive/10 text-destructive border-destructive/20",
        priorityCritical: "border-transparent bg-destructive text-destructive-foreground animate-pulse",
        statusOpen: "border-transparent bg-accent/10 text-accent border-accent/20",
        statusInProgress: "border-transparent bg-primary/10 text-primary border-primary/20",
        statusPending: "border-transparent bg-warning/10 text-warning border-warning/20",
        statusEscalated: "border-transparent bg-destructive/10 text-destructive border-destructive/20",
        statusResolved: "border-transparent bg-success/10 text-success border-success/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
