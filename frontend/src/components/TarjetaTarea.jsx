function TarjetaTarea({ tarea }) {

    return (

        <div>

            <h3>{tarea.titulo}</h3>

            <p>{tarea.descripcion}</p>

            <p>
                Estado: <strong>{tarea.estado}</strong>
            </p>

            <button>
                Editar
            </button>

            <button>
                Eliminar
            </button>

            <hr/>

        </div>

    );

}

export default TarjetaTarea;