import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Search,
  Sparkles,
  Clock,
  ArrowRight,
  Star,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useBookingDraftStore } from "../../../store/bookingDraftStore";

export function HeroSection() {
  const navigate = useNavigate();

  const {
    locationId,
    checkIn,
    checkOut,
    adults,
    stayType,
    setSearchParams,
  } = useBookingDraftStore();

  const [localLocation, setLocalLocation] = useState(locationId || "all");
  const [localCheckIn, setLocalCheckIn] = useState(checkIn || "");
  const [localCheckOut, setLocalCheckOut] = useState(checkOut || "");
  const [localAdults, setLocalAdults] = useState(adults || 2);
  const [localStayType, setLocalStayType] = useState(stayType || "short");

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchParams({
      locationId: localLocation,
      checkIn: localCheckIn,
      checkOut: localCheckOut,
      adults: Number(localAdults),
      stayType: localStayType,
    });

    navigate(
      `/apartments?location=${localLocation}&stayType=${localStayType}`
    );
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-ink-950 text-white pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">

      {/* =========================================================
          BACKGROUND IMAGE & OVERLAYS
      ========================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/hero_background.png"
          alt="Zak Residence luxury serviced apartment"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
          fetchPriority="high"
        />

        {/* Cinematic contrast overlay for crystal-clear readability */}
        <div className="absolute inset-0 bg-ink-950/75 backdrop-blur-[2px]" />

        {/* Vertical gradient vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/90 via-transparent to-ink-950/90" />

        {/* Subtle ambient gold atmospheric glow */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-gold-500/10 blur-[130px]" />
      </div>

      {/* =========================================================
          CONTENT WRAPPER (Unified Center Alignment)
      ========================================================= */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-4 sm:space-y-5">

        {/* =======================================================
            HERO COPY
        ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-3 max-w-3xl mx-auto"
        >

          {/* Eyebrow Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-gold-400/30 backdrop-blur-md shadow-lg shadow-black/40">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-gold-400/60 animate-ping" />
                <span className="relative w-2 h-2 rounded-full bg-gold-400" />
              </span>

              <Sparkles className="w-3.5 h-3.5 text-gold-400" />

              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gold-100">
                Boutique Serviced Living · Lahore
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-1.5">
            <span className="block text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-gold-300/80">
              Stay differently
            </span>

            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-md">
              LIVE <span className="text-gold-400">·</span> STAY{" "}
              <span className="text-gold-400">·</span> FEEL{" "}
              <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-lightGold-400 to-gold-500">
                HOME
              </span>
            </h1>

            {/* Elegant decorative rule */}
            <div className="flex items-center justify-center gap-3 pt-0.5">
              <span className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent to-gold-400/60" />
              <span className="w-1.5 h-1.5 rotate-45 bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.7)]" />
              <span className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent to-gold-400/60" />
            </div>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-cream-100/90 font-normal leading-relaxed">
            Experience fully furnished luxury suites in Bahria Town and Johar Town,
            Lahore — curated for short getaways, corporate stays, and turnkey monthly living.
          </p>

          {/* Trust Features Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-0.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-900/70 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs text-white/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
              <span>Keyless Smart Lock</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-900/70 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs text-white/90">
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              <span>100% Power Backup</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-900/70 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>24/7 Concierge & Security</span>
            </div>
          </div>

        </motion.div>

        {/* =========================================================
            BOOKING SEARCH CARD
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-4xl mx-auto text-left"
        >
          <div className="bg-ink-900/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-gold-400/35 shadow-2xl shadow-black/80 overflow-hidden">

            {/* Top Bar */}
            <div className="px-4 sm:px-6 pt-4 sm:pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ink-800">

                {/* Stay Type Tabs */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLocalStayType("short")}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                      localStayType === "short"
                        ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/25 ring-1 ring-gold-300/40"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Short Stay (Nightly)
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocalStayType("long")}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                      localStayType === "long"
                        ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/25 ring-1 ring-gold-300/40"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Monthly Living
                    <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] bg-gold-400/20 text-gold-300 border border-gold-400/30">
                      SAVE 30%
                    </span>
                  </button>
                </div>

                {/* View All Suites Shortcut */}
                <button
                  type="button"
                  onClick={() => navigate("/apartments")}
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <span>View All Suites</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

              </div>
            </div>

            {/* Search Form Fields */}
            <form
              onSubmit={handleSearch}
              className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end"
            >

              {/* Location */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-bold text-ink-400">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  Location
                </label>
                <select
                  value={localLocation}
                  onChange={(e) => setLocalLocation(e.target.value)}
                  className="w-full h-11 px-3 text-xs bg-ink-800/90 text-white rounded-xl border border-ink-700 font-semibold outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all cursor-pointer"
                >
                  <option value="all" className="bg-ink-900 text-white">
                    All Locations (Lahore)
                  </option>
                  <option value="bahria-town" className="bg-ink-900 text-white">
                    Bahria Town Lahore
                  </option>
                  <option value="johar-town" className="bg-ink-900 text-white">
                    Johar Town Lahore
                  </option>
                </select>
              </div>

              {/* Check-In */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-bold text-ink-400">
                  <CalendarIcon className="w-3.5 h-3.5 text-gold-400" />
                  Check-In
                </label>
                <input
                  type="date"
                  value={localCheckIn}
                  onChange={(e) => setLocalCheckIn(e.target.value)}
                  className="w-full h-11 px-3 text-xs bg-ink-800/90 text-white rounded-xl border border-ink-700 font-semibold outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all [color-scheme:dark]"
                />
              </div>

              {/* Check-Out */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-bold text-ink-400">
                  <CalendarIcon className="w-3.5 h-3.5 text-gold-400" />
                  Check-Out
                </label>
                <input
                  type="date"
                  value={localCheckOut}
                  onChange={(e) => setLocalCheckOut(e.target.value)}
                  className="w-full h-11 px-3 text-xs bg-ink-800/90 text-white rounded-xl border border-ink-700 font-semibold outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all [color-scheme:dark]"
                />
              </div>

              {/* Guests */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-bold text-ink-400">
                  <Users className="w-3.5 h-3.5 text-gold-400" />
                  Guests
                </label>
                <select
                  value={localAdults}
                  onChange={(e) => setLocalAdults(Number(e.target.value))}
                  className="w-full h-11 px-3 text-xs bg-ink-800/90 text-white rounded-xl border border-ink-700 font-semibold outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all cursor-pointer"
                >
                  <option value={1} className="bg-ink-900 text-white">1 Guest</option>
                  <option value={2} className="bg-ink-900 text-white">2 Guests</option>
                  <option value={3} className="bg-ink-900 text-white">3 Guests</option>
                  <option value={4} className="bg-ink-900 text-white">4 Guests</option>
                  <option value={5} className="bg-ink-900 text-white">5 Guests</option>
                  <option value={6} className="bg-ink-900 text-white">6+ Guests</option>
                </select>
              </div>

              {/* CTA */}
              <div>
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full h-11 rounded-xl shadow-lg shadow-gold-500/25 font-bold text-ink-950 bg-gradient-to-r from-gold-400 via-lightGold-400 to-gold-500 hover:brightness-110 active:scale-[0.99] transition-all"
                  leftIcon={<Search className="w-4 h-4 text-ink-950" />}
                >
                  Search Suites
                </Button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-5">
              <div className="pt-3 border-t border-ink-800/80 flex flex-wrap items-center gap-2 text-[11px] text-ink-400">
                <span className="font-bold text-gold-400">Popular:</span>

                <button
                  type="button"
                  onClick={() => {
                    setLocalLocation("bahria-town");
                    navigate("/apartments?location=bahria-town");
                  }}
                  className="hover:text-gold-300 underline transition-colors"
                >
                  Bahria Town Penthouse
                </button>

                <span className="text-white/20">•</span>

                <button
                  type="button"
                  onClick={() => {
                    setLocalLocation("johar-town");
                    navigate("/apartments?location=johar-town");
                  }}
                  className="hover:text-gold-300 underline transition-colors"
                >
                  Johar Town 2BR Suite
                </button>

                <span className="text-white/20">•</span>

                <button
                  type="button"
                  onClick={() => {
                    setLocalStayType("long");
                    navigate("/apartments?stayType=long");
                  }}
                  className="hover:text-gold-300 underline transition-colors"
                >
                  Monthly Rentals (30+ Days)
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* =========================================================
            TRUST STATS
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14"
        >
          {/* Suites */}
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-extrabold font-heading text-gold-400">
              8+
            </div>
            <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/40 font-semibold">
              Luxury Suites
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-white/10" />

          {/* Guests */}
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-extrabold font-heading text-gold-400">
              500+
            </div>
            <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/40 font-semibold">
              Happy Guests
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-white/10" />

          {/* Rating */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-extrabold font-heading text-gold-400">
              <span>4.95</span>
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            </div>
            <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/40 font-semibold">
              Guest Rating
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-white/10" />

          {/* Power */}
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-extrabold font-heading text-gold-400">
              100%
            </div>
            <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/40 font-semibold">
              Power Backup
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}