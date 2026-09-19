import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      savedApartmentIds: ["apt-101", "apt-102"],

      toggleWishlist: (apartmentId) => {
        const ids = get().savedApartmentIds;
        if (ids.includes(apartmentId)) {
          set({ savedApartmentIds: ids.filter(id => id !== apartmentId) });
        } else {
          set({ savedApartmentIds: [...ids, apartmentId] });
        }
      },

      isInWishlist: (apartmentId) => {
        return get().savedApartmentIds.includes(apartmentId);
      }
    }),
    {
      name: "zak_wishlist_storage"
    }
  )
);

export const useUIStore = create(
  persist(
    (set) => ({
      isDark: false,
      language: "en",
      isSidebarCollapsed: false,
      isCommandPaletteOpen: false,
      isAnnouncementDismissed: false,

      toggleDarkMode: () => set((state) => {
        const next = !state.isDark;
        if (next) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        return { isDark: next };
      }),

      setLanguage: (lang) => {
        document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
        document.documentElement.setAttribute("lang", lang);
        set({ language: lang });
      },

      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
      dismissAnnouncement: () => set({ isAnnouncementDismissed: true })
    }),
    {
      name: "zak_ui_settings"
    }
  )
);
