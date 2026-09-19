import React from "react";
import { cn } from "../../lib/utils";

export function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-ink-900 rounded-2xl border border-ink-100 dark:border-ink-800 shadow-sm transition-all duration-300",
        hover && "hover:shadow-luxury hover:-translate-y-1 hover:border-gold-300/60 dark:hover:border-gold-700/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
