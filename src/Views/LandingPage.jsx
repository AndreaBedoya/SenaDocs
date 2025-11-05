import { useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [activo, setActivo] = useState(null);

  const toggleFAQ = (index) => {
    setActivo(activo === index ? null : index);
  };

  const preguntas = [
    {
      pregunta: "¿Cómo reportar un error dentro del sistema?",
      respuesta: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      pregunta: "¿Qué hacer si el sistema se congela o no responde?",
      respuesta: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      pregunta: "¿Qué hacer si el sistema no renombra el PDF?",
      respuesta: "Esto puede pasar si el archivo tiene bloqueo de permisos o está abierto en otro programa. Cierra el documento, vuelve a intentarlo o renómbralo manualmente desde el sistema. El sistema mostrará una notificación si no logra completar el proceso."
    },
    {
      pregunta: "¿Por qué no se cargan mis documentos PDF?",
      respuesta: "Puede deberse a que los archivos superan la cantidad máxima permitida o tiene un nombre con caracteres no válidos. Verifica que el documento esté en formato .pdf o excel y no exceda el límite establecido."
    },

    {
      pregunta: "¿Por qué no se generan las gráficas desde Excel?",
      respuesta: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      pregunta: "¿Qué hago si los porcentajes evaluativos no se calculan correctamente?",
      respuesta: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      pregunta: "¿Qué pasa si olvido mi contraseña y no recibo el enlace de recuperación?",
      respuesta: "Esto puede pasar si el archivo tiene bloqueo de permisos o está abierto en otro programa. Cierra el documento, vuelve a intentarlo o renómbralo manualmente desde el sistema. El sistema mostrará una notificación si no logra completar el proceso."
    },
    {
      pregunta: "¿Por qué el sistema no guarda mis cambios en el perfil?",
      respuesta: "Puede deberse a que los archivos superan la cantidad máxima permitida o tiene un nombre con caracteres no válidos. Verifica que el documento esté en formato .pdf o excel y no exceda el límite establecido."

    }
  ];

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SENADOCS</div>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#motivos">Motivos</a></li>
          <li><a href="#que-son">¿Qué son?</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <button className="btn-login"> Iniciar Sesión</button>
      </nav>

      {/* Hero */}
      <section id="inicio" className="hero">
        <h1>Automatiza tareas con SENADOCS</h1>
        <p>Conoce las funcionalidades que SENADOCS tiene para ti</p>
        <ul>
          <li>✔ Renombra y organiza PDF</li>
          <li>✔ Calcula el porcentaje de los juicios evaluativos</li>
          <li>✔ Genera graficas apartir de novedades academicas</li>
        </ul>
        <button className="btn-cta">Empieza Ahora ➜</button>
      </section>

      {/* ¿Por que se creo? */}
      <section id="motivos" className="PorqueSeCreo">
        <h2>¿Por que se creo SENADOCS?</h2>
        <ul>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
        </ul>
      </section>

      {/* ¿Qué son? */}
      <section id="que-son" className="QueEsSenaDocs">
        <h2>¿Qué es SENADOCS?</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </section>

      {/* Equipo */}
      <section id="equipo" className="Equipo">
        <h2>Equipo de Trabajo</h2>
        <p>Conoce a las personas detrás de SenaDocs, un equipo comprometido con la innovación <br/> tecnológica  y la mejora continua de la gestión documental, trabajando para <br/> fortalecer la eficiencia y permanencia educativa en el SENA.</p>

        <div className="equipo-grid">
          <div className="miembro">
            <img src="../../public/FotoMauricio.jpeg" alt="Mauricio" />
            <h3>Mauricio Villanueva</h3>
            <p className="rol">Analista de Datos</p>
            <p>Desarrolla modelos predictivos para detectar riesgos de deserción y mejora continua del sistema.</p>
          </div>
          <div className="miembro">
            <img src="../../public/FotoAndrea.jpg" alt="Andrea Niño" />
            <h3>Andrea Niño</h3>
            <p className="rol">Full Stack Developer</p>
            <p>Encargada de la arquitectura modular, seguridad y experiencia de usuario en la plataforma SENADOCS.</p>
          </div>
          <div className="miembro">
            <img src="../../public/FotoDylan.jpeg" alt="Dylan Sanchez" />
            <h3>Dylan Sanchez</h3>
            <p className="rol">Diseñadora UX/UI</p>
            <p>Diseña interfaces intuitivas y accesibles para mejorar la interacción de los usuarios con la plataforma.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="PreguntasFrecuentes">
        <h2>Preguntas Frecuentes</h2>
        <ul className="faq-list">
          {preguntas.map((item, index) => (
            <ol key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {item.pregunta}
                <span>{activo === index ? "−" : "+"}</span>
              </button>
              {activo === index && <div className="faq-answer">{item.respuesta}</div>}
            </ol>
          ))}
        </ul>
        <p>Estas son solo algunas de las preguntas más frecuentes.
            Recuerda que dentro de la página web encontrarás una sección de ayuda con guías y respuestas detalladas.
            Si aún tienes inconvenientes al realizar alguna función, no dudes en comunicarte a los números disponibles en la sección de contacto.</p>
      </section>

      {/* Contacto */}
      <section id="contacto" className="Contacto">
        <h2>Contacto</h2>
        <p>📧 contacto@senadocs.edu.co</p>
        <p>📞 +57 123 456 7890</p>
      </section>
    </div>
  );
}
