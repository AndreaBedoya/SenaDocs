import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import BotonVolver from "../Botones/BotonVolver.jsx";
import "./Configuracion.css";

export default function Perfil() {
  const foto = localStorage.getItem("fotoPerfil");
  const navigate = useNavigate();
  const usuario = useUsuarioStore((state) => state.usuario);

  if (!usuario) return <p>Cargando perfil...</p>;

  const handleActualizar = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/perfil/contrasena/${usuario.identificacion}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contraseñaAnterior,
        nuevaContraseña
      })
    });

    const resultado = await response.json();

    if (response.ok) {
      alert("Contraseña actualizada correctamente");
      setContraseñaAnterior("");
      setNuevaContraseña("");
      navigate("/dashboard");
    } else {
      alert(resultado.mensaje || "Error al actualizar la contraseña");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un problema al conectar con el servidor");
  }
};

  return (
    <div className="contenedorConfiguracion">
      <div className="configuracion">
        <h2> Configuración</h2>
          {/* --------------------------- */}
          {/* Panel intermedio izquierdo  */}
          <div className="informacion-configuracion">
            <div className="foto-contrasena">
              <div className="configuracion-middle">
                {/* Bloque izquierdo: Foto + Nombre */}
                <div>
                  <div className="columnas-configuracion">
                      <label>Documento</label>
                      <p>{usuario.documento || "No registrado"}</p>
                  </div>
                  <div className="columnas-configuracion">
                      <label>Correo institucional</label>
                      <p>{usuario.correo || "No registrado"}</p>
                  </div>
                  <div className="columnas-configuracion">
                      <label>Teléfono</label>
                      <p>{usuario.telefono || "No registrado"}</p>
                  </div>
                </div>
                <div className="foto-configuracion">
                  <img
                    src={foto || "default.jpg"}
                    className="configuracion-avatar"
                  />
                </div>
              </div>

              {/* ------------------------------------- */}
              
              <div className="botones-configuracion">
                <button className="volverConfiguracion"><BotonVolver/></button>
                <button className="boton-actualizar" onClick={handleActualizar}>
                  Actualizar datos
                </button>
              </div>
            </div> 
          </div>
      </div>
    </div>
  );
}
