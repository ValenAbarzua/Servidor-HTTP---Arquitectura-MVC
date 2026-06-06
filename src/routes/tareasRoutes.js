import express from "express";
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } from "../controllers/tareasController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/tareas", authMiddleware, obtenerTareas);
router.post("/tareas", authMiddleware, crearTarea);
router.patch("/tareas/:id", authMiddleware, actualizarTarea);
router.delete("/tareas/:id", authMiddleware, eliminarTarea);

export default router;