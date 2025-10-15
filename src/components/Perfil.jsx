import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export default function Perfil() {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    ciudad: "",
    nacimiento: "",
    funciones: "",
    documento: "",
    cargo: "",
    sangre: "",
    telefono: "",
    nombreEmergencia: "",
    numeroEmergencia: "",
    redes: {
      instagram: "",
      youtube: "",
      tiktok: ""
    },
    foto: ""
  });

  useEffect(() => {
    const datos = localStorage.getItem("usuario");
    if (datos) {
      const parsed = JSON.parse(datos);
      setFormulario({
        ...formulario,
        ...parsed,
        redes: parsed.redes || {
          instagram: "",
          youtube: "",
          tiktok: ""
        }
      });
    }
  }, []);

  const handleActualizar = () => {
    navigate("/actualizar");
  };

  if (!formulario) return null;

  return (
    <div className="perfil-wrapper">
      {/* Barra superior */}
      <nav className="navbar-perfil">
        <div className="senadocs">
          <a href="#"><img src="/logoSena.png" alt="Logo SenaDocs" className="logo" /></a>
          <p>{formulario.nombre || "NOMBRE"}</p>
        </div>
      </nav>

      {/* Panel intermedio */}
      <div className="perfil-middle">
        {/* Bloque izquierdo: Foto + Nombre */}
        <div className="perfil-identidad">
          <img
            src={formulario.foto || "https://via.placeholder.com/150"}
            alt="Foto de perfil"
            className="perfil-avatar"
          />
          <h2>{formulario.nombre || "Nombre no registrado"}</h2>
          <div className="form-group">
          <label></label>
          <p>{formulario.funciones}</p>
        </div>
      </div>
        {/* Bloque derecho: información básica */}
        <div className="perfil-left">
          <h3>Datos personales</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Correo</label>
              <p>{formulario.correo}</p>
            </div>

          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <p>{formulario.nacimiento}</p>
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <p>{formulario.telefono}</p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ciudad</label>
              <p>{formulario.ciudad}</p>
            </div>
            <div className="form-group">
              <label>Tipo de sangre</label>
              <p>{formulario.sangre}</p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Documento</label>
              <p>{formulario.documento}</p>
            </div>
            <div className="form-group">
              <label>Cargo</label>
              <p>{formulario.cargo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel inferior */}
      <div className="perfil-bottom">
        <h3>Contacto de emergencia</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre del contacto</label>
            <p>{formulario.nombreEmergencia || "No registrado"}</p>
          </div>
          <div className="form-group">
            <label>Teléfono del contacto</label>
            <p>{formulario.numeroEmergencia || "No registrado"}</p>
          </div>
        </div>
        <div className="boton">
          <button onClick={handleActualizar}>Actualizar datos</button>
        </div>
        
      </div>
    </div>
  );
}
