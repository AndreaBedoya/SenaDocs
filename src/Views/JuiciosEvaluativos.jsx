import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import "./JuiciosEvaluativos.css";

// Traducción manual al español
const localeText = {
  noRowsLabel: "Sin resultados",
  columnMenuSortAsc: "Ordenar ASC",
  columnMenuSortDesc: "Ordenar DESC",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar columna",
  columnMenuManageColumns: "Administrar columnas",
  toolbarFilters: "Filtros",
  toolbarExport: "Exportar",
  toolbarDensity: "Densidad",
  filterPanelInputLabel: "Valor",
  filterPanelInputPlaceholder: "Filtrar valor...",
  columnsPanelTextFieldLabel: "Buscar columna",
  columnsPanelTextFieldPlaceholder: "Título de columna",
  columnsPanelShowAllButton: "Mostrar todas",
  columnsPanelHideAllButton: "Ocultar todas",
  footerRowSelected: (count) => `${count} fila(s) seleccionada(s)`,
  footerTotalRows: "Filas totales:",
};

export default function JuiciosEvaluativos() {
  const [excelEvaluativo, setExcelEvaluativo] = useState(null);
  const [juicios, setJuicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });
  const [currentArchivoId, setCurrentArchivoId] = useState(null);

  const handleEvaluativo = async () => {
    if (!excelEvaluativo) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("archivo", excelEvaluativo);

      const res = await fetch("http://localhost:4000/api/juicios-evaluativos/upload-juicios", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.resumen) {
        const conIds = data.resumen.map((j, index) => ({
          id: index + 1,
          totalJuicios: j.juiciosAprobados + j.juiciosPorEvaluar,
          ...j
        }));

        setJuicios(conIds);
        setCurrentArchivoId(data.archivoId);
      }
    } catch (error) {
      console.error("Error procesando juicios:", error);
    } finally {
      setLoading(false);
    }
  };

    const descargarExcel = async (archivoId) => {
        try {
            const res = await fetch(`http://localhost:4000/api/juicios-evaluativos/reporte/excel-tyt/${archivoId}`, {
                method: "GET",
            });

            if (!res.ok) throw new Error("Error al descargar el archivo");

            const blob = await res.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;

            link.setAttribute("download", `Reporte_Juicios_${archivoId}.xlsx`);

            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error en la descarga:", error);
            alert("No se pudo descargar el archivo");
        }
    };

  const columnas = [
    { field: "documento", headerName: "Documento", flex: 1 },
    { field: "nombre", headerName: "Nombre Completo", flex: 2 },
    { field: "ficha", headerName: "Ficha", flex: 1 },
    {
      field: "juiciosAprobados",
      headerName: "Juicios Aprobados",
      flex: 1.5,
      renderCell: (params) => (
        <span>
          {params.row.juiciosAprobados} ({params.row.porcentajeJuiciosEvaluados})
        </span>
      ),
    },
    {
      field: "juiciosPorEvaluar",
      headerName: "Juicios por Evaluar",
      flex: 1.5,
      renderCell: (params) => (
        <span>
          {params.row.juiciosPorEvaluar} ({params.row.porcentajeJuiciosPorEvaluar})
        </span>
      ),
    },
    {
      field: "totalJuicios",
      headerName: "Total de Juicios",
      flex: 1,
    },
    /*{
      field: "acciones",
      headerName: "Acciones",
      flex: 2,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="outlined" size="small" color="primary">
            Editar
          </Button>
          <Button variant="outlined" size="small" color="success">
            Descargar
          </Button>
        </div>
      ),
    },*/
  ];

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
            <Button
              variant="contained"
              onClick={handleEvaluativo}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Procesar Juicios"}
            </Button>
          </div>
        )}
      </div>

      {juicios.length > 0 && (
        <div className="tabla-juicios">
          <h3>Resultados del archivo</h3>
          <DataGrid
            rows={juicios}
            columns={columnas}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowsPerPageOptions={[5, 10, 20, 25, 50, 100]}
            disableRowSelectionOnClick
            autoHeight
            localeText={localeText}
          />
        </div>
      )},
        {juicios.length > 0 && !loading && (
            <div>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => descargarExcel(currentArchivoId)}
                >
                    Descargar
                </Button>
            </div>
        )},
    </div>
  );
}
