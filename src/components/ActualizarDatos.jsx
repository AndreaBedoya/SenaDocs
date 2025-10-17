import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import "./ActualizarDatos.css";

export default function ActualizarDatos() {
  const navigate = useNavigate();
  const usuario = useUsuarioStore((state) => state.usuario);
  const setUsuario = useUsuarioStore((state) => state.setUsuario);

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

  const handleGuardar = () => {
    const identificacion = formulario.identificacion?.toString().trim();

    if (!identificacion || isNaN(identificacion)) {
      alert("❌ El campo 'identificación' es obligatorio y debe ser numérico.");
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
        console.log("✅ Perfil actualizado:", data);
        setUsuario(data);
        alert("✅ Datos actualizados correctamente");
        navigate("/perfil");
      })
      .catch(err => {
        console.error("❌ Error al guardar en backend:", err);
        alert("Error al guardar los datos. Revisa la consola para más detalles.");
      });
  };

  return (
    <div className="form-wrapper">
      <div className="actualizar-form">
        <h2>Actualizar datos del perfil</h2>

        <div className="form-row">
          <div className="form-group">
            <label>Nombre completo</label>
            <input type="text" name="nombre_completo" value={formulario.nombre_completo || ""} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo institucional</label>
            <input type="email" name="correo" value={formulario.correo || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Ciudad de residencia</label>
            <input type="text" name="ciudad" value={formulario.ciudad || ""} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <input type="date" name="nacimiento" value={formulario.nacimiento || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tipo de sangre</label>
            <input type="text" name="sangre" value={formulario.sangre || ""} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Número de teléfono</label>
            <input type="text" name="telefono" value={formulario.telefono || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Foto de perfil</label>
            <input type="file" accept="image/*" onChange={handleFotoChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Identificación</label>
            <input type="text" name="identificacion" value={formulario.identificacion || ""} disabled />
          </div>
          <div className="form-group">
            <label>Cargo</label>
            <input type="text" name="cargo" value={formulario.cargo || ""} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Funciones que desempeña</label>
            <input type="text" name="funciones" value={formulario.funciones || ""} onChange={handleChange} />
          </div>
        </div>

        <h3 className="contacto">Contacto de Emergencia</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre del contacto</label>
            <input
              type="text"
              name="nombre_emergencia"
              value={formulario.nombre_emergencia || ""}
              onChange={handleChange}
              placeholder="Nombre del contacto de emergencia"
            />
          </div>
          <div className="form-group">
            <label>Teléfono del contacto</label>
            <input
              type="text"
              name="telefono_emergencia"
              value={formulario.telefono_emergencia || ""}
              onChange={handleChange}
              placeholder="Número del contacto de emergencia"
            />
          </div>
        </div>

        <button onClick={handleGuardar}>Guardar cambios</button>
      </div>
    </div>
  );
}
