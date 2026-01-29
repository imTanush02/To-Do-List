import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    console.log("Attempting login for:", email);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      console.log("Login successful:", data.email);
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data, loading: false });
    } catch (error) {
      console.error("Login error details:", error.response || error.message);
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  signup: async (email, password) => {
    set({ loading: true, error: null });
    console.log("Attempting signup for:", email);
    try {
      const { data } = await api.post("/auth/signup", { email, password });
      console.log("Signup successful:", data.email);
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data, loading: false });
    } catch (error) {
      console.error("Signup error details:", error.response || error.message);
      set({
        error: error.response?.data?.message || "Signup failed",
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useAuthStore;
export { api };
