import { getCollection, setCollection, delay } from "./storage";

export const apartmentsApi = {
  async getApartments(filters = {}) {
    await delay();
    let apartments = await getCollection("apartments");

    if (filters.locationId && filters.locationId !== "all") {
      apartments = apartments.filter(a => a.locationId === filters.locationId);
    }
    if (filters.bedrooms && filters.bedrooms !== "all") {
      apartments = apartments.filter(a => a.bedrooms === Number(filters.bedrooms));
    }
    if (filters.minPrice) {
      apartments = apartments.filter(a => a.nightlyPrice >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      apartments = apartments.filter(a => a.nightlyPrice <= Number(filters.maxPrice));
    }
    if (filters.featuredOnly) {
      apartments = apartments.filter(a => a.featured);
    }
    if (filters.type && filters.type !== "all") {
      apartments = apartments.filter(a => a.type.toLowerCase().includes(filters.type.toLowerCase()));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      apartments = apartments.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.locationName.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }

    return apartments;
  },

  async getApartmentById(id) {
    await delay();
    const apartments = await getCollection("apartments");
    const apartment = apartments.find(a => a.id === id || a.slug === id);
    if (!apartment) throw new Error("Apartment not found");
    return apartment;
  },

  async createApartment(data) {
    await delay();
    const apartments = await getCollection("apartments");
    const newApartment = {
      ...data,
      id: `apt-${Date.now().toString().slice(-4)}`,
      slug: (data.title || "suite").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      rating: 5.0,
      reviewCount: 0,
      status: data.status || "available"
    };
    apartments.unshift(newApartment);
    await setCollection("apartments", apartments);
    return newApartment;
  },

  async updateApartment(id, updates) {
    await delay();
    const apartments = await getCollection("apartments");
    const index = apartments.findIndex(a => a.id === id);
    if (index === -1) throw new Error("Apartment not found");
    apartments[index] = { ...apartments[index], ...updates };
    await setCollection("apartments", apartments);
    return apartments[index];
  },

  async deleteApartment(id) {
    await delay();
    const apartments = await getCollection("apartments");
    const filtered = apartments.filter(a => a.id !== id);
    await setCollection("apartments", filtered);
    return { success: true, id };
  }
};
