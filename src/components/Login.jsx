import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import IconCerrar from "../Icons/IconCerrar.jsx"; 
import "./Login.css";

export default function LoginModal({ visible, onClose, onRegistroClick, onRecuperarClick }) {
  const navigate = useNavigate();
  const [identificacion, setIdentificacion] = useState("");
  const [password, setPassword] = useState("");
  const setUsuario = useUsuarioStore((state) => state.setUsuario);

  useEffect(() => {
    if (!visible) return;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }, [visible]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identificacion || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor ingresa tu número de identificación y contraseña"
      });
      return;
    }

    const datos = { identificacion, contrasena: password };

    try {
      const respuesta = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok && resultado.token && resultado.usuario) {
        localStorage.setItem("token", resultado.token);
        setUsuario(resultado.usuario);

        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Hola ${resultado.usuario.nombre || resultado.usuario.nombre_completo}`,
          confirmButtonText: "Continuar"
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales inválidas",
          text: resultado.error || "Identificación o contraseña incorrecta"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor"
      });
    }
  };

  if (!visible) return null;

  return (
    <div className="modal-Login" onClick={onClose}>
      <div className="contenidoLogin" onClick={(e) => e.stopPropagation()}>
        <button className="cerrarLogin" onClick={onClose}><IconCerrar /></button>

        <form className="login-form" onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          <p>Accede a tu cuenta para continuar con <strong>SENA</strong>DOCS.</p>

          <label>Número de Identificación</label>
          <input
            type="text"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            placeholder="Ej: 1055688999"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            required
          />

          <button type="submit">Ingresar</button>

          <p className="registro-link">
            ¿No tienes cuenta?{" "}
            <span onClick={onRegistroClick} className="link">
              Regístrate aquí
            </span>
          </p>
          <p className="recuperar-link">
            ¿Olvidaste tu contraseña?{" "}
            <span onClick={onRecuperarClick} className="link">
              Recupérala aquí
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}
