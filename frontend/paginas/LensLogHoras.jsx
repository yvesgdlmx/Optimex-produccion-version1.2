import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const LensLogHoras = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 300000); // Actualiza cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  const [registros, setRegistros] = useState([]);
  const [horasUnicas, setHorasUnicas] = useState([]);
  const [meta, setMeta] = useState(0);
  const [totalesAcumulados, setTotalesAcumulados] = useState(0);
  const [totalesPorTurno, setTotalesPorTurno] = useState({
    matutino: 0,
    vespertino: 0,
    nocturno: 0
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const responseMetas = await clienteAxios('/metas/metas-manuales');
        const metasLensLog = responseMetas.data.registros.filter(meta => meta.name.includes('LENS LOG'));
        const sumaMetas = metasLensLog.reduce((acc, meta) => acc + meta.meta, 0);
        setMeta(sumaMetas);

        const responseRegistros = await clienteAxios('/manual/manual/actualdia');
        const dataRegistros = responseRegistros.data.registros || [];
        const registrosFiltrados = dataRegistros.filter(registro => {
          const hora = parseInt(registro.hour.split(":")[0], 10);
          return (hora > 5 && hora < 23) && registro.name.includes('LENS LOG');
        });

        const horas = new Set();
        let totalAcumulado = 0;
        registrosFiltrados.forEach(registro => {
          horas.add(registro.hour);
          totalAcumulado += parseInt(registro.hits || 0);
        });

        const horasArray = Array.from(horas).sort().reverse();
        const horasConFormato = horasArray.map(hora => {
          const [horaInicial, minutos] = hora.split(':');
          const horaFinal = (parseInt(horaInicial, 10) + 1) % 24;
          return `${horaInicial}:${minutos} - ${horaFinal.toString().padStart(2, '0')}:${minutos}`;
        });

        setHorasUnicas(horasConFormato);
        setTotalesAcumulados(totalAcumulado);
        setRegistros(registrosFiltrados);
        calcularTotalesPorTurno(registrosFiltrados);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    cargarDatos();
  }, []);

  const agruparHitsPorHora = () => {
    const hitsPorHora = {};
    registros.forEach((registro) => {
      const hora = registro.hour;
      if (hitsPorHora[hora]) {
        hitsPorHora[hora] += registro.hits;
      } else {
        hitsPorHora[hora] = registro.hits;
      }
    });
    return hitsPorHora;
  };

  const calcularTotalesPorTurno = (registros) => {
    const totales = {
      matutino: 0,
      vespertino: 0,
      nocturno: 0
    };
    registros.forEach(registro => {
      const [hora, minuto] = registro.hour.split(':').map(Number);
      const minutosTotales = hora * 60 + minuto;
      if (minutosTotales >= 390 && minutosTotales < 870) { // 06:30 - 14:30
        totales.matutino += registro.hits;
      } else if (minutosTotales >= 870 && minutosTotales < 1290) { // 14:30 - 21:30
        totales.vespertino += registro.hits;
      } else if (minutosTotales >= 1170 && minutosTotales < 1380) { // 19:30 - 23:00
        totales.nocturno += registro.hits;
      }
    });
    setTotalesPorTurno(totales);
  };

  const hitsPorHora = agruparHitsPorHora();
  const horasOrdenadas = Object.keys(hitsPorHora).sort().reverse();
  const filaGenerados = horasOrdenadas.map((hora) => hitsPorHora[hora]);

  const formatearHoraSinSegundos = (hora) => {
    return hora.slice(0, 5); // Esto eliminará los segundos de la hora
  };

  const calcularRangoHoras = (horaInicio) => {
    const horaInicioFormateada = formatearHoraSinSegundos(horaInicio);
    const horaFin = new Date(new Date(`2000-01-01 ${horaInicio}`).getTime() + 60 * 60 * 1000).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'});
    return `${horaInicioFormateada} - ${horaFin}`;
  };

  const sumaHitsPorHora = horasUnicas.map(hora => {
    const horaSinFormato = hora.split(' - ')[0];
    return registros.filter(r => r.hour.startsWith(horaSinFormato))
      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
  });

  const metaPorHora = meta;
  const claseSumaTotalAcumulados = totalesAcumulados >= (meta * horasUnicas.length) ? "generadores__check" : "generadores__uncheck";

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
      <h1 className="heading2">Lens Log</h1>
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
            <tr className="a-tabla__tr-body">
              <td className="a-tabla__td-body">Lens Log</td>
              <td className={`a-tabla__td-body ${claseSumaTotalAcumulados}`}>{totalesAcumulados}</td>
              <td className="a-tabla__td-body">{meta || 'No definida'}</td>
              {horasUnicas.map((hora, idx) => {
                const horaSinFormato = hora.split(' - ')[0];
                const totalHits = registros.filter(r => r.hour.startsWith(horaSinFormato))
                  .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
                return (
                  <td key={idx} className={totalHits >= meta ? "a-tabla__td-body generadores__check" : "a-tabla__td-body generadores__uncheck"}>
                    {totalHits}
                  </td>
                );
              })}
            </tr>
            <tr className="a-tabla__tr-body">
              <td className="a-tabla__td-body">Totales</td>
              <td className={`a-tabla__td-body fw ${claseSumaTotalAcumulados}`}>{totalesAcumulados}</td>
              <td className="a-tabla__td-body fw">{meta}</td>
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
      <div className='tabla__div'>
        <div className='tabla__campo position-rela-2'>
          <p className='tabla__p'>Total Matutino: <span className='tabla__span'>{totalesPorTurno.matutino}</span></p>
        </div>
        <div className='tabla__campo position-rela-2'>
          <p className='tabla__p'>Total Vespertino: <span className='tabla__span'>{totalesPorTurno.vespertino}</span></p>
        </div>
        <div className='tabla__campo position-rela-2'>
          <p className='tabla__p'>Total Nocturno: <span className='tabla__span'>{totalesPorTurno.nocturno}</span></p>
        </div>
      </div>
    </>
  );
};

export default LensLogHoras;