import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, Sparkles, Clock, Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { cmsApi } from "../../../services/api";
import { fadeUp, staggerContainer, defaultViewport } from "../../../lib/animations";

export function SpecialOffersSection() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  // Countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => cmsApi.getCoupons(),
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-ink-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner with Countdown */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="bg-ink-900 rounded-3xl p-8 sm:p-10 border border-gold-500/30 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Limited Seasonal Deal
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold">
                Autumn Luxury Escape: <span className="text-gold-400">15% OFF</span>
              </h2>
              <p className="text-xs sm:text-sm text-ink-200 leading-relaxed">
                Book 5 or more nights in Bahria Town or Johar Town and enjoy 15% discount plus complimentary VIP airport pickup for Penthouse suites.
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="flex flex-col items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gold-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Offer Expires In:
              </div>
              <div className="flex items-center gap-3 text-center">
                <div className="bg-ink-900/80 border border-gold-500/30 w-16 py-2 rounded-xl">
                  <div className="font-heading text-2xl font-bold text-white">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-ink-400">Hours</div>
                </div>
                <span className="text-gold-400 font-bold text-xl">:</span>
                <div className="bg-ink-900/80 border border-gold-500/30 w-16 py-2 rounded-xl">
                  <div className="font-heading text-2xl font-bold text-white">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-ink-400">Mins</div>
                </div>
                <span className="text-gold-400 font-bold text-xl">:</span>
                <div className="bg-ink-900/80 border border-gold-500/30 w-16 py-2 rounded-xl">
                  <div className="font-heading text-2xl font-bold text-white">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-ink-400">Secs</div>
                </div>
              </div>

              <Button
                variant="gold"
                size="md"
                className="w-full"
                onClick={() => navigate("/apartments")}
              >
                Claim Autumn Offer
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Promo Coupons Grid */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {coupons.slice(0, 4).map((c) => (
            <motion.div
              key={c.code}
              variants={fadeUp}
              className="bg-cream-50/50 dark:bg-ink-950 p-5 rounded-2xl border border-dashed border-gold-400/60 dark:border-gold-800/60 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-gold-500 text-white text-xs font-bold shadow-sm">
                    {c.discountPercentage}% OFF
                  </span>
                  <Tag className="w-4 h-4 text-gold-600" />
                </div>
                <div className="font-heading text-base font-bold text-ink-900 dark:text-white">
                  {c.code}
                </div>
                <p className="text-xs text-ink-500 dark:text-ink-400">
                  {c.description}
                </p>
              </div>

              <div className="pt-3 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between">
                <span className="text-[10px] text-ink-400">
                  Min {c.minNights} night(s)
                </span>
                <button
                  onClick={() => handleCopy(c.code)}
                  className="flex items-center gap-1 text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline"
                >
                  {copiedCode === c.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
