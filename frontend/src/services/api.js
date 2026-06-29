const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const datos = await respuesta.json();
  if (!respuesta.ok) throw new Error(datos.error || "Error al iniciar sesión");
  return datos;
};

export const register = async (nombre, apellido, email, password) => {
  const respuesta = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, email, password }),
  });

  const datos = await respuesta.json();
  if (!respuesta.ok) throw new Error(datos.error || "Error al registrarse");
  return datos;
};

export const obtenerTareas = async (token) => {

    const respuesta = await fetch(`${API_URL}/tareas`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.error || "Error al obtener tareas");
    }

    return datos;
};


