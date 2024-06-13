import express from 'express'
import { obtenerRegistros, obtenerTodos, registrosHora, registrosDia, obtenerRegistrosHoy } from '../controllers/bloqueoTerminadoController.js';

const router = express.Router();

router.get("/terminado/:anio/:mes/:dia/:rangoHora", obtenerRegistros);
router.get("/terminado/todos", obtenerTodos);
router.get('/terminado/porhora/:anio/:mes/:dia/:hora', registrosHora);
router.get('/terminado/pordia', registrosDia);
router.get('/terminado/actualdia', obtenerRegistrosHoy)

export default router;