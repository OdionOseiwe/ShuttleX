import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios"; axios.defaults.withCredentials = true; 


// const HOST_URL = "http://localhost:5000/TriRide/api"; 
const HOST_URL = import.meta.env.VITE_BACKEND_URL ;

type DriverStore = { 
    error: string | null;
     isLoading: boolean; 
     driveBook:boolean, 
     pickup: any, 
     dropoff: any, 
     bookRide: (startLat:number, startLng:number, destLat:number, destLng:number) => Promise<void> 
     cancelRide:(id:any)=> Promise<void> 
};

export const useBookStore = create<DriverStore>()(
  persist(
    (set) => ({
      error: null,
      isLoading: false,
      driveBook: false,
      pickup: null,
      dropoff: null,

      bookRide: async (startLat, startLng, destLat, destLng) => {
        set({ error: null, isLoading: true });
        try {
          await axios.post(`${HOST_URL}/booking/bookings`, {
            startLat,
            startLng,
            destLat,
            destLng,
          });

          set({
            isLoading: false,
            driveBook: true,
            pickup: { lat: startLat, lon: startLng },
            dropoff: { lat: destLat, lon: destLng },
          });
        } catch (error) {
          set({ error });
        }
      },

      cancelRide: async (id) => {
        set({ error: null, isLoading: true });
        try {
          await axios.patch(`${HOST_URL}/booking/bookings/${id}/cancel`);
          set({
            isLoading: false,
            pickup: null,
            dropoff: null,
            driveBook: false,
          });
        } catch (error) {
          set({ error });
        }
      },
    }),
    {
      name: "ride-book-store", // saved in localStorage automatically
    }
  )
);
