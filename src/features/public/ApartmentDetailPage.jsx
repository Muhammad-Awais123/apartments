import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Users,
  Maximize,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  Calendar as CalendarIcon,
  Heart,
  Share2,
  Phone,
  Sparkles,
  Wifi,
  Lock,
  Utensils,
  AirVent,
  Flame,
  Tv,
  Car,
  Zap,
  Shirt,
  ArrowUpDown,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Rating } from "../../components/ui/Rating";
import { Lightbox } from "../../components/ui/Lightbox";
import { SEOHelmet } from "../../components/common/SEOHelmet";
import { useWishlistStore } from "../../store/wishlistStore";
import { useBookingDraftStore } from "../../store/bookingDraftStore";
import { formatPKR, calculateNights, calculateBookingPrice } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apartmentsApi, reviewsApi } from "../../services/api";
import { siteConfig } from "../../config/site";
import { toast } from "sonner";
import { addDays, format } from "date-fns";

export default function ApartmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedApartmentIds, toggleWishlist } = useWishlistStore();
  const { setSelectedApartment, setSearchParams } = useBookingDraftStore();

  // Booking Card Inputs
  const [checkIn, setCheckIn] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 5), "yyyy-MM-dd"));
  const [guestsCount, setGuestsCount] = useState(2);
  const [stayType, setStayType] = useState("short");

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const { data: apartment, isLoading } = useQuery({
    queryKey: ["apartment", id],
    queryFn: () => apartmentsApi.getApartmentById(id),
  });

  const { data: allApartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const { data: apartmentReviews = [] } = useQuery({
    queryKey: ["reviews", apartment?.id],
    queryFn: () => reviewsApi.getReviews({ apartmentId: apartment?.id, status: "approved" }),
    enabled: Boolean(apartment?.id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
            Loading Luxury Suite...
          </p>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-heading text-2xl font-bold">Residence Not Found</h2>
        <p className="text-xs text-ink-500 mt-2">The requested apartment could not be located.</p>
        <Link to="/apartments" className="mt-4">
          <Button variant="gold" size="sm">
            Back to All Residences
          </Button>
        </Link>
      </div>
    );
  }

  const isSaved = savedApartmentIds.includes(apartment.id);
  const nights = calculateNights(checkIn, checkOut);
  const pricing = calculateBookingPrice({
    baseNightlyRate: apartment.nightlyPrice,
    monthlyRate: apartment.monthlyPrice,
    nights,
    stayType,
    taxPercentage: 5,
    serviceFeePercentage: 3
  });

  const handleProceedToBooking = () => {
    setSelectedApartment(apartment);
    setSearchParams({
      checkIn,
      checkOut,
      adults: Number(guestsCount),
      stayType
    });
    navigate("/book");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${apartment.title} - Zak Residence`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Apartment link copied to clipboard!");
    }
  };

  const similarApartments = allApartments
    .filter((a) => a.id !== apartment.id && a.locationId === apartment.locationId)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950 py-8 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title={`${apartment.title} - ${apartment.locationName}`}
        description={apartment.description}
        image={apartment.coverImage}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <Link to="/" className="hover:text-gold-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/apartments" className="hover:text-gold-600">Apartments</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-ink-800 dark:text-white font-medium truncate max-w-[200px]">
              {apartment.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-ink-200 dark:border-ink-800 hover:bg-ink-50 dark:hover:bg-ink-900 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={() => toggleWishlist(apartment.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-ink-200 dark:border-ink-800 hover:bg-ink-50 dark:hover:bg-ink-900 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
              {apartment.type}
            </span>
            <div className="flex items-center gap-1 text-xs text-ink-500 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-gold-500" />
              <span>{apartment.address}</span>
            </div>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold text-ink-900 dark:text-white">
            {apartment.title}
          </h1>
        </div>

        {/* Image Gallery Grid with Lightbox Trigger */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden shadow-sm relative">
          <div
            onClick={() => {
              setActivePhotoIdx(0);
              setLightboxOpen(true);
            }}
            className="md:col-span-2 aspect-[4/3] bg-ink-100 cursor-pointer overflow-hidden relative group"
          >
            <img
              src={apartment.images[0] || apartment.coverImage}
              alt="Main living"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <span className="px-4 py-2 rounded-xl bg-ink-900/80 backdrop-blur-md text-xs font-bold flex items-center gap-2">
                <Maximize2 className="w-4 h-4" /> Expand Photos
              </span>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2 col-span-2 gap-3">
            {apartment.images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActivePhotoIdx(idx + 1);
                  setLightboxOpen(true);
                }}
                className="aspect-[4/3] bg-ink-100 cursor-pointer overflow-hidden relative group"
              >
                <img
                  src={img}
                  alt={`Photo ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* View All Photos Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-white/90 dark:bg-ink-900/90 backdrop-blur-md text-ink-900 dark:text-white text-xs font-bold shadow-md hover:bg-gold-500 hover:text-ink-900 transition-all flex items-center gap-2"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Show all {apartment.images.length} photos</span>
          </button>
        </div>

        {/* Main Content & Sticky Booking Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column (Details, Amenities, Highlights, House Rules, Reviews) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-4 gap-4 p-5 rounded-2xl bg-cream-50/50 dark:bg-ink-900 border border-ink-100 dark:border-ink-800 text-center text-xs font-semibold">
              <div>
                <Bed className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                <span>{apartment.bedrooms} Bedrooms</span>
              </div>
              <div>
                <Bath className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                <span>{apartment.bathrooms} Bathrooms</span>
              </div>
              <div>
                <Users className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                <span>Up to {apartment.maxGuests} Guests</span>
              </div>
              <div>
                <Maximize className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                <span>{apartment.areaSqFt} Sq Ft ({apartment.floor})</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-ink-900 dark:text-white">
                About this Residence
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                {apartment.description}
              </p>
            </div>

            {/* Key Highlights */}
            {apartment.highlights && (
              <div className="space-y-3">
                <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white">
                  Signature Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {apartment.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-gold-50/50 dark:bg-gold-950/30 border border-gold-200/50 dark:border-gold-800/40 text-xs font-semibold text-ink-800 dark:text-ink-200"
                    >
                      <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Checklist */}
            <div className="space-y-4 pt-4 border-t border-ink-100 dark:border-ink-800">
              <h3 className="font-heading text-xl font-bold text-ink-900 dark:text-white">
                What this Residence Offers
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {siteConfig.amenitiesList.map((am) => {
                  const included = apartment.amenities.includes(am.id);
                  return (
                    <div
                      key={am.id}
                      className={`flex items-center gap-2.5 text-xs font-medium ${
                        included ? "text-ink-800 dark:text-ink-200" : "text-ink-300 opacity-40 line-through"
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${included ? "text-gold-500" : "text-ink-300"}`} />
                      <span>{am.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* House Rules & Policies */}
            <div className="space-y-3 pt-4 border-t border-ink-100 dark:border-ink-800">
              <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white">
                House Rules & Check-In Times
              </h3>
              <div className="bg-cream-50 dark:bg-ink-900 p-5 rounded-2xl border border-ink-100 dark:border-ink-800 text-xs space-y-2 text-ink-700 dark:text-ink-300">
                <div>• Check-In: <strong>{siteConfig.checkInTime}</strong> | Check-Out: <strong>{siteConfig.checkOutTime}</strong></div>
                {apartment.houseRules.map((rule, idx) => (
                  <div key={idx}>• {rule}</div>
                ))}
              </div>
            </div>

            {/* Verified Reviews Section */}
            <div className="space-y-4 pt-4 border-t border-ink-100 dark:border-ink-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-gold-500 text-gold-500" />
                  <span className="font-heading text-xl font-bold">{apartment.rating}</span>
                  <span className="text-xs text-ink-400">({apartmentReviews.length} Verified Reviews)</span>
                </div>
              </div>

              <div className="space-y-3">
                {apartmentReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                          alt={rev.guestName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold">{rev.guestName}</span>
                      </div>
                      <Rating value={rev.rating} size="sm" showNumber={false} />
                    </div>
                    <p className="text-xs text-ink-600 dark:text-ink-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Live Price Calculator Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-ink-900 rounded-3xl p-6 border border-gold-400/40 shadow-xl space-y-6">
              {/* Header Rate */}
              <div className="flex items-baseline justify-between pb-4 border-b border-ink-100 dark:border-ink-800">
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-gold-600 dark:text-gold-400">
                    {formatPKR(stayType === "long" ? apartment.monthlyPrice : apartment.nightlyPrice)}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-ink-400">
                    {stayType === "long" ? "Per Month (All-Inclusive)" : "Per Night"}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-ink-800 dark:text-white">
                  <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                  <span>{apartment.rating}</span>
                </div>
              </div>

              {/* Date & Guests Selection */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-ink-500">Check-In</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full h-10 px-2 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-ink-500">Check-Out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full h-10 px-2 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-ink-500">Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 font-semibold"
                  >
                    {[...Array(apartment.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Guest{i > 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 pt-4 border-t border-ink-100 dark:border-ink-800 text-xs">
                <div className="flex justify-between text-ink-600 dark:text-ink-400">
                  <span>
                    {formatPKR(apartment.nightlyPrice)} x {nights} Night(s)
                  </span>
                  <span>{formatPKR(pricing.accommodationTotal)}</span>
                </div>
                <div className="flex justify-between text-ink-600 dark:text-ink-400">
                  <span>Hospitality Tax (5%)</span>
                  <span>{formatPKR(pricing.taxAmount)}</span>
                </div>
                <div className="flex justify-between text-ink-600 dark:text-ink-400">
                  <span>Cleaning & Concierge Fee (3%)</span>
                  <span>{formatPKR(pricing.serviceFee)}</span>
                </div>

                <div className="flex justify-between font-bold text-sm text-ink-900 dark:text-white pt-2 border-t border-ink-100 dark:border-ink-800">
                  <span>Total Due</span>
                  <span className="text-gold-600">{formatPKR(pricing.grandTotal)}</span>
                </div>
              </div>

              {/* Reserve Button & WhatsApp Direct */}
              <div className="space-y-2">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={handleProceedToBooking}
                >
                  Proceed to Reservation
                </Button>

                <a
                  href={`https://wa.me/923008472910?text=Hello%20Zak%20Residence%2C%20I%20am%20interested%20in%20reserving%20${encodeURIComponent(
                    apartment.title
                  )}%20from%20${checkIn}%20to%20${checkOut}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    leftIcon={<Phone className="w-3.5 h-3.5 text-gold-500" />}
                  >
                    Direct WhatsApp Inquiry
                  </Button>
                </a>
              </div>

              <div className="text-[11px] text-ink-400 text-center space-y-1">
                <div>✓ 100% Guaranteed Loadshedding Backup</div>
                <div>✓ Free Cancellation up to 48 hours prior</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Residences in Area */}
        {similarApartments.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-ink-100 dark:border-ink-800">
            <h3 className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
              Similar Suites in {apartment.locationName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarApartments.map((sim) => (
                <Link
                  key={sim.id}
                  to={`/apartments/${sim.slug || sim.id}`}
                  className="group bg-white dark:bg-ink-900 rounded-2xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury transition-all"
                >
                  <div className="aspect-[16/10] bg-ink-100 overflow-hidden">
                    <img
                      src={sim.coverImage}
                      alt={sim.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-heading text-sm font-bold text-ink-900 dark:text-white line-clamp-1">
                      {sim.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-500">{sim.bedrooms} Bed · {sim.bathrooms} Bath</span>
                      <span className="font-bold text-gold-600">{formatPKR(sim.nightlyPrice)}/nt</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for Gallery */}
      <Lightbox
        isOpen={lightboxOpen}
        images={apartment.images}
        currentIndex={activePhotoIdx}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActivePhotoIdx((p) => (p + 1) % apartment.images.length)}
        onPrev={() => setActivePhotoIdx((p) => (p - 1 + apartment.images.length) % apartment.images.length)}
        title={apartment.title}
      />
    </div>
  );
}
