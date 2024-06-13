import { useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { Link } from "react-router-dom";
import formatearHora from "../helpers/formatearHora";
import GeneradoHora from "../components/GeneradoHora";
import TalladoHora from "../components/TalladoHora";
import PulidoHora from "../components/PulidoHora";
import EngraverHora from "../components/EngraverHora";
import TerminadoHora from "../components/TerminadoHora";
import BiseladoHora from "../components/BiseladoHora";

const ProcesosHora = () => {
    useEffect(() => {
        const interval = setInterval(() => {
          window.location.reload();
        }, 300000); // Actualiza cada 5 minutos
    
        return () => clearInterval(interval);
      }, []);
      
    return (
        <>
            <h1 className="heading2 ml-2">Trabajos por hora</h1>
            <TalladoHora/>
            <GeneradoHora/>
            <PulidoHora/>
            <EngraverHora/>
            <TerminadoHora/>
            <BiseladoHora/>
        </>
    );
};

export default ProcesosHora;