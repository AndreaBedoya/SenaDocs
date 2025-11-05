import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Registro from "./components/Registro";
import Login from "./components/Login";
import Recuperar from "./components/Recuperar";
import Perfil from "./components/Perfil";
import Configuracion from "./components/Configuracion";
import RutaProtegida from "./components/RutaProtegida";
import ActualizarDatos from "./components/ActualizarDatos";
import LandingPage from "./Views/LandingPage";
import Dashboard from "./Views/Dashboard";
import RenombrarPDF from "./Views/RenombrarPDF";
import NovedadesAcademicas from "./Views/NovedadesAcademicas";
import JuiciosEvaluativos from "./Views/JuiciosEvaluativos";

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
        {/* Página inicial: Registro */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* Registro siempre accesible */}
        <Route path="/registro" element={<Registro />} />

        {/* Login solo si no hay sesión */}
        <Route
          path="/login"
          element={
            autenticado ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        {/* Recuperación de contraseña solo si no hay sesión */}
        <Route
          path="/recuperar"
          element={
            autenticado ? <Navigate to="/login" replace /> : <Recuperar />
          }
        />

        {/*landing principal protegida */}
        <Route
          path="/landing"
          element={
            <RutaProtegida>
              <LandingPage />
            </RutaProtegida>
          }
        />

        {/* Perfil protegido */}
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />

        {/* Configuración protegida */}
        <Route
          path="/configuracion"
          element={
            <RutaProtegida>
              <Configuracion />
            </RutaProtegida>
          }
        />

        {/* ✅ Nueva ruta protegida para actualizar datos */}
        <Route
          path="/actualizar"
          element={
            <RutaProtegida>
              <ActualizarDatos />
            </RutaProtegida>
          }
        />

        {/* Dashboard con rutas anidadas */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="renombrar-pdf" element={<RenombrarPDF />} />
          <Route path="juicios-evaluativos" element={<JuiciosEvaluativos />} />
          <Route path="novedades-academicas" element={<NovedadesAcademicas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
