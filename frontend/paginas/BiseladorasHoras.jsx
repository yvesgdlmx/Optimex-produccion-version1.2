import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const BiseladorasHoras = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 300000); // Actualiza cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  const [registros, setRegistros] = useState([]);
  const [horasUnicas, setHorasUnicas] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [metasPorMaquina, setMetasPorMaquina] = useState({});
  const [totalesAcumulados, setTotalesAcumulados] = useState({});

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const responseMetas = await clienteAxios('/metas/metas-biselados');
        const metas = {};
        if (Array.isArray(responseMetas.data.registros)) {
          responseMetas.data.registros.forEach(meta => {
            metas[meta.name.trim().toUpperCase().replace(/\s+/g, ' ')] = meta.meta;
          });
        } else {
          console.error("La respuesta de las metas no contiene un array válido:", responseMetas.data);
        }
        setMetasPorMaquina(metas);

        const responseRegistros = await clienteAxios('/biselado/biselado/actualdia');
        const dataRegistros = responseRegistros.data.registros || [];
        const registrosFiltrados = dataRegistros.filter(registro => {
          const hora = parseInt(registro.hour.split(":")[0], 10);
          return (hora > 5 && hora < 23);
        });
        setRegistros(registrosFiltrados);

        const horas = new Set();
        const maquinasUnicas = new Set();
        const acumulados = {};
        registrosFiltrados.forEach(registro => {
          horas.add(registro.hour);
          const maquina = registro.name.split("-")[0].trim().toUpperCase().replace(/\s+/g, ' ');
          maquinasUnicas.add(maquina);
          acumulados[maquina] = (acumulados[maquina] || 0) + parseInt(registro.hits || 0);
        });

        const horasArray = Array.from(horas).sort().reverse();
        const horasConFormato = horasArray.map(hora => {
          const [horaInicial, minutos, segundos] = hora.split(':');
          const horaFinal = (parseInt(horaInicial, 10) + 1) % 24;
          return `${horaInicial}:${minutos} - ${horaFinal.toString().padStart(2, '0')}:${minutos}`;
        });

        setHorasUnicas(horasConFormato);
        setMaquinas(Array.from(maquinasUnicas));
        setTotalesAcumulados(acumulados);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();
  }, []);

  // Calcular la suma total de los totales acumulados
  const sumaTotalAcumulados = Object.values(totalesAcumulados).reduce((acc, curr) => acc + curr, 0);

  // Calcular la meta acumulada total en función de las horas transcurridas
  const horasTranscurridas = horasUnicas.length;
  const metaAcumuladaTotal = maquinas.reduce((acc, maquina) => {
    const meta = metasPorMaquina[maquina] || 0;
    return acc + (meta * horasTranscurridas);
  }, 0);

  // Calcular la suma total de las metas
  const sumaTotalMetas = maquinas.reduce((acc, maquina) => {
    return acc + (metasPorMaquina[maquina] || 0);
  }, 0);

  // Calcular la suma total de hits por hora
  const sumaHitsPorHora = horasUnicas.map(hora => {
    const horaSinFormato = hora.split(' - ')[0];
    return registros.filter(r => r.hour.startsWith(horaSinFormato))
      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
  });

  // Calcular la meta por hora
  const metaPorHora = sumaTotalMetas;

  // Determinar la clase para la suma total acumulada
  const claseSumaTotalAcumulados = sumaTotalAcumulados >= metaAcumuladaTotal ? "generadores__check" : "generadores__uncheck";

  return (
    <>
      <div className="boton__link">
        <Link to={"/procesos-horas"}>
          <button className="boton__regresar">
            <img src="/back.png" alt="" className="boton__regresar-img" />
            Volver
          </button>
        </Link>
      </div>
      <h1 className="heading2">Biselado</h1>
      <div>
        <table className="a-tabla__table">
          <thead className="a-tabla__thead">
            <tr className="a-tabla__tr-head">
              <th className="a-tabla__th-head">Nombre</th>
              <th className="a-tabla__th-head">Total Acumulado</th>
              <th className="a-tabla__th-head">Meta</th>
              {horasUnicas.map((hora, index) => (
                <th key={index} className="a-tabla__th-head">{hora}</th>
              ))}
            </tr>
          </thead>
          <tbody className="a-tabla__tbody">
            {maquinas.map((maquina, index) => {
              const totalAcumulado = totalesAcumulados[maquina] || 0;
              const meta = metasPorMaquina[maquina] || 0;
              const metaAcumulada = meta * horasUnicas.length;
              const claseTotalAcumulado = totalAcumulado >= metaAcumulada ? "generadores__check" : "generadores__uncheck";
              return (
                <tr key={index} className="a-tabla__tr-body">
                  <td className="a-tabla__td-body">{maquina}</td>
                  <td className={`a-tabla__td-body ${claseTotalAcumulado}`}>{totalAcumulado}</td>
                  <td className="a-tabla__td-body">{meta || 'No definida'}</td>
                  {horasUnicas.map((hora, idx) => {
                    const horaSinFormato = hora.split(' - ')[0];
                    const totalHits = registros.filter(r => r.name.startsWith(maquina) && r.hour.startsWith(horaSinFormato))
                      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
                    return (
                      <td key={idx} className={totalHits >= meta ? "a-tabla__td-body generadores__check" : "a-tabla__td-body generadores__uncheck"}>
                        {totalHits}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="a-tabla__tr-body">
              <td className="a-tabla__td-body">Totales</td>
              <td className={`a-tabla__td-body fw ${claseSumaTotalAcumulados}`}>{sumaTotalAcumulados}</td>
              <td className="a-tabla__td-body fw">{sumaTotalMetas}</td>
              {sumaHitsPorHora.map((sumaHits, index) => {
                const claseSumaHits = sumaHits >= metaPorHora ? "generadores__check" : "generadores__uncheck";
                return (
                  <td key={index} className={`a-tabla__td-body fw ${claseSumaHits}`}>{sumaHits}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BiseladorasHoras;