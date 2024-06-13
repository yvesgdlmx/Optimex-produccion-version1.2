import React, { useEffect } from 'react';
import GeneradoresProcesos from "../components/GeneradoresProcesos";
import TalladosProcesos from "../components/TalladosProcesos";
import PulidosProcesos from "../components/PulidosProcesos";
import EngraversProcesos from "../components/EngraversProcesos";
import TerminadosProcesos from "../components/TerminadosProcesos";
import BiseladosProcesos from "../components/BiseladosProcesos";

const Procesos = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 300000); // Actualiza cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="heading">Procesos</h1>
      <p className="procesos__p-2">Visualiza los procesos, trabajos y metas de las estaciones</p>
      <TalladosProcesos />
      <GeneradoresProcesos />
      <PulidosProcesos />
      <EngraversProcesos />
      <TerminadosProcesos />
      <BiseladosProcesos />
    </>
  );
}

export default Procesos;