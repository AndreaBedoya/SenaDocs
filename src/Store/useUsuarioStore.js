// src/store/useUsuarioStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUsuarioStore = create(
  persist(
    (set, get) => ({
      // ✅ Estado inicial del usuario
      usuario: null,

      // ✅ Guardar datos del usuario
      setUsuario: (data) => set({ usuario: data }),

      // ✅ Limpiar datos del usuario (logout)
      limpiarUsuario: () => set({ usuario: null }),

      // ✅ Verificar si el usuario está autenticado
      estaAutenticado: () => !!get().usuario
    }),
    {
      name: "usuario-storage", // Se guarda automáticamente en localStorage
      partialize: (state) => ({ usuario: state.usuario }) // Solo guarda el estado del usuario
    }
  )
);
