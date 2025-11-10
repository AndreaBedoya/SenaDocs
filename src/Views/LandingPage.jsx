import { useState } from "react";
import "./LandingPage.css";
import IconLlamada from "../Icons/IconLlamada.jsx";
import IconCorreo from "../Icons/IconCorreo.jsx";
import IlustracionHero from "../Icons/IlustracionHero.jsx";
import IlustracionMotivos from "../Icons/IlustracionMotivos.jsx";
import IlustracionFuncionalidades from "../Icons/IlustracionFuncionalidades.jsx";
import IlustracionPreguntas from "../Icons/IlustracionPreguntas.jsx";
import RegistroModal from "../components/Registro";
export default function LandingPage() {

  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SENADOCS</div>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#motivos">¿Por que se creo?</a></li>
          <li><a href="#que-son">Funcionalidades</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#faq">Preguntas frecuentes</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <button className="btn-login"> Iniciar Sesión</button>
      </nav>

      {/* Hero */}
      <section id="inicio" className="hero">
        <div className="hero-content">
          <div className="hero-texto">
            <h1>Automatiza tareas con SENADOCS</h1>
            <p>Impulsa la eficiencia en tus procesos con herramientas avanzadas de automatización educativa.</p>
            <ul>
              <li>✔ Renombra y organiza PDF</li>
              <li>✔ Calcula el porcentaje de los juicios evaluativos</li>
              <li>✔ Genera gráficas a partir de novedades académicas</li>
            </ul>
            <div className="hero-botones">
              <button className="btn-cita">Empieza Ahora</button>
              <button className="btn-secundario" onClick={() => setMostrarModal(true)}>Registrarse</button>
            </div>

            {mostrarModal && (
              <RegistroModal
                visible={mostrarModal}
                onClose={() => setMostrarModal(false)}
                />
            )}
          </div>

          <div className="hero-imagen">
            <IlustracionHero/>
          </div>
        </div>
      </section>
      
      {/* ¿Por que se creo? */}
      <section id="motivos" className="PorqueSeCreo">
        <div className="motivos-content">
          <div className="motivos-imagen">
            <IlustracionMotivos/>
          </div>
          
          <div className="motivos-texto">
            <h2>¿Por qué se creó SENADOCS?</h2>
            <p>
              SENADOCS surge como una solución a los desafíos administrativos en entornos educativos. Su propósito es automatizar tareas repetitivas, reducir errores humanos y liberar tiempo para lo que realmente importa: el aprendizaje.
            </p>
            <ul>
              <li>✔ Optimiza la gestión documental</li>
              <li>✔ Automatiza cálculos y reportes académicos</li>
              <li>✔ Facilita el seguimiento de novedades</li>
              <li>✔ Mejora la experiencia de instructores y aprendices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="Funcionalidades">
        <div className="funcionalidades-content">
          <div className="funcionalidades-texto">
            <h2>Funcionalidades</h2>
            <p>
              SENADOCS automatiza procesos clave en la gestión educativa, permitiendo ahorrar tiempo y reducir errores. Estas son algunas de sus capacidades:
            </p>
            <ul>
              <li>📁 Renombrado inteligente de archivos PDF</li>
              <li>📊 Cálculo automático de juicios evaluativos</li>
              <li>📈 Generación de gráficas a partir de novedades académicas</li>
              <li>🔔 Exportación de documentos PDF</li>
              <li>📂 Organización de documentos por ficha.</li>
            </ul>
          </div>

          <div className="funcionalidades-imagen">
            <IlustracionFuncionalidades/>
          </div>
        </div>
      </section>


      {/* Equipo */}
      <section id="equipo" className="Equipo">
        <h2>Equipo de Trabajo</h2>
        <p>Conoce a las personas detrás de SenaDocs, un equipo comprometido con la innovación <br/> tecnológica  y la mejora continua de la gestión documental, trabajando para <br/> fortalecer la eficiencia y permanencia educativa en el SENA.</p>

        <div className="equipo-grid">
          <div className="miembro">
            <img src="../../public/FotoMauricio.jpeg" alt="Mauricio" />
            <h3>Mauricio Villanueva</h3>
            <p className="rol">Desarrollador Backend</p>
            <p>Encargado del desarrollo de la lógica central del sistema y la implementación de las funcionalidades principales CRUDs.
                Gestiona la seguridad avanzada de la aplicación, integrando mecanismos de autenticación segura con JWT.</p>
          </div>
          <div className="miembro">
            <img src="../../public/FotoAndrea.jpg" alt="Andrea Niño" />
            <h3>Andrea Niño</h3>
            <p className="rol">Full Stack Developer / Líder del Proyecto SenaDocs</p>
            <p>Creadora y líder de SenaDocs, desarrollo del frontend, documentación, diseño y supervisión del proyecto.
                Implementó la estructura base y los repositorios frontend y backend, facilitando el trabajo colaborativo del equipo y asegurando la usabilidad.</p>
          </div>
          <div className="miembro">
            <img src="../../public/FotoDylan.jpeg" alt="Dylan Sanchez" />
            <h3>Dylan Sanchez</h3>
            <p className="rol">Especialista en Base de Datos</p>
            <p>Responsable de la gestión de la base de datos y la infraestructura técnica del sistema.
              Su labor se centra en la instalación, configuración y mantenimiento de los entornos de la Base de Datos, asegurando la conectividad.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="PreguntasFrecuentes">
        <div className="faq-content">
          <div className="faq-texto">
            <h2>Preguntas Frecuentes</h2>
            <p>Respuestas rápidas a los problemas más comunes dentro de SENADOCS.</p>
            
            <div className="faq-bloque">
              <h3>📁 Carga de Archivos</h3>
              <details>
                <summary>¿Qué hacer si el sistema no renombra el PDF?</summary>
                <p>Esto puede pasar si el archivo tiene bloqueo de permisos o está abierto en otro programa...</p>
              </details>
              <details>
                <summary>¿Por qué no se cargan mis documentos PDF?</summary>
                <p>Puede deberse a que los archivos superan la cantidad máxima permitida o tienen caracteres no válidos...</p>
              </details>
              <details>
                <summary>¿Por qué no se generan las gráficas desde Excel?</summary>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </details>
            </div>

            <div className="faq-bloque">
              <h3>🔐 Gestión de Cuenta</h3>
              <details>
                <summary>¿Qué pasa si olvido mi contraseña y no recibo el enlace?</summary>
                <p>Verifica tu correo, revisa la carpeta de spam o comunícate con soporte técnico.</p>
              </details>
              <details>
                <summary>¿Por qué el sistema no guarda mis cambios en el perfil?</summary>
                <p>Puede deberse a errores de conexión o campos incompletos. Intenta nuevamente y asegúrate de guardar correctamente.</p>
              </details>
            </div>
          </div>

          <div className="faq-ilustracion">
            <IlustracionPreguntas/>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="Contacto">
        <div className="contacto-contenedor">
          <h2>Contacto</h2>
          <p className="contacto-intro">
            Si tienes alguna duda, no dudes en contactarnos:
          </p>

          <div className="contacto-numeros">
            <div className="contacto-item">
              <span className="icono"><IconLlamada/></span>
              <div>
                <strong>Mauricio Villanueva</strong><br />
                321 000 0000
              </div>
            </div>

            <div className="contacto-item">
              <span className="icono"><IconLlamada/></span>
              <div>
                <strong>Andrea Niño</strong><br />
                3188106387
              </div>
            </div>

            <div className="contacto-item">
              <span className="icono"><IconLlamada/></span>
              <div>
                <strong>Dylan Sánchez</strong><br />
                350 000 0000
              </div>
            </div>
          </div>

          <div className="contacto-correo">
            <span className="icono"><IconCorreo/></span>
            <div>
              <strong>Correo institucional:</strong><br />
              contacto@senadocs.com
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
}
