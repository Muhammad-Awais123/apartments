import { getCollection, setCollection, delay } from "./storage";

export const leadsApi = {
  async getLeads(filters = {}) {
    await delay();
    let leads = await getCollection("leads");
    if (filters.stage && filters.stage !== "all") {
      leads = leads.filter(l => l.stage === filters.stage);
    }
    if (filters.channel && filters.channel !== "all") {
      leads = leads.filter(l => l.channel === filters.channel);
    }
    return leads;
  },

  async createLead(leadData) {
    await delay();
    const leads = await getCollection("leads");
    const newLead = {
      ...leadData,
      id: `lead-${Date.now().toString().slice(-4)}`,
      stage: leadData.stage || "new",
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    await setCollection("leads", leads);
    return newLead;
  },

  async updateLeadStage(id, newStage) {
    await delay();
    const leads = await getCollection("leads");
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error("Lead not found");
    leads[index].stage = newStage;
    await setCollection("leads", leads);
    return leads[index];
  },

  async updateLead(id, updates) {
    await delay();
    const leads = await getCollection("leads");
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error("Lead not found");
    leads[index] = { ...leads[index], ...updates };
    await setCollection("leads", leads);
    return leads[index];
  },

  async deleteLead(id) {
    await delay();
    const leads = await getCollection("leads");
    const filtered = leads.filter(l => l.id !== id);
    await setCollection("leads", filtered);
    return { success: true, id };
  }
};
