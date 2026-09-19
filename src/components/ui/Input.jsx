import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef(
  ({ className, type = "text", label, error, leftIcon, rightIcon, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-ink-400">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full h-11 px-4 text-sm bg-white dark:bg-ink-800 text-ink-900 dark:text-white rounded-xl border border-ink-200 dark:border-ink-700 transition-all duration-200 placeholder:text-ink-400 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-ink-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-ink-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Select = React.forwardRef(
  ({ className, label, error, leftIcon, options = [], children, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-ink-400">
              {leftIcon}
            </div>
          )}
          <select
            ref={ref}
            className={cn(
              "w-full h-11 px-4 text-sm bg-white dark:bg-ink-800 text-ink-900 dark:text-white rounded-xl border border-ink-200 dark:border-ink-700 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 disabled:opacity-50 appearance-none cursor-pointer",
              leftIcon && "pl-10",
              "pr-10",
              error && "border-red-500",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {children}
          </select>
          <div className="absolute right-3.5 pointer-events-none text-ink-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
