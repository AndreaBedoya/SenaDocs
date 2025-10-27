import { useState } from "react";
import { useDropzone } from "react-dropzone";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Carpeta:", carpeta);
    console.log("Ficha:", ficha);
    console.log("Archivos:", archivos);
    // Aquí puedes agregar lógica para enviar los archivos
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
