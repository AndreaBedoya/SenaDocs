import { useState } from "react";
import "./JuiciosEvaluativos.css";

export default function JuiciosEvaluativos() {
  const [excelEvaluativo, setExcelEvaluativo] = useState(null);

  const handleEvaluativo = () => {
    console.log("Procesando archivo:", excelEvaluativo);
    // Aquí puedes agregar lógica para procesar el Excel
  };

  return (
    <div className="evaluativos">
      <div className="juicios">
        <h2>Juicios Evaluativos</h2>
        <p>
          Sube el archivo Excel con los resultados de los aprendices para calcular el porcentaje de aprobación.
        </p>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => setExcelEvaluativo(e.target.files[0])}
        />
        {excelEvaluativo && (
          <div className="archivo-info">
            <p>
              Archivo seleccionado: <strong>{excelEvaluativo.name}</strong>
            </p>
            <button onClick={handleEvaluativo}>Procesar Juicios</button>
          </div>
        )}
      </div>
    </div>
  );
}
