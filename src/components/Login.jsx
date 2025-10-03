import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí luego agregas validación y conexión con backend
    navigate("/vistaPrincipal"); // Por ahora, redirige al sistema
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta para continuar con <strong>SENA</strong>DOCS.</p>

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
