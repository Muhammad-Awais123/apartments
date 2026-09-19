import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  Building2,
  Crown,
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

  // ============================================================
  // TYPING EFFECT
  // ============================================================

  const typingWords = [
    "Comfort.",
    "Luxury.",
    "Privacy.",
    "Home.",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typingWords[wordIndex];

    const typingSpeed = isDeleting ? 65 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));

        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typingWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  // ============================================================
  // SEARCH
  // ============================================================

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
    <section className="relative min-h-[calc(100vh-116px)] overflow-hidden bg-[#080808] text-white">

      {/* ========================================================
          BACKGROUND IMAGE
      ======================================================== */}

      <div className="absolute inset-0 z-0 pointer-events-none">

        <motion.img
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          src="/hero_background.png"
          alt="Luxury serviced residence"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
          "
          fetchPriority="high"
        />

        {/* Main image protection */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Text readability zone */}
        <div
          className="
            absolute
            inset-y-0
            left-0
            w-[58%]
           
          "
        />

        {/* Bottom depth */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-[32%]
            bg-black/30
          "
        />

      </div>

      {/* ========================================================
          SMALL FLOATING DECOR
      ======================================================== */}

      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[18%]
          left-[51%]
          z-[2]
          hidden
          xl:block
        "
      >
        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          opacity: [0.2, 0.55, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[35%]
          right-[30%]
          z-[2]
          hidden
          xl:block
        "
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <div
        className="
          relative
          z-10
          min-h-[calc(100vh-116px)]
          max-w-[1700px]
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
          2xl:px-20
          pt-14
          sm:pt-16
          lg:pt-20
          pb-7
          flex
          flex-col
        "
      >

        {/* ======================================================
            HERO CONTENT
        ====================================================== */}

        <div className="flex-1 flex items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              ml-0
              lg:ml-[3vw]
              xl:ml-[5vw]
              2xl:ml-[6vw]
              w-full
              max-w-[760px]
              xl:max-w-[800px]
              pr-3
              lg:pr-6
            "
          >

            {/* ==================================================
                EYEBROW
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="flex items-center gap-3 mb-7"
            >

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  rounded-full
                  bg-[#D4AF37]
                  text-[#080808]
                "
              >
                <Crown className="w-[19px] h-[19px]" />

                <span
                  className="
                    absolute
                    inset-[-4px]
                    rounded-full
                    border
                    border-[#D4AF37]/30
                  "
                />
              </div>

              <div>

                <div
                  className="
                    text-[10px]
                    sm:text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#D4AF37]
                  "
                >
                  ZAK RESIDENCE
                </div>

                <div
                  className="
                    mt-1
                    text-[10px]
                    text-white/45
                    tracking-[0.08em]
                  "
                >
                  Boutique Serviced Residences · Lahore
                </div>

              </div>

            </motion.div>

            {/* ==================================================
                HUGE HEADLINE
            ================================================== */}

            <div className="relative">

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  font-heading
                  font-medium
                  tracking-[-0.065em]
                  leading-[0.88]
                  text-[58px]
                  sm:text-[74px]
                  md:text-[88px]
                  lg:text-[96px]
                  xl:text-[108px]
                  2xl:text-[120px]
                "
              >

                <span className="block text-white">
                  Stay
                  <span className="text-white/25">.</span>
                </span>

                <span className="block text-white">
                  Live
                  <span className="text-white/25">.</span>
                </span>

                <span className="block text-[#D4AF37] min-h-[0.95em]">

                  {displayText}

                  {/* Typing cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                    }}
                    className="
                      inline-block
                      ml-2
                      w-[3px]
                      sm:w-[4px]
                      h-[0.72em]
                      bg-[#D4AF37]
                      align-middle
                    "
                  />

                </span>

              </motion.h1>

              {/* Small editorial number */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="
                  absolute
                  right-0
                  top-1/2
                  hidden
                  lg:block
                  text-[9px]
                  tracking-[0.3em]
                  text-white/20
                  [writing-mode:vertical-rl]
                "
              >
                EST. LAHORE · PREMIUM LIVING
              </motion.div>

            </div>

            {/* ==================================================
                LINE
            ================================================== */}

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "150px", opacity: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.8,
              }}
              className="mt-8 h-[2px] bg-[#D4AF37]"
            />

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.7,
              }}
              className="
                max-w-[610px]
                mt-7
                text-[14px]
                sm:text-[15px]
                md:text-[16px]
                leading-7
                sm:leading-8
                text-white/60
              "
            >
              Premium furnished residences designed for people who
              expect more from where they stay — thoughtful spaces,
              modern comfort and effortless living in Lahore.
            </motion.p>

            {/* ==================================================
                FEATURES
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.95,
                duration: 0.7,
              }}
              className="
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                mt-7
              "
            >

              <div className="flex items-center gap-2 text-[11px] text-white/70">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                Fully Furnished
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/70">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                Secure Living
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/70">
                <Zap className="w-4 h-4 text-[#D4AF37]" />
                Power Backup
              </div>

            </motion.div>

            {/* ==================================================
                STATS
            ================================================== */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="
                flex
                items-center
                gap-6
                sm:gap-9
                mt-8
              "
            >

              <div>
                <div className="font-heading text-2xl font-semibold">
                  8+
                </div>
                <div className="text-[9px] mt-1 uppercase tracking-[0.15em] text-white/30">
                  Suites
                </div>
              </div>

              <div className="w-px h-8 bg-white/10" />

              <div>
                <div className="font-heading text-2xl font-semibold">
                  500+
                </div>
                <div className="text-[9px] mt-1 uppercase tracking-[0.15em] text-white/30">
                  Guests
                </div>
              </div>

              <div className="w-px h-8 bg-white/10" />

              <div>
                <div className="flex items-center gap-1 font-heading text-2xl font-semibold">
                  4.95
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                </div>
                <div className="text-[9px] mt-1 uppercase tracking-[0.15em] text-white/30">
                  Rating
                </div>
              </div>

            </motion.div>

          </motion.div>

        </div>

        {/* ========================================================
            BOOKING BAR
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-9
            lg:mt-11
            ml-0
            lg:ml-[3vw]
            xl:ml-[5vw]
            2xl:ml-[6vw]
            w-full
            max-w-[1200px]
            xl:max-w-[1280px]
          "
        >

          <div
            className="
              bg-[#0C0C0C]/95
              border
              border-white/15
              rounded-2xl
              overflow-hidden
              shadow-[0_30px_80px_rgba(0,0,0,0.6)]
            "
          >

            {/* TOP */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                px-4
                sm:px-5
                py-3
                border-b
                border-white/10
              "
            >

              <div className="flex items-center gap-1">

                <button
                  type="button"
                  onClick={() => setLocalStayType("short")}
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-lg
                    text-[11px]
                    font-bold
                    transition-all
                    ${localStayType === "short"
                      ? "bg-[#D4AF37] text-[#080808]"
                      : "text-white/45 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Short Stay
                </button>

                <button
                  type="button"
                  onClick={() => setLocalStayType("long")}
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-lg
                    text-[11px]
                    font-bold
                    transition-all
                    ${localStayType === "long"
                      ? "bg-[#D4AF37] text-[#080808]"
                      : "text-white/45 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Monthly Living
                </button>

              </div>

              <button
                type="button"
                onClick={() => navigate("/apartments")}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-[11px]
                  font-semibold
                  text-[#D4AF37]
                  hover:text-white
                  transition-colors
                "
              >
                Explore All Residences
                <ArrowRight
                  className="
                    w-3.5
                    h-3.5
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSearch}
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-5
              "
            >

              {/* LOCATION */}
              <div className="p-4 sm:p-5 lg:border-r border-white/10">

                <label className="flex items-center gap-1.5 mb-2 text-[9px] uppercase tracking-[0.16em] font-bold text-white/30">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Location
                </label>

                <div className="relative">

                  <select
                    value={localLocation}
                    onChange={(e) => setLocalLocation(e.target.value)}
                    className="
                      appearance-none
                      w-full
                      pr-7
                      bg-transparent
                      text-sm
                      font-semibold
                      text-white
                      outline-none
                      cursor-pointer
                    "
                  >
                    <option value="all" className="bg-[#111]">
                      All Locations
                    </option>

                    <option value="bahria-town" className="bg-[#111]">
                      Bahria Town Lahore
                    </option>

                    <option value="johar-town" className="bg-[#111]">
                      Johar Town Lahore
                    </option>
                  </select>

                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />

                </div>

              </div>

              {/* CHECK IN */}
              <div className="p-4 sm:p-5 lg:border-r border-white/10">

                <label className="flex items-center gap-1.5 mb-2 text-[9px] uppercase tracking-[0.16em] font-bold text-white/30">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Check-In
                </label>

                <input
                  type="date"
                  value={localCheckIn}
                  onChange={(e) => setLocalCheckIn(e.target.value)}
                  className="
                    w-full
                    bg-transparent
                    text-sm
                    font-semibold
                    text-white
                    outline-none
                    [color-scheme:dark]
                  "
                />

              </div>

              {/* CHECK OUT */}
              <div className="p-4 sm:p-5 lg:border-r border-white/10">

                <label className="flex items-center gap-1.5 mb-2 text-[9px] uppercase tracking-[0.16em] font-bold text-white/30">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Check-Out
                </label>

                <input
                  type="date"
                  value={localCheckOut}
                  onChange={(e) => setLocalCheckOut(e.target.value)}
                  className="
                    w-full
                    bg-transparent
                    text-sm
                    font-semibold
                    text-white
                    outline-none
                    [color-scheme:dark]
                  "
                />

              </div>

              {/* GUESTS */}
              <div className="p-4 sm:p-5 lg:border-r border-white/10">

                <label className="flex items-center gap-1.5 mb-2 text-[9px] uppercase tracking-[0.16em] font-bold text-white/30">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Guests
                </label>

                <div className="relative">

                  <select
                    value={localAdults}
                    onChange={(e) =>
                      setLocalAdults(Number(e.target.value))
                    }
                    className="
                      appearance-none
                      w-full
                      pr-7
                      bg-transparent
                      text-sm
                      font-semibold
                      text-white
                      outline-none
                      cursor-pointer
                    "
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option
                        key={num}
                        value={num}
                        className="bg-[#111]"
                      >
                        {num}
                        {num === 1 ? " Guest" : " Guests"}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />

                </div>

              </div>

              {/* SEARCH */}
              <div className="p-3 sm:p-4 flex">

                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="
                    w-full
                    min-h-[56px]
                    rounded-xl
                    bg-[#D4AF37]
                    hover:bg-[#E5C24D]
                    text-[#080808]
                    font-extrabold
                    shadow-none
                    transition-all
                    hover:-translate-y-0.5
                  "
                  leftIcon={
                    <Search className="w-4 h-4 text-[#080808]" />
                  }
                >
                  Search Suites
                </Button>

              </div>

            </form>

            {/* POPULAR */}
            <div className="px-4 sm:px-5 py-3 border-t border-white/10">

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px]">

                <span className="font-bold text-[#D4AF37]">
                  Popular
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setLocalLocation("bahria-town");
                    navigate("/apartments?location=bahria-town");
                  }}
                  className="text-white/35 hover:text-white transition-colors"
                >
                  Bahria Town
                </button>

                <span className="text-white/15">•</span>

                <button
                  type="button"
                  onClick={() => {
                    setLocalLocation("johar-town");
                    navigate("/apartments?location=johar-town");
                  }}
                  className="text-white/35 hover:text-white transition-colors"
                >
                  Johar Town
                </button>

                <span className="text-white/15">•</span>

                <button
                  type="button"
                  onClick={() => {
                    setLocalStayType("long");
                    navigate("/apartments?stayType=long");
                  }}
                  className="text-white/35 hover:text-white transition-colors"
                >
                  Monthly Rentals
                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ========================================================
          BOTTOM BORDER
      ======================================================== */}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20" />

    </section>
  );
}