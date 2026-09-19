import React, { useState } from "react";
import {
  CalendarCheck,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  FileText,
  DollarSign
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import { Table } from "../../../components/ui/Table";
import { Modal } from "../../../components/ui/Modal";
import { Badge } from "../../../components/ui/Badge";
import { formatPKR, formatDate } from "../../../lib/utils";
import { generateInvoicePDF } from "../../../lib/pdfGenerator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi, apartmentsApi } from "../../../services/api";
import { toast } from "sonner";

export function BookingsModule() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [walkInModalOpen, setWalkInModalOpen] = useState(false);
  const [verifySlipModalBooking, setVerifySlipModalBooking] = useState(null);

  // Walk-in form state
  const [walkInForm, setWalkInForm] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    guestCnic: "",
    apartmentId: "apt-101",
    checkIn: "2026-09-20",
    checkOut: "2026-09-23",
    adults: 2,
    stayType: "short",
    paymentMethod: "pay_at_checkin"
  });

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", activeTab],
    queryFn: () => bookingsApi.getBookings({ status: activeTab }),
  });

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, paymentStatus }) =>
      bookingsApi.updateBookingStatus(id, { status, paymentStatus }),
    onSuccess: () => {
      toast.success("Booking status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setSelectedBooking(null);
      setVerifySlipModalBooking(null);
    }
  });

  const createWalkInMutation = useMutation({
    mutationFn: (data) => {
      const apt = apartments.find((a) => a.id === data.apartmentId);
      return bookingsApi.createBooking({
        ...data,
        apartmentTitle: apt?.title || "Luxury Suite",
        locationId: apt?.locationId || "bahria-town",
        locationName: apt?.locationName || "Bahria Town Lahore",
        nights: 3,
        totalAmount: (apt?.nightlyPrice || 15000) * 3
      });
    },
    onSuccess: () => {
      toast.success("Walk-in booking created!");
      setWalkInModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });

  const columns = [
    {
      header: "Booking ID",
      accessor: "id",
      sortable: true,
      cell: (row) => <span className="font-mono font-bold text-gold-600">{row.id}</span>
    },
    {
      header: "Guest Details",
      accessor: "guestName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-bold text-ink-900 dark:text-white">{row.guestName}</div>
          <div className="text-[11px] text-ink-400">{row.guestPhone}</div>
        </div>
      )
    },
    {
      header: "Apartment",
      accessor: "apartmentTitle",
      sortable: true,
      cell: (row) => <span className="text-xs font-semibold">{row.apartmentTitle}</span>
    },
    {
      header: "Stay Dates",
      accessor: "checkIn",
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-ink-600 dark:text-ink-300">
          {formatDate(row.checkIn)} → {formatDate(row.checkOut)} ({row.nights}N)
        </span>
      )
    },
    {
      header: "Amount",
      accessor: "totalAmount",
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-ink-900 dark:text-white font-heading">
          {formatPKR(row.pricing?.grandTotal || row.totalAmount)}
        </span>
      )
    },
    {
      header: "Payment",
      accessor: "paymentStatus",
      cell: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
            row.paymentStatus === "paid"
              ? "bg-emerald-50 text-emerald-700"
              : row.paymentStatus === "pending_verification"
              ? "bg-amber-50 text-amber-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {row.paymentStatus}
        </span>
      )
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold-100 text-gold-800">
          {row.status}
        </span>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSelectedBooking(row)}
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => generateInvoicePDF(row)}
            title="Print PDF Invoice"
          >
            <Printer className="w-3.5 h-3.5 text-gold-600" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Bookings & Reservations</h1>
          <p className="text-xs text-ink-500">
            Manage check-in pipelines, verify payment screenshots, and issue PDF invoices.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setWalkInModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create Walk-In / Manual Booking
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["all", "pending", "confirmed", "checked_in", "checked_out", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? "bg-ink-900 text-gold-300 dark:bg-white dark:text-ink-900 shadow-sm"
                : "bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-400 hover:bg-gold-50 border border-ink-100 dark:border-ink-800"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={bookings}
        searchKey="guestName"
        searchPlaceholder="Search by guest name, phone, or ID..."
        exportFileName="Zak_Bookings_Report"
      />

      {/* Inspect / Verify Modal */}
      <Modal
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        title={`Booking #${selectedBooking?.id}`}
        subtitle={`Guest: ${selectedBooking?.guestName} (${selectedBooking?.guestPhone})`}
        size="lg"
      >
        {selectedBooking && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-cream-50 dark:bg-ink-800 text-xs">
              <div>
                <div className="text-ink-400 font-bold uppercase text-[10px]">Apartment</div>
                <div className="font-semibold text-ink-900 dark:text-white mt-0.5">{selectedBooking.apartmentTitle}</div>
              </div>
              <div>
                <div className="text-ink-400 font-bold uppercase text-[10px]">Door Keycode</div>
                <div className="font-mono font-bold text-gold-600 mt-0.5">{selectedBooking.doorCode}</div>
              </div>
              <div>
                <div className="text-ink-400 font-bold uppercase text-[10px]">Dates</div>
                <div className="font-semibold mt-0.5">{formatDate(selectedBooking.checkIn)} → {formatDate(selectedBooking.checkOut)}</div>
              </div>
              <div>
                <div className="text-ink-400 font-bold uppercase text-[10px]">Amount Total</div>
                <div className="font-bold text-gold-600 mt-0.5">{formatPKR(selectedBooking.pricing?.grandTotal || selectedBooking.totalAmount)}</div>
              </div>
            </div>

            {/* Payment Proof Preview if present */}
            {selectedBooking.paymentProofUrl && (
              <div className="p-4 rounded-2xl border border-ink-200 dark:border-ink-700 space-y-2">
                <div className="text-xs font-bold uppercase">Uploaded Payment Slip</div>
                <img
                  src={selectedBooking.paymentProofUrl}
                  alt="Payment slip"
                  className="max-h-48 rounded-xl object-contain bg-black/5"
                />
              </div>
            )}

            {/* Status Change Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-ink-100 dark:border-ink-800">
              <Button
                variant="gold"
                size="sm"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: selectedBooking.id,
                    status: "confirmed",
                    paymentStatus: "paid"
                  })
                }
              >
                Approve & Mark Paid
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: selectedBooking.id,
                    status: "checked_in"
                  })
                }
              >
                Check In Guest
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: selectedBooking.id,
                    status: "checked_out"
                  })
                }
              >
                Check Out Guest
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: selectedBooking.id,
                    status: "cancelled",
                    paymentStatus: "refunded"
                  })
                }
              >
                Cancel / Refund
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Walk-in Modal */}
      <Modal
        isOpen={walkInModalOpen}
        onClose={() => setWalkInModalOpen(false)}
        title="Create Walk-In / Front Desk Reservation"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createWalkInMutation.mutate(walkInForm);
          }}
          className="space-y-4"
        >
          <Input
            label="Guest Full Name"
            value={walkInForm.guestName}
            onChange={(e) => setWalkInForm({ ...walkInForm, guestName: e.target.value })}
            required
          />
          <Input
            label="Phone / WhatsApp"
            value={walkInForm.guestPhone}
            onChange={(e) => setWalkInForm({ ...walkInForm, guestPhone: e.target.value })}
            required
          />
          <Select
            label="Apartment"
            value={walkInForm.apartmentId}
            onChange={(e) => setWalkInForm({ ...walkInForm, apartmentId: e.target.value })}
            options={apartments.map((a) => ({ value: a.id, label: `${a.title} (${formatPKR(a.nightlyPrice)}/nt)` }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              label="Check-In"
              value={walkInForm.checkIn}
              onChange={(e) => setWalkInForm({ ...walkInForm, checkIn: e.target.value })}
            />
            <Input
              type="date"
              label="Check-Out"
              value={walkInForm.checkOut}
              onChange={(e) => setWalkInForm({ ...walkInForm, checkOut: e.target.value })}
            />
          </div>
          <Button type="submit" variant="gold" size="md" className="w-full">
            Confirm Walk-In Booking
          </Button>
        </form>
      </Modal>
    </div>
  );
}
