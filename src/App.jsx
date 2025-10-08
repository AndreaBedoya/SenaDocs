import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Registro from "./components/Registro";
import Login from "./components/Login";
import VistaPrincipal from "./components/VistaPrincipal";
import Recuperar from "./components/Recuperar";
import Perfil from "./components/Perfil";
import Configuracion from "./components/Configuracion";
import RutaProtegida from "./components/RutaProtegida";

function App() {
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const verificarToken = () => {
      const token = localStorage.getItem("token");
      setAutenticado(!!token);
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

        {/* Recuperación de contraseña (cuando la implementes) */}
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
      </Routes>
    </Router>
  );
}

export default App;
