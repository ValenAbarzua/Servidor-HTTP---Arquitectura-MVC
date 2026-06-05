import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, password, email } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        
        const nuevoUsuario = new Usuario({ nombre, apellido, password: hashPassword, email });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, password, email } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, { nombre, apellido, password: hashPassword, email }, { new: true });
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        res.status(200).json(usuarioEliminado);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};
