import TarjetaTarea from "./TarjetaTarea";

function ListaTareas({ tareas, cargarTareas, setTareaEditando, esAdmin = false }) {

    if (tareas.length === 0) {
        return <p>No tienes tareas!</p>;
    }

    return (
        <div>
            <h2>Mis tareas</h2>
            {
                tareas.map((tarea) => (
                    <TarjetaTarea
                        key={tarea._id}
                        tarea={tarea}
                        cargarTareas={cargarTareas}
                        setTareaEditando={setTareaEditando}
                        esAdmin ={esAdmin}
                    />
                ))
            }
        </div>
    );
}

export default ListaTareas;