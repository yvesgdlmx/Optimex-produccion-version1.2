import express from 'express'
import { obtenerRegistros, obtenerTodos, registrosHora, registrosDia, obtenerRegistrosHoy } from '../controllers/manualController.js';

const router = express.Router();

router.get("/manual/:anio/:mes/:dia/:rangoHora", obtenerRegistros);
router.get("/manual/todos", obtenerTodos);
router.get('/manual/porhora/:anio/:mes/:dia/:hora', registrosHora);
router.get('/manual/pordia', registrosDia);
router.get('/manual/actualdia', obtenerRegistrosHoy)

export default router;