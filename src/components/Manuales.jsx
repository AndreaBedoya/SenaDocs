import "./Manuales.css";

export default function Manuales ({ numero, titulo, descripcion, enlace, color }) {
  return (
    <div className="seccionManuales">
        <div className="tarjetaManuales">
            <div className="box">
                <div className="content">
                    <h2>{numero}</h2>
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>
                    <a href={enlace} style={{ background: color }} target="_blank" rel="noopener noreferrer">
                    Ver más
                    </a>
                </div>
            </div>
        </div>
        <div className="tarjetaManuales">
            <div className="box">
                <div className="content">
                    <h2>{numero}</h2>
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>
                    <a href={enlace} style={{ background: color }} target="_blank" rel="noopener noreferrer">
                    Ver más
                    </a>
                </div>
            </div>
        </div>
        <div className="tarjetaManuales">
            <div className="box">
                <div className="content">
                    <h2>{numero}</h2>
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>
                    <a href={enlace} style={{ background: color }} target="_blank" rel="noopener noreferrer">
                    Ver más
                    </a>
                </div>
            </div>
        </div>
    </div>
    
  );
}
