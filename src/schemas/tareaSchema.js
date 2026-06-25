import { z } from "zod";
export const tareaSchema = z.object ({
    titulo: z.string().min(3, "El titulo debe tener al menos tres caracteres"),
    descripcion: z.string().min(3, "La descripcion debe tener al menos tres caracteres"),
    estado: z.enum(["En progreso", "Completada", "Pendiente"])
   
});

