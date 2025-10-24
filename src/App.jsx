import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Registro from "./components/Registro";
import Login from "./components/Login";
import VistaPrincipal from "./components/VistaPrincipal";
import Recuperar from "./components/Recuperar";
import Perfil from "./components/Perfil";
import Configuracion from "./components/Configuracion";
import RutaProtegida from "./components/RutaProtegida";
import ActualizarDatos from "./components/ActualizarDatos"; 
import Dashboard from "./components/Dashboard";

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
    <Router>
      <Routes>
        {/* Página inicial: Registro */}
        <Route path="/" element={<Navigate to="/registro" />} />

        {/* Registro siempre accesible */}
        <Route path="/registro" element={<Registro />} />

        {/* Login solo si no hay sesión */}
        <Route
          path="/login"
          element={
            autenticado ? <Navigate to="/vistaPrincipal" replace /> : <Login />
          }
        />


        <Route path="/dashboard" element={<Dashboard />} />


        {/* Recuperación de contraseña solo si no hay sesión */}
        <Route
          path="/recuperar"
          element={
            autenticado ? <Navigate to="/login" replace /> : <Recuperar />
          }
        />

        {/* Vista principal protegida */}
        <Route
          path="/vistaPrincipal"
          element={
            <RutaProtegida>
              <VistaPrincipal />
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
      </Routes>
    </Router>
  );
}

export default App;
