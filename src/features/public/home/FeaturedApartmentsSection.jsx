import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Users,
  Maximize,
  Star,
  Heart,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useWishlistStore } from "../../../store/wishlistStore";
import { formatPKR } from "../../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apartmentsApi } from "../../../services/api";

export function FeaturedApartmentsSection() {
  const navigate = useNavigate();
  const { savedApartmentIds, toggleWishlist } = useWishlistStore();
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments", activeFilter],
    queryFn: () => apartmentsApi.getApartments({ locationId: activeFilter }),
  });

  const featuredList = apartments.filter((a) => a.featured).slice(0, 4);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-ink-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Signature Collection
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
              Featured Luxury Residences
            </h2>
            <p className="text-sm text-ink-600 dark:text-ink-400">
              Impeccably designed suites equipped with Italian kitchens, smart door locks, and high-speed fiber internet.
            </p>
          </div>

          {/* Location Filter Pills */}
          <div className="flex items-center gap-2 bg-cream-50 dark:bg-ink-800 p-1.5 rounded-2xl border border-ink-100 dark:border-ink-700">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "all"
                  ? "bg-gold-500 text-white shadow-md"
                  : "text-ink-600 dark:text-ink-300 hover:text-ink-900"
              }`}
            >
              All Residences
            </button>
            <button
              onClick={() => setActiveFilter("bahria-town")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "bahria-town"
                  ? "bg-gold-500 text-white shadow-md"
                  : "text-ink-600 dark:text-ink-300 hover:text-ink-900"
              }`}
            >
              Bahria Town
            </button>
            <button
              onClick={() => setActiveFilter("johar-town")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "johar-town"
                  ? "bg-gold-500 text-white shadow-md"
                  : "text-ink-600 dark:text-ink-300 hover:text-ink-900"
              }`}
            >
              Johar Town
            </button>
          </div>
        </div>

        {/* Apartments Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((apt, idx) => {
            const isSaved = savedApartmentIds.includes(apt.id);

            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white dark:bg-ink-950 rounded-3xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[4/3] bg-ink-100 overflow-hidden">
                  <img
                    src={apt.coverImage}
                    alt={apt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(apt.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-ink-800 hover:text-red-500 flex items-center justify-center transition-all shadow-md"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </button>

                  {/* Location Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur-md text-gold-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    {apt.locationName?.split(" ")[0]}
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-ink-900/90 backdrop-blur-md text-ink-900 dark:text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    <span>{apt.rating}</span>
                    <span className="text-[10px] text-ink-400">({apt.reviewCount})</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white line-clamp-1 group-hover:text-gold-600 transition-colors">
                      {apt.title}
                    </h3>
                    <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 line-clamp-2">
                      {apt.description}
                    </p>
                  </div>

                  {/* Specs Pill Strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-ink-100 dark:border-ink-800 text-[11px] text-ink-600 dark:text-ink-300 font-medium text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-gold-500" />
                      <span>{apt.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-gold-500" />
                      <span>{apt.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gold-500" />
                      <span>{apt.maxGuests} Guests</span>
                    </div>
                  </div>

                  {/* Pricing and Book CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-ink-400">
                        Starting from
                      </div>
                      <div className="font-heading text-lg font-bold text-gold-600 dark:text-gold-400">
                        {formatPKR(apt.nightlyPrice)}
                        <span className="text-[11px] font-normal text-ink-400 ml-1">
                          / night
                        </span>
                      </div>
                    </div>

                    <Link to={`/apartments/${apt.slug || apt.id}`}>
                      <Button variant="gold" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Apartments Footer CTA */}
        <div className="text-center pt-4">
          <Link to="/apartments">
            <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 8 Luxury Residences in Lahore
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
