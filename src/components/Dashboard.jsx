import  IconColapsar from '../Icons/IconColapsar.jsx';
import  IconInicio from '../Icons/IconInicio.jsx';
import  IconPDF from '../Icons/IconPDF.jsx';
import  IconPorcentaje from '../Icons/IconPorcentaje.jsx';
import  IconNovedades from '../Icons/IconNovedades.jsx';
import  IconPerfil from '../Icons/IconPerfil.jsx';
import  IconLogout from '../Icons/IconLogout.jsx';
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebarContent">
          {/* LOGO Y BOTÓN DE COLAPSAR */}
          <div className="logo">
            <img src="/SenaDocs Blanco.png" alt="SENADOCS" />
            <button className="toggleBarra">
              <IconColapsar/>
            </button>
          </div>

          {/* MENÚ PRINCIPAL */}
          <div className="upperSidebar">
            <nav className="menu">
              <a href="/dashboard" className="sidebarLink">
                <IconInicio/>
                <span>Inicio</span>
              </a>
              <a href="/renombrar-pdf" className="sidebarLink">
                <IconPDF/>
                <span>Renombrar PDF</span>
              </a>
              <a href="/juicios-evaluativos" className="sidebarLink">
                <IconPorcentaje/>
                <span>Juicios evaluativos</span>
              </a>
              <a href="/novedades-academicas" className="sidebarLink">
                <IconNovedades/>
                <span>Novedades académicas</span>
              </a>
            </nav>
          </div>

          {/* BOTONES INFERIORES */}
          <div className="botones">
            <a href="/perfil" className="sidebarLink">
              <IconPerfil/>
              <span>Perfil</span>
            </a>
            <button className="sidebarLink">
              <IconLogout/>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="main-conten">
        
      </main>
    </div>
  );
}
