# Zak Residence - Luxury Serviced Apartments Platform

> **"LIVE · STAY · FEEL HOME"**
> Luxury fully-furnished serviced residences in **Bahria Town Lahore** and **Johar Town Lahore**, Pakistan.

---

## 🚀 Key Features

1. **Stunning Public Website**:
   - 17 Animated Home Page Sections (Hero with parallax & booking widget, Trust bar, Locations, Featured suites, Amenities, Stay tiers, How it works, Gallery masonry with lightbox, Walkthrough video reels, Verified reviews, Special offers with live countdown, Neighborhood guides with distances, Dynamic price calculator, FAQ accordion, Instagram feed grid, Property listing partnership form, Direct WhatsApp CTA).
   - Filterable Apartments catalog (grid/list view, price slider, bedrooms, amenities).
   - Apartment details page with sticky live price calculation, verified reviews, and house rules.
   - Multilingual support: **English** and **Urdu (اردو)** with dynamic RTL layout switching.
   - Clean white background luxury styling with **Ink**, **Deep Navy**, **Metallic Gold**, and **Cream** accents.

2. **Multi-Step Booking Engine**:
   - Dates & stay type (Nightly short stay vs. Monthly long-stay lease).
   - Guest verification with CNIC / Passport image upload.
   - Bespoke concierge add-ons (airport pickup, extra bed, early check-in, housekeeping).
   - Promo coupon validator (`ZAKWELCOME10`, `LAHORESTAY`, `MONTHLY20`, `VIPGUEST`).
   - Pakistani payment methods (Direct Bank Transfer IBFT, JazzCash, Easypaisa, Pay at Check-in) with receipt slip upload.
   - Generated digital QR guest pass and downloadable official PDF invoice (`jsPDF`).

3. **Guest Portal (`/account`)**:
   - Dashboard with active stay door lock PIN passcodes.
   - Booking history with cancel/modify requests and invoice downloads.
   - Digital door lock instructions and instant PIN copy.
   - Saved apartments wishlist.
   - 24/7 Concierge live chat simulation and profile manager.

4. **Comprehensive Admin Dashboard (`/admin`) - All 17 Modules**:
   - **Overview**: KPIs (Revenue, Occupancy %, ADR, RevPAR), Recharts monthly trends, live activity feed.
   - **Bookings**: Pipeline management, payment slip inspection/approval, walk-in reservations, invoice generation.
   - **Calendar**: Room timeline matrix, drag-to-book, date blocking, mock iCal sync.
   - **Apartments**: Full CRUD, image uploader, seasonal & weekend pricing rules.
   - **Guests CRM**: Profiles, lifetime spend in PKR, VIP tags, resident communication log.
   - **Leads Kanban**: 6-column drag-and-drop pipeline, acquisition channels (Instagram, Facebook, WhatsApp, Website).
   - **Communication**: WhatsApp click-to-chat templates and bulk sender UI.
   - **Reviews**: Moderation workflow, approve/reject, owner replies.
   - **Long-Stay**: Monthly rental ledger, tenancy agreement PDF generator.
   - **Housekeeping**: Room cleanliness status board, checklists, maintenance tickets.
   - **Inventory**: Stock tracker with low-stock alerts.
   - **Finance**: Income/Expense ledger, P&L statements, owner rental payouts.
   - **Promotions**: Coupon code manager.
   - **CMS Visual Editor**: Edit website headlines, FAQs, and announcement banners live without code.
   - **Staff & Roles**: RBAC user management and audit log.
   - **Reports & Analytics**: Occupancy, revenue, and length-of-stay metrics.
   - **Settings**: Business configuration, "Reset Demo Data" button, JSON backup export/import.

5. **Client-Side Image Upload System**:
   - Reusable dropzone component with desktop upload & mobile camera capture.
   - Client-side WebP compression (`browser-image-compression`).
   - Progress bar, cover photo selector, alt-text field, and IndexedDB persistence.

---

## 🔑 Demo Login Credentials

You can click any of the **1-Click Demo Login** buttons on the `/login` page:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Owner / Admin** | `admin@zakresidence.com` | `admin123` | Full access to all 17 admin modules & settings |
| **General Manager** | `manager@zakresidence.com` | `manager123` | Bookings, Calendar, CRM, Housekeeping, Finance |
| **Front Desk** | `frontdesk@zakresidence.com` | `desk123` | Check-ins, Walk-in bookings, Guest communication |
| **Housekeeping** | `housekeeping@zakresidence.com` | `clean123` | Room cleanliness board & maintenance tickets |
| **Resident / Guest** | `guest@zakresidence.com` | `guest123` | Guest Portal, Door PIN codes, Bookings history |

---

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Design System Tokens
- **Typography**: Quattrocento Sans (Headings) + Montserrat (Body) + Noto Nastaliq Urdu (Urdu RTL)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Caching**: TanStack Query (React Query v5)
- **Charts**: Recharts
- **PDF Generation**: jsPDF + jsPDF-AutoTable
- **Image Compression**: browser-image-compression
- **Data Persistence**: IndexedDB via `localforage` (simulating 300–600ms network latency)

---

## ⚙️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🔄 Resetting Demo Data

To restore the original seed apartments, 30 bookings, 25 guests, and 40 leads anytime:
1. Navigate to `/admin/settings`.
2. Click **Reset Demo Data**.
3. The application will restore the initial database state in IndexedDB.
# apartments
