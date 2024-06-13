import express from 'express'
import { obtenerRegistros, obtenerTodos, registrosHora, registrosDia, obtenerRegistrosHoy } from '../controllers/bloqueoTalladoController.js';

const router = express.Router();

router.get("/tallado/:anio/:mes/:dia/:rangoHora", obtenerRegistros);
router.get("/tallado/todos", obtenerTodos);
router.get('/tallado/porhora/:anio/:mes/:dia/:hora', registrosHora);
router.get('/tallado/pordia', registrosDia);
router.get('/tallado/actualdia', obtenerRegistrosHoy)

export default router;