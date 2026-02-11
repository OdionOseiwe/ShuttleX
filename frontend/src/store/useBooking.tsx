import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
axios.defaults.withCredentials = true;

// const HOST_URL = "http://localhost:7000/TriRide/api";
const HOST_URL = import.meta.env.VITE_BACKEND_URL ;

type DriverStore = {
  error: string | null;
  isLoading: boolean;
  pickup: any;
  dropoff: any;
  acceptedRideBolean: boolean;
  cancellRideBoolean:boolean,
  rideBookedBoolean:boolean,
  showNotification: boolean,
  bookingId: null | any,
  triggerNotification:(id:any) => void,
  hideNotification:() => void,
  bookRide: (
    startLat: number,
    startLng: number,
    destLat: number,
    destLng: number
  ) => Promise<void>;
  cancelRide: (id: any) => Promise<void>;
  acceptRide: (id: any) => Promise<void>;
  getBooking: (id: any) => Promise<void>;
  rejectRide: (id: any) => Promise<void>; 
  completeRide: (id: any) => Promise<void>;
  resetRideState:() => void
};

export const useBookStore = create<DriverStore>()(
  persist(
    (set) => ({
      error: null,
      isLoading: false,
      pickup: null,
      dropoff: null,
      acceptedRideBolean: false,
      showNotification: false,
      bookingId: null,
      cancellRideBoolean:false,
      rideBookedBoolean:false,

      triggerNotification: (id) => set({
        showNotification: true,
        bookingId: id
      }),

      hideNotification: () => set({
        showNotification: false,
        bookingId: null
      }),

      resetRideState: () =>
        set({
          bookingId: null,
          acceptedRideBolean: false,
          rideBookedBoolean: false,
          pickup: null,
          dropoff: null,
        }),

      bookRide: async (startLat, startLng, destLat, destLng) => {
        set({ error: null, isLoading: true, rideBookedBoolean:false });

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
            pickup: { lat: startLat, lon: startLng },
            dropoff: { lat: destLat, lon: destLng },
            bookingId: response.data.msg.booking._id,
            rideBookedBoolean:true,
          });          
          return response.data.msg;
        } catch (error: any) {
          console.error("BOOKING ERROR:", error);
          set({
            error: error.response?.data || error.message,
            isLoading: false,
          });
        }
      },

      cancelRide: async (id) => {
        set({ error: null, isLoading: true, cancellRideBoolean:false });
        try {
          await axios.patch(`${HOST_URL}/booking/bookings/${id}/cancel`);
          set({
            isLoading: false,
            pickup: null,
            dropoff: null,
            cancellRideBoolean:true,
            rideBookedBoolean:false
          });
        } catch (error) {
          set({ error:error, isLoading:true});
          throw error
        }
      },

      acceptRide: async (id) => {
        set({ error: null, isLoading: true, acceptedRideBolean: false , rideBookedBoolean:false});
        try {
          const rideDetails = await axios.patch(`${HOST_URL}/booking/bookings/${id}/accept`);
          set({
            isLoading: false,
            acceptedRideBolean: true,
            rideBookedBoolean:false,
          });
          return rideDetails.data;
        } catch (error) {
          set({ error:error, isLoading:true});
          throw error
        }
      },
      //By driver
      rejectRide: async (id) => {
        set({ error: null, isLoading: true });
        try {
          await axios.patch(`${HOST_URL}/booking/bookings/${id}/reject`);
          set({
            isLoading: false,
            cancellRideBoolean:true,
          });
        } catch (error) {
          set({ error:error, isLoading:true});
          throw error
        }
      },

      completeRide: async (id) => {
        set({ error: null, isLoading: true });
        try {
          await axios.patch(`${HOST_URL}/booking/bookings/${id}/complete`);
          set({
            isLoading: false,
            cancellRideBoolean:true,
          });
        } catch (error) {
          set({ error:error, isLoading:true});
          throw error
        }
      },

      getBooking: async (id) => {
        set({ error: null, isLoading: true,  });
        try {
          const response = await axios.get(
            `${HOST_URL}/booking/bookings/${id}`
          );
          console.log(response);

          set({
            isLoading: false,
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
