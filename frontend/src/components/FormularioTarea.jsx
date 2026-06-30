import { useState } from "react";
import { crearTarea } from "../services/api";

function FormularioTarea({ token, cargarTareas }) {

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("Pendiente");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearTarea(token, {
                titulo,
                descripcion,
                estado
            });

            setTitulo("");
            setDescripcion("");
            setEstado("Pendiente");

            cargarTareas();

        } catch (error) {
            setError(error.message);
        }
    };

    return (

        <div>

            <h2>Nueva tarea</h2>

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

                    <option>Pendiente</option>

                    <option>En progreso</option>

                    <option>Completada</option>

                </select>

                <button type="submit">

                    Crear tarea

                </button>

            </form>

            {error && <p>{error}</p>}

        </div>

    );

}

export default FormularioTarea;