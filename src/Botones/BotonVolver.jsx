import { useNavigate } from "react-router-dom";
import "./BotonVolver.css";

export default function BotonVolver({ destino = "/dashboard", texto = "Volver" }) {
  const navigate = useNavigate();

  return (
    <button className="boton-volver" onClick={() => navigate(destino)}>
      {texto}
    </button>
  );
}
