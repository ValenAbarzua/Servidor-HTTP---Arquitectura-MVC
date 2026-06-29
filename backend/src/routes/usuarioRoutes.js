import express from "express";
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/usuarios", obtenerUsuarios);
router.post("/usuarios", crearUsuario);
router.patch("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

export default router; 