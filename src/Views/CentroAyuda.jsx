import { useState } from "react";
import Funcionalidades from "../components/Funcionalidades";
import Manuales from "../components/Manuales";
import Reglas from "../components/Reglas";
import Sistema from "../components/Sistema";
import Contacto from "../components/Contacto";
import IlustracionInformacion from "../Icons/IlustracionInformacion.jsx";
import IlustracionVideo from "../Icons/IlustracionVideo.jsx";
import IlustracionMejoras from "../Icons/IlustracionMejoras.jsx";
import "./CentroAyuda.css";

export default function CentroAyuda() {
  const [seccionActiva, setSeccionActiva] = useState(null);

  // ✅ Estados para el modal
  const [modalActivo, setModalActivo] = useState(false);
  const [contenidoModal, setContenidoModal] = useState(null);

  // ✅ Funciones para abrir/cerrar modal
  const abrirModal = (titulo, descripcion) => {
    setContenidoModal({ titulo, descripcion });
    setModalActivo(true);
  };

  const cerrarModal = () => {
    setModalActivo(false);
    setContenidoModal(null);
  };

  return (
    <div className="CentroAyuda">
      <div className="NavbarAyuda">
        <div className="logoAyuda">
          <span>SENA</span>DOCS <span>│</span>Centro de Ayuda
        </div>
        <div className="LinksAyuda">
          <a href="#">Cerrar Sesión</a>
          <span className="settings-icon"></span>
        </div>
      </div>

      <header className="HeaderAyuda">
        <h2>Busca información sobre SENADOCS aquí</h2>
        <div className="Busquedas">
          <button
            className={seccionActiva === "funcionalidades" ? "activo" : ""}
            onClick={() => setSeccionActiva("funcionalidades")}
          >
            Funcionalidades
          </button>
          <button
            className={seccionActiva === "manuales" ? "activo" : ""}
            onClick={() => setSeccionActiva("manuales")}
          >
            Manuales
          </button>
          <button
            className={seccionActiva === "reglas" ? "activo" : ""}
            onClick={() => setSeccionActiva("reglas")}
          >
            Reglas
          </button>
          <button
            className={seccionActiva === "sistema" ? "activo" : ""}
            onClick={() => setSeccionActiva("sistema")}
          >
            Sistema
          </button>
          <button
            className={seccionActiva === "contacto" ? "activo" : ""}
            onClick={() => setSeccionActiva("contacto")}
          >
            Contacto
          </button>
        </div>
      </header>

      <section className="help-intro">
        {/* ✅ Si no hay sección activa, mostrar ilustraciones */}
        {seccionActiva === null && (
          <div className="contenedorAyuda">
            <h2>Conoce mas sobre SENADOCS</h2>
            <div className="contenedorTarjetasAyuda">
              <div
                className="TarjetaAyuda"
                onClick={() =>
                  abrirModal(
                    "Conoce más sobre SENADOCS",
                    "SENADOCS es una plataforma institucional para gestionar documentos, evaluaciones y novedades académicas de forma segura y eficiente."
                  )
                }
              >
                <div className="card">
                  <IlustracionInformacion />
                </div>
                <div className="textoAyuda">
                  <p>Conoce más sobre SenaDocs</p>
                </div>
              </div>

              <div
                className="TarjetaAyuda"
                onClick={() =>
                  abrirModal(
                    "Video tutorial",
                    "Accede a una guía visual paso a paso sobre cómo usar cada módulo del sistema SENADOCS."
                  )
                }
              >
                <div className="card">
                  <IlustracionVideo />
                </div>
                <div className="textoAyuda">
                  <p>Video tutorial</p>
                </div>
              </div>

              <div
                className="TarjetaAyuda"
                onClick={() =>
                  abrirModal(
                    "Futuras mejoras",
                    "Estamos trabajando en nuevas funcionalidades como notificaciones, integración con correo institucional y seguimiento automatizado."
                  )
                }
              >
                <div className="card">
                  <IlustracionMejoras />
                </div>
                <div className="textoAyuda">
                  <p>Futuras mejoras</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Si hay sección activa, mostrar el componente correspondiente */}
        {seccionActiva === "funcionalidades" && <Funcionalidades />}
        {seccionActiva === "manuales" && <Manuales />}
        {seccionActiva === "reglas" && <Reglas />}
        {seccionActiva === "sistema" && <Sistema />}
        {seccionActiva === "contacto" && <Contacto />}

        {/* ✅ Modal */}
        {modalActivo && (
          <div className="modal-Ayuda" onClick={cerrarModal}>
            <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
              <button className="cerrar" onClick={cerrarModal}>×</button>
              <h3>{contenidoModal.titulo}</h3>
              <p>{contenidoModal.descripcion}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
