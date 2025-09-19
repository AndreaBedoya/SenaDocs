import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import "./UploadForm.css";

export default function UploadForm() {
  const [carpeta, setCarpeta] = useState("");
  const [ficha, setFicha] = useState("");
  const [archivos, setArchivos] = useState([]);

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

      // ✅ Carpetas creadas
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

      // ⚠️ Archivos ignorados
      if (data.errores?.length > 0) {
        Swal.fire({
          title: "⚠️ Archivos ignorados",
          html: `<ul>${data.errores.map(e => `<li>${e.archivo}: ${e.error}</li>`).join("")}</ul>`,
          icon: "warning",
          confirmButtonText: "Revisar"
        });
      }

      // ✅ Éxito general
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

  return (
    <div className="upload-container">
      <div className="steps">
        <h3>¿Cómo subir tus archivos?</h3>
        <ol>
          <li>Escribe el nombre de la carpeta principal</li>
          <li>Escribe el número de la ficha</li>
          <li>Selecciona los archivos PDF</li>
          <li>Haz clic en Enviar</li>
        </ol>
        <h4><strong>NOTA:</strong> Si deseas renombrar los documentos con la estructura recomendada, se sugiere que todos los archivos PDF pertenezcan a una sola ficha.</h4>
      </div>

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

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

