import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Registro.css";

export default function Registro() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }, []);

  const [formulario, setFormulario] = useState({
    identificacion: "",
    nombre_completo: "",
    correo: "",
    contrasena: "",
    confirmar: "",
    ciudad: "",
    nacimiento: "",
    sangre: "",
    telefono: "",
    foto: "",
    cargo: "",
    funciones: "",
    nombre_emergencia: "",
    numero_emergencia: ""
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
        setFormulario((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  console.log("Datos enviados:", formulario);

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (formulario.contrasena !== formulario.confirmar) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Por favor verifica que ambas contraseñas sean iguales"
      });
      return;
    }

    const datos = { ...formulario };
    delete datos.confirmar; // ✅ No enviar campo innecesario

    try {
      const respuesta = await fetch("http://localhost:4000/api/registro", {
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
      console.error("❌ Error de conexión:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor"
      });
    }
  };

  return (
    <div className="form-wrapper">
      <form className="registro-form" onSubmit={handleRegistro}>
        <h2>Registro en <strong>SENA</strong>DOCS</h2>
        <p>Crea tu cuenta y tu perfil completo para comenzar.</p>

        <div className="form-row">
          <div className="form-group">
            <label>Número de identificación</label>
            <input type="text" name="identificacion" value={formulario.identificacion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Nombre completo</label>
            <input type="text" name="nombre_completo" value={formulario.nombre_completo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo institucional</label>
            <input type="email" name="correo" value={formulario.correo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Ciudad de residencia</label>
            <input type="text" name="ciudad" value={formulario.ciudad} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <input type="date" name="nacimiento" value={formulario.nacimiento} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tipo de sangre</label>
            <input type="text" name="sangre" value={formulario.sangre} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Número de teléfono</label>
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
            <label>Funciones que desempeña</label>
            <input type="text" name="funciones" value={formulario.funciones} onChange={handleChange} />
          </div>
        </div>

        <h3 className="contacto">Contacto de Emergencia</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre del contacto</label>
            <input type="text" name="nombre_emergencia" value={formulario.nombre_emergencia} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Teléfono del contacto</label>
            <input type="text" name="numero_emergencia" value={formulario.numero_emergencia} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" name="contrasena" value={formulario.contrasena} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input type="password" name="confirmar" value={formulario.confirmar} onChange={handleChange} required />
          </div>
        </div>

        <div className="Registrarse">
          <button type="submit">Registrarse</button>
        </div>

        <p className="login-link">
          ¿Ya tienes cuenta?{" "}
          <span onClick={() => navigate("/login")} className="link">
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
}
