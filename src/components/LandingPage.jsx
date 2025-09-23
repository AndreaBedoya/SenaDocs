import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const [mensaje, setMensaje] = useState("Cargando...");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/hello")
      .then((res) => res.json())
      .then((data) => setMensaje(data.message))
      .catch(() => setMensaje("❌ No se pudo conectar con el backend"));
  }, []);

  return (
    <div className="landing-container">
      <h1>{mensaje}</h1>
      <p>
        Bienvenida a <strong>SenaDocs</strong>. Este sistema te ayuda a organizar documentos,
        visualizar novedades académicas y calcular juicios evaluativos.
      </p>

      <section id="informacion">
        <div className="container">
          <div className="card__container">
            {/* Tarjeta 1 */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src="/documentos.jpg" alt="¿Qué es?" className="card__img" />
                </div>
                <div className="flip-card-back">
                  <h3 className="card__titulo">¿Qué es SenaDocs?</h3>
                  <ul className="pasos">
                    <li>Sistema para organizar documentos académicos</li>
                    <li>Conecta backend y frontend</li>
                    <li>Diseñado para instructores del SENA</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src="/porcentaje.jpg" alt="Funcionalidades" className="card__img" />
                </div>
                <div className="flip-card-back">
                  <h3 className="card__titulo">¿Qué puede hacer?</h3>
                  <ul className="pasos">
                    <li>Calcular juicios evaluativos</li>
                    <li>Visualizar novedades académicas</li>
                    <li>Organizar archivos por criterios</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src="/graficas.jpg" alt="Objetivo" className="card__img" />
                </div>
                <div className="flip-card-back">
                  <h3 className="card__titulo">¿Para qué sirve?</h3>
                  <ul className="pasos">
                    <li>Facilitar la gestión documental</li>
                    <li>Ofrecer estadísticas claras</li>
                    <li>Mejorar la experiencia del instructor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <button onClick={() => navigate("/upload")} className="landing-button">
        Comenzar
      </button>
    </div>
  );
}




