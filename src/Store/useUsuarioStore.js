// src/store/useUsuarioStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUsuarioStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      usuario: null,
      token: null,

      // Guardar datos del usuario en el store
      setUsuario: (data) => set({ usuario: data }),

      // Guardar token en el store
      setToken: (token) => set({ token }),

      // Limpiar datos (logout)
      limpiarUsuario: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        set({ usuario: null, token: null });
      },

      // Verificar si está autenticado
      estaAutenticado: () => !!get().token,

      // 🔑 Acción para cargar el perfil desde el backend
      fetchPerfil: async () => {
        const token = get().token || localStorage.getItem("token");
        if (!token) {
          console.warn("No hay token disponible, no se puede cargar el perfil.");
          return;
        }

        try {
          const res = await fetch("http://localhost:4000/api/perfil", {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (!res.ok) {
            console.error("Error HTTP al cargar perfil:", res.status);
            return;
          }

          const data = await res.json();

          if (data.success && data.usuario) {
            set({ usuario: data.usuario });
          } else {
            console.warn("No se pudo cargar el perfil:", data.message || "Respuesta inválida");
          }
        } catch (error) {
          console.error("Error al cargar perfil:", error);
        }
      }
    }),
    {
      name: "usuario-storage",
      // Guardamos solo usuario y token en localStorage
      partialize: (state) => ({ usuario: state.usuario, token: state.token })
    }
  )
);
