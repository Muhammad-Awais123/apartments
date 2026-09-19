import React from "react";
import { Outlet } from "react-router-dom";
import { AnnouncementBanner, WhatsAppFloat } from "./AnnouncementBanner";
import { Navbar } from "./Navbar";
import { Footer, CookieBanner } from "./Footer";

export function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-ink-950 text-ink-900 dark:text-white">
      {/* 1. Top Editable Announcement Banner */}
      <AnnouncementBanner />

      {/* 2. Glass Sticky Navbar */}
      <Navbar />

      {/* 3. Main Page Content Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 4. Luxury Footer */}
      <Footer />

      {/* 5. Floating WhatsApp Instant Concierge Button */}
      <WhatsAppFloat />

      {/* 6. Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}
