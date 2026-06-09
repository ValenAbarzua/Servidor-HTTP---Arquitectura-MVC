import {login, register} from "../controllers/authController.js";
import loginRateLimit from "../middlewares/loginRateLimit.js";
import express from "express";

const router = express.Router();

router.post("/login", loginRateLimit, login);
router.post("/register", register);

export default router;