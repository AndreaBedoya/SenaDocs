import { useState } from "react";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import BotonVolver from "../Botones/BotonVolver.jsx";
import ActualizarDatosModal from "./ActualizarDatos";
import "./Perfil.css";

export default function Perfil() {
  const usuario = useUsuarioStore((state) => state.usuario);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);

  if (!usuario) return <p>Cargando perfil...</p>;

  const fechaFormateada = usuario.nacimiento
    ? new Date(usuario.nacimiento).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "No registrada";

  return (
    <div className="perfil-container">
      <div className="perfil-wrapper">
        {/* Panel intermedio */}
        <div className="perfil">
          {/* Bloque izquierdo: Foto + Nombre */}
          <div className="perfil-identidad">
            <img
              src={usuario.foto || "https://via.placeholder.com/150"}
              alt="Foto de perfil"
              className="perfil-avatar"
            />
            <h2>{usuario.nombre_completo || "Nombre no registrado"}</h2>
            <div className="columnasIdentidad">
              <p className="cargo">{usuario.cargo || "No registrado"}</p>
              <p>{usuario.funciones || "Sin funciones registradas"}</p>
            </div>
          </div>

          {/* Bloque derecho: información básica */}
          <div className="DatosPersonales">
            <h3>Datos personales</h3>
            <div className="informacionPerfil">
              <div className="filas-perfil">
                <div className="columnas-perfil">
                  <label>Correo institucional</label>
                  <p>{usuario.correo || "No registrado"}</p>
                </div>
                <div className="columnas-perfil">
                  <label>Ciudad de residencia</label>
                  <p>{usuario.ciudad || "No registrado"}</p>
                </div>
              </div>

              <div className="filas-perfil">
                <div className="columnas-perfil">
                  <label>Fecha de nacimiento</label>
                  <p>{fechaFormateada}</p>
                </div>
                <div className="columnas-perfil">
                  <label>Tipo de sangre</label>
                  <p>{usuario.sangre || "No registrada"}</p>
                </div>
              </div>

              <div className="filas-perfil">
                <div className="columnas-perfil">
                  <label>Teléfono</label>
                  <p>{usuario.telefono || "No registrado"}</p>
                </div>
                <div className="columnas-perfil">
                  <label>Documento</label>
                  <p>{usuario.identificacion || "No registrado"}</p>
                </div>
              </div>
            
              <div className="filas-perfil">
                <div className="columnas-perfil">
                  <label>Nombre del contacto</label>
                  <p>{usuario.nombre_emergencia || "No registrado"}</p>
                </div>
                <div className="columnas-perfil">
                  <label>Teléfono del contacto</label>
                  <p>{usuario.telefono_emergencia || "No registrado"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Panel inferior */}
        <div className="botones-perfil">
          <BotonVolver />
          <button className="actualizarPerfil" onClick={() => setMostrarActualizar(true)}>
            Actualizar datos
          </button>
          {/* Modal de actualización */}
          <ActualizarDatosModal
            visible={mostrarActualizar}
            onClose={() => setMostrarActualizar(false)}
          />
        </div>
      </div>  
    </div>
  );
}
