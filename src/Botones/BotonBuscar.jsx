import "./BotonBuscar.css";

export default function BotonBuscar({ texto = "Buscar", Icon = null, onClick, type = "submit", className = "" }) {
  return (
    <button type={type} className={`boton-buscar ${className}`} onClick={onClick}>
      {Icon && <Icon />}
      <span>{texto}</span>
    </button>
  );
}
