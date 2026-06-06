import Tareas from "../models/Tareas.js";

export const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tareas.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
};

export const crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, estado, usuario } = req.body; 
        const nuevaTarea = new Tareas({ titulo, descripcion, estado, usuario });
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la tarea" });
    }
};
//"titulo": "Gimnasio",
 //   "descripcion": "Ir a entrenar el vierns",
   // "estado": "En progreso",
    // "usuario": "6a243550f8f55298c722e85f"

export const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, estado, usuario } = req.body;
        const tareaActualizada = await Tareas.findByIdAndUpdate(id, { titulo, descripcion, estado, usuario }, { new: true });
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la tarea" });
    }
};

export const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaEliminada = await Tareas.findByIdAndDelete(id);
        res.status(200).json(tareaEliminada);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tarea" });
    }
};
