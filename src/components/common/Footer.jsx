import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Send,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { siteConfig } from "../../config/site";
import { toast } from "sonner";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you for subscribing to Zak Residence insider privileges!");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-ink-900 text-cream-100 border-t border-gold-500/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background Decorative Gold Light Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-deepNavy/80 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-ink-800">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo.svg"
                alt={siteConfig.name}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-ink-300 leading-relaxed max-w-sm">
              Zak Residence is Lahore's premier boutique luxury serviced apartment portfolio. Designed for discerning business executives, overseas families, and vacationers seeking elegance, privacy, and impeccable Pakistani hospitality.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-gold-400">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-ink-800 hover:bg-gold-500 hover:text-ink-900 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-ink-800 hover:bg-gold-500 hover:text-ink-900 flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-ink-800 hover:bg-gold-500 hover:text-ink-900 flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-ink-800 hover:bg-gold-500 hover:text-ink-900 flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold tracking-wider text-gold-400 uppercase">
              Explore Suites
            </h4>
            <ul className="space-y-2 text-xs text-ink-300">
              <li>
                <Link to="/apartments?location=bahria-town" className="hover:text-gold-300 transition-colors">
                  Bahria Town Suites
                </Link>
              </li>
              <li>
                <Link to="/apartments?location=johar-town" className="hover:text-gold-300 transition-colors">
                  Johar Town Suites
                </Link>
              </li>
              <li>
                <Link to="/apartments?type=penthouse" className="hover:text-gold-300 transition-colors">
                  Royal Penthouses
                </Link>
              </li>
              <li>
                <Link to="/apartments?stayType=long" className="hover:text-gold-300 transition-colors">
                  Monthly Long-Stay Leases
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold-300 transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-gold-300 transition-colors">
                  Verified Guest Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations & Guides */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold tracking-wider text-gold-400 uppercase">
              Locations & Guides
            </h4>
            <ul className="space-y-2 text-xs text-ink-300">
              <li>
                <Link to="/locations" className="hover:text-gold-300 transition-colors">
                  Bahria Town Lahore Guide
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-gold-300 transition-colors">
                  Johar Town Lahore Guide
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-gold-300 transition-colors">
                  Gulberg & DHA (Coming Soon)
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold-300 transition-colors">
                  Lahore Travel Articles
                </Link>
              </li>
              <li>
                <Link to="/partner" className="hover:text-gold-300 transition-colors flex items-center gap-1 text-gold-400 font-semibold">
                  List Your Property with Zak
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / VIP Club */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold tracking-wider text-gold-400 uppercase">
              VIP Privileges Club
            </h4>
            <p className="text-xs text-ink-300">
              Receive secret promotional codes, seasonal discounts, and priority reservations.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-gold-950/40 border border-gold-500/40 rounded-xl text-gold-300 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>You're registered for VIP member perks!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-ink-800 border-ink-700 text-white placeholder:text-ink-400 text-xs h-10"
                />
                <Button type="submit" variant="gold" size="sm" className="w-full" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Join VIP Club
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Contact info strip */}
        <div className="py-6 border-b border-ink-800 flex flex-wrap items-center justify-between gap-4 text-xs text-ink-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
            <span>Sector C Bahria Town & Block G3 Johar Town, Lahore, Pakistan</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-gold-400">
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>{siteConfig.phone}</span>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-gold-400">
              <Mail className="w-3.5 h-3.5 text-gold-500" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>

        {/* Copyright and Policies */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ink-400">
          <div>
            © {new Date().getFullYear()} Zak Residence Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/terms" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cancellation" className="hover:text-gold-400 transition-colors">
              Cancellation Policy
            </Link>
            <Link to="/login" className="hover:text-gold-400 transition-colors text-gold-500">
              Staff & Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const [accepted, setAccepted] = useState(() => {
    return localStorage.getItem("zak_cookie_consent") === "true";
  });

  if (accepted) return null;

  const handleAccept = () => {
    localStorage.setItem("zak_cookie_consent", "true");
    setAccepted(true);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm bg-ink-900/95 text-white p-4 rounded-2xl shadow-2xl border border-gold-500/30 backdrop-blur-md animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-xs text-ink-200">
            We use cookies and local storage to optimize your luxury booking experience and save apartment preferences.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="gold" size="sm" onClick={handleAccept} className="h-7 text-xs">
              Accept
            </Button>
            <Link to="/privacy" className="text-[11px] text-ink-400 hover:text-white underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
