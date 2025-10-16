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
  nombre_emergencia: "",    
  numero_emergencia: "",     
  foto: ""
});


  useEffect(() => {
    const datos = localStorage.getItem("usuario");
    if (datos) {
      const parsed = JSON.parse(datos);
      setFormulario(prev => ({
        ...prev,
        ...parsed
      }));

      // ✅ Obtener datos actualizados desde el backend
      if (parsed.documento) {
        fetch(`/api/perfil/${parsed.documento}`)
          .then(res => res.json())
          .then(data => {
            setFormulario(prev => ({
              ...prev,
              ...data
            }));
          })
          .catch(err => console.error("Error al cargar perfil desde backend:", err));
      }
    }
  }, []);

  const handleActualizar = () => {
    navigate("/actualizar");
  };

  if (!formulario) return null;

  // ✅ Formatear fecha de nacimiento
  const fechaFormateada = formulario.nacimiento
    ? new Date(formulario.nacimiento).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "";

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
              <p>{fechaFormateada}</p>
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
            <p>{formulario.nombre_emergencia || "No registrado"}</p>
          </div>
          <div className="form-group">
            <label>Teléfono del contacto</label>
            <p>{formulario.numero_emergencia || "No registrado"}</p>
          </div>
        </div>
        <div className="botones-acciones">
          <button
            className="boton-volver"
            onClick={() => {
              navigate("/vistaPrincipal"); 
            }}
          >
            Volver
          </button>
          <button className="boton-actualizar" onClick={handleActualizar}>
            Actualizar datos
          </button>
          
        </div>
      </div>
    </div>
  );
}
