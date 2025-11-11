import { useNavigate } from "react-router-dom";
import BotonCerrarSesion from "../Botones/BotonCerrarSesion";
import IconPerfil from "../Icons/IconPerfil.jsx";
import "./MenuPerfil.css";

export default function MenuPerfil({
  texto = "Perfil",
  Icon = IconPerfil,
  className = "",
  onClick
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/dashboard/perfil"); // ✅ Redirige al perfil dentro del dashboard
    }
  };

  return (
    <div className="perfilComponente">
      {/* Botón principal que puede usarse como disparador del menú */}
      <button className={`${className}`} onClick={handleClick}>
        {Icon && <Icon />}
        <span>{texto}</span>
      </button>

      {/* Menú desplegable */}
      <ul className="perfil-menu">
        <li>
          <button onClick={() => navigate("/dashboard/perfil")}>
            Perfil
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/dashboard/configuracion")}>
            Configuración
          </button>
        </li>
        <li>
          <BotonCerrarSesion />
        </li>
      </ul>
    </div>
  );
}
