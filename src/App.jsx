import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import Swal from 'sweetalert2';


function App() {
  const [msg, setMsg] = useState("Cargando...");

  useEffect(() => {
    fetch("http://localhost:4000/api/hello")
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch((err) => {
        console.error("Error al conectar con el backend:", err);
        setMsg("❌ No se pudo conectar con el backend");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{msg}</h1>
      <UploadForm />
    </div>
  );
}

export default App;
