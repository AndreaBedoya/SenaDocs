import IlustracionInformacion from "../Icons/IlustracionInformacion.jsx";
import IlustracionVideo from "../Icons/IlustracionVideo.jsx";
import IlustracionMejoras from "../Icons/IlustracionMejoras.jsx";
import "./CentroAyuda.css";

export default function CentroAyuda() {
  return (
    <div className="CentroAyuda">
      <div className="NavbarAyuda">
        <div className="logoAyuda"> <span>SENA</span>DOCS <span>│</span>Centro de Ayuda</div>
        <div className="LinksAyuda">
          <a href="#">Cerrar Sesion</a>
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
          <button>Funcionalidades</button>
          <button>Manuales</button>
          <button>Reglas</button>
          <button>Sistema</button>
          <button>Contacto</button>
        </div>
      </header>

      <section className="help-intro">
        <h2>Busca información sobre SENADOCS aqui</h2>
        <div className="contenedorAyuda">
          <div className="TarjetaAyuda">
            <div className="card">
              <IlustracionInformacion />
            </div>
            <div className="textoAyuda">
              <p>Conoce mas sobre SenaDocs</p>
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
      </section>
    </div>
  );
};
