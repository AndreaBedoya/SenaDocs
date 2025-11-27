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
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  const claseFortaleza = (nivel) =>
    nivel.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  useEffect(() => {
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
      }).then(() => navigate("/landing"));
      return;
    }

    fetch(`http://localhost:4000/api/auth/reset-password/${token}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        setValidando(false);
        if (res.ok && data.success === true) {
          setValido(true);
        } else {
          setValido(false);
          Swal.fire({
            icon: "error",
            title: "Token inválido o expirado",
            text: data.message || "Solicita nuevamente el restablecimiento",
          }).then(() => navigate("/landing"));
        }
      })
      .catch(() => {
        setValidando(false);
        setValido(false);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo verificar el token",
        }).then(() => navigate("/landing"));
      });
  }, [token, navigate]);

  const validarFortaleza = (pass) => {
    if (pass.length < 6) return "Débil";
    if (/[A-Z]/.test(pass) && /\d/.test(pass) && /[^A-Za-z0-9]/.test(pass)) return "Fuerte";
    return "Media";
  };

  const onSubmit = async (e) => {
  e.preventDefault();

  if (!nuevaContrasena || !confirmarContrasena) {
    Swal.fire({
      icon: "warning",
      title: "Campos requeridos",
      text: "Debes ingresar y confirmar tu nueva contraseña",
    });
    return;
  }

  if (nuevaContrasena !== confirmarContrasena) {
    Swal.fire({
      icon: "error",
      title: "Contraseñas no coinciden",
      text: "Verifica que ambas contraseñas sean iguales",
    });
    return;
  }

  if (nuevaContrasena.length < 6) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña muy corta",
      text: "Debe tener al menos 6 caracteres",
    });
    return;
  }

  if (!/[A-Z]/.test(nuevaContrasena) || !/[a-z]/.test(nuevaContrasena) || !/\d/.test(nuevaContrasena)) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña insegura",
      text: "Debe tener al menos una mayúscula, una minúscula y un número",
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
        newPassword: nuevaContrasena,
        confirmPassword: confirmarContrasena,
      }),
    });

    const resultado = await respuesta.json().catch(() => ({}));

    if (respuesta.ok || resultado.success === true) {
      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: resultado.message || "Ya puedes iniciar sesión",
        zIndex: 9999,
      }).then(() => navigate("/landing"));
    } else {
      const mensajeValidator = Array.isArray(resultado.errors)
        ? resultado.errors.map(e => e.msg).join("\n")
        : resultado.message || "Solicitud inválida";

      Swal.fire({
        icon: "error",
        title: "No se pudo actualizar",
        text: mensajeValidator,
      });
      console.error("ResetPassword error:", resultado);
    }
  } catch (err) {
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

  if (!valido) return null;

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
          <p className={`strength strength-${claseFortaleza(validarFortaleza(nuevaContrasena))}`}>
            Fortaleza: {validarFortaleza(nuevaContrasena)}
          </p>

          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            placeholder="Confirma tu contraseña"
            required
          />

          <div className="botonesNuevaContrasena">
            <button type="submit" disabled={cargando}>
              {cargando ? "Actualizando..." : "Actualizar contraseña"}
            </button>
            <button
              type="button"
              className="btn-secundarioNuevaContrasena"
              onClick={() => navigate("/landing")}
            >
              Volver al inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
