import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress } from "@mui/material";
import "./NovedadesAcademicas.css";

const localeText = {
    noRowsLabel: "Sin resultados",
    columnMenuSortAsc: "Ordenar ASC",
    columnMenuSortDesc: "Ordenar DESC",
    columnMenuFilter: "Filtrar",
    footerRowSelected: (count) => `${count} fila(s) seleccionada(s)`,
    footerTotalRows: "Filas totales:",
};

export default function NovedadesAcademicas() {
    const [excelNovedades, setExcelNovedades] = useState(null);
    const [datosTabla, setDatosTabla] = useState([]);
    const [archivoListo, setArchivoListo] = useState(null);
    const [loading, setLoading] = useState(false);

    const columnas = [
        { field: "novedad", headerName: "Novedad Académica", flex: 2 },
        {
            field: "cantidad",
            headerName: "Cantidad",
            flex: 1,
            type: "number",
            align: "center",
            headerAlign: "center"
        },
        {
            field: "porcentaje",
            headerName: "Porcentaje",
            flex: 1,
            align: "right",
            headerAlign: "right",
            renderCell: (params) => `${(params.value * 100).toFixed(2)}%`
        },
    ];

    const handleNovedades = async () => {
        if (!excelNovedades) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("archivo", excelNovedades);

        try {
            const res = await fetch("http://localhost:4000/api/novedades-academicas/reporte", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Error en el servidor");

            const data = await res.json();

            if (data.resumen) {
                const filas = data.resumen.map((item, index) => ({
                    id: index + 1,
                    novedad: item.novedad,
                    cantidad: item.cantidad,
                    porcentaje: item.porcentaje
                }));

                setDatosTabla(filas);

                setArchivoListo({
                    base64: data.archivoBase64,
                    name: data.fileName
                });
            }
        } catch (error) {
            console.error("Error procesando novedades:", error);
            alert("No se pudo procesar el archivo. Asegúrate de que el backend esté enviando el JSON correctamente.");
        } finally {
            setLoading(false);
        }
    };

    const descargarExcel = () => {
        if (!archivoListo) return;

        const link = document.createElement("a");
        link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${archivoListo.base64}`;
        link.download = archivoListo.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section>
            <div className="novedades">
                <div className="academicas">
                    <h2>Novedades Académicas</h2>
                    <p>
                        Sube el archivo Excel con las novedades registradas para calcular porcentajes y generar el reporte con gráficas.
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
                            <Button
                                variant="contained"
                                onClick={handleNovedades}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                        Procesando...
                                    </>
                                ) : (
                                    "Visualizar Novedades"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {datosTabla.length > 0 && (
                <div className="tabla-resultados" style={{ padding: "20px", marginTop: "20px" }}>
                    <h3>Vista Previa de Resultados</h3>
                    <div style={{ width: "100%", backgroundColor: "white" }}>
                        <DataGrid
                            rows={datosTabla}
                            columns={columnas}
                            autoHeight
                            disableRowSelectionOnClick
                            localeText={localeText}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10 } },
                            }}
                            pageSizeOptions={[5, 10, 20]}
                        />
                    </div>

                    <div style={{ marginTop: "30px", textAlign: "center", paddingBottom: "40px" }}>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            onClick={descargarExcel}
                        >
                            Descargar Excel con Gráficas
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
}