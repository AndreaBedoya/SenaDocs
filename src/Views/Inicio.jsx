// src/Views/Inicio.jsx
import { useUsuarioStore } from "../Store/useUsuarioStore";
import "./Inicio.css";

export default function Inicio() {
  const usuario = useUsuarioStore((state) => state.usuario);
  const primerNombre = usuario?.nombre?.split(" ")[0] || "";
  const primerApellido = usuario?.apellido?.split(" ")[0] || "";

  return (
    <div className="inicio">
      <div className="mensaje-bienvenida">
        <h2>¡Hola, {primerNombre} {primerApellido}!</h2>
        <p>Bienvenido a tu espacio en <strong>SENA</strong>DOCS.</p>
      </div>

      {/* Aquí puedes agregar contenido adicional del inicio */}
    </div>
  );
}