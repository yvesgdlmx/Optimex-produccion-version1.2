import { Link } from "react-router-dom"

const Metas = () => {
  return (
    <>
    <h1 className="heading">Metas</h1>
    <p className="mt metas-p">Selecciona un proceso para administrar sus metas.</p>
    <div className="meta mt">
        <div className="meta__grid">
            <Link to={'/meta-generado'}>
                <div className="meta__campo">
                    <h2 className="meta__h2">Generadores</h2>
                </div>
            </Link>
            <Link to={'/meta-tallado'}>
                <div className="meta__campo">
                    <h2 className="meta__h2">Bloqueos de Tallado</h2>
                </div>
            </Link>
            <Link to={'/meta-pulido'}>
                <div className="meta__campo">
                    <h2 className="meta__h2">Pulidoras</h2>
                </div>
            </Link>
            <Link to={'/meta-engraver'}>
                <div className="meta__campo">
                    <h2 className="meta__h2">Engravers</h2>
                </div>
            </Link>
            <Link to={'/meta-terminado'}>
                <div className="meta__campo">
                    <h2 className="meta__h2">Bloqueos de Terminado</h2>
                </div>
            </Link>
            <Link to={'/meta-biselado'}>
                <div className="meta__campo">
                    <h2 className="meta__h2">Biseladoras</h2>
                </div>
            </Link>
            <Link to={'/meta-manual'}>
                <div className="meta__campo">
                    <h2 className="meta__h2">Estaciones Manuales</h2>
                </div>
            </Link>
        </div>
    </div>
    </>
  )
}

export default Metas
