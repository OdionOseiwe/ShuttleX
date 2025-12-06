import { create } from "zustand";
import { persist } from "zustand/middleware";

type BroadcastState = {
  rideBookedbroadcastData: any | null;
  rideAcceptedBroadcastData: any | null;
  rideCancelled: boolean,
  rideRejected:boolean,
  rideCompleted:boolean,
  setRideAcceptedBroadcastData: (d: any | null) => void;
  setRideBookedBroadcastData: (d: any | null) => void;
  setRideCancelled: (d: any | null) => void;
  setRideCompleted: (d: any | null) => void;
  setRideRejected: (d: any | null) => void;

  resetBroadcast:() =>void;
};

export const useBroadcastStore = create<BroadcastState>()(
  persist(
    (set) => ({
      rideBookedbroadcastData: null,
      rideAcceptedBroadcastData:null,
      rideCancelled: false,
      rideRejected:false,
      rideCompleted:false,
      setRideBookedBroadcastData: (d) => set({ rideBookedbroadcastData: d }),
      setRideAcceptedBroadcastData: (d) => set({rideAcceptedBroadcastData:d}),
      setRideCancelled: (val) => set({ rideCancelled: val }),
      setRideCompleted: (val) => set({ rideCompleted: val }),
      setRideRejected: (val) => set({ rideRejected: val }),

      resetBroadcast: () =>
        set({
          rideAcceptedBroadcastData: null,
          rideBookedbroadcastData: null,
          rideCancelled: false,
          rideRejected:false,
          rideCompleted:false,
      }),

    }),
    {
      name: "broadcast-storage", // key in localStorage
    }
  )
);
