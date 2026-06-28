import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const clearAuthState = {
  fullName: null,
  authUser: null,
  userType: null,
  userReferenceId: null,
};

export const useAuthStore = create((set) => ({
  ...clearAuthState,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({
        fullName: res.data.fullName,
        authUser: res.data.userEmail,
        userType: res.data.userType,
        userReferenceId: res.data.userReferenceId,
      });
    } catch (err) {
      console.log("Error in checkAuth", err);
      set(clearAuthState);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/signin", data);

      set({
        fullName: res.data.fullName,
        authUser: res.data.userEmail,
        userType: res.data.userType,
        userReferenceId: res.data.userReferenceId,
      });

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set(clearAuthState);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
}));

