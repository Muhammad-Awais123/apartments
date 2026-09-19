import React, { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Lock,
  Download,
  Upload,
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Input, Select } from "../../../components/ui/Input";
import { ImageUploader } from "../../../components/ui/ImageUploader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apartmentsApi, bookingsApi } from "../../../services/api";
import { formatPKR, formatDate } from "../../../lib/utils";
import { addDays, format, startOfWeek, isSameDay } from "date-fns";
import { toast } from "sonner";

export function CalendarModule() {
  const queryClient = useQueryClient();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [blockDateModalOpen, setBlockDateModalOpen] = useState(false);
  const [iCalModalOpen, setICalModalOpen] = useState(false);

  const [blockForm, setBlockForm] = useState({
    apartmentId: "apt-101",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    reason: "Owner Private Stay / Routine Maintenance"
  });

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => bookingsApi.getBookings(),
  });

  // 14 days grid view
  const daysList = [...Array(14)].map((_, i) => addDays(currentWeekStart, i));

  const handleNextWeek = () => setCurrentWeekStart((prev) => addDays(prev, 7));
  const handlePrevWeek = () => setCurrentWeekStart((prev) => addDays(prev, -7));

  const handleBlockDates = (e) => {
    e.preventDefault();
    toast.success("Dates successfully blocked for selected apartment.");
    setBlockDateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Occupancy Timeline Calendar</h1>
          <p className="text-xs text-ink-500">
            Visual room availability matrix, drag-to-book, date blocking, and iCal sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setICalModalOpen(true)}
            leftIcon={<Upload className="w-3.5 h-3.5" />}
          >
            iCal Sync (Airbnb / Booking.com)
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => setBlockDateModalOpen(true)}
            leftIcon={<Lock className="w-3.5 h-3.5" />}
          >
            Block Dates
          </Button>
        </div>
      </div>

      {/* Navigation & Date Strip Controls */}
      <div className="bg-white dark:bg-ink-900 p-4 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" onClick={handlePrevWeek}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-heading text-sm font-bold px-2">
            {format(currentWeekStart, "MMM d")} – {format(addDays(currentWeekStart, 13), "MMM d, yyyy")}
          </span>
          <Button variant="outline" size="icon-sm" onClick={handleNextWeek}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-gold-500" />
            <span>Booked / Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span>Blocked / Maintenance</span>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Matrix Table */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-ink-100 dark:border-ink-800 bg-cream-50/50 dark:bg-ink-800/40">
              <th className="p-4 text-xs font-bold uppercase w-64 text-ink-700 dark:text-ink-300">
                Apartment Suite
              </th>
              {daysList.map((day) => (
                <th key={day.toISOString()} className="p-2 text-center text-xs border-l border-ink-100 dark:border-ink-800 min-w-[48px]">
                  <div className="text-[10px] text-ink-400 uppercase">{format(day, "EEE")}</div>
                  <div className="font-bold text-ink-900 dark:text-white">{format(day, "d")}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800 text-xs">
            {apartments.map((apt) => (
              <tr key={apt.id} className="hover:bg-gold-50/20">
                <td className="p-4 font-semibold text-ink-900 dark:text-white">
                  <div className="font-bold truncate max-w-[200px]">{apt.title}</div>
                  <div className="text-[10px] text-gold-600 uppercase font-medium">{apt.locationName}</div>
                </td>

                {daysList.map((day, dIdx) => {
                  // Mock booking occupancy state
                  const isBooked = (dIdx + parseInt(apt.id.slice(-1))) % 3 === 0;
                  const isMaintenance = dIdx === 6 && apt.id === "apt-104";

                  return (
                    <td
                      key={day.toISOString()}
                      className="p-1.5 border-l border-ink-100 dark:border-ink-800 text-center"
                    >
                      {isMaintenance ? (
                        <div
                          className="h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold"
                          title="Blocked: Maintenance"
                        >
                          Maint
                        </div>
                      ) : isBooked ? (
                        <div
                          className="h-10 rounded-xl bg-gold-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs truncate px-1 cursor-pointer"
                          title="Occupied by Guest"
                        >
                          Booked
                        </div>
                      ) : (
                        <div
                          className="h-10 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 flex items-center justify-center text-[10px] font-semibold cursor-pointer transition-colors"
                          title="Available - Click to create walk-in"
                        >
                          {formatPKR(apt.nightlyPrice).replace("Rs. ", "")}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Block Dates Modal */}
      <Modal
        isOpen={blockDateModalOpen}
        onClose={() => setBlockDateModalOpen(false)}
        title="Block Dates for Maintenance or Private Use"
        size="md"
      >
        <form onSubmit={handleBlockDates} className="space-y-4">
          <Select
            label="Apartment"
            value={blockForm.apartmentId}
            onChange={(e) => setBlockForm({ ...blockForm, apartmentId: e.target.value })}
            options={apartments.map((a) => ({ value: a.id, label: a.title }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              label="Start Date"
              value={blockForm.startDate}
              onChange={(e) => setBlockForm({ ...blockForm, startDate: e.target.value })}
            />
            <Input
              type="date"
              label="End Date"
              value={blockForm.endDate}
              onChange={(e) => setBlockForm({ ...blockForm, endDate: e.target.value })}
            />
          </div>
          <Input
            label="Reason for Date Lock"
            value={blockForm.reason}
            onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
          />
          <Button type="submit" variant="gold" size="md" className="w-full">
            Lock Selected Dates
          </Button>
        </form>
      </Modal>

      {/* iCal Sync Modal */}
      <Modal
        isOpen={iCalModalOpen}
        onClose={() => setICalModalOpen(false)}
        title="iCalendar (iCal) Channel Synchronization"
        subtitle="Export Zak calendar feeds or import Airbnb & Booking.com availability feeds."
        size="lg"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-ink-800 space-y-2">
            <div className="font-bold text-gold-700 uppercase">Export Feeds (iCal URL)</div>
            <p className="text-ink-600 dark:text-ink-300">
              Copy this link into your Airbnb or Booking.com calendar sync settings to prevent double bookings:
            </p>
            <div className="p-2.5 bg-white dark:bg-ink-900 rounded-xl border border-ink-200 dark:border-ink-700 font-mono text-[11px] text-ink-800 dark:text-white truncate">
              https://api.zakresidence.com/ical/feed/zak-all-apartments.ics?token=zak_live_894102948
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold uppercase text-ink-600">Import External Channel Feed URL</label>
            <Input
              placeholder="https://airbnb.com/calendar/ical/123456.ics"
              className="text-xs"
            />
          </div>

          <Button
            variant="gold"
            size="md"
            className="w-full"
            onClick={() => {
              toast.success("External iCal feed synchronized successfully!");
              setICalModalOpen(false);
            }}
          >
            Sync Channel Feeds Now
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export function ApartmentsModule() {
  const queryClient = useQueryClient();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingApt, setEditingApt] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    locationId: "bahria-town",
    locationName: "Bahria Town Lahore",
    address: "",
    type: "2 Bedroom Suite",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    areaSqFt: 1200,
    nightlyPrice: 16000,
    monthlyPrice: 240000,
    weekendPrice: 18500,
    status: "available",
    description: "",
    images: []
  });

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => apartmentsApi.createApartment(data),
    onSuccess: () => {
      toast.success("Apartment created successfully!");
      setCreateModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => apartmentsApi.updateApartment(id, data),
    onSuccess: () => {
      toast.success("Apartment updated successfully!");
      setEditingApt(null);
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apartmentsApi.deleteApartment(id),
    onSuccess: () => {
      toast.success("Apartment removed from portfolio.");
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    }
  });

  const handleOpenEdit = (apt) => {
    setEditingApt(apt);
    setFormData({
      ...apt,
      images: apt.images || []
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Apartments & Suites Portfolio</h1>
          <p className="text-xs text-ink-500">
            Manage apartment pricing rules, photos, amenities, and maintenance status.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => {
            setFormData({
              title: "",
              locationId: "bahria-town",
              locationName: "Bahria Town Lahore",
              address: "",
              type: "2 Bedroom Suite",
              bedrooms: 2,
              bathrooms: 2,
              maxGuests: 4,
              areaSqFt: 1200,
              nightlyPrice: 16000,
              monthlyPrice: 240000,
              weekendPrice: 18500,
              status: "available",
              description: "",
              images: []
            });
            setCreateModalOpen(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Apartment
        </Button>
      </div>

      {/* Grid of Portfolio Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={apt.coverImage} alt={apt.title} className="w-full h-full object-cover" />
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shadow-xs ${
                apt.status === "available" ? "bg-emerald-500 text-white" : "bg-gold-500 text-white"
              }`}>
                {apt.status}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-gold-600 uppercase font-bold">{apt.locationName}</span>
                <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white line-clamp-1">
                  {apt.title}
                </h3>
                <p className="text-xs text-ink-500 line-clamp-2 mt-1">{apt.description}</p>
              </div>

              <div className="pt-3 border-t border-ink-100 dark:border-ink-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-ink-500">Nightly Rate:</span>
                  <span className="font-bold text-gold-600">{formatPKR(apt.nightlyPrice)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-ink-500">Monthly Lease:</span>
                  <span className="font-bold text-ink-900 dark:text-white">{formatPKR(apt.monthlyPrice)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleOpenEdit(apt)}
                >
                  Edit Apartment
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteMutation.mutate(apt.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={createModalOpen || Boolean(editingApt)}
        onClose={() => {
          setCreateModalOpen(false);
          setEditingApt(null);
        }}
        title={editingApt ? `Edit ${editingApt.title}` : "Add New Apartment Suite"}
        size="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editingApt) {
              updateMutation.mutate({ id: editingApt.id, data: formData });
            } else {
              createMutation.mutate(formData);
            }
          }}
          className="space-y-4"
        >
          <Input
            label="Suite Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Location"
              value={formData.locationId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  locationId: e.target.value,
                  locationName: e.target.value === "bahria-town" ? "Bahria Town Lahore" : "Johar Town Lahore"
                })
              }
              options={[
                { value: "bahria-town", label: "Bahria Town Lahore" },
                { value: "johar-town", label: "Johar Town Lahore" }
              ]}
            />
            <Input
              label="Physical Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              label="Nightly Price (PKR)"
              value={formData.nightlyPrice}
              onChange={(e) => setFormData({ ...formData, nightlyPrice: Number(e.target.value) })}
              required
            />
            <Input
              type="number"
              label="Monthly Price (PKR)"
              value={formData.monthlyPrice}
              onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
              required
            />
            <Input
              type="number"
              label="Weekend Price (PKR)"
              value={formData.weekendPrice}
              onChange={(e) => setFormData({ ...formData, weekendPrice: Number(e.target.value) })}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              label="Bedrooms"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
            />
            <Input
              type="number"
              label="Bathrooms"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
            />
            <Input
              type="number"
              label="Max Guests"
              value={formData.maxGuests}
              onChange={(e) => setFormData({ ...formData, maxGuests: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase">Suite Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
            />
          </div>

          {/* Image Uploader */}
          <ImageUploader
            images={formData.images}
            onChange={(imgs) => setFormData({ ...formData, images: imgs })}
            label="Apartment High-Resolution Gallery"
          />

          <Button type="submit" variant="gold" size="md" className="w-full">
            {editingApt ? "Save Apartment Updates" : "Publish Apartment to Portfolio"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
