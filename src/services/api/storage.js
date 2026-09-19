import localforage from "localforage";
import { initialApartments } from "../../data/seed/apartments";
import { initialBookings } from "../../data/seed/bookings";
import { initialGuests } from "../../data/seed/guests";
import { initialLeads } from "../../data/seed/leads";
import { initialReviews } from "../../data/seed/reviews";
import { initialStaff } from "../../data/seed/staff";
import { initialExpenses, initialExpenses as expensesData } from "../../data/seed/expenses";
import { initialTasks, initialInventory } from "../../data/seed/tasks";
import { initialCoupons } from "../../data/seed/coupons";
import { initialCMS } from "../../data/seed/cms";

// Configure IndexedDB store
localforage.config({
  name: "ZakResidenceDB",
  storeName: "zak_residence_store",
  description: "Zak Residence Luxury Apartments Mock Database"
});

const STORAGE_KEYS = {
  APARTMENTS: "zak_apartments",
  BOOKINGS: "zak_bookings",
  GUESTS: "zak_guests",
  LEADS: "zak_leads",
  REVIEWS: "zak_reviews",
  STAFF: "zak_staff",
  EXPENSES: "zak_expenses",
  TASKS: "zak_tasks",
  INVENTORY: "zak_inventory",
  COUPONS: "zak_coupons",
  CMS: "zak_cms",
  INITIALIZED: "zak_db_initialized_v1"
};

// Simulate realistic network latency (300ms - 500ms)
export const delay = (ms = Math.floor(Math.random() * 200) + 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function initializeDatabase(forceReset = false) {
  const isInitialized = await localforage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!isInitialized || forceReset) {
    console.log("⚡ Seeding Zak Residence database in IndexedDB...");
    await localforage.setItem(STORAGE_KEYS.APARTMENTS, initialApartments);
    await localforage.setItem(STORAGE_KEYS.BOOKINGS, initialBookings);
    await localforage.setItem(STORAGE_KEYS.GUESTS, initialGuests);
    await localforage.setItem(STORAGE_KEYS.LEADS, initialLeads);
    await localforage.setItem(STORAGE_KEYS.REVIEWS, initialReviews);
    await localforage.setItem(STORAGE_KEYS.STAFF, initialStaff);
    await localforage.setItem(STORAGE_KEYS.EXPENSES, initialExpenses);
    await localforage.setItem(STORAGE_KEYS.TASKS, initialTasks);
    await localforage.setItem(STORAGE_KEYS.INVENTORY, initialInventory);
    await localforage.setItem(STORAGE_KEYS.COUPONS, initialCoupons);
    await localforage.setItem(STORAGE_KEYS.CMS, initialCMS);
    await localforage.setItem(STORAGE_KEYS.INITIALIZED, "true");
    console.log("✅ Database initialized successfully.");
  }
}

export async function getCollection(key) {
  await initializeDatabase();
  const data = await localforage.getItem(STORAGE_KEYS[key.toUpperCase()]);
  return data || [];
}

export async function setCollection(key, data) {
  return await localforage.setItem(STORAGE_KEYS[key.toUpperCase()], data);
}

export async function resetDatabaseToDemo() {
  await localforage.clear();
  await initializeDatabase(true);
  return true;
}

export async function exportDatabaseBackup() {
  await initializeDatabase();
  const backup = {};
  for (const [name, key] of Object.entries(STORAGE_KEYS)) {
    backup[name] = await localforage.getItem(key);
  }
  return JSON.stringify(backup, null, 2);
}

export async function importDatabaseBackup(jsonString) {
  try {
    const backup = JSON.parse(jsonString);
    for (const [name, data] of Object.entries(backup)) {
      if (STORAGE_KEYS[name]) {
        await localforage.setItem(STORAGE_KEYS[name], data);
      }
    }
    return true;
  } catch (err) {
    console.error("Failed to import database backup:", err);
    throw new Error("Invalid backup JSON format");
  }
}
