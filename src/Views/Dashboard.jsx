import { useSidebarStore } from "../Store/useSidebarStore"; 
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ACA SE IMPORTAN LOS ICONOS
import IconUsuarios from "../Icons/IconUsuarios.jsx";
import IconAyuda from "../Icons/IconAyuda.jsx";
import IconColapsar from "../Icons/IconColapsar.jsx";
import IconInicio from "../Icons/IconInicio.jsx";
import IconPDF from "../Icons/IconPDF.jsx";
import IconPorcentaje from "../Icons/IconPorcentaje.jsx";
import IconNovedades from "../Icons/IconNovedades.jsx";
import IconPerfil from "../Icons/IconPerfil.jsx";
import IconLogout from "../Icons/IconLogout.jsx";
// ACA SE IMPORTAN LOS COMPONENTES
import BarraBusqueda from "../components/BarraBusqueda.jsx";
// ACA SE IMPORTAN LOS BOTONES
import BotonCerrarSesion from "../Botones/BotonCerrarSesion";
import BotonPerfil from "../Botones/BotonPerfil";
// ESTILOS PROPIOS DEL COMPONENETE DASHBOARD
import "./Dashboard.css";

export default function Dashboard() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  const navigate = useNavigate();

  const handleBusqueda = (query) => {
    console.log("Buscando:", query);
    // Aquí puedes agregar lógica para filtrar, navegar, etc.
  };

  return (
    <div className={`dashboard-container ${isCollapsed ? "collapsed" : ""}`}>
      <aside className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="sidebarContent">
          {/* LOGO Y BOTÓN DE COLAPSAR */}
          <div className={`logoDashboard ${isCollapsed ? "ocultar-logo" : ""}`}>
            <img src="/SenaDocs Blanco.png" alt="SENADOCS" />
            <button className="toggleBarra" onClick={toggleSidebar}>
              <IconColapsar />
            </button>
          </div>


          {/* MENÚ PRINCIPAL */}
          <div className="upperSidebar">
            <nav className="menu">
              <Link to="/dashboard" className="sidebarLink">
                <IconInicio />
                {!isCollapsed && <span>Inicio</span>}
              </Link>

              <Link to="/dashboard/renombrar-pdf" className="sidebarLink">
                <IconPDF />
                {!isCollapsed && <span>Renombrar PDF</span>}
              </Link>

              <Link to="/dashboard/juicios-evaluativos" className="sidebarLink">
                <IconPorcentaje />
                {!isCollapsed && <span>Juicios evaluativos</span>}
              </Link>

              <Link to="/dashboard/novedades-academicas" className="sidebarLink">
                <IconNovedades />
                {!isCollapsed && <span>Novedades académicas</span>}
              </Link>

              <Link to="/dashboard/gestion-usuarios" className="sidebarLink">
                <IconUsuarios />
                {!isCollapsed && <span>Gestionar usuarios</span>}
              </Link>

              <Link to="/dashboard/centro-ayuda" className="sidebarLink">
                <IconAyuda /> {/* ← aquí agregas tu ícono */}
                {!isCollapsed && <span>Centro de ayuda</span>}
              </Link>
            </nav>
          </div>
        </div>

        {/* BOTONES INFERIORES */}
        <div className="botones">
          <BotonPerfil
            texto={!isCollapsed ? "Perfil" : ""}
            Icon={IconPerfil}
            className="boton-dashboard"
            onClick={() => navigate("/dashboard/perfil")}
          />

          <BotonCerrarSesion
            texto={!isCollapsed ? "Salir" : ""}
            Icon={IconLogout}
            className="boton-dashboard"
          />
        </div>
      </aside>

      <main className="main-content">
        <BarraBusqueda
          onBuscar={handleBusqueda}
          className={`barra-busqueda ${isCollapsed ? "busqueda-colapsada" : ""}`}
        />
        <Outlet /> {/* Aquí se renderiza el dashboard funcional */}
        
      </main>
    </div>
  );
}
