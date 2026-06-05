import mongoose from "mongoose";

const TareasSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, enum: ['Pendiente', 'En progreso', 'Completada'], default: 'Pendiente' },
    fechaCreacion: { type: Date, default: Date.now },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const Tareas = mongoose.model("Tareas", TareasSchema);

export default Tareas;