import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { Link } from "react-router-dom";

const PulidosProcesos = () => {
    const [totalHits, setTotalHits] = useState(0);
    const [ultimaHora, setUltimaHora] = useState("");
    const [siguienteHora, setSiguienteHora] = useState("");
    const [meta, setMeta] = useState(0);
    const [hitsMatutino, setHitsMatutino] = useState(0);
    const [hitsVespertino, setHitsVespertino] = useState(0);
    const [hitsNocturno, setHitsNocturno] = useState(0);
    const [metaMatutino, setMetaMatutino] = useState(0);
    const [metaVespertino, setMetaVespertino] = useState(0);
    const [metaNocturno, setMetaNocturno] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener la suma de metas de los pulidos
                const responseMetas = await clienteAxios.get('/metas/metas-pulidos');
                const sumaMetas = responseMetas.data.registros.reduce((acc, curr) => acc + curr.meta, 0);

                // Obtener registros del día actual y calcular total de hits
                const responseRegistros = await clienteAxios.get('/pulido/pulido/actualdia');
                const registros = responseRegistros.data.registros;

                // Filtrar registros entre las 06:30 y las 23:00
                const horaInicio = new Date('1970/01/01 06:30:00');
                const horaFin = new Date('1970/01/01 23:00:00');
                const registrosFiltrados = registros.filter(registro => {
                    const horaRegistro = new Date('1970/01/01 ' + registro.hour);
                    return horaRegistro >= horaInicio && horaRegistro <= horaFin;
                });

                const total = registrosFiltrados.reduce((acc, curr) => acc + parseInt(curr.hits, 10), 0);
                setTotalHits(total);

                // Determinar la hora más cercana y la siguiente hora
                const ahora = new Date();
                let horaMasCercana = registrosFiltrados[0]?.hour || "06:30";
                let diferenciaMasCercana = Infinity;
                registrosFiltrados.forEach(registro => {
                    const diferencia = Math.abs(new Date('1970/01/01 ' + `${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}`) - new Date('1970/01/01 ' + registro.hour));
                    if (diferencia < diferenciaMasCercana) {
                        horaMasCercana = registro.hour;
                        diferenciaMasCercana = diferencia;
                    }
                });

                const formattedLastHour = new Date('1970/01/01 ' + horaMasCercana);
                setUltimaHora(`${formattedLastHour.getHours().toString().padStart(2, '0')}:${formattedLastHour.getMinutes().toString().padStart(2, '0')}`);
                const horaFinal = new Date('1970/01/01 ' + horaMasCercana);

                // Redondear la hora final a la media hora más cercana
                horaFinal.setMinutes(horaFinal.getMinutes() + 30 - (horaFinal.getMinutes() % 30));
                const horasTranscurridas = (horaFinal - horaInicio) / (1000 * 60 * 60);
                setMeta(Math.round(horasTranscurridas) * sumaMetas);

                // Configurar la siguiente hora
                const siguienteHoraDate = new Date(horaFinal.getTime());
                siguienteHoraDate.setMinutes(siguienteHoraDate.getMinutes() + 30);
                setSiguienteHora(`${siguienteHoraDate.getHours().toString().padStart(2, '0')}:${siguienteHoraDate.getMinutes().toString().padStart(2, '0')}`);

                // Calcular hits por turno
                const horaMatutinoInicio = new Date('1970/01/01 06:30:00');
                const horaMatutinoFin = new Date('1970/01/01 14:30:00');
                const horaVespertinoInicio = new Date('1970/01/01 14:30:00');
                const horaVespertinoFin = new Date('1970/01/01 21:30:00');
                const horaNocturnoInicio = new Date('1970/01/01 19:30:00');
                const horaNocturnoFin = new Date('1970/01/02 01:30:00'); // Note the change to the next day

                const hitsMatutino = registrosFiltrados.filter(registro => {
                    const horaRegistro = new Date('1970/01/01 ' + registro.hour);
                    return horaRegistro >= horaMatutinoInicio && horaRegistro < horaMatutinoFin;
                }).reduce((acc, curr) => acc + parseInt(curr.hits, 10), 0);

                const hitsVespertino = registrosFiltrados.filter(registro => {
                    const horaRegistro = new Date('1970/01/01 ' + registro.hour);
                    return horaRegistro >= horaVespertinoInicio && horaRegistro < horaVespertinoFin;
                }).reduce((acc, curr) => acc + parseInt(curr.hits, 10), 0);

                const hitsNocturno = registrosFiltrados.filter(registro => {
                    const horaRegistro = new Date('1970/01/01 ' + registro.hour);
                    return (horaRegistro >= horaNocturnoInicio && horaRegistro < horaNocturnoFin);
                }).reduce((acc, curr) => acc + parseInt(curr.hits, 10), 0);

                setHitsMatutino(hitsMatutino);
                setHitsVespertino(hitsVespertino);
                setHitsNocturno(hitsNocturno);

                // Calcular metas por turno
                const horasMatutino = 8; // 8 horas para el turno matutino
                const horasVespertino = 7; // 7 horas para el turno vespertino
                const horasNocturno = 6; // 6 horas para el turno nocturno

                setMetaMatutino(horasMatutino * sumaMetas);
                setMetaVespertino(horasVespertino * sumaMetas);
                setMetaNocturno(horasNocturno * sumaMetas);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, []);

    const getClassName = (hits, meta) => {
        if (hits === 0) {
            return "procesos-2__span-negro";
        }
        return hits >= meta ? "procesos-2__span-verde" : "procesos-2__span-rojo";
    };

    return (
        <>
            <Link className="link" to={'/procesos-horas#pulidos'}>
                <div className="procesos-2">
                    <div className="procesos-2__flex">
                        <p className="procesos-2__p-azul">Pulido</p>
                        <div className="procesos__campo-pulidos">
                            <p className="procesos-2__p">Trabajos: <br /><span className={meta > totalHits ? `procesos__span-2 generadores__uncheck` : `procesos__span-2 generadores__check`}>{totalHits}</span></p>
                            <p className="procesos-2__p">Meta: <br /><span className="procesos-2__span">{meta}</span></p>
                            <p className="procesos-2__p">Último Registro: <br /><span className="procesos-2__span">{ultimaHora} - {siguienteHora}</span></p>
                            <p className="procesos-2__p">Matutino: <br /><span className={getClassName(hitsMatutino, metaMatutino)}>{hitsMatutino}</span></p>
                            <p className="procesos-2__p">Vespertino: <br /><span className={getClassName(hitsVespertino, metaVespertino)}>{hitsVespertino}</span></p>
                            <p className="procesos-2__p">Nocturno: <br /><span className={getClassName(hitsNocturno, metaNocturno)}>{hitsNocturno}</span></p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default PulidosProcesos;