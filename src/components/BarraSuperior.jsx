// src/components/BarraSuperior.jsx
import { useUsuarioStore } from "../Store/useUsuarioStore";
import MenuPerfil from "../components/MenuPerfil";
import IconPerfil from "../Icons/IconPerfil";
import "./BarraSuperior.css"; 

export default function BarraSuperior({ className = "" }) {
  const usuario = useUsuarioStore((state) => state.usuario);
  const primerNombre = usuario?.nombre?.split(" ")[0] || "";

  return (
    <div className={`barra-superior ${className}`}>
      <div className="mensaje-bienvenida">
        <h2>¡Hola {`${usuario?.nombre || ""} ${usuario?.apellido || ""}`.trim() || "Nombre no registrado"}!</h2>
      </div>

      <div className="acciones-barra">
        <MenuPerfil
          texto={""}
          Icon={IconPerfil}
          className="Perfil-busqueda"
        />
      </div>
    </div>
  );
}
