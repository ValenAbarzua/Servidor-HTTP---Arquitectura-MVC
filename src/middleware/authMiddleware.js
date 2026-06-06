import jsonwebtoken from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso no autorizado, debes obtener un Token' });
    }
    if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
        error: 'Formato de token inválido'
        });
    }   
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido, debes iniciar sesion nuevamente' });
    }
};