import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import Swal from "sweetalert2";
import "./ActualizarDatos.css";

export default function ActualizarDatos() {
  const navigate = useNavigate();
  const usuario = useUsuarioStore((state) => state.usuario);
  const setUsuario = useUsuarioStore((state) => state.setUsuario);

  const [paso, setPaso] = useState(1);
  const [contraseñaAnterior, setContraseñaAnterior] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");

  const [formulario, setFormulario] = useState({
    nombre_completo: "",
    ciudad: "",
    nacimiento: "",
    funciones: "",
    correo: "",
    cargo: "",
    sangre: "",
    telefono: "",
    nombre_emergencia: "",
    telefono_emergencia: "",
    foto: "",
    identificacion: ""
  });

  useEffect(() => {
    if (usuario) {
      setFormulario({
        ...usuario,
        identificacion: usuario.identificacion || ""
      });
    }
  }, [usuario]);

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

  const avanzarPaso = () => {
    setPaso((prev) => Math.min(prev + 1, 4));
  };

  const retrocederPaso = () => {
    setPaso((prev) => Math.max(prev - 1, 1));
  };

  const handleGuardar = () => {
    const identificacion = formulario.identificacion?.toString().trim();

    if (!identificacion || isNaN(identificacion)) {
      Swal.fire({
        icon: "error",
        title: "Identificación inválida",
        text: "El campo 'identificación' es obligatorio y debe ser numérico."
      });
      return;
    }

    fetch(`/api/perfil/${identificacion}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulario)
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error del servidor: ${errorText}`);
        }
        const text = await res.text();
        return text ? JSON.parse(text) : {};
      })
      .then(data => {
        setUsuario(data);
        Swal.fire({
          icon: "success",
          title: "¡Datos actualizados!",
          text: "Los cambios se guardaron correctamente.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3085d6"
        }).then(() => {
          navigate("/perfil");
        });
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Error al guardar",
          text: "No se pudo actualizar el perfil. Revisa la consola para más detalles."
        });
      });
  };

  return (
    <div className="form-wrapper">
      <div className="actualizar-form paso-activo">
        <h2>Actualizar datos del perfil</h2>

        {/* Barra de progreso */}
        <div className="barra-progreso">
          <div className={`paso ${paso >= 1 ? "activo" : ""}`}>1</div>
          <div className={`paso ${paso >= 2 ? "activo" : ""}`}>2</div>
          <div className={`paso ${paso >= 3 ? "activo" : ""}`}>3</div>
          <div className={`paso ${paso === 4 ? "activo" : ""}`}>4</div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Paso 1: Datos personales */}
          {paso === 1 && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input type="text" name="nombre_completo" value={formulario.nombre_completo || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Correo institucional</label>
                  <input type="email" name="correo" value={formulario.correo || ""} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ciudad de residencia</label>
                  <input type="text" name="ciudad" value={formulario.ciudad || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Fecha de nacimiento</label>
                  <input type="date" name="nacimiento" value={formulario.nacimiento || ""} onChange={handleChange} />
                </div>
              </div>
            </>
          )}

          {/* Paso 2: Información laboral */}
          {paso === 2 && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de sangre</label>
                  <input type="text" name="sangre" value={formulario.sangre || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Número de teléfono</label>
                  <input type="text" name="telefono" value={formulario.telefono || ""} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Foto de perfil</label>
                  <input type="file" accept="image/*" onChange={handleFotoChange} />
                </div>
                <div className="form-group">
                  <label>Identificación</label>
                  <input type="text" name="identificacion" value={formulario.identificacion || ""} disabled />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cargo</label>
                  <input type="text" name="cargo" value={formulario.cargo || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Funciones que desempeña</label>
                  <input type="text" name="funciones" value={formulario.funciones || ""} onChange={handleChange} />
                </div>
              </div>
            </>
          )}

          {/* Paso 3: Contacto de emergencia */}
          {paso === 3 && (
            <>
              <h3 className="contacto">Contacto de Emergencia</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del contacto</label>
                  <input type="text" name="nombre_emergencia" value={formulario.nombre_emergencia || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Teléfono del contacto</label>
                  <input type="text" name="telefono_emergencia" value={formulario.telefono_emergencia || ""} onChange={handleChange} />
                </div>
              </div>
            </>
          )}

          {/* Paso 4: Contraseña */}
          {paso === 4 && (
            <>
              <h3>Cambiar Contraseña</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Contraseña actual</label>
                  <input type="password" value={contraseñaAnterior} onChange={(e) => setContraseñaAnterior(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Nueva contraseña</label>
                  <input type="password" value={nuevaContraseña} onChange={(e) => setNuevaContraseña(e.target.value)} />
                </div>
              </div>
            </>
          )}

          {/* Navegación entre pasos */}
          <div className="pasos-navegacion">
            {paso > 1 && <button className="ButtonAtras" onClick={retrocederPaso}>Atrás</button>}
            {paso < 4 ? (
              <button className="ButtonSiguiente" onClick={avanzarPaso}>Siguiente</button>
            ) : (
              <button className="ButtonSiguiente" onClick={handleGuardar}>Guardar cambios</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
