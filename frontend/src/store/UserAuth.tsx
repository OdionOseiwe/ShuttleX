import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

// Use VITE_BACKEND_URL or fallback
const HOST_URL = import.meta.env.VITE_BACKEND_URL ;
// const HOST_URL = "http://localhost:5000/TriRide/api"; 

// User type
type User = {
  id: string;
  email: string;
  name: string;
  createdAt:string;
  mobileNumber:number;
  role:string;
} | null;

// Store type
type AuthStore = {
  user: User;
  email: string; // for resend-code
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;

  // Actions
  signUp: (
    email: string,
    password: string,
    name: string,
    role: string,
    mobile_number?: string,
    nin?: string,
    vehicle_number?: string,
    vehicle_type?: string,
    capacity?: number,
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  email: "",
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // SIGN UP
  signUp: async (
    email,
    password,
    name,
    role,
    mobile_number,
    nin,
    vehicle_number,
    vehicle_type,
    capacity,
  ) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.post(`${HOST_URL}/user/signup`, {
        email,
        password,
        name,
        role,
        mobileNumber:mobile_number,
        nin,
        vehicleNumber:vehicle_number,
        vehicleType:vehicle_type,
        capacity,
      });

      set({
        isLoading: false,
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.msg || error.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // LOGIN
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axios.post(`${HOST_URL}/user/login`, {
        email,
        password,
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.msg || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      set({ isLoading: true });

      await axios.post(`${HOST_URL}/user/logout`);

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  // CHECK AUTH
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.get(`${HOST_URL}/user/check-auth`);

      set({
        user: res.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        user: null,
        isCheckingAuth: false,
      });
    }
  },
}));
