import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, differenceInDays, addDays, parseISO, isWithinInterval } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPKR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "Rs. 0";
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`;
}

export function formatDate(date, formatStr = "dd MMM yyyy") {
  if (!date) return "";
  try {
    const d = typeof date === "string" ? parseISO(date) : date;
    return format(d, formatStr);
  } catch (e) {
    return String(date);
  }
}

export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;
  const start = typeof checkIn === 'string' ? parseISO(checkIn) : checkIn;
  const end = typeof checkOut === 'string' ? parseISO(checkOut) : checkOut;
  const days = differenceInDays(end, start);
  return days > 0 ? days : 1;
}

export function calculateBookingPrice({
  baseNightlyRate = 0,
  monthlyRate = 0,
  nights = 1,
  stayType = 'short',
  addOnsTotal = 0,
  discountPercentage = 0,
  taxPercentage = 5,
  serviceFeePercentage = 3,
}) {
  let accommodationTotal = 0;
  
  if (stayType === 'long' || nights >= 30) {
    const effectiveMonthly = monthlyRate > 0 ? monthlyRate : baseNightlyRate * 25;
    const months = nights / 30;
    accommodationTotal = Math.round(effectiveMonthly * months);
  } else if (nights >= 7) {
    // 10% weekly discount on nightly rate
    accommodationTotal = Math.round(baseNightlyRate * nights * 0.9);
  } else {
    accommodationTotal = baseNightlyRate * nights;
  }

  const discountAmount = Math.round((accommodationTotal * discountPercentage) / 100);
  const subtotalAfterDiscount = accommodationTotal - discountAmount + addOnsTotal;
  
  const taxAmount = Math.round((subtotalAfterDiscount * taxPercentage) / 100);
  const serviceFee = Math.round((subtotalAfterDiscount * serviceFeePercentage) / 100);
  const grandTotal = subtotalAfterDiscount + taxAmount + serviceFee;

  return {
    nights,
    stayType: nights >= 30 ? 'long' : stayType,
    nightlyRate: baseNightlyRate,
    accommodationTotal,
    addOnsTotal,
    discountAmount,
    subtotal: subtotalAfterDiscount,
    taxAmount,
    serviceFee,
    grandTotal,
  };
}

export function generateBookingId() {
  const prefix = "ZAK";
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  const year = new Date().getFullYear().toString().slice(-2);
  return `${prefix}-${year}-${randomStr}`;
}

export function truncateText(text, length = 100) {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}
