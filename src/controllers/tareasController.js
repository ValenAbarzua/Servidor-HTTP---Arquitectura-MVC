import Tareas from "../models/Tareas.js";

export const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tareas.find({
            usuario: req.user.id
        });

        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener las tareas"
        });
    }
};

export const crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, estado} = req.body; 
        const nuevaTarea = new Tareas({ titulo, descripcion, estado, usuario: req.user.id });
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
       const { titulo, descripcion, estado } = req.body;
       const tareaActualizada = await Tareas.findByIdAndUpdate(
        { _id: id, usuario: req.user.id},
        { titulo, descripcion, estado },
        { new: true }
        );
        if (!tareaActualizada) {
            return res.status(404).json({ error: "Tarea no encontrada o no pertenece a este usuario" });
        }
       res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la tarea" });
    }
};

export const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaEliminada = await Tareas.findOneAndDelete({ _id: id, usuario: req.user.id });
        if (!tareaEliminada) {
            return res.status(404).json({ error: "Tarea no encontrada o no pertenece a este usuario" });
        }
        res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tarea" });
    }
};
