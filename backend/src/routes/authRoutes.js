import {login, register} from "../controllers/authController.js";
import loginRateLimit from "../middlewares/loginRateLimit.js";
import express from "express";
import { validarRegistro } from "../middlewares/validarRegistro.js";
import { validarLogin } from "../middlewares/validarLogin.js";

const router = express.Router();

router.post("/login", loginRateLimit, validarLogin, login);
router.post("/register", validarRegistro, register);

export default router;