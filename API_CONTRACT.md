# Zak Residence - REST API Contract & Specification

This document details the mock RESTful API architecture powering Zak Residence. Every endpoint is implemented in `src/services/api/` with simulated network latency (300–600ms) and persists to browser **IndexedDB** via `localforage` (falling back to localStorage).

---

## 1. Apartments & Properties (`/api/apartments`)

### `GET /api/apartments`
- **Description**: Fetch list of apartments with optional query filters.
- **Query Parameters**:
  - `locationId` (string, optional): `"bahria-town"` | `"johar-town"` | `"all"`
  - `bedrooms` (number, optional): `1` | `2` | `3`
  - `minPrice` / `maxPrice` (number, optional)
  - `type` (string, optional): `"Penthouse"` | `"2 Bedroom Suite"` | `"Studio"`
  - `search` (string, optional)
- **Response `200 OK`**:
```json
[
  {
    "id": "apt-101",
    "slug": "royal-penthouse-bahria-town",
    "title": "The Royal Sky Penthouse with Panoramic Terrace",
    "locationId": "bahria-town",
    "locationName": "Bahria Town Lahore",
    "address": "Penthouse Level 8, Jasmine Grand Heights, Bahria Town, Lahore",
    "type": "Penthouse",
    "bedrooms": 3,
    "bathrooms": 3,
    "maxGuests": 6,
    "areaSqFt": 2400,
    "floor": "8th Floor",
    "nightlyPrice": 28000,
    "monthlyPrice": 420000,
    "weekendPrice": 32000,
    "securityDeposit": 30000,
    "rating": 4.96,
    "reviewCount": 28,
    "status": "available",
    "coverImage": "https://...",
    "images": ["https://..."],
    "amenities": ["wifi", "smart-lock", "kitchen", "ac", "geyser", "backup-power"]
  }
]
```

### `GET /api/apartments/:id`
- **Response `200 OK`**: Full apartment details object.

### `POST /api/apartments`
- **Payload**: Apartment creation object.
- **Response `201 Created`**: Created apartment with generated `id` and `slug`.

### `PUT /api/apartments/:id`
- **Payload**: Fields to update.
- **Response `200 OK`**: Updated apartment object.

### `DELETE /api/apartments/:id`
- **Response `200 OK`**: `{ "success": true, "id": "apt-101" }`

---

## 2. Bookings & Reservations (`/api/bookings`)

### `GET /api/bookings`
- **Query Parameters**: `guestId`, `status`, `paymentStatus`, `apartmentId`, `search`
- **Response `200 OK`**: Array of booking objects.

### `POST /api/bookings`
- **Payload**:
```json
{
  "apartmentId": "apt-101",
  "apartmentTitle": "The Royal Sky Penthouse with Panoramic Terrace",
  "locationId": "bahria-town",
  "locationName": "Bahria Town Lahore",
  "checkIn": "2026-09-20",
  "checkOut": "2026-09-24",
  "nights": 4,
  "adults": 2,
  "children": 0,
  "stayType": "short",
  "guestName": "Hamza Tariq",
  "guestEmail": "hamza@example.com",
  "guestPhone": "+92 300 4589210",
  "guestCnic": "42101-8392019-3",
  "cnicImageProof": "data:image/webp;base64,...",
  "specialRequests": "Late check-in requested",
  "arrivalTime": "16:00",
  "addOns": [
    { "id": "airport_pickup", "name": "Airport Luxury Sedan Pickup", "price": 6000 }
  ],
  "paymentMethod": "bank_transfer",
  "paymentProofUrl": "data:image/webp;base64,..."
}
```
- **Response `201 Created`**: Booking record containing generated `id` (e.g. `ZAK-26-H89A1`) and `doorCode` (e.g. `9482#`).

### `PATCH /api/bookings/:id/status`
- **Payload**: `{ "status": "confirmed", "paymentStatus": "paid" }`
- **Response `200 OK`**: Updated booking record.

---

## 3. CRM Guests (`/api/guests`) & Leads (`/api/leads`)

### `GET /api/guests`
- **Response `200 OK`**: Array of guest profiles with lifetime spending, VIP tags, and stay history.

### `GET /api/leads`
- **Response `200 OK`**: Leads in Kanban stages (`new`, `contacted`, `visit_scheduled`, `negotiation`, `won`, `lost`).

### `POST /api/leads`
- **Payload**: `{ "name": "...", "phone": "...", "channel": "instagram", "stayType": "long", "notes": "..." }`

---

## 4. Reviews & Testimonials (`/api/reviews`)

### `GET /api/reviews`
- **Query Parameters**: `apartmentId`, `status` (`"approved"` | `"pending"` | `"rejected"`), `featuredOnly`
- **Response `200 OK`**: Array of reviews with category scores and owner responses.

### `POST /api/reviews`
- **Payload**: Review submission object with photo base64 strings and category ratings.

---

## 5. Operations & CMS

- `GET /api/tasks` & `POST /api/tasks` (Housekeeping & Maintenance)
- `GET /api/inventory` & `PATCH /api/inventory/:id` (Restock items)
- `GET /api/expenses` & `POST /api/expenses` (Financial ledger)
- `GET /api/coupons` & `POST /api/coupons/validate` (Discounts)
- `GET /api/cms` & `PUT /api/cms` (Live visual website editor)

---

## How to Connect a Real Backend (Node / Express / MongoDB)

To swap out the mock layer for a real production backend:
1. Replace functions in `src/services/api/` with `fetch()` or `axios` calls pointing to your Node/Express server (e.g. `https://api.zakresidence.com/v1`).
2. Maintain identical function signatures and payload interfaces as documented above.
3. No React UI components, forms, or stores need to be modified.
