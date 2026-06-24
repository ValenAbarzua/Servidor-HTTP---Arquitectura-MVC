import express from "express";
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea, obtenerTodasLasTareas, eliminarCualquierTarea } from "../controllers/tareasController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";
import { rolesMiddleware } from "../middlewares/rolesMiddleware.js";


const router = express.Router();

router.get("/tareas", authMiddleware, obtenerTareas);
router.get("/tareas/all", authMiddleware, rolesMiddleware("admin"), obtenerTodasLasTareas)
router.post("/tareas", authMiddleware, crearTarea);
router.patch("/tareas/:id", authMiddleware, actualizarTarea);
router.delete("/tareas/:id", authMiddleware, eliminarTarea);
router.delete("/tareas/admin/:id", authMiddleware, rolesMiddleware("admin"), eliminarCualquierTarea)

export default router;