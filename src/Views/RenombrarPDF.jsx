import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import "./RenombrarPDF.css";

export default function RenombrarPDF() {
  const [carpeta, setCarpeta] = useState("");
  const [ficha, setFicha] = useState("");
  const [archivos, setArchivos] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [] },
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

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "🔒 Sesión no iniciada",
        text: "Debes iniciar sesión para usar esta funcionalidad.",
        icon: "error",
        confirmButtonText: "Ir al login"
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
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "✅ Subida completada",
          text: `Archivos procesados: ${data.cantidad || archivos.length}`,
          icon: "success",
          confirmButtonText: "Aceptar"
        });
        setArchivos([]);
      } else {
        Swal.fire({
          title: "❌ Error",
          text: data.error || "No se pudo procesar los archivos.",
          icon: "error",
          confirmButtonText: "Cerrar"
        });
      }
    } catch (error) {
      console.error("Error al subir archivos:", error);
      Swal.fire({
        title: "❌ Error de conexión",
        text: "No se pudo conectar con el servidor.",
        icon: "error",
        confirmButtonText: "Cerrar"
      });
    }
  };

  return (
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
        <div {...getRootProps({ className: "zona-carga" })}>
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
  );
}
