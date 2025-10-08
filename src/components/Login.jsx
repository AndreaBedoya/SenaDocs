import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [identificacion, setIdentificacion] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!identificacion || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor ingresa tu número de identificación y contraseña"
      });
      return;
    }

    const datos = {
      identificacion: identificacion,
      contrasena: password
    };

    try {
      const respuesta = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
      localStorage.setItem("token", resultado.token);
      localStorage.setItem("usuario", JSON.stringify(resultado.usuario));

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Hola ${resultado.usuario.nombre_completo}`,
        confirmButtonText: "Continuar"
      }).then(() => {
        navigate("/VistaPrincipal");
      });
    }
    } catch (error) {
      console.error("❌ Error de conexión:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor"
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta para continuar con <strong>SENA</strong>DOCS.</p>

        <label>Numero de Identificación</label>
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
          <span onClick={() => navigate("/registro")} className="link">
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
}
