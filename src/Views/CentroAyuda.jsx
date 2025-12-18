import { useState } from "react";
import Funcionalidades from "../components/Funcionalidades";
import Manuales from "../components/Manuales";
import IlustracionInformacion from "../Icons/IlustracionInformacion.jsx";
import IlustracionVideo from "../Icons/IlustracionVideo.jsx";
import IlustracionMejoras from "../Icons/IlustracionMejoras.jsx";
import "./CentroAyuda.css";

export default function CentroAyuda() {
  const [seccionActiva, setSeccionActiva] = useState(null); // inicia mostrando ilustraciones

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
        <h1>¿Necesitas ayuda?</h1>
        <input
          type="text"
          className="BusquedaAyuda"
          placeholder="Search how tos and more"
        />
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
        <h2>Busca información sobre SENADOCS aquí</h2>

        {/* ✅ Si no hay sección activa, mostrar ilustraciones por defecto */}
        {seccionActiva === null && (
          <div className="contenedorAyuda">
            <div className="TarjetaAyuda">
              <div className="card">
                <IlustracionInformacion />
              </div>
              <div className="textoAyuda">
                <p>Conoce más sobre SenaDocs</p>
              </div>
            </div>
            <div className="TarjetaAyuda">
              <div className="card">
                <IlustracionVideo />
              </div>
              <div className="textoAyuda">
                <p>Video tutorial</p>
              </div>
            </div>
            <div className="TarjetaAyuda">
              <div className="card">
                <IlustracionMejoras />
              </div>
              <div className="textoAyuda">
                <p>Futuras mejoras</p>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Si hay sección activa, mostrar el componente correspondiente */}
        {seccionActiva === "funcionalidades" && <Funcionalidades />}
        {seccionActiva === "manuales" && <Manuales />} 
        {seccionActiva === "contacto" && <Contacto/>}
      </section>
    </div>
  );
}
