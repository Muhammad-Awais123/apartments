import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, MapPin, Star } from "lucide-react";
import { staggerContainer, fadeUp, defaultViewport } from "../../../lib/animations";

export function TrustBarSection() {
  const stats = [
    { icon: Users, value: "1,250+", label: "Happy Guests Hosted", subtext: "From 18+ Countries" },
    { icon: Building2, value: "8 Suites", label: "Luxury Portfolios", subtext: "Studios to Penthouses" },
    { icon: MapPin, value: "2 Prime Areas", label: "Bahria & Johar Town", subtext: "Gated & Central Lahore" },
    { icon: Star, value: "4.94 / 5.0", label: "Average Guest Rating", subtext: "120+ Verified Reviews" }
  ];

  return (
    <section className="bg-white border-y border-ink-100 dark:bg-ink-900 dark:border-ink-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-cream-50/50 dark:hover:bg-ink-800/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold-50 dark:bg-gold-950/40 text-gold-600 flex items-center justify-center mb-3 shadow-sm border border-gold-200/50 dark:border-gold-800/50">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-700 dark:text-ink-300 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-ink-400 mt-0.5">
                  {stat.subtext}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
