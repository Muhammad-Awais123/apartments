import React from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Lock,
  Utensils,
  AirVent,
  Flame,
  Tv,
  Sparkles,
  Car,
  ShieldCheck,
  Zap,
  Shirt,
  Clock,
} from "lucide-react";
import { fadeUp, staggerContainer, defaultViewport } from "../../../lib/animations";

export function AmenitiesSection() {
  const amenities = [
    { icon: Wifi, title: "High-Speed Fiber Internet", desc: "Dedicated 100+ Mbps fiber connections in every suite for seamless Zoom meetings & 4K streaming." },
    { icon: Lock, title: "Smart Digital Door Locks", desc: "Keyless entry via unique encrypted passcodes delivered to your phone on arrival day." },
    { icon: Zap, title: "100% Dual Power Backup", desc: "Heavy-duty automatic generators and solar inverters guarantee zero power cuts or loadshedding." },
    { icon: Utensils, title: "Fully Fitted Chef Kitchen", desc: "Microwave, induction stove, refrigerator, cookware, crockery, and espresso coffee bar." },
    { icon: AirVent, title: "Inverter Climate Control", desc: "Whisper-quiet dual-zone cooling and heating in all bedrooms and lounges." },
    { icon: Flame, title: "24/7 Instant Hot Water", desc: "Dedicated heavy-duty geysers ensure warm rainfall showers at any hour." },
    { icon: Tv, title: "55\" 4K Smart TVs + Netflix", desc: "Pre-loaded with Netflix, YouTube Premium, and international satellite channels." },
    { icon: Sparkles, title: "Professional Housekeeping", desc: "Regular sanitized deep cleaning, fresh Egyptian cotton sheets, and towel replenishments." },
    { icon: Car, title: "Dedicated Secure Parking", desc: "Free covered underground parking spaces with 24/7 CCTV surveillance." },
    { icon: ShieldCheck, title: "Gated Security & CCTV", desc: "Professional security guards stationed round the clock for complete peace of mind." },
    { icon: Shirt, title: "Automatic Washer & Iron", desc: "In-unit laundry appliances for hassle-free short and long-term stays." },
    { icon: Clock, title: "24/7 Dedicated Concierge", desc: "Instant assistance on WhatsApp for groceries, airport pickups, and local recommendations." }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50/50 dark:bg-ink-950">
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
            Unrivaled Hospitality
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
            Why Choose Zak Residence?
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            Every apartment is designed from the ground up to exceed hotel standards while delivering the comfort, space, and privacy of home.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {amenities.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white dark:bg-ink-900 p-6 rounded-2xl border border-ink-100 dark:border-ink-800 shadow-sm hover:border-gold-400/60 hover:shadow-luxury transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-50 dark:bg-gold-950/50 text-gold-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-ink-900 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white group-hover:text-gold-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-500 dark:text-ink-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
