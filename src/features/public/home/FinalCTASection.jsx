import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Heart,
  MessageCircle,
  ExternalLink,
  Building,
  Key,
  TrendingUp,
  CheckCircle2,
  Phone,
  ArrowRight
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import { luxuryImages } from "../../../config/images";
import { siteConfig } from "../../../config/site";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { leadsApi } from "../../../services/api";

export function InstagramFeedSection() {
  const posts = luxuryImages.instagramFeed;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-ink-900 border-t border-ink-100 dark:border-ink-800">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Instagram className="w-3.5 h-3.5" />
              Social Community
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white mt-1">
              Follow Us @zak_residence
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="sm" leftIcon={<Instagram className="w-4 h-4 text-pink-500" />}>
                Follow on Instagram
              </Button>
            </a>
            <a
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="sm" leftIcon={<Facebook className="w-4 h-4 text-blue-600" />}>
                Join on Facebook
              </Button>
            </a>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-ink-100 dark:bg-ink-800 block shadow-sm hover:shadow-luxury"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-ink-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-3 text-white text-center gap-2">
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </span>
                </div>
                <p className="text-[10px] text-ink-200 line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerSection() {
  const [partnerForm, setPartnerForm] = useState({
    ownerName: "",
    phone: "",
    email: "",
    propertyLocation: "Bahria Town Lahore",
    bedrooms: "2",
    propertyStatus: "Furnished",
    notes: ""
  });

  const partnerLeadMutation = useMutation({
    mutationFn: (data) =>
      leadsApi.createLead({
        name: data.ownerName,
        phone: data.phone,
        email: data.email,
        channel: "website",
        stayType: "long",
        preferredLocation: data.propertyLocation.toLowerCase().includes("bahria") ? "bahria-town" : "johar-town",
        bedrooms: Number(data.bedrooms),
        budgetPKR: "Property Management Agreement",
        notes: `Property Owner Partnership Inquiry: ${data.propertyStatus} ${data.bedrooms}BR in ${data.propertyLocation}. Notes: ${data.notes}`
      }),
    onSuccess: () => {
      toast.success("Thank you! Our property acquisition team will contact you within 24 hours.");
      setPartnerForm({
        ownerName: "",
        phone: "",
        email: "",
        propertyLocation: "Bahria Town Lahore",
        bedrooms: "2",
        propertyStatus: "Furnished",
        notes: ""
      });
    }
  });

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (!partnerForm.ownerName || !partnerForm.phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    partnerLeadMutation.mutate(partnerForm);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50/50 dark:bg-ink-950">
      <div className="max-w-7xl mx-auto">
        <div className="bg-ink-900 rounded-3xl p-8 sm:p-12 border border-gold-500/30 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Left Value Proposition */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                Property Owners & Investors
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold leading-tight">
                Turn Your Apartment into a High-Yield Luxury Serviced Rental
              </h2>
              <p className="text-xs sm:text-sm text-ink-200 leading-relaxed">
                Do you own an apartment or penthouse in Bahria Town, Johar Town, Gulberg, or DHA Lahore? Partner with Zak Residence for complete hands-free property management, professional interior styling, and maximized rental yields.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Up to 2.5x higher revenue compared to conventional long leases</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>100% turnkey: marketing, 5-star housekeeping, and guest screening</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Transparent monthly P&L statements & timely automated bank payouts</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="bg-white text-ink-900 rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-heading text-lg font-bold mb-1">
                List Your Property with Zak
              </h3>
              <p className="text-xs text-ink-500 mb-5">
                Submit your apartment details for a complimentary rental valuation.
              </p>

              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    placeholder="e.g. M. Usman Khan"
                    value={partnerForm.ownerName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, ownerName: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone / WhatsApp"
                    placeholder="+92 300 1234567"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Location"
                    value={partnerForm.propertyLocation}
                    onChange={(e) => setPartnerForm({ ...partnerForm, propertyLocation: e.target.value })}
                    options={[
                      { value: "Bahria Town Lahore", label: "Bahria Town Lahore" },
                      { value: "Johar Town Lahore", label: "Johar Town Lahore" },
                      { value: "Gulberg Lahore", label: "Gulberg Lahore" },
                      { value: "DHA Lahore", label: "DHA Lahore" }
                    ]}
                  />
                  <Select
                    label="Bedrooms"
                    value={partnerForm.bedrooms}
                    onChange={(e) => setPartnerForm({ ...partnerForm, bedrooms: e.target.value })}
                    options={[
                      { value: "1", label: "1 Bedroom" },
                      { value: "2", label: "2 Bedrooms" },
                      { value: "3", label: "3 Bedrooms" },
                      { value: "4", label: "Penthouse / 4+ Bed" }
                    ]}
                  />
                </div>

                <Input
                  label="Any Specific Notes (Optional)"
                  placeholder="e.g. Furnished status, building name, floor level..."
                  value={partnerForm.notes}
                  onChange={(e) => setPartnerForm({ ...partnerForm, notes: e.target.value })}
                />

                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full"
                  isLoading={partnerLeadMutation.isPending}
                >
                  Request Property Valuation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-ink-900 border-t border-ink-100 dark:border-ink-800">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-ink-900 dark:text-white">
            Ready to Experience Lahore in Unmatched Luxury?
          </h2>
          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 max-w-2xl mx-auto">
            Book online in seconds, or speak directly with our private concierge team on WhatsApp for custom stay dates, VIP requests, and long-stay packages.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={siteConfig.socialLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="gold"
              size="lg"
              leftIcon={<Phone className="w-4 h-4" />}
            >
              Chat Directly on WhatsApp
            </Button>
          </a>
          <a href={`tel:${siteConfig.phone}`}>
            <Button
              variant="dark"
              size="lg"
              leftIcon={<Phone className="w-4 h-4" />}
            >
              Call Concierge: {siteConfig.phone}
            </Button>
          </a>
        </div>

        <p className="text-xs text-ink-400">
          Instant booking confirmation · 24/7 Smart Keyless Entry · 100% Loadshedding Backup
        </p>
      </div>
    </section>
  );
}
