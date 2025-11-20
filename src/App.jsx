import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Vistas
import LandingPage from "./Views/LandingPage";
import Dashboard from "./Views/Dashboard";
import RenombrarPDF from "./Views/RenombrarPDF";
import NovedadesAcademicas from "./Views/NovedadesAcademicas";
import JuiciosEvaluativos from "./Views/JuiciosEvaluativos";
import Perfil from "./components/Perfil";
import Configuracion from "./components/Configuracion";
import RutaProtegida from "./components/RutaProtegida";

function App() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarToken = () => {
      const token = localStorage.getItem("token");
      const esValido = token && token !== "undefined" && token !== "null" && token.trim() !== "";
      setAutenticado(esValido);
    };

    window.addEventListener("storage", verificarToken);
    verificarToken();

    return () => {
      window.removeEventListener("storage", verificarToken);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* Ruta pública principal */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Rutas protegidas dentro del dashboard */}
        <Route
          path="/dashboard"
          element={
            <RutaProtegida autenticado={autenticado}>
              <Dashboard />
            </RutaProtegida>
          }
        >
          <Route path="renombrar-pdf" element={<RenombrarPDF />} />
          <Route path="juicios-evaluativos" element={<JuiciosEvaluativos />} />
          <Route path="novedades-academicas" element={<NovedadesAcademicas />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>

        {/* Redirecciones opcionales para rutas eliminadas */}
        <Route path="/login" element={<Navigate to="/landing" />} />
        <Route path="/registro" element={<Navigate to="/landing" />} />
        <Route path="/recuperar" element={<Navigate to="/landing" />} />
        <Route path="/actualizar" element={<Navigate to="/dashboard/perfil" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
