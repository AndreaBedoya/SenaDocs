import "./Reglas.css";

const reglas = [
  { numero: "01", titulo: "NO MODIFICAR", descripcion: "El nombre y la ubicación del PDF no deben alterarse." },
  { numero: "02", titulo: "ARCHIVO ÚNICO", descripcion: "Cada PDF debe contener un solo conjunto de documentos." },
  { numero: "03", titulo: "COMPATIBLE", descripcion: "El PDF debe ser legible y sin contraseñas que lo bloqueen." },
  { numero: "04", titulo: "RESPALDO", descripcion: "Mantén una copia del PDF original como respaldo." },
  { numero: "05", titulo: "FORMATO PDF", descripcion: "Solo se aceptan archivos en formato PDF, no imágenes ni Word." },
  { numero: "06", titulo: "NOMBRE CLARO", descripcion: "Evita nombres genéricos como 'documento.pdf' o 'scan1.pdf'." },
  { numero: "07", titulo: "SIN DUPLICADOS", descripcion: "No subas el mismo archivo más de una vez." },
  { numero: "08", titulo: "VERIFICACIÓN PREVIA", descripcion: "Revisa que el contenido del PDF sea el correcto antes de enviarlo." },
  { numero: "09", titulo: "USO RESPONSABLE", descripcion: "Utiliza los documentos únicamente para  y administrativos autorizados." }
];



export default function SeccionReglas() {
  return (
    <section className="reglas">
      <h2>Reglas de SENADOCS</h2>
      <p>Estas normas garantizan el correcto funcionamiento del sistema y la integridad de los documentos.</p>

      <div className="lista-reglas">
        {reglas.map((regla, index) => (
          <div className="card-regla" key={index}>
            <div className={`numero numero-${regla.numero}`}>{regla.numero}</div>
            <div className="contenido">
              <h3>{regla.titulo}</h3>
              <p>{regla.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
