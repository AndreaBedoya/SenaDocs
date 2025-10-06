import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Registro from "./components/Registro";
import Login from "./components/Login";
import VistaPrincipal from "./components/VistaPrincipal"; 
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/registro" />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vistaPrincipal" element={<VistaPrincipal />} />
      </Routes>
    </Router>
  );
}

export default App;
