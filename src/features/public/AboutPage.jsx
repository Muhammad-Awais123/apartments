import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  User,
  ArrowRight
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input, Select } from "../../components/ui/Input";
import { SEOHelmet } from "../../components/common/SEOHelmet";
import { siteConfig } from "../../config/site";
import { luxuryImages } from "../../config/images";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { leadsApi } from "../../services/api";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-ink-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title="About Zak Residence | Boutique Luxury Living in Lahore"
        description="Learn about Zak Residence's mission to redefine luxury serviced apartment hospitality in Lahore, Pakistan."
      />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Story & Philosophy
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-ink-900 dark:text-white leading-tight">
            Redefining Luxury Serviced Living in Pakistan
          </h1>
          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed">
            Zak Residence was born with a single vision: to elevate executive accommodation in Lahore by blending the intimacy, warmth, and space of private homes with the flawless service standards of five-star boutique hotels.
          </p>
        </div>

        {/* Feature Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <img
              src={luxuryImages.aboutHero}
              alt="Zak Residence Interior"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white">
              The "LIVE · STAY · FEEL HOME" Promise
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              We realized that traditional hotel rooms in Pakistan often feel restrictive, impersonal, and overly commercial, while standard rental properties lack consistent housekeeping, smart keyless security, and dependable power backup during load-shedding.
            </p>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              At Zak Residence, every square foot is curated with bespoke timber furnishings, 100% solar and industrial generator power backup, 200 Mbps fiber connectivity, and a 24/7 digital concierge team at your service on WhatsApp.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cream-50 dark:bg-ink-900 border border-ink-100 dark:border-ink-800">
                <ShieldCheck className="w-6 h-6 text-gold-500 mb-2" />
                <h4 className="font-bold text-xs text-ink-900 dark:text-white">24/7 Gated Security</h4>
                <p className="text-[11px] text-ink-500 mt-1">Complete privacy with smart door keypads.</p>
              </div>
              <div className="p-4 rounded-2xl bg-cream-50 dark:bg-ink-900 border border-ink-100 dark:border-ink-800">
                <Award className="w-6 h-6 text-gold-500 mb-2" />
                <h4 className="font-bold text-xs text-ink-900 dark:text-white">5-Star Standards</h4>
                <p className="text-[11px] text-ink-500 mt-1">Sanitized linens, plush towels & amenities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "general",
    message: ""
  });

  const contactLeadMutation = useMutation({
    mutationFn: (data) =>
      leadsApi.createLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        channel: "website",
        stayType: "short",
        notes: `Contact Inquiries [${data.topic.toUpperCase()}]: ${data.message}`
      }),
    onSuccess: () => {
      toast.success("Thank you! Our concierge will get back to you shortly.");
      setFormState({ name: "", email: "", phone: "", topic: "general", message: "" });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.message) {
      toast.error("Please fill in your name, phone number, and message.");
      return;
    }
    contactLeadMutation.mutate(formState);
  };

  return (
    <div className="min-h-screen bg-cream-50/40 dark:bg-ink-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title="Contact Concierge | Zak Residence Lahore"
        description="Get in touch with Zak Residence for apartment bookings, monthly leases, corporate partnerships, or WhatsApp inquiries in Lahore."
      />

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            24/7 Guest Relations
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-ink-900 dark:text-white">
            We’re Here to Assist You
          </h1>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            Reach out via WhatsApp, phone, or send an inquiry below. We respond in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details & Direct Actions */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4">
              <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs">
                <a
                  href={siteConfig.socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="font-bold">WhatsApp Concierge</div>
                    <div className="text-[11px] text-emerald-700">{siteConfig.phone} (Instant Reply)</div>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">Email Inquiries</div>
                    <div className="text-ink-500">{siteConfig.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">Locations</div>
                    <div className="text-ink-500">Bahria Town Sector C & Johar Town Block G3, Lahore</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">Concierge Hours</div>
                    <div className="text-ink-500">24/7 Digital Support & On-Site Caretakers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-2 bg-white dark:bg-ink-900 p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-ink-900 dark:text-white mb-2">
              Send an Online Inquiry
            </h3>
            <p className="text-xs text-ink-500 mb-6">
              Fill in your contact details and our team will get back to you with custom rates and availability.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="e.g. Bilal Khan"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                />
                <Input
                  label="Phone / WhatsApp"
                  placeholder="+92 300 1234567"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
                <Select
                  label="Inquiry Topic"
                  value={formState.topic}
                  onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                  options={[
                    { value: "general", label: "General Reservation Inquiry" },
                    { value: "long_stay", label: "Monthly Long-Stay Lease" },
                    { value: "corporate", label: "Corporate Business Account" },
                    { value: "partner", label: "Property Owner Partnership" }
                  ]}
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300">
                  Your Message & Preferred Dates
                </label>
                <textarea
                  rows={4}
                  placeholder="Let us know your stay dates, preferred location, number of guests, or special requirements..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full p-3 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-white focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="md"
                className="w-full"
                isLoading={contactLeadMutation.isPending}
                rightIcon={<Send className="w-4 h-4" />}
              >
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogPage() {
  const blogs = luxuryImages.blogs;

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title="Lahore Travel & Living Guide | Zak Residence Blog"
        description="Insider articles, Bahria Town food guides, and serviced apartment insights in Lahore, Pakistan."
      />

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <span>Travel & Living Guide</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-ink-900 dark:text-white">
            Lahore City Insights & Guides
          </h1>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            Curated tips for exploring the best dining, shopping, and destinations around Bahria Town and Johar Town.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="group bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between"
            >
              <div className="aspect-[16/10] bg-ink-100 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-ink-400 font-semibold">
                    <span className="text-gold-600 uppercase">{b.category}</span>
                    <span>{b.readTime}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white group-hover:text-gold-600 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-ink-500 leading-relaxed line-clamp-3">
                    {b.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between text-xs">
                  <span className="text-ink-400">{b.date}</span>
                  <span className="text-gold-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LegalPage({ title, lastUpdated = "September 2026", content }) {
  return (
    <div className="min-h-screen bg-cream-50/40 dark:bg-ink-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet title={title} description={`${title} for Zak Residence Lahore.`} />
      <div className="max-w-4xl mx-auto bg-white dark:bg-ink-900 p-8 sm:p-12 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-6 text-ink-800 dark:text-ink-200">
        <div className="border-b border-ink-100 dark:border-ink-800 pb-4">
          <h1 className="font-heading text-3xl font-bold text-ink-900 dark:text-white">{title}</h1>
          <p className="text-xs text-ink-400 mt-1">Last Updated: {lastUpdated} · Zak Residence Pvt. Ltd.</p>
        </div>
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-gold-50 dark:bg-gold-950/40 text-gold-600 flex items-center justify-center mx-auto text-3xl font-bold font-heading">
        404
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="font-heading text-3xl font-bold text-ink-900 dark:text-white">
          Suite or Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-ink-500">
          The page you are looking for might have been moved or does not exist.
        </p>
      </div>
      <Link to="/">
        <Button variant="gold" size="md">
          Return to Zak Residence Home
        </Button>
      </Link>
    </div>
  );
}
