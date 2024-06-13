import { Link } from "react-router-dom";

const Tableros = () => {
  return (
    <>
      <h1 className="heading">Tableros de Producción</h1>
      <p className="heading__texto">Elige un área para mostrar</p>
      <div className="tableros">
        <div className="tableros__grid">
          <Link to="/tableros-tallado" className="tableros__link">
            <div className="tableros__campo">
              <p className="tableros__p">Tallado</p>
            </div>
          </Link>
          <Link to="/tableros-terminado" className="tableros__link">
            <div className="tableros__campo">
              <p className="tableros__p">Terminado</p>
            </div>
          </Link>
          <Link to="/tableros-tallado&terminado" className="tableros__link">
            <div className="tableros__campo">
              <p className="tableros__p">Tallado y Terminado</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Tableros;