import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Sparkles, Building, CheckCircle2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { siteConfig } from "../../../config/site";
import { luxuryImages } from "../../../config/images";
import { toast } from "sonner";
import { fadeUp, staggerContainer, defaultViewport } from "../../../lib/animations";

export function LocationsSection() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setJoinedWaitlist(true);
    toast.success("You're on the VIP waitlist for Gulberg & DHA luxury suites!");
    setWaitlistEmail("");
  };

  const locationCards = [
    {
      id: "bahria-town",
      title: "Bahria Town Lahore",
      tagline: "Sector C & Jasmine Block",
      image: luxuryImages.bahriaTown,
      description: "Lahore's premier gated community. Peaceful tree-lined boulevards, 24/7 high-security surveillance, walking distance to Grand Jamia Mosque and Eiffel Tower replica.",
      apartmentsCount: "5 Luxury Suites",
      badge: "Available Now",
      isLive: true
    },
    {
      id: "johar-town",
      title: "Johar Town Lahore",
      tagline: "Block G3 · Near Emporium Mall",
      image: luxuryImages.joharTown,
      description: "The commercial and culinary heartbeat of modern Lahore. 3 minutes from Emporium Mall, Expo Centre, Doctors Hospital, and major multinational corporate hubs.",
      apartmentsCount: "3 Luxury Suites",
      badge: "Available Now",
      isLive: true
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50/40 dark:bg-ink-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Prime Lahore Locations
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
            Where Luxury Meets Convenience
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            Handpicked residences situated in Lahore’s safest, most prestigious, and vibrant neighborhoods.
          </p>
        </motion.div>

        {/* Location Cards Grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {locationCards.map((loc) => (
            <motion.div
              key={loc.id}
              variants={fadeUp}
              className="group bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                <img
                  src={loc.image}
                  alt={loc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-ink-950/60" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  {loc.badge}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-gold-300 uppercase tracking-widest">
                    {loc.tagline}
                  </p>
                  <h3 className="font-heading text-xl font-bold">{loc.title}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  {loc.description}
                </p>

                <div className="pt-4 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-700 dark:text-ink-200">
                    {loc.apartmentsCount}
                  </span>
                  <Link to={`/apartments?location=${loc.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Explore Suites
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Card 3: Coming Soon Waitlist Card (Gulberg / DHA) */}
          <motion.div
            variants={fadeUp}
            className="bg-ink-900 text-white rounded-3xl p-7 border border-gold-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/20 rounded-full blur-2xl" />

            <div className="space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Coming Soon
              </span>

              <h3 className="font-heading text-2xl font-bold text-white">
                Gulberg & DHA Phase 6
              </h3>
              <p className="text-xs text-ink-200 leading-relaxed">
                We are expanding! Ultra-luxury high-rise penthouses on Main Boulevard Gulberg and Defence Raya Golf Club coming early 2027.
              </p>
            </div>

            <div className="pt-6 border-t border-ink-800 relative z-10 space-y-3">
              <div className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Join Priority Waitlist
              </div>

              {joinedWaitlist ? (
                <div className="flex items-center gap-2 p-3 bg-gold-500/10 border border-gold-400/30 rounded-xl text-gold-300 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>VIP Access Reserved! We'll alert you first.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address..."
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="bg-ink-800 border-ink-700 text-white placeholder:text-ink-400 text-xs h-10"
                  />
                  <Button type="submit" variant="gold" size="sm" className="w-full">
                    Notify Me First
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
