import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import FormularioEditarEngraver from "../../components/FormularioEditarEngraver";

const EditarEngraver = () => {
    const [meta, setMeta] =  useState({});
    const {id} = useParams();

    useEffect(() => {
        const obtenerMeta = async () => {
            const { data } = await clienteAxios(`/metas/metas-engravers/${id}`);
            setMeta(data);
        };
        obtenerMeta();
    }, []);

    console.log(meta)
    console.log(id)

  return (
    <>
    <div className="boton__link">
        <Link className="links" to={'/meta-engraver'}>
            <button className="boton__regresar">
                <img src="/back.png" alt="" className="boton__regresar-img" />
                Volver
            </button>
        </Link>
    </div>
    <div>
      <FormularioEditarEngraver
        meta={meta}
      />
    </div>
    </>
  )
}

export default EditarEngraver;
