// src/components/BotonPerfil.jsx
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import "./BotonPerfil.css";

export default function BotonPerfil({ className = "", onClick }) {
  const navigate = useNavigate();
  const usuario = useUsuarioStore((state) => state.usuario);
  const foto = localStorage.getItem("fotoPerfil");
  const primerNombre = usuario?.nombre?.split(" ")[0] || "Perfil";

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/dashboard/perfil");
    }
  };

  return (
    <button className={`boton-perfil-base ${className}`} onClick={handleClick}>
      <img
        src={foto || "default.jpg"}
        alt="Foto de perfil"
        className="avatar-perfil"
      />
      <span className="nombre-usuario">{primerNombre}</span>
    </button>
  );
}
