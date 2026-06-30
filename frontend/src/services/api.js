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

export const obtenerTareas = async (token, filtroEstado = "", orden="asc", pagina=1) => {
    const params = new URLSearchParams();
    params.append("sort", orden);
    params.append("page", pagina);
    if (filtroEstado !== "") {
        params.append(
            "filter",
            `estado:${filtroEstado}`
        );
    }

    const respuesta = await fetch(`${API_URL}/tareas?${params.toString()}`, {
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

export const crearTarea = async (token, tarea) => {

    const respuesta = await fetch(`${API_URL}/tareas`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify(tarea)

    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {

        throw new Error(datos.error || "Error al crear la tarea");

    }

    return datos;

};

export const eliminarTarea = async (token, id) => {

    const respuesta = await fetch(`${API_URL}/tareas/${id}`, {

        method: "DELETE",

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.error || "Error al eliminar tarea");
    }

    return datos;
};

export const editarTarea = async (token, id, tarea) => {

    const respuesta = await fetch(`${API_URL}/tareas/${id}`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(tarea)

    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.error || "Error al editar la tarea");
    }

    return datos;

};

