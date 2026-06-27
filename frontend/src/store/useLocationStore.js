import { create } from "zustand";

export const useLocationStore = create((set) => ({
  location: null,
  loading: false,
  error: null,

  getCurrentLocation: () => {
    set({ loading: true, error: null });

    if (!navigator.geolocation) {
      set({
        loading: false,
        error: "Geolocation is not supported",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          loading: false,
        });
      },
      (err) => {
        set({
          loading: false,
          error: err.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  },
}));