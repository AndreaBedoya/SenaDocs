import "./Funcionalidades.css";

const funcionalidades = [
  {
    titulo: "Renombrar PDF",
    descripcion: "Permite subir múltiples archivos PDF y procesarlos automáticamente para asignarles nombres estandarizados basados en datos como número de identificación, nombre completo y ficha; además, organiza los documentos en carpetas por ficha dentro de una carpeta principal definida por el usuario y registra cada archivo en la base de datos, garantizando orden, trazabilidad y reducción de errores humanos en la gestión documental.",
    icono: "📄"
  },
  {
    titulo: "Juicios evaluativos",
    descripcion: "Este módulo permite calcular y dar seguimiento a los juicios evaluativos de los aprendices, mostrando de manera estructurada el porcentaje de avance en los estados Aprobado y Por Evaluar. La información se organiza en una tabla que incluye número de identificación, nombre completo, ficha, cantidad de juicios aprobados, juicios pendientes y el total de juicios registrados. Además, ofrece la opción de descargar los resultados en formato PDF, garantizando un control académico claro, ordenado y fácilmente exportable.",
    icono: "🗂️"
  },
  {
    titulo: "Novedades academicas",
    descripcion: "La funcionalidad de novedades académicas centraliza el registro y análisis de situaciones como retiros, traslados de centro o cambios de ficha, extraídas directamente de documentos en Excel. Cada novedad se vincula al aprendiz correspondiente y se organiza en una tabla que muestra la cantidad y el tipo de novedades registradas. A partir de esta información, el sistema genera gráficas dinámicas que facilitan la visualización de tendencias y el seguimiento académico, ofreciendo un control claro y profesional sobre los procesos administrativos..",
    icono: "👤"
  }
];

export default function SeccionFuncionalidades() {
  return (
    <section className="funcionalidades">
      <h2>Funcionalidades del Sistema</h2>
      <p>Descubre las herramientas disponibles para gestionar, organizar y analizar tus documentos.</p>

      <div className="grid-funcionalidades">
        {funcionalidades.map((item, index) => (
          <div className="card-funcionalidad" key={index}>
            <div className="icono">{item.icono}</div>
            <h3>{item.titulo}</h3>
            <p>{item.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
