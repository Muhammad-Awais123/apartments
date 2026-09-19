import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addDays, format } from "date-fns";
import { calculateBookingPrice, calculateNights } from "../lib/utils";

export const useBookingDraftStore = create(
  persist(
    (set, get) => ({
      // Search / Draft parameters
      locationId: "all",
      checkIn: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      checkOut: format(addDays(new Date(), 4), "yyyy-MM-dd"),
      adults: 2,
      children: 0,
      stayType: "short", // short, long

      // Selected Apartment
      selectedApartment: null,

      // Guest Details & Registration
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      guestCnic: "",
      cnicImageProof: "",
      specialRequests: "",
      arrivalTime: "15:00",

      // Add-ons & Discounts
      selectedAddOns: [],
      appliedCoupon: null,

      // Payment
      paymentMethod: "bank_transfer", // pay_at_checkin, bank_transfer, jazzcash, easypaisa
      paymentProofUrl: "",

      // Actions
      setSearchParams: (params) => set((state) => ({ ...state, ...params })),
      setSelectedApartment: (apartment) => set({ selectedApartment: apartment }),
      setGuestDetails: (details) => set((state) => ({ ...state, ...details })),
      
      toggleAddOn: (addon) => set((state) => {
        const exists = state.selectedAddOns.some(a => a.id === addon.id);
        const newAddOns = exists
          ? state.selectedAddOns.filter(a => a.id !== addon.id)
          : [...state.selectedAddOns, addon];
        return { selectedAddOns: newAddOns };
      }),

      setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
      setPaymentInfo: ({ paymentMethod, paymentProofUrl }) => set({ paymentMethod, paymentProofUrl }),

      getCalculatedPrice: () => {
        const state = get();
        if (!state.selectedApartment) return null;

        const nights = calculateNights(state.checkIn, state.checkOut);
        const addOnsTotal = state.selectedAddOns.reduce((sum, item) => sum + (item.price || 0), 0);
        const discountPercentage = state.appliedCoupon?.discountPercentage || 0;

        return calculateBookingPrice({
          baseNightlyRate: state.selectedApartment.nightlyPrice,
          monthlyRate: state.selectedApartment.monthlyPrice,
          nights,
          stayType: state.stayType,
          addOnsTotal,
          discountPercentage,
          taxPercentage: 5,
          serviceFeePercentage: 3
        });
      },

      resetDraft: () => set({
        selectedApartment: null,
        selectedAddOns: [],
        appliedCoupon: null,
        paymentProofUrl: "",
        specialRequests: ""
      })
    }),
    {
      name: "zak_booking_draft_storage"
    }
  )
);
