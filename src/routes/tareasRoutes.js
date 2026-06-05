import express from "express";
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } from "../controllers/tareasController.js";


const router = express.Router();

router.get("/tareas", obtenerTareas);
router.post("/tareas", crearTarea);
router.patch("/tareas/:id", actualizarTarea);
router.delete("/tareas/:id", eliminarTarea);

export default router;