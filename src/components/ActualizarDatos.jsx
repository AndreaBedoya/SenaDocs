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
        documento: "",
        ciudad: "",
        telefono: "",
        fecha_nacimiento: "",
        cargo: "",
        funciones_trabajo: "",
        centro_formacion: "",
        foto: ""
    });

    // Efecto para cargar los datos cuando el modal se abre
    useEffect(() => {
        if (usuario && visible) {
            setFormulario({
                // Si usuario.nombre_completo no existe, tratamos de construirlo de nombre y apellido
                nombre_completo: usuario.nombre_completo || `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim(),
                email: usuario.email || "",
                documento: usuario.documento || "",
                ciudad: usuario.ciudad || "",
                telefono: usuario.telefono || "",
                fecha_nacimiento: usuario.fecha_nacimiento || "",
                cargo: usuario.cargo || "",
                funciones_trabajo: usuario.funciones_trabajo || "",
                centro_formacion: usuario.centro_formacion || "",
                foto: usuario.foto || ""
            });
        }
    }, [usuario, visible]);

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
        const documentoValue = formulario.documento?.toString().trim();

        // VALIDACIÓN: Evitar que nombre_completo se vaya vacío
        if (!formulario.nombre_completo || formulario.nombre_completo.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Campo incompleto",
                text: "El nombre completo es obligatorio para actualizar el perfil."
            });
            return;
        }

        if (!documentoValue) {
            Swal.fire({ icon: "error", title: "Error", text: "Falta el documento." });
            return;
        }

        // Lógica segura para separar nombre y apellido
        const partes = formulario.nombre_completo.trim().split(" ");
        let nombre = "";
        let apellido = "";

        if (partes.length > 1) {
            apellido = partes.pop(); // Última palabra
            nombre = partes.join(" "); // Todo lo anterior
        } else {
            nombre = partes[0];
            apellido = ""; // O podrías mantener el apellido anterior si lo tienes
        }

        const datosFinales = {
            ...formulario,
            nombre: nombre,
            apellido: apellido
        };

        fetch(`/api/perfil/documento/${documentoValue}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosFinales)
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Error al actualizar");
                return data;
            })
            .then((data) => {
                setUsuario(data.usuario);
                Swal.fire({ icon: "success", title: "¡Éxito!", text: "Datos guardados." });
                onClose();
            })
            .catch((err) => {
                Swal.fire({ icon: "error", title: "Error", text: err.message });
            });
    };

    if (!visible) return null;

    return (
        <div className="modal-Actualizar" onClick={onClose}>
            <div className="contenidoActualizar" onClick={(e) => e.stopPropagation()}>
                <button className="cerrarActualizar" onClick={onClose}><IconCerrar /></button>
                <h2>Actualizar datos del perfil</h2>

                <div className="barra-progreso">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className={`paso ${paso >= n ? "activo" : ""}`}>{n}</div>
                    ))}
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    {/* PASO 1: Datos Personales */}
                    {paso === 1 && (
                        <div className="form-content">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nombre completo</label>
                                    <input type="text" name="nombre_completo" value={formulario.nombre_completo} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Correo institucional</label>
                                    <input type="email" name="email" value={formulario.email} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ciudad</label>
                                    <input type="text" name="ciudad" value={formulario.ciudad} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Fecha de nacimiento</label>
                                    <input type="date" name="fecha_nacimiento" value={formulario.fecha_nacimiento} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PASO 2: Trabajo y Foto */}
                    {paso === 2 && (
                        <div className="form-content">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Cargo</label>
                                    <input type="text" name="cargo" value={formulario.cargo} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono</label>
                                    <input type="text" name="telefono" value={formulario.telefono} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Foto de perfil</label>
                                    <input type="file" accept="image/*" onChange={handleFotoChange} />
                                </div>
                                <div className="form-group">
                                    <label>Documento</label>
                                    <input type="text" value={formulario.documento} disabled />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PASO 3: Otros detalles */}
                    {paso === 3 && (
                        <div className="form-content">
                            <div className="form-group">
                                <label>Funciones</label>
                                <textarea name="funciones_trabajo" value={formulario.funciones_trabajo} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Centro de formación</label>
                                <input type="text" name="centro_formacion" value={formulario.centro_formacion} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* PASO 4: Contraseña */}
                    {paso === 4 && (
                        <div className="form-content">
                            <h3 className="contrasena">Cambiar Contraseña</h3>
                            <p style={{fontSize: '12px', color: 'gray'}}>Deje en blanco si no desea cambiarla</p>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Contraseña actual</label>
                                    <input type="password" value={contraseñaAnterior} onChange={(e) => setContraseñaAnterior(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Nueva contraseña</label>
                                    <input type="password" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pasos-navegacion">
                        {paso > 1 && <button className="ButtonAtras" type="button" onClick={() => setPaso(paso - 1)}>Atrás</button>}
                        {paso < 4 ? (
                            <button className="ButtonSiguiente" type="button" onClick={() => setPaso(paso + 1)}>Siguiente</button>
                        ) : (
                            <button className="ButtonSiguiente" type="button" onClick={handleGuardar}>Guardar cambios</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}