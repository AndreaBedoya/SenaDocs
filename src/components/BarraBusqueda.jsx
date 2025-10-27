import { useState } from "react";
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
      <button type="submit">Buscar</button>
    </form>
  );
}
