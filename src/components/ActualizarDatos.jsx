import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ActualizarDatos.css";

export default function ActualizarDatos() {
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
    emergencia: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleRedSocialChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      redes: { ...formulario.redes, [name]: value }
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setFormulario({ ...formulario, foto: preview });
  };

  const handleGuardar = () => {
    localStorage.setItem("usuario", JSON.stringify(formulario));
    alert("✅ Datos actualizados correctamente");
    navigate("/perfil");
  };

  return (
    <div className="form-wrapper">
        <div className="actualizar-form">
            <h2>Actualizar datos del perfil</h2>

            <div className="form-row">
                <div className="form-group">
                <label>Nombre completo</label>
                <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                <label>Correo SENA</label>
                <input type="email" name="correo" value={formulario.correo} onChange={handleChange} />
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
                <label>Documento</label>
                <input type="text" name="documento" value={formulario.documento} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Cargo</label>
                <input type="text" name="cargo" value={formulario.cargo} onChange={handleChange} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                <label>Funciones que desempeña</label>
                <input type="text" name="funciones" value={formulario.funciones} onChange={handleChange} />
                </div>
            </div>

            <h3 className="contacto">Contacto de Emergencia</h3>
            <div className="form-row">
                <div className="form-group">
                    <label>Nombre del contacto</label>
                    <input
                    type="text"
                    name="nombreEmergencia"
                    value={formulario.nombreEmergencia}
                    onChange={handleChange}
                    placeholder="Nombre del contacto de emergencia"
                    />
                </div>
                <div className="form-group">
                    <label>Número del contacto</label>
                    <input
                    type="text"
                    name="numeroEmergencia"
                    value={formulario.numeroEmergencia}
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
