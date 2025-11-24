import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import IconCerrar from "../Icons/IconCerrar.jsx";
import "./Registro.css";

export default function RegistroModal({ visible, onClose, onLoginClick }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!visible) return;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }, [visible]);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    documento: "",
    ciudad: "",
    telefono: "",
    contacto_emergencia: "",
    nombre_contacto: "",
    tipo_sangre: "",
    fecha_nacimiento: "",
    cargo: "",
    funciones_trabajo: "",
    rol_id: 1,
    confirmar: "",
     foto:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
      const base64 = reader.result;
      localStorage.setItem("fotoPerfil", base64); // ✅ guarda en localStorage
      setFormulario((prev) => ({ ...prev, foto: base64 }));
    };

      reader.readAsDataURL(file);
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (formulario.password !== formulario.confirmar) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Por favor verifica que ambas contraseñas sean iguales"
      });
      return;
    }

    const datos = { ...formulario };
    delete datos.confirmar;
    delete datos.foto;
    
    try {
      const respuesta = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Tu cuenta ha sido creada correctamente",
          confirmButtonText: "Iniciar sesión"
        }).then(() => navigate("/login"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: resultado.error || "No se pudo registrar el usuario"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor"
      });
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={onClose}><IconCerrar /></button>

        <form className="registro-form" onSubmit={handleRegistro}>
          <h2>Registro en <strong>SENA</strong>DOCS</h2>
          <p>Crea tu cuenta y tu perfil completo para comenzar.</p>

          <div className="barra-progreso">
            <div className={`paso ${step === 1 ? "activo" : ""}`}>1</div>
            <div className={`paso ${step === 2 ? "activo" : ""}`}>2</div>
            <div className={`paso ${step === 3 ? "activo" : ""}`}>3</div>
          </div>

          {step === 1 && (
            <div className="paso-activo">
              <div className="form-row">
                <div className="form-group">
                  <label>Documento</label>
                  <input type="text" name="documento" value={formulario.documento} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input type="text" name="apellido" value={formulario.apellido} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email institucional</label>
                  <input type="email" name="email" value={formulario.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Ciudad</label>
                  <input type="text" name="ciudad" value={formulario.ciudad} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de nacimiento</label>
                  <input type="date" name="fecha_nacimiento" value={formulario.fecha_nacimiento} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Tipo de sangre</label>
                  <input type="text" name="tipo_sangre" value={formulario.tipo_sangre} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="paso-activo">
              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="text" name="telefono" value={formulario.telefono} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Foto de perfil</label>
                  <input type="file" accept="image/*" onChange={handleFotoChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cargo</label>
                  <input type="text" name="cargo" value={formulario.cargo} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Funciones</label>
                  <input type="text" name="funciones_trabajo" value={formulario.funciones_trabajo} onChange={handleChange} />
                </div>
              </div>
              <h3 className="contacto">Contacto de Emergencia</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del contacto</label>
                  <input type="text" name="nombre_contacto" value={formulario.nombre_contacto} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Teléfono del contacto</label>
                  <input type="text" name="contacto_emergencia" value={formulario.contacto_emergencia} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="paso-activo">
              <div className="form-row">
                <div className="form-group">
                  <label>Contraseña</label>
                  <input type="password" name="password" value={formulario.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Confirmar contraseña</label>
                  <input type="password" name="confirmar" value={formulario.confirmar} onChange={handleChange} required />
                </div>
              </div>
            </div>
          )}

          <div className="pasos-navegacion">
            {step > 1 && <button type="button" className="ButtonAtras" onClick={handleBack}>Atrás</button>}
            {step < 3 ? (
              <button type="button" className="ButtonSiguiente" onClick={handleNext}>Siguiente</button>
            ) : (
              <button type="submit">Registrarse</button>
            )}
          </div>

          <p className="login-link">
            ¿Ya tienes cuenta?{" "}
            <span onClick={onLoginClick} className="link">
              Inicia sesión
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}