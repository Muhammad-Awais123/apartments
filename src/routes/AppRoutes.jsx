import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "../components/common/PublicLayout";
import { RoleGuard, LoginPage, RegisterPage, ForgotPasswordPage } from "../features/auth/LoginPage";
import {
  GuestLayout,
  GuestDashboard,
  GuestBookings,
  GuestDoorCodes,
  GuestWishlist,
  GuestTickets,
  GuestProfile
} from "../features/guest/GuestPortal";
import { AdminLayout } from "../features/admin/AdminLayout";
import { OverviewModule } from "../features/admin/modules/OverviewModule";
import { BookingsModule } from "../features/admin/modules/BookingsModule";
import { CalendarModule, ApartmentsModule } from "../features/admin/modules/CalendarModule";
import {
  GuestsCRMModule,
  LeadsKanbanModule,
  CommunicationModule,
  ReviewsModerationModule
} from "../features/admin/modules/CRMModules";
import {
  LongStayModule,
  HousekeepingModule,
  InventoryModule,
  FinanceModule,
  PromotionsModule
} from "../features/admin/modules/OperationsModules";
import {
  CMSVisualEditorModule,
  StaffRolesModule,
  ReportsAnalyticsModule,
  SettingsModule
} from "../features/admin/modules/SystemModules";

// Public pages
const HomePage = lazy(() => import("../features/public/HomePage"));
const ApartmentsPage = lazy(() => import("../features/public/ApartmentsPage"));
const ApartmentDetailPage = lazy(() => import("../features/public/ApartmentDetailPage"));
const BookingWizard = lazy(() => import("../features/booking/BookingWizard"));

import {
  LocationsPage,
  GalleryPage
} from "../features/public/LocationsPage";
import {
  AboutPage,
  ContactPage,
  BlogPage,
  LegalPage,
  NotFoundPage
} from "../features/public/AboutPage";

const PageLoader = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="text-center space-y-3">
      <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
        Loading Zak Residence...
      </p>
    </div>
  </div>
);

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartments" element={<ApartmentsPage />} />
          <Route path="/apartments/:id" element={<ApartmentDetailPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/book" element={<BookingWizard />} />

          {/* Legal / Policies */}
          <Route
            path="/terms"
            element={
              <LegalPage
                title="Terms of Service"
                content={`1. RESERVATION POLICY: All bookings are guaranteed upon receipt of payment verification or valid CNIC/Passport registration.\n\n2. OCCUPANCY LIMITS: Each apartment suite has a strict maximum guest capacity. Unauthorized extra guests may incur additional nightly fees.\n\n3. NOISE & COMMUNITY RULES: Zak Residence suites are located in prestigious gated residential neighborhoods. Loud music or disturbances after 10:00 PM are prohibited.\n\n4. LOADSHEDDING GUARANTEE: Automatic heavy-duty diesel generators provide 100% electrical backup for split air conditioners, elevators, and appliances.`}
              />
            }
          />
          <Route
            path="/privacy"
            element={
              <LegalPage
                title="Privacy & Data Protection Policy"
                content={`1. DATA COLLECTION: We collect guest names, contact numbers, email addresses, and identification documents solely for security verification and digital door PIN distribution.\n\n2. STORAGE SECURITY: All identification images and payment receipts are encrypted and stored locally in compliance with privacy regulations.\n\n3. NO THIRD-PARTY SHARING: We do not sell or rent guest details to any third-party marketing companies.`}
              />
            }
          />
          <Route
            path="/cancellation"
            element={
              <LegalPage
                title="Cancellation & Refund Policy"
                content={`1. FREE CANCELLATION: Guests may cancel without penalty up to 48 hours prior to the scheduled 2:00 PM check-in time.\n\n2. LATE CANCELLATIONS: Cancellations within 48 hours of scheduled check-in incur a 1-night standard room fee.\n\n3. MONTHLY TENANCIES: Long-term monthly agreements require a 30-day written notice for early departure.`}
              />
            }
          />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Guest Portal Routes (Protected) */}
        <Route element={<RoleGuard allowedRoles={["guest", "admin", "manager", "front_desk"]} />}>
          <Route path="/account" element={<GuestLayout />}>
            <Route index element={<GuestDashboard />} />
            <Route path="bookings" element={<GuestBookings />} />
            <Route path="door-codes" element={<GuestDoorCodes />} />
            <Route path="wishlist" element={<GuestWishlist />} />
            <Route path="support" element={<GuestTickets />} />
            <Route path="profile" element={<GuestProfile />} />
          </Route>
        </Route>

        {/* Admin Dashboard Routes (Protected: Admin, Manager, Front Desk, Housekeeping) */}
        <Route element={<RoleGuard allowedRoles={["admin", "manager", "front_desk", "housekeeping"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<OverviewModule />} />
            <Route path="bookings" element={<BookingsModule />} />
            <Route path="calendar" element={<CalendarModule />} />
            <Route path="apartments" element={<ApartmentsModule />} />
            <Route path="guests" element={<GuestsCRMModule />} />
            <Route path="leads" element={<LeadsKanbanModule />} />
            <Route path="communication" element={<CommunicationModule />} />
            <Route path="reviews" element={<ReviewsModerationModule />} />
            <Route path="long-stay" element={<LongStayModule />} />
            <Route path="housekeeping" element={<HousekeepingModule />} />
            <Route path="inventory" element={<InventoryModule />} />
            <Route path="finance" element={<FinanceModule />} />
            <Route path="promotions" element={<PromotionsModule />} />
            <Route path="cms" element={<CMSVisualEditorModule />} />
            <Route path="staff" element={<StaffRolesModule />} />
            <Route path="reports" element={<ReportsAnalyticsModule />} />
            <Route path="settings" element={<SettingsModule />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
