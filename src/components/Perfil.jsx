import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import "./Perfil.css";

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

  const handleActualizar = () => {
    navigate("/actualizar");
  };

  return (
    <div className="perfil-wrapper">
      {/* Barra superior */}
      <nav className="navbar-perfil">
        <div className="senadocs">
          <a href="#"><img src="/logoSena.png" alt="Logo SenaDocs" className="logo" /></a>
          <p>{usuario.nombre_completo || "NOMBRE"}</p>
        </div>
      </nav>

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
          <div className="columnas-perfil">
            <p>{usuario.funciones || "Sin funciones registradas"}</p>
          </div>
        </div>

        {/* Bloque derecho: información básica */}
        <div className="DatosPersonales">
          <h3>Datos personales</h3>

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
              <label>Cargo</label>
              <p>{usuario.cargo || "No registrado"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel inferior */}
      <div className="perfil-bottom">
        <h3>Contacto de emergencia</h3>
        <div className="filas-perfil">
          <div className="columnas-perfil">
            <label>Nombre del contacto</label>
            <p>{usuario.nombre_emergencia || "No registrado"}</p>
          </div>
          <div className="columnas-perfil">
            <label>Teléfono del contacto</label>
            <p>{usuario.numero_emergencia || usuario.numero_emergencia || "No registrado"}</p>
          </div>
        </div>

        <div className="botones-perfil">
          <button className="volverPerfil" onClick={() => navigate("/vistaPrincipal")}>
            Volver
          </button>
          <button className="actualizarPerfil" onClick={handleActualizar}>
            Actualizar datos
          </button>
        </div>
      </div>
    </div>
  );
}
