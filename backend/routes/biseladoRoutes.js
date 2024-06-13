import express from 'express'
import { obtenerRegistros, obtenerTodos, registrosHora, registrosDia, obtenerRegistrosHoy } from '../controllers/biseladoController.js';

const router = express.Router();

router.get("/biselado/:anio/:mes/:dia/:rangoHora", obtenerRegistros);
router.get("/biselado/todos", obtenerTodos);
router.get('/biselado/porhora/:anio/:mes/:dia/:hora', registrosHora);
router.get('/biselado/pordia', registrosDia);
router.get('/biselado/actualdia', obtenerRegistrosHoy)

export default router;