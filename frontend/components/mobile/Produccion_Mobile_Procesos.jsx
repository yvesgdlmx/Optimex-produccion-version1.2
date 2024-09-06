import React from 'react'
import { useState } from 'react';

const Produccion_Mobile_Procesos = () => {

    const [procesoOpen, setProcesoOpen] = useState(false);

    const toggleProceso = () => {
        setProcesoOpen(!procesoOpen)
    }

  return (
    <>
    <div className='mobile__proceso' onClick={toggleProceso}>
        <p className='mobile__nombre'>Producción</p>
        <img className='img__abrir' src="/img/flecha_abajo.png" alt="abrir"/>
    </div>
  
        {procesoOpen && (
            <div className="info__menu">
                <div className='info__flex'>
                    <div className='info__campo'>
                        <label className='info__label'>Hora: <span>12:30 - 13:30</span></label>
                        <label className='info__label'>Trabajos: <span className='info__rojo'>2500</span></label>
                        <label className='info__label'>Meta: <span>4000</span></label>
                    </div>
                    <div className='info__campo'>
                        <label className='info__label'>Matutino: <span className='info__verde'>1200</span></label>
                        <label className='info__label'>Vespertino: <span className='info__rojo'>950</span></label>
                        <label className='info__label'>Nocturno: <span className='info__verde'>1000</span></label>
                    </div>
                </div>
                <div className='info__contenedor-boton'>
                    <button className='info__button'>
                        ver producción
                    </button>
                </div>
            </div>
        )}
    </>
  )
}

export default Produccion_Mobile_Procesos
