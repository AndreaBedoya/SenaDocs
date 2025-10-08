import { Navigate } from "react-router-dom";

export default function RutaProtegida({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
}
