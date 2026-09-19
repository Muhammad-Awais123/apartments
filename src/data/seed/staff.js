import { luxuryImages } from "../../config/images";

export const initialStaff = [
  {
    id: "usr-admin",
    name: "Zain Ali Khan",
    email: "admin@zakresidence.com",
    role: "admin", // admin, manager, front_desk, housekeeping, guest
    roleLabel: "Owner & CEO",
    phone: "+92 300 8472910",
    avatar: luxuryImages.avatars.staff2,
    status: "active",
    permissions: ["all"],
    lastLogin: "2026-09-19T10:30:00Z"
  },
  {
    id: "usr-manager",
    name: "Bilal Ahmad",
    email: "manager@zakresidence.com",
    role: "manager",
    roleLabel: "General Manager",
    phone: "+92 321 4455889",
    avatar: luxuryImages.avatars.guest2,
    status: "active",
    permissions: ["bookings", "calendar", "apartments", "guests", "leads", "communication", "reviews", "housekeeping", "inventory"],
    lastLogin: "2026-09-19T09:15:00Z"
  },
  {
    id: "usr-frontdesk",
    name: "Mahnoor Malik",
    email: "frontdesk@zakresidence.com",
    role: "front_desk",
    roleLabel: "Guest Relations & Front Desk",
    phone: "+92 302 9988112",
    avatar: luxuryImages.avatars.staff1,
    status: "active",
    permissions: ["bookings_view", "bookings_create", "calendar_view", "guests_view", "communication"],
    lastLogin: "2026-09-19T08:00:00Z"
  },
  {
    id: "usr-housekeeping",
    name: "Rashid Mehmood",
    email: "housekeeping@zakresidence.com",
    role: "housekeeping",
    roleLabel: "Head of Housekeeping",
    phone: "+92 345 1122334",
    avatar: luxuryImages.avatars.guest4,
    status: "active",
    permissions: ["housekeeping_tasks", "inventory_view", "maintenance_tickets"],
    lastLogin: "2026-09-19T07:45:00Z"
  },
  {
    id: "usr-guest",
    name: "Hamza Tariq",
    email: "guest@zakresidence.com",
    role: "guest",
    roleLabel: "Verified Resident",
    phone: "+92 300 4589210",
    avatar: luxuryImages.avatars.guest2,
    status: "active",
    permissions: ["guest_portal"],
    lastLogin: "2026-09-18T19:20:00Z"
  }
];
