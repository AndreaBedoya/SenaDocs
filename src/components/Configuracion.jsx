import { useState } from "react";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import BotonVolver from "../Botones/BotonVolver.jsx";
import ActualizarDatosModal from "./ActualizarDatos";
import "./Configuracion.css";

export default function Configuracion() {
  const foto = localStorage.getItem("fotoPerfil");
  const usuario = useUsuarioStore((state) => state.usuario);

  const [mostrarModal, setMostrarModal] = useState(false);

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className="contenedorConfiguracion">
      <div className="configuracion">
        <h2>Configuración</h2>

        <div className="informacion-configuracion">
          <div className="foto-contrasena">
            <div className="configuracion-middle">
              {/* Bloque izquierdo: Datos */}
              <div>
                <div className="columnas-configuracion">
                  <label>Documento</label>
                  <p>{usuario.documento || "No registrado"}</p>
                </div>
                <div className="columnas-configuracion">
                  <label>Correo institucional</label>
                  <p>{usuario.email || "No registrado"}</p>
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
                  alt="Foto de perfil"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="botones-configuracion">
              <button className="volverConfiguracion"><BotonVolver /></button>
              <button
                className="boton-actualizar"
                onClick={() => setMostrarModal(true)}
              >
                Actualizar datos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de actualización */}
      <ActualizarDatosModal
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  );
}
