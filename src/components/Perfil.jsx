import { useState } from "react";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import BotonVolver from "../Botones/BotonVolver.jsx";
import ActualizarDatosModal from "./ActualizarDatos";
import "./Perfil.css";

export default function Perfil() {
  const foto = localStorage.getItem("fotoPerfil");
  const usuario = useUsuarioStore((state) => state.usuario);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-wrapper">
        {/* Panel intermedio */}
        <div className="perfil">
          {/* Bloque izquierdo: Foto + Nombre */}
          <div className="perfil-identidad">
            <img
              src={foto || "default.jpg"}
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
                  <label>Teléfono</label>
                  <p>{usuario.telefono || "No registrado"}</p>
                </div>
                <div className="columnas-perfil">
                  <label>Documento</label>
                  <p>{usuario.documento || "No registrado"}</p>
                </div>
              </div>

              <div className="filas-perfil">
                <div className="columnas-perfil">
                  <label>Correo institucional</label>
                  <p>{usuario.correo || "No registrado"}</p>
                </div>
              </div>

              <div className="filas-perfil">
                <div className="columnas-perfil">
                  <label>Ciudad de residencia</label>
                  <p>{usuario.ciudad || "No registrado"}</p>
                </div>
                <div className="columnas-perfil">
                  <label>Fecha de nacimiento</label>
                  <p>{usuario.fecha_nacimiento || "No registrada"}</p>
                </div>
              </div>

              <div className="filas-perfil">
                <div className="columnas-perfil">
                  <label>Centro de formación</label>
                  <p>{usuario.centro_formacion || "No registrado"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel inferior */}
        <div className="botones-perfil">
          <BotonVolver />
          <button
            className="actualizarPerfil"
            onClick={() => setMostrarActualizar(true)}
          >
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
