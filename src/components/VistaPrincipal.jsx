import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import "./VistaPrincipal.css";

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
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#subirpdf">Herramientas</a></li>
            <li><a href="#manuales">Manuales</a></li>
            
          </ul>
        </nav>

        {/* ----------------------- */}
        {/*          Inicio         */}
        {/* ----------------------- */}
        <div className="inicio">
          <div className="inicio-contenido">
            <div className="texto">
              <h2>Bienvenido a <strong>SENA</strong>DOCS</h2>
              <p>
                SENA DOCS es más que una herramienta es tu aliado para transformar la gestión académica. 
                Diseñada para funcionarios, instructores y coordinadores, esta plataforma agiliza procesos, 
                mejora la organización documental y potencia la toma de decisiones educativas.
              </p>
              
              <h3>
                Únete a la transformación digital del aprendizaje con una experiencia intuitiva, rápida y confiable.
              </h3>
            </div>

            <div className="imagen">
              <img src="./ImagenSena.jpg" alt="Ilustración institucional del SENA" />
            </div>
          </div>
      </div>
      </header>

      {/* ----------------------- */}
      {/*   FORMULARIO DE SUBIDA */}
      {/* ----------------------- */}

      <section id="subirpdf">
        <h2 className="herramientas">Herramientas</h2>
          <form className="formulario" onSubmit={handleSubmit}>
            <h3>Organiza tus documentos PDF</h3>
            <h4>Renombra y organiza tus archivos PDF con la estructura (Cédula, nombre y apellido)</h4>

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
          {/* ----------------------- */}
          {/*   JUICIOS EVALUATIVOS   */}
          {/* ----------------------- */}
          <div className="evaluativos">
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
          </div>
          {/* ----------------------- */}
          {/*   Novedades Académicas */}
          {/* ----------------------- */}
          
          <div className="novedades">
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
        </div>
      </section>

      {/* ----------------------- */}
      {/*   MANUALES DE USO      */}
      {/* ----------------------- */}
      <section className="manuales">
        <h2>📘 Manuales disponibles</h2>
        <p>Consulta y descarga los manuales para usar correctamente la herramienta.</p>

        <div className="manuales-row">
          {/* Tarjeta 1 */}
          <div className="manual-box">
            <h3>Renombrar PDF</h3>
            <p>Con este manual aprenderás a usar la herramienta para renombrar y organizar tus archivos PDF, de forma rápida y sencilla.</p>
            <a href="/manuales/renombrar.pdf" download className="manual-button">
              Descargar manual
            </a>
        </div>

          {/* Tarjeta 2 */}
          <div className="manual-box">
            <h3>Juicios Evaluativos</h3>
            <p>Con este manual aprenderás a cargar tus archivos en Excel y calcular de manera sencilla los porcentajes de aprobación. </p>
            <a href="/manuales/juicios.pdf" download className="manual-button">
              Descargar manual
            </a>
          </div>

          {/* Tarjeta 3 */}
          <div className="manual-box">
              <h3>Novedades Académicas</h3>
              <p>Con este manual aprenderás a categorizar las novedades registradas de los aprendices para llevar un control más organizado.</p>
              <a href="/manuales/novedades.pdf" download className="manual-button">
                Descargar manual
              </a>
          </div>
        </div>
      </section>
    <footer className="footer">
      <div className="footer-content">
        <p>SENA DOCS © 2025 — Todos los derechos reservados</p>
        <p>Desarrollado por Andrea | Proyecto de gestión documental</p>
      </div>
    </footer>

    </div>
  );
}
