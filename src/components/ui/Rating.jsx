import React from "react";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

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
