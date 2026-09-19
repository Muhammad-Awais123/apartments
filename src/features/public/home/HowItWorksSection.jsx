import React from "react";
import { motion } from "framer-motion";
import { Search, CreditCard, ShieldCheck, Key, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Discover Your Suite",
      description: "Browse curated apartments in Bahria Town and Johar Town with high-res galleries, 3D tours, and verified amenities."
    },
    {
      step: "02",
      icon: CreditCard,
      title: "Reserve & Pay Easily",
      description: "Book instantly via Bank Transfer (IBFT), JazzCash, Easypaisa, or Pay at Check-in with zero hidden charges."
    },
    {
      step: "03",
      icon: ShieldCheck,
      title: "Digital Verification",
      description: "Submit guest CNIC/Passport details online from your phone in under 60 seconds for seamless safety clearance."
    },
    {
      step: "04",
      icon: Key,
      title: "Keyless Self Check-In",
      description: "Receive your encrypted smart door passcode via WhatsApp and Guest Portal to enter anytime after 2:00 PM."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50/50 dark:bg-ink-950">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Seamless Experience
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
            How It Works in 4 Simple Steps
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            No physical front desk lines, no waiting for keys, no hassle. Fast, secure, digital living.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative bg-white dark:bg-ink-900 rounded-3xl p-6 border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number Watermark */}
                <div className="text-4xl font-heading font-extrabold text-gold-400/30 dark:text-gold-500/20 absolute top-4 right-5">
                  {item.step}
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold-50 dark:bg-gold-950/50 text-gold-600 flex items-center justify-center shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-500 dark:text-ink-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-ink-50 dark:border-ink-800/60 flex items-center text-gold-600 text-xs font-bold gap-1">
                  <span>Step {idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
