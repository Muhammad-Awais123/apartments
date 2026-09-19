import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Clock, CalendarDays, Building2, Briefcase } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { formatPKR } from "../../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { cmsApi } from "../../../services/api";
import { fadeUp, staggerContainer, defaultViewport } from "../../../lib/animations";

export function StayOptionsSection() {
  const navigate = useNavigate();
  const { data: cms } = useQuery({
    queryKey: ["cmsData"],
    queryFn: () => cmsApi.getCMSData(),
  });

  const stayOptions = cms?.stayOptions || [];

  const icons = {
    "short-stay": Clock,
    "weekly-stay": CalendarDays,
    "monthly-stay": Building2,
    "corporate-stay": Briefcase
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-ink-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Flexible Living
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
            Tailored Stay Categories
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            Whether staying for a weekend wedding, a medical consult, or a year-long corporate posting, choose the ideal package.
          </p>
        </motion.div>

        {/* 4 Category Cards */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stayOptions.map((opt) => {
            const Icon = icons[opt.id] || Sparkles;

            return (
              <motion.div
                key={opt.id}
                variants={fadeUp}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  opt.isPopular
                    ? "bg-ink-900 text-white border-2 border-gold-500 shadow-xl"
                    : "bg-cream-50/40 dark:bg-ink-950 text-ink-900 dark:text-white border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury"
                }`}
              >
                {opt.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      opt.isPopular ? "bg-gold-500/20 text-gold-400" : "bg-gold-100 dark:bg-gold-950/50 text-gold-600"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${
                      opt.isPopular ? "text-gold-400" : "text-ink-400"
                    }`}>
                      {opt.subtitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-bold">{opt.title}</h3>
                    <p className={`text-xs mt-1 ${opt.isPopular ? "text-ink-300" : "text-ink-500 dark:text-ink-400"}`}>
                      {opt.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2">
                    <div className="font-heading text-2xl font-bold text-gold-500">
                      {formatPKR(opt.priceStarting)}
                    </div>
                    <div className={`text-[10px] uppercase font-semibold ${opt.isPopular ? "text-ink-400" : "text-ink-500"}`}>
                      {opt.period}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 pt-2 border-t border-ink-100 dark:border-ink-800/80">
                    {opt.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                        <span className={opt.isPopular ? "text-ink-200" : "text-ink-600 dark:text-ink-300"}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Button
                    variant={opt.isPopular ? "gold" : "outline"}
                    size="md"
                    className="w-full"
                    onClick={() => {
                      if (opt.id === "corporate-stay") {
                        navigate("/contact?topic=corporate");
                      } else {
                        navigate(`/apartments?stayType=${opt.id === "monthly-stay" ? "long" : "short"}`);
                      }
                    }}
                  >
                    {opt.ctaText}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
