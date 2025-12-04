import { create } from "zustand";

export const useBroadcastStore = create((set) => ({
  broadcastData: null,
  setBroadcastData: (data) => set({ broadcastData: data }),
}));
