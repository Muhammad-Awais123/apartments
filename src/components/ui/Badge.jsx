import React from "react";
import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import { cn } from "../../lib/utils";

export function Badge({ children, variant = "gold", size = "md", className }) {
  const variants = {
    gold: "bg-gold-50 text-gold-700 border-gold-300 dark:bg-gold-950/40 dark:text-gold-300 dark:border-gold-800",
    dark: "bg-ink-900 text-cream-100 border-ink-800 dark:bg-ink-800 dark:text-white dark:border-ink-700",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    danger: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
    info: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800",
    outline: "border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-300"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm font-semibold"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border tracking-wide uppercase",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

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

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-ink-100 dark:bg-ink-800",
        className
      )}
      {...props}
    />
  );
}

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-ink-200 dark:border-ink-800 bg-cream-50/30 dark:bg-ink-900/30", className)}>
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-gold-50 dark:bg-gold-950/30 text-gold-600 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h4 className="font-heading text-lg font-bold text-ink-900 dark:text-white">
        {title}
      </h4>
      {description && (
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1 max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

export function Tabs({ tabs = [], activeTab, onChange, className }) {
  return (
    <div className={cn("flex items-center space-x-1 p-1 bg-ink-50 dark:bg-ink-800/80 rounded-xl", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2",
              isActive
                ? "text-ink-900 dark:text-white"
                : "text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-white dark:bg-ink-900 rounded-lg shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span className={cn("px-1.5 py-0.2 rounded-full text-[10px]", isActive ? "bg-gold-100 text-gold-800" : "bg-ink-200 text-ink-600")}>
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Rating({ value = 5, size = "md", showNumber = true, onChange, readOnly = true }) {
  const stars = [1, 2, 3, 4, 5];
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => {
          const filled = value >= star;
          return (
            <button
              key={star}
              type="button"
              disabled={readOnly}
              onClick={() => onChange && onChange(star)}
              className={cn("text-gold-500 focus:outline-none", !readOnly && "cursor-pointer hover:scale-110 transition-transform")}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  filled ? "fill-gold-500 text-gold-500" : "text-ink-200 dark:text-ink-700"
                )}
              />
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs font-bold text-ink-800 dark:text-ink-200 ml-1">
          {Number(value).toFixed(1)}
        </span>
      )}
    </div>
  );
}
