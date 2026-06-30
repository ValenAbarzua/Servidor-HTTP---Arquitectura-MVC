import TarjetaTarea from "./TarjetaTarea";

function ListaTareas({ tareas }) {

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
                    />

                ))

            }

        </div>

    );

}

export default ListaTareas;