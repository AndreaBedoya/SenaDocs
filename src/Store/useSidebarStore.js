// src/store/useSidebarStore.js
import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
