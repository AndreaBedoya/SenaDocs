import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import "./UploadForm.css";

export default function UploadForm() {
  const [carpeta, setCarpeta] = useState("");
  const [ficha, setFicha] = useState("");
  const [archivos, setArchivos] = useState([]);
  const [excelEvaluativo, setExcelEvaluativo] = useState(null);
  const [excelNovedades, setExcelNovedades] = useState(null);


  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => {
      setArchivos(acceptedFiles);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carpeta || archivos.length === 0) {
      Swal.fire({
        title: "⚠️ Campos incompletos",
        text: "Debes ingresar la carpeta y seleccionar al menos un archivo.",
        icon: "warning",
        confirmButtonText: "Entendido"
      });
      return;
    }

    const formData = new FormData();
    formData.append("carpeta", carpeta);
    formData.append("ficha", ficha);
    archivos.forEach((file) => {
      formData.append("archivos", file);
    });

    try {
      const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.carpetasCreadas?.length > 0) {
        Swal.fire({
          title: "📁 Carpetas creadas",
          html: `<ul>${data.carpetasCreadas.map(f => `<li>${f}</li>`).join("")}</ul>`,
          icon: "success",
          confirmButtonText: "Aceptar"
        });
      } else {
        Swal.fire({
          title: "✅ Todo listo",
          text: "No se crearon carpetas nuevas. Ya existían.",
          icon: "info",
          confirmButtonText: "Aceptar"
        });
      }

      if (data.errores?.length > 0) {
        Swal.fire({
          title: "⚠️ Archivos ignorados",
          html: `<ul>${data.errores.map(e => `<li>${e.archivo}: ${e.error}</li>`).join("")}</ul>`,
          icon: "warning",
          confirmButtonText: "Revisar"
        });
      }

      Swal.fire({
        title: "✅ Subida completada",
        text: `Archivos subidos: ${data.cantidad}`,
        icon: "success",
        confirmButtonText: "Aceptar"
      });

      setArchivos([]);
    } catch (error) {
      console.error("Error al subir archivos:", error);
      Swal.fire({
        title: "❌ Error",
        text: "Hubo un problema al subir los archivos.",
        icon: "error",
        confirmButtonText: "Cerrar"
      });
    }
  };

  const handleEvaluativo = async () => {
    if (!excelEvaluativo) return;

    const formData = new FormData();
    formData.append("archivo", excelEvaluativo);

    try {
      const res = await fetch("http://localhost:4000/api/evaluativos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      Swal.fire({
        title: "📊 Resultados de Juicios",
        html: `
          <p><strong>Aprueban:</strong> ${data.aprobados}%</p>
          <p><strong>Pendientes:</strong> ${data.pendientes}%</p>
          <p><strong>Total:</strong> ${data.total} aprendices</p>
        `,
        icon: "info",
        confirmButtonText: "Aceptar"
      });

      setExcelEvaluativo(null);
    } catch (error) {
      console.error("Error al procesar juicios:", error);
      Swal.fire({
        title: "❌ Error",
        text: "No se pudo procesar el archivo de juicios.",
        icon: "error",
        confirmButtonText: "Cerrar"
      });
    }
  };

const handleNovedades = async () => {
  if (!excelNovedades) return;

  const formData = new FormData();
  formData.append("archivo", excelNovedades);

  try {
    const res = await fetch("http://localhost:4000/api/novedades", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    Swal.fire({
      title: "📈 Novedades Académicas",
      html: `
        <p><strong>Total registros:</strong> ${data.total}</p>
        <ul>
          ${data.categorias.map(c => `<li>${c.tipo}: ${c.cantidad}</li>`).join("")}
        </ul>
      `,
      icon: "info",
      confirmButtonText: "Aceptar"
    });

    setExcelNovedades(null);
  } catch (error) {
    console.error("Error al procesar novedades:", error);
    Swal.fire({
      title: "❌ Error",
      text: "No se pudo procesar el archivo de novedades.",
      icon: "error",
      confirmButtonText: "Cerrar"
    });
  }
};


  return (
    <div className="upload-container">
      {/* ----------------------- */}
      {/*     CABECERA DEL SITIO */}
      {/* ----------------------- */}
      <header className="site-header">
        <nav className="navbar">
          <div className="senadocs">
            <a href="#"><img src="/logoSena.png" alt="Logo SenaDocs" className="logo" /></a>
            <p><strong>SENA</strong>DOCS</p>
          </div>
          <ul className="nav-links">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Herramientas</a></li>
            <li><a href="#">Manuales</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* ----------------------- */}
      {/*   FORMULARIO DE SUBIDA */}
      {/* ----------------------- */}
      <section className="subirpdf">
        <form className="formulario" onSubmit={handleSubmit}>
          <h2>Organiza tus documentos PDF</h2>
          <h3>Renombra y organiza tus archivos PDF con la estructura (Cédula, nombre y apellido)</h3>

          <label>Nombre de la carpeta</label>
          <input
            type="text"
            placeholder="Ej: Certificación"
            value={carpeta}
            onChange={(e) => setCarpeta(e.target.value)}
            required
          />

          <label>Número de la ficha</label>
          <input
            type="text"
            placeholder="Ej: 2828866"
            value={ficha}
            onChange={(e) => setFicha(e.target.value)}
          />

          <label>Selecciona los archivos PDF</label>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Arrastra tus archivos aquí o haz clic para seleccionarlos</p>
          </div>

          <ul>
            {archivos.map((file) => (
              <li key={file.path || file.name}>{file.name}</li>
            ))}
          </ul>

          <div className="boton">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </section>

      {/* ----------------------- */}
      {/*   JUICIOS EVALUATIVOS   */}
      {/* ----------------------- */}
      <section className="evaluativos">
        <div className=" juicios">
            <h2>Juicios Evaluativos</h2>
            <p>Sube el archivo Excel con los resultados de los aprendices para calcular el porcentaje de aprobación.</p>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setExcelEvaluativo(e.target.files[0])}
            />

            {excelEvaluativo && (
              <div className="archivo-info">
                <p>Archivo seleccionado: <strong>{excelEvaluativo.name}</strong></p>
                <button onClick={handleEvaluativo}>Procesar Juicios</button>
              </div>
            )}
        </div>
      </section>
      {/* ----------------------- */}
      {/*   Novedades Académicas */}
      {/* ----------------------- */}
      
      <section className="novedades">
        <div className="academicas">
          <h2>Novedades Académicas</h2>
            <p>Sube el archivo Excel con las novedades registradas por los aprendices para visualizar su distribución por categoría.</p>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setExcelNovedades(e.target.files[0])}
            />

            {excelNovedades && (
              <div className="archivo-info">
                <p>Archivo seleccionado: <strong>{excelNovedades.name}</strong></p>
                <button onClick={handleNovedades}>Visualizar Novedades</button>
              </div>
             )}
         {/* renderizar la gráfica más adelante */}
       </div>
      </section>

    </div>
  );
}
