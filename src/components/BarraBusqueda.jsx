import { useState } from "react";
import MenuPerfil from "../components/MenuPerfil";
import BotonBuscar from "../Botones/BotonBuscar";
import IconPerfil from "../Icons/IconPerfil";
import IconBuscar from "../Icons/IconBuscar";
import "./BarraBusqueda.css";

export default function BarraBusqueda({ onBuscar, className = "" }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(query.trim());
  };

  return (
    <form className={`barra-busqueda ${className}`} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="🔍 Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="acciones-barra">
        <BotonBuscar
        texto={""}
        Icon={IconBuscar}
        type="submit" 
        className="btn-buscar"
        />

        <MenuPerfil
          texto={""}
          Icon={IconPerfil}
          className="Perfil-busqueda"
        />
      </div>
    </form>
  );
}
