import { create } from "zustand";
import { api } from "./useAuthStore";

const useBoardStore = create((set, get) => ({
  boards: [],
  currentTodos: [],
  loading: false,

  fetchBoards: async () => {
    const { user } = JSON.parse(localStorage.getItem("user")) || {};
    if (!user) return;
    set({ loading: true });
    try {
      const { data } = await api.get("/boards", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });
      set({ boards: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  createBoard: async (name, description) => {
    try {
      const { data } = await api.post(
        "/boards",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
          },
        },
      );
      set((state) => ({ boards: [...state.boards, data] }));
    } catch (error) {}
  },

  deleteBoard: async (id) => {
    try {
      await api.delete(`/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });
      set((state) => ({ boards: state.boards.filter((b) => b._id !== id) }));
    } catch (error) {}
  },

  fetchTodos: async (boardId) => {
    set({ loading: true });
    try {
      const { data } = await api.get(`/todos/${boardId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });
      set({ currentTodos: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  addTodo: async (boardId, title, description) => {
    try {
      const { data } = await api.post(
        "/todos",
        { boardId, title, description },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
          },
        },
      );
      set((state) => ({ currentTodos: [...state.currentTodos, data] }));
    } catch (error) {}
  },

  updateTodo: async (id, updates) => {
    try {
      const { data } = await api.put(`/todos/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });
      set((state) => ({
        currentTodos: state.currentTodos.map((t) => (t._id === id ? data : t)),
      }));
    } catch (error) {}
  },

  deleteTodo: async (id) => {
    try {
      await api.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });
      set((state) => ({
        currentTodos: state.currentTodos.filter((t) => t._id !== id),
      }));
    } catch (error) {}
  },
}));

export default useBoardStore;
