import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

// const HOST_URL = "http://localhost:5000/TriRide/api";
const HOST_URL = import.meta.env.VITE_BACKEND_URL ;

type DriverStore = {
  error: string | null;
  isLoading: boolean;
  approveDriver: (id: any) => Promise<void>;
  rejectDriver: (id: any) => Promise<void>;
};

export const useDriverStore = create<DriverStore>((set) => ({
  error: null,
  isLoading: false,

  approveDriver: async (_id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${HOST_URL}/user/drivers/${_id}/approve`);
      set({ isLoading: false });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.response?.data?.message || err.message || "Unknown error",
      });
    }
  },
// TriRide/api/user/drivers/:_id/approve
  rejectDriver: async (_id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${HOST_URL}/user/drivers/${_id}/reject`);
      set({ isLoading: false });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.response?.data?.message || err.message || "Unknown error",
      });
    }
  },
}));
