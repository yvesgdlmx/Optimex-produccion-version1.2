import express from 'express'
import { obtenerRegistros, obtenerRegistrosTurnos } from '../controllers/historialController.js';

const router = express.Router();

router.get("/historial/:nombreModelo/:anio/:mes/:dia/:rangoHora", obtenerRegistros);
router.get("/historial-2/:anio/:mes/:dia", obtenerRegistrosTurnos);

export default router;