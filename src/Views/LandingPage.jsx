import { useState } from "react";
import "./LandingPage.css";
import IconLlamada from "../Icons/IconLlamada.jsx";
import IconCorreo from "../Icons/IconCorreo.jsx";
import IlustracionHero from "../Icons/IlustracionHero.jsx";
import IlustracionMotivos from "../Icons/IlustracionMotivos.jsx";
import IlustracionFuncionalidades from "../Icons/IlustracionFuncionalidades.jsx";
import IlustracionPreguntas from "../Icons/IlustracionPreguntas.jsx";
import RegistroModal from "../components/Registro";
import LoginModal from "../components/Login";
import RecuperarModal from "../components/Recuperar"
export default function LandingPage() {
  
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);

  // Funciones para alternar entre modales
  const abrirLogin = () => {
  setMostrarRegistro(false);
  setMostrarRecuperar(false);
  setMostrarLogin(true);
  };

  const abrirRegistro = () => {
    setMostrarLogin(false);
    setMostrarRecuperar(false);
    setMostrarRegistro(true);
  };

  const abrirRecuperar = () => {
    setMostrarLogin(false);
    setMostrarRegistro(false);
    setMostrarRecuperar(true); // 👈 abre recuperar contraseña
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SENADOCS</div>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#motivos">¿Por que se creo?</a></li>
          <li><a href="#funcionalidades">Funcionalidades</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#faq">Preguntas frecuentes</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <button className="btn-login" onClick={() => setMostrarLogin(true)}>Iniciar Sesion</button>
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
              <button onClick={() => setMostrarLogin(true)}>Iniciar Sesion</button>
              <button className="btn-secundario" onClick={() => setMostrarRegistro(true)}>Registrarse</button>
            </div>

            {/* Modales de Registro e Inicio de Sesion */}
           <RegistroModal
              visible={mostrarRegistro}
              onClose={() => setMostrarRegistro(false)}
              onLoginClick={abrirLogin}
            />

            <LoginModal
              visible={mostrarLogin}
              onClose={() => setMostrarLogin(false)}
              onRegistroClick={abrirRegistro}
              onRecuperarClick={abrirRecuperar} 
            />

            <RecuperarModal
              visible={mostrarRecuperar}
              onClose={() => setMostrarRecuperar(false)}
            />
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
                <p>Esto puede deberse a que el archivo está abierto en otro programa o tiene restricciones de permisos.
                  Cierra el documento y vuelve a intentarlo.
                  Si el problema persiste, verifica que el nombre del archivo no contenga caracteres especiales.
                  SenaDocs también te mostrará una alerta si el proceso no se completa correctamente.</p>
              </details>
              <details>
                <summary>¿Por qué no se cargan mis documentos PDF?</summary>
                <p>Puede suceder si el archivo supera el tamaño máximo permitido, tiene un nombre inválido o no está en formato PDF.
                  Actualmente, SenaDocs solo admite archivos con extensión .pdf para garantizar compatibilidad y seguridad.
                  Asegúrate de que el documento cumpla con estos requisitos antes de subirlo.</p>
              </details>
              <details>
                <summary>¿Por qué no se generan las gráficas desde Excel?</summary>
                <p>Esto ocurre cuando el archivo Excel no tiene encabezados o datos numéricos válidos.
                  Verifica que las columnas estén correctamente nombradas y contengan valores numéricos.
                  SenaDocs solo genera gráficas a partir de archivos estructurados correctamente.</p>
              </details>
            </div>

            <div className="faq-bloque">
              <h3>🔐 Gestión de Cuenta</h3>
              <details>
                <summary>¿Qué pasa si olvido mi contraseña y no recibo el enlace?</summary>
                <p>Asegúrate de ingresar el correo institucional registrado en tu cuenta.
                  En algunos casos, el mensaje puede llegar a la carpeta de Spam o correo no deseado.
                  Si aún no lo recibes, contacta al equipo de soporte a través de soporte.senadocs@gmail.com
                  para restablecer tu acceso.</p>
              </details>
              <details>
                <summary>¿Por qué el sistema no guarda mis cambios en el perfil?</summary>
                <p>Esto puede deberse a errores de validación en los campos (por ejemplo, dejar uno vacío o usar un formato incorrecto).
                  SenaDocs valida los datos antes de guardarlos para evitar inconsistencias.
                  Revisa los campos resaltados y vuelve a intentarlo.</p>
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
                320 9493878
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
                300 7277594
              </div>
            </div>
          </div>

          <div className="contacto-correo">
            <span className="icono"><IconCorreo/></span>
            <div>
              <strong>Correo institucional:</strong><br />
              soporte.senadocs@gmail.com
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
}
