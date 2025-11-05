import { useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [activo, setActivo] = useState(null);

  const toggleFAQ = (index) => {
    setActivo(activo === index ? null : index);
  };

  const preguntas = [
    {
      pregunta: "¿Cómo funciona SENADOCS?",
      respuesta: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      pregunta: "¿Es compatible con otros sistemas?",
      respuesta: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      pregunta: "¿Hay aplicaciones móviles?",
      respuesta: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      pregunta: "¿Cuál es el costo del servicio?",
      respuesta: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
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
        <p>Conoce a las personas detrás del proyecto. Profesionales comprometidos con la permanencia educativa.</p>
      </section>

      {/* FAQ */}
      <section id="faq" className="PreguntasFrecuentes">
        <h2>Preguntas Frecuentes</h2>
        <ul className="faq-list">
          {preguntas.map((item, index) => (
            <li key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {item.pregunta}
                <span>{activo === index ? "−" : "+"}</span>
              </button>
              {activo === index && <div className="faq-answer">{item.respuesta}</div>}
            </li>
          ))}
        </ul>
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
