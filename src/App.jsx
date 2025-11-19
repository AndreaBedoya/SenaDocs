import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

//vistas
import Registro from "./components/Registro";
import Login from "./components/Login";
import Recuperar from "./components/Recuperar"
import LandingPage from "./Views/LandingPage";
import RutaProtegida from "./components/RutaProtegida";
import Dashboard from "./Views/Dashboard";
import RenombrarPDF from "./Views/RenombrarPDF";
import NovedadesAcademicas from "./Views/NovedadesAcademicas";
import JuiciosEvaluativos from "./Views/JuiciosEvaluativos";
import Perfil from "./components/Perfil";
import Configuracion from "./components/Configuracion";
import ActualizarDatos from "./components/ActualizarDatos";

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

        {/* Rutas públicas */}
        <Route 
        path="/landing" 
        element={<LandingPage />} 
        />

        <Route 
        path="/registro" 
        element={<Registro />} 
        />
        
        <Route
          path="/login"
          element={autenticado ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/recuperar"
          element={autenticado ? <Navigate to="/dashboard" replace /> : <Recuperar/>}
        />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={<RutaProtegida autenticado={autenticado}><Dashboard /></RutaProtegida>}>
          <Route path="renombrar-pdf" element={<RenombrarPDF />} />
          <Route path="juicios-evaluativos" element={<JuiciosEvaluativos />} />
          <Route path="novedades-academicas" element={<NovedadesAcademicas />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>

        {/* Ruta protegida fuera del layout del dashboard */}
        <Route
          path="/actualizar"
          element={
            <RutaProtegida autenticado={autenticado}>
              <ActualizarDatos />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
