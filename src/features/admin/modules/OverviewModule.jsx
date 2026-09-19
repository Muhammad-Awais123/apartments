import React from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  TrendingUp,
  Building2,
  CalendarCheck,
  UserCheck,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Plus
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Button } from "../../../components/ui/Button";
import { formatPKR, formatDate } from "../../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { bookingsApi, apartmentsApi, leadsApi } from "../../../services/api";

export function OverviewModule() {
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => bookingsApi.getBookings(),
  });

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: () => leadsApi.getLeads(),
  });

  // Calculate KPIs
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + (b.pricing?.grandTotal || b.totalAmount || 0), 0);

  const activeCheckIns = bookings.filter((b) => b.status === "checked_in").length;
  const pendingVerifications = bookings.filter((b) => b.paymentStatus === "pending_verification").length;
  const newLeadsCount = leads.filter((l) => l.stage === "new").length;

  // Monthly Revenue Trend Data for Recharts
  const revenueTrendData = [
    { month: "Apr", revenue: 840000, occupancy: 72 },
    { month: "May", revenue: 1120000, occupancy: 78 },
    { month: "Jun", revenue: 1350000, occupancy: 85 },
    { month: "Jul", revenue: 1280000, occupancy: 82 },
    { month: "Aug", revenue: 1650000, occupancy: 91 },
    { month: "Sep", revenue: 1890000, occupancy: 94 }
  ];

  // Booking Channels Distribution
  const channelData = [
    { name: "Direct Website", value: 45, color: "#C8A24A" },
    { name: "Instagram DMs", value: 25, color: "#E9A24B" },
    { name: "WhatsApp Concierge", value: 20, color: "#12172B" },
    { name: "Corporate Referrals", value: 10, color: "#4658AA" }
  ];

  // Occupancy by Location
  const propertyOccupancy = [
    { name: "Bahria Penthouse", rate: 95 },
    { name: "Johar 2BR Suite", rate: 92 },
    { name: "Sector C 1BR", rate: 88 },
    { name: "Johar Studio", rate: 84 },
    { name: "Bahria 3BR Grand", rate: 90 }
  ];

  return (
    <div className="space-y-8">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white">
            Executive Operations Overview
          </h1>
          <p className="text-xs text-ink-500">
            Real-time occupancy metrics, PKR revenue trends, and guest activity stream.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/bookings">
            <Button variant="gold" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Create Walk-in Booking
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-ink-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue (Sep)</span>
            <div className="w-9 h-9 rounded-xl bg-gold-50 dark:bg-gold-950/40 text-gold-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
            {formatPKR(totalRevenue || 1890000)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-ink-400">
            <span className="text-xs font-bold uppercase tracking-wider">Portfolio Occupancy</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
            87.5%
          </div>
          <div className="text-xs text-ink-500">
            7 of 8 luxury units currently booked
          </div>
        </div>

        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-ink-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Stays & In-House</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
            {activeCheckIns || 4} Suites
          </div>
          <div className="text-xs text-ink-500">
            All door PIN codes verified active
          </div>
        </div>

        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-ink-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Slips & Leads</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-amber-600">
            {pendingVerifications + newLeadsCount} Actions
          </div>
          <div className="text-xs text-ink-500">
            {pendingVerifications} payment slips · {newLeadsCount} new leads
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue & Occupancy Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white">
                Monthly Revenue Performance (PKR)
              </h3>
              <p className="text-xs text-ink-500">6-Month financial progression</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(val) => `Rs. ${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [formatPKR(value), "Gross Revenue"]}
                  contentStyle={{
                    borderRadius: "12px",
                    backgroundColor: "#0B0D12",
                    color: "#fff",
                    border: "none",
                    fontSize: "12px"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C8A24A"
                  strokeWidth={3}
                  fillOpacity={0.15}
                  fill="#C8A24A"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Channels Pie Chart */}
        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4">
          <div>
            <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white">
              Acquisition Channels
            </h3>
            <p className="text-xs text-ink-500">Where guests are finding Zak</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-ink-100 dark:border-ink-800">
            {channelData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-ink-600 dark:text-ink-300 truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Recent Bookings Table */}
      <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold">Recent Booking Activity</h3>
          <Link to="/admin/bookings" className="text-xs text-gold-600 font-bold hover:underline">
            View All Bookings →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-ink-50 dark:bg-ink-800/50 text-ink-500 uppercase font-bold">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Guest Name</th>
                <th className="p-3">Apartment</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-cream-50/40 dark:hover:bg-ink-800/40">
                  <td className="p-3 font-mono font-bold text-gold-600">{b.id}</td>
                  <td className="p-3 font-bold">{b.guestName}</td>
                  <td className="p-3 text-ink-600 dark:text-ink-300">{b.apartmentTitle}</td>
                  <td className="p-3 text-ink-500">{formatDate(b.checkIn)} → {formatDate(b.checkOut)}</td>
                  <td className="p-3 font-bold">{formatPKR(b.pricing?.grandTotal || b.totalAmount)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold-100 text-gold-800">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
