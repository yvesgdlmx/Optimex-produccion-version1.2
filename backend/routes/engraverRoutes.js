import express from 'express'
import { obtenerRegistros, obtenerTodos, registrosHora, registrosDia, obtenerRegistrosHoy } from '../controllers/engraverController.js';

const router = express.Router();

router.get("/engraver/:anio/:mes/:dia/:rangoHora", obtenerRegistros);
router.get("/engraver/todos", obtenerTodos);
router.get('/engraver/porhora/:anio/:mes/:dia/:hora', registrosHora);
router.get('/engraver/pordia', registrosDia);
router.get('/engraver/actualdia', obtenerRegistrosHoy)

export default router;