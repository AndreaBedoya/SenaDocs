import "./Sistema.css";

const manuales = [
  {
    titulo: "Manual de Usuario",
    descripcion: "Guía completa para aprendices y funcionarios sobre el uso de SENADOCS.",
    archivo: "/manuales/ManualUsuario.pdf"
  },
  {
    titulo: "Manual de Administrador",
    descripcion: "Instrucciones para la configuración, mantenimiento y gestión del sistema.",
    archivo: "/manuales/ManualAdministrador.pdf"
  },
  {
    titulo: "Manual de Evaluaciones",
    descripcion: "Explicación detallada del módulo de juicios evaluativos y generación de reportes.",
    archivo: "/manuales/ManualEvaluaciones.pdf"
  }
];

export default function SeccionManuales() {
  return (
    <section className="manuales">
      <h2>Manuales del Sistema</h2>
      <p>Consulta y descarga los manuales oficiales de SENADOCS para conocer cada funcionalidad.</p>

      <div className="grid-manuales">
        {manuales.map((manual, index) => (
          <div className="card-manual" key={index}>
            <h3>{manual.titulo}</h3>
            <p>{manual.descripcion}</p>
            <a href={manual.archivo} target="_blank" rel="noopener noreferrer" className="btn-descargar">
              Descargar
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
