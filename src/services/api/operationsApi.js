import { getCollection, setCollection, delay } from "./storage";

export const staffApi = {
  async getStaff() {
    await delay();
    return await getCollection("staff");
  },

  async authenticate(email, password) {
    await delay();
    const staff = await getCollection("staff");
    const user = staff.find(s => s.email.toLowerCase() === email.toLowerCase());
    
    // In mock demo mode, any password with matching email or standard default works
    if (user) {
      return {
        user,
        token: `mock_jwt_token_${user.id}_${Date.now()}`
      };
    }
    throw new Error("Invalid email or password");
  },

  async updateStaffUser(id, updates) {
    await delay();
    const staff = await getCollection("staff");
    const index = staff.findIndex(s => s.id === id);
    if (index === -1) throw new Error("Staff user not found");
    staff[index] = { ...staff[index], ...updates };
    await setCollection("staff", staff);
    return staff[index];
  }
};

export const financeApi = {
  async getExpenses(filters = {}) {
    await delay();
    let expenses = await getCollection("expenses");
    if (filters.category && filters.category !== "all") {
      expenses = expenses.filter(e => e.category === filters.category);
    }
    return expenses;
  },

  async addExpense(expenseData) {
    await delay();
    const expenses = await getCollection("expenses");
    const newExpense = {
      ...expenseData,
      id: `exp-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    expenses.unshift(newExpense);
    await setCollection("expenses", expenses);
    return newExpense;
  }
};

export const tasksApi = {
  async getTasks(filters = {}) {
    await delay();
    let tasks = await getCollection("tasks");
    if (filters.status && filters.status !== "all") {
      tasks = tasks.filter(t => t.status === filters.status);
    }
    if (filters.assignedTo) {
      tasks = tasks.filter(t => t.assignedTo === filters.assignedTo);
    }
    return tasks;
  },

  async updateTaskStatus(id, status) {
    await delay();
    const tasks = await getCollection("tasks");
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Task not found");
    tasks[index].status = status;
    await setCollection("tasks", tasks);
    return tasks[index];
  },

  async createTask(taskData) {
    await delay();
    const tasks = await getCollection("tasks");
    const newTask = {
      ...taskData,
      id: `tsk-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    tasks.unshift(newTask);
    await setCollection("tasks", tasks);
    return newTask;
  },

  async getInventory() {
    await delay();
    return await getCollection("inventory");
  },

  async updateInventoryItem(id, updates) {
    await delay();
    const inventory = await getCollection("inventory");
    const index = inventory.findIndex(i => i.id === id);
    if (index === -1) throw new Error("Inventory item not found");
    inventory[index] = { ...inventory[index], ...updates };
    await setCollection("inventory", inventory);
    return inventory[index];
  }
};

export const cmsApi = {
  async getCMSData() {
    await delay();
    return await getCollection("cms");
  },

  async updateCMSData(updates) {
    await delay();
    const current = await getCollection("cms");
    const updated = { ...current, ...updates };
    await setCollection("cms", updated);
    return updated;
  },

  async getCoupons() {
    await delay();
    return await getCollection("coupons");
  },

  async validateCoupon(code) {
    await delay();
    const coupons = await getCollection("coupons");
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    if (!coupon) throw new Error("Invalid or expired coupon code");
    return coupon;
  },

  async createCoupon(couponData) {
    await delay();
    const coupons = await getCollection("coupons");
    const newCoupon = {
      ...couponData,
      code: couponData.code.toUpperCase().trim(),
      usageCount: 0,
      isActive: true
    };
    coupons.unshift(newCoupon);
    await setCollection("coupons", coupons);
    return newCoupon;
  }
};
