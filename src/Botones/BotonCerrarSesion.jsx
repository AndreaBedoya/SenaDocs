import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function BotonCerrarSesion() {
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
        // 🧹 Limpiar sesión
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        // 🔄 Forzar reevaluación del estado autenticado en App.jsx
        navigate("/login");
        window.location.reload();
      }
    });
  };

  return (
    <button onClick={cerrarSesion} className="cerrar-sesion-btn">
      Cerrar sesión
    </button>
  );
}
