import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./BotonCerrarSesion.css";

export default function BotonCerrarSesion({ texto = "Cerrar sesión", Icon, className = "" }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Estás segura de que quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
        window.location.reload();
      }
    });
  };

  return (
    <button onClick={cerrarSesion} className={`.cerrar-sesion-btn ${className}`}>
      {Icon && <Icon />}
      <span>{texto}</span>
    </button>
  );
}
