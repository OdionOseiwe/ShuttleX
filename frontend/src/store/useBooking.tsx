import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
axios.defaults.withCredentials = true;

const HOST_URL = "http://localhost:5000/TriRide/api";
// const HOST_URL = import.meta.env.VITE_BACKEND_URL ;

type DriverStore = {
  error: string | null;
  isLoading: boolean;
  driveBooked: boolean;
  pickup: any;
  dropoff: any;
  booking: any;
  acceptedRideBolean: boolean;
  bookRide: (
    startLat: number,
    startLng: number,
    destLat: number,
    destLng: number
  ) => Promise<void>;
  cancelRide: (id: any) => Promise<void>;
  acceptRide: (id: any) => Promise<void>;
  getBooking: (id: any) => Promise<void>;
};

export const useBookStore = create<DriverStore>()(
  persist(
    (set) => ({
      error: null,
      isLoading: false,
      driveBooked: false,
      pickup: null,
      dropoff: null,
      booking: null,
      acceptedRideBolean: false,

      bookRide: async (startLat, startLng, destLat, destLng) => {
        set({ error: null, isLoading: true });

        try {
          const response = await axios.post(`${HOST_URL}/booking/bookings`, {
            startLat,
            startLng,
            destLat,
            destLng,
          });
          const booking = response.data?.msg?.booking;

          if (!booking) {
            throw new Error("Booking not found in backend response");
          }

          set({
            isLoading: false,
            driveBooked: true,
            pickup: { lat: startLat, lon: startLng },
            dropoff: { lat: destLat, lon: destLng },
          });
          localStorage.setItem('id', JSON.stringify(response.data.msg.booking._id));
          
          return response.data.msg.booking._id;
        } catch (error: any) {
          console.error("BOOKING ERROR:", error);
          set({
            error: error.response?.data || error.message,
            isLoading: false,
          });
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
            driveBooked: false,
          });
        } catch (error) {
          set({ error:error, isLoading:true});
          throw error
        }
      },

      acceptRide: async (id) => {
        set({ error: null, isLoading: true, acceptedRideBolean: false });
        try {
          await axios.patch(`${HOST_URL}/booking/bookings/${id}/accept`);
          set({
            isLoading: false,
            acceptedRideBolean: true,
            driveBooked: false,
          });
        } catch (error) {
          set({ error:error, isLoading:true});
          throw error
        }
      },

      getBooking: async (id) => {
        set({ error: null, isLoading: true, booking: null });
        try {
          const response = await axios.get(
            `${HOST_URL}/booking/bookings/${id}`
          );
          console.log(response);

          set({
            isLoading: false,
            booking: response.data.booking,
          });
        } catch (error) {
          set({ error:error, isLoading:true});
          throw error
        }
      },
    }),
    {
      name: "ride-book-store", // saved in localStorage automatically
    }
  )
);
