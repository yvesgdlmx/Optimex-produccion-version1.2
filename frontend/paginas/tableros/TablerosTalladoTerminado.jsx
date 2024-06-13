import { useState, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";

const TablerosTalladoTerminado = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [enPantallaCompleta, setEnPantallaCompleta] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [horasUnicas, setHorasUnicas] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [metasPorMaquina, setMetasPorMaquina] = useState({});
  const [totalesAcumulados, setTotalesAcumulados] = useState({});
  const [registros1, setRegistros1] = useState([]);
  const [horasUnicas1, setHorasUnicas1] = useState([]);
  const [maquinas1, setMaquinas1] = useState([]);
  const [metasPorMaquina1, setMetasPorMaquina1] = useState({});
  const [totalesAcumulados1, setTotalesAcumulados1] = useState({});
  const [registros2, setRegistros2] = useState([]);
  const [horasUnicas2, setHorasUnicas2] = useState([]);
  const [maquinas2, setMaquinas2] = useState([]);
  const [metasPorMaquina2, setMetasPorMaquina2] = useState({});
  const [totalesAcumulados2, setTotalesAcumulados2] = useState({});
  const [registros3, setRegistros3] = useState([]);
  const [horasUnicas3, setHorasUnicas3] = useState([]);
  const [maquinas3, setMaquinas3] = useState([]);
  const [metasPorMaquina3, setMetasPorMaquina3] = useState({});
  const [totalesAcumulados3, setTotalesAcumulados3] = useState({});
  const [registros4, setRegistros4] = useState([]);
  const [horasUnicas4, setHorasUnicas4] = useState([]);
  const [maquinas4, setMaquinas4] = useState([]);
  const [metasPorMaquina4, setMetasPorMaquina4] = useState({});
  const [totalesAcumulados4, setTotalesAcumulados4] = useState({});
  const [registros5, setRegistros5] = useState([]);
  const [horasUnicas5, setHorasUnicas5] = useState([]);
  const [maquinas5, setMaquinas5] = useState([]);
  const [metasPorMaquina5, setMetasPorMaquina5] = useState({});
  const [totalesAcumulados5, setTotalesAcumulados5] = useState({});
  const [tiempoRestante, setTiempoRestante] = useState(10); // Estado para el temporizador

  const cargarDatos = async () => {
    try {
      const responseMetas = await clienteAxios('/metas/metas-tallados');
      const metas = {};
      let metaAcumulada = 0;

      if (Array.isArray(responseMetas.data.registros)) {
        responseMetas.data.registros.forEach(meta => {
          const nombreMaquina = meta.name.trim().toUpperCase().replace(/\s+/g, ' ');
          metas[nombreMaquina] = meta.meta;
          metaAcumulada += meta.meta;
        });
      } else {
        console.error("La respuesta de las metas no contiene un array válido:", responseMetas.data);
      }
      setMetasPorMaquina(metas);

      const responseRegistros = await clienteAxios('/tallado/tallado/actualdia');
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

  const cargarDatosGeneradores = async () => {
    try {
      const responseMetas = await clienteAxios('/metas/metas-generadores');
      const metas = {};
      let metaAcumulada = 0;

      if (Array.isArray(responseMetas.data.registros)) {
        responseMetas.data.registros.forEach(meta => {
          const nombreMaquina = meta.name.trim().toUpperCase().replace(/\s+/g, ' ');
          metas[nombreMaquina] = meta.meta;
          metaAcumulada += meta.meta;
        });
      } else {
        console.error("La respuesta de las metas no contiene un array válido:", responseMetas.data);
      }
      setMetasPorMaquina1(metas);

      const responseRegistros = await clienteAxios('/generadores/generadores/actualdia');
      const dataRegistros = responseRegistros.data.registros || [];
      const registrosFiltrados = dataRegistros.filter(registro => {
        const hora = parseInt(registro.hour.split(":")[0], 10);
        return (hora > 5 && hora < 23);
      });
      setRegistros1(registrosFiltrados);

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

      setHorasUnicas1(horasConFormato);
      setMaquinas1(Array.from(maquinasUnicas));
      setTotalesAcumulados1(acumulados);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const cargarDatosPulidos = async () => {
    try {
      const responseMetas = await clienteAxios('/metas/metas-pulidos');
      const metas = {};
      let metaAcumulada = 0;

      if (Array.isArray(responseMetas.data.registros)) {
        responseMetas.data.registros.forEach(meta => {
          const nombreMaquina = meta.name.trim().toUpperCase().replace(/\s+/g, ' ');
          metas[nombreMaquina] = meta.meta;
          metaAcumulada += meta.meta;
        });
      } else {
        console.error("La respuesta de las metas no contiene un array válido:", responseMetas.data);
      }
      setMetasPorMaquina2(metas);

      const responseRegistros = await clienteAxios('/pulido/pulido/actualdia');
      const dataRegistros = responseRegistros.data.registros || [];
      const registrosFiltrados = dataRegistros.filter(registro => {
        const hora = parseInt(registro.hour.split(":")[0], 10);
        return (hora > 5 && hora < 23);
      });
      setRegistros2(registrosFiltrados);

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

      setHorasUnicas2(horasConFormato);
      setMaquinas2(Array.from(maquinasUnicas));
      setTotalesAcumulados2(acumulados);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const cargarDatosEngravers = async () => {
    try {
      const responseMetas = await clienteAxios('/metas/metas-engravers');
      const metas = {};
      let metaAcumulada = 0;

      if (Array.isArray(responseMetas.data.registros)) {
        responseMetas.data.registros.forEach(meta => {
          const nombreMaquina = meta.name.trim().toUpperCase().replace(/\s+/g, ' ');
          metas[nombreMaquina] = meta.meta;
          metaAcumulada += meta.meta;
        });
      } else {
        console.error("La respuesta de las metas no contiene un array válido:", responseMetas.data);
      }
      setMetasPorMaquina3(metas);

      const responseRegistros = await clienteAxios('/engraver/engraver/actualdia');
      const dataRegistros = responseRegistros.data.registros || [];
      const registrosFiltrados = dataRegistros.filter(registro => {
        const hora = parseInt(registro.hour.split(":")[0], 10);
        return (hora > 5 && hora < 23);
      });
      setRegistros3(registrosFiltrados);

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

      setHorasUnicas3(horasConFormato);
      setMaquinas3(Array.from(maquinasUnicas));
      setTotalesAcumulados3(acumulados);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const cargarDatosTerminado = async () => {
    try {
      const responseMetas = await clienteAxios('/metas/metas-terminados');
      const metas = {};
      let metaAcumulada = 0;

      if (Array.isArray(responseMetas.data.registros)) {
        responseMetas.data.registros.forEach(meta => {
          const nombreMaquina = meta.name.trim().toUpperCase().replace(/\s+/g, ' ');
          metas[nombreMaquina] = meta.meta;
          metaAcumulada += meta.meta;
        });
      } else {
        console.error("La respuesta de las metas no contiene un array válido:", responseMetas.data);
      }
      setMetasPorMaquina4(metas);

      const responseRegistros = await clienteAxios('/terminado/terminado/actualdia');
      const dataRegistros = responseRegistros.data.registros || [];
      const registrosFiltrados = dataRegistros.filter(registro => {
        const hora = parseInt(registro.hour.split(":")[0], 10);
        return (hora > 5 && hora < 23);
      });
      setRegistros4(registrosFiltrados);

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

      setHorasUnicas4(horasConFormato);
      setMaquinas4(Array.from(maquinasUnicas));
      setTotalesAcumulados4(acumulados);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const cargarDatosBiselado = async () => {
    try {
      const responseMetas = await clienteAxios('/metas/metas-biselados');
      const metas = {};
      let metaAcumulada = 0;

      if (Array.isArray(responseMetas.data.registros)) {
        responseMetas.data.registros.forEach(meta => {
          const nombreMaquina = meta.name.trim().toUpperCase().replace(/\s+/g, ' ');
          metas[nombreMaquina] = meta.meta;
          metaAcumulada += meta.meta;
        });
      } else {
        console.error("La respuesta de las metas no contiene un array válido:", responseMetas.data);
      }
      setMetasPorMaquina5(metas);

      const responseRegistros = await clienteAxios('/biselado/biselado/actualdia');
      const dataRegistros = responseRegistros.data.registros || [];
      const registrosFiltrados = dataRegistros.filter(registro => {
        const hora = parseInt(registro.hour.split(":")[0], 10);
        return (hora > 5 && hora < 23);
      });
      setRegistros5(registrosFiltrados);

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

      setHorasUnicas5(horasConFormato);
      setMaquinas5(Array.from(maquinasUnicas));
      setTotalesAcumulados5(acumulados);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };


  useEffect(() => {
    cargarDatos();
    cargarDatosGeneradores();
    cargarDatosPulidos();
    cargarDatosEngravers();
    cargarDatosTerminado();
    cargarDatosBiselado();
  }, []);

  // Calcular la suma total de los totales acumulados
  const sumaTotalAcumulados = Object.values(totalesAcumulados).reduce((acc, curr) => acc + curr, 0);
  const sumaTotalAcumulados1 = Object.values(totalesAcumulados1).reduce((acc, curr) => acc + curr, 0);
  const sumaTotalAcumulados2 = Object.values(totalesAcumulados2).reduce((acc, curr) => acc + curr, 0);
  const sumaTotalAcumulados3 = Object.values(totalesAcumulados3).reduce((acc, curr) => acc + curr, 0);
  const sumaTotalAcumulados4 = Object.values(totalesAcumulados4).reduce((acc, curr) => acc + curr, 0);
  const sumaTotalAcumulados5 = Object.values(totalesAcumulados5).reduce((acc, curr) => acc + curr, 0);


  // Calcular la meta acumulada total en función de las horas transcurridas
  const horasTranscurridas = horasUnicas.length;
  const horasTranscurridas1 = horasUnicas1.length;
  const horasTranscurridas2 = horasUnicas2.length;
  const horasTranscurridas3 = horasUnicas3.length;
  const horasTranscurridas4 = horasUnicas4.length;
  const horasTranscurridas5 = horasUnicas5.length;

  const metaAcumuladaTotal = maquinas.reduce((acc, maquina) => {
    const meta = metasPorMaquina[maquina] || 0;
    return acc + (meta * horasTranscurridas);
  }, 0);

  const metaAcumuladaTotal1 = maquinas1.reduce((acc, maquina) => {
    const meta = metasPorMaquina1[maquina] || 0;
    return acc + (meta * horasTranscurridas1);
  }, 0);

  const metaAcumuladaTotal2 = maquinas2.reduce((acc, maquina) => {
    const meta = metasPorMaquina2[maquina] || 0;
    return acc + (meta * horasTranscurridas2);
  }, 0);

  const metaAcumuladaTotal3 = maquinas3.reduce((acc, maquina) => {
    const meta = metasPorMaquina3[maquina] || 0;
    return acc + (meta * horasTranscurridas3);
  }, 0);

  const metaAcumuladaTotal4 = maquinas4.reduce((acc, maquina) => {
    const meta = metasPorMaquina4[maquina] || 0;
    return acc + (meta * horasTranscurridas4);
  }, 0);

  const metaAcumuladaTotal5 = maquinas5.reduce((acc, maquina) => {
    const meta = metasPorMaquina5[maquina] || 0;
    return acc + (meta * horasTranscurridas5);
  }, 0);

   // Calcular la suma total de las metas
   const sumaTotalMetas = maquinas.reduce((acc, maquina) => {
    return acc + (metasPorMaquina[maquina] || 0);
  }, 0);

  const sumaTotalMetas1 = maquinas1.reduce((acc, maquina) => {
    return acc + (metasPorMaquina1[maquina] || 0);
  }, 0);

  const sumaTotalMetas2 = maquinas2.reduce((acc, maquina) => {
    return acc + (metasPorMaquina2[maquina] || 0);
  }, 0);

  const sumaTotalMetas3 = maquinas3.reduce((acc, maquina) => {
    return acc + (metasPorMaquina3[maquina] || 0);
  }, 0);

  const sumaTotalMetas4 = maquinas4.reduce((acc, maquina) => {
    return acc + (metasPorMaquina4[maquina] || 0);
  }, 0);

  const sumaTotalMetas5 = maquinas5.reduce((acc, maquina) => {
    return acc + (metasPorMaquina5[maquina] || 0);
  }, 0);


  // Calcular la suma total de hits por hora
  const sumaHitsPorHora = horasUnicas.map(hora => {
    const horaSinFormato = hora.split(' - ')[0];
    return registros.filter(r => r.hour.startsWith(horaSinFormato))
      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
  });

  const sumaHitsPorHora1 = horasUnicas1.map(hora => {
    const horaSinFormato = hora.split(' - ')[0];
    return registros1.filter(r => r.hour.startsWith(horaSinFormato))
      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
  });

  const sumaHitsPorHora2 = horasUnicas2.map(hora => {
    const horaSinFormato = hora.split(' - ')[0];
    return registros2.filter(r => r.hour.startsWith(horaSinFormato))
      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
  });

  const sumaHitsPorHora3 = horasUnicas3.map(hora => {
    const horaSinFormato = hora.split(' - ')[0];
    return registros3.filter(r => r.hour.startsWith(horaSinFormato))
      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
  });

  const sumaHitsPorHora4 = horasUnicas4.map(hora => {
    const horaSinFormato = hora.split(' - ')[0];
    return registros4.filter(r => r.hour.startsWith(horaSinFormato))
      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
  });

  const sumaHitsPorHora5 = horasUnicas5.map(hora => {
    const horaSinFormato = hora.split(' - ')[0];
    return registros5.filter(r => r.hour.startsWith(horaSinFormato))
      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
  });



   // Calcular la meta por hora
   const metaPorHora = sumaTotalMetas;
   const metaPorHora1 = sumaTotalMetas1;
   const metaPorHora2 = sumaTotalMetas2;
   const metaPorHora3 = sumaTotalMetas3;
   const metaPorHora4 = sumaTotalMetas4;
   const metaPorHora5 = sumaTotalMetas5;

  // Determinar la clase para la suma total acumulada
  const claseSumaTotalAcumulados = sumaTotalAcumulados >= metaAcumuladaTotal ? "generadores__check" : "generadores__uncheck";
  const claseSumaTotalAcumulados1 = sumaTotalAcumulados1 >= metaAcumuladaTotal1 ? "generadores__check" : "generadores__uncheck";
  const claseSumaTotalAcumulados2 = sumaTotalAcumulados2 >= metaAcumuladaTotal2 ? "generadores__check" : "generadores__uncheck";
  const claseSumaTotalAcumulados3 = sumaTotalAcumulados3 >= metaAcumuladaTotal3 ? "generadores__check" : "generadores__uncheck";
  const claseSumaTotalAcumulados4 = sumaTotalAcumulados4 >= metaAcumuladaTotal4 ? "generadores__check" : "generadores__uncheck";
  const claseSumaTotalAcumulados5 = sumaTotalAcumulados5 >= metaAcumuladaTotal5 ? "generadores__check" : "generadores__uncheck";



  const tablas = [
    (
      <div key="tabla1" className='b-tabla__contenedor'>
       <table className="b-tabla__table">
          <thead className="b-tabla__thead">
            <tr className="b-tabla__tr-head">
              <th className="b-tabla__th-head text-align-left bg-color" colSpan="15"><p className="position-rela">tallado</p></th>
            </tr>
            <tr className="b-tabla__tr-head">
              <th className="b-tabla__th-head">Nombre</th>
              <th className="b-tabla__th-head">Total Acumulado</th>
              <th className="b-tabla__th-head">Meta</th>
              {horasUnicas.map((hora, index) => (
                <th key={index} className="b-tabla__th-head">{hora}</th>
              ))}
            </tr>
          </thead>
          <tbody className="b-tabla__tbody">
            {maquinas.map((maquina, index) => {
              const totalAcumulado = totalesAcumulados[maquina] || 0;
              const meta = metasPorMaquina[maquina] || 0;
              const metaAcumulada = meta * horasUnicas.length;
              const claseTotalAcumulado = totalAcumulado >= metaAcumulada ? "generadores__check" : "generadores__uncheck";

              return (
                <tr key={index} className="b-tabla__tr-body">
                  <td className="b-tabla__td-body">{maquina}</td>
                  <td className={`b-tabla__td-body ${claseTotalAcumulado}`}>{totalAcumulado}</td>
                  <td className="b-tabla__td-body">{meta || 'No definida'}</td>
                  {horasUnicas.map((hora, idx) => {
                    const horaSinFormato = hora.split(' - ')[0];
                    const totalHits = registros.filter(r => r.name.startsWith(maquina) && r.hour.startsWith(horaSinFormato))
                      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
                    return (
                      <td key={idx} className={totalHits >= meta ? "b-tabla__td-body generadores__check" : "b-tabla__td-body generadores__uncheck"}>
                        {totalHits}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="b-tabla__tr-body">
              <td className="b-tabla__td-body">Totales</td>
              <td className={`b-tabla__td-body ${claseSumaTotalAcumulados}`}>{sumaTotalAcumulados}</td>
              <td className="b-tabla__td-body fw">{sumaTotalMetas}</td>
              {sumaHitsPorHora.map((sumaHits, index) => {
                const claseSumaHits = sumaHits >= metaPorHora ? "generadores__check" : "generadores__uncheck";
                return (
                  <td key={index} className={`b-tabla__td-body fw ${claseSumaHits}`}>{sumaHits}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <table className="b-tabla__table mt-2">
          <thead className="b-tabla__thead">
            <tr className="b-tabla__tr-head">
              <th className="b-tabla__th-head text-align-left bg-color" colSpan="15"><p className="position-rela">Generado</p></th>
            </tr>
            <tr className="b-tabla__tr-head">
              <th className="b-tabla__th-head">Nombre</th>
              <th className="b-tabla__th-head">Total Acumulado</th>
              <th className="b-tabla__th-head">Meta</th>
              {horasUnicas1.map((hora, index) => (
                <th key={index} className="b-tabla__th-head">{hora}</th>
              ))}
            </tr>
          </thead>
          <tbody className="b-tabla__tbody">
            {maquinas1.map((maquina, index) => {
              const totalAcumulado = totalesAcumulados1[maquina] || 0;
              const meta = metasPorMaquina1[maquina] || 0;
              const metaAcumulada = meta * horasUnicas1.length;
              const claseTotalAcumulado = totalAcumulado >= metaAcumulada ? "generadores__check" : "generadores__uncheck";

              return (
                <tr key={index} className="b-tabla__tr-body">
                  <td className="b-tabla__td-body">{maquina}</td>
                  <td className={`b-tabla__td-body ${claseTotalAcumulado}`}>{totalAcumulado}</td>
                  <td className="b-tabla__td-body">{meta || 'No definida'}</td>
                  {horasUnicas1.map((hora, idx) => {
                    const horaSinFormato = hora.split(' - ')[0];
                    const totalHits = registros1.filter(r => r.name.startsWith(maquina) && r.hour.startsWith(horaSinFormato))
                      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
                    return (
                      <td key={idx} className={totalHits >= meta ? "b-tabla__td-body generadores__check" : "b-tabla__td-body generadores__uncheck"}>
                        {totalHits}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="b-tabla__tr-body">
              <td className="b-tabla__td-body">Totales</td>
              <td className={`b-tabla__td-body ${claseSumaTotalAcumulados1}`}>{sumaTotalAcumulados1}</td>
              <td className="b-tabla__td-body fw">{sumaTotalMetas1}</td>
              {sumaHitsPorHora1.map((sumaHits, index) => {
                const claseSumaHits = sumaHits >= metaPorHora1 ? "generadores__check" : "generadores__uncheck";
                return (
                  <td key={index} className={`b-tabla__td-body fw ${claseSumaHits}`}>{sumaHits}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    ),
    (
      <div key="tabla2" className='b-tabla__contenedor'>
         <table className="b-tabla__table">
          <thead className="b-tabla__thead">
            <tr className="b-tabla__tr-head">
              <th className="b-tabla__th-head text-align-left bg-color" colSpan="15"><p className="position-rela">Pulido</p></th>
            </tr>
            <tr className="b-tabla__tr-head">
              <th className="b-tabla__th-head">Nombre</th>
              <th className="b-tabla__th-head">Total Acumulado</th>
              <th className="b-tabla__th-head">Meta</th>
              {horasUnicas2.map((hora, index) => (
                <th key={index} className="b-tabla__th-head">{hora}</th>
              ))}
            </tr>
          </thead>
          <tbody className="b-tabla__tbody">
            {maquinas2.map((maquina, index) => {
              const totalAcumulado = totalesAcumulados2[maquina] || 0;
              const meta = metasPorMaquina2[maquina] || 0;
              const metaAcumulada = meta * horasUnicas2.length;
              const claseTotalAcumulado = totalAcumulado >= metaAcumulada ? "generadores__check" : "generadores__uncheck";

              return (
                <tr key={index} className="b-tabla__tr-body">
                  <td className="b-tabla__td-body">{maquina}</td>
                  <td className={`b-tabla__td-body ${claseTotalAcumulado}`}>{totalAcumulado}</td>
                  <td className="b-tabla__td-body">{meta || 'No definida'}</td>
                  {horasUnicas2.map((hora, idx) => {
                    const horaSinFormato = hora.split(' - ')[0];
                    const totalHits = registros2.filter(r => r.name.startsWith(maquina) && r.hour.startsWith(horaSinFormato))
                      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
                    return (
                      <td key={idx} className={totalHits >= meta ? "b-tabla__td-body generadores__check" : "b-tabla__td-body generadores__uncheck"}>
                        {totalHits}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="b-tabla__tr-body">
              <td className="b-tabla__td-body">Totales</td>
              <td className={`b-tabla__td-body ${claseSumaTotalAcumulados2}`}>{sumaTotalAcumulados2}</td>
              <td className="b-tabla__td-body fw">{sumaTotalMetas2}</td>
              {sumaHitsPorHora2.map((sumaHits, index) => {
                const claseSumaHits = sumaHits >= metaPorHora2 ? "generadores__check" : "generadores__uncheck";
                return (
                  <td key={index} className={`b-tabla__td-body fw ${claseSumaHits}`}>{sumaHits}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <table className="b-tabla__table mt-2">
          <thead className="b-tabla__thead">
            <tr className="b-tabla__tr-head">
              <th className="b-tabla__th-head text-align-left bg-color" colSpan="15"><p className="position-rela">Engraver</p></th>
            </tr>
            <tr className="b-tabla__tr-head">
              <th className="b-tabla__th-head">Nombre</th>
              <th className="b-tabla__th-head">Total Acumulado</th>
              <th className="b-tabla__th-head">Meta</th>
              {horasUnicas3.map((hora, index) => (
                <th key={index} className="b-tabla__th-head">{hora}</th>
              ))}
            </tr>
          </thead>
          <tbody className="b-tabla__tbody">
            {maquinas3.map((maquina, index) => {
              const totalAcumulado = totalesAcumulados3[maquina] || 0;
              const meta = metasPorMaquina3[maquina] || 0;
              const metaAcumulada = meta * horasUnicas3.length;
              const claseTotalAcumulado = totalAcumulado >= metaAcumulada ? "generadores__check" : "generadores__uncheck";

              return (
                <tr key={index} className="b-tabla__tr-body">
                  <td className="b-tabla__td-body">{maquina}</td>
                  <td className={`b-tabla__td-body ${claseTotalAcumulado}`}>{totalAcumulado}</td>
                  <td className="b-tabla__td-body">{meta || 'No definida'}</td>
                  {horasUnicas3.map((hora, idx) => {
                    const horaSinFormato = hora.split(' - ')[0];
                    const totalHits = registros3.filter(r => r.name.startsWith(maquina) && r.hour.startsWith(horaSinFormato))
                      .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
                    return (
                      <td key={idx} className={totalHits >= meta ? "b-tabla__td-body generadores__check" : "b-tabla__td-body generadores__uncheck"}>
                        {totalHits}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="b-tabla__tr-body">
              <td className="b-tabla__td-body">Totales</td>
              <td className={`b-tabla__td-body ${claseSumaTotalAcumulados3}`}>{sumaTotalAcumulados3}</td>
              <td className="b-tabla__td-body fw">{sumaTotalMetas3}</td>
              {sumaHitsPorHora3.map((sumaHits, index) => {
                const claseSumaHits = sumaHits >= metaPorHora3 ? "generadores__check" : "generadores__uncheck";
                return (
                  <td key={index} className={`b-tabla__td-body fw ${claseSumaHits}`}>{sumaHits}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    ),
    (
        <div key="tabla3" className='b-tabla__contenedor'>
           <table className="b-tabla__table">
            <thead className="b-tabla__thead">
              <tr className="b-tabla__tr-head">
                <th className="b-tabla__th-head text-align-left bg-color" colSpan="15"><p className="position-rela">terminado</p></th>
              </tr>
              <tr className="b-tabla__tr-head">
                <th className="b-tabla__th-head">Nombre</th>
                <th className="b-tabla__th-head">Total Acumulado</th>
                <th className="b-tabla__th-head">Meta</th>
                {horasUnicas4.map((hora, index) => (
                  <th key={index} className="b-tabla__th-head">{hora}</th>
                ))}
              </tr>
            </thead>
            <tbody className="b-tabla__tbody">
              {maquinas4.map((maquina, index) => {
                const totalAcumulado = totalesAcumulados4[maquina] || 0;
                const meta = metasPorMaquina4[maquina] || 0;
                const metaAcumulada = meta * horasUnicas2.length;
                const claseTotalAcumulado = totalAcumulado >= metaAcumulada ? "generadores__check" : "generadores__uncheck";
  
                return (
                  <tr key={index} className="b-tabla__tr-body">
                    <td className="b-tabla__td-body">{maquina}</td>
                    <td className={`b-tabla__td-body ${claseTotalAcumulado}`}>{totalAcumulado}</td>
                    <td className="b-tabla__td-body">{meta || 'No definida'}</td>
                    {horasUnicas4.map((hora, idx) => {
                      const horaSinFormato = hora.split(' - ')[0];
                      const totalHits = registros4.filter(r => r.name.startsWith(maquina) && r.hour.startsWith(horaSinFormato))
                        .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
                      return (
                        <td key={idx} className={totalHits >= meta ? "b-tabla__td-body generadores__check" : "b-tabla__td-body generadores__uncheck"}>
                          {totalHits}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr className="b-tabla__tr-body">
                <td className="b-tabla__td-body">Totales</td>
                <td className={`b-tabla__td-body ${claseSumaTotalAcumulados4}`}>{sumaTotalAcumulados4}</td>
                <td className="b-tabla__td-body fw">{sumaTotalMetas4}</td>
                {sumaHitsPorHora4.map((sumaHits, index) => {
                  const claseSumaHits = sumaHits >= metaPorHora4 ? "generadores__check" : "generadores__uncheck";
                  return (
                    <td key={index} className={`b-tabla__td-body fw ${claseSumaHits}`}>{sumaHits}</td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ),
      (
        <div key="tabla4" className='b-tabla__contenedor'>
           <table className="b-tabla__table">
            <thead className="b-tabla__thead">
              <tr className="b-tabla__tr-head">
                <th className="b-tabla__th-head text-align-left bg-color" colSpan="15"><p className="position-rela">Biselado</p></th>
              </tr>
              <tr className="b-tabla__tr-head">
                <th className="b-tabla__th-head">Nombre</th>
                <th className="b-tabla__th-head">Total Acumulado</th>
                <th className="b-tabla__th-head">Meta</th>
                {horasUnicas5.map((hora, index) => (
                  <th key={index} className="b-tabla__th-head">{hora}</th>
                ))}
              </tr>
            </thead>
            <tbody className="b-tabla__tbody">
              {maquinas5.map((maquina, index) => {
                const totalAcumulado = totalesAcumulados5[maquina] || 0;
                const meta = metasPorMaquina5[maquina] || 0;
                const metaAcumulada = meta * horasUnicas2.length;
                const claseTotalAcumulado = totalAcumulado >= metaAcumulada ? "generadores__check" : "generadores__uncheck";
  
                return (
                  <tr key={index} className="b-tabla__tr-body">
                    <td className="b-tabla__td-body">{maquina}</td>
                    <td className={`b-tabla__td-body ${claseTotalAcumulado}`}>{totalAcumulado}</td>
                    <td className="b-tabla__td-body">{meta || 'No definida'}</td>
                    {horasUnicas5.map((hora, idx) => {
                      const horaSinFormato = hora.split(' - ')[0];
                      const totalHits = registros5.filter(r => r.name.startsWith(maquina) && r.hour.startsWith(horaSinFormato))
                        .reduce((acc, curr) => acc + parseInt(curr.hits || 0), 0);
                      return (
                        <td key={idx} className={totalHits >= meta ? "b-tabla__td-body generadores__check" : "b-tabla__td-body generadores__uncheck"}>
                          {totalHits}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr className="b-tabla__tr-body">
                <td className="b-tabla__td-body">Totales</td>
                <td className={`b-tabla__td-body ${claseSumaTotalAcumulados5}`}>{sumaTotalAcumulados5}</td>
                <td className="b-tabla__td-body fw">{sumaTotalMetas5}</td>
                {sumaHitsPorHora5.map((sumaHits, index) => {
                  const claseSumaHits = sumaHits >= metaPorHora5 ? "generadores__check" : "generadores__uncheck";
                  return (
                    <td key={index} className={`b-tabla__td-body fw ${claseSumaHits}`}>{sumaHits}</td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ),
  ];

  const handleAnterior = () => {
    setPaginaActual((prevPagina) => (prevPagina > 0 ? prevPagina - 1 : tablas.length - 1));
  };

  const handleSiguiente = () => {
    setPaginaActual((prevPagina) => (prevPagina < tablas.length - 1 ? prevPagina + 1 : 0));
    setTiempoRestante(30); // Reinicia el temporizador
  };

  const handleFullScreen = () => {
    const elem = document.getElementById('fullscreen-table-container');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
    setEnPantallaCompleta(true);
    setPaginaActual(0); // Reinicia a la primera tabla
    setTiempoRestante(30); // Inicia el temporizador
    setTimeout(() => {
      const tableContainer = document.querySelector('.a-tabla__contenedor');
      if (tableContainer) {
        tableContainer.scrollLeft = 0; // Desplaza a la primera columna
      }
    }, 1000); // Espera un momento para asegurar que el modo completo se haya activado
  };

  useEffect(() => {
    let interval;
    if (enPantallaCompleta) {
      interval = setInterval(() => {
        setTiempoRestante((prevTiempo) => {
          if (prevTiempo === 1) {
            handleSiguiente(); // Cambia de tabla cuando el temporizador llega a 0
            cargarDatos(); // Llama a la función para actualizar los datos
            cargarDatosGeneradores(); // Llama a la función para actualizar los datos
            cargarDatosPulidos();
            cargarDatosEngravers();
            return 10; // Reinicia el temporizador
          }
          return prevTiempo - 1;
        });
      }, 1000); // Actualiza cada segundo
    }
    return () => clearInterval(interval);
  }, [enPantallaCompleta]);

  return (
    <>
      <h1 className="heading">Tableros</h1>
      <p className="heading__texto">Mostrando información del área de tallado</p>
      <div className="paginador__acciones">
        <button className="paginador__pantalla-completa" onClick={handleFullScreen}>
          Pantalla Completa</button>
      </div>
      <div id="fullscreen-table-container" className='a-tabla'>
        {tablas[paginaActual]}
        {enPantallaCompleta && (
          <div className="temporizador">
            Cambio en: {tiempoRestante} segundos
          </div>
        )}
      </div>
      <div className="paginador">
          <button className="paginador__back" onClick={handleAnterior}>
            <img src="/img/back2.png" alt="back2" className="paginador__img" />
            Anterior
          </button>
          <button className="paginador__next" onClick={handleSiguiente}>
            Siguiente
            <img src="/img/next2.png" alt="next2" className="paginador__img" />
          </button>
      </div>
    </>
  );
}

export default TablerosTalladoTerminado