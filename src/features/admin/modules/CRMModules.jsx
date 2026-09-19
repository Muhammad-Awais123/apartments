import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Tag,
  Star,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  Plus,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import { Table } from "../../../components/ui/Table";
import { Modal } from "../../../components/ui/Modal";
import { Rating } from "../../../components/ui/Rating";
import { formatPKR, formatDate } from "../../../lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { guestsApi, leadsApi, reviewsApi } from "../../../services/api";
import { toast } from "sonner";

export function GuestsCRMModule() {
  const [selectedGuest, setSelectedGuest] = useState(null);

  const { data: guests = [] } = useQuery({
    queryKey: ["guests"],
    queryFn: () => guestsApi.getGuests(),
  });

  const columns = [
    {
      header: "Guest Name",
      accessor: "name",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover border border-gold-400"
          />
          <div>
            <div className="font-bold text-ink-900 dark:text-white">{row.name}</div>
            <div className="text-[11px] text-ink-400">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: "Phone / WhatsApp",
      accessor: "phone",
      cell: (row) => <span className="font-mono text-xs">{row.phone}</span>
    },
    {
      header: "City / Country",
      accessor: "city",
      sortable: true,
      cell: (row) => <span className="text-xs">{row.city}, {row.country}</span>
    },
    {
      header: "Total Stays",
      accessor: "totalBookings",
      sortable: true,
      cell: (row) => <span className="font-bold">{row.totalBookings} Stays</span>
    },
    {
      header: "Lifetime Value",
      accessor: "totalSpent",
      sortable: true,
      cell: (row) => <span className="font-bold text-gold-600 font-heading">{formatPKR(row.totalSpent)}</span>
    },
    {
      header: "Tags",
      accessor: "tags",
      cell: (row) => (
        <div className="flex gap-1 flex-wrap">
          {row.tags?.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gold-100 text-gold-800">
              {t}
            </span>
          ))}
        </div>
      )
    },
    {
      header: "Action",
      cell: (row) => (
        <Button variant="outline" size="sm" onClick={() => setSelectedGuest(row)}>
          View CRM Profile
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Guests & Residents CRM</h1>
          <p className="text-xs text-ink-500">
            Track lifetime spend, VIP tags, preferences, and identity document archives.
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        data={guests}
        searchKey="name"
        searchPlaceholder="Search guests by name, email, or city..."
        exportFileName="Zak_Guests_CRM"
      />

      {/* Guest Detail CRM Modal */}
      <Modal
        isOpen={Boolean(selectedGuest)}
        onClose={() => setSelectedGuest(null)}
        title={selectedGuest?.name}
        subtitle={`${selectedGuest?.city}, ${selectedGuest?.country} · ${selectedGuest?.phone}`}
        size="md"
      >
        {selectedGuest && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-cream-50 dark:bg-ink-800">
              <div>
                <div className="text-ink-400 font-bold uppercase text-[10px]">Lifetime Spend</div>
                <div className="font-heading text-base font-bold text-gold-600">{formatPKR(selectedGuest.totalSpent)}</div>
              </div>
              <div>
                <div className="text-ink-400 font-bold uppercase text-[10px]">CNIC / Passport</div>
                <div className="font-semibold text-ink-900 dark:text-white">{selectedGuest.cnic}</div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase text-ink-600">Concierge Notes & Resident Preferences</label>
              <p className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800 text-ink-700 dark:text-ink-300">
                {selectedGuest.notes}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <a
                href={`https://wa.me/${selectedGuest.phone?.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="gold" size="sm" leftIcon={<Phone className="w-3.5 h-3.5" />}>
                  WhatsApp Guest
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function LeadsKanbanModule() {
  const queryClient = useQueryClient();
  const [createLeadModalOpen, setCreateLeadModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    channel: "instagram",
    stayType: "short",
    preferredLocation: "bahria-town",
    bedrooms: 2,
    budgetPKR: "25,000 / nt",
    notes: ""
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: () => leadsApi.getLeads(),
  });

  const updateStageMutation = useMutation({
    mutationFn: ({ id, stage }) => leadsApi.updateLeadStage(id, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    }
  });

  const createLeadMutation = useMutation({
    mutationFn: (data) => leadsApi.createLead(data),
    onSuccess: () => {
      toast.success("Lead created in pipeline!");
      setCreateLeadModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    }
  });

  const columns = [
    { id: "new", label: "New Inquiries", color: "border-blue-500" },
    { id: "contacted", label: "Contacted / WhatsApp", color: "border-amber-500" },
    { id: "visit_scheduled", label: "Visit Scheduled", color: "border-purple-500" },
    { id: "negotiation", label: "Negotiation / Lease Draft", color: "border-sky-500" },
    { id: "won", label: "Won (Booked)", color: "border-emerald-500" },
    { id: "lost", label: "Lost", color: "border-red-400" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Leads & Inquiries Pipeline</h1>
          <p className="text-xs text-ink-500">
            Instagram, Facebook DMs, WhatsApp, and Website booking requests Kanban.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setCreateLeadModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Inquiry Lead
        </Button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colLeads = leads.filter((l) => l.stage === col.id);

          return (
            <div
              key={col.id}
              className="bg-cream-50/50 dark:bg-ink-900/60 rounded-3xl p-3.5 border border-ink-100 dark:border-ink-800 flex flex-col min-w-[240px] space-y-3"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-2">
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-ink-800 dark:text-white">
                  {col.label}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-ink-200 dark:bg-ink-800">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[65vh]">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-xs space-y-2.5 hover:shadow-md transition-all text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink-900 dark:text-white truncate max-w-[140px]">
                        {lead.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-gold-50 text-gold-700">
                        {lead.channel}
                      </span>
                    </div>

                    <p className="text-[11px] text-ink-500 leading-tight line-clamp-2">
                      {lead.notes}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-ink-400 pt-1 border-t border-ink-100 dark:border-ink-800">
                      <span>{lead.budgetPKR}</span>
                      <a
                        href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gold-600 font-bold hover:underline"
                      >
                        WhatsApp →
                      </a>
                    </div>

                    {/* Quick Move Trigger */}
                    <div className="pt-1 flex gap-1">
                      <select
                        value={lead.stage}
                        onChange={(e) => updateStageMutation.mutate({ id: lead.id, stage: e.target.value })}
                        className="w-full text-[10px] p-1 bg-ink-50 dark:bg-ink-800 rounded border border-ink-200 dark:border-ink-700"
                      >
                        {columns.map((c) => (
                          <option key={c.id} value={c.id}>Move: {c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      <Modal
        isOpen={createLeadModalOpen}
        onClose={() => setCreateLeadModalOpen(false)}
        title="Add New Inquiry Lead"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createLeadMutation.mutate(newLeadForm);
          }}
          className="space-y-4"
        >
          <Input
            label="Inquirer Name"
            value={newLeadForm.name}
            onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
            required
          />
          <Input
            label="Phone / WhatsApp"
            value={newLeadForm.phone}
            onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Acquisition Channel"
              value={newLeadForm.channel}
              onChange={(e) => setNewLeadForm({ ...newLeadForm, channel: e.target.value })}
              options={[
                { value: "instagram", label: "Instagram DM" },
                { value: "facebook", label: "Facebook" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "website", label: "Website Form" },
                { value: "referral", label: "Referral" }
              ]}
            />
            <Select
              label="Stay Type"
              value={newLeadForm.stayType}
              onChange={(e) => setNewLeadForm({ ...newLeadForm, stayType: e.target.value })}
              options={[
                { value: "short", label: "Short Stay" },
                { value: "long", label: "Monthly Lease" }
              ]}
            />
          </div>
          <Input
            label="Inquiry Notes & Special Demands"
            value={newLeadForm.notes}
            onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
          />
          <Button type="submit" variant="gold" size="md" className="w-full">
            Save Lead to Pipeline
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export function CommunicationModule() {
  const [selectedTemplate, setSelectedTemplate] = useState("booking_confirmation");
  const [guestPhone, setGuestPhone] = useState("+923004589210");
  const [guestName, setGuestName] = useState("Hamza Tariq");

  const templates = {
    booking_confirmation: {
      title: "Booking Confirmation & Welcome",
      text: `Hello ${guestName}, thank you for choosing Zak Residence Lahore! Your reservation is confirmed. Your check-in time is 2:00 PM. We look forward to hosting you in Bahria Town.`
    },
    door_code: {
      title: "Smart Door Lock PIN & Directions",
      text: `Dear ${guestName}, your suite is ready! Your keyless digital door PIN is *9482#*. Tap the keypad, enter code, and turn the handle. Free WiFi: Zak_Luxury_5G / pass: zakresidence2026.`
    },
    payment_reminder: {
      title: "Payment Transfer Reminder",
      text: `Assalam o Alaikum ${guestName}, this is a gentle reminder regarding your upcoming stay balance of Rs. 38,880. Please send the IBFT screenshot to this number to secure your suite.`
    },
    review_request: {
      title: "Post-Stay Review Request",
      text: `Dear ${guestName}, we hope you enjoyed your stay at Zak Residence! We would love to hear your feedback. Please take 1 minute to leave a review at https://zakresidence.com/reviews.`
    }
  };

  const currentTemplate = templates[selectedTemplate];

  const handleLaunchWhatsApp = () => {
    const cleanPhone = guestPhone.replace(/[^0-9]/g, "");
    const encoded = encodeURIComponent(currentTemplate.text);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, "_blank");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold">WhatsApp & Guest Communication Center</h1>
        <p className="text-xs text-ink-500">
          Click-to-chat automated templates for door codes, booking confirmations, and payment reminders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="space-y-2">
          {Object.entries(templates).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`w-full p-4 rounded-2xl text-left text-xs font-bold transition-all border ${
                selectedTemplate === key
                  ? "bg-gold-500 text-white font-bold border-gold-500 shadow-sm shadow-gold-500/20"
                  : "bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-300 border-ink-100 dark:border-ink-800 hover:bg-gold-50"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Editor & Preview */}
        <div className="md:col-span-2 bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Recipient Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <Input
              label="Recipient WhatsApp #"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-bold uppercase text-ink-600">WhatsApp Message Content</label>
            <textarea
              rows={5}
              value={currentTemplate.text}
              readOnly
              className="w-full p-3 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 font-mono"
            />
          </div>

          <Button
            variant="gold"
            size="md"
            className="w-full"
            onClick={handleLaunchWhatsApp}
            leftIcon={<MessageSquare className="w-4 h-4" />}
          >
            Launch WhatsApp Chat with Message
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ReviewsModerationModule() {
  const queryClient = useQueryClient();
  const [replyModalReview, setReplyModalReview] = useState(null);
  const [replyText, setReplyText] = useState("");

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => reviewsApi.getReviews(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => reviewsApi.updateReviewStatus(id, status),
    onSuccess: () => {
      toast.success("Review status updated!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    }
  });

  const replyMutation = useMutation({
    mutationFn: ({ id, replyText }) => reviewsApi.replyToReview(id, replyText),
    onSuccess: () => {
      toast.success("Owner response published!");
      setReplyModalReview(null);
      setReplyText("");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Guest Reviews & Moderation</h1>
        <p className="text-xs text-ink-500">
          Approve public testimonials, publish official owner responses, and feature top reviews.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                  alt={rev.guestName}
                  className="w-10 h-10 rounded-full object-cover border border-gold-400"
                />
                <div>
                  <div className="font-bold text-ink-900 dark:text-white">{rev.guestName}</div>
                  <div className="text-[11px] text-ink-400">{rev.apartmentTitle} · {rev.stayDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Rating value={rev.rating} size="sm" showNumber={false} />
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  rev.status === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}>
                  {rev.status}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold">"{rev.title}"</h4>
              <p className="text-xs text-ink-600 dark:text-ink-300 mt-1">{rev.comment}</p>
            </div>

            {/* Owner Reply if present */}
            {rev.ownerReply && (
              <div className="p-3 bg-cream-50 dark:bg-ink-800 rounded-xl text-xs space-y-1 border-l-2 border-gold-500">
                <span className="font-bold text-gold-700">Owner Response ({rev.ownerReply.date}):</span>
                <p className="text-ink-600 dark:text-ink-300 italic">"{rev.ownerReply.text}"</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-ink-100 dark:border-ink-800">
              {rev.status !== "approved" && (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => updateStatusMutation.mutate({ id: rev.id, status: "approved" })}
                >
                  Approve Review
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyModalReview(rev)}
              >
                Reply as Owner
              </Button>
              {rev.status !== "rejected" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => updateStatusMutation.mutate({ id: rev.id, status: "rejected" })}
                >
                  Reject
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      <Modal
        isOpen={Boolean(replyModalReview)}
        onClose={() => setReplyModalReview(null)}
        title={`Reply to ${replyModalReview?.guestName}`}
        size="md"
      >
        <div className="space-y-4">
          <textarea
            rows={4}
            placeholder="Write official courteous reply from Zak Residence Management..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-3 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setReplyModalReview(null)}>
              Cancel
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={() => replyMutation.mutate({ id: replyModalReview.id, replyText })}
            >
              Publish Response
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
