import { create } from "zustand";
import { persist } from "zustand/middleware";
import { staffApi } from "../services/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const res = await staffApi.authenticate(email, password);
          set({
            user: res.user,
            token: res.token,
            isAuthenticated: true
          });
          return res.user;
        } catch (error) {
          throw error;
        }
      },

      loginAsRole: async (role) => {
        const staff = await staffApi.getStaff();
        const targetUser = staff.find(s => s.role === role);
        if (targetUser) {
          set({
            user: targetUser,
            token: `mock_jwt_${targetUser.id}_${Date.now()}`,
            isAuthenticated: true
          });
          return targetUser;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      }
    }),
    {
      name: "zak_auth_storage"
    }
  )
);
