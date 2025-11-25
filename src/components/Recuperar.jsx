import { useState } from "react";
import Swal from "sweetalert2";
import IconCerrar from "../Icons/IconCerrar.jsx";
import "./Recuperar.css";

export default function RecuperarModal({ visible, onClose }) {
  const [paso, setPaso] = useState(1);
  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  const enviarCodigo = async () => {
    if (!correo) {
      Swal.fire({
        icon: "warning",
        title: "Correo requerido",
        text: "Ingresa tu correo institucional",
        zIndex: 9999
      });
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:4000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: correo })
      });

      const resultado = await respuesta.json();

      if (respuesta.ok || resultado.success) {
        Swal.fire({
          icon: "success",
          title: "Código enviado",
          text: resultado.message || "Revisa tu correo institucional",
          zIndex: 9999
        });
        setPaso(2);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: resultado.message || "No se pudo enviar el código",
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
    }
  };

  const verificarCodigo = async () => {
    if (!codigo) {
      Swal.fire({
        icon: "warning",
        title: "Código requerido",
        text: "Ingresa el código recibido",
        zIndex: 9999
      });
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:4000/api/auth/reset-password/${codigo}`);
      const resultado = await respuesta.json();

      if (respuesta.ok || resultado.success) {
        Swal.fire({
          icon: "success",
          title: "Código válido",
          text: resultado.message || "Puedes continuar",
          zIndex: 9999
        });
        setPaso(3);
      } else {
        Swal.fire({
          icon: "error",
          title: "Código inválido",
          text: resultado.message || "Token inválido o expirado",
          zIndex: 9999
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo verificar el código",
        zIndex: 9999
      });
    }
  };

  const actualizarContrasena = async () => {
    if (!nuevaContrasena) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña requerida",
        text: "Ingresa tu nueva contraseña",
        zIndex: 9999
      });
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:4000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: codigo,
          newPassword: nuevaContrasena
        })
      });

      const resultado = await respuesta.json();

      if (respuesta.ok || resultado.success) {
        Swal.fire({
          icon: "success",
          title: "Contraseña actualizada",
          text: resultado.message || "Ya puedes iniciar sesión",
          zIndex: 9999
        }).then(() => onClose());
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: resultado.message || "No se pudo actualizar la contraseña",
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
    }
  };

  const retrocederPaso = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  if (!visible) return null;

  return (
    <div className="modal-Recuperar" onClick={onClose}>
      <div className="contenidoRecuperar" onClick={(e) => e.stopPropagation()}>
        <button className="cerrarRecuperar" onClick={onClose}><IconCerrar /></button>

        <form className="recuperar-form paso-activo" onSubmit={(e) => e.preventDefault()}>
          <h2>Recuperar Contraseña</h2>

          <div className="barra-progreso">
            <div className={`paso ${paso >= 1 ? "activo" : ""}`}>1</div>
            <div className={`paso ${paso >= 2 ? "activo" : ""}`}>2</div>
            <div className={`paso ${paso === 3 ? "activo" : ""}`}>3</div>
          </div>

          {paso === 1 && (
            <>
              <p>Ingresa tu correo institucional para recibir el código de verificación.</p>
              <label>Correo institucional</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ej: usuario@sena.edu.co"
                required
              />
              <div className="pasos-navegacion">
                <button className="ButtonSiguiente" onClick={enviarCodigo}>Siguiente</button>
              </div>
            </>
          )}

          {paso === 2 && (
            <>
              <p>Ingresa el código que recibiste en tu correo institucional.</p>
              <label>Código de verificación</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Código recibido"
                required
              />
              <div className="pasos-navegacion">
                <button className="ButtonAtras" onClick={retrocederPaso}>Atrás</button>
                <button className="ButtonSiguiente" onClick={verificarCodigo}>Siguiente</button>
              </div>
            </>
          )}

          {paso === 3 && (
            <>
              <p>Ingresa tu nueva contraseña para actualizarla.</p>
              <label>Nueva contraseña</label>
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                placeholder="Tu nueva contraseña"
                required
              />
              <div className="pasos-navegacion">
                <button className="ButtonAtras" onClick={retrocederPaso}>Atrás</button>
                <button className="ButtonSiguiente" onClick={actualizarContrasena}>Actualizar contraseña</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
