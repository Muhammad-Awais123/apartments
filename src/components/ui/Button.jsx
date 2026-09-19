import React from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "gold",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";

    const variants = {
      gold: "bg-gold-500 hover:bg-gold-600 text-white font-bold shadow-md shadow-gold-500/20 focus:ring-gold-400 border border-gold-400/50",
      dark: "bg-ink-900 hover:bg-deepNavy text-white shadow-md shadow-ink-900/20 focus:ring-ink-700 border border-ink-700",
      outline:
        "border border-gold-400/80 text-ink-900 hover:bg-gold-50 hover:border-gold-500 dark:text-gold-300 dark:hover:bg-gold-950/30 focus:ring-gold-400",
      ghost:
        "text-ink-700 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-ink-800 focus:ring-ink-400",
      danger:
        "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500",
      white:
        "bg-white hover:bg-cream-100 text-ink-900 shadow-md shadow-black/5 border border-ink-100 focus:ring-gold-400"
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-10 px-5 text-sm rounded-xl gap-2",
      lg: "h-12 px-7 text-base rounded-xl gap-2.5",
      icon: "h-10 w-10 p-0 rounded-xl",
      "icon-sm": "h-8 w-8 p-0 rounded-lg"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
