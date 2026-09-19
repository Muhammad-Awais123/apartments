import React from "react";
import { cn } from "../../lib/utils";

export function Stepper({ steps = [], currentStep = 0, onStepClick }) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-ink-100 dark:bg-ink-800 -z-0" />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={step.id || idx}
              onClick={() => isCompleted && onStepClick && onStepClick(idx)}
              className={cn(
                "relative z-10 flex flex-col items-center group",
                isCompleted && onStepClick && "cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-gold-500 border-gold-500 text-ink-900 shadow-md shadow-gold-500/20"
                    : isCurrent
                    ? "bg-ink-900 dark:bg-white border-gold-500 text-white dark:text-ink-900 shadow-lg scale-110 ring-4 ring-gold-500/20"
                    : "bg-white dark:bg-ink-900 border-ink-200 dark:border-ink-700 text-ink-400"
                )}
              >
                {isCompleted ? "✓" : idx + 1}
              </div>
              <span
                className={cn(
                  "text-[11px] font-semibold mt-2 text-center max-w-[80px] hidden sm:block",
                  isCurrent
                    ? "text-gold-600 dark:text-gold-400"
                    : isCompleted
                    ? "text-ink-800 dark:text-ink-200"
                    : "text-ink-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
