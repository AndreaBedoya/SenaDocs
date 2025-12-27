import "./Manuales.css";

const manuales = [
  {
    titulo: "Manual para organizar PDF",
    descripcion: "Guía para el uso correcto de la funcionalidad de renombrar y organizar PDF.",
    icono: "📘",
    enlace: "/manuales/manual-usuario.pdf"
  },
  {
    titulo: "Manual para juicios evaluativos",
    descripcion: "Guía para el uso correcto de la funcionalidad de juicios evaluativos.",
    icono: "🛠️",
    enlace: "/manuales/manual-administrador.pdf"
  },
  {
    titulo: "Manual para novedades academicas",
    descripcion: "Guía para el uso correcto de la funcionalidad de novedades academicas.",
    icono: "🧰",
    enlace: "/manuales/manual-tecnico.pdf"
  }
];

export default function SeccionAyuda() {
  return (
    <section className="ayuda">
      <h2>Centro de Ayuda Sección Manuales</h2>
      <p>Encuentra guías detalladas para utilizar las funcionalidades y resolver problemas comunes.</p>

      <div className="grid-manuales">
        {manuales.map((manual, index) => (
          <div className="card-manual" key={index}>
            <div className="icono">{manual.icono}</div>
            <h3>{manual.titulo}</h3>
            <p>{manual.descripcion}</p>
            <a href={manual.enlace} target="_blank" rel="noopener noreferrer">
              Descargar PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
