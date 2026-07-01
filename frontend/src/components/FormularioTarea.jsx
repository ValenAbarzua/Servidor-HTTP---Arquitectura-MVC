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

    const [errores, setErrores] = useState({});

    useEffect(() => {

        if (tareaEditando) {

            setTitulo(tareaEditando.titulo);
            setDescripcion(tareaEditando.descripcion);
            setEstado(tareaEditando.estado);

        }

    }, [tareaEditando]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({});
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
        if (error.errores) {
            const nuevosErrores = {};
            error.errores.forEach((e) => {
                nuevosErrores[e.campo] = e.mensaje;
            });
            setErrores(nuevosErrores);
        } else{
            alert(error.message);
        }
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
                {
                    errores.titulo && (
                        <p className="error">{errores.titulo}</p>
                    )
                }

                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                {
                    errores.descripcion && (
                        <p className="error">{errores.descripcion}</p>
                    )
                }

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
                {
                    errores.estado && (
                        <p className="error">{errores.estado}</p>
                    )
                }

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
        </div>
    );
}

export default FormularioTarea;