import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registro from "./components/Registro";
import Login from "./components/Login";
import VistaPrincipal from "./components/VistaPrincipal";
import "./index.css";

// Función para verificar si el usuario está autenticado
function estaAutenticado() {
  return !!localStorage.getItem("token");
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/registro" />} />

        {/* Registro solo accesible si no hay sesión */}
        <Route
          path="/registro"
          element={
            estaAutenticado() ? <Navigate to="/vistaPrincipal" /> : <Registro />
          }
        />

        {/* Login solo accesible si no hay sesión */}
        <Route
          path="/login"
          element={
            estaAutenticado() ? <Navigate to="/vistaPrincipal" /> : <Login />
          }
        />

        {/* Vista principal solo accesible si hay sesión */}
        <Route
          path="/vistaPrincipal"
          element={
            estaAutenticado() ? <VistaPrincipal /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
