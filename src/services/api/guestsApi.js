import { getCollection, setCollection, delay } from "./storage";

export const guestsApi = {
  async getGuests(query = "") {
    await delay();
    let guests = await getCollection("guests");
    if (query) {
      const q = query.toLowerCase();
      guests = guests.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q) ||
        g.phone.toLowerCase().includes(q) ||
        g.city.toLowerCase().includes(q)
      );
    }
    return guests;
  },

  async getGuestById(id) {
    await delay();
    const guests = await getCollection("guests");
    const guest = guests.find(g => g.id === id);
    if (!guest) throw new Error("Guest not found");
    return guest;
  },

  async updateGuest(id, updates) {
    await delay();
    const guests = await getCollection("guests");
    const index = guests.findIndex(g => g.id === id);
    if (index === -1) throw new Error("Guest not found");
    guests[index] = { ...guests[index], ...updates };
    await setCollection("guests", guests);
    return guests[index];
  }
};
