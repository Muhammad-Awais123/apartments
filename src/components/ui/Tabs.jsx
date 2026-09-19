import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

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
