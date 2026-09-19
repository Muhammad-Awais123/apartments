import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../../lib/animations";
import { AnnouncementBanner, WhatsAppFloat } from "./AnnouncementBanner";
import { Navbar } from "./Navbar";
import { Footer, CookieBanner } from "./Footer";

export function PublicLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-ink-950 text-ink-900 dark:text-white">
      {/* 1. Top Editable Announcement Banner */}
      <AnnouncementBanner />

      {/* 2. Glass Sticky Navbar */}
      <Navbar />

      {/* 3. Main Page Content Viewport with Smooth Route Transition */}
      <main className="flex-1 overflow-x-hidden">
        <motion.div
          key={location.pathname}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          transition={pageTransition.transition}
        >
          <Outlet />
        </motion.div>
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
