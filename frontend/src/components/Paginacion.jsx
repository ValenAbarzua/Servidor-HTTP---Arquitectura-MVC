function Paginacion({

    paginaActual,
    paginasTotales,

    setPaginaActual

}){

    return(

        <div className="paginacion">

            <button

                disabled={paginaActual===1}

                onClick={()=>setPaginaActual(paginaActual-1)}

            >

                ← Anterior

            </button>

            <span>

                Página {paginaActual} de {paginasTotales}

            </span>

            <button

                disabled={paginaActual===paginasTotales}

                onClick={()=>setPaginaActual(paginaActual+1)}

            >

                Siguiente →

            </button>

        </div>

    )

}

export default Paginacion;