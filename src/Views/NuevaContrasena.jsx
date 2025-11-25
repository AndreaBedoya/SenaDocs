import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./NuevaContrasena.css";

export default function NuevaContrasena() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const [validando, setValidando] = useState(true);
  const [valido, setValido] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    // Asegura que las alertas queden por encima
    const style = document.createElement("style");
    style.innerHTML = `.swal2-container { z-index: 9999 !important; }`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (!token) {
      setValidando(false);
      setValido(false);
      Swal.fire({
        icon: "error",
        title: "Token faltante",
        text: "El enlace no contiene un token válido",
      }).then(() => navigate("/"));
      return;
    }

    // Validar token con el backend
    fetch(`http://localhost:4000/api/auth/reset-password/${token}`)
      .then(res => res.json())
      .then(data => {
        setValidando(false);
        if (data.success || data.ok) {
          setValido(true);
        } else {
          setValido(false);
          Swal.fire({
            icon: "error",
            title: "Token inválido o expirado",
            text: data.message || "Solicita nuevamente el restablecimiento",
          }).then(() => navigate("/"));
        }
      })
      .catch(() => {
        setValidando(false);
        setValido(false);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo verificar el token",
        }).then(() => navigate("/"));
      });
  }, [token, navigate]);

  const validarFortaleza = (pass) => {
    if (pass.length < 6) return "Débil";
    if (/[A-Z]/.test(pass) && /\d/.test(pass) && /[^A-Za-z0-9]/.test(pass)) return "Fuerte";
    return "Media";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaContrasena) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña requerida",
        text: "Ingresa tu nueva contraseña",
      });
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch("http://localhost:4000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
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
        }).then(() => navigate("/"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: resultado.message || "No se pudo actualizar la contraseña",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
      });
    } finally {
      setCargando(false);
    }
  };

  if (validando) {
    return (
      <div className="reset-container">
        <div className="reset-card">
          <h2>Validando enlace...</h2>
          <p>Por favor espera.</p>
        </div>
      </div>
    );
  }

  if (!valido) {
    return null; // Ya se gestionó con alertas y redirección
  }

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Restablecer contraseña</h2>
        <p>Ingresa tu nueva contraseña. Este enlace puede expirar en pocos minutos.</p>

        <form onSubmit={onSubmit}>
          <label>Nueva contraseña</label>
          <input
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            placeholder="Tu nueva contraseña"
            required
          />
          <p className={`strength strength-${validarFortaleza(nuevaContrasena).toLowerCase()}`}>
            Fortaleza: {validarFortaleza(nuevaContrasena)}
          </p>

          <button type="submit" disabled={cargando}>
            {cargando ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>

        <button className="btn-secundario" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
