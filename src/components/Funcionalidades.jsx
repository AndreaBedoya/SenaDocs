import { useState } from "react";
import "./Funcionalidades.css";

export default function Funcionalidades() {
  const funcionalidades = [
    {
      titulo: "Renombrar PDF",
      descripcion: "Esta funcionalidad permite subir documentos exclusivamente en formato PDF, siempre que el nombre del archivo incluya tres elementos obligatorios: número de documento, nombre completo (nombres y apellidos), y número de ficha. Esta estructura es esencial para que el sistema procese correctamente el archivo. Se creó con el objetivo de reducir el tiempo invertido en renombrar archivos manualmente, una tarea que antes se hacía uno por uno y que ahora se automatiza para mejorar la eficiencia institucional."
    },
    {
      titulo: "Juicios Evaluativos",
      descripcion: "Carga y análisis de resultados académicos para calcular porcentajes de aprobación."
    },
    {
      titulo: "Novedades Académicas",
      descripcion: "Registro y visualización de novedades académicas de los aprendices."
    }
  ];

  return (
    <div className="contenedorFuncionalidades">
      {funcionalidades.map((item, index) => (
        <FlipCard key={index} titulo={item.titulo} descripcion={item.descripcion} />
      ))}
    </div>
  );
}

function FlipCard({ titulo, descripcion }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h3>{titulo}</h3> {/* ✅ Solo el título */}
        </div>
        <div className="flip-card-back">
          <p>{descripcion}</p> {/* ✅ Descripción al girar */}
        </div>
      </div>
    </div>
  );
}
