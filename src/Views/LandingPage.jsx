import { useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [activo, setActivo] = useState(null);

  const toggleFAQ = (index) => {
    setActivo(activo === index ? null : index);
  };

  const preguntas = [
    {
      pregunta: "¿Cómo funcionan las Alertas Tempranas?",
      respuesta: "Analizan datos académicos y de comportamiento para detectar riesgos de deserción."
    },
    {
      pregunta: "¿Es compatible con otros sistemas?",
      respuesta: "Sí, se integra fácilmente con plataformas educativas existentes."
    },
    {
      pregunta: "¿Hay aplicaciones móviles?",
      respuesta: "Sí, disponibles para Android y iOS."
    },
    {
      pregunta: "¿Cuál es el costo del servicio?",
      respuesta: "Ofrecemos planes gratuitos y premium según el tamaño de la institución."
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
        <button className="btn-login">🚪 Iniciar Sesión</button>
      </nav>

      {/* Hero */}
      <section id="inicio" className="hero">
        <h1>Previene la Deserción de Aprendices con SENADOCS</h1>
        <p>Identifica riesgos a tiempo y asegura el éxito de tus estudiantes con nuestras herramientas de monitoreo y análisis inteligente.</p>
        <ul>
          <li>✔ Detección temprana de riesgos</li>
          <li>✔ Análisis predictivo avanzado</li>
          <li>✔ Acceso móvil 24/7</li>
        </ul>
        <button className="btn-cta">Empieza Ahora ➜</button>
      </section>

      {/* Motivos */}
      <section id="motivos" className="section">
        <h2>Motivos de deserción temprana</h2>
        <ul>
          <li>Dificultades académicas persistentes</li>
          <li>Falta de apoyo y orientación educativa</li>
          <li>Problemas financieros y necesidad de trabajar</li>
          <li>Baja autoestima y desmotivación</li>
        </ul>
      </section>

      {/* ¿Qué son? */}
      <section id="que-son" className="section">
        <h2>¿Qué son las Alertas Tempranas?</h2>
        <p>Son un sistema de monitoreo y análisis que identifica estudiantes en riesgo de abandono, permitiendo intervenir con soporte adecuado y recursos personalizados.</p>
      </section>

      {/* Equipo */}
      <section id="equipo" className="section">
        <h2>Equipo de Trabajo</h2>
        <p>Conoce a las personas detrás del proyecto. Profesionales comprometidos con la permanencia educativa.</p>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
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
      <section id="contacto" className="section">
        <h2>Contacto</h2>
        <p>📧 contacto@senadocs.edu.co</p>
        <p>📞 +57 123 456 7890</p>
      </section>
    </div>
  );
}
