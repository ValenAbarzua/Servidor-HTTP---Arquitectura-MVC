import { useEffect, useState } from "react";
import { crearTarea, editarTarea } from "../services/api";

function FormularioTarea({
    token,
    cargarTareas,
    tareaEditando,
    setTareaEditando
}) {

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("Pendiente");

    const [error, setError] = useState("");

    useEffect(() => {

        if (tareaEditando) {

            setTitulo(tareaEditando.titulo);
            setDescripcion(tareaEditando.descripcion);
            setEstado(tareaEditando.estado);

        }

    }, [tareaEditando]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        if (tareaEditando) {
            await editarTarea(
                token,
                tareaEditando._id,
                {
                    titulo,
                    descripcion,
                    estado
                }
            );
        } else {
            await crearTarea(token, {
                titulo,
                descripcion,
                estado
            });
        }
        setTitulo("");
        setDescripcion("");
        setEstado("Pendiente");

        setTareaEditando(null);

        cargarTareas();
    } catch (error) {
        setError(error.message);
    }
    };
    
    const cancelarEdicion = () => {

        setTareaEditando(null);

        setTitulo("");
        setDescripcion("");
        setEstado("Pendiente");

    };

    return (

        <div>

            <h2>
                {tareaEditando ? "Editar tarea" : "Nueva tarea"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                >

                    <option value="Pendiente">
                        Pendiente
                    </option>

                    <option value="En progreso">
                        En progreso
                    </option>

                    <option value="Completada">
                        Completada
                    </option>

                </select>

                <button type="submit">

                    {
                        tareaEditando
                            ? "Guardar cambios"
                            : "Crear tarea"
                    }

                </button>

                {
                    tareaEditando && (

                        <button
                            type="button"
                            onClick={cancelarEdicion}
                        >

                            Cancelar

                        </button>

                    )
                }

            </form>

            {
                error && (
                    <p>{error}</p>
                )
            }

        </div>

    );

}

export default FormularioTarea;