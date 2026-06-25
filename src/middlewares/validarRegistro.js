import { registroSchema } from "../schemas/authSchema.js";

export const validarRegistro = (req, res, next) => {
    const resultado = registroSchema.safeParse(req.body);
    if (!resultado.success) {
        return res.status(400).json({
            errores: resultado.error.issues.map(error => ({
                campo: error.path[0],
                mensaje: error.message
            }))
        });
    }
    next();
}