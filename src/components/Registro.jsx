import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Registro.css";

export default function Registro() {
  const navigate = useNavigate();
  const [Identificacion, setIdentificacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Por favor verifica que ambas contraseñas sean iguales"
      });
      return;
    }

    const datos = {
      identificacion: Identificacion,
      nombre_completo: nombre,
      correo: correo,
      contrasena: password
    };

    try {
      const respuesta = await fetch("http://localhost:4000/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Tu cuenta ha sido creada correctamente",
          confirmButtonText: "Iniciar sesión"
        }).then(() => {
          navigate("/Login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: resultado.error || "No se pudo registrar el usuario"
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
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleRegistro}>
        <h2>Registro en <strong>SENA</strong>DOCS</h2>
        <p>Crea tu cuenta para acceder a todas las funcionalidades.</p>

        <label>Numero de identificación</label>
        <input
          type="text"
          value={Identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          placeholder="Ej: 15248769241"
          required
        />

        <label>Nombre completo</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Andrea Bedoya"
          required
        />

        <label>Correo institucional</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ej: andrea@sena.edu.co"
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          required
        />

        <label>Confirmar contraseña</label>
        <input
          type="password"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          placeholder="Repite tu contraseña"
          required
        />

        <button type="submit">Registrarse</button>

        <p className="login-link">
          ¿Ya tienes cuenta?{" "}
          <span onClick={() => navigate("/Login")} className="link">
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
}
