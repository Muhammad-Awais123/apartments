import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Calendar,
  Users,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Tag,
  Upload,
  ArrowRight,
  ArrowLeft,
  Download,
  Share2,
  Clock,
  Phone,
  Bed,
  Bath,
  Copy,
  Plus
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import { Button } from "../../components/ui/Button";
import { Input, Select } from "../../components/ui/Input";
import { Stepper } from "../../components/ui/Stepper";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { SEOHelmet } from "../../components/common/SEOHelmet";
import { useBookingDraftStore } from "../../store/bookingDraftStore";
import { useAuthStore } from "../../store/authStore";
import { formatPKR, formatDate, calculateNights, calculateBookingPrice } from "../../lib/utils";
import { generateInvoicePDF } from "../../lib/pdfGenerator";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apartmentsApi, bookingsApi, cmsApi } from "../../services/api";
import { siteConfig } from "../../config/site";
import { toast } from "sonner";

export default function BookingWizard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    locationId,
    checkIn,
    checkOut,
    adults,
    stayType,
    selectedApartment,
    guestName,
    guestEmail,
    guestPhone,
    guestCnic,
    cnicImageProof,
    specialRequests,
    arrivalTime,
    selectedAddOns,
    appliedCoupon,
    paymentMethod,
    paymentProofUrl,
    setSearchParams,
    setSelectedApartment,
    setGuestDetails,
    toggleAddOn,
    setAppliedCoupon,
    setPaymentInfo,
    resetDraft
  } = useBookingDraftStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [createdBooking, setCreatedBooking] = useState(null);

  // Prefill logged in user details
  useEffect(() => {
    if (user && !guestName) {
      setGuestDetails({
        guestName: user.name,
        guestEmail: user.email,
        guestPhone: user.phone || ""
      });
    }
  }, [user, guestName, setGuestDetails]);

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  // Available Add-ons with realistic PKR rates
  const availableAddOns = [
    { id: "airport_pickup", name: "Airport Luxury Sedan Pickup", price: 6000, desc: "Dedicated chauffeur with flight tracking and luggage assistance" },
    { id: "extra_bed", name: "Extra Plush Rollaway Bed", price: 4000, desc: "Complete with luxury mattress, duvet, and fresh linens" },
    { id: "early_checkin", name: "Guaranteed Early Check-in (10:00 AM)", price: 5000, desc: "Early room preparation and instant digital key activation" },
    { id: "late_checkout", name: "Late Check-out Privilege (4:00 PM)", price: 5000, desc: "Enjoy your stay extended until late afternoon" },
    { id: "daily_cleaning", name: "Daily Deep Cleaning & Linen Change", price: 3500, desc: "Daily professional housekeeping service" }
  ];

  const nights = calculateNights(checkIn, checkOut);
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const discountPercentage = appliedCoupon?.discountPercentage || 0;

  const currentPrice = selectedApartment
    ? calculateBookingPrice({
        baseNightlyRate: selectedApartment.nightlyPrice,
        monthlyRate: selectedApartment.monthlyPrice,
        nights,
        stayType,
        addOnsTotal,
        discountPercentage,
        taxPercentage: 5,
        serviceFeePercentage: 3
      })
    : null;

  const createBookingMutation = useMutation({
    mutationFn: (data) => bookingsApi.createBooking(data),
    onSuccess: (booking) => {
      setCreatedBooking(booking);
      setCurrentStep(5); // Confirmation step
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success("Booking successfully confirmed!");
    },
    onError: () => {
      toast.error("Failed to confirm booking.");
    }
  });

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCodeInput) return;
    try {
      const coupon = await cmsApi.validateCoupon(couponCodeInput);
      setAppliedCoupon(coupon);
      setCouponError("");
      toast.success(`Coupon applied! ${coupon.discountPercentage}% discount added.`);
    } catch (err) {
      setCouponError(err.message || "Invalid coupon code");
      toast.error(err.message || "Invalid coupon code");
    }
  };

  const handleConfirmReservation = () => {
    if (!selectedApartment) {
      toast.error("Please select an apartment.");
      return;
    }
    if (!guestName || !guestPhone) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    createBookingMutation.mutate({
      apartmentId: selectedApartment.id,
      apartmentTitle: selectedApartment.title,
      locationId: selectedApartment.locationId,
      locationName: selectedApartment.locationName,
      checkIn,
      checkOut,
      nights,
      adults,
      stayType,
      guestName,
      guestEmail,
      guestPhone,
      guestCnic: guestCnic || "Pending Check-in",
      cnicImageProof: cnicImageProof ? (typeof cnicImageProof === "string" ? cnicImageProof : cnicImageProof[0]?.url) : "",
      specialRequests,
      arrivalTime,
      addOns: selectedAddOns,
      pricing: currentPrice,
      totalAmount: currentPrice.grandTotal,
      paymentMethod,
      paymentProofUrl: paymentProofUrl ? (typeof paymentProofUrl === "string" ? paymentProofUrl : paymentProofUrl[0]?.url) : ""
    });
  };

  const steps = [
    { label: "Dates & Guests" },
    { label: "Select Suite" },
    { label: "Guest Info" },
    { label: "Add-Ons & Perks" },
    { label: "Payment" },
    { label: "Confirmation" }
  ];

  return (
    <div className="min-h-screen bg-cream-50/40 dark:bg-ink-950 py-10 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title="Direct Booking Engine | Zak Residence Lahore"
        description="Complete your luxury apartment reservation in Lahore with instant digital door lock pass, PKR pricing, and payment confirmation."
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Progress Stepper */}
        <div className="bg-white dark:bg-ink-900 p-4 sm:p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={(step) => {
              if (step < currentStep && currentStep !== 5) setCurrentStep(step);
            }}
          />
        </div>

        {/* Step 0: Dates & Stay Type */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-ink-900 p-6 sm:p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-6"
          >
            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
                Step 1: Choose Stay Dates & Preferences
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                Select your intended arrival, departure, and number of guests.
              </p>
            </div>

            {/* Stay Type Toggle */}
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setSearchParams({ stayType: "short" })}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  stayType === "short"
                    ? "border-gold-500 bg-gold-50 dark:bg-gold-950/40 text-gold-700 dark:text-gold-300"
                    : "border-ink-200 dark:border-ink-700 hover:bg-ink-50"
                }`}
              >
                Short Stay (1–29 Nights)
              </button>
              <button
                type="button"
                onClick={() => setSearchParams({ stayType: "long" })}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  stayType === "long"
                    ? "border-gold-500 bg-gold-50 dark:bg-gold-950/40 text-gold-700 dark:text-gold-300"
                    : "border-ink-200 dark:border-ink-700 hover:bg-ink-50"
                }`}
              >
                Monthly Lease (30+ Nights)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-ink-600 block mb-1.5">Check-In Date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setSearchParams({ checkIn: e.target.value })}
                  className="w-full h-11 px-3 text-xs bg-ink-50 dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-700 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-ink-600 block mb-1.5">Check-Out Date</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setSearchParams({ checkOut: e.target.value })}
                  className="w-full h-11 px-3 text-xs bg-ink-50 dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-700 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-ink-600 block mb-1.5">Total Guests</label>
                <select
                  value={adults}
                  onChange={(e) => setSearchParams({ adults: Number(e.target.value) })}
                  className="w-full h-11 px-3 text-xs bg-ink-50 dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-700 font-semibold"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 dark:bg-ink-800/50 text-xs text-ink-600 dark:text-ink-300 flex items-center justify-between">
              <span>Calculated Stay: <strong>{nights} Night(s)</strong></span>
              <span className="text-gold-600 font-semibold">{stayType === "long" ? "Monthly Discount Active" : "Nightly Rate Active"}</span>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="gold"
                size="md"
                onClick={() => setCurrentStep(1)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue to Apartment Selection
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 1: Apartment Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
                  Step 2: Choose Your Residence
                </h2>
                <p className="text-xs text-ink-500 mt-0.5">
                  Showing suites available for {nights} night(s) from {formatDate(checkIn)} to {formatDate(checkOut)}.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(0)}
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                Change Dates
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {apartments.map((apt) => {
                const isSelected = selectedApartment?.id === apt.id;

                return (
                  <div
                    key={apt.id}
                    onClick={() => setSelectedApartment(apt)}
                    className={`group bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? "border-gold-500 ring-4 ring-gold-500/20 shadow-xl"
                        : "border-ink-100 dark:border-ink-800 hover:border-gold-300"
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={apt.coverImage}
                        alt={apt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isSelected && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold-500 text-white text-xs font-bold flex items-center gap-1 shadow-md">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-ink-900/80 backdrop-blur-md text-white text-xs font-semibold">
                        {apt.locationName}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white">
                        {apt.title}
                      </h3>
                      <p className="text-xs text-ink-500 line-clamp-2">{apt.description}</p>
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-ink-100 dark:border-ink-800">
                        <span className="text-ink-600">{apt.bedrooms} Bed · {apt.bathrooms} Bath</span>
                        <span className="font-bold text-gold-600 font-heading text-base">
                          {formatPKR(stayType === "long" ? apt.monthlyPrice : apt.nightlyPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center bg-white dark:bg-ink-900 p-5 rounded-3xl border border-ink-100 dark:border-ink-800">
              <Button variant="ghost" size="md" onClick={() => setCurrentStep(0)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                variant="gold"
                size="md"
                disabled={!selectedApartment}
                onClick={() => setCurrentStep(2)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed with Selected Suite
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Guest Details & CNIC Upload */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-ink-900 p-6 sm:p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-6"
          >
            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
                Step 3: Primary Guest Information & Digital Clearance
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                Required for pre-arrival security clearance and smart lock PIN registration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Legal Name"
                placeholder="e.g. Hamza Tariq"
                value={guestName}
                onChange={(e) => setGuestDetails({ guestName: e.target.value })}
                required
              />
              <Input
                label="WhatsApp / Phone Number"
                placeholder="+92 300 1234567"
                value={guestPhone}
                onChange={(e) => setGuestDetails({ guestPhone: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="hamza@example.com"
                value={guestEmail}
                onChange={(e) => setGuestDetails({ guestEmail: e.target.value })}
              />
              <Input
                label="CNIC Number or Passport #"
                placeholder="35202-XXXXXXXX-X"
                value={guestCnic}
                onChange={(e) => setGuestDetails({ guestCnic: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Estimated Arrival Time"
                value={arrivalTime}
                onChange={(e) => setGuestDetails({ arrivalTime: e.target.value })}
                options={[
                  { value: "14:00", label: "2:00 PM (Standard Check-in)" },
                  { value: "16:00", label: "4:00 PM" },
                  { value: "18:00", label: "6:00 PM" },
                  { value: "20:00", label: "8:00 PM" },
                  { value: "22:00", label: "10:00 PM (Late Night)" },
                  { value: "00:00", label: "Midnight Flight Arrival" }
                ]}
              />
              <Input
                label="Special Requests / Dietary / Occasion"
                placeholder="e.g. Anniversary setup, quiet floor, extra pillows..."
                value={specialRequests}
                onChange={(e) => setGuestDetails({ specialRequests: e.target.value })}
              />
            </div>

            {/* CNIC Image Proof Upload */}
            <div className="pt-2">
              <ImageUploader
                images={cnicImageProof ? (Array.isArray(cnicImageProof) ? cnicImageProof : [cnicImageProof]) : []}
                onChange={(imgs) => setGuestDetails({ cnicImageProof: imgs })}
                maxFiles={2}
                label="Upload CNIC / Passport Photo (Front & Back)"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-ink-100 dark:border-ink-800">
              <Button variant="ghost" size="md" onClick={() => setCurrentStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                variant="gold"
                size="md"
                disabled={!guestName || !guestPhone}
                onClick={() => setCurrentStep(3)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue to Add-Ons
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Add-Ons & Promo Coupons */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-ink-900 p-6 sm:p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-6"
          >
            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
                Step 4: Enhance Your Stay & Apply Coupons
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                Customize your luxury stay with bespoke concierge add-ons.
              </p>
            </div>

            {/* Add-ons List */}
            <div className="space-y-3">
              {availableAddOns.map((addon) => {
                const isSelected = selectedAddOns.some((a) => a.id === addon.id);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? "border-gold-500 bg-gold-50/40 dark:bg-gold-950/30"
                        : "border-ink-100 dark:border-ink-800 hover:border-gold-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                        isSelected ? "bg-gold-500 border-gold-500 text-white" : "border-ink-300 text-transparent"
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ink-900 dark:text-white">{addon.name}</h4>
                        <p className="text-[11px] text-ink-500">{addon.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gold-600 font-heading shrink-0">
                      +{formatPKR(addon.price)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Coupon Code Box */}
            <div className="p-4 rounded-2xl bg-cream-50 dark:bg-ink-800/60 border border-gold-400/30 space-y-3">
              <div className="text-xs font-bold text-ink-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-gold-500" />
                Have a Promo Code?
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-semibold">
                  <span>Coupon <strong>{appliedCoupon.code}</strong> Applied ({appliedCoupon.discountPercentage}% OFF)</span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    placeholder="Enter code (e.g. ZAKWELCOME10, LAHORESTAY)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="h-10 text-xs uppercase"
                  />
                  <Button type="submit" variant="gold" size="sm" className="shrink-0">
                    Apply
                  </Button>
                </form>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-ink-100 dark:border-ink-800">
              <Button variant="ghost" size="md" onClick={() => setCurrentStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                variant="gold"
                size="md"
                onClick={() => setCurrentStep(4)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Payment
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Payment Mode & Proof Upload */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Payment Methods */}
            <div className="lg:col-span-2 bg-white dark:bg-ink-900 p-6 sm:p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
                  Step 5: Select Payment Method
                </h2>
                <p className="text-xs text-ink-500 mt-1">
                  Choose your preferred Pakistani bank or mobile wallet transfer.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "bank_transfer", label: "Direct Bank Transfer (IBFT)", desc: "Meezan Bank & HBL Instant Account" },
                  { id: "jazzcash", label: "JazzCash Mobile Account", desc: "Pay via 0300-8472910 Till / Wallet" },
                  { id: "easypaisa", label: "Easypaisa Wallet", desc: "Instant transfer with transaction ID" },
                  { id: "pay_at_checkin", label: "Pay at Check-In (Cash)", desc: "Valid for verified residents only" }
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPaymentInfo({ paymentMethod: m.id, paymentProofUrl })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === m.id
                        ? "border-gold-500 bg-gold-50/40 dark:bg-gold-950/30"
                        : "border-ink-100 dark:border-ink-800 hover:border-gold-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === m.id ? "border-gold-500" : "border-ink-300"
                      }`}>
                        {paymentMethod === m.id && <div className="w-2 h-2 rounded-full bg-gold-500" />}
                      </div>
                      <h4 className="text-xs font-bold text-ink-900 dark:text-white">{m.label}</h4>
                    </div>
                    <p className="text-[11px] text-ink-500 mt-1.5 ml-6">{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* Account Details Box for Bank / JazzCash / Easypaisa */}
              {paymentMethod !== "pay_at_checkin" && (
                <div className="p-4 rounded-2xl bg-ink-900 text-white space-y-3 text-xs">
                  <div className="text-gold-400 font-bold uppercase tracking-wider">
                    Official Business Beneficiary Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ink-200">
                    <div>Bank: <strong>Meezan Bank Ltd (Gulberg Lahore)</strong></div>
                    <div>Account Title: <strong>Zak Residence (Pvt) Ltd</strong></div>
                    <div>IBAN: <strong>PK72MEZN0001092837461902</strong></div>
                    <div>JazzCash / Easypaisa: <strong>0300-8472910</strong></div>
                  </div>
                </div>
              )}

              {/* Payment Proof Slip Upload */}
              {paymentMethod !== "pay_at_checkin" && (
                <div className="pt-2">
                  <ImageUploader
                    images={paymentProofUrl ? (Array.isArray(paymentProofUrl) ? paymentProofUrl : [paymentProofUrl]) : []}
                    onChange={(imgs) => setPaymentInfo({ paymentMethod, paymentProofUrl: imgs })}
                    maxFiles={1}
                    label="Upload Payment Receipt / Transfer Screenshot"
                  />
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-ink-100 dark:border-ink-800">
                <Button variant="ghost" size="md" onClick={() => setCurrentStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button
                  variant="gold"
                  size="md"
                  isLoading={createBookingMutation.isPending}
                  onClick={handleConfirmReservation}
                >
                  Confirm & Finalize Booking
                </Button>
              </div>
            </div>

            {/* Sticky Summary Card */}
            <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4 h-fit">
              <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white pb-3 border-b border-ink-100 dark:border-ink-800">
                Reservation Summary
              </h3>

              <div className="text-xs space-y-2">
                <div className="font-bold text-ink-900 dark:text-white">{selectedApartment?.title}</div>
                <div className="text-ink-500">{formatDate(checkIn)} → {formatDate(checkOut)} ({nights} Nights)</div>
                <div className="text-ink-500">{adults} Guests · {selectedApartment?.locationName}</div>
              </div>

              <div className="space-y-2 pt-3 border-t border-ink-100 dark:border-ink-800 text-xs">
                <div className="flex justify-between text-ink-600">
                  <span>Accommodation</span>
                  <span>{formatPKR(currentPrice?.accommodationTotal)}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-ink-600">
                    <span>Add-ons Total</span>
                    <span>{formatPKR(addOnsTotal)}</span>
                  </div>
                )}
                {currentPrice?.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Applied</span>
                    <span>-{formatPKR(currentPrice.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-ink-600">
                  <span>Taxes (5%)</span>
                  <span>{formatPKR(currentPrice?.taxAmount)}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Concierge Fee (3%)</span>
                  <span>{formatPKR(currentPrice?.serviceFee)}</span>
                </div>

                <div className="flex justify-between font-bold text-sm text-ink-900 dark:text-white pt-2 border-t border-ink-100">
                  <span>Grand Total</span>
                  <span className="text-gold-600 font-heading text-lg">{formatPKR(currentPrice?.grandTotal)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Instant Booking Confirmation & QR Code */}
        {currentStep === 5 && createdBooking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-ink-900 p-8 sm:p-12 rounded-3xl border border-gold-400/50 shadow-2xl space-y-8 text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-gold-500 text-white flex items-center justify-center mx-auto shadow-gold-glow">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Booking Confirmed
              </span>
              <h2 className="font-heading text-3xl font-bold text-ink-900 dark:text-white">
                Thank You, {createdBooking.guestName}!
              </h2>
              <p className="text-xs sm:text-sm text-ink-500">
                Your luxury suite reservation at <strong>{createdBooking.apartmentTitle}</strong> is secured.
              </p>
            </div>

            {/* QR Pass Box */}
            <div className="p-6 rounded-3xl bg-cream-50 dark:bg-ink-950 border border-gold-300/60 max-w-sm mx-auto space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-ink-500">
                Digital Guest Pass & Door Code
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm inline-block">
                <QRCodeSVG
                  value={`https://zakresidence.com/pass/${createdBooking.id}?doorCode=${createdBooking.doorCode}`}
                  size={150}
                  level="H"
                />
              </div>

              <div>
                <div className="text-[11px] text-ink-400 uppercase font-bold">Booking Reference</div>
                <div className="font-heading text-xl font-bold text-ink-900 dark:text-white tracking-widest">
                  {createdBooking.id}
                </div>
              </div>

              <div className="p-3 bg-gold-100 dark:bg-gold-950/60 rounded-xl text-xs font-bold text-gold-900 dark:text-gold-300">
                Smart Door PIN: <span className="font-mono text-base tracking-widest">{createdBooking.doorCode}</span>
                <div className="text-[10px] font-normal text-gold-700 dark:text-gold-400 mt-0.5">
                  (Activates automatically at 2:00 PM on check-in day)
                </div>
              </div>
            </div>

            {/* Actions: Download PDF Invoice & Share */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                variant="gold"
                size="md"
                onClick={() => generateInvoicePDF(createdBooking)}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download Official PDF Invoice
              </Button>

              <a
                href={`https://wa.me/923008472910?text=Hello%20Zak%20Residence%20Team%2C%20I%20have%20completed%20booking%20${createdBooking.id}%20for%20${createdBooking.guestName}.`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<Phone className="w-4 h-4 text-emerald-600" />}
                >
                  Send to Concierge on WhatsApp
                </Button>
              </a>

              <Link to="/account/bookings">
                <Button variant="ghost" size="md">
                  View in Guest Portal
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
