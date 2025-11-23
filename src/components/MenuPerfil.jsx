import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import BotonCerrarSesion from "../Botones/BotonCerrarSesion";
import "./MenuPerfil.css";

export default function MenuPerfil({ className = "" }) {
  const navigate = useNavigate();
  const usuario = useUsuarioStore((state) => state.usuario);
  const foto = localStorage.getItem("fotoPerfil");
  const primerNombre = usuario?.nombre?.split(" ")[0] || "Perfil";

  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`perfilComponente ${className}`} ref={menuRef}>
      <button className="boton-foto-perfil" onClick={toggleMenu}>
        <img
          src={foto || "default.jpg"}
          alt="Foto de perfil"
          className="avatar-perfil"
        />
      </button>

      {menuVisible && (
        <ul className="perfil-menu">
          <li>
            <button onClick={() => navigate("/dashboard/perfil")}>Perfil</button>
          </li>
          <li>
            <button onClick={() => navigate("/dashboard/configuracion")}>Configuración</button>
          </li>
          <li>
            <BotonCerrarSesion />
          </li>
        </ul>
      )}
    </div>
  );
}
