import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

export default function Registro() {
  const navigate = useNavigate();
  const [Identificacion, setIdentificacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const handleRegistro = (e) => {
    e.preventDefault();
    // Aquí luego agregas validación y conexión con backend
    navigate("/vistaPrincipal"); // Por ahora, continúa al sistema
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




