import  { z } from "zod";
export const registroSchema = z.object({
    nombre: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
    apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z.email("Email invalido"),
    password: z.string().min(6, "La contraseña debe tener al menos seis caracteres")
});

export const loginSchema = z.object({
    email: z.email("Email invalido"),
    password: z.string().min(6, "La contraseña debe tener al menos seis caracteres")
})