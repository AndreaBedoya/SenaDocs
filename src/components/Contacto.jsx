import "./Contacto.css";

const contactos = [
  {
    nombre: "Mauricio Villanueva",
    cargo: "Desarrollador Backend",
    descripcion: "Responsable de la configuración, creación, mantenimiento y soporte técnico de SENADOCS.",
    foto: "../../public/FotoMauricio.jpeg", // coloca la foto en la carpeta /public
    whatsapp: "+573209493878"
  },
  {
    nombre: "Andrea Niño",
    cargo: "Desarrollo FullStack",
    descripcion: "Responsable de la configuración, creación, mantenimiento y soporte técnico de SENADOCS.",
    foto: "../../public/FotoAndrea.jpg",
    whatsapp: "+573188106387"
  },
  {
    nombre: "Dylan Sanchez",
    cargo: "Gestor de base de datos",
    descripcion: "Responsable de la configuración, creación, mantenimiento y soporte técnico de SENADOCS.",
    foto: "../../public/FotoDylan.jpeg",
    whatsapp: "+573007277594"
  }
];

export default function SeccionContacto() {
  return (
    <section className="contacto">
      <h2>Contacto Institucional</h2>
      <p>Comunícate con el equipo responsable de SENADOCS para soporte, gestión o coordinación.</p>

      <div className="grid-contactos">
        {contactos.map((persona, index) => (
          <div className="card-contacto" key={index}>
            <img src={persona.foto} alt={persona.nombre} className="foto" />
            <h3>{persona.nombre}</h3>
            <span className="cargo">{persona.cargo}</span>
            <p>{persona.descripcion}</p>
            <a
              href={`https://wa.me/${persona.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-contactar"
            >
              Contactar
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
