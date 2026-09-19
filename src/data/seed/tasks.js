export const initialTasks = [
  {
    id: "tsk-001",
    apartmentId: "apt-104",
    apartmentTitle: "Urban Deluxe Studio Suite Johar Town",
    type: "cleaning", // cleaning, maintenance, inspection
    title: "Post-Checkout Full Deep Clean & Linen Refresh",
    assignedTo: "Rashid Mehmood",
    priority: "high", // low, medium, high, urgent
    status: "in_progress", // pending, in_progress, completed
    dueDate: "2026-09-19",
    checklist: [
      { item: "Strip bed and replace with sanitized Egyptian cotton set", done: true },
      { item: "Disinfect bathroom, replace toiletries & towel sets", done: true },
      { item: "Mop hardwood floors with citrus disinfectant", done: false },
      { item: "Restock Nespresso capsules and complimentary water", done: false },
      { item: "Sanitize smart door lock keypad and reset guest PIN", done: false }
    ],
    notes: "Guest checking in today at 3:00 PM. Please expedite."
  },
  {
    id: "tsk-002",
    apartmentId: "apt-101",
    apartmentTitle: "The Royal Sky Penthouse with Panoramic Terrace",
    type: "inspection",
    title: "Pre-Arrival VIP Inspection for Hamza Tariq",
    assignedTo: "Mahnoor Malik",
    priority: "urgent",
    status: "pending",
    dueDate: "2026-09-20",
    checklist: [
      { item: "Check jacuzzi water temperature & jets", done: false },
      { item: "Verify 65-inch OLED TV Netflix login & surround sound", done: false },
      { item: "Ensure terrace lighting and ambient lamps are working", done: false },
      { item: "Place welcome fruit basket and chilled mineral water", done: false }
    ],
    notes: "VIP guest arriving tomorrow evening."
  },
  {
    id: "tsk-003",
    apartmentId: "apt-103",
    apartmentTitle: "Modern Designer 1BR Apartment in Sector C",
    type: "maintenance",
    title: "Terrace French Door Latch Adjustment",
    assignedTo: "Ali Maintenance",
    priority: "medium",
    status: "completed",
    dueDate: "2026-09-17",
    checklist: [
      { item: "Lubricate sliding door track", done: true },
      { item: "Tighten latch handle screws", done: true }
    ],
    notes: "Completed smoothly."
  }
];

export const initialInventory = [
  { id: "inv-001", name: "King Size 600TC Sheet Sets (White)", category: "linens", quantity: 24, minThreshold: 10, unit: "sets", status: "good" },
  { id: "inv-002", name: "Plush Bath Towels (700 GSM)", category: "linens", quantity: 45, minThreshold: 15, unit: "pieces", status: "good" },
  { id: "inv-003", name: "Artisan Bergamot Hand & Body Wash 300ml", category: "toiletries", quantity: 8, minThreshold: 12, unit: "bottles", status: "low_stock" },
  { id: "inv-004", name: "Nespresso Compatible Coffee Capsules (Dark Roast)", category: "kitchen", quantity: 120, minThreshold: 50, unit: "pods", status: "good" },
  { id: "inv-005", name: "Smart Keypad Door Lock Batteries (Duracell AA)", category: "hardware", quantity: 6, minThreshold: 10, unit: "packs", status: "low_stock" },
  { id: "inv-006", name: "Organic Lavender Pillow Mist", category: "amenities", quantity: 18, minThreshold: 5, unit: "bottles", status: "good" }
];
