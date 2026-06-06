import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const coindicePassword = await bcrypt.compare(password, usuario.password);

        if (!coindicePassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    };
};

export const register = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        if (await Usuario.findOne({ email })) {
            return res.status(400).json({ error: 'El usuario ya esta registrado' });
        }
        const usuario = new Usuario({ nombre, apellido, email, password: hashPassword });
        await usuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};