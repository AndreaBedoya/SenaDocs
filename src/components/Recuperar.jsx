import { useState } from "react";
import Swal from "sweetalert2";
import IconCerrar from "../Icons/IconCerrar.jsx";
import "./Recuperar.css";

export default function RecuperarModal({ visible, onClose }) {
  const [correo, setCorreo] = useState("");
  const [cargando, setCargando] = useState(false);

  if (!visible) return null;

  const enviarEnlace = async () => {
    if (!correo) {
      Swal.fire({
        icon: "warning",
        title: "Correo requerido",
        text: "Ingresa tu correo institucional",
        zIndex: 9999
      });
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch("http://localhost:4000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: correo })
      });

      const resultado = await respuesta.json().catch(() => ({}));

      if (respuesta.ok || resultado.success) {
        Swal.fire({
          icon: "success",
          title: "Enlace enviado",
          text: resultado.message || "Revisa tu correo institucional para restablecer la contraseña",
          zIndex: 9999
        }).then(() => onClose());
      } else {
        Swal.fire({
          icon: "error",
          title: "No se pudo enviar el enlace",
          text: resultado.message || "Intenta nuevamente más tarde",
          zIndex: 9999
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
        zIndex: 9999
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-Recuperar" onClick={onClose}>
      <div className="contenidoRecuperar" onClick={(e) => e.stopPropagation()}>
        <button className="cerrarRecuperar" onClick={onClose}><IconCerrar /></button>

        <form className="recuperar-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Recuperar Contraseña</h2>

          <p>Ingresa tu correo institucional para recibir el enlace de restablecimiento.</p>

          <label>Correo institucional</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ej: usuario@sena.edu.co"
            required
          />

          <div className="pasos-navegacion">
            <button
              className="ButtonSiguiente"
              onClick={enviarEnlace}
              disabled={cargando}
            >
              {cargando ? "Enviando..." : "Enviar enlace"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
