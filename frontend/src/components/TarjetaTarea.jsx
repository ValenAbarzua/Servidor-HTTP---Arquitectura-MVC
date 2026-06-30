import { useAuth } from "../context/AuthContext";
import { eliminarTarea, eliminarCualquierTarea } from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

function TarjetaTarea({
    tarea,
    cargarTareas,
    setTareaEditando,
    esAdmin = false
}) {

    const { token } = useAuth();

    const handleEliminar = async () => {

        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar esta tarea?"
        );

        if (!confirmar) return;

        try {

            if (esAdmin) {
                await eliminarCualquierTarea(token, tarea._id);
            } else {
                await eliminarTarea(token, tarea._id);
            }

            cargarTareas();

        } catch (error) {

            console.error(error);

            alert("Error al eliminar la tarea.");

        }

    };

    return (

        <div className="card">

            <h3>{tarea.titulo}</h3>

            <p>{tarea.descripcion}</p>

            <p>

                {tarea.estado === "Pendiente" && <>🟡 Pendiente</>}

                {tarea.estado === "En progreso" && <>🔵 En progreso</>}

                {tarea.estado === "Completada" && <>🟢 Completada</>}

            </p>

            <div className="card-buttons">

                {!esAdmin && (

                    <button
                        onClick={() => setTareaEditando(tarea)}
                    >
                        <FaEdit /> Editar
                    </button>

                )}

                <button
                    onClick={handleEliminar}
                >
                    <FaTrash /> Eliminar
                </button>

            </div>

            <hr />

        </div>

    );

}

export default TarjetaTarea;