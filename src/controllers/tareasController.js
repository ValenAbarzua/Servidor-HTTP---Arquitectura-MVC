import Tareas from "../models/Tareas.js";

export const obtenerTareas = async (req, res) => {
    try {
        const { page=1, limit=5, sort='asc' } = req.query;
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 5;
        const skip = (pageNum - 1) * limitNum;
        const direccionOrden = sort === 'asc' ? 1:-1;
        const totalTareas = await Tareas.countDocuments({ usuario: req.user.id});
        const tareas = await Tareas.find({
            usuario: req.user.id
        })
        .sort({ fechaCreacion: direccionOrden })
        .skip(skip)
        .limit(limitNum)
        res.status(200).json({
            tareas,
            paginasTotales: Math.ceil(totalTareas/limitNum),
            paginaActual: pageNum
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
};

export const obtenerTodasLasTareas = async (req, res) => {
    try{
        const tareas = await Tareas.find();
        res.status(200).json(tareas);

    }catch (error) {
        res.status(500).json({ error: "Error al obtener las tareas"})
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
        console.log(error);
    }
}; 

export const actualizarTarea = async (req, res) => {
    try {
       const { id } = req.params;
       const { titulo, descripcion, estado } = req.body;
       const tareaActualizada = await Tareas.findOneAndUpdate(
        { _id: id, usuario: req.user.id},
        { titulo, descripcion, estado },
        { new: true }
        );
        if (!tareaActualizada) {
            return res.status(404).json({ error: "Tarea no encontrada o no pertenece a este usuario" });
        }
       res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

export const eliminarCualquierTarea = async (req, res) => {
    try {
        const { id }= req.params;
        const tareaEliminada = await Tareas.findOneAndDelete({_id: id});
        if (!tareaEliminada) {
            return res.status(404).json({error: "Tarea no encontrada! "});

        }
        res.status(200).json({ message: "Tarea eliminada correctamente! "});
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tarea"})
    }
};
