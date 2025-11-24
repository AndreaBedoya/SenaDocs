import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import  IconBell from '../Icons/IconBell.jsx';
import BotonVolver from "../Botones/BotonVolver.jsx";
import "./Configuracion.css";

export default function Perfil() {
  const navigate = useNavigate();
  const usuario = useUsuarioStore((state) => state.usuario);

  if (!usuario) return <p>Cargando perfil...</p>;

  // ✅ Formatear fecha de nacimiento
  const fechaFormateada = usuario.nacimiento
    ? new Date(usuario.nacimiento).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "No registrada";

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
                      <p>{usuario.identificacion || "No registrado"}</p>
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
                    src={usuario.foto || "https://via.placeholder.com/150"}
                    className="configuracion-avatar"
                  />
                </div>
              </div>

              {/* ------------------------------------- */}
              {/* Bloque derecho: información básica */}
              <div className="idioma-tema">
                  <div className="idiomas">
                    <h3>Idiomas</h3>
                    <p>Seleccione el idioma de su preferencia</p>
                    <select name="idioma" defaultValue="es">
                      <option value="es">Español</option>
                      <option value="en">Inglés</option>
                    </select>
                </div>

                <div className="tema">
                  <h3>Tema</h3>
                  <p>Seleccione el tema de su preferencia</p>
                  <select name="tema" defaultValue="claro">
                    <option value="claro">Claro</option>
                    <option value="oscuro">Oscuro</option>
                  </select>
                </div>
              </div>
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
