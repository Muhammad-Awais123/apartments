import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Compass, Plane, ShoppingBag, Hospital, Landmark, Utensils } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cmsApi } from "../../../services/api";
import { fadeUp, defaultViewport } from "../../../lib/animations";

export function NeighborhoodGuideSection() {
  const [selectedLocation, setSelectedLocation] = useState("bahria-town");

  const { data: cms } = useQuery({
    queryKey: ["cmsData"],
    queryFn: () => cmsApi.getCMSData(),
  });

  const neighborhoods = cms?.neighborhoods || {};
  const current = neighborhoods[selectedLocation] || neighborhoods["bahria-town"];

  const getIcon = (type) => {
    if (type?.includes("Airport")) return Plane;
    if (type?.includes("Shopping")) return ShoppingBag;
    if (type?.includes("Healthcare")) return Hospital;
    if (type?.includes("Dining")) return Utensils;
    return Landmark;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50/50 dark:bg-ink-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Local Area Guide
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
              Lahore Neighborhood Highlights
            </h2>
            <p className="text-sm text-ink-600 dark:text-ink-400">
              Discover key distances to major hospitals, international shopping malls, mosques, and Lahore Airport.
            </p>
          </div>

          {/* Location Switcher */}
          <div className="flex items-center gap-2 bg-white dark:bg-ink-800 p-1.5 rounded-2xl border border-ink-100 dark:border-ink-700 shadow-sm">
            <button
              onClick={() => setSelectedLocation("bahria-town")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLocation === "bahria-town"
                  ? "bg-gold-500 text-white shadow-sm"
                  : "text-ink-600 dark:text-ink-300 hover:text-ink-900"
              }`}
            >
              Bahria Town
            </button>
            <button
              onClick={() => setSelectedLocation("johar-town")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLocation === "johar-town"
                  ? "bg-gold-500 text-white shadow-sm"
                  : "text-ink-600 dark:text-ink-300 hover:text-ink-900"
              }`}
            >
              Johar Town
            </button>
          </div>
        </motion.div>

        {/* Neighborhood Details Grid */}
        {current && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-ink-900 dark:text-white">
                  {current.title}
                </h3>
                <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                  {current.tagline}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/40 px-3.5 py-1.5 rounded-full">
                <Navigation className="w-3.5 h-3.5" />
                <span>Prime Accessibility</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.highlights?.map((poi, idx) => {
                const Icon = getIcon(poi.type);
                return (
                  <motion.div
                    key={poi.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white dark:bg-ink-900 p-5 rounded-2xl border border-ink-100 dark:border-ink-800 shadow-sm flex items-center justify-between hover:border-gold-400/50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gold-50 dark:bg-gold-950/40 text-gold-600 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading text-xs font-bold text-ink-900 dark:text-white">
                          {poi.name}
                        </h4>
                        <p className="text-[11px] text-ink-400 mt-0.5">
                          {poi.type}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-cream-100 dark:bg-ink-800 text-ink-800 dark:text-ink-200 text-xs font-bold shrink-0 ml-2">
                      {poi.distance}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function PriceTeaserSection() {
  const [stayLength, setStayLength] = useState(3);
  const [apartmentType, setApartmentType] = useState("2br");

  const baseRates = {
    studio: { nightly: 9500, monthly: 140000, name: "Studio Deluxe Suite" },
    "1br": { nightly: 12000, monthly: 180000, name: "Modern 1BR Apartment" },
    "2br": { nightly: 18000, monthly: 280000, name: "Executive 2BR Suite" },
    penthouse: { nightly: 28000, monthly: 420000, name: "Royal Sky Penthouse" }
  };

  const selectedRate = baseRates[apartmentType] || baseRates["2br"];
  const isMonthly = stayLength >= 30;
  const isWeekly = stayLength >= 7 && stayLength < 30;

  const estimatedTotal = isMonthly
    ? Math.round(selectedRate.monthly * (stayLength / 30))
    : isWeekly
    ? Math.round(selectedRate.nightly * stayLength * 0.9)
    : selectedRate.nightly * stayLength;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-ink-900">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <span>Price Calculator</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
            Transparent Pricing & Real Savings
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            No booking agent commissions, no surprise utility surcharges. Calculate your stay rate instantly.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="max-w-3xl mx-auto bg-cream-50 dark:bg-ink-900 p-6 sm:p-8 rounded-3xl border border-gold-300/40 shadow-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Apartment Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                Apartment Category
              </label>
              <select
                value={apartmentType}
                onChange={(e) => setApartmentType(e.target.value)}
                className="w-full h-11 px-3 text-xs bg-white dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-700 font-semibold focus:outline-none focus:border-gold-500"
              >
                <option value="studio">Studio Deluxe Suite (Rs. 9,500/night)</option>
                <option value="1br">Modern 1BR Apartment (Rs. 12,000/night)</option>
                <option value="2br">Executive 2BR Suite (Rs. 18,000/night)</option>
                <option value="penthouse">Royal Sky Penthouse (Rs. 28,000/night)</option>
              </select>
            </div>

            {/* Duration Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-ink-700 dark:text-ink-300">
                <span className="uppercase tracking-wider">Stay Duration</span>
                <span className="text-gold-600">{stayLength} Night(s)</span>
              </div>
              <input
                type="range"
                min={1}
                max={60}
                value={stayLength}
                onChange={(e) => setStayLength(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ink-400">
                <span>1 Night</span>
                <span>7 Nights (10% Off)</span>
                <span>30 Nights (Monthly Lease)</span>
                <span>60 Nights</span>
              </div>
            </div>
          </div>

          {/* Result Strip */}
          <div className="p-5 rounded-2xl bg-ink-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gold-400 uppercase font-bold tracking-wider">
                Estimated Total Investment ({stayLength} Nights)
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white mt-0.5">
                Rs. {estimatedTotal.toLocaleString('en-PK')}
                {isMonthly && (
                  <span className="text-xs text-emerald-400 font-normal ml-2">
                    (Monthly Rate Applied · Save ~30%)
                  </span>
                )}
                {isWeekly && (
                  <span className="text-xs text-emerald-400 font-normal ml-2">
                    (10% Weekly Discount Applied)
                  </span>
                )}
              </div>
            </div>

            <a
              href={`https://wa.me/923008472910?text=Hello%20Zak%20Residence%2C%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(
                selectedRate.name
              )}%20for%20${stayLength}%20nights.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold rounded-xl transition-all shadow-md">
                Lock in this Rate on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
