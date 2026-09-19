import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Key,
  Heart,
  User,
  MessageSquare,
  Sparkles,
  Download,
  Share2,
  Copy,
  Clock,
  LogOut,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Send,
  Gift
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { SEOHelmet } from "../../components/common/SEOHelmet";
import { useAuthStore } from "../../store/authStore";
import { useWishlistStore } from "../../store/wishlistStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi, apartmentsApi } from "../../services/api";
import { formatPKR, formatDate } from "../../lib/utils";
import { generateInvoicePDF } from "../../lib/pdfGenerator";
import { toast } from "sonner";

export function GuestLayout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/account", icon: Sparkles },
    { label: "My Bookings", path: "/account/bookings", icon: Calendar },
    { label: "Digital Door Key", path: "/account/door-codes", icon: Key },
    { label: "Saved Apartments", path: "/account/wishlist", icon: Heart },
    { label: "Concierge Tickets", path: "/account/support", icon: MessageSquare },
    { label: "My Profile & IDs", path: "/account/profile", icon: User }
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cream-50/40 dark:bg-ink-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Guest Portal Top Banner */}
        <div className="bg-ink-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-gold-500/30">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-gold-400 shadow-md"
            />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
                Zak Resident Member
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold">
                {user?.name || "Valued Resident"}
              </h1>
              <p className="text-xs text-ink-300 mt-0.5">
                {user?.email} · Lahore Resident ID: <strong>{user?.id || "GST-892"}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-center border border-white/10">
              <div className="text-[10px] uppercase font-bold text-gold-400">Loyalty Points</div>
              <div className="font-heading text-xl font-bold text-white">450 Pts</div>
            </div>
            <Link to="/apartments">
              <Button variant="gold" size="sm">
                Book Another Suite
              </Button>
            </Link>
          </div>
        </div>

        {/* Portal Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === "/account"
                ? location.pathname === "/account"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-gold-500 text-white shadow-md shadow-gold-500/20"
                    : "bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-300 hover:bg-cream-100 border border-ink-100 dark:border-ink-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Outlet Content */}
        <div className="bg-white dark:bg-ink-900 p-6 sm:p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm min-h-[450px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function GuestDashboard() {
  const { user } = useAuthStore();
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: () => bookingsApi.getBookings(),
  });

  const activeBooking = bookings.find((b) => b.status === "checked_in" || b.status === "confirmed") || bookings[0];

  return (
    <div className="space-y-8">
      <SEOHelmet title="Resident Dashboard | Zak Residence" />

      {/* Active Stay Alert Card */}
      {activeBooking ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-cream-50 dark:bg-ink-900 border border-gold-300/60 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-gold-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Current Active Stay
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-ink-900 dark:text-white mt-2">
                {activeBooking.apartmentTitle}
              </h2>
              <p className="text-xs text-ink-500 mt-0.5">
                {activeBooking.locationName} · {formatDate(activeBooking.checkIn)} to {formatDate(activeBooking.checkOut)} ({activeBooking.nights} Nights)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateInvoicePDF(activeBooking)}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Invoice PDF
              </Button>
            </div>
          </div>

          {/* Digital Key Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-ink-900 border border-gold-400/40">
            <div>
              <div className="text-[10px] font-bold text-ink-400 uppercase">Door PIN Passcode</div>
              <div className="font-mono text-2xl font-bold text-gold-600 tracking-widest mt-1">
                {activeBooking.doorCode || "9482#"}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-ink-400 uppercase">Check-In Status</div>
              <div className="text-xs font-bold text-emerald-600 uppercase mt-2">
                ✓ Ready for Entry (Active)
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-ink-400 uppercase">WiFi Network & Key</div>
              <div className="text-xs font-bold text-ink-800 dark:text-white mt-1">
                Zak_Luxury_5G / Pass: <strong>zakresidence2026</strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-cream-50 dark:bg-ink-800/40 rounded-3xl border border-dashed border-ink-200">
          <Calendar className="w-10 h-10 text-gold-500 mx-auto mb-2" />
          <h3 className="font-heading text-lg font-bold">No active reservations</h3>
          <p className="text-xs text-ink-500 mt-1">Ready for your next stay in Lahore?</p>
          <Link to="/apartments" className="inline-block mt-4">
            <Button variant="gold" size="sm">Explore Available Suites</Button>
          </Link>
        </div>
      )}

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-3">
          <Gift className="w-8 h-8 text-gold-500" />
          <h3 className="font-heading text-base font-bold">Referral Program</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            Share code <strong>ZAK-HAMZA10</strong> with family or colleagues to gift them 10% off and earn Rs. 5,000 stay credit.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-3">
          <MessageSquare className="w-8 h-8 text-gold-500" />
          <h3 className="font-heading text-base font-bold">24/7 Concierge Chat</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            Need airport transfer, housekeeping, extra towels, or breakfast? Our team is live on WhatsApp.
          </p>
          <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="block pt-1">
            <Button variant="outline" size="sm" className="w-full">Message Caretaker</Button>
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-3">
          <Sparkles className="w-8 h-8 text-gold-500" />
          <h3 className="font-heading text-base font-bold">Long Stay Privileges</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            Looking to extend for 30+ days? Enjoy fixed monthly rates, complimentary utilities, and priority suites.
          </p>
        </div>
      </div>
    </div>
  );
}

export function GuestBookings() {
  const queryClient = useQueryClient();
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => bookingsApi.getBookings(),
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }) => bookingsApi.cancelBooking(id, reason),
    onSuccess: () => {
      toast.success("Cancellation request processed.");
      setCancelModalBooking(null);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });

  const handleConfirmCancel = () => {
    if (!cancelModalBooking) return;
    cancelMutation.mutate({ id: cancelModalBooking.id, reason: cancelReason });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-ink-100 dark:border-ink-800">
        <div>
          <h2 className="font-heading text-xl font-bold text-ink-900 dark:text-white">
            My Reservations History
          </h2>
          <p className="text-xs text-ink-500">
            View all current, upcoming, and past stays at Zak Residence.
          </p>
        </div>
        <Link to="/apartments">
          <Button variant="gold" size="sm">
            Book New Stay
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-4 hover:border-gold-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    booking.status === "confirmed" || booking.status === "checked_in"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : booking.status === "pending"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-ink-100 text-ink-600"
                  }`}>
                    {booking.status}
                  </span>
                  <span className="text-xs font-mono text-ink-400">#{booking.id}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white mt-1">
                  {booking.apartmentTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateInvoicePDF(booking)}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  Invoice PDF
                </Button>
                {booking.status !== "cancelled" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setCancelModalBooking(booking)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-cream-50/50 dark:bg-ink-800/40 text-xs">
              <div>
                <div className="text-[10px] text-ink-400 uppercase font-bold">Check-In</div>
                <div className="font-semibold text-ink-800 dark:text-white mt-0.5">{formatDate(booking.checkIn)}</div>
              </div>
              <div>
                <div className="text-[10px] text-ink-400 uppercase font-bold">Check-Out</div>
                <div className="font-semibold text-ink-800 dark:text-white mt-0.5">{formatDate(booking.checkOut)}</div>
              </div>
              <div>
                <div className="text-[10px] text-ink-400 uppercase font-bold">Smart Door Code</div>
                <div className="font-mono font-bold text-gold-600 mt-0.5">{booking.doorCode}</div>
              </div>
              <div>
                <div className="text-[10px] text-ink-400 uppercase font-bold">Total Paid</div>
                <div className="font-bold text-ink-900 dark:text-white mt-0.5">{formatPKR(booking.pricing?.grandTotal || booking.totalAmount)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cancellation Modal */}
      <Modal
        isOpen={Boolean(cancelModalBooking)}
        onClose={() => setCancelModalBooking(null)}
        title="Cancel Reservation"
        subtitle={`Booking Ref: ${cancelModalBooking?.id}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-ink-600 dark:text-ink-300">
            According to our policy, free cancellation applies up to 48 hours prior to check-in. Please let us know the reason for cancellation:
          </p>
          <textarea
            rows={3}
            placeholder="Change of travel plans, flight reschedule, etc..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            className="w-full p-3 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-900 dark:text-white"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" size="md" onClick={() => setCancelModalBooking(null)}>
              Keep Booking
            </Button>
            <Button
              variant="danger"
              size="md"
              isLoading={cancelMutation.isPending}
              onClick={handleConfirmCancel}
            >
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function GuestDoorCodes() {
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => bookingsApi.getBookings(),
  });

  const activeStay = bookings.find((b) => b.status === "checked_in" || b.status === "confirmed") || bookings[0];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Door PIN copied to clipboard!");
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gold-50 dark:bg-gold-950/40 text-gold-600 flex items-center justify-center mx-auto shadow-sm">
          <Key className="w-6 h-6" />
        </div>
        <h2 className="font-heading text-2xl font-bold">Your Smart Digital Door Lock PIN</h2>
        <p className="text-xs text-ink-500">
          No keys required. Enter this encrypted PIN on your apartment's smart keypad.
        </p>
      </div>

      {activeStay && (
        <div className="p-8 rounded-3xl bg-cream-50 dark:bg-ink-900 border-2 border-gold-400/50 shadow-lg text-center space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-bold text-gold-700 uppercase tracking-widest">
              {activeStay.apartmentTitle}
            </div>
            <div className="text-xs text-ink-500">{activeStay.locationName}</div>
          </div>

          {/* Large PIN Display */}
          <div className="p-6 rounded-2xl bg-white dark:bg-ink-900 border border-gold-300 shadow-inner inline-block w-full max-w-xs mx-auto">
            <div className="text-[10px] text-ink-400 uppercase font-bold tracking-wider">Access PIN</div>
            <div className="font-mono text-4xl font-extrabold text-ink-900 dark:text-white tracking-widest mt-1">
              {activeStay.doorCode || "9482#"}
            </div>
            <button
              onClick={() => handleCopy(activeStay.doorCode || "9482#")}
              className="mt-3 text-xs font-bold text-gold-600 hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <Copy className="w-3.5 h-3.5" /> Copy PIN
            </button>
          </div>

          <div className="text-xs text-ink-600 dark:text-ink-300 text-left space-y-2 bg-white/60 dark:bg-ink-900/60 p-4 rounded-xl">
            <div className="font-bold text-ink-900 dark:text-white">How to Unlock:</div>
            <div>1. Touch the keypad screen to wake it up.</div>
            <div>2. Enter your {activeStay.doorCode || "9482#"} passcode followed by the <strong>#</strong> symbol.</div>
            <div>3. The lock will beep twice and unlock. Turn the handle downward.</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function GuestWishlist() {
  const { savedApartmentIds, toggleWishlist } = useWishlistStore();
  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const savedList = apartments.filter((a) => savedApartmentIds.includes(a.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-ink-100 dark:border-ink-800">
        <div>
          <h2 className="font-heading text-xl font-bold">Saved Residences ({savedList.length})</h2>
          <p className="text-xs text-ink-500">Your curated luxury wishlist for upcoming trips.</p>
        </div>
      </div>

      {savedList.length === 0 ? (
        <div className="p-12 text-center bg-cream-50 dark:bg-ink-800/40 rounded-3xl border border-dashed border-ink-200">
          <Heart className="w-10 h-10 text-ink-300 mx-auto mb-2" />
          <h3 className="font-heading text-lg font-bold">No saved residences yet</h3>
          <p className="text-xs text-ink-500 mt-1">Tap the heart icon on any apartment to save it here.</p>
          <Link to="/apartments" className="inline-block mt-4">
            <Button variant="gold" size="sm">Browse Apartments</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedList.map((apt) => (
            <div
              key={apt.id}
              className="group bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={apt.coverImage} alt={apt.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleWishlist(apt.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center shadow-md"
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                <h4 className="font-heading text-base font-bold line-clamp-1">{apt.title}</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gold-600 font-bold">{formatPKR(apt.nightlyPrice)}/nt</span>
                  <Link to={`/apartments/${apt.slug || apt.id}`}>
                    <Button variant="gold" size="sm">View Suite</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function GuestProfile() {
  const { user, updateProfile } = useAuthStore();
  const [profile, setProfile] = useState({
    name: user?.name || "Hamza Tariq",
    email: user?.email || "hamza@example.com",
    phone: user?.phone || "+92 300 4589210",
    city: "Lahore",
    cnic: "35202-8391028-1"
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(profile);
    toast.success("Profile details updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="font-heading text-xl font-bold">Resident Profile & Security Clearance</h2>
        <p className="text-xs text-ink-500">Manage your contact information and identity documents.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
          <Input
            label="WhatsApp Number"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
          <Input
            label="Resident City"
            value={profile.city}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
          />
        </div>

        <Input
          label="CNIC or Passport #"
          value={profile.cnic}
          onChange={(e) => setProfile({ ...profile, cnic: e.target.value })}
        />

        <div className="pt-2">
          <ImageUploader
            label="Official Identity Document Photo"
            maxFiles={2}
          />
        </div>

        <Button type="submit" variant="gold" size="md" className="w-full">
          Save Profile Changes
        </Button>
      </form>
    </div>
  );
}

export function GuestTickets() {
  const [messages, setMessages] = useState([
    { sender: "concierge", text: "Hello Hamza! Welcome to Zak Residence. How can our concierge team assist you today?", time: "10:00 AM" },
    { sender: "user", text: "Hi! Could we please have 2 extra Nespresso dark roast capsules and fresh towels?", time: "10:14 AM" },
    { sender: "concierge", text: "Certainly! Housekeeping has been dispatched to your suite and will arrive in 10 minutes. Enjoy your stay!", time: "10:16 AM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg = { sender: "user", text: inputMsg, time: "Just now" };
    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "concierge", text: "Got it! Our on-site manager has received your request and will attend to it shortly.", time: "Just now" }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto flex flex-col h-[480px]">
      <div>
        <h2 className="font-heading text-xl font-bold">24/7 Digital Concierge Live Chat</h2>
        <p className="text-xs text-ink-500">Direct instant messaging with Zak Residence front desk and caretakers.</p>
      </div>

      {/* Messages Window */}
      <div className="flex-1 bg-cream-50/50 dark:bg-ink-800/40 rounded-2xl p-4 overflow-y-auto space-y-3 border border-ink-100 dark:border-ink-800">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.sender === "user"
                  ? "bg-gold-500 text-white rounded-br-xs font-semibold shadow-xs"
                  : "bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 border border-ink-200 dark:border-ink-700 rounded-bl-xs shadow-sm"
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-ink-400 mt-1 px-1">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <Input
          placeholder="Type your message to concierge..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="h-11 text-xs"
        />
        <Button type="submit" variant="gold" size="md" className="shrink-0" rightIcon={<Send className="w-4 h-4" />}>
          Send
        </Button>
      </form>
    </div>
  );
}
