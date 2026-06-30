function Filtro({

    filtroEstado,
    setFiltroEstado,

    orden,
    setOrden

}) {

    return (

        <div className="filtros">

            <select
                value={filtroEstado}
                onChange={(e)=>setFiltroEstado(e.target.value)}
            >

                <option value="">
                    Todos los estados
                </option>

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

            <select
                value={orden}
                onChange={(e)=>setOrden(e.target.value)}
            >

                <option value="asc">
                    Más antiguas
                </option>

                <option value="desc">
                    Más recientes
                </option>

            </select>

        </div>

    );

}

export default Filtro;