import React from 'react'
import Surtido_Mobile_Procesos from './Surtido_Mobile_Procesos'
import Tallado_Mobile_Procesos from './Tallado_Mobile_Procesos'
import Generado_Mobile_Procesos from './Generado_Mobile_Procesos'
import Pulido_Mobile_Procesos from './Pulido_Mobile_Procesos'
import Engraver_Mobile_Procesos from './Engraver_Mobile_Procesos'
import Desbloqueo_Mobile_Procesos from './Desbloqueo_Mobile_Procesos'
import AR_Mobile_Procesos from './AR_Mobile_Procesos'
import Terminado_Mobile_Procesos from './Terminado_Mobile_Procesos'
import Biselado_Mobile_Procesos from './Biselado_Mobile_Procesos'
import Produccion_Mobile_Procesos from './Produccion_Mobile_Procesos'

const Procesos__mobile = () => {
  return (
    <>
    <h1 className='mobile__heading'>Procesos</h1>
    <div className='mobile__procesos'>
        <Surtido_Mobile_Procesos/>
        <Tallado_Mobile_Procesos/>
        <Generado_Mobile_Procesos/>
        <Pulido_Mobile_Procesos/>
        <Engraver_Mobile_Procesos/>
        <Desbloqueo_Mobile_Procesos/>
        <AR_Mobile_Procesos/>
        <Terminado_Mobile_Procesos/>
        <Biselado_Mobile_Procesos/>
        <Produccion_Mobile_Procesos/>
    </div>
    </>
  )
}

export default Procesos__mobile
