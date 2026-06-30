import { useAuth } from "../context/AuthContext";
import { eliminarTarea } from "../services/api";

function TarjetaTarea({ tarea, cargarTareas, setTareaEditando }) {

    const { token } = useAuth();
    const handleEliminar = async () => {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar esta tarea?"
        );
        if (!confirmar) return;
        try {
            await eliminarTarea(token, tarea._id);
            cargarTareas();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar la tarea.");
        }
    };

    return (
        <div>
            <h3>{tarea.titulo}</h3>
            <p>{tarea.descripcion}</p>
            <p>
                Estado: <strong>{tarea.estado}</strong>
            </p>

            <button onClick={() => setTareaEditando(tarea)}>
                Editar
            </button>

            <button onClick={handleEliminar}>
                Eliminar
            </button>

            <hr />
        </div>
    );
}

export default TarjetaTarea;