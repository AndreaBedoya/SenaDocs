import { useNavigate } from "react-router-dom";
import "./BotonPerfil.css";

export default function BotonPerfil({ texto = "Perfil", Icon = null, className = "", onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/perfil");
    }
  };

  return (
    <button className={`boton-perfil-base ${className}`} onClick={handleClick}>
      {Icon && <Icon />}
      <span>{texto}</span>
    </button>
  );
}
