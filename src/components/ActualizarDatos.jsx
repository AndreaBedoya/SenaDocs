import { useState, useEffect } from "react";
import { useUsuarioStore } from "../Store/useUsuarioStore";
import Swal from "sweetalert2";
import IconCerrar from "../Icons/IconCerrar.jsx";
import "./ActualizarDatos.css";

export default function ActualizarDatosModal({ visible, onClose }) {
  const usuario = useUsuarioStore((state) => state.usuario);
  const setUsuario = useUsuarioStore((state) => state.setUsuario);

  const [paso, setPaso] = useState(1);
  const [contraseñaAnterior, setContraseñaAnterior] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  const [formulario, setFormulario] = useState({
    nombre_completo: "",
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
    foto: ""
  });

  useEffect(() => {
    if (usuario) {
      setFormulario({
        ...usuario,
        nombre_completo: `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim(),
        documento: usuario.documento || ""
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

  const avanzarPaso = () => setPaso((prev) => Math.min(prev + 1, 4));
  const retrocederPaso = () => setPaso((prev) => Math.max(prev - 1, 1));

  const handleGuardar = () => {
    const documento = usuario?.documento?.toString().trim();

    if (!documento || isNaN(documento)) {
      Swal.fire({
        icon: "error",
        title: "Documento inválido",
        text: "El campo 'documento' es obligatorio y debe ser numérico."
      });
      return;
    }

    // Separar nombre y apellido desde nombre_completo
    const partes = formulario.nombre_completo.trim().split(" ");
    const nombre = partes.slice(0, -1).join(" ");
    const apellido = partes.slice(-1).join(" ");

    const datos = {
      ...formulario,
      nombre,
      apellido
    };

    fetch(`/api/usuarios/perfil/documento/${documento}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error del servidor: ${errorText}`);
        }
        return res.json();
      })
      .then(data => {
        setUsuario(data.usuario);
        Swal.fire({
          icon: "success",
          title: "¡Datos actualizados!",
          text: "Los cambios se guardaron correctamente.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3085d6"
        }).then(() => {
          onClose();
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error al guardar",
          text: "No se pudo actualizar el perfil."
        });
      });
  };

  if (!visible) return null;

  return (
    <div className="modal-Actualizar" onClick={onClose}>
      <div className="contenidoActualizar" onClick={(e) => e.stopPropagation()}>
        <button className="cerrarActualizar" onClick={onClose}><IconCerrar /></button>

        <h2>Actualizar datos del perfil</h2>

        <div className="barra-progreso">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className={`paso ${paso >= n ? "activo" : ""}`}>{n}</div>
          ))}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {paso === 1 && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    name="nombre_completo"
                    value={formulario.nombre_completo}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Correo institucional</label>
                  <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ciudad de residencia</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formulario.ciudad}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    value={formulario.fecha_nacimiento}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {paso === 2 && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Cargo</label>
                  <input
                    type="text"
                    name="cargo"
                    value={formulario.cargo}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Número de teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formulario.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Foto de perfil</label>
                  <input type="file" accept="image/*" onChange={handleFotoChange} />
                </div>
                <div className="form-group">
                  <label>Documento</label>
                  <input type="text" name="documento" value={formulario.documento} disabled />
                </div>
              </div>
            </>
          )}

        {paso === 3 && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Funciones que desempeña</label>
              <input
                type="text"
                name="funciones_trabajo"
                value={formulario.funciones_trabajo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="form-group">
              <label>Centro de formación</label>
              <input
                type="text"
                name="centro_formacion"
                value={formulario.centro_formacion || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </>
      )}


          {paso === 4 && (
            <>
              <h3 className="contrasena">Cambiar Contraseña</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Contraseña actual</label>
                  <input
                    type="password"
                    value={contraseñaAnterior}
                    onChange={(e) => setContraseñaAnterior(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Nueva contraseña</label>
                  <input
                    type="password"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="pasos-navegacion">
            {paso > 1 && <button className="ButtonAtras" type="button" onClick={retrocederPaso}>Atrás</button>}
            {paso < 4 ? (
              <button className="ButtonSiguiente" type="button" onClick={avanzarPaso}>Siguiente</button>
            ) : (
              <button className="ButtonSiguiente" type="button" onClick={handleGuardar}>Guardar cambios</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
