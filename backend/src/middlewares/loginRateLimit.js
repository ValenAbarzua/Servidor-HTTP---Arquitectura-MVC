import rateLimit from "express-rate-limit";

const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: "Demasiados intentos! Por favor, intentalo de nuevo mas tarde."
});

export default loginRateLimit;