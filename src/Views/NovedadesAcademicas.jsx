import { useState } from "react";
import "./NovedadesAcademicas.css";

export default function NovedadesAcademicas() {
  const [excelNovedades, setExcelNovedades] = useState(null);

  const handleNovedades = () => {
    console.log("Procesando archivo:", excelNovedades);
    // Aquí puedes agregar lógica para procesar el Excel
  };

  return (
    <section>
      <div className="novedades">
        <div className="academicas">
          <h2>Novedades Académicas</h2>
          <p>
            Sube el archivo Excel con las novedades registradas por los aprendices para visualizar su distribución por categoría.
          </p>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setExcelNovedades(e.target.files[0])}
          />
          {excelNovedades && (
            <div className="archivo-info">
              <p>
                Archivo seleccionado: <strong>{excelNovedades.name}</strong>
              </p>
              <button onClick={handleNovedades}>Visualizar Novedades</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
