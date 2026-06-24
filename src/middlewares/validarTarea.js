import { tareaSchema } from "../schemas/tareaSchema.js";

export const validarTarea = (req, res, next) => {
    const resultado = tareaSchema.safeParse(req.body);
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