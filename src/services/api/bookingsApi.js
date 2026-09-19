import { getCollection, setCollection, delay } from "./storage";
import { generateBookingId } from "../../lib/utils";

export const bookingsApi = {
  async getBookings(filters = {}) {
    await delay();
    let bookings = await getCollection("bookings");

    if (filters.guestId) {
      bookings = bookings.filter(b => b.guestId === filters.guestId);
    }
    if (filters.status && filters.status !== "all") {
      bookings = bookings.filter(b => b.status === filters.status);
    }
    if (filters.paymentStatus && filters.paymentStatus !== "all") {
      bookings = bookings.filter(b => b.paymentStatus === filters.paymentStatus);
    }
    if (filters.apartmentId && filters.apartmentId !== "all") {
      bookings = bookings.filter(b => b.apartmentId === filters.apartmentId);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      bookings = bookings.filter(b =>
        b.id.toLowerCase().includes(q) ||
        b.guestName.toLowerCase().includes(q) ||
        b.guestPhone.toLowerCase().includes(q) ||
        b.guestEmail.toLowerCase().includes(q) ||
        b.apartmentTitle.toLowerCase().includes(q)
      );
    }

    return bookings;
  },

  async getBookingById(id) {
    await delay();
    const bookings = await getCollection("bookings");
    const booking = bookings.find(b => b.id === id);
    if (!booking) throw new Error("Booking not found");
    return booking;
  },

  async createBooking(bookingData) {
    await delay();
    const bookings = await getCollection("bookings");
    const newBooking = {
      ...bookingData,
      id: generateBookingId(),
      doorCode: `${Math.floor(1000 + Math.random() * 9000)}#`,
      status: bookingData.paymentMethod === "pay_at_checkin" ? "confirmed" : "pending",
      paymentStatus: bookingData.paymentMethod === "pay_at_checkin" ? "unpaid" : (bookingData.paymentProofUrl ? "pending_verification" : "unpaid"),
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    await setCollection("bookings", bookings);
    return newBooking;
  },

  async updateBookingStatus(id, { status, paymentStatus, notes }) {
    await delay();
    const bookings = await getCollection("bookings");
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) throw new Error("Booking not found");

    if (status) bookings[index].status = status;
    if (paymentStatus) bookings[index].paymentStatus = paymentStatus;
    if (notes) bookings[index].adminNotes = notes;

    await setCollection("bookings", bookings);
    return bookings[index];
  },

  async cancelBooking(id, reason = "") {
    await delay();
    const bookings = await getCollection("bookings");
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) throw new Error("Booking not found");

    bookings[index].status = "cancelled";
    bookings[index].cancellationReason = reason;
    bookings[index].cancelledAt = new Date().toISOString();

    await setCollection("bookings", bookings);
    return bookings[index];
  }
};
