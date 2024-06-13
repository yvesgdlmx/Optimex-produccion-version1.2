import express from 'express'
import { obtenerRegistros, obtenerRegistrosHoy, obtenerTodos, registrosDia, registrosHora } from '../controllers/registroController.js';

const router = express.Router();

router.get("/generadores/:anio/:mes/:dia/:rangoHora", obtenerRegistros);
router.get("/generadores/todos", obtenerTodos);
router.get('/generadores/porhora/:anio/:mes/:dia/:hora', registrosHora);
router.get('/generadores/pordia', registrosDia);
router.get('/generadores/actualdia', obtenerRegistrosHoy)

export default router;