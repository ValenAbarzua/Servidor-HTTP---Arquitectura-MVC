import { useEffect, useState } from "react";
import { getTodasLasTareas } from "../services/api";
import { eliminarTareaAdmin } from "../services/api"; // función delete/admin

function Admin() {
  const [tareas, setTareas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [paginasTotales, setPaginasTotales] = useState(1);

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const datos = await getTodasLasTareas(pagina, 5, "asc");
        setTareas(datos.tareas);
        setPaginasTotales(datos.paginasTotales);
      } catch (err) {
        console.error(err);
      }
    };
    cargarTareas();
  }, [pagina]);

  const handleEliminar = async (id) => {
    try {
      await eliminarTareaAdmin(id);
      setTareas(tareas.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar tarea");
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel Administrador</h1>
      <h2>Todas las tareas</h2>

      {tareas.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tareas.map((t) => (
            <li key={t._id}>
              <strong>{t.titulo}</strong> - {t.estado} - {t.usuario?.email}
              <button onClick={() => handleEliminar(t._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}

      <div>
        Página {pagina} de {paginasTotales}
        {pagina > 1 && <button onClick={() => setPagina(pagina - 1)}>Anterior</button>}
        {pagina < paginasTotales && <button onClick={() => setPagina(pagina + 1)}>Siguiente</button>}
      </div>
    </div>
  );
}

export default Admin;
