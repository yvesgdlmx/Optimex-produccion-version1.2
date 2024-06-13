import express from 'express'
import { obtenerRegistros, obtenerTodos, registrosHora, registrosDia, obtenerRegistrosHoy } from '../controllers/pulidoController.js';

const router = express.Router();

router.get("/pulido/:anio/:mes/:dia/:rangoHora", obtenerRegistros);
router.get("/pulido/todos", obtenerTodos);
router.get('/pulido/porhora/:anio/:mes/:dia/:hora', registrosHora);
router.get('/pulido/pordia', registrosDia);
router.get('/pulido/actualdia', obtenerRegistrosHoy)

export default router;