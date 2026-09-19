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
